import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — הַגּוֹרָל · el goral, Agag y David
//  Serie «Tiempos Sagrados» (moadim) — el eje que va de Yom Kipur a Purim.
//
//  ORIGEN: este estudio nace de un JIDUSH PROPIO DE MARDAN KADIVAR (la lectura
//  del dado: el complemento a 7 de אגג). El Sofer verificó el expediente entero
//  el 19 de septiembre de 2026 (~/jashmal-produccion/goral-agag-david/
//  FUENTES-VERIFICADAS.md, 479 líneas) y el rotulado que se acordó allí se
//  aplica AQUÍ, en tres lugares visibles: el aviso de apertura, el párrafo de
//  רֶמֶז y la nota de autor tras la חֲתִימָה. NO va en letra chica.
//
//  LÍNEA ROJA DE GERENCIA, ACATADA: este estudio NO entra por Vaikrá 16, ni por
//  los dos machos cabríos, ni por Azazel. Ni una sola vez. El goral de aquí es
//  el goral de Ester (3:7 · 9:24) y el goral de Mishlei 16:33. La puerta que
//  conecta el día con la suerte de Hamán es Ester Rabá 7:11 (Tishrei la rechazó
//  por el mérito del shofar, del Kipur y de las fiestas), no el sorteo del
//  Templo.
//
//  FUENTES VERIFICADAS LITERALMENTE CONTRA LA API DE SEFARIA (2026-09-19).
//  Todo el hebreo citado abajo se trajo de la API en esa sesión; ninguna cita
//  viene de memoria. Toda gematría se recalculó letra por letra.
//
//  TANAJ
//   · Ester 2:5 · 3:1 · 3:7 · 9:1 · 9:24 · 9:25 — el pur que «es el goral», el
//     título הָאֲגָגִי, «וְנַהֲפוֹךְ הוּא» y «עַל־רֹאשׁוֹ».
//   · Shemot 17:16 — «כִּי־יָד עַל־כֵּס יָהּ» (con la nota masorética: en el
//     Códice de Alepo, כֵּסְיָה en una sola palabra).
//   · Shmuel I 9:1 · 15:8 · 15:28 · 15:33 · 16:13 · 30:17-18.
//   · Shmuel II 1:8-16 — el amalekita que trae la corona; «דָּמְךָ עַל־רֹאשֶׁךָ».
//   · Divrei HaYamim I 4:43 · 29:23.
//   · Mishlei 16:33 · Tehilim 125:3.
//
//  TALMUD Y MIDRASH
//   · Sanhedrín 20b:11-12 — las TRES mitzvot al entrar a la Tierra, «primero el
//     rey», y «וְאֵין כִּסֵּא אֶלָּא מֶלֶךְ» probado con Divrei HaYamim I 29:23,
//     que es el trono de la casa de David. Es la fuente más fuerte del estudio.
//   · Meguilá 13a:1 — «דְּלָא קַטְלֵיהּ שָׁאוּל לַאֲגָג, דְּאִתְיְלִיד מִינֵּיהּ הָמָן».
//   · Meguilá 12b:17 — la baraita que lee los nombres de Ester 2:5 como
//     EPÍTETOS («בֶּן קִישׁ — שֶׁהִקִּישׁ עַל שַׁעֲרֵי רַחֲמִים»). Matiz obligatorio.
//   · Ester Rabá 7:11 — Tishrei rechaza la suerte por «זְכוּת שׁוֹפָר וְכִפּוּר
//     וּרְגָלִים»; y «עָלָיו נָפַל הַגּוֹרָל», con Tehilim 125:3.
//   · Targum Shení a Ester 2:5 — genealogía de Mordejai hasta Shaúl.
//   · Pirkei deRabí Eliezer 49 — el enemigo del linaje de Agag, el vengador de
//     la simiente de Shaúl (verificado en expediente previo).
//   · Tikunei Zohar 57b:8 y 57b:10 (Tikún 21, = 42b:2–63a:9, confirmado contra
//     el índice) — «פורים אתקריאת על שם יום הכפורים» (la dirección es ESA:
//     Purim se llama por Yom haKipurim) y Ester vistiendo las vestiduras de
//     expiación para entrar «לפני לפנים».
//
//  GEMATRÍAS RECALCULADAS LETRA POR LETRA EN ESTA VERIFICACIÓN
//    אֲגָג = א1+ג3+ג3 = 7        ·  דָּוִד = ד4+ו6+ד4 = 14
//    יָד  = י10+ד4 = 14          ·  3 caras × 7 = 21 → 21−7 = 14 (necesidad)
//    אֲגָגִי = 17 · הָאֲגָגִי = 22
//    פּוּרִים = 336 · כְּפֻרִים = 350 · הַכִּפּוּרִים = 361  (NO coinciden: por eso
//      «Yom haKipurim = ki-Purim» NO es gematría, es juego de palabras)
//    כֵּס יָהּ = 95 = הָמָן  (cierto, calculado — pero NO se lidera con él)
//
//  ROTULADO OBLIGATORIO (no negociable, aplicado en todo el archivo)
//   · El complemento a 7 del dado NO ES FUENTE JUDÍA. Es convención de dados.
//     Es LECTURA PROPIA DE MARDAN KADIVAR y va nombrada así, con su nombre.
//   · El reverso de אגג leído en el mismo orden da ו-ד-ד, NO דוד. Son las
//     mismas tres letras REORDENADAS. Se confiesa en el cuerpo, no se esconde.
//   · Se lidera con el VALOR (7 → 14, que es forzoso), no con las letras.
//   · יָד = דָּוִד = 14: cálculo nuestro, NO se halló fuente clásica. Rotulado.
//   · «Kipurim = ki-Purim» NO se atribuye al Arizal ni al Ramak (no localizado).
//     Solo al Tikunei Zohar, Tikún 21, folio 57b.
//   · Rashi (Shemot 17:16) lleva «trono» al TRONO DIVINO. Quien lo lleva a
//     «rey» es Sanhedrín 20b. De Rashi se recoge el sentido, NO se cita hebreo
//     suyo: en esta verificación no se coteja su texto literal.
//
//  DESCARTADO, Y POR QUÉ
//   · «336 es la gematría de Agag» — FALSO. אגג = 7. 336 es פורים. No se usa.
//   · «Hamán echó la suerte en Yom Kipur» — FALSO. Ester 3:7 dice NISÁN, con
//     todas las letras. Se dice lo contrario, y se dice fuerte.
//   · «David terminó con Amalek» — FALSO. Shmuel I 30:17: escaparon 400; el
//     resto cae en tiempos de Jizkiyahu (Divrei HaYamim I 4:43).
//   · Cabalá luriana sobre Agag/David — NO LOCALIZADA en esta verificación. No
//     se cita ninguna. Se dice en el propio מְפָרְשִׁים por qué no la hay aquí.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "goral-agag-david",

  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · el goral — el eje que va de Yom Kipur a Purim",
    serielabelFa:
      "سری «زمان‌های مقدس» · گورال — محوری که از یوم کیپور تا پوریم کشیده می‌شود",
    he: "הַגּוֹרָל",
    titulo: "El goral — Agag y David",
    tituloFa: "گورال — اَگاگ و داوود",
    ganchoEs:
      "El exterminio de un pueblo entero no se decidió en una reunión: se sorteó. Hamán echó una suerte para elegir el mes, y el texto se detiene a traducir la palabra persa al hebreo — pur, «que es el goral». Y el que tiró esa suerte no era cualquiera: era de la casa del único rey de Amalek al que un rey de Israel perdonó la vida.",
    ganchoFa:
      "نابودیِ یک قوم در جلسه‌ای تصمیم گرفته نشد: قرعه‌کشی شد. هامان قرعه انداخت تا ماه را برگزیند، و متن می‌ایستد تا واژهٔ پارسی را به عبری برگردانَد — پور، «که همان گورال است». و آن که قرعه را انداخت هر کسی نبود: از خاندانِ تنها پادشاهِ عمالیق بود که پادشاهی از اسرائیل جانش را بخشید.",
    dimensiones: [
      { es: "Una suerte eligió la fecha", fa: "قرعه‌ای تاریخ را برگزید" },
      { es: "Amalek no cae sin rey", fa: "عمالیق بی‌پادشاه فرو نمی‌افتد" },
      { es: "Lo que se echa, se voltea", fa: "آنچه انداخته می‌شود، برمی‌گردد" },
    ],
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — cinco cosas que este estudio NO afirma",
    rotulo:
      "Se dicen de entrada, antes de entrar en materia, porque este estudio nace de una lectura propia y la credibilidad de todo lo demás depende de que esa frontera esté marcada con tiza gruesa.",
    parrafos: [
      `Primero, y es lo principal. El corazón de este estudio es un jidush —una lectura nueva— de Mardan Kadivar: que si las letras de אֲגָג valen uno, tres y tres, y en un dado las caras opuestas suman siete, entonces «debajo» de Agag hay seis, cuatro y cuatro. Esa regla del dado NO ES UNA FUENTE JUDÍA. No es cabalística, no es talmúdica, no está en ninguna de las transformaciones alfabéticas de la tradición (la única que complementa, Atbaj, complementa a diez, y sobre אגג no da nada). Es convención de dados y es lectura de Mardan. Va rotulada así aquí, en el cuerpo, y otra vez en su propia nota al final. Lo que sí está verificado es la aritmética, dígito por dígito.`,
      `Segundo, el orden de las letras, y esto lo detectó Mardan solo antes de que nadie se lo señalara. אֲגָג es álef-guímel-guímel. Al voltear cada cara, el álef (1) se convierte en vav (6), de modo que el reverso, leído en el mismo orden, da ו-ד-ד. No da דָּוִד. Son exactamente las mismas tres letras, pero hay que REORDENARLAS para leer «David». Se dice aquí, se dice en el cuerpo del estudio y se dice en la nota final. Quien lea en Jashmal «voltea Agag y sale David» que nos lo reclame: nunca lo dijimos, y no lo vamos a decir.`,
      `Tercero, la fecha. Circula mucho —en español, en redes, en sermones— que Hamán echó la suerte en Yom Kipur. Es falso y se desmiente en diez segundos con la Meguilá abierta: Ester 3:7 dice «בַּחֹדֶשׁ הָרִאשׁוֹן הוּא־חֹדֶשׁ נִיסָן», en el mes primero, que es el mes de Nisán. El puente verdadero entre este día y aquella suerte existe y es mejor que el falso: el Midrash cuenta que la suerte NO PUDO caer en Tishrei, precisamente por el mérito del Kipur. Está adentro, en מְפָרְשִׁים.`,
      `Cuarto, David y Amalek. Este estudio NO dice que David terminara con Amalek, porque el propio texto lo desmiente: en Shmuel I 30:17 escapan cuatrocientos jóvenes en camellos, y Divrei HaYamim I 4:43 pone el final del asunto siglos después, en tiempos de Jizkiyahu. Lo que sí se dice, y es distinto: David es el primero que los derrota de verdad, y es el rey al que pasa el trono que Shaúl perdió por perdonar a Agag.`,
      `Y quinto, dos números que hay que desactivar antes de que alguien los repita en nuestro nombre. אֲגָג vale SIETE, no 336 — 336 es la gematría de פּוּרִים, y es de otra frase. Y «Yom haKipurim = ki-Purim» NO es una gematría: כְּפֻרִים da 350, פּוּרִים da 336 y הַכִּפּוּרִים da 361, y ninguno coincide con ninguno. Es un juego de palabras, antiguo y precioso, y está en el Tikunei Zohar — no en el Arizal ni en el Ramak, a quienes se lo atribuyen sin papeles. Los tres cálculos se rehicieron letra por letra en esta verificación.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — ocho frases, un solo movimiento",
    intro: [
      `Este estudio sigue una sola línea y no vuelve atrás: alguien echó una suerte, resulta que el que la echó venía de un perdón mal puesto, resulta que ese perdón le costó un trono a una casa y se lo dio a otra, y resulta que la suerte terminó cayendo sobre quien la echó. Todo lo demás son notas al pie de esas cuatro frases.`,
    ],
    filas: [
      {
        ref: "Ester 3:7",
        he: "הִפִּיל פּוּר הוּא הַגּוֹרָל",
        es: "Echó pur, que es la suerte",
        funcion: "La fecha del exterminio se sorteó. Y el texto traduce la palabra.",
      },
      {
        ref: "Ester 3:1 · 9:24",
        he: "הָמָן בֶּן־הַמְּדָתָא הָאֲגָגִי",
        es: "Hamán hijo de Hamdatá, el agaguita",
        funcion: "Dos veces el mismo título. La Meguilá no deja olvidar de dónde viene.",
      },
      {
        ref: "Shmuel I 15:8",
        he: "וַיִּתְפֹּשׂ אֶת־אֲגַג מֶלֶךְ־עֲמָלֵק חָי",
        es: "Y capturó vivo a Agag, rey de Amalek",
        funcion: "La palabra que abre el hilo entero: «vivo».",
      },
      {
        ref: "Meguilá 13a",
        he: "דְּלָא קַטְלֵיהּ שָׁאוּל לַאֲגָג, דְּאִתְיְלִיד מִינֵּיהּ הָמָן",
        es: "Porque Shaúl no mató a Agag, de él nació Hamán",
        funcion: "La bisagra, y es Talmud: quinientos años de causa y efecto.",
      },
      {
        ref: "Shmuel I 15:28",
        he: "קָרַע יְהֹוָה אֶת־מַמְלְכוּת יִשְׂרָאֵל מֵעָלֶיךָ",
        es: "Rasgó YHVH el reino de Israel de sobre ti",
        funcion: "Trece versículos después del perdón. El capítulo siguiente unge a David.",
      },
      {
        ref: "Sanhedrín 20b · Divrei HaYamim I 29:23",
        he: "וְאֵין כִּסֵּא אֶלָּא מֶלֶךְ",
        es: "Y «trono» no es otra cosa que rey",
        funcion: "Amalek no cae sin rey. Y el versículo que el Talmud elige es el trono de David.",
      },
      {
        ref: "Shmuel II 1:16 · Ester 9:25",
        he: "דָּמְךָ עַל־רֹאשֶׁךָ · יָשׁוּב מַחֲשַׁבְתּוֹ הָרָעָה עַל־רֹאשׁוֹ",
        es: "Tu sangre sobre tu cabeza · que vuelva su designio sobre su cabeza",
        funcion: "Misma palabra, ראש, y mismo movimiento de vuelta, con quinientos años en medio.",
      },
      {
        ref: "Mishlei 16:33",
        he: "בַּחֵיק יוּטַל אֶת־הַגּוֹרָל וּמֵיְהֹוָה כׇּל־מִשְׁפָּטוֹ",
        es: "En el regazo se echa la suerte, y de YHVH es todo su juicio",
        funcion: "La clave de bóveda. Un versículo que declara que no existe el azar.",
      },
    ],
    cierre: [
      `Las cinco primeras frases construyen la cadena. La sexta explica por qué la cadena pasa obligatoriamente por un rey. Las dos últimas dicen lo que le pasa a una suerte cuando termina de caer.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "La suerte que eligió la fecha — Ester 3:7 (y fíjate en el mes)",
        he: "בַּחֹדֶשׁ הָרִאשׁוֹן הוּא־חֹדֶשׁ נִיסָן בִּשְׁנַת שְׁתֵּים עֶשְׂרֵה לַמֶּלֶךְ אֲחַשְׁוֵרוֹשׁ, הִפִּיל פּוּר הוּא הַגּוֹרָל לִפְנֵי הָמָן, מִיּוֹם לְיוֹם וּמֵחֹדֶשׁ לְחֹדֶשׁ שְׁנֵים־עָשָׂר הוּא־חֹדֶשׁ אֲדָר׃",
        es: "En el mes primero, que es el mes de Nisán, en el año doce del rey Ajashverosh, se echó pur —que es la suerte— delante de Hamán, de día en día y de mes en mes, hasta el mes doce, que es el mes de Adar.",
        source: "Ester 3:7",
      },
      {
        label: "Y lo repite al final del libro, por si alguien no lo oyó — Ester 9:24",
        he: "כִּי הָמָן בֶּן־הַמְּדָתָא הָאֲגָגִי צֹרֵר כׇּל־הַיְּהוּדִים חָשַׁב עַל־הַיְּהוּדִים לְאַבְּדָם, וְהִפִּל פּוּר הוּא הַגּוֹרָל לְהֻמָּם וּלְאַבְּדָם׃",
        es: "Porque Hamán hijo de Hamdatá, el agaguita, enemigo de todos los judíos, había tramado contra los judíos destruirlos, y echó pur —que es la suerte— para aplastarlos y destruirlos.",
        source: "Ester 9:24",
      },
      {
        label: "Dónde empieza todo: la palabra «vivo» — Shmuel I 15:8",
        he: "וַיִּתְפֹּשׂ אֶת־אֲגַג מֶלֶךְ־עֲמָלֵק חָי, וְאֶת־כׇּל־הָעָם הֶחֱרִים לְפִי־חָרֶב׃",
        es: "Y capturó vivo a Agag, rey de Amalek, y a todo el pueblo lo consagró al filo de la espada.",
        source: "Shmuel I 15:8",
      },
      {
        label: "Lo que le costó ese «vivo» — Shmuel I 15:28, trece versículos después",
        he: "קָרַע יְהֹוָה אֶת־מַמְלְכוּת יִשְׂרָאֵל מֵעָלֶיךָ הַיּוֹם, וּנְתָנָהּ לְרֵעֲךָ הַטּוֹב מִמֶּךָּ׃",
        es: "Ha rasgado YHVH el reino de Israel de sobre ti hoy, y se lo ha dado a tu prójimo, mejor que tú.",
        source: "Shmuel I 15:28 (el capítulo siguiente, 16:13, es la unción de David)",
      },
      {
        label: "La bisagra, y es Talmud — Meguilá 13a",
        he: "דְּלָא קַטְלֵיהּ שָׁאוּל לַאֲגָג, דְּאִתְיְלִיד מִינֵּיהּ הָמָן דִּמְצַעַר לְיִשְׂרָאֵל׃",
        es: "Porque Shaúl no mató a Agag, de él nació Hamán, que afligió a Israel.",
        source: "Talmud Bavlí, Meguilá 13a",
      },
      {
        label: "La fuente más fuerte de este estudio — Sanhedrín 20b",
        he: "שָׁלֹשׁ מִצְוֹת נִצְטַוּוּ יִשְׂרָאֵל בִּכְנִיסָתָן לָאָרֶץ: לְהַעֲמִיד לָהֶם מֶלֶךְ, וּלְהַכְרִית זַרְעוֹ שֶׁל עֲמָלֵק, וְלִבְנוֹת לָהֶם בֵּית הַבְּחִירָה… הֱוֵי אוֹמֵר: לְהַעֲמִיד לָהֶם מֶלֶךְ תְּחִילָּה. וְאֵין «כִּסֵּא» אֶלָּא מֶלֶךְ, שֶׁנֶּאֱמַר: «וַיֵּשֶׁב שְׁלֹמֹה עַל כִּסֵּא ה׳ לְמֶלֶךְ»׃",
        es: "Tres mitzvot se le ordenaron a Israel al entrar a la Tierra: ponerse un rey, cortar la simiente de Amalek, y construir la Casa Elegida… debes decir: primero ponerse un rey. Y «trono» no es otra cosa que rey, como está dicho: «y se sentó Shlomó sobre el trono de YHVH como rey».",
        source: "Talmud Bavlí, Sanhedrín 20b (baraita de Rabí Yosei)",
      },
      {
        label: "Y el versículo que el Talmud eligió para probarlo — Divrei HaYamim I 29:23",
        he: "וַיֵּשֶׁב שְׁלֹמֹה עַל־כִּסֵּא יְהֹוָה לְמֶלֶךְ תַּחַת־דָּוִיד אָבִיו׃",
        es: "Y se sentó Shlomó sobre el trono de YHVH como rey en lugar de David su padre.",
        source: "Divrei HaYamim I 29:23",
      },
      {
        label: "El versículo de la guerra que no termina — Shemot 17:16",
        he: "כִּי־יָד עַל־כֵּס יָהּ, מִלְחָמָה לַיהֹוָה בַּעֲמָלֵק מִדֹּר דֹּר׃",
        es: "Porque una mano sobre el trono de Yah: guerra de YHVH contra Amalek de generación en generación.",
        source: "Shemot 17:16 (nota masorética: en el Códice de Alepo estaba escrito כֵּסְיָה, en una sola palabra)",
      },
      {
        label: "Un amalekita le entrega la corona a David — Shmuel II 1:8-16",
        he: "וָאֹמַר אֵלָיו: עֲמָלֵקִי אָנֹכִי… וָאֶקַּח הַנֵּזֶר אֲשֶׁר עַל־רֹאשׁוֹ… וָאֲבִיאֵם אֶל־אֲדֹנִי הֵנָּה׃ … דָּמְךָ עַל־רֹאשֶׁךָ, כִּי פִיךָ עָנָה בְךָ׃",
        es: "Y le dije: soy amalekita… y tomé la corona que estaba sobre su cabeza… y las traje a mi señor aquí. … [Y le dijo David:] Tu sangre sobre tu propia cabeza, porque tu boca testificó contra ti.",
        source: "Shmuel II 1:8-16",
      },
      {
        label: "Quinientos años después, la misma figura — Ester 9:25 · 9:1",
        he: "יָשׁוּב מַחֲשַׁבְתּוֹ הָרָעָה אֲשֶׁר־חָשַׁב עַל־הַיְּהוּדִים עַל־רֹאשׁוֹ׃ … וְנַהֲפוֹךְ הוּא, אֲשֶׁר יִשְׁלְטוּ הַיְּהוּדִים הֵמָּה בְּשֹׂנְאֵיהֶם׃",
        es: "Que vuelva su designio malvado, el que tramó contra los judíos, sobre su propia cabeza. … Y se dio vuelta: y los judíos dominaron a los que los odiaban.",
        source: "Ester 9:25 · Ester 9:1",
      },
      {
        label: "La clave de bóveda — Mishlei 16:33",
        he: "בַּחֵיק יוּטַל אֶת־הַגּוֹרָל, וּמֵיְהֹוָה כׇּל־מִשְׁפָּטוֹ׃",
        es: "En el regazo se echa la suerte, y de YHVH es todo su juicio.",
        source: "Mishlei (Proverbios) 16:33",
      },
    ],
    parrafos: [
      `Antes de seguir, los términos, porque este estudio entero se juega sobre tres palabras. Goral (גּוֹרָל) es «suerte» en hebreo, en los dos sentidos que la palabra tiene también en español: el sorteo que se echa y el destino que a uno le toca. Pur (פּוּר) es la palabra persa para lo mismo, y es de donde viene el nombre de la fiesta de Purim; lo notable es que la Meguilá no la deja sola: cada vez que la usa se detiene a traducirla —«הוּא הַגּוֹרָל», «que es el goral»— como si el libro no quisiera que nadie se confunda de idioma a la hora de entender qué se echó. Y hafaj (הפך) es «voltear, dar vuelta»: de ahí «וְנַהֲפוֹךְ הוּא», la frase con la que la Meguilá describe lo que pasó.`,
      `Los personajes. Amalek (עֲמָלֵק) es el pueblo que atacó a Israel por la retaguardia al salir de Egipto, y del que la Torá manda borrar la memoria. Agag (אֲגָג) es su rey en tiempos de Shaúl: el rey de Israel lo captura VIVO —esa palabra está en el versículo y es el detalle del que cuelga todo— y el profeta Shmuel lo ejecuta después (Shmuel I 15:33). Hamán, en la Meguilá, lleva siempre el mismo apellido: ha-Agagí (הָאֲגָגִי), «el agaguita», de la casa de Agag. Y Mordejai lleva el suyo: «ben Kish, ish yeminí» — hijo de Kish, benjaminita, que son exactamente el nombre del padre de Shaúl y la tribu de Shaúl (Shmuel I 9:1).`,
      `Y los libros. La Meguilá (מְגִלָּה) es el rollo de Ester; el Talmud le dedica un tratado del mismo nombre. El Midrash es el registro homilético de los Sabios (siglos III-V); Ester Rabá es el midrash sobre este libro. El Targum Shení es una traducción-paráfrasis aramea de Ester, muy ampliada, de la Antigüedad tardía. El Tikunei Zohar es una obra del corpus del Zohar, setenta comentarios sobre la primera palabra de la Torá. Y tikún (תִּקּוּן) es «reparación»: la idea, central en toda la Cabalá, de que un asunto que quedó a medias vuelve —en otra generación, con otros nombres— hasta que se termina bien.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "El Talmud, Sanhedrín 20b — y esta es la columna del estudio.",
        texto: `Hay una baraita —una enseñanza tanaítica— de Rabí Yosei que es la fuente más fuerte de todo este expediente, y conviene leerla despacio porque hace tres cosas en cuatro líneas. Primero enumera: tres mitzvot se le ordenaron a Israel al entrar a la Tierra — ponerse un rey, cortar la simiente de Amalek, y construir la Casa Elegida, el Templo. Segundo, se pregunta el orden: «וְאֵינִי יוֹדֵעַ אֵיזֶה מֵהֶן תְּחִילָּה», «y no sé cuál de ellas va primero». Y tercero, responde — y responde citando el versículo de Amalek, «porque una mano sobre el trono de Yah» (Shemot 17:16): si la guerra contra Amalek se enuncia con la palabra «trono», entonces primero hay que poner el rey. Amalek no se borra por devoción ni por indignación: se borra desde un trono. Es una cuestión de orden de operaciones, y la tiene resuelta el Talmud, no nosotros.`,
      },
      {
        etiqueta: "Divrei HaYamim I 29:23 — el versículo que el Talmud eligió, entre todos.",
        texto: `Y aquí está el detalle que no se ve a menos que uno se detenga. Para probar que «trono» (כִּסֵּא) significa «rey», el Talmud necesita un versículo donde trono y rey aparezcan juntos. Podía elegir varios. Eligió este: «וַיֵּשֶׁב שְׁלֹמֹה עַל־כִּסֵּא יְהֹוָה לְמֶלֶךְ תַּחַת־דָּוִיד אָבִיו» — «y se sentó Shlomó sobre el trono de YHVH como rey, EN LUGAR DE DAVID SU PADRE». El único trono humano al que la Escritura llama «el trono de YHVH» es el de la casa de David, y el versículo que lo dice lo dice nombrando a David. Digamos con exactitud qué es nuestro y qué no: el Talmud lleva «trono» hasta «rey», y eso es del Talmud. Dar el último paso —de «rey» a «el rey David»— es lectura nuestra. Pero ya no es una lectura desnuda, porque el versículo que el Talmud puso ahí es precisamente el del trono de David.`,
      },
      {
        etiqueta: "Rashi a Shemot 17:16 — y lo que aquí NO se le hace decir.",
        texto: `Se deja asentado, porque circula mal citado. Rashi lee «el trono de Yah» del versículo de Amalek como el TRONO DIVINO, no como el trono de David: en su lectura, mientras exista la simiente de Amalek, hay algo del Nombre y del Trono que queda incompleto. De Rashi se recoge aquí el sentido y no se cita su hebreo, porque en esta verificación no se cotejó su texto literal, y el Sofer no pone entre comillas lo que no fue a buscar. Lo que importa para la honestidad del estudio es esto: si alguien dice que «Rashi enseña que Amalek se opone al trono de David», está poniendo en boca de Rashi algo que Rashi no dijo. Quien lleva «trono» a «rey» es Sanhedrín 20b, y esa sí se cita con todas las letras.`,
      },
      {
        etiqueta: "Meguilá 13a — quinientos años en una sola frase.",
        texto: `El Talmud no hace insinuaciones aquí; lo dice de frente: «porque Shaúl no mató a Agag, de él nació Hamán, que afligió a Israel». Esa frase es la bisagra de todo el estudio, y no es una lectura mística ni una gematría: es una cita. Vale la pena detenerse en la forma exacta del error de Shaúl, porque no fue crueldad y no fue cobardía — fue compasión. Capturó vivo al rey enemigo. En términos humanos corrientes, lo que hizo parece lo mejor que hizo en todo el capítulo. Y el texto lo trata como la falla que le cuesta la dinastía. Hay pocos lugares en la Escritura donde se vea con tanta crudeza que una virtud puesta en el lugar equivocado hace más daño que un vicio; y esa es la razón por la que este estudio existe.`,
      },
      {
        etiqueta: "Ester Rabá 7:11 — la puerta limpia entre Yom Kipur y la suerte de Hamán.",
        texto: `Este midrash hace dos cosas, y las dos son decisivas. La primera responde a una pregunta que se hace sola: ¿por qué la suerte cayó justo en Adar? El Midrash cuenta que Hamán fue probando mes por mes y que cada mes lo rechazó por un mérito de Israel. Y al llegar al séptimo dice, literalmente: «עָלָה בְּתִשְׁרֵי — זְכוּת שׁוֹפָר וְכִפּוּר וּרְגָלִים», «subió Tishrei: el mérito del shofar, del Kipur y de las fiestas». Es decir: la suerte de Hamán NO PUDO caer en el mes de Yom Kipur. El día se la sacó de las manos. Ese es el puente real entre este día y esta historia — no la leyenda de que Hamán sorteó en Yom Kipur, que la Meguilá desmiente en su propio versículo. La segunda cosa es el remate: «אָמַר לוֹ הַקָּדוֹשׁ בָּרוּךְ הוּא… גּוֹרָלְךָ עוֹלֶה לְהִצָּלֵב. הִפִּיל פּוּר הוּא הַגּוֹרָל — עָלָיו נָפַל הַגּוֹרָל», «le dijo el Santo, bendito sea: tu suerte sube a la horca. Echó pur, que es la suerte — sobre él cayó la suerte». Y lo cierra con Tehilim 125:3: «porque no reposará el cetro de la maldad sobre la suerte de los justos».`,
      },
      {
        etiqueta: "Targum Shení a Ester 2:5 y Meguilá 12b — las dos lecturas del linaje de Mordejai, y se dicen las dos.",
        texto: `Que Mordejai sea «hijo de Kish, benjaminita» no puede ser casual: Kish benjaminita es el padre de Shaúl (Shmuel I 9:1). El Targum Shení lo hace explícito y traza la genealogía completa: «מרדכי בר יאיר… בר מפיבשת בר יהונתן בר שאול בר קיש», Mordejai hijo de Yaír… hijo de Mefiboshet, hijo de Yehonatán, hijo de Shaúl, hijo de Kish. Pero hay que decir también lo otro, porque el propio Talmud lo discute: en Meguilá 12b una baraita lee esos nombres NO como genealogía sino como epítetos del propio Mordejai — «כּוּלָּן עַל שְׁמוֹ נִקְרְאוּ… בֶּן קִישׁ — שֶׁהִקִּישׁ עַל שַׁעֲרֵי רַחֲמִים וְנִפְתְּחוּ לוֹ», «todos son nombres suyos… "hijo de Kish" porque tocó (hikish) a las puertas de la misericordia y se le abrieron». Las dos lecturas conviven en la tradición y apuntan al mismo sitio: la casa que perdonó a Agag es la casa que tiene que terminar el trabajo. Pirkei deRabí Eliezer 49 lo cierra en una línea: del linaje de Agag sale el enemigo, y de la simiente de Shaúl sale el que lo derriba.`,
      },
      {
        etiqueta: "Tikunei Zohar 57b (Tikún 21) — y la dirección correcta, que casi nadie dice.",
        texto: `Aquí entra la voz mística del estudio, y entra con una cita verificada y con tres precisiones. El texto dice: «פורים אתקריאת על שם יום הכפורים, דעתידין לאתענגא ביה ולשנויי ליה מענוי לענג» — «Purim se llama así por el nombre de Yom HaKipurim, pues en el futuro se deleitarán en él y lo cambiarán de aflicción a deleite». Primera precisión: la dirección es la INVERSA de como se repite en la calle. No dice «Yom Kipur es como Purim». Dice que Purim recibe su nombre de Yom haKipurim: el día solemne es el original, la fiesta es el derivado. Es más fuerte así, no más débil. Segunda: en el mismo folio, a cuatro líneas de esa frase, el Tikunei Zohar está hablando de las vestiduras de expiación (לבושי כפרה) y dice «אתמר בה: ותלבש אסתר מלכות… ובהון עאלת לפני לפנים» — viste a Ester con esas vestiduras y la hace entrar «al lugar más interior». Es la misma expresión con que se describe el lugar más recóndito del Templo. Tercera precisión, y es de integridad: esto NO ES UNA GEMATRÍA. Los números no coinciden (כְּפֻרִים 350, פּוּרִים 336, הַכִּפּוּרִים 361) y se recalcularon aquí. Es un juego de palabras, y como juego de palabras es antiguo y legítimo. Y NO se atribuye al Arizal ni al Ramak: se les atribuye habitualmente, pero en esta verificación no se localizó la cita en ninguno de los dos.`,
      },
      {
        etiqueta: "La Cabalá luriana — y por qué en este estudio no se la cita.",
        texto: `Un estudio de Jashmal suele traer aquí al Arizal, y aquí no lo trae. Se dice en voz alta por qué: en esta verificación no se localizó ningún pasaje luriano sobre Agag y David que se pueda citar con folio. La lectura del gilgul —que el alma de Shaúl vuelve en Mordejai para terminar lo que dejó a medias— circula ampliamente y es coherente con todo lo que este estudio sí documenta; pero circular no es estar escrito, y el Sofer no cita de oídas. Cuando se fije a un pasaje con referencia exacta, entrará aquí y no en otra sección. Mientras tanto, lo que sostiene el estudio son el Talmud, el Midrash, el Targum y el Tikunei Zohar, y alcanzan de sobra.`,
      },
    ],
    glosa: `Glosa para el lector: goral = suerte (el sorteo y el destino, la misma palabra). Pur = lo mismo en persa; de ahí Purim. Hafaj = voltear; de ahí «venahafoj hu», «y se dio vuelta». Amalek = el pueblo que atacó por la retaguardia al salir de Egipto. Agag = su rey en tiempos de Shaúl. Ha-Agagí = «el agaguita», el apellido que la Meguilá le pone a Hamán. Nézer (נֵזֶר) = la diadema real, la corona que el amalekita le lleva a David. Baraita = enseñanza tanaítica que quedó fuera de la Mishná y que el Talmud cita. Tikún = reparación. Meguilá = rollo (aquí, el de Ester). Targum Shení = «segunda traducción», la paráfrasis aramea ampliada de Ester.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (lo que pasó, sin interpretar nada)",
        parrafos: [
          `Empecemos por lo más fácil de pasar por alto: la fecha del exterminio de un pueblo entero se sorteó. Hamán no la eligió. No la calculó. La echó. El versículo usa un verbo de arrojar —הִפִּיל, «hizo caer»— y el objeto de ese verbo es pur, palabra persa que el libro traduce inmediatamente al hebreo: «הוּא הַגּוֹרָל», «que es la suerte». Y lo hace dos veces, en 3:7 y en 9:24, como si el redactor supiera que la palabra importa más que el episodio. Un hombre con poder absoluto, decidiendo el día de una matanza, y lo que hace es tirar un dado. Esa imagen es el estudio entero.`,
          `Segundo dato del pshat, y también es fácil pasarlo por alto porque parece un apellido decorativo: Hamán es «ha-Agagí». La Meguilá se lo pone dos veces, al presentarlo (3:1) y al resumir la historia al final (9:24). Agag es un nombre con expediente: rey de Amalek, capturado por Shaúl «חָי», vivo, cuando la orden era otra. El profeta Shmuel terminó el trabajo poco después en Guilgal (15:33), pero entre la captura y la ejecución hubo un intervalo — y el Talmud dice, sin metáforas, que en ese intervalo se abrió el hilo que quinientos años después se llamó Hamán.`,
          `Tercer dato, y este es el que suele sorprender incluso a quien conoce la historia. Trece versículos después de perdonar a Agag, a Shaúl le dicen: «rasgó YHVH el reino de Israel de sobre ti hoy, y se lo dio a tu prójimo, mejor que tú» (15:28). El capítulo siguiente —el 16— es la unción de David. La secuencia está en prosa, sin números y sin misticismo: perdón a Agag, pérdida del reino, unción de David, en ese orden y casi sin respirar. Y hay un cuarto dato, todavía más físico. Cuando Shaúl muere, quien le quita la corona de la cabeza y se la lleva a David es —textualmente— un amalekita: «עֲמָלֵקִי אָנֹכִי», «soy amalekita», dice el hombre, y describe cómo tomó «הַנֵּזֶר אֲשֶׁר עַל־רֹאשׁוֹ», la diadema que estaba sobre su cabeza. El pueblo que Shaúl perdonó es el que le entrega la corona a David. Eso es pshat. Está en Shmuel II 1:8-10 y no hace falta leerlo de ninguna manera especial para verlo.`,
          `Y una cosa que el pshat NO dice, y que por eso aquí tampoco se dice: David no terminó con Amalek. Los golpeó duro (Shmuel I 30:17-18), pero el versículo se encarga de aclarar que escaparon cuatrocientos jóvenes en camellos, y Divrei HaYamim I 4:43 pone el final del asunto siglos después. Lo que sí se puede afirmar, y es suficiente: David es el primero que los derrota de verdad, y es el rey al que pasa el trono que Shaúl perdió por perdonar a Agag.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (las alusiones, incluida la nuestra, marcada)",
        parrafos: [
          `La primera alusión es de palabra, y es del texto, no nuestra. David, ante el amalekita que le trae la corona, dice: «דָּמְךָ עַל־רֹאשֶׁךָ», «tu sangre sobre tu propia cabeza» (Shmuel II 1:16). Quinientos años más tarde, sobre el descendiente de Agag, la Meguilá usa exactamente la misma figura: «יָשׁוּב מַחֲשַׁבְתּוֹ הָרָעָה… עַל־רֹאשׁוֹ», «que vuelva su designio malvado… sobre su propia cabeza» (Ester 9:25). La misma palabra, ראש, cabeza; y el mismo movimiento: algo que sale de alguien y le regresa. Entre las dos frases hay medio milenio y dos libros distintos de la Biblia.`,
          `La segunda también es del texto: la Meguilá tiene un verbo para lo que le pasó a la suerte de Hamán, y es el verbo exacto que uno usaría para un dado. «וְנַהֲפוֹךְ הוּא» (Ester 9:1) — «y se dio vuelta». No dice que Dios intervino, no dice que hubo un milagro; el libro de Ester nunca nombra a Dios. Dice que la cosa se volteó. Y la palabra hebrea es la de dar vuelta un objeto físico.`,
          `La tercera va marcada porque es cálculo nuestro. El versículo de la guerra contra Amalek empieza con la palabra יָד, «mano»: «כִּי־יָד עַל־כֵּס יָהּ» (Shemot 17:16). Y יָד vale catorce — י10 + ד4 —, que es lo mismo que vale דָּוִד — ד4 + ו6 + ד4. La aritmética se rehizo aquí letra por letra y es exacta. Pero la LECTURA es de Jashmal: no se halló ninguna fuente clásica que haga esa equivalencia, y por eso va aquí, en su propio párrafo, y no en el titular. Se ofrece como lo que es: una coincidencia bien colocada en el único versículo del Tanaj que declara esta guerra eterna. Nadie está obligado a leerla así.`,
        ],
      },
      {
        head: "דְּרָשׁ — Drash (por qué la cadena pasa, obligatoriamente, por un rey)",
        parrafos: [
          `Ahora la pregunta que ordena todo: ¿por qué el asunto de Amalek nunca se resuelve del todo? El Talmud la contesta sin proponérselo, en Sanhedrín 20b. Hay tres mandatos para el ingreso a la Tierra —rey, Amalek, Templo—, y la baraita se pregunta cuál va primero. Responde con el versículo de Amalek, porque ese versículo contiene la palabra «trono»; y como «trono» significa «rey», el rey va primero. Léelo al revés y tienes el diagnóstico de toda la historia: cada vez que Amalek reaparece, lo que falla no es la voluntad de pelear — es el trono. Shaúl era rey, sí, pero era el rey que el pueblo había pedido «como todas las naciones», y el capítulo de Agag es exactamente el capítulo donde se le quita el reino. Amalek no cae sin rey; y el rey que no puede con Agag deja de ser rey.`,
          `Sobre eso se apoya la lectura central de este estudio, y hay que decir exactamente hasta dónde llega el Talmud y desde dónde seguimos nosotros. El Talmud lleva «trono» hasta «rey»: eso es suyo. Y para probarlo elige el versículo del trono de la casa de David: eso también es suyo, y es una elección, porque podía haber elegido otro. El último paso —decir que el trono del que depende la caída de Amalek es el trono de David— es nuestro. Pero es un paso corto, y se da a la vista de todos.`,
          `Y entonces la balanza queda a la vista, en prosa y sin números. Shaúl perdona a Agag. Trece versículos después pierde el reino. El capítulo siguiente unge a David. Cuando Shaúl muere, un amalekita le quita la corona y se la lleva a David. Cuando el descendiente de Agag reaparece en Persia, quien se le para enfrente es un benjaminita hijo de Kish — el nombre del padre de Shaúl. Agag y David están en la misma balanza: cuando uno sube, el otro baja. Y la casa que dejó el trabajo a medias es la casa que vuelve a la escena para terminarlo. Sobre este último punto el propio Talmud tiene dos lecturas —genealogía real, según el Targum Shení; epítetos de Mordejai, según Meguilá 12b— y aquí se dicen las dos, porque las dos apuntan al mismo lugar.`,
          `Falta la pieza del calendario, y es la mejor del expediente. Uno esperaría que la suerte de Hamán cayera en cualquier mes. El Midrash cuenta que no: que Hamán fue probando mes por mes y que cada mes lo rechazó por un mérito. Y que al llegar a Tishrei —el mes de Rosh Hashaná, de Yom Kipur y de Sucot— lo rechazó «el mérito del shofar, del Kipur y de las fiestas» (Ester Rabá 7:11). Léelo despacio: hay un mes del año en el que la suerte no puede caer. El día de la expiación no aparece en esta historia como escenario ni como fecha; aparece como la fuerza que le arranca la suerte de las manos al que la está echando.`,
        ],
      },
      {
        head: "סוֹד — Sod (qué es realmente una suerte)",
        parrafos: [
          `El secreto de este estudio no es un número: es una palabra. Goral significa a la vez «el sorteo» y «el destino», y el hebreo no distingue las dos cosas porque para la Escritura no son dos cosas. Mishlei 16:33 lo dice en un solo renglón y sin adornos: «בַּחֵיק יוּטַל אֶת־הַגּוֹרָל, וּמֵיְהֹוָה כׇּל־מִשְׁפָּטוֹ» — «en el regazo se echa la suerte, y de YHVH es todo su juicio». La mitad de adelante del versículo describe puro azar: un objeto que se agita en el pliegue de la ropa y cae. La mitad de atrás dice que el veredicto entero es de Dios. El versículo no niega el azar: lo deja exactamente donde está y le pone un dueño.`,
          `Y aquí están los dos filos, que es el modo de leer de este proyecto. El pshat de la Meguilá es frío: un ministro tira una suerte, le sale Adar, y un año entero de calendario decide quién vive. Leído así, la historia de Purim es la historia de un pueblo salvado por poco y por casualidad, en un libro que —único en toda la Biblia— jamás menciona el Nombre de Dios. El Midrash lee la misma escena y ve otra cosa: no que la suerte fuera falsa, sino que la suerte tenía juez. «Echó pur, que es la suerte — sobre él cayó la suerte» (Ester Rabá 7:11). El azar no fue anulado. Fue cobrado. Esas dos lecturas no se cancelan: son la misma escena mirada desde los dos lados de la misma hoja, y por eso el libro donde Dios no aparece es justamente el libro donde el azar hace todo el trabajo.`,
          `El marco de Baal HaSulam —Rabí Yehudá Ashlag, siglo XX, el gran sistematizador moderno de la Cabalá— ayuda a nombrar lo que está en juego, y se da como marco y no como cita, porque en esta verificación no se cotejó su hebreo. Su enseñanza central es que toda la realidad se mueve entre dos fuerzas: el deseo de recibir para uno mismo y el deseo de dar, y que la primera no se destruye — se invierte, se voltea, hasta que recibir se convierte en un modo de dar. Con esa lente, Amalek no es un pueblo lejano: es el nombre de la fuerza que recibe sin devolver nada, la que ataca por la retaguardia a los que se quedaron atrás. Y el tikún no consiste en negarla sino en darle vuelta. Es exactamente el verbo de la Meguilá: «venahafoj hu», se volteó.`,
          `De ahí sale el patrón que este estudio persigue de principio a fin, y que se puede decir sin un solo número: lo que se echa, vuelve. David se lo dice al amalekita que le trajo la corona —«tu sangre sobre tu propia cabeza»— y quinientos años después la Meguilá se lo dice al descendiente de Agag con la misma palabra —«sobre su propia cabeza». El Tikunei Zohar añade la última vuelta de tuerca, y es la que convierte el patrón en esperanza: Purim se llama así por el nombre de Yom haKipurim, «porque en el futuro se deleitarán en él y lo cambiarán de aflicción a deleite» (57b, Tikún 21). El día más solemne del calendario y el más desatado son el mismo día leído en dos momentos distintos de su historia. También eso se voltea.`,
        ],
      },
    ],
    caja: {
      titulo: "אֵין כִּסֵּא אֶלָּא מֶלֶךְ — Amalek no cae sin rey",
      cuerpo:
        "No es una lectura nuestra: es una baraita. Tres mitzvot al entrar a la Tierra —rey, Amalek, Templo—; el Talmud pregunta cuál va primero y responde con el versículo de Amalek, porque ese versículo dice «trono»; y «trono» no es otra cosa que rey (Sanhedrín 20b). El versículo que elige para probarlo es «y se sentó Shlomó sobre el trono de YHVH como rey, en lugar de David su padre» (Divrei HaYamim I 29:23). El paso final —de «rey» a «el rey David»— es lectura de Jashmal, y se dice.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no entra ninguna fuente nueva ni ningún comentario nuevo. Solo nos detenemos en lo que ya se dijo, en el orden en que ocurrió.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña que la fecha se haya sorteado?",
        texto: `Detente en la escena, que es más rara de lo que parece. El hombre más poderoso del imperio después del rey tiene que elegir un día para una matanza, y lo que hace es echar una suerte. Podía calcular. Podía consultar. Tiró. Y tú también has tirado: hay decisiones que en tu vida no se decidieron, se sortearon — el trabajo que aceptaste porque llamaron ese día, la ciudad donde estás por una vacante, la persona que conociste porque te tocó ese asiento. La Escritura no te pide que finjas que eso no fue azar. Te pide algo más difícil: que no confundas «no lo elegí yo» con «no lo eligió nadie».`,
      },
      {
        etiqueta: "¿Qué patrón veo en el perdón de Shaúl?",
        texto: `Shaúl no falló por crueldad. Falló por compasión, y por compasión a un rey vencido, que es la forma más noble que la compasión puede tomar. Ese es el detalle incómodo de todo el capítulo: lo que el texto trata como su ruina es, en términos humanos, lo mejor que hizo. Piensa en una cosa tuya que se quedó a medias justamente porque no te atreviste a terminarla del todo — una conversación que suavizaste, un límite que pusiste a medias, un hábito al que le dejaste una puerta abierta «por si acaso». Trece versículos después, dice el texto. La factura no llegó en otra vida: llegó en la misma página.`,
      },
      {
        etiqueta: "¿Por qué hace falta un rey?",
        texto: `Porque lo que no tiene autoridad adentro no se termina. Esa es la lectura sobria del «primero el rey»: no se trata de política, se trata de que hay asuntos que no se resuelven con ganas, ni con indignación, ni con un impulso el domingo por la noche. Se resuelven cuando alguien manda de verdad. Pregúntate quién manda en la zona de tu vida donde el mismo problema vuelve cada cierto tiempo con otro nombre. Si la respuesta es «nadie», ya sabes por qué vuelve.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Por el verbo. Venahafoj hu: se dio vuelta. No dice que la amenaza fue cancelada, ni que nunca existió, ni que fue un malentendido. Dice que giró. Lo que te vino en contra no tuvo que desaparecer para dejar de hacerte daño: tuvo que voltearse. Y eso es una descripción bastante exacta de cómo funcionan las reparaciones reales de una persona — lo que te dañó no se borra, cambia de signo. Guarda esto para la próxima vez que reces pidiendo que algo desaparezca.`,
      },
      {
        etiqueta: "¿Y qué hago con lo que llamo casualidad?",
        texto: `Vuelve al versículo de Mishlei y míralo otra vez, porque tiene dos mitades y la mayoría de la gente solo se queda con una. La primera mitad concede todo: la suerte se echa, se agita, cae donde cae. La segunda no lo niega — le pone juez. No te pide que dejes de ver azar. Te pide que sepas que el azar tiene dueño. Y hay una última imagen para llevarse, la del mes que rechazó la suerte: existe un día en el calendario que no se deja sortear. Un día que le saca los dados de las manos al que los está tirando. Eso es lo que Tishrei hace en esta historia — y lo que un día de cuentas honestas hace en una vida.`,
      },
    ],
  },

  maase: {
    intro:
      "Cuatro acciones, en orden de dificultad real. Las dos primeras se pueden hacer hoy mismo, antes de dormir.",
    etiqueta: "Termina UNA cosa que dejaste viva.",
    texto: `Primero: escribe una sola cosa que dejaste a medias por compasión mal puesta —contigo o con otro—: la conversación que suavizaste, el límite que no sostuviste, el hábito al que le dejaste una puerta abierta. Una, no una lista; las listas son una manera elegante de no hacer nada. Y termínala esta semana, entera, sin dejar al rey vivo. Segundo, la midá a trabajar: nombra quién manda. Elige la zona de tu vida donde el mismo problema vuelve cada tanto con otro disfraz, y decide hoy, por escrito, una sola regla que gobierne esa zona — un horario, un monto, una hora de apagar el teléfono. «Primero el rey» significa que antes de pelear hay que constituir autoridad; sin eso, la pelea es ruido. Tercero: haz el ejercicio del goral. Escribe tres cosas de tu vida que llegaron por pura casualidad y que hoy son parte de quién eres. No las interpretes, solo míralas juntas en una hoja; es un ejercicio de Mishlei 16:33 y se hace en cinco minutos. Y cuarto, para cuando llegue el día: la próxima vez que algo te venga en contra, no pidas que desaparezca. Pide entender cómo se voltea. Es una oración distinta, y es la que la Meguilá contesta.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `La fecha del exterminio de un pueblo se sorteó, y el que echó esa suerte venía de la casa del único rey de Amalek al que un rey de Israel perdonó la vida. El Talmud lo dice sin rodeos: «porque Shaúl no mató a Agag, de él nació Hamán» (Meguilá 13a). Entre el perdón y la suerte hay quinientos años, y entre medio hay un trono que cambió de casa: trece versículos después de perdonar a Agag, a Shaúl le rasgan el reino, y el capítulo siguiente unge a David.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Amalek no cae sin rey. No es una lectura mística: es una baraita. El Talmud pregunta en qué orden se cumplen las tres mitzvot del ingreso a la Tierra —rey, Amalek, Templo—, responde con el versículo de Amalek porque ese versículo dice «trono», y establece que «trono» no es otra cosa que rey; y el versículo que elige para probarlo es el del trono de la casa de David (Sanhedrín 20b · Divrei HaYamim I 29:23). Lo que no se termina por falta de decisión vuelve, y vuelve hasta que hay alguien con autoridad para terminarlo.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `Goral es, en hebreo, la misma palabra para el sorteo y para el destino, y la Escritura no las separa: «en el regazo se echa la suerte, y de YHVH es todo su juicio» (Mishlei 16:33). El azar no queda negado — queda con dueño. Por eso la Meguilá no dice que la amenaza se canceló: dice «וְנַהֲפוֹךְ הוּא», se dio vuelta. Y el Midrash lo remata con la frase más exacta de todo el expediente: «echó pur, que es la suerte — sobre él cayó la suerte» (Ester Rabá 7:11). Hasta hay un mes en el que la suerte no pudo caer, y fue por el mérito del shofar, del Kipur y de las fiestas.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Una cosa terminada del todo. Una regla que gobierne la zona que se repite. Tres casualidades escritas en una hoja. Y una oración distinta: no que desaparezca, sino que se voltee.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Mardan Kadivar",
    rotulo:
      "Esto NO es una fuente, NO es una cita y NO es tradición judía. Es una lectura nueva de Mardan Kadivar, verificada por el Sofer en su aritmética y rotulada aquí como lo que es. Va al final, fuera del cuerpo del estudio, a propósito: lo de arriba se sostiene solo, sin esto.",
    parrafos: [
      `La lectura es esta. אֲגָג se escribe con tres letras —álef, guímel, guímel— que valen uno, tres y tres: suman SIETE. Ahora imagina esas tres letras como tres dados sobre la mesa. En un dado, las caras opuestas suman siete; de modo que debajo de un uno hay un seis, y debajo de un tres hay un cuatro. Voltea las tres: seis, cuatro, cuatro. Suman CATORCE. Y catorce, en hebreo, se escribe דָּוִד — ד4 + ו6 + ד4. David.`,
      `Lo primero que hay que decir, y se dice antes que nada: la regla del dado NO ES UNA FUENTE JUDÍA. No es talmúdica, no es cabalística, no está en las transformaciones alfabéticas de la tradición —Atbash, Albam, Ajás Betá y las demás—, y la única que sí complementa, Atbaj, complementa a diez y sobre אגג no arroja nada. El complemento a siete es convención de dados, y la lectura es de Mardan. Quien la use tiene que decirlo igual que lo decimos nosotros.`,
      `Lo segundo, que es lo que casi nadie confiesa y por eso conviene confesarlo primero: EL ORDEN NO SALE. En אגג el álef —el uno— está al principio, así que al voltearlo se convierte en vav, y el reverso, leído en el mismo orden, da ו-ד-ד. No da דוד. Para que se leyera «David» en orden, el álef tendría que estar en el medio (ג-א-ג), y no lo está. Son exactamente las mismas tres letras, pero hay que REORDENARLAS. Eso es verdad, se dice, y no hay modo de esquivarlo. Lo que también es verdad: no hay ninguna otra palabra que se pueda hacer con esas tres letras.`,
      `Y lo tercero es lo que salva el jidush, porque es lo único aquí que no depende del orden. El orden solo le importa a las letras; al valor no. Tres caras suman veintiuno entre anverso y reverso, tres veces siete. Si el anverso suma siete, el reverso suma veintiuno menos siete: CATORCE, siempre, necesariamente. El reverso de Agag no es un número que da la casualidad de ser catorce — es forzosamente el DOBLE de Agag, y no podía ser otro. Ese es el argumento fuerte, y es el que se pone adelante: 7 → 14. Las letras vienen detrás, como confirmación y ya confesadas.`,
      `Qué se puede hacer con esto, dicho con sobriedad. No es una prueba de nada y no reemplaza ni una línea de lo que está arriba — Sanhedrín 20b, Meguilá 13a y Ester Rabá 7:11 sostienen el estudio entero sin necesitar un solo dado. Lo que la lectura aporta es una imagen, y la imagen es buena: que el mal que tienes enfrente lleva puesto, en su propia cara oculta, exactamente el doble de lo que muestra — y que ese doble tiene nombre de rey. Tómalo como una imagen. Es todo lo que pretende ser.`,
    ],
  },

  hemshej: [
    "{{study:purim|Y si el goral te quedó sonando: el libro donde Dios no aparece ni una vez, y por qué se llama Purim y no otra cosa.}}",
    "{{study:yom-kipur|Si te tocó el mes que rechazó la suerte: qué hace exactamente el día que le saca los dados de las manos al azar.}}",
    "{{study:hester-panim|¿Y si el ocultamiento no fuera abandono? Ester viene de «hastér», ocultar — y el Talmud lo dice con todas las letras.}}",
    "{{letter:dalet|Y la letra con la que empieza y termina דוד: la puerta, y el que no tiene nada de suyo.}}",
  ],

  ctaRef: "Esther 3:7",
};
