#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GENERADOR DE METADATA POR ESTUDIO  (/misterio/{slug})
 * ─────────────────────────────────────────────────────────────────────────
 *  Las páginas de misterio son componentes de cliente ("use client"), así que
 *  no pueden exportar `generateMetadata`. Este script escribe, en la carpeta de
 *  cada estudio, un `layout.tsx` mínimo que sí la exporta y delega en
 *  lib/content/misterioMetadata.ts (título, descripción, canonical y OG).
 *
 *  Reglas:
 *    · Solo genera para slugs REGISTRADOS en lib/content/misterios.ts.
 *      Las carpetas que aún no están en el catálogo (estudios en construcción)
 *      se saltan limpiamente y se reportan.
 *    · Es idempotente: reescribe únicamente los archivos que llevan la marca
 *      de generado. Un layout escrito a mano NUNCA se toca.
 *    · No toca app/[locale]/misterio/layout.tsx (el layout compartido con el
 *      tutor flotante y el aviso de traducción).
 *
 *  Uso:  node scripts/gen-misterio-metadata.mjs        (escribe)
 *        node scripts/gen-misterio-metadata.mjs --check (solo reporta; CI)
 * ─────────────────────────────────────────────────────────────────────────
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MISTERIO_DIR = join(ROOT, "app", "[locale]", "misterio");
const CATALOGO = join(ROOT, "lib", "content", "misterios.ts");

const MARCA = "@generado por scripts/gen-misterio-metadata.mjs";
const soloCheck = process.argv.includes("--check");

function plantilla(slug) {
  return `// ${MARCA} — no editar a mano (se reescribe).
// Metadata del estudio /misterio/${slug}: título, descripción, canonical,
// hreflang e imagen de compartir, en el idioma de la ruta (es · fa · en).
// El texto sale del catálogo lib/content/misterios.ts — aquí no hay contenido.
import type { Metadata } from "next";
import { metadataDeMisterio } from "@/lib/content/misterioMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadataDeMisterio("${slug}", locale);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
}

// 1. Slugs del catálogo.
const catTxt = readFileSync(CATALOGO, "utf8");
const slugs = [...catTxt.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
if (!slugs.length) {
  console.error("❌ No pude leer ningún slug de lib/content/misterios.ts");
  process.exit(1);
}

// 2. Carpetas existentes.
const carpetas = readdirSync(MISTERIO_DIR).filter((n) =>
  statSync(join(MISTERIO_DIR, n)).isDirectory(),
);
const setSlugs = new Set(slugs);

const escritos = [];
const iguales = [];
const aMano = [];
const sinPagina = [];
const faltantes = [];

for (const slug of slugs) {
  const dir = join(MISTERIO_DIR, slug);
  if (!existsSync(join(dir, "page.tsx"))) {
    sinPagina.push(slug);
    continue;
  }
  const destino = join(dir, "layout.tsx");
  const nuevo = plantilla(slug);

  if (existsSync(destino)) {
    const actual = readFileSync(destino, "utf8");
    if (!actual.includes(MARCA)) {
      aMano.push(slug); // layout propio: se respeta
      continue;
    }
    if (actual === nuevo) {
      iguales.push(slug);
      continue;
    }
  }
  if (soloCheck) {
    faltantes.push(slug);
    continue;
  }
  writeFileSync(destino, nuevo, "utf8");
  escritos.push(slug);
}

// 3. Carpetas que aún no están en el catálogo (p. ej. estudios en construcción).
const noRegistradas = carpetas.filter((c) => !setSlugs.has(c));

console.log(`\n🪄  Metadata de misterios — catálogo: ${slugs.length} · carpetas: ${carpetas.length}\n`);
if (escritos.length) console.log(`   ✅ escritos/actualizados: ${escritos.length}`);
if (iguales.length) console.log(`   ⏭️  ya al día: ${iguales.length}`);
if (aMano.length) console.log(`   ✋ layout propio (no se toca): ${aMano.join(", ")}`);
if (sinPagina.length) console.log(`   ⚠️  en el catálogo pero sin page.tsx: ${sinPagina.join(", ")}`);
if (noRegistradas.length)
  console.log(`   ⏳ carpetas sin registrar en el catálogo (se saltan): ${noRegistradas.join(", ")}`);

if (soloCheck && faltantes.length) {
  console.log(`\n❌ Faltan por generar: ${faltantes.join(", ")}`);
  console.log("   Corre: node scripts/gen-misterio-metadata.mjs\n");
  process.exit(1);
}
console.log("");
