#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  AUDITORÍA DE INTERNACIONALIZACIÓN (i18n) — es · en · fa
 * ─────────────────────────────────────────────────────────────────────────
 *  Hace VISIBLE la mezcla de idiomas. Revisa las tres capas del sitio y
 *  reporta exactamente qué falta en cada idioma, para que ninguna página
 *  muestre texto de otro idioma "por accidente" (fallback silencioso).
 *
 *  Capas que audita:
 *    1. CHROME (interfaz)   — messages/{es,en,fa}.json: paridad de claves +
 *       valores que quedaron idénticos al español (traducción olvidada).
 *    2. CONTENIDO CURADO    — datos en lib/*.ts (misterios, nodos del universo,
 *       gematrías, cosmología): ¿tienen versión es/fa/en o solo español?
 *    3. PÁGINAS DE MISTERIO — app/[locale]/misterio/*: ¿pueden mostrar inglés
 *       o caen en español cuando el idioma activo es /en?
 *    4. SLUGS LOCALIZADOS   — i18n/routing.ts: ¿qué rutas cambian de URL por
 *       idioma y cuáles comparten el slug español en los tres idiomas?
 *
 *  Uso:  npm run i18n:check
 *  Sale con código ≠ 0 si hay huecos de inglés (sirve para CI / pre-deploy).
 *  Pasa --strict para que CUALQUIER hueco (incl. fa) devuelva error.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STRICT = process.argv.includes("--strict");
const HEBREW = /[֐-׿]/; // bloque hebreo — texto que SÍ debe ser igual en todo idioma

const read = (p) => readFileSync(join(ROOT, p), "utf8");

// A prueba de reorganización: lib/ se ordena por dominios (lib/content, lib/nodes,
// lib/study…) y los archivos se mueven. Localizamos cada uno por su NOMBRE, sin
// importar en qué subcarpeta viva, para que la auditoría no se rompa al reordenar.
function findInLib(basename) {
  const stack = [join(ROOT, "lib")];
  while (stack.length) {
    const dir = stack.pop();
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      if (statSync(p).isDirectory()) stack.push(p);
      else if (e === basename) return p;
    }
  }
  return null;
}

let errores = 0;   // huecos de inglés (bloquean por defecto)
let avisos = 0;    // huecos de farsi / leaks (informativos, o bloquean con --strict)

function bar(done, total) {
  const pct = total ? Math.round((done / total) * 100) : 100;
  const full = Math.round(pct / 10);
  return `${"█".repeat(full)}${"░".repeat(10 - full)} ${pct}% (${done}/${total})`;
}

console.log("\n══════════════════════════════════════════════════════════════");
console.log("  AUDITORÍA i18n — Jashmal   (es · en · fa)");
console.log("══════════════════════════════════════════════════════════════");

// ── CAPA 1 · CHROME (interfaz) ────────────────────────────────────────────
console.log("\n① INTERFAZ  ·  messages/{es,en,fa}.json");

function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

const es = flatten(JSON.parse(read("messages/es.json")));
const en = flatten(JSON.parse(read("messages/en.json")));
const fa = flatten(JSON.parse(read("messages/fa.json")));
const kes = new Set(Object.keys(es));

const missEn = [...kes].filter((k) => !(k in en));
const missFa = [...kes].filter((k) => !(k in fa));
const extraEn = Object.keys(en).filter((k) => !kes.has(k));

// "leak": valor inglés/farsi idéntico al español, y NO es hebreo (que sí debe repetirse).
const leakEn = [...kes].filter(
  (k) => k in en && typeof es[k] === "string" && es[k] === en[k] &&
    es[k].length > 2 && !HEBREW.test(es[k])
);

console.log(`   claves: es ${kes.size} · en ${Object.keys(en).length} · fa ${Object.keys(fa).length}`);
if (missEn.length) { errores += missEn.length; console.log(`   ❌ EN: faltan ${missEn.length} claves → ${missEn.slice(0, 8).join(", ")}${missEn.length > 8 ? " …" : ""}`); }
if (missFa.length) { avisos += missFa.length; console.log(`   ⚠️  FA: faltan ${missFa.length} claves → ${missFa.slice(0, 8).join(", ")}${missFa.length > 8 ? " …" : ""}`); }
if (extraEn.length) console.log(`   ℹ️  EN tiene ${extraEn.length} clave(s) que ES no → ${extraEn.slice(0, 5).join(", ")}`);
if (leakEn.length) { avisos += leakEn.length; console.log(`   ⚠️  EN: ${leakEn.length} valor(es) idénticos al español (¿sin traducir?) → ${leakEn.slice(0, 6).join(", ")}`); }
if (!missEn.length && !missFa.length && !leakEn.length) console.log("   ✅ interfaz: paridad completa, sin fugas al español.");

// ── CAPA 2 · CONTENIDO CURADO (lib/*.ts) ─────────────────────────────────
console.log("\n② CONTENIDO CURADO  ·  lib/*.ts");

// Cada fuente define: el campo base (es), su par farsi y su par inglés.
const fuentes = [
  { basename: "misterios.ts",       base: "titulo", fa: "tituloFa", en: "tituloEn", nombre: "Misterios (títulos del menú)" },
  { basename: "brainData.ts",       base: "label",  fa: "labelFa",  en: "labelEn",  nombre: "Universo (nodos del grafo)" },
  { basename: "gematrias.ts",       base: "titulo", fa: "tituloFa", en: "tituloEn", nombre: "Gematrías" },
  { basename: "cosmologyStages.ts", base: "titulo", fa: "tituloFa", en: "tituloEn", nombre: "Cosmología (etapas)" },
  { basename: "sefirot.ts",         base: "nombre", fa: "nombreFa", en: "nombreEn", nombre: "Sefirot" },
];

for (const f of fuentes) {
  const fp = findInLib(f.basename);
  if (!fp) continue;
  const txt = readFileSync(fp, "utf8");
  const nBase = (txt.match(new RegExp(`\\b${f.base}:`, "g")) || []).length;
  const nFa = (txt.match(new RegExp(`\\b${f.fa}:`, "g")) || []).length;
  const nEn = (txt.match(new RegExp(`\\b${f.en}:`, "g")) || []).length;
  if (nBase === 0) continue; // la fuente no usa este patrón de campos
  console.log(`   ${f.nombre}  (${nBase} entradas)`);
  console.log(`      FA  ${bar(nFa, nBase)}`);
  console.log(`      EN  ${bar(nEn, nBase)}`);
  if (nEn < nBase) errores += (nBase - nEn);
  if (nFa < nBase) avisos += (nBase - nFa);
}

// ── CAPA 3 · PÁGINAS DE MISTERIO ─────────────────────────────────────────
console.log("\n③ PÁGINAS DE MISTERIO  ·  app/[locale]/misterio/*");

const MIS = join(ROOT, "app", "[locale]", "misterio");
const slugs = readdirSync(MIS).filter((n) => statSync(join(MIS, n)).isDirectory());
let conFa = 0, conEn = 0, soloHardcode = 0;
const sinIngles = [];
for (const s of slugs) {
  const p = join(MIS, s, "page.tsx");
  if (!existsSync(p)) continue;
  const t = readFileSync(p, "utf8");
  const tieneFa = /\bFa\b|Fa:|Fa =/.test(t) || /useLocale/.test(t);
  const tieneEn = /\bEn:|nameEn|tituloEn|textoEn|En =/.test(t);
  if (tieneFa) conFa++;
  if (tieneEn) conEn++; else sinIngles.push(s);
  if (!/useLocale/.test(t)) soloHardcode++;
}
console.log(`   páginas: ${slugs.length}`);
console.log(`      FA  ${bar(conFa, slugs.length)}`);
console.log(`      EN  ${bar(conEn, slugs.length)}`);
if (sinIngles.length) {
  errores += sinIngles.length;
  console.log(`   ❌ sin contenido inglés (caen a español en /en): ${sinIngles.length}`);
  console.log(`      ${sinIngles.slice(0, 12).join(", ")}${sinIngles.length > 12 ? " …" : ""}`);
}
if (soloHardcode) console.log(`   ⚠️  ${soloHardcode} página(s) sin useLocale (texto fijo, no reaccionan al idioma).`);

// ── CAPA 4 · SLUGS LOCALIZADOS ───────────────────────────────────────────
console.log("\n④ SLUGS LOCALIZADOS  ·  i18n/routing.ts");
const routing = read("i18n/routing.ts");
const pathnameKeys = [...routing.matchAll(/"(\/[a-z0-9-]+)":\s*\{/g)].map((m) => m[1]);
const rutasPublicas = readdirSync(join(ROOT, "app", "[locale]"))
  .filter((n) => {
    const p = join(ROOT, "app", "[locale]", n);
    return statSync(p).isDirectory() && !n.startsWith("_") && !["admin", "api"].includes(n);
  });
const compartenSlug = rutasPublicas.filter((r) => !pathnameKeys.includes(`/${r}`));
console.log(`   rutas públicas: ${rutasPublicas.length} · con slug localizado por idioma: ${pathnameKeys.length}`);
console.log(`      ${pathnameKeys.join(", ") || "(ninguna)"}`);
if (compartenSlug.length) {
  avisos += 0; // informativo: no todas las rutas NECESITAN slug traducido
  console.log(`   ℹ️  comparten el slug español en los 3 idiomas (${compartenSlug.length}):`);
  console.log(`      ${compartenSlug.join(", ")}`);
}

// ── CAPA 5 · ARQUITECTURA i18n (mezcla en el CÓDIGO, no en los datos) ─────
console.log("\n⑤ ARQUITECTURA i18n  ·  app/ + components/");

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) { if (e !== "node_modules") walk(p, acc); }
    else if (/\.(ts|tsx)$/.test(e)) acc.push(p);
  }
  return acc;
}
const codeFiles = [...walk(join(ROOT, "app")), ...walk(join(ROOT, "components"))];
const rel = (f) => f.replace(ROOT + "/", "");

// A) Ternarios binarios de CONTENIDO: fa ? «fa» : «es» (la mezcla silenciosa).
//    Excluye dirección (rtl/ltr) y flechas de una vía — eso es RTL legítimo.
const BIN = /(?:\blocale\s*===\s*"fa"|\bfa)\s*\?\s*(["'][^"']*["'])\s*:\s*(["'][^"']*["'])/g;
const DIR_ONLY = /^["'](rtl|ltr|→|←|»|«|↗|↘)["']$/;
let binTotal = 0;
const binFiles = {};
for (const f of codeFiles) {
  const txt = readFileSync(f, "utf8");
  let m, n = 0;
  BIN.lastIndex = 0;
  while ((m = BIN.exec(txt))) {
    if (DIR_ONLY.test(m[1]) || DIR_ONLY.test(m[2])) continue;
    n++;
  }
  if (n) { binFiles[rel(f)] = n; binTotal += n; }
}
console.log(`   ternarios binarios de contenido (fa ? «fa» : «es»): ${binTotal}`);
if (binTotal) {
  const top = Object.entries(binFiles).sort((a, b) => b[1] - a[1]).slice(0, 8);
  for (const [f, n] of top) console.log(`      ${String(n).padStart(3)}  ${f}`);
  const resto = Object.keys(binFiles).length - top.length;
  if (resto > 0) console.log(`      … y ${resto} archivo(s) más (migrar a tri()/messages)`);
}

// B) tri()/triList() de i18nContent SIN TranslationBadge (fallback mudo). Solo
//    cuenta el tri() que PUEDE caer al español marcado (el de @/lib/i18n/i18nContent),
//    no helpers locales trilingües que siempre dan los 3 idiomas.
const sinBadge = [];
for (const f of codeFiles) {
  const txt = readFileSync(f, "utf8");
  const usaTriContent = /from\s+["']@\/lib\/i18n\/i18nContent["']/.test(txt) && /\b(tri|triList)\b/.test(txt);
  if (usaTriContent && !/TranslationBadge/.test(txt)) sinBadge.push(rel(f));
}
console.log(`   fallback sin badge (tri() de i18nContent sin TranslationBadge): ${sinBadge.length}`);
if (sinBadge.length) { avisos += sinBadge.length; sinBadge.forEach((f) => console.log(`      ⚠️  ${f}`)); }

// C) SEO: generateMetadata por locale en el layout (no estática en español).
const seoOk = /generateMetadata/.test(read("app/[locale]/layout.tsx"));
console.log(`   SEO metadata por locale en layout: ${seoOk ? "✅ presente" : "❌ falta"}`);
if (!seoOk) errores += 1;

// D) Rutas FUERA de [locale] (que se saltan el idioma).
const fueraLocale = readdirSync(join(ROOT, "app")).filter((n) => {
  const p = join(ROOT, "app", n);
  return statSync(p).isDirectory() && !["[locale]", "api"].includes(n) && !n.startsWith("_");
});
console.log(`   rutas fuera de [locale]: ${fueraLocale.length ? fueraLocale.join(", ") : "ninguna ✅"}`);
if (fueraLocale.length) avisos += fueraLocale.length;

// ── RESUMEN ──────────────────────────────────────────────────────────────
console.log("\n══════════════════════════════════════════════════════════════");
if (errores === 0 && avisos === 0) {
  console.log("  ✅ SIN MEZCLA: los tres idiomas están completos y sin fugas.");
  console.log("══════════════════════════════════════════════════════════════\n");
  process.exit(0);
}
console.log(`  RESUMEN:  ❌ ${errores} hueco(s) de INGLÉS   ·   ⚠️ ${avisos} aviso(s) (farsi/fugas)`);
console.log("  El inglés es hoy la mayor fuente de mezcla: el contenido curado");
console.log("  cae a español cuando el idioma activo es /en.");
console.log("══════════════════════════════════════════════════════════════\n");
process.exit(STRICT ? 1 : errores > 0 ? 1 : 0);
