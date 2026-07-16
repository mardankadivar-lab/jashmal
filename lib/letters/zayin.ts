import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  ZAYIN (ז) — Data de la séptima letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Mishná Shabat 6:4 — el hombre no sale con espada en Shabat; R. Eliezer
//     dice que son adorno, los Sabios: "no son sino vergüenza" (Isaías 2:4).
//   · Avodá Zará 16a / Makot 10a — כְּלֵי זַיִין, "instrumentos de zayin" (armas).
//   · Génesis 2:2-3 — el séptimo día; Éxodo 20:8 / Deut 5:12 — zajor/shamor.
//   · Vayikrá Rabá 29:11 — כָּל הַשְּׁבִיעִין חֲבִיבִין, "todos los séptimos son amados".
//   · Taanit 27b — la נְשָׁמָה יְתֵירָה (alma adicional) del Shabat (Reish Lakish).
//   · Sefer Yetzirá 5:1-2 — Zayin es letra SIMPLE: Guéminis · Siván · pierna derecha.
//   · Shabat 86b — R. Yosí: la Torá se dio el SIETE de Siván (el mes de la zayin).
//   · Proverbios 12:4 — אֵשֶׁת חַיִל עֲטֶרֶת בַּעְלָהּ (la corona de Ginsburgh).
//   · Génesis 45:23 / II Crónicas 11:23 — מָזוֹן (sustento) sí es bíblico.
//  Gematrías (calculadas letra por letra):
//    ז = 7 · nombre pleno זין = 7+10+50 = 67 · בינה = 2+10+50+5 = 67 (¡igualdad!)
//
//  NOTA DEL SOFER — descartado por no verificable: la atribución a "Zohar:
//  los siete días de la semana / el Shabat es el alma de todos los días" no
//  pudo anclarse a un folio exacto del Zohar; se sustituye por Taanit 27b,
//  que sí dice lo mismo con fuente precisa. Tampoco se asigna sendero del
//  Árbol: Ginsburgh (inner.org/hebleter/zayin.htm) NO asigna senderos.
// ─────────────────────────────────────────────────────────────────────────

export const zayin: LetterData = {
  slug: "zayin",
  letter: "ז",
  nameTranslit: { es: "Zayin", en: "Zayin", fa: "زاین" },
  nameHe: "זַיִן",
  value: 7,

  level1: {
    es: "Míralas juntas y verás la historia entera: la Vav es una línea que baja. La Zayin es esa misma línea — pero con una barra atravesada encima. Es una espada. Y es una corona. La misma forma, las dos cosas a la vez. Su nombre significa 'arma'; su número es siete, el número del Shabat. Esta es la letra de la paradoja más honda del alfabeto: el arma que descansa. Antes de leer una palabra más, quédate con esa pregunta: ¿cómo puede una espada ser una corona?",
    en: "See them together and you have the whole story: the Vav is a line descending. The Zayin is that same line — with a bar laid across the top. It is a sword. And it is a crown. The same shape, both at once. Its name means 'weapon'; its number is seven, the number of Shabbat. This is the letter of the alphabet's deepest paradox: the weapon that rests.",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "זַיִן significa 'arma'. Y aquí conviene ser honesto de entrada: esta palabra no aparece en el Tanaj. Ni una sola vez. La Biblia dice חֶרֶב (jérev, espada), no zayin. El nombre nace en el hebreo de los Sabios, en la expresión כְּלֵי זַיִין (klei zayin), 'instrumentos de zayin' = armamento — y ahí sí está documentado con precisión: Avodá Zará 16a y Makot 10a lo usan con esas letras exactas. La Zayin es, entonces, la letra cuyo nombre le pusieron los Sabios, no los Profetas.\n\nHay una segunda enseñanza, muy repetida, que une la zayin con זָן (zan, 'sustentar') y con מָזוֹן (mazón, 'alimento'): la letra del arma sería también la letra del pan. Vale la pena mirarla despacio, porque es hermosa y porque suele contarse mal. Lo cierto es que מָזוֹן sí es bíblico (Génesis 45:23: 'grano, pan y מָזוֹן para su padre'; II Crónicas 11:23), y que la bendición después de comer se abre precisamente con הַזָּן אֶת הָעוֹלָם כֻּלּוֹ, 'el que sustenta al mundo entero'. Pero mazón y zan brotan de la raíz ז-ו-ן, mientras que zayin (arma) viene de ז-י-ן: son raíces distintas. El vínculo arma↔sustento no es etimología: es drash — lectura homilética. Rav Ginsburgh lo recoge, listando entre los sentidos de la zayin 'arma-espada; adorno o corona; especie; sustentar'. Y como drash ilumina de verdad: lo que te alimenta y lo que te defiende son el mismo gesto de cuidado, visto desde dos lados. Sabiendo qué es, se puede recibir entero.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Zayin es la fuerza que protege lo creado. Todo lo que existe necesita un borde, un límite, algo que lo defienda de disolverse en lo que no es él. La zayin es ese filo: la frontera que hace que una cosa siga siendo ella misma. Y a la vez es el mazón, el sustento que la mantiene viva. Defensa y alimento: las dos manos con las que el mundo se sostiene día tras día.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Zayin es tu capacidad de decir no. Hay un momento en que amar significa poner un filo: proteger a los tuyos, defender un límite, negarte a lo que te destruye. Pero la letra te entrega esa espada con una advertencia cosida en su propia forma —la corona— : la fuerza solo es santa cuando sirve a algo más alto que ella. Un arma sin corona es violencia. Un arma coronada es guarda. La pregunta del alma-zayin no es '¿tengo fuerza?', sino '¿al servicio de qué la tengo?'.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Zayin toca la Guevurá: el rigor, el límite, la contracción que hace posible que exista un mundo. Pero su nombre pleno esconde el secreto: זין = 7 + 10 + 50 = 67 — el mismo valor exacto que בִּינָה (2+10+50+5 = 67). Biná es la Madre que da a luz a las siete sefirot inferiores; la zayin es el siete. La letra del arma lleva, escrito en su nombre completo, el número de su propia madre. La fuerza nace del entendimiento, o no es fuerza: es solo golpe.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "La Zayin es una Vav a la que le creció la cabeza. Rav Ginsburgh lo dice con exactitud: es 'una vav cuya cabeza se extiende en ambas direcciones y así aparece como una corona' (inner.org, The Hebrew Letters). Ese es todo el misterio, y está en el trazo: si a la línea que desciende (la Vav, el canal por el que baja la luz) le pones una barra que sobresale a izquierda y derecha, obtienes dos objetos al mismo tiempo. Un mango con hoja: la espada. Un poste con diadema: la corona.\n\nGinsburgh añade la clave que ordena todo: la zayin es el אוֹר חוֹזֵר (or jozer), la 'luz que retorna' — la luz que, tras descender hasta el fondo, rebota hacia arriba con MÁS fuerza que la que traía al bajar. Por eso la cabeza se ensancha: la Vav baja; la Zayin baja y vuelve. Y esa vuelta es la que corona. La corona no se pone desde arriba: se gana desde abajo. Ginsburgh la lee además a la luz de Proverbios 12:4 — אֵשֶׁת חַיִל עֲטֶרֶת בַּעְלָהּ, 'la mujer de valor es corona de su marido'.",
    },
    partes: [
      {
        label: { es: "La corona (la barra superior)", en: "The crown (upper bar)", fa: "تاج" },
        significado: {
          es: "La barra horizontal que sobresale a ambos lados. Es lo único que distingue a la Zayin de la Vav — y lo cambia todo. Es corona y es empuñadura: el lugar por donde se agarra el arma y el lugar donde se posa la realeza. Ginsburgh la lee como la luz que retorna (or jozer), ensanchada por haber ido hasta el fondo y haber vuelto. Lo que sube desde abajo es más ancho que lo que bajó.",
        },
        svgPathId: "zayin-crown",
      },
      {
        label: { es: "La hoja (el descenso)", en: "The blade (descent)", fa: "تیغه" },
        significado: {
          es: "La línea vertical que baja: la Vav que la Zayin lleva dentro. Es el mismo canal de siempre, el descenso de la luz hacia el mundo. Pero coronado, ese descenso ya no solo transmite: también corta. La misma línea que en la Vav conecta, en la Zayin defiende. No hay dos trazos distintos — hay un trazo que aprendió a sostener un límite.",
        },
        svgPathId: "zayin-blade",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Zayin enseña que la creación no se sostiene solo con lo que baja. Hace falta el rebote: la respuesta desde abajo. Seis días de descenso (la Vav, seis) y luego un séptimo que sube — el Shabat. La barra de la zayin es el mundo devolviendo la luz que recibió.",
    },
    almas: {
      es: "En el alma, tú eres la Vav durante seis días: recibes, transmites, trabajas, bajas la luz. El séptimo te vuelves Zayin: te detienes y devuelves. Y en ese detenerte te crece la corona. Es contraintuitivo y es exacto: no te coronas por lo que produjiste, sino por lo que fuiste capaz de soltar. La corona de la zayin se gana el día en que sueltas la espada.",
    },
    divinidad: {
      es: "En lo divino, la Zayin es or jozer: la luz de retorno. Ein Sof desciende por la Vav hasta el último rincón de lo finito, y desde ese último rincón la luz rebota hacia arriba y alcanza más alto que su origen — el nivel supraconsciente, dice Ginsburgh. Por eso la corona (Kéter) está en la letra del arma: solo lo que bajó hasta el fondo puede coronar.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 7,
    guematriaForma: {
      es: "ז = 7 · nombre pleno זין = 7 + 10 + 50 = 67 = בִּינָה (2 + 10 + 50 + 5 = 67) — la Madre de las siete sefirot inferiores",
    },
    mundos: {
      es: "7 es el número del mundo terminado. Seis días de creación y un séptimo: 'וַיְכַל אֱלֹהִים בַּיּוֹם הַשְּׁבִיעִי... וַיִּשְׁבֹּת' (Génesis 2:2-3). Fíjate en el orden que la Torá misma da: la Vav (6) construye, la Zayin (7) bendice y santifica. El Midrash lo sella: כָּל הַשְּׁבִיעִין חֲבִיבִין לְעוֹלָם — 'todos los séptimos son amados por siempre' (Vayikrá Rabá 29:11), y lo demuestra recorriendo los siete cielos y las siete tierras. Siete no es 'uno más que seis': es lo que le da sentido a los seis.",
    },
    almas: {
      es: "7 es el alma que se ensancha. Reish Lakish enseña que 'una נְשָׁמָה יְתֵירָה (alma adicional) se le da al hombre en la víspera del Shabat, y al salir el Shabat se la quitan' (Taanit 27b) — y lo deriva de 'שָׁבַת וַיִּנָּפַשׁ' (Éxodo 31:17), leyendo: apenas cesó el Shabat, וַי, ¡ay!, se perdió el alma. Eso es la zayin en ti: el séptimo día no te da descanso, te da MÁS alma. La corona sobre la vav es esa alma de más, que solo llega cuando dejas de trabajar.",
    },
    divinidad: {
      es: "El nombre pleno de la Zayin, זין, suma 67 — exactamente בִּינָה. No es un juego: Biná es la sefirá-Madre de la que nacen las siete sefirot inferiores (Jésed a Maljut), y el Shabat, en la Cabalá, es Biná. Así, la letra número siete lleva dentro de su nombre a la Madre de todos los sietes. Contémplalo: para que el siete exista, alguien tuvo que entenderlo primero. El descanso no es ausencia de acción — es el entendimiento que la acción buscaba.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "El séptimo día: cuando terminar fue bendecir" },
        fuente: {
          es: "Génesis 2:2-3 — 'וַיְבָרֶךְ אֱלֹהִים אֶת יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אֹתוֹ': lo único que la Torá bendice y santifica en toda la creación no es una cosa, es un DÍA. Zayin = 7. Cf. Éxodo 20:8 (זָכוֹר) y Deuteronomio 5:12 (שָׁמוֹר).",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Prohibido salir con la espada en Shabat" },
        fuente: {
          es: "Mishná Shabat 6:4 — 'לֹא יֵצֵא הָאִישׁ לֹא בְסַיִף... וְאִם יָצָא, חַיָּב חַטָּאת'. R. Eliezer: תַּכְשִׁיטִין הֵן לוֹ ('son adorno para él'). Los Sabios: אֵינָן אֶלָּא לִגְנַאי ('no son sino vergüenza'), citando Isaías 2:4 — 'y convertirán sus espadas en arados'. El día de la zayin (7) es el día en que la zayin (arma) se queda en casa.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "¿La Torá se dio el siete de Siván?" },
        fuente: {
          es: "Shabat 86b — 'בְּשִׁשִּׁי בַּחֹדֶשׁ נִיתְּנוּ עֲשֶׂרֶת הַדִּבְּרוֹת לְיִשְׂרָאֵל. רַבִּי יוֹסֵי אוֹמֵר: בְּשִׁבְעָה בּוֹ': los Sabios dicen que las Diez Palabras se dieron el 6 de Siván; R. Yosí, el 7 (cf. Taanit 28b; Yomá 4b). Y Siván es, según Sefer Yetzirá 5:2, el mes de la Zayin. (La convergencia —letra 7, mes de la zayin, día 7— es lectura nuestra, no cita clásica: las fuentes son exactas, el puente entre ellas es drash.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El alma adicional del séptimo día" },
        fuente: {
          es: "Taanit 27b — Reish Lakish: 'נְשָׁמָה יְתֵירָה נִיתְּנָה בּוֹ בָּאָדָם בְּעֶרֶב שַׁבָּת, בְּמוֹצָאֵי שַׁבָּת נוֹטְלִין אוֹתָהּ מִמֶּנּוּ', de 'שָׁבַת וַיִּנָּפַשׁ' (Éxodo 31:17). Cf. Beitzá 16a.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "Todos los séptimos son amados" },
        fuente: {
          es: "Vayikrá Rabá 29:11 — 'כָּל הַשְּׁבִיעִין חֲבִיבִין לְעוֹלָם': el séptimo cielo (עֲרָבוֹת), la séptima tierra (תֵּבֵל), el séptimo de los padres, el séptimo mes, el séptimo año. El siete no es una cantidad: es una preferencia divina.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Zayin: los Gemelos, el mes de Siván, la pierna derecha" },
        fuente: {
          es: "Sefer Yetzirá 5:2 — 'הִמְלִיךְ אוֹת ז׳ וְקָשַׁר לוֹ כֶּתֶר, וְצָר בּוֹ תְּאוֹמִים בָּעוֹלָם, וְסִיוָן בַּשָּׁנָה, וְרֶגֶל יָמִין בַּנֶּפֶשׁ': la Zayin es una de las doce letras SIMPLES (5:1: ה״ו ז״ח ט״י ל״נ ס״ע צ״ק) y le corresponden el signo de Guéminis, el mes de Siván y la pierna derecha. (Honestidad: la fórmula 'y le ató una corona' se usa para las doce letras, no solo para la zayin.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El nombre de la Zayin es Biná: 67 = 67" },
        fuente: {
          es: "Gematría calculada: זין = 7+10+50 = 67; בינה = 2+10+50+5 = 67. Biná es la Madre de las siete sefirot inferiores y, en la Cabalá, la raíz del Shabat. La letra del siete lleva a la Madre del siete escrita en su nombre pleno.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "Or jozer: la luz que vuelve y corona" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/hebleter/zayin.htm) — la zayin es 'una vav cuya cabeza se extiende en ambas direcciones y así aparece como una corona': el אוֹר חוֹזֵר (luz de retorno) que rebota desde abajo con más fuerza que la luz que descendió, hasta lo supraconsciente. 'Este es el secreto del séptimo día de la creación: el Shabat.' Cf. Proverbios 12:4 — אֵשֶׁת חַיִל עֲטֶרֶת בַּעְלָהּ.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Génesis 2:2-3 — el séptimo día, lo único que la Torá bendice y santifica." },
    { es: "Éxodo 20:8 (זָכוֹר) y Deuteronomio 5:12 (שָׁמוֹר) — los dos verbos del Shabat." },
    { es: "Éxodo 31:17 — 'שָׁבַת וַיִּנָּפַשׁ', base de la נשמה יתירה." },
    { es: "Mishná Shabat 6:4 — no salir con espada en Shabat; R. Eliezer (תכשיטין הן לו) vs. los Sabios (אינן אלא לגנאי), citando Isaías 2:4." },
    { es: "Avodá Zará 16a y Makot 10a — כְּלֵי זַיִין ('armamento'): el uso rabínico documentado del nombre zayin." },
    { es: "Taanit 27b (cf. Beitzá 16a) — Reish Lakish sobre el alma adicional del Shabat." },
    { es: "Shabat 86b — 'בששי בחדש ניתנו עשרת הדברות... רבי יוסי אומר בשבעה בו': R. Yosí, la Torá se dio el 7 de Siván (cf. Taanit 28b; Yomá 4b)." },
    { es: "Vayikrá Rabá 29:11 — כָּל הַשְּׁבִיעִין חֲבִיבִין לְעוֹלָם." },
    { es: "Sefer Yetzirá 5:1-2 — Zayin, letra simple: Guéminis (תאומים) · Siván · pierna derecha." },
    { es: "Proverbios 12:4 — אֵשֶׁת חַיִל עֲטֶרֶת בַּעְלָהּ (la corona, en la lectura de Ginsburgh)." },
    { es: "Génesis 45:23 y II Crónicas 11:23 — מָזוֹן (sustento) en el Tanaj; Birkat HaMazón: הַזָּן אֶת הָעוֹלָם כֻּלּוֹ." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' — la zayin como vav coronada y or jozer (luz de retorno)." },
    { es: "Gematrías calculadas: ז = 7 · זין = 7+10+50 = 67 · בינה = 2+10+50+5 = 67." },
    { es: "Nota de precisión: la palabra זַיִן ('arma') no aparece en el Tanaj — es hebreo rabínico. Y el vínculo zayin↔זן/מזון (sustentar) es homilético: son raíces distintas (ז-י-ן vs. ז-ו-ן), no etimología." },
  ],
};
