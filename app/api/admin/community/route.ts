import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/db";
import {
  ensureCommunityTables,
  listSoferReview,
  getSubmissionById,
  approveSubmissionRow,
  rejectSubmissionRow,
  incrementUserStats,
  decrementUserStats,
} from "@/lib/community";
import { ensureBrainTables, addCommunityStar, getBrainGraph, setNodeStatus } from "@/lib/brainStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const header = req.headers.get("x-admin-token");
  const q = new URL(req.url).searchParams.get("token");
  return header === token || q === token;
}

// GET /api/admin/community?token=... → la cola de jidushim que pasaron el Sofer
// y esperan el visto de Mardan, + la lista de conceptos del universo (para
// elegir a cuál conecta cada estrella).
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ configured: false, queue: [], nodes: [] });
  }
  await ensureCommunityTables();
  await ensureBrainTables(); // asegura la columna 'author' antes de leer el grafo
  const queue = await listSoferReview();
  const g = await getBrainGraph();
  const nodes = (g?.nodes ?? [])
    .filter((n) => n.cat !== "comunidad")
    .map((n) => ({ id: n.id, label: n.label, cat: n.cat }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return NextResponse.json({ configured: true, queue, nodes });
}

// POST /api/admin/community  (cabecera x-admin-token)
//   { action:"approve", id, title, labelFa?, targetId, note? }
//   { action:"reject",  id, note? }
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ error: "no_db" }, { status: 503 });
  }
  let body: {
    action?: string;
    id?: string;
    title?: string;
    labelFa?: string;
    targetId?: string;
    note?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const id = String(body.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

  const sub = await getSubmissionById(id);
  if (!sub) return NextResponse.json({ error: "not_found" }, { status: 404 });

  // ── Quitar / archivar una estrella ya encendida (soft, reversible) ──────
  // Apaga el nodo (desaparece del universo, pero NO se borra: status 'rejected'),
  // revierte estrella + luz del estudiante y archiva el envío.
  if (body.action === "remove") {
    const nodeId = sub.node_id ?? `c-${id}`;
    await setNodeStatus(nodeId, "rejected");
    if (sub.status === "approved") {
      await decrementUserStats(sub.user_id, sub.score);
    }
    await rejectSubmissionRow(id, body.note?.trim() || "estrella retirada");
    return NextResponse.json({ ok: true, status: "removed", nodeId });
  }

  if (sub.status !== "sofer_review") {
    return NextResponse.json({ error: "already_resolved", status: sub.status }, { status: 409 });
  }

  // ── Rechazar ──────────────────────────────────────────────────────────
  if (body.action === "reject") {
    await rejectSubmissionRow(id, body.note?.trim() || undefined);
    return NextResponse.json({ ok: true, status: "rejected" });
  }

  // ── Aprobar → encender la estrella ──────────────────────────────────────
  if (body.action === "approve") {
    const title = String(body.title ?? "").trim();
    const targetId = String(body.targetId ?? "").trim();
    if (!title) return NextResponse.json({ error: "missing_title" }, { status: 400 });
    if (!targetId) return NextResponse.json({ error: "missing_target" }, { status: 400 });

    await ensureBrainTables();
    const author = (sub.name && sub.name.trim()) || sub.email.split("@")[0];
    const nodeId = `c-${id}`;
    const res = await addCommunityStar({
      id: nodeId,
      label: title,
      labelFa: body.labelFa?.trim() || title,
      author,
      targetId,
      url: "/comunidad",
    });
    if (!res.ok) {
      const status = res.error === "target_not_found" ? 400 : 500;
      return NextResponse.json({ error: res.error ?? "star_failed" }, { status });
    }
    await approveSubmissionRow(id, nodeId, body.note?.trim() || undefined);
    await incrementUserStats(sub.user_id, sub.score);
    return NextResponse.json({ ok: true, status: "approved", nodeId, author });
  }

  return NextResponse.json({ error: "invalid_action" }, { status: 400 });
}
