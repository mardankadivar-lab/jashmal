// Capa de catálogo: usa el catálogo COMPLETO autogenerado desde Sefaria
// (lib/catalog.generated.ts) y le añade nombres localizados ES/FA.

import { CATALOG, type CatGroup, type CatBook, type CatSub } from "./catalog.generated";
import { localizedBookLabel, SUB_FA } from "./bookNames";

export type { CatGroup, CatBook, CatSub };
export { CATALOG };

export type CategoryId = string;

// Orden y etiqueta de las categorías de primer nivel.
export const CATEGORY_ORDER: CategoryId[] = CATALOG.map((g) => g.id);

export function getGroup(id: CategoryId): CatGroup | undefined {
  return CATALOG.find((g) => g.id === id);
}

/** Etiqueta visible de una categoría (ES o FA). */
export function categoryLabel(g: CatGroup, locale: string): string {
  return locale === "fa" ? "" : g.es; // en FA mostramos solo el hebreo (g.he)
}

/** Etiqueta de un libro, localizada. */
export function bookLabel(b: CatBook, locale: string): string {
  return localizedBookLabel(b.id, b.label, locale);
}

/** Etiqueta de subcategoría (ES viene en el dato; FA del mapa). */
export function subLabel(sub: string | null, locale: string): string {
  if (!sub) return "";
  if (locale === "fa") return SUB_FA[sub] ?? sub;
  return sub;
}
