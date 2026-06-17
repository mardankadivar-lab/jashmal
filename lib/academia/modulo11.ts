// ─────────────────────────────────────────────────────────────────────────
// modulo11.ts — ACADEMIA DE JASHMAL · Módulo 11 (J4 · סֵפֶר הַיְצִירָה — "Diez dichos, diez sefirot").
// Las 3 lecciones de las semanas 50–52, cuarto y último módulo de JAVER.
// Cierre del Año 1 completo de la Academia.
//
// El contenido (textos, citas, verificaciones) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - J4 - sefer-yetzirah (Sofer).md", 2026-06-17.
// Se monta TAL CUAL: no se inventa, altera ni agrega ninguna fuente.
//
// Sigue EXACTAMENTE la estructura de modulo7.ts.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView11 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── EX-5 — Expositivo 5 / Proyecto Final de JAVER ──────────────────────────
// Al cierre de J4, semana 52.

export const EX5 = {
  numero: 5,
  nivel: "javer",
  titulo: "Mi primer mapa cabalístico: una sefirot, un texto, cuatro niveles",
  enunciado: `El Proyecto Final de JAVER. Elige UNA sefirot de las diez y estúdiala en los cuatro niveles de PaRDeS:

1. Pshat — qué dice el Sefer Yetzirah sobre esa sefirot (con referencia exacta)
2. Remez — su valor numérico y conexiones gematricas (verificadas letra por letra)
3. Drash — cómo aparece en el Midrash o los comentaristas
4. Sod — lo que el estudiante intuye, marcado explícitamente como intuición ('hiddush propio', no fuente verificada)

Herramientas exigidas: PaRDeS completo · al menos 3 fuentes verificadas · gematría verificada · distinción ✅/⚠️ · hiddush genuino.
Extensión: 2.500–4.000 palabras.`,
  palabrasMin: 2500,
  palabrasMax: 4000,
} as const;

// ── Las 3 lecciones (verbatim del Sofer, 2026-06-17) ─────────────────────────

export const LESSONS11: Lesson[] = [
  // ── L50 ───────────────────────────────────────────────────────────────────
  {
    n: 50,
    id: "E3·J4·L50",
    slug: "sefer-yetzirah",
    title: "El Sefer Yetzirah — el libro de la formación",
    apertura: {
      question:
        "Un libro de menos de 2.000 palabras que describe cómo Dios creó el universo. ¿Qué puede decir en tan poco?",
    },
    estudio: [
      {
        t: "p",
        text: `**El umbral de la Cabalá.** Llegaste a semana 50. En las últimas tres semanas estudiaste los Nombres divinos (J3): por qué YHVH y Elohim revelan atributos distintos, por qué la Shemá es la declaración metafísica más densa del judaísmo, y por qué el Alenu cierra cada día con una visión del futuro. Ahora entras al texto que inicia formalmente la tradición cabalística: el **סֵפֶר יְצִירָה** (*Sefer Yetzirah* — "Libro de la Formación/Creación"). Es el texto cabalístico más antiguo conocido y, según la mayoría de los académicos, fue redactado entre el siglo II y el VI de la era común ⚠️. La tradición lo atribuye a Abraham ⚠️. Es breve — seis capítulos, menos de 2.000 palabras en su versión corta. Y sin embargo, ha generado más comentarios que casi cualquier otro texto en la historia del judaísmo.`,
      },
      {
        t: "p",
        text: `**El primer versículo.** El Sefer Yetzirah abre así:`,
      },
      {
        t: "verse",
        he: "בִּשְׁלֹשִׁים וּשְׁתַּיִם נְתִיבוֹת פְּלִיאוֹת חָכְמָה חָקַק יָהּ",
        es: "Con treinta y dos senderos maravillosos de sabiduría grabó Yah.",
        ref: "Sefer Yetzirah 1:1 ✅",
        sefaria: "Sefer Yetzirah 1:1",
      },
      {
        t: "p",
        text: `**Los 32 senderos: 10 + 22.** ¿Qué son estos 32 senderos? El Sefer Yetzirah los define en el mismo capítulo 1 ✅: **diez sefirot** (*sefirot belimá* — los diez números primordiales de la Creación) y **veintidós letras del alefato** (las letras del hebreo como canales de la Creación). En TALMID (T1·M2) estudiaste las 22 letras. Ahora ves que son la mitad del sistema. Las letras son los canales; las sefirot son las vasijas. Juntos, los 32 senderos son el tejido de toda la realidad creada.`,
      },
      {
        t: "p",
        text: `**El número del corazón.** La gematría de *lev* (לֵב, corazón): lamed(30)+bet(2) = **32** 🔢. El Sefer Yetzirah abre con el número del corazón. La Sabiduría que creó el mundo no es una fuerza abstracta y fría — tiene corazón. Esta es la primera resonancia del Sefer Yetzirah con el vocabulario del Mussar que estudiaste en J1.`,
      },
      {
        t: "p",
        text: `**El verbo *jaqaq* — grabar, tallar.** El Sefer Yetzirah dice que Dios *"grabó"* (*jaqaq*, חָקַק ✅) los 32 senderos. No "habló", no "creó" en el sentido de Génesis 1 — sino "grabó" como un lapidario graba en piedra. Las letras del hebreo, en la visión del Sefer Yetzirah, están *talladas* en la realidad — son anteriores al sonido y a la materia. Esta imagen conecta con lo que Ibn Ezra y el Ramban dijeron sobre el texto bíblico: el texto no es posterior a la realidad; es lo que la constituye.`,
      },
      {
        t: "verse",
        he: "יְהוָה בְּחָכְמָה יָסַד-אָרֶץ",
        es: "YHVH con sabiduría fundó la tierra.",
        ref: "Proverbios 3:19 ✅",
        sefaria: "Proverbs 3:19",
      },
    ],
    contemplacion: [
      "El Sefer Yetzirah tiene menos de 2.000 palabras. La Biblia tiene más de 300.000. Los sabios que lo escribieron o lo recibieron eligieron la brevedad máxima — como si cada palabra del texto fuera una de esas letras del alefato: pequeña en tamaño, infinita en contenido.",
      "¿Qué te llama más la atención del primer versículo — los 32 senderos, el verbo 'grabar', o el nombre 'Yah'? No hay respuesta incorrecta. El Sefer Yetzirah está diseñado para ser leído despacio.",
    ],
    accion: {
      text: [
        `Busca en Sefaria "Sefer Yetzirah 1:1". Lee el primer versículo en hebreo y en traducción. Escribe: ¿qué son los "32 senderos de sabiduría"? ¿Qué son las 10 sefirot y las 22 letras según el texto? Calcula la gematría de lev (לֵב = lamed+bet). ¿Coincide con 32?`,
      ],
      cta: { label: "Abrir Sefer Yetzirah cap. 1 en Sefaria →", ref: "Sefer Yetzirah 1:1" },
    },
    sello:
      "Sefer Yetzirah (סֵפֶר יְצִירָה) — texto cabalístico más antiguo conocido; s. II–VI EC ⚠️; atribuido a Abraham ⚠️. SY 1:1 ✅: 32 senderos de sabiduría = 10 sefirot + 22 letras. Gematría *lev* (לֵב) = 32 🔢. El verbo *jaqaq* (grabar/tallar) ✅: Dios grabar la realidad con los senderos de la sabiduría. Base: Proverbios 3:19 ✅.",
    hilos: [
      { kind: "study", ref: "las-diez-sefirot", label: "En la próxima lección se introduce el mapa de las diez sefirot — las vasijas de la Creación." },
      { kind: "letter", ref: "alef", label: "La álef — silencio y corona — ya la conoces desde T1. ¿Cómo resuena con Keter, la primera sefirot?" },
    ],
    fuentes: [
      "Sefer Yetzirah 1:1 ✅ (los 32 senderos; el verbo jaqaq — grabar)",
      "Sefer Yetzirah 1:2 ✅ (las diez sefirot belimá y las 22 letras)",
      "Proverbios 3:19 ✅ (YHVH con sabiduría fundó la tierra)",
      "Gematría lev = 32 🔢",
      "Autoría y fecha del SY: ⚠️ (entre s. II y VI EC según académicos; tradición: Abraham)",
    ],
    tarea: {
      semana: 50,
      herramienta: "Primera lectura del Sefer Yetzirah: identificar los 32 senderos y verificar la gematría de lev",
      enunciado:
        "Lee Sefer Yetzirah 1:1 en Sefaria. Escribe: ¿qué son los 32 senderos de sabiduría? ¿Qué son las 10 sefirot y las 22 letras según el texto? Calcula la gematría de lev (לֵב = lamed+bet). ¿Coincide con 32? ¿Qué te sugiere que el número de los senderos sea el número del corazón?",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L51 ───────────────────────────────────────────────────────────────────
  {
    n: 51,
    id: "E3·J4·L51",
    slug: "las-diez-sefirot",
    title: "Las diez sefirot — el mapa del alma y del cosmos",
    apertura: {
      question:
        "Diez números que no son números. Diez vasijas que contienen todo lo que existe. ¿Qué es una sefirot?",
    },
    estudio: [
      {
        t: "p",
        text: `**Qué es una sefirot.** La palabra **סְפִירָה** (*sefirot*, plural de *sefirot* o *sfira*) es una de las palabras más importantes de toda la Cabalá — y una de las más difíciles de traducir. El Sefer Yetzirah las llama *sefirot belimá* (✅, SY 1:2): sefirot "sin nada", o "sin definición", o "restringidas". La raíz puede estar relacionada con *saphar* (סָפַר — contar, narrar ✅), con *sapper* (safir, zafiro 🔢⚠️) o con *sefar* (borde/frontera ⚠️). Los comentaristas medievales del SY debaten qué raíz es la primaria. Lo que el texto dice directamente: son **diez**, exactamente diez, ni nueve ni once (SY 1:4 ✅), y son los principios estructurales de todo lo que existe.`,
      },
      {
        t: "verse",
        he: "עֶשֶׂר סְפִירוֹת בְּלִימָה עֶשֶׂר וְלֹא תֵשַׁע עֶשֶׂר וְלֹא אַחַד עָשָׂר הָבֵן בְּחָכְמָה וַחְכַם בְּבִינָה",
        es: "Diez sefirot *belimá* — diez y no nueve, diez y no once. Entiende con sabiduría y sé sabio con entendimiento.",
        ref: "Sefer Yetzirah 1:2–4 ✅",
        sefaria: "Sefer Yetzirah 1:4",
      },
      {
        t: "p",
        text: `**Los nombres de las diez sefirot.** El Sefer Yetzirah no da nombres propios a las sefirot en el sentido del árbol luriánico posterior — da características. Pero la tradición posterior (que el currículo desarrollará en MAGUID y JAJAM) les asignó nombres que ya son parte del vocabulario básico que el estudiante de JAVER necesita conocer como mapa orientador:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**1. כֶּתֶר** (*Keter* — corona) = 620 🔢. La primera sefirot: la voluntad divina, lo que está sobre la comprensión humana. En el árbol: la cima, antes que todo pensamiento. La álef del alefato — silencio antes del sonido — resuena con Keter.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**2. חָכְמָה** (*Jojmá* — sabiduría) = 73 🔢. La chispa del origen, el punto de inicio donde algo surge de la nada. En la tradición del Sefer Yetzirah, Jojmá corresponde a la yod (י) — el punto más pequeño del alefato. El Nombre YHVH empieza con la yod: Jojmá es el principio del Nombre.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**3. בִּינָה** (*Biná* — entendimiento) = 67 🔢. El desarrollo de la chispa en una estructura comprensible. Si Jojmá es el punto, Biná es el círculo que lo rodea — el útero que desarrolla la semilla. En la tradición: la he (ה) del Nombre YHVH.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**4–9. Las siete sefirot del corazón:** Jesed (חֶסֶד, amor), Guevurá (גְּבוּרָה, poder/juicio), Tiferet (תִּפְאֶרֶת, belleza/equilibrio), Netzaj (נֶצַח, eternidad), Hod (הוֹד, gloria), Yesod (יְסוֹד, fundamento) y Maljut (מַלְכוּת, reino). Estas siete corresponden a los siete días de la Creación ⚠️ (tradición cabalística — no en el texto del SY explícitamente).`,
      },
      {
        t: "p",
        tone: "item",
        text: `**10. מַלְכוּת** (*Maljut* — reino) = **496** 🔢. La última sefirot: la manifestación completa del flujo divino en el mundo visible. 496 es también un número perfecto en matemáticas (igual a la suma de sus divisores: 1+2+4+8+16+31+62+124+248 = 496 🔢). El "abrazo cósmico" que Jashmal estudia tiene su raíz aquí. 🧵`,
      },
      {
        t: "p",
        text: `**El árbol que el estudiante aún no ve.** La disposición de las diez sefirot en el árbol de la vida — tres columnas (misericordia a la derecha, juicio a la izquierda, equilibrio al centro) y cuatro mundos — pertenece a la Cabalá luriánica del siglo XVI ⚠️ (el Arizal, Isaac Luria) y se desarrollará en MAGUID y JAJAM. Aquí el estudiante ve las diez sefirot como una lista y sus gematrías — nada más. El árbol completo requiere el estudio del Zohar y del Etz Jaim del Arizal.`,
      },
    ],
    contemplacion: [
      "El Sefer Yetzirah dice: 'entiende con sabiduría y sé sabio con entendimiento' ✅ (SY 1:4). Los dos verbos se cruzan: para entender (Biná) hay que usar la sabiduría (Jojmá); para ser sabio hay que usar el entendimiento. Las sefirot no son categorías separadas — se implican mutuamente.",
      "Keter = 620. Maljut = 496. La distancia entre la corona y el reino — entre lo que está sobre la comprensión y lo que está en el mundo visible — se mide en gematría pero se vive en el interior del alma. El Mussar de J1 y las sefirot de J4 son el mismo territorio.",
    ],
    accion: {
      text: [
        `Lee Sefer Yetzirah 1:2–4 en Sefaria. Escribe los nombres de las 10 sefirot tal como los conoces (puedes usar la lista de esta lección). ¿Qué significa belimá? Busca si hay algún comentarista en Sefaria que explique esa palabra. Verifica la gematría de Jojmá (חָכְמָה = jet+kaf+mem+he).`,
      ],
      cta: { label: "Abrir Sefer Yetzirah 1:2 en Sefaria →", ref: "Sefer Yetzirah 1:2" },
    },
    sello:
      "Las diez sefirot *belimá* (SY 1:2–4 ✅): Keter(620), Jojmá(73), Biná(67), Jesed, Guevurá, Tiferet, Netzaj, Hod, Yesod, Maljut(496) — todas gematrías verificadas 🔢. Regla del SY: diez, no nueve; diez, no once (SY 1:4 ✅). El árbol luriánico completo pertenece a MAGUID/JAJAM ⚠️.",
    hilos: [
      { kind: "study", ref: "sefer-yetzirah", label: "Los 32 senderos de L50: las sefirot son los primeros 10; las letras, los otros 22." },
      { kind: "study", ref: "arbol-de-la-vida", label: "En L52 el mapa se cierra — el árbol de la vida como síntesis del Año 1." },
    ],
    fuentes: [
      "Sefer Yetzirah 1:2–7 ✅ (las diez sefirot belimá)",
      "Sefer Yetzirah 1:4 ✅ (diez, no nueve; diez, no once; entiende con sabiduría)",
      "Gematrías: Keter=620, Jojmá=73, Biná=67, Maljut=496 🔢",
      "Árbol luriánico (tres columnas, cuatro mundos): ⚠️ — tradición del Arizal, desarrollada en MAGUID/JAJAM",
    ],
    tarea: {
      semana: 51,
      herramienta: "Las diez sefirot: nombres, gematrías y la regla de exactamente diez",
      enunciado:
        "Lee Sefer Yetzirah 1:2–4 en Sefaria. Escribe el nombre de las 10 sefirot en orden. ¿Qué significa belimá? Busca en Sefaria si hay algún comentarista que explique esa palabra. Verifica la gematría de Jojmá (חָכְמָה) letra por letra y escribe el cálculo.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L52 ───────────────────────────────────────────────────────────────────
  {
    n: 52,
    id: "E3·J4·L52",
    slug: "arbol-de-la-vida",
    title: "El árbol de la vida — el mapa que cierra el año",
    apertura: {
      question:
        "Llegaste al árbol. No lo conoces todavía — pero puedes ver su forma. ¿Qué ves?",
    },
    estudio: [
      {
        t: "p",
        text: `**La semana 52.** Llegas aquí desde el primer día de TALMID — desde "¿qué es el alfabeto hebreo?" y "¿qué es el Sinaí?" — hasta el umbral de la Cabalá. Un año. Cincuenta y dos semanas. La lección de hoy no es la más densa del currículo: es la más panorámica. Su función es mostrarte el horizonte hacia el que apunta todo lo que estudiarás en MAGUID y JAJAM.`,
      },
      {
        t: "verse",
        he: "עֵץ-חַיִּים הִיא לַמַּחֲזִיקִים בָּהּ",
        es: "Es árbol de vida para quienes la abrazan.",
        ref: "Proverbios 3:18 ✅ — sobre la Sabiduría/Torá",
        sefaria: "Proverbs 3:18",
      },
      {
        t: "p",
        text: `**El árbol de la vida en la Biblia.** El *Etz Jaim* (עֵץ חַיִּים) aparece dos veces en la Biblia de manera central: en Génesis 2:9 ✅ ("el árbol de la vida en medio del jardín") y en Proverbios 3:18 ✅ ("es árbol de vida para quienes la abrazan [a la Torá]"). La Cabalá tomó esta imagen — el árbol que da vida, que está en el centro, que es al mismo tiempo la Torá y el cosmos — y la desarrolló en el mapa de las diez sefirot. El árbol de la vida cabalístico no es una metáfora del árbol bíblico: es su expansión.`,
      },
      {
        t: "p",
        text: `**La estructura básica del árbol.** Sin entrar en el sistema luriánico completo (que corresponde a MAGUID y JAJAM), el árbol tiene una arquitectura básica que el estudiante de JAVER puede ver como mapa:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Tres columnas:** la columna derecha (misericordia — Jesed, Jojmá, Netzaj), la columna izquierda (juicio — Guevurá, Biná, Hod), y la columna central (equilibrio — Keter, Tiferet, Yesod, Maljut). Esta disposición en tres columnas corresponde a la tensión YHVH/Elohim que estudiaste en J3.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**El flujo de arriba a abajo:** el flujo divino desciende desde Keter (la voluntad, lo más alto) hasta Maljut (el reino, el mundo visible), pasando por todas las sefirot intermedias. El trabajo espiritual sube de abajo a arriba: del mundo visible (Maljut) hacia la fuente (Keter). El Mussar (J1) comenzó en Maljut — en el mundo concreto de las acciones. El Sefer Yetzirah empieza a mostrar el mapa de todo el recorrido.`,
      },
      {
        t: "p",
        text: `**Las sefirot que ya conoces.** Antes de ver el árbol completo, hay sefirot que el currículo ya te preparó para reconocer: Keter (el silencio de la álef, que estudiaste en T1·M2), Jojmá (la yod — el punto de origen de todo el Nombre YHVH), Biná (la he del Nombre), Tiferet (el centro del árbol, corresponde al Nombre YHVH en la tradición ⚠️ — tradición cabalística, no en el SY explícitamente), Maljut (el "abrazo cósmico" de 496 🔢, 🧵 hilo al misterio en jashmal.org). El árbol ya estaba en el currículo; ahora tiene nombre.`,
      },
      {
        t: "p",
        text: `**Gematría Etz Jaim.** *Etz* (עֵץ): ayin(70)+tzadi(90) = **160** 🔢. *Jaim* (חַיִּים): jet(8)+yod(10)+yod(10)+mem(40) = **68** 🔢. Total *Etz Jaim*: 160+68 = **228** 🔢. El número 228 = 4 × 57. No hay una interpretación cabalística fija para este valor en el Sefer Yetzirah — lo que sí es verificable es el cálculo 🔢.`,
      },
    ],
    contemplacion: [
      "El árbol de la vida está en el centro del jardín (Génesis 2:9 ✅). No en la orilla, no en un rincón. En el centro. El Sefer Yetzirah enseña que la estructura que sostiene el cosmos es el centro de todo — no la periferia. El estudiante que llegó hasta aquí, a la semana 52, ha estado caminando hacia ese centro desde el primer día.",
      "No conoces el árbol todavía. Eso está bien. El conocimiento del árbol se llama MAGUID (el que narra) y JAJAM (el sabio). Lo que tienes ahora, después de 52 semanas, es la preparación: el texto, la pregunta, el trabajo del alma y el umbral del Sod. El árbol te espera.",
    ],
    accion: {
      text: [
        `Lee Proverbios 3:18–19 en Sefaria. Escribe: ¿qué dice el texto sobre el árbol de la vida? ¿A qué se refiere según el contexto? Luego escribe una reflexión libre (200–400 palabras): ¿qué cambió en cómo lees un texto desde que empezaste en El Umbral? ¿Qué herramienta aprendiste que más usas? ¿Qué pregunta te quedó sin responder?`,
      ],
      cta: { label: "Abrir Proverbios 3:18 en Sefaria →", ref: "Proverbs 3:18" },
    },
    sello:
      "El árbol de la vida (*Etz Jaim*, עֵץ חַיִּים = 228 🔢): Génesis 2:9 ✅ (en el jardín), Proverbios 3:18 ✅ (la Torá como árbol de vida). La estructura del árbol: 3 columnas (misericordia/juicio/equilibrio), flujo de Keter a Maljut. Las sefirot del currículo: Keter (álef/silencio), Jojmá (yod), Biná (he), Maljut (496 🔢, el abrazo cósmico). El árbol luriánico completo: MAGUID y JAJAM.",
    hilos: [
      { kind: "study", ref: "las-diez-sefirot", label: "Las sefirot de L51 encuentran aquí su mapa espacial — el árbol de las tres columnas." },
      { kind: "study", ref: "la-shema", label: "La Shemá es la declaración de unidad que está en la raíz del árbol: YHVH Ejad." },
    ],
    fuentes: [
      "Génesis 2:9 ✅ (el árbol de la vida en el jardín)",
      "Proverbios 3:18 ✅ (Etz jaim hi — la Torá como árbol de vida)",
      "Proverbios 3:19 ✅ (YHVH con sabiduría fundó la tierra)",
      "Sefer Yetzirah cap. 1–2 ✅ (las sefirot y las letras como base del árbol)",
      "Gematría Etz Jaim = 228 🔢",
      "Árbol luriánico (tres columnas, cuatro mundos): ⚠️ — tradición del Arizal (Isaac Luria, s. XVI)",
    ],
    tarea: {
      semana: 52,
      herramienta: "Síntesis del Año 1: reflexión sobre el camino recorrido y el horizonte que se abre",
      enunciado:
        "Lee Proverbios 3:18–19. Escribe una reflexión libre (200–400 palabras): ¿qué cambió en cómo lees un texto desde que empezaste en El Umbral? ¿Qué herramienta aprendiste que más usas? ¿Qué pregunta te quedó sin responder y esperas que MAGUID responda?",
      palabrasMin: 200,
      palabrasMax: 400,
    },
    closeModule:
      "Completaste el Año 1 de la Academia de Jashmal. Cincuenta y dos semanas. Empezaste sin saber hebreo — ahora puedes leer el alefato, conoces las letras como canales de consciencia, leíste la Torá con Rashi y con dos comentaristas medievales, estudiaste el Talmud y la Mishná, conociste a los profetas, trabajaste el alma con la Mesilat Yesharim, y llegaste al umbral del Sefer Yetzirah. El árbol de la vida está frente a ti. No lo conoces todavía — pero puedes ver su forma. MAGUID (שָׁנָה ב׳ — Año 2) te lleva al Zohar, al Jasidut, al Baal Shem Tov y a la Cabalá luriánica completa. El que entra a MAGUID no entra vacío: entra con el texto, con la pregunta, con el trabajo del alma y con el umbral del Sod. Un año de preparación. Ahora empieza el estudio. כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר — la luz sigue creciendo, sin cesar.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO11 = {
  id: "J4",
  he: "סֵפֶר הַיְצִירָה",
  titulo: "Diez dichos, diez sefirot",
  etapaHe: "חָבֵר",
  etapa: "Javer",
  etapaGloss: "el compañero de estudio",
  etapaNum: 3,
  etapasTotal: 6,
  total: LESSONS11.length,
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson11(slug: string): Lesson | undefined {
  return LESSONS11.find((l) => l.slug === slug);
}

export function lessonIndex11(slug: string): number {
  return LESSONS11.findIndex((l) => l.slug === slug);
}

export function nextLesson11(slug: string): Lesson | null {
  const i = lessonIndex11(slug);
  return i >= 0 && i < LESSONS11.length - 1 ? LESSONS11[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 11 ──────────────────────────────
// Slugs internos del Módulo 11.
const INTERNAL_SLUGS11: Record<string, string> = {
  "sefer-yetzirah": "sefer-yetzirah",
  "las-diez-sefirot": "las-diez-sefirot",
  "arbol-de-la-vida": "arbol-de-la-vida",
};

// Slugs de módulos anteriores que deben resolver a sus rutas propias.
const CROSS_MODULE_HREFS11: Record<string, string> = {
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
  "la-shema": "/academia/modulo-10/la-shema",
  "yhvh-elohim": "/academia/modulo-10/yhvh-elohim",
  "nombres-divinos": "/academia/modulo-10/nombres-divinos",
  "el-alenu": "/academia/modulo-10/el-alenu",
};

const MISTERIO_SLUGS11 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread11(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS11[key]) return { kind: "lesson", slug: INTERNAL_SLUGS11[key] };
  if (MISTERIO_SLUGS11.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href completo para M11 — incluye cross-module overrides.
export function resolveThreadHref11(h: Hilo): string | null {
  if (h.kind === "letter") return `/letras/${h.ref}`;
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS11[key]) return `/academia/modulo-11/${key}`;
  if (CROSS_MODULE_HREFS11[key]) return CROSS_MODULE_HREFS11[key];
  if (MISTERIO_SLUGS11.has(key)) return `/misterio/${key}`;
  return null;
}
