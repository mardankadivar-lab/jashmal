import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — יוֹם הַכִּפּוּרִים · כִּי בַיּוֹם הַזֶּה יְכַפֵּר עֲלֵיכֶם
//  Serie «Tiempos Sagrados» (moadim) · Estudio 3 — Yom Kipur.
//
//  Hero en modo "par": צוֹם = קוֹל = 136 (verificado letra por letra; la
//  igualdad la enuncia el propio Arizal en Shaar HaKavanot, Derushei Yom
//  HaKipurim, drush 1: "צום בגי' קול").
//
//  FUENTES VERIFICADAS CONTRA LA API DE SEFARIA (2026-08-27, 14 de Elul 5786).
//  Todo el hebreo citado abajo se trajo de la API, no de memoria.
//
//  TANAJ
//   · Vaikrá 16:8 · 16:21-22 · 16:29-31 — texto puntuado cotejado.
//   · Yeshayahu 58:5-7 y 57:15 — la haftará del día.
//   · Yirmiyahu 17:13 — "מִקְוֵה יִשְׂרָאֵל ה'".
//   · Yeshayahu 1:18 — "אִם יִהְיוּ חֲטָאֵיכֶם כַּשָּׁנִים כַּשֶּׁלֶג יַלְבִּינוּ".
//
//  MISHNÁ Y TALMUD
//   · Mishná Yomá 6:1 — los dos machos cabríos idénticos "בְּמַרְאֶה וּבְקוֹמָה
//     וּבְדָמִים וּבִלְקִיחָתָן כְּאֶחָד". Cotejado.
//   · Mishná Yomá 6:8 — el hilo carmesí, en boca de Rabí Yishmael. Cotejado.
//   · Mishná Yomá 8:1 — la lista de las prohibiciones del día. Cotejado.
//   · Mishná Yomá 8:8-9 (= Yomá 85b) — "עֲבֵרוֹת שֶׁבֵּין אָדָם לַחֲבֵרוֹ אֵין
//     יוֹם הַכִּפּוּרִים מְכַפֵּר עַד שֶׁיְּרַצֶּה אֶת חֲבֵרוֹ" y Rabí Akivá:
//     "מִקְוֵה יִשְׂרָאֵל ה'". Cotejado palabra por palabra.
//   · Yomá 20a — Ramí bar Jamá: "הַשָּׂטָן בְּגִמַטְרִיָּא תְּלָת מְאָה
//     וְשִׁיתִּין וְאַרְבְּעָה הָוֵי". Cotejado.
//   · Yomá 39b — los cuarenta años antes de la destrucción (la suerte, el hilo
//     carmesí, la lámpara occidental) y Shimón HaTzadik y el anciano vestido de
//     blanco. Cotejado. ES BARAITA/AGADÁ, no halajá — así se dice en el texto.
//   · Yomá 85b y Shevuot 13a — la baraíta de Rabí ("בֵּין עָשָׂה תְּשׁוּבָה בֵּין
//     לֹא עָשָׂה תְּשׁוּבָה — יוֹם הַכִּפּוּרִים מְכַפֵּר") y la baraíta del Sifrá
//     ("לֹא הִתְעַנָּה בּוֹ… מִנַּיִן? תַּלְמוּד לוֹמַר: יוֹם כִּפֻּרִים הוּא —
//     מִכָּל מָקוֹם"). Ambas cotejadas.
//   · Yomá 87b — la Neilá ("נְעִילַת שְׁעָרִים"), Rav y Rabí Janiná trece
//     vísperas de Yom Kipur, Rabí Yosé bar Janiná ("no más de tres veces") y
//     Ravá ("כָּל הַמַּעֲבִיר עַל מִדּוֹתָיו — מַעֲבִירִין לוֹ עַל כָּל
//     פְּשָׁעָיו"). Cotejado.
//   · Rosh Hashaná 9b — "כְּאִילּוּ הִתְעַנָּה תְּשִׁיעִי וַעֲשִׂירִי". Cotejado.
//
//  MIDRASH Y COMENTARISTAS
//   · Pirkei deRabí Eliezer 46 — Ben Beterá: Moshé baja "בֶּעָשׂוֹר לַחֹדֶשׁ
//     בְּיוֹם הַכִּפּוּרִים"; y el discurso de Samael: "יֵשׁ לְךָ עַם אֶחָד
//     בָּאָרֶץ כְּמַלְאֲכֵי הַשָּׁרֵת שֶׁבַּשָּׁמַיִם". Cotejado entero.
//   · Rashi a Vaikrá 16:8 — las suertes y Azazel ("הַר עַז וְקָשֶׁה, צוּק
//     גָּבוֹהַּ"). Cotejado.
//     HONESTIDAD: Sefaria NO trae ningún Rashi a Vaikrá 16:30 (la consulta
//     devuelve texto vacío). No se le pone en la boca ni una palabra sobre el
//     versículo-ancla; se dice explícitamente que ahí calla.
//   · Ibn Ezra a Vaikrá 16:8 — el acertijo: "וְאִם יָכֹלְתָּ לְהָבִין הַסּוֹד
//     שֶׁהוּא אַחַר מִלַּת עֲזָאזֵל… בִּהְיוֹתְךָ בֶּן שְׁלֹשִׁים וְשָׁלֹשׁ
//     תֵּדָעֶנּוּ". Cotejado.
//   · Ramban a Vaikrá 16:8 — cita a Bereshit Rabá 65:10 y a Pirkei deRabí
//     Eliezer 46 (a los que él mismo rotula "ע"כ אַגָּדָה זוֹ"), y su propio
//     resguardo: "וְאֵין הַכַּוָּנָה בַּשָּׂעִיר הַמִּשְׁתַּלֵּחַ שֶׁיִּהְיֶה
//     קָרְבָּן מֵאִתָּנוּ אֵלָיו חָלִילָה, אֲבָל שֶׁתִּהְיֶה כַּוָּנָתֵנוּ
//     לַעֲשׂוֹת רְצוֹן בּוֹרְאֵנוּ שֶׁצִּוָּנוּ כָּךְ". Cotejado.
//   · Abarbanel a Vaikrá 16:1 — su método y el retrato del Kohén Gadol ("לֹא
//     הָיָה יָשֵׁן כָּל הַלַּיְלָה… עוֹמֵד לֹא יוֹשֵׁב"). Cotejado.
//   · Or HaJaim a Vaikrá 23:28 — la frase exacta "כִּי עִצּוּמוֹ שֶׁל יוֹם
//     מְכַפֵּר" y "וְיֵשׁ לְךָ אָדָם שֶׁהַזְּמַן מְכַפֵּר עָלָיו וְהוּא עָסוּק
//     בִּמְלַאכְתּוֹ". Cotejado.
//   · Rambam, Hiljot Teshuvá 1:3 ("וְעַצְמוֹ שֶׁל יוֹם הַכִּפּוּרִים מְכַפֵּר
//     לַשָּׁבִים"), 2:7 ("יוֹם הַכִּפּוּרִים הוּא זְמַן תְּשׁוּבָה לַכֹּל…
//     וְהוּא קֵץ מְחִילָה וּסְלִיחָה לְיִשְׂרָאֵל") y 2:9-2:10 (el prójimo, la
//     fila de tres, "וְזֶה שֶׁלֹּא מָחַל הוּא הַחוֹטֵא"). Cotejados.
//   · Shulján Aruj, Oraj Jaim 606:1 — "שֶׁיְּפַיֵּיס אָדָם חֲבֵירוֹ בְּעֶרֶב
//     יוֹם כִּפּוּר", con la glosa del Rema. Cotejado.
//   · Tania, Igueret HaTeshuvá 4 y 9 — "תָּשׁוּב ה׳", hei tata'á / hei ila'á, y
//     "דְּבִינָה אִיהִי תְּשׁוּבָה עִילָּאָה". Cotejado.
//   · Arizal — Shaar HaKavanot, Derushei Yom HaKipurim, drush 1. Cotejado en
//     Sefaria. Dice literalmente que en Yom Kipur la Nukvá sube hasta Imá Ilaá
//     y "אֵינֶנָּה מִתְפַּרְנֶסֶת… אֲכִילָה וּשְׁתִיָּה גּוּפָנִית… אֶלָּא
//     מֵהֶבֶל הַיּוֹצֵא מִפֶּה עֶלְיוֹן", y que por eso se nos mandaron los
//     cinco ayunos; y trae "צוֹם בְּגִימַטְרִיָּא קוֹל".
//   · Baal HaSulam, Hakdamá leSefer HaZohar §7-§9 — el rasón lekabel como toda
//     la sustancia creada, y el shinuí tzurá que separa "כְּמוֹ הַגַּרְזֶן".
//     Cotejado en Sefaria.
//   · Baal Shem Tov — "בִּמְקוֹם שֶׁמַּחֲשַׁבְתּוֹ שֶׁל אָדָם, שָׁם הוּא כֻּלּוֹ",
//     citado en su nombre por Ben Porat Yosef, Vayejí 181 ("כְּמוֹ שֶׁשָּׁמַעְתִּי
//     מִמּוֹרִי זלה"ה") y por Deguel Majané Efraim (Bereshit 9, Shemot 7).
//     Cotejado en ambos.
//
//  LO QUE SE DESCARTÓ, Y POR QUÉ
//   · La frase עִצּוּמוֹ שֶׁל יוֹם NO aparece en el Talmud con el sentido de
//     "el día mismo expía". En el Talmud (Suká 41b, Menajot 68b, Yomá 81a)
//     significa otra cosa: "el cuerpo del día", derivada de "עֶצֶם הַיּוֹם
//     הַזֶּה". La IDEA sí es talmúdica (Yomá 85b / Shevuot 13a); la FRASE es
//     posterior: el Rambam escribe עַצְמוֹ שֶׁל יוֹם y el Or HaJaim עִצּוּמוֹ
//     שֶׁל יוֹם. El estudio lo dice así, sin inventar un folio.
//   · לְבָנִים (blancos) = ל30+ב2+נ50+י10+ם40 = 132. No cierra con nada
//     relevante. DESCARTADA; no se usa.
//   · כִּפּוּר = כ20+פ80+ו6+ר200 = 306 y הַכִּפּוּרִים = 361. No cierran con
//     nada que valga la pena. DESCARTADAS.
//   · וִדּוּי = 26 (= el Nombre) es cierto en escritura defectiva, pero en
//     escritura plena (וידוי) da 36. Ambigua. DESCARTADA por no forzarla.
//   · Malbim: Sefaria no aloja comentario de Malbim a Vaikrá 16. No se le cita.
//
//  GEMATRÍAS CALCULADAS LETRA POR LETRA (script propio, no de memoria):
//    צוֹם = צ90+ו6+ם40 = 136 · קוֹל = ק100+ו6+ל30 = 136
//    הַשָּׂטָן = ה5+ש300+ט9+ן50 = 364 · 365 − 364 = 1
//
//  CUENTA DE LOS CUARENTA DÍAS (aritmética verificada, calendario fijo):
//    Av tiene siempre 30 días y Elul siempre 29. Rosh Jodesh Elul son DOS días
//    (30 de Av y 1 de Elul). Contando desde el primero de ellos:
//    1 (30 de Av) + 29 (todo Elul) + 10 (hasta el 10 de Tishrei) = 40 exactos.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "yom-kipur",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 3 — Yom Kipur · el día que perdona por sí mismo",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۳ — یوم کیپور · روزی که خودش می‌آمرزد",
    he: "כִּי בַיּוֹם הַזֶּה יְכַפֵּר עֲלֵיכֶם",
    titulo: "Yom Kipur — el día que ya perdona",
    tituloFa: "یوم کیپور — روزی که از پیش می‌بخشد",
    ganchoEs:
      "El perdón no se compra con el ayuno. El versículo no dice «por su ayuno se expiará»: dice «en este día». El ayuno no es el precio, es la consecuencia — porque durante veinticinco horas el alma se alimenta de otra parte y no necesita comer. Es el único día del año en que Israel se parece a los ángeles.",
    ganchoFa:
      "آمرزش با روزه خریده نمی‌شود. آیه نمی‌گوید «به سببِ روزهٔ شما»، می‌گوید «در این روز». روزه بها نیست، نتیجه است: بیست‌وپنج ساعت، روح از جای دیگری تغذیه می‌شود و به خوردن نیازی ندارد. تنها روزِ سال که اسرائیل شبیه فرشتگان است.",
    par: {
      a: { he: "צוֹם", rom: "tzom (ayuno)" },
      b: { he: "קוֹל", rom: "kol (voz)" },
      valor: "136",
    },
    fecha: "Yom Kipur 5787 · 21 sep 2026",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — tres cosas que este estudio NO afirma",
    rotulo:
      "Se dicen de entrada, antes de entrar en materia, para que nadie confunda una lectura con una fuente.",
    parrafos: [
      `Primero, sobre una frase famosa. En español se repite mucho que «el Talmud dice: עִצּוּמוֹ שֶׁל יוֹם, el día mismo expía». Verificado: esa frase, con ESE sentido, no está en el Talmud. En el Talmud la expresión "itzumó shel yom" aparece —en Suká 41b, en Menajot 68b, en Yomá 81a— con otro significado: «el cuerpo del día», derivada de la expresión bíblica "עֶצֶם הַיּוֹם הַזֶּה". La IDEA de que el día expía por sí mismo sí es talmúdica y se lee entera en Yomá 85b y en Shevuot 13a; pero la FRASE con la que hoy la nombramos es posterior: el Rambam escribe "עַצְמוֹ שֶׁל יוֹם" (Hiljot Teshuvá 1:3) y el Or HaJaim, "עִצּוּמוֹ שֶׁל יוֹם" (a Vaikrá 23:28). Aquí se citan las dos cosas por separado: la idea con su folio, la frase con su autor.`,
      `Segundo, sobre lo que la idea NO significa. Hay una discusión abierta entre los Sabios: Rabí (Yehudá HaNasí) sostiene que el día expía se haya hecho teshuvá o no; Rabí Yehudá sostiene que solo expía para quienes vuelven. La halajá no siguió a Rabí: el Rambam escribe "וְעַצְמוֹ שֶׁל יוֹם הַכִּפּוּרִים מְכַפֵּר לַשָּׁבִים" — el día mismo expía PARA LOS QUE VUELVEN. Este estudio no dice que no haya nada que hacer. Dice algo más fino: que lo que hay que hacer no es pagar.`,
      `Tercero, sobre el hilo carmesí que se volvía blanco. No es halajá ni es del cuerpo principal de la Mishná: es un dato que Rabí Yishmael aporta como señal (Mishná Yomá 6:8), y su continuación —que durante los cuarenta años previos a la destrucción del Templo dejó de blanquear— es una baraíta de carácter agádico (Yomá 39b). Se cita como lo que es: relato, no legislación. El Ramban hace lo mismo con el midrash de Samael que aparece más abajo: lo copia entero y luego escribe "עַד כָּאן אַגָּדָה זוֹ" — «hasta aquí esta agadá».`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — seis textos y un solo corte",
    intro: [
      `Antes de recorrerlo, el esqueleto. El estudio se sostiene sobre seis textos verificados. Los cinco primeros construyen la misma afirmación desde ángulos distintos: el día perdona por su propia esencia. El sexto le hace un corte limpio y decide toda la parte práctica.`,
    ],
    filas: [
      {
        ref: "Vaikrá 16:30",
        he: "כִּי בַיּוֹם הַזֶּה יְכַפֵּר עֲלֵיכֶם",
        es: "Porque en este día se expiará sobre ustedes",
        funcion: "El sujeto de la frase es el DÍA, no el ayuno ni el ruego.",
      },
      {
        ref: "Vaikrá 16:29 · 16:31",
        he: "תְּעַנּוּ אֶת נַפְשֹׁתֵיכֶם",
        es: "Afligirán sus almas",
        funcion: "La Torá nunca ordena ayunar. Ordena afligir el ALMA.",
      },
      {
        ref: "Shevuot 13a (baraíta del Sifrá)",
        he: "לֹא הִתְעַנָּה בּוֹ… יוֹם כִּפֻּרִים הוּא — מִכָּל מָקוֹם",
        es: "Aunque no haya ayunado… «es Yom Kipur» — de todos modos",
        funcion: "La prueba textual: el día expía incluso sin el ayuno.",
      },
      {
        ref: "Vaikrá 16:8 · Mishná Yomá 6:1",
        he: "גּוֹרָל אֶחָד לַה' וְגוֹרָל אֶחָד לַעֲזָאזֵל",
        es: "Una suerte para YHVH y una suerte para Azazel",
        funcion: "Dos machos cabríos idénticos. Solo la suerte los separa.",
      },
      {
        ref: "Pirkei deRabí Eliezer 46",
        he: "עַם אֶחָד בָּאָרֶץ כְּמַלְאֲכֵי הַשָּׁרֵת",
        es: "Un pueblo en la tierra como los ángeles del servicio",
        funcion: "Por qué no comen: no es castigo, es semejanza.",
      },
      {
        ref: "Mishná Yomá 8:9",
        he: "עַד שֶׁיְּרַצֶּה אֶת חֲבֵרוֹ",
        es: "Hasta que apacigüe a su prójimo",
        funcion: "El corte: lo que le debes a una persona, el día NO lo cubre.",
      },
    ],
    cierre: [
      `Cinco textos abren una puerta que nadie tuvo que pagar. El sexto señala la única cosa que esa puerta no abre — y que, por eso mismo, hay que abrir a mano.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "Versículo-ancla — Vaikrá (Levítico) 16:30",
        he: "כִּֽי־בַיּ֥וֹם הַזֶּ֛ה יְכַפֵּ֥ר עֲלֵיכֶ֖ם לְטַהֵ֣ר אֶתְכֶ֑ם מִכֹּל֙ חַטֹּ֣אתֵיכֶ֔ם לִפְנֵ֥י יְהֹוָ֖ה תִּטְהָֽרוּ׃",
        es: "Porque en este día se expiará sobre ustedes, para purificarlos: de todos sus pecados, delante de YHVH quedarán puros.",
        source: "Vaikrá 16:30",
      },
      {
        label: "La orden que no dice «ayunen» — Vaikrá 16:29 y 16:31",
        he: "בַּחֹ֣דֶשׁ הַ֠שְּׁבִיעִ֠י בֶּֽעָשׂ֨וֹר לַחֹ֜דֶשׁ תְּעַנּ֣וּ אֶת־נַפְשֹֽׁתֵיכֶ֗ם וְכׇל־מְלָאכָה֙ לֹ֣א תַעֲשׂ֔וּ… שַׁבַּ֨ת שַׁבָּת֥וֹן הִיא֙ לָכֶ֔ם וְעִנִּיתֶ֖ם אֶת־נַפְשֹׁתֵיכֶ֑ם חֻקַּ֖ת עוֹלָֽם׃",
        es: "En el mes séptimo, a los diez del mes, afligirán sus almas y no harán ninguna labor… Es para ustedes un shabat de shabatot, y afligirán sus almas: ley perpetua.",
        source: "Vaikrá 16:29 · 16:31",
      },
      {
        label: "Las dos suertes — Vaikrá 16:8",
        he: "וְנָתַ֧ן אַהֲרֹ֛ן עַל־שְׁנֵ֥י הַשְּׂעִירִ֖ם גֹּרָל֑וֹת גּוֹרָ֤ל אֶחָד֙ לַיהֹוָ֔ה וְגוֹרָ֥ל אֶחָ֖ד לַעֲזָאזֵֽל׃",
        es: "Y pondrá Aharón sobre los dos machos cabríos suertes: una suerte para YHVH y una suerte para Azazel.",
        source: "Vaikrá 16:8",
      },
      {
        label: "El corte — Mishná Yomá 8:9",
        he: "עֲבֵרוֹת שֶׁבֵּין אָדָם לַמָּקוֹם, יוֹם הַכִּפּוּרִים מְכַפֵּר. עֲבֵרוֹת שֶׁבֵּין אָדָם לַחֲבֵרוֹ, אֵין יוֹם הַכִּפּוּרִים מְכַפֵּר, עַד שֶׁיְּרַצֶּה אֶת חֲבֵרוֹ… אָמַר רַבִּי עֲקִיבָא: אַשְׁרֵיכֶם יִשְׂרָאֵל, לִפְנֵי מִי אַתֶּם מִטַּהֲרִין, וּמִי מְטַהֵר אֶתְכֶם? אֲבִיכֶם שֶׁבַּשָּׁמַיִם… מִקְוֵה יִשְׂרָאֵל ה'.",
        es: "Las transgresiones entre el hombre y el Omnipresente, Yom Kipur las expía. Las transgresiones entre el hombre y su prójimo, Yom Kipur NO las expía hasta que apacigüe a su prójimo… Dijo Rabí Akivá: felices ustedes, Israel; ¿delante de quién se purifican y quién los purifica? Su Padre que está en los cielos… «La mikvé de Israel es YHVH» (Yirmiyahu 17:13).",
        source: "Mishná Yomá 8:9 (= Talmud, Yomá 85b)",
      },
      {
        label: "La haftará que ataca el ayuno — Yeshayahu 58:5-6",
        he: "הֲכָזֶ֗ה יִֽהְיֶה֙ צ֣וֹם אֶבְחָרֵ֔הוּ י֛וֹם עַנּ֥וֹת אָדָ֖ם נַפְשׁ֑וֹ… הֲל֣וֹא זֶה֮ צ֣וֹם אֶבְחָרֵ֒הוּ֒ פַּתֵּ֙חַ֙ חַרְצֻבּ֣וֹת רֶ֔שַׁע הַתֵּ֖ר אֲגֻדּ֣וֹת מוֹטָ֑ה וְשַׁלַּ֤ח רְצוּצִים֙ חׇפְשִׁ֔ים וְכׇל־מוֹטָ֖ה תְּנַתֵּֽקוּ׃",
        es: "¿Es este el ayuno que Yo escojo, un día en que el hombre aflija su alma…? ¿No es más bien este el ayuno que Yo escojo: soltar las ataduras de la injusticia, desatar las coyundas del yugo, dejar libres a los oprimidos y romper todo yugo?",
        source: "Yeshayahu 57:14–58:14 (haftará de Yom Kipur) · vv. 5-6",
      },
    ],
    parrafos: [
      `Empieza por leer el versículo-ancla despacio, porque casi todo el estudio está ahí y casi nadie lo oye. «כִּי בַיּוֹם הַזֶּה יְכַפֵּר עֲלֵיכֶם» — «porque EN ESTE DÍA se expiará sobre ustedes». Fíjate en lo que la frase no dice. No dice «por su ayuno se expiará sobre ustedes». No dice «por sus oraciones», ni «por su arrepentimiento», ni «por el sacrificio del Kohén Gadol». Dice: en este día. El día es el instrumento. El día es lo que hace el trabajo. Y el verbo que sigue no es jurídico sino de baño: לְטַהֵר, «para purificarlos», la palabra que la Torá usa para el agua y la ceniza, no para el tribunal. Vas a un juicio a ser absuelto; vas a una mikvé a quedar limpio. Yom Kipur, según su propio versículo, es lo segundo.`,
      `Segundo detalle, y es más incómodo. En toda la Torá no existe la orden «ayunen en Yom Kipur». Lo que está escrito es «תְּעַנּוּ אֶת נַפְשֹׁתֵיכֶם» — «afligirán sus ALMAS» (Vaikrá 16:29 y 16:31). Quien tradujo eso a conducta concreta fue la Mishná: «Yom Kipur está prohibido en comida, en bebida, en lavarse, en ungirse, en calzar sandalia y en la relación conyugal» (Yomá 8:1). Son seis prohibiciones que la tradición cuenta como cinco aflicciones, porque comida y bebida van juntas. Y son, todas, cosas del cuerpo. La orden apunta al alma; las prácticas tocan el cuerpo. Entre las dos hay un espacio, y todo este estudio vive en ese espacio.`,
      `Ahora la fecha, porque el calendario aquí no es decorado. Yom Kipur cae el 10 de Tishrei, y ese día es exactamente el día cuarenta de la cuenta que empezó en {{study:elul|Rosh Jodesh Elul}}. La aritmética cierra sin trampa: Rosh Jodesh Elul son dos días (el 30 de Av y el 1 de Elul), Av siempre tiene 30 días y Elul siempre 29 — de modo que contando desde el primero de esos dos días son 1 + 29 + 10 = 40 días exactos hasta el 10 de Tishrei. ¿Qué pasó el día cuarenta? Lo dice Ben Beterá en Pirkei deRabí Eliezer 46: «cuarenta días hizo Moshé en el monte… y después de los cuarenta días tomó la Torá y bajó a los diez del mes, EN YOM KIPUR». Bajó con las segundas tablas. Es decir: la fiesta del perdón es el aniversario de una reconciliación que ocurrió DESPUÉS de un desastre. Las primeras tablas fueron un regalo intacto y se rompieron. Las segundas se dieron a un pueblo que ya había fallado — y son las que duraron.`,
      `El capítulo 16 de Vaikrá describe el servicio de ese día en el Templo, y hay un detalle que conviene no pasar por alto. El Kohén Gadol toma dos machos cabríos y echa sobre ellos suertes: «una suerte para YHVH y una suerte para Azazel». Uno será ofrenda; el otro cargará sobre sí «todas las iniquidades de los hijos de Israel» y será enviado al desierto (16:21-22). Y la Mishná agrega la precisión que lo vuelve vertiginoso: los dos machos cabríos deben ser «iguales en aspecto, en altura, en precio, y comprados a la vez» (Yomá 6:1). Idénticos. Nada en el animal decide su destino. Lo decide la suerte que le cae encima.`,
      `Y entonces llega el corte. La última mishná del tratado Yomá —la que se lee todos los años y que nunca deja de doler— pone un límite exacto a todo lo anterior: «Las transgresiones entre el hombre y el Omnipresente, Yom Kipur las expía. Las transgresiones entre el hombre y su prójimo, Yom Kipur NO las expía, hasta que apacigüe a su prójimo» (Yomá 8:9). Léelo otra vez. El día que expía «de todos sus pecados» tiene una excepción, y la excepción es la parte de la vida donde uno más ensucia: la gente. Lo que le debes a una persona no lo cubre el calendario. Ninguna cantidad de ayuno, ninguna oración, ninguna Neilá con las puertas cerrándose te libra de una llamada telefónica que no quieres hacer.`,
      `Y por si quedaba duda, la haftará del día es un ataque frontal al ayuno mismo. Yeshayahu, que se lee en la mañana de Yom Kipur, dice a un pueblo que ayuna: «¿Es ESTE el ayuno que Yo escojo, un día en que el hombre aflija su alma, doblar como junco la cabeza y tender saco y ceniza? ¿A eso le llamas ayuno, día de favor para YHVH?». Y contesta él mismo: «Este es el ayuno que Yo escojo: soltar las ataduras de la injusticia, desatar las coyundas del yugo, dejar libres a los oprimidos… partir tu pan con el hambriento, meter en casa a los pobres sin techo» (58:5-7). El día más solemne del año lee, en voz alta y frente a todos, un texto que dice que el ayuno solo no vale nada. Eso no es una contradicción de la liturgia: es su tesis.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Honestidad primero, porque es más elocuente que cualquier cita: sobre el versículo-ancla (16:30) Rashi NO comenta nada. Ni una palabra. Donde sí habla es sobre las suertes (16:8), y lo hace en el registro más sobrio posible: «coloca uno a la derecha y otro a la izquierda, pone sus dos manos en la urna, toma una suerte con la derecha y la otra con la izquierda y las pone sobre ellos; aquel sobre el que quedó escrito "para el Nombre" es para el Nombre, y aquel sobre el que quedó "para Azazel" es enviado a Azazel». Y sobre Azazel: «es un monte fuerte y duro, un risco alto, como está dicho "tierra cortada"». Rashi describe el procedimiento, sitúa el lugar geográfico, y calla ante el misterio. Esa reticencia es su enseñanza: el rito primero se hace, y el sentido del rito se discute después. Quien empieza por el sentido suele terminar sin el rito y sin el sentido.`,
      },
      {
        etiqueta: "Ibn Ezra (אַבְּן עֶזְרָא) — el acertijo.",
        texto: `Ibn Ezra revisa las explicaciones de Azazel —el Gaón dice que es el nombre de un monte, porque el nombre viene de "az", fuerte; otros dicen que es un monte cercano al Sinaí— y entonces hace algo insólito. Se detiene, baja la voz y escribe: «וְאִם יָכֹלְתָּ לְהָבִין הַסּוֹד שֶׁהוּא אַחַר מִלַּת עֲזָאזֵל תֵּדַע סוֹדוֹ וְסוֹד שְׁמוֹ… וַאֲנִי אֲגַלֶּה לְךָ קְצָת הַסּוֹד בְּרֶמֶז: בִּהְיוֹתְךָ בֶּן שְׁלֹשִׁים וְשָׁלֹשׁ תֵּדָעֶנּוּ» — «si puedes entender el secreto que está DESPUÉS de la palabra Azazel, conocerás su secreto y el secreto de su nombre… y te revelaré parte del secreto por alusión: cuando tengas treinta y tres, lo sabrás». No habla de edad. Habla de contar. Cuenta treinta y tres versículos hacia adelante desde este, y llegas a Vaikrá 17:7: «y no ofrecerán más sus sacrificios a los se'irim, tras los cuales se descarrían». Ese es el secreto: la Torá pone el macho cabrío al desierto y, treinta y tres versículos después, prohíbe terminantemente sacrificar a los se'irim. Lo que hace el Kohén Gadol se parece peligrosamente a lo que está prohibido — y la diferencia entera está en quién lo ordenó.`,
      },
      {
        etiqueta: "Ramban (רַמְבַּ\"ן) — el que sí lo dice.",
        texto: `Ramban lee ese acertijo y decide romperlo. Su frase es memorable: «Rabí Abraham es un espíritu fiel que cubre las cosas, y yo soy el chismoso que revela su secreto — porque ya lo revelaron nuestros Maestros en muchos lugares». Y lo revela: cita Bereshit Rabá 65:10 («"y cargará el macho cabrío sobre sí" — este es Esav… "todas sus iniquidades" — las iniquidades del "tam", de Yaakov, el hombre íntegro») y copia entero Pirkei deRabí Eliezer 46, ese midrash extraordinario en el que Samael se queja ante Dios de que sobre Israel no tiene permiso, y describe por qué: «tienes un pueblo en la tierra COMO LOS ÁNGELES DEL SERVICIO en los cielos: como los ángeles del servicio andan descalzos, así Israel anda descalzo en Yom Kipur; como los ángeles del servicio no tienen comida ni bebida, así Israel no tiene comida ni bebida en Yom Kipur; como los ángeles del servicio están de pie, así Israel está de pie en Yom Kipur; como entre los ángeles del servicio la paz media entre ellos, así entre Israel media la paz en Yom Kipur; como los ángeles del servicio están limpios de todo pecado, así Israel está limpio de todo pecado en Yom Kipur». Y en cuanto termina de copiarlo, el Ramban escribe con toda intención: «עַד כָּאן אַגָּדָה זוֹ» — «hasta aquí esta agadá». Es un maestro marcando el género de lo que acaba de citar. Luego pone su propio resguardo, y es el corazón de todo: «וְאֵין הַכַּוָּנָה בַּשָּׂעִיר הַמִּשְׁתַּלֵּחַ שֶׁיִּהְיֶה קָרְבָּן מֵאִתָּנוּ אֵלָיו חָלִילָה, אֲבָל שֶׁתִּהְיֶה כַּוָּנָתֵנוּ לַעֲשׂוֹת רְצוֹן בּוֹרְאֵנוּ שֶׁצִּוָּנוּ כָּךְ» — «la intención en el macho cabrío enviado NO es que sea una ofrenda nuestra a él, Dios libre; sino que nuestra intención sea hacer la voluntad de nuestro Creador, que así nos ordenó». Dos actos idénticos por fuera; los separa solamente hacia dónde apunta la voluntad. Exactamente igual que los dos machos cabríos idénticos, que solo la suerte separa.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבַּנְאֵל) — el retrato del hombre.",
        texto: `Abarbanel, fiel a su método, anuncia antes de empezar que va a describir «toda la avodá sagrada en su conjunto y su orden, según indican los versículos y la recepción de nuestros Sabios, tal como viene en el tratado Yomá», y solo DESPUÉS hará las preguntas. Y en esa descripción hay un párrafo que vale por un tratado entero de espiritualidad, porque baja el día del cielo al cuerpo de un hombre concreto. Recuerda que al Kohén Gadol lo separaban siete días antes; que la noche de Yom Kipur no lo dejaban dormir; que no lo dejaban comer mucho en la comida de la víspera; y entonces resume: «de aquí se ve cuánto esfuerzo padecía el Kohén Gadol en este día, porque él no dormía en toda la noche, y comía poco en la comida final, y ayunaba ese día, y todo el día desde la mañana hasta la tarde estaba fatigado en su servicio, DE PIE, NO SENTADO». El hombre más alto del sistema es, ese día, el que menos duerme, el que menos come y el único al que no se le permite sentarse. Es una definición del sacerdocio, y no es cómoda.`,
      },
      {
        etiqueta: "El Talmud (יוֹמָא פ\"ה ב · שְׁבוּעוֹת י\"ג א) — la discusión que lo decide todo.",
        texto: `Aquí está el nervio del asunto, y hay que oírlo entero porque la conclusión popular suele ser la mitad. La Mishná dice: «la muerte y Yom Kipur expían JUNTO CON la teshuvá» — o sea, con teshuvá sí, por sí solos no. Y la Guemará pregunta de inmediato: ¿entonces la Mishná no está de acuerdo con Rabí? Porque se enseñó en una baraíta: «רַבִּי אוֹמֵר: עַל כָּל עֲבֵרוֹת שֶׁבַּתּוֹרָה, בֵּין עָשָׂה תְּשׁוּבָה בֵּין לֹא עָשָׂה תְּשׁוּבָה — יוֹם הַכִּפּוּרִים מְכַפֵּר» — «Rabí dice: por todas las transgresiones de la Torá, haya hecho teshuvá o no haya hecho teshuvá, Yom Kipur expía», con solo tres excepciones (quien se sacude el yugo, quien tuerce la Torá y quien anula el pacto de la carne). Y la respuesta de la Guemará es una de las frases más asombrosas del Talmud: «תְּשׁוּבָה בָּעֲיָא יוֹם הַכִּפּוּרִים, יוֹם הַכִּפּוּרִים לָא בָּעֲיָא תְּשׁוּבָה» — «la teshuvá NECESITA a Yom Kipur; Yom Kipur no necesita a la teshuvá». En Shevuot 13a la discusión se amplía y aparece la prueba textual más filosa de todas, una baraíta del Sifrá: «¿Podría pensarse que Yom Kipur solo expía si ayunó en él, y lo llamó convocación santa, y no hizo trabajo en él? Si NO ayunó en él, y NO lo llamó convocación santa, e HIZO trabajo en él, ¿de dónde? Dice el versículo: "יוֹם כִּפֻּרִים הוּא" — "es Yom Kipur", de todos modos». Que quede escrito con todas sus letras: hay una posición tanaítica, registrada dos veces, según la cual el día expía incluso a quien lo pasó comiendo y trabajando. La halajá no siguió esa posición hasta el final. Pero la conservó, y la conservó porque dice una verdad sobre la naturaleza del día que la posición contraria no dice: el día no es un mecanismo que uno acciona. El día es.`,
      },
      {
        etiqueta: "El Or HaJaim (אוֹר הַחַיִּים) — la frase, y su filo.",
        texto: `Quien pone a esa idea el nombre con que hoy la conocemos es Rabí Jaim ben Atar, comentando por qué la Torá prohíbe trabajar en Yom Kipur: «"וְכָל מְלָאכָה לֹא תַעֲשׂוּ", y la razón es "כִּי יוֹם כִּפּוּרִים הוּא" — פֵּרוּשׁ: כִּי עִצּוּמוֹ שֶׁל יוֹם מְכַפֵּר», «es decir: porque el día mismo expía». Y entonces suelta la línea que debería incomodar a cualquiera que crea que el perdón se gana: «וְיֵשׁ לְךָ אָדָם שֶׁהַזְּמַן מְכַפֵּר עָלָיו וְהוּא עָסוּק בִּמְלַאכְתּוֹ» — «y hay hombres sobre los cuales el TIEMPO expía mientras ellos están ocupados en su trabajo». La comparación que trae es exquisita: no se recitan versículos mientras los sacerdotes bendicen al pueblo, porque «¿acaso hay un siervo al que bendicen y no escucha?». Por eso está prohibido trabajar: no porque el trabajo cancele el perdón, sino porque es una grosería estar de espaldas mientras te están bendiciendo.`,
      },
      {
        etiqueta: "El Rambam / Maimónides (הָרַמְבַּ\"ם) — dónde aterriza la halajá.",
        texto: `El Rambam ordena todo esto con su precisión habitual, y lo hace en tres movimientos. Primero fija la esencia: «וְעַצְמוֹ שֶׁל יוֹם הַכִּפּוּרִים מְכַפֵּר לַשָּׁבִים, שֶׁנֶּאֱמַר "כִּי בַיּוֹם הַזֶּה יְכַפֵּר עֲלֵיכֶם"» — «el día mismo de Yom Kipur expía PARA LOS QUE VUELVEN, como está dicho: "porque en este día se expiará sobre ustedes"» (Hiljot Teshuvá 1:3). Ahí está la síntesis halájica: el día expía por sí mismo, y la teshuvá no lo compra, lo recibe. Segundo, define el día: «יוֹם הַכִּפּוּרִים הוּא זְמַן תְּשׁוּבָה לַכֹּל, לַיָּחִיד וְלָרַבִּים, וְהוּא קֵץ מְחִילָה וּסְלִיחָה לְיִשְׂרָאֵל» — «Yom Kipur es el tiempo de teshuvá PARA TODOS, para el individuo y para la comunidad, y es la culminación del perdón y la absolución para Israel» (2:7); y por eso todos están obligados a confesar, empezando la víspera antes de comer, «no sea que se ahogue en la comida antes de confesar». Y tercero, el corte: «אֵין הַתְּשׁוּבָה וְלֹא יוֹם הַכִּפּוּרִים מְכַפְּרִין אֶלָּא עַל עֲבֵרוֹת שֶׁבֵּין אָדָם לַמָּקוֹם… אֲבָל עֲבֵרוֹת שֶׁבֵּין אָדָם לַחֲבֵרוֹ… אֵינוֹ נִמְחָל לוֹ לְעוֹלָם עַד שֶׁיִּתֵּן לַחֲבֵרוֹ מַה שֶּׁהוּא חַיָּב לוֹ וִירַצֵּהוּ» — «no se le perdona JAMÁS hasta que le dé a su prójimo lo que le debe y lo apacigüe» (2:9). Y añade el procedimiento: si el otro no perdona, se vuelve con tres amigos, y una segunda y una tercera vez; y si aun así no perdona, «מְנִיחוֹ וְהוֹלֵךְ לוֹ, וְזֶה שֶׁלֹּא מָחַל הוּא הַחוֹטֵא» — «lo deja y se va, y el que no perdonó es ahora él el pecador». En 2:10 lo remata: «está prohibido ser cruel y no dejarse apaciguar». El Shulján Aruj lo codificó como ley con un título que no admite lectura simbólica: «שֶׁיְּפַיֵּיס אָדָם חֲבֵירוֹ בְּעֶרֶב יוֹם כִּפּוּר» — «que el hombre apacigüe a su prójimo en la víspera de Yom Kipur» (Oraj Jaim 606:1).`,
      },
      {
        etiqueta: "El Arizal (הָאֲרִ\"י) — por qué el alma no necesita comer.",
        texto: `Y ahora la razón estructural, que es donde la Cabalá luriana explica el ayuno de un modo que lo saca por completo del terreno del castigo. En Shaar HaKavanot, Derushei Yom HaKipurim, el Arizal (por pluma de Rabí Jaim Vital) enseña que todo el año la Nukvá —la Presencia, el receptáculo de abajo— se alimenta a través de un canal exterior, y que ese alimento es lo que nosotros llamamos comer y beber, y por eso bendecimos sobre ello. Pero en Yom Kipur ocurre otra cosa: ella «צְרִיכָה לַעֲלוֹת עַד אִימָּא עִילָּאָה מַמָּשׁ», tiene que subir hasta la Madre superior misma —Biná—, y entonces, dice el texto con todas sus letras, «כֵּיוָן שֶׁעָלְתָה שָׁם אֵינֶנָּה מִתְפַּרְנֶסֶת מִן אִימָּא אֲכִילָה וּשְׁתִיָּה גּוּפָנִית מֵחִיצוֹנִיּוּתָהּ כְּבַתְּחִלָּה… וְאֵינָהּ נִיזּוֹנֵת אֶלָּא מֵהֶבֶל הַיּוֹצֵא מִפֶּה עֶלְיוֹן» — «una vez que subió allí, ya NO se sustenta con comida y bebida corporales como antes… y no se alimenta sino del hálito que sale de la boca superior». Y de ahí saca la conclusión, que es la tesis de este estudio dicha en lenguaje luriano: «וְלָכֵן נִצְטַוֵּינוּ בְּה' מִינֵי עִנּוּיִים אֵלּוּ שֶׁהֵם אֲכִילָה וּשְׁתִיָּה, כִּי נִתְבַּטְּלוּ מִמֶּנָּה עַתָּה בְּיוֹם הַכִּפּוּרִים» — «por eso se nos ordenaron estas cinco aflicciones, que son comida y bebida: PORQUE AHORA, EN YOM KIPUR, ESAS COSAS QUEDARON ANULADAS PARA ELLA». Lee bien el orden causal. No ayunamos para conseguir algo. Ayunamos porque el canal por el que normalmente entra el alimento está, ese día, fuera de servicio — y el alma se alimenta de otro sitio, más alto. El Arizal completa el sistema con dos correspondencias verificables: a las cinco aflicciones corresponden las cinco oraciones del día (Yom Kipur es el único del año que tiene cinco, porque añade la Neilá), y las oraciones son «kolot», voces, hálitos que salen de la boca. Y anota la gematría: «צוֹם בְּגִימַטְרִיָּא קוֹל» — ayuno equivale a voz. Verificado letra por letra: צ90+ו6+ם40 = 136, y ק100+ו6+ל30 = 136. El ayuno no es una privación: es la forma que toma una voz cuando el cuerpo se calla.`,
      },
    ],
    glosa: `Glosa para el lector: Kipur / kapará = expiación, del verbo כפר, "cubrir, limpiar". Teshuvá = literalmente "retorno", no "penitencia". Kohén Gadol = el sumo sacerdote. Azazel = el destino del segundo macho cabrío; Rashi y el Ramban lo leen como un risco escarpado en el desierto, y hay una discusión antigua sobre su sentido. Se'irim = literalmente "peludos"; en Vaikrá 17:7 designa objetos de culto prohibidos. Neilá = "cierre", la quinta y última oración de Yom Kipur, llamada así por el cierre de las puertas. Vidui = confesión. Agadá = el registro narrativo y homilético de los Sabios, distinto del halájico (legislativo). Nukvá / Imá Ilaá = en el lenguaje del Arizal, el receptáculo de abajo y la "Madre superior" (Biná). Bein adam laMakom / bein adam lajaveró = "entre el hombre y el Omnipresente" / "entre el hombre y su prójimo": la división que organiza toda la halajá del perdón.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, los hechos son cinco y ninguno requiere interpretación. Primero: el versículo dice que la expiación ocurre «en este día», sin nombrar como causa ni el ayuno ni la oración (Vaikrá 16:30). Segundo: la Torá no ordena ayunar sino «afligir el alma», y la lista de seis prácticas —comida, bebida, lavado, unción, calzado, relación conyugal— es de la Mishná (Yomá 8:1), no del texto bíblico. Tercero: existe una posición tanaítica registrada, la de Rabí, según la cual el día expía incluso sin teshuvá, y una baraíta del Sifrá según la cual expía incluso a quien no ayunó ni guardó el día (Yomá 85b; Shevuot 13a). Cuarto: la halajá final no siguió esa posición hasta el extremo, y el Rambam formula la síntesis: «el día mismo expía para los que vuelven» (Hiljot Teshuvá 1:3). Quinto: sea cual sea la posición, todas coinciden en una excepción — lo que es entre un hombre y su prójimo, el día no lo expía (Yomá 8:9; Rambam 2:9; Shulján Aruj, Oraj Jaim 606:1).`,
          `De esos cinco hechos se sigue el pshat del día, y es exactamente al revés de como se lo suele contar. Yom Kipur no es un examen que se aprueba sufriendo. Es un día que ya perdona, y al que hay que llegar habiendo hecho a mano la única cosa que él no hace.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números y los colores)",
        parrafos: [
          `Primera alusión, y es la del hero, porque resume la tesis en dos palabras. צוֹם, «tzom», ayuno: צ90 + ו6 + ם40 = 136. קוֹל, «kol», voz: ק100 + ו6 + ל30 = 136. La igualdad no la inventamos aquí — la enuncia el propio Arizal en Shaar HaKavanot, y aquí simplemente se comprobó letra por letra. Y su sentido, en el sistema del que viene, es preciso: el alma se alimenta ese día «del hálito que sale de la boca superior», y las cinco oraciones son cinco voces. El ayuno vale lo mismo que la voz porque ES la voz: la forma que adopta un pedido cuando ya no queda cuerpo con qué decirlo. Un ayuno que no es voz de nada es solo hambre — y contra eso, exactamente, predica la haftará del día.`,
          `Segunda alusión, y esta es del Talmud mismo. Yomá 20a trae una escena breve: preguntan qué dice el Satán cuando Israel peca, y la respuesta es que «el Satán, en el día de Kipur, no tiene permiso para acusar». ¿De dónde? Responde Ramí bar Jamá: «הַשָּׂטָן בְּגִמַטְרִיָּא תְּלָת מְאָה וְשִׁיתִּין וְאַרְבְּעָה הָוֵי» — «haSatán en gematría es trescientos sesenta y cuatro». Verificado letra por letra: ה5 + ש300 + ט9 + ן50 = 364. El año solar tiene 365 días. «Trescientos sesenta y cuatro días tiene permiso para acusar; en el día de Kipur no tiene permiso para acusar». El número no es un adorno: es una definición. La acusación no está prohibida ese día por decreto moral — es que, sencillamente, no alcanza. Le falta exactamente uno. Y el que falta es este.`,
          `Tercera alusión, la del calendario, y cierra con {{study:elul|el mes de Elul}}. Rosh Jodesh Elul son dos días —el 30 de Av y el 1 de Elul—, Av siempre tiene treinta días y Elul siempre veintinueve. Contando desde el primero de esos dos: 1 + 29 + 10 = 40 días exactos hasta el 10 de Tishrei. El día cuarenta de la subida al monte es Yom Kipur, y ese es el día en que Moshé bajó con las segundas tablas (Pirkei deRabí Eliezer 46). La cuenta no es aproximada ni piadosa: es aritmética de calendario fijo, y da 40 clavados.`,
          `Cuarta alusión, que no es numérica sino de color, y es la más humana de todas. En el Templo había un hilo de lana carmesí atado a la entrada del Santuario, y cuando el macho cabrío llegaba al desierto «el hilo se volvía blanco, como está dicho: "si sus pecados fueran como la grana, como la nieve blanquearán"» (Rabí Yishmael, Mishná Yomá 6:8, citando Yeshayahu 1:18). Y una baraíta agrega, en el registro de la agadá, que durante los cuarenta años previos a la destrucción del Templo el hilo dejó de blanquear, la suerte dejó de salir en la mano derecha y la lámpara occidental dejó de arder (Yomá 39b). En ese mismo folio hay otra imagen de blanco, y es la que se queda: Shimón HaTzadik contaba que cada Yom Kipur lo acompañaba, al entrar al Santo de los Santos, «un anciano vestido de blanco y envuelto en blanco, que entraba conmigo y salía conmigo»; el año de su muerte lo acompañó un anciano vestido de negro, que entró con él y no salió con él. — Nota de honestidad: se calculó לְבָנִים («blancos») = ל30+ב2+נ50+י10+ם40 = 132, buscando una gematría que cerrara con el blanco del día. No cierra con nada relevante. Se descarta, y se deja dicho que se descartó.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza)",
        parrafos: [
          `Vuelve al dato del día cuarenta, porque el drash está entero ahí. La fiesta del perdón no conmemora unas tablas perfectas: conmemora las SEGUNDAS. Las primeras bajaron a un pueblo que todavía no había fallado, eran «obra de Dios» de principio a fin, y se hicieron pedazos. Las segundas las talló Moshé con sus manos y las recibió un pueblo que ya tenía antecedentes — y son las que entraron en el Arca y las que duraron. Yom Kipur es el aniversario de eso. Por eso su lógica no puede ser la de un premio al que no se equivocó: es, estructuralmente, la fiesta de lo que se recompone. Y por eso las segundas tablas valen más: no porque el error sea bueno, sino porque una relación que sobrevivió a una traición conoce algo que una relación intacta todavía no sabe de sí misma.`,
          `Ahora el detalle de los dos machos cabríos, que a esta altura ya no se puede esquivar. La Mishná exige que sean «iguales en aspecto, en altura, en precio, y comprados a la vez» (Yomá 6:1). Idénticos. Uno va al altar, el otro al desierto, y nada en ellos explica la diferencia — la produce entera la suerte que les cae encima. Y el Ramban, cuando explica por qué el macho cabrío enviado no es una ofrenda a Azazel, dice exactamente lo mismo en el plano de la conciencia: el acto por fuera es indistinguible de lo que la Torá prohíbe treinta y tres versículos más adelante; lo único que lo separa es «que nuestra intención sea hacer la voluntad de nuestro Creador, que así nos ordenó». Dos animales idénticos, dos actos idénticos, y en ambos casos lo que decide no está en la superficie. Nadie mira un año de su vida y ve claramente cuál mitad fue para el altar.`,
          `Aquí entra la voz jasídica, y es la que vuelve practicable todo lo anterior. El Baal Shem Tov enseñó —lo transmite su discípulo Rabí Yaakov Yosef de Polnoye: «כְּמוֹ שֶׁשָּׁמַעְתִּי מִמּוֹרִי», «como escuché de mi maestro» (Ben Porat Yosef, Vayejí 181), y lo repite su nieto en Deguel Majané Efraim— que «בִּמְקוֹם שֶׁמַּחֲשַׁבְתּוֹ שֶׁל אָדָם, שָׁם הוּא כֻּלּוֹ»: en el lugar donde está el pensamiento de un hombre, allí está él ENTERO. Ponlo junto al ayuno y el día se explica solo. Las cinco aflicciones no castigan el cuerpo: le sueltan el ancla. Todo el día, el cuerpo es lo que menos habla — no come, no se lava, no se unge, no calza cuero, no está ocupado con nadie —, de modo que durante veinticinco horas el hombre está, literalmente y sin competencia, donde está su pensamiento. Por eso Israel se parece a los ángeles: no porque haya dejado de tener cuerpo, sino porque por un día dejó de ser arrastrado por él. Y por eso el color del día es el blanco y la postura es de pie: no es luto, es uniforme.`,
          `Pero ahora el corte, porque el drash sin el corte sería un consuelo barato. Es el día que se lo perdona todo, y hay una cosa que no puede perdonar: lo que le debes a una persona. Y el Talmud, para que no lo leamos como una cláusula fría, lo cuenta con nombres propios. Rav ofendió sin querer a Rabí Janiná, y «אֲזַל רַב לְגַבֵּיהּ תְּלֵיסַר מַעֲלֵי יוֹמֵי דְּכִפּוּרֵי וְלָא אִיפַּיַּיס» — «fue Rav a él trece vísperas de Yom Kipur, y no fue apaciguado» (Yomá 87b). Trece años seguidos, un gigante de la Torá tocando la puerta de otro en la víspera del día más solemne, y trece veces la puerta cerrada. La Guemará, incómoda, pregunta por los dos lados: ¿cómo hizo eso Rav, si Rabí Yosé bar Janiná dijo que no se pide perdón más de tres veces? Y sobre todo: ¿cómo hizo eso Rabí Janiná, si dijo Ravá «כָּל הַמַּעֲבִיר עַל מִדּוֹתָיו — מַעֲבִירִין לוֹ עַל כָּל פְּשָׁעָיו», «a todo el que pasa por alto sus medidas —el que deja pasar la ofensa— le pasan por alto todas sus transgresiones»? Ahí está la fórmula entera del día en cinco palabras: te perdonan de la misma manera en que tú perdonas. No como castigo. Como física.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de este día no es un rito escondido: es una ley de la estructura de la realidad, y Rav Yehuda Ashlag (Baal HaSulam) la formuló con una claridad que no deja escapatoria. En su Introducción al Zóhar establece primero de qué está hecha la criatura: todo lo que fue creado «yesh me'ayin», de la nada, es una sola cosa — el רָצוֹן לְקַבֵּל, la voluntad de recibir. «Todo el material, de principio a fin, de la creación renovada, es solo la voluntad de recibir» (§7). La luz no fue creada: la luz emana de Él. Lo único nuevo en el universo es el hueco que la recibe.`,
          `Y entonces viene la definición que lo cambia todo. ¿Qué separa a una criatura de su Creador, si no hay distancias en lo espiritual? Responde: la diferencia de forma, y solo eso. «Como el hacha corta y separa una cosa material en dos, así la diferencia de forma separa en lo espiritual». Y su ejemplo es de una sencillez desarmante: «cuando dos personas se aman, dices que están adheridas una a la otra como un solo cuerpo; y al revés, cuando se odian, dices que están lejos una de otra como el oriente del occidente. Y aquí no hay cercanía ni lejanía de LUGAR: se trata de la equivalencia de forma» (§8-9). Acercarse no es moverse. Acercarse es parecerse.`,
          `Con eso en la mano, todo el día se ordena de golpe. Yom Kipur no es un mercado donde el sufrimiento compra el perdón — no hay nada que comprar, porque la luz «se recibe directamente de Su esencia» y el día ya la está dando: עִצּוּמוֹ שֶׁל יוֹם, el día mismo expía. Lo único que se puede hacer es cambiar la FORMA del recipiente. Y eso es exactamente lo que hacen las cinco aflicciones: por veinticinco horas se suspende todo aquello en lo que la voluntad de recibir se ejerce sobre sí misma —comer, beber, ungirse, protegerse el pie, poseer— y el hombre adopta la forma del que no toma. Por eso la única imagen que la tradición encontró para describirlo es la de los ángeles: «un pueblo en la tierra como los ángeles del servicio en los cielos» (Pirkei deRabí Eliezer 46). No es un elogio poético; es una descripción técnica de equivalencia de forma. Y si estás en equivalencia de forma con el Dador, ya no hay hacha que corte, y no hay a qué distancia perdonar desde qué distancia: el perdón no es un acto que se ejecuta sobre ti, es lo que queda cuando la separación deja de existir.`,
          `Y ahora se entiende por qué la excepción del prójimo no es un apéndice moral sino una necesidad estructural, la única posible. Un hombre puede ayunar veinticinco horas, rezar cinco oraciones, llorar en la Neilá — y estar, al mismo tiempo, cobrándole una deuda a su hermano. Ese hombre no está en equivalencia de forma con nadie: está tomando. Por eso el día no puede limpiar eso, no porque le esté prohibido, sino porque no hay nada que limpiar mientras la forma siga siendo la de quien retiene. Ravá lo dijo en cinco palabras y sin una sola letra de Cabalá: al que deja pasar, le dejan pasar. Es la misma ley enunciada dos veces. Y por eso el retorno de este día es el escalón alto — lo que el Zóhar y el Tania llaman תְּשׁוּבָה עִילָּאָה, el retorno superior, «porque Biná es la teshuvá de arriba» (Tania, Igueret HaTeshuvá 9). En {{study:elul|Elul}} el trabajo era subir: reparar las brechas, escudriñar el propio terreno, dar el primer paso. En Yom Kipur ya se llegó. No se vuelve a la casa de la Madre pidiendo entrar: se está adentro, y el que está adentro no come, porque ya lo están alimentando.`,
        ],
      },
    ],
    caja: {
      titulo: "צוֹם = 136 = קוֹל · הַשָּׂטָן = 364, de 365.",
      cuerpo:
        "El ayuno vale lo mismo que la voz (Arizal, Shaar HaKavanot; verificado: צ90+ו6+ם40 = 136 = ק100+ו6+ל30), porque el alma no come ese día: se alimenta del hálito de arriba, y las cinco aflicciones son las cinco oraciones. Y la acusación vale 364 (Yomá 20a; verificado: ה5+ש300+ט9+ן50 = 364): le alcanza para todos los días del año menos uno. Este.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que estaba invirtiendo el orden. Creía que el perdón era el pago de un día bien sufrido, y resulta que el día perdona por lo que es, y lo único que me toca a mí es no estar de espaldas mientras ocurre. Eso me quita una carga y me pone otra, más incómoda: si el perdón no se compra, entonces no puedo comprarlo — no puedo saldar con hambre lo que no quiero saldar con una conversación. El día me da todo lo que puede darme, y con eso mismo me señala la parte que no puede tocar.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón de los dos idénticos. Dos machos cabríos iguales en aspecto, altura y precio, y lo que los separa no está en ellos. Dos actos indistinguibles por fuera, y lo que los separa es hacia dónde apunta la voluntad. Miro mi propio año y no puedo distinguir a simple vista lo que fue para el altar de lo que fue al desierto: se parecen demasiado. Y veo el patrón de la reciprocidad, que aparece en todos los niveles del estudio: al que deja pasar, le dejan pasar; el que no perdona pasa a ser el que peca; acercarse no es moverse, es parecerse. La medida con que mido es la medida con que me miden, y eso no es una amenaza — es una descripción.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Me da una explicación del ayuno que no me humilla. Mi alma no está siendo castigada ese día: está siendo alimentada desde más arriba, y por eso el canal de abajo queda cerrado. Donde está mi pensamiento, allí estoy yo entero — y el día entero está diseñado para que, por una vez, nada me arrastre a otro sitio. Y me da también la medida de mi propia distancia: no está medida en culpa acumulada sino en diferencia de forma. Puedo estar lejísimos rezando y cerquísima perdonando.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Que el mundo tenga un día así dice algo sobre cómo está hecho. Hay una gratuidad estructural en la realidad: algo que se da sin haber sido ganado, todos los años, en la misma fecha, esté el receptor preparado o no. Y al mismo tiempo hay un límite igual de estructural: esa gratuidad no puede pasar por encima de otra persona. El universo perdona hacia arriba y deja sin resolver lo horizontal, a propósito, para que lo horizontal siga necesitándonos. Las segundas tablas —las que se dieron después del fracaso— son las que quedaron; también eso dice algo sobre cómo está hecho el mundo.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, escribe UN nombre en un papel: la persona a la que le debes una disculpa. Y ponle fecha antes del 20 de septiembre.",
    texto: `El día no cubre lo que le debes a una persona. Eso convierte la acción de este estudio en la más simple y la más difícil del año, así que hazla en cuatro pasos pequeños y verificables, no en un impulso.

Uno: hoy, escribe UN solo nombre. Uno, no una lista — la lista es una forma elegante de no empezar. Es la persona con la que hay algo pendiente y de la que sabes, sin tener que pensarlo, que tú tienes una parte. Escríbelo a mano en un papel.

Dos: al lado del nombre, escribe la frase concreta que le vas a decir, en una sola línea, sin explicaciones y sin la palabra "pero". No "lo siento si te sentiste mal", que no es una disculpa sino una acusación con buenos modales: algo como "hice X y estuvo mal, y quiero pedirte perdón". El Rambam es explícito en que no basta con devolver lo que se debe — hay que apaciguar y pedir el perdón con palabras (Hiljot Teshuvá 2:9).

Tres: ponle fecha. Yom Kipur 5787 empieza al caer el sol del domingo 20 de septiembre de 2026. El Shulján Aruj titula la ley "que el hombre apacigüe a su prójimo EN LA VÍSPERA de Yom Kipur" (Oraj Jaim 606:1): tienes hasta entonces, y la fecha es lo que convierte un propósito en una acción. Elige un día concreto de esta semana y anótalo junto al nombre.

Cuatro: si te dicen que no, no insistas más de tres veces (Rabí Yosé bar Janiná, Yomá 87b) — y a partir de ahí el asunto ya no es tuyo: "el que no perdonó, él es el pecador" (Rambam 2:9). Y si el nombre que escribiste te lo dijo a ti otra persona, aplica la otra mitad, que es la que de verdad cuesta: "כָּל הַמַּעֲבִיר עַל מִדּוֹתָיו — מַעֲבִירִין לוֹ עַל כָּל פְּשָׁעָיו", a todo el que deja pasar, le dejan pasar todo (Ravá, Yomá 87b). Perdona antes de que te lo pidan. Es, según el Talmud, el único movimiento que tú puedes hacer sobre la balanza con la que te van a medir.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El versículo-ancla no dice «por su ayuno», dice «כִּי בַיּוֹם הַזֶּה יְכַפֵּר עֲלֵיכֶם», «porque EN ESTE DÍA se expiará sobre ustedes» (Vaikrá 16:30). El perdón de Yom Kipur no se compra: el día expía por su propia esencia — עַצְמוֹ שֶׁל יוֹם, dice el Rambam (Hiljot Teshuvá 1:3); עִצּוּמוֹ שֶׁל יוֹם, dice el Or HaJaim (a Vaikrá 23:28). Y hay una posición tanaítica que lo lleva hasta el borde: el día expía incluso a quien no ayunó, «יוֹם כִּפֻּרִים הוּא — מִכָּל מָקוֹם» (Shevuot 13a). La halajá matiza —expía «para los que vuelven»— pero no invierte la dirección: la teshuvá no paga el día; lo recibe.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El ayuno no es la causa del perdón, es su consecuencia. El Arizal lo explica sin rodeos: en Yom Kipur el alma sube hasta Imá Ilaá y allí «no se alimenta sino del hálito que sale de la boca superior», de modo que las cinco aflicciones se ordenaron «porque esas cosas quedaron anuladas para ella» (Shaar HaKavanot, Derushei Yom HaKipurim). Por eso צוֹם = 136 = קוֹל: el ayuno vale exactamente lo mismo que la voz. Y por eso הַשָּׂטָן = 364 (Yomá 20a, verificado: ה5+ש300+ט9+ן50): la acusación alcanza para 364 de los 365 días del año, y le falta justo este.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El día es el aniversario de las SEGUNDAS tablas: el día cuarenta exacto de la subida que empezó en {{study:elul|Rosh Jodesh Elul}} (1 día de Av + 29 de Elul + 10 de Tishrei = 40), cuando Moshé bajó con las tablas que se dieron DESPUÉS del fracaso (Pirkei deRabí Eliezer 46). Y es el único día en que «hay un pueblo en la tierra como los ángeles del servicio»: descalzos, sin comer, de pie, en paz entre ellos, limpios de todo pecado (ibid., citado por el Ramban). En el lenguaje de Baal HaSulam eso tiene nombre técnico: equivalencia de forma. Lo que separa no es la distancia, es la diferencia de forma — y por veinticinco horas la diferencia se suspende.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Lo único que el día NO perdona es lo que le debes a una persona: «עֲבֵרוֹת שֶׁבֵּין אָדָם לַחֲבֵרוֹ אֵין יוֹם הַכִּפּוּרִים מְכַפֵּר עַד שֶׁיְּרַצֶּה אֶת חֲבֵרוֹ» (Mishná Yomá 8:9). Escribe hoy UN nombre, la frase exacta que vas a decir, y una fecha antes del atardecer del 20 de septiembre. Y perdona antes de que te lo pidan, porque esa es la única palanca que tú controlas: «a todo el que deja pasar, le dejan pasar todo» (Ravá, Yomá 87b).`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal sobre datos verificados, marcada como tal.",
    parrafos: [
      `Los datos son de la Mishná y no se discuten: los dos machos cabríos deben ser «iguales en aspecto, en altura, en precio, y comprados a la vez» (Yomá 6:1). Idénticos hasta el precio. Y si uno de los dos muere después de echadas las suertes, no se puede simplemente reemplazarlo: hay que traer una pareja nueva y volver a sortear desde el principio (ibid.). La suerte no se hereda. Lo que aquí se ofrece como lectura, y solo como lectura, es lo que eso dice del año que uno trae al día.`,
      `Uno llega a Yom Kipur con dos versiones de sí mismo que se parecen demasiado: la misma altura, el mismo aspecto, el mismo precio. La versión que hizo las cosas por lo alto y la que las hizo por costumbre, por miedo o por cálculo, se ven exactamente igual desde afuera — y a menudo también desde adentro. Nadie puede mirarlas y decir cuál era para el altar. Por eso el rito no las examina: las sortea. Y por eso el Ramban tuvo que aclarar que lo único que salva al macho cabrío enviado de ser idolatría es hacia dónde apunta la voluntad de quien lo envía. Si esa lectura tiene algo de verdad, entonces el trabajo del día no es clasificar el año —eso no lo puede hacer nadie— sino entregarlo entero, incluidas las dos mitades que no se distinguen, y aceptar que la separación la hace Otro. Nadie está obligado a leerlo así. Pero que la Torá exija dos animales indistinguibles, y que el Ramban insista en que lo decisivo es invisible, es por lo menos una coincidencia bien colocada.`,
    ],
  },

  hemshej: [
    "{{study:elul|Yom Kipur es el día cuarenta de una cuenta que empezó treinta y nueve días antes. ¿Qué se hace en esos treinta y nueve? El mes escondido en un verso de amor.}}",
    "{{study:despertar-de-lo-alto|Si el día perdona por su propia esencia y nadie tuvo que ganárselo, esto es un caso puro de luz que baja sin ser pedida. La otra mitad del asunto.}}",
    "{{letter:he|Volver es «תָּשׁוּב ה'», devolver la hei. ¿Por qué esa letra, y por qué el Zóhar la llama la Madre a la que se regresa?}}",
    "{{study:olam-haba|«Shabat shabatón» — dice Pirkei deRabí Eliezer que «shabat» es este mundo y «shabatón» el mundo por venir, y que sin Yom Kipur el mundo no se sostendría. ¿Qué es ese mundo por venir?}}",
  ],

  ctaRef: "Leviticus 16:30",
};
