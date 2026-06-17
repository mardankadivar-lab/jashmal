// ─────────────────────────────────────────────────────────────────────────
// app/api/academia/expositivo/route.ts
//
// POST { numero, nivel, titulo, texto }  → entrega el expositivo, devuelve el registro
// GET                                    → todos los expositivos del usuario
//
// Requiere sesión de comunidad (cookie jashmal_session).
// Sigue el mismo patrón que /api/academia/tarea/route.ts.
// ─────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/community/communitySession";
import {
  ensureAcademiaTables,
  submitExpositivo,
  getExpositivosByUser,
  countWords,
} from "@/lib/academia/academiaDb";

// ── POST — entregar expositivo ─────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "no_session" }, { status: 401 });
  }

  let body: { numero?: unknown; nivel?: unknown; titulo?: unknown; texto?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const numero = typeof body.numero === "number" ? body.numero : parseInt(String(body.numero), 10);
  const nivel = typeof body.nivel === "string" ? body.nivel.trim() : "talmid";
  const titulo = typeof body.titulo === "string" ? body.titulo.trim() : "";
  const texto = typeof body.texto === "string" ? body.texto.trim() : "";

  if (!numero || numero < 1 || !titulo || !texto) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const palabras = countWords(texto);
  if (palabras < 200) {
    return NextResponse.json({ error: "too_short", palabras }, { status: 400 });
  }

  await ensureAcademiaTables();

  const expositivo = await submitExpositivo(session.email, numero, nivel, titulo, texto);
  if (!expositivo) {
    return NextResponse.json({ error: "db_unavailable" }, { status: 503 });
  }

  return NextResponse.json({ expositivo }, { status: 201 });
}

// ── GET — consultar expositivos del usuario ────────────────────────────────

export async function GET(): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "no_session" }, { status: 401 });
  }

  await ensureAcademiaTables();

  const expositivos = await getExpositivosByUser(session.email);
  return NextResponse.json({ expositivos });
}
