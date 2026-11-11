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
