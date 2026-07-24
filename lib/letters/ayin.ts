import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  AYIN (ע) — Data de la decimosexta letra. Contenido erudito VERIFICADO por
//  el Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Génesis 16:7 — עֵין הַמַּיִם y הָעַיִן: 'ayin' = manantial, dos veces en
//     un solo versículo (Hagar en el desierto).
//   · Números 11:7 — וְעֵינוֹ כְּעֵין הַבְּדֹלַח: 'ayin' = color/apariencia (el man).
//   · Deuteronomio 11:12 — עֵינֵי ה' אֱלֹהֶיךָ בָּהּ: los ojos de Dios sobre la
//     tierra 'de principio a fin del año'.
//   · Deuteronomio 33:28 — עֵין יַעֲקֹב, el 'ojo de Yaakov'.
//   · Salmos 33:18 (עֵין ה' אֶל יְרֵאָיו, singular) y 34:16 (עֵינֵי ה' אֶל
//     צַדִּיקִים, plural) — los dos versículos de la Providencia.
//   · Salmos 90:10 — setenta años, los días de una vida.
//   · Éxodo 20:15 — וְכָל הָעָם רֹאִים אֶת הַקּוֹלֹת: en el Sinaí VIERON las voces.
//   · Shabat 104a — ס״ע: סְמוֹךְ עֲנִיִּים ('sostén a los pobres'); otra versión:
//     סִימָנִין עֲשֵׂה ('haz señales en la Torá y adquiérela').
//   · Sucá 55b — R. Elazar: los setenta toros de Sucot, כְּנֶגֶד שִׁבְעִים אוּמּוֹת.
//   · Mishná Sanhedrín 1:6 — el Sanedrín de 71: 'setenta hombres... y Moshé
//     sobre ellos' (R. Yehudá: setenta).
//   · Pirkei Avot 2:9 — R. Eliezer: עַיִן טוֹבָה es el camino recto; עַיִן רָעָה
//     el camino del que alejarse.
//   · Números 11:16 — los setenta ancianos; Génesis 46:27 y Éxodo 1:5 — las
//     setenta almas que bajaron a Egipto; II Samuel 5:4 — David: 30 + 40 = 70.
//   · Rashi a Deuteronomio 32:8 — 'setenta almas... estableció los límites de
//     los pueblos: שִׁבְעִים לָשׁוֹן' (las setenta naciones/lenguas, ancla del
//     conteo tradicional de Génesis 10).
//   · Bamidbar Rabá 13:16 (¡no 13:15!) — 'כשם שיין חשבונו שבעים, כך יש שבעים
//     פנים בתורה': como el vino (יין) suma setenta, setenta caras tiene la Torá.
//   · Pirkei DeRabí Eliezer 19 — Adam: 'tomé de mis años setenta y los añadí
//     a los días [de David]', con Salmos 61:7.
//   · Sefer Yetzirá 5 — Ayin es letra SIMPLE (ה״ו ז״ח ט״י ל״נ ס״ע צ״ק, ed.
//     impresa 5:2); recensión del Gra 5: המליך אות ע' ברוגז — Capricornio
//     (גדי) · Tevet · hígado (כבד).
//   · R. Yitzchak Ginsburgh, 'The Hebrew Letters' — página VIVA verificada:
//     inner.org/hebleter/ayin.htm ('Ayin: Divine Providence') y la tabla
//     inner.org/alefbeit/sigayin.htm (con .htm; sin extensión da 404).
//  Gematrías (calculadas letra por letra):
//    ע = 70 · nombre pleno עין = 70+10+50 = 130 · סיני = 60+10+50+10 = 130
//    (¡igualdad!) · 130 = 5 × 26 (הוי״ה = 26) · יין = 10+10+50 = 70.
//
//  NOTA DEL SOFER — precisiones y descartes:
//  1) La pista pedía verificar 'la serie עי"ן' en Shabat 104a: el pasaje real
//     agrupa ס״ע (sámej-ayin) = סְמוֹךְ עֲנִיִּים; la ayin se lee ahí como
//     עֲנִיִּים (pobres). No existe una homilía aislada de עי"ן en ese folio.
//  2) 'Setenta caras de la Torá': en la división de Sefaria la frase está en
//     Bamidbar Rabá 13:16 (13:15 no la contiene). Se cita 13:16.
//  3) Los 70 años que Adam regala a David suelen atribuirse al Zohar I:91b;
//     ese folio NO se pudo verificar, así que se cita la fuente que SÍ se
//     verificó palabra por palabra: Pirkei DeRabí Eliezer 19.
//  4) Sefer Yetzirá: la ed. impresa (5:2) lista las doce simples sin asignar
//     mes por letra en ese pasaje; la asignación ע → enojo (רוגז) · Capricornio
//     · Tevet · hígado es de la recensión del Gra (cap. 5). Se declara.
//  5) De la tabla de Ginsburgh se omiten ítems no verificables por nosotros
//     (p.ej. 'setenta palabras del Kidush', 'setenta gritos de la cierva').
//     No se asigna sendero del Árbol: Ginsburgh no asigna senderos.
// ─────────────────────────────────────────────────────────────────────────

export const ayin: LetterData = {
  slug: "ayin",
  letter: "ע",
  nameTranslit: { es: "Ayin", en: "Ayin", fa: "عَین" },
  nameHe: "עַיִן",
  value: 70,

  level1: {
    es: "Una sola palabra hebrea nombra dos cosas que parecen opuestas: עַיִן es el ojo — y es el manantial. El órgano que recibe la luz y la boca de la tierra por donde brota el agua. La Torá las usa juntas sin pestañear: cuando Hagar huye al desierto, el ángel la encuentra 'junto al manantial de agua (עֵין הַמַּיִם)... junto al ayin' (Génesis 16:7). Su número es setenta: setenta naciones, setenta almas, setenta ancianos, setenta caras de la Torá. Y su nombre completo suma 130 — exactamente סִינַי. Antes de leer una palabra más, quédate con la pregunta que la letra te clava: ¿el ojo recibe o da? ¿Mirar es beber del mundo — o hacerlo brotar?",
    en: "One Hebrew word names two things that seem opposite: עַיִן is the eye — and the spring. The organ that receives light, and the mouth in the earth from which water rises. The Torah uses both in a single verse: the angel finds Hagar 'by the spring of water (עֵין הַמַּיִם)... by the ayin' (Genesis 16:7). Its number is seventy: seventy nations, seventy souls, seventy elders, seventy faces of the Torah. And its full name equals 130 — exactly סִינַי, Sinai. Before you read another word, sit with the question this letter fixes on you: does the eye receive, or give? Is seeing drinking from the world — or making it flow?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "עַיִן significa 'ojo' — y esa acepción está en todo el Tanaj. Pero la misma palabra, con las mismas letras, significa 'manantial': en Génesis 16:7 el ángel encuentra a Hagar עַל עֵין הַמַּיִם, 'junto al manantial de agua', y el versículo remata עַל הָעַיִן, 'junto al ayin'. No es un juego nuestro: es polisemia bíblica real, las dos acepciones conviven en la Escritura. Y hay una tercera, menos conocida: 'color' o 'apariencia' — del man se dice וְעֵינוֹ כְּעֵין הַבְּדֹלַח, 'su ayin era como el ayin del bedelio' (Números 11:7). Ginsburgh añade la cuarta, aramea: 'oveja' — el rebaño que mira a su pastor, el pastor que vela por su rebaño.\n\nOjo, manantial, color. El drash clásico une las dos primeras: el ojo es un manantial. Lo que ves te brota; el que mira bien, da. Los Sabios lo dijeron con toda seriedad ética: cuando los niños entraron a la casa de estudio y leyeron el alfabeto, dijeron ס״ע — סְמוֹךְ עֲנִיִּים, 'sostén a los pobres' (Shabat 104a): la sámej y la ayin juntas se leen como un mandato, y la ayin ahí son los aniyim, los pobres. (Otra versión del mismo folio: סִימָנִין עֲשֵׂה בַּתּוֹרָה — 'haz señales en la Torá y adquiérela'.) Y Pirkei Avot 2:9 pone el ojo en el centro del mapa moral: R. Eliezer enseña que el camino recto al que el hombre debe adherirse es עַיִן טוֹבָה, el buen ojo — y el camino del que debe alejarse, עַיִן רָעָה, el mal ojo. El ojo no es un instrumento neutro: es un carácter.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Ayin es la visión física, el espectro de los colores, y la fuente que mana — los tres sentidos de su nombre desplegados en la creación (Ginsburgh). Piensa en la escena de Génesis 16:7: un desierto, una mujer sola, y un punto donde la tierra se abre y da agua. El ayin es eso en el mundo: el lugar exacto donde lo oculto sale a la superficie. Todo manantial es un ojo de la tierra; todo ojo, un manantial del alma.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Ayin es el ojo con que eliges mirar. La Torá bendice a Israel como עֵין יַעֲקֹב, 'el ojo de Yaakov' (Deuteronomio 33:28) — el ojo que, según lo lee Ginsburgh, mira solo hacia la bendición, el bien y la vida. Y Avot 2:9 te da la disyuntiva sin adornos: ayin tová o ayin raá, buen ojo o mal ojo — el mismo órgano, dos caminos. La pregunta del alma-ayin no es '¿qué hay ahí afuera?', sino '¿con qué ojo lo estoy mirando?'. Porque lo que miras con buen ojo, lo riegas; el buen ojo es manantial.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Ayin es la הַשְׁגָּחָה — la Providencia, el Ojo de Dios sobre el mundo. La Torá lo dice de la tierra de Israel: 'los ojos de Hashem tu Dios están sobre ella, desde el principio del año hasta el fin del año' (Deuteronomio 11:12) — el versículo con que Ginsburgh abre su estudio de la letra. Y los Salmos guardan un matiz que la Cabalá lee con lupa: 'el Ojo de Hashem sobre los que le temen' (33:18) — singular; 'los Ojos de Hashem sobre los justos' (34:16) — plural. Un ojo y dos ojos: la mirada de rigor que sostiene al que teme, y la mirada completa — bondad y rigor juntos — que acompaña al justo. Ser visto así no es ser vigilado: es ser sostenido.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh describe la forma de la Ayin con precisión: 'una nun alargada con una vav (o zayin) engarzada' — el cuenco de la nun recibe la bendición que baja por la vav. Míralo en el trazo: un brazo derecho que desciende recto (la vav) y cae dentro de un cuenco abierto (la nun extendida). La letra es, en su propio dibujo, 'un pobre que recibe sustento': el humilde que se deja llenar. No es casual que en Shabat 104a la ayin sean los aniyim, los pobres, y la sámej anterior el verbo sostener.\n\nY hay una segunda lectura de Ginsburgh, anatómica: los dos trazos superiores son 'los dos ojos y los nervios ópticos que entran al cerebro'. El ojo derecho mira hacia arriba, a la sámej que la precede — el círculo del Infinito que rodea; el ojo izquierdo mira hacia abajo, a la pe que la sigue — la boca. Fíjate en el orden del alfabeto: sámej, ayin, pe. Entre el sostén de arriba y la palabra de abajo está el ojo. Primero se es sostenido, luego se ve, y solo después se habla. El ojo precede a la boca — por eso la ayin (70) viene antes de la pe (80): quien habla antes de ver, habla de lo que no vio.",
    },
    partes: [
      {
        label: { es: "La vav engarzada (el brazo derecho)", en: "The enwedged vav (right arm)", fa: "واو راست" },
        significado: {
          es: "El trazo derecho que desciende: una vav — el canal por el que baja la bendición — engarzada dentro de la letra. En la lectura anatómica de Ginsburgh es el ojo derecho, el que mira hacia arriba: hacia la sámej, hacia el cielo, hacia la Luz que rodea. Es la mitad de la mirada que recuerda de dónde viene todo lo que tienes.",
        },
        svgPathId: "ayin-vav",
      },
      {
        label: { es: "La nun alargada (el cuenco)", en: "The elongated nun (the vessel)", fa: "نون کشیده" },
        significado: {
          es: "El trazo izquierdo que se dobla y se extiende por debajo: una nun alargada, el cuenco humilde que recibe lo que la vav vierte. Es el 'pobre que recibe sustento' de Ginsburgh — y es el ojo izquierdo, el que mira hacia abajo: hacia la pe, hacia la tierra, hacia el prójimo. La mitad de la mirada que se inclina para dar lo que recibió.",
        },
        svgPathId: "ayin-nun",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Ayin es la economía entera de la creación en dos trazos: algo baja (la vav) y algo lo recibe (la nun). Ginsburgh la lee como 'un pobre recibiendo sustento físico'. El ojo derecho mira al cielo y el izquierdo a la tierra: el mundo subsiste porque hay una mirada que une lo que desciende con quien lo necesita. La sámej sostiene (סְמוֹךְ), la ayin es el pobre sostenido (עֲנִיִּים) — el alfabeto mismo predica la tzedaká (Shabat 104a).",
    },
    almas: {
      es: "En el alma, la nun humilde de la Ayin es tu capacidad de recibir sin vergüenza — y de que lo recibido no se estanque. Ginsburgh enseña que la nun humilde 'hace descender la alegría' e integra en sí la voluntad de Dios. Tus dos ojos repiten el trazo: uno se alza hacia Dios, el otro mira con favor al que tienes al lado. La mirada completa necesita los dos; el que solo mira hacia arriba se olvida del pobre, el que solo mira hacia abajo se olvida de la Fuente.",
    },
    divinidad: {
      es: "En lo divino, Ginsburgh pone nombre propio a la nun humilde de la Ayin: Moshé — 'el hombre más humilde sobre la faz de la tierra' que integra en su consciencia los secretos más ocultos de la Torá. El ojo derecho contempla la Luz trascendente; el izquierdo, la Palabra de Dios. La humildad no es una virtud decorativa: es la forma exacta del recipiente. Solo el cuenco vacío — la nun alargada, el aní — puede recibir el manantial entero.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 70,
    guematriaForma: {
      es: "ע = 70 · nombre pleno עין = 70 + 10 + 50 = 130 = סִינַי (60 + 10 + 50 + 10 = 130) = 5 × 26 (הוי״ה = 26)",
    },
    mundos: {
      es: "70 es el número de la totalidad de los pueblos. Rashi lo ancla en la Torá misma: 'estableció los límites de los pueblos' según las setenta almas de Israel — שִׁבְעִים לָשׁוֹן, setenta lenguas (Rashi a Deuteronomio 32:8, sobre el conteo tradicional de las naciones de Génesis 10). Y el Talmud muestra a Israel sosteniéndolas: 'esos setenta toros [de Sucot], ¿por quién? Por las setenta naciones' (R. Elazar, Sucá 55b). Setenta años, dice el salmo, son los días de una vida (Salmos 90:10). Setenta es el mundo entero desplegado — nada humano queda fuera del ojo.",
    },
    almas: {
      es: "70 es el número del alma colectiva de Israel. Setenta almas bajaron a Egipto (Génesis 46:27; Éxodo 1:5) — espejo exacto de las setenta naciones, dice Rashi. Setenta ancianos reunió Moshé por orden divina (Números 11:16), y de ahí el Sanedrín: 'setenta y uno — setenta hombres, y Moshé sobre ellos' (Mishná Sanhedrín 1:6). Y setenta años vivió David: coronado a los 30, reinó 40 (II Samuel 5:4). El midrash cuenta que esos años fueron un regalo: Adam vio que David no tenía vida propia y dijo 'tomé de mis años setenta y los añadí a sus días' (Pirkei DeRabí Eliezer 19, con Salmos 61:7). Tu vida entera puede ser el ayin de otro: un manantial prestado que otro hizo brotar para ti.",
    },
    divinidad: {
      es: "70 son las caras de la Torá — y el midrash lo dice con una gematría interna: 'como el vino (יין) suma setenta (10+10+50), setenta caras tiene la Torá' (Bamidbar Rabá 13:16). La Torá es vino: cuanto más la miras, más rostros te da. Y el nombre pleno de la letra sella el misterio: עין = 130 = סִינַי. El ojo ES Sinaí — y 130 = 5 × 26, cinco veces el Nombre הוי״ה: Ginsburgh enseña que el ojo porta cinco poderes divinos (cinco bondades en el derecho, cinco rigores en el izquierdo). En el Sinaí ocurrió lo imposible para el ojo: 'y todo el pueblo VEÍA las voces' (Éxodo 20:15). Donde la Torá se entrega, se ve lo que solo se oye.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "El ojo y el manantial: una sola palabra" },
        fuente: {
          es: "Génesis 16:7 — 'וַיִּמְצָאָהּ מַלְאַךְ ה' עַל עֵין הַמַּיִם בַּמִּדְבָּר עַל הָעַיִן': el ángel encuentra a Hagar junto al manantial — ayin, dos veces en el versículo. La misma palabra que nombra el ojo (en todo el Tanaj) y el color (Números 11:7: וְעֵינוֹ כְּעֵין הַבְּדֹלַח). Polisemia bíblica real, no drash.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Los ojos de Dios, de principio a fin del año" },
        fuente: {
          es: "Deuteronomio 11:12 — 'עֵינֵי ה' אֱלֹהֶיךָ בָּהּ מֵרֵשִׁית הַשָּׁנָה וְעַד אַחֲרִית שָׁנָה': la tierra que Dios mira siempre. Cf. Salmos 33:18 (עֵין, singular — sobre los que le temen) y 34:16 (עֵינֵי, plural — sobre los justos): la Providencia tiene un ojo y dos ojos.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Sámej-Ayin: sostén a los pobres" },
        fuente: {
          es: "Shabat 104a — los niños en la casa de estudio leyeron el alfabeto como Torá: 'ס״ע — סְמוֹךְ עֲנִיִּים' ('sostén a los pobres'); otra versión: 'סִימָנִין עֲשֵׂה בַּתּוֹרָה וּקְנֵה אוֹתָהּ' ('haz señales en la Torá y adquiérela'). La ayin del alfabeto son los aniyim: la letra del ojo es la letra del pobre que hay que mirar.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Setenta toros por setenta naciones" },
        fuente: {
          es: "Sucá 55b — R. Elazar: 'הָנֵי שִׁבְעִים פָּרִים כְּנֶגֶד מִי — כְּנֶגֶד שִׁבְעִים אוּמּוֹת': los setenta toros de Sucot se ofrecían por las setenta naciones del mundo; el toro único [de Sheminí Atzéret], por la nación única. Israel sacrificaba por los pueblos que ni lo sabían.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Setenta ancianos — y Moshé sobre ellos" },
        fuente: {
          es: "Mishná Sanhedrín 1:6 — 'סַנְהֶדְרֵי גְדוֹלָה הָיְתָה שֶׁל שִׁבְעִים וְאֶחָד': el Gran Sanedrín era de 71, por Números 11:16 ('reúneme setenta hombres de los ancianos de Israel') más Moshé sobre ellos; R. Yehudá dice: setenta. El setenta juzga; el uno lo corona.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "Setenta caras tiene la Torá — como el vino" },
        fuente: {
          es: "Bamidbar Rabá 13:16 — 'כְּשֵׁם שֶׁיַּיִן חֶשְׁבּוֹנוֹ שִׁבְעִים, כָּךְ יֵשׁ שִׁבְעִים פָּנִים בַּתּוֹרָה': como el vino (יין = 10+10+50 = 70) suma setenta, setenta caras tiene la Torá. (En la división de Sefaria la frase está en 13:16, no en el 13:15 que suele citarse.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Los setenta años que Adam regaló a David" },
        fuente: {
          es: "Pirkei DeRabí Eliezer 19 — Adam vio a 'David hijo de Ishai gobernando en el futuro' y dijo: 'וְלָקַחְתִּי מִשְּׁנוֹתַי שִׁבְעִים שָׁנָה וְהוֹסַפְתִּי עַל יָמָיו' — 'tomé de mis años setenta y los añadí a sus días', con Salmos 61:7. Y David vivió exactamente 70: coronado a los 30, reinó 40 (II Samuel 5:4). (La versión atribuida al Zohar I:91b no se pudo verificar; esta sí, palabra por palabra.)",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Ayin: el enojo, Capricornio, el mes de Tevet" },
        fuente: {
          es: "Sefer Yetzirá 5 — Ayin es una de las doce letras SIMPLES (ed. impresa 5:2: ה״ו ז״ח ט״י ל״נ ס״ע צ״ק). La recensión del Gra asigna: 'הִמְלִיךְ אוֹת ע' בְּרֹגֶז' — entronizó la ayin en el enojo, y formó con ella Capricornio (גדי) en el mundo, Tevet en el año y el hígado (כבד) en el alma. (La asignación por letra es de la recensión del Gra; se declara.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El ojo es Sinaí: 130 = 130" },
        fuente: {
          es: "Gematría calculada: עין = 70+10+50 = 130; סיני = 60+10+50+10 = 130. Y en el Sinaí, 'todo el pueblo VEÍA las voces' (Éxodo 20:15): el nombre del ojo y el nombre del monte donde se vio lo audible pesan lo mismo. (Las fuentes son exactas; el puente entre ellas es drash nuestro.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Cinco bondades, cinco rigores: 130 = 5 × 26" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/hebleter/ayin.htm) — el nombre pleno de la ayin, 130, es cinco veces 26, el valor de הוי״ה: el ojo posee cinco poderes divinos; el derecho porta cinco bondades (jasadim) y el izquierdo cinco rigores (guevurot). Por eso 'el Ojo' en singular (Salmos 33:18) es la mirada de rigor que construye Maljut, y 'los Ojos' en plural (34:16), la mirada completa sobre los justos.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "Hashgajá pratit: el Ojo que todo lo acompaña" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/hebleter/ayin.htm) — la ayin es la Providencia particular, 'la enseñanza más fundamental e inclusiva del Baal Shem Tov', vivida en sus tres etapas: sometimiento (saber que cada acto mínimo es visto), separación (sentir los Ojos que guardan con amor y elegir el bien) y endulzamiento (ver el Ojo Infinito llevando cada criatura a su propósito — 'todo es derecha'). Ser visto por Dios no es la amenaza: es el consuelo.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Génesis 16:7 — עֵין הַמַּיִם / הָעַיִן: 'ayin' = manantial, dos veces en el versículo de Hagar." },
    { es: "Números 11:7 — וְעֵינוֹ כְּעֵין הַבְּדֹלַח: 'ayin' = color/apariencia (el man)." },
    { es: "Deuteronomio 11:12 — עֵינֵי ה' אֱלֹהֶיךָ בָּהּ: los ojos de Dios sobre la tierra, de principio a fin del año." },
    { es: "Deuteronomio 33:28 — עֵין יַעֲקֹב, el ojo de Yaakov." },
    { es: "Salmos 33:18 y 34:16 — el Ojo (singular) sobre los que temen; los Ojos (plural) sobre los justos." },
    { es: "Salmos 90:10 — 'los días de nuestros años: setenta años'." },
    { es: "Éxodo 20:15 — וְכָל הָעָם רֹאִים אֶת הַקּוֹלֹת: en el Sinaí vieron las voces." },
    { es: "Shabat 104a — ס״ע: סְמוֹךְ עֲנִיִּים ('sostén a los pobres'); otra versión: סִימָנִין עֲשֵׂה בַּתּוֹרָה וּקְנֵה אוֹתָהּ." },
    { es: "Sucá 55b — R. Elazar: setenta toros de Sucot por las setenta naciones." },
    { es: "Mishná Sanhedrín 1:6 — Sanedrín de 71: setenta ancianos (Números 11:16) y Moshé sobre ellos; R. Yehudá: setenta." },
    { es: "Pirkei Avot 2:9 — R. Eliezer: עַיִן טוֹבָה, el camino recto; עַיִן רָעָה, el camino a evitar." },
    { es: "Números 11:16 — los setenta ancianos; Génesis 46:27 y Éxodo 1:5 — las setenta almas que bajaron a Egipto." },
    { es: "II Samuel 5:4 — David: rey a los 30, reinó 40 — vivió 70 años." },
    { es: "Rashi a Deuteronomio 32:8 — setenta almas frente a שִׁבְעִים לָשׁוֹן, setenta naciones/lenguas (ancla del conteo tradicional de Génesis 10)." },
    { es: "Bamidbar Rabá 13:16 — 'como el vino (יין = 70) suma setenta, setenta caras (שִׁבְעִים פָּנִים) tiene la Torá'. Nota de precisión: en Sefaria la frase está en 13:16, no en 13:15." },
    { es: "Pirkei DeRabí Eliezer 19 — Adam regala setenta de sus años a David (con Salmos 61:7). La atribución paralela al Zohar I:91b NO se verificó y por eso no se cita como fuente." },
    { es: "Sefer Yetzirá 5 — Ayin, letra simple (ed. impresa 5:2); recensión del Gra: enojo (רֹגֶז) · Capricornio (גדי) · Tevet · hígado (כבד). Las recensiones difieren y se declara cuál se usa." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' — 'Ayin: Divine Providence' (inner.org/hebleter/ayin.htm y la tabla inner.org/alefbeit/sigayin.htm): nun alargada + vav engarzada, los dos ojos y los nervios ópticos, 130 = 5 × 26, las tres etapas del Baal Shem Tov." },
    { es: "Gematrías calculadas: ע = 70 · עין = 70+10+50 = 130 · סיני = 60+10+50+10 = 130 · 130 = 5×26 (הוי״ה = 26) · יין = 10+10+50 = 70." },
    { es: "Nota de precisión: el vínculo ojo↔manantial↔color NO es drash — son acepciones bíblicas documentadas de la misma palabra. Sí son drash: el puente עין=סיני con Éxodo 20:15, y la lectura sámej→ayin→pe como secuencia sostén→ojo→boca." },
  ],
};
