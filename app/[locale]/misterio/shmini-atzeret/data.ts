
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — שְׁמִינִי עֲצֶרֶת · קָשָׁה עָלַי פְּרֵדַתְכֶם
//  Serie «Tiempos Sagrados» (moadim) · Estudio 5 — Shminí Atzéret y Simjat Torá.
//  Cierra el ciclo de Tishrei y cierra la primera ola de la serie.
//
//  Hero en modo "par": לֵב = ל״ב נְתִיבוֹת = 32 (calculado letra por letra).
//
//  FUENTES VERIFICADAS CONTRA SEFARIA (2026-08-27, 14 de Elul 5786):
//   · Vaikrá 23:36 — "בַּיּוֹם הַשְּׁמִינִי מִקְרָא־קֹדֶשׁ… עֲצֶרֶת הִוא" — cotejado.
//   · Bamidbar 29:35 — "בַּיּוֹם הַשְּׁמִינִי עֲצֶרֶת תִּהְיֶה לָכֶם" — cotejado.
//   · Bamidbar 29:36 — "פַּר אֶחָד אַיִל אֶחָד כְּבָשִׂים בְּנֵי־שָׁנָה שִׁבְעָה" — cotejado.
//   · Bamidbar 29:13,17,20,23,26,29,32 — los toros de Sucot: 13+12+11+10+9+8+7 = 70
//     (contado versículo por versículo en el texto hebreo de la API).
//   · Devarim 34:12 — último versículo de la Torá, termina en יִשְׂרָאֵל (letra final ל).
//   · Bereshit 1:1 — primer versículo, empieza en בְּרֵאשִׁית (letra inicial ב).
//   · Rashi a Vaikrá 23:36 — el mashal del rey y "קָשָׁה עָלַי פְּרֵדַתְכֶם" — cotejado
//     TEXTUALMENTE. NOTA ORTOGRÁFICA: la edición de Sefaria trae פְּרֵדַתְכֶם (sin yud);
//     la grafía popular "פרידתכם" es una escritura plena posterior. Usamos la de Sefaria.
//   · Rashi a Bamidbar 29:35 — los setenta contra las setenta naciones y "עֲשׂוּ לִי
//     סְעוּדָה קְטַנָּה כְּדֵי שֶׁאֵהָנֶה מִכֶּם" — cotejado.
//   · Rashi a Bamidbar 29:36 — "פַּר אֶחָד אַיִל אֶחָד — אֵלּוּ כְנֶגֶד יִשְׂרָאֵל" y la
//     cita del Midrash Tanjumá sobre el huésped — cotejado.
//   · Sucá 55b (Rabí Elazar) — "הָנֵי שִׁבְעִים פָּרִים… כְּנֶגֶד שִׁבְעִים אוּמּוֹת. פַּר
//     יְחִידִי לָמָּה — כְּנֶגֶד אוּמָּה יְחִידָה" + la parábola del banquete grande y el
//     pequeño + Rabí Yojanán "אוֹי לָהֶם לַגּוֹיִים" — cotejado.
//     IMPORTANTE: en Sucá 55b la parábola NO trae la frase "קשה עלי פרידתכם"; esa
//     formulación es de Rashi. Se dice así en el estudio, sin fundirlas.
//   · Rosh Hashaná 4b — "שְׁמִינִי רֶגֶל בִּפְנֵי עַצְמוֹ הוּא" — cotejado.
//   · Sucá 48a — el acrónimo פָּזֵ״ר קֶשֶׁ״ב desplegado — cotejado. (El mismo acrónimo
//     aparece en Yoma 3a y lo comenta Rabbeinu Jananel a Jaguigá 17a.)
//   · Sucá 47a — halajá de la diáspora: "מֵיתַב יָתְבִינַן, בָּרוֹכֵי לָא מְבָרְכִינַן" —
//     cotejado.
//   · Ibn Ezra a Vaikrá 23:36 — rechaza "atzéret = asamblea" y lee "נעצר לפני ה׳"
//     (I Shmuel 21:8) — cotejado.
//   · Ramban a Vaikrá 23:36 — cita a Rashi, atribuye la agadá a Vaikrá Rabá (el propio
//     aparato de Chavel anota que allí no se halla; ver Sucá 55b) y da su "דֶּרֶךְ
//     הָאֱמֶת": Knéset Israel es la octava, "עֲצֶרֶת הִיא, כִּי שָׁם נֶעְצַר הַכֹּל" —
//     cotejado.
//   · Abarbanel a Bamidbar 29:35 — objeta a Rashi; atzéret de "זֶה יַעְצֹר בְּעַמִּי"
//     (I Shmuel 9:17, cotejado) como lenguaje de realeza; el día alude a קיבוץ גליות;
//     un toro = un solo reino, un carnero = un solo Kohén Gadol, siete corderos = los
//     siete pastores de Mijá 5:4 (cotejado) "o contra los siete días de la creación";
//     y su "derej hamadaí": el toro = la esfera envolvente, el carnero = la octava
//     esfera, los siete corderos = las siete esferas planetarias — cotejado.
//   · Malbim a Bamidbar 29:35 — atzéret en su sentido llano: la detención de partir
//     (טעון לינה) — cotejado.
//   · Targum Onkelos a Bamidbar 29:35 — "כְּנִישׁוּ תְּהֵי לְכוֹן" — cotejado.
//   · Zohar, Emor 45:288 — "יוֹמָא דָּא, מִמַּלְכָּא הוּא בִּלְחוֹדוֹי"; la parábola de los
//     huéspedes; "אֲנָא וְאַתּוּן נֵחֱדֵי יוֹמָא חַד"; "עֲצֶרֶת, תַּרְגּוּמוֹ: כְּנִישׁוּ" —
//     cotejado.
//   · Tikunei Zohar 29b — "שְׁמִינִי עֲצֶרֶת חַג בִּפְנֵי עַצְמוֹ, בֵּיהּ נְבִיעוּ
//     דְאוֹרַיְיתָא, לְאַשְׁקָאָה אִילָנָא" — cotejado.
//   · Pri Etz Jaim, Sháar HaMoed 3:10 (Arizal, ed. Jaim Vital) — la kavaná del día:
//     "וכללות הכוונה ליום זה ע״ב דיודין, ושם פשוט בלי ניקוד" — cotejado. Es material
//     técnico de kavanot; se cita con sobriedad y sin extrapolar.
//   · Likutei Torá, Shminí Atzéret 83a y ss. (Admur HaZakén) — el maamar abre con
//     "שְׂמֹאלוֹ תַּחַת לְרֹאשִׁי וִימִינוֹ תְּחַבְּקֵנִי" (Shir HaShirim 2:6, cotejado);
//     Sucot es "וימינו תחבקני, כמשל החובק את חבירו מאחוריו"; y el remate: "וְאָז עֲצֶרֶת
//     תִּהְיֶה לָכֶם — שֶׁיִּתְאַסֵּף וְיִתְקַבֵּץ הָאוֹר מַקִּיף לִהְיוֹת בִּבְחִינַת
//     פְּנִימִיּוּת… וְלָכֵן אוֹמְרִים בִּשְׁמִינִי עֲצֶרֶת מוֹרִיד הַגֶּשֶׁם" — cotejado.
//   · Sefer Baal Shem Tov / Kuntres Meirat Einayim 47 — el Besht no se sentaba en la
//     sucá en Shminí Atzéret; "סוכות" pleno y "סכת" defectivo; el yijud completo es
//     adentro, en la casa; la sucá como jupá — cotejado. Es una tradición jasídica
//     recogida por un rebe posterior (la fuente remite a Eser Orot), no un dicho
//     firmado por el Besht: se atribuye así de forma explícita en el cuerpo.
//   · Shem MiShmuel, Shminí Atzéret y Simjat Torá 14:8 y 14:21 — la pregunta ("¿de qué
//     sirve un día más si el amor crecerá y la despedida dolerá más?") y su respuesta
//     ("sin Shminí Atzéret el vínculo se disolvía al retirarse la fiesta y sus mitzvot;
//     por eso quédense un día más, para que la influencia se dé a Israel solo, con una
//     unión que dure todo el año") — cotejado.
//   · Mishná Taanit 1:1-2 — Rabí Yehoshúa: se menciona la lluvia desde el último Yom
//     Tov del jag; Rabí Yehudá: la menciona el que dirige el musaf de ese día —
//     cotejado.
//   · Meguilá 31a — lecturas de la fiesta: el último Yom Tov "כָּל הַבְּכוֹר", y "לְמָחָר
//     קוֹרִין וְזֹאת הַבְּרָכָה" (el día siguiente, hasta el final de la Torá) — cotejado.
//     El Talmud fija que ese día se TERMINA la Torá; no dice que se reempiece.
//   · Rambam, Hiljot Tefilá 13:1 — "הַמִּנְהָג הַפָּשׁוּט בְּכָל יִשְׂרָאֵל שֶׁמַּשְׁלִימִין
//     אֶת הַתּוֹרָה בְּשָׁנָה אַחַת… מַתְחִילִין בְּשַׁבָּת שֶׁאַחַר חַג הַסֻּכּוֹת" —
//     cotejado. Base de la nota de integridad: el ciclo anual es MINHAG, y en el nusaj
//     del Rambam Bereshit se lee el Shabat SIGUIENTE, no el mismo día.
//   · Maor VaShemesh, Shminí Atzéret 3 — "el segundo Yom Tov de la diáspora, desde
//     Shminí Atzéret, es llamado por todo Israel Simjat Torá; y en Eretz Israel, donde
//     el Yom Tov es un solo día, el octavo día es el día de Simjat Torá" — cotejado.
//   · Sefer Yetzirá 1:1 — "בִּשְׁלֹשִׁים וּשְׁתַּיִם נְתִיבוֹת פְּלִיאוֹת חָכְמָה" —
//     cotejado (los 32 senderos).
//   · Kohélet 3:11 — "אֶת־הַכֹּל עָשָׂה יָפֶה בְעִתּוֹ, גַּם אֶת־הָעֹלָם נָתַן בְּלִבָּם" —
//     cotejado.
//   · Yeshayahu 55:11 — "לֹא־יָשׁוּב אֵלַי רֵיקָם" — cotejado.
//   · Tehilim 104:31 y 149:2 — las dos alegrías del maamar — cotejados.
//   · Shir HaShirim 7:11 — "אֲנִי לְדוֹדִי וְעָלַי תְּשׁוּקָתוֹ" — cotejado (va en el
//     jidush, marcado como lectura de Jashmal y NO como fuente clásica).
//   · Fechas: verificadas contra el conversor de calendario. 22 de Tishrei 5787 =
//     3 oct 2026 (Shminí Atzéret); 23 de Tishrei 5787 = 4 oct 2026 (Simjat Torá y
//     Parashat Bereshit en la diáspora).
//
//  NO VERIFICADO / DESCARTADO — se dice en el cuerpo del estudio:
//   · La lectura ל + ב = לֵב del empalme de la Torá: NO se halló fuente clásica en
//     Sefaria (se buscó por varias formulaciones). Es una lectura tradicional muy
//     difundida y se presenta como notarikón/remez, nunca como pshat ni como cita.
//   · Abarbanel a Vaikrá 23:36 está vacío en Sefaria; se usa su comentario a
//     Bamidbar 29:35, que sí está completo.
//   · שְׁמִינִי = קָדוֹשׁ = 410 es un cálculo propio verificado aritméticamente; no se
//     halló fuente que lo traiga. Se marca como cálculo, no como tradición.
//
//  Gematrías calculadas letra por letra:
//    לֵב = ל30+ב2 = 32 · ל״ב נְתִיבוֹת = los 32 senderos del Sefer Yetzirá 1:1
//    שְׁמִינִי = ש300+מ40+י10+נ50+י10 = 410 · קָדוֹשׁ = ק100+ד4+ו6+ש300 = 410
//    Toros de Sucot: 13+12+11+10+9+8+7 = 70 · toro del octavo día: 1
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "shmini-atzeret",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 5 — Shminí Atzéret y Simjat Torá · el día en que Él pide quedarse",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۵ — شمینی عצرت و سیمحת تورا · روزی که او می‌خواهد بمانیم",
    he: "קָשָׁה עָלַי פְּרֵדַתְכֶם",
    titulo: "Shminí Atzéret — quédate un día más",
    tituloFa: "شمینی عצرت — یک روز دیگر بمان",
    ganchoEs:
      "Siete días con setenta toros por las setenta naciones. Y después, un octavo día con un solo toro, sin mitzvá propia, sin lulav, sin sucá obligatoria: solo quedarse. El midrash le pone al día una frase que desarma: «me es difícil despedirme de ustedes». Y en ese mismo día la Torá se termina y se vuelve a abrir sin dejar un segundo de silencio entre medio.",
    ganchoFa:
      "هفت روز با هفتاد گاو برای هفتاد ملت. و سپس روزی هشتم با یک گاو، بی‌فرمانِ ویژه، بی‌لولاو، بی‌سوکای واجب: تنها ماندن. میدراش بر این روز جمله‌ای می‌نهد که دل را می‌شکند: «جداییِ شما بر من دشوار است». و در همان روز تورات به پایان می‌رسد و بی‌یک لحظه سکوت دوباره گشوده می‌شود.",
    par: {
      a: { he: "לֵב", rom: "Lev (corazón) — ל final y ב inicial de la Torá" },
      b: { he: "ל״ב נְתִיבוֹת", rom: "los 32 senderos (Sefer Yetzirá 1:1)" },
      valor: "32",
    },
    fecha: "Shminí Atzéret 5787 · 3 oct 2026 · Simjat Torá 4 oct",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — tres capas que conviene no confundir",
    rotulo:
      "Se dice de entrada, porque en esta fiesta se mezclan con facilidad la Torá, el Talmud y la costumbre.",
    parrafos: [
      `Primera capa, la de la Torá. Shminí Atzéret está escrito, con esas palabras, en dos lugares: "en el día octavo será para ustedes una atzéret" (Bamidbar 29:35) y "en el día octavo tendrán convocatoria santa… atzéret es" (Vaikrá 23:36). Ahí está el día, su nombre y su ofrenda. Nada más. No hay mitzvá especial asignada a él: ni sucá ni lulav ni shofar. Es, literalmente, un día sin tarea.`,
      `Segunda capa, la de los Sabios. Que el octavo día sea "una fiesta en sí misma" y no la cola de Sucot es una determinación del Talmud (Rosh Hashaná 4b; Sucá 48a). Que se diga en él la oración por la lluvia viene de la Mishná (Taanit 1:1-2). Que ese día —o el siguiente, en la diáspora— se lea el final de la Torá está en Meguilá 31a. Y que el rey diga "quédense un día más, me es difícil despedirme de ustedes" es Rashi, en su comentario a Vaikrá 23:36 y a Bamidbar 29:36. Importante: el Talmud (Sucá 55b) trae la parábola del banquete grande y el banquete pequeño, pero NO trae esa frase. La frase, tal como la citamos todos, es de Rashi. Este estudio no las funde.`,
      `Tercera capa, la costumbre. La palabra "Simjat Torá" no aparece en la Torá ni en el Talmud: es un nombre posterior, de época geónica, para una alegría que se fue formando con los siglos. Más aún: el Rambam, cuando codifica el ciclo anual de lectura, lo llama con todas las letras "el minhag común en todo Israel" —costumbre, no ley— y en su nusaj la Torá se termina durante Sucot y Bereshit se empieza el SHABAT SIGUIENTE (Hiljot Tefilá 13:1). El empalme sin pausa que hoy nos emociona, el mismo día, es una decisión posterior de la comunidad judía. Este estudio la lee con respeto y la explica; no la disfraza de mandamiento.`,
      `Y una distinción geográfica que confunde a mucha gente: en la Tierra de Israel, Shminí Atzéret y Simjat Torá son EL MISMO DÍA. En la diáspora son dos días seguidos. Lo dice sin rodeos el Maor VaShemesh (Shminí Atzéret 3): el segundo Yom Tov de la diáspora es el que todo Israel llama Simjat Torá, y en la Tierra de Israel ese nombre le toca al octavo día mismo.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — seis textos y un solo movimiento",
    intro: [
      `El esqueleto antes del recorrido. Seis textos verificados sostienen el estudio, y todos empujan en la misma dirección: de lo ancho a lo estrecho, de lo de afuera a lo de adentro, de la despedida a la permanencia.`,
    ],
    filas: [
      {
        ref: "Bamidbar 29:35",
        he: "בַּיּוֹם הַשְּׁמִינִי עֲצֶרֶת תִּהְיֶה לָכֶם",
        es: "En el día octavo será para ustedes una atzéret",
        funcion: "El versículo-ancla. Un octavo día añadido a los siete, y sin tarea.",
      },
      {
        ref: "Bamidbar 29:13-32 y 29:36",
        he: "פָּרִים… שְׁלֹשָׁה עָשָׂר … שִׁבְעָה ‖ פַּר אֶחָד",
        es: "Trece toros… siete toros ‖ un solo toro",
        funcion: "Setenta toros en siete días; uno solo en el octavo. El aritmético del día.",
      },
      {
        ref: "Sucá 55b (Rabí Elazar)",
        he: "כְּנֶגֶד שִׁבְעִים אוּמּוֹת … כְּנֶגֶד אוּמָּה יְחִידָה",
        es: "Contra las setenta naciones… contra la nación única",
        funcion: "Lo universal de Sucot y lo íntimo del octavo día, en una sola línea.",
      },
      {
        ref: "Rashi a Vaikrá 23:36",
        he: "עַכְּבוּ עִמִּי עוֹד יוֹם אֶחָד, קָשָׁה עָלַי פְּרֵדַתְכֶם",
        es: "Quédense conmigo un día más: me es difícil despedirme de ustedes",
        funcion: "La frase que define la fiesta. No pide una ofrenda: pide compañía.",
      },
      {
        ref: "Targum Onkelos a Bamidbar 29:35",
        he: "כְּנִישׁוּ תְּהֵי לְכוֹן",
        es: "Reunión (recogimiento) será para ustedes",
        funcion: "Atzéret no es solo «detenerse»: es recoger hacia adentro lo disperso.",
      },
      {
        ref: "Devarim 34:12 → Bereshit 1:1",
        he: "…לְעֵינֵי כָּל יִשְׂרָאֵל ‖ בְּרֵאשִׁית בָּרָא",
        es: "…ante los ojos de todo Israel ‖ En el principio creó",
        funcion: "El empalme de Simjat Torá: la última ל y la primera ב. Juntas, לֵב.",
      },
    ],
    cierre: [
      `Setenta y uno. Afuera y adentro. Detenerse y recoger. Terminar y volver a empezar. Toda la fiesta cabe en esos cuatro pares.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "Versículo-ancla — Bamidbar (Números) 29:35",
        he: "בַּיּוֹם֙ הַשְּׁמִינִ֔י עֲצֶ֖רֶת תִּהְיֶ֣ה לָכֶ֑ם כׇּל־מְלֶ֥אכֶת עֲבֹדָ֖ה לֹ֥א תַעֲשֽׂוּ׃",
        es: "En el día octavo, atzéret será para ustedes; ninguna labor de trabajo harán.",
        source: "Bamidbar 29:35",
      },
      {
        label: "La ofrenda del octavo día — Bamidbar 29:36",
        he: "וְהִקְרַבְתֶּ֨ם עֹלָ֜ה אִשֵּׁ֨ה רֵ֤יחַ נִיחֹ֙חַ֙ לַֽיהֹוָ֔ה פַּ֥ר אֶחָ֖ד אַ֣יִל אֶחָ֑ד כְּבָשִׂ֧ים בְּנֵי־שָׁנָ֛ה שִׁבְעָ֖ה תְּמִימִֽם׃",
        es: "Y ofrecerán una ofrenda de ascensión, ofrenda de fuego, aroma agradable a YHVH: UN toro, UN carnero, siete corderos de un año, sin defecto.",
        source: "Bamidbar 29:36 — frente a los 13, 12, 11, 10, 9, 8 y 7 toros de los siete días de Sucot (29:13-32)",
      },
      {
        label: "El mismo día en Vaikrá — Vaikrá (Levítico) 23:36",
        he: "שִׁבְעַ֣ת יָמִ֔ים תַּקְרִ֥יבוּ אִשֶּׁ֖ה לַיהֹוָ֑ה בַּיּ֣וֹם הַשְּׁמִינִ֡י מִקְרָא־קֹ֩דֶשׁ֩ יִהְיֶ֨ה לָכֶ֜ם וְהִקְרַבְתֶּ֨ם אִשֶּׁ֤ה לַֽיהֹוָה֙ עֲצֶ֣רֶת הִ֔וא כׇּל־מְלֶ֥אכֶת עֲבֹדָ֖ה לֹ֥א תַעֲשֽׂוּ׃",
        es: "Siete días ofrecerán ofrenda de fuego a YHVH; en el día octavo tendrán convocatoria santa y ofrecerán ofrenda de fuego a YHVH: atzéret es; ninguna labor de trabajo harán.",
        source: "Vaikrá 23:36",
      },
      {
        label: "Cómo lo traduce el arameo — Targum Onkelos a Bamidbar 29:35",
        he: "בְּיוֹמָא תְּמִינָאָה כְּנִישׁוּ תְּהֵי לְכוֹן",
        es: "En el día octavo, kenishú (reunión, recogimiento) será para ustedes.",
        source: "Targum Onkelos, Bamidbar 29:35 — citado igual por el Zohar (Emor 45) y por Likutei Torá",
      },
      {
        label: "El empalme de Simjat Torá — el final y el principio",
        he: "וּלְכֹל֙ הַיָּ֣ד הַחֲזָקָ֔ה … אֲשֶׁר֙ עָשָׂ֣ה מֹשֶׁ֔ה לְעֵינֵ֖י כׇּל־יִשְׂרָאֵֽל׃ ‖ בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃",
        es: "«…y por toda la mano fuerte y todo el gran temor que hizo Moshé ante los ojos de todo Israel» ‖ «En el principio creó Dios los cielos y la tierra».",
        source: "Devarim 34:12 (último versículo de la Torá) y Bereshit 1:1 (el primero)",
      },
    ],
    parrafos: [
      `Empecemos por la aritmética, porque en esta fiesta la aritmética es teología. Durante los siete días de Sucot, el Templo ofrecía toros en cantidad descendente: trece el primer día, doce el segundo, once, diez, nueve, ocho y siete el séptimo (Bamidbar 29:13, 17, 20, 23, 26, 29 y 32). Sume usted mismo: trece más doce más once más diez más nueve más ocho más siete. Setenta. Setenta toros exactos, ofrecidos en público, en el patio del Templo de Jerusalén, y —según la lectura de los Sabios— no por Israel, sino por el mundo. Setenta toros por las setenta naciones de la tierra.`,
      `Y entonces llega el octavo día. La Torá cambia de tono, de escala y casi de idioma: "un toro, un carnero, siete corderos de un año, sin defecto" (Bamidbar 29:36). Un toro. Uno. Después del despliegue más universal del calendario judío —la única semana del año en que el pueblo de Israel ofrece sacrificios por naciones que no lo conocen, que no lo quieren, que ni siquiera se enteran— viene un día que no le habla al mundo. Le habla a uno solo. El Talmud lo dice en una línea que no necesita comentario: "estos setenta toros, ¿contra qué son? Contra las setenta naciones. ¿Y por qué un toro solitario? Contra la nación única" (Sucá 55b, en nombre de Rabí Elazar).`,
      `Ahora mire lo que este día NO tiene, porque es lo más extraño de todo. No tiene shofar, como Rosh Hashaná. No tiene ayuno ni confesión, como Yom Kipur. No tiene sucá obligatoria, no tiene lulav, no tiene etrog, no tiene las siete especies ni las procesiones ni el agua vertida sobre el altar. Todo el aparato ritual de Sucot —que es el más denso del año— se apaga de golpe. Queda un día llamado "el octavo", con un solo toro y una sola instrucción: no trabajen. Es la única fiesta del calendario cuyo contenido positivo es, literalmente, quedarse.`,
      `¿Y qué significa la palabra que le da nombre? עֲצֶרֶת, atzéret, viene de la raíz ע־צ־ר, que significa detener, retener, contener. Rashi la lee así: "atzarti etjem etzlí" — "los retuve conmigo". Ibn Ezra descarta la lectura "asamblea" con un argumento filológico limpio y se queda con "contenerse, abstenerse". Malbim insiste en el sentido más literal de todos: retenerse de PARTIR, no salir todavía de Jerusalén. Y el Targum de Onkelos, que es la traducción aramea más antigua y autorizada, elige una palabra distinta y decisiva: כְּנִישׁוּ, kenishú — reunión, recogimiento, juntar lo que estaba disperso. Detenerse y recoger. Las dos cosas a la vez.`,
      `Sobre esa base Rashi construye la parábola que hizo célebre a este día, y conviene leerla textual porque cada palabra pesa: "los retuve conmigo. Como un rey que invitó a sus hijos a un banquete por tantos y tantos días; cuando llegó el momento en que debían partir, dijo: hijos míos, por favor, quédense conmigo un día más — קָשָׁה עָלַי פְּרֵדַתְכֶם, me es difícil despedirme de ustedes" (Rashi a Vaikrá 23:36). Léalo de nuevo. No es un rey que ordena; es un rey que RUEGA — "בְּבַקָּשָׁה מִכֶּם", "por favor". No pide un sacrificio, no pide obediencia, no pide mérito. Pide un día más de compañía, y confiesa que la despedida le duele. En toda la Torá no hay otra fiesta cuya razón de ser sea esa.`,
      `Y ahora el segundo hecho del día, el que la costumbre añadió siglos después. En este mismo día se termina de leer la Torá. El Talmud ya lo fija: "al día siguiente leen 'Vezot HaBerajá'" (Meguilá 31a) — la última parashá, hasta el último versículo de Devarim. Lo que el Talmud NO dice —y aquí hay que ser exacto— es que se vuelva a empezar. Esa segunda mitad, la que hoy nos rompe el corazón, es una decisión posterior de la comunidad: apenas se lee "ante los ojos de todo Israel" (Devarim 34:12), se saca otro rollo y se lee "En el principio creó Dios" (Bereshit 1:1). Sin pausa. Sin un segundo de silencio entre el final y el comienzo. Y quien mira las letras ve lo que la tradición vio hace mucho: la Torá termina en ל y empieza en ב, y esas dos letras, en ese orden, forman לֵב — corazón.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י) — la voz principal de este estudio.",
        texto: `Rashi comenta este día tres veces y cada vez añade una capa. A Vaikrá 23:36 da la parábola del rey y sus hijos, con la frase que quedó grabada: "עַכְּבוּ עִמִּי עוֹד יוֹם אֶחָד, קָשָׁה עָלַי פְּרֵדַתְכֶם". A Bamidbar 29:35 explica de dónde sale: "porque todos los días de la fiesta ofrecieron contra las setenta naciones, y cuando ya se disponen a irse, les dice el Omnipresente: por favor, hagan para Mí un banquete pequeño, כְּדֵי שֶׁאֵהָנֶה מִכֶּם — para que yo disfrute de ustedes". Y a Bamidbar 29:36, sobre el toro único, remata: "estos son contra Israel — quédense conmigo un poco más; y esto es lenguaje de cariño (לְשׁוֹן חִבָּה), como hijos que se despiden de su padre y él les dice: me es difícil despedirme de ustedes". Note la palabra que Rashi elige para clasificar todo el asunto: jibá, cariño. No es una categoría legal. Es una categoría afectiva, y Rashi la usa a propósito. En el mismo lugar trae además el Midrash Tanjumá con una observación doméstica y encantadora: la Torá enseña buenos modales — al huésped se le sirve mucho el primer día y se va bajando, y eso explica los toros decrecientes de Sucot. Es decir: aun la escala descendente de los sacrificios es, para Rashi, una lección de cómo se trata a alguien en tu casa.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא) — el filólogo pone orden.",
        texto: `Antes de que el día se llene de emoción, Ibn Ezra hace lo que siempre hace: pregunta qué dice la palabra. "Hay quienes dicen que su sentido es 'asamblea', como en 'atzéret bogdim' (Yirmiyahu 9:1), y que se refiere a la reunión de todo Israel en las tres peregrinaciones. Pero no hablaron correctamente" —y da su prueba: la Torá llama atzéret también al séptimo día de Pésaj (Devarim 16:8), y de ese día está escrito "y voltearás por la mañana y te irás a tus tiendas", de modo que allí no hay ninguna asamblea. "Lo más cercano es que sea como 'detenido delante de YHVH' (I Shmuel 21:8): que esté ocioso de todos los asuntos del mundo; y la explicación de atzéret es: ninguna labor de trabajo harán". Guarde esta lectura, porque es la más austera y la más exacta: atzéret, en su sentido llano, no significa fiesta ni reunión ni alegría. Significa quedarse quieto y sin asuntos. Toda la ternura que viene después se apoya sobre ese vacío.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם) — la detención es de los pies.",
        texto: `Malbim afina todavía más el pshat, y su aporte es concreto. Sobre Bamidbar 29:35 pregunta por qué la Torá repite la palabra atzéret dos veces respecto del octavo día (aquí y en Vaikrá 23:36), y responde con los Sabios: una de las dos veces viene a enseñar que este día "טָעוּן לִינָה" — exige pernoctar. Es decir: atzéret aquí significa, en su sentido más físico, "no salgas todavía". El peregrino ya tiene el equipaje hecho, ya cumplió los siete días, ya puede irse legalmente — y la Torá le detiene los pies una noche más. Todo el romanticismo del día descansa sobre esa instrucción de logística. Antes de ser una metáfora del alma, la atzéret fue una orden de no levantar el campamento.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבְּנְאֵל) — el uno que gobierna.",
        texto: `Abarbanel objeta a Rashi con firmeza ("no hace falta, puesto que ya ordenó 'ninguna labor de trabajo harán'") y propone otra cosa: la detención es para quedarse EN JERUSALÉN "לָשֶׁבֶת שָׁמָּה וְלִשְׂמֹחַ", para sentarse allí y alegrarse. Luego le da al día una lectura política y mesiánica que casi nadie asocia con Shminí Atzéret. Primero, filología: atzéret también puede venir de "זֶה יַעְצֹר בְּעַמִּי" (I Shmuel 9:17), donde el verbo describe a Shaúl como rey — o sea, atzéret sería lenguaje de REALEZA y señorío. Y entonces su lectura preferida: "lo correcto a mis ojos es que este día alude a la reunión de los exiliados (קִבּוּץ גָּלֻיּוֹת), cuando se renovará el reino en manos de David". Por eso un toro: "para aludir a que habrá un solo reino y un solo rey, porque entonces no habrá división de reinos". Un carnero: un solo Kohén Gadol. Y los siete corderos: los siete pastores de Mijá 5:4 — "y levantaremos contra él siete pastores". Después de los setenta toros por las setenta naciones, el octavo día no es un repliegue nacionalista: es la imagen del mundo cuando por fin se una bajo un solo gobierno. Es el {{study:exilio-redencion|final del exilio}} puesto en forma de sacrificio.`,
      },
      {
        etiqueta: "Abarbanel, segunda voz — el ocho por encima de los siete.",
        texto: `Y todavía añade lo que él llama "el camino científico", que es donde aparece la clave numérica de toda la fiesta. Para Abarbanel, en el registro cosmológico de su tiempo, el toro único alude "al globo superior que envuelve todo" (הַגַּלְגַּל הָעֶלְיוֹן הַמַּקִּיף בַּכֹּל); el carnero, al octavo globo, el de las estrellas fijas; y los siete corderos, a los globos de los siete planetas. Traduzca la cosmología medieval a lenguaje corriente y le queda esto: los SIETE son el orden del mundo natural, el que gira y se repite; el OCHO es lo que los abarca desde fuera y no gira con ellos. Y Abarbanel saca la moraleja él mismo, sin dejarla implícita: que el pueblo "no ponga su confianza en las configuraciones de los cielos ni en las conjunciones de los astros, y de los signos del cielo no se aterre — sino que ponga en Dios su esperanza". El octavo día es, exactamente, el día del que no está sujeto a la rueda.`,
      },
      {
        etiqueta: "Ramban (רַמְבַּ\"ן) — allí todo se recoge.",
        texto: `El Ramban cita a Rashi entero y luego marca con su fórmula habitual, "וְעַל דֶּרֶךְ הָאֱמֶת" —por vía de la Verdad, que en su lenguaje significa cabalísticamente— y dice: "porque en seis días hizo YHVH los cielos y la tierra, y el séptimo día es el Shabat, que no tiene pareja; y la Congregación de Israel es su pareja, como está dicho 'y la tierra'; y he aquí que ELLA es la octava. 'Atzéret es' — כִּי שָׁם נֶעְצַר הַכֹּל, porque allí todo se recoge". Ahí está el corazón estructural del día. Los seis días de la creación se emparejan entre sí; el séptimo queda solo; y la Congregación de Israel es la que le hace pareja, y por eso ella es "la octava". El octavo día no es un apéndice del siete: es la novia del siete. Y "atzéret" no describe entonces una prohibición sino una operación: allí todo lo que se desplegó durante la fiesta se recoge y se detiene en un punto. (Una nota de honestidad: el Ramban atribuye la parábola del rey a Vaikrá Rabá; el aparato crítico de su propia edición anota que allí no se encuentra, y remite a Sucá 55b. Lo señalamos porque este estudio no cita de oído.)`,
      },
      {
        etiqueta: "El Talmud (רֹאשׁ הַשָּׁנָה ד' ע\"ב · סֻכָּה מ\"ח ע\"א).",
        texto: `Lo que la Torá deja ambiguo, el Talmud lo decide: "שְׁמִינִי רֶגֶל בִּפְנֵי עַצְמוֹ הוּא" — el octavo es una fiesta en sí misma (Rosh Hashaná 4b). Y en Sucá 48a despliega en qué sentido, con un acrónimo que los estudiantes memorizan hasta hoy: פָּזֵ״ר קֶשֶׁ״ב. Payis, sorteo propio (se rifa de nuevo qué turno sacerdotal sirve, sin continuar el orden de Sucot). Zman, bendición del tiempo propia (se dice shehejeianu, como al empezar una fiesta nueva). Réguel, fiesta propia (y por eso no hay mitzvá de sucá). Korbán, ofrenda propia (el cálculo de sacrificios arranca de cero, no sigue la cuenta descendente). Shirá, canto propio (los levitas cantan otros salmos). Berajá, bendición propia (la fórmula que se añade en la Amidá y en el Birkat HaMazón cambia). Seis marcas, y todas dicen lo mismo: este día no es la cola de nada. Es un comienzo disfrazado de final. Un detalle halájico honesto, del mismo tratado: en la diáspora, donde el octavo día podría ser todavía el séptimo por la duda del calendario, la conclusión es "מֵיתַב יָתְבִינַן, בָּרוֹכֵי לָא מְבָרְכִינַן" — nos sentamos en la sucá, pero no bendecimos (Sucá 47a). O sea que fuera de la Tierra de Israel el día empieza con una ambigüedad simpática: se está en la sucá y ya no se está.`,
      },
      {
        etiqueta: "El Zohar (זֹהַר, אֱמוֹר) — «yo y ustedes».",
        texto: `El Zohar toma la parábola y le cambia el foco de un modo que vale la pena notar. "'En el día octavo, atzéret será para ustedes' — porque este día es del Rey a solas; su alegría está en Israel. Parábola de un rey que invitó huéspedes: todos los de su palacio se ocuparon de ellos. Después dijo el rey: hasta aquí, YO Y USTEDES nos ocupamos todos de los huéspedes, y ustedes ofrecieron sacrificios por los demás pueblos cada día. De aquí en adelante, אֲנָא וְאַתּוּן נֵחֱדֵי יוֹמָא חַד — yo y ustedes nos alegraremos un día. Eso es lo que está escrito: 'en el día octavo, atzéret será para ustedes'. LAJEM — para ustedes: para ofrecer sacrificios por ustedes mismos" (Zohar, Emor 45). Y cierra apoyándose en el arameo: "y por eso está escrito 'atzéret', cuyo Targum es kenishú" — reunión. Fíjese en el desplazamiento: en Rashi el rey retiene a sus hijos; en el Zohar el rey y sus hijos han estado trabajando JUNTOS toda la semana, atendiendo invitados, y ahora se sientan solos. No es el patrón despidiendo al empleado: es la familia después de que se van las visitas.`,
      },
      {
        etiqueta: "Tikunei Zohar (תִּקּוּנֵי זֹהַר, כ\"ט ע\"ב) — el manantial.",
        texto: `Y aquí aparece, siglos antes de que existiera el nombre "Simjat Torá", la razón mística de por qué la Torá se lee justo en este día. El {{study:tikunei-zohar|Tikunei Zohar}} escribe: "שְׁמִינִי עֲצֶרֶת חַג בִּפְנֵי עַצְמוֹ, בֵּיהּ נְבִיעוּ דְאוֹרַיְיתָא, לְאַשְׁקָאָה אִילָנָא דְאִיהוּ נָטוּעַ בְּגַן" — "Shminí Atzéret es una fiesta en sí misma; EN ÉL ESTÁ EL MANANTIAL DE LA TORÁ, para regar el Árbol que está plantado en el jardín; y sus raíces y sus ramas son como el círculo de la tierra, en el que todas las fiestas se celebran". Tres imágenes en tres líneas, y las tres son de agua y de círculo: un manantial que brota, un árbol que se riega, un círculo en el que giran todas las fiestas. Es el mismo día en que se dice la oración por la lluvia. Y es el mismo día en que la Torá se enrolla hasta el principio para volver a empezar. El texto no explica el círculo: lo dibuja.`,
      },
      {
        etiqueta: "El Arizal (הָאֲרִ\"י) — Cabalá luriana.",
        texto: `En la escuela luriana, tal como la registró Rabí Jaim Vital, este día tiene kavanot —intenciones de rezo— propias y muy técnicas. El Pri Etz Jaim (Sháar HaMoed 3:10) anota para Shminí Atzéret una vocalización particular de los Nombres y resume: "y el conjunto de la intención para este día es el Nombre de setenta y dos con yudín, y el Nombre simple sin vocalización". Digámoslo con cuidado, porque este material es propiedad de un sistema entero y no se puede resumir sin deformarlo: lo que interesa aquí, y es lo único que este estudio afirma, es la dirección. Toda la semana de Sucot se trabaja con luces que rodean; el octavo día se trabaja con el Nombre en su forma más desnuda, "sin vocalización" — sin el aparato que lo hace pronunciable. El día de la ofrenda más pequeña es también el día de la intención más despojada. Quien quiera entrar de verdad en este terreno, empiece por {{study:el-ari|el Arizal}} y por su método, no por una frase suelta.`,
      },
      {
        etiqueta: "El Admur HaZakén — Likutei Torá (מַקִּיף → פְּנִימִי).",
        texto: `Y aquí está la pieza que convierte todo lo anterior en una sola idea entendible. Rabí Shneur Zalman de Liadi dedica a este día un maamar entero (Likutei Torá, Shminí Atzéret, 83a y siguientes), y lo abre —esto es asombroso, dado el hilo de nuestra serie— con un verso del Cantar de los Cantares: "בַּיּוֹם הַשְּׁמִינִי עֲצֶרֶת תִּהְיֶה לָכֶם. He aquí que está escrito: 'שְׂמֹאלוֹ תַּחַת לְרֹאשִׁי וִימִינוֹ תְּחַבְּקֵנִי' — su izquierda bajo mi cabeza y su derecha me abraza" (Shir HaShirim 2:6). Más adelante explica que Sucot es precisamente ese abrazo: "es el aspecto de 'y su derecha me abraza', como quien abraza a su compañero POR DETRÁS" — de modo que hasta lo exterior de la persona, lo que da la espalda, queda envuelto. La sucá es una luz que rodea: מַקִּיף, makif. Y entonces llega el remate del maamar, y es literalmente el sentido de la fiesta: "וְאָז 'עֲצֶרֶת תִּהְיֶה לָכֶם' — que se reúna y se recoja la LUZ ENVOLVENTE para estar en el aspecto de INTERIORIDAD (בִּבְחִינַת פְּנִימִיּוּת)… y por eso se dice en Shminí Atzéret 'morid hagueshem', el que hace descender la lluvia". Ahí está todo. Siete días abrazado desde fuera; el octavo día, ese abrazo entra. Y la lluvia es la imagen exacta: lo que estaba en el aire, arriba, envolviéndolo todo, ahora cae y empapa la tierra. Un abrazo se recuerda; el agua bebida se vuelve cuerpo.`,
      },
    ],
    glosa: `Glosa para el lector: Atzéret = de la raíz ע־צ־ר, "detener, retener, contener"; el Targum lo traduce kenishú, "reunión, recogimiento". Kenéset Israel = la Congregación de Israel, la comunidad entendida como una sola entidad espiritual (en el lenguaje del Ramban y del Zohar, la "novia" del Shabat). Réguel bifnei atzmó = "fiesta en sí misma", el estatus halájico del octavo día. Pazer Keshev = acrónimo de las seis marcas que prueban ese estatus (sorteo, bendición del tiempo, fiesta, ofrenda, canto y bendición propios). Or makif = "luz envolvente", la que rodea sin entrar; or pnimí = "luz interior", la que se recibe adentro y se vuelve parte de uno. Yijud = "unión", el término cabalístico para el encuentro entre lo alto y lo bajo. Jupá = el palio nupcial bajo el que se casa una pareja judía. Notarikón = lectura por las letras iniciales o finales de una frase. Minhag = costumbre; no es lo mismo que ley de la Torá ni que decreto de los Sabios, y este estudio los distingue siempre.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, los hechos son cinco. Primero: después de los siete días de Sucot la Torá manda un octavo día, llamado atzéret, con convocatoria santa y prohibición de trabajo (Vaikrá 23:36; Bamidbar 29:35). Segundo: sus ofrendas rompen con la serie anterior — un toro y un carnero, frente a los setenta toros repartidos en siete días descendentes (Bamidbar 29:36 frente a 29:13-32). Tercero: la palabra atzéret significa detenerse o retenerse, y el Targum la vierte como "recogimiento" (Onkelos, Bamidbar 29:35); Ibn Ezra descarta expresamente la lectura "asamblea" y Malbim la aplica al hecho concreto de no partir todavía de Jerusalén. Cuarto: el Talmud fija que ese día es una fiesta independiente y no una prolongación de Sucot, con seis marcas propias (Rosh Hashaná 4b; Sucá 48a). Quinto: en ese día —o al siguiente, en la diáspora— se lee el final de la Torá (Meguilá 31a).`,
          `De ahí se sigue el pshat entero de la fiesta, y es más raro de lo que parece: Shminí Atzéret es el único día del calendario cuyo contenido positivo consiste en permanecer. No hay objeto que tomar, no hay sonido que escuchar, no hay comida obligatoria ni cabaña ni ayuno. La instrucción es no irse. Todo lo demás que decimos sobre este día —y diremos bastante— es interpretación construida sobre ese hueco.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números y las letras)",
        parrafos: [
          `Primera alusión, y es la del hero. La Torá termina en Devarim 34:12 con la palabra יִשְׂרָאֵל, cuya última letra es {{letter:lamed|lámed}} (ל). La Torá empieza en Bereshit 1:1 con la palabra בְּרֵאשִׁית, cuya primera letra es {{letter:bet|bet}} (ב). Ponga la última junto a la primera, en el orden en que el ciclo las junta —fin y luego principio— y le sale לב: לֵב, lev, corazón. Y su valor es ל30 + ב2 = 32 (verificado letra por letra). Ahora bien: el Sefer Yetzirá, el más antiguo de los libros de la Cabalá, abre con esta frase: "בִּשְׁלֹשִׁים וּשְׁתַּיִם נְתִיבוֹת פְּלִיאוֹת חָכְמָה חָקַק יָ-הּ… וּבָרָא אֶת עוֹלָמוֹ" — "con treinta y dos senderos maravillosos de sabiduría grabó Yah… y creó Su mundo" (Sefer Yetzirá 1:1, verificado). Los treinta y dos senderos con los que se hizo el mundo, y el corazón que se forma cuando la Torá vuelve a empezar, son el mismo número.`,
          `Y aquí la honestidad manda decir dos cosas. Una: esta lectura es un notarikón, un juego de letras iniciales y finales, no la etimología ni el sentido literal de nada. Dos: en la biblioteca de Sefaria no se halló una fuente clásica que la traiga con estas palabras, y se buscó por varias formulaciones. Es una lectura tradicional muy difundida en las comunidades y en los sermones, y así se presenta aquí: como llave, no como cita. Lo que sí es dato duro y verificable es lo que la llave abre: que ל vale 30 y ב vale 2, que su suma es 32, que la Torá efectivamente termina en una y empieza en la otra, y que la Cabalá abre su primer libro con ese mismo número. Nadie tiene que creerle a nadie; puede contarlo usted.`,
          `Segunda alusión, la aritmética del día. Setenta toros en siete días (13+12+11+10+9+8+7 = 70, contados en el texto), y UN toro en el octavo. Setenta es el número clásico de las naciones; uno es el número de lo que no se divide. Pero fíjese en el detalle que casi nadie mira: el octavo día no ofrece solo un toro. Ofrece "un toro, un carnero, y SIETE corderos" (Bamidbar 29:36). O sea que el siete no desaparece — queda ahí abajo, completo, sosteniendo — y encima de él aparece el uno. Abarbanel lo lee exactamente así en su registro cosmológico: los siete corderos son los siete planetas, el carnero es la octava esfera, y el toro único es la esfera que lo envuelve todo. Siete es el orden del mundo que gira. Ocho es lo que no gira con él.`,
          `Tercera alusión, y esta es un cálculo propio que se ofrece marcado como tal, no como tradición recibida. שְׁמִינִי, "octavo", vale ש300 + מ40 + י10 + נ50 + י10 = 410. קָדוֹשׁ, "santo", vale ק100 + ד4 + ו6 + ש300 = 410. Los dos números son idénticos y cualquiera puede comprobarlo. Y el detalle que hace que no sea un truco: el versículo de Vaikrá une esas dos palabras en la misma frase — "בַּיּוֹם הַשְּׁמִינִי מִקְרָא־קֹדֶשׁ יִהְיֶה לָכֶם", "en el día OCTAVO tendrán convocatoria SANTA" (Vaikrá 23:36). El octavo y lo santo, ya juntos en la letra, valen lo mismo. No se halló fuente que lo traiga; se ofrece como cálculo verificado y nada más.`,
          `Cuarta alusión, y es la del calendario. Los siete días de la creación describen el tiempo natural: la semana, el ciclo, lo que se repite. Toda la Cabalá lee el ocho como lo que empieza donde el siete se agota — el octavo día de la circuncisión, el octavo día de la consagración del Mishkán, el octavo día de esta fiesta. Y el Ramban lo dice en la clave más íntima posible: los seis días se emparejan de a dos, el séptimo queda sin pareja, y la Congregación de Israel es su pareja — "y he aquí que ELLA es la octava". El ocho, entonces, no es un número más. Es el nombre de la novia.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          `Empecemos por la pregunta que hace que este día sea difícil de verdad, y la hizo un jasid: el Shem MiShmuel, Rabí Shmuel Bornsztain de Sochatchov. "En el midrash: 'me es difícil despedirme de ustedes, quédense conmigo un día más'. Y hay que entender: ¿qué pasará después de ese único día? ¡Israel quedará todavía MÁS unido a su Padre en los cielos, y la separación será todavía más dura!" (Shem MiShmuel, Shminí Atzéret y Simjat Torá 14:8). Es una objeción devastadora y perfectamente lógica. Si el problema es que la despedida duele, alargar la visita no resuelve nada: la agrava. Cualquiera que haya prolongado una despedida en un aeropuerto sabe que la objeción es correcta.`,
          `Y su respuesta cambia el sentido de toda la fiesta: "sin Shminí Atzéret, el vínculo se habría separado al retirarse la fiesta y sus mitzvot; por eso, 'quédense conmigo un día más', para que la influencia se dé a Israel A SOLAS — y esto será con una unión que perdure todos los días del año, y ya no estarán separados" (ibíd. 14:21). Es decir: el octavo día no prolonga la fiesta. La CONVIERTE. Durante siete días el vínculo se sostenía en objetos y acciones — la cabaña, el lulav, el etrog, las procesiones. Retire los objetos y el vínculo se cae con ellos, porque estaba colgado de ellos. El octavo día quita todos los objetos a propósito, deja al hombre y a Dios sin nada entre las manos, y pregunta: ¿queda algo? Lo que quede ahí es lo único que va a durar el resto del año.`,
          `Ahora la imagen jasídica que lo hace visible, y está verificada en la tradición del Baal Shem Tov. El Sefer Baal Shem Tov recoge una enseñanza (Kuntres Meirat Einayim 47) que un rebe posterior transmitió en nombre del Besht: "el Baal Shem Tov no se sentaba en la sucá en Shminí Atzéret… porque en el día de Shminí Atzéret está el yijud completo (הַיִּחוּד הַגָּמוּר); por eso en la Tierra de Israel el yijud se completa en Shminí Atzéret, y por eso se sientan ese día EN LA CASA — כִּי עִקַּר הַיִּחוּד הוּא בִּפְנִים בַּבַּיִת, porque lo esencial de la unión es adentro, en la casa. Y así es la costumbre del mundo: se plantan cuatro postes con un paño arriba, y eso es una JUPÁ; y con todo, la unión completa se hace solo adentro, en la casa". Léalo despacio, porque es exacto: la sucá es el palio nupcial. Cuatro palos y un techo abierto al cielo — eso es una boda, no una casa. Y una boda es hermosa precisamente porque no dura: es el día en que todo es cobertura, promesa y luz de afuera. Shminí Atzéret es el día después de la boda, cuando los dos entran a la casa y cierran la puerta.`,
          `Una advertencia de integridad antes de seguir, porque este punto se malinterpreta: la conducta del Besht de no sentarse en la sucá ese día es la conducta de un tzadik, y el propio texto la explica diciendo que él "se santificaba con la santidad de la Tierra de Israel". No es una instrucción para nadie. La halajá para la diáspora sigue siendo la del Talmud: "nos sentamos en la sucá, pero no bendecimos" (Sucá 47a). Lo que aquí importa no es qué hizo el Besht con su comida, sino qué vio: que hay una diferencia real entre estar cubierto y estar adentro.`,
          `Y ahora el segundo movimiento del día, el que lo vuelve un círculo. Se termina la Torá. Se lee "ante los ojos de todo Israel" — el último versículo, el que cierra cinco libros, cuarenta años de desierto y la vida entera de Moshé. Y en el instante en que se cierra ese rollo, sin una pausa, sin un momento de duelo, se abre otro y se lee "En el principio creó Dios". Piense en lo que eso significa como gesto. Nadie hace eso con un libro. Uno termina un libro, lo cierra, lo deja reposar, deja que el final le haga efecto. La comunidad judía decidió, en algún momento de su historia, que con este libro no. Que entre la última palabra y la primera no puede haber silencio. Que si hay un segundo en que la Torá no se está leyendo, ese segundo es un hueco intolerable. Yeshayahu había dicho de la palabra divina: "לֹא־יָשׁוּב אֵלַי רֵיקָם" — "no volverá a Mí vacía" (55:11). El empalme de Simjat Torá es la comunidad tomándole la palabra: la palabra no vuelve vacía porque, sencillamente, no vuelve. Sigue.`,
          `Junte los dos movimientos y verá que son uno solo. Él pide "quédense un día más" porque no quiere que la relación termine. Nosotros empalmamos Devarim con Bereshit porque no queremos que el texto termine. La fiesta entera es un ejercicio contra los finales — y el hallazgo, el que la hace luminosa en vez de melancólica, es que la única manera de no terminar no es alargar, sino volver a empezar. Un día más no alcanza. Un círculo, sí.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de este día es una ley de la estructura, y el Admur HaZakén la enunció sin metáfora: "que se reúna y se recoja la luz envolvente para estar en el aspecto de interioridad" (Likutei Torá, Shminí Atzéret). Hay dos maneras de recibir luz. Una es estar rodeado por ella: la luz te cubre, te protege, te acompaña, pero no entra — es or makif, luz envolvente. La otra es que la luz entre y se vuelva parte tuya: or pnimí, luz interior. La primera es infinitamente mayor. La segunda es infinitamente más tuya. Toda la Cabalá se pasa la vida explicando la relación entre esas dos, y el calendario judío la escenifica en ocho días: siete de abrazo, uno de asimilación.`,
          `Aquí entra la lectura de Rav Yehuda Ashlag, Baal HaSulam, que leyó toda la Cabalá como una ciencia del deseo. Para él, la criatura es רָצוֹן לְקַבֵּל, voluntad de recibir, y solo puede recibir en la medida exacta de su vaso — de su carencia hecha forma. Una luz que excede al vaso no se pierde, pero tampoco entra: queda alrededor, envolviendo, esperando que el vaso crezca. Por eso la or makif no es un consuelo menor: es una promesa, la señal de que hay más luz destinada a uno de la que uno puede sostener todavía. Y por eso Sucot, la fiesta del abrazo, es también la fiesta más frágil: bajo la sucá uno es enorme y prestado a la vez. El octavo día es el momento en que una porción de esa luz se contrae hasta caber. Cabe menos. Pero lo que cabe, se queda.`,
          `Y hay un detalle final que sella el secreto, y es de agua. En Shminí Atzéret se dice por primera vez en el año "מַשִּׁיב הָרוּחַ וּמוֹרִיד הַגֶּשֶׁם", "el que hace soplar el viento y descender la lluvia" (Mishná Taanit 1:1-2). El Admur HaZakén conecta las dos cosas en una sola frase: la luz envolvente se interioriza, "y por eso se dice en Shminí Atzéret 'morid hagueshem'". Piénselo físicamente. La lluvia es agua que estaba arriba, difusa, en el aire, envolviendo todo el paisaje sin pertenecerle a nadie — y que de pronto cae, entra en la tierra, se vuelve raíz, savia, pan. Es la or makif convirtiéndose en or pnimí, dibujada por el clima. Y aquí se cierra el círculo con el Tikunei Zohar, que sobre este mismo día había escrito: "en él está el manantial de la Torá, para regar el Árbol" (29b). El día en que pedimos agua es el día en que la Torá brota. Y el nombre técnico del movimiento que arranca abajo y provoca la respuesta de arriba es el que ya conocemos: {{study:despertar-de-lo-alto|itaruta diletata e itaruta dile'ela}}. Pedimos lluvia; y la lluvia, en el lenguaje de este día, es Torá que entra.`,
        ],
      },
    ],
    caja: {
      titulo: "לֵב = 32 = los ל״ב נְתִיבוֹת. Siete días de abrazo; el octavo, adentro.",
      cuerpo:
        "La Torá termina en ל y empieza en ב: juntas, לֵב — corazón, 32, como los treinta y dos senderos con los que el Sefer Yetzirá dice que se creó el mundo. Setenta toros por las setenta naciones; uno solo por la nación única. Y una sola instrucción para el día: no te vayas todavía. Atzéret, que el Targum traduce kenishú — recoger hacia adentro lo que estuvo desplegado afuera.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no entra ninguna fuente nueva ni ningún comentario nuevo; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que el día más alto del ciclo es el que no tiene tarea. Toda mi vida religiosa se apoya en cosas que hacer: objetos, rezos, fechas, obligaciones. Este día me las quita todas a la vez y deja la pregunta desnuda: si me quitan el aparato, ¿queda relación? El Shem MiShmuel me contestó por adelantado, y su respuesta me incomoda de la manera correcta: lo que quedaba colgado de los objetos se cae con ellos; lo que quede cuando no hay objetos es lo único que va a durar el resto del año. Y me enseña algo más, algo que no esperaba de un texto religioso: que el Rey ruega. Que dice "por favor". Que confiesa que la despedida le duele. No estoy siendo tolerado. Estoy siendo extrañado.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón del embudo: setenta y luego uno; todas las naciones y luego esta mesa; siete días de despliegue y un día de recogimiento. La generosidad hacia afuera no es lo contrario de la intimidad — es su antesala, y en ese orden exacto. Primero se ofrenda por los setenta; solo después se cierra la puerta. Veo el patrón de las dos luces: rodeado no es lo mismo que lleno, y hay un momento en que lo grande tiene que hacerse pequeño para poder entrar. Y veo el patrón del círculo: la única forma de que algo no termine no es estirarlo, sino volver a empezarlo. Un día más nunca alcanza; por eso hay un año siguiente.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `La imagen de la sucá como jupá me toca directamente. Sé lo que es vivir de coberturas: momentos altos, retiros, días de fiesta, la sensación de estar envuelto por algo más grande que yo. Y sé lo que pasa cuando el momento se acaba y no queda nada adentro. La sucá no era la casa: era la boda. Este día me pregunta si hay casa. Y hay un consuelo escondido en la manera en que lo pregunta: la luz que no me cabe todavía no se pierde, se queda alrededor, esperando que yo crezca. La lluvia que cae hoy es la parte que ya me cabe. Bébala; el resto sigue arriba.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `El mundo se hizo en siete días y el siete es la rueda: la semana, la estación, el año, lo que vuelve. El ocho es el nombre de lo que no está atado a esa rueda — Abarbanel lo dijo en su lenguaje de esferas y sacó él mismo la moraleja: no le tengan miedo a los signos del cielo. Y la Torá que se cierra y se vuelve a abrir el mismo día dice lo mismo con letras: que el final no es un muro sino una curva. Kohélet lo escribió antes que nadie: "todo lo hizo hermoso en su tiempo; también puso el olam en el corazón de ellos" (3:11). Olam es a la vez mundo y eternidad, y el lugar donde fue puesto es el לב.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, quédate quince minutos de más con una sola persona — después de que la conversación ya se había terminado.",
    texto: `El día no pide una ofrenda: pide compañía sin tarea. Así que la práctica tiene que tener esa forma exacta, y no otra. Elige a UNA persona con la que hoy vayas a estar de todos modos: tu pareja, un hijo, tu madre, un amigo, el que sea. Y cuando la conversación llegue a su final natural —cuando ya se dijo lo que había que decir, cuando ya cada uno está mirando la puerta o el teléfono— no te vayas. Quédate quince minutos más, sin agenda, sin tema, sin nada que resolver. No es tiempo para aprovechar; es tiempo para gastar. Si te resulta incómodo, estás haciéndolo bien: esa incomodidad es exactamente la que el día viene a curar, porque revela cuánto de tu presencia estaba sostenida por tener algo que hacer.

Y si quieres hacerle sitio al segundo movimiento del día, agrega esto, que toma cinco minutos más y se hace solo: termina hoy algo que dejaste a medias y vuelve a empezarlo en el mismo acto. Un libro que abandonaste en la página cuarenta: léelo hasta el final o hasta donde puedas, y en cuanto lo cierres, abre el siguiente. Un estudio que dejaste: cierra el capítulo pendiente y empieza el que sigue antes de levantarte de la silla. La regla del día es que entre el final y el principio no haya silencio. Nadie está pidiéndote que hagas algo grande; te están pidiendo que no dejes hueco.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Después de siete días de Sucot con setenta toros por las setenta naciones (Bamidbar 29:13-32; Sucá 55b), la Torá añade un octavo día con un solo toro y sin mitzvá propia: "בַּיּוֹם הַשְּׁמִינִי עֲצֶרֶת תִּהְיֶה לָכֶם" (Bamidbar 29:35). Rashi lo explica con un rey que ruega: "quédense conmigo un día más, קָשָׁה עָלַי פְּרֵדַתְכֶם, me es difícil despedirme de ustedes" (a Vaikrá 23:36). Es la única fiesta del calendario cuyo contenido positivo es, sencillamente, permanecer.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Atzéret significa detenerse, y el Targum lo traduce kenishú: recoger. Eso es lo que ocurre. Durante Sucot la luz rodea desde fuera —la sucá es una jupá, cuatro palos y un techo abierto—; en el octavo día esa luz envolvente se recoge y entra: "שֶׁיִּתְאַסֵּף וְיִתְקַבֵּץ הָאוֹר מַקִּיף לִהְיוֹת בִּבְחִינַת פְּנִימִיּוּת" (Likutei Torá, Shminí Atzéret). Por eso es también el día en que se pide la lluvia: agua que estaba arriba, difusa, y que cae y se vuelve raíz.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El Shem MiShmuel resolvió la objeción que este día provoca —si duele despedirse, un día más solo empeora la despedida— con esto: sin el octavo día, el vínculo se habría caído junto con los objetos que lo sostenían; el día extra existe para que la relación pase de estar colgada de las mitzvot de la fiesta a estar dentro de la persona, y dure el año entero (14:21). Y el segundo movimiento lo completa: la Torá no se cierra, se enrolla. Termina en ל, empieza en ב, y juntas hacen לֵב = 32, como los treinta y dos senderos con los que se creó el mundo (Sefer Yetzirá 1:1). El final no es un muro: es una curva.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Quedarse hoy quince minutos de más con una sola persona, después de que la conversación ya terminó — tiempo sin agenda, sin tema, sin nada que resolver. Y terminar algo que dejaste a medias volviendo a empezarlo en el mismo acto, sin dejar hueco entre el final y el principio. La fiesta no pide una ofrenda; pide que no te vayas todavía.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal: el tercer verso del Cantar",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal, marcada como tal. La correspondencia que sigue no la trae ningún comentarista; la proponemos nosotros.",
    parrafos: [
      `Esta serie se ha leído desde el principio como el arco del Cantar de los Cantares. En {{study:elul|Elul}} el nombre del mes resultó ser el acróstico de "אֲנִי לְדוֹדִי וְדוֹדִי לִי" (Shir HaShirim 6:3): yo soy de mi Amado y mi Amado es mío — yo doy el primer paso, y Él responde. Ese verso tiene un hermano invertido en el mismo libro: "דּוֹדִי לִי וַאֲנִי לוֹ" (2:16), donde el que empieza es Él. Y tiene un tercero, que no dice ninguna de las dos cosas: "אֲנִי לְדוֹדִי וְעָלַי תְּשׁוּקָתוֹ" — "yo soy de mi Amado, y hacia mí es SU deseo" (7:11). Ahí el alma ya no reclama la contrapartida. Se da, y punto. Y justo entonces, sin que ella lo haya pedido, el deseo del Amado se vuelca sobre ella.`,
      `Nuestra lectura es esta: Shminí Atzéret es ese tercer verso. Piense en la secuencia del mes que acaba de terminar. En Elul yo salgo a buscar. En Rosh Hashaná lo corono. En Yom Kipur quedo limpio. En Sucot Él me abraza — y el propio Admur HaZakén abre su maamar de este día con el verso del abrazo, "su izquierda bajo mi cabeza y su derecha me abraza" (Shir HaShirim 2:6, verificado). Y entonces llega el octavo día, en el que yo no tengo nada que hacer: ni shofar, ni ayuno, ni lulav, ni cabaña. He soltado todos los instrumentos. Y en ese preciso momento, el que habla es Él, y lo que dice es "no te vayas". El que pide quedarse un día más ya no es el alma. Es Él. וְעָלַי תְּשׁוּקָתוֹ: hacia mí es Su deseo.`,
      `Que quede claro qué es dato y qué es lectura. Dato: el verso existe y dice eso (7:11, cotejado). Dato: Rashi pone en boca del Rey "me es difícil despedirme de ustedes" (a Vaikrá 23:36, cotejado). Dato: el Zohar hace que el Rey diga "yo y ustedes nos alegraremos un día" (Emor 45, cotejado). Dato: el maamar de este día abre con el Cantar. Lectura nuestra —y solo nuestra—: que esos cuatro hechos dibujan juntos el tercer grado del Cantar, y que por eso Shminí Atzéret es el remate del arco entero de Tishrei y no su apéndice. Nadie está obligado a leerlo así. Pero cuando se ordenan los cuatro datos en fila, cuesta no verlo.`,
      `Y hay una última cosa que la lectura explica, y es por qué esta fiesta no termina en melancolía. Si el arco acabara en 7:11, acabaría en un abrazo, y todo abrazo se suelta. Pero el día no acaba ahí: acaba enrollando la Torá hasta el principio y leyendo "En el principio creó Dios" antes de que nadie alcance a suspirar. El deseo de Él no se satisface con un día más — por eso hay un año más. Kohélet lo dijo con una precisión que asusta: "אֶת־הַכֹּל עָשָׂה יָפֶה בְעִתּוֹ, גַּם אֶת־הָעֹלָם נָתַן בְּלִבָּם" — "todo lo hizo hermoso en su tiempo; también puso el olam en el corazón de ellos" (3:11). Olam significa mundo y significa eternidad. Y el lugar donde la puso se llama לב.`,
    ],
  },

  hemshej: [
    "{{study:elul|Y el círculo vuelve a empezar: el mes en que el primer paso es mío. אֱלוּל son las iniciales de «yo soy de mi Amado y mi Amado es mío». Del último día de Tishrei al primero de Elul, sin hueco.}}",
    "{{study:despertar-de-lo-alto|Aquí la luz que rodeaba se hizo interior, y pedimos lluvia. ¿Qué se despierta desde abajo y qué baja regalado desde Arriba?}}",
    "{{study:exilio-redencion|Abarbanel leyó el toro único como el día de la reunión de los exiliados: un solo reino, un solo rey. Entre גּוֹלָה y גְּאוּלָּה hay una sola letra.}}",
    "{{letter:lamed|La Torá termina en lámed y empieza en bet. La lámed es la única letra que sube por encima del renglón: la torre que vuela.}}",
  ],

  ctaRef: "Numbers 29:35",
};
