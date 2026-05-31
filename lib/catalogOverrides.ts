// Overrides para obras de estructura COMPLEJA (isComplex en Sefaria), cuyo ref
// no es "Titulo N" sino una ruta anidada. Refs verificados contra la API (2026-05-31).

import type { CatBook } from "./catalog.generated";

export interface RichBook extends CatBook {
  refTemplate?: string; // ej. "Tanya, Part I; Likkutei Amarim {n}"
}

// Reemplaza un libro complejo por sus partes reales.
export const COMPLEX_OVERRIDES: Record<string, RichBook[]> = {
  Tanya: [
    { id: "Tanya-LA", label: "Likutéi Amarim", he: "לִקּוּטֵי אֲמָרִים", type: "chapters", units: 53, refTemplate: "Tanya, Part I; Likkutei Amarim {n}" },
    { id: "Tanya-SY", label: "Sha'ar HaYijud VehaEmuná", he: "שַׁעַר הַיִּחוּד וְהָאֱמוּנָה", type: "chapters", units: 12, refTemplate: "Tanya, Part II; Shaar HaYichud VehaEmunah {n}" },
    { id: "Tanya-IT", label: "Igéret HaTeshuvá", he: "אִגֶּרֶת הַתְּשׁוּבָה", type: "chapters", units: 12, refTemplate: "Tanya, Part III; Iggeret HaTeshuvah {n}" },
    { id: "Tanya-IK", label: "Igéret HaKódesh", he: "אִגֶּרֶת הַקֹּדֶשׁ", type: "chapters", units: 32, refTemplate: "Tanya, Part IV; Iggeret HaKodesh {n}" },
    { id: "Tanya-QA", label: "Kuntrés Ajarón", he: "קוּנְטְרֵס אַחֲרוֹן", type: "chapters", units: 9, refTemplate: "Tanya, Part V; Kuntres Acharon {n}" },
  ],
};

// Libros EXTRA a añadir a una subcategoría (no usado por ahora).
export const EXTRA_BOOKS: Record<string, RichBook[]> = {};

// Parche de etiqueta/ref para libros que YA están en el catálogo generado.
// Etz Chaim (Árbol de la Vida) del Arí: la exposición sistemática de la Cabalá
// luriana, primera en el orden de estudio. Ref por portales (Gate).
export const REF_OVERRIDES: Record<string, Partial<RichBook>> = {
  "Sefer Etz Chaim": {
    label: "Etz Jaim (Árbol de la Vida)",
    he: "עֵץ חַיִּים",
    units: 50,
    refTemplate: "Sefer Etz Chaim, Gate {n}",
  },
};

// Libros a OCULTAR del menú (ref roto sin plantilla numérica viable; accesibles
// por el buscador). Pri Etz Chaim es complejo con secciones de nombre.
export const HIDDEN_BOOKS = new Set<string>(["Pri Etz Chaim"]);

/** Construye el ref final de un libro, respetando refTemplate si existe. */
export function bookRef(book: RichBook, unit: number, amud?: "a" | "b"): string {
  if (book.refTemplate) {
    return book.refTemplate.replace("{n}", String(unit));
  }
  if (book.type === "talmud") {
    return `${book.id} ${unit}${amud ?? "a"}`;
  }
  return `${book.id} ${unit}`;
}
