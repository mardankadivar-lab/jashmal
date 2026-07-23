import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  YOD (י) — Data de la décima letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Menajot 29b — dos mundos creados con He y con Yud (R. Yehudá bar R.
//     Ilai, sobre Isaías 26:4 כִּי בְּיָהּ ה' צוּר עוֹלָמִים); el Mundo Venidero
//     con la Yud "porque los justos en él son pocos", y su cabeza inclinada
//     "porque los justos inclinan su cabeza". Ahí mismo (29b, no 29a): Moshé
//     encuentra al Santo atando coronas a las letras (R. Akivá).
//   · Menajot 29a — "לֹא נִצְרְכָה אֶלָּא לְקוֹצָהּ שֶׁל יוֹד": hasta la espina de
//     la yod invalida (tefilín); toda letra debe estar rodeada de pergamino.
//   · Sanedrín 107a — la yud que quité de Sarai "clamó años" hasta Yehoshúa
//     (Números 13:16). · Bereshit Rabá 47:1 — la yud voló ante el Trono:
//     "porque soy la más pequeña de las letras me sacaste de Sara"; R.
//     Yehoshúa ben Korjá: la yud (10) se partió en dos hes (5+5).
//   · Shemot Rabá 6:1 (par. Vayikrá Rabá 19:2) — la yud de יַרְבֶּה contra
//     Salomón: "Salomón y mil como él serán anulados, וְקוֹצָהּ מִמְּךָ אֵינִי
//     מְבַטֵּל — pero ni tu espina anularé".
//   · Zohar, Introducción 6:11 (I:3a) — la yud ante el Santo: "אֲנָא שֵׁירוּתָא
//     דִשְׁמָא קַדִּישָׁא" (soy el comienzo del Nombre santo); respuesta: "דַּי לָךְ
//     דְּאַנְתְּ חָקִיק בִּי... לֵית אַנְתְּ יָאוֹת לְאִתְעַקְּרָא מִן שְׁמִי".
//   · Baal HaSulam, Prefacio al Zohar §39 — las 4 letras de הוי"ה + קוצו של
//     יוד = 5 kelim = las 5 sefirot כח"ב תו"מ: la espina alude a Kéter, la
//     yud de הוי"ה es el kli de Jojmá.
//   · Sefer Yetzirá 1:2-4 — עשר ספירות בלימה; "diez y no nueve, diez y no
//     once"; diez dedos, cinco frente a cinco. · SY (Gra) 5:7 — la Yud:
//     acción (מעשה) · Virgo (בתולה) · Elul · mano izquierda.
//   · Avot 5:1 — בַּעֲשָׂרָה מַאֲמָרוֹת נִבְרָא הָעוֹלָם. · Deut 4:13 — עֲשֶׂרֶת הַדְּבָרִים.
//   · Ginsburgh, tabla oficial (inner.org/alefbeit/sigyud, descargada y
//     leída): Concepto "the concentration of the infinite within the
//     finite"; Significado "a hand; to thrust"; Forma "a suspended point,
//     with a spike projecting upward and an appendage trailing downward";
//     Virgo · Elul · mano izquierda · sentido: acción · tribu Gad · canal
//     Tiferet→Netzaj.
//  Gematrías (calculadas letra por letra):
//    י = 10 · nombre pleno יוד = 10+6+4 = 20 · יד = 10+4 = 14
//    יהושע = 10+5+6+300+70 = 391 = הושע (381) + 10 (¡la yud entera!)
//    שרי = 510 → שרה = 505: perdió 10, ganó 5 — y la otra 5 fue a אברהם
//    (BR 47:1: "se partió, mitad a Sara y mitad a Abraham": 10 = 5+5 exacto).
//
//  NOTA DEL SOFER — descartado / corregido:
//  · "Zohar: la yud como punto primordial (nekudá) de Jojmá" NO pudo
//    anclarse a un parágrafo del Zohar que nombre a la letra: los pasajes de
//    la nekudá (p.ej. I:15a) hablan del punto sin nombrar la yud. Se
//    sustituye por lo que SÍ ancla: Zohar Intro 6:11 (la yud, comienzo del
//    Nombre) y Baal HaSulam §39 (yud = kli de Jojmá; espina = Kéter).
//  · La pista "kotzo shel yud en Menajot 34a" era errónea: la frase está en
//    Menajot 29a (קוֹצָהּ שֶׁל יוֹד); y las coronas de Moshé en 29b, no 29a.
//  · La pista "Vayikrá Rabá 19:2 sobre la yud de Sarai ante el trono"
//    mezclaba dos midrashim: el de la yud de Sarai ante el Trono es Bereshit
//    Rabá 47:1; el de la yud de ירבה (Salomón) es Shemot Rabá 6:1 (con
//    paralelo en Vayikrá Rabá 19:2). Ambos verificados por separado.
//  · Fuentes cristianas (Mateo 5:18): excluidas por política del proyecto.
//  · Sefer Yetzirá: las recensiones difieren en el SENTIDO de la yud — Gra
//    5:7: מעשה (acción, igual que Ginsburgh); en la impresa (5:1) el orden
//    de los doce sentidos asigna otro a la yud. Seguimos al Gra y lo
//    declaramos. Mes/signo/órgano (Elul·Virgo·mano izquierda) coinciden.
//  · "Cada letra empieza en un punto de tinta que es una yud": se presenta
//    como observación del arte del sofer, no como cita clásica (no se halló
//    fuente exacta). No se asigna sendero del Árbol propio: Ginsburgh da el
//    canal Tiferet→Netzaj y así se cita.
// ─────────────────────────────────────────────────────────────────────────

export const yod: LetterData = {
  slug: "yod",
  letter: "י",
  nameTranslit: { es: "Yod", en: "Yud", fa: "یُد" },
  nameHe: "יוֹד",
  value: 10,

  level1: {
    es: "Es la letra más pequeña del alfabeto. Apenas un punto suspendido en el aire: no llega al suelo del renglón, no ocupa casi nada, una gota de tinta con una espina hacia arriba y una estela hacia abajo. Y sin embargo: con ella —dice el Talmud— fue creado el Mundo Venidero. Con ella empieza el Nombre de Dios. Con ella empieza, en el trazo del escriba, toda letra que existe. Diez dichos crearon el mundo, diez sefirot lo sostienen, diez palabras se grabaron en piedra — y todos llevan su número. Antes de leer una palabra más, quédate con esta pregunta: ¿cómo puede lo más pequeño contener lo más grande?",
    en: "It is the smallest letter of the alphabet. Barely a point suspended in the air: it never reaches the baseline, takes up almost nothing — a drop of ink with a spike above and a trailing stroke below. And yet: with it, says the Talmud, the World to Come was created. With it begins the Name of God. With it begins, under the scribe's hand, every letter that exists. Ten utterances created the world, ten sefirot sustain it, ten words were carved in stone — all carry its number. Before you read another word, stay with this question: how can the smallest thing contain the greatest?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "יוֹד es, en el fondo, una mano. El nombre de la letra viene de יָד (yad, 'mano') — así lo recoge Rav Ginsburgh ('a hand; to thrust': una mano; lanzar, impulsar), y así lo confirma la historia misma del alfabeto: en las escrituras semíticas antiguas el signo de esta letra era el dibujo de un brazo con su mano. La letra más pequeña lleva el nombre del órgano con el que el ser humano HACE. Y el Sefer Yetzirá lo sella con una coherencia asombrosa: a la Yod le corresponde el sentido de la ACCIÓN (מַעֲשֶׂה) y, en el cuerpo, la mano izquierda (SY, versión del Gra, 5:7). Nombre, sentido y órgano dicen lo mismo tres veces: la Yod es el poder de actuar.\n\nY aquí está la primera paradoja: ¿por qué la letra de la acción es la más pequeña de todas? Porque la mano que de verdad obra no necesita ocupar espacio: necesita precisión. Un punto bien puesto mueve más que un muro. La Yod es la letra-semilla: no despliega, concentra. Rav Ginsburgh define su concepto exactamente así: 'la concentración del infinito dentro de lo finito'. Todo lo que después será palabra, mundo, obra — cabe primero en ese punto.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Yod es el punto de partida de todo lo creado. Diez dichos crearon el mundo (Avot 5:1) y la letra del diez es un punto: la creación entera empieza como empieza una letra bajo la pluma del sofer — con una gota mínima de tinta que todavía no es nada y ya lo contiene todo. Lo inmenso no nace grande: nace concentrado.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Yod es tu mano — y tu pequeñez. El Talmud pregunta por qué el Mundo Venidero fue creado con la letra más pequeña, y responde: porque los justos que hay en él son pocos, y andan con la cabeza inclinada (Menajot 29b). La Yod te enseña el gesto del justo: hacer mucho y ocupar poco. No es timidez — es concentración. El que se hace pequeño como una yod cabe en el Nombre de Dios; el que se agranda, no cabe ni en su propio nombre.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Yod es el comienzo del Nombre. En el Zohar, cuando las letras desfilan ante el Santo pidiendo que el mundo sea creado con ellas, la yud dice: אֲנָא שֵׁירוּתָא דִשְׁמָא קַדִּישָׁא — 'yo soy el comienzo del Nombre santo'. Y la respuesta es única entre todas las letras: 'Basta para ti que estás grabada en Mí, inscrita en Mí, y todo Mi deseo asciende en ti; no conviene que seas arrancada de Mi Nombre' (Zohar, Introducción 6:11). A la yud no se le concede crear el mundo — se le concede algo mayor: quedarse donde está, en la raíz de todo.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh la describe con tres palabras exactas: 'un punto suspendido, con una espina que se proyecta hacia arriba y un apéndice que desciende hacia abajo' (inner.org, The Hebrew Letters). Mírala en el renglón: es la única letra que cuelga en el aire — no baja hasta la línea de base, no se apoya en nada. Un punto flotante con dos gestos mínimos: hacia arriba, hacia abajo.\n\nY de ese trazo mínimo depende todo. La halajá lo dice sin poesía: 'no hizo falta enseñarlo sino por la espina de la yod' — si a los tefilín les falta hasta ese trazo diminuto, quedan inválidos (Menajot 29a). Y el Midrash lo convierte en drama: cuando Salomón quiso razonar por encima de la Torá ('yo multiplicaré mujeres y mi corazón no se desviará'), la yud de יַרְבֶּה se postró ante el Santo: 'hoy anula una letra, mañana otra, hasta que toda la Torá quede anulada'. Y el Santo respondió: 'Salomón y mil como él serán anulados — pero ni tu espina (קוֹצָהּ) anularé' (Shemot Rabá 6:1). El detalle más pequeño del mundo es lo único que el Cielo declara innegociable.",
    },
    partes: [
      {
        label: { es: "La espina superior (kotz)", en: "The upper thorn (kotz)", fa: "خارِ بالایی" },
        significado: {
          es: "El trazo mínimo que apunta hacia arriba: el famoso קוצו של יוד, 'la espina de la yod'. Es lo más pequeño de la letra más pequeña — y la Guemará enseña que hasta su ausencia invalida (Menajot 29a). Baal HaSulam da su secreto: las cuatro letras de הוי\"ה más la espina de la yod son cinco kelim, las cinco sefirot — y la espina alude a Kéter, la corona que está por encima de la sabiduría (Prefacio al Zohar §39). Lo que apunta hacia arriba en ti es más pequeño que todo lo demás — y más alto que todo lo demás.",
        },
        svgPathId: "yod-kotz",
      },
      {
        label: { es: "El cuerpo (el punto)", en: "The body (the point)", fa: "نقطه (بدنه)" },
        significado: {
          es: "La gota central: el punto suspendido. Es la yud propiamente dicha — la concentración del infinito en lo finito, en la definición de Ginsburgh. En el Nombre הוי\"ה, esta yud es el kli de Jojmá, la sabiduría: el destello primero, la idea entera antes de desplegarse (Baal HaSulam, Prefacio al Zohar §39). Todo lo que existe fue primero un punto así: completo, comprimido, esperando.",
        },
        svgPathId: "yod-body",
      },
      {
        label: { es: "La estela inferior", en: "The lower tail", fa: "دنبالهٔ پایینی" },
        significado: {
          es: "El apéndice que desciende ('an appendage trailing downward', Ginsburgh): el punto no se queda en sí mismo — gotea hacia abajo, hacia el renglón que no toca. Es el gesto de la entrega: la sabiduría concentrada empieza a descender hacia el entendimiento que la desplegará. (Esta lectura del descenso es contemplación nuestra sobre la descripción de Ginsburgh, no cita clásica — dicho queda.)",
        },
        svgPathId: "yod-tail",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la Yod enseña cómo empieza todo: en punto. Mira al sofer trabajar: cada letra de la Torá, de la más simple a la más ornamentada, comienza cuando la pluma toca el pergamino en un punto de tinta — una yod naciente. (Observación del arte del escriba, no cita clásica.) La creación repite ese gesto: nada aparece desplegado; todo aparece concentrado y luego se despliega.",
    },
    almas: {
      es: "En el alma, la Yod es la cabeza inclinada. La Guemará pregunta: ¿por qué la yud tiene la cabeza agachada (כָּפוּף רֹאשׁוֹ)? Porque los justos del Mundo Venidero inclinan la cabeza — porque sus obras no se parecen las unas a las otras, y cada uno ve la grandeza del otro (Menajot 29b). La letra más pequeña, además, se agacha. No hay forma más pura de la humildad dibujada: ser un punto, y aun así reverenciar.",
    },
    divinidad: {
      es: "En lo divino, la forma entera de la Yod es un mapa de lo más alto: la espina es Kéter, la corona supraconsciente; el cuerpo es Jojmá, el punto de la sabiduría (Baal HaSulam, Prefacio al Zohar §39). Por eso la yud no toca el renglón: lo más alto de lo alto no se apoya en el mundo — el mundo cuelga de él. Y por eso el Santo le dijo: 'todo Mi deseo asciende en ti' (Zohar, Introducción 6:11).",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 10,
    guematriaForma: {
      es: "י = 10 · nombre pleno יוֹד = 10 + 6 + 4 = 20 — dos veces diez: el diez revelado de la letra y otro diez escondido en su nombre (y 20 es exactamente el valor de la letra siguiente, la Kaf: aritmética verificada; la lectura es nuestra). Y la prueba mayor: יְהוֹשֻׁעַ = 391 = הוֹשֵׁעַ (381) + 10 — Yehoshúa es Hoshea más una yud entera.",
    },
    mundos: {
      es: "10 es el número con el que el mundo fue dicho: בַּעֲשָׂרָה מַאֲמָרוֹת נִבְרָא הָעוֹלָם — 'con diez dichos fue creado el mundo' (Avot 5:1). Y diez fue lo que se grabó en piedra: עֲשֶׂרֶת הַדְּבָרִים, las Diez Palabras (Deuteronomio 4:13). El mundo se crea con diez y se ordena con diez: la Yod es el número donde la creación y la Torá se dan la mano.",
    },
    almas: {
      es: "10 está escrito en tu cuerpo: 'diez sefirot belimá según el número de los diez dedos, cinco frente a cinco, y el pacto del Único alineado en el medio' (Sefer Yetzirá 1:3). Extiende las manos y míralas: llevas el número de la Yod encima, repartido en dos mitades que solo trabajan juntas. La yud es la mano; tus diez dedos son sus diez chispas. Todo lo que hagas hoy, lo harás con el número de esta letra.",
    },
    divinidad: {
      es: "עֶשֶׂר סְפִירוֹת בְּלִימָה — 'diez sefirot de la nada' (Sefer Yetzirá 1:2), y el texto insiste con una precisión feroz: 'diez y no nueve, diez y no once' (1:4). Ni falta ni sobra: el despliegue de lo divino es exactamente diez. Y Menajot 29b corona el número con la letra: con la Yud fue creado el Mundo Venidero — el mundo de los pocos, de los concentrados, de los que caben en un punto. El diez no es una cantidad: es la estructura completa de todo lo que desciende de lo Uno.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "La yud que entró en Yehoshúa" },
        fuente: {
          es: "Números 13:16 — 'וַיִּקְרָא מֹשֶׁה לְהוֹשֵׁעַ בִּן־נוּן יְהוֹשֻׁעַ': Moshé añade una yud al nombre de su discípulo antes de enviarlo con los espías. Gematría verificada: יהושע = 391 = הושע (381) + 10.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "De Sarai a Sara: la yud partida en dos" },
        fuente: {
          es: "Génesis 17:15 — 'לֹא־תִקְרָא אֶת־שְׁמָהּ שָׂרָי כִּי שָׂרָה שְׁמָהּ'. La cuenta cuadra con el midrash: שרי = 510 → שרה = 505; los 10 de la yud se parten en dos hes de 5 (una para Sara, otra para Abraham — Bereshit Rabá 47:1).",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "El Mundo Venidero fue creado con la Yud" },
        fuente: {
          es: "Menajot 29b — R. Yehudá bar R. Ilai sobre Isaías 26:4 (כִּי בְּיָהּ ה' צוּר עוֹלָמִים): dos mundos creó el Santo, uno con He y otro con Yud. '¿Por qué el Mundo Venidero con la yud? מִפְּנֵי שֶׁצַּדִּיקִים שֶׁבּוֹ מוּעָטִים — porque los justos en él son pocos. ¿Y por qué su cabeza inclinada? Porque los justos inclinan la cabeza, pues sus obras no se parecen entre sí.'",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Hasta la espina de la yod invalida" },
        fuente: {
          es: "Menajot 29a — 'לֹא נִצְרְכָה אֶלָּא לְקוֹצָהּ שֶׁל יוֹד': si en los tefilín falta hasta la espina de la yod, no se cumple la mitzvá; y toda letra debe estar rodeada de pergamino por sus cuatro lados. De ahí la expresión קוצו של יוד: el detalle mínimo del que depende todo.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La yud que clamó durante años" },
        fuente: {
          es: "Sanedrín 107a — David pide que su falta no se escriba; el Santo responde: 'Imposible. Si la yud que quité de Sarai estuvo de pie clamando años hasta que vino Yehoshúa y se la añadí — וּמָה יוֹד שֶׁנָּטַלְתִּי מִשָּׂרַי עוֹמֵד וְצוֹוֵחַ... — cuánto más una sección entera de la Torá.' Ni una letra de la Torá se pierde: se reubica.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "La yud que voló ante el Trono" },
        fuente: {
          es: "Bereshit Rabá 47:1 — R. Shimón ben Yojái: la yud que el Santo quitó de Sarai 'volaba y revoloteaba ante Su Trono' y dijo: '¿porque soy la más pequeña de las letras me sacaste de Sara la justa?'. Respuesta: 'Antes estabas en nombre de mujer y al final de las letras; ahora te pongo en nombre de varón y al comienzo: וַיִּקְרָא מֹשֶׁה לְהוֹשֵׁעַ בִּן נוּן יְהוֹשֻׁעַ.'",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Ni tu espina anularé: la yud contra Salomón" },
        fuente: {
          es: "Shemot Rabá 6:1 (paralelo en Vayikrá Rabá 19:2) — la yud de יַרְבֶּה (Deut 17:17, 'no multiplicará mujeres') se postró ante el Santo: 'Salomón me anula hoy; mañana otra, hasta anular toda la Torá'. Respuesta: 'שְׁלֹמֹה וְאֶלֶף כַּיּוֹצֵא בוֹ יִהְיוּ בְּטֵלִין וְקוֹצָהּ מִמְּךָ אֵינִי מְבַטֵּל' — Salomón y mil como él serán anulados, pero ni tu espina anularé.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "'Yo soy el comienzo del Nombre santo'" },
        fuente: {
          es: "Zohar, Introducción 6:11 (I:3a) — en el desfile de las letras, la yud alega: אֲנָא שֵׁירוּתָא דִשְׁמָא קַדִּישָׁא. El Santo responde: 'Basta para ti que estás grabada en Mí e inscrita en Mí, y todo Mi deseo asciende en ti; no conviene que seas arrancada de Mi Nombre.'",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La espina es Kéter, la yud es Jojmá" },
        fuente: {
          es: "Baal HaSulam, Prefacio al Zohar §39 — 'las cuatro letras de הוי\"ה y la espina de la yud son cinco kelim... y son el secreto de las cinco sefirot כח\"ב תו\"מ': la espina de la yod alude a los kelim de Kéter y la yud de הוי\"ה es el kli de Jojmá. El punto más pequeño del alfabeto carga las dos sefirot más altas.",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "Yod: acción, Virgo, Elul, la mano izquierda" },
        fuente: {
          es: "Sefer Yetzirá 5 — la Yod es una de las doce letras SIMPLES (5:1: ה\"ו ז\"ח ט\"י ל\"נ ס\"ע צ\"ק). Versión del Gra 5:7: 'הִמְלִיךְ אוֹת י' בְּמַעֲשֶׂה... וְצָר בָּהֶם בְּתוּלָה בָּעוֹלָם וֶאֱלוּל בַּשָּׁנָה וְיָד שְׂמֹאל בַּנֶּפֶשׁ' — acción · Virgo · Elul · mano izquierda. (Honestidad: en la recensión impresa el orden de los doce sentidos asigna otro sentido a la yud; mes, signo y órgano coinciden en ambas. Seguimos al Gra, que es la que usa Ginsburgh.)",
        },
        href: "/mente-cosmica",
      },
    ],
    jasidut: [
      {
        titulo: { es: "El infinito concentrado en lo finito" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sigyud) — concepto de la Yod: 'la concentración del infinito dentro de lo finito'. Significado: 'una mano; impulsar'. Forma: 'un punto suspendido, con una espina hacia arriba y un apéndice hacia abajo'. Sentido: la acción; arquetipo: Gad; canal: de Tiferet a Netzaj.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Menajot 29b — dos mundos creados con He y Yud (Isaías 26:4); el Mundo Venidero con la yud: justos pocos y de cabeza inclinada. Ahí mismo: Moshé y las coronas de las letras (R. Akivá)." },
    { es: "Menajot 29a — לֹא נִצְרְכָה אֶלָּא לְקוֹצָהּ שֶׁל יוֹד: hasta la espina de la yod invalida; toda letra rodeada de pergamino. (La cita popular 'Menajot 34a' es imprecisa: está en 29a.)" },
    { es: "Sanedrín 107a — la yud quitada de Sarai clamó años hasta ser añadida a Yehoshúa (Números 13:16)." },
    { es: "Bereshit Rabá 47:1 — la yud voló ante el Trono ('soy la más pequeña de las letras'); R. Yehoshúa ben Korjá: la yud (10) partida en dos hes (5+5) para Sara y Abraham." },
    { es: "Shemot Rabá 6:1 (par. Vayikrá Rabá 19:2) — la yud de יַרְבֶּה contra Salomón: 'ni tu espina anularé'." },
    { es: "Números 13:16 — וַיִּקְרָא מֹשֶׁה לְהוֹשֵׁעַ בִּן־נוּן יְהוֹשֻׁעַ. Génesis 17:15 — Sarai → Sara." },
    { es: "Zohar, Introducción 6:11 (I:3a) — la yud: 'comienzo del Nombre santo'; 'estás grabada en Mí... no serás arrancada de Mi Nombre'." },
    { es: "Baal HaSulam, Prefacio al Zohar §39 — הוי\"ה + קוצו של יוד = 5 kelim = כח\"ב תו\"מ; espina = Kéter, yud = Jojmá." },
    { es: "Sefer Yetzirá 1:2 (עשר ספירות בלימה), 1:3 (diez dedos, cinco frente a cinco), 1:4 ('diez y no nueve, diez y no once')." },
    { es: "Sefer Yetzirá 5:1 y (Gra) 5:7 — Yod, letra simple: acción (מעשה) · Virgo (בתולה) · Elul · mano izquierda. Nota: las recensiones difieren en el sentido asignado; mes/signo/órgano coinciden." },
    { es: "Avot 5:1 — בַּעֲשָׂרָה מַאֲמָרוֹת נִבְרָא הָעוֹלָם. Deuteronomio 4:13 — עֲשֶׂרֶת הַדְּבָרִים (cf. Éxodo 34:28)." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' (tabla oficial inner.org/alefbeit/sigyud) — concepto, significado, forma, correspondencias y canal Tiferet→Netzaj." },
    { es: "Gematrías calculadas: י = 10 · יוד = 10+6+4 = 20 · יהושע = 391 = הושע (381) + 10 · שרי = 510 → שרה = 505 (10 = 5+5, conforme a BR 47:1)." },
    { es: "Nota de precisión: 'el Zohar llama a la yud punto primordial de Jojmá' se descartó por no anclar a parágrafo exacto; lo sustituyen Zohar Intro 6:11 y Baal HaSulam §39. 'Cada letra nace de un punto-yud del escriba' es observación del oficio, no cita. La lectura 20 = Kaf y la estela como descenso hacia Biná son drash nuestro, declarado." },
  ],
};
