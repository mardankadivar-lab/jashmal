#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GENERADOR DE LOS ESTUDIOS DEL PODCAST
 * ─────────────────────────────────────────────────────────────────────────
 *  Hermano de scripts/port-estaciones.mjs: embute el cuerpo de cada estudio
 *  en un módulo TypeScript para que las páginas sean self-contained y no haya
 *  que leer del disco en tiempo de ejecución (en Vercel el `fs` de una ruta
 *  estática es una fuente de sorpresas; esto lo evita de raíz).
 *
 *  ENTRADA   content/podcast/<slug>.md          — el guion del Sofer, VERBATIM
 *            content/podcast/<slug>.fuentes.md  — las fuentes ya publicadas
 *  SALIDA    lib/content/podcast-estudios.generated.ts
 *
 *  REGLA DURA: este script NO edita el contenido. Copia el texto tal cual.
 *  Si un guion tiene un problema de fuentes, eso lo arregla el Sofer en
 *  producción y se vuelve a importar; aquí no se toca una coma.
 *
 *  Uso:  npm run podcast:gen
 * ─────────────────────────────────────────────────────────────────────────
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "content", "podcast");
const SALIDA = join(ROOT, "lib", "content", "podcast-estudios.generated.ts");

const archivos = readdirSync(DIR)
  .filter((n) => n.endsWith(".md") && !n.endsWith(".fuentes.md"))
  .sort();

const estudios = archivos.map((nombre) => {
  const slug = nombre.replace(/\.md$/, "");
  const markdown = readFileSync(join(DIR, nombre), "utf8").trim();
  let fuentes = "";
  try {
    fuentes = readFileSync(join(DIR, `${slug}.fuentes.md`), "utf8").trim();
  } catch {
    fuentes = "";
  }
  return { slug, markdown, fuentes };
});

const cabecera = `// ─────────────────────────────────────────────────────────────────────────
//  GENERADO — no editar a mano.
// ─────────────────────────────────────────────────────────────────────────
//  Lo produce scripts/gen-podcast-estudios.mjs a partir de content/podcast/.
//  Para cambiar un estudio: edítalo en producción (lo hace el Sofer), vuelve a
//  importarlo a content/podcast/ y corre \`npm run podcast:gen\`.
// ─────────────────────────────────────────────────────────────────────────

export type PodcastEstudioData = {
  /** Mismo slug que el episodio en lib/content/podcast.ts. */
  slug: string;
  /** Cuerpo del estudio, tal como lo escribió el Sofer. */
  markdown: string;
  /** Fuentes citadas, tal como se publicaron con el episodio. */
  fuentes: string;
};

export const PODCAST_ESTUDIOS_DATA: PodcastEstudioData[] = `;

writeFileSync(SALIDA, cabecera + JSON.stringify(estudios, null, 2) + ";\n");

const letras = estudios.reduce((n, e) => n + e.markdown.length, 0);
console.log(
  `✓ ${estudios.length} estudios embebidos (${Math.round(letras / 1024)} KB de texto) → lib/content/podcast-estudios.generated.ts`,
);
for (const e of estudios) {
  console.log(`  · ${e.slug}${e.fuentes ? "" : "   (sin bloque de fuentes)"}`);
}
