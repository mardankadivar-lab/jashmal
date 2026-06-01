// Léxico hebreo: capa clásica desde Sefaria (Strong/BDB/Klein/Jastrow) +
// gematría calculada en código. La capa mística (letra por letra, conexiones
// numéricas) la genera Claude en la API route.

const BASE = "https://www.sefaria.org/api";

// ---- Gematría ----

// Valor estándar de cada letra (las finales valen igual que su forma normal).
const GEMATRIA: Record<string, number> = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50,
  ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90,
  ק: 100, ר: 200, ש: 300, ת: 400,
};

// Quita niqud (vocales/cantilación) para quedarnos con las consonantes.
export function stripNiqud(s: string): string {
  return s.replace(/[֑-ׇ]/g, "");
}

export function gematria(word: string): number {
  const letters = stripNiqud(word);
  let sum = 0;
  for (const ch of letters) sum += GEMATRIA[ch] ?? 0;
  return sum;
}

/** Lista [letra, valor] de cada consonante, para mostrar el desglose. */
export function gematriaBreakdown(word: string): { letter: string; value: number }[] {
  const letters = stripNiqud(word);
  const out: { letter: string; value: number }[] = [];
  for (const ch of letters) {
    if (GEMATRIA[ch]) out.push({ letter: ch, value: GEMATRIA[ch] });
  }
  return out;
}

// Nombres de las letras (para la capa mística y la UI).
export const LETTER_NAMES: Record<string, string> = {
  א: "alef", ב: "bet", ג: "guimel", ד: "dalet", ה: "he", ו: "vav",
  ז: "zayin", ח: "jet", ט: "tet", י: "yod", כ: "kaf", ך: "kaf",
  ל: "lamed", מ: "mem", ם: "mem", נ: "nun", ן: "nun", ס: "samej",
  ע: "ayin", פ: "pe", ף: "pe", צ: "tzadi", ץ: "tzadi", ק: "kof",
  ר: "resh", ש: "shin", ת: "tav",
};

// ---- Capa clásica desde Sefaria ----

export interface LexiconEntry {
  lexicon: string; // "BDB Augmented Strong", "Klein Dictionary", etc.
  headword: string;
  strongNumber?: string;
  definition: string; // texto limpio (sin HTML)
}

function cleanHtml(s: string): string {
  return String(s)
    .replace(/<[^>]+>/g, "")
    .replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// El campo content de Sefaria es heterogéneo: puede ser string, o un dict con
// `senses` (lista de {definition}), o con `definition`. Extraemos lo legible.
function extractDefinition(content: unknown): string {
  if (typeof content === "string") return cleanHtml(content);
  if (content && typeof content === "object") {
    const c = content as Record<string, unknown>;
    const parts: string[] = [];
    if (Array.isArray(c.senses)) {
      for (const s of c.senses) {
        if (s && typeof s === "object" && "definition" in s) {
          parts.push(cleanHtml((s as Record<string, unknown>).definition as string));
        }
      }
    }
    if (typeof c.definition === "string") parts.push(cleanHtml(c.definition));
    return parts.filter(Boolean).join(" — ").slice(0, 600);
  }
  return "";
}

interface RawEntry {
  parent_lexicon?: string;
  headword?: string;
  strong_number?: string;
  transliteration?: string; // pronunciación en script latino (ej. "bereshit")
  pronunciation?: string;   // guía de pronunciación (ej. "bə-rê-šîṯ")
  content?: unknown;
}

// Diccionarios que mostramos y su orden de preferencia.
const LEXICON_ORDER = [
  "BDB Augmented Strong",
  "Klein Dictionary",
  "BDB Dictionary",
  "Jastrow Dictionary",
  "BDB Aramaic Dictionary",
];

export interface ClassicLexicon {
  word: string;
  consonants: string;
  transliteration: string; // pronunciación en letras latinas, p.ej. "bereshit"
  gematria: number;
  breakdown: { letter: string; value: number }[];
  entries: LexiconEntry[];
}

export async function getClassicLexicon(word: string): Promise<ClassicLexicon> {
  const consonants = stripNiqud(word);
  const base: ClassicLexicon = {
    word,
    consonants,
    transliteration: "",
    gematria: gematria(word),
    breakdown: gematriaBreakdown(word),
    entries: [],
  };

  try {
    const res = await fetch(`${BASE}/words/${encodeURIComponent(word)}`, {
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!res.ok) return base;
    const raw: RawEntry[] = await res.json();
    const entries: LexiconEntry[] = [];
    const seen = new Set<string>();

    // Recoger la mejor transliteración de todas las entradas.
    let bestTranslit = "";
    for (const e of raw) {
      // Priorizar la del BDB Augmented Strong (la más completa).
      const t = e.transliteration || e.pronunciation || "";
      if (t && (!bestTranslit || e.parent_lexicon === "BDB Augmented Strong")) {
        bestTranslit = t;
      }

      const def = extractDefinition(e.content);
      if (!def) continue;
      const lexicon = e.parent_lexicon ?? "?";
      const key = `${lexicon}|${e.headword}|${def.slice(0, 40)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({
        lexicon,
        headword: e.headword ?? word,
        strongNumber: e.strong_number,
        definition: def,
      });
    }
    base.transliteration = bestTranslit;
    // Ordenar por preferencia de diccionario.
    entries.sort((a, b) => {
      const ia = LEXICON_ORDER.indexOf(a.lexicon);
      const ib = LEXICON_ORDER.indexOf(b.lexicon);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    base.entries = entries.slice(0, 6);
  } catch {
    // sin conexión al léxico: devolvemos al menos la gematría (calculada local).
  }
  return base;
}
