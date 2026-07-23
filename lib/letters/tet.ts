import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  TET (ט) — Data de la novena letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Génesis 1:1-4 — comprobado letra por letra: desde בְּרֵאשִׁית hasta
//     וַיַּרְא אֱלֹהִים אֶת הָאוֹר no hay NINGUNA tet; la primera tet de la
//     Torá es la de כִּי־טוֹב (1:4).
//   · Bavá Kamá 55a — R. Yehoshúa: ver una tet en el sueño es buen presagio;
//     con las objeciones (Isaías 14:23; Lamentaciones 1:9 y 2:9) y la
//     resolución: "פָּתַח בּוֹ הַכָּתוּב לְטוֹבָה תְּחִילָּה".
//   · Jaguigá 12a — R. Elazar: la luz del primer día, guardada לַצַּדִּיקִים
//     לֶעָתִיד לָבֹא; prueba: כִּי־טוֹב + "אין טוב אלא צדיק" (Isaías 3:10).
//   · Bereshit Rabá 3:6 — נִגְנְזָה וּמְתֻקֶּנֶת לַצַּדִּיקִים (Isaías 30:26).
//   · Rashi a Génesis 1:4 — וְהִבְדִּילוֹ לַצַּדִּיקִים לֶעָתִיד לָבֹא.
//   · Shabat 104a — derash infantil ז״ח ט״י כ״ל: la tet es וּמֵטִיב לְךָ.
//   · Zohar, Hakdamá I:3a (ed. Sefaria: Introduction 6:12) — la Tet pide crear
//     el mundo; respuesta: טוּבָךְ סָתִים בְּגַוָּוךְ וְצָפוּן בְּגַוָּוךְ
//     (Salmos 31:20; Lamentaciones 2:9).
//   · Sefer Yetzirá cap. 5 — Tet es letra SIMPLE. Recensión impresa (5:2):
//     León (אריה) · Av · riñón DERECHO (כוליא ימין). Recensión del Gra (5:8):
//     oído (שמיעה) · León · Av · riñón IZQUIERDO (כוליא שמאלית). Difieren y
//     se declara; Ginsburgh sigue al Gra.
//   · Nidá 38a-b — Mar Zutra: los jasidim rishonim y los 271 días; el Talmud
//     MISMO calcula הֵרָיוֹן = 271 (Rut 4:13); "la que da a luz a los nueve,
//     da a luz en meses completos".
//   · Berajot 60b — R. Akiva: כׇּל דְּעָבֵיד רַחֲמָנָא לְטָב עָבֵיד.
//   · Mishná Taanit 4:6 — las cinco calamidades del 9 de Av.
//   · Ginsburgh, tabla oficial (inner.org/alefbeit/sigtet, descargada y leída):
//     Concept: "The 'inversion,' or concealment, in this world of G-d's
//     benevolence" · Meaning: inclinación/vara/abajo/cama · Shape: "a vessel
//     with an inverted rim; a water-pouch" · 9 · Leo · Menachem Av · riñón
//     izquierdo · oído · arquetipo: Shimon · canal: de Jojmá a Tiferet.
//  Gematrías (calculadas letra por letra, con Python):
//    ט = 9 · nombre pleno טית = 9+10+400 = 419 · grafía breve טת = 9+400 =
//    409 = אַחַת (1+8+400) · טוֹב = 9+6+2 = 17 · הֵרָיוֹן = 5+200+10+6+50 =
//    271 (esta última la hace el Talmud mismo en Nidá 38b).
//
//  NOTA DEL SOFER — precisiones y descartes:
//   · "Tet = los nueve meses del embarazo": NINGUNA fuente clásica dice eso
//     de la LETRA. Lo clásico verificado es Nidá 38a-b (nueve meses, 271
//     días, הריון=271). El puente letra↔gestación es drash (Ginsburgh y
//     nuestro), y así se declara en el texto.
//   · La pista "riñón izquierdo" en Sefer Yetzirá solo es cierta en la
//     recensión del Gra; la impresa dice riñón derecho. Se declaran ambas.
//   · Se descartó el vínculo tet↔teshuvá y tet↔טיט (barro) por no poder
//     anclarse a fuente exacta. La equivalencia טת = 409 = אחת se presenta
//     como cálculo nuestro (aritmética verificada), no como cita clásica.
//   · Ginsburgh SÍ asigna canal a esta letra (Jojmá→Tiferet), a diferencia
//     de zayin; se cita de su tabla.
// ─────────────────────────────────────────────────────────────────────────

export const tet: LetterData = {
  slug: "tet",
  letter: "ט",
  nameTranslit: { es: "Tet", en: "Tet", fa: "طِت" },
  nameHe: "טֵית",
  value: 9,

  level1: {
    es: "Mira la Tet: es la letra más cerrada del alfabeto. Una vasija cuyo borde se curva hacia adentro, como si abrazara algo que no quiere mostrar. Y ahora escucha la paradoja: esta letra —la más hermética, la más replegada— es la inicial de טוֹב, 'bueno'. La Torá entera avanza tres versículos, crea cielos, tierra, oscuridad y luz, sin escribir una sola tet; y cuando por fin la escribe, es para decir que la luz era buena. El Talmud enseña que quien ve una tet en su sueño recibió un buen presagio. Pero entonces, ¿por qué lo bueno eligió esconderse en la letra que se cierra sobre sí misma? Quédate con esa pregunta antes de seguir: ¿y si el bien más grande no es el que se ve — sino el que está guardado?",
    en: "Look at the Tet: the most closed letter of the alphabet. A vessel whose rim curves inward, as if embracing something it will not show. Now hear the paradox: this letter — the most hermetic, the most inward — begins the word טוֹב, 'good.' The Torah advances three whole verses, creating heavens, earth, darkness and light, without writing a single tet; and when it finally writes one, it is to say the light was good. The Talmud teaches that one who sees a tet in a dream has received a good omen. Then why did goodness choose to hide in the letter that closes upon itself? Stay with that question: what if the greatest good is not the one you see — but the one being kept?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "טֵית. Empecemos por la honestidad: el nombre de esta letra, como palabra, no aparece en el Tanaj, y su etimología no está fijada por las fuentes clásicas. Lo que sí está fijado —y es extraordinario— es su primera aparición como letra: desde בְּרֵאשִׁית hasta וַיַּרְא אֱלֹהִים אֶת הָאוֹר, la Torá no escribe ninguna tet. Lo dice el Talmud con esas palabras exactas (Bavá Kamá 55a): הוֹאִיל וּפָתַח בּוֹ הַכָּתוּב לְטוֹבָה תְּחִילָּה — 'puesto que la Escritura la estrenó para el bien': la primera tet de la Torá es la de כִּי־טוֹב, 'que era buena' (Génesis 1:4). Nosotros lo comprobamos letra por letra: es verdad. Por eso R. Yehoshúa enseña allí que quien ve una tet en su sueño recibió un buen presagio — y la Guemará es honesta como pocas: objeta que también hay tets en versículos de destrucción (וְטֵאטֵאתִיהָ בְּמַטְאֲטֵא הַשְׁמֵד, Isaías 14:23; טֻמְאָתָהּ בְּשׁוּלֶיהָ, Lamentaciones 1:9), y responde afinando: una sola tet, y porque su estreno fue para el bien.\n\nRav Ginsburgh recoge en su tabla los sentidos del nombre: inclinación, vara, abajo, cama — la familia de la raíz נ-ט-ה (inclinar): מַטֶּה (vara), מַטָּה (abajo), מִטָּה (cama). Todas son palabras de tet, y todas dicen lo mismo: algo que se dobla, que baja, que se inclina hacia adentro. Y el derash infantil de Shabat 104a lo sella con una sonrisa: en la serie ז״ח ט״י כ״ל, la tet es וּמֵטִיב לְךָ — 'y Él te hace bien'. La letra que se inclina es la letra por la que el Cielo se inclina hacia ti.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Tet es el bien guardado dentro de la creación. Jaguigá 12a lo enseña con precisión: la luz que el Santo creó el primer día — con la que el hombre veía de un extremo al otro del mundo — fue escondida (גְּנָזוֹ) cuando Él vio la corrupción de las generaciones del Diluvio y de la Dispersión. ¿Y para quién la escondió? לַצַּדִּיקִים לֶעָתִיד לָבֹא, para los justos en el porvenir. ¿Y de qué versículo lo aprende el Talmud? Exactamente del versículo de la primera tet: וַיַּרְא אֱלֹהִים אֶת הָאוֹר כִּי־טוֹב — 'y no hay טוֹב sino el justo' (Isaías 3:10). El mundo que ves funciona con la luz del sol; el mundo que no ves guarda una luz mejor. La Tet es esa despensa.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Tet es tu capacidad de creer en el bien que no se ve. R. Akiva lo convirtió en hábito del alma: כׇּל דְּעָבֵיד רַחֲמָנָא לְטָב עָבֵיד — 'todo lo que hace el Misericordioso, para bien lo hace' (Berajot 60b) — y lo dijo de noche, en un campo, después de que le negaran posada. No es optimismo: es la disciplina de recordar que la primera tet de la historia se escribió sobre una luz que luego fue escondida. Hay bienes que se te muestran y bienes que se te guardan. El alma-tet no exige ver para agradecer.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Tet es el ocultamiento como forma del amor. Ginsburgh define así su concepto: 'la inversión, u ocultamiento, en este mundo, de la benevolencia de Dios'. El Zohar lo pone en escena (Hakdamá, I:3a): cuando la Tet entra ante el Creador y pide que el mundo sea creado con ella —'pues por mí Tú eres llamado טוֹב'—, Él responde: טוּבָךְ סָתִים בְּגַוָּוךְ וְצָפוּן בְּגַוָּוךְ, 'tu bien está sellado dentro de ti y atesorado dentro de ti', y no le da la creación, citando el Salmo: מָה רַב טוּבְךָ אֲשֶׁר צָפַנְתָּ לִירֵאֶיךָ — 'cuán grande es Tu bien, que atesoraste para los que Te temen' (Salmos 31:20). El bien supremo no cabe en este mundo: por eso se guarda. No porque falte — porque sobra.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh describe la forma de la Tet con dos imágenes exactas: 'una vasija con el borde invertido' y 'un odre de agua' (inner.org, The Hebrew Letters). Míralo en el trazo: la letra es un contenedor — una base que se curva como un vientre, una cabeza derecha que sube, y un borde izquierdo que, en lugar de abrirse hacia afuera como en casi todas las letras, se dobla HACIA ADENTRO. Ese pliegue lo cambia todo. Una vasija de borde abierto ofrece su contenido; una vasija de borde invertido lo protege. La Tet no es una letra vacía que espera: es una letra llena que guarda.\n\nY aquí la forma y el nombre dicen lo mismo que las fuentes: la letra cuyo estreno en la Torá fue una luz declarada buena y luego escondida (Jaguigá 12a) tiene forma de escondite. El Zohar se lo dice a ella misma: 'tu bien está dentro de ti' — סָתִים בְּגַוָּוךְ, sellado en tu interior. Nueve meses guarda el vientre lo que más ama antes de mostrarlo. La Tet es la caligrafía de esa espera.",
    },
    partes: [
      {
        label: { es: "El borde invertido (el pliegue hacia adentro)", en: "The inverted rim (the inward fold)", fa: "لبه‌ی رو به درون" },
        significado: {
          es: "El extremo izquierdo del trazo, que se curva hacia el interior de la letra en lugar de abrirse al mundo. Es la firma de la Tet: el gesto de guardar. Ginsburgh lo lee como el borde invertido de la vasija — el bien que existe pero no se exhibe. Lo que este pliegue abraza no está ausente: está atesorado (צָפוּן, la palabra del Salmo 31:20 que el Zohar aplica a esta letra).",
        },
        svgPathId: "tet-rim",
      },
      {
        label: { es: "La cabeza derecha (la entrada de la luz)", en: "The right head (where the light enters)", fa: "سر راست" },
        significado: {
          es: "El trazo derecho que sube y se corona: el punto por donde la vasija recibió lo que ahora guarda. Toda despensa fue primero puerta. La luz del primer día existió y alumbró antes de ser escondida (Jaguigá 12a): la cabeza de la Tet recuerda que lo oculto no es lo inexistente — es lo recibido que espera su hora.",
        },
        svgPathId: "tet-head",
      },
      {
        label: { es: "El vientre (la base que contiene)", en: "The womb (the containing base)", fa: "شکم ظرف" },
        significado: {
          es: "La curva inferior que sostiene todo el peso de la letra, como el vientre sostiene la vida que aún no se muestra. Es la parte de la Tet que trabaja en silencio: no dibuja el bien, lo carga. Nueve — el número de esta letra — son los meses en que el ser humano entero se forma sin que nadie lo vea (Nidá 38a-b). El vientre de la Tet es ese taller a oscuras.",
        },
        svgPathId: "tet-base",
      },
    ],
    mundos: {
      es: "En los mundos, la forma-vasija enseña cómo se sostiene la historia: no todo el bien creado está en circulación. Parte fue puesta en reserva — la luz del primer día, guardada para el porvenir (Bereshit Rabá 3:6: נִגְנְזָה וּמְתֻקֶּנֶת לַצַּדִּיקִים, 'fue escondida y está preparada para los justos'). El mundo no es un escaparate: es un almacén con secciones que aún no se abren.",
    },
    almas: {
      es: "En el alma, tú también tienes forma de tet: lo mejor tuyo no siempre está a la vista. Hay bondades que maduran solo si nadie las mira — como el fruto dentro de la cáscara, como el hijo dentro del vientre. La cultura te empuja a exhibirlo todo; la Tet te enseña el arte contrario: el pliegue hacia adentro. Guardar no es esconder por miedo. Es proteger lo que todavía no soporta la intemperie.",
    },
    divinidad: {
      es: "En lo divino, la vasija invertida es el modo en que Ein Sof habita este mundo: presente y no evidente. Ginsburgh llama a la Tet el ocultamiento de la benevolencia — y su canal en el Árbol va de Jojmá a Tiferet: del destello de la sabiduría que nadie ve, a la belleza que finalmente se muestra. Entre el relámpago y su hermosura hay un tramo cubierto. La Tet es ese tramo: la bondad viajando de incógnito.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 9,
    guematriaForma: {
      es: "ט = 9 · nombre pleno טֵית = 9 + 10 + 400 = 419 · grafía breve טת = 9 + 400 = 409 = אַחַת (1 + 8 + 400) · טוֹב = 9 + 6 + 2 = 17 · הֵרָיוֹן (embarazo) = 5 + 200 + 10 + 6 + 50 = 271, gematría que hace el Talmud mismo (Nidá 38b)",
    },
    mundos: {
      es: "9 es el número de la gestación. Y aquí no hace falta drash para los datos: el Talmud enseña que 'la que da a luz a los nueve meses no da a luz en meses incompletos' (Nidá 38b), y Mar Zutra revela el cálculo de los jasidim rishonim: el embarazo dura 271 días — porque en וַיִּתֵּן ה' לָהּ הֵרָיוֹן (Rut 4:13), la palabra הֵרָיוֹן suma exactamente 271. Es el Talmud haciendo gematría de sí mismo. Nueve meses: el tiempo que el mundo le concede a todo lo importante para formarse en secreto. (El puente entre ese dato y esta letra es lectura de Ginsburgh y nuestra: la novena letra tiene forma de vientre. Los datos son exactos; el puente es drash, y se declara.)",
    },
    almas: {
      es: "9 es el bien esperando su hora. La Guemará de los sueños (Bavá Kamá 55a) precisa: UNA tet es buen presagio — muchas juntas evocan la escoba de la destrucción (Isaías 14:23). Hay ahí una enseñanza para el alma: el bien guardado se reconoce en singular, en lo pequeño, en lo que casi no se ve. Y el mismo pasaje eleva la pareja טב (tet-bet, 'bueno' en arameo) frente a טָבְעוּ בָאָרֶץ שְׁעָרֶיהָ, 'se hundieron en la tierra sus puertas' (Lamentaciones 2:9) — las mismas dos letras pueden hundirse o bendecir. El nueve te pregunta: lo que llevas dentro sin mostrar, ¿lo estás gestando o lo estás enterrando?",
    },
    divinidad: {
      es: "En la Cabalá, la novena sefirá es Yesod — llamada צַדִּיק, el justo: וְצַדִּיק יְסוֹד עוֹלָם, 'el justo es fundamento del mundo' (Proverbios 10:25). Y Jaguigá 12a dice que la luz escondida se guarda precisamente para el tzadik ('no hay טוֹב sino el justo', Isaías 3:10). Novena letra, novena sefirá, y el mismo nombre custodiando ambas — la convergencia es lectura nuestra, no cita clásica, pero cada pieza es exacta. Añade una contemplación aritmética (cálculo nuestro, no fuente): la grafía breve טת suma 409, lo mismo que אַחַת, 'una'. El bien guardado no está fragmentado: lo escondido madura hacia la unidad.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "La primera tet de la Torá: la luz que era buena" },
        fuente: {
          es: "Génesis 1:4 — וַיַּרְא אֱלֹהִים אֶת הָאוֹר כִּי־טוֹב. Comprobado letra por letra: en Génesis 1:1-3 no hay ninguna tet; la primera de toda la Torá es la de טוֹב. Tres versículos de creación esperaron a esta letra para poder decir 'bueno'.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El bien atesorado para los que temen" },
        fuente: {
          es: "Salmos 31:20 — מָה רַב טוּבְךָ אֲשֶׁר צָפַנְתָּ לִּירֵאֶיךָ: 'cuán grande es Tu bien, que atesoraste para los que Te temen'. El versículo que el Zohar (Hakdamá I:3a) pone en boca del Creador al explicarle a la Tet por qué su bien está guardado.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Ver una tet en el sueño: buen presagio" },
        fuente: {
          es: "Bavá Kamá 55a — R. Yehoshúa: הָרוֹאֶה טֵית בַּחֲלוֹמוֹ סִימָן יָפֶה לוֹ. La Guemará objeta (Isaías 14:23, Lamentaciones 1:9) y resuelve: הוֹאִיל וּפָתַח בּוֹ הַכָּתוּב לְטוֹבָה תְּחִילָּה — 'desde בראשית hasta וירא אלהים את האור no se escribe tet'. El presagio no es superstición: es memoria del estreno.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La luz del primer día, guardada para los justos" },
        fuente: {
          es: "Jaguigá 12a — R. Elazar: אוֹר שֶׁבָּרָא הַקָּדוֹשׁ בָּרוּךְ הוּא בְּיוֹם רִאשׁוֹן, אָדָם צוֹפֶה בּוֹ מִסּוֹף הָעוֹלָם וְעַד סוֹפוֹ... עָמַד וּגְנָזוֹ. ¿Para quién? לַצַּדִּיקִים לֶעָתִיד לָבֹא, y la prueba es el versículo de la primera tet: כִּי־טוֹב, 'y no hay טוב sino el justo' (Isaías 3:10). Cf. Rashi a Génesis 1:4.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Nueve meses: la gematría que hizo el Talmud" },
        fuente: {
          es: "Nidá 38a-b — Mar Zutra: los jasidim rishonim contaban 271 días de gestación, porque הֵרָיוֹן (Rut 4:13) suma בְּגִימַטְרִיָּא 271; y 'la que da a luz a los nueve no da a luz en meses incompletos' (יוֹלֶדֶת לְתִשְׁעָה אֵינָהּ יוֹלֶדֶת לִמְקוּטָּעִים). El nueve de la vida humana, con fuente y aritmética talmúdica.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "Escondida y preparada: la luz en reserva" },
        fuente: {
          es: "Bereshit Rabá 3:6 — la luz de los seis días de la creación נִגְנְזָה וְהִיא מְתֻקֶּנֶת לַצַּדִּיקִים לֶעָתִיד לָבוֹא, 'fue escondida y está preparada para los justos en el porvenir', con la promesa de Isaías 30:26: la luz futura será 'como la luz de los siete días'. Guardar no es cancelar: es preparar.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "La Tet ante el Creador: 'tu bien está dentro de ti'" },
        fuente: {
          es: "Zohar, Hakdamá I:3a (ed. Sefaria: Introduction 6:12) — עָאלַת אָת ט: la Tet pide que el mundo sea creado con ella, 'pues por mí eres llamado טוֹב וְיָשָׁר'. Respuesta: לָא אִבְרֵי בָּךְ עָלְמָא דְּהָא טוּבָךְ סָתִים בְּגַוָּוךְ וְצָפוּן בְּגַוָּוךְ — tu bien está sellado y atesorado dentro de ti (Salmos 31:20); ese bien no pertenece a este mundo sino al venidero. La letra más buena no crea el mundo: lo espera.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Tet: el León, el mes de Av, el riñón" },
        fuente: {
          es: "Sefer Yetzirá cap. 5 — Tet es una de las doce letras SIMPLES (ה״ו ז״ח ט״י ל״נ ס״ע צ״ק). Recensión impresa (5:2): הִמְלִיךְ אוֹת ט' וְצָר בּוֹ אַרְיֵה בָּעוֹלָם וְאָב בַּשָּׁנָה וְכוּלְיָא יָמִין בַּנֶּפֶשׁ (riñón derecho). Recensión del Gra (5:8): אַרְיֵה · אָב · כּוּלְיָא שְׂמָאלִית (riñón IZQUIERDO), con el sentido del oído (שְׁמִיעָה). Las recensiones difieren en el riñón y en el sentido; Ginsburgh sigue al Gra. En el mes de la Tet cae el 9 de Av (Mishná Taanit 4:6) — la letra del bien oculto rige el mes del dolor, que la tradición llama מְנַחֵם אָב, 'Av el consolador': lectura nuestra sobre datos exactos.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Nueve: la sefirá del Justo" },
        fuente: {
          es: "La novena sefirá es Yesod, llamada צַדִּיק — וְצַדִּיק יְסוֹד עוֹלָם, 'el justo es fundamento del mundo' (Proverbios 10:25). Y la luz escondida se guarda para el tzadik (Jaguigá 12a; Isaías 3:10). Novena letra, novena sefirá, un mismo custodio. (La convergencia numérica es contemplación nuestra; cada fuente, exacta.) Gematrías calculadas: טת = 409 = אַחַת.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "La inversión del bien: todo lo que hace, para bien" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sigtet) — el concepto de la Tet: 'la inversión, u ocultamiento, en este mundo, de la benevolencia de Dios'; su forma: 'una vasija con el borde invertido'; su canal: de Jojmá a Tiferet. La raíz talmúdica de esa mirada jasídica es R. Akiva: כׇּל דְּעָבֵיד רַחֲמָנָא לְטָב עָבֵיד, 'todo lo que hace el Misericordioso, para bien lo hace' (Berajot 60b) — dicho de noche, sin posada, con la lámpara apagada. El bien no siempre se ve; la Tet enseña a saberlo guardado.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Génesis 1:1-4 — comprobado letra por letra: ninguna tet antes de כִּי־טוֹב (1:4); la primera tet de la Torá es la de la luz buena." },
    { es: "Bavá Kamá 55a — R. Yehoshúa: ver una tet en el sueño es buen presagio; objeciones de Isaías 14:23 (וְטֵאטֵאתִיהָ בְּמַטְאֲטֵא הַשְׁמֵד) y Lamentaciones 1:9 (טֻמְאָתָהּ בְּשׁוּלֶיהָ) y 2:9 (טָבְעוּ בָאָרֶץ שְׁעָרֶיהָ); resolución: פָּתַח בּוֹ הַכָּתוּב לְטוֹבָה תְּחִילָּה." },
    { es: "Jaguigá 12a — R. Elazar: la luz del primer día, con la que se veía de extremo a extremo del mundo, escondida לַצַּדִּיקִים לֶעָתִיד לָבֹא; prueba: Génesis 1:4 + Isaías 3:10 (אִמְרוּ צַדִּיק כִּי־טוֹב)." },
    { es: "Bereshit Rabá 3:6 — נִגְנְזָה וְהִיא מְתֻקֶּנֶת לַצַּדִּיקִים לֶעָתִיד לָבוֹא; Isaías 30:26 (la luz de los siete días)." },
    { es: "Rashi a Génesis 1:4 — רָאָהוּ שֶׁאֵינוֹ כְדַאי לְהִשְׁתַּמֵשׁ בּוֹ רְשָׁעִים וְהִבְדִּילוֹ לַצַּדִּיקִים לֶעָתִיד לָבֹא." },
    { es: "Shabat 104a — derash de los niños: ז״ח ט״י כ״ל — el Santo זָן אוֹתְךָ וְחָן אוֹתְךָ וּמֵטִיב לְךָ; la tet es 'te hace bien'." },
    { es: "Zohar, Hakdamá I:3a (ed. Sefaria: Introduction 6:12) — עָאלַת אָת ט; טוּבָךְ סָתִים בְּגַוָּוךְ וְצָפוּן בְּגַוָּוךְ; Salmos 31:20; Lamentaciones 2:9." },
    { es: "Salmos 31:20 — מָה רַב טוּבְךָ אֲשֶׁר צָפַנְתָּ לִּירֵאֶיךָ." },
    { es: "Sefer Yetzirá cap. 5 — Tet, letra simple. Impresa 5:2: León · Av · riñón derecho (כוליא ימין). Gra 5:8: oído (שמיעה) · León · Av · riñón izquierdo (כוליא שמאלית). Las recensiones difieren y se declara; Ginsburgh sigue al Gra." },
    { es: "Nidá 38a-b — Mar Zutra: 271 días de gestación; הֵרָיוֹן בְּגִימַטְרִיָּא 271 (Rut 4:13); יוֹלֶדֶת לְתִשְׁעָה אֵינָהּ יוֹלֶדֶת לִמְקוּטָּעִים." },
    { es: "Berajot 60b — R. Akiva: כׇּל דְּעָבֵיד רַחֲמָנָא לְטָב עָבֵיד." },
    { es: "Mishná Taanit 4:6 — las cinco calamidades del 9 de Av (el 9, en el mes de la Tet según Sefer Yetzirá)." },
    { es: "Proverbios 10:25 — וְצַדִּיק יְסוֹד עוֹלָם (Yesod, la novena sefirá, llamada 'el justo')." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' (tabla oficial en inner.org/alefbeit/sigtet) — concepto: inversión/ocultamiento de la benevolencia divina; forma: vasija de borde invertido / odre; nombre: inclinación · vara · abajo · cama; León · Menajem Av · riñón izquierdo · oído · arquetipo Shimon · canal de Jojmá a Tiferet." },
    { es: "Gematrías calculadas por el Sofer: ט = 9 · טֵית = 9+10+400 = 419 · טת = 9+400 = 409 = אַחַת (1+8+400) · טוֹב = 9+6+2 = 17 · הֵרָיוֹן = 271 (esta la calcula el Talmud mismo, Nidá 38b)." },
    { es: "Nota de precisión: el vínculo letra Tet ↔ nueve meses de embarazo NO es cita clásica — los datos (Nidá 38a-b) son exactos y el puente es drash declarado. Igual estatus: Tisha B'Av en el mes de la Tet, la convergencia 9ª letra ↔ 9ª sefirá, y טת = 409 = אחת. Se descartaron por no verificables: tet↔teshuvá y tet↔טיט (barro)." },
  ],
};
