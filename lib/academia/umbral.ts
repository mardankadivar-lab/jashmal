// ─────────────────────────────────────────────────────────────────────────
// umbral.ts — el contenido de la primera lección de la ACADEMIA: "El Umbral".
// Onboarding de 4 pantallas para quien nunca ha estudiado Cabalá. El contenido
// fue escrito y VERIFICADO por el Sofer (editor-erudito): se monta TAL CUAL,
// no se inventa ni se cambian fuentes/gematrías.
//
// Trilingüe (es/fa/en): el ESPAÑOL va completo. fa/en caen al español por ahora
// (la estructura ya soporta los tres — basta rellenar `fa` / `en`). Las CITAS
// hebreas (hebrew, citations) NO cambian entre idiomas.
// ─────────────────────────────────────────────────────────────────────────

export type Locale = "es" | "fa" | "en";

// Una opción del "espejo" (Pantalla 1). `id` viaja al wizard para personalizar.
export type MirrorChoice = { id: string; label: string };

// Un bloque de la Pantalla 3, con su marca de fuente.
//   classic → fuente clásica (Midrash, palabra por palabra) · cita verificada
//   etym    → etimología / lectura tradicional (⚠️ no es cita del Midrash)
//   plain   → narración del Sofer (sin cita)
export type BlockKind = "enigma" | "classic" | "etym" | "closing";

export type Screen3Block = {
  kind: BlockKind;
  // Párrafos antes de una posible cita.
  lead: string[];
  // Cita destacada (texto + atribución). Opcional.
  quote?: { text: string; source: string };
  // Párrafos después de la cita.
  tail?: string[];
};

export type UmbralContent = {
  // Navegación / acción
  next: string;            // texto genérico de "siguiente"
  // Pantalla 1 — El espejo
  s1: {
    rubric: string;        // "הָרְאִי · El espejo"
    rubricHe: string;      // "הָרְאִי"
    question: string;
    choices: MirrorChoice[];
    micro: string;
    cta: string;
  };
  // Pantalla 2 — La promesa honesta
  s2: {
    rubric: string;
    rubricHe: string;
    body: string[];        // párrafos
    cta: string;
  };
  // Pantalla 3 — La primera victoria (el corazón)
  s3: {
    rubric: string;
    rubricHe: string;
    blocks: Screen3Block[];
    cta: string;
    // Línea opcional que reinyecta la respuesta del espejo (Pantalla 1).
    // {{choice}} se sustituye por la frase elegida en minúscula.
    mirrorback?: string;
  };
  // Pantalla 4 — El primer peldaño
  s4: {
    rubric: string;
    rubricHe: string;
    body: string[];
    ladderLabel: string;   // "מַעֲלוֹת · seis grados"
    saveTitle: string;     // título del bloque de guardar el camino
    saveReason: string;    // razón emocional del registro
    cta: string;           // "Sí, sigo →"
    secondary: string;     // "Quiero ver la escalera completa"
  };
};

// Citas en hebreo COMUNES a los tres idiomas (no se traducen).
export const HEBREW = {
  bereshit: "בְּרֵאשִׁית בָּרָא אֱלֹהִים",
  bereshitGloss: "En el principio, creó Dios…", // glosa por idioma (se sobreescribe abajo)
  bet: "בֵּית",
  alef: "א",
  betLetter: "ב",
};

// La escalera de seis grados (común; las glosas en español).
export const MAALOT: { he: string; es: string }[] = [
  { he: "תַּלְמִיד", es: "Talmid · estudiante" },
  { he: "שׁוֹאֵל", es: "Shoel · el que pregunta" },
  { he: "חָבֵר", es: "Javer · compañero de estudio" },
  { he: "מַגִּיד", es: "Maguid · el que enseña" },
  { he: "חָכָם", es: "Jajam · sabio" },
  { he: "מְקֻבָּל", es: "Mekubal · el que ha recibido" },
];

// ── ESPAÑOL (completo, verificado por el Sofer) ────────────────────────────
const ES: UmbralContent = {
  next: "Continuar →",
  s1: {
    rubric: "הָרְאִי · El espejo",
    rubricHe: "הָרְאִי",
    question: "Antes de empezar, una sola pregunta. ¿Qué te trajo hasta aquí?",
    choices: [
      { id: "saw", label: "Vi algo y quise saber de verdad." },
      { id: "deep", label: "Busco algo profundo, y lo de siempre no me alcanza." },
      { id: "word", label: "Oí la palabra «Cabalá» y no sé qué es realmente." },
    ],
    micro: "No hay respuesta correcta. Solo queríamos mirarte a los ojos un segundo.",
    cta: "Continuar →",
  },
  s2: {
    rubric: "הַבְטָחָה כֵּנָה · Una promesa honesta",
    rubricHe: "הַבְטָחָה כֵּנָה",
    body: [
      "Quizá viste la palabra «Cabalá» atada a hilos rojos, a «energías», a predicciones o a amuletos. Respira. Eso no es la Cabalá.",
      "La palabra קַבָּלָה (Kabalá) significa «lo recibido» — una sabiduría que se transmite de mano en mano, de maestro a estudiante, desde hace miles de años. Es la dimensión escondida que vive dentro de la Torá (la enseñanza fundacional judía): no un poder secreto que se compra, sino una manera honda de leer.",
      "Y aquí va lo importante: aquí no te pedimos que creas. Te mostramos. Cada cosa que afirmemos tendrá su fuente — un libro, un capítulo, un versículo — que puedes leer con tus propios ojos.",
      "Y empezamos donde empieza todo: por la primera palabra de la Torá. De hecho, por su primera letra.",
    ],
    cta: "Muéstrame →",
  },
  s3: {
    rubric: "הַנִּצָּחוֹן הָרִאשׁוֹן · Tu primera victoria",
    rubricHe: "הַנִּצָּחוֹן הָרִאשׁוֹן",
    mirrorback:
      "Hace dos minutos te preguntamos qué te trajo aquí, y respondiste: «{{choice}}». Miraste hacia adelante y respondiste. Esa fue tu ב.",
    blocks: [
      {
        kind: "enigma",
        lead: [
          "La Torá (los cinco libros de Moisés, el comienzo de la Biblia hebrea) empieza así:",
        ],
        // La cita del versículo se renderiza como bloque hebreo grande en el componente.
        tail: [
          "Mira la primerísima letra, la de la derecha (el hebreo se lee de derecha a izquierda):",
          // Aquí el componente inserta la ב GIGANTE.
          "Se llama בֵּית (bet). El alfabeto hebreo tiene 22 letras. La primera de todas es א (álef). Pero la Torá no empieza con la primera letra. Empieza con la segunda.",
          "¿Por qué el libro más importante arranca con la letra número dos, y no con la número uno?",
        ],
      },
      {
        kind: "classic",
        lead: [
          "Los sabios respondieron mirando la forma. Mírala tú también: está cerrada arriba, cerrada abajo, cerrada por detrás (a la derecha)… y abierta por delante (hacia donde el texto avanza). Es una casa con una sola puerta, y esa puerta da hacia adelante.",
          "Hace ~1600 años, Rabí Leví lo dijo así (lo recoge el Midrash en Bereshit Rabá 1:10):",
        ],
        quote: {
          text:
            "«¿Por qué fue creado el mundo con la letra bet? Porque así como la bet está cerrada por todos sus lados y abierta por su frente, así no tienes permiso de preguntar: ¿qué hay debajo?, ¿qué hay encima?, ¿qué había antes?, ¿qué habrá después? — sino solo desde el día en que el mundo fue creado, en adelante.»",
          source: "Bereshit Rabá 1:10 (en nombre de Rabí Leví)",
        },
        tail: [
          "La lección no es «no preguntes». Es hacia dónde preguntar: no gastes la vida atrapado en lo sellado detrás de ti; mira hacia adelante, ahí está lo que sí puedes construir.",
        ],
      },
      {
        kind: "etym",
        lead: [
          "El nombre de la letra, בֵּית (bet), es casi idéntico a בַּיִת (báyit, «casa»). (⚠️ Esto es etimología y lectura tradicional de las letras, no una cita del Midrash.) Así que el primer trazo de la Torá es una casa abierta hacia adelante.",
          "Y el mismo Midrash agrega —esto sí, palabra por palabra—:",
        ],
        quote: {
          text:
            "«¿Por qué con bet? Porque es el lenguaje de la bendición (בְּרָכָה, berajá). ¿Y por qué no con álef? Porque es el lenguaje de la maldición (אֲרִירָה, arirá).»",
          source: "Bereshit Rabá 1:10",
        },
        tail: [
          "Fíjate: בְּרָכָה (bendición) empieza con ב. El mundo fue abierto con la letra de la bendición a propósito. (✅ Esto sí lo dice el Midrash.)",
        ],
      },
      {
        kind: "closing",
        lead: [
          "Recapitulando, con la fuente delante: la Torá empieza con la segunda letra, ב; su forma es cerrada atrás, abierta adelante, una casa con la puerta al futuro; por eso la sabiduría empieza mirando hacia adelante.",
          "Y la parte que no esperabas: hace dos minutos te preguntamos qué te trajo aquí. Miraste hacia adelante y respondiste. Esa fue tu ב. No empezaste con certezas cerradas — empezaste con una puerta abierta y una pregunta hacia el futuro, como la primera letra de la Torá.",
          "Acabas de entender, con la fuente en la mano, por qué el universo empieza con una bet. Eso no es poco. Eso es leer Cabalá.",
        ],
      },
    ],
    cta: "Di mi nombre →",
  },
  s4: {
    rubric: "הַשָּׁלָב הָרִאשׁוֹן · El primer peldaño",
    rubricHe: "הַשָּׁלָב הָרִאשׁוֹן",
    body: [
      "Acabas de dar tu primer paso. Y eso te da un nombre. Eres un תַּלְמִיד (talmid) — un estudiante. No es un título menor. Es el título.",
      "Así empezaron todos: Rashi, el Arizal, cada gran maestro fue, primero, un talmid frente a su primera letra. Nadie nace sabio. Todos cruzan este umbral.",
      "Sobre este cimiento —una letra, una fuente, una puerta abierta hacia adelante— se construye todo lo demás. En Jashmal hay una escalera de seis grados (מַעֲלוֹת, maalot):",
      "No es un examen. Es un horizonte — para que sepas que este camino sube, y que tú ya estás en él, en el primer escalón, donde empiezan los grandes. La puerta está abierta hacia adelante.",
    ],
    ladderLabel: "מַעֲלוֹת · La escalera de seis grados",
    saveTitle: "Guarda tu camino",
    saveReason:
      "Para guardar tu camino y seguir mañana donde lo dejaste, déjame tu correo — un solo enlace, sin contraseñas.",
    cta: "Sí, sigo →",
    secondary: "Quiero ver la escalera completa",
  },
};

// ── FARSI / PERSA (cae al español por ahora; estructura lista para traducir) ──
const FA: UmbralContent = ES;

// ── INGLÉS (cae al español por ahora; estructura lista para traducir) ───────
const EN: UmbralContent = ES;

const BY_LOCALE: Record<Locale, UmbralContent> = { es: ES, fa: FA, en: EN };

export function getUmbral(locale: string): UmbralContent {
  return BY_LOCALE[(locale as Locale)] ?? ES;
}

// Glosa del versículo de apertura por idioma (la cita hebrea no cambia).
export function bereshitGloss(locale: string): string {
  switch (locale) {
    case "en":
      return "In the beginning, God created…";
    case "fa":
      return "در آغاز، خدا آفرید…";
    default:
      return "En el principio, creó Dios…";
  }
}

// Cita de Génesis 1:1 (referencia mostrada bajo el versículo).
export const GENESIS_REF = "Génesis 1:1";
