#!/usr/bin/env node
// Baja de Sefaria las tablas que necesita el verificador de citas y las
// congela en el repo:
//   · lib/sources/zoharDafim.generated.ts  — folios reales de cada parashá del Zóhar
//   · lib/sources/tanakhShape.generated.ts — versículos por capítulo del Tanaj
//
// Por qué TABLAS y no consultas en vivo. Dos razones, las dos medidas:
//
// 1. La API de Sefaria no puede responder lo que necesitamos preguntar.
//    · /api/name/"Zohar, Pinchas 226b"  → is_ref:false, también para folios válidos.
//    · /api/texts/"Zohar, Pinchas 226b" → 200, pero devuelve "Zohar, Pinchas 1":
//      ignora el folio en silencio. /api/texts/"Sotah 999b" devuelve 200 con el
//      texto de "Sotah 2a". Un 200 de Sefaria no prueba que la ref exista.
//    · /api/name/"Genesis 2:400"        → is_ref:true. Solo valida el capítulo.
//
// 2. No cabe en el presupuesto de tiempo. El endpoint tiene maxDuration=30 y la
//    llamada al modelo ya se lleva ~36 s. Medido: una consulta en frío a
//    Sefaria se come 2,5 s y se queda sin respuesta igual.
//
// Con las tablas locales, verificar un análisis completo cuesta <5 ms, no
// depende de la red y no tiene modo de fallo. Y se sigue verificando contra el
// dato de Sefaria: es el mismo dato, bajado una vez.
//
// Uso: npm run fuentes:tablas

import fs from "node:fs";
import path from "node:path";

const ZOHAR_URL = "https://www.sefaria.org/api/v2/raw/index/Zohar";
const TANAKH_URL = "https://www.sefaria.org/api/shape/Tanakh";
const OUT = path.join(process.cwd(), "lib/sources/zoharDafim.generated.ts");
const OUT_TANAKH = path.join(process.cwd(), "lib/sources/tanakhShape.generated.ts");

/** "15a" → 28. Medios folios: 1a=0, 1b=1, 2a=2… */
function toUnit(addr) {
  const m = /^(\d+)([ab])$/.exec(String(addr).trim());
  if (!m) return null;
  return (Number(m[1]) - 1) * 2 + (m[2] === "b" ? 1 : 0);
}

function enTitle(node) {
  const titles = node.titles ?? [];
  return (
    titles.find((t) => t.lang === "en" && t.primary)?.text ??
    titles.find((t) => t.lang === "en")?.text ??
    null
  );
}

function heTitle(node) {
  const titles = node.titles ?? [];
  return titles.find((t) => t.lang === "he")?.text ?? "";
}

const res = await fetch(ZOHAR_URL);
if (!res.ok) throw new Error(`Sefaria index: ${res.status}`);
const index = await res.json();

const dafStruct = index?.alt_structs?.Daf?.nodes;
if (!Array.isArray(dafStruct)) throw new Error("El índice del Zóhar no trae alt_structs.Daf");

const rows = [];
for (const vol of dafStruct) {
  const volume = enTitle(vol) ?? "";
  for (const parasha of vol.nodes ?? []) {
    const name = enTitle(parasha);
    if (!name) continue;
    // Una parashá puede traer varios ArrayMapNode (versiones/secciones).
    // Tomamos la UNIÓN de sus rangos: el criterio generoso es el correcto,
    // porque un falso negativo cuesta más que dejar pasar un folio dudoso.
    const nodes = parasha.nodeType === "ArrayMapNode" ? [parasha] : (parasha.nodes ?? []);
    let lo = Infinity;
    let hi = -Infinity;
    for (const n of nodes) {
      if (n.nodeType !== "ArrayMapNode") continue;
      const start = toUnit(n.startingAddress);
      if (start === null) continue;
      const count = (n.refs ?? []).length;
      if (count < 1) continue;
      lo = Math.min(lo, start);
      hi = Math.max(hi, start + count - 1);
    }
    if (lo === Infinity) continue;
    rows.push({ name, he: heTitle(parasha), volume, lo, hi });
  }
}

if (rows.length < 40) throw new Error(`Solo ${rows.length} parashiot: el índice vino incompleto`);

const label = (u) => `${Math.floor(u / 2) + 1}${u % 2 ? "b" : "a"}`;

const body = rows
  .map(
    (r) =>
      `  { name: ${JSON.stringify(r.name)}, he: ${JSON.stringify(r.he)}, ` +
      `volume: ${JSON.stringify(r.volume)}, lo: ${r.lo}, hi: ${r.hi} }, ` +
      `// ${label(r.lo)}–${label(r.hi)}`
  )
  .join("\n");

const out = `// AUTO-GENERADO por scripts/gen-zohar-dafim.mjs. No editar a mano.
// Fuente: índice del Zóhar en Sefaria (alt_structs.Daf), ${new Date().toISOString().slice(0, 10)}.
//
// \`lo\` y \`hi\` están en MEDIOS FOLIOS: 1a=0, 1b=1, 2a=2… (ver dafToUnit).
// El comentario de cada línea trae el rango legible.

export interface ZoharParashaRange {
  /** Título inglés de Sefaria, ej. "Lech Lecha". */
  name: string;
  /** Título hebreo, ej. "לך לך". */
  he: string;
  /** "Volume I" | "Volume II" | "Volume III". */
  volume: string;
  lo: number;
  hi: number;
}

export const ZOHAR_DAFIM: ZoharParashaRange[] = [
${body}
];
`;

fs.writeFileSync(OUT, out, "utf8");
console.log(`✓ ${rows.length} parashiot del Zóhar → ${path.relative(process.cwd(), OUT)}`);

// ── Tanaj: cuántos versículos tiene cada capítulo ──────────────────────────
// /api/shape/Tanakh devuelve los 39 libros con el conteo de versículos de cada
// capítulo en UNA llamada. Con esta tabla, "Génesis 2:400" se desmiente en
// local: Génesis 2 tiene 25 versículos.
const shapeRes = await fetch(TANAKH_URL);
if (!shapeRes.ok) throw new Error(`Sefaria shape: ${shapeRes.status}`);
const shape = await shapeRes.json();
if (!Array.isArray(shape) || shape.length < 30) {
  throw new Error(`El shape del Tanaj vino incompleto (${Array.isArray(shape) ? shape.length : "?"} libros)`);
}

const books = [];
for (const b of shape) {
  const title = b?.title;
  const chapters = b?.chapters;
  if (typeof title !== "string" || !Array.isArray(chapters)) continue;
  // Algunos libros (Ester con sus adiciones, etc.) traen estructuras anidadas:
  // solo nos quedamos con los conteos planos, que es lo que sabemos juzgar.
  if (!chapters.every((n) => Number.isInteger(n) && n > 0)) continue;
  books.push([title, chapters]);
}
if (books.length < 30) throw new Error(`Solo ${books.length} libros con conteo plano`);

const tanakhBody = books
  .map(([title, chapters]) => `  ${JSON.stringify(title)}: [${chapters.join(",")}],`)
  .join("\n");

const tanakhOut = `// AUTO-GENERADO por scripts/gen-tablas-fuentes.mjs. No editar a mano.
// Fuente: /api/shape/Tanakh de Sefaria, ${new Date().toISOString().slice(0, 10)}.
//
// Cuántos versículos tiene cada capítulo. El índice 0 es el capítulo 1.
// Sirve para desmentir en local un versículo inventado: Sefaria contesta
// is_ref:true a "Genesis 2:400" porque su API solo valida el capítulo.

export const TANAKH_VERSES: Record<string, number[]> = {
${tanakhBody}
};
`;

fs.writeFileSync(OUT_TANAKH, tanakhOut, "utf8");
const totalChapters = books.reduce((n, [, c]) => n + c.length, 0);
console.log(
  `✓ ${books.length} libros / ${totalChapters} capítulos del Tanaj → ` +
    path.relative(process.cwd(), OUT_TANAKH)
);

// ── Midrash: cuántas secciones tiene cada capítulo de cada obra ────────────
// Mismo motivo que arriba: a Sefaria no se le puede PREGUNTAR si una cita de
// Midrash existe (/api/texts devuelve 200 con otro pasaje), así que se baja la
// FORMA de cada obra una vez y se congela. /api/shape/<Obra> da, por obra,
// cuántos capítulos tiene y cuántas secciones (simanim) tiene cada capítulo.
//
// Tres formas, y cada una se juzga distinto:
//  · "flat"   — capítulo:sección, lista plana. Bereshit Rabá 12:6.
//  · "nested" — capítulo:versículo:sección (Kohelet y Shir HaShirim Rabá);
//               solo se juzgan los dos primeros números.
//  · "parts"  — la obra se divide por parashá/masejta y el número es el simán
//               dentro de ella. Tanjumá Bereshit 7, Mejilta Pisja 1.
//
// Un conteo 0 significa "Sefaria no tiene texto en ese tramo", NO "no existe":
// el verificador lo trata como no concluyente y CALLA (ver citationCheck).
const OUT_MIDRASH = path.join(process.cwd(), "lib/sources/midrashShape.generated.ts");

// Qué obras entran. La lista sale del dictamen del Sofer (2026-11-13), que
// está escrito completo en la cabecera de lib/sources/citationCheck.ts:
// quedan fuera a propósito el Yalkut Shimoní (se cita por "remez", tres
// notaciones incompatibles), la Sifrá (278 nodos con dos numeraciones
// intercaladas) y Avot de Rabí Natán (dos versiones con numeración distinta),
// porque juzgarlas produciría falsos positivos.
const MIDRASH_WORKS = [
  "Bereshit Rabbah",
  "Shemot Rabbah",
  "Vayikra Rabbah",
  "Bamidbar Rabbah",
  "Devarim Rabbah",
  "Shir HaShirim Rabbah",
  "Ruth Rabbah",
  "Eichah Rabbah",
  "Kohelet Rabbah",
  "Esther Rabbah",
  "Midrash Tanchuma",
  "Midrash Tanchuma Buber",
  "Mekhilta d'Rabbi Yishmael",
  "Sifrei Bamidbar",
  "Sifrei Devarim",
  "Pirkei DeRabbi Eliezer",
  "Pesikta DeRav Kahana",
  "Pesikta Rabbati",
  "Midrash Tehillim",
  "Midrash Mishlei",
  "Tanna Debei Eliyahu Rabbah",
];

// Obras con PETIJTÁ (proemios), que se citan por su propio número —
// "Eikhá Rabá, Petijtá 24" es la cita más conocida de la obra. /api/shape de la
// obra NO las ve (devuelve isComplex:null y solo los capítulos): hay que pedir
// el shape del nodo. Sin esto, el verificador tacharía la Petijtá 24 por creer
// que Eikhá Rabá solo llega al capítulo 5.
const MIDRASH_PETICHTA = ["Eichah Rabbah", "Esther Rabbah", "Ruth Rabbah"];

/**
 * ¿Se puede juzgar el SEGUNDO número (la sección) de esta obra?
 * Medido, no supuesto: hay obras que Sefaria no segmenta de verdad — Pesikta
 * Rabbati trae 1 sola sección en 45 de sus 47 piskaot, Tanna DeBei Eliyahu en
 * 17 de 31. En ellas, la sección que cita la tradición no es la que Sefaria
 * cuenta, y juzgarla produciría falsos positivos a mansalva: el error más caro
 * del proyecto. Así que solo se juzga la sección donde la segmentación es
 * consistente (85% de los capítulos con más de una).
 */
function subReliable(sections) {
  const nz = sections.filter((n) => n > 0);
  if (nz.length === 0) return false;
  return nz.filter((n) => n >= 2).length / nz.length >= 0.85;
}

/** Nombre de la parte sin el título de la obra: "Midrash Tanchuma, Noach" → "Noach". */
function partName(title, book) {
  const s = String(title);
  const i = s.indexOf(",");
  const tail = i === -1 ? s : s.slice(i + 1);
  return tail.replace(new RegExp(`^\\s*${book}\\s*,?\\s*`), "").trim();
}

const midrash = [];
for (const work of MIDRASH_WORKS) {
  const r = await fetch(`https://www.sefaria.org/api/shape/${encodeURIComponent(work)}`);
  if (!r.ok) throw new Error(`shape ${work}: ${r.status}`);
  const j = await r.json();
  const node = Array.isArray(j) ? j[0] : null;
  if (!node || typeof node.book !== "string") throw new Error(`shape ${work}: sin nodo`);
  const name = node.book;
  const he = node.heBook ?? "";
  const chapters = node.chapters;

  if (node.isComplex && Array.isArray(chapters) && chapters.every((c) => c && typeof c === "object")) {
    const parts = [];
    for (const c of chapters) {
      const pn = partName(c.title, name);
      const phe = partName(c.heTitle, he);
      if (!pn || !Number.isInteger(c.length) || c.length < 1) continue;
      parts.push({ name: pn, he: phe, len: c.length });
    }
    if (parts.length < 2) throw new Error(`${work}: solo ${parts.length} partes`);
    midrash.push({ name, he, shape: "parts", parts });
    continue;
  }
  if (Array.isArray(chapters) && chapters.every((n) => Number.isInteger(n) && n >= 0)) {
    midrash.push({ name, he, shape: "flat", sections: chapters, sub: subReliable(chapters) });
    continue;
  }
  if (Array.isArray(chapters) && chapters.every((c) => Array.isArray(c))) {
    // Tres niveles: guardamos cuántas entradas tiene cada capítulo (los
    // versículos); el tercer número no se juzga.
    // Aquí el segundo número es el VERSÍCULO del libro bíblico, que sí es
    // estructura firme: se juzga siempre.
    midrash.push({ name, he, shape: "nested", sections: chapters.map((c) => c.length), sub: true });
    continue;
  }
  throw new Error(`${work}: forma no reconocida`);
}

for (const work of MIDRASH_PETICHTA) {
  const r = await fetch(`https://www.sefaria.org/api/shape/${encodeURIComponent(`${work}, Petichta`)}`);
  if (!r.ok) throw new Error(`shape ${work} Petichta: ${r.status}`);
  const node = (await r.json())?.[0];
  const n = node?.chapters;
  if (!Number.isInteger(n) || n < 1) throw new Error(`${work}: Petijtá sin conteo`);
  const row = midrash.find((w) => w.name === node.book);
  if (!row) throw new Error(`${work}: la obra de la Petijtá no está en la tabla`);
  row.petichta = n;
}

if (midrash.length !== MIDRASH_WORKS.length) {
  throw new Error(`Faltan obras: ${midrash.length}/${MIDRASH_WORKS.length}`);
}

const midrashBody = midrash
  .map((w) => {
    const head = `  { name: ${JSON.stringify(w.name)}, he: ${JSON.stringify(w.he)}, shape: ${JSON.stringify(w.shape)},`;
    if (w.shape === "parts") {
      const parts = w.parts
        .map((p) => `      { name: ${JSON.stringify(p.name)}, he: ${JSON.stringify(p.he)}, len: ${p.len} },`)
        .join("\n");
      return `${head}\n    parts: [\n${parts}\n    ] },`;
    }
    const pet = w.petichta ? ` petichta: ${w.petichta},` : "";
    return `${head}${pet} sub: ${w.sub}, sections: [${w.sections.join(",")}] },`;
  })
  .join("\n");

const midrashOut = `// AUTO-GENERADO por scripts/gen-tablas-fuentes.mjs. No editar a mano.
// Fuente: /api/shape/<Obra> de Sefaria, ${new Date().toISOString().slice(0, 10)}.
//
// Para cada obra midráshica: cuántos capítulos tiene y cuántas secciones
// (simanim) tiene cada capítulo. El índice 0 es el capítulo 1.
//
// Un 0 significa "Sefaria no tiene texto en ese tramo", NO "no existe": el
// verificador lo trata como no concluyente y calla (ver citationCheck.ts).
//
// shape:
//  · "flat"   — capítulo:sección. "Bereshit Rabá 12:6".
//  · "nested" — capítulo:versículo:sección; \`sections\` dice cuántos versículos
//               tiene cada capítulo y el tercer número no se juzga.
//  · "parts"  — dividida por parashá/masejta; el número es el simán dentro de
//               ella. "Tanjumá Bereshit 7".
//
// \`sub: false\` marca las obras donde la sección NO se juzga: Sefaria no las
// segmenta de verdad (Pesikta Rabbati trae una sola sección en 45 de sus 47
// piskaot) y juzgarla sería inventar falsos positivos.

export interface MidrashPart {
  /** Nombre inglés de Sefaria, ej. "Lech Lecha". */
  name: string;
  /** Nombre hebreo, ej. "לך לך". */
  he: string;
  /** Cuántos simanim tiene esta parte. */
  len: number;
}

export interface MidrashWork {
  /** Título inglés de Sefaria, ej. "Bereshit Rabbah". */
  name: string;
  /** Título hebreo, ej. "בראשית רבה". */
  he: string;
  shape: "flat" | "nested" | "parts";
  /**
   * flat/nested: ¿es fiable el SEGUNDO número (la sección)? \`false\` en las
   * obras que Sefaria no segmenta de verdad (casi todo capítulo con una sola
   * sección): ahí se juzga el capítulo y se calla sobre la sección.
   */
  sub?: boolean;
  /** flat/nested: secciones (o versículos) de cada capítulo. */
  sections?: number[];
  /**
   * Cuántos proemios tiene la Petijtá, en las obras que la tienen (Eikhá 34,
   * Ester 12, Rut 7). Se cita por su propio número: "Eikhá Rabá, Petijtá 24".
   */
  petichta?: number;
  /** parts: las parashiot/masajtot de la obra. */
  parts?: MidrashPart[];
}

export const MIDRASH_WORKS: MidrashWork[] = [
${midrashBody}
];
`;

fs.writeFileSync(OUT_MIDRASH, midrashOut, "utf8");
console.log(
  `✓ ${midrash.length} obras de Midrash → ${path.relative(process.cwd(), OUT_MIDRASH)}`
);
