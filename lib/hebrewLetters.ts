// Significado místico de las 22 letras hebreas según el marco de Rav Ginsburgh
// ("The Hebrew Letters: Channels of Creative Consciousness").
// Integrado en el Árbol de la Vida: cada letra es un sendero (camino de sabiduría).

export interface HebrewLetterMeaning {
  letter: string;         // la letra
  name: string;           // nombre en transliteración
  nameHe: string;         // nombre en hebreo
  value: number;          // valor de gematría
  form: string;           // qué representa visualmente la forma de la letra
  innerMeaning: string;   // significado interior profundo (Ginsburgh)
  consciousness: string;  // canal de consciencia que encarna
  pathMeaning: string;    // significado del sendero en el Árbol de la Vida
  zerohar?: string;       // cita o enseñanza relevante del Zohar/Kabbalah
  analogia?: string;      // analogía o imagen contemplativa
}

export const LETTER_MEANINGS: Record<string, HebrewLetterMeaning> = {
  "א": {
    letter: "א", name: "Álef", nameHe: "אָלֶף", value: 1,
    form: "Un hombre con los brazos extendidos, o una vav diagonal entre dos yuds — Dios y el hombre conectados.",
    innerMeaning: "Álef es la paradoja de la unidad divina. Su forma contiene una vav (6, el hombre) sostenida entre dos yuds (10, la divinidad) — el puente entre lo infinito y lo finito. Es el primer número, antes de toda manifestación.",
    consciousness: "La consciencia de la unidad fundamental. La capacidad de ver Un en el Todo.",
    pathMeaning: "El sendero Kéter → Jojmá: el primer paso de la voluntad hacia la sabiduría. El momento en que Ein Sof se inclina hacia la expresión.",
    zerohar: "El Zohar enseña: Álef es el rey de todas las letras. Cuando Dios quiso crear el mundo, Álef se presentó primero, y Él le prometió: 'Comenzaré la Torah contigo' (Anoji — אנכי).",
    analogia: "Imagina el momento antes de hablar — ese instante de silencio lleno de potencial. Eso es Álef.",
  },
  "ב": {
    letter: "ב", name: "Bet", nameHe: "בֵּית", value: 2,
    form: "Una casa con tres paredes y una apertura — contiene y protege, pero tiene una puerta hacia el mundo.",
    innerMeaning: "Bet es la casa (bayit), el recipiente de toda existencia. Es el segundo en valor pero primero en la Torá (Bereshit). El dos implica dualidad: arriba/abajo, interior/exterior, Creador/creación.",
    consciousness: "La consciencia de la bendición (brajá) — el flujo de energía divina hacia un recipiente preparado.",
    pathMeaning: "El sendero Kéter → Biná: la voluntad recibe forma en el entendimiento. La madre superior comienza a alojar la chispa de Jojmá.",
    analogia: "Una casa sagrada que preserva la Presencia divina — como el Mishkán en el desierto.",
  },
  "ג": {
    letter: "ג", name: "Guimel", nameHe: "גִּימֶל", value: 3,
    form: "Un hombre rico corriendo hacia el daleth (ד) — moviéndose para dar, para alcanzar al necesitado.",
    innerMeaning: "Guimel es la generosidad (gemilut jasadim). Su forma es la de quien corre a dar. El tres es el número del movimiento y la transmisión. La síntesis entre Álef (1) y Bet (2).",
    consciousness: "La consciencia de la retribución y el movimiento — lo que se da vuelve transformado.",
    pathMeaning: "El sendero Kéter → Tiferet: la voluntad suprema desciende directamente al corazón del árbol. La corona se refleja en la belleza.",
    zerohar: "Guimel corre hacia Dalet porque el rico siempre debe ir hacia el pobre (Talmud, Shabat 104a).",
  },
  "ד": {
    letter: "ד", name: "Dalet", nameHe: "דָּלֶת", value: 4,
    form: "Una puerta o un hombre encorvado — la humildad de quien recibe, la apertura necesaria para que entre lo sagrado.",
    innerMeaning: "Dalet es la pobreza (dalut) y la puerta (delet). El receptor necesita vaciarse para ser llenado. Los cuatro mundos (Atzilut, Beriá, Yetzirá, Asiyá) corresponden a este número.",
    consciousness: "La consciencia de la receptividad y la humildad — el vaciamiento que permite el llenado.",
    pathMeaning: "El sendero Jojmá → Biná: la sabiduría entra en el entendimiento. El padre (Aba) entra en la madre (Ima) para generar la creación.",
    analogia: "La puerta no hace nada — pero sin ella no hay entrada. La humildad de Dalet es su mayor fuerza.",
  },
  "ה": {
    letter: "ה", name: "He", nameHe: "הֵא", value: 5,
    form: "Una ventana o una persona con los brazos levantados hacia arriba — revelación, luz que desciende.",
    innerMeaning: "He es la ventana (histaklut), la contemplación. Aparece dos veces en el nombre YHVH — una para lo superior (Biná) y otra para lo inferior (Maljut). El aliento divino que anima (neshamá).",
    consciousness: "La consciencia de la contemplación y la revelación — ver lo que estaba oculto.",
    pathMeaning: "El sendero Jojmá → Jésed: la sabiduría fluye hacia la misericordia. La chispa del padre desciende a la columna derecha.",
    zerohar: "Con He Dios creó este mundo; con Yod, el mundo venidero (Menajot 29b). He es la letra de la creación revelada.",
  },
  "ו": {
    letter: "ו", name: "Vav", nameHe: "וָיו", value: 6,
    form: "Un clavo o gancho — conecta, une, une lo de arriba con lo de abajo.",
    innerMeaning: "Vav es la conexión (vav ha-hijur — la vav de la unión). En hebreo, vav al inicio de una palabra significa 'y' — siempre conecta. El seis representa los seis extremos del espacio (arriba, abajo, los cuatro puntos cardinales) y a Zeir Anpin.",
    consciousness: "La consciencia del tikún (rectificación) mediante la conexión — unir lo que estaba separado.",
    pathMeaning: "El sendero Jojmá → Tiferet: la intuición primordial desciende al corazón. El padre ilumina al hijo.",
    analogia: "El clavo que sostiene el cuadro a la pared — invisible pero esencial. Sin Vav, nada se sostiene.",
  },
  "ז": {
    letter: "ז", name: "Zayin", nameHe: "זַיִן", value: 7,
    form: "Una espada — pero también una corona sobre una vav. El arma que sostiene la paz.",
    innerMeaning: "Zayin es el sustento (mazon) y el descanso. El siete es el número del Shabat — el punto de equilibrio tras la creación. La espada protege, pero la corona que corona a la vav indica que la fuerza más alta es espiritual.",
    consciousness: "La consciencia del descanso sagrado — el séptimo día como coronación de la creación.",
    pathMeaning: "El sendero Biná → Guevurá: el entendimiento fluye hacia el juicio. La madre superior alimenta la columna izquierda.",
    zerohar: "Zayin = siete días de la semana. El Zohar enseña que el Shabat es el alma de todos los días.",
  },
  "ח": {
    letter: "ח", name: "Jet", nameHe: "חֵית", value: 8,
    form: "Dos vav unidas por un puente superior — la vida (jaim) conecta dos realidades.",
    innerMeaning: "Jet es la vida (jaim) y el pecado (jet). El ocho está más allá del siete (más allá del tiempo natural). La brit milá se realiza al octavo día — la entrada a una dimensión más alta. La forma de Jet contiene un jaf y un zayin unidos.",
    consciousness: "La consciencia de la vida como algo sagrado, más allá de lo natural — el milagro de existir.",
    pathMeaning: "El sendero Biná → Tiferet: el entendimiento nutre al corazón. La madre ilumina al hijo Zeir Anpin.",
    analogia: "El número 8 de costado es el infinito (∞). Jet señala lo que está más allá de los límites del tiempo.",
  },
  "ט": {
    letter: "ט", name: "Tet", nameHe: "טֵית", value: 9,
    form: "Una serpiente enroscada sobre sí misma, mirando hacia adentro — el bien oculto en el interior.",
    innerMeaning: "Tet es el bien oculto (tov ha-ganuz). Su forma es introvertida — el bien está dentro. La primera vez que aparece tov en la Torá es en Génesis 1:4 (la luz que Dios vio que era buena). El nueve es el número de la gestación (nueve meses).",
    consciousness: "La consciencia del bien interior — reconocer lo divino en lo que parece ordinario.",
    pathMeaning: "El sendero Jésed → Guevurá: la misericordia y el juicio se encuentran en la horizontal central.",
    zerohar: "Tet es la primera letra de Tov (טוב). El Zohar enseña que la luz primordial está escondida para los justos.",
  },
  "י": {
    letter: "י", name: "Yod", nameHe: "יוֹד", value: 10,
    form: "El punto más pequeño — pero toda la Torá está contenida en la Yod de Bereshit.",
    innerMeaning: "Yod es el punto primordial (nekudah rishonah). Es la letra de Jojmá — la sabiduría como punto de intuición pura. El diez completa el ciclo de las sefirot. Dios usó la Yod para crear el mundo venidero.",
    consciousness: "La consciencia de la fuente — el punto del que emana toda existencia.",
    pathMeaning: "El sendero Jésed → Tiferet: la misericordia desciende al corazón. La columna derecha alimenta el centro.",
    zerohar: "La Yod de YHVH corresponde a Jojmá. En ella está contenida toda la Torah.",
    analogia: "Un punto en el espacio — infinitamente pequeño, pero contiene todo el universo de posibilidades.",
  },
  "כ": {
    letter: "כ", name: "Kaf", nameHe: "כַּף", value: 20,
    form: "Una palma de la mano abierta — la capacidad de recibir y dar, de coronar.",
    innerMeaning: "Kaf es la palma (kaf) y la corona (kéter en arameo). La mano abierta puede recibir o dar. El veinte multiplica la unidad del dos por el ciclo del diez. Kaf final (ך) tiene valor de 500 — la expansión sin límite.",
    consciousness: "La consciencia de la realización — llevar el potencial a su actualización.",
    pathMeaning: "El sendero Jésed → Netzaj: la misericordia fluye hacia la victoria/eternidad.",
  },
  "ל": {
    letter: "ל", name: "Lamed", nameHe: "לָמֶד", value: 30,
    form: "La letra más alta del alfabeto — una torre que se eleva, la aspiración hacia lo alto.",
    innerMeaning: "Lamed es el aprendizaje (limud) y la enseñanza. Es la única letra que se eleva por encima de la línea — el estudiante que aspira hacia el maestro. El corazón (lev) y el aprendizaje (limud) están íntimamente conectados.",
    consciousness: "La consciencia del aprendizaje continuo — la apertura hacia el maestro divino.",
    pathMeaning: "El sendero Guevurá → Tiferet: el juicio se integra en la belleza. El rigor se armoniza.",
    zerohar: "Lamed = lev (לב, corazón = 32). El centro del aprendizaje es el corazón, no solo la mente.",
  },
  "מ": {
    letter: "מ", name: "Mem", nameHe: "מֵם", value: 40,
    form: "Aguas que fluyen (mem abierta) y el útero sellado (mem final, ם) — lo revelado y lo oculto.",
    innerMeaning: "Mem son las aguas (mayim) — la fuente de la vida. Mem abierta (מ) = el mar revelado; Mem final (ם) = el mar oculto. El cuarenta: cuarenta años en el desierto, cuarenta días de lluvia en el diluvio.",
    consciousness: "La consciencia de la fuente — el origen de todo flujo de vida y sabiduría.",
    pathMeaning: "El sendero Guevurá → Hod: el juicio fluye hacia el esplendor. La columna izquierda desciende.",
    analogia: "El agua toma la forma del recipiente que la contiene — así la sabiduría se adapta al estudiante.",
  },
  "נ": {
    letter: "נ", name: "Nun", nameHe: "נוּן", value: 50,
    form: "Un pez sumergido — la vida oculta en las profundidades, que sabe nadar en la oscuridad.",
    innerMeaning: "Nun es la fidelidad (ne'emanut) y el pez (dag). El cincuenta: cincuenta puertas de entendimiento (Biná). La Nun se dobla sobre sí misma en humildad. El Mesías está asociado con la Nun (lamed-nun = 80 años, la fuerza de la renovación).",
    consciousness: "La consciencia de la emergencia — surgir de las profundidades hacia la revelación.",
    pathMeaning: "El sendero Tiferet → Netzaj: el corazón fluye hacia la eternidad.",
  },
  "ס": {
    letter: "ס", name: "Samej", nameHe: "סָמֶך", value: 60,
    form: "Un círculo perfecto y cerrado — apoyo sin principio ni fin, la protección divina.",
    innerMeaning: "Samej es el apoyo (somej noflin — 'sostiene a los que caen', Salmos 145). El círculo no tiene principio ni fin — como la eternidad de Dios. El sesenta multiplica la perfección del seis por el ciclo del diez.",
    consciousness: "La consciencia del apoyo divino — confiar en que Dios sostiene toda caída.",
    pathMeaning: "El sendero Tiferet → Yesod: el corazón fluye al fundamento.",
    zerohar: "El Zohar enseña que el Samej cierra el círculo de la teshuvá — el retorno a la fuente.",
  },
  "ע": {
    letter: "ע", name: "Ayin", nameHe: "עַיִן", value: 70,
    form: "Un ojo — pero también la fuente (ayin = ojo/fuente). Ver y ser visto por Dios.",
    innerMeaning: "Ayin es el ojo (70) y la fuente. Los 70 rostros de la Torá corresponden a los 70 pueblos del mundo. El ojo que ve con pureza transforma lo que observa. También = nada (ain), la nulificación del ego.",
    consciousness: "La consciencia de la visión divina — ver la presencia de Dios en toda situación.",
    pathMeaning: "El sendero Tiferet → Hod: el corazón desciende al esplendor.",
    analogia: "El ojo sano solo ve lo sagrado — incluso en lo aparentemente mundano.",
  },
  "פ": {
    letter: "פ", name: "Pe", nameHe: "פֵּה", value: 80,
    form: "Una boca con una pequeña bet dentro — la boca contiene una casa interior, un espacio para la palabra sagrada.",
    innerMeaning: "Pe es la boca (peh) — el poder de la palabra. La bet interior representa el hogar de la expresión sagrada. El ochenta: la fuerza madura, la sabiduría expresada. Pe final (ף) = la voz que se expande sin límite.",
    consciousness: "La consciencia de la expresión sagrada — que cada palabra sea un acto de creación.",
    pathMeaning: "El sendero Netzaj → Hod: la eternidad y el esplendor se unen en el nivel emocional inferior.",
    zerohar: "Dios creó el mundo mediante el habla (diez declaraciones de Bereshit). Pe es el canal de esa creación.",
  },
  "צ": {
    letter: "צ", name: "Tzadi", nameHe: "צַדִּי", value: 90,
    form: "Un justo inclinado — la postura del tzadik (justo) que se inclina ante lo divino.",
    innerMeaning: "Tzadi es el justo (tzadik) y la humildad. La letra muestra a un hombre inclinado, en postura de humildad y servicio. El noventa está próximo a la plenitud del cien. El tzadik es el canal del mundo (Proverbios 10:25).",
    consciousness: "La consciencia de la rectitud — alinear cada acción con la voluntad divina.",
    pathMeaning: "El sendero Netzaj → Yesod: la eternidad fluye al fundamento.",
  },
  "ק": {
    letter: "ק", name: "Kof", nameHe: "קוֹף", value: 100,
    form: "Un ojo de aguja — o el horizonte donde el sol entra bajo la tierra para renacer.",
    innerMeaning: "Kof es el mono (kof) y también el 'ojo de aguja' — la apertura estrecha por la que pasa lo sagrado. El cien (100 = 10²) representa la plenitud elevada. El sol que desciende para renacer — el ciclo de muerte y resurrección sagrada.",
    consciousness: "La consciencia del renacimiento — lo que parece muerte es en realidad transformación.",
    pathMeaning: "El sendero Netzaj → Maljut: la eternidad desciende al reino manifestado.",
  },
  "ר": {
    letter: "ר", name: "Resh", nameHe: "רֵישׁ", value: 200,
    form: "Una cabeza inclinada — el comienzo (rosh = cabeza) que se inclina hacia la humildad.",
    innerMeaning: "Resh es la cabeza (rosh) y el comienzo. El doscientos = dos cabezas — el nivel de Kéter elevado al doble. La cabeza inclinada indica que la verdadera sabiduría siempre reconoce lo que no sabe.",
    consciousness: "La consciencia del comienzo renovado — en cada momento Dios recrea el mundo.",
    pathMeaning: "El sendero Hod → Yesod: el esplendor fluye hacia el fundamento.",
    analogia: "La cabeza del año (Rosh Hashaná) — el momento en que toda realidad se renueva.",
  },
  "ש": {
    letter: "ש", name: "Shin", nameHe: "שִׁין", value: 300,
    form: "Tres llamas — o tres vav conectadas en una base. El fuego del alma divina (neshamá = alma).",
    innerMeaning: "Shin es el fuego (esh) y la paz (shalom). Sus tres cabezas representan las tres columnas del árbol (misericordia, juicio, equilibrio). Es la letra del nombre Shaddai (El Todopoderoso) y del Shabat.",
    consciousness: "La consciencia del fuego divino interior — el entusiasmo sagrado (hitlahavut) que consume el ego.",
    pathMeaning: "El sendero Hod → Maljut: el esplendor desciende al reino.",
    zerohar: "Shin = esh (אש, fuego) + mayim (מים, agua). Shamayim (שמים, cielo) = fuego + agua unidos. El cielo contiene la síntesis de los opuestos.",
  },
  "ת": {
    letter: "ת", name: "Tav", nameHe: "תָּו", value: 400,
    form: "Una marca o firma — dos vav unidas en la base. La huella, el sello, la conclusión.",
    innerMeaning: "Tav es la marca (tav) y la verdad (emet — comenzando con Álef y terminando con Tav). Es la última letra — la consumación de la creación. El sello de Dios es la verdad (Talmud, Shabat 55a). Contiene la unión de todos los senderos anteriores.",
    consciousness: "La consciencia de la integridad — cuando el Álef (1) y el Tav (400) se unen, nace la verdad (emet = אמת).",
    pathMeaning: "El sendero Yesod → Maljut: el fundamento desciende al reino. La transmisión final antes de la manifestación plena.",
    zerohar: "El Zohar enseña: la letra Tav es el sello del Santo Bendito Sea. Sin ella, nada en la creación persevera.",
    analogia: "La firma al final de una carta — sin ella, el mensaje no tiene validez ni origen confirmado.",
  },
};

// Mapa de letra → sendero (qué sefirot conecta)
export const LETTER_TO_PATH: Record<string, { from: string; to: string }> = {
  "א": { from: "keter", to: "chochmah" },
  "ב": { from: "keter", to: "binah" },
  "ג": { from: "keter", to: "tiferet" },
  "ד": { from: "chochmah", to: "binah" },
  "ה": { from: "chochmah", to: "chesed" },
  "ו": { from: "chochmah", to: "tiferet" },
  "ז": { from: "binah", to: "gevurah" },
  "ח": { from: "binah", to: "tiferet" },
  "ט": { from: "chesed", to: "gevurah" },
  "י": { from: "chesed", to: "tiferet" },
  "כ": { from: "chesed", to: "netzach" },
  "ל": { from: "gevurah", to: "tiferet" },
  "מ": { from: "gevurah", to: "hod" },
  "נ": { from: "tiferet", to: "netzach" },
  "ס": { from: "tiferet", to: "yesod" },
  "ע": { from: "tiferet", to: "hod" },
  "פ": { from: "netzach", to: "hod" },
  "צ": { from: "netzach", to: "yesod" },
  "ק": { from: "netzach", to: "malchut" },
  "ר": { from: "hod", to: "yesod" },
  "ש": { from: "hod", to: "malchut" },
  "ת": { from: "yesod", to: "malchut" },
};
