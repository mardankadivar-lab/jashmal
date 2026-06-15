import { NextResponse } from "next/server";
import { getSession } from "@/lib/community/communitySession";
import { dbConfigured } from "@/lib/infra/db";
import {
  listUserNotes,
  upsertUserNote,
  deleteUserNote,
  listUserHighlights,
  upsertUserHighlight,
  deleteUserHighlights,
} from "@/lib/study/userCuaderno";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────
// /api/cuaderno — sincronización del "Cuaderno de estudio" (notas + resaltados)
// del usuario LOGUEADO. Mismo contrato que /api/my-studies:
//   · Sin sesión → { ok:true/false, anon:true } y NO toca BD (el cliente sigue
//     usando localStorage, modo anónimo intacto).
//   · Sin DATABASE_URL → degradación elegante (vacío / db_unavailable).
//   · Siempre PRIVADO: todo se filtra por session.userId.
//
// GET    → { ok, notes:[…], highlights:[…] }  (todo el cuaderno del usuario)
// POST   { kind:"note", ref, verse, text, lang?, updatedAt? }
//        { kind:"highlight", ref, verse, side, start, end, color, updatedAt? }
// DELETE { kind:"note", ref, verse } | { kind:"highlight", ref, verse, side, start?, end? }
// ─────────────────────────────────────────────────────────────────────────

const SIDES = ["he", "tr"];
const COLORS = ["gold", "sky", "sage"];

// GET → cuaderno completo del usuario. Sin sesión/BD → listas vacías + anon.
export async function GET() {
  const session = await getSession();
  if (!session || !dbConfigured()) {
    return NextResponse.json({ ok: true, anon: !session, notes: [], highlights: [] });
  }
  try {
    const [notes, highlights] = await Promise.all([
      listUserNotes(session.userId),
      listUserHighlights(session.userId),
    ]);
    return NextResponse.json({ ok: true, notes, highlights });
  } catch {
    return NextResponse.json({ ok: true, notes: [], highlights: [] });
  }
}

// POST → upsert de una nota o un resaltado. Sin sesión → { ok:false, anon:true }.
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, anon: true });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_unavailable" });
  }
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const kind = String(body.kind ?? "");
  const ref = String(body.ref ?? "").trim();
  const verse = Number(body.verse);
  if (!ref || !Number.isFinite(verse)) {
    return NextResponse.json({ ok: false, error: "bad_anchor" }, { status: 400 });
  }
  const updatedAt = typeof body.updatedAt === "string" ? body.updatedAt : undefined;

  try {
    if (kind === "note") {
      const text = String(body.text ?? "").trim().slice(0, 8000);
      if (!text) return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
      const lang = ["es", "fa", "en"].includes(String(body.lang)) ? String(body.lang) : null;
      const ok = await upsertUserNote({ userId: session.userId, ref, verse, text, lang, updatedAt });
      return NextResponse.json({ ok });
    }
    if (kind === "highlight") {
      const side = String(body.side ?? "");
      const color = String(body.color ?? "");
      const start = Number(body.start);
      const end = Number(body.end);
      if (!SIDES.includes(side) || !COLORS.includes(color)) {
        return NextResponse.json({ ok: false, error: "bad_highlight" }, { status: 400 });
      }
      const ok = await upsertUserHighlight({
        userId: session.userId, ref, verse, side, start, end, color, updatedAt,
      });
      return NextResponse.json({ ok });
    }
    return NextResponse.json({ ok: false, error: "bad_kind" }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  }
}

// DELETE → borra una nota o resaltado(s). Parámetros por query string.
export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, anon: true }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_unavailable" });
  }
  const sp = new URL(req.url).searchParams;
  const kind = sp.get("kind") ?? "";
  const ref = (sp.get("ref") ?? "").trim();
  const verse = Number(sp.get("verse"));
  if (!ref || !Number.isFinite(verse)) {
    return NextResponse.json({ ok: false, error: "bad_anchor" }, { status: 400 });
  }
  try {
    if (kind === "note") {
      const ok = await deleteUserNote(session.userId, ref, verse);
      return NextResponse.json({ ok });
    }
    if (kind === "highlight") {
      const side = sp.get("side") ?? "";
      if (!SIDES.includes(side)) {
        return NextResponse.json({ ok: false, error: "bad_side" }, { status: 400 });
      }
      const startRaw = sp.get("start");
      const endRaw = sp.get("end");
      const start = startRaw != null ? Number(startRaw) : undefined;
      const end = endRaw != null ? Number(endRaw) : undefined;
      const ok = await deleteUserHighlights({ userId: session.userId, ref, verse, side, start, end });
      return NextResponse.json({ ok });
    }
    return NextResponse.json({ ok: false, error: "bad_kind" }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false, error: "delete_failed" }, { status: 500 });
  }
}
