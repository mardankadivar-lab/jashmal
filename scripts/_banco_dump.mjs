// _banco_dump.mjs — Lee el banco de gematrías (.ts) y lo vuelca como JSON.
// Uso:  node scripts/_banco_dump.mjs <ruta-al-banco-gematria.ts>
//
// No compila TypeScript: extrae el literal del array exportado y lo evalúa
// como objeto JS nativo (claves sin comillas, comas colgantes, comentarios
// inline: todo lo entiende el motor de JS). Es el puente robusto para que el
// pipeline de Python consuma el banco sin depender de un parser de TS.
import fs from "node:fs";

const path = process.argv[2];
if (!path) {
  console.error("Falta la ruta al banco. Uso: node _banco_dump.mjs <ruta.ts>");
  process.exit(2);
}

let src;
try {
  src = fs.readFileSync(path, "utf8");
} catch {
  // El banco todavía no existe: devolvemos array vacío (el pipeline crea stub).
  console.log("[]");
  process.exit(0);
}

// Localiza el array exportado (acepta bancoGematria / BANCO_GEMATRIA / cualquier
// nombre) buscando el primer "= [" tras una declaración export const/let/var.
// El match termina justo en el "[" que abre el array. Usamos su posición
// para NO confundirnos con el "[]" de la anotación de tipo (GematriaEntry[]).
const m = /export\s+(?:const|let|var)\s+\w+\s*(?::[^=]+)?=\s*\[/.exec(src);
if (!m) {
  console.log("[]");
  process.exit(0);
}
const openIdx = m.index + m[0].length - 1;

// Empareja corchetes respetando strings y comentarios para hallar el cierre.
let depth = 0, i = openIdx, inStr = null, end = -1;
for (; i < src.length; i++) {
  const c = src[i], prev = src[i - 1];
  if (inStr) {
    if (c === inStr && prev !== "\\") inStr = null;
    continue;
  }
  if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
  if (c === "/" && src[i + 1] === "/") { const nl = src.indexOf("\n", i); i = nl === -1 ? src.length : nl; continue; }
  if (c === "/" && src[i + 1] === "*") { const cl = src.indexOf("*/", i); i = cl === -1 ? src.length : cl + 1; continue; }
  if (c === "[") depth++;
  else if (c === "]") { depth--; if (depth === 0) { end = i; break; } }
}
if (end === -1) { console.log("[]"); process.exit(0); }

const literal = src.slice(openIdx, end + 1);
let arr;
try {
  // eslint-disable-next-line no-new-func
  arr = Function(`"use strict"; return (${literal});`)();
} catch (e) {
  console.error("No se pudo evaluar el banco:", e.message);
  process.exit(1);
}
process.stdout.write(JSON.stringify(arr));
