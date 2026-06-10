// Galería de gematrías sagradas — los números recurrentes del estudio cabalístico.
// Cada entrada: el número, las palabras que comparten ese valor, y sus
// asociaciones (sefirot, Nombres, estructuras de la creación).

export interface Gematria {
  num: number;
  he: string;            // palabra(s) hebrea(s) principal(es), separadas por ·
  titulo: string;        // título español (canónico)
  tituloFa: string;
  tituloEn?: string;     // inglés — lo llena el Sofer por fases ([[i18n-audit]])
  sig: string;           // una línea de significado (español)
  sigFa: string;
  sigEn?: string;        // inglés — lo llena el Sofer por fases
  asociaciones: string[];   // viñetas (español)
  asociacionesFa: string[];
  asociacionesEn?: string[]; // inglés — lo llena el Sofer por fases
  color: string;
  mystery?: string;         // slug de misterio dedicado (ej. "137"), si lo tiene
}

export const GEMATRIAS: Gematria[] = [
  {
    num: 13, he: "אֶחָד · אַהֲבָה", titulo: "Unidad y Amor", tituloFa: "یگانگی و عشق",
    sig: "Ejad (Uno) y Ahavá (Amor) comparten el mismo valor: la unidad de Dios es el amor.",
    sigFa: "اِچاد (یک) و اَهاوا (عشق) یک ارزش دارند: یگانگیِ خدا همان عشق است.",
    asociaciones: ["אֶחָד (Ejad, «Uno») = 13", "אַהֲבָה (Ahavá, «Amor») = 13", "Los 13 atributos de misericordia"],
    asociacionesFa: ["اِچاد («یک») = ۱۳", "اَهاوا («عشق») = ۱۳", "سیزده صفتِ رحمت"],
    color: "#e0a850",
  },
  {
    num: 18, he: "חַי", titulo: "Vida", tituloFa: "زندگی",
    sig: "Jai («vivo») — el número de la vida, presente en bendiciones y donaciones.",
    sigFa: "خَی («زنده») — عددِ زندگی، در برکات و بخشش‌ها.",
    asociaciones: ["חַי (Jai, «vivo») = 18", "Doblado (36) = los 36 justos ocultos"],
    asociacionesFa: ["خَی («زنده») = ۱۸", "دوبرابر (۳۶) = سی‌وشش صدّیقِ پنهان"],
    color: "#5a9a6a",
  },
  {
    num: 26, he: "יהוה", titulo: "El Nombre", tituloFa: "نامِ خدا",
    sig: "El Tetragrámaton (YHVH), el Nombre divino más sagrado: Yud(10) Hei(5) Vav(6) Hei(5).",
    sigFa: "تتراگرامتون (یهوه)، مقدّس‌ترین نامِ الهی: یود(۱۰) هی(۵) واو(۶) هی(۵).",
    asociaciones: ["יהוה = 26", "Ejad(13) + Ahavá(13) = 26", "La estructura del Árbol de la Vida"],
    asociacionesFa: ["یهوه = ۲۶", "اِچاد(۱۳) + اَهاوا(۱۳) = ۲۶", "ساختارِ درختِ زندگی"],
    color: "#c9a43e",
  },
  {
    num: 32, he: "לֵב", titulo: "Los 32 senderos", tituloFa: "سی‌ودو مسیر",
    sig: "Lev («corazón») = 32 — los 32 senderos de sabiduría del Sefer Yetzirá.",
    sigFa: "لِو («قلب») = ۳۲ — سی‌ودو مسیرِ حکمت در سِفِر یِتزیرا.",
    asociaciones: ["10 sefirot + 22 letras = 32", "לֵב (Lev, «corazón») = 32", "Comienza y termina la Torá (Bet…Lamed = Lev)"],
    asociacionesFa: ["۱۰ سِفیرا + ۲۲ حرف = ۳۲", "لِو («قلب») = ۳۲", "آغاز و انجامِ تورات (بِت…لَمِد)"],
    color: "#cc5555",
  },
  {
    num: 42, he: "מ\"ב", titulo: "El Nombre de 42", tituloFa: "نامِ چهل‌ودو",
    sig: "El Nombre de 42 letras — la oración Ana BeKoaj, la Cabalá contemplativa de la ascensión.",
    sigFa: "نامِ چهل‌ودو حرفی — دعای اَنا بِکوآح، کابالای تأمّلیِ عروج.",
    asociaciones: ["El Nombre de 42 letras", "Aná BeKoaj (7 versos × 6 palabras)", "Los 42 viajes del desierto"],
    asociacionesFa: ["نامِ چهل‌ودو حرفی", "اَنا بِکوآح (۷ بند × ۶ واژه)", "چهل‌ودو سفرِ بیابان"],
    color: "#7a8ad0",
  },
  {
    num: 45, he: "אָדָם · מ\"ה", titulo: "Adam y el Tikún", tituloFa: "آدام و تیقون",
    sig: "Adam = 45 = Mah, la expansión del Nombre asociada al mundo de la rectificación.",
    sigFa: "آدام = ۴۵ = مَه، گسترشِ نام مرتبط با عالمِ تیقون.",
    asociaciones: ["אָדָם (Adam) = 45", "מ\"ה (Mah) — el milui del Tikún", "El mundo de Yetzirá / Zeir Anpín"],
    asociacionesFa: ["آدام = ۴۵", "مَه — میلویِ تیقون", "عالمِ یِتزیراه / زِئیر آنپین"],
    color: "#b89a4e",
  },
  {
    num: 49, he: "מ\"ט", titulo: "Las 49 puertas", tituloFa: "چهل‌ونه دروازه",
    sig: "7 × 7 — los 49 días del Ómer, los 49 niveles de comprensión y refinamiento.",
    sigFa: "۷ × ۷ — چهل‌ونه روزِ عُمِر، چهل‌ونه سطحِ فهم و پالایش.",
    asociaciones: ["7 × 7 = 49", "Los 49 días del Ómer", "Las 49 puertas de Biná (la 50ª es oculta)"],
    asociacionesFa: ["۷ × ۷ = ۴۹", "چهل‌ونه روزِ عُمِر", "چهل‌ونه دروازهٔ بینا (پنجاهمی پنهان است)"],
    color: "#6a9ac0",
  },
  {
    num: 50, he: "נ", titulo: "Los 50 portales", tituloFa: "پنجاه دروازه",
    sig: "Los 50 portales de Biná y el Jubileo (Yovel) — la libertad y el entendimiento supremo.",
    sigFa: "پنجاه دروازهٔ بینا و یوبیل (یووِل) — آزادی و فهمِ والا.",
    asociaciones: ["50 portales de Biná", "El Yovel (Jubileo)", "La letra Nun (נ) = 50"],
    asociacionesFa: ["پنجاه دروازهٔ بینا", "یووِل (یوبیل)", "حرفِ نون = ۵۰"],
    color: "#8866cc",
  },
  {
    num: 52, he: "בֶּן · ב\"ן", titulo: "El Hijo, Maljut", tituloFa: "پسر، مَلخوت",
    sig: "Ben («hijo») = 52 = Ban, la expansión del Nombre asociada a Maljut, el mundo manifestado.",
    sigFa: "بِن («پسر») = ۵۲ = بَن، گسترشِ نام مرتبط با مَلخوت، عالمِ آشکار.",
    asociaciones: ["בֶּן (Ben, «hijo») = 52", "ב\"ן (Ban) — el milui de Maljut", "El mundo de Asiá / la Nukva"],
    asociacionesFa: ["بِن («پسر») = ۵۲", "بَن — میلویِ مَلخوت", "عالمِ عَسیاه / نوقوا"],
    color: "#a06a8e",
  },
  {
    num: 63, he: "ס\"ג", titulo: "Biná, Sag", tituloFa: "بینا، سَگ",
    sig: "Sag — la expansión del Nombre relacionada con Biná, el entendimiento superior.",
    sigFa: "سَگ — گسترشِ نام مرتبط با بینا، فهمِ والا.",
    asociaciones: ["ס\"ג (Sag) = 63", "El mundo de Beriá", "La Ima superna (la Madre)"],
    asociacionesFa: ["سَگ = ۶۳", "عالمِ بِریاه", "ایمای علیا (مادر)"],
    color: "#6688cc",
  },
  {
    num: 70, he: "סוֹד · יַיִן", titulo: "Las 70 caras", tituloFa: "هفتاد چهره",
    sig: "Sod («secreto») = Yayin («vino») = 70 — «entró el vino, salió el secreto». Las 70 caras de la Torá.",
    sigFa: "سود («راز») = یَیین («شراب») = ۷۰ — «شراب درآمد، راز برآمد». هفتاد چهرهٔ تورات.",
    asociaciones: ["סוֹד (Sod, «secreto») = 70", "יַיִן (Yayin, «vino») = 70", "Las 70 naciones, los 70 ancianos, las 70 facetas"],
    asociacionesFa: ["سود («راز») = ۷۰", "یَیین («شراب») = ۷۰", "هفتاد ملت، هفتاد پیر، هفتاد چهره"],
    color: "#9a3a3a",
  },
  {
    num: 72, he: "ע\"ב · חֶסֶד", titulo: "El Nombre de 72", tituloFa: "نامِ هفتادودو",
    sig: "AB = 72 = Jésed — el Shem HaMeforash de 72 tripletes, nacido de la partición del mar.",
    sigFa: "عَب = ۷۲ = خِسِد — شِم هَمِفوراش از هفتادودو سه‌گانه، زادهٔ شکافتنِ دریا.",
    asociaciones: ["ע\"ב (AB) = 72", "חֶסֶד (Jésed) = 72", "Los 72 Nombres (Éxodo 14:19-21) = 216 letras"],
    asociacionesFa: ["عَب = ۷۲", "خِسِد = ۷۲", "هفتادودو نام (خروج ۱۴) = ۲۱۶ حرف"],
    color: "#d4a838",
  },
  {
    num: 91, he: "אָמֵן", titulo: "La unificación", tituloFa: "یگانه‌سازی",
    sig: "26 (YHVH) + 65 (Adonai) = 91 = Amén — la unión del Nombre oculto y el revelado.",
    sigFa: "۲۶ (یهوه) + ۶۵ (اَدونای) = ۹۱ = آمین — پیوندِ نامِ پنهان و آشکار.",
    asociaciones: ["יהוה (26) + אֲדֹנָי (65) = 91", "אָמֵן (Amén) = 91", "Decir «Amén» une ambos Nombres"],
    asociacionesFa: ["یهوه (۲۶) + اَدونای (۶۵) = ۹۱", "آمین = ۹۱", "گفتنِ «آمین» دو نام را می‌پیوندد"],
    color: "#c9a43e",
  },
  {
    num: 112, he: "יַבֹּק", titulo: "Yabok, las kavanot", tituloFa: "یَبوق",
    sig: "Yabok = 112 — donde Jacob luchó con el ángel; las kavanot del Arí: YHVH + Adonai + Ehyeh.",
    sigFa: "یَبوق = ۱۱۲ — جایی که یعقوب با فرشته کشتی گرفت؛ کاوانوتِ آری.",
    asociaciones: ["יַבֹּק (Yabok) = 112", "יהוה(26)+אדני(65)+אהיה(21) = 112", "Las kavanot de unificación del Arí"],
    asociacionesFa: ["یَبوق = ۱۱۲", "یهوه+اَدونای+اِهیه = ۱۱۲", "کاوانوتِ یگانه‌سازیِ آری"],
    color: "#7a8ad0",
  },
  {
    num: 137, he: "קַבָּלָה", titulo: "El acertijo de la creación", tituloFa: "معمای آفرینش",
    sig: "Kabalah («recibir») = 137. Y la constante de estructura fina α ≈ 1/137 — donde la Cabalá toca la física (Rav Ginsburgh, «137: The Riddle of Creation»).",
    sigFa: "قبالا («دریافت») = ۱۳۷. و ثابتِ ساختارِ ریز α ≈ ۱/۱۳۷ — جایی که کابالا به فیزیک می‌رسد (راو گینزبورگ).",
    asociaciones: [
      "קַבָּלָה (Kabbalah, «recibir») = 137",
      "La constante de estructura fina: α ≈ 1/137 (la física)",
      "Tres vivieron 137 años: Ishmael, Leví, Amram",
      "אוֹפָן (Ofan, «rueda» de Yejezkel) = 137",
      "מוֹצָא (Motza, «origen, fuente») = 137",
      "תֹּהוּ (Tohu, «caos») = 411 = 3 × 137",
      "יֵשׁ מֵאַיִן («algo de la nada») = 411 = 3 × 137",
      "Génesis 1 tiene exactamente 137 palabras de 3 letras",
    ],
    asociacionesFa: [
      "قبالا («دریافت») = ۱۳۷",
      "ثابتِ ساختارِ ریز: α ≈ ۱/۱۳۷ (فیزیک)",
      "سه تن ۱۳۷ سال زیستند: اسماعیل، لاوی، عَمرام",
      "اوֹفان («چرخِ» یحزقیل) = ۱۳۷",
      "موצا («سرچشمه») = ۱۳۷",
      "توهو («آشوب») = ۴۱۱ = ۳ × ۱۳۷",
      "یِش مِاَین («هستی از نیستی») = ۴۱۱ = ۳ × ۱۳۷",
      "پیدایش ۱ دقیقاً ۱۳۷ واژهٔ سه‌حرفی دارد",
    ],
    color: "#9a6a8e",
    mystery: "137",
  },
  {
    num: 248, he: "אַבְרָהָם", titulo: "Avraham y los 248", tituloFa: "اَبراهام",
    sig: "Avraham = 248 — los 248 órganos del cuerpo y los 248 mandamientos positivos.",
    sigFa: "اَبراهام = ۲۴۸ — دویست‌وچهل‌وهشت اندامِ بدن و میتزووتِ مثبت.",
    asociaciones: ["אַבְרָהָם (Avraham) = 248", "248 miembros espirituales del cuerpo", "248 mitzvot positivas"],
    asociacionesFa: ["اَبراهام = ۲۴۸", "دویست‌وچهل‌وهشت اندامِ روحانی", "میتزووتِ مثبت"],
    color: "#5a9a6a",
  },
  {
    num: 613, he: "תרי\"ג", titulo: "Las 613 mitzvot", tituloFa: "ششصدوسیزده میتزوا",
    sig: "El total de los mandamientos de la Torá: 248 positivos + 365 negativos.",
    sigFa: "مجموعِ احکامِ تورات: ۲۴۸ مثبت + ۳۶۵ منفی.",
    asociaciones: ["248 positivas + 365 negativas = 613", "365 = días del año / preceptos negativos", "תרי\"ג (Taryag)"],
    asociacionesFa: ["۲۴۸ مثبت + ۳۶۵ منفی = ۶۱۳", "۳۶۵ = روزهای سال", "تَریَگ"],
    color: "#c9a43e",
  },
  {
    num: 620, he: "כֶּתֶר", titulo: "Kéter, la Corona", tituloFa: "کِتِر، تاج",
    sig: "Kéter («corona») = 620 — la sefirá suprema; las 613 mitzvot más los 7 preceptos rabínicos.",
    sigFa: "کِتِر («تاج») = ۶۲۰ — سِفیرای والا؛ ۶۱۳ میتزوا به‌علاوهٔ هفت حکمِ ربانی.",
    asociaciones: ["כֶּתֶר (Kéter) = 620", "613 mitzvot + 7 preceptos = 620", "La corona suprema, sobre el intelecto"],
    asociacionesFa: ["کِتِر = ۶۲۰", "۶۱۳ + ۷ = ۶۲۰", "تاجِ والا، فراتر از عقل"],
    color: "#f0d878",
  },
];
