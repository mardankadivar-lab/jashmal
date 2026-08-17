
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — Ki Tetzé / El buey y el burro dentro de la serpiente · נָחָשׁ
//  Serie «Parashá». Contenido verificado por el Sofer:
//  scratchpad/informe-megale-amukot-najash-shor-jamor.md
//
//  GUARDARRAÍLES OBLIGATORIOS (sección 5 del informe del Sofer). Si alguien
//  edita esta página, tiene que seguir respetándolos:
//   1. La fuente se cita SIEMPRE "Megalé Amukot al Vaetjanán, Ofán 71".
//      NUNCA "sobre Ki Tetzé" ni "sobre Bereshit".
//   2. "Antes del pecado estaba permitido ararlos" va SIEMPRE como "el Megalé
//      Amukot revela/enseña" (jidush cabalístico sobre Sanedrín 59b). NUNCA
//      como midrash, pshat o halajá: en pshat, kilayim NO depende del pecado
//      de Adam (así queda dicho, explícito, en el Pshat de PaRDeS).
//   3. NO invertir el mapa: derecha = jamor (ח, klipá de Ishmael);
//      izquierda = shor (ש, klipá de Esav; "rostro de buey desde la
//      izquierda", Yejezkel 1:10).
//   4. La lectura de LETRAS (ח y ש dentro de נחש) es del Megalé Amukot. El
//      Zohar Balak dice otra cosa: "del lado del najash sale el buey, del
//      lado del kesem sale el burro". Distinguir las voces siempre.
//   5. Si se menciona la נ: en el Ofán 71 la nun alargada de ואתחנן es el
//      secreto del najash mismo; el acrónimo נח"ש = najash-jamor-shor es de
//      Kav HaYashar 102:9. No decir que la nun "sobra".
//   6. Gematrías permitidas SOLO: שור 506 + חמור 254 = 760 = צרעת (del propio
//      Ofán 71 y Kav HaYashar 102:9) · letras medias ו+מו = 52 = כלב (MA
//      Vayeshev 49; Zohar Beshalaj II 65a) · עמלק = צפע = אל אחר = 240 (Kav
//      HaYashar 102:8). El 358 (נחש = משיח) NO se lidera: aparece UNA vez,
//      marginal, en el Sod. Nada de "olam jesed yibaneh = 411".
//   7. Formulación textual del MA: "no mezclar las fuerzas de impureza NI
//      AUMENTAR su fuerza" (שלא לערבב... ולהוסיף כח שלהם); del Zohar: "no dar
//      lugar a las especies malignas". No inventar terminología.
//   8. Las traducciones del arameo/hebreo son nuestras (no reproducir Sulam
//      ni otras traducciones con copyright).
//
//  Hero (modo "numero"): שור 506 + חמור 254 = 760 = צרעת (tzaráat), la
//  gematría que trae el propio Ofán 71.
//
//  IDIOMA: el análisis está en español. Los campos *Fa replican el español a
//  propósito (fallback), porque el Sofer aún no tradujo este estudio al farsi
//  y este departamento no genera farsi por su cuenta. Cuando llegue la
//  traducción verificada, se reemplazan aquí y en lib/content/misterios.ts.
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "buey-y-burro",
  hero: {
    serielabel: "Serie «Parashá» · Ki Tetzé — Megalé Amukot al Vaetjanán, Ofán 71",
    serielabelFa: "Serie «Parashá» · Ki Tetzé — Megalé Amukot al Vaetjanán, Ofán 71",
    he: "נָחָשׁ",
    titulo: "El buey y el burro dentro de la serpiente",
    tituloFa: "El buey y el burro dentro de la serpiente",
    ganchoEs:
      "Dentro de la palabra hebrea para serpiente —נָחָשׁ, najash— hay dos animales escondidos. Y la Torá tiene un mandamiento para que nunca se junten: «no ararás con buey y burro juntos» (Devarim 22:10, en la parashá Ki Tetzé). El Megalé Amukot, en su comentario a Vaetjanán, revela dónde viven esas dos fuerzas: clavadas en las letras mismas de la serpiente.",
    ganchoFa:
      "Dentro de la palabra hebrea para serpiente —נָחָשׁ, najash— hay dos animales escondidos. Y la Torá tiene un mandamiento para que nunca se junten: «no ararás con buey y burro juntos» (Devarim 22:10, en la parashá Ki Tetzé). El Megalé Amukot, en su comentario a Vaetjanán, revela dónde viven esas dos fuerzas: clavadas en las letras mismas de la serpiente.",
    numero: { valor: "760", rom: "Shor 506 + Jamor 254 = Tzaráat" },
    fecha: "Shabat · 9 Elul 5786 · 22 ago 2026",
    // Estudio de la serie «Parashá»: el "volver" apunta al índice de misterios,
    // no a la puerta de la serie del Mashíaj (default de la plantilla).
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── 1. תַּרְגּוּם ────────────────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "Versículo-ancla — Devarim (Deuteronomio) 22:10, la parashá Ki Tetzé",
        he: "לֹֽא־תַחֲרֹ֥שׁ בְּשׁוֹר־וּבַחֲמֹ֖ר יַחְדָּֽו׃",
        es: "No ararás con buey y burro juntos.",
        source: "Devarim 22:10",
      },
      {
        label: "El contexto — la maldición de la serpiente, Bereshit (Génesis) 3:14",
        he: "וַיֹּ֩אמֶר֩ ה' אֱלֹהִ֥ים אֶל־הַנָּחָשׁ֮ כִּ֣י עָשִׂ֣יתָ זֹּאת֒ אָר֤וּר אַתָּה֙ מִכׇּל־הַבְּהֵמָ֔ה וּמִכֹּ֖ל חַיַּ֣ת הַשָּׂדֶ֑ה עַל־גְּחֹנְךָ֣ תֵלֵ֔ךְ וְעָפָ֥ר תֹּאכַ֖ל כׇּל־יְמֵ֥י חַיֶּֽיךָ׃",
        es: "Y dijo HaShem Dios a la serpiente: por cuanto hiciste esto, maldita eres entre todo el ganado y entre toda bestia del campo; sobre tu vientre andarás, y polvo comerás todos los días de tu vida.",
        source: "Bereshit 3:14",
      },
      {
        label: "El sirviente que se perdió — Talmud Bavlí, Sanedrín 59b",
        he: "חֲבָל עַל שַׁמָּשׁ גָּדוֹל שֶׁאָבַד מִן הָעוֹלָם, שֶׁאִלְמָלֵא לֹא נִתְקַלֵּל נָחָשׁ — כׇּל אֶחָד וְאֶחָד מִיִּשְׂרָאֵל הָיוּ מִזְדַּמְּנִין לוֹ שְׁנֵי נְחָשִׁים טוֹבִים, אֶחָד מְשַׁגְּרוֹ לַצָּפוֹן וְאֶחָד מְשַׁגְּרוֹ לַדָּרוֹם",
        es: "Lástima por un gran sirviente que se perdió del mundo: pues si la serpiente no hubiera sido maldecida, a cada uno de Israel le habrían tocado dos buenas serpientes — una para enviarla al norte y otra para enviarla al sur.",
        source: "Sanedrín 59b",
      },
      {
        label: "El cierre I — el rey sobre el burro, Zejariá 9:9",
        he: "גִּילִ֨י מְאֹ֜ד בַּת־צִיּ֗וֹן הָרִ֙יעִי֙ בַּ֣ת יְרוּשָׁלַ֔͏ִם הִנֵּ֤ה מַלְכֵּךְ֙ יָ֣בוֹא לָ֔ךְ צַדִּ֥יק וְנוֹשָׁ֖ע ה֑וּא עָנִי֙ וְרֹכֵ֣ב עַל־חֲמ֔וֹר וְעַל־עַ֖יִר בֶּן־אֲתֹנֽוֹת׃",
        es: "Alégrate mucho, hija de Tzión; da voces de júbilo, hija de Yerushaláim: he aquí tu rey vendrá a ti, justo y salvador es, humilde y montado sobre un burro, sobre un pollino hijo de asna.",
        source: "Zejariá 9:9",
      },
      {
        label: "El cierre II — el primogénito de su buey, Devarim 33:17",
        he: "בְּכ֨וֹר שׁוֹר֜וֹ הָדָ֣ר ל֗וֹ וְקַרְנֵ֤י רְאֵם֙ קַרְנָ֔יו בָּהֶ֗ם עַמִּ֛ים יְנַגַּ֥ח יַחְדָּ֖ו אַפְסֵי־אָ֑רֶץ",
        es: "Como primogénito de su buey es su majestad, y sus cuernos, cuernos de reem; con ellos acornea a los pueblos juntos, hasta los confines de la tierra.",
        source: "Devarim 33:17 (la bendición de Yosef)",
      },
    ],
    parrafos: [
      `En su superficie, el versículo-ancla es una ley agrícola de la parashá Ki Tetzé, dentro de la familia de leyes de kilayim, las mezclas prohibidas: no sembrar la viña con dos especies, no vestir lana con lino, no arar con buey y burro juntos. Una palabra del versículo va a cargar todo el peso de este estudio: יַחְדָּו, «juntos». La Torá no prohíbe al buey ni prohíbe al burro; prohíbe el yugo que los junta.`,
      `Y en el otro extremo de la Torá está la serpiente: נָחָשׁ, najash — nun, jet, shin. La criatura de la que el Talmud dice una frase asombrosa: «lástima por un gran sirviente que se perdió del mundo» (Sanedrín 59b). Si no hubiera sido maldecida, habría servido al hombre — dos serpientes buenas para cada uno de Israel, una hacia el norte y otra hacia el sur.`,
      `Entre la ley del yugo y la serpiente maldecida, este estudio recorre una revelación del Megalé Amukot (Rabí Natán Nata Shapira de Cracovia, 1585–1633), en su comentario a Vaetjanán, Ofán 71: los dos animales del versículo viven dentro de la palabra najash. Y los dos versículos del cierre —el rey humilde sobre el burro, el primogénito del buey— guardan el final de la historia.`,
    ],
  },

  // ── 2. מְפָרְשִׁים ───────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י), a Devarim 22:10 — el alcance de la ley.",
        texto: `Rashi fija primero el pshat en toda su anchura: הוּא הַדִּין לְכָל שְׁנֵי מִינִים שֶׁבָּעוֹלָם — «la misma ley rige para cualesquiera dos especies del mundo»; y añade: הוּא הַדִּין לְהַנְהִיגָם יַחַד קְשׁוּרִים זוּגִים בְּהוֹלָכַת שׁוּם מַשָּׂא — «y la misma ley rige para conducirlos juntos, atados en pareja, llevando cualquier carga». No hace falta que sea un arado: el yugo compartido ya es la mezcla prohibida.`,
      },
      {
        etiqueta: "Ibn Ezra, a Devarim 22:10 — la razón de la piedad.",
        texto: `Ibn Ezra conecta la ley con la siembra de mezclas que la precede, y da un motivo de compasión: וְהַשֵּׁם חָמַל עַל כָּל מַעֲשָׂיו, כִּי אֵין כֹּחַ הַחֲמוֹר כְּכֹחַ הַשּׁוֹר — «y HaShem tuvo piedad de todas Sus obras, porque la fuerza del burro no es como la fuerza del buey». Uncir juntos al fuerte y al débil es crueldad con el débil. Ya en el sentido llano, la ley protege de una mezcla que daña.`,
      },
      {
        etiqueta: "Zohar, Beshalaj (II 65a) — las dos fuerzas que no deben unirse.",
        texto: `El Zohar lee el mismo versículo en otra profundidad. Rabí Abba enseña: כַּד מִזְדַּוְּוגֵי כַּחֲדָא לָא יַכְלֵי בְּנֵי עָלְמָא לְמֵיקָם בְּהוּ — «cuando se unen como uno, los hijos del mundo no pueden sostenerse ante ellos»; y por eso está escrito «no ararás con buey y burro juntos» — יַחְדָּיו דַּיְיקָא, «“juntos”, con toda precisión». Y sigue: וְתָנֵינָן: לָא יָהִיב אִינִישׁ דּוּכְתָּא לְזִינִין בִּישִׁין — «y aprendimos: que el hombre no dé lugar a las especies malignas, pues con el acto del hombre abajo se despierta lo que no debía despertarse». El Zohar remata con el fruto de esa unión: de la fuerza de ambos sale el que se llama כֶּלֶב, «perro» — y de inmediato, וַיָּבֹא עֲמָלֵק, «y vino Amalek».`,
      },
      {
        etiqueta: "Zohar, Balak (III 207a) — de dónde salen el buey y el burro.",
        texto: `En Balak, el Zohar nombra el origen de las dos bestias: מִצַּד הַנָּחָשׁ יוֹצֵא שׁוֹר, מִצַּד הַקֶּסֶם יוֹצֵא חֲמוֹר — «del lado de la serpiente sale el buey; del lado del kesem (la hechicería) sale el burro» — «y eso es “buey y burro”». Y en el mismo pasaje deja plantado el final que recogeremos en el Sod: ese burro es el burro sobre el que dominará el Rey Mashíaj — עָנִי וְרֹכֵב עַל חֲמוֹר, «humilde y montado sobre un burro» (Zejariá 9:9), enlazado explícitamente con nuestro versículo de Ki Tetzé. Nótese con precisión qué dice y qué no dice el Zohar aquí: habla de dos fuerzas y de sus lados; el mapa de las letras que sigue no es suyo.`,
      },
      {
        etiqueta: "Megalé Amukot al Vaetjanán, Ofán 71 — el corazón del misterio.",
        texto: `Rabí Natán Nata Shapira de Cracovia escribe, sobre la nun alargada con que empieza ואתחנן: אֲבָל רָזָא דְּמִלָּה נִרְמַז בְּסוֹד נָחָשׁ... וּתְקוּעִים בְּנָחָ"שׁ תְּרֵין סִטְרִין: מִיָּמִין חֲמוֹר — ח' שֶׁל נָחָשׁ, מִשְּׂמֹאל שׁוֹר — ש' שֶׁל נָחָשׁ — «pero el secreto del asunto está aludido en el misterio del najash… y clavados en נח"ש hay dos lados: a la derecha el burro — la jet de najash; a la izquierda el buey — la shin de najash», citando él mismo el Zohar de Balak. El burro a la derecha es la klipá de Ishmael (el jésed caído); el buey a la izquierda es la klipá de Esav (la guevurá caída) — «rostro de buey desde la izquierda», como en la Merkavá de Yejezkel 1:10. Y la nun con que empieza la palabra no sobra: en el Ofán, la nun alargada es el secreto del najash mismo, el cuerpo de la serpiente que carga a los dos.`,
      },
      {
        etiqueta: "Megalé Amukot, el mismo Ofán 71 — antes y después del pecado.",
        texto: `Y entonces el Megalé Amukot revela — es un jidush suyo, leyendo Sanedrín 59b, no un midrash ni una halajá: וְאִילּוּ לֹא חָטָא, הָיוּ כָּל כֹּחוֹת הַטֻּמְאָה מְסַיְּעִין לָאָדָם וְהָיוּ מְשָׁרְתִים עוֹשֵׂי רְצוֹנוֹ... שֶׁהָיָה מֻתָּר לַחֲרֹשׁ בְּשׁוֹר וּבַחֲמוֹר יַחְדָּיו — «y si [Adam] no hubiera pecado, todas las fuerzas de impureza habrían asistido al hombre y habrían sido servidores que hacen su voluntad… de modo que habría estado permitido arar con buey y burro juntos». אֲבָל אַחַר שֶׁחָטָא אָדָם, צִוָּה הַקָּבָּ"ה שֶׁלֹּא לְעַרְבֵּב כֹּחוֹת הַטֻּמְאָה וּלְהוֹסִיף כֹּחַ שֶׁלָּהֶם, וְצִוָּה לֹא תַחֲרֹשׁ בְּשׁוֹר וּבַחֲמֹר יַחְדָּו — «pero después de que Adam pecó, ordenó el Santo, bendito es, no mezclar las fuerzas de impureza ni aumentar su fuerza, y ordenó: no ararás con buey y burro juntos». En el mismo Ofán trae la cuenta: שׁוֹר 506 más חֲמוֹר 254 suman 760 — el valor de צָרַעַת, tzaráat, la plaga.`,
      },
      {
        etiqueta: "Kav HaYashar 102:8–9 — el acrónimo y los dos Mashíaj.",
        texto: `Un siglo después, Rabí Tzvi Hirsch Kaidanover recoge y sella la tradición: וְנָחָשׁ הוּא רָאשֵׁי תֵּבוֹת נָחָשׁ, חֲמוֹר, שׁוֹר — «y נח"ש es acrónimo de najash, jamor, shor — que son las tres primeras klipot»; y repite la cuenta: שׁוֹר חֲמוֹר בְּגִימַטְרִיָּא צָרַעַת, buey y burro suman tzaráat. También advierte del fruto de la mezcla: עֲמָלֵק suma 240, igual que צֶפַע (víbora) e igual que אֵל אַחֵר (dios ajeno). Y da el desenlace en la kedushá: frente a las dos klipot hay dos Mashíaj — מָשִׁיחַ בֶּן דָּוִד יִתְגַּבֵּר עַל קְלִפַּת חֲמוֹר, «Mashíaj hijo de David se impondrá sobre la klipá del burro, en el secreto de “humilde y montado sobre el burro”», וּמָשִׁיחַ בֶּן יוֹסֵף אִקְרֵי שׁוֹר, «y Mashíaj hijo de Yosef es llamado buey: “como primogénito de su buey es su majestad”» (Devarim 33:17).`,
      },
      {
        etiqueta: "Nota de precisión — quién dice qué.",
        texto: `Vale ordenar las voces, porque en la exactitud está la enseñanza. El Zohar (Beshalaj, Balak) aporta las dos fuerzas: buey y burro como potencias del otro lado que no deben unirse, y sus lados de origen. La lectura de las LETRAS —la ח y la ש clavadas dentro de נחש, con la nun como cuerpo— es del Megalé Amukot, en su comentario a Vaetjanán, Ofán 71. El acrónimo נח"ש = najash-jamor-shor como tres klipot es de Kav HaYashar 102:9. Y «antes del pecado estaba permitido ararlos» es un jidush cabalístico del Megalé Amukot construido sobre Sanedrín 59b — no un midrash, no pshat, no halajá.`,
      },
    ],
    glosa: `Glosa para el lector: najash (נָחָשׁ) = serpiente. shor (שׁוֹר) = buey. jamor (חֲמוֹר) = burro. kilayim = las mezclas prohibidas por la Torá (semillas, telas, animales bajo un yugo). klipá (plural klipot) = «cáscara», fuerza de impureza que envuelve y oculta la luz. kesem = hechicería, adivinación. tzaráat (צָרַעַת) = la plaga de la piel de Vayikrá 13–14. Amalek = el enemigo arquetípico de Israel (Shemot 17:8). Mashíaj ben David / ben Yosef = las dos figuras mesiánicas de la tradición. Merkavá = la visión del Carro de Yejezkel 1. Ofán = «rueda»; así se llaman las 252 secciones del Megalé Amukot sobre Vaetjanán. Megalé Amukot = «el que revela profundidades» (Iyov 12:22), Rabí Natán Nata Shapira de Cracovia (1585–1633).`,
  },

  // ── 3. פרד״ס ─────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `En su capa más simple, Devarim 22:10 es una de las leyes de kilayim de la parashá Ki Tetzé: no arar con buey y burro juntos. Rashi enseña que rige para cualesquiera dos especies y también para conducirlas uncidas con cualquier carga; Ibn Ezra ve en ella la piedad de Dios por sus criaturas, porque la fuerza del burro no es como la fuerza del buey. Hay que decirlo con claridad: en el sentido llano y en la halajá, esta ley es un decreto de la Torá que no depende del pecado de Adam ni de ninguna historia previa. Rige siempre, rigió siempre, y su cumplimiento no necesita del secreto que sigue. Todo lo que viene después es otra capa — no una corrección de esta.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión), con la gematría",
        parrafos: [
          `La alusión está en las letras — y es del Megalé Amukot (al Vaetjanán, Ofán 71), no del Zohar. En נָחָשׁ, serpiente, están clavados los dos animales del versículo: la ח es la inicial de חֲמוֹר, el burro; la ש es la inicial de שׁוֹר, el buey; y la נ es el cuerpo de la serpiente que los carga — la nun alargada con que empieza ואתחנן. Kav HaYashar (102:9) lo dice como acrónimo: נח"ש = najash, jamor, shor, las tres primeras klipot.`,
          `Y la cuenta que trae el propio Ofán: שׁוֹר = 506, חֲמוֹר = 254; juntos, 760 = צָרַעַת, tzaráat, la plaga. La mezcla de los dos no produce una fuerza doble: produce una enfermedad. A esa cuenta el Megalé Amukot añade otra (también en Vayeshev 49): las letras interiores de שור y חמור — la ו del buey, la מו del burro — suman 52, el valor de כֶּלֶב, «perro»: el fruto que el Zohar de Beshalaj ve salir del par, y tras el cual «vino Amalek» (עֲמָלֵק = 240 = צֶפַע = אֵל אַחֵר, Kav HaYashar 102:8). Son las únicas cuentas de este estudio; no le añadimos ninguna.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `La enseñanza está en la palabra יַחְדָּו — «juntos», que el Zohar subraya: יַחְדָּיו דַּיְיקָא, «“juntos”, con toda precisión». Ninguna de las dos bestias está maldita por sí misma: el buey trabaja, el burro carga. Lo prohibido es el yugo que los mezcla. Y la formulación exacta de nuestras fuentes es doble: «no mezclar las fuerzas de impureza ni aumentar su fuerza» (Megalé Amukot), y «que el hombre no dé lugar a las especies malignas, pues con el acto del hombre abajo se despierta lo que no debía» (Zohar, Beshalaj).`,
          `Ahí está el drash para nosotros: hay fuerzas en la vida de un hombre que, cada una en su campo, sirven — y juntas engendran otra cosa. El Zohar le pone nombre al fruto de la mezcla: el «perro», y detrás de él Amalek. Nadie invita a Amalek directamente; se le da lugar. Se le da lugar juntando lo que debía quedar separado — y la suma de esa mezcla, dice la gematría del Ofán, no es más fuerza: es tzaráat, la plaga que obliga a salir del campamento.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto)",
        parrafos: [
          `El secreto empieza en Sanedrín 59b: «lástima por un gran sirviente que se perdió del mundo». Si la serpiente no hubiera sido maldecida, cada uno de Israel habría tenido dos buenas serpientes — una hacia el norte, otra hacia el sur. El Megalé Amukot lee ahí sus dos fuerzas: los dos najashim del Talmud son el buey y el burro clavados en el najash — el del norte, el shor de la izquierda; el del sur, el jamor de la derecha. A la derecha el burro, la klipá de Ishmael — el jésed caído; a la izquierda el buey, la klipá de Esav — la guevurá caída, «rostro de buey desde la izquierda» (Yejezkel 1:10).`,
          `Y entonces el Megalé Amukot revela el antes y el después: si Adam no hubiera pecado, todas las fuerzas de impureza habrían asistido al hombre — «habría estado permitido arar con buey y burro juntos». El yugo mismo las habría mantenido al servicio de la kedushá. Tras el pecado, el hombre ya no domina el yugo; por eso ordenó el Santo no mezclar las fuerzas de impureza ni aumentar su fuerza: la prohibición no es un castigo, es una protección — un cerco alrededor de una luz que por ahora no podemos sostener. (Al margen, y solo al margen: la cuenta antigua según la cual נָחָשׁ suma 358, lo mismo que מָשִׁיחַ, apunta en la misma dirección — lo caído y lo redentor comparten cifra; no es el eje de este estudio.)`,
          `Porque el final ya está escrito, y está escrito con los mismos dos animales. El Zohar de Balak dice que ese burro es «el burro sobre el que dominará el Rey Mashíaj»: עָנִי וְרֹכֵב עַל חֲמוֹר, «humilde y montado sobre un burro» (Zejariá 9:9). Y Kav HaYashar completa el cuadro: Mashíaj ben David se impondrá sobre la klipá del burro — la cabalga, no la destruye —, y Mashíaj ben Yosef es llamado buey: «como primogénito de su buey es su majestad» (Devarim 33:17). Las dos fuerzas que hoy no se pueden mezclar no serán aniquiladas: serán montadas. El yugo que hoy está prohibido, al final lo sostiene el Mashíaj.`,
        ],
      },
    ],
    caja: {
      titulo: "La prohibición es un cerco; el final es una montura.",
      cuerpo:
        "Dos fuerzas clavadas en la serpiente: a la derecha el burro (ח, la klipá de Ishmael), a la izquierda el buey (ש, la klipá de Esav) — Megalé Amukot al Vaetjanán, Ofán 71. Juntas suman 760: tzaráat, la plaga. Por eso la Torá manda no unirlas. Y el final: el Mashíaj llega humilde, montado sobre el burro (Zejariá 9:9) — dominando la fuerza, no destruyéndola.",
    },
  },

  // ── 4. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        texto: `Detente en la palabra «juntos». La Torá no te pide odiar al buey ni matar al burro. Te pide mirar el yugo: qué cosas de tu vida has atado bajo la misma correa. Cada fuerza tuya —el empuje, la terquedad, el deseo, la rabia que sabe defender— tiene un campo donde sirve. La pregunta no es cuál eliminar; es cuáles has mezclado.`,
      },
      {
        etiqueta: "¿Qué mezclas en tu vida alimentan lo que no debe crecer?",
        texto: `Hay uniones que no suman: multiplican otra cosa. El descanso mezclado con la pantalla que no descansa. La crítica justa mezclada con el placer de herir. El trabajo mezclado con la ansiedad de probar algo. Cada pieza por separado tiene su lugar; la mezcla engendra el «perro» — eso que ladra en ti y no es tuyo.`,
      },
      {
        etiqueta: "¿Dónde estás dando lugar?",
        texto: `El Zohar no dice que las especies malignas irrumpen: dice que el hombre les da lugar, y que con el acto de abajo se despierta lo de arriba. Nadie invita a Amalek por la puerta. Piensa en un solo hábito tuyo que sea, exactamente, un dar lugar — y míralo como lo que es.`,
      },
      {
        etiqueta: "¿Puedes ver la prohibición como cuidado?",
        texto: `Hay límites en tu vida que sientes como castigo. La enseñanza del Megalé Amukot invita a mirarlos de otro modo: hubo un estado en que todo podía mezclarse, y habrá otro; entre los dos, el límite no te quita — te guarda. Como el yugo que Ibn Ezra lee con piedad: no se unce al débil con el fuerte.`,
      },
      {
        texto: `Y una última: el final no es un campo vacío, sin buey y sin burro. Es un rey humilde montado sobre el burro. Lo que hoy separas no lo separas para siempre — lo separas hasta que haya en ti quien pueda cabalgarlo.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה ───────────────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Desunce hoy una sola mezcla.",
    texto: `Elige hoy una mezcla concreta de tu vida —una sola— y sepárala. No la elimines: sepárala. Si comes mirando la pantalla, hoy come sin pantalla. Si mezclas la conversación con la queja, hoy conversa sin quejarte una vez. Si trabajas con el teléfono al lado, hoy ponlo en otro cuarto una hora. La midá que se trabaja es הַבְדָּלָה, havdalá: el arte de distinguir, que es lo primero que hizo Dios con la luz (Bereshit 1:4) y lo que sella cada Shabat. No se trata de renunciar a ninguna de las dos cosas: se trata de quitarles el yugo común, para que cada fuerza vuelva a su campo y ninguna engendre lo que no debe nacer. Una separación pequeña, hecha a propósito, cierra más puertas que veinte propósitos grandes.`,
  },

  // ── 6. חֲתִימָה ───────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `«No ararás con buey y burro juntos» (Devarim 22:10) es, en su capa honda, un mapa de la serpiente: el Megalé Amukot (al Vaetjanán, Ofán 71) revela que en נָחָשׁ están clavadas dos fuerzas — a la derecha el burro (ח, la klipá de Ishmael), a la izquierda el buey (ש, la klipá de Esav) — y la nun es el cuerpo que las carga.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `La palabra decisiva es «juntos»: cuando esas dos fuerzas se unen, «el mundo no puede sostenerse ante ellas» (Zohar, Beshalaj II 65a), y de la mezcla sale el «perro» — y tras él Amalek. La cuenta del propio Ofán lo sella: buey 506 + burro 254 = 760 = tzaráat, la plaga. La mezcla no da más fuerza: da enfermedad.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El Megalé Amukot revela que antes del pecado habría estado permitido ararlos juntos: todas las fuerzas servían al hombre (leyendo Sanedrín 59b — «lástima por un gran sirviente que se perdió del mundo»). Tras el pecado, la orden de no mezclarlas ni aumentar su fuerza no es castigo sino cerco: la prohibición protege una luz que por ahora no podemos sostener.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Desuncir las mezclas: esa es la avodá. Separar hoy una sola unión que alimenta lo que no debe crecer — sabiendo que el final no es la destrucción de esas fuerzas, sino su montura: el rey humilde llega montado sobre el burro (Zejariá 9:9), y el buey es la majestad de Yosef (Devarim 33:17). Lo que hoy no se puede mezclar, al final lo cabalga el Mashíaj.`,
      },
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  hemshej: [
    "{{letter:nun|La nun: la letra que es el cuerpo de la serpiente — y la letra del alma que cae y se levanta}}",
    "{{study:serpiente-de-cobre|La serpiente que muerde y la serpiente que sana}}",
    "{{study:eikev-talon|El talón: el único blanco que le quedó a la serpiente}}",
    "{{study:enigma-mashiaj|El enigma del Mashíaj: quién es el rey que llega montado sobre el burro}}",
  ],
  ctaRef: "Deuteronomy 22:10",
};
