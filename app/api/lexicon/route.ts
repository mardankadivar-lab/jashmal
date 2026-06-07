import { NextResponse } from "next/server";
import type Anthropic from "@anthropic-ai/sdk";
import { anthropic, LIGHT_MODEL } from "@/lib/anthropic";
import { getClassicLexicon, stripNiqud, LETTER_NAMES } from "@/lib/lexicon";
import { wordToPaleo, depiction, type PaleoLetter } from "@/lib/paleo";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 60;

const MYSTIC_MODEL = LIGHT_MODEL;

// Descripción enfática del idioma de salida. Para farsi insistimos en persa y
// NO árabe, porque comparten alfabeto y el modelo a veces se desvía al árabe.
const LANG: Record<string, string> = {
  es: "español",
  fa: "persa (فارسی) — NO árabe. Usa vocabulario y gramática persas (por ejemplo «است», «این», «که», «برای»), nunca palabras o construcciones árabes",
  en: "inglés (English)",
};

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

Responde SIEMPRE en ${lang}. Sé conciso y bello, con estos tres apartados breves
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

// Capa paleo-hebrea (pictográfica), estilo Ancient Hebrew Lexicon de Jeff Benner.
// Le damos a Claude los pictogramas CANÓNICOS y solo le pedimos la síntesis en
// frase, anclada en esos datos, para que sea fiel y no invente significados.
function buildPaleoPrompt(
  word: string,
  paleo: PaleoLetter[],
  locale: string
): string {
  const lang = LANG[locale] ?? LANG.es;
  const rows = paleo
    .map(
      (p) =>
        `- ${p.glyph} ${p.hebrew} (${p.name}): pictograma = ${depiction(p, locale)}; significados = ${p.seed}`
    )
    .join("\n");

  return `Eres el léxico paleo-hebreo de Jashmal, al estilo del Ancient Hebrew
Lexicon de Jeff Benner. La palabra ${word} se compone, en orden de lectura, de
estos pictogramas primarios (DATOS FIJOS, no los cambies):

${rows}

Responde SIEMPRE en ${lang}. Sé muy conciso. Dos partes, títulos en hebreo:

1. צוּרוֹת — Para cada letra, una línea: su pictograma (lo que dibuja) y su idea
   primaria. Empieza cada línea con el enlace {{letter:NOMBRE|LETRA}}.
2. צֵרוּף — La SÍNTESIS: combina los significados primarios de las letras EN ORDEN
   para formar una frase breve que revele el sentido concreto/original de la
   palabra (ej. para בר = "casa/familia" + "cabeza" → "familia de cabezas" =
   grano). Conecta esa frase-imagen con el significado real de la palabra.

Cíñete a los significados dados arriba. No inventes otros pictogramas. Breve.`;
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
  const locale = ["es","fa","en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  if (!word || !stripNiqud(word)) {
    return NextResponse.json({ error: "missing_word" }, { status: 400 });
  }

  // Capa clásica (Sefaria + gematría calculada en código).
  const classic = await getClassicLexicon(word);

  // Letras paleo canónicas (datos fijos, código — no IA).
  const paleoLetters = wordToPaleo(word);

  const classicSummary = classic.entries
    .map((e) => `${e.lexicon}: ${e.definition}`)
    .join(" | ")
    .slice(0, 800);

  // Generamos en paralelo la capa mística (cabalística) y la paleo (pictográfica).
  function runText(prompt: string, maxTokens: number): Promise<string> {
    return anthropic.messages
      .create({
        model: MYSTIC_MODEL,
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      })
      .then((msg) =>
        msg.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim()
      )
      .catch((err) => {
        console.error("lexicon generation error", err);
        return "";
      });
  }

  const [mystic, paleo] = await Promise.all([
    runText(
      buildMysticPrompt(
        classic.word,
        classic.consonants,
        classic.gematria,
        classicSummary,
        locale
      ),
      1200
    ),
    paleoLetters.length > 0
      ? runText(buildPaleoPrompt(classic.word, paleoLetters, locale), 900)
      : Promise.resolve(""),
  ]);

  return NextResponse.json({ classic, paleo, mystic });
}
