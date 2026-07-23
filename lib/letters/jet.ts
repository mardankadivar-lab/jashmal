import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  JET (ח) — Data de la octava letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Génesis 6:8 — וְנֹחַ מָצָא חֵן בְּעֵינֵי ה׳ (Nóaj halló jen/gracia).
//   · Yejezkel 1:14 — וְהַחַיּוֹת רָצוֹא וָשׁוֹב כְּמַרְאֵה הַבָּזָק (ratzó vashov).
//   · Génesis 1:2 — וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל פְּנֵי הַמָּיִם (el cernerse).
//   · Génesis 17:12 / Levítico 12:3 — brit milá al octavo día (וּבַיּוֹם הַשְּׁמִינִי יִמּוֹל).
//   · Deuteronomio 30:19 — וּבָחַרְתָּ בַּחַיִּים ("elige la vida").
//   · Deuteronomio 32:11 — כְּנֶשֶׁר יָעִיר קִנּוֹ עַל גּוֹזָלָיו יְרַחֵף (el águila que se cierne).
//   · Génesis 9:2 — וּמוֹרַאֲכֶם וְחִתְּכֶם ("el temor de ustedes", raíz חתת: jet = temor).
//   · Menajot 29b — Rav Ashi: los escribas precisos "jorobaban el techo de la jet"
//     (דְּחָטְרִי לְהוּ לְגַגֵּיהּ דְּחֵי״ת), porque חַי הוּא בְּרוּמוֹ שֶׁל עוֹלָם.
//   · Arajín 13b — R. Yehudá: arpa del Templo 7 cuerdas (Salmos 16:11), de los días
//     del Mashíaj 8 (עַל הַשְּׁמִינִית, Salmos 6:1), del Mundo Venidero 10 (Salmos 92:4).
//   · Shabat 104a — alfabeto de los niños: ז״ח ט״י כ״ל — el Santo זָן אוֹתְךָ (zayin)
//     וְחָן אוֹתְךָ (¡jet!: "te agracia"), confirmado con la grafía exacta.
//   · Shabat 21b — מַאי חֲנוּכָּה: el aceite de un día ardió ocho días.
//   · Bereshit Rabá 2:4 — וְרוּחַ אֱלֹהִים מְרַחֶפֶת: זֶה רוּחוֹ שֶׁל מֶלֶךְ הַמָּשִׁיחַ (cita Isaías 11:2).
//   · Nidá 31a — שְׁלֹשָׁה שֻׁתָּפִין יֵשׁ בָּאָדָם: el Santo, su padre y su madre.
//   · Sefer Yetzirá cap. 5 — Jet es letra SIMPLE (ה״ו ז״ח ט״י ל״נ ס״ע צ״ק).
//     Recensión del Gra 5:8: vista (רְאִיָּה) · Cáncer (סַרְטָן) · Tamuz · mano derecha.
//     Recensión impresa 5:2: Cáncer · Tamuz · PIE IZQUIERDO (רגל שמאל). DIVERGEN
//     en el órgano; Ginsburgh sigue al Gra (mano derecha, vista). Declarado.
//   · R. Ginsburgh, inner.org/alefbeit/sigchet + inner.org/hebleter/chet.htm —
//     jet = vav + zayin unidas por la חֲטוֹטֶרֶת (jatoteret, puente-joroba); or yashar
//     + or jozer = "cernerse", "tocar y no tocar"; ratzó vashov; los tres socios
//     (vav=padre, zayin=madre, jatoteret=Dios: la JUPÁ); número 8 = puerta al
//     infinito, 8 vértices del cubo; canal de Jésed a Tiferet; arquetipo Reuvén.
//  Gematrías (calculadas letra por letra, Python):
//    ח = 8 · nombre pleno חית = 8+10+400 = 418 (se lee literalmente חַי + ת)
//    חיים = 8+10+10+40 = 68 · חן = 8+50 = 58 = נח (¡mismas letras invertidas!)
//    חי = 8+10 = 18 · חטא = 8+9+1 = 18 (igualdad verificada; la lectura es drash)
//    מרחפת = 40+200+8+80+400 = 728 = 26×28 (Havayá × כח); y מרחפת es la palabra
//    18 de la Torá (contado palabra por palabra en Génesis 1:1-2) — 18 = חי.
//
//  NOTA DEL SOFER — precisiones y descartes:
//  1) Ginsburgh atribuye la construcción vav+zayin+jatoteret al Arizal ("According
//     to the Ari z\"l"). NO pude anclarla a un capítulo exacto de Etz Jaim, así que
//     se cita como "el Arizal según Ginsburgh", no como cita directa del Arizal.
//  2) Shabat 104a: la pista pedía comprobar si la jet dice "jas vejanún"; el texto
//     real dice ז״ח ט״י כ״ל — זָן אוֹתְךָ וְחָן אוֹתְךָ: la jet es וְחָן אוֹתְךָ ("te
//     agracia"). Se publica con esa grafía exacta, no la de memoria.
//  3) El arpa de Arajín 13b es "del Templo" (כִּנּוֹר שֶׁל מִקְדָּשׁ), no "de David";
//     se cita tal cual. 4) La igualdad חטא = חי = 18 es aritmética verificada, pero
//     el puente vida/pecado que tendemos con ella queda marcado como drash nuestro.
// ─────────────────────────────────────────────────────────────────────────

export const jet: LetterData = {
  slug: "jet",
  letter: "ח",
  nameTranslit: { es: "Jet", en: "Chet", fa: "خِت" },
  nameHe: "חֵית",
  value: 8,

  level1: {
    es: "La Jet no inventa un trazo nuevo. Mírala: es la Vav y la Zayin — las dos letras anteriores — puestas de pie, una junto a la otra, unidas arriba por un puente finísimo. La luz que baja y la luz que vuelve, por fin juntas bajo un mismo techo. Su nombre abre la palabra חַיִּים (jaim, vida) y la palabra חֵן (jen, gracia). Su número es ocho: uno más que el siete de la naturaleza terminada, el primer paso más allá. Y sin embargo esta letra de la vida es también la primera letra de חֵטְא (jet, pecado). La vida, dice Yejezkel de las criaturas vivientes, es רָצוֹא וָשׁוֹב: correr y volver, como el latido, como la respiración. Antes de leer una palabra más, quédate con la pregunta de esta letra: si la vida nunca se queda quieta — ¿dónde vive?",
    en: "The Chet invents no new stroke. Look: it is the Vav and the Zayin — the two previous letters — standing side by side, joined above by the thinnest of bridges. The light that descends and the light that returns, finally under one roof. Its name opens the word chaim (life) and the word chen (grace). Its number is eight: one beyond the seven of completed nature. And yet this letter of life is also the first letter of chet (sin). Life, says Ezekiel of the living creatures, is ratzo vashov: running and returning, like a heartbeat, like breath. Before you read one more word, stay with this letter's question: if life never stands still — where does it live?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "חֵית es la puerta de las palabras que más importan. Con jet empieza חַיִּים (jaim, vida: Deuteronomio 30:19 — וּבָחַרְתָּ בַּחַיִּים, 'y elegirás la vida'). Con jet empieza חֵן (jen, gracia): la primera vez que la Torá la usa es Génesis 6:8 — וְנֹחַ מָצָא חֵן בְּעֵינֵי ה׳, 'y Nóaj halló gracia a los ojos del Eterno'. Y mira lo que está escrito en las letras mismas: נֹחַ (Noaj, 50+8=58) y חֵן (jen, 8+50=58) son exactamente las mismas dos letras invertidas — el que halló la gracia lleva la gracia en el nombre, leída al revés. Con jet empieza también חַת (jat, temor: Génesis 9:2, וּמוֹרַאֲכֶם וְחִתְּכֶם, dicho precisamente a Nóaj) — y Ginsburgh resume el nombre de la letra en ese doblez: temor y fuerza de vida. Y hay que decir lo tercero con la misma honestidad: con jet empieza חֵטְא (jet, pecado). La misma puerta que abre la vida abre su desvío. La gematría lo vuelve inquietante: חַי (vivo) = 18 y חֵטְא = 8+9+1 = 18 — el mismo número (igualdad calculada; el puente que sigue es drash nuestro): el pecado no es una fuerza ajena a la vida, es fuerza de vida desviada de su cauce. Por eso la letra de la vida hay que aprenderla: para que el caudal corra hacia donde bendice.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Jet es la חַיּוּת (jayut), la fuerza vital que late en todo lo creado. La Jasidut —así lo trae Ginsburgh— distingue dos niveles: la 'vida esencial', que es Dios mismo, y la 'vida para vivificar', la corriente que Él hace pasar por las criaturas. Todo lo que vive está enchufado a esa corriente, y la corriente no es continua: pulsa. Se da y se retira, se da y se retira — ratzó vashov. Un mundo con luz fija se disolvería en su fuente; un mundo sin luz se apagaría. El pulso es el compromiso que permite que exista algo además de Dios.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Jet es tu propio latido. Tu vida interior tampoco es una línea recta: corres hacia lo alto —en el rezo, en el estudio, en el instante de fuego— y vuelves al cuerpo, a la mesa, al trabajo. Aprende de las jayot de Yejezkel: el retorno no es una caída, es la segunda mitad del latido. Un corazón que solo se contrae no bombea. El que solo 'corre' se quema; el que solo 'vuelve' se apaga. La vida del alma es el ritmo entero — y la gracia (jen) se le concede, como a Nóaj, al que sigue caminando con Dios en medio del diluvio de idas y vueltas.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Jet toca el misterio del cernerse. וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל פְּנֵי הַמָּיִם (Génesis 1:2): antes de la primera palabra creadora, el espíritu de Dios 'se cernía' sobre las aguas — presente sin aplastar, sosteniendo sin sustituir. El midrash da el nombre de ese espíritu: זֶה רוּחוֹ שֶׁל מֶלֶךְ הַמָּשִׁיחַ, 'es el espíritu del Rey Mashíaj' (Bereshit Rabá 2:4). Y los números guardan el sello: מְרַחֶפֶת = 728 = 26 × 28, el Nombre Havayá (26) multiplicado por כֹּחַ (fuerza, 28) — y es, contada palabra por palabra, la palabra 18 de la Torá: חַי, vivo. El Viviente se cierne desde la palabra dieciocho.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Según el Arizal —así lo transmite Rav Ginsburgh—, la Jet se construye uniendo las dos letras anteriores: una Vav a la derecha, una Zayin a la izquierda, y por encima un puente fino y arqueado llamado חֲטוֹטֶרֶת (jatoteret, 'joroba'). La Vav es el אוֹר יָשָׁר, la luz directa que baja; la Zayin es el אוֹר חוֹזֵר, la luz que retorna. La Jet es su unión — y la energía nueva que nace de unirlas es el secreto del 'cernerse': tocar y no tocar (מַטִּי וְלֹא מַטִּי), como el águila que 'se cierne sobre sus polluelos' (Deuteronomio 32:11) sin aplastar el nido, en la imagen que el Maguid de Mezeritch aplicó a Dios y su creación.\n\nY el puente tiene fuente talmúdica exacta: Rav Ashi cuenta que los escribas más precisos (סָפְרֵי דַּוְקָנֵי) 'jorobaban el techo de la jet' — y la Guemará explica por qué: חַי הוּא בְּרוּמוֹ שֶׁל עוֹלָם, 'el Viviente está en la cima del mundo' (Menajot 29b). La jorobita que apunta hacia arriba es la firma del Dios vivo sobre la letra de la vida. Ginsburgh añade la lectura nupcial: la Vav es el padre, la Zayin es la madre, y la jatoteret que los une por lo alto es Dios — la חוּפָּה, el dosel nupcial. El Talmud lo respalda desde Nidá 31a: 'tres socios hay en el ser humano — el Santo, su padre y su madre'.",
    },
    partes: [
      {
        label: { es: "La Vav (pierna derecha)", en: "The Vav (right leg)", fa: "واو (پایه راست)" },
        significado: {
          es: "La línea derecha es una Vav entera: la luz directa (or yashar), el descenso de la abundancia de arriba hacia abajo. En la lectura nupcial de Ginsburgh, es el padre. Es el 'correr' del ratzó vashov visto desde el cielo: Dios que baja hacia el mundo, la revelación de Su presencia.",
        },
        svgPathId: "jet-vav",
      },
      {
        label: { es: "La Zayin (pierna izquierda)", en: "The Zayin (left leg)", fa: "زاین (پایه چپ)" },
        significado: {
          es: "La línea izquierda es una Zayin entera, con su corona: la luz que retorna (or jozer), lo de abajo que sube de vuelta con más fuerza. En la lectura nupcial, es la madre. Es el 'volver' del ratzó vashov: el mundo que responde, el ocultamiento que deja a la criatura crecer por sí misma.",
        },
        svgPathId: "jet-zayin",
      },
      {
        label: { es: "La jatoteret (el puente)", en: "The chatoteret (the bridge)", fa: "پل (خَطوطِرِت)" },
        significado: {
          es: "El puente fino y arqueado que une a las dos por lo alto — tocando y no tocando. Es la jorobita de los escribas precisos de Menajot 29b: apunta hacia arriba porque 'el Viviente está en la cima del mundo'. Y es la jupá: el tercer socio que convierte dos líneas en una casa. Sin la jatoteret no hay Jet: solo dos letras paradas una junto a otra.",
        },
        svgPathId: "jet-jatoteret",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Jet es una puerta: dos jambas y un dintel. Ginsburgh la describe como el poder de entrar a un nivel más alto de energía y salir de él — como los mundos, que según la Cabalá ascienden en Shabat y descienden después. Una puerta no es muro ni es vacío: es el lugar exacto donde se puede pasar. Toda la creación respira por esa puerta, entrando y saliendo.",
    },
    almas: {
      es: "En el alma, la Jet es la casa del matrimonio: la Vav y la Zayin —que en las dos letras anteriores aprendiste como la luz que baja y la luz que vuelve— aquí se casan bajo la jupá de la jatoteret. Tres socios hay en cada persona, enseña Nidá 31a: padre, madre y el Santo, bendito sea. Dos personas no hacen un hogar por estar cerca; lo hace el tercero que las une por lo alto sin aplastarlas — tocando y no tocando, como todo amor que respeta la libertad del otro.",
    },
    divinidad: {
      es: "En lo divino, la forma de la Jet dibuja el modo en que Dios sostiene el mundo: cerniéndose. Si revelara del todo Su presencia (pura Vav), la criatura se disolvería; si retirara del todo Su fuerza (pura Zayin), dejaría de existir. La jatoteret es el equilibrio exactísimo entre revelación y ocultamiento — el trazo más fino de la letra, porque es el milagro más delicado: que exista un mundo y que su Creador no lo aplaste con Su cercanía ni lo suelte con Su lejanía.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 8,
    guematriaForma: {
      es: "ח = 8 · nombre pleno חית = 8 + 10 + 400 = 418 — escrito, el nombre se lee חַי + ת: 'vivo' (18) llevado hasta la Tav, la última letra · חֵן = 8 + 50 = 58 = נֹחַ · מְרַחֶפֶת = 728 = 26 × 28",
    },
    mundos: {
      es: "8 es el primer número que la naturaleza no alcanza. Siete días tiene el ciclo del mundo (la Zayin te lo enseñó); el ocho es el paso siguiente: lo que está más allá del ciclo. Ginsburgh lo ve hasta en la geometría: el cubo —el cuerpo tridimensional por excelencia— tiene ocho vértices; el ocho es la plenitud de lo físico apuntando fuera de sí. Y el calendario lo confirma: el aceite alcanzaba para un día, y ardió ocho (Shabat 21b) — cuando la naturaleza se queda sin combustible, empieza el número de la Jet.",
    },
    almas: {
      es: "8 es el día del pacto. וּבַיּוֹם הַשְּׁמִינִי יִמּוֹל בְּשַׂר עָרְלָתוֹ — 'al octavo día será circuncidada la carne de su prepucio' (Levítico 12:3; ordenado a Abraham en Génesis 17:12). El niño vive primero su semana completa —un Shabat entero, el ciclo natural cerrado— y al día siguiente entra al pacto: la vida judía empieza en el ocho, un paso más allá de lo que la naturaleza da por sí sola. La Jet, letra de la vida, lleva ese número porque la vida del pacto no es la biología: es la biología abierta hacia arriba, por la puerta.",
    },
    divinidad: {
      es: "8 es la cuerda que falta. R. Yehudá enseña: el arpa del Templo tenía siete cuerdas, como dice 'plenitud de alegrías hay ante Tu rostro' (שֹׂבַע/שֶׁבַע, Salmos 16:11 — el mismo versículo que canta אֹרַח חַיִּים, 'el camino de la VIDA'); la de los días del Mashíaj tendrá OCHO, como dice לַמְנַצֵּחַ עַל הַשְּׁמִינִית, 'al director, sobre la octava' (Salmos 6:1); y la del Mundo Venidero, diez (Salmos 92:4) — Arajín 13b. La octava cuerda ya está escrita en el salterio; solo falta el arpa capaz de sonarla. Ginsburgh llama al ocho 'puerta al infinito': la Jet es la letra que espera esa música.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "Nóaj halló jen: la gracia con su nombre al revés" },
        fuente: {
          es: "Génesis 6:8 — וְנֹחַ מָצָא חֵן בְּעֵינֵי ה׳: primera aparición de חֵן en la Torá. Y en las letras: נֹחַ = 50+8 = 58 = חֵן = 8+50 — las mismas dos letras, invertidas. Cf. Génesis 9:2 — וְחִתְּכֶם ('el temor de ustedes'), dicho también a Nóaj: jen y jat, gracia y temor, las dos caras del nombre de la Jet.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Ratzó vashov: las criaturas que corren y vuelven" },
        fuente: {
          es: "Yejezkel 1:14 — וְהַחַיּוֹת רָצוֹא וָשׁוֹב כְּמַרְאֵה הַבָּזָק: 'y las criaturas vivientes corrían y volvían, como el aspecto del relámpago'. La Jasidut (así lo trae Ginsburgh) lee: no leas jayot (criaturas) sino jayut (fuerza vital) — el pulso de toda vida. El versículo del jashmal (Yejezkel 1:4) pertenece a esta misma visión.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "La joroba de la Jet: el Viviente en la cima del mundo" },
        fuente: {
          es: "Menajot 29b — Rav Ashi: 'he visto que los escribas precisos de la casa de Rav jorobaban el techo de la jet' (חָטְרִי לְהוּ לְגַגֵּיהּ דְּחֵי״ת), 'es decir: חַי הוּא בְּרוּמוֹ שֶׁל עוֹלָם, el Viviente está en la cima del mundo'. La fuente talmúdica exacta de la jatoteret que apunta hacia arriba.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El arpa de ocho cuerdas de los días del Mashíaj" },
        fuente: {
          es: "Arajín 13b — R. Yehudá: כִּנּוֹר שֶׁל מִקְדָּשׁ שֶׁל שִׁבְעַת נִימִין הָיָה... וְשֶׁל יְמוֹת הַמָּשִׁיחַ שְׁמוֹנֶה: el arpa del Templo tenía siete cuerdas; la de los días del Mashíaj, ocho (por Salmos 6:1, עַל הַשְּׁמִינִית); la del Mundo Venidero, diez (Salmos 92:4). El 8 de la Jet es la música que aún no suena.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El alfabeto de los niños: la Jet es 'te agracia'" },
        fuente: {
          es: "Shabat 104a — ז״ח ט״י כ״ל: 'si haces así, el Santo, bendito sea, זָן אוֹתְךָ (te sustenta — la zayin), וְחָן אוֹתְךָ (te agracia — la jet), te hace bien, te da herencia y te ata una corona para el Mundo Venidero'. En el alfabeto que los niños expusieron ante los Sabios, la Jet es el jen: la gracia.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "El espíritu que se cernía era el espíritu del Mashíaj" },
        fuente: {
          es: "Bereshit Rabá 2:4 sobre Génesis 1:2 — וְרוּחַ אֱלֹהִים מְרַחֶפֶת: זֶה רוּחוֹ שֶׁל מֶלֶךְ הַמָּשִׁיחַ ('es el espíritu del Rey Mashíaj'), por Isaías 11:2; y viene 'por el mérito de la teshuvá, comparada al agua'. El 'cernerse' de la Jet —tocar y no tocar— guarda desde el primer versículo al Mashíaj del arpa de ocho cuerdas.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Jet: Cáncer, el mes de Tamuz, la vista" },
        fuente: {
          es: "Sefer Yetzirá cap. 5 — la Jet es una de las doce letras SIMPLES (ה״ו ז״ח ט״י ל״נ ס״ע צ״ק). Recensión del Gra (5:8): הִמְלִיךְ אוֹת ח׳ בִּרְאִיָּה... וְצָר בָּהֶם סַרְטָן בָּעוֹלָם וְתַמּוּז בַּשָּׁנָה וְיָד יָמִין בַּנֶּפֶשׁ — reina en la VISTA, y forma Cáncer, Tamuz y la mano derecha. (Honestidad: la recensión impresa 5:2 le asigna רֶגֶל שְׂמֹאל, pie izquierdo; las recensiones divergen en el órgano. Ginsburgh sigue al Gra.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Vav + Zayin + jatoteret: la letra construida (Arizal)" },
        fuente: {
          es: "Según el Arizal —tal como lo transmite R. Ginsburgh, 'The Hebrew Letters'—, la Jet une la Vav (or yashar, luz directa) y la Zayin (or jozer, luz de retorno) mediante la jatoteret: el secreto de מַטִּי וְלֹא מַטִּי, tocar y no tocar. (Precisión: citado del texto de Ginsburgh; no anclado a un folio del Arizal.) Ginsburgh asigna a la Jet el canal de Jésed a Tiferet.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "El águila que se cierne: tocar y no tocar" },
        fuente: {
          es: "Deuteronomio 32:11 — כְּנֶשֶׁר יָעִיר קִנּוֹ עַל גּוֹזָלָיו יְרַחֵף: 'como el águila que despierta su nido, sobre sus polluelos se cierne'. El Maguid de Mezeritch —así lo trae Ginsburgh— lo lee como imagen de Dios con Su creación: presente sin aplastar, retirado sin abandonar. Y la Jasidut suma el pulso: la vida como ratzó vashov, dos niveles de vida ('esencial' y 'para vivificar'), el latido del tzadik.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Génesis 6:8 — וְנֹחַ מָצָא חֵן בְּעֵינֵי ה׳: primera aparición de חֵן; y נח (58) = חן (58), mismas letras invertidas." },
    { es: "Yejezkel 1:14 — וְהַחַיּוֹת רָצוֹא וָשׁוֹב כְּמַרְאֵה הַבָּזָק: el ratzó vashov de las criaturas vivientes." },
    { es: "Génesis 1:2 — וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל פְּנֵי הַמָּיִם; מרחפת = 728 = 26×28, palabra 18 de la Torá (conteo propio verificado)." },
    { es: "Génesis 17:12 y Levítico 12:3 — la brit milá al octavo día (וּבַיּוֹם הַשְּׁמִינִי יִמּוֹל)." },
    { es: "Deuteronomio 30:19 — וּבָחַרְתָּ בַּחַיִּים ('y elegirás la vida')." },
    { es: "Deuteronomio 32:11 — כְּנֶשֶׁר יָעִיר קִנּוֹ... יְרַחֵף: el águila que se cierne (leído por el Maguid de Mezeritch, según Ginsburgh)." },
    { es: "Génesis 9:2 — וּמוֹרַאֲכֶם וְחִתְּכֶם: jat (temor, raíz חתת), la otra cara del nombre de la Jet." },
    { es: "Menajot 29b — Rav Ashi: los escribas precisos jorobaban el techo de la jet; חַי הוּא בְּרוּמוֹ שֶׁל עוֹלָם." },
    { es: "Arajín 13b — R. Yehudá: arpa del Templo 7 cuerdas (Salmos 16:11), días del Mashíaj 8 (Salmos 6:1, עַל הַשְּׁמִינִית), Mundo Venidero 10 (Salmos 92:4)." },
    { es: "Shabat 104a — ז״ח ט״י כ״ל: זָן אוֹתְךָ וְחָן אוֹתְךָ — la jet en el alfabeto de los niños es 'te agracia'." },
    { es: "Shabat 21b — מַאי חֲנוּכָּה: el aceite de un día que ardió ocho días." },
    { es: "Bereshit Rabá 2:4 — 'el espíritu de Dios que se cernía' es el espíritu del Rey Mashíaj (cita Isaías 11:2)." },
    { es: "Nidá 31a — שְׁלֹשָׁה שֻׁתָּפִין יֵשׁ בָּאָדָם: los tres socios (el Santo, el padre y la madre), base clásica de la lectura nupcial de la forma." },
    { es: "Sefer Yetzirá cap. 5 — Jet, letra simple. Gra 5:8: vista · Cáncer · Tamuz · mano derecha. Impresa 5:2: Cáncer · Tamuz · pie izquierdo. Las recensiones DIVERGEN en el órgano; Ginsburgh sigue al Gra." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' (inner.org/alefbeit/sigchet y hebleter/chet) — vav+zayin+jatoteret (según el Arizal), jupá y tres socios, ratzó vashov, 8 como puerta al infinito y vértices del cubo, canal Jésed→Tiferet, arquetipo Reuvén." },
    { es: "Gematrías calculadas: ח = 8 · חית = 8+10+400 = 418 · חיים = 68 · חן = 58 = נח · חי = 18 = חטא (8+9+1) · מרחפת = 728 = 26×28." },
    { es: "Nota de precisión: la construcción vav+zayin+jatoteret se atribuye al Arizal SEGÚN Ginsburgh (no anclada a folio del Arizal). La igualdad חטא = חי = 18 es aritmética verificada; el puente 'pecado = vida desviada' es drash nuestro y así se marca." },
  ],
};
