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

// ── Búsqueda DENTRO de los textos (full-text) ────────────────────────────────
// Sefaria expone un buscador de texto completo en /api/search-wrapper que soporta
// CORS (access-control-allow-origin: *), así que se llama DIRECTO desde el
// navegador, igual que el resto de Sefaria. No requiere API key.

/** Un pasaje encontrado por la búsqueda de texto completo. */
export interface TextSearchHit {
  /** referencia canónica para cargar con loadRef. ej. "Genesis 1:1". */
  ref: string;
  /** referencia en hebreo (para mostrar en RTL). */
  heRef?: string;
  /** fragmento del texto con el término resaltado entre «marcas». */
  snippet: string;
}

// El resaltado de Sefaria llega como <b>…</b> dentro del HTML del fragmento.
// Lo convertimos a marcadores de texto propios ANTES de quitar el HTML, para no
// perder dónde estaba la coincidencia. El frontend importa estas MISMAS constantes
// y parte el snippet por ellas para pintar el término en dorado. Son cadenas que
// nunca aparecen en un texto bíblico.
export const HL_OPEN = "«hl»";
export const HL_CLOSE = "«/hl»";

function snippetFromHighlight(highlight: string): string {
  return stripHtml(
    highlight
      .replace(/<b>/gi, HL_OPEN)
      .replace(/<\/b>/gi, HL_CLOSE)
  )
    // El stripHtml deja las marcas; recortamos espacios sobrantes alrededor.
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Busca una palabra o frase DENTRO de los textos (no solo títulos/temas).
 * Sirve en hebreo o en traducción. Devuelve hasta `limit` pasajes con su
 * referencia y un fragmento resaltado. Nunca lanza: ante error devuelve [].
 *
 * @param categories  ids de categoría top-level del catálogo (ej. "Tanakh",
 *   "Talmud", "Kabbalah") para acotar la búsqueda. Sefaria filtra por el path
 *   de categoría vía `filters` + `aggregation_field: "path"`. Vacío = sin filtro.
 * @param exact  si true, exige coincidencia EXACTA de la frase (campo "exact"
 *   de Sefaria) en vez de tolerar variantes/flexiones (naive_lemmatizer).
 */
export async function searchText(
  q: string,
  limit = 8,
  categories: string[] = [],
  exact = false
): Promise<TextSearchHit[]> {
  const query = q.trim();
  if (!query) return [];
  try {
    const field = exact ? "exact" : "naive_lemmatizer";
    // OJO: NO mandamos "Content-Type: application/json". Ese header convierte la
    // petición en "no simple" y dispara un preflight CORS (OPTIONS) que el
    // endpoint de Sefaria rechaza desde el navegador → "Failed to fetch". Sin el
    // header, es una petición CORS simple y Sefaria igual lee el body como JSON.
    const res = await fetch(`${BASE}/search-wrapper`, {
      method: "POST",
      body: JSON.stringify({
        query,
        type: "text",
        size: Math.max(1, Math.min(limit, 20)),
        field, // "naive_lemmatizer" tolera flexiones; "exact" exige la frase literal
        ...(field === "exact" ? { exact_query: query } : {}),
        source_proj: true,          // pide ref/heRef limpios en _source
        ...(categories.length > 0 && {
          // Sefaria filtra por path de categoría (ej. "Tanakh", "Talmud").
          filters: categories,
          aggregation_field: "path",
        }),
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const hits: unknown[] = data?.hits?.hits ?? [];
    const out: TextSearchHit[] = [];
    const seen = new Set<string>();
    for (const h of hits) {
      const hit = h as {
        _source?: { ref?: string; heRef?: string };
        highlight?: { naive_lemmatizer?: string[]; exact?: string[] };
      };
      const ref = hit._source?.ref;
      if (!ref || seen.has(ref)) continue;
      seen.add(ref);
      const frags =
        hit.highlight?.naive_lemmatizer ?? hit.highlight?.exact ?? [];
      const snippet = frags.length > 0 ? snippetFromHighlight(frags[0]) : "";
      out.push({ ref, heRef: hit._source?.heRef, snippet });
      if (out.length >= limit) break;
    }
    return out;
  } catch {
    return [];
  }
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
