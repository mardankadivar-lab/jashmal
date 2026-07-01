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
