// ════════════════════════════════════════════════════════════════════════════
//  PÁGINA DE REFERENCIA — Las trece reglas de Rabí Ishmael
//  שְׁלֹשׁ עֶשְׂרֵה מִדּוֹת שֶׁהַתּוֹרָה נִדְרֶשֶׁת בָּהֶן
//
//  CONTENIDO ESCRITO Y COTEJADO POR EL SOFER (editor-erudito).
//  Fuente de montaje: /Users/mardan/jashmal-produccion/trece-middot/PAGINA.md
//  (documento de control aparte: FUENTES-VERIFICADAS.md — NO se publica).
//
//  Infraestructura solo MONTÓ. No se añadió ni un ejemplo, ni una cita, ni un
//  folio, ni una gematría, ni una fuente que no estuviera ya en el markdown
//  cotejado. Los marcadores del markdown (**negrita**, *itálica*) se conservan
//  TAL CUAL y los pinta RichText (components/academia/RichText.tsx), que además
//  aísla el hebreo en línea con <bdi>. No se reescribió, resumió ni adornó una
//  sola frase: el texto de abajo es el del markdown, con los saltos de línea
//  del archivo unidos en párrafos.
//
//  OJO con el número: las TRECE reglas son CATORCE entradas, porque el ítem (ג)
//  de la lista contiene dos reglas y el (יב) otras dos. Cada entrada declara a
//  qué ítem de la lista pertenece; dos entradas apuntan al mismo ítem (ג) a
//  propósito. Eso NO se aplana.
//
//  Página en español (la audiencia no lee hebreo: español primero, hebreo como
//  apoyo). El texto vive aquí, en su propio archivo de datos —como los
//  misterios—, no en messages/*.json.
// ════════════════════════════════════════════════════════════════════════════

/** Los tres grupos de la clasificación que vertebra la página. */
export type Clase = "ley" | "lectura" | "caballo";

/** Rótulo corto de cada grupo, para la marca de cada entrada y el índice. */
export const CLASES: Record<Clase, { marca: string; glosa: string }> = {
  ley: { marca: "Deriva ley", glosa: "el lector la entiende, no la ejerce" },
  lectura: { marca: "Modo de leer", glosa: "el lector sí la puede usar" },
  caballo: { marca: "A caballo", glosa: "la línea no es limpia, y se dice" },
};

/** Párrafo suelto, o párrafo que abre con un rótulo en negrita. */
export type Bloque = { rotulo?: string; parrafos: string[] };

export type Regla = {
  /** Número de ENTRADA (1–14), no de ítem de la lista. */
  n: number;
  /** Letra hebrea del ítem de la lista al que pertenece. */
  item: string;
  /** Aviso cuando ese ítem de la lista lleva dos reglas dentro. */
  itemDoble?: boolean;
  titulo: string;
  he: string;
  translit: string;
  clase: Clase;
  bloques: Bloque[];
  /** El apartado «Clasificación: …», tal cual lo escribe el contenido. */
  clasificacion: Bloque;
};

// ── Cabecera ───────────────────────────────────────────────────────────────

export const HERO = {
  titulo: "Las trece reglas de Rabí Ishmael",
  he: "שְׁלֹשׁ עֶשְׂרֵה מִדּוֹת שֶׁהַתּוֹרָה נִדְרֶשֶׁת בָּהֶן",
  glosa: "Las trece medidas por las que se interpreta la Torá",
};

// ── Entrada ────────────────────────────────────────────────────────────────

export const ENTRADA: string[] = [
  `Hay una lista de trece reglas que casi todo judío observante recita de memoria y que casi nadie puede usar. Está en el sidur, en la primera página de la mañana, entre las ofrendas y el comienzo de la oración propiamente dicha. Se lee en menos de un minuto. Y al terminar de leerla se dice una frase que lo explica todo: *«Sea tu voluntad que se reconstruya el Templo pronto, en nuestros días, y danos nuestra parte en tu Torá»*.`,
  `Esa frase es la clave. La lista no se recita porque el que la recita vaya a aplicarla. Se recita como se recita el orden de los sacrificios: para no perder la memoria de un oficio que hoy nadie ejerce. Las trece reglas son el procedimiento por el cual un tribunal con autoridad derivaba ley obligatoria del texto de la Torá. No son trece llaves que abran el texto a cualquiera que las aprenda. Son, en su mayoría, trece formas de legislar.`,
  `Esta distinción es lo único que esta página quiere que el lector se lleve. Hay una diferencia entre entender cómo se derivó una ley y estar en posición de derivarla. Las dos cosas usan el mismo vocabulario y no son la misma actividad. Rambam lo escribe sin rodeos: el Tribunal Supremo de Jerusalén «son el fundamento de la Torá oral y las columnas de la instrucción», y lo que obliga a Israel son tanto «las cosas que aprendieron por tradición oral» como «las cosas que aprendieron de su propio razonamiento por una de las medidas por las que se interpreta la Torá» (Mishné Torá, Hiljot Mamrim 1:1–2). El razonamiento no obliga por ser bueno. Obliga porque lo firmó ese tribunal. Y cuando ese tribunal dejó de existir, escribe Rambam cuatro líneas después, «se multiplicó la discusión en Israel: este declara impuro y da razón de sus palabras, y este declara puro y da razón de sus palabras» (Hiljot Mamrim 1:4).`,
  `Dicho eso, no todas las trece son máquinas de derivar. Unas pocas, con distintos matices, son algo más modesto y más útil: son maneras de mirar el texto. Esas sí se pueden usar, y se usan todos los días, para entender. Cuántas son exactamente no admite una cifra limpia, y conviene decirlo desde ahora: dos lo son sin discusión, y otras dos quedan a caballo, cada una por su propio motivo. Más abajo cada regla queda marcada con su grupo, y donde la línea no cae limpia se dice que no cae limpia en lugar de forzarla.`,
];

// ── La lista en su fuente ──────────────────────────────────────────────────

export const FUENTE_ANTES: string[] = [
  `La baraitá de Rabí Ishmael abre el **Sifrá**, el midrash halájico sobre Levítico, como su introducción. En Sefaria es un nodo propio del libro: **Sifrá, Baraitá deRabí Ishmael** (ספרא, ברייתא דרבי ישמעאל). El párrafo 1 dice solamente «Rabí Ishmael dice»; el párrafo 2 es la lista completa, numerada con letras hebreas de א a יג; y los párrafos 3 al 18 van dando, una por una, la ilustración de cada regla. Es decir: la fuente no sólo enumera las trece, también las ejemplifica. Casi todos los ejemplos de esta página salen de ahí.`,
  `La misma lista entró en la liturgia de la mañana. Esta es como se recita (versión del sidur asquenazí, sección de los *korbanot*):`,
];

/** La baraitá como se recita. Bloque hebreo, en RTL, con su numeración. */
export const LITURGIA = {
  intro: `רַבִּי יִשְׁמָעֵאל אוֹמֵר: בִּשְׁלֹשׁ עֶשְׂרֵה מִדּוֹת הַתּוֹרָה נִדְרָשֶׁת.`,
  lineas: [
    { num: "א", he: `מִקַּל וָחֹמֶר.` },
    { num: "ב", he: `וּמִגְּזֵרָה שָׁוָה.` },
    { num: "ג", he: `מִבִּנְיַן אָב מִכָּתוּב אֶחָד, וּמִבִּנְיַן אָב מִשְּׁנֵי כְתוּבִים.` },
    { num: "ד", he: `מִכְּלָל וּפְרָט.` },
    { num: "ה", he: `וּמִפְּרָט וּכְלָל.` },
    { num: "ו", he: `כְּלָל וּפְרָט וּכְלָל, אִי אַתָּה דָן אֶלָּא כְּעֵין הַפְּרָט.` },
    { num: "ז", he: `מִכְּלָל שֶׁהוּא צָרִיךְ לִפְרָט, וּמִפְּרָט שֶׁהוּא צָרִיךְ לִכְלָל.` },
    {
      num: "ח",
      he: `כָּל דָּבָר שֶׁהָיָה בִּכְלָל וְיָצָא מִן הַכְּלָל לְלַמֵּד, לֹא לְלַמֵּד עַל עַצְמוֹ יָצָא אֶלָּא לְלַמֵּד עַל הַכְּלָל כֻּלּוֹ יָצָא.`,
    },
    {
      num: "ט",
      he: `כָּל דָּבָר שֶׁהָיָה בִּכְלָל וְיָצָא לִטְעֹן טֹעַן אֶחָד שֶׁהוּא כְעִנְיָנוֹ, יָצָא לְהָקֵל וְלֹא לְהַחֲמִיר.`,
    },
    {
      num: "י",
      he: `כָּל דָּבָר שֶׁהָיָה בִּכְלָל וְיָצָא לִטְעֹן טֹעַן אַחֵר שֶׁלֹּא כְעִנְיָנוֹ, יָצָא לְהָקֵל וּלְהַחֲמִיר.`,
    },
    {
      num: "יא",
      he: `כָּל דָּבָר שֶׁהָיָה בִּכְלָל וְיָצָא לִדּוֹן בַּדָּבָר הֶחָדָשׁ, אִי אַתָּה יָכוֹל לְהַחֲזִירוֹ לִכְלָלוֹ עַד שֶׁיַּחֲזִירֶנּוּ הַכָּתוּב לִכְלָלוֹ בְּפֵרוּשׁ.`,
    },
    { num: "יב", he: `דָּבָר הַלָּמֵד מֵעִנְיָנוֹ, וְדָבָר הַלָּמֵד מִסּוֹפוֹ.` },
    {
      num: "יג",
      he: `וְכֵן שְׁנֵי כְתוּבִים הַמַּכְחִישִׁים זֶה אֶת זֶה, עַד שֶׁיָּבֹא הַכָּתוּב הַשְּׁלִישִׁי וְיַכְרִיעַ בֵּינֵיהֶם.`,
    },
  ],
};

export const FUENTE_DESPUES: string[] = [
  `El orden es el mismo en el Sifrá y en el sidur, y los nombres también. Conviene notar una cosa sobre el número trece, porque es la primera trampa de la lista: el ítem (ג) contiene en realidad **dos** reglas (el padre de familia desde un versículo y desde dos), y el ítem (יב) contiene otras dos (lo aprendido del contexto y lo aprendido del final). Si uno cuenta mecanismos distintos, salen quince. El número trece es el número de los **ítems de la lista**, no el de las operaciones. Nadie lo esconde: la propia fuente escribe las dos variantes dentro de un solo renglón numerado.`,
];

// ── Las trece (catorce entradas) ───────────────────────────────────────────

export const TRECE_INTRO = `Por lo que acaba de decirse sobre el número, lo que sigue son **catorce entradas**: los ítems (ג) y (יב) de la lista llevan dos reglas cada uno, y aquí cada regla recibe su propia explicación y su propio ejemplo. Al llegar a la última se indica a qué número de la lista corresponde.`;

export const REGLAS: Regla[] = [
  // ── 1 ────────────────────────────────────────────────────────────────────
  {
    n: 1,
    item: "א",
    titulo: "El argumento de menor a mayor",
    he: "מִקַּל וָחֹמֶר",
    translit: "*mikal vajómer*, «de lo liviano y lo grave»",
    clase: "caballo",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Si la Torá es estricta en un caso donde había menos motivo para serlo, con más razón será estricta en un caso donde hay más motivo. Y al revés: si es indulgente donde había más motivo para endurecer, con más razón lo será donde hay menos. Es el razonamiento más natural que existe y el único de los trece que una persona puede construir sola, con su propia cabeza, sin haberlo recibido de nadie. Rashi lo dice exactamente así: el *kal vajómer* «es cosa de razonamiento, de su propio entendimiento y de su corazón» (Rashi a Pesajim 66a).`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `Miriam habla contra Moshé y queda con *tzaraat*. Dios le dice a Moshé: «Si su padre la hubiera reprendido, ¿no quedaría avergonzada siete días? Que quede recluida siete días fuera del campamento» (Números 12:14). La baraitá razona: si una reprensión paterna basta para siete días de vergüenza, una reprensión de la Presencia divina debería valer catorce. Y entonces se frena sola: *«dayó»*, basta.`,
        ],
      },
      {
        rotulo: "Su restricción clásica, y es la más famosa de todas.",
        parrafos: [
          `**דַּיּוֹ לַבָּא מִן הַדִּין לִהְיוֹת כַּנִּדּוֹן** — *«basta a lo que viene por razonamiento con ser como aquello de lo que se razona»*. El argumento te lleva hasta el caso de origen y ni un paso más allá: siete días, no catorce. El Talmud discute si esta limitación se aplica siempre o sólo cuando el argumento no se rompe al aplicarla, y al discutirlo afirma que *dayó* es de origen bíblico, no una invención rabínica: **דַּיּוֹ דְּאוֹרָיְיתָא הוּא** (Bavá Kamá 25a). Hay una segunda barrera, todavía más dura: **אֵין עוֹנְשִׁין מִן הַדִּין**, *no se castiga a partir de un razonamiento*. Un hijo le responde a su propio padre, que acaba de preguntarle si no es evidente por *kal vajómer*: «Nos enseñaste, maestro nuestro, que no se castiga a partir del razonamiento» (Makot 5b). La lógica puede explicar una pena; no puede crearla.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: a caballo, y es el caso más interesante de la lista.",
      parrafos: [
        `El razonamiento está al alcance de cualquiera, y por eso mismo la tradición lo cercó con dos vallas. Produce ley, así que el lector no lo ejerce; pero lo puede *pensar*, y pensarlo bien es un ejercicio legítimo de estudio. La enseñanza está en las vallas: la herramienta más accesible es la que más límites recibió, precisamente porque es accesible.`,
      ],
    },
  },

  // ── 2 ────────────────────────────────────────────────────────────────────
  {
    n: 2,
    item: "ב",
    titulo: "El vínculo por palabra compartida",
    he: "מִגְּזֵרָה שָׁוָה",
    translit: "*migzerá shavá*, «del decreto igual»",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Dos leyes distintas usan la misma palabra o expresión. Esa palabra compartida las ata: lo que es verdad en una pasa a ser verdad en la otra. No es analogía de contenido, es identidad de término.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `Del guardián sin paga se dice: «si no extendió su mano sobre la propiedad de su prójimo» (Éxodo 22:7). Del guardián pagado se dice, con las mismas palabras: «si no extendió su mano sobre la propiedad de su prójimo» (Éxodo 22:10). Puesto que en el primer caso la ley exime a los herederos de tener que jurar, también los exime en el segundo. La frase idéntica transporta la regla de un sitio al otro.`,
        ],
      },
      {
        rotulo: "Sus restricciones, que son dos y ambas severas.",
        parrafos: [
          `Primero: la palabra tiene que estar *libre*, **מוּפְנֶה**, es decir, no hacer falta en su propio lugar para otra cosa. Y la formulación de esto se atribuye a Rabí Ishmael en persona: *«toda guezerá shavá que no esté libre en absoluto, no se aprende de ella»* (Nidá 22b). Segundo, y es la restricción que define a esta regla frente a todas las demás: **אֵין אָדָם דָּן גְּזֵרָה שָׁוָה מֵעַצְמוֹ** — *nadie deriva una guezerá shavá por sí mismo* (Pesajim 66a). Rashi explica por qué: hace falta que el vínculo «haya sido recibido y venga del Sinaí, porque de lo contrario quizá el versículo vino para otra cosa». Dos palabras iguales en dos lugares es un hecho que cualquiera puede ver. Que ese hecho ate dos leyes es un veredicto que nadie puede emitir solo.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: deriva ley.",
      parrafos: [
        `Y es la más cerrada de las trece. El lector puede seguir una *guezerá shavá* existente y entender perfectamente cómo funciona. Construir una nueva no está a su alcance, y no por falta de talento: por falta de cadena.`,
      ],
    },
  },

  // ── 3 ────────────────────────────────────────────────────────────────────
  {
    n: 3,
    item: "ג",
    itemDoble: true,
    titulo: "El padre de familia, desde un solo versículo",
    he: "מִבִּנְיַן אָב מִכָּתוּב אֶחָד",
    translit: "*mibinián av mikatuv ejad*, «del padre de familia desde un escrito»",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Un caso que la Torá trata explícitamente se convierte en el *padre*, el prototipo, de una familia entera de casos. Se busca qué rasgo del caso explícito es el que lo hace estar sujeto a esa ley, y todo lo que comparta ese rasgo entra en la familia. Todo lo que no lo comparta, queda fuera. La parte delicada no es incluir, es decidir cuál era el rasgo pertinente.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `La Torá declara impuros, por contacto con un *zav*, tanto lo que él se acuesta encima (*mishkav*) como lo que se sienta encima (*moshav*): «todo lecho sobre el que se acueste el zav será impuro, y todo utensilio sobre el que se siente será impuro» (Levítico 15:4). Una cama y una silla no son la misma cosa, y la baraitá lo dice: «el lecho no es como el asiento ni el asiento como el lecho». Pero tienen un rasgo en común: son objetos hechos para que una persona descanse, ella sola. Ese rasgo es el padre. De ahí: cualquier objeto hecho para que una persona descanse sola entra en la ley. **Y entonces viene el filo del asunto**, porque la regla no sirve si no excluye: queda fuera la *montura* (*merkav*, Levítico 15:9), porque una montura no está hecha para que alguien descanse, está hecha para cargar. La imagen se sostiene sola: la cama y la silla sí, la montura no.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: deriva ley.",
      parrafos: [
        `Fabricar una categoría jurídica a partir de un caso y decidir qué queda dentro y qué fuera es exactamente lo que hace un tribunal.`,
      ],
    },
  },

  // ── 4 ────────────────────────────────────────────────────────────────────
  {
    n: 4,
    item: "ג",
    itemDoble: true,
    titulo: "El padre de familia, desde dos versículos",
    he: "מִבִּנְיַן אָב מִשְּׁנֵי כְתוּבִים",
    translit: "*mibinián av mishnei ketuvim*, «del padre de familia desde dos escritos»",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Lo mismo, pero el prototipo se construye con dos pasajes en lugar de uno. Se usa cuando un solo pasaje no bastaría, porque podría objetarse que su regla depende de alguna particularidad suya. Dos pasajes que no se parecen en nada y que sin embargo comparten un rasgo convierten ese rasgo en el verdadero motivo de la ley.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `Dos pasajes sin relación aparente. Uno es el de las lámparas del Santuario: «*Ordena* a los hijos de Israel que te traigan aceite de oliva puro» (Levítico 24:2). El otro es el de la expulsión de los impuros del campamento: «*Ordena* a los hijos de Israel que echen fuera del campamento a todo leproso» (Números 5:2). No tienen nada que ver entre sí, y la baraitá lo subraya. Lo único que comparten es la palabra con la que arrancan: **צַו**, *ordena*. Y en los dos casos la Escritura muestra que el mandato se cumplió de inmediato y además quedó para siempre: de las lámparas se dice «y así hizo Aarón» (Números 8:3) y «estatuto perpetuo por vuestras generaciones» (Levítico 24:3); de los impuros, «y así hicieron los hijos de Israel y los echaron fuera» (Números 5:4) y «les será estatuto perpetuo» (Números 19:10). Conclusión: cada vez que la Torá dice **צַו**, lo ordenado es para ejecutarse ya y para todas las generaciones. El hallazgo es que la urgencia vive en el verbo.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: deriva ley.",
      parrafos: [
        `Establece el valor jurídico de una palabra para toda la Torá. Es legislación por definición de término.`,
      ],
    },
  },

  // ── 5 ────────────────────────────────────────────────────────────────────
  {
    n: 5,
    item: "ד",
    titulo: "De lo general a lo particular",
    he: "מִכְּלָל וּפְרָט",
    translit: "*mikelal ufrat*, «de general y particular»",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Un versículo dice primero algo amplio y después lo especifica. La regla es que el especificado manda: **אֵין בַּכְּלָל אֶלָּא מַה שֶּׁבַּפְּרָט**, *no hay en lo general sino lo que está en lo particular*. El detalle no ilustra lo general, lo recorta.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `«Cuando alguno de vosotros ofrezca una ofrenda al Señor: **del ganado**, de la vacada y del rebaño, ofreceréis vuestra ofrenda» (Levítico 1:2). «Del ganado» es lo general, y es ancho: en hebreo *behemá* puede abarcar también al animal salvaje. «De la vacada y del rebaño» es lo particular. Resultado: no se puede ofrecer un animal salvaje. Lo general parecía abrir la puerta y el particular la cerró. Así lo explica el Jafetz Jaim en su comentario a esta misma baraitá: el animal salvaje estaba incluido en «del ganado» y quedó excluido por «vacada y rebaño».`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: deriva ley.",
      parrafos: [`Determina el alcance de un mandamiento. Eso es halajá.`],
    },
  },

  // ── 6 ────────────────────────────────────────────────────────────────────
  {
    n: 6,
    item: "ה",
    titulo: "De lo particular a lo general",
    he: "מִפְּרָט וּכְלָל",
    translit: "*mifrat ujlal*, «de particular y general»",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `El orden inverso, y el resultado inverso. Si el versículo pone primero los ejemplos y después la categoría amplia, la categoría amplia gana: **פְּרָט וּכְלָל נַעֲשֶׂה כְּלָל מוּסָף עַל הַפְּרָט**, *el general se vuelve un añadido sobre el particular*. Los ejemplos no limitan, sólo abren. El orden de las palabras en el versículo decide el resultado, y esto no es un detalle estilístico: es la diferencia entre una ley estrecha y una ley ancha.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `«Si alguno entrega a su prójimo un asno, o un buey, o una oveja, **o cualquier animal**, para guardarlo» (Éxodo 22:9). Asno, buey y oveja son el particular; «cualquier animal» es el general que viene después. Por tanto la ley no se limita a esas tres especies: cubre todo animal.`,
        ],
      },
      {
        rotulo: "Aquí hay que ser honesto con el lector, y la honestidad es instructiva.",
        parrafos: [
          `Este ejemplo del Sifrá no es pacífico. El Talmud babilónico lee ese mismo versículo de otra manera: lo trata como *general-particular-general* (la regla 7, la siguiente), y de ahí deriva que el depósito debe ser un bien mueble con valor propio, lo que excluye tierras, esclavos y documentos (Bavá Metziá 57b). El Raavad, comentando esta baraitá, lo señala sin suavizarlo: **הָא מִילְתָא פְּלִיגָא אַגְּמָרָא דִּילָן**, *este asunto discrepa de nuestra Guemará*. La fórmula de la regla es firme y el Talmud la cita tal cual (Pesajim 6b). El ejemplo con que el Sifrá la ilustra está en disputa. Que las propias ilustraciones de la baraitá se discutan dice algo que esta página necesita decir: las trece no son un mecanismo que arroje un solo resultado si uno le mete el versículo correcto. Son un lenguaje dentro del cual se argumenta.`,
        ],
      },
    ],
    clasificacion: { rotulo: "Clasificación: deriva ley.", parrafos: [] },
  },

  // ── 7 ────────────────────────────────────────────────────────────────────
  {
    n: 7,
    item: "ו",
    titulo: "General, particular y general",
    he: "כְּלָל וּפְרָט וּכְלָל",
    translit: "*kelal ufrat ujlal*",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Cuando el versículo va amplio, luego específico y luego amplio otra vez, no gana ninguno de los dos extremos. La regla es: **אִי אַתָּה דָן אֶלָּא כְּעֵין הַפְּרָט**, *no juzgas sino conforme al tipo del particular*. Se mira el ejemplo del medio, se pregunta qué clase de cosa es, y se incluye todo lo de esa clase. Ni sólo los ejemplos, ni absolutamente todo: la clase a la que los ejemplos pertenecen.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `El dinero del segundo diezmo, que se sube a Jerusalén para gastarlo allí: «Darás el dinero **por todo lo que desee tu alma**: por vacas, por ovejas, por vino, por licor, **y por todo lo que te pida tu alma**» (Deuteronomio 14:26). General, particular, general. ¿Qué clase de cosa son vacas, ovejas, vino y licor? La baraitá contesta: cosas nacidas de lo nacido de la tierra, crecimientos del suelo. El vino viene de la uva, la uva de la vid, la vid de la tierra. Por lo tanto el dinero se gasta en eso. El Talmud trae esta misma derivación con una definición levemente distinta, «fruto de fruto y crecimiento del suelo», y discute qué cae de un lado y qué del otro: los peces, por ejemplo, dependen de cuál de las dos fórmulas se adopte (Eruvín 27b). El Raavad, en su comentario a esta baraitá, explica qué queda fuera y por qué: el agua y la sal, porque no son fruto de nada; las setas y las trufas, porque aunque son fruto, no brotan de otra semilla.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: deriva ley.",
      parrafos: [
        `Pero vale notar algo: de las trece, esta es la que más se parece a pensar. Lo que hace es preguntar de qué está hablando realmente una lista. Eso lo puede hacer un lector con cualquier texto. Lo que el lector no puede hacer es convertir su respuesta en norma.`,
      ],
    },
  },

  // ── 8 ────────────────────────────────────────────────────────────────────
  {
    n: 8,
    item: "ז",
    titulo: "El general que necesita al particular, y el particular que necesita al general",
    he: "מִכְּלָל שֶׁהוּא צָרִיךְ לִפְרָט, וּמִפְּרָט שֶׁהוּא צָרִיךְ לִכְלָל",
    translit: "*mikelal shehú tzarij lifrat, umifrat shehú tzarij lijlal*",
    clase: "caballo",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `No hay aquí ninguna operación de suma ni de resta. Hay una observación sobre la dependencia mutua: a veces ninguna de las dos mitades del versículo se entiende sin la otra. Lo general, solo, diría demasiado; el particular, solo, no diría qué es lo que está definiendo. Se leen juntas o no se leen.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `«Conságrame todo primogénito» (Éxodo 13:2). Palabra por palabra, «todo primogénito» incluiría a las hembras. El texto añade «el macho» (Deuteronomio 15:19), y queda recortado. Pero entonces «macho» solo tampoco alcanza: podría pensarse que cuenta cualquier primer macho, incluso el nacido por cesárea. El texto añade «el que abre la matriz» (Éxodo 13:2), y eso lo precisa. Y «el que abre la matriz» tampoco se sostiene solo, porque haría falta saber que hablamos de un primogénito. Cada expresión apaga una lectura equivocada de la otra. El Jafetz Jaim lo resume así: «el general necesita que el particular esté con él» y «el particular necesita que el general esté con él».`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: a caballo, con el peso del lado del modo de leer.",
      parrafos: [
        `Esta regla no genera una conclusión nueva; impide tres conclusiones falsas. Es una advertencia contra leer media frase, y esa advertencia sirve a cualquiera que lea cualquier cosa. El matiz es que lo que esta regla produce al final sí es una definición legal: quién cuenta como primogénito. Un estudiante puede usar el hábito. El resultado jurídico sigue siendo del tribunal.`,
      ],
    },
  },

  // ── 9 ────────────────────────────────────────────────────────────────────
  {
    n: 9,
    item: "ח",
    titulo: "El detalle que sale a enseñar sobre el conjunto",
    he: "כָּל דָּבָר שֶׁהָיָה בִּכְלָל וְיָצָא מִן הַכְּלָל לְלַמֵּד",
    translit: "*kol davar shehayá bijlal veyatzá min hakelal lelamed*",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Un caso ya estaba cubierto por una ley general, y sin embargo la Torá lo vuelve a mencionar aparte. ¿Por qué repetir algo que ya estaba dicho? La regla responde: no salió para hablar de sí mismo, salió para hablar de todos. **לֹא לְלַמֵּד עַל עַצְמוֹ יָצָא אֶלָּא לְלַמֵּד עַל הַכְּלָל כֻּלּוֹ יָצָא**. El caso repetido es una muestra, y su rasgo define el resto.`,
        ],
      },
      {
        rotulo: "El ejemplo más claro, y no es el de la baraitá.",
        parrafos: [
          `Los versículos sobre devolver lo perdido mencionan el buey, el asno, la ropa, y después «cualquier cosa perdida de tu hermano» (Deuteronomio 22:3). La ropa ya estaba incluida en «cualquier cosa perdida». La Mishná pregunta justo eso: *«también la ropa estaba incluida en todas estas. ¿Por qué salió? Para comparar con ella, para decirte: igual que la ropa tiene señas identificables y tiene quien la reclame, así toda cosa que tenga señas identificables y tenga quien la reclame, hay obligación de anunciarla»* (Mishná Bavá Metziá 2:5; Talmud Bavá Metziá 27a). Es una regla de pregón público deducida de que la Torá se tomó la molestia de nombrar una prenda de vestir dos veces.`,
          `La baraitá da su propio ejemplo, más técnico: las ofrendas de paz, que ya estaban dentro de «esta es la ley del holocausto, la ofrenda vegetal, la de pecado, la de culpa, la de consagración y el sacrificio de paz» (Levítico 7:37), vuelven a salir solas en Levítico 7:20. Y al salir, enseñan sobre toda la categoría: la ley cubre lo que tiene santidad de altar, y deja fuera lo consagrado al mantenimiento del Templo.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: deriva ley.",
      parrafos: [`Redefine el alcance de una categoría entera a partir de una repetición.`],
    },
  },

  // ── 10 ───────────────────────────────────────────────────────────────────
  {
    n: 10,
    item: "ט",
    titulo: "El detalle que sale con un reclamo del mismo tipo",
    he: "כָּל דָּבָר שֶׁהָיָה בִּכְלָל וְיָצָא לִטְעֹן טֹעַן אֶחָד שֶׁהוּא כְעִנְיָנוֹ",
    translit: "*…liton tóan ejad shehú ke'inyanó*",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Un caso sale de la ley general y, al salir, el texto le repite *algunas* de las condiciones de la general, pero no todas. La regla lee ese silencio como una decisión: lo que no se repitió, no aplica. Y como lo que no se repitió eran agravantes, el caso sale **לְהָקֵל וְלֹא לְהַחֲמִיר**, *para aliviar y no para agravar*. El principio detrás es el que gobierna media lista: un detalle que la Torá se molestó en volver a escribir no es decoración.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `Las manchas que aparecen sobre una llaga ya curada (Levítico 13:18–19) y sobre una quemadura (Levítico 13:24) estaban dentro de la ley general de las plagas de la piel. Al salir aparte, el texto repite una de las señales de impureza y calla las otras. Conclusión: a esos dos casos no se les juzga por «carne viva» y se les examina una sola semana en vez de dos. Sólo se aligeró.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: deriva ley.",
      parrafos: [
        `Es una conclusión halájica construida sobre un silencio del texto. Leer silencios con fuerza normativa es la operación que más autoridad requiere de toda la lista.`,
      ],
    },
  },

  // ── 11 ───────────────────────────────────────────────────────────────────
  {
    n: 11,
    item: "י",
    titulo: "El detalle que sale con un reclamo de otro tipo",
    he: "כָּל דָּבָר שֶׁהָיָה בִּכְלָל וְיָצָא לִטְעֹן טֹעַן אַחֵר שֶׁלֹּא כְעִנְיָנוֹ",
    translit: "*…tóan ajer shelo ke'inyanó*",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Igual que la anterior, salvo que lo que el texto dice del caso apartado no es una parte de la ley general sino algo distinto. Entonces el resultado se parte en dos: **יָצָא לְהָקֵל וּלְהַחֲמִיר**, *salió para aliviar y para agravar*. Pierde las exigencias de la general y gana una propia.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `«Y si un hombre o una mujer tuviere plaga en la cabeza o en la barba» (Levítico 13:29). Cabeza y barba estaban dentro de la ley general de la piel y la carne. Pero al salir aparte, el texto les da una señal de impureza propia: el **pelo amarillo**, mientras que la ley general funcionaba con el pelo **blanco**. Así que se aligeró, porque ya no se les juzga por pelo blanco; y se agravó, porque ahora se les juzga por pelo amarillo. Como escribe el Jafetz Jaim sobre este punto: hay en este lo que no hay en aquel, y en aquel lo que no hay en este. Ninguno es el caso fácil del otro.`,
        ],
      },
    ],
    clasificacion: { rotulo: "Clasificación: deriva ley.", parrafos: [] },
  },

  // ── 12 ───────────────────────────────────────────────────────────────────
  {
    n: 12,
    item: "יא",
    titulo: "El caso que sale a juzgarse por algo enteramente nuevo",
    he: "כָּל דָּבָר שֶׁהָיָה בִּכְלָל וְיָצָא לִדּוֹן בַּדָּבָר הֶחָדָשׁ",
    translit: "*…liddon badavar hejadash*",
    clase: "ley",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Esta regla no deriva: frena. Cuando la Torá saca un caso de su categoría y le asigna un procedimiento que no existe en ninguna otra parte, el caso queda fuera, y ya no se le pueden devolver las reglas de su categoría original. **אִי אַתָּה יָכוֹל לְהַחֲזִירוֹ לִכְלָלוֹ עַד שֶׁיַּחֲזִירֶנּוּ הַכָּתוּב לִכְלָלוֹ בְּפֵרוּשׁ**: *no puedes devolverlo a su categoría hasta que el texto mismo lo devuelva explícitamente*. El permiso para reconectar tiene que estar escrito.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `La ofrenda de culpa del leproso que se purifica. Su sangre no va al altar como la de las demás: va sobre el lóbulo de la oreja derecha, el pulgar derecho y el dedo gordo del pie derecho del que se purifica (Levítico 14:14). Eso no ocurre con ningún otro sacrificio. Por esa sola razón uno podría concluir que tampoco recibe las aplicaciones de sangre sobre el altar que sí reciben los demás. Y la respuesta de la baraitá no es un razonamiento: es un versículo. El propio texto dice «porque como la ofrenda de pecado, así es la de culpa, para el sacerdote» (Levítico 14:13), y con eso **la Escritura la devolvió explícitamente a su categoría**. Sin esa frase no habría habido vuelta.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: deriva ley, pero por sustracción.",
      parrafos: [
        `Es la única de las trece cuya función principal es impedir una inferencia. Y vale decirlo claro, porque es la lección de la página en miniatura: dentro del propio sistema hay una regla dedicada a decir «aquí no sigas». El método incluye su propio freno.`,
      ],
    },
  },

  // ── 13 ───────────────────────────────────────────────────────────────────
  {
    n: 13,
    item: "יב",
    itemDoble: true,
    titulo: "Lo que se aprende del contexto, y lo que se aprende del final",
    he: "דָּבָר הַלָּמֵד מֵעִנְיָנוֹ, וְדָבָר הַלָּמֵד מִסּוֹפוֹ",
    translit: "*davar halamed me'inyanó, vedavar halamed misofó*",
    clase: "lectura",
    bloques: [
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Dos movimientos muy simples y muy poderosos. El primero: una frase ambigua se aclara por su vecindario, por el tema del pasaje en que está metida. El segundo: una frase ambigua se aclara por cómo termina el pasaje, porque el final revela de qué venía hablando el principio.`,
        ],
      },
      {
        rotulo: "El ejemplo del contexto, y es el mejor ejemplo de toda la lista.",
        parrafos: [
          `«No robarás» (Éxodo 20:13, dentro del Decálogo). ¿Robar qué? El Talmud: *«"No robarás": la Escritura habla del que roba personas. ¿Dices que del que roba personas, o acaso sólo del que roba dinero? Dijiste: sal y aprende de las trece medidas por las que se interpreta la Torá, "lo que se aprende de su contexto". ¿De qué está hablando la Escritura? De personas. También aquí, de personas»* (Sanhedrín 86a). El razonamiento es todo contexto: los mandamientos vecinos, «no matarás» y «no cometerás adulterio», son delitos capitales; por lo tanto este también lo es, y se trata de secuestro, no de hurto. Y en el mismo folio, el mismo procedimiento aplicado al otro versículo da el resultado contrario: «no robaréis» (Levítico 19:11) está rodeado de leyes patrimoniales, y por eso sí habla de dinero. La misma regla, dos palabras casi idénticas, dos respuestas distintas, porque el vecindario es distinto. Nótese además que el Talmud cita la lista de las trece por su nombre para resolverlo: no es una reconstrucción nuestra.`,
        ],
      },
      {
        rotulo: "El ejemplo del final.",
        parrafos: [
          `«Pondré plaga de lepra en una casa de la tierra de vuestra posesión» (Levítico 14:34). ¿Qué cuenta como «casa»? El pasaje no lo dice al abrir. Lo dice al cerrar: «derribará la casa, sus piedras, sus maderos y todo el polvo de la casa» (Levítico 14:45). Si lo que se derriba son piedras, maderos y polvo, entonces la ley sólo aplica a una construcción que tenga esas tres cosas. El final del pasaje definió su primera palabra.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: modo de leer.",
      parrafos: [
        `Y es la más transferible de las trece. Preguntar «¿de qué está hablando este pasaje?» y «¿cómo termina, y qué me dice ese final sobre cómo empezó?» son preguntas que un estudiante puede y debe hacerse con cualquier texto, en cualquier idioma, hoy. El matiz honesto es que en Sanhedrín 86a esta regla decidió una ley capital: usada por un tribunal, un modo de leer también legisla. Lo que cambia no es la herramienta, es la mano.`,
      ],
    },
  },

  // ── 14 ───────────────────────────────────────────────────────────────────
  {
    n: 14,
    item: "יג",
    titulo: "Dos versículos que se contradicen, hasta que llega el tercero",
    he: "שְׁנֵי כְתוּבִים הַמַּכְחִישִׁים זֶה אֶת זֶה, עַד שֶׁיָּבֹא הַכָּתוּב הַשְּׁלִישִׁי וְיַכְרִיעַ בֵּינֵיהֶם",
    translit: "*shnei ketuvim hamajjishim ze et ze…*",
    clase: "lectura",
    bloques: [
      {
        parrafos: [
          `(Es la decimotercera de la lista. Aquí llega como la decimocuarta entrada porque el ítem (ג) contenía dos reglas y el (יב) otras dos.)`,
        ],
      },
      {
        rotulo: "Qué hace.",
        parrafos: [
          `Dos pasajes dicen cosas que no pueden ser ciertas a la vez. La regla no manda elegir uno ni armonizarlos a fuerza de ingenio: manda **buscar un tercer versículo** que decida. La solución tiene que venir del texto, no del intérprete.`,
        ],
      },
      {
        rotulo: "El ejemplo de la fuente.",
        parrafos: [
          `¿Dónde estaba Dios al hablar en el Sinaí? Un versículo dice: «y descendió el Señor sobre el monte Sinaí, a la cumbre del monte» (Éxodo 19:20). Otro dice: «desde los cielos te hizo oír su voz» (Deuteronomio 4:36). Arriba y abajo a la vez. Llega el tercero: «vosotros visteis que desde los cielos hablé con vosotros» (Éxodo 20:19). Y la baraitá concluye algo que ninguno de los tres dice por separado: que el Santo, bendito sea, **inclinó** los cielos superiores sobre el monte Sinaí y habló desde allí. No eligió un versículo; los puso en una sola imagen, y cita a David como testigo: «inclinó los cielos y descendió, y densa nube bajo sus pies» (Salmos 18:10).`,
          `Una nota de fidelidad al texto, porque esta regla es la más editada de las trece: en la edición impresa del Sifrá que se consultó, los tres versículos aparecen repartidos de un modo, y el Jafetz Jaim, siguiendo al Gaón de Vilna, sostiene que hay ahí un error de copista y propone otro reparto, en el que el versículo que decide es Deuteronomio 4:36 (la voz desde los cielos, la palabra sobre la tierra). La conclusión es la misma. El reparto de los papeles, no.`,
        ],
      },
      {
        rotulo: "La segunda ilustración, que cierra la baraitá.",
        parrafos: [
          `Un versículo dice que Moshé entraba en la Tienda de Reunión; otro dice que no podía entrar. Llega el tercero: «porque la nube reposaba sobre ella». Entonces: mientras la nube estaba, no entraba; cuando se retiraba, entraba y hablaba con Él.`,
        ],
      },
    ],
    clasificacion: {
      rotulo: "Clasificación: modo de leer.",
      parrafos: [
        `Y la clasificación no es una opinión nuestra: es lo que muestran los dos ejemplos que la propia baraitá eligió. Ninguno de los dos produce una ley. Uno resuelve una cuestión teológica sobre la revelación y el otro, una cuestión narrativa sobre Moshé. Esta regla es un modo de aguantar una contradicción sin romperla: no se tapa, no se elige bando, se espera el tercer dato. Cualquier estudiante puede usarla, y le va a servir más allá del texto.`,
      ],
    },
  },
];

// ── Resumen de la clasificación ────────────────────────────────────────────
//  Se pinta como RESUMEN: un panel por grupo, con su marca y su cuenta (la
//  cuenta se calcula de REGLAS, que es la misma que declara el texto: diez,
//  dos y dos).

export const RESUMEN: { clase: Clase; rotulo: string; texto: string }[] = [
  {
    clase: "ley",
    rotulo: "Derivan ley.",
    texto: `La guezerá shavá (2), el padre de familia en sus dos formas (3 y 4), general y particular (5), particular y general (6), general-particular-general (7), el detalle que enseña sobre el conjunto (9), el detalle con reclamo del mismo tipo (10), el detalle con reclamo de otro tipo (11), y el caso de algo enteramente nuevo (12), que deriva frenando. Diez mecanismos. Todos producen conclusión obligatoria y todos pertenecen a un tribunal. El lector los entiende; no los ejerce.`,
  },
  {
    clase: "lectura",
    rotulo: "Modos de leer.",
    texto: `Lo aprendido del contexto y del final (13), y los dos versículos que se contradicen hasta que llega el tercero (14). Dos. Un estudiante los puede usar hoy mismo, para entender.`,
  },
  {
    clase: "caballo",
    rotulo: "A caballo, y se dice en lugar de esconderlo.",
    texto: `El *kal vajómer* (1), porque es el único cuyo razonamiento está al alcance de cualquiera y el único al que la tradición le puso dos vallas explícitas por eso mismo. Y el general que necesita al particular (8), porque su función es impedir malas lecturas, lo cual es un hábito de lector, aunque lo que entrega al final sea una definición legal.`,
  },
];

export const RESUMEN_CIERRE = `Diez, dos y dos. No sale simétrico, y no debería.`;

// ── El cierre: Hilel ante los ancianos de Beterá ───────────────────────────

export const CIERRE_TITULO = "El cierre: Hilel ante los ancianos de Beterá";

export const CIERRE: Bloque[] = [
  {
    parrafos: [
      `Hay una escena que resume todo esto, y la buena noticia es que no hay que ir a buscarla lejos: está en la última línea de la propia baraitá. Después de exponer sus trece reglas, el texto añade: *«Hilel el Anciano expuso siete medidas ante los ancianos de Beterá»*, y las enumera. Las trece de Rabí Ishmael son el desarrollo de esas siete. Y la escena a la que esa línea alude está contada completa en el Talmud, en Pesajim 66a.`,
      `El 14 de Nisán cayó en Shabat. La casa de Beterá, que dirigía entonces, no se acordaba de si el sacrificio de Pesaj se ofrece igual cuando cae en Shabat. Es una pregunta enorme: miles de personas con el cordero en la mano y nadie sabe si se degüella. Preguntaron si había alguien que lo supiera. Les dijeron: hay un hombre que subió de Babilonia, se llama Hilel el Babilonio, y sirvió a los dos grandes de la generación, Shemaiá y Avtalión. Lo mandaron a buscar.`,
      `Hilel respondió con una guezerá shavá. De Pesaj se dice «y harán los hijos de Israel el Pesaj **en su tiempo fijado**» (Números 9:2). De la ofrenda diaria se dice «cuidaréis de ofrecerme **en su tiempo fijado**» (Números 28:2). La diaria se ofrece en Shabat; por lo tanto el Pesaj también. Y añadió un *kal vajómer*: si la ofrenda diaria, cuyo descuido no conlleva pena de *karet*, desplaza el Shabat, con más razón el Pesaj, cuyo descuido sí la conlleva.`,
      `**«De inmediato lo sentaron a la cabeza y lo nombraron Nasí sobre ellos, y estuvo exponiendo todo aquel día las leyes de Pesaj.»** No es poca cosa lo que acaba de pasar: un hombre llega de Babilonia, resuelve en una frase lo que la academia no podía, y en el mismo acto queda al frente del pueblo. Llegó a la presidencia por un argumento. Y Hilel, recién sentado, se puso a reprocharles: ¿qué fue lo que hizo que yo subiera de Babilonia y fuera príncipe sobre ustedes? La pereza que había en ustedes, que no sirvieron a los dos grandes de la generación.`,
      `Y entonces la misma página del Talmud desmonta lo que acaba de contar, con una frialdad que vale leer despacio.`,
    ],
  },
  {
    rotulo: "Primero, el *kal vajómer* no sirve.",
    parrafos: [
      `La Guemará lo examina y encuentra la objeción: la ofrenda diaria tiene dos privilegios propios, es constante y se consume entera. Hay con qué refutarlo. Y dice algo revelador sobre el orden de los hechos: *«el kal vajómer se lo dijo primero y lo refutaron; después les dijo la guezerá shavá»*. El argumento que Hilel ofreció primero fue el que se le cayó.`,
    ],
  },
  {
    rotulo: "Segundo, y aquí está todo.",
    parrafos: [
      `La Guemará pregunta: si al final lo resolvió con la guezerá shavá, ¿para qué el *kal vajómer*? Y contesta: Hilel estaba hablándoles a ellos. *«La guezerá shavá, de acuerdo, no la sabían, porque nadie deriva una guezerá shavá por sí mismo. Pero el kal vajómer, que una persona sí deriva por sí misma, ¡debían haberlo razonado ustedes!»* Y ellos le contestaron: ese kal vajómer es refutable.`,
      `Léalo otra vez. La herramienta con la que Hilel resolvió el problema y llegó a Nasí es precisamente la que él no podría haber inventado. La supo porque la había recibido de Shemaiá y Avtalión. Rashi lo explica ahí mismo: una guezerá shavá no se deriva solo, «a menos que haya sido recibida y venga del Sinaí, porque de lo contrario quizá el versículo vino para otra cosa»; y en cambio el *kal vajómer* «es cosa de razonamiento, de su propio entendimiento y de su corazón». Lo que Hilel traía de Babilonia no era inteligencia. Era cadena.`,
    ],
  },
  {
    rotulo: "Y el remate.",
    parrafos: [
      `Ese mismo día, todavía sentado a la cabeza, le preguntaron algo práctico: si uno olvidó traer el cuchillo antes de Shabat, ¿qué hace? Y el hombre que acababa de ser nombrado príncipe por saber contestó: *«esta ley la escuché y la olvidé»*. Dejó que el pueblo resolviera: al día siguiente, quien tenía un cordero lo clavó en la lana, quien tenía un cabrito entre los cuernos. Hilel vio lo que hacían, se acordó de la ley, y dijo: así la recibí de boca de Shemaiá y Avtalión. Hasta para recordar necesitó que otros actuaran delante de él.`,
      `La lección de la página es esta. De las trece reglas, la más poderosa es la que menos se puede usar solo. No porque sea difícil, sino porque no es un cálculo: es un testimonio. La guezerá shavá no se descubre, se hereda. El que la tiene puede decidir con ella en una tarde lo que una academia entera no pudo. El que no la tiene puede ver las mismas dos palabras repetidas y no tener derecho a concluir nada.`,
    ],
  },
];

// ── Por qué nuestra función de rastreo no se llama guezerá shavá ───────────

export const RASTREO_TITULO = "Por qué nuestra función de rastreo no se llama guezerá shavá";

export const RASTREO: string[] = [
  `En Jashmal hay una herramienta que toma una palabra y le muestra al lector todos los lugares del Tanaj donde aparece. Es una herramienta buena y hace falta. No se llama *guezerá shavá*, y después de esta página se entiende por qué.`,
  `Lo que la herramienta hace es mirar. Encuentra que una palabra aparece aquí, allá y en aquel otro sitio, y lo pone todo junto para que el lector lo vea con sus ojos. Eso es un hecho del texto, verificable, y no le pertenece a nadie en particular: cualquiera que sepa contar puede comprobarlo.`,
  `Lo que una guezerá shavá hace es **decidir**. Toma esas mismas dos apariciones y declara que están atadas, que lo que vale para una vale para la otra, que de ahí sale una obligación. Eso no es un hecho del texto. Es un veredicto, y requiere haberlo recibido. Un buscador de palabras no puede emitir veredictos, y si se lo llamara con el nombre del veredicto estaríamos prometiendo algo que no entregamos, y peor: le estaríamos sugiriendo al lector que al ver dos palabras iguales ya tiene permiso para concluir. No lo tiene. Eso es exactamente lo que Pesajim 66a dice que no se puede hacer solo.`,
  `Por eso la función se llama **«en todo lugar donde se dice»** (**כָּל מָקוֹם שֶׁנֶּאֱמַר**). No es un nombre inventado: es una fórmula que los midrashim usan para hacer precisamente lo que la herramienta hace. El Sifrí, por ejemplo, establece el registro de dos Nombres divinos barriendo sus apariciones: *«en todo lugar donde se dice "HaShem", esa es la medida de la misericordia… en todo lugar donde se dice "Elohim", esa es la medida del juicio»* (Sifrí Devarim 26:10). Es un recorrido por el texto que establece qué significa una palabra. No deriva ley: aclara sentido.`,
  `Y ese es el respaldo técnico que acompaña al nombre: **גִּילּוּי מִילְּתָא**, *la revelación de un asunto*. El Talmud usa esa expresión justamente para distinguir lo que no es una derivación: *«¿y esto es un aprendizaje? Es un simple gilui milta»*, o sea, no se derivó nada nuevo, sólo quedó claro de qué se estaba hablando (Bavá Kamá 2b).`,
  `La herramienta revela. No deriva. Y el nombre lo dice.`,
];

// ── Nota de cierre ─────────────────────────────────────────────────────────

export const NOTA_FINAL = `*Lo que esta página afirma está cotejado en sus fuentes, con las referencias exactas en el documento de verificación que la acompaña. Donde una ilustración de la baraitá está en disputa entre el Sifrá y el Talmud, se dice. Donde hay una variante textual, se dice.*`;
