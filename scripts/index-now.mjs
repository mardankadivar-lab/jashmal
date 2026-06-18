#!/usr/bin/env node
/**
 * index-now.mjs — Notifica a los buscadores vía IndexNow cuando hay contenido nuevo.
 *
 * IndexNow es un protocolo open-source soportado por Bing, Yandex y (via Bing) Google.
 * No requiere credenciales de OAuth — solo una key que vive en un archivo público del sitio.
 *
 * Uso:
 *   node scripts/index-now.mjs                    → envía todas las URLs del sitemap
 *   node scripts/index-now.mjs /es/academia/...   → envía una URL específica
 *
 * Prerequisito: crear /public/<INDEXNOW_KEY>.txt con el contenido de la key
 * (ver instrucciones al final del script).
 */

const BASE = "https://jashmal.org";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "";

if (!INDEXNOW_KEY) {
  console.error("❌  Falta la variable INDEXNOW_KEY. Agrégala a .env.local:");
  console.error("    INDEXNOW_KEY=tu-clave-aqui");
  console.error("\nPara generar la clave: https://www.bing.com/indexnow");
  process.exit(1);
}

// URLs de alta prioridad para notificar después de cada deploy
const PRIORITY_URLS = [
  "/es",
  "/es/academia",
  "/es/academia/javer-inicio",
  "/es/academia/modulo-8",
  "/es/academia/modulo-9",
  "/es/academia/modulo-10",
  "/es/academia/modulo-11",
  "/es/academia/javer-completo",
  "/es/misterios",
  "/es/estudio",
];

const urlsToNotify = process.argv[2]
  ? [`${BASE}${process.argv[2]}`]
  : PRIORITY_URLS.map((p) => `${BASE}${p}`);

const payload = {
  host: "jashmal.org",
  key: INDEXNOW_KEY,
  keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
  urlList: urlsToNotify,
};

console.log(`📡  Enviando ${urlsToNotify.length} URL(s) a IndexNow...`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (res.ok || res.status === 202) {
  console.log(`✅  IndexNow aceptó las URLs (${res.status})`);
  urlsToNotify.forEach((u) => console.log(`   → ${u}`));
} else {
  const text = await res.text();
  console.error(`❌  Error IndexNow (${res.status}): ${text}`);
  process.exit(1);
}

/**
 * ─── SETUP (una sola vez) ────────────────────────────────────────────────────
 *
 * 1. Ve a https://www.bing.com/indexnow y genera una key
 *    (o usa cualquier string UUID aleatorio)
 *
 * 2. Crea el archivo de verificación en tu servidor:
 *    public/<tu-key>.txt  →  contenido: la misma key
 *    Ej: public/abc123def456.txt  contenido: abc123def456
 *
 * 3. Agrega a .env.local:
 *    INDEXNOW_KEY=abc123def456
 *
 * 4. Ejecuta después de cada deploy:
 *    node scripts/index-now.mjs
 *
 * ─── AUTOMATIZAR CON VERCEL ──────────────────────────────────────────────────
 *
 * En vercel.json agrega un comando post-deploy:
 * (Vercel no tiene hooks nativos, pero puedes agregar en package.json:)
 *   "postbuild": "node scripts/index-now.mjs"
 * O correrlo manualmente después de `vercel --prod --yes`.
 */
