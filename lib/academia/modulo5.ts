// ─────────────────────────────────────────────────────────────────────────
// modulo5.ts — ACADEMIA DE JASHMAL · Módulo 5 (S2 · פִּרְקֵי אָבוֹת — "La ética de los padres").
// Las 6 lecciones de las semanas 22–27, segundo módulo de SHOEL.
//
// El contenido (textos, citas, verificaciones) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - S2 - pirke-avot (Sofer).md", 2026-06-17.
// Se monta TAL CUAL: no se inventa, altera ni agrega ninguna fuente.
//
// Sigue EXACTAMENTE la estructura de modulo4.ts.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView5 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── Las 6 lecciones (verbatim del Sofer, 2026-06-17) ─────────────────────────

export const LESSONS5: Lesson[] = [
  // ── L22 ───────────────────────────────────────────────────────────────────
  {
    n: 22,
    id: "E2·S2·L22",
    slug: "tres-pilares",
    title: "Los tres pilares del mundo — Torá, Avodá, Guemilut Jasadim",
    apertura: {
      question:
        "El mundo se sostiene sobre tres cosas. ¿Qué pasaría si faltara una?",
    },
    estudio: [
      {
        t: "p",
        text: `**El primer aforismo de Pirké Avot.** Terminaste S1 sabiendo interrogar el texto como lo hacía Rashi. Ahora el texto que interrogarás es diferente: no es narrativa bíblica sino **ética concentrada**. Pirké Avot (פִּרְקֵי אָבוֹת, "capítulos de los padres") es el único tratado de la Mishná dedicado enteramente al carácter y la conducta del estudioso — no a la ley, sino a la persona que la estudia. La primera mishná te da ya el argumento central del módulo entero:`,
      },
      {
        t: "verse",
        he: "עַל שְׁלֹשָׁה דְבָרִים הָעוֹלָם עוֹמֵד: עַל הַתּוֹרָה, וְעַל הָעֲבוֹדָה, וְעַל גְּמִילוּת חֲסָדִים",
        es: "Sobre tres cosas se sostiene el mundo: sobre la Torá, sobre la Avodá (el servicio) y sobre la Guemilut Jasadim (los actos de bondad).",
        ref: "Pirké Avot 1:2 ✅",
        sefaria: "Pirkei Avot 1:2",
      },
      {
        t: "p",
        text: `**Quién lo dijo.** Shimón ha-Tzadik (שִׁמְעוֹן הַצַּדִּיק, "Shimón el Justo") era, según la misma mishná, "de los sobrevivientes de la Gran Asamblea" ✅ — la última generación que conectó con los profetas antes de que la profecía cesara. Habló desde el umbral entre dos épocas. Lo que enuncia no es un consejo de vida sino una afirmación cosmológica: la arquitectura del mundo tiene tres columnas. Si una cae, el edificio cede.`,
      },
      {
        t: "p",
        text: `**El primer pilar: Torá (תּוֹרָה).** No se habla aquí del libro sino del **acto de estudiar**: leer, preguntar, transmitir, aprender. La Torá como pilar es el estudio que une a una generación con la anterior y la siguiente — la cadena de Avot 1:1 que conociste desde el primer día. Sin estudio, cada generación empieza de cero; la experiencia acumulada se pierde; la sabiduría se diluye. En el mapa de PaRDeS, la Torá como pilar corresponde al Pshat y al Rémez: el trabajo textual honesto que no cede a la interpretación caprichosa.`,
      },
      {
        t: "p",
        text: `**El segundo pilar: Avodá (עֲבוֹדָה).** La palabra *avodá* significa literalmente "servicio, trabajo". En tiempos del Templo, era el servicio sacrificial (*avodát ha-mikdash*). Cuando el Templo fue destruido, los sabios enseñaron que la plegaria (*tefila*) lo reemplaza ⚠️ (Berakhot 26b, donde se discute si las plegarias corresponden a los sacrificios diarios). La Avodá como pilar es la **orientación hacia lo que está más allá de uno mismo**: el reconocimiento de que el mundo no gira alrededor del propio ego. En PaRDeS, la Avodá vive en el Drash: la interpretación es siempre un acto de humillación ante el texto, de escuchar antes de hablar.`,
      },
      {
        t: "p",
        text: `**El tercer pilar: Guemilut Jasadim (גְּמִילוּת חֲסָדִים).** La traducción habitual es "actos de bondad" o "beneficencia activa". El término hebreo es más denso: *guemilut* (גְּמִילוּת) viene de *gamul* ("retribuir, completar, madurar") — implica que la bondad no es capricho sino **respuesta activa** a la necesidad del otro. Y *jasadim* (חֲסָדִים, plural de *jésed*) es amor-lealtad, la bondad que se da aunque no haya obligación de darla. Los profetas ya lo enseñaban:`,
      },
      {
        t: "verse",
        he: "הֲלוֹא פָרֹס לָרָעֵב לַחְמֶךָ, וַעֲנִיִּים מְרוּדִים תָּבִיא בָיִת",
        es: "¿No es compartir tu pan con el hambriento, y hospedar en tu casa al pobre que no tiene hogar?",
        ref: "Isaías 58:7 ✅",
        sefaria: "Isaiah 58:7",
      },
      {
        t: "p",
        text: `Isaías 58:6–7 describe exactamente la Guemilut Jasadim: soltar los lazos de injusticia, dar de comer al hambriento, hospedar al pobre, cubrir al desnudo. En PaRDeS, la Guemilut Jasadim es el Sod encarnado: no el secreto que se guarda sino la chispa divina que se realiza en el encuentro con otro ser humano. El Sod no es inacción contemplativa; la enseñanza jasídica (⚠️ Baal Shem Tov) dirá siglos después que el amor al prójimo es la puerta más accesible al amor divino.`,
      },
      {
        t: "p",
        text: `**Por qué los tres son inseparables.** Shimón ha-Tzadik no pone jerarquía entre los pilares ni dice cuál es el más importante: los pone en serie, con el mismo verbo (*omed*, "se sostiene"). El mundo necesita los tres simultáneamente. Un estudioso que solo estudia sin dar, hace del conocimiento una fortaleza privada. Quien solo actúa sin estudiar, actúa sin sabiduría. Quien solo ora sin ninguna de las otras dos, convierte la plegaria en escapismo. Los tres pilares se corrigen y sostienen entre sí — exactamente como el método de PaRDeS: ningún nivel cancela al otro, todos son necesarios.`,
      },
      {
        t: "p",
        text: `**Avot de-Rabí Natán sobre los tres pilares** ⚠️. El texto paralelo que amplía Pirké Avot — Avot de-Rabí Natán 4:5 — relata que cuando el Templo fue destruido, Rabán Yojanán ben Zakay lloró. Su discípulo Rabí Yehoshúa dijo: "¿Qué haremos ahora que no hay Templo para expiar nuestros pecados?" Rabán Yojanán respondió: "No te aflijes, hijo mío — tenemos una expiación igual de buena: la Guemilut Jasadim. Como dice la Escritura (Oseas 6:6): quiero bondad (*jésed*) y no sacrificio." ⚠️ El Sod de Avot 1:2 es que los tres pilares son el Templo reconstituido: el estudio es el servicio intelectual, la plegaria es el servicio del corazón, la bondad activa es el servicio del cuerpo.`,
      },
    ],
    contemplacion: [
      "El mundo no se sostiene sobre el genio, la fuerza ni la riqueza — se sostiene sobre el estudio, la orientación hacia lo alto y el cuidado del prójimo. Tres cosas al alcance de cualquier persona, sin excepción de condición social o talento. Eso es lo que hace de este aforismo algo radicalmente igualitario: no hay pilar reservado para la élite.",
      "¿Cuál de los tres pilares sientes más débil en tu vida ahora mismo? La pregunta no busca culpa — busca el próximo paso.",
    ],
    accion: {
      text: [
        `Lee Avot 1:2 en Sefaria (busca "Pirkei Avot 1:2"). Anota los tres pilares con sus nombres en hebreo y en español. Luego escribe en tu cuaderno de estudio (tu pinkas): ¿cuál de los tres está más presente en tu vida hoy y cuál está más ausente? Una sola frase honesta por pilar.`,
      ],
      cta: { label: "Abrir Avot 1:2 en Sefaria →", ref: "Pirkei Avot 1:2" },
    },
    sello:
      "Shimón ha-Tzadik, Avot 1:2 ✅: *al shelosha devarim ha-olam omed* — el mundo se sostiene sobre Torá (estudio), Avodá (servicio/plegaria) y Guemilut Jasadim (actos de bondad). Los tres pilares son inseparables y corresponden a los tres niveles activos del estudiante: el intelecto, el corazón y la mano. Isaías 58:7 ✅ muestra que los profetas ya vivían el tercer pilar.",
    hilos: [
      { kind: "study", ref: "cadena-zugot", label: "Los tres pilares sostienen el edificio — la próxima lección enseña quiénes lo construyeron generación a generación." },
      { kind: "study", ref: "que-es-pardes", label: "Los tres pilares se corresponden con tres niveles de PaRDeS: Pshat/Remez (Torá), Drash (Avodá), Sod encarnado (Guemilut Jasadim)." },
    ],
    fuentes: [
      "Pirké Avot 1:2 ✅ (el texto completo de Shimón ha-Tzadik)",
      "Isaías 58:6–7 ✅ (los profetas y la Guemilut Jasadim)",
      "Avot de-Rabí Natán 4:5 ⚠️ (el Templo reconstituido en los tres pilares — texto extratalmúdico)",
      "Berakhot 26b ⚠️ (la plegaria como sustituto del servicio sacrificial — la *avodá* después del Templo)",
    ],
    tarea: {
      semana: 22,
      herramienta: "Identificar los tres pilares de Avot 1:2 y conectarlos con la propia vida",
      enunciado:
        "Lee Avot 1:2. Escribe con tus palabras qué es cada uno de los tres pilares y da un ejemplo concreto de cómo ese pilar se manifiesta en tu vida hoy. (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L23 ───────────────────────────────────────────────────────────────────
  {
    n: 23,
    id: "E2·S2·L23",
    slug: "cadena-zugot",
    title: "La cadena y los pares — los zugot y el estudio en pareja",
    apertura: {
      question:
        "¿Por qué los sabios siempre estudian en pares y se citan entre ellos aunque estén en desacuerdo?",
    },
    estudio: [
      {
        t: "p",
        text: `**La cadena que ya conoces, ahora con más detalle.** Desde la primera semana de Talmid aprendiste la apertura de Pirké Avot: *"Moshé recibió la Torá del Sinaí y la transmitió a Yehoshúa…"* (Avot 1:1 ✅). La cadena que arranca en esa mishná no termina en los profetas: continúa en los **zugot** (זוּגוֹת, "pares"), los cinco pares de líderes que gobernaron el estudio judío durante siglos, desde la época del segundo Templo hasta los primeros Tanaím.`,
      },
      {
        t: "p",
        text: `**Por qué en pares.** El método de estudio que ya conoces desde §10.3 del currículo — la **jevrutá** (חַבְרוּתָא) — no fue inventado como técnica pedagógica moderna: es la forma en que la tradición **se estructuró a sí misma** desde el principio. Los zugot no son simplemente dos personas que coincidían en el cargo: son el modelo institucional de que la Torá se transmite mejor en diálogo que en monólogo. El Talmud en Taanit 7a ✅ lo dice con una imagen: *"la espada se afila con la espada"* — el entendimiento se afila con el roce del otro entendimiento.`,
      },
      {
        t: "p",
        text: `**Los cinco pares (los zugot).** Pirké Avot 1:4–15 ✅ los enumera en orden histórico. Cada par tiene dos funciones: el **Nasí** (נָשִׂיא, "príncipe" o presidente del Sanhedrín) y el **Av Bet Din** (אַב בֵּית דִּין, "padre del tribunal"), el director del tribunal rabínico. El orden es:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**1er zug: Yosé ben Yoézer y Yosé ben Yojanán** (Avot 1:4–5) ✅. Los más tempranos. Yosé ben Yoézer enseñó: *"que tu casa sea un punto de encuentro para los sabios; siéntate en el polvo de sus pies y bebe sus palabras con sed."* Una imagen de humildad ante el maestro que reverberará en toda la tradición.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**2do zug: Yehoshúa ben Perajía y Nitai el Arbelita** (Avot 1:6–7) ✅. Yehoshúa ben Perajía enseñó: *"hazte un maestro (rav), adquiere un compañero (javer)"* — el estudio necesita un guía y un igual con quien discutir.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**3er zug: Yehudá ben Tabay y Shimón ben Shetaj** (Avot 1:8–9) ✅. Activos durante el reinado de la reina Alejandra Salomé. Shimón ben Shetaj es conocido por sus reformas educativas — se le atribuye ⚠️ la institución de la educación obligatoria para niños.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**4to zug: Shemayá y Avtalión** (Avot 1:10–11) ✅. Maestros de Hilel y Shamai. Shemayá enseñó: *"ama el trabajo, aborrece el señorío y no te hagas conocer ante el gobierno."* Una advertencia que viene de alguien que vivió bajo el poder de Roma.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**5to zug: Hilel y Shamai** (Avot 1:12–15) ✅. El par más conocido — y el que dividió en dos escuelas al judaísmo farisaico por generaciones. Sus discípulos, *Beit Hilel* y *Beit Shamai*, continuaron la controversia durante siglos. Hilel es el más citado en este módulo: su formulación de la Regla de Oro, su mansedumbre proverbial, su célebre llamado a amar a la humanidad (*Avot 1:12: "ama a las criaturas y acércalas a la Torá"* ✅).`,
      },
      {
        t: "p",
        text: `**¿Por qué el desacuerdo es sagrado?** Una pregunta natural: si el estudio en pares es tan valioso, ¿no deberían los pares estar de acuerdo para que la cadena no se fracture? La respuesta de la tradición es exactamente la contraria. Pirké Avot 5:17 distingue entre dos tipos de controversia:`,
      },
      {
        t: "verse",
        he: "כָּל מַחֲלֹקֶת שֶׁהִיא לְשֵׁם שָׁמַיִם, סוֹפָהּ לְהִתְקַיֵּם. וְשֶׁאֵינָהּ לְשֵׁם שָׁמַיִם, אֵין סוֹפָהּ לְהִתְקַיֵּם",
        es: "Toda controversia que sea por amor al Cielo, su fin es perdurar. Y la que no sea por amor al Cielo, su fin es no perdurar.",
        ref: "Pirké Avot 5:17 ✅",
        sefaria: "Pirkei Avot 5:17",
      },
      {
        t: "p",
        text: `El ejemplo positivo que da la mishná es la controversia de Hilel y Shamai: por amor al Cielo (*lishem shamáyim*, לְשֵׁם שָׁמַיִם). El ejemplo negativo es Koraj y sus seguidores: por interés propio. La diferencia no está en el tono ni en si se llega a un acuerdo — está en la *motivación*. ¿Se discute para encontrar la verdad, o para ganar?`,
      },
      {
        t: "p",
        text: `**Eilu ve-eilu — ambos son palabras del Dios vivo.** El Talmud en Eruvin 13b registra una tradición asombrosa: mientras las escuelas de Hilel y Shamai debatían durante tres años sin ceder, una voz del cielo (bat kol, בַּת קוֹל) proclamó:`,
      },
      {
        t: "verse",
        he: "אֵלּוּ וָאֵלּוּ דִּבְרֵי אֱלֹהִים חַיִּים הֵן",
        es: "Estos y aquellos son palabras del Dios vivo.",
        ref: "Talmud Bavlí, Eruvin 13b ✅",
        sefaria: "Eruvin 13b",
      },
      {
        t: "p",
        text: `Esta declaración — *eilu ve-eilu divrei Elohim jayyim* — es uno de los textos más revolucionarios de toda la tradición rabínica. Dos posiciones contradictorias sobre la ley, ambas verdaderas. No en el sentido de que "cualquier opinión vale" — sino en el sentido de que la Torá, al ser infinita, contiene dimensiones que una sola posición no agota. El par es la estructura que permite que esa infinitud se exprese: cada voz aporta la mitad que el otro no alcanza solo. Por eso la tradición rabínica no es un dogma monolítico — es un **diálogo de miles de años que sigue abierto**.`,
      },
      {
        t: "p",
        text: `**La jevrutá como forma de vida.** El estudio en pareja que conociste en §10.3 no es solo una técnica de aprendizaje eficiente: es la institucionalización de *eilu ve-eilu*. Cuando estudias con otro y llegan a conclusiones distintas, y ambas son honestas y bien argumentadas, estás reproduciendo el modelo de Hilel y Shamai: dos voces que sostienen juntas lo que ninguna puede sostener sola.`,
      },
    ],
    contemplacion: [
      "La cadena desde el Sinaí no es una fila de personas que repiten lo mismo: es una cadena de pares que discuten, refinan, transmiten. Cada eslabón es una conversación, no un monólogo. ¿Con quién es tu jevrutá hoy — un maestro, un compañero, un texto que te interroga?",
      "La controversia lishem shamáyim no termina con un vencedor: termina con dos posiciones que permanecen, porque ambas aportaron algo real. ¿Hay en tu vida una controversia que vale la pena sostener con honestidad?",
    ],
    accion: {
      text: [
        `Lee Avot 5:17 en Sefaria. Escribe en tu cuaderno de estudio: ¿cuál es la diferencia entre una controversia "para el cielo" y una que no lo es? Da un ejemplo de cada tipo de tu propia experiencia. Luego abre Eruvin 13b en Sefaria y lee el párrafo de "eilu ve-eilu". ¿Qué te parece que significa que "ambos son palabras del Dios vivo"?`,
      ],
      cta: { label: "Abrir Avot 5:17 en Sefaria →", ref: "Pirkei Avot 5:17" },
    },
    sello:
      "Los cinco pares (zugot) transmitieron la Torá en diálogo desde la Gran Asamblea hasta Hilel y Shamai ✅. La controversia *lishem shamáyim* (por amor al Cielo) no destruye la cadena — la fortalece (Avot 5:17 ✅). *Eilu ve-eilu divrei Elohim jayyim* — ambas posiciones son palabras del Dios vivo (Eruvin 13b ✅). La jevrutá no es técnica; es el modelo mismo de la transmisión.",
    hilos: [
      { kind: "study", ref: "hilel-regla-de-oro", label: "Hilel cierra la lista de los zugot — ahora lo vemos en la escena más famosa de su vida." },
      { kind: "study", ref: "tres-pilares", label: "Los zugot practicaron los tres pilares: estudiar en pares (Torá), transmitir en humildad (Avodá), y cuidar al prójimo que llega a la puerta (Guemilut Jasadim)." },
    ],
    fuentes: [
      "Pirké Avot 1:4–15 ✅ (los cinco pares — zugot — y sus enseñanzas)",
      "Pirké Avot 5:17 ✅ (la controversia lishem shamáyim — Hilel y Shamai como modelo)",
      "Talmud Bavlí, Eruvin 13b ✅ (eilu ve-eilu divrei Elohim jayyim)",
      "Talmud Bavlí, Taanit 7a ✅ (la espada se afila con la espada — el estudio en pareja)",
    ],
    tarea: {
      semana: 23,
      herramienta: "Distinguir la controversia lishem shamáyim de la que no lo es",
      enunciado:
        "Lee Avot 5:17. Escribe: ¿cuál es la diferencia entre una controversia 'para el cielo' y una que no lo es? Da un ejemplo de cada tipo (puede ser de tu vida o de la historia). (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L24 ───────────────────────────────────────────────────────────────────
  {
    n: 24,
    id: "E2·S2·L24",
    slug: "hilel-regla-de-oro",
    title: "Hilel y el proselito — toda la Torá en una frase",
    apertura: {
      question:
        "¿Es posible aprender toda la Torá en una sola frase?",
    },
    estudio: [
      {
        t: "p",
        text: `**La escena del Talmud (Shabat 31a).** El tractado de Shabat del Talmud Bavlí registra una historia que se convirtió en uno de los textos éticos más citados del judaísmo. Un hombre no-judío llega a donde está Shamai y le dice: "conviérteme al judaísmo con la condición de que me enseñes toda la Torá mientras estoy parado sobre un solo pie" (*al omed al regel ajat*, עַל עַמְדוֹ עַל רֶגֶל אַחַת). Shamai lo expulsa con la vara de medición que tiene en la mano. El hombre va entonces a donde está Hilel y le repite la misma petición. Hilel lo acepta y responde:`,
      },
      {
        t: "verse",
        he: "דַּעֲלָךְ סְנֵי לְחַבְרָךְ לָא תַּעֲבֵד. זוֹ הִיא כָּל הַתּוֹרָה כֻּלָּהּ, וְאִידַּךְ פֵּירוּשָׁהּ הוּא. זִיל גְּמוֹר",
        es: "Lo que a ti te es odioso, no se lo hagas a tu compañero. Eso es toda la Torá; el resto es comentario. Ve y aprende.",
        ref: "Talmud Bavlí, Shabat 31a ✅",
        sefaria: "Shabbat 31a",
      },
      {
        t: "p",
        text: `**La formulación en negativo — y por qué importa.** Hilel dice *"lo que a ti te es odioso, no se lo hagas a tu compañero"* — formulación en **negativo**. La Regla de Oro más conocida en las culturas occidentales viene del Evangelio de Mateo 7:12: *"haz a los demás lo que quieras que te hagan a ti"* — formulación en **positivo**. ¿Hay diferencia real? El debate entre los estudiosos ha durado siglos. La versión en negativo es más restrictiva: prohíbe la acción dañina. La versión en positivo es más exigente: obliga a la acción positiva. Los comentaristas judíos señalan que la versión negativa de Hilel es más honesta sobre los límites del conocimiento del otro: uno sabe con más certeza lo que le hace daño que lo que le hace bien; por tanto, la prohibición de dañar es más segura que la obligación de beneficiar según la propia proyección.`,
      },
      {
        t: "p",
        text: `**La fuente del Tanaj: Levítico 19:18.** Hilel no inventa esta enseñanza — la destila de la Torá. La fuente directa es el versículo que el Talmud cita como la base de la Regla de Oro:`,
      },
      {
        t: "verse",
        he: "וְאָהַבְתָּ לְרֵעֲךָ כָּמוֹךָ",
        es: "Amarás a tu prójimo como a ti mismo.",
        ref: "Vayikrá / Levítico 19:18 ✅",
        sefaria: "Leviticus 19:18",
      },
      {
        t: "p",
        text: `Rabí Akivá —que aparecerá en la próxima lección— declaró que este versículo es *kelal gadol ba-Torá* (כְּלָל גָּדוֹל בַּתּוֹרָה), "un principio grande en la Torá" ✅ (Jerusalmí Nedarim 9:4; Bereshit Rabá 24:7 ⚠️ — la cita con esa fórmula exacta circula en varias fuentes, la más citada es el Yerushalmí). Hilel convierte ese principio en respuesta directa a la pregunta del proselito: *"eso es toda la Torá; el resto es comentario."*`,
      },
      {
        t: "p",
        text: `**¿Qué rechazó Shamai y qué aceptó Hilel?** La pregunta del proselito no era estúpida ni irrespetuosa: era una demanda de síntesis, de principio organizador. Shamai la rechazó porque la forma era inapropiada — pedir la Torá entera "parado sobre un pie" suena a frivolidad. Hilel la recibió porque vio en la demanda algo legítimo: el hombre quería saber **qué sostiene todo lo demás**. Y Hilel le respondió exactamente eso: la base es una sola, y construir el edificio es el trabajo de toda la vida (*"ve y aprende"* — el famoso *zil gemor*, זִיל גְּמוֹר). No fue condescendencia: fue la mayor confianza que un maestro puede mostrar.`,
      },
      {
        t: "p",
        text: `**Sé de los discípulos de Aarón.** La enseñanza de Hilel sobre la paz y el amor conecta con su aforismo en Avot 1:12, que funciona como el comentario de su vida a la escena de Shabat 31a:`,
      },
      {
        t: "verse",
        he: "הֱוֵי מִתַּלְמִידָיו שֶׁל אַהֲרֹן, אוֹהֵב שָׁלוֹם וְרוֹדֵף שָׁלוֹם, אוֹהֵב אֶת הַבְּרִיּוֹת וּמְקָרְבָן לַתּוֹרָה",
        es: "Sé de los discípulos de Aarón: ama la paz, persigue la paz, ama a las criaturas y acércalas a la Torá.",
        ref: "Pirké Avot 1:12 ✅",
        sefaria: "Pirkei Avot 1:12",
      },
      {
        t: "p",
        text: `Aarón, el hermano de Moshé y Sumo Sacerdote, es recordado en la tradición por ser un hacedor de paz entre los que peleaban ⚠️ (Avot de-Rabí Natán 12 — tradición). La fórmula de Hilel tiene un orden: primero *oheiv shalom* ("ama la paz" — la disposición interior), luego *rodef shalom* ("persigue la paz" — la acción activa). No basta con querer la paz: hay que ir a buscarla. Luego: *oheiv et ha-briyot* ("ama a las criaturas") — no solo a los sabios, no solo a los judíos: a los seres humanos en general. Y recién entonces: *umekarevam la-Torá* ("acércalas a la Torá"). El orden no es casual: primero el amor, después el estudio. La Torá que llega sin amor no se queda.`,
      },
      {
        t: "p",
        text: `**La inversión de Hilel como método hermenéutico.** Lo que Hilel hace en Shabat 31a no es solo ética: es hermenéutica. Toma la Torá entera y la reduce a su principio organizador — exactamente lo que Rashi hace cuando dice *"¿por qué empieza la Torá con la Creación?"*: busca el principio que da forma al todo. Hilel, al responder *"eso es toda la Torá; el resto es comentario"*, usa la misma lógica: toda la arquitectura de 613 mandamientos tiene un cimiento. El cimiento es no hacer al otro lo que uno no quiere que le hagan. Todo lo demás es la elaboración de ese cimiento en situaciones concretas.`,
      },
    ],
    contemplacion: [
      "Hilel no simplificó la Torá: la destilló. Hay una diferencia. Simplificar es quitar; destilar es encontrar lo que está debajo de todo. *Zil gemor* — 've y aprende' — no es despedida: es la apertura de un camino infinito a partir de una sola piedra. La sola frase que sostiene todo el edificio.",
      "¿Cuántas veces actúas hacia otro de una manera que no tolerarías que te hicieran a ti? No como reproche — como observación honesta. Esa observación es el comienzo del trabajo que Hilel señaló.",
    ],
    accion: {
      text: [
        `Lee la historia de Hilel y el proselito en Sefaria (busca "Shabbat 31a" — el pasaje está cerca del inicio del texto). Lee solo ese fragmento. Escribe: ¿por qué crees que Shamai rechazó la petición y Hilel la aceptó? ¿Hay diferencia real entre "no hagas a tu prójimo lo que te desagrada" y "haz a tu prójimo lo que quisieras que te hicieran"? ¿Importa esa diferencia en la práctica?`,
      ],
      cta: { label: "Abrir Shabat 31a en Sefaria →", ref: "Shabbat 31a" },
    },
    sello:
      "Hilel, Shabat 31a ✅: *da-alaj sani le-javrejá lá ta'avéd* — lo que a ti te es odioso, no se lo hagas a tu compañero. *Zo hi kol ha-Torá kula; ve-idaj pirushá hu; zil gemor* — eso es toda la Torá; el resto es comentario; ve y aprende. Base: Levítico 19:18 ✅ (*ve-ahavta le-reajá kamocha*). Avot 1:12 ✅: ama la paz, persigue la paz, ama a las criaturas — primero el amor, después el estudio.",
    hilos: [
      { kind: "study", ref: "cadena-zugot", label: "Hilel cierra la lista de los zugot — su enseñanza es el destilado de toda la cadena desde el Sinaí." },
      { kind: "study", ref: "cuatro-pardes", label: "El mismo Hilel que destila la Torá en una frase, enseña que toda ella es un camino infinito. La próxima lección: cuatro sabios que entraron a ese camino más hondo de lo que podían sostener." },
    ],
    fuentes: [
      "Talmud Bavlí, Shabat 31a ✅ (Hilel y el proselito — texto arameo completo)",
      "Vayikrá / Levítico 19:18 ✅ (ve-ahavta le-reajá kamocha — la fuente tanaítica)",
      "Pirké Avot 1:12 ✅ (sé de los discípulos de Aarón — la vida de Hilel como comentario)",
      "Mateo 7:12 — fuente externa para el contraste negativo/positivo (no es fuente judía; se cita para el debate pedagógico sobre la diferencia de formulación)",
    ],
    tarea: {
      semana: 24,
      herramienta: "Análisis comparativo: formulación negativa vs. positiva de la Regla de Oro",
      enunciado:
        "Lee Shabat 31a (busca en Sefaria 'Shabbat 31a' — la historia de Hilel y el proselito). Escribe: (1) ¿por qué Shamai lo rechazó? (2) ¿qué dijo Hilel? (3) ¿hay diferencia entre 'no hagas a tu prójimo lo que te desagrada' y 'haz a tu prójimo lo que quisieras que te hicieran'? ¿Importa la diferencia? (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L25 ───────────────────────────────────────────────────────────────────
  {
    n: 25,
    id: "E2·S2·L25",
    slug: "cuatro-pardes",
    title: "Los cuatro que entraron al Pardés — por qué los cimientos importan",
    apertura: {
      question:
        "Cuatro sabios entraron al huerto de los secretos. Solo uno salió entero. ¿Por qué?",
    },
    estudio: [
      {
        t: "p",
        text: `**Una historia que ya conoces desde el principio.** En la Lección 5 de T1 — la primera vez que aprendiste sobre PaRDeS — encontraste esta historia como advertencia fundacional: por qué la Cabalá llega al final del camino y no al principio. Ahora, en el corazón de la ética de Pirké Avot, volvemos a la misma historia con nuevas herramientas. Lo que antes era una advertencia se vuelve una pregunta concreta: *¿qué tenía Rabí Akivá que los otros tres no tenían?*`,
      },
      {
        t: "verse",
        he: "אַרְבָּעָה נִכְנְסוּ לַפַּרְדֵּס: בֶּן עַזַּאי, וּבֶן זוֹמָא, וְאַחֵר, וְרַבִּי עֲקִיבָא. בֶּן עַזַּאי הֵצִיץ וָמֵת. בֶּן זוֹמָא הֵצִיץ וְנִפְגַּע. אַחֵר קִצֵּץ בַּנְּטִיעוֹת. רַבִּי עֲקִיבָא עָלָה בְשָׁלוֹם וְיָרַד בְּשָׁלוֹם",
        es: "Cuatro entraron al Pardés: Ben Azay, Ben Zomá, Ajer y Rabí Akivá. Ben Azay miró y murió. Ben Zomá miró y fue herido. Ajer cortó los brotes. Rabí Akivá ascendió en paz y descendió en paz.",
        ref: "Talmud Bavlí, Jaguigá 14b ✅",
        sefaria: "Hagigah 14b",
      },
      {
        t: "p",
        text: `**Los cuatro protagonistas.** Ben Azay, Ben Zomá y Ajer (que significa "el otro" — el nombre de Elisha ben Avuyá después de que se alejó de la tradición) eran contemporáneos de Rabí Akivá, todos eruditos de primerísimo nivel. El Talmud los cita con veneración en muchos contextos antes de esta historia. La tragedia del Pardés no es el fracaso de personas mediocres: es el quiebre de personas brillantes sin los cimientos correctos.`,
      },
      {
        t: "p",
        text: `**Qué significa "entrar al Pardés".** El término *pardés* (פַּרְדֵּ"ס) en este contexto no es literal — no hay un jardín físico. Es la entrada al nivel más profundo del conocimiento místico: la contemplación de los secretos divinos (*maaseh merkavá* — el relato de la Carroza de Ezequiel 1, el pasaje más restrictivo de la tradición, que no se enseñaba públicamente). La expresión "cortó los brotes" (*kitzetz ba-neti'ot*, קִצֵּץ בַּנְּטִיעוֹת) usada para Ajer describe simbólicamente el acto de herejía: separar los frutos del árbol de su raíz, llevarse los conocimientos de Dios sin llevarlos a Dios mismo.`,
      },
      {
        t: "p",
        text: `**Los tres que no salieron enteros.**`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Ben Azay** *"miró y murió"*: se entiende ⚠️ (tradición talmúdica) que su alma no pudo regresar al cuerpo después de la intensidad de la visión. El *arrepentimiento* de no tener que lidiar con las obligaciones mundanas — pues Ben Azay nunca se casó — quizás también contribuyó: entró sin el anclaje que da la vida concreta.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Ben Zomá** *"miró y fue herido"*: el Talmud entiende que perturbó su mente (*nifga*, נִפְגַּע). La misma mishná de Avot que enseña las cuatro preguntas — que estudiaremos en la próxima lección — es de Ben Zomá. Hay una amarga ironía: quien enseñó que el verdadero sabio es "el que aprende de todo hombre" (Avot 4:1 ✅), no logró integrar lo que aprendió en el Pardés.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Ajer / Elisha ben Avuyá** *"cortó los brotes"*: la tradición lo recuerda como el gran hereje del período rabínico, que vio en la multiplicidad divina una dualidad ("dos poderes en el cielo") ⚠️ (Jaguigá 15a). El conocimiento místico sin la ética de la unidad llevó a la fragmentación.`,
      },
      {
        t: "p",
        text: `**Rabí Akivá — lo que lo diferenció.** ¿Qué tenía Akivá? Los comentaristas clásicos ⚠️ señalan varias cosas: la solidez de sus cimientos talmúdicos (el Talmud lo llama "el padre de toda la Torá oral"), su amor a Israel que nunca cedió incluso durante la persecución romana, y su fe inquebrantable. Pero hay algo más concreto que este módulo puede aportar: Akivá era un hombre que **había integrado los tres pilares de Avot 1:2** antes de entrar al Pardés. Estudió sin pausa (Torá). Amó con intensidad y servicio (Avodá). Y actuó hacia los demás con una bondad que la tradición preserva en múltiples historias (Guemilut Jasadim). Los cimientos no eran solo intelectuales: eran éticos y prácticos.`,
      },
      {
        t: "p",
        text: `**Los cuatro tipos de estudiante (Avot 5:12).** Pirké Avot 5:12 ✅ ofrece una tipología de cuatro estudiantes que resuena directamente con la historia del Pardés:`,
      },
      {
        t: "verse",
        he: "אַרְבַּע מִדּוֹת בְּיוֹשְׁבֵי לִפְנֵי חֲכָמִים: סְפוֹג, וּמַשְׁפֵּךְ, וּמְשַׁמֶּרֶת, וְנָפָה",
        es: "Cuatro tipos hay entre los que se sientan ante los sabios: la esponja, el embudo, el colador y el cedazo.",
        ref: "Pirké Avot 5:12 ✅",
        sefaria: "Pirkei Avot 5:12",
      },
      {
        t: "p",
        text: `La esponja (*sfog*) absorbe todo sin discriminar. El embudo (*mashpej*) entra por un lado y sale por el otro — no retiene nada. El colador (*meshameret*) deja pasar el vino bueno y retiene el poso. El cedazo (*nafá*) deja pasar el polvo fino y retiene la sémola — lo más valioso. El tipo ideal es el cedazo: retiene lo que nutre y deja ir lo que no sirve. Ben Azay puede haber sido la esponja que absorbió sin filtro; Ajer, el colador al revés — se quedó con el poso y dejó ir el vino. Rabí Akivá fue el cedazo: entró con discernimiento, retuvo lo que podía sostenerse en la vida ética, y salió entero.`,
      },
      {
        t: "p",
        text: `**La conexión con Ben Zomá y la próxima lección.** Ben Zomá, que fue herido en el Pardés, es también el autor de las cuatro preguntas que estudiaremos en L26. Hay una lectura en dos voces: el mismo hombre que preguntó *"¿quién es sabio?"* (el que aprende de todo hombre) fue incapaz de integrar lo que aprendió más allá de sus límites. La historia del Pardés no es una condena a Ben Zomá: es la prueba de que las mejores preguntas y los mejores principios no garantizan la llegada — se necesita también la estructura ética y la humildad que los sostiene.`,
      },
    ],
    contemplacion: [
      "Cuatro sabios, cuatro resultados distintos ante la misma experiencia. Lo que los diferenció no fue la inteligencia ni el conocimiento previo — todos eran grandes eruditos. Lo que los diferenció fue la integración: el trabajo de unir el estudio con la ética y la acción antes de entrar a lo más profundo.",
      "¿En qué áreas de tu vida sabes cosas que todavía no has integrado — que están en tu cabeza pero aún no en tu conducta? Esa brecha es el espacio que Pirké Avot trabaja.",
    ],
    accion: {
      text: [
        `Lee Jaguigá 14b en Sefaria (busca "Hagigah 14b" — el pasaje del Pardés). Lee solo el párrafo de la historia de los cuatro. Escribe en tu cuaderno: ¿qué crees que significa "entrar al Pardés" en este contexto? ¿Por qué Ben Azay murió, Ben Zomá fue herido y Ajer cortó los brotes? ¿Qué tenía Rabí Akivá que los otros no?`,
      ],
      cta: { label: "Abrir Jaguigá 14b en Sefaria →", ref: "Hagigah 14b" },
    },
    sello:
      "Jaguigá 14b ✅: cuatro entraron al Pardés — Ben Azay (murió), Ben Zomá (fue herido), Ajer/Elisha ben Avuyá (se volvió hereje), Rabí Akivá (entró y salió en paz). La diferencia no fue talento sino integración ética. Avot 5:12 ✅: el cedazo es el tipo ideal de estudiante — retiene lo que nutre, deja ir lo que no. Los cimientos de Avot 1:2 (Torá, Avodá, Guemilut Jasadim) son la condición de entrar al Pardés sin quebrarse.",
    hilos: [
      { kind: "study", ref: "ben-zoma", label: "Ben Zomá fue herido en el Pardés — pero sus cuatro preguntas sobre el verdadero poder, la riqueza y la sabiduría son el corazón de la ética que podría haberlo sostenido." },
      { kind: "study", ref: "que-es-pardes", label: "Vuelves al PaRDeS ya con la historia completa: ¿qué ves ahora que no veías en T1?" },
    ],
    fuentes: [
      "Talmud Bavlí, Jaguigá 14b ✅ (los cuatro del Pardés — texto completo)",
      "Pirké Avot 5:12 ✅ (los cuatro tipos de estudiante: esponja, embudo, colador, cedazo)",
      "Pirké Avot 4:1 ✅ (Ben Zomá: ¿quién es sabio? El que aprende de todo hombre — la ironía del Pardés)",
      "Jaguigá 15a ⚠️ (el dualismo de Ajer — 'dos poderes en el cielo' — fuente del alejamiento de Elisha ben Avuyá)",
    ],
    tarea: {
      semana: 25,
      herramienta: "Conectar la historia del Pardés con la tipología del estudiante (Avot 5:12)",
      enunciado:
        "Lee Jaguigá 14b (busca 'Hagigah 14b' en Sefaria — el pasaje del Pardés). Escribe: ¿qué crees que significa 'entrar al Pardés' en este contexto? ¿Por qué Ben Azay murió, Ben Zomá fue herido y Ajer cortó los brotes? ¿Qué tenía Rabí Akivá que los otros no? (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L26 ───────────────────────────────────────────────────────────────────
  {
    n: 26,
    id: "E2·S2·L26",
    slug: "ben-zoma",
    title: "Ben Zomá: cuatro preguntas que invierten el mundo",
    apertura: {
      question:
        "¿Quién es realmente fuerte? ¿Realmente rico? Ben Zomá da cuatro respuestas que nadie esperaba.",
    },
    estudio: [
      {
        t: "p",
        text: `**Ben Zomá pregunta lo que todos creen saber.** En la lección anterior encontraste a Ben Zomá en el Pardés, herido. Ahora lo encuentras en su mejor momento: en sus cuatro preguntas de Pirké Avot 4:1. Son cuatro preguntas que toman palabras del vocabulario cotidiano — fuerza, riqueza, sabiduría, honor — y las vacían de su significado ordinario para llenarlo con otro. El texto hebreo:`,
      },
      {
        t: "verse",
        he: "אֵיזֶהוּ חָכָם, הַלּוֹמֵד מִכָּל אָדָם. אֵיזֶהוּ גִבּוֹר, הַכּוֹבֵשׁ אֶת יִצְרוֹ. אֵיזֶהוּ עָשִׁיר, הַשָּׂמֵחַ בְּחֶלְקוֹ. אֵיזֶהוּ מְכֻבָּד, הַמְכַבֵּד אֶת הַבְּרִיּוֹת",
        es: "¿Quién es sabio? El que aprende de todo hombre. ¿Quién es fuerte (gibor)? El que domina su impulso. ¿Quién es rico? El que se alegra con su parte. ¿Quién es honorado? El que honra a las criaturas.",
        ref: "Pirké Avot 4:1 ✅",
        sefaria: "Pirkei Avot 4:1",
      },
      {
        t: "p",
        text: `**La inversión del primer valor: la sabiduría.** Para el mundo antiguo y moderno, el sabio es el que sabe más, el que acumuló más conocimiento, el que tiene más títulos. Ben Zomá pregunta: *¿quién es sabio?* — y responde: el que aprende de **todo** hombre. No del maestro más erudito, no del más anciano, no del más conocido: de *todo hombre*. La sabiduría verdadera no se construye con la acumulación de lo ya conocido sino con la **apertura constante a lo que el otro tiene que enseñar**. El sabio de Ben Zomá es eterno principiante: cada persona que encuentra es una fuente potencial.`,
      },
      {
        t: "p",
        text: `**La inversión del segundo valor: la fuerza.** El hebreo usa **גִּבּוֹר** (*gibor*), que significa "guerrero, héroe", la fuerza que derriba ejércitos. Ben Zomá pregunta: *¿quién es el verdadero gibor?* Y responde: el que **domina su propio impulso** (*ha-kovesh et yitzro*, הַכּוֹבֵשׁ אֶת יִצְרוֹ). Ya los Proverbios lo habían dicho:`,
      },
      {
        t: "verse",
        he: "טוֹב אֶרֶךְ אַפַּיִם מִגִּבּוֹר, וּמֹשֵׁל בְּרוּחוֹ מִלֹּכֵד עִיר",
        es: "Mejor es el longánime que el guerrero, y el que domina su espíritu que el que conquista una ciudad.",
        ref: "Mishlé / Proverbios 16:32 ✅",
        sefaria: "Proverbs 16:32",
      },
      {
        t: "p",
        text: `El *yetzer* (יֵצֶר) que Ben Zomá menciona es el **impulso** — la tradición rabínica distingue el *yetzer ha-tov* (impulso al bien) y el *yetzer ha-ra* (impulso al mal). Dominar el propio impulso no significa suprimirlo: el Talmud enseña ⚠️ que sin el *yetzer ha-ra* nadie construiría casas ni tendría hijos — la energía del impulso es necesaria, pero necesita dirección. La fuerza que Ben Zomá exalta es la del autorregulación interior: más difícil de conquistar que cualquier ejército externo.`,
      },
      {
        t: "p",
        text: `**La inversión del tercer valor: la riqueza.** La pregunta es *¿quién es rico?* — y la respuesta es: el que se **alegra con su parte** (*ha-sameaj be-jelko*, הַשָּׂמֵחַ בְּחֶלְקוֹ). La fuente del Tanaj:`,
      },
      {
        t: "verse",
        he: "יְגִיעַ כַּפֶּיךָ כִּי תֹאכֵל, אַשְׁרֶיךָ וְטוֹב לָךְ",
        es: "El trabajo de tus manos cuando comas — dichoso serás y te irá bien.",
        ref: "Tehilim / Salmos 128:2 ✅",
        sefaria: "Psalms 128:2",
      },
      {
        t: "p",
        text: `No es resignación pasiva: es el *simjá* (שִׂמְחָה, alegría) que nace de saber que lo que tienes es suficiente. El rico que Ben Zomá describe no tiene más que el pobre — pero experimenta lo que tiene de manera diferente. El Jasidut ⚠️ desarrollará esto en la categoría del *samea be-jelko* como estado espiritual activo, no como conformismo. La persona que no puede encontrar satisfacción en ningún estado de bienestar no alcanzará la riqueza por más que acumule; la persona que sabe encontrar satisfacción en lo que tiene ya **es** rica.`,
      },
      {
        t: "p",
        text: `**La inversión del cuarto valor: el honor.** *¿Quién es honorado?* — el que honra a las criaturas. No el que tiene poder ni el que acumula respeto de los demás: el que da honor. El honor es una moneda que crece cuando se gasta. La paradoja ética de Ben Zomá: para recibir honor real, hay que empezar por darlo. El que busca que lo honren, raramente lo logra de manera duradera; el que honra a todo el que encuentra, recibe honor como consecuencia de su carácter.`,
      },
      {
        t: "p",
        text: `**Las cuatro inversiones como sistema.** Ben Zomá no está haciendo cuatro observaciones independientes: está construyendo un mapa del carácter del estudiante de Torá. El sabio escucha (apertura). El fuerte se gobierna (disciplina). El rico da gracias (contentamiento). El honorado da honor (generosidad). Son las cuatro dimensiones de la persona que puede entrar al Pardés y salir entero — las cuatro cosas que Rabí Akivá tenía, según esta lectura, y los otros tres no.`,
      },
    ],
    contemplacion: [
      "Ben Zomá fue herido en el Pardés. Y sin embargo dejó estas cuatro enseñanzas que siguen vivas dos mil años después. Quizás la herida misma fue el precio de una visión demasiado intensa para sus cimientos de entonces. El estudio honesto incluye reconocer que incluso los más grandes llegaron a sus límites. El límite no cancela el aporte.",
      "¿Cuál de las cuatro inversiones de Ben Zomá te resulta más difícil de aceptar? La resistencia es el punto de entrada al trabajo.",
    ],
    accion: {
      text: [
        `Lee Avot 4:1 en Sefaria. Elige una de las cuatro preguntas de Ben Zomá que más te impacta. Escribe en tu cuaderno: (1) la pregunta y la respuesta de Ben Zomá, (2) por qué te impacta, (3) cómo cambia tu perspectiva sobre ese concepto (fuerza, riqueza, sabiduría u honor). Sé concreto — da un ejemplo de tu propia vida.`,
      ],
      cta: { label: "Abrir Avot 4:1 en Sefaria →", ref: "Pirkei Avot 4:1" },
    },
    sello:
      "Ben Zomá, Avot 4:1 ✅: cuatro inversiones éticas. Sabio = el que aprende de todo hombre. Fuerte (gibor) = el que domina su impulso (base: Proverbios 16:32 ✅). Rico = el que se alegra con su parte (base: Salmos 128:2 ✅). Honorado = el que honra a las criaturas. Las cuatro son el retrato del estudiante que puede entrar al Pardés y salir entero.",
    hilos: [
      { kind: "study", ref: "cuatro-pardes", label: "Ben Zomá fue herido en el Pardés — sus cuatro preguntas son el mapa del carácter que faltaba." },
      { kind: "study", ref: "kinyan-torah", label: "Las cuatro virtudes de Ben Zomá se amplían en los 48 modos de adquirir la Torá que cierra este módulo." },
    ],
    fuentes: [
      "Pirké Avot 4:1 ✅ (las cuatro preguntas de Ben Zomá — texto hebreo completo)",
      "Mishlé / Proverbios 16:32 ✅ (el longánime es más que el guerrero — base de 'gibor')",
      "Tehilim / Salmos 128:2 ✅ (el trabajo de tus manos — base de 'rico')",
    ],
    tarea: {
      semana: 26,
      herramienta: "Identificar y aplicar las cuatro inversiones éticas de Ben Zomá",
      enunciado:
        "Lee Avot 4:1 (Ben Zomá). Elige una de las cuatro preguntas que más te impacta. Escribe: (1) la pregunta y la respuesta de Ben Zomá, (2) por qué te impacta, (3) cómo cambia tu perspectiva sobre ese concepto (fuerza, riqueza, sabiduría u honor). (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L27 ───────────────────────────────────────────────────────────────────
  {
    n: 27,
    id: "E2·S2·L27",
    slug: "kinyan-torah",
    title: "La Torá como corona — los 48 modos de adquirirla",
    apertura: {
      question:
        "¿Cómo se 'adquiere' la Torá? La Mishná da 48 respuestas. Aquí están las más importantes.",
    },
    estudio: [
      {
        t: "p",
        text: `**El capítulo que cierra todo.** El capítulo 6 de Pirké Avot — técnicamente la *Baraita de Kinyan Torah* ⚠️, incluida como apéndice al tratado desde la época geónica — abre con una afirmación que pone en perspectiva todo lo que se ha estudiado en S2:`,
      },
      {
        t: "verse",
        he: "אֵין לְךָ בֶן חוֹרִין אֶלָּא מִי שֶׁעוֹסֵק בְּתַלְמוּד תּוֹרָה",
        es: "No hay libre sino el que se ocupa del estudio de la Torá.",
        ref: "Pirké Avot 6:2 ✅",
        sefaria: "Pirkei Avot 6:2",
      },
      {
        t: "p",
        text: `La paradoja de esta afirmación es la que Pirké Avot ha preparado desde el principio: la Torá no es una obligación que esclaviza — es la práctica que libera. ¿Libera de qué? Del capricho del propio impulso no gobernado (ya lo vimos en Ben Zomá), de la tiranía de las opiniones externas sobre quién eres (ya lo vimos en la controversia *lishem shamáyim*), del mundo que valora la fuerza, la riqueza y el honor según parámetros que no te pertenecen. El que estudia ya no necesita el aprobado del mundo para saber quién es.`,
      },
      {
        t: "p",
        text: `**La Torá no está en el cielo.** Deuteronomio 30:12 ✅ dice una cosa asombrosa:`,
      },
      {
        t: "verse",
        he: "לֹא בַשָּׁמַיִם הִוא",
        es: "No está en el cielo.",
        ref: "Devarim / Deuteronomio 30:12 ✅",
        sefaria: "Deuteronomy 30:12",
      },
      {
        t: "p",
        text: `El contexto completo del versículo es: *"No está en el cielo, para que digas: ¿quién subirá al cielo para buscárnosla y nos la hará oír para que la cumplamos?"* La Torá fue dada a los seres humanos para ser vivida en la tierra. Es accesible. Y el Talmud lleva esta enseñanza hasta su consecuencia más radical: en la famosa discusión del horno de Ajnai (Bava Metziá 59b ✅), cuando una voz del cielo dice que la ley es como la minoría que ha estado argumentando, Rabí Yehoshúa responde citando este mismo versículo: *"no está en el cielo"* — la autoridad de interpretación fue transferida a los seres humanos. Eso es también una forma de libertad: la Torá te fue entregada, y la responsabilidad de interpretarla honestamente es tuya.`,
      },
      {
        t: "p",
        text: `**Los 48 modos de adquirir la Torá (Avot 6:6).** El texto de Avot 6:6 ✅ lista 48 atributos con los que se "adquiere" la Torá — una lista que en su plenitud requeriría un módulo entero. Para este nivel pedagógico, el Sofer selecciona los más relevantes para el estudiante de Shoel, con el texto hebreo de cada uno:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**שְׁמִיעַת הָאֹזֶן** (*shemiát ha-ozen*) — "escuchar con el oído". No leer por encima: escuchar. El nombre del proyecto — *jashmal* — lleva este principio desde el inicio: primero el silencio que escucha (*jash*), después la palabra que responde (*mal*). ✅`,
      },
      {
        t: "p",
        tone: "item",
        text: `**שְׁאֵלָה** (*sheilá*) — "preguntar". El grado en el que estás — SHOEL, שׁוֹאֵל — lleva este modo en su nombre. El que pregunta ya está adquiriendo. ✅`,
      },
      {
        t: "p",
        tone: "item",
        text: `**הוֹסָפָה** (*hosafá*) — "añadir". Cada lección que estudias se añade a las anteriores — no reemplaza, acumula. La Torá se adquiere en capas. ✅`,
      },
      {
        t: "p",
        tone: "item",
        text: `**הֲבָנַת הַלֵּב** (*havanat ha-lev*) — "comprensión del corazón". El corazón (*lev*, לֵב = 32 = los 32 senderos de la sabiduría 🔢) no es solo el centro emocional — en el pensamiento bíblico es el centro del entendimiento. Aprender "de corazón" significa integrar, no solo memorizar. ✅`,
      },
      {
        t: "p",
        tone: "item",
        text: `**כִּבּוּד רַב וּמוֹרֶה** (*kibud rav u-moré*) — "honrar al maestro y al que enseña". La Torá se adquiere también por la relación con quien la transmite. No por deferencia ciega — sino por el reconocimiento de que alguien invirtió años de vida en lo que te está dando en una hora. ✅`,
      },
      {
        t: "p",
        tone: "item",
        text: `**אֲהָבַת הָאֱמֶת** (*ahavat ha-emet*) — "amor a la verdad". El que ama la verdad acepta cuando se equivoca. El que ama tener razón no aprende nunca. Esta distinción separa el estudio auténtico de la performance del estudio. ✅`,
      },
      {
        t: "p",
        tone: "item",
        text: `**אֲהָבַת הַתּוֹכָחוֹת** (*ahavat ha-tojajot*) — "amor a las reprensiones". El estudiante maduro no solo tolera el feedback correctivo: lo busca. Sin corrección, no hay crecimiento. La misma disciplina que Rashi ejerció cuando dijo *"yo vine solo al Pshat"* — la honestidad de reconocer los propios límites. ✅`,
      },
      {
        t: "p",
        text: `**La Torá como corona — y como camino.** El título del capítulo — *Kinyan Torah*, "adquisición de la Torá" — usa el verbo *kanah* (קָנָה, "adquirir, comprar"). La Torá no se hereda ni se recibe pasivamente: se *adquiere* — se trabaja por ella, se construye con esfuerzo constante. Avot 6:1 ✅ dice que quien estudia Torá *lishmá* (לִשְׁמָהּ, "por ella misma", por amor a la verdad y no por honor o recompensa) adquiere muchas cosas valiosas. Y Avot 6:2 concluye: esa persona es libre. La corona no está en ningún trono externo — está en la persona que llegó a ese punto de integración.`,
      },
      {
        t: "p",
        text: `**Apertura de S3 — la Torá oral.** Has llegado al fin de S2 con los cimientos éticos que sostienen el estudio. Conoces los tres pilares del mundo. Conoces la cadena y los pares que la transmitieron. Conoces la Regla de Oro y por qué empieza por no dañar. Conoces el peligro del conocimiento sin ética y los cuatro tipos de estudiante. Conoces las cuatro inversiones que definen el verdadero poder, la verdadera riqueza. Y conoces los modos en que la Torá se adquiere — escuchar, preguntar, añadir, comprender con el corazón. Con esa ética en la mano, el módulo S3 te abre la pregunta que Hilel ya planteó: *"Ve y aprende."* ¿Aprender qué? La otra mitad de la Torá — la que nunca se escribió. La Torá oral.`,
      },
    ],
    contemplacion: [
      "Los 48 modos de adquirir la Torá no son 48 técnicas de estudio: son 48 formas de ser. El que escucha, pregunta, añade, comprende con el corazón, honra, ama la verdad y acepta la corrección — esa persona no 'tiene' la Torá como un objeto: *es* un estudiante de Torá. La distinción entre tener y ser es la diferencia entre la esponja y el cedazo.",
      "Terminas S2 con la ética de los padres en las manos. El edificio del estudio necesita estos cimientos para no derrumbarse cuando llegues a los niveles más altos. La aurora no deja de crecer — pero crece desde la base.",
    ],
    accion: {
      text: [
        `Lee Avot 6:2 en Sefaria. Escribe en tu cuaderno: ¿qué significa que 'no hay libre sino el que estudia Torá'? ¿En qué sentido el estudio libera? Da al menos un ejemplo concreto de tu experiencia — un momento en que aprender algo te liberó de algo (un miedo, un error, una creencia que ya no te servía).`,
      ],
      cta: { label: "Abrir Avot 6:2 en Sefaria →", ref: "Pirkei Avot 6:2" },
    },
    sello:
      "Avot 6:2 ✅: *ein lejá ben jorin ela mi she-osek be-talmud Torah* — no hay libre sino el que estudia Torá. Deuteronomio 30:12 ✅: la Torá no está en el cielo — fue entregada a los seres humanos para ser vivida y transmitida. De los 48 modos de adquisición (Avot 6:6 ✅): escuchar, preguntar, añadir, comprender con el corazón, honrar al maestro, amar la verdad, amar la corrección. La corona no está en un trono externo — está en el carácter del que llegó.",
    hilos: [
      { kind: "study", ref: "ben-zoma", label: "Los 48 modos incluyen todos los atributos que Ben Zomá identificó como las cuatro inversiones — el mapa se cierra." },
      { kind: "study", ref: "tres-pilares", label: "Los tres pilares de Avot 1:2 sostenían el mundo. Los 48 modos de Avot 6:6 enseñan cómo construir en uno mismo esos tres pilares." },
    ],
    fuentes: [
      "Pirké Avot 6:2 ✅ (no hay libre sino el que estudia Torá)",
      "Pirké Avot 6:6 ✅ (los 48 modos de adquisición — selección pedagógica)",
      "Devarim / Deuteronomio 30:12 ✅ (la Torá no está en el cielo)",
      "Talmud Bavlí, Bava Metziá 59b ✅ (lo ba-shamáyim hi — Rabí Yehoshúa aplica Dt 30:12 al debate del horno de Ajnai)",
    ],
    tarea: {
      semana: 27,
      herramienta: "Reflexionar sobre la libertad que otorga el estudio (Avot 6:2)",
      enunciado:
        "Lee Avot 6:2. Escribe en tus palabras qué significa que 'no hay libre sino el que estudia Torá'. ¿Estás de acuerdo? ¿En qué sentido el estudio libera? (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
    closeModule:
      "Terminaste S2 — la ética de los padres. En seis semanas, el edificio que empezaste a construir con Rashi recibió sus cimientos éticos: los tres pilares que sostienen el mundo (Torá, Avodá, Guemilut Jasadim), la cadena de pares que lo transmitieron y el modelo de la controversia honesta, la Regla de Oro de Hilel y el llamado a aprender toda la vida, la historia de los cuatro del Pardés que muestra lo que pasa cuando el conocimiento supera la ética que lo sostiene, las cuatro inversiones de Ben Zomá que definen el verdadero poder, la riqueza, la sabiduría y el honor, y los 48 modos de adquirir la Torá que son también 48 formas de ser. Ahora Hilel ya te dijo: *zil gemor* — ve y aprende. ¿Aprender qué? La otra mitad de la Torá: la que no se escribió, la que viajó de boca en boca durante siglos hasta que fue necesario fijarla. El módulo S3 — la Torá oral — te espera con esa pregunta y su respuesta.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO5 = {
  id: "S2",
  he: "פִּרְקֵי אָבוֹת",
  titulo: "La ética de los padres",
  etapaHe: "שׁוֹאֵל",
  etapa: "Shoel",
  etapaGloss: "el que pregunta",
  etapaNum: 2,
  etapasTotal: 6,
  total: LESSONS5.length,
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson5(slug: string): Lesson | undefined {
  return LESSONS5.find((l) => l.slug === slug);
}

export function lessonIndex5(slug: string): number {
  return LESSONS5.findIndex((l) => l.slug === slug);
}

export function nextLesson5(slug: string): Lesson | null {
  const i = lessonIndex5(slug);
  return i >= 0 && i < LESSONS5.length - 1 ? LESSONS5[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 5 ──────────────────────────────
// Slugs internos del Módulo 5.
const INTERNAL_SLUGS5: Record<string, string> = {
  "tres-pilares": "tres-pilares",
  "cadena-zugot": "cadena-zugot",
  "hilel-regla-de-oro": "hilel-regla-de-oro",
  "cuatro-pardes": "cuatro-pardes",
  "ben-zoma": "ben-zoma",
  "kinyan-torah": "kinyan-torah",
};

// Slugs de módulos anteriores que deben resolver a sus rutas propias.
const CROSS_MODULE_HREFS5: Record<string, string> = {
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
};

const MISTERIO_SLUGS5 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread5(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS5[key]) return { kind: "lesson", slug: INTERNAL_SLUGS5[key] };
  if (MISTERIO_SLUGS5.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href completo para M5 — incluye cross-module overrides.
export function resolveThreadHref5(h: Hilo): string | null {
  if (h.kind === "letter") return `/letras/${h.ref}`;
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS5[key]) return `/academia/modulo-5/${key}`;
  if (CROSS_MODULE_HREFS5[key]) return CROSS_MODULE_HREFS5[key];
  if (MISTERIO_SLUGS5.has(key)) return `/misterio/${key}`;
  return null;
}
