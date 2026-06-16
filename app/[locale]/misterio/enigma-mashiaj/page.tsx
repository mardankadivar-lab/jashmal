"use client";

import EstudioMisterio, { type EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO 0 — חִידַת הַמָּשִׁיחַ · El Enigma del Mashíaj (LA PUERTA de la serie)
//  CAPÍTULO 1 de la tríada de la Puerta — la TESIS (el despertar desde abajo).
//  Serie "Del Enigma del Mashíaj al Ajarít HaYamim".
//
//  Versión REESCRITA (reenfocada): el corazón es CONCEPTUAL, no la gematría.
//  El gancho son las tres dimensiones —Persona · Conciencia colectiva · Estado
//  de conciencia—. El 358/serpiente ya NO es el hero: aparece una sola vez,
//  enterrado en el Sod. Fuente verificada por el Sofer:
//  Desktop/Contenido/Mashiaj-AjaritHaYamim/00-enigma-del-mashiaj.md
//
//  Re-sincronizado con el .md actual: se ELIMINÓ la sección de desambiguación
//  (הַבְחָנָה) — el .md ya no la trae — y se reenfocó la apertura y el umbral
//  הֶמְשֵׁךְ para abrir hacia el Cap 2 (despertar-de-lo-alto) y el Cap 3
//  (tercer-templo). CERO menciones a otras religiones, igual que el .md.
//
//  Montado con el componente compartido EstudioMisterio (igual que los otros 12).
//  Hero en modo "dimensiones" (sin gematría). El voseo está en neutro
//  (haz/elige/da/di/empieza/tú). El material "PARA REDES" y la "Nota del Sofer"
//  del .md son internos y NO se montan en el sitio.
//
//  Idioma del análisis: español (trilingüe diferido; el chrome —nav/CTA— es es/fa).
// ════════════════════════════════════════════════════════════════════════════

const data: EstudioData = {
  slug: "enigma-mashiaj",
  hero: {
    serielabel:
      "Serie «Del Enigma del Mashíaj al Ajarít HaYamim» · Estudio 0 — La Puerta · Capítulo 1 (la Tesis)",
    serielabelFa:
      "سری «از معمای ماشیح تا آخریتِ روزها» · مطالعهٔ ۰ — دروازه · فصل ۱ (نهاد)",
    he: "חִידַת הַמָּשִׁיחַ",
    titulo: "El Enigma del Mashíaj",
    tituloFa: "معمای ماشیح",
    ganchoEs:
      "¿Persona, conciencia colectiva o estado de conciencia? El Mashíaj es las tres a la vez — y ninguna caja sola lo contiene. La Tesis: el despertar desde abajo, la redención que subimos con nuestras obras.",
    ganchoFa:
      "شخص، آگاهیِ جمعی یا حالتِ آگاهی؟ ماشیح هر سه است با هم — و هیچ جعبه‌ای به‌تنهایی او را در بر نمی‌گیرد. نهاد: بیداری از پایین، رستگاری‌ای که با کارهای خود بالا می‌بریم.",
    dimensiones: [
      { es: "Persona", fa: "شخص" },
      { es: "Conciencia colectiva", fa: "آگاهیِ جمعی" },
      { es: "Estado de conciencia", fa: "حالتِ آگاهی" },
    ],
  },
  targum: {
    citas: [
      {
        label: "Versículo-ancla I — Bereshit (Génesis) 49:10",
        he: "לֹֽא־יָס֥וּר שֵׁ֙בֶט֙ מִֽיהוּדָ֔ה וּמְחֹקֵ֖ק מִבֵּ֣ין רַגְלָ֑יו עַ֚ד כִּֽי־יָבֹ֣א שִׁילֹ֔ה וְל֖וֹ יִקְּהַ֥ת עַמִּֽים׃",
        es: "No se apartará el cetro de Yehudá, ni el bastón de mando de entre sus pies, hasta que venga Shiló (שִׁילֹה), y a él se congregarán los pueblos.",
        source: "Bereshit (Génesis) 49:10",
      },
      {
        label: "Versículo-ancla II — Yeshayá (Isaías) 11:1–2, 9",
        he: "וְיָצָ֥א חֹ֖טֶר מִגֵּ֣זַע יִשָׁ֑י וְנֵ֖צֶר מִשׇּׁרָשָׁ֥יו יִפְרֶֽה׃ וְנָחָ֥ה עָלָ֖יו ר֣וּחַ יְהֹוָ֑ה ר֧וּחַ חׇכְמָ֣ה וּבִינָ֗ה ר֤וּחַ עֵצָה֙ וּגְבוּרָ֔ה ר֥וּחַ דַּ֖עַת וְיִרְאַ֥ת יְהֹוָֽה׃ … כִּֽי־מָלְאָ֣ה הָאָ֗רֶץ דֵּעָה֙ אֶת־יְהֹוָ֔ה כַּמַּ֖יִם לַיָּ֥ם מְכַסִּֽים׃",
        es: "Saldrá un retoño (jóter) del tronco de Yishái, y un brote (nétzer) crecerá de sus raíces. Reposará sobre él el espíritu de YHVH: espíritu de sabiduría y entendimiento, espíritu de consejo y poder, espíritu de conocimiento y temor de YHVH. […] Porque la tierra estará llena del conocimiento de YHVH, como las aguas cubren el mar.",
        source: "Yeshayá (Isaías) 11:1–2, 9",
      },
    ],
    parrafos: [
      `La Puerta del Mashíaj se recorre en tres movimientos, como una sola respiración. Este es el Capítulo 1 — la Tesis: aquí el Mashíaj se lee como lo que sube desde abajo (אִתְעֲרוּתָא דִּלְתַתָּא), una persona, un pueblo y una conciencia que despiertan, reúnen las chispas y reparan el mundo con sus obras — el esfuerzo humano que provoca la redención. Es la mitad luminosa y activa del enigma. La {{study:despertar-de-lo-alto|Antítesis}} preguntará si el primer movimiento fue de veras nuestro; y la {{study:tercer-templo|Síntesis}} fundirá ambos. Lee este capítulo entero como está: es completo en sí mismo, y a la vez la primera de tres voces.`,
      `Antes de la primera fuente, una pregunta honesta. Casi todos creemos saber qué es el Mashíaj — y casi todos lo aprendimos de oídas. Unos imaginan un hombre concreto que aparecerá un día. Otros, una idea espiritual sin rostro. Y casi nadie sospecha que la palabra, en la tradición judía, abarca a la vez mucho más de una sola cosa. La tradición dice algo más sutil y más grande: el Mashíaj se deja describir, a la vez, como una persona real (un rey humano de la casa de David), una conciencia colectiva (la redención de un pueblo y de la humanidad entera) y un estado de conciencia (una percepción transformada de la realidad, en la que se revela la Unidad de Dios). El «enigma» no es que falte información: es que ninguna de esas tres categorías, por sí sola, agota lo que la palabra significa. Esta Puerta recorre las tres — y muestra, al final, que son tres rostros de un mismo punto.`,
      `Bereshit 49:10 es la primera promesa mesiánica explícita de la Torá, en boca de Yaakov moribundo. Nótese lo concreto que es: habla de un cetro (שֵׁבֶט), de realeza, de una dinastía — la de Yehudá. El Mashíaj entra en la Escritura no como un dios que baja, sino como un rey que no termina de irse del todo: un linaje humano que culmina en «aquel a quien se congregarán los pueblos». Persona y reunión, juntas, desde el primer verso.`,
      `Y en Yeshayá 11 están, en un solo pasaje, las tres dimensiones. La persona: un descendiente real de Yishái (el padre de David). El estado de conciencia: sobre él reposa ruaj daat, un espíritu de conocimiento de Dios. Y la conciencia colectiva: el resultado no es la salvación de un individuo, sino una tierra entera llena del conocimiento de YHVH. El Mashíaj davídico se mide por lo que pasa con el mundo, no con un alma sola.`,
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Sobre Shiló (Bereshit 49:10) explica: Shiló = «shai lo», el tributo que se le trae — «el rey Mashíaj, de quien es el reino». Para Rashi la lectura es netamente monárquica e histórica: el cetro no abandona del todo a Yehudá hasta que llega ese rey. Es la voz de la dimensión PERSONA: el Mashíaj es, en primer término, un soberano humano legítimo de una casa concreta.`,
      },
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן).",
        texto: `Ramban refuerza la lectura dinástica: la realeza pertenece a Yehudá de modo permanente, y los reyes que no fueron de Yehudá (los Jashmonaim) fueron castigados por usurparla, porque el cetro está reservado para Shiló. El Mashíaj es restauración de un orden roto: la realeza vuelve a su lugar legítimo. De nuevo, un orden político-histórico real, no un mito.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Sobrio y filológico, exige que el contexto pida cada lectura mesiánica antes de hacerla; para él Shiló alude a un descendiente de Yehudá. Su voz nos recuerda la regla de oro de Jashmal: el Sod no anula el Pshat. El sentido místico se añade al literal; no lo borra. Importa aquí: la dimensión de «estado de conciencia» que veremos en el Sod no cancela que el Mashíaj sea, primero, un hombre real.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבְּנְאֵל).",
        texto: `Don Yitzjak Abarbanel —estadista exiliado de Sefarad en 1492, autor de tres obras enteras sobre la redención— es el gran intérprete mesiánico clásico. Para él, las bendiciones de Yaakov contienen plegado el guion completo de la historia de Israel hasta el Mashíaj, y Shiló es el rey Mashíaj literal que reunirá a los exiliados. Su voz, desde el dolor del destierro, encarna la dimensión COLECTIVA: el Mashíaj es la respuesta a un pueblo disperso, no a un individuo angustiado.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם).",
        texto: `Atento a la precisión del lenguaje, Malbim subraya que en Yeshayá 11 el Mashíaj se describe por sus facultades de conocimiento (jojmá, biná, daat) y por su efecto sobre el mundo (una tierra «llena de conocimiento de YHVH»), no por poderes sobrenaturales. La grandeza del Mashíaj es una grandeza de daat — de conciencia. Es la bisagra hacia la dimensión ESTADO DE CONCIENCIA.`,
      },
      {
        etiqueta: "Maimónides — la definición halájica (הָרַמְבַּ\"ם).",
        texto: `Aquí está el corazón histórico de todo el tema. En Mishné Torá, Hiljot Melajim 11–12, Rambam da la definición legal y sobria del Mashíaj — la que más despeja confusiones. Cita la base: «El rey Mashíaj habrá de levantarse y restaurar el reino de David a su estado original, a su soberanía primera; reconstruirá el Templo y reunirá a los exiliados de Israel» (Hiljot Melajim 11:1). Y precisa cuatro cosas, todas en el texto: (1) No hace falta que haga milagros — «no te pase por la mente que el rey Mashíaj necesita hacer señales y prodigios» (11:3); no es un taumaturgo. (2) La prueba son las obras, no la persona: un rey de la casa de David que estudia Torá, cumple las mitzvot y conduce a Israel es «presuntamente el Mashíaj»; solo si lo logra —reconstruye el Templo y reúne a los exiliados— «este es el Mashíaj con certeza» (11:4). Se demuestra por resultados verificables en el mundo, no por la fe en su identidad. (3) El orden natural no cambia: «no hay diferencia entre este mundo y los días del Mashíaj salvo la sujeción a los reinos» (Shmuel, Berajot 34b; codificado en 12:1). (4) La meta es el conocimiento de Dios para todos: «que la tierra esté llena del conocimiento de YHVH como las aguas cubren el mar» (Yeshayá 11:9, citado en 12:5). Con Rambam queda fijada la dimensión PERSONA: el Mashíaj es un rey humano, no un ser divino; un agente que completa una obra concreta en el mundo.`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `Aquí desciende la dimensión cósmica que da a las otras dos su raíz. Según el sistema del Arizal (Etz Jaim, Shaar HaShvirah y Shaar HaTikkun, transmitido por Rabí Jaim Vital), la realidad atravesó la Shevirat HaKelim — la ruptura de los vasos: los recipientes destinados a contener la luz divina no la soportaron y se quebraron, y las chispas (nitzotzot) cayeron y se dispersaron entre las cáscaras (kelipot). Desde entonces, toda la historia es Birur HaNitzotzot: la lenta recolección y elevación de esas chispas. El Tikún es la reparación; y el Mashíaj es su manifestación final y visible. En este marco luriano, las tres dimensiones se anudan: la persona del rey davídico es el instrumento del tikún en lo histórico; el pueblo que recolecta chispas es el tikún en lo colectivo; y el estado de conciencia en que la luz puede al fin revelarse sin romper los recipientes es el tikún en lo interior.`,
      },
    ],
    glosa: `Glosa para el lector: Kelipot = «cáscaras», las envolturas que ocultan y aprisionan la luz divina. Tikún = reparación, rectificación. Birur = selección y elevación de las chispas santas atrapadas en lo material. Gematría = el valor numérico de las letras hebreas; un dato del nivel místico, nunca el fundamento de una creencia.`,
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `En el plano simple, las fuentes describen a un rey humano de la casa de David (Bereshit 49:10; Yeshayá 11:1; Rambam 11:1) que restaura un orden roto: reconstruye el Templo, reúne a los dispersos, establece la Torá y la paz. Nada sobrenatural se exige de él; «no hay diferencia entre este mundo y los días del Mashíaj salvo la sujeción a los reinos» (Shmuel, Berajot 34b). Esta es la dimensión PERSONA, leída a ras de letra.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión)",
        parrafos: [
          `Las fuentes nunca hablan del Mashíaj a solas: lo enlazan siempre con un colectivo. «A él se congregarán los pueblos» (49:10); «reunirá a los exiliados de Israel» (Rambam 11:1); «la tierra estará llena del conocimiento de YHVH» (Yeshayá 11:9). El Mashíaj alude a la redención de Knésset Israel —el alma colectiva del pueblo— y, a través de ella, de toda la humanidad. La tradición habla incluso de dos figuras —Mashíaj ben Yosef, que prepara y recoge, y Mashíaj ben David, que consuma— como dos fases de un mismo proceso colectivo, no de un héroe solitario. Esta es la dimensión CONCIENCIA COLECTIVA: la redención es obra de un pueblo y de un mundo, no de un individuo aislado.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética), con la voz del Baal Shem Tov",
        parrafos: [
          `El Talmud, en Sanedrín 98a, ofrece una imagen que abre la tercera dimensión. Resolviendo dos versículos en aparente contradicción (Daniel 7:13 vs. Zejaryá 9:9), Rabí Yehoshúa ben Levi enseña: «si lo merecen, [vendrá] con las nubes del cielo; si no lo merecen, [vendrá] pobre y montado sobre un asno». La llegada del Mashíaj depende del estado del pueblo: la redención no es un evento fijo que cae desde fuera, sino algo cuyo rostro cambia según la conciencia de quienes la reciben. Y la misma página da la clave temporal en Yeshayá 60:22, בְּעִתָּהּ אֲחִישֶׁנָּה — «en su tiempo la apresuraré»: si merecen, «la apresuraré»; si no, llegará «en su tiempo». El tiempo del Mashíaj responde a la conciencia humana.`,
          `Aquí entra la voz del Baal Shem Tov, fundador del jasidut, integrada en el Drash/Sod (como manda el método de Jashmal). El Besht enseñó que en cada generación, y en cada alma, hay una chispa del Mashíaj — un punto interior por el que la redención del mundo pasa también a través de cada persona. En su célebre carta (la Igueret HaKodesh al Rabí Guershon de Kitov), relata haber ascendido al «palacio del Mashíaj» y haberle preguntado «¿cuándo vienes, Maestro?», y la respuesta fue: «cuando se difundan tus manantiales hacia afuera». La venida no es solo una fecha: es un estado que se extiende, una percepción de la Unidad de Dios que se difunde por el mundo. Esta es la dimensión ESTADO DE CONCIENCIA: Yemot HaMashíaj como una percepción transformada de la realidad, no solo un cambio de gobierno.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `Rav Yehuda Ashlag, el Baal HaSulam, leyó toda la Cabalá como una ciencia del deseo: la creación es la «voluntad de recibir», y la corrección (tikún) es transformar el «recibir para sí» en «recibir para dar». En esa luz, el Mashíaj es el punto en que la voluntad de recibir de toda la creación se invierte y se vuelve voluntad de dar — y entonces la criatura se equipara a su Creador y la separación termina. Esto unifica las tres dimensiones: la persona del Mashíaj encarna ese giro; el colectivo lo realiza juntos; el estado de conciencia es la percepción de la Unidad que resulta.`,
          `Y el secreto más íntimo: el Mashíaj es la revelación de la {{letter:yud|Yejidá}} — el quinto y más profundo nivel del alma, el punto que nunca se separó de Dios (יְחִידָה, «la Única»; verificado: י10+ח8+י10+ד4+ה5 = 37). La Yejidá es una y, a la vez, se manifiesta en tres planos: en lo individual (la persona del Mashíaj y la chispa en cada alma), en lo colectivo (Knésset Israel y la humanidad reunidas) y en lo cósmico (la creación entera vuelta a su Unidad). Y solo en este plano luriano, y de modo enterrado, observa la tradición que מָשִׁיחַ y נָחָשׁ comparten valor numérico (358): la serpiente del Edén introdujo la fragmentación, y el tikún la endereza desde adentro. Es un detalle del Sod, no la definición del Mashíaj: el corazón del tema es conceptual, no numérico.`,
        ],
      },
    ],
    caja: {
      titulo: "Mashíaj = la manifestación plena de la Yejidá en la realidad.",
      cuerpo:
        "Persona, conciencia colectiva y estado de conciencia no son tres respuestas rivales: son los tres rostros de un solo punto — la Unidad que el mundo siempre quiso volver a ser. El «enigma» se disuelve cuando dejamos de elegir entre las tres.",
    },
  },
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que la palabra «Mashíaj» me había llegado encogida. La imaginaba como un solo tipo de cosa —o un hombre, o una idea sin rostro— y la tradición la sostiene como tres a la vez: un rey real que repara el mundo con obras, un pueblo y una humanidad que se reúnen, y una conciencia que percibe la Unidad de Dios. El enigma no era falta de datos: era mi intento de meterlo en una sola caja.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo que el judaísmo no pregunta primero «¿cómo me salvo yo?», sino «¿cómo se repara el mundo?». El Mashíaj no se mide por almas rescatadas por su persona, sino por un Templo reconstruido, exiliados reunidos, una tierra «llena del conocimiento de YHVH». Y veo que su llegada me incluye: «si lo merecen…» (Sanedrín 98a). La redención responde a la conciencia de quien la espera.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Si lo más profundo de mí es la Yejidá —el punto que nunca se separó de Dios— entonces la «chispa de Mashíaj» que el Baal Shem Tov dice que llevo no es una metáfora amable: es el mismo punto que, en grande, redime al mundo. La dimensión «estado de conciencia» del Mashíaj empieza siendo mi percepción de la Unidad.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Las tres dimensiones son un solo movimiento: la Unidad bajando a lo individual (una persona), a lo colectivo (un pueblo, la humanidad) y a lo cósmico (toda la creación). La historia entera es ese único punto —la Yejidá— abriéndose camino hacia su revelación plena.`,
      },
    ],
  },
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, deja de imaginar al Mashíaj como un rescate que llega de afuera y haz un acto que «repare mundo».",
    texto: `Las tres dimensiones se tocan en un gesto pequeño: elige una cosa rota y cercana —una relación enfriada, una injusticia diminuta que puedes corregir, un pedazo de tu entorno que puedes ordenar o sanar— y arréglala hoy. Al hacerlo, di en tu interior: «esto es tikún olam a mi escala — estoy revelando un punto de la Yejidá». No es un truco de autoayuda: es exactamente lo que enseña Rambam (el Mashíaj se prueba por obras en el mundo) y lo que enseña el Besht (la chispa de Mashíaj actúa a través de mí). La redención del mundo está hecha de millones de esos actos. Empieza por uno. Hoy.`,
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El Mashíaj no es una sola cosa. Es a la vez una persona (un rey humano de la casa de David, definido por Rambam por sus obras, no por milagros), una conciencia colectiva (la reunión de un pueblo y de la humanidad, «ben Yosef» y «ben David» como un proceso) y un estado de conciencia (la percepción de la Unidad de Dios, la chispa de Mashíaj en cada alma). El enigma se resuelve al ver que son tres rostros de la Yejidá revelándose en lo individual, lo colectivo y lo cósmico.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Mashíaj = «ungido» — una función (rey o kohén ungido con aceite), no una divinidad: un agente humano y un proceso que completa el tikún (la reparación) del mundo. Su medida no es privada ni íntima, sino el mundo transformado — un orden de paz y de conocimiento de Dios para toda la humanidad (Yeshayá 11:9).`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `Yeshayá 11:9 marca la meta — «la tierra llena del conocimiento de YHVH como las aguas cubren el mar». La grandeza del Mashíaj es grandeza de daat, de conciencia. Y su llegada responde a la nuestra: «si lo merecen… la apresuraré» (Sanedrín 98a; Yeshayá 60:22).`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Hacer hoy un acto concreto de «reparar mundo» —corregir una sola fractura cercana con tus obras— sabiendo que la dimensión interior del Mashíaj empieza en cómo percibes y tratas la realidad que tienes delante.`,
      },
    ],
  },
  hemshej: [
    "{{study:despertar-de-lo-alto|¿Y si el primer movimiento no fue nuestro? ¿Y si Dios despertó primero —si la luz bajó antes de que pudiéramos pedirla, “no por ustedes, sino por Mi santo Nombre”? El despertar desde ARRIBA: la Antítesis.}}",
    "{{study:tercer-templo|Si una redención sube y la otra baja, ¿cuál es la verdadera? El Tercer Templo responde: las dos a la vez. La Síntesis que funde los dos despertares.}}",
    "{{study:ajarit-hayamim|Si los “días del Mashíaj” no cambian el orden del mundo, ¿qué cambian exactamente? Gueulá, Yemot HaMashíaj, Olam HaBa y Tejiyat HaMetim no son lo mismo.}}",
    "{{study:mashiaj-jazal|Si el Mashíaj es un proceso colectivo, ¿por qué el Talmud habla de DOS —ben Yosef y ben David— y discute hasta su nombre?}}",
    "{{study:finalidad-creacion|Si la meta es “reparar el mundo”, ¿para qué se creó así de roto? “El Santo deseó una morada en lo de abajo”.}}",
  ],
  ctaRef: "Genesis 49:10",
};

export default function Page() {
  return <EstudioMisterio data={data} />;
}
