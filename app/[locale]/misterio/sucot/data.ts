
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — סֻכּוֹת · בַּסֻּכֹּת תֵּשְׁבוּ שִׁבְעַת יָמִים
//  Serie «Tiempos Sagrados» (moadim) · Estudio 4 — Sucot.
//
//  Hero en modo "par": סוּכָּה (plene) = 91 = יְהֹוָה (26) + אֲדֹנָי (65).
//  Fuente de la lectura, VERIFICADA: Tikunei Zohar 22b ("ואית סוכה לתתא כ״ו
//  ה״ס דאיהו יאקדונק״י סוכת שלום") y Pri Etz Jaim, Shaar HaSucot 4:3 ("כי
//  סוכה מלא, גי' כ״ו ה״ס. פי' — שהם הוי״ה אדנ״י"). La partición es de las
//  letras mismas: כ+ו = 26 y ה+ס = 65.
//
//  FUENTES VERIFICADAS CONTRA SEFARIA (2026-08-27, 14 de Elul 5786):
//   · Vaikrá 23:40 · 23:41 · 23:42-43 — texto hebreo puntuado cotejado.
//     Dato ortográfico confirmado en el texto masorético de Sefaria: en 23:42
//     "סֻכֹּת" aparece DOS veces defectivo (sin vav) y en 23:43 "סֻכּוֹת" una
//     vez pleno. Es la base del pasaje de Pri Etz Jaim 4:1-3.
//   · Devarim 16:13-15 — "וְשָׂמַחְתָּ בְּחַגֶּךָ" y "וְהָיִיתָ אַךְ שָׂמֵחַ".
//   · Yeshayá 4:5-6 — "כִּי עַל כָּל כָּבוֹד חֻפָּה · וְסֻכָּה תִּהְיֶה לְצֵל"
//     (el prooftext del Ramban).
//   · Zejaryá 14:16 — las naciones suben a celebrar Sucot.
//   · Nejemiá 8:14-17 — la sucá redescubierta en el regreso de Babilonia.
//   · Bamidbar 29:13-32 — el conteo de toros: 13+12+11+10+9+8+7 = 70
//     (verificado versículo por versículo).
//   · Kohélet 1:2 — "הֲבֵל הֲבָלִים".
//   · Shir HaShirim 2:6 (= 8:3) — "וִימִינוֹ תְּחַבְּקֵנִי".
//   · Sucá 11b:15 — la baraita R. Eliezer (ענני כבוד) / R. Akiva (סוכות ממש).
//     Cotejada literal. Sucá 11b:14 — Reish Lakish deriva el sjaj de
//     "וְאֵד יַעֲלֶה מִן הָאָרֶץ" (Bereshit 2:6): el modelo legal es una nube.
//   · Sucá 2a:1-2 (Mishná) — más de 20 amot pasul; menos de 10 tefajim; menos
//     de tres paredes; "שֶׁחַמָּתָהּ מְרוּבָּה מִצִּלָּתָהּ" pasul.
//   · Sucá 28b:9 — "תֵּשְׁבוּ כְּעֵין תָּדוּרוּ": la sucá keva y la casa arai.
//   · Sucá 55b:9 — R. Elazar: los setenta toros por las setenta naciones.
//   · Avodá Zará 3a:13 — la prueba futura: cada nación patea su sucá.
//   · Vaikrá Rabá 30:12 — los cuatro tipos (sabor/aroma = Torá/buenas obras).
//   · Rashi a Vaikrá 23:43 — "עַנְנֵי כָבוֹד".
//   · Ramban a Vaikrá 23:43 — cotejado (nubes de gloria incluso en pshat).
//   · Ibn Ezra a Vaikrá 23:43 — cabañas reales, hechas desde Tishrei por frío.
//   · Rashbam a Vaikrá 23:43 — cotejado: el pshat es cabañas reales, y el
//     motivo es "כֹּחִי וְעֹצֶם יָדִי" (Devarim 8).
//   · Rambam, Moré Nevujim III:43 — cotejado (alegría; salir de las casas;
//     Shminí Atzéret completa la alegría; y su reserva sobre las derashot).
//   · Da'at Zekenim a Devarim 16:15 — las TRES alegrías escritas en Sucot.
//   · Zohar, Emor 43:276-281 — cotejado literal: "צִלָּא דִּמְהֵימְנוּתָא",
//     la Shejiná que extiende sus alas, Rav Hamnuna Sabá, los ushpizín y la
//     porción de los pobres. NOTA: la numeración "Zohar III:103b" que trae el
//     sidur NO se puede confirmar directamente en Sefaria (el Zohar está
//     paginado por secciones); SÍ queda corroborada de forma indirecta por Ohr
//     HaJamá a Zohar 1:221a ("כנז' בפ' אמור דף ק״ג וק״ד") y por Derej
//     Mitzvotejá ("מאמר הזהר פ' אמור דק״ג"). Se cita como Zohar, Emor 43:276-281.
//   · Sidur Ashkenaz, Sucot, Ushpizín — cotejado: el orden Avraham, Yitzjak,
//     Yaakov, Moshé, Aharón, Yosef, David.
//   · Tikunei Zohar 22b:17-18 — "סֻכַּת שָׁלוֹם" = Ima Ilaá; y סוכה = כ״ו ה״ס.
//   · Pri Etz Jaim, Shaar HaSucot 1:12-13, 3:2, 3:6, 3:8, 4:1-5 — cotejado:
//     "כי הסוכה הוא סוד א״מ (אור מקיף)"; "אור מקיף הוא בחינת החבוק";
//     "וישאר אור מקיף זה, יסכך אלינו ויקיפנו מכל צדדים"; "בוודאי כי א״מ גדול
//     מאוד מן אור פנימי"; "המקיפים הם העיקרים"; "צל סוכה בעינן ולא צל דפנות".
//   · Ohr LaShamayim (R. Meir de Apta), Sucot 3 — cotejado: "סוכה בגימטריא
//     הוי״ה אדנ״י" y "רומז לאור המקיף... שזוכה להמשיך הארה וקדושה מאור המקיף".
//   · Likutei Moharán, Parte II 5:14 — cotejado: "כי סוּכָּה בְּגִימַטְרִיָּא
//     מַלְאָךְ" (91).
//   · Sefat Emet, Devarim, Sucot 22:2 y 22:4 — cotejado: "וזה מצות סוכה, צא
//     מדירת קבע"; "ולכן נתקן קהלת בסוכות לההביל כל הבלי עולם".
//   · Shulján Aruj, Oraj Jaim 631:3 — cotejado: las estrellas son lejatjilá,
//     NO requisito de validez ("אע״פ שאין הכוכבים נראים מתוכה כשרה").
//   · Shabat 104a — ס״ע = סְמוֹךְ עֲנִיִּים (usado vía el estudio de la samej).
//
//  GEMATRÍAS CALCULADAS LETRA POR LETRA (Python), verificadas:
//    סוּכָּה  = ס60+ו6+כ20+ה5 = 91
//    יְהֹוָה  = י10+ה5+ו6+ה5 = 26 · אֲדֹנָי = א1+ד4+נ50+י10 = 65 → 26+65 = 91
//    partición interna de las letras: כ20+ו6 = 26 · ה5+ס60 = 65
//    מַלְאָךְ = מ40+ל30+א1+ך20 = 91
//    אָמֵן    = א1+מ40+ן50 = 91
//    סֻכָּה (defectivo) = 85; +1 (im hakolel) = 86 = אֱלֹהִים (1+30+5+10+40)
//    לוּלָב   = ל30+ו6+ל30+ב2 = 68 · חַיִּים = ח8+י10+י10+ם40 = 68
//    toros de Sucot: 13+12+11+10+9+8+7 = 70
//  DESCARTADAS por no cerrar (se dice en el cuerpo):
//    אֶתְרוֹג = 610 — no equivale a nada relevante; no se usa.
//    Pri Etz Jaim 3:8 dice "סוכ״ה במלואו... גי' רח״ל": con la grafía impresa
//    (סמך ו״ו כ״ף ה״ה) da 242, y רָחֵל = 238. Solo cuadra leyendo ה״א en vez
//    de ה״ה. Se descarta y no se cita.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "sucot",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 4 — Sucot · la fragilidad convertida en refugio",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۴ — سوکوت · شکنندگی که به پناه بدل می‌شود",
    he: "בַּסֻּכֹּת תֵּשְׁבוּ שִׁבְעַת יָמִים",
    titulo: "Sucot — el techo que deja ver las estrellas",
    tituloFa: "سوکوت — سقفی که ستارگان از آن پیداست",
    ganchoEs:
      "Cuatro días después del día más solemne del año, la Torá manda salir de la casa y vivir una semana en una choza con el techo agujereado. No es una lección de humildad: es una definición de refugio. Lo que de verdad protege no es lo que te encierra — es lo que te rodea.",
    ganchoFa:
      "چهار روز پس از سنگین‌ترین روزِ سال، تورات فرمان می‌دهد از خانه بیرون بیا و یک هفته در کلبه‌ای با سقفِ سوراخ زندگی کن. این درسِ فروتنی نیست: تعریفِ پناه است. آنچه به‌راستی نگاه می‌دارد آن نیست که تو را می‌بندد — آن است که تو را دربر می‌گیرد.",
    par: {
      a: { he: "סוּכָּה", rom: "Sucá (la cabaña)" },
      b: { he: "יְהֹוָה · אֲדֹנָי", rom: "YHVH (26) + Adonai (65)" },
      valor: "91",
    },
    fecha: "Sucot 5787 · 26 sep – 2 oct 2026",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — tres cosas que este estudio NO afirma",
    rotulo:
      "Se dicen de entrada, para que nadie confunda una imagen bella con una ley, ni una lectura mística con un dato de física.",
    parrafos: [
      `Primero, las estrellas. Es verdad que la tradición quiere que el sjaj —el techo vegetal de la cabaña— sea lo bastante ralo como para que se vean las estrellas grandes. Pero eso es lejatjilá, la manera preferida de hacerlo, no un requisito de validez. El Shulján Aruj lo dice sin ambigüedad: "aunque haya quedado tan tupido como un techo de casa y no se vean las estrellas desde adentro, es kasher" (Oraj Jaim 631:3). Este estudio usa las estrellas como lo que son en la halajá: un ideal, no una condición. Y la condición sí obligatoria es otra, y va en la misma dirección: que la sombra sea mayor que el sol (Sucá 2a).`,
      `Segundo, la luz envolvente. אוֹר מַקִּיף (or makif) es un término técnico del sistema del Arizal, no una descripción de radiación ni un fenómeno medible. Describe una relación estructural entre una luz y un vaso: lo que no cabe adentro, rodea desde afuera. Cuando en este estudio se dice que la sucá "es" or makif, se está citando a Rabí Jaim Vital en el Pri Etz Jaim, no describiendo el clima de Tishrei.`,
      `Tercero, los ushpizín. El texto de invitación a los siete huéspedes está verificado —el Zohar en la parashá Emor y el sidur lo traen palabra por palabra—, y el pasaje del Zohar se cotejó entero. Lo que NO se pudo confirmar directamente contra Sefaria es el número de folio "Zohar III:103b" que suele imprimirse: la edición digital pagina el Zohar por secciones, no por daf. La referencia queda corroborada de forma indirecta por dos comentaristas que citan ese folio expresamente, y aquí se cita por la ubicación que sí es verificable: Zohar, Emor 43:276-281. Se dice, en vez de disimularlo.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — siete textos y una sola inversión",
    intro: [
      `El estudio se sostiene sobre siete fuentes verificadas. Todas empujan en la misma dirección, y la dirección es contraintuitiva: la protección real no viene de lo que se cierra, sino de lo que rodea.`,
    ],
    filas: [
      {
        ref: "Vaikrá 23:42-43",
        he: "כִּי בַסֻּכּוֹת הוֹשַׁבְתִּי אֶת בְּנֵי יִשְׂרָאֵל",
        es: "«Porque en cabañas hice habitar a los hijos de Israel»",
        funcion: "El versículo-ancla. Toda la fiesta cuelga de qué eran esas cabañas.",
      },
      {
        ref: "Sucá 11b",
        he: "עַנְנֵי כָבוֹד הָיוּ / סוּכּוֹת מַמָּשׁ עָשׂוּ לָהֶם",
        es: "«Eran Nubes de Gloria» / «Se hicieron cabañas de verdad»",
        funcion: "R. Eliezer contra R. Akiva. El corazón del estudio: dos filos.",
      },
      {
        ref: "Sucá 11b (Reish Lakish)",
        he: "וְאֵד יַעֲלֶה מִן הָאָרֶץ",
        es: "«Y un vapor subía de la tierra» (Bereshit 2:6)",
        funcion: "El modelo legal del sjaj es una nube. El techo imita al vapor.",
      },
      {
        ref: "Sucá 28b",
        he: "תֵּשְׁבוּ כְּעֵין תָּדוּרוּ",
        es: "«Habitarán» = como quien vive de veras",
        funcion: "La inversión: la choza pasa a ser lo fijo y la casa, lo pasajero.",
      },
      {
        ref: "Devarim 16:14-15",
        he: "וְשָׂמַחְתָּ בְּחַגֶּךָ … וְהָיִיתָ אַךְ שָׂמֵחַ",
        es: "«Y te alegrarás en tu fiesta… y no tendrás sino alegría»",
        funcion: "La única fiesta con tres mandatos de alegría (Da'at Zekenim).",
      },
      {
        ref: "Zohar, Emor 43:276",
        he: "צִלָּא דִּמְהֵימְנוּתָא",
        es: "«La sombra de la fe»",
        funcion: "El nombre que el Zohar le da a la sucá. La Shejiná extiende sus alas.",
      },
      {
        ref: "Pri Etz Jaim, Shaar HaSucot 1:13",
        he: "כִּי אוֹר מַקִּיף הוּא בְּחִינַת הַחִבּוּק",
        es: "«Porque la luz envolvente es el abrazo»",
        funcion: "El Arizal le pone nombre técnico a la sucá: es un abrazo.",
      },
    ],
    cierre: [
      `Una nube que hace de techo, un techo modelado sobre vapor, una choza que se vuelve casa, tres mandatos de alegría, una sombra que se llama fe y una luz que se llama abrazo. Eso es Sucot.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "Versículo-ancla — Vaikrá (Levítico) 23:42-43",
        he: "בַּסֻּכֹּ֥ת תֵּשְׁב֖וּ שִׁבְעַ֣ת יָמִ֑ים כׇּל־הָֽאֶזְרָח֙ בְּיִשְׂרָאֵ֔ל יֵשְׁב֖וּ בַּסֻּכֹּֽת׃ לְמַ֘עַן֮ יֵדְע֣וּ דֹרֹֽתֵיכֶם֒ כִּ֣י בַסֻּכּ֗וֹת הוֹשַׁ֙בְתִּי֙ אֶת־בְּנֵ֣י יִשְׂרָאֵ֔ל בְּהוֹצִיאִ֥י אוֹתָ֖ם מֵאֶ֣רֶץ מִצְרָ֑יִם אֲנִ֖י יְהֹוָ֥ה אֱלֹהֵיכֶֽם׃",
        es: "En cabañas habitarán siete días; todo nativo en Israel habitará en cabañas — para que sepan sus generaciones que en cabañas hice habitar a los hijos de Israel cuando los saqué de la tierra de Egipto. Yo, YHVH, su Dios.",
        source: "Vaikrá (Levítico) 23:42-43",
      },
      {
        label: "Las cuatro especies y el mandato de alegrarse — Vaikrá 23:40",
        he: "וּלְקַחְתֶּ֨ם לָכֶ֜ם בַּיּ֣וֹם הָרִאשׁ֗וֹן פְּרִ֨י עֵ֤ץ הָדָר֙ כַּפֹּ֣ת תְּמָרִ֔ים וַעֲנַ֥ף עֵץ־עָבֹ֖ת וְעַרְבֵי־נָ֑חַל וּשְׂמַחְתֶּ֗ם לִפְנֵ֛י יְהֹוָ֥ה אֱלֹהֵיכֶ֖ם שִׁבְעַ֥ת יָמִֽים׃",
        es: "Y tomarán para ustedes, el primer día, fruto de árbol hermoso, ramas de palmera, rama de árbol frondoso y sauces del arroyo; y se alegrarán delante de YHVH su Dios siete días.",
        source: "Vaikrá (Levítico) 23:40",
      },
      {
        label: "La alegría mandada dos veces más — Devarim (Deuteronomio) 16:14-15",
        he: "וְשָׂמַחְתָּ֖ בְּחַגֶּ֑ךָ אַתָּ֨ה וּבִנְךָ֤ וּבִתֶּ֙ךָ֙ וְעַבְדְּךָ֣ וַאֲמָתֶ֔ךָ וְהַלֵּוִ֗י וְהַגֵּ֛ר וְהַיָּת֥וֹם וְהָאַלְמָנָ֖ה אֲשֶׁ֥ר בִּשְׁעָרֶֽיךָ … וְהָיִ֖יתָ אַ֥ךְ שָׂמֵֽחַ׃",
        es: "Y te alegrarás en tu fiesta — tú, tu hijo y tu hija, tu siervo y tu sierva, el levita, el extranjero, el huérfano y la viuda que están en tus puertas… y no tendrás sino alegría.",
        source: "Devarim (Deuteronomio) 16:14-15",
      },
      {
        label: "El prooftext del Ramban — Yeshayá (Isaías) 4:5-6",
        he: "כִּ֥י עַל־כׇּל־כָּב֖וֹד חֻפָּֽה׃ וְסֻכָּ֛ה תִּהְיֶ֥ה לְצֵל־יוֹמָ֖ם מֵחֹ֑רֶב וּלְמַחְסֶה֙ וּלְמִסְתּ֔וֹר מִזֶּ֖רֶם וּמִמָּטָֽר׃",
        es: "Porque sobre toda la gloria habrá un palio nupcial; y una cabaña habrá para sombra de día contra el calor, y para amparo y escondite contra el aguacero y la lluvia.",
        source: "Yeshayá (Isaías) 4:5-6",
      },
      {
        label: "El final del calendario — Zejaryá (Zacarías) 14:16",
        he: "וְהָיָ֗ה כׇּל־הַנּוֹתָר֙ מִכׇּל־הַגּוֹיִ֔ם הַבָּאִ֖ים עַל־יְרוּשָׁלָ֑͏ִם וְעָל֞וּ מִדֵּ֧י שָׁנָ֣ה בְשָׁנָ֗ה לְהִֽשְׁתַּחֲוֺת֙ לְמֶ֙לֶךְ֙ יְהֹוָ֣ה צְבָא֔וֹת וְלָחֹ֖ג אֶת־חַ֥ג הַסֻּכּֽוֹת׃",
        es: "Y sucederá que todos los que queden de entre todas las naciones que vinieron contra Jerusalén subirán año tras año a postrarse ante el Rey, YHVH de los Ejércitos, y a celebrar la fiesta de las Cabañas.",
        source: "Zejaryá (Zacarías) 14:16",
      },
    ],
    parrafos: [
      `Mira primero el calendario, porque el calendario es el argumento. El 1 de Tishrei se toca el shofar y el mundo entra a juicio. El 10 de Tishrei se ayuna veinticinco horas, no se come ni se bebe, se dice todo lo que uno hizo mal y se sale del día limpio y vacío. Y el 15 de Tishrei —cuatro días después, con la luna llena— la Torá manda algo que ninguna religión inventaría por su cuenta: sal de tu casa. Deja el techo sólido, deja las paredes que te costaron años, y múdate una semana a una choza de tablas con un techo de ramas cortadas por el que se cuela la lluvia y se ven las estrellas. Cuatro días después del día más solemne del año, la orden es irse a vivir a la intemperie. Y encima —esto es lo que termina de descolocar— la fiesta se llama, en la liturgia, זְמַן שִׂמְחָתֵנוּ: "el tiempo de nuestra alegría".`,
      `El versículo-ancla es Vaikrá 23:42-43, y hay que leerlo despacio porque tiene dos mitades distintas. La primera mitad es la orden: בַּסֻּכֹּת תֵּשְׁבוּ שִׁבְעַת יָמִים, "en cabañas habitarán siete días". La segunda mitad es la razón, y la razón no es un motivo agrícola ni una conmemoración de una batalla: לְמַעַן יֵדְעוּ דֹרֹתֵיכֶם כִּי בַסֻּכּוֹת הוֹשַׁבְתִּי אֶת בְּנֵי יִשְׂרָאֵל, "para que sepan sus generaciones que en cabañas hice habitar a los hijos de Israel". Nótese quién es el sujeto del verbo. No dice "porque ellos vivieron en cabañas". Dice הוֹשַׁבְתִּי, "Yo los hice habitar". La cabaña, en el verso, es algo que Dios hace, no algo que el pueblo improvisó.`,
      `De ahí sale la pregunta que parte en dos toda la literatura de esta fiesta y que ocupará el centro de este estudio: ¿qué eran esas cabañas? El Talmud conserva la discusión en una baraita de Sucá 11b, y la conserva sin resolverla. Rabí Eliezer dice: עַנְנֵי כָבוֹד הָיוּ — "eran las Nubes de Gloria", las columnas de nube que envolvieron al campamento en el desierto. Rabí Akiva dice: סוּכּוֹת מַמָּשׁ עָשׂוּ לָהֶם — "se hicieron cabañas de verdad", chozas de palos, como cualquier campamento del mundo. Uno lee un milagro; el otro lee carpintería. Y ninguno de los dos está siendo poco religioso: la discusión es sobre qué clase de cosa es un refugio.`,
      `Antes de entrar ahí, tres datos del texto que casi nadie mira y que hacen falta. El primero es ortográfico y es verificable letra por letra en cualquier jumash: en el versículo 42 la palabra aparece dos veces escrita DEFECTIVA —בַּסֻּכֹּת, sin vav—, y en el versículo 43 aparece una vez PLENA —בַסֻּכּוֹת, con vav. Tres apariciones seguidas, dos incompletas y una completa. Parece un detalle de escribas; el Arizal construye sobre él toda su lectura de la fiesta, y lo veremos.`,
      `El segundo dato es el de la alegría, y es aritmética simple. Sobre Sucot la Torá manda alegrarse tres veces: וּשְׂמַחְתֶּם לִפְנֵי יְהֹוָה אֱלֹהֵיכֶם (Vaikrá 23:40), וְשָׂמַחְתָּ בְּחַגֶּךָ (Devarim 16:14) y וְהָיִיתָ אַךְ שָׂמֵחַ (Devarim 16:15). Los tosafistas del Da'at Zekenim lo cuentan en su comentario a ese último verso y sacan la comparación: sobre Shavuot la Torá manda alegrarse una sola vez, y sobre Pésaj no lo manda ninguna. Tres, uno, cero. Sucot es, medido en el texto mismo, la fiesta más alegre del calendario judío — y es la que te manda a dormir afuera.`,
      `Y el tercer dato es de escala. Sucot es la única fiesta del año cuyo culto no era solo por Israel. En Bamidbar 29 se ordenan los toros de los siete días, y el número baja cada día: trece, doce, once, diez, nueve, ocho, siete. Sumados dan exactamente setenta. Rabí Elazar, en Sucá 55b, dice qué significan: "esos setenta toros, ¿frente a quién? Frente a las setenta naciones". Y el profeta cierra el círculo al final de la historia: cuando todo termine, dice Zejaryá 14:16, los sobrevivientes de todas las naciones subirán a Jerusalén año tras año — y lo que subirán a celebrar es, precisamente, la fiesta de las Cabañas. La fiesta más frágil del año es también la más universal. Vale la pena preguntarse por qué.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Rashi resuelve el verso en dos palabras y sin discutir. Sobre כִּי בַסֻּכּוֹת הוֹשַׁבְתִּי escribe: עַנְנֵי כָבוֹד — "Nubes de Gloria". Eso es todo: cuatro sílabas y una decisión. Rashi toma partido por Rabí Eliezer y remite a la fuente (Sifrá, Emor; la baraita de Sucá 11b). El efecto es enorme, porque para el lector medio de la Torá —que lee con Rashi al lado— la cabaña deja de ser una choza desde la primera línea. Lo que se conmemora no es lo que el pueblo construyó, sino lo que Dios puso alrededor del pueblo. Nótese el giro: la mitzvá consiste en fabricar con las manos una imitación de algo que, según Rashi, nadie fabricó nunca.`,
      },
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן).",
        texto: `Ramban cita a Rashi y hace algo más fuerte que darle la razón: dice que las Nubes de Gloria son la lectura correcta incluso בְּדֶרֶךְ הַפְּשָׁט, incluso por la vía del sentido llano. Y trae un prooftext que vale por todo el estudio. Yeshayá 4:5-6 promete que en el futuro Dios creará sobre el monte Tzión "nube de día y humo, y resplandor de fuego llameante de noche", y remata: כִּי עַל כָּל כָּבוֹד חֻפָּה, "porque sobre toda la gloria habrá una jupá" —un palio nupcial— וְסֻכָּה תִּהְיֶה לְצֵל יוֹמָם מֵחֹרֶב, "y una sucá habrá para sombra de día contra el calor, y para amparo contra el aguacero y la lluvia". Ahí están juntas, en un mismo versículo profético, las tres palabras que gobiernan esta fiesta: nube, palio de bodas y cabaña. Para Ramban, entonces, el verso de Vaikrá dice literalmente: "hice de las nubes de Mi Gloria cabañas para protegerlos". Y añade una nota de calendario que es puro Ramban: Pésaj recuerda la salida de Egipto al principio del verano; Sucot recuerda el milagro continuo —no un acontecimiento sino una permanencia— al principio de las lluvias.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Sobrio, gramatical, terrestre. Ibn Ezra sostiene que fueron cabañas de verdad: "las hicieron después de cruzar el Mar de Juncos, y desde luego en el desierto del Sinaí, donde estuvieron cerca de un año; y así es la costumbre de todos los campamentos". Pero entonces se hace la pregunta obvia y la contesta con una elegancia que casi nadie nota: si la salida de Egipto fue en Nisán, ¿por qué esta fiesta cae en Tishrei? Respuesta: porque mientras la nube de Dios estuvo sobre el campamento de día, el sol no los golpeaba y no necesitaban techo; empezaron a construir cabañas a partir de los días de Tishrei, por el frío. Es una respuesta racionalista, y sin embargo mira lo que concede sin darse cuenta: en la reconstrucción de Ibn Ezra, la cabaña aparece exactamente cuando la nube deja de bastar. Las dos opiniones de Sucá 11b, en su lectura, no compiten: se suceden.`,
      },
      {
        etiqueta: "Rashbam (רַשְׁבָּ\"ם) — el otro filo.",
        texto: `Y aquí entra la voz que impide que este estudio se vuelva devocional. El Rashbam —nieto de Rashi, el más implacable defensor del pshat en toda la tradición— dice sin rodeos que el sentido llano está con Rabí Akiva: cabañas reales. Y da el motivo, que es lo importante. Lee juntos los dos versos: "harás la fiesta de las Cabañas cuando recojas de tu era y de tu lagar" (Devarim 16:13) y "para que sepan que en cabañas hice habitar a los hijos de Israel". Es decir: justo cuando tu casa está llena de todo lo bueno —grano, vino, aceite— y estás a punto de decirte a ti mismo כֹּחִי וְעֹצֶם יָדִי עָשָׂה לִי אֶת הַחַיִל הַזֶּה, "mi fuerza y el poder de mi mano me hicieron esta riqueza" (Devarim 8:17), justo entonces sales de la casa llena y te vas a dormir a una choza, "para recordar que en el desierto no tuvieron heredad ni casas donde vivir". La sucá del Rashbam no es un abrazo: es un antídoto contra la soberbia del que acaba de cobrar la cosecha. Guarda esa lectura. El estudio la va a necesitar entera.`,
      },
      {
        etiqueta: "El Rambam / Maimónides (הָרַמְבַּ\"ם).",
        texto: `El Rambam, en el Moré Nevujim III:43, se pone del lado del Rashbam y lo formula como principio moral: los dos festivales de peregrinación que recuerdan el desierto —Pésaj y Sucot— enseñan "que el hombre recuerde siempre los días de aflicción en los días de holgura, para que crezca su gratitud y adquiera humildad y sumisión". Por eso comemos matzá y hierbas amargas en Pésaj, "y por eso sale de las casas y habita en cabañas, como hacen los desdichados que moran en desiertos y páramos, para recordar que ese fue nuestro estado antiguamente". Y añade dos observaciones de una honestidad rara. La primera: Sucot cae en otoño porque es cuando se puede vivir en una cabaña, "no hay calor fuerte ni lluvia molesta" — y cita a Aristóteles para decir que todos los pueblos antiguos festejaban después de la cosecha. La segunda es más filosa: sobre las cuatro especies advierte que las razones que dieron los Sabios son derashot, "que ellos usan el texto bíblico como una especie de lenguaje poético" y no como el significado literal del verso; su propia razón, dice, es que las cuatro especies son la alegría por haber cambiado el desierto "sin lugar de siembra ni higuera ni vid ni granado ni agua para beber" (Bamidbar 20:5) por una tierra de árboles y ríos. El Rambam no está desautorizando el midrash: está diciendo qué clase de verdad es. Vale la pena tenerlo presente cuando lleguemos al midrash de los cuatro tipos.`,
      },
      {
        etiqueta: "Da'at Zekenim (בַּעֲלֵי הַתּוֹסָפוֹת) — la cuenta de las alegrías.",
        texto: `Los tosafistas, comentando וְהָיִיתָ אַךְ שָׂמֵחַ (Devarim 16:15), hacen la aritmética: "encuentras que hay TRES alegrías escritas en la fiesta de Sucot: וְשָׂמַחְתָּ בְּחַגֶּךָ, אַךְ שָׂמֵחַ, y וּשְׂמַחְתֶּם לִפְנֵי יְהֹוָה אֱלֹהֵיכֶם —que está escrito en la parashá Emor—; y respecto de Shavuot no está escrita más que una; y respecto de Pésaj no está escrita ninguna". La explicación que dan es agrícola y desarmante: en Pésaj todavía no se recogió nada, en Shavuot ya se recogió el grano pero no la fruta del árbol, y en Sucot se recogió todo y ya está guardado dentro de la casa — "entonces la alegría es completa". Lo que se sigue de esto es incómodo y hermoso a la vez: la alegría plena aparece en el calendario justo en el momento en que la Torá te saca de la casa que acabas de llenar.`,
      },
      {
        etiqueta: "El Talmud (סוּכָּה) — cuatro pasajes que arman el edificio.",
        texto: `Primero, la baraita central, Sucá 11b: "«que en cabañas hice habitar a los hijos de Israel» — eran Nubes de Gloria, palabras de Rabí Eliezer. Rabí Akiva dice: cabañas de verdad se hicieron". Segundo, y esto casi nadie lo cita: la Guemará pregunta de dónde se saca que el sjaj debe ser de algo que no reciba impureza y que crezca de la tierra, y Reish Lakish responde con un verso del segundo capítulo del Génesis: "וְאֵד יַעֲלֶה מִן הָאָרֶץ", "y un vapor subía de la tierra" (Bereshit 2:6). Así como el vapor —una nube— no recibe impureza y sube de la tierra, así el techo de la sucá. El modelo legal del sjaj es una nube. Tercero, Sucá 2a fija las medidas y una de ellas es toda una definición: es pasul —inválida— la sucá "cuyo sol es mayor que su sombra". No se pide oscuridad: se pide que gane la sombra, aunque sea por poco. Y cuarto, Sucá 28b da la regla que lo cambia todo: la Torá dice תֵּשְׁבוּ, y los Sabios leen כְּעֵין תָּדוּרוּ, "habiten como quien vive de verdad" — de donde "durante los siete días, uno hace de su sucá su residencia FIJA y de su casa su residencia PASAJERA; si tiene vajilla linda, la sube a la sucá; si tiene buenas camas, las sube a la sucá; come, bebe y descansa en la sucá". Lee otra vez: la choza es lo permanente y la casa de ladrillo es lo provisorio. Durante siete días el mundo se declara al revés.`,
      },
      {
        etiqueta: "El Talmud (עֲבוֹדָה זָרָה ג׳ ע\"א) — la prueba de la sucá.",
        texto: `Hay un pasaje en Avodá Zará 3a que conviene oír aunque incomode. Describe el juicio del final de la historia: las naciones piden una oportunidad y Dios les da una mitzvá "fácil", la de la sucá. "De inmediato cada una toma sus materiales y va y hace una sucá en el techo de su casa. Y el Santo, bendito sea, les calienta el sol como en pleno Tamuz, y cada uno מְבַעֵט בְּסוּכָּתוֹ וְיוֹצֵא — patea su sucá y se va". La imagen es brutal y es exacta: la sucá no se prueba cuando el clima acompaña. Se prueba cuando aprieta. Y la Guemará añade, para que nadie se envanezca, que también a Israel le llegan años en que el sol aprieta — con la diferencia de que quien está sufriendo de verdad está exento de la sucá, y de que, según la halajá, salirse en ese caso no es patear nada. Lo que se juzga no es el calor: es el gesto de la patada.`,
      },
      {
        etiqueta: "El Midrash (וַיִּקְרָא רַבָּה ל׳:י\"ב) — los cuatro tipos.",
        texto: `El midrash más conocido de la fiesta hace de las cuatro especies un censo del pueblo. El etrog tiene sabor y aroma: esos son los que tienen Torá y buenas obras. La palmera da dátiles —sabor— pero no huele: los que tienen Torá y no tienen buenas obras. El mirto huele pero no se come: los que tienen buenas obras y no tienen Torá. Y el sauce no tiene ni sabor ni aroma: "esos son los que no tienen ni Torá ni buenas obras". ¿Y qué hace Dios con ellos? El midrash plantea la única salida honesta: לְאַבְּדָן אִי אֶפְשָׁר, "destruirlos es imposible". Entonces: "que se aten todos en un solo manojo y se expíen unos a otros; y si hacen eso, en esa hora Yo me elevo". La prueba que trae es Amós 9:6, donde Dios "edifica en los cielos sus escalones" y "funda su manojo (אֲגֻדָּתוֹ) sobre la tierra": Él sube cuando ellos se atan. Guárdate el detalle de que el sauce, el que no tiene nada, no es descartado ni tolerado — es estructuralmente necesario para que el manojo exista.`,
      },
      {
        etiqueta: "El Zohar (אֱמוֹר) — la sombra de la fe y los huéspedes.",
        texto: `El Zohar le pone a la sucá un nombre que no está en la Torá y que se quedó para siempre: צִלָּא דִּמְהֵימְנוּתָא, "la sombra de la fe". Y describe lo que pasa adentro: "cuando el hombre se sienta en esta morada, en la sombra de la fe, la Shejiná extiende sus alas sobre él desde arriba, y Avraham y otros cinco justos ponen su morada con él" — y Rabí Aba precisa: Avraham, los cinco justos y el rey David. De ahí salen los אוּשְׁפִּיזִין, los siete huéspedes: Avraham, Yitzjak, Yaakov, Moshé, Aharón, Yosef y David, uno por noche, en el orden que el sidur conserva hasta hoy. El Zohar cuenta incluso el gesto de Rav Hamnuna Sabá, que al entrar se quedaba de pie junto a la puerta, por dentro, y decía en voz alta: תִּיבוּ אוּשְׁפִּיזִין עִלָּאִין, תִּיבוּ, "siéntense, huéspedes supremos, siéntense". Y entonces —esto es lo que casi siempre se recorta al citar el pasaje— viene la advertencia. La porción de esos huéspedes, dice el Zohar, es de los pobres. Quien se sienta en la sombra de la fe, invita a los siete y no les da su porción, "todos se levantan de su mesa" y Avraham en persona proclama sobre él el versículo de Koraj: סוּרוּ נָא מֵעַל אָהֳלֵי הָאֲנָשִׁים הָרְשָׁעִים הָאֵלֶּה, "apártense de las tiendas de estos hombres malvados" (Bamidbar 16:26). Y Rabí Elazar remata con la regla práctica: no digas "primero como yo hasta saciarme y lo que sobre se lo doy a los pobres" — רֵישָׁא דְּכֹלָּא דְּאוּשְׁפִּיזִין הוּא, "lo primero de todo es de los huéspedes".`,
      },
      {
        etiqueta: "El Arizal (הָאֲרִ\"י) — la sucá como אוֹר מַקִּיף.",
        texto: `Y aquí llega la voz que le da al estudio su columna vertebral, y llega con una precisión que sorprende. Rabí Jaim Vital, transmitiendo al Arizal en el Pri Etz Jaim, Shaar HaSucot, escribe: "la sucá es el secreto de la LUZ ENVOLVENTE hacia la Nukvá… y nosotros nos sentamos debajo de la sucá para recibir esa luz envolvente, y que esa luz quede cubriéndonos y rodeándonos por todos lados (יְסַכֵּךְ אֵלֵינוּ וְיַקִּיפֵנוּ מִכָּל צְדָדִים); y por eso Israel estuvo rodeado en el desierto por las siete Nubes de Gloria" (3:2). El Arizal no elige entre Rabí Eliezer y Rabí Akiva: los superpone. La nube ERA una luz envolvente, y la choza que construimos con las manos es el vaso que la recibe. Tres precisiones más, todas verificadas en el mismo tratado. Primera, y es la definición que este estudio persigue: כִּי אוֹר מַקִּיף הוּא בְּחִינַת הַחִבּוּק, "porque la luz envolvente es el aspecto del ABRAZO" (1:13) — y el verso que el Arizal usa una y otra vez para nombrar la fiesta es וִימִינוֹ תְּחַבְּקֵנִי, "y su derecha me abraza" (Shir HaShirim 2:6). Segunda: וּבְוַדַּאי כִּי אוֹר מַקִּיף גָּדוֹל מְאֹד מְאֹד מִן אוֹר פְּנִימִי, "sin duda la luz envolvente es muchísimo mayor que la luz interior", y por eso הַמַּקִּיפִים הֵם הָעִיקָּרִים, "los envolventes son lo principal" (1:12). Tercera, y explica una halajá extraña: los Sabios dijeron "necesitamos la sombra del sjaj, no la sombra de las paredes" (3:6) — porque la sombra del techo es el envolvente de Imá, la Madre superior, mientras que las paredes son un nivel más bajo; por eso también el sjaj tiene que ser de algo que no reciba impureza, "porque de los envolventes de la Madre ningún juicio puede mamar, pues es un mundo de bondad y misericordia" (3:8). Y sobre la ortografía del verso, el Arizal construye lo siguiente (4:1-3): la palabra aparece tres veces, "dos veces defectiva y la tercera plena"; y סוּכָּה plena vale כ״ו ה״ס — es decir, sus propias letras se parten en כ+ו = 26, que es יְהֹוָה, y ה+ס = 65, que es אֲדֹנָי. La cabaña completa es la unión de los dos Nombres, cubierta y rodeada por la Madre de arriba.`,
      },
      {
        etiqueta: "Sefat Emet (שְׂפַת אֱמֶת) — la orden en cuatro palabras.",
        texto: `El Gerer Rebe reduce toda la mitzvá a una frase de cuatro palabras: וְזֶה מִצְוַת סֻכָּה, צֵא מִדִּירַת קֶבַע — "y esta es la mitzvá de la sucá: SAL de la morada fija". Y explica por qué viene justo después de los Diez Días de Teshuvá: "por eso, después de los diez días de arrepentimiento, la sucá. Es la SEÑAL de quién quedó purificado y salió inocente en el juicio: ese tiene parte en la mitzvá de la sucá". La sucá, en esta lectura, no es un castigo posterior a la absolución: es lo que se hace con la absolución. Uno sale limpio de Yom Kipur y lo primero que hace con esa limpieza es dejar la casa. En otro lugar del mismo pasaje agrega que la sucá es עַמּוּד הַשָּׁלוֹם, la columna de la paz, la midá de Aharón — porque las Nubes de Gloria fueron por mérito de Aharón, y cuando la nube estaba sobre ellos, Amalek no podía atacar: "cayó el temor sobre Amalek y sobre todos los malvados, y se sometieron por sí solos". La protección de la nube no era una muralla. Era una presencia visible que desarmaba al enemigo sin pelear.`,
      },
      {
        etiqueta: "Ohr LaShamayim (אוֹר לַשָּׁמַיִם) — el jasidismo lo dice en voz alta.",
        texto: `Rabí Meir HaLeví de Apta, comentando nuestro mismo versículo, junta en un párrafo todo lo que este estudio viene armando. Cita el Tikunei Zohar para la gematría —סוּכָּה בְּגִימַטְרִיָּא הֲוָיָ״ה אֲדֹנָ״י— y observa que el verso dice סוּכּוֹת en plural, es decir "dos veces YHVH-Adonai: unión arriba y unión abajo". Después lee la segunda mitad del verso palabra por palabra: כָּל הָאֶזְרָח בְּיִשְׂרָאֵל יֵשְׁבוּ בַּסֻּכּוֹת — "«todo», que es la palabra que incluye todo, alude a la LUZ ENVOLVENTE; «el nativo» (הָאֶזְרָח), de la raíz que significa brillar, es el que brilla para todos; «habitarán en cabañas», que merece atraer iluminación y santidad desde la luz envolvente". Y añade que quien camina por esa vía "merece que vengan a él todos los ushpizín santos y supremos a asistirlo". Es la cadena completa —gematría, ushpizín, or makif— dicha por una fuente jasídica y verificable, no por una intuición nuestra.`,
      },
      {
        etiqueta: "Rabí Najman de Breslov (לִקּוּטֵי מוֹהֲרַ\"ן).",
        texto: `Una nota breve y sorprendente para cerrar. En Likutei Moharán II 5:14, Rabí Najman recorre las cuatro estaciones de Tishrei —Rosh Hashaná, Yom Kipur, Sucot, Shminí Atzéret— y al llegar a la tercera dice: סֻכָּה זֶה בְּחִינַת תִּקּוּן הַמַּלְאָךְ, כִּי סוּכָּה בְּגִימַטְרִיָּא מַלְאָךְ, "la sucá es el aspecto de la rectificación del ángel, porque sucá vale lo mismo que מַלְאָךְ, ángel". Y de ahí deriva por qué la fiesta se llama זְמַן שִׂמְחָתֵנוּ: porque Sucot es también חַג הָאָסִיף, la fiesta de la recolección, cuando entra a la casa toda clase de alimento — y hace falta alegría para que lo que se come no arruine lo que se sueña. La cabaña de ramas y el ángel valen lo mismo: noventa y uno.`,
      },
    ],
    glosa: `Glosa para el lector: Sucá / sucot = cabaña / cabañas (de ahí "Sucot", la Fiesta de las Cabañas o Tabernáculos). Sjaj (סְכָךְ) = el techo vegetal de la sucá; tiene que ser algo cortado, que crezca de la tierra y no reciba impureza ritual. Ananei Kavod = "Nubes de Gloria", las nubes que envolvieron al campamento en el desierto. Ushpizín = del griego/arameo "huéspedes"; los siete invitados místicos de la sucá. Tzilá dimheimnutá = "la sombra de la fe", nombre de la sucá en el Zohar. Or makif = "luz envolvente": en el lenguaje del Arizal, una luz demasiado grande para entrar en el vaso, que lo rodea desde fuera; su contrario es or pnimí, la luz interior, la que sí se internaliza. Imá Ilaá = la "Madre superior", la sefirá de Biná. Nukvá = el polo receptivo del sistema luriano. Zman simjaténu = "el tiempo de nuestra alegría", nombre litúrgico de Sucot. Dirat keva / dirat arai = morada fija / morada pasajera. Lejatjilá / bediavad = como se debe hacer de entrada / cómo queda válido después del hecho.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, los hechos son seis y ninguno necesita interpretación. Primero: la Torá manda habitar siete días en cabañas y da como razón que Dios hizo habitar a Israel en cabañas al salir de Egipto (Vaikrá 23:42-43). Segundo: la fecha es el 15 de Tishrei, cuatro días después de Yom Kipur y con luna llena, y coincide con el final de la cosecha —חַג הָאָסִיף, la fiesta de la recolección (Devarim 16:13). Tercero: la misma fiesta manda tomar cuatro especies vegetales y alegrarse (Vaikrá 23:40), y el mandato de alegrarse aparece tres veces, más que en cualquier otra fiesta (Da'at Zekenim a Devarim 16:15).`,
          `Cuarto: la halajá define la sucá por lo que le falta, no por lo que tiene. No puede pasar de veinte codos ni bajar de diez palmos; le bastan tres paredes —y la tercera puede ser de un palmo—; y es inválida si el sol que entra es más que la sombra (Sucá 2a). El techo tiene que ser vegetal, cortado, y de algo que no reciba impureza ritual — y la fuente de esa regla, según Reish Lakish, es el vapor que subía de la tierra en Bereshit 2:6 (Sucá 11b). Quinto: durante los siete días se invierten los roles de las dos viviendas — la sucá es la residencia fija y la casa la pasajera (Sucá 28b). Sexto: el culto público de esos días ofrecía setenta toros, que en el texto se cuentan solos —13, 12, 11, 10, 9, 8, 7— y que el Talmud entiende como ofrecidos por las setenta naciones (Bamidbar 29:13-32; Sucá 55b).`,
          `De esos seis hechos se sigue el pshat de la fiesta, y es más raro de lo que parece: Sucot es una semana en la que se declara oficialmente que la casa no es lo que sostiene. No se abandona la casa —sigue ahí, llena, a veinte pasos—; se la degrada de categoría. Lo que la Torá pide no es pobreza: es un cambio de domicilio legal.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números y las letras)",
        parrafos: [
          `Primera alusión, y es la del hero, con dos fuentes clásicas detrás. סוּכָּה escrita plena vale 91: ס60 + ו6 + כ20 + ה5. Y 91 es exactamente יְהֹוָה (י10+ה5+ו6+ה5 = 26) más אֲדֹנָי (א1+ד4+נ50+י10 = 65). Pero lo notable no es la suma: es que las letras mismas de la palabra se parten en esos dos Nombres. כ+ו = 26. ה+ס = 65. Eso es lo que dice el Tikunei Zohar (22b) al escribir "y hay una sucá abajo: כ״ו ה״ס, que es la unión de los dos Nombres, sucat shalom"; y es lo que repite el Arizal en el Pri Etz Jaim (Shaar HaSucot 4:3): "porque sucá plena vale כ״ו ה״ס, es decir, YHVH y Adonai". Lo que la cabaña de ramas dibuja en el aire, dice la Cabalá, es la unión del Nombre trascendente con el Nombre por el que se lo llama. (Verificado letra por letra: 60+6+20+5 = 91; 26+65 = 91.)`,
          `Segunda alusión, del mismo número y de otra escuela. Rabí Najman: סוּכָּה בְּגִימַטְרִיָּא מַלְאָךְ — sucá vale lo mismo que "ángel": מ40+ל30+א1+ך20 = 91 (Likutei Moharán II 5:14). Y añado una tercera coincidencia que la aritmética sostiene y que no le he encontrado folio: אָמֵן = א1+מ40+ן50 = 91. Se dice como lo que es —un cálculo verificado, no una cita—, pero encaja con una precisión difícil de ignorar: el Zohar llama a la sucá צִלָּא דִּמְהֵימְנוּתָא, "la sombra de la FE", y amén es la palabra de la fe. La choza vale lo mismo que la palabra con la que se dice "así sea".`,
          `Tercera alusión, y es la que el Arizal saca de la ortografía. En el texto masorético, "sucá" aparece tres veces en Vaikrá 23:42-43: dos veces defectiva, sin vav (בַּסֻּכֹּת, בַּסֻּכֹּת), y la tercera plena, con vav (בַסֻּכּוֹת). El Pri Etz Jaim (4:3) lee ahí tres niveles del mismo envolvimiento, y da la cuenta de la defectiva: סֻכָּה sin vav vale 85, y con el kolel —el "más uno" que se le suma a la palabra entera— da 86, que es אֱלֹהִים (א1+ל30+ה5+י10+ם40 = 86). Verificado: 60+20+5 = 85; 85+1 = 86 = 86. Dos formas incompletas que apuntan al Nombre del juicio, y una completa que es la unión. La palabra crece de la contracción a la unión en el espacio de dos versículos.`,
          `Cuarta alusión, y es la de la aritmética simple del culto. Los toros de los siete días bajan de trece a siete y suman setenta (Bamidbar 29:13-32; verificado: 13+12+11+10+9+8+7 = 70). Nótese la forma de la serie: no es constante, es DECRECIENTE. La ofrenda por el mundo se va achicando día a día, hasta que en el octavo queda un solo toro "por la nación única" (Sucá 55b). Y sobre ese descenso, la frase de Rabí Yojanán que ninguna lectura triunfalista sobrevive: אוֹי לָהֶם לַגּוֹיִים, שֶׁאִבְּדוּ וְאֵין יוֹדְעִין מַה שֶּׁאִבְּדוּ — "ay de las naciones, que perdieron algo y no saben qué perdieron"; mientras el Templo estaba en pie, esos setenta toros expiaban por ellas.`,
          `Quinta alusión, sobre las especies. לוּלָב = ל30+ו6+ל30+ב2 = 68, que es el valor de חַיִּים (ח8+י10+י10+ם40 = 68), "vida". La aritmética cierra y la he verificado; la atribución no la he podido rastrear a una fuente clásica en Sefaria, así que va como lectura difundida, no como cita. Y digo también lo que NO cierra, porque es parte del oficio: אֶתְרוֹג vale 610 (א1+ת400+ר200+ו6+ג3) y no equivale a nada relevante para esta fiesta. Se probó, no cerró, se descarta. Una gematría que hay que empujar para que encaje ya no es una gematría: es un deseo.`,
          `Y una última, que no es número sino letra. La letra que abre סוּכָּה es la {{letter:samej|samej}}: un círculo cerrado, la única letra del alfabeto que es puro contorno y puro adentro vacío. Su nombre viene de la raíz que significa sostener —סוֹמֵךְ ה' לְכָל הַנֹּפְלִים, "sostiene YHVH a todos los que caen" (Salmo 145:14)—, y el alfabeto midráshico de Shabat 104a la lee como sigla: ס״ע, סְמוֹךְ עֲנִיִּים, "sostén a los pobres". Guarda esa lectura: es exactamente lo que el Zohar exige de quien invita a los ushpizín.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          `Empieza por la discusión de Sucá 11b, que es el corazón, y resiste la tentación de resolverla rápido. Rabí Eliezer dice: Nubes de Gloria. Rabí Akiva dice: cabañas de verdad. Casi todos los lectores modernos sienten simpatía por Rabí Eliezer —suena más espiritual— y le conceden a Rabí Akiva un "bueno, también, históricamente". Es un error. Las dos opiniones no son dos grados de piedad: son dos teorías del refugio, y las dos están en la Torá.`,
          `Escucha primero a Rabí Akiva con la fuerza que le da el Rashbam. La cosecha está adentro. El granero está lleno, el lagar rebosa, es el punto más alto del año económico, y el hombre que acaba de contar lo suyo está a un paso de decirse כֹּחִי וְעֹצֶם יָדִי, "mi fuerza y el poder de mi mano me hicieron esta riqueza". Justo ahí la Torá lo saca de la casa llena y lo manda a dormir bajo cuatro ramas. No para humillarlo: para recordarle de qué estaba hecha su seguridad cuando no tenía nada. En la lectura del Rashbam y del Rambam, la sucá es una cura contra la ilusión de autosuficiencia, y la cura consiste en volver a habitar, por siete días, exactamente la clase de vivienda de la que uno cree haberse escapado para siempre.`,
          `Ahora escucha a Rabí Eliezer, y verás que no lo contradice: lo completa por el otro lado. Si las cabañas del desierto eran nubes, entonces lo que se conmemora no es lo que el pueblo levantó sino lo que lo rodeó. Y aquí aparece el detalle que hace el argumento: la halajá del sjaj —según Reish Lakish en la misma página— se deriva del vapor de Bereshit 2:6. El techo de la sucá está legalmente modelado sobre una nube. Es decir: cuando cortas ramas y las tiendas encima, no estás improvisando un techo pobre; estás fabricando, con tus manos y con material que se pudre, una imitación de la única cosa que en toda la Torá funciona como protección sin ser sólida.`,
          `Juntas las dos lecturas y sale la enseñanza entera, que es una inversión completa de nuestra idea de seguridad. Nosotros creemos que protege lo que separa: paredes gruesas, techo impermeable, puerta con llave. La sucá dice que eso también aísla. Lo que protegió a Israel en el desierto no tenía paredes: era una nube, y una nube no impide el paso — envuelve. La halajá lo dice con una precisión que ya no parece técnica: no hace falta que la sucá sea oscura, hace falta que la sombra le gane al sol (Sucá 2a); no hacen falta cuatro paredes, bastan dos y un palmo; y el techo, idealmente, debe dejar ver las estrellas. Un refugio que enseña el cielo. Esa es la definición.`,
          `Y aquí la voz jasídica hace su trabajo, que es traducir la estructura a vida. El Baal Shem Tov enseñó que no hay lugar vacío de Dios y que la distancia entre el hombre y su Creador nunca es de espacio sino de atención: uno no se acerca saliendo de su vida, sino levantando la vista dentro de ella. Sus herederos aplicaron eso a esta fiesta con una literalidad casi brutal. El Sefat Emet reduce la mitzvá a cuatro palabras —צֵא מִדִּירַת קֶבַע, "sal de la morada fija"— y explica por qué viene después de Yom Kipur: es la SEÑAL de quien salió inocente del juicio. Sales limpio, y lo primero que haces con esa limpieza es mudarte a lo frágil. Y el Ohr LaShamayim, leyendo el mismo verso, dice que כָּל הָאֶזְרָח בְּיִשְׂרָאֵל יֵשְׁבוּ בַּסֻּכּוֹת alude a la luz envolvente y a quien "brilla para todos". No es que el jasid desprecie la casa. Es que descubrió que la casa nunca fue lo que lo sostenía.`,
          `Falta la parte que casi nadie cita del Zohar, y es la que impide que todo esto se vuelva una postal. Sí: la Shejiná extiende sus alas sobre quien se sienta en la sombra de la fe, y Avraham y los otros seis vienen a sentarse contigo. Pero el Zohar sigue: la porción de esos huéspedes es de los pobres. Si los invitas y no das esa porción, los siete se levantan de la mesa y Avraham dice sobre ti el versículo de Koraj. Y Rabí Elazar da la regla de orden: no "primero yo me sacio y lo que sobre lo doy", sino רֵישָׁא דְּכֹלָּא דְּאוּשְׁפִּיזִין הוּא, "lo primero de todo es de los huéspedes". La sucá es el único edificio de la tradición cuya validez espiritual depende de quién más comió en él. Y por eso el midrash de las cuatro especies encaja aquí y no en otra parte: el sauce —el que no tiene ni sabor ni aroma, ni Torá ni buenas obras— no se descarta. Sin él no hay manojo; y sin manojo, dice Amós leído por el midrash, Dios no se eleva.`,
          `Cierra con Kohélet, porque la tradición eligió leer en esta fiesta precisamente el libro que dice הֲבֵל הֲבָלִים הַכֹּל הָבֶל, "vapor de vapores, todo es vapor". Parece un sabotaje: el tiempo de nuestra alegría lee el libro del desengaño. El Sefat Emet lo explica sin rodeos: "por eso se instituyó Kohélet en Sucot, para volver vapor todas las vanidades del mundo y pedir la reparación del alma". Y ahí está el filo: no se lee Kohélet a pesar de la alegría, se lee para que la alegría sea de la buena. La alegría que depende de que las cosas duren no es alegría, es nerviosismo. La que se puede tener bajo un techo de ramas, sabiendo que todo pasa, esa sí se sostiene. Solo se puede estar verdaderamente contento adentro de algo que uno sabe que no va a durar.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de Sucot es una regla de la estructura de la luz, y el Arizal la formula sin metáforas. La Cabalá luriana distingue dos modos en que una luz se relaciona con un vaso. Está el אוֹר פְּנִימִי, la luz interior: la que el vaso puede contener, la que se internaliza, la que se gana midiendo el propio esfuerzo con el propio tamaño. Y está el אוֹר מַקִּיף, la luz envolvente: una luz de un orden tan alto que ningún vaso la puede contener, y que por eso no entra — rodea. En el {{study:despertar-de-lo-alto|otro estudio de este sitio}} ya vimos ese par aplicado a la redención: el makif como el don que no se gana. Aquí hay que decir lo que allí no se dijo, y es lo específico de esta fiesta: que el makif no es solo un don que baja. Es una FORMA. Y la forma tiene nombre en el Pri Etz Jaim: אוֹר מַקִּיף הוּא בְּחִינַת הַחִבּוּק, "la luz envolvente es el aspecto del abrazo" (Shaar HaSucot 1:13).`,
          `Piénsalo con el cuerpo, que es como el Arizal lo piensa. Un abrazo no entra en el abrazado. No se mete adentro, no lo llena, no lo modifica por dentro; queda por fuera y lo rodea entero — y sin embargo hace algo que ninguna cosa que entre puede hacer: lo contiene sin invadirlo. Por eso el Arizal insiste en que el makif es muchísimo mayor que el pnimí y que "los envolventes son lo principal" (1:12): porque hay algo que solo se puede recibir sin absorberlo. Y de ahí sale la halajá entera de la fiesta, leída al revés. La sucá tiene tres paredes y no cuatro porque un brazo que abraza tiene tres articulaciones y no cierra el círculo. Necesita sombra mayor que sol porque un abrazo cubre, no encierra. Su techo debe ser de algo cortado —material muerto, que se pudre— porque un abrazo no es una estructura: es un gesto que dura lo que dura. Y no se busca la sombra de las paredes sino la del sjaj (3:6), porque lo que se viene a recibir no es la protección lateral: es lo que viene de arriba.`,
          `Ahora se entiende por qué la Torá insistió tanto en el sujeto del verbo. הוֹשַׁבְתִּי — "YO los hice habitar". Rav Yehuda Ashlag, Baal HaSulam, leyó toda la Cabalá como una ciencia del deseo: la criatura es רָצוֹן לְקַבֵּל, voluntad de recibir, y su único órgano de recepción es la carencia. Lo que no cabe en el vaso no se pierde: espera afuera, presionando, hasta que el vaso crezca. Y ese es el mecanismo exacto de esta semana. Después de {{study:elul|Elul}} y de los Días Temibles no queda espacio interior: el vaso está lleno de todo lo que se trabajó, se lloró y se perdonó. Justo entonces la Torá manda salir a un lugar donde ya no se recibe nada por dentro — y se recibe por fuera. Sales de la casa porque una casa es un vaso: te contiene. La sucá no te contiene. Te rodea. No se habita la sucá; la sucá te habita a ti.`,
          `Y esto es lo que cierra el arco de la serie, y lo cierra el Arizal, no nosotros. En {{study:elul|Elul}} el mes lleva el nombre de un verso del Cantar de los Cantares en el que YO doy el primer paso: אֲנִי לְדוֹדִי וְדוֹדִי לִי (6:3). Pues bien: el verso con el que el Arizal nombra Sucot es del mismo Cantar, y es el complementario exacto — וִימִינוֹ תְּחַבְּקֵנִי, "y su derecha me abraza" (2:6), citado una y otra vez en el Shaar HaSucot como la definición de estos días. El mismo poema, dos gestos, un orden. Primero yo me vuelvo hacia Él; después Él me rodea. Y nótese qué queda entre los dos: el juicio de Rosh Hashaná y el vaciamiento de Yom Kipur. No se llega al abrazo por atajo. Se llega vacío.`,
          `El último secreto es el de los dos Nombres, y explica por qué esta fiesta frágil es la más universal del calendario. La palabra סוּכָּה se parte en כ״ו —26, יְהֹוָה, el Nombre que no se pronuncia, el trascendente— y ה״ס —65, אֲדֹנָי, el Nombre por el que sí se llama, el que se dice en voz alta. La sucá es el lugar donde esos dos coinciden: lo infinito y lo pronunciable ocupando el mismo espacio de ramas. Y el Tikunei Zohar (22b) le pone el nombre litúrgico que rezamos todos los viernes: סֻכַּת שָׁלוֹם, "la cabaña de paz" que la Madre superior —Biná— extiende sobre sus hijos. Recuérdalo: en {{study:elul|Elul}} vimos que el mes vale 67, como בִּינָה, porque la teshuvá es "devolver la hei a la Madre". Aquí la Madre responde. En Elul vuelves a la casa de ella; en Sucot ella extiende su casa sobre ti. Y por eso los setenta toros: una casa que se define por lo que rodea, y no por lo que encierra, no tiene manera de dejar a nadie afuera. Cuando Zejaryá describe el final de la historia, la fiesta a la que suben todas las naciones no es ninguna otra. Es esta.`,
        ],
      },
    ],
    caja: {
      titulo: "סוּכָּה = 91 = כ״ו (יְהֹוָה) + ה״ס (אֲדֹנָי) — y la luz envolvente es el abrazo.",
      cuerpo:
        "Las letras de la cabaña se parten solas en los dos Nombres: כ+ו = 26 y ה+ס = 65 (Tikunei Zohar 22b; Pri Etz Jaim, Shaar HaSucot 4:3). Y el Arizal define qué es lo que se recibe ahí: אוֹר מַקִּיף הוּא בְּחִינַת הַחִבּוּק — la luz envolvente es el abrazo (1:13). Por eso tres paredes y no cuatro, sombra mayor que sol, y un techo modelado sobre una nube. No se habita la sucá: la sucá te habita a ti.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que confundí protección con encierro. Todo lo que construí para estar seguro —el techo, el saldo, las certezas, las paredes que me costaron años— protege separando, y lo que separa también aísla. La fiesta me propone otra clase de refugio durante siete días: uno que no me encierra, que deja pasar la lluvia y las estrellas, y que sin embargo la tradición llama "la sombra de la fe" y "el abrazo". No me pide que renuncie a la casa. Me pide que deje de creer que es ella la que me sostiene.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón de la inversión: durante una semana la choza es lo fijo y la casa es lo pasajero, y el mundo se declara oficialmente al revés. Veo el patrón del orden: primero el juicio, después el vacío, y solo entonces el abrazo — nunca al revés, nunca por atajo. Veo el patrón de la medida: no se pide oscuridad, se pide que la sombra le gane al sol; no se piden cuatro paredes, bastan dos y un palmo. Y veo el patrón de la serie decreciente: los toros bajan de trece a siete, la ofrenda por el mundo se va achicando, y aun así suman setenta. Lo que se da por los demás no tiene que ser creciente para ser completo.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Hay cosas mías que no van a entrar nunca, y me pasé la vida tratando de meterlas adentro. Hay perdones que no me caben, amores que me superan, un dolor que no logro procesar y una alegría que no sé dónde poner. La Cabalá tiene un nombre para eso y no es un fracaso: es luz envolvente, lo que es demasiado grande para el vaso y por eso rodea en vez de entrar. Y me da una posición nueva frente a eso: no forzarlo hacia adentro — dejarme rodear. Después de un mes de {{study:elul|escudriñarme}} y un día de vaciarme, ya no tengo espacio por dentro. Justo por eso puedo, esta semana, recibir por fuera.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `El techo de esta cabaña está legalmente modelado sobre el vapor que subía de la tierra en el segundo capítulo del Génesis: lo primero que cubrió al mundo no fue una bóveda, fue una nube. Y el libro que se lee debajo de ese techo dice que todo es הֶבֶל, vapor. La creación entera, vista desde adentro de la sucá, no es una construcción sólida que a veces falla: es algo esencialmente pasajero que a veces se sostiene — y se sostiene porque está rodeado, no porque esté cerrado. Por eso esta es la fiesta que Zejaryá pone al final de la historia y por la que se ofrecían setenta toros: lo que se define por lo que abraza no tiene forma de dejar a nadie afuera.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, antes de que empiece la fiesta: aparta la porción de los huéspedes ANTES de gastar en la tuya — y esta semana come una comida bajo cielo abierto, sin techo, con alguien invitado.",
    texto: `El Zohar da la regla y la da con un orden que no se puede invertir: no digas "primero me sacio yo y lo que sobre lo doy", sino רֵישָׁא דְּכֹלָּא דְּאוּשְׁפִּיזִין הוּא — "lo primero de todo es de los huéspedes"; y la porción de esos huéspedes, aclara, es de los pobres. Así que la acción empieza por el dinero y empieza hoy, mientras se está armando el gasto de la fiesta. Antes de comprar nada para tu mesa, aparta una cantidad concreta —no un porcentaje vago, un número que puedas decir en voz alta— y dásela a alguien que la necesite, o a una institución que dé de comer. Que salga primero. Ese es el orden que el Zohar pide, y es el único detalle de esta fiesta cuya omisión hace que los siete huéspedes se levanten de la mesa.

Y después la parte física, que se puede hacer aunque no tengas ni sucá ni patio. Elige una comida de esta semana y hazla sin techo: en un balcón, en una azotea, en un parque, en la vereda si hace falta — pero con el cielo encima y sin nada sólido en medio. No hace falta que sea de noche ni que se vean estrellas; recuerda que las estrellas son el ideal, no el requisito. Lo que se busca es una hora en la que lo único que te separa de la intemperie sea nada, y comprobar lo que se siente. Y no la hagas solo: invita a alguien que normalmente no invitarías —el que está de paso, el que no tiene con quién, el que no te puede devolver la invitación. El midrash dice que el sauce, el que no tiene ni sabor ni aroma, es imprescindible para que el manojo exista; el alfabeto de Shabat 104a lee la {{letter:samej|samej}} de סוּכָּה como סְמוֹךְ עֲנִיִּים, "sostén a los pobres". Una comida, un cielo abierto, un invitado que no debía estar. Eso es toda la mitzvá en miniatura, y se puede hacer esta semana.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Cuatro días después de Yom Kipur, la Torá manda salir de la casa y habitar siete días en una cabaña (Vaikrá 23:42-43). El Talmud no resuelve qué eran las cabañas del desierto —Nubes de Gloria para Rabí Eliezer, chozas reales para Rabí Akiva (Sucá 11b)— y las dos lecturas son necesarias: la choza cura la ilusión de que la casa te sostiene (Rashbam, Rambam), y la nube revela qué clase de cosa sí te sostiene. La halajá une las dos: el techo de la sucá está modelado, según Reish Lakish, sobre el vapor de Bereshit 2:6. Fabricamos con las manos una imitación de una nube.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `La fiesta invierte el estatuto de las dos viviendas: תֵּשְׁבוּ כְּעֵין תָּדוּרוּ — durante siete días la sucá es la residencia FIJA y la casa la PASAJERA (Sucá 28b). Y las medidas dicen lo mismo en clave técnica: no se pide oscuridad sino que la sombra le gane al sol; no se piden cuatro paredes sino dos y un palmo; y lo ideal —aunque no sea requisito de validez— es que el techo deje ver las estrellas (Sucá 2a; Shulján Aruj, Oraj Jaim 631:3). Un refugio que enseña el cielo.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El Arizal le da nombre técnico: la sucá es אוֹר מַקִּיף, luz envolvente — "y esa luz queda cubriéndonos y rodeándonos por todos lados; por eso Israel estuvo rodeado en el desierto por las siete Nubes de Gloria" (Pri Etz Jaim, Shaar HaSucot 3:2). Y define qué es un makif: אוֹר מַקִּיף הוּא בְּחִינַת הַחִבּוּק, "la luz envolvente es el abrazo" (1:13). Por eso las letras de סוּכָּה se parten en los dos Nombres —כ״ו = 26 = YHVH y ה״ס = 65 = Adonai, 91 en total (Tikunei Zohar 22b)— y por eso la serie cierra aquí: en {{study:elul|Elul}} yo doy el primer paso con un verso del Cantar (6:3); en Sucot Él responde con el verso complementario del mismo Cantar, וִימִינוֹ תְּחַבְּקֵנִי, "y su derecha me abraza" (2:6).`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Apartar la porción de los huéspedes ANTES de gastar en la propia — "lo primero de todo es de los huéspedes", y su porción es de los pobres (Zohar, Emor 43:278-281) — y hacer una comida de la semana bajo cielo abierto, con alguien invitado que no podría devolver la invitación. El sauce, el que no tiene ni sabor ni aroma, es el que hace posible el manojo (Vaikrá Rabá 30:12).`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal, marcada como tal. Los ingredientes están verificados; el cruce es nuestro.",
    parrafos: [
      `Dos hechos verificados que la tradición no cruza, y que aquí se ofrecen solamente como lectura. El primero: el techo de la sucá está derivado, según Reish Lakish, del versículo וְאֵד יַעֲלֶה מִן הָאָרֶץ, "y un vapor subía de la tierra" (Bereshit 2:6, citado en Sucá 11b) — el modelo halájico del sjaj es אֵד, vapor. El segundo: el libro que la tradición manda leer bajo ese techo empieza diciendo הֲבֵל הֲבָלִים… הַכֹּל הָבֶל (Kohélet 1:2), y הֶבֶל significa, en su sentido primero, exactamente eso: vaho, aliento, vapor.`,
      `Léelos juntos y sale algo que no había visto formulado. El techo que te cubre en Sucot es, jurídicamente, vapor. Y el libro que lees debajo de él te dice que todo lo demás también es vapor. La diferencia entre los dos vapores no está en la sustancia: está en la posición. El de Kohélet es el vapor de lo que uno intenta agarrar —el dinero, la fama, el placer, la sabiduría misma— y se le escurre entre los dedos. El de la sucá es el mismo vapor, pero encima de la cabeza y sostenido. Nadie está obligado a leerlo así. Pero que la única semana del año en la que dormimos bajo un techo derivado del vapor sea también la única en la que leemos el libro que llama vapor a todo, es una coincidencia notablemente bien colocada — y sugiere que la cuestión no es dejar de vivir entre cosas que pasan, sino aprender de qué lado de ellas hay que pararse.`,
    ],
  },

  hemshej: [
    "{{study:elul|Si en Sucot Él me abraza, ¿quién dio el primer paso? El mes cuyo nombre está escrito en un verso de amor — y por qué en él el movimiento arranca abajo.}}",
    "{{study:despertar-de-lo-alto|La luz envolvente aparece también en la redención: el don que nadie se gana. La otra cara del makif, en clave de Mashíaj.}}",
    "{{letter:samej|La primera letra de סוּכָּה es un círculo cerrado: la única letra que es puro contorno. Su nombre significa «sostener», y su sigla es «sostén a los pobres».}}",
    "{{study:tercer-templo|Zejaryá dice que al final todas las naciones subirán a celebrar Sucot. ¿Qué clase de edificio es ese al que suben — y por qué la fiesta más frágil es la del final?}}",
  ],

  ctaRef: "Leviticus 23:42",
};
