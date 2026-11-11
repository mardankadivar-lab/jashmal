import { NextResponse } from "next/server";
import { anthropic, LIGHT_MODEL } from "@/lib/engine/anthropic";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";
import {
  atbash,
  gematria,
  gematriaBreakdown,
  gematriaFull,
  stripNiqud,
} from "@/lib/sources/lexicon";
import { verifiedEquivalences } from "@/lib/sources/gematriaBank";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = LIGHT_MODEL;

const LANG: Record<string, string> = {
  es: "español",
  fa: "persa (فارسی) — NO árabe; usa vocabulario y gramática persas",
  en: "English",
};

// Cuántas candidatas pedimos. Pedimos DE MÁS a propósito: el filtro
// aritmético descarta buena parte, y preferimos que sobren a que falten.
const ASK_FOR = 15;
const SHOW_MAX = 7;

export interface Connection {
  hebrew: string;      // consonantes, ya verificadas
  translit: string;
  meaning: string;
  why: string;
  sum: string;         // la suma escrita por NOSOTROS: "רז = 200+7 = 207"
  fromBank: boolean;   // true = del banco verificado por el Sofer
}

/** Solo letras hebreas y espacios (una palabra o una frase corta). */
const ONLY_HEBREW = /^[א-ת ]+$/;

interface RawCandidate {
  hebreo?: unknown;
  translit?: unknown;
  significado?: unknown;
  porque?: unknown;
}

/** Saca el array de candidatas de la respuesta del modelo, tolerando adornos. */
function parseCandidates(text: string): RawCandidate[] {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fenced ? fenced[1] : text;
  const start = body.indexOf("[");
  const end = body.lastIndexOf("]");
  if (start === -1 || end <= start) return [];
  try {
    const parsed: unknown = JSON.parse(body.slice(start, end + 1));
    return Array.isArray(parsed) ? (parsed as RawCandidate[]) : [];
  } catch {
    return [];
  }
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// POST { word, gematria, locale } → { items, proposed, verified, atbash, ordinal }
//
// El motor PROPONE y el código JUZGA. Antes se le pedía al modelo "5-7 palabras
// con el mismo valor" y se imprimía «(gematría: N)» al lado de cada una: el
// lector veía el número correcto pegado a la palabra equivocada. Ahora el
// modelo propone muchas candidatas, el código suma cada una letra por letra y
// solo sobreviven las que cuadran exactamente. Las verdaderas lo son por
// construcción, no por buena fe del modelo.
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`gematria:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { word?: string; gematria?: number; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const word = (body.word ?? "").trim();
  const value = body.gematria ?? 0;
  const locale = ["es","fa","en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  const lang = LANG[locale] ?? LANG.es;

  if (!word || value < 1) {
    return NextResponse.json({ error: "missing_params" }, { status: 400 });
  }

  const consonants = stripNiqud(word).replace(/[^א-ת]/g, "");

  // At-bash y valor ordinal: los calcula el código. Nunca se le piden al modelo.
  const atbashWord = atbash(word);
  const atbashValue = gematria(atbashWord);
  const ordinal = gematriaFull(word).ordinal;

  const prompt = `Eres un maestro de guematría kabbalística en la tradición de Rav
Itzjak Ginsburgh. La palabra hebrea es ${word} y su valor absoluto es ${value}.

Propón ${ASK_FOR} palabras, nombres o frases hebreas que, según tu conocimiento,
valgan exactamente ${value} (guematría absoluta, mispar hejrají).

Busca sobre todo conexiones que revelen algo: paradójicas o sorprendentes (del
tipo Mashíaj = Najash), nombres divinos, sefirot, partzufim, frases bíblicas.

REGLAS DURAS:
- Valor EXACTO. Nada de colel, nada de ±1, nada de "aproximadamente".
- No escribas números en los textos: del valor numérico nos ocupamos nosotros.
- Propón solo palabras hebreas reales, escritas en letras hebreas.
- Prefiere proponer de más: cada candidata será verificada antes de mostrarse.

Responde ÚNICAMENTE con un array JSON, sin texto alrededor, con esta forma:
[
  {"hebreo":"רז","translit":"raz","significado":"secreto","porque":"la luz y el secreto se sostienen"},
  ...
]
"significado" y "porque" van en ${lang}; "porque" en una línea breve, sin cifras.`;

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1400,
      messages: [{ role: "user", content: prompt }],
    });

    const text = msg.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    const candidates = parseCandidates(text);

    // ── El juicio: se suma cada candidata letra por letra ──────────────────
    const items: Connection[] = [];
    const seen = new Set<string>();
    const rejected: string[] = [];

    // Primero, las del banco verificado por el Sofer: van delante y marcadas.
    for (const m of verifiedEquivalences(value, consonants, SHOW_MAX)) {
      const key = m.hebrew.replace(/ /g, "");
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({
        hebrew: m.hebrew,
        translit: "",
        meaning: m.gloss,
        why: "",
        sum: m.sum,
        fromBank: true,
      });
    }

    for (const c of candidates) {
      const hebrew = stripNiqud(str(c.hebreo)).trim();
      if (!hebrew || !ONLY_HEBREW.test(hebrew)) {
        rejected.push(`${str(c.hebreo) || "(vacía)"}: no es una palabra hebrea`);
        continue;
      }
      const real = gematria(hebrew);
      if (real !== value) {
        rejected.push(`${hebrew}: vale ${real}, no ${value}`);
        continue;
      }
      const key = hebrew.replace(/ /g, "");
      if (key === consonants || seen.has(key)) continue;
      seen.add(key);
      items.push({
        hebrew,
        translit: str(c.translit),
        meaning: str(c.significado),
        why: str(c.porque),
        sum: `${hebrew} = ${gematriaBreakdown(hebrew).map((b) => b.value).join("+")} = ${value}`,
        fromBank: false,
      });
    }

    // Cuánto inventa el motor: el dato que dice si este filtro basta.
    console.log(
      `[gematria-connections] ${word} (${value}): propuestas=${candidates.length} ` +
        `verificadas=${items.filter((i) => !i.fromBank).length} ` +
        `descartadas=${rejected.length} banco=${items.filter((i) => i.fromBank).length}`
    );
    if (rejected.length) {
      console.log(`[gematria-connections] descartadas: ${rejected.join(" | ")}`);
    }

    return NextResponse.json({
      word,
      gematria: value,
      items: items.slice(0, SHOW_MAX),
      proposed: candidates.length,
      verified: items.length,
      atbash: { word: atbashWord, value: atbashValue },
      ordinal,
    });
  } catch (err) {
    console.error("gematria-connections error", err);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
