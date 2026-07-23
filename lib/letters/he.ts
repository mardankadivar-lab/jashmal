import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  HE (ה) — Data de la quinta letra. Contenido erudito VERIFICADO por el
//  Sofer (editor-erudito) contra Sefaria e inner.org. Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Menajot 29b — R. Yehudá bar R. Ilai: dos mundos, uno con He y uno con
//     Yud; אל תקרי בהבראם אלא בְּהֵ״י בְּרָאָם (sobre Génesis 2:4); este mundo
//     como אַכְסַדְרָה (pórtico): "el que quiere salir, sale"; la pierna
//     colgante: "si retorna en teshuvá, lo hacen entrar"; no se re-entra por
//     abajo (Reish Lakish: בא לטהר מסייעין אותו); el taga: "si retorna, yo le
//     ato un nudo (corona)". Todo leído en hebreo, segmento por segmento.
//   · Bereshit Rabá 12:10 — R. Abahu en nombre de R. Yojanán: בה״א בראם;
//     la He no atrapa la lengua → "no con esfuerzo ni fatiga creó el Santo su
//     mundo" (Salmos 33:6); cerrada por todos lados y abierta por abajo (los
//     muertos bajan al Sheol), el עוקץ de arriba (subirán en el futuro), y
//     החלון שמן הצד — "la ventana del costado: alusión a los baalei teshuvá".
//   · Génesis 47:23 — הֵא לָכֶם זֶרַע: el nombre de la letra como palabra
//     bíblica; y 47:24 — la QUINTA parte (חֲמִישִׁית) para el Faraón.
//   · Génesis 17:5 y 17:15 — Avram→Avraham, Sarai→Sará.
//   · Nedarim 32b — Rami bar Aba: Avram reinó sobre 243 miembros; con la He,
//     Avraham sobre 248 (dos ojos, dos oídos y el órgano: 5 más).
//   · Bereshit Rabá 47:1 — R. Yehoshúa ben Korjá: la yud de Sarai se partió
//     en dos He (mitad a Sará, mitad a Avraham); R. Shimon ben Yojái: la yud
//     voló ante el Trono y fue puesta en Yehoshúa (Números 13:16).
//   · Bereshit Rabá 14:9 — cinco nombres del alma: נפש רוח נשמה יחידה חיה.
//   · Sefer Yetzirá 5:1-2 (impresa) y recensión del Gra 5:1,7 — He, letra
//     SIMPLE: Aries (טלה) · Nisán. Impresa: vista (ראיה) · mano derecha.
//     Gra: habla (שיחה) · pie derecho. Ginsburgh sigue la del Gra.
//   · Tania, Igueret HaTeshuvá 4 — תשובה = תשוב ה׳: He inferior/superior;
//     yud=Jojmá, primera He=Biná (anchura y largo), vav=las seis midot,
//     He final=Maljut/el habla (cinco salidas de la boca); la He como
//     אתא קלילא דלית בה מששא, puro aliento.
//   · R. Yitzchak Ginsburgh, tabla oficial (inner.org/alefbeit/sighei):
//     concepto = autoexpresión mediante pensamiento, habla y acción; forma =
//     "ventana" tridimensional (dálet + yud suelta = profundidad); Aries ·
//     Nisán · pie derecho · habla · arquetipo Yehudá · canal Kéter→Jojmá;
//     significados del nombre: quebrarse · tomar semilla · he aquí.
//  Gematrías (calculadas letra por letra, Python):
//    ה = 5 · nombre pleno הא = 5+1 = 6 · rellenos הה = 10 · הי = 15 = יה (10+5)
//    אברם = 1+2+200+40 = 243 · אברהם = 248 · שרי = 510 · שרה = 505
//
//  NOTA DEL SOFER — descartes y precisiones:
//  · Se DESCARTA "Sanedrín 107a" como fuente del midrash de la yud de Sarai:
//    se revisó el folio completo y no está ahí. La fuente exacta verificada
//    es Bereshit Rabá 47:1.
//  · Las recensiones del Sefer Yetzirá DIFIEREN para la He (impresa: vista y
//    mano derecha; Gra: habla y pie derecho). Se declara en vez de ocultarlo;
//    Ginsburgh sigue la recensión del Gra.
//  · El mapeo trazo-por-trazo (techo=pensamiento, etc.) se presenta como
//    SÍNTESIS nuestra sobre la tabla de Ginsburgh (que da el concepto
//    global) y sobre Tania IgT 4 (anchura/largo) — no como cita textual.
//  · El orden de los cinco nombres del alma en BR 14:9 (nefesh, ruaj,
//    neshamá, YEJIDÁ, JAYÁ) difiere del orden cabalístico posterior
//    (nefesh-ruaj-neshamá-jayá-yejidá). Se cita el midrash tal cual es.
// ─────────────────────────────────────────────────────────────────────────

export const he: LetterData = {
  slug: "he",
  letter: "ה",
  nameTranslit: { es: "He", en: "Hei", fa: "هِه" },
  nameHe: "הֵא",
  value: 5,

  level1: {
    es: "Antes de leer nada, haz esto: exhala. Ese sonido — el aliento saliendo, sin lengua, sin labios, sin dientes — es la He. Todas las demás letras se pronuncian atrapando el aire en algún lugar de la boca; la He es la única que lo deja pasar. Es la letra que no cuesta nada decir. Y el Talmud enseña que con ELLA fue creado este mundo. Mira ahora su forma: cerrada por arriba y por los lados, abierta de par en par por abajo — el que quiere salir, sale. Pero arriba, en el costado, hay una brecha pequeña: una ventana. El que quiere volver, vuelve — por ahí. Quédate con esa pregunta antes de seguir: ¿por qué construiría Dios un mundo cuya puerta de salida está siempre abierta?",
    en: "Before you read anything, do this: exhale. That sound — breath leaving, no tongue, no lips, no teeth — is the Hei. Every other letter is pronounced by trapping the air somewhere in the mouth; the Hei alone lets it pass. It is the letter that costs nothing to say. And the Talmud teaches that with IT this world was created. Now look at its shape: closed above and at the sides, wide open below — whoever wants to leave, leaves. But above, at the side, there is a small gap: a window. Whoever wants to return, returns — through there. Stay with this question before going on: why would God build a world whose exit door is always open?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "El nombre de esta letra es una palabra de la Torá — y una palabra de regalo. Cuando Yosef entrega grano a Egipto en plena hambruna, dice: הֵא־לָכֶם זֶרַע, 'he aquí semilla para ustedes, y sembrarán la tierra' (Génesis 47:23). Ese הֵא es el nombre de nuestra letra usado como interjección de entrega: 'aquí tienes'. Toma, recibe, siembra. Rav Ginsburgh recoge tres sentidos del nombre: 'quebrarse; tomar semilla; he aquí' (inner.org, tabla de la He) — y los tres caben en ese versículo: el grano que se entrega es grano que se quebrará en la tierra para volverse siembra.\n\nPero el sentido más hondo del nombre no está en lo que significa sino en cómo suena. La He es puro aliento. El Midrash lo dice con precisión fonética: 'todas las letras atrapan la lengua, y esta no atrapa la lengua' (Bereshit Rabá 12:10). Y la tradición jasídica la llama אָתָא קַלִּילָא דְּלֵית בָּהּ מְשָׁשָׁא — 'letra leve que no tiene sustancia' (citado en Tania, Igueret HaTeshuvá 4). El nombre de la He es un soplo que dice 'toma'. La letra entera es el gesto de dar sin esfuerzo.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), la He es el secreto de la creación sin fatiga. El Midrash saca la conclusión exacta de su fonética: así como la He se pronuncia sin que la lengua se atasque en ningún sitio, 'no con esfuerzo ni con fatiga creó el Santo, bendito es, Su mundo, sino: por la palabra de Hashem fueron hechos los cielos (Salmos 33:6)' — Bereshit Rabá 12:10. El universo no le costó nada a Dios: fue una exhalación. Cada cosa que existe está sostenida por un aliento tan leve que ni siquiera roza la lengua.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la He es tu capacidad de expresarte. Rav Ginsburgh la define como 'la capacidad de autoexpresión mediante pensamiento, habla y acción' — los tres vestidos con los que el alma sale de sí misma hacia el mundo. Fíjate en la escena de Yosef: הא לכם זרע no es solo dar grano; es dar semilla — dar algo que el otro sembrará y multiplicará. Expresarte de verdad es eso: no imponerle al mundo un producto terminado, sino entregarle semilla. Un pensamiento que otro pensará, una palabra que otro continuará, una acción que dará frutos que no verás.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), el nombre de la He toca el misterio de la revelación: Dios se expresa como la He se pronuncia — sin esfuerzo, sin fricción, puro aliento. Y hay más: la He es la única letra que aparece DOS veces en el Nombre de cuatro letras. El Nombre respira dos veces con ella: una He arriba (Biná, el entendimiento que ensancha) y una He abajo (Maljut, el habla que realiza) — así lo despliega el Tania (Igueret HaTeshuvá 4) recogiendo al Zohar. El Dador escribió el gesto de dar dos veces en Su propia firma.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh describe la He como 'la ventana tridimensional de la consciencia': una dálet (eje horizontal + eje vertical) más un punto suelto — una yud desprendida — que alude a la coordenada de profundidad (inner.org, tabla de la He). Dos trazos unidos y uno que flota: la letra tiene una pieza que no toca a las demás.\n\nY sobre esa arquitectura, el Talmud construye la enseñanza más famosa de todo el alfabeto (Menajot 29b): este mundo fue creado con la He porque 'se parece a un pórtico (אַכְסַדְרָה): el que quiere salir, sale' — abierta por abajo, la gravedad moral empuja hacia esa puerta. '¿Y por qué su pierna cuelga? Porque si retorna en teshuvá, lo hacen entrar' — por la brecha de arriba. '¿Y que entre por donde salió? — No le alcanzaría la ayuda': el que vuelve no puede volver por el mismo camino por el que cayó; la teshuvá es una puerta distinta, más alta y más estrecha. Y el remate: '¿por qué la He lleva un taga (coronita)? Dijo el Santo, bendito es: si retorna, yo le ato un nudo'. El Midrash añade el tercer trazo del mapa (Bereshit Rabá 12:10): abierta por abajo — todos los muertos bajan; el aguijón de arriba — están destinados a subir; 'y la ventana del costado: alusión a los baalei teshuvá'.",
    },
    partes: [
      {
        label: { es: "El techo (la anchura)", en: "The roof (the width)", fa: "سقف" },
        significado: {
          es: "El trazo horizontal superior. El Tania (Igueret HaTeshuvá 4) lee la anchura de la He como הַרְחָבַת הַבֵּיאוּר וְהַהֲבָנָה — 'el ensanchamiento de la explicación y la comprensión': lo que en la Yud era un punto oculto, en la He se abre a lo ancho. Es el plano del pensamiento: antes de decir o hacer nada, entiende ancho. (Síntesis nuestra sobre Ginsburgh y Tania; ver nota en fuentes.)",
        },
        svgPathId: "he-roof",
      },
      {
        label: { es: "La pierna derecha (el descenso)", en: "The right leg (the descent)", fa: "پای راست" },
        significado: {
          es: "El trazo vertical unido al techo. El Tania lo llama el largo de la He: הַמְשָׁכָה מִלְמַעְלָה לְמַטָּה, 'la conducción de arriba hacia abajo'. Lo comprendido baja para ser dicho: es el plano del habla — que es justamente el sentido que el Sefer Yetzirá (recensión del Gra) asigna a la He. La palabra es entendimiento que aceptó descender.",
        },
        svgPathId: "he-right-leg",
      },
      {
        label: { es: "La pierna suelta (la ventana)", en: "The detached leg (the window)", fa: "پای جدا" },
        significado: {
          es: "El trazo izquierdo que NO toca el techo. Ginsburgh lo lee como una yud desprendida: la coordenada de profundidad — la acción, que se vive como separada de quien la pensó. Pero el Talmud mira la brecha, no el trazo: esa pierna cuelga para que el que retorna tenga por dónde entrar (Menajot 29b), y el Midrash la llama 'la ventana del costado, alusión a los baalei teshuvá' (Bereshit Rabá 12:10). El defecto aparente de la letra — una pieza que no cierra — es su misericordia.",
        },
        svgPathId: "he-left-leg",
      },
    ],
    mundos: {
      es: "En los mundos, la forma de la He es la arquitectura del libre albedrío. Dios no creó una fortaleza: creó un pórtico. La abertura de abajo está ahí a propósito — 'el que quiere salir, sale' (Menajot 29b). Un mundo sin salida sería una cárcel, y en una cárcel no hay mérito. La He enseña que el riesgo de perderte no es un fallo del diseño: es el precio exacto de que tu quedarte valga algo.",
    },
    almas: {
      es: "En el alma, la He te dice dos verdades que necesitas juntas. Una: caer es fácil — la puerta de abajo es ancha y siempre está abierta. Dos: volver es posible — pero no por donde saliste. 'Que entre por donde salió' — no: al que vuelve 'no le alcanzaría la ayuda' por ahí; en cambio, 'al que viene a purificarse, lo ayudan' (Reish Lakish, en Menajot 29b). La teshuvá no es deshacer el camino: es subir por una ventana que no sabías que existía. Más estrecha que la puerta — y más alta.",
    },
    divinidad: {
      es: "En lo divino, mira quién sostiene la ventana abierta. La pierna de la He cuelga porque Dios mismo la dejó colgando: la posibilidad del retorno no es una concesión tardía, está dibujada en la letra con la que el mundo fue creado. Y sobre la He hay un taga, una coronita, y el Talmud le pone voz: 'si retorna, Yo le ato un nudo' (Menajot 29b). El que vuelve no regresa a su estado anterior — vuelve coronado. Dios no solo espera al que retorna: le teje la corona mientras sube.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 5,
    guematriaForma: {
      es: "ה = 5 · nombre pleno הֵ״א = 5 + 1 = 6 · otros rellenos: ה״ה = 5 + 5 = 10 · ה״י = 5 + 10 = 15 = יָ״ה (10 + 5) — el Nombre con el que fueron formados los mundos",
    },
    mundos: {
      es: "5 es el número de la Torá entera: cinco libros — los חֲמִשָּׁה חֻמְשֵׁי תוֹרָה. Y vuelve al versículo del nombre: justo después de decir הֵא לָכֶם זֶרַע, Yosef establece: 'y daréis la QUINTA parte (חֲמִישִׁית) al Faraón, y cuatro partes serán vuestras' (Génesis 47:24). El cinco es la medida de lo que se devuelve al Dador para que las otras cuatro partes queden bendecidas. Un mundo creado con la He vive de ese ritmo: recibir cinco, devolver uno, sembrar el resto.",
    },
    almas: {
      es: "5 son los nombres del alma. El Midrash lo enumera: 'Cinco nombres le fueron dados: nefesh, ruaj, neshamá, yejidá, jayá' (Bereshit Rabá 14:9) — nefesh es la sangre, ruaj sube y baja, neshamá es el carácter, jayá porque todos los miembros mueren y ella vive en el cuerpo, yejidá porque todos los miembros vienen de dos en dos y ella es única en el cuerpo. (La Cabalá posterior los ordenará nefesh-ruaj-neshamá-jayá-yejidá; el midrash los da en este otro orden — lo citamos tal cual.) Cinco pisos tiene tu interior; la He, quinta letra, es su número de casa. Y cinco son también las salidas de la boca por las que el aliento se vuelve habla (Tania, Igueret HaTeshuvá 4): el alma quíntuple sale al mundo por cinco puertas.",
    },
    divinidad: {
      es: "El relleno ה״י del nombre de la letra suma 15 — exactamente יָ״ה (10 + 5), el Nombre del versículo que el Talmud expone: 'porque en Yah, Hashem, está la Roca de los mundos' (Isaías 26:4, en Menajot 29b) — 'con dos letras creó el Santo Su mundo': con la Yud el mundo venidero, con la He este mundo. La letra de este mundo lleva, escondido en su propio nombre, al Nombre completo que abarca los dos. Contémplalo: vives en la He — pero la He, cuando dice su nombre entero, dice también la Yud. Este mundo, pronunciado hasta el fondo, contiene al venidero.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "He aquí semilla: el nombre de la letra es un regalo" },
        fuente: {
          es: "Génesis 47:23 — 'הֵא־לָכֶם זֶרַע וּזְרַעְתֶּם אֶת־הָאֲדָמָה': Yosef entrega la semilla con el nombre de la He. Y en 47:24, la quinta parte (חֲמִישִׁית) para el Faraón — el número de la letra en el mismo discurso.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La He que entró en Avraham y en Sará" },
        fuente: {
          es: "Génesis 17:5 — 'וְהָיָה שִׁמְךָ אַבְרָהָם': Avram recibe la He y se vuelve 'padre de multitud de naciones'. Génesis 17:15 — 'לֹא־תִקְרָא אֶת־שְׁמָהּ שָׂרָי כִּי שָׂרָה שְׁמָהּ': Sarai cambia su yud final por una He. El pacto entra en los nombres por esta letra.",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "Con la He creó este mundo: el pórtico y la ventana" },
        fuente: {
          es: "Menajot 29b — R. Yehudá bar R. Ilai: dos mundos creó el Santo, uno con He y otro con Yud; 'אַל תִּקְרֵי בְּהִבָּרְאָם אֶלָּא בְּהֵ״י בְּרָאָם' (sobre Génesis 2:4). Este mundo con la He 'porque se parece a un pórtico (אכסדרה): el que quiere salir, sale'; la pierna cuelga 'porque si retorna en teshuvá, lo hacen entrar'; no por abajo — 'al que viene a purificarse, lo ayudan' (Reish Lakish); y el taga: 'si retorna, Yo le ato un nudo'.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La He que completó los 248 miembros de Avraham" },
        fuente: {
          es: "Nedarim 32b — Rami bar Aba: 'está escrito Avram y está escrito Avraham: al principio lo hizo reinar el Santo sobre 243 miembros, y al final sobre 248' — la He (5) añadió dos ojos, dos oídos y el órgano del pacto. Gematría verificada: אברם = 243, אברהם = 248, el número de los miembros del cuerpo.",
        },
        href: "/mente-cosmica",
      },
    ],
    midrash: [
      {
        titulo: { es: "La letra que no atrapa la lengua" },
        fuente: {
          es: "Bereshit Rabá 12:10 — R. Abahu en nombre de R. Yojanán: בְּהִבָּרְאָם = בְּה״א בְּרָאָם. 'Así como la He no atrapa la lengua, no con esfuerzo ni con fatiga creó el Santo Su mundo' (Salmos 33:6). Y su forma: abierta por abajo (todos bajan), el aguijón de arriba (subirán), 'y la ventana del costado: alusión a los baalei teshuvá'.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La yud de Sarai que se partió en dos He" },
        fuente: {
          es: "Bereshit Rabá 47:1 — R. Yehoshúa ben Korjá: 'la yud que el Santo tomó de Sarai se partió: mitad para Sará y mitad para Avraham' (10 = 5 + 5). R. Shimon ben Yojái: la yud voló ante el Trono — 'porque soy la más pequeña me sacaste de Sará la justa' — y fue puesta al frente de un nombre de varón: Yehoshúa (Números 13:16).",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Los cinco nombres del alma" },
        fuente: {
          es: "Bereshit Rabá 14:9 — 'חֲמִשָּׁה שֵׁמוֹת נִקְרְאוּ לָהּ: נֶפֶשׁ רוּחַ נְשָׁמָה יְחִידָה חַיָּה'. Cinco nombres, cinco niveles: el número de la He es el mapa del interior humano. (El orden del midrash difiere del orden cabalístico posterior; se cita tal cual.)",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "He: Aries, Nisán — y dos recensiones que difieren" },
        fuente: {
          es: "Sefer Yetzirá 5:1-2 — la He es una de las doce letras SIMPLES (ה״ו ז״ח ט״י ל״נ ס״ע צ״ק); le corresponden Aries (טלה) y Nisán, el mes de la liberación. Honestidad: la recensión impresa le asigna la vista (ראיה) y la mano derecha; la recensión del Gra (5:1,7), el habla (שיחה) y el pie derecho. Ginsburgh sigue la del Gra: la He es la letra del habla.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El nombre pleno de la He suma 15: el Nombre Yah" },
        fuente: {
          es: "Gematría calculada: relleno ה״י = 5+10 = 15 = יָ״ה (10+5). 'כִּי בְּיָהּ ה׳ צוּר עוֹלָמִים' (Isaías 26:4): con las dos letras del Nombre Yah fueron formados los dos mundos — la Yud el venidero, la He este (Menajot 29b; Bereshit Rabá 12:10). El nombre de la He contiene el Nombre entero.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Las dos He del Nombre: Biná y Maljut" },
        fuente: {
          es: "Tania, Igueret HaTeshuvá 4 (recogiendo al Zohar): en el Nombre de cuatro letras, la Yud es Jojmá (el punto oculto); la primera He es Biná — anchura de la comprensión y largo de la conducción; la Vav son las seis midot; y la He final es Maljut, el habla divina que se reparte en las cinco salidas de la boca. La única letra repetida del Nombre: el entendimiento arriba, la realización abajo.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "Teshuvá = tashuv He: devolver la He a su lugar" },
        fuente: {
          es: "Tania, Igueret HaTeshuvá 4 — 'תָּשׁוּב ה׳': en el secreto, la palabra teshuvá se lee 'retornará la He'. La He inferior que se aleja en el pecado — teshuvá tataá la devuelve; la He superior — teshuvá ilaá. La ventana de la He (Menajot 29b) y el 'tashuv He' del Tania son la misma puerta vista desde abajo y desde arriba.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "La ventana de la consciencia: pensamiento, habla y acción" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sighei) — la He es 'la capacidad de autoexpresión mediante pensamiento, habla y acción'; su forma, 'la ventana tridimensional de la consciencia' (dálet + yud suelta como coordenada de profundidad); su canal va de Kéter a Jojmá; su arquetipo es Yehudá — el que aprendió a confesar, es decir, a volver.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Menajot 29b — R. Yehudá bar R. Ilai: los dos mundos creados con Yud y He (בהי בראם, sobre Génesis 2:4); el pórtico (אכסדרה), la pierna colgante para el que retorna, Reish Lakish (בא לטהר מסייעין אותו) y el taga ('si retorna, Yo le ato un nudo'). Leído íntegro en hebreo." },
    { es: "Bereshit Rabá 12:10 — בה״א בראם; la He no atrapa la lengua: creación sin esfuerzo (Salmos 33:6); abierta por abajo, el aguijón de arriba, la ventana del costado para los baalei teshuvá." },
    { es: "Génesis 47:23-24 — הֵא לָכֶם זֶרַע (el nombre de la letra como palabra bíblica) y la quinta parte (חמישית) al Faraón." },
    { es: "Génesis 17:5 y 17:15 — Avram→Avraham; Sarai→Sará." },
    { es: "Nedarim 32b — Rami bar Aba: de 243 a 248 miembros con la He añadida; los cinco: dos ojos, dos oídos y el órgano del pacto." },
    { es: "Bereshit Rabá 47:1 — la yud de Sarai partida en dos He (R. Yehoshúa ben Korjá); la yud que voló ante el Trono y fue puesta en Yehoshúa (R. Shimon ben Yojái, con Números 13:16)." },
    { es: "Bereshit Rabá 14:9 — los cinco nombres del alma: נפש רוח נשמה יחידה חיה." },
    { es: "Salmos 33:6 — בִּדְבַר ה׳ שָׁמַיִם נַעֲשׂוּ (citado por Bereshit Rabá 12:10)." },
    { es: "Isaías 26:4 — כִּי בְּיָהּ ה׳ צוּר עוֹלָמִים (expuesto en Menajot 29b y Bereshit Rabá 12:10)." },
    { es: "Sefer Yetzirá 5:1-2 (recensión impresa) y recensión del Gra 5:1 y 5:7 — He, letra simple: Aries · Nisán; impresa: vista y mano derecha; Gra: habla (שיחה) y pie derecho. Ambas leídas en hebreo en Sefaria; la diferencia se declara." },
    { es: "Tania, Igueret HaTeshuvá 4 — תשוב ה׳ (teshuvá inferior y superior); las cuatro letras del Nombre (Yud=Jojmá, He=Biná con anchura y largo, Vav=seis midot, He final=Maljut/habla, cinco salidas de la boca); la He como אתא קלילא דלית בה מששא." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters: Channels of Creative Consciousness' — tabla oficial de la He (inner.org/alefbeit/sighei): pensamiento-habla-acción; ventana tridimensional (dálet + yud); Aries · Nisán · pie derecho · habla · Yehudá · Kéter→Jojmá; sentidos del nombre: quebrarse, tomar semilla, he aquí." },
    { es: "Gematrías calculadas: ה = 5 · הא = 6 · הה = 10 · הי = 15 = יה · אברם = 243 · אברהם = 248 · שרי = 510 · שרה = 505." },
    { es: "Nota de precisión: 'Sanedrín 107a' circula como fuente del midrash de la yud de Sarai, pero revisado el folio NO está ahí; la fuente exacta es Bereshit Rabá 47:1. El mapeo trazo-por-trazo (techo=pensamiento, pierna=habla, pierna suelta=acción) es síntesis nuestra sobre la tabla de Ginsburgh y Tania IgT 4, no cita textual." },
  ],
};
