#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DE LA SÉPTIMA ESTANTERÍA — Filosofía judía (מַחְשֶׁבֶת יִשְׂרָאֵל)
 * ─────────────────────────────────────────────────────────────────────────
 *  El modelo propone, el código comprueba. Este script NO confía en ninguna
 *  cifra escrita a mano: toma el catálogo y el registro de obras TAL COMO los
 *  usa el sitio, arma con `bookRef` cada referencia que el menú puede generar,
 *  y la pide a Sefaria. Un ref roto en una estantería nueva es un fallo mudo:
 *  el lector toca un chip y no pasa nada.
 *
 *  Comprueba nueve cosas:
 *    1. FORMA     — los `units` de cada sección coinciden con /api/shape.
 *    2. REFS      — el primero y el último capítulo de cada sección abren.
 *    3. VERSIÓN   — el Moré sirve a IBN TIBÓN, no la Makbili de 2024.
 *    4. ROTULADO  — ningún chip ni ninguna referencia muestra inglés.
 *    5. CONTEO    — las cuentas del Sofer (33 netivot, 27 capítulos del Ramjal).
 *    6. FARSI     — NADA en español ni en inglés dentro de la interfaz persa.
 *                   Es el fallo que no podemos dejar pasar: un lector persa
 *                   que abre la estantería y se encuentra el castellano.
 *    7. AVISOS    — la frase de la categoría y las fichas de advertencia
 *                   existen en los tres idiomas.
 *    8. MÉTODO    — el TEXTO del Sofer está puesto y no se le ha caído
 *                   ninguna de sus piezas irrenunciables: el marco עִיּוּן en
 *                   lugar de פרד״ס, el aviso de que el acrónimo es NUESTRO,
 *                   el requisito de sujeto gramatical, la cancelación de la
 *                   instrucción de CLAUDE.md, las nueve prohibiciones y las
 *                   seis vías por obra.
 *    9. COMPUERTAS — C-1, C-2, C-3 y C-4 corridas sobre dos estudios de
 *                   laboratorio y el pasaje REAL del Moré I:1. Atrapan los
 *                   cinco fallos de la autopsia —incluida la gematría de אמן,
 *                   aritméticamente correcta, sobre un versículo que trae
 *                   אֱמֻנִים— y dejan intacto un estudio bien escrito.
 *                   Y LO QUE VA PEGADO DETRÁS DEL SELLO, que es donde quedó la
 *                   fuga cuando el cuerpo del estudio ya salía bien: que no se
 *                   cuele un enlace {{letter:…}} en el umbral (sin tocar los
 *                   {{study:…}}, que son la salida legal), y que el panel
 *                   «Tejido cabalístico» NO se monte en filosofía — sin
 *                   perderlo en las otras cinco estanterías.
 *
 *  Uso:  node scripts/check-filosofia.mjs   (necesita red)
 *  Sale con código ≠ 0 si algo falla.
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

const { CATALOG, bookRef, bookLabel } = await import("@/lib/sources/categories");
const { PARSHA_WORKS } = await import("@/lib/sources/catalogOverrides");
const { localizedRef } = await import("@/lib/sources/bookNames");
const { getText } = await import("@/lib/sources/sefaria");
const { tramoDeConteo, esRefDeTanaj } = await import("@/lib/sources/tanajRef");
const { disciplineFromRef } = await import("@/lib/sources/discipline");
const { subLabel } = await import("@/lib/sources/categories");
const { CATEGORY_NOTES, WORK_NOTICES, workNotice, tri } = await import("@/lib/sources/categoryNotes");

const CAT = "Jewish Thought";
const fallos = [];
const avisos = [];
let refsOk = 0;

const grupo = CATALOG.find((g) => g.id === CAT);
if (!grupo) {
  console.error("✗ no existe la categoría", CAT);
  process.exit(1);
}

// ── 1 y 5. La estantería y sus rótulos ────────────────────────────────────
const chips = grupo.subs.flatMap((s) => s.books);
console.log(`\n🔎 Filosofía judía — ${grupo.subs.length} anaqueles · ${chips.length} chips`);
for (const sub of grupo.subs) {
  console.log(`   ${sub.sub} · ${sub.subHe} — ${sub.books.length}`);
}

// El chip no puede mostrar el título inglés de Sefaria. No se adivina si una
// palabra "parece inglesa" (el español de la casa está lleno de «Netiv»,
// «Portal» y «Maamar»): se comprueba que el rótulo NO sea el id de Sefaria.
for (const b of chips) {
  for (const loc of ["es", "fa", "en"]) {
    const l = bookLabel(b, loc);
    if (l === b.id) fallos.push(`chip con el título inglés de Sefaria [${loc}]: ${b.id}`);
  }
}

// ── 2 y 4. Cada ref que el menú puede generar ─────────────────────────────
// De cada chip/sección se prueban el PRIMER y el ÚLTIMO capítulo: si la cuenta
// de `units` se pasa por uno, el último revienta y aquí se ve.
const pruebas = [];
for (const b of chips) {
  const work = PARSHA_WORKS.find((w) => w.bookId === b.id);
  if (!work) {
    // Obra simple (o maamar aplanado del Kuzari): rejilla de capítulos.
    pruebas.push({ quien: b.id, ref: bookRef(b, 1) });
    if (b.units > 1) pruebas.push({ quien: b.id, ref: bookRef(b, b.units) });
    continue;
  }
  for (const g of work.groups) {
    for (const s of g.sections) {
      // refBase: los capítulos cuelgan del libro mismo (Shemoná Perakim).
      const base = s.refBase ?? `${work.bookId}, ${s.refTitle}`;
      const quien = `${work.bookId} / ${s.label}`;
      if (s.units && s.units > 1) {
        pruebas.push({ quien, ref: `${base} 1`, nodo: s.refTitle || null });
        pruebas.push({ quien, ref: `${base} ${s.units}`, nodo: s.refTitle || null });
        // Una pasada MÁS: el capítulo siguiente al último NO debe existir.
        pruebas.push({ quien, ref: `${base} ${s.units + 1}`, debeFallar: true });
      } else {
        pruebas.push({ quien, ref: base, nodo: s.refTitle || null });
      }
    }
  }
}

console.log(`\n   probando ${pruebas.length} referencias contra Sefaria…`);
for (const p of pruebas) {
  let r = null;
  try {
    r = await getText(p.ref);
  } catch (err) {
    if (!p.debeFallar) fallos.push(`${p.quien}: «${p.ref}» no abre — ${err.message}`);
    continue;
  }
  const chars = r.segments.join("").length;
  if (p.debeFallar) {
    // Sefaria a veces devuelve un capítulo vacío en vez de un error.
    if (chars > 0) fallos.push(`${p.quien}: «${p.ref}» NO debería existir y trae ${chars} car. — units se queda corto`);
    continue;
  }
  if (chars === 0) {
    fallos.push(`${p.quien}: «${p.ref}» abre VACÍO (sin hebreo)`);
    continue;
  }
  if (chars > 40000) avisos.push(`${p.quien}: «${p.ref}» son ${chars} caracteres — estudio muy largo`);
  // El ref que ve el lector no puede traer el inglés de Sefaria: ni el título
  // del libro ni el nombre del nodo. Se comprueba contra las CADENAS REALES,
  // no contra una corazonada de qué palabra parece inglesa.
  const es = localizedRef(p.ref, "es");
  if (es === p.ref) {
    fallos.push(`ref sin traducir: «${p.ref}»`);
  } else {
    // El nombre del NODO en inglés no puede sobrevivir. (Del título del libro
    // no se puede decir lo mismo con una comparación de cadenas: el rótulo
    // español lleva a propósito la transliteración hebrea entre paréntesis
    // —«Senderos del mundo (Netivot Olam)»— y eso es el nombre de la obra,
    // no inglés sin traducir.)
    if (p.nodo && es.includes(p.nodo)) {
      fallos.push(`ref con el nodo en inglés: «${p.ref}» → «${es}»`);
    }
  }
  refsOk++;
}

// ── 2bis. Las cuentas del Sofer ───────────────────────────────────────────
// Dos cifras llegaron mal en el encargo y el Sofer las corrigió. Se comprueban
// contra la estructura montada, no contra lo que recuerde nadie.
function obra(id) {
  const w = PARSHA_WORKS.find((x) => x.bookId === id);
  return w ? w.groups.flatMap((g) => g.sections) : [];
}
const netivot = obra("Netivot Olam").filter((s) => s.refTitle.startsWith("Netiv "));
if (netivot.length !== 33) fallos.push(`Netivot Olam: ${netivot.length} netivot con nombre, deben ser 33`);
const ramjal = obra("Derekh Hashem").filter((s) => s.refTitle.startsWith("Part "));
if (ramjal.length !== 27) fallos.push(`Dérej Hashem: ${ramjal.length} capítulos con nombre, deben ser 27`);
if (obra("Netivot Olam").length !== 34) fallos.push(`Netivot Olam: ${obra("Netivot Olam").length} nodos, deben ser 34`);
if (obra("Derekh Hashem").length !== 28) fallos.push(`Dérej Hashem: ${obra("Derekh Hashem").length} nodos, deben ser 28`);
if (!fallos.some((f) => f.includes("deben ser"))) console.log("   ✓ las cuentas del Sofer: 33 netivot (34 nodos) · 27 capítulos del Ramjal (28 nodos)");

// La GLOSA EDITORIAL marcada: los subtítulos temáticos de los cuatro maamarim
// del Séfer haIkarim son nuestros, no de Sefaria, que solo los numera.
const glosas = obra("Sefer HaIkkarim").filter((s) => s.glosa);
if (glosas.length !== 4) {
  fallos.push(`Séfer haIkarim: ${glosas.length} secciones marcadas como glosa editorial, deben ser 4`);
} else {
  console.log("   ✓ los 4 subtítulos del Séfer haIkarim van marcados como glosa editorial nuestra");
}

// ── 2ter. FARSI: ni una palabra en español o en inglés ────────────────────
// La prueba no adivina idiomas: exige escritura árabe/persa y PROHÍBE letras
// latinas. Un rótulo que cayó al español trae latinas y no trae persa.
const PERSA = /[\u0600-\u06FF]/;
const LATINAS = /[A-Za-z]/;
function fa(que, texto) {
  if (!texto) { fallos.push(`[farsi] ${que}: vacío`); return; }
  if (LATINAS.test(texto)) fallos.push(`[farsi] ${que}: lleva letras latinas → «${texto}»`);
  else if (!PERSA.test(texto)) fallos.push(`[farsi] ${que}: no está en persa → «${texto}»`);
}
fa("chip de la categoría", grupo.fa);
fa("frase de la categoría", tri(CATEGORY_NOTES[CAT], "fa"));
for (const sub of grupo.subs) fa(`anaquel «${sub.sub}»`, subLabel(sub.sub, "fa"));
for (const b of chips) fa(`obra ${b.id}`, bookLabel(b, "fa"));
for (const [id, n] of Object.entries(WORK_NOTICES)) fa(`ficha de ${id}`, tri(n, "fa"));
let faOk = 0;
for (const b of chips) {
  const w = PARSHA_WORKS.find((x) => x.bookId === b.id);
  if (!w) continue;
  for (const g of w.groups) {
    fa(`grupo ${b.id}/${g.id}`, g.labelFa);
    faOk++;
    for (const sec of g.sections) { fa(`sección ${b.id}/${sec.refTitle || "(default)"}`, sec.labelFa); faOk++; }
  }
}
if (!fallos.some((f) => f.startsWith("[farsi]"))) {
  console.log(`   ✓ farsi íntegro: categoría, frase, ${grupo.subs.length} anaqueles, ${chips.length} obras, ${faOk} grupos y secciones, ${Object.keys(WORK_NOTICES).length} fichas`);
}

// Las fichas de advertencia y la frase, en los tres idiomas.
for (const loc of ["es", "fa", "en"]) {
  if (!tri(CATEGORY_NOTES[CAT], loc)) fallos.push(`la frase de la categoría falta en ${loc}`);
  for (const [id, n] of Object.entries(WORK_NOTICES)) {
    if (!tri(n, loc)) fallos.push(`la ficha de ${id} falta en ${loc}`);
    if (!workNotice(`${id}, cualquier cosa`)) fallos.push(`la ficha de ${id} no alcanza a sus secciones`);
  }
}

// ── 3. Las palabras repetidas siguen APAGADAS aquí ────────────────────────
// La sección מִלִּים חוֹזְרוֹת solo tiene sentido en el Tanaj. La puerta es una
// lista blanca de los 39 libros, así que ninguna obra de filosofía puede
// colarse — pero se comprueba, porque «se supone que no» no es una prueba.
for (const pr of pruebas) {
  if (esRefDeTanaj(pr.ref)) fallos.push(`¡${pr.ref} pasa por libro del Tanaj!`);
  if (tramoDeConteo(pr.ref) !== null) {
    fallos.push(`¡${pr.ref} activaría el conteo de palabras repetidas!`);
  }
}
console.log(`   ✓ palabras repetidas y rastro: apagados en las ${pruebas.length} referencias`);

// ── 4. La galaxia «Filosofía» del cerebro deja de estar vacía ─────────────
// Era el bug de discipline.ts: la clave decía "Philosophy" y la categoría de
// Sefaria se llama "Jewish Thought", así que ningún texto llegaba nunca.
// Se prueba sobre REFERENCIAS reales, no sobre el id del chip: el id de un
// maamar aplanado ("Kuzari-1", como "Tanya-LA") es interno nuestro y nunca
// llega a ser un ref — el ref lo arma `bookRef` con el refTemplate.
const galaxias = new Map();
for (const pr of pruebas) {
  const g = disciplineFromRef(pr.ref);
  galaxias.set(g, (galaxias.get(g) ?? 0) + 1);
  if (g !== "philosophy") {
    fallos.push(`«${pr.ref}» no cae en la galaxia «philosophy» (cae en ${g})`);
  }
}
if (!fallos.some((f) => f.includes("galaxia"))) {
  console.log(`   ✓ las ${pruebas.length} referencias caen en la galaxia «Filosofía» de /universo`);
}

// ── 5. La versión hebrea del Moré ─────────────────────────────────────────
// Se compara el texto fijado contra el que Sefaria da por defecto: si fueran
// iguales, el pin no estaría haciendo nada.
const moreFijado = await getText("Guide for the Perplexed, Part 1 5");
const moreCrudo = await fetch(
  "https://www.sefaria.org/api/texts/" +
    encodeURIComponent("Guide for the Perplexed, Part 1 5") + "?context=0"
).then((r) => r.json());
const crudo = (Array.isArray(moreCrudo.he) ? moreCrudo.he.join(" ") : String(moreCrudo.he ?? ""));
if (moreCrudo.heVersionTitle === "Moreh Nevuchim, translated by Ibn Tibon") {
  avisos.push("Sefaria ya sirve Ibn Tibón por defecto: el pin dejó de ser necesario");
} else if (moreFijado.segments.join(" ").length === 0) {
  fallos.push("el Moré fijado vino sin hebreo");
} else if (crudo.replace(/<[^>]+>/g, "").slice(0, 60) === moreFijado.segments[0].slice(0, 60)) {
  fallos.push(`el pin NO cambió nada: sigue sirviendo «${moreCrudo.heVersionTitle}»`);
} else {
  console.log(`\n   ✓ el Moré sirve a Ibn Tibón (por defecto Sefaria daba «${moreCrudo.heVersionTitle}»)`);
}

// ─────────────────────────────────────────────────────────────────────────
// ── 6. EL MOTOR: ¿qué MÉTODO elige una referencia de filosofía? ──────────
// ─────────────────────────────────────────────────────────────────────────
// Esto es el guardián del fallo del 16-nov-2026. Se generó un estudio real de
// «Guide for the Perplexed, Part 1 1» —el epígrafe del Moré, donde el Rambam
// abre citando Yeshayahu 26:2— y salió un estudio DEL VERSÍCULO: PaRDeS, los
// cincuenta portones en רֶמֶז, el Baal HaSulam y las vasijas en סוֹד, el Baal
// Shem Tov en דְּרָשׁ, y un bloque entero de «Análisis del Midrash».
//
// Todo eso se puede comprobar SIN llamar a Claude, porque todo eso se le PIDE
// en el prompt. Así que aquí se arma el prompt de verdad, con el peor caso
// posible (con fuentes, con conteo de palabras y con rastro encendidos) y se
// mira qué método seleccionó. El modelo propone; el código comprueba.
//
// La llave de la API NO se usa: el SDK se construye al importar el motor y
// exige que la variable exista, nada más. No se hace ni una llamada.
process.env.ANTHROPIC_API_KEY ||= "guardian-no-llama-a-la-api";
const { buildSystemPrompt } = await import("@/lib/engine/anthropic");
const {
  esRefDeFilosofia,
  obraDeFilosofia,
  muestraTejidoCabalistico,
  OBRAS_FILOSOFIA,
  OBRAS_FILOSOFIA_HE,
} = await import("@/lib/sources/filosofiaRef");
const { COMENTARISTAS_FILOSOFIA, comentaristasDe } = await import("@/lib/sources/comentaristas");
const {
  MARCA_METODO_FILOSOFIA,
  MARCA_MARCO_IYUN,
  MARCA_CANCELACION,
  MARCA_SUJETO,
  METODO_FILOSOFIA_PROVISIONAL,
  METODO_FILOSOFIA_ORIGEN,
} = await import("@/lib/engine/filosofiaStructure");
const { revisaFilosofia } = await import("@/lib/study/compuertasFilosofia");
const { esqueleto, esqueletosDe } = await import("@/lib/study/pertenenciaPalabra");

// Marcas EXACTAS de cada método y de cada instrucción que no debe aparecer.
// Son trozos literales del prompt, no corazonadas: si alguien reescribe esas
// líneas, esta prueba se cae y hay que venir a actualizarla — que es
// justamente lo que se quiere de un guardián.
const M = {
  filosofia: MARCA_METODO_FILOSOFIA,
  tanaj: "פרד״ס — PaRDeS en cuatro niveles",
  antesala: "מִלִּים חוֹזְרוֹת — Las palabras que se repiten",
  midrashAmpliado: "ANÁLISIS MIDRÁSHICO AMPLIADO",
  bloqueMidrash: "EL MIDRASH NO SE CITA: SE ABRE",
  rotuloBloque: "**Análisis del Midrash",
  arizal: "TODO el Arizal —Partzufim",
  sulam: "con la voz del Baal HaSulam",
  bst: "el espíritu del Baal Shem Tov",
  ragSod: "En el Sod prioriza",
  clasicos: "Rashi, Ramban, Ibn Ezra, Abarbanel, Malbim",
};

// Un ref por obra, para las pruebas que necesitan red.
const refPorObra = new Map();
for (const p of pruebas) {
  if (p.debeFallar) continue;
  const obra = obraDeFilosofia(p.ref);
  if (obra && !refPorObra.has(obra)) refPorObra.set(obra, p.ref);
}

// 6a. PERTENENCIA: toda ref que el menú genera es de filosofía.
let pertenencia = 0;
for (const p of pruebas) {
  if (p.debeFallar) continue;
  if (!esRefDeFilosofia(p.ref)) {
    fallos.push(`[motor] «${p.ref}» NO se reconoce como filosofía`);
  } else {
    pertenencia++;
  }
}
// Y ninguna otra estantería entra por esta puerta. El control importa tanto
// como la prueba: una función que dijera «sí» a todo también pasaría 6a.
const CONTROLES = [
  "Genesis 1:1",
  "Genesis 1:1-6:8",
  "Isaiah 26:2",
  "Bereshit Rabbah 39:1",
  "Shemot Rabbah 30:3",
  "Berakhot 2a",
  "Zohar, Bereshit 1:1",
  "Likutei Moharan 1:1",
  "Mishnah Avot 1:1",
  "Sefer Etz Chaim 25:1:1",
];
for (const ref of CONTROLES) {
  if (esRefDeFilosofia(ref)) fallos.push(`[motor] «${ref}» pasa por filosofía y NO lo es`);
}
if (!fallos.some((f) => f.startsWith("[motor]"))) {
  console.log(
    `\n   ✓ pertenencia: las ${pertenencia} referencias de la estantería entran ` +
      `y las ${CONTROLES.length} de control (Tanaj, midrash, Talmud, Zóhar, Cabalá) no`
  );
}

// 6b. La lista de obras sale del CATÁLOGO, no de una lista a mano, y la tabla
// de títulos hebreos cubre exactamente las mismas obras.
const enEstanteria = new Set(chips.map((b) => b.id));
const idsCatalogo = new Set(
  grupo.subs.flatMap((s) => s.books).map((b) => b.id)
);
for (const id of OBRAS_FILOSOFIA) {
  // El catálogo expandido aplana el Kuzari en cinco ids internos; el motor usa
  // el id del LIBRO, que es el que forma parte del ref.
  if (!enEstanteria.has(id) && !Array.from(enEstanteria).some((x) => x.startsWith(id))) {
    fallos.push(`[motor] la obra «${id}» no está en la estantería`);
  }
}
const heKeys = new Set(Object.keys(OBRAS_FILOSOFIA_HE));
for (const id of OBRAS_FILOSOFIA) {
  if (!heKeys.has(id)) fallos.push(`[motor] falta el título hebreo de «${id}»`);
}
for (const id of heKeys) {
  if (!OBRAS_FILOSOFIA.includes(id)) {
    fallos.push(`[motor] la tabla hebrea trae «${id}», que ya no está en la estantería`);
  }
}

// 6c. EL MÉTODO. Se arma el prompt REAL de cada referencia, en el peor caso:
// fuentes adjuntas y los dos extras del Tanaj encendidos a la fuerza.
let metodoOk = 0;
for (const [obra, ref] of refPorObra) {
  for (const loc of ["es", "fa", "en"]) {
    const prompt = buildSystemPrompt("text", loc, true, ref, true, true);
    const falta = (clave, texto) =>
      fallos.push(`[método] ${obra} [${loc}]: ${clave} — «${texto.slice(0, 40)}»`);
    if (!prompt.includes(M.filosofia)) falta("NO seleccionó el método de filosofía", M.filosofia);
    if (prompt.includes(M.tanaj)) falta("entró el método del Tanaj (PaRDeS)", M.tanaj);
    if (prompt.includes(M.antesala)) falta("entró la antesala de palabras repetidas", M.antesala);
    if (prompt.includes(M.midrashAmpliado)) falta("entró el método del midrash", M.midrashAmpliado);
    if (prompt.includes(M.bloqueMidrash)) falta("entró el BLOQUE de análisis del midrash", M.bloqueMidrash);
    if (prompt.includes(M.rotuloBloque)) falta("entró el rótulo «Análisis del Midrash»", M.rotuloBloque);
    if (prompt.includes(M.arizal)) falta("se le PIDE el Arizal", M.arizal);
    if (prompt.includes(M.sulam)) falta("se le PIDE el Baal HaSulam en Sod", M.sulam);
    if (prompt.includes(M.bst)) falta("se le PIDE el Baal Shem Tov en Drash", M.bst);
    if (prompt.includes(M.ragSod)) falta("entró la guía de fuentes del Sod", M.ragSod);
    if (prompt.includes(M.clasicos)) falta("se le piden los comentaristas del Tanaj", M.clasicos);
    metodoOk++;
  }
}
if (!fallos.some((f) => f.startsWith("[método]"))) {
  console.log(
    `   ✓ método: las ${refPorObra.size} obras, en es/fa/en (${metodoOk} prompts), ` +
      `eligen el de filosofía — sin PaRDeS, sin bloque de midrash, sin Arizal, ` +
      `sin Baal HaSulam ni Baal Shem Tov`
  );
}

// 6d. CONTROL DE NO REGRESIÓN. Lo que NO tocamos tiene que seguir igual: un
// estudio de parashá conserva su PaRDeS, su bloque compacto de midrash y su
// lista clásica de comentaristas; un midrash abierto conserva su método
// ampliado. Sin esto, «arreglar filosofía» podría haber roto el resto del sitio.
const pTanaj = buildSystemPrompt("text", "es", true, "Genesis 1:1", true, true);
if (!pTanaj.includes(M.tanaj)) fallos.push("[regresión] un estudio del Tanaj perdió el PaRDeS");
if (!pTanaj.includes(M.antesala)) fallos.push("[regresión] un estudio del Tanaj perdió la antesala de palabras repetidas");
if (!pTanaj.includes(M.bloqueMidrash)) fallos.push("[regresión] un estudio del Tanaj perdió el bloque de análisis del midrash");
if (!pTanaj.includes(M.clasicos)) fallos.push("[regresión] un estudio del Tanaj perdió la lista clásica de comentaristas");
if (!pTanaj.includes(M.arizal)) fallos.push("[regresión] un estudio del Tanaj perdió el Arizal en מְפָרְשִׁים");
if (!pTanaj.includes(M.sulam)) fallos.push("[regresión] un estudio del Tanaj perdió el Baal HaSulam en Sod");
if (!pTanaj.includes(M.bst)) fallos.push("[regresión] un estudio del Tanaj perdió la voz jasídica en Drash");
if (!pTanaj.includes(M.ragSod)) fallos.push("[regresión] un estudio del Tanaj perdió la guía de fuentes del Sod");
if (pTanaj.includes(M.filosofia)) fallos.push("[regresión] un estudio del Tanaj entró por el método de filosofía");
const pMidrash = buildSystemPrompt("text", "es", true, "Bereshit Rabbah 39:1", false, false);
if (!pMidrash.includes(M.midrashAmpliado)) fallos.push("[regresión] un midrash abierto perdió su método ampliado");
if (pMidrash.includes(M.bloqueMidrash)) fallos.push("[regresión] a un midrash abierto le entró el bloque compacto");
if (pMidrash.includes(M.filosofia)) fallos.push("[regresión] un midrash abierto entró por el método de filosofía");
if (!fallos.some((f) => f.startsWith("[regresión]"))) {
  console.log("   ✓ sin regresión: el Tanaj conserva PaRDeS + bloque + clásicos + Arizal; el midrash, su método ampliado");
}

// 6e. LOS COMENTARISTAS CORRECTOS POR OBRA. Rashi no comenta el Moré.
for (const obra of Object.keys(COMENTARISTAS_FILOSOFIA)) {
  if (!OBRAS_FILOSOFIA.includes(obra)) {
    fallos.push(`[comentaristas] la tabla trae «${obra}», que no está en la estantería`);
  }
}
for (const [obra, ref] of refPorObra) {
  const c = comentaristasDe(ref);
  const esperada = COMENTARISTAS_FILOSOFIA[obra];
  const prompt = buildSystemPrompt("text", "es", true, ref, false, false);
  if (esperada && esperada.length > 0) {
    if (c.fuente !== "filosofia") {
      fallos.push(`[comentaristas] ${obra}: la lista viene de «${c.fuente}»`);
    }
    for (const com of esperada) {
      if (!prompt.includes(com.nombre)) {
        fallos.push(`[comentaristas] ${obra}: el prompt no pide «${com.nombre}»`);
      }
    }
  } else {
    // Obra SIN comentaristas en Sefaria: el motor tiene que SABERLO.
    if (c.fuente !== "filosofia-sin-comentaristas") {
      fallos.push(`[comentaristas] ${obra}: debería declararse sin comentaristas y dice «${c.fuente}»`);
    }
    if (!prompt.includes("NO TIENE COMENTARISTAS")) {
      fallos.push(`[comentaristas] ${obra}: el prompt no le dice que no hay comentaristas`);
    }
  }
}
// Y existen DE VERDAD, con hebreo. Se comprueba contra Sefaria, obra por obra.
let comOk = 0;
for (const [obra, lista] of Object.entries(COMENTARISTAS_FILOSOFIA)) {
  for (const com of lista) {
    let idx = null;
    try {
      const r = await fetch(
        `https://www.sefaria.org/api/v2/raw/index/${encodeURIComponent(com.sefaria)}`
      );
      if (r.ok) idx = await r.json();
    } catch {
      /* sin red */
    }
    if (!idx) {
      fallos.push(`[comentaristas] «${com.sefaria}» NO existe en Sefaria`);
      continue;
    }
    if (idx.dependence !== "Commentary") {
      fallos.push(`[comentaristas] «${com.sefaria}» no es un comentario (dependence=${idx.dependence})`);
    }
    const bases = (idx.base_text_titles ?? []).map((b) => (typeof b === "string" ? b : b?.en));
    if (!bases.includes(obra)) {
      fallos.push(`[comentaristas] «${com.sefaria}» no comenta «${obra}» (comenta ${bases.join(", ") || "nada"})`);
    }
    comOk++;
  }
}
if (!fallos.some((f) => f.startsWith("[comentaristas]"))) {
  const total = Object.values(COMENTARISTAS_FILOSOFIA).reduce((n, l) => n + l.length, 0);
  const sin = OBRAS_FILOSOFIA.filter((o) => !COMENTARISTAS_FILOSOFIA[o]).length;
  console.log(
    `   ✓ comentaristas: ${comOk}/${total} existen en Sefaria y comentan su obra; ` +
      `las otras ${sin} obras se declaran SIN comentaristas (y el motor lo sabe)`
  );
}

// 6f. Los títulos hebreos de la tabla son los que Sefaria devuelve de verdad.
let heOk = 0;
for (const [obra, ref] of refPorObra) {
  const esperado = OBRAS_FILOSOFIA_HE[obra];
  if (!esperado) continue;
  let heRef = null;
  try {
    heRef = (await getText(ref)).heRef ?? null;
  } catch {
    /* ya protestó la prueba de refs */
  }
  if (!heRef) continue;
  if (!heRef.startsWith(esperado)) {
    fallos.push(`[hebreo] ${obra}: Sefaria devuelve «${heRef}» y la tabla dice «${esperado}»`);
  } else {
    // Y el ref hebreo, tal cual lo da Sefaria, entra por la puerta.
    if (!esRefDeFilosofia(heRef)) fallos.push(`[hebreo] «${heRef}» no se reconoce como filosofía`);
    heOk++;
  }
}
if (!fallos.some((f) => f.startsWith("[hebreo]"))) {
  console.log(`   ✓ hebreo: los ${heOk} títulos de la tabla son los que Sefaria devuelve, y abren la puerta`);
}

if (METODO_FILOSOFIA_PROVISIONAL) {
  fallos.push(
    `el método de filosofía volvió al andamio PROVISIONAL de infraestructura: ` +
      `el texto del Sofer está en ${METODO_FILOSOFIA_ORIGEN}`
  );
}

// ─────────────────────────────────────────────────────────────────────────
// ── 7. EL TEXTO DEL MÉTODO DEL SOFER: lo que no se puede perder ──────────
// ─────────────────────────────────────────────────────────────────────────
// No se comprueba «que el prompt sea largo»: se comprueban las piezas que el
// Sofer marcó como irrenunciables, una por una, en las once obras y en los
// tres idiomas. Si alguien reescribe el bloque y se le cae una, aquí protesta.
const IRRENUNCIABLES = [
  // פרד״ס se RETIRA y en su lugar va el marco propio.
  { clave: "el marco עִיּוּן", texto: MARCA_MARCO_IYUN },
  // Y el acrónimo es NUESTRO: el motor no puede presentarlo como tradicional.
  { clave: "el aviso de que el acrónimo es nuestro", texto: "ESTE ACRÓNIMO ES NUESTRO" },
  { clave: "la prohibición de presentarlo como rúbrica recibida", texto: "NO es una rúbrica recibida" },
  // El cuarto paso, blindado por GRAMÁTICA y no por tono.
  { clave: "el requisito de sujeto gramatical", texto: MARCA_SUJETO },
  { clave: "la regla del sujeto, literal", texto: "SI LA ORACIÓN NO TIENE UN SUJETO POSTERIOR CON NOMBRE, LA" },
  { clave: "la tercera salida cerrada", texto: "NO EXISTE. Está cerrada" },
  // La cancelación en voz alta de la instrucción de CLAUDE.md.
  { clave: "la cancelación de la instrucción de CLAUDE.md", texto: MARCA_CANCELACION },
  { clave: "los dos nombres que CLAUDE.md coloca por defecto", texto: "BAAL HASULAM EN סוֹד Y AL BAAL" },
  // Las secciones que se mantienen y las que se van.
  { clave: "la línea obligatoria de la jatimá", texto: "QUÉ NIEGA EL AUTOR" },
  { clave: "la cuota del umbral de navegación", texto: "AL MENOS\nUNO SE QUEDA EN LA ESTANTERÍA DE FILOSOFÍA" },
  { clave: "la hitbonenut como orden del Rambam", texto: "Hiljot Yesodei HaTorá 2:2" },
  { clave: "la prohibición de inventar una práctica", texto: "PROHIBIDO INVENTAR UNA PRÁCTICA" },
  { clave: "las palabras repetidas, apagadas y explicadas", texto: "UN TRATADO FILOSÓFICO REPITE SUS" },
  // Las nueve prohibiciones, enteras, con prueba y salida legal.
  { clave: "P-1", texto: "P-1 · NO LE ATRIBUYAS" },
  { clave: "P-2", texto: "P-2 · NO LEAS A UN FILÓSOFO" },
  { clave: "P-3", texto: "P-3 · SI ENTRA UNA VOZ CABALÍSTICA" },
  { clave: "P-4", texto: "P-4 · CUANDO EL TEXTO FILOSÓFICO CITE UN VERSÍCULO" },
  { clave: "P-5", texto: "P-5 · NADA DE GEMATRÍA" },
  { clave: "P-6", texto: "P-6 · NO CITES UN COMENTARISTA" },
  { clave: "P-7", texto: "P-7 · NO CONFUNDAS LA EDICIÓN" },
  { clave: "P-8", texto: "P-8 · DOS NOMBRES PROPIOS" },
  { clave: "P-9", texto: "P-9 · LO QUE NO PUEDAS LOCALIZAR" },
  // P-10: lo que va PEGADO DETRÁS del sello. El cuerpo del estudio puede salir
  // perfecto y la fuga estar en el umbral de navegación.
  { clave: "P-10", texto: "P-10 · EN EL UMBRAL הֶמְשֵׁךְ NO HAY ENLACES DE LETRA" },
  { clave: "la cancelación de los enlaces de letra", texto: "QUE TE PIDE ENLACES" },
  { clave: "el umbral solo admite enlaces de estudio", texto: "SOLO enlaces {{study:…}}" },
  { clave: "la prueba que faltó (אמונים no es אמן)", texto: "אֱמֻנִים NO ES אָמֵן" },
  { clave: "cada prohibición trae su salida legal", texto: "SALIDA LEGAL" },
];

// Y la otra mitad de la misma regla: que el año no esté, no solo que se diga
// que no debe estar. Las cuatro fechas tibónidas que circulan (1161, 1186,
// 1167, 1204) son las estándar, pero el Sofer las leyó de su conocimiento y no
// de una ficha, y medido contra Sefaria NINGUNA versión tibónida trae fecha de
// traducción: los años de los títulos de versión son de EDICIÓN (Varsovia
// 1875, Ámsterdam 1768, Leipzig 1864, Even Shmuel 1973, París 1856).
// El patrón busca un año PEGADO al traductor, no el año suelto: «1138–1204» es
// la vida del Rambam, está verificada y se queda.
const ANIO_DEL_TRADUCTOR = /ibn Tib[óo]n[^.\n]{0,60}\b1[0-9]{3}\b/;

// Las SEIS vías propias por obra. Son seis, no tres.
const VIAS_ESPERADAS = {
  "Duties of the Heart": "PARTIDA POR PUERTA",
  "Nefesh HaChayim": "EL\nCUARTO PASO SE INVIERTE",
  "Derekh Hashem": "EL\nCUARTO PASO SE INVIERTE",
  "Netivot Olam": "EL MIDRASH RAZONADO, ACOTADO",
  Kuzari: "EL DIÁLOGO: QUIÉN HABLA",
  "Nineteen Letters": "EL DIÁLOGO: QUIÉN HABLA",
  "Derashot HaRan": "EL SERMÓN, Y UNA ATRIBUCIÓN FRÁGIL",
  "Eight Chapters": "EL TEXTO QUE NO ES UN LIBRO",
};
// Las SEIS obras que no se escribieron en hebreo: cadena de traducción.
const TRADUCIDAS = [
  "Duties of the Heart",
  "HaEmunot veHaDeot",
  "Eight Chapters",
  "Guide for the Perplexed",
  "Kuzari",
  "Nineteen Letters",
];

let metodoTexto = 0;
for (const [obra, ref] of refPorObra) {
  for (const loc of ["es", "fa", "en"]) {
    const prompt = buildSystemPrompt("text", loc, true, ref, true, true);
    for (const i of IRRENUNCIABLES) {
      if (!prompt.includes(i.texto)) {
        fallos.push(`[texto] ${obra} [${loc}]: falta ${i.clave}`);
      }
    }
    const via = VIAS_ESPERADAS[obra];
    if (via && !prompt.includes(via)) {
      fallos.push(`[texto] ${obra} [${loc}]: falta su vía propia («${via.replace(/\n/g, " ")}»)`);
    }
    if (TRADUCIDAS.includes(obra)) {
      if (!prompt.includes("LA CADENA DE LA TRADUCCIÓN")) {
        fallos.push(`[texto] ${obra} [${loc}]: es una obra traducida y no se le nombra la cadena`);
      }
      if (!prompt.includes("PROHIBIDO TODO ARGUMENTO DE NIVEL DE PALABRA")) {
        fallos.push(`[texto] ${obra} [${loc}]: traducida y sin la prohibición de argumentos de palabra`);
      }
      // El año de la traducción NO se nombra, y el prompt lo dice en voz alta.
      if (!prompt.includes("EL AÑO DE LA TRADUCCIÓN NO SE NOMBRA")) {
        fallos.push(`[texto] ${obra} [${loc}]: traducida y sin el aviso de que el año no se nombra`);
      }
      const colado = ANIO_DEL_TRADUCTOR.exec(prompt);
      if (colado) {
        fallos.push(
          `[texto] ${obra} [${loc}]: se coló un año de traducción sin verificar — «${colado[0]}»`
        );
      }
    } else if (!prompt.includes("se escribió EN HEBREO")) {
      fallos.push(`[texto] ${obra} [${loc}]: se escribió en hebreo y no se le dice`);
    }
    // La inversión del cuarto paso: en las dos obras del cabalista la Cabalá
    // NO se prohíbe, y en las otras nueve SÍ.
    const esCabalista = obra === "Nefesh HaChayim" || obra === "Derekh Hashem";
    if (esCabalista) {
      // La inversión tiene DOS mitades y hacen falta las dos: que se diga el
      // peligro al revés, y que NO se le repita la prohibición general — si se
      // le deja, el motor aplica la prohibición al revés y se queda mudo justo
      // donde debería hablar (§4.2 del método).
      if (!prompt.includes("ATENCIÓN: en ESTA obra el autor ES EL CABALISTA")) {
        fallos.push(`[texto] ${obra} [${loc}]: el autor ES el cabalista y no se invierte el aviso`);
      }
      if (!prompt.includes("LEER AL CABALISTA COMO RACIONALISTA")) {
        fallos.push(`[texto] ${obra} [${loc}]: falta el peligro invertido`);
      }
      if (prompt.includes("PROHIBIDA la Cabalá luriana como clave de lectura")) {
        fallos.push(`[texto] ${obra} [${loc}]: le entra la prohibición general de la Cabalá luriana`);
      }
    }
    if (!esCabalista && !prompt.includes("PROHIBIDA la Cabalá luriana como clave de lectura")) {
      fallos.push(`[texto] ${obra} [${loc}]: falta la prohibición de la Cabalá luriana`);
    }
    metodoTexto++;
  }
}
if (!fallos.some((f) => f.startsWith("[texto]"))) {
  console.log(
    `\n   ✓ texto del método: ${IRRENUNCIABLES.length} piezas irrenunciables + ` +
      `las 9 prohibiciones + las vías propias, en ${metodoTexto} prompts ` +
      `(${refPorObra.size} obras × 3 idiomas)`
  );
}

// ─────────────────────────────────────────────────────────────────────────
// ── 8. LAS CUATRO COMPUERTAS, sin llamar a Claude ────────────────────────
// ─────────────────────────────────────────────────────────────────────────
// Se prueban con DOS estudios de laboratorio y el PASAJE REAL del Moré I:1
// recuperado de Sefaria:
//
//   · el FALLIDO reproduce los cinco fallos de la autopsia del 16-nov-2026,
//     incluido el que ninguna compuerta anterior veía: la gematría de אמן,
//     aritméticamente correcta, sobre una palabra que el versículo no trae
//     (es אֱמֻנִים). Las cuatro compuertas tienen que atraparlo.
//   · el CORRECTO está escrito según el método del Sofer. Tiene que salir con
//     CERO hallazgos. Esta mitad de la prueba vale tanto como la otra: una
//     compuerta que marcara todo también «atraparía» el fallido, y marcar como
//     falso lo correcto sale más caro que dejar pasar una cita mala.
const pasajeMore = (await getText("Guide for the Perplexed, Part 1 1")).segments.join(" ");
if (!esqueletosDe(pasajeMore).has(esqueleto("אמונים"))) {
  fallos.push("[compuertas] el pasaje del Moré I:1 no trae אמונים — la prueba perdió su base");
}
if (esqueletosDe(pasajeMore).has(esqueleto("אמן"))) {
  fallos.push("[compuertas] el pasaje del Moré I:1 trae אמן — la prueba perdió su base");
}

const ESTUDIO_FALLIDO = `
## מִלִּים חוֹזְרוֹת — Las palabras que se repiten
El capítulo insiste en la palabra שער.

## מְפָרְשִׁים
Rashi explica que las puertas son las de la Torá. El Ramban lo discute, e
Ibn Ezra añade otra lectura.

## פרד״ס — PaRDeS en cuatro niveles
En רֶמֶז: toda su obra avanza por cincuenta portones de la tradición.
La gematría de אמן = 91 se cruza con יהוה (26) + אדני (65) = 91.
En סוֹד, el Baal HaSulam enseña que las vasijas se rompen, y el Baal Shem Tov
lo lee igual.

**Análisis del Midrash · Bereshit Rabá 8:1**
- La grieta: ...
- Lo que dice el midrash: ...
- La parábola y su aplicación: ...
- Dónde no encaja: ...
- Qué se pierde sin: ...
- Lo que queda abierto: ...

## דִּקְדּוּק הַכָּתוּב
La grieta del texto.
`;

const ESTUDIO_CORRECTO = `
## תַּרְגּוּם
La guía de los perplejos no fue escrita en hebreo: viene del judeo-árabe,
traducida por Shmuel ibn Tibón (el hijo) en 1204. Lo que sigue traduce al
traductor. El pasaje abre con un epígrafe y entra en su tema: צלם ודמות.

## מְפָרְשִׁים
Narboni (comp. 1354–1362) escribe que el Rambam empezó por esto «porque abarca
todas las partes de la corporeización». Efodi (impr. Venecia 1551) comenta el
epígrafe mismo. Asher ben Avraham Crescas (comp. c. 1400–1440) lo sigue, y no
se confunde con Jasdai Crescas (1340–1410/11), que la refuta en Or Hashem.

## עִיּוּן
### עִקָּר
La palabra צלם no significa forma ni figura, y el autor escribe contra quienes
leen el versículo de Bereshit como un retrato.
### יְסוֹדוֹת
El paso que carga el peso es la distinción entre תמונה y צורה. ¿Cierra? Casi.
### וִכּוּחַ
Jasdai Crescas (1399–1409), en Or Hashem, discute la física de la Guía.
### נְקוּדַּת הַמִּפְגָּשׁ
Rav Kook (1865–1935), en LiNvujei HaDor (1896–1904), lee esta negación de
atributos desde otras categorías, siete siglos después.

## הִתְבּוֹנְנוּת
¿Me convence? ¿En qué paso me bajo, si me bajo?

## מַעֲשֶׂה
Dejar de hablar de Dios con palabras de cuerpo, y contar cuántas veces al día
lo hago.

## חֲתִימָה
Qué niega el autor: esto no autoriza a atribuirle a Dios forma ni figura.

## הֶמְשֵׁךְ
¿Qué dice el Kuzari sobre lo mismo?
`;

const malo = revisaFilosofia({
  estudio: ESTUDIO_FALLIDO,
  obra: "Guide for the Perplexed",
  pasaje: pasajeMore,
  fuentes: "",
});
const bueno = revisaFilosofia({
  estudio: ESTUDIO_CORRECTO,
  obra: "Guide for the Perplexed",
  pasaje: pasajeMore,
  fuentes: "",
});

// C-1: tiene que atrapar אמן, que es el caso que abrió el expediente.
const c1Amen = malo.hallazgos.find((h) => h.compuerta === "C-1" && esqueleto(h.raw) === esqueleto("אמן"));
if (!c1Amen) fallos.push("[compuertas] C-1 NO atrapó la gematría de אמן sobre un versículo que trae אמונים");
// C-2: la aritmética en filosofía se bloquea (el pasaje no trae ninguna cifra).
if (malo.resumen["C-2"] === 0) fallos.push("[compuertas] C-2 dejó pasar la gematría en una obra de filosofía");
// C-3: Rashi, el Ramban e Ibn Ezra son fallo duro aquí.
for (const quien of ["Rashi", "Ramban", "Ibn Ezra"]) {
  if (!malo.hallazgos.some((h) => h.compuerta === "C-3" && h.raw.includes(quien))) {
    fallos.push(`[compuertas] C-3 dejó pasar a ${quien} como comentarista del Moré`);
  }
}
// Y las dos voces que CLAUDE.md nombra por defecto, sin la distancia nombrada.
for (const quien of ["Baal HaSulam", "Baal Shem Tov"]) {
  if (!malo.hallazgos.some((h) => h.compuerta === "C-3" && h.raw.includes(quien))) {
    fallos.push(`[compuertas] C-3 dejó pasar a ${quien} sin siglo ni obra localizada`);
  }
}
// C-4: los títulos de los otros dos métodos.
for (const titulo of ["מִלִּים", "פרד״ס", "דִּקְדּוּק", "Análisis del Midrash"]) {
  if (!malo.hallazgos.some((h) => h.compuerta === "C-4" && h.raw.includes(titulo))) {
    fallos.push(`[compuertas] C-4 dejó pasar el título «${titulo}» en un estudio de filosofía`);
  }
}
// Y el control, que vale tanto como la prueba.
if (bueno.hallazgos.length > 0) {
  for (const h of bueno.hallazgos) {
    fallos.push(`[compuertas] un estudio CORRECTO salió marcado: ${h.compuerta} «${h.raw}» — ${h.detalle}`);
  }
}
// C-4 también vigila lo que va PEGADO DETRÁS DEL SELLO. En la prueba del
// 16-nov-2026 el cuerpo del estudio salió correcto y la fuga estaba en el
// umbral: un puente «¿Por qué שומר abre con la letra Shin, y qué guarda esa
// letra?». Los {{study:…}} NO se tocan — los otros tres puentes eran buenos.
const UMBRAL_CON_LETRA = `
## הֶמְשֵׁךְ
- ¿Qué significa {{study:tzelem|«imagen de Dios»}} si Dios no tiene imagen?
- ¿Por qué שומר (guardar) abre con la letra {{letter:shin|Shin}}, y qué guarda esa letra?
`;
const rUmbral = revisaFilosofia({
  estudio: UMBRAL_CON_LETRA,
  obra: "Guide for the Perplexed",
  pasaje: pasajeMore,
  fuentes: "",
});
if (!rUmbral.hallazgos.some((h) => h.compuerta === "C-4" && h.raw.includes("letter:"))) {
  fallos.push("[compuertas] C-4 dejó pasar un enlace {{letter:…}} en el umbral de un estudio de filosofía");
}
if (rUmbral.hallazgos.some((h) => h.raw.includes("study:"))) {
  fallos.push("[compuertas] C-4 marcó un enlace {{study:…}}, que SÍ está permitido");
}

// Y la otra pieza de la misma fuga: el panel «Tejido cabalístico» no se arma
// para un ref de filosofía. Se comprueba LA DECISIÓN —la función que usa el
// componente— y no la forma de escribirla, en las 206 referencias que el menú
// puede generar y en las 10 de control.
let sinTejido = 0;
for (const pr of pruebas) {
  if (pr.debeFallar) continue;
  if (muestraTejidoCabalistico(pr.ref)) {
    fallos.push(`[tejido] «${pr.ref}» montaría el panel cabalístico y es filosofía`);
  } else {
    sinTejido++;
  }
}
// El control vale tanto como la prueba: en las otras cinco estanterías el panel
// SE QUEDA, y en Cabalá y Jasidut está en su sitio.
for (const ref of CONTROLES) {
  if (!muestraTejidoCabalistico(ref)) {
    fallos.push(`[tejido] «${ref}» PERDIÓ el panel cabalístico y no es filosofía`);
  }
}
if (!fallos.some((f) => f.startsWith("[tejido]"))) {
  console.log(
    `   ✓ tejido cabalístico: no se monta en las ${sinTejido} referencias de filosofía, ` +
      `y sigue montándose en las ${CONTROLES.length} de control (Tanaj, midrash, Talmud, Zóhar, Cabalá)`
  );
}

// El Arizal es admisible SOLO en las dos obras del cabalista (§4.2).
const conArizal = "El Arizal (1534–1572) enseña en Etz Jaim que el tzimtzum es literal.";
for (const obra of ["Nefesh HaChayim", "Derekh Hashem"]) {
  const r = revisaFilosofia({ estudio: conArizal, obra, pasaje: pasajeMore, fuentes: "" });
  if (r.hallazgos.some((h) => h.raw.includes("Arizal"))) {
    fallos.push(`[compuertas] C-3 marca al Arizal en «${obra}», donde el autor ES el cabalista`);
  }
}
if (!fallos.some((f) => f.startsWith("[compuertas]"))) {
  console.log(
    `   ✓ compuertas: C-1 ${malo.resumen["C-1"]} · C-2 ${malo.resumen["C-2"]} · ` +
      `C-3 ${malo.resumen["C-3"]} · C-4 ${malo.resumen["C-4"]} hallazgos en el estudio ` +
      `fallido (incluida la gematría de אמן sobre un versículo que trae אמונים), ` +
      `y CERO en el correcto`
  );
}

// ─────────────────────────────────────────────────────────────────────────
// ── 10. ¿LLEGAN DE VERDAD LOS COMENTARISTAS AL PROMPT EN MODO PROFUNDO? ──
// ─────────────────────────────────────────────────────────────────────────
// El Sofer verificó que EFODI COMENTA EXACTAMENTE EL EPÍGRAFE que el motor
// quiso interpretar por su cuenta, y que sobre el solo capítulo 1 de la parte
// 1 hay 43 enlaces de comentario. O sea: había una lectura real, antigua,
// exacta y recuperable, y el motor escribió una propia.
//
// La duda razonable era la PRIORIDAD DE FUENTES: `related.ts` ordena cada
// nivel por una lista (`PRIORITY.commentary`) que es la del Tanaj —Rashi,
// Ramban, Ibn Ezra, Or HaJaim, Sforno…— y se queda con los cinco primeros de
// cada nivel. Ninguno de los comentaristas del Moré está en esa lista, así que
// todos empatan en el último puesto, y la pregunta es si alguno se cae.
// Medido aquí contra Sefaria: no se cae ninguno, porque son EXACTAMENTE cinco
// y el tope es cinco. Es un empate justo, no un margen: si Sefaria añadiera un
// sexto comentarista a la Guía, el sexto se caería en silencio. Por eso esto se
// comprueba, y por eso se avisa cuando el cupo queda al límite.
const { gatherSources, formatSourcesForPrompt } = await import("@/lib/relations/related");
const REF_MORE = "Guide for the Perplexed, Part 1 1";
const ESPERADOS_MORE = ["Efodi", "Shem Tov", "Narboni", "Crescas", "Abarbanel"];
let fuentesMore = [];
try {
  fuentesMore = await gatherSources(REF_MORE);
} catch (err) {
  fallos.push(`[rag] gatherSources de «${REF_MORE}» falló — ${err.message}`);
}
const comentariosMore = fuentesMore.filter((f) => f.level === "commentary");
for (const quien of ESPERADOS_MORE) {
  const f = comentariosMore.find((x) => x.title.includes(quien));
  if (!f) {
    fallos.push(`[rag] «${quien}» NO llega al prompt de «${REF_MORE}» en modo profundo`);
  } else if (f.he.length === 0) {
    fallos.push(`[rag] «${quien}» llega SIN hebreo`);
  }
}
if (comentariosMore.length >= 5) {
  avisos.push(
    `los 5 comentaristas de la Guía llegan al prompt, pero el cupo por nivel ` +
      `(PER_LEVEL=5 en lib/relations/related.ts) queda EXACTAMENTE lleno: si ` +
      `Sefaria añadiera un sexto comentarista, se caería en silencio`
  );
}
// Y el que importa: el comentario de Efodi al epígrafe, que es el que el motor
// se saltó. Se comprueba por su CONTENIDO, no por el nombre del enlace.
const efodi = comentariosMore.find((x) => x.title.includes("Efodi"));
if (efodi && !efodi.he.includes("שומר אמונים")) {
  fallos.push(
    `[rag] el comentario de Efodi que llega no es el del epígrafe: ` +
      `«${efodi.ref}» no trae שומר אמונים`
  );
}
// El bloque formateado, tal como entra en <fuentes> en el prompt del usuario.
const bloqueMore = formatSourcesForPrompt(fuentesMore);
for (const quien of ESPERADOS_MORE) {
  if (!bloqueMore.includes(quien)) fallos.push(`[rag] «${quien}» no aparece en el bloque <fuentes>`);
}
// Y con fuentes adjuntas, la guía de uso que entra es la DE FILOSOFÍA, no la
// general: la general manda «en el Sod prioriza el Zohar y el Arizal», que en
// el Moré es exactamente el fallo.
const promptMore = buildSystemPrompt("text", "es", true, REF_MORE, false, false);
if (!promptMore.includes("Los COMENTARISTAS enlazados a una obra de filosofía")) {
  fallos.push("[rag] el prompt del Moré no trae la guía de fuentes de FILOSOFÍA");
}
// Enlaces del Tanaj: hoy se descartan en silencio (categoryToLevel no conoce
// «Tanakh»), así que los versículos que el autor CITA no llegan aunque la guía
// de fuentes le hable de ellos al motor. No se arregla aquí —tocar eso cambia
// las seis estanterías— pero queda dicho en cada pasada.
if (!fuentesMore.some((f) => f.level === "targum" || f.ref.startsWith("Genesis"))) {
  avisos.push(
    `los enlaces de categoría «Tanakh» NO llegan al prompt (categoryToLevel de ` +
      `lib/relations/related.ts no los mapea): el motor no recibe los versículos ` +
      `que el autor cita, aunque la guía de fuentes se los nombre`
  );
}
if (!fallos.some((f) => f.startsWith("[rag]"))) {
  console.log(
    `   ✓ fuentes en modo profundo: los ${comentariosMore.length} comentaristas del Moré ` +
      `llegan con hebreo real al bloque <fuentes>, y el de Efodi es el del epígrafe ` +
      `(שומר אמונים)`
  );
}

// ── Resultado ─────────────────────────────────────────────────────────────
console.log("");
for (const a of avisos) console.log(`  ⚠️  ${a}`);
if (fallos.length === 0) {
  console.log(`\n✅ ${refsOk} referencias de filosofía judía abren con texto hebreo real.`);
  console.log(`✅ Ningún chip ni ninguna referencia muestra inglés al lector.\n`);
  process.exit(0);
}
console.log("");
for (const f of fallos) console.log(`  ✗ ${f}`);
console.log(`\n❌ ${fallos.length} fallo(s) · ${refsOk} referencias correctas\n`);
process.exit(1);
