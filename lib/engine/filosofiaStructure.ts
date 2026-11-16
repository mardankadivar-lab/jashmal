// ─────────────────────────────────────────────────────────────────────────
//  MÉTODO DE ESTUDIO DE FILOSOFÍA JUDÍA — מַחְשֶׁבֶת יִשְׂרָאֵל
// ─────────────────────────────────────────────────────────────────────────
//
//  Texto del Departamento de Erudición (el Sofer), 16-nov-2026, destilado a
//  instrucción de motor desde:
//
//      /Users/mardan/jashmal-produccion/filosofia/METODO.md   (959 líneas)
//
//  Lo que vive en el documento y NO vive aquí es lo que no va dirigido al
//  motor: la autopsia del estudio fallido, las tablas de verificación contra
//  Sefaria y las compuertas que son trabajo de infraestructura (están en
//  `lib/study/compuertasFilosofia.ts`). Lo que el Sofer escribió COMO REGLA
//  está aquí, y lo que escribió como fórmula literal está literal.
//
//  LAS CUATRO COSAS QUE NO SE PUEDEN PERDER EN NINGUNA REESCRITURA:
//
//    1. פרד״ס SE RETIRA de esta estantería, no se adapta. En su lugar va el
//       marco עִיּוּן. Y el acrónimo עִיּוּן ES NUESTRO, DE HOY: el motor no
//       puede presentarlo nunca como una rúbrica recibida ni atribuirlo a
//       nadie. El Sofer se aplica a sí mismo la regla que aplica a los demás.
//    2. El cuarto paso (`נְקוּדַּת הַמִּפְגָּשׁ`) está blindado con un REQUISITO DE
//       SUJETO GRAMATICAL, no de tono: toda oración tiene que tener por sujeto
//       a una persona nombrada y fechada que no sea el autor. Es lo único que
//       un motor no puede rodear reencuadrando, porque no puede inventar un
//       sujeto que no tiene.
//    3. Queda CANCELADA, para esta estantería, la instrucción de CLAUDE.md que
//       pone a Baal HaSulam en Sod y al Baal Shem Tov en Drash/Sod. Hay que
//       decirlo en voz alta: si no se cancela, el motor lo seguirá haciendo,
//       porque su instrucción por defecto los nombra.
//    4. Las nueve prohibiciones P-1…P-9 van ENTERAS, cada una con su prueba y
//       su salida legal — la misma lógica que la regla de la lista completa
//       del rastro de palabras: el motor tiene que poder declarar «aquí no
//       aplica» sin reencuadrar, y esa es su única salida.
// ─────────────────────────────────────────────────────────────────────────

import type { Comentaristas } from "@/lib/sources/comentaristas";

/**
 * ¿Sigue puesto el andamio provisional de infraestructura? Ya no: este archivo
 * lleva el método del Sofer. Los guardianes lo leen para no avisar de más.
 */
export const METODO_FILOSOFIA_PROVISIONAL = false;

/** Dónde vive el texto largo del que esto se destiló. */
export const METODO_FILOSOFIA_ORIGEN =
  "/Users/mardan/jashmal-produccion/filosofia/METODO.md";

/**
 * Marca que los guardianes buscan dentro del prompt para afirmar, sin llamar a
 * Claude, que un ref de filosofía seleccionó ESTE método y no otro.
 */
export const MARCA_METODO_FILOSOFIA = "MÉTODO DE FILOSOFÍA JUDÍA";

/** Marca del marco propio: si esto no está, PaRDeS no se retiró de verdad. */
export const MARCA_MARCO_IYUN = "עִיּוּן — EL EXAMEN, EL MARCO DE ESTA ESTANTERÍA";

/** Marca de la cancelación explícita de la instrucción de CLAUDE.md. */
export const MARCA_CANCELACION = "QUEDA CANCELADA, PARA ESTA ESTANTERÍA";

/** Marca del requisito que blinda el cuarto paso. */
export const MARCA_SUJETO = "REQUISITO DE SUJETO GRAMATICAL";

// ─────────────────────────────────────────────────────────────────────────
//  La cadena de la traducción, obra por obra (§2.1 del método)
// ─────────────────────────────────────────────────────────────────────────
//
//  SEIS DE LAS ONCE OBRAS NO FUERON ESCRITAS EN HEBREO. El hebreo que el sitio
//  sirve no es la lengua del autor: es la de su traductor. Y los Ibn Tibón son
//  DOS HOMBRES — Yehudá el padre y Shmuel el hijo— que hay que distinguir
//  (P-8). De aquí sale la prohibición que mata el fallo en su raíz: ningún
//  argumento de nivel de palabra sobre una obra traducida.
//
//  ── POR QUÉ AQUÍ NO HAY AÑO DE TRADUCCIÓN ──
//
//  Porque no está verificado y la casa no publica lo que no puede verificar.
//  Las cuatro fechas tibónidas que circulan (1161, 1186, 1167, 1204) son las
//  estándar, pero el Sofer las leyó de su propio conocimiento y no de una
//  ficha, y lo dijo. Comprobado el 16-nov-2026 contra Sefaria, obra por obra:
//  NINGUNA versión tibónida trae fecha de traducción — los años que aparecen
//  en los títulos de versión son de EDICIÓN, no de traducción (Varsovia 1875,
//  Ámsterdam 1768, Leipzig 1864, Even Shmuel 1973, París 1856).
//
//  Lo que SÍ está verificado y por eso se queda: QUIÉN tradujo cada obra, y
//  cuál de los dos Ibn Tibón fue — Yehudá el padre para los Deberes del
//  corazón, Creencias y opiniones y el Kuzari; Shmuel el hijo para el Moré y
//  los Ocho Capítulos. Eso es lo que el método exige nombrar.
//
//  Y por el mismo motivo se cayó el «933» de Creencias y opiniones: la ficha de
//  Sefaria da compDate 922–942, no 933.
//
//  Las fechas que quedan en el prompt están todas contra la ficha de Sefaria:
//  las de los comentaristas (`lib/sources/comentaristas.ts`, compDate/pubDate),
//  los años de vida de los autores, y el 1836 de las Diecinueve cartas
//  (compDate [1836], Altona) con su edición hebrea (Vilna 1890, que es el
//  título de versión que Sefaria sirve).
interface FichaObra {
  es: string;
  he: string;
  autor: string;
  /** Lengua original y cadena de traducción, o null si se escribió en hebreo. */
  traduccion: string | null;
  /** ¿Se puede cotejar el original DESDE EL SITIO? Sefaria sirve dos. */
  original: "en sefaria" | "no está" | null;
}

const FICHAS: Readonly<Record<string, FichaObra>> = {
  "Duties of the Heart": {
    es: "Los deberes del corazón",
    he: "חוֹבוֹת הַלְּבָבוֹת",
    autor: "Bajiá ibn Pakudá (s. XI)",
    traduccion: "del judeo-árabe, por YEHUDÁ ibn Tibón (el padre)",
    original: "no está",
  },
  "HaEmunot veHaDeot": {
    es: "Creencias y opiniones",
    he: "הָאֱמוּנוֹת וְהַדֵּעוֹת",
    autor: "Saadiá Gaón (882–942)",
    traduccion: "del judeo-árabe, por YEHUDÁ ibn Tibón (el padre)",
    original: "no está",
  },
  "Eight Chapters": {
    es: "Los ocho capítulos",
    he: "שְׁמוֹנָה פְּרָקִים",
    autor: "el Rambam (1138–1204)",
    traduccion: "del judeo-árabe, por SHMUEL ibn Tibón (el hijo)",
    original: "no está",
  },
  "Guide for the Perplexed": {
    es: "La guía de los perplejos (el Moré Nevujim)",
    he: "מוֹרֶה נְבוּכִים",
    autor: "el Rambam (1138–1204)",
    traduccion: "del judeo-árabe, por SHMUEL ibn Tibón (el hijo)",
    original: "en sefaria",
  },
  Kuzari: {
    es: "El Kuzari",
    he: "הַכּוּזָרִי",
    autor: "Yehudá HaLeví (c. 1075–1141)",
    traduccion: "del judeo-árabe, por YEHUDÁ ibn Tibón (el padre)",
    original: "en sefaria",
  },
  "Sefer HaIkkarim": {
    es: "El libro de los principios",
    he: "סֵפֶר הָעִקָּרִים",
    autor: "Yosef Albo (m. c. 1444)",
    traduccion: null,
    original: null,
  },
  "Derashot HaRan": {
    es: "Las Derashot HaRan",
    he: 'דְּרָשׁוֹת הָרַ"ן',
    autor: "atribuidas al Ran (s. XIV)",
    traduccion: null,
    original: null,
  },
  "Derekh Hashem": {
    es: "El camino de Dios",
    he: "דֶּרֶךְ ה׳",
    autor: "el Ramjal (1707–1746)",
    traduccion: null,
    original: null,
  },
  "Netivot Olam": {
    es: "Senderos del mundo",
    he: "נְתִיבוֹת עוֹלָם",
    autor: "el Maharal de Praga (c. 1520–1609)",
    traduccion: null,
    original: null,
  },
  "Nefesh HaChayim": {
    es: "El alma de la vida",
    he: "נֶפֶשׁ הַחַיִּים",
    autor: "R. Jaim de Volozhin (1749–1821)",
    traduccion: null,
    original: null,
  },
  "Nineteen Letters": {
    es: "Cartas del norte (las Diecinueve cartas)",
    he: "אִגְּרוֹת צָפוֹן",
    autor: "Shimshón Rafael Hirsch (1808–1888)",
    traduccion:
      "del ALEMÁN (Neunzehn Briefe über Judenthum, 1836, publicado bajo seudónimo); " +
      "el traductor al hebreo (Vilna 1890) NO está verificado y no se nombra",
    original: "no está",
  },
};

/** El bloque de la cadena de traducción para esta obra. */
function bloqueTraduccion(obra: string, f: FichaObra): string {
  if (!f.traduccion) {
    return `LA LENGUA. «${f.es}» se escribió EN HEBREO. El hebreo que tienes
delante es del autor, así que un argumento sobre una palabra suya es legítimo
—con la cautela de P-7: los títulos, los subtítulos, la numeración y los
corchetes son de la EDICIÓN, no del autor, y no se citan como palabras suyas.`;
  }
  const cotejo =
    f.original === "en sefaria"
      ? `El original SÍ está en Sefaria para esta obra: cuando una lectura
  dependa de una palabra de la prosa, se puede y se DEBE cotejar, y se dice
  que se cotejó.`
      : `El original NO está en Sefaria para esta obra: el cotejo es IMPOSIBLE
  desde el sitio, así que un argumento de palabra aquí no es «desaconsejado»,
  es INVERIFICABLE, y no se escribe. Cero.`;
  return `LA CADENA DE LA TRADUCCIÓN — y es lo más importante de esta sección.
«${f.es}» NO fue escrita en hebreo: viene ${f.traduccion}. El hebreo que el
sitio te sirve no es la lengua del autor, es la de su traductor.

De ahí salen tres instrucciones que no se negocian:
(a) SE NOMBRA LA CADENA. La primera línea de תַּרְגּוּם dice de qué lengua viene
  y QUIÉN la tradujo —con el Ibn Tibón correcto, que son dos hombres (P-8)— y
  que estás traduciendo AL TRADUCTOR. No es una nota al pie: es la condición de
  todo lo que sigue.
  EL AÑO DE LA TRADUCCIÓN NO SE NOMBRA. No es un olvido: las fechas que
  circulan para las traducciones tibónidas NO están verificadas contra nuestra
  fuente, y esta casa no escribe lo que no puede verificar. Si no tienes el
  año, no lo pongas; y si te viene uno a la cabeza, tampoco — está prohibido
  aquí igual que está prohibido nombrar al traductor hebreo de las Diecinueve
  cartas, que tampoco está verificado. Decir «lo tradujo Shmuel ibn Tibón, el
  hijo» es una respuesta completa.
(b) PROHIBIDO TODO ARGUMENTO DE NIVEL DE PALABRA sobre esta obra. Si la palabra
  hebrea es una elección del traductor, entonces la gematría de esa palabra, el
  juego de raíces, el «nótese que eligió este término» y el «la palabra X
  insiste aquí» NO son afirmaciones sobre el autor: son afirmaciones sobre el
  traductor, hechas siglos después sobre un texto que no escribió. Lo único
  que puedes decir es «Ibn Tibón vierte aquí X», con esa atribución explícita.
  ${cotejo}
(c) LA EXCEPCIÓN EXACTA, Y SOLO ESA: los VERSÍCULOS BÍBLICOS citados dentro de
  la obra se mantienen en hebreo en el original, así que el hebreo DEL
  VERSÍCULO sí es del autor. Un argumento de palabra sobre el versículo citado
  es admisible; sobre la prosa que lo rodea, no.`;
}

// ─────────────────────────────────────────────────────────────────────────
//  Las obras que piden su propia vía (§4 del método). Son SEIS, no tres.
// ─────────────────────────────────────────────────────────────────────────
const VIAS: Readonly<Record<string, string>> = {
  "Duties of the Heart": `VÍA PROPIA DE ESTA OBRA — PARTIDA POR PUERTA.
Los deberes del corazón son DIEZ PUERTAS, y no se estudian igual:
· PUERTA 1 (שַׁעַר הַיִּחוּד, 10 capítulos) es filosofía pura: la demostración de
  la unidad divina. Ahí el עִיּוּן completo funciona — hay עִקָּר, hay יְסוֹדוֹת,
  hay וִכּוּחַ.
· PUERTAS 2–10 (la examinación, el servicio, la confianza, la unicidad de la
  acción, la humildad, el arrepentimiento, el cómputo del alma, la abstinencia,
  el amor a Dios) son la VIDA INTERIOR. Ahí el autor no está demostrando: está
  PRESCRIBIENDO, y forzar una demostración donde hay una exhortación es
  inventar. Así que el marco se dobla: עִקָּר se vuelve «qué te está pidiendo»,
  יְסוֹדוֹת se adelgaza a «sobre qué se apoya para pedírtelo», וִכּוּחַ casi
  siempre no aplica y SE DICE — y EL PESO SE VA A מַעֲשֶׂה, que pasa a ser la
  SECCIÓN MÁS PESADA del estudio en vez de la más ligera. Es la única obra de
  la estantería donde eso ocurre por diseño.`,

  "Nefesh HaChayim": `VÍA PROPIA DE ESTA OBRA — CABALÁ EN FORMA FILOSÓFICA, Y EL
CUARTO PASO SE INVIERTE.
Aquí el autor ES el cabalista. נְקוּדַּת הַמִּפְגָּשׁ ya NO es «qué hace un cabalista
con esta afirmación»: no hay encuentro entre dos sistemas, hay un solo sistema
argumentando. El paso pasa a ser QUÉ DOCTRINA LURIANA está defendiendo o
sistematizando este argumento, y el Arizal se cita como FUENTE PROPIA DEL AUTOR,
con las reglas normales de la casa (obra y lugar exactos). El Arizal es
admisible aquí, y solo aquí y en Dérej Hashem.
Y EL PELIGRO SE INVIERTE TAMBIÉN: el error no es leer al filósofo como
cabalista, sino LEER AL CABALISTA COMO RACIONALISTA. Esta obra tiene la forma de
un argumento ordenado y la materia es luriana.
Estructura real: cuatro puertas (22 · 18 · 14 · 34 capítulos), más «Perakim»
(8), más la introducción del hijo del autor y la anotación larga de Reb Itzele.
Esas dos últimas NO SON DEL AUTOR y se atribuyen a quien son.
NO escribas nada sobre la disputa de la lectura del tzimtzum en la Puerta 3: el
Sofer la señala como real pero SIN COTEJAR, y no entra hasta que se verifique.`,

  "Derekh Hashem": `VÍA PROPIA DE ESTA OBRA — CABALÁ EN FORMA FILOSÓFICA, Y EL
CUARTO PASO SE INVIERTE.
Aquí el autor ES el cabalista: el Ramjal construye su explicación de la
providencia y de los gilgulim sobre cimientos lurianos. נְקוּדַּת הַמִּפְגָּשׁ ya NO
es «qué hace un cabalista con esta afirmación»: no hay encuentro entre dos
sistemas, hay un solo sistema argumentando. El paso pasa a ser QUÉ DOCTRINA
LURIANA está defendiendo o sistematizando este argumento, y el Arizal se cita
como FUENTE PROPIA DEL AUTOR, con obra y lugar exactos. El Arizal es admisible
aquí, y solo aquí y en Néfesh HaJaim.
Y EL PELIGRO SE INVIERTE TAMBIÉN: el error no es leer al filósofo como
cabalista, sino LEER AL CABALISTA COMO RACIONALISTA.
Esta obra es además explícitamente ética: la acción está literalmente en el
texto y lo único que hay que hacer con ella es NO DILUIRLA.`,

  "Netivot Olam": `VÍA PROPIA DE ESTA OBRA — EL MIDRASH RAZONADO, ACOTADO.
Es casi un midrash razonado: el Maharal construye cada netiv a partir de
agadot, así que hay una tensión real — el objeto es un ARGUMENTO y el material
es MIDRASH.
MANDA עִיּוּן, porque el netiv ES un argumento. PERO cuando la demostración del
Maharal consiste en leer una agadá, la lente del midrash —la grieta, el mashal
y su nimshal— SE PUEDE APLICAR A ESA AGADÁ COMO UN MOVIMIENTO DENTRO DE
יְסוֹדוֹת, para mostrar CÓMO LA LEE ÉL. Eso no es contaminación de método: es
seguir al autor.
Y está acotado por tres límites que no se negocian:
  1. Solo sobre la agadá que EL MAHARAL CITA, no sobre otras.
  2. Solo para exponer SU lectura, no una lectura nuestra de la agadá.
  3. NUNCA como estudio de midrash de ocho secciones con título propio. No hay
     דִּקְדּוּק הַכָּתוּב, no hay דַּרְכֵי הָאַגָּדָה, no hay bloque.
La única capa de anotación son las notas de R. Yehoshúa D. Hartman (Majón
Yerushalayim): son ANOTACIÓN MODERNA, no comentario clásico, y están EN
COPYRIGHT — rige la regla de la casa para Rav Ginsburgh: destilar y citar,
NUNCA reproducir párrafos.
Nótese además: el Maharal es contemporáneo del Arizal (c. 1520–1609 frente a
1534–1572) y NO trabaja desde la Cabalá luriana. Meterle Arizal al Maharal es
un error de fondo, no una licencia.`,

  Kuzari: `VÍA PROPIA DE ESTA OBRA — EL DIÁLOGO: QUIÉN HABLA.
Es un diálogo, y es la trampa más limpia de toda la estantería: UNA LÍNEA DICHA
POR UN PERSONAJE NO ES LA POSICIÓN DEL AUTOR.
Hablan: הֶחָבֵר (el Jaber, el sabio judío, que habla por HaLeví), מֶלֶךְ כּוּזָר (el
rey, que pregunta) y, en el primer ensayo, el filósofo, el cristiano y el
musulmán EXPONIENDO POSICIONES QUE LA OBRA VA A RECHAZAR.
REGLA DURA: TODA CITA DEL KUZARI NOMBRA AL HABLANTE. Citar al filósofo del
ensayo I como si fuera HaLeví es ponerle en la boca lo que escribió para
refutar. Es el error del epígrafe otra vez, con otro disfraz.
Y un problema de tamaño: los cinco ensayos están aplanados y un ensayo son unos
74.000 caracteres. NO puedes estudiar «el pasaje»: ELIGE Y NOMBRA LA SECCIÓN
NUMERADA que estudias (p. ej. «Kuzari, Parte I 11») y dilo en el estudio. Si no
nombras el tramo, estás resumiendo un ensayo entero y llamándolo estudio.`,

  "Nineteen Letters": `VÍA PROPIA DE ESTA OBRA — EL DIÁLOGO: QUIÉN HABLA.
Son CARTAS entre BINYAMÍN, el perplejo que pregunta, y NAFTALÍ, que responde.
UNA LÍNEA DICHA POR UN PERSONAJE NO ES LA POSICIÓN DEL AUTOR: toda cita nombra
al hablante.
Y es la única obra del s. XIX de la estantería: SU ADVERSARIO NO ES
ARISTÓTELES, es la Reforma y la emancipación. Leerla como filosofía medieval le
equivoca la fecha y con ella el argumento entero.`,

  "Derashot HaRan": `VÍA PROPIA DE ESTA OBRA — EL SERMÓN, Y UNA ATRIBUCIÓN FRÁGIL.
No es un tratado: son DERASHOT. Un sermón tiene arco retórico, ocasión y
público, no una demostración encadenada. Así que יְסוֹדוֹת es más débil POR
NATURALEZA —y decirlo no es un defecto del estudio— y la pregunta buena es
otra: QUÉ ESTÁ PERSUADIENDO, A QUIÉN, Y PARA QUÉ OCASIÓN.
La atribución es tradicional y la crítica moderna la discute. Consecuencia
exacta para el método: NUNCA escribas «el Ran sostiene X» para ponerlo a
discutir con otro rishón en וִכּוּחַ. Se escribe «LAS DERASHOT HARAN SOSTIENEN
X», que es cierto sin importar quién las escribió.`,

  "Eight Chapters": `VÍA PROPIA DE ESTA OBRA — EL TEXTO QUE NO ES UN LIBRO.
Los Ocho Capítulos NO son una obra independiente: son LA INTRODUCCIÓN DEL
RAMBAM AL TRATADO AVOT en su Comentario a la Mishná. Tres consecuencias:
  1. Se cita como lo que es. Su contexto es halájico-ético, no el del Moré.
  2. Su relación con el Moré es real pero NO es identidad: mismo autor, géneros
     distintos, momentos distintos. No completes un argumento de uno con el
     otro sin decir que estás cruzando dos obras.
  3. Los enlaces que Sefaria muestra aquí son «Quoting Commentary» —obras que
     LO CITAN, entre ellas Derekh Chayyim, que es el comentario del Maharal a
     AVOT, no a los Ocho Capítulos. NO son comentaristas. Ver P-6.`,

  "HaEmunot veHaDeot": `NOTA DE ESTA OBRA — la forma más estricta de la cadena de
traducción. Es la obra más antigua de la estantería (judeo-árabe de Saadiá
Gaón; hebreo de Yehudá ibn Tibón, el padre — sin año: no está verificado) y el
ORIGINAL NO ESTÁ EN SEFARIA: el cotejo es
imposible desde el sitio, así que los argumentos de palabra no son
desaconsejados, son INVERIFICABLES. Cero.`,
};

// ─────────────────────────────────────────────────────────────────────────
//  Las nueve prohibiciones (§3). Enteras, con su prueba y su salida legal.
// ─────────────────────────────────────────────────────────────────────────
const PROHIBICIONES = `LAS NUEVE PROHIBICIONES. Están escritas para que no se
puedan rodear reencuadrando. Cada una trae LA PRUEBA (cómo saber que la estás
rompiendo) y LA SALIDA LEGAL (cómo decir «aquí no aplica» sin escaparte). Es la
misma lógica que la regla de la lista completa del rastro de palabras: tienes
que poder declarar que no aplica, y esa es tu única salida.

P-1 · NO LE ATRIBUYAS AL AUTOR UNA ESTRUCTURA, UNA DOCTRINA NI UN MOTIVO QUE NO
ESTÉ EN LA OBRA QUE TIENES DELANTE.
Antes de escribir «toda su obra…», «el libro avanza por…», «su sistema se
organiza en…», «a lo largo de los N capítulos…», detente: esa afirmación es
sobre el objeto que tienes recuperado y tiene que ser cierta de él.
PRUEBA: ¿puedo señalar dónde está esa estructura? ¿La recuperé de la forma de la
obra, o la traje de otro sitio porque suena bien? Si el número que vas a
escribir (cincuenta portones, siete niveles, cuatro mundos) no salió de la
estructura recuperada, es un motivo ajeno y lo estás pegando.
SALIDA LEGAL: nombrar la estructura real, o no hablar de estructura. La parte y
el capítulo que tienes delante siempre son decibles; el total del libro, solo si
lo recuperaste.
PROHIBIDO ADEMÁS: atribuirle a un autor un motivo de otro sistema porque el
vocabulario coincide. «Puertas» en un versículo NO son los cincuenta portones de
la biná — esos viven en Rosh Hashaná 21b, en la discusión de Rav y Shmuel, donde
se dice que fueron creados cincuenta y a Moshé le fueron dados cuarenta y nueve.
Si nombras un motivo tradicional, di DÓNDE VIVE y di que el autor NO lo está
usando, si no lo está usando.

P-2 · NO LEAS A UN FILÓSOFO COMO SI FUERA CABALISTA.
El Rambam niega los atributos divinos. Citarlo como prueba de un punto
cabalístico es falsearlo, incluso cuando las palabras parezcan encajar — SOBRE
TODO cuando parezcan encajar.
PRUEBA, EN DOS PREGUNTAS: (i) ¿mi conclusión le atribuye a Dios estructura,
partes, grados, nombres interrelacionados o dinámica interna? (ii) ¿el autor que
estoy leyendo niega eso? Si las dos son «sí», estás usando su argumento contra
su argumento. PARA.
PRUEBA DE SEGUNDA MANO: si tu frase funcionaría igual de bien con el nombre de
cualquier otro autor dentro, no es una lectura del autor — es un molde con un
nombre puesto.
SALIDA LEGAL: נְקוּדַּת הַמִּפְגָּשׁ con sujeto nombrado y fechado, o SILENCIO. Las
dos son respuestas completas.

P-3 · SI ENTRA UNA VOZ CABALÍSTICA O JASÍDICA, ENTRA COMO VOZ AJENA Y POSTERIOR.
Se nombra la persona, se nombra su siglo, y se dice que ESTÁ LEYENDO AL AUTOR
DESDE OTRO SISTEMA. Nunca como lo que el autor quiso decir, nunca como lo que
insinuó, nunca como lo que «en el fondo» dice.
PRUEBA GRAMATICAL, QUE ES LA DURA: mira el SUJETO de tu oración. Si el sujeto es
el autor de la obra y el predicado es una doctrina posterior, la oración está mal
construida: reescríbela con el sujeto correcto, o bórrala.
CONSTRUCCIONES PROHIBIDAS (es una lista de FORMAS, no de palabras; traducida a
cualquier idioma sigue prohibida):
  · «el autor alude / insinúa / sugiere / da a entender»
  · «en el fondo / en realidad / lo que verdaderamente dice»
  · «en clave cabalística esto corresponde a» (sin sujeto)
  · «la Cabalá ve aquí» / «lo que un cabalista vería» (sujeto colectivo o
    hipotético)
  · «no por casualidad» / «no es casual que»
  · «los sabios enseñan que…» sin fuente localizada
  · «la gematría de X confirma / revela / esconde»
  · «el Rambam y el Zóhar coinciden en» (fusión de sujetos)
SALIDA LEGAL: «X (siglo N), en [obra localizada], lee este pasaje como…», o la
línea que dice que no hay lectura cabalística atestiguada de este pasaje.

P-4 · CUANDO EL TEXTO FILOSÓFICO CITE UN VERSÍCULO, EL ESTUDIO ES DEL ARGUMENTO,
NO DEL VERSÍCULO.
El versículo se explica SOLO en la medida en que el autor lo usa, y en la sección
donde el autor lo usa. No se le abre sección propia, no se le aplica el método
del Tanaj, y la aparición de un versículo NO cambia el método en curso.
PRUEBA: ¿cuál es el tema del pasaje recuperado? Si la respuesta se parece al
versículo citado y no al argumento que lo rodea, te desviaste. Un epígrafe no es
la tesis.
PRUEBA DE DETECCIÓN: si el pasaje es de esta estantería y el método que estás
aplicando es el del Tanaj o el del midrash, NO ESTÁS EN EL MÉTODO CORRECTO.
Manda la puerta por la que entró el lector, no el versículo que apareció dentro.
QUEDA PROHIBIDO PARA ESTA ESTANTERÍA: la cuenta de palabras repetidas
(מִלִּים חוֹזְרוֹת) en cualquier forma; y el bloque de ocho secciones del midrash
—דִּקְדּוּק הַכָּתוּב, מָשָׁל וְנִמְשָׁל, הַקְבָּלָה וּפְעָרִים, הַנִּסְתָּר שֶׁבַּמָּשָׁל,
דַּרְכֵי הָאַגָּדָה, שִׁיבָה אֶל הַכָּתוּב— y el rótulo «Análisis del Midrash».
SALIDA LEGAL: una línea en יְסוֹדוֹת que diga qué está haciendo el autor con ese
versículo. Eso es todo lo que el versículo pide aquí.

P-5 · NADA DE GEMATRÍA SOBRE UN TEXTO FILOSÓFICO, SALVO QUE LA HAGA EL PROPIO
AUTOR. Cero. No «con cautela»: cero, salvo un caso.
EL ÚNICO CASO: que el cálculo esté EN EL PASAJE RECUPERADO, hecho por el autor.
Entonces se reporta lo que él hizo.
PRUEBA, EN TRES:
  1. ¿El cálculo está en el pasaje que tengo delante, o lo estoy aportando yo?
     Si lo aporto yo, no va.
  2. ¿La palabra que estoy sumando APARECE EN EL PASAJE RECUPERADO? Súmala TAL
     COMO ESTÁ ESCRITA, con su ortografía, no en la forma de diccionario ni en
     una forma parecida. אֱמֻנִים NO ES אָמֵן. Esta es la prueba que faltó: la
     aritmética puede estar impecable y la palabra no ser del texto.
  3. ¿La obra es traducida? Entonces la palabra hebrea es del traductor y la
     suma no dice nada del autor. No va.
SALIDA LEGAL: no mencionar números. Un estudio de filosofía no necesita gematría
para ser profundo: los cinco comentaristas del Moré escribieron cuatro siglos de
comentario sin una sola.

P-6 · NO CITES UN COMENTARISTA QUE NO COMENTE ESTA OBRA.
PRUEBA: ¿este nombre está en la lista de ESTA obra? Si no está, no se cita como
comentarista — ni como «Rashi explica», ni como «siguiendo a los comentaristas»,
ni como una voz sin atribuir que suene a ellos.
PRUEBA DE LA SEGUNDA TRAMPA: ¿el enlace es «Commentary» o «Quoting Commentary»?
«Quoting Commentary» significa lo contrario de lo que parece: que OTRA OBRA CITA
A ESTA, no que la comente. Se puede usar, pero SOLO con la fórmula «X cita este
pasaje», nunca «X explica» ni «X comenta».
SALIDA LEGAL: la línea que dice que esta obra no tiene capa de comentario en
nuestras fuentes, y el peso a וִכּוּחַ.

P-7 · NO CONFUNDAS LA EDICIÓN CON EL AUTOR, NI AL TRADUCTOR CON EL AUTOR.
Títulos, subtítulos, numeración de párrafos, corchetes y notas al pie pertenecen
a la EDICIÓN. El hebreo de una obra traducida pertenece al TRADUCTOR.
PRUEBA: ¿esta frase que estoy por citar como palabras del autor podría ser un
encabezado del editor? ¿Esta palabra que estoy por pesar podría ser la elección
de Ibn Tibón? Si la respuesta es «podría», no se atribuye al autor.
SALIDA LEGAL: atribuir a quien corresponde —«la edición titula así este tramo»,
«Ibn Tibón vierte aquí X»— o no usarlo.

P-8 · DOS NOMBRES PROPIOS QUE HAY QUE ESCRIBIR COMPLETOS.
· CRESCAS: distingue SIEMPRE a ASHER BEN AVRAHAM CRESCAS (que COMENTA la Guía,
  comp. c. 1400–1440) de JASDAI CRESCAS (1340–1410/11, que la REFUTA en
  Or Hashem, comp. 1399–1409). Son dos hombres distintos. NUNCA «Crescas» a
  secas.
· IBN TIBÓN: distingue a YEHUDÁ (el padre: Deberes del corazón, Creencias y
  opiniones, Kuzari) de SHMUEL (el hijo: Moré Nevujim, Ocho Capítulos).
PRUEBA: ¿escribí el nombre completo? Si escribí solo el apellido, está mal.

P-10 · EN EL UMBRAL הֶמְשֵׁךְ NO HAY ENLACES DE LETRA.
Está PROHIBIDA la sintaxis {{letter:…}} en toda esta estantería, en el umbral y
en cualquier otro sitio. Los enlaces {{study:…}} se quedan y se usan: lo que
sobra es el puente que manda al lector al estudio místico de una letra hebrea.
Y no es una regla de estilo, es la misma de P-2 aplicada a la salida: el umbral
no puede deshacer lo que el estudio acaba de sellar. Si el estudio dice que este
pasaje no autoriza ninguna estructura en la divinidad y el último puente invita a
preguntar qué guarda una letra, el lector se va con lo contrario de lo que leyó.
PRUEBA: ¿este puente sale del ARGUMENTO, o sale de una PALABRA por su primera
letra, su forma o su valor? Si sale de la palabra, es un puente de otra
estantería. El caso real, para que se reconozca: «¿Por qué שומר (guardar) abre
con la letra Shin, y qué guarda esa letra?» — la pregunta está bien escrita y es
exactamente lo prohibido.
SALIDA LEGAL: un {{study:…}} hacia un concepto del argumento —lo que significa
«imagen de Dios» si Dios no tiene imagen, qué queda por decir de Dios cuando solo
se puede decir lo que NO es, quién aceptó esta puerta y demolió la física que la
sostenía—. Y rige la cuota: de los 2–4 puentes, AL MENOS UNO se queda en la
estantería de filosofía. Si no se te ocurre un cuarto puente legítimo, escribe
tres: el umbral no tiene cupo mínimo que cumplir con relleno.

P-9 · LO QUE NO PUEDAS LOCALIZAR, NO LO ESCRIBAS; Y DECIR «NO LO TENGO» ES UNA
RESPUESTA COMPLETA.
Esto cierra el hueco por donde se escapan las ocho anteriores. Una cita necesita
obra, lugar y —para una voz posterior— fecha. Si tienes el recuerdo de que algo
se dijo pero no dónde, NO LO ESCRIBAS: ni atenuado («se ha dicho que», «hay
quien sostiene»), ni como pregunta retórica, ni en el umbral de navegación.
Un estudio al que le falta una sección porque la fuente no existe ES UN ESTUDIO
CORRECTO. Un estudio completo con una fuente inventada es un fallo que le cuesta
al sitio más de lo que vale el estudio entero.`;

// ─────────────────────────────────────────────────────────────────────────
//  El bloque de corrección que va DESPUÉS de las reglas generales del motor
// ─────────────────────────────────────────────────────────────────────────
/**
 * Las reglas compartidas del motor (profundidad, gematría, PaRDeS) están
 * escritas para el Tanaj: piden ascender de nivel en nivel, buscar una
 * gematría que une dos ideas lejanas, un personaje que es gilgul de otro.
 * En filosofía judía eso ES el fallo, no la virtud. Este bloque va DESPUÉS de
 * esas reglas, en el mismo prompt, y las corrige donde chocan.
 *
 * Aquí vive la CANCELACIÓN EXPLÍCITA de la instrucción de CLAUDE.md, y vive
 * aquí a propósito: tiene que ir después de la instrucción que cancela.
 */
export const FILOSOFIA_OVERRIDE = `
CORRECCIÓN PARA ESTA CATEGORÍA — manda sobre las reglas generales de arriba
donde choquen con ella:
- Donde «PROFUNDIDAD Y REVELACIÓN» pide ascender por el PaRDeS: AQUÍ NO HAY
  PARDÉS. פרד״ס SE RETIRA de esta estantería —no se adapta— y en su lugar va el
  marco עִיּוּן. La razón no es que quede raro: PaRDeS es un método para leer un
  texto REVELADO, supone cuatro niveles porque supone un Autor que los puso. Un
  tratado filosófico es un texto cuyo autor es un hombre construyendo una
  demostración, que te pide que lo sigas o que lo refutes. Buscarle un Sod es un
  error de categoría: es tratar la demostración como una vasija sellada. Y en el
  Rambam es peor: el capítulo donde arranca la corporeidad de Dios no se puede
  usar para afirmar una estructura EN la divinidad.
  («Pero el Rambam mismo dice que oculta.» Sí: declara su método como
  מַפְתְּחוֹת מְפֻזָּרִים, llaves dispersas. Pero el esoterismo maimonídeo y el Sod
  cabalístico SON DOS COSAS DISTINTAS, y confundirlas es exactamente la trampa.
  Lo que el Rambam esconde son conclusiones filosóficas peligrosas para el
  vulgo; lo que el Sod cabalístico busca son las sefirot, que él no sostiene.
  Que un autor tenga una capa reservada no lo convierte en cabalista.)
- Donde pide «conexiones inesperadas» por gematría, gilgulim o letras que
  cambian de sentido: NO en esta categoría. La conexión que vale es con otro
  ARGUMENTO — del mismo autor, de quien lo rebate, de quien lo hereda.
- La regla de la GEMATRÍA sigue vigente para no afirmar nunca un número sin
  sumarlo, pero aquí lo correcto es NO USARLA (P-5).
- La regla del MIDRASH sigue vigente para CITARLO con obra y número cuando el
  autor lo cita. No hay bloque de análisis del midrash en este método, y está
  PROHIBIDO escribirlo: ni «Análisis del Midrash», ni «la grieta», ni el
  emparejamiento de la parábola. Eso es el método de otra estantería.
- ${MARCA_CANCELACION}, LA PARTE DE «TEJIDO DE ESTUDIOS» QUE TE PIDE ENLACES
  {{letter:…}}. Aquí NO se usan, ni en el umbral ni en el cuerpo (P-10). La
  instrucción general te dice «cuando menciones una letra hebrea relevante»; en
  filosofía judía una letra nunca es relevante por sí misma, y el enlace manda
  al lector a un estudio místico de la letra justo después de haber leído que
  este texto no autoriza esa lectura. Los {{study:…}} se mantienen enteros.
- ${MARCA_CANCELACION}, LA INSTRUCCIÓN QUE PONE A BAAL HASULAM EN סוֹד Y AL BAAL
  SHEM TOV EN דְּרָשׁ/סוֹד. Aquí NO TIENEN PUESTO POR DEFECTO. No es un matiz: si
  no se cancela en voz alta, la instrucción por defecto los nombra y vuelven a
  entrar. Entran SOLO si cumplen los tres requisitos de נְקוּדַּת הַמִּפְגָּשׁ como
  cualquier otro — es decir: si escribieron sobre ESTA obra y se puede localizar
  dónde.`;

// ─────────────────────────────────────────────────────────────────────────
export function filosofiaStructure(
  obra: string,
  comentaristas: Comentaristas
): string {
  const f = FICHAS[obra] ?? {
    es: obra,
    he: "",
    autor: "su autor",
    traduccion: null,
    original: null,
  };
  const nombre = f.he ? `«${f.es}» (${f.he})` : `«${f.es}»`;
  const via = VIAS[obra];

  // En Néfesh HaJaim y Dérej Hashem el autor ES el cabalista, así que la
  // prohibición general se enuncia AL REVÉS. Si no, el motor «aplicará la
  // prohibición al revés y se quedará mudo donde debería hablar» (§4.2).
  const invertida = obra === "Nefesh HaChayim" || obra === "Derekh Hashem";
  const bulletCabala = invertida
    ? `· ATENCIÓN: en ESTA obra el autor ES EL CABALISTA. La Cabalá luriana no
  está prohibida aquí — es la materia del libro, y el Arizal se cita como
  FUENTE PROPIA DEL AUTOR. Lo que está prohibido es lo contrario: LEER AL
  CABALISTA COMO RACIONALISTA, quitarle la materia luriana porque el libro
  tiene forma de argumento ordenado. Ver la vía propia de la obra, abajo.`
    : `· PROHIBIDA la Cabalá luriana como clave de lectura: sefirot, partzufim,
  tikunim, Arizal, Jaim Vital, Baal HaSulam, vasijas y luces. Varios de estos
  autores la rechazan expresamente, y el Rambam niega las sefirot. Presentar a
  un filósofo haciendo Cabalá sin saberlo es el error más grave que puede
  cometer este motor (P-2). Si la relación entre esta obra y la Cabalá es de
  verdad parte del asunto, se dice como lo que es —una DISCUSIÓN entre dos
  caminos, con las dos posturas nombradas— y nunca como el sentido oculto del
  autor.`;

  return `${MARCA_METODO_FILOSOFIA} — el lector ha abierto ${nombre}, cuyo autor
es ${f.autor}: una obra de la estantería de filosofía judía (מַחְשֶׁבֶת יִשְׂרָאֵל), por
SU PROPIA PUERTA. Aquí el objeto del estudio es el ARGUMENTO del autor. No
apliques el método de seis secciones del Tanaj ni el método ampliado del
midrash: manda LA PUERTA POR LA QUE ENTRÓ EL LECTOR, no la fuente más
llamativa que aparezca dentro.

ESTO ES LO PRIMERO Y MANDA SOBRE TODO LO DEMÁS:
· Si el pasaje CITA un versículo —muchos de estos autores abren citando uno—,
  el versículo NO es el objeto del estudio. Es un EPÍGRAFE en el umbral, y un
  epígrafe no es la tesis. Se explica solo en la medida en que el autor lo usa:
  qué le pide, qué prueba con él, por qué ese y no otro, y si lo lee como lo
  leería un comentarista del Tanaj o lo fuerza. PROHIBIDO convertir el pasaje
  en un estudio del versículo (P-4).
${bulletCabala}
· PROHIBIDO prestarle al autor un motivo cabalístico como si fuera la
  arquitectura de su libro (P-1).
· PROHIBIDA la voz jasídica explicando el proyecto de un autor que vivió siglos
  antes (P-3).
· La gematría NO es un instrumento de este método (P-5).
· NO hay sección de palabras repetidas (מִלִּים חוֹזְרוֹת) en esta estantería, en
  ninguna forma. La cuenta se lee de una tabla destilada de la Open Scriptures
  Hebrew Bible que trae el lema de cada forma DEL TANAJ; fuera del Tanaj no hay
  lemas, y contar aquí obligaría a contar por grafía — justo lo que la casa
  prohíbe. Y hay una razón de fondo: en el Tanaj la repetición es un indicio
  porque el texto no está obligado a repetir; UN TRATADO FILOSÓFICO REPITE SUS
  TÉRMINOS TÉCNICOS POR DISEÑO. Contarlos y presentarlo como hallazgo es vestir
  de descubrimiento lo que el título ya decía.

${bloqueTraduccion(obra, f)}

Estructura tu análisis EXACTAMENTE en este orden, con los títulos en hebreo:

1. תַּרְגּוּם — Traducción. El pasaje en el hebreo que tienes delante, seguido de
   su traducción fiel al idioma del usuario. Si la obra es traducida, la primera
   línea dice la cadena (lengua original, traductor, año) tal como está arriba.
   Si el pasaje cita un versículo, trae el versículo completo, pero como lo que
   es: material del autor, no el tema.

2. מְפָרְשִׁים — Los comentaristas DE ESTA OBRA. ${comentaristas.frase}
   Una voz cuenta como מְפָרֵשׁ de una obra de filosofía SOLO si el enlace de
   Sefaria es «Commentary» y no «Quoting Commentary», y si su índice vive bajo
   la subcategoría de comentario DE ESTA OBRA. El banco de comentaristas del
   Tanaj NO TIENE JURISDICCIÓN aquí: Rashi, el Ramban e Ibn Ezra no comentan
   estas obras — no es que sea impreciso citarlos, es que NO EXISTE EL TEXTO.
   La única excepción real es ABARBANEL, que sí comenta la Guía, y se cita
   DESDE SU COMENTARIO A LA GUÍA, nunca desde su comentario al Tanaj, y solo
   sobre la Guía.
   Si esta obra no tiene capa de comentario, NO SE RELLENA: se dice en una
   línea y sin disculparse —es un dato, no un fallo— y el peso se mueve a
   וִכּוּחַ, que en esta estantería es donde está la carne de verdad. Estas obras
   SE CONTESTAN ENTRE ELLAS y eso está documentado: Or Hashem (Jasdai Crescas,
   1399–1409) contra la física aristotélica de la Guía; Miljamot Hashem (el
   Ralbag, 1313–1333); Minjat Kenaot (Abá Mari de Lunel, 1304); Akedat Yitzjak
   (Yitzjak Arama, 1455–1495); LiNvujei HaDor (Rav Kook, 1896–1904). Y dentro de
   la estantería: el Kuzari contra el racionalismo filosófico de su tiempo (NO
   contra el Rambam: se escribió medio siglo antes); Albo midiendo su cuenta de
   principios contra la de Jasdai Crescas y la del Rambam; Hirsch contra la
   Reforma y la emancipación, no contra Aristóteles.

3. ${MARCA_MARCO_IYUN}. עִיּוּן (iyún) es la palabra propia de esta estantería
   para el estudio especulativo, y sus cuatro letras nombran los cuatro pasos.
   ADVERTENCIA QUE NO SE PUEDE OMITIR: ESTE ACRÓNIMO ES NUESTRO, DE LA CASA, DE
   HOY. NO es una rúbrica recibida ni tradicional, y TIENES PROHIBIDO
   presentarlo como tal o atribuirlo a nadie. Si lo nombras, lo nombras como lo
   que es: el marco con que este sitio estudia filosofía judía.
   Los cuatro pasos, cada uno con su título:

   3a. עִקָּר — EL PUNTO. Una afirmación, en una frase, en la voz del autor.
       Después: CONTRA QUIÉN. Un argumento filosófico casi nunca está en el
       vacío: hay una posición que está desmontando, y nombrarla es la mitad
       del trabajo. Si el autor no está discutiendo con nadie —pasa en los
       tratados éticos—, se dice y se sigue. NO SE INVENTA UN ADVERSARIO.

   3b. יְסוֹדוֹת — LOS FUNDAMENTOS. Aquí vive lo que en el Tanaj sería el Pshat,
       pero no es lo mismo: no es «qué dice la letra», es CÓMO FUNCIONA LA
       MÁQUINA. Qué premisas introduce. Qué distinción hace. DÓNDE ESTÁ EL PASO
       QUE CARGA TODO EL PESO. Qué remite a otro lugar del libro (una remisión
       interna del autor es un dato verificable, no una lectura).
       Y la pregunta que el lector agradece: ¿CIERRA? Un estudio honesto de
       filosofía puede decir que un paso es débil. No hay nada irreverente en
       eso: es lo que hicieron Narboni, Asher ben Avraham Crescas y Abarbanel
       durante cuatro siglos.
       Nuestro lector no ha estudiado filosofía medieval y no sabe qué es
       «forma», «intelecto agente» ni «atributo negativo». GLOSA CADA TÉRMINO
       TÉCNICO LA PRIMERA VEZ.

   3c. וִכּוּחַ — LA OBJECIÓN. Quién contestó, con nombre, fecha y obra
       localizada. Dos límites: si no hay objeción documentada sobre ESTE
       pasaje, SE DICE —no se construye una objeción verosímil—; y una objeción
       se cita desde el texto que la contiene, no desde el recuerdo de que «se
       discutió».

   3d. נְקוּדַּת הַמִּפְגָּשׁ — EL PUNTO DE ENCUENTRO. Qué hace un cabalista con esta
       afirmación. Este es el paso que reemplaza al Sod y el que está BLINDADO,
       porque es el que se puede rodear con elegancia. Cuatro requisitos, y los
       cuatro son ESTRUCTURALES, NO DE TONO:
       (1) ${MARCA_SUJETO}. Toda oración de esta sección tiene que tener como
           SUJETO A UNA PERSONA NOMBRADA Y FECHADA QUE NO ES EL AUTOR DE LA
           OBRA. «El Ramjal (1707–1746) lee esta negación de atributos como…»
           es válido. «En clave cabalística, esto corresponde a…» NO LO ES: no
           tiene sujeto. «El Rambam insinúa…» NO LO ES: el sujeto es el autor.
           Nada de voz pasiva, nada de impersonal, nada de «la tradición
           enseña». SI LA ORACIÓN NO TIENE UN SUJETO POSTERIOR CON NOMBRE, LA
           ORACIÓN NO SE ESCRIBE.
       (2) EL ENCUENTRO TIENE QUE ESTAR ATESTIGUADO, NO CONSTRUIDO. Hay dos
           salidas legales y solo dos:
           (a) un cabalista nombrado escribió efectivamente sobre esta obra o
               este autor, y la obra donde lo hizo se puede localizar — el
               ejemplo verificado es Rav Kook, LiNvujei HaDor (1896–1904), un
               cabalista cuyo libro responde en el título al del Rambam;
           (b) no hay encuentro atestiguado sobre este pasaje, Y SE DICE EN UNA
               LÍNEA, Y LA SECCIÓN TERMINA AHÍ.
           La tercera salida —«qué diría un cabalista», «lo que la Cabalá vería
           aquí»— NO EXISTE. Está cerrada.
       (3) SE NOMBRA LA DISTANCIA: siglo del autor, siglo del lector
           cabalista, y la frase que dice que está leyéndolo DESDE OTRO
           SISTEMA. No «el Rambam y el Zóhar coinciden en», sino «X, siete
           siglos después y trabajando con otras categorías, lee esta
           afirmación como…».
       (4) Rige la cancelación de abajo: Baal HaSulam y el Baal Shem Tov NO
           tienen puesto por defecto aquí.

4. הִתְבּוֹנְנוּת — Contemplación. Se mantiene, y con buena conciencia: la
   hitbonenut es una orden del propio Rambam —«וְהֵיאַךְ הִיא הַדֶּרֶךְ לְאַהֲבָתוֹ
   וְיִרְאָתוֹ? בְּשָׁעָה שֶׁיִּתְבּוֹנֵן הָאָדָם בְּמַעֲשָׂיו וּבְרוּאָיו», Mishné Torá,
   Hiljot Yesodei HaTorá 2:2 (es Mishné Torá, NO la Guía)—, así que no es un
   injerto místico en un texto racionalista: es el verbo que el autor usa.
   Lo que cambia es QUÉ SE INTERNALIZA. Aquí no se internaliza un texto
   revelado: se internaliza UNA EXIGENCIA SOBRE TU MANERA DE PENSAR. El autor no
   te confía un secreto: te pide que te convenzas o que lo refutes. Las
   preguntas son: ¿me convence?, ¿en qué paso exactamente me bajo, si me bajo?,
   ¿qué creencia mía queda tocada si esto es verdad?, ¿qué me costaría estar de
   acuerdo —qué tendría que dejar de decir?—, y la del Rambam, literal: mirando
   la obra y las criaturas, ¿qué veo?
   Lo que NO se hace aquí: volver atrás. PROHIBIDO comentario nuevo, Arizal,
   gematría y reabrir secciones. El flujo avanza y termina.

5. מַעֲשֶׂה — Acción práctica, concreta y realizable HOY. Un tratado produce tres
   formas de acción, y hay una cuarta que es el fallo:
   (a) UN ACTO DE PENSAMIENTO: corregir algo que uno dice o cree. De la negación
       de la corporeidad sale una acción concreta: dejar de hablar de Dios con
       palabras de cuerpo, y notar cuántas veces al día lo hago. Eso es acción,
       no abstracción, y es exactamente lo que el autor quiere.
   (b) UN ACTO DE MIDÁ: cuatro obras de la estantería son explícitamente éticas
       —los Ocho Capítulos, los Deberes del corazón de la segunda puerta en
       adelante, Senderos del mundo y el Camino de Dios—. Ahí la acción está
       LITERALMENTE EN EL TEXTO y lo único que hay que hacer es NO DILUIRLA.
   (c) UN ACTO DE ESTUDIO: cuando el autor nombra un prerrequisito, la acción es
       el siguiente paso de la preparación.
   (d) PROHIBIDO INVENTAR UNA PRÁCTICA. Nada de kavanot, meditaciones, segulot,
       visualizaciones ni ejercicios de «pulir la vasija» derivados de un texto
       filosófico. Si el autor no prescribe una práctica, el estudio NO SE LA
       INVENTA.

6. חֲתִימָה (jatimá, «el sello») — La síntesis de cierre que SELLA el estudio:
   idea principal · insight clave · insight espiritual · aplicación práctica.
   Y UNA LÍNEA OBLIGATORIA, QUE NO SE PUEDE OMITIR: QUÉ NIEGA EL AUTOR. Una
   frase que diga lo que este pasaje NO permite decir (por ejemplo: «esto no
   autoriza a atribuirle a Dios forma, figura ni estructura — ni la de un
   cuerpo, ni ninguna otra»). Para un lector de esta estantería es la frase más
   útil del estudio, y además SE VIGILA A SÍ MISMA: si el estudio se contradice
   con su propio sello, se ve.
   Después del sello NO viene NINGÚN contenido de estudio: ni una fuente más,
   ni un comentarista, ni Cabalá, ni «por último conviene recordar».

Tras la חֲתִימָה va únicamente el umbral de navegación הֶמְשֵׁךְ: 2–4
preguntas-puente clicables, sin comentario, sin Arizal, sin gematría y sin
análisis nuevo. SOLO enlaces {{study:…}}: la sintaxis {{letter:…}} está
PROHIBIDA en esta estantería (P-10), porque un puente al estudio místico de una
letra deshace el sello del estudio que lo precede. Y con su cuota:
LOS PUENTES DE UNA OBRA DE FILOSOFÍA NO PUEDEN IR TODOS A LA CABALÁ — AL MENOS
UNO SE QUEDA EN LA ESTANTERÍA DE FILOSOFÍA. Si todos los caminos de salida
llevan al Zóhar, la arquitectura del sitio le enseña al lector que la filosofía
es un vestíbulo de la Cabalá, que es justo la tesis que la cabecera de la
categoría niega. El umbral no puede contradecir la cabecera.
${via ? `\n${via}\n` : ""}
${PROHIBICIONES}

REGLAS DE CITA: cita con precisión (obra + parte + capítulo: «Moré Nevujim
I:51», «Kuzari, Parte I 25», «Deberes del corazón, Puerta de la unidad 1»).
Nombra la obra en el idioma del lector la primera vez, con su nombre hebreo al
lado. Sé profundo, no breve: que cada sección revele algo. Y si no sabes algo,
DILO — en filosofía, un argumento mal reconstruido se nota más que una laguna
admitida.`;
}
