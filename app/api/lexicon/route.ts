import { NextResponse } from "next/server";
import type Anthropic from "@anthropic-ai/sdk";
import { anthropic, LIGHT_MODEL } from "@/lib/engine/anthropic";
import { getClassicLexicon, stripNiqud, LETTER_NAMES } from "@/lib/sources/lexicon";
import { verifiedEquivalences, type VerifiedMatch } from "@/lib/sources/gematriaBank";
import { wordToPaleo, depiction, type PaleoLetter } from "@/lib/sources/paleo";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";

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
  breakdown: string,
  equivalences: VerifiedMatch[],
  lemma: string,
  classic: string,
  locale: string
): string {
  const lang = LANG[locale] ?? LANG.es;
  const letters = [...consonants]
    .map((ch) => `${ch} (${LETTER_NAMES[ch] ?? "?"})`)
    .join(", ");

  // Bloque de equivalencias: lista CERRADA calculada en código. Si está vacía,
  // el modelo tiene prohibido rellenarla de memoria.
  const equivBlock = equivalences.length
    ? `   Equivalencias VERIFICADAS (calculadas en código, lista CERRADA):
${equivalences.map((e) => `     · ${e.sum}  — ${e.gloss}`).join("\n")}
   Usa SOLO estas y escribe su suma tal cual. NO añadas ninguna otra palabra
   con este valor, por conocida que te parezca.`
    : `   NO tenemos ninguna equivalencia verificada para ${gem}. Por tanto NO
   menciones ninguna palabra hebrea que "valga ${gem}": no la cites, no la
   adivines. Habla solo del sentido del número y de su estructura.`;

  // Si el diccionario lematiza a otra forma, se nombra como lema — nunca se
  // analiza en lugar de la palabra que el lector pulsó.
  const lemmaNote = lemma
    ? `\nEl diccionario lematiza esta palabra como ${lemma} (forma de diccionario).
Puedes nombrarla como lema, pero el análisis es de ${word}, no del lema, y NO
le atribuyas al lema ningún valor numérico.`
    : "";

  return `Eres el léxico místico de Jashmal. Analiza la palabra hebrea ${word}
(consonantes: ${consonants}; letras: ${letters}).
Su gematría es ${gem}, y esta es la suma: ${breakdown} = ${gem}.
Analiza EXACTAMENTE esta forma, la que el lector pulsó: ni su singular, ni su
plural, ni su raíz en lugar de ella.${lemmaNote}

Sentido clásico de referencia (de los diccionarios): ${classic || "(no disponible)"}

REGLA ABSOLUTA, por encima de todo lo demás: tienes PROHIBIDO afirmar que un
número es el valor de una palabra sin escribir en el propio texto la suma letra
por letra (así: «פרץ = 80+200+90 = 370»). Si no puedes escribir la suma, no
menciones el número. No sumes de memoria: si no está en los datos de arriba, no
lo digas. Vale más un análisis sin un solo número que un número inventado.

Responde SIEMPRE en ${lang}. Sé conciso y bello, con estos tres apartados breves
y títulos en hebreo:

1. אוֹתִיּוֹת — Letra por letra: el sentido espiritual de cada letra de la palabra
   y cómo se combinan en un mensaje. Para CADA letra usa el enlace
   {{letter:NOMBRE|LETRA}} (ej. {{letter:alef|א}}). Usa los nombres en transliteración.
2. גִּימַטְרִיָּה — El valor ${gem}: su significado espiritual.
${equivBlock}
3. שֹׁרֶשׁ — La raíz y el hilo espiritual que une el sentido literal con el místico.

Sé riguroso: no inventes gematrías ni raíces. Breve pero profundo.`;
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

  // Equivalencias numéricas: las suma el código desde el banco verificado.
  // Al modelo se le entregan ya hechas; no se le pide que las recuerde.
  const equivalences = verifiedEquivalences(classic.gematria, classic.consonants);

  // Suma letra por letra de la palabra consultada, para que el modelo la cite
  // en lugar de inventarla.
  const breakdownText = classic.breakdown
    .map((b) => `${b.letter}${b.value}`)
    .join(" + ");

  // Lema del diccionario, solo si difiere de la forma que el lector pulsó.
  const headword = classic.entries.find(
    (e) => e.headword && stripNiqud(e.headword) !== classic.consonants
  )?.headword;

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
        breakdownText,
        equivalences,
        headword ?? "",
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
