#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GENERADOR DE LA CONCORDANCIA DEL TANAJ
 *  «en todo lugar donde se dice» (כָּל מָקוֹם שֶׁנֶּאֱמַר)
 * ─────────────────────────────────────────────────────────────────────────
 *  Hermano de scripts/gen-tabla-morfologia.mjs: los mismos XML, la misma
 *  licencia, la misma manera de elegir el lema de cada palabra. La diferencia
 *  es lo que se guarda.
 *
 *  La tabla de morfología dice QUÉ lema es cada forma. No dice DÓNDE aparece:
 *  su generador lee los <w> y tira el versículo, a propósito, para no tener
 *  que alinear capítulos entre dos ediciones. Esta tabla guarda justamente
 *  eso: las DIRECCIONES. Para cada lema elegible, libro, capítulo y versículo
 *  de cada una de sus apariciones, en orden del Tanaj.
 *
 *  PARA QUÉ. Cuando el lector abre un pasaje, el estudio puede tomar una
 *  palabra y mostrar en qué otros lugares del Tanaj aparece esa misma
 *  palabra, para iluminar matices del concepto. Es lo que hacen el Midrash,
 *  Rashi y el Zóhar con la fórmula «en todo lugar donde se dice…».
 *
 *  EL NOMBRE ESTÁ VERIFICADO CON ERUDICIÓN y es el único que se usa. Hay una
 *  regla talmúdica de derivación legal que también empareja dos pasajes por
 *  una palabra compartida; aquella exige tradición recibida y deriva halajá, y
 *  esto no deriva nada — ilumina un matiz. Ponerle ese nombre sería un error
 *  de exactitud religiosa, así que no se escribe en ninguna parte del código.
 *
 *  ── EL FILTRADO, y por qué ──────────────────────────────────────────────
 *  Guardar las direcciones de las 301.836 palabras del Tanaj daría un archivo
 *  inmanejable y, peor, inútil. Se filtra dos veces:
 *
 *  1. SOLO PALABRAS DE CONTENIDO. Se mira la letra de parte de la oración que
 *     pone la edición etiquetada: entran nombre (N), verbo (V), adjetivo (A) y
 *     adverbio (D). Quedan fuera partículas, preposiciones, pronombres,
 *     conjunciones y sufijos. Lo decide la gramática de la edición, no una
 *     lista escrita a mano.
 *
 *  2. SOLO LEMAS POCO FRECUENTES — entre PISO y TOPE apariciones. Un lema que
 *     sale novecientas veces no dice nada: «y dijo» está en todas partes y
 *     rastrearlo no ilumina ningún matiz. Uno que sale cuatro veces sí dice:
 *     esas cuatro son el mapa entero de la palabra en el Tanaj.
 *
 *     El PISO es 2 porque con una sola aparición no hay nada que rastrear: el
 *     pasaje abierto sería el único lugar y no habría «otros lugares».
 *
 *     El TOPE es 24, y la razón es de MÉTODO antes que de bytes. La regla de
 *     esta función (ver lib/study/rastroPalabra.ts) es que se entregan TODAS
 *     las apariciones, nunca una selección, para que el motor esté obligado a
 *     dar cuenta del caso que no encaja. Esa obligación es real mientras la
 *     lista se pueda leer y recorrer entera. Pasadas dos docenas de
 *     direcciones, la lista se vuelve un muro que nadie comprueba y la
 *     obligación queda vacía: el motor escoge tres y el rastreo vuelve a ser
 *     propaganda por otra vía. Así que el tope es el punto donde un barrido
 *     completo sigue siendo un barrido y no un listado. Veinticuatro también
 *     deja el archivo en unos cientos de kB —el orden de magnitud de la tabla
 *     de morfología, que pesa 2,6 MB— y no en varios megas.
 *
 *     Este número se puede y se debe revisar CON LOS DATOS DELANTE: al correr,
 *     el script imprime el histograma de frecuencias y el peso del archivo que
 *     acaba de escribir. Si resulta que el tramo 11-24 pesa de más o de menos,
 *     se cambia TOPE aquí arriba y se vuelve a correr. Lo que NO se cambia es
 *     la regla de la lista completa: el tope decide qué lemas entran, nunca
 *     cuántas apariciones se muestran de un lema que ya entró.
 *
 *  ── LAS DIRECCIONES TIENEN QUE EXISTIR EN SEFARIA ───────────────────────
 *  Los XML traen la numeración del Códice de Leningrado y el sitio enlaza a
 *  Sefaria. En el Tanaj hebreo las dos numeraciones son la judía y coinciden
 *  (Joel con cuatro capítulos, Malají con tres, los encabezados de los Salmos
 *  contados como versículo), pero «coinciden» no es «se comprobó». Así que se
 *  comprueba: cada capítulo se cuadra contra la forma congelada de Sefaria que
 *  ya vive en el repo (lib/sources/tanakhShape.generated.ts). Si un capítulo
 *  no cuadra en número de versículos, ese capítulo queda en cuarentena, y
 *  TODO LEMA que tenga una aparición ahí se descarta entero —no se recorta—,
 *  porque una lista incompleta es peor que ninguna: rompería lo único que esta
 *  función promete. Cuántos lemas se perdieron así se imprime y se escribe en
 *  la cabecera del archivo.
 *
 *  Fuente: Open Scriptures Hebrew Bible (https://github.com/openscriptures/morphhb),
 *  CC BY 4.0, sobre el Códice de Leningrado, que es de dominio público.
 *
 *  Uso:  node scripts/gen-concordancia.mjs <carpeta-con-los-xml>
 *  Los XML se descargan aparte y NO viven en el repo: lo que se commitea es
 *  la tabla destilada.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = process.argv[2];
if (!DIR) {
  console.error("Falta la carpeta con los XML de morphhb.");
  console.error("Uso: node scripts/gen-concordancia.mjs <carpeta>");
  process.exit(1);
}

const SALIDA = new URL("../lib/sources/concordancia.generated.ts", import.meta.url);
const FORMA = new URL("../lib/sources/tanakhShape.generated.ts", import.meta.url);

/** Una palabra entra si aparece estas veces o más. Con una sola no hay rastro. */
const PISO = 2;
/** Y como máximo estas. Ver la explicación larga de la cabecera. */
const TOPE = 24;

/** Partes de la oración con contenido. Lo demás no se rastrea. */
const CONTENIDO = new Set(["N", "V", "A", "D"]);

/**
 * Los 39 libros, del abreviado OSIS que usan los XML al nombre con que los
 * llama Sefaria —que es el que viaja en las referencias del sitio—. El ORDEN
 * es el del Tanaj (Torá · Profetas · Escritos) y es el mismo de LIBROS_TANAJ
 * en lib/sources/tanajRef.ts: las direcciones guardan el índice de esta lista,
 * así que las apariciones salen ya ordenadas como se leen.
 */
const LIBROS = [
  ["Gen", "Genesis"],
  ["Exod", "Exodus"],
  ["Lev", "Leviticus"],
  ["Num", "Numbers"],
  ["Deut", "Deuteronomy"],
  ["Josh", "Joshua"],
  ["Judg", "Judges"],
  ["1Sam", "I Samuel"],
  ["2Sam", "II Samuel"],
  ["1Kgs", "I Kings"],
  ["2Kgs", "II Kings"],
  ["Isa", "Isaiah"],
  ["Jer", "Jeremiah"],
  ["Ezek", "Ezekiel"],
  ["Hos", "Hosea"],
  ["Joel", "Joel"],
  ["Amos", "Amos"],
  ["Obad", "Obadiah"],
  ["Jonah", "Jonah"],
  ["Mic", "Micah"],
  ["Nah", "Nahum"],
  ["Hab", "Habakkuk"],
  ["Zeph", "Zephaniah"],
  ["Hag", "Haggai"],
  ["Zech", "Zechariah"],
  ["Mal", "Malachi"],
  ["Ps", "Psalms"],
  ["Prov", "Proverbs"],
  ["Job", "Job"],
  ["Song", "Song of Songs"],
  ["Ruth", "Ruth"],
  ["Lam", "Lamentations"],
  ["Eccl", "Ecclesiastes"],
  ["Esth", "Esther"],
  ["Dan", "Daniel"],
  ["Ezra", "Ezra"],
  ["Neh", "Nehemiah"],
  ["1Chr", "I Chronicles"],
  ["2Chr", "II Chronicles"],
];
const INDICE_OSIS = new Map(LIBROS.map(([osis], i) => [osis, i]));
const NOMBRE_SEFARIA = LIBROS.map(([, sefaria]) => sefaria);

/**
 * La forma del Tanaj según Sefaria, leída del archivo congelado del repo.
 *
 * Se lee con una expresión regular y no importando el módulo: es TypeScript y
 * aquí no hace falta un cargador para leer una lista de números.
 */
function formaDeSefaria() {
  const texto = readFileSync(fileURLToPath(FORMA), "utf8");
  const mapa = new Map();
  for (const m of texto.matchAll(/"([^"]+)":\s*\[([\d,\s]+)\]/g)) {
    mapa.set(
      m[1],
      m[2]
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => Number.isFinite(n))
    );
  }
  return mapa;
}

const W = /<w\b([^>]*)>([\s\S]*?)<\/w>/g;
const VERSO = /<verse\b[^>]*osisID="([^"]+)"/g;
/** Un <verse> o un <w>, en el orden en que vienen: así cada palabra sabe dónde está. */
const PASO = new RegExp(`${VERSO.source}|${W.source}`, "g");
const ATTR = /(\w+)="([^"]*)"/g;

function atributos(cadena) {
  const a = {};
  for (const m of cadena.matchAll(ATTR)) a[m[1]] = m[2];
  return a;
}

/**
 * El lema de contenido de una palabra etiquetada: la misma elección, letra por
 * letra, que hace scripts/gen-tabla-morfologia.mjs.
 *
 * Tiene que ser LA MISMA. La clave que se guarda aquí («V559») es la que el
 * módulo de consulta lee de la tabla de morfología; si las dos elecciones se
 * separan, el rastro no encuentra nunca su lema y la función queda muda sin
 * dar un solo error. Por eso este bloque se copia y no se «mejora».
 */
function lemaDeContenido(a) {
  if (!a.lemma || !a.morph?.startsWith("H")) return null;
  const lemas = a.lemma.split("/");
  const morfos = a.morph.slice(1).split("/");
  let elegido = null;
  const n = Math.min(lemas.length, morfos.length);
  for (let i = 0; i < n; i++) {
    const pos = morfos[i].slice(0, 1);
    if (CONTENIDO.has(pos)) elegido = { pos, num: lemas[i].replace(/\D+$/, ""), morf: morfos[i] };
  }
  if (!elegido) return null; // aquí sí se descarta: solo se rastrea contenido
  if (!elegido.num) return null;
  return elegido;
}

// ── Leer los XML ─────────────────────────────────────────────────────────
const formaSefaria = formaDeSefaria();
const apariciones = new Map(); // "V559" → [ [libroIdx, cap, vers], … ]
const nombresPropios = new Set(); // lemas marcados Np por la edición
const versosPorCapitulo = new Map(); // "0.1" → mayor versículo visto
let palabras = 0;
let libros = 0;
const sinMapear = [];

for (const archivo of readdirSync(DIR).sort()) {
  if (!archivo.endsWith(".xml")) continue;
  const osis = archivo.slice(0, -4);
  const libroIdx = INDICE_OSIS.get(osis);
  if (libroIdx === undefined) {
    if (osis !== "VerseMap") sinMapear.push(archivo);
    continue;
  }
  libros++;
  const texto = readFileSync(join(DIR, archivo), "utf8");
  let cap = 0;
  let vers = 0;

  for (const m of texto.matchAll(PASO)) {
    // ¿Es un <verse>? Entonces cambia la dirección de las palabras que siguen.
    if (m[1] !== undefined) {
      const partes = m[1].split(".");
      cap = Number(partes[1]);
      vers = Number(partes[2]);
      if (Number.isFinite(cap) && Number.isFinite(vers)) {
        const clave = `${libroIdx}.${cap}`;
        versosPorCapitulo.set(clave, Math.max(versosPorCapitulo.get(clave) ?? 0, vers));
      }
      continue;
    }
    // Si no, es un <w>: se le pone la dirección del versículo en curso.
    if (!cap || !vers) continue;
    const l = lemaDeContenido(atributos(m[2]));
    if (!l) continue;
    palabras++;
    const clave = `${l.pos}${l.num}`;
    const lista = apariciones.get(clave) ?? [];
    lista.push([libroIdx, cap, vers]);
    apariciones.set(clave, lista);
    if (l.morf.startsWith("Np")) nombresPropios.add(clave);
  }
}

if (sinMapear.length > 0) {
  console.error(`✗ archivos que no sé a qué libro son: ${sinMapear.join(", ")}. No escribo nada.`);
  process.exit(1);
}
if (libros !== 39) {
  console.error(`✗ esperaba 39 libros del Tanaj y encontré ${libros}. No escribo nada.`);
  process.exit(1);
}

// ── Cuadrar la numeración contra Sefaria ─────────────────────────────────
//
// Capítulo por capítulo: ¿tiene Sefaria ese capítulo, y con tantos versículos
// como el Códice? Lo que no cuadra va a cuarentena.
const cuarentena = new Set();
for (const [clave, ultimo] of versosPorCapitulo) {
  const [idx, cap] = clave.split(".").map(Number);
  const cuenta = formaSefaria.get(NOMBRE_SEFARIA[idx]);
  if (!cuenta) {
    cuarentena.add(clave);
    continue;
  }
  const enSefaria = cuenta[cap - 1];
  if (!enSefaria || enSefaria !== ultimo) cuarentena.add(clave);
}
if (cuarentena.size > 0) {
  console.warn(`⚠ ${cuarentena.size} capítulos no cuadran con la forma de Sefaria:`);
  for (const clave of [...cuarentena].slice(0, 20)) {
    const [idx, cap] = clave.split(".").map(Number);
    const cuenta = formaSefaria.get(NOMBRE_SEFARIA[idx]);
    console.warn(
      `   ${NOMBRE_SEFARIA[idx]} ${cap}: ` +
        `Códice ${versosPorCapitulo.get(clave)} versículos · ` +
        `Sefaria ${cuenta?.[cap - 1] ?? "no lo tiene"}`
    );
  }
}

// ── Filtrar y empaquetar ─────────────────────────────────────────────────
const histograma = { 1: 0, 2: 0, 3: 0, "4-10": 0, "11-24": 0, "25-40": 0, "41+": 0 };
const tramo = (n) =>
  n === 1 ? 1 : n === 2 ? 2 : n === 3 ? 3 : n <= 10 ? "4-10" : n <= 24 ? "11-24" : n <= 40 ? "25-40" : "41+";

const filas = [];
let direcciones = 0;
let perdidosPorCuarentena = 0;
const propiosQueEntran = [];

for (const [clave, lista] of [...apariciones.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  histograma[tramo(lista.length)]++;
  if (lista.length < PISO || lista.length > TOPE) continue;

  // La lista entera o nada: si una sola aparición cae en un capítulo que no
  // cuadra con Sefaria, el lema se descarta completo. Recortarlo rompería la
  // promesa de la función, que es entregar TODAS las apariciones.
  if (lista.some(([i, c]) => cuarentena.has(`${i}.${c}`))) {
    perdidosPorCuarentena++;
    continue;
  }

  // Ordenar como se lee —libro, capítulo, versículo— y quitar repetidas: si la
  // palabra sale dos veces en el mismo versículo, la DIRECCIÓN es una sola.
  const ordenadas = lista
    .slice()
    .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2])
    .map(([i, c, v]) => `${i}.${c}.${v}`);
  const únicas = [...new Set(ordenadas)];

  direcciones += únicas.length;
  filas.push(`  ${JSON.stringify(clave)}: ${JSON.stringify(únicas.join(" "))},`);
  if (nombresPropios.has(clave)) propiosQueEntran.push(clave);
}

if (filas.length < 1000) {
  console.error(`✗ solo ${filas.length} lemas elegibles: el dato llegó incompleto. No escribo nada.`);
  process.exit(1);
}

const hoy = new Date().toISOString().slice(0, 10);
const listaPropios = propiosQueEntran
  .sort()
  .map((c) => `  ${JSON.stringify(c)},`)
  .join("\n");

writeFileSync(
  fileURLToPath(SALIDA),
  `// AUTO-GENERADO por scripts/gen-concordancia.mjs. No editar a mano.
//
// Fuente: Open Scriptures Hebrew Bible, CC BY 4.0
// (https://github.com/openscriptures/morphhb), sobre el Códice de Leningrado,
// que es de dominio público. Destilado el ${hoy}.
//
// LAS DIRECCIONES de cada palabra poco frecuente del Tanaj: para qué sirve
// esto, ver lib/study/rastroPalabra.ts. La tabla de morfología dice qué lema
// es cada forma; esta dice DÓNDE aparece ese lema, para poder mostrarle al
// lector en qué otros lugares del Tanaj se dice la misma palabra.
//
// Entran solo palabras de CONTENIDO (nombre, verbo, adjetivo, adverbio) y solo
// lemas POCO FRECUENTES: de ${PISO} a ${TOPE} apariciones. Con una sola aparición no
// hay otros lugares que mostrar; pasadas ${TOPE}, la lista completa deja de poder
// leerse entera y la regla de «todas las apariciones, nunca una selección»
// quedaría vacía.
//
// ${palabras.toLocaleString("es")} palabras de contenido etiquetadas · ${filas.length.toLocaleString("es")} lemas elegibles ·
// ${direcciones.toLocaleString("es")} direcciones.
// Frecuencias de TODOS los lemas de contenido: 1 → ${histograma[1].toLocaleString("es")} · 2 → ${histograma[2].toLocaleString("es")} ·
// 3 → ${histograma[3].toLocaleString("es")} · 4-10 → ${histograma["4-10"].toLocaleString("es")} · 11-24 → ${histograma["11-24"].toLocaleString("es")} ·
// 25-40 → ${histograma["25-40"].toLocaleString("es")} · 41 o más → ${histograma["41+"].toLocaleString("es")}.
// ${perdidosPorCuarentena.toLocaleString("es")} lemas descartados ENTEROS por tener alguna aparición en un capítulo
// cuya numeración no cuadra con la de Sefaria (${cuarentena.size} capítulos en cuarentena):
// se descartan completos a propósito, porque media lista sería peor que nada.

/** El tope de apariciones que se guardó. Un lema más frecuente no está aquí. */
export const TOPE_APARICIONES = ${TOPE};

/** Y el piso: con una sola aparición no hay nada que rastrear. */
export const PISO_APARICIONES = ${PISO};

/**
 * Los 39 libros en orden del Tanaj, con el nombre que usa Sefaria. El índice
 * de esta lista es el primer número de cada dirección.
 */
export const LIBROS_CONCORDANCIA: readonly string[] = [
${NOMBRE_SEFARIA.map((n) => `  ${JSON.stringify(n)},`).join("\n")}
];

/**
 * Lema → sus apariciones, separadas por espacios, cada una «libro.capítulo.versículo»
 * con el libro como índice de LIBROS_CONCORDANCIA. En orden de lectura.
 *
 * Están TODAS las apariciones del lema en el Tanaj. Si un lema está aquí, su
 * lista es completa; si no se pudo guardar completa, el lema no está.
 */
export const APARICIONES: Record<string, string> = {
${filas.join("\n")}
};

/**
 * Los lemas que la edición etiqueta como NOMBRE PROPIO (Np). Sirve para no
 * llenar el rastro de nombres de genealogías cuando en el mismo pasaje hay un
 * sustantivo o un verbo raro, que es lo que de verdad ilumina un concepto.
 * No se excluyen: rastrear un nombre es legítimo —el Midrash lo hace—, solo
 * van después.
 */
export const LEMAS_NOMBRE_PROPIO: ReadonlySet<string> = new Set([
${listaPropios}
]);
`,
  "utf8"
);

const kb = (statSync(fileURLToPath(SALIDA)).size / 1024).toFixed(0);
console.log(`✓ ${libros} libros · ${palabras.toLocaleString("es")} palabras de contenido`);
console.log(`✓ ${filas.length.toLocaleString("es")} lemas elegibles (${PISO}-${TOPE} apariciones) · ${direcciones.toLocaleString("es")} direcciones`);
console.log(`✓ frecuencias de todos los lemas de contenido:`);
for (const [k, v] of Object.entries(histograma)) console.log(`   ${k.padStart(5)} → ${v.toLocaleString("es")} lemas`);
if (perdidosPorCuarentena > 0) {
  console.log(`⚠ ${perdidosPorCuarentena.toLocaleString("es")} lemas descartados enteros por numeración en cuarentena`);
}
console.log(`✓ escrito en lib/sources/concordancia.generated.ts · ${kb} kB`);
console.log(`   si el peso o el histograma piden otro tope, se cambia TOPE arriba y se vuelve a correr.`);
