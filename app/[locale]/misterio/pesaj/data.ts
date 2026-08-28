
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — פֶּסַח · דּוֹדִי לִי וַאֲנִי לוֹ
//  Serie «Tiempos Sagrados» (moadim) · Estudio 9 — Pésaj.
//  Es el ESPEJO exacto del Estudio 1 (Elul): allí el primer paso es del hombre;
//  aquí el primer paso es de Dios, y llega antes de que haya mérito que lo
//  justifique. Ángulo: el despertar desde ARRIBA en clave de Pésaj — la prisa,
//  el mérito ausente, y el calendario como primera mitzvá.
//
//  Hero en modo "par": אֱמוּנָה = בָּנִים = 102. NO es un cálculo propio: es una
//  gematría explícita de Rabí Najman de Breslov (verificada, ver abajo).
//
//  FUENTES VERIFICADAS CONTRA SEFARIA (api/texts, hebreo de la API, 2026-08-27):
//   · Shemot 12:1-2 — "הַחֹדֶשׁ הַזֶּה לָכֶם רֹאשׁ חֳדָשִׁים" — cotejado.
//   · Shemot 12:11 — "וַאֲכַלְתֶּם אֹתוֹ בְּחִפָּזוֹן" — cotejado.
//   · Shemot 12:39 — "כִּי לֹא חָמֵץ… וְלֹא יָכְלוּ לְהִתְמַהְמֵהַּ" — cotejado.
//   · Shemot 13:8 y 13:14 — "וְהִגַּדְתָּ לְבִנְךָ" y "בְּחֹזֶק יָד" — cotejados.
//   · Shemot 6:6-7 — las cuatro expresiones (והוצאתי/והצלתי/וגאלתי/ולקחתי) — cotejado.
//   · Devarim 16:3 — "לֶחֶם עֹנִי… כִּי בְחִפָּזוֹן יָצָאתָ" — cotejado.
//   · Vaikrá 23:15-16 — la cuenta del Omer, "שֶׁבַע שַׁבָּתוֹת תְּמִימֹת" — cotejado.
//   · Yejezkel 16:6-7 — "וְאַתְּ עֵרֹם וְעֶרְיָה" / "בְּדָמַיִךְ חֲיִי" (×2) — cotejado.
//     IMPORTANTE: NO es la haftará de Pésaj (la del primer día es de Yehoshúa).
//     Se usa porque la HAGADÁ misma lo cita literalmente en el Maguid: verificado
//     en "Pesach Haggadah, Magid, First Fruits Declaration" (trae 16:7 y luego
//     16:6 completo, con el "בדמיך חיי" repetido). Y porque el Arizal comenta
//     justamente esa inserción (ver abajo). Así se dice en el cuerpo.
//   · Mishná Pesajim 10:5 — "לִרְאוֹת אֶת עַצְמוֹ" — cotejado.
//   · Pesajim 116b — misma lectura "לִרְאוֹת" — cotejado.
//   · Rambam, Hiljot Jametz uMatzá 7:6 — "חַיָּב אָדָם לְהַרְאוֹת אֶת עַצְמוֹ" —
//     cotejado. La variante לְהַרְאוֹת es real y está en el texto de Sefaria; el
//     propio aparato de notas de Sefaria señala la discrepancia con Pesajim 116b.
//   · Pesajim 115b — Shmuel: "לֶחֶם עוֹנִי — לֶחֶם שֶׁעוֹנִין עָלָיו דְּבָרִים",
//     la baraita "דְּבָרִים הַרְבֵּה", y "עֹנִי כְּתִיב, מָה עָנִי שֶׁדַּרְכּוֹ
//     בִּפְרוּסָה" — cotejado.
//   · Pesajim 36a — R' Akiva vs R' Yosei HaGlilí: "מִי כְּתִיב לֶחֶם עוֹנִי? עָנִי
//     כְּתִיב" / "מִי קָרֵינַן עָנִי? עוֹנִי קָרֵינַן" — cotejado. De aquí sale que
//     el ketiv es עני (130) y el keri עוני (136); ambas grafías son del texto.
//   · Berajot 9a — la majloket sobre "בְּחִפָּזוֹן": R' Elazar ben Azariá (hasta
//     medianoche) vs R' Akiva ("עַד שְׁעַת חִפָּזוֹן") — cotejado. Malbim a Devarim
//     16:3 [קעד] resume que la discusión es si el jipazón es DE MITZRÁIM o DE
//     ISRAEL — cotejado en Malbim.
//   · Hagadá de Pésaj (Sefaria, "Pesach Haggadah"): "הָא לַחְמָא עַנְיָא",
//     "עֲבָדִים הָיִינוּ… בְּיָד חֲזָקָה", los cuatro hijos (con Shemot 13:14 como
//     respuesta al תָּם y 13:8 al que no sabe preguntar), y "דַּיֵּנוּ" —
//     todos cotejados en sus secciones.
//   · Bereshit Rabá 88:5 — las cuatro copas: Rav Huna en nombre de R' Benayá,
//     "כְּנֶגֶד אַרְבַּע גְּאֻלּוֹת"; y R' Leví, "כְּנֶגֶד אַרְבַּע מַלְכֻיּוֹת" —
//     cotejado. La MISMA página trae otras tres opiniones (las copas del Faraón,
//     las copas de furor, etc.): se dice en el cuerpo que son opiniones, no una.
//   · Yerushalmi Pesajim 10:1 — misma lista (R' Yojanán en nombre de R' Benayá =
//     cuatro redenciones; R' Leví = cuatro reinos) — cotejado. Y R' Leví: "לְפִי
//     שֶׁדֶּרֶךְ עֲבָדִים לִהְיוֹת אוֹכְלִין מְעוּמָד וְכָאן… מְסוּבִּין,
//     לְהוֹדִיעַ שֶׁיָּצְאוּ מֵעַבְדוּת לַחֵירוּת" — cotejado.
//   · Rashi a Shemot 12:6 — LA PIEZA CENTRAL. Cita a R' Matiá ben Jarash
//     (Mejiltá): "הִגִּיעָה שְׁבוּעָה שֶׁנִּשְׁבַּעְתִּי לְאַבְרָהָם שֶׁאֶגְאַל אֶת
//     בָּנָיו, וְלֹא הָיוּ בְיָדָם מִצְווֹת לְהִתְעַסֵּק בָּהֶם כְּדֵי שֶׁיִּגָּאֲלוּ,
//     שֶׁנֶּאֱמַר 'וְאַתְּ עֵרוֹם וְעֶרְיָה'", y por eso les dio dos mitzvot: dam
//     pésaj y dam milá. Y la segunda razón: "לְפִי שֶׁהָיוּ שְׁטוּפִין בֶּאֱלִילִים…
//     מִשְׁכוּ יְדֵיכֶם מֵאֱלִילִים" — cotejado TEXTUALMENTE.
//   · Rashi a Shemot 12:11 ("בְּחִפָּזוֹן — לְשׁוֹן בֶּהָלָה וּמְהִירוּת") y a
//     12:39 ("מַגִּיד שִׁבְחָן שֶׁל יִשְׂרָאֵל… הֶאֱמִינוּ וְהָלְכוּ") — cotejados.
//   · Rashi a Devarim 16:3 — "וְחִפָּזוֹן לֹא שֶׁלְּךָ הָיָה אֶלָּא שֶׁל מִצְרַיִם"
//     (Sifrei) — cotejado textualmente.
//   · Ramban a Shemot 12:2 — "זוֹ מִצְוָה רִאשׁוֹנָה שֶׁצִּוָּה הקב\"ה אֶת יִשְׂרָאֵל";
//     el conteo de los meses como memorial permanente ("כְּדֵי שֶׁיִּהְיֶה זֶה
//     זִכָּרוֹן בַּנֵּס הַגָּדוֹל"); y "שְׁמוֹת חֳדָשִׁים עָלוּ עִמָּנוּ מִבָּבֶל" —
//     cotejado.
//   · Ibn Ezra a Shemot 12:2 — la excursión astronómica: el "mes" pertenece a la
//     luna (חִדּוּשׁ) y el "año" al sol — cotejado. Ibn Ezra a Shemot 12:39: "הַבָּצֵק
//     שֶׁהוֹצִיאוּ מִמִּצְרַיִם הָיָה בּוֹ שְׂאוֹר" — cotejado.
//   · Ibn Ezra a Shemot 14:13 — "זֶה הַדּוֹר הַיּוֹצֵא מִמִּצְרַיִם לָמַד מִנְּעוּרָיו
//     לִסְבֹּל עֹל מִצְרַיִם וְנַפְשׁוֹ שְׁפָלָה… סִבֵּב שֶׁמֵּתוּ כָּל הָעָם הַיּוֹצֵא
//     מִמִּצְרַיִם… עַד שֶׁקָּם דּוֹר אַחֵר… וְהָיְתָה לָהֶם נֶפֶשׁ גְּבוֹהָה" —
//     cotejado textualmente.
//   · Abarbanel a la Torá, Shemot 12:1 — la Segunda Pregunta: "שֶׁלֹּא יִתָּכֵן
//     לָתֵת הַתְחָלָה וְרֵאשִׁית בַּשָּׁנָה כְּלָל לְפִי שֶׁהַזְּמַן מִתְדַּמֶּה מִכָּל
//     צַד"; el día y el mes tienen comienzo natural, el año no. Y su respuesta:
//     "עֶצֶם הַמִּצְוָה הַזֹּאת… שֶׁלְּזִכְרוֹן גְּאֻלָּתָם… יִמְנוּ הֶחֳדָשִׁים
//     מִמֶּנּוּ" — cotejado. (Su comentario a la Hagadá, el זֶבַח פֶּסַח, figura en
//     Sefaria pero SIN texto hebreo cargado: no se cita nada de él.)
//   · Malbim a Shemot 12:2 — "כִּי הַמִּצְרִיִּים לֹא הָיָה אֶצְלָם חָדְשֵׁי לְבָנָה
//     כְּלָל וְכָל מִנְיָנָם הָיָה לַחַמָּה שֶׁהָיָה רֹאשׁ עֲבוֹדָתָם"; y el cambio de
//     Tishrei a Nisán porque "מֵאָז הִתְחִילָה הַהַנְהָגָה הַהַשְׁגָּחִיִּית" —
//     cotejado. Malbim a Devarim 16:3 [קעג-קעד] — cotejado.
//   · Arizal — Sha'ar HaKavanot, Drushei Jag HaPésaj (Sefaria: "Sha'ar HaKavanot,
//     Sermons on Passover 1:9"): el exilio de Egipto como retorno de Z"A al
//     עִבּוּר, "בְּחִינָה בְּתַכְלִית הַמִּעוּט וְהַגֵּרָעוֹן שֶׁאֵין לְמַטָּה מִמֶּנָּה";
//     lectura de "בְּדָמַיִךְ חֲיִי" como los מוֹחִין דְּגַדְלוּת llamados "חַיִּים";
//     "וְהֻצְרַךְ הַמַּאֲצִיל הָעֶלְיוֹן לַחֲזֹר לְהוֹלִיד אֶת ז\"א וּלְהַגְדִּילוֹ
//     בְּתַכְלִית הָאַחֲרוֹן שֶׁל הַהַגְדָּלָה… מֵחֲמַת תֹּקֶף הָאוֹר הַגָּדוֹל הַהוּא
//     וְעַל יְדֵי כֵן יָצְאוּ מִן הַגָּלוּת"; los dos דמים (pésaj y milá); y su nota de
//     que "לְסִבָּה זוֹ תִּקְּנוּ הַמְסַדְּרִים הַהַגָּדָה פָּסוּק זֶה בְּאֶמְצַע סֵדֶר
//     הַגָּדָה לֵיל פֶּסַח" — todo cotejado. (Sha'ar HaKavanot 1:7-8 trae que el
//     Faraón negaba el Nombre הוי"ה y admitía אלקים porque Z"A estaba en ibur.)
//   · Zohar, Tetzavé (Sefaria: "Zohar, Tetzaveh 9:73-77"; en la paginación clásica
//     eso cae en זוהר ח\"ב קפ\"ג ע\"ב = Zohar II:183b — verificado con la estructura
//     de dapim del índice de Sefaria: Tetzavé empieza en 179b y el bloque
//     "Tetzaveh 9:73-10:83" ES el 183b). Trae la parábola del hijo único del rey
//     que enfermó y la medicina; "כַּד נָפְקוּ יִשְׂרָאֵל מִמִּצְרַיִם לָא הֲוֵי יַדְעֵי
//     עִקָּרָא וְרָזָא דִּמְהֵימְנוּתָא"; la matzá "דְּאִיהִי אַסְוָותָא לְמֵיעַל
//     וּלְמִנְדַּע בְּרָזָא דִּמְהֵימְנוּתָא"; y "מִכָּאן וּלְהָלְאָה אִתְחָזֵי לוֹן
//     חָמֵץ… דְּהָא לָא יָכִיל לְנַזְקָא לוֹן" — cotejado.
//     PRECISIÓN DE INTEGRIDAD: en ese pasaje el Zohar dice מֵיכְלָא דְּאַסְוָותָא
//     (alimento de la CURACIÓN — y de hecho aparece como variante textual explícita
//     "ס\"א מיכלא דאסוותא דא") y רָזָא דִּמְהֵימְנוּתָא. La fórmula célebre
//     "מִיכְלָא דִּמְהֵימְנוּתָא" (alimento de la FE) NO aparece con esas palabras en
//     el texto del Zohar alojado en Sefaria: una búsqueda de la frase solo la
//     devuelve en autores POSTERIORES que la citan (Likutei Torá, Tzav 7:20 y Emor
//     2:23, del Admur HaZakén: "שֶׁנִּקְרָא בַּזֹּהַר מִיכְלָא דִּמְהֵימְנוּתָא"), y
//     el aparato de fuentes de Kehot a Likutei Torá, Tzav 12:27 anota que el Tzemaj
//     Tzedek remitía a Zohar Vayetzé 157a "וצ\"ע" (= requiere estudio). Por eso el
//     estudio atribuye el CONTENIDO al Zohar de Tetzavé con folio verificado, y la
//     FÓRMULA a la tradición posterior que la acuñó. No se inventa ningún folio.
//   · Sefat Emet (R' Yehudá Aryé Leib de Ger), Vaikrá, Pésaj 1:18 (año תרל\"א) —
//     "כִּי יְצִיאַת מִצְרַיִם הָיָה שֶׁלֹּא עַל פִּי זְכוּת יִשְׂרָאֵל רַק עַל יְדֵי
//     שֶׁהִבְטִיחַ הַשֵּׁם יִתְבָּרַךְ לָאָבוֹת", y el remate: "יְצִיאַת מִצְרַיִם רַק
//     שֶׁיּוֹצְאִין מֵהַמֵּיצַר אֲבָל נִשְׁאָר הַמֵּיצַר… וְלֹא יוּכַל לִהְיוֹת נִדְחֶה
//     הַמֵּיצַר רַק עַל יְדֵי עֲבוֹדַת הָאָדָם" — cotejado textualmente.
//     Y Sefat Emet, Pésaj 1:3 — "עַל יְדֵי אֱמוּנָה נִכְנָס לְתוֹךְ הַכְּלָל" y la
//     matzá como comida "בְּלִי טְעָמִים" — cotejado.
//     Sefat Emet, Pésaj 10:7 y 25:3 y 30:4 — "פֶּסַח פֶּה סָח" — cotejado.
//   · Rabí Najman de Breslov — Likutei Etzot, Emet ve'Emuná 54 y Banim 14:
//     "עַל יְדֵי אֱמוּנָה זוֹכֶה לְבָנִים. אֱמוּנָה בְּגִימַטְרִיָּא בָּנִים"; y
//     Jayei Moharán 477:1 con la misma frase — cotejado. Es la fuente del hero.
//     Likutei Moharán 49:6 y Likutei Moharán II 74:1 y Sijot HaRán 88 —
//     "פֶּסַח, פֶּה סָח" — cotejado.
//   · Baal HaSulam (Rav Yehuda Ashlag), Talmud Eser HaSefirot, Jélek I, Histaklut
//     Penimit 1:6 — "לָכֵן הוּכַן עֲבוֹדָה וִיגִיעָה עַל שְׂכַר הַנְּשָׁמוֹת, כִּי מַאן
//     דְּאָכִיל דְּלָאו דִּילֵיהּ בָּהִית לְאִסְתַּכּוּלֵי בְּאַפֵּיהּ… דְּבְכָל מַתְּנַת
//     חִנָּם נִמְצָא פְּגַם שֶׁל בֹּשֶׁת פָּנִים" — cotejado textualmente. El dicho
//     arameo procede del Yerushalmi Orlá 1:3 (donde funciona como "סִימָנָא") y llega
//     a la Cabalá vía Ramjal (Da'at Tevunot 18; Kalaj Pitjei Jojmá 4:4) — verificado.
//   · Masejet Sofrim 14:18 — "בְּשִׁיר הַשִּׁירִים קוֹרִין אוֹתוֹ בְּלֵילֵי יָמִים
//     טוֹבִים… הָאַחֲרוֹנִים" (de Pésaj) — cotejado.
//   · Rema a Shulján Aruj, Oraj Jaim 490:9 — "וְנוֹהֲגִין לוֹמַר שִׁיר הַשִּׁירִים
//     בְּשַׁבָּת שֶׁל חוֹל הַמּוֹעֵד" (y si Shabat cae en el último Yom Tov, ese día)
//     — cotejado. AMBAS fuentes son reales: Sofrim es la más antigua, el Rema fija
//     el minhag ashkenazí vigente. Se citan las dos.
//   · Shir HaShirim 2:16 y 6:3 — cotejados (ya verificados en el Estudio 1, Elul).
//
//  GEMATRÍAS — calculadas letra por letra con Python:
//    אֱמוּנָה = א1+מ40+ו6+נ50+ה5 = 102
//    בָּנִים  = ב2+נ50+י10+ם40 = 102   → hero (fuente: R' Najman, ver arriba)
//    עֳנִי (ketiv, sin vav) = ע70+נ50+י10 = 130
//    עוֹנִי (keri, con vav) = ע70+ו6+נ50+י10 = 136
//    סֻלָּם = ס60+ל30+ם40 = 130 · סִינַי = ס60+י10+נ50+י10 = 130
//    פֶּסַח = פ80+ס60+ח8 = 148 · מַצָּה = מ40+צ90+ה5 = 135 · חָמֵץ = ח8+מ40+ץ90 = 138
//
//  DESCARTADO — probado y NO usado, para no forzar:
//   · פֶּסַח = נֵצַח = 148. Aritméticamente exacto, pero la tradición asocia Pésaj
//     a Jésed (Avraham), no a Netzaj: la coincidencia confundiría más que enseñaría.
//   · מָרוֹר = מָוֶת = 446. Exacto, pero es de la maror, no del eje de este estudio.
//   · וְהִצַּלְתִּי = יִשְׂרָאֵל = 541. Exacto, pero elegir UNA de las cuatro
//     expresiones porque cuadra es exactamente lo que este taller no hace.
//   · עוֹנִי = בְּיָד חֲזָקָה = 136. Bonito, pero una de las dos partes es una frase
//     de dos palabras elegida a medida. Descartado.
//   · La cuenta de "15 simanim del Séder = אָבִיב (15)": la edición de la Hagadá en
//     Sefaria no separa "Motzi" de "Matzá", así que la cuenta de 15 depende de la
//     edición. No se usa.
//
//  FECHAS — calculadas con el algoritmo estándar del calendario hebreo y
//  CALIBRADAS contra dos datos ya publicados en este mismo sitio (14 Elul 5786 =
//  27 ago 2026, del Estudio 1; 22 Tishrei 5787 = 3 oct 2026, del Estudio 5):
//    15 Nisán 5787 = jueves 22 abr 2027 (la noche del Séder cae, por tanto, en la
//    tarde-noche del miércoles 21). Pésaj en la diáspora: 15-22 Nisán = 22-29 abr
//    2027. En Eretz Israel: 15-21 Nisán = 22-28 abr. 6 de Siván 5787 (Shavuot) =
//    11 jun 2027, cincuenta días después.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "pesaj",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 9 — Pésaj · la libertad que llegó antes que el mérito",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۹ — پسح · آزادی‌ای که پیش از استحقاق رسید",
    he: "דּוֹדִי לִי וַאֲנִי לוֹ",
    titulo: "Pésaj — Mi Amado es mío",
    tituloFa: "پسح — محبوبم از آنِ من است",
    ganchoEs:
      "Elul lleva el nombre del verso en que YO empiezo. Pésaj es su espejo exacto: se sale de noche, a las prisas, con la masa que no alcanzó a fermentar — y con un pueblo que, dice Rashi con todas las letras, «no tenía en la mano mitzvot con las que ser redimido». Primero te sacan. Entenderlo viene después.",
    ganchoFa:
      "الول نامِ آیه‌ای را دارد که در آن مَن آغاز می‌کنم. پسح آینهٔ دقیقِ آن است: بیرون‌آمدن در شب، با شتاب، با خمیری که فرصتِ ور آمدن نیافت — و با قومی که، به گفتهٔ صریحِ راشی، «میتصوایی در دست نداشت تا بدان رهایی یابد». نخست تو را بیرون می‌آورند. فهمیدن، بعد می‌آید.",
    par: {
      a: { he: "אֱמוּנָה", rom: "Emuná (fe)" },
      b: { he: "בָּנִים", rom: "Banim (hijos)" },
      valor: "102",
    },
    fecha: "Pésaj 5787 · 22–29 abr 2027",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — «sin mérito» es una posición de Jazal, no la única",
    rotulo:
      "Se dice de entrada, porque el estudio entero se apoya en ese punto y sería deshonesto presentarlo como si no tuviera contrapeso.",
    parrafos: [
      `La afirmación más fuerte de este estudio —que Israel salió de Egipto sin mérito acumulado— no es una ocurrencia moderna ni una lectura de Jashmal: está en Rashi, al comienzo mismo de la parashá. Comentando por qué el cordero se aparta cuatro días antes (Shemot 12:6), Rashi trae a Rabí Matiá ben Jarash: "llegó el momento de cumplir el juramento que le hice a Avraham de redimir a sus hijos, וְלֹא הָיוּ בְיָדָם מִצְווֹת לְהִתְעַסֵּק בָּהֶם כְּדֵי שֶׁיִּגָּאֲלוּ — y no tenían en su mano mitzvot con las cuales ocuparse para ser redimidos, como está dicho: 'y tú estabas desnuda y descubierta' (Yejezkel 16:7)". Por eso —sigue Rashi— Dios les dio dos mitzvot en el último momento: la sangre del cordero pascual y la sangre de la circuncisión. Y añade una segunda razón, todavía más incómoda: "porque estaban sumergidos en la idolatría, les dijo 'saquen' — saquen sus manos de los ídolos".`,
      `Ahora la honestidad completa: esa no es la única voz de la tradición. Hay abundantes agadot que sostienen lo contrario — que Israel SÍ fue redimido por méritos (por no cambiar sus nombres ni su lengua, por el mérito de los patriarcas, por la fe de las mujeres). Los propios comentaristas de los midrashim lo registran: sobre Shemot Rabá 1:35, el Yefé To'ar observa que "hay muchas agadot que discrepan de esto". Este estudio elige seguir la línea de Rabí Matiá ben Jarash porque es la que Rashi puso en el pórtico de la parashá y porque es la que explica la prisa. Pero elegir una línea no es borrar la otra, y aquí queda dicho.`,
      `Tercera precisión, sobre el hilo de la serie. Que a Elul le corresponda «yo soy de mi Amado y mi Amado es mío» (Shir HaShirim 6:3) y a Pésaj el orden invertido, «mi Amado es mío y yo soy suyo» (2:16), es una LECTURA DE JASHMAL. Va marcada como tal al final, en su recuadro. Lo que sí es dato duro y verificable es que el Cantar de los Cantares se lee en Pésaj: lo trae ya Masejet Sofrim 14:18 ("el Cantar de los Cantares se lee en las últimas noches de la fiesta, la mitad una noche y la mitad la otra") y lo fija como costumbre vigente el Rema a Oraj Jaim 490:9 ("y se acostumbra decir Shir HaShirim en el Shabat de Jol HaMoed").`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — seis textos y una sola dirección",
    intro: [
      `El esqueleto antes del recorrido. Seis textos verificados, y todos empujan hacia el mismo lugar: en Pésaj el primer movimiento no es del hombre. Es de Dios, y llega antes de que haya nada que lo justifique.`,
    ],
    filas: [
      {
        ref: "Shemot 12:1-2",
        he: "הַחֹדֶשׁ הַזֶּה לָכֶם רֹאשׁ חֳדָשִׁים",
        es: "Este mes es para ustedes cabeza de los meses",
        funcion:
          "La primera mitzvá dada al pueblo es el calendario: recibir el tiempo antes de recibir la ley.",
      },
      {
        ref: "Shemot 12:6 (Rashi, citando la Mejiltá)",
        he: "וְלֹא הָיוּ בְיָדָם מִצְווֹת… שֶׁיִּגָּאֲלוּ",
        es: "No tenían en su mano mitzvot con las cuales ser redimidos",
        funcion: "El mérito ausente. Toda la tensión del estudio nace aquí.",
      },
      {
        ref: "Shemot 12:11",
        he: "וַאֲכַלְתֶּם אֹתוֹ בְּחִפָּזוֹן",
        es: "Y lo comerán a las prisas",
        funcion:
          "La primera cena de hombres libres se come de pie, calzado y con el bastón en la mano.",
      },
      {
        ref: "Shemot 12:39",
        he: "כִּי לֹא חָמֵץ… וְלֹא יָכְלוּ לְהִתְמַהְמֵהַּ",
        es: "Porque no fermentó… y no pudieron demorarse",
        funcion:
          "La matzá no es un símbolo escogido: es lo que quedó cuando faltó el tiempo.",
      },
      {
        ref: "Devarim 16:3 (Rashi, del Sifrei)",
        he: "וְחִפָּזוֹן לֹא שֶׁלְּךָ הָיָה אֶלָּא שֶׁל מִצְרַיִם",
        es: "Y la prisa no era tuya, sino de Egipto",
        funcion:
          "Ni siquiera el apuro les pertenecía. La escena entera la conduce otro.",
      },
      {
        ref: "Yejezkel 16:6-7 (citado en la Hagadá)",
        he: "וְאַתְּ עֵרֹם וְעֶרְיָה… בְּדָמַיִךְ חֲיִי",
        es: "Y tú estabas desnuda y descubierta… en tu sangre, vive",
        funcion:
          "El rescate de una criatura que no pidió nada porque todavía no sabía pedir.",
      },
    ],
    cierre: [
      `Un calendario, un mérito que falta, una cena de pie, un pan que no llegó a ser pan y una criatura rescatada del suelo. Ese es Pésaj — y ninguno de esos cinco elementos lo empezó el pueblo.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "Versículo-ancla I — la primera mitzvá · Shemot (Éxodo) 12:1-2",
        he: "וַיֹּ֤אמֶר יְהֹוָה֙ אֶל־מֹשֶׁ֣ה וְאֶֽל־אַהֲרֹ֔ן בְּאֶ֥רֶץ מִצְרַ֖יִם לֵאמֹֽר׃ הַחֹ֧דֶשׁ הַזֶּ֛ה לָכֶ֖ם רֹ֣אשׁ חֳדָשִׁ֑ים רִאשׁ֥וֹן הוּא֙ לָכֶ֔ם לְחׇדְשֵׁ֖י הַשָּׁנָֽה׃",
        es: "Y dijo YHVH a Moshé y a Aharón en la tierra de Egipto: «Este mes es para ustedes cabeza de los meses; el primero es para ustedes de los meses del año».",
        source: "Shemot (Éxodo) 12:1-2",
      },
      {
        label: "Versículo-ancla II — la cena de pie · Shemot 12:11",
        he: "וְכָ֘כָה֮ תֹּאכְל֣וּ אֹתוֹ֒ מׇתְנֵיכֶ֣ם חֲגֻרִ֔ים נַֽעֲלֵיכֶם֙ בְּרַגְלֵיכֶ֔ם וּמַקֶּלְכֶ֖ם בְּיֶדְכֶ֑ם וַאֲכַלְתֶּ֤ם אֹתוֹ֙ בְּחִפָּז֔וֹן פֶּ֥סַח ה֖וּא לַיהֹוָֽה׃",
        es: "Y así lo comerán: sus cinturas ceñidas, sus sandalias en los pies y su bastón en la mano; y lo comerán a las prisas — es un pésaj para YHVH.",
        source: "Shemot (Éxodo) 12:11",
      },
      {
        label: "Versículo-ancla III — el pan que no alcanzó a ser pan · Shemot 12:39",
        he: "וַיֹּאפ֨וּ אֶת־הַבָּצֵ֜ק אֲשֶׁ֨ר הוֹצִ֧יאוּ מִמִּצְרַ֛יִם עֻגֹ֥ת מַצּ֖וֹת כִּ֣י לֹ֣א חָמֵ֑ץ כִּֽי־גֹרְשׁ֣וּ מִמִּצְרַ֗יִם וְלֹ֤א יָֽכְלוּ֙ לְהִתְמַהְמֵ֔הַּ וְגַם־צֵדָ֖ה לֹא־עָשׂ֥וּ לָהֶֽם׃",
        es: "Y hornearon la masa que sacaron de Egipto en tortas de matzot, porque no había fermentado; pues fueron expulsados de Egipto y no pudieron demorarse, y tampoco se habían hecho provisiones.",
        source: "Shemot (Éxodo) 12:39",
      },
      {
        label: "Versículo-ancla IV — el nombre del pan · Devarim (Deuteronomio) 16:3",
        he: "לֹא־תֹאכַ֤ל עָלָיו֙ חָמֵ֔ץ שִׁבְעַ֥ת יָמִ֛ים תֹּֽאכַל־עָלָ֥יו מַצּ֖וֹת לֶ֣חֶם עֹ֑נִי כִּ֣י בְחִפָּז֗וֹן יָצָ֙אתָ֙ מֵאֶ֣רֶץ מִצְרַ֔יִם",
        es: "No comerás con él jametz; siete días comerás con él matzot, pan de aflicción — porque a las prisas saliste de la tierra de Egipto.",
        source: "Devarim (Deuteronomio) 16:3",
      },
      {
        label:
          "Versículo-ancla V — la criatura en el suelo · Yejezkel (Ezequiel) 16:6-7 (lo cita la Hagadá)",
        he: "וָאֶעֱבֹ֤ר עָלַ֙יִךְ֙ וָֽאֶרְאֵ֔ךְ מִתְבּוֹסֶ֖סֶת בְּדָמָ֑יִךְ וָאֹ֤מַר לָךְ֙ בְּדָמַ֣יִךְ חֲיִ֔י וָאֹ֥מַר לָ֖ךְ בְּדָמַ֥יִךְ חֲיִֽי׃ … וְאַ֖תְּ עֵרֹ֥ם וְעֶרְיָֽה׃",
        es: "Y pasé junto a ti y te vi revolcada en tu sangre, y te dije: «en tu sangre, vive»; y te dije: «en tu sangre, vive». … Y tú estabas desnuda y descubierta.",
        source:
          "Yejezkel 16:6-7 — no es la haftará de Pésaj; se cita porque la propia Hagadá lo trae en el Maguid",
      },
    ],
    parrafos: [
      `Empieza por lo que casi nadie nota, porque es lo primero que pasa. Antes del cordero, antes de la sangre en el dintel, antes de la décima plaga y de la salida, Dios le da a Israel una mitzvá — y es la primera que se le da al pueblo como pueblo. No es «no matarás». No es «amarás». Es un calendario: "הַחֹדֶשׁ הַזֶּה לָכֶם רֹאשׁ חֳדָשִׁים", "este mes es para ustedes cabeza de los meses" (Shemot 12:2). Y el Ramban, en su comentario a ese versículo, lo subraya sin rodeos: זוֹ מִצְוָה רִאשׁוֹנָה שֶׁצִּוָּה הַקָּדוֹשׁ בָּרוּךְ הוּא אֶת יִשְׂרָאֵל — "esta es la primera mitzvá que el Santo, bendito sea, ordenó a Israel"; y por eso el versículo anterior aclara que fue dicha "en la tierra de Egipto", porque el resto de las mitzvot de la Torá se dieron en el Sinaí. Lo primero que recibe un esclavo cuando deja de serlo no es una ley moral: es el derecho a decir qué día es hoy.`,
      `Piénsalo desde el lado del amo. Al esclavo se le puede quitar todo menos una cosa, porque esa cosa nunca fue suya: el tiempo. El esclavo no decide cuándo empieza su año, cuándo descansa, cuándo celebra; su calendario es el calendario de otro. Por eso la primera orden que recibe un pueblo recién liberado es que tome posesión del tiempo. Y Abarbanel, con esa manía suya de preguntar lo que nadie pregunta, pone el dedo exactamente ahí. Su Segunda Pregunta al versículo dice: es imposible dar un comienzo al año, שֶׁלֹּא יִתָּכֵן לָתֵת הַתְחָלָה וְרֵאשִׁית בַּשָּׁנָה כְּלָל לְפִי שֶׁהַזְּמַן מִתְדַּמֶּה מִכָּל צַד — "porque el tiempo es homogéneo por todos lados y no hay diferencia entre sus partes". El día tiene un comienzo natural, observa, porque sale el sol; el mes tiene un comienzo natural, porque la luna se renueva —y por eso se llama jódesh, de jadash, "nuevo"—; pero el año no tiene ninguno: en un círculo no hay primer punto. De modo que el comienzo del año no se descubre: se decreta. Y la Torá le entrega ese decreto a Israel. Ser libre es poder poner un principio donde la naturaleza no lo puso.`,
      `Ahora la escena misma, y aquí la Torá se vuelve extrañamente física. "Y así lo comerán: sus cinturas ceñidas, sus sandalias en los pies y su bastón en la mano; y lo comerán בְּחִפָּזוֹן, a las prisas" (12:11). Detente en la imagen, porque es una imagen rarísima. Es la primera comida de hombres libres, y se come de pie, con los zapatos puestos y el bastón en la mano — es decir, en la postura exacta del que huye. Rashi glosa la palabra sin adornarla: בְּחִפָּזוֹן, "לְשׁוֹן בֶּהָלָה וּמְהִירוּת", "expresión de sobresalto y rapidez", y la compara con "David se apresuró a irse" (I Shmuel 23:26) y con "lo que arrojaron los arameos en su huida" (II Melajim 7:15). No es la prisa alegre del que estrena algo. Es la prisa del que se escapa. La liberación llegó tan de golpe que ni siquiera hubo tiempo de sentarse a recibirla.`,
      `De ahí sale el pan. "Y hornearon la masa que sacaron de Egipto en tortas de matzot, porque no había fermentado; pues fueron expulsados de Egipto y no pudieron demorarse" (12:39). Léelo despacio, porque el versículo no dice lo que la costumbre nos hace oír. No dice que Dios ordenara pan sin levadura por su significado. Dice que la masa no llegó a fermentar. La matzá, antes de ser un mandamiento, fue un accidente — o mejor: fue el residuo material de una prisa que no era de ellos. Ibn Ezra afina el detalle hasta lo incómodo: "la masa que sacaron de Egipto TENÍA levadura en ella" — el fermento estaba puesto, solo faltó el tiempo. Y Rashi, al final del mismo versículo, encuentra ahí lo único que Israel puso de su parte: "y tampoco se habían hecho provisiones — para el camino. Esto dice el elogio de Israel: que no dijeron '¿cómo vamos a salir al desierto sin comida?', sino que creyeron y anduvieron". La única contribución humana a esa noche cabe en dos palabras: הֶאֱמִינוּ וְהָלְכוּ, creyeron y caminaron.`,
      `Y luego viene la frase de Rashi que cambia el color de toda la fiesta, y está en Devarim. Sobre "porque a las prisas saliste de la tierra de Egipto" (16:3), Rashi escribe, siguiendo al Sifrei: וְחִפָּזוֹן לֹא שֶׁלְּךָ הָיָה אֶלָּא שֶׁל מִצְרַיִם — "y la prisa no era tuya, sino de Egipto", y lo prueba con el versículo "y Egipto apremiaba al pueblo para echarlos" (Shemot 12:33). Es decir: ni siquiera el apuro les pertenecía. Otros los apuraron. Otros los echaron. Otros les pusieron el reloj. Israel salió de Egipto empujado por dos fuerzas —Dios por arriba, los egipcios por detrás— y la matzá es la marca que dejó ese empujón sobre la masa. (El Talmud, dicho sea de paso, discute exactamente esto: Rabí Elazar ben Azariá lee que el jipazón fue el de Egipto, a medianoche, y Rabí Akiva que fue el de Israel, al amanecer — Berajot 9a, y Malbim lo resume así en Devarim 16:3. Que los Sabios necesiten preguntarse "¿de quién era la prisa?" ya dice bastante.)`,
      `Queda el versículo más crudo de la noche, y no está en la Torá sino en un profeta — y llegó a la mesa del Séder porque los redactores de la Hagadá lo pusieron ahí. En el Maguid, al desplegar "arameo errante era mi padre", la Hagadá cita a Yejezkel: "Como el brote del campo te hice, y creciste y te hiciste grande… y tú estabas desnuda y descubierta. Y pasé junto a ti y te vi revolcada en tu sangre, y te dije: 'en tu sangre, vive'; y te dije: 'en tu sangre, vive'" (16:7 y 16:6). No es la imagen de un pueblo que se levanta y rompe sus cadenas. Es la imagen de una recién nacida abandonada en un descampado, sin nadie que la lavara ni la envolviera, y de Alguien que pasa, la ve y decide que viva. Rashi, comentando Shemot 12:6, cita ese mismo pasaje para explicar por qué Israel no tenía mérito: "y tú estabas desnuda y descubierta" — desnuda de mitzvot. Y por eso, dice, Dios le dio en el último instante dos mandamientos con qué cubrirse: la sangre del cordero y la sangre de la circuncisión. Dos actos de sangre en la última noche, para que hubiera algo, aunque fuera lo mínimo, que el redimido hubiera hecho con sus manos.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י) — «no tenían mitzvot en la mano».",
        texto: `El pasaje decisivo está en Shemot 12:6, y no lo trae ningún cabalista: lo trae el más llano de los comentaristas. Rashi pregunta por qué el cordero se aparta cuatro días antes del degüello, algo que no se ordenó para los Pésaj de las generaciones siguientes, y responde con Rabí Matiá ben Jarash (Mejiltá): "llegó el juramento que le juré a Avraham de que redimiría a sus hijos, וְלֹא הָיוּ בְיָדָם מִצְווֹת לְהִתְעַסֵּק בָּהֶם כְּדֵי שֶׁיִּגָּאֲלוּ — y no había en su mano mitzvot con las cuales ocuparse para ser redimidos, como está dicho: 'y tú estabas desnuda y descubierta'. Y les dio dos mitzvot: la sangre del pésaj y la sangre de la milá, pues se circuncidaron aquella misma noche, como está dicho: 'revolcada en tus sangres' — en dos sangres". Y todavía añade una segunda explicación, que es peor: "y porque estaban sumergidos en la idolatría (שְׁטוּפִין בֶּאֱלִילִים) les dijo: 'saquen y tomen para ustedes' — saquen sus manos de los ídolos, y tomen para ustedes un cordero de mitzvá". Léelo dos veces. El pueblo al que Dios va a sacar con mano fuerte, la víspera de su liberación, estaba desnudo de mandamientos y metido hasta el cuello en la religión del amo. Y salió igual. Las dos mitzvot de última hora no son el precio de la redención: son un vestido de emergencia para que el redimido no llegue completamente desnudo a su propia libertad. Rashi, además, es quien fija la palabra clave de la noche en Devarim 16:3: la prisa no era de ustedes, era de Egipto.`,
      },
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן) — el tiempo como memorial.",
        texto: `Ramban toma el versículo del calendario y le da un peso que nadie más le da. "Esta es la primera mitzvá que el Santo, bendito sea, ordenó a Israel por medio de Moshé; por eso dice 'en la tierra de Egipto', pues el resto de las mitzvot de la Torá fueron en el monte Sinaí". Y luego explica para qué sirve: que Israel cuente este mes como primero y desde él numere todos los demás —segundo, tercero— hasta completar el año, כְּדֵי שֶׁיִּהְיֶה זֶה זִכָּרוֹן בַּנֵּס הַגָּדוֹל, "para que esto sea un recuerdo del gran milagro: pues cada vez que mencionemos los meses, el milagro será recordado". Por eso —observa— en la Torá los meses no tienen nombre propio: se dice "el mes tercero", "el mes séptimo", y punto. Cada vez que un judío decía "estamos en el mes quinto" estaba diciendo, sin proponérselo, "cinco meses después de que Dios nos sacó". El calendario es una frase que el pueblo repite sin darse cuenta. Y Ramban cierra con un dato histórico que él mismo trae del Yerushalmi: שְׁמוֹת חֳדָשִׁים עָלוּ עִמָּנוּ מִבָּבֶל, "los nombres de los meses subieron con nosotros desde Babel" — Nisán, Iyar y los demás son nombres persas, y solo aparecen en los libros tardíos. Es decir: al volver del segundo exilio, el pueblo le añadió al calendario la memoria de la segunda redención sin borrar la primera. El tiempo judío es un archivo de salidas.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא) — la luna, el sol y un alma baja.",
        texto: `Ibn Ezra hace en Shemot 12:2 lo que solo él hace: se pone a explicar astronomía durante páginas. Y el resultado, si uno tiene paciencia, es teología. Su punto es que el mes pertenece a la luna y el año al sol: "no hay para el sol mes alguno, porque en el sol no se renueva nada; la renovación es de la luz de la luna, y por eso se llama jódesh (mes, de 'nuevo') y también yaréaj". El sol no cambia nunca; la luna desaparece y vuelve. Un calendario lunar es un calendario construido sobre la desaparición y el regreso. Pero la aportación más dura de Ibn Ezra a este estudio está en otro lugar: en Shemot 14:13, frente al mar. Se pregunta cómo es posible que seiscientos mil hombres armados tuvieran miedo de los que los perseguían, y por qué no pelearon por sus vidas y las de sus hijos. Y responde sin piedad: "porque los egipcios eran señores de Israel, y esta generación que salió de Egipto aprendió desde su juventud a soportar el yugo de Egipto, וְנַפְשׁוֹ שְׁפָלָה, y su alma era baja; ¿cómo iba a poder pelear ahora contra sus amos?". Y remata: por eso Dios "hizo que murieran todos los varones que salieron de Egipto, pues no tenían fuerza para pelear contra los cananeos, hasta que se levantó otra generación, la del desierto, que no había visto exilio וְהָיְתָה לָהֶם נֶפֶשׁ גְּבוֹהָה, y tenía un alma alta". Guarda esa frase. Es la respuesta más honesta que la tradición da a la pregunta incómoda de esta fiesta: se puede sacar a un hombre de Egipto en una noche; sacar Egipto del hombre tomó cuarenta años y una generación entera.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבְּנְאֵל) — el año no tiene primer día.",
        texto: `Don Yitzjak Abarbanel, que escribió un comentario entero a la Hagadá —el Zévaj Pésaj— y conocía por experiencia propia lo que es un pueblo expulsado de golpe, dedica a este versículo una de sus baterías de preguntas. La segunda es filosófica y es la que aquí importa: no se puede dar un comienzo al año, porque el tiempo es igual a sí mismo en todos sus tramos y no hay diferencia entre sus partes; el año no es más que la medida del movimiento del sol en su esfera, y "ya quedó demostrado que en un cuerpo esférico y en un movimiento circular no hay ni principio ni fin". El comienzo del día es natural, dice, porque sale el sol; el comienzo del mes es natural, porque la luna se renueva; אֲבָל תְּחִלַּת הַשָּׁנָה וְרֵאשִׁיתָהּ אֵינָהּ טִבְעִית — "pero el comienzo del año no es natural". ¿Entonces? Entonces, responde, el comienzo del año existe o por un orden racional o בְּהַנָּחָה הַסְכָּמִית, "por convención acordada". Y la esencia de esta mitzvá, concluye, no es enseñar cómo se santifica el mes, sino "que en memoria de su redención hagan, año tras año, de aquel mes en que salieron la cabeza de todos los meses del año… כְּדֵי שֶׁיִּהְיֶה תָּמִיד נִזְכָּר בְּפִיהֶם, para que esté siempre recordado en su boca". Traducido: allí donde la naturaleza no pone principio alguno, un hombre libre pone el suyo. Y lo pone donde lo sacaron.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם) — el calendario del amo y el calendario del hijo.",
        texto: `Malbim, siempre atento a por qué una palabra está repetida, se detiene en el doble לָכֶם del versículo ("este mes ES PARA USTEDES cabeza de los meses; el primero es PARA USTEDES"). Y su explicación es histórica y filosa: כִּי הַמִּצְרִיִּים לֹא הָיָה אֶצְלָם חָדְשֵׁי לְבָנָה כְּלָל וְכָל מִנְיָנָם הָיָה לַחַמָּה שֶׁהָיָה רֹאשׁ עֲבוֹדָתָם — "porque los egipcios no tenían meses lunares en absoluto, y toda su cuenta era solar, pues el sol era la cabeza de su culto". Israel, en cambio, contaba por la luna desde los días de Adam. Pero —y aquí está el giro— hasta ese momento contaban el año desde Tishrei, el mes de la creación del mundo; ahora se les ordena contar desde Nisán, en memoria de la salida, porque desde entonces "comenzó la conducción providencial", הַהַנְהָגָה הַהַשְׁגָּחִיִּית, por encima de la conducción de la naturaleza. Ponlo junto: el calendario del amo era el del astro que no cambia nunca y al que se adora; el calendario del liberado es el del astro que se apaga y vuelve, y se cuenta desde el día en que lo sacaron. Cambiar de calendario, en esta lectura, es cambiar de dios.`,
      },
      {
        etiqueta: "El Rambam / Maimónides (הָרַמְבַּ\"ם) — verse o mostrarse.",
        texto: `La Mishná dice, y el Talmud la repite: בְּכָל דּוֹר וָדוֹר חַיָּב אָדָם לִרְאוֹת אֶת עַצְמוֹ כְּאִלּוּ הוּא יָצָא מִמִּצְרַיִם — "en cada generación el hombre está obligado a VERSE a sí mismo como si él hubiera salido de Egipto" (Mishná Pesajim 10:5; Pesajim 116b). El Rambam, al codificarlo, cambia una letra y con ella el sentido: חַיָּב אָדָם לְהַרְאוֹת אֶת עַצְמוֹ כְּאִלּוּ הוּא בְּעַצְמוֹ יָצָא עַתָּה מִשִּׁעְבּוּד מִצְרַיִם — "está obligado a MOSTRARSE a sí mismo como si él en persona hubiera salido AHORA de la esclavitud de Egipto" (Hiljot Jametz uMatzá 7:6). Nótese que además añade "en persona", "ahora" y "de la esclavitud". La diferencia entre לִרְאוֹת y לְהַרְאוֹת no es cosmética. Verse es un acto interior: puedo hacerlo sentado, en silencio, sin que nadie lo note. Mostrarse es un acto público: exige que otro me vea haciéndolo — y el otro, en esta noche, es el hijo. Que el más sobrio de los codificadores desconfíe de la experiencia puramente interior y exija una escenificación tiene su lógica: en una fiesta cuya mitzvá central es contársela a un niño, sentir por dentro que salí de Egipto no sirve de nada si el niño no me ve salir.`,
      },
      {
        etiqueta: "El Arizal (הָאֲרִ\"י) — el mínimo absoluto y la luz que entra de golpe.",
        texto: `Aquí desciende toda la Cabalá luriana de esta fiesta, y es una sola idea desarrollada con precisión técnica. En los Drushim de Pésaj de Sha'ar HaKavanot (recogidos por Rabí Jaim Vital), el Arizal explica que el exilio de Egipto gira sobre dos ejes que en realidad son uno: abajo, Israel esclavizado; arriba, זְעֵיר אַנְפִּין —el partzuf que la Cabalá llama "el rostro pequeño", la configuración divina que se relaciona con el mundo— replegado al estado de עִבּוּר, de gestación, "בְּחִינָה בְּתַכְלִית הַמִּעוּט וְהַגֵּרָעוֹן שֶׁאֵין לְמַטָּה מִמֶּנָּה", "un estado de disminución y carencia absolutas, por debajo del cual no hay nada". Ese es el diagnóstico luriano del exilio: no es un castigo, es un colapso de la conciencia. Por eso —explica en el mismo lugar— el Faraón negaba el Nombre הוי"ה y admitía el nombre אלקים: en el estado de ibur no brillan los מוֹחִין (mojín, "cerebros", los estados de conciencia) del Nombre de la misericordia, sino solo los del nombre de la naturaleza y el juicio. El tirano no miente cuando dice "no conozco a YHVH". Sencillamente, desde el nivel en que él vive, YHVH no está encendido. Y ahora la redención, en la frase del propio Arizal: וְהֻצְרַךְ הַמַּאֲצִיל הָעֶלְיוֹן לַחֲזֹר לְהוֹלִיד אֶת ז\"א וּלְהַגְדִּילוֹ בְּתַכְלִית הָאַחֲרוֹן שֶׁל הַהַגְדָּלָה — "y el Emanador supremo tuvo que volver a dar a luz a Zeir Anpín y agrandarlo hasta el extremo final del engrandecimiento, para que se anulara la succión de las fuerzas externas מֵחֲמַת תֹּקֶף הָאוֹר הַגָּדוֹל הַהוּא, por la fuerza misma de aquella gran luz — y por eso salieron del exilio". Ahí está, en lenguaje técnico, todo el argumento de este estudio: como abajo no quedaba nada con qué empujar, la luz tuvo que entrar de golpe y desde arriba, en cantidad tal que el mal no pudiera seguir prendido. El Arizal llama a eso "un milagro grandísimo", y explica que por eso "en tu sangre, vive" significa los מוֹחִין דְּגַדְלוּת, los cerebros de la expansión, que se llaman "vidas" — las dos sangres son la del pésaj y la de la milá. Y añade un dato precioso: "por esta razón los redactores de la Hagadá colocaron este versículo en medio del orden del Séder". El Ari no está adornando el texto: está explicando por qué ese versículo está en la mesa.`,
      },
      {
        etiqueta: "El Zohar (זֹהַר, תְּצַוֶּה) — la medicina antes de entender.",
        texto: `El Zohar de la parashá Tetzavé (II:183b) cuenta una parábola breve que vale por un tratado. Un rey tenía un hijo único y el hijo enfermó. Un día tuvo hambre. Dijeron: que el hijo del rey coma este remedio, y hasta que lo coma no haya en la casa ninguna otra comida ni alimento. Así lo hicieron; y cuando hubo comido el remedio, dijo el rey: de aquí en adelante que coma todo lo que quiera, que ya no podrá dañarle. Y el Zohar aplica: כַּד נָפְקוּ יִשְׂרָאֵל מִמִּצְרַיִם לָא הֲוֵי יַדְעֵי עִקָּרָא וְרָזָא דִּמְהֵימְנוּתָא — "cuando Israel salió de Egipto NO CONOCÍA la raíz ni el secreto de la fe. Dijo el Santo, bendito sea: que Israel pruebe la medicina, y hasta que coman esta medicina no se les muestre ningún otro alimento. Cuando comieron matzá, que es la medicina para entrar y conocer el secreto de la fe, dijo el Santo, bendito sea: de aquí en adelante que se les muestre el jametz y que lo coman, porque ya no puede dañarlos". Es exactamente el orden de esta fiesta: primero la cura, después el conocimiento. Se traga la matzá sin haber entendido, y entender es el efecto, no la condición. Nota de integridad, porque importa: la fórmula popular con que suele citarse este pasaje —מִיכְלָא דִּמְהֵימְנוּתָא, "el alimento de la fe"— no está con esas palabras en el texto del Zohar que aloja Sefaria; lo que el texto sí dice es מֵיכְלָא דְּאַסְוָותָא, "el alimento de la curación" (incluso como variante marcada en la propia edición), y רָזָא דִּמְהֵימְנוּתָא, "el secreto de la fe". La expresión célebre es de la tradición posterior que resumió el pasaje: así la cita el Admur HaZakén ("que se llama en el Zohar mijlá dimheimnutá", Likutei Torá, Tzav 7:20 y Emor 2:23). El contenido es del Zohar; la frase, de sus lectores.`,
      },
    ],
    glosa: `Glosa para el lector: Matzá = pan sin fermentar. Jametz = masa fermentada, prohibida en Pésaj. Séder = "orden", la cena ritual de la primera noche. Hagadá = "relato", el libro que se lee en esa cena. Maguid = la sección narrativa del Séder. Jipazón = prisa, sobresalto. Léjem oni = "pan de aflicción" o "pan de pobre" (Devarim 16:3). Mitzvá = mandamiento (plural mitzvot). Mejiltá = midrash halájico sobre Shemot. Sifrei = midrash halájico sobre Bamidbar y Devarim. Zeir Anpín = en el lenguaje del Arizal, "el rostro pequeño", la configuración divina que se relaciona con el mundo. Ibur = gestación; estado de máxima contracción de la conciencia. Mojín = "cerebros", estados de conciencia; katnut = conciencia contraída, gadlut = conciencia expandida. Partzuf = "rostro", configuración de sefirot. Ketiv / keri = lo que está escrito en el texto y lo que se lee en voz alta, cuando difieren.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, los hechos de esta fiesta son cinco y ninguno necesita interpretación. Primero: la primera mitzvá dada a Israel como pueblo, todavía dentro de Egipto, es la del calendario (Shemot 12:1-2; Ramban ad loc.). Segundo: la cena de la liberación se come de pie, ceñidos, calzados, con el bastón en la mano y בְּחִפָּזוֹן, a las prisas (12:11). Tercero: el pan de la fiesta es pan sin fermentar porque la masa no tuvo tiempo, no porque se hubiera elegido así — "porque fueron expulsados de Egipto y no pudieron demorarse" (12:39). Cuarto: la Torá misma da esa razón cuando nombra al pan, "porque a las prisas saliste" (Devarim 16:3), y Rashi precisa, con el Sifrei, que la prisa era de Egipto y no de Israel. Quinto: según Rabí Matiá ben Jarash, citado por Rashi en 12:6, el pueblo no tenía mitzvot con las cuales ser redimido, y las dos que recibió —la sangre del cordero y la de la circuncisión— le fueron dadas la misma noche.`,
          `De esos cinco hechos se sigue el pshat de Pésaj, y es exactamente el opuesto del pshat de {{study:elul|Elul}}. Allí un mes entero de trabajo preparatorio; aquí una noche que llega antes de que nadie haya trabajado. Allí un plazo que corre; aquí un plazo que se acaba de golpe. Pésaj no es la fiesta de una libertad conquistada. Es la fiesta de una libertad recibida — y recibida, además, con tanta prisa que la primera generación no alcanzó a sentarse a la mesa.`,
          `Un detalle halájico lo dice todo por sí solo. Aquella primera noche se comió de pie, ceñidos y con el bastón en la mano, es decir, en la postura del esclavo listo para salir corriendo. Pero para todas las generaciones siguientes la Mishná ordena lo contrario: "y aun el más pobre de Israel no comerá hasta que se recline" (Pesajim 10:1). El Yerushalmi explica por qué: "porque es costumbre de los esclavos comer de pie, y aquí que coman reclinados, לְהוֹדִיעַ שֶׁיָּצְאוּ מֵעַבְדוּת לַחֵירוּת, para hacer saber que salieron de la esclavitud a la libertad" (Yerushalmi Pesajim 10:1, en nombre de Rabí Leví). Es decir: la noche que celebramos reclinados es la noche que ellos comieron de pie. La postura de hombre libre nos tocó a nosotros, no a ellos. Ellos recibieron la libertad; nosotros recibimos el tiempo de sentarnos en ella.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números y las letras)",
        parrafos: [
          `Primera alusión, y es la del hero. אֱמוּנָה = א1 + מ40 + ו6 + נ50 + ה5 = 102. בָּנִים = ב2 + נ50 + י10 + ם40 = 102. Fe e hijos valen lo mismo. Y no es un cálculo de Jashmal: es una enseñanza explícita de Rabí Najman de Breslov — "por medio de la fe uno merece hijos, pues emuná en gematría es banim" (Likutei Etzot, Emet ve'Emuná 54; Banim 14; Jayei Moharán 477). Ahora míralo sobre esta noche concreta, donde encaja como una llave en su cerradura. Los dos polos del Séder son exactamente esos dos: la matzá, que el Zohar llama la medicina para entrar en el secreto de la FE, y "וְהִגַּדְתָּ לְבִנְךָ", "y le contarás a TU HIJO" (Shemot 13:8), que es la mitzvá central de la noche. La fe y los hijos no solo valen igual: son el mismo acto visto desde dos lados. Lo que no puedo demostrar, lo transmito; y lo que transmito, se llama hijo.`,
          `Segunda alusión, y es un notarikón clásico. פֶּסַח se lee como dos palabras: פֶּה סָח, "la boca habla". Lo traen Rabí Najman ("y la expresión Pésaj, peh sáj", Likutei Moharán 49:6; también Likutei Moharán II 74:1 y Sijot HaRán 88, donde se enseña que la palabra misma estuvo en el exilio hasta Pésaj), y el Sefat Emet lo da por sabido: "פסח פה סח, como está en los libros: pues todas las mitzvot de esta noche son con la boca — el relato, el comer y el beber" (Pésaj 10:7). Y en otro lugar lo remata: "por eso Pésaj es peh sáj, porque por la redención se abrió la boca de Israel" (Pésaj 25:3). Piénsalo con lo anterior: un pueblo que salió sin entender recibe, como única mitzvá permanente de esa noche, la de hablar. No la de meditar. No la de comprender. La de contar en voz alta, a un niño, año tras año, hasta que de tanto contarlo lo entienda alguien.`,
          `Tercera alusión, la del nombre del pan, y es una de esas donde el texto hebreo se parte en dos. La Torá llama a la matzá לֶחֶם עֹנִי (Devarim 16:3), y el Talmud discute qué significa exactamente, apoyándose en la diferencia entre lo escrito y lo leído: "¿acaso está escrito léjem ONI (con vav)? עָנִי está escrito", dice Rabí Akiva — es decir, pan de POBRE; "¿acaso lo leemos aní?", responde Rabí Yosei HaGlilí — "lo leemos ONI", con vav: pan de AFLICCIÓN (Pesajim 36a). Y Shmuel añade una tercera lectura sobre la misma palabra: לֶחֶם שֶׁעוֹנִין עָלָיו דְּבָרִים הַרְבֵּה, "pan sobre el que se RESPONDEN muchas cosas" — de la raíz ע־נ־ה, responder (Pesajim 115b, y allí también la baraita que lo confirma, junto con "así como el pobre acostumbra comer un pedazo", de donde viene partir la matzá). Un mismo pan, tres nombres: pobreza, aflicción, respuesta. Y las cifras acompañan sin necesidad de forzarlas: el ketiv עֳנִי vale ע70+נ50+י10 = 130; el keri עוֹנִי vale 136. Aritméticamente, 130 es también el valor de סֻלָּם, "escalera", y de סִינַי, "Sinaí" — una equivalencia que la tradición sí explota en otro contexto (la escalera de Yaakov). Se anota aquí como observación numérica y nada más: la enseñanza real no está en el número, está en que un mismo pan se llame a la vez pobreza y respuesta.`,
          `Cuarta alusión, y es de letras, no de números. Escribe las dos palabras enfrentadas: מַצָּה — mem, tzadi, hei. חָמֵץ — jet, mem, tzadi. Comparten la mem y la tzadi; toda la diferencia entre el pan permitido y el prohibido está en una letra: {{letter:he|la hei}} frente a {{letter:jet|la jet}}. Y esas dos letras se escriben igual salvo por un detalle: en la hei la pata izquierda está separada, hay una abertura; en la jet todo está cerrado. Un hueco de nada separa la libertad del exilio. (Es un remez tradicional muy difundido; búsquedas en Sefaria no me devolvieron un folio clásico que lo formule con estas palabras, así que va como lo que es: una observación sobre la forma de las letras, no una cita.) Añade el dato aritmético, que tampoco necesita adornos: מַצָּה = 135, חָמֵץ = 138. Tres de diferencia, la que va de la hei (5) a la jet (8).`,
          `Quinta alusión, la de las cuatro copas, y aquí conviene la precisión. La Guemará de Jerusalén y el Midrash traen varias explicaciones del número cuatro, no una. Rabí Yojanán en nombre de Rabí Benayá: כְּנֶגֶד אַרְבַּע גְּאוּלוֹת, "frente a las cuatro redenciones" — וְהוֹצֵאתִי (y los sacaré), וְהִצַּלְתִּי (y los salvaré), וְגָאַלְתִּי (y los redimiré), וְלָקַחְתִּי (y los tomaré), las cuatro expresiones de Shemot 6:6-7. Rabí Yehoshúa ben Leví: frente a las cuatro copas del Faraón en el sueño del copero. Y Rabí Leví: כְּנֶגֶד אַרְבַּע מַלְכֻיּוֹת, "frente a los cuatro reinos" — los cuatro exilios de la historia (Yerushalmi Pesajim 10:1; y las mismas opiniones, con alguna más, en Bereshit Rabá 88:5). No hay que elegir: las dos que importan aquí conviven en la misma página. Cada copa es una promesa de Dios y, a la vez, un imperio que hubo que atravesar. Cuatro veces prometió sacarlos, y cuatro veces hubo que salir.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          `Hay una pregunta que esta fiesta provoca y que casi nadie se atreve a hacer en voz alta en la mesa: ¿es libre quien fue liberado sin haberlo pedido? Un hombre al que sacan de la cárcel mientras duerme, ¿es un hombre libre o un hombre que amaneció en otro sitio? La tradición jasídica no esquiva la pregunta. La responde, y la respuesta más limpia es la del Sefat Emet, el rebe de Ger, y conviene leerla entera porque es exacta. Comentando por qué Dios ordenó a Israel volver sobre sus pasos hacia Egipto antes del mar, escribe: כִּי יְצִיאַת מִצְרַיִם הָיָה שֶׁלֹּא עַל פִּי זְכוּת יִשְׂרָאֵל רַק עַל יְדֵי שֶׁהִבְטִיחַ הַשֵּׁם יִתְבָּרַךְ לָאָבוֹת לְהוֹצִיאָנוּ מִמִּצְרַיִם — "porque la salida de Egipto no fue por mérito de Israel, sino solo porque Dios se lo prometió a los patriarcas; y quiso Dios que volvieran y tuvieran una segunda redención POR SU PROPIO MÉRITO. Por eso en la partición del mar estuvieron sometidos a juicio: porque ahora la voluntad era que fueran salvados también conforme a derecho — y en efecto salieron ganando el juicio, porque creyeron y volvieron hacia Egipto" (Sefat Emet, Pésaj 1:18, año 5631).`,
          `Y entonces viene la frase que sella todo este estudio, y merece leerse dos veces: וְזֶה הַהֶפְרֵשׁ שֶׁבֵּין יְצִיאַת מִצְרַיִם לִקְרִיעַת יַם סוּף. כִּי יְצִיאַת מִצְרַיִם רַק שֶׁיּוֹצְאִין מֵהַמֵּיצַר אֲבָל נִשְׁאָר הַמֵּיצַר. וּקְרִיעַת יַם סוּף הוּא שֶׁנִּדְחֶה כָּל הַמֵּיצַר מִפְּנֵיהֶם — "y esta es la diferencia entre la salida de Egipto y la partición del mar: la salida de Egipto es solo que salen del estrecho, PERO EL ESTRECHO PERMANECE; la partición del mar es que todo el estrecho es apartado delante de ellos. Y la razón es que la salida de Egipto fue solo por la bondad de Dios, וְלֹא יוּכַל לִהְיוֹת נִדְחֶה הַמֵּיצַר רַק עַל יְדֵי עֲבוֹדַת הָאָדָם, y el estrecho no puede ser apartado sino por el trabajo del hombre". Ahí está la respuesta a la pregunta incómoda, y es un sí matizado que no le miente a nadie. Sí: fuiste liberado. Pero salir del estrecho no es que el estrecho desaparezca. Mitzráim —de la raíz צ־ר־ר, estrechez— sigue existiendo después de que saliste; sencillamente, ya no estás dentro. Que deje de existir ES trabajo tuyo, y ningún regalo puede hacerlo por ti.`,
          `Por eso la Torá, apenas terminada la fiesta, impone una cuenta. Al día siguiente del primer día de Pésaj empieza el Omer: "y contarán para ustedes… siete semanas שֶׁבַע שַׁבָּתוֹת תְּמִימֹת תִּהְיֶינָה, completas serán; hasta el día siguiente de la séptima semana contarán cincuenta días" (Vaikrá 23:15-16). Es un detalle de estructura y es una respuesta teológica. La libertad se recibió en una sola noche, sin mérito, de golpe. Y lo primero que se ordena después es contar cuarenta y nueve días, uno por uno, sin poder saltarse ninguno, hasta la entrega de la Torá. Como si la Torá dijera: te lo di gratis, y ahora vas a caminar cada metro del trayecto. En 5787 esa cuenta va del 23 de abril al 10 de junio de 2027, y desemboca en Shavuot el 11 de junio. Cincuenta días de aritmética diaria para digerir una noche de regalo.`,
          `Y todavía queda la lectura jasídica de la matzá, que es de una delicadeza extraña. El Sefat Emet observa que la matzá es un alimento sin sabores — "aunque es sin gustos, tal cual es; solo que uno se abstiene de los demás alimentos para quedar adherido al sabor de la matzá, y por eso siente adherencia a ella aunque no capte su gusto" (Pésaj 1:3). Piensa en lo que significa. Toda la noche gira alrededor de un pan que no sabe a nada, y su virtud es precisamente esa: que no se puede disfrutar por sus cualidades, solo aceptar. Y sobre esa misma página escribe la frase que resuelve la relación entre el don y el sujeto: עַל יְדֵי אֱמוּנָה נִכְנָס לְתוֹךְ הַכְּלָל, "por medio de la fe uno entra dentro del conjunto". La salida de Egipto le ocurrió al pueblo entero, hace tres mil años, sin consultarte. La única manera de que también te haya ocurrido a ti es creer que te ocurrió — y por eso la obligación de la noche es verse (o, con el Rambam, mostrarse) como si hubieras salido tú.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de Pésaj tiene un nombre técnico en la Cabalá, y ya lo desarrolló este taller en otro lugar: la אִתְעֲרוּתָא דִּלְעֵילָא, el {{study:despertar-de-lo-alto|despertar desde Arriba}} — la luz que desciende como don, sin que nadie la haya ganado. Aquí no vamos a repetir lo que allí se dijo. Lo específico de Pésaj es otra cosa, y es más incómoda: el precio que tiene recibir. Porque un don gratuito no es solo alegría. Rav Yehuda Ashlag, Baal HaSulam, construye sobre eso una de sus piezas centrales, y la construye a partir de un dicho arameo que la tradición encontró en el Talmud de Jerusalén (Orlá 1:3) y que Ramjal ya había convertido en principio: מַאן דְּאָכִיל דְּלָאו דִּילֵיהּ בָּהִית לְאִסְתַּכּוּלֵי בְּאַפֵּיהּ — "el que come lo que no es suyo, se avergüenza de mirar a la cara" al que se lo dio. En el Talmud Eser HaSefirot, Baal HaSulam pregunta por qué, si el propósito de la creación era hacer el bien a las criaturas, hizo falta este mundo turbio y lleno de sufrimientos, en lugar de darles el placer directamente. Y responde con ese mismo dicho: דְּבְכָל מַתְּנַת חִנָּם נִמְצָא פְּגַם שֶׁל בֹּשֶׁת פָּנִים — "porque en todo regalo gratuito hay un defecto de vergüenza; y para evitarles a las almas ese defecto creó este mundo, donde existe la realidad del trabajo, y así disfrutarán en el futuro del fruto de sus manos… y se salvarán del defecto de la vergüenza" (Histaklut Penimit 1:6).`,
          `Ahora superpón eso al pan de esta noche y mira lo que aparece. La matzá se llama לֶחֶם עֹנִי, "pan de pobre": el pan del que recibe. Los Sabios ordenaron partirla en dos y esconder la mitad, "así como el pobre acostumbra comer un pedazo" (Pesajim 115b). Y la Hagadá abre el Maguid levantando ese pan y diciendo, en arameo: הָא לַחְמָא עַנְיָא דִּי אֲכָלוּ אַבְהָתָנָא בְּאַרְעָא דְמִצְרָיִם — "este es el pan de pobreza que comieron nuestros padres en la tierra de Egipto", y de inmediato: "todo el que tenga hambre, que venga y coma". Léelo en la clave de Baal HaSulam y verás lo que hace ese párrafo. La única manera de comer pan de caridad sin vergüenza es dárselo a otro en el mismo gesto. El pan del que recibe se vuelve tolerable cuando el que lo recibe lo reparte. No es un adorno de hospitalidad: es la única corrección posible del "pan de la vergüenza" en el instante mismo de comerlo.`,
          `Y el secreto último, el que junta al Arizal con todo lo anterior. En el diagnóstico luriano, Egipto no es un país: es un estado de conciencia en su mínimo absoluto — Zeir Anpín replegado al ibur, "por debajo del cual no hay nada". Desde un mínimo absoluto no se puede iniciar nada: no queda vaso, no queda deseo, no queda ni siquiera la lucidez de saber que se está preso. Por eso, y solo por eso, la luz tuvo que entrar de golpe: וְהֻצְרַךְ הַמַּאֲצִיל הָעֶלְיוֹן… לְהַגְדִּילוֹ בְּתַכְלִית הָאַחֲרוֹן שֶׁל הַהַגְדָּלָה, "y el Emanador supremo tuvo que agrandarlo hasta el extremo final del engrandecimiento", con una fuerza tal que las cáscaras no pudieran seguir prendidas. La regla que Baal HaSulam enseña —no hay luz sin vaso, no hay recepción sin carencia— sigue siendo verdad; lo que Pésaj demuestra es qué ocurre cuando ni siquiera queda vaso. Entonces el vaso también se da desde arriba. Y esa es la diferencia exacta con {{study:elul|Elul}}: en Elul la luz espera un movimiento porque hay quien lo haga; en Pésaj no lo espera, porque no lo había. La luz que rescata a quien no puede pedir es de otra clase que la luz que responde a quien pide — y las dos son necesarias, porque nadie empieza pidiendo.`,
        ],
      },
    ],
    caja: {
      titulo: "אֱמוּנָה = בָּנִים = 102 — se recibe primero, se entiende después.",
      cuerpo:
        "La matzá es, según el Zohar de Tetzavé, la medicina que se toma ANTES de conocer el secreto de la fe — «cuando Israel salió de Egipto no conocía la raíz ni el secreto de la fe». Y la única mitzvá permanente de esa noche es hablarle a un hijo. Fe e hijos valen igual (Rabí Najman, Likutei Etzot, Emet ve'Emuná 54) porque son la misma operación: lo que no puedo demostrar, lo transmito. Pésaj = פֶּה סָח, «la boca habla».",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que hay cosas que recibí antes de merecerlas y antes de entenderlas, y que negarlo no me hace más digno: me hace más ciego. El pueblo salió de Egipto sin mitzvot en la mano, empujado por una prisa que ni siquiera era suya, comiendo de pie un pan que no llegó a fermentar. Si esa noche hubiera dependido de su mérito, seguirían allí. Y lo mismo vale para mí en más cosas de las que me gusta admitir: nací donde nací, me quisieron antes de que yo hiciera nada por merecerlo, se me abrieron puertas que no toqué. Pésaj me obliga a contar eso en voz alta una vez al año, para que no se me olvide de qué material está hecho mi punto de partida.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón del espejo. Las mismas cuatro palabras del Cantar, en distinto orden, describen dos fiestas opuestas: si empiezo yo, hay trabajo; si empieza Él, hay rescate. Veo el patrón del orden inverso: aquí primero se recibe y después se entiende — la medicina antes del diagnóstico, la matzá antes del secreto de la fe, la libertad antes de la Torá. Y veo el patrón del resto: la salida no borró Egipto. El Sefat Emet lo dijo con una precisión que duele — se sale del estrecho, pero el estrecho permanece. Lo que se recibió de golpe todavía hay que recorrerlo día por día, y por eso la Torá manda contar cuarenta y nueve.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Me da un lugar para lo que no puedo demostrar. La matzá no sabe a nada: no se la puede disfrutar por sus cualidades, solo aceptar — y en eso se parece a casi todo lo que sostiene una vida. Mi alma no cree porque haya vencido en un argumento; cree como se come pan sin sabor, porque es lo único que hay en la casa esa noche. Y me da también una advertencia: Ibn Ezra dice que la generación que salió tenía el alma baja de tanto cargar el yugo desde niña, y que hizo falta una generación nueva con "alma alta". Puedo estar fuera de mi Egipto y seguir teniendo dentro el alma del que estuvo dentro. Reconocerlo no es pesimismo; es la única forma de no confundir haber salido con haber sanado.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `El mundo empieza igual que Pésaj: nadie lo pidió. Ninguna criatura votó por existir; la existencia es el primer don recibido sin mérito, y todo lo demás viene después. Por eso el pan de esta noche se llama pan de pobre y por eso lo primero que se hace con él es ofrecerlo: "todo el que tenga hambre, que venga y coma". Y por eso el primer mandamiento del pueblo libre es un calendario. En un círculo no hay primer punto, dice Abarbanel; el tiempo, en sí mismo, no tiene comienzo. Que exista un "hoy" con sentido no es un hecho de la naturaleza: es una decisión que alguien tomó y me entregó. La creación entera funciona así — recibida antes de comprendida, y sostenida por alguien que decidió que empezara.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, escribe la lista de lo que recibiste sin merecerlo — y devuelve UNA de esas cosas a alguien que no pueda pagártela.",
    texto: `El estudio entero se apoya en una frase de Rashi: no tenían mitzvot en la mano con las cuales ser redimidos. Así que la práctica tiene que empezar por mirar tus propias manos con honestidad. Hazlo en dos capas, hoy mismo, en este orden.

Primero, quince minutos y un papel. Escribe cinco cosas de tu vida que no ganaste: no cinco cosas por las que estás agradecido en general, sino cinco cosas concretas que llegaron antes de que hicieras nada para merecerlas. Dónde naciste. Quién te enseñó a leer. Alguien que te esperó cuando no lo merecías. Una puerta que se abrió sin que la tocaras. El idioma en que piensas. Escríbelas en primera persona y en pasado, como el Rambam pide que se haga en esta noche: no "hay gente afortunada", sino "a mí me sacaron de ahí". Ese ejercicio es exactamente לְהַרְאוֹת אֶת עַצְמוֹ, mostrarse a uno mismo — y si tienes con quién, léelas en voz alta, porque Pésaj es פֶּה סָח, la boca que habla.

Segunda capa, la que impide que esto se quede en emoción. La Hagadá levanta el pan de pobre y en el mismo aliento dice "todo el que tenga hambre, que venga y coma" — Baal HaSulam explica por qué: el pan recibido de gracia produce vergüenza, y la única forma de comerlo sin vergüenza es repartirlo. Así que elige UNA de tus cinco cosas y devuélvela hoy, en pequeño, a alguien que no pueda pagártela ni agradecértelo públicamente: si alguien te enseñó, enséñale hoy algo a otro; si alguien te esperó, espera hoy a alguien; si te abrieron una puerta, abre una. Que sea hoy y que sea concreto — un mensaje, una llamada, media hora de tu tiempo. Y sabiendo lo que sabes: no vas a apartar el estrecho de nadie con eso. Solo vas a sacar a alguien de él un poco, que es exactamente lo que hizo la primera noche. El resto —el trabajo largo, el conteo día por día— viene después, y también te toca.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Pésaj es el polo opuesto de {{study:elul|Elul}}: el despertar viene de Arriba y llega antes del mérito. Rashi lo dice sin suavizarlo, citando a Rabí Matiá ben Jarash: "no había en su mano mitzvot con las cuales ocuparse para ser redimidos" (Shemot 12:6, de la Mejiltá), y por eso Dios les dio dos mandamientos de última hora — la sangre del cordero y la de la circuncisión — para que no llegaran completamente desnudos a su propia liberación. La prisa tampoco era suya: "וְחִפָּזוֹן לֹא שֶׁלְּךָ הָיָה אֶלָּא שֶׁל מִצְרַיִם" (Rashi a Devarim 16:3, del Sifrei).`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `La primera mitzvá dada al pueblo no es moral: es un calendario (Shemot 12:2). Ramban: "esta es la primera mitzvá que ordenó el Santo, bendito sea, a Israel", y su función es que "cada vez que mencionemos los meses, el milagro sea recordado". Abarbanel explica por qué eso libera: el día y el mes tienen comienzo natural, pero el año no —"en un cuerpo esférico y en un movimiento circular no hay ni principio ni fin"—, de modo que el comienzo del año se decreta. Al esclavo se le quita todo menos el tiempo, porque el tiempo nunca fue suyo. Lo primero que recibe el liberado es el derecho a decir dónde empieza el año.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `Se recibe primero y se entiende después. El Zohar de Tetzavé (II:183b): "cuando Israel salió de Egipto no conocía la raíz ni el secreto de la fe" — por eso Dios les dio la medicina (la matzá) antes que el conocimiento, como al hijo enfermo del rey. El Arizal da la razón estructural: en Egipto la conciencia estaba en "el extremo de la disminución, por debajo del cual no hay nada", y por eso "el Emanador supremo tuvo que agrandarlo hasta el extremo final del engrandecimiento" — la luz entró de golpe porque abajo no quedaba con qué empujar. Y אֱמוּנָה = בָּנִים = 102 (Rabí Najman): lo que no se puede demostrar, se transmite.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Escribir hoy cinco cosas que recibiste sin merecerlas, en primera persona y en pasado —"a mí me sacaron"—, que es lo que el Rambam llama לְהַרְאוֹת אֶת עַצְמוֹ, mostrarse a uno mismo (Hiljot Jametz uMatzá 7:6); y devolver UNA de ellas hoy a alguien que no pueda pagártela, porque el pan de pobre solo se come sin vergüenza cuando se reparte. Y recordar lo que enseña el Sefat Emet: salir del estrecho no es que el estrecho desaparezca. Eso último es trabajo tuyo, y la Torá te da cuarenta y nueve días contados para empezarlo.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal, marcada como tal. El dato duro que la sostiene sí está verificado y se dice a continuación.",
    parrafos: [
      `Empecemos por lo verificable, para que la lectura descanse sobre algo firme. Es dato duro que el Cantar de los Cantares es el libro que se lee en Pésaj. Lo trae ya Masejet Sofrim 14:18 — "el Cantar de los Cantares se lee en las últimas noches de la fiesta, la mitad una noche y la mitad la otra" —, y el Rema lo fija como la costumbre vigente: "y se acostumbra decir Shir HaShirim en el Shabat de Jol HaMoed; y si el Shabat cae en el último Yom Tov, se dice ese Shabat" (glosa a Shulján Aruj, Oraj Jaim 490:9). También es dato duro que el mismo libro contiene, en dos versículos distintos, las mismas cuatro palabras en orden invertido: אֲנִי לְדוֹדִי וְדוֹדִי לִי, "yo soy de mi Amado y mi Amado es mío" (6:3), y דּוֹדִי לִי וַאֲנִי לוֹ, "mi Amado es mío y yo soy suyo" (2:16). Y es dato duro —lo desarrolla el {{study:elul|Estudio 1 de esta serie}}— que la tradición nombró al mes de Elul con las iniciales del primero de esos dos, aquel en el que el alma habla primero.`,
      `Ahora la lectura, que es de Jashmal y de nadie más. Si Elul lleva el nombre del verso en que YO empiezo, entonces a Pésaj le corresponde el otro orden: דּוֹדִי לִי וַאֲנִי לוֹ — Él primero, yo después. Nadie en la tradición clásica hace ese emparejamiento, y aquí no se pretende que lo haga; se ofrece porque el resto del estudio lo pide a gritos. En Elul hay cuarenta días de shofar y selijot para preparar un encuentro que no llegará si no salgo a buscarlo. En Pésaj hay una noche que llega sola, sin aviso, sobre un pueblo desnudo de mitzvot y sumergido en la idolatría del amo, y lo saca antes de que sepa lo que le está pasando. Son las mismas cuatro palabras. Cambia quién habla primero, y con eso cambia la fiesta entera.`,
      `Y hay una asimetría que hace la lectura más interesante que un simple espejo, y no conviene esconderla. En el orden de Elul —"yo soy de mi Amado y mi Amado es mío"— hay reciprocidad: yo doy y Él responde. En el orden de Pésaj —"mi Amado es mío y yo soy suyo"— la segunda mitad, וַאֲנִי לוֹ, "y yo soy suyo", es lo que todavía está por hacerse cuando la noche termina. Recibiste el rescate; pertenecer es lo que viene después, y toma cuarenta y nueve días de conteo, cuarenta años de desierto y, según Ibn Ezra, una generación entera que tuvo que morir para que naciera otra con el alma alta. El calendario judío pone Pésaj en primavera y Elul al final del verano: primero te sacan, y meses después te toca a ti dar el primer paso. Nadie empieza pidiendo — pero nadie termina sin haber pedido.`,
    ],
  },

  hemshej: [
    "{{study:elul|El espejo exacto de este estudio: el mes que lleva el nombre del verso en que YO empiezo. Si en Pésaj me sacaron sin pedirlo, ¿qué se me pide entonces en Elul?}}",
    "{{study:despertar-de-lo-alto|La estructura completa de lo que aquí solo se aplicó a Pésaj: la אִתְעֲרוּתָא דִּלְעֵילָא, el despertar desde Arriba, y la luz envolvente que no se gana.}}",
    "{{study:exilio-redencion|Entre גּוֹלָה (exilio, 44) y גְּאוּלָּה (redención, 45) hay una sola letra: el Álef. La misma salida, contada con una sola letra de diferencia.}}",
    "{{study:el-ari|Quién fue el Arizal y de dónde sale ese lenguaje de mojín, ibur y partzufim que aquí explicó por qué la luz tuvo que entrar de golpe.}}",
  ],

  ctaRef: "Exodus 12:2",
};
