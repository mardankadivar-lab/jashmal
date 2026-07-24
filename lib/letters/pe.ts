import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  PE (פ) — Data de la decimoséptima letra. Contenido erudito VERIFICADO por
//  el Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Números 12:8 — פֶּה אֶל פֶּה אֲדַבֶּר בּוֹ ("boca a boca hablo con él"): el
//     grado profético de Moshé. Verificado en hebreo (context=0).
//   · Éxodo 4:10 — כְבַד פֶּה וּכְבַד לָשׁוֹן (Moshé "pesado de boca"); 4:16 —
//     Aharón será לְפֶה ("como boca") de Moshé. (Ginsburgh: arquetipo de la פ = Aharón.)
//   · Éxodo 7:7 — Moshé בֶּן שְׁמֹנִים שָׁנָה (80 años) ante el Faraón. El versículo
//     mismo cierra con una פ (petujá) en el texto masorético.
//   · Mishná Avot 5:21 — בֶּן שְׁמֹנִים לַגְּבוּרָה ("a los 80, la fuerza/gevurá").
//   · Mishná Avot 5:6 — las tres "bocas" creadas en el crepúsculo: פִּי הָאָרֶץ,
//     פִּי הַבְּאֵר, פִּי הָאָתוֹן. Avot 5:1 — el mundo creado con עֲשָׂרָה מַאֲמָרוֹת.
//   · Shabat 104a — la homilía de los דַּרְדְּקֵי: "פ׳ כְּפוּפָה, פ׳ פְּשׁוּטָה —
//     פֶּה פָּתוּחַ, פֶּה סָתוּם" (pe doblada / pe extendida = boca abierta / boca
//     cerrada); y "מַנְצְפַךְ צוֹפִים אֲמָרוּם" (las finales, incl. ף, las fijaron los
//     videntes). Verificado segmento por segmento.
//   · Vayikrá Rabá 33:1 — abre con Proverbios 18:21 (מָוֶת וְחַיִּים בְּיַד לָשׁוֹן)
//     y Áquilas: מָוֶת מִכָּאן וְחַיִּים מִכָּאן (muerte de un lado, vida del otro).
//   · Salmos 33:6 — בִּדְבַר ה' שָׁמַיִם נַעֲשׂוּ וּבְרוּחַ פִּיו (creación por la boca).
//   · Sefer Yetzirá 4 — la פ es letra DOBLE (בג"ד כפר"ת), de sonido doble
//     (פּ/פ, dura/blanda). Su DÍA es el quinto (jueves) en AMBAS recensiones.
//     Su planeta/órgano/cualidad DIFIEREN entre recensiones (ver nota).
//   · Sefer Yetzirá 1:3 — la בְּרִית מְכֻוֶּנֶת בָּאֶמְצַע es doble: מִילַת הַלָּשׁוֹן
//     (circuncisión de la lengua = la boca) y מִילַת הַמָּעוֹר. 1:8 (impresa) —
//     בְּלוֹם פִּיךָ מִלְּדַבֵּר ("frena tu boca de hablar"), con Yejezkel 1: רָצוֹא וָשׁוֹב.
//
//  Gematrías (calculadas letra por letra):
//    פ = 80 · nombre פֵּה = 80 + 5 = 85 = מִילָה (circuncisión) = 40+10+30+5 = 85.
//    (Ortografía alterna del nombre: פֵּא = 80+1 = 81 — se anota, no se usa.)
//
//  NOTA DEL SOFER — recensiones y descartes:
//   1) Sefer Yetzirá difiere en la פ según la recensión. Versión IMPRESA: פ →
//      נוֹגַהּ (Venus) · נְחִיר יָמִין (fosa nasal derecha) · cualidad חֵן/gracia
//      (por el orden de יסודן). Versión del GRA: פ → כּוֹכָב (Mercurio) · אֹזֶן שְׂמֹאל
//      (oído izquierdo) · cualidad מֶמְשָׁלָה/dominio (opuesto עַבְדוּת). Ginsburgh
//      (inner.org/alefbeit/sigpei) sigue al Gra: Mercurio, jueves, oído izquierdo,
//      "Gift: Authority" (=מֶמְשָׁלָה). Ambas recensiones coinciden solo en el DÍA
//      (jueves). Se declara la divergencia; no se elige una como "la" verdad.
//   2) El par שָׁלוֹם/מִלְחָמָה (paz/guerra) que la pista sugería para la פ NO le
//      corresponde: en la recensión del Gra ese par es de la ר (רֵישׁ). Verificado.
//   3) פֶּה (raíz פ-ה / פ-י-ה) y פָּנִים (rostro, raíz פ-נ-ה) NO comparten raíz:
//      se distinguen, no se funden.
//   4) La lectura פֶּסַח = פֶּה סָח ("la boca que relata") se conserva SOLO como
//      drash tradicional marcado, sin anclarla a folio: es homilía, no cita.
//   5) Ginsburgh NO asigna sendero del Árbol a la פ; solo el canal Gevurá→Hod.
// ─────────────────────────────────────────────────────────────────────────

export const pe: LetterData = {
  slug: "pe",
  letter: "פ",
  nameTranslit: { es: "Pe", en: "Peh", fa: "پِه" },
  nameHe: "פֵּה",
  value: 80,

  level1: {
    es: "Su nombre es una palabra que dices con ella: פֶּה significa 'boca'. Es la letra del habla — y su forma lo dibuja. Míralas: la פ es una cabeza de perfil con la boca abierta, y adentro, recogido hacia dentro, un diente. La boca que habla lleva un diente escondido. Y hay más: la פ es una de las siete letras 'dobles', las que suenan de dos maneras — פּ dura (P) y פ blanda (F). Una sola boca, dos sonidos. Por eso el Talmud, cuando llega a esta letra, no dice una cosa sino dos a la vez: פֶּה פָּתוּחַ, פֶּה סָתוּם — boca abierta, boca cerrada (Shabat 104a). Esta es la letra que sostiene el secreto entero de este proyecto, porque 'Jashmal' es justamente eso: jash, callar; mal, hablar. Antes de leer una palabra más, quédate con la pregunta de la boca: ¿cuándo hablar y cuándo callar — y cómo sabe la boca la diferencia?",
    en: "Its name is a word you make with it: פֶּה means 'mouth'. It is the letter of speech — and its very shape draws one. Look: the פ is a head in profile with its mouth open, and inside, curled inward, a tooth. The speaking mouth carries a hidden tooth. And there is more: the פ is one of the seven 'double' letters, the ones that sound two ways — hard פּ (P) and soft פ (F). One mouth, two sounds. This is why the Talmud, reaching this letter, says not one thing but two at once: peh patuach, peh satum — an open mouth, a closed mouth (Shabbat 104a). This is the letter that holds the whole secret of this project, for 'Jashmal' is exactly that: chash, to be silent; mal, to speak. Before reading one more word, sit with the mouth's question: when to speak and when to be silent — and how does the mouth know the difference?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "פֶּה (pe) significa 'boca', y a diferencia del nombre de la zayin, este SÍ es una palabra bíblica de las más frecuentes: la Torá la usa a cada paso. El versículo que más alto la eleva es Números 12:8, donde Dios describe cómo le habla a Moshé: פֶּה אֶל פֶּה אֲדַבֶּר בּוֹ — 'boca a boca hablo con él, y a la vista, no en enigmas'. Ese es el grado más alto de la profecía: no visiones veladas, sino palabra directa, boca contra boca.\n\nRav Ginsburgh (inner.org, The Hebrew Letters) resume la letra en una frase: 'la comunicación oral del conocimiento', y da su significado como 'una boca; aquí'. Vale la pena detenerse en ese 'aquí': las mismas letras פ-ה, vocalizadas פֹּה (po), quieren decir 'aquí'. La boca es el lugar donde el pensamiento —que estaba en ningún sitio, adentro, oculto— por fin se hace 'aquí', presente, audible. Hablar es traer algo al aquí.\n\nUna honestidad de raíz: פֶּה (boca) NO comparte raíz con פָּנִים (rostro). Se parecen y se tocan —el rostro rodea a la boca— pero פה viene de פ-ה/פ-י-ה y פנים de פ-נ-ה: son familias distintas. No las fundimos. Y el arquetipo que Ginsburgh asigna a la פ no es casual: es Aharón, el hermano de Moshé. Porque Moshé era כְּבַד פֶּה, 'pesado de boca' (Éxodo 4:10), y Dios le dio a Aharón para que 'sea para ti לְפֶה, como boca' (Éxodo 4:16). La letra de la boca pertenece al que habla por otro: la boca no es para uno mismo, es para llevar la palabra al pueblo.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la פ es el instrumento por el que la creación misma sucede. 'Por la palabra de Dios fueron hechos los cielos, y por el aliento de Su boca todo su ejército' (Salmos 33:6). El mundo no se fabricó con manos: se dijo. Diez veces 'dijo' Dios en el primer capítulo del Génesis, y por eso enseña la Mishná que 'con diez enunciados (עֲשָׂרָה מַאֲמָרוֹת) fue creado el mundo' (Avot 5:1). La boca es, antes que órgano de comer, órgano de crear: donde algo que no era se vuelve algo que es, por el solo hecho de ser dicho.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la פ es tu poder más peligroso y más divino: la palabra. 'Muerte y vida están en poder de la lengua' (Proverbios 18:21). El Midrash lo lee con una imagen cortante —la lengua es una espada de dos filos: מָוֶת מִכָּאן וְחַיִּים מִכָּאן, muerte de un lado, vida del otro (Vayikrá Rabá 33:1)— y lo mismo la boca doble de la פ. Con la misma boca bendices y hieres, construyes un mundo o lo derrumbas. La pregunta del alma-pe no es '¿tengo voz?', sino '¿qué sale por mi boca — y qué, sabiamente, dejo dentro?'.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), Ginsburgh sitúa a la פ en el canal que va de la גְּבוּרָה (rigor) al הוֹד (esplendor, la sefirá de la que brota la profecía). El rigor sube y se vuelve palabra revelada: eso es una boca santa. Pero el secreto más hondo está en el número de su nombre. פֵּה suma 85 — exactamente מִילָה, 'circuncisión'. Y no es un juego: el Sefer Yetzirá (1:3) enseña que hay una בְּרִית, un pacto, 'orientado en el centro', y que es doble — מִילַת הַמָּעוֹר (la circuncisión de la carne) y מִילַת הַלָּשׁוֹן, la circuncisión de la lengua. La boca es, literalmente, una circuncisión: un pacto que se sella no cortando la carne, sino cuidando lo que sale de los labios.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh describe la forma de la פ con precisión anatómica: 'una cabeza de perfil, con la boca abierta y un diente superior invertido' (inner.org). Ese es todo el dibujo, y es asombroso una vez que lo ves: el trazo exterior es el perfil de una cara —frente, nuca, mentón— que se abre por delante en una boca; y ese pequeño trazo que se enrosca hacia dentro, en la esquina superior, es un diente (o la lengua) recogido en el interior. La boca de la פ no está vacía: guarda algo adentro. Se puede hablar, pero primero hay algo replegado, contenido, que decide.\n\nY la פ es letra DOBLE. El Sefer Yetzirá (cap. 4) la cuenta entre las siete כְּפוּלוֹת (בג״ד כפר״ת), las que 'se conducen en dos lenguas': פּ dura y פ blanda, 'forma suave y dura, fuerte y débil'. Una boca, dos sonidos. Y todavía otra dualidad, la que la corona: la פ tiene forma final. La פ doblada (כְּפוּפָה) y la ף extendida (פְּשׁוּטָה) son la misma letra en dos gestos, y la homilía de los niños del Bet Midrash en Shabat 104a las leyó exactamente así: פֶּה פָּתוּחַ, פֶּה סָתוּם — 'boca abierta, boca cerrada'. La letra del habla trae escrita, en sus dos formas, la sabiduría de abrir y la sabiduría de cerrar.",
    },
    partes: [
      {
        label: { es: "El perfil (la cara)", en: "The profile (the face)", fa: "نیم‌رخ (چهره)" },
        significado: {
          es: "El trazo exterior que envuelve: en la lectura de Ginsburgh, un rostro de perfil. La boca no flota sola en el aire; pertenece a una cara, a una persona, a un dueño. Esto ya enseña: la palabra que no tiene rostro detrás —que no responde por sí, que no se hace cargo— no es habla plena. Toda boca santa está unida a un semblante que la sostiene.",
        },
        svgPathId: "pe-face",
      },
      {
        label: { es: "La boca (la abertura)", en: "The mouth (the opening)", fa: "دهان (گشودگی)" },
        significado: {
          es: "El vacío que se abre por delante: la boca misma. Es apertura pura, el hueco por donde lo interior sale al 'aquí' (פֹּה). Pero fíjate que es una abertura, no un desfonde: la boca se abre lo justo. Por eso la letra tiene también su forma cerrada. Abrir y cerrar la boca es el latido de toda habla verdadera — como las חַיּוֹת de Yejezkel que van רָצוֹא וָשׁוֹב, 'corriendo y volviendo' (Sefer Yetzirá 1:8, citando Yejezkel 1).",
        },
        svgPathId: "pe-mouth",
      },
      {
        label: { es: "El diente interior", en: "The inner tooth", fa: "دندان درونی" },
        significado: {
          es: "El pequeño trazo que se recoge hacia dentro de la boca: para Ginsburgh, 'un diente superior invertido'. Es lo escondido dentro de lo revelado — el punto que no sale. Antes de que una palabra se pronuncie, hay algo replegado que la mide, la muerde, la retiene un instante. Ese diente interior es el pudor de la boca sabia: no todo lo que se piensa se dice. La פ guarda, dentro de la letra del hablar, una figura del callar.",
        },
        svgPathId: "pe-tooth",
      },
    ],
    mundos: {
      es: "En los mundos, la forma doble de la פ enseña que la creación por la palabra necesita las dos cosas: la boca que se abre para decir, y la que se cierra para que lo dicho tenga contorno. Un mundo sin límite no es mundo; una palabra sin silencio alrededor no se oye. Por eso el Midrash cuenta que entre las diez cosas creadas en el crepúsculo del primer Shabat hubo tres 'bocas': פִּי הָאָרֶץ (la boca de la tierra que se tragó a Kóraj), פִּי הַבְּאֵר (la boca del pozo) y פִּי הָאָתוֹן (la boca de la asna de Bilam) (Avot 5:6). Las bocas del mundo se fijaron al borde del reposo — a punto de callar.",
    },
    almas: {
      es: "En el alma, tú eres las dos formas de la פ. Hay días de boca abierta —enseñar, bendecir, consolar, dar testimonio— y días de boca cerrada, en que la santidad es exactamente no decir. La madurez del alma no es hablar mucho ni callar mucho: es saber cuál de las dos formas toca ahora. El diente recogido dentro de la letra es esa vigilancia. 'Frena tu boca de hablar', dice el Sefer Yetzirá (1:8), no para amordazarla, sino para que cuando se abra, salga oro.",
    },
    divinidad: {
      es: "En lo divino, la boca es מִילַת הַלָּשׁוֹן, la circuncisión de la lengua (Sefer Yetzirá 1:3). Circuncidar es cortar lo sobrante para revelar el pacto. Así la boca divina: no dice todo lo que podría —eso sería el caos, la luz sin límite— sino que 'corta', mide, contrae, y en esa contracción (la גְּבוּרָה de la que Ginsburgh hace nacer la פ) la palabra se vuelve revelación soportable. Dios habla al circuncidar Su propio decir. Por eso a Moshé le habla פֶּה אֶל פֶּה: boca a boca, sin el velo del enigma.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 80,
    guematriaForma: {
      es: "פ = 80 · el nombre פֵּה = 80 + 5 = 85 = מִילָה ('circuncisión', 40+10+30+5 = 85) — y la boca es, literalmente, מִילַת הַלָּשׁוֹן, la circuncisión de la lengua (Sefer Yetzirá 1:3). (Ortografía alterna del nombre: פֵּא = 81.)",
    },
    mundos: {
      es: "80 es el número de Moshé cuando se para ante el Faraón: 'וּמֹשֶׁה בֶּן שְׁמֹנִים שָׁנָה... בְּדַבְּרָם אֶל פַּרְעֹה' (Éxodo 7:7). Contémplalo: la Torá subraya la edad justo en el instante en que el 'pesado de boca' va a HABLARLE al rey más poderoso del mundo. A los 80 —la edad de la פ, la letra de la boca— es cuando Moshé por fin abre la boca ante la historia. Y el versículo mismo, en el texto masorético, se cierra con una פ. El número, la letra y el acto coinciden.",
    },
    almas: {
      es: "80 es, en la escala de la vida de la Mishná, la edad de la fuerza: בֶּן שְׁמֹנִים לַגְּבוּרָה (Avot 5:21). No la fuerza del músculo joven —esa está a los 30 (לַכֹּחַ)— sino una fuerza distinta, tardía, la de quien ya no tiene nada que probar. Es exactamente el canal que Ginsburgh asigna a la פ: de la גְּבוּרָה al הוֹד. La boca del anciano tiene autoridad (Ginsburgh: 'Gift: Authority') no porque grite más, sino porque cada palabra suya pesa: habla poco y cierto. A los 80 la boca alcanza su gevurá.",
    },
    divinidad: {
      es: "El nombre de la פ suma 85 — igual que מִילָה. Y esa igualdad abre el secreto: la boca (פֶּה) y el pacto de la circuncisión (מִילָה) son, en número, lo mismo. El Sefer Yetzirá lo dijo en letras antes de que la gematría lo confirmara: la única בְּרִית 'orientada en el centro' es doble —la circuncisión de la carne y la de la lengua— y las dos guardan un mismo pacto. Cuidar lo que sale por la boca es una brit tan real como la de la carne. Hablar santo es estar circuncidado de los labios.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "Boca a boca: el grado más alto de la profecía" },
        fuente: {
          es: "Números 12:8 — 'פֶּה אֶל פֶּה אֲדַבֶּר בּוֹ וּמַרְאֶה וְלֹא בְחִידֹת': a Moshé Dios no le habla en enigmas ni en visiones veladas, sino boca a boca, cara descubierta. La profecía de Moshé es la única 'oral' en sentido pleno — la letra פ (boca) en su grado máximo.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Aharón, 'como boca' de Moshé" },
        fuente: {
          es: "Éxodo 4:10 — Moshé se declara כְּבַד פֶּה וּכְבַד לָשׁוֹן ('pesado de boca y de lengua'); 4:16 — Dios le da a Aharón: 'וְהָיָה הוּא יִהְיֶה לְּךָ לְפֶה' ('él será para ti como boca'). Ginsburgh asigna a la פ el arquetipo de Aharón: la boca que habla no para sí, sino para llevar la palabra al pueblo.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El mundo hecho por la boca de Dios" },
        fuente: {
          es: "Salmos 33:6 — 'בִּדְבַר ה' שָׁמַיִם נַעֲשׂוּ וּבְרוּחַ פִּיו כָּל צְבָאָם' ('por la palabra de Dios fueron hechos los cielos, y por el aliento de Su boca todo su ejército'). La creación no se hizo: se dijo. Cf. Deuteronomio 8:3 — el hombre vive עַל כָּל מוֹצָא פִי ה', de cuanto sale de la boca de Dios.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Pe doblada y pe extendida: boca abierta, boca cerrada" },
        fuente: {
          es: "Shabat 104a — en la homilía de los דַּרְדְּקֵי (los niños del Bet Midrash): 'פ׳ כְּפוּפָה, פ׳ פְּשׁוּטָה — פֶּה פָּתוּחַ, פֶּה סָתוּם'. La misma letra en sus dos formas enseña las dos sabidurías de la boca: cuándo abrirse y cuándo sellarse. (Es el corazón mismo de 'Jashmal': jash/callar + mal/hablar.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La ף final: 'los videntes la fijaron'" },
        fuente: {
          es: "Shabat 104a — 'מַנְצְפַךְ צוֹפִים אֲמָרוּם' (R. Yirmiyá / R. Jiyá bar Aba): las cinco letras finales (מ נ צ פ כ, incluida la ף) las 'dijeron los videntes'. La guemará precisa: siempre existieron, pero no se sabía cuál iba en medio de palabra y cuál al final, y los profetas (צוֹפִים) lo restablecieron. La boca de la פ tiene una forma para el medio y otra para el fin.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "A los ochenta, la gevurá" },
        fuente: {
          es: "Mishná Avot 5:21 — 'בֶּן שְׁמֹנִים לַגְּבוּרָה' ('a los 80, la fuerza'). El valor de la פ es 80, y es la edad en que Moshé (Éxodo 7:7) por fin habla ante el Faraón. La boca alcanza su fuerza cuando ya no necesita probar nada. Cf. el canal de la פ en Ginsburgh: de la Gevurá al Hod.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "La lengua: muerte de un lado, vida del otro" },
        fuente: {
          es: "Vayikrá Rabá 33:1 — abre con 'מָוֶת וְחַיִּים בְּיַד לָשׁוֹן' (Proverbios 18:21) y trae la versión de Áquilas: la lengua es מִיצְטְרָא (una hoja de doble filo), 'מָוֶת מִכָּאן וְחַיִּים מִכָּאן' — muerte de un lado, vida del otro. La boca doble de la פ (dura/blanda, abierta/cerrada) hecha ética.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Las tres bocas creadas en el crepúsculo" },
        fuente: {
          es: "Mishná Avot 5:6 — entre las diez cosas creadas בֵּין הַשְּׁמָשׁוֹת (al filo del primer Shabat) hay tres 'bocas': פִּי הָאָרֶץ (la boca de la tierra que tragó a Kóraj), פִּי הַבְּאֵר (la boca del pozo) y פִּי הָאָתוֹן (la boca de la asna de Bilam). Las bocas prodigiosas del mundo se fijaron justo antes del silencio del reposo.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Pe: letra doble — dura y blanda, el jueves" },
        fuente: {
          es: "Sefer Yetzirá 4 — la פ es una de las siete כְּפוּלוֹת (בג״ד כפר״ת), 'que se conducen en dos lenguas' (פּ/פ). Ambas recensiones le dan el DÍA quinto (jueves). Pero difieren: la impresa le asigna נוֹגַהּ (Venus), fosa nasal derecha y חֵן (gracia); la del Gra, כּוֹכָב (Mercurio), oído izquierdo y מֶמְשָׁלָה (dominio). Ginsburgh sigue al Gra: Mercurio, oído izquierdo, 'autoridad'.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La boca es una circuncisión: מִילַת הַלָּשׁוֹן" },
        fuente: {
          es: "Sefer Yetzirá 1:3 — la בְּרִית 'orientada en el centro' es doble: מִילַת הַמָּעוֹר (circuncisión de la carne) y מִילַת הַלָּשׁוֹן (circuncisión de la lengua). La boca es un pacto sellado. Gematría calculada: פֵּה = 85 = מִילָה (circuncisión) — el número confirma lo que el texto ya decía.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Frena tu boca: רָצוֹא וָשׁוֹב" },
        fuente: {
          es: "Sefer Yetzirá 1:8 (recensión impresa) — 'בְּלוֹם פִּיךָ מִלְּדַבֵּר וְלִבְּךָ מִלְּהַרְהֵר, וְאִם רָץ לִבְּךָ שׁוּב לַמָּקוֹם', citando las חַיּוֹת de Yejezkel 1 que van רָצוֹא וָשׁוֹב ('corriendo y volviendo'). La boca santa tiene un latido: se abre y se frena. No mordaza — ritmo.",
        },
        href: "/mente-cosmica",
      },
    ],
    jasidut: [
      {
        titulo: { es: "La boca: comunicación oral del conocimiento (Ginsburgh)" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sigpei) — Concepto: 'la comunicación oral del conocimiento'; Significado: 'una boca; aquí' (פֶּה/פֹּה); Forma: 'una cabeza de perfil, con la boca abierta y un diente superior invertido'; Arquetipo: Aharón; Canal: de la Gevurá al Hod. La boca revela hacia fuera lo que la mente guarda dentro. (La lectura tradicional פֶּסַח = פֶּה סָח, 'la boca que relata', ilumina lo mismo, y se ofrece como drash, no como cita anclada.)",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Números 12:8 — 'פֶּה אֶל פֶּה אֲדַבֶּר בּוֹ': la profecía de Moshé, boca a boca." },
    { es: "Éxodo 4:10 (כְּבַד פֶּה) y 4:16 (Aharón לְפֶה, 'como boca' de Moshé)." },
    { es: "Éxodo 7:7 — Moshé בֶּן שְׁמֹנִים שָׁנָה (80) ante el Faraón; el versículo cierra con una פ (petujá)." },
    { es: "Deuteronomio 8:3 — 'עַל כָּל מוֹצָא פִי ה' יִחְיֶה הָאָדָם' (el hombre vive de lo que sale de la boca de Dios)." },
    { es: "Salmos 33:6 — 'בִּדְבַר ה' שָׁמַיִם נַעֲשׂוּ וּבְרוּחַ פִּיו' (la creación por la boca)." },
    { es: "Proverbios 18:21 — 'מָוֶת וְחַיִּים בְּיַד לָשׁוֹן' (muerte y vida en poder de la lengua)." },
    { es: "Mishná Avot 5:1 (עֲשָׂרָה מַאֲמָרוֹת), 5:6 (las tres bocas del crepúsculo: תיבה/tierra, pozo, asna), 5:21 (בֶּן שְׁמֹנִים לַגְּבוּרָה)." },
    { es: "Shabat 104a — 'פ׳ כְּפוּפָה, פ׳ פְּשׁוּטָה — פֶּה פָּתוּחַ, פֶּה סָתוּם'; y 'מַנְצְפַךְ צוֹפִים אֲמָרוּם' (las letras finales, incl. ף, las fijaron los videntes)." },
    { es: "Vayikrá Rabá 33:1 — sobre Proverbios 18:21; Áquilas: 'מָוֶת מִכָּאן וְחַיִּים מִכָּאן' (la lengua, hoja de doble filo)." },
    { es: "Sefer Yetzirá 4 — la פ, letra doble (בג״ד כפר״ת), sonido doble פּ/פ; día quinto (jueves). Recensiones difieren: impresa (Venus · fosa nasal derecha · gracia) vs. Gra (Mercurio · oído izquierdo · dominio)." },
    { es: "Sefer Yetzirá 1:3 — la doble בְּרִית del centro: מִילַת הַמָּעוֹר y מִילַת הַלָּשׁוֹן (la boca como circuncisión de la lengua). 1:8 — 'בְּלוֹם פִּיךָ מִלְּדַבֵּר' con Yejezkel 1 (רָצוֹא וָשׁוֹב)." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sigpei) — concepto (comunicación oral del conocimiento), forma (cabeza de perfil, boca abierta, diente invertido), arquetipo Aharón, canal Gevurá→Hod." },
    { es: "Gematrías calculadas: פ = 80 · פֵּה = 80+5 = 85 = מִילָה (40+10+30+5 = 85). Ortografía alterna del nombre: פֵּא = 81." },
    { es: "Nota de precisión: פֶּה (raíz פ-ה/פ-י-ה) y פָּנִים (rostro, raíz פ-נ-ה) NO comparten raíz. El par שָׁלוֹם/מִלְחָמָה es de la ר, no de la פ. פֶּסַח = פֶּה סָח es drash tradicional, no cita anclada." },
  ],
};
