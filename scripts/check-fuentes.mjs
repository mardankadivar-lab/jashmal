#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DE LAS FUENTES DEL ESTUDIO
 * ─────────────────────────────────────────────────────────────────────────
 *  El modo profundo le pide a Sefaria las fuentes relacionadas con el pasaje
 *  y se las pasa al motor. Ese paso fallaba en silencio: la referencia se
 *  enviaba con puntos en vez de espacios («Bereshit Rabbah 39:1» →
 *  «Bereshit.Rabbah.39.1») y Sefaria, que no da error, devolvía CERO enlaces
 *  para todo libro de más de una palabra. El estudio salía sin una sola
 *  fuente y no había nada que lo delatara: ni un error, ni un registro.
 *
 *  Medido contra Sefaria el 13-nov-2026, con puntos frente a escapada:
 *      Bereshit Rabá 39:1   0  →  99
 *      Shir HaShirim 1:1    0  → 205
 *      Pirkei Avot 1:1      0  → 475
 *      Zohar, Bereshit 1:1  0  →  57
 *      Génesis 28:11      526  → 526   (una palabra: nunca se rompió)
 *
 *  Por eso esto se comprueba SIN RED, mirando la URL: un guardián que
 *  dependiera de Sefaria fallaría los días que Sefaria falle, y este tiene
 *  que poder correrse siempre.
 *
 *  Uso:  npm run fuentes:check
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

const { urlRelacionados } = await import("@/lib/relations/related");

// Referencias con título de más de una palabra: las que el fallo silenciaba.
const REFS = [
  "Bereshit Rabbah 39:1",
  "Shir HaShirim 1:1",
  "Pirkei Avot 1:1",
  "Zohar, Bereshit 1:1",
  "Midrash Tanchuma, Lech Lecha 3",
  "Mekhilta DeRabbi Yishmael 14:19",
  "Genesis 28:11",
  "Shabbat 31a",
];

let errores = 0;

console.log("── LA REFERENCIA LLEGA ENTERA A SEFARIA ──");
for (const ref of REFS) {
  const url = urlRelacionados(ref);
  const cola = url.split("/related/")[1] ?? "";
  const vuelta = decodeURIComponent(cola);
  const problemas = [];

  // 1. Lo que viaja tiene que ser la referencia, letra por letra.
  if (vuelta !== ref) problemas.push(`viaja «${vuelta}» en vez de «${ref}»`);
  // 2. Ni un espacio ni unos dos puntos convertidos en punto: ese era el fallo.
  if (ref.includes(" ") && !cola.includes("%20")) {
    problemas.push("los espacios no viajan escapados");
  }
  if (ref.includes(":") && !cola.includes("%3A")) {
    problemas.push("los dos puntos no viajan escapados");
  }

  if (problemas.length > 0) {
    errores++;
    console.log(`  ✗ ${ref}`);
    for (const p of problemas) console.log(`      ${p}`);
  } else {
    console.log(`  ✓ ${ref.padEnd(32)} → ${cola}`);
  }
}

if (errores > 0) {
  console.error(`\n✗ ${errores} referencia(s) llegarían rotas a Sefaria — el estudio saldría sin fuentes.`);
  process.exit(1);
}
console.log(`\n✓ ${REFS.length} referencias llegan enteras: el modo profundo encuentra sus fuentes.`);
