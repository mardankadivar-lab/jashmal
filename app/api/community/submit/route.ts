import { NextResponse } from "next/server";
import { getSession } from "@/lib/communitySession";
import { ensureCommunityTables, createSubmission, updateSoferVerdict } from "@/lib/community";
import { soferEvaluate } from "@/lib/sofer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // el Sofer (Claude) puede tardar unos segundos

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
  // ── Puerta 1: el Sofer (IA) evalúa con su criterio ───────────────────────
  const v = await soferEvaluate({ text, connectsTo });
  if (v) {
    const status = v.verdict === "aceptar" ? "sofer_review" : "rejected";
    await updateSoferVerdict(id, { verdict: v.verdict, score: v.score, notes: v.message, status });
    return NextResponse.json({ ok: true, id, verdict: v.verdict, score: v.score, message: v.message });
  }
  // si el Sofer no pudo evaluar (sin clave/error), queda 'pending' para revisión manual
  return NextResponse.json({ ok: true, id, verdict: "pending", message: "Recibimos tu revelación. El Sofer la revisará pronto." });
}
