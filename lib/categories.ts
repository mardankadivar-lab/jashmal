// Capa de catálogo: usa el catálogo COMPLETO autogenerado desde Sefaria
// (lib/catalog.generated.ts), aplica overrides para obras complejas (Tania, etc.)
// y añade nombres localizados ES/FA.

import { CATALOG as RAW, type CatSub } from "./catalog.generated";
import {
  COMPLEX_OVERRIDES,
  REF_OVERRIDES,
  HIDDEN_BOOKS,
  bookRef,
  type RichBook,
} from "./catalogOverrides";
import { localizedBookLabel, SUB_FA } from "./bookNames";

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
  subs: RichSub[];
}

// Expande cada subcategoría: los libros complejos se sustituyen por sus partes.
function expandSub(sub: CatSub): RichSub {
  const books: RichBook[] = [];
  for (const b of sub.books) {
    const parts = COMPLEX_OVERRIDES[b.id];
    if (parts) books.push(...parts);
    else books.push(b as RichBook);
  }
  return { sub: sub.sub, subHe: sub.subHe, books };
}

export const CATALOG: RichGroup[] = RAW.map((g) => {
  const subs = g.subs.map(expandSub);
  // Inyectar libros extra (ej. Etz Chaim del Arí) en la primera subcategoría.
  const extra = EXTRA_BOOKS[g.id];
  if (extra && subs.length > 0) {
    const present = new Set(subs.flatMap((s) => s.books.map((b) => b.id)));
    const toAdd = extra.filter((b) => !present.has(b.id));
    subs[0] = { ...subs[0], books: [...toAdd, ...subs[0].books] };
  }
  return { id: g.id, he: g.he, es: g.es, subs };
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
