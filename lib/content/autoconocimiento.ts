// ─────────────────────────────────────────────────────────────────────────
//  AUTOCONOCIMIENTO — datos verificados por el Sofer (2026-06-15)
// ─────────────────────────────────────────────────────────────────────────
//  Fuente: docs/specs/mazal-mapa-del-alma.md  y  docs/specs/espejo-del-alma.md
//  REGLA: este archivo es la TRANSCRIPCIÓN fiel de las specs. No inventar ni
//  cambiar fuentes, citas ni folios. El inglés (en) lo llena el Sofer por fases
//  → donde falte va `null` y un // TODO(fa/en).  Los disclaimers es+fa SÍ están
//  completos en la spec y van completos aquí.
// ─────────────────────────────────────────────────────────────────────────

// ===========================================================================
//  FUNCIÓN 1 — מַרְאָה / Mapa del Alma
// ===========================================================================

// REGLA DE ORO (texto fijo, mostrar arriba) — spec §"REGLA DE ORO"
export const MAPA_REGLA_DE_ORO = {
  es:
    "El mazal describe la materia prima, no el resultado. Tu signo y la letra de tu mes señalan la TENDENCIA con la que tu alma bajó al mundo — el material de tu trabajo, el campo de tu batalla. Nunca señalan cómo termina. El desenlace lo decide tu libre albedrío sometido a Dios. Por eso esto es tikún, no fortuna. אֵין מַזָּל לְיִשְׂרָאֵל — 'no hay astro que gobierne a Israel' (Shabat 156a).",
  fa:
    "مَزَّل، مادهٔ خام را توصیف می‌کند، نه نتیجه را. برج تو و حرفِ ماهِ تو، گرایشی را نشان می‌دهند که روحِ تو با آن به جهان فرود آمد — مادهٔ کارَت، میدانِ نبردَت. اینها هرگز نشان نمی‌دهند که چگونه پایان می‌یابد. فرجامِ کار را ارادهٔ آزادِ تو که به خداوند سپرده شده، رقم می‌زند. به همین سبب این تیکون است، نه بخت. אֵין מַזָּל לְיִשְׂרָאֵל — «هیچ ستاره‌ای بر اسرائیل فرمان نمی‌رانَد» (شبات ۱۵۶a).",
  en: null as string | null, // TODO(en)
};

// DISCLAIMER del Mapa (fijo, es + fa completos en la spec)
export const MAPA_DISCLAIMER = {
  es:
    "Esto no es adivinación. Son textos sagrados que describen rasgos GENERALES del alma — no el destino de ningún individuo. Por encima de todo está el libre albedrío de quien se somete a la voluntad de Dios. אֵין מַזָּל לְיִשְׂרָאֵל — 'No hay astro que gobierne a Israel' (Talmud, Shabat 156a). Usa este mapa como espejo para tu avodá, no como oráculo. Lo que ves es el punto de partida; el camino lo escribes tú.",
  fa:
    "این پیشگویی نیست. این متن‌های مقدّس، ویژگی‌های کلّیِ روح را توصیف می‌کنند، نه سرنوشتِ یک شخص را. برتر از همه، ارادهٔ آزادِ کسی است که خود را به خواستِ خداوند می‌سپارد. אֵין מַזָּל לְיִשְׂרָאֵל (تلمود، شبات ۱۵۶a). این نقشه را همچون آینه‌ای برای عَبودا به کار بگیر، نه غیب‌گو.",
  en: null as string | null, // TODO(en)
};

// Texto honesto de la gematría del nombre — spec §"GEMATRÍA DEL NOMBRE"
export const MAPA_GEMATRIA_TEXTO = {
  es:
    "Tu nombre tiene una raíz numérica — un sello, no un hechizo. La suma de sus letras (gematría) es una raíz para meditar sobre el sentido de tu nombre, no un número mágico de suerte. Buscar palabras/versículos del mismo valor es una invitación a pensar, una puerta de estudio. Lo que hagas con tu nombre lo decides tú.",
  fa:
    "نامِ تو ریشه‌ای عددی دارد — مُهری، نه وِردی جادویی. مجموعِ حروفِ آن (گیماتریا) ریشه‌ای است برای تأمل در معنایِ نامَت، نه عددی جادویی برای بخت و اقبال. جستجویِ واژه‌ها و آیه‌هایِ هم‌ارزش، دعوتی است به اندیشیدن، دری برای مطالعه. آنچه با نامت می‌کنی، خودت تصمیم می‌گیری.",
  en: null as string | null, // TODO(en)
};

// Nota devocional del nombre de la madre (campo OPCIONAL) — spec §"Madre"
export const MAPA_MADRE_NOTA = {
  es:
    "Costumbre devocional de la tefilá: «[Nombre] ben/bat [nombre de la madre]». No tiene efectos automáticos ni mágicos, nunca es requisito ni un «amplificador de poder». Es opcional.",
  fa:
    "رسمی نیایشی در تِفیلا (دعا): «[نام] بِن/بَت [نامِ مادر]». هیچ اثرِ خودکار یا جادویی ندارد، هرگز شرط نیست و «تقویت‌کنندهٔ نیرو» نیز نیست. اختیاری است.",
  en: null as string | null, // TODO(en)
};

// ─── TRANSCRIPCIÓN DE NOMBRES (latino/persa → hebreo) — spec del Mapa,
//     §"TRANSCRIPCIÓN DE NOMBRES" (Sofer 2026-06-15). NOTA HONESTA es+fa
//     completas en la spec. El número de gematría NUNCA lo decide la IA: se
//     recalcula en código con gematria() de lib/sources/lexicon.ts. ──────────
export const MAPA_TRANSLIT_NOTA = {
  es:
    "Los nombres extranjeros no tienen UNA sola forma hebrea: según cómo se marquen las vocales hay varias grafías razonables, y por tanto varias gematrías posibles. Por eso te mostramos opciones, no un número único. La gematría de tu nombre es una raíz para meditar y estudiar —una puerta— no un número fijo ni mágico ni de suerte. Lo que hagas con tu nombre lo decides tú.",
  fa:
    "نام‌های بیگانه یک شکلِ عبریِ یگانه ندارند: بسته به اینکه واکه‌ها چگونه نوشته شوند، چند املای منطقی و در نتیجه چند گیماتریای ممکن وجود دارد. به همین دلیل گزینه‌ها را نشان می‌دهیم، نه یک عددِ واحد. گیماتریای نامِ تو ریشه‌ای برای تأمل و مطالعه است — دری — نه عددی ثابت یا جادویی یا شانس. آنچه با نامت می‌کنی، خودت تصمیم می‌گیری.",
  en: null as string | null, // TODO(en)
};

export const MAPA_TRANSLIT_UI = {
  /** botón "convertir al hebreo" */
  convertir: { es: "Convertir al hebreo", fa: "تبدیل به عبری", en: null as string | null },
  langLabel: { es: "Idioma del nombre", fa: "زبانِ نام", en: null as string | null },
  langEs: { es: "Español", fa: "اسپانیایی", en: null as string | null },
  langEn: { es: "Inglés", fa: "انگلیسی", en: null as string | null },
  langFa: { es: "Persa", fa: "فارسی", en: null as string | null },
  pickLabel: { es: "Elige una grafía", fa: "یک املا را برگزین", en: null as string | null },
  approxLabel: {
    es: "Aproximado · variantes, no un número fijo",
    fa: "تقریبی · گونه‌ها، نه عددی ثابت",
    en: null as string | null,
  },
  loading: { es: "Buscando grafías…", fa: "در جستجوی املاها…", en: null as string | null },
  error: {
    es: "No se pudo convertir ahora. Intenta de nuevo o escribe el nombre directamente en hebreo.",
    fa: "اکنون امکان تبدیل نبود. دوباره تلاش کن یا نام را مستقیم به عبری بنویس.",
    en: null as string | null,
  },
  /** invitación cuando el nombre está en otro alfabeto: la gematría se calcula
      sobre letras hebreas, así que primero hay que convertir el nombre. */
  invitacion: {
    es: "La gematría se calcula sobre las letras hebreas. Convierte tu nombre al hebreo para revelar su raíz numérica.",
    fa: "گِماتریا بر پایهٔ حروفِ عبری محاسبه می‌شود. نامَت را به عبری تبدیل کن تا ریشهٔ عددیِ آن آشکار شود.",
    en: null as string | null,
  },
};

export interface MesHebreo {
  /** orden 1..12 */
  n: number;
  /** nombre hebreo con niqud */
  he: string;
  /** transliteración / nombre en español */
  nombre: string;
  // ---- DATOS DUROS (del versículo, Sefer Yetzirah cap. 5) ----
  signoHe: string;
  signoEs: string;
  /** letra simple del Sefer Yetzirah */
  letra: string;
  letraNombre: string;
  /** sentido / conducto (hebreo) */
  sentidoHe: string;
  /** sentido / conducto (español) */
  sentidoEs: string;
  // ---- INTERPRETACIÓN / tradición (cursiva o rótulo) ----
  tendencia: string;
  /** pregunta de tikún */
  tikun: string;
  /** color de acento para la tarjeta */
  color: string;
}

// LOS 12 MESES — letra/sentido = VERIFICADO Sefer Yetzirah 5. Transcripción
// literal de la spec §"LOS 12 MESES". (es; fa/en los llena el Sofer.)
export const MESES: MesHebreo[] = [
  {
    n: 1, he: "נִיסָן", nombre: "Nisán",
    signoHe: "טָלֶה", signoEs: "Aries", letra: "ה", letraNombre: "he",
    sentidoHe: "שִׂיחָה", sentidoEs: "habla",
    tendencia: "iniciativa, fuego del comienzo, liderazgo impulsivo.",
    tikun: "¿cómo pongo mi empuje al servicio de algo más grande que mi ego, para que mi fuego encienda y no queme?",
    color: "#e0533a",
  },
  {
    n: 2, he: "אִיָּיר", nombre: "Iyar",
    signoHe: "שׁוֹר", signoEs: "Tauro", letra: "ו", letraNombre: "vav",
    sentidoHe: "הִרְהוּר", sentidoEs: "pensamiento",
    tendencia: "firmeza, paciencia, apego a lo concreto; también terquedad.",
    tikun: "¿cómo transformo mi terquedad en constancia santa y mi apego material en canal para elevarlo?",
    color: "#3fae6b",
  },
  {
    n: 3, he: "סִיוָן", nombre: "Siván",
    signoHe: "תְּאוֹמִים", signoEs: "Géminis", letra: "ז", letraNombre: "zayin",
    sentidoHe: "הִלּוּךְ", sentidoEs: "andar",
    tendencia: "dualidad, palabra, mente ágil que une opuestos; riesgo de dispersión.",
    tikun: "¿cómo unifico mis dos mitades para servir con un solo corazón?",
    color: "#e0c84a",
  },
  {
    n: 4, he: "תַּמּוּז", nombre: "Tamuz",
    signoHe: "סַרְטָן", signoEs: "Cáncer", letra: "ח", letraNombre: "jet",
    sentidoHe: "רְאִיָּה", sentidoEs: "vista",
    tendencia:
      "sensibilidad, memoria, mundo interior, protección del hogar; vulnerable al repliegue (mes del quiebre de las tablas).",
    tikun: "¿cómo convierto mi sensibilidad en compasión activa y mi caparazón en refugio para otros?",
    color: "#5fa3c9",
  },
  {
    n: 5, he: "אָב", nombre: "Av",
    signoHe: "אַרְיֵה", signoEs: "Leo", letra: "ט", letraNombre: "tet",
    sentidoHe: "שְׁמִיעָה", sentidoEs: "oído",
    tendencia:
      "nobleza, calor, presencia que ilumina; riesgo de orgullo (la ט encierra el tov oculto incluso en el duelo de Av).",
    tikun: "¿cómo hallo el bien escondido dentro de mi dolor y pongo mi fuerza al servicio, no a la vanidad?",
    color: "#e08a2e",
  },
  {
    n: 6, he: "אֱלוּל", nombre: "Elul",
    signoHe: "בְּתוּלָה", signoEs: "Virgo", letra: "י", letraNombre: "yod",
    sentidoHe: "מַעֲשֶׂה", sentidoEs: "acción",
    tendencia:
      "precisión, pureza, autoexamen (mes del jeshbón hanéfesh); riesgo de autocrítica paralizante.",
    tikun: "¿cómo uso mi mirada exigente para refinarme con amor (teshuvá), no para condenarme?",
    color: "#8bb04a",
  },
  {
    n: 7, he: "תִּשְׁרֵי", nombre: "Tishrei",
    signoHe: "מֹאזְנַיִם", signoEs: "Libra", letra: "ל", letraNombre: "lamed",
    // CONDUCTO con variante reconocida — spec lo deja explícito.
    sentidoHe: "—",
    sentidoEs:
      "la ל es «la torre que vuela», el aprendizaje (lilmod); (variante de conducto entre versiones — no afirmar con falsa precisión).",
    tendencia:
      "búsqueda de equilibrio y justicia, aspiración a lo alto (mes del juicio); riesgo de indecisión.",
    tikun: "¿cómo inclino mi balanza siempre hacia el mérito, elevándome como la ל hacia el aprendizaje?",
    color: "#c9a43e",
  },
  {
    n: 8, he: "מַרְחֶשְׁוָן", nombre: "Marjeshván (Jeshván)",
    signoHe: "עַקְרָב", signoEs: "Escorpio", letra: "נ", letraNombre: "nun",
    sentidoHe: "רֵיחַ", sentidoEs: "olfato",
    tendencia:
      "profundidad, intensidad, transformación desde lo oculto; riesgo de aguijón/resentimiento (la נ del caído que se levanta).",
    tikun: "¿cómo transformo mi intensidad en regeneración y mi aguijón en defensa de la verdad, no en veneno?",
    color: "#9b59b6",
  },
  {
    n: 9, he: "כִּסְלֵו", nombre: "Kislev",
    signoHe: "קֶשֶׁת", signoEs: "Sagitario («el arco»)", letra: "ס", letraNombre: "samej",
    sentidoHe: "שֵׁנָה", sentidoEs: "sueño",
    tendencia:
      "visión a distancia, optimismo, fe que apunta a la luz en la oscuridad (Janucá); la ס es círculo de apoyo (somej).",
    tikun: "¿hacia qué blanco apunto mi arco? ¿cómo enciendo luz creciente en mi oscuridad?",
    color: "#e0b84a",
  },
  {
    n: 10, he: "טֵבֵת", nombre: "Tevet",
    signoHe: "גְּדִי", signoEs: "Capricornio", letra: "ע", letraNombre: "ayin",
    sentidoHe: "רֹגֶז / כַּעַס", sentidoEs: "ira",
    tendencia:
      "ambición disciplinada, escalada paciente, seriedad; la ע es «el ojo» (cómo miro); riesgo de dureza/ira.",
    tikun: "¿cómo purifico mi ojo y convierto mi ira en celo sagrado, escalando con humildad?",
    color: "#6b7280",
  },
  {
    n: 11, he: "שְׁבָט", nombre: "Shevat",
    signoHe: "דְּלִי", signoEs: "Acuario («el cántaro»)", letra: "צ", letraNombre: "tzadi",
    sentidoHe: "לְעִיטָה", sentidoEs: "gusto / deglución",
    tendencia:
      "visión humanitaria, generosidad que «vierte agua» para todos, originalidad (Tu BiShvat); la צ es el tzadik; riesgo de frialdad abstracta.",
    tikun: "¿cómo vierto mi cántaro sobre los cercanos, no solo sobre la humanidad en abstracto?",
    color: "#4aa3c9",
  },
  {
    n: 12, he: "אֲדָר", nombre: "Adar",
    signoHe: "דָּגִים", signoEs: "Piscis", letra: "ק", letraNombre: "kof",
    sentidoHe: "שְׂחוֹק", sentidoEs: "risa",
    tendencia:
      "fluidez, empatía, alegría desbordante, «darse vuelta» (venahafoj hu de Purim); la ק desciende bajo la línea (santidad en lo bajo); riesgo de huir de lo real.",
    tikun: "¿cómo uso mi alegría para sacar a otros de la tristeza y mi fluidez para santificar lo bajo, no para escapar?",
    color: "#5e8fd6",
  },
];

// ───────────────────────────────────────────────────────────────────────────
//  LECTURA DEL NOMBRE — קְרִיאַת הַשֵּׁם  (función dentro del Mapa del Alma)
//  Spec: docs/specs/lectura-del-nombre.md §"NOTA HONESTA para la UI" (es+fa
//  verbatim del Sofer). La matemática la calcula el backend (lib/sources/
//  nameReading.ts); la IA solo compone el derash.
// ───────────────────────────────────────────────────────────────────────────

// NOTA HONESTA — SIEMPRE visible junto a la función (es + fa completos en la spec)
export const LECTURA_NOMBRE_NOTA = {
  es:
    "La Lectura del Nombre es un derash: una interpretación creativa y meditativa sobre tu nombre, a la manera en que los sabios judíos lo hacían como puerta de estudio. No determina quién eres ni predice tu futuro: un nombre admite muchas lecturas, y aquí te ofrecemos una para meditar. El libre albedrío y la entrega a Dios están por encima de cualquier nombre.",
  fa:
    "«خواندنِ نام» یک دِراش است: تفسیری خلاقانه و مراقبه‌گونه بر نامِ توست، به همان شیوه‌ای که حکیمانِ یهودی نام را همچون دروازه‌ای برای مطالعه می‌گشودند. این نه سرنوشتِ تو را تعیین می‌کند و نه آینده‌ات را پیش‌گویی می‌کند؛ یک نام خوانش‌های بسیاری را برمی‌تابد و ما در اینجا یکی را برای تأمل به تو پیشنهاد می‌کنیم. ارادهٔ آزاد و سپردنِ خویش به خدا برتر از هر نامی است.",
  en: null as string | null, // TODO(en)
};

// Etiquetas de UI de la Lectura del Nombre (es obligatorio; fa del Sofer; en TODO)
export const LECTURA_NOMBRE_UI = {
  he: "קְרִיאַת הַשֵּׁם",
  title: { es: "Lectura del Nombre", fa: "خواندنِ نام", en: null as string | null },
  cta: { es: "Leer las letras de mi nombre", fa: "خواندنِ حروفِ نامم", en: null as string | null },
  intro: {
    es: "Las letras de tu nombre como puerta de meditación — un derash, nunca un destino.",
    fa: "حروفِ نامِ تو همچون دروازه‌ای برای تأمل — یک دِراش، نه سرنوشت.",
    en: null as string | null,
  },
  calcLabel: { es: "Lo que calcula Jashmal (no la IA)", fa: "آنچه خَشمَل محاسبه می‌کند (نه هوش مصنوعی)", en: null as string | null },
  lettersLabel: { es: "Las letras", fa: "حروف", en: null as string | null },
  gematriaLabel: { es: "Gematría del nombre", fa: "گیماتریای نام", en: null as string | null },
  rosheiLabel: { es: "Primera + última letra", fa: "نخستین + واپسین حرف", en: null as string | null },
  particionLabel: { es: "Partición (notarikón)", fa: "بخش‌بندی (نوتاریکون)", en: null as string | null },
  atbashLabel: { es: "Atbash (א↔ת)", fa: "آتباش (א↔ת)", en: null as string | null },
  tzerufLabel: { es: "Tzeruf (anagrama)", fa: "تْزِروف (واروسازیِ حروف)", en: null as string | null },
  equivLabel: { es: "Mismo valor (gematría)", fa: "هم‌ارزشِ گیماتریایی", en: null as string | null },
  miluiLabel: { es: "Milui (deletreo)", fa: "میلوی (هجّی‌کردن)", en: null as string | null },
  silencio: { es: "sin lectura clara — el nombre guarda silencio aquí", fa: "بدونِ خوانشِ روشن — نام اینجا خاموش می‌مانَد", en: null as string | null },
  derashLabel: { es: "La lectura de la mente de Jashmal", fa: "خوانشِ ذهنِ خَشمَل", en: null as string | null },
  loading: { es: "Jashmal está leyendo las letras de tu nombre…", fa: "خَشمَل در حالِ خواندنِ حروفِ نامِ توست…", en: null as string | null },
  error: {
    es: "No se pudo componer la lectura ahora. Intenta de nuevo en un momento.",
    fa: "اکنون امکانِ نوشتنِ خوانش نبود. لحظه‌ای دیگر دوباره تلاش کن.",
    en: null as string | null,
  },
};

// ===========================================================================
//  FUNCIÓN 2 — מַרְאָה — El Espejo del Alma
// ===========================================================================

// DISCLAIMER del Espejo (mostrar ANTES de entrar; es + fa completos en la spec)
export const ESPEJO_DISCLAIMER = {
  es:
    "מַרְאָה — El Espejo del Alma. Esto no es adivinación, ni un juicio sobre ti ni sobre nadie. Son tendencias GENERALES del alma, presentadas como espejo para tu avodá, según el secreto del Zohar (Yitró, Raza de-Razin) y la tradición atestiguada por el Arizal. Nunca son tu destino. Es aproximado: un espejo, no un veredicto. Por encima de todo rasgo está tu libre albedrío y tu entrega a Dios. Como escribió Rabbeinu Bachya sobre este mismo versículo, 'lo esencial de la sabiduría no es sino la rectitud de las midot, igual que lo esencial del árbol no es sino el fruto' (Shemot 18:21). El rasgo es el árbol; el fruto lo eliges tú.",
  fa:
    "מַרְאָה — آینهٔ روح. این پیشگویی نیست و دربارهٔ تو یا هیچ‌کس قضاوت نمی‌کند. اینها گرایش‌های کلیِ روح هستند، آینه‌ای برای عَبودای تو، بر پایهٔ راز زوهر (یترو، رازا دِرازین) و سنتی که آریزال گواه آن است. اینها هرگز سرنوشت تو نیستند. این تقریبی است: آینه‌ای، نه حُکم. فراتر از هر ویژگی، ارادهٔ آزاد و تسلیم تو به خداوند است. چنان‌که رَبِّنو بَحیا دربارهٔ همین آیه نوشت: 'اصلِ حکمت چیزی جز راستیِ منش نیست، همان‌گونه که اصلِ درخت چیزی جز میوه نیست' (شموت ۱۸:۲۱). ویژگی، درخت است؛ میوه را تو برمی‌گزینی.",
  en: null as string | null, // TODO(en)
};

// Nota de honestidad sobre el Arizal / metoposcopía de las "22 letras"
export const ESPEJO_NOTA_ARIZAL = {
  es:
    "Nota de honestidad: la «metoposcopía de las 22 letras en la frente» del Arizal NO es citable con folio en el Shaar Ruaj HaKodesh; se menciona el Arizal solo como tradición atestiguada por Rabí Jaim Vital, con temor del Cielo y dependiente de ruaj hakodesh. No se inventa folio.",
  fa:
    "یادداشتی از سرِ صداقت: «خواندنِ بیست‌ودو حرف بر پیشانی» منسوب به آریزال را نمی‌توان با ارجاعِ دقیق به برگ (دَف) در «شَعَر روحَ هَقودِش» نقل کرد؛ آریزال تنها همچون سنتی یاد می‌شود که رَبّی حَییم ویتال بر آن گواهی داده است، با ترسِ آسمان و وابسته به روحَ هَقودِش (الهامِ قدسی). ما هیچ ارجاعِ ساختگی به برگ نمی‌سازیم.",
  en: null as string | null, // TODO(en)
};

export interface RasgoTema {
  id: "R1" | "R2" | "R3" | "R4" | "R5" | "R6" | "R7" | "R8" | "R9" | "R10";
  /** título corto del rasgo-tema */
  titulo: string;
  /** fuente exacta verificada, texto legible (ej. "Zohar, Yitró 6:77") */
  fuente: string;
  /** referencia real de Sefaria (para la IA / enlazar) */
  fuenteRef: string;
  /** cita aramea verificada VERBATIM (de la spec corregida por el Sofer) */
  citaHe: string;
  /** la midá / avodá a trabajar */
  mida: string;
  /** la pregunta-espejo */
  espejo: string;
  /** opuesto-luminoso = la meta */
  opuesto: string;
  color: string;
}

// LOS 8 RASGOS-TEMA — transcripción fiel de la spec CORREGIDA §"LOS 8 RASGOS-TEMA"
// (Sofer 2026-06-15). Cada rasgo lleva su REFERENCIA REAL de Sefaria (Zohar,
// Yitró capítulo:párrafo — versión vocalizada) y su cita aramea VERBATIM, tal
// como el Sofer la verificó una por una. Se eliminaron los folios/§ inventados
// de la versión anterior ("Vilna 72a §6", "§5", etc.) y los wordings que NO
// existen en Sefaria. NO inventar ni alterar.
// El "opuesto-luminoso" se deriva de la midá/avodá que la spec nombra.
export const RASGOS: RasgoTema[] = [
  {
    id: "R1",
    titulo: "La mente inquieta / impaciente",
    fuente: "Zohar, Yitró 6:77",
    fuenteRef: "Zohar, Yitro 6:77",
    citaHe:
      "מִצְחָא דְּאִיהוּ דָּקִיק וְחַד, בְּלָא עִגּוּלָא, דָּא הוּא בַּר נָשׁ דְּלָא מִתְיַישְׁבָא בְּדַעְתֵּיהּ, חָשִׁיב דְּאִיהוּ חַכִּים וְלֹא יָדַע",
    mida: "יִשּׁוּב הַדַּעַת (asentar la mente).",
    espejo: "¿Hablo antes de escuchar de verdad? ¿Confundo rapidez con sabiduría?",
    opuesto: "La mente que se asienta: escuchar hasta el final y dejar que la sabiduría madure antes de hablar.",
    color: "#e0533a",
  },
  {
    id: "R2",
    titulo: "El corazón sereno y compasivo",
    fuente: "Zohar, Yitró 6:79",
    fuenteRef: "Zohar, Yitro 6:79",
    citaHe:
      "מִצְחָא דָּקִיק בְּעִגּוּלָא, דָּא אִיהוּ בַּר נָשׁ חַכִּימָא… רַחֲמָן אִיהוּ עַל כֹּלָּא… אִי יִשְׁתַּדַּל בְּאוֹרַיְיתָא לֶהֱוֵי חַכִּים יַתִּיר",
    mida: "Don a no desperdiciar: convertir la calma en estudio constante.",
    espejo: "¿Pongo mi calma al servicio del crecimiento, o me acomodo?",
    opuesto: "La calma fértil: una serenidad que se convierte en estudio constante y crecimiento, no en comodidad.",
    color: "#3fae6b",
  },
  {
    id: "R3",
    titulo: "El temperamento de fuego / ira contenida",
    fuente: "Zohar, Yitró 12:230",
    fuenteRef: "Zohar, Yitro 12:230",
    citaHe:
      "שַׂעֲרֵיהּ קָמִיט, וְלָא כָּל כַּךְ… טָב אִיהוּ, מָארֵי דִּמְהֵימְנוּתָא, מָארֵי דְּרוּגְזָא תַּקִּיף בְּשַׁעֲתָא דְּאַרְגִּיז",
    mida: "כַּעַס → סַבְלָנוּת (de la ira a la paciencia).",
    espejo: "Mi intensidad, ¿quema a los que amo o ilumina? ¿Dónde se me cierra el corazón?",
    opuesto: "El fuego que ilumina: una intensidad transformada en paciencia, que calienta y alumbra en vez de quemar.",
    color: "#e08a2e",
  },
  {
    id: "R4",
    titulo: "El alma de aguas tranquilas / fluidez",
    fuente: "Zohar, Yitró 5:70",
    fuenteRef: "Zohar, Yitro 5:70",
    citaHe:
      "שַׂעֲרָא שְׁעִיעַ יַתִּיר וְתָלֵי לְתַתָּא, טָב אִיהוּ לְשׁוּתָפוּ… וְאִיהוּ בִּלְחוֹדוֹי לָאו הָכִי",
    mida: "Cultivar eje propio (gevurá interior) para no diluirse.",
    espejo: "¿Fluyo con todos hasta perderme? ¿Tengo eje propio a solas?",
    opuesto: "El agua con cauce: una fluidez con eje propio, capaz de unirse a otros sin perderse a sí misma.",
    color: "#5fa3c9",
  },
  {
    id: "R5",
    titulo: "La palabra hiriente / lashón hará",
    fuente: "Zohar, Yitró 9:115",
    fuenteRef: "Zohar, Yitro 9:115",
    citaHe:
      "שִׂפְוָון רַבְרְבָן, דָּא אִיהוּ בַּר נָשׁ מַלִּיל בְּלִישָׁנָא בִּישָׁא… מָארֵי דְּמַחְלוֹקֶת, רְכִילָא אִיהוּ בֵּין הַאי לְהַאי",
    mida: "שְׁמִירַת הַלָּשׁוֹן (cuidar la lengua).",
    espejo: "Mi palabra hoy, ¿levantó o derribó? ¿Hablo a espaldas?",
    opuesto: "La palabra que construye: una lengua guardada que levanta, bendice y dice en presencia lo que no diría a espaldas.",
    color: "#9b59b6",
  },
  {
    id: "R6",
    titulo: "La soberbia espiritual disfrazada (no lishmá)",
    fuente: "Zohar, Yitró 6:82",
    fuenteRef: "Zohar, Yitro 6:82",
    citaHe:
      "אִתְחַכָּם בְּמָה דְּאִשְׁתַּדַּל, וַאֲפִילּוּ בְּאוֹרַיְיתָא, אֲבָל לָא לִשְׁמָהּ, אֶלָּא בְּגִין לְאִתְגָּאָה בִּפְנֵי עַמָּא… לְאַחֲזָאָה דְּאִיהוּ זַכָּאָה וְלָאו הָכִי",
    mida: "לִשְׁמָהּ (sinceridad): hacer el bien en lo oculto.",
    espejo: "Lo bueno que hago, ¿lo haría igual si nadie me viera?",
    opuesto: "El bien lishmá: hacer lo bueno por sí mismo, igual de fiel cuando nadie mira que cuando todos miran.",
    color: "#c9a43e",
  },
  {
    id: "R7",
    titulo: "El que oye demasiado el ruido del mundo",
    fuente: "Zohar, Yitró 10:119",
    fuenteRef: "Zohar, Yitro 10:119",
    citaHe:
      "מַאן דְּאוּדְנוֹי רַבְרְבִין, טִפְּשָׁא בְּלִיבֵּיהּ וְשִׁגְעוֹנָא בְּרוּחֵיהּ; מַאן דְּאוּדְנוֹי זְעִירִין וְקַיְימִין עַל קִיּוּמָא, פְּקִיחָא דְּלִבָּא… צָבֵי לְאִשְׁתַּדְּלָא בְּכֹלָּא",
    mida: "Discernir qué escuchar (Shemá: escucha enfocada en lo Uno).",
    espejo: "¿Escucho con discernimiento o me arrastra todo lo que entra?",
    opuesto: "El oído que discierne: una escucha enfocada en lo Uno, que filtra el ruido del mundo en vez de dejarse arrastrar.",
    color: "#6b7280",
  },
  {
    id: "R8",
    titulo: "El guardián de secretos / alma profunda, descuidada en lo pequeño",
    fuente: "Zohar, Yitró 5:70",
    fuenteRef: "Zohar, Yitro 5:70",
    citaHe:
      "מָארֵי דְּרָזִין אִיהוּ בְּאִינּוּן רָזִין עִלָּאִין, בְּרָזִין זְעִירִין לָא קַיְּימָא בְּהוּ; עוֹבָדוֹי כַּשְׁרָאן וְלָא כַּשְׁרָאָן",
    mida: "Bajar la grandeza a lo cotidiano (בְּכָל דְּרָכֶיךָ דָעֵהוּ).",
    espejo: "¿Fiel en lo grande pero descuidado en lo diario?",
    opuesto: "La grandeza encarnada: una profundidad que también se sostiene en los secretos pequeños y lo cotidiano, «en todos tus caminos conócelo».",
    color: "#4aa3c9",
  },
  {
    id: "R9",
    titulo: "La mirada recta / la honestidad transparente",
    fuente: "Zohar, Yitró 7:85",
    fuenteRef: "Zohar, Yitro 7:85",
    citaHe:
      "וּכְמָה דְּיָתְבָא עֵינָא, דְּיָתְבָא עַל שְׁלִימוּ, דְּלָא שְׁקִיעַ, הַאי לָאו רַמָּאָה הִיא, וְרָחִיק מֵרַמָּאוּתָא, דְּלָא אִית בֵּיהּ כְּלָל",
    mida: "אֱמֶת (verdad): hablar de frente, sin rodeo ni doblez.",
    espejo: "¿Digo las cosas de frente, o doy rodeos para quedar bien? ¿Hay distancia entre lo que muestro y lo que pienso?",
    opuesto: "La mirada transparente: un ojo que «se asienta entero, sin hundirse» — la verdad dicha de frente, sin astucia ni doblez, sin nada oculto detrás.",
    color: "#56c5c0",
  },
  {
    // Sección de los OJOS (עַיְינִין). Ref real verificada en Sefaria por el Sofer
    // (2026-06-17): Zohar, Yitro 7:88 — la cláusula de carácter del párrafo de los
    // «ojos verdosos rodeados de blanco». Cita aramea VERBATIM de Sefaria.
    id: "R10",
    titulo: "La bondad que no daña, pero piensa primero en lo suyo",
    fuente: "Zohar, Yitró 7:88",
    fuenteRef: "Zohar, Yitro 7:88",
    citaHe:
      "רַחֲמָנָא אִיהוּ, וְאִיהוּ חָשִׁיב תָּדִיר לְתוֹעַלְתֵּיה, וְלָא חָשִׁיב לְנִזְקָא דְּאַחֲרָנִין כְּלוּם",
    mida: "חֶסֶד: pasar de «no hago daño a nadie» a buscar activamente el bien del otro.",
    espejo: "¿Me basta con no hacer daño? ¿Pienso en el provecho del otro tanto como en el mío?",
    opuesto: "La bondad que se extiende: una compasión que no se conforma con no dañar, sino que busca el bien del otro como busca el propio.",
    color: "#6cae9a",
  },
];

// Rabbeinu Bachya sobre Shemot 18:21 — VERBATIM (cierre obligatorio del Espejo).
// Verificado por el Sofer en la spec corregida §"VERIFICACIÓN DE FUENTES".
export const ESPEJO_BACHYA = {
  fuente: "Rabbeinu Bachya, Shemot 18:21",
  fuenteRef: "Rabbeinu Bahya, Shemot 18:21",
  citaHe:
    "כִּי אֵין עִיקַּר הַחָכְמָה אֶלָּא יוֹשֶׁר הַמִּדּוֹת, כְּשֵׁם שֶׁאֵין הָאִילָן עִיקָּר אֶלָּא הַפְּרִי",
  es:
    "«Lo esencial de la sabiduría no es sino la rectitud de las midot, igual que lo esencial del árbol no es sino el fruto» (Rabbeinu Bachya, Shemot 18:21). El rasgo es el árbol; el fruto lo eliges tú.",
};

// ─── CUESTIONARIO AMPLIADO (12 preguntas) — spec CORREGIDA §"CUESTIONARIO
//     AMPLIADO". Mezcla conducta/midot + rasgos físicos AUTO-DESCRITOS (sin foto).
//     La persona NO elige un rasgo de la lista; responde y el sistema suma:
//     rasgo DOMINANTE + SECUNDARIO. Las preguntas de conducta/midá pesan 2; las
//     físicas auto-descritas pesan 1 (describen tendencia material, no elección).
//     Las opciones "sin peso" no suman a ningún rasgo (rasgos: []).
//     FARSI CABLEADO (2026-06-15): la spec corregida trae la línea FA: de cada
//     una de las 12 preguntas (enunciado + opciones en persa). Transcrita aquí
//     VERBATIM en textoFa. En /fa el cuestionario sale en persa (RTL); ya no cae
//     al español. (en sigue TODO → fallback español con insignia.)
// ───────────────────────────────────────────────────────────────────────────
export type Categoria = "conducta" | "midá" | "fisico";

export interface Opcion {
  texto: string;
  /** rasgos a los que suma esta opción (vacío = sin peso) */
  rasgos: RasgoTema["id"][];
  /** fa de la opción (TODO(fa) en la spec → null por ahora) */
  textoFa?: string | null;
}
export interface Pregunta {
  id: number;
  texto: string;
  /** fa de la pregunta (TODO(fa) en la spec → null por ahora) */
  textoFa?: string | null;
  categoria: Categoria;
  /** peso de la pregunta: conducta/midá = 2, físico = 1 */
  peso: 1 | 2;
  opciones: Opcion[];
}

export const PREGUNTAS: Pregunta[] = [
  {
    id: 1,
    categoria: "conducta",
    peso: 2,
    texto: "Cuando algo me molesta, mi primer impulso es:",
    textoFa: "وقتی چیزی آزارم می‌دهد، نخستین واکنشم این است:",
    opciones: [
      { texto: "responder rápido / encenderme", rasgos: ["R3"], textoFa: "زود پاسخ می‌دهم / برافروخته می‌شوم" },
      { texto: "callar y guardarlo", rasgos: ["R8"], textoFa: "ساکت می‌مانم و در دلم نگه می‌دارم" },
      { texto: "ceder para evitar conflicto", rasgos: ["R4"], textoFa: "برای پرهیز از کشمکش کوتاه می‌آیم" },
      { texto: "observar antes de actuar", rasgos: ["R2"], textoFa: "پیش از کنش، نظاره می‌کنم" },
    ],
  },
  {
    id: 2,
    categoria: "conducta",
    peso: 2,
    texto: "Las cosas buenas que hago, suelo:",
    textoFa: "کارهای نیکی که می‌کنم، معمولاً:",
    opciones: [
      { texto: "hacerlas mejor si alguien las ve", rasgos: ["R6"], textoFa: "اگر کسی ببیند، بهتر انجامشان می‌دهم" },
      { texto: "hacerlas igual en lo oculto", rasgos: ["R2"], textoFa: "در نهان نیز همان‌گونه انجامشان می‌دهم" },
      { texto: "contarlas / comentarlas", rasgos: ["R5"], textoFa: "از آنها می‌گویم / بازگو می‌کنم" },
    ],
  },
  {
    id: 3,
    categoria: "conducta",
    peso: 2,
    texto: "Mi mayor distracción es:",
    textoFa: "بزرگ‌ترین چیزی که حواسم را پرت می‌کند این است:",
    opciones: [
      { texto: "mi prisa por opinar", rasgos: ["R1"], textoFa: "شتابم برای اظهارنظر" },
      { texto: "todo lo que oigo de otros", rasgos: ["R7"], textoFa: "هر آنچه از دیگران می‌شنوم" },
      { texto: "lo cotidiano me aburre, busco lo profundo", rasgos: ["R8"], textoFa: "امور روزمره خسته‌ام می‌کند، در پی ژرفا هستم" },
    ],
  },
  {
    id: 4,
    categoria: "conducta",
    peso: 2,
    texto: "Con los demás tiendo a:",
    textoFa: "در رابطه با دیگران، گرایش دارم که:",
    opciones: [
      { texto: "hablar de más sobre ellos", rasgos: ["R5"], textoFa: "بیش از اندازه درباره‌شان حرف بزنم" },
      { texto: "chocar / encenderme", rasgos: ["R3"], textoFa: "برخورد کنم / برافروخته شوم" },
      { texto: "diluirme en lo que quieren", rasgos: ["R4"], textoFa: "در خواسته‌هایشان حل شوم" },
      { texto: "ser tibio en lo pequeño", rasgos: ["R8"], textoFa: "در چیزهای کوچک سهل‌انگار باشم" },
      { texto: "ser amable, pero pensando primero en lo mío", rasgos: ["R10"], textoFa: "مهربان باشم، اما نخست به سودِ خودم بیندیشم" },
    ],
  },
  {
    id: 5,
    categoria: "conducta",
    peso: 2,
    texto: "Cuando estudio o aprendo algo, lo hago sobre todo:",
    textoFa: "وقتی چیزی می‌آموزم یا مطالعه می‌کنم، بیش از همه:",
    opciones: [
      { texto: "para entenderlo de verdad", rasgos: ["R2"], textoFa: "برای آنکه به‌راستی دریابمش" },
      { texto: "para poder mostrarlo", rasgos: ["R6"], textoFa: "برای آنکه بتوانم به نمایش بگذارمش" },
      { texto: "rápido, paso al siguiente", rasgos: ["R1"], textoFa: "شتاب‌زده، و سراغ بعدی می‌روم" },
    ],
  },
  {
    id: 6,
    categoria: "fisico",
    peso: 1,
    texto: "Mi cabello es más bien:",
    textoFa: "موهای من بیشتر:",
    opciones: [
      { texto: "lacio/liso que cae", rasgos: ["R4"], textoFa: "صاف/لخت که فرومی‌ریزد" },
      { texto: "rizado/crespo", rasgos: ["R3"], textoFa: "فرفری/مجعد" },
      { texto: "ninguno claramente / no aplica", rasgos: [], textoFa: "هیچ‌کدام به‌روشنی / صدق نمی‌کند" },
    ],
  },
  {
    id: 7,
    categoria: "fisico",
    peso: 1,
    texto: "Mi frente la describiría como:",
    textoFa: "پیشانی‌ام را این‌گونه توصیف می‌کنم:",
    opciones: [
      { texto: "estrecha", rasgos: ["R1"], textoFa: "باریک/تنگ" },
      { texto: "fina y redondeada", rasgos: ["R2"], textoFa: "ظریف و گِرد" },
      { texto: "amplia y redonda", rasgos: ["R2"], textoFa: "پهن و گِرد" },
      { texto: "muy lisa / sin marcar", rasgos: [], textoFa: "بسیار صاف / بی‌نشان" },
    ],
  },
  {
    id: 8,
    categoria: "fisico",
    peso: 1,
    texto: "Mis ojos / mi mirada los siento:",
    textoFa: "چشمان / نگاهم را چنین حس می‌کنم:",
    opciones: [
      { texto: "alegres, que sonríen", rasgos: ["R2"], textoFa: "شاد، که لبخند می‌زنند" },
      { texto: "intensos, que se encienden", rasgos: ["R3"], textoFa: "پرشور، که برمی‌افروزند" },
      { texto: "serenos", rasgos: ["R4"], textoFa: "آرام و آسوده" },
      { texto: "firmes y directos, que sostienen la mirada", rasgos: ["R9"], textoFa: "ثابت و مستقیم، که نگاه را نگه می‌دارند" },
    ],
  },
  {
    id: 9,
    categoria: "fisico",
    peso: 1,
    texto: "Mi boca / mis labios:",
    textoFa: "دهان / لب‌هایم:",
    opciones: [
      { texto: "hablo mucho, boca expresiva", rasgos: ["R5"], textoFa: "زیاد سخن می‌گویم، دهانی گویا" },
      { texto: "hablo poco, mido las palabras", rasgos: ["R8"], textoFa: "کم سخن می‌گویم، واژه‌ها را می‌سنجم" },
    ],
  },
  {
    id: 10,
    categoria: "fisico",
    peso: 1,
    texto: "Mis orejas las describiría como:",
    textoFa: "گوش‌هایم را این‌گونه توصیف می‌کنم:",
    opciones: [
      { texto: "más bien grandes", rasgos: ["R7"], textoFa: "نسبتاً بزرگ" },
      { texto: "pequeñas / pegadas", rasgos: [], textoFa: "کوچک / چسبیده" }, // opuesto-luminoso de R7 (sin peso)
      { texto: "no sé", rasgos: [], textoFa: "نمی‌دانم" },
    ],
  },
  {
    id: 11,
    categoria: "midá",
    peso: 2,
    texto: "La midá que más me cuesta es:",
    textoFa: "دشوارترین میدا (midá، صفتِ منش) برایم این است:",
    opciones: [
      { texto: "paciencia", rasgos: ["R3"], textoFa: "صبر (ساولانوت)" },
      { texto: "cuidar mi lengua", rasgos: ["R5"], textoFa: "پاسداشتِ زبانم" },
      { texto: "humildad sincera (lishmá)", rasgos: ["R6"], textoFa: "فروتنیِ خالصانه (لیشماه)" },
      { texto: "firmeza / tener eje", rasgos: ["R4"], textoFa: "استواری / داشتنِ محور درونی" },
    ],
  },
  {
    id: 12,
    categoria: "midá",
    peso: 2,
    texto: "Lo que más quiero trabajar este año:",
    textoFa: "امسال بیش از همه می‌خواهم روی این کار کنم:",
    opciones: [
      { texto: "asentar mi mente", rasgos: ["R1"], textoFa: "آرام‌کردن و نشاندنِ ذهنم" },
      { texto: "escuchar mejor lo correcto", rasgos: ["R7"], textoFa: "بهتر شنیدنِ آنچه درست است" },
      { texto: "bajar lo grande a lo diario", rasgos: ["R8"], textoFa: "فروآوردنِ امور بزرگ به زندگیِ روزمره" },
      { texto: "poner mi calma a producir", rasgos: ["R2"], textoFa: "به‌بار نشاندنِ آرامشم" },
    ],
  },
];

// Cierre fijo "tendencia, no destino" — spec §FLUJO ("cierra recordando…").
export const ESPEJO_CIERRE = {
  es:
    "Recuerda: esto es un espejo aproximado, no un veredicto. El rasgo es maleable; el opuesto-luminoso es tu meta, no una sentencia. Por encima de todo rasgo están tu libre albedrío y tu entrega a Dios. Tú eliges quién ser.",
  fa:
    "به یاد داشته باش: این آینه‌ای تقریبی است، نه حُکم. ویژگی، شکل‌پذیر است؛ ضدِّ نورانی هدفِ توست، نه سرنوشتِ محتوم. فراتر از هر ویژگی، ارادهٔ آزاد و سپردنِ خویش به خداوند است. این تو هستی که برمی‌گزینی که چه کسی باشی.",
  en: null as string | null, // TODO(en)
};

export function rasgoById(id: RasgoTema["id"]): RasgoTema {
  return RASGOS.find((r) => r.id === id)!;
}

// ─── Cálculo dominante + secundario (pesos: conducta/midá = 2, físico = 1) ───
// `respuestas[i]` = los rasgos de la opción elegida en la pregunta i (o null).
export interface ResultadoEspejo {
  dominante: RasgoTema | null;
  secundario: RasgoTema | null;
  /** puntaje por rasgo, para depurar/mostrar */
  conteo: Record<string, number>;
}

export function calcularEspejo(
  respuestas: (RasgoTema["id"][] | null)[],
): ResultadoEspejo {
  const conteo: Record<string, number> = {};
  respuestas.forEach((rasgos, i) => {
    if (!rasgos || rasgos.length === 0) return;
    const peso = PREGUNTAS[i]?.peso ?? 1;
    for (const id of rasgos) conteo[id] = (conteo[id] ?? 0) + peso;
  });
  // Orden estable: por puntaje desc; a empate, por el orden de RASGOS.
  const ordenados = [...RASGOS]
    .map((r) => ({ r, n: conteo[r.id] ?? 0 }))
    .sort((a, b) => b.n - a.n);
  const dom = ordenados[0]?.n > 0 ? ordenados[0].r : null;
  const sec = ordenados[1]?.n > 0 ? ordenados[1].r : null;
  return { dominante: dom, secundario: sec, conteo };
}
