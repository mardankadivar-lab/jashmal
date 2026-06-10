import { NextResponse } from "next/server";
import {
  adminListAll,
  deleteReflection,
  restoreReflection,
} from "@/lib/study/reflections";
import { dbConfigured } from "@/lib/infra/db";

export const runtime = "nodejs";

function authorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const header = req.headers.get("x-admin-token");
  const q = new URL(req.url).searchParams.get("token");
  return header === token || q === token;
}

// GET /api/admin/reflections?token=... → todas las reflexiones.
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ configured: false, reflections: [] });
  }
  const reflections = await adminListAll();
  return NextResponse.json({ configured: true, reflections });
}

// POST /api/admin/reflections { action:"delete"|"restore", id }
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let body: { action?: string; id?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const id = Number(body.id);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }
  if (body.action === "delete") await deleteReflection(id);
  else if (body.action === "restore") await restoreReflection(id);
  else return NextResponse.json({ error: "invalid_action" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
