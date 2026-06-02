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
  const context = studyRef ? `The student is studying the text: "${studyRef}".` : "";

  // Instrucción de idioma prominente — en el idioma objetivo para que el modelo
  // no tenga ninguna excusa para confundirse.
  const LANG_ENFORCE: Record<string, string> = {
    es: "⚠️ INSTRUCCIÓN ABSOLUTA: Responde ÚNICAMENTE en español. Nunca en inglés, persa ni ningún otro idioma.",
    fa: "⚠️ دستور مطلق: فقط و فقط به زبان فارسی (پارسی) پاسخ بده. هرگز به انگلیسی، عربی، اسپانیایی یا هر زبان دیگری پاسخ نده. تمام پیام تو باید فارسی باشد.",
    en: "⚠️ ABSOLUTE INSTRUCTION: Respond ONLY in English. Never in Spanish, Persian or any other language.",
  };

  // Etiquetas de opciones en el idioma correcto.
  const OPT1: Record<string, string> = { es: "Opción 1", fa: "گزینه ۱", en: "Option 1" };
  const OPT2: Record<string, string> = { es: "Opción 2", fa: "گزینه ۲", en: "Option 2" };
  const opt1 = OPT1[locale] ?? OPT1.es;
  const opt2 = OPT2[locale] ?? OPT2.es;

  const system = `${LANG_ENFORCE[locale] ?? LANG_ENFORCE.es}

You are the study tutor of Jashmal, a Torah and Kabbalah platform.
${context}

CRITICAL CONVERSATION RULES:

1. LANGUAGE: ${LANG_ENFORCE[locale] ?? LANG_ENFORCE.es}
   Write every single word in ${lang}. No mixing of languages whatsoever.

2. FULL MEMORY: You have the complete conversation history. NEVER say "this is the beginning
   of the conversation" if there are previous messages. If there are N messages, you know them all.

3. REFERENCES TO YOUR OWN QUESTIONS: When the student refers to "the second question",
   "the second option", "that one", "the first", etc., look immediately at YOUR LAST MESSAGE
   in the history to find which options you offered. Answer that specific option directly.
   Example: your last message ended with "${opt1}: X / ${opt2}: Y" → student says "the second"
   → you answer about Y without asking anything.

4. SHORT REPLIES: "yes", "go on", "tell me more", "that one", "the second" → understand
   the context of your last message. NEVER ask them to repeat or clarify what was already said.

5. FORMAT: 2-4 paragraphs, warmth and depth. Do not invent sources.

6. NUMBERED QUESTIONS AT THE END: Always end with exactly 1-2 options, EACH ON ITS OWN LINE,
   labeled exactly like this (keep the ** asterisks and the colon):
   **${opt1}:** [a single short question]
   **${opt2}:** [a single short question]
   Each option must be ONE question only. Put a line break between them. This lets the
   student say "the second" and you know exactly which one they mean.`;

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
