// Capa de catálogo: usa el catálogo COMPLETO autogenerado desde Sefaria
// (lib/catalog.generated.ts), aplica overrides para obras complejas (Tania, etc.)
// y añade nombres localizados ES/FA.

import { CATALOG as RAW, type CatSub } from "@/lib/sources/catalog.generated";
import {
  COMPLEX_OVERRIDES,
  REF_OVERRIDES,
  HIDDEN_BOOKS,
  EXTRA_BOOKS,
  bookRef,
  type RichBook,
} from "@/lib/sources/catalogOverrides";
import { localizedBookLabel, SUB_FA, CATEGORY_FA } from "@/lib/sources/bookNames";

export type CatBook = RichBook;
export { bookRef };

export type CategoryId = string;

export interface RichSub {
  sub: string | null;
  subHe: string;
  books: RichBook[];
}
export interface RichGroup {
  id: string;
  he: string;
  es: string;
  fa: string;
  subs: RichSub[];
}

// Expande cada subcategoría: complejos → sus partes; aplica REF_OVERRIDES
// (parche de etiqueta/ref del Arí); oculta HIDDEN_BOOKS (refs rotos); e inyecta
// los EXTRA_BOOKS de la categoría (libros que no vienen en el catálogo generado,
// ej. Ben Porat Yosef en Jasidut). Los extra se añaden a la PRIMERA subcategoría
// de la categoría para que aparezcan en la lista plana.
function expandSub(sub: CatSub, extra: RichBook[]): RichSub {
  const books: RichBook[] = [];
  for (const b of sub.books) {
    if (HIDDEN_BOOKS.has(b.id)) continue;
    const parts = COMPLEX_OVERRIDES[b.id];
    if (parts) {
      books.push(...parts);
      continue;
    }
    const patch = REF_OVERRIDES[b.id];
    books.push(patch ? { ...(b as RichBook), ...patch } : (b as RichBook));
  }
  books.push(...extra);
  return { sub: sub.sub, subHe: sub.subHe, books };
}

export const CATALOG: RichGroup[] = RAW.map((g) => {
  const extra = EXTRA_BOOKS[g.id] ?? [];
  return {
    id: g.id,
    he: g.he,
    es: g.es,
    fa: CATEGORY_FA[g.id] ?? g.es, // fallback a español si no hay FA
    // Los EXTRA_BOOKS de la categoría se inyectan solo en la primera subcategoría.
    subs: g.subs.map((s, i) => expandSub(s, i === 0 ? extra : [])),
  };
});

export const CATEGORY_ORDER: CategoryId[] = CATALOG.map((g) => g.id);

export function getGroup(id: CategoryId): RichGroup | undefined {
  return CATALOG.find((g) => g.id === id);
}

/** Etiqueta de un libro, localizada. */
export function bookLabel(b: RichBook, locale: string): string {
  return localizedBookLabel(b.id, b.label, locale);
}

/** Etiqueta de subcategoría (ES viene en el dato; FA del mapa). */
export function subLabel(sub: string | null, locale: string): string {
  if (!sub) return "";
  if (locale === "fa") return SUB_FA[sub] ?? sub;
  return sub;
}
