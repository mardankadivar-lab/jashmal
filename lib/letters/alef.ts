import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  ÁLEF (א) — Data de la primera letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Job 33:33 — וַאֲאַלֶּפְךָ חָכְמָה, "te enseñaré sabiduría": la raíz א-ל-ף.
//   · Génesis 36:15 (אַלּוּפֵי, jefes) · Salmos 55:14 (אַלּוּפִי, mi maestro-íntimo)
//     · Miqueas 7:5 (בְּאַלּוּף) · Proverbios 16:28 (מַפְרִיד אַלּוּף) con Rashi:
//     "aparta de sí al אַלּוּפוֹ שֶׁל עוֹלָם" (citando Bereshit Rabá 20:2).
//   · Salmos 105:8 — דָּבָר צִוָּה לְאֶלֶף דּוֹר (élef = mil).
//   · Proverbios 14:4 — בְּאֵין אֲלָפִים (alafim = bueyes; el sentido "buey" del nombre).
//   · Génesis 1:2, 1:6-7 — agua en agua; el firmamento separa aguas de aguas.
//   · Éxodo 20:2 — אָנֹכִי abre los Diez Mandamientos con Álef (grafía verificada).
//   · Deuteronomio 6:4 — אֶחָד · Deuteronomio 4:35 — אֵין עוֹד מִלְּבַדּוֹ.
//   · II Samuel 7:23 — גּוֹי אֶחָד בָּאָרֶץ.
//   · Bereshit Rabá 1:10 — la Torá empieza con Bet; el Álef reclama 26
//     generaciones ante el Trono y es compensado con el אָנֹכִי del Sinaí;
//     R. Hoshaya: se llama álef por אֶלֶף דּוֹר (Salmos 105:8).
//   · Shemot Rabá 12:3 — el decreto anulado en Sinaí: "los de abajo subirán,
//     los de arriba bajarán — וַאֲנִי הַמַּתְחִיל" (Éxodo 19:20; cf. 20:18).
//   · Shabat 104a — אָלֶ״ף בֵּי״ת: אֲלַף בִּינָה ("aprende entendimiento").
//   · Jaguigá 14b — R. Akivá en el Pardés: "no digáis מַיִם מַיִם".
//   · Shabat 55a — R. Janiná: חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא אֱמֶת.
//   · Séfer Yetzirá 2:1 / 3:6 — Álef, letra MADRE (אמ״ש); "hizo reinar la
//     letra Álef sobre el רוּחַ (aire/aliento)"; el aire media entre fuego y agua (3:3).
//   · Zohar, Introducción §6 (= Zohar I:2b-3a) — las letras ante el Creador; el
//     Álef calla y recibe: לֵית בִּי יִחוּדָא אֶלָּא בָּךְ ("no hay unidad en Mí sino en ti").
//   · R. Yitzchak Ginsburgh, "The Hebrew Letters" (inner.org/hebleter/alef.htm) —
//     marco 3×3 completo; la forma yud-vav-yud como aguas y firmamento la
//     atribuye Ginsburgh al ARIZAL (se cita así, vía Ginsburgh, sin folio de Etz Jaim).
//  Gematrías (calculadas letra por letra):
//    forma: י(10) + ו(6) + י(10) = 26 = יהוה (10+5+6+5 = 26)
//    nombre pleno אלף = 1+30+80 = 111 = פלא (80+30+1) — las MISMAS letras invertidas
//    אחד = 1+8+4 = 13 · אהבה = 1+5+2+5 = 13 · 13+13 = 26
//    גולה = 3+6+30+5 = 44 · גאולה = 3+1+6+30+5 = 45 (drash: entra la א)
//
//  NOTA DEL SOFER — descartado por no verificable:
//   · La enseñanza atribuida a R. Menajem Mendel de Rymanov ("en Sinaí solo se
//     oyó la álef de אָנֹכִי"), difundida vía Gershom Scholem, no pudo anclarse
//     a fuente jasídica primaria → NO se incluye.
//   · El midrash de "las aguas inferiores lloran por estar lejos del Rey" no
//     pudo anclarse a folio exacto (se cita vagamente de Tikunéi Zohar) → NO se
//     cita; el anhelo de las aguas de abajo se expresa sin atribuirlo.
//   · El drash golá→gueulá (la א del Aluf entra en el exilio) se presenta como
//     DRASH jasídico recogido por Ginsburgh: la aritmética está verificada
//     (44+1=45), la atribución clásica exacta no — y así se dice.
//   · El puente "26 generaciones del reclamo del Álef (BR 1:10) ↔ 26 de la
//     forma yud-vav-yud" es lectura nuestra, no cita clásica; se marca.
// ─────────────────────────────────────────────────────────────────────────

export const alef: LetterData = {
  slug: "alef",
  letter: "א",
  nameTranslit: { es: "Álef", en: "Alef", fa: "آلِف" },
  nameHe: "אָלֶף",
  value: 1,

  level1: {
    es: "Mírala en silencio, porque el silencio es su idioma. El Álef es la única letra del alfabeto que no tiene sonido propio: es la apertura de la garganta ANTES de que salga la voz — el instante en que ya decidiste hablar y todavía no dijiste nada. Y sin embargo, mira su cuerpo: una Yud arriba, una Yud abajo, y una Vav diagonal que las une. Diez, más seis, más diez: veintiséis. El valor exacto del Nombre de Dios. La letra muda lleva el Nombre escondido en su forma. La Torá no empieza con ella — empieza con Bet — pero cuando Dios mismo habló en el Sinaí, abrió con Álef: אָנֹכִי. Antes de leer una palabra más, quédate con esta pregunta: ¿cómo puede el silencio ser la primera de todas las voces?",
    en: "Look at it in silence, because silence is its language. The Alef is the only letter of the alphabet with no sound of its own: it is the opening of the throat BEFORE the voice comes out — the instant when you have already decided to speak and have not yet said anything. And yet, look at its body: a Yud above, a Yud below, and a diagonal Vav joining them. Ten, plus six, plus ten: twenty-six. The exact value of God's Name. The silent letter carries the Name hidden in its form. The Torah does not begin with it — it begins with Bet — but when God Himself spoke at Sinai, He opened with Alef: Anochi. Before reading one more word, stay with this question: how can silence be the first of all voices?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "אָלֶף viene de una raíz que es un espectro entero: א-ל-ף. En su punto más bajo significa buey — אֲלָפִים, el ganado que ara: 'donde no hay bueyes, el pesebre está vacío' (Proverbios 14:4). En su punto medio significa aprender y enseñar: וַאֲאַלֶּפְךָ חָכְמָה, 'te enseñaré sabiduría', le dice Elihú a Job (Job 33:33) — el único lugar del Tanaj donde la raíz aparece desnuda como verbo de enseñanza. De ahí sube a אַלּוּף, el que ya aprendió: maestro, jefe, campeón — los alufim de Esav (Génesis 36:15), el 'alufí' del salmista, 'mi igual, mi íntimo' (Salmos 55:14), el aluf en quien no debes confiar ciegamente (Miqueas 7:5). Y en su punto más alto, Rashi lee 'el murmurador aparta al aluf' (Proverbios 16:28) como: aparta de sí al אַלּוּפוֹ שֶׁל עוֹלָם — al Maestro del mundo (citando Bereshit Rabá 20:2). El mismo nombre significa también אֶלֶף, mil: 'la palabra que ordenó para mil generaciones' (Salmos 105:8). Ese es el arco completo de la primera letra: el buey que ara, el alumno que aprende, el maestro que enseña, el Maestro del mundo — y el mil, la multiplicidad entera que brota del Uno. Ginsburgh lo resume en cuatro palabras: buey, mil, enseñanza, maestro. No son cuatro significados sueltos: son una sola energía subiendo.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), el Álef es el buey: la fuerza bruta de la realidad física, la energía todavía sin refinar. 'Donde no hay bueyes, el pesebre está vacío; mas la abundancia de cosechas viene por la fuerza del buey' (Proverbios 14:4). El mundo funciona porque hay una potencia enorme y muda uncida al yugo — y del buey uncido sale el mil: la multiplicación, la cosecha, el élef. La creación entera es esto: una fuerza infinita que aceptó un yugo para volverse pan.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), el Álef es el aprender: וַאֲאַלֶּפְךָ חָכְמָה, 'te enseñaré sabiduría' (Job 33:33). Fíjate en la condición que pone el versículo justo antes: הַחֲרֵשׁ — 'calla'. Primero el silencio, después la enseñanza. Esa es la mecánica del alma-álef: solo aprende el que se vacía; solo recibe sabiduría el que hace espacio callando. La raíz del alma, enseña Ginsburgh, se deriva de la sabiduría misma de Dios — y por eso aprender no es acumular: es volver a la fuente. El talmid y el aluf son la misma palabra en dos momentos de su vida.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), el Álef es el Aluf: el Maestro del mundo, אַלּוּפוֹ שֶׁל עוֹלָם — así lo llama Rashi leyendo 'el murmurador aparta al aluf' (Proverbios 16:28): el que se queja y siembra división aparta de sí al Maestro único. El Uno no está fuera del mil: lo habita. Y aquí los jasidim agregan un drash que Ginsburgh recoge (drash, no cita clásica — pero con aritmética exacta): גּוֹלָה, exilio, suma 44; גְּאוּלָּה, redención, suma 45. La diferencia es exactamente א = 1. Cuando el Aluf entra en el exilio, el exilio se vuelve redención. No cambia ninguna otra letra: solo entra el Uno.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "El Álef se escribe con tres trazos: una Yud arriba a la derecha, una Yud abajo a la izquierda, y una Vav diagonal que las separa y las une a la vez. Ginsburgh transmite la lectura del Arizal: las dos Yud son las aguas superiores y las aguas inferiores, y la Vav es el firmamento entre ellas. La escena está en la Torá misma: el primer día 'el aliento de Dios se cernía sobre la faz de las aguas' (Génesis 1:2) — agua en agua, todavía sin distinción — y el segundo día Dios dijo 'haya un firmamento en medio de las aguas, y separe aguas de aguas' (Génesis 1:6-7). El Álef es el retrato de ese momento: lo alto, lo bajo, y la membrana viva entre los dos.\n\nY ahora suma sus partes: Yud (10) + Vav (6) + Yud (10) = 26 — el valor exacto de יהוה (10+5+6+5 = 26). La letra sin sonido lleva el Nombre inefable dibujado en su cuerpo. R. Akivá advirtió a los que entraban al Pardés: 'cuando lleguéis a las piedras de mármol puro, no digáis: agua, agua' (Jaguigá 14b) — no declaréis dos lo que en la raíz es uno. La forma del Álef es esa advertencia hecha letra: arriba y abajo parecen dos aguas, y son un solo Nombre.",
    },
    partes: [
      {
        label: { es: "Yud superior", en: "Upper Yud", fa: "یود بالا" },
        significado: {
          es: "Las aguas superiores: el mundo de arriba, el punto de lo divino que no desciende. En el servicio del alma, enseña Ginsburgh, son las aguas de la alegría — la experiencia de estar cerca de Dios, la unidad de todo en Su ser. Es la Yud que mira hacia el cielo: la conciencia de que 'no hay nada fuera de Él' (Deuteronomio 4:35), sentida desde arriba, como exaltación.",
        },
        svgPathId: "yud-top",
      },
      {
        label: { es: "Vav", en: "Vav", fa: "واو" },
        significado: {
          es: "El firmamento: la Vav diagonal que separa aguas de aguas (Génesis 1:6-7) — y que a la vez es lo único que las mantiene en una misma letra. Separa y une con el mismo trazo. El midrash cuenta que al crear el mundo Dios decretó que lo alto no bajara y lo bajo no subiera; y en Sinaí anuló su propio decreto: 'los de abajo subirán a los de arriba, los de arriba bajarán a los de abajo — וַאֲנִי הַמַּתְחִיל, y Yo soy el que empieza', como está dicho: 'y descendió el Eterno sobre el monte Sinaí' (Shemot Rabá 12:3; Éxodo 19:20). La Vav del Álef es ese puente: la Torá misma cruzando el firmamento.",
        },
        svgPathId: "vav",
      },
      {
        label: { es: "Yud inferior", en: "Lower Yud", fa: "یود پایین" },
        significado: {
          es: "Las aguas inferiores: el mundo de abajo, el punto de lo humano. Son, en la lectura de Ginsburgh, las aguas de la amargura — la experiencia de estar lejos, la 'bajeza del hombre' que siente la distancia precisamente porque intuye la grandeza. Pero su frío no es ausencia de Dios: es Dios sentido desde el otro lado. La Yud de abajo es idéntica a la de arriba — mismo trazo, mismo valor — solo que puesta en lo hondo. Lo que anhela abajo es lo mismo que celebra arriba.",
        },
        svgPathId: "yud-bottom",
      },
    ],
    mundos: {
      es: "En los mundos, la estructura del Álef se repite a toda escala — Ginsburgh la señala en el cosmos: la atmósfera alta, la baja y el océano; en el cuerpo: el sistema respiratorio arriba, el diafragma en medio, la digestión abajo; el cráneo, la membrana, el cerebro. Dondequiera que mires hay un arriba, un abajo, y una membrana viva que los separa lo justo para que puedan relacionarse. El mundo no es una masa: es un Álef — dos aguas y un firmamento, sostenidos en tensión fértil.",
    },
    almas: {
      es: "En el alma, tú eres las dos Yud al mismo tiempo: hay una parte tuya que vive arriba — que conoce la alegría de la cercanía — y una parte que vive abajo, en la amargura de la distancia. La tentación es elegir una y negar la otra. El Álef te enseña el secreto adulto: no se elige. Se sostienen las dos con una Vav en medio — el compromiso concreto con la Torá y las mitzvot, dice Ginsburgh, que une lo que siente el de arriba con lo que siente el de abajo. Madurar espiritualmente no es dejar de sentir la distancia: es unirla a la cercanía en una sola letra.",
    },
    divinidad: {
      es: "En lo divino, la Yud de arriba es la luz que trasciende (sovev), la Yud de abajo la luz que habita (memalé), y la Vav entre ellas el tzimtzum con su reshimú — la contracción y la huella que la atraviesa, en el lenguaje que Ginsburgh usa para esta letra. El Álef es entonces el retrato del misterio mayor: cómo el Infinito puede estar más allá de todo y dentro de todo sin contradicción. R. Akivá lo dijo en el Pardés: donde las aguas se unen, no digas 'agua, agua' (Jaguigá 14b). No hay dos luces. Hay un solo Nombre — 26 — dibujado como si fueran dos.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 1,
    guematriaForma: {
      es: "Forma: Yud (10) + Vav (6) + Yud (10) = 26 = יהוה · nombre pleno אלף = 1 + 30 + 80 = 111 = פלא (las mismas letras, invertidas: el uno leído desde el otro lado es 'maravilla')",
    },
    mundos: {
      es: "1 es el comienzo de toda cuenta. En los mundos, el uno cuenta 'algo desde algo', dice Ginsburgh: toda serie natural — días, generaciones, causas — empieza en un primer elemento que ya existe. Pero la Torá guarda una sorpresa: no numeró el primer día como 'primero' (רִאשׁוֹן) sino יוֹם אֶחָד, 'día UNO' (Génesis 1:5) — porque cuando existía el día uno, no había todavía un 'segundo' con quien compararlo. El uno de los mundos no es el primero de una fila: es el único, antes de que exista la fila.",
    },
    almas: {
      es: "1 es la unidad de las almas: 'un solo pueblo en la tierra', גּוֹי אֶחָד בָּאָרֶץ (II Samuel 7:23) — la unidad orgánica que Ginsburgh lee en este número: no uniformidad, sino un cuerpo con miembros distintos. Y aquí una gematría exacta: אֶחָד (uno) = 1+8+4 = 13, y אַהֲבָה (amor) = 1+5+2+5 = 13. Uno y amor pesan lo mismo — y juntos, 13+13 = 26, el Nombre. El puente interpretativo es drash conocido, pero la aritmética es dura: dos que se aman con todo lo que son hacen presente al Uno. El alma cuenta 'algo desde la nada': cada acto de unión crea de la nada algo que antes no estaba.",
    },
    divinidad: {
      es: "1 es אֶחָד: 'Escucha, Israel: el Eterno es nuestro Dios, el Eterno es Uno' (Deuteronomio 6:4). No 'uno' de una serie — Uno absoluto: אֵין עוֹד מִלְּבַדּוֹ, 'no hay nada fuera de Él' (Deuteronomio 4:35). Por eso el Zohar pone en boca del Creador, hablándole al Álef que calló mientras las demás letras pedían: אָלֶ״ף אָלֶ״ף... לֵית בִּי יִחוּדָא אֶלָּא בָּךְ — 'Álef, Álef… no hay unidad en Mí sino en ti; en ti reposarán todas las cuentas y todos los actos del mundo' (Zohar, Introducción; I:2b-3a). Y su nombre pleno lo sella: אלף = 111 = פלא, maravilla — las mismas tres letras al revés. Cuando el uno intenta comprenderse a sí mismo, lo único que encuentra es el asombro.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "אָנֹכִי: Dios abre su voz con la letra muda" },
        fuente: {
          es: "Éxodo 20:2 — 'אָנֹכִי יְהֹוָה אֱלֹהֶיךָ': la Torá empieza con Bet (Génesis 1:1, בְּרֵאשִׁית), pero cuando Dios habla directamente a Israel en Sinaí, la primera letra que suena es el Álef de Anojí. El libro empieza en Bet; la Voz empieza en Álef.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Te enseñaré sabiduría: la raíz del nombre" },
        fuente: {
          es: "Job 33:33 — 'הַחֲרֵשׁ וַאֲאַלֶּפְךָ חָכְמָה': 'calla, y te enseñaré sabiduría'. La raíz א-ל-ף como verbo de enseñanza — con el silencio como condición previa, en el versículo mismo.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Álef-Bet: aprende entendimiento" },
        fuente: {
          es: "Shabat 104a — los niños entraron a la casa de estudio y leyeron el alfabeto entero como Torá: 'אָלֶ״ף בֵּי״ת — אֲלַף בִּינָה', 'Álef-Bet: aprende entendimiento'. El nombre de la primera letra ES la instrucción de aprender: el alfabeto empieza ordenándote estudiar.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "No digas 'agua, agua': la advertencia del Pardés" },
        fuente: {
          es: "Jaguigá 14b — 'אַרְבָּעָה נִכְנְסוּ בַּפַּרְדֵּס… אָמַר לָהֶם רַבִּי עֲקִיבָא: כְּשֶׁאַתֶּם מַגִּיעִין אֵצֶל אַבְנֵי שַׁיִשׁ טָהוֹר אַל תֹּאמְרוּ מַיִם מַיִם'. Donde las aguas superiores e inferiores se unen — las dos Yud del Álef — declarar dos lo que es uno es la mentira que expulsa del Paraíso.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El sello de Dios es verdad — y empieza en Álef" },
        fuente: {
          es: "Shabat 55a — R. Janiná: 'חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא אֱמֶת', 'el sello del Santo, bendito sea, es emet (verdad)'. אֱמֶת se escribe con la primera letra del alfabeto (א), la del medio (מ) y la última (ת): la verdad abarca todo el alfabeto — y arranca en el Álef.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "El Álef reclamó 26 generaciones — y recibió el Sinaí" },
        fuente: {
          es: "Bereshit Rabá 1:10 — el mundo fue creado con Bet, lengua de bendición (בְּרָכָה), no con Álef, lengua de maldición (אֲרִירָה). Pero el Álef reclamó ante el Trono 26 generaciones: 'soy la primera de las letras y no creaste tu mundo conmigo'. Respuesta: 'mañana doy la Torá en Sinaí y no abriré sino contigo: אָנֹכִי' (Éxodo 20:2). Que el número de generaciones (26) coincida con la gematría de la forma del Álef y del Nombre es lectura nuestra: el midrash da el número, el puente es drash.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "'Y Yo soy el que empieza': el decreto anulado" },
        fuente: {
          es: "Shemot Rabá 12:3 — al crear el mundo Dios decretó: 'los cielos son del Eterno y la tierra para los hombres'. Al dar la Torá anuló el decreto: 'הַתַּחְתּוֹנִים יַעֲלוּ לָעֶלְיוֹנִים וְהָעֶלְיוֹנִים יֵרְדוּ לַתַּחְתּוֹנִים וַאֲנִי הַמַּתְחִיל' — 'y descendió el Eterno sobre el monte Sinaí' (Éxodo 19:20). La Vav del Álef cruzando el firmamento.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Álef, letra madre: reina sobre el aliento" },
        fuente: {
          es: "Séfer Yetzirá 2:1 y 3:6 — el Álef es una de las tres letras MADRES (אמ״ש): 'הִמְלִיךְ אוֹת אל״ף בָּרוּחַ' — 'hizo reinar la letra Álef sobre el rúaj (aire/aliento)': aire en el mundo, templanza en el año, torso en el cuerpo. Y el aire media entre el fuego y el agua (3:3) — como la Vav del Álef entre las dos aguas.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "'No hay unidad en Mí sino en ti': el Álef que calló" },
        fuente: {
          es: "Zohar, Introducción §6 (= I:2b-3a) — cada letra entró a pedir que el mundo se creara con ella; el Álef se quedó fuera, en silencio. 'אָלֶ״ף אָלֶ״ף, ¿por qué no entras?'. Respondió con humildad — y recibió lo más alto: 'אַתְּ תְּהֵא רֵישׁ לְכָל אָתְוָון, לֵית בִּי יִחוּדָא אֶלָּא בָּךְ' — 'tú serás cabeza de todas las letras: no hay unidad en Mí sino en ti'.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "111: el uno, leído al revés, es maravilla" },
        fuente: {
          es: "Gematría calculada: אלף = 1+30+80 = 111 = פלא (80+30+1) — no solo suman igual: son las MISMAS tres letras en orden inverso. Pele, 'maravilla' ('עֹשֵׂה פֶלֶא', Éxodo 15:11), apunta en la Cabalá — así lo enseña Ginsburgh — a Kéter, la corona que está por encima de la sabiduría: el Uno, mirado desde nosotros, solo puede llamarse asombro.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "La paradoja de Dios y el hombre en una sola letra" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/hebleter/alef.htm) — las aguas de arriba son alegría (cercanía) y las de abajo amargura (distancia), y ambas son conciencia de lo divino, cada una desde su lado; el lugar del 'mármol puro' donde se unen es 'la paradoja de las paradojas'. La unión de la Yud de arriba con la Yud de abajo por la Vav de la Torá es, dice, 'el secreto último de la letra Álef'.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Job 33:33 — 'הַחֲרֵשׁ וַאֲאַלֶּפְךָ חָכְמָה': la raíz א-ל-ף como enseñar/aprender." },
    { es: "Génesis 36:15 (אַלּוּפֵי בְנֵי עֵשָׂו) · Salmos 55:14 (אַלּוּפִי וּמְיֻדָּעִי) · Miqueas 7:5 (אַל תִּבְטְחוּ בְּאַלּוּף) — aluf: jefe, maestro, íntimo." },
    { es: "Proverbios 16:28 (וְנִרְגָּן מַפְרִיד אַלּוּף) con Rashi: אַלּוּפוֹ שֶׁל עוֹלָם, 'el Maestro del mundo' (Rashi cita Bereshit Rabá 20:2)." },
    { es: "Salmos 105:8 — דָּבָר צִוָּה לְאֶלֶף דּוֹר (élef = mil) · Proverbios 14:4 — בְּאֵין אֲלָפִים (alafim = bueyes)." },
    { es: "Génesis 1:2 (agua en agua, el aliento sobre las aguas) y 1:6-7 (el firmamento separa aguas de aguas) — la escena que el Arizal, según Ginsburgh, ve dibujada en el Álef." },
    { es: "Éxodo 20:2 — אָנֹכִי יְהֹוָה אֱלֹהֶיךָ: el Álef abre los Diez Mandamientos; Génesis 1:1 — la Torá abre con Bet (בְּרֵאשִׁית)." },
    { es: "Deuteronomio 6:4 (אֶחָד) · Deuteronomio 4:35 (אֵין עוֹד מִלְּבַדּוֹ) · II Samuel 7:23 (גּוֹי אֶחָד בָּאָרֶץ) · Génesis 1:5 (יוֹם אֶחָד, no 'primer día')." },
    { es: "Bereshit Rabá 1:10 — Bet/bendición vs. Álef/maldición; el reclamo de 26 generaciones; la compensación del אָנֹכִי; R. Hoshaya sobre אֶלֶף דּוֹר." },
    { es: "Shemot Rabá 12:3 — el decreto anulado en Sinaí: וַאֲנִי הַמַּתְחִיל, con Éxodo 19:20 y 20:18." },
    { es: "Shabat 104a — אָלֶ״ף בֵּי״ת: אֲלַף בִּינָה (los niños en la casa de estudio)." },
    { es: "Jaguigá 14b — los cuatro que entraron al Pardés; R. Akivá: אַל תֹּאמְרוּ מַיִם מַיִם." },
    { es: "Shabat 55a — R. Janiná: חוֹתָמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא אֱמֶת." },
    { es: "Séfer Yetzirá 2:1 y 3:6 (ed. Sefaria) — Álef letra madre (אמ״ש), reina sobre el רוּחַ; 3:3 — el aire media entre fuego y agua." },
    { es: "Zohar, Introducción §6 (= Zohar I:2b-3a) — las letras ante el Creador; לֵית בִּי יִחוּדָא אֶלָּא בָּךְ." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' (inner.org/hebleter/alef.htm) — marco 3×3: buey/mil/enseñanza/maestro; aguas y firmamento (vía Arizal); luz trascendente/inmanente, tzimtzum y reshimú." },
    { es: "Gematrías calculadas: forma י+ו+י = 10+6+10 = 26 = יהוה (10+5+6+5) · אלף = 1+30+80 = 111 = פלא (mismas letras invertidas) · אחד = 13 · אהבה = 13 · 13+13 = 26 · גולה = 44 · גאולה = 45." },
    { es: "Nota de precisión: el drash golá(44)→gueulá(45) es enseñanza jasídica recogida por Ginsburgh — aritmética verificada, sin folio clásico exacto. El puente '26 generaciones (BR 1:10) ↔ 26 de la forma' es lectura nuestra. La enseñanza atribuida a R. Menajem Mendel de Rymanov (que en Sinaí solo se oyó el Álef) NO se incluyó por no poder anclarse a fuente primaria." },
  ],
};
