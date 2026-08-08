// ─────────────────────────────────────────────────────────────────────────
//  BUSCADOR GLOBAL — normalizador y comparador (sin dependencias)
// ─────────────────────────────────────────────────────────────────────────
//  Son ~250 fichas (62 misterios, 22 letras, gematrías, lecciones, estaciones,
//  episodios y páginas principales). Para ese tamaño una librería de búsqueda
//  difusa (Fuse.js y compañía) cuesta ~13 KB comprimidos y resuelve un problema
//  que aquí no existe. Este archivo hace el trabajo en unas pocas decenas de
//  líneas y pesa 0 KB de dependencia.
//
//  Lo que sí importa en ESTE dominio no son las erratas de teclado, sino la
//  TRANSLITERACIÓN del hebreo: la misma palabra se escribe "Koraj" en español,
//  "Korach" en inglés y "Korah" en otras convenciones. Por eso el plegado
//  (`fold`) unifica esas variantes en vez de medir distancia de edición.
//
//  Además normaliza tres alfabetos, porque el índice es trilingüe:
//    · latino  — quita acentos (Mashíaj → mashiaj)
//    · hebreo  — quita niqqud y cantilación (מָשִׁיחַ → משיח)
//    · persa   — quita diacríticos, unifica ی/ي y ک/ك, y convierte los
//                dígitos persas y árabes a ASCII (۱۳۷ → 137)
// ─────────────────────────────────────────────────────────────────────────

export type SearchLocale = "es" | "fa" | "en";

/** Una ficha del índice. La arma `lib/search/catalog.ts` en el servidor. */
export interface SearchDoc {
  id: string;
  kind: SearchKind;
  /** Ruta SIN prefijo de idioma (el <Link> localizado lo añade). */
  href: string;
  /** Título por idioma. Español obligatorio; fa/en si el registro los tiene. */
  t: { es: string; fa?: string; en?: string };
  /** Gancho / descripción breve por idioma. */
  d?: { es?: string; fa?: string; en?: string };
  /** Término hebreo central (se busca con y sin niqqud). */
  he?: string;
  /** Serie o agrupación a la que pertenece. */
  serie?: string;
  /** Términos alternativos: transliteraciones, números, sinónimos. */
  extra?: string[];
  /**
   * Idiomas en los que la PÁGINA existe de verdad. No es lo mismo que los
   * idiomas indexados: un misterio se indexa en es/fa/en para que se pueda
   * encontrar escribiendo "Messiah", pero si la página solo existe en es/fa
   * el resultado lleva la etiqueta honesta "solo en español".
   */
  langs: SearchLocale[];
}

export type SearchKind =
  | "misterio"
  | "letra"
  | "gematria"
  | "leccion"
  | "estacion"
  | "podcast"
  | "pagina";

// ── Normalización ────────────────────────────────────────────────────────

// Dígitos persas (۰-۹) y árabes (٠-٩) → ASCII, para que "۱۳۷" encuentre /137.
const DIGIT_MAP: Record<string, string> = {};
for (let i = 0; i < 10; i++) {
  DIGIT_MAP[String.fromCharCode(0x06f0 + i)] = String(i); // persas
  DIGIT_MAP[String.fromCharCode(0x0660 + i)] = String(i); // árabes
}

// Niqqud, cantilación y puntuación hebrea (U+0591–U+05C7, geresh/gershayim).
const HEBREW_MARKS = /[֑-ׇ׳״]/g;
// Diacríticos árabes/persas (fatha, kasra, shadda, sukun, alef superscript…).
const ARABIC_MARKS = /[ً-ْٰـ]/g;
// Marcas combinantes latinas que deja NFD (tildes, diéresis…).
const LATIN_MARKS = /[̀-ͯ]/g;

/**
 * Deja un texto en su forma comparable: minúsculas, sin acentos, sin niqqud,
 * sin diacríticos persas, con dígitos ASCII y sin puntuación.
 */
export function normalize(input: string): string {
  if (!input) return "";
  let s = input.normalize("NFD").replace(LATIN_MARKS, "").toLowerCase();
  s = s.replace(HEBREW_MARKS, "").replace(ARABIC_MARKS, "");
  // Unificación persa/árabe: ي→ی, ك→ک, ة→ه (variantes de la misma letra).
  s = s.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/ة/g, "ه");
  s = s.replace(/[۰-۹٠-٩]/g, (d) => DIGIT_MAP[d] ?? d);
  // Puntuación y símbolos → espacio (guiones de slug incluidos).
  s = s.replace(/[·—–\-_.,;:!¡?¿"“”'‘’()[\]{}/\\|«»]/g, " ");
  return s.replace(/\s+/g, " ").trim();
}

/**
 * Plegado de transliteración hebrea: unifica las grafías que compiten entre
 * español, inglés y las convenciones académicas, para que una sola búsqueda
 * las alcance a todas.
 *   Koraj / Korach / Korah     → koraj
 *   Mashiaj / Mashiach         → masiaj
 *   Jashmal / Chashmal / Khashmal → jasmal
 *   Tzedaká / Tsedaka          → tsedaka
 * Se aplica SIEMPRE sobre texto ya normalizado.
 */
export function fold(input: string): string {
  let s = input;
  s = s.replace(/kh|ch|hh/g, "j"); // jota gutural en sus tres grafías
  s = s.replace(/tz/g, "ts"); // tzadi
  s = s.replace(/ph/g, "f");
  s = s.replace(/qu/g, "k").replace(/q/g, "k").replace(/c(?=[aou])/g, "k");
  s = s.replace(/sh/g, "s");
  s = s.replace(/w/g, "v"); // vav transliterada como w
  s = s.replace(/y(?=[aeiou])/g, "i");
  s = s.replace(/h/g, ""); // la he muda de las transliteraciones
  s = s.replace(/(.)\1+/g, "$1"); // letras dobles → simple
  return s;
}

// Palabras vacías que, solas, harían coincidir todo el catálogo. Solo se
// descartan cuando la consulta tiene además alguna palabra con contenido —
// así "el ojo" busca "ojo", pero buscar literalmente "la" sigue funcionando.
const STOPWORDS = new Set([
  "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "al",
  "y", "o", "en", "que", "a", "the", "of", "and", "in", "to", "is",
]);

/** Parte la consulta del usuario en términos comparables. */
export function tokenize(query: string): string[] {
  const raw = normalize(query).split(" ").filter(Boolean);
  if (raw.length <= 1) return raw;
  const meaty = raw.filter((w) => !STOPWORDS.has(w));
  return meaty.length ? meaty : raw;
}

// ── Puntuación ───────────────────────────────────────────────────────────

// Peso de cada campo: el título manda, el gancho apenas empuja.
const W_TITLE = 12;
const W_HE = 10;
const W_EXTRA = 8;
const W_SERIE = 4;
const W_DESC = 4;

/**
 * Umbral de calidad. Por debajo de esto NO se muestra nada: preferimos decir
 * "no hay estudio propio sobre esto" y ofrecer los textos de Sefaria, antes
 * que rellenar el panel con coincidencias flojas disfrazadas de resultados.
 * (Un fragmento a mitad de palabra dentro del gancho vale 2×4 = 8 → se cae.)
 */
export const MIN_SCORE = 10;

/** Rango de coincidencia de un término dentro de un campo ya normalizado. */
function rank(field: string, token: string): number {
  if (!field || !token) return 0;
  if (field === token) return 5; // el campo ES el término
  if (field.startsWith(token)) return 4; // el campo empieza por el término
  if (field.includes(` ${token}`)) return 3; // alguna palabra empieza así
  if (field.includes(token)) return 2; // aparece a mitad de palabra
  if (fold(field).includes(fold(token))) return 1; // solo tras plegar grafías
  return 0;
}

/** Orden de desempate entre tipos: primero lo que el sitio considera estudio. */
const KIND_BONUS: Record<SearchKind, number> = {
  misterio: 6,
  letra: 5,
  estacion: 4,
  gematria: 3,
  leccion: 2,
  pagina: 1,
  podcast: 1,
};

/** Campos comparables de una ficha, ya normalizados (se calcula una vez). */
interface Prepared {
  doc: SearchDoc;
  titles: string[];
  he: string;
  extra: string[];
  serie: string;
  descs: string[];
}

let preparedCache: { source: SearchDoc[]; prepared: Prepared[] } | null = null;

function prepare(docs: SearchDoc[]): Prepared[] {
  if (preparedCache && preparedCache.source === docs) return preparedCache.prepared;
  const prepared = docs.map((doc) => ({
    doc,
    titles: [doc.t.es, doc.t.fa, doc.t.en].filter(Boolean).map((v) => normalize(v as string)),
    he: normalize(doc.he ?? ""),
    extra: (doc.extra ?? []).map(normalize),
    serie: normalize(doc.serie ?? ""),
    descs: [doc.d?.es, doc.d?.fa, doc.d?.en].filter(Boolean).map((v) => normalize(v as string)),
  }));
  preparedCache = { source: docs, prepared };
  return prepared;
}

/** Mejor puntuación de UN término contra TODOS los campos de una ficha. */
function scoreToken(p: Prepared, token: string): number {
  let best = 0;
  for (const t of p.titles) best = Math.max(best, rank(t, token) * W_TITLE);
  best = Math.max(best, rank(p.he, token) * W_HE);
  for (const e of p.extra) best = Math.max(best, rank(e, token) * W_EXTRA);
  best = Math.max(best, rank(p.serie, token) * W_SERIE);
  // En el gancho solo cuentan las coincidencias que empiezan PALABRA. Un
  // fragmento a mitad de palabra es ruido disfrazado de resultado: buscar
  // "ojo" no debe traer la gematría 430 porque su texto en inglés dice
  // "sojourn". En el título sí se acepta, porque ahí el término es el tema.
  for (const d of p.descs) {
    const r = rank(d, token);
    if (r >= 3) best = Math.max(best, r * W_DESC);
  }
  return best;
}

export interface SearchResult {
  doc: SearchDoc;
  score: number;
}

/**
 * Busca en el catálogo. Semántica Y: si algún término de la consulta no
 * aparece en ningún campo de la ficha, la ficha queda fuera.
 */
export function searchDocs(docs: SearchDoc[], query: string, limit = 12): SearchResult[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  const prepared = prepare(docs);
  const out: SearchResult[] = [];

  for (const p of prepared) {
    let total = 0;
    let ok = true;
    for (const token of tokens) {
      const s = scoreToken(p, token);
      if (s === 0) {
        ok = false;
        break;
      }
      total += s;
    }
    if (!ok) continue;
    // El umbral se aplica a la CALIDAD de la coincidencia, antes de sumar el
    // bono de tipo. Si no, el bono colaría resultados flojos por encima de la
    // línea solo por ser de una categoría preferida.
    const calidad = total / tokens.length;
    if (calidad < MIN_SCORE) continue;
    out.push({ doc: p.doc, score: calidad + KIND_BONUS[p.doc.kind] });
  }

  out.sort((a, b) => b.score - a.score || a.doc.t.es.localeCompare(b.doc.t.es));
  return out.slice(0, limit);
}

/** Título de la ficha en el idioma activo, con respaldo a español. */
export function docTitle(doc: SearchDoc, locale: string): string {
  if (locale === "fa") return doc.t.fa || doc.t.es;
  if (locale === "en") return doc.t.en || doc.t.es;
  return doc.t.es;
}

/** Gancho de la ficha en el idioma activo, con respaldo a español. */
export function docDesc(doc: SearchDoc, locale: string): string {
  if (!doc.d) return "";
  if (locale === "fa") return doc.d.fa || doc.d.es || "";
  if (locale === "en") return doc.d.en || doc.d.es || "";
  return doc.d.es || "";
}

/** ¿La PÁGINA de destino existe en el idioma activo? (etiqueta de honestidad) */
export function docHasLocale(doc: SearchDoc, locale: string): boolean {
  return doc.langs.includes(locale as SearchLocale);
}
