import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  GUIMEL (ג) — Data de la tercera letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Shabat 104a — גִּימֶ״ל דָּלֶ״ת: גְּמוֹל דַּלִּים ("haz bien a los pobres");
//     el pie de la guimel se extiende hacia la dalet "porque es el camino del
//     que hace bondades correr tras los pobres"; y la dalet le vuelve la cara
//     para recibir en secreto y no avergonzarse.
//   · Génesis 21:8 — וַיִּגָּמַל ("y fue destetado" Itzjak) + el banquete de Abraham.
//   · Génesis 24:14 — וְגַם גְּמַלֶּיךָ אַשְׁקֶה: los camellos, el jésed y... Itzjak.
//   · Números 17:23 — וַיִּגְמֹל שְׁקֵדִים: la vara de Aharón "maduró" almendras.
//   · Salmos 131:2 — כְּגָמֻל עֲלֵי אִמּוֹ (el niño destetado); Salmos 13:6 —
//     כִּי גָמַל עָלָי; Proverbios 11:17 — גֹּמֵל נַפְשׁוֹ אִישׁ חָסֶד.
//   · Avot 1:2 — עַל שְׁלֹשָׁה דְבָרִים הָעוֹלָם עוֹמֵד (Torá, Avodá, גְּמִילוּת חֲסָדִים).
//   · Sotá 14a — R. Simlai: la Torá empieza y termina con guemilut jasadim.
//   · Shabat 88a — "Bendito el Misericordioso que dio una Torá triple a un
//     pueblo triple por medio de un tercero, en el día tercero, en el mes tercero".
//   · Berajot 16b — אֵין קוֹרִין אָבוֹת אֶלָּא לִשְׁלֹשָׁה: solo tres se llaman "Padres".
//   · Bereshit Rabá 53:10 — R. Hoshayá: נִגְמַל מִיֵּצֶר הָרָע (destetado del yétzer).
//   · Sefer Yetzirá cap. 4 — Guimel es letra DOBLE (בג״ד כפר״ת). Recensiones:
//     la impresa (4:6) le da Júpiter (צדק), día segundo y ojo izquierdo (sin
//     nombrar el don en ese verso); la del Gra (4:9) le da la RIQUEZA (עוֹשֶׁר,
//     opuesto: עוֹנִי, pobreza), Marte (מאדים), día segundo y oído derecho.
//   · R. Yitzchak Ginsburgh, tabla de la Guimel (inner.org/alefbeit/siggimel.htm,
//     hoy caída; verificada en el archivo Wayback, captura 2011-01-27):
//     concepto: "la búsqueda de recompensa y castigo en el contexto del mundo
//     físico"; significado: "camello; puente; destete; benevolencia"; forma:
//     "un cuerpo (la vav) caminando (la yud adherida como pie)"; espacio: Marte;
//     tiempo: lunes; alma: oído derecho; don: riqueza; arquetipo: Itzjak;
//     canal: de Biná a Guevurá. (Sigue la recensión del Gra.)
//  Gematrías (calculadas letra por letra):
//    ג = 3 · nombre pleno גימל = 3+10+40+30 = 83 (grafía del Talmud, Shabat 104a)
//    גמל (camello) = 3+40+30 = 73 = חכמה (8+20+40+5 = 73)
//    גומל (el que da) = 3+6+40+30 = 79 = גמול (la retribución): mismas letras.
//
//  NOTA DEL SOFER — descartado por no verificable: (1) la etimología directa
//  "guimel viene de gamal (camello)" se presenta como tradición de lectura,
//  no como certeza filológica; lo que SÍ está anclado es el juego del Talmud
//  (גימ״ל = גמול, Shabat 104a) y la triple familia de la raíz ג-מ-ל en el
//  Tanaj (dar/retribuir, destetar/madurar, camello). (2) La igualdad
//  גמל = 73 = חכמה es aritmética exacta, pero el puente "el camello lleva a
//  la Sabiduría" es drash nuestro, no cita de Ginsburgh: se marca como tal.
//  (3) No se cita el Zohar: no se halló folio exacto sobre la guimel que
//  pudiera verificarse. (4) La bendición HaGomel (Berajot 54b) se menciona
//  solo de pasada en fuentes, sin construir sobre ella.
// ─────────────────────────────────────────────────────────────────────────

export const guimel: LetterData = {
  slug: "guimel",
  letter: "ג",
  nameTranslit: { es: "Guimel", en: "Gimel", fa: "گیمِل" },
  nameHe: "גִּימֶל",
  value: 3,

  level1: {
    es: "Mira la Guimel de cerca: es una Vav a la que le salió un pie. Una línea que ya no está quieta — una figura que camina. ¿Y hacia dónde camina? El Talmud lo responde con una imagen que no se olvida: la Guimel corre tras la Dalet, la letra del pobre (dal). El que tiene, persiguiendo al que no tiene — no al revés. Su nombre suena a gamal, el camello que cruza el desierto cargando sustento; y a nigmal, el niño destetado que ya come solo; y a guemilut jasadim, los actos de bondad sobre los que el mundo se sostiene. Su número es tres: el primer número que puede unir a dos. Antes de seguir, quédate con la pregunta que esta letra lleva en el pie: ¿por qué el que da tiene que correr detrás del que recibe?",
    en: "Look closely at the Gimel: it is a Vav that grew a foot. A line no longer standing still — a figure walking. And where is it walking? The Talmud answers with an unforgettable image: the Gimel runs after the Dalet, the letter of the poor (dal). The one who has, pursuing the one who has not — not the other way around. Its name echoes gamal, the camel crossing the desert loaded with sustenance; and nigmal, the weaned child who now eats on his own; and gemilut chasadim, the acts of kindness upon which the world stands. Its number is three: the first number that can unite two. Before reading on, stay with the question this letter carries in its foot: why must the giver run after the receiver?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "El nombre גִּימֶל abre una familia entera de palabras, y el propio Talmud es quien la abre: en Shabat 104a los niños del bet midrash leen גִּימֶ״ל דָּלֶ״ת como גְּמוֹל דַּלִּים — 'haz bien a los pobres'. Para los Sabios, el nombre de esta letra ES un verbo: gamal, dar, retribuir, colmar de bien. Esa raíz ג-מ-ל teje tres significados en el Tanaj que parecen distintos y no lo son. Primero, dar y retribuir: גֹּמֵל נַפְשׁוֹ אִישׁ חָסֶד, 'el hombre de bondad se hace bien a sí mismo' (Proverbios 11:17); כִּי גָמַל עָלָי, 'porque me ha colmado de bien' (Salmos 13:6). Segundo, destetar y madurar: וַיִּגָּמַל, 'e Itzjak fue destetado' (Génesis 21:8); כְּגָמֻל עֲלֵי אִמּוֹ, 'como niño destetado sobre su madre' (Salmos 131:2); y hasta la vara de Aharón וַיִּגְמֹל שְׁקֵדִים, 'maduró almendras' (Números 17:23). Tercero, el camello: גָּמָל, la bestia que atraviesa el desierto cargando agua y provisión.\n\nRav Ginsburgh resume los sentidos de la letra así: 'camello; puente; destete; benevolencia'. Y conviene ser honestos sobre qué es qué: que el nombre de la letra 'venga' del camello es tradición de lectura, no certeza filológica. Lo que sí está anclado con precisión es la red: dar, madurar y cargar sustento brotan de las mismas tres letras. Madurar ES una forma de dar: el fruto que madura se vuelve comestible para otro. Y el destete es la forma más fina del dar: la madre que deja de dar leche no deja de dar — da independencia.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Guimel es el camello: el puente viviente entre lugar y lugar. El desierto separa las ciudades; el gamal las une, cargando el sustento a través de lo que no tiene agua. Así funciona la creación entera: nada vive de sí mismo, todo recibe de un canal que atravesó el vacío para llegar. Y la Guimel es también la maduración — וַיִּגְמֹל שְׁקֵדִים, la vara seca que amanece cargada de almendras (Números 17:23): el mundo físico como fruto que va madurando hasta poder ser entregado.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Guimel es guemilut jasadim: no la limosna que espera en casa, sino la bondad que sale a buscar. Shimón HaTzadik enseñó que el mundo se sostiene sobre tres cosas — la Torá, el servicio y los actos de bondad (Avot 1:2) — y la guimel, tercera letra, número tres, lleva el tercero de los pilares en su propio nombre. Pero hay algo más fino: la raíz también significa destetar. El alma-guimel aprende las dos artes juntas: dar al que necesita, y dejar de dar cuando el dar ya estorba — porque madurar a alguien también es hacerle un bien. El Midrash lo dice de Itzjak: נִגְמַל מִיֵּצֶר הָרָע, fue destetado del impulso del mal (Bereshit Rabá 53:10). Hay cosas de las que uno se desteta, y ese destete es el regalo.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Guimel es el Dador que persigue. כִּי גָמַל עָלָי — 'cantaré al Eterno porque me ha colmado de bien' (Salmos 13:6): el verbo de la guimel es lo que David encuentra cuando busca nombrar lo que Dios hace con él. Y R. Simlai enseña que la Torá entera está enmarcada en ese verbo hecho actos: empieza con guemilut jasadim — Dios mismo viste a Adam y Javá — y termina con guemilut jasadim — Dios mismo entierra a Moshé (Sotá 14a). El libro más alto abre y cierra con el Autor haciendo lo que la guimel corre a hacer: bondad concreta, con las manos.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh describe la forma con una sola imagen: 'un cuerpo (la vav) caminando (la yud adherida como pie)' (tabla de la Guimel, inner.org). La Guimel es la primera letra del alfabeto que se mueve: la Álef está de pie, la Bet es una casa — la Guimel camina. Y el Talmud dice exactamente hacia dónde: מַאי טַעְמָא פְּשׁוּטָה כַּרְעֵיהּ דְּגִימֶ״ל לְגַבֵּי דָּלֶ״ת — '¿por qué el pie de la guimel se extiende hacia la dalet? Porque es el camino del que hace bondades (gomel jasadim) correr tras los pobres (dalim)' (Shabat 104a). El trazo mismo es una persona con el pie lanzado hacia adelante, alcanzando a la letra siguiente.\n\nY la escena tiene segunda mitad, igual de exacta: la dalet extiende su pie hacia la guimel 'para hacerse encontrable', pero le vuelve la cara — דְּלִיתֵּן לֵיהּ בְּצִינְעָה — 'para que le dé en secreto, y no se avergüence de él' (Shabat 104a). Dos letras coreografiadas: una corre, la otra se deja alcanzar sin mirar. El alfabeto lleva dos mil años enseñando cómo se da con dignidad.",
    },
    partes: [
      {
        label: { es: "El cuerpo (la Vav)", en: "The body (the vav)", fa: "بدن (واو)" },
        significado: {
          es: "El trazo vertical: una Vav, el canal que baja la luz. En la Bet la línea era pared de una casa; aquí es un torso en marcha. La Guimel toma el canal quieto de la Vav y lo pone de camino: la luz que recibiste no es para almacenarla — es para llevarla a alguien. Un cuerpo es un canal que aprendió a moverse.",
        },
        svgPathId: "guimel-body",
      },
      {
        label: { es: "El pie (la Yud)", en: "The foot (the yud)", fa: "پا (یود)" },
        significado: {
          es: "La yud pequeña adherida abajo, lanzada hacia la izquierda — hacia la Dalet, en la dirección de la escritura. Es el detalle que lo dice todo: el pie no descansa bajo el cuerpo, está en zancada. Shabat 104a lo lee sin rodeos: así corre el que hace bondades tras los pobres. La yud es la letra más pequeña, un punto de esencia; puesta como pie, enseña que el paso hacia el otro, por chico que sea, carga la esencia entera de la letra.",
        },
        svgPathId: "guimel-foot",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Guimel enseña que el sustento viaja. Nada en la creación se alimenta de lo que tiene al lado: la lluvia viene de lejos, la semilla viene de otro árbol, la luz viene del sol. Todo lo vivo es alcanzado por algo que corrió hacia él. La guimel es esa mecánica del universo hecha trazo: el bien en movimiento hacia donde falta.",
    },
    almas: {
      es: "En el alma, la Guimel te pregunta por la dirección de tus pies. Es fácil dar cuando te tocan la puerta; la guimel da un paso más — ella toca la puerta. Y la coreografía completa de Shabat 104a te enseña el segundo movimiento, el difícil: dar de modo que el otro no tenga que verte la cara, para que no se avergüence. Correr hacia el pobre y, al llegar, volverse casi invisible. La zancada es de la guimel; la dignidad, de la dalet; el arte está en respetar los dos lados.",
    },
    divinidad: {
      es: "En lo divino, el que corre primero es Él. Antes de que nadie pidiera, la Torá abre con Dios vistiendo a los desnudos y cierra con Dios enterrando a su profeta (Sotá 14a): el Gomel jasadim original, corriendo tras un mundo que es todo dalet — todo carencia. La guimel del alfabeto es huella de esa carrera: cada acto humano de bondad que sale a buscar repite, abajo, el gesto con el que el Creador sostiene lo creado.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 3,
    guematriaForma: {
      es: "ג = 3 · nombre pleno גימל = 3 + 10 + 40 + 30 = 83 · גָּמָל (camello) = 3 + 40 + 30 = 73 = חָכְמָה (8 + 20 + 40 + 5 = 73) · גּוֹמֵל (el que da) = 79 = גְּמוּל (la retribución): las mismas letras, reordenadas",
    },
    mundos: {
      es: "3 es el número que estabiliza. Uno está solo; dos se enfrentan; tres sostiene. Por eso Shimón HaTzadik cuenta TRES pilares del mundo: Torá, Avodá y guemilut jasadim (Avot 1:2) — un trípode no se tambalea. Y la Guemará canta la cuenta completa: 'Bendito el Misericordioso que dio una Torá triple (Torá, Profetas, Escritos) a un pueblo triple (cohanim, leviim, israelim) por medio de un tercero (Moshé, tercer hijo), en el día tercero, en el mes tercero' (Shabat 88a). La revelación entera vino firmada con el número de la guimel.",
    },
    almas: {
      es: "3 es el tercero que reconcilia. Solo tres se llaman Padres — Abraham, Itzjak y Yaakov (Berajot 16b) — y el tercero, Yaakov, es en la tradición el que armoniza la bondad del primero con el rigor del segundo. Fíjate además en el guiño verificado de las fuentes: el arquetipo que Ginsburgh asigna a la guimel es Itzjak — el niño destetado de Génesis 21:8 (וַיִּגָּמַל), aquel cuya esposa fue hallada por un acto de jésed con camellos: 'también a tus camellos (גְּמַלֶּיךָ) daré de beber... ella es la que designaste para Itzjak' (Génesis 24:14). Destete, camello y bondad — las tres caras de la raíz — se encuentran en la misma vida. En ti, el tres es la madurez: dejar de ser el que solo recibe (uno), pasar por el enfrentamiento con el otro (dos), y volverte el que puede dar (tres).",
    },
    divinidad: {
      es: "El camello bíblico, גמל, suma 73 — exactamente חָכְמָה, la Sabiduría (73). La aritmética es exacta; el puente es nuestro drash, y dice esto: lo que cruza el desierto cargando sustento tiene el número de la Sabiduría, porque Jojmá es en la Cabalá el punto primero del que todo se nutre. Y hay un segundo secreto, escrito en las letras mismas: גּוֹמֵל (el que da, 79) y גְּמוּל (la recompensa, 79) son las mismas cuatro letras reordenadas. El dar y su fruto no son dos cosas que haya que juntar: son un solo cuerpo de letras que gira. El que da ya está, sin saberlo, dentro de su recompensa — גֹּמֵל נַפְשׁוֹ אִישׁ חָסֶד (Proverbios 11:17).",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "El destete de Itzjak: el primer banquete de la Torá" },
        fuente: {
          es: "Génesis 21:8 — 'וַיִּגְדַּל הַיֶּלֶד וַיִּגָּמַל וַיַּעַשׂ אַבְרָהָם מִשְׁתֶּה גָדוֹל בְּיוֹם הִגָּמֵל אֶת יִצְחָק': el niño creció y fue destetado (raíz ג-מ-ל), y Abraham hizo un gran banquete. La Torá celebra con fiesta el día en que alguien deja de necesitar — madurar es motivo de banquete.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Los camellos que encontraron esposa para Itzjak" },
        fuente: {
          es: "Génesis 24:14 — 'וְגַם גְּמַלֶּיךָ אַשְׁקֶה... אֹתָהּ הֹכַחְתָּ לְעַבְדְּךָ לְיִצְחָק... כִּי עָשִׂיתָ חֶסֶד עִם אֲדֹנִי': la señal para reconocer a Rivká es un acto de bondad con camellos (גמלים) — y el versículo mismo lo llama jésed. El camello de la guimel como escenario donde la bondad se vuelve visible.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Guimel-Dalet: haz bien a los pobres — y corre" },
        fuente: {
          es: "Shabat 104a — 'גִּימֶ״ל דָּלֶ״ת — גְּמוֹל דַּלִּים. מַאי טַעְמָא פְּשׁוּטָה כַּרְעֵיהּ דְּגִימֶ״ל לְגַבֵּי דָּלֶ״ת — שֶׁכֵּן דַּרְכּוֹ שֶׁל גּוֹמֵל חֲסָדִים לָרוּץ אַחַר דַּלִּים': el pie de la guimel corre tras la dalet, y la dalet vuelve la cara 'para que le dé en secreto y no se avergüence'. La lección la dijeron niños, y ni en los días de Yehoshúa bin Nun se había dicho algo igual.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La Torá empieza y termina con actos de bondad" },
        fuente: {
          es: "Sotá 14a — R. Simlai: 'תּוֹרָה תְּחִלָּתָהּ גְּמִילוּת חֲסָדִים וְסוֹפָהּ גְּמִילוּת חֲסָדִים': al principio, Dios viste a Adam y Javá (Génesis 3:21); al final, Dios entierra a Moshé (Deuteronomio 34:6). El marco de todo el libro es el verbo de la guimel.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Torá triple, pueblo triple, mes tercero" },
        fuente: {
          es: "Shabat 88a — 'בְּרִיךְ רַחֲמָנָא דִּיהַב אוֹרְיָאן תְּלִיתַאי לְעַם תְּלִיתַאי עַל יְדֵי תְּלִיתַאי בְּיוֹם תְּלִיתַאי בְּיַרְחָא תְּלִיתַאי': bendito el Misericordioso que dio una Torá triple a un pueblo triple, por medio de un tercero, en el día tercero, en el mes tercero. Cf. Berajot 16b: solo tres se llaman Padres (אֵין קוֹרִין אָבוֹת אֶלָּא לִשְׁלֹשָׁה).",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "Destetado del impulso del mal" },
        fuente: {
          es: "Bereshit Rabá 53:10 — sobre וַיִּגָּמַל (Génesis 21:8): 'רַבִּי הוֹשַׁעְיָה רַבָּה אָמַר נִגְמַל מִיֵּצֶר הָרָע, רַבָּנָן אָמְרֵי נִגְמַל מֵחֲלָבוֹ': R. Hoshayá lee que Itzjak fue destetado del yétzer hará; los Sabios, de la leche. El destete de la guimel como maduración espiritual, no solo física.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Guimel: letra doble — riqueza y pobreza" },
        fuente: {
          es: "Sefer Yetzirá 4:1-2 — la guimel es una de las siete letras DOBLES (בג״ד כפר״ת), cada una con un don y su reverso. En la recensión del Gra (4:9), a la guimel le corresponden la riqueza (עוֹשֶׁר) y su opuesto la pobreza (עוֹנִי), Marte, el día segundo y el oído derecho; la recensión impresa (4:6) le asigna Júpiter (צדק), el día segundo y el ojo izquierdo. Riqueza/pobreza: la letra que corre tras los pobres rige exactamente ese eje.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El canal de Biná a Guevurá" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, tabla de la Guimel (inner.org/alefbeit/siggimel.htm, vía archivo) — el canal de la guimel baja de Biná (el entendimiento-Madre) a Guevurá (el rigor), con Itzjak como arquetipo: el patriarca del rigor, destetado y madurado. El dar de la guimel no es blandura: es fuerza que discierne a quién, cuánto y cuándo.",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "El camello vale Sabiduría: 73 = 73" },
        fuente: {
          es: "Gematría calculada: גמל = 3+40+30 = 73; חכמה = 8+20+40+5 = 73. Aritmética exacta; el puente es drash nuestro: el que carga sustento a través del desierto lleva el número de Jojmá, el punto primero que nutre todo el Árbol. Cf. גומל (79) = גמול (79): el dador y la retribución son las mismas letras.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "Camello, puente, destete, benevolencia" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' — tabla de la Guimel (inner.org/alefbeit/siggimel.htm, verificada en archivo Wayback): concepto, 'la búsqueda de recompensa y castigo en el contexto del mundo físico'; significados, 'camello; puente; destete; benevolencia'; forma, 'un cuerpo (la vav) caminando (la yud adherida como pie)'; don: riqueza; arquetipo: Itzjak. La letra que enseña que el mundo físico es el terreno donde el bien se corre, se carga y se entrega.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Shabat 104a — גימ״ל דל״ת: גמול דלים; el pie de la guimel corre tras la dalet (דרכו של גומל חסדים לרוץ אחר דלים); la dalet vuelve la cara para recibir en secreto." },
    { es: "Génesis 21:8 — וַיִּגָּמַל: el destete de Itzjak y el banquete de Abraham." },
    { es: "Génesis 24:14 — וְגַם גְּמַלֶּיךָ אַשְׁקֶה: los camellos, el jésed explícito (כִּי עָשִׂיתָ חֶסֶד) y la esposa para Itzjak." },
    { es: "Números 17:23 — וַיִּגְמֹל שְׁקֵדִים: la vara de Aharón madura almendras (raíz ג-מ-ל como madurar)." },
    { es: "Salmos 131:2 — כְּגָמֻל עֲלֵי אִמּוֹ (el niño destetado); Salmos 13:6 — כִּי גָמַל עָלָי (Dios colma de bien)." },
    { es: "Proverbios 11:17 — גֹּמֵל נַפְשׁוֹ אִישׁ חָסֶד: el que hace bondad se hace bien a sí mismo." },
    { es: "Avot 1:2 — Shimón HaTzadik: el mundo se sostiene sobre Torá, Avodá y guemilut jasadim." },
    { es: "Sotá 14a — R. Simlai: la Torá empieza (Génesis 3:21) y termina (Deuteronomio 34:6) con guemilut jasadim." },
    { es: "Shabat 88a — el dictum del galileo ante Rav Jisdá: Torá triple, pueblo triple, tercero, día tercero, mes tercero." },
    { es: "Berajot 16b — אין קורין אבות אלא לשלשה: solo tres se llaman Padres." },
    { es: "Bereshit Rabá 53:10 — נגמל מיצר הרע: destetado del impulso del mal (R. Hoshayá)." },
    { es: "Sefer Yetzirá cap. 4 — Guimel, letra doble (בג״ד כפר״ת). Recensión impresa 4:6: Júpiter · día 2 · ojo izquierdo. Recensión del Gra 4:9: riqueza/pobreza (עושר/עוני) · Marte · día 2 · oído derecho. Las recensiones difieren; Ginsburgh sigue al Gra." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' — tabla de la Guimel (inner.org/alefbeit/siggimel.htm; la página actual da 404 y se verificó en el archivo Wayback, captura del 2011-01-27): camello/puente/destete/benevolencia · cuerpo (vav) caminando con pie (yud) · Marte · lunes · oído derecho · don: riqueza · arquetipo: Itzjak · canal Biná→Guevurá." },
    { es: "Gematrías calculadas: ג = 3 · גימל = 3+10+40+30 = 83 · גמל = 3+40+30 = 73 = חכמה (8+20+40+5) · גומל = 79 = גמול (mismas letras)." },
    { es: "Nota de precisión: 'guimel viene de gamal (camello)' es tradición de lectura, no etimología comprobada; lo anclado es el juego del Talmud (גמול דלים) y la triple familia bíblica de la raíz ג-מ-ל. El puente גמל=73=חכמה es drash nuestro (la aritmética sí es exacta). No se cita el Zohar por no haberse hallado folio verificable sobre la guimel." },
  ],
};
