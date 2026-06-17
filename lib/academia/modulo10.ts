// ─────────────────────────────────────────────────────────────────────────
// modulo10.ts — ACADEMIA DE JASHMAL · Módulo 10 (J3 · שֵׁמוֹת — "El Nombre y la unidad").
// Las 4 lecciones de las semanas 46–49, tercer módulo de JAVER.
//
// El contenido (textos, citas, verificaciones) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - J3 - nombres-divinos (Sofer).md", 2026-06-17.
// Se monta TAL CUAL: no se inventa, altera ni agrega ninguna fuente.
//
// Sigue EXACTAMENTE la estructura de modulo7.ts.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView10 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── Las 4 lecciones (verbatim del Sofer, 2026-06-17) ─────────────────────────

export const LESSONS10: Lesson[] = [
  // ── L46 ───────────────────────────────────────────────────────────────────
  {
    n: 46,
    id: "E3·J3·L46",
    slug: "nombres-divinos",
    title: "Los Nombres divinos — siete umbrales de lo sagrado",
    apertura: {
      question:
        "¿Por qué Dios tiene siete nombres? ¿Qué revela cada uno que los otros no pueden?",
    },
    estudio: [
      {
        t: "p",
        text: `**El comienzo de J3.** Llegas aquí habiendo transitado los módulos J1 (mussar: el trabajo del alma con Mesilat Yesharim) y J2 (lectura profunda: Pshat, Drash, guematría honesta con Rashi, Ibn Ezra y Ramban). Ya sabes leer en PaRDeS. Ya sabes que una equivalencia numérica solo vale si los números coinciden de verdad. Con esas herramientas, el módulo J3 te lleva al corazón de la teología judía: los Nombres divinos y la Shemá como declaración metafísica de la unidad radical. No es poco: esta es la declaración que el judío dice al despertar y al morir. Empezamos por el principio — ¿qué es un Nombre de Dios?`,
      },
      {
        t: "p",
        text: `**El Nombre como revelación, no como descripción.** Antes de listar los Nombres, hay que entender qué son. Un nombre humano identifica a una persona entre otras. Un Nombre divino no identifica a Dios entre otros dioses — no hay otros dioses. Un Nombre divino **revela** un modo de relación entre lo infinito y lo creado: qué aspecto de la Divinidad se manifiesta en este encuentro, en esta operación del mundo, en este momento de la historia. Dios no tiene nombres como una persona tiene nombre y apellido: tiene modos de revelación que el hebreo ancla en palabras sagradas. Cada Nombre es una ventana diferente hacia lo mismo.`,
      },
      {
        t: "p",
        text: `**Los siete Nombres que no se pueden borrar.** La halajá judía distingue con precisión cuáles Nombres de Dios son tan sagrados que su escritura no puede destruirse. El fundamento talmúdico está en Shevuot 35a ✅:`,
      },
      {
        t: "verse",
        he: "שִׁבְעָה שֵׁמוֹת שֶׁאֵינָן נִמְחָקִין: יְהוָה, אֲדֹנָי, אֵל, אֱלֹהִים, שַׁדַּי, צְבָאוֹת, אֶהְיֶה",
        es: "Siete Nombres que no se pueden borrar: YHVH, Adonay, El, Elohim, Shaddai, Tzvaot, Ehyeh.",
        ref: "Talmud Bavlí, Shevuot 35a ✅",
        sefaria: "Shevuot 35a",
      },
      {
        t: "p",
        text: `Los siete Nombres y lo que cada uno revela:\n\n**1. יְהוָה (YHVH)** — el Tetragrámaton, el Nombre de cuatro letras. Es el Nombre más sagrado: se escribe pero no se pronuncia. En la plegaria se lee *Adonay* (Señor); en conversación cotidiana se dice *HaShem* ("El Nombre"). Revela la esencia divina en relación con el tiempo — Dios como Aquel que es, fue y será (*hayá, hové, yihyé*) ⚠️ (lectura etIMológica clásica; no es un único texto sino una lectura hermenéutica ampliamente aceptada de las cuatro letras). Teológicamente, la tradición rabínica lo asocia al **atributo de la misericordia** (*midat ha-rajamim*) ✅ (Bereshit Rabá 12:15).\n\n**2. אֲדֹנָי (Adonay)** — "Mi Señor". Es el modo de pronunciación pública de YHVH en la plegaria y la lectura del Tanaj. También es un Nombre sagrado en sí mismo cuando se escribe como tal. Revela la soberanía y el señorío divino: Dios como *Adon* (אָדוֹן, "Señor, dueño") del universo y de la historia.\n\n**3. אֵל (El)** — "Dios", singular, en su forma más elemental. Aparece en muchos nombres propios bíblicos: Yisrael (שָׂרָה עִם אֵל, "lucha con El"), Mijaël (מִי כָּאֵל, "¿quién como El?"), Daniël. Revela el poder divino desnudo — la fuerza que sostiene la existencia.\n\n**4. אֱלֹהִים (Elohim)** — plural de *El*, usado en singular. Es el Nombre de la Creación: Génesis 1 lo usa 32 veces sin que aparezca una sola vez YHVH ✅. Teológicamente se asocia al **atributo del juicio** (*midat ha-din*) ✅ (Bereshit Rabá 12:15). La forma plural es un misterio conocido como *ribbui* ("pluralidad"): algunos lo explican como plural de majestad; la tradición cabalística leerá en ello los múltiples modos de revelación. Es también el Nombre que el Tanaj aplica a jueces humanos (Éxodo 22:8 ✅: los jueces son llamados *elohim*) — Dios como fuente del juicio recto.\n\n**5. שַׁדַּי (Shaddai)** — "El Todopoderoso" o "El que dice basta" ⚠️ (la etimología es debatida; la lectura clásica es *she-amar dai*, "El que dijo suficiente" — cuando Dios detuvo la expansión del cosmos en la Creación). Es el Nombre del pacto patriarcal: así se reveló a Avraham, Itzjak y Yaakov antes de revelar el Nombre YHVH (Éxodo 6:3 ✅: *"y me aparecí a Avraham, a Itzjak y a Yaakov como El Shaddai, pero con Mi Nombre YHVH no me di a conocer a ellos"*). Aparece en la mezuzá y en el Tzitzit como protección.\n\n**6. צְבָאוֹת (Tzvaot)** — "El de los ejércitos". Aparece principalmente en los Profetas: Isaías, Jeremías, Ezequiel. Revela a Dios como Señor de los ejércitos celestiales y terrestres — la fuerza divina que opera en la historia política y cósmica. La presencia masiva de este Nombre en los Nevi'im no es casual: el profeta habla desde la perspectiva de Dios como conductor de la historia, y ese Dios se llama Tzvaot.\n\n**7. אֶהְיֶה (Ehyeh)** — "Seré" o "Soy el que Soy". Es el Nombre que Dios revela a Moshé ante la zarza ardiente cuando Moshé pregunta: "¿cuál es tu nombre?" (Éxodo 3:14 ✅: *"Ehyeh asher ehyeh"* — "Seré el que seré"). Es el Nombre de la pura existencia que se da a sí misma: Dios como Ser sin condición, sin límite, que está donde está porque está. La tradición conecta *Ehyeh* con YHVH como su fuente: si YHVH describe la existencia divina en el tiempo, *Ehyeh* describe la existencia divina en su pura autoafirmación.`,
      },
      {
        t: "p",
        text: `**La gematría del Nombre más sagrado** 🔢. El Tetragrámaton — יוד-הא-ואו-הא — suma **26**: yod(10) + he(5) + vav(6) + he(5) = **26**. En la lección L44 (J2) ya viste que esta cifra no está sola: *ejad* (אֶחָד, "uno") = 13 y *ahavá* (אַהֲבָה, "amor") = 13, y 13+13 = 26 = YHVH. El Nombre de Dios es la suma de la Unidad y el Amor. No es casualidad: en el nivel Remez, el texto bíblico ya sabe esto. 🧵 \`{{study:26}}\``,
      },
      {
        t: "p",
        text: `**¿Por qué la halajá protege los Nombres escritos?** La prohibición de borrar los Nombres divinos (Shevuot 35a ✅) no es solo reverencia sentimental. Es una afirmación ontológica: el Nombre divino no es una palabra arbitraria que los humanos pusieron a Dios como ponen nombres a mascotas. Es un vínculo real entre el infinito y lo creado — cuando se escribe en pergamino con la intención sagrada correspondiente, algo del *kedushah* (קְדֻשָּׁה, "santidad") habita en esa escritura. Borrar el Nombre no es borrar tinta: es borrar un punto de contacto entre mundos. Por eso la halajá cuida los libros sagrados que contienen los Nombres (*guenizá* — se entierran, no se destruyen) y el sofer que escribe un rollo de la Torá detiene su pluma antes de escribir el Nombre para renovar su intención (*kavanah*).`,
      },
    ],
    contemplacion: [
      "Siete Nombres para lo que no tiene nombre. Cada uno revela un ángulo diferente de lo que no puede verse entero. Es como girar un diamante: cada faceta es real, ninguna lo contiene completo. La tradición judía no coleccionó nombres de Dios por erudición: los guardó como umbrales de relación. Cuando dices YHVH, te acercas a la misericordia. Cuando dices Elohim, te acercas al juicio. Cuando dices Shaddai, te acuerdas del pacto. El Nombre que eliges en la oración dice algo sobre qué aspecto de la relación estás buscando en ese momento.",
      "La halajá que prohíbe borrar los Nombres escritos tiene una consecuencia práctica muy concreta en el mundo digital: los papeles con Nombres sagrados se entierran; los libros de Torá desgastados se guardan en la guenizá. El sofer para antes de escribir el Nombre. Esta cadena de cuidado no es superstición: es el reconocimiento de que hay puntos en el mundo donde lo infinito toca lo finito, y que esos puntos merecen respeto. El estudiante de Jashmal hereda esa conciencia: citar con exactitud, no inventar fuentes, no borrar lo sagrado.",
    ],
    accion: {
      text: [
        `Abre Sefaria y busca "Shevuot 35a". Lee el pasaje (puedes usar la traducción inglesa si el arameo es difícil). Escribe los siete Nombres que menciona el texto. Luego, junto a cada Nombre, escribe en una línea qué revela ese Nombre según lo que aprendiste hoy.`,
      ],
      cta: { label: "Abrir Shevuot 35a en Sefaria →", ref: "Shevuot 35a" },
    },
    sello:
      "Hay siete Nombres divinos que la halajá prohíbe borrar (Shevuot 35a ✅): YHVH, Adonay, El, Elohim, Shaddai, Tzvaot, Ehyeh. Cada uno revela un aspecto distinto de la relación divina con el mundo. YHVH = misericordia (midat ha-rajamim) ✅; Elohim = juicio (midat ha-din) ✅ (Bereshit Rabá 12:15 ✅). El Tetragrámaton suma 26 🔢 = ejad(13) + ahavá(13) 🔢. El Nombre no es una etiqueta arbitraria: es un umbral de relación entre lo infinito y lo creado.",
    hilos: [
      { kind: "study", ref: "yhvh-elohim", label: "El mismo Dios, dos Nombres: misericordia y juicio en el primer capítulo del Génesis." },
      { kind: "study", ref: "26", label: "El misterio 26: por qué Unidad y Amor suman el Nombre." },
    ],
    fuentes: [
      "Talmud Bavlí, Shevuot 35a ✅ (los siete Nombres que no se borran)",
      "Bereshit Rabá 12:15 ✅ (YHVH = misericordia; Elohim = juicio en la Creación)",
      "Shemot / Éxodo 34:6–7 ✅ (los 13 atributos de la misericordia — YHVH proclamado a Moshé)",
      "Shemot / Éxodo 3:14 ✅ (Ehyeh asher Ehyeh — el Nombre ante la zarza ardiente)",
      "Shemot / Éxodo 6:3 ✅ (El Shaddai: el Nombre del pacto patriarcal)",
      "Rashi sobre Bereshit / Génesis 1:1 ✅ (Elohim en la Creación: el atributo del juicio)",
      "Gematría YHVH = 26 🔢 (yod 10 + he 5 + vav 6 + he 5)",
    ],
    tarea: {
      semana: 46,
      herramienta: "Distinción entre Nombres sagrados y epítetos; la regla de la fuente aplicada a la halajá (Shevuot 35a como texto talmúdico verificado).",
      enunciado:
        "Lee Shevuot 35a (busca en Sefaria 'Shevuot 35a'). Lista los siete Nombres que no se pueden borrar. Escribe: ¿por qué crees que la halajá protege los Nombres escritos con esta prohibición específica? (150–300 palabras.)",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L47 ───────────────────────────────────────────────────────────────────
  {
    n: 47,
    id: "E3·J3·L47",
    slug: "yhvh-elohim",
    title: "YHVH y Elohim — misericordia y juicio en tensión",
    apertura: {
      question:
        "En el capítulo 1 del Génesis, Dios solo se llama Elohim. En el capítulo 2, aparece un nombre nuevo. ¿Por qué cambia?",
    },
    estudio: [
      {
        t: "p",
        text: `**El texto ya sabe lo que el Midrash enseñará.** Si lees Génesis 1 con atención a los Nombres — algo que el Pshat riguroso exige — notarás que hay un solo Nombre en todo el capítulo. Elohim. Treinta y dos veces. Sin excepción. Y que en 2:4, sin previo aviso, aparece un Nombre nuevo: YHVH Elohim juntos. El Pshat del texto —antes de cualquier interpretación— ya hace la pregunta. ¿Por qué el cambio? Ese es exactamente el tipo de observación con el que Rashi abre sus comentarios más importantes: detectar lo que el texto hace diferente de lo esperado. Aquí el texto hace algo muy diferente.`,
      },
      {
        t: "p",
        text: `**Génesis 1:1–2:3: solo Elohim.** Leemos los versículos centrales de la Creación:`,
      },
      {
        t: "verse",
        he: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
        es: "En el principio creó Elohim los cielos y la tierra.",
        ref: "Bereshit / Génesis 1:1 ✅",
        sefaria: "Genesis 1:1",
      },
      {
        t: "p",
        text: `Desde 1:1 hasta 2:3, el relato de los seis días y el Shabat, el Nombre que opera es solo Elohim. Dios crea, separa, nombra, evalúa (*"y vio Elohim que era bueno"*), bendice, descansa — todo bajo el Nombre Elohim. El mundo del primer capítulo es el mundo del juicio y el orden: cada cosa en su lugar, cada día en su momento, la creación como sistema perfecto. Ese sistema es obra de Elohim.`,
      },
      {
        t: "p",
        text: `**Génesis 2:4: la primera aparición de YHVH.** El texto cambia de registro en el versículo-bisagra:`,
      },
      {
        t: "verse",
        he: "אֵלֶּה תוֹלְדוֹת הַשָּׁמַיִם וְהָאָרֶץ בְּהִבָּרְאָם בְּיוֹם עֲשׂוֹת יְהוָה אֱלֹהִים אֶרֶץ וְשָׁמָיִם",
        es: "Estas son las generaciones del cielo y de la tierra cuando fueron creados, el día en que YHVH Elohim hizo la tierra y los cielos.",
        ref: "Bereshit / Génesis 2:4 ✅",
        sefaria: "Genesis 2:4",
      },
      {
        t: "p",
        text: `Los dos Nombres aparecen juntos: YHVH **Elohim**. Y el relato que sigue no es el de un cosmos abstracto: es el del jardín, del ser humano formado del polvo, del aliento de vida, de los ríos, del árbol. El capítulo 2 es el mundo desde adentro — el mundo del alma y de la relación. Ese mundo aparece con el Nombre YHVH.`,
      },
      {
        t: "p",
        text: `**Rashi sobre Génesis 2:4 — la explicación clásica.** Rashi ✅ comenta este cambio con precisión: *"en todo lugar donde se dice 'YHVH' es el atributo de la misericordia (midat ha-rajamim). ¿Y por qué aquí comienza con el Nombre Elohim [en el capítulo 1]? Al principio quiso crear el mundo solo con el atributo del juicio (midat ha-din). Pero vio que el mundo no podía sostenerse. ¿Qué hizo? Le puso delante el atributo de la misericordia y lo asoció al juicio. Por eso dice: 'YHVH Elohim'."* Rashi está citando el Midrash de Bereshit Rabá 12:15 ✅ — que ya verificamos. El Pshat de Rashi ya contiene el Drash.`,
      },
      {
        t: "p",
        text: `**El Midrash: Bereshit Rabá 12:15.** El texto del Midrash que fundamenta esta enseñanza:`,
      },
      {
        t: "verse",
        he: "בתחילה עלה במחשבה לבראות במידת הדין. ראה שאין העולם יכול להתקיים, שיתף עמה מידת הרחמים",
        es: "Al principio surgió en el pensamiento [divino] crear con el atributo del juicio. Vio que el mundo no podría sostenerse, así que asoció con él el atributo de la misericordia.",
        ref: "Bereshit Rabá 12:15 ✅",
        sefaria: "Bereishit Rabbah 12:15",
      },
      {
        t: "p",
        text: `**La tensión teológica que sostiene el mundo.** El Midrash no dice que Dios cambió de opinión. Dice que el mundo requiere los dos atributos para existir. Solo juicio (*din*): el cosmos sería un sistema de retribución perfecta donde nada sobreviviría a la primera transgresión. Solo misericordia (*rajamim*): el cosmos perdería la estructura que lo hace coherente — sin consecuencias, sin orden. El mundo real es el producto de la tensión entre los dos. YHVH modera a Elohim; Elohim da estructura a YHVH. La creación entera es esa negociación constante.\n\nEsto no es solo teología abstracta. El estudiante de Pirké Avot (que ya cursó S2) reconoce aquí la misma lógica: los tres pilares del mundo son *Torá, Avodá y Guemilut Jasadim* — estructura, servicio y bondad. El mundo no se sostiene solo con la ley (Torá), ni solo con la bondad (Guemilut Jasadim): necesita los dos. YHVH y Elohim son el arquetipo cósmico de esa misma tensión creadora.`,
      },
      {
        t: "p",
        text: `**El primer umbral del Sod — introducir con cuidado.** Hasta aquí hemos estado en Pshat y Drash: el texto dice lo que dice, y el Midrash lo interpreta con argumentos verificables. Pero hay una lectura que pertenece al primer umbral del Sod — y el currículo nos pide mencionarla sin entrar todavía en la maquinaria completa:\n\nEn la tradición cabalística ⚠️, YHVH y Elohim no son solo dos *atributos* de Dios — son dos modos de emanación de lo divino hacia lo creado. YHVH se asocia a la Luz Infinita (*Ein Sof*) en su relación directa con el alma individual: la misericordia sin forma que penetra hasta lo más profundo. Elohim se asocia a Dios en su relación con el mundo como creación ordenada: la luz divina que toma la forma de las estructuras, los límites, el tiempo. Esta lectura no contradice al Midrash — lo profundiza desde adentro. El estudiante que llega a MAGUID y a JAJAM aprenderá el sistema completo (las sefirot, el Árbol de la Vida, la dinámica de Zeir Anpín). Por ahora, basta saber que el texto que leíste hoy — Génesis 1:1–2:7 — es el mismo texto que los cabalistas leyeron durante siglos para construir ese sistema. La semilla está en el Pshat. El árbol florece en el Sod.`,
      },
    ],
    contemplacion: [
      "El mundo no se sostiene con solo juicio. Tampoco con solo misericordia. YHVH y Elohim no son la dualidad de dos dioses en guerra: son los dos modos en que un solo Dios se relaciona con un mundo que necesita ambos para existir. El rigor da forma. La misericordia da vida. Y la pregunta que el texto hace sin decirla: ¿en qué medida tú mismo necesitas los dos? ¿Cuándo la misericordia hacia ti mismo te disuelve la estructura? ¿Cuándo el juicio sobre ti mismo te aplasta sin dejar espacio para crecer?",
      "Rashi vio el cambio de Nombre en 2:4 y no lo dejó pasar. Ese es el método que ya aprendiste: la palabra exacta, el cambio exacto, la pregunta exacta. El Midrash que cita Rashi es antiguo y fue verificado; la enseñanza de YHVH = misericordia y Elohim = juicio no es una opinión de una persona — es la lectura sistemática de toda la literatura rabínica, confirmada por el Pshat del texto. Cuando el texto bíblico cambia de Nombre, tiene una razón. Buscarla es estudiar.",
    ],
    accion: {
      text: [
        `Lee Génesis 1:1–5 y Génesis 2:4–7 en Sefaria. Anota: ¿cuántas veces aparece solo Elohim en el capítulo 1? ¿En qué versículo aparece YHVH por primera vez? Luego lee Rashi sobre Génesis 2:4. Escribe con tus propias palabras qué explica Rashi sobre el cambio de Nombre — en no más de tres líneas.`,
      ],
      cta: { label: "Abrir Génesis 2:4 con Rashi en Sefaria →", ref: "Genesis 2:4" },
    },
    sello:
      "Génesis 1:1–2:3 usa solo Elohim (32 veces) ✅. En Génesis 2:4 ✅ aparece por primera vez YHVH Elohim juntos. Rashi ✅ explica: Dios quiso crear solo con juicio (Elohim = midat ha-din) pero vio que el mundo no podía sostenerse, así que asoció la misericordia (YHVH = midat ha-rajamim) al juicio — por eso dice YHVH Elohim. Fuente del Midrash: Bereshit Rabá 12:15 ✅. Primera apertura al Sod ⚠️: en la tradición cabalística, YHVH = la luz divina en relación directa con el alma; Elohim = Dios en relación con el mundo como estructura creada.",
    hilos: [
      { kind: "study", ref: "nombres-divinos", label: "Los siete Nombres: cada uno revela un aspecto distinto de lo divino." },
      { kind: "study", ref: "la-shema", label: "Si YHVH es misericordia y Elohim es juicio, ¿qué dice la Shemá al declararlos Uno?" },
    ],
    fuentes: [
      "Bereshit / Génesis 1:1 ✅ (la Creación: solo Elohim en todo el capítulo 1)",
      "Bereshit / Génesis 2:4 ✅ (primera aparición de YHVH Elohim: el versículo-bisagra)",
      "Bereshit Rabá 12:15 ✅ (creación con din; misericordia asociada al juicio)",
      "Rashi sobre Bereshit / Génesis 2:4 ✅ (YHVH = misericordia; Elohim = juicio; por qué se unen)",
    ],
    tarea: {
      semana: 47,
      herramienta: "Lectura de cambio de Nombre en el texto bíblico como herramienta hermenéutica de Pshat; uso de Rashi como comentarista verificado sobre textos narrativos.",
      enunciado:
        "Lee Génesis 1:1–5 y Génesis 2:4–7. Cuenta: ¿cuántas veces aparece solo Elohim? ¿Cuándo aparece YHVH por primera vez? Luego lee Rashi sobre Génesis 2:4. Escribe: ¿qué enseña Rashi sobre la diferencia entre los dos Nombres en estos capítulos? (150–300 palabras.)",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L48 ───────────────────────────────────────────────────────────────────
  {
    n: 48,
    id: "E3·J3·L48",
    slug: "la-shema",
    title: "La Shemá — la unidad radical",
    apertura: {
      question:
        "Una sola línea. Dicha dos veces al día. ¿Qué dice exactamente — y qué esconde su número?",
    },
    estudio: [
      {
        t: "p",
        text: `**El versículo más dicho en el judaísmo.** Hay un versículo que el judío dice al despertar por la mañana y al acostarse por la noche. Que los mártires de todas las épocas dijeron en el umbral de la muerte. Que está en la mezuzá de la puerta y en el Tefilín del brazo y la cabeza. Que los padres enseñan a sus hijos como la primera oración. Es el versículo más dicho, el más escuchado, el más sobreviviente. Y es un versículo de seis palabras.`,
      },
      {
        t: "verse",
        he: "שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד",
        es: "Escucha, Israel: YHVH es nuestro Dios, YHVH es Uno.",
        ref: "Devarim / Deuteronomio 6:4 ✅",
        sefaria: "Deuteronomy 6:4",
      },
      {
        t: "p",
        text: `**Lectura en Pshat: lo que el texto dice exactamente.** El primer trabajo es entender el Pshat con precisión — porque cada palabra importa:\n\n- **שְׁמַע** (*shemá*) — "**Escucha**". No "cree". No "proclama". El primer acto es la escucha (*shemiá*). El nombre del proyecto — Jashmal, *jash* y *mal*, "silencio" y "habla" — comienza exactamente aquí: primero el silencio que escucha, luego la palabra que responde.\n- **יִשְׂרָאֵל** (*Israel*) — se dirige al pueblo. Pero la lectura del Drash (que el Talmud ya sugiere) es que cada persona se llama a sí misma: cada uno tiene dentro de sí la dispersión de "Israel" — los mil fragmentos de atención dispersa — y la Shemá convoca esos fragmentos a la unidad.\n- **יְהוָה אֱלֹהֵינוּ** (*YHVH Elohenu*) — "YHVH es nuestro Elohim". Los dos Nombres que estudiamos en L47 aparecen aquí juntos, en posesión: el Dios de la misericordia (YHVH) es también el Dios del orden y el juicio (Elohim), y es *nuestro*. No un Dios abstracto: un Dios de relación.\n- **יְהוָה אֶחָד** (*YHVH Ejad*) — "YHVH es Uno". El *ejad* (אֶחָד) no solo declara que hay un Dios y no varios (eso es monoteísmo). Declara que toda la diversidad del mundo — el juicio y la misericordia, el día y la noche, lo alto y lo bajo — es manifestación de una única realidad. La declaración más radical del pensamiento judío: no hay dos.`,
      },
      {
        t: "p",
        text: `**Cómo se recita la Shemá — el Talmud en Berajot 13b.** El Talmud da instrucciones precisas sobre la pronunciación, lo que indica que la Shemá no es solo un texto: es una práctica.`,
      },
      {
        t: "verse",
        he: "אָמַר רַב אַחָא בַּר יַעֲקֹב: צָרִיךְ שֶׁיַּאֲרִיךְ בְּדָלֶת שֶׁל אֶחָד",
        es: "Dijo Rav Ajá bar Yakov: hay que alargar el dálet de Ejad.",
        ref: "Talmud Bavlí, Berajot 13b ✅",
        sefaria: "Berakhot 13b",
      },
      {
        t: "p",
        text: `¿Por qué alargar el *dálet*? El Talmud explica: para que al decir *Ejad* la persona "se corone al Santo Bendito Sea sobre los cuatro rincones del cielo y tierra, y sobre los cielos y la tierra" — el *dálet* vale **4** (dálet es la cuarta letra del alefato), los cuatro rumbos del espacio. La Shemá no es una afirmación abstracta: es una práctica de conciencia. Al decirla, la persona expande la soberanía divina en su mente a todos los puntos del espacio y del tiempo. Alarga el *dálet* para que no se escape un solo rincón.`,
      },
      {
        t: "p",
        text: `**La gematría de ejad y ahavá** 🔢. Ahora viene el Remez que ya habías calculado parcialmente en T1·M1 (L6) y en J2 (L44), y que aquí se lee en su profundidad completa:\n\n- **אֶחָד** (*ejad*, "uno"): álef(1) + jet(8) + dálet(4) = **13** 🔢\n- **אַהֲבָה** (*ahavá*, "amor"): álef(1) + he(5) + bet(2) + he(5) = **13** 🔢\n- **13 + 13 = 26** = el valor de YHVH 🔢\n\nLa unidad (*ejad*) y el amor (*ahavá*) pesan lo mismo. Y juntos forman el Nombre de Dios. No es un juego de números: es la afirmación de que donde hay verdadera unidad hay amor, y donde hay verdadero amor hay unidad. El Talmud y la tradición mística leerán esto como la explicación de por qué el mandato que sigue a la Shemá (Deuteronomio 6:5 ✅) es *"amarás a YHVH tu Dios con todo tu corazón, con toda tu alma y con todos tus recursos"*. La declaración de unidad y el mandamiento del amor no son dos cosas distintas: son la misma realidad vista desde dos ángulos. 🧵 \`{{study:26}}\``,
      },
      {
        t: "p",
        text: `**¿Qué declara exactamente la Shemá?** La Shemá no es solo afirmación de monoteísmo — aunque lo es. En su nivel más profundo, es una declaración de que toda la diversidad del mundo es manifestación de una única realidad. Juicio y misericordia: Una. Pasado y futuro: Uno. El yo y el tú: Uno. El texto hebreo expresa esto con una sola palabra — *ejad* — que suma 13, igual que el amor. La tradición judía no llegó a esta conclusión por especulación filosófica: la recibió en la Shemá, la practicó dos veces al día durante tres mil años, y la reafirmó en cada momento de crisis. La unidad de Dios no es una proposición que se afirma y se deja — es una práctica de percepción que se renueva cada día.`,
      },
      {
        t: "p",
        text: `**Puente al módulo siguiente (J4 · Sefer Yetzirah).** Si todo es Uno, ¿cómo surge lo múltiple? ¿Por qué hay dos Nombres (YHVH y Elohim), doce meses, siete días, treinta y dos senderos? El texto que responde esta pregunta con más detalle es el *Sefer Yetzirah* (סֵפֶר יְצִירָה), el libro más antiguo de la tradición que estudiarás en J4. Todo el aparato del Sefer Yetzirah — las letras, las sefirot, las combinaciones — es una respuesta a la pregunta que la Shemá plantea: ¿cómo puede ser Uno lo que parece múltiple?`,
      },
    ],
    contemplacion: [
      "Ejad y ahavá pesan lo mismo: 13 cada uno. La unidad y el amor son equivalentes en el lenguaje del Nombre. Esto no es casualidad matemática — es la afirmación de que no hay verdadera unidad sin amor, ni verdadero amor sin reconocer la unidad del otro. La Shemá no solo declara que Dios es Uno: declara cómo debe ser la relación con ese Uno. La unidad que se ve desde afuera (hay un solo Dios) exige la unidad que se vive desde adentro (amarás a YHVH con todo). El número lo dice todo.",
      "El Talmud dice: alarga el dálet. Cuatro rumbos. El que dice la Shemá no está declarando un dogma abstracto: está expandiendo su conciencia a todos los puntos del espacio. Oriente, occidente, norte, sur, arriba, abajo — en ese momento la persona abarca todo en la palabra Uno. Es meditación con dos sílabas. Pruébalo esta noche: di Shemá Israel, y al llegar a Ejad, pausa, alarga el dálet, y mira mentalmente los cuatro rincones. No como ritual mecánico: como práctica de percepción.",
    ],
    accion: {
      text: [
        `Calcula la gematría de ejad (álef=1, jet=8, dálet=4) y de ahavá (álef=1, he=5, bet=2, he=5). Escribe los resultados. Luego escribe un párrafo respondiendo: ¿qué te dice que la unidad y el amor tengan el mismo valor numérico? No copies la explicación de la lección — escribe lo que tú observas.`,
      ],
      cta: { label: "Abrir Deuteronomio 6:4 en Sefaria →", ref: "Deuteronomy 6:4" },
    },
    sello:
      "La Shemá (Deuteronomio 6:4 ✅): שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד. Gematría: ejad = álef(1)+jet(8)+dálet(4) = 13 🔢; ahavá = álef(1)+he(5)+bet(2)+he(5) = 13 🔢; 13+13 = 26 = YHVH 🔢. El Talmud (Berajot 13b ✅) ordena alargar el dálet de ejad: los cuatro rumbos del espacio. La Shemá no solo declara monoteísmo: declara que toda la diversidad del mundo es manifestación de una única realidad. Unidad y amor pesan lo mismo — no es coincidencia.",
    hilos: [
      { kind: "study", ref: "yhvh-elohim", label: "Si YHVH y Elohim son misericordia y juicio, ¿cómo son Uno? La respuesta empieza en Génesis 2:4." },
      { kind: "study", ref: "el-alenu", label: "La oración que cierra cada día termina con YHVH Ejad — la Shemá escatológica." },
    ],
    fuentes: [
      "Devarim / Deuteronomio 6:4 ✅ (la Shemá: texto completo)",
      "Talmud Bavlí, Berajot 13b ✅ (alargar el dálet de ejad)",
      "Gematría: ejad = 13 🔢, ahavá = 13 🔢, ejad+ahavá = 26 = YHVH 🔢",
      "Rashi sobre Devarim / Deuteronomio 6:4 ✅ (ejad: Dios Uno sobre los cuatro rincones del mundo y los cielos)",
    ],
    tarea: {
      semana: 48,
      herramienta: "Guematría honesta aplicada a la teología (ejad y ahavá como equivalencias verificadas); lectura del Pshat de un texto litúrgico fundamental.",
      enunciado:
        "Calcula la gematría de ejad (álef=1, jet=8, dálet=4) y de ahavá (álef=1, he=5, bet=2, he=5). Escribe el resultado. ¿Qué te dice que la unidad y el amor tengan el mismo valor? ¿Es coincidencia o significa algo? (150–300 palabras.)",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L49 ───────────────────────────────────────────────────────────────────
  {
    n: 49,
    id: "E3·J3·L49",
    slug: "el-alenu",
    title: "El Alenu — la plegaria del final y el tikkun olam",
    apertura: {
      question:
        "¿Por qué la plegaria que cierra cada día termina con una promesa sobre el futuro del mundo?",
    },
    estudio: [
      {
        t: "p",
        text: `**La última plegaria del día.** Al final de cada servicio de oración — Shajarit (mañana), Minjá (tarde), Arbit (noche) — la sinagoga recita el Alenu. No importa el día de la semana ni la estación del año: el Alenu cierra. Tiene dos partes muy distintas, y entenderlas es entender por qué la plegaria no termina con un suspiro sino con una promesa.`,
      },
      {
        t: "p",
        text: `**El texto del Alenu — primera parte.** El Alenu (עָלֵינוּ לְשַׁבֵּחַ) abre con una declaración de particularidad:`,
      },
      {
        t: "verse",
        he: "עָלֵינוּ לְשַׁבֵּחַ לַאֲדוֹן הַכֹּל לָתֵת גְּדֻלָּה לְיוֹצֵר בְּרֵאשִׁית שֶׁלֹּא עָשָׂנוּ כְּגוֹיֵי הָאֲרָצוֹת",
        es: "Sobre nosotros recae la obligación de alabar al Señor de todo, de dar grandeza al Formador del principio, que no nos hizo como las naciones de las tierras.",
        ref: "Alenu le-Shabeaj (liturgia verificable) ✅",
        sefaria: "Siddur Ashkenaz, Weekday Shacharit, Aleinu",
      },
      {
        t: "p",
        text: `La primera parte del Alenu habla de la misión particular de Israel: ser el pueblo que reconoce al Dios uno cuando el mundo aún no lo reconoce. Esta declaración no es de superioridad étnica — es de responsabilidad. El pueblo que recibió la Torá es el que debe cargar con la conciencia de la unidad divina en la historia. No "somos mejores": "somos responsables de esta tarea específica". La distinción es enorme.`,
      },
      {
        t: "p",
        text: `**El texto del Alenu — segunda parte.** La segunda parte es la que transforma toda la plegaria:`,
      },
      {
        t: "verse",
        he: "לְתַקֵּן עוֹלָם בְּמַלְכוּת שַׁדַּי",
        es: "Para rectificar el mundo bajo el reinado de Shaddai.",
        ref: "Alenu le-Shabeaj (liturgia) ✅",
        sefaria: "Siddur Ashkenaz, Weekday Shacharit, Aleinu",
      },
      {
        t: "p",
        text: `**"Le-takén olam be-malchut Shaddai"** — esta frase es la primera aparición en la liturgia judía del concepto de *tikkun olam* (תִּקּוּן עוֹלָם) ✅. La palabra *takén* (תַּקֵּן) significa "rectificar, corregir, reparar". El *olam* (עוֹלָם) es "el mundo". Y la reparación se hace *"be-malchut Shaddai"* — bajo el reinado de *Shaddai*, el Nombre patriarcal del pacto.\n\nNota qué Nombre se usa aquí: no YHVH, no Elohim, sino **Shaddai** — el Nombre con el que Dios se reveló a los patriarcas antes de la revelación del Sinaí (Éxodo 6:3 ✅). La reparación del mundo es una tarea que antecede al Sinaí: comienza con el pacto de Avraham. *Tikkun olam* no es solo una frase de activismo social moderno — tiene dos mil años de raíz litúrgica.`,
      },
      {
        t: "p",
        text: `**El versículo de Zacarías que cierra el Alenu.** La segunda parte termina citando a Zacarías:`,
      },
      {
        t: "verse",
        he: "וְהָיָה יְהוָה לְמֶלֶךְ עַל-כָּל-הָאָרֶץ בַּיּוֹם הַהוּא יִהְיֶה יְהוָה אֶחָד וּשְׁמוֹ אֶחָד",
        es: "Y YHVH será Rey sobre toda la tierra; en ese día YHVH será Uno y Su Nombre será Uno.",
        ref: "Zejaryá / Zacarías 14:9 ✅",
        sefaria: "Zechariah 14:9",
      },
      {
        t: "p",
        text: `Esta es la Shemá proyectada al futuro: si ahora la Shemá declara que YHVH *es* Uno, Zacarías anuncia que llegará el día en que todos los pueblos de la tierra lo *reconocerán* como Uno. La unidad de Dios que la Shemá afirma como realidad metafísica, el Alenu la convierte en horizonte histórico. El *tikkun olam* es el proceso de acercar ese reconocimiento.`,
      },
      {
        t: "p",
        text: `**El versículo de Isaías en el Alenu.** La segunda parte también cita a Isaías:`,
      },
      {
        t: "verse",
        he: "כִּי-לִי תִכְרַע כָּל-בֶּרֶךְ תִּשָּׁבַע כָּל-לָשׁוֹן",
        es: "Porque ante mí se doblará toda rodilla, toda lengua jurará.",
        ref: "Yeshayá / Isaías 45:23 ✅",
        sefaria: "Isaiah 45:23",
      },
      {
        t: "p",
        text: `La imagen no es de conquista: es de reconocimiento voluntario. Toda rodilla, toda lengua — no por coerción, sino porque en el horizonte escatológico la unidad de Dios se vuelve evidente a todos. El Alenu usa los Profetas (Isaías, Zacarías) para anclar en el Tanaj la visión universal que la segunda parte expresa.`,
      },
      {
        t: "p",
        text: `**El origen litúrgico del Alenu — Rosh Hashaná 32b.** El Talmud Bavlí, en **Rosh Hashaná 32b** ✅, describe el servicio de Musaf de Rosh Hashaná, que incluye las tres secciones especiales: *Maljuyot* (Reinados), *Zijoronot* (Memoriales) y *Shofarot* (Toques del Shofar). El Alenu es la plegaria que introduce la sección de *Maljuyot*. Esta es la primera aparición litúrgica documentada del Alenu ✅. Su composición se atribuye al Amora **Rav** ⚠️ (tradición; no es una atribución con fuente única verificable en el Talmud) o, en otra versión, a Yehoshúa ⚠️ (tradición no verificable con fuente única). Lo que sí es verificable: el Talmud conoce el Alenu en el contexto de Rosh Hashaná, y con el tiempo (Edad Media) se generalizó para cerrar los tres servicios diarios.`,
      },
      {
        t: "p",
        text: `**El Alenu conecta toda la teología de J3.** Este módulo estudiaste los Nombres divinos (L46), la tensión entre YHVH y Elohim en la Creación (L47), y la Shemá como declaración de unidad radical (L48). El Alenu los integra todos:\n\n- Los **Nombres**: usa Shaddai (el Nombre del pacto patriarcal) para describir el reinado bajo el que se repara el mundo; cierra con YHVH Ejad (la Shemá proyectada al futuro).\n- La tensión **YHVH / Elohim**: la primera parte del Alenu reconoce el orden particular (Elohim: el mundo tiene una estructura y un pueblo con una misión específica); la segunda parte la abre a la misericordia universal (YHVH: todo el mundo llegará al reconocimiento).\n- La **unidad**: el versículo final de Zacarías — *YHVH Ejad u-Shmo Ejad* — es la Shemá del futuro. La unidad que hoy se declara como verdad metafísica (la Shemá del presente) se convertirá en reconocimiento universal (la Shemá del futuro, Zacarías 14:9).`,
      },
    ],
    contemplacion: [
      "El Alenu cierra cada día con una promesa sobre el futuro del mundo. No con una petición: con una promesa. La segunda parte no dice 'ojalá' — dice 'para rectificar el mundo', como si ya fuera una tarea en curso. La oración no termina en el sujeto que reza: termina en el mundo que falta reparar. Eso convierte cada día — con todo lo que fue y todo lo que no fue — en un eslabón más de la cadena de tikkun. El día no se cierra con un punto final: se cierra con un arco que apunta hacia adelante.",
      "Shaddai — el Nombre del pacto con los patriarcas. 'Le-takén olam be-malchut Shaddai' — la reparación del mundo bajo el reinado del Dios del pacto. No bajo el Dios del Sinaí (YHVH) ni bajo el Dios de la Creación (Elohim): bajo el Dios que hizo una promesa a Avraham, Itzjak y Yaakov de que su descendencia sería luz para las naciones. La elección del Nombre en esta frase no es accidental. El tikkun olam es la forma en que la promesa patriarcal se extiende al horizonte universal.",
    ],
    accion: {
      text: [
        `Busca el texto del Alenu en un Sidur o en Sefaria (busca "Aleinu" o "Siddur Ashkenaz, Weekday Shacharit, Aleinu"). Lee las dos partes completas. Escribe: (1) ¿qué dice la primera parte? (2) ¿qué dice la segunda parte? (3) ¿qué frase describe el tikkun olam? Copia el versículo de Zacarías 14:9 que aparece al final.`,
      ],
      cta: { label: "Abrir el Alenu en Sefaria →", ref: "Siddur Ashkenaz, Weekday Shacharit, Aleinu" },
    },
    sello:
      "El Alenu (עָלֵינוּ לְשַׁבֵּחַ) cierra cada servicio. Primera parte: declaración de particularidad (Israel y su misión). Segunda parte: *le-takén olam be-malchut Shaddai* ✅ — 'rectificar el mundo bajo el reinado de Shaddai': la primera aparición litúrgica del concepto de tikkun olam ✅. Cierra con Zacarías 14:9 ✅ (*YHVH Ejad u-Shmo Ejad*) y con Isaías 45:23 ✅ (toda rodilla se doblará). Origen litúrgico: Rosh Hashaná 32b ✅ (Musaf de Rosh Hashaná; Maljuyot). Atribución a Rav ⚠️ o a Yehoshúa ⚠️ — tradición.",
    hilos: [
      { kind: "study", ref: "la-shema", label: "La Shemá del presente (YHVH Ejad) y la Shemá del futuro (Zacarías 14:9) — la misma declaración en dos tiempos." },
      { kind: "study", ref: "nombres-divinos", label: "¿Por qué el Alenu usa Shaddai y no YHVH para describir el reinado que rectifica el mundo?" },
    ],
    fuentes: [
      "Alenu le-Shabeaj ✅ (liturgia verificable en cualquier Sidur estándar y en Sefaria)",
      "Yeshayá / Isaías 45:23 ✅ (toda rodilla se doblará — fuente bíblica del Alenu)",
      "Zejaryá / Zacarías 14:9 ✅ (YHVH Ejad u-Shmo Ejad — el versículo escatológico final del Alenu)",
      "Talmud Bavlí, Rosh Hashaná 32b ✅ (origen litúrgico del Alenu en Musaf de Rosh Hashaná)",
    ],
    tarea: {
      semana: 49,
      herramienta: "Análisis estructural de una plegaria en dos partes; identificación del primer uso litúrgico de un concepto (tikkun olam); lectura de fuentes proféticas citadas en la liturgia.",
      enunciado:
        "Lee el texto del Alenu (búscalo en cualquier Sidur o en Sefaria como 'Aleinu'). Escribe: (1) ¿qué dice la primera parte? (2) ¿qué dice la segunda parte? (3) ¿qué frase describe el tikkun olam? Cita el versículo de Zacarías que aparece al final. (150–300 palabras.)",
      palabrasMin: 150,
      palabrasMax: 300,
    },
    closeModule:
      "Has completado J3 — y con él, el tercer módulo de JAVER. Cuatro semanas de trabajo en el corazón de la teología judía. Mira lo que recibiste: en L46 aprendiste los siete Nombres divinos que la halajá protege como umbrales de lo sagrado, y que cada Nombre revela un modo distinto de relación con lo infinito. En L47 viste cómo el texto de Génesis —en Pshat— ya lleva la distinción entre misericordia (YHVH) y juicio (Elohim), y cómo Rashi la lee desde el Midrash de Bereshit Rabá: el mundo no puede sostenerse solo con juicio, necesita también la misericordia. En L48 sostuviste la Shemá — seis palabras que el judío dice al despertar y al morir — y viste que ejad y ahavá suman lo mismo: 13. La unidad y el amor pesan lo mismo, y juntos forman el Nombre de Dios (26). En L49 el Alenu integró todo: los Nombres, la tensión YHVH/Elohim, la unidad de la Shemá — y lo proyectó al horizonte del mundo. *Le-takén olam be-malchut Shaddai*: la reparación del mundo es la tarea que queda. El siguiente módulo — J4, Sefer Yetzirah — te dará la primera respuesta a la pregunta que la Shemá deja abierta: si todo es Uno, ¿cómo surge lo múltiple? ¿Cómo de la Unidad nacieron los diez, los veintidós, los treinta y dos senderos? El libro más antiguo de la tradición lo responde. וְאֹרַח צַדִּיקִים כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר — la luz sigue creciendo.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO10 = {
  id: "J3",
  he: "שֵׁמוֹת",
  titulo: "El Nombre y la unidad",
  etapaHe: "חָבֵר",
  etapa: "Javer",
  etapaGloss: "el compañero de estudio",
  etapaNum: 3,
  etapasTotal: 6,
  total: LESSONS10.length,
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson10(slug: string): Lesson | undefined {
  return LESSONS10.find((l) => l.slug === slug);
}

export function lessonIndex10(slug: string): number {
  return LESSONS10.findIndex((l) => l.slug === slug);
}

export function nextLesson10(slug: string): Lesson | null {
  const i = lessonIndex10(slug);
  return i >= 0 && i < LESSONS10.length - 1 ? LESSONS10[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 10 ─────────────────────────────
// Slugs internos del Módulo 10.
const INTERNAL_SLUGS10: Record<string, string> = {
  "nombres-divinos": "nombres-divinos",
  "yhvh-elohim": "yhvh-elohim",
  "la-shema": "la-shema",
  "el-alenu": "el-alenu",
};

// Slugs de módulos anteriores que deben resolver a sus rutas propias.
const CROSS_MODULE_HREFS10: Record<string, string> = {
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
  "ibn-ezra": "/academia/modulo-8/ibn-ezra",
  "ramban": "/academia/modulo-8/ramban",
  "tres-voces-bereshit": "/academia/modulo-8/tres-voces-bereshit",
  "remez-practica": "/academia/modulo-8/remez-practica",
  "primera-lectura-pardes": "/academia/modulo-9/primera-lectura-pardes",
};

const MISTERIO_SLUGS10 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread10(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS10[key]) return { kind: "lesson", slug: INTERNAL_SLUGS10[key] };
  if (MISTERIO_SLUGS10.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href completo para M10 — incluye cross-module overrides.
export function resolveThreadHref10(h: Hilo): string | null {
  if (h.kind === "letter") return `/letras/${h.ref}`;
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS10[key]) return `/academia/modulo-10/${key}`;
  if (CROSS_MODULE_HREFS10[key]) return CROSS_MODULE_HREFS10[key];
  if (MISTERIO_SLUGS10.has(key)) return `/misterio/${key}`;
  return null;
}
