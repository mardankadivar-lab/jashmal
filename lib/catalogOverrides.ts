// Overrides para obras de estructura COMPLEJA (isComplex en Sefaria), cuyo ref
// no es "Titulo N" sino una ruta anidada (ej. "Tanya, Likkutei Amarim 1").
// Reemplazamos el libro complejo por sus partes reales, cada una con su plantilla
// de ref ({n} = capítulo). Sobrevive a regeneraciones del catálogo.

import type { CatBook } from "./catalog.generated";

export interface RichBook extends CatBook {
  refTemplate?: string; // ej. "Tanya, Likkutei Amarim {n}"
}

// id del catálogo  →  partes que lo sustituyen. Refs y conteos verificados
// contra la API de Sefaria (2026-05-31).
export const COMPLEX_OVERRIDES: Record<string, RichBook[]> = {
  Tanya: [
    { id: "Tanya-LA", label: "Likutéi Amarim", he: "לִקּוּטֵי אֲמָרִים", type: "chapters", units: 54, refTemplate: "Tanya, Likkutei Amarim {n}" },
    { id: "Tanya-SY", label: "Sha'ar HaYijud VehaEmuná", he: "שַׁעַר הַיִּחוּד וְהָאֱמוּנָה", type: "chapters", units: 13, refTemplate: "Tanya, Shaar HaYichud VehaEmunah {n}" },
    { id: "Tanya-IT", label: "Igéret HaTeshuvá", he: "אִגֶּרֶת הַתְּשׁוּבָה", type: "chapters", units: 12, refTemplate: "Tanya, Iggeret HaTeshuvah {n}" },
    { id: "Tanya-IK", label: "Igéret HaKódesh", he: "אִגֶּרֶת הַקֹּדֶשׁ", type: "chapters", units: 33, refTemplate: "Tanya, Iggeret HaKodesh {n}" },
    { id: "Tanya-QA", label: "Kuntrés Ajarón", he: "קוּנְטְרֵס אַחֲרוֹן", type: "chapters", units: 9, refTemplate: "Tanya, Kuntres Acharon {n}" },
  ],
};

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
