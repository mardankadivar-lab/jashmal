
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — תִּשְׁעָה בְּאָב · אֵיכָה יָשְׁבָה בָדָד
//  Serie «Tiempos Sagrados» (moadim) · Estudio 11 — Tishá BeAv y las Tres
//  Semanas. Último estudio del ciclo anual: desemboca en Elul.
//
//  Hero en modo "par": מְנַחֵם = צֶמַח = 138. NO es una gematría de Jashmal:
//  la enuncia la fuente misma —"וְלֹא פְלִיגֵי, חוּשְׁבְּנֵיהּ דַּהֲדֵין
//  כְּחוּשְׁבְּנֵיהּ דַּהֲדֵין, הוּא צֶמַח הוּא מְנַחֵם" (Talmud Yerushalmí,
//  Berajot 2:4; paralelo en Eijá Rabá 1:51)— y aquí se verificó letra por letra.
//  Se eligió el modo "par" en vez de "dimensiones" precisamente porque este
//  número NO recae sobre la catástrofe sino sobre el consuelo.
//
//  FUENTES VERIFICADAS CONTRA LA API DE SEFARIA (2026-08-27).
//  Todo el hebreo citado abajo se trajo de la API, no de memoria.
//
//  MISHNÁ Y TALMUD BAVLÍ
//   · Mishná Taanit 4:6 — las cinco cosas del 17 de Tamuz y las cinco del 9 de
//     Av, incluida "נִגְזַר עַל אֲבוֹתֵינוּ שֶׁלֹּא יִכָּנְסוּ לָאָרֶץ", y
//     "מִשֶּׁנִּכְנַס אָב, מְמַעֲטִין בְּשִׂמְחָה". Cotejada entera.
//   · Mishná Taanit 4:8 — Rabán Shimón ben Gamliel: "לֹא הָיוּ יָמִים טוֹבִים
//     לְיִשְׂרָאֵל כַּחֲמִשָּׁה עָשָׂר בְּאָב וּכְיוֹם הַכִּפּוּרִים". Cotejada.
//   · Taanit 29a — Rabá en nombre de Rabí Yojanán: "אוֹתוֹ לַיְלָה לֵיל תִּשְׁעָה
//     בְּאָב הָיָה… אַתֶּם בְּכִיתֶם בְּכִיָּה שֶׁל חִנָּם, וַאֲנִי קוֹבֵעַ
//     לָכֶם בְּכִיָּה לְדוֹרוֹת". Cotejado palabra por palabra. En ese mismo
//     folio: Rabí Yojanán ("אִלְמָלֵי הָיִיתִי בְּאוֹתוֹ הַדּוֹר לֹא קְבַעְתִּיו
//     אֶלָּא בָּעֲשִׂירִי") y los rabanán ("אַתְחַלְתָּא דְפוּרְעֲנוּתָא
//     עֲדִיפָא"); la baraíta "מְגַלְגְּלִין זְכוּת לְיוֹם זַכַּאי וְחוֹבָה
//     לְיוֹם חַיָּיב"; y los jóvenes sacerdotes que arrojan las llaves.
//   · Sotá 35a — el paralelo de la misma enseñanza, con dos variantes reales:
//     "אוֹתוֹ הַיּוֹם עֶרֶב תִּשְׁעָה בְּאָב הָיָה" y "הֵן בָּכוּ". Cotejado.
//     Ahí también R. Yojanán en nombre de R. Meir: "כָּל לָשׁוֹן הָרַע שֶׁאֵין
//     בּוֹ דְּבַר אֱמֶת בִּתְחִילָּתוֹ אֵין מִתְקַיֵּים בְּסוֹפוֹ".
//   · Guitín 55b–56a — Kamtzá y Bar Kamtzá completo, y Rabí Yojanán:
//     "עִנְוְותָנוּתוֹ שֶׁל רַבִּי זְכַרְיָה בֶּן אַבְקוּלַס הֶחְרִיבָה אֶת
//     בֵּיתֵנוּ וְשָׂרְפָה אֶת הֵיכָלֵנוּ וְהִגְלְתָנוּ מֵאַרְצֵנוּ". Cotejado.
//   · Yomá 9b — "מִקְדָּשׁ שֵׁנִי שֶׁהָיוּ עוֹסְקִין בְּתוֹרָה וּבְמִצְוֹת
//     וּגְמִילוּת חֲסָדִים, מִפְּנֵי מָה חָרַב? מִפְּנֵי שֶׁהָיְתָה בּוֹ
//     שִׂנְאַת חִנָּם", y "רִאשׁוֹנִים שֶׁנִּתְגַּלָּה עֲוֹנָם נִתְגַּלָּה
//     קִצָּם; אַחֲרוֹנִים שֶׁלֹּא נִתְגַּלָּה עֲוֹנָם לֹא נִתְגַּלָּה קִצָּם".
//     Cotejado. También "אוֹכְלִין וְשׁוֹתִין זֶה עִם זֶה וְדוֹקְרִין זֶה אֶת
//     זֶה בַּחֲרָבוֹת שֶׁבִּלְשׁוֹנָם".
//   · Taanit 30b — "כָּל הַמִּתְאַבֵּל עַל יְרוּשָׁלַיִם זוֹכֶה וְרוֹאֶה
//     בְּשִׂמְחָתָהּ" (sobre Yeshayahu 66:10), y RaShBaG sobre el 15 de Av;
//     Rabá bar bar Janá en nombre de R. Yojanán: el 15 de Av es "יוֹם שֶׁכָּלוּ
//     בּוֹ מֵתֵי מִדְבָּר". Cotejado.
//   · Rosh Hashaná 18b — Rav Janá bar Bizná en nombre de R. Shimón Jasidá:
//     "בִּזְמַן שֶׁיֵּשׁ שָׁלוֹם יִהְיוּ לְשָׂשׂוֹן וּלְשִׂמְחָה, אֵין שָׁלוֹם
//     צוֹם"; Rav Papá con los tres estados; y "שָׁאנֵי תִּשְׁעָה בְּאָב,
//     הוֹאִיל וְהוּכְפְּלוּ בּוֹ צָרוֹת". Cotejado entero.
//   · Berajot 4b — R. Yojanán sobre la nun ausente del Ashrei ("נָפְלָה לֹא
//     תוֹסִיף קוּם בְּתוּלַת יִשְׂרָאֵל", Amós 5:2), la relectura de Erets
//     Israel ("נָפְלָה וְלֹא תּוֹסִיף לִנְפּוֹל עוֹד, קוּם בְּתוּלַת יִשְׂרָאֵל")
//     y Rav Najmán bar Yitzjak ("חָזַר דָּוִד וּסְמָכָן בְּרוּחַ הַקֹּדֶשׁ,
//     שֶׁנֶּאֱמַר סוֹמֵךְ ה' לְכָל הַנֹּפְלִים"). Cotejado.
//
//  TALMUD YERUSHALMÍ Y MIDRASH
//   · Talmud Yerushalmí, Berajot 2:4 — el labrador, el árabe y la vaca que muge;
//     "אָמַר לֵיהּ מַה שְׁמֵיהּ? מְנַחֵם… וּמַה שְׁמֵיהּ דְּאָבוֹי? חִזְקִיָּה";
//     la madre: "דִּבְיוֹמָא דְאִיתְיַלִּיד אִיחְרוּב בֵּית מוּקְדְּשָׁא"; y la
//     respuesta: "רְחִיצֵיא אֲנָן דִּבְרַגְלֵיהּ חֲרֵיב וּבְרַגְלֵיהּ
//     מִתְבְּנֵיי". Y la gematría de la fuente: "וְלֹא פְלִיגֵי, חוּשְׁבְּנֵיהּ
//     דַּהֲדֵין כְּחוּשְׁבְּנֵיהּ דַּהֲדֵין, הוּא צֶמַח הוּא מְנַחֵם".
//     Cotejado entero.
//   · Eijá Rabá 1:51 — el paralelo del mismo relato (allí "בְּבִירַת עַרְבָא
//     בִּדְבֵית לֶחֶם יְהוּדָה" y "עַל רַגְלוֹי חָרַב וְעַל רַגְלוֹי מִיתְבְּנֵי"),
//     sobre Eijá 1:16 "כִּי רָחַק מִמֶּנִּי מְנַחֵם". Cotejado.
//   · Eijá Rabá, Petijtá 4 — Rabí Abahu: "וְקוֹנַנְתִּי עָלָיו אֵיכָה, שֶׁנֶּאֱמַר
//     וַיֹּאמֶר לוֹ אַיֶּכָּה — אֵיכָה כְּתִיב". Cotejado literalmente.
//   · Eijá Rabá 1:1 — los tres que profetizaron con la palabra "eijá" (Moshé,
//     Yeshayahu, Yirmiyahu) y la parábola de la matrona de Rabí Leví; y Ben
//     Azai descomponiendo אֵיכָ״ה. Cotejado.
//   · Bereshit Rabá 85:1 — "וְהַקָּדוֹשׁ בָּרוּךְ הוּא הָיָה עוֹסֵק בּוֹרֵא
//     אוֹרוֹ שֶׁל מֶלֶךְ הַמָּשִׁיחַ" y "קֹדֶם שֶׁלֹּא נוֹלַד מְשַׁעְבֵּד
//     הָרִאשׁוֹן נוֹלַד גּוֹאֵל הָאַחֲרוֹן". Cotejado.
//
//  TANAJ (texto puntuado traído de la API)
//   · Bamidbar 13:32 · 14:1 · 14:2 — la calumnia y el llanto de aquella noche.
//   · Eijá 1:1 · 1:2 · 1:16 · 3:22-24 · 5:1 · 5:16 · 5:21-22.
//   · Zejaryá 8:19 · Yeshayahu 40:1 · 66:10 · 1:21 · Devarim 1:12 · Tehilim 137:1.
//
//  COMENTARISTAS
//   · Rashi a Eijá 1:1 — "הָיְתָה כְּאַלְמָנָה: וְלֹא אַלְמָנָה מַמָּשׁ, אֶלָּא
//     כְּאִשָּׁה שֶׁהָלַךְ בַּעְלָהּ לִמְדִינַת הַיָּם וְדַעְתּוֹ לַחֲזוֹר
//     אֶצְלָהּ". Cotejado. Y a Eijá 1:2 — "שְׁתֵּי בְכִיּוֹת עַל שְׁתֵּי
//     חֻרְבָּנִין" y "לַיְלָה שֶׁל בְּכִיַּת מְרַגְּלִים בְּתִשְׁעָה בְאָב
//     גָּרְמָה לָהֶם". Y a Eijá 3:23. Cotejados.
//     HONESTIDAD: Rashi a Bamidbar 14:1 comenta SOLO "כל העדה — סנהדראות".
//     Se dice así, no se le pone nada más en la boca.
//   · Ibn Ezra a Eijá 1:1 y a Bamidbar 14:1 — puramente gramatical en ambos
//     sitios. Cotejado; se cita tal cual, sin inflarlo.
//   · Ramban a Bamidbar 14:1 — cita Taanit 29 y admite: "וְלֹא יָדַעְתִּי
//     מֵאֵיזֶה רֶמֶז שֶׁבַּפָּרָשָׁה הוֹצִיאוּ זֶה", y ofrece Tehilim 106:24-27
//     como "מִקְרָא מָלֵא הוּא". Cotejado.
//   · Malbim a Bamidbar 14:1 — el pecado real no fue el informe sobre la tierra
//     sino "מִפַּחְדָּם לְהִלָּחֵם… וְלֹא הֶאֱמִינוּ", y de ahí llegaron a
//     "בְּשִׂנְאַת ה' אוֹתָנוּ הוֹצִיאָנוּ מֵאֶרֶץ מִצְרַיִם". Cotejado.
//     HONESTIDAD: Sefaria NO aloja comentario de Malbim a Eijá. No se le cita ahí.
//   · Abarbanel a Bamidbar 13:1 — su método de "שאלות", y su lectura:
//     "לְבַדּוֹ שְׁלָחָם וְהִזְהִירָם שֶׁאֵלָיו יָשִׁיבוּ הַדְּבָרִים וְלֹא
//     לְכָל הָעֵדָה, אַךְ הֵם לֹא עָשׂוּ כֵן". Cotejado.
//     HONESTIDAD: Sefaria NO aloja Abarbanel a Eijá (la consulta da error).
//   · Or HaJaim a Bamidbar 14:1 — "וַיִּבְכּוּ הָעָם" y no "כל העדה": no todos
//     lloraron. Cotejado.
//   · Rambam, Hiljot Taaniot 5:1 (el porqué de los ayunos: "לְעוֹרֵר הַלְּבָבוֹת
//     לִפְתֹּחַ דַּרְכֵי הַתְּשׁוּבָה"), 5:2, 5:3 (Beitar) y 5:19 —la última
//     halajá del tratado— "כָּל הַצּוֹמוֹת הָאֵלּוּ עֲתִידִים לִבָּטֵל לִימוֹת
//     הַמָּשִׁיחַ… וַעֲתִידִים לִהְיוֹת יוֹם טוֹב". Cotejados.
//
//  CABALÁ Y JASIDUT
//   · Arizal — Shaar HaKavanot, Derushei Tikún Jatzot, drush 1. Cotejado en
//     Sefaria: sentarse junto a la mezuzá "שֶׁהוּא סוֹד הַשְּׁכִינָה פֶּתַח
//     הָעֶלְיוֹן", descalzo, la cabeza cubierta como un doliente, ceniza sobre
//     la frente "בִּמְקוֹם הַנָּחַת תְּפִילִּין", con kavaná "עַל שְׂרֵיפַת
//     הַתּוֹרָה שֶׁנַּעֲשֵׂית אֵפֶר"; decir primero "עַל נַהֲרוֹת בָּבֶל", luego
//     Tehilim 79, luego Eijá hasta el final, "וְתִכְפּוֹל בַּסּוֹף פָּסוּק
//     הֲשִׁיבֵנוּ"; y sobre Eijá 5:16 "נָפְלָה — נָפַל ה'".
//     HONESTIDAD: Sefaria NO aloja ningún tratado luriano dedicado a Tishá BeAv
//     (ni Shaar HaKavanot ni Pri Etz Jaim tienen "puerta" de Tishá BeAv). Lo que
//     se cita es el Arí sobre el duelo por el Templo en el Tikún Jatzot, que es
//     exactamente la materia del día. Se dice así en el texto.
//   · Baal HaSulam — Kuntres Matán Torá, segundo discurso ("HaArvut"), §17-§20.
//     Cotejado: "כָּל יִשְׂרָאֵל עֲרֵבִים זֶה בָּזֶה", las 613 girando sobre el
//     eje de "וְאָהַבְתָּ לְרֵעֲךָ כָּמוֹךָ", y que ese eje "אֵינוֹ בְּגֶדֶר
//     שֶׁל קִיּוּם, זוּלַת בְּאֻמָּה שְׁלֵמָה שֶׁכָּל חֲבֵרֶיהָ מוּכָנִים
//     לַדָּבָר". (Distinto de lo usado en el estudio de Yom Kipur, que fue la
//     Hakdamá leSefer HaZohar §7-§9: aquí no se repite.)
//   · Sefat Emet, Devarim 8:5 — cita al Baal Shem Tov: "וְסַרְתֶּם בָּא אַחַר
//     כָּךְ וַעֲבַדְתֶּם אֱלֹהִים אֲחֵרִים". Cotejado.
//
//  ARITMÉTICA DEL CALENDARIO (verificada con el conversor de hebcal)
//    9 de Av 5787  = jueves 12 de agosto de 2027 (el ayuno empieza al anochecer
//                    del miércoles 11).
//    17 de Tamuz 5787 = 22 de julio de 2027 → del 17 de Tamuz al 9 de Av hay
//                    exactamente 21 días (Tamuz siempre tiene 29 en el
//                    calendario fijo): las Tres Semanas.
//    30 de Av 5787 = 2 de septiembre de 2027, y su evento es "Rosh Jodesh Elul"
//                    (Av siempre tiene 30 días) → del 9 de Av al primer día de
//                    Rosh Jodesh Elul hay TAMBIÉN exactamente 21 días.
//    15 de Av 5787 = 18 de agosto de 2027, seis días después del 9.
//    Shabat Jazón = 7 ago 2027 (parashat Devarim). Shabat Najamú = 14 ago 2027
//                    (parashat Vaetjanán). Confirmado en el calendario de hebcal.
//
//  GEMATRÍAS CALCULADAS LETRA POR LETRA (script propio, no de memoria)
//    מְנַחֵם = מ40+נ50+ח8+ם40 = 138 · צֶמַח = צ90+מ40+ח8 = 138  → la igualdad
//      la enuncia la fuente (Yerushalmi Berajot 2:4 / Eijá Rabá 1:51).
//    חִנָּם = ח8+נ50+ם40 = 98 · נַחֵם = נ50+ח8+ם40 = 98 → son ANAGRAMA. La
//      igualdad numérica no prueba nada (es automática en un anagrama); lo que
//      vale son las letras. Se presenta como lectura de Jashmal, en el jidush.
//    אֵיכָה = א1+י10+כ20+ה5 = 36 → descompuesta así por Ben Azai en Eijá Rabá 1:1.
//
//  LO QUE SE DESCARTÓ, Y POR QUÉ
//   · תִּשְׁעָה בְּאָב = 780 — no cierra con nada. DESCARTADA.
//   · שִׂנְאַת חִנָּם = 849 — no cierra con nada. DESCARTADA.
//   · נַחֲמוּ נַחֲמוּ = 208 — coincide con יִצְחָק, pero no viene al caso y sería
//     forzarlo sobre una catástrofe. DESCARTADA.
//   · חֻרְבָּן = 260 / חוּרְבָּן = 266 — ortografía ambigua y sin cierre.
//     DESCARTADAS.
//   · קִינָה = 165, בְּכִיָּה = 37, צִיּוֹן = 156 — nada. DESCARTADAS.
//   · No se usa מָשִׁיחַ = 358 = נָחָשׁ: ya está tratado en la serie del Mashíaj
//     y no aporta nada propio de este día.
//   · No se repite aquí la Shevirat HaKelim ni el Birur HaNitzotzot: ya viven en
//     {{study:finalidad-creacion}} y {{study:olam-haba}}. Se enlaza, no se copia.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "tisha-beav",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 11 — Tishá BeAv · el día en que nace lo que se derrumba",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۱۱ — تیشعا بِآو · روزی که در آن، آنچه فرو می‌ریزد زاده می‌شود",
    he: "אֵיכָה יָשְׁבָה בָדָד",
    titulo: "Tishá BeAv — la ruina y la semilla",
    tituloFa: "تیشعا بِآو — ویرانی و بذر",
    ganchoEs:
      "Es el día más triste del calendario, y no hay manera honesta de suavizarlo: cinco catástrofes, dos Templos, un pueblo condenado a no entrar a la tierra. Y sin embargo la tradición colocó en esa misma fecha —no en el día siguiente, no al final del duelo— el nacimiento del Consolador. No es un consuelo puesto encima del dolor: está enterrado dentro de él.",
    ganchoFa:
      "غمگین‌ترین روزِ گاه‌شمار است و راهی صادقانه برای سبک کردنش نیست: پنج فاجعه، دو معبد، و قومی که محکوم شد به سرزمین وارد نشود. با این‌همه سنت، زادنِ تسلی‌بخش را در همان تاریخ نهاد — نه فردای آن، نه در پایانِ سوگ. تسلی روی درد گذاشته نشده؛ درونِ آن دفن شده است.",
    par: {
      a: { he: "מְנַחֵם", rom: "Menajem (el Consolador)" },
      b: { he: "צֶמַח", rom: "Tzémaj (el Retoño)" },
      valor: "138",
    },
    fecha: "Tishá BeAv 5787 · 12 ago 2027",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — cuatro cosas que este estudio NO afirma",
    rotulo:
      "Se dicen de entrada. En un día de duelo por catástrofes reales, la línea entre lo que dice una fuente y lo que uno quisiera que dijera tiene que quedar dibujada antes de empezar.",
    parrafos: [
      `Primero, sobre el nacimiento del Mashíaj el 9 de Av. La fuente existe y se verificó entera: el Talmud Yerushalmí (Berajot 2:4) y su paralelo en Eijá Rabá (1:51) cuentan la historia del labrador, el árabe y la vaca que muge dos veces. Pero hay que decir con exactitud qué dice y qué no dice. El texto NO escribe la frase "el nueve de Av". Lo que escribe es que la madre del niño dice: "דִּבְיוֹמָא דְאִיתְיַלִּיד אִיחְרוּב בֵּית מוּקְדְּשָׁא" — "porque el día en que nació fue destruido el Templo". La identificación de ese día con el 9 de Av se sigue de la Mishná (Taanit 4:6), que fija ahí la destrucción; es una inferencia sólida y antigua, pero es una inferencia. Y el género importa: esto es agadá, relato de los Sabios, no halajá. No se decreta nada con ella.`,
      `Segundo, sobre el consuelo. Este estudio no dice que Tishá BeAv sea "en realidad" un día alegre. La halajá dice exactamente lo contrario mientras el mundo esté como está: la Guemará discute cuándo los cuatro ayunos de Zejaryá se vuelven fiesta, concluye que eso depende del estado del mundo —"cuando hay paz, serán para gozo y alegría; si no hay paz, ayuno"— y luego aparta expresamente a este día: "שָׁאנֵי תִּשְׁעָה בְּאָב, הוֹאִיל וְהוּכְפְּלוּ בּוֹ צָרוֹת", "el nueve de Av es distinto, porque en él se duplicaron las desgracias" (Rosh Hashaná 18b). Hoy se ayuna. Lo que este estudio muestra es que la promesa está escrita en el mismo versículo que nombra el ayuno, no que el ayuno ya se haya cancelado.`,
      `Tercero, sobre la culpa. Las fuentes clásicas explican las destrucciones por pecados —idolatría, incesto y derramamiento de sangre el primer Templo; odio gratuito el segundo (Yomá 9b)—. Ese lenguaje es de ellos y se cita como es. Pero conviene leerlo como lo lee el Rambam, que da la razón de todos los ayunos: "לְעוֹרֵר הַלְּבָבוֹת לִפְתֹּחַ דַּרְכֵי הַתְּשׁוּבָה" — "despertar los corazones para abrir los caminos del retorno" (Hiljot Taaniot 5:1). Es un instrumento de examen propio, no una vara para medir a las víctimas de una catástrofe.`,
      `Y cuarto: este estudio se queda dentro del texto y de la tradición. No entra en historia moderna ni en política contemporánea. Las ruinas de las que habla son las de Yerushaláyim en el año 586 antes de la era común y en el año 70 de la era común, y el material con el que se piensan son la Mishná, el Talmud, Eijá y sus comentaristas.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — seis textos y una sola fecha",
    intro: [
      `Antes de recorrerlo, el esqueleto. Los tres primeros textos construyen el duelo y explican de qué está hecho. Los tres últimos muestran que la salida no está después del duelo: está dentro de él, en el mismo día y a veces en las mismas letras.`,
    ],
    filas: [
      {
        ref: "Mishná Taanit 4:6",
        he: "בְּתִשְׁעָה בְאָב נִגְזַר עַל אֲבוֹתֵינוּ שֶׁלֹּא יִכָּנְסוּ לָאָרֶץ",
        es: "En el nueve de Av se decretó sobre nuestros padres que no entrarían a la tierra",
        funcion: "El expediente del día: cinco desgracias, y la primera es de los espías.",
      },
      {
        ref: "Bamidbar 14:1 · Taanit 29a",
        he: "אַתֶּם בְּכִיתֶם בְּכִיָּה שֶׁל חִנָּם",
        es: "Ustedes lloraron un llanto sin causa",
        funcion: "La noche cero: un llanto gratuito fija un llanto para las generaciones.",
      },
      {
        ref: "Yomá 9b · Guitín 55b-56a",
        he: "מִפְּנֵי שֶׁהָיְתָה בּוֹ שִׂנְאַת חִנָּם",
        es: "Porque había en él odio gratuito",
        funcion: "La causa del segundo Templo, con nombre y apellido: Kamtzá y Bar Kamtzá.",
      },
      {
        ref: "Eijá 1:1 (Rashi)",
        he: "הָיְתָה כְּאַלְמָנָה",
        es: "Quedó COMO una viuda",
        funcion: "La kaf de la comparación: no es viuda. El marido volverá.",
      },
      {
        ref: "Zejaryá 8:19 · Rosh Hashaná 18b",
        he: "יִהְיֶה לְבֵית יְהוּדָה לְשָׂשׂוֹן וּלְשִׂמְחָה",
        es: "Será para la casa de Yehudá gozo y alegría",
        funcion: "No se cancela el ayuno: el ayuno MISMO se convierte en fiesta.",
      },
      {
        ref: "Yerushalmí, Berajot 2:4",
        he: "בְּיוֹמָא דְאִיתְיַלִּיד אִיחְרוּב בֵּית מוּקְדְּשָׁא",
        es: "El día en que él nació fue destruido el Templo",
        funcion: "La simultaneidad: el Consolador nace el día del derrumbe, no después.",
      },
    ],
    cierre: [
      `Un llanto sin causa, un odio sin causa, una viuda que no es viuda, un ayuno que es una fiesta y un niño que nace el día que se cae la casa. Ese es el 9 de Av.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "El texto-ancla del día — Mishná Taanit 4:6",
        he: "חֲמִשָּׁה דְבָרִים אֵרְעוּ אֶת אֲבוֹתֵינוּ בְּשִׁבְעָה עָשָׂר בְּתַמּוּז וַחֲמִשָּׁה בְּתִשְׁעָה בְאָב… בְּתִשְׁעָה בְאָב נִגְזַר עַל אֲבוֹתֵינוּ שֶׁלֹּא יִכָּנְסוּ לָאָרֶץ, וְחָרַב הַבַּיִת בָּרִאשׁוֹנָה וּבַשְּׁנִיָּה, וְנִלְכְּדָה בֵיתָר, וְנֶחְרְשָׁה הָעִיר. מִשֶּׁנִּכְנַס אָב, מְמַעֲטִין בְּשִׂמְחָה׃",
        es: "Cinco cosas les ocurrieron a nuestros padres el diecisiete de Tamuz y cinco el nueve de Av… En el nueve de Av se decretó sobre nuestros padres que no entrarían a la tierra; y fue destruida la Casa la primera vez y la segunda; y fue tomada Beitar; y fue arada la ciudad. Desde que entra Av, se disminuye la alegría.",
        source: "Mishná Taanit 4:6",
      },
      {
        label: "La noche cero — Bamidbar (Números) 14:1 y su lectura talmúdica",
        he: "וַתִּשָּׂא֙ כׇּל־הָ֣עֵדָ֔ה וַֽיִּתְּנ֖וּ אֶת־קוֹלָ֑ם וַיִּבְכּ֥וּ הָעָ֖ם בַּלַּ֥יְלָה הַהֽוּא׃ … אָמַר רַבָּה אָמַר רַבִּי יוֹחָנָן: אוֹתוֹ לַיְלָה לֵיל תִּשְׁעָה בְּאָב הָיָה. אָמַר לָהֶם הַקָּדוֹשׁ בָּרוּךְ הוּא: אַתֶּם בְּכִיתֶם בְּכִיָּה שֶׁל חִנָּם — וַאֲנִי קוֹבֵעַ לָכֶם בְּכִיָּה לְדוֹרוֹת.",
        es: "Y alzó toda la congregación y dieron su voz, y lloró el pueblo aquella noche… Dijo Rabá en nombre de Rabí Yojanán: aquella noche era la noche del nueve de Av. Les dijo el Santo, bendito sea: ustedes lloraron un llanto sin causa, y Yo les fijaré un llanto para las generaciones.",
        source: "Bamidbar 14:1 · Talmud, Taanit 29a (paralelo en Sotá 35a)",
      },
      {
        label: "La primera página del libro — Eijá (Lamentaciones) 1:1-2",
        he: "אֵיכָ֣ה ׀ יָשְׁבָ֣ה בָדָ֗ד הָעִיר֙ רַבָּ֣תִי עָ֔ם הָיְתָ֖ה כְּאַלְמָנָ֑ה … בָּכ֨וֹ תִבְכֶּ֜ה בַּלַּ֗יְלָה וְדִמְעָתָהּ֙ עַ֣ל לֶֽחֱיָ֔הּ אֵֽין־לָ֥הּ מְנַחֵ֖ם מִכׇּל־אֹהֲבֶ֑יהָ׃",
        es: "¡Ay, cómo quedó solitaria la ciudad grande en pueblo! Quedó COMO una viuda… Llorar, llora en la noche, y su lágrima sobre su mejilla; no tiene consolador de entre todos los que la amaban.",
        source: "Eijá 1:1 · 1:2",
      },
      {
        label: "La esperanza, escondida en el libro más oscuro — Eijá 3:22-23 y 5:21",
        he: "חַֽסְדֵ֤י יְהֹוָה֙ כִּ֣י לֹא־תָ֔מְנוּ כִּ֥י לֹא־כָל֖וּ רַחֲמָֽיו׃ חֲדָשִׁים֙ לַבְּקָרִ֔ים רַבָּ֖ה אֱמוּנָתֶֽךָ׃ … הֲשִׁיבֵ֨נוּ יְהֹוָ֤ה ׀ אֵלֶ֙יךָ֙ וְֽנָשׁ֔וּבָה חַדֵּ֥שׁ יָמֵ֖ינוּ כְּקֶֽדֶם׃",
        es: "Las bondades de YHVH no se han acabado, no se agotaron Sus misericordias: NUEVAS son cada mañana; grande es Tu fidelidad… Haznos volver, YHVH, a Ti, y volveremos; renueva nuestros días como antaño.",
        source: "Eijá 3:22-23 · 5:21",
      },
      {
        label: "La promesa, y el consuelo del sábado siguiente — Zejaryá 8:19 · Yeshayahu 40:1",
        he: "כֹּֽה־אָמַ֞ר יְהֹוָ֣ה צְבָא֗וֹת צ֣וֹם הָרְבִיעִ֡י וְצ֣וֹם הַחֲמִישִׁי֩ וְצ֨וֹם הַשְּׁבִיעִ֜י וְצ֣וֹם הָעֲשִׂירִ֗י יִהְיֶ֤ה לְבֵית־יְהוּדָה֙ לְשָׂשׂ֣וֹן וּלְשִׂמְחָ֔ה וּֽלְמֹעֲדִ֖ים טוֹבִ֑ים וְהָאֱמֶ֥ת וְהַשָּׁל֖וֹם אֱהָֽבוּ׃ … נַחֲמ֥וּ נַחֲמ֖וּ עַמִּ֑י יֹאמַ֖ר אֱלֹהֵיכֶֽם׃",
        es: "Así dijo YHVH de los Ejércitos: el ayuno del cuarto mes, el ayuno del quinto, el ayuno del séptimo y el ayuno del décimo SERÁN para la casa de Yehudá gozo y alegría y festivales buenos; y amen la verdad y la paz… Consuelen, consuelen a Mi pueblo, dice el Dios de ustedes.",
        source: "Zejaryá 8:19 · Yeshayahu 40:1",
      },
    ],
    parrafos: [
      `Empieza por el expediente, porque el día no es un ánimo: es una lista. La Mishná (Taanit 4:6) cuenta cinco desgracias el 17 de Tamuz —se rompieron las tablas, cesó la ofrenda diaria, se abrió una brecha en la muralla de Yerushaláyim, Apostomos quemó un rollo de Torá, se levantó un ídolo en el Santuario— y cinco el 9 de Av: se decretó sobre los padres que no entrarían a la tierra, fue destruida la Casa la primera vez y la segunda, fue tomada Beitar y fue arada la ciudad. Entre esas dos fechas hay veintiún días exactos, y esos días se llaman las Tres Semanas. La misma mishná cierra con la halajá que gobierna todo el mes: "מִשֶּׁנִּכְנַס אָב, מְמַעֲטִין בְּשִׂמְחָה" — "desde que entra Av, se disminuye la alegría".`,
      `Fíjate en cuál es la PRIMERA de las cinco del 9 de Av, porque es la que explica por qué la fecha significa algo y no es solo un accidente del calendario. No es la destrucción del Templo: es "se decretó sobre nuestros padres que no entrarían a la tierra". Eso remite a la historia de los espías. Doce hombres van a explorar Canaán, diez vuelven y sacan "דִּבַּת הָאָרֶץ", una calumnia sobre la tierra: "es una tierra que devora a sus habitantes" (Bamidbar 13:32). Y entonces viene el versículo que se convirtió en la piedra fundacional del día: "וַתִּשָּׂא כָּל הָעֵדָה וַיִּתְּנוּ אֶת קוֹלָם וַיִּבְכּוּ הָעָם בַּלַּיְלָה הַהוּא" — "y alzó toda la congregación y dieron su voz, y lloró el pueblo AQUELLA NOCHE".`,
      `¿Qué noche? El Talmud responde con una frase que no se olvida. "Dijo Rabá en nombre de Rabí Yojanán: aquella noche era la noche del nueve de Av. Les dijo el Santo, bendito sea: אַתֶּם בְּכִיתֶם בְּכִיָּה שֶׁל חִנָּם, וַאֲנִי קוֹבֵעַ לָכֶם בְּכִיָּה לְדוֹרוֹת — ustedes lloraron un llanto sin causa, y Yo les fijaré un llanto para las generaciones" (Taanit 29a). Nota de exactitud: el paralelo en Sotá 35a trae la misma enseñanza con dos variantes reales —dice "aquel día era VÍSPERA del nueve de Av" y "ELLOS lloraron" en vez de "ustedes lloraron"—. No es una contradicción: es cómo se transmiten las tradiciones orales, y conviene saberlo. La palabra que importa es la misma en las dos versiones: חִנָּם, jinam, "gratis, sin causa". Un llanto que no tenía por qué. Y la sentencia no inventa un castigo nuevo: toma exactamente lo que ellos hicieron y lo devuelve convertido en calendario.`,
      `Ahora salta seis siglos y medio, al segundo Templo, porque la palabra vuelve. El Talmud pregunta con toda la crudeza: "אֲבָל מִקְדָּשׁ שֵׁנִי, שֶׁהָיוּ עוֹסְקִין בְּתוֹרָה וּבְמִצְוֹת וּגְמִילוּת חֲסָדִים, מִפְּנֵי מָה חָרַב?" — "pero el segundo Templo, en el que SE OCUPABAN de Torá, de mitzvot y de actos de bondad, ¿por qué fue destruido?". Y responde: "מִפְּנֵי שֶׁהָיְתָה בּוֹ שִׂנְאַת חִנָּם" — "porque había en él odio gratuito. Para enseñarte que el odio gratuito pesa tanto como las tres transgresiones: idolatría, incesto y derramamiento de sangre" (Yomá 9b). Léelo despacio, porque es lo más incómodo que dice la tradición sobre sí misma: una generación que estudiaba, cumplía y hacía caridad perdió la casa por cómo se trataban entre ellos. En ese mismo folio hay una imagen que lo dibuja: gente "שֶׁאוֹכְלִין וְשׁוֹתִין זֶה עִם זֶה וְדוֹקְרִין זֶה אֶת זֶה בַּחֲרָבוֹת שֶׁבִּלְשׁוֹנָם" — "que comen y beben juntos, y se apuñalan unos a otros con las espadas de sus lenguas".`,
      `Y el mismo Talmud pone nombre y apellido a esa abstracción, con una historia que se lee todos los años y que no envejece (Guitín 55b-56a). Un hombre da un banquete; le manda a su sirviente a llamar a su amigo Kamtzá; el sirviente trae por error a Bar Kamtzá, que era su enemigo. El anfitrión lo ve sentado y le dice: "levántate y sal". Bar Kamtzá ofrece pagar lo que coma; el otro dice no. Ofrece pagar la mitad del banquete; no. Ofrece pagar el banquete entero; no. "נַקְטֵיהּ בִּידֵיהּ וְאוֹקְמֵיהּ וְאַפְּקֵיהּ" — lo tomó de la mano, lo levantó y lo sacó. Y entonces viene la frase que convierte una grosería en una catástrofe: "הוֹאִיל וַהֲווֹ יָתְבִי רַבָּנַן וְלָא מַחוֹ בֵּיהּ, שְׁמַע מִינַּהּ קָא נִיחָא לְהוּ" — "puesto que había allí sabios sentados y no protestaron, deduzco que les parecía bien". El Templo no cayó por lo que hizo el anfitrión. Cayó, según el relato, por lo que no hicieron los que estaban mirando.`,
      `Y aun así el libro que se lee esa noche no termina en la ruina, y ahí está toda la tensión del día. sus cuatro primeros capítulos son acrósticos alfabéticos —cada verso empieza con la letra siguiente del alfabeto, y el tercero repite cada letra tres veces—, como si el dolor necesitara una estructura para no desbordarse; el quinto ya no lo es, aunque conserva los veintidós versos, como si al final se hubiera roto también la forma. Su primera palabra es אֵיכָה, "¡ay, cómo!". Su primera imagen es una ciudad que quedó "כְּאַלְמָנָה", "COMO una viuda". Y justo en el centro del capítulo más negro, el que empieza "yo soy el hombre que vio aflicción", aparece sin aviso: "חֲדָשִׁים לַבְּקָרִים, רַבָּה אֱמוּנָתֶךָ" — "nuevas cada mañana; grande es Tu fidelidad" (3:23). Y el libro se cierra, en la lectura de la sinagoga, repitiendo en voz alta el penúltimo versículo, porque el último es demasiado duro para dejarlo al final: "הֲשִׁיבֵנוּ ה' אֵלֶיךָ וְנָשׁוּבָה, חַדֵּשׁ יָמֵינוּ כְּקֶדֶם" — "haznos volver a Ti, y volveremos; renueva nuestros días como antaño". La costumbre de doblar ese verso al final está registrada, palabra por palabra, en las instrucciones del Arizal para el duelo por el Templo: "וְתִכְפּוֹל בַּסּוֹף פָּסוּק הֲשִׁיבֵנוּ".`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י) — la letra más importante del libro.",
        texto: `Empieza por lo más pequeño, porque en este caso lo más pequeño es lo decisivo. El primer versículo dice que Yerushaláyim "הָיְתָה כְּאַלְמָנָה". Casi todo el mundo lo traduce "quedó viuda". Rashi se detiene en la kaf —la letra que en hebreo significa "como", la partícula de la comparación— y escribe: "וְלֹא אַלְמָנָה מַמָּשׁ, אֶלָּא כְּאִשָּׁה שֶׁהָלַךְ בַּעְלָהּ לִמְדִינַת הַיָּם וְדַעְתּוֹ לַחֲזוֹר אֶצְלָהּ" — "y NO una viuda de verdad, sino como una mujer cuyo marido se fue a un país de ultramar y su intención es volver a ella". El versículo más desolado del libro más desolado del Tanaj está construido, gramaticalmente, sobre una comparación que no se cierra. No dice viuda. Dice "como viuda". Y la diferencia entera está en una letra que casi nadie pronuncia. Rashi comenta también el versículo siguiente y ata el libro a la noche de los espías: "בָּכוֹ תִבְכֶּה — שְׁתֵּי בְכִיּוֹת עַל שְׁתֵּי חֻרְבָּנִין", dos llantos por las dos destrucciones; y sobre "en la noche": "לַיְלָה שֶׁל בְּכִיַּת מְרַגְּלִים בְּתִשְׁעָה בְאָב גָּרְמָה לָהֶם" — "la noche del llanto de los espías, en el nueve de Av, se lo causó". Y sobre "nuevas cada mañana" (3:23) explica: "grande es Tu promesa, y es cosa grande creer en Ti, que cumplirás y guardarás lo que nos prometiste". — Honestidad: sobre Bamidbar 14:1, el versículo del llanto, Rashi comenta únicamente dos palabras ("toda la congregación: los sanhedrines"). Ahí calla, y no se le pone nada más en la boca.`,
      },
      {
        etiqueta: "Ibn Ezra (אַבְּן עֶזְרָא) — el que se niega a llorar antes de entender.",
        texto: `Y aquí conviene mostrar un temperamento, no una doctrina. Ante los mismos versículos, Ibn Ezra hace algo que puede parecer frío y no lo es: gramática. Sobre "בָדָד" anota que es una forma que sirve para masculino y femenino; sobre "רַבָּתִי" y "שָׂרָתִי" explica que el acento va en la penúltima sílaba, para distinguir esa yud añadida de la yud que indica primera persona; discute por qué la lámed de "לָמַס" lleva pataj y por qué la mem no va con daguesh. Sobre Bamidbar 14:1 hace exactamente lo mismo: aclara que "אֶת קוֹלָם" es el objeto de los dos verbos, "alzó" y "dieron". Ni una lágrima. Y esa es su enseñanza, que en un día como este vale doble: antes de que un texto te conmueva, tiene que decirte lo que dice. El duelo que no pasa por la lectura exacta es sentimiento sobre un texto, no lectura de un texto. Ibn Ezra sostiene la frontera.`,
      },
      {
        etiqueta: "Ramban (רַמְבַּ\"ן) — el maestro que admite lo que no sabe.",
        texto: `El Ramban comenta el versículo del llanto y hace tres movimientos que son un curso entero de honestidad intelectual. Primero explica el pshat: "porque al atardecer llegaron los espías a sus tiendas… y por la mañana madrugaron y se quejaron todos contra Moshé y Aharón"; el llanto fue de noche, en las tiendas, y a la mañana ya era una revuelta. Segundo, cita la tradición: "וְאָמְרוּ רַבּוֹתֵינוּ (תענית כט): הֵם בָּכוּ בְּכִיָּה שֶׁל חִנָּם וַאֲנִי אֶקְבַּע לָהֶם בְּכִיָּה לְדוֹרוֹת". Y tercero —esto es lo grande— escribe: "וְלֹא יָדַעְתִּי מֵאֵיזֶה רֶמֶז שֶׁבַּפָּרָשָׁה הוֹצִיאוּ זֶה" — "y NO SÉ de qué alusión de la parashá dedujeron esto". Uno de los mayores comentaristas de la historia admite en el medio de la página que no ve de dónde sale la enseñanza más famosa del día. Y en vez de abandonarla, busca: "אֲבָל מִקְרָא מָלֵא הוּא" — "pero hay un versículo explícito", y trae Tehilim 106:24-27, donde el rechazo de la tierra deseada y las quejas en las tiendas desembocan en "dispersar su simiente entre las naciones y esparcirlos por las tierras". El exilio ya estaba escrito en el Salmo. Ramban no necesitó fingir que sabía; necesitó buscar mejor.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם) — dónde estuvo el pecado, exactamente.",
        texto: `Malbim hace la pregunta que nadie hace: ¿cuál fue el pecado, en concreto? Y su respuesta cambia el día entero. No fue el informe sobre "una tierra que devora a sus habitantes" —dice— porque esa afirmación ni siquiera era una prueba de nada, y el pueblo, en el fondo, no le prestó atención. "רַק עִקַּר מַה שֶּׁשָּׂמוּ לֵב הָיָה מִפַּחְדָּם לְהִלָּחֵם עִם אַנְשֵׁי הָאָרֶץ הַגִּבּוֹרִים, וְלֹא הֶאֱמִינוּ כִּי בְּיַד ה' לְהִלָּחֵם" — "lo único a lo que de verdad prestaron atención fue a su miedo de pelear con los hombres fuertes de la tierra, y no creyeron que estuviera en la mano de Dios pelear por ellos". Y entonces Malbim señala adónde lleva ese miedo, citando el relato paralelo de Devarim: de no creer pasaron a decir "בְּשִׂנְאַת ה' אוֹתָנוּ הוֹצִיאָנוּ מֵאֶרֶץ מִצְרַיִם" — "POR ODIARNOS Dios nos sacó de Egipto para entregarnos en manos del emorí". Ahí está el mecanismo completo, y es el mismo del segundo Templo: el miedo, cuando no se sostiene, se convierte en la sospecha de que el otro te odia. La primera sinat jinam de la historia judía no fue de hombre a hombre: fue una atribución de odio a Quien no odiaba. Un odio gratuito, en el sentido literal de que no existía. — Honestidad: Sefaria no aloja comentario de Malbim a Eijá; no se le cita ahí ni una palabra.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבַּנְאֵל) — el informe que no debía hacerse público.",
        texto: `Abarbanel, fiel a su método, abre el episodio con una batería de preguntas antes de responder ninguna: ¿para qué mandar espías si la nube los guiaba?; ¿por qué doce hombres notables, si Yehoshúa después mandó solo dos, y en secreto?; y descarta sin miramientos las respuestas que no le convencen — "וְאֵינִי רוֹאֶה מַה תּוֹעֶלֶת בָּזוֹ", "no veo qué provecho tiene esto". Pero su observación decisiva llega al final, y es de una precisión quirúrgica: "לְבַדּוֹ שְׁלָחָם וְהִזְהִירָם שֶׁאֵלָיו יָשִׁיבוּ הַדְּבָרִים וְלֹא לְכָל הָעֵדָה, אַךְ הֵם לֹא עָשׂוּ כֵן" — "él solo los envió, y les advirtió que A ÉL le devolvieran las palabras, y NO a toda la congregación; pero ellos no lo hicieron así". El desastre no empezó cuando vieron gigantes. Empezó cuando llevaron a la plaza pública un informe que estaba destinado a un despacho. Guárdalo, porque en Guitín 56a va a pasar exactamente lo mismo con un hombre humillado en una fiesta privada que decide llevar el asunto al César. — Honestidad: Sefaria no aloja Abarbanel a Eijá; su tratamiento del día mismo no está disponible ahí.`,
      },
      {
        etiqueta: "El Talmud (גִּיטִּין נ\"ה ב–נ\"ו א) — la humildad que quemó el Santuario.",
        texto: `Sigue la historia de Bar Kamtzá hasta el final, porque el filo está en el segundo acto y casi nadie llega. Humillado y expulsado, Bar Kamtzá va al César y le dice que los judíos se rebelaron. El César, para probarlo, manda un animal para que lo ofrezcan en el Templo; Bar Kamtzá, en el camino, le hace un defecto pequeñísimo —en el labio, o en el ojo— "דּוּכְתָּא דִּלְדִידַן הָוֵה מוּמָא וּלְדִידְהוּ לָאו מוּמָא הוּא": un lugar que para nosotros es defecto y para ellos no lo es. Los sabios piensan ofrecerlo igual, "מִשּׁוּם שְׁלוֹם מַלְכוּת", por la paz con el imperio. Y entonces habla Rabí Zejaryá ben Avkulás: "יֹאמְרוּ בַּעֲלֵי מוּמִין קְרֵיבִין לְגַבֵּי מִזְבֵּחַ!" — "¡dirán que se ofrecen animales con defecto sobre el altar!". Piensan entonces matar a Bar Kamtzá para que no vaya a denunciarlos, y Rabí Zejaryá vuelve a objetar: "¡dirán que el que pone un defecto en las ofrendas es ejecutado!". Y el veredicto de Rabí Yojanán es una de las frases más severas del Talmud: "עִנְוְותָנוּתוֹ שֶׁל רַבִּי זְכַרְיָה בֶּן אַבְקוּלַס הֶחְרִיבָה אֶת בֵּיתֵנוּ, וְשָׂרְפָה אֶת הֵיכָלֵנוּ, וְהִגְלְתָנוּ מֵאַרְצֵנוּ" — "la humildad de Rabí Zejaryá ben Avkulás destruyó nuestra casa, quemó nuestro Santuario y nos exilió de nuestra tierra". Léelo dos veces. No dice su maldad: dice su HUMILDAD, su escrúpulo, su negativa a decidir. Un hombre correcto que en el momento en que había que romper una regla para salvar una ciudad prefirió no manchar su expediente. La lección es dura y es del Talmud, no de Jashmal: hay un punto en que la pulcritud personal se vuelve una forma de abandono.`,
      },
      {
        etiqueta: "El Rambam / Maimónides (הָרַמְבַּ\"ם) — el tratado que termina anunciando su propio fin.",
        texto: `El Rambam ordena todo esto en las Hiljot Taaniot, y hace tres cosas. Primero define para qué sirve un ayuno, y su respuesta no es expiatoria sino pedagógica: "יֵשׁ שָׁם יָמִים שֶׁכָּל יִשְׂרָאֵל מִתְעַנִּים בָּהֶם מִפְּנֵי הַצָּרוֹת שֶׁאֵרְעוּ בָּהֶן, כְּדֵי לְעוֹרֵר הַלְּבָבוֹת לִפְתֹּחַ דַּרְכֵי הַתְּשׁוּבָה" — "hay días en que todo Israel ayuna por las desgracias que en ellos ocurrieron, para despertar los corazones y abrir los caminos del retorno"; y añade la línea que impide convertir el día en arqueología: "וּמַעֲשֵׂה אֲבוֹתֵינוּ שֶׁהָיָה כְּמַעֲשֵׂינוּ עַתָּה" — "y el obrar de nuestros padres, que era como nuestro obrar ahora" (5:1). Segundo, lista las cinco desgracias del día, y se detiene en Beitar con un detalle que estremece: había allí "miles y decenas de miles de Israel, y tenían un gran rey, וְדִמּוּ כָּל יִשְׂרָאֵל וּגְדוֹלֵי הַחֲכָמִים שֶׁהוּא הַמֶּלֶךְ הַמָּשִׁיחַ — y todo Israel y los grandes de los sabios pensaron que él era el rey Mashíaj. Y cayó en manos de los romanos y fueron todos muertos" (5:3). El día también carga con una esperanza mesiánica que resultó falsa, y la halajá lo consigna sin adornos. Y tercero —esto es lo asombroso— el Rambam CIERRA todo el tratado de los ayunos con esta halajá, que es la última: "כָּל הַצּוֹמוֹת הָאֵלּוּ עֲתִידִים לִבָּטֵל לִימוֹת הַמָּשִׁיחַ, וְלֹא עוֹד אֶלָּא שֶׁהֵם עֲתִידִים לִהְיוֹת יוֹם טוֹב וִימֵי שָׂשׂוֹן וְשִׂמְחָה" — "todos estos ayunos están destinados a ser anulados en los días del Mashíaj, y no solo eso, sino que están destinados a ser día de fiesta y días de gozo y alegría", citando Zejaryá 8:19. Las leyes del ayuno terminan con el anuncio de que el ayuno terminará. Es la última línea del libro.`,
      },
      {
        etiqueta: "El Arizal (הָאֲרִ\"י) — la ceniza en el lugar de los tefilín.",
        texto: `Aquí hace falta una precisión antes de citar. Sefaria no aloja ningún tratado luriano dedicado específicamente a Tishá BeAv: ni el Shaar HaKavanot ni el Pri Etz Jaim tienen una "puerta" para este día. Lo que sí está, y es exactamente la materia del día, es el Arí sobre el Tikún Jatzot, el duelo de medianoche por el Templo, que él instituyó para TODAS las noches del año. Su instrucción, en Shaar HaKavanot, Derushei Tikún Jatzot, drush 1, es de una concreción física que corta: levantarse de la cama, ir a sentarse en el suelo junto a la puerta, cerca de la mezuzá, "שֶׁהוּא סוֹד הַשְּׁכִינָה פֶּתַח הָעֶלְיוֹן" —que es el secreto de la Shejiná, la puerta de arriba—; quitarse los zapatos y sentarse descalzo; cubrirse la cabeza como un doliente; llorar cuanto se pueda; tomar ceniza y ponerla sobre la frente "בִּמְקוֹם הַנָּחַת תְּפִילִּין", EN EL LUGAR DONDE SE PONEN LOS TEFILÍN; inclinar la cabeza y abrazar el rostro contra la tierra misma. Y la kavaná que da para esa ceniza es "עַל שְׂרֵיפַת הַתּוֹרָה שֶׁנַּעֲשֵׂית אֵפֶר": sobre la Torá quemada, que se hizo ceniza. En el mismo lugar del cuerpo donde cada mañana va la palabra escrita, esa noche va lo que quedó de ella. Y el orden de la lectura que prescribe es el orden de este estudio: primero "עַל נַהֲרוֹת בָּבֶל" —{{study:salmo-137|el salmo de los ríos de Babilonia}}—, con intención de llorar por la destrucción de la Casa; después el salmo de Asaf, por los justos asesinados; y después Eijá, hasta el final, "וְתִכְפּוֹל בַּסּוֹף פָּסוּק הֲשִׁיבֵנוּ": y doblarás al final el versículo "haznos volver". El Arí lee además, en Eijá 5:16, "נָפְלָה עֲטֶרֶת רֹאשֵׁנוּ" —cayó la corona de nuestra cabeza— partiendo la palabra: נָפְלָה = נָפַל ה', "cayó la HEI", la última letra del Nombre, que es la Shejiná. Toda la teología del exilio en una palabra abierta por la mitad. Y nótese lo que eso implica: si la caída es "cayó la hei", entonces el retorno —תְּשׁוּבָה, que la tradición lee תָּשׁוּב ה', "vuelve la hei"— es literalmente la operación inversa. La misma letra. Este día la deja caer; {{study:elul|Elul}} la levanta.`,
      },
    ],
    glosa: `Glosa para el lector: Tishá BeAv = "nueve de Av", el noveno día del quinto mes hebreo. Eijá = "¡ay, cómo!", primera palabra y nombre hebreo del libro de Lamentaciones. Jinam (חִנָּם) = "gratis, sin causa, sin motivo"; de ahí bejiyá shel jinam (llanto sin causa) y sinat jinam (odio gratuito). Jurbán = destrucción, en particular la del Templo. Beitar = la última fortaleza de la rebelión de Bar Kojba, caída en el año 135. Baraíta = enseñanza tanaítica no incluida en la Mishná. Agadá = el registro narrativo y homilético de los Sabios, distinto del halájico (legislativo). Kaf de comparación = la letra כ prefijada a una palabra, que significa "como". Shejiná = la Presencia divina, en femenino, la que la tradición describe acompañando al pueblo al exilio. Tikún Jatzot = el duelo de medianoche por el Templo. Arvut = "garantía mutua", la fianza recíproca de todo Israel. Shabat Najamú = el sábado siguiente a Tishá BeAv, llamado así por la haftará "Najamú najamú amí", "consuelen, consuelen a Mi pueblo".`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, los hechos son cinco y no requieren interpretación. Primero: el 9 de Av es una fecha con expediente, no un estado de ánimo — la Mishná (Taanit 4:6) enumera cinco desgracias, y la primera de todas es la sentencia de los espías, "no entrarán a la tierra". Segundo: la fecha se ancla en un versículo concreto, "y lloró el pueblo aquella noche" (Bamidbar 14:1), leído por Rabá en nombre de Rabí Yojanán como la noche del 9 de Av (Taanit 29a; con variante en Sotá 35a). Tercero: la causa que el Talmud asigna a la caída del segundo Templo es el odio gratuito, y lo dice de una generación que estudiaba Torá, cumplía mitzvot y hacía caridad (Yomá 9b). Cuarto: la halajá de este día no es simbólica —se ayuna, se disminuye la alegría desde que entra el mes, y el Rambam explica el propósito: despertar los corazones al retorno (Hiljot Taaniot 5:1)—. Y quinto: el estatuto del día no es fijo. La Guemará distingue tres estados del mundo: "cuando hay paz, serán para gozo y alegría; si hay persecución, ayuno; si no hay ni persecución ni paz, quien quiera ayuna y quien no quiera no ayuna" — y aparta al 9 de Av del último caso, "porque en él se duplicaron las desgracias" (Rosh Hashaná 18b).`,
          `De esos cinco hechos se sigue el pshat del día, y es más raro de lo que parece: Tishá BeAv es una fecha con dos estatutos legales posibles, y cuál rige depende del estado del mundo. El versículo de Zejaryá no dice que el ayuno será reemplazado por una fiesta. Dice que el ayuno SERÁ una fiesta. Mismo día, misma fecha, otro contenido. No es una promesa poética: es una categoría halájica.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: las letras y los números)",
        parrafos: [
          `Primera alusión, y es la del hero, con una aclaración que importa: NO es una gematría de Jashmal. Está en la fuente. Discutiendo cuál es el nombre del rey Mashíaj, Rabí Yehoshúa ben Leví dice "צֶמַח שְׁמוֹ", su nombre es Tzémaj, "Retoño" (por Zejaryá 6:12); y Rabí Yudán —hijo de Rabí Aibu, según el Yerushalmí; "en nombre de" Rabí Aibu, según Eijá Rabá— dice "מְנַחֵם שְׁמוֹ", su nombre es Menajem, "Consolador" —y lo deduce de un versículo de Eijá: "כִּי רָחַק מִמֶּנִּי מְנַחֵם" (1:16), "porque se alejó de mí el consolador"—. Y entonces un tercer sabio zanja la disputa —el Yerushalmí lo llama Jananiá hijo de Rabí Abahu; Eijá Rabá, Rabí Janiná—: "וְלֹא פְלִיגֵי, חוּשְׁבְּנֵיהּ דַּהֲדֵין כְּחוּשְׁבְּנֵיהּ דַּהֲדֵין, הוּא צֶמַח הוּא מְנַחֵם" — "y no discrepan: la cuenta de este es como la cuenta de aquel; Tzémaj es Menajem" (Talmud Yerushalmí, Berajot 2:4; paralelo en Eijá Rabá 1:51). Verificado letra por letra: מְנַחֵם = מ40+נ50+ח8+ם40 = 138, y צֶמַח = צ90+מ40+ח8 = 138. Fíjate de dónde sale el nombre: el libro de la destrucción se queja de que NO hay consolador, y los Sabios oyen en esa ausencia el nombre del que ha de venir. Del hueco sacaron el nombre.`,
          `Segunda alusión, y también es de la fuente, no de aquí. La primera palabra del libro es אֵיכָה, eijá, "¡ay, cómo!". Sus cuatro letras son álef, yud, kaf, hei. Rabí Abahu, en el midrash, hace el recorrido de Adam: "lo metí al Gan Edén, y le ordené, y transgredió mi orden, y lo juzgué con expulsión y con destierro, וְקוֹנַנְתִּי עָלָיו אֵיכָה — y lo lamenté con un eijá"; y demuestra la última parte así: "שֶׁנֶּאֱמַר וַיֹּאמֶר לוֹ אַיֶּכָּה — אֵיכָה כְּתִיב" — "como está dicho: y le dijo, ¿AYEKÁ? — pero está escrito EIJÁ" (Eijá Rabá, Petijtá 4). Las mismas cuatro consonantes, א-י-כ-ה. La primera pregunta que Dios le hace a un ser humano —"¿dónde estás?" (Bereshit 3:9)— y el primer grito del libro de la ruina son, en la escritura sin vocales, la misma palabra. Y el midrash sigue la simetría hasta el final: lo mismo hice con sus hijos, los metí a la tierra, les ordené, transgredieron, los juzgué con expulsión y destierro, "וְקוֹנַנְתִּי עֲלֵיהֶם אֵיכָה יָשְׁבָה בָדָד". El lamento por la casa perdida es la misma palabra que la pregunta por el hombre escondido.`,
          `Tercera alusión, y esta es del calendario, pura aritmética verificable. Las Tres Semanas van del 17 de Tamuz al 9 de Av: en el calendario fijo Tamuz siempre tiene 29 días, de modo que del 17 de Tamuz al 9 de Av hay 12 + 9 = 21 días exactos. Tres semanas de descenso. Ahora cuenta hacia el otro lado: Av siempre tiene 30 días, y Rosh Jodesh Elul son dos días —el 30 de Av y el 1 de Elul—. del 9 de Av al 30 de Av hay 30 − 9 = 21 días exactos otra vez. Tres semanas de subida. (Comprobado en el calendario de 5787: 17 de Tamuz = 22 de julio de 2027; 9 de Av = 12 de agosto; 30 de Av, cuyo evento es Rosh Jodesh Elul, = 2 de septiembre. Veintiún días para cada tramo.) El día más bajo del año está exactamente en el medio: tres semanas para caer y tres semanas para llegar al mes en que se vuelve a dar el primer paso. Y en el medio de esa subida está el 15 de Av, seis días después del 9, del que dice Rabán Shimón ben Gamliel: "לֹא הָיוּ יָמִים טוֹבִים לְיִשְׂרָאֵל כַּחֲמִשָּׁה עָשָׂר בְּאָב וּכְיוֹם הַכִּפּוּרִים" — "no hubo días buenos para Israel como el quince de Av y como Yom Kipur" (Mishná Taanit 4:8). ¿Y por qué el 15? Entre varias razones, la Guemará trae la de Rabá bar bar Janá en nombre de Rabí Yojanán: "יוֹם שֶׁכָּלוּ בּוֹ מֵתֵי מִדְבָּר" — el día en que terminaron de morir los del desierto (Taanit 30b). Es decir: el día más alegre del calendario es el día en que se agotó el decreto que empezó en el más triste. La sentencia de los espías se abre el 9 y se cierra el 15. Seis días.`,
          `Cuarta alusión, y es una letra que falta. El Salmo 145, el Ashrei que se dice tres veces al día, es un acróstico alfabético — y le falta un verso: no hay verso que empiece con nun. Pregunta el Talmud por qué, y responde Rabí Yojanán: "מִפְּנֵי שֶׁיֵּשׁ בָּהּ מַפַּלְתָּן שֶׁל שׂוֹנְאֵי יִשְׂרָאֵל", porque en esa letra está la caída, "דִּכְתִיב: נָפְלָה לֹא תוֹסִיף קוּם בְּתוּלַת יִשְׂרָאֵל" — "cayó, no volverá a levantarse la doncella de Israel" (Amós 5:2). David no pudo escribir esa letra. Y entonces el Talmud trae dos respuestas. La primera es de las academias de la tierra de Israel, y es un cambio de puntuación: "בְּמַעְרְבָא מְתָרְצִי לַהּ הָכִי: נָפְלָה וְלֹא תּוֹסִיף לִנְפּוֹל עוֹד, קוּם בְּתוּלַת יִשְׂרָאֵל" — "en occidente lo resuelven así: cayó y no volverá a caer más; ¡levántate, doncella de Israel!". Las mismas palabras, la misma letra, movida la pausa: de sentencia a llamada. La segunda es de Rav Najmán bar Yitzjak: "אֲפִילּוּ הָכִי, חָזַר דָּוִד וּסְמָכָן בְּרוּחַ הַקֹּדֶשׁ" — aun así, David volvió y las sostuvo con inspiración divina; y lo hizo con el verso siguiente, el de la letra sámej: "סוֹמֵךְ ה' לְכָל הַנֹּפְלִים", "sostiene YHVH a todos los que caen" (Berajot 4b). El verso de la caída no está. Pero el verso que viene inmediatamente después es el que sostiene a los caídos. Falta la {{letter:nun|nun}}, y la letra que la sigue la está agarrando.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          `Vuelve a la palabra que aparece dos veces en este día, porque el drash está entero en ella: חִנָּם, jinam. Un llanto jinam en el desierto, un odio jinam en Yerushaláyim. Traducimos "sin causa", pero la palabra dice algo más incómodo: gratis. Sin costo. Sin que haya hecho falta. El llanto de aquella noche no fue por un dolor: fue por un pronóstico. Nadie había perdido nada todavía. Y el odio del segundo Templo no fue por un agravio real: mira la historia y lo verás — el hombre no odiaba a Bar Kamtzá por algo que hubiera pasado ese día; simplemente lo odiaba, y cuando Bar Kamtzá le ofreció pagar el banquete entero con tal de que no lo humillaran en público, prefirió la humillación. Ese es el sentido exacto de jinam: cuando la relación no depende de ningún dato, cuando ninguna oferta puede cambiarla porque no está hecha de razones. Esas dos gratuidades —llorar lo que no ha pasado, odiar lo que no ha hecho nada— son la misma enfermedad de la imaginación, y la tradición las puso en la misma fecha.`,
          `Y aquí entra la voz jasídica, que enseña cómo empieza eso. El Sefat Emet, comentando este mismo material, cita al Baal Shem Tov con una fórmula que sirve de diagnóstico: "וְסַרְתֶּם בָּא אַחַר כָּךְ וַעֲבַדְתֶּם אֱלֹהִים אֲחֵרִים" — primero viene "y os desviaréis", y solo después "y serviréis a otros dioses" (Sefat Emet, Devarim 8:5). Nadie empieza por lo grande. Se empieza por una desviación mínima que ni siquiera se registra como pecado. Mira la cadena de Guitín: un sirviente confunde un nombre parecido. Kamtzá, Bar Kamtzá. Un error de recadero. De ahí sale un anfitrión que no puede soportar ver a su enemigo comiendo en su casa; de ahí una expulsión ante testigos; de ahí un hombre humillado que camina hasta Roma; de ahí un animal con un defecto minúsculo, "un lugar que para nosotros es defecto y para ellos no"; de ahí un sabio que prefiere no decidir; de ahí un incendio. Ninguno de esos pasos, por sí solo, parece capaz de quemar una ciudad. Y ese es exactamente el punto: el mal de este día no es espectacular. Es del tamaño de una invitación mal entregada.`,
          `Ahora el detalle que la mayoría de los relatos se salta, y que es la verdadera enseñanza. Bar Kamtzá no razona así: "el anfitrión me odia". Razona así: "הוֹאִיל וַהֲווֹ יָתְבִי רַבָּנַן וְלָא מַחוֹ בֵּיהּ, שְׁמַע מִינַּהּ קָא נִיחָא לְהוּ" — "puesto que había sabios sentados y no protestaron, deduzco que les parecía bien". El que denunció al pueblo entero no lo hizo por el que lo echó, sino por los que miraron. Y observa que la lógica de Bar Kamtzá es la misma que Malbim encontró en el desierto: interpretar un silencio como odio. Él no sabía lo que pensaban esos sabios; dedujo. Y sobre esa deducción construyó una catástrofe. La sinat jinam de este día tiene dos caras y las dos son gratuitas: la del que odia sin motivo y la del que se cree odiado sin prueba. Entre las dos hay una habitación llena de gente callada.`,
          `Y aún queda el escalón más difícil, que es lo que este día le pide a quien lo guarda. Dice la Guemará: "כָּל הָעוֹשֶׂה מְלָאכָה בְּתִשְׁעָה בְּאָב וְאֵינוֹ מִתְאַבֵּל עַל יְרוּשָׁלַיִם — אֵינוֹ רוֹאֶה בְּשִׂמְחָתָהּ", y de ahí sacan la formulación positiva: "כָּל הַמִּתְאַבֵּל עַל יְרוּשָׁלַיִם — זוֹכֶה וְרוֹאֶה בְּשִׂמְחָתָהּ", "todo el que hace duelo por Yerushaláyim, merece y ve su alegría" (Taanit 30b). Y el versículo del que lo sacan es de una precisión gramatical que vale detenerse: "שִׂמְחוּ אֶת יְרוּשָׁלִַם וְגִילוּ בָהּ כָּל אֹהֲבֶיהָ, שִׂישׂוּ אִתָּהּ מָשׂוֹשׂ כָּל הַמִּתְאַבְּלִים עָלֶיהָ" — "alégrense con Yerushaláyim y gócense en ella todos los que la aman; regocíjense con ella, con regocijo, TODOS LOS QUE HACEN DUELO POR ELLA" (Yeshayahu 66:10). El profeta no dice "los que hicieron duelo": el sujeto del regocijo son, en presente, los que están de duelo. No es un premio a los que sufrieron. Es la afirmación de que solo puede alegrarse por una casa quien todavía siente que le falta. El que ya se acostumbró a la ruina no tiene con qué recibir la reconstrucción. Por eso el duelo de este día no es masoquismo ni nostalgia: es la conservación de un vacío. El único recipiente capaz de contener una alegría que todavía no llegó.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de este día no es un misterio escondido: es una explicación estructural de por qué el odio gratuito pudo derribar un edificio. Rav Yehuda Ashlag (Baal HaSulam) la desarrolla en el discurso sobre la עֲרֵבוּת, la "arvut", la garantía mutua, y empieza por confesar que la frase de los Sabios le parece de las más desconcertantes que existen: "כָּל יִשְׂרָאֵל עֲרֵבִים זֶה בָּזֶה", todo Israel es garante uno del otro. "שֶׁלִּכְאוֹרָה הוּא בִּלְתִּי מוּצְדָּק בְּתַכְלִית" — a primera vista es completamente injusto, escribe: ¿cómo puede ser que si alguien a quien ni siquiera conozco peca, el Santo, bendito sea, me cobre a mí la deuda? Y su respuesta reordena todo el sistema: las 613 mitzvot, dice, giran todas alrededor del eje de una sola — "וְאָהַבְתָּ לְרֵעֲךָ כָּמוֹךָ", amarás a tu prójimo como a ti mismo. Y ese eje tiene una propiedad que lo cambia todo: "וְנִתְבָּאֵר שֶׁקֹּטֶב זֶה אֵינוֹ בְּגֶדֶר שֶׁל קִיּוּם, זוּלַת בְּאֻמָּה שְׁלֵמָה שֶׁכָּל חֲבֵרֶיהָ מוּכָנִים לַדָּבָר" — "ese eje NO es siquiera cumplible, salvo en un pueblo entero cuyos miembros estén todos dispuestos a ello".`,
          `Detente en eso, porque explica Yomá 9b sin necesidad de moralismo. La pregunta del Talmud era: si estudiaban Torá y cumplían mitzvot y hacían actos de bondad, ¿por qué se les cayó la casa? La respuesta de Baal HaSulam sería: porque el conjunto entero estaba sostenido sobre una mitzvá que ninguno de ellos podía cumplir solo. Baal HaSulam explica que la garantía funciona así: cada uno se libera de la angustia por sus propias necesidades porque sabe que "שֵׁשׁ מֵאוֹת אֶלֶף אוֹהֲבִים נֶאֱמָנִים נִמְצָאִים בִּסְבִיבָתוֹ", seiscientos mil amigos fieles están a su alrededor, listos para ocuparse de él; y solo entonces queda libre para ocuparse de los demás. Es un circuito. Y un circuito no se rompe poco a poco: se rompe. La sinat jinam no es un pecado más de la lista — es el corte del cable sobre el que están enchufados todos los demás. Por eso el Talmud dice que "pesa tanto como las tres transgresiones": no por una equivalencia moral, sino porque es la única que desconecta el sistema completo.`,
          `Y de ahí se entiende también por qué el duelo de este día tiene una estructura y no es solo tristeza. La Cabalá luriana explica la ruptura y la caída de las chispas en otro lugar —{{study:finalidad-creacion|la finalidad de la creación}} y {{study:olam-haba|el mundo por venir}} tratan esa mecánica cósmica, y este estudio no la repite—. Lo propio de Tishá BeAv es otra cosa, y es más íntima: aquí la ruptura tiene fecha, tiene dirección y tiene una letra. El Arí lee "נָפְלָה עֲטֶרֶת רֹאשֵׁנוּ" como נָפַל ה', cayó la hei; el exilio es una letra del Nombre que se descolgó y bajó. Y la palabra con que la tradición nombra el regreso es תְּשׁוּבָה, que el Zohar lee תָּשׁוּב ה', "vuelve la hei". La misma letra en las dos frases. Este día es el punto más bajo de la caída de esa hei — y por eso, exactamente por eso, es también el punto desde el cual empieza a subir. Tres semanas después está Rosh Jodesh Elul.`,
          `Queda el último secreto, y es la razón de que el hero de este estudio sea un nombre y no un número. El midrash del labrador es agadá y hay que leerla como tal, pero su arquitectura es de una precisión que no es casual. Un hombre ara. Su vaca muge. Pasa un árabe y le dice: suelta el buey, que fue destruida la Casa. La vaca muge por segunda vez y el árabe le dice: ata el buey, que nació el redentor de los judíos. Dos mugidos del mismo animal, en la misma hora, en el mismo campo: uno anuncia la ruina y el otro el nacimiento. Y cuando el hombre llega al pueblo y encuentra a la madre del niño, ella le dice que quisiera estrangularlo, "porque el día en que nació fue destruida la Casa". Y él responde con la frase que sostiene todo este día: "רְחִיצֵיא אֲנָן דִּבְרַגְלֵיהּ חֲרֵיב וּבְרַגְלֵיהּ מִתְבְּנֵיי" — "confiamos en que a sus pies fue destruida y a sus pies será reconstruida" (Talmud Yerushalmí, Berajot 2:4). El relato ni siquiera termina bien: el niño desaparece, arrebatado por vientos y torbellinos, y nadie sabe dónde está. Eso también hay que decirlo. La agadá no promete un final feliz visible; promete que la semilla está puesta, y que está puesta en el mismo suelo que se derrumbó. Y el midrash tiene la elegancia de admitir que la prueba no depende de la historia: "אָמַר רַבִּי אָבוּן: לָמָּה לִי לִלְמֹד מִן עַרְבִיֵּי, וְלֹא מִקְרָא מָלֵא הוּא?" — "¿para qué necesito aprenderlo de este árabe, si hay un versículo explícito?": "y el Líbano caerá por un poderoso" (Yeshayahu 10:34) — y el versículo siguiente, sin pausa: "y saldrá un retoño del tronco de Ishái" (11:1). El árbol cae al final de un capítulo y el brote sale en la primera línea del siguiente. En el Tanaj no hay ni un versículo de distancia entre las dos cosas.`,
        ],
      },
    ],
    caja: {
      titulo: "מְנַחֵם = 138 = צֶמַח · אֵיכָה = אַיֶּכָּה · 21 días abajo, 21 días arriba.",
      cuerpo:
        "El nombre del Consolador vale lo mismo que el del Retoño —y no lo decimos nosotros: lo dicen los Sabios, «hu Tzémaj hu Menajem» (Talmud Yerushalmí, Berajot 2:4; verificado: מ40+נ50+ח8+ם40 = צ90+מ40+ח8 = 138)—, y el nombre lo sacaron de un versículo que se queja de que NO hay consolador (Eijá 1:16). El grito del libro, אֵיכָה, se escribe con las mismas cuatro letras que la primera pregunta de Dios al hombre, אַיֶּכָּה, «¿dónde estás?» (Eijá Rabá, Petijtá 4). Y el calendario pone el 9 de Av en el centro exacto: veintiún días desde el 17 de Tamuz para llegar, veintiún días hasta Rosh Jodesh Elul para salir.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que hay dolores que uno se fabrica y dolores que le ocurren, y que este día empieza por los primeros. El llanto de aquella noche fue por algo que todavía no había pasado; el odio de Yerushaláyim fue por algo que nadie había hecho. Los dos se llaman jinam, gratuitos. Y me enseña que la gratuidad no es un detalle del vocabulario sino el diagnóstico: mis peores horas no suelen venir de lo que ocurrió, sino de lo que supuse. También me enseña algo que preferiría no saber: que la catástrofe de Bar Kamtzá no la desató el que lo echó, sino los que estaban sentados y no dijeron nada. Yo he estado sentado en esa habitación.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón de la simultaneidad. El día en que cae la Casa es el día en que nace el Consolador; el árbol cae en un versículo y el retoño sale en el siguiente; la palabra del grito y la palabra de la pregunta se escriben igual; la letra que falta en el Ashrei está sostenida por la letra que sigue. Veo el patrón de la escala: nada empezó grande — un nombre confundido, un miedo no sostenido, un escrúpulo mal puesto. Y veo el patrón del vacío: solo se alegra con la ciudad el que todavía está de duelo por ella, porque el que se acostumbró a la ruina ya no tiene dónde poner la reconstrucción. Todo lo que en mí se resignó dejó, al mismo tiempo, de poder recibir.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Me da un nombre exacto para una operación que hago sin darme cuenta: interpretar un silencio como hostilidad. Malbim lo encontró en el desierto —"por odiarnos nos sacó"— y Bar Kamtzá lo repitió en una fiesta. Ninguno de los dos tenía prueba; los dos tenían miedo. Y me da también la medida de mi duelo: no me toca cargar el duelo del mundo, me toca no anestesiarlo. Rashi me enseñó dónde está mi consuelo y es de un tamaño que me cabe: en una sola letra, la kaf de "como viuda". No estoy viudo. Alguien se fue con intención de volver. Eso no cancela el vacío. Lo redefine como espera.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Que el calendario tenga un día así dice algo sobre cómo está hecho el mundo. Hay una fecha en la que se concentran las pérdidas, y la tradición no la disolvió ni la repartió: la dejó junta, con nombre, y la puso a veintiún días de la caída y a veintiún días del mes del retorno. El mundo no está construido para que el derrumbe sea el final; está construido para que el derrumbe tenga una fecha y esa fecha tenga salida. Y hay algo más grave y más hermoso: el Talmud dice que el estatuto de este día depende del estado del mundo — "cuando hay paz, será gozo y alegría; si no hay paz, ayuno". Es decir que la fecha está esperando. No es un monumento cerrado: es una casilla que todavía puede cambiar de contenido.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, rompe UN silencio: en la próxima conversación en que alguien no esté presente para defenderse, sé tú el que dice algo.",
    texto: `Este día no cayó por el que odió. Cayó, según el Talmud, por los que estaban sentados y no protestaron: "puesto que había sabios sentados y no protestaron, deduzco que les parecía bien" (Guitín 56a). Eso convierte la acción de este estudio en algo muy pequeño y muy difícil, así que hazla en tres pasos concretos, no en un propósito general.

Uno, hoy mismo: la próxima vez que estés en una conversación —una mesa, un grupo de mensajes, una reunión— donde se esté hablando mal de alguien que no está presente, di UNA frase. No hace falta un sermón ni una escena; una frase basta y suele bastar: "yo con él tuve otra experiencia", "no lo conozco lo suficiente para pensar eso", "cambiemos de tema". La cadena entera de Guitín se rompía en cualquiera de sus eslabones, y el eslabón más fácil de romper era ese: alguien en la habitación abriendo la boca. El Talmud lo dice en la otra dirección para que no quede duda: había quienes "comen y beben juntos, y se apuñalan unos a otros con las espadas de sus lenguas" (Yomá 9b).

Dos, esta semana: aplica la regla de Abarbanel. Él observó que Moshé mandó a los espías con la orden de traerle el informe A ÉL y no a toda la congregación, "pero ellos no lo hicieron así". Elige una cosa que sabes de alguien —un tropiezo, un dato incómodo, una versión de un conflicto— y decide deliberadamente no llevarla a la plaza: si hay algo que decir, se lo dices a la persona o a quien pueda resolverlo, y a nadie más. Un solo caso. Hoy.

Y tres, la parte que da vuelta el día: identifica UNA persona a la que llevas tiempo suponiendo que te tiene inquina, sin haberlo comprobado nunca. Malbim mostró que la primera sinat jinam de la historia fue exactamente eso — atribuirle odio a Quien no odiaba. Escribe su nombre en un papel y, al lado, la evidencia real que tienes. Si no hay evidencia, esa suposición es tuya, no de ella, y te está costando una relación gratis. Haz lo mínimo que te permita comprobarlo: un mensaje, una pregunta directa, una conversación de cinco minutos. El Rambam dice que estos ayunos existen "para despertar los corazones y abrir los caminos del retorno", y que "el obrar de nuestros padres era como nuestro obrar ahora" (Hiljot Taaniot 5:1). El retorno empieza por dejar de cobrarle a alguien una deuda que nunca contrajo.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El 9 de Av es una fecha con expediente: cinco desgracias, empezando por la sentencia de los espías, "no entrarán a la tierra" (Mishná Taanit 4:6). Y la fecha nace de un llanto: "aquella noche era la noche del nueve de Av… ustedes lloraron un llanto sin causa, y Yo les fijaré un llanto para las generaciones" (Taanit 29a, sobre Bamidbar 14:1). La misma palabra —חִנָּם, gratuito— vuelve seis siglos después para explicar la caída del segundo Templo: no idolatría, no violencia, sino שִׂנְאַת חִנָּם, odio gratuito, en una generación que estudiaba Torá y hacía caridad (Yomá 9b).`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `La promesa no viene después del duelo: está dentro del mismo día. Zejaryá 8:19 no dice que los ayunos serán reemplazados, dice que los ayunos SERÁN "gozo y alegría y festivales buenos"; y el Talmud lo convierte en categoría legal —"cuando hay paz, serán para gozo y alegría; si no hay paz, ayuno" (Rosh Hashaná 18b)—. El Rambam cierra todo el tratado de los ayunos con esa halajá, que es la última que escribe ahí (Hiljot Taaniot 5:19). Y en Eijá mismo, el capítulo más negro guarda "חֲדָשִׁים לַבְּקָרִים, רַבָּה אֱמוּנָתֶךָ" (3:23), y la lectura se cierra repitiendo en voz alta "הֲשִׁיבֵנוּ ה' אֵלֶיךָ וְנָשׁוּבָה" (5:21) — costumbre registrada en el Arizal, Tikún Jatzot: "y doblarás al final el versículo Hashivenu".`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `La tradición puso el nacimiento del Consolador en el día del derrumbe, no después: "el día en que él nació fue destruido el Templo… a sus pies fue destruida y a sus pies será reconstruida" (Talmud Yerushalmí, Berajot 2:4; agadá, no halajá). De ahí el hero: מְנַחֵם = 138 = צֶמַח, igualdad enunciada por la fuente misma — y el nombre "Menajem" lo sacaron los Sabios del versículo de Eijá que se queja de que NO hay consolador (1:16). Del hueco sale el nombre. Y en el primer versículo del libro, Rashi señala la kaf: "כְּאַלְמָנָה — y no una viuda de verdad, sino como una mujer cuyo marido se fue a un país de ultramar y su intención es volver a ella".`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `El Templo no cayó por el que echó a Bar Kamtzá sino por los que miraron callados: "puesto que había sabios sentados y no protestaron, deduzco que les parecía bien" (Guitín 56a). Hoy: di UNA frase la próxima vez que se hable mal de un ausente; no lleves a la plaza un informe que era para un despacho (Abarbanel); y comprueba, con una pregunta directa, si esa persona que crees que te odia de verdad te odia. Y guarda el duelo, porque de él depende la alegría: "todo el que hace duelo por Yerushaláyim, merece y ve su alegría" (Taanit 30b, sobre Yeshayahu 66:10).`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal sobre un dato verificado, marcada como tal. Y el dato hay que entenderlo bien antes de aceptarlo.",
    parrafos: [
      `Empecemos por lo que NO prueba nada, para no vender humo. La palabra del pecado de este día es חִנָּם (jinam, "gratuito"): jinam el llanto de los espías, jinam el odio del segundo Templo. La palabra del consuelo de este día es נַחֵם (najem, "consuela"), la raíz de מְנַחֵם, el Consolador, y de נַחֲמוּ נַחֲמוּ, "consuelen, consuelen a Mi pueblo", que es la haftará del sábado siguiente. Las dos valen 98 (verificado: ח8+נ50+ם40 = 98; נ50+ח8+ם40 = 98). Pero esa igualdad numérica no significa absolutamente nada, y hay que decirlo: es automática, porque son las MISMAS TRES LETRAS. חנם y נחם son un anagrama. Sumar las mismas letras en distinto orden siempre da lo mismo. Quien presente esos 98 como un hallazgo está contando un truco.`,
      `Lo que sí es interesante —y es lo único que aquí se ofrece, como lectura y nada más— son las letras. Jet, nun, mem. Puestas en un orden nombran la enfermedad exacta del día: lo gratuito, lo que no tenía por qué, el llanto que nadie pidió y el odio que nadie ganó. Puestas en otro orden nombran su cura: consolar. Y el libro que se lee esa noche usa las dos: "אֵין לָהּ מְנַחֵם מִכָּל אֹהֲבֶיהָ" (1:2), "כִּי רָחַק מִמֶּנִּי מְנַחֵם" (1:16). No busques una fuente clásica que enuncie esto, porque no la encontré y no voy a inventar un folio: es una observación de Jashmal sobre un hecho de escritura que cualquiera puede comprobar.`,
      `Y si tiene algún valor, es este: la diferencia entre la ruina y el consuelo, en este día, no es de material sino de orden. No hay que traer letras nuevas. Con lo que ya está sobre la mesa —las mismas personas, la misma ciudad, la misma fecha, incluso el mismo ayuno que Zejaryá promete que será fiesta— alcanza; lo que hace falta es que se acomoden de otro modo. Eso es coherente con lo único que el Talmud pone en nuestras manos sobre esta fecha: no nos pide construir nada, nos pide dejar de hacer una cosa gratis. Nadie está obligado a leerlo así. Pero que la palabra del pecado y la palabra del consuelo compartan las tres letras es, por lo menos, una coincidencia bien colocada.`,
    ],
  },

  hemshej: [
    "{{study:salmo-137|«Junto a los ríos de Babilonia, allí nos sentamos y lloramos». El Arizal manda empezar por ahí el duelo por el Templo. ¿Qué guarda ese salmo?}}",
    "{{letter:nun|La nun es la letra que falta en el Ashrei, porque en ella estaba escrita la caída — y la letra que sigue sostiene a los caídos. ¿Qué es la nun?}}",
    "{{study:tercer-templo|Si la Casa cayó dos veces y la promesa dice que el ayuno será fiesta, ¿qué se está esperando exactamente? El Tercer Templo.}}",
    "{{study:elul|Tres semanas para caer, tres semanas para salir: veintiún días después del 9 de Av llega Rosh Jodesh Elul, y con él «Aní leDodí» — el mes en que uno vuelve a dar el primer paso. El año empieza otra vez.}}",
  ],

  ctaRef: "Lamentations 1:1",
};
