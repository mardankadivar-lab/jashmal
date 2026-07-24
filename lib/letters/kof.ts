import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  KOF (ק) — Data de la decimonovena letra. Contenido erudito VERIFICADO por
//  el Sofer (editor-erudito) contra Sefaria. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · I Reyes 10:22 (וְקֹפִים) y II Crónicas 9:21 (וְקוֹפִים) — los "monos" que la
//     flota de Shlomó traía cada tres años: קוֹף (mono) SÍ es bíblico.
//   · Bava Batra 58a — "הַכֹּל בִּפְנֵי שָׂרָה כְּקוֹף בִּפְנֵי אָדָם": el mono como copia
//     disminuida (la fuente del tema "imitación / lo profano que imita lo santo").
//   · Génesis 21:5 — אַבְרָהָם בֶּן מְאַת שָׁנָה: Abraham tenía 100 al nacer Itzjak.
//     Génesis 21:6 — צְחֹק עָשָׂה לִי אֱלֹהִים (la risa, יִצְחַק־לִי).
//   · Menajot 43b — R. Meir: חַיָּיב אָדָם לְבָרֵךְ מֵאָה בְּרָכוֹת בְּכׇל יוֹם (100 bendiciones
//     al día), derivado de Deut 10:12 leyendo מָה como מֵאָה (100).
//   · Sefer Yetzirá 5:1-2 — Kof es letra SIMPLE (פשוטה): דגים (Piscis) · Adar ·
//     órgano קרקבן (molleja/estómago). Facultad en la recensión impresa: שֵׁינָה (sueño).
//   · Bereshit Rabá 68:9 — por qué se llama a Dios מָקוֹם: "הוּא מְקוֹמוֹ שֶׁל עוֹלָם
//     וְאֵין עוֹלָמוֹ מְקוֹמוֹ" (Él es el Lugar del mundo, el mundo no es Su lugar).
//  Gematrías (calculadas letra por letra):
//    ק = 100 · nombre pleno קוף = 100+6+80 = 186 = מָקוֹם (40+100+6+40 = 186) ⟵ hallazgo
//    קדושה (kedushá) = 415 · יצחק (Itzjak) = 208 · צחק = 198
//
//  NOTA DEL SOFER — honestidad intelectual:
//   1) קוֹף como NOMBRE de la letra y קוֹף "mono" son homógrafos; el bíblico es el
//      "mono" (I Reyes 10:22). Que el nombre de la letra SIGNIFIQUE "mono" es
//      lectura tradicional/drash, no etimología cerrada (otros: "ojo de aguja",
//      "nuca"). Se presenta como drash, no como cita.
//   2) La tabla oficial de Ginsburgh para la kof (inner.org/alefbeit/sigkuf) NO
//      cargó con su contenido (devolvió un índice de blog). Por eso NO se le
//      atribuyen frases textuales; los conceptos de "luz circundante" (מקיף/הקף)
//      y descenso se anclan a fuentes clásicas y a la gematría propia (186=מקום),
//      no a un folio de Ginsburgh.
//   3) Menajot 29b (las coronas/tagín, R. Akiva) NO singulariza a la kof; se omite
//      para no sobre-atribuir.
//   4) El "ojo de aguja" (קוֹפָא דְמַחְטָא) no pudo anclarse a segmento exacto en
//      Sefaria en esta sesión; se omite.
//   5) הֶקֵּף (hekef, "circundar") = 185, NO 186: NO se fuerza igualdad. La única
//      igualdad exacta es קוף = מקום = 186.
// ─────────────────────────────────────────────────────────────────────────

export const kof: LetterData = {
  slug: "kof",
  letter: "ק",
  nameTranslit: { es: "Kof", en: "Kuf", fa: "قوف" },
  nameHe: "קוֹף",
  value: 100,

  level1: {
    es: "Fíjate en la línea del renglón, esa base invisible sobre la que se apoyan todas las letras. Ahora mira la Kof: es la única que la atraviesa. Su pierna baja por debajo de la línea, hacia el fondo, hacia donde ninguna otra letra se atreve a ir. Y sin embargo con la Kof empieza la palabra קְדֻשָּׁה, 'santidad'. He ahí la paradoja: la letra que más abajo desciende es la letra de lo más alto. Su número es cien —diez veces diez, la rueda entera cerrada sobre sí misma— y su nombre, קוֹף, es también la palabra 'mono': el que imita sin entender. Antes de leer una palabra más, quédate con esto: ¿por qué la santidad tendría que bajar por debajo de la línea, al lugar donde ni siquiera se distingue lo verdadero de su imitación?",
    en: "Look at the ruled line, that invisible baseline every letter rests on. Now look at the Kof: it is the only one that breaks through it. Its leg descends below the line, down toward the depths where no other letter dares to go. And yet the Kof begins the word קְדֻשָּׁה, 'holiness.' There is the paradox: the letter that descends the lowest is the letter of the highest. Its number is one hundred — ten times ten, the full wheel closed upon itself — and its name, קוֹף, is also the word for 'ape': the one who imitates without understanding. Before reading one more word, sit with this: why would holiness have to descend below the line, to the very place where the true and its imitation can no longer be told apart?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "El nombre קוֹף carga con dos sentidos que hay que separar con cuidado. El primero, y hay que decirlo sin adornos, es que קוֹף también significa 'mono', y ese sí es bíblico: la flota de Shlomó traía cada tres años 'oro, plata, marfil, monos (קֹפִים) y pavos reales' (I Reyes 10:22; y en paralelo II Crónicas 9:21, וְקוֹפִים). El Talmud lo convierte en imagen de la copia disminuida: 'todos ante Sará son כְּקוֹף בִּפְנֵי אָדָם, como un mono ante un hombre; y Sará ante Javá, como un mono ante un hombre' (Bava Batra 58a). El mono no es lo feo: es lo que se parece a lo verdadero sin serlo. Imita el gesto, no la vida que lo mueve.\n\nEl segundo sentido es el opuesto exacto, y también empieza con kof: קְדֻשָּׁה, kedushá, 'santidad'. La misma letra abre la palabra del mono y la palabra de lo santo. Aquí conviene la honestidad del Sofer: que el NOMBRE de la letra signifique 'mono' es lectura tradicional (otros proponen 'ojo de aguja' o 'nuca'), no una etimología cerrada. Pero el drash es demasiado exacto para ignorarlo, porque describe una verdad del mundo de abajo: en el punto más bajo, lo santo y su imitación se dibujan casi idénticos. La Kof es la letra de esa frontera peligrosa —קדושה y קוף, santidad y remedo, escritas con el mismo primer trazo— y su tarea es enseñarte a distinguirlas.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Kof es la santidad que se anima a bajar hasta el sótano de la creación. Todo mundo tiene un fondo, un lugar por debajo de la línea donde las chispas cayeron y donde la copia se hace pasar por original. La Kof es la única letra que desciende hasta ahí — no para quedarse, sino para recoger. Es cien: la rueda completa (diez por diez) que no se cierra arriba, en lo cómodo, sino que da la vuelta entera y toca el punto más hondo. Un mundo solo está entero cuando su santidad llegó también al piso.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Kof es tu capacidad de bajar sin perderte. Hay lugares del alma —el hábito vacío, la fe repetida sin corazón, el gesto religioso convertido en mueca— que son 'la cara de mono' de lo santo: la forma correcta sin la vida adentro. La avodá de la Kof no es huir de esos lugares: es entrar en ellos y devolverles el alma. Pero la letra te avisa, en su propia forma, del riesgo: al descender bajo la línea puedes confundir la santidad con su imitación. Por eso la Kof lleva una brecha en el trazo — un salto que solo la emuná (la fe) cruza. Bajas con fe, o no bajas.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Kof revela su secreto en el número. Su nombre pleno, קוֹף, suma 186 — exactamente מָקוֹם (40+100+6+40), uno de los Nombres de Dios. Y el Midrash explica ese Nombre justo así: '¿por qué se llama al Santo, bendito sea, מָקוֹם, Lugar? Porque Él es el lugar del mundo, y el mundo no es Su lugar' (Bereshit Rabá 68:9, sobre Génesis 28:11 y Éxodo 33:21). Ese es el sentido más profundo de la Kof: la santidad que circunda todo desde afuera —la 'luz que abarca', el makif— y que por eso mismo puede alcanzar hasta el punto más bajo. Lo que rodea todos los mundos es lo único que puede tocar el fondo de todos ellos. La Kof desciende bajo la línea porque el מָקוֹם no tiene un 'abajo' que le quede lejos.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "La Kof es la única de las veintidós que rompe la línea del renglón hacia abajo. Todas las demás se apoyan en la base o suben; solo la Kof mete la pierna por debajo, en pleno medio de la palabra (las finales ך ן ף ץ también bajan, pero cierran; la Kof lo hace y sigue). Ese descenso es toda su enseñanza y está en el trazo.\n\nLa lectura tradicional la descompone en dos piezas que casi se tocan: arriba, una forma de רֵישׁ (resh) —techo y brazo, la cabeza que se apoya en la línea— y, colgando por dentro, un trazo suelto, separado, parecido a una זַיִן o una וָו, que se descuelga hacia el fondo. Entre ambos hay una brecha: la pierna interior NO llega a soldarse con el techo. Esa separación no es un defecto del escriba, es el corazón de la letra. La cabeza (resh) se queda en el mundo de la luz; la pierna baja sola, por debajo de la línea, hacia los mundos inferiores. Y lo único que las mantiene unidas es el aire de la brecha — el salto de fe. La Kof enseña que se puede descender al fondo sin cortarse de lo alto, pero solo si algo cruza el vacío que las separa.",
    },
    partes: [
      {
        label: { es: "El techo (la cabeza-resh)", en: "The roof (the reish-head)", fa: "سقف" },
        significado: {
          es: "La parte superior, con forma de רֵישׁ: techo horizontal y brazo que baja hasta la línea, sin cruzarla. Es la santidad que permanece en su nivel, la 'cabeza' de la letra apoyada en la superficie del mundo. Sola, sería una resh más. Lo que la hace Kof es lo que le cuelga por dentro y baja donde ella no baja.",
        },
        svgPathId: "kof-roof",
      },
      {
        label: { es: "La pierna que rompe la línea (el descenso)", en: "The leg that breaks the line (the descent)", fa: "پای فرورونده" },
        significado: {
          es: "El trazo interior que se descuelga por debajo de la base del renglón — lo único en todo el alfabeto que hace eso en medio de una palabra. Es la santidad que se anima a bajar al sótano de la creación, al lugar de las chispas caídas. No desciende para perderse: desciende para recoger y volver. La Kof no es cien porque se quede arriba, sino porque da la vuelta completa hasta tocar el fondo.",
        },
        svgPathId: "kof-leg",
      },
      {
        label: { es: "La brecha (el salto de fe)", en: "The gap (the leap of faith)", fa: "شکاف" },
        significado: {
          es: "El espacio de aire entre la cabeza-resh y la pierna que baja: en la Kof, la pierna interior no se suelda al techo. Esa brecha es deliberada. Enseña que quien desciende al fondo queda, por un instante, sin apoyo visible en lo alto — y que solo la emuná (la fe) cruza ese vacío. Bajar a redimir sin cortarse de la fuente exige un salto. La Kof lo lleva dibujado.",
        },
        svgPathId: "kof-gap",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Kof enseña que la creación no termina en la línea del renglón. Hay un debajo — el fondo donde cayeron las chispas — y ningún mundo está completo mientras ese fondo quede sin visitar. La Kof es el único trazo que la Torá deja bajar hasta ahí. Su pierna rota la línea para recordarte que la santidad no es un piso alto al que se sube, sino una raíz que llega hasta abajo.",
    },
    almas: {
      es: "En el alma, tú eres esa cabeza-resh apoyada en la superficie de tus días, y hay una parte tuya que tiene que bajar más hondo: al hábito muerto, al miedo, a lo que en ti solo imita estar vivo. La forma de la Kof te da el método y la advertencia juntos. El método: baja. La advertencia: baja con la brecha — sabiendo que por un momento no verás tu apoyo de arriba, y que solo la fe sostiene el descenso. El alma que solo se queda en el techo nunca redime nada; el alma que baja sin fe se pierde en el fondo.",
    },
    divinidad: {
      es: "En lo divino, la brecha de la Kof es la firma del מָקוֹם. La luz circundante (makif) rodea todos los mundos desde afuera, sin entrar 'por dentro' de ellos como una luz interior — por eso queda siempre esa distancia, ese aire, entre lo que abarca y lo abarcado. La Kof dibuja esa distancia: la cabeza arriba, la pierna abajo, y entre ambas el espacio que solo lo Infinito cruza. Lo que rodea todo desde afuera es, justamente, lo que puede tocar el fondo de todo sin dejar de rodearlo.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 100,
    guematriaForma: {
      es: "ק = 100 · nombre pleno קוֹף = 100 + 6 + 80 = 186 = מָקוֹם (40 + 100 + 6 + 40 = 186), Nombre divino: 'el Lugar del mundo' (Bereshit Rabá 68:9)",
    },
    mundos: {
      es: "100 es la rueda entera: diez sefirot contempladas cada una en las diez, la creación completa multiplicada por sí misma. No es 'muchos', es 'todo el ciclo cerrado'. Por eso la Kof es la letra de la vuelta completa: lo que empieza arriba tiene que dar el giro entero hasta abajo para llegar a cien. Un mundo a medio ciclo —santidad solo en lo alto— no suma cien; le falta el descenso que la Kof representa.",
    },
    almas: {
      es: "100 es la medida de una vida entera de bendición. R. Meir enseñó: 'el hombre está obligado a recitar cien bendiciones cada día' (Menajot 43b), y lo derivó del versículo 'ahora Israel, מָה (qué) pide de ti Hashem' — leyendo מָה como מֵאָה, cien (Deut 10:12). Cien bendiciones: cien veces al día bajas la santidad a lo cotidiano —a lo que comes, a lo que ves, a lo que te asusta— y la reconoces ahí. Esa es la avodá de la Kof en tu día: no cien momentos místicos, sino cien descensos pequeños de lo santo a lo común.",
    },
    divinidad: {
      es: "El número de Abraham es cien: 'Abraham tenía cien años (בֶּן מְאַת שָׁנָה) cuando le nació Itzjak' (Génesis 21:5). Y con Itzjak entra la risa: 'צְחֹק עָשָׂה לִי אֱלֹהִים, Dios me ha hecho reír; todo el que lo oiga se reirá conmigo (יִצְחַק־לִי)' (Génesis 21:6). La Kof, cien, es la letra del fruto que llega tarde y desde abajo —el hijo de la vejez, la risa después de la larga espera. Y su nombre pleno, 186 = מָקוֹם, sella el sentido: cien es el número del Lugar que abarca todo y que, por eso, puede dar vida incluso donde la naturaleza ya dijo que no. La santidad de la Kof no es la que evita el fondo: es la que llega hasta el fondo y ahí, precisamente ahí, hace reír.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "Los monos de Shlomó: קוֹף sí es bíblico" },
        fuente: {
          es: "I Reyes 10:22 — 'אֳנִי תַרְשִׁישׁ... נֹשְׂאֵת זָהָב וָכֶסֶף, שֶׁנְהַבִּים וְקֹפִים וְתֻכִּיִּים': la flota de Tarshish traía cada tres años oro, plata, marfil, monos (קֹפִים) y pavos reales. Paralelo en II Crónicas 9:21 (וְקוֹפִים). El 'mono' que da su nombre popular a la letra está en el texto.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Cien años y una risa: Abraham e Itzjak" },
        fuente: {
          es: "Génesis 21:5 — 'וְאַבְרָהָם בֶּן מְאַת שָׁנָה בְּהִוָּלֶד לוֹ אֵת יִצְחָק': Abraham tenía cien (kof=100) al nacer Itzjak. Y 21:6 — 'צְחֹק עָשָׂה לִי אֱלֹהִים... יִצְחַק לִי': el fruto tardío que hace reír.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "El mono ante el hombre: la copia disminuida" },
        fuente: {
          es: "Bava Batra 58a — 'הַכֹּל בִּפְנֵי שָׂרָה כְּקוֹף בִּפְנֵי אָדָם, שָׂרָה בִּפְנֵי חַוָּה כְּקוֹף בִּפְנֵי אָדָם': todos ante Sará son como un mono ante un hombre; Sará ante Javá, igual. El mono como imagen de lo que se parece a lo verdadero sin serlo — la 'cara de mono' de lo santo.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Cien bendiciones cada día" },
        fuente: {
          es: "Menajot 43b — 'תַּנְיָא, הָיָה רַבִּי מֵאִיר אוֹמֵר: חַיָּיב אָדָם לְבָרֵךְ מֵאָה בְּרָכוֹת בְּכׇל יוֹם': R. Meir obliga a cien (kof) bendiciones diarias, derivándolo de 'מָה ה' אֱלֹהֶיךָ שֹׁאֵל מֵעִמָּךְ' (Deut 10:12) leído מֵאָה, cien.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "Por qué a Dios se le llama מָקוֹם (el Lugar)" },
        fuente: {
          es: "Bereshit Rabá 68:9 (sobre 'וַיִּפְגַע בַּמָּקוֹם', Génesis 28:11) — R. Huná en nombre de R. Amí: '¿por qué se apoda al Santo, bendito sea, מָקוֹם? Porque Él es el lugar del mundo, y el mundo no es Su lugar' (הוּא מְקוֹמוֹ שֶׁל עוֹלָם וְאֵין עוֹלָמוֹ מְקוֹמוֹ), de 'הִנֵּה מָקוֹם אִתִּי' (Éxodo 33:21). Es el Nombre cuya gematría (186) iguala al nombre pleno de la Kof, קוֹף.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Kof: los Peces, el mes de Adar, letra simple" },
        fuente: {
          es: "Sefer Yetzirá 5:2 — 'הִמְלִיךְ אוֹת ק' וְקָשַׁר לוֹ כֶּתֶר... וְצָר בּוֹ דָּגִים בָּעוֹלָם, וַאֲדָר בַּשָּׁנָה, וְקֻרְקְבָן בַּנֶּפֶשׁ': la Kof es una de las doce letras SIMPLES (5:1: ה״ו ז״ח ט״י ל״נ ס״ע צ״ק) y le tocan el signo de Piscis (דגים), el mes de Adar y el órgano קֻרְקְבָן (la molleja/estómago). (Honestidad: la facultad varía por recensión — la impresa da שֵׁינָה, 'sueño'; la fórmula 'le ató una corona' se dice de las doce, no solo de la kof.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El nombre de la Kof es מָקוֹם: 186 = 186" },
        fuente: {
          es: "Gematría calculada: קוף = 100+6+80 = 186; מקום = 40+100+6+40 = 186. El nombre pleno de la letra que desciende más bajo iguala al Nombre divino de la Presencia que abarca todos los mundos desde afuera (la luz circundante, makif). Lo que rodea todo es lo que puede tocar el fondo de todo.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "Descender por debajo de la línea para elevar chispas" },
        fuente: {
          es: "Enseñanza jasídica clásica sobre la forma de la Kof (única letra que rompe el renglón hacia abajo): la santidad desciende a los mundos inferiores, al lugar de las chispas caídas, para recogerlas — la avodá del yerid (descenso). La brecha del trazo enseña que ese descenso solo se sostiene con emuná (fe): se baja sin ver, por un instante, el apoyo de arriba. (Marco de R. Yitzchak Ginsburgh, 'The Hebrew Letters'; se cita el concepto, no un folio, por no haberse podido cargar su tabla de la kof — ver Nota del Sofer.)",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "I Reyes 10:22 (קֹפִים) y II Crónicas 9:21 (קוֹפִים) — los monos de la flota de Shlomó: קוֹף 'mono' es bíblico." },
    { es: "Bava Batra 58a — 'כְּקוֹף בִּפְנֵי אָדָם' (como un mono ante un hombre): el mono como copia disminuida." },
    { es: "Génesis 21:5 — Abraham בֶּן מְאַת שָׁנָה (cien años) al nacer Itzjak. Génesis 21:6 — צְחֹק / יִצְחַק (la risa)." },
    { es: "Menajot 43b — R. Meir: חַיָּיב אָדָם לְבָרֵךְ מֵאָה בְּרָכוֹת בְּכׇל יוֹם (100 bendiciones), de Deut 10:12 (מָה→מֵאָה)." },
    { es: "Sefer Yetzirá 5:1-2 — Kof, letra simple: Piscis (דגים) · Adar · órgano קרקבן. Facultad por recensión (impresa: sueño, שינה)." },
    { es: "Bereshit Rabá 68:9 — por qué Dios es מָקוֹם: 'Él es el lugar del mundo, el mundo no es Su lugar' (Gén 28:11; Éx 33:21)." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' — marco de la kof como descenso y luz circundante (concepto, no folio: su tabla no cargó)." },
    { es: "Gematrías calculadas: ק = 100 · קוף = 100+6+80 = 186 = מקום (40+100+6+40 = 186) · קדושה = 415 · יצחק = 208." },
    { es: "Nota de precisión: קוֹף 'mono' es homógrafo del NOMBRE de la letra; que el nombre signifique 'mono' es drash tradicional (otros: 'ojo de aguja', 'nuca'), no etimología cerrada. הקף (185) ≠ 186: no se fuerza igualdad; la única exacta es קוף = מקום = 186." },
  ],
};
