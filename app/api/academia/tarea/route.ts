// ─────────────────────────────────────────────────────────────────────────
// app/api/academia/tarea/route.ts
//
// POST { semana, lessonSlug, texto }  → entrega la tarea, devuelve el registro
// GET  ?semana=N                      → tarea del usuario para esa semana (o null)
//
// Requiere sesión de comunidad (cookie jashmal_session).
// ─────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/community/communitySession";
import {
  ensureAcademiaTables,
  submitTarea,
  getTareaByUserAndSemana,
  countWords,
} from "@/lib/academia/academiaDb";

// ── POST — entregar tarea ─────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "no_session" }, { status: 401 });
  }

  let body: { semana?: unknown; lessonSlug?: unknown; texto?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const semana = typeof body.semana === "number" ? body.semana : parseInt(String(body.semana), 10);
  const lessonSlug = typeof body.lessonSlug === "string" ? body.lessonSlug.trim() : "";
  const texto = typeof body.texto === "string" ? body.texto.trim() : "";

  if (!semana || semana < 1 || semana > 16 || !lessonSlug || !texto) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const palabras = countWords(texto);
  if (palabras < 50) {
    return NextResponse.json({ error: "too_short", palabras }, { status: 400 });
  }

  await ensureAcademiaTables();

  // No permitir doble entrega para la misma semana.
  const existing = await getTareaByUserAndSemana(session.email, semana);
  if (existing) {
    return NextResponse.json({ error: "already_submitted", tarea: existing }, { status: 409 });
  }

  const tarea = await submitTarea(session.email, semana, lessonSlug, texto);
  if (!tarea) {
    return NextResponse.json({ error: "db_unavailable" }, { status: 503 });
  }

  return NextResponse.json({ tarea }, { status: 201 });
}

// ── GET — consultar tarea existente ───────────────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "no_session" }, { status: 401 });
  }

  const semanaStr = req.nextUrl.searchParams.get("semana");
  const semana = semanaStr ? parseInt(semanaStr, 10) : NaN;
  if (!semana || semana < 1 || semana > 16) {
    return NextResponse.json({ error: "invalid_semana" }, { status: 400 });
  }

  await ensureAcademiaTables();

  const tarea = await getTareaByUserAndSemana(session.email, semana);
  return NextResponse.json({ tarea: tarea ?? null });
}
