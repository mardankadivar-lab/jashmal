
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO 3 — גָּלוּת וּגְאוּלָּה בַּנְּבִיאִים · Exilio y Redención en los Profetas
//  Bloque I (Historia y Profecía). Contenido del Sofer:
//  Desktop/Contenido/Mashiaj-AjaritHaYamim/study-03-exilio-redencion.md
//  Hero: גּוֹלָה=44 → גְּאוּלָּה=45 (una sola letra: el Alef).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "exilio-redencion",
  hero: {
    serielabel: "Serie «Del Enigma del Mashíaj al Ajarít HaYamim» · Estudio 3 — Historia y Profecía",
    serielabelFa: "سری «از معمای ماشیح تا آخریتِ روزها» · مطالعهٔ ۳ — تاریخ و نبوت",
    he: "גָּלוּת וּגְאוּלָּה",
    titulo: "Exilio y Redención en los Profetas",
    tituloFa: "تبعید و رستگاری در پیامبران",
    ganchoEs:
      "Golá (exilio) = 44; Gueulá (redención) = 45. Entre el exilio y la redención hay una sola letra: la א — el Alef, Dios mismo entrando en la palabra.",
    ganchoFa:
      "گولا (تبعید) = ۴۴؛ گئولا (رستگاری) = ۴۵. میانِ تبعید و رستگاری تنها یک حرف است: الف — خودِ خدا که به واژه وارد می‌شود.",
    par: {
      a: { he: "גּוֹלָה", rom: "Golá · exilio · 44", color: "red" },
      b: { he: "גְּאוּלָּה", rom: "Gueulá · redención · 45", color: "gold" },
      valor: "+ א",
    },
  },
  targum: {
    citas: [
      {
        label: "Versículo-ancla I — Yeshayá (Isaías) 11:1 (el retoño de la raíz cortada)",
        he: "וְיָצָ֥א חֹ֖טֶר מִגֵּ֣זַע יִשָׁ֑י וְנֵ֖צֶר מִשׇּׁרָשָׁ֥יו יִפְרֶֽה׃",
        es: "Y saldrá un vástago (jóter) del tronco de Yishai, y un retoño (nétzer) brotará de sus raíces.",
        source: "Yeshayá (Isaías) 11:1",
      },
      {
        label: "Versículo-ancla II — Yirmiyá (Jeremías) 31:31, 33 (el pacto nuevo en el corazón)",
        he: "הִנֵּ֛ה יָמִ֥ים בָּאִ֖ים נְאֻם־יְהֹוָ֑ה וְכָרַתִּ֗י אֶת־בֵּ֧ית יִשְׂרָאֵ֛ל וְאֶת־בֵּ֥ית יְהוּדָ֖ה בְּרִ֥ית חֲדָשָֽׁה׃ … נָתַ֤תִּי אֶת־תּֽוֹרָתִי֙ בְּקִרְבָּ֔ם וְעַל־לִבָּ֖ם אֶכְתְּבֶ֑נָּה …",
        es: "He aquí que vienen días —dice YHVH— y haré con la casa de Israel y la casa de Yehudá un pacto nuevo (brit jadashá)… Pondré Mi Torá en su interior, y sobre su corazón la escribiré…",
        source: "Yirmiyá (Jeremías) 31:31, 33",
      },
      {
        label: "Versículo-ancla III — Yejezkel (Ezequiel) 36:26 (el corazón nuevo)",
        he: "וְנָתַתִּ֤י לָכֶם֙ לֵ֣ב חָדָ֔שׁ וְר֥וּחַ חֲדָשָׁ֖ה אֶתֵּ֣ן בְּקִרְבְּכֶ֑ם וַהֲסִ֨רֹתִ֜י אֶת־לֵ֤ב הָאֶ֙בֶן֙ מִבְּשַׂרְכֶ֔ם וְנָתַתִּ֥י לָכֶ֖ם לֵ֥ב בָּשָֽׂר׃",
        es: "Y os daré un corazón nuevo (lev jadash), y un espíritu nuevo (rúaj jadashá) pondré en vuestro interior; y quitaré el corazón de piedra (lev ha'even) de vuestra carne, y os daré un corazón de carne (lev basar).",
        source: "Yejezkel (Ezequiel) 36:26",
      },
      {
        label: "Versículo-ancla IV — Yejezkel (Ezequiel) 37:1, 11, 14 (los huesos secos)",
        he: "הָיְתָ֣ה עָלַי֮ יַד־יְהֹוָה֒ … וַיְנִיחֵ֖נִי בְּת֣וֹךְ הַבִּקְעָ֑ה וְהִ֖יא מְלֵאָ֥ה עֲצָמֽוֹת׃ … הָעֲצָמ֣וֹת הָאֵ֔לֶּה כׇּל־בֵּ֥ית יִשְׂרָאֵ֖ל הֵ֑מָּה … יָבְשׁ֧וּ עַצְמוֹתֵ֛ינוּ וְאָבְדָ֥ה תִקְוָתֵ֖נוּ … וְנָתַתִּ֨י רוּחִ֤י בָכֶם֙ וִחְיִיתֶ֔ם וְהִנַּחְתִּ֥י אֶתְכֶ֖ם עַל־אַדְמַתְכֶ֑ם …",
        es: "Vino sobre mí la mano de YHVH… y me dejó en medio del valle, y este estaba lleno de huesos… «Estos huesos son toda la casa de Israel; he aquí que dicen: ‹se secaron nuestros huesos y se perdió nuestra esperanza›»… «Y pondré Mi espíritu (rují) en vosotros y viviréis, y os asentaré sobre vuestra tierra».",
        source: "Yejezkel (Ezequiel) 37:1, 11, 14",
      },
    ],
    parrafos: [
      `Cuatro escenas, un solo movimiento: de una raíz cortada brota un retoño (Yeshayá 11); un pacto baja del exterior al interior, hasta el corazón (Yirmiyá 31); un corazón de piedra se vuelve corazón de carne (Yejezkel 36); y unos huesos secos, que ya no esperaban nada, vuelven a respirar (Yejezkel 37). La redención de los profetas no empieza en la geografía sino en el órgano más íntimo: el corazón (lev) y el espíritu (rúaj).`,
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Sobre Yejezkel 37, Rashi es explícito: la visión de los huesos secos es una parábola de la redención de Israel del exilio. El pueblo, desesperado en el destierro, se siente como huesos resecos —"se perdió nuestra esperanza" (37:11)—, y la profecía promete que Dios mismo los hará revivir y los traerá de vuelta a su tierra. Rashi ata el sentido a la reunión de los exiliados (kibutz galuyot): los huesos dispersos por el valle son las almas dispersas por las naciones, que serán recogidas. Sobre Yeshayá 11:1, lee jóter y nétzer como el rey Mashíaj, descendiente de Yishai (padre de David): de la dinastía aparentemente cortada brota, contra toda expectativa, vida nueva.`,
      },
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן).",
        texto: `Ramban subraya que las promesas de Yirmiyá y Yejezkel describen un cambio que la naturaleza humana no puede producir por sí sola: un corazón nuevo dado por Dios. En el exilio, la inclinación al mal (yetzer hará) endurece el corazón hasta volverlo "piedra"; la redención incluye una transformación de la naturaleza interior —que en el mundo presente solo se logra con gran esfuerzo— hecha don gratuito en los días del Mashíaj. Para Ramban, esto distingue la redención final de las salvaciones parciales de la historia: no es solo volver a la tierra, es volver con un corazón capaz de no recaer.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Filológico y cauto, Ibn Ezra nos ancla en el Pshat histórico: Yeshayá 11 habla, en su capa llana, de un rey justo de la casa de David que restaurará el orden y la justicia; Yejezkel 37 consuela a los exiliados de Babilonia prometiéndoles el regreso. No se apresura a leer cada frase como resurrección literal de los muertos: el "valle de huesos" es, en su lectura primera, una imagen del renacer nacional de un pueblo que se creía muerto. Su voz nos recuerda la regla de oro de Jashmal: el Sod no anula el Pshat. La lectura de resurrección y de despertar del alma se añade al consuelo histórico de un pueblo exiliado; no lo borra.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבְּנְאֵל).",
        texto: `Abarbanel, exiliado él mismo, lee estos capítulos como el guion ordenado de la Gueulá: primero la reunión de los dispersos (kibutz galuyot), luego la purificación interior (el corazón nuevo), luego el reinado del retoño davídico, y al fin la era de paz universal de Yeshayá 11. Para él, Yejezkel 37 no es solo metáfora: anuncia también la resurrección literal en el tiempo del fin. Su lectura integra las dos capas: el renacer del pueblo y el regreso de los muertos a la vida son dos grados del mismo poder divino de "revivir lo seco". Su voz, desde el destierro, encarna el módulo: el exilio es la sequía; la redención es el agua que vuelve a la raíz cortada.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם).",
        texto: `Atento siempre a que no hay sinónimos en la Torá, Malbim distingue en Yejezkel 36 cada palabra: el lev (corazón, la sede del deseo y la voluntad) y el rúaj (espíritu, la fuerza que mueve); el lev ha'even (corazón de piedra, insensible, que no recibe impresión) frente al lev basar (corazón de carne, sensible, que late y responde). Para Malbim, la redención profética opera por etapas precisas: primero se quita la piedra (se elimina el endurecimiento), luego se da la carne (se restaura la sensibilidad), y solo entonces el rúaj nuevo puede habitar dentro. El orden importa: no se puede infundir espíritu nuevo en un corazón que sigue siendo piedra. Primero ablandar, luego inspirar.`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `Aquí desciende la dimensión cósmica. Según el Arizal (Etz Jaim y Shaar HaGilgulim, transmitidos por Rabí Jaim Vital), el exilio (galut) no es solo un hecho político: es el estado de las chispas (nitzotzot) dispersas tras la Shevirat HaKelim, atrapadas entre las cáscaras (kelipot). La "reunión de los exiliados" (kibutz galuyot) es, en su raíz, el Birur HaNitzotzot: la recolección de las chispas caídas. Y la visión de los huesos secos tiene una lectura luriana asombrosa: los huesos (atzamot) son las chispas resecas, despojadas de su luz vital; el rúaj que Dios infunde (Yejezkel 37:14, ve'natati rují bajem) es la luz que vuelve a unirse a su recipiente. La resurrección de los muertos es, cabalísticamente, el Tikún total: cada chispa vuelve a su vaso reparado. Por eso galut y gueulá comparten casi todas sus letras: el exilio ya contiene, plegada, la redención. La gematría lo sella: גּוֹלָה (Golá, exilio) = 44 (verificado: ג3+ו6+ל30+ה5) y גְּאוּלָּה (Gueulá, redención) = 45 (verificado: ג3+א1+ו6+ל30+ה5). La única diferencia es una letra: la א, el Alef (=1). El exilio se convierte en redención cuando entra el Alef — el Uno, el Aluf (Maestro) del mundo, Dios mismo — en medio de la palabra. La galut con Dios adentro es la gueulá.`,
      },
    ],
    glosa: `Glosa para el lector: galut (גָּלוּת) / golá (גּוֹלָה) = exilio, destierro. gueulá (גְּאוּלָּה) = redención. kibutz galuyot = la reunión de los exiliados. lev (לֵב) = corazón; rúaj (רוּחַ) = espíritu/aliento. lev ha'even = corazón de piedra; lev basar = corazón de carne. {{letter:alef|Alef (א)}} = la primera letra, valor 1; alude al Uno y a Aluf, "Maestro/Jefe". Nitzotzot / kelipot / Birur / Tikún: chispas / cáscaras / el filtrado que las eleva / la reparación final.`,
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `En su capa simple, los profetas consuelan a un pueblo destrozado por el destierro. Yeshayá anuncia que de la dinastía de David —reducida a un "tronco" cortado, geza Yishai— brotará de nuevo un rey justo. Yirmiyá promete un pacto que ya no se romperá porque estará escrito en el corazón. Yejezkel, hablando a los deportados a Babilonia que sienten "se secaron nuestros huesos, se perdió nuestra esperanza" (37:11), les promete dos cosas: un corazón nuevo que reemplace al endurecido, y un regreso a su tierra. En el plano llano, la redención profética es: reunir a los dispersos y sanar el corazón del pueblo. Primero la persona (el corazón), después la nación (la tierra).`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión)",
        parrafos: [
          `Hay un orden que se repite en los cuatro pasajes, y es una pista. En todos, lo interior precede a lo exterior: el retoño brota de la raíz antes de dar fruto visible (Yeshayá 11:1); la Torá se escribe en el corazón antes de regir la vida pública (Yirmiyá 31:33); el corazón de piedra se vuelve carne antes del regreso a la tierra (Yejezkel 36:26 precede a 37); y el rúaj entra en los huesos antes de que se levanten y caminen (Yejezkel 37:14). La alusión es nítida: la redención política es el fruto de una redención del corazón. No se reúne primero la geografía y luego, quizá, el alma; se reúne primero el alma, y la geografía la sigue. Kibutz galuyot (reunir a los exiliados) tiene un gemelo interior: reunir las partes dispersas del propio corazón.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `Aquí entra, integrada, la voz del Baal Shem Tov. El Besht enseñó que el exilio más profundo no es el de la tierra sino el del corazón: un corazón endurecido, distraído de Dios, encerrado en sí mismo, está en galut aunque viva en su propia casa. Y la redención empieza, por eso, dentro: la teshuvá ablanda la piedra. Cuando un corazón de piedra vuelve a ablandarse —a sentir, a llorar, a abrirse— ya empezó la gueulá, aunque el mundo afuera siga igual. El Besht leía el lev basar (corazón de carne) no como debilidad sino como capacidad de ser impresionado por lo divino: la piedra no recibe, la carne sí. Ser "blando de corazón" ante Dios es la primera redención.`,
          `Y un Drash sobre los huesos secos: el Besht enseñó que ningún alma está jamás tan "seca" que no pueda revivir. Israel dice "se perdió nuestra esperanza" (avdá tikvatenu), y Dios responde justamente ahí, en el fondo de la desesperanza, infundiendo rúaj. La lección jasídica es radical: el lugar donde te crees más muerto es exactamente donde Dios sopla la vida nueva. La desesperanza no es el final de la redención; a menudo es su víspera.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `Rav Yehuda Ashlag, el Baal HaSulam, leyó el exilio y la redención como dos estados del deseo. El "corazón de piedra" es la voluntad de recibir cerrada sobre sí misma, el ego que todo lo absorbe y nada da — y esa es la esencia del galut: separación, porque quien solo recibe se siente "otro" frente a su fuente. El "corazón de carne" es esa misma voluntad ablandada y reorientada al dar: y eso es la gueulá, porque dar equipara la criatura al Creador y disuelve la separación. Por eso Yejezkel pone el corazón nuevo antes del regreso a la tierra: la verdadera tierra prometida es un estado del corazón, y la geografía redimida es su reflejo. La redención, dice el Baal HaSulam, es ante todo un cambio de intención —de "recibir para mí" a "recibir para dar"—; todo lo demás es su consecuencia.`,
          `Y el secreto más íntimo, que tiende el hilo hacia toda la serie: el "espíritu nuevo" (rúaj jadashá) que Dios promete es el despertar de la {{letter:yud|Yejidá}} colectiva — el punto del alma de Israel (y de cada alma) que nunca se separó de Dios. Los huesos secos reviven no porque se les añada algo ajeno, sino porque se les devuelve el rúaj que siempre fue suyo en su raíz. Y aquí la gematría descubre el secreto del módulo: entre גּוֹלָה (exilio) = 44 y גְּאוּלָּה (redención) = 45 hay una sola letra, la {{letter:alef|א (Alef = 1)}}. El Alef es el Uno, y los Sabios lo llaman Aluf, "Maestro del mundo". El exilio se convierte en redención no por un cambio de geografía, sino porque el Uno entra en medio de la palabra: cuando Dios entra en el exilio, el exilio ya es redención en proceso. No hay que salir de la galut para alcanzar la gueulá; hay que dejar entrar el Alef.`,
        ],
      },
    ],
    caja: {
      titulo: "Exilio y redención están separados por una sola letra: la א.",
      cuerpo:
        "Golá (44) + Alef = Gueulá (45). El exilio no es lo opuesto de la redención: es la redención a la que todavía no entró el Uno. Reunir a los dispersos —del pueblo y del corazón— es dejar que el Alef vuelva al centro de la palabra.",
    },
  },
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que la redención de la que hablan los profetas no empieza afuera —en la política, en la geografía, en las noticias— sino dentro, en el corazón. Antes de reunir tierras, Dios reúne corazones; antes de devolver al pueblo a su suelo, le devuelve un corazón capaz de sentir. Si esperaba la redención como un cambio en el mundo externo, los profetas me corrigen: empieza por el órgano más íntimo.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo que entre el exilio y la redención hay una sola letra, el Alef. Eso significa que no son dos mundos separados por un abismo; están a un paso, a una letra de distancia. El mismo material de mi exilio —mi dispersión, mi dureza, mis "huesos secos"— es el material de mi redención en cuanto deja entrar al Uno. Veo también el patrón del orden interno: raíz antes que fruto, corazón antes que tierra, espíritu antes que pie que camina. Siempre de adentro hacia afuera.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Tengo, como todos, zonas de "corazón de piedra": lugares donde dejé de sentir, donde me endurecí para no sufrir. Y tengo "huesos secos": esperanzas que di por perdidas, partes de mí que creo muertas. El estudio me dice dos cosas: que la piedra puede volverse carne, y que ningún hueso está tan seco que el rúaj no pueda devolverle vida. La desesperanza —"se perdió nuestra esperanza"— no es el final; muchas veces es la víspera.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `El kibutz galuyot, la reunión de los exiliados, es el rostro histórico de la reunificación que recorre toda la serie. El mundo entero está en exilio en el sentido de que sus chispas están dispersas; y la historia es el largo trabajo de reunirlas. Cada vez que ablando un endurecimiento, devuelvo vida a algo que daba por muerto, o reúno algo disperso, hago en pequeño lo que los profetas prometen en grande.`,
      },
    ],
  },
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Hoy, ablanda una sola piedra y haz entrar el Alef.",
    texto: `Elige un lugar de tu corazón que se haya endurecido —un resentimiento que cargas, una persona a la que dejaste de escuchar, una parte de ti que abandonaste por "ya perdida"— y da un solo paso para volverla de piedra a carne: escribe el nombre de quien te dolió y pídele a Dios poder ablandarte hacia él; manda un mensaje a alguien que diste por perdido; dedica diez minutos a algo que enterraste y creías muerto, soplándole rúaj de nuevo. Al hacerlo, di en tu interior: "aquí dejo entrar el Alef —el Uno— en medio de mi exilio; esto es kibutz galuyot, reúno una chispa dispersa de mi propio corazón." No esperes una redención que llegue de afuera. La gueulá está a una letra de tu galut. Empieza por una piedra. Hoy.`,
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `La redención de los profetas empieza dentro, no afuera: antes que la geografía, el corazón. Dios promete un corazón nuevo (Yejezkel 36:26), un pacto escrito en el corazón (Yirmiyá 31:33) y un espíritu que revive los huesos secos (Yejezkel 37). La redención política es el fruto de una redención interior.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `גּוֹלָה (exilio) = 44 · גְּאוּלָּה (redención) = 45 (verificado letra por letra). Entre ambos hay una sola letra: la א, el Alef (=1), el Uno, Aluf, Maestro del mundo. El exilio se vuelve redención cuando el Uno entra en medio de la palabra. No hay que salir de la galut para alcanzar la gueulá: hay que dejar entrar el Alef.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El "corazón de piedra" es la voluntad cerrada sobre sí (el galut del ego); el "corazón de carne" es esa voluntad ablandada y vuelta al dar (la gueulá) — Baal HaSulam. Y los huesos secos enseñan que ningún hueso está tan seco que el rúaj no pueda revivirlo: el fondo de la desesperanza es a menudo la víspera de la vida nueva.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Ablandar hoy una sola "piedra" del corazón —un resentimiento, un vínculo enfriado, una esperanza enterrada— y soplarle rúaj, sabiendo que reunir las partes dispersas del propio corazón es, en pequeño, el kibutz galuyot que los profetas prometen.`,
      },
    ],
  },
  hemshej: [
    "{{study:ajarit-hayamim|El “fin de los días” empieza con un retorno del corazón (Devarim 4:30). ¿Qué es exactamente ese “fin”, y cómo se distingue de la era mesiánica y del Mundo Venidero?}}",
    "{{study:zohar-redencion|Si Israel está en el exilio, ¿qué pasa con Dios? El Zóhar dice algo escandaloso: la Shejiná misma está en el exilio. La redención también es Suya.}}",
    "{{study:shaar-hagilgulim|Si los huesos secos son chispas dispersas que vuelven a su vaso, ¿cómo se rectifican las almas? La reencarnación como mecanismo del tikún personal.}}",
  ],
  ctaRef: "Ezekiel 36:26",
};

