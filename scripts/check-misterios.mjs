#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL MENÚ DE MISTERIOS
 * ─────────────────────────────────────────────────────────────────────────
 *  Evita el problema de "links perdidos": páginas /misterio/{slug} que existen
 *  pero NO están en el menú (lib/misterios.ts) y por tanto son imposibles de
 *  encontrar en el sitio.
 *
 *  Detecta tres fallas:
 *    1. HUÉRFANA   — la página existe, pero NO está en el catálogo → invisible.
 *    2. LINK MUERTO — está en el catálogo, pero la página NO existe → 404.
 *    3. SERIE NO MOSTRADA — está en el catálogo, pero su `serie` no es una de
 *       las categorías que el índice realmente pinta → no aparece igual.
 *
 *  Uso:  npm run misterios:check
 *  Devuelve código de salida ≠ 0 si hay fallas (sirve para CI / pre-deploy).
 * ─────────────────────────────────────────────────────────────────────────
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MISTERIO_DIR = join(ROOT, "app", "[locale]", "misterio");
const CATALOGO = join(ROOT, "lib", "misterios.ts");
const INDICE = join(ROOT, "app", "[locale]", "misterios", "page.tsx");

// 1. Slugs de las páginas que existen físicamente (carpetas con page.tsx).
const paginas = readdirSync(MISTERIO_DIR)
  .filter((name) => {
    const p = join(MISTERIO_DIR, name);
    return statSync(p).isDirectory();
  });

// 2. Slugs y series registrados en el catálogo (lib/misterios.ts).
const catTxt = readFileSync(CATALOGO, "utf8");
const catSlugs = [...catTxt.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const catSeries = new Set(
  [...catTxt.matchAll(/serie:\s*"([^"]+)"/g)].map((m) => m[1])
);

// 3. Categorías que el índice realmente pinta (app/[locale]/misterios/page.tsx).
const idxTxt = readFileSync(INDICE, "utf8");
const seriesMostradas = new Set(
  [...idxTxt.matchAll(/serie:\s*"([^"]+)"/g)].map((m) => m[1])
);

const setPaginas = new Set(paginas);
const setCatalogo = new Set(catSlugs);

const huerfanas = paginas.filter((s) => !setCatalogo.has(s));
const linksMuertos = catSlugs.filter((s) => !setPaginas.has(s));
const seriesNoMostradas = [...catSeries].filter((s) => !seriesMostradas.has(s));

let fallas = 0;

console.log(`\n🔎 Misterios — páginas: ${paginas.length} · catálogo: ${catSlugs.length}\n`);

if (huerfanas.length) {
  fallas += huerfanas.length;
  console.log("❌ HUÉRFANAS (página existe, falta en el menú → invisible):");
  huerfanas.forEach((s) => console.log(`     /misterio/${s}  →  agrégala a lib/misterios.ts`));
  console.log("");
}

if (linksMuertos.length) {
  fallas += linksMuertos.length;
  console.log("❌ LINKS MUERTOS (en el menú, pero la página no existe → 404):");
  linksMuertos.forEach((s) => console.log(`     ${s}  →  crea app/[locale]/misterio/${s}/page.tsx o quítala del catálogo`));
  console.log("");
}

if (seriesNoMostradas.length) {
  fallas += seriesNoMostradas.length;
  console.log("❌ SERIES NO MOSTRADAS (en el catálogo, pero el índice no pinta esa categoría):");
  seriesNoMostradas.forEach((s) => console.log(`     serie "${s}"  →  agrégala al arreglo de categorías en misterios/page.tsx`));
  console.log(`     (categorías que el índice pinta hoy: ${[...seriesMostradas].join(", ")})`);
  console.log("");
}

if (fallas === 0) {
  console.log("✅ Todo enlazado: cada misterio aparece en el menú y cada link tiene su página.\n");
  process.exit(0);
}

console.log(`⚠️  ${fallas} falla(s). Arréglalas para que ningún misterio quede perdido.\n`);
process.exit(1);
