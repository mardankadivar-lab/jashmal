#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL FORMATO DE LA PROSA: QUE NO SE VEAN LOS ASTERISCOS
 * ─────────────────────────────────────────────────────────────────────────
 *  El motor no escribe markdown perfecto. En el estudio de Toldot del
 *  2026-11-13, en jashmal.org, escribió literalmente:
 *
 *      **Shemot Rabá 1:1* (el Midrash sobre el Éxodo) trae, a propósito de
 *      "el que ahorra la vara odia a su hijo"* (Mishlé/Proverbios 13:24)
 *
 *  — abrió la negrita con dos asteriscos y la cerró con uno, y dejó otro
 *  huérfano. El lector veía los asteriscos crudos pegados a la cita del
 *  Midrash, que es donde más daño hacen: justo donde le estamos pidiendo que
 *  confíe en la fuente.
 *
 *  Dos bancos, como en los otros guardianes:
 *
 *  1. LO QUE ESCRIBE EL MOTOR — texto de entrada y lo que el lector DEBE ver.
 *     Ningún asterisco puede sobrevivir, y el énfasis tiene que caer sobre las
 *     palabras correctas (no basta con borrar los símbolos: si la negrita se
 *     corre, el estudio cambia de tono).
 *
 *  2. LO QUE NO SE DEBE TOCAR — texto sin énfasis, hebreo, guiones, signos
 *     matemáticos. Si el formateador los altera, está haciendo de más.
 *
 *  3. RÓTULOS DE REFERENCIAS — el ref canónico de Sefaria está en inglés
 *     ("Exodus Rabbah 1:1") y es el que se usa para pedir el texto, pero el
 *     lector lo citó en español y así tiene que volver. Incluye la cola:
 *     "Midrash Tanchuma, Lech Lecha 7" se lee "Midrash Tanjumá, Lej Lejá 7",
 *     no media referencia en cada idioma.
 *
 *  Uso:  npm run formato:check
 *  No usa red ni llama al motor: ni un token.
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

const { splitEmphasis } = await import("@/lib/study/emphasis");
const { localizedRef } = await import("@/lib/sources/bookNames");

/** Lo que el lector ve: el texto sin marcadores. */
const visible = (t) => splitEmphasis(t).map((p) => p.text).join("");
/** Lo que queda resaltado, para comprobar que el énfasis no se corre. */
const resaltado = (t) =>
  splitEmphasis(t)
    .filter((p) => p.kind !== "plain")
    .map((p) => `${p.kind === "bold" ? "N" : "C"}:${p.text}`)
    .join(" · ");

// ── Banco 1: [entrada, lo que debe verse, lo que debe ir resaltado] ────────
const CASOS = [
  // Markdown correcto: se comporta como siempre.
  ["El **Midrash** aquí es decisivo.", "El Midrash aquí es decisivo.", "N:Midrash"],
  ["la palabra *vayetar* comparte raíz", "la palabra vayetar comparte raíz", "C:vayetar"],
  ["**182** = 7 × 26", "182 = 7 × 26", "N:182"],

  // El caso real de Toldot: abre con dos, cierra con uno, y deja un huérfano.
  [
    '**Shemot Rabá 1:1* (el Midrash sobre el Éxodo) trae, a propósito de "el que ahorra la vara odia a su hijo"* (Mishlé/Proverbios 13:24)',
    'Shemot Rabá 1:1 (el Midrash sobre el Éxodo) trae, a propósito de "el que ahorra la vara odia a su hijo" (Mishlé/Proverbios 13:24)',
    "N:Shemot Rabá 1:1",
  ],
  // El otro del mismo estudio: negrita larga cerrada con un solo asterisco.
  [
    "El eje es este: **Avraham es Jésed (la bondad, la expansión) e Itzjak es Guevurá* (el rigor).",
    "El eje es este: Avraham es Jésed (la bondad, la expansión) e Itzjak es Guevurá (el rigor).",
    "N:Avraham es Jésed (la bondad, la expansión) e Itzjak es Guevurá",
  ],
  // Al revés: abre con uno y cierra con dos.
  ["el *tikún** (la reparación) que esta semana", "el tikún (la reparación) que esta semana", "C:tikún"],
  // Huérfano suelto, sin nada que emparejar.
  ["una sola gota dividida en dos*", "una sola gota dividida en dos", ""],
  ["*el Midrash lo cuenta así", "el Midrash lo cuenta así", ""],
  // Varios énfasis en la misma línea, uno bueno y otro roto.
  [
    "**Rashi** lo ancla y el **Ramban* lo confirma",
    "Rashi lo ancla y el Ramban lo confirma",
    "N:Rashi · N:Ramban",
  ],
  // Hebreo dentro de la negrita: no se puede perder ni una letra.
  ["**בְּרֵאשִׁית** contiene בְּרִית", "בְּרֵאשִׁית contiene בְּרִית", "N:בְּרֵאשִׁית"],
  ["**Zohar Toldot 137a*, vol. 1", "Zohar Toldot 137a, vol. 1", "N:Zohar Toldot 137a"],
];

// ── Banco 2: prosa que NO se debe tocar ───────────────────────────────────
const INTACTOS = [
  "El Midrash aquí es decisivo, sin ningún énfasis.",
  "וְאֵלֶּה תּוֹלְדֹת יִצְחָק בֶּן־אַבְרָהָם אַבְרָהָם הוֹלִיד אֶת־יִצְחָק",
  "El total de תולדת = 400+6+30+4+400 = 840. Y 840 = 40 × 21.",
  "— el talón de Esav (akev) y el ekev con que se cierra la parashá —",
  "Bereshit Rabá 12:6-7 ⟪referencia sin confirmar: tiene 100 capítulos⟫",
  "{{study:gilgul de Rut|¿Sabías que esta alma reaparece?}}",
];

// ── Banco 3: [ref canónico de Sefaria, lo que debe leer el lector] ────────
const ROTULOS = [
  ["Exodus Rabbah 1:1", "Éxodo Rabá (Shemot Rabá) 1:1"],
  ["Genesis Rabbah 63:8", "Génesis Rabá (Bereshit Rabá) 63:8"],
  ["Bereshit Rabbah 12:6-7", "Génesis Rabá (Bereshit Rabá) 12:6-7"],
  ["Midrash Tanchuma, Lech Lecha 7", "Midrash Tanjumá, Lej Lejá 7"],
  ["Midrash Tanchuma, Chayei Sara 3", "Midrash Tanjumá, Jayéi Sará 3"],
  ["Eikhah Rabbah, Petichta 24", "Lamentaciones Rabá (Eijá Rabá), Petijtá 24"],
  ["Pirkei DeRabbi Eliezer 3", "Pirkei de Rabí Eliezer 3"],
  ["Sifrei Devarim 343", "Sifrí Devarim (Sifrí Deuteronomio) 343"],
  ["Mekhilta DeRabbi Yishmael, Tractate Shirah 3", "Mejiltá de Rabí Yishmael, Masejta Shirah 3"],
  ["Zohar, Toldot 137a", "Zohar, Toledot 137a"],
  // Lo de siempre tiene que seguir igual.
  ["Genesis 25:19-26:5", "Génesis (Bereshit) 25:19-26:5"],
  ["Yevamot 64a", "Yevamot 64a"],  // sin nombre en español: el de Sefaria
];

let errores = 0;

console.log("── LO QUE ESCRIBE EL MOTOR (el lector no debe ver un asterisco) ──");
for (const [entrada, esperado, enfasis] of CASOS) {
  const v = visible(entrada);
  const r = resaltado(entrada);
  const fallos = [];
  if (v.includes("*")) fallos.push(`quedó un asterisco a la vista: «${v}»`);
  if (v !== esperado) fallos.push(`el texto cambió:\n        esperado: «${esperado}»\n        salió:    «${v}»`);
  if (r !== enfasis) fallos.push(`el énfasis se corrió:\n        esperado: «${enfasis}»\n        salió:    «${r}»`);
  if (fallos.length > 0) {
    errores++;
    console.log(`  ✗ ${entrada.slice(0, 58)}`);
    for (const f of fallos) console.log(`      ${f}`);
  } else {
    console.log(`  ✓ ${(enfasis || "sin énfasis").slice(0, 46).padEnd(48)} ${entrada.slice(0, 40)}`);
  }
}

console.log("\n── PROSA QUE NO SE DEBE TOCAR ──");
for (const t of INTACTOS) {
  const v = visible(t);
  if (v !== t) {
    errores++;
    console.log(`  ✗ LA CAMBIÓ: «${t}»\n      salió: «${v}»`);
  } else {
    console.log(`  ✓ intacta: ${t.slice(0, 58)}`);
  }
}

console.log("\n── RÓTULOS DE REFERENCIAS (el lector los citó en español) ──");
for (const [ref, esperado] of ROTULOS) {
  const salio = localizedRef(ref, "es");
  if (salio !== esperado) {
    errores++;
    console.log(`  ✗ ${ref}\n      esperado: «${esperado}»\n      salió:    «${salio}»`);
  } else {
    console.log(`  ✓ ${ref.padEnd(44)} → ${salio}`);
  }
}

if (errores > 0) {
  console.error(`\n✗ ${errores} fallo(s) en el formato de la prosa.`);
  process.exit(1);
}
console.log(
  `\n✓ ${CASOS.length} casos del motor bien formateados · ${INTACTOS.length} textos intactos · ` +
    `${ROTULOS.length} rótulos en español.`
);
