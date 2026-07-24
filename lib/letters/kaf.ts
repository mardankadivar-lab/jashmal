import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  KAF (כ) — Data de la undécima letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Isaías 49:16 — הֵן עַל־כַּפַּיִם חַקֹּתִיךְ ("en Mis palmas te tengo grabada").
//   · Éxodo 33:22-23 — וְשַׂכֹּתִי כַפִּי עָלֶיךָ: la palma de Dios cubre a Moshé
//     mientras pasa Su kavod (כְּבֹדִי). Leído en hebreo en Sefaria.
//   · Génesis 32:25-26, 32:33 — כַּף־יֶרֶךְ יַעֲקֹב (la kaf del muslo de Yaakov).
//   · Éxodo 25:29 / Números 7:14 — las כַּפּוֹת (cucharas ahuecadas) del Mishcán.
//   · I Reyes 18:44 — עָב קְטַנָּה כְּכַף־אִישׁ (nube pequeña como palma de hombre).
//   · Deuteronomio 2:5 — מִדְרַךְ כַּף־רָגֶל (la planta del pie también es kaf).
//   · Levítico 23:40 — כַּפֹּת תְּמָרִים (las palmas de dátil de Sucot).
//   · Shabat 104a — serie ז״ח ט״י כ״ל: "...וְקוֹשֵׁר לְךָ כֶּתֶר לָעוֹלָם הַבָּא"
//     (la כ = Él te ata una CORONA). Mismo folio: מנצפ״ך צופים אמרום (las cinco
//     finales, incluida ך). OJO: el drash de dobladas/extendidas del folio cubre
//     SOLO nun, pe y tzadi — no la kaf (ver NOTA DEL SOFER).
//   · Avot 1:6 — וֶהֱוֵי דָן אֶת כָּל הָאָדָם לְכַף זְכוּת (el platillo del mérito).
//   · Avot 5:21 — בֶּן עֶשְׂרִים לִרְדֹּף (a los veinte, perseguir).
//   · Éxodo 30:13-14 — el shékel sagrado = 20 guerá; el censo desde los 20 años.
//   · Menajot 43b — R. Meir: cien bendiciones cada día (מֵאָה בְּרָכוֹת).
//   · Génesis 21:5 — Abraham de cien años al nacer Itzjak.
//   · Bereshit Rabá 77:3 — "tocó la kaf de su muslo": tocó a los justos y
//     profetas que saldrían de él (el dor hashmad).
//   · Sefer Yetzirá cap. 4 — Kaf es letra DOBLE (בג״ד כפר״ת). Recensión impresa
//     4:8: sol (חמה) · miércoles · oído izquierdo. Recensión del Gra 4:11:
//     coronada con VIDA (חיים) · Venus (נוגה) · miércoles · ojo izquierdo.
//     DIFIEREN (salvo el miércoles); Ginsburgh sigue al Gra/Arizal.
//   · R. Ginsburgh, inner.org/alefbeit/sigkaf (verificado en vivo): concepto
//     "actualizar el potencial propio"; sentidos: palma / nube / someter; forma:
//     "recinto de tres lados de esquinas redondeadas, semejante a la corona de
//     una cabeza vista de perfil"; kaf final: "la misma figura con la base
//     caída en extensión vertical"; Venus · miércoles · ojo izquierdo · don:
//     vida · arquetipo: Moshé · canal: de Jésed a Nétzaj.
//  Gematrías (calculadas letra por letra, verificadas con Python):
//    כ = 20 · nombre pleno כף = 20+80 = 100 · כתר = 20+400+200 = 620
//    כבוד = 20+2+6+4 = 32 = לב (30+2) · כח = 20+8 = 28
//
//  NOTA DEL SOFER — descartado por no verificable:
//   · La atribución "Shabat 104a dice de la kaf kisé lakavod (trono de gloria)"
//     es FALSA leyendo el folio: lo que dice es וְקוֹשֵׁר לְךָ כֶּתֶר לָעוֹלָם
//     הַבָּא (corona, no trono). La ecuación kaf = כִּסֵּא + כָּבוֹד circula en
//     nombre de Otiyot deRabí Akivá, que no pude verificar en Sefaria: fuera.
//   · El drash "kaf kefufá = el que se inclina" NO está en Shabat 104a (allí
//     solo nun, pe y tzadi reciben la lectura doblado/recto); aquí se presenta
//     como extensión nuestra del patrón talmúdico, marcada como drash.
//   · El valor 500 para la ך final (convención מנצפ״ך = 500-900) no se incluye:
//     no logré anclarlo a fuente clásica exacta en esta sesión.
// ─────────────────────────────────────────────────────────────────────────

export const kaf: LetterData = {
  slug: "kaf",
  letter: "כ",
  nameTranslit: { es: "Kaf", en: "Kaf", fa: "کاف" },
  nameHe: "כַּף",
  value: 20,

  level1: {
    es: "Abre tu mano y mírala de perfil: los dedos arriba, la muñeca abajo, el hueco en medio. Acabas de dibujar esta letra. La Kaf ES la palma — su nombre significa exactamente eso, כַּף הַיָּד, la palma de la mano — y su trazo es una curva que se dobla para poder contener. Todas las letras anteriores eran rectas, puntos, líneas; la Kaf es la primera que se INCLINA. Y aquí está lo desconcertante: con esta letra doblada empieza כֶּתֶר, Kéter, la corona — lo más alto de todo el Árbol. El Talmud lo dice sin rodeos: la kaf es la letra con la que Dios 'te ata una corona'. Quédate con esa pregunta antes de seguir: ¿cómo puede la letra que se dobla ser la letra que corona?",
    en: "Open your hand and look at it in profile: fingers above, wrist below, a hollow in between. You have just drawn this letter. The Kaf IS the palm — its name means exactly that, kaf hayad, the palm of the hand — and its stroke is a curve that bends in order to hold. Every letter before it was straight: points, lines; the Kaf is the first one that BOWS. And here is the riddle: with this bent letter begins Keter, the Crown — the highest point of the entire Tree. The Talmud says it plainly: the kaf is the letter with which God 'ties a crown for you'. Sit with the question before you read on: how can the letter that bends be the letter that crowns?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "כַּף significa 'palma de la mano', y a diferencia de otros nombres de letras, este es bíblico hasta la médula: el Tanaj está lleno de kaf. La palma donde Dios graba a Su pueblo (Isaías 49:16). La palma del pie — מִדְרַךְ כַּף־רָגֶל, 'la pisada de la planta' (Deuteronomio 2:5). La kaf del muslo de Yaakov, la cavidad de la cadera que el ángel tocó (Génesis 32:26). Las כַּפּוֹת del Mishcán — las cucharas ahuecadas de oro puro para el incienso (Éxodo 25:29; Números 7:14: 'una kaf de diez siclos de oro, llena de incienso'). Las כַּפֹּת תְּמָרִים, las palmas de dátil de Sucot (Levítico 23:40). Y hasta una nube: cuando Eliahu ora por lluvia en el Carmel, lo primero que sube del mar es 'una nube pequeña como la kaf de un hombre' (I Reyes 18:44) — por eso Rav Ginsburgh lista entre los sentidos de la letra 'palma; nube; someter'.\n\nMira la lista otra vez y verás lo que todas esas cosas comparten: ninguna es plana. Palma, planta, cavidad, cuchara, nube — todo lo que se llama kaf es una superficie CURVADA, un hueco capaz de sostener algo. El nombre viene de la idea de doblarse (de ahí el verbo rabínico לִכְפּוֹת, someter, doblegar — el tercer sentido de Ginsburgh). Y la gramática guarda el mismo secreto en pequeño: la כְּ como prefijo es la 'kaf de la semejanza' (כ״ף הַדִּמְיוֹן), la partícula que significa 'como'. La letra que se curva para contener cosas es también la que se curva para comparar: acercar una cosa a otra sin que sean la misma. La Kaf es, entonces, la letra de la capacidad: la forma que adopta lo recto cuando decide sostener algo distinto de sí.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Kaf enseña cómo sostiene la creación: doblándose. Nada plano puede contener; para que haya un adentro hace falta una curva. La cuchara del Mishcán sostiene el incienso porque es hueca; la nube de Eliahu sostiene la lluvia entera de Israel siendo apenas 'como la palma de un hombre'. Fíjate en esa nube: es diminuta, y de ella viene el diluvio de bendición. Así funciona el mundo según la kaf — lo actual cabe en una palma; lo potencial que esa palma sostiene no tiene medida. (El puente nube→potencial es lectura nuestra sobre el versículo; la imagen es del texto.)",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Kaf es el platillo de la balanza con el que juzgas. La Mishná usa exactamente esta palabra: וֶהֱוֵי דָן אֶת כָּל הָאָדָם לְכַף זְכוּת — 'juzga a todo hombre hacia la kaf del mérito' (Avot 1:6). Tu mano puede cerrarse en puño o ahuecarse en palma; con la misma anatomía golpeas o recibes. La kaf del alma es esa elección repetida mil veces al día: ante cada persona, ¿inclinas la balanza hacia qué platillo? La letra que se dobla te pide doblarte tú — hacia el lado del mérito.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Kaf es la palma de Dios. 'הֵן עַל־כַּפַּיִם חַקֹּתִיךְ — en Mis palmas te tengo grabada' (Isaías 49:16): no escrita con tinta, grabada en la carne de la mano. Y hay una escena donde esa palma se vuelve refugio: cuando Moshé pide ver la gloria, Dios lo pone en la hendidura de la roca y dice וְשַׂכֹּתִי כַפִּי עָלֶיךָ — 'te cubriré con Mi palma mientras pasa Mi kavod' (Éxodo 33:22-23). Lee las dos palabras juntas: la כַּף cubre mientras pasa el כָּבוֹד — y ambas empiezan con kaf. La gematría sella el vínculo: כָּבוֹד = 32 = לֵב, el corazón, los 32 senderos de la sabiduría. La palma divina no te muestra la gloria: te protege de ella para que sobrevivas a su paso. Contener también es eso — cubrir a tiempo.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh describe la Kaf con precisión: 'un recinto de tres lados con esquinas redondeadas, que se asemeja a la corona de una cabeza vista de perfil' (inner.org, The Hebrew Letters). Dos imágenes en una: es una palma ahuecada — techo, espalda curva y base, abierta hacia el lado por donde viene la escritura — y es, vista de perfil, la coronilla de una cabeza inclinada. La letra entera es una reverencia congelada en tinta.\n\nY la Kaf tiene una segunda vida: es de las cinco letras que cambian al final de la palabra (מנצפ״ך — 'las finales las dijeron los vigías', Shabat 104a). La כ doblada se convierte en ך: Ginsburgh la describe como 'la misma figura con la base caída en extensión vertical' — la curva se suelta y la pierna baja recta, atravesando el renglón hacia abajo. En medio de la palabra, la kaf se dobla y contiene; al final de la palabra, se extiende y suelta. El Talmud aplica la lectura 'doblado y recto' a la nun, la pe y la tzadi ('fiel doblado, fiel erguido' — Shabat 104a); a la kaf no se la aplica, así que dilo con honestidad: extender ese patrón a la kaf es drash nuestro. Pero el trazo mismo lo predica: hay un tiempo de curvarse para sostener, y un tiempo — cuando la palabra termina — de abrir la mano y dejar que baje.",
    },
    partes: [
      {
        label: { es: "El techo (la cubierta)", en: "The roof (the cover)", fa: "سقف" },
        significado: {
          es: "El trazo superior, curvado en su esquina. Es lo que la palma hace cuando se pone encima: cubrir. La palma de Dios sobre Moshé en la roca — וְשַׂכֹּתִי כַפִּי עָלֶיךָ (Éxodo 33:22) — es exactamente este trazo: una cubierta que protege mientras pasa lo que ningún ojo resistiría. En la lectura de Ginsburgh, este contorno superior es la coronilla: lo más alto de la cabeza, el lugar donde se posa la corona.",
        },
        svgPathId: "kaf-roof",
      },
      {
        label: { es: "La espalda curva", en: "The curved back", fa: "پشت" },
        significado: {
          es: "El trazo vertical doblado que une techo y base. Es la espalda de quien se inclina — la kefifá, la curvatura que da nombre a la forma. Ninguna letra anterior del alfabeto se dobla así. La espalda curva es el precio de contener: para sostener algo que no eres tú, tienes que ceder tu línea recta. Es el gesto del platillo de la balanza (כַּף זְכוּת) y el de la reverencia.",
        },
        svgPathId: "kaf-back",
      },
      {
        label: { es: "La base (la palma abierta)", en: "The base (the open palm)", fa: "کف" },
        significado: {
          es: "El trazo inferior: la palma propiamente dicha, la superficie donde se posa lo sostenido. Está abierta hacia la izquierda — hacia donde la palabra continúa — porque una palma cerrada ya no es kaf, es puño. En la kaf final (ך) esta base se suelta y cae en vertical: la mano que sostuvo durante toda la palabra se abre al terminarla y deja que lo contenido descienda.",
        },
        svgPathId: "kaf-base",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Kaf es la forma de todo recipiente: tres lados y una apertura. Un vaso totalmente cerrado no puede recibir; uno totalmente abierto no puede retener. La creación entera está hecha de kafs — cavidades que sostienen: la cuenca del mar, la cavidad de la cadera (כַּף־יֶרֶךְ), la cuchara de oro del incienso. El mundo subsiste porque hay huecos con la curvatura exacta para lo que deben cargar.",
    },
    almas: {
      es: "En el alma, la espalda curva de la Kaf es la pregunta de tu postura. Doblarse puede ser sumisión o puede ser capacidad: el que se inclina ante lo que ama no se humilla — se ahueca, hace espacio. La kaf te enseña a distinguir tus dos manos: el puño que retiene y la palma que sostiene. Y su forma final te enseña el tercer gesto, el más difícil: al final de la palabra, abrir la mano. Lo que sostuviste no era tuyo; era tuyo el sostenerlo.",
    },
    divinidad: {
      es: "En lo divino, la Kaf de perfil es la coronilla de una cabeza — y sobre la coronilla se posa Kéter, la corona, que empieza con kaf. Ginsburgh asigna además a la letra el canal que baja de Jésed a Nétzaj en el Árbol: el amor volviéndose victoria duradera, el gesto generoso hecho constancia. La corona no está DENTRO de la cabeza sino envolviéndola por encima: así lo trascendente rodea a la mente sin caber en ella — como una palma cubre sin aplastar.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 20,
    guematriaForma: {
      es: "כ = 20 · nombre pleno כף = 20 + 80 = 100 · con kaf empiezan כֶּתֶר = 620 y כָּבוֹד = 32 = לֵב",
    },
    mundos: {
      es: "20 es, en la Torá, el número del valor declarado. El shékel del Santuario — la moneda con la que se pesa lo sagrado — vale exactamente veinte: עֶשְׂרִים גֵּרָה הַשֶּׁקֶל (Éxodo 30:13). Y el censo de Israel cuenta מִבֶּן עֶשְׂרִים שָׁנָה וָמָעְלָה, 'de veinte años para arriba' (Éxodo 30:14): antes de los veinte se existe; a los veinte se CUENTA. La kaf es el número en que lo que eras en potencia entra en la balanza pública del mundo — cada contado aportando su medio shékel, la mitad de una kaf, porque nadie es la cuenta completa solo.",
    },
    almas: {
      es: "20 es la edad del despliegue: בֶּן עֶשְׂרִים לִרְדֹּף — 'a los veinte, perseguir' (Avot 5:21). Cinco años para el texto, diez para la Mishná, trece para las mitzvot… y a los veinte, por fin, correr tras lo tuyo. Es la cifra exacta del concepto que Ginsburgh da a la letra: 'la capacidad de actualizar el potencial propio'. Hasta los veinte acumulas; a los veinte la palma se abre y va a buscar. Nota también el cálculo simple: 20 = 10 + 10, dos yods — como dos manos; leerlo como 'la yod duplicada que se vuelve palma' es drash nuestro, pero la aritmética es exacta.",
    },
    divinidad: {
      es: "El nombre pleno de la letra, כף, suma 100 — el número redondo de la plenitud: Abraham tenía cien años cuando nació Itzjak (Génesis 21:5), y R. Meir enseña que el judío bendice מֵאָה בְּרָכוֹת, cien bendiciones cada día (Menajot 43b). Cien palmas abiertas por día hacia el Dador — el puente entre la cifra y la letra es lectura nuestra; las fuentes son exactas. Y la corona lo sella: el Talmud enseña que por las letras כ״ל el Santo 'te ata un KÉTER para el mundo venidero' (Shabat 104a), y כתר suma 620. La letra que vale 20 abre la palabra que vale 620: lo que se dobla aquí abajo es coronado allá arriba.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "Grabada en las palmas de Dios" },
        fuente: {
          es: "Isaías 49:16 — 'הֵן עַל־כַּפַּיִם חַקֹּתִיךְ': cuando Sion dice 'Dios me olvidó', la respuesta no es 'te recuerdo' sino 'te tengo GRABADA en Mis palmas'. Lo escrito se borra; lo grabado en la kaf viaja con la mano a todas partes.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La kaf del muslo de Yaakov" },
        fuente: {
          es: "Génesis 32:26 — 'וַיִּגַּע בְּכַף־יְרֵכוֹ וַתֵּקַע כַּף־יֶרֶךְ יַעֲקֹב': el ángel no puede con Yaakov y toca la kaf de su cadera — la cavidad donde el fémur se articula. De ahí el gid hanashé prohibido 'hasta el día de hoy' (Génesis 32:33). Lo único vulnerable del que lucha con Dios es su hueco — el punto donde una cosa sostiene a otra.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Una nube pequeña como la palma de un hombre" },
        fuente: {
          es: "I Reyes 18:44 — a la séptima vez (בַּשְּׁבִעִית), el sirviente de Eliahu ve subir del mar 'עָב קְטַנָּה כְּכַף־אִישׁ' — y de esa palma de vapor sale la lluvia que termina la sequía de años. De aquí toma Ginsburgh el sentido 'nube' de la letra.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "La kaf con la que se ata la corona" },
        fuente: {
          es: "Shabat 104a — los niños en la casa de estudio leyeron el alfabeto entero como enseñanza; en la serie ז״ח ט״י כ״ל: 'si actúas así, el Santo te nutre (ז), te agracia (ח), te hace bien (ט), te da herencia (י) — וְקוֹשֵׁר לְךָ כֶּתֶר לָעוֹלָם הַבָּא: y te ATA UNA CORONA (כ) para el mundo venidero (ל)'. La kaf es, en boca de los niños, el nudo de la corona.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Las finales las dijeron los vigías" },
        fuente: {
          es: "Shabat 104a — 'מַנְצְפַךְ צוֹפִים אֲמָרוּם': las cinco letras finales (entre ellas la ך) las enunciaron los tzofim/profetas — olvidadas y vueltas a fundar. (Precisión: el drash 'doblado y recto' de ese folio se aplica a nun, pe y tzadi — נֶאֱמָן כָּפוּף נֶאֱמָן פָּשׁוּט — no a la kaf; leer así también a la kaf es extensión nuestra.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El platillo del mérito" },
        fuente: {
          es: "Mishná Avot 1:6 — Yehoshúa ben Perajiá: 'עֲשֵׂה לְךָ רַב, וּקְנֵה לְךָ חָבֵר, וֶהֱוֵי דָן אֶת כָּל הָאָדָם לְכַף זְכוּת' — hazte de un maestro, cómprate un compañero, y juzga a todo hombre hacia la kaf del mérito. Cf. Menajot 43b: R. Meir y las cien bendiciones diarias (מֵאָה = el valor del nombre pleno כף, 100 — puente nuestro).",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "Tocó la kaf: tocó a los que vendrían" },
        fuente: {
          es: "Bereshit Rabá 77:3 — sobre 'וַיִּגַּע בְּכַף יְרֵכוֹ': 'tocó a los justos y las justas, los profetas y las profetisas que saldrían de él — el dor hashmad (la generación de la persecución)'. La kaf del muslo es el futuro contenido en el cuerpo: herir el hueco es herir lo que aún no nació de él.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Kaf, letra doble: miércoles, y la corona atada" },
        fuente: {
          es: "Sefer Yetzirá cap. 4 — la Kaf es una de las siete DOBLES (בג״ד כפר״ת), de doble pronunciación (כּ/כ). Recensión impresa 4:8: 'הִמְלִיךְ אוֹת כ׳ וְקָשַׁר לוֹ כֶּתֶר' — sol en el mundo, miércoles en el año, oído izquierdo en el alma. Recensión del Gra 4:11: coronada 'בְּחַיִּים' (con VIDA) — Venus, miércoles, ojo izquierdo. Las recensiones difieren (coinciden solo en el miércoles); Ginsburgh sigue al Gra. Su opuesto (תמורה): vida ↔ muerte.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El sendero de Jésed a Nétzaj" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sigkaf) — el canal de la Kaf baja de Jésed a Nétzaj: el amor que se vuelve perseverancia, la bondad que aprende a durar. Actualizar el potencial es exactamente ese descenso: lo que amas un instante (Jésed) sostenido hasta que vence (Nétzaj).",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "Kavod = 32 = Lev: la gloria pesa lo que el corazón" },
        fuente: {
          es: "Gematría calculada: כבוד = 20+2+6+4 = 32 = לב (30+2) — los 32 senderos de la sabiduría con que abre el Sefer Yetzirá (ל״ב נתיבות). Y en Éxodo 33:22, mientras pasa el כָּבוֹד, la כַּף divina cubre a Moshé: las dos palabras de la kaf, gloria y palma, en un solo versículo. (La igualdad numérica es cálculo exacto; leer kavod-lev como clave de la kaf es drash.)",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "La capacidad de actualizar tu potencial" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sigkaf) — concepto de la Kaf: 'la capacidad de actualizar el potencial propio'. Sus sentidos: palma, nube, someter; su forma: la corona de una cabeza de perfil; su don: la vida (buena salud); su arquetipo: Moshé — el hombre al que la propia kaf de Dios cubrió en la roca (Éxodo 33:22, puente nuestro entre la tabla y el versículo). En hebreo, 'potencial' se dice כֹּחַ — y empieza con kaf.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Isaías 49:16 — הֵן עַל־כַּפַּיִם חַקֹּתִיךְ: grabada en las palmas de Dios." },
    { es: "Éxodo 33:22-23 — וְשַׂכֹּתִי כַפִּי עָלֶיךָ: la palma divina cubre a Moshé mientras pasa Su kavod." },
    { es: "Génesis 32:25-26 y 32:33 — כַּף־יֶרֶךְ יַעֲקֹב y el gid hanashé." },
    { es: "Éxodo 25:29 y Números 7:14 — las כַּפּוֹת (cucharas ahuecadas) del Mishcán; 'una kaf de diez siclos de oro llena de incienso'." },
    { es: "I Reyes 18:44 — עָב קְטַנָּה כְּכַף־אִישׁ: la nube pequeña como palma, a la séptima vez." },
    { es: "Deuteronomio 2:5 — מִדְרַךְ כַּף־רָגֶל: la planta del pie como kaf." },
    { es: "Levítico 23:40 — כַּפֹּת תְּמָרִים: las palmas de dátil de Sucot." },
    { es: "Shabat 104a — serie ז״ח ט״י כ״ל ('...וקושר לך כתר לעולם הבא'); מנצפ״ך צופים אמרום; el drash doblado/recto para nun, pe, tzadi." },
    { es: "Mishná Avot 1:6 — לְכַף זְכוּת (el platillo del mérito); Avot 5:21 — בן עשרים לרדוף." },
    { es: "Éxodo 30:13-14 — el shékel de 20 guerá y el censo desde los veinte años." },
    { es: "Menajot 43b — R. Meir: cien bendiciones cada día; Génesis 21:5 — Abraham de cien años." },
    { es: "Bereshit Rabá 77:3 — la kaf del muslo: los justos y profetas futuros; el dor hashmad." },
    { es: "Sefer Yetzirá cap. 4 — Kaf letra doble (בג״ד כפר״ת). Impresa 4:8: sol · miércoles · oído izquierdo. Gra 4:11: vida (חיים) · Venus · miércoles · ojo izquierdo. Las recensiones difieren; Ginsburgh sigue al Gra." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' (inner.org/alefbeit/sigkaf) — concepto, sentidos, forma, kaf final, Venus/miércoles/ojo izquierdo, don: vida, arquetipo: Moshé, canal Jésed→Nétzaj." },
    { es: "Gematrías calculadas: כ = 20 · כף = 20+80 = 100 · כתר = 620 · כבוד = 32 = לב · כח = 28." },
    { es: "Nota de precisión: son drash (y así se marcan): extender 'doblado/recto' a la kaf (Shabat 104a solo lo dice de nun/pe/tzadi); nube→potencial en I Reyes 18:44; 100→cien bendiciones; 20 = dos yods; Moshé bajo la kaf como ilustración del arquetipo de Ginsburgh. Descartado por no verificable: kaf = 'kisé lakavod' (atribuido a Otiyot deRabí Akivá) — Shabat 104a dice כתר, no כסא." },
  ],
};
