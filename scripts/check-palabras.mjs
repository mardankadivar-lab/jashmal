#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DE LAS PALABRAS QUE SE REPITEN
 * ─────────────────────────────────────────────────────────────────────────
 *  Antes de desarrollar un capítulo, el estudio muestra qué palabras repite,
 *  porque ahí se ve su énfasis. Esa cuenta la hace el CÓDIGO y el motor la
 *  copia: si la cuenta está mal, el lector lee un número falso con la
 *  autoridad de un dato. Así que se comprueba sobre pasajes congelados del
 *  Tanaj —dominio público, con el HTML tal como lo manda Sefaria— y con
 *  números contados a mano, no sacados de la propia implementación.
 *
 *  Los tres casos del medio son los tres fallos que aparecieron al montarlo,
 *  y cada uno destruía algo:
 *   · el maqaf (אֶת־הָאוֹר) desaparecía con el niqud y pegaba dos palabras
 *     en una, inventando «אתהאור» como palabra del capítulo;
 *   · las etiquetas de Sefaria se cambiaban por un espacio y partían la
 *     palabra que las lleva dentro: el שְׁמַע de Devarim 6 se perdía;
 *   · al pelar mem y shin, שָׁמַיִם (cielos) se contaba dentro de מַיִם (aguas)
 *     justo en el capítulo donde separarlas es el tema.
 *
 *  Uso:  npm run palabras:check
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

const { palabrasRepetidas, formateaRepetidas } = await import("@/lib/study/palabrasRepetidas");
const { esRefDeTanaj, tramoDeConteo } = await import("@/lib/sources/tanajRef");

let errores = 0;
const fallo = (msg) => {
  errores++;
  console.log(`  ✗ ${msg}`);
};

// ── Pasajes congelados, con el HTML que manda Sefaria ─────────────────────
//
// Van escapados en \uXXXX a propósito, tal como los devuelve la API. El hebreo
// se escribe con marcas combinantes y un copiar-y-pegar desde la terminal puede
// reordenarlas sin que se note: la forma se ve idéntica y ya no coincide con la
// de la edición etiquetada. Pasó: la oscuridad de Bereshit 1 dejaba de
// agruparse porque el texto pegado a mano no era byte a byte el del texto real.
//
// Bereshit 1:1-5 · Devarim 6:4 (el Shemá, con la ayin y la dalet grandes
// dentro de una etiqueta) · Bereshit 1:6-8 (donde conviven מים y שמים).

const BERESHIT = [
  "<big>\u05d1\u05bc\u05b0</big>\u05e8\u05b5\u05d0\u05e9\u05c1\u05b4\u0596\u05d9\u05ea \u05d1\u05bc\u05b8\u05e8\u05b8\u05a3\u05d0 \u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u0591\u05d9\u05dd \u05d0\u05b5\u05a5\u05ea \u05d4\u05b7\u05e9\u05c1\u05bc\u05b8\u05de\u05b7\u0596\u05d9\u05b4\u05dd \u05d5\u05b0\u05d0\u05b5\u05a5\u05ea \u05d4\u05b8\u05d0\u05b8\u05bd\u05e8\u05b6\u05e5\u05c3",
  "\u05d5\u05b0\u05d4\u05b8\u05d0\u05b8\u0597\u05e8\u05b6\u05e5 \u05d4\u05b8\u05d9\u05b0\u05ea\u05b8\u05a5\u05d4 \u05ea\u05b9\u0599\u05d4\u05d5\u05bc\u0599 \u05d5\u05b8\u05d1\u05b9\u0594\u05d4\u05d5\u05bc \u05d5\u05b0\u05d7\u05b9\u0596\u05e9\u05c1\u05b6\u05da\u05b0 \u05e2\u05b7\u05dc\u05be\u05e4\u05bc\u05b0\u05e0\u05b5\u05a3\u05d9 \u05ea\u05b0\u05d4\u0591\u05d5\u05b9\u05dd \u05d5\u05b0\u05e8\u05a3\u05d5\u05bc\u05d7\u05b7 \u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u0594\u05d9\u05dd \u05de\u05b0\u05e8\u05b7\u05d7\u05b6\u0596\u05e4\u05b6\u05ea \u05e2\u05b7\u05dc\u05be\u05e4\u05bc\u05b0\u05e0\u05b5\u05a5\u05d9 \u05d4\u05b7\u05de\u05bc\u05b8\u05bd\u05d9\u05b4\u05dd\u05c3",
  "\u05d5\u05b7\u05d9\u05bc\u05b9\u05a5\u05d0\u05de\u05b6\u05e8 \u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u0596\u05d9\u05dd \u05d9\u05b0\u05d4\u05b4\u05a3\u05d9 \u05d0\u0591\u05d5\u05b9\u05e8 \u05d5\u05b7\u05bd\u05d9\u05b0\u05d4\u05b4\u05d9\u05be\u05d0\u05bd\u05d5\u05b9\u05e8\u05c3",
  "\u05d5\u05b7\u05d9\u05bc\u05b7\u05a7\u05e8\u05b0\u05d0 \u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u059b\u05d9\u05dd \u05d0\u05b6\u05ea\u05be\u05d4\u05b8\u05d0\u0596\u05d5\u05b9\u05e8 \u05db\u05bc\u05b4\u05d9\u05be\u05d8\u0591\u05d5\u05b9\u05d1 \u05d5\u05b7\u05d9\u05bc\u05b7\u05d1\u05b0\u05d3\u05bc\u05b5\u05a3\u05dc \u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u0594\u05d9\u05dd \u05d1\u05bc\u05b5\u05a5\u05d9\u05df \u05d4\u05b8\u05d0\u0596\u05d5\u05b9\u05e8 \u05d5\u05bc\u05d1\u05b5\u05a5\u05d9\u05df \u05d4\u05b7\u05d7\u05b9\u05bd\u05e9\u05c1\u05b6\u05da\u05b0\u05c3",
  "\u05d5\u05b7\u05d9\u05bc\u05b4\u05e7\u05b0\u05e8\u05b8\u05a8\u05d0 \u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u05a4\u05d9\u05dd&thinsp;<small>\u05c0</small>&thinsp;\u05dc\u05b8\u05d0\u05d5\u05b9\u05e8\u0599 \u05d9\u0594\u05d5\u05b9\u05dd \u05d5\u05b0\u05dc\u05b7\u05d7\u05b9\u0596\u05e9\u05c1\u05b6\u05da\u05b0 \u05e7\u05b8\u05a3\u05e8\u05b8\u05d0 \u05dc\u05b8\u0591\u05d9\u05b0\u05dc\u05b8\u05d4 \u05d5\u05b7\u05bd\u05d9\u05b0\u05d4\u05b4\u05d9\u05be\u05e2\u05b6\u05a5\u05e8\u05b6\u05d1 \u05d5\u05b7\u05bd\u05d9\u05b0\u05d4\u05b4\u05d9\u05be\u05d1\u05b9\u0596\u05e7\u05b6\u05e8 \u05d9\u05a5\u05d5\u05b9\u05dd \u05d0\u05b6\u05d7\u05b8\u05bd\u05d3\u05c3&nbsp;<span class=\"mam-spi-pe\">{\u05e4}</span><br>",
].join(" ");

const SHEMA = [
  "\u05e9\u05c1\u05b0\u05de\u05b7\u0596<big>\u05e2</big> \u05d9\u05b4\u05e9\u05c2\u05b0\u05e8\u05b8\u05d0\u05b5\u0591\u05dc \u05d9\u05b0\u05d4\u05b9\u05d5\u05b8\u05a5\u05d4 \u05d0\u05b1\u05dc\u05b9\u05d4\u05b5\u0596\u05d9\u05e0\u05d5\u05bc \u05d9\u05b0\u05d4\u05b9\u05d5\u05b8\u05a5\u05d4&thinsp;<small>\u05c0</small>&thinsp;\u05d0\u05b6\u05d7\u05b8\u05bd<big>\u05d3</big>\u05c3",
].join(" ");

const RAKIA = [
  "\u05d5\u05b7\u05d9\u05bc\u05b9\u05a3\u05d0\u05de\u05b6\u05e8 \u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u0594\u05d9\u05dd \u05d9\u05b0\u05d4\u05b4\u05a5\u05d9 \u05e8\u05b8\u05e7\u05b4\u0596\u05d9\u05e2\u05b7 \u05d1\u05bc\u05b0\u05ea\u05a3\u05d5\u05b9\u05da\u05b0 \u05d4\u05b7\u05de\u05bc\u05b8\u0591\u05d9\u05b4\u05dd \u05d5\u05b4\u05d9\u05d4\u05b4\u05a3\u05d9 \u05de\u05b7\u05d1\u05b0\u05d3\u05bc\u05b4\u0594\u05d9\u05dc \u05d1\u05bc\u05b5\u05a5\u05d9\u05df \u05de\u05b7\u0596\u05d9\u05b4\u05dd \u05dc\u05b8\u05de\u05b8\u05bd\u05d9\u05b4\u05dd\u05c3",
  "\u05d5\u05b7\u05d9\u05bc\u05b7\u05a3\u05e2\u05b7\u05e9\u05c2 \u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u05d9\u05dd\u05ae \u05d0\u05b6\u05ea\u05be\u05d4\u05b8\u05e8\u05b8\u05e7\u05b4\u0592\u05d9\u05e2\u05b7\u0592 \u05d5\u05b7\u05d9\u05bc\u05b7\u05d1\u05b0\u05d3\u05bc\u05b5\u0597\u05dc \u05d1\u05bc\u05b5\u05a4\u05d9\u05df \u05d4\u05b7\u05de\u05bc\u05b7\u0599\u05d9\u05b4\u05dd\u0599 \u05d0\u05b2\u05e9\u05c1\u05b6\u05e8\u0599 \u05de\u05b4\u05ea\u05bc\u05b7\u05a3\u05d7\u05b7\u05ea \u05dc\u05b8\u05e8\u05b8\u05e7\u05b4\u0594\u05d9\u05e2\u05b7 \u05d5\u05bc\u05d1\u05b5\u05a3\u05d9\u05df \u05d4\u05b7\u05de\u05bc\u05b7\u0594\u05d9\u05b4\u05dd \u05d0\u05b2\u05e9\u05c1\u05b6\u0596\u05e8 \u05de\u05b5\u05e2\u05b7\u05a3\u05dc \u05dc\u05b8\u05e8\u05b8\u05e7\u05b4\u0591\u05d9\u05e2\u05b7 \u05d5\u05b7\u05bd\u05d9\u05b0\u05d4\u05b4\u05d9\u05be\u05db\u05b5\u05bd\u05df\u05c3",
  "\u05d5\u05b7\u05d9\u05bc\u05b4\u05e7\u05b0\u05e8\u05b8\u05a7\u05d0 \u05d0\u05b1\u05dc\u05b9\u05d4\u05b4\u059b\u05d9\u05dd \u05dc\u05b8\u05bd\u05e8\u05b8\u05e7\u05b4\u0596\u05d9\u05e2\u05b7 \u05e9\u05c1\u05b8\u05de\u05b8\u0591\u05d9\u05b4\u05dd \u05d5\u05b7\u05bd\u05d9\u05b0\u05d4\u05b4\u05d9\u05be\u05e2\u05b6\u05a5\u05e8\u05b6\u05d1 \u05d5\u05b7\u05bd\u05d9\u05b0\u05d4\u05b4\u05d9\u05be\u05d1\u05b9\u0596\u05e7\u05b6\u05e8 \u05d9\u05a5\u05d5\u05b9\u05dd \u05e9\u05c1\u05b5\u05e0\u05b4\u05bd\u05d9\u05c3&nbsp;<span class=\"mam-spi-pe\">{\u05e4}</span><br>",
].join(" ");

const cons = (c, x) =>
  c.palabras.find((p) => p.consonantes === x || p.variantes.includes(x));

// ── 1. Las cuentas, contadas a mano ──────────────────────────────────────
console.log("── LAS CUENTAS (contadas a mano sobre Bereshit 1:1-5) ──");
{
  const c = palabrasRepetidas(BERESHIT, 12);
  // 52 palabras en los cinco versículos, una vez separado el maqaf.
  if (c.total !== 52) fallo(`el total debería ser 52 palabras y da ${c.total}`);
  else console.log("  ✓ 52 palabras en los cinco versículos");

  // Contados a mano sobre los cinco versículos, agrupando por lema como hace
  // la edición etiquetada:
  //   אלהים  v1, v2, v3, v4 (dos veces), v5                        → 6
  //   אור    v3 «אור» dos veces, v4 «האור» dos veces, v5 «לאור»    → 5
  //   היה    v2 «היתה», v3 «יהי» y «ויהי», v5 «ויהי» dos veces     → 5
  //   חשך    v2 «וחשך», v4 «החשך», v5 «ולחשך»                      → 3
  const esperado = [
    ["אלהים", 6, []],
    ["אור", 5, ["האור", "לאור"]],
    ["היתה", 5, ["יהי", "ויהי"]],
  ];
  for (const [base, veces, variantes] of esperado) {
    const p = c.palabras.find((x) => x.consonantes === base || x.variantes.includes(base));
    if (!p) fallo(`no encontró el grupo de «${base}»`);
    else if (p.veces !== veces) fallo(`«${base}» debería salir ${veces} veces y da ${p.veces}`);
    else {
      const todas = [p.consonantes, ...p.variantes];
      const faltan = variantes.filter((v) => !todas.includes(v));
      if (faltan.length > 0) fallo(`«${base}» no agrupó ${faltan.join(", ")}`);
      else console.log(`  ✓ ${base.padEnd(8)} ${veces} veces${variantes.length ? ` (con ${variantes.join(", ")})` : ""}`);
    }
  }

  // חֹשֶׁךְ aparece tres veces y SIEMPRE con prefijo distinto: וְחֹשֶׁךְ, הַחֹשֶׁךְ,
  // וְלַחֹשֶׁךְ. La forma desnuda no está en el tramo, así que la regla de
  // prefijos no podía juntarlas y antes se contaban como tres palabras de una
  // vez cada una. Con la edición etiquetada las tres llevan el mismo lema y la
  // oscuridad aparece como lo que es: una palabra que el capítulo repite.
  {
    const osc = c.palabras.find((p) =>
      [p.consonantes, ...p.variantes].some((f) => f.includes("חשך"))
    );
    if (!osc) fallo("la oscuridad no aparece agrupada");
    else if (osc.veces !== 3) fallo(`חשך debería salir 3 veces y da ${osc.veces}`);
    else if (!osc.lema) fallo("חשך se agrupó sin lema: no vino de la edición etiquetada");
    else console.log(`  ✓ ${"חשך".padEnd(8)} 3 veces por su lema (${osc.lema}), sin forma desnuda en el tramo`);
  }
}

// ── 2. El maqaf separa palabras ──────────────────────────────────────────
console.log("\n── EL MAQAF SEPARA (אֶת־הָאוֹר son dos palabras) ──");
{
  const c = palabrasRepetidas(BERESHIT, 40);
  const pegadas = c.palabras.filter((p) =>
    ["אתהאור", "כיטוב", "ויהיאור", "עלפני"].includes(p.consonantes)
  );
  if (pegadas.length > 0) {
    fallo(`contó palabras pegadas por el maqaf: ${pegadas.map((p) => p.consonantes).join(", ")}`);
  } else {
    console.log("  ✓ ninguna palabra pegada por el maqaf entró en la cuenta");
  }
}

// ── 3. Las etiquetas no parten la palabra ────────────────────────────────
console.log("\n── LAS ETIQUETAS NO PARTEN LA PALABRA (el Shemá) ──");
{
  const c = palabrasRepetidas(SHEMA, 12);
  if (c.total !== 6) {
    fallo(`«Shemá Israel…» son 6 palabras y contó ${c.total}: una etiqueta partió alguna`);
  } else {
    console.log("  ✓ שְׁמַע y אֶחָד siguen enteras: 6 palabras");
  }
  const p = cons(c, "יהוה");
  if (!p || p.veces !== 2) fallo("el Nombre sale dos veces en el versículo y no lo contó así");
  else console.log("  ✓ el Nombre, 2 veces");
}

// ── 4. Cielos y aguas no se mezclan ──────────────────────────────────────
console.log("\n── שָׁמַיִם NO ES מַיִם ──");
{
  const c = palabrasRepetidas(RAKIA, 12);
  // Contados a mano en Bereshit 1:6-8: v6 trae הַמָּיִם, מַיִם y לָמָיִם; v7 trae
  // הַמַּיִם dos veces. Cinco aguas. Y el שָׁמָיִם del v8 son los cielos, que es
  // otra palabra: en consonantes se parecen, pero no se cuentan juntas.
  const agua = cons(c, "מים");
  if (!agua) fallo("no encontró מים");
  else if (agua.veces !== 5) fallo(`מים debería salir 5 veces y da ${agua.veces}`);
  else if ([agua.consonantes, ...agua.variantes].includes("שמים")) {
    fallo("metió שמים dentro de מים");
  } else {
    const cielos = cons(c, "שמים");
    console.log(`  ✓ מים 5 veces (${[agua.consonantes, ...agua.variantes].join(", ")})`);
    console.log(`  ✓ los cielos, aparte${cielos ? ` (${cielos.veces})` : " y sin llegar al umbral"}`);
  }
}

// ── 5. La puerta: dónde se cuenta y sobre qué ────────────────────────────
console.log("\n── LA PUERTA DEL TANAJ ──");
const PUERTA = [
  ["Genesis 1:3", true, "Genesis 1"],
  ["Genesis 1", true, "Genesis 1"],
  ["Psalms 23:1", true, "Psalms 23"],
  ["I Samuel 3:10", true, "I Samuel 3"],
  ["Song of Songs 1:1", true, "Song of Songs 1"],
  ["Genesis 1:1-6:8", true, "Genesis 1:1-6:8"],
  // Lo que NO es Tanaj: el midrash tiene su método y el Talmud no va por
  // capítulos. Aquí no se cuenta nada.
  ["Bereshit Rabbah 39:1", false, null],
  ["Genesis Rabbah 1:1", false, null],
  ["Shabbat 31a", false, null],
  ["Zohar 1:15a", false, null],
  ["Tanya, Likutei Amarim 1", false, null],
  ["", false, null],
  [undefined, false, null],
];
for (const [ref, dentro, tramo] of PUERTA) {
  const esta = esRefDeTanaj(ref);
  const t = tramoDeConteo(ref);
  if (esta !== dentro) {
    fallo(`${String(ref)}: ${dentro ? "debería" : "no debería"} contar y ${esta ? "cuenta" : "no cuenta"}`);
  } else if (t !== tramo) {
    fallo(`${String(ref)}: el tramo debería ser ${tramo} y da ${t}`);
  } else {
    console.log(`  ✓ ${String(ref || "(vacío)").padEnd(26)} ${dentro ? `→ cuenta sobre ${tramo}` : "fuera"}`);
  }
}

// ── 6. La lista recortada se declara recortada ───────────────────────────
//
// Esto nació de un error real: con tope de 7, el nombre de Itzjak (4 veces en
// la Akedá) se quedaba fuera, y el motor escribió «falta, llamativamente, el
// nombre de Itzjak». Era falso, y no por inventar un número: por razonar sobre
// una lista recortada creyéndola completa. Así que el bloque del prompt tiene
// que avisar cuando va recortado.
console.log("\n── UNA LISTA RECORTADA LO DICE ──");
{
  const c = palabrasRepetidas(BERESHIT, 2);
  if (c.pasan <= c.palabras.length) {
    fallo("el recuento no dice cuántas palabras pasan el umbral en total");
  } else {
    const bloque = formateaRepetidas(c, "Bereshit 1:1-5");
    if (!/RECORTADA/.test(bloque)) fallo("la lista va recortada y el bloque no lo avisa");
    else if (!/NO concluyas que una palabra falta/.test(bloque)) {
      fallo("el aviso no prohíbe argumentar desde la ausencia");
    } else {
      console.log(`  ✓ avisa del recorte (${c.palabras.length} de ${c.pasan} que pasan el umbral)`);
    }
  }
  // Y cuando la lista está completa, no debe avisar de nada.
  const entera = formateaRepetidas(palabrasRepetidas(BERESHIT, 40), "Bereshit 1:1-5");
  if (/RECORTADA/.test(entera)) fallo("avisa de un recorte que no existe");
  else console.log("  ✓ sin recorte, sin aviso");
}

// ── 7. Un tramo que no repite nada ───────────────────────────────────────
console.log("\n── UN TRAMO SIN REPETICIONES (debe salir vacío, no inventado) ──");
{
  const c = palabrasRepetidas("מִזְמ֥וֹר לְדָוִ֑ד יְהֹוָ֥ה רֹ֝עִ֗י לֹ֣א אֶחְסָֽר", 8);
  if (c.palabras.length > 0) {
    fallo(`se inventó repeticiones donde no hay: ${c.palabras.map((p) => p.forma).join(", ")}`);
  } else {
    console.log("  ✓ lista vacía: ninguna palabra se repite y no se fuerza ninguna");
  }
}

// ── 8. El sobre no llega al lector ───────────────────────────────────────
//
// Esto pasó de verdad y se publicó: al pedirle una sección hecha con los datos
// de <palabras_repetidas>, el modelo imitó la etiqueta y el estudio de Shemot 3
// salió en jashmal.org empezando por «<palabras_repetidas>». El prompt ya lo
// prohíbe, pero una regla no es una garantía: el filtro tiene que cazarla
// incluso partida entre dos trozos del stream, que es como llega el texto.
console.log("\n── EL SOBRE NO SE PUBLICA ──");
{
  const { filtroSobres } = await import("@/lib/study/sinSobres");

  const casos = [
    ["de una pieza", ["<palabras_repetidas>\nHola\n</palabras_repetidas>"], "\nHola\n"],
    ["partida en dos", ["texto <palabras_", "repetidas> y sigue"], "texto  y sigue"],
    ["partida letra a letra", "a<fuentes>b".split(""), "ab"],
    ["sin etiquetas, intacto", ["Bereshit 1 habla de ", "la luz y las aguas."], "Bereshit 1 habla de la luz y las aguas."],
    ["un menor que suelto no se come", ["3 < 7 y 8 > 2"], "3 < 7 y 8 > 2"],
  ];

  for (const [nombre, trozos, esperado] of casos) {
    const f = filtroSobres();
    let salida = "";
    for (const t of trozos) salida += f.trozo(t);
    salida += f.cierra();
    if (salida !== esperado) {
      fallo(`${nombre}: esperaba «${esperado}» y dio «${salida}»`);
    } else {
      console.log(`  ✓ ${nombre}`);
    }
  }
}

if (errores > 0) {
  console.error(`\n✗ ${errores} fallo(s) en la cuenta de palabras repetidas.`);
  process.exit(1);
}
console.log("\n✓ Las cuentas cuadran a mano, el maqaf separa, las etiquetas no parten y los cielos no son las aguas.");
