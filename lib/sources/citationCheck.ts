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
//  · Tanaj libro cap:ver → tabla local de versículos por capítulo
//    (tanakhShape.generated.ts). Tampoco se pregunta: /api/name contesta
//    is_ref:true a "Genesis 2:400" porque solo valida el capítulo.
//  · Midrash obra cap:sección → tabla local (midrashShape.generated.ts), con
//    los capítulos y secciones reales de cada obra midráshica.
// Cualquier otra fuente (Etz Jaim, Sha'ar HaGilgulim, Tikunei Zohar…) queda
// como no concluyente: no tenemos con qué juzgarla.

import { CATALOG } from "@/lib/sources/catalog.generated";
import { BOOK_NAMES } from "@/lib/sources/bookNames";
import { ZOHAR_DAFIM } from "@/lib/sources/zoharDafim.generated";
import { TANAKH_VERSES } from "@/lib/sources/tanakhShape.generated";
import { MIDRASH_WORKS, type MidrashWork, type MidrashPart } from "@/lib/sources/midrashShape.generated";

export type Verdict = "ok" | "false" | "unknown";

export interface CitationFinding {
  /** el texto de la cita tal como el motor la escribió. */
  raw: string;
  /** posición en la prosa donde termina la cita (para marcar justo después). */
  end: number;
  kind: "zohar" | "talmud" | "tanakh" | "midrash";
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

// ── Midrash: obra + capítulo:sección contra la tabla local ─────────────────
// El Midrash es la fuente que el motor cita más después del Tanaj, y la más
// fácil de fabricar: nadie recuerda cuántos capítulos tiene Bereshit Rabá
// (cien) ni cuántas secciones el capítulo 12 (dieciséis). Se juzga igual que el
// Zóhar: contra una tabla del repo bajada de /api/shape, no preguntando a
// Sefaria (midrashShape.generated.ts).
//
// Cómo se identifica la obra. La cita se parte en palabras, cada palabra se
// reduce a su esqueleto consonántico y se compara el CONJUNTO resultante con
// el de cada obra. Al ser conjuntos, el orden deja de importar: "Bereshit
// Rabá", "Midrash Rabá Bereshit" y "Midrash Bereshit Rabá" son la misma obra
// sin tener que enumerar las variantes. Palabras de relleno ("midrash", "de",
// "parashat", "masejta") no estorban, pero tampoco bastan: una obra solo se
// reconoce si están TODAS sus palabras distintivas. Por eso "Tehilim 23:4"
// (que es el salmo, no el midrash) no se juzga nunca: le falta "Midrash".
//
// Y se calla en cuanto hay la menor duda: obra que no está en la tabla, obra
// ambigua, parashá que no se reconoce, tramo que Sefaria tiene vacío (un 0 en
// la tabla no dice "no existe", dice "no lo tenemos"), o cualquier palabra
// sobrante en la cita que no sepamos de qué es.
//
// QUÉ OBRAS SE JUZGAN Y QUÉ OBRAS NO — dictamen del Sofer (2026-11-13), que
// las comprobó una por una contra Sefaria. Dentro: las cinco Rabot del
// Pentateuco, las cinco Megilot Rabot (con su Petijtá donde la hay), Tanjumá
// y Tanjumá Buber (solo el simán), Mejiltá de R. Yishmael (solo masejta +
// número de parashá), Pirkei de R. Eliezer, Pesikta de Rav Kahaná, Sifrí de
// Bamidbar y de Devarim; y, solo en su primer número, Pesikta Rabatí, Midrash
// Tehilim, Midrash Mishlei y Tanna deBei Eliyahu. Fuera a propósito:
//  · Yalkut Shimoní — se cita por "remez", Sefaria solo tiene el de la Torá
//    (966 remazim) y la forma "Yalkut, Bereshit 16" es un tercer esquema:
//    tres notaciones incompatibles sobre datos incompletos.
//  · Sifrá — Sefaria la parte en 278 nodos con DOS numeraciones intercaladas;
//    la cita tradicional ("Sifrá, Kedoshim 4:12") no mapea sin un diccionario
//    perek↔parashá hecho a mano.
//  · Avot de Rabí Natán — dos versiones (Nusaj A, 41 caps.; Nusaj B, 48) con
//    numeración distinta, y la cita española casi nunca dice cuál.
//  · Bereshit Rabatí — obra distinta de Bereshit Rabá (R. Moshé HaDarshán).
// En todas ellas el verificador no opina, que es la única respuesta honesta.
//
// (Dos advertencias del Sofer que aquí no aplican porque NO preguntamos a
// Sefaria en vivo, pero que explican por qué no se debe preguntar: un 200 de
// /api/texts no prueba nada —"Kohelet Rabbah, Petichta 59" devuelve 200
// resolviendo en silencio al libro entero— y hay obras con texto hebreo pero
// sin traducción inglesa, que una consulta en inglés daría por inexistentes.)

// Margen de tolerancia en SECCIONES, y SOLO para la sección de las obras con
// capítulos. Las ediciones no cortan los simanim igual (Vilna,
// Theodor-Albeck): medido, Sefaria cuenta 16 secciones en Bereshit Rabá 12 y
// probando ref por ref aparece la 17. Un margen de una sección cubre esa
// diferencia sin dejar escapar nada: las secciones inventadas que hemos visto
// no caen a una de la última real, caen muy lejos ("12:25", "1:40").
//
// Las otras dos escalas NO llevan margen porque no lo necesitan:
//  · el simán de las obras por parashá se compara contra el largo DECLARADO
//    por Sefaria, que ya es generoso (incluye las colas sin texto: Tanjumá
//    Ki Tavó declara 8 simanim y solo tiene texto hasta el 4, así que la cita
//    impresa "Ki Tavó 5" pasa sin que haya que inventar margen);
//  · los proemios de la Petijtá se midieron uno a uno (Eikhá 34, Ester 12,
//    Rut 7) y son un rango cerrado.
const MIDRASH_MARGIN = 1;

/**
 * Palabra reducida a su esqueleto, PERO nunca a una sola letra. "Eikhah" se
 * queda en "j" con el esqueleto duro, y una clave de una letra es una trampa:
 * "hoja" también da "j", así que "el midrash de la hoja 12" se leería como
 * Eikhá Rabá 12 y se tacharía. Cuando el esqueleto queda en nada, se usa la
 * forma suave (sin acentos) y las grafías se cubren con los alias.
 */
function tok(w: string): string {
  const hard = norm(w);
  return hard.length >= 2 ? hard : normMild(w);
}

/** Palabras que pueden acompañar a una cita sin cambiar de obra. */
const MIDRASH_FILLER = new Set(
  [
    "midrash", "midrax", "sefer", "libro", "parasha", "parashat", "parashah",
    "tractate", "masejta", "masechta", "masekhta", "de", "del", "la", "el",
    "los", "las", "y", "en", "ed", "edicion",
  ].map(tok)
);

/**
 * Nombres por los que el motor puede llamar a cada obra, además del título de
 * Sefaria y del hebreo (que se añaden solos). Cada entrada aporta un conjunto
 * de palabras distintivas: hace falta que aparezcan TODAS para dar la obra por
 * identificada. Verificados con el Sofer.
 */
const MIDRASH_ALIASES: [string, string][] = [
  // Las cinco Rabot del Pentateuco.
  ["Bereshit Rabá", "Bereshit Rabbah"],
  ["Génesis Rabá", "Bereshit Rabbah"],
  ["Shemot Rabá", "Shemot Rabbah"],
  ["Éxodo Rabá", "Shemot Rabbah"],
  ["Vayikrá Rabá", "Vayikra Rabbah"],
  ["Vaikrá Rabá", "Vayikra Rabbah"],
  ["Levítico Rabá", "Vayikra Rabbah"],
  ["Bamidbar Rabá", "Bamidbar Rabbah"],
  ["Bemidbar Rabá", "Bamidbar Rabbah"],
  ["Números Rabá", "Bamidbar Rabbah"],
  ["Devarim Rabá", "Devarim Rabbah"],
  ["Deuteronomio Rabá", "Devarim Rabbah"],
  // Las Megilot. Eikhá se escribe de cinco maneras y su esqueleto duro no
  // distingue nada, así que cada grafía entra por su nombre.
  ["Shir HaShirim Rabá", "Shir HaShirim Rabbah"],
  ["Cantares Rabá", "Shir HaShirim Rabbah"],
  ["Cantar de los Cantares Rabá", "Shir HaShirim Rabbah"],
  ["Midrash Jazita", "Shir HaShirim Rabbah"],
  ["Midrash Chazita", "Shir HaShirim Rabbah"],
  ["Rut Rabá", "Ruth Rabbah"],
  ["Eijá Rabá", "Eikhah Rabbah"],
  ["Eija Rabá", "Eikhah Rabbah"],
  ["Ejá Rabá", "Eikhah Rabbah"],
  ["Eikhá Rabá", "Eikhah Rabbah"],
  ["Eicha Rabá", "Eikhah Rabbah"],
  ["Eijá Rabatí", "Eikhah Rabbah"],
  ["Eikhá Rabatí", "Eikhah Rabbah"],
  ["Lamentaciones Rabá", "Eikhah Rabbah"],
  ["Kohelet Rabá", "Kohelet Rabbah"],
  ["Kohélet Rabá", "Kohelet Rabbah"],
  ["Eclesiastés Rabá", "Kohelet Rabbah"],
  ["Ester Rabá", "Esther Rabbah"],
  // Tanjumá: el estándar y el de Buber son obras DISTINTAS con numeración
  // distinta; nunca se cruza un número de una con la otra.
  ["Tanjumá", "Midrash Tanchuma"],
  ["Tanjuma", "Midrash Tanchuma"],
  ["Tanjumá Yelamdenu", "Midrash Tanchuma"],
  ["Tanjumá Buber", "Midrash Tanchuma Buber"],
  ["Tanchuma Buber", "Midrash Tanchuma Buber"],
  // Mejiltá: solo la de Rabí Yishmael y solo masejta + número de parashá.
  ["Mejilta", "Mekhilta DeRabbi Yishmael"],
  ["Mejiltá de Rabí Ishmael", "Mekhilta DeRabbi Yishmael"],
  ["Mejiltá de Rabí Yishmael", "Mekhilta DeRabbi Yishmael"],
  // Sifrí: la numeración de Bamidbar (1–161) y la de Devarim (1–357) son
  // independientes, así que "Sifrí 50" sin libro no se juzga nunca.
  ["Sifrí Bamidbar", "Sifrei Bamidbar"],
  ["Sifré Bamidbar", "Sifrei Bamidbar"],
  ["Sifrí Números", "Sifrei Bamidbar"],
  ["Sifrí Devarim", "Sifrei Devarim"],
  ["Sifré Devarim", "Sifrei Devarim"],
  ["Sifrí Deuteronomio", "Sifrei Devarim"],
  // Pirkei de Rabí Eliezer: SOLO con el nombre completo. "Pirkei" a secas son
  // seis obras distintas (Avot, de Rabí Natán, Shirá, Heijalot…).
  ["Pirkei de Rabí Eliezer", "Pirkei DeRabbi Eliezer"],
  ["Pirkei deRabí Eliezer", "Pirkei DeRabbi Eliezer"],
  ["Pesikta de Rav Kahaná", "Pesikta DeRav Kahana"],
  ["Pesiktá de Rav Kahaná", "Pesikta DeRav Kahana"],
  ["Pesikta Rabati", "Pesikta Rabbati"],
  ["Pesiktá Rabatí", "Pesikta Rabbati"],
  ["Midrash Tehilim", "Midrash Tehillim"],
  ["Midrash Salmos", "Midrash Tehillim"],
  ["Shojer Tov", "Midrash Tehillim"],
  ["Shocher Tov", "Midrash Tehillim"],
  ["Midrash Proverbios", "Midrash Mishlei"],
  ["Tana de Bei Eliahu Rabá", "Tanna DeBei Eliyahu Rabbah"],
  ["Tana deBei Eliyahu Rabá", "Tanna DeBei Eliyahu Rabbah"],
];

/** La Petijtá (los proemios) se cita por su propio número. */
const PETICHTA_WORDS = new Set(
  ["petijta", "petichta", "petihta", "proemio", "פתיחתא"].map((w) =>
    /[\u05D0-\u05EA]/.test(w) ? `he:${w}` : tok(w)
  )
);

/** Palabras hebreas de una cita, sin niqud ni signos. */
function hebrewWords(s: string): string[] {
  return s
    .normalize("NFD")
    .replace(/[֑-ׇ]/g, "")
    .split(/[^א-ת]+/)
    .filter(Boolean);
}

/** Conjunto de palabras distintivas de una frase (hebreas y latinas). */
function tokenSet(phrase: string): Set<string> {
  const out = new Set<string>();
  for (const w of hebrewWords(phrase)) out.add(`he:${w}`);
  for (const w of phrase.split(/[^A-Za-zÀ-ÿ'’]+/)) {
    if (!w) continue;
    const t = tok(w);
    if (t) out.add(t);
  }
  return out;
}

/** ¿Están en `tokens` todas las palabras de `core`? */
function covers(tokens: Set<string>, core: Set<string>): boolean {
  for (const t of core) if (!tokens.has(t)) return false;
  return true;
}

/** Lo que sobra de `tokens` tras quitar `core` y el relleno. */
function leftover(tokens: Set<string>, core: Set<string>): string[] {
  const out: string[] = [];
  for (const t of tokens) {
    if (core.has(t) || MIDRASH_FILLER.has(t)) continue;
    out.push(t);
  }
  return out;
}

interface MidrashCore {
  work: string;
  core: Set<string>;
}

/**
 * Índice de nombres → obra. Un conjunto de palabras que valga para DOS obras
 * distintas se descarta: preferimos no poder identificarla antes que juzgar la
 * obra equivocada.
 */
const MIDRASH_CORES: MidrashCore[] = (() => {
  const byKey = new Map<string, { work: string; core: Set<string> } | null>();
  const add = (work: string, phrase: string) => {
    const needed = new Set([...tokenSet(phrase)].filter((t) => !MIDRASH_FILLER.has(t)));
    // "Midrash" es relleno en general, pero cuando el nombre de la obra ES un
    // libro del Tanaj la palabra se vuelve obligatoria: así "Tehilim 23:4" (el
    // salmo) nunca se juzga como si fuera Midrash Tehilim.
    if (/midrash/i.test(phrase)) needed.add(tok("midrash"));
    if (needed.size === 0) return;
    const key = [...needed].sort().join("|");
    const prev = byKey.get(key);
    if (prev === undefined) byKey.set(key, { work, core: needed });
    else if (prev && prev.work !== work) byKey.set(key, null); // ambiguo: fuera
  };
  for (const w of MIDRASH_WORKS) {
    add(w.name, w.name);
    if (w.he) add(w.name, w.he);
  }
  for (const [alias, work] of MIDRASH_ALIASES) add(work, alias);
  const out: MidrashCore[] = [];
  for (const v of byKey.values()) if (v) out.push({ work: v.work, core: v.core });
  // De más palabras a menos: "Tanjumá Buber" debe ganarle a "Tanjumá".
  return out.sort((a, b) => b.core.size - a.core.size);
})();

const MIDRASH_BY_NAME = new Map(MIDRASH_WORKS.map((w) => [w.name, w]));

/** Partes (parashiot/masajtot) de una obra, por conjunto de palabras. */
const MIDRASH_PART_CORES = new Map<string, { part: MidrashPart; core: Set<string> }[]>();
for (const w of MIDRASH_WORKS) {
  if (w.shape !== "parts" || !w.parts) continue;
  const byKey = new Map<string, { part: MidrashPart; core: Set<string> } | null>();
  for (const p of w.parts) {
    for (const phrase of [p.name, p.he]) {
      if (!phrase) continue;
      const core = new Set([...tokenSet(phrase)].filter((t) => !MIDRASH_FILLER.has(t)));
      if (core.size === 0) continue;
      const key = [...core].sort().join("|");
      const prev = byKey.get(key);
      if (prev === undefined) byKey.set(key, { part: p, core });
      else if (prev && prev.part.name !== p.name) byKey.set(key, null); // ambigua: fuera
    }
  }
  const list: { part: MidrashPart; core: Set<string> }[] = [];
  for (const v of byKey.values()) if (v) list.push(v);
  MIDRASH_PART_CORES.set(w.name, list.sort((a, b) => b.core.size - a.core.size));
}

interface MidrashHit {
  work: MidrashWork;
  part?: MidrashPart;
  /** la cita apunta a la Petijtá (proemios), no a los capítulos. */
  petichta?: boolean;
}

/** Resuelve la frase que precede a los números. `null` = no sabemos qué obra es. */
function resolveMidrash(phrase: string): MidrashHit | null {
  const tokens = tokenSet(phrase);
  for (const { work, core } of MIDRASH_CORES) {
    if (!covers(tokens, core)) continue;
    const rest = leftover(tokens, core);
    const w = MIDRASH_BY_NAME.get(work);
    if (!w) return null;
    if (w.shape !== "parts") {
      // "Eikhá Rabá, Petijtá 24": el número es un proemio, no un capítulo.
      if (rest.length === 1 && PETICHTA_WORDS.has(rest[0])) {
        return w.petichta ? { work: w, petichta: true } : null;
      }
      // Palabra sobrante que no sabemos de qué es: no se juzga.
      return rest.length === 0 ? { work: w } : null;
    }
    if (rest.length === 0) return null; // "Tanjumá 7" sin parashá: no se puede juzgar
    const parts = MIDRASH_PART_CORES.get(w.name) ?? [];
    const restSet = new Set(rest);
    for (const { part, core: pc } of parts) {
      if (!covers(restSet, pc)) continue;
      const extra = [...restSet].filter((t) => !pc.has(t));
      return extra.length === 0 ? { work: w, part } : null;
    }
    return null; // parashá no reconocida
  }
  return null;
}

// "Bereshit Rabá 12:6", "Midrash Rabá Bereshit 12:6", "Tanjumá, Lej Lejá 7",
// "בראשית רבה 12:6". Hasta 5 palabras de nombre antes del número; el rango
// final ("12:6-7") se admite y no se juzga.
const MIDRASH_RE =
  /((?:[A-Za-zÀ-ÿ'’]+|[א-ת֑-ׇ]+)(?:[\s,()]+(?:[A-Za-zÀ-ÿ'’]+|[א-ת֑-ׇ]+)){0,4})[\s,()]+(\d{1,3})(?::(\d{1,3}))?(?:\s*[-–]\s*\d{1,3}(?::\d{1,3})?)?\b/g;

function checkMidrash(text: string): CitationFinding[] {
  const out: CitationFinding[] = [];
  MIDRASH_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MIDRASH_RE.exec(text)) !== null) {
    const raw = m[0];
    const end = m.index + raw.length;
    // Del nombre se prueba primero la frase completa y luego sus sufijos: la
    // prosa que viene antes ("como enseña Rabí Yehudá en Bereshit Rabá 12:6")
    // no debe impedir reconocer la obra.
    const words = m[1].trim().split(/[\s,()]+/).filter(Boolean);
    let hit: MidrashHit | null = null;
    for (let start = 0; start < words.length && !hit; start++) {
      hit = resolveMidrash(words.slice(start).join(" "));
    }
    if (!hit) continue; // obra desconocida: no se registra ni se juzga

    const { work, part } = hit;
    const first = Number(m[2]);
    const second = m[3] ? Number(m[3]) : null;

    // Petijtá: proemios numerados aparte de los capítulos.
    if (hit.petichta) {
      const total = work.petichta ?? 0;
      if (second !== null || total === 0) continue; // notación que no sabemos leer
      out.push({
        raw, end, kind: "midrash",
        verdict: first >= 1 && first <= total ? "ok" : "false",
        detail: `${work.name}: la Petijtá tiene ${total} proemios`,
      });
      continue;
    }

    // Obra dividida por parashá: el número es el simán dentro de ella.
    if (work.shape === "parts") {
      if (!part || second !== null) continue; // notación que no sabemos leer
      if (first >= 1 && first <= part.len) {
        out.push({
          raw, end, kind: "midrash", verdict: "ok",
          detail: `${work.name}, ${part.name}: ${part.len} secciones`,
        });
      } else {
        out.push({
          raw, end, kind: "midrash", verdict: "false",
          detail: `${work.name}, ${part.name} tiene ${part.len} secciones`,
        });
      }
      continue;
    }

    const sections = work.sections ?? [];
    if (sections.length === 0) continue;
    if (first < 1 || first > sections.length) {
      out.push({
        raw, end, kind: "midrash", verdict: "false",
        detail: `${work.name} tiene ${sections.length} capítulos`,
      });
      continue;
    }
    // Capítulo que la tabla trae vacío: la obra lo declara pero Sefaria no
    // tiene el texto. No dice "no existe", dice "no lo tenemos": se calla.
    if (!sections[first - 1]) {
      out.push({
        raw, end, kind: "midrash", verdict: "unknown",
        detail: `${work.name} ${first}: Sefaria no tiene este tramo`,
      });
      continue;
    }
    if (second === null) {
      out.push({
        raw, end, kind: "midrash", verdict: "ok",
        detail: `${work.name}: ${sections.length} capítulos`,
      });
      continue;
    }
    // Obra que Sefaria no segmenta de verdad: el capítulo ya pasó, pero sobre
    // la sección se calla (ver `sub` en midrashShape.generated.ts).
    if (work.sub === false) {
      out.push({
        raw, end, kind: "midrash", verdict: "unknown",
        detail: `${work.name}: la sección no se puede juzgar en esta obra`,
      });
      continue;
    }
    const inner = sections[first - 1];
    if (second >= 1 && second <= inner + MIDRASH_MARGIN) {
      out.push({
        raw, end, kind: "midrash", verdict: "ok",
        detail: `${work.name} ${first} tiene ${inner} secciones`,
      });
    } else {
      out.push({
        raw, end, kind: "midrash", verdict: "false",
        detail: `${work.name} ${first} tiene ${inner} secciones`,
      });
    }
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
  const findings: CitationFinding[] = [
    ...checkZohar(text),
    ...checkTalmud(text),
    ...checkMidrash(text),
  ];

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
