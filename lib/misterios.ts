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
    slug: "linaje",
    he: "עֲבֵרָה לִשְׁמָהּ",
    titulo: "El linaje prohibido del Mashíaj",
    tituloFa: "تبارِ ممنوعِ ماشیح",
    gancho: "El Mashíaj desciende por los lugares más caídos: incesto, prostitución, adulterio. La sombra, dada vuelta, es la luz.",
    ganchoFa: "ماشیح از فروافتاده‌ترین جاها فرود می‌آید. سایه، وارونه، نور است.",
    serie: "dos-filos",
    color: "#e0a850",
    orden: 3,
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
    orden: 4,
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
    orden: 5,
  },
];

export function getMisterio(slug: string): Misterio | undefined {
  return MISTERIOS.find((m) => m.slug === slug);
}

export const MISTERIOS_ORDENADOS = [...MISTERIOS].sort((a, b) => a.orden - b.orden);
