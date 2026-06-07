import { NextResponse } from "next/server";
import { getSession } from "@/lib/communitySession";
import { dbConfigured } from "@/lib/db";
import { saveUserStudy, listUserStudies, deleteUserStudy } from "@/lib/userStudies";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────
// /api/my-studies — historial de estudios del usuario LOGUEADO.
// El usuario anónimo guarda en localStorage (en el cliente); aquí solo se
// persiste lo del usuario con sesión. PRIVADO: siempre se filtra por su user_id.
// ─────────────────────────────────────────────────────────────────────────

// GET → lista de estudios guardados del usuario (más reciente primero).
// Sin sesión o sin BD → lista vacía (el cliente usa su copia local).
export async function GET() {
  const session = await getSession();
  if (!session || !dbConfigured()) {
    return NextResponse.json({ ok: true, anon: !session, studies: [] });
  }
  try {
    const studies = await listUserStudies(session.userId);
    return NextResponse.json({ ok: true, studies });
  } catch {
    return NextResponse.json({ ok: true, studies: [] });
  }
}

// POST { mode, ref, title, content, lang } → guarda/actualiza un estudio.
// Sin sesión → { ok:false, anon:true } (el cliente lo guarda en localStorage).
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, anon: true });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_unavailable" });
  }
  let body: { mode?: string; ref?: string; title?: string; content?: string; lang?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  const mode = String(body.mode ?? "text").trim() || "text";
  const ref = String(body.ref ?? "").trim();
  const title = (String(body.title ?? "").trim() || ref).slice(0, 300);
  const content = String(body.content ?? "");
  const lang = ["es", "fa", "en"].includes(String(body.lang)) ? String(body.lang) : "es";
  if (!ref || content.trim().length < 20) {
    return NextResponse.json({ ok: false, error: "too_short" }, { status: 400 });
  }
  try {
    const id = await saveUserStudy({
      userId: session.userId,
      mode,
      ref,
      title,
      content: content.slice(0, 60000),
      lang,
    });
    return NextResponse.json({ ok: Boolean(id), key: id });
  } catch {
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  }
}

// DELETE ?key=... → borra un estudio del historial del usuario.
export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, anon: true }, { status: 401 });
  }
  const key = new URL(req.url).searchParams.get("key") ?? "";
  if (!key) return NextResponse.json({ ok: false, error: "missing_key" }, { status: 400 });
  try {
    const done = await deleteUserStudy(session.userId, key);
    return NextResponse.json({ ok: done });
  } catch {
    return NextResponse.json({ ok: false, error: "delete_failed" }, { status: 500 });
  }
}
