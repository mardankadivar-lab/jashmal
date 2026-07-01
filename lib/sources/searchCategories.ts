// Las 18 categorías TOP-LEVEL reales del catálogo de Sefaria, tal como
// aparecen en `aggregations.path.buckets` de /api/search-wrapper (ver
// searchTextFull() en lib/sources/sefaria.ts). Son más que las 6 categorías
// curadas de lib/sources/categories.ts (Tanakh, Mishnah, Talmud, Midrash,
// Kabbalah, Chasidut) — esas son para la NAVEGACIÓN por libro; estas son
// para el panel de checkboxes de /buscar, replicando "Texts" de
// sefaria.org/search (ej. "Kabbalah (702)").
export interface SearchCategory {
  id: string;
  es: string;
  fa: string;
  en: string;
}

export const SEARCH_CATEGORIES: SearchCategory[] = [
  { id: "Tanakh", es: "Tanaj", fa: "تنخ", en: "Tanakh" },
  { id: "Mishnah", es: "Mishná", fa: "میشنا", en: "Mishnah" },
  { id: "Talmud", es: "Talmud", fa: "تلمود", en: "Talmud" },
  { id: "Midrash", es: "Midrash", fa: "میدراش", en: "Midrash" },
  { id: "Halakhah", es: "Halajá", fa: "هلاخا", en: "Halakhah" },
  { id: "Kabbalah", es: "Cabalá", fa: "قبالا", en: "Kabbalah" },
  { id: "Liturgy", es: "Liturgia", fa: "نیایش", en: "Liturgy" },
  { id: "Jewish Thought", es: "Pensamiento judío", fa: "اندیشه یهودی", en: "Jewish Thought" },
  { id: "Tosefta", es: "Tosefta", fa: "توسفتا", en: "Tosefta" },
  { id: "Chasidut", es: "Jasidut", fa: "حسیدوت", en: "Chasidut" },
  { id: "Musar", es: "Musar", fa: "موسار", en: "Musar" },
  { id: "Responsa", es: "Responsa", fa: "پاسخ‌نامه‌ها", en: "Responsa" },
  { id: "Second Temple", es: "Segundo Templo", fa: "معبد دوم", en: "Second Temple" },
  { id: "Reference", es: "Referencia", fa: "مرجع", en: "Reference" },
  { id: "Targum", es: "Targum", fa: "تارگوم", en: "Targum" },
  { id: "Tanakh Commentary", es: "Comentarios al Tanaj", fa: "شرح تنخ", en: "Tanakh Commentary" },
  { id: "Mishnah Commentary", es: "Comentarios a la Mishná", fa: "شرح میشنا", en: "Mishnah Commentary" },
  { id: "Talmud Commentary", es: "Comentarios al Talmud", fa: "شرح تلمود", en: "Talmud Commentary" },
];

const BY_ID = new Map(SEARCH_CATEGORIES.map((c) => [c.id, c]));

/** Etiqueta localizada de una categoría; cae al id de Sefaria si no está mapeada. */
export function searchCategoryLabel(id: string, locale: string): string {
  const c = BY_ID.get(id);
  if (!c) return id;
  if (locale === "fa") return c.fa;
  if (locale === "en") return c.en;
  return c.es;
}

/** Orden preferido para el panel: las categorías conocidas primero, en el
 * orden de SEARCH_CATEGORIES; cualquier categoría nueva que Sefaria agregue
 * en el futuro cae al final (nunca se pierde, solo queda sin traducir). */
export function sortCategoryCounts<T extends { category: string }>(items: T[]): T[] {
  const rank = new Map(SEARCH_CATEGORIES.map((c, i) => [c.id, i]));
  return [...items].sort((a, b) => {
    const ra = rank.get(a.category) ?? 999;
    const rb = rank.get(b.category) ?? 999;
    if (ra !== rb) return ra - rb;
    return a.category.localeCompare(b.category);
  });
}

// ── Colores por categoría (acento visual, tipo sefaria.org) ─────────────────
// Sefaria distingue cada disciplina con un color reconocible en su sitio
// (panel de "Texts" y bordes de tarjetas). No pudimos confirmar sus valores
// hexadecimales EXACTOS desde este entorno (sin acceso a inspeccionar su CSS
// compilado ni a su repo en este momento), así que esta es una PALETA PROPIA
// de Jashmal: coherente, distintiva por categoría, y que no rompe la estética
// general (fondo oscuro + dorado) — se usa solo como acento (punto, borde,
// pastilla pequeña), nunca como fondo dominante.
export const CATEGORY_COLORS: Record<string, string> = {
  Tanakh: "#5b8dd6",              // azul — texto fundacional
  Mishnah: "#6fae7a",             // verde — primera codificación oral
  Talmud: "#c97b4a",              // terracota — el gran debate
  Midrash: "#b06fc9",             // violeta — narrativa/exégesis
  Halakhah: "#4a9c9c",            // teal — ley práctica
  Kabbalah: "#c9a43e",            // dorado — Cabalá (el acento de marca)
  Liturgy: "#8a8fd6",             // lavanda — oración
  "Jewish Thought": "#d68f5b",    // ámbar — filosofía
  Tosefta: "#7aa66f",             // verde oliva — cercano a Mishná
  Chasidut: "#d65b8d",            // magenta — Jasidut
  Musar: "#5bb0a3",               // verde agua — ética
  Responsa: "#9c8a4a",            // caqui — jurisprudencia
  "Second Temple": "#a67a5b",     // marrón claro — literatura histórica
  Reference: "#8a8f99",           // gris — obras de consulta
  Targum: "#6f9fc9",              // azul claro — traducción antigua, cerca de Tanaj
  "Tanakh Commentary": "#7aa0d6", // azul pálido — comentario de Tanaj
  "Mishnah Commentary": "#8fc09a",// verde pálido — comentario de Mishná
  "Talmud Commentary": "#d69a70", // terracota pálido — comentario de Talmud
};

/** Color de acento de una categoría; gris neutro si no está mapeada. */
export function searchCategoryColor(id: string): string {
  return CATEGORY_COLORS[id] ?? "#8a8f99";
}
