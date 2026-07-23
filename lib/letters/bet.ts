import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  BET (ב) — Data de la segunda letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Bereshit Rabá 1:10 — R. Yoná en nombre de R. Leví: la Bet "cerrada por
//     todos sus lados y abierta por delante" (סתום מכל צדדיו ופתוח מלפניו);
//     R. Yehudá ben Pazí: dos mundos; berajá vs. arirá; los dos עוקצין
//     (puntas) de la Bet; la queja de la Álef durante 26 generaciones.
//   · Talmud Yerushalmi Jaguigá 2:1 — paralelo exacto: "בבי״ת נברא העולם.
//     מה בי״ת סתום מכל צדדיו ופתוח מצד אחד"; berajá/arirá; los dos mundos
//     creados con Hei y Yud (Isaías 26:4, כי בי-ה).
//   · Midrash Tanjumá Nasó 16 — R. Shmuel bar Najmán: "נתאוה שיהא לו דירה
//     בתחתונים כמו שיש בעליונים" (morada en lo bajo); el descenso de la
//     Shejiná por los siete firmamentos y su retorno con el Mishcán.
//   · Tania cap. 36 — "שנתאוה הקב״ה להיות לו דירה בתחתונים"; el propósito
//     es este mundo inferior; יתרון אור מן החושך.
//   · Zohar, Introducción 6:37-38 (ed. Vilna I, 2b-3b) — la Bet entra:
//     "דבי מברכאן לך לעילא ותתא"; respuesta: "בך אברי עלמא"; y a la Álef:
//     "לית בי יחודא אלא בך".
//   · Sefer HaBahir 3 — la Torá empieza con Bet porque empieza con berajá.
//   · Shabat 104a — los niños en la casa de estudio: אל״ף בי״ת — אלף בינה.
//   · Bavá Batrá 25b — R. Yitzjak: הרוצה שיחכים ידרים ושיעשיר יצפין;
//     cita allí mismo Jeremías 1:14 (מצפון תפתח הרעה).
//   · Pirkei deRabí Eliezer 3 — la esquina norte "ברא ולא גמרו": creada y
//     no terminada; de allí sale el mal (Jeremías 1:14).
//   · Sefer Yetzirá 4:1-4 — Bet, primera de las siete letras DOBLES
//     (בג״ד כפר״ת), dos pronunciaciones: dura y suave.
//   · Génesis 1:1 — בְּרֵאשִׁית: la Torá abre con una Bet (grande en la
//     tradición masorética). Prov 24:3, Sal 127:1, Sal 89:3 — la casa.
//   · R. Yitzchak Ginsburgh, tabla de la Bet (inner.org/alefbeit/sigbeit):
//     Concepto "morada para Dios abajo" · Forma "recinto de tres lados,
//     abierto por la izquierda, el 'lado norte'" · Don: sabiduría ·
//     Arquetipo: Abraham · Canal: de Jojmá a Jésed.
//  Gematrías (calculadas letra por letra):
//    ב = 2 · nombre pleno בית = 2+10+400 = 412 (sin equivalencias: ninguna
//    quedó verificada, y no se publica lo no verificado).
//
//  NOTA DEL SOFER — descartado o marcado por honestidad:
//  (1) El ensayo largo de Ginsburgh sobre la Bet (viejo URL
//      inner.org/hebleter/beit.htm) ya no existe en la web (404): solo se
//      atribuye a Ginsburgh lo que consta en su tabla verificada
//      (inner.org/alefbeit/sigbeit). Nada más se pone en su boca.
//  (2) El puente "Bet abierta al norte ↔ esquina norte inconclusa de
//      Pirkei deRabí Eliezer 3" es lectura NUESTRA (drash): las dos fuentes
//      son exactas, el puente entre ellas no es cita clásica.
//  (3) El vínculo בַּיִת (casa) ↔ בָּנָה (construir) es homilético, no
//      etimología demostrada: báyit es un sustantivo primitivo.
//  (4) La fórmula famosa "דירה בתחתונים" tal como se cita suele ser la
//      paráfrasis del Tania (cap. 36); la fuente midráshica exacta es
//      Tanjumá Nasó 16, con redacción levemente distinta. Aquí se citan
//      las dos, cada una con su redacción propia.
//  (5) Sefer Yetzirá 4:2 asigna un atributo a cada letra doble y las
//      recensiones DIFIEREN: la impresa (Sefaria) da a la Bet חיים (vida);
//      la del Gra (verificada: "יסודן חכמה עושר זרע חיים...") le da חכמה
//      (sabiduría), y esa es la que sigue Ginsburgh ("Gift: Wisdom").
//      Se declara la divergencia en vez de esconderla.
// ─────────────────────────────────────────────────────────────────────────

export const bet: LetterData = {
  slug: "bet",
  letter: "ב",
  nameTranslit: { es: "Bet", en: "Bet", fa: "بِت" },
  nameHe: "בֵּית",
  value: 2,

  level1: {
    es: "La Torá no empieza con la primera letra. Empieza con la segunda: בְּרֵאשִׁית. Antes de la Bet hay una Álef que calla — y la Torá arranca en el dos, no en el uno. Mira su forma: una casa. Cerrada por atrás, cerrada por arriba, cerrada por abajo; abierta por delante, hacia donde avanza la lectura. No estás mirando la letra desde afuera: estás parado adentro. Todo lo que existe empezó dentro de esta casa. Antes de leer una palabra más, quédate con esta pregunta: ¿por qué la creación empieza con el dos?",
    en: "The Torah does not begin with the first letter. It begins with the second: Bereshit. Before the Bet stands an Alef that keeps silent — and the Torah opens on two, not on one. Look at its shape: a house. Closed behind, closed above, closed below; open ahead, toward where the reading moves. You are not looking at this letter from outside: you are standing inside it. Everything that exists began inside this house. Before you read another word, hold this question: why does creation begin with two?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "בֵּית significa 'casa' (báyit). A diferencia de la Zayin —cuyo nombre no aparece en el Tanaj—, aquí sucede lo contrario: báyit es una de las palabras más frecuentes de toda la Biblia. La casa de Nóaj, la casa de Abraham, la Casa de Israel, la Casa del Eterno. El nombre de esta letra no lo inventó nadie: es la palabra con la que el hebreo nombra el lugar donde se vive. Y la Bet es además la letra-prefijo 'en': la בְּ de בְּרֵאשִׁית no es decoración, es la preposición 'en el principio'. La Bet ES el 'dentro de' del idioma hebreo.\n\nAquí conviene una honestidad de entrada: se suele enseñar que báyit viene de בָּנָה (baná, 'construir'). Es hermoso — la casa como lo construido — pero no es etimología demostrada: báyit es un sustantivo primitivo, y el vínculo con baná es drash, lectura homilética. Sabiéndolo, se puede recibir entero: 'בְּחָכְמָה יִבָּנֶה בָּיִת — con sabiduría se construye la casa' (Proverbios 24:3), y 'אִם ה' לֹא יִבְנֶה בַיִת, שָׁוְא עָמְלוּ בוֹנָיו בּוֹ — si el Eterno no construye la casa, en vano trabajan sus constructores' (Salmos 127:1).\n\nY el secreto del nombre es este: la casa no es del que la habita abajo. El Midrash enseña que cuando el Santo, bendito sea, creó el mundo, 'נִתְאַוָּה שֶׁיְּהֵא לוֹ דִּירָה בַּתַּחְתּוֹנִים — anheló tener una morada en los seres inferiores, como la tiene en los superiores' (Tanjumá Nasó 16, en nombre de R. Shmuel bar Najmán). El Tania (cap. 36) toma esa línea y la convierte en la definición misma del propósito de la creación: 'שֶׁנִּתְאַוָּה הַקָּבָּ״ה לִהְיוֹת לוֹ דִּירָה בַּתַּחְתּוֹנִים'. El mundo entero es una Bet: una casa construida para que el Dueño quiera vivir en ella. Por eso la tabla de Rav Ginsburgh resume el concepto de la Bet en una sola frase: 'el propósito de la creación: una morada para Dios abajo'.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Bet es el universo como recinto habitable. Crear no es solo hacer que algo exista: es hacer un adentro — paredes, techo, suelo — donde la vida pueda ocurrir. El Tanjumá (Nasó 16) cuenta la historia completa de esa casa: la Shejiná habitaba abajo; el pecado de Adam la hizo subir al primer firmamento, Caín al segundo, y así hasta el séptimo; y luego Abraham la hizo bajar un piso, Yitzjak otro, hasta que Moshé 'la bajó a la tierra' — cuando se levantó el Mishcán: 'בָּאתִי לְגַנִּי — he venido a mi jardín' (Cantar 5:1). La historia del mundo es la historia de una casa que se vació y se vuelve a habitar.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Bet es tu capacidad de hacer lugar. Una casa no se define por sus paredes sino por su puerta: está cerrada por tres lados justamente para poder estar abierta por uno. El arquetipo de la Bet, en la tabla de Ginsburgh, es Abraham — el hombre de la tienda abierta, el primero que entendió que tener casa es tener dónde recibir. La pregunta del alma-bet no es '¿qué tengo?', sino '¿quién cabe en lo que tengo?'. Hacer de tu vida una morada — para otro, y para Otro — es el trabajo de esta letra.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Bet guarda la paradoja más honda del Tania: la morada que Dios anhela no está arriba, entre los que ya son luz — está בַּתַּחְתּוֹנִים, en lo más bajo, donde Su luz se esconde. Y ahí el Tania (cap. 36) da el paso radical: el propósito de todos los mundos superiores es ESTE mundo inferior, porque cuando la oscuridad misma se transforma en luz hay 'יִתְרוֹן אוֹר מִן הַחֹשֶׁךְ — una ventaja de la luz que viene de la oscuridad', un resplandor mayor que el de los mundos altos. La casa más preciada no es la que nunca se oscureció: es la que fue oscuridad y aprendió a alumbrar. Ginsburgh sitúa el canal de la Bet de Jojmá a Jésed — y el versículo los une: 'עוֹלָם חֶסֶד יִבָּנֶה — el mundo será construido con jésed' (Salmos 89:3).",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "La Bet es un recinto de tres lados: techo, pared trasera, base — y el cuarto lado abierto, hacia adelante, hacia donde avanza la lectura. El Midrash hace de esa forma una ley del conocimiento: '¿Por qué fue creado el mundo con Bet? Así como la Bet está cerrada por todos sus lados y abierta por delante, así no tienes permiso de preguntar qué hay abajo, qué hay arriba, qué hay antes y qué hay detrás — sino desde el día en que el mundo fue creado, en adelante' (Bereshit Rabá 1:10, R. Yoná en nombre de R. Leví; el paralelo exacto está en el Talmud Yerushalmi, Jaguigá 2:1). La letra con la que empieza la Torá trae dibujado el límite de lo que puedes indagar — y la dirección en la que sí puedes caminar.\n\nEl mismo Midrash añade un detalle asombroso: la Bet tiene dos עוקצין (uktzín, puntas), 'una arriba y otra abajo por detrás'. Le preguntan a la Bet: '¿quién te creó?' — y señala con su punta de arriba: 'Este que está arriba me creó'. '¿Y cuál es Su nombre?' — y señala con su punta de atrás: hacia la Álef que la precede. La casa entera es un dedo que apunta fuera de sí misma.\n\nLa tabla de Ginsburgh precisa el lado abierto: 'abierto por la izquierda, el lado norte' (cuando la Bet mira hacia el frente del texto, su izquierda es el norte). Y aquí las fuentes tienden un hilo que da vértigo — puente nuestro, no cita clásica, dicho con honestidad: Pirkei deRabí Eliezer 3 enseña que la esquina norte del mundo fue 'creada y no terminada' (ברא ולא גמרו), para que todo el que se pretenda dios 'venga y termine esa esquina que dejé' — y de allí sale el mal: 'מִצָּפוֹן תִּפָּתַח הָרָעָה' (Jeremías 1:14). La casa de la creación tiene un lado sin terminar. A propósito.",
    },
    partes: [
      {
        label: { es: "El techo", en: "The roof", fa: "سقف" },
        significado: {
          es: "La línea horizontal superior: el cielo de la casa, cerrado. No preguntes qué hay encima — ese es su primer mensaje. Pero en su extremo lleva la punta (עוקץ) que el Midrash hace hablar: cuando le preguntan a la Bet quién la creó, señala hacia arriba — 'זֶה שֶׁלְּמַעְלָה בְּרָאָנִי, Este que está arriba me creó' (Bereshit Rabá 1:10). El techo que te cierra el paso es el mismo que te señala al Creador: el límite no te tapa el cielo, te lo indica.",
        },
        svgPathId: "bet-roof",
      },
      {
        label: { es: "La pared trasera", en: "The back wall", fa: "دیوار پشت" },
        significado: {
          es: "La línea vertical que cierra la letra por atrás: el 'antes' sellado. Detrás de la Bet no hay nada que puedas indagar — pero sí hay Alguien: detrás de la Bet de בְּרֵאשִׁית está la Álef, la primera letra, la que calla. Por eso, cuando le preguntan a la Bet por el nombre de su Creador, señala con su punta trasera hacia la Álef que la precede (Bereshit Rabá 1:10). Lo que está antes del principio no se investiga — se señala.",
        },
        svgPathId: "bet-back",
      },
      {
        label: { es: "La base", en: "The base", fa: "پایه" },
        significado: {
          es: "La línea horizontal inferior: el suelo. Es lo que hace de la Bet una casa y no un túnel: hay dónde pararse. El mundo creado con Bet es un mundo con piso — un lugar donde la vida puede apoyarse y sostenerse. Y también el suelo está cerrado: no preguntes qué hay debajo. La estabilidad que pisas cada día es un regalo que no exige que veas sus cimientos para sostenerte.",
        },
        svgPathId: "bet-base",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Bet es el mapa del conocimiento humano: tres direcciones selladas y una abierta. La cosmología puede caminar desde el primer instante 'en adelante' — eso la Bet lo deja abierto — pero el antes-del-principio, el arriba-de-todo y el debajo-de-todo quedan del otro lado de la pared (Bereshit Rabá 1:10). No es censura: es arquitectura. Un mundo sin paredes no es un mundo, es un abismo. La Bet enseña que el límite del saber es lo que hace habitable el saber.",
    },
    almas: {
      es: "En el alma, tú vives dentro de una Bet. Tu pasado está atrás, sellado: no puedes reescribirlo, y agotarte contra esa pared es golpear el trazo cerrado de la letra. Lo que tienes abierto es el frente — la dirección de la lectura, el paso siguiente. Y te queda un lado más, el que casi nadie ve: el norte sin terminar (Pirkei deRabí Eliezer 3, en nuestro puente con la forma). Hay una esquina de tu mundo que quedó inconclusa a propósito — no como defecto, sino como invitación: ese pedazo lo terminas tú, o se queda siendo la puerta del mal. La parte no resuelta de tu vida es exactamente tu tarea.",
    },
    divinidad: {
      es: "En lo divino, la forma de la Bet es una confesión: la casa señala a su Constructor. Con la punta de arriba dice quién la creó; con la punta de atrás dice Su nombre, apuntando a la Álef que no se ve (Bereshit Rabá 1:10). Y el Zohar completa el cuadro con las dos caras del misterio: a la Bet, el Santo le dice 'בָּךְ אִבְרֵי עָלְמָא — en ti crearé el mundo'; pero a la Álef le dice 'לֵית בִּי יִחוּדָא אֶלָּא בָּךְ — no hay unidad en Mí sino en ti' (Zohar, Introducción 6:37-38). La creación habita en la Bet; la unidad, en la Álef. La casa existe para que el Uno tenga dónde ser recibido.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 2,
    guematriaForma: {
      es: "ב = 2 · nombre pleno בית = 2 + 10 + 400 = 412 · la Torá abre con la Bet de בְּרֵאשִׁית: la creación empieza en el dos, no en el uno",
    },
    mundos: {
      es: "2 es la primera división: la creación misma. Mientras solo hay Uno, no hay mundo; el mundo empieza cuando hay dos — Creador y creatura, cielo y tierra, luz y oscuridad. Por eso R. Yehudá ben Pazí enseña: '¿por qué fue creado el mundo con Bet? Para hacerte saber que son DOS mundos — este mundo y el mundo venidero' (Bereshit Rabá 1:10). El Yerushalmi (Jaguigá 2:1) lo despliega: los dos mundos fueron creados con las dos letras del Nombre — 'כִּי בְּיָ-הּ ה' צוּר עוֹלָמִים' (Isaías 26:4) — este mundo con la Hei, el venidero con la Yud. El dos no es la ruptura del uno: es su manera de tener un invitado.",
    },
    almas: {
      es: "2 es la elección. El Midrash pregunta por qué el mundo no empezó con Álef, y responde: porque Álef abre אֲרִירָה (arirá, maldición), y Bet abre בְּרָכָה (berajá, bendición). 'Dijo el Santo, bendito sea: he aquí que lo creo con lenguaje de bendición — ¡y ojalá se sostenga!' (Bereshit Rabá 1:10; igual en Yerushalmi Jaguigá 2:1). Fíjate en ese 'ojalá': el dos implica riesgo. Donde hay dos caminos, la bendición no está garantizada — está elegida. Y los niños de la casa de estudio leyeron el par de letras como una sola instrucción: 'אָלֶ״ף בֵּי״ת — אֱלַף בִּינָה, aprende entendimiento' (Shabat 104a). Vivir en el dos y elegir la berajá: eso es aprender.",
    },
    divinidad: {
      es: "El secreto final del 2 está en la queja de la Álef. Durante veintiséis generaciones la Álef reclamó ante el Trono: 'soy la primera de las letras, ¿y no creaste Tu mundo conmigo?'. Y el Santo le respondió: 'el mundo no fue creado sino por mérito de la Torá; mañana daré la Torá en Sinaí y no abriré sino contigo: אָנֹכִי ה' אֱלֹהֶיךָ' (Bereshit Rabá 1:10). Contémplalo: la CREACIÓN empieza con dos; la REVELACIÓN empieza con uno. El mundo arranca en la dualidad — y toda la historia es el camino de vuelta: que dentro de la casa del dos se escuche la voz del Uno. El Zohar lo sella: en la Bet se crea el mundo, pero la unidad no habita sino en la Álef (Zohar, Introducción 6:38).",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "La Bet grande con la que empieza todo" },
        fuente: {
          es: "Génesis 1:1 — 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ'. En la tradición masorética la Bet inicial se escribe GRANDE (así la muestra el propio texto de Sefaria): la puerta de entrada de toda la Torá es esta letra, agrandada para que no pases de largo.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Con sabiduría se construye la casa" },
        fuente: {
          es: "Proverbios 24:3-4 — 'בְּחָכְמָה יִבָּנֶה בָּיִת וּבִתְבוּנָה יִתְכּוֹנָן': con sabiduría se construye la casa, con entendimiento se afirma, y con conocimiento se llenan sus cámaras. Cf. Salmos 127:1 — 'si el Eterno no construye la casa, en vano trabajan sus constructores'.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "El mundo fue creado con Bet — versión del Yerushalmi" },
        fuente: {
          es: "Talmud Yerushalmi Jaguigá 2:1 — 'בְּבֵי״ת נִבְרָא הָעוֹלָם. מַה בֵּי״ת סָתוּם מִכָּל צְדָדָיו וּפָתוּחַ מִצַּד אֶחָד' (R. Yoná en nombre de R. Leví): cerrada por todos lados, abierta por uno — no indagues arriba, abajo, antes ni detrás. Y allí mismo: berajá vs. arirá, y los dos mundos creados con Hei y Yud ('כִּי בְּיָ-הּ', Isaías 26:4).",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Álef-Bet: aprende entendimiento" },
        fuente: {
          es: "Shabat 104a — los niños llegaron a la casa de estudio y dijeron cosas 'que ni en días de Yehoshúa bin Nun se dijeron': 'אָלֶ״ף בֵּי״ת — אֱלַף בִּינָה' (aprende entendimiento). El alfabeto entero leído como instrucción moral empieza con la pareja Álef-Bet: el uno y el dos, leídos juntos, ordenan aprender.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El norte: la dirección de la riqueza y del riesgo" },
        fuente: {
          es: "Bavá Batrá 25b — R. Yitzjak: 'הָרוֹצֶה שֶׁיַּחְכִּים יַדְרִים, וְשֶׁיַּעֲשִׁיר יַצְפִּין' (quien quiera hacerse sabio, mire al sur; quien quiera enriquecerse, al norte), 'y tu señal: la mesa al norte y la menorá al sur'. La misma página cita 'מִצָּפוֹן תִּפָּתַח הָרָעָה' (Jeremías 1:14). El norte — el lado abierto de la Bet según Ginsburgh — es a la vez abundancia y amenaza: lo que entra por el lado abierto depende de quién habita la casa. (El puente con la forma de la Bet es lectura nuestra.)",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "¿Por qué fue creado el mundo con Bet?" },
        fuente: {
          es: "Bereshit Rabá 1:10 — cuatro respuestas en cadena: cerrada por todos lados y abierta por delante (no indagues antes/arriba/abajo/detrás); dos mundos; berajá y no arirá ('¡y ojalá se sostenga!'); y las dos puntas que señalan — arriba ('Este que está arriba me creó') y atrás, hacia la Álef ('el Eterno es Su nombre'). Cierra con la queja de la Álef y su consuelo: אָנֹכִי en Sinaí.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La morada en lo bajo: la casa que Dios anhela" },
        fuente: {
          es: "Midrash Tanjumá Nasó 16 — R. Shmuel bar Najmán: 'בְּשָׁעָה שֶׁבָּרָא הַקָּבָּ״ה אֶת הָעוֹלָם נִתְאַוָּה שֶׁיְּהֵא לוֹ דִּירָה בַּתַּחְתּוֹנִים כְּמוֹ שֶׁיֵּשׁ בָּעֶלְיוֹנִים'. Siete pecados subieron la Shejiná siete firmamentos; siete justos la bajaron — hasta que Moshé la trajo a la tierra con el Mishcán: 'בָּאתִי לְגַנִּי' (Cantar 5:1).",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La esquina norte quedó sin terminar" },
        fuente: {
          es: "Pirkei deRabí Eliezer 3 — 'רוּחַ פִּנַּת הַצָּפוֹן — בְּרָאוֹ וְלֹא גְמָרוֹ': la esquina norte del mundo fue creada y no terminada; 'todo el que diga que es dios, que venga y termine esa esquina que dejé — y sabrán todos que no es dios'. De allí sale el mal: 'מִצָּפוֹן תִּפָּתַח הָרָעָה' (Jeremías 1:14). El mundo-casa tiene un lado abierto a propósito.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "La Bet gana la creación; la Álef, la unidad" },
        fuente: {
          es: "Zohar, Introducción 6:37-38 (ed. Vilna I, 2b-3b) — las letras desfilan de la Tav a la Álef pidiendo ser el instrumento de la creación. Entra la Bet: 'דְּבִי מְבָרְכָאן לָךְ לְעֵילָא וְתַתָּא — por mí te bendicen arriba y abajo'. El Santo responde: 'בָּךְ אִבְרֵי עָלְמָא — en ti crearé el mundo, y tú serás el comienzo'. Y a la Álef, que calló: 'aunque con la Bet creo el mundo, tú serás la cabeza de todas las letras: לֵית בִּי יִחוּדָא אֶלָּא בָּךְ — no hay unidad en Mí sino en ti'.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La Torá empieza con Bet porque empieza con bendición" },
        fuente: {
          es: "Sefer HaBahir 3 — '¿Por qué empieza la Torá con Bet? Porque empieza con בְּרָכָה (berajá)'. Y encadena: la Torá se llama berajá; בְּרֵאשִׁית — y no hay reshit sino Jojmá ('רֵאשִׁית חָכְמָה יִרְאַת ה'', Salmos 111:10). Bendición, comienzo y sabiduría: tres nombres de la misma Bet.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Bet, letra doble: la dura y la suave" },
        fuente: {
          es: "Sefer Yetzirá 4:1-4 — la Bet encabeza las siete letras DOBLES (בג״ד כפר״ת), que 'se conducen en dos lenguas': בּ dura y ב suave, 'estructura de fuerte y débil'. Cada doble rige un atributo y su opuesto; el de la Bet varía según la recensión — vida (חיים) en la versión impresa, sabiduría (חכמה) en la del Gra, que es la que sigue Ginsburgh. Hasta en su pronunciación la letra del dos es dos.",
        },
        href: "/mente-cosmica",
      },
    ],
    jasidut: [
      {
        titulo: { es: "Dirá batajtonim: el propósito de todos los mundos" },
        fuente: {
          es: "Tania, cap. 36 — 'מוּדַעַת זֹאת... שֶׁנִּתְאַוָּה הַקָּבָּ״ה לִהְיוֹת לוֹ דִּירָה בַּתַּחְתּוֹנִים': el fin del descenso de todos los mundos no son los mundos superiores, sino ESTE mundo, el más bajo — porque cuando la oscuridad se vuelve luz ('כַּד אִתְכַּפְיָא סִטְרָא אָחֳרָא וְאִתְהַפֵּךְ חֲשׁוֹכָא לִנְהוֹרָא') brilla 'יִתְרוֹן אוֹר מִן הַחֹשֶׁךְ' — más que en los mundos altos. La Bet de la creación es el plano de esa casa.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El canal de la Bet: de Jojmá a Jésed" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' — tabla de la Bet (inner.org/alefbeit/sigbeit): concepto, 'el propósito de la creación: una morada para Dios abajo'; forma, 'recinto de tres lados, abierto por la izquierda, el lado norte'; don: sabiduría; arquetipo: Abraham; canal: de Jojmá a Jésed. La sabiduría que baja a hacerse bondad — 'עוֹלָם חֶסֶד יִבָּנֶה' (Salmos 89:3) — es el trazado de esta letra en el Árbol.",
        },
        href: "/arbol",
      },
    ],
  },

  fuentes: [
    { es: "Génesis 1:1 — בְּרֵאשִׁית: la Torá abre con la Bet, escrita grande en la tradición masorética." },
    { es: "Bereshit Rabá 1:10 — la Bet cerrada por todos lados y abierta por delante; dos mundos; berajá vs. arirá; las dos puntas (עוקצין) que señalan; la queja de la Álef y su consuelo en Sinaí (אנכי)." },
    { es: "Talmud Yerushalmi Jaguigá 2:1 — paralelo exacto: 'בבי״ת נברא העולם... סתום מכל צדדיו ופתוח מצד אחד'; berajá/arirá; los dos mundos con Hei y Yud (Isaías 26:4)." },
    { es: "Midrash Tanjumá Nasó 16 — 'נתאוה שיהא לו דירה בתחתונים': la morada en lo bajo; el descenso y retorno de la Shejiná; 'באתי לגני' (Cantar 5:1)." },
    { es: "Tania, Likutei Amarim cap. 36 — 'שנתאוה הקב״ה להיות לו דירה בתחתונים'; el propósito es este mundo; יתרון אור מן החושך." },
    { es: "Zohar, Introducción 6:37-38 (ed. Vilna I, 2b-3b) — la Bet elegida para crear ('בך אברי עלמא'); la unidad reservada a la Álef ('לית בי יחודא אלא בך')." },
    { es: "Sefer HaBahir 3 — la Torá empieza con Bet porque empieza con berajá; reshit = Jojmá (Salmos 111:10)." },
    { es: "Shabat 104a — 'אל״ף בי״ת — אלף בינה': los niños leen el alfabeto como instrucción." },
    { es: "Bavá Batrá 25b — 'הרוצה שיחכים ידרים ושיעשיר יצפין'; allí mismo, 'מצפון תפתח הרעה' (Jeremías 1:14)." },
    { es: "Pirkei deRabí Eliezer 3 — la esquina norte creada y no terminada; de allí sale el mal (Jeremías 1:14)." },
    { es: "Sefer Yetzirá 4:1-4 — Bet, primera de las siete dobles (בג״ד כפר״ת), dos pronunciaciones; 4:2 asigna los atributos." },
    { es: "Proverbios 24:3-4 · Salmos 127:1 · Salmos 89:3 — la casa construida con sabiduría; la casa que construye el Eterno; el mundo construido con jésed." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' — tabla de la Bet (inner.org/alefbeit/sigbeit): morada abajo · recinto de tres lados abierto al norte · don: sabiduría · arquetipo: Abraham · canal Jojmá→Jésed." },
    { es: "Gematrías calculadas: ב = 2 · בית = 2+10+400 = 412. No se incluye ninguna equivalencia de 412 por no haberse verificado ninguna." },
    { es: "Nota de precisión (1): el vínculo בַּיִת↔בָּנָה ('construir') es drash, no etimología demostrada — báyit es sustantivo primitivo." },
    { es: "Nota de precisión (2): la fórmula 'דירה בתחתונים' tal como suele citarse es la redacción del Tania (cap. 36); la fuente midráshica es Tanjumá Nasó 16, con redacción propia. El puente 'lado abierto de la Bet ↔ esquina norte inconclusa (PdRE 3)' es lectura nuestra, no cita clásica." },
    { es: "Nota de precisión (3): las recensiones de Sefer Yetzirá difieren en el atributo de la Bet — חיים (vida) en la impresa, חכמה (sabiduría) en la del Gra, que es la que sigue Ginsburgh ('Gift: Wisdom')." },
  ],
};
