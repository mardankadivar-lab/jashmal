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

interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

// POST { question, locale, studyRef?, history? } → { answer }
// Tutor de estudio con memoria: pasa el historial completo para mantener el hilo.
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`chat:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: {
    question?: string;
    locale?: string;
    studyRef?: string;
    history?: HistoryMessage[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const question = (body.question ?? "").trim();
  const locale = ["es", "fa", "en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  const studyRef = body.studyRef?.trim() ?? "";
  // Historial previo (máx. 20 mensajes para no superar tokens).
  const history: HistoryMessage[] = (body.history ?? []).slice(-20);

  if (!question || question.length < 2) {
    return NextResponse.json({ error: "empty_question" }, { status: 400 });
  }
  if (question.length > 600) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  const lang = LANG[locale] ?? LANG.es;
  const context = studyRef ? `El estudiante está estudiando el texto: "${studyRef}".` : "";

  const system = `Eres el tutor de estudio de Jashmal, una plataforma de Torá y Cabalá.
${context}

REGLAS DE CONVERSACIÓN:
- Mantén SIEMPRE el hilo de la conversación. Si el estudiante dice "sí", "vamos", "cuéntame más" u
  otras respuestas cortas, entiende que se refieren a lo que acabas de decir — NUNCA pidas que
  repita o aclare lo ya discutido.
- Responde en ${lang}, con calidez y profundidad (2-4 párrafos).
- Si es sobre una palabra o concepto hebreo: explica raíz, significado y dimensión espiritual.
- Si es una duda del texto: responde con rigor. No inventes fuentes.
- AL FINAL de cada respuesta, haz 1-2 preguntas breves para invitar al estudiante a seguir
  profundizando. Ejemplos: "¿Quieres que exploremos la conexión con...?", "¿Te interesa ver
  cómo el Zohar lo explica?", "¿Seguimos con el siguiente concepto?". Esto mantiene vivo el
  estudio y el diálogo.`;

  // Construir el array de mensajes con el historial completo + el nuevo.
  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: question },
  ];

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 700,
      system,
      messages,
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
