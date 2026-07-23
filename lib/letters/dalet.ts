import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  DALET (ד) — Data de la cuarta letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Shabat 104a — גִּימֶ״ל דָּלֶ״ת: גְּמוֹל דַּלִּים. El pie de la guimel corre
//     hacia la dalet; el pie de la dalet se extiende hacia la guimel; y la CARA
//     de la dalet se aparta de la guimel — para dar בְּצִנְעָה (en secreto) y no
//     avergonzar al pobre. Verificado en el hebreo del folio, palabra por palabra.
//   · Éxodo 21:6 — אֶל־הַדֶּלֶת: la puerta (délet) en el Tanaj, con la oreja
//     perforada del esclavo que renuncia a su libertad.
//   · Deuteronomio 6:4 — la ד de אֶחָד es letra rabati (grande) en el propio
//     texto masorético (Sefaria la marca como letra grande, igual que la ע de שְׁמַע).
//   · Kitzur Baal HaTurim, Deut 6:4 — la dalet grande: "para que Lo proclames rey
//     en el cielo, la tierra y las cuatro direcciones del mundo, y para que no
//     yerres con una resh"; y ע + ד grandes = עֵד (testigo).
//   · Berajot 13b — Sumjus: quien alarga אֶחָד, se le alargan sus días; Rav Ajá
//     bar Yaakov: "en la dalet"; R. Jiyá bar Aba: "una vez que Lo has proclamado
//     rey arriba, abajo y en las cuatro direcciones del cielo, no necesitas más".
//   · Vayikrá Rabá 19:2 — "שְׁמַע יִשְׂרָאֵל... אִם אַתְּ עוֹשֶׂה דָּלֶ״ת רֵי״שׁ, אַתָּה
//     מַחְרִיב אֶת כָּל הָעוֹלָם כֻּלּוֹ" (y la inversa con אֵל אַחֵר, Éxodo 34:14).
//   · Sefer Yetzirá cap. 4 — Dalet es letra DOBLE (בג״ד כפר״ת). Recensión impresa
//     4:7: Marte · tercer día · oído derecho. Recensión del Gra 4:10: reinada en
//     זֶרַע (simiente) · Sol · tercer día · narina derecha. DIFIEREN — se declara.
//   · Zohar, Hakdamá (I:3a; Sefaria: Zohar, Introduction 6:36) — la ד y la ג
//     entran JUNTAS ante el Creador: "דָּלֶ״ת אִיהוּ מִסְכְּנָא, גִימְ״ל גְּמוֹל לָהּ
//     טִיבוּ, לָא תִתְפָּרְשׁוּן דָּא מִן דָּא" (la dalet es la pobre; guimel, hazle el
//     bien; no os separéis la una de la otra).
//   · Proverbios 19:17 — מַלְוֵה ה' חוֹנֵן דָּל וּגְמֻלוֹ יְשַׁלֶּם־לוֹ (¡con la raíz
//     גמל dentro!); Éxodo 23:3 y Salmos 41:2 — דָּל en el Tanaj.
//   · Salmos 30:2 — כִּי דִלִּיתָנִי ("me alzaste", raíz דלה: sacar agua del pozo).
//   · Génesis 28:14 — a Yaakov (arquetipo de la dalet según Ginsburgh): וּפָרַצְתָּ
//     יָמָּה וָקֵדְמָה וְצָפֹנָה וָנֶגְבָּה — las cuatro direcciones.
//   · R. Yitzchak Ginsburgh, inner.org/alefbeit/sigdalet (verificado por curl):
//     Concepto: "la anulación del yo (bitul) que acompaña todo giro existencial
//     básico". Significado: "puerta; pobre; alzar". Forma: "un alma erguida (la
//     vav vertical) unida a su fuente divina (la vav horizontal que flota
//     encima)". Espacio: Sol · Tiempo: martes · Alma: narina derecha · Don:
//     descendencia · Arquetipo: Yaakov · Canal: de Kéter a Tiféret. (Sigue al Gra.)
//   · Torá Or, Yitró 1:18 — la luna לֵית לָהּ מִגַּרְמָהּ כְּלוּם ("no tiene nada de
//     sí misma"): recibe toda su luz del sol. La imagen jasídica del receptor.
//  Gematrías (calculadas letra por letra, Python):
//    ד = 4 · nombre pleno דלת = 4+30+400 = 434 = דֶּלֶת (puerta) — ¡mismas letras!
//    דַּל = 4+30 = 34 · אֶחָד = 1+8+4 = 13 = אַהֲבָה (1+5+2+5) · אַחֵר = 1+8+200 = 209
//
//  NOTA DEL SOFER — descartado o precisado por honestidad:
//   · "Las cuatro letras del Nombre / los cuatro mundos (ABiYÁ)" como sentido del
//     4: las cuatro letras de הוי״ה son un hecho textual, pero la lectura
//     "4 = cuatro mundos" es marco luriano sin folio único citable — se menciona
//     MARCADA como drash, no como cita.
//   · La frase zohárica לית לה מגרמה כלום se verificó en Zohar Jadash, Shir
//     HaShirim 255 — pero allí se dice de la ה final, no de la dalet. Se usa la
//     versión de Torá Or (la luna) y se declara la precisión. El juego de
//     palabras dalet = דְּלֵית ("que no tiene") se marca como drash jasídico.
//   · Vayikrá Rabá 19:2 se verificó EXACTO (la pista temática decía "ajer vs.
//     ejad — verificar dónde": está ahí, palabra por palabra).
//   · Ginsburgh NO asigna sendero del Árbol a la dalet en la tabla (el "canal
//     Kéter→Tiféret" es su propio esquema de canales, no un sendero del Zohar).
// ─────────────────────────────────────────────────────────────────────────

export const dalet: LetterData = {
  slug: "dalet",
  letter: "ד",
  nameTranslit: { es: "Dalet", en: "Dalet", fa: "دالِت" },
  nameHe: "דָּלֶת",
  value: 4,

  level1: {
    es: "Tres letras llevas andadas: la Álef del Maestro, la Bet de la casa, la Guimel del que corre a dar. Y ahora el alfabeto te pone delante algo extraño: una puerta que es un mendigo. Porque דָּלֶת se escribe con las mismas letras que דֶּלֶת, 'puerta' — y suena igual que דַּל, 'pobre'. Los niños de la escuela de Rabí Yehoshúa ben Leví lo dijeron en dos palabras: guimel-dalet, גְּמוֹל דַּלִּים, 'haz el bien a los pobres'. La guimel corre hacia ella; la dalet extiende su pie hacia la guimel... pero aparta la cara. Quédate ahí, en ese gesto. Una letra que recibe y no mira. Una pobreza que resulta ser una puerta. Antes de seguir, la pregunta de la dalet: ¿por qué la entrada a todo lo que viene después del dar... es saber recibir?",
    en: "Three letters in: the Alef of the Master, the Beit of the house, the Gimel who runs to give. And now the alphabet places something strange before you: a door that is a beggar. For דָּלֶת is spelled with the very letters of דֶּלֶת, 'door' — and sounds like דַּל, 'poor one'. The schoolchildren before Rabbi Yehoshua ben Levi said it in two words: gimel-dalet, gemol dalim, 'be kind to the poor'. The gimel runs toward her; the dalet stretches her foot toward the gimel... yet turns her face away. Stay with that gesture. A letter that receives and does not look. A poverty that turns out to be a door. Before you go on, the dalet's question: why is the gateway to everything that follows giving... knowing how to receive?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "El nombre דָּלֶת es un caso único en el alfabeto: la palabra que lo nombra existe en el Tanaj tal cual, con sus mismas tres letras. דֶּלֶת es 'puerta' — la puerta física, de madera y quicio: 'lo acercará a la puerta (אֶל־הַדֶּלֶת) o a la jamba, y su amo le perforará la oreja' (Éxodo 21:6). Y dentro de la puerta vive otra palabra: דַּל, 'pobre', 'débil', 'el que no tiene' — bíblica también: 'al dal no favorecerás en su pleito' (Éxodo 23:3), 'feliz el que comprende al dal' (Salmos 41:2). El Talmud funde ambas en la lectura de los niños: גְּמוֹל דַּלִּים, la dalet es el pobre al que la guimel corre a hacer el bien (Shabat 104a).\n\nHay una tercera raíz, y es la que lo voltea todo: דלה, 'sacar agua del pozo', 'alzar desde lo hondo'. David canta: אֲרוֹמִמְךָ ה' כִּי דִלִּיתָנִי — 'Te exalto, porque me ALZASTE' (Salmos 30:2), el verbo del cubo que sube lleno del pozo. Rav Ginsburgh reúne los tres sentidos en su tabla de la dalet: 'puerta; pobre; alzar' (inner.org). Y la Escritura misma parece haberlos cosido en un solo versículo: 'quien se apiada del dal le presta a Hashem, y su GUEMUL (וּגְמֻלוֹ) Él le pagará' (Proverbios 19:17) — el dal y la raíz de la guimel, abrazados en la misma línea. El pobre no es el final de la historia: es la puerta por donde el que da toca a Dios, y el pozo del que alguien será alzado.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Dalet enseña que todo lo creado es dal: nada de lo que existe se sostiene con recursos propios. El mundo entero recibe su ser a cada instante, como la luna de la que habla el jasidismo, que לֵית לָהּ מִגַּרְמָהּ כְּלוּם — 'no tiene nada de sí misma': toda su luz le llega del sol (Torá Or, Yitró 1:18). Ser criatura es ser dalet: estar parado en la puerta, con la mano abierta. Y no es humillación — es la condición de posibilidad de recibir. Solo lo que está vacío puede llenarse; solo la puerta abierta deja pasar la luz.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Dalet es la dignidad de recibir. Fíjate en el detalle más fino de Shabat 104a: la dalet extiende su pie hacia la guimel — לְמַצּוֹיֵי לֵיהּ נַפְשֵׁיהּ, para hacerse disponible, para no esconderse del que quiere darle. Recibir también es un trabajo del alma: dejarse encontrar. Pero su cara se aparta — y el Talmud dice por qué: para que el que da, dé בְּצִנְעָה, en secreto, y el pobre no se avergüence. La letra entera es una lección de tacto: hay que saber pedir sin humillarse y saber dar sin humillar. ¿Sabes tú recibir — ayuda, corrección, amor — sin que se te quiebre la dignidad? Esa es la avodá de la dalet.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Dalet es bitul: Rav Ginsburgh la define como 'la anulación del yo que acompaña todo giro existencial básico' (inner.org). Ante Ein Sof, hasta el más rico es dal: no hay criatura que tenga nada de sí misma. Pero mira el final del alfabeto de los niños en ese mismo folio: tras la dalet vienen ה״ו — 'este es el Nombre del Santo, bendito sea' — 'y si actúas así [con el pobre], el Santo te SUSTENTA (זָן אוֹתְךָ)' (Shabat 104a). La puerta del pobre desemboca directamente en el Nombre. Reconocerte dalet no te aleja de Dios: es exactamente donde Él te espera, del otro lado de la puerta.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Dos trazos: un dintel horizontal y una pierna vertical que cae de su extremo derecho. Rav Ginsburgh los lee así: 'un alma erguida (la vav vertical) unida a su fuente divina (la vav horizontal que flota encima)' (inner.org) — la dalet como el que está de pie bajo un techo que no construyó. Es, literalmente, el dibujo de un umbral: el marco de una puerta visto de perfil.\n\nPero la forma habla sobre todo por sus gestos hacia las letras vecinas, y eso no es lectura moderna: es el Talmud. Shabat 104a pregunta tres veces: ¿por qué el pie de la guimel se estira hacia la dalet? Porque el que hace el bien corre tras los pobres. ¿Por qué el pie de la dalet se estira hacia la guimel? Para hacerse disponible. ¿Y por qué la cara de la dalet se aparta de la guimel? Para que le dé en secreto y no se avergüence. Y hay un cuarto gesto, el más grave: en la esquina superior derecha, un ángulo recto marcado — el talón que la distingue de la Resh, que es redonda. De esa esquina mínima, dice el Midrash, cuelga el mundo entero (Vayikrá Rabá 19:2): borra el ángulo y אֶחָד ('Uno') se convierte en אַחֵר ('otro').",
    },
    partes: [
      {
        label: { es: "El dintel (el techo que recibe)", en: "The lintel (the sheltering roof)", fa: "سردر" },
        significado: {
          es: "La barra horizontal superior. Ginsburgh la lee como una vav acostada que 'flota encima': la fuente divina suspendida sobre el alma, el techo que la dalet no se dio a sí misma. Todo lo que el pobre tiene sobre su cabeza le fue dado. Es también el dintel del umbral: lo primero que cruzas cuando cruzas una puerta está arriba de ti.",
        },
        svgPathId: "dalet-roof",
      },
      {
        label: { es: "La pierna (el pie hacia la guimel)", en: "The leg (the foot toward the gimel)", fa: "پایه" },
        significado: {
          es: "El trazo vertical que baja del extremo derecho del dintel. Es el 'alma erguida' de Ginsburgh — y es el pie del que habla el Talmud: פְּשׁוּטָה כַּרְעֵיהּ דְּדָלֶ״ת לְגַבֵּי גִּימֶ״ל, 'el pie de la dalet se extiende hacia la guimel, para hacerse disponible' (Shabat 104a). El pobre no persigue al benefactor, pero tampoco se esconde: da un paso hacia el encuentro. Recibir con dignidad también es moverse.",
        },
        svgPathId: "dalet-leg",
      },
      {
        label: { es: "El talón (la esquina que la salva de ser Resh)", en: "The heel (the corner that keeps it from being a Resh)", fa: "گوشه" },
        significado: {
          es: "El ángulo recto de la esquina superior derecha, con su pequeño saliente hacia atrás. Es TODO lo que separa a la ד de la ר: la resh es curva, la dalet es esquinada. Y de ese detalle de tinta pende el Shemá: 'si haces de la dalet una resh, destruyes el mundo entero' (Vayikrá Rabá 19:2), porque אֶחָד se vuelve אַחֵר — el Uno se vuelve 'otro dios'. La esquina mira hacia atrás, hacia la guimel que viene: el que recibe carga en su espalda la memoria del que le dio.",
        },
        svgPathId: "dalet-corner",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la dalet es la arquitectura mínima de todo lo creado: un techo recibido y una columna que lo sostiene desde abajo. Ningún mundo se techa a sí mismo. Y en el alfabeto de los niños, la puerta está colocada exactamente después del que da: el orden guimel→dalet es el orden del universo, donde la shefa (el flujo) siempre viene de más arriba y siempre busca una puerta por donde entrar.",
    },
    almas: {
      es: "En el alma, los tres gestos de la dalet en Shabat 104a son un manual completo de tzedaká: correr hacia el que no tiene (guimel), dejarse encontrar (el pie de la dalet), y no mirar ni ser mirado en el momento del dar (la cara apartada). El Talmud graba la ética más fina en la anatomía misma de las letras: hasta la caridad puede herir, si se hace de frente. Aparta la cara cuando des; aparta la cara cuando recibas. La ternura también tiene geometría.",
    },
    divinidad: {
      es: "En lo divino, la dalet de perfil es un umbral — y del otro lado del umbral, en el alfabeto, sigue ה: la letra del Nombre (Shabat 104a: ה״ו — 'este es el Nombre del Santo, bendito sea'). La puerta del pobre es la antesala de la revelación. Y la esquina que la distingue de la resh custodia el אֶחָד del Shemá: la unidad de Dios en este mundo pende, literalmente, de un ángulo de tinta trazado con temor. Quien escribe una dalet, sostiene el Uno.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 4,
    guematriaForma: {
      es: "ד = 4 · nombre pleno דלת = 4 + 30 + 400 = 434 = דֶּלֶת ('puerta': mismas letras, mismo número — el nombre de la letra ES la palabra puerta) · דַּל (pobre) = 34 · אֶחָד = 13 = אַהֲבָה (amor)",
    },
    mundos: {
      es: "4 es el número del mundo desplegado en direcciones. A Yaakov — el arquetipo de la dalet según Ginsburgh — se le promete exactamente eso: וּפָרַצְתָּ יָמָּה וָקֵדְמָה וְצָפֹנָה וָנֶגְבָּה, 'te expandirás al oeste, al este, al norte y al sur' (Génesis 28:14). Y el Sefer Yetzirá cuenta a la dalet entre las siete letras DOBLES (בג״ד כפר״ת), las que se pronuncian dura o suave porque cargan un don y su reverso: en la recensión del Gra (4:3, 4:10), a la dalet le toca זֶרַע, simiente — y su opuesto, שְׁמָמָה, desolación. La simiente o el desierto: el cuatro es el mundo abierto en cruz, esperando saber cuál de los dos será.",
    },
    almas: {
      es: "4 es la dalet del Shemá. En Deuteronomio 6:4, la ד de אֶחָד está escrita GRANDE en el propio rollo de la Torá — letra rabati de la tradición masorética, junto a la ע de שְׁמַע: juntas forman עֵד, 'testigo' (Kitzur Baal HaTurim ahí mismo). Y el Talmud manda alargar precisamente esa letra: 'quien alarga אֶחָד, se le alargan sus días y sus años... en la dalet' (Berajot 13b) — el tiempo justo para 'proclamarlo Rey arriba, abajo y en las cuatro direcciones del cielo'. El cuatro de la dalet es tu tarea al decir el Shemá: llevar el Uno a cada esquina del mapa. Y el Baal HaTurim añade el porqué de su tamaño: grande, 'para que no yerres con una resh'.",
    },
    divinidad: {
      es: "El nombre pleno de la Dalet suma 434 — el valor exacto de דֶּלֶת, 'puerta'. No hay otra letra cuyo nombre completo sea, número por número y letra por letra, una palabra entera del Tanaj: la dalet no SIGNIFICA puerta, ES la puerta. ¿Y hacia qué se abre? אֶחָד suma 13, lo mismo que אַהֲבָה, 'amor' (1+8+4 = 1+5+2+5 = 13): el Uno que la dalet custodia con su esquina vale lo que el amor. (Que el 4 sean además las cuatro letras del Nombre הוי״ה es un hecho del Nombre mismo; leerlo como los cuatro mundos de la Cabalá luriana es drash de ese marco, y como tal te lo entregamos.) La puerta del pobre, alargada en la boca del que reza, se abre al Uno — y el Uno es amor.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "La oreja perforada en la puerta" },
        fuente: {
          es: "Éxodo 21:6 — el esclavo que rehúsa salir libre es llevado אֶל־הַדֶּלֶת, 'a la puerta', y allí le perforan la oreja. La délet del Tanaj es el lugar donde se decide la libertad: el mismo umbral sirve para salir o para quedarse. La dalet siempre pregunta hacia qué lado la cruzas.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Quien se apiada del dal le presta a Dios" },
        fuente: {
          es: "Proverbios 19:17 — מַלְוֵה ה' חוֹנֵן דָּל וּגְמֻלוֹ יְשַׁלֶּם־לוֹ: 'presta a Hashem quien se apiada del dal, y su guemul Él le pagará'. El versículo junta al dal (la dalet) con la raíz גמל (la guimel) en una sola línea: el circuito guimel-dalet del alfabeto, escrito en Proverbios.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Las cuatro direcciones de Yaakov" },
        fuente: {
          es: "Génesis 28:14 — וּפָרַצְתָּ יָמָּה וָקֵדְמָה וְצָפֹנָה וָנֶגְבָּה: al despertar del sueño de la escalera, a Yaakov (arquetipo de la dalet en la tabla de Ginsburgh) se le promete la expansión hacia los cuatro puntos cardinales. El 4 de la dalet, prometido en Beit-El.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Guimel-dalet: el alfabeto de los niños" },
        fuente: {
          es: "Shabat 104a — גִּימֶ״ל דָּלֶ״ת: גְּמוֹל דַּלִּים. El pie de la guimel corre tras los pobres; el pie de la dalet se le acerca 'para hacerse disponible'; y la cara de la dalet se aparta — דְּלִיתֵּן לֵיהּ בְּצִנְעָה, 'para que le dé en secreto y no se avergüence'. Tres gestos de tinta, toda la ética de la tzedaká.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Alargar la dalet de אֶחָד" },
        fuente: {
          es: "Berajot 13b — Sumjus: 'quien alarga אֶחָד, se le alargan sus días y sus años'. Rav Ajá bar Yaakov: 'en la dalet'. Rav Ashi: 'con tal de que no atropelle la jet'. Y R. Jiyá bar Aba a R. Yirmiyá: 'una vez que Lo proclamaste Rey arriba, abajo y en las cuatro direcciones del cielo, no necesitas más'. La dalet (4) del Shemá son las cuatro direcciones de Su reinado.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "La esquina de la que pende el mundo" },
        fuente: {
          es: "Vayikrá Rabá 19:2 — sobre שְׁמַע יִשְׂרָאֵל: 'si haces de la dalet una resh, destruyes el mundo entero' (אֶחָד → אַחֵר); y sobre Éxodo 34:14 ('no te postrarás ante un dios אַחֵר'): 'si haces de la resh una dalet, destruyes el mundo entero'. Una esquina de tinta separa la fe de la idolatría — en ambas direcciones.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Dalet, letra doble: simiente o desolación" },
        fuente: {
          es: "Sefer Yetzirá cap. 4 — la dalet es una de las siete DOBLES (בג״ד כפר״ת), 'que se pronuncian con dos lenguas' (4:1). Las recensiones difieren y lo declaramos: la impresa (4:7) le asigna Marte, el tercer día y el oído derecho; la del Gra (4:10) la corona en זֶרַע (simiente, opuesto: שְׁמָמָה, desolación), con el Sol, el tercer día y la narina derecha. Ginsburgh sigue al Gra.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El Zohar: 'no os separéis la una de la otra'" },
        fuente: {
          es: "Zohar, Hakdamá I:3a (ed. Sefaria: Zohar, Introduction 6:36) — cuando las letras desfilan ante el Creador pidiendo cada una que el mundo se cree con ella, la ד y la ג entran JUNTAS. Y Él les responde: 'os basta estar la una con la otra, pues los pobres no cesarán del mundo... דָּלֶ״ת אִיהוּ מִסְכְּנָא — la dalet es la pobre; guimel, hazle el bien; no os separéis, y bastaos con sosteneros la una a la otra'. Ni siquiera piden por separado: su unión ES su respuesta.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "434: el nombre de la letra es la puerta" },
        fuente: {
          es: "Gematría calculada: דלת = 4+30+400 = 434 = דֶּלֶת ('puerta', Éxodo 21:6 — mismas letras). Y אֶחָד = 1+8+4 = 13 = אַהֲבָה ('amor'). La letra cuyo nombre pleno es una puerta custodia, con su esquina, un Uno que vale amor.",
        },
        href: "/mente-cosmica",
      },
    ],
    jasidut: [
      {
        titulo: { es: "Bitul: la pobreza que es un umbral" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sigdalet) — concepto de la dalet: 'la anulación del yo (bitul) que acompaña todo giro existencial básico'; significado: 'puerta; pobre; alzar'; forma: 'un alma erguida unida a su fuente divina que flota encima'; arquetipo: Yaakov; canal: de Kéter a Tiféret. Todo cambio real del alma pasa por una puerta, y en la puerta se paga el mismo peaje: dejar de creerse dueño.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La luna que no tiene nada de sí misma" },
        fuente: {
          es: "Torá Or, Yitró 1:18 (Admur HaZakén) — la luna לֵית לָהּ מִגַּרְמָהּ כְּלוּם, 'no tiene nada de sí misma': toda su luz la recibe del sol, y por eso Israel cuenta sus meses por ella. Es el retrato jasídico del alma-dalet: su pobreza no es carencia sino transparencia — brilla precisamente porque no pretende que la luz sea suya.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Éxodo 21:6 — אֶל־הַדֶּלֶת: la puerta en el Tanaj (la oreja perforada del esclavo)." },
    { es: "Éxodo 23:3 · Salmos 41:2 · Proverbios 19:17 — דָּל ('pobre') en el Tanaj; Prov 19:17 une דָּל y la raíz גמל en un solo versículo." },
    { es: "Salmos 30:2 — כִּי דִלִּיתָנִי ('me alzaste'), raíz דלה: sacar del pozo." },
    { es: "Génesis 28:14 — las cuatro direcciones prometidas a Yaakov (וּפָרַצְתָּ)." },
    { es: "Shabat 104a — גְּמוֹל דַּלִּים; los pies de guimel y dalet, y la cara apartada de la dalet para dar בְּצִנְעָה; continúa: ה״ו — 'este es el Nombre del Santo', 'y Él te sustenta (זָן)'." },
    { es: "Berajot 13b — alargar la dalet de אֶחָד: proclamarlo Rey arriba, abajo y en las cuatro direcciones del cielo." },
    { es: "Deuteronomio 6:4 — la ד de אֶחָד y la ע de שְׁמַע son letras rabati (grandes) en el texto masorético." },
    { es: "Kitzur Baal HaTurim, Deuteronomio 6:4 — la dalet grande: reinarlo en las cuatro direcciones y no errar con la resh; ע + ד = עֵד, 'testigo'." },
    { es: "Vayikrá Rabá 19:2 — 'si haces de la dalet una resh destruyes el mundo entero' (אֶחָד→אַחֵר), y la inversa sobre Éxodo 34:14." },
    { es: "Sefer Yetzirá cap. 4 — dalet, letra DOBLE (בג״ד כפר״ת). Impresa 4:7: Marte · día 3 · oído derecho. Gra 4:3 y 4:10: זֶרַע/שְׁמָמָה · Sol · día 3 · narina derecha. Las recensiones difieren; Ginsburgh sigue al Gra." },
    { es: "Zohar, Hakdamá I:3a (Sefaria: Zohar, Introduction 6:36) — la ד y la ג entran juntas: 'la dalet es la pobre; guimel, hazle el bien; no os separéis'." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' (inner.org/alefbeit/sigdalet) — bitul; puerta/pobre/alzar; Sol · martes · narina derecha · descendencia · Yaakov · canal Kéter→Tiféret." },
    { es: "Torá Or, Yitró 1:18 — la luna 'no tiene nada de sí misma' (לית לה מגרמה כלום). Precisión: en Zohar Jadash, Shir HaShirim 255 la frase se dice de la ה final, no de la dalet; el juego dalet = דְּלֵית ('que no tiene') es drash jasídico, no cita." },
    { es: "Gematrías calculadas: ד = 4 · דלת = 4+30+400 = 434 = דֶּלֶת · דַּל = 34 · אֶחָד = 13 = אַהֲבָה · אַחֵר = 209." },
    { es: "Nota de precisión: '4 = cuatro mundos (ABiYÁ)' es marco luriano ofrecido como drash, sin folio único; las cuatro letras de הוי״ה son hecho textual; las cuatro direcciones sí tienen ancla exacta (Berajot 13b; Génesis 28:14)." },
  ],
};
