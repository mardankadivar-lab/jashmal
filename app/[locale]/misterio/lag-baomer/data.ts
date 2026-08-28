import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — ל״ג בָּעוֹמֶר · אִתְכְּנָשׁוּ לְהִילּוּלָא דְּרִבִּי שִׁמְעוֹן
//  Serie «Tiempos Sagrados» (moadim) · Estudio 9b — Lag BaOmer.
//
//  Hero en modo "dimensiones" (NO gematría). Motivo: la única cifra del día es
//  ל״ג = 33, que es la NOTACIÓN del número, no un hallazgo; presentarla como
//  gematría sería vender aire. La única equivalencia real que salió —
//  רשב״י (512) = דְּבֵקוּת (512)— es aritmética verificada pero SIN fuente
//  clásica y sobre un acrónimo: va marcada como jidush de Jashmal, no en el hero.
//
//  FUENTES VERIFICADAS CONTRA SEFARIA (2026-08-27):
//   · Vaikrá 23:15-16 — la cuenta del Ómer. Texto masorético cotejado.
//     Rashi ad loc. 23:16 ("ולא עד בכלל, והן ארבעים ותשעה יום") cotejado.
//     Ibn Ezra a Vaikrá 23:15 cotejado (la disputa con "המכחישים", los que
//     niegan la tradición oral). Ramban a Vaikrá 23:15 cotejado: los 49 días
//     espejan los 49 años del yovel, y "וספרתם לכם" obliga a CADA UNO a contar
//     con su boca.
//   · Yevamot 62b — COTEJADO LITERAL: "שנים עשר אלף זוגים תלמידים היו לו לרבי
//     עקיבא מגבת עד אנטיפרס, וכולן מתו בפרק אחד, מפני שלא נהגו כבוד זה לזה…
//     תנא, כולם מתו מפסח ועד עצרת… מיתה רעה… אסכרה". DOS PRECISIONES QUE EL
//     ESTUDIO DICE EN VOZ ALTA: (a) son DOCE MIL PAREJAS (= 24.000), y que
//     fueran parejas hace más filoso el "no se honraron unos a otros";
//     (b) la Guemará NO menciona el día 33 ni Lag BaOmer, y dice "de Pésaj
//     hasta Atzéret", sin corte. Y Rabí Shimón (bar Yojái) aparece ahí mismo
//     como uno de los CINCO discípulos del sur que reconstruyeron la Torá.
//   · Shabat 33b — COTEJADO LITERAL Y ENTERO: la conversación sobre Roma
//     (Yehudá elogia, Yosí calla, Shimón condena), la delación de Yehudá ben
//     Guerim, la sentencia, el bet midrash, la cueva, el algarrobo y la fuente,
//     los doce años, Eliyahu en la boca de la cueva, los ojos que queman a los
//     labradores, el bat kol "¿a destruir Mi mundo salieron? ¡vuelvan a su
//     cueva!", los doce meses, "בני, די לעולם אני ואתה", el anciano con los dos
//     ramos de mirto en la víspera de Shabat (uno por Zajor y uno por Shamor)
//     y "איתיבה דעתייהו", y R. Pinjás ben Yaír en la casa de baños.
//   · Berajot 35b — COTEJADO: la disputa R. Yishmael ("הנהג בהן מנהג דרך ארץ")
//     vs. Rashbí ("אפשר אדם חורש בשעת חרישה… תורה מה תהא עליה?"), y el veredicto
//     de Abayé: "הרבה עשו כרבי ישמעאל ועלתה בידן, כרבי שמעון בן יוחי ולא עלתה
//     בידן". Es la clave para leer la escena de los labradores sin adornarla.
//   · Eruvin 54a — COTEJADO: Shmuel a Rav Yehudá, "חטוף ואכול חטוף ואישתי,
//     דעלמא דאזלינן מיניה כהלולא דמי" — el mundo del que partimos es como una
//     boda. Es el ancla TALMÚDICA de la palabra hilulá.
//   · Zohar, Idra Zuta — COTEJADO EN SEFARIA, capítulos 1 y 42-43 (Sefaria
//     pagina la Idra Zuta por capítulos, no por daf; la numeración impresa
//     "Zohar III:287b y ss." NO se puede confirmar ahí, y por eso se cita por
//     la ubicación verificable):
//      · 1:1 — "בההוא יומא דרבי שמעון בעא לאסתלקא מן עלמא".
//      · 1:4 — "הא השתא שעתא דרעותא הוא… והא מלין קדישין דלא גליאן עד השתא,
//        בעינא לגלאה קמי שכינתא".
//      · 1:5 — "רבי אבא יכתוב, ורבי אלעזר ברי ילעי, ושאר חברייא ירחשון בלבייהו".
//      · 1:9 — abre con Shir HaShirim 7:11: "אֲנִי לְדוֹדִי וְעָלַי תְּשׁוּקָתוֹ.
//        כל יומין דאתקטרנא בהאי עלמא, בחד קטירא אתקטרנא ביה בקודשא בריך הוא".
//        (Es EL MISMO verso que el estudio de Elul identifica como el grado
//        más alto de los tres órdenes del Cantar. Enlace verificado.)
//      · 43:1 — "לא סיים בוצינא קדישא למימר חיים, עד דאשתככו מלוי".
//      · 43:2 — "אתעטף שכיב על ימיניה, ואנפוי חייכין".
//      · 43:5 — "שמעו קלא, עולו ואתו, ואתכנשו לְהִילּוּלָא דְּרִבִּי שִׁמְעוֹן".
//        LA PALABRA HILULÁ ESTÁ EN EL ZOHAR MISMO. Verificada.
//      · 43:6 — al entrar a la cueva: "זה האיש מרעיש הארץ מרגיז ממלכות" y el
//        cierre con Daniel 12:13 (cotejado: "וְאַתָּה לֵךְ לַקֵּץ…").
//        OJO: el masorético de Yeshayá 14:16 dice "הֲזֶה הָאִישׁ מַרְגִּיז הָאָרֶץ
//        מַרְעִישׁ מַמְלָכוֹת" — verbos invertidos y en pregunta, y dirigido al rey
//        de Babel como insulto. El Zohar lo cita al revés y en afirmativo. Se
//        dice en el cuerpo en vez de disimularlo.
//     LO QUE LA IDRA ZUTA NO DICE: la fecha. No hay 18 de Iyar, no hay Lag
//     BaOmer, no hay hoguera. Se dice en el aviso.
//   · Shulján Aruj, Oraj Jaim 493:1-2 — COTEJADO. La razón que da el código
//     para el 33 es "שאומרים שאז פסקו מלמות" — "porque DICEN que entonces
//     dejaron de morir", con el verbo en condicional. NO menciona a Rashbí.
//     Rema: "מסתפרין ביום ל״ג ומרבים בו קצת שמחה ואין אומרים בו תחנון" —
//     "un POCO de alegría". Ni hogueras, ni Merón, ni hilulá.
//   · Shulján Aruj, Oraj Jaim 131:6 — no se dice tajanún en Lag BaOmer.
//     Cotejado (el mismo pasaje que menciona el 15 de Shvat).
//   · Mishná Berurá a Oraj Jaim 493 (incisos 1-19) — cotejado: explica los
//     distintos minhaguim del duelo y NO menciona la hilulá de Rashbí.
//   · Kol Bo 75:50 (rishonim, s. XIII-XIV) — cotejado: el duelo del Ómer y su
//     razón, sin Rashbí.
//   · Rambam, Moré Nevujim III:43 — cotejado: la cuenta del Ómer es
//     "כמי שמחכה לבואו של האהוב עליו ביותר, שהוא סופר את הימים ואת השעות".
//   · Abarbanel a Vaikrá 23 — cotejado: los moadim se llaman "לה׳" para que
//     nadie los confunda con fiestas astrológicas o agrícolas. (Nota: la
//     edición de Sefaria de Abarbanel a Vaikrá 23 no llega a los versículos del
//     Ómer; se cita solo lo que sí está.)
//   · Tehilim 119:18 — "גַּל־עֵינַי וְאַבִּיטָה נִפְלָאוֹת מִתּוֹרָתֶךָ". Cotejado.
//     Rashi ad loc.: "נפלאות מתורתך — דברים המכוסים בה שאינם מפורשים בה".
//     Malbim ad loc.: "גלות עינים הוא להשיג דבר יותר על כח טבעו". Cotejados.
//   · Sefer Yetzirá (Gra) 5 — las doce letras simples ה ו ז ח ט י ל נ ס ע צ ק
//     frente a Nisán…Adar: la letra del mes de Iyar es la ו (vav). Cotejado.
//   · Sucá 45b y Berajot 35b — Rashbí en su propia voz. Cotejados.
//   · Fecha: 18 de Iyar 5787 = 25 de mayo de 2027 (martes), día 33 del Ómer.
//     Verificado con el conversor de hebcal, que además rotula el día como
//     "Lag BaOmer / 33rd day of the Omer".
//
//  ARITMÉTICA VERIFICADA (Python):
//    ל״ג = ל30 + ג3 = 33 — es la NOTACIÓN del número, no una gematría.
//    גַּל = ג3 + ל30 = 33 — misma cuenta, mismas letras al revés. Se presenta
//      como permutación de letras (raíz ג־ל־ה, "revelar"), NO como equivalencia
//      entre dos palabras distintas. Se dice explícitamente.
//    Día 33 del Ómer = 4 semanas completas (28) + 5 = quinta semana, quinto día
//      → הוֹד שֶׁבְּהוֹד en el esquema sefirótico habitual del conteo.
//    רשב״י = ר200+ש300+ב2+י10 = 512 · דְּבֵקוּת = ד4+ב2+ק100+ו6+ת400 = 512.
//      Correcto, pero es un acrónimo y no tiene fuente: va como jidush.
//  DESCARTADAS:
//    · מֵירוֹן = 306 — no equivale a nada relevante. Fuera.
//    · הִילּוּלָא = 82 — no equivale a nada relevante. Fuera.
//    · אוֹר = רָז = 207 es cierto y clásico, pero no pude anclarlo a una fuente
//      alojada en Sefaria: no se usa como pieza del argumento.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "lag-baomer",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 9b — Lag BaOmer · la muerte que se llama boda",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۹ب — لَگ بَعومر · مرگی که آن را عروسی می‌نامند",
    he: "אִתְכְּנָשׁוּ לְהִילּוּלָא דְּרִבִּי שִׁמְעוֹן",
    titulo: "Lag BaOmer — la boda del día treinta y tres",
    tituloFa: "لگ بعومر — عروسیِ روزِ سی‌وسوم",
    ganchoEs:
      "En medio de siete semanas de duelo —sin bodas, sin música, sin cortarse el pelo— hay un día en que se encienden hogueras y se canta. Y la razón es una muerte. El día en que murió Rabí Shimón bar Yojái no se llama funeral: se llama הִילּוּלָא, hilulá, «boda». La palabra está en el Zohar mismo, en la escena de su muerte. Este estudio pregunta por qué.",
    ganchoFa:
      "در میانهٔ هفت هفته سوگ — بی‌عروسی، بی‌موسیقی، بی‌کوتاه‌کردنِ مو — روزی هست که آتش‌ها برمی‌افروزند و آواز می‌خوانند. و سبب، یک مرگ است. روزی که ربی شیمعون بار یوحای درگذشت «سوگ» نام ندارد: آن را הילולא، هیلولا، «عروسی» می‌خوانند. این واژه در خودِ زوهر است، در صحنهٔ مرگِ او. این مطالعه می‌پرسد چرا.",
    dimensiones: [
      { es: "Un duelo que se interrumpe", fa: "سوگی که قطع می‌شود" },
      { es: "Una muerte llamada boda", fa: "مرگی که عروسی نام دارد" },
      { es: "El libro que nace ese día", fa: "کتابی که در آن روز زاده می‌شود" },
    ],
    fecha: "Lag BaOmer 5787 · 25 may 2027",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — qué es Talmud, qué es Zohar y qué es costumbre tardía",
    rotulo:
      "En ningún día del año se mezclan tanto las capas como en este. Se separan de entrada, y quien quiera la fiesta entera la va a tener igual — pero sabiendo de dónde viene cada pieza.",
    parrafos: [
      `Primero, lo que sí dice el Talmud. En Yevamot 62b se cuenta que Rabí Akiva tenía doce mil PAREJAS de alumnos —veinticuatro mil personas— entre Guevat y Antipatris, "וְכוּלָּן מֵתוּ בְּפֶרֶק אֶחָד, מִפְּנֵי שֶׁלֹּא נָהֲגוּ כָּבוֹד זֶה לָזֶה", y todos murieron en un mismo período porque no se trataron con respeto unos a otros. Y añade una baraita: "כּוּלָּם מֵתוּ מִפֶּסַח וְעַד עֲצֶרֶת", todos murieron de Pésaj a Shavuot. Eso es todo. La Guemará no menciona el día treinta y tres, no dice que la plaga se detuviera, no dice "Lag BaOmer" ni una vez. El corte en el día 33 es de fuentes muy posteriores —geonim y rishonim—, y llega al Shulján Aruj con una fórmula que conviene leer despacio: "שֶׁאוֹמְרִים שֶׁאָז פָּסְקוּ מִלָּמוּת", "porque DICEN que entonces dejaron de morir" (Oraj Jaim 493:2). El propio código legal lo pone en boca de otros.`,
      `Segundo, y es la diferencia que casi nadie hace. La razón que el Shulján Aruj da para alegrarse el día 33 NO es la muerte de Rabí Shimón bar Yojái: es que cesó la mortandad de los alumnos de Rabí Akiva. Y la medida de alegría que autoriza el Ramá es sobria hasta la timidez: "מְסַתְּפְּרִין בְּיוֹם ל״ג וּמַרְבִּים בּוֹ קְצָת שִׂמְחָה וְאֵין אוֹמְרִים בּוֹ תַּחֲנוּן" — se cortan el pelo, se aumenta UN POCO de alegría y no se dice tajanún. Ni hogueras, ni peregrinación a Merón, ni hilulá. La Mishná Berurá, que comenta ese capítulo con diecinueve incisos y discute con detalle todos los usos del duelo, tampoco menciona a Rashbí. La capa de Rashbí es real, es antigua y es honda — pero es otra capa, y viene del mundo cabalístico, sobre todo del círculo de Tzfat en el siglo XVI.`,
      `Tercero, la pieza más delicada del estudio. La palabra הִילּוּלָא, hilulá —"boda", "banquete nupcial"— aplicada a la muerte de Rabí Shimón SÍ está en el Zohar, y aquí se cita cotejada: en la Idra Zuta, cuando sacan su lecho, "שָׁמְעוּ קָלָא, עוּלוּ וְאָתוּ, וְאִתְכְּנָשׁוּ לְהִילּוּלָא דְּרִבִּי שִׁמְעוֹן" — oyeron una voz: "entren y vengan, reúnanse para la hilulá de Rabí Shimón" (Zohar, Idra Zuta 43:5). Lo que el Zohar NO dice, en ninguna parte de esa escena, es la FECHA. No hay 18 de Iyar. No hay día 33. La identificación de la hilulá con Lag BaOmer es posterior al Zohar, y hay que decirlo sin rodeos: es una tradición, no un dato del texto.`,
      `Y cuarto, sobre la paginación. Esta Idra suele citarse como "Zohar III:287b y siguientes". Sefaria pagina la Idra Zuta por capítulos y no por folio, de modo que ese número no se pudo confirmar allí directamente. Por eso este estudio cita siempre por la ubicación que sí es verificable —Zohar, Idra Zuta, capítulo y párrafo— y no inventa un daf. Es menos elegante y es honesto.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — de una plaga a una boda",
    intro: [
      `El esqueleto antes del recorrido. Seis textos verificados, y entre el primero y el último hay un giro completo: se empieza contando muertos por falta de respeto y se termina llamando boda a un funeral.`,
    ],
    filas: [
      {
        ref: "Vaikrá 23:15-16",
        he: "וּסְפַרְתֶּם לָכֶם… שֶׁבַע שַׁבָּתוֹת תְּמִימֹת",
        es: "Y contaréis para vosotros… siete semanas completas",
        funcion: "El marco: cuarenta y nueve días contados uno por uno. El día 33 cae adentro.",
      },
      {
        ref: "Yevamot 62b",
        he: "מִפְּנֵי שֶׁלֹּא נָהֲגוּ כָּבוֹד זֶה לָזֶה",
        es: "Porque no se trataron con respeto unos a otros",
        funcion:
          "La causa del duelo. Doce mil parejas de alumnos: eran compañeros de estudio.",
      },
      {
        ref: "Yevamot 62b (continuación)",
        he: "עַד שֶׁבָּא רַבִּי עֲקִיבָא אֵצֶל רַבּוֹתֵינוּ שֶׁבַּדָּרוֹם",
        es: "Hasta que fue Rabí Akiva donde nuestros Maestros del sur",
        funcion:
          "La reconstrucción: cinco alumnos nuevos. Uno de ellos es Rabí Shimón bar Yojái.",
      },
      {
        ref: "Shabat 33b",
        he: "אִיתִּיבוּ תְּרֵיסַר שְׁנֵי בִּמְעָרְתָּא",
        es: "Estuvieron doce años en la cueva",
        funcion: "El personaje: la sentencia de muerte, la cueva, el algarrobo, los ojos que queman.",
      },
      {
        ref: "Zohar, Idra Zuta 1:4",
        he: "מִלִּין קַדִּישִׁין דְּלָא גָּלְיָאן עַד הַשְׁתָּא",
        es: "Palabras santas que no se revelaron hasta ahora",
        funcion: "El día de su muerte: revela lo que había guardado toda la vida.",
      },
      {
        ref: "Zohar, Idra Zuta 43:5",
        he: "אִתְכְּנָשׁוּ לְהִילּוּלָא דְּרִבִּי שִׁמְעוֹן",
        es: "Reúnanse para la boda de Rabí Shimón",
        funcion: "El nombre del día. No funeral: hilulá.",
      },
    ],
    cierre: [
      `Un duelo por falta de honor, cinco hombres que rehacen la Torá, doce años en una cueva, un secreto guardado hasta el último día y una voz que llama a una boda. Ese es Lag BaOmer.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "El marco — Vaikrá (Levítico) 23:15-16",
        he: "וּסְפַרְתֶּם לָכֶם מִמׇּחֳרַת הַשַּׁבָּת מִיּוֹם הֲבִיאֲכֶם אֶת־עֹמֶר הַתְּנוּפָה, שֶׁבַע שַׁבָּתוֹת תְּמִימֹת תִּהְיֶינָה׃ עַד מִמׇּחֳרַת הַשַּׁבָּת הַשְּׁבִיעִת תִּסְפְּרוּ חֲמִשִּׁים יוֹם, וְהִקְרַבְתֶּם מִנְחָה חֲדָשָׁה לַיהֹוָה׃",
        es: "Y contaréis para vosotros, desde el día siguiente al descanso, desde el día en que trajisteis el ómer de la ofrenda mecida, siete semanas completas serán. Hasta el día siguiente a la séptima semana contaréis cincuenta días, y ofreceréis una oblación nueva a YHVH.",
        source: "Vaikrá 23:15-16",
      },
      {
        label: "La causa del duelo — Talmud Bavlí, Yevamot 62b",
        he: "אָמְרוּ׃ שְׁנֵים עָשָׂר אָלֶף זוּגִים תַּלְמִידִים הָיוּ לוֹ לְרַבִּי עֲקִיבָא מִגְּבָת עַד אַנְטִיפְרַס, וְכוּלָּן מֵתוּ בְּפֶרֶק אֶחָד, מִפְּנֵי שֶׁלֹּא נָהֲגוּ כָּבוֹד זֶה לָזֶה… תָּנָא, כּוּלָּם מֵתוּ מִפֶּסַח וְעַד עֲצֶרֶת׃",
        es: "Dijeron: doce mil parejas de alumnos tenía Rabí Akiva, desde Guevat hasta Antipatris, y todos murieron en un mismo período, porque no se trataron con respeto unos a otros… Se enseñó: todos murieron de Pésaj a Atzéret (Shavuot).",
        source: "Yevamot 62b",
      },
      {
        label: "La reconstrucción, y quién estaba en ella — Yevamot 62b",
        he: "וְהָיָה הָעוֹלָם שָׁמֵם, עַד שֶׁבָּא רַבִּי עֲקִיבָא אֵצֶל רַבּוֹתֵינוּ שֶׁבַּדָּרוֹם וּשְׁנָאָהּ לָהֶם׃ רַבִּי מֵאִיר, וְרַבִּי יְהוּדָה, וְרַבִּי יוֹסֵי, וְרַבִּי שִׁמְעוֹן, וְרַבִּי אֶלְעָזָר בֶּן שַׁמּוּעַ, וְהֵם הֵם הֶעֱמִידוּ תּוֹרָה אוֹתָהּ שָׁעָה׃",
        es: "Y el mundo quedó desolado, hasta que Rabí Akiva fue donde nuestros Maestros del sur y se la enseñó a ellos: Rabí Meir, Rabí Yehudá, Rabí Yosí, Rabí Shimón y Rabí Elazar ben Shamúa — y ellos fueron los que sostuvieron la Torá en aquella hora.",
        source: "Yevamot 62b",
      },
      {
        label: "La cueva — Talmud Bavlí, Shabat 33b",
        he: "אֲזַלוּ טְשׁוֹ בִּמְעָרְתָּא. אִיתְרְחִישׁ נִיסָּא אִיבְּרִי לְהוּ חָרוּבָא וְעֵינָא דְמַיָּא… אִיתִּיבוּ תְּרֵיסַר שְׁנֵי בִּמְעָרְתָּא… נְפַקוּ, חֲזוֹ אִינָשֵׁי דְּקָא כָּרְבִי וְזָרְעִי, אָמְרִין׃ מַנִּיחִין חַיֵּי עוֹלָם וְעוֹסְקִין בְּחַיֵּי שָׁעָה. כׇּל מָקוֹם שֶׁנּוֹתְנִין עֵינֵיהֶן מִיָּד נִשְׂרָף. יָצְתָה בַּת קוֹל וְאָמְרָה לָהֶם׃ לְהַחֲרִיב עוֹלָמִי יְצָאתֶם?! חִיזְרוּ לִמְעָרַתְכֶם!",
        es: "Fueron y se escondieron en una cueva. Ocurrió un milagro: se creó para ellos un algarrobo y un manantial de agua… Estuvieron doce años en la cueva… Salieron, vieron gente que araba y sembraba, y dijeron: «abandonan la vida eterna y se ocupan de la vida pasajera». Todo lugar donde ponían los ojos, de inmediato se quemaba. Salió una voz del cielo y les dijo: «¿A destruir Mi mundo han salido? ¡Vuelvan a su cueva!».",
        source: "Shabat 33b",
      },
      {
        label: "El nombre del día — Zohar, Idra Zuta 43:5",
        he: "בָּתַר דְּנָפַק פּוּרְיָיא, הֲוָה סָלִיק בַּאֲוִירָא, וְאֶשָּׁא הֲוָה לָהִיט קַמֵּיהּ. שָׁמְעוּ קָלָא׃ עוּלוּ וְאָתוּ וְאִתְכְּנָשׁוּ לְהִילּוּלָא דְּרִבִּי שִׁמְעוֹן — יָבֹא שָׁלוֹם, יָנוּחוּ עַל מִשְׁכְּבוֹתָם׃",
        es: "Después de que salió el lecho, se elevaba en el aire, y un fuego ardía delante de él. Oyeron una voz: «Entren y vengan y reúnanse para la hilulá —la boda— de Rabí Shimón: “vendrá en paz, reposarán en sus lechos” (Yeshayá 57:2)».",
        source: "Zohar, Idra Zuta 43:5",
      },
    ],
    parrafos: [
      `Hay que empezar por la incomodidad, porque toda la fuerza del día está ahí. Entre Pésaj y Shavuot corren siete semanas que la Torá manda contar de a uno: "וּסְפַרְתֶּם לָכֶם… שֶׁבַע שַׁבָּתוֹת תְּמִימֹת תִּהְיֶינָה", "y contaréis para vosotros… siete semanas completas serán" (Vaikrá 23:15). Con el tiempo, ese tramo se volvió período de duelo: no se hacen bodas, no se corta el pelo, no se escucha música festiva. Y en el medio exacto de ese luto hay un día en que la gente enciende fogatas, canta y celebra. Es el trigésimo tercero: ל״ג בָּעוֹמֶר, Lag BaOmer, donde ל״ג es simplemente el número 33 escrito con letras. Un día de fiesta dentro de un duelo, y su motivo profundo es otra muerte. Eso es lo que hay que explicar.`,
      `El duelo primero. El Talmud, en Yevamot 62b, cuenta que Rabí Akiva llegó a tener "שְׁנֵים עָשָׂר אָלֶף זוּגִים תַּלְמִידִים", doce mil PAREJAS de alumnos —veinticuatro mil hombres— desparramados desde Guevat hasta Antipatris, y que todos murieron en un mismo período. La razón que da la Guemará es una sola frase, y es de las más duras de todo el Talmud: מִפְּנֵי שֶׁלֹּא נָהֲגוּ כָּבוֹד זֶה לָזֶה, "porque no se trataron con respeto unos a otros". Presta atención al detalle que casi siempre se pierde en la traducción: eran PAREJAS. En el mundo del bet midrash uno no estudia solo; estudia con un compañero, en jevrutá, discutiendo, contradiciendo, afilándose contra el otro. Lo que murió, entonces, no fue un grupo grande de estudiantes: fueron doce mil sociedades de dos, y lo que las mató fue precisamente lo que las unía usado al revés. El Talmud agrega que murieron "מִיתָה רָעָה", de mala muerte, y precisa cuál: אַסְכָּרָה, askará —una enfermedad que cierra la garganta. La falta estuvo en la boca, y el castigo también.`,
      `Ahora el detalle que da vuelta la historia. La Guemará no se queda en la catástrofe: "וְהָיָה הָעוֹלָם שָׁמֵם", el mundo quedó desolado, "hasta que Rabí Akiva fue donde nuestros Maestros del sur y se la enseñó a ellos". Y los nombra: Rabí Meir, Rabí Yehudá, Rabí Yosí, Rabí Shimón y Rabí Elazar ben Shamúa. Cinco hombres. "וְהֵם הֵם הֶעֱמִידוּ תּוֹרָה אוֹתָהּ שָׁעָה", y ellos fueron los que sostuvieron la Torá en aquella hora. El cuarto de esa lista, Rabí Shimón, es Rabí Shimón bar Yojái. Es decir: el hombre que la tradición celebra en Lag BaOmer no es un personaje que llega de otro lado. Es la respuesta directa a la plaga. Un maestro anciano que perdió veinticuatro mil alumnos empezó otra vez con cinco, y de esos cinco salió el que la tradición llama בּוּצִינָא קַדִּישָׁא, la Lámpara Santa.`,
      `Y quién era ese hombre lo cuenta Shabat 33b sin ahorrar nada. Tres sabios conversan sobre Roma. Rabí Yehudá elogia: "cuánto de bello hicieron: arreglaron mercados, arreglaron puentes, arreglaron casas de baños". Rabí Yosí calla. Rabí Shimón responde: "todo lo que arreglaron, lo arreglaron para su propia necesidad — mercados para poner prostitutas, baños para consentirse, puentes para cobrar peaje". Un tal Yehudá ben Guerim, que estaba sentado ahí, repitió la conversación, y llegó al gobierno. La sentencia: "Yehudá, que elogió, sea elevado. Yosí, que calló, sea exiliado a Tzipori. Shimón, que denigró, sea ejecutado". Nótese que no hay aquí ninguna aureola: hay una lengua que habló de más y una delación entre judíos que termina en pena de muerte. Rabí Shimón huye con su hijo Rabí Elazar, primero al bet midrash y después a una cueva, y allí ocurre el milagro más austero de la literatura rabínica: "אִיבְּרִי לְהוּ חָרוּבָא וְעֵינָא דְמַיָּא", se creó para ellos un algarrobo y un manantial. Un árbol y agua. Doce años.`,
      `Lo que pasó cuando salieron es el corazón oscuro de la historia, y no se puede suavizar. Eliyahu vino y se paró en la boca de la cueva: "¿quién le avisa a bar Yojái que murió el César y su decreto fue anulado?". Salieron. Vieron campesinos arando y sembrando y dijeron: "מַנִּיחִין חַיֵּי עוֹלָם וְעוֹסְקִין בְּחַיֵּי שָׁעָה" — "abandonan la vida eterna y se ocupan de la vida pasajera". Y todo lugar donde ponían los ojos se incendiaba. Doce años sin mundo los habían vuelto incapaces de mirarlo sin quemarlo. Entonces salió una voz del cielo: "לְהַחֲרִיב עוֹלָמִי יְצָאתֶם?! חִיזְרוּ לִמְעָרַתְכֶם!" — "¿a destruir Mi mundo han salido? ¡vuelvan a su cueva!". Volvieron doce meses más, el tiempo, dicen, del juicio de los malvados en el guehinom. Cuando salieron por segunda vez, todo lo que Rabí Elazar hería, Rabí Shimón lo sanaba, y le dijo: "בְּנִי, דַּי לָעוֹלָם אֲנִי וְאַתָּה" — "hijo mío, con nosotros dos le basta al mundo".`,
      `Y entonces, la escena más pequeña y la más importante. Cayendo el viernes por la tarde, entre dos luces, vieron a un anciano corriendo con dos ramos de mirto en la mano. "¿Para qué son?". "Para honrar el Shabat". "¿Y no te alcanzaba con uno?". "Uno por 'Recuerda' y otro por 'Guarda'". Y Rabí Shimón le dijo a su hijo: "חֲזִי כַּמָּה חֲבִיבִין מִצְוֹת עַל יִשְׂרָאֵל" — "mira cuán queridas les son las mitzvot a Israel". Y el Talmud cierra con tres palabras: אִיְּתִיבָה דַּעְתַּיְיהוּ, se les asentó la mente. Lo que doce años de cueva, un milagro, Eliyahu y una voz del cielo no habían logrado, lo logró un viejo anónimo corriendo con dos ramitas. El hombre que estaba a punto de incendiar el mundo se curó mirando a alguien que se apuraba por una costumbre.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: 'Rashi (רַשִׁ"י) — la aritmética antes que el sentimiento.',
        texto: `Sobre la cuenta del Ómer, Rashi hace lo que hace siempre: fija primero el dato. "עַד מִמׇּחֳרַת הַשַּׁבָּת הַשְּׁבִיעִת תִּסְפְּרוּ — 'hasta el día siguiente a la séptima semana contaréis': y no incluyendo ese día, y son cuarenta y nueve días" (Rashi a Vaikrá 23:16). Y antes había precisado que "תְּמִימֹת תִּהְיֶינָה", "completas serán", enseña que se empieza a contar desde la noche, porque si no, no serían completas (Rashi a 23:15). Guarda esa palabra, תְּמִימֹת, "completas", porque va a volver: la Torá insiste en que estos días no se cuentan por encima. Cada uno tiene que estar entero. El día 33 no es una escala en un viaje: es una de cuarenta y nueve unidades que la Torá quiso enteras.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא) — y una honestidad de gramático.",
        texto: `Ibn Ezra hace en una línea algo muy valiente. Comentando "ממחרת השבת", escribe: "לוּלֵי הַקַּבָּלָה, הָיָה נִרְאֶה כִּי סְפִירַת הַיָּמִים כִּשְׁנוֹת הַיּוֹבֵל — de no ser por la tradición recibida, parecería que el conteo de los días es como los años del yovel", y luego resume la posición de "los que niegan" (los caraítas), que leían "shabat" como el sábado literal. Es decir: reconoce que el texto, solo, admitiría otra lectura, y dice abiertamente que lo que decide es la קַבָּלָה, la transmisión. Es exactamente el temperamento que este día necesita: distinguir lo que el texto dice de lo que la tradición añadió, sin fingir que son lo mismo.`,
      },
      {
        etiqueta: 'Ramban / Najmánides (רַמְבַּ"ן) — cada uno con su boca.',
        texto: `El Ramban lee "וּסְפַרְתֶּם לָכֶם", "contaréis PARA VOSOTROS", como una obligación personal: "שֶׁתְּהֵא סְפִירָה וּלְקִיחָה לְכָל אֶחָד וְאֶחָד, שֶׁיִּמְנֶה בְּפִיו וְיַזְכִּיר חֶשְׁבּוֹנוֹ" — que el conteo sea de cada uno, que cuente con su boca y diga su cuenta en voz alta. No basta con saber en qué día estás: hay que decirlo. Y agrega una simetría que ilumina todo el período: "וְהִנֵּה מִסְפַּר הַיָּמִים… כְּמִסְפַּר הַשָּׁנִים מִשְּׁנוֹת הַשְּׁמִטָּה עַד הַיּוֹבֵל, וְהַטַּעַם בָּהֶם אֶחָד" — el número de días desde la ofrenda hasta la fiesta es el mismo que el de años desde la shemitá hasta el yovel, y la razón de ambos es una sola. Siete por siete, y después la liberación. La cuenta del Ómer es un jubileo comprimido en siete semanas: un cautiverio que se cuenta hasta soltarse.`,
      },
      {
        etiqueta: 'El Rambam (הָרַמְבַּ"ם) — contar como quien espera.',
        texto: `El Rambam, en la Guía de los Perplejos III:43, explica el Ómer sin una gota de misticismo y termina diciendo lo más tierno del capítulo: la cuenta existe "כְּמִי שֶׁמְּחַכֶּה לְבוֹאוֹ שֶׁל הָאָהוּב עָלָיו בְּיוֹתֵר, שֶׁהוּא סוֹפֵר אֶת הַיָּמִים וְאֶת הַשָּׁעוֹת" — como quien espera la llegada de la persona que más ama, y va contando los días y las horas. Los cuarenta y nueve días son el intervalo entre la salida de Egipto y la entrega de la Torá, "que era el objetivo y la finalidad de la salida". Retén esa definición, porque de ella sale la paradoja entera del día: la tradición tomó un conteo de enamorado y le puso encima siete semanas de luto. Y en el medio de ese luto puso una boda.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבַּנְאֵל) — que nadie confunda la fiesta.",
        texto: `Abarbanel, comentando el capítulo de los moadim, observa algo que vale para Lag BaOmer más que para ningún otro día: la Torá insiste en decir "שַׁבָּת לַה׳", "פֶּסַח לַה׳", "חַג ה׳", y explica por qué. "La razón de todo esto es advertir que no hagan sus fiestas y sus festivales por astrología… no descansamos en Shabat por el cansancio de los días de la semana ni en honor del astro Saturno… ni celebran Pésaj por deleitarse en los días de la primavera o porque el sol entró en el signo de Aries… ni Sucot por gozar de la abundancia que recogieron del campo ni porque el sol entró en Libra" (Abarbanel a Vaikrá 23). Su preocupación es exactamente la nuestra: que una fecha no se llene de contenidos que no le corresponden. (Nota de integridad: la edición de Abarbanel alojada en Sefaria para este capítulo no llega hasta los versículos del Ómer; se cita únicamente lo que sí está cotejado.)`,
      },
      {
        etiqueta: "El Shulján Aruj y el Ramá — la fiesta, con su tamaño real.",
        texto: `Aquí conviene ser exactos, porque es donde se infla el día. Rabí Yosef Karo escribe: "נוֹהֲגִים שֶׁלֹּא לִישָּׂא אִשָּׁה בֵּין פֶּסַח לַעֲצֶרֶת עַד ל״ג בָּעוֹמֶר, מִפְּנֵי שֶׁבְּאוֹתוֹ זְמַן מֵתוּ תַּלְמִידֵי רַבִּי עֲקִיבָא" (Oraj Jaim 493:1), y sobre el corte de pelo: "נוֹהֲגִים שֶׁלֹּא לְהִסְתַּפֵּר עַד ל״ג לָעוֹמֶר, שֶׁאוֹמְרִים שֶׁאָז פָּסְקוּ מִלָּמוּת" (493:2). Fíjate en el verbo: שֶׁאוֹמְרִים, "porque DICEN". El código no afirma que la plaga cesó ese día: reporta que así se dice. Y el Ramá, que es quien fija el uso ashkenazí, autoriza esto y nada más: "se cortan el pelo en el día 33, y se aumenta en él UN POCO de alegría, y no se dice tajanún". La fiesta halájica de Lag BaOmer, medida con la vara del Shulján Aruj, cabe en una frase: hoy no lloras. Todo lo demás —las hogueras, Merón, los cantos, la peregrinación— vive en otra capa, y hay que nombrarla como lo que es.`,
      },
      {
        etiqueta: "El Talmud sobre sí mismo — Berajot 35b y el filo de Rashbí.",
        texto: `Antes de llegar al Zohar hay que oír a Rabí Shimón discutiendo, porque explica por qué al salir de la cueva quemaba labradores. La Guemará trae la disputa. Rabí Yishmael dice que el versículo "וְאָסַפְתָּ דְגָנֶךָ", "recogerás tu grano", enseña "הַנְהֵג בָּהֶן מִנְהַג דֶּרֶךְ אֶרֶץ": combina la Torá con un oficio. Rabí Shimón bar Yojái responde: "אֶפְשָׁר אָדָם חוֹרֵשׁ בִּשְׁעַת חֲרִישָׁה וְזוֹרֵעַ בִּשְׁעַת זְרִיעָה וְקוֹצֵר בִּשְׁעַת קְצִירָה… תּוֹרָה מַה תְּהֵא עָלֶיהָ? — ¿es posible que uno are en el tiempo de arar, siembre en el tiempo de sembrar, coseche en el tiempo de cosechar…? ¿qué va a ser de la Torá?" (Berajot 35b). Y el Talmud, con una franqueza que asombra, dictamina en contra de él: "אָמַר אַבָּיֵי׃ הַרְבֵּה עָשׂוּ כְּרַבִּי יִשְׁמָעֵאל וְעָלְתָה בְּיָדָן; כְּרַבִּי שִׁמְעוֹן בֶּן יוֹחַי, וְלֹא עָלְתָה בְּיָדָן" — muchos hicieron como Rabí Yishmael y les salió bien; como Rabí Shimón bar Yojái, y no les salió bien. El hombre que la tradición celebra con hogueras es, en su propia Guemará, el que sostuvo una posición que la mayoría no puede sostener. Eso no le quita nada; se lo dice de frente.`,
      },
      {
        etiqueta: "El Talmud sobre la palabra hilulá — Eruvin 54a.",
        texto: `Y hay un texto talmúdico que hace de puente hacia el Zohar, y es sorprendente que casi nunca se cite en este contexto. Shmuel le dijo a Rav Yehudá: "שִׁינָּנָא, חֲטוֹף וֶאֱכוֹל, חֲטוֹף וְאִישְׁתִּי, דְּעָלְמָא דְּאָזְלִינַן מִינֵּיהּ כְּהִלּוּלָא דָּמֵי — Agudo: apúrate y come, apúrate y bebe, porque el mundo del que nos vamos es semejante a una boda" (Eruvin 54a). El Talmud ya usa la imagen: partir del mundo es levantarse de una fiesta de bodas. Pero fíjate en la dirección: para Shmuel, la boda es ESTE mundo y la muerte es irse de ella. El Zohar, sobre Rabí Shimón, va a invertir la flecha: la boda no es la que se abandona, es la que empieza.`,
      },
      {
        etiqueta: 'El Arizal y Tzfat — por qué la fiesta crece en el siglo XVI (הָאֲרִ"י).',
        texto: `Aquí hay que ser preciso sobre lo que se sabe y lo que no. Lo verificable es esto: el Zohar sale a la luz pública en la Castilla del siglo XIII, y su prestigio explota en la Galilea del XVI, cuando la ciudad de Tzfat —a pocos kilómetros del sepulcro tradicional de Rabí Shimón en Merón— se convierte en la capital mundial de la Cabalá con Rabí Moshé Cordovero, Rabí Yosef Karo y sobre todo Rabí Yitzjak Luria, {{study:el-ari|el Arí}}, y su discípulo Rabí Jaim Vital. En ese círculo, el conteo del Ómer deja de ser una cuenta y se vuelve un mapa: cada uno de los siete septenarios se asocia a una de las siete sefirot inferiores, y cada día dentro de la semana, a otra. Por aritmética simple —cuatro semanas completas son veintiocho días, más cinco— el día treinta y tres cae en la quinta semana, quinto día: הוֹד שֶׁבְּהוֹד, hod shebehod. Es una cuenta, no una revelación: cualquiera puede hacerla. Y es en ese ambiente, con el sepulcro de Rashbí a la vista, donde el día 33 deja de ser solo "cuando cesó la plaga" y pasa a ser la hilulá del autor del Zohar.`,
      },
      {
        etiqueta: "El Zohar — la Idra Zuta, palabra por palabra.",
        texto: `Y ahora la fuente que da nombre al día. La Idra Zuta ("la Asamblea Menor") empieza así: "תָּאנָא, בְּהַהוּא יוֹמָא דְּרִבִּי שִׁמְעוֹן בָּעָא לְאִסְתַּלְּקָא מִן עָלְמָא — se enseñó: en aquel día en que Rabí Shimón quiso partir del mundo, y estaba ordenando sus palabras, se reunieron los compañeros en casa de Rabí Shimón" (1:1). Él levanta los ojos, ve la casa llena, y declara la razón de todo lo que sigue: "הָא הַשְׁתָּא שַׁעְתָּא דִרְעוּתָא הוּא… וְהָא מִלִּין קַדִּישִׁין דְּלָא גָּלְיָאן עַד הַשְׁתָּא, בָּעֵינָא לְגַלָּאָה קַמֵּי שְׁכִינְתָּא, דְּלָא יֵימְרוּן דְּהָא בִּגְרִיעוּתָא אִסְתָּלַקְנָא מֵעָלְמָא — ahora es la hora del favor… y hay palabras santas que no se revelaron hasta ahora; quiero revelarlas ante la Shejiná, para que no digan que partí del mundo en falta. Y hasta hoy estuvieron escondidas en mi corazón, para entrar con ellas al mundo venidero" (1:4). Y organiza la escena: "רִבִּי אַבָּא יִכְתּוֹב, וְרִבִּי אֶלְעָזָר בְּרִי יִלְעֵי, וּשְׁאַר חַבְרַיָּיא יְרַחֲשׁוּן בְּלִבַּיְיהוּ — Rabí Abba escribirá, mi hijo Rabí Elazar estudiará en voz alta, y los demás compañeros susurrarán en sus corazones" (1:5). Es el libro contando su propio nacimiento.`,
      },
      {
        etiqueta: "El Zohar — y el verso con que abre.",
        texto: `Lo primero que Rabí Shimón expone, ya sabiendo que va a morir, es un versículo del Cantar de los Cantares: "פָּתַח רִבִּי שִׁמְעוֹן וְאָמַר׃ אֲנִי לְדוֹדִי וְעָלַי תְּשׁוּקָתוֹ. כָּל יוֹמִין דְּאִתְקְטַּרְנָא בְּהַאי עָלְמָא, בְּחַד קְטִירָא אִתְקְטַּרְנָא בֵּיהּ בְּקוּדְשָׁא בְּרִיךְ הוּא, וּבְגִין כָּךְ הַשְׁתָּא וְעָלַי תְּשׁוּקָתוֹ — «Yo soy de mi Amado, y hacia mí es su deseo» (Shir HaShirim 7:11). Todos los días que estuve atado en este mundo, con un solo nudo estuve atado a Él, al Santo bendito sea; y por eso ahora, «hacia mí es su deseo»" (1:9). Ese versículo no es cualquiera: es el tercero y más alto de los tres órdenes del Cantar que {{study:elul|el estudio de Elul}} recorre — el grado en que el alma se entrega sin reclamar contrapartida, y justamente entonces el deseo del Amado se vuelca sobre ella. Rabí Shimón muere citando el verso del amor sin condiciones. Y desde ahí, la palabra "boda" deja de ser una metáfora piadosa y se vuelve gramaticalmente exacta.`,
      },
      {
        etiqueta: "El Zohar — el final.",
        texto: `El final lo narra Rabí Abba, que era quien escribía. "לָא סִיֵּים בּוּצִינָא קַדִּישָׁא לְמֵימַר חַיִּים, עַד דְּאִשְׁתְּכָכוּ מִלּוֹי — no terminó la Lámpara Santa de decir la palabra «vida», cuando sus palabras se acallaron. Y yo estaba escribiendo, y pensaba escribir más, y no oí nada. Y no levanté la cabeza, porque la luz era mucha y no podía mirar" (43:1). La última palabra que Rabí Shimón alcanzó a decir fue חַיִּים, "vida", y no llegó a terminarla. "Todo aquel día no cesó el fuego de la casa… Después de que se fue el fuego, vi a la Lámpara Santa, Santo de los Santos, que había partido del mundo: envuelto, acostado sobre su lado derecho, וְאַנְפּוֹי חַיְיכִין, y su rostro sonriendo" (43:2). Y cuando sacan el lecho, la voz: "אִתְכְּנָשׁוּ לְהִילּוּלָא דְּרִבִּי שִׁמְעוֹן" — reúnanse para la boda de Rabí Shimón (43:5). Al entrar a la cueva se oye: "זֶה הָאִישׁ מַרְעִישׁ הָאָרֶץ מַרְגִּיז מַמְלָכוֹת — este es el hombre que hacía temblar la tierra, que sacudía reinos". (Detalle de exactitud: el versículo original, Yeshayá 14:16, dice "הֲזֶה הָאִישׁ מַרְגִּיז הָאָרֶץ מַרְעִישׁ מַמְלָכוֹת", con los dos verbos al revés y en forma de pregunta — y ahí es un insulto dirigido al rey de Babel. El Zohar lo cita invertido y afirmativo, y con eso lo convierte en elogio. Se dice porque la diferencia es la enseñanza.) Y sobre él se aplica el último versículo de Daniel: "וְאַתָּה לֵךְ לַקֵּץ וְתָנוּחַ וְתַעֲמוֹד לְגוֹרָלְךָ לְקֵץ הַיָּמִין" (43:6). Y ahí termina la Idra Zuta. Sin fecha.`,
      },
    ],
    glosa: `Glosa para el lector: Ómer = la medida de cebada que se ofrecía el segundo día de Pésaj; de ahí, el nombre de los 49 días que se cuentan hasta Shavuot. Lag (ל״ג) = simplemente el número 33 escrito con letras hebreas (lámed 30 + guímel 3); no es una palabra. Atzéret = otro nombre de Shavuot. Askará = enfermedad que cierra la garganta; el Talmud la nombra como causa de la muerte de los alumnos. Jevrutá = pareja de estudio. Rashbí = acrónimo de Rabí Shimón bar Yojái. Butziná Kadishá = "Lámpara Santa", el título con que el Zohar llama a Rashbí. Idra = "asamblea, era de trilla"; la Idra Rabá y la Idra Zutá son dos reuniones donde se revelan los secretos más altos del Zohar. Hilulá = en arameo, banquete de bodas; y en esta tradición, el aniversario de la muerte de un justo. Bat kol = "hija de una voz", una voz del cielo. Hod = la quinta de las siete sefirot inferiores: esplendor, y también rendición y reconocimiento. Minhag = costumbre; tiene fuerza real en la halajá, pero no es lo mismo que una ley de la Torá.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, hay que separar cuatro capas y no confundirlas nunca. Capa uno, la Torá: manda contar cuarenta y nueve días desde el ómer hasta Shavuot, y no dice nada de duelo (Vaikrá 23:15-16). Capa dos, el Talmud: cuenta que los alumnos de Rabí Akiva murieron "de Pésaj a Atzéret" por no honrarse mutuamente, y no menciona el día 33 (Yevamot 62b). Capa tres, la halajá posterior: instituye el duelo del Ómer y lo corta en el día 33 "porque dicen que entonces dejaron de morir", con permiso de cortarse el pelo, un poco de alegría y no decir tajanún (Shulján Aruj, Oraj Jaim 493:1-2 y 131:6). Capa cuatro, la Cabalá: identifica ese día con la hilulá de Rabí Shimón bar Yojái, cuya escena de muerte —con la palabra hilulá incluida— está en el Zohar, pero sin fecha (Idra Zuta 43:5).`,
          `De ahí sale el pshat del día, y no es menos hermoso por ser honesto: Lag BaOmer no es una fiesta bíblica ni talmúdica, es una construcción de la tradición en varios pisos, y cada piso agregó algo verdadero. El Talmud puso la ética —lo que mata a una generación de estudiosos es la falta de honor entre ellos. Los rishonim pusieron el calendario —hay un día en que se para el luto. Y Tzfat puso el rostro —ese día tiene un nombre y una cara, y esa cara es la del hombre que reveló el libro. Ninguno de los tres pisos miente. Lo único que hay que evitar es decir que el de arriba estaba en los cimientos.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números y las letras)",
        parrafos: [
          `Primero, lo que NO es un hallazgo, dicho de frente para que nadie lo repita mal. ל״ג vale 33 porque lámed vale 30 y guímel vale 3. Eso no es una gematría: es cómo se escriben los números en hebreo. Decir "ל״ג es 33" es como descubrir que "33" es treinta y tres. Cualquier estudio que presente eso como un secreto está rellenando.`,
          `Ahora lo que sí tiene contenido, y es una permutación de letras, no una equivalencia entre palabras. Las mismas dos letras del número, dadas vuelta, forman גַּל — y גַּל es la primera palabra de un versículo que la tradición asocia con este día: "גַּל־עֵינַי וְאַבִּיטָה נִפְלָאוֹת מִתּוֹרָתֶךָ", "descubre mis ojos y contemplaré maravillas de Tu Torá" (Tehilim 119:18). Hay que decir con precisión qué se está afirmando: no que dos palabras distintas valgan lo mismo (eso sería gematría), sino que el número del día, escrito con letras, se lee al revés como el imperativo del verbo גָּלָה, "revelar, descubrir". Y el peso de esa observación no está en el juego de letras: está en que la Idra Zuta usa esa misma raíz, tres veces, para describir lo que Rabí Shimón hizo ese día — "מִלִּין קַדִּישִׁין דְּלָא גָּלְיָאן עַד הַשְׁתָּא, בָּעֵינָא לְגַלָּאָה", palabras santas que no fueron REVELADAS hasta ahora, quiero REVELARLAS. El día en que se descubre lo escondido lleva escrito en su número el verbo descubrir.`,
          `Y los comentaristas del versículo cierran el círculo con una precisión que asombra. Rashi glosa "נִפְלָאוֹת מִתּוֹרָתֶךָ": "דְּבָרִים הַמְכֻסִּים בָּהּ, שֶׁאֵינָם מְפֹרָשִׁים בָּהּ" — cosas ocultas EN ella, que no están explicitadas en ella. Y el Malbim: "גְּלוּת עֵינַיִם הוּא לְהַשִּׂיג דָּבָר יוֹתֵר עַל כֹּחַ טִבְעוֹ, וְעַל יְדֵי הוֹפָעָה וְרוּחַ הַקֹּדֶשׁ, עַד שֶׁאוּכַל לְהַבִּיט הַנִּפְלָאוֹת שֶׁבְּתוֹרָתְךָ, הֲגַם שֶׁהֵם… מְכֻסִּים סָגוּר חוֹתָם צָר" — el descubrimiento de los ojos es captar algo por encima de la fuerza natural de uno, por inspiración y ruaj hakodesh, hasta poder mirar las maravillas de Tu Torá, aunque estén cubiertas, cerradas y selladas. Eso, sin nombrarlo, es la definición exacta de lo que la tradición llama Zohar: lo que está en la Torá y no está explicitado en ella.`,
          `Tercera alusión, y es aritmética pura. En el esquema cabalístico con que se cuenta el Ómer, cada una de las siete semanas corresponde a una de las siete sefirot inferiores —jésed, guevurá, tiferet, netzaj, hod, yesod, maljut— y cada día dentro de la semana, a otra. El día 33 son cuatro semanas completas (28) más cinco: quinta semana, quinto día. הוֹד שֶׁבְּהוֹד, "hod dentro de hod". Y hod, entre todas las sefirot, es la que menos brilla por sí misma: es esplendor, sí, pero también rendición, y la raíz de הוֹדָאָה — que en hebreo significa a la vez agradecer y ADMITIR. Que el día de la hilulá caiga en hod dentro de hod es una coincidencia del calendario, no una prueba de nada. Pero describe bien lo que ese día celebra: un hombre que se entrega, y una comunidad que reconoce.`,
          `Y una última, que se descarta a la vista de todos porque enseña descartándose. Se buscó una gematría digna para el hero y salió esta: רשב״י —el acrónimo de Rabí Shimón bar Yojái— vale 200+300+2+10 = 512, y דְּבֵקוּת, devekut, "adherirse, unirse", vale 4+2+100+6+400 = 512. La aritmética es correcta y el sentido es exacto. Pero es el número de un ACRÓNIMO, no de una palabra, y no se encontró ninguna fuente clásica que lo traiga. Por eso no está en el encabezado de este estudio, sino más abajo, marcado como lo que es: una lectura propia. La diferencia entre las dos ubicaciones es toda la diferencia entre estudiar y adornar.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          `Empieza por la pregunta más incómoda del día: si el motivo del duelo es que veinticuatro mil hombres murieron por no honrarse entre ellos, ¿qué clase de fiesta corresponde? Y la respuesta que dio la tradición es de una lógica implacable: la fiesta corresponde el día en que aparece lo contrario. Doce mil parejas que no supieron tratarse; y en la Idra Zuta, una casa llena de compañeros donde el maestro reparte tareas y sitios con una delicadeza casi absurda para un moribundo —Rabí Abba escribe, Rabí Elazar estudia en voz alta, los demás susurran; y cuando entra Rabí Yitzjak, le dice "cuánta alegría te corresponde en este día", y hace levantar a su propio hijo del lugar porque "otro se sienta ahí". Un hombre que se está muriendo, ocupado en que cada uno de sus alumnos tenga su lugar exacto. Eso es la reparación de "no se honraron unos a otros", puesta en escena.`,
          `Segunda enseñanza, y es sobre la cueva. Fíjate en lo que la historia NO dice. No dice que doce años de estudio ininterrumpido lo hicieran santo; dice que lo hicieron incapaz de mirar a un labrador sin quemarlo. La voz del cielo no lo felicita: lo manda de vuelta. Y lo que finalmente lo cura no es más Torá, no es otro milagro, no es Eliyahu: es un anciano corriendo con dos ramos de mirto porque quiere honrar el Shabat con las dos palabras del mandamiento, זָכוֹר y שָׁמוֹר. Rabí Shimón no le enseña nada a ese viejo. Lo mira, y le dice a su hijo: mira cuánto quieren las mitzvot en Israel. Y el Talmud cierra: se les asentó la mente. La grandeza espiritual, dice esta historia, no se termina de formar en la cueva; se termina de formar cuando el que salió de la cueva vuelve a ser capaz de admirar a alguien común.`,
          `Aquí entra la voz jasídica, que es la que hizo de esta escena un modo de vivir. El Baal Shem Tov leyó toda la Torá desde ahí: que no hay lugar vacío de Dios, que el labrador y el aguador cargan chispas que el erudito no puede levantar, y que la santidad no está reñida con la vida ordinaria sino escondida dentro de ella. Los primeros jasidim hicieron de Lag BaOmer una de sus fiestas mayores precisamente por esto: no celebran al Rabí Shimón que quemaba con la mirada, sino al que dijo "mira cuán queridas les son las mitzvot a Israel". Y no está de más recordar el veredicto del propio Talmud sobre su rigor: "muchos hicieron como Rabí Yishmael y les salió bien; como Rabí Shimón bar Yojái, y no les salió bien" (Berajot 35b). Se lo celebra sin convertirlo en manual. Se puede admirar a un maestro y no imitarle todo: eso también es honrar.`,
          `Y la tercera enseñanza, la que da el título. ¿Por qué boda y no funeral? Porque en la lógica del Zohar la muerte de un justo no es la interrupción de una vida sino la consumación de una unión que llevaba toda la vida preparándose. Rabí Shimón lo dice él mismo antes de morir: "todos los días que estuve atado en este mundo, con un solo nudo estuve atado a Él" (Idra Zuta 1:9). El nudo ya existía. Lo que ocurre ese día es que se ata del todo. Y hay un detalle que ninguna homilía podría inventar: la última palabra que alcanzó a decir, y que no llegó a terminar, fue חַיִּים — "vida". Se murió a mitad de la palabra vida. Rabí Abba, que era el que escribía, anota que quiso seguir escribiendo y no oyó nada, y que no pudo levantar la cabeza porque la luz era demasiada. La escena entera es una boda vista desde afuera por alguien que no puede mirar directamente.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de Lag BaOmer es una regla de estructura, no una emoción: la luz no se revela mientras el vaso siga en construcción. Rav Yehuda Ashlag, el Baal HaSulam —el que dedicó su vida a comentar precisamente este libro— leyó toda la Cabalá como una ciencia del deseo: la criatura es voluntad de recibir, y lo que impide recibir no es la falta de luz sino la falta de compatibilidad de forma con el dador. Toda su enseñanza gira alrededor de una palabra: הַשְׁוָאַת הַצּוּרָה, equiparación de forma. Recibir para dar. Y mientras esa equiparación no está completa, hay una distancia — no de espacio, porque en lo espiritual no hay espacio, sino de semejanza.`,
          `Léelo así y la Idra Zuta se vuelve transparente. Rabí Shimón no dice "voy a morir": dice "הָא הַשְׁתָּא שַׁעְתָּא דִרְעוּתָא הוּא", ahora es la hora del favor, y "quiero entrar sin vergüenza al mundo venidero". Y explica por qué recién ahora revela: porque hasta hoy esas palabras "estuvieron escondidas en mi corazón, para entrar con ellas al mundo venidero". Es decir: el secreto no estaba guardado por avaricia ni por elitismo; estaba esperando el momento en que el vaso estuviera completo. Y el momento en que el vaso de una vida está completo es, exactamente, el último. Por eso la revelación más alta del Zohar ocurre el día de la muerte de su maestro y no antes: no porque la muerte revele, sino porque solo una vida terminada es un recipiente terminado.`,
          `Y el secreto último, el que le da su nombre al día. En el Talmud, Shmuel dice que "el mundo del que nos vamos es semejante a una boda" (Eruvin 54a): la boda es aquí, y morir es levantarse de la mesa. El Zohar invierte la flecha, y la inversión es todo el sod: si el trabajo de una vida fue anudar el alma a su raíz, entonces lo que ocurre al final no es salir de la fiesta sino entrar. Por eso el rostro del muerto está sonriendo (43:2), por eso la voz llama a reunirse "לְהִילּוּלָא", a la boda, y por eso el versículo que se cita es "יָבֹא שָׁלוֹם, יָנוּחוּ עַל מִשְׁכְּבוֹתָם", vendrá en paz, reposarán en sus lechos (Yeshayá 57:2). Nada de esto niega el duelo: los compañeros lloran, Rabí Elazar cae tres veces y no puede abrir la boca. Las dos cosas son verdad a la vez, y esa simultaneidad es la enseñanza. Los de abajo, con razón, pierden a un maestro. Arriba, al mismo tiempo, se está celebrando una unión.`,
        ],
      },
    ],
    caja: {
      titulo: "הִילּוּלָא — la palabra está en el Zohar; la fecha, no.",
      cuerpo:
        "«Oyeron una voz: entren y vengan, reúnanse para la hilulá de Rabí Shimón» (Zohar, Idra Zuta 43:5). Y su última palabra, la que no llegó a terminar, fue חַיִּים, vida (43:1). Lo que la Idra Zuta NO dice en ninguna parte es en qué día del año ocurrió. Que ese día sea el 18 de Iyar es tradición posterior — cierta como costumbre, no como dato del texto. Se dice, en vez de disimularlo.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que la falta de respeto entre gente que estudia junta no es una torpeza social: el Talmud la pone como causa de una catástrofe. Y que eran parejas —compañeros de estudio— hace la lección todavía más incómoda, porque el daño no vino de enemigos sino de socios. Yo suelo pensar que la maldad viene de lejos. Este texto dice que vino de la persona sentada al otro lado de la mesa, y que la enfermedad les cerró exactamente la garganta.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón de las capas: Torá, Talmud, halajá tardía, Cabalá — cuatro pisos que dicen cosas distintas sobre el mismo día, y la tentación permanente de leerlos como si fueran uno solo. Veo el patrón de la reparación: no se repara con un discurso sobre el respeto, se repara con cinco hombres que vuelven a empezar. Y veo el patrón de la inversión: el Talmud dice que este mundo es la boda y morir es irse; el Zohar dice que morir es entrar. La misma imagen, la flecha al revés, y todo cambia.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Me deja dos escenas y no me deja elegir una sola. La primera: un hombre tan lleno de verdad que quema a quien la vive de otro modo, y a quien el cielo manda de vuelta a la cueva. La segunda: ese mismo hombre curándose al ver a un viejo cualquiera correr con dos ramitas antes de Shabat. Reconozco las dos en mí — el juicio que sale rápido cuando alguien no vive como creo que hay que vivir, y el alivio raro que me da ver a alguien común queriendo hacer algo bien. La segunda escena es la que sana.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Que la revelación más alta del libro más oculto ocurra el día de la muerte de su maestro dice algo sobre cómo está hecho el mundo: nada se muestra antes de estar terminado. Lo que en una vida parece guardado, retaceado, demorado, muchas veces no está siendo negado — está esperando un recipiente. Y el rostro sonriendo del que acaba de morir, con la casa todavía en fuego y los compañeros llorando en el suelo, dice que arriba y abajo pueden estar viendo la misma escena y llamarla con dos nombres opuestos, y los dos ser ciertos.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, honra en voz alta a UNA persona con la que compites — alguien de tu mismo oficio, tu mismo nivel, tu mismo terreno.",
    texto: `El duelo de estos días nació de que veinticuatro mil personas no se honraron entre sí, y no eran extraños: eran parejas de estudio. Así que la acción tiene que ir exactamente ahí, al lugar donde a nadie le gusta ir.

Elige a UNA persona que hace lo mismo que tú y que, si eres sincero, te resulta difícil elogiar: un colega, otro estudiante, alguien de tu profesión que va un poco más adelante, un hermano, alguien con quien comparas resultados sin decírselo a nadie. Y hoy hazle llegar un reconocimiento concreto, no genérico. No "eres muy bueno", sino algo verificable: qué hizo, por qué te pareció bien hecho, qué aprendiste de eso. Dilo delante de otros si puedes, porque el Talmud no dice que no se quisieran, dice que no se trataron con כָּבוֹד, con honor — y el honor, a diferencia del cariño, es público por definición. Si no se te ocurre a quién, ese vacío es la respuesta, y entonces la tarea es todavía más urgente.

Y añade un segundo gesto, pequeño, en la línea del anciano de los mirtos: haz hoy UNA cosa buena de más de lo estrictamente necesario, y hazla por gusto. Dos ramos donde bastaba uno. No para cumplir, no para que se note: por el placer de honrar algo. Ese hombre, que no dijo una palabra de Torá, curó al maestro más grande de su generación. Y si quieres cerrar el día como lo cierra la fuente, cierra con la palabra que Rabí Shimón no alcanzó a terminar: dedica un minuto a nombrar, en voz alta o por escrito, tres cosas de tu vida que llamarías חַיִּים, vida. Él se murió a mitad de esa palabra. Tú todavía puedes terminarla.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Lag BaOmer es un día de fiesta en medio de un duelo, y su motivo profundo es una muerte. El duelo viene del Talmud: los doce mil pares de alumnos de Rabí Akiva murieron entre Pésaj y Shavuot "porque no se trataron con respeto unos a otros" (Yevamot 62b). El corte en el día 33 es posterior, y el Shulján Aruj lo formula con cautela — "porque DICEN que entonces dejaron de morir" (Oraj Jaim 493:2). La capa de Rabí Shimón bar Yojái es otra capa, y viene de la Cabalá.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El hombre que se celebra ese día no llega de afuera: la misma Guemará que cuenta la plaga cuenta la reconstrucción, y Rabí Shimón es uno de los cinco alumnos del sur "que sostuvieron la Torá en aquella hora" (Yevamot 62b). Y lo que lo curó, después de doce años de cueva y de quemar labradores con la mirada, no fue más estudio: fue un anciano anónimo corriendo con dos ramos de mirto en la víspera de Shabat, uno por Zajor y otro por Shamor (Shabat 33b).`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `La palabra הִילּוּלָא —boda— aplicada a su muerte está en el Zohar mismo: "reúnanse para la hilulá de Rabí Shimón" (Idra Zuta 43:5). Y es coherente con lo que él dijo ese día citando el Cantar: "todos los días que estuve atado en este mundo, con un solo nudo estuve atado a Él" (1:9). Lo que ocurre no es una interrupción: es la consumación de una unión que llevaba una vida preparándose. Su rostro quedó sonriendo, y su última palabra, sin terminar, fue חַיִּים, vida (43:1-2).`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Honrar hoy, en voz alta y con algo concreto, a una persona con la que compites en el mismo terreno — porque lo que el Talmud señala no es falta de cariño sino falta de כָּבוֹד, y el honor es público por definición. Y hacer una cosa buena de más de lo necesario, por gusto: dos ramos donde bastaba uno.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal, marcada como tal — y encima es la gematría de un acrónimo, que es un instrumento más débil que la de una palabra.",
    parrafos: [
      `Se buscó para este estudio una gematría que estuviera a la altura del día y no se encontró ninguna con fuente. La única que salió y que cierra sin muletas es esta, y se ofrece con todas las advertencias puestas: רשב״י —el acrónimo con que la tradición nombra a Rabí Shimón bar Yojái— vale ר200 + ש300 + ב2 + י10 = 512. Y דְּבֵקוּת, devekut —la palabra que la Cabalá y el jasidismo usan para "adherirse, pegarse, unirse a Dios"— vale ד4 + ב2 + ק100 + ו6 + ת400 = 512. Las dos cuentas están hechas letra por letra y son correctas.`,
      `Lo que la hace interesante no es el número, es que coincide con lo que él mismo dijo el día de su muerte: "בְּחַד קְטִירָא אִתְקְטַּרְנָא בֵּיהּ בְּקוּדְשָׁא בְּרִיךְ הוּא", con un solo nudo estuve atado al Santo bendito sea (Idra Zuta 1:9). Devekut es exactamente eso: el nudo. Pero hay que decir las tres objeciones y no esconderlas. Primera: רשב״י es un acrónimo, no una palabra, y los acrónimos se pueden fabricar. Segunda: no se encontró ninguna fuente clásica que traiga esta equivalencia; si existe, Jashmal no la localizó. Y tercera: precisamente porque es bonita, hay que desconfiar más, no menos. Por eso no está en el encabezado de este estudio ni en su sello. Está aquí abajo, dicha una vez, con nombre y apellido, para que el lector la sopese — que es lo único que una lectura propia tiene derecho a pedir.`,
    ],
  },

  hemshej: [
    "{{study:el-ari|Tzfat, siglo XVI: la ciudad donde el Zohar se vuelve el centro del mundo y donde nace esta fiesta. El Arí y la estructura de la creación.}}",
    "{{study:tikunei-zohar|Si la Idra Zuta es el testamento, los Tikunei Zohar son la otra cara del mismo libro: setenta modos de leer una sola palabra.}}",
    "{{study:elul|«Yo soy de mi Amado, y hacia mí es su deseo» — el verso con que Rashbí abre el día de su muerte es el mismo que da nombre al mes de Elul. El grado más alto de los tres.}}",
    "{{letter:vav|La letra del mes de Iyar es la vav, que en hebreo significa «gancho»: la letra que une. La forma de la unión, en una sola línea.}}",
  ],

  ctaRef: "Yevamot 62b",
};
