import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  SAMEJ (ס) — Data de la decimoquinta letra. Contenido erudito VERIFICADO
//  por el Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Salmo 145:14 — סוֹמֵךְ ה' לְכָל הַנֹּפְלִים (el versículo-samej de Ashrei).
//   · Berajot 4b — R. Yojanán: no hay nun en Ashrei por la caída (Amós 5:2);
//     R. Najman bar Yitzjak: aun así David "volvió y los sostuvo (סְמָכָן)".
//   · Shabat 104a — ס״ע: סְמוֹךְ עֲנִיִּים ("sostén a los pobres"); lishaná
//     ajariná: סִימָנִין עֲשֵׂה בַּתּוֹרָה. Y Rav Jisdá: מ״ם וְסָמֶ״ךְ שֶׁבַּלּוּחוֹת
//     בְּנֵס הָיוּ עוֹמְדִין ("la mem y la samej de las tablas se sostenían por
//     milagro"). Cf. Meguilá 2b-3a (donde el milagro prueba las finales).
//   · Sanhedrín 21b-22a — la disputa del ktav: Mar Zutra (se dio en ktav
//     ivri y cambió con Ezra) vs. R. Elazar HaModaí (כתב זה לא נשתנה).
//   · Yerushalmi Meguilá 1:9 (Venecia 71c) — R. Leví: si la Torá se dio en
//     ktav ivri, la עי״ן fue el milagro; si en ashurí, la סמ״ך.
//   · Bereshit Rabá 17:6 — la primera samej del libro y el satán; la
//     objeción הוּא הַסֹּבֵב (Génesis 2:11) respondida: "de ríos habla".
//   · Julín 98a-b — כָּל אִיסּוּרִין שֶׁבַּתּוֹרָה בְּשִׁשִּׁים (anulación en 60).
//   · Berajot 57b — los cinco "un sesentavo": fuego/Guehinom, miel/maná,
//     Shabat/Mundo Venidero, sueño/muerte, sueño-onírico/profecía.
//   · Sefer Yetzirá 5:1-2 — Samej es letra SIMPLE (ה״ו ז״ח ט״י ל״נ ס״ע צ״ק):
//     Sagitario (קשת) · Kislev. Ed. impresa (Varsovia 1884): órgano מרה;
//     recensión del Gra: "הִמְלִיךְ אוֹת ס' בְּשֵׁינָה" (el sueño) y órgano קבה.
//   · Levítico 1:4; Números 27:18,23; Deut 34:9 — la raíz bíblica ס-מ-ך
//     (semijá: apoyar las manos); Deut 34:7 — los 120 años de Moshé.
//   · Números 6:24-26 — Bendición Sacerdotal: 15+20+25 = 60 letras exactas
//     (contadas computacionalmente, excluyendo los marcadores {ס}).
//   · Cantar 3:7 (60 valientes ALREDEDOR del lecho) y 6:8 (60 reinas).
//   · Amidá, 2ª bendición (Guevurot) — סוֹמֵךְ נוֹפְלִים (litúrgico, Sidur).
//   · Sefer Yetzirá 1:7 — נָעוּץ סוֹפָן בִּתְחִלָּתָן; Yejezkel 1:16 — הָאוֹפַן
//     בְּתוֹךְ הָאוֹפָן; Salmo 16:8 — שִׁוִּיתִי (todos citados por Ginsburgh).
//   · R. Yitzchak Ginsburgh, "The Hebrew Letters", tabla de la Samej ("The
//     Endless Cycle"): círculo/anillo de boda; vacío del tzimtzum; reshimú;
//     luz trascendente סוֹבֵב כׇּל עָלְמִין; sostener/confiar/ordenación.
//  Gematrías (calculadas letra por letra):
//    ס = 60 · nombre pleno סמך = 60+40+20 = 120 (los años de Moshé, Dt 34:7)
//
//  NOTA DEL SOFER — precisiones y descartes:
//  · La URL viva inner.org/alefbeit/sigsamech está ROTA (redirige a una
//    imagen); la tabla se verificó en el archivo Wayback de
//    inner.org/hebleter/samech.htm (misma obra, versión web del libro).
//  · En Bereshit Rabá 17:6 el texto de Sefaria escribe שָׂטָן con sin, no
//    con samej: el drash del midrash se apoya en el SONIDO "s". Se declara.
//  · La ed. impresa de Sefer Yetzirá no asigna sentido por letra en 5:2;
//    la asignación "samej = sueño" es explícita solo en la recensión del
//    Gra. Se declara la divergencia (también el órgano: מרה vs. קבה).
//  · De la tabla de Ginsburgh se DESCARTARON por no poder anclarse a fuente
//    independiente: "60 alumnos del Baal Shem Tov" y "60 huesos de las dos
//    manos del kohén". No se usa el término "or makif": la tabla dice
//    "Transcendent Surrounding Light (sovev kol almin)" y así se cita.
//  · El puente "letra 15 del acróstico ↔ Salmo 145:14" es estructura del
//    propio salmo (acróstico alfabético); los puentes sueño↔1/60 de la
//    muerte y Moshé-120↔semijá se marcan como drash nuestro en el texto.
//  · No se asigna sendero del Árbol: Ginsburgh no lo hace en esta tabla.
// ─────────────────────────────────────────────────────────────────────────

export const samej: LetterData = {
  slug: "samej",
  letter: "ס",
  nameTranslit: { es: "Samej", en: "Samech", fa: "سامِخ" },
  nameHe: "סָמֶך",
  value: 60,

  level1: {
    es: "Mírala despacio: es la única letra del alfabeto que no tiene ni entrada ni salida. Un anillo cerrado. Una muralla perfecta. Donde la Bet abre su costado y la He deja escapar el aire, la Samej se sella sobre sí misma: nada entra, nada sale. Y ahora escucha su nombre: סָמֶך viene de somej — 'el que sostiene'. La letra hermética es, precisamente, la letra del apoyo: la que recoge a todos los que caen. Y hay más: en las tablas de la Ley, grabadas de lado a lado en la piedra, el centro de la Samej no tenía de dónde agarrarse — y flotaba. El Talmud dice que se sostenía por puro milagro. Antes de leer una palabra más, quédate con esa pregunta: ¿quién sostiene a la letra que sostiene a todos?",
    en: "Look at it slowly: it is the only letter of the alphabet with no way in and no way out. A closed ring. A perfect wall. Where the Bet opens its side and the He lets the breath escape, the Samech seals itself: nothing enters, nothing leaves. Now listen to its name: סָמֶך comes from somech — 'the one who supports.' The hermetic letter is, precisely, the letter of support: the one that catches all who fall. And there is more: in the tablets of the Law, engraved straight through the stone, the center of the Samech had nothing to hold on to — and it floated. The Talmud says it stood by sheer miracle. Before you read another word, stay with the question: who supports the letter that supports everyone?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "סָמֶך viene de la raíz ס-מ-ך, 'apoyar', 'sostener' — y esta raíz sí es plenamente bíblica, con un gesto físico exacto: apoyar las manos con todo el peso. Es el verbo del sacrificio: 'y APOYARÁ (וְסָמַךְ) su mano sobre la cabeza de la ofrenda' (Levítico 1:4). Y es el verbo de la transmisión: 'toma a Yehoshúa bin Nun... y APOYA (וְסָמַכְתָּ) tu mano sobre él' (Números 27:18); 'y Yehoshúa bin Nun estaba lleno de espíritu de sabiduría, porque Moshé HABÍA APOYADO (סָמַךְ) sus manos sobre él' (Deuteronomio 34:9). De ahí viene la palabra semijá — la ordenación rabínica hasta hoy: un maestro que descarga su peso sobre un discípulo, y el discípulo que aguanta.\n\nEl versículo que corona el nombre es el que la propia letra escribe en el salmo alfabético: en Ashrei, el verso de la Samej dice סוֹמֵךְ ה' לְכָל הַנֹּפְלִים — 'sostiene Hashem a todos los que caen' (Salmo 145:14). Y aquí el Talmud guarda un drama: en ese salmo FALTA el verso de la nun. R. Yojanán explica por qué: porque la nun es la caída — נָפְלָה, 'cayó y no volverá a levantarse la virgen de Israel' (Amós 5:2). David saltó esa letra para no escribir la caída. 'Y aun así' — dice R. Najman bar Yitzjak — 'David volvió y los SOSTUVO (סְמָכָן) con espíritu de santidad: somej Hashem lekol hanoflim' (Berajot 4b). Mira lo que hizo el poeta: donde la nun cayó, el versículo siguiente — el de la Samej — la recoge. El alfabeto mismo quedó escrito así: después del que cae, viene el que sostiene. Rav Ginsburgh completa la lista de sentidos del nombre: sostener; confiar en; la ordenación (semijá); y el estado constructo de la gramática — hasta en la sintaxis hebrea, una palabra que se 'apoya' (nismaj) en otra.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la Samej es el apoyo invisible que impide que lo creado se desplome. Todo lo que existe está cayendo en algún sentido — hacia el desorden, hacia el desgaste, hacia el olvido — y sin embargo el mundo sigue en pie cada mañana. Eso, dice esta letra, no es inercia: es alguien sosteniendo. El alfabeto de los niños lo vuelve mandato en Shabat 104a: ס״ע — סְמוֹךְ עֲנִיִּים, 'sostén a los pobres'. La samej cósmica se imita con las manos: donde tú sostienes a un caído, el mundo se vuelve a sostener un poco.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la Samej es tu capacidad de ser apoyo — y de dejarte apoyar. La semijá enseña las dos caras: Moshé no le dio a Yehoshúa un libro ni un discurso; le apoyó las manos encima, con peso real (Números 27:23). Transmitir es dejar que otro cargue algo tuyo; recibir es aguantar el peso sin doblarte. Y la otra lectura de Shabat 104a te da la versión íntima: סִימָנִין עֲשֵׂה בַּתּוֹרָה — 'haz señales en la Torá y así la adquirirás'. Un simán, una señal, es un apoyo para la memoria: algo pequeño y firme donde el conocimiento se recuesta para no caerse. El alma-samej pregunta: ¿quién se apoya en ti — y en qué te apoyas tú?",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), la Samej es la experiencia de estar sostenido por Dios en todo momento — así lo formula Rav Ginsburgh, y así lo reza Israel tres veces al día en la Amidá: סוֹמֵךְ נוֹפְלִים, 'el que sostiene a los que caen' (segunda bendición). Pero la semijá del sacrificio (Levítico 1:4) añade el reverso vertiginoso: el oferente apoya TODO su peso sobre lo que entrega a Dios. Sostener y entregarse resultan ser el mismo verbo. El que se apoya del todo en Él descubre que ya estaba siendo sostenido — que la caída libre era, desde siempre, una mano.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh la describe con dos imágenes: 'un círculo; un anillo de boda' (The Hebrew Letters, tabla de la Samej). Es — junto con la mem final — la única letra completamente cerrada de la escritura ashurí: un techo, un muro que envuelve, y ningún hueco. Y de esa clausura nace la enseñanza más asombrosa que el Talmud dice de letra alguna: מ״ם וְסָמֶ״ךְ שֶׁבַּלּוּחוֹת בְּנֵס הָיוּ עוֹמְדִין — 'la mem y la samej de las tablas se sostenían por milagro' (Rav Jisdá, Shabat 104a). Las tablas estaban grabadas de lado a lado, la piedra atravesada por completo; en una letra cerrada, el corazón de piedra del centro no tenía NADA que lo sujetara. Y no cayó. La letra del sostén es la única que necesitó ser sostenida directamente por Dios.\n\nY aquí este proyecto te debe la honestidad completa, porque la discusión es hermosa: ese milagro solo ocurre si las tablas estaban en ktav ashurí, la escritura cuadrada donde la samej es cerrada. Pero Sanhedrín 21b-22a registra la disputa: Mar Zutra enseña que la Torá se dio primero en ktav ivri (la escritura paleohebrea, donde la samej NO es un anillo) y cambió en días de Ezra; R. Elazar HaModaí responde: כְּתָב זֶה לֹא נִשְׁתַּנָּה — 'esta escritura no cambió jamás'. El Yerushalmi zanja con precisión de orfebre: 'según quien dice que la Torá se dio en ktav ivri, la ÁYIN fue el milagro; según quien dice ashurí, la SAMEJ' (R. Leví, Yerushalmi Meguilá 1:9). Es decir: los Sabios discuten CUÁL letra flotó — pero nadie discute que en las tablas hubo un círculo cerrado sosteniéndose en el aire. El milagro no está en juego; solo su nombre.",
    },
    partes: [
      {
        label: { es: "El techo (la cobertura)", en: "The roof (covering)", fa: "سقف" },
        significado: {
          es: "El trazo superior, firme y horizontal: lo que convierte al muro en refugio. Muchas letras tienen techo, pero solo aquí el techo se suelda a los muros sin dejar rendija. Es la cobertura total — lo que la Cabalá llama la luz que envuelve desde arriba sin entrar a fraccionarse. Un techo que no gotea luz: la abraza entera.",
        },
        svgPathId: "samej-roof",
      },
      {
        label: { es: "El muro que rodea", en: "The surrounding wall", fa: "دیوار" },
        significado: {
          es: "La curva que baja, se dobla y vuelve a subir hasta cerrar el circuito. Es muralla y es anillo de boda (Ginsburgh): la misma geometría protege una ciudad y sella una alianza. Rodear algo por completo es decirle: nada tuyo se pierde. En este trazo el final del recorrido toca su propio comienzo — נָעוּץ סוֹפָן בִּתְחִלָּתָן, 'su final está engarzado en su principio' (Sefer Yetzirá 1:7).",
        },
        svgPathId: "samej-wall",
      },
      {
        label: { es: "El corazón suspendido", en: "The suspended heart", fa: "قلب معلق" },
        significado: {
          es: "El interior de la letra: el espacio que el anillo encierra. En las tablas era piedra sin sostén — y flotaba (Shabat 104a). Es la parte de la Samej que no es trazo sino silencio rodeado: el vacío habitado. Todo lo que está verdaderamente protegido parece estar en el aire; lo que lo sostiene no se ve, porque lo sostiene desde todos los lados a la vez.",
        },
        svgPathId: "samej-heart",
      },
    ],
    mundos: {
      es: "En los mundos, el círculo de la Samej dibuja el escenario mismo de la creación según la Cabalá: el tzimtzum, la contracción inicial que abrió un 'espacio vacío' redondo dentro de la luz infinita — Rav Ginsburgh lee la forma de la samej exactamente así: 'el vacío creado por la contracción inicial de la luz infinita de Dios'. Dentro de ese anillo giran los ciclos: estaciones, generaciones, historias que vuelven. Y la Torá guarda una ironía tierna: la primera samej de todo el libro aparece en la palabra הַסֹּבֵב — 'el [río] que RODEA toda la tierra de Javilá' (Génesis 2:11). La primera vez que esta letra pisa el texto, significa 'rodear'. La forma y el estreno dicen lo mismo.",
    },
    almas: {
      es: "En el alma, el anillo es de boda. Ginsburgh lee en el círculo de la samej 'el matrimonio de las dos mitades de una misma alma' — y el reshimú: la impresión de luz que quedó en el vacío tras el tzimtzum, como el aroma en un frasco vacío. Cuando sientas que Dios se retiró de tu vida y quedó solo un hueco redondo, la samej te enseña a mirar de nuevo: el hueco tiene forma de anillo. Lo que parece abandono es un compromiso con la marca aún puesta. Nadie rodea con un anillo lo que piensa soltar.",
    },
    divinidad: {
      es: "En lo divino, el círculo cerrado es la luz que rodea todos los mundos — סוֹבֵב כׇּל עָלְמִין, la 'luz trascendente envolvente' de la que Ginsburgh hace el corazón de esta letra: la presencia de Dios que no entra a los mundos porque los abraza por igual desde afuera, sin diferencia entre grande y pequeño, arriba y abajo. Por eso el profeta vio הָאוֹפַן בְּתוֹךְ הָאוֹפָן, 'la rueda dentro de la rueda' (Yejezkel 1:16): un círculo interior que asciende en espiral, envuelto por un círculo exterior que ya lo contiene todo. Tu búsqueda gira por dentro; Su abrazo ya está cerrado por fuera. El final engarzado en el principio (Sefer Yetzirá 1:7) no es una figura: es la topología del amor de Dios.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 60,
    guematriaForma: {
      es: "ס = 60 · nombre pleno סמך = 60 + 40 + 20 = 120 — los años de Moshé: 'y Moshé tenía ciento veinte años al morir' (Deuteronomio 34:7)",
    },
    mundos: {
      es: "60 es, en la halajá, el número donde lo indeseado se disuelve: כָּל אִיסּוּרִין שֶׁבַּתּוֹרָה בְּשִׁשִּׁים — 'todas las prohibiciones de la Torá [se anulan] en sesenta' (Julín 98a; la Guemará debate allí si en sesenta o en cien, y la halajá fija sesenta). Una gota de lo prohibido en sesenta partes de lo permitido deja de existir para la ley: batel beshishim. Míralo con los ojos de esta letra: 60 es la medida en que el conjunto SOSTIENE a la parte — la comunidad tan vasta que la mancha individual ya no puede teñirla. El número de la samej es el umbral donde lo que cae queda absorbido por lo que abraza.",
    },
    almas: {
      es: "60 es también la razón entre este mundo y lo que lo excede. Berajot 57b lo enseña en una lista inolvidable: 'el fuego es un sesentavo del Guehinom; la miel, un sesentavo del maná; el Shabat, un sesentavo del Mundo Venidero; el SUEÑO, un sesentavo de la muerte; el sueño [onírico], un sesentavo de la profecía'. Todo lo trascendente te llega en dosis de 1/60: suficiente para saber que existe, insuficiente para quemarte. Y aquí las fuentes se tocan solas: la recensión del Gra del Sefer Yetzirá asigna a la samej precisamente el SUEÑO ('הִמְלִיךְ אוֹת ס' בְּשֵׁינָה', SY 5, versión del Gra) — y el sueño es un sesentavo de la muerte. El sentido de la letra cabe dentro de su propio número. (El puente entre ambas fuentes es lectura nuestra; cada fuente es exacta.)",
    },
    divinidad: {
      es: "La Bendición Sacerdotal — las palabras con que Dios mismo ordenó bendecir — tiene exactamente 60 letras: 15 en el primer versículo, 20 en el segundo, 25 en el tercero (Números 6:24-26; cuéntalas). Sesenta letras que hacen lo que hace la samej: rodear al pueblo de protección — 'te guarde... te agracie... ponga en ti paz'. Y el Cantar pone el mismo número montando guardia: 'sesenta valientes ALREDEDOR (סָבִיב) del lecho de Shlomó' (Cantar 3:7), 'sesenta son las reinas' (6:8). Hasta la caligrafía de los escribas guarda el secreto: la pausa cerrada del rollo de la Torá se llama setumá — 'sellada' — y se marca, desde siempre, con una letra: ס. Cuando el texto necesita decir 'aquí hay un cierre', escribe una samej.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "El que sostiene a todos los que caen" },
        fuente: {
          es: "Salmo 145:14 — 'סוֹמֵךְ ה' לְכָל הַנֹּפְלִים וְזוֹקֵף לְכָל הַכְּפוּפִים': el versículo que la propia Samej escribe en el acróstico de Ashrei — sostiene a los caídos y endereza a los doblados. Cf. la Amidá (2ª bendición): סוֹמֵךְ נוֹפְלִים.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "120: el hombre que murió apoyando las manos" },
        fuente: {
          es: "Deuteronomio 34:7 — Moshé muere a los 120 años (= סמך, el nombre pleno de la letra); dos versículos después, 34:9: Yehoshúa está 'lleno de espíritu de sabiduría, porque Moshé APOYÓ (סָמַךְ) sus manos sobre él'. La vida de 120 termina en una semijá. (El puente numérico es drash nuestro; ambos versículos son exactos.)",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "La nun que cayó y la samej que la recoge" },
        fuente: {
          es: "Berajot 4b — R. Yojanán: no hay verso de nun en Ashrei porque en ella está la caída de Israel ('נָפְלָה לֹא תוֹסִיף קוּם', Amós 5:2). R. Najman bar Yitzjak: 'aun así, David volvió y los SOSTUVO (סְמָכָן) con espíritu de santidad: סוֹמֵךְ ה' לְכָל הַנֹּפְלִים'. En el alfabeto, después del caído viene el que sostiene.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Las letras que flotaban en las tablas" },
        fuente: {
          es: "Shabat 104a — Rav Jisdá: 'מ״ם וְסָמֶ״ךְ שֶׁבַּלּוּחוֹת בְּנֵס הָיוּ עוֹמְדִין', la mem [final] y la samej de las tablas se sostenían por milagro (grabadas de lado a lado, su centro flotaba). Cf. Meguilá 2b-3a, donde este milagro prueba que las letras finales vienen de Sinaí; y Yerushalmi Meguilá 1:9 (R. Leví): en ktav ivri el milagro fue la áyin; en ashurí, la samej — cf. la disputa del ktav en Sanhedrín 21b-22a.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Sostén a los pobres, hazle señales a la Torá" },
        fuente: {
          es: "Shabat 104a — el alfabeto de los niños: ס״ע — סְמוֹךְ עֲנִיִּים, 'sostén a los pobres'; otra versión: סִימָנִין עֲשֵׂה בַּתּוֹרָה וּקְנֵה אוֹתָהּ, 'haz señales en la Torá y adquiérela'. Las dos lecturas son la misma letra: dar apoyo — a personas o a palabras.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "La primera samej de la Torá: ¿satán o anillo?" },
        fuente: {
          es: "Bereshit Rabá 17:6 — R. Janina bar Idi: 'desde el comienzo del libro hasta aquí (la creación de la mujer, Génesis 2:21) no hay samej escrita; cuando ella fue creada, fue creado el satán con ella'. Y la objeción del propio midrash: ¿y הוּא הַסֹּבֵב (Génesis 2:11)? — 'de ríos habla el versículo'. Honestidad: el drash juega con el sonido (שטן se escribe con sin). Y el filo elevado: la primera samej real de la Torá significa 'el que RODEA' — un río-anillo; y Ginsburgh ve en la samej el anillo de boda y la presencia divina en el matrimonio. La misma letra: sospecha o alianza, según quién mire el círculo.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Samej: el Arco, Kislev — y el sueño del Gra" },
        fuente: {
          es: "Sefer Yetzirá 5:1-2 — la Samej es una de las doce letras SIMPLES (ה״ו ז״ח ט״י ל״נ ס״ע צ״ק): 'הִמְלִיךְ אוֹת ס'... וְצָר בּוֹ קֶשֶׁת בָּעוֹלָם וְכִסְלֵו בַּשָּׁנָה' — Sagitario (el Arco) y el mes de Kislev. Las recensiones difieren en el resto: la impresa (Varsovia 1884) da el órgano מרה; la del Gra asigna explícitamente el SUEÑO (בְּשֵׁינָה) y el órgano קבה. Se declara la divergencia.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El final engarzado en el principio" },
        fuente: {
          es: "Sefer Yetzirá 1:7 — 'נָעוּץ סוֹפָן בִּתְחִלָּתָן וּתְחִלָּתָן בְּסוֹפָן, כְּשַׁלְהֶבֶת קְשׁוּרָה בְּגַחֶלֶת': las diez sefirot como círculo donde el final toca el principio, 'como la llama atada al carbón'. Ginsburgh hace de este versículo la definición misma de la forma de la samej: el ciclo sin fin.",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "El vacío del tzimtzum y el reshimú" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, tabla de la Samej (The Hebrew Letters) — el círculo como 'el vacío creado por la contracción inicial de la luz infinita' (el tzimtzum del Arí) y, en Almas, 'la impresión de luz divina que quedó en el vacío' (el reshimú). El anillo vacío no está vacío: guarda la marca de la luz que lo trazó.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "El ciclo sin fin: la luz que rodea todos los mundos" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (tabla de la Samej, 'The Endless Cycle', verificada en inner.org/hebleter/samech.htm vía archivo) — la samej es la luz trascendente סוֹבֵב כׇּל עָלְמִין, que envuelve por igual cada punto de la realidad; de ahí la ecuanimidad (הִשְׁתַּווּת) que el Baal Shem Tov enseña sobre 'שִׁוִּיתִי ה' לְנֶגְדִּי תָמִיד' (Salmo 16:8, leído desde שָׁוֶה, 'igual'): por fuera, ecuanimidad ante todo lo que llega; por dentro, aspiración que sube en espiral — 'la rueda dentro de la rueda' (Yejezkel 1:16). Cf. Avot 4:1: 'rico es el que se alegra con su porción' — que Ginsburgh limita a lo material: en lo espiritual, la espiral no se detiene.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Salmo 145:14 — סוֹמֵךְ ה' לְכָל הַנֹּפְלִים, el versículo-samej del acróstico de Ashrei." },
    { es: "Berajot 4b — R. Yojanán (falta la nun de Ashrei por Amós 5:2) y R. Najman bar Yitzjak (חָזַר דָּוִד וּסְמָכָן בְּרוּחַ הַקֹּדֶשׁ)." },
    { es: "Amós 5:2 — נָפְלָה לֹא תוֹסִיף קוּם; Mijá 7:8 — כִּי נָפַלְתִּי קָמְתִּי (el par caída/levantada que Ginsburgh contrapone)." },
    { es: "Shabat 104a — ס״ע: סְמוֹךְ עֲנִיִּים / סִימָנִין עֲשֵׂה בַּתּוֹרָה; y Rav Jisdá: מ״ם וְסָמֶ״ךְ שֶׁבַּלּוּחוֹת בְּנֵס הָיוּ עוֹמְדִין." },
    { es: "Meguilá 2b-3a — el milagro de la mem y la samej invocado para probar que las letras finales (מנצפ״ך) vienen de Sinaí (שְׁכָחוּם וְחָזְרוּ וְיִסְּדוּם)." },
    { es: "Sanhedrín 21b-22a — Mar Zutra: la Torá se dio en ktav ivri y cambió con Ezra; R. Elazar HaModaí: כְּתָב זֶה לֹא נִשְׁתַּנָּה." },
    { es: "Yerushalmi Meguilá 1:9 (Venecia 71c) — R. Leví: en ktav ivri (בְּדַעַץ) el milagro fue la עי״ן; en ashurí, la סמ״ך." },
    { es: "Bereshit Rabá 17:6 — la primera samej y el satán (drash por sonido: שטן va con sin); la objeción הוּא הַסֹּבֵב respondida 'de ríos habla'." },
    { es: "Génesis 2:11 — הוּא הַסֹּבֵב: la primera samej de la Torá significa 'el que rodea' (verificado computacionalmente: ninguna samej antes)." },
    { es: "Levítico 1:4 (וְסָמַךְ יָדוֹ), Números 27:18,23 y Deuteronomio 34:9 — la raíz ס-מ-ך y la semijá de Moshé a Yehoshúa." },
    { es: "Deuteronomio 34:7 — Moshé, 120 años (= gematría del nombre pleno סמך); el puente con la semijá de 34:9 es drash nuestro." },
    { es: "Julín 98a-b — כָּל אִיסּוּרִין שֶׁבַּתּוֹרָה בְּשִׁשִּׁים (debate 60/100; batel beshishim)." },
    { es: "Berajot 57b — los cinco 'un sesentavo': fuego/Guehinom, miel/maná, Shabat/Mundo Venidero, sueño/muerte, sueño onírico/profecía." },
    { es: "Sefer Yetzirá 5:1-2 (ed. Varsovia 1884, en Sefaria) — letra simple; Sagitario (קשת) · Kislev · órgano מרה. Recensión del Gra: הִמְלִיךְ אוֹת ס' בְּשֵׁינָה (sueño) · órgano קבה. Divergencia declarada." },
    { es: "Sefer Yetzirá 1:7 — נָעוּץ סוֹפָן בִּתְחִלָּתָן וּתְחִלָּתָן בְּסוֹפָן." },
    { es: "Números 6:24-26 — la Bendición Sacerdotal: 15+20+25 = 60 letras (contadas computacionalmente, sin los marcadores de parashá)." },
    { es: "Cantar de los Cantares 3:7 (שִׁשִּׁים גִּבֹּרִים סָבִיב) y 6:8 (שִׁשִּׁים הֵמָּה מְלָכוֹת)." },
    { es: "Amidá, 2ª bendición (Guevurot) — סוֹמֵךְ נוֹפְלִים (verificado en el Sidur Ashkenaz, Sefaria)." },
    { es: "Yejezkel 1:16 — הָאוֹפַן בְּתוֹךְ הָאוֹפָן; Salmo 16:8 — שִׁוִּיתִי ה' לְנֶגְדִּי תָמִיד; Avot 4:1 — אֵיזֶהוּ עָשִׁיר (los tres citados por Ginsburgh en su lectura de la samej)." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness', tabla de la Samej ('The Endless Cycle') — círculo/anillo de boda; tzimtzum y reshimú; סוֹבֵב כׇּל עָלְמִין; sostener/confiar/semijá/estado constructo. Verificada en inner.org/hebleter/samech.htm (archivo Wayback; la URL viva sigsamech está rota)." },
    { es: "Gematrías calculadas: ס = 60 · סמך = 60+40+20 = 120." },
    { es: "Nota de precisión: la convención escribal de marcar la parashá setumá ('cerrada') con la letra ס es de los rollos y ediciones impresas (uso masorético), no un versículo; se cita como costumbre de escribas." },
  ],
};
