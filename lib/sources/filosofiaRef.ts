// ¿El lector ABRIÓ una obra de filosofía judía, o solo apareció una citada?
//
// Es la misma pregunta que resuelve midrashRef.ts para el midrash, y por el
// mismo motivo: el método de estudio NO lo decide el contenido del pasaje, lo
// decide la PUERTA por la que entró el lector.
//
// El fallo que obliga a escribir este archivo: «Guide for the Perplexed,
// Part 1 1» es el epígrafe del Moré, donde el Rambam abre citando a Yeshayahu
// 26:2. El motor vio un versículo y estudió el versículo — con פרד״ס, Arizal y
// Baal HaSulam encima del hombre que niega las sefirot. El versículo está ahí
// porque el autor lo usa; el objeto del estudio es su ARGUMENTO.
//
// Por eso la pertenencia se decide por el REF DE LA OBRA ABIERTA y gana sobre
// cualquier detección por contenido: si esto dice «sí», el motor no mira ni el
// hebreo del pasaje ni las fuentes que Sefaria enlazó.

import { CATALOG } from "@/lib/sources/catalog.generated";

/** La categoría de Sefaria. Se llama así, no «Philosophy». */
export const CAT_FILOSOFIA = "Jewish Thought";

/**
 * Las obras de la estantería «Filosofía judía», por su id de Sefaria.
 *
 * NO va escrita a mano: se LEE del catálogo, que es la misma fuente de la que
 * el menú saca los chips. Así no hay dos listas que se puedan desincronizar —
 * si el Sofer añade una obra a la estantería, el motor la reconoce el mismo
 * día, sin tocar este archivo.
 *
 * Se usa el catálogo CRUDO (catalog.generated) y no la capa de categories.ts a
 * propósito: los ids aplanados del Kuzari («Kuzari-1») son internos nuestros y
 * NUNCA llegan a ser un ref — el ref lo arma `bookRef` con el refTemplate y
 * sale «Kuzari 1:5». Lo que hace falta aquí es el id del LIBRO.
 */
export const OBRAS_FILOSOFIA: readonly string[] = (() => {
  const grupo = CATALOG.find((g) => g.id === CAT_FILOSOFIA);
  if (!grupo) return [];
  const ids: string[] = [];
  for (const sub of grupo.subs) for (const b of sub.books) ids.push(b.id);
  // De más largo a más corto: así gana el título más específico si dos
  // empiezan igual.
  return ids.sort((a, b) => b.length - a.length);
})();

/**
 * Los mismos títulos EN HEBREO, por si la referencia llega en hebreo.
 *
 * No se derivan del campo `he` del catálogo: ese campo es el rótulo con nikud
 * que ve el lector («סֵפֶר הַכּוּזָרִי») y Sefaria devuelve otra cosa
 * («הכוזרי»). Esta tabla son los prefijos que Sefaria devuelve DE VERDAD en
 * `heRef`, medidos obra por obra el 16-nov-2026 — y el guardián
 * (`npm run filosofia:check`) los vuelve a medir contra Sefaria, así que si
 * cambian, protesta en vez de callarse.
 */
export const OBRAS_FILOSOFIA_HE: Readonly<Record<string, string>> = {
  "Guide for the Perplexed": "מורה נבוכים",
  "Kuzari": "הכוזרי",
  "Duties of the Heart": "חובות הלבבות",
  "HaEmunot veHaDeot": "האמונות והדעות",
  "Eight Chapters": "שמונה פרקים",
  "Sefer HaIkkarim": "ספר העקרים",
  "Derashot HaRan": 'דרשות הר"ן',
  "Derekh Hashem": "דרך ה'",
  "Netivot Olam": "נתיבות עולם",
  "Nefesh HaChayim": "נפש החיים",
  "Nineteen Letters": "אגרות צפון",
};

/** Quita el nikud y los signos de cantilación de un texto hebreo. */
function sinNikud(s: string): string {
  return s.replace(/[֑-ׇ]/g, "");
}

/**
 * ¿Detrás del título viene un límite de palabra?
 *
 * Igual que en la puerta del midrash: se exige nada, un espacio, una coma o
 * dos puntos. Si sigue una letra, es otro libro que empieza igual y esto no
 * era su título.
 */
function limite(resto: string): boolean {
  return resto === "" || /^[\s,:.]/.test(resto);
}

/**
 * La obra de filosofía que el lector tiene abierta, o `null`.
 *
 * Devuelve el id de Sefaria del LIBRO («Guide for the Perplexed»), que es lo
 * que necesita la tabla de comentaristas: Rashi no comenta el Moré, y los que
 * sí lo comentan dependen de la obra, no de la categoría a secas.
 */
export function obraDeFilosofia(ref: string | undefined | null): string | null {
  if (!ref) return null;
  const limpio = ref.trim();
  if (!limpio) return null;

  const bajo = limpio.toLowerCase();
  for (const obra of OBRAS_FILOSOFIA) {
    if (!bajo.startsWith(obra.toLowerCase())) continue;
    if (limite(limpio.slice(obra.length))) return obra;
  }

  // Referencia en hebreo (el panel de fuentes y algún enlace guardado la dan
  // así). Se compara sin nikud por los dos lados.
  const hebreo = sinNikud(limpio);
  for (const [obra, he] of Object.entries(OBRAS_FILOSOFIA_HE)) {
    const titulo = sinNikud(he);
    if (!hebreo.startsWith(titulo)) continue;
    if (limite(hebreo.slice(titulo.length))) return obra;
  }
  return null;
}

/**
 * ¿Esta referencia ES una obra de filosofía judía abierta por su puerta?
 *
 * Ante la duda devuelve `false`, igual que la puerta del midrash: equivocarse
 * hacia el método normal deja un estudio correcto aunque no sea el mejor;
 * equivocarse hacia el de filosofía deja un estudio de Bereshit sin PaRDeS.
 */
export function esRefDeFilosofia(ref: string | undefined | null): boolean {
  return obraDeFilosofia(ref) !== null;
}

/**
 * ¿Se le pone al lector el panel «Tejido cabalístico» debajo del estudio?
 *
 * En filosofía judía, NO. Y no es una cuestión de gusto: el panel escanea el
 * texto buscando entidades cabalísticas y las presenta como la trama del
 * estudio. En la prueba del Moré I:1 encontró «LETRAS HEBREAS · Shin» y
 * «MUNDOS · Asiyá» —dos palabras que aparecieron de pasada— y se las colgó al
 * Rambam. El lector acababa de leer, en la חֲתִימָה, que este pasaje NO
 * autoriza a atribuirle a Dios estructura ninguna; y justo debajo le poníamos
 * una estructura cabalística. El panel contradecía el sello del estudio que
 * acompañaba, y la frase de la propia categoría.
 *
 * EN LAS OTRAS CINCO ESTANTERÍAS EL PANEL SE QUEDA. En Cabalá y en Jasidut
 * está en su sitio: ahí las entidades que encuentra son de verdad el asunto.
 * Esta puerta se decide por el REF DE LA OBRA ABIERTA, exactamente igual que
 * el método de estudio — y por el mismo motivo, que es la causa raíz del fallo
 * del 16-nov-2026: lo que manda es la puerta por la que entró el lector, no
 * las palabras que aparezcan dentro del texto.
 *
 * Vive aquí, y no dentro del componente, para que `npm run filosofia:check`
 * pueda comprobar LA DECISIÓN y no la forma de escribirla.
 */
export function muestraTejidoCabalistico(ref: string | undefined | null): boolean {
  return !esRefDeFilosofia(ref);
}
