import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  SHIN (ש) — Data de la vigésima primera letra. Contenido erudito VERIFICADO
//  por el Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Menajot 35a — 'שִׁי״ן שֶׁל תְּפִילִּין הֲלָכָה לְמֹשֶׁה מִסִּינַי' (Abaie): la shin
//     de los tefilín es ley de Moshé desde el Sinaí.
//   · Shulján Aruj, Oraj Jaim 32:42 — la shin del tefilín de la cabeza: a la
//     DERECHA de tres cabezas (ג' ראשים), a la IZQUIERDA de cuatro (ד' ראשים).
//   · Avodá Zará 11a — Onkelos y la mezuzá: el rey de carne y hueso se sienta
//     dentro y sus siervos lo guardan fuera; el Santo, sus siervos dentro y Él
//     los guarda fuera — 'ה׳ יִשְׁמׇר צֵאתְךָ וּבוֹאֶךָ' (Salmos 121:8).
//   · Sefer Yetzirá 3:2-3 — las TRES MADRES אמ״ש; de ellas salen fuego (אש) y
//     agua (מים); los cielos fueron creados del fuego. Shin = una de las madres.
//   · Sefer Yetzirá 3:8 — 'הִמְלִיךְ אוֹת שִׁי״ן בְּאֵשׁ... וְחָתַם בָּהֶן שָׁמַיִם בָּעוֹלָם
//     וְחוֹם בַּשָּׁנָה וְרֹאשׁ בַּנֶּפֶשׁ': shin=fuego, sella cielos, calor y cabeza.
//   · Sefer Yetzirá 1:7 — 'כְּשַׁלְהֶבֶת קְשׁוּרָה בְּגַחֶלֶת' (la llama atada a la brasa).
//   · Génesis 17:1 — 'אֲנִי אֵל שַׁדַּי' (Shaddai), el Nombre a Avraham.
//   · Jueces 7:6-7 — los TRESCIENTOS de Gedeón; Jueces 15:4 — los 300 zorros de
//     Shimshón. Deut. 6:9 / 11:20 — 'וּכְתַבְתָּם עַל מְזוּזוֹת בֵּיתֶךָ' (mezuzá).
//   · Malaquías 3:6 — 'אֲנִי יְהֹוָה לֹא שָׁנִיתִי' (no cambié; raíz שנה, la de la shin).
//   · Devarim Rabá 3:12 — la Torá de fuego blanco escrita en fuego negro.
//   · R. Yitzchak Ginsburgh, 'The Hebrew Letters: Shin' (inner.org/hebleter/shin.htm,
//     VIVO y verificado): la Llama Eterna; shin de 3 cabezas (este mundo) y de 4
//     (mundo venidero); 'la llama atada a la brasa'; brasa/llama-interior/llama-
//     exterior = jash-mal-mal (¡el חשמל del proyecto!); shin de שינוי (cambio); 300
//     une los Nombres.
//
//  Gematrías (calculadas letra por letra, verificadas con Python):
//    ש = 300 · nombre pleno שין = 300+10+50 = 360 · אש (fuego) = 1+300 = 301
//    שן (diente) = 350 · שם (nombre) = 340
//    שדי = 300+4+10 = 314 = מטטרון (40+9+9+200+6+50 = 314)
//    atbash de יהוה → מצפצ = 40+90+80+90 = 300
//    Elokim en miluy: אלף למד הי יוד מם = 300 (los dos Nombres que la shin une)
//
//  NOTA DEL SOFER — precisiones y descartes:
//   1) La tabla inner.org/alefbeit/sigshin da 404, PERO el artículo clásico
//      inner.org/hebleter/shin.htm SÍ está vivo: es la fuente real de todo lo
//      que aquí se atribuye a Ginsburgh (verificado, no de memoria).
//   2) 'Shaddai = שׁוֹמֵר דַּלְתוֹת יִשְׂרָאֵל' (Guardián de las puertas de Israel) es un
//      ACRÓNIMO TRADICIONAL (costumbre y literatura posterior), no anclable a un
//      folio talmúdico exacto → se marca como drash. El tema del guardián sí se
//      ancla a Avodá Zará 11a (la mezuzá) con fuente precisa.
//   3) En Menajot 35a aparece verbatim SOLO la shin ('שי״ן של תפילין'); la dalet
//      (nudo del tefilín de la cabeza) y la yod (nudo del de la mano) que junto a
//      la shin deletrean שדי son de los poskim (Shulján Aruj OC 32), no de esa
//      línea. Se distingue.
//   4) La enseñanza 'las letras de la mentira (שקר) no se sostienen' no se pudo
//      anclar verbatim en Sefaria; el punto 'ninguna mentira perdura sin base de
//      verdad' se atribuye SOLO a Ginsburgh, que sí lo dice, sin cita talmúdica.
//   5) 'שמים = אש + מים' se DESCARTA: Jaguigá 12a dice 'שָׁם מַיִם' (allí hay agua),
//      no esh+mayim; la lectura fuego+agua es cabalística, no aquel dicho.
//   6) Sefer Yetzirá: recensión impresa; el cap. 3 (madres) es estable entre
//      recensiones.
// ─────────────────────────────────────────────────────────────────────────

export const shin: LetterData = {
  slug: "shin",
  letter: "ש",
  nameTranslit: { es: "Shin", en: "Shin", fa: "شین" },
  nameHe: "שִׁין",
  value: 300,

  level1: {
    es: "Mírala: tres llamas que suben desde una sola raíz. No son tres letras — es una, y arde. La Shin es el fuego del alfabeto: su nombre gemelo es אֵשׁ (esh), 'fuego', y el Sefer Yetzirá la nombra una de las tres Madres de la creación, la letra que reina sobre el fuego, los cielos y la cabeza. Es la letra que va en la cabeza de los tefilín y en la puerta de cada hogar judío, en la mezuzá, como inicial del Nombre שַׁדַּי (Shaddai). Pero fíjate en algo que casi nadie mira: en los tefilín hay DOS shins, una de tres cabezas y otra de cuatro. La misma letra, dos formas. Antes de leer una palabra más, quédate con la pregunta que arde en su centro: si la Shin es la llama del cambio, ¿qué es esa brasa inmóvil de la que la llama nunca se separa?",
    en: "Look at it: three flames rising from a single root. Not three letters — one, and it burns. The Shin is the fire of the alphabet: its twin name is אֵשׁ (esh), 'fire,' and the Sefer Yetzirah names it one of the three Mothers of creation, the letter that reigns over fire, the heavens, and the head. It is the letter set on the head of the tefillin and on the doorpost of every Jewish home, in the mezuzah, as the initial of the Name שַׁדַּי (Shaddai). But notice what almost no one notices: on the tefillin there are TWO shins — one of three heads, one of four. The same letter, two forms. Before reading another word, hold the question burning at its center: if the Shin is the flame of change, what is that motionless coal the flame never leaves?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "El nombre שִׁין abre en abanico. Su parentesco más hondo es con אֵשׁ (esh), 'fuego' — la Shin es la letra ígnea por excelencia, y el Sefer Yetzirá lo sella al hacerla reinar 'sobre el fuego' (3:8). Pero la raíz שנ- despliega toda una familia: שֵׁן (shen, 'diente'), שָׁנָה (shaná, 'año' y también 'repetir/enseñar' — de ahí Mishná, lo que se repite), שֵׁנִי (sheni, 'segundo' y 'escarlata'), יָשֵׁן (yashén, 'dormir'), y —la clave que Ginsburgh subraya— שִׁנּוּי (shinui, 'cambio'). La Shin es la letra del cambio.\n\nY aquí conviene la honestidad del Sofer. Se dice mucho que שַׁדַּי (Shaddai) es acrónimo de שׁוֹמֵר דַּלְתוֹת יִשְׂרָאֵל, 'Guardián de las puertas de Israel' — por eso la Shin encabeza la mezuzá que se clava en la jamba de la puerta. Es una enseñanza hermosa y verdadera en su sentido, pero es drash tradicional: no se ancla a un folio exacto, nace en la costumbre y la literatura posterior. Lo que SÍ está documentado con precisión es el Nombre mismo, אֵל שַׁדַּי, revelado a Avraham (Génesis 17:1), y la idea del guardián de la puerta, que el Talmud cuenta con la mezuzá en la boca de Onkelos (Avodá Zará 11a). Sabiendo qué es cita y qué es drash, la Shin de la puerta se recibe entera.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Shin es el fuego que hizo los cielos. El Sefer Yetzirá (3:3) enseña que 'los cielos fueron creados primero del fuego' — y שָׁמַיִם (shamayim), 'cielos', empieza con Shin. Es también שֵׁן, el diente: el poder de moler, de descomponer, la entropía que deshace las formas para que la materia vuelva a circular. Fuego que crea y diente que deshace: la Shin es el motor del cambio en lo creado, la letra que no deja nada quieto en el mundo de abajo.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Shin es tu capacidad de cambiar — שִׁנּוּי, transformación. Toda tarea espiritual del hombre cabe en esa palabra: dejar de ser lo que fui, encender una llama nueva. Pero la letra te enseña algo delicado: el cambio verdadero no niega tu esencia, brota de ella. Como la llama que sube de la brasa: se mueve, danza, nunca es igual dos instantes seguidos — y sin embargo no se despega del carbón inmóvil que la sostiene. Cambiar de verdad no es volverte otro; es dejar que arda por fin lo que siempre fuiste.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Shin toca la paradoja del Creador que cambia el mundo sin cambiar Él. 'אֲנִי יְהֹוָה לֹא שָׁנִיתִי' — 'Yo, Havayá, no he cambiado' (Malaquías 3:6); y fíjate que el verbo mismo, שָׁנִיתִי, lleva la raíz de la Shin: en la letra del cambio está escrita la negación del cambio. Ginsburgh lo llama 'la llama atada a la brasa' (Sefer Yetzirá 1:7): la brasa es la Esencia inmutable; la llama, el poder infinito de cambio que late latente dentro de lo que no cambia, y estalla afuera en la belleza siempre nueva de la creación. La Shin es el punto donde lo eterno y lo que fluye son una sola cosa.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "La Shin es fuego dibujado: tres brazos que suben desde una sola base, tres llamas de una misma raíz. Ginsburgh la llama 'la Llama Eterna'. Y ofrece la clave que casi nadie conoce: la Shin no tiene una sola forma canónica. En la cabeza de los tefilín hay DOS shins repujadas en el cuero — a la derecha, una de TRES cabezas; a la izquierda, una de CUATRO (Shulján Aruj, Oraj Jaim 32:42, ley de Moshé desde el Sinaí). La Cabalá lee: la shin de tres cabezas es la de ESTE mundo; la de cuatro, la del MUNDO VENIDERO.\n\n¿Por qué tres y por qué cuatro? Ginsburgh: en una llama se ven tres niveles —la brasa (esencia inmóvil), la llama interior (el poder latente del cambio) y la llama exterior (el cambio ya en acto). Tres cabezas para los tres. La cuarta cabeza es la revelación futura: cuando la esencia misma de la brasa se muestre dentro de la llama. Y hay un secreto que toca el corazón de este proyecto: esos tres niveles —brasa, llama interior, llama exterior— Ginsburgh los nombra jash-mal-mal, las sílabas mismas del חַשְׁמַל (Jashmal) de Yejezkel. La Shin es la letra donde el jashmal se hace forma.",
    },
    partes: [
      {
        label: { es: "Las tres llamas (las tres cabezas)", en: "The three flames (three heads)", fa: "سه شعله" },
        significado: {
          es: "Los tres brazos que suben. Son la llama entera vista en sus tres niveles: la brasa, la llama interior latente y la llama exterior que danza. Ginsburgh los lee como los tres patriarcas y como las tres columnas del Árbol de la Vida (derecha, izquierda, centro). Tres cabezas: la shin de este mundo, la que llevamos en los tefilín a la derecha.",
        },
        svgPathId: "shin-three-heads",
      },
      {
        label: { es: "La cuarta cabeza (la shin del Mundo Venidero)", en: "The fourth head (the World-to-Come shin)", fa: "سر چهارم" },
        significado: {
          es: "La cabeza que le sobra a la shin de la izquierda del tefilín. No pertenece a este mundo: es la revelación futura, el día en que la esencia inmóvil de la brasa se revele DENTRO de la llama. Si las tres son patriarcas, la cuarta es la dimensión que faltaba; si tres son este mundo, cuatro es el mundo que viene. La misma letra guarda ambos tiempos.",
        },
        svgPathId: "shin-fourth-head",
      },
      {
        label: { es: "La brasa (la base que une)", en: "The coal (the uniting base)", fa: "زغال" },
        significado: {
          es: "El punto donde los tres brazos se juntan y descansan sobre la línea. Es la brasa: la esencia inmóvil de la que toda llama sube sin despegarse jamás. 'La llama atada a la brasa' (Sefer Yetzirá 1:7). Sin este punto de unión no hay tres llamas: hay tres trazos sueltos. La base es lo que no cambia, y por eso el cambio de arriba es real y no se disuelve.",
        },
        svgPathId: "shin-base",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de fuego de la Shin dice cómo se sostiene la creación: no como piedra quieta, sino como llama. Todo lo creado arde y se renueva a cada instante —los cielos hechos de fuego (Sefer Yetzirá 3:3)— y sin embargo no se consume, porque cada llama está atada a una brasa que la alimenta. El mundo es una Shin: movimiento perpetuo anclado en un punto que no se mueve.",
    },
    almas: {
      es: "En el alma, tú tienes las dos shins dentro. La de tres cabezas es tu vida de aquí: cuerpo, mente, acto — la llama que ya arde. La de cuatro es lo que todavía no revelaste, la cabeza de más que solo se enciende cuando tocas tu raíz. Contémplalo así: no te falta una llama, te falta descubrir la cuarta cabeza que ya está en tu letra. Crecer no es añadir; es dejar arder lo latente.",
    },
    divinidad: {
      es: "En lo divino, la Shin es jash-mal-mal: el חשמל hecho forma. Brasa, llama interior, llama exterior — el silencio esencial (jash) y el habla que de él brota (mal). La cuarta cabeza es el instante en que el jash mismo, la Esencia callada, se revela hablando dentro de la llama. Por eso esta es la letra de la casa (mezuzá) y de la cabeza (tefilín): donde Israel guarda, en su umbral y en su frente, el fuego que no se consume.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 300,
    guematriaForma: {
      es: "ש = 300 · nombre pleno שין = 300 + 10 + 50 = 360 · אֵשׁ (fuego) = 1 + 300 = 301. Y el 300 une dos Nombres: יהוה en atbash → מצפצ = 40+90+80+90 = 300, y אלהים en miluy (אלף למד הי יוד מם) = 300",
    },
    mundos: {
      es: "300 es el número de la victoria improbable. Con TRESCIENTOS hombres —los que bebieron lamiendo el agua— Havayá le dijo a Gedeón: 'con estos os salvaré' (Jueces 7:7), y venció a Midián. Con TRESCIENTOS zorros y antorchas atadas cola con cola, Shimshón quemó los campos de los filisteos (Jueces 15:4). El 300 de la Shin es fuego que se enciende cuando el número parece demasiado pequeño: la llama no necesita masa, necesita chispa.",
    },
    almas: {
      es: "300 es el fuego del alma en su justa medida. אֵשׁ, 'fuego', suma 301 — apenas la Shin (300) más el Álef (1), la chispa más la Unidad silenciosa que la enciende. El diente, שֵׁן, suma 350; el nombre, שֵׁם, 340. La Shin te enseña que tu fuego interior no se mide por cuánto ardes, sino por a qué esencia (el Álef, el Uno) está atada tu llama. Un fuego sin Álef es incendio; un fuego con Álef es luz.",
    },
    divinidad: {
      es: "El secreto del 300 lo destila Ginsburgh: es el número que une los dos grandes Nombres de Dios. El Nombre esencial, יהוה (Havayá, el que no cambia), transformado en atbash se vuelve מצפצ = 300. Y el Nombre de la creación, אֱלֹהִים (Elokim, el único Nombre en plural, el de la naturaleza cambiante), escrito en miluy (letra plena) suma también 300. La Shin, 'la llama atada a la brasa', es exactamente eso: 300 = el Nombre inmóvil unido al Nombre del cambio. La letra del fuego lleva, en su número, la unión de lo eterno y lo que fluye.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "אֵל שַׁדַּי: el Nombre que se abre con Shin" },
        fuente: {
          es: "Génesis 17:1 — 'וַיֵּרָא יְהֹוָה אֶל אַבְרָם... אֲנִי אֵל שַׁדַּי, הִתְהַלֵּךְ לְפָנַי וֶהְיֵה תָמִים': el Nombre שַׁדַּי, que encabeza la mezuzá y va en los tefilín, se revela a Avraham. שדי = 314 = מטטרון (el ángel guardián). (Que שדי sea acrónimo de שׁוֹמֵר דַּלְתוֹת יִשְׂרָאֵל es drash tradicional, no cita.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Los trescientos de Gedeón: cuando pocos bastan" },
        fuente: {
          es: "Jueces 7:6-7 — 'שְׁלֹשׁ מֵאוֹת אִישׁ... בִּשְׁלֹשׁ מֵאוֹת הָאִישׁ הַמְלַקְקִים אוֹשִׁיעַ אֶתְכֶם': con 300 hombres Dios salva a Israel de Midián. Cf. Jueces 15:4, los 300 zorros de Shimshón. Shin = 300, el número del fuego que vence sin masa.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "'No he cambiado': el cambio en la letra de lo inmutable" },
        fuente: {
          es: "Malaquías 3:6 — 'כִּי אֲנִי יְהֹוָה לֹא שָׁנִיתִי': 'Yo, Havayá, no he cambiado'. El verbo שָׁנִיתִי lleva la raíz de la Shin (שנה, cambiar): en la letra del cambio se escribe su negación. Es la brasa inmóvil bajo la llama danzante.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "La shin de los tefilín: ley de Moshé desde el Sinaí" },
        fuente: {
          es: "Menajot 35a — Abaie: 'שִׁי״ן שֶׁל תְּפִילִּין הֲלָכָה לְמֹשֶׁה מִסִּינַי'. La forma de la Shin en el cuero del tefilín de la cabeza no es diseño humano: es tradición desde el Sinaí. (En esta línea aparece verbatim solo la shin; la dalet y la yod que con ella deletrean שדי son los nudos, según los poskim.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Dos shins: tres cabezas y cuatro" },
        fuente: {
          es: "Shulján Aruj, Oraj Jaim 32:42 — 'שי״ן של תפילין הלכה למשה מסיני... אחד מימינו ואחד משמאלו, של ימין... של ג׳ ראשים ושל שמאל... של ארבע ראשים': a la derecha la shin de TRES cabezas, a la izquierda la de CUATRO. La Cabalá: tres = este mundo, cuatro = el Mundo Venidero.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La mezuzá: el Rey que guarda desde afuera" },
        fuente: {
          es: "Avodá Zará 11a — Onkelos, tocando la mezuzá: 'מֶלֶךְ בָּשָׂר וָדָם יוֹשֵׁב מִבִּפְנִים וַעֲבָדָיו מְשַׁמְּרִים אוֹתוֹ מִבַּחוּץ, וְאִילּוּ הַקָּדוֹשׁ בָּרוּךְ הוּא, עֲבָדָיו מִבִּפְנִים וְהוּא מְשַׁמְּרָן מִבַּחוּץ' — 'ה׳ יִשְׁמׇר צֵאתְךָ וּבוֹאֶךָ' (Salmos 121:8). La Shin de שַׁדַּי en la puerta: el Guardián de Israel.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "La Torá de fuego blanco escrita en fuego negro" },
        fuente: {
          es: "Devarim Rabá 3:12 — la Torá que Dios entregó a Moshé: 'עוֹרָהּ שֶׁל אֵשׁ לְבָנָה, וּכְתוּבָה בְּאֵשׁ שְׁחוֹרָה, וַחֲתוּמָה בְּאֵשׁ, וּמְלֻפֶּפֶת בְּאֵשׁ' — pergamino de fuego blanco, escrita en fuego negro, sellada y envuelta en fuego. La letra-fuego (Shin, אֵשׁ = 301) es la materia misma de la Torá.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Shin: una de las tres Madres, la que reina sobre el fuego" },
        fuente: {
          es: "Sefer Yetzirá 3:2-3 y 3:8 — las tres Madres son אמ״ש (Álef=aire, Mem=agua, Shin=fuego). 'הִמְלִיךְ אוֹת שִׁי״ן בְּאֵשׁ... וְחָתַם בָּהֶן שָׁמַיִם בָּעוֹלָם וְחוֹם בַּשָּׁנָה וְרֹאשׁ בַּנֶּפֶשׁ': la Shin reina sobre el fuego, y sella los cielos (en el mundo), el calor (en el año) y la cabeza (en el alma).",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "La llama atada a la brasa" },
        fuente: {
          es: "Sefer Yetzirá 1:7 — 'נָעוּץ סוֹפָן בִּתְחִלָּתָן... כְּשַׁלְהֶבֶת קְשׁוּרָה בְּגַחֶלֶת': el fin clavado en el principio, como la llama atada a la brasa. Ginsburgh lee ahí la Shin: la llama (el cambio) inseparable de la brasa (la Esencia que no cambia).",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "300: el Nombre inmóvil unido al Nombre del cambio" },
        fuente: {
          es: "Gematría calculada: יהוה en atbash → מצפצ = 300; אלהים en miluy (אלף למד הי יוד מם) = 300. La Shin (300), 'llama atada a la brasa', une el Nombre esencial (Havayá, lo inmutable) con el Nombre de la naturaleza (Elokim, lo cambiante). Fuente: Ginsburgh, 'The Hebrew Letters: Shin'.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "Jash-mal-mal: el חשמל hecho letra" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Shin' (inner.org/hebleter/shin.htm) — los tres niveles de la llama (brasa · llama interior · llama exterior) corresponden a jash-mal-mal, las sílabas del חַשְׁמַל de Yejezkel 1:4. La cuarta cabeza es la revelación futura: cuando el jash (la Esencia callada) se muestre hablando dentro de la llama.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Génesis 17:1 — 'אֲנִי אֵל שַׁדַּי': el Nombre Shaddai revelado a Avraham." },
    { es: "Deuteronomio 6:9 y 11:20 — 'וּכְתַבְתָּם עַל מְזוּזוֹת בֵּיתֶךָ וּבִשְׁעָרֶיךָ' (el mandamiento de la mezuzá)." },
    { es: "Jueces 7:6-7 — los 300 de Gedeón; Jueces 15:4 — los 300 zorros de Shimshón." },
    { es: "Malaquías 3:6 — 'כִּי אֲנִי יְהֹוָה לֹא שָׁנִיתִי' (la raíz שנה, el cambio, en la negación del cambio)." },
    { es: "Salmos 121:8 — 'ה׳ יִשְׁמׇר צֵאתְךָ וּבוֹאֶךָ' (el guardián, citado por la mezuzá en Avodá Zará 11a)." },
    { es: "Menajot 35a — Abaie: 'שִׁי״ן שֶׁל תְּפִילִּין הֲלָכָה לְמֹשֶׁה מִסִּינַי'." },
    { es: "Shulján Aruj, Oraj Jaim 32:42 — la shin del tefilín de la cabeza: a la derecha de tres cabezas (ג׳ ראשים), a la izquierda de cuatro (ד׳ ראשים)." },
    { es: "Avodá Zará 11a — Onkelos y la mezuzá: el Santo guarda a Sus siervos desde afuera." },
    { es: "Sefer Yetzirá 3:2-3 — las tres Madres אמ״ש; de ellas fuego (אש) y agua (מים); los cielos creados del fuego." },
    { es: "Sefer Yetzirá 3:8 — 'הִמְלִיךְ אוֹת שִׁי״ן בְּאֵשׁ... שָׁמַיִם... חוֹם... רֹאשׁ': Shin=fuego, cielos, calor, cabeza." },
    { es: "Sefer Yetzirá 1:7 — 'כְּשַׁלְהֶבֶת קְשׁוּרָה בְּגַחֶלֶת' (la llama atada a la brasa)." },
    { es: "Devarim Rabá 3:12 — la Torá de fuego blanco escrita en fuego negro." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Shin' (inner.org/hebleter/shin.htm) — la Llama Eterna; shin de 3 y de 4 cabezas (este mundo / Mundo Venidero); jash-mal-mal; shin=שינוי (cambio); 300 une los Nombres." },
    { es: "Gematrías calculadas: ש = 300 · שין = 360 · אֵשׁ = 301 · שֵׁן = 350 · שֵׁם = 340 · שדי = 314 = מטטרון · atbash(יהוה)=מצפצ=300 · miluy de אלהים = 300." },
    { es: "Nota de precisión: 'שַׁדַּי = שׁוֹמֵר דַּלְתוֹת יִשְׂרָאֵל' es acrónimo tradicional (drash), no cita anclada a folio. Y en Menajot 35a aparece verbatim solo la shin; la dalet y la yod (nudos) que deletrean שדי son de los poskim (SA OC 32)." },
  ],
};
