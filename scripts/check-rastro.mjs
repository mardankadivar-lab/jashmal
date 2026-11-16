#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL RASTRO DE PALABRAS — «en todo lugar donde se dice»
 * ─────────────────────────────────────────────────────────────────────────
 *  Lo que hay que proteger aquí no es un número: es una REGLA. Cuando una
 *  palabra es lo bastante rara para rastrearla, el código entrega TODAS sus
 *  apariciones y nunca una selección, para que el motor esté obligado a dar
 *  cuenta del caso que no encaja (ver la cabecera de lib/study/rastroPalabra.ts
 *  y el método de Meguilá 10b). Un recorte «para que el prompt pese menos»
 *  convertiría el rastreo en propaganda sin romper ninguna prueba de las
 *  normales. Así que aquí se prueba justo eso: que la lista sale completa,
 *  que el límite es de PALABRAS y no de apariciones, y que un rastro
 *  incompleto se descarta entero antes que mostrarse a medias.
 *
 *  LA TABLA DE PRUEBA ES INVENTADA, a propósito, y no es la concordancia del
 *  Tanaj. La real la escribe scripts/gen-concordancia.mjs desde los XML de
 *  Open Scriptures; mientras no se corra, lib/sources/concordancia.generated.ts
 *  está vacío. Aquí se cambia por una tabla de juguete para probar la LÓGICA
 *  de consulta, igual que se probaría un buscador con tres fichas falsas.
 *  La única lista que es de verdad es la de בֹהוּ (Bereshit 1:2, Yeshayahu
 *  34:11, Yirmeyahu 4:23), que son sus tres lugares.
 *
 *  Lo que NO es de juguete: los LEMAS salen de la tabla de morfología real del
 *  repo (בֹהוּ es N922, נֹחַ es N5146, עַל es R5921). Esa cadena —palabra
 *  hebrea → lema → tabla— es la que se rompe en silencio si alguien cambia un
 *  normalizador, y es la que hay que probar con los datos de verdad.
 *
 *  Uso:  npm run rastro:check
 * ─────────────────────────────────────────────────────────────────────────
 */
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), "..", "/")).href;

// ── La tabla de juguete ───────────────────────────────────────────────────
//
// Los índices de libro son los de LIBROS_CONCORDANCIA: 0 Génesis · 4
// Deuteronomio · 11 Isaías · 12 Jeremías.
const LIBROS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "I Samuel", "II Samuel", "I Kings", "II Kings",
  "Isaiah", "Jeremiah", "Ezekiel", "Hosea", "Joel", "Amos", "Obadiah",
  "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai",
  "Zechariah", "Malachi", "Psalms", "Proverbs", "Job", "Song of Songs",
  "Ruth", "Lamentations", "Ecclesiastes", "Esther", "Daniel", "Ezra",
  "Nehemiah", "I Chronicles", "II Chronicles",
];

// Un lema con 24 apariciones —el tope— para probar que no se recorta ni ahí.
const VEINTICUATRO = Array.from({ length: 24 }, (_, i) => `0.${i + 1}.1`).join(" ");

const FIXTURE = `
export const TOPE_APARICIONES = 24;
export const PISO_APARICIONES = 2;
export const LIBROS_CONCORDANCIA = ${JSON.stringify(LIBROS)};
export const APARICIONES = {
  // bohu: sus tres lugares de verdad.
  "N922": "0.1.2 11.34.11 12.4.23",
  // joshej: INVENTADO, y todas dentro de Genesis 1 a propósito.
  "N2822": "0.1.2 0.1.4 0.1.5",
  // Noaj: INVENTADO. Nombre propio, y más raro que bohu.
  "N5146": "0.5.29 0.6.8",
  // neshamá: INVENTADO. Sirve para ver que las vocales deciden el lema.
  "N5397": "0.2.7 4.20.16",
  // «al»: INVENTADO, y es una preposición: no debe rastrearse nunca.
  "R5921": "0.1.2 0.1.7",
  // Veinticuatro apariciones, el tope.
  "N999999": ${JSON.stringify(VEINTICUATRO)},
};
export const LEMAS_NOMBRE_PROPIO = new Set(["N5146"]);
`;
const FIXTURE_URL = `data:text/javascript;base64,${Buffer.from(FIXTURE, "utf8").toString("base64")}`;

registerHooks({
  resolve(spec, ctx, next) {
    if (spec === "@/lib/sources/concordancia.generated") {
      return { url: FIXTURE_URL, shortCircuit: true };
    }
    if (spec.startsWith("@/")) return next(new URL(`${spec.slice(2)}.ts`, ROOT).href, ctx);
    return next(spec, ctx);
  },
});

const { rastroPalabra, rastrosDelPasaje, aparicionesDeLema, tramoDeRef, formateaRastros } =
  await import("@/lib/study/rastroPalabra");

let errores = 0;
const fallo = (msg) => {
  errores++;
  console.log(`  ✗ ${msg}`);
};
const bien = (msg) => console.log(`  ✓ ${msg}`);
const igual = (vista, esperada, qué) =>
  vista === esperada ? bien(`${qué}: ${vista}`) : fallo(`${qué}: esperaba ${esperada} y salió ${vista}`);

// ── 1. Desempaquetar las direcciones ─────────────────────────────────────
console.log("── LAS DIRECCIONES ──");
{
  const a = aparicionesDeLema("N922");
  igual(a.length, 3, "bohu tiene tres apariciones");
  igual(a.map((x) => x.ref).join(" · "), "Genesis 1:2 · Isaiah 34:11 · Jeremiah 4:23", "en orden de lectura");
  igual(aparicionesDeLema("N776").length, 0, "un lema que no está en la tabla da lista vacía");
}

// ── 2. El pasaje abierto, leído de su referencia ─────────────────────────
console.log("── EL PASAJE ABIERTO ──");
{
  const casos = [
    ["Genesis 1", "Genesis", 1000, 1999],
    ["Genesis 1:3", "Genesis", 1003, 1003],
    ["Genesis 1:1-5", "Genesis", 1001, 1005],
    ["Genesis 1:1-6:8", "Genesis", 1001, 6008],
    ["Psalms 119", "Psalms", 119000, 119999],
  ];
  for (const [ref, libro, desde, hasta] of casos) {
    const t = tramoDeRef(ref);
    if (!t || t.libro !== libro || t.desde !== desde || t.hasta !== hasta) {
      fallo(`«${ref}» se leyó como ${JSON.stringify(t)}`);
    } else bien(`«${ref}» → ${libro} ${desde}-${hasta}`);
  }
  // Lo que NO es Tanaj no tiene tramo: ni el midrash, que lleva otro método,
  // ni el Talmud, donde la unidad es el folio.
  for (const ref of ["Genesis Rabbah 1:2", "Shabbat 21b", "Zohar 1:15a", "", undefined]) {
    if (tramoDeRef(ref) === null) bien(`«${ref ?? "(nada)"}» no es tramo del Tanaj`);
    else fallo(`«${ref}» no debería dar tramo`);
  }
}

// ── 3. Qué cae dentro del pasaje abierto ─────────────────────────────────
console.log("── DENTRO Y FUERA ──");
{
  const a = aparicionesDeLema("N922", tramoDeRef("Genesis 1"));
  igual(a.filter((x) => x.aquí).length, 1, "con Genesis 1 abierto, una aparición es «aquí»");
  igual(a.find((x) => x.aquí)?.ref, "Genesis 1:2", "y es la de Genesis 1:2");
  igual(a.length, 3, "y la lista sigue teniendo las tres: lo de aquí se marca, no se quita");
}

// ── 4. De la palabra hebrea a su rastro ──────────────────────────────────
console.log("── LA PALABRA HEBREA ──");
{
  // בֹהוּ · vocalizada tal como la trae la edición etiquetada.
  const bohu = rastroPalabra("בֹהוּ", "Genesis 1");
  if (!bohu) fallo("בֹהוּ no dio rastro");
  else {
    igual(bohu.lema, "N922", "בֹהוּ es el lema N922");
    igual(bohu.total, 3, "y trae sus tres apariciones");
    igual(bohu.nombrePropio, false, "no es nombre propio");
  }
  // אֶרֶץ es N776 en la tabla de morfología real, pero es palabra frecuente y
  // la concordancia no guarda frecuentes: no hay rastro, y está bien.
  igual(rastroPalabra("אֶרֶץ", "Genesis 1"), null, "una palabra frecuente no se rastrea");
  // על es preposición (R5921): aunque la tabla de juguete le ponga
  // direcciones, no se rastrea, porque no es palabra de contenido.
  igual(rastroPalabra("על", "Genesis 1"), null, "una preposición no se rastrea aunque esté en la tabla");
  // Las vocales deciden: נְשָׁמָה es el nombre (N5397) y נְשַׁמָּה el verbo.
  const nesh = rastroPalabra("נְשָׁמָה", "Genesis 2");
  igual(nesh?.lema, "N5397", "נְשָׁמָה va a su lema por las vocales");
  igual(rastroPalabra("נְשַׁמָּה", "Genesis 2"), null, "נְשַׁמָּה (verbo) no toma el lema del nombre");
}

// ── 5. Elegir las palabras del pasaje ────────────────────────────────────
console.log("── A QUÉ PALABRAS SE LES SIGUE EL RASTRO ──");
{
  // Un pasaje de juguete con cuatro palabras: bohu, joshej, Noaj y «al».
  const PASAJE =
    "בֹהוּ וְחֹשֶׁךְ על נֹחַ";
  const rr = rastrosDelPasaje(PASAJE, "Genesis 1", 5);
  const lemas = rr.map((r) => r.lema);
  if (lemas.includes("N2822")) fallo("joshej tiene todas sus apariciones dentro de Genesis 1: no hay «otros lugares» que mostrar");
  else bien("se descarta la palabra que no sale del pasaje abierto");
  if (lemas.includes("R5921")) fallo("se rastreó una preposición");
  else bien("la preposición queda fuera");
  igual(lemas.join(" "), "N922 N5146", "bohu antes que el nombre propio Noaj, aunque Noaj sea más raro");
}

// ── 6. LA REGLA: la lista completa, siempre ──────────────────────────────
console.log("── LA LISTA COMPLETA (la regla que define esta función) ──");
{
  // El límite es de PALABRAS. Pedir una sola palabra no recorta sus apariciones.
  const PASAJE = "בֹהוּ נֹחַ";
  const una = rastrosDelPasaje(PASAJE, "Genesis 1", 1);
  igual(una.length, 1, "se rastrea una sola palabra cuando se pide una");
  igual(una[0].apariciones.length, 3, "y esa palabra trae sus tres apariciones, no menos");

  // Y en el tope de la tabla tampoco se recorta: 24 son 24.
  const tope = aparicionesDeLema("N999999");
  igual(tope.length, 24, "un lema en el tope trae sus 24 apariciones");

  const escrito = formateaRastros(
    [
      {
        forma: "פ",
        consonantes: "פ",
        lema: "N999999",
        total: 24,
        apariciones: tope,
        nombrePropio: false,
      },
    ],
    "Genesis 1"
  );
  const cuántas = (escrito.match(/\d+:\d+/g) ?? []).length;
  igual(cuántas, 24, "y las 24 se escriben en el prompt");

  // Un rastro que llega incompleto NO se muestra a medias: se descarta.
  const mutilado = formateaRastros(
    [
      {
        forma: "פ",
        consonantes: "פ",
        lema: "N922",
        total: 3,
        apariciones: aparicionesDeLema("N922").slice(0, 2),
        nombrePropio: false,
      },
    ],
    "Genesis 1"
  );
  igual(mutilado, "", "un rastro recortado se descarta entero antes que mostrarse a medias");
}

// ── 7. Lo que se le manda al motor ───────────────────────────────────────
console.log("── EL BLOQUE DEL PROMPT ──");
{
  const escrito = formateaRastros(rastrosDelPasaje("בֹהוּ", "Genesis 1", 2), "Genesis 1");
  const exige = [
    ["TODAS", "dice que la lista está completa"],
    ["COMPLETA", "y lo dice otra vez, con la palabra entera"],
    ["Génesis (Bereshit)", "los libros van en español, no «Genesis»"],
    ["Isaías", "y los de fuera también"],
    ["es el pasaje abierto", "marca la aparición que el lector ya tiene delante"],
    ["CÓDIGO", "declara quién buscó las direcciones"],
  ];
  for (const [texto, qué] of exige) {
    if (escrito.includes(texto)) bien(qué);
    else fallo(`${qué} — falta «${texto}»`);
  }
  if (/guezer|gezer/i.test(escrito)) fallo("el bloque nombra una regla de derivación legal: no es eso");
  else bien("no se le pone el nombre de una regla de derivación legal");
}

// ── 8. Que el término prohibido no esté en ninguna parte de lo nuevo ─────
console.log("── EL NOMBRE ──");
{
  const { readFileSync } = await import("node:fs");
  const raíz = fileURLToPath(new URL("..", import.meta.url));
  const nuestros = [
    "lib/study/rastroPalabra.ts",
    "lib/sources/concordancia.generated.ts",
    "scripts/gen-concordancia.mjs",
  ];
  for (const archivo of nuestros) {
    const texto = readFileSync(join(raíz, archivo), "utf8");
    if (/guezer|gezer/i.test(texto)) fallo(`${archivo} nombra la regla de derivación legal`);
    else bien(`${archivo} no la nombra`);
  }
  // Y en el prompt: el bloque del rastro tampoco puede nombrarla.
  const prompt = readFileSync(join(raíz, "lib/engine/anthropic.ts"), "utf8");
  const i = prompt.indexOf("const rastro = conRastro");
  const j = prompt.indexOf("return `FLUJO PEDAGÓGICO", i);
  if (i === -1 || j === -1) fallo("no encuentro el bloque del rastro en el prompt");
  else if (/guezer|gezer/i.test(prompt.slice(i, j))) fallo("el bloque del rastro en el prompt la nombra");
  else bien("el bloque del rastro en el prompt no la nombra");
}

// ── Cierre ───────────────────────────────────────────────────────────────
console.log("");
if (errores > 0) {
  console.log(`✗ ${errores} fallo(s) en el rastro de palabras.`);
  process.exit(1);
}
console.log("✓ el rastro de palabras entrega la lista completa.");
