// ─────────────────────────────────────────────────────────────────────────
// app/api/admin/academia/route.ts
//
// GET  ?token=...          → lista todas las tareas y expositivos entregados
// POST { token, action, id, status, notas, tipo }
//       → actualiza el estado de una tarea o expositivo
// ─────────────────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/infra/db";
import {
  ensureAcademiaTables,
  listAllTareas,
  listAllExpositivos,
  updateTareaStatus,
  updateExpositivoStatus,
  type TareaStatus,
  type ExpositivoStatus,
} from "@/lib/academia/academiaDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const header = req.headers.get("x-admin-token");
  const q = new URL(req.url).searchParams.get("token");
  return header === token || q === token;
}

// GET — cargar todas las tareas y expositivos.
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ configured: false });
  }
  await ensureAcademiaTables();
  const [tareas, expositivos] = await Promise.all([listAllTareas(), listAllExpositivos()]);
  return NextResponse.json({ configured: true, tareas, expositivos });
}

// POST — actualizar estado.
export async function POST(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ error: "db_unavailable" }, { status: 503 });
  }

  let body: {
    action?: string;
    id?: string;
    status?: string;
    notas?: string;
    tipo?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const { action, id, status, notas, tipo } = body;
  if (!action || !id || !status) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  await ensureAcademiaTables();

  if (action === "update_tarea") {
    await updateTareaStatus(id, status as TareaStatus, notas);
    return NextResponse.json({ ok: true });
  }

  if (action === "update_expositivo") {
    await updateExpositivoStatus(
      id,
      status as ExpositivoStatus,
      notas,
      (tipo as "sofer" | "mardan") ?? "sofer",
    );
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "unknown_action" }, { status: 400 });
}
