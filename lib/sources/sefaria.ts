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

/** Resultado de sugerencias: la lista + si la QUERY ESCRITA (no una sugerencia
 * cualquiera) es en sí misma una referencia válida según Sefaria (`is_ref`
 * top-level de /api/name). Úsalo para decidir si conviene auto-navegar a un
 * texto en vez de mandar a la búsqueda completa. */
export interface SearchSuggestionsResult {
  suggestions: NameSuggestion[];
  /** true si Sefaria interpreta la query completa como una referencia real
   * (ej. "Genesis 1:1"), no solo un libro que contiene esa palabra. */
  isRefQuery: boolean;
}

/** Sugerencias enriquecidas: distingue textos (ref) de temas/personas/lugares. */
export async function searchSuggestions(q: string): Promise<SearchSuggestionsResult> {
  const empty: SearchSuggestionsResult = { suggestions: [], isRefQuery: false };
  if (!q.trim()) return empty;
  const res = await fetch(`${BASE}/name/${encodeURIComponent(q)}`);
  if (!res.ok) return empty;
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
  return { suggestions: out, isRefQuery: Boolean(data.is_ref) };
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
  /** fragmento del texto con el término resaltado entre «marcas». Puede venir
   * en hebreo O en la traducción, según el idioma de la VERSIÓN que Elasticsearch
   * indexó para este hit (ver `lang` más abajo) — Sefaria no devuelve ambos
   * highlights en el mismo hit. */
  snippet: string;
  /** "he" si `snippet` es hebreo, "en" (o el idioma que sea) si ya es traducción.
   * Úsalo para saber si hace falta enriquecer con `enrichWithTranslation`. */
  snippetLang?: string;
  /** traducción del pasaje (si se pudo obtener). Se completa de forma
   * asíncrona vía `enrichWithTranslation`, NUNCA viene poblado en el hit
   * crudo de searchText/searchTextFull. */
  snippetEn?: string;
  /** categoría top-level de Sefaria (primer tramo de `_source.path`, ej.
   * "Kabbalah", "Talmud") para pintar el acento de color por disciplina. */
  category?: string;
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
        _source?: { ref?: string; heRef?: string; lang?: string; path?: string };
        highlight?: { naive_lemmatizer?: string[]; exact?: string[] };
      };
      const ref = hit._source?.ref;
      if (!ref || seen.has(ref)) continue;
      seen.add(ref);
      const frags =
        hit.highlight?.naive_lemmatizer ?? hit.highlight?.exact ?? [];
      const snippet = frags.length > 0 ? snippetFromHighlight(frags[0]) : "";
      const category = hit._source?.path?.split("/")[0];
      out.push({
        ref,
        heRef: hit._source?.heRef,
        snippet,
        snippetLang: hit._source?.lang,
        category,
      });
      if (out.length >= limit) break;
    }
    return out;
  } catch {
    return [];
  }
}

/**
 * Completa `snippetEn` con un fragmento en el idioma de la INTERFAZ activa
 * (es/en/fa), sin importar en qué idioma haya llegado el snippet original de
 * Sefaria. Esto es necesario porque Elasticsearch solo indexa highlight en UN
 * idioma por hit (ver TextSearchHit.snippetLang), y ese idioma puede ser
 * CUALQUIERA que un voluntario haya subido — portugués, alemán, francés,
 * etc. — no solo hebreo o inglés. Pedir `lang=en` al texto completo ayuda
 * pero NO garantiza inglés real para todos los pasajes, así que el paso
 * final SIEMPRE es traducir con Claude al idioma pedido (incluso si
 * `locale` ya es "en": el candidato podría no ser inglés de verdad).
 *
 * Paso 1 — candidato: si `snippetLang === "he"`, pide el texto completo por
 * ref con `&lang=en` (más confiable que el default) y recorta un fragmento
 * corto; si no, usa el snippet original tal cual (en su idioma real,
 * cualquiera que sea) como candidato.
 * Paso 2 — traducción forzada: TODOS los candidatos se traducen en UNA sola
 * llamada batch a `/api/translate` (`mode: "snippet"`) al `locale` pedido.
 * Una sola llamada para toda la página evita agotar el rate limit con 20
 * resultados. Si el batch falla por completo, NO se muestra el candidato sin
 * traducir (evita mostrar un idioma que el usuario no entiende): esa entrada
 * simplemente queda sin `snippetEn` (el hebreo, si existe, sigue mostrándose
 * aparte).
 *
 * Si no se pasa `locale`, se asume "en" (comportamiento seguro por defecto).
 * Nunca lanza.
 */
export async function enrichWithTranslation(
  hits: TextSearchHit[],
  maxChars = 220,
  locale?: string
): Promise<TextSearchHit[]> {
  const targetLocale = locale === "es" || locale === "fa" ? locale : "en";

  // Paso 1: candidato por hit (no es todavía la traducción final).
  const withCandidate = await Promise.all(
    hits.map(async (h) => {
      if (!h.ref) return { hit: h, candidate: undefined as string | undefined };
      if (h.snippetLang === "he") {
        try {
          const res = await fetch(
            `${BASE}/texts/${encodeURIComponent(h.ref)}?context=0&lang=en`
          );
          if (!res.ok) return { hit: h, candidate: undefined };
          const data: SefariaText = await res.json();
          const translation = toSegments(data.text).join(" ").trim();
          if (!translation) return { hit: h, candidate: undefined };
          const cut =
            translation.length > maxChars ? `${translation.slice(0, maxChars)}…` : translation;
          return { hit: h, candidate: cut };
        } catch {
          return { hit: h, candidate: undefined };
        }
      }
      // Ya viene en traducción (idioma real desconocido: puede ser
      // portugués, alemán, inglés...). Se traduce igual en el paso 2.
      return { hit: h, candidate: h.snippet || undefined };
    })
  );

  // Paso 2: traducción forzada al idioma de interfaz, en una sola llamada.
  const idxToTranslate: number[] = [];
  const toTranslate: string[] = [];
  withCandidate.forEach(({ candidate }, i) => {
    if (candidate) {
      idxToTranslate.push(i);
      toTranslate.push(candidate);
    }
  });

  const out = withCandidate.map(({ hit }) => hit);
  if (toTranslate.length === 0) return out;

  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Sin `ref`: cada búsqueda trae una mezcla distinta de snippets, así
        // que no hay una clave de caché natural por-ref aquí (el backend
        // simplemente no cachea este batch, lo que está bien: son pocas
        // llamadas por búsqueda, no por estudio).
        segments: toTranslate,
        locale: targetLocale,
        mode: "snippet",
      }),
    });
    if (!res.ok) return out; // sin traducción confirmada → no se muestra nada (mejor que idioma equivocado)
    const data = (await res.json()) as { translations?: string[] };
    if (!Array.isArray(data.translations) || data.translations.length !== toTranslate.length) {
      return out;
    }
    idxToTranslate.forEach((origIdx, j) => {
      const tr = data.translations![j];
      if (tr) out[origIdx] = { ...out[origIdx], snippetEn: tr };
    });
    return out;
  } catch {
    return out; // fallo de red → tampoco se muestra un idioma sin confirmar
  }
}

// ── Página de resultados completa (/buscar) ──────────────────────────────────
// A diferencia de searchText() (pensada para el desplegable rápido del
// buscador), esta función trae TAMBIÉN el conteo real de resultados por
// categoría top-level, para poder mostrar un panel de checkboxes tipo
// "Kabbalah (702)" como en sefaria.org/search.
//
// Sefaria expone esto vía Elasticsearch aggregations: se pide `aggs: ["path"]`
// (no "aggregation_field", que es el nombre viejo/inactivo) y el backend
// devuelve `aggregations.path.buckets`, una lista de TODOS los subcaminos de
// categoría con su doc_count exacto — no una muestra. Cada bucket.key es un
// path completo tipo "Tanakh/Torah/Genesis"; agregamos por su PRIMER tramo
// (la categoría top-level: Tanakh, Talmud, Kabbalah...) para obtener el
// conteo que se muestra en el checkbox. `sum_other_doc_count: 0` en la
// respuesta confirma que la agregación es completa (no recortada), así que
// estos conteos son reales, no aproximados — a diferencia de `hits.total`,
// que Elasticsearch topa en 10000 aunque haya más resultados.
export interface CategoryCount {
  /** id de categoría top-level, ej. "Kabbalah", "Tanakh Commentary". */
  category: string;
  count: number;
}

export interface FullTextSearchResult {
  hits: TextSearchHit[];
  /** conteo real por categoría top-level, de mayor a menor. */
  categoryCounts: CategoryCount[];
  /** total de resultados (puede venir topado en 10000 por Elasticsearch). */
  total: number;
  /** true si `total` está topado (hay más resultados de los que Elasticsearch reporta). */
  totalIsCapped: boolean;
}

/**
 * Búsqueda completa para la página de resultados /buscar: pasajes + conteo
 * real por categoría (para el panel de checkboxes) + total. Igual que
 * searchText(), nunca lanza: ante error devuelve resultado vacío.
 *
 * @param categories  ids de categoría TOP-LEVEL para filtrar los HITS
 *   mostrados (checkboxes marcados). El panel de conteos siempre refleja
 *   TODAS las categorías (sin este filtro), para que el usuario pueda ver
 *   cuántos resultados tiene cada una y decidir qué marcar.
 */
export async function searchTextFull(
  q: string,
  limit = 20,
  categories: string[] = [],
  exact = false
): Promise<FullTextSearchResult> {
  const empty: FullTextSearchResult = { hits: [], categoryCounts: [], total: 0, totalIsCapped: false };
  const query = q.trim();
  if (!query) return empty;
  try {
    const field = exact ? "exact" : "naive_lemmatizer";
    const res = await fetch(`${BASE}/search-wrapper`, {
      method: "POST",
      body: JSON.stringify({
        query,
        type: "text",
        size: Math.max(1, Math.min(limit, 50)),
        field,
        ...(field === "exact" ? { exact_query: query } : {}),
        source_proj: true,
        aggs: ["path"], // pide la agregación por path de categoría
        ...(categories.length > 0 && { filters: categories, aggregation_field: "path" }),
      }),
    });
    if (!res.ok) return empty;
    const data = await res.json();
    const rawHits: unknown[] = data?.hits?.hits ?? [];
    const out: TextSearchHit[] = [];
    const seen = new Set<string>();
    for (const h of rawHits) {
      const hit = h as {
        _source?: { ref?: string; heRef?: string; lang?: string; path?: string };
        highlight?: { naive_lemmatizer?: string[]; exact?: string[] };
      };
      const ref = hit._source?.ref;
      if (!ref || seen.has(ref)) continue;
      seen.add(ref);
      const frags = hit.highlight?.naive_lemmatizer ?? hit.highlight?.exact ?? [];
      const snippet = frags.length > 0 ? snippetFromHighlight(frags[0]) : "";
      const category = hit._source?.path?.split("/")[0];
      out.push({
        ref,
        heRef: hit._source?.heRef,
        snippet,
        snippetLang: hit._source?.lang,
        category,
      });
      if (out.length >= limit) break;
    }
    // Agregamos los buckets de path por su PRIMER tramo (categoría top-level).
    const buckets: Array<{ key: string; doc_count: number }> = data?.aggregations?.path?.buckets ?? [];
    const byTop = new Map<string, number>();
    for (const b of buckets) {
      const top = b.key.split("/")[0];
      byTop.set(top, (byTop.get(top) ?? 0) + b.doc_count);
    }
    const categoryCounts: CategoryCount[] = [...byTop.entries()]
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
    const total: number = data?.hits?.total ?? 0;
    return { hits: out, categoryCounts, total, totalIsCapped: total >= 10000 };
  } catch {
    return empty;
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
