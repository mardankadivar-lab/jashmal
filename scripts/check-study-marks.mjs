#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL CAMINO DE LAS MARCAS: SERVIDOR → LECTOR
 * ─────────────────────────────────────────────────────────────────────────
 *  Los verificadores (zohar:check, midrash:check) prueban el JUICIO: que una
 *  cita falsa se detecte y una buena se deje en paz. Pero el juicio no sirve
 *  de nada si la marca no llega a la pantalla, y ahí el camino es delicado:
 *  el estudio se emite en streaming, así que cuando el verificador habla el
 *  texto ya salió entero. Por eso el servidor manda las marcas DESPUÉS, en un
 *  tráiler tras \x02, con la posición exacta donde va cada una, y el cliente
 *  las inserta al cerrar.
 *
 *  Lo que se puede romper sin que nadie lo note:
 *   · que el tráiler se cuele en el estudio y el lector vea «{"marks":[…]}»;
 *   · que un corte de red parta el \x02, o el JSON, o un carácter hebreo en
 *     dos chunks, y el estudio se muestre a medias o sin marcas;
 *   · que las posiciones se desplacen y la marca caiga sobre otra frase.
 *
 *  Aquí se fabrica la respuesta tal como la emite app/api/study/route.ts y se
 *  pasa por requestStudy DE VERDAD, partiendo el stream en los peores sitios
 *  posibles (trozos de 7 bytes). No usa red ni llama al motor: ni un token.
 *
 *  Uso:  npm run marcas:check
 *  Sale con código ≠ 0 si el texto, los metadatos o las marcas no llegan bien.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

// Resuelve los imports "@/..." del proyecto igual que lo hace Next, dejando
// pasar el ?n= con que se fuerza una instancia nueva del cliente por vuelta.
const ROOT = pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), "..", "/")).href;
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith("@/")) {
      const [ruta, q] = spec.slice(2).split("?");
      return next(new URL(`${ruta}.ts${q ? `?${q}` : ""}`, ROOT).href, ctx);
    }
    return next(spec, ctx);
  },
});

// "Mis Estudios" guarda en localStorage, que en Node no existe.
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };

const { checkCitations } = await import("@/lib/sources/citationCheck");

// Un trozo de estudio con dos citas buenas y dos fabricadas, y hebreo en medio
// para que algún corte caiga dentro de un carácter de varios bytes.
const ESTUDIO = `## מְפָרְשִׁים — Comentaristas clásicos

**El Midrash** — Bereshit Rabá 8:5 abre una escena entera: los ángeles discuten
si crear al hombre. Y Bereshit Rabá 150:2 añade que la tierra calló, mientras
Tanjumá, Lej Lejá 7 lo lee de otro modo y Shemot Rabá 80:1 trae otra voz.
`;

// Lo que hace el servidor al cerrar el stream (ver app/api/study/route.ts).
const cites = checkCitations(ESTUDIO);
const marks = cites.findings
  .filter((f) => f.verdict === "false")
  .map((f) => ({ end: f.end, note: `referencia sin confirmar: ${f.detail}` }));

const META = { depth: "deep", sourcesUsed: 3 };
const RESPUESTA =
  JSON.stringify(META) + "\x00" + ESTUDIO + "\x02" + JSON.stringify({ marks });

if (marks.length !== 2) {
  console.error(`✗ el fixture debería traer 2 citas falsas y trae ${marks.length}.`);
  process.exit(1);
}

/** Pasa la respuesta por requestStudy partida en trozos de `n` bytes. */
async function correr(n) {
  const bytes = new TextEncoder().encode(RESPUESTA);
  const trozos = [];
  for (let i = 0; i < bytes.length; i += n) trozos.push(bytes.slice(i, i + n));
  let i = 0;
  globalThis.fetch = async (url) => {
    if (String(url).includes("/api/study")) {
      return {
        ok: true,
        body: {
          getReader: () => ({
            read: async () =>
              i < trozos.length ? { done: false, value: trozos[i++] } : { done: true },
          }),
        },
      };
    }
    // Cosecha del cerebro y del atlas: no son parte de esta prueba.
    return { ok: true, json: async () => ({}) };
  };
  // ?n= fuerza un módulo nuevo: el cliente no debe guardar estado entre vueltas.
  const mod = await import(`@/lib/study/studyClient?n=${n}`);
  return mod.requestStudy({ mode: "text", locale: "es", ref: "Génesis 1:26" });
}

let errores = 0;

// Trozos de 7 bytes parten el \x00, el \x02, el JSON del tráiler y las letras
// hebreas por la mitad. Si aguanta eso, aguanta cualquier red.
for (const n of [7, 13, 64, 500, 100000]) {
  const r = await correr(n);
  const marcas = (r.study.match(/⟪/g) || []).length;
  const pruebas = [
    [marcas === 2, `marcas insertadas: ${marcas} (esperadas 2)`],
    [!r.study.includes("\x02") && !r.study.includes('{"marks"'), "el tráiler no se cuela en el estudio"],
    [!r.study.includes("\x00") && !r.study.includes('"depth"'), "los metadatos no se cuelan en el estudio"],
    [r.depth === META.depth && r.sourcesUsed === META.sourcesUsed, "metadatos leídos"],
    [r.study.includes("מְפָרְשִׁים"), "el hebreo llega entero"],
    [r.study.includes("Tanjumá, Lej Lejá 7 lo lee de otro modo"), "las citas buenas quedan intactas"],
    // La marca va PEGADA a la cita que desmiente, no sobre otra frase.
    [/Bereshit Rabá 150:2 ⟪referencia sin confirmar: Bereshit Rabbah tiene 100 capítulos⟫/.test(r.study),
      "la marca cae junto a su cita"],
    [/Shemot Rabá 80:1 ⟪referencia sin confirmar: Shemot Rabbah tiene 52 capítulos⟫/.test(r.study),
      "la segunda marca también"],
  ];
  const fallos = pruebas.filter(([ok]) => !ok);
  if (fallos.length > 0) {
    errores++;
    console.log(`  ✗ trozos de ${n} bytes:`);
    for (const [, qué] of fallos) console.log(`      falló: ${qué}`);
  } else {
    console.log(`  ✓ trozos de ${String(n).padStart(6)} bytes · ${pruebas.length} comprobaciones`);
  }
}

if (errores > 0) {
  console.error(`\n✗ las marcas no llegan bien al lector en ${errores} caso(s).`);
  process.exit(1);
}
console.log("\n── como lo lee el estudiante ──");
console.log((await correr(500)).study);
console.log("✓ las marcas llegan al lector enteras y en su sitio, con cualquier corte de red.");
