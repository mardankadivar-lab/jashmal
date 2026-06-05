// Catálogo de los Misterios — estudios publicados de Jashmal.
// Cada misterio es una landing en /misterio/{slug}. Para añadir uno nuevo,
// agrega una entrada aquí y crea su página.

export interface Misterio {
  slug: string;          // ruta: /misterio/{slug} y atajo /{slug}
  numero?: string;       // número/gematría destacado (ej. "358")
  he: string;            // término hebreo central
  titulo: string;        // título en español
  tituloFa: string;
  gancho: string;        // una línea de gancho (español)
  ganchoFa: string;
  serie?: string;        // nombre de la serie (para agrupar)
  color: string;
  orden: number;         // orden de aparición (menor = primero)
}

export const MISTERIOS: Misterio[] = [
  {
    slug: "358",
    numero: "358",
    he: "מָשִׁיחַ = נָחָשׁ",
    titulo: "El Mesías y la Serpiente",
    tituloFa: "ماشیح و مار",
    gancho: "El redentor y la serpiente del Edén comparten el mismo número. La Cabalá lo sabía hace 800 años.",
    ganchoFa: "رهاننده و مارِ عدن یک عدد دارند. کابالا ۸۰۰ سال است این را می‌داند.",
    serie: "dos-filos",
    color: "#c9a43e",
    orden: 1,
  },
  {
    slug: "26",
    numero: "26",
    he: "אֶחָד · אַהֲבָה",
    titulo: "Unidad y Amor",
    tituloFa: "یگانگی و عشق",
    gancho: "Ejad (Uno) y Ahavá (Amor) suman lo mismo: 26 — el Nombre de Dios. La unidad y el amor son Su Nombre.",
    ganchoFa: "اِچاد (یک) و اَهاوا (عشق) برابرند: ۲۶ — نامِ خدا.",
    serie: "dos-filos",
    color: "#f0d060",
    orden: 2,
  },
  {
    slug: "tamar",
    he: "תָּמָר",
    titulo: "El velo que escondía al Mesías",
    tituloFa: "تامار — حجابی که ماشیح را پنهان می‌کرد",
    gancho: "El mayor escándalo de la Torá esconde el nacimiento de la línea del Mashíaj. Mientras los hombres veían vergüenza, el Cielo encendía la luz del Redentor.",
    ganchoFa: "بزرگ‌ترین رسواییِ تورات، تولدِ تبارِ ماشیح را پنهان می‌کند. آنچه جهان می‌پوشاند، خدا تاج می‌بخشد.",
    serie: "dos-filos",
    color: "#c9a43e",
    orden: 3,
  },
  {
    slug: "linaje",
    he: "עֲבֵרָה לִשְׁמָהּ",
    titulo: "El linaje prohibido del Mashíaj",
    tituloFa: "تبارِ ممنوعِ ماشیح",
    gancho: "El Mashíaj desciende por los lugares más caídos: incesto, prostitución, adulterio. La sombra, dada vuelta, es la luz.",
    ganchoFa: "ماشیح از فروافتاده‌ترین جاها فرود می‌آید. سایه، وارونه، نور است.",
    serie: "dos-filos",
    color: "#e0a850",
    orden: 4,
  },
  {
    slug: "habakuk",
    numero: "216",
    he: "חֲבַקּוּק",
    titulo: "Habakuk y el doble abrazo",
    tituloFa: "حَبَقّوق و دو آغوش",
    gancho: "Shigyonot: ¿errores o instrumentos? Habakuk: ¿un abrazo o dos? Una palabra con dos filos, y una gematría que abraza la partición del mar.",
    ganchoFa: "شیگیونوت: خطاها یا سازها؟ حَبَقّوق: یک آغوش یا دو؟ یک واژه با دو لبه.",
    serie: "dos-filos",
    color: "#b89a4e",
    orden: 5,
  },
  {
    slug: "bilaam",
    he: "בִּלְעָם",
    titulo: "Bilaam — la boca de la serpiente",
    tituloFa: "بیلعام — دهانِ مار",
    gancho: "El hechicero con el espíritu de Samael vino a maldecir a Israel — y de su boca salió la profecía mesiánica más profunda de la Biblia. Del lugar más oscuro, la luz más brillante.",
    ganchoFa: "جادوگری با روحِ سَمائل آمد تا نفرین کند — و از دهانش ژرف‌ترین پیشگوییِ مسیحایی برآمد.",
    serie: "dos-filos",
    color: "#9a6a8e",
    orden: 6,
  },
  {
    slug: "137",
    numero: "137",
    he: "קַבָּלָה",
    titulo: "137 — El acertijo de la creación",
    tituloFa: "۱۳۷ — معمای آفرینش",
    gancho: "Kabalah = 137. Y la constante de estructura fina α ≈ 1/137 que gobierna la luz. El número que une la Cabalá con la física (Rav Ginsburgh).",
    ganchoFa: "قبالا = ۱۳۷. و ثابتِ ساختارِ ریز α ≈ ۱/۱۳۷ که نور را حکم می‌راند. عددی که کابالا را با فیزیک می‌پیوندد.",
    serie: "gematria",
    color: "#9a6a8e",
    orden: 7,
  },
  {
    slug: "entrelazamiento",
    numero: "137",
    he: "אַהֲבָה ⊗ יִרְאָה",
    titulo: "El entrelazamiento de las almas",
    tituloFa: "درهم‌تنیدگیِ جان‌ها",
    gancho: "Amor (42 veces) + Temor (95 veces) = 137. En la atadura de Isaac, el amor y el temor quedan entrelazados — como dos partículas que actúan como una. Y la Cabalá (=137) es la constante que acopla el alma con Dios.",
    ganchoFa: "عشق (۴۲ بار) + ترس (۹۵ بار) = ۱۳۷. در بستنِ اسحاق، عشق و ترس درهم‌تنیده می‌شوند — چون دو ذرّه که چون یکی رفتار می‌کنند. و کابالا (=۱۳۷) ثابتی است که جان را به خدا می‌پیوندد.",
    serie: "gematria",
    color: "#b5557a",
    orden: 8,
  },
  {
    slug: "sanador",
    he: "יְהוָה רֹפְאֶךָ",
    titulo: "Yo soy Hashem tu sanador",
    tituloFa: "من خداوند، شفادهندهٔ تو",
    gancho: "«Yo soy Hashem tu sanador» (Éxodo 15:26). La sanidad no es algo que Dios envía — es uno de Sus Nombres. Y la primera cura es el perdón (Salmos 103:3).",
    ganchoFa: "«من خداوند، شفادهندهٔ توام» (خروج ۱۵:۲۶). شفا چیزی نیست که خدا بفرستد — یکی از نام‌های اوست. و نخستین شفا، آمرزش است (مزامیر ۱۰۳:۳).",
    serie: "sanidad",
    color: "#3fa68a",
    orden: 9,
  },
  {
    slug: "refael",
    numero: "311",
    he: "רְפָאֵל",
    titulo: "Refael — «Dios sana»",
    tituloFa: "رفائل — «خدا شفا می‌دهد»",
    gancho: "Refael (=311) es el ángel cuyo nombre dice «Dios sana». Curó a Abraham tras la circuncisión — y el mismo ángel que sana es el que rescata. רפא (281) + אל (31) = 312 = 311+1, el sello del kolel.",
    ganchoFa: "رفائل (=۳۱۱) فرشته‌ای است که نامش می‌گوید «خدا شفا می‌دهد». ابراهام را پس از ختنه شفا داد — و همان فرشته که شفا می‌دهد، همان است که می‌رهاند.",
    serie: "sanidad",
    color: "#5b8fd6",
    orden: 10,
  },
  {
    slug: "serpiente-de-cobre",
    numero: "358",
    he: "נְחַשׁ הַנְּחֹשֶׁת",
    titulo: "La serpiente de cobre",
    tituloFa: "مارِ مفرغین",
    gancho: "La medicina tenía la forma exacta de la enfermedad. Nájash (serpiente) = Mashíaj = 358: la fuerza que envenena, elevada hacia lo Alto, se vuelve la cura.",
    ganchoFa: "درمان درست به شکلِ بیماری بود. مار (نَحَش) = ماشیح = ۳۵۸: نیرویی که زهر می‌ریزد، برافراشته به سویِ بالا، شفا می‌شود.",
    serie: "sanidad",
    color: "#b06a3c",
    orden: 11,
  },
  {
    slug: "refua",
    he: "רְפוּאַת הַנֶּפֶשׁ וּרְפוּאַת הַגּוּף",
    titulo: "Sanación del alma y del cuerpo",
    tituloFa: "شفایِ جان و شفایِ تن",
    gancho: "El alma va primero, y el cuerpo después. No prometemos que el cuerpo siempre sane — pero el alma siempre puede volver a casa.",
    ganchoFa: "نخست جان، آنگاه تن. وعده نمی‌دهیم که تن همیشه شفا یابد — اما جان همیشه می‌تواند به خانه برگردد.",
    serie: "sanidad",
    color: "#7d9b8a",
    orden: 12,
  },
];

export function getMisterio(slug: string): Misterio | undefined {
  return MISTERIOS.find((m) => m.slug === slug);
}

export const MISTERIOS_ORDENADOS = [...MISTERIOS].sort((a, b) => a.orden - b.orden);
