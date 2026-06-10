// ─────────────────────────────────────────────────────────────────────────
// edgeData.ts — Curaduría de CONEXIONES (sinapsis) de la Mente Cósmica.
//
// "Mente Cósmica relacional V3": el estudio no es solo node-based, es
// edge-based. Cada conexión curada tiene metadata propia: tipo de relación,
// rótulos direccionales, explicación, fuentes EXACTAS y un study_prompt que
// ancla el estudio contextual ("Jesed en relación con Abraham").
//
// REGLA DE HONESTIDAD (de la espec, innegociable):
//   · Un edge SIN entrada aquí = conexión NO curada. La UI muestra
//     "Esta conexión todavía necesita desarrollo." — NUNCA se inventan
//     fuentes ni se abre el estudio general fingiendo que es contextual.
//   · `needs_review: true` = curaduría PRELIMINAR (placeholder/en revisión):
//     se muestra y se usa, pero rotulada como preliminar.
//
// El Sofer (editor-erudito) está curando el lote real de edges de Abraham;
// su JSON se integrará aquí (mismo esquema). Las claves son estables:
// `edgeDataKey(fromId, toId)` normaliza los ids de la tupla del grafo
// ("Avraham","Jésed" → "avraham→jesed"), así que la curaduría sobrevive a
// acentos/mayúsculas y funciona en ambas direcciones (reverse_label).
// ─────────────────────────────────────────────────────────────────────────

export type EdgeSourceRef = {
  text: string;   // nombre de la obra ("Bereshit", "Zohar", "Miqueas")
  ref: string;    // referencia exacta estilo Sefaria ("Genesis 18") — puede ir vacía si es atribución general
  reason: string; // por qué esta fuente conecta los dos nodos
};

export type EdgeData = {
  relationship_type: string;   // ej. "sefirotic_attribute", "textual_source", "family"
  directional_label: string;   // "Abraham encarna Jesed" (en la dirección de la clave)
  reverse_label: string;       // "Jesed se revela en Abraham" (dirección contraria)
  context_title: string;       // "Abraham y la sefirá de Jesed"
  short_explanation: string;   // explicación breve de la conexión (para el panel)
  study_prompt: string;        // enfoque que ancla el estudio contextual
  source_refs: EdgeSourceRef[];
  keywords: string[];
  // Campos opcionales del esquema V3 (el Sofer puede llenarlos en su lote):
  pardes?: { pshat?: string; remez?: string; drash?: string; sod?: string };
  chasidut?: string;
  personal_application?: string;
  // true = curaduría preliminar / pendiente de verificación final del Sofer.
  needs_review?: boolean;
};

// ── Clave estable de un edge ───────────────────────────────────────────────
// Normaliza un id de nodo del grafo: minúsculas, sin acentos, separadores → "-".
// "Avraham" → "avraham" · "Jésed" → "jesed" · "Birá Doleket" → "bira-doleket".
export function normNodeId(id: string): string {
  return id
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita diacríticos (é → e)
    .replace(/[^a-z0-9\u0590-\u05FF]+/g, "-") // separadores → "-" (conserva hebreo)
    .replace(/^-+|-+$/g, "");
}

export function edgeDataKey(fromId: string, toId: string): string {
  return `${normNodeId(fromId)}→${normNodeId(toId)}`;
}

// ── Registro de curaduría ──────────────────────────────────────────────────
// LOTE 1 del Sofer (2026-06-09): 12 conexiones de Abraham, TODAS verificadas
// ref por ref contra la API de Sefaria (contenido leído en hebreo). Fuente de
// la entrega + pendientes del lote 2: content/curaduria-edges-lote1.json (_meta).
// Regla de oro intacta: aquí solo entra lo verificado; lo demás = "necesita desarrollo".
export const EDGE_DATA: Record<string, EdgeData> = {
  // Avraham→Jésed — verificado por el Sofer (lote 1)
  "avraham→jesed": {
    "relationship_type": "sefirotic_attribute",
    "directional_label": "Abraham encarna Jésed",
    "reverse_label": "Jésed se revela en Abraham",
    "context_title": "Abraham y la sefirá de Jésed",
    "short_explanation": "El profeta sella el binomio para siempre: «darás la verdad a Yaakov, el jésed a Abraham» (Miqueas 7:20). El Sefer HaBahir lo formula en clave sefirótica y midá kenegued midá: porque Abraham hizo jésed con el mundo —alimentaba a todo caminante y corría a recibirlo—, el Santo «midió con su misma medida y le dio la midat haJésed» (Bahir 135); y en Bahir 190, Abraham «mereció y tomó la midá de Jésed» mientras Yitzjak tomó Guevurá. En el mapa del Pataj Eliyahu, Jésed es el brazo derecho del cuerpo divino: Abraham es la mano derecha de la historia.",
    "study_prompt": "Estudiar a Abraham específicamente como encarnación de la sefirá de Jésed: partir del pshat de Miqueas 7:20 (el binomio jésed-Abraham), ver el jésed en acción en Génesis 18:1-8, y subir a la formulación sefirótica de Sefer HaBahir 135 y 190 (practicó jésed y recibió la midat haJésed). Distinguir con cuidado entre jésed como acto humano (gemilut jasadim) y Jésed como atributo cósmico (sefirá), y preguntar cómo se gana una midá.",
    "source_refs": [
      {
        "text": "Miqueas (Tanaj)",
        "ref": "Micah 7:20",
        "reason": "«תתן אמת ליעקב חסד לאברהם» — el versículo que asigna el jésed a Abraham; ancla bíblica del binomio."
      },
      {
        "text": "Sefer HaBahir",
        "ref": "Sefer HaBahir 135",
        "reason": "Explícito y sefirótico: Abraham practicó jésed con todos (cita su correr al encuentro, Gén 18:2) y por eso recibió la midat haJésed; cita Miqueas 7:20 como prueba."
      },
      {
        "text": "Sefer HaBahir",
        "ref": "Sefer HaBahir 190",
        "reason": "Abraham «mereció y tomó la midá de Jésed»; Yitzjak tomó Guevurá (Pajad). El reparto de midot entre los patriarcas."
      },
      {
        "text": "Torá — Bereshit",
        "ref": "Genesis 18:1-8",
        "reason": "El jésed en acción: Abraham corre hacia tres desconocidos y les sirve un banquete; la escena que el Bahir 135 invoca."
      },
      {
        "text": "Tikkunei Zohar (Pataj Eliyahu)",
        "ref": "Tikkunei Zohar 17a:16",
        "reason": "«חסד דרועא ימינא» — Jésed es el brazo derecho en la estructura sefirótica. OJO: no nombra a Abraham; aporta solo el marco del cuerpo divino."
      }
    ],
    "keywords": [
      "jésed",
      "sefirot",
      "midat hajésed",
      "brazo derecho",
      "miqueas 7:20",
      "bahir",
      "gemilut jasadim",
      "midá kenegued midá"
    ]
  },
  // Avraham→Akedá — verificado por el Sofer (lote 1)
  "avraham→akeda": {
    "relationship_type": "event",
    "directional_label": "Abraham es probado en la Akedá",
    "reverse_label": "La Akedá corona las pruebas de Abraham",
    "context_title": "Abraham y la Atadura de Yitzjak (Akedat Yitzjak)",
    "short_explanation": "«Y fue después de estas cosas, y Dios probó (נִסָּה) a Abraham» (Génesis 22:1): la prueba suprema, contada por la tradición entre las diez (Avot 5:3). La liturgia la perpetúa: tocamos shofar de carnero «para que recuerde a vuestro favor la Akedá de Yitzjak» (Rosh Hashaná 16a). El Zohar eleva el pshat con un doble filo: נִסָּה viene de נֵס, estandarte — la prueba no fue para humillar sino para «alzar la bandera de Abraham ante los ojos de todos» (Zohar, Toldot 11:88).",
    "study_prompt": "Estudiar Génesis 22:1-19 en relación con Abraham con lectura de dos filos: el pshat (la prueba del temor de Dios: «ahora sé que temes a Dios», v. 12, con el silencio de Abraham como protagonista) frente al sod del Zohar Toldot 11:88 (nisá = haramat nes: la prueba como elevación del estandarte del tzadik). Cerrar con la resonancia litúrgica de Rosh Hashaná 16a:16: cómo un evento se vuelve memoria ritual anual.",
    "source_refs": [
      {
        "text": "Torá — Bereshit",
        "ref": "Genesis 22:1-19",
        "reason": "La perícopa completa de la Akedá: la orden, el camino de tres días, la atadura, el ángel y el carnero."
      },
      {
        "text": "Mishná — Pirkei Avot",
        "ref": "Pirkei Avot 5:3",
        "reason": "Las diez pruebas de Abraham «y en todas se mantuvo firme»; la Akedá es tradicionalmente la culminación de la serie."
      },
      {
        "text": "Talmud Bavli — Rosh Hashaná",
        "ref": "Rosh Hashanah 16a:16",
        "reason": "R. Abahu: el shofar de carnero existe para recordar la Akedá — «y os consideraré como si os hubierais atado vosotros mismos ante Mí»."
      },
      {
        "text": "Zohar",
        "ref": "Zohar, Toldot 11:88",
        "reason": "Lee נסה como נס (estandarte): el Santo «alzó la bandera de Abraham ante los ojos de todos» — la prueba como elevación, no como trampa."
      }
    ],
    "keywords": [
      "akedá",
      "atadura de yitzjak",
      "prueba",
      "nisayon",
      "shofar",
      "moriá",
      "temor de dios",
      "génesis 22"
    ]
  },
  // Avraham→Brit Milá — verificado por el Sofer (lote 1)
  "avraham→brit-mila": {
    "relationship_type": "covenant",
    "directional_label": "Abraham sella el pacto de la milá",
    "reverse_label": "La Brit Milá hace íntegro (tamim) a Abraham",
    "context_title": "Abraham y el pacto de la circuncisión",
    "short_explanation": "A los noventa y nueve años Abraham recibe el mandato «camina delante de Mí y sé íntegro (תָּמִים)» (Génesis 17:1), y el pacto se graba en la carne: «será el signo del pacto entre Mí y vosotros» (17:11). El Talmud lo afila: nadie se ocupó de mitzvot como Abraham, y sin embargo «no fue llamado tamim sino por la milá» (Nedarim 32a). El Sefer Yetzirá añade el eco místico: el pacto del Único es doble — «entre los diez dedos de los pies, la milá; entre los diez dedos de las manos, la lengua» (SY 6:4): cuerpo y palabra sellados a la vez.",
    "study_prompt": "Estudiar Génesis 17 en relación con Abraham con enfoque en la pregunta de Nedarim 32a:5: ¿por qué la integridad (tamim) llega por la milá y no por ninguna otra mitzvá? Conectar con el pacto doble del Sefer Yetzirá 6:4 (milá y lengua — el órgano de la generación y el órgano de la palabra como los dos sellos del pacto) y preguntar qué significa que un pacto espiritual se inscriba en el cuerpo.",
    "source_refs": [
      {
        "text": "Torá — Bereshit",
        "ref": "Genesis 17:10-11",
        "reason": "El mandato de la circuncisión y su definición como «signo del pacto» (אות ברית)."
      },
      {
        "text": "Torá — Bereshit",
        "ref": "Genesis 17:1",
        "reason": "«Camina delante de Mí y sé tamim» — el versículo del que Nedarim 32a deriva que la integridad depende de la milá."
      },
      {
        "text": "Talmud Bavli — Nedarim",
        "ref": "Nedarim 32a:5",
        "reason": "Rabí: «Grande es la milá, pues nadie se ocupó de mitzvot como Abraham nuestro padre, y no fue llamado tamim sino por la milá»."
      },
      {
        "text": "Sefer Yetzirá",
        "ref": "Sefer Yetzirah 6:4",
        "reason": "El pacto doble sellado con Abraham: la brit milá (dedos de los pies) y la lengua (dedos de las manos) — cuerpo y palabra."
      }
    ],
    "keywords": [
      "brit milá",
      "circuncisión",
      "pacto",
      "tamim",
      "signo",
      "ot brit",
      "génesis 17",
      "nedarim 32a"
    ]
  },
  // Avraham→10 Pruebas — verificado por el Sofer (lote 1)
  "avraham→10-pruebas": {
    "relationship_type": "concept",
    "directional_label": "Abraham atraviesa las diez pruebas",
    "reverse_label": "Las diez pruebas revelan la talla de Abraham",
    "context_title": "Abraham y las diez pruebas",
    "short_explanation": "«Con diez pruebas fue probado Abraham nuestro padre, y en todas se mantuvo firme — para dar a conocer cuán grande era el amor de Abraham nuestro padre» (Pirkei Avot 5:3). La Mishná da el número pero no la lista; Avot DeRabbi Natan 33 trae una enumeración (dos en Lej Lejá, dos con sus dos hijos, dos con sus dos mujeres, una con los reyes, una entre las partes, una en Ur Kasdim y una en la brit milá). Honestidad del dato: las listas exactas VARÍAN entre las recensiones y los comentaristas — esa variación es en sí materia de estudio, no un defecto.",
    "study_prompt": "Estudiar Pirkei Avot 5:3 en relación con Abraham con enfoque comparativo: contrastar la lista de Avot DeRabbi Natan 33 con las de los comentaristas clásicos de la Mishná, y preguntar por qué la Mishná entrega el NÚMERO (diez, como los diez maamarot y las diez plagas del mismo capítulo de Avot) pero calla la lista. ¿Qué enseña la estructura decimal de las pruebas sobre la estructura decimal de la creación?",
    "source_refs": [
      {
        "text": "Mishná — Pirkei Avot",
        "ref": "Pirkei Avot 5:3",
        "reason": "La fuente del dato: diez pruebas, todas superadas, «para dar a conocer cuánto era su amor»."
      },
      {
        "text": "Avot DeRabbi Natan",
        "ref": "Avot DeRabbi Natan 33",
        "reason": "Enumera una lista de las diez: «dos en Lej Lejá, dos con sus dos hijos, dos con sus dos mujeres, una con los reyes, una entre las partes, una en Ur Kasdim y una en la brit milá»."
      }
    ],
    "keywords": [
      "diez pruebas",
      "asará nisyonot",
      "pirkei avot",
      "avot derabbi natan",
      "lej lejá",
      "ur kasdim",
      "amor de abraham"
    ]
  },
  // Avraham→Tefilá — verificado por el Sofer (lote 1)
  "avraham→tefila": {
    "relationship_type": "practice",
    "directional_label": "Abraham instituye la oración de la mañana",
    "reverse_label": "Shajarit lleva el sello de Abraham",
    "context_title": "Abraham y la oración (Tefilá)",
    "short_explanation": "«Las oraciones, los patriarcas las instituyeron» (R. Yosi ben R. Janina, Berajot 26b). La baraita lo precisa: «Abraham instituyó la oración de la mañana (Shajarit), como está dicho: madrugó Abraham por la mañana hacia el lugar donde había estado de pie (Génesis 19:27) — y no hay 'estar de pie' (עמידה) sino oración». El versículo es la mañana siguiente a Sodoma: la primera Shajarit de la historia nace de volver al lugar donde uno intercedió por otros, aun cuando la respuesta fue un humo que sube.",
    "study_prompt": "Estudiar Berakhot 26b:5 en relación con Abraham con enfoque en el detalle del pshat: Génesis 19:27 ocurre la mañana DESPUÉS de la destrucción de Sodoma, en el mismo lugar donde Abraham había discutido con Dios (Génesis 18). Preguntar: ¿qué significa que la oración fija de la mañana se funde precisamente en una plegaria que aparentemente no fue respondida? Conectar con la noción de keviut (fijeza): volver al mismo lugar, cada mañana.",
    "source_refs": [
      {
        "text": "Talmud Bavli — Berajot",
        "ref": "Berakhot 26b:5",
        "reason": "«Abraham instituyó la tefilá de Shajarit, como está dicho: madrugó Abraham por la mañana al lugar donde había estado de pie; y amidá no es sino tefilá»."
      },
      {
        "text": "Torá — Bereshit",
        "ref": "Genesis 19:27",
        "reason": "El versículo-prueba: «madrugó Abraham por la mañana hacia el lugar donde había estado de pie ante el Eterno»."
      }
    ],
    "keywords": [
      "tefilá",
      "shajarit",
      "oración",
      "amidá",
      "patriarcas",
      "berajot 26b",
      "keviut",
      "sodoma"
    ]
  },
  // Avraham→Hajnasat Orjim — verificado por el Sofer (lote 1)
  "avraham→hajnasat-orjim": {
    "relationship_type": "practice",
    "directional_label": "Abraham es el arquetipo de la hospitalidad",
    "reverse_label": "Hajnasat Orjim aprende su medida de Abraham",
    "context_title": "Abraham y la hospitalidad (Hajnasat Orjim)",
    "short_explanation": "Génesis 18: al tercer día de su circuncisión, en pleno calor del día, Abraham corre desde la puerta de su tienda hacia tres desconocidos, les lava los pies y les sirve un banquete — mientras la Presencia divina lo estaba visitando. De su «no pases de largo de tu siervo» (18:3) Rav aprende: «más grande es recibir huéspedes que recibir el rostro de la Shejiná» (Shabat 127a) — Abraham dejó (por así decirlo) a Dios esperando para atender a tres caminantes. El Bahir llama a esa escena «gemilut jésed completa» (Bahir 135).",
    "study_prompt": "Estudiar Génesis 18:1-8 en relación con Abraham con enfoque en la audacia de Shabat 127a:13: ¿cómo puede el recibimiento de huéspedes ser MÁS grande que recibir la Shejiná? Leer los verbos de carrera del pasaje (vayar, vayarotz, vaymaher) como anatomía del jésed activo, y conectar con Sefer HaBahir 135: la hospitalidad como la práctica concreta por la que Abraham recibió la midat haJésed.",
    "source_refs": [
      {
        "text": "Torá — Bereshit",
        "ref": "Genesis 18:1-8",
        "reason": "La escena fundante: los tres hombres, la carrera, el agua, la sombra del árbol y el banquete."
      },
      {
        "text": "Talmud Bavli — Shabat",
        "ref": "Shabbat 127a:13",
        "reason": "Rav Yehudá en nombre de Rav: «más grande es la hajnasat orjim que recibir el rostro de la Shejiná, como está escrito: y dijo: Señor, si he hallado gracia ante tus ojos, no pases de largo» (Gén 18:3)."
      },
      {
        "text": "Sefer HaBahir",
        "ref": "Sefer HaBahir 135",
        "reason": "Describe la hospitalidad de Abraham («invitaba a todos los que venían al mundo... y salía a su encuentro») y la llama gemilut jésed completa, raíz de su midá."
      }
    ],
    "keywords": [
      "hajnasat orjim",
      "hospitalidad",
      "tres ángeles",
      "shejiná",
      "jésed activo",
      "génesis 18",
      "shabat 127a"
    ]
  },
  // Avraham→Birá Doleket — verificado por el Sofer (lote 1)
  "avraham→bira-doleket": {
    "relationship_type": "parable",
    "directional_label": "Abraham descubre al Dueño del palacio",
    "reverse_label": "La Birá Doleket es la parábola del despertar de Abraham",
    "context_title": "Abraham y el palacio iluminado (Birá Doleket)",
    "short_explanation": "El midrash que abre Lej Lejá (Bereshit Rabbá 39:1): un caminante ve una birá doleket — un palacio iluminado, o en llamas — y dice: «¿dirás que este palacio no tiene quien lo dirija?». El dueño se asoma: «yo soy el dueño del palacio». Así Abraham decía: «¿dirás que este mundo no tiene conductor?», y el Santo se asomó y le dijo: «Yo soy el dueño del mundo». Es la parábola clásica del descubrimiento de Dios por observación y asombro — ANTES de toda revelación. Nota de lectura: דּוֹלֶקֶת admite ambos sentidos en hebreo (encendida de luz o ardiendo en fuego), y cada sentido abre una teología distinta.",
    "study_prompt": "Estudiar Bereshit Rabbá 39:1 en relación con Abraham con el doble filo de la palabra doleket: (a) palacio ILUMINADO — el orden y la belleza del mundo delatan a su Dueño (vía del asombro); (b) palacio EN LLAMAS — la injusticia del mundo grita por su Dueño (vía de la protesta). Preguntar por qué el midrash coloca esta parábola justo antes de «Lej lejá»: el descubrimiento intelectual precede al llamado.",
    "source_refs": [
      {
        "text": "Midrash — Bereshit Rabbá",
        "ref": "Bereshit Rabbah 39:1",
        "reason": "La parábola completa de R. Yitzjak: el caminante, la birá doleket, el dueño que se asoma, y la aplicación explícita a Abraham."
      }
    ],
    "keywords": [
      "birá doleket",
      "palacio iluminado",
      "parábola",
      "bereshit rabbá 39",
      "descubrimiento de dios",
      "asombro",
      "lej lejá"
    ]
  },
  // Avraham→Merkavá — verificado por el Sofer (lote 1)
  "avraham→merkava": {
    "relationship_type": "concept",
    "directional_label": "Abraham es Merkavá — carroza de la Presencia",
    "reverse_label": "La Merkavá tiene en Abraham su forma humana",
    "context_title": "Abraham y la Merkavá (la Carroza divina)",
    "short_explanation": "Resh Lakish enseña: «Los patriarcas — ellos mismos son la Merkavá» (Bereshit Rabbá 82:6), y la prueba para Abraham es Génesis 17:22: «y subió Dios de sobre Abraham» — la Presencia se apoya y cabalga sobre el justo como un jinete sobre su carroza. Abraham no es un pasajero del mundo divino: es su vehículo. La idea es raíz de toda la mística posterior de la Merkavá: el cuerpo humano entregado puede ser el trono móvil de la Shejiná en la tierra.",
    "study_prompt": "Estudiar Bereshit Rabbá 82:6 en relación con Abraham con enfoque en el versículo-prueba (Génesis 17:22, «y subió Dios de sobre Abraham»): ¿qué significa que Dios esté SOBRE una persona como sobre una carroza? Contrastar la Merkavá de Yejezkel 1 (visión: el profeta VE la carroza) con la de los patriarcas (encarnación: el justo ES la carroza) — dos modos de relación con la misma estructura.",
    "source_refs": [
      {
        "text": "Midrash — Bereshit Rabbá",
        "ref": "Bereshit Rabbah 82:6",
        "reason": "Resh Lakish: «האבות הן הן המרכבה» — los patriarcas son la Merkavá; cita Génesis 17:22 como prueba para Abraham."
      },
      {
        "text": "Torá — Bereshit",
        "ref": "Genesis 17:22",
        "reason": "«Y subió Dios de sobre Abraham» — el versículo del que el midrash deriva que la Presencia 'cabalgaba' sobre Abraham."
      }
    ],
    "keywords": [
      "merkavá",
      "carroza",
      "patriarcas",
      "resh lakish",
      "shejiná",
      "bereshit rabbá 82",
      "yejezkel"
    ]
  },
  // Avraham→Sefer Yetzirá — verificado por el Sofer (lote 1)
  "avraham→sefer-yetzira": {
    "relationship_type": "textual_source",
    "directional_label": "Abraham es el primer maestro del Sefer Yetzirá (atribución tradicional)",
    "reverse_label": "El Sefer Yetzirá corona a Abraham como su practicante",
    "context_title": "Abraham y el Sefer Yetzirá (Libro de la Formación)",
    "short_explanation": "El capítulo final del Sefer Yetzirá culmina con Abraham: «cuando vino Abraham nuestro padre, contempló, miró, vio, investigó, entendió, grabó, talló, combinó y formó, y le subió en la mano; entonces se le reveló el Señor de todo, lo sentó en su regazo, lo besó en la cabeza y lo llamó 'mi amado'» (SY 6:4). De este pasaje nace la atribución tradicional del libro entero a Abraham. Honestidad del dato: es ATRIBUCIÓN TRADICIONAL — el texto es anónimo y su datación es discutida; lo verificable es que el libro MISMO presenta a Abraham como el primero que practicó su sabiduría y que el pacto selló esa revelación.",
    "study_prompt": "Estudiar Sefer Yetzirah 6:4 en relación con Abraham con enfoque en la cadena de verbos (tzafá, hibit, raá, jakar, hevín, jakak, jatzav, tzaraf, tzar): es un currículo completo de la contemplación creativa — del mirar al formar. Preguntar qué significa que la revelación («se le reveló el Señor de todo») llegue DESPUÉS del esfuerzo intelectual de Abraham y no antes, y conectar con la Birá Doleket (BR 39:1), donde el patrón es el mismo.",
    "source_refs": [
      {
        "text": "Sefer Yetzirá",
        "ref": "Sefer Yetzirah 6:4",
        "reason": "El pasaje final: Abraham contempla, investiga y forma; el Señor de todo se le revela, hace pacto con él y «ata 22 letras a su lengua». Base de la atribución tradicional."
      }
    ],
    "keywords": [
      "sefer yetzirá",
      "libro de la formación",
      "atribución tradicional",
      "contemplación",
      "tzeruf",
      "pacto",
      "cabalá temprana"
    ]
  },
  // Avraham→22 Letras — verificado por el Sofer (lote 1)
  "avraham→22-letras": {
    "relationship_type": "concept",
    "directional_label": "Abraham recibe las 22 letras atadas a su lengua",
    "reverse_label": "Las 22 letras encuentran en Abraham su primera lengua humana",
    "context_title": "Abraham y las veintidós letras",
    "short_explanation": "Tras el pacto doble, el Sefer Yetzirá concluye: «ató veintidós letras a su lengua y le reveló su fundamento (יסודן)» (SY 6:4). Las letras con las que —según el mismo libro— fue creado el mundo le son entregadas a Abraham como instrumento operativo: no como alfabeto para leer, sino como canales con los que se forma la realidad. Es el puente entre la cosmología de las letras y una vida humana concreta: la primera lengua que las porta anudadas es la de Abraham.",
    "study_prompt": "Estudiar Sefer Yetzirah 6:4 en relación con las 22 letras con enfoque en la imagen del NUDO: ¿qué significa que las letras estén «atadas a la lengua» (קשר... בלשונו) y no escritas en un libro? Conectar con el marco de Rav Yitzchak Ginsburgh (las letras como canales de consciencia creativa) y con el pacto de la lengua del mismo pasaje: el habla como instrumento del pacto.",
    "source_refs": [
      {
        "text": "Sefer Yetzirá",
        "ref": "Sefer Yetzirah 6:4",
        "reason": "«וקשר לו עשרים ושתים אותיות בלשונו וגלה לו את יסודן» — ató 22 letras a su lengua y le reveló su fundamento."
      }
    ],
    "keywords": [
      "22 letras",
      "otiyot",
      "lengua",
      "pacto de la lengua",
      "canales de consciencia",
      "ginsburgh",
      "sefer yetzirá"
    ]
  },
  // Avraham→Zohar — verificado por el Sofer (lote 1)
  "avraham→zohar": {
    "relationship_type": "textual_source",
    "directional_label": "Abraham protagoniza la parashá Lej Lejá del Zohar",
    "reverse_label": "El Zohar despliega su lectura del alma sobre Abraham",
    "context_title": "Abraham en el Zohar (Lej Lejá)",
    "short_explanation": "El Zohar dedica a Abraham la sección entera de Lej Lejá. La apertura verificada: R. Abba abre con Isaías 46:12 — «escuchadme, duros de corazón, los lejanos de la justicia» — los que ven los senderos de la Torá y no los miran; sobre ese fondo oscuro se recorta Abraham, el que sí escuchó y partió. En el Zohar, el viaje de Abraham es el material primario para su doctrina del alma que sale de sus límites hacia su raíz. Nota de honestidad: la célebre lectura «lej lejá = vete hacia ti mismo» aún no fue localizada con folio exacto en esta curaduría; no citarla con referencia hasta verificarla.",
    "study_prompt": "Estudiar la apertura de Zohar, Lech Lecha 1 en relación con Abraham con enfoque en el contraste que monta R. Abba: los «abirei lev» (duros de corazón) que ven y no miran, frente a Abraham que oye «vete» y va. Preguntar: ¿por qué el Zohar abre la parashá del primer viaje con un versículo sobre los que NO se mueven? El umbral del estudio: la diferencia entre ver y mirar.",
    "source_refs": [
      {
        "text": "Zohar",
        "ref": "Zohar, Lech Lecha 1",
        "reason": "Apertura de la sección de Abraham: R. Abba sobre Isaías 46:12, el contraste entre los duros de corazón y el que parte. Verificada la resolución y el contenido de la apertura."
      }
    ],
    "keywords": [
      "zohar",
      "lej lejá",
      "rabí abba",
      "viaje del alma",
      "abirei lev",
      "partida",
      "raíz del alma"
    ]
  },
  // Avraham→Guevurá — verificado por el Sofer (lote 1)
  "avraham→guevura": {
    "relationship_type": "sefirotic_attribute",
    "directional_label": "Abraham integra la Guevurá en la Akedá",
    "reverse_label": "La Guevurá se endulza al pasar por Abraham",
    "context_title": "Abraham y la sefirá de Guevurá — la midá opuesta",
    "short_explanation": "Conexión INTERPRETATIVA (drash/sod; así está marcada en el grafo: interp). El mapa clásico de midot NO asocia a Abraham con el rigor: su midá es Jésed, y Guevurá/Pajad es la midá de Yitzjak (Bahir 190; Pataj Eliyahu: Jésed brazo derecho, Guevurá brazo izquierdo). Sobre ese mapa, la lectura cabalística de la Akedá entiende la prueba como el cruce de los brazos: el hombre del amor ejecutando un decreto de rigor absoluto — y el «ahora sé que temes a Dios» (Génesis 22:12) sella que el temor (raíz de Guevurá) quedó integrado en el dueño del amor. Honestidad: NO citamos aquí un dictum con folio que diga «Abraham = Guevurá»; lo verificado es el mapa de midot y el evento. La síntesis «Guevurá endulzada en Jésed» es formulación interpretativa de la tradición cabalística, declarada como tal.",
    "study_prompt": "Estudiar Génesis 22:1-19 en relación con la sefirá de Guevurá con honestidad metodológica: primero fijar el mapa verificado (Abraham=Jésed, Yitzjak=Guevurá, según Sefer HaBahir 190 y el Pataj Eliyahu), y solo entonces preguntar qué le ocurre al hombre de Jésed cuando se le exige operar la midá opuesta. Leer «ahora sé que temes a Dios» (22:12) como certificado de la integración: yirá (temor) dentro de ahavá (amor). Marcar en todo momento qué es pshat, qué es mapa sefirótico recibido y qué es síntesis interpretativa.",
    "source_refs": [
      {
        "text": "Torá — Bereshit",
        "ref": "Genesis 22:1-19",
        "reason": "El evento: al arquetipo del jésed se le ordena el acto de rigor extremo; el pshat mismo crea la tensión entre las dos midot."
      },
      {
        "text": "Torá — Bereshit",
        "ref": "Genesis 22:12",
        "reason": "«Ahora sé que temes a Dios» — el temor (yirá, lado de Guevurá) queda acreditado precisamente en el hombre del amor."
      },
      {
        "text": "Sefer HaBahir",
        "ref": "Sefer HaBahir 190",
        "reason": "El reparto verificado de midot: Abraham tomó Jésed; Yitzjak tomó Guevurá (Pajad). Fija que Guevurá NO es la midá propia de Abraham — por eso esta conexión es de integración, no de identidad."
      },
      {
        "text": "Tikkunei Zohar (Pataj Eliyahu)",
        "ref": "Tikkunei Zohar 17a:16",
        "reason": "El marco de los dos brazos: «Jésed brazo derecho, Guevurá brazo izquierdo». No nombra a Abraham; aporta la estructura sobre la que se lee la Akedá."
      }
    ],
    "keywords": [
      "guevurá",
      "rigor",
      "din",
      "yirá",
      "akedá",
      "integración de midot",
      "drash",
      "dos filos",
      "endulzamiento"
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LOTE 2 del Sofer (2026-06-10) — 8 conexiones de Abraham, verificadas ref
  // por ref contra la API de Sefaria. Fuente: content/curaduria-edges-lote2.json.
  // Una entrega (Descensos→Avraham) es honesta: verificado:false (vínculo interp).
  // ══════════════════════════════════════════════════════════════════════════

  // Avraham→Neshamá
  "avraham→neshama": {
    "relationship_type": "concept",
    "directional_label": "Abraham «hace almas» — la conversión como creación",
    "reverse_label": "El alma (neshamá) se gana cuando Abraham acerca a una criatura",
    "context_title": "Abraham y el alma (Neshamá) — «las almas que hicieron en Jarán»",
    "short_explanation": "Antes de partir hacia Canaán, la Torá cuenta que Abram y Sarai llevaron consigo «el alma que hicieron en Jarán» (וְאֶת־הַנֶּפֶשׁ אֲשֶׁר־עָשׂוּ בְחָרָן, Génesis 12:5). El midrash se asombra del verbo: «si todos los habitantes del mundo se juntaran para crear un solo mosquito, no podrían insuflarle un alma — ¿y tú dices 'el alma que hicieron'?». La respuesta de Rabí Elazar bar Zimra: son los conversos que acercaron, «para enseñarte que quien acerca a una criatura y la convierte es como si la creara» (Bereshit Rabbah 39:14). Abraham no fabrica cuerpos: despierta almas. Acercar a otro a su raíz es, a los ojos del midrash, un acto de creación.",
    "study_prompt": "Estudiar Génesis 12:5 en relación con la Neshamá con enfoque en el escándalo del verbo עָשׂוּ («hicieron») aplicado a personas: leer la objeción de Bereshit Rabbah 39:14 (nadie puede insuflar alma ni a un mosquito) como límite de la creación humana, y la respuesta (quien convierte es como si creara) como su excepción. Preguntar: ¿qué significa «hacer un alma»? Distinguir entre crear nefesh ex nihilo (solo Dios) y revelar/despertar el alma que ya estaba (la obra de Abraham). Conectar con la Birá Doleket (Bereshit Rabbah 39:1): primero Abraham se despierta a sí mismo, luego despierta a otros.",
    "source_refs": [
      { "text": "Torá — Bereshit", "ref": "Genesis 12:5", "reason": "«וְאֶת־הַנֶּפֶשׁ אֲשֶׁר־עָשׂוּ בְחָרָן» — el alma que hicieron en Jarán; el verbo 'hacer' aplicado a personas que dispara todo el midrash." },
      { "text": "Midrash — Bereshit Rabá", "ref": "Bereshit Rabbah 39:14", "reason": "R. Elazar bar Zimra: nadie puede insuflar alma ni a un mosquito; son los conversos — 'quien acerca a una criatura y la convierte es como si la creara'. La conversión como acto cuasi-creador del alma." }
    ],
    "keywords": ["neshamá", "alma", "nefesh", "almas de jarán", "conversión", "guiur", "bereshit rabá 39", "génesis 12:5", "crear un alma"]
  },

  // Malki-Tzedek→Avraham
  "malki-tzedek→avraham": {
    "relationship_type": "event",
    "directional_label": "Malki-Tzédek bendice a Abraham con pan y vino",
    "reverse_label": "Abraham recibe la bendición del sacerdote de El Elyón y le da el diezmo",
    "context_title": "Malki-Tzédek y Abraham (Génesis 14) — el rey-sacerdote de Shalem",
    "short_explanation": "De regreso de la guerra de los reyes, Abram es recibido por una figura enigmática: «Malki-Tzédek, rey de Shalem, sacó pan y vino — y él era sacerdote de El Elyón (אֵל עֶלְיוֹן, Dios Altísimo)» (Génesis 14:18). Lo bendice: «bendito sea Abram por El Elyón, dueño de cielos y tierra» (14:19), y bendice también a Dios que entregó a sus enemigos; entonces «Abram le dio el diezmo de todo» (14:20). Es el único encuentro de Abraham con otro adorador del Dios único fuera de su casa: un rey cuyo nombre mismo significa «mi rey es justicia» y cuya ciudad, Shalem, lleva en sus letras la paz (shalom) y prefigura a Yerushalaim.",
    "study_prompt": "Estudiar Génesis 14:18-20 con enfoque en el pan y el vino del sacerdote: ¿qué clase de encuentro es este, donde el patriarca recibe bendición y entrega diezmo a un rey-sacerdote que no es de su linaje? Leer 'El Elyón, dueño de cielos y tierra' (14:19) y notar que Abraham adopta ese mismo nombre divino en su juramento al rey de Sodoma pocos versículos después (14:22). Preguntar por el significado de Shalem (paz / Yerushalaim) y por qué el primer sacerdocio de la Torá aparece antes del sacerdocio de Aharón.",
    "source_refs": [
      { "text": "Torá — Bereshit", "ref": "Genesis 14:18-20", "reason": "El encuentro completo: Malki-Tzédek rey de Shalem saca pan y vino, es sacerdote de El Elyón, bendice a Abram y a Dios, y Abram le da el diezmo de todo (מַעֲשֵׂר מִכֹּל)." }
    ],
    "keywords": ["malki-tzedek", "melquisedec", "pan y vino", "el elyón", "shalem", "diezmo", "maaser", "rey sacerdote", "génesis 14", "yerushalaim"]
  },

  // Avraham→Bereshit
  "avraham→bereshit": {
    "relationship_type": "textual_source",
    "directional_label": "Abraham vive y actúa dentro del libro de Bereshit",
    "reverse_label": "Bereshit es el libro que narra la vida de Abraham",
    "context_title": "Abraham en el libro de Bereshit (Génesis)",
    "short_explanation": "Abraham es una de las grandes figuras del libro de Bereshit (Génesis): su historia ocupa el arco que va de su genealogía y nacimiento (Génesis 11:26-32), pasando por el llamado «Lej Lejá» (12:1), el pacto entre las partes (15), el pacto de la milá (17), la hospitalidad y la intercesión por Sodoma (18), la Akedá (22), hasta su muerte y sepultura en la cueva de Majpelá (25:7-11). Es la arista más estructural del nodo: Abraham es personaje del primer libro de la Torá, y cada estudio suyo se ancla en algún versículo de Bereshit.",
    "study_prompt": "Recorrer el arco de Abraham dentro de Bereshit como una sola biografía: el llamado (Génesis 12), los pactos (15 y 17), las pruebas (de Ur a la Akedá), y el cierre en Majpelá (Génesis 25). Preguntar qué hace de Bereshit el libro de los comienzos también el libro de los patriarcas: la creación del mundo (caps. 1-11) desemboca en la creación de un pueblo a partir de un hombre (caps. 12-25). ¿Por qué la Torá pasa de lo cósmico-universal a lo familiar-particular justo en Abraham?",
    "source_refs": [
      { "text": "Torá — Bereshit", "ref": "Genesis 11:26-32", "reason": "Genealogía y nacimiento de Abram, su familia y la salida de Ur de los caldeos hacia Jarán: el punto de entrada del personaje en el libro." },
      { "text": "Torá — Bereshit", "ref": "Genesis 25:7-11", "reason": "Muerte de Abraham a los 175 años y su sepultura en la cueva de Majpelá: el cierre de su arco narrativo dentro de Bereshit." }
    ],
    "keywords": ["bereshit", "génesis", "lej lejá", "patriarca", "majpelá", "arco narrativo", "ur kasdim", "libro de los comienzos"]
  },

  // Avraham→Sará
  "avraham→sara": {
    "relationship_type": "relationship",
    "directional_label": "Abraham y Sará — esposos y compañeros en la obra de las almas",
    "reverse_label": "Sará es esposa de Abraham y maestra de las mujeres que él acerca",
    "context_title": "Abraham y Sará (Sarai)",
    "short_explanation": "«El nombre de la mujer de Abram era Sarai» (Génesis 11:29): el primer dato de la pareja, antes aún del llamado. Pero la tradición les da también una sociedad espiritual: sobre «el alma que hicieron en Jarán» (Génesis 12:5), Rav Huna enseña que «Abraham convertía a los hombres y Sará convertía a las mujeres» (Bereshit Rabbah 39:14). El plural del verbo עָשׂוּ («hicieron», no «hizo») se lee como la firma de los dos: la obra de acercar almas fue de la pareja, repartida por mitades — él a los hombres, ella a las mujeres.",
    "study_prompt": "Estudiar la relación Abraham–Sará a partir de Génesis 11:29 (la presentación de la pareja) y Bereshit Rabbah 39:14 (el reparto de la obra: Abraham a los hombres, Sará a las mujeres). Enfocar el plural gramatical de אֲשֶׁר עָשׂוּ en Génesis 12:5: ¿por qué el midrash insiste en que el verbo está en plural, y qué dice eso de la sociedad espiritual de los esposos?",
    "source_refs": [
      { "text": "Torá — Bereshit", "ref": "Genesis 11:29", "reason": "«שֵׁם אֵשֶׁת־אַבְרָם שָׂרָי» — la presentación de la pareja: el nombre de la esposa de Abram era Sarai." },
      { "text": "Midrash — Bereshit Rabá", "ref": "Bereshit Rabbah 39:14", "reason": "Rav Huna sobre el plural de 'hicieron': 'Abraham convertía a los hombres y Sará convertía a las mujeres' — la sociedad espiritual de los esposos en la obra de acercar almas." }
    ],
    "keywords": ["sará", "sarai", "matrimonio", "esposos", "obra de las almas", "rav huna", "bereshit rabá 39", "génesis 11:29", "conversión"]
  },

  // Avraham→Yitzjak
  "avraham→yitzjak": {
    "relationship_type": "relationship",
    "directional_label": "Abraham es el padre de Yitzjak",
    "reverse_label": "Yitzjak es el hijo de la promesa y de la prueba de Abraham",
    "context_title": "Abraham y Yitzjak — el hijo prometido",
    "short_explanation": "«Y concibió Sará y dio a luz a Abraham un hijo en su vejez, en el tiempo señalado del que Dios le había hablado; y Abraham llamó al hijo que le nació, que Sará le parió, Yitzjak» (Génesis 21:2-3). El nombre — de la raíz צחק, «reír» — recoge la risa con que ambos padres habían recibido el anuncio imposible. Pero la relación padre-hijo se define también por su segundo extremo: en Génesis 22, ese mismo hijo amado es el que Abraham lleva al monte Moriá. Yitzjak es a la vez el hijo de la promesa (cap. 21) y el hijo de la prueba (cap. 22).",
    "study_prompt": "Estudiar la relación Abraham–Yitzjak entre sus dos polos: el nacimiento (Génesis 21:1-3, el hijo de la vejez y de la risa) y la Akedá (Génesis 22, el hijo ofrecido). Preguntar por el nombre Yitzjak (de tzjok, reír): ¿por qué el hijo de la promesa lleva grabada la risa de la incredulidad de sus padres? Leer la paternidad de Abraham como el canal por el que el pacto desciende de una generación a la siguiente.",
    "source_refs": [
      { "text": "Torá — Bereshit", "ref": "Genesis 21:1-3", "reason": "Nacimiento de Yitzjak: Sará da a luz en la vejez de Abraham, y Abraham le pone el nombre Yitzjak. El polo de la promesa cumplida." },
      { "text": "Torá — Bereshit", "ref": "Genesis 22:1-2", "reason": "«Toma a tu hijo, a tu único, al que amas, a Yitzjak» — el inicio de la Akedá; define al hijo por la prueba." }
    ],
    "keywords": ["yitzjak", "isaac", "hijo de la promesa", "tzjok", "risa", "nacimiento", "akedá", "génesis 21", "paternidad", "descendencia"]
  },

  // Brit→Avraham
  "brit→avraham": {
    "relationship_type": "covenant",
    "directional_label": "El Pacto se corta con Abraham",
    "reverse_label": "Abraham es el primer hombre del pacto eterno",
    "context_title": "El Pacto (Brit) y Abraham — del corte entre las partes al pacto eterno",
    "short_explanation": "Abraham es el hombre con quien Dios «corta» (כָּרַת) el pacto. Dos veces: primero el Brit bein haBetarim, donde «en ese día YHVH cortó pacto con Abram» prometiéndole la tierra «desde el río de Egipto hasta el gran río Éufrates» (Génesis 15:18), tras la visión que comienza con «no temas, Abram, yo soy escudo para ti» (15:1). Y luego, a los noventa y nueve años, el pacto inscrito en la carne: «estableceré mi pacto entre Mí y ti» (17:2), un «pacto eterno (בְּרִית עוֹלָם)... para ser Dios para ti y para tu descendencia después de ti» (17:7). La palabra hebrea para hacer pacto es literalmente «cortar» — con Abraham, la alianza entre el Infinito y un hombre se vuelve una herida fundadora.",
    "study_prompt": "Estudiar el Brit en relación con Abraham por sus dos cortes: el pacto entre las partes (Génesis 15, la tierra, los animales partidos, la oscuridad y la antorcha de fuego) y el pacto de la milá (Génesis 17, la carne, el nombre nuevo, el 'pacto eterno'). Enfocar el verbo כָּרַת ('cortar') en Génesis 15:18: ¿por qué en hebreo un pacto no se 'hace' sino que se 'corta'? Leer brit olam (17:7) — pacto eterno que abarca a la descendencia — como el puente entre un individuo y un pueblo.",
    "source_refs": [
      { "text": "Torá — Bereshit", "ref": "Genesis 15:18", "reason": "«בַּיּוֹם הַהוּא כָּרַת יְהוָה אֶת־אַבְרָם בְּרִית» — en ese día YHVH cortó pacto con Abram: el Brit bein haBetarim." },
      { "text": "Torá — Bereshit", "ref": "Genesis 15:1", "reason": "«אַל־תִּירָא אַבְרָם אָנֹכִי מָגֵן לָךְ» — 'no temas, yo soy escudo para ti': la apertura de la visión del pacto entre las partes." },
      { "text": "Torá — Bereshit", "ref": "Genesis 17:2", "reason": "«וְאֶתְּנָה בְרִיתִי בֵּינִי וּבֵינֶךָ» — estableceré mi pacto entre Mí y ti: la fórmula del pacto de la milá." },
      { "text": "Torá — Bereshit", "ref": "Genesis 17:7", "reason": "«לִבְרִית עוֹלָם... לִהְיוֹת לְךָ לֵאלֹהִים וּלְזַרְעֲךָ» — pacto eterno, para ti y tu descendencia: el carácter perpetuo y generacional de la alianza." }
    ],
    "keywords": ["brit", "pacto", "karat brit", "cortar pacto", "brit bein habetarim", "pacto entre las partes", "brit olam", "pacto eterno", "génesis 15", "génesis 17"]
  },

  // Tres oraciones→Avraham
  "tres-oraciones→avraham": {
    "relationship_type": "practice",
    "directional_label": "De las tres oraciones, Abraham instituye Shajarit",
    "reverse_label": "Abraham es el patriarca de la oración de la mañana",
    "context_title": "Las tres oraciones y Abraham — la mañana (Shajarit)",
    "short_explanation": "El misterio de las Tres Oraciones enseña que las tres plegarias diarias fueron instituidas por los tres patriarcas: Abraham la de la mañana, Yitzjak la de la tarde, Yaakov la de la noche (Berajot 26b). A Abraham le toca Shajarit: «Abraham instituyó la oración de la mañana, como está dicho: madrugó Abraham por la mañana hacia el lugar donde había estado de pie (Génesis 19:27) — y no hay 'estar de pie' (עֲמִידָה) sino oración» (Berakhot 26b:5). El versículo es la mañana siguiente a la destrucción de Sodoma, en el mismo lugar donde Abraham había intercedido: la primera Shajarit nace de volver a presentarse, al amanecer, en el sitio de una plegaria cuyo desenlace fue humo que sube.",
    "study_prompt": "Estudiar Berakhot 26b:5 en relación con Abraham dentro del trío de las tres oraciones: ¿por qué a Abraham, el hombre del jésed y de la mañana, le corresponde Shajarit? Leer el detalle del pshat: Génesis 19:27 es la mañana DESPUÉS de Sodoma, en el lugar donde Abraham había 'estado de pie ante YHVH' (Génesis 18:22) intercediendo. Preguntar qué significa que la oración fija de la mañana se funde precisamente en una plegaria aparentemente no respondida.",
    "source_refs": [
      { "text": "Talmud Bavli — Berajot", "ref": "Berakhot 26b:5", "reason": "La baraita: 'Abraham instituyó la tefilá de Shajarit, como está dicho: madrugó Abraham por la mañana al lugar donde había estado de pie; y amidá no es sino tefilá'." },
      { "text": "Torá — Bereshit", "ref": "Genesis 19:27", "reason": "«madrugó Abraham por la mañana hacia el lugar donde había estado de pie ante el Eterno» — la mañana siguiente a Sodoma, el versículo-prueba." }
    ],
    "keywords": ["tres oraciones", "shajarit", "abraham", "patriarcas", "oración de la mañana", "amidá", "berajot 26b", "sodoma", "tefilá"]
  },

  // Descensos de la Shejiná→Avraham — entregado honesto: vínculo interpretativo
  "descensos-de-la-shejina→avraham": {
    "relationship_type": "concept",
    "directional_label": "Un descenso de la Shejiná ocurre en el episodio de Abraham (Sodoma)",
    "reverse_label": "Abraham acompaña el descenso de la Presencia sobre Sodoma",
    "context_title": "Los diez descensos de la Shejiná y Abraham (Sodoma) — vínculo interpretativo",
    "short_explanation": "El midrash de los diez descensos de la Shejiná está localizado y verificado: «Diez descensos descendió la Shejiná sobre el mundo» — incluyendo «en Sodoma» con el versículo «descenderé ahora y veré» (אֵרֲדָה נָּא וְאֶרְאֶה, Génesis 18:21) (Avot DeRabbi Natan 34:6). PERO el midrash ancla el descenso en la ciudad y su juicio, NO en la persona de Abraham. El vínculo con Abraham es contextual: ese versículo pertenece a la perícopa donde Abraham intercede (Génesis 18:22-33), y al versículo siguiente Abraham «aún estaba de pie ante YHVH» (18:22). La conexión es real pero indirecta — el midrash no dice que la Shejiná descendió 'por' o 'hacia' Abraham. Se presenta honesta como vínculo interpretativo.",
    "study_prompt": "Estudiar Avot DeRabbi Natan 34:6 (los diez descensos de la Shejiná) con honestidad metodológica sobre el lugar de Abraham: el tercer descenso es 'en Sodoma' (Génesis 18:21), versículo que abre el juicio de la ciudad y precede a la intercesión de Abraham (18:22-33). Preguntar: ¿es Abraham parte del descenso, o solo su testigo y contraparte humana? Distinguir con cuidado: el midrash habla del descenso DEL JUEZ sobre la ciudad; Abraham es quien, abajo, discute con ese Juez.",
    "source_refs": [
      { "text": "Avot DeRabbi Natan", "ref": "Avot DeRabbi Natan 34:6", "reason": "FOLIO VERIFICADO: los diez descensos de la Shejiná; el 3º es 'en Sodoma' citando Génesis 18:21. El midrash NO nombra a Abraham — ancla el descenso en la ciudad, no en la persona." },
      { "text": "Torá — Bereshit", "ref": "Genesis 18:21", "reason": "«אֵרֲדָה נָּא וְאֶרְאֶה» — 'descenderé ahora y veré': el versículo del descenso sobre Sodoma." },
      { "text": "Torá — Bereshit", "ref": "Genesis 18:22", "reason": "«וְאַבְרָהָם עוֹדֶנּוּ עֹמֵד לִפְנֵי יְהוָה» — 'y Abraham aún estaba de pie ante YHVH': el puente contextual que justifica la arista, declarado como drash." }
    ],
    "keywords": ["descensos de la shejiná", "diez descensos", "sodoma", "avot derabbi natan 34", "génesis 18", "intercesión", "vínculo interpretativo"],
    "needs_review": true
  },
};

// ── Lookup orientado ───────────────────────────────────────────────────────
// La curaduría se escribe en UNA dirección canónica; el grafo es no-dirigido.
// `getEdgeData(from, to)` encuentra la entrada en cualquiera de las dos
// direcciones y dice si quedó invertida (para elegir reverse_label).
export type OrientedEdgeData = {
  data: EdgeData;
  reversed: boolean; // true = la entrada está escrita en la dirección contraria
  key: string;       // clave canónica bajo la que vive la entrada
};

export function getEdgeData(fromId: string, toId: string): OrientedEdgeData | null {
  const k1 = edgeDataKey(fromId, toId);
  const d1 = EDGE_DATA[k1];
  if (d1) return { data: d1, reversed: false, key: k1 };
  const k2 = edgeDataKey(toId, fromId);
  const d2 = EDGE_DATA[k2];
  if (d2) return { data: d2, reversed: true, key: k2 };
  return null;
}

export function isEdgeCurated(aId: string, bId: string): boolean {
  return getEdgeData(aId, bId) !== null;
}

// Rótulo direccional correcto para el viaje from→to (cae al otro si falta).
export function directionalLabelFor(o: OrientedEdgeData): string {
  return o.reversed
    ? o.data.reverse_label || o.data.directional_label
    : o.data.directional_label || o.data.reverse_label;
}
