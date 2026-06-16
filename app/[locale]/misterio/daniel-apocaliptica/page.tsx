"use client";

import EstudioMisterio, { type EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO 5 — דָּנִיֵּאל וְהַחֲזוֹן · Daniel y la Apocalíptica
//  Bloque I (Historia y Profecía). Contenido del Sofer:
//  Desktop/Contenido/Mashiaj-AjaritHaYamim/study-05-daniel-apocaliptica.md
//  Sin gematría destacada → el hero usa la frase-gancho (no se inventa número).
// ════════════════════════════════════════════════════════════════════════════

const data: EstudioData = {
  slug: "daniel-apocaliptica",
  hero: {
    serielabel: "Serie «Del Enigma del Mashíaj al Ajarít HaYamim» · Estudio 5 — Historia y Profecía",
    serielabelFa: "سری «از معمای ماشیح تا آخریتِ روزها» · مطالعهٔ ۵ — تاریخ و نبوت",
    he: "דָּנִיֵּאל וְהַחֲזוֹן",
    titulo: "Daniel y la Apocalíptica",
    tituloFa: "دانیال و مکاشفه",
    ganchoEs:
      "La primera vez que la Biblia promete que los muertos despertarán está escondida en un libro «sellado hasta el fin». La resurrección estaba en clave.",
    ganchoFa:
      "نخستین باری که کتاب مقدس وعده می‌دهد مردگان بیدار خواهند شد، در کتابی «مُهرشده تا پایان» پنهان است. رستاخیز در رمز بود.",
  },
  targum: {
    citas: [
      {
        label: "Versículo-ancla I — Daniel 7:3 (las cuatro bestias)",
        he: "וְאַרְבַּע חֵיוָן רַבְרְבָן סָלְקָן מִן־יַמָּא שָׁנְיָן דָּא מִן־דָּא׃",
        es: "Y cuatro grandes bestias subían del mar, diferentes la una de la otra.",
        source: "Daniel 7:3",
      },
      {
        label: "Versículo-ancla II — Daniel 7:13–14 (el «como un hijo de hombre»)",
        he: "חָזֵה הֲוֵית בְּחֶזְוֵי לֵילְיָא וַאֲרוּ עִם־עֲנָנֵי שְׁמַיָּא כְּבַר אֱנָשׁ אָתֵה הֲוָא … וְלֵהּ יְהִיב שׁלְטָן וִיקָר וּמַלְכוּ … שׁלְטָנֵהּ שׁלְטָן עָלַם דִּי־לָא יֶעְדֵּה׃",
        es: "Miraba yo en las visiones de la noche, y he aquí que con las nubes del cielo venía uno como un hijo de hombre (kevar enásh)… y le fue dado dominio, gloria y reino… su dominio es un dominio eterno que no pasará.",
        source: "Daniel 7:13–14",
      },
      {
        label: "Versículo-ancla III — Daniel 9:24 (las setenta semanas)",
        he: "שָׁבֻעִים שִׁבְעִים נֶחְתַּךְ עַל־עַמְּךָ וְעַל־עִיר קׇדְשֶׁךָ לְכַלֵּא הַפֶּשַׁע וּלְהָתֵם חַטָּאת וּלְכַפֵּר עָוֺן וּלְהָבִיא צֶדֶק עֹלָמִים …",
        es: "Setenta semanas están decretadas sobre tu pueblo y sobre tu ciudad santa, para terminar la transgresión, sellar el pecado, expiar la iniquidad y traer la justicia eterna…",
        source: "Daniel 9:24",
      },
      {
        label: "Versículo-ancla IV — Daniel 12:2 (la resurrección)",
        he: "וְרַבִּים מִיְּשֵׁנֵי אַדְמַת־עָפָר יָקִיצוּ אֵלֶּה לְחַיֵּי עוֹלָם וְאֵלֶּה לַחֲרָפוֹת לְדִרְאוֹן עוֹלָם׃",
        es: "Y muchos de los que duermen en el polvo de la tierra despertarán (yakítzu): unos para vida eterna, y otros para vergüenza y desprecio eterno.",
        source: "Daniel 12:2",
      },
      {
        label: "Versículo-ancla V — Daniel 12:4 (el sello)",
        he: "וְאַתָּה דָנִיֵּאל סְתֹם הַדְּבָרִים וַחֲתֹם הַסֵּפֶר עַד־עֵת קֵץ …",
        es: "Y tú, Daniel, cierra las palabras y sella el libro hasta el tiempo del fin (et ketz)…",
        source: "Daniel 12:4",
      },
    ],
    parrafos: [
      `El libro de Daniel es la bisagra de toda la serie. Hasta aquí, el "fin de los días" había sido una promesa (Bereshit 49) y un debate (los Sabios, Estudio 4). En Daniel se vuelve visión: un drama cósmico de imperios que suben del mar y caen, un "hijo de hombre" que recibe un reino eterno, un cómputo enigmático de "setenta semanas", y —por primera vez de modo explícito en la Biblia hebrea— la promesa de que los muertos despertarán. Daniel es el único libro del Tana"j escrito en parte en arameo (caps. 2–7), y los Sabios no lo colocaron entre los Profetas (Neviim) sino entre los Escritos (Ketuvim) — señal de su lugar singular, a medio camino entre profecía y visión sellada.`,
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Rashi identifica las cuatro bestias de Daniel 7 con los cuatro reinos del exilio que oprimirían a Israel: Babilonia (el león), Persia-Media (el oso), Grecia (el leopardo) y Roma/Edom (la cuarta bestia, la terrible). Esta lectura —los arba maljuyot, los cuatro reinos— es la columna de toda la interpretación judía clásica de Daniel. Sobre el "como un hijo de hombre" (7:13), Rashi entiende que es el rey Mashíaj, a quien se entrega el reino eterno cuando las bestias-imperios hayan caído. Y sobre Daniel 12:2, Rashi lee llanamente: es la resurrección de los muertos (tejiyat hametim), unos para la vida del Mundo Venidero y otros para la vergüenza.`,
      },
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן).",
        texto: `Para Ramban, Daniel es prueba textual decisiva de dos pilares de la fe: el Mashíaj y la resurrección. En su Shaar HaGuemul (la "Puerta de la Recompensa") apoya en Daniel 12:2 la doctrina de la tejiyat hametim como artículo central. Ramban, sin embargo, comparte la prudencia rabínica sobre las "setenta semanas": son una estructura de sentido sobre el exilio y la redención, no una calculadora de fechas. El versículo dice stóm / jatóm —"cierra" y "sella"— precisamente porque el cómputo está diseñado para no entregarse antes de tiempo.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Fiel a su método, Ibn Ezra ancla las setenta semanas de Daniel 9 en la historia concreta: las cuenta desde la destrucción del Primer Templo (o desde la profecía de Yirmiyá de los setenta años) hasta acontecimientos del Segundo Templo. Su voz mantiene la regla de Jashmal: el Sod no anula el Pshat. Daniel tiene un referente histórico real —los imperios que Israel efectivamente padeció— sobre el cual la tradición añade la capa escatológica. Lo místico no borra lo histórico; lo profundiza.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבְּנְאֵל).",
        texto: `Don Yitzjak Abarbanel dedicó a Daniel una obra entera, Maayanei HaYeshuá ("Las Fuentes de la Salvación"). Para él, la cuarta bestia es Roma, y su lectura, escrita por un judío expulsado de Sefarad en 1492, late con la convicción de que el reino terrible de su época también caería y daría paso al reino del "hijo de hombre". Abarbanel polemiza abiertamente contra las lecturas cristianas de las setenta semanas, reafirmando que el reino eterno de Daniel 7 pertenece a Israel —"el pueblo de los santos del Altísimo" (Daniel 7:27)— y al Mashíaj davídico. Su voz encarna el tema de la serie: el Mashíaj es la respuesta del exilio, y Daniel es el guion de esa respuesta.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם).",
        texto: `Atento al lenguaje, Malbim observa que Daniel no habla de un "fin" como aniquilación, sino de un et ketz, "un tiempo del fin" —un punto de corte y madurez, no de destrucción. Y subraya el verbo de 12:2: yakítzu, "despertarán", la misma raíz de despertar del sueño. La muerte, en el lenguaje de Daniel, es un sueño, no un fin; y la resurrección es un despertar, no una creación nueva. El que duerme sigue siendo él mismo; solo despierta. Esa precisión verbal contiene toda una teología de la continuidad de la persona.`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `Aquí desciende la dimensión cósmica. Para el Arizal, los cuatro reinos de Daniel no son solo política: corresponden a los cuatro mundos descendentes y a las cuatro envolturas de las kelipot (las cáscaras que aprisionan las chispas), que deben ir cayendo una tras otra a medida que avanza el birur (la recolección de las chispas de luz tras la Shevirat HaKelim, la ruptura de los vasos). El "hijo de hombre" que recibe el reino eterno es el rostro del Adam de la santidad rectificado —el Adam Kadmón reflejado en la historia— frente al "Adam bestial" de los imperios. Y la resurrección (tejiyat hametim) es, en el sistema luriano, la culminación del tikún: la reunión definitiva del cuerpo (la vasija) con el alma (la luz), el último acto del birur donde nada de lo creado se pierde. Que la palabra de Daniel 12:3 sea precisamente זֹהַר (zóhar, "resplandor") —"los sabios brillarán como el zóhar del firmamento"— no es un detalle menor: el libro central de la Cabalá toma su nombre de este versículo, anudando la visión de Daniel con todo el río de la mística que la serie recorrerá después.`,
      },
    ],
    glosa: `Glosa para el lector: Apocalíptica = del griego apokálypsis, "des-velamiento, revelación"; el género que descorre el velo del fin de la historia mediante visiones, bestias y números. Tana"j = la Biblia hebrea (Torá + Neviim + Ketuvim). Et ketz (עֵת קֵץ) = "el tiempo del fin". Kevar enásh (כְּבַר אֱנָשׁ) = "como un hijo de hombre", la figura humana que recibe el reino eterno. Arba maljuyot (אַרְבַּע מַלְכֻיּוֹת) = "los cuatro reinos" (Babilonia, Persia-Media, Grecia, Roma/Edom). Adam Kadmón = el "Hombre Primordial", la primera y más alta configuración de la realidad emanada en el sistema luriano.`,
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `Daniel, un judío exiliado en la corte de Babilonia y luego de Persia, recibe una serie de visiones nocturnas. Ve cuatro bestias monstruosas que suben del mar, cada una distinta — y entiende que representan cuatro imperios que se sucederán. Ve cómo, tras ellos, "uno como un hijo de hombre" viene con las nubes del cielo y recibe un reino que no pasará (cap. 7). Recibe el cómputo de las "setenta semanas" decretadas sobre Jerusalén (cap. 9). Y al final se le revela que, en el tiempo de angustia, "muchos de los que duermen en el polvo despertarán" (12:2) — pero se le ordena sellar el libro "hasta el tiempo del fin" (12:4). En el plano simple: un vidente del exilio recibe el calendario oculto de la historia, y se le manda guardarlo bajo llave.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión)",
        parrafos: [
          `El detalle que más alude es que las bestias suben del mar (Daniel 7:3). El mar (yamá), en el lenguaje bíblico y cabalístico, es lo indiferenciado, el caos previo a la forma, las aguas del tohú. Los imperios brotan del caos: son fuerza sin santidad, poder sin propósito. Frente a ellos, el "hijo de hombre" baja del cielo con las nubes — no sube del mar. La alusión es nítida: lo bestial asciende desde abajo (el poder que se arroga a sí mismo), lo mesiánico desciende desde arriba (el reino que se recibe como don). Y por eso el reino del hijo de hombre es eterno y el de las bestias es transitorio: lo que sube del caos vuelve al caos; lo que baja de la fuente permanece.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `El corazón del Drash es el sello. Daniel recibe la visión más vasta del Tana"j sobre el fin — y se le ordena: "stóm… jatóm", "cierra… sella el libro hasta el tiempo del fin" (12:4). ¿Por qué revelar para luego ocultar? Porque la verdad del fin no se da como información sino como semilla: sellada, plantada, para germinar a su tiempo. El mismo versículo añade: "yeshotetú rabím, ve-tirbé ha-daat" — "muchos irán de aquí para allá, y crecerá el conocimiento" (12:4). El conocimiento del fin crece; no se entrega de golpe. Y el dato más asombroso vive aquí: la primera vez que la Biblia hebrea promete explícitamente que los muertos despertarán está escondida en un libro mandado sellar. La resurrección —la esperanza más radical de Israel— entró al texto en clave, bajo llave, "hasta el tiempo del fin". Lo más luminoso vino envuelto en lo más cerrado.`,
          `Aquí entra, integrada en el Drash, la voz del Baal Shem Tov, fundador del jasidut. El Besht enseñó que toda oscuridad esconde una chispa, y que la tarea del justo es despertar lo que duerme. Léase de nuevo yakítzu, "despertarán" (12:2): la resurrección no es una creación desde cero, es un despertar de lo que solo parecía muerto. Para el Besht, esto vale ya ahora, en cada alma: hay en cada persona partes "dormidas en el polvo" —dones enterrados, fe adormecida, amor en hibernación— que esperan su yakítzu. La gran resurrección del fin de los días es el espejo amplificado de mil pequeñas resurrecciones interiores. El que despierta una chispa hoy ensaya el despertar de todos.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `Rav Yehuda Ashlag, el Baal HaSulam, leyó toda la realidad como el despliegue del deseo de recibir y su corrección hacia el dar. A esa luz, los cuatro reinos de Daniel son cuatro grados del "recibir para sí mismo": cuatro modos del ego histórico que deben ser depurados antes de que la voluntad de la creación se invierta. Cada bestia que cae es un grado de egoísmo que la historia desmonta. Y el "hijo de hombre" que recibe el reino eterno es la voluntad ya rectificada — el "recibir para dar" — que, por estar equiparada a su Creador en la cualidad del otorgamiento, no pasa: lo que se da no se gasta. Las setenta semanas, en esta clave, no son un reloj sino la medida del trabajo de corrección que la historia debe completar.`,
          `El secreto último está en tejiyat hametim, la resurrección. Para la Cabalá, la muerte entró con la fragmentación de la Shevirá; el "polvo de la tierra" (admat afar, 12:2) es el grado más bajo donde cayeron las chispas. La resurrección es el acto final del birur: la luz vuelve a animar incluso la vasija más densa, el cuerpo mismo, el polvo. Nada se descarta. Y esa es la firma de la {{letter:yud|Yejidá}}, el nivel más profundo y unitario del alma: el punto que nunca se separó de su fuente y que, por eso, puede volver a reunir lo que la muerte separó —cuerpo y alma, polvo y luz. El yakítzu de Daniel es la Yejidá despertando a toda la creación. Por eso Daniel 12:3 promete que los sabios brillarán como el zóhar (resplandor) del cielo: la resurrección no devuelve la vida de antes, la devuelve luminosa.`,
        ],
      },
    ],
    caja: {
      titulo: "Las bestias suben del mar; el Hijo de Hombre baja del cielo.",
      cuerpo:
        "Lo bestial es poder que se arroga a sí mismo y por eso pasa; lo mesiánico es reino que se recibe como don y por eso permanece. Y la resurrección —yakítzu, «despertarán»— es el último birur: la luz reanima hasta el polvo. Nada se pierde.",
    },
  },
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que la esperanza más grande de Israel —que los muertos despertarán— llegó sellada. No se gritó desde una montaña; se susurró en arameo, en un libro de visiones, con la orden de cerrarlo. Aprendo que las verdades más hondas no se reciben como titulares, sino como semillas que hay que dejar madurar. Lo que más importa suele venir en clave.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo que lo que sube del caos cae, y lo que baja de la fuente permanece. Los cuatro imperios eran enormes, terribles, y sin embargo transitorios; el reino del "hijo de hombre" parece llegar el último y sin embargo es eterno. El patrón se repite en mi vida: lo que construyo desde el ego y la prisa se deshace; lo que recibo con humildad como don dura. La fuerza que se arroga a sí misma es siempre una bestia que volverá al mar.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Hay en mí cosas "dormidas en el polvo". El verbo de Daniel no es crear sino despertar (yakítzu): no necesito inventarme de nuevo, necesito despertar lo que ya está en mí, adormecido bajo capas de costumbre y miedo. Mi alma no espera una resurrección lejana para empezar a despertar; puede empezar hoy a sacudirse el polvo.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Que la resurrección alcance al polvo de la tierra significa que la materia no es un error a descartar. La creación entera —cuerpo, tierra, polvo— está destinada a ser reanimada por la luz, no abandonada. El final de Daniel no es una huida del mundo: es el mundo despertando. Y los justos brillarán como el zóhar del cielo — la luz no aplasta la materia, la enciende.`,
      },
    ],
  },
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Hoy, despierta una sola cosa que tengas «dormida en el polvo».",
    texto: `Daniel no dice que los muertos serán re-creados, dice que despertarán (yakítzu) — lo que está dormido sigue vivo, solo necesita un toque. Elige una sola cosa tuya que esté enterrada bajo el polvo de la rutina: un talento que dejaste de practicar, una amistad "muerta" que en realidad solo duerme, una práctica espiritual que abandonaste, un proyecto que sepultaste. Hoy dale un solo toque de vida: cinco minutos, un mensaje, un primer paso. Al hacerlo, di en tu interior: "esto no estaba muerto, estaba durmiendo; lo despierto". No esperes el tiempo del fin para resucitar lo tuyo. Empieza por una chispa. Hoy.`,
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Daniel transforma la promesa mesiánica en visión: cuatro imperios (bestias que suben del mar) caen uno tras otro, y un "hijo de hombre" que baja del cielo recibe un reino eterno (cap. 7). La historia política tiene un fin con dirección, no un caos sin salida.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Daniel 12:2 contiene la primera promesa bíblica explícita de la resurrección —"muchos de los que duermen en el polvo despertarán"— y está, deliberadamente, dentro de un libro mandado sellar "hasta el tiempo del fin" (12:4). La esperanza más radical entró en clave, como semilla.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El verbo no es crear sino yakítzu, "despertarán" (12:2): la muerte es sueño, la resurrección es despertar, y la persona que despierta sigue siendo ella misma. Y la resurrección alcanza al polvo —admat afar—: nada de lo creado se descarta; la luz reanima hasta la materia, y los justos brillan "como el zóhar del firmamento" (12:3).`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Dar hoy un solo "toque de vida" a algo propio que duerme bajo el polvo de la rutina —un don, un vínculo, una práctica— sabiendo que despertar una chispa hoy es un ensayo del gran yakítzu.`,
      },
    ],
  },
  hemshej: [
    "{{study:mashiaj-jazal|¿De dónde sacaron los Sabios las “señales del fin”? Del cómputo sellado de Daniel. Vuelve a los nombres y los dos Mashíaj del Talmud.}}",
    "{{study:gog-umagog|¿En qué “tiempo de angustia” despiertan los muertos? En la guerra final. Gog uMagog y el último filtrado del mal antes de la Unidad.}}",
    "{{study:olam-haba|¿A dónde despiertan los que duermen en el polvo? Olam HaBa, la resurrección y la consumación final.}}",
    "{{study:zohar-redencion|Los sabios “brillarán como el זֹהַר del firmamento” (Daniel 12:3). De ese versículo toma su nombre el libro central de la Cabalá: el Zóhar y la redención.}}",
  ],
  ctaRef: "Daniel 12:2",
};

export default function Page() {
  return <EstudioMisterio data={data} />;
}
