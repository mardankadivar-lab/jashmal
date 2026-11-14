// ¿Esta referencia es un texto bíblico, y de qué capítulo?
//
// El recuento de palabras repetidas (lib/study/palabrasRepetidas.ts) solo tiene
// sentido en el Tanaj: Torá, Profetas y Escritos. En el Talmud la unidad no es
// el capítulo sino el folio, y en el midrash el estudio ya es otro —el método
// ampliado— así que ahí no se cuenta nada.
//
// Y hay una segunda cosa que decidir aquí: SOBRE QUÉ se cuenta. Si el lector
// abre un solo versículo, contar las palabras de ese versículo no dice nada:
// lo que enseña el énfasis es el CAPÍTULO entero (o la parashá, si abrió un
// rango). Por eso `tramoDeConteo` devuelve el capítulo aunque el estudio sea
// de un versículo suelto.

/** Los 39 libros del Tanaj, con el nombre que usa Sefaria. */
export const LIBROS_TANAJ = [
  // Torá
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  // Profetas
  "Joshua", "Judges", "I Samuel", "II Samuel", "I Kings", "II Kings",
  "Isaiah", "Jeremiah", "Ezekiel", "Hosea", "Joel", "Amos", "Obadiah",
  "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai",
  "Zechariah", "Malachi",
  // Escritos
  "Psalms", "Proverbs", "Job", "Song of Songs", "Ruth", "Lamentations",
  "Ecclesiastes", "Esther", "Daniel", "Ezra", "Nehemiah",
  "I Chronicles", "II Chronicles",
] as const;

/**
 * ¿La referencia es de un libro del Tanaj?
 *
 * Se exige el título al principio y un límite de palabra detrás, igual que en
 * la puerta del midrash: así «Genesis 1:3» entra y «Genesis Rabbah 1:3» —que
 * es midrash y tiene su propio método— se queda fuera.
 */
export function esRefDeTanaj(ref: string | undefined | null): boolean {
  return libroDeTanaj(ref) !== null;
}

/** El libro del Tanaj al que pertenece la referencia, o null. */
export function libroDeTanaj(ref: string | undefined | null): string | null {
  if (!ref) return null;
  const limpio = ref.trim();
  if (!limpio) return null;
  // De más largo a más corto, para que «I Samuel» gane antes que «I».
  const porLargo = [...LIBROS_TANAJ].sort((a, b) => b.length - a.length);
  for (const libro of porLargo) {
    if (!limpio.toLowerCase().startsWith(libro.toLowerCase())) continue;
    const siguiente = limpio.slice(libro.length);
    // Detrás del título va un espacio y un número, o nada. Si va una letra, es
    // otro libro que empieza igual: «Genesis Rabbah» no es «Genesis».
    if (siguiente === "" || /^[\s,:.]*\d/.test(siguiente)) return libro;
  }
  return null;
}

/**
 * El tramo sobre el que se cuentan las palabras repetidas.
 *
 * · Un versículo suelto («Genesis 1:3») se cuenta sobre su CAPÍTULO
 *   («Genesis 1»): un versículo no repite nada y el énfasis es del capítulo.
 * · Un rango («Genesis 1:1-6:8», una parashá) se cuenta tal cual: el lector
 *   eligió ese tramo y ese tramo es la unidad.
 * · Un capítulo entero («Genesis 1») se queda igual.
 *
 * Devuelve null si la referencia no es del Tanaj.
 */
export function tramoDeConteo(ref: string | undefined | null): string | null {
  const libro = libroDeTanaj(ref);
  if (!libro || !ref) return null;
  const limpio = ref.trim();

  // Un rango se respeta entero: es lo que el lector abrió.
  if (limpio.includes("-")) return limpio;

  // «Libro cap:versículo» → «Libro cap». Se corta por los últimos dos puntos,
  // no por el primero, porque hay libros con dos niveles de numeración.
  const corte = limpio.lastIndexOf(":");
  if (corte === -1) return limpio;
  const cabeza = limpio.slice(0, corte).trim();
  // Si al cortar nos quedamos sin número de capítulo, no hay tramo que contar.
  return /\d\s*$/.test(cabeza) ? cabeza : limpio;
}
