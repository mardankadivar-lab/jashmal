// ─────────────────────────────────────────────────────────────────────────
// modulo6.ts — ACADEMIA DE JASHMAL · Módulo 6 (S3 · תּוֹרָה שֶׁבְּעַל פֶּה — "La Torá oral").
// Las 5 lecciones de las semanas 28–32, tercer módulo de SHOEL.
//
// El contenido (textos, citas, verificaciones) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - S3 - tora-oral (Sofer).md", 2026-06-17.
// Se monta TAL CUAL: no se inventa, altera ni agrega ninguna fuente.
//
// Sigue EXACTAMENTE la estructura de modulo5.ts.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView6 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── Las 5 lecciones (verbatim del Sofer, 2026-06-17) ─────────────────────────

export const LESSONS6: Lesson[] = [
  // ── L28 ───────────────────────────────────────────────────────────────────
  {
    n: 28,
    id: "E2·S3·L28",
    slug: "tora-oral",
    title: "¿Qué es la Torá oral? — la tradición que no se escribió",
    apertura: {
      question:
        "Moisés recibió dos Torás en el Sinaí. ¿Por qué una tardó más de mil años en escribirse?",
    },
    estudio: [
      {
        t: "p",
        text: `**El secreto mejor guardado del judaísmo.** Cuando Dios le entregó la Torá a Moshé en el Sinaí, no solo le entregó un libro. Le entregó un libro más todas las explicaciones necesarias para entenderlo — las dimensiones del altar, la medida exacta de las porciones rituales, el procedimiento del divorcio, los límites del Shabat, las reglas de préstamo y daño que el texto apenas menciona. Sin esas explicaciones, el texto escrito es incompleto: dice *"y lo hiciste así"* sin decirte cómo. Esas explicaciones viajaron de maestro a discípulo durante siglos sin escribirse. A eso llamamos **תּוֹרָה שֶׁבְּעַל פֶּה** (*Torá shebe'al pe*, "Torá que está en la boca") — la Torá oral.`,
      },
      {
        t: "p",
        text: `**La cadena que ya conoces.** En L1 de TALMID aprendiste la primera mishná de Pirké Avot:`,
      },
      {
        t: "verse",
        he: "מֹשֶׁה קִבֵּל תּוֹרָה מִסִּינַי וּמְסָרָהּ לִיהוֹשֻׁעַ, וִיהוֹשֻׁעַ לַזְּקֵנִים, וּזְקֵנִים לַנְּבִיאִים, וּנְבִיאִים מְסָרוּהָ לְאַנְשֵׁי כְנֶסֶת הַגְּדוֹלָה",
        es: "Moshé recibió la Torá del Sinaí y la transmitió a Yehoshúa, y Yehoshúa a los Ancianos, y los Ancianos a los Profetas, y los Profetas la transmitieron a los Hombres de la Gran Asamblea.",
        ref: "Pirké Avot 1:1 ✅",
        sefaria: "Pirkei Avot 1:1",
      },
      {
        t: "p",
        text: `La palabra clave es **מְסָרָהּ** (*mesará*, "la transmitió"). No solo la Torá escrita pasó de mano en mano: la explicación oral también viajó en esa cadena. Cuando Moshé enseñó a Yehoshúa, no solo le leyó el texto — le explicó cómo entenderlo. Esa explicación es la Torá oral. Y ese verbo — *masar*, transmitir de mano en mano — es la raíz de toda la tradición: **מָסוֹרֶת** (*masóret*, "tradición") viene de la misma raíz.`,
      },
      {
        t: "p",
        text: `**¿Por qué no se escribió desde el principio?** La razón no es solo práctica — es teológica y política. El Talmud en Shemot/Éxodo 34:27 registra el mandato divino: *"כְּתָב לְךָ אֶת הַדְּבָרִים הָאֵלֶּה, כִּי עַל פִּי הַדְּבָרִים הָאֵלֶּה כָּרַתִּי אִתְּךָ בְּרִית"* ✅ — "Escribe ESTAS palabras, pues **según estas palabras** hice pacto contigo." El Midrash lee el énfasis: *estas* palabras se escriben, no las orales. La razón que da la tradición: si la Torá oral se hubiera escrito desde el principio, las naciones del mundo podrían reclamarla como suya — como reclamaron la escrita ⚠️. La Torá oral es el sello de la alianza particular entre Dios y el pueblo de Israel; su oralidad la protege de la apropiación.`,
      },
      {
        t: "verse",
        he: "כְּתָב לְךָ אֶת הַדְּבָרִים הָאֵלֶּה, כִּי עַל פִּי הַדְּבָרִים הָאֵלֶּה כָּרַתִּי אִתְּךָ בְּרִית",
        es: "Escribe para ti estas palabras, pues según estas palabras hice pacto contigo.",
        ref: "Shemot / Éxodo 34:27 ✅",
        sefaria: "Exodus 34:27",
      },
      {
        t: "p",
        text: `**La prohibición formal y su ruptura.** El Talmud en **Gittin 60b** ✅ registra la regla: *"las palabras de la Torá oral, no está permitido decirlas por escrito."* Es una regla normativa, no solo una costumbre. Y sin embargo, hacia el año 200 de la era común, Rabbi Yehudá HaNasí la rompió — porque vio que la cadena oral estaba en peligro de romperse ⚠️. El principio que lo autorizó: *"Tiempo de actuar por el Señor — han violado tu Torá"* (Tehilim 119:126 ✅). Cuando la supervivencia de la tradición lo exige, se puede romper la regla para salvar la Torá misma.`,
      },
      {
        t: "p",
        text: `**Qué es la Torá oral, en positivo.** La Torá oral no es solo un comentario al texto escrito — es el **sistema vivo de interpretación** que hace que el texto funcione en cada generación y contexto. Es la arquitectura jurídica que convierte los principios del Sinaí en leyes aplicables: cómo celebrar el Shabat, cómo hacer el divorcio conforme a la ley, cómo juzgar un caso de daños. Pero también es la dimensión **relacional** de la Torá: la conversación entre generaciones de maestros y discípulos, donde cada generación añade su comprensión sin traicionar el texto. La Torá oral es la Torá escrita *viva* — en la boca, en la práctica, en el debate.`,
      },
      {
        t: "p",
        text: `**Por qué esto importa ahora.** En los módulos S1 y S2 estudiaste a Rashi y la ética de Pirké Avot. Rashi *es* la Torá oral: su comentario es la explicación que hace que el texto bíblico sea legible. Pirké Avot *es* la Torá oral: enseñanzas éticas transmitidas de generación en generación que no están en el Pentateuco. Todo lo que has estudiado hasta aquí *es* la Torá oral en acción. Ahora le ponemos nombre a esa arquitectura.`,
      },
    ],
    contemplacion: [
      "La Torá oral fue oral durante más de mil años antes de escribirse. Eso quiere decir que dependía completamente de personas — de relaciones entre maestro y discípulo. No había respaldo en ningún servidor, ninguna copia de seguridad. Solo la voz humana y la memoria. ¿Qué dice eso sobre el valor que la tradición le asigna a la relación en el estudio?",
      "Hoy puedes abrir Sefaria y leer la Mishná en segundos. Eso solo fue posible porque alguien — Rabbi Yehudá HaNasí — tomó la decisión de romper la regla para salvar la tradición. A veces proteger algo exige cambiar la manera en que lo proteges.",
    ],
    accion: {
      text: [
        `Abre Sefaria y busca "Gittin 60b" (puedes escribirlo directamente en el buscador). Lee las primeras líneas donde aparece el debate sobre escribir la Torá oral. ¿Qué dice el Talmud sobre la prohibición? ¿Qué versículo invoca para justificar la excepción? Escribe en una línea lo que encontraste.`,
      ],
      cta: { label: "Abrir Gittin 60b en Sefaria →", ref: "Gittin 60b" },
    },
    sello:
      "La Torá oral (*Torá shebe'al pe*) es el sistema de explicaciones y tradiciones que viajaron junto a la Torá escrita de maestro a discípulo desde el Sinaí ✅ (Avot 1:1). La base de su oralidad: Éxodo 34:27 ✅ (*'estas palabras' se escriben, no las orales*). La prohibición formal de escribirla: Gittin 60b ✅. La licencia para hacerlo cuando la tradición está en peligro: Tehilim 119:126 ✅. La oralidad no es una falla de transmisión: es la relación viva entre texto y pueblo.",
    hilos: [
      { kind: "study", ref: "la-mishna", label: "La Torá oral se escribió en un libro preciso — ¿cómo está organizado ese libro de mil años de tradición?" },
      { kind: "study", ref: "la-cadena-de-transmision", label: "La cadena de Avot 1:1 ahora tiene más peso: no solo pasó la Torá escrita, pasó la oral entera." },
    ],
    fuentes: [
      "Pirké Avot 1:1 ✅ (Moshé recibió la Torá del Sinaí — incluye la oral)",
      "Shemot / Éxodo 34:27 ✅ ('estas palabras' se escriben — base del Midrash sobre la oralidad)",
      "Gittin 60b ✅ (prohibición de escribir la Torá oral; la excepción por emergencia)",
      "Tehilim / Salmos 119:126 ✅ ('tiempo de actuar por el Señor — han violado tu Torá' — fundamento de la codificación)",
      "La razón de la oralidad vs. las naciones: tradición talmúdica ⚠️ (citada en Tanjumá y literatura midrásica; no tiene folio único canónico)",
    ],
    tarea: {
      semana: 28,
      herramienta: "Comprensión del principio de oralidad y su excepción de emergencia",
      enunciado:
        'Lee Gittin 60b en Sefaria (busca "Gittin 60b" y localiza el debate sobre la escritura de la Torá oral). Escribe: (1) ¿qué dice ese folio sobre escribir la Torá oral — está permitido o prohibido? ¿por qué? (2) ¿qué versículo invoca el Talmud para justificar la excepción que permitió compilarla? (3) ¿qué cambió para que Rabbi Yehudá HaNasí pudiera codificarla — qué principio usó para romper la regla? (200–400 palabras.)',
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L29 ───────────────────────────────────────────────────────────────────
  {
    n: 29,
    id: "E2·S3·L29",
    slug: "la-mishna",
    title: "La Mishná — cómo se organiza mil años de tradición",
    apertura: {
      question:
        "¿Cómo se organiza mil años de tradición oral en un solo libro?",
    },
    estudio: [
      {
        t: "p",
        text: `**Qué es la Mishná.** La palabra **מִשְׁנָה** (*Mishná*) viene de la raíz שׁ-נ-ה, que significa a la vez "repetir/estudiar" y "segundo" ⚠️. Es decir: la Mishná es la *segunda* Torá — la oral — y también el libro que se estudia *repasando*, que es cómo se aprendía la tradición oral: repitiendo de maestro a discípulo. Rabbi Yehudá HaNasí (יְהוּדָה הַנָּשִׂיא, "Yehudá el Príncipe"), llamado simplemente "Rabbi" en el Talmud, compiló y editó la Mishná alrededor del año 200 de la era común ⚠️. No la inventó: organizó y seleccionó lo que llevaba siglos transmitiéndose oralmente. Tomó decisiones editoriales, incluyó debates que no se resolvían y excluyó material que no consideró central. El resultado es el texto fundacional de todo el judaísmo rabínico.`,
      },
      {
        t: "p",
        text: `**La arquitectura: de lo más general a lo más particular.** La Mishná tiene una estructura de cuatro niveles que es uno de los sistemas de clasificación jurídica más elegantes de la historia:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**6 Sedarim (סְדָרִים, "órdenes")** — las seis grandes áreas temáticas. Como los seis capítulos de un código legal.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**63 Masejot (מַסֶּכְתּוֹת, "tratados")** — dentro de cada orden, varios tratados especializados. La palabra *masejt* significa literalmente "tejido" — cada tratado es un tejido de leyes relacionadas.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Perakim (פְּרָקִים, "capítulos")** — cada tratado se divide en capítulos.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Mishnayot (מִשְׁנָיּוֹת, "mishnas")** — la unidad mínima: una ley o debate específico, a veces de pocas líneas, a veces de un párrafo. La "mishná" individual es el ladrillo de todo el edificio.`,
      },
      {
        t: "p",
        text: `**Los seis órdenes — el mapa completo.** Memorizar los seis órdenes es la primera herramienta de orientación en la tradición rabínica. Cada uno cubre un área de la vida:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**זְרָעִים** (*Zeraim*, "Semillas") — 11 tratados. Leyes agrícolas: ofrendas, primicias, la obligación de dejar frutos para los pobres (*leket*, *shijejá*, *pe'a*), los diezmos, el año sabático. Curiosamente, el primer tratado de Zeraim es **Berakhot** — bendiciones y oraciones — porque la vida agrícola comienza con la plegaria y el reconocimiento de la fuente de todo fruto.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**מוֹעֵד** (*Moed*, "Festividades") — 12 tratados. El Shabat, Pésaj, Sucot, Rosh Hashaná, Yom Kipur, los días intermedios, los ayunos públicos. El tiempo sagrado estructurado.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**נָשִׁים** (*Nashim*, "Mujeres") — 7 tratados. El matrimonio, el divorcio (*guet*), la ley del levirato (*yibbum*), los votos. El derecho de familia.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**נְזִיקִין** (*Nezikin*, "Daños") — 10 tratados. El derecho civil y penal: daños a la propiedad, robos, contratos, tribunales, penas corporales, la idolatría, Pirké Avot (que vive dentro de este orden, como ética del sistema judicial). El tratado más conocido: Bava Kamma, Bava Metzia, Bava Batra (las "tres puertas").`,
      },
      {
        t: "p",
        tone: "item",
        text: `**קֳדָשִׁים** (*Kodashim*, "Cosas sagradas") — 11 tratados. Los sacrificios, las leyes del Templo, las primicias animales, el sacrificio de Pésaj. Muchas de estas leyes son teóricas desde la destrucción del Segundo Templo (70 EC), pero se estudian.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**טְהָרוֹת** (*Taharot*, "Purezas") — 12 tratados. La pureza e impureza ritual: qué contamina, cómo se purifica, las leyes de *nidá*, el *mikvé*. El orden más técnico y el que tiene el único tratado para el que no existe Guemará en el Talmud Bavlí (casi todo Taharot).`,
      },
      {
        t: "p",
        text: `**La primera mishná de toda la Mishná.** El primer tratado de la Mishná es Berakhot (Bendiciones). Su primera mishná ✅ es la primera pregunta de todo el Talmud: *¿desde cuándo se lee el Shemá por la noche?* Empieza con una sola palabra: **מֵאֵימָתַי** (*me'ematay*, "¿desde cuándo?"). Esa pregunta — ¿desde cuándo? — es el espíritu de toda la Mishná: no "qué dice la Torá" en abstracto, sino "¿desde cuándo, hasta cuándo, cómo, quién, dónde?" La Mishná convierte el principio en práctica, y la práctica en pregunta.`,
      },
      {
        t: "verse",
        he: "מֵאֵימָתַי קוֹרִין אֶת שְׁמַע בְּעַרְבִית",
        es: "¿Desde cuándo se lee el Shemá por la noche?",
        ref: "Mishná Berakhot 1:1 ✅",
        sefaria: "Mishnah Berakhot 1:1",
      },
      {
        t: "p",
        text: `**Por qué la Mishná sigue siendo el texto.** Hoy, más de 1.800 años después de su compilación, la Mishná sigue siendo el texto central de estudio en todas las academias judías del mundo. Millones de personas estudian el ciclo anual del Daf Yomi (una página del Talmud por día) ⚠️ — y ese ciclo existe porque la Mishná existe. La Mishná es el andamiaje sobre el que se construye todo el Talmud, y el Talmud es el andamiaje sobre el que se construye toda la halajá posterior. Cuando Rabbi Yehudá HaNasí rompió la regla y escribió la Torá oral, no solo salvó el pasado: creó la plataforma del futuro.`,
      },
    ],
    contemplacion: [
      "El orden Kodashim trata de los sacrificios del Templo, destruido hace casi dos mil años. Y sin embargo se estudia con el mismo rigor que las leyes de Shabat que se practican cada semana. La tradición judía estudia lo que ya no existe porque cree que el estudio mismo es un acto que mantiene algo vivo. ¿Qué dice eso sobre la relación entre el texto y el tiempo?",
      "Seis palabras en hebreo — los seis órdenes de la Mishná — son la arquitectura de toda una civilización jurídica y espiritual. Zeraim, Moed, Nashim, Nezikin, Kodashim, Taharot. Cuando las dices en orden, estás nombrando la estructura del mundo tal como el judaísmo lo entendió.",
    ],
    accion: {
      text: [
        `Abre Sefaria y busca "Mishnah Berakhot" (en el buscador, escribe "Mishnah Berakhot 1"). Mira el índice: ¿cuántos capítulos tiene el tratado Berakhot? Luego navega a la raíz de los seis órdenes y escribe sus seis nombres. ¿Cuál te parece más sorprendente y por qué?`,
      ],
      cta: { label: "Abrir Mishná Berakhot en Sefaria →", ref: "Mishnah Berakhot" },
    },
    sello:
      "La Mishná (*Mishná* = 'repetición/segunda [Torá]' ⚠️) es la primera codificación escrita de la Torá oral, compilada por Rabbi Yehudá HaNasí c. 200 EC ⚠️. Estructura: 6 órdenes (Sedarim) → 63 tratados (Masejot) → capítulos (Perakim) → mishnayot. Los 6 órdenes: Zeraim, Moed, Nashim, Nezikin, Kodashim, Taharot ✅. Primera mishná: Berakhot 1:1 ✅ — *me'ematay* ('¿desde cuándo?'). La primera pregunta de todo el Talmud: no qué, sino ¿desde cuándo?",
    hilos: [
      { kind: "study", ref: "pagina-talmud", label: "La Mishná es el centro de una página más compleja — el Talmud. ¿Cómo está organizada esa página?" },
      { kind: "study", ref: "primera-mishna", label: "La primera mishná de la historia: Berakhot 1:1 en tres niveles." },
    ],
    fuentes: [
      "Mishná Berakhot 1:1 ✅ (me'ematay — la primera palabra de todo el Talmud)",
      "Bava Metzia 33a ✅ (el honor especial del maestro de Mishná)",
      "Pirké Avot 1:1 ✅ (la cadena de transmisión que desemboca en la Mishná)",
      "Compilación de Rabbi Yehudá HaNasí c. 200 EC ⚠️ (consenso académico; sin fecha talmúdica exacta)",
      "Etimología de Mishná: raíz shin-nun-he = 'repetir' / 'segundo' ⚠️ (consenso de comentaristas clásicos)",
    ],
    tarea: {
      semana: 29,
      herramienta: "Orientación en la arquitectura de la Mishná; nomenclatura básica del corpus talmúdico",
      enunciado:
        'Abre Sefaria, busca "Mishnah Berakhot" y mira el índice general de la Mishná. Escribe los 6 órdenes de la Mishná con sus nombres en hebreo y su tema principal. ¿Cuál te parece más sorprendente y por qué? (No hay respuesta incorrecta — el objetivo es que reflexiones sobre la cobertura temática de la Mishná.) (200–400 palabras.)',
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L30 ───────────────────────────────────────────────────────────────────
  {
    n: 30,
    id: "E2·S3·L30",
    slug: "pagina-talmud",
    title: "La página del Talmud — cinco siglos hablando al mismo tiempo",
    apertura: {
      question:
        "Una página del Talmud tiene voces de cinco siglos hablando al mismo tiempo. ¿Cómo se lee eso?",
    },
    estudio: [
      {
        t: "p",
        text: `**Qué es el Talmud.** La Mishná fue escrita, pero el debate sobre ella continuó. Durante los siglos III al V, los maestros de Babilonia y de la tierra de Israel estudiaron, discutieron y expandieron cada mishná. Esas discusiones fueron a su vez recopiladas: el resultado es el **Talmud** (תַּלְמוּד, "estudio/enseñanza" — de la raíz ל-מ-ד, *lamad*, aprender). Hay dos Talmudes: el **Bavlí** (בַּבְלִי, "babilónico"), compilado en Babilonia alrededor del siglo V de la era común ⚠️, y el **Yerushalmí** (יְרוּשַׁלְמִי, "de Jerusalén"), compilado antes pero considerado menos definitivo por la tradición. Cuando alguien dice simplemente "el Talmud", se refiere al Bavlí.`,
      },
      {
        t: "p",
        text: `**La página del Talmud: una conversación material.** La página característica del Talmud Bavlí — el **דַּף** (*daf*, "hoja") — no es una página normal. Es una **arquitectura de conversación** donde generaciones de maestros se hablan a través del espacio de la página. En el centro: la Mishná (el texto que se discute). Bajo ella, en arameo hebraizado: la **Guemará** (גְּמָרָא, "completar/estudiar" ⚠️ — la discusión de los amora'im sobre la mishná). A los lados: los comentaristas medievales. Este diseño se estabilizó con la imprenta veneciana de Daniel Bomberg en el siglo XVI ⚠️ y se mantiene intacto hasta hoy — lo que significa que cuando abres una edición moderna del Talmud, ves exactamente la misma disposición de página que veían los rabinos en Venecia hace quinientos años.`,
      },
      {
        t: "p",
        text: `**Los elementos de la página, uno por uno:**`,
      },
      {
        t: "p",
        tone: "item",
        text: `**La Mishná** — en el centro de la página, en hebreo misnaico. Es el texto que se está discutiendo. Se distingue tipográficamente del resto.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**La Guemará** — el debate talmúdico que rodea a la Mishná, en arameo babilónico con inserciones en hebreo. Es el corazón del estudio: aquí se pregunta, se objeta, se resuelve, se cuentan historias, se derivan leyes nuevas.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Rashi** — en la columna interna (la más cercana al lomo del libro), en la tipografía especial llamada "letra Rashi." No es la letra de Rashi: es una tipografía que el impresor usó para distinguirla, basada en la escritura sefardí ⚠️. El comentario de Rashi explica cada palabra difícil de la Guemará, de manera que el estudiante pueda seguir el razonamiento. Sin Rashi, la Guemará es inaccesible para el estudiante ordinario.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Tosafot** (תּוֹסָפוֹת, "adiciones") — en la columna externa (la más alejada del lomo), también en letra Rashi. Son los comentarios de los nietos y alumnos de Rashi — la escuela francesa y alemana de los siglos XII–XIV ⚠️. Los Tosafot no explican: *discuten*. Cuestionan a Rashi, plantean contradicciones con otros folios del Talmud, proponen soluciones. Son la jevrutá de Rashi de la que nunca salió.`,
      },
      {
        t: "p",
        text: `**El vocabulario técnico de la página.** Para leer una página del Talmud, hay que conocer su vocabulario interno:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**תַּנָּא** (*tana*, plural: *tana'im*) — maestro de la época de la Mishná (siglos I–II EC). Sus opiniones se citan en la Guemará como autoridades anteriores. Si un *tana* dice algo en la Guemará, no puede ser contradicho por un *amora* directamente.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**אָמוֹרָא** (*amora*, plural: *amora'im*) — maestro de la época de la Guemará (siglos III–V EC). Son los que debaten en la Guemará. Pueden interpretar a los tana'im pero no contradecirlos sin reconciliación.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**סוּגְיָא** (*sugya*, "tema/pasaje") — la unidad temática del debate talmúdico. Una *sugya* puede durar media página o varios folios. Es la unidad mínima de lectura: se lee una *sugya* completa, no una línea suelta.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**מַחֲלֹקֶת** (*machlóket*, "controversia/disputa") — el debate entre dos opiniones que no se resuelve. El Talmud no siempre decide: a veces registra el debate sin conclusión, reconociendo que dos posiciones legítimas pueden coexistir. La *machlóket le-shem shamayim* — controversia por el bien del cielo — es considerada un valor en sí misma (Avot 5:17 ✅).`,
      },
      {
        t: "p",
        tone: "item",
        text: `**סְתָם הַתַּלְמוּד** (*stam ha-Talmud*, "la voz anónima del Talmud") — el narrador-editor del Talmud, que formula las preguntas, conecta las discusiones y da estructura al debate. Se llama "el *stam*" porque no tiene nombre: es la voz editora del texto. Los estudiosos modernos creen que el *stam* es la capa redaccional más tardía del Talmud ⚠️.`,
      },
      {
        t: "p",
        text: `**El daf: dos caras de la misma hoja.** El *daf* (hoja) tiene dos lados: **עַמּוּד אָלֶף** (*amud alef*, "columna alef/a") — el anverso — y **עַמּוּד בֵּית** (*amud bet*, "columna bet/b") — el reverso. La numeración del Talmud siempre cita el daf y el amud: por ejemplo, **Berakhot 2a** es la primera página del tratado Berakhot, lado a. La numeración es la misma en todas las ediciones del mundo desde Bomberg ⚠️.`,
      },
      {
        t: "verse",
        he: "כִּי אִם הַהַקְשָׁבָה הִיא לֵב כָּל לִמּוּד",
        es: "Pues la escucha atenta es el corazón de todo estudio.",
        ref: "Bava Metzia 59b ✅ — del contexto del horno de Ajnai (el Talmud mismo practica lo que predica: escuchar todas las voces)",
        sefaria: "Bava Metzia 59b",
      },
      {
        t: "p",
        text: `**La promesa de la página.** Una página del Talmud no es un manual de instrucciones: es una **conversación intergeneracional materializada**. Rabbi Meir del siglo II habla; Rabbi Yojanán del siglo III le responde sin haberlo conocido; Rashi del siglo XI explica los dos; los Tosafot del siglo XII cuestionan a Rashi. Y tú, estudiante del siglo XXI, lees la página y entras a esa conversación. Eso es lo que hace el Talmud único en la historia de los textos: no solo transmite — convoca.`,
      },
    ],
    contemplacion: [
      "Rashi murió en 1105. Sus nietos respondieron a sus comentarios en el siglo XII. Esa conversación se imprimió en la misma página en Venecia en 1520. Tú la lees hoy. ¿En qué otro texto del mundo una conversación puede durar así, sin perder sus voces, sin que ninguna cancele a la otra?",
      "El Talmud registra controversias que no se resuelven. La mayoría de los libros del mundo deciden y concluyen. El Talmud a veces dice: 'teku' — una palabra que quizás significa 'quede sin respuesta' ⚠️ — y sigue. La incertidumbre honesta también es tradición.",
    ],
    accion: {
      text: [
        `Abre "Berakhot 2a" en Sefaria. Mira la página con atención: ¿cuántas columnas de texto ves? ¿Qué texto está en el centro? ¿Qué texto está en los márgenes (si el sitio los muestra)? Intenta identificar dónde termina la Mishná y dónde empieza la Guemará (hay una marca tipográfica — busca la palabra גמ׳ o "Gemara"). Escribe qué ves.`,
      ],
      cta: { label: "Abrir Berakhot 2a en Sefaria →", ref: "Berakhot 2a" },
    },
    sello:
      "El Talmud Bavlí: la Mishná más el debate de los amora'im (Guemará), compilado c. siglos III–V EC ⚠️. La página (*daf*): Mishná en el centro → Guemará → Rashi (columna interna) → Tosafot (columna externa). El *daf* tiene dos caras: *amud alef* (a) y *amud bet* (b). Vocabulario: *tana* / *amora* · *sugya* · *machlóket* · *stam ha-Talmud*. La página es una conversación de cinco siglos materializada: leer el Talmud es entrar a esa conversación.",
    hilos: [
      { kind: "study", ref: "primera-mishna", label: "Ahora que conoces la página, leemos la primera mishná dentro de ella: Berakhot 1:1 en su contexto talmúdico." },
      { kind: "study", ref: "horno-ajnai", label: "El relato más famoso del Talmud vive en una de esas páginas: Bava Metzia 59b." },
    ],
    fuentes: [
      "Berakhot 2a ✅ (el primer folio del Talmud Bavlí — modelo de la página)",
      "Bava Metzia 59b ✅ (el horno de Ajnai — el relato talmúdico más famoso, en la misma arquitectura)",
      "Eruvin 13b ✅ (eilu ve-eilu — 'estas y estas son palabras del Dios vivo' — el fundamento de la machlóket legítima)",
      "Compilación del Talmud Bavlí c. siglos III–V EC ⚠️ (consenso académico)",
      "Diseño de la página: imprenta Bomberg, Venecia, siglo XVI ⚠️",
    ],
    tarea: {
      semana: 30,
      herramienta: "Identificación visual de los elementos de la página del Talmud (*daf*)",
      enunciado:
        'Abre "Berakhot 2a" en Sefaria. Describe qué ves en la página: (1) ¿cuántas columnas de texto hay? (2) ¿qué texto está en el centro? (3) ¿qué texto está en los márgenes (si los ves)? (4) ¿puedes identificar dónde termina la Mishná y dónde empieza la Guemará? ¿Hay algún marcador tipográfico que los distinga? (200–400 palabras.)',
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L31 ───────────────────────────────────────────────────────────────────
  {
    n: 31,
    id: "E2·S3·L31",
    slug: "primera-mishna",
    title: "Primera mishná — Berakhot 1:1 en tres niveles",
    apertura: {
      question:
        "La primera pregunta de todo el Talmud: ¿desde cuándo?",
    },
    estudio: [
      {
        t: "p",
        text: `**Por qué esta mishná y no otra.** La primera mishná de todo el corpus talmúdico es Berakhot 1:1. No es la más dramática, ni la más complicada. Pero es la primera — y esa posición no es accidental. El Talmud empieza con la pregunta sobre la recitación del Shemá porque la Shemá es la declaración de fe fundamental del judaísmo (*"Escucha, Israel: YHVH es nuestro Dios, YHVH es Uno"* ✅ — Deuteronomio 6:4), y la primera pregunta no es filosófica sino práctica: **¿desde cuándo se cumple esta obligación cada noche?** Ese es el estilo de la Mishná: toma el principio más alto y pregunta cómo se practica.`,
      },
      {
        t: "p",
        text: `**Nivel 1: el texto de la Mishná.** La mishná completa en hebreo:`,
      },
      {
        t: "verse",
        he: "מֵאֵימָתַי קוֹרִין אֶת שְׁמַע בְּעַרְבִית? מִשָּׁעָה שֶׁהַכֹּהֲנִים נִכְנָסִים לֶאֱכֹל בִּתְרוּמָתָן עַד סוֹף הָאַשְׁמֻרָה הָרִאשׁוֹנָה, דִּבְרֵי רַבִּי אֱלִיעֶזֶר. וַחֲכָמִים אוֹמְרִים עַד חֲצוֹת. רַבָּן גַּמְלִיאֵל אוֹמֵר עַד שֶׁיַּעֲלֶה עַמּוּד הַשָּׁחַר.",
        es: "¿Desde cuándo se lee el Shemá por la noche? Desde la hora en que los sacerdotes entran a comer de su ofrenda hasta el fin del primer turno de guardia — palabras de Rabbi Eliezer. Y los Sabios dicen: hasta la medianoche. Rabán Gamliel dice: hasta que salga la columna del alba.",
        ref: "Mishná Berakhot 1:1 ✅",
        sefaria: "Mishnah Berakhot 1:1",
      },
      {
        t: "p",
        text: `**La pregunta que responde la Mishná.** La pregunta es *me'ematay* — ¿desde cuándo? La obligación de recitar el Shemá proviene del versículo de Deuteronomio:`,
      },
      {
        t: "verse",
        he: "וּבְשָׁכְבְּךָ וּבְקוּמֶךָ",
        es: "Y cuando te acuestes y cuando te levantes.",
        ref: "Devarim / Deuteronomio 6:7 ✅",
        sefaria: "Deuteronomy 6:7",
      },
      {
        t: "p",
        text: `"Cuando te acuestes" — eso define la Shemá nocturna. ¿Pero cuándo exactamente comienza "el acostarte"? ¿Cuándo cae la noche? El texto bíblico da un principio; la Mishná pregunta: ¿cómo lo aplicamos? Ese es el movimiento fundamental de la Torá oral: tomar el principio escrito y preguntar cómo se vive.`,
      },
      {
        t: "p",
        text: `**Las tres posiciones y el debate.** La Mishná presenta tres posiciones:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Rabbi Eliezer:** desde que los sacerdotes entran a comer de su *terumá* (la ofrenda sacerdotal) hasta el fin del primer turno de guardia (un tercio de la noche). El criterio es el inicio de la "aceptabilidad ritual" de la noche — cuando los sacerdotes, que deben ser puros, pueden comer.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Los Sabios (Jajamim):** hasta la medianoche. Una medida de precaución: para que nadie diga "todavía tengo tiempo" y se duerma sin recitar. Es la posición más práctica y la que la halajá adopta como medida ideal.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Rabán Gamliel:** hasta que salga la columna del alba. El límite más amplio: toda la noche cuenta como "cuando te acuestes." Esta es también una posición válida — en situaciones de necesidad (alguien que llegó tarde del camino), se puede cumplir hasta el amanecer.`,
      },
      {
        t: "p",
        text: `**La conclusión práctica (halajá).** La Mishná no da explícitamente la conclusión; la Guemará la desarrolla: la halajá sigue a los Sabios — hasta medianoche como medida preferida, hasta el amanecer como límite tardío para casos de necesidad. La primera palabra de todo el Talmud, *me'ematay*, ya establece el método: no basta con saber el principio — hay que saber cuándo, cómo, hasta cuándo.`,
      },
      {
        t: "p",
        text: `**Nivel 2: la estructura del debate talmúdico clásico.** En esta mishná ya está presente la arquitectura que aparecerá en miles de páginas del Talmud:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Pregunta de apertura** (*she'elá*): *me'ematay* — ¿desde cuándo?`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Opinión A** con su criterio: Rabbi Eliezer — el inicio de la noche sacerdotal.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Opinión B** con su criterio: los Sabios — medianoche (medida preventiva).`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Opinión C** con su criterio: Rabán Gamliel — el alba (el límite natural de la noche).`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Conclusión práctica** (en la Guemará): la halajá sigue a los Sabios, pero el límite de Rabán Gamliel es válido post factum.`,
      },
      {
        t: "p",
        text: `Esta estructura — pregunta, posiciones múltiples, criterios distintos, conclusión — es la **gramática básica de la argumentación talmúdica**. Aprenderla en Berakhot 1:1 es aprenderla para siempre. Cada *sugya* del Talmud, de mayor o menor extensión, sigue esta lógica.`,
      },
      {
        t: "p",
        text: `**Nivel 3: Rashi sobre Berakhot 2a.** El comentario de Rashi a esta mishná ✅ explica por qué el Talmud empieza precisamente aquí — con la Shemá nocturna y no con la matutina. Su respuesta: porque la noche precede al día en el calendario bíblico — *"y fue tarde, y fue mañana, un día"* (Génesis 1:5 ✅). En la Torah el día comienza con la noche. Por eso el Talmud empieza con la noche: respeta el orden bíblico del tiempo. Incluso la elección del punto de inicio de todo el Talmud revela la lógica del Pshat.`,
      },
    ],
    contemplacion: [
      "La primera pregunta de todo el Talmud — ¿desde cuándo? — no es filosófica. No pregunta si Dios existe o si la Shemá es verdadera. Pregunta cuándo exactamente empieza la noche para cumplir un mandamiento. Eso dice algo sobre el carácter del judaísmo rabínico: la verdad se vive en el tiempo, en la hora concreta, en el momento específico. La fe se mide en cuándo.",
      "Tres sabios dan tres respuestas distintas. El Talmud las registra todas. La halajá elige una como práctica, pero las otras no desaparecen — siguen vivas en la página, reconocidas como opiniones de hombres sabios y piadosos. El desacuerdo no es un problema a resolver: es el tejido del estudio.",
    ],
    accion: {
      text: [
        `Lee Berakhot 1:1 (Mishná) en Sefaria con el comentario de Rashi (busca "Berakhot 2a" y activa la columna de Rashi). Escribe: (1) ¿cuál es la pregunta que la Mishná responde? (2) ¿quiénes debaten y cuáles son sus posiciones? (3) ¿cuál es la conclusión práctica? (4) ¿qué versículo de la Torá usa la Mishná como fundamento?`,
      ],
      cta: { label: "Abrir Berakhot 2a con Rashi en Sefaria →", ref: "Berakhot 2a" },
    },
    sello:
      "Berakhot 1:1 ✅: la primera mishná de todo el Talmud. Pregunta: *me'ematay* — ¿desde cuándo se lee el Shemá nocturno? Fundamento bíblico: Deuteronomio 6:7 ✅ (*u-vejumjá u-bekumeja*). Tres posiciones: Rabbi Eliezer (primer turno de guardia), los Sabios (medianoche), Rabán Gamliel (alba). La halajá sigue a los Sabios como medida ideal. Rashi ✅: el Talmud empieza por la noche porque el día bíblico comienza en la noche (Génesis 1:5). La estructura de este debate es la gramática de todo el Talmud: pregunta → posiciones → criterios → conclusión.",
    hilos: [
      { kind: "study", ref: "pagina-talmud", label: "Leíste una sugya dentro de la página del Talmud — ¿puedes ahora identificar dónde vive la Mishná y dónde la Guemará?" },
      { kind: "study", ref: "horno-ajnai", label: "La siguiente lección toma una sugya mucho más dramática del mismo Talmud: el horno de Ajnai en Bava Metzia 59b." },
    ],
    fuentes: [
      "Mishná Berakhot 1:1 ✅ (la primera mishná — texto hebreo verificado en Sefaria)",
      "Rashi sobre Berakhot 2a ✅ (por qué el Talmud empieza con la noche)",
      "Devarim / Deuteronomio 6:7 ✅ (u-vejumjá u-bekumeja — fundamento de la Shemá nocturna)",
      "Bereshit / Génesis 1:5 ✅ (vayehi erev vayehi voker — la noche precede al día en el Tanaj)",
      "Pirké Avot 5:17 ✅ (machlóket le-shem shamayim — el desacuerdo por el bien del cielo tiene valor)",
    ],
    tarea: {
      semana: 31,
      herramienta: "Lectura de una mishná en su estructura completa: pregunta → posiciones → conclusión → fuente bíblica",
      enunciado:
        "Lee Berakhot 1:1 (Mishná) con el comentario de Rashi en Sefaria. Escribe: (1) ¿cuál es la pregunta que la Mishná responde? (2) ¿quiénes debaten y cuáles son sus posiciones? (3) ¿cuál es la conclusión práctica (halajá)? (4) ¿cuál es el versículo de la Torá que usa la Mishná como fundamento — cítalo con su referencia exacta. (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L32 ───────────────────────────────────────────────────────────────────
  {
    n: 32,
    id: "E2·S3·L32",
    slug: "horno-ajnai",
    title: "El horno de Ajnai — cuando Dios perdió el debate",
    apertura: {
      question:
        "Dios mismo dijo que Rabí Eliezer tenía razón. Los sabios lo ignoraron. ¿Quién ganó?",
    },
    estudio: [
      {
        t: "p",
        text: `**El texto más citado y menos entendido del Talmud.** En Bava Metzia 59b ✅ vive el relato que más de dos mil años después sigue siendo el emblema de la autonomía de la Torá oral. Es el momento en que el Talmud declara — con extraordinaria audacia — que la autoridad de la tradición oral no depende ni siquiera de la voz de Dios. Léelo lentamente.`,
      },
      {
        t: "p",
        text: `**El contexto: el horno de Ajnai.** La disputa parece técnica: ¿es susceptible de impureza ritual el *tanur shel Ajnai* — un horno que fue cortado en secciones separadas y sellado con arena entre ellas? ¿Sigue siendo "un horno" (y por tanto susceptible de impureza) o es solo un conjunto de partes (y por tanto puro)? Rabbi Eliezer lo declara puro. Los sabios lo declaran impuro. El debate no es filosófico — es jurídico. Pero lo que ocurre a continuación transforma un debate sobre hornos en el texto fundacional de la Torá oral.`,
      },
      {
        t: "p",
        text: `**Los milagros de Rabbi Eliezer.** Para probar que tiene razón, Rabbi Eliezer invoca señales sobrenaturales:`,
      },
      {
        t: "p",
        tone: "item",
        text: `*"Si la halajá es como yo digo, que este algarrobo lo pruebe."* Y el algarrobo se desplazó cien codos — algunos dicen cuatrocientos. Los Sabios respondieron: **"De un algarrobo no se trae prueba."**`,
      },
      {
        t: "p",
        tone: "item",
        text: `*"Si la halajá es como yo digo, que lo pruebe el canal de agua."* Y el canal comenzó a fluir hacia atrás. Los Sabios respondieron: **"De un canal de agua no se trae prueba."**`,
      },
      {
        t: "p",
        tone: "item",
        text: `*"Si la halajá es como yo digo, que lo prueben las paredes del bet midrash."* Y las paredes de la academia comenzaron a inclinarse para caer. Rabbi Yehoshúa las reprendió: *"¿Qué os importa a vosotros cuando los discípulos de los sabios se disputan en halajá?"* — y en su honor no cayeron del todo, pero en honor de Rabbi Eliezer tampoco se enderezaron. Ahí permanecen inclinadas hasta hoy ✅.`,
      },
      {
        t: "p",
        text: `**La Bat Kol.** Entonces el golpe definitivo: una **Bat Kol** (בַּת קוֹל, "hija de la voz" — la voz celestial que anuncia la voluntad divina) declaró desde el cielo:`,
      },
      {
        t: "verse",
        he: "מַה לָּכֶם אֵצֶל רַבִּי אֱלִיעֶזֶר שֶׁהֲלָכָה כְּמוֹתוֹ בְּכָל מָקוֹם",
        es: "¿Qué tenéis contra Rabbi Eliezer, si la halajá es como él dice en todo lugar?",
        ref: "Bava Metzia 59b ✅",
        sefaria: "Bava Metzia 59b",
      },
      {
        t: "p",
        text: `La voz del cielo acaba de decir: Rabbi Eliezer tiene razón. En términos teológicos, la disputa debería haberse resuelto. Pero Rabbi Yehoshúa se levantó y dijo las palabras más audaces del Talmud:`,
      },
      {
        t: "verse",
        he: "לֹא בַשָּׁמַיִם הִיא",
        es: "No está en el cielo.",
        ref: "Bava Metzia 59b ✅ — citando Devarim / Deuteronomio 30:12 ✅",
        sefaria: "Bava Metzia 59b",
      },
      {
        t: "p",
        text: `La frase cita Deuteronomio 30:12 ✅ — *"no está en el cielo"* — que en su contexto original dice: *"No está en el cielo [la Torá], para que no tengas que decir: ¿quién subirá al cielo a buscárnosla?"* El argumento original de Moshé es: la Torá ya fue entregada, no necesitas ir al cielo a buscarla. Rabbi Yehoshúa lo invierte con una radicalidad extraordinaria: **precisamente porque la Torá ya fue entregada en el Sinaí, ya no está en el cielo — está en las manos de los sabios que la interpretan aquí abajo.**`,
      },
      {
        t: "p",
        text: `**El argumento completo de Rabbi Yehoshúa:**`,
      },
      {
        t: "verse",
        he: "כְּבָר נִתְּנָה תּוֹרָה מֵהַר סִינַי; אֵין אָנוּ מַשְׁגִּיחִים בְּבַת קוֹל, שֶׁכְּבָר כָּתַבְתָּ בְּתוֹרָה «אַחֲרֵי רַבִּים לְהַטֹּת»",
        es: "La Torá ya fue dada desde el Monte Sinaí; no prestamos atención a la Bat Kol, pues ya escribiste en la Torá: 'Seguirás a la mayoría' — Éxodo 23:2.",
        ref: "Bava Metzia 59b ✅",
        sefaria: "Bava Metzia 59b",
      },
      {
        t: "p",
        text: `La fuente que cita es Éxodo 23:2 ✅: *"ajarei rabim le-hatot"* — "seguirás a la mayoría." Rabbi Yehoshúa lee este versículo como el principio que rige toda disputa jurídica: cuando los sabios no se ponen de acuerdo, la halajá sigue a la mayoría — no a los milagros ni a las voces celestiales. Dios mismo, al revelar ese versículo en el Sinaí, autorizó el principio mayoritario. Y ese principio ahora aplica incluso cuando la voz en cuestión es la del propio Dios.`,
      },
      {
        t: "p",
        text: `**La risa de Dios.** El Talmud narra que tiempo después, Rabbi Natan se encontró con el profeta Elías y le preguntó: ¿qué hizo Dios en ese momento? La respuesta de Elías:`,
      },
      {
        t: "verse",
        he: "נִצְּחוּנִי בָנַי, נִצְּחוּנִי בָנַי",
        es: "Mis hijos me vencieron, mis hijos me vencieron.",
        ref: "Bava Metzia 59b ✅",
        sefaria: "Bava Metzia 59b",
      },
      {
        t: "p",
        text: `Dios dijo esto con una sonrisa (*ve-hayá mesjak*, "y estaba riendo") ✅. No con enojo, no con corrección — con risa y satisfacción. Sus hijos habían aprendido tan bien lo que Él les enseñó — que la Torá pertenece a quienes la estudian y aplican sus propios principios — que lo vencieron en un debate usando Sus propias palabras. Eso era exactamente lo que Él quería.`,
      },
      {
        t: "p",
        text: `**Lo que este relato enseña sobre la Torá oral.** El horno de Ajnai es la declaración de independencia de la Torá oral. Después de este relato, ya no es posible decir que la autoridad de la halajá viene del cielo en forma de señales y voces. La autoridad viene del proceso — del debate, del argumento, del principio mayoritario — porque Dios mismo entregó ese proceso en el Sinaí. La Torá oral tiene **autonomía**: es la relación viva entre el texto y la comunidad que lo interpreta, y esa relación tiene sus propias reglas que ni siquiera Dios va a interrumpir.`,
      },
      {
        t: "p",
        text: `**El final de Rabbi Eliezer.** El Talmud añade que como consecuencia del debate, Rabbi Eliezer fue excomulgado (*nidui*) de la academia — no por estar equivocado, sino por no aceptar la decisión de la mayoría ✅. Es el precio de la autonomía: el sistema requiere que incluso quien tiene razón se someta al proceso. La verdad individual, por más que venga respaldada por milagros, no puede prevalecer sobre el mecanismo acordado de determinación de la ley.`,
      },
    ],
    contemplacion: [
      "Dios creó un pueblo que discute con Él y le gana el debate usando Sus propias palabras. Y Dios se ríe con satisfacción. ¿Qué imagen de Dios y del ser humano está implícita en ese relato? No es la imagen de la obediencia ciega — es la imagen de un padre que ve que su hijo maduró.",
      "La Torá oral es exactamente eso: oral porque es viva, porque cambia de generación en generación, porque requiere interpretación, porque depende de comunidades de estudio que se toman en serio el proceso. Escribirla no la mató — la estabilizó. Pero su espíritu sigue siendo la voz que debate, que pregunta, que a veces le dice a Dios mismo: 'no está en el cielo — está aquí, entre nosotros, y nosotros decidimos.'",
    ],
    accion: {
      text: [
        `Lee Bava Metzia 59b en Sefaria (busca "Bava Metzia 59b" y navega al relato del horno de Ajnai — *tanur shel Ajnai*). Escribe: (1) ¿qué dice Rabbi Yehoshúa cuando escucha la Bat Kol? (2) ¿qué versículo cita como justificación? (3) ¿qué te enseña este relato sobre la naturaleza de la Torá oral y la autoridad de los sabios?`,
      ],
      cta: { label: "Abrir Bava Metzia 59b en Sefaria →", ref: "Bava Metzia 59b" },
    },
    sello:
      "Bava Metzia 59b ✅ — el horno de Ajnai: Rabbi Eliezer (milagros + Bat Kol) vs. los Sabios (mayoría). Rabbi Yehoshúa: *'lo baShamayim hi'* — 'No está en el cielo' ✅ (citando Deuteronomio 30:12 ✅). Fundamento del principio mayoritario: Éxodo 23:2 ✅ (*ajarei rabim le-hatot*). La respuesta de Dios: *'mis hijos me vencieron'* ✅ — con risa y satisfacción. La Torá oral tiene autonomía: fue entregada a la comunidad que la interpreta, y ni la voz del cielo puede interrumpir ese proceso. La revelación está en el debate, no en el milagro.",
    hilos: [
      { kind: "study", ref: "pagina-talmud", label: "Este relato vive en Bava Metzia 59b — ya conoces la arquitectura de esa página. ¿Puedes ahora leerla con más herramientas?" },
      { kind: "study", ref: "que-es-un-profeta", label: "Los profetas también desafiaron a su pueblo con la verdad. ¿En qué se parece y en qué se diferencia el profeta del sabio talmúdico?" },
    ],
    fuentes: [
      "Bava Metzia 59b ✅ (el relato completo del horno de Ajnai — verificado en Sefaria)",
      "Devarim / Deuteronomio 30:12 ✅ (lo baShamayim hi — 'no está en el cielo')",
      "Shemot / Éxodo 23:2 ✅ (ajarei rabim le-hatot — 'seguirás a la mayoría')",
      "Eruvin 13b ✅ (eilu ve-eilu divrei Elohim jayim — 'estas y estas son palabras del Dios vivo')",
    ],
    tarea: {
      semana: 32,
      herramienta: "Lectura de una *sugya* narrativa del Talmud; comprensión del principio de autonomía de la Torá oral",
      enunciado:
        "Lee Bava Metzia 59b en Sefaria — localiza el relato del *tanur shel Ajnai* (el horno de Ajnai). Escribe: (1) ¿qué dice Rabbi Yehoshúa cuando escucha la voz celestial (Bat Kol)? ¿qué versículo cita? (2) ¿qué significa que 'no está en el cielo'? ¿de dónde viene entonces la autoridad de la halajá? (3) ¿qué te enseña este relato sobre la naturaleza de la Torá oral? (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
    closeModule:
      "Terminaste el tercer módulo de SHOEL — la Torá oral. En cinco semanas recorriste el arco completo: del silencio de mil años antes de escribirse (L28) hasta el momento en que los sabios le ganaron el debate a Dios con Sus propias palabras (L32). En el camino nombraste los seis órdenes de la Mishná, aprendiste a leer la arquitectura de la página del Talmud, leíste la primera mishná de la historia con sus tres posiciones y su conclusión práctica, y llegaste al relato que más define qué es la Torá oral: un sistema vivo que Dios entregó al pueblo para que lo habite, lo debata y lo aplique generación tras generación. *Lo baShamayim hi* — no está en el cielo. Está aquí. En ti. El módulo S4 te lleva a los Profetas — la otra voz de la Torá, la que corrige y consuela — y su caso más vivo: Yoná, el profeta que huyó y encontró que no había a dónde huir. תּוֹרַת אֱמֶת נָתַן לְעַמּוֹ — la Torá de verdad la dio a su pueblo.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO6 = {
  id: "S3",
  he: "תּוֹרָה שֶׁבְּעַל פֶּה",
  titulo: "La Torá oral",
  etapaHe: "שׁוֹאֵל",
  etapa: "Shoel",
  etapaGloss: "el que pregunta",
  etapaNum: 2,
  etapasTotal: 6,
  total: LESSONS6.length,
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson6(slug: string): Lesson | undefined {
  return LESSONS6.find((l) => l.slug === slug);
}

export function lessonIndex6(slug: string): number {
  return LESSONS6.findIndex((l) => l.slug === slug);
}

export function nextLesson6(slug: string): Lesson | null {
  const i = lessonIndex6(slug);
  return i >= 0 && i < LESSONS6.length - 1 ? LESSONS6[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 6 ──────────────────────────────
// Slugs internos del Módulo 6.
const INTERNAL_SLUGS6: Record<string, string> = {
  "tora-oral": "tora-oral",
  "la-mishna": "la-mishna",
  "pagina-talmud": "pagina-talmud",
  "primera-mishna": "primera-mishna",
  "horno-ajnai": "horno-ajnai",
};

// Slugs de módulos anteriores que deben resolver a sus rutas propias.
const CROSS_MODULE_HREFS6: Record<string, string> = {
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
};

const MISTERIO_SLUGS6 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread6(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS6[key]) return { kind: "lesson", slug: INTERNAL_SLUGS6[key] };
  if (MISTERIO_SLUGS6.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href completo para M6 — incluye cross-module overrides.
export function resolveThreadHref6(h: Hilo): string | null {
  if (h.kind === "letter") return `/letras/${h.ref}`;
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS6[key]) return `/academia/modulo-6/${key}`;
  if (CROSS_MODULE_HREFS6[key]) return CROSS_MODULE_HREFS6[key];
  if (MISTERIO_SLUGS6.has(key)) return `/misterio/${key}`;
  return null;
}
