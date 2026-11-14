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
const BERESHIT = [
  "<big>בְּ</big>רֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃",
  "וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֙הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְה֑וֹם וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃",
  "וַיֹּ֥אמֶר אֱלֹהִ֖ים יְהִ֣י א֑וֹר וַֽיְהִי־אֽוֹר׃",
  "וַיַּ֧רְא אֱלֹהִ֛ים אֶת־הָא֖וֹר כִּי־ט֑וֹב וַיַּבְדֵּ֣ל אֱלֹהִ֔ים בֵּ֥ין הָא֖וֹר וּבֵ֥ין הַחֹֽשֶׁךְ׃",
  'וַיִּקְרָ֨א אֱלֹהִ֤ים&thinsp;<small>׀</small>&thinsp;לָאוֹר֙ י֔וֹם וְלַחֹ֖שֶׁךְ קָ֣רָא לָ֑יְלָה וַֽיְהִי־עֶ֥רֶב וַֽיְהִי־בֹ֖קֶר י֥וֹם אֶחָֽד׃&nbsp;<span class="mam-spi-pe">{פ}</span><br>',
].join(" ");

// Devarim 6:4. Seis palabras, y dos de ellas llevan una letra dentro de una
// etiqueta: la ayin de שְׁמַע y la dalet de אֶחָד (las letras grandes del Shemá).
const SHEMA =
  'שְׁמַ֖<big>ע</big> יִשְׂרָאֵ֑ל יְהֹוָ֥ה אֱלֹהֵ֖ינוּ יְהֹוָ֥ה&thinsp;<small>׀</small>&thinsp;אֶחָֽ<big>ד</big>׃';

// Bereshit 1:6-8, abreviado: aquí conviven מַיִם, לָמַיִם, הַמַּיִם y שָׁמַיִם.
const RAKIA =
  "וַיֹּ֣אמֶר אֱלֹהִ֔ים יְהִ֥י רָקִ֖יעַ בְּת֣וֹךְ הַמָּ֑יִם וִיהִ֣י מַבְדִּ֔יל בֵּ֥ין מַ֖יִם לָמָֽיִם׃ וַיִּקְרָ֧א אֱלֹהִ֛ים לָֽרָקִ֖יעַ שָׁמָ֑יִם";

const cons = (c, x) => c.palabras.find((p) => p.consonantes === x);

// ── 1. Las cuentas, contadas a mano ──────────────────────────────────────
console.log("── LAS CUENTAS (contadas a mano sobre Bereshit 1:1-5) ──");
{
  const c = palabrasRepetidas(BERESHIT, 12);
  // 52 palabras en los cinco versículos, una vez separado el maqaf.
  if (c.total !== 52) fallo(`el total debería ser 52 palabras y da ${c.total}`);
  else console.log("  ✓ 52 palabras en los cinco versículos");

  const esperado = [
    ["אלהים", 6, []],
    ["אור", 5, ["האור", "לאור"]],
    ["יהי", 4, ["ויהי"]],
  ];
  for (const [base, veces, variantes] of esperado) {
    const p = cons(c, base);
    if (!p) fallo(`no encontró «${base}»`);
    else if (p.veces !== veces) fallo(`«${base}» debería salir ${veces} veces y da ${p.veces}`);
    else {
      const faltan = variantes.filter((v) => !p.variantes.includes(v));
      if (faltan.length > 0) fallo(`«${base}» no agrupó ${faltan.join(", ")}`);
      else console.log(`  ✓ ${base.padEnd(8)} ${veces} veces${variantes.length ? ` (con ${variantes.join(", ")})` : ""}`);
    }
  }

  // חֹשֶׁךְ aparece tres veces pero SIEMPRE con prefijo: וְחֹשֶׁךְ, הַחֹשֶׁךְ,
  // וְלַחֹשֶׁךְ. Como el tramo nunca trae la forma desnuda, no se agrupan — y eso
  // es deliberado: pelar prefijos sin prueba es lo que destroza palabras.
  if (cons(c, "חשך")) {
    fallo("agrupó חשך sin que la forma desnuda aparezca en el texto");
  } else {
    console.log("  ✓ חשך       no se agrupa: el tramo nunca trae la forma desnuda");
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
  const agua = cons(c, "מים");
  if (!agua) fallo("no encontró מים");
  else if (agua.veces !== 3) fallo(`מים debería salir 3 veces (מים, המים, למים) y da ${agua.veces}`);
  else if (agua.variantes.includes("שמים")) fallo("metió שמים dentro de מים");
  else console.log("  ✓ מים 3 veces (מים, המים, למים) y los cielos aparte");
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
