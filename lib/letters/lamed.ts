import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  LAMED (ל) — Data de la duodécima letra. Contenido erudito VERIFICADO por
//  el Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Deuteronomio 4:10 — יִלְמְדוּן ("aprenderán") y יְלַמֵּדוּן ("enseñarán")
//     en el MISMO versículo; Deut 5:1 — וּלְמַדְתֶּם; Salmos 119:12 — לַמְּדֵנִי.
//   · Génesis 1:1 — la Torá EMPIEZA con la bet de בְּרֵאשִׁית; Deuteronomio
//     34:12 — y TERMINA con la lamed de יִשְׂרָאֵל. Juntas: לֵב (corazón).
//     Anclaje clásico: Rosh sobre la Torá, Génesis 1:1:2 ("empieza con bet
//     y termina con lamed — los 32 [ל"ב] recintos del corazón") y Kli Yakar
//     sobre Deuteronomio 34:12 (שָׁמַעְתִּי אוֹמְרִים — bi/bo/bah · li/lo/lah).
//   · Sanedrín 106b y Jaguigá 15b — מִגְדָּל הַפּוֹרֵחַ בָּאֲוִיר ("la torre que
//     vuela en el aire"): Doeg contaba 300 halajot sobre ella (R. Yitzjak,
//     sobre Isaías 33:18); Doeg y Ajitofel plantearon 400 (Rebí) / 300
//     (R. Amí) preguntas. Contexto NEGATIVO: erudición sin corazón —
//     Jaguigá 15b remata: טִינָא הָיְתָה בְּלִבָּם ("había barro en su corazón").
//   · Rashi sobre Sanedrín 106b (s.v. במגדל הפורח באויר) — su PRIMERA
//     explicación, en nombre de su maestro (לשון מ"ר מפי השמועה): la frase
//     se refiere al trazo superior DE LA LAMED. La lectura "lamed = torre
//     que vuela" es, pues, tradición medieval citada por Rashi, no el pshat
//     único de la Guemará (Rashi trae otras tres explicaciones).
//   · Shabat 104a — la serie ז"ח ט"י כ"ל de los niños del bet midrash:
//     "...וְקוֹשֵׁר לְךָ כֶּתֶר לָעוֹלָם הַבָּא" — kaf = כתר, lamed = לעולם הבא.
//   · Berajot 61a — לֵב מֵבִין ("el corazón entiende").
//   · Otzar Midrashim, Alef Bet de Rabí Akivá (versión 1) §34 — אַל תִּקְרֵי
//     לָמֶד אֶלָּא ל'ב מ'בין ד'עת; el corazón pesa tanto como todos los órganos.
//   · Zohar, Tzav 7:53 (ed. Sulam) — לֵב מֵבִין דַּעַת; Biná mora en el corazón.
//   · Sefer Yetzirá 5 — Lamed es letra SIMPLE (impresa 5:1-2: הו"ז ח"ט י"ל
//     נ"ס ע"צ ק; Gra 5:8: הִמְלִיךְ אוֹת ל' בְּתַשְׁמִישׁ... מֹאזְנַיִם בָּעוֹלָם
//     וְתִשְׁרֵי בַּשָּׁנָה וּמָרָה בַּנֶּפֶשׁ — Libra · Tishrei · vesícula biliar).
//   · Avot 5:21 — בֶּן שְׁלֹשִׁים לַכֹּחַ; Números 4:3 (leviim desde los 30);
//     Génesis 41:46 (Yosef, 30); II Samuel 5:4 (David, 30).
//   · Isaías 43:10 — אַתֶּם עֵדַי... לְמַעַן תֵּדְעוּ... וְתָבִינוּ.
//   · R. Ginsburgh, tabla oficial (inner.org/alefbeit/siglamed): concepto
//     "el anhelo del corazón de internalizar el conocimiento"; significado
//     "aprender; enseñar"; forma "una vav como torre posada sobre una kaf";
//     Libra · Tishrei · vesícula · tacto/intimidad · Efraim · canal Hod→Yesod.
//  Gematrías (calculadas letra por letra, Python):
//    ל = 30 · nombre pleno למד = 30+40+4 = 74 · עד = 70+4 = 74 · דע = 4+70 = 74
//    לב = 30+2 = 32 (los 32 senderos, Sefer Yetzirá 1:1) · kaf+vav = 20+6 = 26 = הוי"ה
//
//  NOTA DEL SOFER — precisiones y descartes:
//  (1) NO se afirma que "el Talmud llama a la lamed torre que vuela": la
//      Guemará habla de Doeg y Ajitofel; la aplicación a la lamed es la
//      primera explicación de Rashi ahí, en nombre de su maestro. Así se
//      presenta, con esa cadena exacta.
//  (2) El notarikon לב מבין דעת es drash (el propio midrash dice אל תקרי);
//      va marcado como tal. La observación bet+lamed = לב tiene anclaje
//      clásico real (Rosh; Kli Yakar) y así se cita — no como "midrash
//      antiguo" genérico.
//  (3) Se declara la diferencia de recensiones del Sefer Yetzirá (impresa
//      vs. Gra); la correspondencia Libra/Tishrei/vesícula es de la Gra 5:8
//      y coincide con la tabla de Ginsburgh.
//  (4) A Ginsburgh solo se le atribuye lo que está en su tabla oficial
//      (siglamed); las páginas viejas inner.org/hebleter están muertas.
//      La igualdad kaf+vav = 26 = הוי"ה es cálculo nuestro sobre SU
//      descripción de la forma, y así se rotula.
//  (5) Descartado: "la lamed representa al Rey de Reyes" y otras frases
//      populares sin folio exacto; no se encontró anclaje verificable.
// ─────────────────────────────────────────────────────────────────────────

export const lamed: LetterData = {
  slug: "lamed",
  letter: "ל",
  nameTranslit: { es: "Lamed", en: "Lamed", fa: "لامِد" },
  nameHe: "לָמֶד",
  value: 30,

  level1: {
    es: "Mira una línea de Torá escrita a mano y la verás enseguida: entre veintidós letras que respetan el techo del renglón, una sola lo atraviesa y sigue subiendo. La Lamed es la letra más alta del alfabeto — la única que se eleva por encima de la línea. Una torre. Y ahora el desconcierto: su nombre no significa 'torre' ni 'altura'. Significa aprender. Y también enseñar — la misma raíz para recibir y para dar. Y hay más: la Torá entera termina con una lamed (la de יִשְׂרָאֵל) y empieza con una bet (la de בְּרֵאשִׁית); léelas juntas y dicen לֵב — corazón. La letra que más sube es la letra del corazón. Antes de seguir, quédate con esa pregunta: ¿de qué le sirve a una torre su altura, si no nace del corazón?",
    en: "Look at a handwritten line of Torah and you will spot it at once: among twenty-two letters that respect the ceiling of the line, only one breaks through and keeps rising. The Lamed is the tallest letter of the alphabet — the only one that ascends above the line. A tower. And now the puzzle: its name does not mean 'tower' or 'height'. It means to learn. And also to teach — one root for receiving and for giving. And there is more: the entire Torah ends with a lamed (of יִשְׂרָאֵל) and begins with a bet (of בְּרֵאשִׁית); read them together and they spell לֵב — heart. The letter that rises highest is the letter of the heart. Before reading on, stay with this question: what good is a tower's height, if it does not grow from the heart?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "לָמֶד viene de la raíz למד, y esa raíz es un milagro de doble filo: en su forma simple (kal) significa aprender — לִלְמֹד, lilmod — y en su forma intensiva (piel) significa enseñar — לְלַמֵּד, lelamed. No son dos palabras: es la misma, conjugada hacia adentro o hacia afuera. La Torá lo muestra en un solo versículo, Deuteronomio 4:10: 'para que aprendan (יִלְמְדוּן) a temerme... y a sus hijos enseñarán (יְלַמֵּדוּן)'. Aprender y enseñar, cuatro palabras de distancia, una sola raíz. Moshé lo repite al abrir su repaso de la Ley: 'y las aprenderéis (וּלְמַדְתֶּם) y cuidaréis de cumplirlas' (Deuteronomio 5:1). Y el salmista lo convierte en súplica: לַמְּדֵנִי חֻקֶּיךָ, 'enséñame Tus estatutos' (Salmos 119:12) — dicho a Dios: el Maestro primero.\n\nLa Lamed es la única letra del alfabeto cuyo nombre es, él mismo, el acto de estudiar. Y es también la preposición ל־, 'hacia': cada vez que el hebreo dice 'hacia ti', 'para él', 'a Jerusalén', lo dice con una lamed. La letra del aprendizaje es la letra de la dirección: aprender es, en su raíz, estar orientado hacia algo que todavía no eres.\n\nY un midrash antiguo le puso al nombre su lectura más honda: אַל תִּקְרֵי לָמֶד — 'no leas Lamed, sino לֵב מֵבִין דַּעַת, un corazón que entiende el conocimiento' (Alef Bet de Rabí Akivá, versión 1, §34). Es notarikon — drash declarado, no etimología: el propio midrash avisa con su 'no leas'. Pero lo que enseña es exacto: en el hebreo bíblico no se aprende con el cerebro; se aprende con el lev. Rav Ginsburgh lo condensa en su tabla: la lamed es 'el anhelo del corazón de internalizar el conocimiento'.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Lamed es el aprendizaje como ley de lo creado. Nada en el mundo está terminado: todo lo vivo recibe, incorpora, se corrige — aprende. Y la lamed-preposición lo dice en la gramática misma de la creación: todo está inclinado hacia (ל־) algo, nada existe en dirección a sí mismo. Un mundo sin lamed sería un mundo de cosas concluidas; el nuestro es un mundo de estudiantes.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Lamed te pregunta cómo aprendes. Se puede acumular conocimiento como quien apila piedras: Doeg lo hizo — trescientas halajot sobre una torre que vuela en el aire — y la Guemará dice de él y de Ajitofel que 'había barro en su corazón' (Jaguigá 15b). Saber no les sirvió de nada, porque el canal entre la cabeza y el lev estaba tapado. La lamed del alma es lo contrario: לֵב מֵבִין דַּעַת, aprender de modo que lo aprendido te cambie. Y su prueba es el piel de la raíz: lo que de verdad aprendiste, tarde o temprano lo enseñas. Lo que nunca sale hacia otro, nunca terminó de entrar en ti.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Lamed señala al Maestro. לַמְּדֵנִי חֻקֶּיךָ — 'enséñame Tus estatutos' — no se le dice a un rabino: se le dice a Dios (Salmos 119:12, y otras ocho veces en ese mismo salmo). La relación primaria entre el Infinito y el alma es, en el lenguaje del Tanaj, la de un melamed con su alumno. Por eso la lamed sube más que todas: el aprendizaje es el único movimiento del alma que no tiene techo, porque su Maestro no lo tiene.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "En el ktav ashurí, la escritura cuadrada de los soferim, la Lamed es la única de las veintidós letras que se eleva por encima de la línea del renglón. Rav Ginsburgh describe su trazo con precisión: 'una vav como torre, posada sobre una kaf' (tabla de inner.org). Abajo, el cuerpo curvo de una kaf — la palma abierta, el receptáculo. Arriba, una vav que despega y rompe el techo del texto. Y aquí el cálculo se vuelve vértigo: kaf (20) + vav (6) = 26 — el valor exacto del Nombre הוי\"ה (10+5+6+5 = 26). La letra del corazón que aspira lleva, escrito en su anatomía, el Nombre inefable. (La igualdad es cálculo nuestro sobre la descripción de Ginsburgh; el sofer la comprueba en dos renglones.)\n\nY sobre esa torre pende una historia con filo. El Talmud cuenta que Doeg —el erudito que traicionó a David— 'contaba trescientas halajot decididas sobre מִגְדָּל הַפּוֹרֵחַ בָּאֲוִיר, una torre que vuela en el aire' (Sanedrín 106b, sobre Isaías 33:18; y Jaguigá 15b: Doeg y Ajitofel plantearon cientos de preguntas sobre ella y no resolvieron una). ¿Qué es esa torre voladora? La primera explicación de Rashi ahí, en nombre de su maestro, es asombrosa: es la lamed — el trazo superior que flota por encima de la letra, por encima del renglón. Trescientas halajot sobre el vuelo de la lamed... y la Guemará concluye que a esos dos sabios no los salvó su saber, porque 'había barro en su corazón' (טִינָא הָיְתָה בְּלִבָּם, Jaguigá 15b). La forma de la lamed es exactamente esa advertencia hecha trazo: una torre que vuela — anclada a un corazón. Si se le quita la kaf de abajo, la torre de la lamed es solo una vav suelta en el aire: erudición de Doeg.",
    },
    partes: [
      {
        label: { es: "La torre (la vav que asciende)", en: "The tower (the ascending vav)", fa: "برج (واو بالارونده)" },
        significado: {
          es: "El cuello que sube y atraviesa el techo del renglón: una vav lanzada hacia arriba. Es el único trazo del alfabeto que vive por encima de la línea — el anhelo, la aspiración, el 'hacia' (ל־) hecho tinta. Rashi (Sanedrín 106b, en nombre de su maestro) reconoce en este trazo superior la 'torre que vuela en el aire' de la Guemará. Volar está permitido; lo que decide todo es desde dónde despegas.",
        },
        svgPathId: "lamed-tower",
      },
      {
        label: { es: "El cuerpo (la kaf que recibe)", en: "The body (the receiving kaf)", fa: "بدنه (کاف پذیرنده)" },
        significado: {
          es: "La base curva sobre la que la torre se posa: una kaf, la palma abierta. Es el receptáculo — el corazón que recibe lo aprendido antes de que la torre lo eleve. Sin ella, la vav de arriba es la torre de Doeg: altura sin lev. Con ella, kaf (20) + vav (6) suman 26, el valor del Nombre הוי\"ה: la aspiración que nace de un corazón receptivo carga el Nombre entero.",
        },
        svgPathId: "lamed-body",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Lamed enseña cómo crece lo real: desde un receptáculo. Todo lo que sube — un árbol, una ciudad, una civilización — sube desde algo que primero supo recibir: raíz, cimiento, tradición. La creación entera es kaf abajo y vav arriba. Lo que intenta solo volar, sin base que reciba, es la torre flotante de la Guemará: preguntas por cientos, respuestas ninguna.",
    },
    almas: {
      es: "En el alma, tú eres esta forma cada vez que estudias de verdad. Hay una parte tuya que debe ser kaf: abierta, cóncava, dispuesta a recibir lo que aún no entiendes. Y hay una parte que debe ser torre: la que no se conforma, la que pregunta hacia arriba, la que rompe el techo de lo que ya sabías. La Lamed te prohíbe elegir una sola. Recibir sin aspirar es estancarse; aspirar sin recibir es Doeg. El corazón que anhela — así llama Ginsburgh a esta letra — es las dos cosas en un solo trazo.",
    },
    divinidad: {
      es: "En lo divino, contempla el 26 escondido en el trazo: la kaf y la vav de la Lamed suman el valor del Nombre. La única letra que se eleva por encima de la línea —por encima de lo que el renglón de este mundo puede contener— lleva dentro precisamente a הוי\"ה. Lo que está por encima de la línea no se alcanza rompiendo la escritura: se alcanza cuando el corazón de abajo y el anhelo de arriba se vuelven una sola letra.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 30,
    guematriaForma: {
      es: "ל = 30 · nombre pleno למד = 30 + 40 + 4 = 74 = עד (70+4, 'testigo') = דע (4+70, '¡conoce!') · la forma: kaf (20) + vav (6) = 26 = הוי\"ה",
    },
    mundos: {
      es: "30 es, en la Mishná, la edad de la fuerza: בֶּן שְׁלֹשִׁים לַכֹּחַ — 'a los treinta, el vigor' (Avot 5:21). Y el Tanaj lo confirma con biografías: los leviim entraban al servicio del Mishkán 'de treinta años para arriba' (Números 4:3); Yosef tenía treinta al pararse ante el Faraón (Génesis 41:46); David tenía treinta al ser coronado (II Samuel 5:4). Treinta no es la edad de aprender — es la edad en que lo aprendido se vuelve fuerza para cargar algo: un santuario, un imperio, un reino. La lamed vale 30 porque el aprendizaje no madura en saber: madura en hombros.",
    },
    almas: {
      es: "Mira la escala de Avot entera: a los cinco, Escritura; a los diez, Mishná; a los quince, Guemará... y solo a los treinta, כֹּחַ, la fuerza. El alma-lamed entiende el orden: hay veinticinco años de kaf —de recibir— antes de que la torre pueda cargar peso. Nuestra época quiere la fuerza sin la espera y la altura sin el receptáculo; la lamed, letra 30, te dice que la fuerza es un fruto tardío del estudio, y que no hay atajo que no termine en torre flotante.",
    },
    divinidad: {
      es: "El nombre pleno de la letra, למד, suma 74. Y 74 es עד, 'testigo' — y también דע, '¡conoce!', las mismas dos letras en espejo. El cálculo es nuestro; el versículo que los une es de Isaías, y es exacto: אַתֶּם עֵדַי... לְמַעַן תֵּדְעוּ וְתַאֲמִינוּ לִי וְתָבִינוּ — 'vosotros sois Mis testigos... para que conozcáis y Me creáis y entendáis' (Isaías 43:10). Testigo y conocer, עד y דע, en una sola frase. Ese es el término del aprendizaje según la lamed: no un erudito — un testigo. Quien de verdad aprendió algo del Infinito ya no lo repite: lo atestigua con la vida.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "Aprender y enseñar: una sola raíz, un solo versículo" },
        fuente: {
          es: "Deuteronomio 4:10 — 'אֲשֶׁר יִלְמְדוּן לְיִרְאָה אֹתִי... וְאֶת בְּנֵיהֶם יְלַמֵּדוּן': aprenderán (kal) y enseñarán (piel), la raíz למד dos veces en el mismo aliento del Sinaí. Cf. Deuteronomio 5:1 (וּלְמַדְתֶּם) y Salmos 119:12 (לַמְּדֵנִי חֻקֶּיךָ).",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La última letra de la Torá + la primera = corazón" },
        fuente: {
          es: "Deuteronomio 34:12 — la Torá termina en יִשְׂרָאֵל, con lamed; Génesis 1:1 — empieza en בְּרֵאשִׁית, con bet. Juntas: לֵב. El anclaje es clásico: Rosh sobre la Torá, Génesis 1:1:2 — 'empieza con bet y termina con lamed: estos son los 32 (ל\"ב) recintos del corazón; cuida la Torá y ella cuidará tu corazón'. Cf. Kli Yakar sobre Deuteronomio 34:12 (בִּי בּוֹ בָּהּ · לִי לוֹ לָהּ).",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "La torre que vuela en el aire" },
        fuente: {
          es: "Sanedrín 106b — R. Yitzjak, sobre Isaías 33:18: Doeg 'contaba trescientas halajot decididas sobre מִגְדָּל הַפּוֹרֵחַ בָּאֲוִיר'; y Rebí: Doeg y Ajitofel plantearon cuatrocientas preguntas sobre ella (cf. Jaguigá 15b: trescientas, R. Amí). Rashi ahí, primera explicación en nombre de su maestro: la 'torre' es el trazo superior de la LAMED. El contexto es una advertencia: tanta altura, y 'había barro en su corazón' (Jaguigá 15b).",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Kaf-Lamed: una corona para el Mundo Venidero" },
        fuente: {
          es: "Shabat 104a — los niños del bet midrash leyeron el alfabeto entero como camino: 'ז\"ח ט\"י כ\"ל — si obras así, el Santo te nutre (זן), te agracia (חן), te hace bien (מטיב), te da heredad (ירושה) y te ata una corona (כ) para el Mundo Venidero (ל)'. La lamed es la última palabra de la serie: לָעוֹלָם הַבָּא — el estudio desemboca más allá de este mundo.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El corazón entiende" },
        fuente: {
          es: "Berajot 61a — 'כְּלָיוֹת יוֹעֲצוֹת, לֵב מֵבִין: los riñones aconsejan, el corazón ENTIENDE'. Para los Sabios el órgano del entendimiento no es la cabeza: es el lev. La letra del aprender es la letra del corazón porque, en la fisiología del Talmud, son el mismo lugar.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "No leas 'Lamed': lee 'un corazón que entiende el conocimiento'" },
        fuente: {
          es: "Alef Bet de Rabí Akivá, versión 1, §34 (Otzar Midrashim) — 'אַל תִּקְרֵי לָמֶד אֶלָּא לֵב מֵבִין דַּעַת', y sigue: el corazón pesa tanto como todos los órganos juntos — el corazón ve (Eclesiastés 1:16), oye (I Reyes 3:9), habla, grita, camina, escribe (Proverbios 3:3)... Todo lo que el hombre hace, su lev lo hace primero. (Notarikon: drash declarado por el propio midrash.)",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Lamed: Libra, Tishrei, la balanza del año" },
        fuente: {
          es: "Sefer Yetzirá 5 — la Lamed es una de las doce letras SIMPLES. En la recensión del Gra (5:8): 'הִמְלִיךְ אוֹת ל' בְּתַשְׁמִישׁ... וְצָר בָּהֶם מֹאזְנַיִם בָּעוֹלָם וְתִשְׁרֵי בַּשָּׁנָה וּמָרָה בַּנֶּפֶשׁ' — Libra (מֹאזְנַיִם, la balanza) en el mundo, Tishrei en el año, la vesícula en el cuerpo. La letra del aprendizaje rige el mes en que el mundo entero es pesado: Rosh HaShaná y Yom Kipur caen bajo la balanza de la lamed. (La recensión impresa, 5:1-2, da la misma lista de simples con variantes de orden; se declara la diferencia.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Lev = 32: los treinta y dos senderos de la sabiduría" },
        fuente: {
          es: "לֵב = 30 + 2 = 32 (cálculo nuestro). Y Sefer Yetzirá abre exactamente ahí (1:1): 'בִּשְׁלֹשִׁים וּשְׁתַּיִם נְתִיבוֹת פְּלִיאוֹת חָכְמָה — con treinta y dos senderos maravillosos de sabiduría grabó Yah... y creó Su mundo'. La Torá que va de la bet a la lamed ES un lev de 32 senderos; el Rosh (Génesis 1:1:2) los llama los 32 recintos del corazón.",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "Biná mora en el corazón" },
        fuente: {
          es: "Zohar, Tzav 7:53 (ed. Sulam; Vilna 28b-29a) — 'עָשָׁן מִבִּינָה דְּאִיהוּ בְּלִבָּא... הַלֵּב מֵבִין... לֵב מֵבִין דַּעַת': el humo del altar sube desde Biná, que mora en el corazón, hacia Jojmá que es como el cerebro — y Daat, la columna del medio, los une. El ascenso de la lamed sobre el renglón es ese humo: lo que el corazón entendió, subiendo a encontrarse con la sabiduría.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "El corazón que anhela: la contemplación de Ginsburgh" },
        fuente: {
          es: "R. Yitzjak Ginsburgh, 'The Hebrew Letters' (tabla en inner.org/alefbeit/siglamed) — la Lamed es 'el anhelo del corazón de internalizar el conocimiento' (the yearning of the heart to internalize knowledge); su forma, 'una vav como torre posada sobre una kaf'; su significado, 'aprender; enseñar'; su arquetipo, Efraim; su canal, de Hod a Yesod. El aprendizaje jasídico no es adquisición: es anhelo — el corazón estirándose por encima de su propio renglón.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Deuteronomio 4:10 — יִלְמְדוּן (aprenderán) y יְלַמֵּדוּן (enseñarán): la raíz למד en sus dos direcciones, en un solo versículo." },
    { es: "Deuteronomio 5:1 — וּלְמַדְתֶּם אֹתָם; Salmos 119:12 — לַמְּדֵנִי חֻקֶּיךָ (dicho a Dios)." },
    { es: "Génesis 1:1 (la bet inicial de בְּרֵאשִׁית) y Deuteronomio 34:12 (la lamed final de יִשְׂרָאֵל): los dos extremos de la Torá." },
    { es: "Rosh sobre la Torá, Génesis 1:1:2 (Hadar Zekenim) — 'la Torá empieza con bet y termina con lamed: los 32 recintos del corazón'." },
    { es: "Kli Yakar sobre Deuteronomio 34:12 — שָׁמַעְתִּי אוֹמְרִים: bet y lamed forman con las letras del Nombre las palabras בִּי בּוֹ בָּהּ, לִי לוֹ לָהּ." },
    { es: "Sanedrín 106b — Doeg y las 300 halajot / 400 preguntas sobre מגדל הפורח באויר (sobre Isaías 33:18); Jaguigá 15b — ídem, y טִינָא הָיְתָה בְּלִבָּם ('había barro en su corazón')." },
    { es: "Rashi sobre Sanedrín 106b, s.v. במגדל הפורח באויר — primera explicación, 'לשון מ\"ר מפי השמועה': la torre que vuela es el trazo superior de la lamed (trae además otras tres explicaciones)." },
    { es: "Shabat 104a — la serie ז\"ח ט\"י כ\"ל: '...וקושר לך כתר לעולם הבא' (kaf = corona, lamed = para el Mundo Venidero)." },
    { es: "Berajot 61a — כליות יועצות, לב מבין: el corazón entiende." },
    { es: "Alef Bet de Rabí Akivá, versión 1, §34 (Otzar Midrashim) — אל תקרי למד אלא לב מבין דעת; el corazón equivale a todos los órganos." },
    { es: "Zohar, Tzav 7:53 (ed. Sulam) — לב מבין דעת: Biná en el corazón, Jojmá como el cerebro, Daat la columna del medio." },
    { es: "Sefer Yetzirá 5:1-2 (recensión impresa) y 5:8 (recensión del Gra) — Lamed, letra simple: תשמיש · Libra (מאזנים) · Tishrei · vesícula (מרה). Las recensiones difieren en orden y detalle; la correspondencia citada es de la Gra y coincide con la tabla de Ginsburgh." },
    { es: "Avot 5:21 — בן שלשים לכח; Números 4:3 — los leviim sirven desde los 30; Génesis 41:46 — Yosef ante el Faraón a los 30; II Samuel 5:4 — David corona a los 30." },
    { es: "Isaías 43:10 — אתם עדי... למען תדעו... ותבינו: testigo (עד) y conocer (דע) en un mismo versículo." },
    { es: "R. Yitzjak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' — tabla oficial de la Lamed (inner.org/alefbeit/siglamed): concepto, significado, forma (vav-torre sobre kaf), Libra/Tishrei/vesícula, Efraim, canal Hod→Yesod." },
    { es: "Gematrías calculadas: ל = 30 · למד = 30+40+4 = 74 = עד (70+4) = דע (4+70) · לב = 30+2 = 32 · kaf+vav = 20+6 = 26 = הוי\"ה (10+5+6+5)." },
    { es: "Nota de precisión: la lectura 'torre que vuela = lamed' es de Rashi en nombre de su maestro, no el sentido único de la Guemará (que habla de Doeg y Ajitofel). El notarikon לב מבין דעת es drash declarado (אל תקרי). Las igualdades 74 = עד = דע y kaf+vav = 26 son cálculo aritmético nuestro; los versículos que las acompañan son citas exactas." },
  ],
};
