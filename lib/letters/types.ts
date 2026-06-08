// ─────────────────────────────────────────────────────────────────────────
//  MOTOR DE LETRAS — Esquema de datos (data-driven, reutilizable)
//  Cada letra hebrea es un archivo de data (lib/letters/<slug>.ts) que el
//  motor (components/letra/LetterExperience.tsx) lee y renderiza. Agregar una
//  letra = agregar un archivo de data. NADA se hardcodea en el motor.
//
//  Estructura 3×3: tres DIMENSIONES de la letra (Nombre · Forma · Número),
//  cada una contemplada en tres MUNDOS interiores (Mundos · Almas · Divinidad).
// ─────────────────────────────────────────────────────────────────────────

/** Texto trilingüe-ready. Español primero (obligatorio); fa/en opcionales
 *  hasta que el Sofer (editor-erudito) los verifique. */
export type LocalizedText = { es: string; fa?: string; en?: string };

/** Idiomas de interfaz del proyecto. */
export type LetterLocale = "es" | "fa" | "en";

/** Devuelve el texto en el idioma pedido, con respaldo a español. */
export function pickText(t: LocalizedText | undefined, locale: string): string {
  if (!t) return "";
  const l = locale as LetterLocale;
  return t[l] ?? t.es ?? "";
}

/** La tríada interior: cada dimensión se contempla en estos tres planos. */
export interface Triad {
  mundos: LocalizedText; // עוֹלָמוֹת — en los mundos / la creación
  almas: LocalizedText; // נְשָׁמוֹת — en el alma / la consciencia
  divinidad: LocalizedText; // אֱלֹהוּת — en lo divino / Ein Sof
}

/** Una de las partes constitutivas del trazo (p.ej. Yud superior · Vav · Yud
 *  inferior del Álef). `svgPathId` enlaza con el path SEPARADO del glifo SVG,
 *  para iluminarla de forma independiente en la sección FORMA. */
export interface LetterPart {
  label: LocalizedText;
  significado: LocalizedText;
  svgPathId: string; // "yud-top" | "vav" | "yud-bottom" | ...
}

/** Un sendero luminoso de la letra hacia un estudio del Universo. */
export interface LetterConnection {
  titulo: LocalizedText; // texto del nodo
  fuente: LocalizedText; // referencia exacta (libro cap:versículo, folio…)
  href: string; // /estudio?ref=… · /mente-cosmica · /misterio/…
}

/** Conexiones por disciplina (las cinco galaxias del Universo). */
export interface LetterConexiones {
  tanaj: LetterConnection[];
  talmud: LetterConnection[];
  midrash: LetterConnection[];
  cabala: LetterConnection[];
  jasidut: LetterConnection[];
}

/** La data completa de UNA letra. El motor renderiza la experiencia a partir
 *  de este objeto, igual para las 22. */
export interface LetterData {
  slug: string; // "alef" … "tav"
  letter: string; // "א"
  nameTranslit: LocalizedText; // "Álef"
  nameHe: string; // "אָלֶף" (se muestra en hebreo siempre)
  value: number; // valor de gematría

  /** Nivel 1 — texto de contemplación inicial (la letra en silencio). */
  level1: LocalizedText;

  /** Sección A — NOMBRE. */
  name: {
    raicesYsignificado: LocalizedText;
  } & Triad;

  /** Sección B — FORMA (con las partes separadas que se iluminan). */
  form: {
    descripcion: LocalizedText;
    partes: LetterPart[];
  } & Triad;

  /** Sección C — NÚMERO. */
  number: {
    valor: number;
    guematriaForma: LocalizedText; // p.ej. "10 + 6 + 10 = 26 = הוי״ה"
  } & Triad;

  /** Conexiones (senderos al Universo). */
  conexiones: LetterConexiones;

  /** Fuentes citadas (verificadas por el editor-erudito). */
  fuentes: LocalizedText[];
}
