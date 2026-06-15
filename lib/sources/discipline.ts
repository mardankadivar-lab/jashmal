// ─────────────────────────────────────────────────────────────────────────
// discipline.ts — deriva la DISCIPLINA (galaxia del cerebro) de una ref de
// Sefaria. Antes el harvest del cerebro metía TODO estudio de texto en la
// galaxia "tanakh" por defecto, y un texto cabalístico como "Sefer Etz Chaim
// 25:1:1" caía en Tanaj. Aquí derivamos la categoría REAL del texto desde el
// catálogo autogenerado de Sefaria (grupo top: Tanakh/Mishnah/Talmud/Midrash/
// Kabbalah/Chasidut) y la mapeamos a la `cat` del grafo (BRAIN_CATS).
//
// Síncrono y sin red: usa lib/sources/catalog.generated.ts (ya en el bundle).
// ─────────────────────────────────────────────────────────────────────────

import { CATALOG } from "@/lib/sources/catalog.generated";

// Grupo top de Sefaria → clave de BRAIN_CATS (galaxia del cerebro).
const GROUP_TO_CAT: Record<string, string> = {
  Tanakh: "tanakh",
  Mishnah: "mishnah",
  Talmud: "talmud",
  Midrash: "midrash",
  Kabbalah: "kabbalah",
  Chasidut: "chasidut",
  Halakhah: "halakhah",
  Liturgy: "tanakh", // sidur/piyut: sin galaxia propia → al núcleo bíblico
  Philosophy: "philosophy",
};

// Índice bookId (lowercase) → cat del cerebro, construido una sola vez.
// El bookId del catálogo (ej. "Sefer Etz Chaim", "Genesis", "Likutei Moharan")
// es exactamente el prefijo que Sefaria usa al inicio de cualquier ref de ese
// libro, así que sirve para reconocer el libro dentro de una ref.
const BOOK_TO_CAT: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (const group of CATALOG) {
    const cat = GROUP_TO_CAT[group.id];
    if (!cat) continue;
    for (const sub of group.subs) {
      for (const book of sub.books) {
        m.set(book.id.toLowerCase(), cat);
      }
    }
  }
  return m;
})();

// Lista de bookIds ordenada por longitud DESC: probamos el prefijo más largo
// primero para no confundir "Sefer Etz Chaim" con un hipotético "Sefer".
const BOOK_IDS_BY_LEN: string[] = Array.from(BOOK_TO_CAT.keys()).sort(
  (a, b) => b.length - a.length,
);

// El siguiente carácter tras el nombre del libro en una ref de Sefaria es un
// separador real (espacio antes del número/sección, coma, o fin), nunca una
// letra — así "Numbers" no matchea dentro de "Numbers Rabbah".
function isBoundary(ch: string | undefined): boolean {
  return ch === undefined || ch === " " || ch === "," || ch === ":" || ch === ".";
}

/**
 * Deriva la `cat` del cerebro (galaxia) a partir de una ref de Sefaria.
 * Devuelve null si la ref no corresponde a ningún libro del catálogo, para que
 * quien llama decida el fallback (NUNCA forzamos "tanakh" silenciosamente).
 *
 * Ejemplos:
 *   "Sefer Etz Chaim 25:1:1"      → "kabbalah"
 *   "Genesis 1:1"                 → "tanakh"
 *   "Likutei Moharan 2:1"         → "chasidut"
 *   "Berakhot 26b:5"              → "talmud"
 *   "Tikkunei Zohar 1:2"          → "kabbalah"
 */
export function disciplineFromRef(ref: string): string | null {
  const r = (ref || "").trim();
  if (!r) return null;
  const lower = r.toLowerCase();
  for (const bookId of BOOK_IDS_BY_LEN) {
    if (lower.startsWith(bookId) && isBoundary(lower[bookId.length])) {
      return BOOK_TO_CAT.get(bookId) ?? null;
    }
  }
  return null;
}
