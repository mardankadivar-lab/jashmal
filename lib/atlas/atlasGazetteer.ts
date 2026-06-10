// ─────────────────────────────────────────────────────────────────────────
// atlasGazetteer.ts — el "vocabulario" de localidades que el Atlas sabe cosechar.
//
// Hermano de brainHarvest: igual que la Mente Cósmica cosecha CONCEPTOS desde
// los hyperlinks de un estudio, el Atlas cosecha LOCALIDADES desde el texto del
// estudio. Pero un lugar necesita coordenadas REALES y nombre hebreo exacto: eso
// NO se puede inventar (guardarraíl de exactitud). Por eso la detección se hace
// contra una LISTA CURADA (gazetteer) con datos pre-verificados.
//
//   • PLACES (lib/atlasData.ts) = las 24 localidades semilla, ya visibles.
//   • GAZETTEER_EXTRA (abajo)   = localidades adicionales, ocultas hasta que se
//                                 ESTUDIAN; entonces se encienden y el Atlas crece.
//   • GAZETTEER_ALL             = semilla + extra → universo de lugares detectables.
//
// El editor-erudito (Sofer) puede verificar/ampliar estas coordenadas y añadir
// más localidades; infraestructura solo construye el MECANISMO + una base razonable.
// ─────────────────────────────────────────────────────────────────────────

import { PLACES, type Place } from "@/lib/atlas/atlasData";

// Localidades adicionales (no están en la semilla visible). Coordenadas según las
// identificaciones tradicionales/arqueológicas estándar; las disputadas llevan `warn`.
// `aliases`: variantes de nombre (es/en/alt) para reconocer el lugar en un estudio.
export const GAZETTEER_EXTRA: Place[] = [
  { id: "shilo", es: "Shiló", he: "שִׁילֹה", fa: "شیلوه", lat: 32.056, lng: 35.289, region: "israel", period: "Jueces · Mishkán", importance: 2, refs: ["Josué 18:1", "1 Samuel 1:3", "Jeremías 7:12"], figures: ["Yehoshúa", "Eli", "Janá", "Shmuel"], sefira: null, desc: "Sede del Mishkán (Tabernáculo) durante los Jueces, antes de Jerusalén; allí oró Janá por Shmuel.", aliases: ["shilo", "silo", "shiloh"] },
  { id: "gibeon", es: "Gibeón", he: "גִּבְעוֹן", fa: "جبعون", lat: 31.846, lng: 35.184, region: "israel", period: "Conquista · Monarquía", importance: 2, refs: ["Josué 9:3", "Josué 10:12", "1 Reyes 3:5"], figures: ["Yehoshúa", "Shlomó"], sefira: null, desc: "Donde «el sol se detuvo» por Yehoshúa y donde Shlomó pidió en sueños el corazón sabio.", aliases: ["gibeon", "gabaon", "guibeon"] },
  { id: "guibea", es: "Guibeá", he: "גִּבְעָה", fa: "جبعه", lat: 31.824, lng: 35.232, region: "israel", period: "Jueces · Monarquía", importance: 2, refs: ["Jueces 19:14", "1 Samuel 10:26", "1 Samuel 11:4"], figures: ["Shaúl"], sefira: null, desc: "«Guibeá de Shaúl», primera capital del rey; escenario del crimen del libro de Jueces.", aliases: ["guibea", "gabaa", "gibea", "guibea de saul"] },
  { id: "mizpa", es: "Mizpá", he: "מִצְפָּה", fa: "مصفه", lat: 31.884, lng: 35.181, region: "israel", period: "Jueces · Monarquía", importance: 2, refs: ["Jueces 20:1", "1 Samuel 7:5", "1 Samuel 10:17"], figures: ["Shmuel", "Shaúl"], sefira: null, desc: "Lugar de asamblea de Israel; allí Shmuel reunió al pueblo y fue ungido Shaúl.", aliases: ["mizpa", "mizpah", "mispa"], warn: "Mizpá de Benjamín (Tell en-Nasbeh, identificación dominante)." },
  { id: "rama", es: "Ramá", he: "הָרָמָה", fa: "رامه", lat: 31.871, lng: 35.205, region: "israel", period: "Monarquía", importance: 2, refs: ["1 Samuel 1:19", "1 Samuel 7:17", "Jeremías 31:14"], figures: ["Shmuel"], sefira: null, desc: "Casa y tumba de Shmuel; «voz en Ramá» del llanto de Rajel por sus hijos (Jer 31).", aliases: ["rama", "ramah", "ramataim"] },
  { id: "nob", es: "Nob", he: "נֹב", fa: "نوب", lat: 31.793, lng: 35.244, region: "israel", period: "Monarquía", importance: 1, refs: ["1 Samuel 21:2", "1 Samuel 22:19"], figures: ["David"], sefira: null, desc: "«Ciudad de los sacerdotes»; David comió allí los panes de la proposición huyendo de Shaúl.", aliases: ["nob"] },
  { id: "ai", es: "Hai (Ai)", he: "הָעַי", fa: "عای", lat: 31.917, lng: 35.262, region: "israel", period: "Conquista", importance: 1, refs: ["Génesis 12:8", "Josué 7:2", "Josué 8:28"], figures: ["Avraham", "Yehoshúa"], sefira: null, desc: "Segunda conquista de Yehoshúa tras el tropiezo de Aján; junto a ella acampó Avraham.", aliases: ["hai", "ciudad de ai"], warn: "Ubicación DISPUTADA (et-Tell o Khirbet el-Maqatir)." },
  { id: "bet-shean", es: "Bet-Sheán", he: "בֵּית שְׁאָן", fa: "بیت‌شان", lat: 32.497, lng: 35.500, region: "israel", period: "Conquista · Monarquía", importance: 2, refs: ["Josué 17:11", "1 Samuel 31:10", "1 Samuel 31:12"], figures: ["Shaúl"], sefira: null, desc: "En su muro colgaron los filisteos el cuerpo de Shaúl tras la derrota del Guilboa.", aliases: ["bet shean", "bet-shean", "beit shean", "betsan", "escitopolis"] },
  { id: "meguido", es: "Meguidó", he: "מְגִדּוֹ", fa: "مجدو", lat: 32.585, lng: 35.184, region: "israel", period: "Jueces · Monarquía", importance: 2, refs: ["Jueces 5:19", "1 Reyes 9:15", "2 Reyes 23:29"], figures: ["Devorá", "Shlomó", "Yoshiyahu"], sefira: null, desc: "Llave del valle de Yizreel; «Har Meguidó» (Armagedón); allí cayó el rey Yoshiyahu.", aliases: ["meguido", "megiddo", "megido", "armagedon", "har meguido"] },
  { id: "laquis", es: "Laquis", he: "לָכִישׁ", fa: "لاکیش", lat: 31.565, lng: 34.849, region: "israel", period: "Conquista · Monarquía", importance: 1, refs: ["Josué 10:31", "2 Reyes 18:14", "Jeremías 34:7"], figures: ["Yehoshúa"], sefira: null, desc: "Gran fortaleza de la Sefelá; su asedio por Senaquerib quedó tallado en piedra.", aliases: ["laquis", "lachish", "lakish"] },
  { id: "hazor", es: "Hazor", he: "חָצוֹר", fa: "حاصور", lat: 33.017, lng: 35.568, region: "israel", period: "Conquista", importance: 1, refs: ["Josué 11:10", "Jueces 4:2", "1 Reyes 9:15"], figures: ["Yehoshúa", "Devorá"], sefira: null, desc: "«Cabeza de todos aquellos reinos»; capital de Yavín, vencido por Devorá y Barak.", aliases: ["hazor", "jatzor", "hatzor"] },
  { id: "tabor", es: "Monte Tabor", he: "הַר תָּבוֹר", fa: "کوه تابور", lat: 32.687, lng: 35.390, region: "israel", period: "Jueces", importance: 1, refs: ["Jueces 4:6", "Jueces 4:14", "Salmos 89:13"], figures: ["Devorá", "Barak"], sefira: null, desc: "Desde su cumbre bajó Barak con diez mil hombres al mando de Devorá contra Sísara.", aliases: ["tabor", "monte tabor", "har tabor"] },
  { id: "penuel", es: "Penuel", he: "פְּנִיאֵל", fa: "فنیئیل", lat: 32.181, lng: 35.681, region: "transjordania", period: "Patriarcas", importance: 2, refs: ["Génesis 32:31", "Génesis 32:32", "Jueces 8:8"], figures: ["Yaakov"], sefira: null, desc: "«Rostro de Dios»: allí luchó Yaakov con el ángel hasta el alba y fue llamado Israel.", aliases: ["penuel", "peniel", "fanuel"], warn: "Vado del Yaboc; coordenada aproximada (Tulul edh-Dhahab)." },
  { id: "majanaim", es: "Majanaim", he: "מַחֲנָיִם", fa: "محنایم", lat: 32.224, lng: 35.679, region: "transjordania", period: "Patriarcas · Monarquía", importance: 1, refs: ["Génesis 32:3", "2 Samuel 17:24", "2 Samuel 2:8"], figures: ["Yaakov", "David"], sefira: null, desc: "«Dos campamentos»: allí Yaakov vio ángeles y allí se refugió David huyendo de Avshalom.", aliases: ["majanaim", "mahanaim", "majanayim"], warn: "Transjordania; coordenada aproximada." },
  { id: "sucot-tj", es: "Sucot (Transjordania)", he: "סֻכּוֹת", fa: "سوکوت", lat: 32.190, lng: 35.620, region: "transjordania", period: "Patriarcas", importance: 1, refs: ["Génesis 33:17", "Jueces 8:5", "1 Reyes 7:46"], figures: ["Yaakov", "Guidón"], sefira: null, desc: "Donde Yaakov «se hizo cabañas» (sucot) al volver de Aram; en su barro se fundió el bronce del Templo.", aliases: ["sucot de transjordania", "sukkot transjordania", "tell deir alla"], warn: "Distinta de la Sucot del Éxodo; coordenada aproximada (Tell Deir Alla)." },
  { id: "cades-barnea", es: "Cades-Barnea", he: "קָדֵשׁ בַּרְנֵעַ", fa: "قادش", lat: 30.683, lng: 34.420, region: "sinai", period: "Éxodo", importance: 2, refs: ["Números 13:26", "Números 20:1", "Deuteronomio 1:46"], figures: ["Moshé", "Miriam"], sefira: null, desc: "Campamento del desierto desde donde partieron los espías; allí murió y fue sepultada Miriam.", aliases: ["cades barnea", "cades-barnea", "kadesh barnea", "cades"], warn: "Ubicación DISPUTADA (Ein el-Qudeirat, la más aceptada)." },
  { id: "hor-hahar", es: "Monte Hor", he: "הֹר הָהָר", fa: "کوه هور", lat: 30.318, lng: 35.407, region: "transjordania", period: "Éxodo", importance: 1, refs: ["Números 20:22", "Números 20:28", "Números 33:38"], figures: ["Aharón"], sefira: null, desc: "Cumbre en la frontera de Edom donde murió Aharón y le sucedió Elazar.", aliases: ["monte hor", "hor hahar", "hor la montana"], warn: "Ubicación DISPUTADA (Jebel Nebi Harun, tradición)." },
  { id: "gerar", es: "Guerar", he: "גְּרָר", fa: "جرار", lat: 31.398, lng: 34.633, region: "filistea", period: "Patriarcas", importance: 1, refs: ["Génesis 20:1", "Génesis 26:1", "Génesis 26:17"], figures: ["Avraham", "Yitzjak", "Sará", "Rivká"], sefira: null, desc: "Reino de Avimélej donde peregrinaron Avraham e Yitzjak y cavaron pozos.", aliases: ["guerar", "gerar"], warn: "Costa del Néguev occidental; coordenada aproximada (Tel Haror)." },
  { id: "sodoma", es: "Sodoma", he: "סְדֹם", fa: "سدوم", lat: 31.200, lng: 35.380, region: "transjordania", period: "Patriarcas", importance: 2, refs: ["Génesis 13:12", "Génesis 18:20", "Génesis 19:24"], figures: ["Lot", "Avraham"], sefira: null, desc: "Ciudad del Kikar destruida con azufre y fuego; de ella sacaron a Lot los ángeles.", aliases: ["sodoma", "sedom", "sodom"], warn: "Destruida; ubicación DISPUTADA (sur del Mar Muerto, simbólica)." },
  { id: "gat", es: "Gat", he: "גַּת", fa: "جت", lat: 31.699, lng: 34.847, region: "filistea", period: "Monarquía", importance: 2, refs: ["1 Samuel 17:4", "1 Samuel 21:11", "2 Samuel 1:20"], figures: ["David", "Goliat"], sefira: null, desc: "Ciudad de Goliat y de los gigantes; refugio de David ante Aquís rey de Gat.", aliases: ["gat", "gath", "tell es-safi"] },
  { id: "asdod", es: "Asdod", he: "אַשְׁדּוֹד", fa: "اشدود", lat: 31.802, lng: 34.651, region: "filistea", period: "Conquista · Monarquía", importance: 1, refs: ["Josué 11:22", "1 Samuel 5:1", "1 Samuel 5:7"], figures: [], sefira: null, desc: "Una de las cinco ciudades filisteas; allí cayó Dagón ante el Arca del Pacto.", aliases: ["asdod", "ashdod"] },
  { id: "ascalon", es: "Ascalón", he: "אַשְׁקְלוֹן", fa: "اشقلون", lat: 31.665, lng: 34.551, region: "filistea", period: "Jueces · Monarquía", importance: 1, refs: ["Jueces 1:18", "Jueces 14:19", "2 Samuel 1:20"], figures: ["Shimshon"], sefira: null, desc: "Puerto filisteo; allí Shimshón hirió a treinta hombres para pagar su apuesta.", aliases: ["ascalon", "ashkelon", "askelon"] },
  { id: "ecron", es: "Ecrón", he: "עֶקְרוֹן", fa: "عقرون", lat: 31.780, lng: 34.851, region: "filistea", period: "Conquista · Monarquía", importance: 1, refs: ["Josué 13:3", "1 Samuel 5:10", "1 Samuel 6:17"], figures: [], sefira: null, desc: "La más norteña de las cinco ciudades filisteas; última parada del Arca antes de volver a Israel.", aliases: ["ecron", "ekron"] },
  { id: "mamre", es: "Mamré", he: "מַמְרֵא", fa: "ممرا", lat: 31.553, lng: 35.097, region: "israel", period: "Patriarcas", importance: 1, refs: ["Génesis 13:18", "Génesis 18:1", "Génesis 23:17"], figures: ["Avraham", "Sará"], sefira: null, desc: "Las encinas de Mamré junto a Hebrón; bajo ellas se le aparecieron a Avraham los tres ángeles.", aliases: ["mamre", "encinas de mamre", "alon mamre"] },
  { id: "moria", es: "Monte Moriah", he: "הַר הַמּוֹרִיָּה", fa: "کوه موریا", lat: 31.778, lng: 35.236, region: "israel", period: "Patriarcas · Monarquía", importance: 2, refs: ["Génesis 22:2", "2 Crónicas 3:1"], figures: ["Avraham", "Yitzjak", "Shlomó"], sefira: null, desc: "Monte de la Akedá (atadura de Yitzjak) y, después, del Templo de Shlomó: la montaña del Nombre.", aliases: ["moriah", "moria", "monte moriah", "har hamoria", "monte del templo"] },
  { id: "guilgal", es: "Guilgal", he: "גִּלְגָּל", fa: "جلجال", lat: 31.866, lng: 35.503, region: "israel", period: "Conquista", importance: 1, refs: ["Josué 4:19", "Josué 5:9", "1 Samuel 11:15"], figures: ["Yehoshúa", "Shaúl", "Eliyahu"], sefira: null, desc: "Primer campamento al cruzar el Jordán; allí «rodó» el oprobio de Egipto y fue confirmado Shaúl.", aliases: ["guilgal", "gilgal"], warn: "Cerca de Jericó; coordenada aproximada." },
];

// Todo el universo de lugares DETECTABLES (semilla visible + extra cosechable).
export const GAZETTEER_ALL: Place[] = [...PLACES, ...GAZETTEER_EXTRA];

// Aliases de las localidades SEMILLA (las de atlasData no traen `aliases`). Sirven
// para reconocerlas en un estudio y subir su brillo (hits); ya están visibles, así
// que cosecharlas es idempotente (no se duplican).
const SEED_ALIASES: Record<string, string[]> = {
  jerusalen: ["jerusalen", "jerusalén", "jerusalem", "yerushalaim", "sion", "ciudad de david"],
  hebron: ["hebron", "hebrón", "kiriat arba", "majpela", "macpela"],
  belen: ["belen", "belén", "bethlehem", "bet lejem", "efrata"],
  jerico: ["jerico", "jericó", "jericho"],
  betel: ["betel", "bet el", "bethel", "casa de dios", "luz"],
  siquem: ["siquem", "shejem", "shechem", "nablus"],
  beerseba: ["beerseba", "beer sheva", "beersheba", "pozo del juramento"],
  dan: ["ciudad de dan", "lais", "tel dan"],
  "monte-sinai": ["sinai", "sinaí", "horeb", "jebel musa", "monte de dios"],
  "monte-nebo": ["nebo", "nevo", "pisga", "pisgá"],
  "monte-carmelo": ["carmelo", "carmel", "har hacarmel"],
  ur: ["ur de los caldeos", "ur kasdim"],
  haran: ["haran", "harán", "jaran", "charan"],
  babilonia: ["babilonia", "babel", "bavel", "babylon"],
  ninive: ["ninive", "nínive", "nineveh"],
  susa: ["susa", "shushan", "shushán"],
  damasco: ["damasco", "damascus", "dammesek"],
  tiro: ["tiro", "tyre", "tzor"],
  sidon: ["sidon", "sidón", "tzidon", "tzarfat", "sarepta"],
  gaza: ["gaza", "aza"],
  samaria: ["samaria", "shomron", "shomrón"],
  "ramses-gosen": ["ramses", "ramsés", "gosen", "gosén", "goshen", "pi-ramses"],
  "yam-suf": ["mar rojo", "yam suf", "mar de los juncos", "mar de las cañas"],
  moab: ["moab", "estepas de moab", "arvot moav"],
};

// ── Normalización para detección (minúsculas, sin acentos ni nikud) ──
function norm(s: string): string {
  return (s || "")
    .normalize("NFD")
    .replace(/[̀-֑ͯ-ׇ]/g, "") // acentos latinos + nikud/te'amim hebreos
    .toLowerCase()
    .replace(/[-–—_/.]+/g, " ") // guiones/barras → espacio (Bet-El ≈ Bet El ≈ Betel)
    .replace(/\s+/g, " ")
    .trim();
}

// ¿aparece `needle` como PALABRA completa dentro de `hay` (texto normalizado)?
function hasWord(hay: string, needle: string): boolean {
  if (!needle) return false;
  const esc = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${esc}([^\\p{L}\\p{N}]|$)`, "u").test(hay);
}

// Devuelve el alias-detección de una localidad: sus aliases propios + (si es
// semilla) los del mapa + su nombre español.
function detectAliases(p: Place): string[] {
  const out = new Set<string>();
  if (p.aliases) for (const a of p.aliases) out.add(norm(a));
  for (const a of SEED_ALIASES[p.id] ?? []) out.add(norm(a));
  out.add(norm(p.es));
  return [...out].filter(Boolean);
}

// ── Detección: ¿qué localidades del gazetteer aparecen en este estudio? ──
// `subject` = tema del estudio (ref de Sefaria, término o letra). `text` = análisis.
// Precisión > exhaustividad: para barrer el texto exigimos nombres distintivos
// (hebreo de ≥3 letras, o alias de ≥4 caracteres). Los nombres muy cortos y
// ambiguos (Nob, Gat, Ai, Dan…) solo se detectan si SON el tema del estudio.
export function detectPlaceIds(subject: string, text: string): string[] {
  const subjN = norm(subject);
  const hay = norm(`${subject}\n${text}`);
  if (!hay) return [];

  const matched: { id: string; importance: number }[] = [];
  for (const p of GAZETTEER_ALL) {
    const aliases = detectAliases(p);
    let hit = false;

    // (1) el tema ES la localidad (señal fuerte; cubre nombres cortos)
    for (const a of aliases) {
      if (subjN === a || (a.length >= 4 && hasWord(subjN, a))) { hit = true; break; }
    }
    // (2) el nombre hebreo distintivo aparece en el texto
    if (!hit) {
      const heN = norm(p.he);
      if (heN.length >= 3 && hay.includes(heN)) hit = true;
    }
    // (3) un alias largo (≥4) aparece como palabra en el texto
    if (!hit) {
      for (const a of aliases) {
        if (a.length >= 4 && hasWord(hay, a)) { hit = true; break; }
      }
    }
    if (hit) matched.push({ id: p.id, importance: p.importance });
  }

  // prioriza por importancia (las grandes primero) y limita el ruido
  matched.sort((a, b) => b.importance - a.importance);
  return matched.slice(0, 8).map((m) => m.id);
}

export const gazetteerById = (id: string): Place | undefined =>
  GAZETTEER_ALL.find((p) => p.id === id);
