// Cliente de Sefaria. Se llama DIRECTO desde el navegador (Sefaria soporta CORS).

const BASE = "https://www.sefaria.org/api";

export interface SefariaText {
  ref: string;
  heRef: string;
  /** versículos/segmentos en hebreo (array) o un único string. */
  he: string[] | string;
  text: string[] | string;
  next: string | null;
  prev: string | null;
}

export interface SefariaTextResult {
  ref: string;
  heRef: string;
  /** siempre normalizado a array de segmentos en hebreo, sin etiquetas HTML. */
  segments: string[];
  /** traducción al idioma que devuelve Sefaria (inglés normalmente). */
  translations: string[];
  /** ref de la sección siguiente según Sefaria (null si es la última). */
  next: string | null;
  /** ref de la sección anterior según Sefaria (null si es la primera). */
  prev: string | null;
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
    translations: toSegments(data.text),
    next: data.next ?? null,
    prev: data.prev ?? null,
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

// Sugerencia de autocompletado, con su naturaleza (texto vs tema/persona/lugar).
export interface NameSuggestion {
  title: string;     // lo que se muestra
  key: string;       // ref (si es texto) o slug del tema
  kind: "ref" | "topic"; // ref → carga el texto; topic → estudio de concepto
}

/** Autocompletado de la lupa: refs, libros, temas, personas y lugares. */
export async function getName(q: string): Promise<SefariaNameResult> {
  const res = await fetch(`${BASE}/name/${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`Sefaria name error: ${res.status}`);
  const data = await res.json();
  return {
    is_ref: Boolean(data.is_ref),
    completions: Array.isArray(data.completions) ? data.completions.slice(0, 8) : [],
  };
}

/** Sugerencias enriquecidas: distingue textos (ref) de temas/personas/lugares. */
export async function searchSuggestions(q: string): Promise<NameSuggestion[]> {
  if (!q.trim()) return [];
  const res = await fetch(`${BASE}/name/${encodeURIComponent(q)}`);
  if (!res.ok) return [];
  const data = await res.json();
  const objs: Array<{ title?: string; key?: string; type?: string }> =
    Array.isArray(data.completion_objects) ? data.completion_objects : [];
  const out: NameSuggestion[] = [];
  const seen = new Set<string>();
  for (const o of objs) {
    const title = o.title ?? "";
    if (!title || seen.has(title)) continue;
    seen.add(title);
    const isRef = o.type === "ref";
    out.push({
      title,
      key: o.key ?? title,
      kind: isRef ? "ref" : "topic",
    });
    if (out.length >= 8) break;
  }
  return out;
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
