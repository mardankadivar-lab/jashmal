#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL BUSCADOR GLOBAL
 * ─────────────────────────────────────────────────────────────────────────
 *  Hermano de `misterios:check`. Aquel evita que una enseñanza quede fuera del
 *  MENÚ; este evita que quede fuera de la LUPA — que es la otra forma de
 *  volverse invisible en un sitio con más de cien páginas.
 *
 *  Compara lo que DEBERÍA estar (los registros que cura el Sofer, leídos del
 *  código fuente) contra lo que de verdad SALIÓ en el índice generado durante
 *  el build (.next/server/app/search-index.json.body).
 *
 *  Detecta cuatro fallas:
 *    1. AUSENTE        — el misterio/letra está en el catálogo pero no en el índice.
 *    2. SIN TÍTULO     — una ficha sin título en español → sería inbuscable.
 *    3. SIN DESTINO    — una ficha sin `href` → resultado que no lleva a ningún lado.
 *    4. CONTAMINACIÓN  — una ficha con nombre de libro en INGLÉS al estilo de los
 *                        nodos cosechados del cerebro ("Numbers 11", "Genesis 3:15").
 *                        El índice NO debe beber de esa base; esto lo vigila.
 *
 *  Uso:  npm run build && npm run search:check
 *  Devuelve código de salida ≠ 0 si hay fallas (sirve para CI / pre-deploy).
 * ─────────────────────────────────────────────────────────────────────────
 */
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INDICE = join(ROOT, ".next", "server", "app", "search-index.json.body");
const CATALOGO = join(ROOT, "lib", "content", "misterios.ts");
const LETRAS = join(ROOT, "lib", "letters", "index.ts");

if (!existsSync(INDICE)) {
  console.error(
    "\n✗ No encuentro el índice generado.\n" +
      "  El índice se produce durante el build. Corre primero:\n\n" +
      "      npm run build && npm run search:check\n",
  );
  process.exit(1);
}

const docs = JSON.parse(readFileSync(INDICE, "utf8"));

// ── Lo que DEBERÍA estar, leído del código fuente ────────────────────────
const catTxt = readFileSync(CATALOGO, "utf8");
const misterioSlugs = [...catTxt.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

// Las letras registradas viven entre las llaves de `export const LETTERS = {…}`.
const letrasTxt = readFileSync(LETRAS, "utf8");
const bloqueLetras = letrasTxt.split("export const LETTERS")[1] ?? "";
const letraSlugs = [...bloqueLetras.matchAll(/^\s{2}([a-z]+),/gm)].map((m) => m[1]);

// ── Lo que de verdad SALIÓ ───────────────────────────────────────────────
const enIndice = new Set(docs.map((d) => d.id));
const porTipo = docs.reduce((acc, d) => ((acc[d.kind] = (acc[d.kind] || 0) + 1), acc), {});

let fallas = 0;
const bytes = Buffer.byteLength(readFileSync(INDICE));

console.log(
  `\n🔎 Buscador — ${docs.length} fichas · ${(bytes / 1024).toFixed(0)} KB\n` +
    `   ${Object.entries(porTipo)
      .map(([k, n]) => `${k}: ${n}`)
      .join(" · ")}\n`,
);

// 1. AUSENTES
const misteriosAusentes = misterioSlugs.filter((s) => !enIndice.has(`misterio:${s}`));
const letrasAusentes = letraSlugs.filter((s) => !enIndice.has(`letra:${s}`));

if (misteriosAusentes.length) {
  fallas++;
  console.error(`✗ ${misteriosAusentes.length} misterio(s) fuera del buscador — invisibles en la lupa:`);
  for (const s of misteriosAusentes) console.error(`    /misterio/${s}`);
  console.error("");
}
if (letrasAusentes.length) {
  fallas++;
  console.error(`✗ ${letrasAusentes.length} letra(s) fuera del buscador:`);
  for (const s of letrasAusentes) console.error(`    /letra/${s}`);
  console.error("");
}

// 2 y 3. Fichas rotas
const sinTitulo = docs.filter((d) => !d.t?.es?.trim());
const sinDestino = docs.filter((d) => !d.href?.trim());
if (sinTitulo.length) {
  fallas++;
  console.error(`✗ ${sinTitulo.length} ficha(s) sin título en español (inbuscables):`);
  for (const d of sinTitulo.slice(0, 10)) console.error(`    ${d.id}`);
  console.error("");
}
if (sinDestino.length) {
  fallas++;
  console.error(`✗ ${sinDestino.length} ficha(s) sin destino:`);
  for (const d of sinDestino.slice(0, 10)) console.error(`    ${d.id}`);
  console.error("");
}

// 4. CONTAMINACIÓN desde la base del cerebro.
// Los nodos cosechados llegan con nombres de libro en inglés ("Numbers 11").
// El índice se arma solo de registros curados; si aparece uno de estos
// patrones, alguien conectó el buscador a /api/brain y hay que revertirlo.
const LIBROS_EN_INGLES =
  /\b(Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Judges|Kings|Samuel|Psalms|Proverbs|Isaiah|Jeremiah|Ezekiel)\b\s*\d/i;
const contaminadas = docs.filter((d) => LIBROS_EN_INGLES.test(d.t?.es ?? ""));
if (contaminadas.length) {
  fallas++;
  console.error(
    `✗ ${contaminadas.length} ficha(s) con nombre de libro en inglés — el índice NO debe leer de la base del cerebro:`,
  );
  for (const d of contaminadas.slice(0, 10)) console.error(`    ${d.id} · ${d.t.es}`);
  console.error("");
}

if (!fallas) {
  console.log(
    `✓ ${misterioSlugs.length} misterios y ${letraSlugs.length} letras están en la lupa.\n` +
      "✓ Todas las fichas tienen título y destino.\n" +
      "✓ Sin contaminación de la base del cerebro.\n",
  );
}

process.exit(fallas ? 1 : 0);
