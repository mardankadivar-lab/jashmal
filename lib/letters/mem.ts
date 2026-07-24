import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  MEM (מ) — Data de la decimotercera letra. Contenido erudito VERIFICADO
//  por el Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Sefer Yetzirá cap. 3 (ed. impresa en Sefaria) — la Mem es una de las
//     TRES MADRES (אמ״ש): 3:3 "אויר מים אש... וארץ נבראת ממים"; 3:7 "המליך
//     אות מ״ם במים... ארץ בעולם וקור בשנה ובטן בנפש".
//   · Shabat 104a — מ״ם פתוחה מ״ם סתומה: מאמר פתוח מאמר סתום; y Rav Jisdá:
//     מ״ם וסמ״ך שבלוחות בנס היו עומדין; y מנצפ״ך צופים אמרום.
//   · Sanedrín 94a — R. Tanjum / Bar Kapará en Tzipori: por qué la mem de
//     לםרבה (Isaías 9:6) está cerrada — Jizkiyahu, el Mashíaj y el canto.
//   · Isaías 9:6 — VERIFICADO en el texto masorético de Sefaria: el ketiv es
//     לם רבה (mem CERRADA en medio de palabra) y el qeré לְמַרְבֵּה.
//   · Génesis 7:12 · Éxodo 24:18 · Éxodo 34:28 · Números 14:33-34 — los 40.
//   · Eruvin 4b — ושיערו חכמים מי מקוה ארבעים סאה (40 seá del mikvé).
//   · Yevamot 69b — Rav Jisdá: עד ארבעים מיא בעלמא היא (el embrión, "mera
//     agua" hasta el día 40).
//   · Mishná Shabat 7:2 y Mishná Makot 3:10 (con Deut 25:3) — "cuarenta
//     menos uno": melajot y azotes.
//   · Bava Kama 17a — אין מים אלא תורה, citando Isaías 55:1.
//   · Proverbios 18:4 — נַחַל נֹבֵעַ מְקוֹר חָכְמָה.
//   · Éxodo 34:7 — נֹצֵר חֶסֶד לָאֲלָפִים: iniciales נ-ח-ל = נַחַל (arroyo).
//   · Shabat 55a — R. Janina: חותמו של הקב״ה אמת; Reish Lakish: la tav es
//     "el FINAL del sello". (Ahí NO se dice que la mem sea la central.)
//   · Yerushalmi Sanedrín 1:1 y Devarim Rabá 1:10 — AQUÍ sí está, explícito:
//     álef primera, מ״ם באמצעיתה (la mem EN EL CENTRO), tav última — "Yo soy
//     el primero y Yo soy el último" (Isaías 44:6).
//   · R. Yitzchak Ginsburgh, "The Hebrew Letters" (inner.org/hebleter/mem.htm,
//     VIVA, descargada y leída) — "Fountain of Wisdom": manantial de la
//     sabiduría, flujo de Kéter a Jojmá, 13 canales / 13 Atributos de
//     Misericordia, mem abierta = Torá revelada / mem cerrada = Torá oculta,
//     mem cerrada = la llegada del Mashíaj, la matriz (womb), atbash מ↔י.
//  Gematrías (calculadas letra por letra, script en la sesión):
//    מ = 40 · nombre pleno מם = 40+40 = 80 = יסוד (10+60+6+4)
//    מים = 40+10+40 = 90 = מלך (40+30+20) · אחד = 13 · אהבה = 13
//    הוי״ה = 26 = 2×13 · אמת = 1+40+400 = 441 = 21² · נחל = 50+8+30 = 88
//    La mem es la letra Nº 13 del alefato (א=1…ל=12, מ=13). Atbash: la 13ª
//    desde el inicio ↔ la 13ª desde el final (י, la 10ª) — מ↔י confirmado.
//
//  NOTA DEL SOFER — precisiones y descartes:
//  · La URL del encargo (inner.org/alefbeit/sigmem) está MUERTA (404); la
//    página oficial viva es inner.org/hebleter/mem.htm y todo lo atribuido a
//    Ginsburgh se verificó contra ella.
//  · "La mem es la letra central de אמת" NO se ancla en Shabat 55a (allí solo
//    está el sello y la tav como final); se ancla en Yerushalmi Sanedrín 1:1
//    (Reish Lakish) y Devarim Rabá 1:10 (R. Reuvén), ambos verificados.
//  · Descartada la idea "la mem se compone de kaf + vav": no pude anclarla a
//    fuente exacta (se atribuye al Arizal/AriZal sin folio); no se usa.
//  · מם = 80 = יסוד y מים = 90 = מלך son aritmética verificada; su LECTURA
//    (Yesod como canal del agua; el agua que baja como el rey que se abaja)
//    es drash nuestro y así se declara en el texto.
//  · Sefer Yetzirá citado por la numeración de la edición impresa (Sefaria,
//    cap. 3 = madres); en la recensión del Gra los mismos dichos llevan otra
//    numeración. Se declara en la fuente.
// ─────────────────────────────────────────────────────────────────────────

export const mem: LetterData = {
  slug: "mem",
  letter: "מ",
  nameTranslit: { es: "Mem", en: "Mem", fa: "مِم" },
  nameHe: "מֵם",
  value: 40,

  level1: {
    es: "Escribe la palabra 'agua' en hebreo: מַיִם. Empieza con una mem abierta y termina con una mem cerrada. La palabra misma te está enseñando la letra: el agua existe en dos estados — el manantial que fluye a la vista y el venero sellado bajo la tierra, que nadie ve y que lo alimenta todo. La Mem es la letra del agua, y es la única letra que la Biblia misma escribió una vez cerrada en medio de una palabra — justo en el versículo del Mashíaj (Isaías 9:6). Su número es cuarenta: los días del diluvio, los días de Moshé en el monte, los años del desierto, las medidas del mikvé. Antes de seguir, quédate con la pregunta de esta letra: ¿qué guarda el agua cuando se cierra?",
    en: "Write the word 'water' in Hebrew: מַיִם. It opens with an open mem and ends with a closed mem. The word itself is teaching you the letter: water exists in two states — the spring that flows in the open, and the sealed vein underground that no one sees and that feeds everything. The Mem is the letter of water, and it is the only letter the Bible itself once wrote closed in the middle of a word — precisely in the verse of the Mashiach (Isaiah 9:6). Its number is forty: the days of the flood, Moses' days on the mountain, the years in the desert, the measure of the mikveh. Before going on, hold this letter's question: what does water keep when it closes?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "מֵם lleva el agua en el nombre: מַיִם (mayim). Y el hebreo hace aquí algo que ningún alfabeto hace: la palabra 'agua' se escribe mem-yod-mem — ABRE con la mem abierta (מ) y CIERRA con la mem final cerrada (ם). El nombre de la letra contiene sus dos formas, como el agua contiene sus dos estados: la corriente visible y la fuente oculta.\n\nRav Ginsburgh titula su contemplación de la mem 'el manantial de la sabiduría' (Fountain of Wisdom), y la cuelga de un versículo exacto: נַחַל נֹבֵעַ מְקוֹר חָכְמָה — 'arroyo que fluye, fuente de sabiduría' (Proverbios 18:4). Como el agua de un manantial sube desde una fuente subterránea que nadie conoce y se revela sobre la tierra, así la sabiduría brota desde lo supraconsciente hacia la consciencia — en lenguaje de Cabalá: de Kéter a Jojmá. Y hay un sello escondido que sí se deja verificar letra por letra: en los Trece Atributos de Misericordia, las iniciales de נֹצֵר חֶסֶד לָאֲלָפִים ('guarda bondad para miles', Éxodo 34:7) forman נַחַל — 'arroyo'. El atributo que más lejos lleva la bondad lleva el arroyo escrito en sus iniciales.\n\nGinsburgh añade un segundo sentido al nombre: מוּם (mum), 'defecto' — el ocultamiento de la luz divina en los mundos inferiores, la naturaleza. La letra del agua carga también la palabra de la carencia. No es contradicción: es el mismo secreto de sus dos formas. Donde el agua fluye hay vida; donde la fuente se oculta, el mundo parece defectuoso — y la fuente sigue ahí, sellada, esperando.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Mem es el agua en su plenitud física: la que desciende siempre hacia el punto más bajo, la que une y adhiere las sustancias, aquella de la que depende toda vida — así lo despliega Ginsburgh en el plano de los mundos. Y el Sefer Yetzirá va más lejos: וְאֶרֶץ נִבְרְאָה מִמַּיִם — 'la tierra fue creada del agua' (Sefer Yetzirá 3:3). El suelo firme que pisas es agua consolidada. Hasta lo más sólido del mundo nació de lo que fluye.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Mem es el amor que fluye como agua. Ginsburgh lo dice en dos trazos: la raíz del alma está sin defecto (sin mum) — y el amor a Dios brota de ella 'fluyendo como agua'. Tu alma es un manantial: puede taparse con tierra, puede ensuciarse el cauce, pero la fuente subterránea no se contamina. La pregunta del alma-mem no es '¿tengo agua?' sino '¿qué está tapando el pozo?'. El Talmud da la medida de la limpieza: cuarenta seá — un mikvé — y el mikvé no es otra cosa que agua reunida en la que el cuerpo entero cabe (Eruvin 4b).",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), 'no hay agua sino Torá' — אֵין מַיִם אֶלָּא תּוֹרָה, enseña R. Yojanán en nombre de R. Shimón bar Yojái, citando 'Oh, todo sediento, vayan al agua' (Bava Kama 17a sobre Isaías 55:1). Y Ginsburgh lee las dos memes como las dos aguas de la Torá misma: la mem ABIERTA es su dimensión revelada — el texto, la ley, lo que se estudia a la vista — y la mem CERRADA es su dimensión oculta — el secreto, lo que solo se transmite de boca a oído. La misma Torá, los dos estados del agua. Quien solo conoce la corriente abierta no sabe aún de qué fuente está bebiendo.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "La descripción de Ginsburgh es geométricamente exacta: la mem abierta es 'un cuadrado con una pequeña abertura en su esquina inferior izquierda'; la mem final es 'un cuadrado completo'. Un estanque con salida y un estanque sellado. El Talmud oyó esta forma en la casa de estudio, de boca de niños: מ״ם פְּתוּחָה מ״ם סְתוּמָה — מַאֲמָר פָּתוּחַ מַאֲמָר סָתוּם, 'mem abierta, mem cerrada: dicho abierto, dicho sellado' (Shabat 104a). Hay cosas que Dios dice abiertamente y cosas que dice selladas.\n\nY en la misma página, Rav Jisdá revela el milagro de la mem cerrada: מ״ם וְסָמֶ״ךְ שֶׁבַּלּוּחוֹת בְּנֵס הָיוּ עוֹמְדִין — 'la mem [final] y la sámej de las Tablas se sostenían por milagro' (Shabat 104a). La escritura de las Tablas atravesaba la piedra de lado a lado; el centro de un cuadrado cerrado no tiene de dónde agarrarse — y sin embargo flotaba. Lo sellado no se sostiene por apoyos: se sostiene por milagro. Esa misma página registra que las formas finales, מנצפ״ך, 'las dijeron los vigías' (los profetas) — se habían olvidado y volvieron a fundarlas. Ginsburgh añade la imagen más íntima de la forma: la mem es la matriz (el vientre), el recinto de agua donde la vida se forma sin ser vista.",
    },
    partes: [
      {
        label: { es: "El recinto (techo, muro y base)", en: "The enclosure (roof, wall and base)", fa: "حصار" },
        significado: {
          es: "Los trazos que rodean: la cuenca que contiene el agua. Sin recinto no hay manantial — hay charco que se dispersa. Es la parte de la mem que aparece en sus dos formas por igual: abierta o cerrada, el agua siempre está contenida. Ginsburgh la lleva a su imagen más honda: la matriz, el vientre — el espacio cerrado donde lo vivo se teje en secreto (y el Sefer Yetzirá 3:7 asigna a la mem precisamente el vientre, בטן, en el alma).",
        },
        svgPathId: "mem-enclosure",
      },
      {
        label: { es: "La abertura (el manantial)", en: "The opening (the wellspring)", fa: "گشودگی" },
        significado: {
          es: "La pequeña abertura en la esquina inferior izquierda — lo único que distingue a la mem abierta de la cerrada, y lo cambia todo. Es la boca del manantial: por ahí el agua contenida sale al mundo, por ahí el dicho sellado se vuelve dicho abierto. Fíjate dónde está: abajo. La fuente no se abre por arriba, hacia el cielo que ya la conoce; se abre por abajo, hacia quien tiene sed. Cuando esta abertura se cierra, la mem no muere: se vuelve venero subterráneo — la mem final, el agua que sigue fluyendo donde nadie la ve.",
        },
        svgPathId: "mem-opening",
      },
    ],
    mundos: {
      es: "En los mundos, las dos formas de la mem son la corriente y el venero: 'la mem abierta, un arroyo que fluye; la mem final cerrada, una corriente subterránea' (Ginsburgh). Toda la hidrología del mundo está en esas dos figuras — y toda su economía de lo visible y lo invisible: los ríos que ves viven de napas que no ves. El mundo se sostiene sobre aguas selladas.",
    },
    almas: {
      es: "En el alma, Ginsburgh traza el mapa sin rodeos: la mem abierta es la consciencia de ti mismo; la mem cerrada, los estados inconscientes del ser — y el poder de engendrar. Lo que sabes de ti es el arroyo abierto; lo que no sabes de ti no está vacío: está sellado y fluye por debajo, y de ahí — no de tu superficie — nace lo nuevo. Como el embrión, que hasta el día cuarenta 'es mera agua' (עַד אַרְבָּעִים מַיָּא בְּעָלְמָא הִיא, Yevamot 69b): toda vida tuya empieza siendo agua cerrada en un recinto oscuro.",
    },
    divinidad: {
      es: "En lo divino, la mem cerrada guarda el secreto más audaz: Ginsburgh la señala como 'la llegada del Mashíaj' — y esta vez el drash tiene ancla masorética: en לםרבה (Isaías 9:6, el versículo del trono de David), la única mem cerrada en medio de palabra de todo el Tanaj. Y son las aguas de la teshuvá: el retorno no es un trámite, es volver a sumergirse en la fuente sellada de la que saliste. Lo que Dios más quiere dar todavía está escrito en forma cerrada.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 40,
    guematriaForma: {
      es: "מ = 40 · nombre pleno מם = 40 + 40 = 80 = יְסוֹד (10+60+6+4) · מַיִם (agua) = 40+10+40 = 90 = מֶלֶךְ (rey) — igualdades calculadas; su lectura es drash nuestro",
    },
    mundos: {
      es: "40 es el número de la transformación de los mundos por agua y por espera: 'y fue la lluvia sobre la tierra cuarenta días y cuarenta noches' (Génesis 7:12) — el mundo viejo disuelto en agua para que naciera otro; cuarenta seá, la medida mínima del mikvé, el agua que cambia el estado de quien se sumerge (Eruvin 4b); cuarenta años en el desierto, 'un día por cada año' de los espías (Números 14:33-34) — una generación entera disuelta y regenerada. Cuando la Torá quiere decir 'aquí termina un mundo y empieza otro', cuenta cuarenta.",
    },
    almas: {
      es: "40 es el número de la gestación del alma. El embrión es 'mera agua' hasta el día cuarenta (Yevamot 69b): la vida humana pasa sus primeros cuarenta días siendo mem pura. Moshé estuvo cuarenta días y cuarenta noches en el monte para recibir la Torá (Éxodo 24:18) — la Torá también tuvo su gestación. Y cuando el alma se tuerce, la medida vuelve en negativo y se detiene un paso antes: 'cuarenta menos uno' — los azotes (אַרְבָּעִים יַכֶּנּוּ, Deuteronomio 25:3, que los Sabios fijan en 39: Mishná Makot 3:10) y las categorías de trabajo de Shabat (אֲבוֹת מְלָאכוֹת אַרְבָּעִים חָסֵר אֶחָת, Mishná Shabat 7:2). La corrección llega hasta el umbral del cuarenta y no lo cruza: completar los cuarenta no le toca al castigo — le toca a la gestación.",
    },
    divinidad: {
      es: "40 es el número del retorno. Tras el becerro de oro, Moshé volvió a subir y estuvo otros cuarenta días y cuarenta noches sin pan y sin agua, y ahí recibió las segundas Tablas y los Trece Atributos de Misericordia (Éxodo 34:28; los Atributos, en 34:6-7). Ginsburgh cuenta los dos ciclos como teshuvá inferior y teshuvá superior: los primeros cuarenta gestaron la Torá; los segundos gestaron el perdón. Y el nombre pleno de la letra lo firma en silencio: מם = 80 = יְסוֹד — aritmética exacta; y como drash nuestro: Yesod es, en el Árbol, el canal por donde toda el agua de arriba baja a Maljut. La letra del agua lleva el nombre del acueducto.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "La mem cerrada en medio del versículo del Mashíaj" },
        fuente: {
          es: "Isaías 9:6 — לםרבה הַמִּשְׂרָה וּלְשָׁלוֹם אֵין קֵץ עַל כִּסֵּא דָוִד: verificado en el texto masorético, el ketiv es לם רבה (mem CERRADA en medio de palabra, única en el Tanaj) y el qeré לְמַרְבֵּה. El abundamiento del principado sobre el trono de David viene escrito con la fuente sellada.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Arroyo que fluye, fuente de sabiduría" },
        fuente: {
          es: "Proverbios 18:4 — מַיִם עֲמֻקִּים דִּבְרֵי פִי אִישׁ נַחַל נֹבֵעַ מְקוֹר חָכְמָה: 'aguas profundas son las palabras de la boca del hombre; arroyo que fluye, fuente de sabiduría'. El versículo-eje de la mem en Ginsburgh. Cf. Éxodo 34:7: las iniciales de נֹצֵר חֶסֶד לָאֲלָפִים forman נַחַל (arroyo) — verificado letra por letra.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Dicho abierto, dicho sellado — y el milagro de las Tablas" },
        fuente: {
          es: "Shabat 104a — los niños en la casa de estudio: מ״ם פְּתוּחָה מ״ם סְתוּמָה — מַאֲמָר פָּתוּחַ מַאֲמָר סָתוּם ('mem abierta, mem cerrada: dicho abierto, dicho sellado'). Y en la misma página, Rav Jisdá: מ״ם וְסָמֶ״ךְ שֶׁבַּלּוּחוֹת בְּנֵס הָיוּ עוֹמְדִין — el centro de la mem final de las Tablas flotaba por milagro; y מנצפ״ך צופים אמרום, las formas finales las restauraron los profetas.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "¿Por qué se cerró la mem de לםרבה?" },
        fuente: {
          es: "Sanedrín 94a — R. Tanjum: expuso Bar Kapará en Tzipori: '¿por qué toda mem en medio de palabra es abierta y esta es cerrada? Quiso el Santo, bendito sea, hacer a Jizkiyahu el Mashíaj y a Sanjeriv, Gog y Magog. Dijo la Medida de la Justicia: David, que dijo tantos cantos ante Ti, no lo hiciste Mashíaj; ¿Jizkiyahu, a quien hiciste todos estos milagros y no dijo canto ante Ti, lo harás Mashíaj? Por eso se cerró (לְכָךְ נִסְתַּתֵּם)'. Y enseguida la tierra misma abrió y cantó en su lugar (Isaías 24:16). La redención quedó sellada por un canto que faltó.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "No hay agua sino Torá" },
        fuente: {
          es: "Bava Kama 17a — R. Yojanán en nombre de R. Shimón bar Yojái: וְאֵין מַיִם אֶלָּא תּוֹרָה, שֶׁנֶּאֱמַר: הוֹי כׇּל צָמֵא לְכוּ לַמַּיִם — 'no hay agua sino Torá, como está dicho: Oh, todo sediento, vayan al agua' (Isaías 55:1).",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "La mem, letra central del sello de Dios" },
        fuente: {
          es: "Devarim Rabá 1:10 — R. Reuvén: '¿cuál es el sello del Santo, bendito sea? אֱמֶת (verdad). ¿Y por qué emet? Tiene tres letras: álef, primera de las letras; mem, la central; tav, la última — para decir: Yo soy el primero y Yo soy el último' (Isaías 44:6). Igual en Yerushalmi Sanedrín 1:1 (Reish Lakish: מ״ם בְּאֶמְצָעִיתָהּ). El Bavli (Shabat 55a) trae el sello — חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא אֱמֶת — sin el detalle de la mem central.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Mem, madre del agua: tierra, frío y vientre" },
        fuente: {
          es: "Sefer Yetzirá cap. 3 (ed. impresa; en la recensión del Gra la numeración varía) — la Mem es una de las tres MADRES, אמ״ש: álef-aire, mem-agua, shin-fuego (3:3: 'los cielos fueron creados del fuego, la tierra fue creada del agua, y el aire media entre ambos'). Y 3:7: הִמְלִיךְ אוֹת מ״ם בַּמַּיִם... 'hizo reinar a la mem sobre el agua y le ató una corona, y selló con ella: la tierra en el mundo, el frío en el año y el vientre (בטן) en el alma'.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El nombre de la Mem suma Yesod: 80 = 80" },
        fuente: {
          es: "Gematría calculada: מם = 40+40 = 80; יסוד = 10+60+6+4 = 80. Y מים (agua) = 90 = מלך (rey). Las igualdades son aritmética verificada; la lectura — Yesod como el canal por donde el agua de las sefirot baja a Maljut, y el agua que siempre desciende como el rey que se abaja hacia su pueblo — es drash nuestro, y así se declara.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "El manantial de la sabiduría y los trece canales" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/hebleter/mem.htm) — la mem es el manantial de la sabiduría divina: el flujo de Kéter a Jojmá, 'aguas que no tienen fin'. Trece canales bajan de lo supraconsciente a la consciencia — los Trece Atributos de Misericordia y las trece reglas de exégesis. La mem es la letra 13; אֶחָד (uno) = 13 y אַהֲבָה (amor) = 13, y el Nombre הוי״ה = 26 = 2×13: la unión de 'uno' y 'amor'. En atbash, מ se transforma en י: del manantial, la gota — el punto de la sabiduría revelada.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Sefer Yetzirá cap. 3 (numeración de la edición impresa en Sefaria; la recensión del Gra numera distinto) — las tres madres אמ״ש: 3:3 (tierra creada del agua) y 3:7 (mem reina sobre el agua: tierra · frío · vientre)." },
    { es: "Shabat 104a — מ״ם פתוחה מ״ם סתומה: מאמר פתוח מאמר סתום; Rav Jisdá: מ״ם וסמ״ך שבלוחות בנס היו עומדין; מנצפ״ך צופים אמרום." },
    { es: "Sanedrín 94a — Bar Kapará: por qué la mem de לםרבה se cerró (Jizkiyahu, el canto que faltó y el Mashíaj); la tierra canta en su lugar." },
    { es: "Isaías 9:6 — ketiv לם רבה (mem cerrada en medio de palabra, verificado en el texto masorético de Sefaria) / qeré לְמַרְבֵּה." },
    { es: "Génesis 7:12 — cuarenta días y cuarenta noches de lluvia." },
    { es: "Éxodo 24:18 y 34:28 — los dos ciclos de cuarenta días de Moshé en el monte; Éxodo 34:6-7 — los Trece Atributos; iniciales de נֹצֵר חֶסֶד לָאֲלָפִים = נַחַל." },
    { es: "Números 14:33-34 — cuarenta años en el desierto, 'un día por cada año'." },
    { es: "Eruvin 4b — ושיערו חכמים מי מקוה ארבעים סאה: las cuarenta seá del mikvé." },
    { es: "Yevamot 69b — Rav Jisdá: עד ארבעים מיא בעלמא היא, el embrión es 'mera agua' hasta el día cuarenta." },
    { es: "Mishná Shabat 7:2 — אבות מלאכות ארבעים חסר אחת; Mishná Makot 3:10 con Deuteronomio 25:3 — los azotes, 'cuarenta menos uno'." },
    { es: "Bava Kama 17a — אין מים אלא תורה, citando Isaías 55:1." },
    { es: "Proverbios 18:4 — נַחַל נֹבֵעַ מְקוֹר חָכְמָה, el versículo-eje de la mem en Ginsburgh." },
    { es: "Shabat 55a — R. Janina: חותמו של הקב״ה אמת; Reish Lakish: la tav como final del sello. Nota de precisión: allí NO se dice que la mem sea la letra central." },
    { es: "Yerushalmi Sanedrín 1:1 (Reish Lakish) y Devarim Rabá 1:10 (R. Reuvén) — álef primera, mem central, tav última del sello אמת, con Isaías 44:6." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' (inner.org/hebleter/mem.htm) — manantial de la sabiduría; 13 canales/Atributos; mem abierta/cerrada = Torá revelada/oculta, consciencia/inconsciente, arroyo/venero; mem cerrada = llegada del Mashíaj; la matriz; מוּם (defecto); atbash מ↔י." },
    { es: "Gematrías calculadas: מ = 40 · מם = 80 = יסוד · מים = 90 = מלך · אחד = אהבה = 13 · הוי״ה = 26 = 2×13 · אמת = 441 = 21². Las igualdades מם=יסוד y מים=מלך se presentan como aritmética; su interpretación se declara drash nuestro." },
    { es: "Nota de precisión: la composición 'mem = kaf + vav' (atribuida al Arizal) se DESCARTÓ por no poder anclarse a fuente exacta." },
  ],
};
