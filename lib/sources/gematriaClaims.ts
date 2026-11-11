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
const GLOSS = `\\([^()=]{0,40}=\\s*${NUM}\\s*\\)`;
/** "(50)", "(=10)": el valor pelado entre paréntesis. */
const PAREN_NUM = `\\(\\s*=?\\s*${NUM}\\s*\\)`;
/** Énfasis de markdown pegado a un término: el motor escribe "= **62**". */
const EMPH = "[*_]{0,2}";
const TERM = `${EMPH}(?:${HEB_PHRASE}|${NUM})${EMPH}(?:\\s*(?:${GLOSS}|${PAREN_NUM}))?`;

/** Cadenas tipo "מי (50) + אלה (36) = 86 = אלהים" o "אלהים = 86". */
const CHAIN_RE = new RegExp(`${TERM}(?:\\s*[+=]\\s*${TERM})+`, "g");
/** "מִי (Quién = 50)": declara un valor sin formar cadena. */
const VALUE_RE = new RegExp(`${HEB_PHRASE}\\s*${GLOSS}`, "g");

const HEB_ONLY = /[א-ת]/;

// Nombres de las letras escritos en hebreo, con el valor de SU letra.
// Sirven como guarda: si alguien escribe "יוד (=10)" está hablando del valor
// de la letra yod, no de la guematría de la palabra יוד (que es 20). Esas
// afirmaciones se dejan pasar. En cambio "יוד = 20" sí se verifica como
// palabra: solo se perdona cuando la cifra declarada ES la de la letra.
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
  /** valor que el motor declaró entre paréntesis, si lo hizo. */
  declared?: number;
  /** true si el término es un número literal. */
  numeric: boolean;
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
      terms.push({ hebrew, value: gematria(hebrew), declared, numeric: false });
    } else {
      const n = Number(head);
      if (!Number.isFinite(n)) return null;
      terms.push({ hebrew: "", value: n, declared, numeric: true });
    }
    const op = /^\s*([+=])\s*/.exec(rest);
    if (!op) break;
    ops.push(op[1]);
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
  const letterValue = LETTER_NAME_VALUE[t.hebrew];
  if (letterValue !== undefined && t.declared === letterValue) return false;
  return true;
}

/** Evalúa una cadena ya parseada. `null` = no concluyente, se deja pasar. */
function verdictFor(
  terms: Term[],
  ops: string[]
): { ok: boolean; truth: string } | null {
  if (terms.some((t) => !judgeable(t))) return null;

  const hasEq = ops.includes("=");
  const hasNumber = terms.some((t) => t.numeric);

  // Primero: los valores declarados entre paréntesis. Juzgarlos es seguro por
  // construcción: VALUE_RE solo acepta paréntesis con "=" dentro, y CHAIN_RE
  // solo los ve dentro de una cadena con operadores, o sea en pleno cálculo.
  let declaredChecked = 0;
  for (const t of terms) {
    if (t.numeric || t.declared === undefined) continue;
    if (t.declared !== t.value) {
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

  // Grupos separados por "=", sumando dentro de cada grupo.
  const groups: number[] = [];
  let acc = terms[0].value;
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "+") acc += terms[i + 1].value;
    else {
      groups.push(acc);
      acc = terms[i + 1].value;
    }
  }
  groups.push(acc);
  if (groups.length < 2) return null;

  const first = groups[0];
  if (groups.every((g) => g === first)) {
    return { ok: true, truth: "" };
  }

  // Falla: la verdad se escribe con las piezas que tenemos.
  const pieces = terms
    .filter((t) => !t.numeric && t.hebrew)
    .map((t) => sumLabel(t.hebrew, t.value));
  const truth = pieces.length > 0 ? pieces.join("; ") : `la suma da ${first}`;
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
