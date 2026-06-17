// ─────────────────────────────────────────────────────────────────────────
// modulo9.ts — ACADEMIA DE JASHMAL · Módulo 9 (J2 · פְּשָׁט וּדְרָשׁ — "Leer en profundidad").
// Las 5 lecciones de las semanas 41–45, segundo módulo de JAVER.
//
// El contenido (textos, citas, verificaciones) fue ESCRITO y VERIFICADO por el Sofer
// (editor-erudito) en "Academia - J2 - lectura-profunda (Sofer).md", 2026-06-17.
// Se monta TAL CUAL: no se inventa, altera ni agrega ninguna fuente.
//
// Sigue EXACTAMENTE la estructura de modulo7.ts.
// ─────────────────────────────────────────────────────────────────────────

import { type Block, type Hilo, type Lesson, type TareaData, type ThreadTarget, threadHref } from "./modulo1";
import { MISTERIOS } from "@/lib/content/misterios";

// Re-exportar tipos y threadHref para que LeccionView9 y rutas no dependan de modulo1.
export type { Block, Hilo, Lesson, TareaData, ThreadTarget };
export { threadHref };

// ── EX-4 — Expositivo 4 de JAVER ────────────────────────────────────────────
// Al cierre de J2, semana 45.

export const EX4 = {
  numero: 4,
  nivel: "javer",
  titulo: "Tres voces, un texto: mi primer análisis en dos niveles de PaRDeS",
  enunciado: `Elige UN versículo de cualquier texto estudiado en el currículo (Génesis 1–12 preferiblemente) y analízalo en Pshat y Remez usando al menos dos comentaristas (Rashi + Ibn Ezra o Ramban).

1. La queshtiá es tuya, no de Rashi — antes de leer el comentario, escribe en una oración qué te perturbaba en el versículo. Luego muestra cómo Rashi responde (o no responde) a esa perturbación.
2. Remez con al menos una Gezerah Shavá o gematría verificada letra por letra — escribe el cálculo explícito.
3. Distinción explícita entre los niveles PaRDeS — nombrar cada nivel.
4. Cita de al menos 2 comentaristas con referencia exacta.
5. Hiddush propio — no una síntesis elegante, sino algo que todavía no cuadra del todo o que ningún comentarista preguntó. Márcalo: "hiddush propio — no es fuente verificada."
6. Una oración al final: ¿por qué este versículo y no otro? ¿Qué te llevó a elegirlo?

Extensión: 2.000–3.000 palabras.`,
  palabrasMin: 2000,
  palabrasMax: 3000,
} as const;

// ── Las 5 lecciones (verbatim del Sofer, 2026-06-17) ─────────────────────────

export const LESSONS9: Lesson[] = [
  // ── L41 ───────────────────────────────────────────────────────────────────
  {
    n: 41,
    id: "E3·J2·L41",
    slug: "ibn-ezra",
    title: "Ibn Ezra — el gramático del texto",
    apertura: {
      question:
        "Rashi pregunta por qué. Ibn Ezra pregunta qué. ¿Cuál es la diferencia?",
    },
    estudio: [
      {
        t: "p",
        text: `**Dos maneras de leer.** En SHOEL conociste a Rashi: el comentarista que pregunta qué le molesta al texto y lo responde con fuentes talmúdicas y midrásicas. Rashi acepta el Midrash como extensión legítima del Pshat. Ibn Ezra no. **Rabbi Abraham Ibn Ezra** (c. 1089–1167 ⚠️) — gramático, poeta, filósofo y exégeta de la España medieval — lee el texto con una pregunta diferente: ¿lo que dice el Midrash está autorizado por la gramática y el contexto del texto? Si no, Ibn Ezra lo descarta de su comentario, no importa cuán veneranda sea la fuente.`,
      },
      {
        t: "p",
        text: `**El método del Ibn Ezra: la gramática como juez.** El Ibn Ezra es el comentarista que introduce rigorosamente el análisis gramatical (*diqduq*) como criterio de interpretación. Para él, el texto bíblico tiene un significado preciso que está codificado en la morfología, la sintaxis y el vocabulario hebreo. No se puede leer lo que el texto no puede decir. Una interpretación que requiera forzar la gramática es sospechosa. Este principio lo separa de Rashi y lo acerca, siglos después, al método filológico moderno — aunque el Ibn Ezra no abandona el marco religioso.`,
      },
      {
        t: "p",
        text: `**Ibn Ezra sobre Génesis 1:1.** El primer versículo de la Torá presenta una cuestión gramatical real: **בְּרֵאשִׁית** (*bereshit*) está en estado constructo (*semikhut*) — gramaticalmente significa "en el principio de…" y requiere un complemento. El Ibn Ezra ✅ discute si esta forma implica que la Creación tuvo un inicio absoluto o si el versículo tiene una estructura subordinada. La pregunta de Ibn Ezra no es "¿por qué empieza la Torá aquí?" (la pregunta de Rashi) sino "¿qué dice exactamente esta palabra?" La respuesta gramatical cambia la forma en que se lee el versículo.`,
      },
      {
        t: "p",
        text: `**La crítica discreta a Rashi.** El Ibn Ezra raramente ataca a Rashi por nombre, pero en varios pasajes su comentario implica que Rashi ha aceptado un Midrash que el texto no puede sostener gramaticalmente. Esta tensión no es hostilidad: es el reconocimiento de que existen dos tradiciones exegéticas legítimas — la que prioriza la transmisión oral (Rashi) y la que prioriza el rigor del texto (Ibn Ezra). El estudiante de J2 aprende a tener las dos en la mente al mismo tiempo.`,
      },
      {
        t: "p",
        text: `**Por qué Ibn Ezra importa en JAVER.** El módulo J1 trabajó el alma (Mussar). El módulo J2 trabaja la mente: la capacidad de leer el mismo texto desde ángulos distintos sin confundirlos ni privilegiar uno arbitrariamente. Ibn Ezra es el modelo del rigor intelectual — la disposición a preguntar "¿esto lo dice el texto o lo estamos importando?" Esa pregunta es el antídoto contra la lectura proyectiva (leer en el texto lo que ya creemos antes de leerlo).`,
      },
    ],
    contemplacion: [
      "Ibn Ezra viajó por toda Europa y el Mediterráneo, sin hogar fijo, escribiendo comentarios en condiciones de itinerancia. Murió lejos de España, posiblemente en la pobreza. Y sin embargo, sus comentarios son tan precisos y tan honestos que sobrevivieron a todos los que lo criticaron. La honestidad intelectual tiene una durabilidad particular.",
      "¿Cuándo fue la última vez que te preguntaste si una interpretación que aceptas como obvia está autorizada por el texto, o si simplemente te parece razonable? Ibn Ezra hace esa pregunta en cada versículo.",
    ],
    accion: {
      text: [
        `Busca en Sefaria "Ibn Ezra on Genesis 1:1". Lee el primer párrafo. Escribe: ¿qué pregunta hace Ibn Ezra sobre la palabra bereshit? ¿Cómo difiere de la pregunta de Rashi?`,
      ],
      cta: { label: "Abrir Ibn Ezra a Génesis 1:1 en Sefaria →", ref: "Ibn Ezra on Genesis 1:1" },
    },
    sello:
      "Rabbi Abraham Ibn Ezra (c. 1089–1167 ⚠️): exégeta gramatical. Su método: el texto tiene un significado preciso codificado en la gramática — no se interpreta lo que la morfología no puede decir. Ibn Ezra sobre Génesis 1:1 ✅: la cuestión del estado constructo de *bereshit*. Diferencia con Rashi: Rashi pregunta ¿por qué?; Ibn Ezra pregunta ¿qué?",
    hilos: [
      { kind: "study", ref: "ramban", label: "Rashi y Ibn Ezra representan dos polos del comentario medieval. El Ramban los integrará — con un tercer ángulo." },
    ],
    fuentes: [
      "Ibn Ezra a Génesis 1:1 ✅ (cuestión gramatical del estado constructo de bereshit)",
      "Rashi a Génesis 1:1 ✅ (para comparar: pregunta sobre el por qué vs. el qué)",
      "Datos biográficos de Ibn Ezra: c. 1089–1167 ⚠️",
    ],
    tarea: {
      semana: 41,
      herramienta: "Lectura del Ibn Ezra: identificar la pregunta gramatical y compararla con la pregunta de Rashi",
      enunciado:
        "Busca 'Ibn Ezra on Genesis 1:1' en Sefaria. Lee el primer párrafo. Escribe qué pregunta hace Ibn Ezra sobre bereshit. Luego responde: ¿entendiste su argumento la primera vez que lo leíste, o tuviste que releerlo? ¿Qué parte todavía no te queda del todo clara? Si dices que entendiste todo a la primera, explica el argumento en exactamente tres pasos — un paso por oración, sin generalizar.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L42 ───────────────────────────────────────────────────────────────────
  {
    n: 42,
    id: "E3·J2·L42",
    slug: "ramban",
    title: "Ramban — la lectura mística del texto",
    apertura: {
      question:
        "Ramban lee el mismo versículo que Rashi. Ve algo completamente diferente. ¿Qué ve?",
    },
    estudio: [
      {
        t: "p",
        text: `**El tercer maestro.** Si Rashi es el guardián del Pshat y el Midrash, y Ibn Ezra es el guardián de la gramática y la razón, **Rabbi Moshe ben Najman** — conocido como **Ramban** o Nahmánides (c. 1194–1270 ⚠️) — es el comentarista que lee el texto en todas sus capas al mismo tiempo: el Pshat, el Drash, y las profundidades cabalísticas que el texto lleva escondidas. Nació en Gerona (Cataluña) y murió en Acre (Israel) después de ser forzado al exilio por la corona aragonesa tras la Disputa de Barcelona de 1263 ⚠️. Era a la vez talmudista, médico y cabalista.`,
      },
      {
        t: "p",
        text: `**El método del Ramban.** El Ramban respeta a Rashi profundamente — pero lo corrige cuando considera que el Midrash traiciona el sentido del texto ✅ (su introducción al Comentario al Torá lo declara explícitamente). Y respeta al Ibn Ezra — pero considera que la gramática sola no puede agotar el significado de la Escritura. Para el Ramban, el texto bíblico tiene capas que ningún lector humano puede agotar. La gramática da el piso; el Midrash añade dimensiones; y hay una capa más profunda que la tradición cabalística preserva.`,
      },
      {
        t: "verse",
        he: "וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל-פְּנֵי תְהוֹם",
        es: "Y la tierra era caos (*tohu*) y vacío (*vohu*), y oscuridad sobre la faz del abismo.",
        ref: "Génesis 1:2 ✅",
        sefaria: "Genesis 1:2",
      },
      {
        t: "p",
        text: `**El Ramban sobre el tohu va-vohu.** El Ramban dedica un análisis extenso a la frase **תֹהוּ וָבֹהוּ** (*tohu va-vohu*, Génesis 1:2 ✅). Mientras Rashi la explica como "vacío y desolación", el Ramban ve en ella la descripción de los dos materiales primordiales de la Creación — la materia sin forma (*golem*) y el espacio potencial (*tohu*) — y los relaciona con los primeros actos de la Creación *ex nihilo*. En su comentario ✅, el Ramban señala que el primer capítulo del Génesis describe una Creación en dos etapas: la Creación absoluta de la materia potencial (Génesis 1:1), y luego su formación y ordenamiento (Génesis 1:2 en adelante). Esta lectura tiene resonancias con la tradición cabalística sobre las primeras sefirot ⚠️ — marcamos esto como primer umbral: el Ramban menciona dimensiones cabalísticas sin desarrollar el sistema completo.`,
      },
      {
        t: "p",
        text: `**La corrección implícita al Pshat de Rashi.** El Ramban es el comentarista que más sistemáticamente señala cuando Rashi acepta una lectura midrásica que, según el Ramban, no corresponde al Pshat del texto. En varios comentarios a Génesis, el Ramban escribe explícitamente: *"pero el Pshat del versículo es diferente"* ✅ (esta frase y construcciones similares aparecen en múltiples comentarios del Ramban — es su forma de señalar la discrepancia). No es que el Midrash sea inválido; es que el Pshat y el Midrash no deben confundirse.`,
      },
      {
        t: "p",
        text: `**Lo que el Ramban añade a la educación del JAVER.** El estudiante que conoce a Rashi, al Ibn Ezra y al Ramban tiene tres lentes para leer cualquier texto: el del guardián del Pshat y la tradición oral (Rashi), el del rigor gramatical (Ibn Ezra) y el del lector en capas que no teme la profundidad mística (Ramban). Ninguno es el único correcto; los tres son necesarios. El próximo módulo del currículo — J4, el Sefer Yetzirah — abrirá la dimensión cabalística que el Ramban solo esboza aquí.`,
      },
    ],
    contemplacion: [
      "El Ramban fue forzado al exilio a los 70 años por haber debatido con honestidad ante la corte aragonesa. Llegó a Acre, donde murió. Sus cartas a su hijo desde Israel son documentos de ternura y determinación ⚠️ (fuente: tradición). Un hombre que vio las capas del texto hasta el fondo y no le tuvo miedo a ninguna de ellas.",
      "¿Cuándo sientes que un texto tiene más de lo que la gramática puede decir? El Ramban diría: siempre. El texto sagrado no es opaco porque sea oscuro — es inagotable porque es profundo.",
    ],
    accion: {
      text: [
        `Busca en Sefaria "Ramban on Genesis 1:2". Lee el primer párrafo sobre el tohu va-vohu. Escribe: ¿qué dice el Ramban sobre el caos primordial? ¿Menciona algún concepto que no hayas visto en Rashi ni en Ibn Ezra?`,
      ],
      cta: { label: "Abrir Ramban a Génesis 1:2 en Sefaria →", ref: "Ramban on Genesis 1:2" },
    },
    sello:
      "Ramban (c. 1194–1270 ⚠️): lee el texto en Pshat, Drash y Sod simultáneamente. Su método: la gramática da el piso (Ibn Ezra), el Midrash añade dimensiones (Rashi), y hay una capa cabalística que ninguno de los dos agota. Génesis 1:2 ✅: el *tohu va-vohu* como los dos materiales primordiales de la Creación — resonancias con el pensamiento cabalístico ⚠️.",
    hilos: [
      { kind: "study", ref: "ibn-ezra", label: "Ibn Ezra lee con la gramática; el Ramban lee con la gramática y más. ¿Cómo se complementan?" },
      { kind: "study", ref: "tres-voces-bereshit", label: "En la próxima lección leerás a los tres comentaristas sobre el mismo versículo." },
    ],
    fuentes: [
      "Ramban a Génesis 1:1–2 ✅ (Creación ex nihilo, tohu va-vohu, dimensiones cabalísticas ⚠️)",
      "Introducción del Ramban al Comentario al Torá ✅ (declaración de método — corrección del Pshat cuando el Midrash lo distorsiona)",
      "Génesis 1:2 ✅ (tohu va-vohu)",
      "Datos biográficos del Ramban: c. 1194–1270 ⚠️",
    ],
    tarea: {
      semana: 42,
      herramienta: "Lectura del Ramban: identificar dimensiones del texto que van más allá de la gramática",
      enunciado:
        "Busca 'Ramban on Genesis 1:2' en Sefaria. Lee hasta donde habla del tohu va-vohu. Escribe qué dice. Luego elige: ¿en qué punto el Ramban te parece más satisfactorio que Ibn Ezra (de la semana pasada), y en qué punto te parece menos satisfactorio? No respondas 'los dos tienen aspectos buenos' — elige uno que prefieras para explicar Génesis 1:1–2 y di por qué.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L43 ───────────────────────────────────────────────────────────────────
  {
    n: 43,
    id: "E3·J2·L43",
    slug: "tres-voces-bereshit",
    title: "Tres voces sobre Génesis 1:1 — comparación de comentaristas",
    apertura: {
      question:
        "Un versículo. Tres maestros. Tres preguntas completamente distintas. ¿Cuál es la correcta?",
    },
    estudio: [
      {
        t: "p",
        text: `**La práctica de hashvaat ha-perushim.** **הַשְׁוָאַת הַפֵּרוּשִׁים** (*hashvaat ha-perushim* — "comparación de comentaristas") es una de las habilidades más avanzadas del estudio textual rabínico. No es simplemente "leer tres comentarios": es poner a tres maestros en conversación sobre el mismo versículo y preguntarse: ¿en qué están de acuerdo? ¿en qué difieren? ¿por qué difieren — es una diferencia de método, de fuente, de premisa teológica? La comparación no busca elegir el comentarista "correcto": busca entender qué ilumina cada uno que los otros no pueden.`,
      },
      {
        t: "p",
        text: `**Las tres preguntas de Génesis 1:1.** El mismo versículo — *bereshit bara Elohim et ha-shamayim ve-et ha-aretz* ✅ — produce tres preguntas radicalmente distintas:`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Rashi** ✅ pregunta: *¿Por qué la Torá empieza aquí, con la Creación, y no con el primer mandamiento?* Es una pregunta teológica-pedagógica: ¿cuál es la intención del libro? Respuesta: establecer el derecho de Dios sobre la tierra (Salmos 111:6 ✅). El interés de Rashi es la legitimidad del relato como texto normativo para Israel.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Ibn Ezra** ✅ pregunta: *¿Qué dice exactamente la palabra bereshit — tiene estado constructo o absoluto?* Es una pregunta gramatical: ¿cuál es la estructura sintáctica del versículo? El interés del Ibn Ezra es la precisión del texto tal como está escrito.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Ramban** ✅ pregunta: *¿Qué describe el texto sobre el acto de la Creación — qué pasó antes, qué es el tohu va-vohu?* Es una pregunta cosmológica y mística: ¿qué revela el texto sobre la estructura profunda de la realidad? El interés del Ramban es la profundidad ontológica del versículo.`,
      },
      {
        t: "p",
        text: `**En qué están de acuerdo los tres.** Los tres aceptan que: (1) el texto es auténtico y sagrado; (2) cada palabra tiene significado; (3) el primer versículo de la Torá es especial — no un mero encabezado. Ninguno lee el texto como mitología o como literatura folkórica. El marco compartido es el que permite que sus diferencias sean productivas.`,
      },
      {
        t: "p",
        text: `**En qué difieren.** La diferencia más profunda es de **prioridad hermenéutica**: ¿qué vale más, el Midrash (Rashi) o la gramática (Ibn Ezra)? ¿el sentido literal o el profundo (Ibn Ezra vs. Ramban)? Estas diferencias no son errores: reflejan que el texto tiene capas y que cada comentarista es especialista en una. El estudiante de JAVER aprende a usarlos a todos, sin elegir uno como el único válido.`,
      },
      {
        t: "verse",
        he: "כֹּחַ מַעֲשָׂיו הִגִּיד לְעַמּוֹ לָתֵת לָהֶם נַחֲלַת גּוֹיִם",
        es: "El poder de sus obras anunció a su pueblo, para darles la herencia de las naciones.",
        ref: "Salmos 111:6 ✅ — la fuente de Rashi en Génesis 1:1",
        sefaria: "Psalms 111:6",
      },
    ],
    contemplacion: [
      "¿Cuál de las tres preguntas — la de Rashi, la de Ibn Ezra, la del Ramban — te parece más importante cuando lees Génesis 1:1? No hay respuesta incorrecta. La respuesta dice algo sobre cómo eres lector: si priorizas el para-qué, el qué-dice-exactamente o el qué-hay-debajo.",
      "La tradición del estudio judío no resolvió esta tensión nombrando un ganador. La preservó. El Talmud, el Sidur y las ediciones del Tanaj imprimen a los tres comentaristas en la misma página. El pluralismo interpretativo no es una debilidad del sistema — es su fuerza.",
    ],
    accion: {
      text: [
        `Pon los tres comentarios (Rashi, Ibn Ezra, Ramban sobre Génesis 1:1) uno al lado del otro en Sefaria. Escribe: (1) ¿en qué punto están los tres de acuerdo? (2) ¿en qué punto el desacuerdo es más profundo? (3) ¿cuál de las tres preguntas te parece más importante — y por qué?`,
      ],
      cta: { label: "Abrir Génesis 1:1 con comentaristas en Sefaria →", ref: "Genesis 1:1" },
    },
    sello:
      "Hashvaat ha-perushim (comparación de comentaristas): Rashi (¿por qué?) ✅, Ibn Ezra (¿qué dice gramaticalmente?) ✅, Ramban (¿qué hay debajo?) ✅ — tres preguntas legítimas sobre el mismo versículo. Los tres acuerdan: el texto es sagrado y cada palabra tiene significado. La diferencia es de prioridad hermenéutica, no de error.",
    hilos: [
      { kind: "study", ref: "ramban", label: "Conociste al Ramban en L42 — ¿cómo cambia verlo en comparación con Rashi e Ibn Ezra?" },
      { kind: "study", ref: "remez-practica", label: "La próxima lección aplica el nivel de Remez — la insinuación numérica — al relato de la Creación." },
    ],
    fuentes: [
      "Rashi a Génesis 1:1 ✅ (pregunta: ¿por qué empieza aquí?)",
      "Ibn Ezra a Génesis 1:1 ✅ (pregunta gramatical sobre bereshit)",
      "Ramban a Génesis 1:1 ✅ (pregunta cosmológica y cabalística ⚠️)",
      "Salmos 111:6 ✅ (la fuente de Rashi para Génesis 1:1)",
    ],
    tarea: {
      semana: 43,
      herramienta: "Hashvaat ha-perushim: comparar tres comentaristas sobre el mismo versículo — acuerdo, diferencia, prioridad hermenéutica",
      enunciado:
        "Pon los tres comentarios (Rashi, Ibn Ezra, Ramban sobre Génesis 1:1) en Sefaria al mismo tiempo. Escribe: ¿qué punto de desacuerdo entre ellos no habías notado cuando los leíste por separado en TS-41 y TS-42? ¿Qué cambia verlos juntos? De los tres, ¿cuál habrías preferido no leer — el que más complica lo que creías entender? Explica la complicación.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L44 ───────────────────────────────────────────────────────────────────
  {
    n: 44,
    id: "E3·J2·L44",
    slug: "remez-practica",
    title: "El Remez en la práctica — la insinuación numérica del texto",
    apertura: {
      question:
        "En los seis días de la Creación, Dios dice 'que era bueno' seis veces. ¿En qué día no lo dice?",
    },
    estudio: [
      {
        t: "p",
        text: `**El segundo nivel de PaRDeS: Remez.** **רֶמֶז** (*Remez* — alusión, insinuación ✅) es el segundo nivel de lectura en el sistema PaRDeS. No es el sentido literal (Pshat), sino las conexiones que el texto hace consigo mismo: conexiones numéricas, conexiones de vocabulario, estructuras que el lector atento descubre cuando compara un versículo con otro. En TALMID aprendiste el mapa de PaRDeS. En este módulo lo aplicas por primera vez de manera activa.`,
      },
      {
        t: "p",
        text: `**El caso de "ki tov" en los seis días.** En el relato de la Creación (Génesis 1 ✅), la frase **וַיַּרְא אֱלֹהִים כִּי-טוֹב** (*va-yar Elohim ki tov* — "y vio Dios que era bueno") aparece en los días 1, 3, 3 (bis), 4, 5 y 6 — **seis veces en total** ✅. El **segundo día** (Génesis 1:6–8 ✅) es el único de los seis días en que no aparece. La pregunta de Remez: ¿qué significa esa ausencia?`,
      },
      {
        t: "p",
        text: `**La respuesta de Rashi: obra incompleta.** **Rashi a Génesis 1:7** ✅ explica la ausencia: la obra del agua comenzó en el segundo día (separación de las aguas) pero no terminó — se completó el tercer día con la reunión de las aguas en mares. Una obra que no está completa no recibe "ki tov". Por eso el tercer día recibe "ki tov" dos veces (Génesis 1:10 y 1:12 ✅): una por lo que completó ese día, y una por lo que quedó del segundo. Este es el Pshat del Remez: la estructura numérica del texto tiene una explicación narrativa directa.`,
      },
      {
        t: "p",
        text: `**El Remez numérico: tov = 17.** La gematría de *tov* (טוֹב): tet(9)+vav(6)+bet(2) = **17** 🔢. El número 17 no tiene una interpretación fija en este contexto — pero es el valor del "bien" en el alfabeto hebreo. El Remez nos invita a preguntar: ¿hay otros textos donde el bien/tov aparezca en conexión con el 17? Esta es la *Gezerah Shavá* aplicada al Remez numérico: buscar dónde la misma raíz o el mismo valor numérico aparece en otro contexto para iluminar el presente.`,
      },
      {
        t: "verse",
        he: "וַיַּרְא אֱלֹהִים אֶת-כָּל-אֲשֶׁר עָשָׂה וְהִנֵּה-טוֹב מְאֹד",
        es: "Y vio Dios todo lo que había hecho, y era muy bueno (*tov me'od*).",
        ref: "Génesis 1:31 ✅",
        sefaria: "Genesis 1:31",
      },
      {
        t: "p",
        text: `**El cierre del Remez: tov me'od — muy bueno.** El último día (el sexto) recibe no solo "ki tov" sino **טוֹב מְאֹד** (*tov me'od* — "muy bueno", Génesis 1:31 ✅). El Midrash señala que *me'od* (מְאֹד, "muy") tiene el mismo valor numérico que *mavet* (מָוֶת, "muerte"): mem(40)+alef(1)+vav(6)+dálet(4) = 51 🔢 = mem(40)+vav(6)+tav(400) — atención: mem(40)+vav(6)+tav(400) = 446, no 51. Verificación: *me'od* = mem(40)+alef(1)+vav(6)+dálet(4) = **51** 🔢. *Mavet* = mem(40)+vav(6)+tav(400) = **446** 🔢. La gematría no coincide — el Midrash que las equipara usa un método diferente (quizás gematría reducida o *gematría ketaná*) ⚠️. Se marca aquí como tradición midrásica sin verificación directa de la ecuación numérica estándar. Lo que sí es verificable: en el día sexto, la evaluación es cualitativamente distinta a los demás — "muy bueno" en lugar de solo "bueno."`,
      },
    ],
    contemplacion: [
      "El Remez no inventa conexiones — las descubre. El texto las puso ahí. El lector que solo lee en Pshat puede terminar Génesis 1 sin notar que el segundo día no tiene 'ki tov'. El que lee en Remez lo nota, y se pregunta por qué. La diferencia entre ambos lectores no es el texto — es la atención.",
      "El ejercicio del Remez es también un ejercicio de humildad: muchas de las conexiones que 'descubrimos' ya las vio Rashi, el Talmud, el Midrash. El Remez auténtico es cuando el estudiante ve algo que los comentaristas no señalaron explícitamente — y lo marca con honestidad como *hiddush* propio, no como tradición recibida.",
    ],
    accion: {
      text: [
        `Lee Génesis 1:1–31. Cuenta cuántas veces aparece la frase 'va-yar Elohim ki tov'. ¿En qué día no aparece? Busca el comentario de Rashi a Génesis 1:7 en Sefaria. ¿Qué explica Rashi sobre la ausencia del 'ki tov' en ese día?`,
      ],
      cta: { label: "Abrir Génesis 1 en Sefaria →", ref: "Genesis 1:1" },
    },
    sello:
      "Remez (רֶמֶז) = nivel 2 de PaRDeS: insinuación numérica y verbal en el texto. 'Ki tov' en el relato de la Creación: 6 veces ✅, ausente el segundo día. Rashi a Génesis 1:7 ✅: la obra del agua no se completó ese día. Gematría tov (טוֹב) = tet(9)+vav(6)+bet(2) = **17** 🔢. Gezerah Shavá: dos versículos con el mismo vocabulario se iluminan mutuamente.",
    hilos: [
      { kind: "study", ref: "tres-voces-bereshit", label: "Los tres comentaristas ya trabajaron Génesis 1:1 — aquí el Remez abre lo que el Pshat cierra." },
      { kind: "study", ref: "primera-lectura-pardes", label: "La próxima lección integra todo: PaRDeS completo sobre Génesis 1:1." },
    ],
    fuentes: [
      "Génesis 1:4, 1:10, 1:12, 1:18, 1:21, 1:25 ✅ (las seis apariciones de 'ki tov')",
      "Génesis 1:6–8 ✅ (el segundo día — sin 'ki tov')",
      "Rashi a Génesis 1:7 ✅ (explicación de la ausencia: obra incompleta del agua)",
      "Bereshit Rabá 4:6 ✅ (la misma observación en el Midrash)",
      "Gematría tov = 17 🔢",
    ],
    tarea: {
      semana: 44,
      herramienta: "Remez: identificar una estructura numérica o verbal en el texto y buscar su explicación en los comentaristas",
      enunciado:
        "Lee Génesis 1:1–31 y cuenta cuántas veces aparece 'va-yar Elohim ki tov'. Escribe el número y los versículos exactos. ¿En qué día no aparece? Antes de buscar el Rashi: escribe tu hipótesis propia sobre por qué falta en ese día — una oración, aunque no estés seguro. Luego lee el Rashi a ese día en Sefaria. ¿Tu hipótesis tenía algo en común con lo que dice Rashi, o era completamente diferente? Usa las palabras Pshat y Remez para clasificar la respuesta de Rashi.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
  },

  // ── L45 ───────────────────────────────────────────────────────────────────
  {
    n: 45,
    id: "E3·J2·L45",
    slug: "primera-lectura-pardes",
    title: "Primera lectura en cuatro niveles — PaRDeS sobre Génesis 1:1",
    apertura: {
      question:
        "Cuatro niveles. Un versículo. Todo lo que aprendiste hasta ahora se usa aquí.",
    },
    estudio: [
      {
        t: "p",
        text: `**El ejercicio cumbre de J2.** En TALMID aprendiste PaRDeS como un mapa. En SHOEL aprendiste a preguntar con Rashi. En J2 aprendiste a Ibn Ezra y al Ramban, y practicaste el Remez en el relato de la Creación. Ahora el mapa se convierte en recorrido: **una lectura en los cuatro niveles de PaRDeS** sobre Génesis 1:1, usando los comentaristas que ya conoces para cada nivel.`,
      },
      {
        t: "verse",
        he: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
        es: "En el principio creó Dios los cielos y la tierra.",
        ref: "Génesis 1:1 ✅",
        sefaria: "Genesis 1:1",
      },
      {
        t: "p",
        tone: "item",
        text: `**Pshat — con Rashi ✅:** El primer versículo de la Torá establece el derecho de Dios sobre la tierra que luego dará a Israel (Rashi a Génesis 1:1 ✅, base: Salmos 111:6 ✅). El texto comienza con la Creación, no con el primer mandamiento, precisamente para anclar esa legitimidad. El Pshat no es "el texto dice esto" sino "el texto, leído en su intención más directa, dice esto."`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Remez — con Ibn Ezra y la Gezerah Shavá ✅:** La palabra *bereshit* está en estado constructo — Ibn Ezra (✅) señala la cuestión gramatical. En el Remez añadimos: la raíz *reshit* (principio/primicia) aparece también en Proverbios 8:22 ✅ ("YHVH me adquirió al *reshit* de sus obras" — la Sabiduría habla) y en Jeremías 2:3 ✅ (Israel llamado *reshit* de las primicias de Dios). Las tres apariciones de *reshit* se iluminan mutuamente: el "principio" de Génesis 1:1 resuena con la Sabiduría (Torá) y con Israel. Esto es Gezerah Shavá aplicada al Remez.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Drash — con Bereshit Rabá 1:1 ✅:** El Midrash enseña que la Torá preexistió al mundo dos mil años y fue el plano con que Dios lo creó (Bereshit Rabá 1:1 ✅, base: Proverbios 8:22 ✅). El Drash no contradice el Pshat — lo amplifica: el "principio" de la Creación es también el "principio" de la Sabiduría que la precede y la organiza.`,
      },
      {
        t: "p",
        tone: "item",
        text: `**Sod — primer umbral, con Ramban ⚠️:** El Ramban señala que el primer versículo describe la Creación *ex nihilo* — la aparición de algo desde la nada absoluta — y que esa nada tiene una dimensión que la filosofía griega no puede captar. En su comentario ⚠️, el Ramban conecta el *reshit* con las primeras sefirot. El estudiante llega aquí al umbral del Sod — y lo atraviesa con honestidad: *"El Ramban señala aquí algo más profundo; lo estudiaré en MAGUID y JAJAM cuando el currículo abra la Cabalá luriánica completa."* El Sod no se fuerza; se prepara.`,
      },
      {
        t: "p",
        text: `**El hiddush propio.** El PaRDeS no termina con lo que dicen los comentaristas. Termina con lo que el estudiante ve — el **חִידּוּשׁ** (*hiddush* — novedad, innovación propia). No es inventar sino conectar honestamente. Una pregunta que queda sin responder después de los cuatro niveles, una resonancia que ningún comentarista señaló pero que el estudiante siente en el texto — marcada con honestidad como intuición propia, no como tradición recibida. Ese es el primer *hiddush* de JAVER.`,
      },
    ],
    contemplacion: [
      "PaRDeS es un jardín — *pardes* en arameo es huerto, jardín. Los cuatro que entraron al Pardes (ben Azay, ben Zomá, Ajer y Rabbi Akivá — Jagiga 14b ✅, que estudiaste en S2) entraron sin todos los niveles preparados. Tú entras con el Pshat del Mussar (J1), con la gramática del Ibn Ezra, con la profundidad del Ramban, con el Remez de los números. Entras con más preparación que ellos — aunque con mucho menos sabiduría.",
      "El ejercicio de hoy no es terminal — es un punto de partida. El estudiante que lea este análisis de Génesis 1:1 en diez años verá lo que aquí no puede ver. Pero el que lo hace hoy honestamente ya tiene el hábito.",
    ],
    accion: {
      text: [
        `Escribe tu propio análisis en PaRDeS de Génesis 1:1 (o de cualquier versículo de Génesis 1–3 que elijas). Para cada nivel: Pshat — con Rashi; Remez — con al menos una Gezerah Shavá o conexión numérica; Drash — con el Midrash; Sod — lo que intuyes, marcado explícitamente como intuición propia. 200–400 palabras.`,
      ],
      cta: { label: "Abrir Génesis 1:1 con todos los comentaristas en Sefaria →", ref: "Genesis 1:1" },
    },
    sello:
      "Primera lectura completa en PaRDeS: Pshat (Rashi ✅), Remez (Ibn Ezra + Gezerah Shavá ✅), Drash (Bereshit Rabá 1:1 ✅), Sod (Ramban — primer umbral ⚠️). El hiddush: lo que el estudiante ve y marca honestamente como propio. Base: Génesis 1:1 ✅.",
    hilos: [
      { kind: "study", ref: "remez-practica", label: "El Remez que practicaste en L44 ahora forma parte del PaRDeS completo." },
      { kind: "study", ref: "nombres-divinos", label: "J3 abre la teología de los Nombres divinos — la primera sección explícitamente teológica del currículo." },
    ],
    fuentes: [
      "Génesis 1:1 ✅",
      "Rashi a Génesis 1:1 ✅ (Pshat: derecho de Dios sobre la tierra; base: Salmos 111:6 ✅)",
      "Ibn Ezra a Génesis 1:1 ✅ (Remez: cuestión gramatical del estado constructo)",
      "Ramban a Génesis 1:1 ✅ (Sod: primer umbral cabalístico ⚠️)",
      "Bereshit Rabá 1:1 ✅ (Drash: la Torá como plano de la Creación)",
      "Proverbios 8:22 ✅ (reshit — la Sabiduría preexistente)",
      "Jagiga 14b ✅ (los cuatro que entraron al Pardes)",
    ],
    tarea: {
      semana: 45,
      herramienta: "PaRDeS completo aplicado: Pshat, Remez, Drash, Sod sobre un versículo — con comentaristas y hiddush propio",
      enunciado:
        "Escribe un análisis en Pshat y Remez de Génesis 1:1 usando Rashi y un comentarista más. Marca cada nivel claramente. Al final, escribe tu hiddush. Importante: el hiddush no es una síntesis elegante de los comentaristas ni una conclusión que 'cuadra bien'. Es algo que todavía te resulta extraño, incómodo o que no encaja del todo con ninguno de ellos. Si todo te cuadra perfectamente, escribe: '¿por qué ninguno de los tres preguntó X?' — y responde con tu propia hipótesis. Márcalo explícitamente como intuición propia, no como fuente.",
      palabrasMin: 200,
      palabrasMax: 400,
    },
    closeModule:
      "Terminaste el segundo módulo de JAVER. En cinco semanas conociste a Ibn Ezra y al Ramban, aprendiste a comparar tres comentaristas sobre el mismo versículo, practicaste el Remez en el relato de la Creación, y completaste tu primera lectura en los cuatro niveles de PaRDeS. El sistema PaRDeS ya no es un mapa — es una práctica. El EX-4 estará disponible en tu panel — el primer expositivo de JAVER exige dos niveles de PaRDeS trabajados con profundidad y un hiddush honesto. El módulo J3 te espera con la teología de los Nombres divinos: por qué Dios tiene siete Nombres, qué revela cada uno, y cómo la Shemá es la declaración metafísica más densa del judaísmo. כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר — la luz sigue creciendo.",
  },
];

// ── Metadatos del módulo ─────────────────────────────────────────────────────

export const MODULO9 = {
  id: "J2",
  he: "פְּשָׁט וּדְרָשׁ",
  titulo: "Leer en profundidad",
  etapaHe: "חָבֵר",
  etapa: "Javer",
  etapaGloss: "el compañero de estudio",
  etapaNum: 3,
  etapasTotal: 6,
  total: LESSONS9.length,
  auroraHe: "כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר",
  auroraEs: "como la luz del alba, que va en aumento (Mishlé 4:18)",
} as const;

// ── Navegación entre lecciones ───────────────────────────────────────────────

export function getLesson9(slug: string): Lesson | undefined {
  return LESSONS9.find((l) => l.slug === slug);
}

export function lessonIndex9(slug: string): number {
  return LESSONS9.findIndex((l) => l.slug === slug);
}

export function nextLesson9(slug: string): Lesson | null {
  const i = lessonIndex9(slug);
  return i >= 0 && i < LESSONS9.length - 1 ? LESSONS9[i + 1] : null;
}

// ── Resolución de "Sigue el hilo" para Módulo 9 ──────────────────────────────
// Slugs internos del Módulo 9.
const INTERNAL_SLUGS9: Record<string, string> = {
  "ibn-ezra": "ibn-ezra",
  "ramban": "ramban",
  "tres-voces-bereshit": "tres-voces-bereshit",
  "remez-practica": "remez-practica",
  "primera-lectura-pardes": "primera-lectura-pardes",
};

// Slugs de módulos anteriores que deben resolver a sus rutas propias.
const CROSS_MODULE_HREFS9: Record<string, string> = {
  "que-es-pardes": "/academia/modulo-1/que-es-pardes",
  "palabras-ancla": "/academia/modulo-2/palabras-ancra",
  "lej-leja-avraham": "/academia/modulo-3/lej-leja-avraham",
  "los-siete-dias": "/academia/modulo-3/los-siete-dias",
  "el-jardin-adam-java": "/academia/modulo-3/el-jardin-adam-java",
  "noaj-y-el-arco": "/academia/modulo-3/noaj-y-el-arco",
  "quien-fue-rashi": "/academia/modulo-4/quien-fue-rashi",
  "el-metodo-de-rashi": "/academia/modulo-4/el-metodo-de-rashi",
  "rashi-bereshit": "/academia/modulo-4/rashi-bereshit",
  "rashi-pshat-drash": "/academia/modulo-4/rashi-pshat-drash",
  "lectura-dos-voces": "/academia/modulo-4/lectura-dos-voces",
  "tres-pilares": "/academia/modulo-5/tres-pilares",
  "cadena-zugot": "/academia/modulo-5/cadena-zugot",
  "hilel-regla-de-oro": "/academia/modulo-5/hilel-regla-de-oro",
  "cuatro-pardes": "/academia/modulo-5/cuatro-pardes",
  "ben-zoma": "/academia/modulo-5/ben-zoma",
  "kinyan-torah": "/academia/modulo-5/kinyan-torah",
  "las-tres-columnas": "/academia/modulo-5/tres-pilares",
  "tora-oral": "/academia/modulo-6/tora-oral",
  "la-mishna": "/academia/modulo-6/la-mishna",
  "pagina-talmud": "/academia/modulo-6/pagina-talmud",
  "primera-mishna": "/academia/modulo-6/primera-mishna",
  "horno-ajnai": "/academia/modulo-6/horno-ajnai",
  "que-es-un-profeta": "/academia/modulo-7/que-es-un-profeta",
  "amos-profeta-social": "/academia/modulo-7/amos-profeta-social",
  // J1 slugs (módulo 8 — Mussar)
  "que-es-el-mussar": "/academia/modulo-8/que-es-el-mussar",
  "cheshbon-ha-nefesh": "/academia/modulo-8/cheshbon-ha-nefesh",
  "zerizut": "/academia/modulo-8/zerizut",
  "nekiut": "/academia/modulo-8/nekiut",
  "anava": "/academia/modulo-8/anava",
  "escalera-del-alma": "/academia/modulo-8/escalera-del-alma",
  // J3 slug (próximo módulo — Nombres divinos)
  "nombres-divinos": "/academia/modulo-10/nombres-divinos",
};

const MISTERIO_SLUGS9 = new Set(MISTERIOS.map((m) => m.slug));

export function resolveThread9(h: Hilo): ThreadTarget {
  if (h.kind === "letter") return { kind: "letter", ref: h.ref };
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS9[key]) return { kind: "lesson", slug: INTERNAL_SLUGS9[key] };
  if (MISTERIO_SLUGS9.has(key)) return { kind: "misterio", slug: key };
  return { kind: "soon" };
}

// Href completo para M9 — incluye cross-module overrides.
export function resolveThreadHref9(h: Hilo): string | null {
  if (h.kind === "letter") return `/letras/${h.ref}`;
  const key = h.ref.toLowerCase().trim();
  if (INTERNAL_SLUGS9[key]) return `/academia/modulo-9/${key}`;
  if (CROSS_MODULE_HREFS9[key]) return CROSS_MODULE_HREFS9[key];
  if (MISTERIO_SLUGS9.has(key)) return `/misterio/${key}`;
  return null;
}
