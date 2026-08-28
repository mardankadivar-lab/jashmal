
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — רֹאשׁ הַשָּׁנָה · הַיּוֹם הֲרַת עוֹלָם
//  Serie «Tiempos Sagrados» (moadim) · Estudio 2 — Rosh Hashaná 5787.
//
//  Hero en modo "dimensiones" (tres pilares). NO se usa modo "par": ninguna
//  gematría de las sugeridas (שופר · תרועה · היום · כתר · מלך) cierra con un
//  par lo bastante sólido y clásico como para encabezar el estudio. Se prefirió
//  no forzar un número. Las dos gematrías que SÍ cierran exactas van dentro del
//  cuerpo, con la cuenta a la vista.
//
//  FUENTES VERIFICADAS CONTRA LA API DE SEFARIA (2026-08-27, 14 de Elul 5786).
//  Cada una se cotejó en https://www.sefaria.org/api/texts/{ref}?context=0 y el
//  hebreo puntuado que aparece abajo es el que devolvió la API, no memoria:
//
//   TANAJ
//   · Vayikrá (Levítico) 23:23-25 — "זִכְרוֹן תְּרוּעָה".
//   · Bamidbar (Números) 29:1-2 — "יוֹם תְּרוּעָה יִהְיֶה לָכֶם".
//   · Nechemiá 8:2 — "בְּיוֹם אֶחָד לַחֹדֶשׁ הַשְּׁבִיעִי" (fecha de la escena).
//   · Nechemiá 8:9-10 — "אַל־תִּתְאַבְּלוּ… כִּי־חֶדְוַת יְהֹוָה הִיא מָעֻזְּכֶם".
//   · Tehilim 81:2 y 81:4-5 — "הָרִיעוּ" · "תִּקְעוּ בַחֹדֶשׁ שׁוֹפָר בַּכֵּסֶה".
//   · Yirmiyahu 20:17 — "וְרַחְמָהּ הֲרַת עוֹלָם" (origen de la frase litúrgica).
//   · Bereshit 22:13 — el carnero trabado por sus cuernos.
//   · Bereshit 1:31 — "יוֹם הַשִּׁשִּׁי".
//   · Shoftim (Jueces) 5:28 — "וַתְּיַבֵּב אֵם סִיסְרָא".
//   · Yeshayahu 27:13 — "יִתָּקַע בְּשׁוֹפָר גָּדוֹל… בִּירוּשָׁלָ͏ִם" (grafía defectiva).
//   · Yeshayahu 33:22 — "ה' שֹׁפְטֵנוּ… ה' מַלְכֵּנוּ הוּא יוֹשִׁיעֵנוּ" (lo cita Sforno).
//   · Yechezkel 40:1 — "בְּרֹאשׁ הַשָּׁנָה בֶּעָשׂוֹר לַחֹדֶשׁ": ÚNICA aparición de
//     la expresión "Rosh HaShaná" en todo el Tanaj — y allí NO es 1 de Tishrei.
//   · Shemot 12:2 — "הַחֹדֶשׁ הַזֶּה לָכֶם רֹאשׁ חֳדָשִׁים" (Nisán, cabeza de meses).
//
//   MISHNÁ Y TALMUD
//   · Mishná Rosh Hashaná 1:1 — los cuatro "cabezas de año".
//   · Mishná Rosh Hashaná 1:2 — "כָּל בָּאֵי הָעוֹלָם עוֹבְרִין לְפָנָיו כִּבְנֵי מָרוֹן".
//   · Mishná Rosh Hashaná 4:5-6 — מַלְכֻיּוֹת · זִכְרוֹנוֹת · שׁוֹפָרוֹת y sus diez versos.
//   · Rosh Hashaná 10b-11a — R. Eliezer (Tishrei) vs. R. Yehoshúa (Nisán).
//   · Rosh Hashaná 16a — R. Abahu, el shofar de carnero y la Akedá; y "אִמְרוּ
//     לְפָנַי… מַלְכִיּוֹת — כְּדֵי שֶׁתַּמְלִיכוּנִי עֲלֵיכֶם".
//   · Rosh Hashaná 34b — la misma enseñanza en boca de Rabá (cotejada aparte).
//   · Rosh Hashaná 16b — R. Kruspedai en nombre de R. Yojanán: los TRES LIBROS.
//     (Nota: los tres libros están en 16b, no en 16a. Se corrige la referencia.)
//   · Rosh Hashaná 26b — el shofar curvo: "כַּמָּה דְּכָיֵיף אִינִישׁ דַּעְתֵּיהּ טְפֵי מְעַלֵּי".
//   · Rosh Hashaná 33b — Abaye: "יוֹם תְּרוּעָה" = "יוֹם יַבָּבָא" (Targum) y el llanto
//     de la madre de Sísera (Shoftim 5:28).
//   · Rosh Hashaná 34a — R. Abahu instituyó en Cesarea tekiá-shevarim-teruá-tekiá.
//   · Berajot 12b — "הַמֶּלֶךְ הַקָּדוֹשׁ" y "הַמֶּלֶךְ הַמִּשְׁפָּט" en los diez días.
//   · Keritot 6a (y Horayot 12a) — Abaye y los simanim de la mesa.
//   · Talmud Yerushalmi, Rosh Hashaná 1:3 — "לוֹבְשִׁים לְבָנִים… וְאוֹכְלִין וְשׁוֹתִין
//     וּשְׂמֵחִים" y "אָמְרוּ בֵית דִּין: הַיּוֹם רֹאשׁ הַשָּׁנָה".
//
//   MIDRASH
//   · Vayikrá Rabá 29:1 — "בְּעֶשְׂרִים וַחֲמִשָּׁה בֶּאֱלוּל נִבְרָא הָעוֹלָם"; las doce
//     horas de Adam; "יָצָא בְּדִימוּס"; "זֶה סִימָן לְבָנֶיךָ".
//
//   RISHONIM / POSKIM
//   · Rashi a Vayikrá 23:24 — "זִכְרוֹן פְּסוּקֵי זִכְרוֹנוֹת וּפְסוּקֵי שׁוֹפָרוֹת".
//   · Ibn Ezra a Vayikrá 23:24 — "אַף עַל פִּי שֶׁהוּא יוֹם דִּין אָסוּר לְהִתְעַנּוֹת בּוֹ
//     וְעֶזְרָא יוֹכִיחַ".
//   · Ramban a Vayikrá 23:24 — "שַׁבָּתוֹן… יוֹם מְנוּחָה לֹא יוֹם טֹרַח" y la exigencia
//     de sumar las Malkuyot al midrash de Rashi.
//   · Sforno a Vayikrá 23:24 — "זִכְרוֹן תְּרוּעַת מֶלֶךְ… וְרָאוּי לָנוּ לִשְׂמֹחַ אָז יוֹתֵר".
//   · Rambam, Hiljot Teshuvá 3:4 — "עוּרוּ יְשֵׁנִים מִשְּׁנַתְכֶם" y la balanza.
//   · Shulján Aruj, Oraj Jaim 582:1 — HaMelej HaKadosh / HaMelej HaMishpat.
//   · Shulján Aruj, Oraj Jaim 583:1 — los simanim y la manzana con miel (Rema).
//   · Shulján Aruj, Oraj Jaim 597:1 — "אוֹכְלִים וְשׁוֹתִים וּשְׂמֵחִים וְאֵין מִתְעַנִּין".
//   · Rema a Oraj Jaim 610:4 — el kitel blanco "כְּדוּגְמַת מַלְאֲכֵי הַשָּׁרֵת" (Yom Kipur).
//
//   CABALÁ / JASIDUT
//   · Sefer Yetzirá (versión del Gra) 5 — "הִמְלִיךְ אוֹת ל'… וְצָר בָּהֶם מֹאזְנַיִם
//     בָּעוֹלָם וְתִשְׁרֵי בַּשָּׁנָה": la letra de Tishrei es la LÁMED y su signo, la Balanza.
//   · Sha'ar HaKavanot, Derushei Rosh Hashaná 1 (Arizal) — la disputa Tishrei/Nisán
//     como orden de entrada de los mojín; y la נְסִירָה del Keter, "נַעֲשֵׂית בְּיוֹם א'
//     שֶׁל ר״ה", que se completa el 10 de Tishrei.
//   · Pri Etz Jaim, Sha'ar HaShofar 1 (Arizal) — "מִי הוּא הַתּוֹקֵעַ, וּמִי הוּא הַפֶּה,
//     וּמִי הוּא הַשּׁוֹפָר, וּמִי הוּא הַקּוֹל": el shofar es Biná.
//   · Sefat Emet, Devarim, Rosh HaShaná 33:3 — "אֵין עִיקַּר הַשְּׁבוּעָה בַּעֲבוּר
//     הַחוֹטְאִים": el shofar es el pacto, no solo la culpa.
//   · Baal HaSulam, Talmud Eser HaSefirot, Introducción §3 — "שֶׁבָּרָא הָעוֹלָמוֹת
//     כְּדֵי לְהֵיטִיב לִנְבְרָאָיו, כִּי מִדֶּרֶךְ הַטּוֹב לְהֵיטִיב".
//   · Machzor Rosh Hashaná Ashkenaz (Linear), Musaf, Maljuyot — "הַיּוֹם הֲרַת
//     עוֹלָם… אִם כְּבָנִים אִם כַּעֲבָדִים": texto litúrgico cotejado en Sefaria.
//
//  LO QUE NO SE PUDO VERIFICAR (y por eso NO se cita):
//   · ABARBANEL: "Abarbanel on Torah, Leviticus 23:24" devuelve CERO segmentos en
//     Sefaria. No se le pone ninguna palabra en la boca. No aparece en el estudio.
//   · MALBIM: "Malbim on Leviticus 23:24" no es una referencia válida (el Malbim a
//     Vayikrá está indexado por parashá) y "Malbim on Leviticus, Emor" devolvió
//     contenido vacío para este verso. No se cita.
//   · La TRIBU asociada al mes de Tishrei: la versión del Gra del Sefer Yetzirá que
//     aloja Sefaria asigna letra, signo y órgano, pero NO tribu. No se afirma nada
//     sobre "la tribu de Leví".
//   · La parábola jasídica del hijo del rey que olvidó el idioma y solo pudo gritar
//     se atribuye popularmente al Baal Shem Tov, pero NO se encontró en Sefaria una
//     fuente que la traiga. En el estudio se usa únicamente la enseñanza general del
//     Besht, marcada como tradición jasídica y sin folio inventado.
//
//  GEMATRÍAS — calculadas letra por letra con script (scratchpad/gem.py):
//    שׁוֹפָר   = ש300 + ו6 + פ80 + ר200 = 586
//    יְרוּשָׁלִַם = י10 + ר200 + ו6 + ש300 + ל30 + ם40 = 586  (grafía defectiva del Tanaj,
//               la que trae Yeshayahu 27:13, verso del "shofar grande")
//    הַיּוֹם   = ה5 + י10 + ו6 + ם40 = 61
//    אֲנִי     = א1 + נ50 + י10 = 61
//    (Descartadas por no cerrar con nada sólido: תְּרוּעָה = 681 · כֶּתֶר = 620 ·
//     מֶלֶךְ = 90. No se fuerza ninguna.)
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "rosh-hashana",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 2 — Rosh Hashaná · el juicio que se celebra vestido de blanco",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۲ — روش هشانا · داوری‌ای که با جامهٔ سپید جشن گرفته می‌شود",
    he: "הַיּוֹם הֲרַת עוֹלָם",
    titulo: "Rosh Hashaná — el juicio vestido de blanco",
    tituloFa: "روش هشانا — داوری در جامهٔ سپید",
    ganchoEs:
      "Todo acusado que sabe que hoy lo juzgan se viste de negro y deja crecer la barba. Este pueblo hace lo contrario: se viste de blanco, se corta el pelo, come manjares y bebe cosas dulces. No porque no crea en el juicio, sino porque sabe algo del juez. Y lo que suena ese día no es un discurso ni una sentencia: es un cuerno de animal que no dice ni una palabra.",
    ganchoFa:
      "هر متهمی که بداند امروز محاکمه می‌شود، سیاه می‌پوشد و ریش بلند می‌کند. این قوم عکسِ آن می‌کند: سپید می‌پوشد، موی می‌آراید، خوراکِ چرب می‌خورد و نوشیدنی شیرین می‌نوشد. نه از آن‌رو که داوری را باور ندارد، بلکه چون داور را می‌شناسد. و آنچه در آن روز طنین می‌افکند نه خطابه است و نه حکم: شاخِ حیوانی است که یک کلمه هم نمی‌گوید.",
    dimensiones: [
      { es: "El sexto día, no el primero", fa: "روزِ ششم، نه روزِ نخست" },
      { es: "Una coronación, no una fecha", fa: "تاج‌گذاری، نه یک تاریخ" },
      { es: "Un veredicto sin palabras", fa: "حکمی بی‌کلام" },
    ],
    fecha: "Rosh Hashaná 5787 · 12–13 sep 2026",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — «año nuevo judío» es una traducción que engaña",
    rotulo:
      "Se dice de entrada, porque la etiqueta con la que casi todo el mundo conoce este día es la que más estorba para entenderlo.",
    parrafos: [
      `La Torá nunca llama a este día "año nuevo". Cuando lo manda, lo nombra de dos maneras y ninguna habla de calendario: זִכְרוֹן תְּרוּעָה, "un recordatorio con toque de cuerno" (Vayikrá 23:24), y יוֹם תְּרוּעָה, "día de teruá", día de toque (Bamidbar 29:1). Ni una palabra sobre empezar un año.`,
      `Más aún: la propia Torá pone el comienzo del año en OTRO mes. "Este mes es para ustedes cabeza de meses; el primero es para ustedes de los meses del año" (Shemot 12:2), y eso se dice de Nisán, en primavera. Y la Mishná, lejos de conocer un solo año nuevo, cuenta CUATRO: el 1 de Nisán para los reyes y las fiestas; el 1 de Elul para el diezmo del ganado; el 1 de Tishrei para el cómputo de años, los años sabáticos, los jubileos, las plantaciones y las verduras; y el 1 —o el 15— de Shevat para los árboles (Mishná Rosh Hashaná 1:1). El 1 de Tishrei es, en ese listado, un año fiscal y agrícola. Nada más solemne que eso.`,
      `Y todavía queda el dato más incómodo, que conviene decir antes que después. La expresión רֹאשׁ הַשָּׁנָה, "Rosh HaShaná", aparece UNA sola vez en todo el Tanaj — y no señala el 1 de Tishrei. Está en Yechezkel 40:1: "בְּרֹאשׁ הַשָּׁנָה בֶּעָשׂוֹר לַחֹדֶשׁ", "en el rosh hashaná, a los diez del mes". A los DIEZ. El único "Rosh HaShaná" que escribe la Biblia hebrea cae en Yom Kipur de un año de jubileo. Verificado.`,
      `Este estudio no dice que llamarle "año nuevo" esté prohibido; dice que esa etiqueta tapa lo que el día es. Lo que sigue intenta destapar tres cosas verificables: que este día conmemora la creación del HOMBRE y no la del mundo; que su acto central es una CORONACIÓN; y que el instrumento con el que se pronuncia el juicio no dice palabras.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — seis textos y una sola pregunta",
    intro: [
      `La pregunta que sostiene todo el estudio es simple y molesta: si hoy es el día del juicio, ¿por qué se celebra con una comida de fiesta y ropa blanca, en vez de con luto? Seis textos verificados responden, y cada uno aporta una pieza.`,
    ],
    filas: [
      {
        ref: "Vayikrá 23:24",
        he: "זִכְרוֹן תְּרוּעָה",
        es: "«un recordatorio con toque de cuerno»",
        funcion: "El único nombre que la Torá le da al día. Nunca dice «año nuevo».",
      },
      {
        ref: "Vayikrá Rabá 29:1",
        he: "בְּעֶשְׂרִים וַחֲמִשָּׁה בֶּאֱלוּל נִבְרָא הָעוֹלָם",
        es: "«El 25 de Elul fue creado el mundo»",
        funcion: "Si el mundo empezó el 25 de Elul, el 1 de Tishrei es el día SEXTO: el del hombre.",
      },
      {
        ref: "Rosh Hashaná 16a · 34b",
        he: "מַלְכִיּוֹת — כְּדֵי שֶׁתַּמְלִיכוּנִי עֲלֵיכֶם",
        es: "«Reinados: para que Me coronen Rey sobre ustedes»",
        funcion: "El propósito declarado del día en boca del propio Talmud: una coronación.",
      },
      {
        ref: "Nechemiá 8:10",
        he: "כִּי־חֶדְוַת יְהֹוָה הִיא מָעֻזְּכֶם",
        es: "«porque la alegría de YHVH es su fortaleza»",
        funcion: "La orden bíblica de comer y no llorar — dicha un 1 de Tishrei (Nechemiá 8:2).",
      },
      {
        ref: "Yerushalmi Rosh Hashaná 1:3",
        he: "לוֹבְשִׁים לְבָנִים… וְאוֹכְלִין וְשׁוֹתִין וּשְׂמֵחִים",
        es: "«visten de blanco… y comen y beben y se alegran»",
        funcion: "Todo acusado del mundo viste de negro. Este pueblo, de blanco. Ese es el escándalo.",
      },
      {
        ref: "Rosh Hashaná 33b",
        he: "יוֹם תְּרוּעָה → יוֹם יַבָּבָא",
        es: "«día de teruá» = «día de sollozo»",
        funcion: "La ley define el sonido del día con el llanto de una madre — y es la madre del enemigo.",
      },
    ],
    cierre: [
      `Un día que no es el del mundo sino el del hombre; una coronación; una orden de comer; ropa blanca; y un sonido que es un llanto. De ahí sale todo.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "Versículo-ancla I — Vayikrá (Levítico) 23:24",
        he: "דַּבֵּ֛ר אֶל־בְּנֵ֥י יִשְׂרָאֵ֖ל לֵאמֹ֑ר בַּחֹ֨דֶשׁ הַשְּׁבִיעִ֜י בְּאֶחָ֣ד לַחֹ֗דֶשׁ יִהְיֶ֤ה לָכֶם֙ שַׁבָּת֔וֹן זִכְר֥וֹן תְּרוּעָ֖ה מִקְרָא־קֹֽדֶשׁ׃",
        es: "Habla a los hijos de Israel diciendo: en el mes SÉPTIMO, en el primero del mes, será para ustedes reposo, un recordatorio con toque de cuerno, convocatoria santa.",
        source: "Vayikrá 23:24",
      },
      {
        label: "Versículo-ancla II — Bamidbar (Números) 29:1",
        he: "וּבַחֹ֨דֶשׁ הַשְּׁבִיעִ֜י בְּאֶחָ֣ד לַחֹ֗דֶשׁ מִֽקְרָא־קֹ֙דֶשׁ֙ יִהְיֶ֣ה לָכֶ֔ם כׇּל־מְלֶ֥אכֶת עֲבֹדָ֖ה לֹ֣א תַעֲשׂ֑וּ י֥וֹם תְּרוּעָ֖ה יִהְיֶ֥ה לָכֶֽם׃",
        es: "Y en el mes séptimo, en el primero del mes, será para ustedes convocatoria santa; ninguna labor de trabajo harán; DÍA DE TERUÁ será para ustedes.",
        source: "Bamidbar 29:1",
      },
      {
        label: "El mandato de no llorar — Nechemiá 8:10 (dicho un 1 de Tishrei, según 8:2)",
        he: "וַיֹּ֣אמֶר לָהֶ֡ם לְכוּ֩ אִכְל֨וּ מַשְׁמַנִּ֜ים וּשְׁת֣וּ מַֽמְתַקִּ֗ים וְשִׁלְח֤וּ מָנוֹת֙ לְאֵ֣ין נָכ֣וֹן ל֔וֹ כִּֽי־קָד֥וֹשׁ הַיּ֖וֹם לַאֲדֹנֵ֑ינוּ וְאַל־תֵּ֣עָצֵ֔בוּ כִּֽי־חֶדְוַ֥ת יְהֹוָ֖ה הִ֥יא מָֽעֻזְּכֶֽם׃",
        es: "Y les dijo: vayan, coman manjares y beban cosas dulces, y envíen porciones al que no tiene nada preparado, porque santo es este día para nuestro Señor. Y no se entristezcan, porque la ALEGRÍA de YHVH es su fortaleza.",
        source: "Nechemiá 8:10 (cf. 8:2 y 8:9)",
      },
      {
        label: "El verso del shofar — Tehilim (Salmos) 81:4-5",
        he: "תִּקְע֣וּ בַחֹ֣דֶשׁ שׁוֹפָ֑ר בַּ֝כֵּ֗סֶה לְי֣וֹם חַגֵּֽנוּ׃ כִּ֤י חֹ֣ק לְיִשְׂרָאֵ֣ל ה֑וּא מִ֝שְׁפָּ֗ט לֵאלֹהֵ֥י יַעֲקֹֽב׃",
        es: "Toquen el shofar en la luna nueva, en la [luna] cubierta, para el día de nuestra fiesta. Porque estatuto es para Israel, juicio del Dios de Yaakov.",
        source: "Tehilim 81:4-5",
      },
      {
        label: "El origen de la frase litúrgica — Yirmiyahu (Jeremías) 20:17",
        he: "אֲשֶׁ֥ר לֹא־מוֹתְתַ֖נִי מֵרָ֑חֶם וַתְּהִי־לִ֤י אִמִּי֙ קִבְרִ֔י וְרַחְמָ֖הֿ הֲרַ֥ת עוֹלָֽם׃",
        es: "…porque no me hizo morir desde el vientre, y así mi madre habría sido mi tumba, y su vientre, preñado para siempre.",
        source: "Yirmiyahu 20:17 — de aquí sale «הֲרַת עוֹלָם» de la liturgia de musaf",
      },
    ],
    parrafos: [
      `Empieza por donde empieza la Torá, que es más escueta de lo que uno espera. En los dos únicos pasajes donde manda este día, no dice "año nuevo", no dice "juicio", no dice "coronación", no dice "arrepentimiento". Dice dos cosas: que es el primer día del mes SÉPTIMO, y que hay que hacer sonar un cuerno. "Zijrón teruá" en Vayikrá 23:24, "yom teruá" en Bamidbar 29:1. Nada más. Todo lo que este día significa para el judaísmo —el juicio, los libros abiertos, el Rey coronado, la mesa dulce— entra después, por la puerta de la tradición oral. La Escritura solo deja un sonido.`,
      `Y ya en esas dos palabras hay un problema que vale la pena mirar de frente: el mes SÉPTIMO. Un año que empieza en su propio mes séptimo es una contradicción de calendario, y no es un descuido: la Torá le había dicho a Israel, en Egipto, que el mes de la salida —Nisán, en primavera— sería "cabeza de meses" (Shemot 12:2). Los meses se cuentan desde Nisán; los años, desde Tishrei. El calendario judío tiene dos comienzos y nunca los reconcilió, porque no son la misma clase de comienzo. Nisán cuenta la historia de un pueblo. Tishrei cuenta la historia de una criatura.`,
      `Aquí entra el midrash que da vuelta la postal entera. Vayikrá Rabá 29:1, comentando justamente nuestro verso, trae en nombre de Rabí Eliezer: "בְּעֶשְׂרִים וַחֲמִשָּׁה בֶּאֱלוּל נִבְרָא הָעוֹלָם" — el mundo fue creado el VEINTICINCO DE ELUL. Haz la cuenta con los dedos: 25 de Elul, 26, 27, 28, 29 y 1 de Tishrei. Seis días. El primer día de Tishrei no es el día uno de la creación: es el día SEIS. Y el día seis es aquel del que la Torá dice "y vio Dios todo lo que había hecho, y he aquí que era muy bueno; y fue tarde y fue mañana, el día sexto" (Bereshit 1:31) — el día en que fue formado el hombre. Rosh Hashaná no es el cumpleaños del universo. Es el cumpleaños de Adam.`,
      `El mismo midrash cuenta ese día hora por hora, y la lista merece leerse entera porque es el guion de todos los Rosh Hashaná que vendrían: "en la primera hora subió al pensamiento; en la segunda tomó consejo con los ángeles servidores; en la tercera reunió su polvo; en la cuarta lo amasó; en la quinta lo modeló; en la sexta lo hizo un cuerpo sin vida; en la séptima sopló en él un alma; en la octava lo introdujo en el jardín; en la novena fue mandado; en la décima transgredió; en la undécima fue juzgado; en la duodécima salió בְּדִימוּס — absuelto". Y entonces viene la frase que sostiene este estudio: "Dijo el Santo, bendito sea, a Adam: זֶה סִימָן לְבָנֶיךָ — esto es una señal para tus hijos. Así como te presentaste ante Mí a juicio en este día y saliste absuelto, así tus hijos habrán de presentarse ante Mí a juicio en este día y saldrán absueltos. ¿Cuándo? En el mes séptimo, en el primero del mes".`,
      `Ahí está la respuesta a la pregunta de este estudio, y está en la fuente, no en una interpretación piadosa. El juicio de Rosh Hashaná se celebra porque el precedente del día —el primer juicio que hubo en el mundo, en el primer día de la historia humana— terminó en absolución. El acusado pecó de verdad, en la décima hora; fue juzgado de verdad, en la undécima; y salió libre en la duodécima. La mesa puesta de Rosh Hashaná no niega el tribunal: recuerda el veredicto. Por eso la Escritura misma, cuando por fin narra un 1 de Tishrei —el de Ezra y Nechemiá, con el pueblo llorando al oír la Torá—, pone en boca de los líderes una orden que suena casi impertinente: "no se entristezcan… vayan, coman manjares y beban cosas dulces… porque la alegría de YHVH es su fortaleza" (Nechemiá 8:10). La escena está fechada: "el primer día del mes séptimo" (Nechemiá 8:2).`,
      `Queda el quinto texto, y es el más extraño de todos. La liturgia de musaf de Rosh Hashaná dice, después de cada serie de toques: "הַיּוֹם הֲרַת עוֹלָם, הַיּוֹם יַעֲמִיד בַּמִּשְׁפָּט כָּל יְצוּרֵי עוֹלָמִים" — "hoy es la concepción del mundo; hoy hace comparecer a juicio a todas las criaturas de los mundos". Suena a fanfarria de aniversario. Pero esas dos palabras, הֲרַת עוֹלָם, están tomadas de un lugar que no tiene nada de festivo: son de Yirmiyahu, el profeta, maldiciendo el día en que nació. "Ojalá no me hubiera hecho morir desde el vientre, y mi madre habría sido mi tumba, y su vientre preñado para siempre" (Yirmiyahu 20:17). En su origen, "harat olam" describe un embarazo que nunca termina, una vida que el profeta hubiera preferido no empezar. La liturgia toma ese grito de un hombre que no quiso nacer y lo convierte en el anuncio del nacimiento del mundo. No hay error de cita: hay una decisión. El día que celebra que existimos está construido sobre las palabras de alguien que deseó no existir — porque eso es exactamente lo que se juzga hoy: si valió la pena.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: `Rashi (רַשִׁ"י).`,
        texto: `Rashi, fiel a su método, no filosofa: le pone contenido concreto a una palabra vaga. La Torá dice "zijrón teruá", "recordatorio de toque", y Rashi pregunta qué es lo que se recuerda. Respuesta: "זִכְרוֹן פְּסוּקֵי זִכְרוֹנוֹת וּפְסוּקֵי שׁוֹפָרוֹת — un recordatorio de los versículos de Zijronot y de los versículos de Shofarot… para que Yo recuerde a favor de ustedes la Akedá de Itzjak, en cuyo lugar se ofreció un carnero" (Rashi a Vayikrá 23:24, apoyado en Sifrá y en Rosh Hashaná 16a). Nótese lo que hace: el "recordatorio" no es que nosotros nos acordemos de algo. Es que Él se acuerde. El sujeto del verbo cambia de dueño, y con eso cambia todo el tono del día: el shofar no es un despertador nuestro, es una citación que Le presentamos a Él. Y lo que se Le presenta no son nuestros méritos: es un carnero atrapado en un zarzal por sus cuernos, hace cuatro mil años (Bereshit 22:13).`,
      },
      {
        etiqueta: `Ramban / Najmánides (הָרַמְבַּ"ן).`,
        texto: `El Ramban hace dos cosas en su comentario al mismo verso, y las dos importan. La primera es corregir a Rashi con elegancia: "y el Rav debió traer también los versículos de las MALKUYOT del midrash, pues no es posible que la Escritura mencione los versículos de Zijronot y Shofarot y no mencione los de Malkuyot" (Ramban a Vayikrá 23:24). Es decir: el día tiene tres patas, no dos, y la que Rashi dejó fuera es justamente la del reinado. La segunda cosa es su definición de שַׁבָּתוֹן, "reposo", y ahí el Ramban se pone casi visual: sin esa palabra, dice, un día festivo podría pasarse "midiendo granos y pesando frutas y metales y llenando toneles de vino… y el mercado lleno de compra y venta, y la tienda abierta y el tendero fiando y los cambistas en su mesa con las monedas de oro delante". Por eso la Torá dijo "shabatón": "שֶׁיִּהְיֶה יוֹם שְׁבִיתָה וּמְנוּחָה לֹא יוֹם טֹרַח — que sea un día de cese y descanso, no un día de ajetreo". Guarda esa frase: el día del juicio universal es, por decreto, un día en el que está prohibido correr.`,
      },
      {
        etiqueta: `Ibn Ezra (אַבְּן עֶזְרָא).`,
        texto: `Y aquí está el comentarista que contesta la pregunta de este estudio de forma directa, casi como si la hubiera oído. Ibn Ezra, sobre Vayikrá 23:24, escribe: "אָמְרוּ הַמַּעְתִּיקִים שֶׁיּוֹם רֹאשׁ הַשָּׁנָה יוֹם הַדִּין, וְטַעַם הַתְּרוּעָה זֵכֶר לְמַלְכֻיּוֹת הַשֵּׁם — dijeron los transmisores que el día de Rosh Hashaná es día de juicio, y el sentido de la teruá es recuerdo de los reinados del Nombre". Fíjate que ya trae las dos claves juntas: juicio y reinado. Y entonces remata con una frase que es, literalmente, la tesis de este estudio: "עַל כֵּן יוֹם רֹאשׁ הַשָּׁנָה גָּדוֹל מִכֻּלָּם, אַף עַל פִּי שֶׁהוּא יוֹם דִּין אָסוּר לְהִתְעַנּוֹת בּוֹ, וְעֶזְרָא יוֹכִיחַ — por eso el día de Rosh Hashaná es mayor que todos ellos; AUNQUE ES DÍA DE JUICIO, ESTÁ PROHIBIDO AYUNAR EN ÉL, y Ezra lo demuestra". Ezra: es decir, la escena de Nechemiá 8, el pueblo llorando y los líderes ordenándole comer manjares. Ibn Ezra ya había hecho la conexión que nosotros creíamos estar descubriendo.`,
      },
      {
        etiqueta: "Sforno (סְפוֹרְנוֹ).",
        texto: `Sforno completa el argumento y le da la vuelta final. Comentando "zijrón teruá" escribe: "זִכְרוֹן תְּרוּעַת מֶלֶךְ, בָּהּ יָגִילוּ בְּמַלְכָּם — un recordatorio del TOQUE DE UN REY, con el cual se regocijan en su Rey", y cita para eso "aclamen a Dios nuestra fuerza, hagan sonar el cuerno" (Tehilim 81:2). O sea: la teruá de Rosh Hashaná no es, en su raíz, la sirena de un juicio; es la fanfarria de una entronización, el sonido con que se recibe a un monarca. Sforno reconoce después que ese mismo Rey "se sienta entonces sobre el trono de juicio, como llegó por tradición", y cita el verso del shofar de Tehilim 81:4-5. Y concluye: "וְרָאוּי לָנוּ לִשְׂמֹחַ אָז יוֹתֵר עַל שֶׁהוּא מַלְכֵּנוּ שֶׁיִּטֶּה כְּלַפֵּי חֶסֶד, וִיזַכֶּה אוֹתָנוּ בְּשָׁפְטוֹ אוֹתָנוּ — y nos corresponde alegrarnos entonces MÁS, porque Él es nuestro Rey, que se inclinará hacia la bondad y nos dará la razón al juzgarnos", apoyándose en Yeshayahu 33:22: "porque YHVH es nuestro juez, YHVH nuestro legislador, YHVH nuestro Rey: Él nos salvará". Léelo despacio: el verso pone juez, legislador y rey en la misma persona, y termina en "nos salvará". Cuando el juez es también el rey y también el salvador, el tribunal deja de ser un lugar del que uno espera lo peor.`,
      },
      {
        etiqueta: `El Rambam / Maimónides (הָרַמְבַּ"ם).`,
        texto: `El Rambam es el que le pone nombre al sonido. "Aunque el toque del shofar en Rosh Hashaná es un decreto de la Escritura, tiene una alusión, como diciendo: עוּרוּ יְשֵׁנִים מִשְּׁנַתְכֶם וְנִרְדָּמִים הָקִיצוּ מִתַּרְדֵּמַתְכֶם, DESPIERTEN, DORMIDOS, DE SU SUEÑO; ADORMECIDOS, SÁLGANSE DE SU LETARGO; examinen sus actos, vuelvan en teshuvá y acuérdense de su Creador. Estos son los que olvidan la verdad en las vanidades del tiempo y se extravían todo su año en vacío y vaciedad que no aprovecha ni salva" (Hiljot Teshuvá 3:4). Y en el mismo pasaje entrega la imagen que gobierna el día entero: "por eso necesita cada persona verse a sí misma todo el año como si estuviera mitad inocente y mitad culpable, y así también todo el mundo mitad y mitad. Si cometió un pecado, ya inclinó a sí mismo y al mundo entero hacia el platillo de la culpa… si cumplió un precepto, inclinó a sí mismo y al mundo entero hacia el platillo del mérito". Una balanza exactamente empatada, y un solo gesto tuyo decide el fiel. No es una metáfora tranquilizadora: es la más exigente que existe.`,
      },
      {
        etiqueta: `El Talmud — la coronación (רֹאשׁ הַשָּׁנָה ט"ז ע"א · ל"ד ע"ב).`,
        texto: `Si hay una frase que explica qué es este día, es esta, y el Talmud la trae dos veces. "Dijo el Santo, bendito sea: אִמְרוּ לְפָנַי בְּרֹאשׁ הַשָּׁנָה מַלְכִיּוֹת זִכְרוֹנוֹת וְשׁוֹפָרוֹת — digan delante de Mí en Rosh Hashaná Reinados, Memorias y Shofarot. מַלְכִיּוֹת כְּדֵי שֶׁתַּמְלִיכוּנִי עֲלֵיכֶם — Reinados, PARA QUE ME CORONEN REY SOBRE USTEDES; Memorias, para que suba la memoria de ustedes delante de Mí para bien; ¿y con qué? Con el shofar" (Rosh Hashaná 16a, y en boca de Rabá en 34b). La estructura de la oración central del día sale de aquí, y la Mishná la codifica: Malkuyot, Zijronot y Shofarot, con no menos de diez versos cada una, "sin mencionar memoria, reinado ni shofar de castigo", empezando por la Torá y terminando por los Profetas (Mishná Rosh Hashaná 4:5-6). Tres bloques: quién manda, quién se acuerda, con qué suena. Y el primero es el que da el tono: este no es un día en que se nos juzga y punto; es un día en que nosotros hacemos algo con Él. Lo coronamos.`,
      },
      {
        etiqueta: `El Talmud — el tribunal y los libros (רֹאשׁ הַשָּׁנָה ט"ז ע"ב · בְּרָכוֹת י"ב ע"ב).`,
        texto: `El costado severo del día tampoco se esconde. La Mishná dice que "en Rosh Hashaná todos los que entran al mundo pasan ante Él כִּבְנֵי מָרוֹן, como ovejas [contadas de a una]" (Mishná Rosh Hashaná 1:2). Y la Guemará añade la imagen que se volvió proverbial: "Dijo Rabí Kruspedai en nombre de Rabí Yojanán: שְׁלֹשָׁה סְפָרִים נִפְתָּחִין בְּרֹאשׁ הַשָּׁנָה — tres libros se abren en Rosh Hashaná: uno de completamente malvados, uno de completamente justos y uno de intermedios. Los completamente justos son escritos y sellados de inmediato para la vida; los completamente malvados, de inmediato para la muerte; los intermedios quedan suspendidos desde Rosh Hashaná hasta Yom Kipur: si merecen, se les escribe para la vida; si no, para la muerte" (Rosh Hashaná 16b). Y el reinado no es una idea decorativa: es ley. Durante estos diez días, en la oración diaria, cambian dos bendiciones — donde todo el año se dice "el Dios santo" y "Rey que ama la justicia y el juicio", ahora se dice הַמֶּלֶךְ הַקָּדוֹשׁ y הַמֶּלֶךְ הַמִּשְׁפָּט, "el REY santo" y "el REY del juicio" (Berajot 12b; codificado en Shulján Aruj, Oraj Jaim 582:1). Y si alguien se equivoca en "HaMelej HaKadosh", vuelve al principio de toda la oración. Así de cargada está esa palabra en estos días: no se puede pronunciar de más ni de menos.`,
      },
      {
        etiqueta: "El Midrash y el Yerushalmi — por qué se come y se viste de blanco.",
        texto: `El Talmud de Jerusalén pone la escena que ningún abogado del mundo entendería. "אֵי זוֹ אוּמָּה כְּאוּמָּה הַזֹּאת — ¿qué nación hay como esta nación? Lo normal en el mundo es que quien sabe que tiene juicio se vista de negro, se envuelva en negro y se deje crecer la barba, porque no sabe cómo saldrá su sentencia. Pero Israel no es así: se visten de blanco y se envuelven de blanco y se afeitan la barba וְאוֹכְלִין וְשׁוֹתִין וּשְׂמֵחִים — y comen y beben y se alegran, sabiendo que el Santo, bendito sea, les hace milagros" (Yerushalmi Rosh Hashaná 1:3). Y en el mismo lugar, la segunda mitad, que es todavía más audaz: "lo normal es que el gobernador diga «el juicio es hoy» y el bandido diga «el juicio es mañana» — ¿a quién se le hace caso? ¡Al gobernador! Pero el Santo, bendito sea, no es así: cuando el TRIBUNAL [humano] dice «hoy es Rosh Hashaná», el Santo, bendito sea, les dice a los ángeles servidores: levanten el estrado, que se pongan de pie los defensores y los acusadores, porque dijeron Mis hijos: hoy es Rosh Hashaná". El día del juicio del cielo empieza cuando lo fija un tribunal de la tierra. Es la coronación mirada desde el otro lado: el Rey le entrega el calendario a Sus hijos. La halajá recoge la consecuencia sin adornos: "אוֹכְלִים וְשׁוֹתִים וּשְׂמֵחִים וְאֵין מִתְעַנִּין בְּרֹאשׁ הַשָּׁנָה — se come, se bebe y se está alegre, y no se ayuna en Rosh Hashaná"; aunque enseguida agrega el freno: "pero que no coman hasta la saciedad completa, para que no se les vaya la cabeza y esté el temor de Dios sobre sus rostros" (Shulján Aruj, Oraj Jaim 597:1). Comer sí; anestesiarse, no.`,
      },
      {
        etiqueta: `El Arizal — Cabalá luriana (הָאֲרִ"י).`,
        texto: `{{study:el-ari|El Arizal}} hace con este día lo que hace siempre: le da una anatomía. Primero, resuelve la disputa del Talmud sobre si el mundo fue creado en Tishrei o en Nisán (Rosh Hashaná 10b-11a) sin darle la razón a ninguno: "אֵלּוּ וְאֵלּוּ דִּבְרֵי אֱלֹהִים חַיִּים — estas y estas son palabras del Dios vivo", porque no hablan del mismo asunto. La discusión, dice, es sobre el ORDEN en que entraron los מוֹחִין —las luces de conciencia— en la estructura llamada Zeir Anpin: Rabí Eliezer sostiene que entró primero el aspecto masculino, Rabí Yehoshúa que primero el femenino. Y añade: "בְּתִשְׁרֵי נִבְרָא הָעוֹלָם שֶׁהוּא ר״ה שֶׁהוּא רֹאשׁ דְּזָ״א הַנִּקְרָא שָׁנָה" — Tishrei es la CABEZA, y por eso "rosh hashaná", cabeza del año; Nisán es "cabeza de meses" y corresponde a Maljut (Sha'ar HaKavanot, Derushei Rosh Hashaná 1). Segundo, y aquí está lo asombroso: para el Arizal, el 1 de Tishrei es el día de la נְסִירָה, el "aserrado" — la operación por la cual Maljut, que estaba adosada de espaldas, es separada para poder estar cara a cara. Y lo que se transfiere en ese momento es, literalmente, una corona: "אֲחוֹרַיִים דְּכֶתֶר דְּזָ״א וְנִתָּנִין בְּכֶתֶר דְּנוּקְבָא… וּבְחִינָה זוֹ נַעֲשֵׂית בְּיוֹם א' שֶׁל ר״ה" — el reverso del Keter del masculino se le da al Keter de la femenina, y eso ocurre el PRIMER DÍA de Rosh Hashaná; la operación se completa el 10 de Tishrei, en Yom Kipur. Léelo en castellano llano: en el lenguaje del Arizal, lo que pasa hoy es que a la Presencia se le pone su propia corona — y los "juicios" (dinim) no son el castigo, son el material del que está hecha esa corona.`,
      },
      {
        etiqueta: `El Arizal — el secreto del shofar (פְּרִי עֵץ חַיִּים, שַׁעַר הַשּׁוֹפָר א').`,
        texto: `Y sobre el instrumento mismo, el Arizal deja cuatro preguntas que valen más que cualquier respuesta: "סוֹד הַשּׁוֹפָר — צָרִיךְ לֵידַע: מִי הוּא הַתּוֹקֵעַ, וּמִי הוּא הַפֶּה, וּמִי הוּא הַשּׁוֹפָר, וּמִי הוּא הַקּוֹל — el secreto del shofar: hay que saber quién es el que toca, quién es la boca, quién es el shofar y quién es el sonido" (Pri Etz Jaim, Sha'ar HaShofar 1). Y contesta: el shofar es {{study:elul|Biná}} — la Madre superior, la sefirá del entendimiento, la misma que el mes de Elul tiene por número. La boca es su boca. Y por ese sonido salen Zeir Anpin y Maljut "מְתֻקָּנִים עִם הַמּוֹחִין", reparados, ya con la conciencia puesta. Es decir: el shofar es un canal de nacimiento. Un cuerno hueco por el que algo sale al mundo formado. Y de pronto la frase de la liturgia deja de ser retórica: הַיּוֹם הֲרַת עוֹלָם, "hoy el mundo es concebido", y el verso de Yirmiyahu de donde viene dice רַחְמָהּ, "su VIENTRE". Si el shofar es la Madre, el sonido que sale de él es un parto. (Añade el Arizal un detalle de vocabulario que conviene guardar: תְּקִיעָה, el nombre del toque, viene de "תְּקִיעַת יָתֵד בְּמָקוֹם נֶאֱמָן", clavar una estaca en terreno firme. El sonido no flota: se clava.)`,
      },
      {
        etiqueta: `Sefat Emet — la voz jasídica (דְּבָרִים, רֹאשׁ הַשָּׁנָה ל"ג:ג').`,
        texto: `El Sefat Emet, el rebe de Gur, desarma con una sola observación la idea de que el shofar sea básicamente un instrumento de culpa. Comentando "subió Dios con teruá, YHVH con voz de shofar" (Tehilim 47:6) escribe: los toques vienen a despertar el pacto de los padres, la promesa que el Santo le juró a Avraham de recordar la Akedá — "וּבְוַדַּאי אֵין עִיקַּר הַשְּׁבוּעָה בַּעֲבוּר הַחוֹטְאִים, רַק הַשְּׁבוּעָה וּכְרִיתַת בְּרִית לְזַרְעָם לִהְיוֹת לָהֶם דְּבֵקוּת בְּהַקָּדוֹשׁ בָּרוּךְ הוּא — y ciertamente lo esencial del juramento NO es por causa de los pecadores; el juramento y el pacto son para que su descendencia tenga adhesión al Santo, bendito sea". El perdón, dice, es un efecto lateral del pacto, no su motivo: "por eso, desde el lado del pacto, perdona sus faltas y los ayuda a volver a adherirse a Él". Cambia el orden de las cosas y cambia el día entero: no se perdona para que haya relación; hay relación, y por eso se perdona.`,
      },
    ],
    glosa: `Glosa para el lector: Teruá = el toque quebrado del shofar; también, en la Torá, cualquier grito colectivo. Shofar = cuerno de animal (de carnero, en la práctica), no un instrumento musical con notas. Zijronot / Malkuyot / Shofarot = las tres bendiciones centrales de la oración de musaf: "memorias", "reinados", "shofares". Akedá = el "atado" de Itzjak, Bereshit 22. Musaf = la oración adicional de los días de fiesta. Bnei maron = expresión aramea de la Mishná; se entiende como ovejas contadas de a una al pasar por una puerta estrecha. Dimos = palabra griega que el midrash usa para "absuelto, dado de alta por el tribunal". Teshuvá = "retorno", no "penitencia". Biná = la sefirá del entendimiento, la Madre superior. Maljut = la sefirá del reinado, la Presencia; el receptáculo de todo lo que baja. Zeir Anpin = en el lenguaje del Arizal, la configuración de las seis sefirot emotivas, "el rostro pequeño". Mojín = literalmente "cerebros": las luces de conciencia que entran en una estructura. Nesirá = "aserrado": la operación por la que Maljut deja de estar adosada de espaldas y queda frente a frente. Keter = "corona", la sefirá más alta, la voluntad anterior a todo cálculo. Simanim = los alimentos-señal de la mesa de Rosh Hashaná. Kitel = la túnica blanca.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, los hechos son cinco y ninguno necesita interpretación. Primero: la Torá manda este día dos veces y en ninguna lo llama "año nuevo"; lo llama "recordatorio con toque" y "día de toque" (Vayikrá 23:24; Bamidbar 29:1). Segundo: la expresión "Rosh HaShaná" aparece una única vez en todo el Tanaj, y allí designa el día DIEZ del mes, no el uno (Yechezkel 40:1). Tercero: la tradición fija el contenido del día en tres bloques de diez versos —Malkuyot, Zijronot, Shofarot— y el propio Talmud dice para qué sirve el primero: "para que Me coronen Rey sobre ustedes" (Mishná Rosh Hashaná 4:5-6; Rosh Hashaná 16a y 34b). Cuarto: es día de juicio declarado, con tres libros abiertos y una sentencia que para la mayoría queda suspendida diez días (Mishná Rosh Hashaná 1:2; Rosh Hashaná 16b). Quinto: y sin embargo la halajá prohíbe ayunar y manda comer, beber y alegrarse (Shulján Aruj, Oraj Jaim 597:1), con la única condición de no llegar a la ligereza.`,
          `De esos cinco hechos sale el pshat del día: Rosh Hashaná es un juicio que se celebra. No un juicio que se sobrelleva, ni un juicio que se disimula con una fiesta: un juicio cuya forma correcta de vivirse es la alegría. Ibn Ezra lo dijo en cinco palabras — "aunque es día de juicio, está prohibido ayunar en él" — y remitió a Ezra como prueba. La razón no es que el juicio sea leve. Es que se sabe quién lo preside.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: las letras, los números, la forma)",
        parrafos: [
          `Primera alusión, y es del calendario. Si Rabí Eliezer dice que el mundo fue creado el 25 de Elul (Vayikrá Rabá 29:1), entonces el 1 de Tishrei es el sexto día — y el sexto día es el del hombre. Pero mira lo que la liturgia hace con eso: en musaf se dice "זֶה הַיּוֹם תְּחִלַּת מַעֲשֶׂיךָ זִכָּרוֹן לְיוֹם רִאשׁוֹן — este día es el comienzo de Tus obras, un recordatorio del DÍA PRIMERO". El propio midrash señala que esa fórmula litúrgica encaja con Rabí Eliezer, y la cita. O sea: la oración no dice "hoy es el día primero"; dice que hoy es un RECORDATORIO del día primero. La creación del mundo no se celebra: se recuerda. Lo que se celebra es el día en que apareció alguien capaz de recordarla. Un universo sin testigo no tiene aniversario.`,
          `Segunda alusión, y es de la letra del mes. El Sefer Yetzirá, en la versión del Gaón de Vilna, asigna a cada mes una letra, un signo y un órgano: "הִמְלִיךְ אוֹת ל'… וְצָר בָּהֶם מֹאזְנַיִם בָּעוֹלָם וְתִשְׁרֵי בַּשָּׁנָה — hizo reinar la letra {{letter:lamed|lámed}}… y formó con ella la BALANZA en el mundo, y TISHREI en el año" (Sefer Yetzirá, versión del Gra, cap. 5; verificado). Dos cosas ahí. Una: el signo del mes es מֹאזְנַיִם, la balanza — exactamente la imagen con la que el Rambam describe al hombre en Rosh Hashaná, "mitad inocente y mitad culpable", con un solo gesto capaz de inclinar el fiel (Hiljot Teshuvá 3:4). Dos: la lámed es la única letra del alfabeto hebreo que sobresale POR ENCIMA de la línea de escritura; todas las demás caben dentro del renglón o cuelgan por debajo, y ella sola sube. La letra del mes de la coronación es la letra que se levanta. (Nota de honestidad: la fórmula "וְקָשַׁר לוֹ כֶּתֶר", "y le ató una corona", que el Sefer Yetzirá usa aquí, la usa igual para las veintidós letras; no es exclusiva de la lámed y no se debe presentar como si lo fuera.)`,
          `Tercera alusión, y es la del sonido. La ley tuvo que definir qué es exactamente una teruá, y para hacerlo el Talmud fue al Targum: "יוֹם תְּרוּעָה יִהְיֶה לָכֶם", "día de teruá será para ustedes", que el arameo traduce "יוֹם יַבָּבָא יְהֵא לְכוֹן", día de YEVAVÁ. ¿Y qué es una yevavá? El Talmud busca la palabra en el Tanaj y la encuentra en un solo lugar: "בְּעַד הַחַלּוֹן נִשְׁקְפָה וַתְּיַבֵּב אֵם סִיסְרָא — por la ventana se asomó y SOLLOZÓ la madre de Sísara" (Shoftim 5:28, citado en Rosh Hashaná 33b). Detente aquí. El sonido más sagrado del calendario judío está legalmente definido por el llanto de una mujer que espera un hijo que no volverá — y el hijo es Sísara, el general enemigo, y la que llora es la madre del enemigo. Los sabios discutieron después si ese sollozo es un gemido entrecortado (los shevarim) o un gimoteo corto y rápido (la teruá), y como no se resolvió, Rabí Abahu instituyó en Cesarea hacer los dos, y en todas las combinaciones (Rosh Hashaná 34a). Por eso tu shofar suena hoy como suena: porque hace mil ochocientos años nadie logró decidir de qué manera exacta llora una madre.`,
          `Cuarta alusión, y es una gematría que cierra exacta. שׁוֹפָר = ש300 + ו6 + פ80 + ר200 = 586. Y la palabra "Jerusalén", en la grafía defectiva que usa el Tanaj —יְרוּשָׁלִַם, sin la segunda yud— vale י10 + ר200 + ו6 + ש300 + ל30 + ם40 = 586. Verificado: shofar = Yerushaláim = 586. Y no es un juego suelto: el verso del "shofar grande" es precisamente el que termina en esa ciudad — "וְהָיָה בַּיּוֹם הַהוּא יִתָּקַע בְּשׁוֹפָר גָּדוֹל… וְהִשְׁתַּחֲווּ לַיהֹוָה בְּהַר הַקֹּדֶשׁ בִּירוּשָׁלָ͏ִם, y sucederá en aquel día que se tocará un shofar grande… y se postrarán ante YHVH en el monte santo, en Jerusalén" (Yeshayahu 27:13, donde el nombre está escrito exactamente así, defectivo). El cuerno de hoy y la ciudad {{study:tercer-templo|del final}} pesan lo mismo. La forma de la lámed —una letra que sube— y el número del shofar apuntan al mismo sitio.`,
          `Quinta alusión, y es la más pequeña: el shofar de Rosh Hashaná debe ser CURVO. La Guemará explica la razón de la opinión aceptada con seis palabras: "בְּרֹאשׁ הַשָּׁנָה, כַּמָּה דְּכָיֵיף אִינִישׁ דַּעְתֵּיהּ טְפֵי מְעַלֵּי — en Rosh Hashaná, cuanto más doble una persona su mente, mejor" (Rosh Hashaná 26b). Es decir: la forma del instrumento traduce la postura del que lo toca. En el día en que se corona al Rey, el objeto que se lleva a la boca está doblado.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          `Vuelve al midrash del principio, porque el drash está entero ahí y es más duro de lo que parece. "Así como te presentaste ante Mí a juicio en este día y saliste absuelto, así tus hijos habrán de presentarse ante Mí a juicio en este día y saldrán absueltos" (Vayikrá Rabá 29:1). Nadie se fija en el detalle: Adam salió absuelto DESPUÉS de haber transgredido. En la décima hora comió; en la undécima fue juzgado; en la duodécima salió libre. No lo absolvieron por inocente. Lo absolvieron siendo culpable. Eso es lo que se conmemora. Y por eso la mesa de Rosh Hashaná no es la mesa de quien se cree limpio: es la mesa de quien sabe que el precedente del día es un culpable que salió caminando.`,
          `Ahora pon al lado de eso la escena del Yerushalmi y verás lo que realmente se está diciendo. "Lo normal en el mundo es que quien sabe que tiene juicio se vista de negro… pero Israel no es así: se visten de blanco… y comen y beben y se alegran" (Yerushalmi Rosh Hashaná 1:3). Fíjate que el texto no dice que Israel no tenga juicio, ni que el juicio sea una formalidad. Dice que Israel conoce al juez. La ropa blanca no es negación del tribunal: es una declaración sobre quién lo preside. Y la halajá cuidó de que esa alegría no se volviera anestesia: coman, beban, alégrense, "pero que no coman hasta la saciedad completa, para que no se les vaya la cabeza y esté el temor de Dios sobre sus rostros" (Shulján Aruj, Oraj Jaim 597:1). Alegría con la cabeza puesta. Eso es lo difícil: el negro del acusado y la fiesta del inconsciente son las dos salidas fáciles; lo que este día pide es la tercera.`,
          `Aquí entra la voz jasídica, y aporta lo que a este día le faltaba: el sonido sin palabras. El Baal Shem Tov enseñó —es enseñanza general del jasidismo, no una cita de folio— que el grito que sale del fondo del corazón, precisamente porque no encuentra palabras, atraviesa lo que ningún discurso atraviesa. Y aquí el dato de la ley le da la razón sin proponérselo: el sonido del día está definido por un llanto (Rosh Hashaná 33b), y el instrumento es un cuerno hueco que no articula ni una sílaba. En un día entero de liturgia, con treinta versículos escogidos y bendiciones larguísimas, el mandamiento bíblico es lo único que NO habla. El Sefat Emet lo dice desde el otro lado y completa la idea: lo esencial del shofar no es el pecado, es el pacto — "אֵין עִיקַּר הַשְּׁבוּעָה בַּעֲבוּר הַחוֹטְאִים", el juramento no es principalmente por causa de los pecadores. Un hijo que grita no está argumentando su caso. Está probando que es hijo.`,
          `Y aquí se ve el hilo que viene del estudio anterior. En {{study:elul|Elul}} el nombre del mes está escrito en las iniciales de "yo soy de mi Amado y mi Amado es mío" (Shir HaShirim 6:3): un mes entero cuyo trabajo es que el primer paso lo dé el alma. Bien: ese acercamiento no queda flotando. En Tishrei se presenta a juicio y se convierte en coronación. La secuencia completa es esta, y es de una lógica implacable: primero yo salgo a buscarlo (Elul), después Lo corono Rey (Rosh Hashaná), y solo entonces la relación se sella (Yom Kipur). No se puede coronar a alguien de quien uno estuvo huyendo todo el año sin haber caminado antes hacia él. Los cuarenta días de Elul no son la antesala del juicio: son la única manera de llegar al juicio de pie.`,
          `Falta una vuelta más, y es la que el Yerushalmi guarda para el final. "Cuando el tribunal [humano] dice «hoy es Rosh Hashaná», el Santo, bendito sea, les dice a los ángeles servidores: levanten el estrado… porque dijeron Mis hijos: hoy es Rosh Hashaná". Y en el mismo pasaje, Rabí Ila: "אִם קְרִיתֶם אוֹתָם הֵם מוֹעֲדַיי, וְאִם לָאו אֵינָן מוֹעֲדַיי — si ustedes los declaran, son Mis fiestas; y si no, no son Mis fiestas". Piénsalo junto con "para que Me coronen Rey sobre ustedes". Un rey no se corona a sí mismo. La corona la pone otro. Este es el único día del año en que la liturgia le pide al hombre que haga algo POR Dios en vez de pedirle algo a Dios — y resulta que ese acto es también, exactamente, la defensa del acusado. Coronarlo es reconocer Su autoridad; reconocer Su autoridad es someterse al juicio; someterse al juicio es la única forma de ganarlo.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto del día es una inversión de lo que uno cree que significa "juicio". Rav Yehuda Ashlag (Baal HaSulam) apoya toda su lectura de la Cabalá en una sola frase que trae al principio de su introducción al Talmud Eser HaSefirot: "שֶׁבָּרָא הָעוֹלָמוֹת כְּדֵי לְהֵיטִיב לִנְבְרָאָיו, כִּי מִדֶּרֶךְ הַטּוֹב לְהֵיטִיב — creó los mundos para hacer bien a Sus criaturas, porque es propio del Bueno hacer el bien". Si eso es cierto —y para Ashlag es el axioma del que cuelga todo lo demás—, entonces el juicio no puede ser lo contrario del propósito de {{study:finalidad-creacion|la creación}}: tiene que ser su instrumento. Un juez que quiere condenarte no te da diez días. Un juez que abre un libro para los "intermedios" y lo deja suspendido hasta Yom Kipur (Rosh Hashaná 16b) no está buscando culpables: está dando tiempo.`,
          `Y aquí la Cabalá luriana entrega la estructura que hace que esto no sea solo una idea consoladora. Para el Arizal, lo que ocurre el 1 de Tishrei es la נְסִירָה: Maljut —la Presencia, el receptáculo, la parte de la realidad que solo sabe recibir— es separada de la espalda de Zeir Anpin y comienza a recibir su propio Keter, su propia corona, hecha precisamente con los "juicios" (Sha'ar HaKavanot, Derushei Rosh Hashaná 1). Traducido a castellano sin jerga: para que dos puedan mirarse de frente, primero hay que despegarlos; y despegar duele. Lo que llamamos juicio es el nombre que tiene, desde abajo, la operación de ser separado de la comodidad de estar pegado de espaldas. Nadie recibe corona sin ser separado antes. El "din" no es la negación del amor: es la cirugía que lo hace posible cara a cara.`,
          `Y el shofar es el instrumento de esa cirugía, en el sentido más literal que da la fuente. "¿Quién es el que toca, quién es la boca, quién es el shofar y quién es el sonido?" — y la respuesta del Arizal es que el shofar es Biná, la Madre, y que por ese cuerno hueco salen Zeir Anpin y Maljut "reparados, con la conciencia puesta" (Pri Etz Jaim, Sha'ar HaShofar 1). El shofar no es un megáfono para que nos oigan: es un canal de nacimiento. Ahora vuelve a la liturgia: "הַיּוֹם הֲרַת עוֹלָם", hoy el mundo es concebido — y la frase viene de un verso que habla de un רֶחֶם, un vientre (Yirmiyahu 20:17). Y vuelve a Elul, cuyo número es el de Biná: allí el trabajo era volver a la Madre; aquí, la Madre da a luz. Un mes para volver al vientre, un día para salir de él respirando. Ese es el sod de la serie, y no lo inventamos: está en el vocabulario de las fuentes.`,
          `Queda la pieza última, la que cierra el círculo con el pshat. La ley dice que si te equivocas y dices "el Dios santo" en vez de "el REY santo", vuelves al principio de toda la oración (Berajot 12b; Shulján Aruj, Oraj Jaim 582:1). ¿Por qué es tan grave un sinónimo? Porque no son sinónimos. "Dios" describe lo que Él es, y eso no depende de nadie. "Rey" describe una relación, y una relación sin la otra parte no existe. Se puede ser Dios en soledad; no se puede ser Rey sin súbditos. Por eso "para que Me coronen Rey sobre USTEDES": la palabra que este día exige es precisamente la única que necesita que tú la pronuncies para ser verdad.`,
        ],
      },
    ],
    caja: {
      titulo:
        "El día seis, no el día uno. Una corona que la pone otro. Y un sonido que no dice palabras.",
      cuerpo:
        "El mundo fue creado el 25 de Elul (Vayikrá Rabá 29:1): el 1 de Tishrei es el sexto día, el del hombre — y el primer juicio de la historia terminó en absolución de un culpable. La finalidad del día es que Lo coronemos (Rosh Hashaná 16a: «para que Me coronen Rey sobre ustedes»), y un rey no se corona solo. El instrumento del juicio es un cuerno curvo cuyo sonido la ley define por el llanto de una madre (Rosh Hashaná 33b). Por eso se come, se bebe y se viste de blanco (Yerushalmi Rosh Hashaná 1:3): no porque no haya tribunal, sino porque se sabe quién lo preside. Verificado: שׁוֹפָר = 586 = יְרוּשָׁלִַם (grafía defectiva del Tanaj).",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que el miedo y la seriedad no son lo mismo. Yo había aprendido que un día de juicio se enfrenta con la cara larga, y resulta que la tradición manda exactamente lo contrario: ropa blanca, mesa puesta, cosas dulces — y al mismo tiempo prohíbe llegar a la ligereza. Eso me pone frente a una postura que casi no practico: tomarme algo completamente en serio sin tenerle terror. La diferencia no está en la gravedad del asunto; está en quién está del otro lado de la mesa. Y me enseña algo más incómodo: el precedente que se celebra hoy no es el de un inocente que fue absuelto, sino el de un culpable que lo fue.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón de la inversión. Una frase que en su origen maldice el haber nacido se convierte en el anuncio del nacimiento del mundo. Un llanto de la madre del enemigo se convierte en la definición legal del sonido más sagrado del año. Un cuerno de animal, doblado, se convierte en el instrumento de una coronación. En cada caso lo mismo: no se descarta lo bajo ni lo ajeno ni lo torcido; se lo eleva. Y veo el patrón de la balanza: la letra del mes trae por signo la balanza, y el Rambam me pinta exactamente empatado, con un solo gesto capaz de inclinar el mundo. No se me pide ser mejor de lo que soy. Se me pide un gramo más de un lado.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Me da un lugar para lo que no sé decir. Todo el día está lleno de palabras —treinta versos escogidos, bendiciones largas— y sin embargo la única obligación bíblica es un sonido que no articula nada. Eso me dice que mi alma no está obligada a formular su caso. Lo que en mí no encuentra palabras —lo que no supe explicar en todo el año, lo que ni a mí mismo me sé decir— no es un déficit que tenga que resolver antes de presentarme: es precisamente lo que hoy se hace oír. Y el instrumento está curvo: se me pide doblar la cabeza, no bajarla.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Que el universo no tiene aniversario sin alguien que lo recuerde. La liturgia no dice "hoy es el día primero"; dice que hoy es un RECORDATORIO del día primero — y ese recordatorio existe porque en el día sexto apareció una criatura capaz de acordarse. Y hay algo más grande todavía: el cielo espera a que un tribunal de la tierra fije la fecha. La creación no está terminada del lado de allá esperando que la miremos; está esperando que la nombremos. El mundo necesita que alguien diga "hoy" — y ese alguien no es Dios.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, corona a alguien: dile a UNA persona, en voz alta y con su nombre, la autoridad que de verdad tiene sobre ti.",
    texto: `El acto central del día no es pedir: es coronar. Y coronar significa reconocer en voz alta una autoridad que ya existía pero que nadie había pronunciado. Así que hazlo hoy, en la escala en la que puedes hacerlo, y hazlo con la boca, no con el pensamiento — porque en el idioma de este día la palabra "Rey" no es verdad hasta que alguien la dice.

Primera capa, hoy mismo: elige UNA persona a la que le debas algo que nunca nombraste — el que te enseñó el oficio, el que te sostuvo un año malo, tu padre, tu madre, un maestro, un socio. Llámala, o escríbele, y dile con precisión lo que hizo y lo que eso pesa hoy en tu vida. No un "gracias por todo": una frase concreta con un hecho concreto. Eso es una coronación en tamaño humano, y cuesta exactamente lo que cuesta la de arriba: renunciar a la ficción de que uno se hizo solo.

Segunda capa, hoy también, y es la parte del shofar: siéntate cinco minutos y busca lo que en ti no tiene palabras. No lo redactes. La ley definió el sonido del día como un sollozo, y el instrumento no articula: lo que te pesa y no sabes formular no necesita traducción para ser presentado. Si sabes decirlo, dilo; si no, quédate ahí sin resolverlo. Y no salgas de esos cinco minutos sin UNA decisión mínima, del tamaño del gramo que inclina la balanza del Rambam: un hábito que se corta, una llamada semanal que se sostiene, un dinero que se aparta. Uno. Concreto. Con fecha.

Y tercera, para la mesa de la noche del 12 de septiembre: pon los simanim (Shulján Aruj, Oraj Jaim 583:1 — y la manzana con miel, que trae el Rema) y, antes de comer, léele a tu familia el verso de Nechemiá 8:10 en voz alta: "no se entristezcan, porque la alegría de YHVH es su fortaleza". Es una orden bíblica dicha un 1 de Tishrei a gente que estaba llorando. Cúmplela — pero recuerda el freno de la halajá: comer, sí; anestesiarse, no.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Rosh Hashaná no es el aniversario del mundo sino el del HOMBRE. Rabí Eliezer enseña que el mundo fue creado el 25 de Elul (Vayikrá Rabá 29:1), de modo que el 1 de Tishrei es el día sexto: el día en que Adam fue formado, pecó, fue juzgado y salió absuelto en la duodécima hora. "Esto es una señal para tus hijos", le dijo el Santo. El precedente del día no es un inocente que fue declarado inocente: es un culpable que salió caminando.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El acto central del día es una coronación, y lo dice el Talmud sin metáforas: "Digan delante de Mí en Rosh Hashaná Malkuyot, Zijronot y Shofarot. Malkuyot, para que Me coronen Rey sobre ustedes" (Rosh Hashaná 16a y 34b). Y no es literatura: durante estos diez días la ley cambia dos palabras de la oración diaria, "el Dios santo" pasa a ser "el REY santo", y quien se equivoca vuelve al principio (Berajot 12b; Shulján Aruj, Oraj Jaim 582:1). Se puede ser Dios en soledad; no se puede ser Rey sin que alguien lo diga.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El juicio se pronuncia con un instrumento que no dice palabras — y la ley definió ese sonido con el llanto de la madre de Sísara, la madre del enemigo (Rosh Hashaná 33b, sobre Shoftim 5:28). El shofar debe ser curvo, "porque en Rosh Hashaná, cuanto más doble una persona su mente, mejor" (Rosh Hashaná 26b). Y para el Arizal ese cuerno hueco es Biná, la Madre: un canal de nacimiento por el que la realidad sale reparada (Pri Etz Jaim, Sha'ar HaShofar 1). Por eso la liturgia dice הַיּוֹם הֲרַת עוֹלָם — hoy el mundo es concebido.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Comer, beber y alegrarse, porque así lo manda la halajá y lo prueba Ezra: "aunque es día de juicio, está prohibido ayunar en él, y Ezra lo demuestra" (Ibn Ezra a Vayikrá 23:24, sobre Nechemiá 8:10). Vestirse de blanco, no de negro, no porque no haya tribunal sino porque se conoce al juez (Yerushalmi Rosh Hashaná 1:3). Y coronar a alguien hoy con la boca: nombrar en voz alta una autoridad que ya existía y que nunca dijiste.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — dos jidushim de Jashmal",
    rotulo:
      "No son citas ni fuentes clásicas: son dos lecturas de Jashmal sobre textos verificados, marcadas como tales.",
    parrafos: [
      `Primera. En el estudio anterior de esta serie señalamos que la palabra "Elul" aparece una sola vez en todo el Tanaj, y que es en Nechemiá 6:15: "וַתִּשְׁלַם הַחוֹמָה בְּעֶשְׂרִים וַחֲמִשָּׁה לֶאֱלוּל — y se terminó el muro a los VEINTICINCO DE ELUL". Ahora ponlo al lado del midrash de este estudio: "תָּנֵי בְּשֵׁם רַבִּי אֱלִיעֶזֶר: בְּעֶשְׂרִים וַחֲמִשָּׁה בֶּאֱלוּל נִבְרָא הָעוֹלָם — se enseña en nombre de Rabí Eliezer: el veinticinco de Elul fue creado el mundo" (Vayikrá Rabá 29:1). Las dos fuentes están verificadas y ninguna de las dos menciona a la otra. Pero la fecha es la misma: el día en que, según Rabí Eliezer, el mundo empezó a existir es el mismo día en que, según el único versículo del Tanaj que nombra a Elul, se cerró la última brecha de un muro arruinado. La tradición no hace doctrina de esto y nosotros tampoco. Solo lo dejamos dicho: el aniversario de la creación cae, en el único registro bíblico de esa fecha, sobre una reparación que se termina justo a tiempo.`,
      `Segunda, y es una gematría. הַיּוֹם, "hoy" —la palabra con la que abre la fórmula central de musaf, "hoy el mundo es concebido, hoy hace comparecer a juicio…"— vale ה5 + י10 + ו6 + ם40 = 61. Y אֲנִי, "yo" —la palabra con la que abre el verso del que sale el nombre del mes de {{study:elul|Elul}}, "yo soy de mi Amado"— vale א1 + נ50 + י10 = 61. Verificado: las dos suman 61. No conocemos una fuente clásica que junte estas dos palabras, y por eso esto va aquí y no en el cuerpo del estudio. Pero la serie entera cabe en esa coincidencia: en Elul la primera palabra es YO, y en Rosh Hashaná la primera palabra es HOY. El que dijo "yo" durante cuarenta días es el que ahora puede decir "hoy" y hacer que el cielo levante el estrado.`,
    ],
  },

  hemshej: [
    "{{study:elul|Antes del juicio vinieron cuarenta días de acercamiento. אֱלוּל son las iniciales de «yo soy de mi Amado»: el mes en que el primer paso es mío.}}",
    "{{letter:lamed|La letra del mes de Tishrei es la lámed: la única del alfabeto que sobresale por encima de la línea. ¿Por qué la letra que se levanta rige el mes de la coronación?}}",
    "{{study:el-ari|Para el Arizal, hoy se corta lo que estaba pegado de espaldas para que pueda haber un rostro frente a otro. ¿Qué es la nesirá y por qué duele?}}",
    "{{study:finalidad-creacion|Si «es propio del Bueno hacer el bien», ¿para qué existe el juicio? La finalidad de la creación según Baal HaSulam.}}",
  ],

  ctaRef: "Nehemiah 8:10",
};
