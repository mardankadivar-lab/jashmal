import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — אֶת־בִּרְכָתִי · El hermano que tomó ocho veces
//  Yaakov, Esav y el expediente que se cierra en Vayishlaj.
//  Serie «Parashá» · Vayishlaj (Gn 32:4–36:43).
//  Shabat 18 de Kislev de 5787 = 28 de noviembre de 2026.
//
//  CONTENIDO ESCRITO Y VERIFICADO POR EL SOFER (editor-erudito), 23-nov-2026.
//  Cotejado por la gerencia el mismo día (palabras repetidas con el código del
//  repo; Mishná Bavá Batrá 6:8 directamente en fuente).
//  Fuente de montaje:
//    ~/jashmal-produccion/vayishlaj-porcion-esav/VAYISHLAJ-PORCION-DE-ESAV.md
//    (líneas 1–1062).
//
//  FRONTERA DURA RESPETADA: todo lo que en ese archivo va DESPUÉS de la línea
//  1063 —«SECCIÓN DE TRABAJO — NO PUBLICAR»: veredictos fuente por fuente, lo
//  que no se pudo cotejar, lagunas y riesgos— NO se montó, no aparece en esta
//  página, no va en nota al pie, ni en <details>, ni en comentario de código.
//
//  Infraestructura SOLO montó. No se añadió ni una gematría, ni una cita, ni un
//  folio, ni una fuente, ni una frase de análisis que no estuviera ya en el
//  markdown verificado.
//
//  GUARDARRAÍLES OBLIGATORIOS (del propio markdown del Sofer; si alguien edita
//  esta página, tiene que seguir respetándolos):
//   1. בכרה = ברכה = 227 es un ANAGRAMA, dato del hebreo, y va declarado como
//      lectura nuestra: NO hay comentarista clásico anclado a esa observación.
//   2. «Yaakov está devolviendo la bendición» es LECTURA NUESTRA. El Alshij
//      usa la conexión para SEPARAR las dos bendiciones, y de hecho la niega.
//      Lo que es dato es la gramática: לָקַח (27:36) → קַח · וַיִּקָּח (33:11).
//   3. La costura entre «Lea era la porción de Esav» (Bavá Batrá 123a) y «Lea
//      ocupa la parcela» (Sotá 13a) es LECTURA NUESTRA. Ningún clásico cotejado
//      las une. Las dos piezas por separado son grado A.
//   4. El alegato del nicho sobrante lo dice ESAV, no la guemará. Rashi
//      respalda los ocho nichos, NUNCA que el nicho sobrante le perteneciera.
//   5. שְׁבִירַת הַכֵּלִים es terminología LURIANA (Etz Jaim), no del Zohar. El Zohar
//      dice «murieron» y «no se sostuvieron».
//   6. bitul / bitul hayesh es vocabulario de JASIDUT (Jabad), no «la Cabalá».
//      Y el Tanya, en esa carta, NO usa la palabra בִּטּוּל.
//   7. NO decir que el katonti libera a Yaakov del miedo: el propio Tanya dice
//      que katonti es la explicación de su temor, y Gn 32:12 lo escribe.
//   8. La palabra בֵּרוּר aplicada a las ocho tomas es NUESTRA, no del Arizal ni
//      de Izhbitza.
//   9. «Entonces Yaakov cargó con las dos» (regalo + pagaré) es un COROLARIO de
//      un paso sobre Rashi a Gn 36:7, no una cita.
//
//  Hero en modo "par": בְּכֹרָה y בְּרָכָה, las mismas cuatro letras, 227 y 227.
//
//  Farsi: PENDIENTE por regla de Mardan (no se produce farsi salvo que lo pida).
//  Los campos …Fa del hero llevan el español como respaldo —mismo precedente que
//  /misterio/toldot-palabra y /misterio/sefer-yetzira—; en el catálogo
//  (lib/content/misterios.ts) van VACÍOS para que tri() marque la traducción
//  pendiente. Inglés: omitido a propósito.
// ════════════════════════════════════════════════════════════════════════════

const TITULO = "El hermano que tomó ocho veces";
const SERIE =
  "Serie «Parashá» · Vayishlaj — el expediente que se cierra";
const GANCHO =
  "Si uno lee la vida de Yaakov seguida, sin devoción y sin prisa, aparece un patrón que incomoda: Yaakov siempre se queda con lo de su hermano. La primogenitura, la bendición, las ropas, la mujer, la tierra, el nombre, la tumba, la realeza. Una vez es una historia. Ocho veces es un patrón, y un patrón pide explicación.";

export const data: EstudioData = {
  slug: "porcion-de-esav",

  hero: {
    serielabel: SERIE,
    serielabelFa: SERIE,
    he: "אֶת־בִּרְכָתִי",
    titulo: TITULO,
    tituloFa: TITULO,
    ganchoEs: GANCHO,
    ganchoFa: GANCHO,
    par: {
      a: { he: "בְּכֹרָה", rom: "bejorá · primogenitura" },
      b: { he: "בְּרָכָה", rom: "berajá · bendición" },
      valor: "227",
    },
    fecha:
      "Shabat · 18 de Kislev 5787 · 28 nov 2026 — parashat Vayishlaj (Gn 32:4–36:43)",
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── Preludio — la apertura del estudio (no es sección) ──────────────────────
  preludio: [
    { head: "La pregunta que abre el estudio" },
    {
      p: `Hay una pregunta que no se puede hacer en voz baja. Si uno lee la vida de Yaakov seguida, sin devoción y sin prisa, aparece un patrón que incomoda: Yaakov siempre se queda con lo de su hermano. La primogenitura, la bendición, las ropas, la mujer, la tierra, el nombre, la tumba, la realeza. Una vez es una historia. Ocho veces es un patrón, y un patrón pide explicación.`,
    },
    {
      p: `Este estudio hace el rastreo completo, fuente por fuente. Y hace también lo contrario, que es la mitad que nadie cuenta: lo que Yaakov no tomó, lo que devolvió y lo que pagó. Porque el hallazgo no está en la lista de las tomas. Está en el lugar donde la lista se cierra.`,
    },
    { head: "Por qué Vayishlaj, si las tomas pasan en Toldot y Vayetzé" },
    {
      p: `Casi ninguna de las tomas ocurre en esta parashá. La bejorá se vende en Toldot. La bendición se obtiene en Toldot. Lea se recibe en Vayetzé. Entonces, ¿por qué anclar el estudio aquí?`,
    },
    {
      p: `Porque Vayishlaj no es donde se toma: es donde se liquida. Siete cosas pasan en esta parashá y solo en esta:`,
    },
    {
      filas: [
        {
          n: "1",
          donde: "Gn 32:11",
          he: "קָטֹנְתִּי",
          titulo: "Yaakov se declara pequeño",
          texto: `Dice en primera persona la etiqueta con la que la Torá lo venía identificando mientras tomaba: הַקָּטָן, «el pequeño».`,
        },
        {
          n: "2",
          donde: "Gn 33:4",
          titulo: "Los dos hermanos se ven cara a cara y se abrazan",
          texto: `Es el único encuentro adulto de los dos en toda la Torá.`,
        },
        {
          n: "3",
          donde: "Gn 32:29",
          titulo: "El nombre cambia",
          texto: `Y cambia con una fórmula que habla precisamente de cómo se obtuvieron las bendiciones.`,
        },
        {
          n: "4",
          titulo: "El ángel de Esav concede las bendiciones",
          texto: `Literalmente, según Rashi. La toma hecha con engaño queda ratificada por la parte contraria.`,
        },
        {
          n: "5",
          donde: "Gn 33:11",
          titulo: "Yaakov le dice a Esav la palabra «mi bendición»",
          texto: `La misma palabra con la que Esav lo había denunciado.`,
        },
        {
          n: "6",
          donde: "Gn 36:6-8",
          titulo: "Los territorios se separan",
          texto: `Esav sale de Canaán al monte Seir.`,
        },
        {
          n: "7",
          donde: "Gn 36",
          titulo: "La Torá escribe las toldot de Esav y los reyes de Edom",
          texto: `Y la Torá cierra una línea escribiéndole la genealogía. Es su manera de firmar un expediente.`,
        },
      ],
    },
    {
      p: `Toldot abre la cuenta. Vayetzé la engorda. Vayishlaj la cierra, la firma y la archiva.`,
    },
  ],

  // ── 1. מִלִּים חוֹזְרוֹת — antes de la traducción ────────────────────────────
  antesTargum: [
    {
      he: "מִלִּים חוֹזְרוֹת",
      title: "Las palabras que se repiten",
      bloques: [
        {
          p: `Antes de traducir, se mira dónde insiste el texto. Esta cuenta la hace el código del sitio sobre el capítulo entero, no sobre el versículo abierto, y se copia tal cual: no la recalculé, no la redondeé, no le añadí palabras.`,
        },
        {
          conteos: [
            {
              titulo: "Génesis 27 — el capítulo de la bendición",
              resumen: "640 palabras, 44 pasan el umbral",
              palabras: [
                { he: "וַיֹּאמֶר", veces: "34 veces", variantes: "ותאמר, לאמר, אמרה" },
                { he: "בְּנִי", veces: "25 veces", variantes: "בנה, בנו, בנך" },
                { he: "עֵשָׂו", veces: "21 veces", variantes: "ועשו, לעשו" },
                { he: "אָבִיו", veces: "17 veces", variantes: "לאביו, לאביך, אביך" },
                { he: "יַעֲקֹב", veces: "15 veces", variantes: "ליעקב" },
                { he: "אָחִיךָ", veces: "13 veces", variantes: "אחי, אחיו, לאחיך" },
                { he: "יִצְחָק", veces: "13 veces" },
                {
                  he: "תְּבָרֶכְךָ",
                  veces: "13 veces",
                  destacada: true,
                  variantes:
                    "תברכני, ויברכהו, ברכני, ואברככה, יברכך, ומברכיך, לברך, ואברכהו",
                },
                {
                  he: "וַיָּבֵא",
                  veces: "13 veces",
                  variantes: "בא, והביאה, להביא, הביאה, והבאת, והבאתי, תבוא",
                },
                {
                  he: "וַיִּקַּח",
                  veces: "9 veces",
                  destacada: true,
                  variantes: "ויקח, וקח, קח, ותקח, ולקחתיך",
                },
              ],
            },
            {
              titulo: "Génesis 32 — la lucha",
              resumen: "453 palabras, 35 pasan el umbral",
              palabras: [
                { he: "וַיֹּאמֶר", veces: "24 veces" },
                { he: "יַעֲקֹב", veces: "16 veces" },
                {
                  he: "פָנָיו",
                  veces: "10 veces",
                  destacada: true,
                  variantes: "לפני, פנים, לפניו, לפניך, פני",
                },
                { he: "עֵשָׂו", veces: "9 veces" },
                {
                  he: "עַבְדְּךָ",
                  veces: "7 veces",
                  destacada: true,
                  variantes: "עבדיו, ועבד, לעבדך",
                },
                { he: "עָבַרְתִּי", veces: "7 veces" },
                { he: "מַחֲנוֹת", veces: "6 veces" },
                { he: "אֱלֹהִים", veces: "6 veces" },
                { he: "אָחִיו", veces: "5 veces" },
                { he: "יְרֵכוֹ", veces: "5 veces" },
              ],
            },
            {
              titulo: "Génesis 33 — el encuentro",
              resumen: "268 palabras, 18 pasan el umbral",
              palabras: [
                { he: "וַיֹּאמֶר", veces: "10 veces" },
                { he: "הַיְלָדִים", veces: "9 veces" },
                {
                  he: "פְּנֵי",
                  veces: "6 veces",
                  destacada: true,
                  variantes: "לפני, לפניהם, פניך",
                },
                { he: "עֵינָיו", veces: "5 veces" },
                { he: "עֵשָׂו", veces: "5 veces" },
                { he: "בָּא", veces: "5 veces" },
                { he: "אֲדֹנִי", veces: "5 veces", destacada: true },
                { he: "יַעֲקֹב", veces: "4 veces" },
                { he: "אֱלֹהִים", veces: "4 veces" },
                { he: "גִּשְׁתּוֹ", veces: "4 veces" },
              ],
            },
          ],
        },
        {
          etiqueta: "Lea esos tres bloques juntos y el estudio ya está dicho.",
          p: `En el capítulo de la bendición insisten bendecir (13) y tomar (9). En el capítulo de la lucha insisten rostro (10) y tu siervo (7). En el capítulo del encuentro insisten rostro (6) y mi señor (5).`,
        },
        {
          p: `El capítulo donde Yaakov toma cuenta las veces que toma. Los capítulos donde Yaakov devuelve cuentan las veces que se llama siervo y mira un rostro. El vocabulario cambió de lado.`,
        },
      ],
    },
  ],

  // ── 2. תַּרְגּוּם ─────────────────────────────────────────────────────────────
  targum: {
    citas: [],
    parrafos: [],
    bloques: [
      { head: "El versículo que es la columna vertebral de todo" },
      {
        p: `No hace falta que nosotros acusemos a Yaakov. Lo acusa Esav, en boca propia, y lleva la cuenta.`,
      },
      {
        cita: {
          label: "Génesis 27:36 — habla Esav",
          he: "וַיֹּ֡אמֶר הֲכִי֩ קָרָ֨א שְׁמ֜וֹ יַעֲקֹ֗ב וַֽיַּעְקְבֵ֙נִי֙ זֶ֣ה פַעֲמַ֔יִם אֶת־בְּכֹרָתִ֣י לָקָ֔ח וְהִנֵּ֥ה עַתָּ֖ה לָקַ֣ח בִּרְכָתִ֑י וַיֹּאמַ֕ר הֲלֹא־אָצַ֥לְתָּ לִּ֖י בְּרָכָֽה׃",
          es: "Y dijo: ¿no es que llamaron su nombre Yaakov? Pues me ha suplantado estas dos veces: mi primogenitura tomó, y he aquí que ahora tomó mi bendición. Y dijo: ¿no apartaste para mí una bendición?",
          source: "Génesis 27:36",
        },
      },
      {
        p: `Hay tres cosas en este versículo y las tres son la arquitectura del estudio.`,
      },
      {
        etiqueta: "Primera: Esav cuenta.",
        p: `זֶה פַעֲמַיִם, zé faamáyim, «estas dos veces». No dice «me traicionó». Dice un número. Esav es el primer contable de este expediente, y empieza la cuenta en dos.`,
      },
      {
        etiqueta:
          "Segunda: el verbo es לקח, lakaj, «tomar», y aparece dos veces en un solo versículo.",
        p: `«Mi primogenitura tomó» y «tomó mi bendición» — אֶת־בְּכֹרָתִי לָקָח, לָקַח בִּרְכָתִי. No dice «robó» (גזל), no dice «engañó» (רמה); para eso tiene otro verbo, y lo usa unas palabras antes, cuando dice que su hermano lo suplantó, וַיַּעְקְבֵנִי. Para las dos cosas que le quitaron usa el verbo más neutro que tiene el hebreo: tomar. Guárdalo, porque ese verbo va a volver, en la boca del otro hermano, seis capítulos más adelante.`,
      },
      {
        etiqueta: "Tercera: las dos cosas tomadas son la misma palabra.",
        p: `Mira las letras. בְּכֹרָה (bejorá, primogenitura) se escribe ב · כ · ר · ה: ב=2 + כ=20 + ר=200 + ה=5 = 227. בְּרָכָה (berajá, bendición) se escribe ב · ר · כ · ה: ב=2 + ר=200 + כ=20 + ה=5 = 227.`,
      },
      {
        p: `Son las mismas cuatro letras. בכרה y ברכה se distinguen solo por el orden de la כ y la ר. Son anagramas, y por eso la cuenta es idéntica: 227 y 227. Esto no es una curiosidad numérica, porque no depende de ningún sistema de cálculo: se ve a simple vista. Las dos cosas que Esav dice que le tomaron son una sola cosa escrita de dos maneras. Vendió una por un plato de lentejas y perdió la otra por un plato de guisado. Es el mismo plato.`,
      },
      {
        nota: `El anagrama es un hecho del hebreo y no una interpretación: son las mismas cuatro letras en otro orden, y la suma sale igual porque sumar no depende del orden. Lo que no hay es un comentarista clásico que lo señale. Va, por tanto, como observación de Jashmal sobre un dato que cualquiera puede comprobar.`,
      },
      { head: "El versículo que es el hallazgo" },
      {
        p: `Seis capítulos después, en nuestra parashá, Yaakov le habla a Esav. Y dice esto:`,
      },
      {
        cita: {
          label: "Génesis 33:11 — habla Yaakov",
          he: "קַח־נָ֤א אֶת־בִּרְכָתִי֙ אֲשֶׁ֣ר הֻבָ֣את לָ֔ךְ כִּֽי־חַנַּ֥נִי אֱלֹהִ֖ים וְכִ֣י יֶשׁ־לִי־כֹ֑ל וַיִּפְצַר־בּ֖וֹ וַיִּקָּֽח׃",
          es: "Toma, te ruego, mi bendición que te fue traída, porque Dios me ha favorecido y porque tengo todo. Y le insistió, y tomó.",
          source: "Génesis 33:11",
        },
      },
      { p: `Pon los dos versículos uno sobre otro.` },
      {
        filasTitulo: "Génesis 27:36, en boca de Esav · Génesis 33:11, en boca de Yaakov",
        filas: [
          {
            titulo: "El verbo",
            texto: `En 27:36, לָקַח, «tomó». En 33:11, קַח, «toma» (imperativo), y el versículo cierra con וַיִּקָּח, «y tomó».`,
          },
          {
            titulo: "El objeto",
            texto: `En 27:36 el hermano acusa: «mi primogenitura tomó», «tomó mi bendición» — אֶת־בְּכֹרָתִי, לָקַח בִּרְכָתִי. En 33:11 Yaakov ofrece: «mi bendición» — אֶת־בִּרְכָתִי.`,
          },
          {
            titulo: "Quién toma",
            texto: `En 27:36, Yaakov, sin que Esav lo sepa. En 33:11, Esav, porque Yaakov se lo pide.`,
          },
        ],
      },
      {
        p: `Es la misma raíz, el mismo sustantivo y la misma construcción con את. Yaakov toma la estructura exacta de la acusación de su hermano y la invierte: el verbo que lo condenaba pasa a imperativo, y el que antes tomó a escondidas ahora es el que ruega que le tomen.`,
      },
      {
        p: `Y el versículo termina con la palabra del delito: וַיִּקָּח — «y tomó». La última vez que ese verbo se dijo entre estos dos hermanos, lo dijo Esav para acusar. Aquí lo dice la Torá para contar que Esav aceptó.`,
      },
      { head: "Y hay un segundo par, que es el que cierra el gesto" },
      {
        p: `El verbo no es lo único que viaja de un versículo al otro. La bendición que Yitzjak le dio a Yaakov creyendo que era Esav dice, en su cláusula central, esto:`,
      },
      {
        cita: {
          label: "Génesis 27:29",
          he: "הֱוֵ֤ה גְבִיר֙ לְאַחֶ֔יךָ וְיִשְׁתַּחֲוּ֥וּ לְךָ֖ בְּנֵ֣י אִמֶּ֑ךָ",
          es: "Sé señor de tus hermanos, y que se inclinen ante ti los hijos de tu madre.",
          source: "Génesis 27:29",
        },
      },
      {
        p: `Dos palabras cargan la cláusula. גְבִיר, «señor». Y וְיִשְׁתַּחֲוּוּ, de la raíz ש־ח־ה, «inclinarse». Eso es lo que la bendición tomada le concede: el señorío sobre el hermano, y el hermano inclinado.`,
      },
      {
        p: `Ahora mira la primera cosa que hace Yaakov cuando por fin se encuentra con el hijo de su madre, en nuestra parashá:`,
      },
      {
        cita: {
          label: "Génesis 33:3",
          he: "וְה֖וּא עָבַ֣ר לִפְנֵיהֶ֑ם וַיִּשְׁתַּ֤חוּ אַ֨רְצָה֙ שֶׁ֣בַע פְּעָמִ֔ים עַד־גִּשְׁתּ֖וֹ עַד־אָחִֽיו׃",
          es: "Y él pasó delante de ellos y se inclinó a tierra siete veces, hasta acercarse a su hermano.",
          source: "Génesis 33:3",
        },
      },
      {
        p: `Es la misma raíz, ש־ח־ה, y está del otro lado. En 27:29 el hermano se inclina ante Yaakov; en 33:3 Yaakov se inclina ante el hermano, siete veces, y la Torá se toma el trabajo de contar las veces. Y el recuento de las palabras que la parashá repite dice el resto: siete veces «tu siervo» en Génesis 32, cinco veces «mi señor» en Génesis 33. גְבִיר (gvir), «señor», era lo que la bendición le había dado a él; אֲדֹנִי (adoní), «mi señor», es lo que ahora le dice al otro.`,
      },
      {
        p: `De modo que los dos versículos de la bendición robada tienen, cada uno, su contraversículo en Vayishlaj. El «tomó» de 27:36 — לָקַח — vuelve como «toma», קַח, en 33:11. Y el «señor» de 27:29 — גְבִיר — vuelve como «mi señor», אֲדֹנִי, en boca del que había sido hecho señor. No es una inversión: son dos, y las dos caben en una sola parashá.`,
      },
      { head: "Las palabras que la parashá no deja de repetir" },
      {
        p: `Y esa palabra, «mi bendición» —בִּרְכָתִי, birjatí, con su puntuado exacto, que no es el del verbo בֵּרַכְתִּי, «bendije»— aparece en toda la Torá exactamente tres veces. Una en boca de Dios (Lv 25:21, sobre el año sabático). Y dos dentro de la historia de Yaakov y Esav: Génesis 27:36, en boca del hermano al que se la tomaron, y Génesis 33:11, en boca del hermano que la tomó.`,
      },
      {
        p: `Dos veces en toda la Torá, una por cada hermano. La palabra «mi bendición» es, en el vocabulario de la Torá, una palabra que solo se dicen estos dos.`,
      },
      {
        nota: `Principio de la casa: el modelo propone, el código comprueba. Lo que el código no dice —y hay que decirlo— es que esta cuenta no prueba la interpretación. Prueba el dato.`,
      },
    ],
  },

  // ── 3. הַמַּפָּה y 4. קָטֹנְתִּי — tras la traducción ─────────────────────────
  trasTargum: [
    {
      he: "הַמַּפָּה",
      title: "El mapa de las tomas",
      bloques: [
        {
          p: `Aquí está el rastreo completo, del vientre al fin de los días. Cada línea lleva al pie el lugar exacto donde se puede ir a leerla.`,
        },
        {
          filas: [
            {
              n: "0",
              donde: "Gn 25:22-26",
              titulo: "La precedencia en la formación",
              texto: `No es una toma: es el fundamento de todas. El midrash dice que la primera gota era de Yaakov y que Esav salió delante como el bañero que enjuaga la casa de baños antes de bañar al hijo del rey.`,
              fuente: "Bereshit Rabá 63:8 · Rashi a Gn 25:26",
            },
            {
              n: "1",
              donde: "Gn 25:29-34",
              titulo: "La primogenitura (בְּכֹרָה)",
              texto: `Comprada por un guisado de lentejas, con juramento.`,
              fuente: "Texto · Bavá Batrá 16b",
            },
            {
              n: "2",
              donde: "Gn 25:33",
              titulo: "El servicio de los sacrificios",
              texto: `Es lo que la primogenitura contenía antes del Mishkán. El midrash dice por qué Yaakov «dio su alma» por ella: «¿va a estar este malvado de pie, ofreciendo?»`,
              fuente: "Mishná Zevajim 14:4 / Zevajim 112b · Bereshit Rabá 63:13",
            },
            {
              n: "3",
              donde: "Dt 21:17",
              titulo: "La doble porción",
              texto: `El derecho patrimonial del primogénito.`,
              fuente: "Texto",
            },
            {
              n: "4",
              donde: "Gn 27",
              titulo: "La bendición (בְּרָכָה)",
              texto: `La toma que Esav mismo numera como la segunda.`,
              fuente: "Texto · Gn 27:36",
            },
            {
              n: "5",
              donde: "Gn 27:15",
              titulo: "Las vestiduras preciosas (הַחֲמֻדֹת)",
              texto: `Y detrás de ellas una cadena: la túnica de Adam → Nóaj → Jam → Nimrod → Esav, que lo mató por ella.`,
              fuente:
                "Rashi a Gn 27:15 · Bereshit Rabá 65:16 (Nimrod) + 63:13 (la túnica de Adam) · Pirkei deRabí Eliezer 24",
            },
            {
              n: "6",
              donde: "Gn 29",
              titulo: "Lea",
              texto: `La hermana mayor, que según la tradición estaba destinada al hermano mayor. Va completa más abajo.`,
              fuente: "Bavá Batrá 123a · Bereshit Rabá 70:16",
            },
            {
              n: "7",
              donde: "Gn 36:6-8",
              titulo: "La tierra de Canaán",
              texto: `Esav sale a Seir. El Ramban lo dice sin rodeos: «dejó toda la tierra a su hermano y se fue».`,
              fuente: "Ramban a Gn 36:6 y 36:7",
            },
            {
              n: "8",
              donde: "Gn 32:25-33",
              titulo: "El nombre y la ratificación de la bendición, en Peniel",
              texto: `El ángel bendice a Yaakov, y Rashi lee esa bendición como un acto jurídico: le concedió las bendiciones.`,
              fuente: "Rashi a Gn 32:25 y 32:29 · Bereshit Rabá 77:3",
            },
            {
              n: "9",
              donde: "Gn 35:27",
              titulo: "La parcela en la cueva de Majpelá",
              texto: `Esav se planta a estorbar el entierro de Yaakov y argumenta desde el nombre de la ciudad: קִרְיַת הָאַרְבַּע, «ciudad de los cuatro», porque cuatro parejas fueron — Adam y Javá, Avraham y Sará, Yitzjak y Rivká, Yaakov y Lea (la cuenta es de R. Yitzjak). De ahí su alegato: «él enterró a Lea en la suya, y la que queda es mía». Los hermanos alegan que vendió sus derechos. (Esta fila y la 6 son la misma costura: va abajo, pegada a Lea.)`,
              fuente: "Sotá 13a · Rashi a Sotá 13a",
            },
            {
              n: "10",
              donde: "Gn 36:31",
              titulo: "La realeza",
              texto: `Edom tuvo ocho reyes antes que Israel. Rashi: «ocho fueron, y frente a ellos Yaakov levantó otros tantos y anuló el reino de Esav en sus días.»`,
              fuente: "Rashi a Gn 36:31",
            },
            {
              n: "11",
              titulo: "El fin de los días",
              texto: `No está tomado: está pendiente y condicionado.`,
              fuente:
                "Ovadiá 1:18 y 1:21 · Bereshit Rabá 63:7 · Radak a Gn 25:23 · Rashi a Gn 27:40",
            },
          ],
        },
        {
          etiqueta: "Cuenta honesta:",
          p: `ocho tomas consumadas (1-10, agrupando la bejorá con sus dos contenidos), una que es el fundamento y no una toma (0), y una pendiente que la Torá deja abierta a propósito (11).`,
        },

        { head: "La toma número seis: Lea" },
        {
          p: `Hay una toma en esta cuenta que no es un bien y no se puede pesar: es una persona. El acuerdo entre las dos casas —la de Rivká y la de Laván— era el más simple del mundo: la hija mayor para el hijo mayor, la menor para el menor. Lea estaba destinada a Esav. Y eso no es una leyenda piadosa que alguien colgó del texto: está en el Talmud, y el Talmud escribe el nombre de Esav.`,
        },
        {
          p: `La discusión empieza por un detalle del versículo. La Torá dice que los ojos de Lea eran רַכּוֹת (rakot), «blandos», y el Talmud quiere saber por qué:`,
        },
        {
          cita: {
            label: "Talmud Bavlí, Bavá Batrá 123a",
            he: "רַב אָמַר: לְעוֹלָם רַכּוֹת מַמָּשׁ, וְלֹא גְּנַאי הוּא לָהּ, אֶלָּא שֶׁבַח הוּא לָהּ. שֶׁהָיְתָה שׁוֹמַעַת עַל פָּרָשַׁת דְּרָכִים בְּנֵי אָדָם שֶׁהָיוּ אוֹמְרִים: שְׁנֵי בָנִים יֵשׁ לָהּ לְרִבְקָה, שְׁתֵּי בָנוֹת יֵשׁ לוֹ לְלָבָן, גְּדוֹלָה לַגָּדוֹל וּקְטַנָּה לַקָּטָן. וְהָיְתָה יוֹשֶׁבֶת עַל פָּרָשַׁת דְּרָכִים וּמְשָׁאֶלֶת: גָּדוֹל מָה מַעֲשָׂיו? אִישׁ רַע הוּא מְלַסְטֵם בְּרִיּוֹת. קָטָן מָה מַעֲשָׂיו? אִישׁ תָּם יֹשֵׁב אֹהָלִים. וְהָיְתָה בּוֹכָה, עַד שֶׁנָּשְׁרוּ רִיסֵי עֵינֶיהָ.",
            es: "Rav dijo: en verdad eran blandos de veras, y no es un desdoro para ella sino una alabanza. Porque ella oía, en el cruce de caminos, a gente que decía: «dos hijos tiene Rivká, dos hijas tiene Laván — la mayor para el mayor y la menor para el menor». Y se sentaba en el cruce de caminos y preguntaba: el mayor, ¿cuáles son sus obras? Un hombre malo es, que asalta a la gente. El menor, ¿cuáles son sus obras? «Un hombre íntegro que habita tiendas». Y lloraba, hasta que se le cayeron las pestañas.",
            source: "Bavá Batrá 123a",
          },
        },
        { p: `Y dos líneas después el Talmud escribe el nombre:` },
        {
          cita: {
            label: "Bavá Batrá 123a",
            he: "אֶלָּא רָאָה הַקָּדוֹשׁ בָּרוּךְ הוּא שֶׁשְּׂנוּאִין מַעֲשֵׂה עֵשָׂו בְּפָנֶיהָ, וַיִּפְתַּח אֶת רַחְמָהּ.",
            es: "Sino que vio el Santo, bendito sea, que las obras de Esav eran odiadas por ella, y abrió su matriz.",
            source: "Bavá Batrá 123a",
          },
        },
        {
          p: `Ahí está, con todas sus letras. El acuerdo de familia era «la mayor para el mayor»: Lea para Esav. Lea se enteró, preguntó qué clase de hombre era el mayor, le dijeron que un bandido, y lloró hasta arruinarse los ojos pidiendo no caer en su suerte. Y la Torá, cuando dice que Lea era «odiada», no está diciendo que Yaakov la odiara: está diciendo que ella odiaba el destino que le tocaba, y que por eso Dios le abrió el vientre.`,
        },
        {
          p: `El midrash cuenta lo mismo con la misma fórmula — הַגְּדוֹלָה לַגָּדוֹל וְהַקְּטַנָּה לַקָּטָן, «la mayor para el mayor y la menor para el menor» — y añade la oración de Lea: «que no caiga yo en suerte del malvado» (Bereshit Rabá 70:16). El midrash no escribe el nombre; dice «el malvado». El que lo escribe es el Talmud.`,
        },
        {
          p: `Y aquí viene la vuelta de tuerca que nadie espera. Toda esa sugiá de Bavá Batrá 123a no está hablando de matrimonios. Está hablando de la primogenitura. Empieza así:`,
        },
        {
          cita: {
            label: "Bavá Batrá 123a",
            he: "רְאוּיָה הָיְתָה בְּכוֹרָה לָצֵאת מֵרָחֵל... אֶלָּא שֶׁקְּדָמַתָּהּ לֵאָה בְּרַחֲמִים; וּמִתּוֹךְ צְנִיעוּת שֶׁהָיְתָה בָּהּ בְּרָחֵל, הֶחְזִירָהּ הַקָּדוֹשׁ בָּרוּךְ הוּא לָהּ.",
            es: "Correspondía que la primogenitura saliera de Rajel... sino que Lea se le adelantó con plegarias; y por la modestia que había en Rajel, el Santo, bendito sea, se la devolvió.",
            source: "Bavá Batrá 123a",
          },
        },
        {
          p: `Léelo despacio. La bejorá que Yaakov le tomó a Esav se vuelve a disputar dentro de su propia casa, entre Lea y Rajel, y por el mismo mecanismo: una se adelanta, la otra la recupera. El patrón no se detuvo al cruzar la puerta. Yaakov le tomó la primogenitura a su hermano y después tuvo que ver cómo sus dos mujeres se la disputaban entre ellas, y cómo al final el Cielo la movía de Reubén a Yosef.`,
        },
        {
          p: `Eso no es una anécdota. Es el precio del patrón, cobrado una generación más abajo.`,
        },

        { head: "La costura: la toma 6 y la toma 9 son la misma" },
        {
          p: `Hay un dato en el daf del entierro de Yaakov que, puesto al lado de lo anterior, cierra el patrón en la tierra. Esto no añade una toma a la cuenta: ilumina dos que ya estaban.`,
        },
        {
          p: `Cuando el cortejo llega a la cueva, Esav se planta a estorbar, y no lo hace a gritos: lo hace con un argumento, y el argumento es un nombre de lugar.`,
        },
        {
          cita: {
            label: "Talmud Bavlí, Sotá 13a",
            he: "כֵּיוָן שֶׁהִגִּיעוּ לִמְעָרַת הַמַּכְפֵּלָה, אֲתָא עֵשָׂו קָא מְעַכֵּב, אָמַר לָהֶן: ״מַמְרֵא קִרְיַת הָאַרְבַּע הִיא חֶבְרוֹן״, וְאָמַר רַבִּי יִצְחָק: קִרְיַת אַרְבַּע — אַרְבַּע זוּגוֹת הָיוּ: אָדָם וְחַוָּה, אַבְרָהָם וְשָׂרָה, יִצְחָק וְרִבְקָה, יַעֲקֹב וְלֵאָה. אִיהוּ קַבְרַהּ לְלֵאָה בְּדִידֵיהּ, וְהַאי דְּפָיֵישׁ — דִּידִי הוּא.",
            es: "Cuando llegaron a la cueva de Majpelá, vino Esav a estorbar. Les dijo: «Mamré Kiryat HaArbá, que es Jebrón». Y dijo Rabí Yitzjak: Kiryat Arbá — cuatro parejas fueron: Adam y Javá, Avraham y Sará, Yitzjak y Rivká, Yaakov y Lea. Él enterró a Lea en la suya, y la que queda es mía.",
            source: "Sotá 13a",
          },
        },
        {
          p: `Kiryat Arbá no es «ciudad de Arbá»: es «ciudad de los cuatro», y los cuatro son cuatro matrimonios. Ocho nichos para cuatro parejas. Seis están ocupados — Adam y Javá, Avraham y Sará, Yitzjak y Rivká. Quedan dos, que son el par de la cuarta pareja. Y Esav hace la cuenta en voz alta: Yaakov ya gastó el suyo poniendo a Lea en él, así que el que sobra le toca a él.`,
        },
        {
          nota: `Conviene saber de dónde sale cada número, porque son tres voces distintas. Las cuatro parejas las enumera Rabí Yitzjak. Los ocho nichos los dice Rashi sobre este mismo folio: la cueva «no contiene más que ocho sepulturas» — שֶׁאֵינָהּ מַחְזֶקֶת אֶלָּא ח' קְבָרִים. Y el que junta las dos cuentas es el Maharshá, que las deriva de la mishná sobre quien vende a otro un sitio para sepultura: «le hace una cueva y abre en ella ocho nichos» — וּפוֹתֵחַ לְתוֹכָהּ שְׁמֹנָה כּוּכִין, ocho kujín, que son cuatro parejas (Mishná Bavá Batrá 6:8). Lo que no dice nadie más que Esav es el último paso: que el nicho sobrante le tocara a él.`,
        },
        {
          p: `Ahora léelo junto a la toma número 6 y mira lo que aparece. No son dos tomas: son la misma costura. Porque en la cuenta de las cuatro parejas, la mujer que queda sepultada junto a Yaakov en la cueva de los patriarcas es Lea, no Rajel. Rajel queda enterrada en el camino — y eso ocurre dentro de Vayishlaj mismo:`,
        },
        {
          cita: {
            label: "Génesis 35:19-20",
            he: "וַתָּ֖מׇת רָחֵ֑ל וַתִּקָּבֵר֙ בְּדֶ֣רֶךְ אֶפְרָ֔תָה הִ֖וא בֵּ֥ית לָֽחֶם׃ וַיַּצֵּ֧ב יַעֲקֹ֛ב מַצֵּבָ֖ה עַל־קְבֻרָתָ֑הּ",
            es: "Y murió Rajel, y fue sepultada en el camino de Efrata, que es Bet Lejem. Y Yaakov levantó una estela sobre su sepultura.",
            source: "Génesis 35:19-20",
          },
        },
        {
          p: `De modo que la hermana que era la porción del hermano mayor es la que ocupa el sitio en la cueva de los padres. Y la parcela que Esav llega a reclamar al final de su vida es justamente la que sobra después de que Lea ocupó la de Yaakov. El patrón que empezó en el vientre se cierra en la tierra: Esav llega al final a cobrar, y lo que encuentra es que su porción ya está ocupada por la mujer que también era su porción.`,
        },
        {
          p: `Y hay un detalle que ata todo esto a nuestra parashá y que no es casualidad: el versículo del que Esav argumenta está en Vayishlaj. «Mamré, Kiryat haArbá, que es Jevrón» — מַמְרֵא קִרְיַת הָאַרְבַּע הִיא חֶבְרוֹן — es Génesis 35:27. El Maharshá explica por qué la derashá necesita ese versículo y no el de Jayé Sará: en Gn 23:2 dice קִרְיַת אַרְבַּע sin artículo —y ahí podría ser el nombre de un hombre, Arbá, padre de los Anakim, como en Yehoshúa—, mientras que aquí dice הָאַרְבַּע con la ה del artículo, y un artículo no cae sobre un nombre propio; por eso tiene que ser un número:`,
        },
        {
          cita: {
            label: "Maharshá, Jidushei Agadot a Sotá 13a",
            he: 'אַקְרָא דְּפָרָשַׁת וַיִּשְׁלַח מַיְיתֵי לֵיהּ הָכָא... אֲבָל אַקְרָא דִּתְחִילַּת פָּרָשַׁת חַיֵּי שָׂרָה דְּלָא כְּתִיב הָאַרְבַּע בְּה"א יֵשׁ לְפָרְשׁוֹ שֶׁהוּא שֵׁם אִישׁ... אֲבָל הַאי קְרָא הָאַרְבַּע בְּה"א הַיְדִיעָה לֹא תִּפּוֹל בְּשֵׁם הָעֶצֶם, וְעַל כֵּן דָּרְשׁוּ בּוֹ שֶׁהוּא שֵׁם הַמִּסְפָּר עַל שֵׁם אַרְבַּע זוּגוֹת.',
            es: "Del versículo de la parashá de Vayishlaj lo trae aquí... pero el versículo del comienzo de la parashá de Jayé Sará, donde no está escrito haArbá con he, se puede explicar que es nombre de un hombre... Pero este versículo, haArbá con la he del artículo — el artículo no cae sobre un nombre propio, y por eso derivaron en él que es un número, por las cuatro parejas.",
            source: "Maharshá, Jidushei Agadot a Sotá 13a",
          },
        },

        { head: "Qué dice el Talmud aquí, y qué no dice" },
        {
          etiqueta:
            "Primero: ese alegato lo dice Esav, no la guemará en su propia voz.",
          p: `El Talmud no dictamina que la parcela fuera de Esav. Relata su reclamo, y después relata cómo se le responde. Los hermanos contestan con una sola palabra — זַבֵּינְתֵּהּ, «la vendiste» — y Esav distingue con precisión de abogado: concedo que vendí la primogenitura; ¿vendí también mi parte simple? (נְהִי דְּזַבֵּינִי בְּכֵירוּתָא, פְּשִׁיטוּתָא מִי זַבֵּינִי). Ellos le contestan con exégesis, no con papeles: leen el כָּרִיתִי de Génesis 50:5 —«cavé», dice el llano— como לְשׁוֹן מְכִירָה, «lenguaje de venta». Esav exige entonces el documento, la אִיגַּרְתָּא; le dicen que está en Egipto; Naftalí sale a buscarlo, y Jushim ben Dan le parte la cabeza antes de que Naftalí vuelva. El documento nunca llega. El expediente se cierra sin papel.`,
        },
        {
          etiqueta:
            "Segundo: la cuenta de las cuatro parejas es de Rabí Yitzjak, con nombre.",
          p: `Y Rashi, en el daf mismo, precisa de quién es cada voz. Hay que leer su glosa entera y no media:`,
        },
        {
          cita: {
            label: "Rashi a Sotá 13a",
            he: "הָא דְּאָמַר רַבִּי יִצְחָק לָאו מִלְּתָא דְּעֵשָׂו הִיא, אֶלָּא גְּמָרָא קָאָמַר לֵיהּ לְמֵימַר טַעְמָא דְּעִיכּוּבָא, דְּוַדַּאי כֵּן הֲוָה כִּדְבָרֵי עֵשָׂו שֶׁאֵינָהּ מַחְזֶקֶת אֶלָּא ח' קְבָרִים.",
            es: "Eso que dijo Rabí Yitzjak no es palabra de Esav, sino que la guemará lo dice para dar la razón del estorbo — porque ciertamente así era, como las palabras de Esav, que [la cueva] no contiene más que ocho sepulturas.",
            source: "Rashi a Sotá 13a",
          },
        },
        {
          p: `Rashi hace dos cosas a la vez y las dos importan. Separa la enumeración de Rabí Yitzjak del discurso de Esav: lo que Esav dijo fue el nombre de la ciudad; el desglose de las cuatro parejas es la guemará explicando por qué ese nombre era un argumento. Y a la vez respalda la premisa: la cueva tenía ocho nichos, y en eso Esav tenía razón. Lo que la guemará no dice en ningún momento es que el nicho sobrante le perteneciera.`,
        },
        { p: `Y Rashi dice además de quién era el nicho que Lea ocupa:` },
        {
          cita: {
            label: "Rashi a Sotá 13a",
            he: "קַבְרַהּ לְלֵאָה בְּדִידֵיהּ — בְּחֵלֶק הַמַּגִּיעוֹ, כְּדִכְתִיב ״וְשָׁמָּה קָבַרְתִּי אֶת לֵאָה״.",
            es: "«Enterró a Lea en la suya» — en la parte que le correspondía, como está escrito «y allí sepulté a Lea».",
            source: "Rashi a Sotá 13a",
          },
        },
        {
          p: `Y ahí se cierra el círculo. El nicho que Lea ocupa es el que le tocaba a Yaakov: la cuenta de las cuatro parejas la pone dentro de la cueva, Rashi dice en qué parcela, y el propio Yaakov lo firma en primera persona cuando reparte su testamento — וְשָׁמָּה קָבַרְתִּי אֶת לֵאָה, «y allí enterré a Lea».`,
        },
        {
          nota: `Hay que decir dónde termina la tradición y dónde empieza nuestra lectura. Que Lea era la porción de Esav lo dice el Talmud en Bavá Batrá 123a; que Lea ocupa la parcela de la cueva lo dice el Talmud en Sotá 13a. Juntar las dos cosas y leerlas como una sola costura es una meditación de Jashmal: ningún comentarista clásico las une. Lo más cerca que llegan es esto. El Tur HaArokh, comentando el testamento de Yaakov (Génesis 49:31), dice que Yaakov enterró a Lea allí precisamente para tomar posesión del lugar — הֶחְזַקְתִּי בָּהּ, «me hice fuerte en ella» — y poder alegar contra Esav si venía a protestar diciendo que él era el primogénito y que le correspondía ser sepultado con sus padres. Y el Maharshá, sobre Sotá 13a, sostiene que Yaakov le compró a Esav incluso su parte simple en esa sepultura, «para que el malvado no fuera sepultado junto a los justos» y para que la cuenta de Kiryat Arbá —cuatro parejas, varón y mujer— quedara completa. Los dos atan a Lea con el reclamo de Esav; ninguno de los dos dice que Lea fuera su porción. Y hay una pieza más, que sostiene la primera mitad de la costura: Rashi, comentando Génesis 29:17, escribe el nombre que el midrash calla — Lea lloraba porque pensaba que iba a subir בְּגוֹרָלוֹ שֶׁל עֵשָׂו, «en la suerte de Esav».`,
        },
      ],
    },

    {
      he: "קָטֹנְתִּי",
      title: "Katonti · la etiqueta que se vuelve verbo",
      bloques: [
        { head: "La palabra que es la bisagra de toda la parashá" },
        {
          p: `Hay una palabra en Vayishlaj que parece una nota de humildad al margen y es en realidad la bisagra de todo el expediente. Está en la oración de Yaakov antes de cruzar:`,
        },
        {
          cita: {
            label: "Génesis 32:11",
            he: "קָטֹ֜נְתִּי מִכֹּ֤ל הַחֲסָדִים֙ וּמִכׇּל־הָ֣אֱמֶ֔ת אֲשֶׁ֥ר עָשִׂ֖יתָ אֶת־עַבְדֶּ֑ךָ כִּ֣י בְמַקְלִ֗י עָבַ֙רְתִּי֙ אֶת־הַיַּרְדֵּ֣ן הַזֶּ֔ה וְעַתָּ֥ה הָיִ֖יתִי לִשְׁנֵ֥י מַחֲנֽוֹת׃",
            es: "Me he vuelto pequeño ante todas las bondades y toda la verdad que has hecho con tu siervo, porque con mi bastón crucé este Jordán y ahora he llegado a ser dos campamentos.",
            source: "Génesis 32:11",
          },
        },
        {
          p: `Para ver por qué esa palabra no es un adorno, hay que seguir la raíz de la pequeñez —ק־ט־נ, la de קָטָן (katán), «pequeño»— a lo largo de la historia de los dos hermanos. El rastreo está hecho sobre todo el libro de Génesis:`,
        },
        {
          filas: [
            {
              donde: "Gn 27:1",
              he: "עֵשָׂו בְּנוֹ הַגָּדֹל",
              texto: `Esav es «su hijo el mayor».`,
            },
            {
              donde: "Gn 27:15",
              he: "בִּגְדֵי עֵשָׂו בְּנָה הַגָּדֹל ... וַתַּלְבֵּשׁ אֶת־יַעֲקֹב בְּנָה הַקָּטָן",
              texto: `Las dos etiquetas en el mismo versículo — y es el versículo de la toma de las vestiduras.`,
            },
            {
              donde: "Gn 27:42",
              he: "עֵשָׂו בְּנָה הַגָּדֹל · יַעֲקֹב בְּנָה הַקָּטָן",
              texto: `Otra vez las dos.`,
            },
            {
              donde: "Gn 32:11",
              he: "קָטֹנְתִּי",
              texto: `Yaakov lo dice de sí mismo, en primera persona.`,
            },
          ],
        },
        {
          p: `Esto es lo que hay que entender. הַקָּטָן, «el pequeño», no era un adjetivo: era su puesto en el expediente. Era la etiqueta con la que la Torá lo identificaba mientras tomaba — y aparece, con toda precisión, en el versículo donde le ponen encima las ropas de su hermano. Durante tres capítulos, el pequeño es lo que otros dicen de él.`,
        },
        {
          p: `En Vayishlaj, por primera vez, lo dice él. Y no lo dice como adjetivo: lo conjuga. קָטֹנְתִּי (katonti), «me he vuelto pequeño», es un verbo en primera persona. Yaakov toma la etiqueta que lo definía como el hermano menor — el que iba detrás, el que tomaba por detrás — y la convierte en una declaración propia.`,
        },
        {
          p: `Y treinta y tres versículos después le dice a su hermano קַח־נָא אֶת־בִּרְכָתִי, «toma mi bendición». Katonti, la lucha, las siete inclinaciones y la devolución del gesto no son cuatro episodios: son un solo movimiento, y los cuatro caen en esta parashá. Ahí está la respuesta completa a por qué Vayishlaj es el lugar del cierre.`,
        },

        { head: "Qué quiso decir Yaakov con esa palabra" },
        {
          p: `La palabra tiene dos lecturas, y no son dos modas modernas: los sabios ya discutían sobre ella en el midrash, uno frente al otro, con nombre y apellido.`,
        },
        {
          cita: {
            label: "Bereshit Rabá 76:5",
            he: "קָטֹנְתִּי מִכֹּל הַחֲסָדִים — אָמַר רַבִּי אַבָּא בַּר כַּהֲנָא: אֵינִי כְּדַאי. רַבִּי לֵוִי אָמַר: כְּדַאי אֲנִי, אֲבָל קָטֹנְתִּי מִכֹּל וגו'.",
            es: "«Katonti ante todas las bondades» — dijo Rabí Abá bar Kahaná: no soy digno. Rabí Leví dijo: digno soy, pero me he menguado por todas [las bondades].",
            source: "Bereshit Rabá 76:5",
          },
        },
        {
          p: `Y cada comentarista posterior se pone detrás de uno de los dos. Rashi se pone detrás de Rabí Leví, y lo dice con una imagen contable: a Yaakov se le menguaron los méritos. Cada bondad recibida se le descontó de la cuenta.`,
        },
        {
          cita: {
            label: "Rashi a Génesis 32:11, citando Shabat 32a",
            he: "נִתְמַעֲטוּ זְכֻיּוֹתַי עַל יְדֵי הַחֲסָדִים וְהָאֱמֶת שֶׁעָשִׂיתָ עִמִּי, לְכָךְ אֲנִי יָרֵא, שֶׁמָּא מִשֶּׁהִבְטַחְתַּנִי נִתְקַלְקַלְתִּי בְחֵטְא וְיִגְרֹם לִי לְהִמָּסֵר בְּיַד עֵשָׂו.",
            es: "Se me menguaron mis méritos por las bondades y la verdad que hiciste conmigo, por eso tengo miedo: quizá desde que me lo prometiste me he dañado con algún pecado, y eso causará que sea entregado en mano de Esav.",
            source: "Rashi a Génesis 32:11 · Shabat 32a",
          },
        },
        {
          p: `Onkelos, que traduce la Torá al arameo mil años antes que Rashi, lo había dicho ya sin metáfora: זְעִירָן זָכוּתַי (zeirán zajutái), «mis méritos son pocos». No es que Yaakov se hiciera pequeño de alma. Es una cuenta que bajó.`,
        },
        {
          p: `El Ramban no está de acuerdo, y no se limita a proponer otra cosa: rechaza a Rashi por escrito, en la página. Para él katonti quiere decir «soy demasiado pequeño para esto».`,
        },
        {
          cita: {
            label: "Ramban a Génesis 32:11",
            he: 'לְשׁוֹן רַשִׁ"י. וְאֵינֶנּוּ נָכוֹן בִּלְשׁוֹן הַכָּתוּב... אֲבָל "קָטֹנְתִּי" לוֹמַר כִּי קָטֹן הוּא מֵהֱיוֹתוֹ רָאוּי לְכָל הַחֲסָדִים שֶׁעָשָׂה עִמּוֹ.',
            es: "Esta es la expresión de Rashi. Y no es correcta en el lenguaje del versículo... Sino que «katonti» quiere decir que es demasiado pequeño para ser digno de todas las bondades que hizo con él.",
            source: "Ramban a Génesis 32:11",
          },
        },
        {
          p: `El argumento del Ramban es gramatical y es bueno: קָטָן, «pequeño», habla de tamaño, no de cantidad; y además, si el pecado le hubiera consumido el mérito, ¿de qué le serviría invocar la promesa dos versículos después? El Ramban trae Amós 7:2 — מִי יָקוּם יַעֲקֹב כִּי קָטֹן הוּא, «¿quién levantará a Yaakov, que es pequeño?» — y se apoya en Rabí Abá bar Kahaná. El Sforno va con él: «no era yo digno de todas esas bondades».`,
        },

        { head: "Cada bondad recibida consume mérito" },
        {
          p: `Dejando la disputa de lado, la idea de Rashi es de las más fuertes de toda la parashá y es verificable: cada bondad que recibes consume mérito. No es una metáfora moral; en Shabat 32a es un principio operativo. El que recibe un milagro, paga el milagro con sus méritos.`,
        },
        {
          p: `Piénsalo aplicado a Yaakov y verás por qué está dicho aquí y no en otro lugar. Yaakov acaba de enumerar todo lo que le salió bien: cruzó el Jordán con un bastón y ahora tiene dos campamentos. Y en lugar de leer esa lista como un expediente de favor divino, la lee como una factura. Cada cosa que le fue bien le costó crédito. Llega al vado del Yaboc con la cuenta en cero.`,
        },
        {
          p: `Y eso ata con todo este estudio. Un hombre que tomó ocho veces llega al encuentro con su hermano sabiendo que no le queda saldo. No es una casualidad que el versículo siguiente sea «líbrame, te ruego, de la mano de mi hermano, de la mano de Esav».`,
        },

        { head: "La pequeñez medida contra lo Infinito" },
        {
          p: `Hay una tercera lectura, más difundida que las dos anteriores y más hermosa que ninguna: que katonti no es una humillación sino una ampliación de la mirada. El yo se vuelve pequeño porque la escala contra la que se mide se volvió infinita. Suele decirse que «la Cabalá llama a eso bitul, anulación». Vale la pena seguirle el rastro a esa lectura, porque es verdadera y a la vez se cuenta mal.`,
        },
        {
          p: `Existe, y tiene autor. No la inventó nadie en redes: el Alter Rebbe, el primer Rebe de Jabad, construyó sobre este versículo una carta entera del Tanya.`,
        },
        {
          cita: {
            label: "Tanya, parte IV, Iguéret HaKódesh 2",
            he: "״קָטֹנְתִּי מִכֹּל הַחֲסָדִים״ — פֵּירוּשׁ, שֶׁבְּכָל חֶסֶד וָחֶסֶד שֶׁהַקָּדוֹשׁ־בָּרוּךְ־הוּא עוֹשֶׂה לְאָדָם צָרִיךְ לִהְיוֹת שְׁפַל רוּחַ בִּמְאֹד... וְכָל הַקָּרוֹב אֶל ה׳ בְּיֶתֶר שְׂאֵת וְהַגְבֵּהַּ לְמַעְלָה מַעְלָה, צָרִיךְ לִהְיוֹת יוֹתֵר שְׁפַל רוּחַ לְמַטָּה מַטָּה... וְאִם כֵּן, כָּל שֶׁהוּא ״קַמֵּיהּ״ יוֹתֵר — הוּא יוֹתֵר כְּלָא וְאַיִן וָאֶפֶס.",
            es: "«Katonti ante todas las bondades» — su explicación: que con cada bondad que el Santo, bendito sea, hace a una persona, esa persona debe volverse muy humilde de espíritu... y todo el que está cerca del Eterno con mayor elevación y altura, debe ser más humilde hacia abajo... y por tanto, todo el que está más «ante Él» es más nada, inexistencia y cero.",
            source: "Tanya, Iguéret HaKódesh 2",
          },
        },
        {
          p: `Ahí está la doctrina entera, y es exactamente la que la divulgación describe: cuanto más cerca de lo Infinito, más pequeño el yo — y no por castigo, sino por escala: כְּלָא וְאַיִן וָאֶפֶס, «como nada, inexistencia y cero».`,
        },
        {
          p: `Esa doctrina, entonces, tiene una dirección y una fecha, y conviene dárselas. No es «la Cabalá» a secas: bitul es vocabulario de jasidut, y señaladamente de Jabad, una escuela del siglo XVIII. En esta carta el Tanya ni siquiera usa esa palabra: dice שְׁפַל רוּחַ (shfal rúaj), «humilde de espíritu», y אַיִן וָאֶפֶס (áin vaéfes), «nada y cero». El concepto está; el término llegó después.`,
        },
        {
          p: `Y queda lo decisivo, que es también lo que casi nunca se cuenta. Suele decirse que Yaakov, llegado a ese estado, ya no habla desde el miedo. Eso no se sostiene, y el que lo desmiente es el propio Tanya unas líneas más abajo, en la misma carta:`,
        },
        {
          cita: {
            label: "Tanya, parte IV, Iguéret HaKódesh 2",
            he: "וְזוֹ הִיא גַּם כֵּן מִדָּתוֹ שֶׁל יַעֲקֹב, וּבָזֹאת הִתְנַצֵּל עַל יִרְאָתוֹ מִפְּנֵי עֵשָׂו, וְלֹא דַי לוֹ בְּהַבְטָחָתוֹ ״וְהִנֵּה אָנֹכִי עִמָּךְ״ — מִפְּנֵי הֱיוֹת קָטָן יַעֲקֹב בִּמְאֹד מְאֹד בְּעֵינָיו מֵחֲמַת רִיבּוּי הַחֲסָדִים, וְאֵינוֹ רָאוּי וּכְדַאי כְּלָל לְהִנָּצֵל, וּכְמַאֲמַר רַבּוֹתֵינוּ ז״ל ״שֶׁמָּא יִגְרוֹם הַחֵטְא״, שֶׁנִּדְמֶה בְעֵינָיו שֶׁחָטָא.",
            es: "Y esta es también la midá de Yaakov, y con esto justificó su temor ante Esav, y no le bastó la promesa «y he aquí que yo estoy contigo» — porque Yaakov era muy, muy pequeño a sus propios ojos a causa de la abundancia de las bondades, y no era digno en absoluto de ser salvado; y como dijeron nuestros maestros, de bendita memoria, «quizá el pecado cause», pues le parecía a sus ojos que había pecado.",
            source: "Tanya, Iguéret HaKódesh 2",
          },
        },
        {
          p: `La fuente misma de la lectura del bitul dice que katonti es la explicación del miedo de Yaakov, no su superación. El Alter Rebbe usa el versículo precisamente para contestar por qué Yaakov tuvo miedo teniendo una promesa divina en la mano. Y cita la fórmula de los sabios, שֶׁמָּא יִגְרוֹם הַחֵטְא, «no sea que el pecado lo cause», que es la preocupación exacta de Rashi.`,
        },
        { p: `Y por si quedara duda, el miedo está escrito en el versículo de al lado:` },
        {
          cita: {
            label: "Génesis 32:12",
            he: "הַצִּילֵ֥נִי נָ֛א מִיַּ֥ד אָחִ֖י מִיַּ֣ד עֵשָׂ֑ו כִּֽי־יָרֵ֤א אָנֹכִי֙ אֹת֔וֹ פֶּן־יָב֣וֹא וְהִכַּ֔נִי אֵ֖ם עַל־בָּנִֽים׃",
            es: "Líbrame, te ruego, de la mano de mi hermano, de la mano de Esav, porque tengo miedo de él, no sea que venga y me golpee, madre sobre hijos.",
            source: "Génesis 32:12",
          },
        },

        { head: "El retrato que queda" },
        {
          p: `Entonces, ¿qué se queda? Las dos lecturas clásicas, sin aplastar ninguna, y la jasídica con su nombre puesto. Pero el retrato que sale de juntarlas no es el de un místico sereno que disolvió su ego y por eso dejó de temer. Es mucho mejor que eso.`,
        },
        {
          p: `Yaakov llega al vado con la cuenta de méritos vacía — eso es Rashi. Se sabe demasiado pequeño para lo que ha recibido — eso es el Ramban. Está tan cerca de lo Infinito que se experimenta como nada — eso es el Tanya. Y tiene miedo — eso lo dice el versículo siguiente con todas sus letras. Y reza igual. Y cruza igual. Y pelea toda la noche igual.`,
        },
        {
          p: `Eso no es un hombre liberado del miedo. Es un hombre que hace lo que hay que hacer con el miedo puesto, sin saldo, y sin dejar de rezar. La versión devocional —«el katonti lo libera»— le quita al relato precisamente lo que lo hace utilizable. Nadie se parece a un santo que ya no teme. Todo el mundo se parece a un hombre con la cuenta en cero que cruza el río de todos modos.`,
        },
        {
          p: `Y mira dónde desembarca eso. El hombre que se declara pequeño en 32:11 es el mismo que treinta y tres versículos más tarde se inclina siete veces y le ofrece a su hermano «mi bendición». La pequeñez no es la meta del camino: es lo que hace posible devolver. Mientras el pequeño era una etiqueta que otros le ponían, Yaakov tomaba. Cuando pequeño se vuelve un verbo que él mismo conjuga, Yaakov devuelve.`,
        },
      ],
    },
  ],

  // ── 5. מְפָרְשִׁים ────────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [],
    bloques: [
      { head: "Rashi: Peniel es un acto jurídico" },
      {
        p: `Aquí está la pieza más importante del estudio después del mapa, y casi nadie la lee así. En Peniel, después de la lucha, el texto dice וַיְבָרֶךְ אֹתוֹ שָׁם, «y lo bendijo allí» (Gn 32:30). ¿Qué bendición? Rashi contesta en su comentario al versículo anterior:`,
      },
      {
        cita: {
          label: "Rashi a Génesis 32:29",
          he: 'לֹא יֵאָמֵר עוֹד שֶׁהַבְּרָכוֹת בָּאוּ לְךָ בְעָקְבָּה וּרְמִיָּה כִּי אִם בִשְׂרָרָה וְגִלּוּי פָּנִים, וְסוֹפְךָ שֶׁהַקָּבָּ"ה נִגְלֶה אֵלֶיךָ בְּבֵית אֵל... וַאֲנִי שָׁם אֶהְיֶה וְאוֹדֶה לְךָ עֲלֵיהֶן... וְלֹא רָצָה יַעֲקֹב, וְעַל כָּרְחוֹ הוֹדָה לוֹ עֲלֵיהֶן, וְזֶהוּ וַיְבָרֶךְ אֹתוֹ שָׁם.',
          es: "Ya no se dirá que las bendiciones te llegaron con astucia y con engaño, sino con señorío y a rostro descubierto... y al final el Santo, bendito sea, se te revelará en Bet El... y yo estaré allí y te las reconoceré... Y Yaakov no quiso [esperar], y contra su voluntad se las reconoció. Y eso es «y lo bendijo allí».",
          source: "Rashi a Génesis 32:29",
        },
      },
      {
        nota: `En la numeración masorética este versículo es 32:29; algunas ediciones lo numeran 32:28.`,
      },
      {
        p: `Y el que se las reconoce no es un ángel cualquiera. Rashi mismo, cuatro versículos antes:`,
      },
      {
        cita: {
          label:
            "Rashi a Génesis 32:25, siguiendo a Bereshit Rabá 77:3 (R. Jamá bar Janiná)",
          he: "וּפֵרְשׁוּ רַבּוֹתֵינוּ זִכְרוֹנָם לִבְרָכָה שֶׁהוּא שָׂרוֹ שֶׁל עֵשָׂו.",
          es: "Y explicaron nuestros maestros, de bendita memoria, que era el príncipe celestial de Esav.",
          source: "Rashi a Génesis 32:25 · Bereshit Rabá 77:3",
        },
      },
      {
        p: `Junta las dos piezas y mira lo que sale. En Peniel, el representante celestial de Esav reconoce a Yaakov las bendiciones que Yaakov le había tomado a Esav con engaño. La bendición no se toma otra vez: se legaliza. El verbo de Rashi es הוֹדָה, «reconoció, concedió, admitió» — el verbo de quien firma un documento, no el de quien regala algo.`,
      },
      {
        p: `Y la fórmula con la que lo dice es precisa como un contrato: lo que era עָקְבָּה וּרְמִיָּה (astucia y engaño) pasa a ser שְׂרָרָה וְגִלּוּי פָּנִים (señorío y rostro descubierto). No cambia el contenido de la bendición. Cambia el modo de tenencia. Lo que cambia en Peniel no es la suerte de Yaakov: es su título de propiedad.`,
      },

      {
        head: "El Alshij: la palabra «mi bendición» está elegida, y apunta al expediente",
      },
      {
        p: `¿Alguien, antes de nosotros, notó que en Gn 33:11 Yaakov usa justo la palabra del delito?`,
      },
      {
        p: `El pshat dice que no hay nada que notar. Rashi, el Ramban, el Radak y el Malbim coinciden en que בְּרָכָה aquí significa simplemente «obsequio», y lo prueban con otros versículos: «toma, te ruego, una bendición de tu siervo» (2 Reyes 5:15, Naamán a Elishá) y «hagan conmigo una bendición» (2 Reyes 18:31). El Ramban lo explica con elegancia:`,
      },
      {
        cita: {
          label: "Ramban a Génesis 33:11",
          he: "וְיִקְרְאוּ הַמִּנְחָה שֶׁיִּשְׁלַח הָאָדָם לִרְצוֹנוֹ בְּרָכָה, כִּי הוּא שׁוֹלֵחַ מֵאֲשֶׁר בֵּרֵךְ אוֹתוֹ הַשֵּׁם.",
          es: "Y llaman «bendición» al obsequio que una persona envía por su voluntad, porque lo envía de aquello con lo que Dios lo bendijo.",
          source: "Ramban a Génesis 33:11",
        },
      },
      {
        p: `Esa es la lectura llana y hay que decirla, porque desmonta una versión ingenua del hallazgo. Pero hay tres comentaristas que sí se detienen, y uno que llega hasta el fondo.`,
      },
      {
        etiqueta: "El Netziv",
        p: `nota el cambio de palabra y lo lee como un cambio de relación:`,
      },
      {
        cita: {
          label: "Haamek Davar (Netziv) a Génesis 33:11",
          he: "דתחלה אמר מנחתי ועתה אמר ברכתי. דתחלה אמר שיקבל בתורת עבד לאדונו, עתה אמר בתורת אח לאחיו אפי' הוא עשיר.",
          es: "Porque primero dijo «mi obsequio» y ahora dice «mi bendición»: primero le pidió que lo recibiera como un siervo a su señor, ahora como un hermano a su hermano, aunque sea rico.",
          source: "Haamek Davar (Netziv) a Génesis 33:11",
        },
      },
      {
        etiqueta: "El Agra deKala",
        p: `(R. Tzvi Elimelej de Dinov) pone la pregunta en una lista de dificultades, con esas palabras: «segundo: antes dijo mi minjá, y ahora mi berajá» (Agra deKala, Vayishlaj 57). Nota el cambio, pero lo resuelve por otro camino: la bendición de fecundidad en los rebaños.`,
      },
      {
        etiqueta: "Y el Alshij llega al expediente.",
        p: `Rabí Moshé Alshij, Safed, siglo XVI, imagina por qué Esav podría rechazar el regalo, y una de las razones que se le ocurren es esta:`,
      },
      {
        cita: {
          label: "Alshij a Génesis 33:11",
          he: "ואם הוא להיות כי הכל משלך ויהיה לפניך מזכרת עון לזכור את השאר — גם זה אינו, כי הנה ברכה אשר ברכני ה' היא, לא משלך, כי אינו לא מטל השמים ולא משמני הארץ. וזהו \"את ברכתי\", ולא אמר \"את מנחתי\" — כלומר מהברכה שלי.",
          es: "Y si es porque [piensas que] todo es tuyo, y te sería delante un recordatorio de culpa, para acordarte del resto — tampoco es eso, porque he aquí que es una bendición con la que Dios me bendijo a mí, no de lo tuyo, porque no es ni del rocío de los cielos ni de la grosura de la tierra. Y por eso dice «mi bendición» y no dijo «mi obsequio» — es decir, de mi bendición.",
          source: "Alshij a Génesis 33:11",
        },
      },
      { p: `Hay que apreciar lo que acaba de pasar. El Alshij:` },
      {
        etiqueta: "1.",
        p: `Dice explícitamente que la palabra está elegida: «dice mi bendición y no dijo mi obsequio». La anomalía léxica es un hecho reconocido por un comentarista clásico, no un invento nuestro.`,
      },
      {
        etiqueta: "2.",
        p: `Nombra el expediente: el regalo podría ser para Esav un מַזְכֶּרֶת עָוֹן, un «recordatorio de culpa», que lo haga «acordarse del resto» — del resto de lo tomado. El Alshij sabe que estamos hablando de la bendición de Génesis 27.`,
      },
      {
        etiqueta: "3.",
        p: `Cita los términos de aquella bendición para distinguirla: «ni del rocío de los cielos ni de la grosura de la tierra» es, palabra por palabra, מִטַּל הַשָּׁמַיִם וּמִשְׁמַנֵּי הָאָרֶץ de Génesis 27:28.`,
      },
      {
        p: `Aquí hay que ser exacto, y es la línea que separa un estudio honesto de uno que se pasa de listo. El Alshij usa la conexión para separar las dos bendiciones, no para unirlas. Su Yaakov le dice a Esav: no te alarmes, esto no es tu bendición devuelta; es mía, ganada aparte. No dice que Yaakov devuelva nada.`,
      },
      { p: `Así que el veredicto es de dos filos, y los dos hay que publicarlos:` },
      {
        etiqueta: "Que la palabra está elegida y apunta a Génesis 27: SE SOSTIENE,",
        p: `con el Alshij como fuente clásica y el Netziv y el Agra deKala como testigos de que el cambio de palabra es deliberado.`,
      },
      {
        etiqueta: "Que Yaakov está devolviendo la bendición es lectura de Jashmal,",
        p: `y va marcada como tal. Ningún comentarista clásico lo dice; el Alshij, de hecho, lo niega.`,
      },
      {
        p: `La gramática, en cambio, está escrita y no se discute: en 27:36 Esav dice לָקַח (lakaj), «tomó»; en 33:11 Yaakov dice קַח (kaj), «toma», y el versículo se cierra con וַיִּקָּח (vayikaj), «y tomó». El eco está en el hebreo. Lo que ese eco significa ya es lectura de Jashmal, y así va dicho.`,
      },

      { head: "El Radak: la profecía estaba escrita en ambiguo a propósito" },
      { p: `Toda la historia arranca de un oráculo, y el oráculo tiene una grieta gramatical.` },
      {
        cita: {
          label: "Génesis 25:23",
          he: "וּלְאֹם֙ מִלְאֹ֣ם יֶֽאֱמָ֔ץ וְרַ֖ב יַעֲבֹ֥ד צָעִֽיר׃",
          es: "Y un pueblo se hará más fuerte que el otro, y el mayor servirá al menor.",
          source: "Génesis 25:23",
        },
      },
      { p: `Salvo que no dice exactamente eso. Y el que lo nota es el Radak:` },
      {
        cita: {
          label: "Radak a Génesis 25:23",
          he: 'לֹא זָכַר עִמָּהֶם מִלַּת "אֶת" שֶׁהִיא מוֹרָה עַל הַפָּעוּל. וְהִנֵּה הַדָּבָר מְסֻפָּק וְלֹא בֵּאֵר מִי יַעֲבֹד אֶת חֲבֵרוֹ, הָרַב אֶת הַצָּעִיר אוֹ הַצָּעִיר אֶת הָרַב... וְהָיָה זֶה שֶׁלֹּא הִתְבָּאֵר הָעִנְיָן בַּנְּבוּאָה הַזֹּאת לְפִי שֶׁפְּעָמִים יַעֲבֹד רַב אֶת הַצָּעִיר, כְּמוֹ שֶׁהָיָה בִּימֵי דָּוִד, וּפְעָמִים יַעֲבֹד הַצָּעִיר אֶת הָרַב כְּמוֹ שֶׁהוּא הַיּוֹם.',
          es: "No mencionó con ellos la palabra את, que señala el objeto. Y he aquí que el asunto queda en duda y no aclaró quién servirá a quién: el mayor al menor o el menor al mayor... Y esto fue que el asunto no quedó aclarado en esta profecía porque a veces servirá el mayor al menor, como fue en los días de David, y a veces servirá el menor al mayor, como es hoy.",
          source: "Radak a Génesis 25:23",
        },
      },
      {
        p: `Esa es la observación entera, hecha en el siglo XII, y es exacta. En hebreo, la partícula את marca el objeto directo. Sin ella, וְרַב יַעֲבֹד צָעִיר —«y mayor servirá menor»— puede leerse en los dos sentidos. La profecía que gobierna toda esta historia está redactada de modo que no se sabe quién sirve a quién — y el Radak dice que está así a propósito, porque la historia va a ir en las dos direcciones.`,
      },
      {
        p: `El midrash llega al mismo lugar por otra puerta, y es más antiguo. Juega con la vocalización del verbo, que en hebreo sin puntos es la misma consonántica:`,
      },
      {
        cita: {
          label: "Bereshit Rabá 63:7",
          he: "וְרַב יַעֲבֹד צָעִיר — אָמַר רַבִּי הוּנָא: אִם זָכָה — יַעֲבֹד, וְאִם לָאו — יֵעֲבֵד.",
          es: "«Y el mayor servirá al menor» — dijo Rabí Huná: si merece, servirá; y si no, será servido.",
          source: "Bereshit Rabá 63:7",
        },
      },
      {
        p: `יַעֲבֹד, yaavod, «servirá» — activo. יֵעֲבֵד, yeaved, «será servido» — pasivo. Las mismas letras. La ambigüedad no es un defecto del versículo: es la condicionalidad moral metida dentro de la gramática.`,
      },
      {
        p: `Y Rashi dice la tercera versión de lo mismo, en el único versículo donde Esav recibe algo:`,
      },
      {
        cita: {
          label: "Rashi a Génesis 27:40, siguiendo Bereshit Rabá 67:7",
          he: 'תָּרִיד — לְשׁוֹן צַעַר, כְּמוֹ "אָרִיד בְּשִׂיחִי". כְּלוֹמַר, כְּשֶׁיַּעַבְרוּ יִשְׂרָאֵל עַל הַתּוֹרָה וְיִהְיֶה לְךָ פִּתְחוֹן פֶּה לְהִצְטַעֵר עַל הַבְּרָכוֹת שֶׁנָּטַל — וּפָרַקְתָּ עֻלּוֹ.',
          es: "Tarid — lenguaje de dolor, como «me aflijo en mi queja» (Sal 55:3). Es decir: cuando Israel transgreda la Torá y tengas tú pretexto para dolerte por las bendiciones que él tomó — «y romperás su yugo».",
          source: "Rashi a Génesis 27:40 · Bereshit Rabá 67:7",
        },
      },
      {
        etiqueta: "Tres fuentes clásicas, tres mecanismos distintos, una sola doctrina:",
        p: `el yugo de Esav no se rompe por fuerza de Esav. Se rompe por falla de Israel. Lo que Yaakov tomó, lo tiene a condición de merecerlo.`,
      },

      { head: "Rashi: la tierra que Esav dejó venía con un pagaré" },
      {
        p: `En el pshat, Esav sale de Canaán porque no hay pasto para dos. Pero Rashi, sobre ese mismo versículo, trae además el midrash agadá — y el midrash le pone al asunto un vocabulario jurídico que cambia la cuenta entera de este estudio.`,
      },
      {
        cita: {
          label: "Rashi a Génesis 36:7, midrash agadá",
          he: 'מִפְּנֵי שְׁטַר חוֹב שֶׁל גְּזֵרַת "כִּי גֵר יִהְיֶה זַרְעֲךָ" הַמֻּטָּל עַל זַרְעוֹ שֶׁל יִצְחָק. אָמַר: אֵלֵךְ לִי מִכָּאן, אֵין לִי חֵלֶק לֹא בַּמַּתָּנָה שֶׁנִּתְּנָה לוֹ הָאָרֶץ הַזֹּאת, וְלֹא בְּפִרְעוֹן הַשְּׁטָר; וּמִפְּנֵי הַבּוּשָׁה שֶׁמָּכַר בְּכוֹרָתוֹ.',
          es: "A causa del pagaré del decreto «ciertamente extranjero será tu descendencia», que pesa sobre la descendencia de Yitzjak. Dijo: me iré de aquí, no tengo parte ni en el regalo —que le fue dada esta tierra— ni en el pago del pagaré; y también a causa de la vergüenza de haber vendido su primogenitura.",
          source: "Rashi a Génesis 36:7",
        },
      },
      {
        nota: `De quién es cada voz, porque conviene no mezclarlas. Rashi lo introduce como מִדְרַשׁ אַגָּדָה —abreviado ומ״א en la edición impresa— y la fuente es Bereshit Rabá 82:13, donde las dos razones están repartidas entre dos sabios con nombre: «Rabí Eliezer dijo: a causa del pagaré, ‹ciertamente extranjero será tu descendencia›; Rabí Yehoshúa ben Leví dijo: a causa de la vergüenza». Rashi junta las dos en una sola glosa. Y el שְׁטַר חוֹב, el «pagaré», es el decreto de Génesis 15:13: «ciertamente extranjero será tu descendencia en tierra ajena... cuatrocientos años».`,
      },
      {
        p: `Hay que pesar lo que acaba de decir esa fuente. La tierra, en el midrash, no es solamente un premio: es un lote con dos partes, מַתָּנָה y שְׁטָר, un regalo y un pagaré. Y Esav renuncia a las dos a la vez, con esas palabras: no tengo parte ni en el regalo ni en el pago del pagaré.`,
      },
      {
        etiqueta: "El corolario, y va marcado como corolario, no como cita:",
        p: `si una de las dos partes renuncia al lote completo, el lote completo queda en la otra. La fuente formula la renuncia desde el lado de Esav — «no quiero ni una ni la otra». Que entonces Yaakov cargó con las dos es un paso nuestro, de un solo paso, sobre una fuente explícita, y así va dicho.`,
      },
      {
        p: `Y hay un segundo filo en la misma glosa, que ata el final del expediente con su primera página: la otra razón que da Rashi para la partida de Esav es la vergüenza de haber vendido su primogenitura. La toma número 1 de nuestro mapa, el guisado de lentejas, reaparece aquí como el motivo por el que Esav se va de la tierra en la toma número 7. El expediente se cierra citándose a sí mismo por el principio.`,
      },
      { head: "El Arizal: por qué los reyes de Edom están en esta parashá" },
      {
        p: `El capítulo 36 de Génesis es, en apariencia, el más aburrido de la parashá: una lista de reyes edomitas. En la Cabalá luriana es uno de los textos más cargados de toda la Torá. Y lo notable, para un estudio anclado en Vayishlaj, es que el Arizal lo dice nombrando nuestra parashá:`,
      },
      {
        cita: {
          label:
            "Sefer Etz Jaim, Portal 8 (Shaar Akudim Nekudim uBerudim), cap. 4",
          he: 'בְּצאת מִשָּׁם הַז\' תַּחְתּוֹנוֹת שֶׁהֵם הַז\' מְלָכִים שֶׁמָּלְכוּ בְּאֶרֶץ אֱדוֹם וְרָצוּ לִיכָּנֵס בְּכֵלִים שֶׁלָּהֶם וְלֹא יָכְלוּ הַכֵּלִים לִסְבּוֹל וְנִשְׁבְּרוּ וּמֵתוּ... וְדַע כִּי כָּל אֵלּוּ הֵם עִנְיַן הַמְּלָכִים הַנִּזְכָּר בְּפָרָשַׁת וַיִּשְׁלַח, "וְאֵלֶּה הַמְּלָכִים אֲשֶׁר מָלְכוּ בְּאֶרֶץ אֱדוֹם"... כָּל הָאוֹרוֹת נִסְתַּלְּקוּ מִתּוֹכָם וְנִשְׁאֲרוּ מָאנִין תְּבִירִין וְלֹא נִשְׁאֲרוּ בָּהֶם רַק בְּחִינַת רְפָ"ח נִיצוֹצִין.',
          es: "Al salir de allí las siete inferiores, que son los siete reyes que reinaron en la tierra de Edom, quisieron entrar en sus vasijas, y las vasijas no pudieron soportar, y se rompieron y murieron... Y sabe que todos estos son el asunto de los reyes mencionados en la parashá de Vayishlaj, «y estos son los reyes que reinaron en la tierra de Edom»... todas las luces se retiraron de dentro de ellos y quedaron vasijas rotas, y no quedó en ellos sino el aspecto de רפ\"ח chispas.",
          source: "Sefer Etz Jaim, Portal 8, cap. 4",
        },
      },
      {
        p: `רפ"ח se lee reipaj y es un número escrito con letras: ר(200) + פ(80) + ח(8) = 288 chispas.`,
      },
      { p: `La raíz de esto está en el Zohar, con otro vocabulario:` },
      {
        cita: {
          label: "Zohar, Sifrá diTzniutá 2:3",
          he: "וּמַלְכִין קַדְמָאִין מִיתוּ, וְזִיוּנֵיהוֹן לָא אִשְׁתַּכְּחוּ, וְאַרְעָא אִתְבַּטְּלָת.",
          es: "Y los reyes primordiales murieron, y sus armas no se hallaron, y la tierra fue anulada.",
          source: "Zohar, Sifrá diTzniutá 2:3",
        },
      },
      {
        p: `Está desarrollado citando Gn 36:31 textualmente en Zohar, Idrá Rabá 2:10-12 y Idrá Zutá 24:111-112, donde Edom se llama אֲתָר דְּדִינִין מִתְאַחֲדִין תַּמָּן, «el lugar donde los juicios se unen», y de los reyes se dice לָא אִתְקְיָימוּ, «no se sostuvieron».`,
      },
      {
        nota: `Precisión de atribución, porque importa: el término שְׁבִירַת הַכֵּלִים, «rotura de las vasijas», es terminología luriana, del Etz Jaim. El Zohar dice «murieron» y «no se sostuvieron». No se le debe poner al Zohar una palabra que es del Arizal.`,
      },
      {
        p: `Hay además una asimetría que no es error de nadie: el pshat cuenta ocho reyes de Edom; el Arizal cuenta siete. Y el octavo, Hadar, es justamente el único del que el Idrá Zutá dice que sí se sostuvo, porque es el único al que la Torá le da esposa — מְהֵיטַבְאֵל (Gn 36:39). Siete sin pareja se rompen; el octavo, con pareja, permanece. Ahí hay otro estudio entero.`,
      },
    ],
  },

  // ── 6. פרד״ס ────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [],
    bloques: [
      { head: "פְּשָׁט — Pshat" },
      {
        p: `En el nivel llano, el relato no esconde nada y no pide disculpas. Esav despreció la primogenitura — וַיִּבֶז עֵשָׂו אֶת־הַבְּכֹרָה (Gn 25:34), y el verbo es de la Torá, no de los rabinos. Vendió lo que tenía por lo que le apetecía en ese momento, y su propia frase lo delata: «¿y para qué quiero yo una primogenitura?» (25:32). El Talmud lee en esa frase una negación de la resurrección, porque quien dice «voy a morir de todos modos» ya decidió que esto es todo lo que hay (Bavá Batrá 16b).`,
      },
      {
        p: `Y en el pshat, Esav también se va solo. La Torá da la razón, y es económica, no teológica:`,
      },
      {
        cita: {
          label: "Génesis 36:7",
          he: "כִּֽי־הָיָ֧ה רְכוּשָׁ֛ם רָ֖ב מִשֶּׁ֣בֶת יַחְדָּ֑ו וְלֹ֨א יָֽכְלָ֜ה אֶ֤רֶץ מְגֽוּרֵיהֶם֙ לָשֵׂ֣את אֹתָ֔ם מִפְּנֵ֖י מִקְנֵיהֶֽם׃",
          es: "Porque eran sus bienes demasiados para habitar juntos, y la tierra de su residencia no podía sostenerlos a causa de sus ganados.",
          source: "Génesis 36:7",
        },
      },
      {
        p: `Es el mismo versículo que separó a Abraham y Lot (Gn 13:6). El pshat de la separación es pasto, no destino.`,
      },

      { head: "רֶמֶז — Remez" },
      {
        p: `El remez está en las palabras, y ya lo vimos: בכרה y ברכה son las mismas cuatro letras. Y está en el את que falta en Génesis 25:23.`,
      },
      {
        p: `Hay un detalle que cierra ese arco y es dato textual, no ocurrencia. La profecía del vientre omite la partícula את y por eso queda ambigua. Y en el último versículo del libro que habla del juicio final sobre Esav, la partícula está puesta:`,
      },
      {
        cita: {
          label: "Ovadiá 1:21",
          he: "וְעָל֤וּ מֽוֹשִׁעִים֙ בְּהַ֣ר צִיּ֔וֹן לִשְׁפֹּ֖ט אֶת־הַ֣ר עֵשָׂ֑ו וְהָיְתָ֥ה לַֽיהֹוָ֖ה הַמְּלוּכָֽה׃",
          es: "Y subirán salvadores al monte Tzión para juzgar al monte de Esav, y será del Eterno el reino.",
          source: "Ovadiá 1:21",
        },
      },
      {
        p: `לִשְׁפֹּט אֶת־הַר עֵשָׂו, «para juzgar al monte de Esav». Ahí no hay duda de quién es el objeto. La profecía empieza sin את y termina con את. Lo que al principio quedó indeterminado, al final queda marcado.`,
      },

      { head: "דְּרָשׁ — Drash" },
      {
        p: `El drash es donde el patrón se vuelve doctrina, y donde la tradición hace algo valiente: le da la razón a Esav en parte.`,
      },
      {
        p: `Porque el drash no dice que Esav no tuviera nada. Dice que tenía, y mucho, y que había una porción suya que Yaakov no tomó y no podía tomar. Lo dice el midrash, en boca de un príncipe de Israel que se compara con Esav y sale perdiendo:`,
      },
      {
        cita: {
          label: "Devarim Rabá 1:15",
          he: "אָמַר רַבָּן שִׁמְעוֹן בֶּן גַּמְלִיאֵל: לֹא כִּבֵּד בְּרִיָּה אֶת אֲבוֹתָיו כְּמוֹ אֲנִי אֶת אֲבוֹתַי, וּמָצָאתִי שֶׁכִּבֵּד עֵשָׂו לְאָבִיו יוֹתֵר מִמֶּנִּי. כֵּיצַד? הָיִיתִי מְשַׁמֵּשׁ אֶת אָבִי בְּכֵלִים צוֹאִים, וּכְשֶׁהָיִיתִי הוֹלֵךְ לַשּׁוּק הָיִיתִי מַשְׁלִיךְ אוֹתָן הַכֵּלִים וְלוֹבֵשׁ כֵּלִים נָאִים... אֲבָל עֵשָׂו לֹא הָיָה עוֹשֶׂה כֵן.",
          es: "Dijo Rabán Shimón ben Gamliel: ninguna criatura honró a sus padres como yo a los míos, y encontré que Esav honró a su padre más que yo. ¿Cómo? Yo servía a mi padre con ropas sucias, y cuando iba al mercado me quitaba esas ropas y me vestía con ropas buenas... pero Esav no hacía así.",
          source: "Devarim Rabá 1:15",
        },
      },
      {
        p: `Y en Bereshit Rabá la versión es todavía más dura con el que la dice: «no lo serví ni una centésima parte de lo que Esav sirvió a su padre... Esav, cuando servía a su padre, no lo servía sino con ropas reales (בְּבִגְדֵי מַלְכוּת), y decía: no es honra de mi padre que lo sirva sino con ropas reales» (Bereshit Rabá 65:16).`,
      },
      {
        p: `Hay que leer esto con el estómago. La misma tradición que llama rashá a Esav dice que honraba a su padre mejor que un patriarca de la Mishná. Esa porción Yaakov no la tomó. Y el midrash la cobra: cuando Israel va a pasar por el territorio de Esav, se le dice que no puede atacarlo, porque «hasta ahora se le debe la paga del honor con que honró a los que están sepultados en este monte» (Devarim Rabá 1:15).`,
      },
      {
        p: `Y aquí se ve el filo doble de todo el asunto. Las ropas que Esav usaba para honrar a su padre son — según el mismo midrash — las ropas que Rivká le puso a Yaakov para engañar a ese padre:`,
      },
      {
        cita: {
          label: "Bereshit Rabá 65:16",
          he: "אֲשֶׁר אִתָּהּ בַּבָּיִת — שֶׁבָּהֶן הָיָה מְשַׁמֵּשׁ אֶת אָבִיו.",
          es: "«Que estaban con ella en la casa» — con ellas servía a su padre.",
          source: "Bereshit Rabá 65:16",
        },
      },
      {
        p: `La toma número 5 de nuestro mapa es, exactamente, el instrumento del kibud av de Esav usado para suplantar a Esav ante el padre al que honraba. Eso es lo más incómodo que dice este estudio, y no lo voy a suavizar. Está en el midrash y hay que leerlo.`,
      },

      { head: "סוֹד — Sod" },
      {
        p: `El Sod de este estudio se dice en una palabra: בֵּרוּר, berur, «separación, clarificación, discernimiento». La tesis interior es que Yaakov no acumula: separa. No quita lo ajeno — saca lo propio de donde estaba alojado.`,
      },
      {
        p: `Hay dos fuentes detrás de esto, y cada una pone una mitad.`,
      },
      {
        etiqueta: "Primera: el Arizal, y es el fundamento objetivo.",
        p: `Ya lo citamos: los siete reyes de Edom son las vasijas que se rompieron, y de ellas quedaron רפ"ח — 288 chispas (Etz Jaim 8:4). Si las chispas de luz cayeron en el lugar llamado Edom, entonces hay luz santa alojada del lado de Esav. Eso no es nuestra lectura: es el Arizal, y lo dice nombrando Vayishlaj.`,
      },
      {
        etiqueta: "Segunda: Izhbitza, y es la formulación más limpia que encontré.",
        p: `Comentando precisamente el יֶשׁ־לִי־כֹל (yesh li jol), «tengo todo», de Génesis 33:11, el Beit Yaakov escribe:`,
      },
      {
        cita: {
          label: "Beit Yaakov sobre la Torá, Vayishlaj 5:3",
          he: 'וְכֵן אָמַר לְיַעֲקֹב "יֶשׁ לִי רָב", הַיְינוּ כֹּחַ עָצוּם וְאוֹר רָב. וְאָבִינוּ יַעֲקֹב הֵשִׁיב לוֹ "יֶשׁ לִי כֹּל" — הִתְכַּלְלוּת מִכָּל הָאוֹרוֹת וְכֹחוֹת, וְאַף כֹּחַ שֶׁלְּךָ גַּם כֵּן נִכְלָל בִּי, וְזֶהוּ עִיקַּר הַשְּׁלֵימוּת.',
          es: "Y así le dijo [Esav] a Yaakov: «tengo mucho» — es decir, una fuerza inmensa y mucha luz. Y nuestro padre Yaakov le respondió: «tengo todo» — la inclusión de todas las luces y fuerzas, y también tu fuerza está incluida en mí, y eso es la esencia de la completitud.",
          source: "Beit Yaakov, Vayishlaj 5:3",
        },
      },
      {
        p: `Ahí está dicho, en una fuente jasídica, exactamente lo que buscábamos: «también tu fuerza está incluida en mí». Esav dice «tengo mucho» — רָב, cantidad. Yaakov dice «tengo todo» — כֹּל, inclusión. Y la diferencia entre mucho y todo no es de tamaño: es que todo incluye lo del otro.`,
      },
      {
        p: `El Sefat Emet, sobre el mismo versículo, lo dice por el lado de la raíz: «quien está adherido a la raíz superior, lo que tiene es el aspecto de "todo"... pero Esav dijo "mucho", y es la multiplicación que viene de la fuerza del hombre» (Sefat Emet, Génesis, Vayishlaj 1:5).`,
      },
      {
        nota: `Conviene decir dónde termina la fuente y dónde empieza la meditación. El Arizal pone las chispas en Edom; Izhbitza pone la inclusión de la fuerza del otro. Ninguna fuente clásica junta las dos cosas y dice que por eso las ocho tomas sean un berur: eso es lectura de Jashmal, hecha sobre fuentes verificadas, y va dicho así.`,
      },
    ],
  },

  // ── 7. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro:
      "Ahora deja de leer fuentes y mira el patrón entero. Porque hay algo en esta historia que no se resuelve con una tabla.",
    parrafos: [],
    bloques: [
      {
        p: `Lo que ves primero es un hombre que toma ocho veces. Y lo que ves después, si sigues mirando, es un hombre que paga por cada una.`,
      },
      {
        p: `Mira el precio, pieza por pieza, porque ya quedó todo dicho atrás. Toma la bendición con ropas ajenas, y pasa veinte años huyendo. Toma a la hermana mayor que no era para él, y vive una casa partida en dos y a sus mujeres disputándose la primogenitura que él le había quitado a su hermano. Toma la tierra, y con la tierra toma la deuda: el regalo y el pagaré venían en el mismo lote, y Esav se fue renunciando a los dos.`,
      },
      {
        p: `Entonces el patrón se da vuelta delante de ti. Yaakov no se quedó con las ventajas de su hermano. Se quedó con el expediente entero: la tierra y los cuatrocientos años, la bendición y los veinte años de servidumbre en casa de Laván, la primogenitura y el servicio que la primogenitura obliga a hacer. Esav eligió la parte sin factura. Yaakov se quedó con la parte que viene con factura.`,
      },
      {
        p: `Siéntate un momento en eso, porque es incómodo y es tuyo también. Lo que pediste y se te dio nunca vino solo. Vino con su carga, y la carga no se negocia aparte. Casi nadie mira la factura antes de pedir; y casi nadie, cuando le llega, se acuerda de que la pidió.`,
      },
      {
        p: `Y entonces entiendes por qué Vayishlaj es el lugar del cierre, y por qué el cierre tiene esa forma tan extraña. Porque lo que Yaakov hace en el encuentro es exactamente lo contrario de lo que la bendición le concedía. La bendición decía: sé señor de tus hermanos, y que se inclinen ante ti los hijos de tu madre. Y lo primero que hace Yaakov con el hijo de su madre es inclinarse siete veces, llamarse siervo y llamarlo «mi señor». Las dos palabras que la bendición le había puesto en la mano, se las devuelve dichas al otro.`,
      },
      {
        p: `Eso es lo que hay que entender de esta parashá, y es lo que ninguna tabla de tomas puede decir. Yaakov no cierra el expediente cobrando. Lo cierra devolviendo el gesto. No devuelve la bendición — no puede, y ya vimos que ni lo intentó. Devuelve la postura. Se pone, voluntariamente y de frente, en el lugar que la bendición le había quitado a su hermano.`,
      },
      {
        p: `Mídete con eso un momento, porque aquí se separa lo barato de lo caro. Es más fácil devolver una cosa que devolver una postura. La cosa se entrega y se acaba. La postura hay que sostenerla delante de alguien que puede no aceptarla. Yaakov se inclina siete veces sin saber todavía si su hermano viene a abrazarlo o a matarlo.`,
      },
      {
        p: `Y solo después de eso — después de inclinarse siete veces, después de llamarlo señor, después de decirle «toma mi bendición» — la Torá dice וַיִּקָּח, «y tomó». El verbo del delito aparece por última vez entre estos dos hermanos, y esta vez el que toma es el que había sido despojado, y toma porque se lo pidieron.`,
      },
      {
        p: `Hay una pregunta que este estudio deja en tus manos y no va a contestar por ti. Las ocho tomas se pueden leer de dos maneras, y las dos son defendibles con las fuentes que ya leíste. Se pueden leer como un hombre que supo siempre lo que era suyo y fue a buscarlo. Y se pueden leer como un hombre que pasó toda su vida pagando por haber tenido razón demasiado pronto.`,
      },
      {
        p: `Pregúntatelo de ti, que es para lo que sirve esta sección: ¿cuál de las dos lecturas usas contigo mismo, y cuál usas con el que tienes enfrente? Porque casi todos nos leemos con la primera y leemos al otro con la segunda, y a esa asimetría se le va la vida entera de una familia.`,
      },
      {
        p: `El único que zanja la pregunta es el Cielo, y lo hace en Peniel, cuando le cambia el nombre y le dice que de ahora en adelante las bendiciones no se dirán con astucia sino a rostro descubierto. Lo que estaba mal no era el contenido. Era el modo. Y el modo se puede cambiar — esa es la noticia entera de la parashá, y es la única parte de todo esto que depende de ti.`,
      },
    ],
  },

  // ── 8. מַעֲשֶׂה ──────────────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta, hoy, y sale directamente del texto.",
    etiqueta:
      "Mira algo que tomaste teniendo razón, y devuélvele el gesto a la persona a la que se lo tomaste.",
    texto: `No la cosa. El gesto. La diferencia es todo, y es lo que hace Yaakov en 33:3-11.`,
    bloques: [
      {
        p: `Hay cosas que uno toma con razón y que no se pueden devolver, porque ya se vivieron, porque cambiaron a todo el mundo, porque devolverlas sería una farsa. Un lugar que te correspondía y alguien más quería. Una razón que tenías en una discusión y la usaste entera. Un reconocimiento que era tuyo y lo cobraste delante de alguien que lo necesitaba más.`,
      },
      {
        p: `Yaakov no deshace nada de eso. Sigue siendo el portador de la bendición, y lo sabe, y no la suelta. Lo que hace es ponerse, por decisión propia, en la postura que su victoria le había quitado al otro. Se inclina. Dice «mi señor». Le pide un favor al que venció. Le pone a su regalo el nombre exacto de la cosa por la que el otro lo acusó, y se lo ofrece.`,
      },
      { p: `Concretamente, hoy:` },
      {
        etiqueta: "1. Nombra la cosa.",
        p: `Yaakov no dice «mi obsequio»: dice mi bendición. Usa la palabra que el otro usaría. No el eufemismo que te protege.`,
      },
      {
        etiqueta: "2. Inclínate primero.",
        p: `Antes de que te lo pidan, antes de saber si te lo van a aceptar. Yaakov se inclina siete veces antes de llegar a su hermano — עַד־גִּשְׁתּוֹ עַד־אָחִיו, «hasta acercarse a su hermano».`,
      },
      {
        etiqueta: "3. No conviertas la devolución en una factura.",
        p: `Yaakov insiste hasta que Esav acepta (וַיִּפְצַר־בּוֹ), y no le pide nada a cambio. Cuando Esav le ofrece acompañarlo, Yaakov declina y sigue su camino.`,
      },
      {
        p: `Y una midá para trabajar esta semana, que es la que gobierna todo esto: la de reconocer en voz alta la porción del otro. Rabán Shimón ben Gamliel, príncipe de Israel, dijo que Esav honró a su padre mejor que él. Lo dijo él, de sí mismo, en voz alta, y la tradición lo conservó. Esa capacidad de nombrar lo bueno del que está enfrente, sin que te cueste tu propio lugar, es exactamente lo que le faltó a esta familia durante tres generaciones y lo que aparece, por fin, en el abrazo de Génesis 33:4.`,
      },
    ],
  },

  // ── 9. חֲתִימָה ──────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "La idea principal.",
        texto: `Yaakov toma ocho veces lo que estaba del lado de su hermano, y la Torá lo dice sin disimulo: el propio Esav lleva la cuenta y la empieza en dos. Pero el expediente no se cierra con la octava toma. Se cierra en Vayishlaj, cuando lo tomado se vuelve legítimo de frente: el nombre cambia, el ángel de Esav concede las bendiciones, los territorios se separan por decreto, y Yaakov le ofrece a su hermano «mi bendición» usando el verbo exacto del delito. Y el expediente se cierra también en la tierra: la parcela que Esav llega a reclamar en la cueva es la que sobra después de que Lea — la hermana que era su porción — ocupó la de Yaakov.`,
      },
      {
        etiqueta: "El insight clave.",
        texto: `Las dos cosas que Esav dice que le tomaron son la misma palabra con las letras cambiadas de orden: בְּכֹרָה y בְּרָכָה, 227 y 227. Y la profecía que gobierna todo el asunto está escrita sin la partícula את, de modo que no se sabe quién sirve a quién — y el Radak dice que está así a propósito, porque la historia va a ir en las dos direcciones.`,
      },
      {
        etiqueta: "El insight espiritual.",
        texto: `Esav se fue renunciando al regalo y al pagaré. Yaakov no heredó las ventajas de su hermano: heredó el lote completo, con la deuda incluida. La tierra con los cuatrocientos años. La bendición con los veinte años en casa de Laván. La primogenitura con el servicio que obliga. Quien toma la porción de otro, toma su factura.`,
      },
      {
        etiqueta: "El insight del nombre.",
        texto: `הַקָּטָן, «el pequeño», era la etiqueta que otros le ponían a Yaakov mientras tomaba — y aparece en el mismo versículo en que le visten las ropas de su hermano (Gn 27:15). En Vayishlaj, por primera vez, lo conjuga él: קָטֹנְתִּי (Gn 32:11). Y treinta y tres versículos después devuelve la bendición. Mientras «pequeño» fue un apodo ajeno, Yaakov tomaba; cuando «pequeño» se volvió un verbo propio, Yaakov devolvió.`,
      },
      {
        etiqueta: "La aplicación práctica.",
        texto: `Lo que estaba mal no era el contenido de la bendición: era el modo de tenerla. עָקְבָּה וּרְמִיָּה se puede convertir en שְׂרָרָה וְגִלּוּי פָּנִים — astucia y engaño se pueden convertir en señorío y rostro descubierto — y eso es posible sin devolver la cosa. Se devuelve el gesto. Se nombra la cosa con su nombre. Se inclina uno primero. Y se cruza el río con miedo y sin saldo, que es como se cruza de verdad.`,
      },
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  //  El markdown del Sofer trae SEIS puentes. Dos se retiraron al montar porque
  //  apuntan a estudios que todavía NO existen y no hay contenido escrito ni
  //  verificado detrás: {{study:reyes-edom|Los reyes que no se sostuvieron}} y
  //  {{study:katonti|Katonti — la cuenta vacía}}. Quedan apuntados como
  //  pendientes: preferimos un chip menos a un enlace muerto. No se crean esas
  //  páginas desde infraestructura.
  hemshej: [
    "Si Yaakov nació agarrado de un talón, ¿qué es un talón en la Torá? → {{study:eikev-talon|El talón que agarró el destino}}",
    "La palabra con la que empieza todo esto encabeza trece genealogías del Tanaj, y solo dos están escritas completas. ¿Por qué? → {{study:toldot-palabra|El rastro de la palabra toldot}}",
    "El padre que bendijo a ciegas: ¿por qué la Torá tartamudea al nombrarlo? → {{study:rostro-isaac|El rostro que la burla no pudo borrar}}",
    "La letra que abre «bendición» y «primogenitura», y las separa. → {{letter:kaf|La kaf — la palma que contiene}}",
  ],

  ctaRef: "Genesis 33:11",
};
