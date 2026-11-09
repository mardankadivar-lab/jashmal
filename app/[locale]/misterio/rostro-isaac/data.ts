
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — קְלַסְתֵּר פָּנִים · el rostro que la burla no pudo borrar
//  Serie «Parashá» · Toldot — Génesis 25:19 (primer versículo de la parashá).
//  Shabat 14 nov 2026 = 4 Kislev 5787. Rango de lectura: Gn 25:19–28:9.
//
//  Hero en modo "dimensiones": SIN gematría (el estudio no trae ninguna).
//
//  CONTENIDO ESCRITO Y VERIFICADO POR EL SOFER (editor-erudito), 2026-11-08.
//  Expediente completo (sección de trabajo, NO publicable):
//    ~/jashmal-produccion/estudios/ROSTRO-ISAAC-TOLDOT.md
//  Infraestructura solo montó la página: no se añadió ni se alteró doctrina.
//
//  TESIS: la redundancia de Gn 25:19 («Isaac hijo de Abraham · Abraham
//  engendró a Isaac») se explica por el midrash del rostro. El jidush de
//  Mardan: la oposición funciona como cincel — no CREA la identidad, la
//  REVELA y la DEFINE.
//
//  TRES VERSIONES, NO UNA (va en el `mapa`, como tabla):
//    · Bavá Metziá 87a — נֶהְפַּךְ, el rostro SE TRANSFORMA, después de la burla.
//    · Midrash Tanjumá, Toldot 1 — el ángel lo forma EN EL ÚTERO, antes.
//    · Rashi a Gn 25:19 — צָר (raíz יצר, esculpir); neutro en cuanto al tiempo.
//    · Targum Yonatán — no hay evento: el parecido ES un estado.
//
//  FUENTES GRADO A (hebreo/arameo cotejado en Sefaria por el Sofer):
//    Gn 25:19 · Gn 17:17 · 18:12 · 21:6 · 21:9 · Bavá Metziá 87a · Nidá 31a ·
//    Rashi (25:19, 21:6, 21:9) · Targum Yonatán 25:19 · Tanjumá Toldot 1 ·
//    Ramban · Ibn Ezra · Abarbanel · Malbim · Zohar (Terumá 96:919, Lej Lejá
//    35:459, Vayetzé 32:312 Sitrei Torá, Vayetzé 32 Tosefta, Shemot 21:208) ·
//    Ketem Paz 95b:12 · Bereshit Rabá 53:11 y 63:1-2 · Kohélet 2:13 y 8:1 ·
//    Isaías 29:22 · Beit Yaakov Jayei Sará 39:1 · Sod Yesharim RH 92:1 · Jastrow.
//
//  GRADO B, ROTULADO EN LA PÁGINA:
//    · El jidush de Mardan (la oposición como cincel). Síntesis nueva.
//    · Nidá 31a como clave que legitima el cambio de rostro sin violar la
//      paternidad de Abraham (derivación del Sofer).
//    · La convergencia de las tres versiones (causa inmediata / anticipada /
//      final) y la respuesta a Abarbanel por la vía de «toldot».
//    · Sefer Baal Shem Tov, Yitró 26:10 — antología tardía.
//
//  FUERA POR NO VERIFICADO (declarado en el aviso del Sofer):
//    · Baal HaSulam: Shamati / Matán Torá / Talmud Eser Sefirot NO están en
//      Sefaria. Su principio se expone en palabras del Sofer, sin cita textual.
//    · «Klipá kodemet laperí» como cita ZOHÁRICA: no localizada. Se cita solo
//      por las fuentes jasídicas (Izhbitz, Sod Yesharim).
//    · Berajot 7a (klaster panim) — Jastrow lo cita; no hallado en Sefaria.
//  FUERA POR FALSO: el midrash del rostro NO está en Bereshit Rabá (se leyó
//    63:1 y 63:2: no contienen קלסתר ni איקונין). No atribuirlo ahí.
//  FUERA POR FORZADO: Or Makif / Or Pnimí. El `makif` de Malbim es materia que
//    oculta; el Or Makif luriano es luz que no cabe dentro. Comparten la
//    palabra y nada más. Se usa en su lugar el eje Jésed→Guevurá (grado A).
//
//  RIESGO DE PUBLICACIÓN DECLARADO POR EL SOFER (para community-manager):
//    1. Ismael. Malbim e Izhbitz leen a Ismael/Esav como escoria y cáscara.
//       Aquí se cita SOLO la estructura (crisol, klipá, makif), nunca la
//       aplicación a un pueblo. Si un video necesita antagonista, es LA BURLA.
//    2. Teodicea. El límite «revela, no crea» es parte del estudio y NO se
//       puede recortar para redes.
//
//  GEMATRÍAS: ninguna. El estudio no trae.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "rostro-isaac",

  hero: {
    serielabel:
      "Serie «Parashá» · Toldot — Génesis 25:19 · el primer versículo de la parashá",
    serielabelFa:
      "سری «پاراشا» · تولدوت — پیدایش ۲۵:۱۹ · نخستین آیهٔ پاراشا",
    he: "קְלַסְתֵּר פָּנִים",
    titulo: "El rostro que la burla no pudo borrar",
    tituloFa: "چهره‌ای که ریشخند نتوانست پاکش کند",
    ganchoEs:
      "El primer versículo de Toldot dice lo mismo dos veces: «Isaac, hijo de Abraham. Abraham engendró a Isaac». Y la Torá no gasta palabras. La tradición explica ese tartamudeo con un rostro — el rostro de un niño del que se rieron antes de que naciera. Lo que casi nadie cuenta es que hay tres versiones del milagro, y que no dicen lo mismo.",
    ganchoFa:
      "نخستین آیهٔ تولدوت یک چیز را دو بار می‌گوید: «اسحاق، پسر ابراهیم. ابراهیم اسحاق را زاد». و تورات واژه هدر نمی‌دهد. سنّت این لکنت را با یک چهره توضیح می‌دهد — چهرهٔ کودکی که پیش از زادنش به او خندیدند. آنچه کمتر گفته می‌شود این است که از آن معجزه سه روایت هست، و هر سه یک چیز نمی‌گویند.",
    dimensiones: [
      { es: "Tres versiones, no una", fa: "سه روایت، نه یکی" },
      { es: "El rostro lo da el Creador, no los padres", fa: "چهره را آفریدگار می‌دهد، نه پدر و مادر" },
      { es: "La oposición revela; no crea", fa: "مخالفت آشکار می‌کند؛ نمی‌آفریند" },
    ],
    fecha: "Shabat · 4 Kislev 5787 · 14 nov 2026 — parashat Toldot (Gn 25:19–28:9)",
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── Advertencia de integridad (no es sección de estudio) ─────────────────────
  aviso: {
    titulo: "Nota del Sofer — cuatro cosas antes de empezar",
    rotulo:
      "Se dicen de entrada, para que nadie confunda una lectura nuestra con una fuente, y para que nadie salga de aquí con una idea cruel en la mano.",
    parrafos: [
      `Primero, y es lo más importante: este estudio NO dice que las burlas fueron buenas. No dice que la oposición sea una bendición disfrazada, ni que el sufrimiento tenga un propósito que lo justifique. La tesis es más estrecha y más austera: la oposición no CREA la identidad — la REVELA y la DEFINE. El cincel no inventa la figura; quita lo que la escondía. Esa distinción no es un adorno retórico: es la diferencia entre una enseñanza verdadera y una crueldad bien escrita, y se repite tres veces a lo largo de la página a propósito.`,
      `Segundo: no hay una sola versión del milagro del rostro, hay tres, y no dicen lo mismo. La frase que circula —«Dios transformó la cara de Isaac para cerrar la boca de los burlones»— es fiel al Talmud y solo al Talmud. El Midrash Tanjumá y el Targum Yonatán dicen lo contrario: el parecido estaba desde el útero y no cambió nada. Rashi queda en medio, con un verbo deliberadamente neutro. Aquí no se esconde la tensión: se pone en tabla, antes de entrar en materia.`,
      `Tercero, una corrección de dato que circula incluso en sitios serios: el midrash del rostro NO está en Bereshit Rabá. El Sofer leyó los dos pasajes de Bereshit Rabá sobre Génesis 25:19 (63:1 y 63:2) y ninguno contiene קְלַסְתֵּר ni אִיקוֹנִין. El midrash del rostro vive en Bavá Metziá 87a, en el Midrash Tanjumá (Toldot 1), en Rashi y en el Targum Yonatán. Lo que sí aporta Bereshit Rabá 63:2, y es valioso, es otra cosa: cita Isaías 29:22 en el umbral mismo de la parashá.`,
      `Cuarto, sobre Baal HaSulam. Los escritos donde formula con más limpieza el principio que esta página necesita —Shamati, Matán Torá, Talmud Eser Sefirot— NO están disponibles en Sefaria, y el Sofer no pudo cotejar una cita textual contra fuente primaria. Por eso el principio se expone aquí en palabras nuestras y se dice que son nuestras. El material zohárico de esa misma sección, en cambio, está verificado y es de primera mano.`,
    ],
  },

  // ── Mapa del argumento (no es sección de estudio) ────────────────────────────
  mapa: {
    titulo: "Mapa del argumento — cuatro fuentes, cuatro rostros distintos",
    intro: [
      `Antes de recorrer el estudio conviene ver el nudo filológico desnudo, porque es su mayor virtud y también su mayor trampa. Cuatro fuentes clásicas explican la redundancia de Génesis 25:19 con el parecido entre Isaac y Abraham. Las cuatro son grado A. Y las cuatro cuentan una escena diferente: cambia CUÁNDO ocurre, cambia el verbo, cambia quién se burla y cambia cuál es la burla.`,
    ],
    filas: [
      {
        ref: "Bavá Metziá 87a",
        he: "נֶהְפַּךְ",
        es: "«se volcó, se transformó»",
        funcion:
          "En el banquete del destete y DESPUÉS de la burla. Primero el milagro de la leche; no bastó. Siguió la murmuración de «todas las naciones del mundo» —«un viejo y una vieja que trajeron un niño abandonado del mercado»— y solo entonces el rostro se transformó. El único pasaje donde el rostro verdaderamente cambia. Cierra citando nuestro versículo: «Abraham engendró a Isaac».",
      },
      {
        ref: "Midrash Tanjumá, Toldot 1",
        he: "עֲשֵׂה כָּל אִיקוֹנִין שֶׁלּוֹ",
        es: "«haz todo su retrato» — dicho al ángel",
        funcion:
          "En el útero y ANTES de la burla. El Creador se dirige al ángel encargado de la formación (יְצִירַת) del feto. No es reacción: es anticipación. Y el midrash no protege al patriarca — dice que «había sospecha en el corazón de Abraham» sobre estas cosas.",
      },
      {
        ref: "Rashi a Génesis 25:19",
        he: "צָר",
        es: "«formó, esculpió» (raíz יצר)",
        funcion:
          "Sin especificar cuándo: el verbo es deliberadamente neutro en cuanto al tiempo. Rashi es también quien convierte la murmuración colectiva en una figura: לֵיצָנֵי הַדּוֹר, «los burlones de la generación» — expresión suya, no del Talmud. Y su burla es otra: «de Abimélej quedó embarazada Sará».",
      },
      {
        ref: "Targum Yonatán a Génesis 25:19",
        he: "הֲוָה דָּמֵי",
        es: "«era semejante»",
        funcion:
          "Ningún momento, porque no hay acontecimiento: es un ESTADO. El rostro de Isaac era el retrato de su padre, y ese hecho bastó para cerrar las bocas. El Targum describe una condición, no un milagro.",
      },
    ],
    cierre: [
      `Esta tensión no la inventamos nosotros, y los comentaristas de los siglos posteriores la discutieron en voz alta: ya en la tradición clásica se sabía que el Talmud y el Midrash no estaban contando la misma historia. Guarde la tabla: al final del estudio se verá que las cuatro versiones apuntan al mismo sitio por caminos distintos.`,
    ],
  },

  // ── 1. תַּרְגּוּם ───────────────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "El versículo que abre Toldot — Génesis 25:19",
        he: "וְאֵלֶּה תּוֹלְדֹת יִצְחָק בֶּן־אַבְרָהָם אַבְרָהָם הוֹלִיד אֶת־יִצְחָק",
        es: "Y estas son las generaciones de Isaac, hijo de Abraham. Abraham engendró a Isaac.",
        source: "Génesis 25:19",
      },
      {
        label: "La risa del padre — Génesis 17:17",
        he: "וַיִּפֹּל אַבְרָהָם עַל־פָּנָיו וַיִּצְחָק וַיֹּאמֶר בְּלִבּוֹ הַלְּבֶן מֵאָה־שָׁנָה יִוָּלֵד וְאִם־שָׂרָה הֲבַת־תִּשְׁעִים שָׁנָה תֵּלֵד",
        es: "Y cayó Abraham sobre su rostro y se rió, y dijo en su corazón: ¿al de cien años le nacerá? ¿Y Sará, la de noventa años, dará a luz?",
        source: "Génesis 17:17",
      },
      {
        label: "La risa de la madre, y la ambigüedad — Génesis 21:6",
        he: "וַתֹּאמֶר שָׂרָה צְחֹק עָשָׂה לִי אֱלֹהִים כָּל־הַשֹּׁמֵעַ יִצְחַק־לִי",
        es: "Y dijo Sará: risa me ha hecho Dios; todo el que lo oiga se reirá conmigo.",
        source: "Génesis 21:6",
      },
      {
        label: "La risa que ya es burla — Génesis 21:9",
        he: "וַתֵּרֶא שָׂרָה אֶת־בֶּן־הָגָר הַמִּצְרִית אֲשֶׁר־יָלְדָה לְאַבְרָהָם מְצַחֵק",
        es: "Y vio Sará al hijo de Hagar la egipcia, que ella había dado a luz a Abraham, burlándose.",
        source: "Génesis 21:9",
      },
    ],
    parrafos: [
      `Lea el versículo dos veces. Dice lo mismo dos veces. Si Isaac es «hijo de Abraham», entonces Abraham engendró a Isaac: no hace falta decirlo. La Torá lo dice de todos modos, en la misma respiración, en el mismo versículo, en el primer versículo de toda la parashá. Y la Torá no gasta palabras. Esa repetición es la puerta de entrada a este estudio, y toda la tradición interpretativa se detiene ahí. Abarbanel la nombra con una expresión seca: כֶּפֶל מְבוּאָר (kéfel mevuar), «una redundancia manifiesta».`,
      `Para entender por qué ese versículo tartamudea hay que volver sesenta años atrás, al nacimiento del niño. Y ahí la Torá hace algo extraordinario: enrolla toda la historia alrededor de una sola raíz hebrea, צ־ח־ק (tz-j-k), «reír». Se ríe Abraham (17:17). Se ríe Sará «en su interior» (18:12). Y cuando nace el niño, Sará le pone nombre a la risa: צְחֹק עָשָׂה לִי אֱלֹהִים.`,
      `Ahí está la grieta. Esa frase, כָּל־הַשֹּׁמֵעַ יִצְחַק־לִי, es gramaticalmente ambigua: la preposición לִי puede querer decir «conmigo» o «de mí». Rashi la resuelve hacia el lado luminoso — יִשְׂמַח עָלַי, «se alegrará por mí» (Rashi a Génesis 21:6) — y así se presenta aquí, honestamente. Pero el hebreo deja abierta la otra puerta, y la Torá sabía lo que hacía al dejarla abierta: Sará nombra, en el día de su alegría, la posibilidad de que el mundo se ría DE ella. Tres versículos después la risa ya ha cambiado de filo — מְצַחֵק, el hijo de Hagar «burlándose» (21:9) — y es la misma raíz.`,
      `Y en medio de todo eso, el niño recibe su nombre: יִצְחָק, Itzjak, «él reirá». El único patriarca cuyo nombre es un verbo de risa. El niño se llama por la carcajada que lo rodeó antes de que naciera. Esa es la letra {{letter:tzadi|Tzadi}} abriendo su nombre.`,
      `Glosario de los términos que gobiernan el estudio, porque sin ellos no se ve nada. פָּנִים (panim) es «rostro», pero en hebreo es plural y comparte raíz con פְּנִים (penim), «interior»: el rostro es el interior vuelto visible. קְלַסְתֵּר פָּנִים (klaster panim) es el molde, la fisonomía, el conjunto de rasgos; Jastrow lo deriva del griego krystallos, «cristal», de donde le viene el sentido de brillo y claridad del semblante. אִיקוֹנִין (ikonin) es un préstamo del griego eikonion, diminutivo de eikón: «imagen, retrato, icono» — el rostro como retrato. לֵיצָנֵי הַדּוֹר (leitzanei hador) son «los burlones de la generación», de לֵץ, burla. סִטְרָא אַחֲרָא (sitrá ajrá) es «el otro lado», el nombre cabalístico de la fuerza de oposición. קְלִיפָּה (klipá) es «cáscara, corteza»: lo que envuelve y oculta el fruto. Y las dos columnas: גְּבוּרָה (Guevurá), la sefirá del rigor, la contención, el límite — la columna de Isaac; y חֶסֶד (Jésed), la expansión, la bondad sin medida — la columna de Abraham.`,
    ],
  },

  // ── 2. מְפָרְשִׁים ──────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: 'Rashi (רַשִׁ"י) — el Creador como escultor.',
        texto: `Rashi llega al versículo y responde la redundancia con un midrash. Pero hay que leer el verbo que usa, porque el verbo es todo: «"Abraham engendró a Isaac" — porque la Escritura escribió "Isaac hijo de Abraham", se vio obligada a decir "Abraham engendró a Isaac"; porque los burlones de la generación (לֵיצָנֵי הַדּוֹר) decían: "de Abimélej quedó embarazada Sará", pues cuántos años estuvo con Abraham y no quedó embarazada de él. ¿Qué hizo el Santo, bendito sea? צָר el molde del rostro de Isaac semejante a Abraham, y todos testificaron: Abraham engendró a Isaac». — צָר (tzar). No «cambió». No «transformó». FORMÓ. El verbo viene de la raíz יצר (yatzar), la raíz del alfarero y del escultor: la misma con la que la Torá dice que el Eterno formó al hombre del polvo, וַיִּיצֶר (Génesis 2:7), y la misma de יְצִירָה, «formación», que da nombre a uno de los cuatro mundos de la Cabalá. Rashi no dice que el Creador retocó una cara. Dice que esculpió. El verbo ya contiene la imagen del cincel.`,
      },
      {
        etiqueta: "Targum Yonatán — no cambió nada, ya era así.",
        texto: `La traducción aramea atribuida a Yonatán ben Uziel lee el mismo versículo y dice algo distinto: «Y estas son las generaciones de Isaac, hijo de Abraham. Y porque el ikonin de Isaac era semejante al ikonin de Abraham, la gente decía: en verdad, Abraham engendró a Isaac». Aquí no hay milagro ni transformación. Hay un estado: el parecido existía. El rostro de Isaac ERA el retrato de su padre, y ese hecho bastó para cerrar las bocas. El Targum describe una condición, no un acontecimiento.`,
      },
      {
        etiqueta: "Midrash Tanjumá — el ángel de la formación, en el útero.",
        texto: `El Tanjumá, al abrir Toldot, cuenta la escena completa y la cuenta hacia atrás en el tiempo: «Ven y ve el poder de la paz: que en la hora en que Sará fue zarandeada de la mano del Faraón a la mano de Abimélej y quedó embarazada de Isaac, las naciones del mundo decían: "¿al de cien años le nacerá? Más bien está embarazada de Abimélej o del Faraón". Y había sospecha en el corazón de Abraham sobre estas cosas. ¿Qué hizo el Santo, bendito sea? Dijo al ángel encargado de la formación (יְצִירַת) del feto: "haz todo su ikonin a semejanza de su padre", para que todos testificaran que es hijo de Abraham» (Tanjumá, Toldot 1). Dos cosas hay que decirlas en voz alta. La primera: aquí el rostro se forma EN EL ÚTERO, antes del nacimiento — no es una reacción a la burla, es una anticipación de la burla; el Creador ve venir la sospecha y prepara la respuesta antes de que la pregunta se formule. La segunda, más dura y más honesta: Abraham mismo tenía la sospecha en el corazón. El midrash no protege al patriarca. La duda no vino solo de fuera: vino también de dentro.`,
      },
      {
        etiqueta: "Bavá Metziá 87a — aquí sí, el rostro cambia.",
        texto: `Y ahora el pasaje que casi todo el mundo cita, y que es el único donde el rostro verdaderamente se transforma. El Talmud está comentando el banquete del destete: «Dijo Rabí Leví: aquel día en que Abraham destetó a Isaac su hijo hizo un gran banquete. Estaban todas las naciones del mundo murmurando y diciendo: "¿Vieron un viejo y una vieja que trajeron un niño abandonado del mercado y dicen: es nuestro hijo? Y no solo eso, sino que hacen un gran banquete para sostener sus palabras". ¿Qué hizo Abraham nuestro padre? Fue y convocó a todos los grandes de la generación, y Sará nuestra madre convocó a sus mujeres… Y se hizo un milagro en Sará nuestra madre, y se abrieron sus pechos como dos manantiales, y amamantó a todos. Y todavía seguían murmurando y diciendo: "¿Si Sará, la de noventa años, da a luz, Abraham, el de cien años, engendra?". De inmediato נֶהְפַּךְ el molde del rostro de Isaac y se hizo semejante a Abraham. Abrieron todos la boca y dijeron: "Abraham engendró a Isaac"». — נֶהְפַּךְ (nehpaj): «se volcó, se invirtió, se transformó». Jastrow traduce el pasaje sin ambigüedad: los rasgos de Isaac fueron cambiados para parecerse a los de Abraham. Aquí la secuencia es inequívoca: primero el milagro de la leche, y no bastó; siguió la burla; y solo entonces el rostro se transformó. El cambio es la respuesta a la presión, y llega después de que la presión ya agotó la primera respuesta. Y fíjese cómo cierra el Talmud: con las palabras exactas «Abraham engendró a Isaac», que son nuestro versículo. El Talmud mismo ancla la escena en la redundancia que nos ocupa.`,
      },
      {
        etiqueta: "Quién se burla — un detalle que no es decorativo.",
        texto: `Nótese quién se burla en cada fuente, porque la diferencia importa. La expresión לֵיצָנֵי הַדּוֹר, «los burlones de la generación», es de RASHI, no del Talmud. El Talmud dice אוּמּוֹת הָעוֹלָם, «las naciones del mundo». Rashi convierte una murmuración colectiva y difusa en una figura con nombre: el burlón, el לֵץ. Y cambia también el contenido de la burla: en el Talmud es «un niño abandonado del mercado»; en Rashi y en el Tanjumá es Abimélej —o el Faraón— quien dejó embarazada a Sará. Cuatro fuentes, cuatro escenas. La tabla del mapa, arriba, las pone una al lado de la otra.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא) — la honestidad de no comprometerse.",
        texto: `Ibn Ezra registra la lectura del parecido, pero con distancia deliberada: «"Y estas": después de haber mencionado las generaciones de Ismael, vuelve a mencionar las generaciones de Isaac, que son Esav y Yaakov. Y algunos dicen que el sentido de "engendró a Isaac" es que se parecía a su padre y todos los que lo veían testificaban que Abraham lo engendró. Y algunos dicen que el sentido de "engendró" es crió y aumentó, como "fueron criados sobre las rodillas de Yosef" (Génesis 50:23); y la prueba es que dice "y los envió lejos de Isaac su hijo" (Génesis 25:6)». — יֵשׁ אוֹמְרִים, «algunos dicen». Ibn Ezra no firma el midrash del rostro: lo cita y pasa. Su propia inclinación es gramatical — הוֹלִיד puede significar «crió», y la redundancia se resuelve sin milagros. Es la voz que mantiene el estudio honesto.`,
      },
      {
        etiqueta: 'Ramban (רַמְבַּ"ן) — la identidad se define contra una alternativa.',
        texto: `Ramban cita a Rashi, cita a Ibn Ezra, y entonces dice וְהַנָּכוֹן בְּעֵינַי, «y lo correcto a mis ojos»: «que ahora volvió y comenzó por el padre del linaje, según la costumbre de la Escritura de volver, en los hombres de rango, a la cabeza del linaje… Y volvió a contar esto porque había dicho "y estas son las generaciones de Ismael hijo de Abraham" (Génesis 25:12); porque si hubiera dicho igualmente solo "y estas son las generaciones de Isaac hijo de Abraham", he aquí que habría igualado a los dos en linaje y en rango, y más aún habiendo antepuesto al primogénito… Y por eso volvió y completó "Abraham engendró a Isaac", para decir que él solo es su descendencia, y como si no hubiera engendrado a otro, como se le dijo: "porque en Isaac será llamada tu descendencia" (Génesis 21:12)». — Ramban cambia el eje. Para él la repetición no responde a los burlones: responde a Ismael. El versículo anterior dio a Ismael su propia lista de generaciones; si Isaac recibiera solo «hijo de Abraham», quedaría nivelado con su medio hermano. La segunda mitad del versículo es la que lo separa. Y vale decirlo, porque es estructuralmente idéntico a la lectura del rostro: en Ramban también la identidad de Isaac se define frente a una alternativa que la amenaza. Solo que la amenaza no es la burla, es la existencia de otro candidato.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבָּנֵאל) — la objeción que nadie puede esquivar.",
        texto: `Abarbanel, en el Portugal y la Italia del siglo XV, enumera sus preguntas sobre la parashá y pone esta primera: «Pregunta primera: al decir "Abraham engendró a Isaac" después de haber dicho "y estas son las generaciones de Isaac", es una redundancia manifiesta. Y Rashi escribió, del Midrash, que la razón de esta duplicación es que el resplandor del ikonin (זִיו אִיקוֹנִין) de Isaac era semejante a Abraham su padre. Y algunos dicen que fue después de que se llamó "Abraham" que engendró a Isaac, no cuando se llamaba "Abram". Y aunque todo esto es verdad, no correspondía escribirlo en este lugar, sino cuando nació». — Lea la objeción otra vez, porque es filosa. Abarbanel NO niega el midrash: dice וְאִם הֱיוֹת כָּל זֶה אֱמֶת, «y aunque todo esto es verdad». Lo que objeta es la UBICACIÓN. Si el milagro del rostro ocurrió en el nacimiento o en el banquete del destete —es decir, en Génesis 21— ¿por qué la Torá lo insinúa aquí, sesenta años más tarde, en el primer versículo de Toldot? Esa pregunta es la bisagra de todo el estudio, y volveremos a ella.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּי\"ם) — el crisol, la escoria y la cáscara que rodea.",
        texto: `Malbim, en el siglo XIX, lee el mismo versículo y lo convierte en metalurgia: «…dijo que las generaciones de Isaac son por el lado de que Abraham engendró a Isaac… fue necesario refinar la semilla para quitar el estaño y la escoria… como el oro que se encuentra en la tierra, sobre el cual hay una cáscara (קְלִיפָּה) de polvo y roca que lo rodea (מַקִּיף), y está adherida a él solo con adherencia vecina… y hay escoria que se mezcla con el oro y se le adhiere con adherencia esencial, que no se quita sino por fundición dentro del crisol…». — Esta es la imagen más precisa de todo el estudio, y es más austera que la del cincel. El oro no se fabrica en el crisol: el oro ya estaba ahí. Lo que el crisol hace es quitar lo que lo cubría. La klipá que rodea el metal no aporta nada al metal; solo lo oculta, y el fuego la separa. Nótese el verbo: מַקִּיף (makif), «que rodea, que envuelve». La cáscara es lo circundante. El oro es lo interior.`,
      },
      {
        etiqueta: "El Arizal y la Cabalá luriana — Isaac es Guevurá, y Guevurá nace dentro de Jésed.",
        texto: `Toda la lectura cabalística de este estudio descansa en una asignación que el Zohar hace sin ambigüedad: Abraham es la columna de Jésed e Isaac la columna de Guevurá. El Zohar nombra a Isaac con una expresión técnica, דִּינָא קַשְׁיָא (diná kashiá), «juicio severo»: «Y por eso Isaac, juicio severo, salió para asirse a su porción; y para engendrar se llama jésed. Y por eso Yaakov completó todo, de este lado y de aquel lado… él es la completud» (Zohar, Lej Lejá 35:459). Pero el pasaje decisivo está en Terumá, y es un intercambio entre dos maestros: «Dijo Rabí Elazar: de aquí se aprende que Yaakov salió de dentro del juicio severo, pues Isaac es juicio severo… Le dijo Rabí Shimón: eso es solo una parte — pues ISAAC SALIÓ DE DENTRO DE JÉSED, y así todos ellos: el juicio sale de dentro de la misericordia, y la misericordia del juicio. Abraham heredó la heredad de Jésed; salió Isaac en juicio desde dentro de Jésed. Yaakov salió en misericordia desde dentro del juicio severo. Y así es arriba: este de aquel, y este se nutre de aquel, hasta que se reconoce que todo es uno» (Zohar, Terumá 96:919). Deténgase aquí, porque esto es el corazón cabalístico del estudio y es grado A. El Zohar no dice solamente que Isaac es Guevurá: dice que Isaac es Guevurá que salió DESDE DENTRO de Jésed. El rigor nace en el seno de la bondad. El límite brota de lo ilimitado. El hijo que contiene nace del padre que se expande. Y hay un comentario zohárico del siglo XVI, el Ketem Paz de Rabí Shimón Labi, que amarra esto a nuestro versículo exacto: «Y por eso Isaac, juicio severo, salió para asirse a su porción en la midá de Guevurá, pues "Abraham engendró a Isaac"» (Ketem Paz al Zohar 95b:12). Nuestra redundancia, leída cabalísticamente, es la fórmula de una generación: Jésed engendró Guevurá. Si quiere ver esa misma Guevurá desde el otro extremo —el lugar de máxima contracción donde la Luz sin medida mora— está en {{study:arca-no-ocupa-lugar|el arca que no ocupaba lugar}}.`,
      },
      {
        etiqueta: "Y la pieza incómoda, que no se va a esconder.",
        texto: `Una última pieza luriana. El Zohar, en una Tosefta de Vayetzé, dice de dónde viene la fuerza de oposición: «…Abadón, el masculino, Samael, que salió de la fundición (הִתּוּכָא) de la fuerza (תּוּקְפָּא) de Isaac…» (Zohar, Vayetzé 32, Tosefta). El Zohar usa הִתּוּכָא (hitujá), «fundición, colada» — la misma raíz del הִתּוּךְ de Malbim, la operación del crisol. Y dice que la {{study:criaturas-que-nunca-vieron-el-sol|sitrá ajrá, el otro lado}} sale del exceso de la severidad de Isaac. Esto corre en dirección contraria a la lectura que vamos a proponer, y es honesto decirlo ahora: el Zohar sabe que la oposición no es un instrumento amable. La klipá no es decorativa. Nace del mismo rigor cuyo rostro ayuda a definir. Las dos verdades conviven en el mismo texto, y ese es el filo doble de este misterio.`,
      },
    ],
    glosa:
      "Cuatro nombres que conviene tener claros. El TARGUM YONATÁN es la traducción aramea de la Torá atribuida a Yonatán ben Uziel: no traduce solo, interpreta mientras traduce. El MIDRASH TANJUMÁ es una colección homilética antigua, organizada por parashá, que aquí abre Toldot justamente con esta escena. ABARBANEL es Don Isaac Abravanel (Lisboa 1437 – Venecia 1508), estadista y comentarista, famoso por abrir cada parashá con una lista de preguntas antes de responder ninguna. Y MALBIM es Rabí Meir Leibush ben Yejiel Mijel (s. XIX), que lee la Torá con una precisión casi científica y de quien sale aquí la imagen del crisol. A ellos se suma JASTROW, el diccionario de arameo talmúdico del que vienen las etimologías griegas de קְלַסְתֵּר (de krystallos, «cristal») y de אִיקוֹנִין (de eikonion, «retrato»).",
  },

  // ── 3. פרד״ס ───────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat · el sentido llano, y es sobrio",
        parrafos: [
          `En el nivel llano el versículo hace un trabajo administrativo: cierra un libro y abre otro. El versículo 12 del mismo capítulo había dicho «y estas son las generaciones de Ismael hijo de Abraham»; el versículo 19 responde con la misma fórmula para Isaac. La Escritura está ordenando linajes.`,
          `Pero la segunda mitad —«Abraham engendró a Isaac»— excede lo administrativo. Y en el nivel llano hay tres salidas, todas legítimas. La GRAMATICAL (Ibn Ezra): הוֹלִיד aquí no es «engendró» sino «crió»; Isaac fue el único criado por Abraham, los demás hijos fueron enviados lejos (Génesis 25:6) — no hay redundancia, hay dos informaciones distintas. La GENEALÓGICA (Ramban): la Escritura vuelve a la cabeza del linaje, como hace en Crónicas, y al hacerlo declara que Isaac es la única descendencia que cuenta. Y la TESTIMONIAL (Targum Yonatán): el parecido físico era un hecho público, y el versículo lo registra como testimonio.`,
          `Ninguna de las tres necesita un milagro. El pshat es sobrio, y conviene que lo sea.`,
        ],
      },
      {
        head: "רֶמֶז — Rémez · la forma del versículo dibuja el parecido",
        parrafos: [
          `El rémez del versículo está en su FORMA, no en su contenido: la Torá tartamudea exactamente ahí donde la paternidad fue puesta en duda. La repetición es mimética. El texto hace lo que la escena hizo: insiste.`,
          `Y hay una segunda alusión, estructural. Observe el patrón: «Isaac HIJO DE Abraham · Abraham ENGENDRÓ A Isaac». Es un quiasmo — Isaac–Abraham–Abraham–Isaac. El versículo se cierra sobre sí mismo como un anillo, con los dos nombres tocándose en el centro. La forma literaria dibuja el parecido: los dos nombres puestos cara a cara, espejo contra espejo. La redundancia no es un defecto del versículo; es su figura.`,
          `Tercera alusión, y esta pide mirar un libro muy distinto. El mismo libro que nos dará la clave cabalística del estudio, Kohélet, dice: חׇכְמַת אָדָם תָּאִיר פָּנָיו וְעֹז פָּנָיו יְשֻׁנֶּא — «la sabiduría del hombre ilumina su rostro, y la dureza de su rostro se transforma» (Kohélet 8:1). El verbo final, יְשֻׁנֶּא (yeshuné), es de la raíz שנה: «cambiar, transformarse». Kohélet dice, en lenguaje de sabiduría y sin ningún milagro, que un rostro cambia DESDE DENTRO. Y lo que cambia es עֹז פָּנָיו, la FUERZA del rostro — y עֹז es vocabulario de Guevurá. El rostro que se transforma por lo que lleva adentro. Guárdelo: lo necesitaremos en Sod.`,
        ],
      },
      {
        head: "דְּרָשׁ — Drash · la risa tiene dos filos, y el Midrash lo sabe",
        parrafos: [
          `Aquí el Midrash hace algo que vale toda la sección. Sobre la burla de Ismael en Génesis 21:9 —מְצַחֵק, de la misma raíz que el nombre de Isaac— el Midrash Rabá abre un debate explícito: «"Y vio Sará al hijo de Hagar la egipcia": dijo Rabí Shimón ben Yojai: Rabí Akivá decía sobre esto algo para VITUPERIO, y yo digo sobre esto algo para ALABANZA. Expuso Rabí Akivá: metzajek no es sino inmoralidad… Enseñó Rabí Ishmael: este lenguaje de risa no es sino idolatría… Rabí Elazar hijo de Rabí Yosí el Galileo dice: este lenguaje no es sino derramamiento de sangre… Y yo digo sobre esto algo para alabanza: este lenguaje de risa no es sino LENGUAJE DE HERENCIA — que en la hora en que nació Isaac nuestro padre todos estaban alegres, y les dijo Ismael: "necios son ustedes, yo soy el primogénito y yo tomo porción doble"» (Bereshit Rabá 53:11).`,
          `Esta es la lógica de Dos Filos (שְׁנֵי פִּיּוֹת) en su forma clásica, y no la inventamos nosotros: la trae Rabí Shimón bar Yojai en el propio Midrash. La misma palabra, מְצַחֵק, leída por cuatro maestros. Tres la leen como violencia. El cuarto la lee como HERENCIA: lo que está en disputa no es la risa, es quién hereda. Y ahí está el filo: la burla y la herencia comparten la raíz. Lo que se burla de Isaac es lo que compite por su lugar. La risa es el sonido que hace una identidad cuando otra la disputa.`,
          `Fíjese además en el gesto de Rashbi: no borra a Rabí Akivá. Dice «él dice para vituperio, yo digo para alabanza». Las dos lecturas quedan en el texto. El Midrash no resuelve: sostiene la tensión. Eso es un modelo de cómo estudiar, y es también un modelo de cómo tratar a quien nos disputa el lugar.`,
          `La enseñanza jasídica recoge esta estructura en una sentencia breve que se repite por toda la literatura: קְלִיפָּה קוֹדֶמֶת לַפְּרִי, «la cáscara precede al fruto». La escuela de Izhbitz la aplica precisamente al contexto narrativo inmediato de nuestra parashá: «…porque la cáscara siempre precede al fruto; por eso hubo primero doce príncipes de Ismael, que son la cáscara, y eso es para bien del fruto…» (Beit Yaakov sobre la Torá, Jayei Sará 39:1). Y otra voz de la misma escuela lo convierte en principio de la creación entera: «…así ordenó Su voluntad en todas las cosas, que la cáscara preceda al fruto… y así fue también el orden de la creación del mundo: primero fueron creadas todas las criaturas y después la forma del hombre… para que el hombre extraiga la luz de dentro de la oscuridad, precisamente» (Sod Yesharim, Rosh Hashaná 92:1). Y la voz jasídica recogida en la antología del Baal Shem Tov: «…y les revelará נְהוֹרָא מִגּוֹ חֲשׁוֹכָא, luz desde dentro de la oscuridad, literalmente» (Sefer Baal Shem Tov, Yitró 26:10 — antología compilada muy posteriormente: la enseñanza es de la tradición jasídica, la redacción no es del Baal Shem Tov mismo).`,
          `Dos advertencias de precisión, y las dos importan. La primera, sobre la gramática de la fórmula: la cáscara PRECEDE. No crea. No produce. Va delante. Y el trabajo del hombre es EXTRAER (לְהוֹצִיא) la luz, que ya estaba. La segunda, sobre la atribución: esta sentencia se cita muchas veces como si fuera del Zohar, y el Sofer no localizó el pasaje zohárico primario. Aquí se cita por las fuentes jasídicas que sí se verificaron, nunca como «dice el Zohar».`,
        ],
      },
      {
        head: "סוֹד — Sod · la luz que viene de la oscuridad, y el rostro que no palidece",
        parrafos: [
          `Kohélet dice: וְרָאִיתִי אָנִי שֶׁיֵּשׁ יִתְרוֹן לַחׇכְמָה מִן־הַסִּכְלוּת כִּיתְרוֹן הָאוֹר מִן־הַחֹשֶׁךְ — «y vi yo que hay ventaja para la sabiduría sobre la necedad, como la ventaja de la luz sobre la oscuridad» (Kohélet 2:13). El hebreo מִן («de, desde, sobre») permite las dos lecturas: la luz es MEJOR QUE la oscuridad, o la luz VIENE DE la oscuridad. El Zohar toma la segunda, y hace de ella una de sus fórmulas centrales.`,
          `«En el tiempo en que Yaakov el íntegro, desde dentro de la angustia (עָקוּ) de la tierra y de un dominio ajeno, entre grados extranjeros, los rechazó a todos y separó la porción de su suerte y su heredad — luz desde dentro de la oscuridad, sabiduría desde dentro de la necedad — y honró a su Señor cuando estaba de pie dentro del dominio de un dios extraño. Por eso está escrito: "no ahora se avergonzará Yaakov, ni ahora palidecerá su rostro" (Isaías 29:22)» (Zohar, Vayetzé 32:312, Sitrei Torá). Y en Shemot, la misma fórmula con un remate: «Luz desde dentro de la oscuridad. Sabiduría desde dentro de la necedad. Y esto es lo más excelente de todo» (Zohar, Shemot 21:208).`,
          `Ahora mire lo que acaba de pasar, porque es el hallazgo central de este estudio. El Zohar describe a Yaakov bajo presión: en la angustia, bajo un dominio ajeno, rodeado de «grados extranjeros». De esa presión sale luz desde la oscuridad. Y el Zohar sella la enseñanza citando a Isaías: לֹא־עַתָּה יֵבוֹשׁ יַעֲקֹב וְלֹא עַתָּה פָּנָיו יֶחֱוָרוּ — «no ahora se avergonzará Yaakov, ni ahora palidecerá su rostro» (Isaías 29:22). יֶחֱוָרוּ (yejvaru), de la raíz חור: palidecer, blanquearse, perder el color. El rostro que NO palidece. El Zohar ha unido, en un solo movimiento, la luz que sale de la oscuridad y el rostro que no se desdibuja bajo la vergüenza: la presión externa, y el panim que resiste. Ese es el eje exacto de nuestro versículo, y no lo pusimos nosotros — está en el Zohar.`,
          `Y hay una convergencia más, que cierra el círculo: ese mismo versículo de Isaías 29:22 es el que Bereshit Rabá cita al abrir la parashá Toldot (Bereshit Rabá 63:2), en el midrash que dice que «Yaakov redimió a Abraham». El versículo del rostro que no palidece está plantado en el umbral de nuestra parashá.`,
          `Falta una pieza, y es la que da fundamento a todo lo que viene. ¿Con qué derecho decimos que el panim es la expresión visible del alma, y no un simple rasgo físico? Con el derecho del Talmud: «Enseñaron nuestros maestros: tres socios hay en el hombre — el Santo, bendito sea, su padre y su madre. SU PADRE siembra lo blanco, de lo cual vienen huesos, tendones, uñas, el cerebro de su cabeza y lo blanco del ojo. SU MADRE siembra lo rojo, de lo cual vienen piel, carne, cabello y lo negro del ojo. Y EL SANTO, BENDITO SEA, pone en él espíritu (רוּחַ), alma (נְשָׁמָה) y el molde del rostro (קְלַסְתֵּר פָּנִים), y la vista del ojo, y el oído del oído, y el habla de la boca, y el andar de los pies, y el entendimiento y la inteligencia» (Nidá 31a).`,
          `Lea la lista otra vez. Los padres aportan materia: hueso, uña, piel, carne, cabello. Y el Creador aporta rúaj, neshamá y klaster panim — en la misma enumeración, en la misma respiración. El rostro está catalogado DEL LADO DEL ALMA. No del lado de la carne. El Talmud, enumerando lo que cada socio aporta al ser humano, pone el molde del rostro junto al espíritu y al alma, y no junto a la piel. Eso es panim como expresión visible del alma, con fuente talmúdica y grado A. No hace falta recurrir a la fisiognomía tardía, que es terreno resbaladizo: el Talmud ya lo dijo. Y si el rostro puede volverse visible, también puede ocultarse — ese es el otro extremo del mismo eje, y vive en {{study:hester-panim|el ocultamiento del rostro}}.`,
          `Y de aquí sale una consecuencia que resuelve el problema entero. Si el klaster panim nunca fue aportación de los padres, sino del Creador, entonces cuando el Talmud dice que el rostro de Isaac «se transformó», no hubo ninguna violación de la paternidad de Abraham. El Creador no alteró un rasgo heredado: ajustó algo que siempre fue Suyo. El rostro no era de Abraham para empezar. Era de Él. (Esta derivación —leer Nidá 31a como la clave que legitima el cambio de rostro en Bavá Metziá 87a— es lectura del Sofer, grado B, construida sobre dos fuentes de grado A.)`,
          `Una última pieza, y hay que decir de qué grado es. Baal HaSulam, en su comentario HaSulam al Zohar, trabaja exactamente estos pasajes, y el principio que gobierna su lectura de נְהוֹרָא מִגּוֹ חֲשׁוֹכָא es el que organiza todo su sistema: no hay luz sin recipiente, y el recipiente es la carencia. Lo que no falta no se puede recibir; la medida del vacío es la medida de lo que puede entrar. Aplicado a nuestro versículo: la burla abrió un hueco. Puso en duda algo que, mientras nadie lo dudaba, nadie miraba. Y el lugar donde se abrió la duda es exactamente el lugar donde el rostro se volvió legible. (Nota de honestidad, y se repite porque importa: los escritos de Baal HaSulam que formulan esto con más limpieza no están disponibles en Sefaria y el Sofer no pudo cotejar una cita textual. Lo de arriba es el principio general de su sistema, expuesto en palabras nuestras, no una cita. El material zohárico de esta sección sí está verificado.)`,
          `Y ahora la revelación original, que es el corazón de este estudio y que no es tradición recibida sino lectura propia — un jidush de Mardan Kadivar, que él formuló así: «cabalísticamente hablando, estas fuerzas del otro lado (las burlas) sirvieron para grabar unos marcos más pronunciados en el panim de las almas».`,
          `La imagen es la del escultor. Un cincel no puede marcar el aire: necesita la resistencia de la piedra, porque es la dureza del material la que permite que el golpe deje una línea definida. Sin resistencia no hay surco; sin surco no hay figura. La sitrá ajrá —la fuerza de oposición— funcionó, en el caso de Isaac, como la resistencia que permite que el trazo quede grabado. Las burlas presionaron sobre su identidad y preguntaron: ¿de quién es este niño? Y la respuesta del Creador no fue silenciar la pregunta: fue hacer el rostro MÁS NÍTIDO. Donde la oposición intentó borrar un rostro, ese rostro quedó más definido que antes. Y el remate de Mardan: a veces el alma necesita ser cuestionada para revelar con más claridad quién es; la duda externa se vuelve espejo que afila la identidad interna.`,
          `Lo que esta lectura resuelve es mucho, y conviene verlo en orden. PRIMERO, resuelve la objeción de Abarbanel. Abarbanel preguntó: si el milagro del rostro ocurrió en el nacimiento, ¿por qué la Torá lo insinúa aquí, en el umbral de Toldot, sesenta años después? Respuesta: porque el rostro no se cierra en el nacimiento — se cierra cuando la identidad tiene que TRANSMITIRSE. תּוֹלְדֹת significa «generaciones»; la parashá trata de Isaac engendrando. Y una identidad solo está verdaderamente definida cuando puede pasar a otro. El versículo pone «Abraham engendró a Isaac» justo donde Isaac va a tener que engendrar: la identidad probada es la que se hereda.`,
          `SEGUNDO, resuelve la contradicción entre las versiones de la tabla, y lo hace sin forzar ninguna. En Bavá Metziá 87a el rostro cambia DESPUÉS de la burla: la oposición es la causa inmediata. En el Tanjumá el ángel forma el rostro en el útero porque el Creador ANTICIPA la burla: la oposición es la causa anticipada. En el Targum Yonatán el parecido simplemente ES, y su función en el relato es responder a la murmuración: la oposición es la causa final, aquello en vista de lo cual el rostro tiene la forma que tiene. En las tres, la oposición es la razón del rostro. Cambia CUÁNDO actúa; no cambia QUE actúe. No hay que elegir entre las versiones: las tres sostienen la lectura, cada una en su propio tiempo verbal.`,
          `TERCERO, explica por qué el patriarca del rostro cuestionado es precisamente el patriarca de Guevurá. Guevurá es la fuerza que contiene, que pone límite, que define un borde. Y un borde solo existe donde algo empuja desde el otro lado: la forma sigue a la fuerza. Y el Zohar añade la pieza que lo vuelve humano — esta Guevurá «salió desde dentro de Jésed» (Terumá 96:919): la capacidad de resistir nació en el regazo de la bondad. Isaac puede soportar la presión porque viene de Abraham.`,
        ],
      },
    ],
    caja: {
      titulo:
        "El límite, y es parte de la enseñanza: la oposición no crea la identidad — la revela y la define",
      cuerpo:
        "El cincel no inventa la figura: quita lo que la escondía. Y tiene fuente. Nidá 31a es la garantía: el klaster panim de Isaac fue dado por el Creador en el útero, junto con el rúaj y la neshamá — los burlones NO hicieron el rostro de Isaac, no aportaron nada, no tuvieron parte en él; Isaac ya era hijo de Abraham antes de que nadie lo dudara, y lo habría sido igual si nadie lo hubiera dudado nunca. Malbim lo dice en el lenguaje del metal: el oro ya estaba en la tierra, y la klipá de polvo que lo rodeaba no lo volvió oro ni lo mejoró — solo lo tapaba; el fuego no crea oro, separa. Y la fórmula jasídica es exacta en su gramática: la cáscara PRECEDE al fruto, va delante, no lo produce. Más aún: el propio Zohar se niega a romantizar la oposición, y dice que Samael salió de la fundición de la fuerza de Isaac. No hay aquí ninguna celebración de la adversidad; hay una descripción de cómo funciona un borde. Por eso la pregunta honesta que esta página pone delante del lector no es «¿para qué sirvió mi dolor?» — esa pregunta no tiene respuesta que se pueda dar a otro. La pregunta es más pequeña y más practicable: ¿qué quedó visible en mí que antes no se veía?",
    },
  },

  // ── 4. הִתְבּוֹנְנוּת ──────────────────────────────────────────────────────
  hitbonenut: {
    intro:
      "Deje a un lado las fuentes. No hay nada más que verificar. Quédese un momento con lo que ya está en la mano: un rostro fue puesto en duda, y se volvió más claro. Eso es todo lo que hay que sostener ahora.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña esto?",
        texto: `Hay una pregunta que llega antes de todas las demás. Piense en lo que de usted se volvió nítido solamente cuando alguien lo puso en duda. No lo que aprendió del golpe: eso es otra cosa, y más barata. Piense en lo que YA ERA usted y nadie veía —ni usted mismo— hasta que una pregunta hostil obligó a que se mostrara. Isaac no se volvió hijo de Abraham el día del banquete: lo era desde el útero. Lo que cambió ese día no fue su filiación, fue la LEGIBILIDAD de su filiación. Y hay algo casi insoportable en eso, porque significa que lo que somos puede estar completamente presente y completamente invisible al mismo tiempo, durante años, esperando una presión que lo saque a la superficie.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Mire el patrón, porque se repite en todas las escalas y es el mismo. El Talmud pone el rostro del lado del alma. Kohélet dice que la sabiduría ilumina el rostro y que la fuerza del rostro se transforma. El Zohar dice que la luz sale de la oscuridad y remata con un rostro que no palidece. Isaías dice que el rostro no palidece. El Midrash discute si una risa es violencia o es herencia, y deja las dos lecturas en pie. Malbim dice que el oro estaba antes del crisol. Y el versículo de Toldot, para decir una sola cosa, la dice dos veces. Todo apunta al mismo sitio: lo interior quiere hacerse rostro. Esa es la dirección del movimiento — no de afuera hacia adentro, de adentro hacia afuera. El panim es el penim que llegó a la superficie.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Hay un segundo patrón, más silencioso. En cada caso, lo que define no es lo que empuja: es lo que RESISTE. El cincel no hace la figura; la hace la piedra que no cede. El crisol no hace el oro; lo hace el oro que no se funde con la escoria. La burla no hizo el rostro de Isaac; lo hizo el rostro que ya estaba ahí y que no se desdibujó. Entonces: ¿qué en usted no cede? No qué resiste con esfuerzo, apretando los dientes. Qué simplemente NO SE MUEVE cuando se lo presiona, porque no está sostenido por su voluntad sino por lo que usted es.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Si la cáscara precede al fruto en todo —si ese es el orden de las cosas y no una excepción— entonces vivimos en un mundo donde lo valioso llega siempre envuelto, y donde el trabajo humano no es producir la luz sino SACARLA DE DONDE ESTÁ. Eso cambia la descripción del oficio: no somos fabricantes, somos los que destapan. Y quédese con la pregunta que no se puede delegar: hay cosas en usted que todavía nadie ha cuestionado, y que por eso siguen sin ser visibles ni para usted. No hace falta desear que lleguen las preguntas. Pero sí hace falta saber que están ahí, completas, esperando.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה ────────────────────────────────────────────────────────────
  maase: {
    intro:
      "Hoy, no mañana. Una sola cosa, pequeña y concreta — y después la midá, y después la conducta.",
    etiqueta: "Tome papel y escriba una frase, una sola.",
    texto: `Escriba la última vez que alguien cuestionó algo esencial de usted, y qué de usted quedó más claro después. No escriba qué aprendió. No escriba cómo superó nada. Escriba QUÉ SE VOLVIÓ VISIBLE: un valor que no sabía que tenía, un límite que no sabía dónde estaba, una lealtad que no se había medido. Si al escribirlo le sale una queja, táchela y vuelva a empezar: la queja mira al que preguntó, y este ejercicio mira el rostro.

La midá a trabajar: GUEVURÁ. Guevurá no es dureza — es BORDE: saber dónde termina usted. Es la midá de Isaac y es la midá de esta parashá. Elija hoy un solo lugar donde su borde está difuso: una conversación donde dice sí sin querer, un horario que nadie respeta porque usted nunca lo dijo, una opinión que se calla por no incomodar. Y hoy ponga ahí el límite — una vez, en un solo asunto, con palabras tranquilas.

Y el cuidado que hace que esto sea Guevurá y no simple frialdad: el Zohar dice que Isaac salió «en juicio desde dentro de Jésed» (Terumá 96:919). El límite nace en el regazo de la bondad. Así que ponga el límite SIN RETIRAR EL AFECTO: diga «no» a la cosa y no a la persona. Si el borde que pone enfría el vínculo, se le fue la mano; vuelva a decirlo mañana más despacio y con más calor.

La conducta a cambiar, esta semana: cuando alguien lo cuestione, NO RESPONDA DE INMEDIATO. Cuente hasta tres y pregúntese una sola cosa: ¿qué de mí está esta pregunta volviendo visible? Y lo recíproco, que es la parte difícil y la que casi nadie hace: durante esta semana, no sea el burlón de nadie. Si va a cuestionar a alguien —y a veces hay que hacerlo— hágalo donde esa persona pueda salir con el rostro MÁS CLARO, no con el rostro borrado. El Midrash le dio el modelo: Rabí Shimón bar Yojai no borró a Rabí Akivá. Dijo «él lo lee para vituperio; yo lo leo para alabanza», y dejó las dos lecturas vivas.`,
  },

  // ── 6. חֲתִימָה ────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El primer versículo de Toldot dice dos veces que Abraham engendró a Isaac. La tradición explica esa redundancia con un rostro: el rostro de Isaac, puesto en duda por la burla y vuelto nítido por el Creador. Y el verbo que usa Rashi para describirlo no es «cambiar» sino ESCULPIR — צָר, de la raíz יצר, la del alfarero y la del וַיִּיצֶר con que el Eterno formó al hombre del polvo.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El Talmud, al enumerar lo que cada socio aporta al ser humano, pone el MOLDE DEL ROSTRO junto al espíritu y al alma — no junto a la piel y el hueso (Nidá 31a). El rostro pertenece categóricamente al lado del alma. Por eso puede cambiar sin que la filiación cambie: nunca fue de los padres. Y por eso la burla no tuvo parte en hacerlo.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El Zohar une dos cosas en un solo movimiento: «luz desde dentro de la oscuridad» y, citando a Isaías, «ni ahora palidecerá su rostro» (Zohar, Vayetzé 32:312; Isaías 29:22). La presión de afuera y el panim que no se desdibuja. Y añade la estructura: Isaac es Guevurá NACIDA DESDE DENTRO DE JÉSED (Terumá 96:919) — la capacidad de resistir se gestó en el regazo de la bondad. Nadie resiste desde la nada; se resiste desde haber sido amado antes.`,
      },
      {
        etiqueta: "El límite, que es parte del sello:",
        texto: `La oposición NO CREA la identidad. La REVELA y la DEFINE. El cincel no inventa la figura: quita lo que la escondía. El oro de Malbim ya estaba en la tierra antes del crisol, y la cáscara, dice la fórmula jasídica, solamente PRECEDE al fruto. Nada de esto convierte el dolor en un bien, y este estudio no lo dirá ni lo insinuará.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Un borde hoy, en un solo asunto, dicho con calor. Y una frase escrita: no qué aprendió del cuestionamiento, sino QUÉ DE USTED QUEDÓ VISIBLE.`,
      },
    ],
  },

  // ── Nota de autor — fuera del cuerpo sellado ────────────────────────────────
  jidush: {
    titulo: "Nota de autor — el grado de cada pieza del jidush",
    rotulo:
      "Esto no es una sección de estudio ni añade enseñanza: es la contabilidad de fuentes del jidush que se leyó en el Sod, puesta aquí abajo para que el lector pueda medir exactamente qué es tradición recibida y qué es lectura propia.",
    parrafos: [
      `La síntesis —la oposición como cincel que define el panim— es de Mardan Kadivar y es GRADO B: una lectura nueva, no una tradición recibida. Así se presenta y así hay que citarla. Lo que la sostiene, en cambio, es grado A pieza por pieza.`,
      `GRADO A, verificado contra fuente: que la luz viene DE la oscuridad y que eso es «lo más excelente de todo» (Zohar, Shemot 21:208; Vayetzé 32:312). Que la presión externa y el rostro que no palidece están unidos en un solo movimiento (Zohar, Vayetzé 32:312 + Isaías 29:22). Que el rostro pertenece al alma y no a la carne (Nidá 31a). Que el verbo aplicado al rostro de Isaac es el del escultor — צָר, de יצר (Rashi a Génesis 25:19). Que el rostro se transformó DESPUÉS y A CAUSA de la burla (Bavá Metziá 87a). La cáscara que rodea y el crisol que la separa (Malbim a Génesis 25:19). Que la cáscara precede al fruto, para bien del fruto (Beit Yaakov, Jayei Sará 39:1; Sod Yesharim, Rosh Hashaná 92:1). Que Isaac es Guevurá nacida desde dentro de Jésed (Zohar, Terumá 96:919). Y que la identidad se define frente a una alternativa rival (Ramban a Génesis 25:19).`,
      `GRADO B además del jidush mismo, y rotulado donde aparece: leer Nidá 31a como la clave que legitima el cambio de rostro sin violar la paternidad de Abraham; la convergencia de las cuatro versiones por la vía de «causa inmediata, anticipada y final»; y la respuesta a Abarbanel por la vía de תּוֹלְדֹת (la identidad probada es la que se transmite). Las tres son derivaciones del Sofer sobre fuentes de grado A.`,
      `Qué NO se usó, y por qué. No se usó la fisiognomía tardía como fundamento de «panim = alma»: Nidá 31a es incomparablemente mejor y es Talmud. No se usó el eje Or Makif / Or Pnimí, aunque Malbim diga מַקִּיף de la cáscara: el Or Makif luriano es luz divina que envuelve el recipiente porque el recipiente no puede recibirla dentro, y la klipá makif de Malbim es materia que oculta — comparten la palabra «rodear» y nada más, e identificarlos sería un juego de palabras disfrazado de identidad conceptual. En su lugar se usó lo que sí converge sin forzar nada: el eje Jésed→Guevurá del Zohar y la raíz de la FUNDICIÓN (הִתּוּכָא en el Zohar, הִתּוּךְ en Malbim), que es un hallazgo real. Y no se buscó —queda para una segunda pasada— Or HaJaim, Sforno, Jizkuni, el Netziv ni el Sefat Emet sobre Toldot.`,
      `Una línea final sobre quién hace el juego de palabras. El doble filo de la raíz צחק es del Midrash y es grado A: Bereshit Rabá 53:11, con Rabí Akivá leyéndola para vituperio y Rashbi para alabanza. Pero NINGUNA fuente clásica localizada dice que los burlones que se ríen esculpen el rostro de Itzjak. Esa síntesis es nuestra, y es exactamente lo que está rotulado como grado B.`,
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — solo puentes, sin enseñanza nueva ───────────────────
  hemshej: [
    "¿Cómo puede el rigor —Guevurá, la contracción, el límite— ser justamente el lugar donde la Luz sin medida mora? → {{study:arca-no-ocupa-lugar|El arca que no ocupaba lugar}}",
    "¿Qué es «el otro lado», y qué pasa cuando la luz y la cáscara vienen mezcladas en la misma persona? → {{study:criaturas-que-nunca-vieron-el-sol|Las criaturas que nunca vieron el sol}}",
    "Si el rostro puede volverse legible bajo presión, ¿qué significa que se oculte? → {{study:hester-panim|El ocultamiento del rostro}}",
    "La letra con la que se escribe la risa, y con la que se escribe el justo → {{letter:tzadi|La letra Tzadi}}",
  ],

  ctaRef: "Genesis 25:19",
};
