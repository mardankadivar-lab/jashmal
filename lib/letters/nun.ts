import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  NUN (נ) — Data de la decimocuarta letra. Contenido erudito VERIFICADO por
//  el Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Berajot 4b — R. Yojanán: por qué no hay verso con nun en Ashrei (Salmo
//     145): "porque en ella está la caída", con Amós 5:2; la relectura de
//     במערבא ("cayó y no volverá a caer más: ¡levántate!"); Rav Najmán bar
//     Yitzjak: David la sostuvo con Salmo 145:14 (סוֹמֵךְ ה׳ לְכָל הַנֹּפְלִים).
//   · Shabat 104a — la derashá de los niños: נו״ן כפופה נו״ן פשוטה — נאמן כפוף
//     נאמן פשוט; el pasaje se abre invocando a יהושע בן נון.
//   · Rosh Hashaná 21b y Nedarim 38a — 50 puertas de Biná, todas dadas a
//     Moshé menos una (Salmo 8:6, ותחסרהו מעט מאלהים).
//   · Sanedrín 98b — דבי רבי ינאי: יִנּוֹן es nombre del Mashíaj (Salmo 72:17).
//   · Sanedrín 96b — el Mashíaj llamado בַּר נַפְלֵי, "hijo de la caída"
//     (Amós 9:11, la sucá caída de David que será levantada).
//   · Nedarim 54b — Shmuel: "נוּן סָמֶךְ עַיִן — נוּנָא סַמָּא לְעֵינַיִם" (el pez,
//     nuna en arameo, es remedio para los ojos): el nombre-pez, documentado.
//   · Éxodo 33:11 y I Crónicas 7:27 — נוּן bíblica SOLO como el padre de
//     Yehoshúa (en Crónicas escrito נוֹן).
//   · Génesis 48:16 (וְיִדְגּוּ לָרֹב) · Berajot 20a · Bereshit Rabá 97:3 —
//     los peces y el ojo malo; Israel como peces en el agua de la Torá.
//   · Levítico 25:10 (yovel, año 50) y 23:16 (contar 50 días del ómer).
//   · Sefer Yetzirá cap. 5 — Nun letra SIMPLE: Escorpio (עקרב) · Jeshván.
//     Recensión impresa 5:1-2: bazo (טחול); recensión del Gra 5:9: olfato
//     (ריח) e intestinos (דקין). DIVERGENCIA DECLARADA en el texto.
//   · Etz Jaim, Sháar 1 (Drush Igulim veYosher), Anaf 2 [Sefaria: Sefer Etz
//     Chaim 1:2] — el קו: "המשיך מן אור א"ס קו א' ישר... ומשתלשל ויורד תוך החלל".
//   · R. Yitzchak Ginsburgh, tabla oficial de la Nun (inner.org/alefbeit/signun,
//     descargada y verificada): concepto "la caída desde el no-ego a la
//     autoconsciencia"; sentidos "pez; reino; heredero real"; forma "ángulo
//     doblado (el siervo inclinado) con una corona encima; la nun final: la
//     misma figura con la base desplomada en extensión vertical"; Escorpio ·
//     Mar-Jeshván · intestinos · olfato · arquetipo Menashé · canal Netzaj→Yesod.
//  Gematrías (calculadas letra por letra):
//    נ = 50 · nombre pleno נון = 50+6+50 = 106 · קו = 100+6 = 106 (¡igualdad!)
//    בינה = 2+10+50+5 = 67 (solo referencia; no se usa aquí como equivalencia).
//
//  NOTA DEL SOFER — descartado o marcado por no verificable:
//   · La lectura popular "doblado en este mundo, erguido en el Mundo Venidero"
//     NO pudo anclarse a Rashi (Rashi sobre Shabat 104a, ed. Sefaria, no trae
//     ese comentario): se ofrece como contemplación nuestra, sin atribución.
//   · Midrash Tehilim 145 (ed. Sefaria) NO trae el pasaje de la nun faltante;
//     la fuente real es Berajot 4b. Se descartó citarlo como midrash.
//   · "מפלתן של שונאי ישראל" en Berajot 4b es eufemismo de los escribas: los
//     "enemigos de Israel" son Israel mismo (lo prueba el propio versículo,
//     בתולת ישראל). Se explica así en el texto.
//   · El puente 50 puertas ↔ verso ausente de Ashrei, y el puente נון = קו,
//     son drash nuestro: la aritmética está verificada, el vínculo se declara.
//   · De Ginsburgh solo se afirma lo que está en la tabla signun (viva hoy);
//     nada citado de memoria del libro.
// ─────────────────────────────────────────────────────────────────────────

export const nun: LetterData = {
  slug: "nun",
  letter: "נ",
  nameTranslit: { es: "Nun", en: "Nun", fa: "نون" },
  nameHe: "נוּן",
  value: 50,

  level1: {
    es: "Hay un salmo que David construyó como un alfabeto: el 145, el Ashrei, un verso por cada letra. Y cuando llega el turno de la Nun... no hay verso. David la saltó. El Talmud pregunta por qué y responde sin anestesia: porque en la nun vive la caída — נָפְלָה, 'cayó la virgen de Israel' (Amós 5:2). Y sin embargo, mira lo que hace David un verso después: סוֹמֵךְ ה׳ לְכָל הַנֹּפְלִים, 'sostiene el Eterno a todos los caídos'. Saltó la letra y sostuvo a los que la letra nombra. Y el mismo Talmud dice que el Mashíaj se llama יִנּוֹן — un nombre hecho de nun. La letra de la caída es el nombre del que levanta. Antes de seguir, quédate con esa pregunta: ¿por qué el que va a levantar el mundo lleva por nombre la letra que David no se atrevió a escribir?",
    en: "There is a psalm David built as an alphabet: Psalm 145, the Ashrei, one verse per letter. When the Nun's turn comes... there is no verse. David skipped it. The Talmud asks why and answers without anesthesia: because the fall lives in the nun — נָפְלָה, 'fallen is the virgin of Israel' (Amos 5:2). And yet, look at what David does one verse later: 'the Eternal supports all who fall'. He skipped the letter and upheld the ones the letter names. And the same Talmud says the Mashiach is named יִנּוֹן — a name built of nun. The letter of falling is the name of the one who lifts. Stay with that question: why does the one who will raise the world bear the letter David did not dare to write?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "Empecemos por la honestidad lexicográfica, porque aquí casi todo lo que se repite necesita matiz. Como palabra común, נוּן no existe en el hebreo del Tanaj: en toda la Biblia aparece únicamente como nombre propio — el padre de Yehoshúa, יְהוֹשֻׁעַ בִּן נוּן (Éxodo 33:11 y decenas de veces más; en I Crónicas 7:27, escrito נוֹן). Donde nun sí significa algo es en ARAMEO: nun/nuna es 'pez'. Y eso no es conjetura, está documentado con precisión deliciosa: Shmuel enseña en Nedarim 54b una regla mnemotécnica — נוּן סָמֶךְ עַיִן: נוּנָא סַמָּא לְעֵינַיִם, 'nun-sámej-ayin: el pez (nuna) es remedio (sama) para los ojos (einayim)'. Fíjate: el recordatorio son tres letras consecutivas del alfabeto — nun, sámej, ayin — y la primera es el pez mismo. Es lexicografía aramea, no etimología hebrea, y así hay que decirlo.\n\nHay además una raíz verbal hebrea, rarísima: en el Salmo 72:17, un salmo sobre el rey, aparece יִנּוֹן — 'ante el sol retoñará (o perdurará) su nombre'. Es un hapax: una palabra que ocurre una sola vez en toda la Escritura, entendida como 'propagarse, perpetuarse, retoñar'. De ese verbo único los Sabios harán un nombre del Mashíaj (Sanedrín 98b).\n\nRav Ginsburgh resume los sentidos de la letra así: 'pez; reino; heredero real' (tabla de la Nun, inner.org). Y la derashá talmúdica del alfabeto añade el cuarto sentido, el moral: nun = נֶאֱמָן, 'el fiel' (Shabat 104a). Pez, retoño, heredero, fiel: cuatro caras de una misma vida que crece oculta y no traiciona.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Nun es la vida que prospera escondida. El pez vive bajo la superficie: no lo ves, y por eso mismo se multiplica. Cuando Yaakov bendice a los hijos de Yosef — Menashé y Efraim, y Menashé es precisamente el arquetipo que Ginsburgh asigna a la Nun — les dice וְיִדְגּוּ לָרֹב בְּקֶרֶב הָאָרֶץ, 'que se multipliquen como peces en medio de la tierra' (Génesis 48:16). Y los Sabios explican por qué peces: 'así como a los peces del mar el agua los cubre y el ojo malo no los domina...' (Berajot 20a). Lo que el mundo no ve, el mundo no lo puede envidiar ni gastar. La fecundidad de la nun es la de todo lo que crece sin exhibirse: la raíz, el embrión, el pez.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Nun es el fiel. La derashá de Shabat 104a lo dice en cuatro palabras: נֶאֱמָן כָּפוּף, נֶאֱמָן פָּשׁוּט — 'fiel doblado, fiel erguido'. Y el Tanaj te da el rostro de esa fidelidad en el único Nun bíblico: Yehoshúa bin Nun, de quien está escrito נַעַר לֹא יָמִישׁ מִתּוֹךְ הָאֹהֶל — el servidor que 'no se apartaba de la tienda' (Éxodo 33:11). El hijo de Nun no fundó nada propio durante cuarenta años: sirvió. Y precisamente él heredó. El alma-nun es esa lealtad que no depende de la postura: doblada por el peso o erguida en la victoria, es la misma. La pregunta de la nun no es '¿cuánto brillas?', sino '¿sigues ahí cuando nadie mira?'.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Nun es el nombre escondido del Mashíaj. 'La escuela de Rabí Yanai decía: יִנּוֹן es su nombre, como está dicho: ante el sol retoña su nombre' (Sanedrín 98b, sobre Salmo 72:17). Ginsburgh lee la nun como 'reino' y 'heredero real': la realeza que aún no reina, el heredero que espera su hora como el pez bajo el agua — vivo, creciendo, invisible. El salmo dice lifnei shemesh: ANTES del sol, por debajo de la historia visible, ese nombre ya está retoñando. La divinidad de la nun no es la del trono: es la de la semilla del trono.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "La Nun tiene dos formas, y el Talmud las lee juntas: נו״ן כְּפוּפָה, נו״ן פְּשׁוּטָה — נֶאֱמָן כָּפוּף, נֶאֱמָן פָּשׁוּט: 'nun doblada, nun extendida — fiel doblado, fiel erguido' (Shabat 104a). Es la derashá que unos niños trajeron a la casa de estudio, y la Guemará la presenta con un guiño que parece puesto ahí para nosotros: dijeron cosas 'que ni en los días de יְהוֹשֻׁעַ בִּן נוּן se habían dicho'. Para hablar de la nun, el Talmud invoca al hijo de Nun.\n\nGinsburgh describe el trazo con exactitud: 'un ángulo doblado (el siervo inclinado), con una corona en su parte superior. La nun final: la misma figura con la base desplomada en extensión vertical' (tabla de la Nun, inner.org). Míralo: la nun doblada es un siervo con la espalda curvada — y sobre la cabeza lleva corona. El siervo es heredero. Y la nun final hace algo que casi ninguna letra hace: su trazo ATRAVIESA la línea de escritura y sigue bajando, por debajo del renglón donde viven las demás letras. La 'erguida' no es la que subió: es la que se atrevió a bajar más.",
    },
    partes: [
      {
        label: { es: "La corona (la cabeza)", en: "The crown (the head)", fa: "تاج" },
        significado: {
          es: "El remate superior del trazo: la 'corona encima' que describe Ginsburgh. Es la firma de la paradoja: la letra del siervo inclinado y de la caída lleva realeza en la cabeza. El heredero real no se reconoce por el trono sino por la corona que carga mientras sirve. La nun te enseña a mirar a los doblados con atención: algunos llevan corona.",
        },
        svgPathId: "nun-crown",
      },
      {
        label: { es: "El cuerpo doblado (el descenso)", en: "The bent body (the descent)", fa: "پیکر خمیده" },
        significado: {
          es: "El trazo vertical que baja curvándose: el siervo inclinado. Es la espalda del נֶאֱמָן כָּפוּף, el fiel doblado de Shabat 104a. Doblarse no es quebrarse: la curva de la nun es la de quien carga peso sin soltar lo que sostiene. Aquí vive también la caída de la letra — נָפְלָה — como posibilidad permanente: todo lo que baja puede caer; no todo lo que cae deja de ser fiel.",
        },
        svgPathId: "nun-body",
      },
      {
        label: { es: "La base (que en la final se desploma)", en: "The base (dropped in the final form)", fa: "پایه" },
        significado: {
          es: "El pie horizontal sobre el que la nun doblada se asienta en el renglón. En la nun final (ן) esa base se suelta y cae en vertical, por debajo de la línea de escritura — 'la base desplomada en extensión vertical' (Ginsburgh). La forma final de la fidelidad no es sentarse en la línea: es poder descender por debajo de ella sin dejar de ser recta.",
        },
        svgPathId: "nun-base",
      },
    ],
    mundos: {
      es: "En los mundos, la forma doblada de la nun es la postura de casi todo lo que vive: el tallo bajo el viento, el agua que solo sabe ir hacia abajo, el pez curvado en su nado. La creación entera se sostiene doblándose; lo rígido se quiebra. La nun kefufá, asentada en su base sobre el renglón, es el mundo tal como es: inclinado, cargando, y aún así coronado.",
    },
    almas: {
      es: "En el alma, las dos nun son una sola fidelidad en dos posturas. Hay épocas nun doblada: cargas, sirves, te inclinas, y la tentación es creer que doblarse es traicionarse. La letra dice lo contrario: נֶאֱמָן כָּפוּף — también doblado se es fiel. Y hay épocas nun extendida. La lectura tradicional ve en ellas este mundo y el venidero; el Talmud, en rigor, solo pone las dos palabras juntas — fiel doblado, fiel erguido — y quizás ese silencio es la enseñanza: no dice 'primero una, luego la otra'. Las dos son verdad a la vez.",
    },
    divinidad: {
      es: "En lo divino, mira dónde termina la nun final: por debajo de la línea, más abajo que cualquier letra de la palabra. Ahí está el secreto de סוֹמֵךְ ה׳ לְכָל הַנֹּפְלִים (Salmo 145:14): para sostener 'a TODOS los caídos' hay que llegar por debajo del punto donde cae el último. La nun peshutá es la plomada de esa fidelidad divina: una rectitud que no se demuestra subiendo, sino descendiendo hasta donde nadie más baja — y sin torcerse.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 50,
    guematriaForma: {
      es: "נ = 50 · nombre pleno נון = 50 + 6 + 50 = 106 = קו (100 + 6), la 'línea' del Arí · las 50 puertas de Biná (Rosh Hashaná 21b)",
    },
    mundos: {
      es: "50 es, en la Torá, el número de la liberación y del umbral. El año cincuenta es el yovel: וְקִדַּשְׁתֶּם אֵת שְׁנַת הַחֲמִשִּׁים שָׁנָה וּקְרָאתֶם דְּרוֹר בָּאָרֶץ — 'santificarán el año cincuenta y proclamarán libertad en la tierra... y volveréis cada uno a su posesión' (Levítico 25:10). Y del ómer está escrito: תִּסְפְּרוּ חֲמִשִּׁים יוֹם — 'contaréis cincuenta días' (Levítico 23:16): cuarenta y nueve peldaños contados uno a uno, y el quincuagésimo, Shavuot, que ya no se sube: se recibe. En el mundo, 50 es lo que está un paso más allá de todo lo que puedes acumular contando.",
    },
    almas: {
      es: "50 son las puertas del entendimiento: 'Cincuenta puertas de Biná fueron creadas en el mundo, y todas fueron dadas a Moshé menos una, como está dicho: lo hiciste poco menor que Dios' (Rosh Hashaná 21b; igual en Nedarim 38a, en nombre de Rav y Shmuel, con Salmo 8:6). Ni el más grande de los profetas cruzó la puerta cincuenta. El alma-nun vive con eso: un entendimiento completo al que siempre le falta exactamente uno. Y aquí se tocan los dos misterios de la letra — esto es lectura nuestra, no cita — : igual que a Moshé le fue retenida la puerta 50, a David se le retuvo el verso de la nun. La perfección de un alfabeto con un hueco: eso es conocer en este mundo.",
    },
    divinidad: {
      es: "El nombre pleno de la letra, נון, suma 106. Y 106 es exactamente קַו (100 + 6): la Línea. En la cosmología del Arí, tras la contracción quedó el espacio vacío, 'y entonces extrajo de la luz del Ein Sof una línea (קו) recta... que desciende encadenándose dentro de ese vacío' (Etz Jaim, Sháar 1, Drush Igulim veYosher, Anaf 2). La aritmética es verificable; el puente es drash nuestro, y decláralo así — pero contémplalo: la letra cuyo tema es descender y caer lleva, en la suma de su nombre, el nombre del rayo de luz que desciende al abismo sin perderse. Todo lo creado cuelga de una línea que bajó. La nun lo sabe desde su nombre.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "Yinón: el nombre que retoña ante el sol" },
        fuente: {
          es: "Salmo 72:17 — יְהִי שְׁמוֹ לְעוֹלָם לִפְנֵי שֶׁמֶשׁ יִנּוֹן שְׁמוֹ: 'sea su nombre para siempre; ante el sol retoñe (yinón) su nombre'. Es un hapax — la palabra aparece una sola vez en todo el Tanaj — en el salmo del rey ideal (el ketiv trae ינין; el keré, יִנּוֹן). De aquí Sanedrín 98b hará un nombre del Mashíaj.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Yehoshúa bin Nun: el siervo que no se aparta" },
        fuente: {
          es: "Éxodo 33:11 — וּמְשָׁרְתוֹ יְהוֹשֻׁעַ בִּן נוּן נַעַר לֹא יָמִישׁ מִתּוֹךְ הָאֹהֶל: 'y su servidor, Yehoshúa bin Nun, joven, no se apartaba de la tienda'. נוּן aparece en el Tanaj únicamente como este nombre (en I Crónicas 7:27, escrito נוֹן בְּנוֹ יְהוֹשֻׁעַ בְּנוֹ). El único Nun de la Biblia es el padre del fiel por excelencia.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "El verso que falta en Ashrei" },
        fuente: {
          es: "Berajot 4b — אָמַר רַבִּי יוֹחָנָן: מִפְּנֵי מָה לֹא נֶאֱמַר נוּן בְּ׳אַשְׁרֵי׳ — מִפְּנֵי שֶׁיֵּשׁ בָּהּ מַפַּלְתָּן שֶׁל שׂוֹנְאֵי יִשְׂרָאֵל ('enemigos de Israel' es eufemismo de los escribas: Israel mismo), citando Amós 5:2 — נָפְלָה לֹא תוֹסִיף קוּם בְּתוּלַת יִשְׂרָאֵל. En Occidente (Éretz Israel) lo re-puntuaban: נָפְלָה וְלֹא תוֹסִיף לִנְפּוֹל עוֹד — קוּם בְּתוּלַת יִשְׂרָאֵל: 'cayó, y no volverá a caer: ¡levántate, virgen de Israel!'. Y Rav Najmán bar Yitzjak: aun así, David volvió y los sostuvo con el espíritu santo — סוֹמֵךְ ה׳ לְכָל הַנֹּפְלִים (Salmo 145:14, el verso de la sámej: la letra siguiente sostiene a la ausente).",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Fiel doblado, fiel erguido" },
        fuente: {
          es: "Shabat 104a — נו״ן כְּפוּפָה נו״ן פְּשׁוּטָה — נֶאֱמָן כָּפוּף נֶאֱמָן פָּשׁוּט. Es la derashá del alfabeto que unos niños (דרדקי) trajeron a la casa de estudio y los Sabios contaron a R. Yehoshúa ben Leví: dijeron cosas 'que ni en los días de יְהוֹשֻׁעַ בִּן נוּן se habían dicho' — el pasaje sobre la nun se abre invocando al único Nun del Tanaj.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Bar Nafli: el Mashíaj, hijo de la caída" },
        fuente: {
          es: "Sanedrín 96b — Rav Najmán a R. Yitzjak: '¿oíste cuándo viene בַּר נַפְלֵי?' '¿Quién es Bar Nafli?' 'El Mashíaj.' '¿Al Mashíaj lo llamas hijo de la caída?' 'Sí, pues está escrito: en aquel día levantaré אֶת סוּכַּת דָּוִד הַנֹּפֶלֶת, la sucá caída de David' (Amós 9:11). Y Sanedrín 98b — דְּבֵי רַבִּי יַנַּאי אָמְרִי: יִנּוֹן שְׁמוֹ (Salmo 72:17). El mismo profeta, Amós, da la caída (5:2) y el levantamiento (9:11); el redentor lleva ambos en sus nombres: hijo de la caída, y Yinón, el que retoña.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "Israel, peces en el agua de la Torá" },
        fuente: {
          es: "Bereshit Rabá 97:3 (sobre Génesis 48:16, וְיִדְגּוּ לָרֹב) — 'así como a estos peces el ojo no los domina, así a tus hijos...'; y: 'así como estos peces crecen en el agua, y cuando baja una gota de lo alto la reciben con sed como quien nunca probó agua, así Israel crece en el agua de la Torá: cuando oyen una palabra nueva de la Torá la reciben con sed como quien nunca oyó palabra de Torá'. Cf. Berajot 20a sobre la simiente de Yosef. La nun-pez es esa sed: vivir dentro del agua y seguir sediento de ella.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Nun: Escorpio, el mes de Jeshván" },
        fuente: {
          es: "Sefer Yetzirá, cap. 5 — la Nun es una de las doce letras SIMPLES (ה״ו ז״ח ט״י ל״נ ס״ע צ״ק): 'hizo reinar a la letra nun, le ató una corona, y formó con ella a Escorpio (עקרב) en el mundo y a Marjeshván en el año' (recensión impresa, 5:1-2). Honestidad textual: las recensiones difieren en el resto — la impresa le asigna el bazo (טחול); la del Gra (5:9), el sentido del olfato (ריח) y los intestinos (דקין). Ginsburgh sigue la línea del Gra: intestinos y olfato. (La fórmula 'le ató una corona' se dice de las doce simples, no solo de la nun.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Las cincuenta puertas de Biná" },
        fuente: {
          es: "Rosh Hashaná 21b — חֲמִשִּׁים שַׁעֲרֵי בִינָה נִבְרְאוּ בָּעוֹלָם וְכוּלָּן נִיתְּנוּ לְמֹשֶׁה חָסֵר אֶחָד, con Salmo 8:6 (וַתְּחַסְּרֵהוּ מְעַט מֵאֱלֹהִים); igual en Nedarim 38a en nombre de Rav y Shmuel. La Cabalá hizo de estas 50 puertas la anatomía de Biná, el Entendimiento; la nun, valor 50, es su letra-cifra: el entendimiento completo cuya última puerta permanece del otro lado.",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "נון = 106 = קו: la Línea que baja al vacío" },
        fuente: {
          es: "Gematría calculada: נון = 50+6+50 = 106; קו = 100+6 = 106. El קו es la línea de luz del Arí: tras el tzimtzum, 'extrajo de la luz del Ein Sof una línea recta desde su luz circular, de arriba hacia abajo, que desciende encadenándose dentro de aquel vacío' (Etz Jaim, Sháar 1, Drush Igulim veYosher, Anaf 2 [Sefaria: Sefer Etz Chaim 1:2]). La igualdad numérica es aritmética verificada; leerla como vínculo nun↔kav es drash nuestro, declarado como tal.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "La caída desde el no-yo a la autoconsciencia" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (tabla de la Nun, inner.org/alefbeit/signun) — concepto de la letra: 'la caída desde la ausencia de ego hacia la autoconsciencia'; sentidos: 'pez; reino; heredero real'; arquetipo: Menashé; canal: de Netzaj (victoria/eternidad) a Yesod (fundamento). El pez no sabe que está en el agua — hasta que cae fuera de ella y aparece el yo. Toda autoconsciencia es una pequeña caída; la avodá de la nun es que esa caída se vuelva heredero: que el yo caído sirva, fiel, al Reino.",
        },
        href: "/arbol",
      },
    ],
  },

  fuentes: [
    { es: "Berajot 4b — R. Yojanán sobre el verso ausente de la nun en Ashrei (Salmo 145), con Amós 5:2; la relectura de במערבא; Rav Najmán bar Yitzjak con Salmo 145:14. (Contexto: quien recita el Salmo 145 tres veces al día 'es hijo del Mundo Venidero', R. Elazar en nombre de R. Aviná, ibíd.)" },
    { es: "Amós 5:2 — נָפְלָה לֹא תוֹסִיף קוּם בְּתוּלַת יִשְׂרָאֵל; y Amós 9:11 — la sucá caída de David que será levantada." },
    { es: "Salmo 145:14 — סוֹמֵךְ ה׳ לְכָל הַנֹּפְלִים וְזוֹקֵף לְכָל הַכְּפוּפִים (el verso de la sámej)." },
    { es: "Shabat 104a — נו״ן כפופה נו״ן פשוטה — נאמן כפוף נאמן פשוט; la derashá de los niños, presentada como cosas no dichas 'ni en los días de Yehoshúa bin Nun'." },
    { es: "Rosh Hashaná 21b y Nedarim 38a — las 50 puertas de Biná dadas a Moshé menos una; Salmo 8:6." },
    { es: "Sanedrín 98b — יִנּוֹן שְׁמוֹ (escuela de R. Yanai), sobre Salmo 72:17; Sanedrín 96b — el Mashíaj como בַּר נַפְלֵי, por Amós 9:11." },
    { es: "Salmo 72:17 — לִפְנֵי שֶׁמֶשׁ יִנּוֹן שְׁמוֹ (hapax; ketiv ינין, keré יִנּוֹן)." },
    { es: "Nedarim 54b — Shmuel: נוּן סָמֶךְ עַיִן — נוּנָא סַמָּא לְעֵינַיִם: nun/nuna = 'pez' en arameo, documentado." },
    { es: "Éxodo 33:11 — Yehoshúa bin Nun, el servidor que no se aparta de la tienda; I Crónicas 7:27 — נוֹן בְּנוֹ." },
    { es: "Génesis 48:16 — וְיִדְגּוּ לָרֹב; Berajot 20a y Bereshit Rabá 97:3 — los peces, el ojo malo, e Israel como peces en el agua de la Torá." },
    { es: "Levítico 25:10 — el yovel, año 50, proclamación de libertad; Levítico 23:15-16 — contar 50 días hasta la ofrenda nueva (Shavuot)." },
    { es: "Sefer Yetzirá cap. 5 — Nun, letra simple: Escorpio · Jeshván. Recensión impresa (5:1-2): bazo; recensión del Gra (5:9): olfato e intestinos. Divergencia declarada." },
    { es: "Etz Jaim, Sháar 1 (Drush Igulim veYosher), Anaf 2 [Sefaria: Sefer Etz Chaim 1:2] — el קו, la línea de luz que desciende al vacío tras el tzimtzum." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' — tabla de la Nun (inner.org/alefbeit/signun): caída del no-ego a la autoconsciencia; pez/reino/heredero real; siervo inclinado con corona; Escorpio · Mar-Jeshván · intestinos · olfato · Menashé · canal Netzaj→Yesod." },
    { es: "Gematrías calculadas: נ = 50 · נון = 50+6+50 = 106 · קו = 100+6 = 106." },
    { es: "Nota de precisión: נוּן como sustantivo común no existe en el hebreo bíblico (solo como nombre propio); 'pez' es su sentido en arameo. 'מפלתן של שונאי ישראל' es eufemismo de los escribas por Israel mismo. La lectura 'doblado en este mundo, erguido en el venidero' no está en la Guemará ni pudo anclarse a Rashi: se ofrece como contemplación, no como cita. Los puentes nun↔50 puertas↔verso ausente y נון=קו son drash nuestro sobre aritmética y fuentes verificadas." },
  ],
};
