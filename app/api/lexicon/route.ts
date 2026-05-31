import { NextResponse } from "next/server";
import type Anthropic from "@anthropic-ai/sdk";
import { anthropic } from "@/lib/anthropic";
import { getClassicLexicon, stripNiqud, LETTER_NAMES } from "@/lib/lexicon";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 60;

const MYSTIC_MODEL = "claude-haiku-4-5-20251001";

const LANG: Record<string, string> = { es: "español", fa: "farsi (persa)" };

function buildMysticPrompt(
  word: string,
  consonants: string,
  gem: number,
  classic: string,
  locale: string
): string {
  const lang = LANG[locale] ?? LANG.es;
  const letters = [...consonants]
    .map((ch) => `${ch} (${LETTER_NAMES[ch] ?? "?"})`)
    .join(", ");

  return `Eres el léxico místico de Jashmal. Analiza la palabra hebrea ${word}
(consonantes: ${consonants}; letras: ${letters}; gematría: ${gem}).

Sentido clásico de referencia (de los diccionarios): ${classic || "(no disponible)"}

Responde en ${lang}, de forma concisa y bella, con estos tres apartados breves
y títulos en hebreo:

1. אוֹתִיּוֹת — Letra por letra: el sentido espiritual de cada letra de la palabra
   y cómo se combinan en un mensaje. Para CADA letra usa el enlace
   {{letter:NOMBRE|LETRA}} (ej. {{letter:alef|א}}). Usa los nombres en transliteración.
2. גִּימַטְרִיָּה — El valor ${gem}: su significado, y 1-3 palabras o frases
   hebreas conocidas con el mismo valor (conexiones numéricas), explicando la
   resonancia. Solo si son correctas; no inventes equivalencias.
3. שֹׁרֶשׁ — La raíz y el hilo espiritual que une el sentido literal con el místico.

Sé riguroso: no inventes gematrías ni raíces. Si dudas de una equivalencia
numérica, omítela. Breve pero profundo.`;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`lex:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { word?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const word = (body.word ?? "").trim();
  const locale = body.locale === "fa" ? "fa" : "es";
  if (!word || !stripNiqud(word)) {
    return NextResponse.json({ error: "missing_word" }, { status: 400 });
  }

  // Capa clásica (Sefaria + gematría calculada en código).
  const classic = await getClassicLexicon(word);

  // Capa mística (Claude). Si falla, devolvemos igual la capa clásica.
  let mystic = "";
  try {
    const classicSummary = classic.entries
      .map((e) => `${e.lexicon}: ${e.definition}`)
      .join(" | ")
      .slice(0, 800);
    const msg = await anthropic.messages.create({
      model: MYSTIC_MODEL,
      max_tokens: 1200,
      messages: [
        {
          role: "user",
          content: buildMysticPrompt(
            classic.word,
            classic.consonants,
            classic.gematria,
            classicSummary,
            locale
          ),
        },
      ],
    });
    mystic = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
  } catch (err) {
    console.error("lexicon mystic error", err);
  }

  return NextResponse.json({ classic, mystic });
}
