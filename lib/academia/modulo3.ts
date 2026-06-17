// ─────────────────────────────────────────────────────────────────────────
// modulo3.ts — ACADEMIA DE JASHMAL · Módulo 3 (T1·M3 · מֵרֵאשִׁית "La gran narrativa").
// Las 4 lecciones de las semanas 13–16, que cierran TALMID.
//
// El contenido (textos, citas, verificaciones) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - T1M3 - gran narrativa (Sofer).md", 2026-06-17.
// Se monta TAL CUAL: no se inventa, altera ni agrega ninguna fuente.
//
// Sigue EXACTAMENTE la estructura de modulo1.ts y modulo2.ts. Importa tipos desde allí.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView3 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── Expositivo 2 (EX-2) — Al cierre de T1·M3 (semana 16) ────────────────────

export const EX2 = {
  numero: 2,
  nivel: "talmid",
  titulo: "Una narrativa en Pshat: lo que el texto dice exactamente",
  enunciado: `El estudiante elige UNA de las cuatro narrativas estudiadas en T1·M3:

• Los siete días (Génesis 1:1–2:3)
• El jardín: Adam y Javá (Génesis 2:7–3:24)
• Nóaj y el arco (Génesis 6:9–9:17, con foco en el pacto 9:8–17)
• El llamado de Avraham (Génesis 12:1–9)

Herramientas exigidas (únicamente las introducidas hasta la semana 16):
1. Pshat narrativo (la herramienta central): leer el relato exactamente como está escrito, sin añadir ni quitar, atendiendo al orden, las palabras repetidas, lo que se dice y lo que no se dice.
2. La regla de la fuente (Kelal ha-Makor): todo lo que se afirma tiene una referencia exacta (Génesis cap:versículo). Mínimo 3 citas directas del texto con su referencia.
3. Al menos 1 observación de Rashi citada con referencia exacta (Rashi al versículo específico, con indicación del verso base). Se acepta que el estudiante la encuentre en Sefaria.
4. Gematría (opcional, bienvenida si el texto la sugiere): si el estudiante nota un número significativo en el texto elegido, puede calcularlo y anotarlo — siempre mostrando la suma letra por letra. No es obligatoria; se valora si aparece con rigor.

Extensión: 1.500–2.500 palabras.

Criterios de evaluación:
1. Pshat identificado — el estudiante describe el sentido literal del texto sin proyectar interpretación cabalística, midrásica o personal no señalada como tal.
2. Citas exactas — al menos 3 versículos citados con referencia (Génesis cap:versículo), verificables en Sefaria.
3. Observación Rashi — al menos 1 comentario de Rashi citado con su referencia exacta y distinguido del Pshat puro.
4. Distinción ✅/⚠️ — el estudiante distingue entre lo que el texto dice (✅) y lo que infiere o toma de una fuente secundaria (⚠️).
5. Observación propia (hiddush mínimo) — al menos un párrafo que señala algo que el estudiante notó por sí mismo.`,
  palabrasMin: 1500,
  palabrasMax: 2500,
} as const;

// ── Las 4 lecciones (verbatim del Sofer, 2026-06-17) ─────────────────────────

export const LESSONS3: Lesson[] = [
  // ── L13 ───────────────────────────────────────────────────────────────────
  {
    n: 13,
    id: "E1·M3·L13",
    slug: "los-siete-dias",
    title: "Los siete días — el primer amanecer",
    apertura: {
      question:
        "El texto dice 'y fue tarde y fue mañana, día primero'… 'y fue tarde y fue mañana, día segundo'… y así cada día. Pero en el séptimo día, esa fórmula desaparece. ¿Por qué el texto la omite exactamente ahí?",
    },
    estudio: [
      {
        t: "p",
        text: `**Qué tipo de texto es Génesis 1.** Antes de leer, hay que saber cómo leer. Génesis 1 no es un reporte científico ni una metáfora poética: es una **declaración teológica**. En Pshat, su propósito es decirnos quién creó el mundo y cuál es el orden de lo creado — no cómo funciona el universo en términos físicos. Leemos el texto como está escrito, sin añadir ni quitar.`,
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
        text: `**Dios crea por la palabra.** La herramienta del texto es la palabra. Cada acto de creación está introducido por la misma fórmula: **וַיֹּאמֶר אֱלֹהִים** (*va-yomer Elohim*, "Y dijo Dios"). El Sofer contó: esa fórmula aparece **diez veces** ✅ en Génesis 1 (versículos 3, 6, 9, 11, 14, 20, 24, 26, 28, 29). La tradición tomó nota:`,
      },
      {
        t: "verse",
        he: "בַּעֲשָׂרָה מַאֲמָרוֹת נִבְרָא הָעוֹלָם",
        es: "Con diez dichos fue creado el mundo.",
        ref: "Pirké Avot 5:1",
        sefaria: "Pirkei Avot 5:1",
      },
      {
        t: "p",
        text: `Pirké Avot 5:1 no es una interpretación libre: es el conteo del Pshat, formulado como enseñanza. El número no es decorativo — el texto dice "Y dijo Dios" exactamente diez veces. El mundo es la suma de diez palabras divinas.`,
      },
      {
        t: "p",
        text: `**La luz antes del sol.** Una observación de Pshat que el texto ofrece abiertamente, si uno la ve: la **luz** (אוֹר, *or*) se crea el **primer día** (versículo 3). El **sol y la luna** se crean el **cuarto día** (versículo 14). En Pshat: el tiempo — "y fue tarde y fue mañana" — existe desde el día primero, antes de que haya astros para medirlo. La tradición llama a esa luz primera **אוֹר גָּנוּז** (*or ganuz*, "la Luz guardada") ⚠️ — una lectura que el texto no dice explícitamente pero que la observación del Pshat hace inevitable: si la luz no es la del sol, ¿qué luz es? El texto no responde. Esa apertura es la invitación al Drash y al Sod — que estudiaremos mucho más adelante.`,
      },
      {
        t: "p",
        text: `**El séptimo día queda abierto.** Cada uno de los primeros seis días termina con la misma fórmula: **וַיְהִי-עֶרֶב וַיְהִי-בֹקֶר** (*va-yehí erev va-yehí voker*, "y fue tarde y fue mañana"). El séptimo día — el Shabbat — es el único que **no tiene** esa fórmula ✅ (Génesis 2:1–3). El día no se cierra. En Pshat: el séptimo día no termina en el texto. La tradición preguntó qué significa un día sin cierre — pero antes de responderlo, el estudiante de Pshat aprende a *notar* lo que el texto no dice.`,
      },
      {
        t: "verse",
        he: "וַיְבָרֶךְ אֱלֹהִים אֶת-יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אֹתוֹ כִּי בוֹ שָׁבַת מִכָּל-מְלַאכְתּוֹ",
        es: "Y bendijo Dios el séptimo día y lo santificó, porque en él descansó de toda su obra.",
        ref: "Bereshit / Génesis 2:3",
        sefaria: "Genesis 2:3",
      },
      {
        t: "p",
        text: `El séptimo día recibe dos acciones que ningún otro día recibe: **bendición** (בֵּרַךְ, *berajá*) y **santificación** (קִדֵּשׁ, *kidush*). El tiempo también puede ser sagrado — no solo los lugares o los objetos. Esa es la declaración del Pshat de Génesis 2:3. La razón del texto: "porque en él descansó (שָׁבַת, *shavat*) de toda su obra." De *shavat* viene *Shabbat*.`,
      },
      {
        t: "p",
        text: `**Una fuente antigua sobre el texto.** El libro más antiguo de la tradición mística, el *Sefer Yetzirah*, abre con los mismos 32 senderos que ya conocemos — y los conecta al texto de Génesis:`,
      },
      {
        t: "verse",
        he: "בִּשְׁלֹשִׁים וּשְׁתַּיִם נְתִיבוֹת פְּלִיאוֹת חָכְמָה חָקַק יָהּ",
        es: "Con treinta y dos senderos maravillosos de sabiduría grabó Yah [el mundo].",
        ref: "Sefer Yetzirah 1:1",
        sefaria: "Sefer Yetzirah 1:1",
      },
      {
        t: "p",
        text: `Los 32 senderos = 10 sefirot + 22 letras (✅ Sefer Yetzirah 1:2). Los diez "dichos" de la creación (Pirké Avot 5:1) resuenan con los diez senderos del número. Pero hoy no bajamos al Sod — ese análisis espera. Hoy registramos el Pshat: el texto de Génesis 1 articula la creación a través de **la palabra dicha diez veces**, y el Shabbat la sella sin cerrarla.`,
      },
      {
        t: "p",
        text: `**Por qué Rashi empieza por el principio.** Rashi, el comentarista más leído de la Torá, abre su comentario a Génesis 1:1 con una pregunta aparentemente sorprendente: ¿por qué la Torá empieza por la Creación y no por el primer mandamiento? Su respuesta: para enseñar que la tierra le pertenece a Dios, de modo que si las naciones cuestionan el derecho de Israel a la tierra, Israel puede responder: Dios creó el mundo y se lo dio a quien quiso ✅ (Rashi a Génesis 1:1, basado en Tehilim/Salmos 111:6). Esa es una lectura de Pshat con una intención muy concreta: el texto no empieza donde empieza por accidente.`,
      },
    ],
    contemplacion: [
      "El texto de Génesis 1 es preciso en sus repeticiones y preciso en sus omisiones. Diez veces 'Y dijo Dios.' Seis días con cierre. El séptimo, abierto. Leer en Pshat es aprender a contar: ¿cuántas veces? ¿Dónde aparece? ¿Dónde no aparece?",
      "El Shabbat no tiene 'y fue tarde y fue mañana.' Ese silencio en el texto es también una palabra.",
    ],
    accion: {
      text: [
        `Lee Génesis 1:1–5 (solo los primeros cinco versículos) y cuenta cuántas veces aparece la palabra אוֹר (*or*, "luz"). Anota los versículos exactos donde aparece. No interpretes todavía — solo cuenta.`,
      ],
      cta: { label: "Abrir Génesis 1:1 en el motor →", ref: "Genesis 1:1" },
    },
    sello:
      "Génesis 1: Dios crea por la palabra — 10 veces 'Y dijo Dios' ✅ (Pirké Avot 5:1 ✅). Luz el día 1, sol el día 4. El séptimo día se bendice y santifica pero no se cierra: no tiene 'fue tarde y fue mañana' ✅.",
    hilos: [
      { kind: "study", ref: "que-es-pardes", label: "¿Recuerdas los cuatro niveles? El texto de la creación tiene cuatro profundidades — Pshat es el piso." },
      { kind: "study", ref: "palabras-ancla", label: "El Shabbat y la santidad del tiempo — ¿qué tienen que ver emet, shalom y jai con los siete días?" },
    ],
    fuentes: [
      "Bereshit / Génesis 1:1–2:3 ✅",
      "Pirké Avot 5:1 ✅ (diez dichos de la creación)",
      "Rashi a Génesis 1:1 ✅ (la tierra pertenece a Dios; base: Tehilim 111:6)",
      "Sefer Yetzirah 1:1 ✅",
      "or ganuz (Luz guardada) ⚠️ — tradición midrásica, no cita literal de Gn 1",
    ],
    tarea: {
      semana: 13,
      herramienta: "Pshat narrativo: leer un relato bíblico atendiendo al orden, las palabras elegidas y la estructura",
      enunciado:
        "Lee Génesis 1:1–5 (la creación del primer día). Escribe en Pshat: ¿qué creó Dios el primer día? ¿Cuántas veces aparece la palabra 'luz' (or, אוֹר) en esos cinco versículos? Cita el versículo exacto donde aparece cada vez. No interpretes — solo registra lo que el texto dice.",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L14 ───────────────────────────────────────────────────────────────────
  {
    n: 14,
    id: "E1·M3·L14",
    slug: "el-jardin-adam-java",
    title: "El jardín, Adam y Javá — el primer límite",
    apertura: {
      question:
        "Dios le dijo una cosa. Javá repitió algo ligeramente distinto. ¿Puedes encontrar la diferencia en el texto?",
    },
    estudio: [
      {
        t: "p",
        text: `**Cómo leer este relato.** El relato del jardín (Génesis 2–3) es uno de los textos más comentados de toda la literatura humana. Cada siglo le añadió capas: filosóficas, teológicas, psicoanalíticas. Hoy lo leemos en **Pshat puro**: qué dice el texto exactamente, palabra por palabra, sin proyectar lo que creemos que "significa". El Pshat es el piso — y solo cuando ese piso es firme, los niveles superiores no se derrumban.`,
      },
      {
        t: "p",
        text: `**El jardín y los dos árboles.** En Génesis 2:9 el texto nombra dos árboles especiales en el Jardín del Edén: el **árbol de la vida** (עֵץ הַחַיִּים, *etz ha-jaím*) y el **árbol del conocimiento del bien y del mal** (עֵץ הַדַּעַת טוֹב וָרָע, *etz ha-da'at tov va-ra*). En Pshat: ambos están en el centro del jardín.`,
      },
      {
        t: "p",
        text: `**El mandato exacto.** Dios le dice a Adam en Génesis 2:16–17:`,
      },
      {
        t: "verse",
        he: "מִכֹּל עֵץ-הַגָּן אָכֹל תֹּאכֵל. וּמֵעֵץ הַדַּעַת טוֹב וָרָע לֹא תֹאכַל מִמֶּנּוּ כִּי בְּיוֹם אֲכָלְךָ מִמֶּנּוּ מוֹת תָּמוּת",
        es: "De todo árbol del jardín comerás. Pero del árbol del conocimiento del bien y del mal, no comerás — porque el día que comieras de él, ciertamente morirás.",
        ref: "Bereshit / Génesis 2:16–17",
        sefaria: "Genesis 2:16",
      },
      {
        t: "p",
        text: `En Pshat: el mandato prohíbe **comer** del árbol del conocimiento. El árbol de la vida no se prohíbe — no en este momento. El texto no dice "no toques", no dice "no mires"; dice "no comas." La precisión del texto importa: es todo lo que Dios dijo, y nada más.`,
      },
      {
        t: "p",
        text: `**La serpiente y la pregunta.** En Génesis 3:1–3 la serpiente pregunta a Javá por el mandato. Javá responde:`,
      },
      {
        t: "verse",
        he: "מִפְּרִי עֵץ-הַגָּן נֹאכֵל. וּמִפְּרִי הָעֵץ אֲשֶׁר בְּתוֹךְ-הַגָּן אָמַר אֱלֹהִים לֹא תֹאכְלוּ מִמֶּנּוּ וְלֹא תִגְּעוּ בּוֹ פֶּן תְּמֻתוּן",
        es: "Del fruto de los árboles del jardín comeremos. Pero del fruto del árbol que está en medio del jardín, dijo Dios: no comeréis de él ni lo toquéis, no sea que muráis.",
        ref: "Bereshit / Génesis 3:2–3",
        sefaria: "Genesis 3:2",
      },
      {
        t: "p",
        text: `El Sofer comparó el texto de 2:17 con el de 3:3 letra a letra. Hay **dos diferencias detectables en Pshat**:\n\n1. **Javá añade: "ni lo toquéis"** (וְלֹא תִגְּעוּ בּוֹ). Esas cuatro palabras no están en el mandato original de Génesis 2:17. Dios no dijo "ni lo toques" ✅.\n\n2. **La formulación de la consecuencia cambia.** Dios dijo: **"ciertamente morirás"** (מוֹת תָּמוּת, un énfasis absoluto en hebreo — el verbo repetido como infinitivo). Javá dice: **"no sea que muráis"** (פֶּן תְּמֻתוּן) — una formulación más suave, que suena a posibilidad y no a certeza ✅.`,
      },
      {
        t: "p",
        text: `Rashi nota el agregado de Javá y lo señala como un problema:`,
      },
      {
        t: "verse",
        he: "הוֹסִיפָה עַל הַצִּוּוּי, לְפִיכָךְ בָּאָה לִידֵי גְרִיעָה",
        es: "Añadió al mandato — por eso llegó a mermar de él.",
        ref: "Rashi a Bereshit / Génesis 3:3",
        sefaria: "Rashi on Genesis 3:3",
      },
      {
        t: "p",
        text: `La lógica de Rashi (⚠️ interpretación midrásica, no Pshat puro): quien añade a un mandato eventualmente lo quiebra. Si Javá añadió "ni lo toques" y luego vio que podía tocar el árbol sin morir, concluyó que quizá también podía comer. La adición es la grieta. Este es el nivel Drash del texto — que Rashi maneja naturalmente porque es su modo de lectura. Nosotros lo registramos como lectura clásica, distinguiéndola del Pshat.`,
      },
      {
        t: "p",
        text: `**Lo que el Pshat dice y lo que no dice.** En Pshat, el texto de Génesis 3 no explica por qué Javá añadió "ni lo toques." No dice que Dios se lo ordenó a ella (la instrucción en 2:17 está dirigida a Adam, antes de que Javá fuera creada). El texto simplemente registra la diferencia. Y esa diferencia — un agregado de cuatro palabras — es lo que el Pshat ofrece al lector honesto que cuenta con cuidado. El ejercicio de Pshat no es encontrar "la moraleja": es **notar exactamente qué dice el texto**.`,
      },
    ],
    contemplacion: [
      "Javá recibió el mandato de segunda mano y lo repitió añadiéndole algo. El Pshat no juzga ese gesto — lo registra. La pregunta que queda abierta: ¿cuántas veces transmitimos una enseñanza añadiéndole algo que no estaba? La honestidad del método de Jashmal empieza aquí: citar exactamente lo que la fuente dice, no lo que creemos que dice.",
    ],
    accion: {
      text: [
        `Abre Génesis 2:17 y Génesis 3:3 en Sefaria, uno al lado del otro. Lee los dos versículos en hebreo o en tu idioma. Escribe en una línea la diferencia que notas. No es una interpretación — es una observación del texto. Ese gesto — comparar dos versículos — es el comienzo del método de Rashi.`,
      ],
      cta: { label: "Abrir Génesis 2:17 en el motor →", ref: "Genesis 2:17" },
    },
    sello:
      "El mandato de Génesis 2:17 es exacto: no comas del árbol del conocimiento ✅. Javá lo repite con dos diferencias: añade 'ni lo toquéis' (no está en el original) y suaviza la consecuencia. Rashi señala el agregado ✅. El Pshat no interpreta: registra la diferencia.",
    hilos: [
      { kind: "study", ref: "los-siete-dias", label: "El jardín es continuación de la creación — ¿qué quedó sin cerrar en el séptimo día?" },
      { kind: "study", ref: "noaj-y-el-arco", label: "Después del jardín, el primer pacto — ¿cómo repara Dios lo que se rompió?" },
    ],
    fuentes: [
      "Bereshit / Génesis 2:9 ✅ (los dos árboles)",
      "Bereshit / Génesis 2:16–17 ✅ (el mandato exacto)",
      "Bereshit / Génesis 3:2–3 ✅ (la repetición de Javá)",
      "Rashi a Génesis 3:3 ✅ (el agregado que lleva a la merma)",
      "Pirkei de-Rabí Eliezer cap. 13 ⚠️ (tradición sobre la serpiente empujando el árbol para demostrar que el toque no mata)",
    ],
    tarea: {
      semana: 14,
      herramienta: "La pregunta del Pshat: observar lo que el texto no dice para entender mejor lo que sí dice",
      enunciado:
        "Lee Génesis 2:15–17 (la instrucción de Dios en el jardín). ¿Qué se le dice a Adam exactamente? ¿Qué árbol se menciona? ¿Qué árbol no se menciona en esta instrucción pero aparece en el capítulo? Escribe solo lo que el texto dice, no lo que crees que implica. Esta observación — notar lo que está y lo que no está — es el comienzo de preguntar como Rashi.",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L15 ───────────────────────────────────────────────────────────────────
  {
    n: 15,
    id: "E1·M3·L15",
    slug: "noaj-y-el-arco",
    title: "Nóaj y el arco — el primer pacto",
    apertura: {
      question:
        "El arco en las nubes. Lo vemos y pensamos en belleza. El texto habla de otra cosa. ¿Qué dice exactamente sobre para qué sirve?",
    },
    estudio: [
      {
        t: "p",
        text: `**Nóaj en Pshat.** El relato de Nóaj (Génesis 6–9) es extenso. Para esta lección, el Pshat narrativo se enfoca en la estructura del pacto (Génesis 9:8–17) — porque es el **primer** *brit* (בְּרִית, "pacto") explícito en la Torá. Antes del Sinaí, antes de la circuncisión de Avraham, antes de todo pacto que venga: este es el primero que el texto llama *brit* por su nombre.`,
      },
      {
        t: "p",
        text: `**Un hombre íntegro.** El texto presenta a Nóaj con un calificativo preciso:`,
      },
      {
        t: "verse",
        he: "נֹחַ אִישׁ צַדִּיק תָּמִים הָיָה בְּדֹרֹתָיו",
        es: "Nóaj era un hombre justo, íntegro en sus generaciones.",
        ref: "Bereshit / Génesis 6:9",
        sefaria: "Genesis 6:9",
      },
      {
        t: "p",
        text: `Rashi detiene el texto aquí y señala que hay dos formas de leer "en sus generaciones" (בְּדֹרֹתָיו, *be-dorotav*) ✅: algunos sabios lo leen como elogio ("incluso en generaciones tan corruptas, era íntegro — cuánto más lo hubiera sido en otras circunstancias"), y otros como limitación ("íntegro para los estándares de su generación, pero comparado con Avraham habría sido menos"). El Pshat tiene los dos significados disponibles: la palabra hebrea no decide. Ese es el tipo de observación que el Pshat del texto entrega sin esfuerzo, si uno la busca.`,
      },
      {
        t: "p",
        text: `**La estructura del pacto de Génesis 9:8–17.** El texto establece el pacto con una arquitectura muy precisa. El Sofer la leyó versículo por versículo:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Quién inicia:** Dios (*va-yomer Elohim*, "y dijo Dios" — v. 8). No Nóaj, no la humanidad.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Con quién:** con Nóaj, sus hijos, y — explícitamente — con **todo ser viviente** (כָּל-נֶפֶשׁ חַיָּה, *kol nefesh jayá*) que salió del arca: aves, animales, toda criatura de la tierra ✅ (v. 10). Es el primer pacto universal: no es solo con los humanos.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Qué se promete:** nunca más un diluvio para destruir toda carne ✅ (v. 11). Una negativa — una promesa de lo que NO volverá a ocurrir.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**La señal (אוֹת, *ot*):** el arco (*keshet*, קֶשֶׁת) en las nubes ✅ (v. 13). En Pshat: el arco no es un recordatorio para la humanidad — el texto dice algo diferente.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Para cuánto tiempo:** generaciones eternas (לְדֹרֹת עוֹלָם, *le-dorot olam*, "pacto eterno" ✅ v. 16).`,
      },
      {
        t: "verse",
        he: "אֶת-קַשְׁתִּי נָתַתִּי בֶּעָנָן וְהָיְתָה לְאוֹת בְּרִית בֵּינִי וּבֵין הָאָרֶץ",
        es: "Mi arco he puesto en la nube, y será por señal del pacto entre Yo y la tierra.",
        ref: "Bereshit / Génesis 9:13",
        sefaria: "Genesis 9:13",
      },
      {
        t: "p",
        text: `**Para quién es la señal.** El versículo 14–15 aclara algo que el Pshat ofrece y que habitualmente se pasa por alto: *"cuando haga venir nubes sobre la tierra y se vea el arco en la nube, entonces **Yo recordaré** mi pacto."* En Pshat: el arco no es para que los humanos recuerden — es para que **Dios recuerde**. El texto lo dice así, y el Pshat respeta esa formulación ✅ (Génesis 9:15: *"ve-zajarti et-berití"* — "y recordaré mi pacto").`,
      },
      {
        t: "p",
        text: `**El número siete.** El Sofer contó cuántas veces aparece la palabra *brit* (בְּרִית, "pacto") en Génesis 9:8–17. El resultado: **siete veces** ✅ (versículos 9, 11, 12, 13, 15, 16, 17). El número no es decorativo en la Torá — siete es el número de la completitud (los siete días, ya los conocemos). Un pacto eterno se sella con el número de la completitud de la creación.`,
      },
      {
        t: "verse",
        he: "וְרָאִיתִי אֹתָהּ לִזְכֹּר בְּרִית עוֹלָם בֵּין אֱלֹהִים וּבֵין כָּל-נֶפֶשׁ חַיָּה בְּכָל-בָּשָׂר אֲשֶׁר עַל-הָאָרֶץ",
        es: "Y lo veré [el arco] para recordar el pacto eterno entre Dios y todo ser viviente de toda carne que está sobre la tierra.",
        ref: "Bereshit / Génesis 9:16",
        sefaria: "Genesis 9:16",
      },
      {
        t: "p",
        text: `**Las siete leyes noájidas.** El Talmud en Sanhedrín 56a–57b ✅ codifica siete leyes que, según la tradición rabínica, le corresponden a toda la humanidad desde Nóaj — no solo al pueblo judío. Son conocidas como las **שֶׁבַע מִצְווֹת בְּנֵי נֹחַ** (*Sheva Mitzvot Bnei Noaj*, "siete mandamientos de los hijos de Nóaj"): no idolatría, no blasfemia, no asesinato, no relaciones prohibidas, no robo, establecer tribunales de justicia, y no arrancar un miembro de un animal vivo. El texto de Génesis 9 no las lista explícitamente — el Talmud las deriva por inferencia del Pshat. Esa derivación la estudiaremos en Shoel; aquí basta saber que el Pshat del pacto de Nóaj tiene implicaciones universales, y que la tradición las codificó.`,
      },
    ],
    contemplacion: [
      "El arco en las nubes es, en el Pshat del texto, una señal para Dios — no para nosotros. La próxima vez que lo veas, el texto tiene una capa que la mirada cotidiana no ve: no es Dios mostrándonos belleza. Es Dios viendo su propio recordatorio.",
      "El primer pacto de la Torá es universal: con toda criatura viviente, no solo con los humanos. La responsabilidad de ese pacto tampoco es solo humana.",
    ],
    accion: {
      text: [
        `Lee Génesis 9:8–17 en español (o en hebreo si puedes). Cuenta cuántas veces aparece la palabra "pacto" (brit). Luego busca el versículo que dice para quién sirve el arco como señal — ¿para la humanidad o para Dios? Escribe la referencia exacta (Génesis 9: _).`,
      ],
      cta: { label: "Abrir Génesis 9:8 en el motor →", ref: "Genesis 9:8" },
    },
    sello:
      "El primer brit de la Torá (Génesis 9:8–17): Dios lo inicia, incluye a toda criatura viviente ✅, promete no volver a destruir ✅, la señal es el arco para que Dios recuerde ✅ (Génesis 9:15). La palabra brit aparece 7 veces en ese pasaje ✅. Las 7 leyes noájidas: Sanhedrín 56a–57b ✅.",
    hilos: [
      { kind: "study", ref: "el-jardin-adam-java", label: "El primer límite se rompió en el jardín — el primer pacto responde desde Nóaj" },
      { kind: "study", ref: "lej-leja-avraham", label: "El siguiente pacto, el más personal: Dios llama a Avraham por su nombre" },
    ],
    fuentes: [
      "Bereshit / Génesis 6:9 ✅ (Nóaj, íntegro en sus generaciones)",
      "Bereshit / Génesis 9:8–17 ✅ (el texto completo del pacto)",
      "Bereshit / Génesis 9:13 ✅ (el arco como señal)",
      "Bereshit / Génesis 9:15 ✅ (Dios recordará — ve-zajarti)",
      "Bereshit / Génesis 9:16 ✅ (pacto eterno con toda carne)",
      "Rashi a Génesis 6:9 ✅ (la controversia sobre 'en sus generaciones')",
      "Sanhedrín 56a–57b ✅ (las 7 leyes noájidas derivadas del Pshat)",
    ],
    tarea: {
      semana: 15,
      herramienta: "El pacto (brit, בְּרִית) como estructura narrativa: reconocer quién habla, quién recibe, qué se promete, cuál es la señal",
      enunciado:
        "Lee Génesis 9:8–17 (el pacto con Nóaj). ¿Cuántas veces aparece la palabra 'pacto' (brit, בְּרִית) en ese pasaje? ¿Con quién establece Dios el pacto? ¿Cuál es la señal? Cita los versículos exactos. Escribe un párrafo sobre qué estructura ves: quién habla, quién recibe, qué se promete, cuál es la señal.",
      palabrasMin: 150,
      palabrasMax: 300,
    },
  },

  // ── L16 ───────────────────────────────────────────────────────────────────
  {
    n: 16,
    id: "E1·M3·L16",
    slug: "lej-leja-avraham",
    title: "Lej lejá — Avraham · el primer llamado",
    apertura: {
      question:
        "Dios le habla a Avraham por primera vez. ¿Cuántas cosas le pide dejar? ¿Cuántas cosas le promete?",
    },
    estudio: [
      {
        t: "p",
        text: `**Por qué este es el momento fundacional.** El texto de Génesis 12:1–9 es el momento en que comienza la historia del pueblo judío — y, por extensión, la cadena de transmisión que Jashmal recibe y transmite. Antes de este momento, los textos que estudiamos (la creación, el jardín, el pacto con Nóaj) hablan de la humanidad entera. Desde este momento, hay un individuo llamado por su nombre, con una promesa y una misión. En Pshat: leemos lo que el texto dice y lo que no dice.`,
      },
      {
        t: "verse",
        he: "וַיֹּאמֶר יְהוָה אֶל-אַבְרָם לֶךְ-לְךָ מֵאַרְצְךָ וּמִמּוֹלַדְתְּךָ וּמִבֵּית אָבִיךָ אֶל-הָאָרֶץ אֲשֶׁר אַרְאֶךָּ",
        es: "Y dijo YHVH a Avram: Ve para ti, de tu tierra, de tu natividad y de la casa de tu padre, hacia la tierra que te mostraré.",
        ref: "Bereshit / Génesis 12:1",
        sefaria: "Genesis 12:1",
      },
      {
        t: "p",
        text: `**El llamado: tres cosas que dejar.** El imperativo es uno: **לֶךְ-לְךָ** (*lej lejá*, "ve para ti"). La partícula *lejá* no es un segundo imperativo — es un pronombre reflexivo que la tradición lee como "para tu propio bien, para tu beneficio" ✅ (Rashi a Génesis 12:1). El mandato tiene tres complementos con *mi-* ("de"): **de tu tierra** (מֵאַרְצְךָ), **de tu natividad** (וּמִמּוֹלַדְתְּךָ), **de la casa de tu padre** (וּמִבֵּית אָבִיךָ). Tres cosas a dejar ✅, en orden de dificultad creciente según Rashi: la tierra es lo más fácil de dejar; la casa del padre es lo más difícil.`,
      },
      {
        t: "p",
        text: `**El destino: sin nombre.** El texto no dice adónde va Avraham: "hacia la tierra que **te mostraré**" — el destino está en el futuro, en el gesto divino. El texto no le dice "a Canaán" todavía. En Pshat: se le pide dejar lo conocido (tierra, natividad, familia) hacia lo desconocido (un lugar que se revelará). Esa tensión — del conocido al desconocido — es la estructura de todo llamado en la Torá.`,
      },
      {
        t: "verse",
        he: "וְאֶעֶשְׂךָ לְגוֹי גָּדוֹל וַאֲבָרֶכְךָ וַאֲגַדְּלָה שְׁמֶךָ וֶהְיֵה בְּרָכָה. וַאֲבָרֲכָה מְבָרְכֶיךָ וּמְקַלֶּלְךָ אָאֹר וְנִבְרְכוּ בְךָ כֹּל מִשְׁפְּחֹת הָאֲדָמָה",
        es: "Y haré de ti una gran nación, y te bendeciré, y engrandeceré tu nombre, y serás bendición. Y bendeciré a los que te bendigan, y al que te maldiga maldeciré; y en ti serán benditas todas las familias de la tierra.",
        ref: "Bereshit / Génesis 12:2–3",
        sefaria: "Genesis 12:2",
      },
      {
        t: "p",
        text: `**Las siete promesas.** El Sofer contó las promesas en Génesis 12:2–3: hay **siete** frases introducidas por "y" (ו, *vav* conjuntivo) ✅:\n\n1. "Haré de ti una gran nación"\n2. "Te bendeciré"\n3. "Engrandeceré tu nombre"\n4. "Serás bendición"\n5. "Bendeciré a los que te bendigan"\n6. "Al que te maldiga maldeciré"\n7. "En ti serán benditas todas las familias de la tierra"\n\nSiete — el número del pacto completo que ya conocemos de Nóaj. Y la última promesa extiende la bendición a **todas las familias de la tierra** — el llamado personal no es solo para Avraham: tiene una dimensión universal ✅.`,
      },
      {
        t: "p",
        text: `**La respuesta de Avraham.** Génesis 12:4:`,
      },
      {
        t: "verse",
        he: "וַיֵּלֶךְ אַבְרָם כַּאֲשֶׁר דִּבֶּר אֵלָיו יְהוָה",
        es: "Y fue Avram como le había dicho YHVH.",
        ref: "Bereshit / Génesis 12:4",
        sefaria: "Genesis 12:4",
      },
      {
        t: "p",
        text: `En Pshat: no hay respuesta verbal de Avraham. No hay pregunta ("¿a dónde?"), no hay duda ("¿cómo podré?"), no hay negociación. El texto dice simplemente "y fue Avram como le había dicho YHVH." Rashi señala que tenía 75 años ✅ (Génesis 12:4: "y Avram tenía setenta y cinco años cuando salió de Jarán") — una edad en que moverse es costoso. El Pshat del texto no explica la obediencia: la registra. Y la registra con una economía de palabras notable.`,
      },
      {
        t: "p",
        text: `**Este es el primer llamado personal de Dios a un individuo.** En la Torá, Dios habló con Adam, con Nóaj — pero el llamado de Génesis 12:1 tiene una dimensión nueva: es *personal* (le habla a Avraham por su nombre), es *direccional* (no "no hagas esto" sino "ve hacia allá"), y tiene un *propósito* que trasciende al individuo (bendición para todas las familias). Pirké Avot 5:3 ✅ cuenta las diez pruebas de Avraham — el *lej lejá* es la primera de ellas.`,
      },
      {
        t: "verse",
        he: "בַּעֲשָׂרָה נִסְיוֹנוֹת נִתְנַסָּה אַבְרָהָם אָבִינוּ וְעָמַד בְּכֻלָּם",
        es: "Con diez pruebas fue probado Avraham nuestro padre, y resistió en todas ellas.",
        ref: "Pirké Avot 5:3",
        sefaria: "Pirkei Avot 5:3",
      },
      {
        t: "p",
        text: `**La parábola del palacio en llamas.** El Midrash (Bereshit Rabá 39:1) ofrece una imagen para entender cómo Avraham llegó a reconocer a Dios antes de recibir el llamado ✅. La parábola: alguien viaja y ve un palacio que arde. Piensa: "¿es posible que este palacio no tenga dueño?" El dueño del palacio se asoma desde arriba y dice: "yo soy el dueño del palacio." Así Avraham vio el mundo en llamas (lleno de corrupción) y se preguntó si tenía dueño — y Dios le respondió. Eso es Drash, no Pshat. Lo distinguimos: el texto de Génesis 12:1 no narra el proceso por el cual Avraham llegó a creer; el Midrash lo añade. La diferencia importa: Pshat = lo que el texto dice; Drash = lo que los sabios añaden. Ambos son válidos, pero en pisos distintos.`,
      },
    ],
    contemplacion: [
      "Avraham no pregunta adónde va. No negocia. El texto dice 'y fue Avram como le había dicho YHVH.' Esa frase — sin más — es todo lo que el texto da sobre la respuesta interna de Avraham. El Pshat respeta ese silencio. No lo llena con lo que queremos que haya dicho.",
      "Terminamos el primer año de cimientos habiendo leído la narrativa que sostiene todo lo demás: la creación, el primer límite, el primer pacto universal, el primer llamado personal. Lo leímos en Pshat — en el piso firme. Ahora sabes lo que el texto dice. El camino hacia SHOEL es aprender a preguntarle.",
    ],
    accion: {
      text: [
        `Lee Génesis 12:1–4. Escribe dos columnas: en la izquierda, las tres cosas que el texto dice que Avraham debe dejar; en la derecha, las siete promesas que Dios le hace. Luego escribe en una línea lo que el texto dice que hizo Avraham. Solo el texto — nada más.`,
      ],
      cta: { label: "Abrir Génesis 12:1 en el motor →", ref: "Genesis 12:1" },
    },
    sello:
      "Génesis 12:1: un imperativo — lej lejá (ve para ti) — con tres cosas a dejar (tierra, natividad, casa del padre) ✅. Siete promesas en 12:2–3 ✅. Avraham tenía 75 años ✅. Respuesta: 'y fue Avram como le había dicho YHVH' — sin preguntas, sin dudas. Primera prueba de diez (Pirké Avot 5:3 ✅).",
    hilos: [
      { kind: "study", ref: "noaj-y-el-arco", label: "El pacto universal de Nóaj — ahora el llamado personal de Avraham: ¿qué diferencia a un pacto de un llamado?" },
      { kind: "study", ref: "que-es-pardes", label: "Aprendiste el Pshat de cuatro narrativas. El próximo nivel — SHOEL — te enseña a preguntarle al texto: ¿por qué dice esto y no aquello? Ese es el camino de Rashi." },
    ],
    fuentes: [
      "Bereshit / Génesis 12:1–9 ✅",
      "Rashi a Génesis 12:1 ✅ (lej lejá = ve para tu bien; el orden de los tres abandonos)",
      "Pirké Avot 5:3 ✅ (las diez pruebas de Avraham)",
      "Bereshit Rabá 39:1 ✅ (parábola del palacio en llamas — Drash, no Pshat)",
    ],
    tarea: {
      semana: 16,
      herramienta: "El llamado como estructura narrativa: Dios llama → da instrucción → da promesa → la persona responde",
      enunciado:
        "Lee Génesis 12:1–4 (el llamado a Avraham). ¿Qué le dice Dios exactamente? ¿Cuántas cosas le pide dejar (v. 1)? ¿Qué le promete Dios (vv. 2–3)? ¿Qué hizo Avraham en respuesta (v. 4)? Escribe en Pshat: ¿qué dice el texto, sin interpretar aún el 'lej lejá' en su nivel más profundo?",
      palabrasMin: 150,
      palabrasMax: 300,
    },
    closeModule:
      "Llegaste al final de TALMID. En dieciséis semanas — y en un año de cimientos — hiciste el camino completo: aprendiste qué es la Torá y el Tanaj, cómo se lee una fuente, el alefato, PaRDeS, las letras hebreas como canales vivos, y la gran narrativa del Génesis en Pshat. Leíste la creación, el jardín, el primer pacto con toda criatura viviente, y el primer llamado personal — el mismo llamado que la cadena de la tradición ha transmitido de mano en mano desde entonces. Ahora el texto está delante de ti. El grado SHOEL te espera con la herramienta que transforma un lector en estudioso: la pregunta. Porque Dios no dijo 'cree'; dijo 'escucha'. Y el que escucha bien, pronto pregunta. כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר — la luz del alba sigue creciendo.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO3 = {
  id: "T3",
  he: "מֵרֵאשִׁית",
  titulo: "La gran narrativa",
  etapaHe: "תַּלְמִיד",
  etapa: "Talmid",
  etapaGloss: "estudiante",
  etapaNum: 1,
  etapasTotal: 6,
  total: LESSONS3.length,
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson3(slug: string): Lesson | undefined {
  return LESSONS3.find((l) => l.slug === slug);
}

export function lessonIndex3(slug: string): number {
  return LESSONS3.findIndex((l) => l.slug === slug);
}

export function nextLesson3(slug: string): Lesson | null {
  const i = lessonIndex3(slug);
  return i >= 0 && i < LESSONS3.length - 1 ? LESSONS3[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 3 ──────────────────────────────
// Slugs internos del Módulo 3.
const INTERNAL_SLUGS3: Record<string, string> = {
  "los-siete-dias": "los-siete-dias",
  "el-jardin-adam-java": "el-jardin-adam-java",
  "noaj-y-el-arco": "noaj-y-el-arco",
  "lej-leja-avraham": "lej-leja-avraham",
};

// Slugs de módulos anteriores que deben resolver a sus rutas propias.
const CROSS_MODULE_HREFS: Record<string, string> = {
  "que-es-pardes": "/academia/modulo-1/que-es-pardes",
  "palabras-ancla": "/academia/modulo-2/palabras-ancla",
};

const MISTERIO_SLUGS3 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread3(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS3[key]) return { kind: "lesson", slug: INTERNAL_SLUGS3[key] };
  if (MISTERIO_SLUGS3.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href completo para M3 — incluye cross-module overrides.
export function resolveThreadHref3(h: Hilo): string | null {
  if (h.kind === "letter") return `/letras/${h.ref}`;
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS3[key]) return `/academia/modulo-3/${key}`;
  if (CROSS_MODULE_HREFS[key]) return CROSS_MODULE_HREFS[key];
  if (MISTERIO_SLUGS3.has(key)) return `/misterio/${key}`;
  return null;
}
