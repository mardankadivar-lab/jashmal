#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL MIDRASH DISECCIONADO
 * ─────────────────────────────────────────────────────────────────────────
 *  El motor tiene que ABRIR el midrash, no citarlo bonito: nombrar la grieta
 *  del versículo, mostrar el mecanismo (el hueco, el desajuste, el giro) y
 *  cerrar diciendo qué queda abierto. Su inercia es la contraria — resumir y
 *  rematar con una moraleja que podría escribirse sin el midrash.
 *
 *  Este guardián prueba el MEDIDOR, no al modelo: que sepa distinguir un
 *  bloque bien hecho de uno aplanado. Dos bancos:
 *
 *  1. BLOQUES BIEN HECHOS — el patrón escrito por el Sofer aplicando el
 *     método, y la variante sin parábola. No deben tener ni un problema.
 *
 *  2. BLOQUES DEGRADADOS — el mismo bloque al que se le quitó justo la pieza
 *     que lo sostiene. Cada uno debe cazarse por su problema concreto, no por
 *     cualquiera: si se cae la línea del desajuste, el medidor tiene que decir
 *     que falta ESA.
 *
 *  Y un tercer banco: prosa normal de estudio, donde no hay disección. El
 *  medidor debe callar, no inventarse un bloque ausente.
 *
 *  Uso:  npm run bloque:check
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

const { checkMidrashBlock } = await import("@/lib/study/midrashBlock");

// ── El patrón: la zarza, diseccionada por el Sofer con el método entero. ───
const ZARZA = `**Midrash al desnudo · Shemot Rabá 2:5**

**La grieta.** La revelación ya estaba descrita: un ángel, una llama. La especie
del arbusto no hacía falta. Y sin embargo el versículo dice "desde dentro de la
zarza" (מִתּוֹךְ הַסְּנֶה) y repite la palabra tres veces en una sola línea. Sobra el
nombre del arbusto — y sobra tres veces.

**Lo que dice el midrash.** Un gentil pregunta a R. Yehoshúa ben Korjá por qué
Dios habló con Moshé desde la zarza. Él responde dos cosas: que con cualquier
otro árbol la pregunta sería la misma, y que aun así no va a dejarlo con las
manos vacías — "para enseñarte que no hay lugar vacío de Shejiná, ni la zarza".

**La parábola y su aplicación.** R. Eliezer: es el más bajo de los árboles →
así estaba Israel, bajo y degradado en Egipto; y por eso Dios "descendió"
(Shemot 3:8). R. Yosé: es el más duro, y ningún pájaro que entra sale entero →
así fue la esclavitud de Egipto (Shemot 3:7). El pájaro → ———

**Dónde no encaja.** R. Yosé nombra al pájaro que no sale entero y no dice quién
es. En el relato, el único que entra en la zarza es la Presencia. El hueco está
ahí para el lector — y unas líneas antes, el mismo midrash ya lo había dicho:
desde los espinos te hablo, para que sepas que comparto su dolor.

**Qué se pierde sin la parábola.** Sola, "no hay lugar vacío de Shejiná"
consuela. Con ella afirma algo más duro: que Dios no mira Egipto desde afuera.

**Lo que queda abierto.** El midrash contesta que el arbusto no importa, y acto
seguido lo lee dos veces como si importara todo. Deja ahí las dos.`;

// Variante sin parábola: la línea 3 es "la escena y su giro".
const SIN_PARABOLA = ZARZA.replace(
  "**La parábola y su aplicación.**",
  "**La escena y su giro.**"
).replace("**Qué se pierde sin la parábola.**", "**Qué se pierde sin la escena.**");

const BIEN = [
  ["el patrón del Sofer (con parábola)", ZARZA],
  ["la variante sin parábola", SIN_PARABOLA],
];

// ── Degradados: a cada uno le falta justo lo que lo sostenía. ──────────────
const DEGRADADOS = [
  [
    "sin la línea del desajuste (el corazón)",
    ZARZA.replace(/\*\*Dónde no encaja\.\*\*[\s\S]*?\n\n/, ""),
    /falta la línea «desajuste»/,
  ],
  [
    "la grieta no mira el versículo (sin hebreo)",
    ZARZA.replace("(מִתּוֹךְ הַסְּנֶה)", "(mitoj hasné)"),
    /la grieta no cita la palabra hebrea/,
  ],
  [
    "cierra en moraleja, sin la línea de lo abierto",
    ZARZA.replace(/\*\*Lo que queda abierto\.\*\*[\s\S]*$/, "") +
      "\n\nEl midrash nos enseña la importancia de la humildad.",
    /falta la línea «abierto»/,
  ],
  [
    "sin la prueba del contrafactual",
    ZARZA.replace(/\*\*Qué se pierde sin la parábola\.\*\*[\s\S]*?\n\n/, ""),
    /falta la línea «contrafactual»/,
  ],
  [
    "se pasa del techo de palabras",
    ZARZA + "\n\n" + "Y además conviene recordar que esto es muy importante. ".repeat(60),
    /se pasa del techo/,
  ],
];

// ── Prosa de estudio sin disección: el medidor debe callar. ────────────────
const SIN_BLOQUE = [
  "**El Midrash** aquí es decisivo. Shemot Rabá 1:1 trae, a propósito de «el que ahorra la vara odia a su hijo», el contraste entre Yishmael y la línea de Itzjak.",
  "## מְפָרְשִׁים — Comentaristas clásicos\n\nRashi lee aquí el plural como señal del tribunal de lo alto.",
  "",
];

let errores = 0;

console.log("── BLOQUES BIEN HECHOS (ni un problema) ──");
for (const [nombre, bloque] of BIEN) {
  const r = checkMidrashBlock(bloque);
  if (!r.found || r.problemas.length > 0) {
    errores++;
    console.log(`  ✗ ${nombre}`);
    for (const p of r.problemas) console.log(`      ${p}`);
    if (!r.found) console.log("      no encontró el bloque");
  } else {
    console.log(`  ✓ ${nombre.padEnd(34)} ${r.lineas}/7 líneas · ${r.palabras} palabras`);
  }
}

console.log("\n── BLOQUES DEGRADADOS (cada uno por SU problema) ──");
for (const [nombre, bloque, esperado] of DEGRADADOS) {
  const r = checkMidrashBlock(bloque);
  const acertó = r.problemas.some((p) => esperado.test(p));
  if (!acertó) {
    errores++;
    console.log(`  ✗ NO LO CAZÓ: ${nombre}`);
    console.log(`      esperaba: ${esperado}`);
    console.log(`      encontró: ${r.problemas.length ? r.problemas.join(" · ") : "ningún problema"}`);
  } else {
    console.log(`  ✓ ${nombre.padEnd(44)} → ${r.problemas.find((p) => esperado.test(p))}`);
  }
}

console.log("\n── ESTUDIO SIN DISECCIÓN (debe callar) ──");
for (const prosa of SIN_BLOQUE) {
  const r = checkMidrashBlock(prosa);
  if (r.found || r.problemas.length > 0) {
    errores++;
    console.log(`  ✗ SE INVENTÓ UN BLOQUE: ${prosa.slice(0, 50)}`);
  } else {
    console.log(`  ✓ calló: ${prosa.slice(0, 54) || "(texto vacío)"}`);
  }
}

if (errores > 0) {
  console.error(`\n✗ ${errores} fallo(s) en el medidor del midrash diseccionado.`);
  process.exit(1);
}
console.log(
  `\n✓ ${BIEN.length} bloques bien hechos sin una queja · ${DEGRADADOS.length} degradados cazados · ` +
    `${SIN_BLOQUE.length} textos sin disección respetados.`
);
