#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DE LOS ENLACES DE REFERENCIAS
 * ─────────────────────────────────────────────────────────────────────────
 *  Cuando el motor cita una fuente, el lector tiene que poder abrirla de un
 *  clic y leerla con sus propios ojos. Esa es la promesa del proyecto: "todo
 *  lo que afirmamos tiene una fuente que puedes abrir". Un enlace que no
 *  existe la rompe igual que una cita inventada.
 *
 *  Dos bancos:
 *
 *  1. CITAS QUE SE ABREN — cada una con el ref EXACTO de Sefaria que debe
 *     salir. Los refs se comprobaron uno por uno contra la API (devuelve el
 *     mismo ref que se le pide, con texto de verdad). Si el detector cambia
 *     una letra, el clic lleva a una página vacía.
 *
 *  2. LO QUE NO ES UNA CITA — números que se parecen a una referencia sin
 *     serlo. Enlazar "la hoja 64a" o "el año 2026" ensucia la prosa y manda
 *     al lector a ninguna parte.
 *
 *  Uso:  npm run enlaces:check
 *  No usa red: el detector es local. Los refs ya se validaron a mano.
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

const { detectRefs, segmentText } = await import("@/lib/relations/refDetector");

// ── Banco 1: [frase, lo que debe quedar enlazado, ref de Sefaria] ─────────
const ENLACES = [
  // Midrash con capítulo:sección.
  ["El Midrash aquí es decisivo: Shemot Rabá 1:1 trae el contraste.", "Shemot Rabá 1:1", "Shemot Rabbah 1:1"],
  ["La parábola del palacio encendido está en Bereshit Rabá 39:1.", "Bereshit Rabá 39:1", "Bereshit Rabbah 39:1"],
  ["El hilo completo está en Bereshit Rabá 12:6-7.", "Bereshit Rabá 12:6-7", "Bereshit Rabbah 12:6-7"],
  ["Vayikrá Rabá 34:8 pregunta quién hizo bondad.", "Vayikrá Rabá 34:8", "Vayikra Rabbah 34:8"],
  ["Rut Rabá 5:9 trae a Rabí Yehoshúa.", "Rut Rabá 5:9", "Ruth Rabbah 5:9"],
  ["Kohelet Rabá 1:4: seiscientos mil nacen cada día.", "Kohelet Rabá 1:4", "Kohelet Rabbah 1:4"],
  ["Ester Rabá 7:13 cuenta la advertencia a Hamán.", "Ester Rabá 7:13", "Esther Rabbah 7:13"],
  ["Shir HaShirim Rabá 5:2: una abertura del tamaño de una aguja.", "Shir HaShirim Rabá 5:2", "Shir HaShirim Rabbah 5:2"],
  // Piska suelta, sin capítulo.
  ["Pirkei de Rabí Eliezer 3 abre con la creación premundana.", "Pirkei de Rabí Eliezer 3", "Pirkei DeRabbi Eliezer 3"],
  ["Sifrí Devarim 343: Moshé abrió con la alabanza.", "Sifrí Devarim 343", "Sifrei Devarim 343"],
  ["Sifrí Bamidbar 161: dondequiera fueron exiliados.", "Sifrí Bamidbar 161", "Sifrei Bamidbar 161"],
  ["Pesikta Rabati 29 es el midrash del llanto.", "Pesikta Rabati 29", "Pesikta Rabbati 29"],
  ["Pesikta de Rav Kahaná 12:25: los cuatro rostros.", "Pesikta de Rav Kahaná 12:25", "Pesikta DeRav Kahana 12:25"],
  // La Petijtá, que numera aparte.
  ["Eijá Rabá, Petijtá 24 abre con Rabí Yojanán.", "Eijá Rabá, Petijtá 24", "Eikhah Rabbah, Petichta 24"],
  // Obras divididas por parashá o masejta.
  ["Tanjumá, Lej Lejá 7 lo lee de otro modo.", "Tanjumá, Lej Lejá 7", "Midrash Tanchuma, Lech Lecha 7"],
  ["Midrash Tanjumá, Bereshit 1: fuego negro sobre fuego blanco.", "Midrash Tanjumá, Bereshit 1", "Midrash Tanchuma, Bereshit 1"],
  ["Mejiltá, Shirá 3 lee el canto del mar.", "Mejiltá, Shirá 3", "Mekhilta DeRabbi Yishmael, Tractate Shirah 3"],
  // Midrash sobre los Escritos: hace falta la palabra "Midrash" (ver abajo).
  ["Midrash Tehilim 90:3 pregunta: si hombre, ¿por qué Dios?", "Midrash Tehilim 90:3", "Midrash Tehillim 90:3"],

  // Talmud con tilde, que antes no se abría aunque el tratado estuviera.
  ["En Yevamot 64a, Rava quiere derivar de Itzjak.", "Yevamot 64a", "Yevamot 64a"],
  ["como dice Rabí Elazar en Sukká 14a, la plegaria voltea", "Sukká 14a", "Sukkah 14a"],
  ["Bavá Batrá 99a lo discute.", "Bavá Batrá 99a", "Bava Batra 99a"],
  ["La plegaria, en Sotá 34b.", "Sotá 34b", "Sotah 34b"],
  ["Moed Katán 5a trae otra versión.", "Moed Katán 5a", "Moed Katan 5a"],
  ["Rosh Hashaná 16b habla de los tres libros.", "Rosh Hashaná 16b", "Rosh Hashanah 16b"],

  // Y el Tanaj de siempre, que no se puede romper.
  ["Génesis 2:4 dice que estas son las generaciones.", "Génesis 2:4", "Genesis 2:4"],
  ["El versículo de Isaías 40:26 pregunta.", "Isaías 40:26", "Isaiah 40:26"],
  ["Tehilim 23:4 dice que no temeré mal alguno.", "Tehilim 23:4", "Psalms 23:4"],

  // La frontera entre el libro y el midrash sobre el libro: la misma cifra
  // lleva a sitios distintos y la diferencia es UNA palabra. Si el detector se
  // confunde, el lector pide un salmo y recibe un midrash, o al revés.
  ["Tehilim 90:3 es el salmo de Moshé.", "Tehilim 90:3", "Psalms 90:3"],
  ["Midrash Tehilim 90:3 pregunta por el hombre.", "Midrash Tehilim 90:3", "Midrash Tehillim 90:3"],
  ["Mishlei 3:5 dice confía en Hashem.", "Mishlei 3:5", "Proverbs 3:5"],
  ["Midrash Mishlei 10:1: hijo sabio alegra al padre.", "Midrash Mishlei 10:1", "Midrash Mishlei 10:1"],
];

// ── Banco 2: lo que NO se debe enlazar ────────────────────────────────────
const NO_ENLAZAR = [
  "Génesis 14a no existe: un libro del Tanaj no tiene folios",
  "la hoja 64a de ese libro",
  "el daf 12b",
  "en la página 3a del cuaderno",
  "el año 2026 fue distinto",
  "capítulo 3 del libro",
  "Avraham tenía 99 años",
  "a las 3:16 de la tarde",
  "el midrash de la hoja 12 no existe",
];

/** Lo que el lector ve enlazado, con su destino. */
const enlaces = (frase) =>
  segmentText(frase)
    .filter((s) => s.type === "ref")
    .map((s) => ({ texto: s.value, ref: s.ref }));

let errores = 0;

console.log("── CITAS QUE SE ABREN ──");
for (const [frase, texto, ref] of ENLACES) {
  const hits = enlaces(frase);
  const hit = hits.find((h) => h.ref === ref);
  if (!hit) {
    errores++;
    console.log(`  ✗ NO SE ABRE: ${frase}`);
    console.log(`      esperado: «${texto}» → ${ref}`);
    console.log(`      salió:    ${hits.length ? hits.map((h) => `«${h.texto}» → ${h.ref}`).join(", ") : "nada"}`);
  } else if (hit.texto !== texto) {
    // El enlace existe pero abraza lo que no debe ("Rabí Elazar en Sukká 14a").
    errores++;
    console.log(`  ✗ EL ENLACE SE PASA DE LARGO: ${frase}`);
    console.log(`      esperado: «${texto}»\n      salió:    «${hit.texto}»`);
  } else {
    console.log(`  ✓ «${texto}»`.padEnd(42) + ` → ${ref}`);
  }
}

console.log("\n── LO QUE NO ES UNA CITA (no debe enlazarse) ──");
for (const frase of NO_ENLAZAR) {
  const hits = enlaces(frase);
  if (hits.length > 0) {
    errores++;
    console.log(`  ✗ ENLAZÓ DE MÁS: ${frase}`);
    for (const h of hits) console.log(`      «${h.texto}» → ${h.ref}`);
  } else {
    console.log(`  ✓ ${frase}`);
  }
}

// Cada cita detectada una sola vez, sin duplicados en la lista.
const duplicados = detectRefs("Bereshit Rabá 39:1 y otra vez Bereshit Rabá 39:1");
if (duplicados.length !== 1) {
  errores++;
  console.log(`\n  ✗ la misma cita se registró ${duplicados.length} veces`);
}

if (errores > 0) {
  console.error(`\n✗ ${errores} fallo(s) en los enlaces.`);
  process.exit(1);
}
console.log(`\n✓ ${ENLACES.length} citas se abren en su fuente · ${NO_ENLAZAR.length} falsas alarmas descartadas.`);
