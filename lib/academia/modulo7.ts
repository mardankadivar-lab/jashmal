// ─────────────────────────────────────────────────────────────────────────
// modulo7.ts — ACADEMIA DE JASHMAL · Módulo 7 (S4 · נְבִיאִים — "Los profetas").
// Las 2 lecciones de las semanas 33–34, cuarto y último módulo de SHOEL.
//
// El contenido (textos, citas, verificaciones) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - S4 - profetas (Sofer).md", 2026-06-17.
// Se monta TAL CUAL: no se inventa, altera ni agrega ninguna fuente.
//
// Sigue EXACTAMENTE la estructura de modulo6.ts.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView7 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── EX-3 — Expositivo 3 de SHOEL ────────────────────────────────────────────
// Al cierre de S4, semana 34.

export const EX3 = {
  numero: 3,
  nivel: "shoel",
  titulo: "Una voz del texto: leer con Rashi y escuchar al profeta",
  enunciado: `Elige UN texto de cualquier módulo de SHOEL (S1–S4): puede ser un comentario de Rashi que estudiaste, una mishná de Pirké Avot, un texto de la Torá oral (Mishná o Talmud), o uno de los textos proféticos de este módulo final. Ese texto será el objeto de tu expositivo. Aplica TODAS las herramientas que aprendiste en SHOEL:

1. Identifica la Queshtiá (הַשְּׁאֵלָה / הַקָּשֶׁה): ¿qué hay en el texto que requiere explicación? ¿qué palabra es inusual, redundante o difícil? ¿qué tensión o contradicción aparente hay? Formula la dificultad antes de responderla, al estilo de Rashi.

2. Lee con al menos un comentarista: Rashi es el primero, pero puedes usar también Ramban, Ibn Ezra, Sforno, u otro que encuentres en Sefaria. Cita al comentarista con referencia exacta (título de la obra + texto que comenta). Describe qué ve el comentarista que tú no habías visto antes de leer su comentario.

3. Distingue Pshat de Drash con nombres: identifica explícitamente qué parte de tu análisis está en el nivel Pshat (lo que el texto dice en su sentido literal) y qué parte está en el nivel Drash (lo que la tradición enseña a partir del texto). Usa esas palabras, con sus definiciones.

4. Aplica al menos una herramienta de las Middot de Hilel si aplica: si el texto lo permite, aplica al menos una de las Middot aprendidas (Kal va-Jómer, Guezará Shavá, Kelal u-Ferat, Davar ha-Lamed me-Inyano u otras). Si el texto no las activa naturalmente, explica por qué no.

5. Reflexión ética: conecta el texto con Pirké Avot (S2) o con el mensaje profético (S4). ¿Qué enseña el texto a la conducta, al carácter, a la relación con el prójimo?

Extensión: 2.000–3.000 palabras.`,
  palabrasMin: 2000,
  palabrasMax: 3000,
} as const;

// ── Las 2 lecciones (verbatim del Sofer, 2026-06-17) ─────────────────────────

export const LESSONS7: Lesson[] = [
  // ── L33 ───────────────────────────────────────────────────────────────────
  {
    n: 33,
    id: "E2·S4·L33",
    slug: "que-es-un-profeta",
    title: "¿Qué es un profeta? — la voz que no se inventa",
    apertura: {
      question:
        "¿Cómo se sabe si un profeta es verdadero? La Torá misma da el criterio.",
    },
    estudio: [
      {
        t: "p",
        text: `**El último módulo de SHOEL.** Llegaste aquí habiendo aprendido a interrogar el texto con Rashi (S1), recibido la ética que sostiene el estudio en Pirké Avot (S2), y comprendido la arquitectura de la Mishná y el Talmud (S3). Ahora, antes de cruzar a JAVER, la Academia te abre el tercer cuerpo del Tanaj — los Profetas. No para agotarlos: hay un nivel entero (JAVER) dedicado al trabajo interior que los profetas exigen. Pero sí para que sepas **qué es un profeta** y puedas leer una voz profética en Pshat, con las herramientas que ya tienes. Ese es el programa de estas dos últimas semanas de SHOEL.`,
      },
      {
        t: "p",
        text: `**El lugar de los Profetas en el Tanaj.** Ya lo sabes desde S3: el Tanaj es T-N-K — Torá, **Nevi'im** (נְבִיאִים, Profetas), Ketuvim (Escritos). Los Nevi'im son la segunda columna del edificio. Se dividen en dos grandes bloques, según el Talmud en Bava Batra 14b ✅:\n\n- **Neviim Rishonim** (נְבִיאִים רִאשׁוֹנִים, Primeros Profetas): Yehoshúa, Shoftim, Shmuel y Melajim — cuatro libros que cuentan la historia de Israel desde la entrada a Canaán hasta el exilio de Babilonia, narrando el drama del pueblo a través de la voz de profetas que corrigen a los reyes y al pueblo.\n- **Neviim Ajaronim** (נְבִיאִים אַחֲרוֹנִים, Últimos Profetas): los tres grandes — Yeshayá (Isaías), Yirmeyá (Jeremías), Yejezkel (Ezequiel) — y el libro de los Doce Profetas (שְׁנֵים עָשָׂר, Shném Asar: Hoshea, Yoel, Amós, Ovadyá, Yoná, Mijá, Najum, Javakuk, Tzefanyá, Jaguí, Zejaryá, Malají), contados como un solo volumen ✅ (Bava Batra 14b).`,
      },
      {
        t: "p",
        text: `**¿Por qué había profetas?** El versículo de Amós 3:7 da la respuesta más directa:`,
      },
      {
        t: "verse",
        he: "כִּי לֹא יַעֲשֶׂה אֲדֹנָי יְהֹוִה דָּבָר כִּי אִם גָּלָה סוֹדוֹ אֶל-עֲבָדָיו הַנְּבִיאִים",
        es: "Nada hace el Señor Dios sin revelar su secreto a sus siervos los profetas.",
        ref: "Amós 3:7 ✅",
        sefaria: "Amos 3:7",
      },
      {
        t: "p",
        text: `El profeta no es un adivino que predice el futuro mecánicamente, ni un mago que manipula fuerzas ocultas. Es **el mensajero de Dios ante el pueblo**: recibe la palabra divina (en hebreo, *dvar ha-Shem*, דְּבַר-יְהוָה, "la palabra de Dios") y la transmite. Y transmite, sobre todo, lo que el pueblo no quiere escuchar: que sus acciones presentes tienen consecuencias futuras. El profeta no predice el futuro como hecho consumado — **denuncia el presente y señala las consecuencias**. En ese sentido es un guardián, no un oráculo.`,
      },
      {
        t: "p",
        text: `**La Torá define al profeta — Deuteronomio 18:15–22.** Lo notable es que la Torá misma, antes de que existiera ningún profeta clásico, ya estableció los criterios para reconocerlo. No hay ningún otro texto en el mundo antiguo que proponga criterios de autenticidad profética con esta precisión. El texto es Deuteronomio 18:15–22 ✅, donde Moshé habla al pueblo antes de su muerte:`,
      },
      {
        t: "verse",
        he: "נָבִיא מִקִּרְבְּךָ מֵאַחֶיךָ כָּמֹנִי יָקִים לְךָ יְהוָה אֱלֹהֶיךָ אֵלָיו תִּשְׁמָעוּן",
        es: "Un profeta de entre vosotros, de entre vuestros hermanos, como yo, te levantará el Señor tu Dios; a él escucharéis.",
        ref: "Devarim / Deuteronomio 18:15 ✅",
        sefaria: "Deuteronomy 18:15",
      },
      {
        t: "p",
        text: `**Criterio 1: el profeta debe surgir del propio pueblo.** *"De entre vosotros, de entre vuestros hermanos"* (*mi-kirbejá, me-ajéjá*) — no es un extranjero enviado desde afuera, no es un extraño que dice hablar en nombre del Dios de Israel. El profeta verdadero es uno del pueblo: conoce su historia, comparte su vida, está enraizado en la misma tradición. Este criterio no es étnico sino **de pertenencia**: el profeta habla *desde adentro*, no como un observador externo. Moshé mismo — el profeta supremo — fue un hijo de Israel criado en el palacio del faraón, pero su identidad fue siempre la de *"uno de vuestros hermanos"*.`,
      },
      {
        t: "verse",
        he: "אַךְ הַנָּבִיא אֲשֶׁר יָזִיד לְדַבֵּר דָּבָר בִּשְׁמִי אֵת אֲשֶׁר לֹא-צִוִּיתִיו לְדַבֵּר וַאֲשֶׁר יְדַבֵּר בְּשֵׁם אֱלֹהִים אֲחֵרִים וּמֵת הַנָּבִיא הַהוּא",
        es: "Pero el profeta que presuma de hablar una palabra en mi nombre que yo no le haya mandado hablar, o que hable en nombre de dioses ajenos, ese profeta morirá.",
        ref: "Devarim / Deuteronomio 18:20 ✅",
        sefaria: "Deuteronomy 18:20",
      },
      {
        t: "p",
        text: `**Criterio 2: el profeta habla exclusivamente en nombre de Dios, no de dioses ajenos.** El versículo 18:20 establece una línea divisoria que no admite grises: el que habla en nombre de *elohim ajerim* ("dioses ajenos") no es profeta de Israel — su mensaje es nulo y él mismo está sujeto a la pena capital. Este criterio separa al navi (נָבִיא) del mago, del adivino, del augur: todos los cuales hablan en nombre de fuerzas que no son el Dios de Israel. La Torá los lista y los prohíbe en los versículos precedentes (18:10–12 ✅): el *kosem kesamim* (adivino), el *meonen* (augur), el *menajeish* (agorero), el *mejashef* (mago), el *jover jever* (hechicero), el *sho'el ov* (invocador de muertos), el *yd'oni* (nigromante). El navi verdadero es el **contrario** de todos estos: su fuente es una sola, su Señor es uno solo.`,
      },
      {
        t: "verse",
        he: "אֲשֶׁר יְדַבֵּר הַנָּבִיא בְּשֵׁם יְהוָה וְלֹא-יִהְיֶה הַדָּבָר וְלֹא יָבֹא הוּא הַדָּבָר אֲשֶׁר לֹא-דִבְּרוֹ יְהוָה בְּזָדוֹן דִּבְּרוֹ הַנָּבִיא לֹא תָגוּר מִמֶּנּוּ",
        es: "Cuando el profeta hable en nombre del Señor, y la palabra no se cumpla ni se realice, es una palabra que el Señor no habló; con soberbia la habló ese profeta; no lo temas.",
        ref: "Devarim / Deuteronomio 18:22 ✅",
        sefaria: "Deuteronomy 18:22",
      },
      {
        t: "p",
        text: `**Criterio 3: el cumplimiento de la profecía.** El tercer criterio es pragmático: si la profecía no se cumple, no es de Dios. La Torá es brutalmente honesta aquí — no protege al profeta de la verificación histórica. La profecía verdadera se cumple. La falsa, no. Y la Torá añade el veredicto sobre el falso profeta: *"con soberbia la habló"* (*be-zadon dibro*) — su error no fue ignorancia sino arrogancia, la presunción de hablar en nombre de Dios sin haber recibido su palabra. Y la orden al pueblo: *"no lo temas"* (*lo tagur mimenu*) — la autoridad del profeta falso no existe, aunque suene convincente.`,
      },
      {
        t: "p",
        text: `**Una limitación del tercer criterio — que el estudiante debe notar.** El criterio del cumplimiento (18:22) tiene una limitación práctica obvia: si la profecía anuncia un castigo futuro, ¿cómo sabe el pueblo en el presente si creerle o no? El profeta puede exigir cambio de conducta *ahora* — pero la verificación de su mensaje es *después*. Esta tensión la señala el propio Talmud en relación con Jeremías: el pueblo podía dudar de él en su momento, esperando ver si sus palabras se cumplían. La tradición rabínica resuelve este dilema con los dos primeros criterios como filtros primarios y el tercero como confirmación retrospectiva. Es una solución honesta — no cínica — que reconoce que el discernimiento profético es difícil en tiempo real.`,
      },
      {
        t: "p",
        text: `**La profecía cesó — y cuándo.** El Talmud Bavlí, en Yomá 9b ✅, declara:`,
      },
      {
        t: "verse",
        he: "מִשֶּׁמֵּתוּ נְבִיאִים הָאַחֲרוֹנִים חַגַּי זְכַרְיָה וּמַלְאָכִי פָּסְקָה רוּחַ הַקֹּדֶשׁ מִיִּשְׂרָאֵל",
        es: "Desde que murieron los últimos profetas — Jaguí (Hageo), Zejaryá (Zacarías) y Malají (Malaquías) — cesó el espíritu santo (rúaj ha-kodesh) de Israel.",
        ref: "Talmud Bavlí, Yomá 9b ✅",
        sefaria: "Yoma 9b",
      },
      {
        t: "p",
        text: `Malaquías es el último libro de los Nevi'im y también el último libro del Tanaj según el orden canónico. Su nombre en hebreo, **מַלְאָכִי** (*Malají*), significa "mi mensajero" ⚠️ (tradición: algunos comentaristas lo identificaron con Ezra el escriba, aunque la mayoría lo reconoce como un profeta independiente). Con Malaquías se cierra la era profética. El Talmud (Yomá 9b ✅) añade que aunque la profecía formal cesó, el pueblo no quedó completamente sin orientación divina: quedó la *bat kol* (בַּת קוֹל, "hija de la voz"), un eco divino más sutil, que en ocasiones el Talmud cita como fuente de dirección. Pero es un eco, no una voz plena. La era de los profetas clásicos, desde Moshé hasta Malaquías, no se repite.`,
      },
      {
        t: "p",
        text: `**El navi no es un mago: es un guardián.** Esta distinción es crucial para entender correctamente los textos proféticos. El profeta no predice el futuro como destino irrevocable. En la mayoría de los casos, lo que anuncia son **consecuencias de conductas presentes**, reversibles si el pueblo cambia (la teshuvá, תְּשׁוּבָה, el retorno). El libro de Yoná ilustrará esto en la próxima etapa (JAVER): el profeta anuncia destrucción, el pueblo se arrepiente, y la destrucción no ocurre. El "fracaso" de Yoná como predictor es su mayor éxito como profeta. El profeta verdadero **quiere** que su profecía negativa no se cumpla — porque lo que le importa no es tener razón sino que el pueblo cambie.`,
      },
    ],
    contemplacion: [
      "La Torá da tres criterios para reconocer a un profeta verdadero: pertenece al pueblo, habla solo en nombre de Dios, y su profecía se cumple. De los tres, solo el tercero es verificable después del hecho. Los dos primeros son verificables ahora mismo — en el presente. Eso nos enseña que la mayoría del discernimiento que se nos pide no exige esperar al futuro: exige observar el presente.",
      "El profeta no vino a predecir. Vino a corregir. Su voz incomoda precisamente porque dice lo que el pueblo — y el rey — preferiría no escuchar. Siempre fue más fácil ejecutar al profeta que cambiar la conducta. La Torá lo sabe y por eso el criterio del falso profeta es tan preciso: la arrogancia de hablar sin haber recibido. Y la advertencia al pueblo: 'no lo temas' — no dejes que el sonido de una voz valiente, o de una voz seductora, reemplace el discernimiento.",
    ],
    accion: {
      text: [
        `Lee Deuteronomio 18:15–22 completo en Sefaria. Escribe los tres criterios de autenticidad del profeta con tus propias palabras — una línea por criterio. Luego escribe: ¿cuál de los tres criterios te parece más difícil de aplicar en tiempo real? ¿Por qué?`,
      ],
      cta: { label: "Abrir Deuteronomio 18:15–22 en Sefaria →", ref: "Deuteronomy 18:15" },
    },
    sello:
      "La Torá define al profeta en Deuteronomio 18:15–22 ✅ con tres criterios: (1) surge del propio pueblo (18:15 ✅), (2) habla solo en nombre de Dios, no de dioses ajenos (18:20 ✅), (3) su profecía se cumple — si no se cumple, es profeta falso (18:22 ✅). El profeta no predice el futuro mecánicamente: denuncia el presente y señala consecuencias. La profecía clásica cesó con Malaquías (Talmud Bavlí, Yomá 9b ✅). Los Neviim se dividen en Rishonim (Yehoshúa, Shoftim, Shmuel, Melajim) y Ajaronim (Isaías, Jeremías, Ezequiel, los Doce) ✅ (Bava Batra 14b ✅).",
    hilos: [
      { kind: "study", ref: "amos-profeta-social", label: "Un profeta de los Doce en acción: Amós rechaza el culto vacío y exige justicia social." },
      { kind: "study", ref: "que-es-la-tora", label: "La Torá es la fuente de los criterios proféticos — regresa al primer módulo con nuevos ojos." },
    ],
    fuentes: [
      "Devarim / Deuteronomio 18:15 ✅ (criterio 1: el profeta surge del pueblo)",
      "Devarim / Deuteronomio 18:20 ✅ (criterio 2: habla solo en nombre de Dios)",
      "Devarim / Deuteronomio 18:22 ✅ (criterio 3: la profecía se cumple)",
      "Amós 3:7 ✅ (nada hace Dios sin revelarlo a sus profetas)",
      "Talmud Bavlí, Yomá 9b ✅ (la profecía cesó con Jaguí, Zejaryá y Malají)",
      "Talmud Bavlí, Bava Batra 14b ✅ (canon y orden de los Nevi'im)",
    ],
    tarea: {
      semana: 33,
      herramienta: "Lectura en Pshat de un texto legislativo de la Torá; identificación de criterios normativos; pensamiento crítico sobre un criterio hermenéutico (el del cumplimiento)",
      enunciado:
        "Lee Deuteronomio 18:15–22 en Sefaria. Escribe los tres criterios para reconocer a un profeta verdadero según el texto — un párrafo por criterio, con la referencia exacta del versículo donde aparece cada uno (18:15, 18:20, 18:22). Luego escribe: ¿te parece que estos criterios son suficientes para distinguir al profeta verdadero del falso? ¿Qué limitación ves en el tercer criterio — el del cumplimiento? (Pista: si la profecía anuncia algo para el futuro, ¿cómo sabe el pueblo en el presente si creerle o no?) (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L34 ───────────────────────────────────────────────────────────────────
  {
    n: 34,
    id: "E2·S4·L34",
    slug: "amos-profeta-social",
    title: "Amós: el profeta social — cuando Dios rechaza sus propias fiestas",
    apertura: {
      question:
        "Dios dice que odia las fiestas religiosas de su propio pueblo. ¿Qué quiere en cambio?",
    },
    estudio: [
      {
        t: "p",
        text: `**Amós — el primero de los profetas clásicos en el canon.** El libro de Amós es, en el orden canónico de los Doce Profetas, el tercero ✅ (Bava Batra 14b). Pero en la historia de la literatura profética, Amós ocupa un lugar especial: es el primer profeta del que conservamos un libro de discursos cuya fecha relativa el texto mismo declara (*"en los días de Uzziyá rey de Judá y en los días de Yerovam ben Yoash rey de Israel"*, Amós 1:1 ✅), situándolo en un período de prosperidad económica y corrupción social en el reino del Norte — el siglo VIII AEC según la cronología académica ⚠️. Su mensaje es tan nítido y tan radical que los dos últimos versículos que leeremos hoy siguen siendo citados en todo debate contemporáneo sobre religión y justicia.`,
      },
      {
        t: "p",
        text: `**Quién era Amós.** El propio libro lo declara: *"yo era boyero y recolector de sicomoros; el Señor me tomó de tras el rebaño y me dijo: ve, profetiza a mi pueblo Israel"* (Amós 7:14–15 ✅). Amós no era profeta de profesión, no pertenecía a ningún gremio de profetas. Era un trabajador rural — un hombre del campo — al que Dios llamó directamente. Este dato no es un adorno biográfico: ilumina la naturaleza de su mensaje. Amós habla con la claridad sin adornos del que no tiene nada que ganar con el poder establecido. No recibe salario del templo ni del rey. Su voz es libre.`,
      },
      {
        t: "p",
        text: `**El contexto: prosperidad y opresión simultáneas.** El reino de Israel bajo Yerovam II vivía un momento de expansión económica sin precedentes desde los días de Salomón. El comercio florecía, las casas de marfil se construían, las fiestas religiosas eran espléndidas, los sacrificios abundantes. Y al mismo tiempo — en el mismo momento, en el mismo pueblo — el sistema judicial estaba corrompido, los pobres eran vendidos por deudas mínimas (Amós 2:6 ✅), los ricos acumulaban sin límite, y los sacerdotes eran cómplices del sistema. El mesaje de Amós es que esas dos realidades no coexisten inocentemente: la prosperidad del templo y la opresión del pobre son la misma crisis.`,
      },
      {
        t: "p",
        text: `**Amós 5:21–24 — el corazón del libro.** Leemos en Pshat:`,
      },
      {
        t: "verse",
        he: "שָׂנֵאתִי מָאַסְתִּי חַגֵּיכֶם וְלֹא אָרִיחַ בְּעַצְּרֹתֵיכֶם׃ כִּי אִם-תַּעֲלוּ-לִי עֹלוֹת וּמִנְחֹתֵיכֶם לֹא אֶרְצֶה וְשֶׁלֶם מְרִיאֵיכֶם לֹא אַבִּיט׃ הָסֵר מֵעָלַי הֲמוֹן שִׁירֶיךָ וְזִמְרַת נְבָלֶיךָ לֹא אֶשְׁמָע׃ וְיִגַּל כַּמַּיִם מִשְׁפָּט וּצְדָקָה כְּנַחַל אֵיתָן",
        es: "Odio, desprecio vuestras fiestas, y no me complacen vuestras asambleas solemnes. Aunque me ofrezcáis holocaustos y vuestras ofrendas, no las aceptaré; ni miraré las ofrendas de paz de vuestros animales cebados. Aparta de mí el estrépito de tus canciones; y el sonido de tus instrumentos de cuerda no escucharé. Pero fluya el juicio como las aguas, y la justicia como arroyo imperecedero.",
        ref: "Amós 5:21–24 ✅",
        sefaria: "Amos 5:21",
      },
      {
        t: "p",
        text: `**Lectura en Pshat: lo que el texto dice exactamente.** El Pshat de Amós 5:21–24 es de una claridad devastadora — Dios habla en primera persona, sin alegorías, sin subtextos:\n\n- *"שָׂנֵאתִי"* (*sané'ti*) — "**odié**". El verbo es en pasado: no "odio" sino "odié". La realidad del rechazo divino ya ocurrió antes de que el pueblo lo supiera. Y se duplica: *מָאַסְתִּי* (*ma'ásti*) — "**desprecié**". Dos verbos de rechazo total, en primera persona divina, sobre las fiestas religiosas.\n- *"חַגֵּיכֶם"* (*jaguejem*) — "**vuestras fiestas**". El pronombre posesivo ("vuestras") es el filo: estas fiestas tienen dueño, y el dueño es el pueblo, no Dios. Dios no las reconoce como suyas.\n- Los sacrificios, las ofrendas, las canciones, los instrumentos — todo el aparato del culto — se rechaza. No porque el culto sea malo en sí: sino porque sin justicia social, el culto es un insulto.\n- El versículo final — *"וְיִגַּל כַּמַּיִם מִשְׁפָּט"* — no es una petición suave: es una exigencia que usa la imagen de la inundación. *"Fluya el juicio **como las aguas**"* (*ka-maym*) — no un hilo de agua, sino un torrente que arrasa. Y la justicia *"como arroyo imperecedero"* (*ke-najal eitan*) — no un río de temporada que se seca en verano, sino uno permanente, que nunca cesa.`,
      },
      {
        t: "p",
        text: `**Texto paralelo: Isaías 1:11–17.** Amós no está solo. Isaías, profeta del reino del Sur aproximadamente en el mismo período ⚠️, dice algo casi idéntico:`,
      },
      {
        t: "verse",
        he: "לָמָּה-לִּי רֹב-זִבְחֵיכֶם יֹאמַר יְהוָה שָׂבַעְתִּי עֹלוֹת אֵילִים וְחֵלֶב מְרִיאִים… חֲדַל הָרֵעַ לִמְדוּ הֵיטֵב דִּרְשׁוּ מִשְׁפָּט אַשְּׁרוּ חָמוֹץ שִׁפְטוּ יָתוֹם רִיבוּ אַלְמָנָה",
        es: "¿Para qué sirven vuestros numerosos sacrificios? —dice el Señor—. Estoy harto de holocaustos de carneros y de la grasa de animales cebados… dejad de hacer el mal, aprended a hacer el bien; buscad el juicio, aliviad al oprimido, haced justicia al huérfano, defended a la viuda.",
        ref: "Yeshayá / Isaías 1:11 y 1:16–17 ✅",
        sefaria: "Isaiah 1:11",
      },
      {
        t: "p",
        text: `La convergencia de Amós y de Isaías sobre el mismo tema — el rechazo del culto sin justicia — no es casualidad editorial. Es la voz central del profetismo israelita: la **teología de la justicia social**. Dios no se compra con sacrificios. No se apacigua con cantos. No se convence con ritos exteriores cuando la conducta hacia el prójimo los desmiente.`,
      },
      {
        t: "p",
        text: `**La conexión con Pirké Avot 1:2 — ya lo estudiaste en S2.** Simón el Justo enseñó que el mundo se sostiene sobre tres cosas: Torá, Avodá (עֲבוֹדָה, el servicio/culto) y Guemilut Jasadim (גְּמִילוּת חֲסָדִים, las obras de bondad). El profeta Amós — siglos antes — ya estaba diciendo lo mismo desde el otro ángulo: la Avodá sin Guemilut Jasadim no sostiene nada. El segundo pilar sin el tercero se convierte en insulto. Los tres pilares de Pirké Avot 1:2 ✅ no son opcionales ni separables: cuando el culto (Avodá) se desconecta de las obras de bondad (Guemilut Jasadim), Dios mismo, por boca de Amós, los rechaza. El profeta es el guardián del tercer pilar — y cuando lo ve ausente, tiene el deber de hablar.`,
      },
      {
        t: "p",
        text: `**La palabra "profeta" en hebreo: נָבִיא** (*navi*). La etimología del término es debatida ⚠️. Una tradición lo conecta con la raíz נ-ב-א (*nava'*), "emitir, brotar, hacer fluir" — el profeta es aquel de quien "brota" la palabra divina. Otra lo relaciona con la raíz נ-ב-ה (*navah*), "declarar, anunciar" ⚠️. Lo que el texto de Deuteronomio 18 deja en claro es que el navi es ante todo un *mensajero*: recibe (*shama'*, "escuchó") y transmite (*dibber*, "habló"). La imagen de Amós 3:7 — "Dios no hace nada sin revelar su secreto a sus profetas" — sugiere que el profeta es el canal privilegiado de la comunicación divina con la historia. Un canal que, una vez cerrado (Yomá 9b ✅), no se reabre por voluntad propia.`,
      },
    ],
    contemplacion: [
      "Amós era un boyero. No era teólogo ni sacerdote. Cuando Dios lo llamó, le dio una sola tarea: ir y decir la verdad. La verdad era: 'tus fiestas me fastidian mientras el pobre es pisoteado en la puerta del tribunal.' El culto religioso sin justicia es el equivalente espiritual de un cheque sin fondos — luce como pago pero no compra nada. Amós lo dijo hace veintiocho siglos. Sigue siendo verdad.",
      "La justicia que Amós pide no es una buena intención ni un deseo genérico. Es *mishpat* (מִשְׁפָּט, juicio, derecho) y *tzedaká* (צְדָקָה, justicia, rectitud) — dos palabras que en hebreo bíblico son técnicas, no poéticas. Mishpat es el sistema legal que funciona. Tzedaká es la conducta recta que lo sostiene. Que fluyan 'como las aguas' — no como gotas de piedad ocasional, sino como torrente permanente. Esa es la exigencia.",
    ],
    accion: {
      text: [
        `Lee Amós 5:21–24 en Sefaria. Escribe: (1) ¿qué rechaza Dios exactamente en esos versículos — enumera los elementos del culto que menciona el texto? (2) ¿qué pide en cambio — cuál es la imagen que usa el texto y qué significa? (3) ¿puedes identificar alguna situación contemporánea donde sientas que el mensaje de Amós sigue siendo pertinente?`,
      ],
      cta: { label: "Abrir Amós 5:21–24 en Sefaria →", ref: "Amos 5:21" },
    },
    sello:
      "Amós (siglo VIII AEC ⚠️) es el primer profeta clásico cuya datación relativa el texto mismo declara (Amós 1:1 ✅). Su mensaje central: la justicia social es inseparable del culto — Dios rechaza los sacrificios de un pueblo que oprime al pobre (Amós 5:21–24 ✅). Texto paralelo: Isaías 1:11–17 ✅. Conexión con Pirké Avot 1:2 ✅: el profeta es el guardián del pilar de Guemilut Jasadim. El navi (*navi*, נָבִיא) no predice mecánicamente — denuncia el presente y señala consecuencias.",
    hilos: [
      { kind: "study", ref: "que-es-un-profeta", label: "Los tres criterios de Deuteronomio 18 explican por qué Amós pudo hablar con autoridad — vuelve y comprueba." },
      { kind: "study", ref: "las-tres-columnas", label: "Pirké Avot 1:2 (Torá, Avodá, Guemilut Jasadim) — Amós te muestra qué pasa cuando el tercer pilar se rompe." },
    ],
    fuentes: [
      "Amós 5:21–24 ✅ (rechazo del culto vacío; exigencia de mishpat y tzedaká)",
      "Amós 3:7 ✅ (nada hace Dios sin revelar su secreto a los profetas)",
      "Amós 1:1 ✅ (la declaración autobiográfica de Amós: su contexto histórico)",
      "Amós 7:14–15 ✅ (Amós: boyero y recolector de sicomoros, no profeta de profesión)",
      "Yeshayá / Isaías 1:11–17 ✅ (texto paralelo: rechazo del sacrificio, exigencia de justicia)",
      "Pirké Avot 1:2 ✅ (los tres pilares del mundo: Torá, Avodá, Guemilut Jasadim)",
    ],
    tarea: {
      semana: 34,
      herramienta: "Lectura en Pshat de un texto profético; análisis de imágenes bíblicas (agua como metáfora de justicia); conexión intertextual entre texto profético y Mishná (Avot 1:2)",
      enunciado:
        "Lee Amós 5:21–24 en Sefaria. Escribe: (1) ¿qué rechaza Dios exactamente en esos versículos? — enumera todos los elementos del culto que el texto menciona (fiestas, sacrificios, canciones, instrumentos). (2) ¿qué pide en cambio? — describe la imagen que usa el texto para la justicia y explica qué significa esa imagen. (3) ¿cómo se relaciona este mensaje con los tres pilares del mundo de Pirké Avot 1:2 (Torá, Avodá, Guemilut Jasadim)? — ¿cuál de los tres pilares está ausente en el pueblo que Amós critica? (200–400 palabras.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
    closeModule:
      "Has completado S4 — y con él, el nivel entero de SHOEL. Dieciocho semanas de trabajo. Mira atrás: en S1 aprendiste a preguntar con Rashi, a detectar la dificultad antes de buscar la respuesta, a distinguir Pshat de Drash sin confundirlos. En S2 recibiste la ética de los padres: los tres pilares del mundo, la regla de oro de Hillel, el carácter como condición del estudio. En S3 viste la arquitectura de la Torá oral — la Mishná, el Talmud, la cadena viva que va del Sinaí hasta este texto. Y en S4 escuchaste la voz que corrige: el profeta, que no adivina sino que denuncia, que no miente sino que incomoda, que no vende sino que exige. Tienes los cimientos (TALMID) y la pregunta (SHOEL). En JAVER te sientas a estudiar de otra manera: con un compañero, con el Midrash que lee entre líneas, con el Nombre que une todo. El trabajo interior empieza aquí. כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר — la luz sigue creciendo.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO7 = {
  id: "S4",
  he: "נְבִיאִים",
  titulo: "Los profetas",
  etapaHe: "שׁוֹאֵל",
  etapa: "Shoel",
  etapaGloss: "el que pregunta",
  etapaNum: 2,
  etapasTotal: 6,
  total: 2, // L33 y L34
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
  esUltimoModuloDeEtapa: true,
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson7(slug: string): Lesson | undefined {
  return LESSONS7.find((l) => l.slug === slug);
}

export function lessonIndex7(slug: string): number {
  return LESSONS7.findIndex((l) => l.slug === slug);
}

export function nextLesson7(slug: string): Lesson | null {
  const i = lessonIndex7(slug);
  return i >= 0 && i < LESSONS7.length - 1 ? LESSONS7[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 7 ──────────────────────────────
// Slugs internos del Módulo 7.
const INTERNAL_SLUGS7: Record<string, string> = {
  "que-es-un-profeta": "que-es-un-profeta",
  "amos-profeta-social": "amos-profeta-social",
};

// Slugs de módulos anteriores que deben resolver a sus rutas propias.
const CROSS_MODULE_HREFS7: Record<string, string> = {
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
};

const MISTERIO_SLUGS7 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread7(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS7[key]) return { kind: "lesson", slug: INTERNAL_SLUGS7[key] };
  if (MISTERIO_SLUGS7.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href completo para M7 — incluye cross-module overrides.
export function resolveThreadHref7(h: Hilo): string | null {
  if (h.kind === "letter") return `/letras/${h.ref}`;
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS7[key]) return `/academia/modulo-7/${key}`;
  if (CROSS_MODULE_HREFS7[key]) return CROSS_MODULE_HREFS7[key];
  if (MISTERIO_SLUGS7.has(key)) return `/misterio/${key}`;
  return null;
}
