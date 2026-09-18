import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — כָּל נִדְרֵי · las palabras que se desatan y las cinco almas
//  Serie «Tiempos Sagrados» (moadim) · Estudio 3·bis — la puerta de Yom Kipur.
//
//  RELACIÓN CON /misterio/yom-kipur: son estudios HERMANOS, no duplicados.
//  El estudio 3 («el día que ya perdona») entra por Vaikrá 16, los dos machos
//  cabríos, el hilo carmesí y la haftará. ESTE entra por lo jurídico (Kol
//  Nidrei), por la teshuvá y por el cinco de las almas. Se enlazan mutuamente
//  en el umbral הֶמְשֵׁךְ.
//
//  PUERTA DE ENTRADA (directriz de gerencia, acatada): el estudio NO entra por
//  el macho cabrío ni por la expiación con sangre. Vaikrá 16 vive DENTRO, al
//  final de מְפָרְשִׁים, nunca como gancho ni como eje.
//
//  FUENTES VERIFICADAS CONTRA LA API DE SEFARIA (2026-09-14) por el Sofer.
//  41 afirmaciones cotejadas textualmente; todo el hebreo citado abajo se trajo
//  de la API, no de memoria, y las gematrías se recalcularon letra por letra.
//
//  LITURGIA Y CÓDIGOS
//   · Majzor Yom Kipur Ashkenaz, Kol Nidrei seg. 6-7 — la fórmula del tribunal
//     («אָנוּ מַתִּירִין לְהִתְפַּלֵּל עִם הָעֲבַרְיָנִים») y el cuerpo arameo
//     en futuro («מִיּוֹם כִּפּוּרִים זֶה עַד יוֹם כִּפּוּרִים הַבָּא»).
//   · Shulján Aruj, Oraj Jaim 619:1 — la fórmula. 619:4 — «צָרִיךְ לְהַעֲמִיד
//     אֶחָד לִימִין שְׁלִיחַ צִבּוּר וְאֶחָד לִשְׂמֹאלוֹ» (los dos que flanquean).
//   · Ramá a Oraj Jaim 619:1, citando al Maharil — se dice DE DÍA, se alarga con
//     melodías hasta la noche, y se dice tres veces, cada una más fuerte.
//   · Tur, Oraj Jaim 619 — la fuente central de este estudio. Trae: la costumbre
//     asquenazí; «וַאֲפִילּוּ אִם לֹא יְבַקְּשׁוּ שֶׁיַּתִּירוּ לָהֶם»; el motivo
//     halájico de decirlo de día (de Shabat 157a); la objeción de Rabeinu Tam
//     («מַה מּוֹעִיל לְהַתִּיר עַל מַה שֶּׁעָבְרוּ כְּבָר») y su cambio a futuro;
//     la defensa del Rosh («מִנְהַג הַקַּדְמוֹנִים»); la oposición de Rav Netronai
//     Gaón («לֹא רָאִינוּ וְלֹא שָׁמַעְנוּ מֵאֲבוֹתֵינוּ») y de Rav Hai Gaón
//     («אַף אַתֶּם הַחְמִירוּ כְּמוֹתֵינוּ»); el límite de Rav Saadia Gaón; el
//     cierre «וּכְבָר פָּשַׁט הַמִּנְהָג בְּכָל הַמְּקוֹמוֹת לְאוֹמְרוֹ»; y —lo
//     decisivo— la jurisdicción: «וּמִיהוּ בִּטּוּל אֵינוֹ מוֹעִיל אֶלָּא לְנִדְרֵי
//     עַצְמוֹ… אֲבָל נֶדֶר שֶׁחֲבֵרוֹ מַדִּירוֹ וּשְׁבוּעָה שֶׁחֲבֵרוֹ אוֹ בֵּית
//     דִּין מַשְׁבִּיעִין אוֹתוֹ — אֵין מוֹעִיל לָהֶם בִּטּוּל».
//   · Abudarham, Yom Kipur, Kol Nidrei seg. 4 — Rabeinu Tam y el Rosh.
//
//  TALMUD Y MIDRASH
//   · Keritot 6b:18 — Rav Janá bar Bizná en nombre de Rabí Shimón Jasidá: «כָּל
//     תַּעֲנִית שֶׁאֵין בָּהּ מִפּוֹשְׁעֵי יִשְׂרָאֵל אֵינָהּ תַּעֲנִית», con el
//     gálbano (חֶלְבְּנָה) que hiede y aun así entra en el incienso.
//   · Nedarim 23b:1 — se pueden anular por adelantado los votos del año entrante
//     (base halájica del cambio de Rabeinu Tam).
//   · Shabat 157a — no se anulan votos en Shabat/Yom Tov salvo por necesidad
//     del día (motivo de decir Kol Nidrei con luz de día).
//   · Mishná Yomá 8:1 — las cinco aflicciones. Yomá 76a:11 — Rav Jisdá: el cinco
//     se deriva de CINCO versículos, enumerados uno por uno.
//   · Mishná Yomá 8:9 — «עֲבֵרוֹת שֶׁבֵּין אָדָם לַחֲבֵרוֹ… עַד שֶׁיְּרַצֶּה אֶת
//     חֲבֵרוֹ» y «אֶחֱטָא וְיוֹם הַכִּפּוּרִים מְכַפֵּר — אֵין יוֹם הַכִּפּוּרִים
//     מְכַפֵּר».
//   · Yomá 87b:9 — las cinco oraciones del día. Yomá 87b — Ravá: «כָּל הַמַּעֲבִיר
//     עַל מִדּוֹתָיו — מַעֲבִירִין לוֹ עַל כָּל פְּשָׁעָיו».
//   · Talmud Yerushalmi, Berajot 4:1 seg. 22-23 — de dónde se aprende la Neilá
//     (Rabí Leví, de Yeshayahu 1:15) y las DOS opiniones sobre qué puertas se
//     cierran: «רַב אָמַר בִּנְעִילַת שַׁעֲרֵי שָׁמַיִם, וְרִבִּי יוֹחָנָן אָמַר
//     בִּנְעִילַת שַׁעֲרֵי הֵיכָל».
//   · Bereshit Rabá 14:9 — «חֲמִשָּׁה שֵׁמוֹת נִקְרְאוּ לָהּ: נֶפֶשׁ, רוּחַ,
//     נְשָׁמָה, יְחִידָה, חַיָּה», con la definición de cada uno.
//   · Pirkei deRabí Eliezer 46 seg. 9 — Israel como los ángeles: sin comer ni
//     beber, limpios de falta, en paz unos con otros.
//
//  TORÁ — LOS CINCO VERSÍCULOS, VERIFICADOS UNO POR UNO
//   · Bamidbar 29:7 · Vaikrá 23:27 · Vaikrá 23:32 · Vaikrá 16:31 · Vaikrá 16:29.
//     LOS CINCO dicen «וְעִנִּיתֶם אֶת נַפְשֹׁתֵיכֶם» / «תְּעַנּוּ אֶת
//     נַפְשֹׁתֵיכֶם» — «afligirán SUS ALMAS», en plural. Ninguno dice «ayunar».
//
//  RAMBAM Y CABALÁ LURIANA
//   · Rambam, Hiljot Teshuvá 2:1 (teshuvá completa), 2:2 (qué es la teshuvá:
//     cinco verbos), 2:7 (las cinco oraciones con confesión), 2:9 (el prójimo, y
//     «הוּא הַחוֹטֵא» del que se niega a perdonar tres veces), 7:6 («אֶמֶשׁ הָיָה
//     זֶה שָׂנאוּי… וְהַיּוֹם הוּא אָהוּב וְנֶחְמָד קָרוֹב וְיָדִיד»).
//     Hiljot Tefilá 1:7 — Neilá como cierre de las puertas del cielo tras el sol.
//   · Arizal, Sháar HaKavanot, Derushei Yom HaKipurim (Sefaria: «Sermons on Yom
//     Kippur» 1, seg. 4-5) — «וְלָכֵן כְּנֶגְדָּם תִּיקְּנוּ ה׳ תְּפִילּוֹת
//     בְּיוֹם הַכִּפּוּרִים כְּנֶגֶד ה׳ דְּבָרִים», y «צוֹם בְּגִימַטְרִיָּא קוֹל».
//   · Pri Etz Jaim, Sháar Yom HaKipurim 1 seg. 15 y 5 seg. 4 (Rabí Jaim Vital) —
//     la escalera de las cinco oraciones y «רַק אַחַר תַּשְׁלוּם ה׳ תְּפִלּוֹת…
//     וְנֶחְתַּם הַחוֹתָם».
//   · Ramban a Vaikrá 16:8 — «כִּי הַמְשֻׁלָּח אֵינֶנּוּ קָרְבָּן, שֶׁלֹּא
//     יִשָּׁחֵט». Mishná Yomá 6:1 — los dos idénticos. Mishná Yomá 3:3 — cinco
//     inmersiones. Vaikrá 16:4 — el lino blanco.
//
//  GEMATRÍAS RECALCULADAS LETRA POR LETRA
//    צוֹם = צ90+ו6+ם40 = 136 · קוֹל = ק100+ו6+ל30 = 136  (la enuncia el Arizal)
//    כָּל נִדְרֵי = כ20+ל30 = 50 · נ50+ד4+ר200+י10 = 264 → 314 = שַׁדַּי (ש300+ד4+י10)
//       ⚠️ la ARITMÉTICA está verificada; la INTERPRETACIÓN es de Jashmal, no se
//       halló en ninguna fuente, y va rotulada como tal en el jidush.
//
//  ROTULADO OBLIGATORIO DEL SOFER (no negociable, aplicado en todo el archivo)
//   · «Cinco oraciones = cinco niveles del alma» NO es del Arizal. Se buscó en
//     Pri Etz Jaim, Sháar Yom HaKipurim y en Sháar HaKavanot: NO ESTÁ. Va como
//     TRADICIÓN TRANSMITIDA, jamás atribuida al Arizal.
//   · La cadena es: cinco almas ← cinco aflicciones → cinco oraciones. El
//     eslabón IZQUIERDO es LECTURA DE JASHMAL. El derecho sí es del Arizal.
//   · PROHIBIDO emparejar una aflicción concreta con un nivel concreto del alma.
//
//  DESCARTADO, Y POR QUÉ
//   · «Rav Amram Gaón llamó a Kol Nidrei מִנְהַג שְׁטוּת». NO verificado en
//     primaria: el Séder Rav Amram Gaón no está en Sefaria, y el Abudarham dice
//     lo contrario («וּבְסֵדֶר רַב עַמְרָם יֶשְׁנוֹ»). Atribución en disputa: NO
//     se cita. Se usa a Netronai y a Hai, literales en el Tur.
//   · «Yom KiPurim = un día COMO Purim»: Tikunei Zóhar 57b dice la dirección
//     INVERSA (Purim se llama por Yom HaKipurim). No se usa aquí.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "kol-nidrei",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 3·bis — Kol Nidrei · la puerta de Yom Kipur y el cinco de las almas",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۳ب — کُل نیدره‌ی · دروازهٔ یوم کیپور و پنجِ جان‌ها",
    he: "כָּל נִדְרֵי",
    titulo: "Kol Nidrei — las palabras que se desatan",
    tituloFa: "کُل نیدره‌ی — کلماتی که گشوده می‌شوند",
    ganchoEs:
      "El día más solemne del año judío no empieza rezando: empieza con un tribunal de tres, en arameo, y con luz de día. Y lo primero que se declara no es una oración: es que los que están afuera pueden entrar — y que no hace falta que lo pidan. Lo que se desata son las promesas que te hiciste a ti mismo. Lo que le debes a otra persona queda exactamente donde estaba.",
    ganchoFa:
      "سنگین‌ترین روزِ سالِ یهودی با دعا آغاز نمی‌شود: با دادگاهی سه‌نفره آغاز می‌شود، به زبانِ آرامی و در روشناییِ روز. و نخستین چیزی که اعلام می‌شود دعا نیست: این است که آنان که بیرون مانده‌اند می‌توانند وارد شوند — و لازم نیست درخواست کنند. آنچه گشوده می‌شود، نذرهایی است که با خودت بسته‌ای. آنچه به دیگری بدهکاری، دقیقاً همان‌جا که بود می‌مانَد.",
    dimensiones: [
      { es: "Un tribunal, no una oración", fa: "یک دادگاه، نه یک دعا" },
      { es: "Desata solo lo que te prometiste a ti", fa: "تنها نذرهای خودت را می‌گشاید" },
      { es: "«Afligirán sus almas» — cinco veces", fa: "«جان‌هایتان را رنجه دارید» — پنج بار" },
    ],
    fecha: "Yom Kipur 5787 · entra el 20 sep 2026 al atardecer",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — tres cosas que este estudio NO afirma",
    rotulo:
      "Se dicen de entrada, antes de entrar en materia, para que nadie confunda una lectura nuestra con una fuente.",
    parrafos: [
      `Primero, sobre una enseñanza muy difundida. Se repite —en jasidut contemporánea y en muchos sitios en español— que las cinco oraciones de Yom Kipur corresponden a los cinco niveles del alma, y que la Neilá es la Yejidá. Se buscó esa correspondencia en fuente primaria y NO ESTÁ: ni en Pri Etz Jaim, Sháar Yom HaKipurim, ni en Sháar HaKavanot, Derushei Yom HaKipurim. Lo que el Arizal sí liga —y está verificado, y se cita entero más abajo— son las cinco AFLICCIONES con las cinco ORACIONES. De modo que aquí esa enseñanza se da como lo que es: tradición transmitida, valiosa y viva, pero NO como enseñanza del Arizal.`,
      `Segundo, sobre el puente que este estudio sí tiende. Los cinco versículos de la Torá que ordenan afligirse dicen los cinco «sus ALMAS» (verificado uno por uno), y el alma tiene cinco nombres en Bereshit Rabá 14:9. Que esos dos cincos se toquen es LECTURA DE JASHMAL: ninguna fuente que hayamos podido abrir lo dice con esas palabras. Y por la misma razón, aquí NO se empareja una aflicción concreta con un nivel concreto del alma. Eso sí sería inventar. Se dice «cinco y cinco», se dan las definiciones del Midrash, y el trabajo lo hace el lector.`,
      `Tercero, sobre lo que Kol Nidrei no puede hacer. Circula la idea —a veces como acusación, a veces como chiste— de que Kol Nidrei anula juramentos y deja a quien lo dice libre de sus compromisos. Es falso, y el propio Tur lo cierra con todas las letras: la anulación vale ÚNICAMENTE para los votos que uno se impuso a sí mismo. No toca un voto impuesto por otro, ni un juramento tomado por el prójimo, ni uno tomado por un tribunal, ni uno tomado por la comunidad. Ese pasaje se cita entero en la תַּרְגּוּם y se desarrolla en el Pshat, porque es el corazón de este estudio.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — siete textos, dos puertas",
    intro: [
      `Este estudio tiene dos puertas y las dos dan al mismo patio. La primera es jurídica: qué es exactamente esa fórmula que se canta antes de que entre el día, y —sobre todo— qué NO puede hacer. La segunda es de estructura: por qué el día se organiza en cincos, y de qué cinco se trata cuando la Torá los cuenta.`,
    ],
    filas: [
      {
        ref: "Shulján Aruj, Oraj Jaim 619:1",
        he: "אָנוּ מַתִּירִין לְהִתְפַּלֵּל עִם הָעֲבַרְיָנִים",
        es: "Damos permiso para rezar con los transgresores",
        funcion: "Antes de una sola palabra de oración, se levanta la exclusión.",
      },
      {
        ref: "Keritot 6b",
        he: "כָּל תַּעֲנִית שֶׁאֵין בָּהּ מִפּוֹשְׁעֵי יִשְׂרָאֵל אֵינָהּ תַּעֲנִית",
        es: "Todo ayuno que no tenga en él a los pecadores de Israel, no es un ayuno",
        funcion: "El gálbano: sin el ingrediente que hiede, no es el incienso.",
      },
      {
        ref: "Tur, Oraj Jaim 619",
        he: "וּכְבָר פָּשַׁט הַמִּנְהָג בְּכָל הַמְּקוֹמוֹת לְאוֹמְרוֹ",
        es: "Y ya se extendió la costumbre de decirlo en todos los lugares",
        funcion: "Los gueonim la quisieron prohibir. El pueblo la cantó igual.",
      },
      {
        ref: "Tur, Oraj Jaim 619",
        he: "בִּטּוּל אֵינוֹ מוֹעִיל אֶלָּא לְנִדְרֵי עַצְמוֹ",
        es: "La anulación solo vale para los votos de uno mismo",
        funcion: "La jurisdicción exacta. Es el corte que decide todo el estudio.",
      },
      {
        ref: "Mishná Yomá 8:9",
        he: "עַד שֶׁיְּרַצֶּה אֶת חֲבֵרוֹ",
        es: "Hasta que apacigüe a su prójimo",
        funcion: "El día entero tiene el mismo límite: la gente.",
      },
      {
        ref: "Vaikrá 23:32 (y sus cuatro paralelos) · Yomá 76a",
        he: "וְעִנִּיתֶם אֶת נַפְשֹׁתֵיכֶם",
        es: "Afligirán sus almas",
        funcion: "La Torá nunca dice «ayunar». Dice «almas», y lo dice cinco veces.",
      },
      {
        ref: "Talmud Yerushalmi, Berajot 4:1",
        he: "בִּנְעִילַת שַׁעֲרֵי שָׁמַיִם · בִּנְעִילַת שַׁעֲרֵי הֵיכָל",
        es: "Al cerrarse las puertas del cielo · al cerrarse las puertas del Templo",
        funcion: "La quinta oración, y dos teologías del último minuto.",
      },
    ],
    cierre: [
      `Los cinco primeros textos construyen una sola idea: el día empieza desatando, y hay exactamente una cosa que no desata. Los dos últimos explican por qué todo en este día viene de a cinco — y adónde llega el quinto.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "La declaración que abre la noche — Majzor Yom Kipur (Kol Nidrei)",
        he: "עַל דַּעַת הַמָּקוֹם וְעַל דַּעַת הַקָּהָל, בִּישִׁיבָה שֶׁל מַעְלָה וּבִישִׁיבָה שֶׁל מַטָּה, אָנוּ מַתִּירִין לְהִתְפַּלֵּל עִם הָעֲבַרְיָנִים׃",
        es: "Con el consentimiento del Omnipresente y con el consentimiento de la congregación, en el tribunal de arriba y en el tribunal de abajo, damos permiso para rezar con los transgresores.",
        source: "Majzor Yom Kipur Ashkenaz · Shulján Aruj, Oraj Jaim 619:1",
      },
      {
        label: "El cuerpo de Kol Nidrei — está en arameo, la lengua de los contratos",
        he: "כָּל נִדְרֵי וֶאֱסָרֵי וּשְׁבוּעֵי וַחֲרָמֵי… מִיּוֹם כִּפּוּרִים זֶה עַד יוֹם כִּפּוּרִים הַבָּא עָלֵינוּ לְטוֹבָה… כֻּלְּהוֹן יְהוֹן שָׁרָן, שְׁבִיקִין, שְׁבִיתִין, בְּטֵלִין וּמְבֻטָּלִין, לָא שְׁרִירִין וְלָא קַיָּמִין׃",
        es: "Todos los votos, prohibiciones, juramentos y anatemas… de este Yom Kipur hasta el Yom Kipur que venga sobre nosotros para bien… todos queden sueltos, abandonados, dejados, anulados y nulos, sin fuerza y sin vigencia.",
        source: "Majzor Yom Kipur Ashkenaz, Kol Nidrei (versión de Rabeinu Tam, en futuro)",
      },
      {
        label: "La jurisdicción — el pasaje que decide todo el estudio",
        he: "וּמִיהוּ בִּטּוּל אֵינוֹ מוֹעִיל אֶלָּא לְנִדְרֵי עַצְמוֹ וּשְׁבוּעָה שֶׁיִּשָּׁבַע מֵעַצְמוֹ; אֲבָל נֶדֶר שֶׁחֲבֵרוֹ מַדִּירוֹ וּשְׁבוּעָה שֶׁחֲבֵרוֹ אוֹ בֵּית דִּין מַשְׁבִּיעִין אוֹתוֹ — אֵין מוֹעִיל לָהֶם בִּטּוּל׃",
        es: "Pero la anulación no vale sino para los votos de uno mismo y el juramento que uno se toma a sí mismo. En cambio, un voto que le impone su prójimo, y un juramento que le toma su prójimo o un tribunal: a esos no les vale la anulación.",
        source: "Tur, Oraj Jaim 619",
      },
      {
        label: "El límite del día entero — Mishná Yomá 8:9",
        he: "עֲבֵרוֹת שֶׁבֵּין אָדָם לַמָּקוֹם, יוֹם הַכִּפּוּרִים מְכַפֵּר. עֲבֵרוֹת שֶׁבֵּין אָדָם לַחֲבֵרוֹ, אֵין יוֹם הַכִּפּוּרִים מְכַפֵּר, עַד שֶׁיְּרַצֶּה אֶת חֲבֵרוֹ׃",
        es: "Las faltas entre la persona y el Omnipresente, Yom Kipur las expía. Las faltas entre la persona y su prójimo, Yom Kipur NO las expía, hasta que apacigüe a su prójimo.",
        source: "Mishná Yomá 8:9",
      },
      {
        label: "Qué es, exactamente, la teshuvá — Rambam, Hiljot Teshuvá 2:2",
        he: "וּמַה הִיא הַתְּשׁוּבָה? הוּא שֶׁיַּעֲזֹב הַחוֹטֵא חֶטְאוֹ וִיסִירוֹ מִמַּחְשַׁבְתּוֹ וְיִגְמֹר בְּלִבּוֹ שֶׁלֹּא יַעֲשֵׂהוּ עוֹד… וְכֵן יִתְנַחֵם עַל שֶׁעָבַר… וְצָרִיךְ לְהִתְוַדּוֹת בִּשְׂפָתָיו׃",
        es: "¿Y qué es la teshuvá? Que el que erró abandone su falta, la saque de su pensamiento y resuelva en su corazón no volver a hacerla… y también que se duela de lo que hizo… y tiene que confesarlo con sus labios.",
        source: "Rambam, Hiljot Teshuvá 2:2",
      },
      {
        label: "La orden que nunca dice «ayunen» — y que dice «almas» cinco veces",
        he: "וְעִנִּיתֶם אֶת נַפְשֹׁתֵיכֶם",
        es: "Afligirán sus almas. (No «sus cuerpos»: nafshoteijem, almas, en plural. Los cinco versículos de los que el Talmud deriva las cinco aflicciones dicen todos esto.)",
        source: "Bamidbar 29:7 · Vaikrá 23:27 · Vaikrá 23:32 · Vaikrá 16:31 · Vaikrá 16:29 (verificados uno por uno) · Yomá 76a",
      },
      {
        label: "El día en que un pueblo se parece a los ángeles — Pirkei deRabí Eliezer 46",
        he: "מַה מַּלְאֲכֵי הַשָּׁרֵת אֵין לָהֶם אֲכִילָה וּשְׁתִיָּה — כָּךְ יִשְׂרָאֵל אֵין לָהֶם אֲכִילָה וּשְׁתִיָּה בְּיוֹם הַכִּפּוּרִים. מַה מַּלְאֲכֵי הַשָּׁרֵת נְקִיִּים מִכָּל חֵטְא — כָּךְ יִשְׂרָאֵל נְקִיִּים מִכָּל חֵטְא בְּיוֹם הַכִּפּוּרִים. מַה מַּלְאֲכֵי הַשָּׁרֵת שָׁלוֹם מִתּוֹךְ בֵּינֵיהֶם — כָּךְ יִשְׂרָאֵל שָׁלוֹם בֵּינֵיהֶם בְּיוֹם הַכִּפּוּרִים׃",
        es: "Así como los ángeles servidores no comen ni beben, así Israel no come ni bebe en Yom Kipur. Así como los ángeles están limpios de toda falta, así Israel está limpio de toda falta en Yom Kipur. Así como entre los ángeles hay paz, así entre Israel hay paz en Yom Kipur.",
        source: "Pirkei deRabí Eliezer 46",
      },
    ],
    parrafos: [
      `Antes de seguir, los términos. Yom Kipur (יוֹם כִּפּוּר) es el «Día de la Cobertura», el más solemne del calendario judío; se ayuna veinticinco horas. Kol Nidrei (כָּל נִדְרֵי), «todos los votos», es la declaración con la que se abre su noche: no es una oración, es un acta legal. Un néder (נֶדֶר, plural nedarim) es un voto: una promesa que una persona se impone a sí misma, libremente —«juro que no vuelvo a fumar»—, y en la Torá tiene fuerza legal. Una shevuá (שְׁבוּעָה) es un juramento, y un jérem (חֵרֶם), una prohibición solemne. Un avaryán (עַבַרְיָן) es «el que cruzó la línea», el transgresor, de la raíz avar, pasar.`,
      `Y los tres que hacen el trabajo pesado en este estudio. Teshuvá (תְּשׁוּבָה) significa literalmente retorno: no «penitencia», no «conversión», sino volver a donde uno ya pertenecía. Neilá (נְעִילָה) es «cierre»: la quinta y última oración del día, la única que no existe ningún otro día del año. Vidui (וִדּוּי) es la confesión, dicha en voz alta y en plural —«nosotros erramos»—, nunca a otra persona.`,
      `Por último, los libros. La Mishná (siglo II) es el código de la ley oral; el Talmud es el debate sobre ella (siglos III-VI), y hay dos: el de Babilonia y el de Jerusalén, llamado Yerushalmi. El Rambam es Maimónides (Egipto, siglo XII) y su código se llama Mishné Torá. El Tur y el Shulján Aruj son los dos grandes códigos legales, de los siglos XIV y XVI; la Ramá son las glosas asquenazíes al segundo. Los gueonim fueron los rectores de las academias de Babilonia entre los siglos VII y XI, la máxima autoridad de su época. Y el Arizal es Rabí Itzjak Luria (Safed, siglo XVI), cuyas enseñanzas puso por escrito su discípulo Rabí Jaim Vital.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: 'El Tur (טוּר, Oraj Jaim 619) — el código que no escondió la pelea.',
        texto: `Aquí la fuente más valiosa es el Tur, código legal del siglo XIV, y lo es precisamente porque no escondió la discusión: la cuenta entera, en cuatro movimientos. Primero, la costumbre: en Asquenaz —las comunidades judías de Alemania— acostumbran que antes de rezar «desatan a todos los transgresores» para rezar con ellos, «וַאֲפִילּוּ אִם לֹא יְבַקְּשׁוּ שֶׁיַּתִּירוּ לָהֶם», «y aun si no piden que los desaten». Segundo, la razón, y es extraordinaria: porque dijo Rabí Shimón Jasidá (Keritot 6b) «כָּל תַּעֲנִית שֶׁאֵין בָּהּ מִפּוֹשְׁעֵי יִשְׂרָאֵל אֵינָהּ תַּעֲנִית», «todo ayuno público que no tenga en él a los pecadores de Israel, no es un ayuno». ¿De dónde lo sabe? Del incienso del Templo: tenía once ingredientes, y uno de ellos —la jelbená, el gálbano— huele mal, y la Torá lo cuenta igual entre los aromas sagrados. Sin el que hiede, no es el incienso del Templo: es otro incienso.`,
      },
      {
        etiqueta: 'Rabeinu Tam (רַבֵּינוּ תָּם) — el que lo reescribió en futuro.',
        texto: `Tercer movimiento del Tur, y es una objeción de las que no se pueden contestar con adornos. El texto antiguo de Kol Nidrei anulaba los votos del año que había pasado, y el nieto de Rashi (Francia, siglo XII) preguntó lo obvio: «מַה מּוֹעִיל לְהַתִּיר עַל מַה שֶּׁעָבְרוּ כְּבָר» — «¿de qué sirve anular lo que ya pasó?». Y cambió la fórmula entera al futuro: de este Yom Kipur al próximo. Su apoyo legal no es retórico, es talmúdico: en Nedarim 23b se enseña que uno puede anular por adelantado los votos del año entrante. El Rosh (siglos XIII-XIV) defendió la versión antigua, en pasado, como «מִנְהַג הַקַּדְמוֹנִים», «la costumbre de los antiguos» —y así lo recoge también el Abudarham—, pero la versión que se canta hoy en la mayoría de las comunidades es la de Rabeinu Tam.`,
      },
      {
        etiqueta: "Los gueonim (הַגְּאוֹנִים) — la autoridad que perdió.",
        texto: `Cuarto movimiento, y es el más sorprendente para quien crea que la liturgia cayó del cielo terminada. Los rectores de las academias de Babilonia —la máxima autoridad de su tiempo— dijeron que no. Rav Netronai Gaón: «no acostumbramos, ni en las dos academias ni en ningún lugar, a desatar votos, ni en Rosh Hashaná ni en Yom Kipur… לֹא רָאִינוּ וְלֹא שָׁמַעְנוּ מֵאֲבוֹתֵינוּ», «no lo vimos ni lo oímos de nuestros padres». Rav Hai Gaón: «no desatamos votos ni en Rosh Hashaná ni en Yom Kipur, y no oímos de nuestros maestros que lo hicieran en absoluto. אַף אַתֶּם הַחְמִירוּ כְּמוֹתֵינוּ וְאַל תְּשַׁנּוּ מִמִּנְהַג הַיְשִׁיבוֹת», «sean estrictos como nosotros y no cambien la costumbre de las academias». Y el Tur cierra la historia con siete palabras que son un capítulo entero de historia judía: «וּכְבָר פָּשַׁט הַמִּנְהָג בְּכָל הַמְּקוֹמוֹת לְאוֹמְרוֹ», «y ya se extendió la costumbre de decirlo en todos los lugares». Los gueonim perdieron. El pueblo lo cantó igual. La fórmula más famosa del año judío es, en su origen, una costumbre que las autoridades quisieron prohibir.`,
      },
      {
        etiqueta: "Rav Saadia Gaón (רַב סְעַדְיָה גָּאוֹן) — el freno que importa.",
        texto: `No todos los gueonim se opusieron. Rav Saadia lo aceptó, pero con un límite que hay que citar entero porque es el que impide todo abuso: «instituyeron los Sabios decir Kol Nidrei para una comunidad que erró y se impuso una prohibición por equivocación o por fuerza mayor… אֲבָל מִי שֶׁנִּשְׁבַּע כָּל הַשָּׁנָה לְהַתִּיר שְׁבוּעָה וּלְבַטְּלָהּ — לֹא», «pero el que jura durante todo el año para después anular su juramento y desatarlo — NO». Traducido: no es un permiso para jurar en falso. Quien jura ya planeando anularlo después queda expresamente excluido, por escrito, desde el siglo X.`,
      },
      {
        etiqueta: "El Maharam de Rotemburgo — una palabra que cambia el género.",
        texto: `El Maharam corrigió un detalle que parece mínimo y no lo es: no se dice «sea la voluntad que queden sueltos», sino directamente «queden sueltos». No es un deseo: es una declaración con efecto jurídico. Y precisamente porque es jurídica, tiene jurisdicción limitada — que es exactamente lo que el Tur delimita en el pasaje citado arriba, y lo que se desarrolla en el Pshat. Lo mismo explica la coreografía: se dice de día, con luz, antes de que entre la fiesta, porque no se anulan votos en Shabat ni en festividad salvo por necesidad de ese mismo día (Tur OC 619, de Shabat 157a); hay tres personas de pie, el cantor y dos más, una a cada lado (Shulján Aruj OC 619:4); y se dice tres veces, cada vez más fuerte (Ramá a OC 619:1, del Maharil).`,
      },
      {
        etiqueta: 'El Rambam (הָרַמְבַּ"ם) — el que ordena todo el día.',
        texto: `Tres aportes, y cada uno cambia la lectura. Hiljot Teshuvá 2:2, qué es la teshuvá: que el que erró abandone su falta, la saque de su pensamiento, resuelva no repetirla, se duela de lo hecho y lo confiese con sus labios. Cinco verbos, y el sujeto de los cinco es la persona: nadie hace esto por nadie. Hiljot Teshuvá 2:9, el límite: «ni la teshuvá ni Yom Kipur expían sino las faltas entre la persona y Dios; pero las faltas entre una persona y otra nunca le son perdonadas hasta que le dé a su prójimo lo que le debe y lo apacigüe» — y añade que aunque ya haya devuelto el dinero tiene que pedir perdón, y que aunque solo haya ofendido de palabra tiene que insistir; si el otro se niega, que lleve tres amigos, y si tras tres intentos sigue negándose, «הוּא הַחוֹטֵא», el que peca ahora es el que no perdona. Y Hiljot Teshuvá 7:6, el efecto: «אֶמֶשׁ הָיָה זֶה שָׂנאוּי… וְהַיּוֹם הוּא אָהוּב וְנֶחְמָד קָרוֹב וְיָדִיד» — «ayer esta persona era odiosa, repugnante, lejana; y hoy es amada, querida, cercana y amiga».`,
      },
      {
        etiqueta: 'El Arizal (הָאֲרִ"י) — las cinco que se cierran y las cinco que se abren.',
        texto: `Aquí entra la Cabalá luriana, y entra con una frase verificada que no hay que estirar ni un milímetro. En Sháar HaKavanot, Derushei Yom HaKipurim, el Arizal —por pluma de Rabí Jaim Vital— liga las cinco aflicciones del día con sus cinco oraciones: «וְלָכֵן נִצְטַוֵּינוּ בְּה׳ מִינֵי עִנּוּיִים אֵלּוּ… וְלָכֵן כְּנֶגְדָּם תִּיקְּנוּ ה׳ תְּפִילּוֹת בְּיוֹם הַכִּפּוּרִים כְּנֶגֶד ה׳ דְּבָרִים… כִּי הַתְּפִלּוֹת הֵם בְּסוֹד הַהֲבָלִים הַיּוֹצְאִים מִן הַפֶּה» — «y por eso se nos ordenaron estas cinco clases de aflicción… y por eso, frente a ellas, instituyeron cinco oraciones en Yom Kipur, frente a las cinco cosas… porque las oraciones son, en su secreto, los hálitos que salen de la boca». En castellano llano: las cinco cosas que dejas de hacer con el cuerpo son exactamente las cinco que empiezas a hacer con la voz. No pierdes cinco funciones — las cambias de instrumento. Y el propio Arizal lo sella con una equivalencia numérica que aquí se recalculó letra por letra: צוֹם (tzom, ayuno) = צ90+ו6+ם40 = 136; קוֹל (kol, voz) = ק100+ו6+ל30 = 136. Ayuno vale exactamente lo mismo que voz. Lo que el Arizal NO dice —y conviene decirlo aquí, en su propio párrafo— es que las cinco oraciones sean los cinco niveles del alma. Eso no está ni en Sháar HaKavanot ni en Pri Etz Jaim.`,
      },
      {
        etiqueta: "Rabí Jaim Vital (פְּרִי עֵץ חַיִּים) — la escalera y el sello.",
        texto: `En Pri Etz Jaim, Sháar Yom HaKipurim, el discípulo que puso por escrito al Arizal enseña que las cinco oraciones no son cinco repeticiones: son cinco peldaños, y los enumera uno por uno. La de la noche sube un piso; la de la mañana, otro; la adicional, otro; la de la tarde, otro. Y en Neilá la subida llega a su tope, hasta la región más alta y más oculta del sistema, el lugar del que manan los trece atributos de misericordia. Nada del día vuelve a bajar antes de eso. Y luego el sello: el jotám —el sello del año— se pone «רַק אַחַר תַּשְׁלוּם ה׳ תְּפִלּוֹת… וְנֶחְתַּם הַחוֹתָם», «solo después de que se completan las cinco oraciones». Por eso en Neilá se deja de decir kotvenu, «escríbenos», y se dice jotmenu, «séllanos». El año no se sella al principio del día: se sella al final, cuando ya llevas veinticuatro horas sin comer, cuando estás cansado y ya dijiste todo lo que tenías que decir.`,
      },
      {
        etiqueta: "Vaikrá 16 y el servicio del Templo — para el registro, y con el Ramban.",
        texto: `Esto se deja asentado aquí, dentro del estudio, porque el Sofer no esconde fuentes — y se deja aquí y no antes porque no es la puerta de entrada de nada. Mientras el Templo existió, el rito central del día estaba en Vaikrá 16: el Kohén Gadol se sumergía cinco veces ese día (Mishná Yomá 3:3) y vestía lino blanco liso (Vaikrá 16:4), no sus ropas de oro. Se tomaban dos machos cabríos que debían ser idénticos —«iguales en aspecto, en altura, en precio, y comprados juntos» (Mishná Yomá 6:1)— y se echaban suertes. Y sobre el segundo, el Ramban (Girona, siglo XIII) dice la frase que decide la lectura del capítulo entero: «כִּי הַמְשֻׁלָּח אֵינֶנּוּ קָרְבָּן, שֶׁלֹּא יִשָּׁחֵט», «porque el que es enviado no es una ofrenda, porque no se lo degüella». Sale caminando, vivo. Y lo más importante para entender el día tal como el judaísmo lo vive: hace casi dos mil años que no hay Templo, ni Kohén Gadol, ni machos cabríos, y el día siguió funcionando sin nada de eso. Lo que quedó fue lo que la Mishná puso en el centro al cerrar el tratado: la teshuvá, el día mismo, y el prójimo al que hay que ir a buscar. El desarrollo completo de Vaikrá 16 está en {{study:yom-kipur|el estudio hermano de este día}}.`,
      },
    ],
    glosa: `Glosa para el lector: néder = voto que uno se impone a sí mismo; shevuá = juramento; jérem = anatema. Bitul = anulación (el acto jurídico de Kol Nidrei). Avaryán = transgresor, «el que cruzó». Jelbená = gálbano, la resina maloliente del incienso del Templo. Gueonim = los rectores de las academias de Babilonia, siglos VII-XI. Ramá = las glosas asquenazíes al Shulján Aruj. Maharil y Maharam de Rotemburgo = autoridades asquenazíes medievales. Jotám = sello; de ahí jotmenu, «séllanos», la palabra de la Neilá.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (qué es Kol Nidrei y, sobre todo, qué NO es)",
        parrafos: [
          `Lo primero es lo más simple y lo que más se malentiende: Kol Nidrei no es una oración. No tiene bendición. No se le pide nada a Dios. Ni siquiera está en hebreo — está en arameo, el idioma en que se redactaban los contratos. Es, literalmente, un acta de tribunal. Y todo lo que lo rodea es procesal: se dice de día, con luz, antes de que entre Yom Kipur, porque no se anulan votos en Shabat ni en festividad salvo por necesidad de ese mismo día (Tur OC 619, de Shabat 157a) — cuando cae la noche ya no hay tribunal hábil, y Kol Nidrei tiene que entrar por la puerta antes de que la cierren. Hay tres personas de pie, el cantor y dos más, una a cada lado (Shulján Aruj OC 619:4): no es ceremonia, es que un tribunal judío requiere tres jueces y esta noche el pueblo entero necesita uno. Se dice tres veces, cada vez más fuerte (Ramá, del Maharil), como una proclama que se repite hasta que nadie pueda alegar que no la oyó. Y el cantor sostiene un rollo de Torá contra el pecho.`,
          `Y ahora el punto donde todo se juega: ¿qué desata exactamente? El Tur lo dice con una precisión que no deja rendija. La anulación vale únicamente para los votos que uno se impuso a sí mismo. No tiene ningún efecto —cero— sobre un voto que otra persona le impuso, ni sobre un juramento que le tomó su prójimo, ni sobre uno que le tomó un tribunal, ni sobre uno que le tomó la comunidad. Un contrato no se toca. Una deuda no se toca. Un compromiso con otro ser humano no se toca. Y por si alguien quisiera buscarle la vuelta, la ley del día entero está bajo el techo de la Mishná: lo que le debes a una persona, Yom Kipur no lo expía (Yomá 8:9). Kol Nidrei no puede desatar lo que el día mismo no puede expiar.`,
          `Entonces, ¿qué desata? Exactamente esto: las promesas que uno se hizo a sí mismo delante de Dios y no cumplió. «Nunca más.» «A partir del lunes.» «Este año sí.» El material del que está hecha la mala conciencia. Y Rav Saadia Gaón añade el filtro: los votos hechos por error o por fuerza mayor, no los calculados por quien ya planeaba anularlos. Por eso —y esta es la paradoja en su forma exacta— el día más solemne del año empieza retirando de la boca del pueblo las palabras que la boca no pudo sostener. Antes de pedir nada, se declara nulo el discurso inflado. Lo que entra a Yom Kipur es una persona que ya no está prometiendo.`,
          `Y antes de Kol Nidrei se dice la línea más escandalosa del año: «אָנוּ מַתִּירִין לְהִתְפַּלֵּל עִם הָעֲבַרְיָנִים», «damos permiso para rezar con los transgresores». La comunidad levanta formalmente la exclusión para que los que están afuera puedan entrar. Y no espera a que lo pidan: «וַאֲפִילּוּ אִם לֹא יְבַקְּשׁוּ», aunque no lo pidan. Por el gálbano: sin el ingrediente que hiede, el incienso del Templo no es el incienso del Templo. «Todo ayuno público que no tenga en él a los pecadores de Israel, no es un ayuno» (Keritot 6b). No dice «también son bienvenidos». Dice: sin ellos, esto no cuenta.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión)",
        parrafos: [
          `עַבַרְיָן, el transgresor, es «el que cruzó», de la raíz עבר, cruzar, pasar. Pero de esa misma raíz sale lo que dice Ravá sobre quien perdona: «כָּל הַמַּעֲבִיר עַל מִדּוֹתָיו — מַעֲבִירִין לוֹ» (Yomá 87b), «al que deja pasar, le dejan pasar». En hebreo, cruzar la línea y dejar pasar la ofensa son el mismo verbo. El idioma sabía, antes que nosotros, que el transgresor y el que perdona están hechos de la misma raíz.`,
          `Segunda alusión, y viene del Templo. Los dos machos cabríos debían ser indistinguibles: mismo aspecto, misma altura, mismo precio (Mishná Yomá 6:1). Lo que separaba a uno del otro no era su naturaleza — era una suerte. Por eso la línea entre «justo» y «transgresor» que la comunidad borra en Kol Nidrei no es sentimentalismo barato: es una lectura correcta del rito. Nadie sabe cuál de los dos es.`,
          `Tercera alusión, y va marcada porque es nuestra. כָּל נִדְרֵי suma 314: כ20+ל30 = 50, y נ50+ד4+ר200+י10 = 264. Y שַׁדַּי —uno de los Nombres divinos— suma 314: ש300+ד4+י10. La aritmética se comprobó letra por letra. La interpretación, en cambio, no se halló en ninguna fuente: es de Jashmal y así se rotula. Se ofrece como lo que es —una alusión que nos gustó— y se recoge más abajo, en la nota de autor, para que nadie la confunda con una enseñanza recibida.`,
        ],
      },
      {
        head: "דְּרָשׁ — Drash (por qué CINCO, y de qué cinco se trata)",
        parrafos: [
          `Yom Kipur tiene cinco aflicciones (Mishná Yomá 8:1): no comer y beber —cuentan como una—, no lavarse, no ungirse con aceites, no calzar sandalias de cuero, y no tener relaciones conyugales. ¿Y por qué cinco, y no cuatro o seis? El Talmud lo responde, y la respuesta es el eje de todo lo que sigue. Rav Jisdá (Yomá 76a): porque la Torá manda «afligirse» cinco veces, y los enumera — Bamidbar 29:7, Vaikrá 23:27, Vaikrá 23:32, Vaikrá 16:31 y Vaikrá 16:29. El número cinco no es una imposición devocional: lo cuenta el Talmud sobre versículos concretos.`,
          `Se fueron a buscar esos cinco versículos uno por uno. Y los cinco dicen lo mismo: «וְעִנִּיתֶם אֶת נַפְשֹׁתֵיכֶם», «afligirán sus almas». No dice «afligirán sus cuerpos». Dice nafshoteijem: almas, en plural. Cinco veces. El cinco de este día es, por redacción de la Torá misma, un cinco de ALMAS. Y es la razón por la que este estudio evita la palabra «ayuno» como definición del día: el ayuno es lo que hacemos, pero no es lo que se ordenó.`,
          `Y resulta que el alma tiene cinco nombres. Bereshit Rabá 14:9 —el Midrash es el registro homilético de los Sabios, siglos III-V— los da con definición, y conviene leerlos despacio. נֶפֶשׁ, Néfesh: «esta es la sangre» (de Devarim 12:23, «porque la sangre es el néfesh»): el alma que se confunde con el cuerpo. רוּחַ, Rúaj: «porque sube y baja» (de Kohélet 3:21): el alma que se mueve, el ánimo, el impulso. נְשָׁמָה, Neshamá: «este es el entendimiento». חַיָּה, Jayá: «porque todos los miembros mueren y ella vive en el cuerpo». Y יְחִידָה, Yejidá: «porque todos los miembros van de a dos, y ella es la única que está sola en el cuerpo». Lee otra vez la última. Dos ojos, dos oídos, dos manos, dos pies, dos pulmones. Todo en el cuerpo humano viene de a pares — menos una cosa. A esa cosa el Midrash la llama Yejidá: la única.`,
          `Cinco versículos que dicen «almas». Cinco aflicciones. Cinco nombres del alma. Y aquí se dice lo que es nuestro: ninguna fuente que hayamos podido abrir empareja las cinco aflicciones con los cinco nombres del alma. El puente es de Jashmal. Se tiende porque los tres extremos están verificados y porque el propio texto de la Torá insiste en la palabra «almas». Pero no se asigna cuál con cuál — eso sí sería inventar, y no se hace. Se dice «cinco y cinco», se dan las definiciones del Midrash, y el trabajo lo hace el lector.`,
          `Y el otro extremo del puente sí tiene autor, y ya se citó entero arriba: el Arizal liga las cinco aflicciones con las cinco oraciones del día, «porque las oraciones son, en su secreto, los hálitos que salen de la boca» (Sháar HaKavanot, Derushei Yom HaKipurim). Con eso, la cadena completa queda con cada eslabón etiquetado: cinco almas —puente de Jashmal, sobre base verificada— ← cinco aflicciones —Torá y Yomá 76a— → cinco oraciones —Arizal. Uno de los tres eslabones es nuestro, y es el único que va en amarillo.`,
        ],
      },
      {
        head: "סוֹד — Sod (la escalera, y cuál es la última puerta)",
        parrafos: [
          `Yom Kipur es el único día del año con cinco oraciones. Cualquier día común tiene tres. Un Shabat o una festividad tienen cuatro. Aquí hay cinco, porque se añade Neilá —«cierre»—, que no existe ningún otro día del calendario (Yomá 87b; Rambam, Hiljot Teshuvá 2:7). Y ya se vio arriba, con Rabí Jaim Vital, que esas cinco no son cinco repeticiones sino cinco peldaños, y que el sello del año se pone «solo después de que se completan las cinco». Lo más alto del día llega cuando menos fuerzas te quedan.`,
          `Sobre esto hay una enseñanza muy difundida —Jabad, jasidut contemporánea— según la cual las cinco oraciones corresponden a los cinco niveles del alma, y la Neilá es la Yejidá. Se buscó en fuente primaria y no está: ni en Pri Etz Jaim, Sháar Yom HaKipurim, ni en Sháar HaKavanot. El Arizal liga las oraciones con las aflicciones, no con los nombres del alma. Es tradición transmitida, y así se da — no como enseñanza del Arizal. Lo que sí se puede decir con papeles en la mano es algo más fuerte y más sobrio: la quinta oración llega adonde ninguna de las otras cuatro llega, y el año no queda sellado hasta que ella se dice.`,
          `Y hay una pregunta que el Talmud dejó abierta, y que es el verdadero secreto de este día: ¿qué puertas se cierran en la Neilá? «אֵימָתַי הִיא נְעִילָה?… רַב אָמַר: בִּנְעִילַת שַׁעֲרֵי שָׁמַיִם. וְרִבִּי יוֹחָנָן אָמַר: בִּנְעִילַת שַׁעֲרֵי הֵיכָל» (Talmud Yerushalmi, Berajot 4:1). Rav: son las puertas del cielo, que se cierran al caer la noche. Rabí Yojanán: son las puertas del Templo, que se cerraban al atardecer, con el sol todavía visible. Y no es un detalle de horario: son dos teologías del último minuto. Si son las del cielo, hay un plazo y se acaba: reza como quien alcanza un tren. Si son las del Templo, lo que se cierra es la casa, aquí abajo, y cerrarla es un acto humano — en esa lectura las puertas del cielo no se cierran nunca, y lo que tiene horario es nuestra capacidad de presentarnos.`,
          `El Rambam se inclina por Rav, con una imagen preciosa: se cerraron las puertas del cielo «detrás del sol», que se escondió (Hiljot Tefilá 1:7). Y la práctica se quedó con las dos: la Neilá empieza con el sol todavía arriba —las puertas del Templo— y termina con la noche cerrada —las puertas del cielo. El día entero se sostiene en el intervalo entre las dos puertas. Y el patrón del día completo queda a la vista: empieza con שָׁרָן, «sueltos», y termina con חוֹתָם, «sellado». Primero se suelta lo que no era verdad; después se sella lo que sí lo es.`,
        ],
      },
    ],
    caja: {
      titulo: "cinco almas ← cinco aflicciones → cinco oraciones",
      cuerpo:
        "El eslabón del medio es de la Torá y del Talmud: cinco versículos que dicen «afligirán sus ALMAS» (Bamidbar 29:7 · Vaikrá 23:27 · 23:32 · 16:31 · 16:29), contados por Rav Jisdá en Yomá 76a. El de la derecha es del Arizal, verificado: las cinco aflicciones frente a las cinco oraciones, «porque las oraciones son los hálitos que salen de la boca» (Sháar HaKavanot), y sellado en צוֹם = 136 = קוֹל. El de la IZQUIERDA es lectura de Jashmal: ninguna fuente lo dice, y no se empareja una aflicción concreta con un nivel concreto del alma.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no entra ninguna fuente nueva ni ningún comentario nuevo; solo nos detenemos en lo que ya se dijo, en el orden exacto en que ocurre.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña el orden de la noche?",
        texto: `Que primero se levanta la exclusión. Antes de una sola palabra de oración, la comunidad declara en voz alta que los que están afuera pueden entrar — y que no hace falta que lo pidan. Detente a imaginar qué se siente estar en una sala donde eso se dice antes que nada. Y detente en lo otro, que es más incómodo: de qué lado de esa frase te pusiste tú. Porque la sala no tiene dos grupos. La declaración se hace en plural, con la voz de todos, y la dicen los mismos que están siendo desatados.`,
      },
      {
        etiqueta: "¿Qué se me retira, exactamente?",
        texto: `No las deudas, no los compromisos con la gente: las promesas que te hiciste a ti mismo. Piensa en una concreta. La de enero. La del año pasado. La que repetiste tres años seguidos. El día más solemne del año empieza sacándola de la mesa — no para que deje de importar, sino para que puedas presentarte sin ella colgando. Hay una diferencia enorme entre entrar a un lugar sagrado cargando una promesa incumplida y entrar habiéndola declarado nula. Lo primero es vergüenza. Lo segundo es verdad.`,
      },
      {
        etiqueta: "¿Y qué NO se desata?",
        texto: `Lo que le debes a otra persona sigue exactamente donde estaba. Kol Nidrei tiene un límite de jurisdicción, y el límite es el otro ser humano. No hay noche, ni melodía, ni tribunal de arriba que borre una llamada que no quieres hacer. Aquí la religión no te da una salida: te cierra la única salida falsa. Y mira quién es el sujeto de los cinco verbos del Rambam —abandonar, sacar del pensamiento, resolver, dolerse, confesar—: los cinco los hace la persona. Nadie repara a nadie. El día no te hace el trabajo: te da un marco para hacerlo. Y cuando está hecho, «ayer era odioso; hoy es amado, querido, cercano y amigo». Ese cambio no le pasa al mundo: le pasa a alguien que trabajó.`,
      },
      {
        etiqueta: "¿Qué patrón veo en los cincos?",
        texto: `Cinco bocas se cierran. No comes, no te lavas, no te unges, no te calzas, no tocas. Y cinco veces en el día abres la boca para otra cosa. Pregúntate qué tienes que dejar de hacer para empezar a decir. Y mira lo que la tradición dice que pasa ese día: que un pueblo entero se parece a los ángeles — sin comer, sin beber, descalzos, en paz unos con otros. Eso cambia por completo el sentido del ayuno. No estás pagando nada. Estás, por veinticinco horas, viviendo como si no tuvieras cuerpo que atender. Es más cercano a un ensayo que a un castigo.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Al final, cuando ya no queda día, hay una quinta oración que no existe ningún otro día del año y que llega más alto que las cuatro anteriores. Con hambre. Cansado. Habiéndolo dicho ya todo. Mira ahora el patrón entero: el día empieza desatando y termina sellando. Sueltos al principio; sellados al final. Primero se suelta lo que no era verdad, después se sella lo que sí lo es. Ese es el movimiento de cualquier reparación honesta que hayas hecho en tu vida. Y una última, para llevarse: los dos machos cabríos eran idénticos, y nadie podía saber cuál era cuál hasta que salieron las suertes. Guarda eso la próxima vez que mires a alguien y creas saber de qué lado está.`,
      },
    ],
  },

  maase: {
    intro:
      "Yom Kipur entra el domingo 20 de septiembre al atardecer. Seis acciones, en orden de dificultad real — y las tres primeras no se pueden hacer en silencio.",
    etiqueta: "Un nombre, no una lista.",
    texto: `Hoy, antes de dormir, escribe UN nombre: una sola persona a la que le debes algo — dinero, una disculpa, una explicación, una llamada. Un nombre, no una lista; las listas son una forma elegante de no hacer nada. Antes del domingo, contacta a esa persona: el Rambam es explícito (Teshuvá 2:9) en que aunque ya hayas devuelto el dinero hay que pedir perdón, y en que aunque solo hayas ofendido de palabra hay que insistir hasta que te perdonen. Y si alguien te pide perdón a ti, di que sí: el Rambam cierra esa misma ley con una advertencia que casi nadie cita — si el otro pidió perdón de verdad y tú no perdonas, el que peca ahora eres tú. Antes de Yom Kipur hay dos trabajos, no uno. Cuarto: retira una promesa, en voz alta. Antes de que entre el día, di —solo, sin ceremonia— una promesa que te hiciste y no cumpliste, y declárala terminada; no la renueves, y no prometas nada nuevo esta semana. Kol Nidrei enseña que hay un momento del año en que lo religioso es dejar de prometer. Quinto, la midá a trabajar: מַעֲבִיר עַל מִדּוֹתָיו, dejar pasar. Una vez esta semana, cuando tengas razón y puedas cobrarla, no la cobres — «al que deja pasar, le dejan pasar» (Ravá, Yomá 87b), y es la única ley del día que puedes cumplir hoy mismo. Y sexto, para el día: quédate hasta Neilá. Es la oración que no existe ningún otro día del año, la que llega más alto, y la que la gente se pierde porque a esa hora ya tiene hambre. El sello del año se pone ahí.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El día más solemne del año judío no empieza con una promesa: empieza levantando la exclusión de los que están afuera —«damos permiso para rezar con los transgresores», y «aunque no lo pidan»— y retirando las promesas que no se pudieron sostener. Y termina, veinticinco horas después, con una oración que no existe ningún otro día del calendario. Yom Kipur empieza desatando y termina sellando, y en el medio no hay un pago: hay un trabajo que hace la propia persona y que nadie puede hacer por ella.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Kol Nidrei tiene jurisdicción, y su límite es exacto: desata lo que te prometiste a ti mismo delante de Dios, y no toca nada de lo que le debes a otro ser humano (Tur, Oraj Jaim 619; Mishná Yomá 8:9). Lo que parecía una puerta trasera resulta ser la única puerta que se cierra: el día que lo perdona todo tiene una excepción, y la excepción es la gente.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `Las cinco veces que la Torá manda afligirse dicen, las cinco, «afligirán sus ALMAS» (verificado uno por uno). Y el alma, dice el Midrash, tiene cinco nombres — el último de los cuales, Yejidá, se define así: «porque todos los miembros van de a dos, y ella es la única que está sola en el cuerpo» (Bereshit Rabá 14:9). Cinco bocas se cierran para que cinco voces se abran: el Arizal liga las cinco aflicciones con las cinco oraciones, y sella la idea con una equivalencia recalculada aquí — צוֹם = קוֹל, 136 = 136: ayuno vale lo mismo que voz. El ayuno no compra nada. Es lo que le pasa a una voz cuando el cuerpo se calla.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Un nombre. Una llamada. Una promesa retirada. Una razón que no cobras. Y el domingo, quedarte hasta el final.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — dos jidushim de Jashmal",
    rotulo:
      "No son citas ni fuentes clásicas: son lecturas de Jashmal sobre datos verificados, marcadas como tales. La aritmética está comprobada; la interpretación es nuestra.",
    parrafos: [
      `El primero, y es el que sostiene medio estudio. Que las cinco aflicciones del día se toquen con los cinco nombres del alma no lo dice ninguna fuente que hayamos podido abrir. Lo que sí está verificado son los tres extremos: que el número cinco lo deriva el Talmud de cinco versículos (Yomá 76a), que los cinco versículos dicen literalmente «sus almas» (los fuimos a contar), y que el alma tiene cinco nombres con definición (Bereshit Rabá 14:9). El puente entre el primer par y el tercero es nuestro. Lo tendemos porque el propio texto de la Torá insiste en la palabra «almas» cinco veces seguidas, y porque el otro extremo del puente —aflicciones y oraciones— sí lo cerró el Arizal. Pero no asignamos cuál con cuál: emparejar una aflicción concreta con un nivel concreto del alma sería inventar, y quien lo haga no lo estará haciendo con nosotros.`,
      `El segundo es más pequeño y se ofrece como lo que es: una alusión que nos gustó. כָּל נִדְרֵי suma 314 —כ20+ל30 = 50; נ50+ד4+ר200+י10 = 264— y שַׁדַּי, uno de los Nombres divinos, suma también 314 —ש300+ד4+י10. La aritmética se comprobó letra por letra y es exacta. La lectura, en cambio, no se halló en ninguna fuente, y por eso vive aquí y no en el cuerpo del estudio: que el acta con la que un pueblo se declara libre de sus propias palabras valga lo mismo que el Nombre que la tradición asocia al límite —el que le dijo «basta» al mundo— es una coincidencia bien colocada, y nada más que eso. Nadie está obligado a leerlo así.`,
    ],
  },

  hemshej: [
    "{{study:yom-kipur|Y el estudio madre del día: por qué el versículo no dice «por su ayuno se expiará», sino «en ESTE DÍA» — Vaikrá 16, los dos machos cabríos y el hilo que se volvía blanco.}}",
    "{{study:cinco-luces-mashiaj|Si el cinco de las almas te quedó sonando: las cinco luces y su revelación. (Hilo de Jashmal: el puente con las cinco aflicciones es nuestro, no de una fuente.)}}",
    "{{study:rosh-hashana|Diez días antes se abrió lo que esta noche se cierra. El juicio que se celebra vestido de blanco.}}",
    "{{study:bendicion-invertida|Si te tocó la idea de que el ingrediente que hiede sea justamente el que hace falta: la bendición invertida.}}",
    "{{letter:tet|Y la letra del bien escondido — el bien guardado dentro de lo que no parece bueno.}}",
  ],

  ctaRef: "Leviticus 23:32",
};
