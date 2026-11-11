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

  // ── Frases reales del motor que el verificador llegó a marcar siendo
  // correctas. Un falso positivo tacha trabajo bueno delante del lector, así
  // que estas se quedan aquí como memoria de cada fallo ya corregido.

  // El nombre de una letra vale la letra (יוד = 10) O su milui (= 20). Las dos
  // lecturas son legítimas; antes solo se perdonaba la de los paréntesis.
  "Corrección obligada: יוד = 10 , עַיִן = 70 , קוף = 100 , בֵּית = 2",
  "יוד (10) + עַיִן (70) + קוף (100) + בֵּית (2) = **182**",
  "יוד (10) + הֵא (5) = **15**, y אָלֶף = 1, לָמֶד = 30, וָו = 6",

  // Multiplicación y resta: sin entenderlas, el parser cortaba la expresión y
  // juzgaba el pedazo ("840 = 40").
  "El total de תולדת = 400+6+30+4+400 = **840**. Y 840 = 40 × 21.",
  "Los maestros señalan que 182 = 7 × 26, siendo 26 la guematría del Tetragrama",
  "La diferencia entre las dos partes es **436 − 404 = 32**, el valor de לֵב",
  "del valor faltante: 248 − 243 = **5**, el valor de la Hei",
  "יִשְׂרָאֵל = **541**. יַעֲקֹב = **182**. La diferencia: 541 − 182 = **359**",

  // Deletreo con guiones: las letras se SUMAN, no se restan.
  "Además, א-ב-ר-ה-מ = 1+2+200+5+40 = **248**",

  // Valor pegado sin paréntesis: no se juzga, pero tampoco se marca.
  "- **עָקֹב** = lo torcido (172 = עַיִן 70 + קוף 100 + בֵּית 2)",

  // Lista de valores declarados: el "=" rotula cada letra, no encadena una
  // ecuación. Leída como ecuación corrida no cuadra nunca.
  "el valor de *עֵקֶב* (ע = 70 + ק = 100 + ב = 2 = **172**)",
  "el Nombre de cuatro letras (י=10 + ה=5 + ו=6 + ה=5 = **26**)",

  // Paréntesis con una CUENTA dentro: es una operación aparte, no un rótulo
  // que diga cuánto vale la palabra de delante.
  "El Ba'al HaTurim señala que יַעֲקֹב = 182 = 7 × יְהוָה (7 × 26 = 182)",

  // Exponente en superíndice: no se sabe leer una potencia, así que se deja
  // pasar entera en vez de juzgar "3 × 3" y marcar una cuenta correcta.
  "El número **243** = **3 × 81** = **3 × 3⁴**, el tres multiplicado",
];

// ── Banco 2: fabricaciones que hay que cazar. ──────────────────────────────
const FABRICACIONES = [
  "אֱלֹהִים = 1+30+5+10+40 = 85",
  "אֱלֹהִים = 90",
  "מִי (50) + אֵלֶּה (40) = 90 = אֱלֹהִים",
  "שָׂרַי = 500",
  "פרץ = 105",
  // Entender la multiplicación y la resta no es solo evitar falsos positivos:
  // también deja cazar el producto o la diferencia inventados.
  "840 = 40 × 22",
  "248 − 243 = 6",
  "א-ב-ר-ה-מ = 1+2+200+5+40 = **249**",
  "יוד = 11",
  // La lista de valores se juzga, no se perdona: si un rótulo o el total
  // están mal, se caza igual.
  "(ע = 71 + ק = 100 + ב = 2 = **173**)",
  "(ע = 70 + ק = 100 + ב = 2 = **180**)",
  "יַעֲקֹב = 182 = 7 × יְהוָה (7 × 26 = 180)",
  "מִי (Quién = 60) = Biná, el mundo oculto",
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
