
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO 1 — מַהוּ אַחֲרִית הַיָּמִים · ¿Qué es Ajarít HaYamim?
//  Bloque I (Historia y Profecía). Contenido del Sofer:
//  Desktop/Contenido/Mashiaj-AjaritHaYamim/study-01-ajarit-hayamim.md
//  Sin gematría destacada → el hero usa la frase-gancho (no se inventa número).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "ajarit-hayamim",
  hero: {
    serielabel: "Serie «Del Enigma del Mashíaj al Ajarít HaYamim» · Estudio 1 — Historia y Profecía",
    serielabelFa: "سری «از معمای ماشیح تا آخریتِ روزها» · مطالعهٔ ۱ — تاریخ و نبوت",
    he: "אַחֲרִית הַיָּמִים",
    titulo: "¿Qué es Ajarít HaYamim?",
    tituloFa: "آخریتِ روزها چیست؟",
    ganchoEs:
      "«Ajarít hayamim» no significa el final del mundo. Significa el mundo llegando a ser lo que siempre debió ser.",
    ganchoFa:
      "«آخریتِ روزها» پایانِ جهان نیست. یعنی جهانی که سرانجام همان می‌شود که همیشه باید می‌بود.",
  },
  targum: {
    citas: [
      {
        label: "Versículo-ancla I — Bereshit (Génesis) 49:1",
        he: "וַיִּקְרָ֥א יַעֲקֹ֖ב אֶל־בָּנָ֑יו וַיֹּ֗אמֶר הֵאָֽסְפוּ֙ וְאַגִּ֣ידָה לָכֶ֔ם אֵ֛ת אֲשֶׁר־יִקְרָ֥א אֶתְכֶ֖ם בְּאַחֲרִ֥ית הַיָּמִֽים׃",
        es: "Y llamó Yaakov a sus hijos y dijo: «Reúnanse, y os contaré lo que os acontecerá en el fin de los días (be'ajarít hayamim)».",
        source: "Bereshit (Génesis) 49:1",
      },
      {
        label: "Versículo-ancla II — Bamidbar (Números) 24:14",
        he: "וְעַתָּ֕ה הִנְנִ֥י הוֹלֵ֖ךְ לְעַמִּ֑י לְכָה֙ אִיעָ֣צְךָ֔ אֲשֶׁ֨ר יַעֲשֶׂ֜ה הָעָ֥ם הַזֶּ֛ה לְעַמְּךָ֖ בְּאַחֲרִ֥ית הַיָּמִֽים׃",
        es: "Y ahora, he aquí que voy hacia mi pueblo; ven, te aconsejaré lo que hará este pueblo a tu pueblo en el fin de los días (be'ajarít hayamim).",
        source: "Bamidbar (Números) 24:14",
      },
      {
        label: "Versículo-ancla III — Devarim (Deuteronomio) 4:30",
        he: "בַּצַּ֣ר לְךָ֔ וּמְצָא֕וּךָ כֹּ֖ל הַדְּבָרִ֣ים הָאֵ֑לֶּה בְּאַחֲרִית֙ הַיָּמִ֔ים וְשַׁבְתָּ֙ עַד־יְהֹוָ֣ה אֱלֹהֶ֔יךָ וְשָׁמַעְתָּ֖ בְּקֹלֽוֹ׃",
        es: "Cuando estés en angustia y te alcancen todas estas cosas, en el fin de los días (be'ajarít hayamim) volverás (ve'shavtá) hasta YHVH tu Dios y oirás Su voz.",
        source: "Devarim (Deuteronomio) 4:30",
      },
      {
        label: "Versículo-ancla IV — Yeshayá (Isaías) 2:2",
        he: "וְהָיָ֣ה בְּאַחֲרִ֣ית הַיָּמִ֗ים נָכ֨וֹן יִֽהְיֶ֜ה הַ֤ר בֵּית־יְהֹוָה֙ בְּרֹ֣אשׁ הֶהָרִ֔ים וְנִשָּׂ֖א מִגְּבָע֑וֹת וְנָהֲר֥וּ אֵלָ֖יו כׇּל־הַגּוֹיִֽם׃",
        es: "Y será en el fin de los días (be'ajarít hayamim): estará firme el monte de la casa de YHVH en la cima de los montes, y se elevará sobre las colinas, y afluirán hacia él todas las naciones.",
        source: "Yeshayá (Isaías) 2:2",
      },
    ],
    parrafos: [
      `Cuatro veces, cuatro escenas, una sola frase. Y nótese lo que pasa en cada una: en Bereshit, un padre reúne a sus hijos; en Bamidbar, Bilam mira lo que un pueblo hará a otro; en Devarim, el pueblo en angustia vuelve (la raíz shuv, teshuvá); en Yeshayá, las naciones afluyen hacia un solo monte. Reunión, historia entre los pueblos, retorno, convergencia. El "fin de los días" no se pinta nunca como una destrucción: se pinta como una convergencia — todo lo disperso afluyendo de regreso a un centro.`,
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Sobre be'ajarít hayamim en Bereshit 49:1, Rashi —siguiendo el Talmud (Pesajim 56a)— enseña que Yaakov quiso revelar haketz, el fin, y la Shejiná se le retiró. La frase queda así marcada desde su primera aparición con un sello de misterio deliberado: el "fin de los días" es real, pero su fecha está velada. Sobre Devarim 4:30, Rashi lee be'ajarít hayamim como el tiempo en que Israel, tras toda la angustia del exilio, retorna a Dios; la frase apunta para él, sin ambigüedad, a la era de la redención. Lección de Rashi: el "fin de los días" es el horizonte hacia el cual la historia de Israel está orientada, aunque su reloj exacto permanezca oculto.`,
      },
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן).",
        texto: `Ramban es quien fija el sentido técnico de la frase. Para él, en boca de los profetas, be'ajarít hayamim designa de modo casi terminológico los días del Mashíaj, la era mesiánica — no "un día cualquiera en el futuro", sino el tiempo último hacia el que todo se encamina. En Devarim 4:30 ve la promesa nuclear: por más larga que sea la dispersión, el retorno está garantizado; el exilio tiene fecha de caducidad inscrita en la Torá. El "fin de los días" es, en Ramban, una promesa estructural, no una mera posibilidad.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Sobrio y filológico como siempre, Ibn Ezra nos obliga a no correr. Acharit significa, llanamente, "lo postrero", "lo que viene después"; acharit hayamim es "el porvenir lejano" respecto de quien habla. No toda aparición de la frase es automáticamente mesiánica: en Bamidbar 24:14, por ejemplo, Bilam habla de un futuro histórico concreto entre Israel y Moav. Su voz nos recuerda la regla de oro de Jashmal: el Sod no anula el Pshat. La lectura mesiánica profunda se añade al sentido llano de "el porvenir"; no lo borra. Antes de decir "fin del mundo", hay que oír primero "los días que vienen".`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבְּנְאֵל).",
        texto: `Don Yitzjak Abarbanel —exiliado de Sefarad en 1492, que escribió tres obras enteras sobre la redención (Maayanei HaYeshuá, Yeshuot Meshijó, Mashmía Yeshuá)— es el gran cartógrafo clásico del fin de los días. Para él, las profecías del "fin de los días" describen un proceso ordenado: angustia, retorno, reunión de los exiliados, derrota de los enemigos, elevación del monte de Dios y afluencia de las naciones. Lee Yeshayá 2:2 como el cuadro de la consumación: no el planeta incendiándose, sino todos los pueblos subiendo voluntariamente a aprender de Sión. Su voz, hablando desde el dolor del destierro, encarna el corazón del módulo: el fin de los días es la respuesta del exilio, no el fin del mundo.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם).",
        texto: `Atento siempre a que en la Torá no hay sinónimos ociosos, Malbim distingue yamim (días, la mera secuencia) de acharit hayamim (el fin de los días). Acharit no es solo "lo último en el tiempo": es la finalidad, el telos — el punto hacia el cual los días corrían desde el principio. Por eso el verso de Yeshayá dice que el monte "estará firme" (najón, de la raíz de kén, lo establecido, lo verdadero): el fin de los días no es cuando el tiempo se rompe, sino cuando por fin se asienta en su verdad. El tiempo no se acaba: madura y se estabiliza.`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `Aquí desciende la dimensión cósmica que da a toda la serie su "física". Según el sistema del Arizal (Etz Jaim, transmitido por Rabí Jaim Vital), la realidad atravesó la Shevirat HaKelim, la ruptura de los vasos: los recipientes destinados a contener la luz divina se quebraron, y las chispas (nitzotzot) cayeron y se dispersaron en el tiempo y el espacio, atrapadas entre las cáscaras (kelipot). En este marco, los "días" mismos son recipientes: cada día de la historia contiene chispas que esperan ser elevadas. Acharit hayamim —el "fin de los días"— es el momento en que se completa el Birur HaNitzotzot, la recolección de todas las chispas dispersas a lo largo del tiempo. No es que los días se acaben: es que los días terminan su trabajo. El último día es el día en que ya no queda ninguna chispa fuera de lugar. Por eso el Arizal lee la redención no como un corte sino como una culminación: el tejido del tiempo, hilo por hilo, queda al fin completo. Y este es exactamente el porqué de la palabra hé'asfú, "reúnanse", con que la frase nace en Bereshit 49:1: el fin de los días es el gran acto de reunión de todo lo disperso.`,
      },
    ],
    glosa: `Glosa para el lector: be'ajarít hayamim (בְּאַחֲרִית הַיָּמִים) = "en el fin / lo postrero de los días". Teshuvá = retorno/arrepentimiento, de la raíz shuv, "volver". Nitzotzot = chispas de luz divina. Kelipot = "cáscaras", las envolturas que ocultan y aprisionan esa luz. Birur = el filtrado/selección por el que se separan y elevan las chispas atrapadas.`,
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `Antes de cualquier doctrina, conviene poner orden en cuatro palabras que el público mezcla constantemente. En su sentido llano, la tradición las distingue así: Gueulá (גְּאוּלָּה) es la redención como proceso —el arco entero de salida del exilio y retorno—; Yemot HaMashíaj (יְמוֹת הַמָּשִׁיחַ) son "los días del Mashíaj", una era histórica dentro de este mundo en que el Mashíaj reina e Israel vive en paz (Yeshayá 11:9; el Talmud, Berajot 34b, recuerda la opinión de Shmuel de que la diferencia con este mundo es solo "la sujeción a los reinos"); Tejiyat HaMetim (תְּחִיַּת הַמֵּתִים) es la resurrección de los muertos, un evento futuro cuya raíz bíblica asoma en Yejezkel 37 y Daniel 12:2; y Olam HaBa (עוֹלָם הַבָּא) es el Mundo Venidero, el estado último y eterno, no una era dentro de la historia sino lo que hay después de ella.`,
          `En el plano simple, entonces: la Gueulá es el camino, los Yemot HaMashíaj son la era a la que ese camino llega dentro de la historia, la Tejiyat HaMetim es el acontecimiento que reúne cuerpo y alma, y el Olam HaBa es el estado eterno que corona todo. Ajarít hayamim es el nombre-paraguas del horizonte donde todo esto ocurre.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión)",
        parrafos: [
          `Las cuatro apariciones de la frase forman, leídas juntas, un mapa oculto del proceso: Bereshit 49:1 —hé'asfú, "reúnanse"— el fin de los días empieza con un acto de reunión (la Gueulá como reunión de lo disperso); Bamidbar 24:14 —la historia entre los pueblos— el fin de los días tiene un escenario histórico y político entre naciones (los Yemot HaMashíaj como era dentro del mundo); Devarim 4:30 —ve'shavtá, "volverás"— el motor interior del fin de los días es la teshuvá, el retorno del corazón; Yeshayá 2:2 —ve'naharú, "afluirán"— el fin de los días culmina en convergencia universal, todas las naciones hacia un solo monte (el horizonte de Olam HaBa).`,
          `Reunión → historia → retorno → convergencia. La frase misma, en sus cuatro hogares, dibuja el arco de toda la serie. El "fin" no es un punto: es un plegado de todo el tiempo sobre su centro.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `Aquí entra, integrada, la voz del Baal Shem Tov. El Besht enseñó a leer cada palabra de la Torá como viva ahora, no solo en un futuro lejano. Si acharit hayamim significa "el fin de los días", el jasidut pregunta: ¿y cuál es el "fin", la finalidad, de tu día de hoy? Cada día tiene su propio acharit: el momento en que recoges lo que ese día dispersó, en que el balance del día se cierra y sus chispas suben. El "fin de los días" cósmico está hecho de millones de "fines de día" pequeños, bien cerrados. Por eso Devarim 4:30 ata la frase a la teshuvá: el retorno no es un evento único al final del calendario, es algo que se ejerce cada noche, cuando uno revisa su jornada y vuelve. El Mashíaj de la historia se construye con los retornos diarios de cada alma.`,
          `Y el Drash más fino: el verso de Yeshayá dice que el monte de Dios "estará firme/establecido" —najón—. La misma raíz da kavaná, la intención dirigida. El "fin de los días" es cuando toda la realidad queda dirigida, orientada, con kavaná, hacia su fuente. Hoy el mundo está disperso porque está sin dirección; el fin de los días es el mundo por fin apuntando en una sola dirección, como las naciones que afluyen al monte.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `Rav Yehuda Ashlag, el Baal HaSulam, leyó toda la Cabalá como una ciencia del deseo y del propósito. Para él, la palabra clave de este módulo no es "fin" sino תַּכְלִית (tajlit), finalidad. El universo no marcha hacia un término (un apagón), sino hacia un propósito (un cumplimiento). Acharit hayamim es el nombre del instante en que la creación alcanza la meta para la que fue hecha: que la voluntad de recibir se transforme en voluntad de dar, y la criatura se equipare a su Creador. En esa luz, los cuatro términos del Pshat se ordenan como grados de un solo ascenso: la Gueulá es el camino, los Yemot HaMashíaj son la era en que el camino se vuelve visible en la historia, la Tejiyat HaMetim es la reunión de cuerpo y alma (el "recibir" elevado hasta poder contener la luz sin romperse), y el Olam HaBa es el estado de adhesión (devekut) plena. Profecía y Cabalá no se contradicen: la profecía describe el fin desde afuera (qué pasará en la historia), y la Cabalá lo describe desde adentro (por qué, y qué se rectifica en cada grado). Son el mismo "fin de los días" mirado por dos ventanas — el dato y su raíz.`,
          `Y el secreto más íntimo, que tiende el hilo hacia el Estudio 0: el "fin de los días" es la revelación de la {{letter:yud|Yejidá}} en el tiempo. La Yejidá es el nivel del alma que nunca se separó de Dios; es el "punto fijo" que ya está, desde siempre, en el fin. Por eso el fin de los días no añade nada que no estuviera ya: revela lo que el principio contenía plegado. El acharit (el fin) es la manifestación del reshit (el principio). El mundo no corre hacia algo nuevo; corre hacia volverse, abiertamente, lo que en su raíz oculta siempre fue.`,
        ],
      },
    ],
    caja: {
      titulo: "Ajarít hayamim = la plenitud (no el cese) del tiempo.",
      cuerpo:
        "No el día en que los días se acaban, sino el día en que los días alcanzan aquello para lo que fueron creados — y revelan en lo abierto la Unidad que estaba en su raíz.",
    },
  },
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que me enseñaron a temer el "fin de los días" como quien teme el fin del mundo, cuando la Torá lo presenta como una maduración, no una demolición. Acharit es finalidad, no apagón. El mundo no va hacia su muerte: va hacia su sentido. Y cada uno de los cuatro nombres que confundía —Gueulá, Yemot HaMashíaj, Tejiyat HaMetim, Olam HaBa— no son rivales ni sinónimos, sino grados de un solo ascenso: camino, era, evento, estado.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo que las cuatro veces que la frase aparece dibujan el mismo arco: reunirse (Bereshit), atravesar la historia (Bamidbar), volver (Devarim), converger (Yeshayá). Es el patrón de mi propia vida en pequeño: me disperso, atravieso mis días, vuelvo, y de a poco todo en mí apunta a una sola dirección. El "fin de los días" del cosmos tiene la misma forma que el "fin del día" de mi alma cuando hago cuentas con honestidad y vuelvo.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Si el fin de los días es la revelación de lo que el principio ya contenía, entonces en mí también hay un punto —la Yejidá— que ya está "en el fin", ya unido a su fuente, esperando ser revelado. Mi tarea no es fabricar algo nuevo: es descubrir lo que ya soy en mi raíz. El retorno (teshuvá) de Devarim 4:30 no me lleva a un lugar extraño; me lleva a casa.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `La creación entera está orientada, como las naciones de Yeshayá que "afluyen" al monte. Hay una dirección en el tiempo. Nada de lo que pasa —ni los exilios, ni las angustias de Devarim 4:30— está fuera del arco; todo es parte del río que afluye. Vivir sabiéndolo cambia cómo leo las noticias del mundo y las de mi propia vida.`,
      },
    ],
  },
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Hoy, dale a tu día un acharit consciente.",
    texto: `Antes de dormir, dedica cinco minutos a cerrar el día como se cierra el fin de los días: con teshuvá (Devarim 4:30, ve'shavtá, "volverás"). Haz tres cosas, en orden: (1) reúne —repasa el día y nombra una chispa que recogiste y una que dejaste caer; (2) vuelve —elige una sola cosa que quieras corregir mañana y dirígela, dale kavaná, apúntala hacia su sentido; (3) converge —termina agradeciendo, dejando que todo el día afluya hacia un solo punto de gratitud, como las naciones hacia el monte. No esperes el fin de los días del calendario para ordenar tu tiempo. Empieza por darle a este día su finalidad. Esta noche.`,
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Acharit hayamim no es el fin del mundo sino la plenitud del tiempo: el día en que los días alcanzan su finalidad (tajlit) y el mundo se vuelve, en lo abierto, lo que en su raíz siempre fue. Acharit es telos, no apagón (Malbim).`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Cuatro términos que el público confunde son grados de un solo ascenso: Gueulá (el proceso/camino), Yemot HaMashíaj (la era dentro de la historia), Tejiyat HaMetim (el evento que reúne cuerpo y alma) y Olam HaBa (el estado eterno que lo corona).`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `Las cuatro apariciones bíblicas de la frase dibujan el arco de la redención —reunirse (Bereshit 49:1), historia (Bamidbar 24:14), volver (Devarim 4:30), converger (Yeshayá 2:2)—. Profecía y Cabalá no compiten: una describe el fin desde afuera, la otra desde adentro. Y el fin solo revela la Unidad que el principio contenía plegado.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Darle a cada día un cierre consciente —reunir las chispas del día, volver (teshuvá) en un punto concreto, y converger en gratitud— porque el fin de los días del cosmos está hecho de millones de "fines de día" bien cerrados.`,
      },
    ],
  },
  hemshej: [
    "{{study:enigma-mashiaj|Si el fin de los días es la revelación de la Unidad del principio, ¿qué es exactamente esa Unidad que llamamos Mashíaj? Vuelve al enigma que abrió la serie.}}",
    "{{study:exilio-redencion|El “fin de los días” empieza con un retorno del corazón (Devarim 4:30). ¿Cómo describen los profetas ese exilio y ese regreso? El “corazón nuevo” de Yejezkel.}}",
    "{{study:olam-haba|Si Gueulá, Yemot HaMashíaj y Tejiyat HaMetim son grados de un ascenso, ¿qué es el estado final que los corona? El Mundo Venidero y la consumación.}}",
  ],
  ctaRef: "Isaiah 2:2",
};

