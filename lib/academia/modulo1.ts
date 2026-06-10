// ─────────────────────────────────────────────────────────────────────────
// modulo1.ts — ACADEMIA DE JASHMAL · Módulo 1 (T1 · פְּתִיחָה "La orientación").
// Las primeras 6 lecciones guiadas que siguen INMEDIATAMENTE a El Umbral.
//
// El contenido (textos, citas, gematrías) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - curriculo completo (Sofer).md", §5. Se monta
// TAL CUAL: no se inventa, altera ni agrega ninguna fuente ni gematría.
//
// Idioma: español (el currículo del Sofer está en español). La estructura queda
// lista para i18n (es/fa/en) como umbral.ts, pero las 6 lecciones NO se traducen
// todavía (trilingüe diferido). Las citas hebreas no cambian entre idiomas.
//
// Cada lección sigue el ritmo de acompañamiento (§6), un eco del método de 6
// secciones: apertura (פְּתִיחָה) → estudio guiado → contemplación (הִתְבּוֹנְנוּת)
// → micro-acción (מַעֲשֶׂה) → sello (חֲתִימָה) → hilo ("Sigue el hilo").
// ─────────────────────────────────────────────────────────────────────────

import { MISTERIOS } from "@/lib/content/misterios";

// ── Tipos ──────────────────────────────────────────────────────────────────

// Un bloque del estudio guiado.
//   p     → párrafo (soporta **negrita**, *cursiva* y hebreo en línea).
//           tone: "gematria" (🔢 aside) · "shield" (la regla de la fuente) ·
//           "item" (ítem de lista, p. ej. las 3 partes del Tanaj o los 4 PaRDeS).
//   verse → fuente hebrea con traducción y referencia (palabras pulsables → léxico).
export type Block =
  | { t: "p"; text: string; tone?: "gematria" | "shield" | "item" }
  | { t: "verse"; he: string; es: string; ref: string; sefaria?: string };

// "Sigue el hilo": un puente clicable hacia otro estudio/letra existente o futuro.
export type Hilo = { kind: "study" | "letter"; ref: string; label: string };

export type Lesson = {
  n: number;            // número de lección (1–6)
  id: string;           // id del currículo, p. ej. "E1·M1·L1"
  slug: string;         // ruta: /academia/modulo-1/{slug}
  title: string;        // título en español
  apertura: { question: string };          // פְּתִיחָה — la pregunta de entrada
  estudio: Block[];                         // estudio guiado
  contemplacion: string[];                  // הִתְבּוֹנְנוּת — párrafos
  accion: { text: string[]; cta?: { label: string; ref: string } }; // מַעֲשֶׂה
  sello: string;                            // חֲתִימָה — el sello (una línea)
  hilos: Hilo[];                            // chips "Sigue el hilo"
  fuentes: string[];                        // fuentes exactas (tira de integridad)
  closeModule?: string;                     // solo L6: cierre del Módulo 1
};

// ── Las 6 lecciones (§5, verbatim del Sofer) ────────────────────────────────

export const LESSONS: Lesson[] = [
  // ── L1 ────────────────────────────────────────────────────────────────────
  {
    n: 1,
    id: "E1·M1·L1",
    slug: "que-es-la-tora",
    title: "¿Qué es la Torá?",
    apertura: {
      question:
        "En El Umbral entendiste, con la fuente delante, por qué el mundo empieza con la letra ב. Una pregunta sencilla antes de seguir: cuando oyes la palabra «Torá», ¿qué imaginas — un libro, una ley, una historia?",
    },
    estudio: [
      {
        t: "p",
        text: `**Targum (qué es, en una frase).** Torá (תּוֹרָה) no significa "ley" sino **"enseñanza, instrucción"** (de la raíz י-ר-ה, *yará*, "apuntar, señalar"). En su sentido más estrecho, la Torá son los **Cinco Libros de Moshé** (el *Jumash*, חֻמָּשׁ, de *jamesh*, "cinco"): Bereshit, Shemot, Vayikrá, Bamidbar, Devarim (Génesis, Éxodo, Levítico, Números, Deuteronomio).`,
      },
      {
        t: "p",
        text: `**La cadena (por qué confiamos en ella).** Leemos juntos la primera mishná de Pirké Avot (פִּרְקֵי אָבוֹת, "capítulos de los padres", el tratado de ética):`,
      },
      {
        t: "verse",
        he: "מֹשֶׁה קִבֵּל תּוֹרָה מִסִּינַי, וּמְסָרָהּ לִיהוֹשֻׁעַ…",
        es: "Moshé recibió la Torá del Sinaí y la transmitió a Yehoshúa, y Yehoshúa a los ancianos, y los ancianos a los profetas, y los profetas a los Hombres de la Gran Asamblea.",
        ref: "Pirké Avot 1:1",
        sefaria: "Pirkei Avot 1:1",
      },
      {
        t: "p",
        text: `Esto es lo opuesto a la "cábala falsa": no es un secreto que alguien inventó ayer para venderte. Es una **transmisión de mano en mano**, con nombres, desde el Sinaí. *Kabalá* (קַבָּלָה) significa, precisamente, **"lo recibido"** — la misma raíz de *kibel* ("recibió") en esta mishná.`,
      },
      {
        t: "p",
        text: `**Escrita y oral.** La Torá tiene dos mitades: la **escrita** (תּוֹרָה שֶׁבִּכְתָב, *Torá shebijtav*) y la **oral** (תּוֹרָה שֶׁבְּעַל פֶּה, *Torá shebe'al pe*), la explicación viva que viaja con ella. (La oral la estudiaremos a fondo como Shoel.)`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**Un guiño de número** 🔢. La palabra תּוֹרָה suma **611** (tav 400 · vav 6 · resh 200 · he 5 = 611). La tradición (Makot 24a) enseña que de las 613 mitzvot, **611** fueron transmitidas por Moshé —el valor de "Torá"— y **2** las oyó Israel directamente de la boca de Dios. *(El Sofer verificó la suma.)*`,
      },
    ],
    contemplacion: [
      "No recibimos una piedra muerta; recibimos un eslabón de una cadena viva que empezó en el Sinaí y llega hasta esta pantalla. Tú eres, hoy, el eslabón más nuevo.",
    ],
    accion: {
      text: [
        `Dile a una persona, con tus palabras, qué es la Torá: *"una enseñanza recibida de mano en mano, no un secreto comprado."* Enseñar una frase la vuelve tuya.`,
      ],
    },
    sello:
      "La Torá es enseñanza recibida (kabalá), no superstición; cinco libros en su centro, una cadena viva desde el Sinaí, y tú en su punta.",
    hilos: [
      { kind: "study", ref: "tanaj", label: "¿Sabías que la Torá vive dentro de un libro más grande, de 24 libros?" },
      { kind: "study", ref: "torá oral", label: "¿Y que la mitad de la Torá nunca se escribió?" },
    ],
    fuentes: ["Pirké Avot 1:1 ✅", "Torá = 611 · Makot 24a 🔢"],
  },

  // ── L2 ────────────────────────────────────────────────────────────────────
  {
    n: 2,
    id: "E1·M1·L2",
    slug: "que-es-el-tanaj",
    title: "¿Qué es el Tanaj?",
    apertura: {
      question:
        "Ayer dijimos que la Torá son cinco libros. Pero cuando alguien dice «la Biblia hebrea», habla de algo más grande. ¿Cuántos libros crees que tiene?",
    },
    estudio: [
      {
        t: "p",
        text: `**El acrónimo.** **Tanaj** (תַּנַ"ךְ) no es una palabra: son tres iniciales — **T-N-K** — de las tres partes de la Biblia hebrea:`,
      },
      { t: "p", tone: "item", text: `**תּוֹרָה Torá** — "Enseñanza": los 5 libros de Moshé.` },
      {
        t: "p",
        tone: "item",
        text: `**נְבִיאִים Nevi'im** — "Profetas": 8 libros (Yehoshúa, Shoftim, Shmuel, Melajim; Yeshayá, Yirmeyá, Yejezkel, y los Doce profetas menores como un solo libro).`,
      },
      {
        t: "p",
        tone: "item",
        text: `**כְּתוּבִים Ketuvim** — "Escritos": 11 libros (Tehilim/Salmos, Mishlé/Proverbios, Iyov/Job, las cinco Meguilot, Daniel, Ezra-Nejemyá, Divrei HaYamim/Crónicas).`,
      },
      {
        t: "p",
        text: `**La cuenta.** 5 + 8 + 11 = **24 libros**. (El Talmud, en Bava Batra 14b, discute su orden y quién los escribió.)`,
      },
      {
        t: "p",
        text: `**Dónde está la Torá.** La Torá es la **primera y más alta** de las tres partes: el cimiento. Los Profetas corrigen y consuelan; los Escritos cantan y reflexionan. Todo el edificio se apoya en los cinco libros que conocimos ayer.`,
      },
    ],
    contemplacion: [
      "El Tanaj es una biblioteca, no un solo tomo: ley, historia, poesía, profecía, sabiduría. Y todo cuelga del mismo primer cimiento.",
    ],
    accion: {
      text: [
        `Memoriza las tres palabras: *Torá, Nevi'im, Ketuvim.* Dilas tres veces. Mañana reconocerás a qué parte pertenece cada texto que abramos.`,
      ],
    },
    sello:
      "Tanaj = Torá + Nevi'im + Ketuvim = 24 libros; una biblioteca entera apoyada en cinco libros.",
    hilos: [
      { kind: "study", ref: "cita", label: "Cada uno de estos 24 libros se cita con un código exacto — ¿quieres aprender a leerlo?" },
      { kind: "study", ref: "nevi'im", label: "¿Por qué hacían falta profetas si ya estaba la Torá?" },
    ],
    fuentes: ["Tanaj: 24 libros · Bava Batra 14b"],
  },

  // ── L3 ────────────────────────────────────────────────────────────────────
  {
    n: 3,
    id: "E1·M1·L3",
    slug: "como-se-lee-una-fuente",
    title: "Cómo se lee una fuente",
    apertura: {
      question:
        "En El Umbral citamos «Bereshit Rabá 1:10». ¿Te diste cuenta? No te pedimos que creyeras: te dimos una dirección exacta para que lo verificaras tú. Hoy aprendes a leer esas direcciones — el hábito que separa la verdad de la superstición.",
    },
    estudio: [
      {
        t: "p",
        text: `**La cita bíblica.** Tiene tres partes: **libro · capítulo · versículo**. Ejemplo: **Génesis 1:1** = libro Génesis, capítulo 1, versículo 1:`,
      },
      {
        t: "verse",
        he: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
        es: "En el principio creó Dios los cielos y la tierra.",
        ref: "Génesis 1:1",
        sefaria: "Genesis 1:1",
      },
      {
        t: "p",
        text: `**La cita del Talmud.** No usa capítulo:versículo, sino **hoja (daf) + cara (amud)**. Cada hoja tiene dos caras: **a** (frente) y **b** (reverso). Ejemplo: **Shabat 31a** = tratado Shabat, hoja 31, cara a. Lo veremos cuando seamos Shoel.`,
      },
      {
        t: "p",
        text: `**El Midrash, el Zohar.** Igual: nombre de la obra + ubicación. *Bereshit Rabá 1:10* (la obra *Bereshit Rabá*, sección 1, párrafo 10). *Zohar* I, 15a (volumen, folio).`,
      },
      {
        t: "p",
        tone: "shield",
        text: `**La regla de oro de Jashmal.** *Todo lo que afirmamos tiene una fuente que puedes abrir con tus propios ojos.* Si alguien te dice "la Cabalá enseña que…" y **no puede darte el libro, el capítulo y el versículo**, no es Cabalá: es venta. Ese es tu escudo de por vida.`,
      },
    ],
    contemplacion: [
      `La fe honesta no le teme a la verificación; la invita. Una dirección exacta es un acto de respeto hacia ti: *"no me creas, comprueba."*`,
    ],
    accion: {
      text: [
        `Abre, en el motor de estudio del propio sitio, **Génesis 1:1**. Léelo en hebreo y en español. Acabas de verificar tu primera fuente sin intermediarios.`,
      ],
      cta: { label: "Abrir Génesis 1:1 en el motor de estudio →", ref: "Genesis 1:1" },
    },
    sello:
      "Libro cap:versículo para el Tanaj; daf + amud (a/b) para el Talmud. Sin fuente, no hay verdad: solo venta. Verificar es tu escudo.",
    hilos: [
      { kind: "study", ref: "gematria", label: "¿Y cuando alguien afirma un número escondido en una palabra — cómo verificas que no se lo inventó?" },
      { kind: "letter", ref: "bet", label: "Vuelve a la bet de El Umbral y revisa su fuente con tus nuevos ojos." },
    ],
    fuentes: ["Génesis 1:1 ✅", "daf + amud · Shabat 31a"],
  },

  // ── L4 ────────────────────────────────────────────────────────────────────
  {
    n: 4,
    id: "E1·M1·L4",
    slug: "el-alefato",
    title: "El alefato: las 22 puertas",
    apertura: {
      question:
        "Ya sabes qué leemos y cómo se cita. Falta la materia prima: las letras. En El Umbral conociste una, la ב. Hoy conoces a sus 21 hermanas.",
    },
    estudio: [
      {
        t: "p",
        text: `**22 letras, de derecha a izquierda.** El alfabeto hebreo (el *alef-bet*, por sus dos primeras letras) tiene **22 letras**, todas consonantes, y se lee **de derecha a izquierda**. Cinco de ellas cambian de forma al final de una palabra (las *sofit*).`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**Las letras son también números** 🔢. No hay cifras aparte: cada letra **es** un número. א=1, ב=2, ג=3… י=10, כ=20… ק=100, ר=200, ש=300, ת=400. Por eso existe la **guematría** (גִּימַטְרִיָּה): sumar el valor de las letras de una palabra. (La haremos con rigor más adelante; hoy basta saber que el número vive dentro de la letra.)`,
      },
      {
        t: "p",
        text: `**El libro más antiguo lo dice así.** El *Sefer Yetzirá* (סֵפֶר יְצִירָה, "Libro de la Formación"), el texto cósmico más antiguo de la tradición, abre:`,
      },
      {
        t: "verse",
        he: "בִּשְׁלֹשִׁים וּשְׁתַּיִם נְתִיבוֹת פְּלִיאוֹת חָכְמָה…",
        es: "Con treinta y dos senderos maravillosos de sabiduría… [Dios] grabó y creó Su mundo.",
        ref: "Sefer Yetzirah 1:1",
        sefaria: "Sefer Yetzirah 1:1",
      },
      {
        t: "p",
        tone: "gematria",
        text: `¿Por qué **32**? Porque **22 letras + 10 sefirot = 32** (✅ Sefer Yetzirah 1:2: "diez sefirot beli-má y veintidós letras de fundamento"). Y hay un guiño hermoso 🔢: 32 es el valor de **לֵב** (*lev*, "corazón": lamed 30 · bet 2 = 32). Los 32 senderos de la sabiduría son el **corazón** de la creación. *(El Sofer verificó: lev = 32.)*`,
      },
    ],
    contemplacion: [
      `Las letras no son un código arbitrario para anotar sonidos: la tradición las recibe como los **ladrillos con que se formó el mundo** —*"con ellas formó el alma de toda criatura"* (✅ Sefer Yetzirah 2:2)—. Aprender a leerlas es aprender el material del que está hecho todo.`,
    ],
    accion: {
      text: [
        `Busca la letra ב (bet) y la letra א (alef) en cualquier texto hebreo de la pantalla. Reconocer dos letras en lo que antes era un muro ilegible: eso ya es leer.`,
      ],
    },
    sello:
      "22 letras, de derecha a izquierda, que también son números. 22 + 10 sefirot = 32 senderos = לֵב, el corazón de la creación.",
    hilos: [
      { kind: "letter", ref: "alef", label: "¿Por qué la primera letra, la א, no tiene sonido propio?" },
      { kind: "study", ref: "pardes", label: "Ya tienes las letras. ¿Lista para el método que las lee en cuatro niveles?" },
    ],
    fuentes: ["Sefer Yetzirah 1:1–1:2 ✅", "Sefer Yetzirah 2:2 ✅", "lev = 32 🔢"],
  },

  // ── L5 ────────────────────────────────────────────────────────────────────
  {
    n: 5,
    id: "E1·M1·L5",
    slug: "que-es-pardes",
    title: "¿Qué es PaRDeS?",
    apertura: {
      question:
        "Una palabra de la Torá puede leerse a varias profundidades a la vez — como un pozo: la superficie brilla, pero el agua viva está honda. La tradición le puso nombre a esos niveles. Y, sin saberlo, en El Umbral ya bajaste el primero.",
    },
    estudio: [
      {
        t: "p",
        text: `**El huerto.** **PaRDeS** (פַּרְדֵּ"ס) significa **"huerto, jardín"** (de ahí viene "paraíso"). Y es un acrónimo de los **cuatro niveles de lectura**:`,
      },
      { t: "p", tone: "item", text: `**פְּשָׁט Pshat** — el sentido **simple, literal**. ("En el principio Dios creó…")` },
      { t: "p", tone: "item", text: `**רֶמֶז Rémez** — la **alusión**: lo que el texto insinúa (números, patrones, ecos).` },
      {
        t: "p",
        tone: "item",
        text: `**דְּרָשׁ Drash** — la **interpretación**: lo que los sabios leen entre líneas (el Midrash). *Así leímos la bet en El Umbral* (Bereshit Rabá 1:10).`,
      },
      { t: "p", tone: "item", text: `**סוֹד Sod** — el **secreto**: la dimensión mística, la Cabalá. El agua más honda.` },
      {
        t: "p",
        text: `**La advertencia que define a Jashmal** (⚠️/✅). La palabra *pardés* aparece en el Talmud en un relato severo:`,
      },
      {
        t: "verse",
        he: "אַרְבָּעָה נִכְנְסוּ לַפַּרְדֵּס…",
        es: "Cuatro entraron al Pardés [los secretos más altos de la Torá]: Ben Azay, Ben Zomá, Ajer y Rabí Akivá.",
        ref: "Jaguigá 14b",
        sefaria: "Chagigah 14b",
      },
      {
        t: "p",
        text: `De los cuatro, solo **Rabí Akivá** "entró en paz y salió en paz". Uno murió, uno enloqueció, uno se volvió hereje. La diferencia no fue el talento: fue la **preparación**. Por eso en Jashmal **no se empieza por el Sod**. Se sube: Pshat (Talmid, Shoel), Rémez y Drash (Javer), y solo después el Sod (Maguid, Jajam, Mekubal). El que salta al Zohar sin cimientos no llega antes — se quiebra, o cae en los hilos rojos. **La letra final de פרד״ס es la última en abrirse.**`,
      },
    ],
    contemplacion: [
      "El método no es un truco para sacar significados ocultos a la fuerza: es la disciplina de **respetar el piso (Pshat) antes de bajar al pozo (Sod)**. Profundidad ganada, no robada.",
    ],
    accion: {
      text: [
        `Memoriza las cuatro palabras en orden — *Pshat, Rémez, Drash, Sod* — y el orden importa: de la superficie a lo hondo. Mañana las usarás tú.`,
      ],
    },
    sello:
      "PaRDeS = huerto = cuatro niveles (Pshat, Rémez, Drash, Sod). Se sube por pasos: solo el preparado entra al huerto y sale en paz (Jaguigá 14b). Por eso la Cabalá llega al final.",
    hilos: [
      { kind: "study", ref: "primera-lectura", label: "Probemos los cuatro niveles, ahora, en un solo versículo." },
      { kind: "study", ref: "zohar", label: "¿Por qué Jashmal no te deja empezar por el Zohar? La respuesta está en Jaguigá 14b." },
    ],
    fuentes: ["Jaguigá 14b ✅"],
  },

  // ── L6 ────────────────────────────────────────────────────────────────────
  {
    n: 6,
    id: "E1·M1·L6",
    slug: "primera-lectura-cuatro-niveles",
    title: "Tu primera lectura en cuatro niveles",
    apertura: {
      question:
        "Tienes las letras y tienes el método. Vamos a bajar el pozo entero, juntos, en el versículo más conocido del judaísmo — el que muchos dicen al despertar y al dormir, y al morir.",
    },
    estudio: [
      { t: "p", text: `**El versículo.**` },
      {
        t: "verse",
        he: "שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד",
        es: "Escucha, Israel: YHVH es nuestro Dios, YHVH es Uno.",
        ref: "Devarim / Deuteronomio 6:4 — la Shemá",
        sefaria: "Deuteronomy 6:4",
      },
      { t: "p", text: `**Estudio guiado — los cuatro niveles, en orden:**` },
      {
        t: "p",
        text: `**פְּשָׁט (literal).** Es un llamado a *escuchar* (שְׁמַע, *shemá*) y una declaración: hay un solo Dios, y es nuestro. El verbo no es "cree": es **"escucha"** — el mismo gesto del nombre del sitio (*jashmal*: primero callar y escuchar). El Pshat es el piso firme: antes de cualquier secreto, el texto **afirma la unidad de Dios**.`,
      },
      {
        t: "p",
        tone: "gematria",
        text: `**רֶמֶז (alusión / número)** 🔢. La última palabra, **אֶחָד** (*ejad*, "Uno"), suma **13** (alef 1 · jet 8 · dalet 4 = 13). Y **אַהֲבָה** (*ahavá*, "amor") también suma **13** (alef 1 · he 5 · bet 2 · he 5 = 13). Dos verdades que pesan lo mismo: **Unidad y Amor**. Y juntas, 13 + 13 = **26** — el valor del Nombre **יהוה** (yod 10 · he 5 · vav 6 · he 5 = 26). El Rémez susurra: donde hay Uno y hay Amor, está el Nombre. *(El Sofer verificó las tres sumas. Esto se estudia entero en el misterio 26.)*`,
      },
      {
        t: "p",
        text: `**דְּרָשׁ (interpretación).** Los sabios preguntan: ¿por qué decir "**Escucha, Israel**" — a quién se le habla? Una lectura clásica: cada persona le habla a su propio corazón disperso, llamándolo a recoger sus mil pedazos en **uno**. Declarar que Dios es Uno es también el trabajo de **unificarte** a ti mismo.`,
      },
      {
        t: "p",
        text: `**סוֹד (secreto) — apenas un destello.** En su nivel más hondo, "YHVH es Uno" no dice solo que hay *un* Dios (y no varios): dice que **solo existe Él** — que toda la multiplicidad del mundo es una sola Luz vista a través de muchas ventanas. Esto es el corazón de la Cabalá. *Hoy solo lo asomamos*: el pozo es muy hondo, y se baja con cuerda y preparación. Volveremos a él como Javer, como Maguid, como Jajam.`,
      },
    ],
    contemplacion: [
      "Un solo versículo, cuatro profundidades, y todas verdaderas a la vez. Eso es leer la Torá. Y nota: el Sod no contradijo al Pshat — lo **profundizó**. El piso sostiene al pozo.",
    ],
    accion: {
      text: [
        `Esta noche, antes de dormir, di una vez —despacio— *"Shemá Israel, YHVH Elohenu, YHVH Ejad"*, y al decir **Ejad** ("Uno"), respira y recoge tu día disperso en uno. Acabas de hacer Drash con tu propia vida.`,
      ],
    },
    sello:
      "Shemá (Dt 6:4): Pshat = hay un solo Dios; Rémez = Ejad 13 + Ahavá 13 = YHVH 26; Drash = unifícate tú también; Sod (un destello) = solo Él existe. El piso sostiene el pozo: por eso subimos por pasos.",
    hilos: [
      { kind: "study", ref: "26", label: "¿Quieres ver entero por qué Unidad y Amor son el mismo número, y forman el Nombre?" },
      { kind: "letter", ref: "alef", label: "La א es la primera letra de Ejad y de Ahavá — ¿qué esconde su silencio?" },
      { kind: "study", ref: "el-nombre", label: "¿Por qué el Nombre YHVH no se pronuncia?" },
    ],
    fuentes: ["Devarim 6:4 — Shemá ✅", "Ejad 13 · Ahavá 13 · YHVH 26 🔢"],
    closeModule:
      "En seis semanas, un forastero total ya sabe qué es la Torá y el Tanaj, lee una cita, reconoce el alefato, entiende PaRDeS y leyó un versículo en los cuatro niveles. Nunca te soltamos sin rumbo: cada lección dijo cuál era la siguiente piedra. La aurora ya empezó a crecer.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO1 = {
  id: "T1",
  he: "פְּתִיחָה",
  titulo: "La orientación",
  etapaHe: "תַּלְמִיד",
  etapa: "Talmid",
  etapaGloss: "estudiante",
  etapaNum: 1,
  etapasTotal: 6,
  total: LESSONS.length,
  // El verso-norte de la cadencia (Mishlé 4:18 ✅, verificado por el Sofer).
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson(slug: string): Lesson | null {
  return LESSONS.find((l) => l.slug === slug) ?? null;
}
export function lessonIndex(slug: string): number {
  return LESSONS.findIndex((l) => l.slug === slug);
}
export function nextLesson(slug: string): Lesson | null {
  const i = lessonIndex(slug);
  return i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" ────────────────────────────────────────────
// Mapea cada chip a un destino REAL. Tres clases (§8):
//   · lección interna del Módulo 1 (incl. alias de los hooks del Sofer)
//   · activo existente (estudio de letra · misterio publicado)
//   · concepto de un módulo futuro aún no construido → "soon" (teaser, no enlace
//     muerto): mantiene la anticipación sin soltar al alumno en el vacío.

const INTERNAL_SLUGS: Record<string, string> = {
  // slugs directos
  "que-es-la-tora": "que-es-la-tora",
  "que-es-el-tanaj": "que-es-el-tanaj",
  "como-se-lee-una-fuente": "como-se-lee-una-fuente",
  "el-alefato": "el-alefato",
  "que-es-pardes": "que-es-pardes",
  "primera-lectura-cuatro-niveles": "primera-lectura-cuatro-niveles",
  // alias usados por los hooks del Sofer en §5
  tanaj: "que-es-el-tanaj",
  cita: "como-se-lee-una-fuente",
  alefato: "el-alefato",
  pardes: "que-es-pardes",
  "primera-lectura": "primera-lectura-cuatro-niveles",
};

const MISTERIO_SLUGS = new Set(MISTERIOS.map((m) => m.slug));

export type ThreadTarget =
  | { kind: "lesson"; slug: string }
  | { kind: "letter"; ref: string }
  | { kind: "misterio"; slug: string }
  | { kind: "soon" };

export function resolveThread(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS[key]) return { kind: "lesson", slug: INTERNAL_SLUGS[key] };
  if (MISTERIO_SLUGS.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href del destino, o null si todavía es un teaser ("soon").
export function threadHref(t: ThreadTarget): string | null {
  switch (t.kind) {
    case "lesson":
      return `/academia/modulo-1/${t.slug}`;
    case "letter":
      return `/letras/${t.ref}`;
    case "misterio":
      return `/misterio/${t.slug}`;
    default:
      return null;
  }
}
