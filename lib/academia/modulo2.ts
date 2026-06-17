// ─────────────────────────────────────────────────────────────────────────
// modulo2.ts — ACADEMIA DE JASHMAL · Módulo 2 (T1·M2 · אוֹתִיּוֹת "Las letras vivas").
// Las 6 lecciones de las semanas 7–12, que siguen al Módulo 1.
//
// El contenido (textos, citas, gematrías) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - T1M2 - letras vivas (Sofer).md". Se monta
// TAL CUAL: no se inventa, altera ni agrega ninguna fuente ni gematría.
//
// Sigue EXACTAMENTE la estructura de modulo1.ts. Importa los tipos desde allí.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView2 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── Las 6 lecciones (§, verbatim del Sofer) ──────────────────────────────────

export const LESSONS2: Lesson[] = [
  // ── L7 ────────────────────────────────────────────────────────────────────
  {
    n: 7,
    id: "E1·M2·L7",
    slug: "alef",
    title: "א Álef — El Uno silencioso",
    apertura: {
      question:
        "¿Por qué la primera letra del alfabeto no es la primera letra de la Torá?",
    },
    estudio: [
      {
        t: "p",
        text: `**La letra que calla.** El alefato comienza con **א** (*álef*). Pero la Torá comienza con **ב** (*bet*): «Bereshit…». La primera letra del sistema no es la primera letra del libro. ¿Por qué? El Midrash registra que la propia álef se quejó ante Dios de ese desplazamiento.`,
      },
      {
        t: "verse",
        he: `אָמְרָה אָלֶ"ף לִפְנֵי הַקָּדוֹשׁ בָּרוּךְ הוּא: רִבּוֹנוֹ שֶׁל עוֹלָם, אֲנִי רִאשׁוֹנָה שֶׁבְּאוֹתִיּוֹת, וְלָמָּה לֹא בָרָאתָ אֶת עוֹלָמְךָ בִּי?`,
        es: "Dijo la álef ante el Santo Bendito: Señor del mundo, yo soy la primera de las letras — ¿por qué no creaste Tu mundo conmigo?",
        ref: "Bereshit Rabá 1:10",
        sefaria: "Bereishit Rabbah 1:10",
      },
      {
        t: "p",
        text: `La respuesta de Dios es un regalo diferido: *"cuando entregue los Diez Mandamientos, empezaré con tu letra."* Y así fue. El libro más sagrado de la revelación abre con:`,
      },
      {
        t: "verse",
        he: "אָנֹכִי יְהוָה אֱלֹהֶיךָ",
        es: "Yo soy YHVH tu Dios…",
        ref: "Shemot / Éxodo 20:2",
        sefaria: "Exodus 20:2",
      },
      {
        t: "p",
        text: `**אָנֹכִי** (*Anojí*, "Yo") — la primera palabra de los Diez Mandamientos, y empieza con álef. El silencio de la álef no fue derrota sino *espera*: la dignidad más alta se reserva para la revelación más alta.`,
      },
      {
        t: "p",
        text: `**Forma, nombre, valor.** La álef se compone visualmente de dos *yod* (י) unidas por una *vav* (ו) diagonal — dos puntos divinos, uno arriba y uno abajo, conectados por una columna. Ginsburgh describe esto como "la unidad que contiene la dualidad". El *nombre* de la letra — *álef* (⚠️ tradición: también significa *aluf*, "jefe, maestro") — la sitúa como cabeza del sistema. Su **valor numérico estándar es 1**: la unidad pura, el inicio de todo conteo.`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**El valor del nombre completo** 🔢. En el sistema del Arizal (donde se cuenta el nombre entero de la letra, no solo la letra), álef se escribe **אֶלֶף** (álef-lamed-pe) y su valor es: **א**(1) + **ל**(30) + **פ**(80) = **111**. El Sofer verificó: 1+30+80 = 111. La unidad (1), expandida por el nombre, se convierte en 111 — tres unidades en una.`,
      },
      {
        t: "p",
        text: `**El canal de la álef.** El *Sefer Yetzirah* enseña que con las 22 letras Dios "formó el alma de toda criatura" (✅ Sefer Yetzirah 2:2). La álef, como la primera, es el canal del **Ein Sof** — el Infinito antes de toda creación y toda palabra. Antes del "Bereshit", antes de la bet, estaba el silencio de la álef. El mundo nació de la palabra; pero la palabra nació del silencio.`,
      },
      {
        t: "verse",
        he: "בִּשְׁלֹשִׁים וּשְׁתַּיִם נְתִיבוֹת פְּלִיאוֹת חָכְמָה חָקַק יָהּ",
        es: "Con treinta y dos senderos maravillosos de sabiduría grabó Yah…",
        ref: "Sefer Yetzirah 1:1",
        sefaria: "Sefer Yetzirah 1:1",
      },
      {
        t: "p",
        text: `La álef precede a esos 32 senderos — es el silencio que los contiene antes de que comiencen. Por eso su sonido no es una consonante sino una *apertura*: una exhalación sin forma, el punto cero desde el que todo parte.`,
      },
    ],
    contemplacion: [
      "El que espera en silencio no está ausente — está preparándose para el momento correcto. La álef no comenzó la Torá, pero comenzó la revelación más directa de Dios al pueblo. Hay cosas que solo florecen cuando no se fuerzan.",
      "¿Qué silencio en tu propia vida está esperando su momento de álef?",
    ],
    accion: {
      text: [
        `Escribe la letra **א** (álef) en un papel. Mírala: dos *yod* unidas por una *vav* diagonal. Un punto arriba (el mundo de arriba), un punto abajo (el mundo de abajo), y una columna que los conecta. Esta letra es el tejido del que están hechas todas las demás.`,
      ],
      cta: { label: "Estudiar la letra álef en el sitio →", ref: "alef" },
    },
    sello:
      "La álef vale 1 — la unidad pura. Su nombre completo suma 111 🔢. No comenzó la Torá sino los Diez Mandamientos: el silencio espera el momento de la máxima revelación.",
    hilos: [
      { kind: "letter", ref: "alef", label: "Estudia el análisis completo de la álef en el sitio" },
      { kind: "study", ref: "26", label: "La álef empieza tanto Ejad como Ahavá — ambos suman 13 y juntos forman el Nombre (26)" },
    ],
    fuentes: [
      "Bereshit Rabá 1:10 ✅",
      "Shemot / Éxodo 20:2 ✅",
      "Sefer Yetzirah 1:1 ✅",
      "Sefer Yetzirah 2:2 ✅",
      "álef milui = 111 🔢 (álef 1 + lamed 30 + pe 80)",
    ],
    tarea: {
      semana: 7,
      herramienta: "Marco de análisis de la letra hebrea (Ginsburgh): forma → nombre → valor → canal",
      enunciado:
        "Estudia la letra álef (א). Escribe: (1) qué forma tiene y qué imagen ves en ella, (2) qué significa su nombre en hebreo ('aluf' = maestro/jefe ⚠️ — tradición; anota que es ⚠️), (3) su valor numérico (1), (4) calcula el valor del nombre completo: álef-lamed-pe = 1+30+80 = 111. Muestra la suma.",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L8 ────────────────────────────────────────────────────────────────────
  {
    n: 8,
    id: "E1·M2·L8",
    slug: "bet",
    title: "ב Bet — La casa que lo contiene todo",
    apertura: {
      question:
        "¿Por qué Dios eligió comenzar la Torá con una Bet — con una 'casa'?",
    },
    estudio: [
      {
        t: "p",
        text: `**La primera letra de la creación.** La Torá no comienza con álef — comienza con **ב**: *«בְּרֵאשִׁית»* ("en el principio"). En la lección anterior aprendiste por qué la álef quedó desplazada. Ahora la pregunta es la otra cara: ¿por qué la bet fue elegida? ¿Qué tiene de especial una *casa* para ser el inicio de todo?`,
      },
      {
        t: "verse",
        he: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
        es: "En el principio creó Dios los cielos y la tierra.",
        ref: "Bereshit / Génesis 1:1",
        sefaria: "Genesis 1:1",
      },
      {
        t: "p",
        text: `El Midrash responde la pregunta del porqué de la bet con una imagen arquitectónica que ya conociste en El Umbral. La bet tiene forma de *bayit* — una **casa**: cerrada por tres lados, abierta hacia adelante. La tradición enseña que esta apertura hacia adelante (hacia el lector, hacia el futuro) es la señal de que la Torá mira hacia delante, no hacia atrás — no se pregunta qué había *antes* del principio, sino qué comienza *ahora*.`,
      },
      {
        t: "verse",
        he: "לָמָּה בְּבֵי״ת? כְּשֵׁם שֶׁהַבַּיִת פָּתוּחַ מִלְּמַטָּה וְאֵינוֹ פָּתוּחַ מִלְמַעְלָה…",
        es: "¿Por qué con bet? Así como la casa está abierta abajo y no está abierta arriba… [quien pregunta qué hay abajo (en la creación) puede preguntar; quien pregunta qué hay arriba (antes de la creación) no es digno de venir al mundo].",
        ref: "Bereshit Rabá 1:10",
        sefaria: "Bereishit Rabbah 1:10",
      },
      {
        t: "p",
        text: `**Forma, nombre, valor.** La **bet** (בֵּית, *bayit*) significa literalmente **"casa"** ✅ — la raíz ב-י-ת es la misma en *bayit* (בַּיִת, "casa") y en *bet ha-mikdash* ("el Templo", literalmente "la casa de la santidad"). El nombre de la letra describe su función: *contener*. Su **valor es 2** — la primera multiplicidad que surge de la unidad (álef=1). Dios es Uno; la creación introduce el Dos: Cielos y Tierra, Luz y Oscuridad, Adam y Javá.`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**La bet y el número 2** 🔢. ב = 2. La creación es la primera dualidad: el mundo creado necesita un *exterior* y un *interior*, un creador y una criatura. La bet, la casa, es el recipiente que permite que esa dualidad conviva. Sin una casa que la contenga, la multiplicidad se dispersa.`,
      },
      {
        t: "p",
        text: `**La Sabiduría y su casa.** El libro de Proverbios da una imagen que resuena con la bet de Génesis: la **Sabiduría** (Jojmá) también construye una casa:`,
      },
      {
        t: "verse",
        he: "חָכְמוֹת בָּנְתָה בֵיתָהּ חָצְבָה עַמּוּדֶיהָ שִׁבְעָה",
        es: "La Sabiduría edificó su casa; labró sus siete columnas.",
        ref: "Mishlé / Proverbios 9:1",
        sefaria: "Proverbs 9:1",
      },
      {
        t: "p",
        text: `Siete columnas — los siete días de la creación — sostienen la casa de la Sabiduría. La Torá, que la tradición identifica con esa Sabiduría (⚠️ lectura midrásica clásica), comienza con bet precisamente porque es una *casa*: el espacio que Dios construyó para que la humanidad pudiera habitarlo, estudiarlo y construirlo hacia adelante.`,
      },
      {
        t: "p",
        text: `**La bet como tarea.** Si la creación es una casa, cada estudio de la Torá es un acto de *amoblarla*. Cada lectura honesta, con fuente y verificación, añade un mueble al espacio que la bet abrió. Estudiar la Torá no es solo recibir información: es participar en la construcción de la casa.`,
      },
    ],
    contemplacion: [
      "Una casa no es solo paredes: es el espacio donde algo puede crecer con seguridad. La bet nos dice que la creación entera es una casa que Dios construyó para que habitemos en ella. ¿Estás construyendo dentro de esa casa, o la tratas como un pasillo de paso?",
    ],
    accion: {
      text: [
        `Abre el motor de estudio del sitio en Génesis 1:1 (Bereshit). Lee las primeras cuatro palabras en hebreo: **בְּרֵאשִׁית בָּרָא אֱלֹהִים**. Nota que todas empiezan con *bet, bet, álef* — el eco de la primera letra en las palabras que la siguen. La casa se construye sobre sus propios cimientos.`,
      ],
      cta: { label: "Abrir Génesis 1:1 en el motor →", ref: "Genesis 1:1" },
    },
    sello:
      "La bet = casa (bayit ✅): cerrada por tres lados, abierta hacia adelante. Bet = 2 🔢 — la primera multiplicidad. La Torá comienza con bet porque la creación es una casa que Dios construyó para ser habitada.",
    hilos: [
      { kind: "letter", ref: "bet", label: "Estudio completo de la bet en el sitio" },
      { kind: "study", ref: "que-es-pardes", label: "La bet de Bereshit se puede leer en cuatro niveles — ¿recuerdas PaRDeS?" },
    ],
    fuentes: [
      "Bereshit / Génesis 1:1 ✅",
      "Bereshit Rabá 1:10 ✅",
      "Mishlé / Proverbios 9:1 ✅",
      "Sefer Yetzirah 2:2 ✅",
      "bet = 2 🔢",
    ],
    tarea: {
      semana: 8,
      herramienta: "La letra como portadora de una enseñanza midrásica (Bereshit Rabá 1:10)",
      enunciado:
        "Abre Bereshit Rabá 1:10 en Sefaria. Lee el pasaje sobre la bet. Escribe: ¿qué pregunta le hace el Midrash a la primera letra de la Torá? ¿Qué responde? ¿Qué te dice sobre cómo los sabios leían el texto?",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L9 ────────────────────────────────────────────────────────────────────
  {
    n: 9,
    id: "E1·M2·L9",
    slug: "guimel-dalet",
    title: "ג Guímel y ד Dálet — El que da y el pobre",
    apertura: {
      question:
        "¿Por qué dos letras consecutivas del alfabeto enseñan la misma lección sobre la generosidad?",
    },
    estudio: [
      {
        t: "p",
        text: `**Las letras no son casuales.** En el alefato hebreo, guímel (ג) y dálet (ד) se siguen inmediatamente: ג-ד, lado a lado. El Talmud pregunta: ¿por qué están juntas? Y la respuesta no es gramatical sino *ética*:`,
      },
      {
        t: "verse",
        he: `גִּימֶ"ל דָּלֶ"ת, גְּמוֹל דַּלִּים`,
        es: "Guímel-dálet: gemol dalim — 'sé generoso con los pobres'.",
        ref: "Talmud Bavlí, Shabat 104a",
        sefaria: "Shabbat 104a",
      },
      {
        t: "p",
        text: `La lección es la forma misma de las letras. La tradición describe a la **guímel** (⚠️ lectura de su forma) como una figura inclinada hacia adelante, corriendo — el que *corre* hacia la dálet para darle. La **dálet** (de *dal*, דַּל, "pobre" ✅ — la misma raíz) tiene la postura de alguien inclinado, que recibe. El alefato inscribe en sus letras una ley moral: el que tiene persigue al que necesita para darle, sin esperar a que el pobre se humille en pedirlo.`,
      },
      {
        t: "p",
        text: `**Forma, nombre, valor.**\n\n**ג Guímel** — forma: (⚠️ tradición: una figura que avanza); nombre: deriva de *gamal* (גָּמַל, "destetar, tratar generosamente"); valor: **3** — el primer número impar después de la unidad y la dualidad; el número de lo completo que incluye inicio, medio y fin.\n\n**ד Dálet** — forma: (⚠️ tradición: figura inclinada); nombre: de *dal* (דַּל, "pobre, encorvado" ✅); valor: **4** — los cuatro puntos cardinales, los cuatro rincones del mundo al que debe llegar la generosidad.`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**Guímel + Dálet = 7** 🔢. ג(3) + ד(4) = **7**. El siete es el número de la completitud de la creación: los siete días, los siete colores del arco, los siete días de la semana. Cuando el dar (3) y el recibir (4) se unen, se forma la semana completa — la estructura del tiempo en que vivimos la generosidad. El Sofer verificó: 3 + 4 = 7.`,
      },
      {
        t: "p",
        text: `**La enseñanza de la Torá sobre dar.** Esta relación entre guímel y dálet no es solo un juego de letras: corresponde a una de las mitzvot más explícitas de la Torá:`,
      },
      {
        t: "verse",
        he: "כִּי יִהְיֶה בְךָ אֶבְיוֹן מֵאַחַד אַחֶיךָ… לֹא תְאַמֵּץ אֶת לְבָבְךָ וְלֹא תִקְפֹּץ אֶת יָדְךָ מֵאָחִיךָ הָאֶבְיוֹן. כִּי פָתֹחַ תִּפְתַּח אֶת יָדְךָ לוֹ",
        es: "Si hubiere entre ustedes alguno de tus hermanos que sea pobre… no endurecerás tu corazón ni cerrarás tu mano a tu hermano pobre. Sino que abrirás tu mano a él sin reservas.",
        ref: "Devarim / Deuteronomio 15:7–8",
        sefaria: "Deuteronomy 15:7",
      },
      {
        t: "p",
        text: `La Torá usa la imagen de la **mano abierta** — exactamente la postura de la guímel corriendo hacia la dálet. La generosidad no espera: avanza. Y el Talmud, al leer las letras del alefato, ya sabía que esa enseñanza estaba escrita en la forma de las propias letras.`,
      },
      {
        t: "p",
        text: `**La economía espiritual del dar y recibir.** Guímel y dálet no son opuestos sino complementarios: sin un dador (guímel) no hay receptor (dálet), y sin receptor no hay acto de dar completo. La Cabalá (que estudiaremos más adelante) ve en esta relación el patrón de toda emanación: la Luz que sale (guímel) necesita una vasija que la reciba (dálet). Por ahora, en Pshat, alcanza con saber que dar y recibir son un par inseparable — y que el alefato lo grabó en piedra desde el principio.`,
      },
    ],
    contemplacion: [
      "La guímel persigue a la dálet — no al revés. La iniciativa de dar no espera que el necesitado pida. En una cultura que hace del receptor quien debe humillarse, el alefato enseña exactamente lo contrario: la dignidad de la dálet está en recibir sin avergonzarse; la responsabilidad de la guímel está en perseguir sin que se lo pidan.",
    ],
    accion: {
      text: [
        `Esta semana, haz un acto de *gomel dalim* — generosidad concreta, sin esperar a que te lo pidan. Puede ser pequeño. La guímel no mide el tamaño; mide la dirección del movimiento.`,
      ],
    },
    sello:
      "Guímel = 3 (el que da, *gomel*), Dálet = 4 (el pobre, *dal* ✅). Juntos = 7 🔢: la semana completa de la generosidad. La letra no es solo sonido: es enseñanza moral inscrita en la forma.",
    hilos: [
      { kind: "letter", ref: "guimel", label: "Análisis completo de la guímel" },
      { kind: "letter", ref: "dalet", label: "Análisis completo de la dálet" },
      { kind: "study", ref: "26", label: "Dar y recibir — el mismo patrón que une Unidad (Ejad) y Amor (Ahavá)" },
    ],
    fuentes: [
      "Talmud Bavlí, Shabat 104a ✅",
      "Devarim / Deuteronomio 15:7–8 ✅",
      "Sefer Yetzirah 2:2 ✅",
      "guímel(3) + dálet(4) = 7 🔢",
    ],
    tarea: {
      semana: 9,
      herramienta: "Relación semántica entre letras consecutivas — guímel y dálet como gomel dalim",
      enunciado:
        "Escribe el valor numérico de guímel (3) y dálet (4). Luego escribe en 1 párrafo qué te enseña la tradición sobre la relación entre estas dos letras (el que da — el pobre). ¿Qué valor ético comunica esta relación? Cita que es ⚠️ (tradición, no cita verificada en un pasaje único).",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L10 ───────────────────────────────────────────────────────────────────
  {
    n: 10,
    id: "E1·M2·L10",
    slug: "he-vav",
    title: "ה He y ו Vav — Las letras del Nombre",
    apertura: {
      question:
        "¿Qué tienen en común la letra que aparece dos veces en el Nombre de Dios y el número seis?",
    },
    estudio: [
      {
        t: "p",
        text: `**Dos letras dentro del Nombre.** Ya conociste el Nombre de cuatro letras **יהוה** (YHVH) en la Shemá (L6). Ahora estudiamos dos de esas letras por dentro: la **ה** (*he*) y la **ו** (*vav*). Nota: en el Nombre, la *he* aparece **dos veces** — en segunda y cuarta posición. Eso ya es una señal de que esta letra carga un peso especial.`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**YHVH = 26** 🔢. יוֹד(10) + הֵא(5) + וָו(6) + הֵא(5) = **26**. (Este número lo estudiarás en profundidad en el Módulo J2; aquí lo registramos como dato.) El Sofer verificó: 10+5+6+5 = 26.`,
      },
      {
        t: "p",
        text: `**ה He — la letra de la creación.** La *he* tiene un valor de **5** y una forma que los maestros describen como una "pequeña abertura en la base" — una salida mínima. El Talmud enseña algo asombroso sobre esta letra:`,
      },
      {
        t: "verse",
        he: `בְּהִבָּרְאָם — בְּה"א בְּרָאָם`,
        es: "«en su ser creados» (Génesis 2:4): con [la letra] he los creó.",
        ref: "Menajot 29b",
        sefaria: "Menachot 29b",
      },
      {
        t: "p",
        text: `El Talmud lee la palabra *«be-hibar'am»* (בְּהִבָּרְאָם, "en su ser creados", Génesis 2:4) como *«be-he bera'am»* — "con la letra **he** los creó." Dios usó la he para crear este mundo porque la he tiene esa pequeña abertura en su base: una entrada para la teshuvá (el retorno), una salida para el que quiere escapar del mundo pero puede volver. La he es la letra de la segunda oportunidad.`,
      },
      {
        t: "p",
        text: `El mismo pasaje del Talmud añade: el mundo **venidero** fue creado con la letra **yod** (י) — la más pequeña, la semilla (la estudiaremos en L11). Este mundo, con sus imperfecciones y su abertura para la teshuvá, fue creado con he. El mundo futuro, con su plenitud, fue creado con yod.`,
      },
      {
        t: "p",
        text: `**ו Vav — el gancho y la columna.** La *vav* tiene un valor de **6** y su forma es una línea vertical — una **columna** (⚠️ lectura de su forma). Su nombre mismo, *vav* (וָו), significa "gancho" ✅ — en hebreo bíblico, la *vav* es el conector gramatical: *ve* (וְ) = "y". La creación entera está cosida con *vav*: "los cielos **y** la tierra", "el bien **y** el mal", "el día **y** la noche". La vav es el *y* que une los opuestos.`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**Vav = 6** 🔢. El número seis resonará a lo largo del módulo: los **seis días de la creación**, las **seis direcciones del espacio** (arriba/abajo, norte/sur, este/oeste), las **seis órdenes de la Mishná** (que aprenderás como Shoel). El *Sefer Yetzirah* describe las "seis extremidades" de la realidad creada (✅ Sefer Yetzirah 1:13). El 6 es la estructura del mundo físico; la vav es su columna.`,
      },
      {
        t: "p",
        text: `**He y vav en el Nombre.** Que estas dos letras vivan dentro del Nombre Divino no es decorativo: el nombre יהוה contiene en sí la letra de la creación (he×2) y la letra del conector (vav). El Nombre de Dios lleva inscrito el acto de crear y unir. Cada vez que uno piensa en el Nombre — sin pronunciarlo, porque no se pronuncia — lleva en mente ese tejido de creación y conexión.`,
      },
    ],
    contemplacion: [
      "La he tiene una pequeña abertura: por ahí entra la teshuvá, la posibilidad de volver. Este mundo fue hecho con esa abertura a propósito — no es un defecto del mundo que haya imperfección; es la condición que hace posible el retorno.",
      "La vav es el *y* que une. ¿Qué dos cosas en tu vida necesitan un gancho que las conecte?",
    ],
    accion: {
      text: [
        `Escribe el Nombre **יהוה** a mano, de derecha a izquierda: yod-he-vav-he. Recita mentalmente cada valor: 10-5-6-5. Suma: 26. No lo pronuncies — solo obsérvalo como lo que es: cuatro letras que encierran la estructura de la creación.`,
      ],
    },
    sello:
      "He (ה) = 5: la letra de la creación de este mundo (Menajot 29b ✅). Vav (ו) = 6: el gancho-conector, los seis días, las seis direcciones. YHVH = yod(10)+he(5)+vav(6)+he(5) = 26 🔢.",
    hilos: [
      { kind: "letter", ref: "he", label: "Análisis completo de la he" },
      { kind: "letter", ref: "vav", label: "Análisis completo de la vav" },
      { kind: "study", ref: "26", label: "El número 26 del Nombre — Unidad y Amor en el mismo peso" },
      { kind: "study", ref: "el-nombre", label: "¿Por qué el Nombre YHVH no se pronuncia?" },
    ],
    fuentes: [
      "Menajot 29b ✅ (con he los creó; con yod el mundo venidero)",
      "Sefer Yetzirah 1:13 ✅ (seis extremidades)",
      "Sefer Yetzirah 2:2 ✅",
      "YHVH = yod(10)+he(5)+vav(6)+he(5) = 26 🔢",
    ],
    tarea: {
      semana: 10,
      herramienta: "Lectura de letras dentro del Nombre Divino — he y vav como parte del tetragrámaton YHVH",
      enunciado:
        "El Nombre יהוה (YHVH) tiene cuatro letras: yod (10), he (5), vav (6), he (5). Suma el valor. (El estudiante debe llegar a 26.) Escribe la suma mostrando cada letra. Nota: todavía no interpretamos el 26 — solo registramos el número con exactitud.",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L11 ───────────────────────────────────────────────────────────────────
  {
    n: 11,
    id: "E1·M2·L11",
    slug: "yod",
    title: "י Yod — La semilla más pequeña",
    apertura: {
      question:
        "¿Cómo puede la letra más pequeña del alfabeto ser la más fundamental de todas?",
    },
    estudio: [
      {
        t: "p",
        text: `**La letra que no ocupa espacio.** Si tomas el alefato entero y buscas la letra más pequeña visualmente, es la **י** (*yod*): un punto con una pequeña cola, apenas un trazo. Sin embargo, la tradición dice que esta letra está en el origen de *todas* las demás. Cada letra del alefato se puede ver como una yod expandida y transformada — la yod es la semilla de la que brota el árbol entero del alefato.`,
      },
      {
        t: "p",
        text: `**Forma, nombre, valor.** La yod se escribe como un punto suspendido. Su nombre, **yod** (יוֹד), viene de la misma raíz que *yad* (יָד, "mano" ✅ — la misma raíz). La mano que hace, que actúa, que escribe: ese es el canal de la yod. Su **valor estándar es 10** — la base del sistema decimal, el número de los dedos de las manos, y el número de las sefirot (✅ Sefer Yetzirah 1:2: *"diez sefirot beli-má"*). La yod es la letra del 10: el número que cierra un ciclo y abre el siguiente.`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**Yod = 10** 🔢. En el sistema estándar (mispar hejrají): י = 10. En el sistema del nombre completo (milui): **יוֹד** = yod(10)+vav(6)+dalet(4) = **20**. El Sofer verificó: 10+6+4 = 20. Ambos valores son válidos en sus respectivos sistemas; siempre se indica cuál se usa.`,
      },
      {
        t: "p",
        text: `**"Incluso la corona de una yod."** El Talmud registra una enseñanza que habla de la permanencia absoluta de la Torá, y usa precisamente a la yod como su ejemplo más extremo:`,
      },
      {
        t: "verse",
        he: "כֹּתֶרֶת אוֹת אַחַת מִן הַתּוֹרָה, אֲפִילוּ קוֹצוֹ שֶׁל יוֹד אֵינוֹ בָּטֵל לְעוֹלָם",
        es: "La corona de una letra de la Torá, incluso el tilde de una yod, no se anula jamás.",
        ref: "Menajot 29b",
        sefaria: "Menachot 29b",
      },
      {
        t: "p",
        text: `El *tilde* de la yod — la cola mínima que hace que sea yod y no un simple punto — no puede ser removido de la Torá. La Torá es tan precisa que incluso su letra más pequeña, incluso el adorno de esa letra, es eterno. Esto le da un peso extraordinario: la yod no es ornamental; es arquitectura.`,
      },
      {
        t: "p",
        text: `**Un eco externo.** Vale señalar (como dato de contexto, no como fuente de la tradición judía) que el evangelio de Mateo 5:18 dice: *"ni una jota ni una tilde pasará de la ley…"* La "jota" del texto griego es la *iota* (ι), que es la transliteración de la yod hebrea. Esta referencia externa confirma que ya en la antigüedad la yod era conocida como la letra mínima de la escritura sagrada — incluso en tradiciones que se alejaron de su origen.`,
      },
      {
        t: "p",
        text: `**Las diez sefirot y la yod.** El *Sefer Yetzirah* abre con los "32 senderos" y los define como "diez sefirot beli-má y veintidós letras" (✅ Sefer Yetzirah 1:2). La yod, que vale 10, es la letra que *señala* el número de las sefirot — el primer asomo de ese concepto que el estudiante profundizará mucho más adelante (en las etapas de Javer y Maguid). Por ahora, basta registrar: la yod contiene el 10, y el 10 es el número de la estructura completa de la emanación divina.`,
      },
      {
        t: "p",
        text: `**La yod en el Nombre.** Recuerda: el Nombre יהוה empieza con **yod** — la primera letra del Nombre es la más pequeña del alefato. El Infinito que precede a toda creación eligió como su primera letra la más pequeña. No porque sea menor, sino porque la infinitud no necesita espacio para existir: puede ser un punto.`,
      },
    ],
    contemplacion: [
      "La semilla más pequeña contiene el árbol entero — no como posibilidad vaga sino como potencia real. La yod no necesita ser grande para ser fundamental. ¿En qué parte de tu vida estás esperando ser 'suficientemente grande' para empezar, cuando en realidad el punto pequeño ya contiene todo lo que necesitas para comenzar?",
    ],
    accion: {
      text: [
        `Escribe la letra **י** (yod): un punto con una pequeña cola, de arriba hacia abajo. Ahora escribe la het (ח): fíjate cómo hay una yod dentro de la forma de la het. Escribe la alef (א): hay dos yod unidas por una vav. La yod está en todas partes porque es la semilla de todas. Intenta encontrar la yod en otras tres letras del alefato que ya conoces.`,
      ],
    },
    sello:
      "Yod (י) = 10 🔢 — la más pequeña, la semilla de todas las letras. Incluso su tilde es eterno (Menajot 29b ✅). Yod apunta a los 10 sefirot (Sefer Yetzirah 1:2 ✅) y es la primera letra del Nombre YHVH.",
    hilos: [
      { kind: "letter", ref: "yod", label: "Análisis completo de la yod" },
      { kind: "study", ref: "el-alefato", label: "Vuelve al alefato completo con ojos nuevos — ¿cuántas yod encuentras?" },
      { kind: "study", ref: "26", label: "YHVH empieza con yod — la puerta del Nombre" },
    ],
    fuentes: [
      "Menajot 29b ✅ (el tilde de la yod)",
      "Sefer Yetzirah 1:2 ✅ (diez sefirot beli-má)",
      "Sefer Yetzirah 2:2 ✅",
      "yod = 10 🔢; yod milui (יוד) = 10+6+4 = 20 🔢",
    ],
    tarea: {
      semana: 11,
      herramienta: "La yod como letra-semilla — la más pequeña que contiene la mayor potencia",
      enunciado:
        "La yod (י) es la letra más pequeña del alefato. Su valor es 10. Su nombre completo: yod-vav-dalet = 10+6+4 = 20. Escribe: (1) la suma del nombre; (2) busca en el evangelio de Mateo 5:18 (texto del Nuevo Testamento, como fuente externa a la tradición judía) la referencia a la 'jota' — ¿a qué letra hebrea crees que se refiere? (La yod, la más pequeña.) ¿Qué te dice esto sobre el peso que la tradición le da a cada letra?",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L12 ───────────────────────────────────────────────────────────────────
  {
    n: 12,
    id: "E1·M2·L12",
    slug: "palabras-ancla",
    title: "Palabras-ancla — Emet, Shalom, Jai",
    apertura: {
      question:
        "Tres palabras que todo el mundo conoce — paz, verdad, vida. ¿Qué esconden sus números?",
    },
    estudio: [
      {
        t: "p",
        text: `**De las letras a las palabras.** En las cinco lecciones anteriores aprendiste a ver una letra como un canal: forma, nombre, valor, enseñanza. Ahora damos el paso siguiente: las letras se combinan en **palabras**, y esas combinaciones también revelan. No es magia — es la misma lógica que ya conoces. Hoy estudiamos tres palabras que el judaísmo llama "palabras-ancla": *emet* (verdad), *shalom* (paz) y *jai* (vida).`,
      },
      {
        t: "p",
        text: `**אֱמֶת — Emet (Verdad).** Las tres letras de *emet* son: **א** (álef, la primera letra del alefato), **מ** (mem, la letra del medio — posición 13 de 22) y **ת** (tav, la última letra del alefato). La tradición enseña que la verdad "*abarca todo*" — literalmente: sus letras van del principio al final del alfabeto, pasando por el centro. No es un juego de palabras; es la razón por la que se eligió esa palabra para el concepto más alto:`,
      },
      {
        t: "verse",
        he: "חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא אֱמֶת",
        es: "El sello del Santo Bendito es *emet* — verdad.",
        ref: "Talmud Bavlí, Shabat 55a",
        sefaria: "Shabbat 55a",
      },
      {
        t: "p",
        tone: "gematria",
        text: `**Emet = 441** 🔢. א(1) + מ(40) + ת(400) = **441**. El Sofer verificó: 1+40+400 = 441. Y 441 = **21²** — la verdad es un cuadrado perfecto, una estructura que se sostiene por sí misma. (⚠️ observación matemática, no una fuente única que lo afirme explícitamente — se anota como tal.)`,
      },
      {
        t: "p",
        text: `**שָׁלוֹם — Shalom (Paz).** La palabra *shalom* en hebreo no solo significa la ausencia de conflicto: su raíz, *shalem* (שָׁלֵם, "completo, íntegro" ✅), señala la plenitud. La paz verdadera es completud, no silencio forzado. La Mishná dice:`,
      },
      {
        t: "verse",
        he: "לֹא מָצָא הַקָּדוֹשׁ בָּרוּךְ הוּא כְּלִי מַחֲזִיק בְּרָכָה לְיִשְׂרָאֵל אֶלָּא הַשָּׁלוֹם",
        es: "No encontró el Santo Bendito recipiente que contenga la bendición para Israel, excepto la paz.",
        ref: "Mishná Uktzin 3:12",
        sefaria: "Uktsin 3:12",
      },
      {
        t: "p",
        tone: "gematria",
        text: `**Shalom = 376** 🔢. ש(300) + ל(30) + ו(6) + מ(40) = **376**. El Sofer verificó: 300+30+6+40 = 376. Ahora una observación que invita a la reflexión: **עֵשָׂו** (*Esav*, el hermano de Ya'akov cuya relación con Israel lleva siglos de tensión) también suma ע(70)+ש(300)+ו(6) = **376**. ¿Qué significa que *shalom* y *Esav* pesen lo mismo? (⚠️ observación de guematría — la tradición tiene lecturas al respecto; este no es el lugar de agotarla. Se registra como pregunta abierta.) El número invita a la Hitbonenut: ¿quizá la paz solo puede alcanzarse cuando se transforma la energía del conflicto más arraigado?`,
      },
      {
        t: "p",
        text: `**חַי — Jai (Vida).** Dos letras: **ח** (jet, valor 8) + **י** (yod, valor 10) = **18**. La vida pesa 18.`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**Jai = 18** 🔢. ח(8) + י(10) = **18**. El Sofer verificó: 8+10 = 18. Por eso en la tradición judía las donaciones se hacen en **múltiplos de 18** (✅ práctica halájica conocida, raíz en el valor de *jai*): dar en múltiplos de 18 es dar *vida*. Las donaciones de 18, 36, 54, 72 sheqalim o dólares son literalmente "una vida", "dos vidas", "tres vidas". El número no es superstición: es semántica.`,
      },
      {
        t: "verse",
        he: "וּשְׁמַרְתֶּם אֶת חֻקֹּתַי וְאֶת מִשְׁפָּטַי אֲשֶׁר יַעֲשֶׂה אֹתָם הָאָדָם וָחַי בָּהֶם",
        es: "Guardaréis mis estatutos y mis normas, los cuales, si el ser humano los practica, vivirá por ellos — *va-jai bahem*.",
        ref: "Vayikrá / Levítico 18:5",
        sefaria: "Leviticus 18:5",
      },
      {
        t: "p",
        text: `**וָחַי בָּהֶם** (*va-jai bahem*, "vivirá por ellos") — la raíz *jai* en la Torá no describe solo la vida biológica: describe la vida plena que surge de vivir alineado con la enseñanza. El número 18 porta esa densidad.`,
      },
      {
        t: "p",
        text: `**Las tres palabras juntas.** El estudiante de la Academia tiene ahora tres palabras-ancla con las que puede medir cualquier enseñanza: ¿es *verdad* (emet — ¿tiene fuente? ¿puedes verificarla?)? ¿construye *paz* (shalom — ¿es completud, no solo silencio?)? ¿da *vida* (jai — ¿anima, o drena?)? Esta es la brújula mínima del estudioso honesto.`,
      },
    ],
    contemplacion: [
      "La verdad abarca todo (álef a tav). La paz es el único recipiente de la bendición. La vida pesa 18. Tres números, tres estructuras — no como decoración sino como gramática del mundo que la Torá describe. Antes de esta lección, esas palabras eran solo sonidos conocidos. Después de esta lección, cada vez que las oigas, podrás sentir su peso.",
    ],
    accion: {
      text: [
        `Calcula tú mismo los tres valores: **emet** (א+מ+ת), **shalom** (ש+ל+ו+מ), **jai** (ח+י). Usa los valores que ya memorizes del alefato. Muestra la suma letra por letra. Este es tu primer ejercicio de guematría propia — verificada, no recibida.`,
      ],
    },
    sello:
      "Emet (אמת) = 441 = 21² 🔢 — el sello de Dios (Shabat 55a ✅). Shalom (שלום) = 376 🔢 — el único recipiente de la bendición (Uktzin 3:12 ✅). Jai (חי) = 18 🔢 — por eso se dona en múltiplos de 18.",
    hilos: [
      { kind: "study", ref: "26", label: "El número del Nombre (26) y el número de la verdad (441) — cómo se tejen los valores" },
      { kind: "letter", ref: "alef", label: "La álef es la primera letra de emet — la verdad empieza con la unidad silenciosa" },
      { kind: "letter", ref: "tav", label: "La tav es la última letra del alefato y de emet — estudia su peso" },
    ],
    fuentes: [
      "Talmud Bavlí, Shabat 55a ✅ (el sello de Dios es emet)",
      "Mishná Uktzin 3:12 ✅ (shalom como único recipiente de la bendición)",
      "Vayikrá / Levítico 18:5 ✅ (va-jai bahem)",
      "emet = 1+40+400 = 441 🔢",
      "shalom = 300+30+6+40 = 376 🔢",
      "jai = 8+10 = 18 🔢",
    ],
    closeModule:
      "En seis semanas más, el Talmid ya no solo reconoce el alefato: lo *habita*. Aprendiste que cada letra tiene una forma que enseña, un nombre que describe su función, un valor que conecta con otros valores. La álef es el silencio antes de la palabra. La bet es la casa de la creación. Guímel y dálet enseñan ética moral. He y vav son el tejido del Nombre Divino. La yod es la semilla de todo. Y tres palabras — verdad, paz, vida — son las anclas del vocabulario espiritual más esencial. Las letras escriben palabras; las palabras escriben la historia. Ahora irás a leer la primera historia: la Creación.",
    tarea: {
      semana: 12,
      herramienta: "Primera guematría verificada aplicada a palabras completas de la Torá",
      enunciado:
        "Calcula el valor de estas tres palabras: emet (אֱמֶת = 1+40+400 = 441), shalom (שָׁלוֹם = 300+30+6+40 = 376), jai (חַי = 8+10 = 18). Muestra la suma letra por letra para cada una. No es necesario interpretarlas — solo verificar los números.",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO2 = {
  id: "T2",
  he: "אוֹתִיּוֹת",
  titulo: "Las letras vivas",
  etapaHe: "תַּלְמִיד",
  etapa: "Talmid",
  etapaGloss: "estudiante",
  etapaNum: 1,
  etapasTotal: 6,
  total: LESSONS2.length,
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson2(slug: string): Lesson | undefined {
  return LESSONS2.find((l) => l.slug === slug);
}

export function lessonIndex2(slug: string): number {
  return LESSONS2.findIndex((l) => l.slug === slug);
}

export function nextLesson2(slug: string): Lesson | null {
  const i = lessonIndex2(slug);
  return i >= 0 && i < LESSONS2.length - 1 ? LESSONS2[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 2 ──────────────────────────────
// Slugs internos del Módulo 2.
const INTERNAL_SLUGS2: Record<string, string> = {
  alef: "alef",
  bet: "bet",
  "guimel-dalet": "guimel-dalet",
  "he-vav": "he-vav",
  yod: "yod",
  "palabras-ancla": "palabras-ancla",
  // alias útiles
  "el-alefato": "alef", // aproximación: apunta a la primera letra
};

const MISTERIO_SLUGS2 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread2(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS2[key]) return { kind: "lesson", slug: INTERNAL_SLUGS2[key] };
  if (MISTERIO_SLUGS2.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href del destino para Módulo 2, o null si es teaser.
export function threadHref2(t: ThreadTarget): string | null {
  switch (t.kind) {
    case "lesson":
      return `/academia/modulo-2/${t.slug}`;
    case "letter":
      return `/letras/${t.ref}`;
    case "misterio":
      return `/misterio/${t.slug}`;
    default:
      return null;
  }
}
