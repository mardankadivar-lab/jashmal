#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PORTADOR DE LA SERIE "14 ESTACIONES DEL VIAJE DE LA CREACIÓN"
 * ─────────────────────────────────────────────────────────────────────────
 *  Lee los 14 .md fuente (escritos y verificados por el Sofer) desde el
 *  Desktop, NORMALIZA su formato heterogéneo (unos traen frontmatter YAML,
 *  otros un preámbulo "# Estación N — …" + gancho) y deja la serie
 *  SELF-CONTAINED dentro del repo:
 *
 *    - lib/content/estaciones/<slug>.md   — solo el cuerpo del estudio (las 7
 *      secciones), sin frontmatter ni título-preámbulo. Listo para renderizar.
 *    - lib/content/estaciones.generated.ts — metadata + el markdown embebido
 *      como string (para que las páginas server-component lo importen sin tocar
 *      el sistema de archivos en runtime / Vercel).
 *
 *  Se corre UNA vez en local y se commitea la salida. NO se ejecuta en build.
 *
 *  Uso:  node scripts/port-estaciones.mjs
 * ─────────────────────────────────────────────────────────────────────────
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR =
  "/Users/mardan/Desktop/Claude Jashmal/Contenido/14-Estaciones";
const OUT_MD_DIR = join(ROOT, "lib", "content", "estaciones");
const OUT_TS = join(ROOT, "lib", "content", "estaciones.generated.ts");

// Metadata canónica de las 14 estaciones. El hebreo, la transliteración y la
// traducción salen del frontmatter/título de cada archivo (verificados por el
// Sofer). La `esencia` (una línea para el hub) y el `color` los fija el
// proyecto; ten cuidado: el orden ES el viaje (descenso 1→14).
const META = [
  { n: 1,  slug: "ein-sof",            he: "אֵין סוֹף",          tr: "Ein Sof",            es: "Sin-Fin / el Infinito",                          esencia: "Lo Divino antes de todo mundo: un nombre que solo niega — “Sin-Fin”.", color: "#c9a43e" },
  { n: 2,  slug: "or-ein-sof",         he: "אוֹר אֵין סוֹף",     tr: "Or Ein Sof",         es: "La Luz del Infinito",                            esencia: "El silencio infinito no estaba vacío: estaba a punto de darse como Luz.", color: "#f0d060" },
  { n: 3,  slug: "tzimtzum",           he: "צִמְצוּם",           tr: "Tzimtzum",           es: "Contracción / Repliegue",                        esencia: "Para que hubiera un “otro”, lo Infinito se retiró y dejó sitio.", color: "#9a6a8e" },
  { n: 4,  slug: "jalal-panui",        he: "חָלָל פָּנוּי",       tr: "Jalal Panui",        es: "El Hueco / el Espacio Vacío",                    esencia: "El vacío que el retiro abrió: el primer lugar donde un mundo podía existir.", color: "#6a7fae" },
  { n: 5,  slug: "reshimu",            he: "רְשִׁימוּ",          tr: "Reshimu",            es: "Residuo / Impronta / Huella",                    esencia: "Tras el retiro quedó una huella de luz: nada está jamás del todo vacío.", color: "#8a9ec0" },
  { n: 6,  slug: "kav",                he: "קַו",               tr: "Kav",                es: "El Rayo / la Línea",                             esencia: "Lo Infinito vuelve a entrar como un solo hilo: la dosis exacta que un mundo soporta.", color: "#e0b84e" },
  { n: 7,  slug: "adam-kadmon",        he: "אָדָם קַדְמוֹן",      tr: "Adam Kadmón",        es: "El Hombre Primordial",                           esencia: "El plano maestro de todo lo que existiría, con forma de Hombre de luz.", color: "#d0a0c0" },
  { n: 8,  slug: "akudim",             he: "עֲקֻדִּים",          tr: "Akudim",             es: "Los Atados / Ligados",                           esencia: "Diez fuerzas en un solo vaso: unidad sin conflicto, diferencia sin separación.", color: "#7fc0a0" },
  { n: 9,  slug: "nekudim",            he: "נְקֻדִּים",          tr: "Nekudim",            es: "Los Puntuales / Punteados",                      esencia: "Cada fuerza quiso brillar sola: el aislamiento, primera grieta del mundo.", color: "#c08a8a" },
  { n: 10, slug: "shevirat-hakelim",   he: "שְׁבִירַת הַכֵּלִים", tr: "Shevirat HaKelim",   es: "La Ruptura de los Recipientes",                  esencia: "Los vasos no resistieron la luz y se quebraron: la catástrofe primordial.", color: "#c0504e" },
  { n: 11, slug: "nitzotzot",          he: "נִיצוֹצוֹת",         tr: "Nitzotzot",          es: "Las Chispas",                                    esencia: "Al romperse, la luz cayó en fragmentos: chispas atrapadas en la materia.", color: "#f0c850" },
  { n: 12, slug: "tikun",              he: "תִּיקּוּן",          tr: "Tikún",              es: "Rectificación / Reparación",                     esencia: "Recoger las chispas y reordenar lo roto: la lenta reparación del mundo.", color: "#6ec0a0" },
  { n: 13, slug: "cuatro-mundos",      he: "אֲצִילוּת בְּרִיאָה יְצִירָה עֲשִׂיָּה", tr: "Atzilut · Beriá · Yetzirá · Asiá", es: "Los Cuatro Mundos (אבי\"ע)", esencia: "Cuatro filtros que bajan una luz imposible hasta hacerla habitable. Vives en el último.", color: "#8aa0d0" },
  { n: 14, slug: "participacion-humana", he: "תִּיקּוּן עוֹלָם",  tr: "Tikún Olam · Avodá", es: "La Participación Humana",                        esencia: "El final no está escrito: la última pieza del universo la pones tú.", color: "#e0c060" },
];

// Mapa archivo-fuente por slug.
const FILES = {
  "ein-sof": "estacion-01-ein-sof.md",
  "or-ein-sof": "estacion-02-or-ein-sof.md",
  "tzimtzum": "estacion-03-tzimtzum.md",
  "jalal-panui": "estacion-04-jalal-panui.md",
  "reshimu": "estacion-05-reshimu.md",
  "kav": "estacion-06-kav.md",
  "adam-kadmon": "estacion-07-adam-kadmon.md",
  "akudim": "estacion-08-akudim.md",
  "nekudim": "estacion-09-nekudim.md",
  "shevirat-hakelim": "estacion-10-shevirat-hakelim.md",
  "nitzotzot": "estacion-11-nitzotzot.md",
  "tikun": "estacion-12-tikun.md",
  "cuatro-mundos": "estacion-13-cuatro-mundos.md",
  "participacion-humana": "estacion-14-participacion-humana.md",
};

/**
 * Devuelve solo el CUERPO del estudio: desde la primera sección "## … תַּרְגּוּם"
 * en adelante. Descarta frontmatter YAML, el título "# Estación N — …", la
 * glosa/gancho y los separadores del preámbulo. Así el cuerpo es uniforme
 * sin importar el formato del archivo fuente.
 */
function extractBody(raw) {
  // El cuerpo empieza en la primera línea "## ... תַּרְגּוּם".
  const lines = raw.split("\n");
  const startIdx = lines.findIndex((l) => /^##\s+.*תַּרְגּוּם/.test(l));
  if (startIdx === -1) {
    throw new Error("No se encontró la sección תַּרְגּוּם");
  }
  let body = lines.slice(startIdx).join("\n").trim();

  // Normaliza los títulos de sección: quita el "N. " inicial (estaciones 13-14)
  // para que el render no dependa de numeración manual.
  body = body.replace(/^##\s+\d+\.\s+/gm, "## ");

  return body + "\n";
}

if (!existsSync(OUT_MD_DIR)) mkdirSync(OUT_MD_DIR, { recursive: true });

const records = [];
for (const m of META) {
  const file = FILES[m.slug];
  const raw = readFileSync(join(SRC_DIR, file), "utf8");
  const body = extractBody(raw);
  writeFileSync(join(OUT_MD_DIR, `${m.slug}.md`), body, "utf8");
  records.push({ ...m, body });
  console.log(`✔ ${String(m.n).padStart(2, "0")} ${m.slug} (${body.length} chars)`);
}

// Genera el módulo TS con metadata + cuerpo embebido. Usamos backticks con
// escape mínimo para que el cuerpo viaje como string sin tocar el FS en runtime.
function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const ts = `// ⚠️ GENERADO por scripts/port-estaciones.mjs — NO editar a mano.
// Serie "14 Estaciones del Viaje de la Creación" — contenido del Sofer,
// portado al repo para que las páginas sean self-contained (sin leer el FS).
import type { Estacion } from "./estaciones";

export const ESTACIONES_DATA: Estacion[] = [
${records
  .map(
    (r) => `  {
    numero: ${r.n},
    slug: ${JSON.stringify(r.slug)},
    hebreo: ${JSON.stringify(r.he)},
    transliteracion: ${JSON.stringify(r.tr)},
    traduccion: ${JSON.stringify(r.es)},
    esencia: ${JSON.stringify(r.esencia)},
    color: ${JSON.stringify(r.color)},
    markdown: \`${esc(r.body)}\`,
  },`
  )
  .join("\n")}
];
`;

writeFileSync(OUT_TS, ts, "utf8");
console.log(`\n✅ ${records.length} estaciones portadas → lib/content/estaciones/ + estaciones.generated.ts\n`);
