// ─────────────────────────────────────────────────────────────────────────
//  LECTURA DEL NOMBRE — קְרִיאַת הַשֵּׁם · backend matemático (determinista)
// ─────────────────────────────────────────────────────────────────────────
//  Spec: docs/specs/lectura-del-nombre.md (Sofer 2026-06-15).
//  REGLA DURA: TODA la matemática (gematría, atbash, partición/notarikón,
//  roshei+sofei tevot, tzeruf/anagrama, milui, equivalencias) la calcula ESTE
//  módulo en código. La IA NUNCA inventa un número ni afirma que un anagrama o
//  partición "existe": solo recibe lo que aquí se confirma y compone el derash.
//
//  Caso de prueba ("golden test") en la spec — "Mardan" מרדן:
//    · gematría מרדן = 294
//    · roshei/sofei  מ…ן = מן = 90  (maná del cielo)
//    · equivalencia  מן (90) = מים (90)  (agua)
//    · partición     מר (240, amargo) + דן (54, juzgó / tribu de Dan)
//    · atbash        מרדנ → יגקט (sin sentido → "sin lectura clara")
//    · milui de Nun  נון = 106
//  Ver __mardanGoldenTest() al final: valida estos números en build/test.
// ─────────────────────────────────────────────────────────────────────────

import { gematria, stripNiqud, LETTER_NAMES } from "@/lib/sources/lexicon";

// Valor estándar de cada letra (forma final = forma normal). Réplica local del
// mapa de lexicon.ts para el milui/normalización; gematria() sigue siendo la
// fuente para sumar palabras completas.
const VALOR: Record<string, number> = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50,
  ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90,
  ק: 100, ר: 200, ש: 300, ת: 400,
};

// Normaliza formas finales a su forma normal (necesario para atbash, tzeruf,
// milui y partición; las finales solo importan al MOSTRAR, no al combinar).
const FINAL_A_NORMAL: Record<string, string> = {
  ך: "כ", ם: "מ", ן: "נ", ף: "פ", ץ: "צ",
};
export function normalizarFinales(s: string): string {
  return s.replace(/[ךםןףץ]/g, (c) => FINAL_A_NORMAL[c] ?? c);
}

// ─── ATBASH — tabla VERIFICADA de la spec (א↔ת, ב↔ש, …) ──────────────────────
const ATBASH: Record<string, string> = {
  א: "ת", ב: "ש", ג: "ר", ד: "ק", ה: "צ", ו: "פ", ז: "ע", ח: "ס",
  ט: "נ", י: "מ", כ: "ל", ל: "כ", מ: "י", נ: "ט", ס: "ח", ע: "ז",
  פ: "ו", צ: "ה", ק: "ד", ר: "ג", ש: "ב", ת: "א",
};
export function atbash(word: string): string {
  const c = normalizarFinales(stripNiqud(word));
  let out = "";
  for (const ch of c) out += ATBASH[ch] ?? ch;
  return out;
}

// ─── MILUI — deletreo estándar de cada letra (נ → נון, etc.) ──────────────────
// Deletreo clásico (mismo del Sofer; finales se deletrean como su forma normal).
const DELETREO: Record<string, string> = {
  א: "אלף", ב: "בית", ג: "גימל", ד: "דלת", ה: "הא", ו: "וו",
  ז: "זין", ח: "חית", ט: "טית", י: "יוד", כ: "כף", ל: "למד",
  מ: "מם", נ: "נון", ס: "סמך", ע: "עין", פ: "פא", צ: "צדי",
  ק: "קוף", ר: "ריש", ש: "שין", ת: "תו",
};

export interface MiluiLetra {
  /** letra (forma normalizada) */
  letra: string;
  /** deletreo en hebreo, ej. "נון" */
  deletreo: string;
  /** gematría del deletreo, ej. 106 */
  valor: number;
}
export function milui(word: string): { letras: MiluiLetra[]; total: number } {
  const c = normalizarFinales(stripNiqud(word));
  const letras: MiluiLetra[] = [];
  let total = 0;
  for (const ch of c) {
    const del = DELETREO[ch];
    if (!del) continue;
    const valor = gematria(del);
    letras.push({ letra: ch, deletreo: del, valor });
    total += valor;
  }
  return { letras, total };
}

// ─── LÉXICO HEBREO CURADO ─────────────────────────────────────────────────────
// Palabras hebreas reales con su sentido, para reconocer particiones, tzerufim y
// equivalencias de gematría OFFLINE y de forma determinista. NO es exhaustivo: es
// un núcleo verificado (incluye todos los casos del golden test de la spec). Una
// "palabra" candidata solo se confirma si está aquí. Mejor un vacío honesto que un
// falso positivo. (El glosado/derash lo hace la IA; aquí solo el dato lexical.)
//
// La clave es la palabra normalizada (sin finales, sin niqud). El glifo final
// se reconstruye al MOSTRAR (display) para que מן/מים se vean naturales.
interface EntradaLexico {
  /** glosa corta es (la IA expande el derash) */
  glosa: string;
  /** fuente/ref opcional, verificada en la spec o tradición sólida */
  ref?: string;
}
// Las claves se escriben con su grafía natural (con final donde corresponde);
// el índice de abajo las normaliza para la búsqueda. El `display()` reañade la
// forma final a una palabra normalizada.
const LEXICO_RAW: Record<string, EntradaLexico> = {
  // — del golden test "Mardan" —
  מן: { glosa: "maná, el pan del cielo", ref: "Shemot/Éxodo 16" },
  מים: { glosa: "agua (mayim), la fuente del flujo de vida" },
  מר: { glosa: "amargo / gota (cf. «gota del balde»)", ref: "Yeshayahu/Isaías 40:15" },
  דן: { glosa: "juzgó / la tribu de Dan" },
  // — núcleo de palabras hebreas comunes en nombres —
  אב: { glosa: "padre" },
  אם: { glosa: "madre" },
  אור: { glosa: "luz", ref: "Bereshit/Génesis 1:3" },
  אל: { glosa: "Dios / hacia" },
  אש: { glosa: "fuego" },
  בן: { glosa: "hijo" },
  בת: { glosa: "hija" },
  בית: { glosa: "casa (bayit)" },
  גן: { glosa: "jardín" },
  דם: { glosa: "sangre" },
  דר: { glosa: "habitar / generación" },
  הר: { glosa: "monte" },
  זר: { glosa: "corona / extraño" },
  חי: { glosa: "vivo, vida (jai)" },
  חן: { glosa: "gracia (jen)" },
  טוב: { glosa: "bueno (tov)", ref: "Bereshit/Génesis 1:4" },
  יד: { glosa: "mano" },
  ים: { glosa: "mar" },
  כל: { glosa: "todo" },
  לב: { glosa: "corazón (lev)" },
  מלך: { glosa: "rey" },
  נר: { glosa: "lámpara, vela" },
  עין: { glosa: "ojo / fuente" },
  עם: { glosa: "pueblo / con" },
  פה: { glosa: "boca" },
  צל: { glosa: "sombra / amparo" },
  קל: { glosa: "ligero / voz (kol)" },
  רן: { glosa: "canto de júbilo" },
  רע: { glosa: "amigo / mal (dos filos)" },
  שם: { glosa: "nombre (shem)" },
  שר: { glosa: "príncipe / cantar" },
  תם: { glosa: "íntegro, simple (tam)" },
  // — palabras de valor notable para equivalencias —
  אהבה: { glosa: "amor (ahavá)" },
  אחד: { glosa: "uno (ejad)" },
  חיים: { glosa: "vida (jaim)" },
  משיח: { glosa: "Mashíaj, el ungido" },
  נחש: { glosa: "serpiente (najash) — los «dos filos» del corpus" },
  ינון: { glosa: "Yinón, nombre del Mashíaj", ref: "Sanhedrín 98b / Tehilim 72:17" },
  אמת: { glosa: "verdad (emet)", ref: "Shabat 55a" },
};

// Índice normalizado (clave sin formas finales) para búsqueda determinista.
const LEXICO: Record<string, EntradaLexico> = (() => {
  const m: Record<string, EntradaLexico> = {};
  for (const [palabra, entrada] of Object.entries(LEXICO_RAW)) {
    m[normalizarFinales(palabra)] = entrada;
  }
  return m;
})();

// display(): reañade la forma final a la última letra de una palabra normalizada,
// para mostrarla con su grafía natural (ej. "מנ" → "מן", "שמ" → "שם").
const NORMAL_A_FINAL: Record<string, string> = { כ: "ך", מ: "ם", נ: "ן", פ: "ף", צ: "ץ" };
export function display(norm: string): string {
  if (!norm) return norm;
  const arr = norm.split("");
  const last = arr[arr.length - 1];
  if (NORMAL_A_FINAL[last]) arr[arr.length - 1] = NORMAL_A_FINAL[last];
  return arr.join("");
}

function buscarLexico(palabra: string): EntradaLexico | null {
  return LEXICO[normalizarFinales(palabra)] ?? null;
}

// ─── EQUIVALENCIAS DE GEMATRÍA (mismo valor) ─────────────────────────────────
// Índice valor → palabras del léxico con ese valor. Determinista y offline.
const POR_VALOR: Map<number, { palabra: string; entrada: EntradaLexico }[]> = (() => {
  const m = new Map<number, { palabra: string; entrada: EntradaLexico }[]>();
  for (const [palabra, entrada] of Object.entries(LEXICO)) {
    const v = gematria(palabra);
    const arr = m.get(v) ?? [];
    arr.push({ palabra, entrada });
    m.set(v, arr);
  }
  return m;
})();

export interface Equivalencia {
  /** la palabra del nombre/fragmento que dispara la equivalencia */
  fuente: string;
  valor: number;
  /** otras palabras del léxico con ESE mismo valor (excluida la fuente) */
  iguales: { palabra: string; glosa: string; ref?: string }[];
}
function equivalenciasDe(palabra: string): Equivalencia | null {
  const norm = normalizarFinales(palabra);
  const v = gematria(norm);
  const lista = (POR_VALOR.get(v) ?? []).filter((x) => normalizarFinales(x.palabra) !== norm);
  if (lista.length === 0) return null;
  return {
    fuente: display(norm),
    valor: v,
    iguales: lista.map((x) => ({ palabra: display(normalizarFinales(x.palabra)), glosa: x.entrada.glosa, ref: x.entrada.ref })),
  };
}

// ─── PARTICIÓN / NOTARIKÓN (cortar el nombre en sub-palabras con sentido) ─────
export interface Particion {
  /** los fragmentos en hebreo, ej. ["מר", "דן"] */
  fragmentos: string[];
  /** glosa de cada fragmento (del léxico) */
  sentidos: { fragmento: string; valor: number; glosa: string; ref?: string }[];
}
// Todos los cortes en 2 fragmentos donde AMBOS son palabra del léxico.
function particiones(word: string): Particion[] {
  const c = normalizarFinales(stripNiqud(word));
  const out: Particion[] = [];
  for (let i = 1; i < c.length; i++) {
    const a = c.slice(0, i);
    const b = c.slice(i);
    const ea = buscarLexico(a);
    const eb = buscarLexico(b);
    if (ea && eb) {
      out.push({
        fragmentos: [display(a), display(b)],
        sentidos: [
          { fragmento: display(a), valor: gematria(a), glosa: ea.glosa, ref: ea.ref },
          { fragmento: display(b), valor: gematria(b), glosa: eb.glosa, ref: eb.ref },
        ],
      });
    }
  }
  return out;
}

// ─── ROSHEI + SOFEI TEVOT (primera + última letra) ───────────────────────────
export interface RosheiSofei {
  /** primera+última, normalizadas, ej. "מן" */
  combinacion: string;
  primera: string;
  ultima: string;
  valor: number;
  /** glosa si la combinación es palabra del léxico */
  glosa?: string;
  ref?: string;
}
function rosheiSofei(word: string): RosheiSofei | null {
  const c = normalizarFinales(stripNiqud(word));
  if (c.length < 2) return null;
  const primera = c[0];
  const ultima = c[c.length - 1];
  const combinacion = primera + ultima;
  const entrada = buscarLexico(combinacion);
  return {
    combinacion: display(combinacion),
    primera,
    ultima: display(ultima),
    valor: gematria(combinacion),
    glosa: entrada?.glosa,
    ref: entrada?.ref,
  };
}

// ─── TZERUF / ANAGRAMA (recombinar TODAS las letras → palabra real) ──────────
export interface Tzeruf {
  /** anagrama hebreo que SÍ es palabra del léxico */
  palabra: string;
  valor: number;
  glosa: string;
  ref?: string;
}
// Genera permutaciones (hasta longitud razonable) y filtra solo palabras del
// léxico DISTINTAS del nombre. La gematría de un anagrama siempre iguala la del
// nombre (misma multiset de letras), por eso no aporta valor nuevo, sí sentido.
function tzerufim(word: string): Tzeruf[] {
  const c = normalizarFinales(stripNiqud(word));
  if (c.length < 2 || c.length > 6) return []; // >6 letras: explosión combinatoria, se omite
  const letras = c.split("");
  const vistas = new Set<string>();
  const resultados = new Map<string, Tzeruf>();
  const permutar = (resto: string[], acc: string) => {
    if (resto.length === 0) {
      if (acc === c || vistas.has(acc)) return;
      vistas.add(acc);
      const e = LEXICO[acc];
      if (e) resultados.set(acc, { palabra: display(acc), valor: gematria(acc), glosa: e.glosa, ref: e.ref });
      return;
    }
    for (let i = 0; i < resto.length; i++) {
      const next = [...resto.slice(0, i), ...resto.slice(i + 1)];
      permutar(next, acc + resto[i]);
    }
  };
  permutar(letras, "");
  return [...resultados.values()];
}

// ─── DESGLOSE DE LETRAS (glifo + nombre + valor, en orden del nombre) ─────────
export interface LetraNombre {
  /** glifo tal como aparece (puede ser final) */
  glifo: string;
  /** glifo normalizado (sin final) para casar con el corpus */
  base: string;
  nombre: string;
  valor: number;
  /** ¿es forma final? */
  final: boolean;
}
function desgloseLetras(word: string): LetraNombre[] {
  const c = stripNiqud(word);
  const out: LetraNombre[] = [];
  for (const ch of c) {
    if (!VALOR[ch]) continue;
    const base = FINAL_A_NORMAL[ch] ?? ch;
    out.push({
      glifo: ch,
      base,
      nombre: LETTER_NAMES[ch] ?? LETTER_NAMES[base] ?? "",
      valor: VALOR[ch],
      final: ch in FINAL_A_NORMAL,
    });
  }
  return out;
}

// ─── RESULTADO COMPLETO ──────────────────────────────────────────────────────
export interface LecturaNombreData {
  /** nombre tal como llegó (limpio de niqud), en hebreo */
  nombre: string;
  /** normalizado (finales → normales) */
  normalizado: string;
  /** gematría del nombre completo */
  gematria: number;
  /** letras en orden, con glifo/nombre/valor */
  letras: LetraNombre[];
  /** primera + última letra */
  rosheiSofei: RosheiSofei | null;
  /** particiones válidas (ambos fragmentos = palabra real) */
  particiones: Particion[];
  /** anagramas que son palabra real */
  tzerufim: Tzeruf[];
  /** atbash: la palabra cifrada + si tiene sentido */
  atbash: { palabra: string; tieneSentido: boolean; glosa?: string };
  /** milui (deletreo) */
  milui: { letras: MiluiLetra[]; total: number };
  /** equivalencias de gematría (del nombre, de fragmentos y de roshei/sofei) */
  equivalencias: Equivalencia[];
}

/** Calcula TODO lo determinista de la lectura del nombre. La IA solo recibe esto. */
export function leerNombre(input: string): LecturaNombreData {
  const nombre = stripNiqud(input).replace(/[^א-ת]/g, ""); // solo letras hebreas
  const normalizado = normalizarFinales(nombre);

  const letras = desgloseLetras(nombre);
  const rs = rosheiSofei(nombre);
  const parts = particiones(nombre);
  const tzer = tzerufim(nombre);
  const atb = atbash(nombre);
  const atbEntrada = LEXICO[atb] ?? null;
  const mil = milui(nombre);

  // Equivalencias: del nombre completo, de cada fragmento de partición, y de la
  // combinación roshei/sofei. Se deduplican por (fuente|valor).
  const eqMap = new Map<string, Equivalencia>();
  const pushEq = (palabra: string) => {
    const eq = equivalenciasDe(palabra);
    if (eq) eqMap.set(`${eq.fuente}|${eq.valor}`, eq);
  };
  pushEq(normalizado);
  if (rs) pushEq(rs.combinacion);
  for (const p of parts) for (const f of p.fragmentos) pushEq(f);

  return {
    nombre,
    normalizado,
    gematria: gematria(nombre),
    letras,
    rosheiSofei: rs,
    particiones: parts,
    tzerufim: tzer,
    atbash: {
      palabra: display(atb),
      tieneSentido: !!atbEntrada,
      glosa: atbEntrada?.glosa,
    },
    milui: mil,
    equivalencias: [...eqMap.values()],
  };
}

// ─── GOLDEN TEST (spec §"Ejemplo trabajado y VERIFICADO — Mardan") ───────────
// No corre en producción; lo invoca scripts/check-name-reading. Lanza si algún
// número del caso de prueba no cuadra — así el backend nunca "deriva" sin avisar.
export function __mardanGoldenTest(): { ok: true } {
  const d = leerNombre("מַרְדָּן"); // con niqud → debe limpiarse a מרדן
  const fails: string[] = [];
  if (d.normalizado !== "מרדנ") fails.push(`normalizado=${d.normalizado} (esperado מרדנ)`);
  if (d.gematria !== 294) fails.push(`gematria=${d.gematria} (esperado 294)`);
  if (d.rosheiSofei?.combinacion !== "מן") fails.push(`roshei/sofei=${d.rosheiSofei?.combinacion} (esperado מן)`);
  if (d.rosheiSofei?.valor !== 90) fails.push(`roshei/sofei valor=${d.rosheiSofei?.valor} (esperado 90)`);
  // מן = 90 debe traer מים (90) como equivalencia
  const eqMan = d.equivalencias.find((e) => e.fuente === "מן");
  if (!eqMan || !eqMan.iguales.some((x) => normalizarFinales(x.palabra) === "מימ"))
    fails.push("falta equivalencia מן=מים (90)");
  // partición מר + דן
  const part = d.particiones.find((p) => p.fragmentos[0] === "מר" && p.fragmentos[1] === "דן");
  if (!part) fails.push("falta partición מר+דן");
  if (part && part.sentidos[0].valor !== 240) fails.push(`מר valor=${part.sentidos[0].valor} (esperado 240)`);
  if (part && part.sentidos[1].valor !== 54) fails.push(`דן valor=${part.sentidos[1].valor} (esperado 54)`);
  // atbash מרדנ → יגקט, sin sentido
  if (d.atbash.palabra !== "יגקט") fails.push(`atbash=${d.atbash.palabra} (esperado יגקט)`);
  if (d.atbash.tieneSentido) fails.push("atbash יגקט NO debería tener sentido");
  // milui de Nun = 106 (la última letra del nombre)
  const nun = d.milui.letras.find((l) => l.letra === "נ");
  if (!nun || nun.valor !== 106) fails.push(`milui נון=${nun?.valor} (esperado 106)`);

  if (fails.length > 0) {
    throw new Error("GOLDEN TEST Mardan FALLÓ:\n  - " + fails.join("\n  - "));
  }
  return { ok: true };
}
