import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/infra/db";
import { listHarvestedPlaces, setPlaceStatus, deletePlace } from "@/lib/atlas/atlasStore";

export const runtime = "nodejs";

function authorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const header = req.headers.get("x-admin-token");
  const q = new URL(req.url).searchParams.get("token");
  return header === token || q === token;
}

// GET /api/admin/atlas?token=... → localidades cosechadas (para revisar/ocultar).
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ configured: false, places: [] });
  }
  const places = await listHarvestedPlaces();
  return NextResponse.json({ configured: true, places });
}

// POST /api/admin/atlas { action:"approve"|"reject"|"delete", id }
//   approve → enciende · reject → oculta · delete → elimina (puede re-encenderse).
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ error: "no_db" }, { status: 503 });
  }
  let body: { action?: string; id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (!body.id) {
    return NextResponse.json({ error: "invalid_action" }, { status: 400 });
  }
  if (body.action === "delete") {
    const n = await deletePlace(body.id);
    return NextResponse.json({ ok: true, deleted: n });
  }
  const status = body.action === "approve" ? "approved" : body.action === "reject" ? "rejected" : null;
  if (!status) {
    return NextResponse.json({ error: "invalid_action" }, { status: 400 });
  }
  await setPlaceStatus(body.id, status);
  return NextResponse.json({ ok: true });
}
