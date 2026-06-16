"use client";

import EstudioMisterio, { type EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO 0b — אִתְעֲרוּתָא דִּלְעֵילָא · El Mashíaj como Despertar desde Arriba
//  Capítulo 2 de la tríada de la Puerta — la ANTÍTESIS.
//  Serie "Del Enigma del Mashíaj al Ajarít HaYamim".
//
//  Hero CONCEPTUAL (sin gematría): el término central del capítulo —el despertar
//  desde lo Alto, it'aruta dile'eila— y la frase-gancho del concepto (Antítesis).
//  Fuente verificada por el Sofer:
//  Desktop/Contenido/Mashiaj-AjaritHaYamim/00b-despertar-de-lo-alto.md
//
//  Montado con el componente compartido EstudioMisterio (igual que el Cap 1 y los
//  12 módulos). El material "PARA REDES" y la "Nota del Sofer" del .md son
//  internos y NO se montan en el sitio. El voseo de Maasé está en neutro.
//
//  Idioma del análisis: español (trilingüe diferido; el chrome —nav/CTA— es es/fa).
// ════════════════════════════════════════════════════════════════════════════

const data: EstudioData = {
  slug: "despertar-de-lo-alto",
  hero: {
    serielabel:
      "Serie «Del Enigma del Mashíaj al Ajarít HaYamim» · Estudio 0b — La Puerta · Capítulo 2 (la Antítesis)",
    serielabelFa:
      "سری «از معمای ماشیح تا آخریتِ روزها» · مطالعهٔ ۰ب — دروازه · فصل ۲ (پادنهاد)",
    he: "אִתְעֲרוּתָא דִּלְעֵילָא",
    titulo: "El Despertar desde Arriba",
    tituloFa: "بیداری از بالا",
    ganchoEs:
      "Creías que la redención la subimos nosotros con nuestro esfuerzo. La otra mitad del enigma gira el espejo: el Mashíaj es, antes que nada, descenso — Dios baja primero, y la luz más alta no se gana: se recibe.",
    ganchoFa:
      "می‌پنداشتی رستگاری را ما با کوششِ خود بالا می‌بریم. نیمهٔ دیگرِ معما آینه را می‌چرخاند: ماشیح پیش از هر چیز فرود است — خدا نخست پایین می‌آید، و برترین نور به دست نمی‌آید: دریافت می‌شود.",
  },
  targum: {
    citas: [
      {
        label: "Versículo-ancla I — Shemot (Éxodo) 19:20 (el descenso en el Sinaí)",
        he: "וַיֵּ֧רֶד יְהֹוָ֛ה עַל־הַ֥ר סִינַ֖י אֶל־רֹ֣אשׁ הָהָ֑ר וַיִּקְרָ֨א יְהֹוָ֧ה לְמֹשֶׁ֛ה אֶל־רֹ֥אשׁ הָהָ֖ר וַיַּ֥עַל מֹשֶֽׁה׃",
        es: "Y descendió YHVH sobre el monte Sinaí, a la cumbre del monte; y llamó YHVH a Moshé a la cumbre del monte, y subió Moshé.",
        source: "Shemot (Éxodo) 19:20",
      },
      {
        label: "Versículo-ancla II — Yeshayá (Isaías) 60:22 (la redención «en su tiempo»)",
        he: "אֲנִ֥י יְהֹוָ֖ה בְּעִתָּ֥הּ אֲחִישֶֽׁנָּה׃",
        es: "Yo, YHVH, en su tiempo la apresuraré.",
        source: "Yeshayá (Isaías) 60:22",
      },
      {
        label: "Versículo-ancla III — Yejezkel (Ezequiel) 36:22 (no por ustedes)",
        he: "לֹ֧א לְמַעַנְכֶ֛ם אֲנִ֥י עֹשֶׂ֖ה בֵּ֣ית יִשְׂרָאֵ֑ל כִּ֤י אִם־לְשֵׁם־קׇדְשִׁי֙",
        es: "No por ustedes hago [esto], casa de Israel, sino por Mi santo Nombre.",
        source: "Yejezkel (Ezequiel) 36:22",
      },
    ],
    parrafos: [
      `Salimos del primer capítulo con una convicción hermosa y peligrosa: la redención la subimos nosotros. Reparamos el mundo, reunimos las chispas, encendemos la conciencia, y el Mashíaj asciende desde abajo como humo de un altar. Es verdad. Pero si fuera toda la verdad, habría un problema que el corazón religioso reconoce de inmediato: convertiría a Dios en el premio de nuestro esfuerzo, y a la redención en algo que se gana. Como si pudiéramos escalar hasta el Infinito con la sola fuerza de nuestras piernas.`,
      `La tradición judía guarda, junto al despertar de abajo, su contrapeso exacto: la אִתְעֲרוּתָא דִּלְעֵילָא (it'aruta dile'eila), el despertar desde arriba. Hay un orden de luz que no se gana — que desciende como don, porque Dios decide darse primero. El Mashíaj, leído desde aquí, no es lo que sube: es lo que baja. Y la lección de fondo es de una humildad radical: no podemos ascender a conocer a Dios si Él no desciende primero hacia nosotros. Este capítulo recorre ese descenso — y muestra que sin él, el despertar de abajo no tendría a dónde subir.`,
      `Lee Shemot 19:20 por el orden de los verbos, porque ahí está todo. Primero desciende YHVH (וַיֵּרֶד); después sube Moshé (וַיַּעַל). El acontecimiento que funda al pueblo de Israel —la entrega de la Torá— no empieza con un ascenso humano: empieza con un descenso divino. El hombre sube porque Dios bajó antes. El despertar de arriba es el primer verbo de la historia.`,
      `Yeshayá 60:22 da el mismo giro en clave de tiempo. El verso promete que el más pequeño se volverá clan y el menor, nación poderosa. ¿Por mérito de ellos? El cierre lo niega: «Yo, YHVH» —el sujeto es Dios— «en su tiempo la apresuraré». Hay un plazo de la redención que no depende de la cuenta de nuestras obras: llega בְּעִתָּהּ, «en su tiempo», porque Dios así lo fijó. {{study:enigma-mashiaj|La Tesis}} miraba el «si lo merecen»; la Antítesis mira el «en su tiempo» — la redención que igual viene.`,
      `Yejezkel 36:22 es quizá el versículo más desconcertante de toda la profecía de la redención. Dios anuncia que reunirá a Israel, lo purificará, le dará un «corazón nuevo y espíritu nuevo» (36:26) — y aclara, sin suavizarlo, que no lo hace por mérito de ellos, sino לְשֵׁם־קָדְשִׁי, «por Mi santo Nombre». La redención más íntima desciende como acto unilateral de Dios. No es un salario: es un don.`,
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Sobre vayéred YHVH (Shemot 19:20), Rashi precisa que el descenso no implica que la Presencia abandonara el cielo: «inclinó los cielos superiores e inferiores y los extendió sobre el monte» — un descenso que es condescendencia, el Infinito que se contrae para caber en un punto sin dejar de ser Infinito. La voz de Rashi nos guarda del error: «descender» no rebaja a Dios; es Su gracia haciéndose alcanzable. El despertar de arriba no es que Dios se vuelva pequeño, sino que se acerca.`,
      },
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן).",
        texto: `Ramban, en su comentario al Sinaí, subraya que toda la revelación es iniciativa divina: Israel, al pie del monte, no podía producir el encuentro; solo podía prepararse para recibirlo (los tres días de santificación, 19:10–15). La preparación humana es real, pero es respuesta, no causa. Para Ramban, el orden ontológico es claro: la luz divina precede; la avodá humana acoge. Es la voz que ancla la prioridad del descenso.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Sobrio como siempre, Ibn Ezra insiste en que el «descender» de Dios es lenguaje de la Torá kibyajol —«por así decirlo»—, acomodado a la mente humana: lo que la Escritura llama «descenso» es la revelación de una Presencia que en sí no se mueve ni cambia de lugar. Su voz nos recuerda la regla de oro de Jashmal: el Sod no anula el Pshat, pero tampoco lo materializa toscamente. El «despertar de arriba» no es un Dios que viaja: es una luz que se deja percibir donde antes no se percibía.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבְּנְאֵל).",
        texto: `Don Yitzjak Abarbanel —el gran intérprete mesiánico desde el dolor del exilio— lee Yejezkel 36 como la promesa que sostuvo a Israel cuando ningún mérito parecía quedar. Para él, «no por ustedes sino por Mi santo Nombre» no humilla al pueblo: lo libera. Si la redención dependiera del saldo de las obras, un pueblo quebrado por el destierro nunca la alcanzaría. Que dependa del Nombre de Dios —de Su fidelidad a Sí mismo— es lo que la hace segura. La voz de Abarbanel convierte el versículo más duro en el más consolador.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם).",
        texto: `Atento al lenguaje, Malbim distingue en los profetas dos registros de la redención: la que viene como fruto del retorno de Israel (teshuvá → gueulá) y la que viene como acto soberano de Dios que provoca el retorno («os daré un corazón nuevo», 36:26 — el corazón es regalo, no logro). Para Malbim, Yejezkel describe el segundo registro: Dios no espera a que Israel se purifique para redimirlo; lo purifica Él («y rociaré sobre ustedes aguas puras», 36:25) para que pueda volver. La iniciativa de la pureza es de arriba.`,
      },
      {
        etiqueta: "Maimónides (הָרַמְבַּ\"ם).",
        texto: `Aun la definición sobria del Rambam, que en el {{study:enigma-mashiaj|Capítulo 1}} fijó al Mashíaj como rey humano probado por obras, deja sitio al «en su tiempo». Rambam codifica (Hiljot Melajim 11:1) que el Mashíaj «habrá de levantarse» como hecho garantizado por la Torá misma — no como posibilidad que el mérito humano podría frustrar para siempre. Su prueba textual es Devarim 30:3–5: «YHVH hará volver tu cautiverio… y volverá y te reunirá… y te traerá» — donde el sujeto activo de cada verbo es Dios: וְשָׁב ה', וְקִבֶּצְךָ, וֶהֱבִיאֲךָ. El mérito apresura; pero la llegada está asegurada desde arriba, inscrita en la promesa divina.`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `Aquí desciende la raíz cósmica de toda la Antítesis, y es estructural, no poética. El sistema del Arizal (Etz Jaim, transmitido por Rabí Jaim Vital) describe la realidad como una הִשְׁתַּלְשְׁלוּת (histalshelut): una «concatenación» de mundos que desciende desde el אֵין סוֹף (Ein Sof, lo Infinito) hacia lo material, eslabón por eslabón —Atzilut, Beriá, Yetzirá, Asiyá—, cada nivel emanando del anterior. Nótese la dirección: toda la creación es, en su origen, un descenso de Dios hacia lo de abajo. Antes de que ninguna criatura pudiera «despertar», el Infinito ya había bajado para hacer posible la existencia. El tzimtzum mismo —la contracción que abre un espacio para el mundo— es el primer acto del drama, y es de arriba hacia abajo. En ese marco, el Arizal distingue dos clases de luz. Hay un or que asciende por la avodá humana (or pnimí, la luz «interior» que se gana mereciéndola, eslabón del despertar de abajo). Y hay un or makif —la luz envolvente— de un orden tan alto que ningún vaso puede contenerla por mérito propio: solo desciende como rodeo gratuito, como don que abraza desde fuera lo que no podía recibir desde dentro. El Mashíaj, en clave luriana, es el momento en que ese or makif —la luz que no se gana— por fin desciende y se vuelve asimilable: la redención como regalo de arriba que completa lo que el birur de abajo preparó pero no pudo alcanzar solo.`,
      },
    ],
    glosa: `Glosa para el lector: Histalshelut = «concatenación», el descenso escalonado de la luz divina del Infinito hasta el mundo material. Or makif = «luz envolvente», una iluminación demasiado alta para entrar en el vaso, que lo rodea desde fuera; lo contrario de or pnimí, la «luz interior» que sí se internaliza por mérito. Tzimtzum = contracción/retiro de la luz infinita para hacer espacio al mundo. Avodá = el servicio, el trabajo espiritual del hombre.`,
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, las fuentes dicen algo simple y sorprendente: en los momentos decisivos, Dios se mueve primero. Desciende sobre el Sinaí antes de que Moshé suba (Shemot 19:20). Promete reunir y traer con verbos en los que Él es el sujeto (Devarim 30:3–5; Yejezkel 36:24–28). Y declara que redime «no por ustedes, sino por Mi santo Nombre» (Yejezkel 36:22). El pshat de la Antítesis es la prioridad de la iniciativa divina: la redención no se fabrica desde abajo; se recibe desde arriba.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión)",
        parrafos: [
          `El lenguaje insinúa la dirección. La raíz י־ר־ד («descender») abre el encuentro del Sinaí (וַיֵּרֶד); la raíz נ־ת־ן («dar») gobierna la promesa del corazón nuevo (venatatí —«y daré», 36:26). Frente al verbo de la Tesis —ע־ל־ה, «subir» (וַיַּעַל מֹשֶׁה)—, la Antítesis habla en verbos de descenso y donación. Y un guiño del Sod: la palabra חֵן (jen, «gracia/favor inmerecido») = 58, y al revés es נֹחַ (Nóaj, «Noaj») = 58 — las mismas letras espejadas. De Nóaj se dice que «halló חֵן a los ojos de YHVH» (Bereshit 6:8): fue salvado por una gracia que descendió sobre él antes que por una cuenta de méritos. La gracia es el descenso leído al derecho; el alma que la recibe, el mismo punto leído al revés. (Verificado: חֵן = ח8+ן50 = 58; נֹחַ = נ50+ח8 = 58.)`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética), con la voz del Baal Shem Tov",
        parrafos: [
          `El Midrash entrega aquí su prueba más bella, y une el Sinaí con todo el tema. Sobre el descenso de YHVH (Shemot 19:20), enseñan Shemot Rabbá 12:3 y Midrash Tanjumá, Va'erá 15: «Cuando el Santo, bendito sea, creó el mundo, decretó: ‹Los cielos son cielos de YHVH, y la tierra la dio a los hijos del hombre› (Tehilim 115:16) — cada uno en su dominio, sin cruzar. Pero cuando quiso dar la Torá, anuló aquel primer decreto y dijo: ‹Que los de abajo suban a los de arriba y los de arriba bajen a los de abajo — y Yo soy el que empieza›, como está dicho: ‹Y descendió YHVH sobre el monte Sinaí›.»`,
          `Detente en tres palabras: וַאֲנִי הַמַּתְחִיל — «y Yo soy el que empieza». El midrash no deja lugar a dudas sobre quién da el primer paso. El decreto que separaba cielo y tierra lo rompe Dios, y Él mismo se ofrece como el primer movimiento: baja antes de pedir que subamos. El despertar de abajo (los de abajo suben) existe porque primero hubo un despertar de arriba (Dios desciende y «empieza»). Aquí, en germen, ya está {{study:tercer-templo|la Síntesis del tercer capítulo}}: los dos movimientos en un solo verso.`,
          `La voz del Baal Shem Tov integra esto en el corazón del jasid (como manda el método de Jashmal, en el Drash/Sod, no en sección aparte). El Besht enseñó que la verdadera avodá empieza con un despertar que el hombre no produce: un instante en que «se enciende el corazón» sin que sepamos de dónde vino — un toque de arriba, un hitorerut gratuito que precede a todo esfuerzo. El trabajo del jasid no es fabricar ese fuego, sino no apagarlo cuando desciende: recibirlo y devolverlo. La devekut (el apego a Dios) no se conquista por asalto; se acoge cuando lo Alto se asoma. Por eso el jasid reza también por lo que no puede merecer: porque sabe que las luces más altas no se ganan — se imploran y se reciben.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El Zóhar formula el principio con dos nombres. Hay אִתְעֲרוּתָא דִּלְתַתָּא (despertar de abajo) y אִתְעֲרוּתָא דִּלְעֵילָא (despertar de arriba). {{study:enigma-mashiaj|El Capítulo 1}} vivía del primero; este capítulo, del segundo. Pero el Sod más fino es que no están al mismo nivel: hay un despertar de arriba que es respuesta a nuestra avodá (la luz que provocamos), y hay un despertar de arriba que es anterior a toda avodá — la luz que desciende primero, para que el despertar de abajo siquiera sea posible. Lo dice con nitidez el Shem MiShmuel (Mishpatim 14:5): hay un orden donde «el despertar de abajo viene después del despertar de arriba» (אִתְעֲרוּתָא דִּלְתַתָּא אַחַר אִתְעֲרוּתָא דִּלְעֵילָא) — el orden se invierte: la luz baja, y solo entonces el alma puede subir.`,
          `El modelo cotidiano de esto es el Shabat. Los seis días de la semana son avodá: el hombre trabaja, refina, eleva — despertar de abajo. Pero el Shabat no se gana trabajando; llega cuando cae la tarde del sexto día, desciende sobre el mundo como un don que nadie produjo. La neshamá yeterá (el «alma adicional» del Shabat) es una luz que baja a quien simplemente la recibe. El Shabat es la it'aruta dile'eila hecha tiempo: una semana entera de subir, coronada por un día de dejar bajar.`,
          `Y el secreto último, en la voz de Rav Yehuda Ashlag (Baal HaSulam), que leyó toda la Cabalá como ciencia del deseo: la criatura es pura voluntad de recibir (ratzón lekabel), y por sí sola no puede dar — solo recibir. ¿Cómo, entonces, podría una criatura que solo recibe ascender hasta el Dador, que solo da? No puede. Por eso el primer movimiento tiene que ser de Él: el Dador desciende, se equipara a la criatura, le presta Su fuerza de dar. El Mashíaj, en esta luz, es el punto donde la voluntad de recibir de toda la creación recibe de arriba la capacidad de invertirse en voluntad de dar — algo que jamás habría podido generar sola.`,
        ],
      },
    ],
    caja: {
      titulo: "El Mashíaj no es solo lo que subimos. Es, primero, lo que Dios baja.",
      cuerpo:
        "No podemos ascender a conocer a Dios si Él no desciende primero hacia nosotros. Toda escalera mística tiene su primer peldaño puesto desde arriba — אֵין סוֹף = 207 = אוֹר («luz») = רָז («secreto»): el Infinito, la luz y el secreto comparten número, porque la luz que desciende ES el secreto del Infinito acercándose.",
    },
  },
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que mi imagen de la redención estaba inclinada hacia un solo lado. Creía que todo dependía de mi esfuerzo —y es verdad que mis obras importan—, pero la tradición me corrige con ternura: el primer movimiento no fue mío. Dios descendió sobre el Sinaí antes de que nadie subiera; promete redimir «no por ustedes, sino por Mi santo Nombre». Hay una luz que no se gana, y eso, lejos de quitarme valor, me libera del peso imposible de tener que merecerlo todo.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo que cada gran comienzo, en la Torá, baja antes de subir. La Torá desciende; el alma sube. El Shabat desciende; los seis días suben hacia él. La luz envolvente desciende; el vaso se rectifica para recibirla. Veo que la palabra clave del midrash no es «nosotros», sino וַאֲנִי הַמַּתְחִיל, «Yo soy el que empieza». Toda mi avodá es respuesta a un primer movimiento que no hice.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Si lo más profundo de mí es la Yejidá —el punto que nunca se separó de Dios— entonces ese punto no es algo que yo construya con mérito: es algo que ya fue puesto en mí desde arriba, un descenso de lo Alto que precede a toda mi historia. Mi tarea no es fabricar la luz, sino dejar de taparla. Cuando el corazón «se enciende» sin saber por qué, no estoy logrando nada: estoy recibiendo una it'aruta dile'eila.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Toda la creación es, en su raíz, un descenso: el Infinito contrayéndose (tzimtzum) y bajando eslabón por eslabón (histalshelut) hasta este mundo. El universo entero existe porque Dios bajó primero. La redención no inventa esa dirección: la completa, dejando que la luz que descendió en la creación vuelva a revelarse del todo.`,
      },
    ],
  },
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, haz un acto de pura recepción — recibe algo que no ganaste, y dale las gracias en voz alta.",
    texto: `Toda la semana corremos a merecer: a producir, a justificar, a ganarnos el lugar. La Antítesis pide lo contrario por un momento. Elige un don que ya tienes y no fabricaste —el aire que respiras, una persona que te ama sin que se lo hayas comprado, este día que amaneció sin tu permiso— y recíbelo conscientemente como lo que es: una it'aruta dile'eila, una luz que descendió sin que la pidieras. Di en tu interior, o en voz alta: «esto no lo gané; me fue dado desde arriba — gracias». Si puedes, hazlo al entrar el Shabat, que es la recepción hecha tiempo. No es pasividad: es la otra mitad de la avodá. Porque quien aprende a recibir la luz de arriba aprende también a no creerse el dueño de la redención. Empieza por recibir. Hoy.`,
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El Mashíaj no es solo lo que sube desde abajo (Capítulo 1): es, primero, lo que desciende desde arriba. אִתְעֲרוּתָא דִּלְעֵילָא — el despertar de arriba: Dios se mueve primero. Desciende sobre el Sinaí antes de que Moshé suba (Shemot 19:20); promete redimir «no por ustedes, sino por Mi santo Nombre» (Yejezkel 36:22); y trae la redención «en su tiempo» aunque el mérito no la apresure (Yeshayá 60:22). La iniciativa de la Gueulá es divina.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Hay luces que no se ganan. El or makif (la luz envolvente del Arizal), el Shabat que desciende sobre la semana, el «corazón nuevo» que Dios da (Yejezkel 36:26): son don, no salario. Eso no rebaja al hombre — lo libera del peso de tener que merecerlo todo, y hace segura la redención, porque descansa en la fidelidad de Dios a Su Nombre, no en el frágil saldo de nuestras obras.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `La humildad de fondo, en la voz de Baal HaSulam: la criatura es pura voluntad de recibir; jamás podría ascender al Dador por su cuenta. Por eso el primer peldaño de toda escalera mística está puesto desde arriba. No podemos ascender a conocer a Dios si Él no desciende primero hacia nosotros. El midrash lo sella en tres palabras: וַאֲנִי הַמַּתְחִיל — «Yo soy el que empieza» (Shemot Rabbá 12:3; Tanjumá Va'erá 15).`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Hacer hoy un acto de pura recepción —recibir conscientemente un don que no ganaste y agradecerlo— para entrenar el alma en la otra mitad de la avodá: dejar bajar la luz, en vez de creer que toda redención hay que subirla a pulso.`,
      },
    ],
  },
  hemshej: [
    "{{study:tercer-templo|Si una redención sube y la otra baja, el lugar donde las dos se tocan tiene un nombre: el Tercer Templo. El Primero y el Segundo los levantó el hombre y cayeron; el Tercero lo termina Dios desde lo Alto. ¿Cómo se funden los dos despertares? La Síntesis.}}",
    "{{study:enigma-mashiaj|Vuelve a la Tesis con ojos nuevos: ahora que sabes que Dios baja primero, ¿no cambia el sentido de “merecerlo”?}}",
    "{{study:zohar-redencion|El Zóhar dice que cuando Israel está en el exilio, Dios también lo está. Si Él desciende con nosotros, la redención no es solo nuestra: es Suya.}}",
    "{{study:finalidad-creacion|Si toda la creación es un descenso de Dios hacia lo de abajo, ¿no será que el mundo se hizo precisamente para que Él pudiera bajar a habitarlo? “Una morada en lo de abajo”.}}",
  ],
  ctaRef: "Exodus 19:20",
};

export default function Page() {
  return <EstudioMisterio data={data} />;
}
