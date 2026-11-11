#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL MENÚ DE MISTERIOS
 * ─────────────────────────────────────────────────────────────────────────
 *  Evita el problema de "links perdidos": páginas /misterio/{slug} que existen
 *  pero NO están en el menú (lib/content/misterios.ts) y por tanto son imposibles de
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
const CATALOGO = join(ROOT, "lib", "content", "misterios.ts");
const INDICE = join(ROOT, "app", "[locale]", "misterios", "page.tsx");

// 1. Slugs de las páginas que existen físicamente (carpetas con page.tsx).
const paginas = readdirSync(MISTERIO_DIR)
  .filter((name) => {
    const p = join(MISTERIO_DIR, name);
    return statSync(p).isDirectory();
  });

// 2. Slugs y series registrados en el catálogo (lib/content/misterios.ts).
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

// 4. COLISIONES DE ATAJOS.
//    Cada misterio tiene un atajo corto en la RAÍZ del sitio (jashmal.org/137),
//    generado del catálogo por lib/content/misterio-atajos.ts. Un slug que se
//    llame igual que una ruta real la TAPARÍA. Aquí la comprobación es VIVA:
//    leemos las carpetas que existen de verdad, así que también avisa cuando
//    alguien crea una ruta nueva que choca con un atajo que ya estaba.
const LOCALE_DIR = join(ROOT, "app", "[locale]");
const esCarpeta = (base) => (name) => {
  try {
    return statSync(join(base, name)).isDirectory();
  } catch {
    return false;
  }
};

const rutasReales = new Set([
  // Rutas de primer nivel dentro de app/[locale]
  ...readdirSync(LOCALE_DIR).filter(esCarpeta(LOCALE_DIR)),
  // Rutas y archivos de primer nivel fuera de [locale] (api, sitemap, robots…)
  ...readdirSync(join(ROOT, "app"))
    .filter((n) => n !== "[locale]")
    .map((n) => n.replace(/\.(tsx|ts|json|png|ico)$/, "")),
  // Todo lo que se sirve desde public/ ocupa también la raíz
  ...readdirSync(join(ROOT, "public")).map((n) => n.replace(/\.[a-z0-9]+$/i, "")),
  // Prefijos de idioma e infraestructura de Next / Vercel
  "es",
  "fa",
  "en",
  "api",
  "_next",
  "_vercel",
  "static",
  ".well-known",
  "well-known",
]);

// Slugs localizados y atajos/redirecciones ya declarados en la config.
const configTxt = readFileSync(join(ROOT, "next.config.ts"), "utf8");
for (const m of configTxt.matchAll(/source:\s*"\/([a-z0-9-]+)"/gi)) {
  rutasReales.add(m[1]);
}
const routingTxt = readFileSync(join(ROOT, "i18n", "routing.ts"), "utf8");
for (const m of routingTxt.matchAll(/"\/([a-z0-9-]+)":/g)) {
  rutasReales.add(m[1]);
}
for (const m of routingTxt.matchAll(/[a-z]{2}:\s*"\/([a-z0-9-]+)"/g)) {
  rutasReales.add(m[1]);
}

const colisiones = catSlugs.filter((s) => rutasReales.has(s));

let fallas = 0;

console.log(`\n🔎 Misterios — páginas: ${paginas.length} · catálogo: ${catSlugs.length}\n`);

if (huerfanas.length) {
  fallas += huerfanas.length;
  console.log("❌ HUÉRFANAS (página existe, falta en el menú → invisible):");
  huerfanas.forEach((s) => console.log(`     /misterio/${s}  →  agrégala a lib/content/misterios.ts`));
  console.log("");
}

if (linksMuertos.length) {
  fallas += linksMuertos.length;
  console.log("❌ LINKS MUERTOS (en el menú, pero la página no existe → 404):");
  linksMuertos.forEach((s) => console.log(`     ${s}  →  crea app/[locale]/misterio/${s}/page.tsx o quítala del catálogo`));
  console.log("");
}

if (colisiones.length) {
  fallas += colisiones.length;
  console.log("❌ COLISIONES DE ATAJO (el atajo /{slug} taparía una ruta real del sitio):");
  colisiones.forEach((s) =>
    console.log(`     /${s}  →  choca con una ruta que ya existe. Cambia el slug en lib/content/misterios.ts`)
  );
  console.log("     (la página seguiría viva en /misterio/{slug}; lo que se rompería es la ruta real)\n");
}

if (seriesNoMostradas.length) {
  fallas += seriesNoMostradas.length;
  console.log("❌ SERIES NO MOSTRADAS (en el catálogo, pero el índice no pinta esa categoría):");
  seriesNoMostradas.forEach((s) => console.log(`     serie "${s}"  →  agrégala al arreglo de categorías en misterios/page.tsx`));
  console.log(`     (categorías que el índice pinta hoy: ${[...seriesMostradas].join(", ")})`);
  console.log("");
}

if (fallas === 0) {
  console.log("✅ Todo enlazado: cada misterio aparece en el menú y cada link tiene su página.");
  console.log(`✅ Atajos cortos: ${catSlugs.length} generados del catálogo · 0 colisiones con rutas reales.\n`);
  process.exit(0);
}

console.log(`⚠️  ${fallas} falla(s). Arréglalas para que ningún misterio quede perdido.\n`);
process.exit(1);
