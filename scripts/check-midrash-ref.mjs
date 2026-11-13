#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DE LA PUERTA DEL MIDRASH
 * ─────────────────────────────────────────────────────────────────────────
 *  Decide qué método usa el motor: si el lector ABRIÓ un midrash, el estudio
 *  es el análisis midráshico ampliado; si solo está leyendo una parashá, el
 *  método normal de PaRDeS con el bloque compacto. Una puerta mal puesta se
 *  nota en el estudio entero, así que se comprueba por los dos lados:
 *
 *  1. QUE LA LISTA SIGA SIENDO LA ESTANTERÍA. Las obras están escritas a mano
 *     en lib/sources/midrashRef.ts para no cargar el catálogo entero en el
 *     motor. Aquí se cotejan con la estantería «Midrash» de verdad: si Sefaria
 *     añade o quita una obra, esto protesta en vez de callar.
 *
 *  2. QUE LA PUERTA NO SE EQUIVOQUE. Referencias que SON midrash y tienen que
 *     entrar; y referencias que empiezan igual pero NO lo son —«Bereshit 1:1»
 *     frente a «Bereshit Rabbah 1:1»— que tienen que quedarse fuera.
 *
 *  Uso:  npm run midrashref:check
 * ─────────────────────────────────────────────────────────────────────────
 */
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), "..", "/")).href;
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith("@/")) return next(new URL(`${spec.slice(2)}.ts`, ROOT).href, ctx);
    return next(spec, ctx);
  },
});

const { esRefDeMidrash, OBRAS_MIDRASH } = await import("@/lib/sources/midrashRef");
const { CATALOG } = await import("@/lib/sources/catalog.generated");

let errores = 0;

// ── 1. La lista contra la estantería real ─────────────────────────────────
console.log("── LA LISTA ES LA ESTANTERÍA ──");
const estante = CATALOG.find((g) => g.id === "Midrash");
if (!estante) {
  errores++;
  console.log("  ✗ no encuentro la estantería «Midrash» en el catálogo");
} else {
  const reales = new Set(estante.subs.flatMap((s) => s.books.map((b) => b.id)));
  const nuestras = new Set(OBRAS_MIDRASH);
  const faltan = [...reales].filter((x) => !nuestras.has(x));
  const sobran = [...nuestras].filter((x) => !reales.has(x));
  for (const f of faltan) {
    errores++;
    console.log(`  ✗ está en el catálogo y NO en la lista: ${f}`);
  }
  for (const s of sobran) {
    errores++;
    console.log(`  ✗ está en la lista y NO en el catálogo: ${s}`);
  }
  if (faltan.length === 0 && sobran.length === 0) {
    console.log(`  ✓ las ${reales.size} obras de la estantería, ni una más ni una menos`);
  }
}

// ── 2. La puerta ──────────────────────────────────────────────────────────
const ENTRAN = [
  "Bereshit Rabbah 39:1",
  "Bereshit Rabbah 1:10",
  "Shemot Rabbah 2:5",
  "Eikhah Rabbah, Petichta 24",
  "Midrash Tanchuma, Lech Lecha 3",
  "Midrash Tanchuma Buber, Vaetchanan 6",
  "Pirkei DeRabbi Eliezer 3",
  "Pesikta DeRav Kahana 12:25",
  "Sifrei Devarim 343",
  "Sifra, Kedoshim 4:12",
  "Mekhilta DeRabbi Yishmael 14:19",
  "Yalkut Shimoni on Torah 16",
  "Ruth Rabbah 5:9",
  "Ruth Rabbah (Lerner) 1:1",
  "Ein Yaakov, Berakhot 1:1",
  "בראשית רבה א׳:י׳",
  "Bereshit Rabbah",
];

// Las que empiezan parecido y NO deben entrar: el daño de colarse es un
// estudio que disecciona un mashal donde no hay ninguno.
const NO_ENTRAN = [
  "Bereshit 1:1",
  "Shemot 3:2",
  "Shir HaShirim 1:1",
  "Ruth 1:16",
  "Esther 3:1",
  "Kohelet 1:2",
  "Berakhot 2a",
  "Zohar 1:15a",
  "Tanya, Likutei Amarim 1",
  "Mishlei 25:11",
  "Devarim 6:4",
  "Sifrei",       // sin obra: ni Bamidbar ni Devarim
  "Midrash",      // el nombre genérico no es una referencia
  "",
  undefined,
  null,
];

console.log("\n── REFERENCIAS QUE SON MIDRASH (deben entrar) ──");
for (const ref of ENTRAN) {
  if (esRefDeMidrash(ref)) {
    console.log(`  ✓ ${ref}`);
  } else {
    errores++;
    console.log(`  ✗ SE QUEDÓ FUERA: ${ref}`);
  }
}

console.log("\n── REFERENCIAS QUE NO LO SON (no deben entrar) ──");
for (const ref of NO_ENTRAN) {
  if (!esRefDeMidrash(ref)) {
    console.log(`  ✓ fuera: ${ref === "" ? "(vacío)" : String(ref)}`);
  } else {
    errores++;
    console.log(`  ✗ SE COLÓ: ${String(ref)}`);
  }
}

if (errores > 0) {
  console.error(`\n✗ ${errores} fallo(s) en la puerta del midrash.`);
  process.exit(1);
}
console.log(
  `\n✓ ${OBRAS_MIDRASH.length} obras cotejadas con el catálogo · ` +
    `${ENTRAN.length} referencias de midrash reconocidas · ${NO_ENTRAN.length} ajenas rechazadas.`
);
