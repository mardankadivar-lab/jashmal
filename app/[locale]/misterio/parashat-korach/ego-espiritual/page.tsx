"use client";

import EstudioMisterio, { type EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — פָּרָשַׁת קֹרַח · Parashat Korach
//  El ego espiritual — Bamidbar (Números) 16:1–18:32
//
//  Estudio completo con método PaRDeS.
//  Verificado por el Sofer (editor-erudito): 2026-06-17.
//  Fuentes primarias: Sefaria (Rashi, Ramban, Sforno, Arizal Shaar HaGilgulim,
//  Zohar Korach, Pirké Avot, Midrash Bamidbar Rabbah).
//
//  Serie: parasha · orden: 16
//  Sub-ruta: /misterio/parashat-korach/ego-espiritual
// ════════════════════════════════════════════════════════════════════════════

const data: EstudioData = {
  slug: "parashat-korach",
  hero: {
    serielabel: "Serie «Parashá» · Parashat Korach — gematría 308",
    serielabelFa: "سری «پاراشا» · پاراشات قورَح — گِماتریا ۳۰۸",
    he: "פָּרָשַׁת קֹרַח",
    titulo: "Parashat Korach",
    tituloFa: "پاراشات قورَح",
    numero: { valor: "308", rom: "קֹרַח · Gematría" },
    ganchoEs:
      "Korach tenía razón en el diagnóstico. Se equivocó en la prescripción.",
    ganchoFa:
      "قورَح در تشخیص درست بود. در نسخه اشتباه کرد.",
    fecha: "Shabat · 5 Tammuz 5786 · 20 jun 2026",
  },
  targum: {
    citas: [
      {
        label: "Bamidbar 16:1",
        he: "וַיִּקַּ֣ח קֹ֔רַח בֶּן־יִצְהָ֥ר בֶּן־קְהָ֖ת בֶּן־לֵוִ֑י וְדָתָ֨ן וַאֲבִירָ֜ם בְּנֵ֧י אֱלִיאָ֛ב וְא֥וֹן בֶּן־פֶּ֖לֶת בְּנֵ֥י רְאוּבֵֽן׃",
        es: "Y tomó Korach, hijo de Itzhar, hijo de Kehat, hijo de Leví; y Datan y Aviram, hijos de Eliav; y On, hijo de Pélet, hijos de Rubén.",
        source: "Bamidbar (Números) 16:1",
      },
      {
        label: "Bamidbar 16:2",
        he: "וַיָּקֻ֙מוּ֙ לִפְנֵ֣י מֹשֶׁ֔ה וַאֲנָשִׁ֥ים מִבְּנֵֽי־יִשְׂרָאֵ֖ל חֲמִשִּׁ֣ים וּמָאתָ֑יִם נְשִׂיאֵ֥י עֵדָ֛ה קְרִאֵ֥י מוֹעֵ֖ד אַנְשֵׁי־שֵֽׁם׃",
        es: "Y se levantaron ante Moshé, y con ellos doscientos cincuenta hombres de los hijos de Israel, príncipes de la congregación, los llamados a la asamblea, hombres de nombre.",
        source: "Bamidbar (Números) 16:2",
      },
      {
        label: "Bamidbar 16:3",
        he: "וַיִּֽקָּהֲל֞וּ עַל־מֹשֶׁ֣ה וְעַֽל־אַהֲרֹ֗ן וַיֹּאמְר֣וּ אֲלֵהֶם֮ רַב־לָכֶם֒ כִּ֤י כׇל־הָֽעֵדָה֙ כֻּלָּ֣ם קְדֹשִׁ֔ים וּבְתוֹכָ֖ם יְהֹוָ֑ה וּמַדּ֥וּעַ תִּֽתְנַשְּׂא֖וּ עַל־קְהַ֥ל יְהֹוָֽה׃",
        es: "Y se reunieron contra Moshé y contra Aharón, y les dijeron: '¡Basta ya para vosotros! Pues toda la congregación, todos ellos son santos, y en medio de ellos está el Eterno. ¿Por qué entonces os elevéis por encima de la congregación del Eterno?'",
        source: "Bamidbar (Números) 16:3",
      },
    ],
    parrafos: [
      `Nota gramatical sobre "וַיִּקַּח" (vayikaj): El verbo es anómalo — aparece sin objeto directo. ¿Qué tomó Korach? El texto guarda silencio. Rashi recoge la tradición: Korach "se tomó a sí mismo a un lado". El Targum Onkelós vierte vayikaj como vet'palleg — "y se dividió". La rebelión comenzó en su interior.`,
      `Nota de nombres: Korach (קֹרַח) — gematría 308 (Kuf 100 + Resh 200 + Jet 8). El nombre contiene karach (קָרַח), calvicie/vaciamiento. Itzhar (יִצְהָר), su padre, significa "aceite de oliva" — la sustancia que ungía al kohen.`,
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "רַשִׁ\"י — Rashi (Francia, 1040–1105). Verificado en Sefaria: Rashi on Numbers 16:1.",
        texto: `Remite al Midrash Tanjumá como clave hermenéutica. Sobre "vayikaj": Korach "se tomó a sí mismo a un lado" — se separó antes de convocar a otros. El Targum traduce como "y se dividió". El primer acto de Korach no fue tomar seguidores; fue separarse internamente. Los 250 hombres (v.2) eran "príncipes de la congregación" — no demagogía popular sino tentación de altura. Korach convenció a los sabios y líderes.`,
      },
      {
        etiqueta: "רַמְבַּ\"ן — Ramban (Cataluña/Eretz Israel, 1194–1270). Verificado en Sefaria: Ramban on Numbers 16:1.",
        texto: `La causa profunda: envidia (kiná) y orgullo (gaavá). Korach tenía riqueza, sabiduría y función sagrada real como levita en el servicio del Mishkán. Su problema no era la falta de status — era que el status real no era suficiente para el deseo que lo consumía. "כִּי כׇל־הָֽעֵדָה כֻּלָּ֣ם קְדֹשִׁ֔ים" — el argumento es teológicamente correcto. El error: deducir que igualdad de origen implica uniformidad de función. El sol y la luna son ambos lumbreras pero tienen órbitas diferentes.`,
      },
      {
        etiqueta: "ספורנו — Sforno (Italia, c.1475–1550). Verificado en Sefaria: Sforno on Numbers 16:1.",
        texto: `La estructura sintáctica señala a Korach como instigador principal. Los hijos de Rubén fueron reclutados, no iniciadores. "Hombres de nombre" (v.2) — tenían fama, reputación; precisamente por eso eran vulnerables al argumento de Korach: si todos son santos, la jerarquía de Moshé y Aharón es usurpación.`,
      },
      {
        etiqueta: "אריז\"ל — El Arizal (Safed, 1534–1572). Shaar HaGilgulim, caps. 33, 36 y 39 — verificado en Sefaria.",
        texto: `El Arizal revela en el Shaar HaGilgulim que el alma de Korach es el Ruaj (espíritu) malvado de Kaín, reencarnado. Shaar HaGilgulim cap. 33, párr. 7: "Sabe que Korach ben Itzhar es del aspecto del Ruaj de Kaín por su lado del mal... pues el Ruaj malvado de Kaín se vistió en él, y por eso actuó como acusador contra Hevel su hermano, que es Moshé Rabenu." Cap. 36, párr. 101: "También el alma (Nefesh) de Korach es el alma de Kaín." Cap. 36, párr. 109: "Ese mal entró en Korach — en el misterio de 'Vayikaj Korach': tomó un mal negocio para sí mismo." El enigma gramatical de "vayikaj" cobra aquí su significado más hondo: Korach no tomó posición ni seguidores; tomó la mala decisión de entrar él mismo en el rol de Kaín. La rebelión contra Moshé es, en el nivel del alma, la misma dinámica cósmica que ocurrió en el primer fratricidio: Kaín contra Hevel. La paradoja es escalofriante: Kaín y Hevel eran hermanos. Korach y Moshé son, en el plano del gilgul (reencarnación), la misma pareja ancestral. Korach "reconoce" en Moshé al Hevel que en otra vida superó a Kaín en la aceptación divina — y el resentimiento de milenios se despierta disfrazado de teología. El argumento de la igualdad sagrada no es una verdad mal aplicada; es la envidia de Kaín con ropaje sacerdotal. En cuanto al sistema del tikún, el Arizal señala en cap. 39, párr. 49: "Korach en Jesed, con trece chispas." Esta ubicación en Jesed indica que las chispas de santidad atrapadas en el alma de Korach/Kaín son recuperables — la tradición identifica a Elishá el profeta como el gilgul que eleva estas chispas. El Zohar, Korach 2:3, añade la dimensión de los 250 seguidores: vinieron del lado de la Guevurá, "eran hombres de nombre... pero tomaron para sí mismos y se ligaron a la controversia." Los seguidores de Korach tenían su raíz en Guevurá — fuerza y rigor — que al tomar "para sí mismos" (לְגַרְמַיְיהוּ), cortaron esa energía de su fuente y la convirtieron en controversia. El ketoret que Korach y sus hombres ofrecen es el servicio más íntimo del Templo — el que más directamente conecta al oferente con la Divinidad. Exigirlo es pretender el acceso a Kéter sin la cadena de sefirot intermedias.`,
      },
    ],
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat",
        parrafos: [
          `Crisis política-religiosa de consecuencias catastróficas. Korach, levita de linaje noble, organiza insurrección contra Moshé (profeta/líder civil) y Aharón (kohen gadol). Su argumento tiene lógica interna coherente: después de Sinaí, Israel es "reino de sacerdotes" (Shemot 19:6). Si toda la congregación es santa, ¿qué justifica la jerarquía exclusiva de Aharón? La prueba del incensario la decide el Eterno: la tierra se abre y devora vivos a Korach, Datan y Aviram con sus familias (Bamidbar 16:31-33). Los 250 son consumidos por fuego divino (v.35). La plaga del día siguiente mata 14,700 personas; solo se detiene cuando Aharón corre con su propio incensario a interponerse entre los vivos y los muertos (Bamidbar 17:11-13).`,
        ],
      },
      {
        head: "רֶמֶז — Remez",
        parrafos: [
          `La parashá es un mapa de la estructura interior del ser humano. Moshé = Da'at (conocimiento integrado, unión de intelecto y emoción). Aharón = Tiferet aplicada al servicio: la facultad de intermediar. Korach = la inteligencia que se revuelve contra sí misma. Sus 250 seguidores son las 250 luces de los nitzutzot de Biná cuando no están ancladas a su fuente. El argumento de Korach contiene una verdad profunda y un error profundo. La verdad: en el nivel del Ein Sof, toda alma tiene la misma raíz divina. El error: confundir igualdad de origen con uniformidad de función. Las diez sefirot son igualmente emanaciones del Ein Sof, pero cada una tiene su órbita y su tarea.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (voz del Baal Shem Tov integrada)",
        parrafos: [
          `El peligro más sutil del camino espiritual no es la idolatría burda sino la "verdad a medias" esgrimida al servicio del ego. Korach no mintió en su argumento central. Pero utilizó una verdad para construir una falsedad. El texto verdadero se convirtió en arma, no en fuente de luz.`,
          `Pirké Avot 5:17 (texto hebreo verificado en Sefaria): כָּל מַחֲלֹקֶת שֶׁהִיא לְשֵׁם שָׁמַיִם, סוֹפָהּ לְהִתְקַיֵּם. וְשֶׁאֵינָהּ לְשֵׁם שָׁמַיִם, אֵין סוֹפָהּ לְהִתְקַיֵּם — "Toda controversia por el bien del Cielo, su fin es perdurar. La que no es por el bien del Cielo, su fin no es perdurar. ¿Cuál es la controversia por el bien del Cielo? La de Hilel y Shamai. Y la que no es por el bien del Cielo: la de Korach y toda su congregación." Nótese: "Korach y toda su congregación" — no "Korach contra Moshé". La controversia está dentro de Korach mismo: entre su deseo de grandeza y el camino real de la grandeza.`,
          `El signo del machlokét leshem shamayim: el disputante puede ser convencido por la verdad. Hilel y Shamai actualizaban su posición cuando la evidencia lo requería. En el machlokét de Korach, ningún argumento penetra: no busca la verdad sino la victoria. Midrash Bamidbar Rabbah 18:3 (verificado en Sefaria): Korach era "jajam gadol" — un sabio extraordinario. Formulaba preguntas filosóficas penetrantes (el tallit azul, la casa llena de Torá). Su problema no era la ignorancia sino la dirección de su inteligencia.`,
        ],
      },
      {
        head: "סוֹד — Sod",
        parrafos: [
          `Moshé es el arquetipo de Da'at — no conocimiento abstracto sino el conocimiento de unión íntima. "El Eterno hablaba con Moshé cara a cara" (Shemot 33:11): esto es Da'at. Korach rechaza a Moshé y rechaza, sin saberlo, el principio de Da'at: que hay diferencia cualitativa entre quien conoce por unión directa y quien conoce por estudio.`,
          `Korach opera desde Guevurá desbalanceada — no el Din equilibrado que es la función sagrada de la Guevurá sino la rigidez que se convierte en separación. La tierra que lo devora es Maljut — el recipiente último — que rechaza una ofrenda impura. El mismo ketoret que en manos de Korach causa destrucción, en manos de Aharón (desde Tiferet, corriendo entre los vivos y los muertos) crea un escudo de vida. La diferencia no es el instrumento; es la raíz interior desde la que se ofrece.`,
        ],
      },
    ],
  },
  hitbonenut: {
    intro: "Detente aquí un momento. No pases al siguiente párrafo todavía.",
    parrafos: [
      {
        etiqueta: "El espejo.",
        texto: `La parashá de Korach es un espejo. Korach era brillante, culto, genealógicamente noble, con función real en el servicio divino. No era un marginado. Era alguien que tenía suficiente para vivir bien y, sin embargo, lo que tenía no era suficiente para el hambre que lo habitaba.`,
      },
      {
        etiqueta: "¿Dónde está mi Korach interior?",
        texto: `No el Korach grosero que exige poder abiertamente. El Korach sutil que encuentra argumentos brillantes para justificar lo que en realidad es envidia. El que usa lenguaje espiritual — "todos somos iguales ante Dios", "la jerarquía es artificio humano" — para cubrir un deseo que no tiene nada de espiritual.`,
      },
      {
        etiqueta: "El diagnóstico incómodo.",
        texto: `El diagnóstico es incómodo porque el argumento de Korach es verdadero. Todos somos, en algún nivel fundamental, iguales ante el Eterno. El problema no es la verdad del argumento — el problema es lo que hago con esa verdad. ¿La uso para crecer, para servir, para rendirme más profundamente... o la uso como arma para no recibir corrección, para no reconocer la función del otro?`,
      },
      {
        etiqueta: "Las preguntas que no tienen fondo.",
        texto: `¿Qué disputa llevo adentro que no tiene fondo porque no busca la verdad sino la victoria? ¿Con quién compito en silencio? ¿Cuándo usé una verdad espiritual como escudo para no cambiar?`,
      },
    ],
  },
  maase: {
    intro: "Una midá esta semana: anavá — la humildad auténtica.",
    etiqueta: "Ejercicio concreto:",
    texto: `La humildad auténtica no niega las propias capacidades. Es saber qué función te corresponde y realizarla sin apropiarse de las funciones ajenas. La humildad auténtica no es auto-deprecación sino la humildad de Moshé: "el hombre más humilde sobre la faz de la tierra" (Bamidbar 12:3) — en el hombre que más directamente habló con el Eterno. Identifica una situación esta semana donde normalmente necesitas tener la última palabra. Antes de hablar, hazte la pregunta de Pirké Avot 5:17: "¿Hablo esto leshem shamayim — por la verdad, por el crecimiento del otro — o por kavod, por ser visto?" Si la respuesta honesta es "por mi ego": silencio elegido. Eso es Moshé. Eso es anavá.`,
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Korach tenía razón en el diagnóstico y se equivocó en la prescripción. El diagnóstico: toda alma humana tiene dignidad sagrada que no depende de ninguna jerarquía — verdad eterna del Judaísmo y la Cabalá. La prescripción errónea: confundir igualdad de origen con uniformidad de función. El cosmos es una sinfonía, no un unísono.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El ego espiritual es más peligroso que el ego ordinario porque se disfraza de verdad. Korach no era claramente malvado — era un ambicioso con lenguaje sagrado, genealogía sagrada, argumentos sagrados. La tierra no se abrió porque fuera simplemente un malo. Se abrió porque la falsedad disfrazada de santidad es la inversión más profunda del orden sagrado.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El alma de Korach (el Ruaj de Kaín, según el Arizal) tenía 13 chispas sagradas situadas en Jesed — recuperables. El "mal negocio" que Korach tomó para sí mismo no es la última palabra: cada chispa busca su redención. La tradición identifica a Elishá el profeta como el gilgul que eleva esas chispas. Lo que se rompe puede ser reparado.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Antes de cada controversia, cada argumento espiritual que formulo para justificar lo que quiero — hacer la pausa del incensario. Preguntarme si mi ketoret viene del Kodesh HaKodashim interior o si viene del deseo de ser visto como kohen gadol.`,
      },
    ],
  },
  hemshej: [
    "{{study:maljut|¿Por qué la tierra —Maljut— es quien rechaza a Korach? ¿Qué nos enseña sobre cómo Maljut discrimina entre luz genuina y luz usurpada?}}",
    "{{study:machlokot-leshem-shamayim|Hilel y Shamai discutían ferozmente años. ¿Qué hace que una controversia sea 'por el bien del Cielo'? ¿Cómo se diferencia del machlokét de Korach?}}",
    "{{letter:kuf|La primera letra de Korach es Kuf (ק) — la letra del 100, del mono, de la piel que imita pero no es. ¿Qué revela la letra Kuf sobre el patrón de la imitación espiritual?}}",
  ],
  ctaRef: "Numbers 16:3",
};

export default function Page() {
  return <EstudioMisterio data={data} />;
}
