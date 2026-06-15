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
  // TODO(fa): la spec del Mapa solo trae la Regla de Oro en español; el Sofer
  // entregará el fa. Mientras tanto el disclaimer (que SÍ está en fa) cubre lo
  // esencial en farsi. No traducir aquí por nuestra cuenta.
  fa: null as string | null,
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
  fa: null as string | null, // TODO(fa)
  en: null as string | null, // TODO(en)
};

// Nota devocional del nombre de la madre (campo OPCIONAL) — spec §"Madre"
export const MAPA_MADRE_NOTA = {
  es:
    "Costumbre devocional de la tefilá: «[Nombre] ben/bat [nombre de la madre]». No tiene efectos automáticos ni mágicos, nunca es requisito ni un «amplificador de poder». Es opcional.",
  fa: null as string | null, // TODO(fa)
  en: null as string | null, // TODO(en)
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

// ===========================================================================
//  FUNCIÓN 2 — מַרְאָה — El Espejo del Alma
// ===========================================================================

// DISCLAIMER del Espejo (mostrar ANTES de entrar; es + fa completos en la spec)
export const ESPEJO_DISCLAIMER = {
  es:
    "מַרְאָה — El Espejo del Alma. Esto no es adivinación ni un juicio sobre ti ni sobre nadie. Son tendencias GENERALES del alma, presentadas como espejo para tu avodá, según el secreto del Zohar (Yitró, Raza de-Razin) y la tradición del Arizal. Nunca son tu destino. El Zohar enseña que el Santo grabó estas señales 'para entender, no para predecir'. Estos secretos se transmitían con temor del Cielo y solo a los dignos. Por encima de todo rasgo está tu libre albedrío y tu entrega a Dios: como escribió Rabbeinu Bachya, 'lo esencial no es el saber, sino la rectitud del carácter'. Tú eliges quién ser.",
  fa:
    "מַרְאָה — آینهٔ روح. این پیشگویی نیست و دربارهٔ تو یا هیچ‌کس قضاوت نمی‌کند. اینها گرایش‌های کلی روح هستند، آینه‌ای برای عَبودای تو، بر پایهٔ راز زوهر (یترو، رازا دِرازین) و سنت آریزال. اینها هرگز سرنوشت تو نیستند. زوهر می‌آموزد که خداوند این نشانه‌ها را 'برای فهمیدن، نه پیشگویی' نقش بسته است. این رازها با ترس از آسمان و تنها به شایستگان سپرده می‌شد. فراتر از هر ویژگی، ارادهٔ آزاد و تسلیم تو به خداوند است: چنان‌که رَبِّنو بَحیا نوشت، 'اصل، دانش نیست، بلکه راستیِ منش است.' تو انتخاب می‌کنی که چه کسی باشی.",
  en: null as string | null, // TODO(en)
};

// Nota de honestidad sobre el Arizal / metoposcopía de las "22 letras"
export const ESPEJO_NOTA_ARIZAL = {
  es:
    "Nota de honestidad: la «metoposcopía de las 22 letras en la frente» del Arizal NO es citable con folio en el Shaar Ruaj HaKodesh; se menciona el Arizal solo como tradición atestiguada por Rabí Jaim Vital, con temor del Cielo y dependiente de ruaj hakodesh. No se inventa folio.",
  fa: null as string | null, // TODO(fa)
  en: null as string | null, // TODO(en)
};

export interface RasgoTema {
  id: "R1" | "R2" | "R3" | "R4" | "R5" | "R6" | "R7" | "R8";
  /** título corto del rasgo-tema */
  titulo: string;
  /** fuente exacta verificada (Zohar §/folio o Rabbeinu Bachya) */
  fuente: string;
  /** cita hebrea verificada */
  citaHe: string;
  /** la midá / avodá a trabajar */
  mida: string;
  /** la pregunta-espejo */
  espejo: string;
  /** opuesto-luminoso = la meta */
  opuesto: string;
  color: string;
}

// LOS 8 RASGOS-TEMA — transcripción fiel de la spec §"LOS 8 RASGOS-TEMA".
// El "opuesto-luminoso" se deriva de la midá/avodá que la spec ya nombra para
// cada rasgo (la spec pide "ofrecer el opuesto-luminoso como meta").
export const RASGOS: RasgoTema[] = [
  {
    id: "R1",
    titulo: "La mente inquieta / impaciente",
    fuente: "Zohar Yitró §6 (Vilna 72a)",
    citaHe: "מצחא דקיק וחד… לא מתיישבא בדעתיה, חשיב דאיהו חכים ולא ידע",
    mida: "יישוב הדעת (asentar la mente).",
    espejo: "¿Hablo antes de escuchar de verdad? ¿Confundo rapidez con sabiduría?",
    opuesto: "La mente que se asienta: escuchar hasta el final y dejar que la sabiduría madure antes de hablar.",
    color: "#e0533a",
  },
  {
    id: "R2",
    titulo: "El corazón sereno y compasivo",
    fuente: "Zohar Yitró §6 (72a)",
    citaHe: "מצחא דקיק בעיגולא… רחמן איהו על כלא… אי ישתדל באורייתא להוי חכים יתיר",
    mida: "Don a no desperdiciar: convertir la calma en estudio constante.",
    espejo: "¿Pongo mi calma al servicio del crecimiento, o me acomodo?",
    opuesto: "La calma fértil: una serenidad que se convierte en estudio constante y crecimiento, no en comodidad.",
    color: "#3fae6b",
  },
  {
    id: "R3",
    titulo: "El temperamento de fuego / ira contenida",
    fuente: "Zohar Yitró §5 (71a)",
    citaHe: "שעריה קמיט וסליק… מאריה דרגיזו, לביה קמיט",
    mida: "כעס → סבלנות (de la ira a la paciencia).",
    espejo: "Mi intensidad, ¿quema a los que amo o ilumina? ¿Dónde se me cierra el corazón?",
    opuesto: "El fuego que ilumina: una intensidad transformada en paciencia, que calienta y alumbra en vez de quemar.",
    color: "#e08a2e",
  },
  {
    id: "R4",
    titulo: "El alma de aguas tranquilas / fluidez",
    fuente: "Zohar Yitró §5 (71a)",
    citaHe: "שערא שעיע… טב איהו לשותפו… ואיהו בלחודוי לאו הכי",
    mida: "Cultivar eje propio (gevurá interior) para no diluirse.",
    espejo: "¿Fluyo con todos hasta perderme? ¿Tengo eje propio a solas?",
    opuesto: "El agua con cauce: una fluidez con eje propio, capaz de unirse a otros sin perderse a sí misma.",
    color: "#5fa3c9",
  },
  {
    id: "R5",
    titulo: "La palabra hiriente / lashón hará",
    fuente: "Zohar Yitró §9",
    citaHe: "שפוון רברבן… ממלל בלישנא בישא",
    mida: "שמירת הלשון (cuidar la lengua).",
    espejo: "Mi palabra hoy, ¿levantó o derribó? ¿Hablo a espaldas?",
    opuesto: "La palabra que construye: una lengua guardada que levanta, bendice y dice en presencia lo que no diría a espaldas.",
    color: "#9b59b6",
  },
  {
    id: "R6",
    titulo: "La soberbia espiritual disfrazada",
    fuente: "Zohar Yitró §6 (72a)",
    citaHe: "אתחכם… אבל לא לשמה, אלא בגין לאתגאה בפני עמא",
    mida: "לשמה (sinceridad): hacer el bien en lo oculto.",
    espejo: "Lo bueno que hago, ¿lo haría igual si nadie me viera?",
    opuesto: "El bien lishmá: hacer lo bueno por sí mismo, igual de fiel cuando nadie mira que cuando todos miran.",
    color: "#c9a43e",
  },
  {
    id: "R7",
    titulo: "El que oye demasiado el ruido del mundo",
    fuente: "Zohar Yitró §10",
    citaHe: "אודנין רברבין, טפשא בליביה ושגעונא",
    mida: "Discernir qué escuchar (Shemá: escucha enfocada en lo Uno).",
    espejo: "¿Escucho con discernimiento o me arrastra todo lo que entra?",
    opuesto: "El oído que discierne: una escucha enfocada en lo Uno, que filtra el ruido del mundo en vez de dejarse arrastrar.",
    color: "#6b7280",
  },
  {
    id: "R8",
    titulo: "El guardián de secretos / alma profunda",
    fuente: "Zohar Yitró §5 (71a)",
    citaHe: "מארי דרזין… ברזין זעירין לא קיימא בהו",
    mida: "Bajar la grandeza a lo cotidiano (בכל דרכיך דעהו).",
    espejo: "¿Fiel en lo grande pero descuidado en lo diario?",
    opuesto: "La profundidad encarnada: una grandeza que también honra lo pequeño y cotidiano, «en todos tus caminos conócelo».",
    color: "#4aa3c9",
  },
];

// FLUJO: 4 preguntas (NO elegir rasgo de lista) — spec §"FLUJO RECOMENDADO".
// Cada opción suma a uno o más rasgos. La suma da el rasgo-tema dominante.
export interface Opcion {
  texto: string;
  rasgos: RasgoTema["id"][];
}
export interface Pregunta {
  id: number;
  texto: string;
  opciones: Opcion[];
}

export const PREGUNTAS: Pregunta[] = [
  {
    id: 1,
    texto: "Cuando algo me molesta, mi primer impulso es:",
    opciones: [
      { texto: "responder rápido / encenderme", rasgos: ["R3", "R1"] },
      { texto: "callar y guardarlo", rasgos: ["R8"] },
      { texto: "ceder para evitar conflicto", rasgos: ["R4"] },
      { texto: "observar antes de actuar", rasgos: ["R2"] },
    ],
  },
  {
    id: 2,
    texto: "Las cosas buenas que hago, suelo:",
    opciones: [
      { texto: "hacerlas mejor si alguien las ve", rasgos: ["R6"] },
      { texto: "hacerlas igual en lo oculto", rasgos: ["R2"] },
      { texto: "contarlas / comentarlas", rasgos: ["R5"] },
    ],
  },
  {
    id: 3,
    texto: "Mi mayor distracción es:",
    opciones: [
      { texto: "mi prisa por opinar", rasgos: ["R1"] },
      { texto: "todo lo que oigo de otros", rasgos: ["R7"] },
      { texto: "lo cotidiano me aburre, busco lo profundo", rasgos: ["R8"] },
    ],
  },
  {
    id: 4,
    texto: "Con los demás, tiendo a:",
    opciones: [
      { texto: "hablar de más sobre ellos", rasgos: ["R5"] },
      { texto: "chocar / encenderme", rasgos: ["R3"] },
      { texto: "diluirme en lo que quieren", rasgos: ["R4"] },
      { texto: "ser tibio en lo pequeño", rasgos: ["R8"] },
    ],
  },
];

// Cierre fijo "tendencia, no destino" — spec §FLUJO ("cierra recordando…").
export const ESPEJO_CIERRE = {
  es:
    "Recuerda: esto es una tendencia, no un destino. El rasgo es maleable; el opuesto-luminoso es tu meta, no una sentencia. Tú eliges quién ser.",
  fa: null as string | null, // TODO(fa)
  en: null as string | null, // TODO(en)
};

export function rasgoById(id: RasgoTema["id"]): RasgoTema {
  return RASGOS.find((r) => r.id === id)!;
}
