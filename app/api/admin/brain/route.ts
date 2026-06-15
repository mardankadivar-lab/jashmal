import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/infra/db";
import { listPending, setNodeStatus, setEdgeStatus, setAllPending, rejectNodeIds, approveNodeIds, setNodeCat } from "@/lib/nodes/brainStore";

export const runtime = "nodejs";

function authorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const header = req.headers.get("x-admin-token");
  const q = new URL(req.url).searchParams.get("token");
  return header === token || q === token;
}

// GET /api/admin/brain?token=... → sinapsis/conexiones pendientes de revisión.
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ configured: false, nodes: [], edges: [] });
  }
  const { nodes, edges } = await listPending();
  return NextResponse.json({ configured: true, nodes, edges });
}

// POST /api/admin/brain { action:"approve"|"reject", kind:"node"|"edge", id }
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ error: "no_db" }, { status: 503 });
  }
  let body: { action?: string; kind?: string; id?: string; all?: boolean; ids?: string[]; cat?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  // RECATEGORIZAR: { action:"recat", id, cat } → cambia la galaxia del nodo (el
  // Sofer corrige antes/al aprobar). Opcionalmente aprueba en el mismo paso.
  if (body.action === "recat" && body.id && body.cat) {
    const ok = await setNodeCat(body.id, body.cat);
    if (!ok) return NextResponse.json({ error: "invalid_cat" }, { status: 400 });
    return NextResponse.json({ ok: true, recat: true });
  }
  // SELECCIÓN MÚLTIPLE / LIMPIEZA: { action:"approve"|"reject", ids:[...] }
  if (Array.isArray(body.ids) && body.ids.length && (body.action === "approve" || body.action === "reject")) {
    if (body.action === "approve") {
      const res = await approveNodeIds(body.ids);
      return NextResponse.json({ ok: true, ...res });
    }
    const n = await rejectNodeIds(body.ids);
    return NextResponse.json({ ok: true, rejected: n });
  }
  // BULK: { action:"approve"|"reject", all:true } → aprueba/rechaza todo lo pendiente
  if (body.all === true && (body.action === "approve" || body.action === "reject")) {
    const res = await setAllPending(body.action === "approve" ? "approved" : "rejected");
    return NextResponse.json({ ok: true, bulk: true, ...res });
  }
  const status = body.action === "approve" ? "approved" : body.action === "reject" ? "rejected" : null;
  if (!status || !body.id || (body.kind !== "node" && body.kind !== "edge")) {
    return NextResponse.json({ error: "invalid_action" }, { status: 400 });
  }
  if (body.kind === "node") await setNodeStatus(body.id, status);
  else await setEdgeStatus(body.id, status);
  return NextResponse.json({ ok: true });
}
