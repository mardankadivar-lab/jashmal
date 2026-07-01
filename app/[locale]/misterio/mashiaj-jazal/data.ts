
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO 4 — הַמָּשִׁיחַ בְּדִבְרֵי חֲזַ״ל · El Mashíaj en la Literatura Rabínica
//  Bloque I (Historia y Profecía). Contenido del Sofer:
//  Desktop/Contenido/Mashiaj-AjaritHaYamim/study-04-mashiaj-jazal.md
//  Hero: מְנַחֵם (Menajem) = צֶמַח (Tzémaj) = 138.
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "mashiaj-jazal",
  hero: {
    serielabel: "Serie «Del Enigma del Mashíaj al Ajarít HaYamim» · Estudio 4 — Historia y Profecía",
    serielabelFa: "سری «از معمای ماشیح تا آخریتِ روزها» · مطالعهٔ ۴ — تاریخ و نبوت",
    he: "הַמָּשִׁיחַ בְּדִבְרֵי חֲזַ״ל",
    titulo: "El Mashíaj en la Literatura Rabínica",
    tituloFa: "ماشیح در ادبیاتِ ربانی",
    ganchoEs:
      "El Talmud no se pone de acuerdo en el nombre del Mashíaj: ¿Shiló? ¿Yinón? ¿Janiná? ¿Menajem? Y tiene razón en todos. El Mashíaj tiene tantos nombres como almas tiene Israel.",
    ganchoFa:
      "تلمود بر نامِ ماشیح اتفاق ندارد: شیلو؟ یینون؟ حنینا؟ مناحم؟ و در همه حق دارد. ماشیح به‌اندازهٔ جان‌های اسرائیل نام دارد.",
    par: {
      a: { he: "מְנַחֵם", rom: "Menajem · el Consolador", color: "gold" },
      b: { he: "צֶמַח", rom: "Tzémaj · el Retoño", color: "gold" },
      valor: "138",
    },
  },
  targum: {
    citas: [
      {
        label: "Pasaje-ancla I — Talmud Bavlí, Sanedrín 97a (las edades del mundo)",
        he: "שֵׁשֶׁת אֲלָפִים שָׁנָה הָוֵי עָלְמָא, שְׁנֵי אֲלָפִים תֹּהוּ, שְׁנֵי אֲלָפִים תּוֹרָה, שְׁנֵי אֲלָפִים יְמוֹת הַמָּשִׁיחַ׃",
        es: "Seis mil años dura el mundo: dos mil de caos (tohú), dos mil de Torá, y dos mil son los días del Mashíaj.",
        source: "Talmud Bavlí, Sanedrín 97a",
      },
      {
        label: "Pasaje-ancla II — Sanedrín 98a (el enigma del modo de venir)",
        he: "זָכוּ — עִם עֲנָנֵי שְׁמַיָּא, לֹא זָכוּ — עָנִי וְרֹכֵב עַל חֲמוֹר׃",
        es: "Si lo merecen — [vendrá] «con las nubes del cielo» (Daniel 7:13); si no lo merecen — [vendrá] «pobre y montado sobre un asno» (Zejaryá 9:9).",
        source: "Sanedrín 98a",
      },
      {
        label: "Pasaje-ancla III — Sanedrín 98a (el enigma del tiempo de venir)",
        he: "זָכוּ — אֲחִישֶׁנָּה, לֹא זָכוּ — בְּעִתָּהּ׃",
        es: "Si lo merecen — «lo apresuraré» (ajishéna); si no lo merecen — «en su tiempo» (be'itá).",
        source: "Sanedrín 98a (sobre Yeshayá 60:22)",
      },
      {
        label: "Pasaje-ancla IV — Sanedrín 98b (los nombres del Mashíaj)",
        he: "מָה שְׁמוֹ? דְּבֵי רַבִּי שֵׁילָא אָמְרִי: שִׁילֹה שְׁמוֹ … דְּבֵי רַבִּי יַנַּאי אָמְרִי: יִנּוֹן שְׁמוֹ … דְּבֵי רַבִּי חֲנִינָה אָמְרִי: חֲנִינָה שְׁמוֹ … וְיֵשׁ אוֹמְרִים: מְנַחֵם בֶּן חִזְקִיָּה שְׁמוֹ׃",
        es: "¿Cuál es su nombre? La escuela de Rabí Shila dice: Shiló es su nombre… la escuela de Rabí Yanai dice: Yinón es su nombre… la escuela de Rabí Janiná dice: Janiná es su nombre… y algunos dicen: Menajem ben Jizkiyá es su nombre.",
        source: "Sanedrín 98b",
      },
    ],
    parrafos: [
      `El Estudio 0 abrió la serie con la primera promesa mesiánica de la Torá — Shiló, a quien "se congregarán los pueblos" (Bereshit 49:10). Pero la Torá apenas insinúa. Es la literatura rabínica — Mishná, Talmud y Midrash, lo que llamamos divrei JaZa"L (palabras de "nuestros Sabios, su memoria sea bendición") — la que toma esa insinuación y la despliega: ¿cuándo vendrá?, ¿cómo?, ¿bajo qué señales?, ¿con qué nombre? Y lo notable es que los Sabios no entregan una sola respuesta: entregan un abanico de respuestas que parecen contradecirse. Este estudio sostiene que esa "contradicción" no es un defecto del texto, sino el método: el Mashíaj se enseña con dos filos (שְׁנֵי פִּיּוֹת), porque tiene muchas caras y una sola raíz.`,
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Rashi, el gran comentarista del Talmud, glosa el debate de los nombres en Sanedrín 98b sin alarma: cada escuela, observa, derivó el nombre del Mashíaj de su propio maestro, leyendo un versículo bíblico que contenía ya ese nombre escondido. Shiló viene de Bereshit 49:10; Yinón de Tehilim 72:17 ("לִפְנֵי שֶׁמֶשׁ יִנּוֹן שְׁמוֹ", "ante el sol perdurará/retoñará su nombre"); Janiná de Yirmiyá 16:13 ("לֹא אֶתֵּן לָכֶם חֲנִינָה"); Menajem de Eijá 1:16 ("כִּי רָחַק מִמֶּנִּי מְנַחֵם", "porque se alejó de mí el Consolador"). Lección de Rashi: los nombres no compiten; cada uno es una lente que extrae un rasgo distinto del único Redentor. Sobre el modo de venir (98a), Rashi precisa que "con las nubes" describe una redención gloriosa y repentina, y "sobre un asno" una redención humilde y trabajosa — y que ambas son verdaderas según el mérito de la generación.`,
      },
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן).",
        texto: `Ramban, que dedicó su célebre Sefer HaGueulá (Libro de la Redención) y su disputa de Barcelona (1263) a defender la fe mesiánica de Israel, insiste en una distinción que el público suele borrar: hay un Mashíaj-persona real, descendiente de David, rey histórico, y hay un proceso de redención que lo rodea. El error, dice, es colapsar ambos. Para Ramban, los plazos de Sanedrín 97a (las edades del mundo) no son un cronómetro literal que podamos usar para calcular fechas — los Sabios mismos maldicen a los que "calculan los fines" (mejashvei kitzín, Sanedrín 97b) — sino una afirmación de que la historia tiene estructura y dirección: corre hacia un punto, no en círculos.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Sobrio como siempre, Ibn Ezra recuerda que muchos versículos que la tradición lee como mesiánicos tienen primero un referente histórico cercano (un rey de Yehudá, un retorno del exilio babilónico). Su voz preserva la regla de oro de Jashmal: el Sod no anula el Pshat. Cuando los Sabios encuentran el nombre del Mashíaj en Tehilim 72 o en Yirmiyá, no borran el sentido llano de esos textos; añaden una capa. El Mashíaj de JaZa"L se construye sobre el suelo firme del texto bíblico, no en su lugar.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבְּנְאֵל).",
        texto: `Don Yitzjak Abarbanel — el estadista exiliado de Sefarad en 1492 — escribió tres obras enteras sobre la redención (Maayanei HaYeshuá, Yeshuot Meshijó, Mashmía Yeshuá), y es en ellas donde el tema de los dos Mashíaj recibe su tratamiento clásico. Abarbanel sistematiza la doctrina talmúdica: Mashíaj ben Yosef (descendiente de Yosef/Efraim) es el precursor guerrero que reúne a Israel y cae en la batalla escatológica; Mashíaj ben David es el rey definitivo que consuma la redención y reina en paz. Hablando desde el dolor del destierro, Abarbanel encarna el tema de toda la serie: el Mashíaj es la respuesta del exilio, y los dos Mashíaj son las dos manos de esa única respuesta — una que recoge en el sufrimiento, otra que corona en la gloria.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם).",
        texto: `Atento a la precisión del lenguaje, Malbim subraya que el Talmud, al ofrecer zajú… lo zajú ("si lo merecen… si no lo merecen"), no está indeciso: está enseñando que la redención tiene dos velocidades posibles, y que la diferencia la pone la conducta humana. "En su tiempo" (be'itá) es el plazo garantizado, el piso que Dios no dejará caer; "lo apresuraré" (ajishéna) es el techo que el mérito de Israel puede alcanzar. No hay contradicción en Yeshayá 60:22: hay una promesa con una cláusula.`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `Aquí desciende la dimensión cósmica, y resuelve el enigma de los dos Mashíaj. Según el sistema del Arizal (Etz Jaim; Shaar HaPesukim; Shaar HaGilgulim), tras la Shevirat HaKelim —la ruptura de los vasos— las chispas de luz divina (nitzotzot) cayeron y se dispersaron entre las cáscaras (kelipot), y la historia entera es Birur HaNitzotzot, la recolección de esas chispas. En ese marco, Mashíaj ben Yosef es el rostro del birur: Yosef es el tzadik yesod olam, el justo que desciende a Egipto (a la kelipá) para reunir y elevar las chispas atrapadas allí; su tarea es recoger, y por eso su camino pasa por el sufrimiento e incluso la muerte. Mashíaj ben David es el rostro del tikún revelado: una vez recogidas las chispas, él manifiesta la luz reunida y la corona. Por eso son dos y deben unirse: ben Yosef es Yesod (el canal que junta), ben David es Maljut (el reino que revela). La caída de ben Yosef no es una derrota — es la última inmersión del recolector en la oscuridad antes de que la luz se manifieste. El Arizal enseña además que el Mashíaj porta una raíz especialmente elevada del alma, conectada a la Yejidá, el nivel más unitario; y que su llegada depende de que se complete el birur de las chispas a lo largo de las generaciones (tema que el Estudio 10 desarrollará).`,
      },
    ],
    glosa: `Glosa para el lector: JaZa"L (חֲזַ"ל) = acrónimo de Jajaméinu Zijronam Livrajá, "nuestros Sabios, su memoria sea bendición" — el conjunto de los maestros de la Mishná y el Talmud (siglos I–VI). Daf = "folio" del Talmud; cada folio tiene dos caras, amud a (anverso) y amud b (reverso). Por eso citamos "Sanedrín 98a" y "98b". Mashíaj ben Yosef / ben David = dos figuras mesiánicas; el primero precede y prepara (y según el Talmud muere en la guerra final), el segundo consuma. Yesod y Maljut = dos sefirot: Yesod es el fundamento que canaliza y une; Maljut es el reino que recibe y revela.`,
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `Los Sabios del Talmud, en el tratado Sanedrín (folios 97a–99a), reúnen las tradiciones sobre el Mashíaj. Discuten cuándo vendrá: la escuela de Eliyahu enseña que el mundo dura seis mil años, y los últimos dos mil son "los días del Mashíaj" (97a); pero también advierten que nadie debe calcular la fecha. Discuten bajo qué señales vendrá: una generación que se empobrece, donde la sabiduría disminuye y "todo el reino se vuelve herejía" (97a). Discuten cómo vendrá: "con las nubes del cielo" o "pobre sobre un asno", según el mérito (98a). Y discuten cómo se llama: Shiló, Yinón, Janiná, Menajem ben Jizkiyá (98b). En el plano simple: un cuerpo de maestros que, a lo largo de siglos, conserva y debate todo lo que la tradición sabe sobre el Redentor — sin imponer una versión única.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión)",
        parrafos: [
          `Fíjate en la estructura de Sanedrín 97a: dos mil de caos, dos mil de Torá, dos mil de Mashíaj. No es solo una línea de tiempo: es un mapa del alma y de la historia. Primero el tohú —el desorden, la materia sin forma—; luego la Torá —la entrada de la ley y el sentido—; finalmente el Mashíaj —la plenitud, donde la ley se vuelve vida y la forma se vuelve luz. Cada persona recorre ese mismo arco. Y la alusión más fina está en los dos pares de Sanedrín 98a: el Mashíaj puede venir rápido o a su tiempo, glorioso o humilde — porque el Mashíaj no es un evento fijo que nos espera, sino un espejo que devuelve la forma de nuestra propia preparación. La redención tiene la cara que le demos.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `La pieza central del Drash es el debate de los nombres (Sanedrín 98b), y su clave la da una fuente aún más antigua: Pirkei deRabí Eliezer, capítulo 3, que enseña que siete cosas fueron creadas antes que el mundo, y entre ellas —"וּשְׁמוֹ שֶׁל מָשִׁיחַ"— "el nombre del Mashíaj" (junto a la Torá, el Trono de Gloria, el Edén, el Guehinóm, el Templo y la teshuvá). El nombre del Mashíaj es anterior a la creación: no es una etiqueta que le pondremos al final, es el plano del propósito que estaba antes del primer día. Por eso los Sabios no logran fijarlo en una sola palabra — porque un nombre pre-mundano contiene todas las redenciones posibles.`,
          `Y aquí se ilumina una gematría verificada que el Estudio 0 ya nos confió y que ahora florece: מְנַחֵם (Menajem, "el Consolador") = 138 = צֶמַח (Tzémaj, "el Retoño") (verificado letra por letra: מ40+נ50+ח8+ם40 = צ90+מ40+ח8 = 138). El nombre que da el Talmud —Menajem, el que consuela— pesa exactamente lo mismo que el nombre que dan los profetas —Tzémaj, el que retoña (Yirmiyá 23:5; Zejaryá 6:12). El consuelo del exilio y el brote nuevo desde la raíz cortada son el mismo número, la misma realidad: consolar es hacer retoñar. El Mashíaj no consuela con palabras; consuela haciendo crecer algo nuevo donde se había talado.`,
          `Aquí entra, integrada en el Drash, la voz del Baal Shem Tov, fundador del jasidut. El Besht enseñó que el Mashíaj no es únicamente una persona al final de la línea del tiempo, sino una chispa que pulsa en cada alma, en cada generación. Por eso los nombres son tantos: cada alma de Israel toca al Mashíaj por un ángulo distinto, y lo nombra desde su propia herida y su propia esperanza. Si tu dolor es el exilio, lo llamas Menajem (Consolador). Si tu fe mira al futuro que crece, lo llamas Tzémaj (Retoño) o Yinón (el que perdura). Si esperas la gracia, lo llamas Janiná. El Mashíaj tiene tantos nombres como almas tiene Israel — y el tuyo también está en la lista.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `Rav Yehuda Ashlag, el Baal HaSulam, leyó toda la Cabalá como una ciencia de la transformación del deseo: del "recibir para sí" al "recibir para dar". A esa luz, los dos Mashíaj dejan de ser dos personajes y se revelan como dos fases de una sola corrección. Mashíaj ben Yosef es la fase del trabajo: bajar a la materia, al "recibir para sí" más denso, y empezar a invertirlo — labor dura, costosa, que "muere" en el sentido de que el ego que recoge debe entregarse del todo. Mashíaj ben David es la fase de la revelación: cuando el deseo ya está rectificado, la luz se manifiesta sin obstáculo y "reina". Por eso ben Yosef precede a ben David: primero se trabaja la vasija (el birur), luego se revela la luz (el tikún). Y el debate zajú/lo zajú recibe aquí su sentido más profundo: el mérito que apresura no es premio, es preparación — cuanto más una generación transforma su recibir en dar, menos "muerte" hace falta, y más se acerca la cara gloriosa "con las nubes del cielo".`,
          `El secreto último es que los muchos nombres del Mashíaj apuntan, todos, a un solo punto: la {{letter:yud|Yejidá}}, el nivel más profundo y unitario del alma, "el punto que nunca se separó de Dios". El nombre pre-mundano del Mashíaj (Pirkei deRabí Eliezer 3) es el nombre de esa unidad. Shiló, Yinón, Janiná, Menajem, Tzémaj, ben Yosef, ben David — son los muchos rostros de la Yejidá entrando en la historia. La multiplicidad de nombres no fragmenta al Mashíaj: revela que la Unidad es tan rica que ningún nombre solo la agota.`,
        ],
      },
    ],
    caja: {
      titulo: "Mashíaj ben Yosef + Mashíaj ben David = una sola obra en dos tiempos.",
      cuerpo:
        "Uno recoge en el sufrimiento (el birur); el otro corona en la luz (el tikún revelado). Y los muchos nombres son un solo punto —la Yejidá— mirado desde muchas almas.",
    },
  },
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que el Mashíaj no tiene un nombre porque no le cabe en uno solo. Los Sabios, que sabían discutir hasta el último detalle de una ley, dejaron deliberadamente abierto el nombre del Redentor — Shiló, Yinón, Janiná, Menajem — y eso no es indecisión: es exactitud. Una sola palabra habría sido demasiado pequeña para algo que fue creado antes del mundo.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo dos filos por todas partes. Dos Mashíaj (ben Yosef y ben David). Dos modos de venir (con las nubes / sobre un asno). Dos tiempos (apresurado / en su tiempo). Y veo que el segundo filo —el humilde, el lento, el que sufre— no es el castigo, es el camino normal del trabajo. La gloria repentina es un regalo; la labor humilde es la vía. Casi siempre el birur se hace montado en un asno, no envuelto en nubes.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Si el Mashíaj tiene tantos nombres como almas tiene Israel, entonces hay un nombre del Mashíaj que es el mío — el ángulo desde el cual yo lo necesito y lo espero. ¿Lo busco como Consolador de una herida (Menajem)? ¿Como Retoño de algo que en mí fue talado (Tzémaj)? ¿Como la Gracia que no merezco (Janiná)? Nombrarlo desde mi verdad es ya empezar a recibirlo.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Si "el nombre del Mashíaj" fue creado antes que el mundo (Pirkei deRabí Eliezer 3), entonces el mundo fue hecho con la redención ya nombrada. La meta no se inventó al final: estaba escrita en el plano antes del primer día. La historia no busca a tientas un final que no conoce — corre hacia un nombre que la precede.`,
      },
    ],
  },
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Hoy, elige tu nombre del Mashíaj — y trabaja como ben Yosef.",
    texto: `Primero, en silencio, pregúntate desde qué herida o qué esperanza esperas tú la redención, y ponle el nombre que el Talmud te ofrece: Menajem si necesitas consuelo, Tzémaj si esperas que algo vuelva a crecer, Janiná si necesitas gracia. Dilo en tu interior: "así lo espero yo". Segundo, y más importante: hoy haz una sola labor de ben Yosef — una tarea humilde, callada, sin gloria, de recoger una chispa que esté caída: ordena algo que dejaste en el caos, termina un trabajo ingrato que vienes evitando, reconcilia en silencio sin pedir reconocimiento. No esperes las nubes del cielo. La mayor parte de la redención se hace sobre un asno — paso a paso, sin que nadie aplauda. Haz hoy un solo paso de ese asno.`,
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `La literatura rabínica no entrega un Mashíaj cerrado, sino un Mashíaj de dos filos: dos figuras (ben Yosef que recoge en el sufrimiento, ben David que corona en la luz), dos modos de venir, dos tiempos posibles, y muchos nombres — todos rostros de una sola Unidad que reúne lo partido.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Sanedrín 98a resuelve las "contradicciones" con una clave única: zajú / lo zajú — la redención tiene la cara y la velocidad que le da la conducta humana. "Con las nubes" o "sobre un asno"; "lo apresuraré" o "en su tiempo". El Mashíaj es un espejo de nuestra preparación.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `מְנַחֵם (Menajem) = 138 = צֶמַח (Tzémaj): el nombre talmúdico del Mashíaj (el Consolador) pesa lo mismo que el nombre profético (el Retoño). Consolar es hacer retoñar; el consuelo del exilio es que algo nuevo crece desde la raíz cortada. Y el "nombre del Mashíaj" fue creado antes del mundo (Pirkei deRabí Eliezer 3): la meta estaba nombrada en el plano antes del primer día.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Nombrar hoy, desde la propia verdad, cómo espero yo la redención — y hacer una labor humilde de ben Yosef: recoger una chispa caída sin esperar gloria, sabiendo que la redención casi siempre avanza "sobre un asno".`,
      },
    ],
  },
  hemshej: [
    "{{study:enigma-mashiaj|Si el Mashíaj reúne, vuelve al principio: ¿qué es realmente el Mashíaj? Persona, fuerza, proceso, conciencia y meta — cinco rostros de un punto.}}",
    "{{study:daniel-apocaliptica|Si los Sabios discuten las señales del fin, ¿quién las soñó primero? Daniel y las cuatro bestias: el fin de los imperios y la primera promesa de la resurrección.}}",
    "{{study:gog-umagog|¿En qué guerra cae Mashíaj ben Yosef? Gog uMagog y el último filtrado del mal antes de la Unidad.}}",
    "{{study:shaar-hagilgulim|Si la venida del Mashíaj depende de completar el birur de las almas, ¿cómo se completa? La rectificación de las almas a través de las generaciones.}}",
  ],
  ctaRef: "Sanhedrin 98a",
};

