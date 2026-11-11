#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL VERIFICADOR DE «ANALIZAR CON EL ZOHAR»
 * ─────────────────────────────────────────────────────────────────────────
 *  Dos bancos de prueba:
 *
 *  1. CANÓNICOS — frases escritas a mano en el prompt de
 *     app/api/zohar-methods/route.ts, verificadas por el Sofer. Son correctas.
 *     Si el verificador marca alguna, EL VERIFICADOR ESTÁ MAL. Es la prueba
 *     más importante: un falso positivo (marcar una cita o una suma que sí
 *     son buenas) destruye la confianza del lector en el material bueno, que
 *     aquí es la mayoría.
 *
 *  2. FABRICACIONES — cifras y folios falsos puestos a mano. El verificador
 *     tiene que cazarlos todos.
 *
 *  Uso:  npm run zohar:check
 *  Sale con código ≠ 0 si falla cualquiera de los dos bancos.
 *  No usa red: la verificación entera es local (tablas en lib/sources).
 * ─────────────────────────────────────────────────────────────────────────
 */
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

// Resuelve los imports "@/..." del proyecto igual que lo hace Next.
const ROOT = pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), "..", "/")).href;
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith("@/")) return next(new URL(`${spec.slice(2)}.ts`, ROOT).href, ctx);
    return next(spec, ctx);
  },
});

const { checkArithmetic } = await import("@/lib/sources/gematriaClaims");
const { checkCitations } = await import("@/lib/sources/citationCheck");

// ── Banco 1: lo que el prompt afirma a mano. Todo esto es correcto. ─────────
const CANONICOS = [
  "מִי (Quién = 50) = Biná, el mundo oculto, las 50 puertas de la comprensión",
  "אֵלֶּה (Estos = 36) = el mundo revelado, las sefirot manifiestas",
  "מִי (50) + אֵלֶּה (36) = 86 = אֱלֹהִים ✓ (la guematría confirma la unión)",
  "La יוד (=10) de Sarai se divide en dos הֵא (5+5).",
  "יהוה = הָיָה הֹוֶה וְיִהְיֶה (era, es y será).",
  "בְּרֵאשִׁית contiene בְּרִית (alianza); ב+ת = בַּת (hija, la Shejiná)",
  "los cuatro miluim del Nombre (Av=72, Sag=63, Mah=45, Ban=52)",
  "בְּהִבָּרְאָם (Behibaram, Génesis 2:4) → אַבְרָהָם (Abraham)",
  "אַבְרָם → אַבְרָהָם: Dios añade ה (Hei=5) del Nombre. Zohar Lej Lejá.",
  "יַעֲקֹב → יִשְׂרָאֵל: añade א-ל, reorganiza. Zohar Vayishlaj 170a.",
  "הוֹשֵׁעַ → יְהוֹשֻׁעַ: Moshé añade י del Nombre. Talmud Sotá 34b; Zohar Shelaj.",
  "le fue restituida en Pinjás. Zohar Pinjás 226b.",
  "abandonaron Tu alianza — Reyes I 19:14",
  "El versículo de Isaías 40:26 pregunta: מִי בָרָא אֵלֶּה",
  "Caso paradigmático (Zóhar Bereishit 1b, Parashat Bereshit)",
  "El Midrash Rabbah (Bereishit 63:8) ya intuye esta lectura.",
  "El Talmud Yerushalmi Berajot 150a lo discute.",
  "יִצְחָק: lleva la Yud de Sarai incrustada. Zohar Vayera.",
  "בֶּן אוֹנִי → בִּנְיָמִין: Rachel nombra desde el dolor. Zohar Vayishlaj.",
  "צָפְנַת פַּעְנֵחַ: nombre egipcio de Yosef. Zohar Miketz.",
];

// ── Banco 2: fabricaciones que hay que cazar. ──────────────────────────────
const FABRICACIONES = [
  "אֱלֹהִים = 1+30+5+10+40 = 85",
  "אֱלֹהִים = 90",
  "מִי (50) + אֵלֶּה (40) = 90 = אֱלֹהִים",
  "שָׂרַי = 500",
  "פרץ = 105",
  "Zohar Pinjás 12b lo explica",
  "Zohar Vayishlaj 40a",
  "Zóhar Lej Lejá 300b",
  "Talmud Sotá 99b",
  "Berajot 150a",
  "Génesis 99:4",
  "Génesis 2:400",
  "Isaías 400:26",
];

function judge(line) {
  const a = checkArithmetic(line);
  const c = checkCitations(line);
  return [
    ...a.findings.map((f) => ({ v: f.verdict, s: `suma «${f.raw}» → ${f.truth || "cuadra"}` })),
    ...c.findings.map((f) => ({ v: f.verdict, s: `cita «${f.raw}» → ${f.detail}` })),
  ];
}

let errores = 0;

console.log("── CANÓNICOS (ninguno debe marcarse) ──");
for (const line of CANONICOS) {
  const all = judge(line);
  const bad = all.filter((x) => x.v === "false");
  if (bad.length > 0) {
    errores++;
    console.log(`  ✗ FALSO POSITIVO: ${line}`);
    for (const x of bad) console.log(`      ${x.s}`);
  } else {
    const ok = all.filter((x) => x.v === "ok").length;
    console.log(`  ✓ ${ok > 0 ? `(${ok} verificada${ok > 1 ? "s" : ""}) ` : ""}${line.slice(0, 54)}`);
  }
}

console.log("\n── FABRICACIONES (todas deben cazarse) ──");
for (const line of FABRICACIONES) {
  const all = judge(line);
  const bad = all.filter((x) => x.v === "false");
  if (bad.length === 0) {
    errores++;
    console.log(`  ✗ SE ESCAPÓ: ${line}`);
  } else {
    console.log(`  ✓ cazada: ${bad[0].s}`);
  }
}

if (errores > 0) {
  console.error(`\n✗ ${errores} fallo(s) en el verificador.`);
  process.exit(1);
}
console.log(`\n✓ ${CANONICOS.length} canónicos limpios y ${FABRICACIONES.length} fabricaciones cazadas.`);
