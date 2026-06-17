// ─────────────────────────────────────────────────────────────────────────
// modulo8.ts — ACADEMIA DE JASHMAL · Módulo 8 (J1 · מוּסָר — "El trabajo del alma: Mesilat Yesharim").
// Las 6 lecciones de las semanas 35–40, primer módulo de JAVER.
//
// El contenido (textos, citas, verificaciones) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - J1 - mussar (Sofer).md", 2026-06-17.
// Se monta TAL CUAL: no se inventa, altera ni agrega ninguna fuente.
//
// Sigue EXACTAMENTE la estructura de modulo7.ts.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView8 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── Las 6 lecciones (verbatim del Sofer, 2026-06-17) ─────────────────────────

export const LESSONS8: Lesson[] = [
  // ── L35 ───────────────────────────────────────────────────────────────────
  {
    n: 35,
    id: "E3·J1·L35",
    slug: "que-es-el-mussar",
    title: "¿Qué es el Mussar? — el trabajo del alma",
    apertura: {
      question:
        "¿Cuál es el deber del hombre en su mundo? El Ramjal tiene una sola respuesta.",
    },
    estudio: [
      {
        t: "p",
        text: `**Bienvenido al grado JAVER.** El nombre de este grado — חָבֵר, *Javer* — significa "compañero de estudio." En TALMID aprendiste a leer; en SHOEL aprendiste a preguntar. En JAVER aprendes a **trabajar**. No con el texto — con el alma. El primer módulo de JAVER se llama מוּסָר (*Mussar*), que viene de la raíz *yasar* (יָסַר — disciplinar, corregir, educar ✅). El Mussar es la tradición judía del trabajo interior: el estudio sistemático de los atributos del alma (*midot*) y su corrección deliberada. No es moralismo externo. No es una lista de reglas de conducta. Es cirugía interior.`,
      },
      {
        t: "p",
        text: `**El Ramjal y la Mesilat Yesharim.** El texto central de este módulo es el **מְסִלַּת יְשָׁרִים** (*Mesilat Yesharim* — "El camino de los rectos"), escrito por Rabbi Moshe Jaim Luzzatto, conocido como el **Ramjal** (רַמְחַ"ל), un cabalista y poeta de Padua que vivió entre 1707 y 1746 ⚠️. La Mesilat Yesharim es uno de los libros de ética judía más leídos de todos los tiempos: en menos de treinta capítulos traza un mapa preciso del trabajo interior — desde la zerizut (diligencia) hasta la kedushah (santidad). El Vilna Gaon, el rabino más influyente del siglo XVIII, dijo de este libro que no encontraba en él una sola palabra superflua ⚠️.`,
      },
      {
        t: "p",
        text: `**La pregunta del primer capítulo.** El Ramjal abre la Mesilat Yesharim con la pregunta más directa que un maestro puede hacer:`,
      },
      {
        t: "verse",
        he: "יְסוֹד הַחֲסִידוּת וְשֹׁרֶשׁ הָעֲבוֹדָה הַתְּמִימָה הוּא שֶׁיִּתְבָּרֵר וְיִתְאַמֵּת אֵצֶל הָאָדָם מַה-חוֹבָתוֹ בְּעוֹלָמוֹ",
        es: "El fundamento de la piedad y la raíz del servicio íntegro es que el hombre clarifique y verdadee ante sí mismo cuál es su deber en su mundo.",
        ref: "Mesilat Yesharim, cap. 1 ✅",
        sefaria: "Mesillat Yesharim, Introduction",
      },
      {
        t: "p",
        text: `La respuesta del Ramjal es igualmente directa: el deber del hombre es perfeccionarse a sí mismo y apegarse a su Creador (*le-hitdabek bo* ✅). No el éxito material, no la acumulación de conocimiento, no el reconocimiento social. La perfección del carácter y la cercanía con Dios. Todo lo demás — el estudio, la plegaria, las buenas obras — son medios para ese fin.`,
      },
      {
        t: "p",
        text: `**Por qué el Mussar en este punto del currículo.** En TALMID leíste el texto; en SHOEL lo interrogaste con los comentaristas. Pero preguntar bien no basta si el que pregunta tiene el alma llena de obstáculos: orgullo que distorsiona lo que lee, pereza que posterga lo que sabe que debe hacer, busca de honra que deforma la intención del estudio. El Mussar es el trabajo que hace que el conocimiento pueda entrar. Avot 2:4 ✅ ya lo había anticipado: *"Anula tu voluntad ante la voluntad de Dios"* — para estudiar la Torá sin contaminarla con el ego, primero hay que trabajar el ego. Miqueas 6:8 ✅ lo resume: *"actuar con justicia, amar la bondad y caminar humildemente con tu Dios."* Tres cosas. Las tres son trabajo del alma.`,
      },
    ],
    contemplacion: [
      "El Ramjal escribió la Mesilat Yesharim en Ámsterdam, en exilio, acusado de herejía por sus contemporáneos. No escribió desde el trono de quien ya llegó — escribió desde el camino. Eso hace que su libro sea honesto de una manera particular: no es la voz del santo que ya llegó, sino la del caminante que conoce el mapa.",
      "¿Cuál es tu deber en tu mundo? El Ramjal no dice 'el deber de todo hombre es idéntico.' Dice que cada uno debe *clarificar y verdadear* esa respuesta ante sí mismo. El trabajo del Mussar empieza aquí: no con una receta, sino con una pregunta honesta.",
    ],
    accion: {
      text: [
        `Busca en Sefaria "Mesillat Yesharim" (también puede aparecer como "Path of the Just"). Lee solo el primer párrafo del cap. 1 en la traducción disponible. Escribe en una línea: ¿cuál es el "deber del hombre en su mundo" según el Ramjal?`,
      ],
      cta: { label: "Abrir Mesilat Yesharim cap. 1 en Sefaria →", ref: "Mesillat Yesharim, Introduction" },
    },
    sello:
      "El Mussar (מוּסָר) es la tradición judía del trabajo interior — corrección deliberada de los atributos del alma. El Ramjal (Rabbi Moshe Jaim Luzzatto, 1707–1746 ⚠️) escribe la Mesilat Yesharim (cap. 1 ✅): el deber del hombre es perfeccionarse y apegarse a Dios (*le-hitdabek bo* ✅). Fuentes: Avot 2:4 ✅, Miqueas 6:8 ✅.",
    hilos: [
      { kind: "study", ref: "cheshbon-ha-nefesh", label: "El Ramjal enseña cómo el alma se engaña a sí misma — el cheshbon ha-nefesh es la herramienta para examinarlo." },
      { kind: "study", ref: "que-es-pardes", label: "PaRDeS y Mussar: ¿cómo se relaciona el trabajo interior con los cuatro niveles de lectura?" },
    ],
    fuentes: [
      "Mesilat Yesharim, cap. 1 ✅ (el deber del hombre en su mundo; le-hitdabek bo)",
      "Avot 2:4 ✅ (anula tu voluntad ante la voluntad de Dios)",
      "Miqueas 6:8 ✅ (actuar con justicia, amar la bondad, caminar humildemente)",
      "Datos biográficos del Ramjal: 1707–1746 ⚠️",
    ],
    tarea: {
      semana: 35,
      herramienta: "Lectura del Mussar: identificar la pregunta fundacional del Ramjal y relacionarla con la propia vida",
      enunciado:
        "Lee Mesilat Yesharim cap. 1 en Sefaria. Escribe la respuesta del Ramjal a '¿cuál es el deber del hombre en su mundo?' con tus propias palabras. ¿Estás de acuerdo con esa respuesta? ¿Por qué? Cita Mesilat Yesharim cap. 1 en tu respuesta.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L36 ───────────────────────────────────────────────────────────────────
  {
    n: 36,
    id: "E3·J1·L36",
    slug: "cheshbon-ha-nefesh",
    title: "El Cheshbon ha-Nefesh — la contabilidad del alma",
    apertura: {
      question:
        "¿Por qué el alma se miente a sí misma? El Ramjal tiene una respuesta incómoda.",
    },
    estudio: [
      {
        t: "p",
        text: `**La práctica central del Mussar.** El **חֶשְׁבּוֹן הַנֶּפֶשׁ** (*cheshbon ha-nefesh* — "contabilidad del alma" ✅) es la práctica de examinarse a uno mismo con honestidad radical, como un mercader examina sus libros al final del día. No con el objetivo de castigarse, sino de ver con precisión: ¿qué ocurrió hoy en el interior del alma? ¿Hubo una postergación que el alma justificó? ¿Un momento de orgullo disfrazado de preocupación por el otro? ¿Una acción correcta hecha por las razones equivocadas?`,
      },
      {
        t: "p",
        text: `**El engaño del alma.** El Ramjal dedica el capítulo 3 de la Mesilat Yesharim ✅ a uno de los fenómenos más difíciles del trabajo interior: el alma que se convence de que no necesita trabajar. No es que el alma diga abiertamente "soy perezosa" — dice cosas como: *"tengo otras prioridades más urgentes"*, *"este no es el momento correcto"*, *"ya soy suficientemente bueno en esto"*, *"hay cosas más importantes en las que enfocarse."* El Ramjal llama a estas racionalizaciones *"las trampas del yetzer"* — el impulso que se disfraza de razonamiento sensato para proteger el status quo del alma.`,
      },
      {
        t: "verse",
        he: "נַחְפְּשָׂה דְרָכֵינוּ וְנַחְקֹרָה וְנָשׁוּבָה עַד-יְהוָה",
        es: "Examinemos y escudriñemos nuestros caminos, y regresemos a YHVH.",
        ref: "Lamentaciones 3:40 ✅",
        sefaria: "Lamentations 3:40",
      },
      {
        t: "p",
        text: `**Cómo se hace el cheshbon ha-nefesh.** El Ramjal no describe una técnica exacta — pero la práctica que la tradición del Mussar desarrollará después de él tiene una estructura sencilla: al final del día, o en un momento de quietud, el estudiante se pregunta: (1) ¿Hubo un momento hoy en que postergué algo que sabía que debía hacer? ¿Cuál fue la excusa que me di? (2) ¿Hubo un momento en que actué correctamente pero por las razones equivocadas — por honra, por imagen, por aprobación? (3) ¿Hubo un momento en que el impulso del enojo, la envidia o el orgullo gobernó mi decisión sin que yo lo notara mientras ocurría? Las respuestas no son para la culpa. Son para la claridad.`,
      },
      {
        t: "p",
        text: `**El pinkas (cuaderno) del Mussar.** La tradición del Mussar que florece en el siglo XIX (con Rav Israel Salanter ⚠️ como fundador del movimiento formal) recomienda llevar un *pinkas* — un cuaderno — donde se registren las observaciones del cheshbon ha-nefesh. Una midá por semana o por mes; registrar las victorias y las derrotas sin dramatismo. En Jashmal este *pinkas* se convierte en las tareas semanales de JAVER: cada tarea es un acto de cheshbon ha-nefesh sobre la lección estudiada esa semana. Ben Zomá (Avot 4:1 ✅) ya había definido la fuerza del alma no como la capacidad de vencer a otros, sino como la de gobernarse a uno mismo.`,
      },
    ],
    contemplacion: [
      "El Mussar no pide perfección inmediata. Pide honestidad. La diferencia entre el que trabaja su alma y el que no es, al comienzo, solo la diferencia entre el que examina y el que no examina. El que ve sus propias trampas ya está en camino.",
      "Lamentaciones 3:40 ✅ dice: 'examinemos y escudriñemos' — dos verbos distintos. *Najpesá* (buscar activamente) y *najkora* (investigar a fondo). El examen del alma tiene dos capas: primero buscar lo que pasó, luego investigar por qué pasó. Ambos son necesarios.",
    ],
    accion: {
      text: [
        `Al final del día de hoy, haz un cheshbon ha-nefesh breve: ¿hubo un momento en que postergaste algo que sabías que debías hacer? ¿Un momento en que actuaste por honra más que por convicción? Escribe un párrafo honesto — no para la culpa, sino para la claridad. Cita Lamentaciones 3:40.`,
      ],
      cta: { label: "Abrir Mesilat Yesharim cap. 3 en Sefaria →", ref: "Mesillat Yesharim 3" },
    },
    sello:
      "Cheshbon ha-nefesh (חֶשְׁבּוֹן הַנֶּפֶשׁ) = contabilidad del alma. Mesilat Yesharim cap. 3 ✅: el alma se engaña con racionalizaciones del yetzer. La práctica: examinarse al final del día sin culpa pero con honestidad. Lamentaciones 3:40 ✅: dos verbos — buscar y escudriñar. Avot 4:1 ✅ (Ben Zomá): la fuerza verdadera es el autodominio.",
    hilos: [
      { kind: "study", ref: "zerizut", label: "El cheshbon ha-nefesh revela la pereza espiritual — la zerizut es la herramienta para combatirla." },
    ],
    fuentes: [
      "Mesilat Yesharim, cap. 3 ✅ (el engaño del alma / trampas del yetzer)",
      "Lamentaciones 3:40 ✅ (examinemos y escudriñemos nuestros caminos)",
      "Avot 4:1 ✅ (Ben Zomá — la fuerza es el autodominio)",
    ],
    tarea: {
      semana: 36,
      herramienta: "Cheshbon ha-nefesh: examen honesto del alma al final del día — identificar una postergación o una acción con motivación impura",
      enunciado:
        "Al final del día de hoy, haz un cheshbon ha-nefesh breve: ¿hubo un momento en que postergaste algo que sabías que debías hacer? ¿Un momento en que actuaste por honra más que por convicción? Escribe 1 párrafo honesto. Cita Lamentaciones 3:40 en tu respuesta.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L37 ───────────────────────────────────────────────────────────────────
  {
    n: 37,
    id: "E3·J1·L37",
    slug: "zerizut",
    title: "Zerizut — la diligencia del alma",
    apertura: {
      question:
        "¿Qué es la pereza espiritual? No es dormir — es postergar lo que ya sabes que tienes que hacer.",
    },
    estudio: [
      {
        t: "p",
        text: `**La primera escalera: zerizut.** **זְרִיזוּת** (*zerizut* — prontitud, diligencia ✅) es la primera madregá (escalera) de la Mesilat Yesharim. El Ramjal le dedica los capítulos 6 y 7 ✅. Zerizut no es velocidad — es ausencia de inercia interior. La definición del Ramjal: hacer lo que se debe hacer en el momento que se debe hacer, sin postergación. El que tiene zerizut no espera a tener "más energía", ni a que el momento sea "más propicio", ni a que desaparezca la incomodidad. Actúa con el alma alerta.`,
      },
      {
        t: "verse",
        he: "לֵךְ אֶל-נְמָלָה עָצֵל רְאֵה דְרָכֶיהָ וַחֲכָם",
        es: "Ve a la hormiga, perezoso; observa sus caminos y sé sabio.",
        ref: "Proverbios 6:6 ✅",
        sefaria: "Proverbs 6:6",
      },
      {
        t: "p",
        text: `**La hormiga como modelo.** Proverbios 6:6–8 ✅ señala a la hormiga: trabaja sin supervisor, sin rey que la obligue, sin inspector que la observe. Su diligencia viene de adentro. El Ramjal usa este ejemplo para la zerizut espiritual: el estudiante de Mussar no necesita que nadie lo vigile para hacer su cheshbon ha-nefesh, para estudiar, para actuar con intención. La vigilancia exterior es un sustituto deficiente de la zerizut interior — el que solo actúa bien cuando alguien lo mira no tiene zerizut; tiene miedo al juicio externo.`,
      },
      {
        t: "p",
        text: `**Zerizut en la preparación y en la ejecución.** El Ramjal (cap. 6 ✅) distingue dos dimensiones: (1) zerizut en la **preparación** — antes del acto, el alma se dispone con cuidado: busca las condiciones, los recursos, el conocimiento necesario; (2) zerizut en la **ejecución** — durante el acto, el alma está presente y no deja que la inercia interrumpa lo que empezó. La postergación ocurre en ambas dimensiones: hay quien no se prepara ("después lo hago"), y hay quien se prepara pero nunca ejecuta ("no es el momento perfecto todavía").`,
      },
      {
        t: "p",
        text: `**La distinción zerizut / prisa / ansiedad.** Una objeción frecuente: ¿no es peligroso actuar siempre rápido? ¿No lleva a errores? El Ramjal la anticipa: la zerizut no es prisa (*jipazón*, חִפָּזוֹן), que es movimiento sin dirección. La zerizut es claridad sobre el valor del acto seguida de acción sin dilación. El que sabe **por qué** debe actuar y actúa sin postergarlo — eso es zerizut. El que actúa sin saber por qué actúa — eso es prisa. La ansiedad es el tercer caso: actúa rápido por miedo a las consecuencias de no actuar, no por amor al acto mismo. Ben Azay (Avot 4:2 ✅) lo había resumido: *"Corre a la mitzvá pequeña"* — corre, pero corre hacia algo que vale.`,
      },
    ],
    contemplacion: [
      "¿Cuántas veces el alma sabe perfectamente qué tiene que hacer y no lo hace? No porque no pueda — porque no quiere enfrentarse al esfuerzo, a la incomodidad, al momento en que el impulso le dice 'después'. La zerizut es la respuesta del alma que trabaja a ese momento exacto.",
      "El Ramjal dice que la zerizut es la primera escalera. No la más difícil, pero sí la más necesaria: sin ella, ninguna otra midá puede crecer. El árbol que no riega sus raíces no crece hacia arriba.",
    ],
    accion: {
      text: [
        `Identifica una tarea en tu vida que llevas postergando. No algo imposible — algo concreto y pequeño que el alma sabe que debe hacerse. Escribe: ¿cuánto tiempo lleva postergada? ¿cuál es la excusa que el alma usa para no hacerla? ¿es esa excusa zerizut o jipazón? Cita Proverbios 6:6.`,
      ],
      cta: { label: "Abrir Mesilat Yesharim cap. 6 en Sefaria →", ref: "Mesillat Yesharim 6" },
    },
    sello:
      "Zerizut (זְרִיזוּת) = primera escalera del Mussar: ausencia de inercia interior. Mesilat Yesharim cap. 6–7 ✅: dos dimensiones — zerizut en la preparación y en la ejecución. Modelo bíblico: la hormiga (Proverbios 6:6–8 ✅). Distinción: zerizut ≠ prisa (jipazón) ≠ ansiedad. Avot 4:2 ✅ (Ben Azay): corre a la mitzvá pequeña.",
    hilos: [
      { kind: "study", ref: "cheshbon-ha-nefesh", label: "El cheshbon ha-nefesh revela cuándo hubo atslut — la zerizut es el remedio." },
      { kind: "study", ref: "nekiut", label: "Después de la zerizut (actuar sin postergación) viene la nekiut (actuar con motivación pura)." },
    ],
    fuentes: [
      "Mesilat Yesharim, cap. 6–7 ✅ (zerizut — definición, dimensiones, adquisición)",
      "Proverbios 6:6–8 ✅ (la hormiga como modelo de zerizut)",
      "Avot 4:2 ✅ (Ben Azay — corre a la mitzvá pequeña)",
    ],
    tarea: {
      semana: 37,
      herramienta: "Zerizut aplicada: identificar una postergación concreta del alma y nombrar la excusa que la sostiene",
      enunciado:
        "Lee Proverbios 6:6–8. Escribe: ¿qué cualidad de la hormiga señala el texto? ¿Cómo defines la diferencia entre zerizut (diligencia espiritual), prisa y ansiedad? Da un ejemplo concreto de cada una desde tu propia experiencia.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L38 ───────────────────────────────────────────────────────────────────
  {
    n: 38,
    id: "E3·J1·L38",
    slug: "nekiut",
    title: "Nekiut — la pureza de la acción",
    apertura: {
      question:
        "¿Es posible hacer el bien por las razones equivocadas? El Ramjal dice que sí, y que es más común de lo que crees.",
    },
    estudio: [
      {
        t: "p",
        text: `**La segunda escalera: nekiut.** **נְקִיּוּת** (*nekiut* — limpieza, pureza ✅) es la segunda madregá de la Mesilat Yesharim. El Ramjal la desarrolla en el capítulo 10 ✅. La nekiut tiene dos dimensiones inseparables: (1) **limpieza del acto** — no hacer lo que está prohibido, no actuar de maneras que dañen a otros o transgredan las normas del servicio a Dios; (2) **limpieza de la intención** (*kavvaná*, כַּוָּנָה) — no mezclar motivaciones impuras en los actos correctos. La segunda dimensión es más difícil que la primera y menos visible desde afuera.`,
      },
      {
        t: "verse",
        he: "מִי-יַעֲלֶה בְהַר-יְהוָה וּמִי-יָקוּם בִּמְקוֹם קָדְשׁוֹ נְקִי כַפַּיִם וּבַר-לֵבָב",
        es: "¿Quién subirá al monte de YHVH? ¿Quién se mantendrá en su lugar santo? El de manos limpias y puro de corazón.",
        ref: "Salmos 24:3–4 ✅",
        sefaria: "Psalms 24:3",
      },
      {
        t: "p",
        text: `**La distinción entre manos y corazón.** Salmos 24:4 ✅ usa dos imágenes: *naki kapayim* (manos limpias) y *bar levav* (puro de corazón). Las manos representan los actos externos; el corazón, las intenciones. El Ramjal enseña que es posible tener manos limpias con un corazón impuro: hacer la acción correcta por las razones equivocadas. El que estuda Torá para impresionar a los demás tiene las manos limpias (está estudiando Torá, que es una mitzvá) pero el corazón no es puro (la motivación es la honra, no el conocimiento). Para el Ramjal, este estado es uno de los más peligrosos porque el alma lo justifica fácilmente.`,
      },
      {
        t: "p",
        text: `**El disfraz del orgullo.** El peligro que el Ramjal señala en el cap. 10 ✅ es que el *yetzer* (el impulso egocéntrico) puede infiltrarse en los actos correctos haciéndose pasar por motivación pura. Ejemplos concretos: el que da tzedaká (caridad) pero que se asegura de que todos sepan que la dio; el que estudia con diligencia pero porque quiere ser reconocido como estudioso; el que ayuda a alguien pero para que ese alguien le quede en deuda. El acto es correcto en cada caso. La intención no lo es. El Mussar enseña que, a largo plazo, un alma llena de actos correctos con intenciones impuras se vuelve incapaz de servir desde adentro.`,
      },
      {
        t: "p",
        text: `**Cómo se trabaja la nekiut.** El Ramjal propone el auto-examen de la intención antes del acto: *¿Para quién hago esto? ¿Para Dios, para el otro, o para mí mismo?* No como un examen paralizante — sino como una herramienta de claridad. Avot 2:1 ✅ (Rabbi Yehudá HaNasí): *"¿Cuál es el camino recto que el hombre debe elegir? El que honra a quien lo hace y le da honor de los hombres."* La señal de un acto con nekiut: honra a quien lo hace desde adentro, no solo desde afuera.`,
      },
    ],
    contemplacion: [
      "La nekiut no es algo que se puede fingir durante mucho tiempo. El alma sabe. El cheshbon ha-nefesh que aprendiste en L36 es la herramienta con la que se trabaja la nekiut: al revisar el día, preguntar no solo '¿qué hice?' sino '¿por qué lo hice?'",
      "Dos preguntas que el Mussar recomienda hacerse antes de un acto importante: ¿'para quién es este acto?' y '¿cómo me sentiría si nadie lo supiera jamás?' Si la respuesta a la segunda incomoda, el corazón no está limpio todavía.",
    ],
    accion: {
      text: [
        `Lee Salmos 24:3–4. Escribe: ¿cuál es la diferencia entre "manos limpias" (naki kapayim) y "puro de corazón" (bar levav)? Da un ejemplo de una acción que puede tener manos limpias pero corazón impuro. Cita Salmos 24:4 en tu respuesta.`,
      ],
      cta: { label: "Abrir Mesilat Yesharim cap. 10 en Sefaria →", ref: "Mesillat Yesharim 10" },
    },
    sello:
      "Nekiut (נְקִיּוּת) = segunda escalera: pureza del acto Y de la intención (kavvaná). Mesilat Yesharim cap. 10 ✅: el yetzer infiltra las intenciones impuras en los actos correctos. Salmos 24:4 ✅: manos limpias (acto) + puro de corazón (intención) — ambas necesarias. Avot 2:1 ✅ (Rabbi Yehudá HaNasí): el camino recto honra desde adentro.",
    hilos: [
      { kind: "study", ref: "zerizut", label: "Zerizut sin nekiut puede producir mucha acción con motivación impura — las dos escaleras trabajan juntas." },
      { kind: "study", ref: "anava", label: "La anavá (humildad) es la midá que cierra el ciclo del orgullo que contamina la nekiut." },
    ],
    fuentes: [
      "Mesilat Yesharim, cap. 10 ✅ (nekiut — limpieza del acto y de la intención)",
      "Salmos 24:3–4 ✅ (manos limpias y puro de corazón)",
      "Avot 2:1 ✅ (Rabbi Yehudá HaNasí — el camino recto)",
    ],
    tarea: {
      semana: 38,
      herramienta: "Nekiut: distinguir entre la limpieza del acto (externo) y la limpieza de la intención (interno)",
      enunciado:
        "Lee Salmos 24:4. Escribe: ¿cuál es la diferencia entre la limpieza del acto (manos) y la limpieza de la intención (corazón)? Da un ejemplo concreto de una acción que puede tener manos limpias pero corazón impuro — no genérico, sino desde tu propia experiencia o imaginación honesta.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L39 ───────────────────────────────────────────────────────────────────
  {
    n: 39,
    id: "E3·J1·L39",
    slug: "anava",
    title: "Anavá — la humildad como suelo",
    apertura: {
      question:
        "La humildad verdadera no es pensar poco de ti mismo — es no pensar en ti mismo.",
    },
    estudio: [
      {
        t: "p",
        text: `**La midá que corona el trabajo.** **עֲנָוָה** (*anavá* — humildad ✅) es una de las midot más mencionadas en la Torá y en la tradición del Mussar — y una de las más malentendidas. El Ramjal la coloca cerca de la cima de la escalera (cap. 22 ✅) porque la humildad verdadera, dice, solo puede adquirirse después de que el alma ya trabajó las midot inferiores. El que practica humildad antes de tener zerizut ni nekiut probablemente está practicando otra cosa: inseguridad, timidez, baja autoestima disfrazada de virtud. La anavá genuina requiere que el alma ya conozca su propio valor.`,
      },
      {
        t: "verse",
        he: "וְהָאִישׁ מֹשֶׁה עָנָו מְאֹד מִכֹּל הָאָדָם אֲשֶׁר עַל-פְּנֵי הָאֲדָמָה",
        es: "Y el hombre Moshé era muy humilde, más que todo hombre sobre la faz de la tierra.",
        ref: "Números 12:3 ✅",
        sefaria: "Numbers 12:3",
      },
      {
        t: "p",
        text: `**El modelo de Moshé.** Números 12:3 ✅ describe a Moshé como el hombre más humilde de la tierra — al mismo tiempo que en el capítulo anterior Moshé confrontó al Faraón, en el anterior recibió la Torá en el Sinaí, y a lo largo del Pentateuco lideró y juzgó a millones. No hay contradicción. La anavá de Moshé no era debilidad: era claridad sobre quién era y quién no era. No necesitaba inflar su rol porque no había nada que demostrar. El humilde no es el que dice "no soy nada" — es el que dice "soy exactamente esto, ni más ni menos."`,
      },
      {
        t: "p",
        text: `**La trampa de la honra (kavod).** El Ramjal (cap. 22 ✅) señala la trampa central de quien trabaja su anavá: el alma que busca ser *reconocida como humilde* ya perdió la anavá. El que actúa humildemente para que los demás digan "qué humilde es" está buscando la honra (*kavod*) a través de la apariencia de la anavá. Esta es, según el Ramjal, una de las formas más refinadas en que el orgullo se disfraza de virtud. El antídoto: Avot 4:1 ✅ — *"¿Quién es honrado? El que honra a los demás."* La atención sale de uno mismo y va hacia el otro. Eso es anavá en acción.`,
      },
      {
        t: "p",
        text: `**La anavá y el estudio.** La conexión entre la anavá y el estudio de Torá es directa en la tradición del Mussar. El que estudia con orgullo no puede recibir lo que el texto tiene para darle — ya llegó con la conclusión antes de leer. El que estudia con anavá puede sorprenderse, ser corregido, cambiar de opinión. En Miqueas 6:8 ✅ — *"actuar con justicia, amar la bondad, y caminar humildemente con tu Dios"* — el *hatzne'a leket* (caminar humildemente) tiene la raíz de *tzniut* (recato, retiro) — el humilde no ocupa todo el espacio. Deja lugar para el texto, para el maestro, para el otro.`,
      },
    ],
    contemplacion: [
      "C.S. Lewis escribió algo cercano a la anavá: 'La humildad no es pensar menos de ti mismo, es pensar menos en ti mismo' ⚠️ (cita de tradición cristiana; se menciona por resonancia, no como fuente del Mussar). El Ramjal lo diría de otra manera: el anav no está ausente — está presente para el otro, no para sí mismo.",
      "La paradoja del estudiante de JAVER: entre más trabaja su anavá genuinamente, menos necesita que otros lo vean trabajando. La práctica es invisible. El resultado, eventualmente, no.",
    ],
    accion: {
      text: [
        `Lee Números 12:3. Escribe: ¿cómo puede Moisés ser el hombre más humilde de la tierra y al mismo tiempo confrontar al Faraón, subir al Sinaí y liderar a millones? ¿Qué idea de la humildad necesitas repensar a partir de este versículo?`,
      ],
      cta: { label: "Abrir Mesilat Yesharim cap. 22 en Sefaria →", ref: "Mesillat Yesharim 22" },
    },
    sello:
      "Anavá (עֲנָוָה) = humildad verdadera. Mesilat Yesharim cap. 22 ✅: la anavá llega tras el trabajo en las midot inferiores; la 'humildad' prematura es inseguridad. Moshé = modelo bíblico (Números 12:3 ✅): el más humilde y el mayor líder — sin contradicción. La trampa: buscar ser reconocido como humilde es orgullo disfrazado. Avot 4:1 ✅: el honrado es el que honra a los demás.",
    hilos: [
      { kind: "study", ref: "nekiut", label: "La nekiut limpia las motivaciones — la anavá es lo que queda cuando el orgullo ya no contamina." },
      { kind: "study", ref: "escalera-del-alma", label: "La anavá es la sexta de las diez escaleras — en L40 verás el mapa completo." },
    ],
    fuentes: [
      "Mesilat Yesharim, cap. 22 ✅ (anavá — definición, trampa del kavod, adquisición)",
      "Números 12:3 ✅ (Moshé — el hombre más humilde de la tierra)",
      "Avot 4:1 ✅ (Ben Zomá — el honrado es el que honra a los demás)",
      "Miqueas 6:8 ✅ (caminar humildemente — hatzne'a leket)",
    ],
    tarea: {
      semana: 39,
      herramienta: "Anavá: repensar la humildad como claridad sobre uno mismo — no como negación del propio valor",
      enunciado:
        "Lee Números 12:3 (Moisés, el más humilde). Escribe: ¿cómo puede ser Moisés el hombre más humilde y al mismo tiempo confrontar al Faraón, subir al Sinaí y liderar a millones? ¿Qué idea de la humildad te exige repensar este versículo? Menciona explícitamente la distinción entre humildad verdadera e inseguridad.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L40 ───────────────────────────────────────────────────────────────────
  {
    n: 40,
    id: "E3·J1·L40",
    slug: "escalera-del-alma",
    title: "La escalera del alma — el mapa completo de la Mesilat Yesharim",
    apertura: {
      question:
        "Diez escaleras entre donde estás y donde puedes llegar. ¿En cuál estás?",
    },
    estudio: [
      {
        t: "p",
        text: `**El mapa completo.** En las cinco lecciones anteriores conociste tres escaleras del Mussar: zerizut (diligencia), nekiut (pureza de acción) y anavá (humildad). Ahora el Ramjal te muestra el mapa completo. En el capítulo 1 de la Mesilat Yesharim ✅, lista las diez madregot (escaleras) del camino del alma, en este orden exacto:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**1. זְרִיזוּת** (*Zerizut* — diligencia): actuar sin inercia interior, en el momento correcto.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**2. נְקִיּוּת** (*Nekiut* — limpieza): pureza del acto y de la intención.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**3. פְּרִישׁוּת** (*Perishut* — separación): alejarse de lo que, aunque no esté prohibido, no eleva el alma.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**4. טָהֳרָה** (*Tahará* — pureza interior): la limpieza del alma en sus capas más profundas, incluyendo los pensamientos.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**5. חֲסִידוּת** (*Jasidut* — piedad intensa): ir más allá de la letra de la ley por amor, no por obligación.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**6. עֲנָוָה** (*Anavá* — humildad): claridad sobre el propio lugar, sin inflación ni reducción.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**7. יִרְאַת חֵטְא** (*Yirat jet* — temor al pecado): no el miedo al castigo sino la aversión genuina al acto que separa del bien.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**8. קְדֻשָּׁה** (*Kedushah* — santidad): el estado en que toda acción del alma, incluso las mundanas, opera desde la conciencia de lo sagrado.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**9. רוּחַ הַקֹּדֶשׁ** (*Ruaj ha-kodesh* — espíritu de santidad): el nivel profético, que el Ramjal describe como resultado —no objetivo— del trabajo interior completo.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**10. תְּחִיַּת הַמֵּתִים** (*Tehiyat ha-metim* — resurrección de los muertos): el Ramjal incluye esto como el nivel final, escatológico, que ya no pertenece al esfuerzo humano sino a la gracia divina.`,
      },
      {
        t: "p",
        text: `**La escalera y el PaRDeS.** Las diez madregot no están desconectadas del método de estudio que aprendiste. Hay una correspondencia que el estudiante de JAVER puede intuir: zerizut y nekiut corresponden al nivel del Pshat (el trabajo con lo concreto y visible); perishut, tahará y jasidut al Remez y el Drash (el refinamiento de capas más profundas del alma); anavá y yirat jet al Drash aplicado al carácter; kedushah y ruaj ha-kodesh al Sod (lo que ya no puede forzarse sino solo prepararse). No es una correspondencia fija ni obligatoria — pero el mapa del Mussar y el mapa del PaRDeS hablan el mismo idioma.`,
      },
      {
        t: "verse",
        he: "הֲפֹךְ בָּהּ וַהֲפֹךְ בָּהּ דְּכֹלָּא בָהּ",
        es: "Vuélvela y vuélvela [a la Torá], pues todo está en ella.",
        ref: "Pirké Avot 5:22 ✅",
        sefaria: "Pirkei Avot 5:22",
      },
      {
        t: "p",
        text: `**El trabajo de un año, el trabajo de toda la vida.** Ben Bag Bag (Avot 5:22 ✅) dice: vuélvela y vuélvela. El trabajo del Mussar funciona igual: no se hace una vez. La escalera no se sube en seis semanas. Se trabaja una madregá, se avanza, se resbala, se vuelve a trabajar. J1 termina aquí — con el mapa en las manos y tres escaleras caminadas. Las otras siete esperan, y las primeras tres ya no son lo mismo después de haberlas vivido.`,
      },
    ],
    contemplacion: [
      "Isaías 6:3 ✅: los serafines cantan '*kadosh, kadosh, kadosh*' (santo, santo, santo). El Ramjal coloca la kedushah en la octava escalera — no en la primera. La santidad no se impone; se alcanza. El trabajo de las siete escaleras anteriores es lo que hace que la kedushah pueda enraizarse en el alma.",
      "El mapa completo no está aquí para abrumarte — está para orientarte. No tienes que estar en la décima escalera. Tienes que saber en cuál estás, por qué y hacia dónde vas.",
    ],
    accion: {
      text: [
        `Dibuja (en palabras) la escalera completa de la Mesilat Yesharim — las 10 escaleras, en orden. Para cada una escribe una frase que describa qué hace el alma en ese peldaño. Puedes consultar el cap. 1 de Mesilat Yesharim en Sefaria. Luego escribe: ¿en cuál madregá sientes que el alma trabaja más actualmente?`,
      ],
      cta: { label: "Abrir Mesilat Yesharim cap. 1 en Sefaria →", ref: "Mesillat Yesharim, Introduction" },
    },
    sello:
      "Las 10 madregot de la Mesilat Yesharim (cap. 1 ✅): zerizut, nekiut, perishut, tahará, jasidut, anavá, yirat jet, kedushah, ruaj ha-kodesh, tehiyat ha-metim. Correspondencia con PaRDeS: Pshat (zerizut/nekiut), Remez-Drash (perishut–jasidut), Sod (kedushah–ruaj ha-kodesh). Avot 5:22 ✅ (Ben Bag Bag): el trabajo no termina — se vuelve y se vuelve.",
    hilos: [
      { kind: "study", ref: "que-es-el-mussar", label: "Volviste al principio con el mapa completo — ¿qué ves ahora que no veías en L35?" },
      { kind: "study", ref: "ibn-ezra", label: "La lectura profunda de J2 empieza en la próxima lección. El Mussar preparó el alma — ahora la mente sigue." },
    ],
    fuentes: [
      "Mesilat Yesharim, cap. 1 ✅ (las diez madregot en orden exacto)",
      "Avot 5:22 ✅ (Ben Bag Bag — vuélvela y vuélvela)",
      "Isaías 6:3 ✅ (kadosh, kadosh, kadosh — la kedushah como canto)",
    ],
    tarea: {
      semana: 40,
      herramienta: "Síntesis del Mussar: el mapa completo de las 10 madregot y la auto-ubicación honesta en la escalera",
      enunciado:
        "Dibuja (en palabras) la escalera completa de la Mesilat Yesharim — las 10 escaleras en orden. Para cada una escribe una frase que describa qué hace el alma en ese peldaño. Consulta el cap. 1 en Sefaria. Luego escribe: ¿en cuál madregá sientes que el alma trabaja actualmente? ¿Cómo lo sabes?",
      palabrasMin: 200,
      palabrasMax: 400,
    },
    closeModule:
      "Terminaste el primer módulo de JAVER. En seis semanas entraste al trabajo del alma: conociste el Mussar como tradición, aprendiste el cheshbon ha-nefesh como práctica diaria, y caminaste tres de las diez escaleras de la Mesilat Yesharim — zerizut (diligencia), nekiut (pureza de acción) y anavá (humildad). Ahora tienes el mapa completo de las diez madregot. El trabajo del Mussar no termina aquí — sigue en silencio, en el pinkas del alma, en el examen de cada día. Pero el módulo J2 te espera con un desafío diferente: leer en profundidad. Conocerás a Ibn Ezra y al Ramban — dos maestros que leyeron el mismo texto y vieron cosas completamente distintas. El alma que trabajó el Mussar puede leerlos sin orgullo: lista para ser sorprendida, lista para ser corregida. כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר — la luz sigue creciendo.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO8 = {
  id: "J1",
  he: "מוּסָר",
  titulo: "El trabajo del alma: Mesilat Yesharim",
  etapaHe: "חָבֵר",
  etapa: "Javer",
  etapaGloss: "el compañero de estudio",
  etapaNum: 3,
  etapasTotal: 6,
  total: LESSONS8.length,
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson8(slug: string): Lesson | undefined {
  return LESSONS8.find((l) => l.slug === slug);
}

export function lessonIndex8(slug: string): number {
  return LESSONS8.findIndex((l) => l.slug === slug);
}

export function nextLesson8(slug: string): Lesson | null {
  const i = lessonIndex8(slug);
  return i >= 0 && i < LESSONS8.length - 1 ? LESSONS8[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 8 ──────────────────────────────
// Slugs internos del Módulo 8.
const INTERNAL_SLUGS8: Record<string, string> = {
  "que-es-el-mussar": "que-es-el-mussar",
  "cheshbon-ha-nefesh": "cheshbon-ha-nefesh",
  "zerizut": "zerizut",
  "nekiut": "nekiut",
  "anava": "anava",
  "escalera-del-alma": "escalera-del-alma",
};

// Slugs de módulos anteriores que deben resolver a sus rutas propias.
const CROSS_MODULE_HREFS8: Record<string, string> = {
  "que-es-pardes": "/academia/modulo-1/que-es-pardes",
  "palabras-ancla": "/academia/modulo-2/palabras-ancra",
  "lej-leja-avraham": "/academia/modulo-3/lej-leja-avraham",
  "los-siete-dias": "/academia/modulo-3/los-siete-dias",
  "el-jardin-adam-java": "/academia/modulo-3/el-jardin-adam-java",
  "noaj-y-el-arco": "/academia/modulo-3/noaj-y-el-arco",
  "quien-fue-rashi": "/academia/modulo-4/quien-fue-rashi",
  "el-metodo-de-rashi": "/academia/modulo-4/el-metodo-de-rashi",
  "rashi-bereshit": "/academia/modulo-4/rashi-bereshit",
  "rashi-pshat-drash": "/academia/modulo-4/rashi-pshat-drash",
  "lectura-dos-voces": "/academia/modulo-4/lectura-dos-voces",
  "tres-pilares": "/academia/modulo-5/tres-pilares",
  "cadena-zugot": "/academia/modulo-5/cadena-zugot",
  "hilel-regla-de-oro": "/academia/modulo-5/hilel-regla-de-oro",
  "cuatro-pardes": "/academia/modulo-5/cuatro-pardes",
  "ben-zoma": "/academia/modulo-5/ben-zoma",
  "kinyan-torah": "/academia/modulo-5/kinyan-torah",
  "las-tres-columnas": "/academia/modulo-5/tres-pilares",
  "tora-oral": "/academia/modulo-6/tora-oral",
  "la-mishna": "/academia/modulo-6/la-mishna",
  "pagina-talmud": "/academia/modulo-6/pagina-talmud",
  "primera-mishna": "/academia/modulo-6/primera-mishna",
  "horno-ajnai": "/academia/modulo-6/horno-ajnai",
  "que-es-un-profeta": "/academia/modulo-7/que-es-un-profeta",
  "amos-profeta-social": "/academia/modulo-7/amos-profeta-social",
};

const MISTERIO_SLUGS8 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread8(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS8[key]) return { kind: "lesson", slug: INTERNAL_SLUGS8[key] };
  if (MISTERIO_SLUGS8.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href completo para M8 — incluye cross-module overrides.
export function resolveThreadHref8(h: Hilo): string | null {
  if (h.kind === "letter") return `/letras/${h.ref}`;
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS8[key]) return `/academia/modulo-8/${key}`;
  if (CROSS_MODULE_HREFS8[key]) return CROSS_MODULE_HREFS8[key];
  if (MISTERIO_SLUGS8.has(key)) return `/misterio/${key}`;
  return null;
}
