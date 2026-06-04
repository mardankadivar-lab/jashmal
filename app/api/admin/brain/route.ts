import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/db";
import { listPending, setNodeStatus, setEdgeStatus } from "@/lib/brainStore";

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
  let body: { action?: string; kind?: string; id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const status = body.action === "approve" ? "approved" : body.action === "reject" ? "rejected" : null;
  if (!status || !body.id || (body.kind !== "node" && body.kind !== "edge")) {
    return NextResponse.json({ error: "invalid_action" }, { status: 400 });
  }
  if (body.kind === "node") await setNodeStatus(body.id, status);
  else await setEdgeStatus(body.id, status);
  return NextResponse.json({ ok: true });
}
