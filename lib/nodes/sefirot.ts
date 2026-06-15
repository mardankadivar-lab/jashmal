// Los 10 Sefirot del Árbol de la Vida (עֵץ חַיִּים), posición, colores y referencias.
// Coordenadas en porcentaje del viewBox (0-100). Layout tradicional.

export interface Sefira {
  id: string;
  number: number;         // 1-10
  he: string;             // nombre en hebreo
  es: string;             // nombre en español
  fa: string;             // nombre en persa
  en: string;             // nombre en inglés
  heTitle: string;        // título completo (ej. "כֶּתֶר — Corona")
  x: number;              // posición horizontal (0-100)
  y: number;              // posición vertical (0-100)
  color: string;          // color principal
  glow: string;           // color del halo
  pillar: "right" | "left" | "center"; // columna sefirótica
  world: string;          // mundo asociado
  refs: string[];         // refs de Sefaria para los rayos de referencias
  description: string;    // descripción breve (ES)

  // ─── Campos para la vista contemplativa (artifact SVG) ───
  translit?: string;      // transliteración latina (Kéter, Jojmá…)
  glossEs?: string;       // traducción de una palabra (Corona, Sabiduría…)
  glossFa?: string;       // traducción al persa
  glossEn?: string;       // traducción al inglés
  funcEs?: string;        // función espiritual en una línea (ES)
  funcFa?: string;        // función espiritual en una línea (FA)
  funcEn?: string;        // función espiritual en una línea (EN)
}

// Etiqueta del pilar según el idioma (para el artifact).
export function pillarLabel(pillar: Sefira["pillar"], locale: string): string {
  const map: Record<Sefira["pillar"], { es: string; fa: string; en: string }> = {
    right:  { es: "Pilar de la Misericordia", fa: "ستونِ رحمت",  en: "Pillar of Mercy" },
    left:   { es: "Pilar del Rigor",          fa: "ستونِ شدت",   en: "Pillar of Severity" },
    center: { es: "Pilar del Equilibrio",     fa: "ستونِ تعادل", en: "Pillar of Balance" },
  };
  const v = map[pillar];
  if (locale === "fa") return v.fa;
  if (locale === "en") return v.en;
  return v.es;
}

export function sefiraGloss(s: Sefira, locale: string): string {
  if (locale === "fa") return s.glossFa ?? "";
  if (locale === "en") return s.glossEn ?? "";
  return s.glossEs ?? "";
}

export function sefiraFunc(s: Sefira, locale: string): string {
  if (locale === "fa") return s.funcFa ?? "";
  if (locale === "en") return s.funcEn ?? "";
  return s.funcEs ?? "";
}

export const SEFIROT: Sefira[] = [
  {
    id: "keter", number: 1,
    he: "כֶּתֶר", es: "Kéter (Corona)", fa: "کِتِر (تاج)", en: "Keter (Crown)",
    heTitle: "כֶּתֶר — Corona",
    x: 50, y: 5,
    color: "#f8f8f8", glow: "#ffffff",
    pillar: "center", world: "Atzilut",
    refs: ["Genesis 1:1", "Proverbs 8:22", "Psalms 93:2"],
    description: "La voluntad suprema. El origen de toda existencia, antes del pensamiento.",
    translit: "Kéter",
    glossEs: "Corona", glossFa: "تاج", glossEn: "Crown",
    funcEs: "La Voluntad pura, la raíz de todo, casi rozando el Infinito.",
    funcFa: "ارادهٔ ناب، ریشهٔ همه‌چیز، تقریباً در تماس با بی‌نهایت.",
    funcEn: "Pure Will, the root of all, almost touching the Infinite.",
  },
  {
    id: "chochmah", number: 2,
    he: "חָכְמָה", es: "Jojmá (Sabiduría)", fa: "خوخما (حکمت)", en: "Chochmah (Wisdom)",
    heTitle: "חָכְמָה — Sabiduría",
    x: 78, y: 22,
    color: "#c9a43e", glow: "#e8c866",
    pillar: "right", world: "Atzilut",
    refs: ["Proverbs 3:19", "Psalms 104:24", "Job 28:12"],
    description: "El primer destello de la idea divina. El punto de la intuición pura.",
    translit: "Jojmá",
    glossEs: "Sabiduría", glossFa: "حکمت", glossEn: "Wisdom",
    funcEs: "El destello: la idea que surge de la nada antes de tomar forma.",
    funcFa: "جرقه: ایده‌ای که پیش از شکل‌گرفتن از نیستی برمی‌خیزد.",
    funcEn: "The flash: the idea arising from nothing before it takes form.",
  },
  {
    id: "binah", number: 3,
    he: "בִּינָה", es: "Biná (Entendimiento)", fa: "بینا (فهم)", en: "Binah (Understanding)",
    heTitle: "בִּינָה — Entendimiento",
    x: 22, y: 22,
    color: "#2d2d4e", glow: "#6666cc",
    pillar: "left", world: "Atzilut",
    refs: ["Proverbs 2:3", "Isaiah 40:28", "Job 12:12"],
    description: "El palacio del entendimiento. La madre superior que da forma al pensamiento.",
    translit: "Biná",
    glossEs: "Entendimiento", glossFa: "فهم", glossEn: "Understanding",
    funcEs: "El desarrollo: la chispa se elabora en estructura comprensible.",
    funcFa: "بسط: جرقه به ساختاری قابل‌فهم پرورده می‌شود.",
    funcEn: "The unfolding: the spark is elaborated into comprehensible structure.",
  },
  {
    id: "chesed", number: 4,
    he: "חֶסֶד", es: "Jésed (Misericordia)", fa: "خِسِد (محبت)", en: "Chesed (Lovingkindness)",
    heTitle: "חֶסֶד — Misericordia",
    x: 78, y: 45,
    color: "#4477cc", glow: "#88aaff",
    pillar: "right", world: "Beriah",
    refs: ["Psalms 136:1", "Exodus 34:6", "Micah 7:18"],
    description: "La gracia ilimitada. El amor sin condiciones que fluye hacia todas las criaturas.",
    translit: "Jésed",
    glossEs: "Bondad", glossFa: "محبت", glossEn: "Lovingkindness",
    funcEs: "El amor que se da sin medida; la mano derecha que expande.",
    funcFa: "عشقی که بی‌اندازه می‌بخشد؛ دست راست که می‌گستراند.",
    funcEn: "Love that gives without measure; the right hand that expands.",
  },
  {
    id: "gevurah", number: 5,
    he: "גְּבוּרָה", es: "Guevurá (Juicio)", fa: "گِووورا (قدرت)", en: "Gevurah (Strength)",
    heTitle: "גְּבוּרָה — Juicio",
    x: 22, y: 45,
    color: "#cc3333", glow: "#ff6666",
    pillar: "left", world: "Beriah",
    refs: ["Psalms 62:12", "Isaiah 9:7", "Deuteronomy 32:39"],
    description: "La fuerza y el rigor divino. El límite necesario que define y purifica.",
    translit: "Guevurá",
    glossEs: "Rigor", glossFa: "شدت", glossEn: "Severity",
    funcEs: "La fuerza que contiene y mide; la mano izquierda que limita.",
    funcFa: "نیرویی که محدود می‌کند و می‌سنجد؛ دست چپ که حد می‌گذارد.",
    funcEn: "The force that contains and measures; the left hand that limits.",
  },
  {
    id: "tiferet", number: 6,
    he: "תִּפְאֶרֶת", es: "Tiferet (Belleza)", fa: "تیفِرِت (زیبایی)", en: "Tiferet (Beauty)",
    heTitle: "תִּפְאֶרֶת — Belleza",
    x: 50, y: 55,
    color: "#e8c830", glow: "#ffd700",
    pillar: "center", world: "Beriah",
    refs: ["Psalms 19:2", "Isaiah 44:23", "Song of Songs 5:10"],
    description: "El corazón del Árbol. La armonía perfecta entre Jésed y Guevurá.",
    translit: "Tiféret",
    glossEs: "Belleza", glossFa: "زیبایی", glossEn: "Beauty",
    funcEs: "La armonía entre bondad y rigor: la compasión, el corazón.",
    funcFa: "هماهنگی میان محبت و شدت: شفقت، قلب.",
    funcEn: "The harmony of kindness and rigor: compassion, the heart.",
  },
  {
    id: "netzach", number: 7,
    he: "נֶצַח", es: "Netzaj (Victoria)", fa: "نِتزاخ (پیروزی)", en: "Netzach (Victory)",
    heTitle: "נֶצַח — Victoria",
    x: 78, y: 70,
    color: "#228833", glow: "#44cc55",
    pillar: "right", world: "Yetzirah",
    refs: ["I Samuel 15:29", "Psalms 13:2", "Lamentations 3:18"],
    description: "La eternidad divina y el instinto. El deseo puro que impulsa la creación.",
    translit: "Nétzaj",
    glossEs: "Eternidad / Victoria", glossFa: "ابدیت / پیروزی", glossEn: "Eternity / Victory",
    funcEs: "La perseverancia que no se rinde.",
    funcFa: "پایداری‌ای که تسلیم نمی‌شود.",
    funcEn: "The perseverance that does not surrender.",
  },
  {
    id: "hod", number: 8,
    he: "הוֹד", es: "Hod (Esplendor)", fa: "هود (جلال)", en: "Hod (Splendor)",
    heTitle: "הוֹד — Esplendor",
    x: 22, y: 70,
    color: "#cc6600", glow: "#ff9933",
    pillar: "left", world: "Yetzirah",
    refs: ["Psalms 8:2", "Exodus 15:11", "I Chronicles 29:11"],
    description: "La Gloria divina que se refleja en el mundo. La humildad ante lo sagrado.",
    translit: "Hod",
    glossEs: "Esplendor", glossFa: "جلال", glossEn: "Splendor",
    funcEs: "La entrega y la humildad; reconocer algo más grande.",
    funcFa: "تسلیم و فروتنی؛ شناختنِ چیزی بزرگ‌تر.",
    funcEn: "Surrender and humility; recognizing something greater.",
  },
  {
    id: "yesod", number: 9,
    he: "יְסוֹד", es: "Yesod (Fundamento)", fa: "یِسود (بنیاد)", en: "Yesod (Foundation)",
    heTitle: "יְסוֹד — Fundamento",
    x: 50, y: 82,
    color: "#7733cc", glow: "#aa55ff",
    pillar: "center", world: "Yetzirah",
    refs: ["Proverbs 10:25", "Isaiah 28:16", "Psalms 89:15"],
    description: "El canal entre los mundos superiores y Maljut. El pacto que sostiene todo.",
    translit: "Yesod",
    glossEs: "Fundamento", glossFa: "بنیاد", glossEn: "Foundation",
    funcEs: "El canal que reúne lo de arriba y lo transmite abajo.",
    funcFa: "مجرایی که آنچه را بالاست گرد می‌آورد و به پایین می‌رساند.",
    funcEn: "The channel that gathers what is above and transmits it below.",
  },
  {
    id: "malchut", number: 10,
    he: "מַלְכוּת", es: "Maljut (Reino)", fa: "مالخوت (پادشاهی)", en: "Malchut (Kingdom)",
    heTitle: "מַלְכוּת — Reino",
    x: 50, y: 96,
    color: "#6b5a3e", glow: "#c9a43e",
    pillar: "center", world: "Assiah",
    refs: ["Psalms 145:13", "I Chronicles 29:11", "Isaiah 6:3"],
    description: "La Presencia divina en el mundo material. La Shejiná que habita entre nosotros.",
    translit: "Maljut",
    glossEs: "Reino", glossFa: "پادشاهی", glossEn: "Kingdom",
    funcEs: "La receptora: el mundo, donde la luz se hace acto.",
    funcFa: "گیرنده: جهان، جایی که نور به عمل بدل می‌شود.",
    funcEn: "The receiver: the world, where light becomes act.",
  },
];

// Los 22 senderos + su letra hebrea (Séfer Yetzirá — caminos de la sabiduría).
// Formato: [sefirá-origen, sefirá-destino, letra, nombre-de-la-letra]
export const PATHS: [string, string, string, string][] = [
  ["keter",   "chochmah", "א", "Álef"],
  ["keter",   "binah",    "ב", "Bet"],
  ["keter",   "tiferet",  "ג", "Guimel"],
  ["chochmah","binah",    "ד", "Dalet"],
  ["chochmah","chesed",   "ה", "He"],
  ["chochmah","tiferet",  "ו", "Vav"],
  ["binah",   "gevurah",  "ז", "Zayin"],
  ["binah",   "tiferet",  "ח", "Jet"],
  ["chesed",  "gevurah",  "ט", "Tet"],
  ["chesed",  "tiferet",  "י", "Yod"],
  ["chesed",  "netzach",  "כ", "Kaf"],
  ["gevurah", "tiferet",  "ל", "Lamed"],
  ["gevurah", "hod",      "מ", "Mem"],
  ["tiferet", "netzach",  "נ", "Nun"],
  ["tiferet", "hod",      "ס", "Samej"],
  ["tiferet", "yesod",    "ע", "Ayin"],
  ["netzach", "hod",      "פ", "Pe"],
  ["netzach", "yesod",    "צ", "Tzadi"],
  ["netzach", "malchut",  "ק", "Kof"],
  ["hod",     "yesod",    "ר", "Resh"],
  ["hod",     "malchut",  "ש", "Shin"],
  ["yesod",   "malchut",  "ת", "Tav"],
];

export function getSefira(id: string): Sefira | undefined {
  return SEFIROT.find((s) => s.id === id);
}

export function sefiraLabel(s: Sefira, locale: string): string {
  if (locale === "fa") return s.fa;
  if (locale === "en") return s.en;
  return s.es;
}
