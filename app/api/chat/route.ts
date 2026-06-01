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

REGLAS CRÍTICAS DE CONVERSACIÓN:

1. MEMORIA TOTAL: Tienes el historial completo. NUNCA digas "este es el comienzo de la
   conversación" si hay mensajes previos. NUNCA digas que no recuerdas algo que está en el
   historial. Si el historial tiene N mensajes, los conoces todos.

2. REFERENCIA A TUS PROPIAS PREGUNTAS: Cuando el estudiante dice "la segunda pregunta",
   "la segunda opción", "esa", "la primera", etc., busca INMEDIATAMENTE en TU ÚLTIMO
   MENSAJE del historial cuáles fueron las preguntas u opciones que formulaste. Identifica
   cuál es la señalada y respóndela directamente sin pedir aclaración.
   Ejemplo: tu último mensaje terminó con "**Opción 1:** X / **Opción 2:** Y" → el estudiante
   dice "vamos con la segunda" → respondes sobre Y sin preguntar nada.

3. RESPUESTAS CORTAS: "sí", "vamos", "cuéntame más", "esa", "la segunda" → entiende
   el contexto de tu último mensaje. NUNCA pidas que repita o aclare lo ya dicho.

4. FORMATO: Responde en ${lang}. 2-4 párrafos, calidez y profundidad.
   No inventes fuentes.

5. PREGUNTAS NUMERADAS AL FINAL: Siempre termina con 1-2 opciones numeradas así:
   **Opción 1:** [pregunta A] / **Opción 2:** [pregunta B]
   Esto permite que el estudiante diga "la segunda" y tú sepas exactamente a cuál se refiere.`;

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
