#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GENERADOR DE LA TABLA DE LEMAS DEL TANAJ
 * ─────────────────────────────────────────────────────────────────────────
 *  Destila la Open Scriptures Hebrew Bible —la Biblia hebrea etiquetada
 *  palabra por palabra sobre el Códice de Leningrado— en una tabla congelada
 *  dentro del repo, para poder contar las palabras de un capítulo POR SU
 *  LEMA y no por su forma: que וַיֹּאמֶר, לֵאמֹר y אָמַר cuenten juntas.
 *
 *  Por qué una tabla y no un analizador: un analizador morfológico adivina, y
 *  en este proyecto el código no adivina. Aquí no se analiza nada — se lee lo
 *  que unos filólogos ya etiquetaron, igual que las tablas del Zóhar y del
 *  Midrash. Si el dato no está, no se agrupa.
 *
 *  LO QUE SE GUARDA, y por qué tan poco:
 *  · forma consonántica → lema (número de Strong) + parte de la oración.
 *  No se guarda el texto, que ya lo da Sefaria, ni la posición de cada
 *  palabra. Eso evita de raíz el problema de alinear capítulos y versículos
 *  entre dos ediciones (Joel y Malají se dividen distinto según la tradición):
 *  una tabla de formas se consulta palabra por palabra y no depende de que
 *  dos ediciones numeren igual.
 *
 *  LAS FORMAS AMBIGUAS NO ENTRAN. Un 10% de las formas reciben más de un lema
 *  en la propia edición (la misma grafía es dos palabras distintas en dos
 *  sitios). Como aquí no se sabe cuál de los dos es el de ESTE capítulo, no se
 *  agrupan: se cuentan como forma suelta, que es lo que ya se hacía. Preferimos
 *  no agrupar a agrupar mal.
 *
 *  Fuente: Open Scriptures Hebrew Bible (https://github.com/openscriptures/morphhb),
 *  CC BY 4.0, sobre el Códice de Leningrado, que es de dominio público.
 *
 *  Uso:  node scripts/gen-tabla-morfologia.mjs <carpeta-con-los-xml>
 *  Los XML se descargan aparte y NO viven en el repo: lo que se commitea es
 *  la tabla destilada.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const DIR = process.argv[2];
if (!DIR) {
  console.error("Falta la carpeta con los XML de morphhb.");
  console.error("Uso: node scripts/gen-tabla-morfologia.mjs <carpeta>");
  process.exit(1);
}

const SALIDA = new URL("../lib/sources/morfologia.generated.ts", import.meta.url);

/** Partes de la oración con contenido: lo que de verdad dice el capítulo. */
const CONTENIDO = new Set(["N", "V", "A", "D"]);

const W = /<w\b([^>]*)>([\s\S]*?)<\/w>/g;
const ATTR = /(\w+)="([^"]*)"/g;

function sinMarcas(bruto) {
  return bruto
    .replace(/<[^>]*>/g, "")
    .replace(/\//g, "")                    // morphhb marca los prefijos con /
    .replace(/[\u05BE\u2013\u2014-]/g, " ");
}

/** Solo consonantes. Dos palabras distintas pueden compartirla. */
function consonantes(bruto) {
  return sinMarcas(bruto)
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/[^\u05D0-\u05EA]/g, "")
    .trim();
}

/**
 * Consonantes Y VOCALES, sin la cantilación.
 *
 * Esta es la clave buena, y la diferencia es enorme: en consonantes, וירא es a
 * la vez «vio» (ראה) y «temió» (ירא), así que la forma queda ambigua y no hay
 * manera de agruparla. Con vocales, וַיַּרְא y וַיִּירָא son dos formas distintas y
 * cada una lleva su lema. La cantilación se quita porque es melodía y cambia
 * según el sitio: la misma palabra la lleva distinta en dos versículos.
 */
function vocalizada(bruto) {
  return (
    sinMarcas(bruto)
      .replace(/[\u0591-\u05AF\u05BD\u05C0\u05C3\u05C6]/g, "")
      // El qamatz qatán (U+05C7) se iguala al qamatz normal (U+05B8): el texto
      // de Sefaria escribe כׇּל con qamatz qatán donde el Códice de Leningrado
      // pone כָל con qamatz, y sin igualarlos la palabra «todo» —una de las más
      // frecuentes del Tanaj— no se encontraría nunca en la tabla.
      .replace(/\u05C7/g, "\u05B8")
      .replace(/[^\u05B0-\u05EA]/g, "")
      .trim()
  );
}

function atributos(cadena) {
  const a = {};
  for (const m of cadena.matchAll(ATTR)) a[m[1]] = m[2];
  return a;
}

const formas = new Map(); // forma consonántica → Map<"POS lema", veces>
const vocales = new Map(); // forma con vocales → Map<"POS lema", veces>
let palabras = 0;
let libros = 0;

for (const archivo of readdirSync(DIR).sort()) {
  if (!archivo.endsWith(".xml") || basename(archivo) === "VerseMap.xml") continue;
  libros++;
  const texto = readFileSync(join(DIR, archivo), "utf8");
  for (const m of texto.matchAll(W)) {
    const a = atributos(m[1]);
    if (!a.lemma || !a.morph?.startsWith("H")) continue;
    const lemas = a.lemma.split("/");
    const morfos = a.morph.slice(1).split("/");

    // El morfema de CONTENIDO de la palabra: el último que no sea artículo,
    // conjunción ni preposición. «וַיֹּאמֶר» es vav + verbo: nos quedamos con
    // el verbo, que es la palabra. Si todo son partículas, se queda la última.
    let elegido = null;
    const n = Math.min(lemas.length, morfos.length);
    for (let i = 0; i < n; i++) {
      const pos = morfos[i].slice(0, 1);
      if (CONTENIDO.has(pos)) elegido = `${pos} ${lemas[i].replace(/\D+$/, "")}`;
    }
    if (!elegido) {
      const pos = morfos[n - 1]?.slice(0, 1) ?? "?";
      elegido = `${pos} ${lemas[n - 1]?.replace(/\D+$/, "") ?? ""}`;
    }

    const forma = consonantes(m[2]);
    if (forma.length < 2) continue;
    palabras++;
    const cuenta = formas.get(forma) ?? new Map();
    cuenta.set(elegido, (cuenta.get(elegido) ?? 0) + 1);
    formas.set(forma, cuenta);

    const voc = vocalizada(m[2]);
    if (voc) {
      const cv = vocales.get(voc) ?? new Map();
      cv.set(elegido, (cv.get(elegido) ?? 0) + 1);
      vocales.set(voc, cv);
    }
  }
}

// Se parte en dos: las formas con UN solo lema (se pueden agrupar) y las que
// reciben más de uno (no se agrupan, y se dice cuáles son para que el guardián
// pueda comprobar que de verdad no se agrupan).
function parte(mapa) {
  const claras = new Map();
  const ambiguas = [];
  for (const [forma, cuenta] of mapa) {
    if (cuenta.size === 1) {
      const [clave] = [...cuenta.keys()];
      const [pos, lema] = clave.split(" ");
      if (lema) claras.set(forma, `${pos}${lema}`);
    } else {
      ambiguas.push(forma);
    }
  }
  return { claras, ambiguas };
}
const { claras, ambiguas } = parte(formas);
const { claras: clarasVoc, ambiguas: ambiguasVoc } = parte(vocales);

if (libros !== 39) {
  console.error(`✗ esperaba 39 libros del Tanaj y encontré ${libros}. No escribo nada.`);
  process.exit(1);
}
if (claras.size < 25000) {
  console.error(`✗ solo ${claras.size} formas claras: el dato llegó incompleto. No escribo nada.`);
  process.exit(1);
}

const hoy = new Date().toISOString().slice(0, 10);
const filasVoc = [...clarasVoc.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([f, v]) => `  ${JSON.stringify(f)}: ${JSON.stringify(v)},`)
  .join("\n");
const filas = [...claras.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([f, v]) => `  ${JSON.stringify(f)}: ${JSON.stringify(v)},`)
  .join("\n");
const listaAmbiguasVoc = ambiguasVoc
  .sort()
  .map((f) => `  ${JSON.stringify(f)},`)
  .join("\n");
const listaAmbiguas = ambiguas
  .sort()
  .map((f) => `  ${JSON.stringify(f)},`)
  .join("\n");

writeFileSync(
  SALIDA,
  `// AUTO-GENERADO por scripts/gen-tabla-morfologia.mjs. No editar a mano.
//
// Fuente: Open Scriptures Hebrew Bible, CC BY 4.0
// (https://github.com/openscriptures/morphhb), sobre el Códice de Leningrado,
// que es de dominio público. Destilado el ${hoy}.
//
// Para cada forma consonántica del Tanaj, su lema: una letra de parte de la
// oración y el número de Strong. N nombre · V verbo · A adjetivo · D adverbio ·
// T partícula · R preposición · P pronombre · C conjunción · S sufijo.
//
// Sirve para contar las palabras de un capítulo por su LEMA y no por su forma:
// וַיֹּאמֶר, לֵאמֹר y אָמַר comparten el lema V559 y cuentan juntas. Y la letra de
// la parte de la oración permite apartar partículas y preposiciones porque lo
// dice la gramática, no porque estén en una lista escrita a mano.
//
// ${palabras.toLocaleString("es")} palabras etiquetadas.
// Con vocales: ${clarasVoc.size.toLocaleString("es")} formas con un solo lema, ${ambiguasVoc.length.toLocaleString("es")} con varios.
// En consonantes: ${claras.size.toLocaleString("es")} con un solo lema, ${ambiguas.length.toLocaleString("es")} con varios.

/**
 * Forma CON VOCALES (sin cantilación) → parte de la oración + número de Strong.
 *
 * Es la tabla buena: con vocales, וַיַּרְא («vio») y וַיִּירָא («temió») son dos
 * formas distintas y cada una lleva su lema. En consonantes las dos son וירא y
 * no se pueden separar.
 */
export const LEMA_POR_VOCALIZADA: Record<string, string> = {
${filasVoc}
};

/**
 * Forma consonántica → lema. Es el recurso para cuando la vocalización de
 * Sefaria no coincide letra por letra con la del Códice de Leningrado: se
 * pierde precisión, así que solo se usa si la forma NO está en la lista de
 * ambiguas.
 */
export const LEMA_POR_FORMA: Record<string, string> = {
${filas}
};

// Formas a las que la propia edición da MÁS DE UN lema: la misma grafía es dos
// palabras distintas según el pasaje. Como aquí no se sabe cuál es la de este
// capítulo, NO se agrupan — se cuentan como forma suelta. Preferimos no
// agrupar a agrupar mal.
export const FORMAS_AMBIGUAS: ReadonlySet<string> = new Set([
${listaAmbiguas}
]);

/** Lo mismo para las formas con vocales: dos lemas, no se agrupan. */
export const VOCALIZADAS_AMBIGUAS: ReadonlySet<string> = new Set([
${listaAmbiguasVoc}
]);
`,
  "utf8"
);

console.log(`✓ ${libros} libros · ${palabras.toLocaleString("es")} palabras etiquetadas`);
console.log(`✓ con vocales: ${clarasVoc.size.toLocaleString("es")} formas claras · ${ambiguasVoc.length.toLocaleString("es")} ambiguas`);
console.log(`✓ consonantes: ${claras.size.toLocaleString("es")} formas claras · ${ambiguas.length.toLocaleString("es")} ambiguas`);
console.log(`✓ escrito en lib/sources/morfologia.generated.ts`);
