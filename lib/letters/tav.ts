import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  TAV (ת) — Data de la vigésima segunda y ÚLTIMA letra. Contenido erudito
//  VERIFICADO por el Sofer (editor-erudito) contra Sefaria e inner.org.
//  Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Ezequiel 9:4 y 9:6 — 'וְהִתְוִיתָ תָּו עַל מִצְחוֹת הָאֲנָשִׁים': la marca (tav) en
//     la frente de los que gimen; a quien tiene la marca, no lo toquen (9:6).
//   · I Samuel 21:14 — David 'וַיְתָו עַל דַּלְתוֹת הַשַּׁעַר', hizo marcas (raíz de tav)
//     sobre las PUERTAS (דלתות, dalet) del portón, fingiendo locura.
//   · Job 31:35 — 'הֶן תָּוִי', 'he aquí mi marca/firma': Job exige su alegato firmado.
//   · Shabat 55a — Gabriel marca en la frente de los justos una tav de TINTA (דיו) y
//     en la de los malvados una tav de SANGRE (דם). '¿Por qué la tav?' Rav: תָּיו-תִּחְיֶה /
//     תָּיו-תָּמוּת. Reish Lakish: תָּיו — סוֹף חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא; y R. Janiná:
//     חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא אֱמֶת. También: 'מֵאָלֶף וְעַד תָּיו' (toda la Torá).
//   · Shabat 104a — el midrash del alfabeto de los niños: 'תָּי"ו — אֱמֶת'. Las letras de
//     אמת están lejos entre sí (comienzo·medio·fin del alfabeto) y se paran sobre base
//     ancha 'como ladrillos' (קוּשְׁטָא קָאֵי, la verdad se sostiene); las de שקר, juntas y
//     sobre un solo pie (שִׁיקְרָא לָא קָאֵי, la mentira no se sostiene).
//   · Bereshit Rabá 8:5 — al crear al hombre, la Verdad (אמת) dijo 'que no sea creado,
//     pues es todo mentira'; Dios la arrojó a la tierra (Daniel 8:12), y 'אֱמֶת מֵאֶרֶץ
//     תִּצְמָח' (Salmos 85:12, la verdad brota de la tierra).
//   · Sefer Yetzirá 4 — Tav es letra DOBLE (בג"ד כפר"ת). Recensión impresa 4:11: luna ·
//     Shabat · boca (pareja: מֶמְשָׁלָה/עַבְדוּת, dominio/servidumbre). Recensión del Gra
//     4:14: Tzédek (Júpiter) · Shabat · boca (pareja: חֵן/כִּיעוּר, gracia/fealdad).
//     Coinciden en Shabat + boca; difieren en el planeta y la pareja. Declarado.
//   · Génesis 15:13 (400 años de exilio) · 23:15 (400 shékel de Efrón) · 32:7 y 33:1
//     (Esav con 400 hombres) — los 400 (=ת) de la Torá.
//   · R. Y. Ginsburgh, tabla oficial inner.org/alefbeit/sigtav: Concepto = la impresión
//     que la fe en la omnipresencia divina deja en la supraconsciencia; Forma = una
//     dalet imprimiéndose sobre la corona de una nun; Espacio = Júpiter; Tiempo = Shabat;
//     Alma = boca; Don = gracia (jen); Arquetipo = David; Canal = de yesod a maljut.
//
//  Gematrías (calculadas letra por letra):
//    ת = 400 · nombre תָּו = 400+6 = 406 · (grafía talmúdica תָּיו = 400+10+6 = 416)
//    אמת = 1+40+400 = 441 = 21² · אהיה = 1+5+10+5 = 21 (⇒ emet = Ehyé al cuadrado)
//    שקר = 300+100+200 = 600 (contraste de Shabat 104a)
//
//  NOTA DEL SOFER — precisiones y descartes:
//   1) La pista de encargo atribuía a Rav 'la tav es el sello final, emet'. VERIFICADO en
//      Shabat 55a: Rav dice תחיה/תמות; quien dice 'tav = FIN del sello del Santo' es Reish
//      Lakish, y 'el sello es emet' es R. Janiná. Se atribuye a cada uno lo suyo.
//   2) Menajot 29b: revisado — trata la HE y la YOD ('este mundo se creó con he, el venidero
//      con yod'), NO la tav. No se usa.
//   3) La 'contienda de las letras' donde la tav es rechazada para crear el mundo (tradición
//      del Zohar, Hakdamat Bereshit, Zohar I:2b-3a) es real, pero no pude anclar un folio
//      citable limpio vía Sefaria; siguiendo el precedente de Zayin con el Zohar, NO se cita.
//   4) Grafía del nombre: se usa תָּו (moderno, =406); el Talmud lo escribe תָּיו (=416).
// ─────────────────────────────────────────────────────────────────────────

export const tav: LetterData = {
  slug: "tav",
  letter: "ת",
  nameTranslit: { es: "Tav", en: "Tav", fa: "تاو" },
  nameHe: "תָּו",
  value: 400,

  level1: {
    es: "Llegaste al final. Veintidós letras, y esta es la última: la Tav. Su número es 400 — el más alto que puede llevar una sola letra. Su nombre significa 'marca', 'señal', 'sello'. Y es la letra con la que termina la palabra אֱמֶת (emet), verdad. Mírala parada: tiene dos pies. No se tambalea. Ahí guarda su secreto — el Talmud dice que las letras de 'verdad' se sostienen sobre base ancha, como ladrillos, porque la verdad perdura. Pero hay un misterio cosido a esta letra que no te suelta. En la visión de Ezequiel, Dios manda marcar una tav en la frente de cada persona: a los justos, una tav de tinta, para que vivan; a los malvados, una tav de sangre, para que mueran. La MISMA marca. La misma letra. Y Rav lo dijo en dos palabras: תָּיו — תִּחְיֶה, 'tav: vivirás'; תָּיו — תָּמוּת, 'tav: morirás'. Antes de leer una palabra más, quédate con esto: la misma señal decide vida en una frente y muerte en otra. ¿Qué hace la diferencia?",
    en: "You've reached the end. Twenty-two letters, and this is the last: the Tav. Its number is 400 — the highest a single letter can carry. Its name means 'mark,' 'sign,' 'seal.' And it is the letter that ends the word אֱמֶת (emet), truth. Look at it standing: it has two feet. It does not wobble — the Talmud says the letters of 'truth' stand on wide bases, like bricks, because truth endures. But a mystery is sewn into this letter. In Ezekiel's vision God orders a tav marked on every forehead: on the righteous, a tav of ink, that they live; on the wicked, a tav of blood, that they die. The same mark. The same letter. As Rav put it in two words: תָּיו — תִּחְיֶה, 'tav: you shall live'; תָּיו — תָּמוּת, 'tav: you shall die.' Before you read another word, hold this: the same sign decrees life on one forehead and death on another. What makes the difference?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "תָּו significa 'marca', 'señal', 'sello' — y esta vez la palabra SÍ está en el Tanaj, y con su verbo funcionando. En Ezequiel 9:4 Dios ordena: 'וְהִתְוִיתָ תָּו', 'y marcarás una tav' en la frente de los justos. Y hay un versículo que hace temblar de precisión: en I Samuel 21:14, David, fingiéndose loco ante el rey de Gat, 'וַיְתָו עַל דַּלְתוֹת הַשַּׁעַר' — hizo marcas (el verbo de la tav) sobre las PUERTAS (דלתות, de dalet) del portón. Guarda ese detalle, porque volverá: David, la tav, la dalet y las puertas van a encontrarse otra vez en la forma de la letra. En Job 31:35 aparece 'הֶן תָּוִי', 'he aquí mi marca' — Job exige que el Todopoderoso responda a su alegato FIRMADO. La tav es, entonces, la firma. El sello. La rúbrica al pie del documento.\n\nRav Ginsburgh recoge en su tabla los sentidos de la letra: 'una señal; una impresión; un código; y —en arameo— más' (inner.org/alefbeit/sigtav). Es la letra del sello, y por eso es la última: en un alfabeto, la última letra es la firma que cierra. Los Sabios lo dijeron sin rodeos — cumplir 'מֵאָלֶף וְעַד תָּיו', 'de álef a tav', es cumplir la Torá ENTERA (Shabat 55a). De álef a tav es nuestro 'de la A a la Z': todo, de principio a fin. No es casualidad que תּוֹרָה, תְּשׁוּבָה, תַּכְלִית ('propósito', 'meta') y תָּמִים ('íntegro') empiecen con tav; contémplalo como drash, no como etimología: la letra del final es la letra de aquello hacia lo que todo camina.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Tav es la impresión final sobre lo creado: el sello estampado en la cera cuando el documento está terminado. Todo lo que existe lleva una marca, la firma de su Hacedor. El mundo no es un borrador: es un documento sellado. Y fíjate en el orden del alfabeto — la creación empezó con la primera letra y CULMINA en la tav. El universo tiene una meta (תַּכְלִית), un punto hacia el que se dirige. La tav es ese punto: no el que empieza la obra, sino el que la firma como acabada.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Tav es la marca que llevas en la frente sin saberlo. En la visión de Ezequiel nadie elige su tav: el ángel pasa y la estampa según lo que la persona ES. Tinta o sangre, vida o muerte — la marca solo revela lo que ya escribiste con tu vida. Por eso los Sabios ligan la tav marcada a los que 'cumplieron la Torá de álef a tav': tu sello es la suma de tus días, de principio a fin. La pregunta del alma-tav no es '¿qué marca quiero?', sino '¿qué marca soy ya?'.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Tav es la última letra del sello de Dios. R. Janiná enseñó: 'חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא אֱמֶת', 'el sello del Santo, bendito sea, es Verdad' (Shabat 55a) — y אֱמֶת termina precisamente en tav. Reish Lakish, sobre la marca de Ezequiel, dijo que la tav es 'סוֹף חוֹתָמוֹ', el FIN del sello del Santo. Contémplalo: la firma de Dios sobre la realidad es 'verdad', y la última pincelada de esa firma es esta letra. Cuando Dios rubrica el mundo, la tinta se detiene en la tav.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh describe la forma de la Tav con una imagen exacta: 'una dalet imprimiéndose sobre la corona de una nun' (inner.org/alefbeit/sigtav). Míralo en el trazo: el lado derecho de la ת —el techo y la pierna que baja recta— es una dalet (ד); la pierna izquierda, con su pie que se curva y se apoya hacia adentro, es una nun (נ). La letra del sello está hecha de dos letras: la que estampa y la que recibe el estampado. La dalet (de דָּל, 'humilde', y דֶּלֶת, 'puerta') es el sello que presiona; la nun (de נֶאֱמָן, 'fiel', y también נוֹפֵל, 'el que se inclina, cae') es el alma fiel sobre la que la marca queda impresa. Aquí regresa lo de David: hizo marcas (tav) sobre las puertas (dalet); la forma de la letra guardaba ya ese gesto.\n\nPero hay algo más en el trazo, y es lo que sella todo el estudio: la Tav se para sobre DOS pies. No se balancea sobre un punto. El Talmud lo lee como teología (Shabat 104a): las letras de שֶׁקֶר (mentira: ש-ק-ר) se apoyan cada una sobre un solo pie, y por eso 'שִׁיקְרָא לָא קָאֵי', la mentira no se sostiene, se cae; en cambio las de אֱמֶת (verdad: א-מ-ת) se paran sobre base ancha, 'como ladrillos', y por eso 'קוּשְׁטָא קָאֵי', la verdad se sostiene, perdura. La tav, con sus dos pies firmes, es la letra que cierra la palabra 'verdad' — y la sostiene de pie.",
    },
    partes: [
      {
        label: { es: "La dalet (el sello que estampa)", en: "The dalet (the stamp)", fa: "دالت (مُهر)" },
        significado: {
          es: "El lado derecho: el techo horizontal y la pierna que baja recta. Es una dalet (ד) — de דֶּלֶת ('puerta') y דָּל ('pobre, humilde'). Es el sello que presiona desde arriba, la impresión que deja huella. Ginsburgh la ve 'imprimiéndose sobre la corona de la nun': lo alto marca a lo bajo. Recuerda a David, que hizo tavim (marcas) precisamente sobre las daltot (puertas) del portón de Gat.",
        },
        svgPathId: "tav-dalet",
      },
      {
        label: { es: "La nun (el pie que recibe)", en: "The nun (the receiving foot)", fa: "نون (پای پذیرنده)" },
        significado: {
          es: "La pierna izquierda, con su pie curvado hacia adentro: una nun (נ). De נֶאֱמָן ('fiel') y de נוֹפֵל ('el que se inclina, cae'). Es el alma fiel y humilde sobre la que se estampa la marca — el que se inclina para recibir el sello. Que la letra del sello tenga adentro a la 'fiel' no es azar: la impresión de la fe (emuná) solo queda en quien se inclina a recibirla. Y ese pie doblado, junto al de la dalet, le da a la tav sus dos apoyos: la verdad que se sostiene.",
        },
        svgPathId: "tav-nun",
      },
    ],
    mundos: {
      es: "En los mundos, la forma enseña que la creación es un estampado: lo alto (la dalet) imprime su marca sobre lo bajo (la nun). Todo lo creado es cera que recibió un sello. Y como la tav se para sobre dos pies, el mundo entero descansa sobre una base ancha —la verdad— y no sobre un solo punto que se derrumbaría. Un cosmos que se sostiene es un cosmos verdadero.",
    },
    almas: {
      es: "En el alma, tú eres la nun: la fiel que se inclina para recibir. La fe no se argumenta, se imprime — deja una huella en lo más hondo de ti, ahí donde ya no hay pensamiento sino marca. Ginsburgh llama a la tav 'la impresión que la fe en la omnipresencia divina deja en la supraconsciencia'. Y te sostienes en pie —de verdad— solo cuando cargas verdad: dos pies, no uno.",
    },
    divinidad: {
      es: "En lo divino, Ginsburgh asigna a la tav el canal 'de yesod a maljut' (inner.org): el último tramo del descenso de la luz, el que la sella dentro de Maljut, el vaso final. Por eso su arquetipo es David — el rey, la sefirá de Maljut, el que recibe y da forma final a todo lo que bajó. La tav es la letra que cierra el circuito: la luz que empezó en lo más alto queda, al fin, estampada en el mundo.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 400,
    guematriaForma: {
      es: "ת = 400 (el valor más alto de una sola letra) · nombre תָּו = 400 + 6 = 406 (grafía talmúdica תָּיו = 400+10+6 = 416) · אֱמֶת = 1 + 40 + 400 = 441 = 21² = אֶהְיֶה² (אהיה = 1+5+10+5 = 21)",
    },
    mundos: {
      es: "400 es un número que la Torá reserva para los grandes tramos sellados. Son los 'אַרְבַּע מֵאוֹת שָׁנָה', los 400 años de exilio anunciados a Abraham (Génesis 15:13); son los 400 shékel de plata que Abraham pesa por la cueva donde sella la primera posesión en la Tierra (Génesis 23:15); son los 400 hombres con los que Esav viene al encuentro de Yaakov (Génesis 32:7; 33:1). Exilio, compra, confrontación: cada 400 marca una medida COMPLETA, un arco que se cierra. Y como la tav es 400 y es la última letra, es el número del 'hasta aquí': la cuenta llena, el tramo terminado.",
    },
    almas: {
      es: "El número esconde el corazón del estudio. אֱמֶת (verdad) suma 441, y 441 = 21 × 21 = 21² — el cuadrado de אֶהְיֶה ('Seré', el Nombre que Dios da a Moshé en Éxodo 3:14), cuyo valor es 21. La verdad del alma es el Ser elevado a su propia potencia: אֶהְיֶה al cuadrado. No una verdad de opinión, sino la verdad del 'Seré' que se cumple entero. Por eso la verdad se para sobre dos pies (Shabat 104a): lo que es de veras, se sostiene solo.",
    },
    divinidad: {
      es: "La tav es 400, el sello, la última — pero el sello es אֱמֶת, y אֱמֶת = 441 = אֶהְיֶה². La verdad de Dios no es un dato añadido a Su ser: es Su ser mismo, completo, multiplicado por sí. Contémplalo desde el final del alfabeto: toda la creación viajó desde la primera letra hasta esta, y lo que la firma al pie es 'verdad' — y esa verdad resulta ser el Nombre del puro Ser elevado a su plenitud. El destino de todo es sencillamente lo que de veras ES.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "La marca en la frente que salva de la muerte" },
        fuente: {
          es: "Ezequiel 9:4 — 'וְהִתְוִיתָ תָּו עַל מִצְחוֹת הָאֲנָשִׁים הַנֶּאֱנָחִים וְהַנֶּאֱנָקִים': marca una tav en la frente de los que gimen por las abominaciones. Y 9:6 — 'וְעַל כׇּל אִישׁ אֲשֶׁר עָלָיו הַתָּו אַל תִּגַּשׁוּ': a quien tenga la marca, no lo toquen. La tav (marca) es literalmente lo que separa la vida de la muerte.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "David hace marcas sobre las puertas" },
        fuente: {
          es: "I Samuel 21:14 — 'וַיְתָו עַל דַּלְתוֹת הַשַּׁעַר': David, fingiéndose loco en Gat, hizo marcas (וַיְתָו, el verbo de la tav) sobre las PUERTAS (דלתות, de dalet). El arquetipo de la tav (David, según Ginsburgh) hace tavim sobre daltot: la letra, su forma (una dalet) y su rey se tocan en un solo versículo.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "'He aquí mi firma': Job exige respuesta" },
        fuente: {
          es: "Job 31:35 — 'הֶן תָּוִי שַׁדַּי יַעֲנֵנִי': 'he aquí mi marca/firma, que Shaddai me responda'. Job cierra su defensa firmándola con su תָּו — la marca como rúbrica al pie del alegato, la letra del sello personal.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Tav de tinta, tav de sangre: la misma marca, dos destinos" },
        fuente: {
          es: "Shabat 55a — Dios a Gabriel: 'רְשׁוֹם עַל מִצְחָן שֶׁל צַדִּיקִים תָּיו שֶׁל דְּיוֹ... וְעַל מִצְחָם שֶׁל רְשָׁעִים תָּיו שֶׁל דָּם'. '¿Por qué la tav?' Rav: 'תָּיו — תִּחְיֶה, תָּיו — תָּמוּת' (tav: vivirás / morirás). Shmuel: 'תַּמָּה זְכוּת אָבוֹת' (se agotó el mérito de los patriarcas). R. Yojanán: 'תָּחוֹן זְכוּת אָבוֹת' (que el mérito otorgue gracia). La marca de la muerte y la de la vida son la misma letra.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El sello de Dios es Verdad, y termina en tav" },
        fuente: {
          es: "Shabat 55a — Reish Lakish: 'תָּיו — סוֹף חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא', la tav es el FIN del sello del Santo; pues R. Janiná: 'חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא אֱמֶת', Su sello es Verdad — y אֱמֶת acaba en tav. En el mismo pasaje: cumplir 'מֵאָלֶף וְעַד תָּיו' (de álef a tav) = cumplir la Torá entera.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La verdad se sostiene de pie; la mentira se cae" },
        fuente: {
          es: "Shabat 104a — el midrash del alfabeto: 'שִׁי\"ן — שֶׁקֶר, תָּי\"ו — אֱמֶת'. Las letras de שקר van juntas y cada una sobre un solo pie: 'שִׁיקְרָא לָא קָאֵי' (la mentira no se para). Las de אמת están lejos entre sí (comienzo, centro y fin del alfabeto) y se apoyan sobre base ancha 'como ladrillos': 'קוּשְׁטָא קָאֵי' (la verdad perdura). La tav —con sus dos pies— cierra 'verdad' y la sostiene.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "La Verdad, arrojada a la tierra, vuelve a brotar" },
        fuente: {
          es: "Bereshit Rabá 8:5 — al crear al hombre, los ángeles se dividen: la Verdad (אֱמֶת) dice 'que no sea creado, pues es todo mentira'. '¿Qué hizo el Santo? Tomó a la Verdad y la arrojó a la tierra' (Daniel 8:12: 'וְתַשְׁלֵךְ אֱמֶת אָרְצָה'). Y los ángeles claman: 'אֱמֶת מֵאֶרֶץ תִּצְמָח' (Salmos 85:12), la verdad brota de la tierra. La letra del sello de la verdad es también la que hay que hacer crecer desde abajo.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Tav, letra doble: Shabat y la boca (y una divergencia de recensiones)" },
        fuente: {
          es: "Sefer Yetzirá 4 — la Tav es una de las siete letras DOBLES (בג\"ד כפר\"ת). Recensión impresa 4:11: 'לְבָנָה (luna) בָּעוֹלָם, יוֹם שַׁבָּת בַּשָּׁנָה, וּפֶה בַּנֶּפֶשׁ', pareja מֶמְשָׁלָה/עַבְדוּת (dominio/servidumbre). Recensión del Gra 4:14: 'בְּחֵן... צֶדֶק (Júpiter) בָּעוֹלָם, יוֹם שַׁבָּת... וּפֶה', pareja חֵן/כִּיעוּר (gracia/fealdad). Coinciden en Shabat + la boca; difieren en el planeta y la pareja. Ginsburgh sigue al Gra: Júpiter y gracia (jen).",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El canal que sella la luz en Maljut" },
        fuente: {
          es: "R. Y. Ginsburgh, tabla de la Tav (inner.org/alefbeit/sigtav): canal 'de יְסוֹד a מַלְכוּת', arquetipo David (Maljut). La tav es el último tramo del descenso: la luz que empezó arriba queda estampada en el vaso final, el mundo. Última letra = última sefirá = el sello que cierra el circuito.",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "Emet = 441 = Ehyé al cuadrado" },
        fuente: {
          es: "Gematría calculada: אֱמֶת = 1+40+400 = 441 = 21²; y אֶהְיֶה ('Seré', Éxodo 3:14) = 1+5+10+5 = 21. El sello (emet), que termina en tav, es el Nombre del puro Ser elevado a su propia potencia. La verdad no se añade al ser: es el ser, completo.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "La impresión que la fe deja en la supraconsciencia" },
        fuente: {
          es: "R. Y. Ginsburgh, 'The Hebrew Letters' / tabla de la Tav (inner.org/alefbeit/sigtav): la tav es 'la impresión que la fe en la omnipresencia de Dios deja sobre la experiencia supraconsciente de la realidad'. La fe (emuná) no es una idea que se piensa: es una marca (tav) que se imprime más allá del pensamiento, en la raíz misma del alma — la dalet estampándose sobre la nun fiel.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Ezequiel 9:4 y 9:6 — 'וְהִתְוִיתָ תָּו עַל מִצְחוֹת הָאֲנָשִׁים': la marca (tav) en la frente que salva; a quien la tiene, no lo tocan." },
    { es: "I Samuel 21:14 — David 'וַיְתָו עַל דַּלְתוֹת הַשַּׁעַר', hace marcas (verbo de la tav) sobre las puertas (dalet) del portón de Gat." },
    { es: "Job 31:35 — 'הֶן תָּוִי', 'he aquí mi marca/firma': la tav como rúbrica del alegato." },
    { es: "Shabat 55a — Gabriel marca tav de tinta (justos, תִּחְיֶה) y de sangre (malvados, תָּמוּת); Rav (תחיה/תמות), Shmuel (תמה זכות אבות), R. Yojanán (תחון זכות אבות); Reish Lakish + R. Janiná: 'חותמו של הקב\"ה אמת' (la tav es el fin del sello); 'מאלף ועד תיו' = toda la Torá." },
    { es: "Shabat 104a — 'תָּי\"ו — אֱמֶת': las letras de אמת lejos y sobre base ancha ('קושטא קאי', la verdad perdura); las de שקר juntas y sobre un pie ('שיקרא לא קאי')." },
    { es: "Bereshit Rabá 8:5 — la Verdad (אמת) arrojada a la tierra al crear al hombre (Daniel 8:12); 'אמת מארץ תצמח' (Salmos 85:12)." },
    { es: "Sefer Yetzirá 4 — Tav, letra doble (בג\"ד כפר\"ת). Recensión impresa 4:11: luna · Shabat · boca; pareja dominio/servidumbre (ממשלה/עבדות). Recensión del Gra 4:14: Júpiter (צדק) · Shabat · boca; pareja gracia/fealdad (חן/כיעור). Coinciden en Shabat + boca." },
    { es: "Génesis 15:13 (400 años de exilio) · 23:15 (400 shékel de Efrón) · 32:7 y 33:1 (Esav con 400 hombres) — los 400 (=ת) de la Torá." },
    { es: "Éxodo 3:14 — 'אֶהְיֶה אֲשֶׁר אֶהְיֶה', el Nombre 'Seré' (=21); base de emet = 441 = 21²." },
    { es: "R. Y. Ginsburgh, tabla oficial de la Tav (inner.org/alefbeit/sigtav): forma = dalet sobre la corona de una nun; espacio = Júpiter; tiempo = Shabat; alma = boca; don = gracia; arquetipo = David; canal = de yesod a maljut; concepto = la impresión de la fe en la supraconsciencia." },
    { es: "Gematrías calculadas: ת = 400 · תָּו = 406 (talmúdico תָּיו = 416) · אמת = 441 = 21² · אהיה = 21 · שקר = 600." },
    { es: "Nota de precisión: en Shabat 55a 'el sello es emet' es de R. Janiná (vía Reish Lakish); Rav dice תחיה/תמות. Menajot 29b trata la he y la yod, NO la tav, y no se usa. La 'contienda de las letras' (Zohar, Hakdamat Bereshit) no se cita por no anclarse a folio exacto vía Sefaria." },
  ],
};
