// Verificación de REFERENCIAS escritas en prosa por el motor.
//
// Por qué existe: una cifra falsa la caza quien sepa sumar; un folio falso es
// una cita que el lector va a buscar al Zóhar y no va a encontrar. Es el daño
// más caro para la credibilidad del sitio, así que no basta "elegir un modelo
// mejor": hay que comprobar.
//
// REGLA DE ORO — ante la duda, dejar pasar. Un falso negativo (marcar como
// dudosa una cita que SÍ existe) destruye la confianza en el material bueno,
// que aquí es la mayoría. Solo se marca lo que se COMPRUEBA que falla; todo lo
// demás se devuelve intacto y se cuenta como no concluyente.
//
// Qué se puede comprobar y cómo:
//  · Zóhar parashá+folio → tabla local (zoharDafim.generated.ts). La API de
//    Sefaria NO sirve para esto: /api/name da is_ref:false incluso para folios
//    válidos, y /api/texts devuelve 200 ignorando el folio en silencio.
//  · Talmud tratado+daf  → catálogo local (firstDaf..units). Tampoco se puede
//    preguntar a Sefaria: /api/texts/"Sotah 999b" devuelve 200 con "Sotah 2a".
//  · Tanaj libro cap:ver → el capítulo, con el catálogo local; el VERSÍCULO,
//    contra Sefaria (/api/name, que ahí sí responde con is_ref fiable).
// Cualquier otra fuente (Midrash, Etz Jaim, Sha'ar HaGilgulim, Tikunei Zohar…)
// queda como no concluyente: no tenemos con qué juzgarla.

import { CATALOG } from "@/lib/sources/catalog.generated";
import { BOOK_NAMES } from "@/lib/sources/bookNames";
import { ZOHAR_DAFIM } from "@/lib/sources/zoharDafim.generated";
import { TANAKH_VERSES } from "@/lib/sources/tanakhShape.generated";

export type Verdict = "ok" | "false" | "unknown";

export interface CitationFinding {
  /** el texto de la cita tal como el motor la escribió. */
  raw: string;
  /** posición en la prosa donde termina la cita (para marcar justo después). */
  end: number;
  kind: "zohar" | "talmud" | "tanakh";
  verdict: Verdict;
  /** por qué: "Pinjás va de 213a a 254a", "no concluyente: parashá desconocida"… */
  detail: string;
}

// ── Normalización de nombres ────────────────────────────────────────────────
// El motor escribe en español ("Pinjás", "Lej Lejá", "Génesis", "Sotá") y
// Sefaria en inglés transliterado ("Pinchas", "Lech Lecha", "Genesis",
// "Sotah"). Reducimos ambos al mismo esqueleto consonántico: sin acentos,
// ch/kh→j, tz→z, sin haches, sin vocales, sin letras repetidas. Los numerales
// (Reyes I / I Kings) se pasan a dígito para no confundir I con II.
function plain(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\biii\b/g, "3")
    .replace(/\bii\b/g, "2")
    .replace(/\bi\b/g, "1")
    .replace(/[^a-z0-9]/g, "");
}

/** Clave suave: solo sin acentos ni espacios. "Isaías" → "isaias". */
function normMild(s: string): string {
  return plain(s);
}

/** Clave dura: esqueleto consonántico. "Pinjás" y "Pinchas" → "pnjs". */
function norm(s: string): string {
  return plain(s)
    .replace(/ch/g, "j")
    .replace(/kh/g, "j")
    .replace(/tz/g, "z")
    .replace(/h/g, "")
    .replace(/[aeiou]/g, "")
    .replace(/(.)\1+/g, "$1");
}

/**
 * Construye un índice clave→valor descartando las claves AMBIGUAS: si dos
 * nombres distintos se reducen al mismo esqueleto, ninguno de los dos se
 * puede identificar con certeza, así que esa clave se elimina y ambas citas
 * quedarán como no concluyentes. Preferimos perder capacidad de detección
 * antes que arriesgar un falso positivo.
 */
function buildIndex<T>(pairs: [string, T][]): Map<string, T> {
  const map = new Map<string, T>();
  const ambiguous = new Set<string>();
  // Cada nombre entra por dos claves: la suave (sirve para los nombres llenos
  // de vocales, "Isaías", que el esqueleto duro reduce a casi nada) y la dura
  // (sirve para cruzar grafías, "Pinjás" ↔ "Pinchas").
  for (const [rawKey, value] of pairs) {
    for (const key of [normMild(rawKey), norm(rawKey)]) {
      if (!key || key.length < 2) continue;
      const prev = map.get(key);
      if (prev !== undefined && prev !== value) {
        ambiguous.add(key);
        continue;
      }
      map.set(key, value);
    }
  }
  for (const key of ambiguous) map.delete(key);
  return map;
}

/** Nombres alternativos en español que el normalizador no alcanza solo. */
const ZOHAR_ALIASES: [string, string][] = [
  ["Shelaj Leja", "Sh'lach"],
  ["Shlaj Leja", "Sh'lach"],
  ["Ajarei Mot", "Achrei Mot"],
  ["Ajaret Mot", "Achrei Mot"],
  ["Hakdama", "Introduction"],
  ["Hakdamat Sefer HaZohar", "Introduction"],
  ["Introduccion", "Introduction"],
];

const ZOHAR_INDEX = buildIndex<string>([
  ...ZOHAR_DAFIM.map((r) => [r.name, r.name] as [string, string]),
  ...ZOHAR_ALIASES,
]);

const ZOHAR_BY_NAME = new Map(ZOHAR_DAFIM.map((r) => [r.name, r]));

// Nombres hebreos de las parashiot del Zóhar (el motor a veces cita en hebreo).
const ZOHAR_BY_HE = new Map(ZOHAR_DAFIM.filter((r) => r.he).map((r) => [r.he, r.name]));

// ── Catálogo local: tratados del Talmud y libros del Tanaj ──────────────────
interface CatalogBook {
  id: string;
  type: "chapters" | "talmud";
  units: number;
  firstDaf?: number;
  group: string;
}

const CATALOG_BOOKS: CatalogBook[] = CATALOG.flatMap((g) =>
  g.subs.flatMap((s) =>
    s.books.map((b) => ({
      id: b.id,
      type: b.type,
      units: b.units,
      firstDaf: b.firstDaf,
      group: g.id,
    }))
  )
);

// Alias en español: BOOK_NAMES trae cosas como "Génesis (Bereshit)" o
// "Reyes I (Melajim I)". Cada mitad vale como nombre de libro por separado.
function spanishAliases(): [string, string][] {
  const out: [string, string][] = [];
  for (const [id, n] of Object.entries(BOOK_NAMES)) {
    const m = /^(.+?)\s*\((.+)\)$/.exec(n.es);
    if (m) {
      out.push([m[1].trim(), id]);
      out.push([m[2].trim(), id]);
    } else {
      out.push([n.es, id]);
    }
  }
  return out;
}

const BOOK_INDEX = buildIndex<string>([
  ...CATALOG_BOOKS.map((b) => [b.id, b.id] as [string, string]),
  ...spanishAliases(),
]);

const BOOK_BY_ID = new Map(CATALOG_BOOKS.map((b) => [b.id, b]));

// ── Folios ──────────────────────────────────────────────────────────────────
/** "15a" → 28. Medios folios: 1a=0, 1b=1, 2a=2… */
function dafToUnit(daf: number, amud: string): number {
  return (daf - 1) * 2 + (amud.toLowerCase() === "b" ? 1 : 0);
}

function unitToLabel(u: number): string {
  return `${Math.floor(u / 2) + 1}${u % 2 ? "b" : "a"}`;
}

// Margen de tolerancia en MEDIOS folios (20 = 10 folios) sobre el rango de la
// parashá. Las ediciones del Zóhar no coinciden exactamente y la gente cita de
// memoria: sin margen marcaríamos citas reales. Con margen seguimos cazando el
// folio inventado, que casi nunca cae a diez folios de su parashá.
const ZOHAR_MARGIN = 20;

// ── Extracción ──────────────────────────────────────────────────────────────

// "Zohar Pinjás 226b", "Zóhar, Lej Lejá 76b", "Zohar Vayishlaj 170a".
// El nombre de la parashá se limita a 1-3 palabras para no tragarse la frase.
const ZOHAR_RE =
  /\bZ[oó]har\b[\s,]*((?:[A-Za-zÀ-ÿ'’]+)(?:\s+[A-Za-zÀ-ÿ'’]+){0,2}|[א-ת ]{2,20})\s+(\d{1,3})\s*([ab])\b/gi;

// Lo que NO es el Zóhar de las parashiot y numera distinto: no se juzga.
const NOT_THE_ZOHAR = /\b(?:jadash|chadash|hadash|tikun|tikkun|tikunei|tikkunei)\b/i;

// Obras que usan los MISMOS nombres de libro con otra numeración: "Midrash
// Rabbah (Bereishit 63:8)" no es Génesis 63:8 — Bereshit Rabá tiene cien
// capítulos. Sin esta guarda marcábamos como falsa una cita midráshica
// perfectamente buena, que es el error más caro que podemos cometer.
// También cubre el Yerushalmi, cuyos folios no son los del Bavlí.
const OTHER_WORK =
  /(?:midrash|rabb?[aá]h?\b|tanj?uma|tanchuma|me[jk]h?ilta|sifr[aáei]|yalkut|pesikta|z[oó]har|tikk?un|tan[iy]a|likut|et[sz]\s*(?:j|ch|kh|h)?a[iy]m|sha'?ar|yerushalmi|pirkei|avot|bahir|ramban|rashi|ibn\s*ezra)/i;

/**
 * ¿La cita pertenece a OTRA obra? Se mira lo que viene justo antes (45
 * caracteres: "Midrash Rabbah (Bereishit 63:8)") Y el propio texto de la cita
 * ("Talmud Yerushalmi Berajot 150a", cuyos folios no son los del Bavlí).
 * Si lo es, no se juzga.
 */
function isOtherWork(text: string, start: number, raw: string): boolean {
  return OTHER_WORK.test(text.slice(Math.max(0, start - 45), start)) || OTHER_WORK.test(raw);
}

// "Sotá 34b", "Talmud Berajot 5a", "Bavá Batrá 99a".
const DAF_RE =
  /\b(?:Talmud\s+)?([A-Za-zÀ-ÿ'’]+(?:\s+[A-Za-zÀ-ÿ'’]+){0,2})\s+(\d{1,3})\s*([ab])\b/g;

// "Génesis 2:4", "Isaías 40:26", "Reyes I 19:14", "I Kings 19:14".
const VERSE_RE =
  /\b((?:[IVX]{1,3}\s+)?[A-Za-zÀ-ÿ'’]+(?:\s+[A-Za-zÀ-ÿ'’]+){0,2}(?:\s+[IVX]{1,3})?)\s+(\d{1,3}):(\d{1,3})\b/g;

/** Prueba el nombre completo y, si falla, sus sufijos (de más largo a más corto). */
function lookupName<T>(index: Map<string, T>, phrase: string): T | undefined {
  const words = phrase.trim().split(/\s+/);
  for (let start = 0; start < words.length; start++) {
    const candidate = words.slice(start).join(" ");
    const hit = index.get(normMild(candidate)) ?? index.get(norm(candidate));
    if (hit !== undefined) return hit;
  }
  return undefined;
}

/** Citas del Zóhar: veredicto 100% local, sin red. */
function checkZohar(text: string): CitationFinding[] {
  const out: CitationFinding[] = [];
  ZOHAR_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ZOHAR_RE.exec(text)) !== null) {
    const raw = m[0];
    const end = m.index + raw.length;
    const around = text.slice(Math.max(0, m.index - 20), end + 12);
    if (NOT_THE_ZOHAR.test(around)) continue; // Zohar Jadash / Tikunei Zohar: otra numeración

    const phrase = m[1].trim();
    const name =
      ZOHAR_BY_HE.get(phrase) ??
      lookupName(ZOHAR_INDEX, phrase);
    if (!name) {
      out.push({ raw, end, kind: "zohar", verdict: "unknown", detail: `parashá no reconocida: ${phrase}` });
      continue;
    }
    const range = ZOHAR_BY_NAME.get(name);
    if (!range) {
      out.push({ raw, end, kind: "zohar", verdict: "unknown", detail: `sin rango para ${name}` });
      continue;
    }
    const unit = dafToUnit(Number(m[2]), m[3]);
    const inRange = unit >= range.lo - ZOHAR_MARGIN && unit <= range.hi + ZOHAR_MARGIN;
    // La Hakdamá (1a–14b) se imprime a la cabeza de Bereshit y se cita de
    // siempre como "Zóhar Bereshit 1b" — el pasaje de מי ברא אלה, por ejemplo.
    // Tratarla como fuera de rango marcaría una cita canónica: no se hace.
    const inHakdama = name === "Bereshit" && unit <= 27;
    if (inRange || inHakdama) {
      out.push({
        raw,
        end,
        kind: "zohar",
        verdict: "ok",
        detail: `${name} ${unitToLabel(range.lo)}–${unitToLabel(range.hi)}`,
      });
    } else {
      out.push({
        raw,
        end,
        kind: "zohar",
        verdict: "false",
        detail: `${name} va de ${unitToLabel(range.lo)} a ${unitToLabel(range.hi)}`,
      });
    }
  }
  return out;
}

/** Folios del Talmud: veredicto 100% local, con el catálogo. */
function checkTalmud(text: string): CitationFinding[] {
  const out: CitationFinding[] = [];
  DAF_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = DAF_RE.exec(text)) !== null) {
    const raw = m[0];
    if (/\bZ[oó]har\b/i.test(raw)) continue; // ya lo vio checkZohar
    const end = m.index + raw.length;
    const id = lookupName(BOOK_INDEX, m[1]);
    if (!id) continue; // nombre no reconocido → no concluyente, ni se registra
    const book = BOOK_BY_ID.get(id);
    if (!book || book.type !== "talmud") continue;
    if (isOtherWork(text, m.index, raw)) continue; // Yerushalmi y compañía
    const first = book.firstDaf ?? 2;
    const daf = Number(m[2]);
    if (daf >= first && daf <= book.units) {
      out.push({ raw, end, kind: "talmud", verdict: "ok", detail: `${id} ${first}a–${book.units}b` });
    } else {
      out.push({
        raw,
        end,
        kind: "talmud",
        verdict: "false",
        detail: `${id} va de ${first}a a ${book.units}b`,
      });
    }
  }
  return out;
}

// ── Versículos del Tanaj: todo local, con la tabla de /api/shape/Tanakh ────
// Ni el capítulo ni el versículo se preguntan en vivo. Ver el comentario de
// scripts/gen-tablas-fuentes.mjs: la API de Sefaria contesta is_ref:true a
// "Genesis 2:400" (solo valida el capítulo) y consultarla en frío costaba
// 2,5 s sin devolver respuesta, con el endpoint ya en ~36 s.

/** Versículos del capítulo `chapter` (1-based), o `null` si no lo sabemos. */
function versesInChapter(id: string, chapter: number): number | null {
  const chapters = TANAKH_VERSES[id];
  if (!chapters || chapter < 1 || chapter > chapters.length) return null;
  const n = chapters[chapter - 1];
  return Number.isInteger(n) && n > 0 ? n : null;
}


interface VerseCandidate {
  raw: string;
  end: number;
  id: string;
  chapter: number;
  verse: number;
}

function findVerses(text: string): VerseCandidate[] {
  const out: VerseCandidate[] = [];
  VERSE_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = VERSE_RE.exec(text)) !== null) {
    const id = lookupName(BOOK_INDEX, m[1]);
    if (!id) continue;
    const book = BOOK_BY_ID.get(id);
    if (!book || book.type !== "chapters" || book.group !== "Tanakh") continue;
    // "Midrash Rabbah (Bereishit 63:8)" NO es Génesis 63:8.
    if (isOtherWork(text, m.index, m[0])) continue;
    out.push({
      raw: m[0],
      end: m.index + m[0].length,
      id,
      chapter: Number(m[2]),
      verse: Number(m[3]),
    });
  }
  return out;
}

// ── Entrada pública ─────────────────────────────────────────────────────────

export interface CitationReport {
  findings: CitationFinding[];
  /** citas que detectamos y pudimos juzgar (ok + false). */
  checked: number;
  existing: number;
  falsified: number;
  /** detectadas pero no juzgables: obra o libro que no está en las tablas. */
  inconclusive: number;
}

/**
 * Revisa las referencias de un análisis. Es síncrona y sin red: las tres capas
 * (Zóhar, Talmud, Tanaj) se juzgan contra tablas del repo bajadas de Sefaria.
 * No hay modo de fallo que pueda tumbar el botón. Nunca lanza.
 */
export function checkCitations(text: string): CitationReport {
  const findings: CitationFinding[] = [...checkZohar(text), ...checkTalmud(text)];

  for (const v of findVerses(text)) {
    const book = BOOK_BY_ID.get(v.id)!;
    if (v.chapter < 1 || v.chapter > book.units) {
      findings.push({
        raw: v.raw,
        end: v.end,
        kind: "tanakh",
        verdict: "false",
        detail: `${v.id} tiene ${book.units} capítulos`,
      });
      continue;
    }
    const total = versesInChapter(v.id, v.chapter);
    if (total === null) {
      // Libro sin conteo plano en la tabla (estructuras anidadas): no se juzga
      // el versículo, aunque el capítulo ya pasó por el catálogo.
      findings.push({
        raw: v.raw,
        end: v.end,
        kind: "tanakh",
        verdict: "unknown",
        detail: `${v.id}: sin conteo de versículos`,
      });
      continue;
    }
    if (v.verse >= 1 && v.verse <= total) {
      findings.push({
        raw: v.raw,
        end: v.end,
        kind: "tanakh",
        verdict: "ok",
        detail: `${v.id} ${v.chapter} tiene ${total} versículos`,
      });
    } else {
      findings.push({
        raw: v.raw,
        end: v.end,
        kind: "tanakh",
        verdict: "false",
        detail: `${v.id} ${v.chapter} tiene ${total} versículos`,
      });
    }
  }

  return {
    findings,
    checked: findings.filter((f) => f.verdict !== "unknown").length,
    existing: findings.filter((f) => f.verdict === "ok").length,
    falsified: findings.filter((f) => f.verdict === "false").length,
    inconclusive: findings.filter((f) => f.verdict === "unknown").length,
  };
}
