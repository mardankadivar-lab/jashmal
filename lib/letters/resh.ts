import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  RESH (ר) — Data de la vigésima letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Daniel 2:32 — רֵאשֵׁהּ ("su cabeza", arameo): el nombre רֵישׁ ES la palabra
//     aramea para "cabeza", cognado del hebreo רֹאשׁ.
//   · Génesis 1:1 — בְּרֵאשִׁית: la Torá abre con reshit (principio), raíz ר-א-שׁ.
//   · Éxodo 30:23 / Salmos 24:7 — רֹאשׁ (cabeza / lo principal).
//   · Proverbios 28:6 (רָשׁ, pobre) y 10:4 (רָאשׁ, pobreza) — rash es bíblico.
//   · Shabat 104a — la serie del alfabeto de los dardekei: קוּ״ף קָדוֹשׁ · רֵי״שׁ
//     רָשָׁע; la ק vuelve el rostro de la ר ("no puedo mirar al malvado") y le
//     tiende la corona ("si se arrepiente, le ato una corona como la mía").
//   · Deuteronomio 6:4 — Shemá: la ד de אֶחָד es rabati (grande, <big>); si se
//     redondea en ר, "אֶחָד" (Uno) se vuelve "אַחֵר" (otro/ajeno).
//   · Éxodo 34:14 — לְאֵל אַחֵ<big>ר</big>: la ר de אַחֵר es rabati (grande).
//   · Vayikrá Rabá 19:2 — el corazón del misterio: en el Shemá, si haces la ד una ר
//     destruyes el mundo (Uno→otro); en Éxodo 34:14, si haces la ר una ד lo
//     destruyes también (dios-ajeno→Uno). Mismo midrash: la yud que se quitó de
//     שָׂרַי (Saray) fue dada luego a Hoshea → יְהוֹשֻׁעַ (Números 13:16).
//   · Berajot 13b — quien prolonga "אֶחָד" alarga sus días; Rav Ajá bar Yaakov:
//     "y en la dálet" (hay que detenerse en la ד, no correr a la ר).
//   · Berajot 34b — R. Abahu: "en el lugar donde están los baalei teshuvá, los
//     tzadikim completos no están", de Isaías 57:19 שָׁלוֹם שָׁלוֹם לָרָחוֹק וְלַקָּרוֹב
//     — "el lejano, בְּרֵישָׁא (primero / a la cabeza)".
//   · Sefer Yetzirá 4 — Resh es letra DOBLE (בג״ד כפר״ת). Las recensiones difieren
//     (ver Cabalá). Ambas coinciden: día SEXTO del año, fosa nasal izquierda.
//  Gematrías (calculadas letra por letra):
//    ר = 200 · nombre pleno רי״שׁ = 200+10+300 = 510 = שִׁיר (canto) = שָׂרַי (Saray)
//    — los tres son anagramas de las mismas letras ר·י·ש. ראש (rosh) = 501;
//    רש (rash, pobre) = 500; רשע (rasha) = 570.
//
//  NOTA DEL SOFER — descartado por no verificable:
//   · La pista "רי״שׁ = 510 = שָׂרָה / יִצְחָק" es FALSA: שָׂרָה = 505 (no 510) e
//     יִצְחָק = 208. Lo correcto es שָׂרַי (Saray, con yud) = 510; al pasar a שָׂרָה
//     perdió la yud (510→505), y esa yud fue a Yehoshua (Vayikrá Rabá 19:2).
//   · A Rav Ginsburgh NO se le atribuye nada de memoria: sus tablas de letras
//     (inner.org/alefbeit/sig…, /alef-bet/… , /hebleter/…) dan 404 hoy y no
//     pudieron verificarse. La sección FORMA se ancla en la grafía objetiva, en
//     la halajá de sofrut (ד angular vs. ר redonda) y en Shabat 104a / Vayikrá
//     Rabá — no en el marco jasídico de Ginsburgh sin fuente viva.
//   · El nexo resh=cabeza / resh=pobre / resh=malvado es de letra y de drash, no
//     de una sola etimología: rosh/reshit vienen de ר-א-שׁ, rash de ר-ו-שׁ, rasha
//     de ר-שׁ-ע. Raíces distintas; se declara como tal.
// ─────────────────────────────────────────────────────────────────────────

export const resh: LetterData = {
  slug: "resh",
  letter: "ר",
  nameTranslit: { es: "Resh", en: "Resh", fa: "رِیش" },
  nameHe: "רֵישׁ",
  value: 200,

  level1: {
    es: "Su nombre significa 'cabeza'. Con ella empieza רֹאשׁ (rosh, cabeza) y רֵאשִׁית (reshit, principio) — la primera palabra de la Torá. Es la letra de lo más alto: la mente, el comienzo, lo principal. Y sin embargo con ella empieza también רָשׁ (rash, el pobre) y רָשָׁע (rasha, el malvado). La misma letra abre la palabra 'cabeza' y la palabra 'caído'. Peor todavía: mírala junto a la Dálet y casi no las distingues — una curva de más y אֶחָד (Uno, Dios) se convierte en אַחֵר (otro, extraño). Un solo trazo separa el Shemá de la idolatría. Antes de seguir, quédate con la pregunta de la Resh: ¿por qué la letra de la cabeza es la que está a un pelo de perderlo todo?",
    en: "Its name means 'head'. It begins רֹאשׁ (rosh, head) and רֵאשִׁית (reshit, beginning) — the Torah's very first word. It is the letter of the highest: the mind, the origin, the principal thing. And yet it also begins רָשׁ (rash, the poor one) and רָשָׁע (rasha, the wicked one). The same letter opens 'head' and 'fallen'. Worse: set it beside the Dalet and you can barely tell them apart — one extra curve and אֶחָד (One, God) becomes אַחֵר (another, a stranger). A single stroke separates the Shema from idolatry. Hold the Resh's question: why is the letter of the head the one a hair's breadth from losing everything?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "רֵישׁ es, literalmente, 'cabeza'. No en hebreo sino en arameo: רֵאשׁ / רֵישָׁא es la palabra aramea para cabeza, y así aparece en el Tanaj mismo — Daniel 2:32, 'רֵאשֵׁהּ דִּי דְהַב טָב', la cabeza de la estatua era de oro fino. La letra lleva por nombre la palabra 'cabeza', cognada del hebreo רֹאשׁ. De esa raíz brotan las palabras de lo alto: רֹאשׁ (rosh, cabeza, lo principal — Éxodo 30:23, 'especias רֹאשׁ', las mejores), רֵאשִׁית (reshit, principio) con la que se abre la creación: בְּרֵאשִׁית בָּרָא (Génesis 1:1), y רֹאשׁ הַשָּׁנָה, la cabeza del año.\n\nY aquí conviene la honestidad de siempre, porque la misma consonante abre también el lado oscuro. רָשׁ (rash) es 'pobre': 'טוֹב רָשׁ הוֹלֵךְ בְּתֻמּוֹ' (Proverbios 28:6, 'mejor el pobre que anda en su integridad'). רָשָׁע (rasha) es 'malvado'. La cabeza altiva y el hombre caído comparten inicio. ¿Es etimología? No: rosh y reshit vienen de la raíz ר-א-שׁ; rash (pobre) de ר-ו-שׁ; rasha de ר-שׁ-ע. Son raíces distintas. El vínculo es de letra y de drash — homilético, no filológico. Pero como drash dice la verdad más honda de la letra: la cabeza es lo que puede alzarse por encima de todo o hundirse por debajo de todo. El mismo órgano que corona es el que se enorgullece. La Resh es la altura, con su abismo cosido al lado.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Resh es el principio: רֵאשִׁית, la cabeza de todo lo creado. Con ella arranca la Torá y arranca el año. Todo lo que existe tiene una 'cabeza', un punto de partida del que lo demás desciende. Pero la letra advierte, en su propio nombre, que ser cabeza es la posición más peligrosa: la que puede guiar al cuerpo entero o extraviarlo. El comienzo decide el camino; por eso la letra del comienzo es también la del riesgo.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Resh es tu mente, tu 'yo' que preside. Y te pone frente a la elección más íntima: la cabeza puede ser רֹאשׁ —lo que dirige con sabiduría— o רָשָׁע —lo que se envanece y se pierde—. La distancia entre las dos es mínima, del ancho de un trazo. La Resh no te pregunta si tienes cabeza; te pregunta hacia dónde la inclinas. Y guarda una promesa: incluso el rasha, la cabeza caída, tiene abierta la puerta del regreso (Shabat 104a). Ninguna altura está tan alta que no pueda caer, ninguna caída tan baja que no pueda volver.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Resh toca la paradoja de la teshuvá. En el orden del alfabeto la Kuf (100 = קָדוֹשׁ, santo) precede a la Resh (200 = רָשָׁע, malvado), y los Sabios lo leyeron así: la Kuf vuelve su rostro de la Resh, porque 'no puedo mirar al malvado', dice el Santo — pero le tiende su corona (el tag de la kuf), 'porque si se arrepiente, le ato una corona como la Mía' (Shabat 104a). La letra del caído es la única a la que la letra de lo santo le ofrece su propia corona. En lo alto no hay rechazo definitivo: hay una corona esperando al que gira la cabeza de vuelta.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "La Resh son dos trazos: un techo horizontal y una pierna que baja del lado derecho — la figura de una cabeza inclinada, o de un cuello que sostiene una cabeza baja. Es casi idéntica a la Dálet, y esa casi-identidad es todo su misterio. La diferencia es de escriba (sofrut): la Dálet forma en su esquina trasera superior un ángulo recto, un 'talón' que sobresale hacia atrás; la Resh es redonda en esa esquina, sin el talón. Un copista que redondee de más la dálet, o que angule de más la resh, cambia el sentido del texto.\n\nDe ahí la advertencia más famosa del alfabeto, y no es exageración piadosa: en el Shemá (Deuteronomio 6:4), 'ה' אֱלֹהֵינוּ ה' אֶחָד' — 'el Eterno es Uno' —, la ד de אֶחָד se escribe grande (rabati) justamente para que nadie la confunda con ר, porque אֶחָד (Uno) escrito con resh se lee אַחֵר (otro, ajeno): el Uno se vuelve un dios extraño. Y al revés: en 'לֹא תִשְׁתַּחֲוֶה לְאֵל אַחֵר' (Éxodo 34:14, no te postres ante un dios ajeno), la ר de אַחֵר también se escribe grande, para que no se redondee en ד y el 'dios ajeno' se lea 'Uno'. El Midrash lo sella (Vayikrá Rabá 19:2): confundir esas dos letras 'destruye el mundo entero'. Toda la fe cabe entre una esquina redonda y una esquina cuadrada.",
    },
    partes: [
      {
        label: { es: "El techo (la cabeza)", en: "The roof (the head)", fa: "سقف (سر)" },
        significado: {
          es: "El trazo horizontal superior. Es la 'cabeza' que da nombre y forma a la letra: רֹאשׁ. Lo que preside, lo que va delante, lo principal. En él vive la altura de la Resh — y su tentación, porque la cabeza que se cree cabeza de nada se envanece. El techo es el reshit, el comienzo del que cuelga todo lo demás.",
        },
        svgPathId: "resh-roof",
      },
      {
        label: { es: "La pierna (el descenso)", en: "The leg (the descent)", fa: "پا (فرود)" },
        significado: {
          es: "La línea vertical que baja del extremo derecho del techo. Es la cabeza que se inclina hacia el mundo, el descenso desde el principio hacia lo concreto. Una cabeza sin descenso es solo idea; la pierna de la Resh la hace bajar, la compromete con la tierra. Lo que empieza arriba tiene que aterrizar.",
        },
        svgPathId: "resh-leg",
      },
      {
        label: { es: "La nuca curva (lo que la separa de la Dálet)", en: "The rounded corner (what parts it from the Dalet)", fa: "گوشه‌ی گرد" },
        significado: {
          es: "La esquina trasera, arriba a la derecha, donde el techo se une a la pierna. En la Resh es redonda, suave; en la Dálet, un ángulo recto con un talón que sobresale. Todo el misterio de la letra está en ese milímetro: es lo único que distingue אֶחָד (Uno) de אַחֵר (otro), el Shemá de la idolatría. La curva de la Resh es hermosa y es peligrosa: la frontera entre la fe y su falsificación tiene el grosor de un trazo.",
        },
        svgPathId: "resh-corner",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Resh enseña que las cosas más opuestas pueden parecerse casi del todo. El Uno y el dios ajeno se escriben casi igual; lo verdadero y lo falso se rozan. La creación no separa el bien y el mal con abismos, sino con trazos finos que exigen atención. Discernir —ver la curva que hace de esta letra una Resh y no una Dálet— es trabajo del que quiere vivir en la verdad.",
    },
    almas: {
      es: "En el alma, tú eres esa esquina que puede redondearse o angularse. La diferencia entre servir al Uno y perseguir a 'otro' rara vez es un abismo evidente; casi siempre es un pequeño desvío, una curva de más en un lugar sensible. La Resh te pide la atención del escriba: cuidar los trazos finos, porque en ellos —no en los grandes gestos— se decide si tu vida deletrea אֶחָד o אַחֵר.",
    },
    divinidad: {
      es: "En lo divino, la casi-identidad de Resh y Dálet esconde una misericordia: si el 'otro' (אַחֵר, con resh) y el 'Uno' (אֶחָד, con dálet) están a un solo trazo, entonces el regreso también está a un solo trazo. El que se extravió en lo ajeno no tiene que cruzar un océano para volver al Uno: le basta enderezar una esquina. La cercanía que hace peligrosa a la letra es la misma que hace posible la teshuvá.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 200,
    guematriaForma: {
      es: "ר = 200 · nombre pleno רי״שׁ = 200 + 10 + 300 = 510 = שִׁיר (canto) = שָׂרַי (Saray) — los tres, las mismas letras ר·י·ש reordenadas",
    },
    mundos: {
      es: "200 sigue a 100. La Kuf vale 100 y es קָדוֹשׁ (santo); la Resh vale 200 y es רָשָׁע (malvado), según los Sabios (Shabat 104a). El número dobla, y con él dobla el peligro: 200 es la cantidad grande, la multiplicación — y toda cabeza que se agranda corre el riesgo de agrandarse de más. La Resh es la altura numérica del alfabeto simple (la última letra antes de la Shin y la Tav), y por eso mismo la más expuesta a la caída.",
    },
    almas: {
      es: "El nombre pleno de la Resh, רי״שׁ, suma 510 — y aquí hay un canto escondido: 510 es también שִׁיר (shir, 'canto'). Las mismas tres letras que forman 'cabeza' forman 'canto': la mente que se ordena bien no razona nada más, canta. Pero 510 es igualmente שָׂרַי (Saray, 300+200+10), el primer nombre de la matriarca. Cuando Saray se volvió שָׂרָה (Sarah, 505), perdió una yud (510→505); y esa yud, dice el mismo Midrash de la dálet-resh (Vayikrá Rabá 19:2), fue dada después a Hoshea para hacerlo יְהוֹשֻׁעַ. La cabeza que suelta un poco de sí —una yud— no la pierde: la entrega para que otro pueda empezar.",
    },
    divinidad: {
      es: "El secreto del 200 se cierra en la teshuvá. R. Abahu enseñó: 'en el lugar donde están los baalei teshuvá (los que regresan), los tzadikim completos no están' (Berajot 34b), y lo prueba de Isaías 57:19 — 'שָׁלוֹם שָׁלוֹם לָרָחוֹק וְלַקָּרוֹב', paz al lejano y al cercano, nombrando 'al lejano בְּרֵישָׁא', primero, a la cabeza. Contémplalo: el que estaba más lejos —el rasha, la resh caída— es puesto בְּרֵישָׁא, 'a la cabeza', por delante del justo. La letra del malvado es, girada por el arrepentimiento, la letra de la cabeza. El caído que vuelve no regresa al último lugar: regresa al primero.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "בְּרֵאשִׁית: la Torá empieza con la Resh" },
        fuente: {
          es: "Génesis 1:1 — 'בְּרֵאשִׁית בָּרָא אֱלֹהִים': la creación se abre con רֵאשִׁית (principio), de raíz ר-א-שׁ. La letra de la cabeza es la del comienzo del mundo. (La Torá no empieza con Álef sino dentro de la palabra reshit; el bereshit lleva la bet grande, pero el principio que nombra es el de la resh.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El Shemá y la dálet grande: no vuelvas Uno en 'otro'" },
        fuente: {
          es: "Deuteronomio 6:4 — 'ה' אֱלֹהֵינוּ ה' אֶחָ<ד>': la ד de אֶחָד (Uno) se escribe rabati (grande) para que no se lea ר — porque אֶחָד con resh es אַחֵר, 'otro/ajeno'. Cf. Éxodo 34:14, 'לְאֵל אַחֵ<ר>', donde la ר de אַחֵר también es grande (que no se redondee en ד).",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "רֵישׁ = cabeza: el nombre de la letra en el Tanaj" },
        fuente: {
          es: "Daniel 2:32 — 'הוּא צַלְמָא רֵאשֵׁהּ דִּי דְהַב טָב': 'la cabeza (רֵאשׁ, arameo) de la estatua era de oro fino'. El nombre de la letra ES la palabra aramea para cabeza, cognado del hebreo רֹאשׁ (cf. Éxodo 30:23; Salmos 24:7).",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "רֵי״שׁ = רָשָׁע, y la corona de la teshuvá" },
        fuente: {
          es: "Shabat 104a — los niños en la casa de estudio: 'קוּ״ף קָדוֹשׁ, רֵי״שׁ רָשָׁע' (Kuf: santo; Resh: malvado). '¿Por qué la Kuf vuelve el rostro de la Resh? Dijo el Santo: no puedo mirar al malvado. ¿Y por qué su corona (tag) se inclina hacia la Resh? — si se arrepiente, le ato una corona como la Mía.' La letra del caído es la única a la que lo santo ofrece su propia corona.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Detente en la Dálet de אֶחָד" },
        fuente: {
          es: "Berajot 13b — 'todo el que prolonga en אֶחָד, se le alargan sus días y años'. Rav Ajá bar Yaakov: 'וּבַדָּלֵית' — y ha de prolongar sobre la ד (la que corona a Dios sobre las cuatro direcciones); Rav Ashi: sin arrebatar la ח. Detenerse bien en la ד es lo que impide correr hacia la ר.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El lejano va a la cabeza (בְּרֵישָׁא)" },
        fuente: {
          es: "Berajot 34b — R. Abahu: 'en el lugar donde están los baalei teshuvá, los tzadikim completos no están', de Isaías 57:19 ('שָׁלוֹם שָׁלוֹם לָרָחוֹק וְלַקָּרוֹב'): la Escritura nombra 'לָרָחוֹק בְּרֵישָׁא' — al lejano primero, a la cabeza. La resh caída, al volver, es puesta רֵישָׁא, en la cabeza.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "Confundir Dálet y Resh destruye el mundo" },
        fuente: {
          es: "Vayikrá Rabá 19:2 — sobre el Shemá: 'si haces la ד una ר (אֶחָד→אַחֵר), destruyes el mundo entero'; y sobre Éxodo 34:14: 'si haces la ר una ד (אַחֵר→אֶחָד), destruyes el mundo entero'. El mismo pasaje: la yud quitada a שָׂרַי (Saray) fue dada a Hoshea para hacerlo יְהוֹשֻׁעַ (Números 13:16).",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Resh, letra DOBLE: paz y guerra (recensión del Gra)" },
        fuente: {
          es: "Sefer Yetzirá 4 (versión Gra) — la Resh es una de las siete letras dobles (בג״ד כפר״ת). Se le asigna שָׁלוֹם (paz) y su tmurá (opuesto) מִלְחָמָה (guerra); en el mundo, Shabtai (Saturno); en el año, el día sexto; en el alma, la fosa nasal izquierda ('הִמְלִיךְ אוֹת ר׳ בְּשָׁלוֹם... וְצָר בּוֹ שַׁבְּתַאי בָּעוֹלָם וְיוֹם שִׁשִּׁי בַּשָּׁנָה וְנָחִיר שְׂמֹאל בַּנֶּפֶשׁ').",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "La recensión impresa difiere: simiente y desolación" },
        fuente: {
          es: "Sefer Yetzirá 4 (versión impresa) — asigna a la Resh זֶרַע (simiente) y su tmurá שְׁמָמָה (desolación); en el mundo, Kojav (Mercurio); igual día sexto y fosa nasal izquierda. Honestidad: las recensiones difieren en atributo y planeta (Gra: paz/Saturno; impresa: simiente/Mercurio); coinciden en el día sexto y la fosa nasal izquierda.",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "רי״שׁ = 510 = שִׁיר = שָׂרַי" },
        fuente: {
          es: "Gematría calculada: רי״שׁ = 200+10+300 = 510; שִׁיר (canto) = 510; שָׂרַי (Saray) = 510 — anagramas de ר·י·ש. Nota: NO es שָׂרָה (=505) ni יִצְחָק (=208); Saray perdió su yud (510→505) al volverse Sarah, y esa yud pasó a Yehoshua (Vayikrá Rabá 19:2).",
        },
        href: "/mente-cosmica",
      },
    ],
    jasidut: [
      {
        titulo: { es: "El baal teshuvá: la cabeza caída que vuelve arriba" },
        fuente: {
          es: "Anclado en Shabat 104a (a la resh que se arrepiente 'le ato una corona como la Mía') y Berajot 34b (los baalei teshuvá superan a los tzadikim). Es la raíz textual de la enseñanza jasídica del regreso: el descenso del rasha no es su fin sino la condición de un ascenso mayor. La resh —única letra a la que lo santo tiende su corona— es la letra del que vuelve. (Se cita el anclaje clásico; no se atribuye a Ginsburgh por no haber fuente viva verificable.)",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Génesis 1:1 — בְּרֵאשִׁית: la creación abre con reshit (raíz ר-א-שׁ)." },
    { es: "Éxodo 30:23 (בְּשָׂמִים רֹאשׁ, especias 'cabeza'/las mejores) y Salmos 24:7 (רָאשֵׁיכֶם, cabezas) — rosh en el Tanaj." },
    { es: "Daniel 2:32 — רֵאשֵׁהּ (arameo, 'su cabeza'): el nombre רֵישׁ es la palabra aramea para cabeza." },
    { es: "Proverbios 28:6 (רָשׁ, pobre) y 10:4 (רָאשׁ, pobreza) — rash es bíblico." },
    { es: "Shabat 104a — קוּ״ף קָדוֹשׁ · רֵי״שׁ רָשָׁע; la kuf vuelve el rostro de la resh y le tiende la corona si se arrepiente." },
    { es: "Deuteronomio 6:4 — Shemá; la ד de אֶחָד es rabati (grande) para no confundirla con ר (אֶחָד→אַחֵר)." },
    { es: "Éxodo 34:14 — לְאֵל אַחֵר; la ר de אַחֵר es rabati (grande) para no confundirla con ד." },
    { es: "Vayikrá Rabá 19:2 — confundir ד/ר en el Shemá o en Éxodo 34:14 'destruye el mundo entero'; la yud de שָׂרַי dada a Yehoshua." },
    { es: "Berajot 13b — prolongar en אֶחָד alarga los días; Rav Ajá bar Yaakov: 'y en la dálet'." },
    { es: "Berajot 34b — R. Abahu: los baalei teshuvá superan a los tzadikim; de Isaías 57:19, 'לָרָחוֹק בְּרֵישָׁא' (el lejano, a la cabeza)." },
    { es: "Sefer Yetzirá 4 — Resh, letra doble (בג״ד כפר״ת). Gra: שָׁלוֹם/מִלְחָמָה, Saturno. Impresa: זֶרַע/שְׁמָמָה, Mercurio. Ambas: día sexto, fosa nasal izquierda." },
    { es: "Gematrías calculadas: ר = 200 · רי״שׁ = 510 = שִׁיר = שָׂרַי · ראש = 501 · רש = 500 · רשע = 570." },
    { es: "Nota de precisión: resh=cabeza (ר-א-שׁ), rash=pobre (ר-ו-שׁ) y rasha=malvado (ר-שׁ-ע) son raíces distintas; el vínculo es de letra y de drash, no una sola etimología." },
    { es: "Nota del Sofer: las tablas de letras de R. Ginsburgh (inner.org) dan 404 hoy; no se le atribuye nada sin fuente viva. La forma se ancla en la grafía y la halajá de sofrut (ד angular vs. ר redonda)." },
  ],
};
