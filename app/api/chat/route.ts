import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = "claude-haiku-4-5-20251001";

const LANG: Record<string, string> = {
  es: "español",
  fa: "persa (فارسی) — NO árabe; usa vocabulario y gramática persas",
  en: "English",
};

// POST { question, locale, studyRef? } → { answer }
// Mini-chat de ayuda dentro del estudio: responde preguntas sobre palabras,
// conceptos o dudas del estudiante, en contexto de lo que está estudiando.
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`chat:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { question?: string; locale?: string; studyRef?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const question = (body.question ?? "").trim();
  const locale = ["es", "fa", "en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  const studyRef = body.studyRef?.trim() ?? "";

  if (!question || question.length < 2) {
    return NextResponse.json({ error: "empty_question" }, { status: 400 });
  }
  if (question.length > 500) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  const lang = LANG[locale] ?? LANG.es;
  const context = studyRef ? `El estudiante está estudiando el texto: ${studyRef}.` : "";

  const system = `Eres el tutor de estudio de Jashmal, una plataforma de Torá y Cabalá.
${context}
Responde en ${lang} de forma breve, clara y cálida (2-4 párrafos como máximo).
Si la pregunta es sobre una palabra o concepto hebreo, explica su raíz, significado
y, si corresponde, su dimensión espiritual (Cabalá, jasidut). Si es una duda general
sobre el texto o la tradición, responde con profundidad pero sin abrumar.
Sé riguroso: no inventes fuentes. Si no sabes algo con certeza, dilo con honestidad.`;

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 600,
      system,
      messages: [{ role: "user", content: question }],
    });

    const answer = msg.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("chat error", err);
    return NextResponse.json({ error: "chat_failed" }, { status: 502 });
  }
}
