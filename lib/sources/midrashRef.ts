// ¿El lector ABRIÓ un midrash, o solo lo citó un estudio de parashá?
//
// No es la misma lectura. En un estudio de parashá el midrash es una voz más,
// junto a Rashi y el Ramban, y le basta el bloque compacto de «Análisis del
// Midrash». Pero cuando el lector entra por la estantería Midrash y abre
// Bereshit Rabá 39:1, el midrash ya NO es apoyo: es el texto que vino a
// estudiar, y merece el método ampliado — mashal y nimshal, el emparejamiento
// entero, los huecos, y la discusión rabínica sobre cómo se lee una agadá.
//
// Lo único que distingue un caso del otro es la referencia, así que la
// decisión se toma aquí, en el servidor, a partir del `ref`. Vale para
// cualquier puerta de entrada: el catálogo, un enlace interno, un estudio
// guardado o un hilo de «Sigue el hilo».

/**
 * Las obras de la estantería «Midrash» del catálogo, por su id de Sefaria.
 *
 * La lista va escrita a mano y NO se deriva del catálogo en tiempo de
 * ejecución: el motor no tiene por qué cargar las 190 obras del catálogo para
 * responder a una pregunta de sí o no. Lo que la mantiene honesta es el
 * guardián (`npm run midrashref:check`), que la coteja con la estantería real
 * y protesta si Sefaria añade o quita una obra.
 */
export const OBRAS_MIDRASH = [
  "Bereshit Rabbah",
  "Shemot Rabbah",
  "Vayikra Rabbah",
  "Bamidbar Rabbah",
  "Devarim Rabbah",
  "Shir HaShirim Rabbah",
  "Ruth Rabbah",
  "Ruth Rabbah (Lerner)",
  "Esther Rabbah",
  "Kohelet Rabbah",
  "Eikhah Rabbah",
  "Ein Yaakov",
  "Midrash Mishlei",
  "Midrash Tanchuma",
  "Midrash Tanchuma Buber",
  "Midrash Tehillim",
  "Pesikta DeRav Kahana",
  "Pesikta Rabbati",
  "Pirkei DeRabbi Eliezer",
  "Tanna DeBei Eliyahu Rabbah",
  "Yalkut Shimoni on Torah",
  "Mekhilta DeRabbi Yishmael",
  "Sifra",
  "Sifrei Bamidbar",
  "Sifrei Devarim",
] as const;

/** Los mismos títulos en hebreo, por si la referencia llega en hebreo. */
const OBRAS_HE = [
  "בראשית רבה",
  "שמות רבה",
  "ויקרא רבה",
  "במדבר רבה",
  "דברים רבה",
  "שיר השירים רבה",
  "רות רבה",
  "אסתר רבה",
  "קהלת רבה",
  "איכה רבה",
  "עין יעקב",
  "מדרש משלי",
  "מדרש תנחומא",
  "מדרש תהלים",
  "פסיקתא דרב כהנא",
  "פסיקתא רבתי",
  "פרקי דרבי אליעזר",
  "תנא דבי אליהו רבה",
  "ילקוט שמעוני",
  "מכילתא דרבי ישמעאל",
  "ספרא",
  "ספרי במדבר",
  "ספרי דברים",
];

/**
 * ¿Esta referencia ES un midrash abierto por su propia puerta?
 *
 * Se exige que el título esté al PRINCIPIO y que detrás venga un límite de
 * palabra: así «Bereshit Rabbah 39:1» entra y «Bereshit 1:1» no, aunque uno
 * empiece igual que el otro. Ante la duda devuelve `false` — equivocarse hacia
 * el método normal deja un estudio correcto; equivocarse hacia el ampliado
 * deja al lector una disección de un versículo que no es midrash.
 */
export function esRefDeMidrash(ref: string | undefined | null): boolean {
  if (!ref) return false;
  const limpio = ref.trim();
  if (!limpio) return false;

  for (const obra of [...OBRAS_MIDRASH, ...OBRAS_HE]) {
    if (!limpio.toLowerCase().startsWith(obra.toLowerCase())) continue;
    // Lo que sigue al título: nada, un espacio, una coma o dos puntos. Si sigue
    // una letra, es otro libro que empieza igual y esto no era su título.
    const siguiente = limpio.slice(obra.length);
    if (siguiente === "" || /^[\s,:.]/.test(siguiente)) return true;
  }
  return false;
}
