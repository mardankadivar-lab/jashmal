// Cliente de Sefaria. Se llama DIRECTO desde el navegador (Sefaria soporta CORS).

const BASE = "https://www.sefaria.org/api";

export interface SefariaText {
  ref: string;
  heRef: string;
  /** versículos/segmentos en hebreo (array) o un único string. */
  he: string[] | string;
  text: string[] | string;
}

export interface SefariaTextResult {
  ref: string;
  heRef: string;
  /** siempre normalizado a array de segmentos en hebreo, sin etiquetas HTML. */
  segments: string[];
}

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&thinsp;/g, " ")
    .trim();
}

// Aplana recursivamente: los rangos que abarcan varios capítulos (ej. una
// parashá "Numbers 8:1-12:16") devuelven un array anidado [capítulo][versículo].
function flattenDeep(value: unknown): string[] {
  if (typeof value === "string") {
    const s = stripHtml(value);
    return s.length > 0 ? [s] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap(flattenDeep);
  }
  return [];
}

function toSegments(value: string[] | string): string[] {
  return flattenDeep(value);
}

/** Obtiene un texto. `ref` ej.: "Genesis 1", "Shabbat 2a", "Tanya, Chapter 1". */
export async function getText(ref: string): Promise<SefariaTextResult> {
  const res = await fetch(`${BASE}/texts/${encodeURIComponent(ref)}?context=0`);
  if (!res.ok) throw new Error(`Sefaria texts error: ${res.status}`);
  const data: SefariaText = await res.json();
  return {
    ref: data.ref,
    heRef: data.heRef,
    segments: toSegments(data.he),
  };
}

export interface SefariaName {
  lang: string;
  key: string;
  type: string;
}

export interface SefariaNameResult {
  is_ref: boolean;
  completions: string[];
}

/** Autocompletado de la lupa: sugerencias de referencias/títulos. */
export async function getName(q: string): Promise<SefariaNameResult> {
  const res = await fetch(`${BASE}/name/${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`Sefaria name error: ${res.status}`);
  const data = await res.json();
  return {
    is_ref: Boolean(data.is_ref),
    completions: Array.isArray(data.completions) ? data.completions.slice(0, 8) : [],
  };
}

/** Construye la ref de un capítulo o daf de Talmud. */
export function buildRef(
  bookId: string,
  type: "chapters" | "talmud",
  unit: number,
  amud?: "a" | "b"
): string {
  if (type === "talmud") {
    return `${bookId} ${unit}${amud ?? "a"}`;
  }
  return `${bookId} ${unit}`;
}
