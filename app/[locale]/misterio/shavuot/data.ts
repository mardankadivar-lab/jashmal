import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — שָׁבוּעוֹת · וּסְפַרְתֶּם לָכֶם
//  Serie «Tiempos Sagrados» (moadim) · Estudio 10 — Shavuot y la cuenta del Ómer.
//
//  Hero en modo "dimensiones" (tres pilares). NO se usa modo "par": ninguna
//  gematría cierra un par lo bastante sólido y clásico como para encabezar el
//  estudio, y la columna vertebral de este estudio no es un número sino una
//  ausencia (la fiesta sin fecha). Las gematrías y cuentas que SÍ cierran exactas
//  van dentro del cuerpo, con la operación a la vista.
//
//  FUENTES VERIFICADAS CONTRA LA API DE SEFARIA (2026-08-27, 14 de Elul 5786).
//  Cada una se cotejó en https://www.sefaria.org/api/texts/{ref}?context=0 y el
//  hebreo puntuado que aparece abajo es el que devolvió la API, no memoria:
//
//   TANAJ — LA TESIS COMPROBADA LEYENDO
//   · Vayikrá 23:15-16 — "וּסְפַרְתֶּם לָכֶם… שֶׁבַע שַׁבָּתוֹת תְּמִימֹת… תִּסְפְּרוּ חֲמִשִּׁים
//     יוֹם". NO hay fecha de mes.
//   · Vayikrá 23:21 — "וּקְרָאתֶם בְּעֶצֶם הַיּוֹם הַזֶּה": "en ese mismo día" — sin decir
//     cuál día del mes es.
//   · Devarim 16:9-10 — "שִׁבְעָה שָׁבֻעֹת תִּסְפׇּר־לָךְ… וְעָשִׂיתָ חַג שָׁבֻעוֹת". Tampoco.
//   · Bamidbar 28:26 ("וּבְיוֹם הַבִּכּוּרִים… בְּשָׁבֻעֹתֵיכֶם"), Shemot 34:22 y
//     Shemot 23:16: los otros dos pasajes que nombran la fiesta. Tampoco dan fecha.
//   · CONTRASTE cotejado uno por uno: Pésaj SÍ tiene fecha (Vayikrá 23:5-6, "בַּחֹדֶשׁ
//     הָרִאשׁוֹן בְּאַרְבָּעָה עָשָׂר"), Yom Teruá también (23:24, "בַּחֹדֶשׁ הַשְּׁבִיעִי
//     בְּאֶחָד"), Yom Kipur también (23:27, "בֶּעָשׂוֹר"), Sucot también (23:34,
//     "בַּחֲמִשָּׁה עָשָׂר יוֹם"). Shavuot es la única sin fecha.
//   · ESTRUCTURA cotejada: Vayikrá 23:23, 23:26 y 23:33 abren cada uno con
//     "וַיְדַבֵּר יְהֹוָה אֶל־מֹשֶׁה לֵּאמֹר" (Rosh Hashaná, Yom Kipur, Sucot). Shavuot NO
//     tiene discurso propio: cuelga del de 23:9, el del Ómer. Lo señala Abarbanel.
//   · Vayikrá 23:22 — leket y peá "לֶעָנִי וְלַגֵּר", incrustada entre las fiestas.
//   · Vayikrá 25:8-10 — el gemelo: "וְסָפַרְתָּ לְךָ שֶׁבַע שַׁבְּתֹת שָׁנִים… תֵּשַׁע
//     וְאַרְבָּעִים שָׁנָה… וְקִדַּשְׁתֶּם אֵת שְׁנַת הַחֲמִשִּׁים".
//   · Shemot 19:1-2 — "בַּחֹדֶשׁ הַשְּׁלִישִׁי… בַּיּוֹם הַזֶּה" y "וַיִּחַן־שָׁם יִשְׂרָאֵל"
//     (singular). Shemot 19:3-6 — "מַמְלֶכֶת כֹּהֲנִים וְגוֹי קָדוֹשׁ".
//   · Shemot 24:7 — "כֹּל אֲשֶׁר־דִּבֶּר יְהֹוָה נַעֲשֶׂה וְנִשְׁמָע".
//   · Ester 8:9 — ÚNICA aparición de la palabra "סִיוָן" en todo el Tanaj (búsqueda
//     hecha sobre el corpus Tanakh de Sefaria; devolvió un solo resultado). Y allí
//     la fecha que se da es el 23, no el 6.
//   · Ester 9:27 — "קִיְּמוּ וְקִבְּלוּ הַיְּהוּדִים" (la base de Rava).
//   · Rut 1:16-17 · 1:22 ("בִּתְחִלַּת קְצִיר שְׂעֹרִים") · 2:23 ("עַד־כְּלוֹת קְצִיר־
//     הַשְּׂעֹרִים וּקְצִיר הַחִטִּים") · 4:17 (Oved, padre de Yishai, padre de David).
//   · Tehilim 8:6 ("וַתְּחַסְּרֵהוּ מְעַט מֵאֱלֹהִים") y 19:2 ("הַשָּׁמַיִם מְסַפְּרִים").
//   · Bereshit 28:12 — grafía "סֻלָּם" (defectiva) cotejada, para la cuenta = 130.
//
//   TALMUD Y MISHNÁ
//   · Shabat 86b — "בְּשִׁשִּׁי בַּחֹדֶשׁ נִיתְּנוּ עֲשֶׂרֶת הַדִּבְּרוֹת… רַבִּי יוֹסֵי אוֹמֵר:
//     בְּשִׁבְעָה בּוֹ" y la explicación de Rava. El día está EN DISPUTA.
//   · Shabat 88a — "כָּפָה הַקָּדוֹשׁ בָּרוּךְ הוּא עֲלֵיהֶם אֶת הָהָר כְּגִיגִית" (Rav Avdimí
//     bar Jama bar Jasa); "מִכָּאן מוֹדָעָא רַבָּה לְאוֹרָיְיתָא" (Rav Aja bar Yaakov);
//     Rava: "אַף עַל פִּי כֵן הֲדוּר קַבְּלוּהָ בִּימֵי אֲחַשְׁוֵרוֹשׁ"; R. Simai y las dos
//     coronas por "נַעֲשֶׂה" y "נִשְׁמָע"; R. Elazar y la bat kol "מִי גִּלָּה לְבָנַי רָז
//     זֶה"; el min: "עַמָּא פְּזִיזָא, דְּקַדְּמִיתוּ פּוּמַּיְיכוּ לְאוּדְנַיְיכוּ".
//   · Shabat 88a-b — la respuesta de Rava: "אֲנַן דְּסָגֵינַן בִּשְׁלִימוּתָא כְּתִיב בַּן:
//     תֻּמַּת יְשָׁרִים תַּנְחֵם" (la frase se parte entre 88a y 88b en Sefaria).
//   · Shabat 88a — "בְּרִיךְ רַחֲמָנָא דִּיהַב אוֹרְיָאן תְּלִיתַאי לְעַם תְּלִיתַאי עַל יְדֵי
//     תְּלִיתַאי בְּיוֹם תְּלִיתַאי בְּיַרְחָא תְּלִיתַאי" (aquel galileo ante Rav Jisda).
//   · Menajot 65a — la Mishná del triple interrogatorio en la siega del Ómer
//     "מִפְּנֵי הַבַּיְיתּוֹסִים"; la baraita: "שֶׁהָיוּ בַּיְיתּוֹסִין אוֹמְרִים: עֲצֶרֶת אַחַר
//     הַשַּׁבָּת"; Rabán Yojanán ben Zakai y el anciano ("שׁוֹטִים, מִנַּיִן לָכֶם?").
//   · Menajot 65b — "וּסְפַרְתֶּם לָכֶם — שֶׁתְּהֵא סְפִירָה לְכׇל אֶחָד וְאֶחָד"; R. Eliezer
//     ("סְפִירָה תְּלוּיָה בְּבֵית דִּין"); R. Yehoshúa ("מְנֵה יָמִים וְקַדֵּשׁ עֲצֶרֶת");
//     R. Yishmael; R. Yehudá ben Betera; y el cálculo de los 51/52/53/54/55/56 días.
//   · Menajot 66a — R. Yosei: "צֵא וּבְדוֹק אֵיזוֹ שַׁבָּת"; "אֵימָתַי אַתָּה מוֹצֵא שֶׁבַע
//     שַׁבָּתוֹת תְּמִימוֹת? בִּזְמַן שֶׁאַתָּה מַתְחִיל לִימְנוֹת מִבָּעֶרֶב"; Abaye: "מִצְוָה
//     לְמִימְנֵי יוֹמֵי, וּמִצְוָה לְמִימְנֵי שָׁבוּעֵי"; Ameimar contaba días y no semanas.
//   · Rosh Hashaná 21b — Rav y Shmuel: "חֲמִשִּׁים שַׁעֲרֵי בִינָה נִבְרְאוּ בָּעוֹלָם,
//     וְכוּלָּן נִיתְּנוּ לְמֹשֶׁה, חָסֵר אֶחָד" (Tehilim 8:6).
//   · Makot 23b-24a — R. Simlai (613 = 365 + 248) y Rav Hamnuna: "תּוֹרָה" en
//     gematría "שִׁית מְאָה וְחַד סְרֵי הֲוֵי" (611); las dos restantes "מִפִּי הַגְּבוּרָה
//     שְׁמַעֲנוּם".
//   · Pirkei Avot 6:2 — R. Yehoshúa ben Leví: "בְּכָל יוֹם וָיוֹם בַּת קוֹל יוֹצֵאת מֵהַר
//     חוֹרֵב"; "אַל תִּקְרָא חָרוּת אֶלָּא חֵרוּת".
//
//   MIDRASH
//   · Rut Rabá 2:14 — R. Ze'era: "מְגִלָּה זוֹ אֵין בָּהּ לֹא טֻמְאָה וְלֹא טָהֳרָה וְלֹא
//     אִסּוּר וְלֹא הֶתֵּר, וְלָמָּה נִכְתְּבָה? לְלַמֶּדְךָ כַּמָּה שָׂכָר טוֹב לְגוֹמְלֵי חֲסָדִים".
//
//   RISHONIM / POSKIM
//   · Rashi a Shemot 19:1 — "בְּרֹאשׁ חֹדֶשׁ" y "שֶׁיִּהְיוּ דִּבְרֵי תוֹרָה חֲדָשִׁים עָלֶיךָ
//     כְּאִלּוּ הַיּוֹם נְתָנָם".
//   · Rashi a Shemot 19:2 — "וַיִּחַן שָׁם יִשְׂרָאֵל — כְּאִישׁ אֶחָד בְּלֵב אֶחָד, אֲבָל
//     שְׁאָר כָּל הַחֲנִיּוֹת בְּתַרְעוֹמוֹת וּבְמַחֲלֹקֶת" (Mejilta).
//   · Rashi a Vayikrá 23:15 — "מִמָּחֳרַת יוֹם טוֹב" y "מְלַמֵּד שֶׁמַּתְחִיל וּמוֹנֶה
//     מִבָּעֶרֶב". A 23:16 — "וְלֹא עַד בִּכְלָל, וְהֵן אַרְבָּעִים וְתִשְׁעָה יוֹם".
//   · Rashi a Vayikrá 23:22 — R. Avdimí: la peá está puesta EN MEDIO de las
//     fiestas, "כְּאִלּוּ בָּנָה בֵּית הַמִּקְדָּשׁ וְהִקְרִיב קָרְבְּנוֹתָיו בְּתוֹכוֹ" (Sifrá).
//   · Ramban a Vayikrá 23:36 — "וּמָנָה מִמֶּנּוּ תִּשְׁעָה וְאַרְבָּעִים יוֹם, שִׁבְעָה
//     שָׁבוּעוֹת כִּימֵי עוֹלָם, וְקִדֵּשׁ יוֹם שְׁמִינִי כִּשְׁמִינִי שֶׁל חָג, וְהַיָּמִים
//     הַסְּפוּרִים בֵּינְתַיִם כְּחֻלּוֹ שֶׁל מוֹעֵד… וְהוּא יוֹם מַתַּן תּוֹרָה".
//   · Ibn Ezra a Vayikrá 23:11 — el tratamiento largo de "מִמָּחֳרַת הַשַּׁבָּת" contra
//     "הַמַּכְחִישִׁים", con las pruebas de shabatón, "שֶׁבַע שַׁבָּתוֹת" = semanas, y el
//     paralelo de "עֲיָרִים" (Shoftim 10:4). A 23:15 — el paralelo con el Yovel.
//     A 23:16 — "כִּי כֵן מִסְפַּר הַתּוֹרָה".
//   · Abarbanel a Vayikrá 23:1 — sus 23 preguntas y sus respuestas. Se usan la
//     11.ª, la 14.ª, la 17.ª y la 23.ª. Texto literal de la respuesta a la 17.ª:
//     "וְהִנֵּה לֹא נָתְנָה תוֹרָה טַעַם לְחַג הַזֶּה שֶׁיִּהְיֶה זֵכֶר לְיוֹם מַתַּן תּוֹרָה, לְפִי
//     שֶׁלֹּא הוּקְבַּע הֶחָג לְזִכְרוֹן מַתַּן תּוֹרָתֵנוּ… וְאֵין סָפֵק שֶׁבְּיוֹם חַג הַשָּׁבוּעוֹת
//     נִיתְּנָה הַתּוֹרָה אֲבָל לֹא נִצְטַוָּה הֶחָג עַל זְכִירָתָהּ"; y "וְלִהְיוֹת חַג הַשָּׁבוּעוֹת
//     מְחֻבָּר בָּעֹמֶר לָכֵן לֹא בָּא עָלָיו דִּבּוּר בִּפְנֵי עַצְמוֹ".
//   · Malbim a Vayikrá, Emor 163 — "וּסְפַרְתֶּם לָכֶם… הַיְינוּ שֶׁיִּסְפּוֹר כָּל אֶחָד
//     וְאֶחָד בִּפְנֵי עַצְמוֹ" frente a "תִּסְפָּר לָךְ — בְּבֵית דִּין". (Sefaria indexa el
//     Malbim a Emor por siman, no por versículo: la referencia por versículo NO es
//     válida. Los simanim usados son 163, 164, 166, 167 y 194, todos cotejados.)
//   · Malbim, Emor 164 — por qué la Torá tuvo que decir "מָחֳרַת הַשַּׁבָּת" y no
//     "מָחֳרַת הֶחָג" ni "מָחֳרַת הַפֶּסַח". Emor 166 — "תְּמִימוֹת… מִלַּיְלָה וְיוֹם".
//     Emor 167 — los dos versículos juntos enseñan que la fiesta no cae ni en el
//     día 49 ni en el 51.
//   · Chizkuní a Vayikrá 23:15 — el paralelo explícito con la shemitá y el Yovel:
//     "כְּשֵׁם שֶׁאָנוּ מוֹנִין יוֹמֵי וְשָׁבוּעֵי וּלְאַחַר הַשַּׁבָּת הַשְּׁבִיעִית אָנוּ מְקַדְּשִׁים
//     אֶת יוֹם הַחֲמִשִּׁים, כָּךְ אָנוּ צְרִיכִים לַעֲשׂוֹת בִּשְׁמִטָּה וְיוֹבֵל".
//   · Rambam, Mishné Torá, Temidín uMusafín 7:22 · 7:23 · 7:24 · 7:25 —
//     "מִצְוַת עֲשֵׂה לִסְפֹּר"; "מִצְוָה זוֹ עַל כָּל אִישׁ מִיִּשְׂרָאֵל וּבְכָל מָקוֹם וּבְכָל
//     זְמַן"; se cuenta de pie; la berajá.
//   · Rambam, Moré Nevujim III:43 — la fiesta es el aniversario de la revelación
//     del Sinaí y se cuentan los días "como quien espera a su amigo más íntimo
//     cuenta los días y hasta las horas". NOTA: Sefaria solo aloja la traducción
//     inglesa de Friedlander (1903) de este capítulo; se cita en paráfrasis fiel,
//     sin poner hebreo que no cotejé.
//   · Shulján Aruj, Oraj Jaim 494:1 — "בְּיוֹם חֲמִשִּׁים לִסְפִירַת הָעֹמֶר הוּא חַג
//     שָׁבוּעוֹת" y "זְמַן מַתַּן תּוֹרָתֵינוּ" (la halajá define la fiesta por la CUENTA).
//   · Rema a Oraj Jaim 490:9 — "וְנוֹהֲגִין לוֹמַר רוּת בְּשָׁבוּעוֹת (אבודרהם)".
//   · Rema a Oraj Jaim 494:3 — las hierbas y los lácteos.
//   · Masejet Sofrim 14:18 — "רוּת בְּמוֹצָאֵי יוֹם טוֹב רִאשׁוֹן שֶׁל עֲצֶרֶת עַד חֶצְיוֹ
//     וּמַשְׁלִים בְּמוֹצָאֵי יוֹם טוֹב הָאַחֲרוֹן". CORRECCIÓN DE REFERENCIA: la fuente
//     de la costumbre de Rut NO está en Sofrim 14:16 (que trata del ciego y el
//     Shemá) sino en 14:18. Se cotejaron ambas.
//
//   CABALÁ / JASIDUT
//   · Zohar, Hakdamá (Sefaria: Zohar, Introduction 14:125-128; daf 8a) — "רִבִּי
//     שִׁמְעוֹן הֲוָה יָתִיב וְלָעֵי בְּאוֹרַיְיתָא בְּלֵילְיָא דְּכַלָּה אִתְחַבְּרַת בְּבַעֲלָהּ";
//     "כֻּלְּהוּ דִּמְתַקְנִין תִּקּוּנָהָא בְּהַאי לֵילְיָא… יְהוֹן רְשִׁימִין וּכְתִיבִין בְּסִפְרָא
//     דְדֻכְרָנַיָא". El propio texto remite en el margen a Emor 98a. Es el origen
//     del Tikún Leil Shavuot. Y ahí mismo: "מְסַפְּרִים — מְנַהֲרִין כְּזוֹהֲרָא דְּסַפִּיר".
//   · Sefer Yetzirá (versión del Gra) 1:1 — "וּבָרָא אֶת עוֹלָמוֹ בִּשְׁלֹשָׁה סְפָרִים:
//     בְּסֵפֶר וּסְפָר וְסִפּוּר".
//   · Pri Etz Jaim, Sha'ar Sefirat HaOmer 1 (Arizal) — "וְאָמְנָם לִהְיוֹת כָּל אַחַת
//     כְּלוּלָה מִכָּל הַז' כַּנּוֹדָע, לָכֵן אֵינוֹ מַסְפִּיק בְּז' יָמִים רַק בְּז' שָׁבוּעוֹת,
//     שֶׁהֵם ז' פְּעָמִים ז' יָמִים"; y la cuenta de los diez Nombres אֶהְיֶה: 40 letras
//     + 10 nombres = 50. AVISO DE HONESTIDAD: el Pri Etz Jaim de Sefaria NO nombra
//     las semanas como jésed-guevurá-tiféret-nétzaj-hod-yesod-maljut; las nombra
//     jojmá, biná, jasadim del daat, guevurot del daat, jésed, guevurá, tiféret+
//     maljut. La secuencia popular "jésed shebejésed…" se cotejó donde SÍ está: en
//     los sidurim (Sidur Sefard, Sefirat HaOmer; Koren Ashkenaz, día 1 = 16 de
//     Nisán = חסד שבחסד) y en Torá Or, Vayakhel 2:11.
//   · Torá Or, Vayakhel 2:11 (Admur HaZakén) — "וּבְז' שָׁבוּעוֹת אֵלּוּ מְהַפְּכָן מְעַט
//     מְעַט חֶסֶד שֶׁבְּחֶסֶד כו'… וְזֶהוּ 'וּסְפַרְתֶּם' לְשׁוֹן הֶאָרָה וְאוֹר".
//   · Baal Shem Tov al haTorá, Shavuot 1-2 — la kavaná de los Diez Mandamientos y
//     el aviso de no interrumpir con charla vana después del Tikún de la noche,
//     "כִּי אָז עוֹלִין כָּל קִישּׁוּטֵי הַכַּלָּה שֶׁעָשָׂה בַּלַּיְלָה". El propio texto cita
//     Shabat 86b para la opinión de R. Yosei (7 de Siván).
//   · Baal HaSulam, Kuntres Matán Torá, maamar II («HaArvut») §17ss — "לֹא נִיתְּנָה
//     לָהֶם הַתּוֹרָה בְּטֶרֶם שֶׁנִּשְׁאַל כָּל אֶחָד וְאֶחָד מִיִּשְׂרָאֵל אִם מַסְכִּים הוּא
//     לְקַבֵּל עָלָיו אֶת הַמִּצְוָה שֶׁל אַהֲבַת זוּלָתוֹ"; y "וְאַחַר שֶׁכָּל הָאֻמָּה הִסְכִּימוּ
//     פֶּה אֶחָד וְאָמְרוּ 'נַעֲשֶׂה וְנִשְׁמָע', הֲרֵי שֶׁכָּל אֶחָד מִיִּשְׂרָאֵל נַעֲשָׂה עָרֵב".
//
//  LO QUE NO SE PUDO VERIFICAR (y por eso NO se cita):
//   · SFORNO: "Sforno on Leviticus 23:15" y "…23:16" devuelven CERO segmentos en
//     Sefaria. No se le pone ninguna palabra en la boca; no aparece en el estudio.
//   · BAAL HATURIM a Bereshit 28:12 ("Ba'al HaTurim on Genesis 28:12") devuelve
//     contenido vacío. Por eso la igualdad סִינַי = סֻלָּם = 130, que suele
//     atribuírsele, se presenta SOLO como cuenta verificada, sin firmarla con su
//     nombre ni inventarle folio.
//   · "MOSHÉ MURIÓ / DAVID MURIÓ EN SHAVUOT" como razón de la lectura de Rut: no
//     se cotejó fuente alojada, así que no se afirma. La costumbre se sostiene con
//     lo que SÍ está: Sofrim 14:18 y Rema, Oraj Jaim 490:9 (que la atribuye al
//     Abudraham).
//   · No se afirma nada sobre la tribu ni la letra del mes de Siván: la versión del
//     Gra del Sefer Yetzirá que aloja Sefaria asigna letras a los meses, pero no se
//     cotejó ese pasaje para Siván en este estudio y no se inventa.
//
//  GEMATRÍAS Y CUENTAS — calculadas letra por letra con script:
//    תּוֹרָה = ת400 + ו6 + ר200 + ה5 = 611.  Y el propio Talmud lo dice con esas
//      palabras: "שִׁית מְאָה וְחַד סְרֵי הֲוֵי" (Makot 24a). 611 + 2 = 613.
//    7 × 7 = 49; el día siguiente es el 50. Rashi a Vayikrá 23:16 lo dice:
//      "וְלֹא עַד בִּכְלָל, וְהֵן אַרְבָּעִים וְתִשְׁעָה יוֹם".
//    LA CUENTA DEL CALENDARIO, hecha a mano: del 16 de Nisán al 5 de Siván.
//      Nisán tiene 30 días → del 16 al 30 son 15 días. Iyar (29 días) → 29.
//      Siván del 1 al 5 → 5.  15 + 29 + 5 = 49. El día 50 es el 6 de Siván.
//    נ (nun) = 50 — la letra del quinto de los cincuenta portales.
//    Arizal, Pri Etz Jaim: 10 Nombres אֶהְיֶה × 4 letras = 40 letras, + los 10
//      Nombres mismos = 50. (Aritmética que trae el propio texto.)
//    סִינַי = ס60 + י10 + נ50 + י10 = 130 · סֻלָּם = ס60 + ל30 + ם40 = 130
//      (grafía defectiva de Bereshit 28:12, cotejada). Cuenta exacta; atribución
//      NO verificada — se presenta como cuenta, no como cita.
//    DESCARTADAS por forzadas o por no cerrar con nada sólido:
//      עֹמֶר = 316 · שָׁבוּעוֹת = 784 · עֲצֶרֶת = 760 · חֲמִשִּׁים = 398 ·
//      נַעֲשֶׂה וְנִשְׁמָע = 891 · רוּת = 606 (el conocido 606 + 7 = 613 no se cita
//      porque no hallé fuente alojada) · מוֹאָב = 49 (la cuenta cierra exacta, pero
//      no hay fuente y la coincidencia no enseña nada: se descarta sin piedad) ·
//      עָנִי = 130 (tercera coincidencia con Sinaí/sulam: se descarta por barata).
//
//  FECHA VERIFICADA con el conversor de hebcal: 6 de Siván 5787 = 11 de junio de
//  2027 (evento "Shavuot I"); 7 de Siván = 12 de junio (Shavuot II); 5 de Siván =
//  10 de junio ("49th day of the Omer"); 16 de Nisán 5787 = 23 de abril de 2027
//  ("1st day of the Omer").
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "shavuot",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 10 — Shavuot · la única fiesta que hay que contar para que exista",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۱۰ — شاووعوت · تنها عیدی که باید شمرده شود تا باشد",
    he: "וּסְפַרְתֶּם לָכֶם",
    titulo: "Shavuot — la fiesta sin fecha",
    tituloFa: "شاووعوت — عیدی بی‌تاریخ",
    ganchoEs:
      "Busca en la Torá el día de Shavuot y no lo encontrarás. A Pésaj le pone fecha, a Yom Kipur le pone fecha, a Sucot le pone fecha. A esta no. Dice otra cosa: cuenta cuarenta y nueve días desde la cebada, y el día cincuenta es la fiesta. Es la única del calendario que no cae: hay que traerla, día por día, durante siete semanas. Si nadie cuenta, no hay día.",
    ganchoFa:
      "در تورات به دنبال روزِ شاووعوت بگرد؛ نخواهی یافت. برای پسح تاریخ می‌دهد، برای یوم کیپور تاریخ می‌دهد، برای سوکوت تاریخ می‌دهد. برای این یکی نه. چیز دیگری می‌گوید: چهل‌ونه روز از جوِ نوبر بشمار، و روزِ پنجاهم عید است. تنها عیدی است که خودش فرا نمی‌رسد: باید آن را آورد، روز به روز، در هفت هفته. اگر کسی نشمارد، روزی در کار نیست.",
    dimensiones: [
      { es: "La única fiesta sin fecha", fa: "تنها عیدی بدون تاریخ" },
      { es: "Cuarenta y nueve días contados a mano", fa: "چهل‌ونه روزِ دست‌شمار" },
      { es: "Un nombre que le pusieron los Sabios", fa: "نامی که حکیمان بر آن نهادند" },
    ],
    fecha: "Shavuot 5787 · 11–12 jun 2027",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — lo que este estudio NO afirma",
    rotulo:
      "Se dice de entrada, porque el título puede sonar a provocación y no lo es: es una lectura del texto, y hay un rishón que la firma.",
    parrafos: [
      `Este estudio NO dice que la Torá no se haya dado en Shavuot. La tradición lo afirma con toda su fuerza, la liturgia lo canta cada año —«זְמַן מַתַּן תּוֹרָתֵינוּ», el tiempo de la entrega de nuestra Torá, dice el Shulján Aruj (Oraj Jaim 494:1)— y este estudio lo asume como propio. Lo que se afirma es más fino y es un hecho del texto, comprobable leyendo: la Torá escrita NUNCA le pone fecha de mes a esta fiesta, y NUNCA la llama la fiesta de la entrega de la Torá. Ese nombre es de los Sabios.`,
      `Y no es una ocurrencia moderna. Abarbanel lo pregunta él mismo, en su comentario a Vayikrá 23, entre las veintitrés preguntas con que abre el capítulo de las fiestas: «¿por qué la Torá no dio razón para Jag HaShavuot, que es el tiempo de la entrega de nuestra Torá, como sí la dio para Pésaj, para Sucot y para Yom Kipur?». Y responde con una frase que hay que leer despacio: «no hay duda de que en el día de Jag HaShavuot fue dada la Torá, PERO la fiesta no fue ordenada para recordarla». Se puede discutir con él —Ramban lee otra cosa, y también está aquí— pero no se le puede acusar de novedad.`,
      `Tampoco se afirma que la fecha del 6 de Siván sea invento tardío. Es la fecha que da el Talmud. Lo que el Talmud NO hace es darla como algo obvio: en Shabat 86b los Sabios enseñan que los Diez Mandamientos se dieron el seis del mes, y Rabí Yosei dice que el siete. Sobre el día exacto de la revelación más importante de la historia de este pueblo, hay una disputa registrada. Ese dato no debilita nada: enseña qué clase de fiesta es esta.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — una ausencia, una cuenta y un nombre prestado",
    intro: [
      `Antes de recorrerlo, el esqueleto. Todo el estudio se sostiene sobre cosas que cualquiera puede comprobar abriendo el texto. No hay que creerle a nadie: hay que mirar.`,
    ],
    filas: [
      {
        ref: "Vayikrá 23:5-6 · 23:24 · 23:27 · 23:34",
        he: "בְּאַרְבָּעָה עָשָׂר · בְּאֶחָד לַחֹדֶשׁ · בֶּעָשׂוֹר · בַּחֲמִשָּׁה עָשָׂר",
        es: "El 14 · el 1 · el 10 · el 15",
        funcion:
          "Pésaj, Yom Teruá, Yom Kipur y Sucot: las cuatro llevan fecha de mes.",
      },
      {
        ref: "Vayikrá 23:15-16",
        he: "וּסְפַרְתֶּם לָכֶם… תִּסְפְּרוּ חֲמִשִּׁים יוֹם",
        es: "Y contaréis para vosotros… contaréis cincuenta días",
        funcion:
          "La quinta no lleva fecha: lleva una operación. Hay que hacerla para tenerla.",
      },
      {
        ref: "Vayikrá 23:9 vs. 23:23 · 23:26 · 23:33",
        he: "וַיְדַבֵּר יְהֹוָה אֶל־מֹשֶׁה לֵּאמֹר",
        es: "Y habló YHVH a Moshé, diciendo",
        funcion:
          "Cada fiesta del otoño abre con discurso propio. Shavuot no: cuelga del discurso del Ómer.",
      },
      {
        ref: "Devarim 16:9",
        he: "שִׁבְעָה שָׁבֻעֹת תִּסְפׇּר־לָךְ",
        es: "Siete semanas contarás PARA TI",
        funcion:
          "La cuenta no es del calendario ni del cielo: se le encarga a alguien.",
      },
      {
        ref: "Menajot 65b",
        he: "שֶׁתְּהֵא סְפִירָה לְכׇל אֶחָד וְאֶחָד",
        es: "Que la cuenta sea de cada uno y cada uno",
        funcion:
          "Y ese alguien no es el tribunal: es cada persona, por su cuenta, en voz alta.",
      },
      {
        ref: "Shabat 88a",
        he: "הֲדוּר קַבְּלוּהָ בִּימֵי אֲחַשְׁוֵרוֹשׁ",
        es: "Volvieron a aceptarla en los días de Ajashverosh",
        funcion:
          "Lo que se recibió bajo la montaña se aceptó libremente mil años después. Purim cierra el Sinaí.",
      },
    ],
    cierre: [
      `Una fiesta sin fecha, un mandato de contar dirigido a cada uno, y una aceptación que llegó tarde y por voluntad propia. Ese es Shavuot.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "Versículo-ancla — Vayikrá (Levítico) 23:15-16",
        he: "וּסְפַרְתֶּ֤ם לָכֶם֙ מִמׇּחֳרַ֣ת הַשַּׁבָּ֔ת מִיּוֹם֙ הֲבִ֣יאֲכֶ֔ם אֶת־עֹ֖מֶר הַתְּנוּפָ֑ה שֶׁ֥בַע שַׁבָּת֖וֹת תְּמִימֹ֥ת תִּהְיֶֽינָה׃ עַ֣ד מִֽמׇּחֳרַ֤ת הַשַּׁבָּת֙ הַשְּׁבִיעִ֔ת תִּסְפְּר֖וּ חֲמִשִּׁ֣ים י֑וֹם וְהִקְרַבְתֶּ֛ם מִנְחָ֥ה חֲדָשָׁ֖ה לַיהֹוָֽה׃",
        es: "Y contaréis para vosotros desde el día siguiente al reposo, desde el día en que trajisteis la gavilla de la ofrenda mecida: siete semanas completas serán. Hasta el día siguiente a la séptima semana contaréis cincuenta días, y ofreceréis una ofrenda nueva a YHVH.",
        source: "Vayikrá 23:15-16",
      },
      {
        label: "La fecha que no está — Vayikrá 23:21",
        he: "וּקְרָאתֶ֞ם בְּעֶ֣צֶם ׀ הַיּ֣וֹם הַזֶּ֗ה מִֽקְרָא־קֹ֙דֶשׁ֙ יִהְיֶ֣ה לָכֶ֔ם כׇּל־מְלֶ֥אכֶת עֲבֹדָ֖ה לֹ֣א תַעֲשׂ֑וּ חֻקַּ֥ת עוֹלָ֛ם בְּכׇל־מוֹשְׁבֹ֥תֵיכֶ֖ם לְדֹרֹֽתֵיכֶֽם׃",
        es: "Y proclamaréis en ese mismo día: convocación sagrada será para vosotros; ninguna obra servil haréis. Ley eterna en todas vuestras moradas, por vuestras generaciones.",
        source: "Vayikrá 23:21 — «ese mismo día», sin decir cuál día del mes",
      },
      {
        label: "El día que sí tiene nombre propio — Shemot 19:1-2",
        he: "בַּחֹ֙דֶשׁ֙ הַשְּׁלִישִׁ֔י לְצֵ֥את בְּנֵי־יִשְׂרָאֵ֖ל מֵאֶ֣רֶץ מִצְרָ֑יִם בַּיּ֣וֹם הַזֶּ֔ה בָּ֖אוּ מִדְבַּ֥ר סִינָֽי׃ … וַֽיַּחֲנ֖וּ בַּמִּדְבָּ֑ר וַיִּֽחַן־שָׁ֥ם יִשְׂרָאֵ֖ל נֶ֥גֶד הָהָֽר׃",
        es: "En el tercer mes de la salida de los hijos de Israel de la tierra de Egipto, en ese día llegaron al desierto de Sinaí… y acamparon en el desierto, y acampó allí Israel frente al monte.",
        source: "Shemot 19:1-2 — «acampó», en singular",
      },
      {
        label: "Las dos palabras que invierten el orden — Shemot 24:7",
        he: "וַיִּקַּח֙ סֵ֣פֶר הַבְּרִ֔ית וַיִּקְרָ֖א בְּאׇזְנֵ֣י הָעָ֑ם וַיֹּ֣אמְר֔וּ כֹּ֛ל אֲשֶׁר־דִּבֶּ֥ר יְהֹוָ֖ה נַעֲשֶׂ֥ה וְנִשְׁמָֽע׃",
        es: "Y tomó el libro del pacto y lo leyó a oídos del pueblo, y dijeron: todo lo que habló YHVH haremos y escucharemos.",
        source: "Shemot 24:7",
      },
      {
        label: "La lectura del día — Rut 1:16 y 1:22",
        he: "כִּ֠י אֶל־אֲשֶׁ֨ר תֵּלְכִ֜י אֵלֵ֗ךְ וּבַאֲשֶׁ֤ר תָּלִ֙ינִי֙ אָלִ֔ין עַמֵּ֣ךְ עַמִּ֔י וֵאלֹהַ֖יִךְ אֱלֹהָֽי׃ … וְהֵ֗מָּה בָּ֚אוּ בֵּ֣ית לֶ֔חֶם בִּתְחִלַּ֖ת קְצִ֥יר שְׂעֹרִֽים׃",
        es: "Porque adonde tú vayas iré, y donde tú pases la noche pasaré la noche; tu pueblo es mi pueblo, y tu Dios mi Dios… Y ellas llegaron a Bet Léjem al comienzo de la siega de la cebada.",
        source: "Rut 1:16 · 1:22 — se lee en Shavuot (Masejet Sofrim 14:18; Rema, Oraj Jaim 490:9)",
      },
    ],
    parrafos: [
      `Haz tú mismo la comprobación, porque este estudio entero descansa en ella y no hace falta saber hebreo para hacerla. Abre Vayikrá 23, el capítulo que ordena las fiestas, y ve marcando las fechas. Pésaj: «en el primer mes, a los catorce del mes» (23:5). La fiesta de las matsot: «a los quince días de este mes» (23:6). Yom Teruá: «en el séptimo mes, en el primero del mes» (23:24). Yom Kipur: «a los diez del séptimo mes» (23:27). Sucot: «a los quince días de este séptimo mes» (23:34). Cinco fechas, todas limpias, todas con número y con mes. Ahora busca la de Shavuot. No está. En su lugar hay esto: «contaréis para vosotros… siete semanas completas… contaréis cincuenta días» (23:15-16). Y cuando llega el momento de decir cuándo se celebra, la Torá dice solamente «en ESE mismo día» (23:21) — un demostrativo que apunta al final de una cuenta, no a una casilla del calendario.`,
      `Y no es que se le haya olvidado en un pasaje y lo diga en otro. Los cuatro lugares de la Torá que nombran esta fiesta se cotejaron uno por uno y ninguno da fecha: Vayikrá 23:15-21, Devarim 16:9-10 («siete semanas contarás para ti»), Bamidbar 28:26 («y en el día de las primicias… en vuestras semanas») y Shemot 34:22 («y la fiesta de las Semanas harás para ti, primicias de la siega del trigo»). En Shemot 23:16 ni siquiera se llama Shavuot: se llama «la fiesta de la siega». Cuatro nombres —Fiesta de las Semanas, Día de las Primicias, Fiesta de la Siega, y el de los Sabios, Atséret— y ni una sola fecha. La Torá tuvo cinco oportunidades de escribir «el seis de Siván» y no lo hizo ninguna vez.`,
      `Hay todavía un detalle estructural que casi nadie mira y que es más elocuente que todo lo anterior. En Vayikrá 23, cada fiesta del otoño arranca con una fórmula de apertura: «וַיְדַבֵּר יְהֹוָה אֶל־מֹשֶׁה לֵּאמֹר», «y habló YHVH a Moshé, diciendo». Está en 23:23 (Yom Teruá), en 23:26 (Yom Kipur) y en 23:33 (Sucot). Shavuot no tiene ninguna. Lo que hay en 23:9 es el discurso del ÓMER —«cuando entréis a la tierra… traeréis la gavilla, primicia de vuestra siega, al sacerdote»— y Shavuot viene dentro de ese mismo discurso, sin puerta propia. Abarbanel lo dice sin rodeos: «y por estar la fiesta de Shavuot unida al Ómer, no vino sobre ella un discurso por sí mismo, sino que se apoyó en el discurso dicho sobre el Ómer». La fiesta no tiene fecha y tampoco tiene párrafo: es el remate de una cuenta que empezó en otra fiesta.`,
      `¿Y qué se cuenta exactamente? Cebada. La gavilla del Ómer se siega y se ofrece el 16 de Nisán, al día siguiente del primer día de Pésaj, y es de cebada — el grano que en el mundo antiguo era comida de animales. Cincuenta días después se ofrecen «dos panes» de trigo, y son la única ofrenda del Templo que se trae LEUDADA: «חָמֵץ תֵּאָפֶינָה», «con levadura serán horneadas» (Vayikrá 23:17). Léelo junto: la cuenta empieza en la fiesta donde la levadura está prohibida y termina en la ofrenda donde la levadura es obligatoria. Abarbanel también explica esto: al salir de Egipto Israel estaba «como bestias, sin Torá y sin conocimiento», y por eso se ofrece cebada; en Shavuot, ya recibida la Torá, «se hicieron dueños de intelecto y entendedores de saber», y por eso se ofrece pan de trigo, comida de seres humanos. Cuarenta y nueve días para pasar de forraje a pan.`,
      `Y si esa es la cuenta, entonces hay un libro entero del Tanaj que transcurre dentro de ella, día por día, sin decirlo. Rut y Noemí llegan a Bet Léjem —la casa del pan— «בִּתְחִלַּת קְצִיר שְׂעֹרִים», al comienzo de la siega de la cebada (Rut 1:22): el mismísimo día del Ómer. Y Rut espiga en el campo de Bóaz «עַד־כְּלוֹת קְצִיר־הַשְּׂעֹרִים וּקְצִיר הַחִטִּים», hasta que se acabaron la siega de la cebada Y la siega del trigo (2:23): el día de los dos panes. El libro empieza en el día uno y termina en el día cincuenta. Por eso se lee en esta fiesta, y la costumbre está documentada en dos sitios que se cotejaron: Masejet Sofrim 14:18 —«רוּת בְּמוֹצָאֵי יוֹם טוֹב רִאשׁוֹן שֶׁל עֲצֶרֶת», Rut, en la salida del primer día de Atséret, hasta la mitad, y se completa en la salida del último día— y el Rema en el Shulján Aruj, que anota: «וְנוֹהֲגִין לוֹמַר רוּת בְּשָׁבוּעוֹת», y se acostumbra decir Rut en Shavuot, atribuyéndolo al Abudraham (Oraj Jaim 490:9). No es una lectura decorativa: es el calendario del rollo.`,
      `Ahora la cuenta, hecha a mano, sin misterio. El primer día es el 16 de Nisán. Nisán tiene treinta días, así que del 16 al 30 hay quince días. Iyar tiene veintinueve: veintinueve más. Del 1 al 5 de Siván, cinco más. Quince más veintinueve más cinco: cuarenta y nueve. El día siguiente —el cincuenta— es el 6 de Siván. Nadie escribió esa fecha en la Torá; la fecha SALE de la suma. Y por eso el propio Abarbanel, cuando explica el versículo, no dice «la fiesta es el seis de Siván» sino «y su mañana es el día cincuenta, que es el día sexto del tercer mes». Primero la cuenta; la fecha es su resultado. En 5787 ese día cae el 11 de junio de 2027, y el día 49 —el último que se cuenta— es el 10 de junio.`,
      `Falta la palabra más importante del versículo y es la más corta: לָכֶם, «para vosotros». No dice «se contarán cincuenta días» ni «habrá cincuenta días». Dice «וּסְפַרְתֶּם לָכֶם» — contad, vosotros, para vosotros. Y en Devarim es todavía más personal: «תִּסְפׇּר־לָךְ», «contarás para ti», en singular. Toda la fiesta cuelga de un verbo en segunda persona. El resto del calendario judío te sucede: Rosh Hashaná llega aunque estés dormido, Yom Kipur llega aunque no lo quieras. Shavuot es el único día del año que necesita que alguien lo traiga.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Rashi hace aquí el trabajo de siempre: fija el suelo. Sobre «מִמָּחֳרַת הַשַּׁבָּת» aclara en tres palabras de qué reposo se habla: «מִמָּחֳרַת יוֹם טוֹב» — del día siguiente a la festividad, es decir el 16 de Nisán, no el domingo. Sobre «תְּמִימֹת תִּהְיֶינָה», que las semanas sean completas, saca la halajá práctica: «enseña que se empieza a contar desde la noche, porque si no, no serían completas». Y sobre el versículo siguiente pone el número exacto: «hasta el día siguiente a la séptima semana contaréis — y no incluyendo ese día: son cuarenta y nueve días». Ahí está el esqueleto entero: cuarenta y nueve se cuentan, el cincuenta se celebra. Pero el Rashi que ilumina esta fiesta está en otro lado. Sobre Shemot 19:2, donde el texto dice «וַיִּחַן־שָׁם יִשְׂרָאֵל» —«y acampó allí Israel», en singular, cuando todos los demás campamentos van en plural— comenta cuatro palabras que se volvieron famosas: «כְּאִישׁ אֶחָד בְּלֵב אֶחָד — como un solo hombre con un solo corazón; pero todos los otros campamentos fueron con quejas y con disputa». El texto cambió de número, y Rashi oyó en ese cambio la única condición que se cumplió al pie del Sinaí.`,
      },
      {
        etiqueta: "El Ramban / Najmánides (הָרַמְבַּ\"ן).",
        texto: `Y aquí llega la respuesta más elegante que se le ha dado a la pregunta de este estudio. Comentando Vayikrá 23:36, el Ramban explica por qué los Sabios llaman «Atséret» a Shavuot, un nombre que la Torá le da solamente al octavo día de Sucot: «y contó desde él cuarenta y nueve días, siete semanas como los días del mundo, y santificó el día octavo como el octavo de la Fiesta; y los días contados en medio son como el jol hamoed entre el primero y el octavo de la Fiesta — y ése es el día de la entrega de la Torá, en el que les mostró Su gran fuego, y Sus palabras oyeron de en medio del fuego». Detente en eso. Para el Ramban, Shavuot no es una fiesta independiente que la Torá se olvidó de fechar: es el {{study:shmini-atzeret|Shminí Atséret}} de Pésaj. Y los cuarenta y nueve días del Ómer no son un intervalo vacío entre dos fiestas: son jol hamoed. Cuarenta y nueve días de festividad intermedia, invisible, sin comida especial ni prohibición de trabajo, sostenida únicamente por una frase que alguien dice cada noche. Por eso no hay fecha: nadie le pone fecha al último día de una fiesta que ya empezó.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Ibn Ezra es el que pelea. En su comentario a Vayikrá 23:11 se planta a defender la lectura de los Sabios contra «הַמַּכְחִישִׁים», los negadores —saduceos y después caraítas— que leían «מִמָּחֳרַת הַשַּׁבָּת» como «el día después del sábado» y hacían caer Shavuot siempre en domingo. Y no discute a gritos: discute con gramática. Primero: la palabra «shabat» no significa solo el séptimo día, porque la Torá llama שַׁבָּתוֹן a Yom Kipur, a Yom Teruá, al primer día de Sucot y al octavo. Segundo: el mismo versículo dice «שֶׁבַע שַׁבָּתוֹת», que todo el mundo entiende como siete SEMANAS, no siete sábados. Tercero, y es una joya: en Melajim II 11:9 aparece «בָּאֵי הַשַּׁבָּת עִם יוֹצְאֵי הַשַּׁבָּת», y ahí la misma palabra significa dos cosas distintas dentro de un solo versículo — igual que en Shoftim 10:4, donde «עֲיָרִים» significa primero pollinos y después ciudades. Y en su comentario al versículo 15 deja caer una observación que vale por todo el capítulo: «de no ser por la tradición recibida, habría parecido que la cuenta de los días es como los años del Yovel». Es decir: el texto solo no basta. Esta fiesta, más que ninguna otra, existe porque alguien la transmitió.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבַּנְאֵל).",
        texto: `Abarbanel abre su comentario al capítulo de las fiestas con veintitrés preguntas, y la número diecisiete es exactamente la de este estudio: «¿por qué la Torá no dio razón para la fiesta de Shavuot, que es el tiempo de la entrega de nuestra Torá, como sí dio para Pésaj, para Sucot y para Yom Kipur las razones por las que Israel fue mandado sobre ellas?». Su respuesta es incómoda y hay que citarla entera: «y he aquí que la Torá no dio razón a esta fiesta de que fuera recuerdo del día de la entrega de la Torá, PORQUE LA FIESTA NO FUE INSTITUIDA PARA RECUERDO DE LA ENTREGA DE NUESTRA TORÁ, pues la Torá divina que está en nuestras manos y la profecía que está en nuestras manos son testigos de sí mismas, y no hace falta santificar un día para recordarla. Sino que la razón de la fiesta de Shavuot fue por ser el comienzo de la siega del trigo… y no hay duda de que en el día de la fiesta de Shavuot fue dada la Torá, pero la fiesta no fue ordenada sobre su recuerdo». Y todavía añade un argumento comparativo: tampoco Rosh Hashaná fue ordenado como recuerdo de la creación del mundo, aunque lo sea, sino por ser día de juicio. Ahora bien —y esto hay que decirlo para no falsear a Abarbanel—, él mismo escribe, unas líneas antes, que la cuenta del Ómer sí expresa el anhelo por ese día: «y por eso era la cuenta desde la fiesta de Pésaj hasta la fiesta de Shavuot, como diciendo: ¿cuándo vendrá el día de YHVH para hablar con nosotros?, porque el hombre, cuando anhela mucho una cosa y espera su llegada, cuenta los días hasta que llega». Las dos cosas a la vez: la fiesta se manda por el trigo, y la cuenta se hace por la Torá.`,
      },
      {
        etiqueta: "El Malbim (מַלְבִּ\"ם).",
        texto: `Y aquí está la voz que le da a este estudio su columna vertebral, y la da con precisión de relojero. La Torá tiene dos cuentas de cuarenta y nueve: la de los días (Vayikrá 23:15) y la de los años del Yovel (Vayikrá 25:8). Y el Malbim nota que están en números gramaticales distintos. «וּסְפַרְתֶּם לָכֶם» —contad vosotros, plural. «וְסָפַרְתָּ לְךָ שֶׁבַע שַׁבְּתֹת שָׁנִים» —contarás tú, singular. Y también «שִׁבְעָה שָׁבֻעֹת תִּסְפׇּר־לָךְ» de Devarim 16:9, singular. Su regla: «un lenguaje singular dicho sobre el conjunto de la asamblea se refiere al tribunal». De modo que las cuentas en singular —el Yovel, y la mención de Devarim— son trabajo del beit din. «Y lo que está escrito aquí, וּסְפַרְתֶּם לָכֶם, es que cuente cada uno y cada uno por sí mismo.» Léelo otra vez. La cuenta de los años se la encargan a la institución; la cuenta de los días no se la encargan a nadie más que a ti. El Yovel puede sonar aunque tú no sepas contar. Shavuot, no. Y el Malbim vuelve a la misma regla más adelante, al comentar el lulav: son las mitsvot dichas en plural las que caen sobre cada persona una por una.`,
      },
      {
        etiqueta: "El Talmud (מְנָחוֹת ס\"ה–ס\"ו · שַׁבָּת פ\"ו–פ\"ח).",
        texto: `Conviene ver cuánto se peleó por esto, porque la disputa no era académica: de ella dependía la fecha entera de la fiesta. Los boetusios sostenían que «עֲצֶרֶת אַחַר הַשַּׁבָּת», que Atséret cae siempre después del sábado — es decir, siempre en domingo, y por tanto en una fecha distinta cada año. Si tienen razón, el 6 de Siván no existe como día de la fiesta. La Mishná de Menajot 65a describe el contramedida ritual: la noche de la siega del Ómer, delante de todo el pueblo, el segador preguntaba en voz alta tres veces cada cosa —«¿se puso el sol?», «¿esta hoz?», «¿esta canasta?», «¿siego?»— y la multitud respondía tres veces «sí», y en shabat preguntaba además «¿este shabat?». La Guemará explica el porqué de tanto teatro: «מִפְּנֵי הַבַּיְיתּוֹסִים». Y trae la escena de Rabán Yojanán ben Zakai enfrentando a un anciano boetusio que le dijo que Moshé, por amor a Israel, había puesto la fiesta después del sábado para que disfrutaran dos días seguidos; a lo que Rabán Yojanán respondió: «necio, ¿y no será nuestra Torá completa como vuestra charla vana?». Los argumentos rabínicos que sí valen están en 65b: si la cuenta empieza el domingo, el intervalo entre las dos fiestas sería a veces de cincuenta y uno, cincuenta y dos, cincuenta y tres, cincuenta y cuatro, cincuenta y cinco o cincuenta y seis días — y la Torá dijo cincuenta. Y R. Yosei, en 66a, lo remata con una frase que da escalofrío: si «el sábado» significara el sábado semanal, «צֵא וּבְדוֹק אֵיזוֹ שַׁבָּת» — sal y averigua CUÁL sábado, porque todo el año está lleno de sábados. Sobre el día de la revelación misma, Shabat 86b registra la otra disputa: «en el sexto del mes fueron dados los Diez Mandamientos a Israel; Rabí Yosei dice: en el séptimo». Y allí mismo, aquel galileo que expuso ante Rav Jisdá: «bendito el Misericordioso que dio una Torá triple, a un pueblo triple, por medio de un tercero, en el tercer día, en el tercer mes».`,
      },
      {
        etiqueta: "El Rambam / Maimónides (הָרַמְבַּ\"ם).",
        texto: `El Rambam aporta dos cosas y las dos son decisivas. En el Mishné Torá (Temidín uMusafín 7:22) codifica: «es un mandamiento positivo contar siete semanas completas desde el día en que se trae el Ómer… y es mandamiento contar los días junto con las semanas… y se cuenta desde el comienzo del día; por eso se cuenta de noche, desde la noche del dieciséis de Nisán». Y en 7:24 pone la frase que Malbim había leído en la gramática: «מִצְוָה זוֹ עַל כָּל אִישׁ מִיִּשְׂרָאֵל וּבְכָל מָקוֹם וּבְכָל זְמַן» — este mandamiento recae sobre cada individuo de Israel, en todo lugar y en todo tiempo. Los comentaristas del Mishné Torá (el Radbaz) señalan el contraste exacto: a diferencia de la cuenta del Yovel, que se le confía al tribunal, ésta es responsabilidad personal de cada uno. En 7:23 añade un detalle que parece menor y no lo es: se cuenta DE PIE. Y en el Moré Nevujim III:43 el filósofo se permite algo que casi nunca se permite: una imagen. Dice que la fiesta de las Semanas es el aniversario de la revelación del Sinaí, y que para engrandecer ese día contamos los días transcurridos desde la fiesta anterior «igual que quien espera a su amigo más íntimo en un día determinado cuenta los días y hasta las horas». El hombre que escribió que a Dios no se le pueden atribuir emociones explicó la cuenta del Ómer con la impaciencia de un enamorado.`,
      },
      {
        etiqueta: "El Jizkuní (חִזְקוּנִי) — las dos cuentas de la Torá.",
        texto: `El Jizkuní hace explícito el paralelo que Ibn Ezra apenas insinuó, y vale la pena porque revela el diseño. Comentando nuestro versículo escribe: «así como nosotros contamos días y semanas, y después de la séptima semana santificamos el día cincuenta, así tenemos que hacer con la shemitá y el Yovel». Ve tú a Vayikrá 25:8-10 y compruébalo: «וְסָפַרְתָּ לְךָ שֶׁבַע שַׁבְּתֹת שָׁנִים, שֶׁבַע שָׁנִים שֶׁבַע פְּעָמִים… תֵּשַׁע וְאַרְבָּעִים שָׁנָה» — y contarás siete semanas de años, siete años siete veces… cuarenta y nueve años — «וְקִדַּשְׁתֶּם אֵת שְׁנַת הַחֲמִשִּׁים», y santificaréis el año cincuenta. Es la misma arquitectura, ampliada por trescientos sesenta y cinco: siete por siete, y el cincuenta se santifica. Uno se cuenta en días y le toca a cada persona; el otro se cuenta en años y le toca al tribunal. Uno termina en la Torá; el otro termina en la libertad de los esclavos. La Torá construyó la misma escalera dos veces, una para el alma y otra para la sociedad.`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `El Arizal responde la pregunta que nadie hace: ¿por qué cuarenta y nueve y no siete? En el Pri Etz Jaim (Sha'ar Sefirat HaÓmer, cap. 1) explica que en la primera noche de Pésaj entran de golpe todas las luces —los mojín— pero solo «לְצוֹרֶךְ שָׁעָה», por necesidad del momento, para que Israel pudiera ser redimido; y al día siguiente se retiran por completo. La cuenta del Ómer es el trabajo de volver a traerlas, pero esta vez ganadas: «e imposible es devolverlas si no es por medio del tiempo, y eso es desde Pésaj hasta Atséret». Después da la razón del cuadrado: hay siete grados que hay que construir y reparar antes de que sea posible la unión, «y siendo que cada una está incluida de las siete, como se sabe, por eso no basta con siete días sino con siete semanas, que son siete veces siete días». Ahí está el 49: no es siete repetido, es siete elevado. Cada rasgo del alma contiene a los otros seis, y hay que trabajar cada cruce, uno por día. La lista popular con la que se cuenta hoy —«jésed shebejésed», «guevurá shebejésed»— hay que decir de dónde viene con exactitud: aparece en los sidurim (el Koren de rito ashkenazí marca el día 1, 16 de Nisán, como חסד שבחסד) y la explica el Admur HaZakén en Torá Or; el Pri Etz Jaim que se conserva ordena las siete semanas con otros nombres. La estructura 7×7 es del Arizal; la nomenclatura corriente es de la práctica posterior. Y otra cuenta suya, que trae el mismo capítulo: diez Nombres אֶהְיֶה, de cuatro letras cada uno, dan cuarenta letras; sumados los diez Nombres mismos, cincuenta. «Y en cada día se repara el aspecto de una letra, y cuando se completa la reparación es la fiesta de Atséret.»`,
      },
    ],
    glosa: `Glosa para el lector: Ómer = medida de grano (un décimo de efá) y, por extensión, la gavilla de cebada que se ofrecía el 16 de Nisán; de ahí «contar el Ómer». Atséret = «detención, clausura»; es el nombre que los Sabios le dan a Shavuot, y en la Torá es el nombre del octavo día de Sucot. Boetusios (בַּיְיתּוֹסִים) = secta del período del Segundo Templo, emparentada con los saduceos, que rechazaba la interpretación rabínica. Minim / mejajshim = «negadores», el nombre que los comentaristas dan a quienes rechazan la tradición oral. Jol hamoed = los días intermedios de una fiesta larga, ni ordinarios ni plenamente festivos. Mojín = en el lenguaje del Arizal, las luces de conciencia que entran en una estructura espiritual. Tikún = reparación. Notarikón, gematría = lecturas por iniciales y por valor numérico de las letras. Beit din = tribunal rabínico. Radbaz = R. David ibn Zimra, comentarista clásico del Mishné Torá.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra los hechos son cinco y ninguno necesita interpretación. Primero: la Torá le pone fecha de mes a Pésaj, a Yom Teruá, a Yom Kipur y a Sucot, y no se la pone a Shavuot (Vayikrá 23, cotejado versículo por versículo). Segundo: en su lugar ordena una operación — contar cuarenta y nueve días desde la ofrenda de la cebada, y celebrar el cincuenta (23:15-16; Devarim 16:9-10). Tercero: esa operación se le encarga a cada persona por separado, no a una institución; así lo lee la baraita de Menajot 65b («שֶׁתְּהֵא סְפִירָה לְכׇל אֶחָד וְאֶחָד»), así lo distingue el Malbim por el número gramatical, y así lo codifica el Rambam («sobre cada individuo de Israel, en todo lugar y en todo tiempo»).`,
          `Cuarto: la Torá tampoco llama a este día «la fiesta de la entrega de la Torá». Lo llama Fiesta de las Semanas, Día de las Primicias y Fiesta de la Siega. El nombre litúrgico «זְמַן מַתַּן תּוֹרָתֵינוּ» es de los Sabios y está en el Shulján Aruj (Oraj Jaim 494:1), no en el Jumash — y el mismo Shulján Aruj, al abrir el capítulo, define la fiesta así: «el día cincuenta de la cuenta del Ómer es la fiesta de Shavuot». La halajá la fecha por la cuenta. Quinto: sobre cuál fue el día exacto de la revelación hay disputa registrada en Shabat 86b, seis o siete de Siván.`,
          `De esos cinco hechos se sigue el pshat de la fiesta. Shavuot no es un aniversario. Un aniversario está en el calendario y vuelve solo. Esto es otra cosa: un día que se produce contando, y que la ley encomienda a cada persona producir. La fecha del 6 de Siván no es el dato de partida sino el resultado de una suma que alguien tiene que hacer.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números y las letras)",
        parrafos: [
          `Primera alusión, y es la que ordena todo lo demás: la raíz de «contar» en hebreo es ס־פ־ר, y esa raíz hace cuatro palabras que parecen no tener nada que ver entre sí. סָפַר es contar. סֵפֶר es libro. סִפּוּר es relato. סַפִּיר es zafiro, la piedra que brilla. Cuatro cosas: llevar la cuenta, escribir, narrar y resplandecer. El Sefer Yetzirá lo dice desde su primera línea: «וּבָרָא אֶת עוֹלָמוֹ בִּשְׁלֹשָׁה סְפָרִים: בְּסֵפֶר וּסְפָר וְסִפּוּר» — y creó Su mundo con tres sefarim: con libro, con número y con relato (Sefer Yetzirá, versión del Gra, 1:1). Y el Zohar, comentando «הַשָּׁמַיִם מְסַפְּרִים כְּבוֹד אֵל» (Tehilim 19:2), no traduce «los cielos cuentan» sino «מְסַפְּרִים — מְנַהֲרִין כְּזוֹהֲרָא דְּסַפִּיר»: brillan como el resplandor del zafiro, de un extremo del mundo al otro. El Admur HaZakén cierra el círculo con una frase de tres palabras: «וְזֶהוּ וּסְפַרְתֶּם לְשׁוֹן הֶאָרָה וְאוֹר» — «y ese "contaréis" es lenguaje de iluminación y de luz» (Torá Or, Vayakhel 2:11). Contar el Ómer no es marcar días en una pared. En el idioma en que está escrito, contar es pulir hasta que brille.`,
          `Segunda alusión, y es la aritmética de la fiesta. Siete semanas de siete días: 7 × 7 = 49. Rashi lo dice con todas las letras al comentar Vayikrá 23:16 — «y no incluyendo ese día: son cuarenta y nueve días». Se cuentan cuarenta y nueve; el cincuenta no se cuenta, se recibe. Y esa asimetría tiene un eco exacto en una enseñanza del Talmud que casi da vértigo: «חֲמִשִּׁים שַׁעֲרֵי בִינָה נִבְרְאוּ בָּעוֹלָם, וְכוּלָּן נִיתְּנוּ לְמֹשֶׁה, חָסֵר אֶחָד» — cincuenta portales de entendimiento fueron creados en el mundo, y todos le fueron dados a Moshé menos uno, como está dicho «y lo hiciste faltar un poco de Elohim» (Rosh Hashaná 21b, sobre Tehilim 8:6). Cuarenta y nueve son alcanzables por trabajo; el número cincuenta no lo alcanzó ni Moshé. Y la letra que vale cincuenta es la {{letter:nun|nun}}. Fíjate en lo que dice la estructura del año: puedes trabajar cuarenta y nueve grados, uno por día, y el último te lo tienen que dar.`,
          `Tercera alusión, y la trae el propio Arizal en el mismo capítulo. Toma el Nombre אֶהְיֶה («Seré», Shemot 3:14), que tiene cuatro letras. Diez veces ese Nombre son cuarenta letras. Súmale los diez Nombres mismos: cincuenta. «Y ése es el secreto de los cincuenta días desde Pésaj hasta Atséret, y en cada día se repara el aspecto de una letra» (Pri Etz Jaim, Sha'ar Sefirat HaÓmer 1). El Nombre que Dios da cuando Moshé le pregunta cómo se llama —el Nombre que no es un sustantivo sino un verbo en futuro— resulta ser la materia de la cuenta. Cada día se repara una letra de un «Seré». Al día cincuenta, ese futuro llega.`,
          `Cuarta alusión, y ésta cierra la fiesta con el número de lo que se recibe en ella. תּוֹרָה = ת400 + ו6 + ר200 + ה5 = 611. No 613. La cuenta la hace el propio Talmud, y saca de ahí la conclusión: R. Simlai enseñó que fueron dichos a Moshé seiscientos trece mandamientos, y Rav Hamnuná preguntó cuál es el versículo, y respondió: «תּוֹרָה צִוָּה לָנוּ מֹשֶׁה מוֹרָשָׁה» — «una Torá nos ordenó Moshé, herencia» (Devarim 33:4); y «Torá», en gematría, «שִׁית מְאָה וְחַד סְרֵי הֲוֵי», seiscientos once es. Faltan dos. ¿Cuáles? «אָנֹכִי» y «לֹא יִהְיֶה לְךָ» — los dos primeros Mandamientos — «מִפִּי הַגְּבוּרָה שְׁמַעֲנוּם», de la boca de la Potencia los oímos nosotros mismos (Makot 23b-24a). Mira la simetría con la cuenta: cuarenta y nueve grados se ganan y uno se da; seiscientos once mandamientos se transmiten y dos se oyen directo. En las dos escalas, lo esencial no pasa por el intermediario. Pero solo llega a los que subieron los peldaños anteriores.`,
          `Quinta alusión, ésta como cuenta y nada más, con la operación a la vista y sin firmarla con el nombre de nadie. סִינַי = ס60 + י10 + נ50 + י10 = 130. סֻלָּם, «escalera», tal como está escrita en el sueño de Yaakov —«וְהִנֵּה סֻלָּם מֻצָּב אַרְצָה וְרֹאשׁוֹ מַגִּיעַ הַשָּׁמָיְמָה» (Bereshit 28:12, grafía defectiva, cotejada)— = ס60 + ל30 + ם40 = 130. Las dos cuentas cierran exactas. La lectura que suele hacerse con ellas —que el monte de la revelación y la escalera del sueño son la misma cosa— es tradicional, pero no encontré la fuente clásica alojada en Sefaria, así que aquí se ofrece como cuenta y no como cita. Lo que sí es del texto es la imagen: una escalera se sube peldaño por peldaño, y en el sueño de Yaakov hay ángeles subiendo antes que bajando. Cuarenta y nueve peldaños son eso.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          `Empieza por el pasaje más violento que el Talmud escribió sobre el Sinaí, porque sin él este día se vuelve postal. Sobre el versículo «וַיִּתְיַצְּבוּ בְּתַחְתִּית הָהָר», «y se pararon al pie del monte» —que literalmente dice «DEBAJO del monte»—, enseña Rav Avdimí bar Jama bar Jasa: «מְלַמֵּד שֶׁכָּפָה הַקָּדוֹשׁ בָּרוּךְ הוּא עֲלֵיהֶם אֶת הָהָר כְּגִיגִית, וְאָמַר לָהֶם: אִם אַתֶּם מְקַבְּלִים הַתּוֹרָה מוּטָב, וְאִם לָאו — שָׁם תְּהֵא קְבוּרַתְכֶם» — enseña que el Santo, bendito sea, sostuvo sobre ellos la montaña como un barril y les dijo: si aceptáis la Torá, bien; y si no, ahí será vuestra sepultura (Shabat 88a). Y entonces Rav Aja bar Yaakov saca la conclusión jurídica, y es demoledora: «מִכָּאן מוֹדָעָא רַבָּה לְאוֹרָיְיתָא» — de aquí hay una gran impugnación contra la Torá. En derecho judío, un contrato firmado bajo coacción es nulo. El Talmud acaba de decir que el Sinaí, técnicamente, era anulable. La misma tradición que celebra la fiesta guarda la objeción.`,
          `Y no la deja sin respuesta, pero la respuesta llega mil años tarde. «אָמַר רָבָא: אַף עַל פִּי כֵן הֲדוּר קַבְּלוּהָ בִּימֵי אֲחַשְׁוֵרוֹשׁ» — dijo Rava: aun así, VOLVIERON A ACEPTARLA en los días de Ajashverosh, como está escrito «קִיְּמוּ וְקִבְּלוּ הַיְּהוּדִים» (Ester 9:27) — «cumplieron lo que ya habían aceptado». Piensa dónde puso Rava la validez del Sinaí. No en el trueno, no en el fuego, no en las tablas: en un pueblo disperso por ciento veintisiete provincias, sin Templo, sin profeta, sin voz del cielo, sin ninguna montaña encima — que en ese estado eligió quedarse. Lo que se recibió por miedo se aceptó por voluntad. Por eso este estudio se atreve a decir algo que suena raro: Shavuot no se completa en Shavuot. Se completa en Purim. Y lo mismo dice la estructura de la fiesta: si el día no viene solo, si hay que traerlo contando, entonces cada año se te vuelve a preguntar si lo quieres.`,
          `Ahora la inversión que hace de este día lo que es. En Shemot 24:7 el pueblo responde «נַעֲשֶׂה וְנִשְׁמָע» — haremos y escucharemos. En ese orden. Primero hacer, después entender. Es tan contrario al sentido común que el Talmud registra a un escéptico burlándose de ello: un min vio a Rava tan absorto en el estudio que se estaba aplastando los dedos hasta hacerlos sangrar sin notarlo, y le dijo: «עַמָּא פְּזִיזָא, דְּקַדְּמִיתוּ פּוּמַּיְיכוּ לְאוּדְנַיְיכוּ» — pueblo precipitado, que pusisteis vuestra boca delante de vuestros oídos; primero teníais que haber escuchado, y si podíais, aceptar, y si no, no aceptar. La acusación es exacta y es razonable. Y la respuesta de Rava fue una sola palabra: «אֲנַן דְּסָגֵינַן בִּשְׁלִימוּתָא» — nosotros, que caminamos en integridad; de nosotros está escrito «תֻּמַּת יְשָׁרִים תַּנְחֵם», la integridad de los rectos los guía (Mishlé 11:3). No dijo «no fue precipitación». Dijo: eso que tú llamas atolondramiento, nosotros lo llamamos entereza. La Guemará añade la escena del cielo: cuando Israel antepuso el «haremos» al «escucharemos», bajaron seiscientos mil ángeles y ataron a cada uno dos coronas, una por cada palabra; y salió una voz que dijo «מִי גִּלָּה לְבָנַי רָז זֶה שֶׁמַּלְאֲכֵי הַשָּׁרֵת מִשְׁתַּמְּשִׁין בּוֹ» — ¿quién le reveló a Mis hijos este secreto que usan los ángeles del servicio?`,
          `Aquí entra la voz jasídica y hace lo que hace siempre: te devuelve el asunto a las manos. El Baal Shem Tov no dio una teoría sobre Shavuot; dio una instrucción práctica, y está registrada: después del Tikún de la noche, dice, hay que cuidarse muchísimo de no cortar con una sola conversación vana hasta después del Kéter del Musaf, «כִּי אָז עוֹלִין כָּל קִישּׁוּטֵי הַכַּלָּה שֶׁעָשָׂה בַּלַּיְלָה» — porque entonces suben todos los adornos de la novia que hizo en la noche (Baal Shem Tov al haTorá, Shavuot 2). Esos adornos vienen del Zohar, y conviene saber de dónde: Rabí Shimón estaba sentado estudiando Torá «la noche en que la novia se une a su esposo», y enseñó que quienes son de la casa de la novia deben pasar esa noche entera con ella y alegrarse en sus adornos, «estudiando desde la Torá a los Profetas, y de los Profetas a los Escritos, y en los midrashim de los versículos y en los secretos de la sabiduría; porque ésos son sus adornos y sus joyas» (Zohar, Hakdamá 8a). Ahí nació la costumbre de pasar la noche de Shavuot despierto estudiando. Y fíjate qué clase de costumbre es: la última noche de la cuenta también hay que hacerla. No basta con haber llegado al día cincuenta; hay que quedarse despierto en él.`,
          `Y ahora la pregunta que la costumbre plantea y casi nadie hace: ¿por qué, en el día en que se conmemora la entrega de la Torá, se lee un libro en el que no hay una sola ley? El midrash se adelanta a la objeción sin disimularla. «אָמַר רַבִּי זְעֵירָא: מְגִלָּה זוֹ אֵין בָּהּ לֹא טֻמְאָה וְלֹא טָהֳרָה וְלֹא אִסּוּר וְלֹא הֶתֵּר, וְלָמָּה נִכְתְּבָה? לְלַמֶּדְךָ כַּמָּה שָׂכָר טוֹב לְגוֹמְלֵי חֲסָדִים» — dijo Rabí Ze'era: este rollo no tiene en él ni impureza ni pureza, ni prohibido ni permitido; ¿y por qué fue escrito? Para enseñarte cuánta buena recompensa hay para los que hacen bondad (Rut Rabá 2:14). En el aniversario de los seiscientos trece mandamientos se lee el único libro sin mandamientos. Y no es una ironía: es la respuesta a la pregunta de qué se recibió realmente en el Sinaí.`,
          `Mira dónde la escondió la Torá misma. En Vayikrá 23, en pleno capítulo de las fiestas, justo después de Shavuot y antes de Rosh Hashaná, aparece de golpe una ley que no es de fiestas: «וּבְקֻצְרְכֶם אֶת־קְצִיר אַרְצְכֶם לֹא־תְכַלֶּה פְּאַת שָׂדְךָ… לֶעָנִי וְלַגֵּר תַּעֲזֹב אֹתָם» — y cuando seguéis la siega de vuestra tierra, no acabes con la esquina de tu campo… para el pobre y para el extranjero los dejarás (23:22). Rashi pregunta lo obvio: «¿qué vio la Escritura para ponerla EN MEDIO de las festividades — Pésaj y Atséret de un lado, y Rosh Hashaná, Yom Kipur y la Fiesta del otro?». Y responde con el Sifrá: «para enseñarte que todo el que da al pobre la espiga caída, la olvidada y la esquina del campo como es debido, se le cuenta como si hubiera construido el Templo y ofrecido en él sus ofrendas». Ahora junta las piezas. La Torá metió la ley del pobre y del extranjero dentro del calendario de las fiestas, exactamente donde termina la cuenta del Ómer. Y el libro que se lee ese día cuenta la historia de una extranjera pobre que espiga en las esquinas de un campo. La lectura no se escogió por sentimentalismo: la Torá dejó la señal en el propio capítulo.`,
          `Y hay algo más, y es lo que convierte a Rut en la figura exacta de esta fiesta. Al pie del Sinaí, seiscientos mil dijeron «נַעֲשֶׂה וְנִשְׁמָע» a la vez, en masa, con una montaña encima — y Rav Aja bar Yaakov advirtió que un compromiso así es impugnable. En un camino polvoriento de Moav, una mujer sola, sin montaña, sin trueno, sin nación alrededor, sin nada que ganar y a la que su suegra le estaba pidiendo por favor que se volviera, dijo: «עַמֵּךְ עַמִּי וֵאלֹהַיִךְ אֱלֹהָי» — tu pueblo es mi pueblo, y tu Dios mi Dios (Rut 1:16). Ése es un «haremos y escucharemos» dicho por una persona, en voz baja, sin coacción posible. Es exactamente lo que Rava fue a buscar a los días de Ajashverosh, y ocurrió siglos antes en boca de una moabita. Y el libro termina donde nadie lo esperaría: «וַתִּקְרֶאנָה שְׁמוֹ עוֹבֵד, הוּא אֲבִי־יִשַׁי אֲבִי דָוִד» (4:17). De la aceptación libre de una extranjera sale el {{study:linaje|linaje}} de David — y de ahí, la esperanza entera. La fiesta que hay que contar para que exista lee, cada año, la historia de la única persona que aceptó sin que nadie la contara.`,
          `Y el remate jasídico está en un Rashi de tres palabras. Sobre «בַּיּוֹם הַזֶּה בָּאוּ מִדְבַּר סִינָי» (Shemot 19:1) Rashi pregunta por qué el texto dice «en ESTE día» en lugar de «en aquel día», y responde: «שֶׁיִּהְיוּ דִּבְרֵי תוֹרָה חֲדָשִׁים עָלֶיךָ כְּאִלּוּ הַיּוֹם נְתָנָם» — que las palabras de Torá sean nuevas para ti como si HOY las hubiera dado. Y la Mishná lo convierte en un hecho permanente: «בְּכָל יוֹם וָיוֹם בַּת קוֹל יוֹצֵאת מֵהַר חוֹרֵב» — cada día, todos los días, una voz sale del monte Jorev (Avot 6:2). La voz no dejó de sonar; dejamos de contar. Ése es el trabajo de las siete semanas: no llegar a una fecha, sino volverse capaz de oír lo que ya se está diciendo.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de esta fiesta es una regla de la estructura de la realidad y no un dato de calendario: una luz que no tiene vaso no se recibe, se pierde. El Arizal lo dice en términos técnicos y hay que oírlo literal: en la primera noche de Pésaj entraron todas las luces de golpe, «לְצוֹרֶךְ שָׁעָה», por necesidad de la hora, para que Israel pudiera ser redimido — y al día siguiente se retiraron enteras. La salida de Egipto fue un regalo puro: nadie la mereció, nadie la construyó, sucedió. Pero un regalo que entra en un recipiente que no existe se derrama. Por eso hacen falta cuarenta y nueve días: «e imposible es devolverlas si no es por medio del tiempo». No es que Dios se haya ido; es que hay que fabricar dónde ponerlo.`,
          `Y la forma de ese vaso es un cuadrado, no una línea. Son siete rasgos, y cada uno contiene a los otros seis, «וְאָמְנָם לִהְיוֹת כָּל אַחַת כְּלוּלָה מִכָּל הַז'… לָכֵן אֵינוֹ מַסְפִּיק בְּז' יָמִים רַק בְּז' שָׁבוּעוֹת, שֶׁהֵם ז' פְּעָמִים ז' יָמִים» (Pri Etz Jaim, Sha'ar Sefirat HaÓmer 1). Traduce eso a la vida y deja de ser abstracto. Mi bondad tiene un lado severo y un lado bello y un lado tenaz; mi severidad tiene su propia bondad escondida y su propia belleza. Nadie se arregla en siete pasos porque nadie tiene siete partes: tiene siete por siete cruces, y cada cruce hay que mirarlo una vez. Cuarenta y nueve días es exactamente el tiempo de mirar cada rincón de uno mismo una sola vez. La cuenta no es un adorno del período: es su método.`,
          `Aquí entra Rav Yehuda Ashlag, el Baal HaSulam, y le pone al asunto un nombre que no se puede esquivar. En su tratado sobre la entrega de la Torá enseña que la Torá no se entregó a un pueblo: se le entregó a una condición. «לֹא נִיתְּנָה לָהֶם הַתּוֹרָה בְּטֶרֶם שֶׁנִּשְׁאַל כָּל אֶחָד וְאֶחָד מִיִּשְׂרָאֵל אִם מַסְכִּים הוּא לְקַבֵּל עָלָיו אֶת הַמִּצְוָה שֶׁל אַהֲבַת זוּלָתוֹ» — no les fue dada la Torá antes de que se le preguntara a cada uno y a cada uno de Israel si acepta sobre sí el mandamiento de amar al otro, en la medida de «amarás a tu prójimo como a ti mismo». Y solo después: «וְאַחַר שֶׁכָּל הָאֻמָּה הִסְכִּימוּ פֶּה אֶחָד וְאָמְרוּ נַעֲשֶׂה וְנִשְׁמָע, הֲרֵי שֶׁכָּל אֶחָד מִיִּשְׂרָאֵל נַעֲשָׂה עָרֵב» — después de que toda la nación acordó a una voz y dijo «haremos y escucharemos», cada uno de Israel se hizo garante. Ahora vuelve a Rashi sobre «וַיִּחַן־שָׁם יִשְׂרָאֵל», acampó en singular, «como un solo hombre con un solo corazón». No era poesía: era el vaso. El único recipiente capaz de sostener esa luz era un pueblo entero convertido en una sola persona.`,
          `Y ahora mira la paradoja que sostiene toda la fiesta, porque es su secreto último. El vaso es colectivo —la Torá no baja sobre individuos, baja sobre un «como un solo hombre»—, pero la cuenta que lo construye es estrictamente individual: «שֶׁתְּהֵא סְפִירָה לְכׇל אֶחָד וְאֶחָד», que la cuenta sea de cada uno y cada uno (Menajot 65b); «cada uno cuente por sí mismo», dice el Malbim; «sobre cada individuo, en todo lugar y en todo tiempo», codifica el Rambam. Nadie puede contar por ti, y sin embargo lo que se construye contando no es tuyo. Ésa es la diferencia entre el Ómer y el Yovel: la cuenta de los años se la puedes delegar al tribunal, y por eso el Yovel llega solo. La de los días no. Cuarenta y nueve actos privados, en cuarenta y nueve noches, hechos por gente que no se conoce entre sí, y de todos ellos sale un solo día que existe para todos. Si mañana nadie contara, la fecha seguiría en el calendario impreso — pero la fiesta que la Torá describe no ocurriría, porque la Torá no la fechó: la encargó.`,
        ],
      },
    ],
    caja: {
      titulo:
        "7 × 7 = 49. El cincuenta no se cuenta: se recibe. Y contar, en hebreo, es hacer brillar.",
      cuerpo:
        "La Torá le puso fecha a Pésaj, a Yom Teruá, a Yom Kipur y a Sucot. A Shavuot le puso una operación: «וּסְפַרְתֶּם לָכֶם», contad para vosotros. Cuarenta y nueve días de trabajo —cada uno de los siete rasgos incluido en los siete, según el Arizal— y un día cincuenta que nadie gana, como el portal de entendimiento que ni Moshé recibió (Rosh Hashaná 21b). Y el verbo lo dice todo: de la raíz ס־פ־ר salen contar, libro, relato y zafiro. «וּסְפַרְתֶּם, לְשׁוֹן הֶאָרָה וְאוֹר» — contaréis: lenguaje de iluminación y de luz.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que hay dos clases de días en mi vida y los estaba confundiendo. Unos llegan solos: el cumpleaños, el aniversario, el primero de año. Vienen aunque yo esté distraído, dormido o de mal humor, y no me piden nada. Y hay otros que no existen si nadie los trae. La Torá me enseñó la diferencia poniéndole fecha a cuatro fiestas y a la quinta no. Shavuot me dice que la revelación —la que sea, la del Sinaí o la de una tarde cualquiera— pertenece a la segunda clase. Y que el precio de esa clase de día no es un gesto grande: son cuarenta y nueve gestos pequeños, seguidos, casi todos aburridos. Y me lo confirma la lectura del día: en el aniversario de los seiscientos trece mandamientos se lee el único libro que no trae ninguno, y lo que hay dentro es una mujer que espiga en la esquina de un campo ajeno, día tras día, sin que nadie la vea.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón del cuadrado. No es siete: es siete por siete, porque cada parte de mí está hecha de todas las otras, y por eso ningún cambio verdadero se resuelve en una semana. Veo el patrón del último peldaño: cuarenta y nueve se suben y el cincuenta se recibe — y ni Moshé recibió el que faltaba. Se trabaja hasta el borde de lo alcanzable, y lo que hay más allá es regalo, pero solo se lo regalan a quien llegó al borde. Y veo el patrón de la responsabilidad repartida: la cuenta de los años se la puedo dejar al tribunal, la de los días no se la puedo dejar a nadie. Hay cosas en mi vida que están correctamente delegadas y hay una que no admite delegación, y llevo tiempo tratándolas igual.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Me da una palabra para lo que me pasa cuando algo grande me sucede y no me dura. Salí de mi Egipto —el que sea— y la luz entró de golpe, sin que yo hiciera nada, y a los dos días ya no estaba. No fue mentira: fue un regalo sin recipiente. El alma necesita tiempo, y no tiempo cualquiera: tiempo contado, un día a la vez, mirando un rincón por noche. Y hay una imagen que me desarma: la respuesta de Rava al que llamó a este pueblo «precipitado» por hacer antes de entender. No negó la acusación; le cambió el nombre. Lo que desde afuera parece atolondramiento, desde adentro se llama entereza — «תֻּמַּת יְשָׁרִים», y es la misma raíz de las semanas «completas» que hay que contar.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Que la raíz de contar sea también la de libro, relato y zafiro me dice algo del diseño entero: el mundo fue hecho «con tres sefarim», y llevar la cuenta, escribir, narrar y brillar son cuatro caras de un mismo acto. Contar los días no es medir el tiempo desde afuera; es participar en cómo el mundo se dice a sí mismo. Y la escalera se repite a escala grande: cuarenta y nueve días para un alma, cuarenta y nueve años para una sociedad entera, y al cincuenta se sueltan los esclavos y se devuelven las tierras. La misma arquitectura, dos veces. Lo que yo hago con siete semanas, la creación lo hace con siete generaciones de años.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, elige UNA sola cosa y ponle un número de días. Escríbelo, y esta noche di en voz alta: «hoy es el día uno».",
    texto: `Este estudio tiene una sola aplicación y es tan simple que da vergüenza: aprender a contar. No a proponerte algo — a contarlo. La diferencia entre las dos cosas es exactamente la diferencia entre una fiesta con fecha y una fiesta sin fecha.

Hazlo así, hoy mismo. Primero, elige UNA cosa. Una sola, y que sea pequeña de verdad: diez minutos de estudio, una llamada al día a alguien que está solo, no levantar la voz en casa, guardar algo cada día por poco que sea. No elijas la más importante; elige la que puedas sostener siete semanas. Segundo, ponle un número y una fecha final. Cuarenta y nueve días si te animas, o siete si estás empezando — pero un número cerrado, con última noche marcada en el calendario. Un propósito sin número es un deseo; con número es una cuenta. Tercero, y esto es lo que casi nadie hace: dilo en voz alta cada noche. «Hoy es el día uno.» «Hoy es el día dos.» El Rambam no dijo que basta con acordarse: dijo que se cuenta, con bendición, y de pie (Temidín uMusafín 7:22-25). Que la boca lo diga es lo que convierte un pensamiento en un acto.

Y cuando se te olvide un día —se te va a olvidar—, no lo uses de excusa para abandonar la cuenta: retómala al día siguiente. Y aquí va lo más difícil y lo más liberador: no esperes que el día cincuenta te lo dé el esfuerzo. Cuarenta y nueve son tuyos; el cincuenta no lo es. Trabaja como si dependiera de ti hasta el peldaño cuarenta y nueve, y llega al último sin exigirle nada — porque el portal que faltaba tampoco se lo dieron a Moshé, y sin embargo llegó hasta el borde. La única forma de recibir algo que no se gana es haber hecho todo lo que sí se gana.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Shavuot es la única fiesta del calendario a la que la Torá no le pone fecha. A Pésaj, a Yom Teruá, a Yom Kipur y a Sucot les da día y mes (Vayikrá 23:5-6, 23:24, 23:27, 23:34); a ésta le da una operación: «וּסְפַרְתֶּם לָכֶם… תִּסְפְּרוּ חֲמִשִּׁים יוֹם» (23:15-16). Ni siquiera tiene discurso propio: cuelga del discurso del Ómer, como señala Abarbanel. El 6 de Siván no es un dato de la Torá: es el resultado de una suma que alguien tiene que hacer.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `La cuenta no se le encomienda a una institución sino a cada persona. El Malbim lo prueba por el número gramatical: «תִּסְפָּר לָךְ» en singular es el tribunal —así se cuenta el Yovel (Vayikrá 25:8)—, pero «וּסְפַרְתֶּם לָכֶם» en plural significa «que cuente cada uno y cada uno por sí mismo» (Emor 163, siguiendo Menajot 65b). El Rambam lo codifica: «este mandamiento recae sobre cada individuo de Israel, en todo lugar y en todo tiempo» (Temidín uMusafín 7:24). El Yovel llega solo; Shavuot hay que traerla.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `La luz de Pésaj entró de golpe y sin mérito, y se retiró al día siguiente porque no había vaso (Arizal, Pri Etz Jaim, Sha'ar Sefirat HaÓmer 1). Los cuarenta y nueve días son la fabricación del recipiente: siete rasgos, cada uno incluido en los siete, «por eso no basta con siete días sino con siete semanas». Y el cincuenta no se cuenta — como el portal de entendimiento que le faltó a Moshé (Rosh Hashaná 21b). Se trabaja hasta el borde; lo de más allá es don. Y la raíz de todo esto, ס־פ־ר, hace también libro, relato y zafiro: «וּסְפַרְתֶּם, לְשׁוֹן הֶאָרָה וְאוֹר» (Torá Or, Vayakhel 2:11).`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Elegir hoy UNA sola cosa sostenible, ponerle un número cerrado de días con última noche marcada, y decirla en voz alta cada noche: «hoy es el día uno». El Rambam manda contar con la boca, con bendición y de pie (Temidín uMusafín 7:22-25); no basta con acordarse. Y llegar al último día sin exigirle nada al último día.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal, marcada como tal. Los datos son verificados; la conexión entre ellos es nuestra.",
    parrafos: [
      `Primer dato, y es solo un dato. La palabra «סִיוָן», el nombre del mes en que se dio la Torá, aparece UNA sola vez en todo el Tanaj. No está en la Torá, no está en los Profetas, no está en los Salmos. Está en Ester 8:9: «וַיִּקָּרְאוּ סֹפְרֵי הַמֶּלֶךְ בָּעֵת הַהִיא בַּחֹדֶשׁ הַשְּׁלִישִׁי הוּא חֹדֶשׁ סִיוָן בִּשְׁלוֹשָׁה וְעֶשְׂרִים בּוֹ» — y fueron llamados los escribas del rey en aquel tiempo, en el tercer mes, que es el mes de Siván, a los veintitrés de él. La única vez que la Escritura pronuncia el nombre de este mes es en la Meguilá de Purim, y la fecha que da es el veintitrés, no el seis.`,
      `Segundo dato, verificado aparte y en otro libro: es en ese mismo rollo donde Rava encuentra la aceptación libre de la Torá — «הֲדוּר קַבְּלוּהָ בִּימֵי אֲחַשְׁוֵרוֹשׁ», de «קִיְּמוּ וְקִבְּלוּ הַיְּהוּדִים» (Ester 9:27, en Shabat 88a). Nadie está obligado a leer los dos datos juntos. Pero léelos así y encaja demasiado bien: el único lugar del Tanaj donde se escribe el mes del Sinaí es el libro donde el Sinaí se termina de aceptar. Y en ese versículo, lo que se convoca son «סֹפְרֵי הַמֶּלֶךְ», los escribas del rey, para escribir en cada provincia y en su lengua. La palabra que se da bajo una montaña se sella cuando se escribe voluntariamente, en el exilio, en el idioma de cada uno.`,
      `Y una última observación, que es de lengua y no de doctrina. La Torá pide que las siete semanas sean «תְּמִימֹת», completas, de la raíz ת־מ־ם. Cuando el escéptico acusa a Israel de ser un «pueblo precipitado» por haber dicho «haremos» antes que «escucharemos», Rava responde con un versículo que trae exactamente esa raíz: «תֻּמַּת יְשָׁרִים תַּנְחֵם», la integridad de los rectos los guía (Mishlé 11:3, en Shabat 88a-b). Ninguna fuente que yo haya cotejado une esos dos usos; la raíz compartida es un hecho del hebreo, y la lectura es nuestra. Pero dice bien lo que hace la cuenta: cuarenta y nueve días completos son la prueba de que aquel «haremos» no fue un arrebato. Lo que se dice en un momento de fuego se demuestra con siete semanas de nada.`,
    ],
  },

  hemshej: [
    "{{study:elul|Elul es la otra cuenta con plazo: cuarenta días en que YO doy el primer paso. ¿Por qué el año tiene dos cuentas, una que termina en la Torá y otra que termina en el perdón?}}",
    "{{letter:nun|La letra que vale cincuenta es la nun — y el portal número cincuenta no lo recibió ni Moshé. ¿Qué guarda la letra del último peldaño?}}",
    "{{study:despertar-de-lo-alto|Pésaj fue don puro: Él empezó y nos sacó sin que lo mereciéramos. Shavuot es lo contrario. La otra mitad del asunto: el despertar desde Arriba.}}",
    "{{study:linaje|Rut la moabita llega a Bet Léjem «al comienzo de la siega de la cebada» y espiga hasta que termina la del trigo: el Ómer entero, narrado. De ella sale Oved, padre de Yishai, padre de David.}}",
  ],

  ctaRef: "Leviticus 23:15",
};
