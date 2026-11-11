// Verificación ARITMÉTICA sobre prosa.
//
// Por qué no sirve aquí lo que ya hicimos en otros dos endpoints: la lista
// cerrada (gematriaBank) y el "el motor propone, el código juzga"
// (gematria-connections) funcionan porque la salida es una LISTA. Aquí la
// salida es prosa corrida, y los métodos del Zóhar invitan a afirmar cifras
// dentro de la frase ("¿la guematría de las partes confirma la división?").
// Así que el juicio tiene que hacerse sobre el texto: se detectan las
// afirmaciones con forma de aritmética y se re-suman letra por letra.
//
// La suma la hace SIEMPRE el código, con gematria() de lexicon.ts. Nunca se
// cree la cuenta del modelo.
//
// Ante la duda, dejar pasar: si una frase no se puede analizar con seguridad
// (nombres de letras, palabras sin valor, notarikon, combinaciones de letras
// sin cifras), se devuelve intacta y se cuenta como no concluyente. El objetivo
// es que no circule aritmética falsa, no censurar lo que el parser no entiende.

import { gematria, gematriaBreakdown, stripNiqud } from "@/lib/sources/lexicon";

export interface ArithmeticFinding {
  /** el tramo tal como el motor lo escribió. */
  raw: string;
  /** posición donde termina el tramo (para marcar justo después). */
  end: number;
  verdict: "ok" | "false";
  /** la suma correcta, escrita por nosotros: "אלהים = 1+30+5+10+40 = 86". */
  truth: string;
}

// ── Piezas del patrón ───────────────────────────────────────────────────────
const HEB_WORD = "[\\u05D0-\\u05EA][\\u0591-\\u05C7\\u05D0-\\u05EA\\u05F0-\\u05F4]*";
const HEB_PHRASE = `${HEB_WORD}(?:[ \\u00A0]${HEB_WORD}){0,3}`;
const NUM = "\\d{1,6}";
/** "(Quién = 50)", "(Hei=5)": un glosario corto que declara el valor. */
// Lo de dentro tiene que ser un RÓTULO ("Quién", "Hei"), no una cuenta: en
// "יְהוָה (7 × 26 = 182)" el paréntesis es una operación aparte, y leerlo como
// glosa hacía creer que יהוה vale 182. Por eso se excluyen cifras y signos.
const GLOSS = `\\([^()=\\d+\\u00D7\\u2212*/-]{0,40}=\\s*${NUM}\\s*\\)`;
/** "(50)", "(=10)": el valor pelado entre paréntesis. */
const PAREN_NUM = `\\(\\s*=?\\s*${NUM}\\s*\\)`;
/** Énfasis de markdown pegado a un término: el motor escribe "= **62**". */
const EMPH = "[*_]{0,2}";
const TERM = `${EMPH}(?:${HEB_PHRASE}|${NUM})${EMPH}(?:\\s*(?:${GLOSS}|${PAREN_NUM}))?`;

/** Cadenas tipo "מי (50) + אלה (36) = 86 = אלהים" o "אלהים = 86". */
// El separador admite espacios pero NO saltos de línea: si no, una cadena se
// extiende por varias frases y se juzgan tramos que nadie escribió juntos.
const SEP = "[ \\u00A0]*";
// Operadores. Hay que entender la RESTA y la MULTIPLICACIÓN, no solo "+" y "=":
// el motor escribe "840 = 40 × 21" y "248 − 243 = 5", y un parser que solo sabe
// de "+" corta la expresión en seco y juzga el pedazo ("840 = 40"), marcando
// como falsa una cuenta correcta. El guion ASCII solo cuenta como resta cuando
// va suelto entre espacios, para no partir palabras ni fechas.
// El guion tiene DOS sentidos según cómo esté escrito, y hay que distinguirlos:
// suelto entre espacios es una resta ("248 − 243"); pegado entre dos letras
// hebreas es el deletreo de una palabra ("א-ב-ר-ה-מ"), donde las letras se
// SUMAN. Confundirlos hace que el verificador juzgue "מ = 248".
const OP =
  `(?:[+=\\u00D7\\u2212]` +
  `|(?<=[ \\u00A0])-(?=[ \\u00A0])` +
  `|(?<=[\\u05D0-\\u05EA])-(?=[\\u05D0-\\u05EA]))`;
const CHAIN_RE = new RegExp(`${TERM}(?:${SEP}${OP}${SEP}${TERM})+`, "g");
/** "מִי (Quién = 50)": declara un valor sin formar cadena. */
const VALUE_RE = new RegExp(`${HEB_PHRASE}\\s*${GLOSS}`, "g");

const HEB_ONLY = /[א-ת]/;

// Nombres de las letras escritos en hebreo, con el valor de SU letra.
//
// Un nombre de letra tiene DOS lecturas legítimas y las dos se usan a diario en
// esta literatura: la letra misma (יוד = 10) y el milui, la suma de las letras
// del nombre (יוד = 10+6+4 = 20). Las dos valen, así que al juzgar una cadena
// se prueban ambas y basta con que UNA cuadre. Antes solo se perdonaba cuando
// la cifra iba entre paréntesis, y como el motor escribe "יוד = 10" sin ellos,
// el verificador tachaba como falso lo que estaba bien: una frase correcta como
// "יוד (10) + עַיִן (70) + קוף (100) + בֵּית (2) = 182" salía marcada entera.
const LETTER_NAME_VALUE: Record<string, number> = {
  אלף: 1, בית: 2, גימל: 3, גמל: 3, דלת: 4, הא: 5, הה: 5, הי: 5,
  וו: 6, ואו: 6, זין: 7, חית: 8, חת: 8, טית: 9, יוד: 10,
  כף: 20, כאף: 20, למד: 30, מם: 40, נון: 50, סמך: 60, עין: 70,
  פא: 80, פה: 80, צדי: 90, צדיק: 90, קוף: 100, ריש: 200, רש: 200,
  שין: 300, תו: 400, תיו: 400, תאו: 400,
};

interface Term {
  /** palabra(s) hebrea(s) sin niqud, o "" si el término es un número. */
  hebrew: string;
  /** valor del término según el código (gematría o el número literal). */
  value: number;
  /** la otra lectura válida, si es nombre de letra: el valor de la letra. */
  alt?: number;
  /** valor que el motor declaró entre paréntesis, si lo hizo. */
  declared?: number;
  /** true si el término es un número literal. */
  numeric: boolean;
}

/** Las lecturas admisibles de un término, de la principal a la alternativa. */
function readings(t: Term): number[] {
  return t.alt !== undefined && t.alt !== t.value ? [t.value, t.alt] : [t.value];
}

/** Saca el número de un paréntesis adosado: "(Quién = 50)" → 50, "(50)" → 50. */
function parenValue(tail: string): number | undefined {
  const m = /(\d{1,6})\s*\)\s*$/.exec(tail);
  return m ? Number(m[1]) : undefined;
}

/** Parte una cadena en términos y operadores. */
function parseChain(span: string): { terms: Term[]; ops: string[] } | null {
  const terms: Term[] = [];
  const ops: string[] = [];
  let rest = span;
  const single = new RegExp(`^(${TERM})`);
  while (rest.length > 0) {
    const m = single.exec(rest);
    if (!m) return null;
    const piece = m[1];
    rest = rest.slice(piece.length);
    const declared = piece.includes("(") ? parenValue(piece) : undefined;
    const head = piece.replace(/\s*\(.*$/, "").replace(/[*_]/g, "").trim();
    if (HEB_ONLY.test(head)) {
      const hebrew = stripNiqud(head).trim();
      terms.push({
        hebrew,
        value: gematria(hebrew),
        alt: LETTER_NAME_VALUE[hebrew],
        declared,
        numeric: false,
      });
    } else {
      const n = Number(head);
      if (!Number.isFinite(n)) return null;
      terms.push({ hebrew: "", value: n, declared, numeric: true });
    }
    const op = /^([ \u00A0]*)([+=\u00D7\u2212-])[ \u00A0]*/.exec(rest);
    if (!op) break;
    // El guion pegado (sin espacio delante) es deletreo, o sea suma; el guion
    // suelto es resta. "\u2212" siempre es resta.
    const sign =
      op[2] === "-" ? (op[1].length > 0 ? "\u2212" : "+") : op[2];
    ops.push(sign);
    rest = rest.slice(op[0].length);
  }
  if (rest.trim().length > 0) return null;
  if (terms.length !== ops.length + 1) return null;
  return { terms, ops };
}

function sumLabel(hebrew: string, value: number): string {
  const parts = gematriaBreakdown(hebrew).map((b) => b.value).join("+");
  return parts ? `${hebrew} = ${parts} = ${value}` : `${hebrew} = ${value}`;
}

/**
 * Decide si un término puede juzgarse. Devuelve false cuando hay que dejarlo
 * pasar: palabras que no suman nada, o nombres de letra usados como letra.
 */
function judgeable(t: Term): boolean {
  if (t.numeric) return true;
  if (!t.hebrew || t.value === 0) return false;
  return true;
}

/**
 * Agrupa por "=" y evalúa dentro de cada grupo con una lectura ya fijada.
 * La multiplicación se resuelve antes que la suma y la resta, como en
 * aritmética normal: "840 = 40 × 21" son dos grupos, 840 y 840.
 */
function groupsOf(values: number[], ops: string[]): number[] {
  const groups: number[] = [];
  let nums: number[] = [values[0]];
  let signs: string[] = [];

  const close = () => {
    let acc = nums[0];
    for (let i = 0; i < signs.length; i++) {
      acc = signs[i] === "+" ? acc + nums[i + 1] : acc - nums[i + 1];
    }
    groups.push(acc);
  };

  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const next = values[i + 1];
    if (op === "=") {
      close();
      nums = [next];
      signs = [];
    } else if (op === "×") {
      nums[nums.length - 1] *= next; // liga más fuerte que + y −
    } else {
      nums.push(next);
      signs.push(op === "−" ? "−" : "+");
    }
  }
  close();
  return groups;
}

/**
 * LISTA DE VALORES DECLARADOS: "ע = 70 + ק = 100 + ב = 2 = 172".
 *
 * Aquí el "=" no encadena una ecuación, sino que rotula cada letra con su
 * valor; solo el último suma el total. Leído como ecuación corrida no cuadra
 * nunca, y el verificador marcaba como falsa una cuenta correcta. La forma se
 * reconoce de manera ESTRECHA —letra, valor, "+", letra, valor… y un total— para
 * que no se confunda con cadenas normales como "מי (50) + אלה (36) = 86 = אלהים",
 * que tiene otra estructura y se sigue juzgando como siempre.
 *
 * Devuelve null si el tramo no tiene esta forma; si la tiene, dice si cuadra.
 */
function declarationList(terms: Term[], ops: string[]): boolean | null {
  if (terms.length < 5 || terms.length % 2 === 0) return null;
  if (ops.length !== terms.length - 1) return null;
  const pairs = (terms.length - 1) / 2;

  let sum = 0;
  for (let i = 0; i < pairs; i++) {
    const word = terms[2 * i];
    const num = terms[2 * i + 1];
    if (word.numeric || !num.numeric) return null;
    // Lo que rotula una lista de valores es SIEMPRE una letra suelta (o el
    // nombre de una letra). Si es una palabra entera, esto no es una lista:
    // es una cadena normal como "תולדת = 400+6+30+4+400 = 840", y hay que
    // juzgarla como tal.
    const esLetra =
      word.hebrew.length === 1 || LETTER_NAME_VALUE[word.hebrew] !== undefined;
    if (!esLetra) return null;
    if (ops[2 * i] !== "=") return null;
    const connector = ops[2 * i + 1];
    const expected = i === pairs - 1 ? "=" : "+";
    if (connector !== expected) return null;
    // La forma encaja; ahora sí se juzga el contenido.
    if (!readings(word).includes(num.value)) return false;
    sum += num.value;
  }
  const total = terms[terms.length - 1];
  if (!total.numeric) return null;
  return sum === total.value;
}

/**
 * Recorre las combinaciones de lecturas (cada nombre de letra puede valer la
 * letra o su milui) y devuelve la primera en que la cadena cuadra. `null` si
 * no cuadra con ninguna: entonces sí es aritmética falsa.
 */
function consistentReading(terms: Term[], ops: string[]): number[] | null {
  const options = terms.map(readings);
  const total = options.reduce((n, o) => n * o.length, 1);
  if (total > 64) return null; // demasiadas ramas: no se juzga
  for (let mask = 0; mask < total; mask++) {
    let rest = mask;
    const values = options.map((o) => {
      const v = o[rest % o.length];
      rest = Math.floor(rest / o.length);
      return v;
    });
    const groups = groupsOf(values, ops);
    if (groups.length >= 2 && groups.every((g) => g === groups[0])) return values;
  }
  return null;
}

/** Evalúa una cadena ya parseada. `null` = no concluyente, se deja pasar. */
function verdictFor(
  terms: Term[],
  ops: string[]
): { ok: boolean; truth: string } | null {
  if (terms.some((t) => !judgeable(t))) return null;

  // Antes que nada, la lista de valores declarados: tiene su propia gramática
  // y leerla como ecuación corrida da siempre un falso positivo.
  const asList = declarationList(terms, ops);
  if (asList !== null) {
    if (asList) return { ok: true, truth: "" };
    const pieces = terms
      .filter((t) => !t.numeric && t.hebrew)
      .map((t) => sumLabel(t.hebrew, t.value));
    return { ok: false, truth: pieces.join("; ") };
  }

  const hasEq = ops.includes("=");
  const hasNumber = terms.some((t) => t.numeric);

  // Primero: los valores declarados entre paréntesis. Juzgarlos es seguro por
  // construcción: VALUE_RE solo acepta paréntesis con "=" dentro, y CHAIN_RE
  // solo los ve dentro de una cadena con operadores, o sea en pleno cálculo.
  let declaredChecked = 0;
  for (const t of terms) {
    if (t.numeric || t.declared === undefined) continue;
    if (!readings(t).includes(t.declared)) {
      return { ok: false, truth: sumLabel(t.hebrew, t.value) };
    }
    declaredChecked++;
  }

  // "אַבְרָהָם (=248)": no hay cadena que evaluar, pero sí una cifra que se
  // comprobó y cuadra. Cuenta como verificada, no como no concluyente.
  if (!hasEq) return declaredChecked > 0 ? { ok: true, truth: "" } : null;
  // Sin cifras no es aritmética: es notarikon ("יהוה = היה הוה ויהיה") o una
  // combinación de letras ("ב + ת = בת"). No se juzga.
  if (!hasNumber) return null;

  // Grupos separados por "=", sumando dentro de cada grupo. Basta con que la
  // cadena cuadre bajo ALGUNA lectura admisible.
  if (groupsOf(terms.map((t) => t.value), ops).length < 2) return null;
  if (consistentReading(terms, ops)) return { ok: true, truth: "" };

  // Falla: la verdad se escribe con las piezas que tenemos.
  const pieces = terms
    .filter((t) => !t.numeric && t.hebrew)
    .map((t) => sumLabel(t.hebrew, t.value));
  const truth =
    pieces.length > 0
      ? pieces.join("; ")
      : `la suma da ${groupsOf(terms.map((t) => t.value), ops)[0]}`;
  return { ok: false, truth };
}

/**
 * Revisa toda la aritmética afirmada en un texto. Nunca lanza.
 * Devuelve un hallazgo por tramo juzgado (ok o false) y cuántos se dejaron
 * pasar por no ser analizables con seguridad.
 */
export function checkArithmetic(text: string): {
  findings: ArithmeticFinding[];
  inconclusive: number;
} {
  const findings: ArithmeticFinding[] = [];
  let inconclusive = 0;
  const covered: Array<[number, number]> = [];

  const scan = (re: RegExp) => {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const span = m[0];
      const start = m.index;
      const end = start + span.length;
      if (span.length === 0) {
        re.lastIndex++;
        continue;
      }
      if (covered.some(([a, b]) => start < b && end > a)) continue;
      if (!HEB_ONLY.test(span) && !/\d/.test(span)) continue;

      // Guarda de borde: si justo antes o justo después hay algo que convierte
      // esto en el pedazo de una expresión mayor (otra cifra pegada, un signo
      // que no sabemos leer), no se juzga. Marcar un trozo suelto es peor que
      // callar: la cuenta entera puede estar perfectamente bien.
      // Delante, un "+" o un "=" significan que la cadena viene de más atrás y
      // esto es un pedazo. Detrás NO: un "= Biná" es prosa, y si de verdad la
      // cuenta siguiera, el patrón ya la habría consumido entera.
      // Los exponentes en superíndice ("3 × 3\u2074") tampoco se saben leer: si
      // uno toca el tramo, se deja pasar en vez de juzgar media potencia.
      const SUP = "\\u2070\\u00B9\\u00B2\\u00B3\\u2074-\\u2079";
      const FRAG_ANTES = `[\\d+=\\u00D7\\u2212\\u00F7/${SUP}]`;
      const FRAG_DESPUES = `[\\d\\u00D7\\u2212\\u00F7/${SUP}]`;
      const before = text.slice(Math.max(0, start - 4), start);
      const after = text.slice(end, end + 4);
      // Un guion PEGADO (sin espacio) también parte: el motor deletrea
      // "א-ב-ר-ה-מ = 1+2+200+5+40 = 248" y sin esto el patrón arrancaría en la
      // última letra y juzgaría "מ = 248". La viñeta de lista ("- ") lleva
      // espacio, así que no cae aquí y las listas se siguen juzgando.
      const glued = /[-־]$/.test(before) || /^[-־]/.test(after);
      if (
        glued ||
        new RegExp(`${FRAG_ANTES}[ \\u00A0]{0,2}$`).test(before) ||
        new RegExp(`^[ \\u00A0]{0,2}${FRAG_DESPUES}`).test(after)
      ) {
        inconclusive++;
        continue;
      }

      const parsed = parseChain(span);
      if (!parsed) {
        inconclusive++;
        continue;
      }
      const verdict = verdictFor(parsed.terms, parsed.ops);
      if (!verdict) {
        inconclusive++;
        continue;
      }
      covered.push([start, end]);
      findings.push({
        raw: span,
        end,
        verdict: verdict.ok ? "ok" : "false",
        truth: verdict.truth,
      });
    }
  };

  try {
    scan(CHAIN_RE);
    scan(VALUE_RE);
  } catch {
    // un texto raro no puede tumbar el botón: devolvemos lo que haya.
  }

  return { findings, inconclusive };
}

/** Exportado solo para las pruebas del parser. */
export const __internals = { parseChain, verdictFor };
