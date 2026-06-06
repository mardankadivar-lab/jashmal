import { NextResponse } from "next/server";
import { getSession } from "@/lib/communitySession";
import { ensureCommunityTables, createSubmission } from "@/lib/community";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST { text, connectsTo?, studyRef? } → guarda la revelación (estado 'pending').
// Requiere sesión iniciada. Luego el Sofer (Puerta 1) la evaluará.
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Inicia sesión para compartir tu revelación." }, { status: 401 });
  }
  let body: { text?: string; connectsTo?: string; studyRef?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* body inválido */
  }
  const text = String(body.text ?? "").trim();
  const connectsTo = String(body.connectsTo ?? "").trim() || undefined;
  const studyRef = String(body.studyRef ?? "").trim() || undefined;
  if (text.length < 20) {
    return NextResponse.json({ ok: false, error: "Escribe tu revelación (al menos unas líneas)." }, { status: 400 });
  }
  if (text.length > 4000) {
    return NextResponse.json({ ok: false, error: "Demasiado largo (máximo 4000 caracteres)." }, { status: 400 });
  }
  await ensureCommunityTables();
  const id = await createSubmission({ userId: session.userId, text, connectsTo, studyRef });
  if (!id) {
    return NextResponse.json({ ok: false, error: "No se pudo guardar. Intenta de nuevo." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id });
}
