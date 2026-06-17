// ─────────────────────────────────────────────────────────────────────────
// modulo4.ts — ACADEMIA DE JASHMAL · Módulo 4 (S1 · רַשִׁ"י — "Aprender a preguntar").
// Las 5 lecciones de las semanas 17–21, primer módulo de SHOEL.
//
// El contenido (textos, citas, verificaciones) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - S1 - rashi (Sofer).md", 2026-06-17.
// Se monta TAL CUAL: no se inventa, altera ni agrega ninguna fuente.
//
// Sigue EXACTAMENTE la estructura de modulo3.ts.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView4 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── Las 5 lecciones (verbatim del Sofer, 2026-06-17) ─────────────────────────

export const LESSONS4: Lesson[] = [
  // ── L17 ───────────────────────────────────────────────────────────────────
  {
    n: 17,
    id: "E2·S1·L17",
    slug: "quien-fue-rashi",
    title: "¿Quién fue Rashi? — el maestro que pregunta",
    apertura: {
      question:
        "¿Cómo un solo comentarista del siglo XI se convirtió en la voz que acompaña a todo judío que estudia la Torá?",
    },
    estudio: [
      {
        t: "p",
        text: `**Bienvenido al grado SHOEL.** El nombre de este grado — שׁוֹאֵל, *Shoel* — significa "el que pregunta." En TALMID aprendiste a leer el texto como está escrito. En SHOEL aprenderás a interrogarlo: ¿por qué dice esto y no aquello? ¿qué le molesta al texto? ¿qué palabra es inusual, redundante, inesperada? Esa es la herramienta que distingue a un estudioso de un lector pasivo. Y el maestro de esa herramienta es **Rashi**.`,
      },
      {
        t: "p",
        text: `**Quién fue Rashi.** Rabbi Shlomo ben Yitzchaki (רַבִּי שְׁלֹמֹה בֶּן יִצְחָקִי), conocido por el acrónimo **רַשִׁ"י** (Rashi), nació hacia el año 1040 en Troyes, en la región de Champaña, Francia ⚠️. Estudió en las grandes academias del Rin — Worms y Maguncia — y regresó a Troyes donde fundó su propia yeshivá y escribió los dos comentarios que cambiarían la historia del estudio judío: uno sobre la Torá completa y otro sobre casi todo el Talmud Bavlí. Murió en Troyes en 1105 ⚠️. Tenía, según las fuentes, tres hijas; sus yernos y nietos — los *ba'alei ha-tosafot*, "maestros de las adiciones" — continuarían su método.`,
      },
      {
        t: "p",
        text: `**Por qué Rashi es único.** Hay muchos comentaristas del Tanaj y del Talmud: Ramban, Ibn Ezra, Abarbanel, Sforno — grandes pensadores con métodos brillantes. Pero Rashi es el único que **acompaña** al texto en casi toda edición impresa desde el siglo XV hasta hoy ✅. El Talmud de Soncino (1484) ya lo incorporó. Hoy, quien abre cualquier edición del Talmud Bavlí, encuentra el texto talmúdico en el centro de la página con **el comentario de Rashi en la columna interna** (en el lado del encuadernado, con la letra llamada "letra rashi"). No es una convención editorial casual: es el reconocimiento implícito de que sin Rashi, el texto talmúdico es inaccesible para el estudiante ordinario.`,
      },
      {
        t: "p",
        text: `**El lema de Rashi: el Pshat es inviolable.** La regla que da forma a todo el método de Rashi se enuncia en el Talmud y Rashi la recibe y la aplica con rigor:`,
      },
      {
        t: "verse",
        he: "אֵין מִקְרָא יוֹצֵא מִידֵי פְּשׁוּטוֹ",
        es: "Un versículo nunca sale de su sentido literal.",
        ref: "Talmud Bavlí, Shabat 63a ✅",
        sefaria: "Shabbat 63a",
      },
      {
        t: "p",
        text: `Esta regla — citada en Shabat 63a y en Yevamot 24a ✅ — es el escudo que Rashi levanta contra las interpretaciones que se alejan demasiado del texto. No quiere decir que el Drash esté prohibido: quiere decir que el Pshat **nunca se cancela**. Un versículo puede tener múltiples lecturas, pero la más literal siempre permanece como piso. En eso Rashi es consistente a lo largo de sus miles de comentarios.`,
      },
      {
        t: "p",
        text: `**El método que define a un estudioso.** Lo que distingue a Rashi de un compilador o un enciclopedista es que no recoge tradiciones en orden: **pregunta**. Antes de responder, identifica qué hay en el texto que *necesita* explicación — una dificultad, una redundancia, una palabra inusual, una aparente contradicción. Esa dificultad se llama, en el vocabulario técnico, **הַקָּשֶׁה** (*ha-kashé*, "la dificultad") o **הַשְּׁאֵלָה** (*ha-she'elá*, "la pregunta"). El comentario de Rashi nunca es una conferencia enciclopédica: es una respuesta breve a una pregunta precisa. A veces un solo renglón; raramente más de un párrafo.`,
      },
      {
        t: "p",
        text: `**El comentario más leído: Génesis 1:1.** El primer comentario de Rashi a la Torá es un ejemplo perfecto de este método. Rashi no abre con "la creación significa…" — abre con una pregunta que sorprende: ¿por qué la Torá empieza con la Creación y no con el primer mandamiento dado al pueblo de Israel? Su respuesta ya la conocemos de TALMID (L13): para establecer que la tierra le pertenece a Dios ✅ (Tehilim/Salmos 111:6). Lo estudiaremos en detalle en L19. Pero la arquitectura del comentario — **pregunta → fuente → respuesta** — ya está completa en ese primer renglón. Es la plantilla de todo Rashi.`,
      },
      {
        t: "p",
        text: `**Rashi no está solo.** El Talmud mismo, en Pirké Avot, describe el estudio como una práctica de transmisión: cada generación recibe de la anterior y pasa a la siguiente ✅ (Avot 1:1). Rashi es el punto de la cadena que une la tradición talmúdica de las academias de Babilonia y de Eretz Israel con el estudiante europeo del medievo — y, a través de las ediciones impresas, con el estudiante de Jashmal hoy. No estudia Rashi quien lee sus comentarios como si fueran notas al pie: los estudia quien aprende a **hacer la pregunta de Rashi** antes de leer la respuesta.`,
      },
    ],
    contemplacion: [
      "Rashi tenía una yeshivá pequeña en Troyes. No tenía internet ni imprenta. Escribió con tinta sobre pergamino. Sin embargo, cada vez que alguien en el mundo abre un Talmud — en Bnei Brak, en Buenos Aires, en Teherán, en Nueva York — la primera voz que escucha después del texto es la de Rashi. ¿Qué hace que una voz cruce mil años sin perderse?",
      "La respuesta de Jashmal a esa pregunta: rigor y honestidad. Rashi no adornó, no especuló sin señalarlo, no inventó. Preguntó lo que el texto requería que se preguntara, y respondió con lo que la tradición tenía para responder. Esa es la herramienta que este módulo te pone en las manos.",
    ],
    accion: {
      text: [
        `Busca en Sefaria el comentario de Rashi a Génesis 1:1 (abre el texto en Sefaria, activa la columna de comentaristas y selecciona "Rashi"). Lee solo las primeras dos líneas. ¿Qué pregunta hace Rashi antes de dar ninguna respuesta? Escríbela con tus palabras — una sola línea.`,
      ],
      cta: { label: "Abrir Rashi a Génesis 1:1 en Sefaria →", ref: "Rashi on Genesis 1:1" },
    },
    sello:
      "Rashi (Rabbi Shlomo ben Yitzchaki, c. 1040–1105, Troyes) ⚠️ es el comentarista de la Torá y el Talmud más leído de la historia; sus comentarios acompañan al texto talmúdico impreso desde el siglo XV ✅. Su lema: *ein mikra yotzei mi-dei peshuto* — un versículo nunca pierde su sentido literal (Shabat 63a ✅). Su método: identificar la dificultad en el texto, luego responder con una cita o explicación breve. Plantilla: pregunta → fuente → respuesta.",
    hilos: [
      { kind: "study", ref: "lej-leja-avraham", label: "Ya leíste Génesis 12:1 en Pshat. Ahora Rashi tiene algo que decir sobre 'lej lejá' que cambia el significado del llamado." },
      { kind: "study", ref: "que-es-pardes", label: "Pshat es el primer nivel de PaRDeS — Rashi es su guardián más riguroso. ¿Cómo se relaciona el guardián con los otros tres niveles?" },
    ],
    fuentes: [
      "Talmud Bavlí, Shabat 63a ✅ (ain mikra yotzei mi-dei peshuto)",
      "Talmud Bavlí, Yevamot 24a ✅ (la misma regla en otro contexto)",
      "Rashi a Génesis 1:1 ✅ (plantilla del método: pregunta → fuente → respuesta)",
      "Pirké Avot 1:1 ✅ (la cadena de transmisión — contexto de Rashi)",
      "Datos biográficos: Troyes c. 1040–1105 ⚠️ (tradición; fechas medievales de las fuentes posteriores)",
    ],
    tarea: {
      semana: 17,
      herramienta: "La pregunta de Rashi: identificar qué dificultad ve Rashi en el texto antes de leer su respuesta",
      enunciado:
        "Busca en Sefaria el comentario de Rashi a Génesis 1:1 (en la columna de comentaristas). Lee solo el primer párrafo. Escribe: (1) ¿qué pregunta hace Rashi antes de responder? (2) ¿qué responde? (3) ¿cuál es la fuente que cita? Da la referencia exacta de esa fuente.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L18 ───────────────────────────────────────────────────────────────────
  {
    n: 18,
    id: "E2·S1·L18",
    slug: "el-metodo-de-rashi",
    title: "El método de la pregunta — qué le molesta a Rashi",
    apertura: {
      question:
        "Rashi no explica — pregunta. ¿Cuál es la diferencia?",
    },
    estudio: [
      {
        t: "p",
        text: `**El que explica y el que pregunta.** Un diccionario explica: da información sobre algo que se desconoce. Un comentarista del tipo de Rashi hace algo diferente: **identifica qué hay en el texto que requiere explicación** y solo entonces responde. Esa diferencia — entre explicar lo que uno sabe y preguntar lo que el texto exige — es la diferencia entre aprender datos y aprender a estudiar.`,
      },
      {
        t: "p",
        text: `**Qué le "molesta" a Rashi.** El vocabulario técnico del aprendizaje rashi'ico usa la palabra **קָשֶׁה** (*kashé*, "difícil/molesto") para describir aquello en el texto que requiere comentario. Los estudiantes de Rashi aprenden a preguntarse, antes de leer el comentario: *"¿qué le kashé (molesta) a Rashi aquí?"* Las categorías de dificultad son precisas:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Redundancia gramatical:** el texto dice algo que ya se sobreentendía — ¿por qué? Por ejemplo: *"y Dios vio que era bueno"* — ¿acaso no era obvio que lo que crea Dios es bueno? La redundancia siempre llama la atención de Rashi.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Palabra inusual o rara:** el hebreo bíblico usa a veces una palabra que no aparece en ningún otro lugar del Tanaj, o que en ese contexto suena extraña. Rashi se detiene.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Contradicción aparente:** dos versículos que parecen decir cosas distintas sobre lo mismo. Rashi reconcilia o explica cuál lectura predomina.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**El orden del relato:** ¿por qué el texto cuenta las cosas en este orden y no en otro? ¿Por qué Dios le habla a Adán antes que a Eva, por ejemplo? El orden narrativo para Rashi tiene significado.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Información faltante:** a veces el texto deja de decir algo que uno esperaría. El silencio también es una señal.`,
      },
      {
        t: "p",
        text: `**Ejemplo central: Génesis 1:1.** El primer versículo de la Torá dice *"En el principio creó Dios los cielos y la tierra."* Para la mayoría de los lectores, eso es una introducción natural al texto. Rashi lo lee y se hace esta pregunta:`,
      },
      {
        t: "verse",
        he: "אָמַר רַבִּי יִצְחָקִי לֹא הָיָה צָרִיךְ לְהַתְחִיל אֶת הַתּוֹרָה אֶלָּא מֵ«הַחֹדֶשׁ הַזֶּה לָכֶם»",
        es: "Dijo Rabbi Yitzchaki: la Torá no debería haber comenzado sino desde [el versículo] 'Este mes será para vosotros [el primero de los meses]'.",
        ref: "Rashi a Bereshit / Génesis 1:1 ✅",
        sefaria: "Rashi on Genesis 1:1",
      },
      {
        t: "p",
        text: `La lógica de Rashi: si la Torá es un libro de **mandamientos** (*mitzvot*) para el pueblo de Israel, ¿por qué empieza con la historia de la Creación — que no es un mandamiento — y no con el primer mandamiento dado al pueblo (Éxodo 12:2: "Este mes será para vosotros el primero de los meses")? Esa pregunta es la dificultad (*kashé*). Y la respuesta es la que ya conocemos: para establecer que la tierra pertenece a Dios. Pero **la pregunta viene primero**. Sin ella, la respuesta flota en el aire.`,
      },
      {
        t: "p",
        text: `**Segundo ejemplo: *va-yomer* vs. *va-ydabber*.** El hebreo bíblico tiene varios verbos para "hablar" o "decir". Los dos más frecuentes son **וַיֹּאמֶר** (*va-yomer*, "y dijo") y **וַיְדַבֵּר** (*va-ydabber*, "y habló"). Para muchos lectores, son sinónimos. Rashi los distingue. El libro de Éxodo abre con:`,
      },
      {
        t: "verse",
        he: "וַיְדַבֵּר אֱלֹהִים אֶל-מֹשֶׁה וַיֹּאמֶר אֵלָיו אֲנִי יְהוָה",
        es: "Y habló (*va-ydabber*) Dios a Moshé, y le dijo (*va-yomer*): Yo soy YHVH.",
        ref: "Shemot / Éxodo 6:2 ✅",
        sefaria: "Exodus 6:2",
      },
      {
        t: "p",
        text: `Aquí el texto usa **los dos verbos juntos** en el mismo versículo — primero *va-ydabber* y después *va-yomer*. Si fueran sinónimos exactos, el texto sería redundante. Rashi detecta la redundancia y señala: *va-ydabber* tiene un tono más duro o firme (דִּיבּוּר, *dibur* — habla directa, a veces incluso reproche); *va-yomer* es más suave (אֲמִירָה, *amirá* — decir, expresar). La diferencia matiza cómo Dios le habla a Moshé en ese momento: primero con firmeza (*va-ydabber*), luego con ternura (*va-yomer*). El texto no está siendo redundante: está siendo preciso ✅.`,
      },
      {
        t: "p",
        text: `**Por qué esto importa para el estudiante de Shoel.** El ejercicio central de este módulo es aprender a hacer la pregunta de Rashi antes de leer la respuesta. Eso significa: antes de abrir el comentario, detenerse en el texto y preguntarse — ¿hay algo aquí que requiere explicación? ¿hay una redundancia, una palabra inusual, un orden sorprendente, un silencio inesperado? Esa habilidad — **ver la dificultad antes de buscar la respuesta** — es lo que el grado SHOEL desarrolla. Es la diferencia entre un estudiante que lee y un estudioso que interroga.`,
      },
    ],
    contemplacion: [
      "Rashi vivió en la Europa del feudalismo, de las Cruzadas, de una comunidad judía amenazada. Escribió sus comentarios en ese contexto. Y sin embargo, lo que hizo fue volver una y otra vez al texto con la misma pregunta: ¿qué dice exactamente? No lo que tememos, no lo que esperamos, no lo que queremos que diga. ¿Qué dice?",
      "La pregunta honesta es más difícil que la respuesta fácil. Eso es lo que este módulo enseña.",
    ],
    accion: {
      text: [
        `Elige cualquier versículo de Génesis 1–3 que te llame la atención. Léelo en hebreo (puedes usar transliteración) y en español. Antes de buscar el comentario de Rashi, escribe: ¿qué hay en ese versículo que podría "molestarle" a Rashi — qué es redundante, inusual o difícil? Formúlalo como una pregunta al estilo de Rashi (no respondas todavía — solo formula la pregunta). Luego, si quieres, busca en Sefaria si Rashi también la hizo.`,
      ],
      cta: { label: "Abrir Génesis 1 en Sefaria con comentaristas →", ref: "Genesis 1:1" },
    },
    sello:
      "El método de Rashi: identificar la dificultad del texto (*ha-kashé*) antes de responder. Cinco tipos de dificultad: redundancia gramatical, palabra inusual, contradicción aparente, orden sorprendente, información faltante. Ejemplo paradigmático: la pregunta de Rashi sobre Génesis 1:1 ✅ (¿por qué empieza por la Creación?). Segundo ejemplo: la distinción *va-ydabber* / *va-yomer* en Éxodo 6:2 ✅.",
    hilos: [
      { kind: "study", ref: "quien-fue-rashi", label: "El método de la pregunta es el corazón de quien fue Rashi — ¿cómo se formó ese método?" },
      { kind: "study", ref: "rashi-bereshit", label: "La pregunta de Génesis 1:1: ahora leeremos el comentario completo de Rashi versículo por versículo." },
    ],
    fuentes: [
      "Rashi a Bereshit / Génesis 1:1 ✅ (la pregunta: ¿por qué empieza con la Creación?)",
      "Shemot / Éxodo 6:2 ✅ (la distinción va-ydabber / va-yomer)",
      "Rashi a Shemot / Éxodo 6:2 ✅ (dibur = habla firme; amirá = decir suave)",
    ],
    tarea: {
      semana: 18,
      herramienta: "La dificultad del texto (ha-kashé): identificar qué hay en un versículo que requiere explicación antes de buscarla",
      enunciado:
        "Elige cualquier versículo de Génesis 1–3 que te llame la atención. Léelo en hebreo (puedes usar transliteración) y en español. Escribe: ¿qué hay en ese versículo que podría 'molestarle' a Rashi — qué es redundante, inusual o difícil? Formúlalo como una pregunta al estilo de Rashi (no respondas todavía — solo formula la pregunta).",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L19 ───────────────────────────────────────────────────────────────────
  {
    n: 19,
    id: "E2·S1·L19",
    slug: "rashi-bereshit",
    title: "Rashi sobre Génesis 1:1 — el comentario más famoso del mundo",
    apertura: {
      question:
        "La Torá empieza con 'En el principio creó Dios…' Rashi no pregunta qué creó. Pregunta algo más profundo. ¿Qué?",
    },
    estudio: [
      {
        t: "p",
        text: `**El comentario que define un método.** Si hubiera que elegir un solo comentario de Rashi para entender cómo funciona su método, sería este: el primer comentario de la Torá, sobre Génesis 1:1. No porque sea el más complicado — es uno de los más accesibles. Sino porque **la estructura** del comentario (pregunta → fuente → respuesta) está ahí en su forma más limpia. Una vez que se aprende a leer este comentario, todos los demás se vuelven más transparentes.`,
      },
      {
        t: "verse",
        he: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
        es: "En el principio creó Dios los cielos y la tierra.",
        ref: "Bereshit / Génesis 1:1 ✅",
        sefaria: "Genesis 1:1",
      },
      {
        t: "p",
        text: `**La pregunta de Rashi.** Rashi abre su comentario así (traducción del Sofer del hebreo de Sefaria):`,
      },
      {
        t: "verse",
        he: "אָמַר רַבִּי יִצְחָקִי לֹא הָיָה צָרִיךְ לְהַתְחִיל אֶת הַתּוֹרָה אֶלָּא מֵ«הַחֹדֶשׁ הַזֶּה לָכֶם» שֶׁהִיא מִצְוָה רִאשׁוֹנָה שֶׁנִּצְטַוּוּ בָּהּ יִשְׂרָאֵל",
        es: "Dijo Rabbi Yitzchaki: la Torá no debería haber comenzado sino desde 'Este mes será para vosotros' (Éxodo 12:2), que es el primer mandamiento con que fue ordenado Israel.",
        ref: "Rashi a Bereshit / Génesis 1:1 ✅",
        sefaria: "Rashi on Genesis 1:1",
      },
      {
        t: "p",
        text: `**Por qué esta es una pregunta genuina.** Rashi no hace retórica: plantea un problema real. Si la Torá es el libro de instrucciones de vida del pueblo de Israel, su lógica más natural sería empezar con el primer mandamiento. Comenzar con la Creación — con algo que ocurrió antes de que existiera Israel — parece fuera de lugar. Esa es la dificultad (*kashé*). Y Rashi la toma en serio porque **respetarla** es la única forma de llegar a una respuesta que valga.`,
      },
      {
        t: "p",
        text: `**La fuente que Rashi usa: Tehilim 111:6.** Rashi no responde de su cosecha: cita las Escrituras. La respuesta que da es:`,
      },
      {
        t: "verse",
        he: "כֹּחַ מַעֲשָׂיו הִגִּיד לְעַמּוֹ לָתֵת לָהֶם נַחֲלַת גּוֹיִם",
        es: "El poder de sus obras anunció a su pueblo, para darles la herencia de las naciones.",
        ref: "Tehilim / Salmos 111:6 ✅",
        sefaria: "Psalms 111:6",
      },
      {
        t: "p",
        text: `Rashi conecta este versículo del Salmo con la pregunta: Dios anunció "el poder de sus obras" — la Creación — "para darles la herencia de las naciones." La implicación: si las naciones del mundo algún día dicen a Israel "vosotros robáis la tierra que conquistáis", Israel puede responder: *"toda la tierra le pertenece al Santo Bendito Es; Él la creó, y Él la da a quien quiere. La dio a ellos [a las naciones] según su voluntad, y según su voluntad nos la dio a nosotros."* ✅ Esa es la respuesta de Rashi. La Torá empieza con la Creación para establecer el derecho último sobre la tierra: el de su Creador.`,
      },
      {
        t: "p",
        text: `**La segunda fuente: Bereshit Rabá 1:2.** Rashi incorpora también un midrash del Bereshit Rabá (el gran comentario rabínico al Génesis):`,
      },
      {
        t: "verse",
        he: "בְּרֵאשִׁית — בִּשְׁבִיל הַתּוֹרָה שֶׁנִּקְרֵאת «רֵאשִׁית» וּבִשְׁבִיל יִשְׂרָאֵל שֶׁנִּקְרְאוּ «רֵאשִׁית»",
        es: "'En el principio' — por causa de la Torá, que es llamada 'principio' (Proverbios 8:22), y por causa de Israel, que es llamado 'principio' (Jeremías 2:3).",
        ref: "Bereshit Rabá 1:2 ✅ (en Rashi a Génesis 1:1)",
        sefaria: "Bereshit Rabbah 1:2",
      },
      {
        t: "p",
        text: `Este midrash propone que la palabra **בְּרֵאשִׁית** (*bereshit*, "en el principio") puede leerse como *bi-shvil reshit* — "por causa de [lo que se llama] reshit (principio/primicia)". La Torá es llamada *reshit* en Proverbios 8:22; Israel es llamado *reshit* en Jeremías 2:3. Ergo: el mundo fue creado *por causa de* la Torá y de Israel. Este es el nivel Drash del texto — Rashi lo registra como tal, distinguiéndolo del argumento central de la respuesta ⚠️.`,
      },
      {
        t: "p",
        text: `**La plantilla del comentario de Rashi, ahora visible.** Después de leer este comentario completo, la estructura es clara:\n\n1. **La dificultad (kashé):** ¿por qué la Torá empieza con la Creación y no con el primer mandamiento?\n2. **La fuente:** Tehilim 111:6 ✅ — "el poder de sus obras anunció a su pueblo"\n3. **La respuesta:** para establecer el derecho de Dios (y por ende de Israel) sobre la tierra\n4. **El complemento midrásico:** Bereshit Rabá 1:2 ✅ — la lectura de *bereshit* como *bi-shvil reshit*\n\nEsta es la plantilla que Rashi repite miles de veces a lo largo del Jumash y el Talmud. Una vez que la ves aquí, la reconoces en todos los demás.`,
      },
    ],
    contemplacion: [
      "Rashi pudo haber empezado su comentario diciendo: 'En el principio Dios creó los cielos y la tierra. Esto nos enseña que Dios es el Creador de todo.' Habría sido correcto, inofensivo y olvidable. En cambio, preguntó: ¿por qué esto y no aquello? Esa pregunta es la que hace que su comentario siga vivo mil años después.",
      "¿Cuántas veces leemos un texto — o una situación — y aceptamos la primera interpretación sin preguntarnos si hay algo que no cuadra? Rashi nos enseña que el que no pregunta no estudia: recibe. El que pregunta, trabaja con el texto.",
    ],
    accion: {
      text: [
        `Lee el comentario completo de Rashi a Génesis 1:1 en Sefaria (activa la columna de Rashi). Escribe en tus palabras: ¿cuál es la pregunta que Rashi hace? ¿cuál es su respuesta? ¿cuál es la fuente que cita? No copies — reformula con tus palabras. Luego: ¿te convence el argumento de Rashi? ¿por qué sí o por qué no?`,
      ],
      cta: { label: "Abrir Rashi a Génesis 1:1 en Sefaria →", ref: "Rashi on Genesis 1:1" },
    },
    sello:
      "El primer comentario de Rashi (Génesis 1:1): dificultad — ¿por qué la Torá empieza con la Creación? Respuesta: para establecer el derecho de Dios sobre la tierra ✅ (base: Tehilim 111:6 ✅). Fuente secundaria: Bereshit Rabá 1:2 ✅ (*bereshit = bi-shvil reshit*). Plantilla universal de Rashi: pregunta (kashé) → fuente → respuesta.",
    hilos: [
      { kind: "study", ref: "el-metodo-de-rashi", label: "Volviste a ver la plantilla de Rashi en acción — ¿reconoces los cinco tipos de dificultad en este comentario?" },
      { kind: "study", ref: "rashi-pshat-drash", label: "Rashi mezcla aquí Pshat (Tehilim 111:6) y Drash (Bereshit Rabá 1:2). La próxima lección trata cómo los distingue." },
    ],
    fuentes: [
      "Bereshit / Génesis 1:1 ✅",
      "Rashi a Génesis 1:1 ✅ (texto hebreo completo verificado en Sefaria)",
      "Tehilim / Salmos 111:6 ✅ (koaj maasav higid le-ammo)",
      "Bereshit Rabá 1:2 ✅ (bereshit = bi-shvil reshit — Torá e Israel llamados reshit)",
      "Shemot / Éxodo 12:2 ✅ (ha-jodesh ha-ze lajem — el primer mandamiento a Israel)",
    ],
    tarea: {
      semana: 19,
      herramienta: "Lectura de un comentario de Rashi en su estructura completa: pregunta → fuente → respuesta",
      enunciado:
        "Lee el comentario completo de Rashi a Génesis 1:1 en Sefaria. Escribe un párrafo que explique su argumento con tus propias palabras, sin copiar. Luego escribe: ¿estás de acuerdo con que la Torá necesitaba empezar con la Creación por esta razón? ¿Por qué sí o por qué no? (No hay respuesta incorrecta — el objetivo es que pienses con el texto.)",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L20 ───────────────────────────────────────────────────────────────────
  {
    n: 20,
    id: "E2·S1·L20",
    slug: "rashi-pshat-drash",
    title: "Rashi distingue Pshat de Drash — dos lecturas, una verdad",
    apertura: {
      question:
        "Rashi a veces dice: 'esto es Pshat' y 'esto es Drash'. ¿Qué diferencia hace?",
    },
    estudio: [
      {
        t: "p",
        text: `**La distinción que Rashi hace explícita.** En TALMID aprendiste PaRDeS — los cuatro niveles de lectura del texto — como un **mapa orientador**. Ahora vemos que Rashi mismo hace esa distinción de manera explícita, con sus propias palabras, en medio de sus comentarios. No porque sea un cabalista: sino porque es un lector honesto que sabe que hay dos cosas diferentes: lo que el texto **dice** (Pshat) y lo que los sabios **enseñan a partir del** texto (Drash). Ambos son legítimos. Ninguno cancela al otro. Pero deben mantenerse separados.`,
      },
      {
        t: "p",
        text: `**El versículo: Génesis 3:8.** Después de que Adam y Javá comieron del fruto prohibido, el texto dice:`,
      },
      {
        t: "verse",
        he: "וַיִּשְׁמְעוּ אֶת-קוֹל יְהוָה אֱלֹהִים מִתְהַלֵּךְ בַּגָּן לְרוּחַ הַיּוֹם",
        es: "Y oyeron la voz de YHVH Dios que caminaba en el jardín al fresco del día.",
        ref: "Bereshit / Génesis 3:8 ✅",
        sefaria: "Genesis 3:8",
      },
      {
        t: "p",
        text: `En este versículo hay dos frases que llaman la atención: (1) "la voz de YHVH Dios **caminaba**" (*mithalekh*) — ¿cómo camina una voz? (2) "**al fresco del día**" (*le-ruaj ha-yom*) — una expresión idiosincrática, que en hebreo puede significar "al viento del día" o "al fresco del atardecer."`,
      },
      {
        t: "p",
        text: `**Rashi declara su método explícitamente.** En su comentario a este versículo, Rashi dice algo que en toda la historia del comentario bíblico judío es excepcional:`,
      },
      {
        t: "verse",
        he: "אֲנִי לֹא בָּאתִי אֶלָּא לְפָשׁוּטוֹ שֶׁל מִקְרָא",
        es: "Yo no vine sino a explicar el sentido llano del versículo.",
        ref: "Rashi a Bereshit / Génesis 3:8 ✅",
        sefaria: "Rashi on Genesis 3:8",
      },
      {
        t: "p",
        text: `Esta declaración — **ani lo bati ela le-feshuto shel mikra** — es la autocomprensión de Rashi en una frase. No es humildad retórica: es un compromiso metodológico. Rashi sabe que los midrashim tienen lecturas espectaculares sobre este versículo (la luz divina que se retira, la voz de Dios que resuena entre los árboles con un significado cósmico), pero en su comentario va al Pshat: explica "caminaba" (*mithalekh*) como el movimiento del sol (*orjó shel yom*, "el curso del día") que produce la sombra de la tarde ✅. "Al fresco del día" se refiere al lado del jardín donde el sol declinaba — el poniente.`,
      },
      {
        t: "p",
        text: `**Lo que el Pshat dice y lo que el Drash añade.** El contraste es instructivo:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**En Pshat** (Rashi ✅): "la voz de YHVH Dios caminando en el jardín al fresco del día" es una descripción concreta — el momento del atardecer, cuando el sol declina y hay frescor. La "voz" puede entenderse como el sonido que se oye en el jardín cuando llega el Creador; "caminando" es una metonimia del movimiento de su presencia. El texto ancla la escena en un momento físico preciso del día.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**En Drash** ⚠️ (midrash, tradición): hay lecturas que ven en la "voz que camina" el retiro de la Shejiná (la presencia divina), o la primera contracción de la luz divina ante el pecado humano. Son lecturas profundas — pero Rashi las deja al Drash sin pretender que el texto las diga explícitamente.`,
      },
      {
        t: "p",
        text: `**La distinción clave: Pshat no es "literal" y Drash no es "simbólico".** Esta confusión es común y Rashi la deshace. El Pshat no significa que todo se lee "literalmente" (cuando el texto dice "la mano de Dios", el Pshat no dice que Dios tiene mano de carne — el Pshat atiende al sentido que el texto quiere comunicar en su contexto). Y el Drash no es simplemente "simbólico" o "alegórico": es la lectura que los sabios hacen **a partir del** texto, añadiendo una dimensión que el texto mismo no articula. Pshat = lo que el texto dice en su contexto. Drash = lo que la tradición enseña usando el texto como punto de partida. Ambos son verdad; operan en pisos distintos.`,
      },
      {
        t: "verse",
        he: "אֵין מִקְרָא יוֹצֵא מִידֵי פְּשׁוּטוֹ",
        es: "Un versículo nunca sale de su sentido literal.",
        ref: "Talmud Bavlí, Shabat 63a ✅",
        sefaria: "Shabbat 63a",
      },
      {
        t: "p",
        text: `La regla de Shabat 63a — ya la conocemos — opera exactamente aquí: el Drash puede añadir dimensiones, pero no puede **borrar** el Pshat. Los dos niveles coexisten. Eso es lo que Rashi practica cuando dice *"yo no vine sino al Pshat"* — no niega el Drash; declara que en **este comentario**, en **este momento**, va al piso firme.`,
      },
    ],
    contemplacion: [
      "Rashi pudo haber escrito un comentario enciclopédico que compilara todos los midrashim sobre cada versículo. Pero eligió algo más exigente: decir explícitamente cuándo está en el Pshat y cuándo está en el Drash. Esa honestidad requiere disciplina. Muchos comentaristas mezclaron los niveles sin señalarlo. Rashi no.",
      "La distinción Pshat / Drash que Rashi practica es la misma que Jashmal aplica en sus marcaciones ✅ / ⚠️. Lo que el texto dice (✅) y lo que la tradición enseña a partir del texto (⚠️). No es una diferencia de valor: es una diferencia de estatuto. Ambas verdades merecen existir, y ninguna debe hacerse pasar por la otra.",
    ],
    accion: {
      text: [
        `Busca en Sefaria el comentario de Rashi a Génesis 3:8. Lee solo las primeras dos líneas. Escribe: ¿está Rashi dando aquí el Pshat o el Drash? ¿Cómo lo sabes? (Pista: busca si Rashi cita un midrash o explica el sentido literal.) Luego escribe en una línea la diferencia entre Pshat y Drash con tus propias palabras.`,
      ],
      cta: { label: "Abrir Rashi a Génesis 3:8 en Sefaria →", ref: "Rashi on Genesis 3:8" },
    },
    sello:
      "Rashi a Génesis 3:8 ✅: declara explícitamente *'ani lo bati ela le-feshuto shel mikra'* — yo no vine sino al sentido llano del versículo ✅. Distingue Pshat (el movimiento del sol, el fresco del atardecer) del Drash (interpretaciones midrásicas sobre el retiro de la presencia divina ⚠️). Regla base: *ein mikra yotzei mi-dei peshuto* (Shabat 63a ✅). La distinción no es 'literal vs. simbólico' sino 'lo que el texto dice' vs. 'lo que la tradición enseña a partir del texto'.",
    hilos: [
      { kind: "study", ref: "rashi-bereshit", label: "En el comentario a Génesis 1:1 Rashi ya mezclaba el argumento de Tehilim (Pshat) con el midrash de Bereshit Rabá (Drash). Ahora ves la distinción con más precisión." },
      { kind: "study", ref: "lectura-dos-voces", label: "La próxima lección: leer un texto completo con Rashi — texto y comentarista en diálogo." },
    ],
    fuentes: [
      "Bereshit / Génesis 3:8 ✅",
      "Rashi a Génesis 3:8 ✅ (ani lo bati ela le-feshuto shel mikra — declaración explícita del método)",
      "Talmud Bavlí, Shabat 63a ✅ (ain mikra yotzei mi-dei peshuto — regla base del Pshat)",
      "Rashi a Génesis 1:1 ✅ (la frase del método aparece también allí en variantes de manuscritos)",
    ],
    tarea: {
      semana: 20,
      herramienta: "Distinguir Pshat de Drash en un comentario de Rashi: lo que el texto dice vs. lo que la tradición añade",
      enunciado:
        "Busca en Sefaria el comentario de Rashi a Génesis 3:8. Lee solo las primeras dos líneas. Escribe: ¿está Rashi dando aquí el Pshat o el Drash? ¿Cómo lo sabes? (Pista: busca si Rashi cita un midrash o explica el sentido literal.) Usa las palabras 'Pshat' y 'Drash' en tu respuesta con sus definiciones.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L21 ───────────────────────────────────────────────────────────────────
  {
    n: 21,
    id: "E2·S1·L21",
    slug: "lectura-dos-voces",
    title: "Primera lectura en dos voces — el texto y su comentarista",
    apertura: {
      question:
        "El texto dice 've'. Rashi pregunta: ¿por qué dice 've para ti' en lugar de solo 've'? ¿Qué diferencia hace una sola repetición?",
    },
    estudio: [
      {
        t: "p",
        text: `**El ejercicio culminante del módulo S1.** En las cuatro lecciones anteriores aprendiste: quién fue Rashi, su método (la dificultad antes de la respuesta), el comentario más famoso (Génesis 1:1), y la distinción Pshat / Drash. Esta lección te pide integrar todo eso en **una lectura en dos voces**: el texto dice algo, Rashi responde algo, y tú — el estudiante de SHOEL — aprendes a acompañar esa conversación de manera activa.`,
      },
      {
        t: "p",
        text: `**El texto: Génesis 12:1.** Ya lo leíste en TALMID (L16) en Pshat puro. Ahora lo lees con Rashi:`,
      },
      {
        t: "verse",
        he: "וַיֹּאמֶר יְהוָה אֶל-אַבְרָם לֶךְ-לְךָ מֵאַרְצְךָ וּמִמּוֹלַדְתְּךָ וּמִבֵּית אָבִיךָ אֶל-הָאָרֶץ אֲשֶׁר אַרְאֶךָּ",
        es: "Y dijo YHVH a Avram: Ve para ti (*lej lejá*), de tu tierra, de tu natividad y de la casa de tu padre, hacia la tierra que te mostraré.",
        ref: "Bereshit / Génesis 12:1 ✅",
        sefaria: "Genesis 12:1",
      },
      {
        t: "p",
        text: `**La dificultad que Rashi ve.** El texto dice **לֶךְ-לְךָ** (*lej lejá*). El imperativo "ve" (*lej*) ya es completo en sí mismo — ¿para qué añadir *lejá* ("para ti")? En hebreo bíblico, el imperativo *lej* solo es perfectamente normal y claro. La adición del pronombre *lejá* ("para ti, a ti mismo") es gramaticalmente redundante. Esa redundancia — dos palabras donde bastaría una — es exactamente el tipo de señal que Rashi no pasa por alto.`,
      },
      {
        t: "p",
        text: `**La respuesta de Rashi: el beneficio personal.** El comentario de Rashi a Génesis 12:1 dice:`,
      },
      {
        t: "verse",
        he: "לְהַנַּאָתְךָ וּלְטוֹבָתְךָ",
        es: "Para tu beneficio y para tu bien.",
        ref: "Rashi a Bereshit / Génesis 12:1 ✅",
        sefaria: "Rashi on Genesis 12:1",
      },
      {
        t: "p",
        text: `*Lej lejá* no es simplemente "ve" — es "ve **para tu propio bien**, para tu beneficio." El *lejá* convierte el imperativo en algo reflexivo: no es solo una instrucción, es una promesa envuelta en la instrucción. Y Rashi añade: "porque allí haré de ti una gran nación — aquí [en Jarán] no mereces tener hijos" ✅. El llamado de Dios a Avraham no es solo una orden: es una oportunidad. El texto lo dice con una sola sílaba extra — *lejá* — y Rashi lo ve.`,
      },
      {
        t: "p",
        text: `**El orden de los tres abandonos.** Rashi también comenta el orden de las tres cosas que Avraham debe dejar: "de tu tierra — de tu natividad — de la casa de tu padre." Ya en TALMID contamos las tres. Ahora Rashi añade una observación:`,
      },
      {
        t: "p",
        text: `El orden del texto no es cronológico (primero uno deja la casa del padre, luego la ciudad, luego el país) sino de **dificultad creciente**: la tierra es lo más fácil de dejar; la natividad (el lugar donde naciste, tus raíces de infancia) es más difícil; la casa del padre — la familia inmediata — es lo más difícil ✅. El texto enumera de lo general a lo particular, de lo fácil a lo duro. Esa lectura — que el texto usa un orden retórico para preparar el alma del lector — es Pshat con precisión gramatical y narrativa.`,
      },
      {
        t: "p",
        text: `**La lectura en dos voces: cómo se practica.** El estudiante de SHOEL aprende a leer un texto con su comentarista así:\n\n1. **Lee el texto** solo, en hebreo o en español, despacio.\n2. **Pregúntate** (antes de abrir el comentario): ¿qué hay aquí que podría molestarle a Rashi? ¿hay una redundancia, una palabra inusual, un orden sorprendente?\n3. **Abre el comentario** de Rashi.\n4. **Compara** tu pregunta con la de Rashi: ¿la viste? ¿Hay otras que no viste?\n5. **Lee la respuesta** de Rashi: ¿cuál es la fuente? ¿es Pshat o Drash?\n6. **Cierra el círculo**: ¿cambia la respuesta de Rashi el significado del texto para ti?\n\nEse es el ciclo completo de la lectura en dos voces.`,
      },
      {
        t: "p",
        text: `**Lo que cambia cuando Rashi tiene razón.** Si la explicación de Rashi es correcta — si *lej lejá* significa "ve para tu bien" — entonces el llamado de Dios a Avraham no es solo un mandato que exige obediencia: es una invitación que incluye una promesa. Dios no le dice a Avraham "ve porque yo lo ordeno"; le dice "ve porque será bueno para ti." Esa diferencia — entre mandato y invitación — es la que *lejá* sostiene. Una sola sílaba cambia la naturaleza de la relación entre Dios y Avraham.`,
      },
    ],
    contemplacion: [
      "Una sola sílaba extra en el hebreo de Génesis 12:1 — *lejá* — y Rashi ve en ella la diferencia entre una orden y una invitación. Ese es el nivel de atención que el estudio de la Torá exige: no leer por encima, sino detenerse en lo que el texto dice exactamente. Una palabra de más siempre tiene razón de ser.",
      "Terminas el módulo S1 sabiendo leer en dos voces: primero el texto, luego Rashi. Esa habilidad — interrogar el texto antes de buscar la respuesta — es la herramienta central de SHOEL. La próxima etapa — el módulo S2, Pirké Avot — te enseñará la ética que sostiene ese tipo de estudio: para quién se estudia, con quién, con qué actitud. Porque preguntar bien exige no solo método: exige carácter.",
    ],
    accion: {
      text: [
        `Lee Génesis 12:1 con el comentario de Rashi en Sefaria. Antes de leer el comentario, escribe tu propia pregunta: ¿qué hay en el texto que podría molestarle a Rashi? Luego lee el comentario. Escribe: (1) ¿qué dificultad gramatical ve Rashi en las palabras 'lej lejá'? (2) ¿qué responde? (3) ¿cambia el significado del llamado de Dios a Avraham si la explicación de Rashi es correcta?`,
      ],
      cta: { label: "Abrir Génesis 12:1 con Rashi en Sefaria →", ref: "Rashi on Genesis 12:1" },
    },
    sello:
      "Rashi a Génesis 12:1 ✅: la dificultad — ¿por qué 'lej lejá' en lugar de solo 'lej'? La respuesta: *le-hana'atejá u-le-tovatejá* — 'para tu beneficio y tu bien' ✅. El *lejá* convierte el mandato en invitación. El orden de los tres abandonos: de lo más fácil (tierra) a lo más difícil (casa del padre) ✅. La lectura en dos voces — texto + Rashi — es la herramienta culminante de S1.",
    hilos: [
      { kind: "study", ref: "rashi-pshat-drash", label: "En esta lectura Rashi dio Pshat puro — sin Drash. ¿Cuándo decide Rashi ir al Drash y cuándo se queda en el Pshat?" },
      { kind: "study", ref: "lej-leja-avraham", label: "Leíste este texto en TALMID. ¿Qué ves ahora que no veías antes?" },
    ],
    fuentes: [
      "Bereshit / Génesis 12:1 ✅",
      "Rashi a Génesis 12:1 ✅ (lej lejá = le-hana'atejá u-le-tovatejá; orden de los abandonos)",
      "Pirké Avot 5:3 ✅ (lej lejá como primera prueba de Avraham — enlace con TALMID)",
    ],
    tarea: {
      semana: 21,
      herramienta: "Lectura en dos voces: texto + comentario de Rashi en diálogo activo (identificar la dificultad, leer la respuesta, evaluar el impacto)",
      enunciado:
        "Lee Génesis 12:1 con el comentario de Rashi (en Sefaria). Escribe: (1) ¿qué dificultad gramatical ve Rashi en las palabras 'lej lejá'? (2) ¿qué responde? (3) ¿cambia el significado del llamado de Dios a Avraham si la explicación de Rashi es correcta? Escribe tu respuesta en 200–400 palabras.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
    closeModule:
      "Terminaste el primer módulo de SHOEL. En cinco semanas pasaste de ser un lector pasivo a ser alguien que sabe interrogar el texto como lo hacía Rashi: detectar la dificultad antes de buscar la respuesta, distinguir el Pshat del Drash sin confundirlos, y leer en dos voces — el texto y su comentarista en diálogo. Conociste el comentario más famoso de la historia judía (Génesis 1:1) y terminaste leyendo el llamado de Avraham con nuevos ojos: *lej lejá* no es solo 've' — es 've para tu bien'. Una sola sílaba. Todo el método de Rashi en una sola sílaba. El módulo S2 te espera con Pirké Avot — la ética de los padres — porque preguntar bien no es solo un método: es una actitud hacia el texto, hacia el maestro y hacia uno mismo. El que estudia Torá sin ética la convierte en arma; el que la une a la ética, la convierte en vida. כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר — la luz sigue creciendo.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO4 = {
  id: "S1",
  he: "רַשִׁ\"י",
  titulo: "Aprender a preguntar",
  etapaHe: "שׁוֹאֵל",
  etapa: "Shoel",
  etapaGloss: "el que pregunta",
  etapaNum: 2,
  etapasTotal: 6,
  total: LESSONS4.length,
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson4(slug: string): Lesson | undefined {
  return LESSONS4.find((l) => l.slug === slug);
}

export function lessonIndex4(slug: string): number {
  return LESSONS4.findIndex((l) => l.slug === slug);
}

export function nextLesson4(slug: string): Lesson | null {
  const i = lessonIndex4(slug);
  return i >= 0 && i < LESSONS4.length - 1 ? LESSONS4[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 4 ──────────────────────────────
// Slugs internos del Módulo 4.
const INTERNAL_SLUGS4: Record<string, string> = {
  "quien-fue-rashi": "quien-fue-rashi",
  "el-metodo-de-rashi": "el-metodo-de-rashi",
  "rashi-bereshit": "rashi-bereshit",
  "rashi-pshat-drash": "rashi-pshat-drash",
  "lectura-dos-voces": "lectura-dos-voces",
};

// Slugs de módulos anteriores que deben resolver a sus rutas propias.
const CROSS_MODULE_HREFS: Record<string, string> = {
  "que-es-pardes": "/academia/modulo-1/que-es-pardes",
  "palabras-ancla": "/academia/modulo-2/palabras-ancla",
  "lej-leja-avraham": "/academia/modulo-3/lej-leja-avraham",
  "los-siete-dias": "/academia/modulo-3/los-siete-dias",
  "el-jardin-adam-java": "/academia/modulo-3/el-jardin-adam-java",
  "noaj-y-el-arco": "/academia/modulo-3/noaj-y-el-arco",
};

const MISTERIO_SLUGS4 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread4(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS4[key]) return { kind: "lesson", slug: INTERNAL_SLUGS4[key] };
  if (MISTERIO_SLUGS4.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href completo para M4 — incluye cross-module overrides.
export function resolveThreadHref4(h: Hilo): string | null {
  if (h.kind === "letter") return `/letras/${h.ref}`;
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS4[key]) return `/academia/modulo-4/${key}`;
  if (CROSS_MODULE_HREFS[key]) return CROSS_MODULE_HREFS[key];
  if (MISTERIO_SLUGS4.has(key)) return `/misterio/${key}`;
  return null;
}
