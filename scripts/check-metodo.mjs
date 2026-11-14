#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL MÉTODO: ¿CUÁL SE LE MANDA AL MOTOR?
 * ─────────────────────────────────────────────────────────────────────────
 *  Hay dos maneras de leer un midrash y el sitio hace las dos:
 *
 *   · Dentro de un estudio de parashá, el midrash es una voz más, y le basta
 *     el bloque compacto de «Análisis del Midrash» — seis líneas rotuladas.
 *   · Abierto por su propia puerta, desde la estantería Midrash, el midrash es
 *     el objeto del estudio, y entonces el método es otro: ocho secciones,
 *     mashal y nimshal, los huecos del emparejamiento y la discusión rabínica
 *     sobre cómo se lee una agadá.
 *
 *  Mandarle al motor el método equivocado no da error: da un estudio que
 *  parece correcto y no es el que el lector pidió. Por eso se comprueba aquí,
 *  mirando el prompt que de verdad sale hacia el modelo.
 *
 *  Uso:  npm run metodo:check
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

const { buildSystemPrompt } = await import("@/lib/engine/anthropic");

const AMPLIADO = "ANÁLISIS MIDRÁSHICO AMPLIADO";
const NORMAL = "FLUJO PEDAGÓGICO ESTRICTAMENTE LINEAL";
const BLOQUE = "EL MIDRASH NO SE CITA: SE ABRE";
const CITAS = "cítalo con EXACTITUD: obra + parashá/sección + número";
const UMBRAL = "UMBRAL DE NAVEGACIÓN";

// Las ocho secciones del método ampliado, en su orden.
const SECCIONES = [
  "תַּרְגּוּם",
  "דִּקְדּוּק הַכָּתוּב",
  "מָשָׁל וְנִמְשָׁל",
  "הַקְבָּלָה וּפְעָרִים",
  "הַנִּסְתָּר שֶׁבַּמָּשָׁל",
  "דַּרְכֵי הָאַגָּדָה",
  "שִׁיבָה אֶל הַכָּתוּב",
  "חֲתִימָה",
];

let errores = 0;
const fallo = (msg) => {
  errores++;
  console.log(`  ✗ ${msg}`);
};

// ── 1. El lector abre un midrash: método ampliado ─────────────────────────
console.log("── ABRIR UN MIDRASH → MÉTODO AMPLIADO ──");
for (const ref of ["Bereshit Rabbah 39:1", "Midrash Tanchuma, Lech Lecha 3", "Sifrei Devarim 343"]) {
  const p = buildSystemPrompt("text", "es", false, ref);
  const problemas = [];
  if (!p.includes(AMPLIADO)) problemas.push("no lleva el método ampliado");
  if (p.includes(NORMAL)) problemas.push("lleva ADEMÁS el método de parashá");
  if (p.includes(BLOQUE)) problemas.push("lleva el bloque compacto, que aquí sobra");
  if (!p.includes(CITAS)) problemas.push("perdió la regla de citar con obra y número");
  if (!p.includes(UMBRAL)) problemas.push("perdió el umbral de navegación");

  // Las ocho secciones, y en orden: un método desordenado no es lineal.
  let desde = -1;
  for (const s of SECCIONES) {
    const i = p.indexOf(s, desde + 1);
    if (i === -1) problemas.push(`falta la sección ${s}`);
    else desde = i;
  }

  if (problemas.length > 0) {
    fallo(ref);
    for (const x of problemas) console.log(`      ${x}`);
  } else {
    console.log(`  ✓ ${ref.padEnd(32)} ocho secciones en orden, sin bloque compacto`);
  }
}

// ── 2. El lector lee una parashá: método normal ───────────────────────────
console.log("\n── LEER UNA PARASHÁ → MÉTODO NORMAL ──");
for (const ref of ["Genesis 28:11", "Shabbat 31a", "Zohar 1:15a", undefined]) {
  const p = buildSystemPrompt("text", "es", false, ref);
  const problemas = [];
  if (p.includes(AMPLIADO)) problemas.push("se le coló el método ampliado");
  if (!p.includes(NORMAL)) problemas.push("perdió el método de parashá");
  if (!p.includes(BLOQUE)) problemas.push("perdió el bloque compacto del midrash");
  if (problemas.length > 0) {
    fallo(String(ref));
    for (const x of problemas) console.log(`      ${x}`);
  } else {
    console.log(`  ✓ ${String(ref).padEnd(32)} método de parashá con su bloque compacto`);
  }
}

// ── 3. Los otros modos no se tocan ────────────────────────────────────────
console.log("\n── LETRAS Y CONCEPTOS SIGUEN IGUAL ──");
for (const modo of ["letter", "concept"]) {
  // Aunque llegue una referencia de midrash, el modo manda: el estudio de
  // LETRAS sigue el marco de Ginsburgh y no se le cambia el método.
  const p = buildSystemPrompt(modo, "es", false, "Bereshit Rabbah 39:1");
  if (p.includes(AMPLIADO)) {
    fallo(`modo ${modo}: se le coló el método ampliado`);
  } else {
    console.log(`  ✓ modo ${modo.padEnd(28)} intacto`);
  }
}

// ── 4. La sección de palabras repetidas solo si hay cuenta ────────────────
//
// Es una sección de DATOS: existe cuando el código ya contó. Si apareciera sin
// cuenta, el motor la rellenaría de memoria, que es exactamente lo que esta
// sección viene a evitar.
console.log("\n── מִלִּים חוֹזְרוֹת SOLO CUANDO HAY CUENTA ──");
{
  const REPETIDAS = "מִלִּים חוֹזְרוֹת";
  const con = buildSystemPrompt("text", "es", false, "Genesis 1:3", true);
  const sin = buildSystemPrompt("text", "es", false, "Genesis 1:3", false);
  if (!con.includes(REPETIDAS)) fallo("con cuenta: falta la sección de palabras repetidas");
  else console.log("  ✓ con cuenta    la sección está, y antes de la traducción");
  if (sin.includes(REPETIDAS)) fallo("sin cuenta: la sección aparece y el motor contaría de memoria");
  else console.log("  ✓ sin cuenta    la sección no existe");

  // Va DELANTE de la traducción: su sitio es antes de desarrollar el capítulo.
  const iRep = con.indexOf(REPETIDAS);
  const iTar = con.indexOf("תַּרְגּוּם");
  if (iRep === -1 || iTar === -1 || iRep > iTar) {
    fallo("la sección de palabras repetidas no va delante de la traducción");
  } else {
    console.log("  ✓ el orden      palabras repetidas → traducción");
  }

  // Y en el estudio DE un midrash no entra: ahí el método es otro.
  const midrash = buildSystemPrompt("text", "es", false, "Bereshit Rabbah 39:1", true);
  if (midrash.includes(REPETIDAS)) fallo("se coló la sección en el método ampliado del midrash");
  else console.log("  ✓ midrash       sin sección de palabras repetidas");
}

// ── 5. El sello y el umbral, en los dos métodos ───────────────────────────
console.log("\n── EL ESTUDIO SE SELLA EN LA JATIMÁ ──");
for (const [nombre, ref] of [["midrash", "Bereshit Rabbah 39:1"], ["parashá", "Genesis 28:11"]]) {
  const p = buildSystemPrompt("text", "es", false, ref);
  const sello = p.includes("חֲתִימָה");
  const umbral = p.includes("הֶמְשֵׁךְ") || p.includes(UMBRAL);
  if (sello && umbral) console.log(`  ✓ ${nombre.padEnd(10)} sella en חֲתִימָה y abre el umbral`);
  else fallo(`${nombre}: ${sello ? "" : "sin sello "}${umbral ? "" : "sin umbral"}`);
}

if (errores > 0) {
  console.error(`\n✗ ${errores} fallo(s): el motor recibiría el método equivocado.`);
  process.exit(1);
}
console.log("\n✓ Cada puerta recibe su método: el midrash abierto, el ampliado; la parashá, el suyo.");
