// ─────────────────────────────────────────────────────────────────────────
//  C-1 · PERTENENCIA DE LA PALABRA
// ─────────────────────────────────────────────────────────────────────────
//
//  El agujero que tapa, con el caso exacto que lo abrió (16-nov-2026, estudio
//  fallido de «Guide for the Perplexed, Part 1 1»):
//
//    El estudio sumó  אמן = 91  y lo cruzó con  יהוה (26) + אדני (65) = 91.
//    LA ARITMÉTICA ERA CORRECTA. El problema es que la palabra del versículo
//    no es אָמֵן: es אֱמֻנִים, que suma 147 (defectivo אמנים, 141). El motor
//    cambió la palabra por otra parecida y sumó la parecida.
//
//  `lib/sources/gematriaClaims.ts` HABRÍA DEJADO PASAR esa frase, porque lo
//  que hace es re-sumar la cuenta — y la cuenta estaba bien. Lo que falla no
//  es la suma: es la PERTENENCIA DE LA PALABRA AL TEXTO. Son dos compuertas
//  distintas y hacen falta las dos.
//
//  ── DOS NIVELES DE EXIGENCIA, y la diferencia importa ──
//
//  No son dos intentos de lo mismo: son dos afirmaciones distintas.
//
//  1. ESTRICTO (una palabra bajo una cuenta aritmética). Afirmar «אמן = 91» es
//     una afirmación sobre UNA CADENA DE LETRAS. Tiene que estar escrita en el
//     pasaje TAL CUAL, sin tolerancia de prefijos ni de sufijos. Es la prueba
//     2 de P-5 del método del Sofer, literal: «Súmala tal como está escrita,
//     con su ortografía, no en la forma de diccionario ni en una forma
//     parecida. אֱמֻנִים no es אָמֵן.»
//
//  2. LAXO (una palabra que el estudio presenta como estando en el texto:
//     «la palabra X», «el término X»). Ahí hablar del lema es legítimo: el
//     capítulo trata de צֶלֶם y el pasaje escribe בְּצַלְמֵנוּ. Así que se admite
//     el encaje con prefijos y sufijos de una lista CERRADA, y solo se marca
//     la palabra que no aparece de NINGUNA forma tolerada. Marcar como falso
//     lo correcto sale más caro que dejar pasar una cita mala.
//
//  ── POR AHORA SOLO SE APLICA A FILOSOFÍA ──
//
//  El Sofer dice que esta compuerta sirve en las seis estanterías y la
//  gerencia está de acuerdo. Pero encenderla en todo el sitio podría empezar a
//  marcar estudios que HOY funcionan, y eso es una decisión de Mardan, no
//  nuestra. Así que este módulo es GENÉRICO —no sabe nada de filosofía— y
//  quien lo enciende es `lib/study/compuertasFilosofia.ts`.
//
//  PARA EXTENDERLA A TODO EL SITIO, UNA SOLA LÍNEA: en
//  `app/api/study/route.ts`, donde dice
//      if (esRefDeFilosofia(body.ref)) { … revisaFilosofia(…) … }
//  se llama `revisaPertenencia(full, corpus)` fuera de ese `if`, con el mismo
//  corpus. Nada más hay que tocar aquí.
// ─────────────────────────────────────────────────────────────────────────

import { stripNiqud } from "@/lib/sources/lexicon";
import { checkArithmetic } from "@/lib/sources/gematriaClaims";

/** Nivel de exigencia con que se juzgó la palabra. */
export type NivelPertenencia = "estricto" | "laxo";

export interface PertenenciaHallazgo {
  /** La palabra tal como la escribió el motor (con su nikud, si lo traía). */
  raw: string;
  /** Su esqueleto consonántico, que es lo que se comparó. */
  esqueleto: string;
  /** Posición en el estudio donde termina la palabra (para marcar después). */
  end: number;
  nivel: NivelPertenencia;
  /**
   * Qué la hizo juzgable: una cuenta aritmética, o una declaración de que la
   * palabra está en el texto.
   */
  motivo: "aritmetica" | "declarada";
}

export interface CorpusRecuperado {
  /** El hebreo del PASAJE que se le dio al motor. Es el que manda. */
  pasaje: string;
  /** El hebreo de las fuentes adjuntas (comentaristas), si hubo. */
  fuentes?: string;
  /**
   * Esqueletos que NUNCA se juzgan: títulos de sección, nombres de obras en
   * hebreo, acrónimos. No son palabras del pasaje y no pretenden serlo.
   */
  noJuzgar?: Iterable<string>;
}

export interface ResultadoPertenencia {
  hallazgos: PertenenciaHallazgo[];
  /** Cuántas palabras se miraron y resultaron estar donde se dice. */
  confirmadas: number;
  /** Cuántas se dejaron pasar por no poder juzgarlas con seguridad. */
  noConcluyentes: number;
}

// ── Esqueleto consonántico ───────────────────────────────────────────────
// Sin nikud, sin cantilación, sin maqaf, sin guiones de deletreo, y con las
// cinco finales devueltas a su forma normal: ם→מ, ן→נ, ץ→צ, ף→פ, ך→כ. Un
// esqueleto es la cadena de consonantes y nada más.
const FINAL_A_NORMAL: Record<string, string> = { ך: "כ", ם: "מ", ן: "נ", ף: "פ", ץ: "צ" };

export function esqueleto(s: string): string {
  let out = "";
  for (const ch of stripNiqud(s)) {
    const normal = FINAL_A_NORMAL[ch] ?? ch;
    if (normal >= "א" && normal <= "ת") out += normal;
  }
  return out;
}

/** Palabra hebrea suelta, con su nikud y su cantilación. */
const PALABRA_HE = /[א-ת][֑-ׇא-תװ-״]*/g;

/** Todos los esqueletos de palabra de un texto hebreo. */
export function esqueletosDe(texto: string): Set<string> {
  const out = new Set<string>();
  if (!texto) return out;
  for (const m of texto.matchAll(PALABRA_HE)) {
    const e = esqueleto(m[0]);
    if (e.length >= 2) out.add(e);
  }
  return out;
}

// ── Afijos admitidos SOLO en el nivel laxo ───────────────────────────────
// Lista cerrada a propósito. Con esto צלם encaja en בצלמנו, que es hablar del
// lema del capítulo; y no se abre la puerta a «parecido es igual».
const PREFIJOS = ["", "ו", "ה", "ב", "כ", "ל", "מ", "ש",
  "וה", "וב", "ול", "ומ", "וכ", "כש", "לה", "מה", "שה", "בה"];
const SUFIJOS = ["", "ים", "ות", "ין", "י", "ך", "כם", "כן", "ו", "ה", "נו",
  "מ", "נ", "תי", "יו", "יה", "הם", "הן", "יך", "תם", "תו", "ת", "יהם"];

/** ¿`largo` es `corto` con un prefijo y un sufijo de las listas cerradas? */
function encajaConAfijos(largo: string, corto: string): boolean {
  if (largo === corto) return true;
  if (largo.length <= corto.length) return false;
  for (const pre of PREFIJOS) {
    if (!largo.startsWith(pre)) continue;
    const resto = largo.slice(pre.length);
    if (!resto.startsWith(corto)) continue;
    const cola = resto.slice(corto.length);
    if (SUFIJOS.includes(cola)) return true;
  }
  return false;
}

/** Encaje laxo en los dos sentidos: el texto flexiona, o el estudio flexiona. */
function pertenece(corpus: Set<string>, e: string, nivel: NivelPertenencia): boolean {
  if (corpus.has(e)) return true;
  if (nivel === "estricto") return false;
  for (const p of corpus) {
    if (encajaConAfijos(p, e) || encajaConAfijos(e, p)) return true;
  }
  return false;
}

// ── Detector 1: palabras bajo una cuenta aritmética (nivel ESTRICTO) ─────
//
// Se apoya en el detector de aritmética que ya existe y es el que llevó
// cuatro iteraciones de afinado: si `checkArithmetic` reconoció un tramo como
// una cuenta, las palabras hebreas de ese tramo están BAJO UNA CUENTA, y eso
// es una afirmación sobre su ortografía exacta.
function palabrasEnAritmetica(estudio: string): { raw: string; end: number }[] {
  const out: { raw: string; end: number }[] = [];
  let arit: ReturnType<typeof checkArithmetic>;
  try {
    arit = checkArithmetic(estudio);
  } catch {
    return out;
  }
  for (const f of arit.findings) {
    const inicio = f.end - f.raw.length;
    if (inicio < 0) continue;
    // Un deletreo («א-מ-ן») es UNA palabra escrita con guiones: se reúne antes
    // de medirla, o cada letra pasaría por palabra de dos consonantes.
    const tramo = f.raw.replace(/(?<=[א-ת])[-־](?=[א-ת])/g, "");
    for (const m of tramo.matchAll(PALABRA_HE)) {
      if (esqueleto(m[0]).length < 2) continue;
      out.push({ raw: m[0], end: f.end });
    }
  }
  return out;
}

// ── Detector 2: palabras DECLARADAS como del texto (nivel LAXO) ──────────
//
// Solo las formas que afirman, sin rodeos, que una cadena está en el texto:
// «la palabra X», «el término X», «el vocablo X», «la voz X», y sus hermanas
// en farsi y en inglés. Se exige que la palabra hebrea venga PEGADA al rótulo
// (hasta 24 caracteres de distancia, que es lo que caben unas comillas, un
// paréntesis y una cursiva), para no barrer con todo el hebreo del estudio:
// los nombres de obras («אור ה׳»), los títulos de sección y las citas de los
// comentaristas no son declaraciones de pertenencia y no se juzgan aquí.
const ROTULOS = [
  // español
  "la palabra", "las palabras", "el término", "los términos", "el vocablo",
  "la voz", "la expresión", "el sustantivo", "el verbo",
  // farsi
  "واژه", "واژهٔ", "کلمه", "کلمهٔ", "اصطلاح", "اصطلاحِ", "لفظ",
  // inglés
  "the word", "the words", "the term", "the terms", "the expression",
];
const VENTANA = 24;

function palabrasDeclaradas(estudio: string): { raw: string; end: number }[] {
  const out: { raw: string; end: number }[] = [];
  const bajo = estudio.toLowerCase();
  for (const rotulo of ROTULOS) {
    let i = bajo.indexOf(rotulo);
    while (i !== -1) {
      const desde = i + rotulo.length;
      const ventana = estudio.slice(desde, desde + VENTANA);
      const m = PALABRA_HE.exec(ventana);
      PALABRA_HE.lastIndex = 0;
      if (m && esqueleto(m[0]).length >= 2) {
        out.push({ raw: m[0], end: desde + m.index + m[0].length });
      }
      i = bajo.indexOf(rotulo, i + rotulo.length);
    }
  }
  return out;
}

/**
 * Revisa que las palabras hebreas que el estudio presenta como del texto estén
 * de verdad en el texto. Nunca lanza: si algo no se puede juzgar, se calla.
 */
export function revisaPertenencia(
  estudio: string,
  corpus: CorpusRecuperado
): ResultadoPertenencia {
  const hallazgos: PertenenciaHallazgo[] = [];
  let confirmadas = 0;
  let noConcluyentes = 0;

  const delPasaje = esqueletosDe(corpus.pasaje ?? "");
  const conFuentes = new Set(delPasaje);
  for (const e of esqueletosDe(corpus.fuentes ?? "")) conFuentes.add(e);
  const exentos = new Set<string>();
  for (const e of corpus.noJuzgar ?? []) {
    const limpio = esqueleto(e);
    if (limpio) exentos.add(limpio);
  }

  // Sin pasaje recuperado no hay nada contra qué comparar: no se juzga nada.
  // Un corpus vacío que marcara todo sería la peor versión de esta compuerta.
  if (delPasaje.size === 0) {
    return { hallazgos, confirmadas: 0, noConcluyentes: 0 };
  }

  const vistos = new Set<string>();
  const juzga = (
    lista: { raw: string; end: number }[],
    nivel: NivelPertenencia,
    motivo: PertenenciaHallazgo["motivo"],
    contra: Set<string>
  ) => {
    for (const p of lista) {
      const e = esqueleto(p.raw);
      if (!e || e.length < 2) continue;
      if (exentos.has(e)) {
        noConcluyentes++;
        continue;
      }
      const clave = `${nivel}:${e}:${p.end}`;
      if (vistos.has(clave)) continue;
      vistos.add(clave);
      if (pertenece(contra, e, nivel)) {
        confirmadas++;
        continue;
      }
      hallazgos.push({ raw: p.raw, esqueleto: e, end: p.end, nivel, motivo });
    }
  };

  // La aritmética se mide contra el PASAJE solo: sumar una palabra que está en
  // un comentarista y presentarla como del pasaje es el mismo fallo con otro
  // disfraz.
  juzga(palabrasEnAritmetica(estudio), "estricto", "aritmetica", delPasaje);
  // La declaración se mide contra el pasaje Y las fuentes: citar la palabra de
  // un comentarista es legítimo y frecuente.
  juzga(palabrasDeclaradas(estudio), "laxo", "declarada", conFuentes);

  return { hallazgos, confirmadas, noConcluyentes };
}

/** Exportado solo para los guardianes. */
export const __internals = { encajaConAfijos, palabrasEnAritmetica, palabrasDeclaradas };
