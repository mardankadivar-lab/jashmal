import { PARSHA_WORKS } from "@/lib/sources/catalogOverrides";

// Nombres transliterados ES/FA para los libros (sobre el id inglés de Sefaria).
// Si un libro no está aquí, se muestra su título inglés (fallback honesto).
// FA: nombres de la Biblia persa estándar que la audiencia iraní reconoce
// (lista autoritativa provista por Mardan, 2026-06-03). Persa puro, sin
// transliteración hebrea, para no confundir al lector persa.

// `fa` es opcional a propósito: la lista persa es la de la Biblia persa
// estándar que dio Mardan, y para las obras midráshicas no tenemos un nombre
// persa autorizado. Antes que inventarlo, se deja el título de Sefaria.
interface Name {
  es: string;
  fa?: string;
  /** inglés. HOY NADIE LO LEE: `localizedBookLabel` devuelve el español cuando
   * el idioma es inglés, para todos los libros del sitio. Ese hueco se arregla
   * aparte y por decisión de la gerencia; el campo existe para que, cuando se
   * decida, sea una línea y no haya que volver a pedirle los nombres al Sofer. */
  en?: string;
}

// ── Mishné Torá — los tratados (hiljot) ───────────────────────────────────
// La obra no es un libro: son catorce "sefarim" con casi noventa tratados.
// Sefaria los nombra en inglés ("Mishneh Torah, Vows"), y esta audiencia no
// lee hebreo ni inglés: español primero, transliteración entre paréntesis
// como apoyo. Los nombres salen del título HEBREO de cada tratado (que es el
// autoritativo), no del inglés de Sefaria.
// Sin `fa`: no tenemos una lista persa autorizada para los tratados y no se
// inventa — cae al título de Sefaria, igual que las obras midráshicas.
const MISHNEH_TORAH_NAMES: Record<string, Name> = {
  // Introducción a la obra
  "Mishneh Torah, Transmission of the Oral Law": { es: "La transmisión de la Torá oral (Mesirat Torá sheBeal Pe)" },
  "Mishneh Torah, Positive Mitzvot": { es: "Los mandamientos positivos (Mitzvot Asé)" },
  "Mishneh Torah, Negative Mitzvot": { es: "Los mandamientos negativos (Mitzvot Lo Taasé)" },
  "Mishneh Torah, Overview of Mishneh Torah Contents": { es: "Contenido de la obra (Tojen HaJibur)" },
  // Séfer HaMadá — el Conocimiento
  "Mishneh Torah, Foundations of the Torah": { es: "Fundamentos de la Torá (Hiljot Yesodei HaTorá)" },
  "Mishneh Torah, Human Dispositions": { es: "Las disposiciones del alma (Hiljot Deot)" },
  "Mishneh Torah, Torah Study": { es: "El estudio de la Torá (Hiljot Talmud Torá)" },
  "Mishneh Torah, Foreign Worship and Customs of the Nations": { es: "Idolatría y costumbres de las naciones (Hiljot Avodá Zará)" },
  "Mishneh Torah, Repentance": { es: "El arrepentimiento (Hiljot Teshuvá)" },
  // Séfer Ahavá — el Amor
  "Mishneh Torah, Reading the Shema": { es: "La lectura del Shemá (Hiljot Kriat Shemá)" },
  "Mishneh Torah, Prayer and the Priestly Blessing": { es: "La oración y la bendición sacerdotal (Hiljot Tefilá uBirkat Kohanim)" },
  "Mishneh Torah, Tefillin, Mezuzah and the Torah Scroll": { es: "Tefilín, mezuzá y rollo de la Torá (Hiljot Tefilín, Mezuzá veSéfer Torá)" },
  "Mishneh Torah, Fringes": { es: "Los flecos del tzitzit (Hiljot Tzitzit)" },
  "Mishneh Torah, Blessings": { es: "Las bendiciones (Hiljot Berajot)" },
  "Mishneh Torah, Circumcision": { es: "La circuncisión (Hiljot Milá)" },
  "Mishneh Torah, The Order of Prayer": { es: "El orden de la oración (Séder HaTefilá)" },
  // Séfer Zemanim — los Tiempos
  "Mishneh Torah, Sabbath": { es: "El Shabat (Hiljot Shabat)" },
  "Mishneh Torah, Eruvin": { es: "Los eruvín (Hiljot Eruvín)" },
  "Mishneh Torah, Rest on the Tenth of Tishrei": { es: "El reposo del diez de Tishrei (Hiljot Shevitat Asor)" },
  "Mishneh Torah, Rest on a Holiday": { es: "El reposo en Yom Tov (Hiljot Shevitat Yom Tov)" },
  "Mishneh Torah, Leavened and Unleavened Bread": { es: "Jametz y matzá (Hiljot Jametz uMatzá)" },
  "Mishneh Torah, Shofar, Sukkah and Lulav": { es: "Shofar, sucá y lulav (Hiljot Shofar, Sucá veLulav)" },
  "Mishneh Torah, Sheqel Dues": { es: "El tributo del shékel (Hiljot Shekalim)" },
  "Mishneh Torah, Sanctification of the New Month": { es: "La santificación del mes nuevo (Hiljot Kidush HaJódesh)" },
  "Mishneh Torah, Fasts": { es: "Los ayunos (Hiljot Taaniot)" },
  "Mishneh Torah, Scroll of Esther and Hanukkah": { es: "El rollo de Ester y Janucá (Hiljot Meguilá veJanucá)" },
  // Séfer Nashim — las Mujeres
  "Mishneh Torah, Marriage": { es: "El matrimonio (Hiljot Ishut)" },
  "Mishneh Torah, Divorce": { es: "El divorcio (Hiljot Guerushín)" },
  "Mishneh Torah, Levirate Marriage and Release": { es: "Levirato y jalitzá (Hiljot Yibum vaJalitzá)" },
  "Mishneh Torah, Virgin Maiden": { es: "La joven virgen (Hiljot Naará Betulá)" },
  "Mishneh Torah, Woman Suspected of Infidelity": { es: "La mujer sospechada (Hiljot Sotá)" },
  "Kuntres Zikah": { es: "Kuntrés Zicá" },
  // Séfer Kedushá — la Santidad
  "Mishneh Torah, Forbidden Intercourse": { es: "Las uniones prohibidas (Hiljot Isurei Biá)" },
  "Mishneh Torah, Forbidden Foods": { es: "Los alimentos prohibidos (Hiljot Maajalot Asurot)" },
  "Mishneh Torah, Ritual Slaughter": { es: "La faena ritual (Hiljot Shejitá)" },
  // Séfer Hafla'á — la Separación
  "Mishneh Torah, Oaths": { es: "Los juramentos (Hiljot Shevuot)" },
  "Mishneh Torah, Vows": { es: "Los votos (Hiljot Nedarim)" },
  "Mishneh Torah, Nazariteship": { es: "El nazareato (Hiljot Nezirut)" },
  "Mishneh Torah, Appraisals and Devoted Property": { es: "Valuaciones y bienes consagrados (Hiljot Arajín vaJaramín)" },
  // Séfer Zeraim — las Siembras
  "Mishneh Torah, Diverse Species": { es: "Las mezclas prohibidas (Hiljot Kilaim)" },
  "Mishneh Torah, Gifts to the Poor": { es: "Los dones para el pobre (Hiljot Matnot Aniím)" },
  "Mishneh Torah, Heave Offerings": { es: "Las ofrendas de terumá (Hiljot Terumot)" },
  "Mishneh Torah, Tithes": { es: "Los diezmos (Hiljot Maasrot)" },
  "Mishneh Torah, Second Tithes and Fourth Year's Fruit": { es: "El segundo diezmo y el fruto del cuarto año (Hiljot Maaser Shení veNeta Revaí)" },
  "Mishneh Torah, First Fruits and other Gifts to Priests Outside the Sanctuary": { es: "Las primicias y los dones al sacerdote fuera del Templo (Hiljot Bikurim)" },
  "Mishneh Torah, Sabbatical Year and the Jubilee": { es: "El año sabático y el jubileo (Hiljot Shemitá veYovel)" },
  // Séfer Avodá — el Servicio del Templo
  "Mishneh Torah, The Chosen Temple": { es: "La Casa elegida, el Templo (Hiljot Beit HaBejirá)" },
  "Mishneh Torah, Vessels of the Sanctuary and Those Who Serve Therein": { es: "Los utensilios del Santuario y quienes sirven en él (Hiljot Klei HaMikdash)" },
  "Mishneh Torah, Admission into the Sanctuary": { es: "La entrada al Santuario (Hiljot Biat Mikdash)" },
  "Mishneh Torah, Things Forbidden on the Altar": { es: "Lo prohibido sobre el altar (Hiljot Isurei HaMizbéaj)" },
  "Mishneh Torah, Sacrificial Procedure": { es: "El procedimiento de las ofrendas (Hiljot Maasé HaKorbanot)" },
  "Mishneh Torah, Daily Offerings and Additional Offerings": { es: "Las ofrendas diarias y las adicionales (Hiljot Temidín uMusafín)" },
  "Mishneh Torah, Sacrifices Rendered Unfit": { es: "Las ofrendas invalidadas (Hiljot Pesulei HaMukdashín)" },
  "Mishneh Torah, Service on the Day of Atonement": { es: "El servicio del Día del Perdón (Hiljot Avodat Yom HaKipurim)" },
  "Mishneh Torah, Trespass": { es: "El uso indebido de lo sagrado (Hiljot Meilá)" },
  // Séfer Korbanot — las Ofrendas
  "Mishneh Torah, Paschal Offering": { es: "La ofrenda de Pésaj (Hiljot Korbán Pésaj)" },
  "Mishneh Torah, Festival Offering": { es: "La ofrenda festiva (Hiljot Jaguigá)" },
  "Mishneh Torah, Firstlings": { es: "Los primogénitos del ganado (Hiljot Bejorot)" },
  "Mishneh Torah, Offerings for Unintentional Transgressions": { es: "Las ofrendas por falta involuntaria (Hiljot Shegagot)" },
  "Mishneh Torah, Offerings for Those with Incomplete Atonement": { es: "Las ofrendas de expiación incompleta (Hiljot Mejusrei Kapará)" },
  "Mishneh Torah, Substitution": { es: "La sustitución de la ofrenda (Hiljot Temurá)" },
  // Séfer Taharáh — la Pureza
  "Mishneh Torah, Defilement by a Corpse": { es: "La impureza del cadáver (Hiljot Tumat Met)" },
  "Mishneh Torah, Red Heifer": { es: "La vaca bermeja (Hiljot Pará Adumá)" },
  "Mishneh Torah, Defilement by Leprosy": { es: "La impureza de la tzaraat (Hiljot Tumat Tzaraat)" },
  "Mishneh Torah, Those Who Defile Bed or Seat": { es: "Quienes contaminan lecho y asiento (Hiljot Metamei Mishkav uMoshav)" },
  "Mishneh Torah, Other Sources of Defilement": { es: "Las demás fuentes de impureza (Hiljot Shear Avot HaTumot)" },
  "Mishneh Torah, Defilement of Foods": { es: "La impureza de los alimentos (Hiljot Tumat Ojlín)" },
  "Mishneh Torah, Vessels": { es: "Los utensilios (Hiljot Kelim)" },
  "Mishneh Torah, Immersion Pools": { es: "Las mikvaot (Hiljot Mikvaot)" },
  // Séfer Nezikim — los Daños
  "Mishneh Torah, Damages to Property": { es: "Los daños a la propiedad (Hiljot Nizkei Mamón)" },
  "Mishneh Torah, Theft": { es: "El hurto (Hiljot Guenevá)" },
  "Mishneh Torah, Robbery and Lost Property": { es: "El robo y el objeto perdido (Hiljot Guezelá vaAvedá)" },
  "Mishneh Torah, One Who Injures a Person or Property": { es: "Quien lesiona o daña (Hiljot Jovel uMazik)" },
  "Mishneh Torah, Murderer and the Preservation of Life": { es: "El homicida y el cuidado de la vida (Hiljot Rotzéaj uShmirat Néfesh)" },
  // Séfer Kinyán — las Adquisiciones
  "Mishneh Torah, Sales": { es: "La compraventa (Hiljot Mejirá)" },
  "Mishneh Torah, Ownerless Property and Gifts": { es: "Los bienes sin dueño y las donaciones (Hiljot Zejiá uMataná)" },
  "Mishneh Torah, Neighbors": { es: "Los vecinos (Hiljot Shjenim)" },
  "Mishneh Torah, Agents and Partners": { es: "Los mandatarios y los socios (Hiljot Sheluchín veShutafín)" },
  "Mishneh Torah, Slaves": { es: "Los siervos (Hiljot Avadim)" },
  // Séfer Mishpatim — los Juicios civiles
  "Mishneh Torah, Hiring": { es: "El arrendamiento y el salario (Hiljot Sejirut)" },
  "Mishneh Torah, Borrowing and Deposit": { es: "El préstamo de uso y el depósito (Hiljot Sheelá uFikadón)" },
  "Mishneh Torah, Creditor and Debtor": { es: "El acreedor y el deudor (Hiljot Malvé veLové)" },
  "Mishneh Torah, Plaintiff and Defendant": { es: "El demandante y el demandado (Hiljot Toén veNitán)" },
  "Mishneh Torah, Inheritances": { es: "Las herencias (Hiljot Najalot)" },
  // Séfer Shoftim — los Jueces
  "Mishneh Torah, The Sanhedrin and the Penalties within Their Jurisdiction": { es: "El Sanedrín y las penas en su jurisdicción (Hiljot Sanhedrín)" },
  "Mishneh Torah, Testimony": { es: "El testimonio (Hiljot Edut)" },
  "Mishneh Torah, Rebels": { es: "Los rebeldes contra la tradición (Hiljot Mamrim)" },
  "Mishneh Torah, Mourning": { es: "El duelo (Hiljot Avel)" },
  "Mishneh Torah, Kings and Wars": { es: "Los reyes y las guerras (Hiljot Melajim uMiljamot)" },
};

// ── Agrupaciones DENTRO de una obra ───────────────────────────────────────
// Sefaria devuelve la sección a la que pertenece cada libro de una obra (ver
// `WorkBook.group`). En Mishné Torá esas secciones son los catorce "sefarim".
// Fallback honesto: si no está catalogada, se muestra tal cual.
// `fa`: transliteración del título hebreo a grafía persa, la misma práctica
// que el resto del archivo usa para las obras no bíblicas (Tania → تانیا,
// Zohar → زوهر) y para los sedarim en SUB_FA. No es un nombre inventado: es
// el mismo título, escrito en el alfabeto que lee esa audiencia. Dejarlos sin
// `fa` habría puesto rótulos en INGLÉS ("SEFER MADDA") en una interfaz persa.
const WORK_GROUP_NAMES: Record<string, Name> = {
  Introduction: { es: "Introducción", fa: "مقدمه" },
  "Sefer Madda": { es: "Libro del Conocimiento (Séfer HaMadá)", fa: "سفر مَدَع — دانش" },
  "Sefer Ahavah": { es: "Libro del Amor (Séfer Ahavá)", fa: "سفر اهاوا — عشق" },
  "Sefer Zemanim": { es: "Libro de los Tiempos (Séfer Zemanim)", fa: "سفر زمانیم — زمان‌ها" },
  "Sefer Nashim": { es: "Libro de las Mujeres (Séfer Nashim)", fa: "سفر نشیم — زنان" },
  "Sefer Kedushah": { es: "Libro de la Santidad (Séfer Kedushá)", fa: "سفر قدوشا — قداست" },
  "Sefer Haflaah": { es: "Libro de la Separación (Séfer Hafla'á)", fa: "سفر هفلاآ — جدایی" },
  "Sefer Zeraim": { es: "Libro de las Siembras (Séfer Zeraim)", fa: "سفر زرعیم — کشت‌ها" },
  "Sefer Avodah": { es: "Libro del Servicio del Templo (Séfer Avodá)", fa: "سفر عَوودا — خدمت معبد" },
  "Sefer Korbanot": { es: "Libro de las Ofrendas (Séfer Korbanot)", fa: "سفر قربانوت — قربانی‌ها" },
  "Sefer Taharah": { es: "Libro de la Pureza (Séfer Taharáh)", fa: "سفر طهارا — طهارت" },
  "Sefer Nezikim": { es: "Libro de los Daños (Séfer Nezikim)", fa: "سفر نزیقین — خسارات" },
  "Sefer Kinyan": { es: "Libro de las Adquisiciones (Séfer Kinyán)", fa: "سفر قنیان — تملک" },
  "Sefer Mishpatim": { es: "Libro de los Juicios Civiles (Séfer Mishpatim)", fa: "سفر میشپاطیم — احکام مدنی" },
  "Sefer Shoftim": { es: "Libro de los Jueces (Séfer Shoftim)", fa: "سفر شوفطیم — داوران" },
};

/** Rótulo de una agrupación interna de una obra, en el idioma de la interfaz.
 * Sin nombre catalogado devuelve el que trae Sefaria (nunca inventa). */
export function localizedWorkGroup(name: string, locale: string): string {
  const n = WORK_GROUP_NAMES[name];
  if (!n) return name;
  if (locale === "fa") return n.fa ?? name;
  if (locale === "en") return name;
  return n.es;
}

export const BOOK_NAMES: Record<string, Name> = {
  // Torá
  Genesis: { es: "Génesis (Bereshit)", fa: "پیدایش" },
  Exodus: { es: "Éxodo (Shemot)", fa: "خروج" },
  Leviticus: { es: "Levítico (Vayikrá)", fa: "لاویان" },
  Numbers: { es: "Números (Bamidbar)", fa: "أعداد" },
  Deuteronomy: { es: "Deuteronomio (Devarim)", fa: "تَثنیه" },
  // Neviim
  Joshua: { es: "Josué (Yehoshúa)", fa: "یوشَع" },
  Judges: { es: "Jueces (Shoftim)", fa: "داوران" },
  "I Samuel": { es: "Shmuel I", fa: "اول سَموئیل" },
  "II Samuel": { es: "Shmuel II", fa: "دوم سَموئیل" },
  "I Kings": { es: "Reyes I (Melajim I)", fa: "اول پادشاهان" },
  "II Kings": { es: "Reyes II (Melajim II)", fa: "دوم پادشاهان" },
  Isaiah: { es: "Isaías (Yeshayahu)", fa: "اِشعیا" },
  Jeremiah: { es: "Jeremías (Yirmeyahu)", fa: "اِرمیا" },
  Ezekiel: { es: "Ezequiel (Yejezkel)", fa: "حِزقیال" },
  Hosea: { es: "Oseas (Hoshea)", fa: "هوشَع" },
  Joel: { es: "Joel (Yoel)", fa: "یوئیل" },
  Amos: { es: "Amós", fa: "عاموس" },
  Obadiah: { es: "Abdías (Ovadiá)", fa: "عوبَدیا" },
  Jonah: { es: "Jonás (Yoná)", fa: "یونس" },
  Micah: { es: "Miqueas (Mijá)", fa: "میکاه" },
  Nahum: { es: "Nahúm (Najum)", fa: "ناحوم" },
  Habakkuk: { es: "Habacuc (Javakuk)", fa: "حَبقوق" },
  Zephaniah: { es: "Sofonías (Tzefaniá)", fa: "صَفنیا" },
  Haggai: { es: "Hageo (Jagái)", fa: "حَجّی" },
  Zechariah: { es: "Zacarías (Zejariá)", fa: "زکریا" },
  Malachi: { es: "Malaquías (Malají)", fa: "مَلاکی" },
  // Ketuvim
  Psalms: { es: "Salmos (Tehilim)", fa: "مَزامیر" },
  Proverbs: { es: "Proverbios (Mishlei)", fa: "أمثال" },
  Job: { es: "Job (Iyov)", fa: "ایوب" },
  "Song of Songs": { es: "Cantares (Shir HaShirim)", fa: "غزل غزلها" },
  Ruth: { es: "Rut", fa: "روت" },
  Lamentations: { es: "Lamentaciones (Eijá)", fa: "مَراثی اِرمیا" },
  Ecclesiastes: { es: "Eclesiastés (Kohélet)", fa: "جامعه" },
  Esther: { es: "Ester", fa: "إستر" },
  Daniel: { es: "Daniel", fa: "دانیال" },
  Ezra: { es: "Esdras (Ezrá)", fa: "عِزرا" },
  Nehemiah: { es: "Nehemías (Nejemiá)", fa: "نِحمیا" },
  "I Chronicles": { es: "Crónicas I (Divrei HaYamim I)", fa: "اول تَواریخ" },
  "II Chronicles": { es: "Crónicas II (Divrei HaYamim II)", fa: "دوم تَواریخ" },
  // Jasidut / Cabalá frecuentes (no bíblicos: nombre judío en grafía persa)
  Tanya: { es: "Tania", fa: "تانیا" },
  "Likutei Moharan": { es: "Likutéi Moharán", fa: "لیکوتی موهاران" },
  "Mei HaShiloach": { es: "Mei HaShiloaj", fa: "مه هشیلوآح" },
  "Sefat Emet": { es: "Sefat Emet", fa: "سفت امت" },
  "Kedushat Levi": { es: "Kedushat Levi", fa: "قدوشت لوی" },
  "Ben Porat Yosef": { es: "Ben Porat Yosef", fa: "بن پورت یوسف" },
  "Me'or Einayim": { es: "Me'or Einayim", fa: "مئور عینایم" },
  // Midrash. El motor lo cita en cada estudio desde que se le pide con número
  // exacto, así que sus rótulos tienen que leerse en español. Se catalogan los
  // DOS títulos con que Sefaria conoce cada obra (el hebreo transliterado y el
  // inglés), porque el detector de referencias puede devolver cualquiera.
  // Nombre español primero, transliteración entre paréntesis: la audiencia no
  // lee hebreo.
  "Bereshit Rabbah": { es: "Génesis Rabá (Bereshit Rabá)" },
  "Genesis Rabbah": { es: "Génesis Rabá (Bereshit Rabá)" },
  "Shemot Rabbah": { es: "Éxodo Rabá (Shemot Rabá)" },
  "Exodus Rabbah": { es: "Éxodo Rabá (Shemot Rabá)" },
  "Vayikra Rabbah": { es: "Levítico Rabá (Vayikrá Rabá)" },
  "Leviticus Rabbah": { es: "Levítico Rabá (Vayikrá Rabá)" },
  "Bamidbar Rabbah": { es: "Números Rabá (Bamidbar Rabá)" },
  "Numbers Rabbah": { es: "Números Rabá (Bamidbar Rabá)" },
  "Devarim Rabbah": { es: "Deuteronomio Rabá (Devarim Rabá)" },
  "Deuteronomy Rabbah": { es: "Deuteronomio Rabá (Devarim Rabá)" },
  "Shir HaShirim Rabbah": { es: "Cantares Rabá (Shir HaShirim Rabá)" },
  "Song of Songs Rabbah": { es: "Cantares Rabá (Shir HaShirim Rabá)" },
  "Ruth Rabbah": { es: "Rut Rabá" },
  "Eikhah Rabbah": { es: "Lamentaciones Rabá (Eijá Rabá)" },
  "Lamentations Rabbah": { es: "Lamentaciones Rabá (Eijá Rabá)" },
  "Kohelet Rabbah": { es: "Eclesiastés Rabá (Kohelet Rabá)" },
  "Ecclesiastes Rabbah": { es: "Eclesiastés Rabá (Kohelet Rabá)" },
  "Esther Rabbah": { es: "Ester Rabá" },
  "Midrash Tanchuma": { es: "Midrash Tanjumá" },
  "Midrash Tanchuma Buber": { es: "Midrash Tanjumá (ed. Buber)" },
  "Mekhilta DeRabbi Yishmael": { es: "Mejiltá de Rabí Yishmael" },
  "Sifrei Bamidbar": { es: "Sifrí Bamidbar (Sifrí Números)" },
  "Sifrei Devarim": { es: "Sifrí Devarim (Sifrí Deuteronomio)" },
  "Pirkei DeRabbi Eliezer": { es: "Pirkei de Rabí Eliezer" },
  "Pesikta DeRav Kahana": { es: "Pesiktá de Rav Kahaná" },
  "Pesikta Rabbati": { es: "Pesiktá Rabatí" },
  "Midrash Tehillim": { es: "Midrash Tehilim (Salmos)" },
  "Midrash Mishlei": { es: "Midrash Mishlei (Proverbios)" },
  "Tanna DeBei Eliyahu Rabbah": { es: "Tana deBei Eliahu Rabá" },
  "Yalkut Shimoni on Torah": { es: "Yalkut Shimoní sobre la Torá" },
  Zohar: { es: "Zohar", fa: "زوهر" },
  "Sefer Yetzirah": { es: "Séfer Yetzirá", fa: "سفر یصیرا" },
  // Mishné Torá: obra de catorce libros. Se busca y se abre desde la lupa
  // (ver `getWorkBooks`), así que sus tratados necesitan nombre en español.
  "Mishneh Torah": { es: "Mishné Torá", fa: "میشنه تورا" },
  ...MISHNEH_TORAH_NAMES,

  // ── Filosofía judía · מַחְשֶׁבֶת יִשְׂרָאֵל ────────────────────────────────
  // Rótulos del Departamento de Erudición (el Sofer), 16-nov-2026. Formato fijo
  // de la casa: «Traducción al español (Transliteración hebrea)». El farsi NO
  // es transliteración mecánica: donde la obra tiene nombre propio conocido en
  // el mundo islámico medieval, se usa ese (الامانات و الاعتقادات، دلالة الحائرین).
  //
  // El `en` está GUARDADO PERO NO SE USA: `localizedBookLabel` devuelve el
  // español cuando el idioma es inglés, para TODOS los libros del sitio. Es el
  // hueco de inglés general y se arregla aparte, por decisión de la gerencia.
  // Se guarda para no perder la entrega del Sofer ni tener que volver a pedirla.
  "HaEmunot veHaDeot": { es: "Las creencias y las opiniones (HaEmunot veHaDeot)", fa: "باورها و اندیشه‌ها (الامانات و الاعتقادات)", en: "Beliefs and Opinions" },
  "Duties of the Heart": { es: "Los deberes del corazón (Jovot HaLevavot)", fa: "وظایف دل‌ها (فرائض القلوب)", en: "Duties of the Heart" },
  "Guide for the Perplexed": { es: "Guía de los perplejos (Moré Nevujim)", fa: "راهنمای سرگشتگان (دلالة الحائرین)", en: "Guide for the Perplexed" },
  "Eight Chapters": { es: "Los ocho capítulos (Shemoná Perakim)", fa: "هشت فصل (شْمونا پراکیم)", en: "The Eight Chapters" },
  Kuzari: { es: "El Kuzari (Séfer HaKuzarí)", fa: "کوزاری (کتاب الخزری)", en: "The Kuzari" },
  "Sefer HaIkkarim": { es: "El libro de los principios (Séfer HaIkarim)", fa: "کتاب اصول ایمان (سفر هعیقاریم)", en: "The Book of Principles" },
  "Derashot HaRan": { es: "Los discursos del Ran (Derashot HaRan)", fa: "خطابه‌های هَران (دِرَشوت هَران)", en: "The Discourses of the Ran" },
  "Derekh Hashem": { es: "El camino del Eterno (Dérej Hashem)", fa: "راه خداوند (دِرِخ هَشِم)", en: "The Way of God" },
  "Netivot Olam": { es: "Los senderos eternos (Netivot Olam)", fa: "راه‌های دیرین (نِتیووت عولام)", en: "Eternal Paths" },
  "Nefesh HaChayim": { es: "El alma de la vida (Néfesh HaJaim)", fa: "جانِ زندگی (نِفِش هَحَییم)", en: "The Soul of Life" },
  "Nineteen Letters": { es: "Las diecinueve cartas (Igrot Tzafón)", fa: "نوزده نامه (ایگروت صافون)", en: "The Nineteen Letters" },

  // Los cinco ensayos del Kuzari. El Sofer entrega el Kuzari como obra PLANA
  // y no nombra los maamarim —Sefaria solo los numera—, así que estos rótulos
  // son NUESTROS.
  //
  // Llevan el nombre de la obra delante a propósito. Al aplanarse, el Kuzari
  // NO deja un chip propio en el anaquel: deja estos cinco. Sin el prefijo, el
  // lector veía «Ensayo primero» suelto entre el Séfer haIkarim y los
  // Discursos del Ran, sin forma de saber de qué libro era. (El Tania se
  // aplana igual y no lo necesita: «Igéret HaKódesh» se reconoce sola.)
  "Kuzari-1": { es: "El Kuzari · Ensayo primero", fa: "کوزاری · جستار یکم", en: "The Kuzari · First Essay" },
  "Kuzari-2": { es: "El Kuzari · Ensayo segundo", fa: "کوزاری · جستار دوم", en: "The Kuzari · Second Essay" },
  "Kuzari-3": { es: "El Kuzari · Ensayo tercero", fa: "کوزاری · جستار سوم", en: "The Kuzari · Third Essay" },
  "Kuzari-4": { es: "El Kuzari · Ensayo cuarto", fa: "کوزاری · جستار چهارم", en: "The Kuzari · Fourth Essay" },
  "Kuzari-5": { es: "El Kuzari · Ensayo quinto", fa: "کوزاری · جستار پنجم", en: "The Kuzari · Fifth Essay" },
};

// ── Nombre de la SECCIÓN dentro del ref ───────────────────────────────────
// Un ref de Midrash, de Zohar o de una obra de filosofía no termina en
// números: "Midrash Tanchuma, Lech Lecha 7", "Eikhah Rabbah, Petichta 24",
// "Derekh Hashem, Part One, On the Creator". Traducir solo el libro dejaba
// media referencia en INGLÉS delante de un lector que no lee inglés.
//
// Los nombres ya están traducidos y verificados en el repo: se leen del
// registro PARSHA_WORKS (las dos obras por parashá, que entre ambas cubren las
// 54, más las siete obras de filosofía judía) en vez de escribirlos otra vez.
const PARASHA_NAMES: Record<string, Name> = Object.fromEntries(
  PARSHA_WORKS.flatMap((w) =>
    w.groups.flatMap((g) =>
      g.sections.map((sec) => [sec.refTitle, { es: sec.label, fa: sec.labelFa }] as const)
    )
  )
);

// Palabras de estructura que Sefaria escribe en inglés dentro del ref.
const SECTION_WORDS: Record<string, Name> = {
  Petichta: { es: "Petijtá" },       // los proemios de Eikhá, Ester y Rut Rabá
  Tractate: { es: "Masejta" },       // las masajtot de la Mejiltá
  Introduction: { es: "Introducción" },
  Foreword: { es: "Apertura" },
};

// Los nombres de sección del registro, de más largo a más corto. Hace falta
// el orden porque unos son prefijo de otros ("Maamar 2" / "Maamar 2,
// Observation" / "Maamar 2, Introduction"): gana el más largo, o traduciríamos
// media sección y dejaríamos la otra mitad en inglés.
const SECTION_KEYS_SORTED = Object.keys(PARASHA_NAMES).sort((a, b) => b.length - a.length);

/**
 * El nombre de sección MÁS LARGO del registro que calza al principio de la
 * cola del ref, o null.
 *
 * Esto es lo que la expresión regular de abajo no puede hacer: un nombre de
 * sección de una obra compleja lleva comas y dígitos DENTRO ("Part One, On the
 * Creator", "Maamar 2, Observation", "Part 1"), y cualquier patrón que corte
 * por la primera coma o por el primer dígito parte el nombre en dos y deja la
 * referencia a medio traducir. Aquí no se adivina nada: se compara contra los
 * nombres declarados y verificados en PARSHA_WORKS.
 */
function longestSectionKey(cola: string): string | null {
  for (const key of SECTION_KEYS_SORTED) {
    if (cola === key) return key;
    // Detrás del nombre solo puede venir la numeración, nunca otra letra.
    if (cola.startsWith(key) && /^[\s,:.]*\d/.test(cola.slice(key.length))) return key;
  }
  return null;
}

/** Traduce el nombre de sección que va tras la coma del ref. */
function localizedSection(name: string, locale: string): string {
  const fa = locale === "fa";
  const whole = PARASHA_NAMES[name];
  if (whole) return (fa ? whole.fa : whole.es) ?? name;
  // "Tractate Shirah" → "Masejta Shirah": se traduce la palabra inglesa y se
  // respeta el nombre hebreo, que no nos toca transliterar por nuestra cuenta.
  const parts = name.split(/\s+/);
  const head = SECTION_WORDS[parts[0]];
  if (head && !fa && parts.length > 1) return `${head.es} ${parts.slice(1).join(" ")}`;
  if (head && !fa) return head.es;
  return name;
}

export function localizedBookLabel(id: string, fallback: string, locale: string): string {
  const n = BOOK_NAMES[id];
  if (!n) return fallback; // título inglés de Sefaria
  if (locale === "fa") return n.fa ?? fallback; // sin nombre persa: el de Sefaria
  return n.es;
}

// Nombres de libro ordenados de más largo a más corto, para que "I Samuel"
// no sea capturado por un match parcial equivocado antes de tiempo.
const BOOK_IDS_SORTED = Object.keys(BOOK_NAMES).sort((a, b) => b.length - a.length);

/**
 * Toma un ref canónico de Sefaria (ej. "Numbers 25:10", "Numbers 25:10-26:4")
 * y devuelve la referencia legible en el idioma de la interfaz, ej. para es:
 * "Números (Bamidbar) 25:10". Solo traduce el NOMBRE del libro (prefijo);
 * el resto del ref (capítulo:versículo, folio, etc.) queda intacto.
 * Fallback honesto: si el libro no está en BOOK_NAMES, devuelve el ref tal cual
 * (nunca inventa un nombre). locale "en" también devuelve el ref tal cual,
 * porque el ref canónico de Sefaria YA está en inglés.
 */
export function localizedRef(ref: string, locale: string): string {
  if (locale === "en") return ref;
  for (const id of BOOK_IDS_SORTED) {
    if (ref === id || ref.startsWith(`${id} `) || ref.startsWith(`${id},`)) {
      const rest = ref.slice(id.length);
      const n = BOOK_NAMES[id];
      const label = locale === "fa" ? n.fa : n.es;
      if (!label) return ref; // sin nombre en ese idioma: el ref tal cual
      // La cola puede traer el nombre de la sección en inglés ("Midrash
      // Tanchuma, Lech Lecha 7", "Derekh Hashem, Part One, On the Creator"):
      // primero se busca el nombre completo en el registro de obras, que es la
      // única forma de respetar los nombres con comas y dígitos dentro.
      const cola = rest.replace(/^,\s*/, "");
      const key = longestSectionKey(cola);
      if (key) {
        const n2 = PARASHA_NAMES[key];
        const name = (locale === "fa" ? n2.fa : n2.es) ?? key;
        const tail = cola.slice(key.length).trim();
        return `${label}, ${name}${tail ? ` ${tail}` : ""}`;
      }
      // Si no es una sección declarada, se traduce la palabra de estructura que
      // Sefaria escribe en inglés ("Petichta 24", "Tractate Shirah").
      const sec = /^,\s*([^,\d]+?)\s*(\d.*)?$/.exec(rest);
      if (sec) {
        const name = localizedSection(sec[1], locale);
        return `${label}, ${name}${sec[2] ? ` ${sec[2]}` : ""}`;
      }
      return `${label}${rest}`;
    }
  }
  return ref; // fallback honesto: libro no catalogado, se muestra tal cual
}

// Nombres de las 7 categorías principales en FA
// NOMBRES: pendiente del Sofer — el farsi de «Filosofía judía» es el que ya
// usaba el chip del buscador (lib/sources/searchCategories.ts); se deja tal
// cual hasta que llegue el definitivo.
export const CATEGORY_FA: Record<string, string> = {
  Tanakh:   "تنخ — کتاب مقدس",
  Mishnah:  "میشنا",
  Talmud:   "تلمود بابلی",
  Midrash:  "میدراش",
  Kabbalah: "قبالا",
  Chasidut: "حسیدوت",
  "Jewish Thought": "فلسفهٔ یهودی",
};

// Nombres de las 7 categorías principales en EN. Antes no existían y /en
// mostraba la estantería entera en español (CategoryNav solo distinguía fa/es).
// No son los ids de Sefaria: el rótulo de la séptima dice lo mismo que el chip
// del buscador y que la estantería en los tres idiomas.
export const CATEGORY_EN: Record<string, string> = {
  Tanakh:   "Tanakh",
  Mishnah:  "Mishnah",
  Talmud:   "Babylonian Talmud",
  Midrash:  "Midrash",
  Kabbalah: "Kabbalah",
  Chasidut: "Chasidut",
  "Jewish Thought": "Jewish Philosophy",
};

// Etiquetas de subcategoría en FA (las ES ya vienen en el catálogo).
export const SUB_FA: Record<string, string> = {
  "Torá": "تورات",
  "Profetas (Neviim)": "نوئیم (انبیا)",
  "Escritos (Ketuvim)": "کتوویم (مکتوبات)",
  "Séder Zeraim": "سدر زرعیم",
  "Séder Moed": "سدر موعد",
  "Séder Nashim": "سدر نشیم",
  "Séder Nezikin": "سدر نزیقین",
  "Séder Kodashim": "سدر قداشیم",
  "Séder Tahorot": "سدر طهروت",
  // Los cinco anaqueles de filosofía judía (rótulos del Sofer, 16-nov-2026).
  "Los cimientos (siglos X–XII)": "بنیادها (سده‌های دهم تا دوازدهم)",
  "El Rambam y la cumbre de la razón": "ابن میمون و اوج خردگرایی",
  "Los que le responden (siglos XII–XV)": "پاسخ‌دهندگان (سده‌های دوازدهم تا پانزدهم)",
  "Después de la expulsión (siglos XVI–XVIII)": "پس از اخراج (سده‌های شانزدهم تا هجدهم)",
  "Los modernos (siglos XVIII–XIX)": "دوران نو (سده‌های هجدهم و نوزدهم)",
};

// Anaqueles en INGLÉS. Antes no existían y /en mostraba los acordeones de la
// estantería en español. Solo están los de filosofía judía: los sedarim y las
// tres partes del Tanaj siguen cayendo al español, como el resto del hueco de
// inglés del sitio, que se arregla aparte.
export const SUB_EN: Record<string, string> = {
  "Los cimientos (siglos X–XII)": "The Foundations (10th–12th c.)",
  "El Rambam y la cumbre de la razón": "Maimonides and the Summit of Reason",
  "Los que le responden (siglos XII–XV)": "The Respondents (12th–15th c.)",
  "Después de la expulsión (siglos XVI–XVIII)": "After the Expulsion (16th–18th c.)",
  "Los modernos (siglos XVIII–XIX)": "The Modern Era (18th–19th c.)",
};
