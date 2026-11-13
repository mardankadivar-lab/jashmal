#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUARDIÁN DEL VERIFICADOR DE CITAS DE MIDRASH
 * ─────────────────────────────────────────────────────────────────────────
 *  El motor propone, el código juzga. Este guardián juzga al juez, con los
 *  dos bancos de siempre y dos más que vigilan el silencio:
 *
 *  1. CANÓNICOS — citas de Midrash REALES, verificadas por el Sofer, escritas
 *     como las escribe el motor (en medio de la prosa, en español, con las
 *     grafías que de verdad usa). Si el verificador marca una sola, EL
 *     VERIFICADOR ESTÁ MAL. Es la prueba más importante del archivo: marcar
 *     como falsa una cita buena desacredita el material bueno, que aquí es la
 *     inmensa mayoría.
 *
 *  2. FABRICACIONES — citas imposibles puestas a mano (capítulo que no
 *     existe, sección fuera de rango, parashá inventada). El verificador
 *     tiene que cazarlas TODAS.
 *
 *  3. LO QUE SEFARIA NO TIENE — citas que pueden ser buenas y que Sefaria no
 *     trae (capítulos que la obra declara pero deja vacíos, simanim que
 *     existen en la edición impresa). No se le exige verificarlas; se le
 *     exige NO marcarlas.
 *
 *  4. AMBIGUAS — obras y notaciones que el verificador no puede identificar
 *     ("Sifrí 50" son dos textos distintos, "Pirkei" son seis obras) y cosas
 *     que no son midrash. Aquí un "ok" es tan grave como un "falsa":
 *     significaría que opinó sobre lo que no podía entender.
 *
 *  Uso:  npm run midrash:check
 *  Sale con código ≠ 0 si falla cualquiera de los cuatro bancos.
 *  No usa red: la verificación entera es local (tablas en lib/sources).
 * ─────────────────────────────────────────────────────────────────────────
 */
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

// Resuelve los imports "@/..." del proyecto igual que lo hace Next.
const ROOT = pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), "..", "/")).href;
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith("@/")) return next(new URL(`${spec.slice(2)}.ts`, ROOT).href, ctx);
    return next(spec, ctx);
  },
});

const { checkCitations } = await import("@/lib/sources/citationCheck");

// ── Banco 1: citas reales. Ninguna debe marcarse. ──────────────────────────
// Verificadas una por una por el Sofer contra Sefaria el 2026-11-13, y
// escritas como las escribe el motor: en medio de la prosa, en español, con
// las grafías que de verdad usa. Entre corchetes, los casos-trampa: son
// CORRECTOS y son los que más fácilmente se marcarían por error.
const CANONICOS = [
  "Bereshit Rabá 1:1 enseña que amón se lee como umán, artesano: la Torá dice «yo fui la herramienta de oficio del Santo, bendito sea».",
  "Según Bereshit Rabá 1:4, seis cosas precedieron a la creación del mundo.",
  "Bereshit Rabá 1:10 pregunta por qué el mundo fue creado con bet: porque está cerrada por tres lados y abierta al frente.",
  "Bereshit Rabá 2:4 lee tohu vavohu como los cuatro reinos.",
  "Bereshit Rabá 8:1 trae a Rabí Yirmeyá ben Elazar: cuando el Santo creó al primer Adam, lo creó andrógino.",
  "Bereshit Rabá 9:7: de no ser por el yétzer hará nadie construiría casa.",
  "Bereshit Rabá 12:6 observa que todos los toldot de la Torá están escritos defectivos salvo dos.",
  "La parábola del palacio encendido —birá doléket— está en Bereshit Rabá 39:1.",
  "Bereshit Rabá 44:12: Dios lo subió por encima de la bóveda del cielo y le dijo «eres profeta, no astrólogo».",
  "Bereshit Rabá 68:9 explica por qué se llama a Dios HaMakom: Él es el lugar de Su mundo.",
  "Shemot Rabá 2:5 trae a Rabí Yanai: como en los gemelos, si a uno le duele la cabeza el otro lo siente.",
  "Vayikrá Rabá 34:8 pregunta quién hizo bondad con quienes no la necesitaban: Abraham, con los ángeles.",
  "Bamidbar Rabá 13:16: el valor numérico de yáyin es setenta, y así hay setenta caras en la Torá.",
  "Devarim Rabá 2:33 lee «teme a Hashem, hijo mío, vamélej» como umlój: reina sobre tu inclinación.",
  "Rut Rabá 5:9 trae en nombre de Rabí Yehoshúa: más de lo que el dueño de casa hace por el pobre, hace el pobre por el dueño.",
  "Kohelet Rabá 1:4: no hay día en que no nazcan seiscientos mil y no mueran seiscientos mil.",
  "Shir HaShirim Rabá 5:2: ábreme una abertura del tamaño del ojo de una aguja y Yo te abriré puertas por donde entran carruajes.",
  "Tanjumá, Noaj 3: la Torá Escrita es breve y la Oral es larga.",
  "Tanjumá, Koraj 12 explica las letras dobles מנצפ״ך: lej-lejá alude a que Abraham engendrará a Yitzjak a los cien.",
  "Midrash Tanjumá, Bereshit 1: la Torá fue escrita con letras de fuego negro sobre fuego blanco.",
  "Pesikta de Rav Kahaná 12:25: el Santo se les apareció con rostro severo, neutro, amable y risueño.",
  "Mejiltá de Rabí Yishmael, Shirá 3 lee el canto del mar como respuesta a lo que vieron.",

  // ── Casos-trampa que son CORRECTOS ──────────────────────────────────────
  // El capítulo MÁS ALTO de la obra: el último, no un invento.
  "Bereshit Rabá 100:13: el Santo transformará ese duelo en alegría.",
  // La sección más alta de la obra en su primer capítulo.
  "Shemot Rabá 1:36: «y Dios supo» — supo que estaban destinados a decir naasé antes de nishmá.",
  // La última sección del capítulo, justo en el borde.
  "Shemot Rabá 30:24: cuando el juez juzga con verdad, el Santo posa Su Presencia junto a él.",
  // La sección más alta de todo Bamidbar Rabá.
  "Bamidbar Rabá 9:49: «esta es la ley de los celos» — así como el Santo castigó con celo a los adoradores del becerro.",
  // La última sección del capítulo 63 (y el motor a veces la cita como 13).
  "Bereshit Rabá 63:13: Reish Lakish dice que Esav empezó a maldecir y blasfemar.",
  // PETIJTÁ: notación propia, que /api/shape no ve. La cita más conocida de
  // la obra; si el verificador la tacha, tacha lo mejor que tenemos.
  "Eikhá Rabá, Petijtá 24 abre con Rabí Yojanán sobre «el valle de la visión».",
  "Eijá Rabá, Petijtá 2 lee el llanto de la noche.",
  // Obra citada SIN sección, solo capítulo.
  "Pirkei de Rabí Eliezer 3 abre con «¿quién puede expresar los actos poderosos de Hashem?».",
  // Piska SUELTA: la única notación que funciona en estas obras.
  "Pesikta Rabati 29 es el midrash de «llora amargamente de noche», para Tishá be\u2019Av.",
  "Sifrí Devarim 343: Moshé no abrió su bendición con las necesidades de Israel, sino con la alabanza del Omnipresente.",
  "Sifrí Bamidbar 161: amados son Israel, pues dondequiera fueron exiliados la Shejiná fue con ellos.",
  // Nombre hebreo de la obra.
  "En בראשית רבה 1:10 la bet marca el límite de la pregunta permitida.",
  // RANGO de secciones: el hilo sigue en la siguiente.
  "El hilo completo está en Bereshit Rabá 12:6-7.",
  // Orden invertido del nombre, y el nombre inglés de Sefaria.
  "El Midrash Rabbah (Bereishit 63:8) ya intuye esta lectura.",
  "Midrash Rabá Bereshit 47:1 cuenta que la yod de Sarai no se quedó sin casa.",
  // Prosa delante de la cita: lo normal en un estudio.
  "como enseña Rabí Yehudá en nombre de su maestro en Vayikrá Rabá 36:4, el mérito de los padres sostiene a los hijos",
];

// ── Banco 2: fabricaciones. Todas deben cazarse. ───────────────────────────
// Comprobadas como inexistentes por el Sofer (404 en Sefaria).
const FABRICACIONES = [
  "Bereshit Rabá 150:2 dice que la tierra calló",      // tiene 100 capítulos
  "Bereshit Rabá 1:40",                                 // el cap. 1 tiene 15 secciones
  "Bereshit Rabá 12:25",                                // el cap. 12 tiene 16
  "Bereshit Rabá 63:20",                                // el cap. 63 tiene 14
  "Shemot Rabá 60:1",                                   // tiene 52 capítulos
  "Shemot Rabá 30:30",                                  // el cap. 30 tiene 24
  "Vayikrá Rabá 40:2",                                  // tiene 37 capítulos
  "Vayikrá Rabá 1:20",                                  // el cap. 1 tiene 15
  "Bamidbar Rabá 25:3",                                 // tiene 23 capítulos
  "Bamidbar Rabá 23:20",                                // el cap. 23 tiene 14
  "Devarim Rabá 2:40",                                  // el cap. 2 tiene 38
  "Devarim Rabá 11:15",                                 // el cap. 11 tiene 10
  "Eikhá Rabá 6:1",                                     // tiene 5 capítulos
  "Eikhá Rabá 1:60",                                    // el cap. 1 tiene 57
  "Eikhá Rabá, Petijtá 36",                             // la Petijtá llega a 34
  "Ester Rabá 11:2",                                    // tiene 10 capítulos
  "Ester Rabá, Petijtá 13",                             // la Petijtá llega a 12
  "Rut Rabá 12:4",                                      // tiene 9 capítulos
  "Rut Rabá, Petijtá 8",                                // la Petijtá llega a 7
  "Kohelet Rabá 13:1",                                  // Kohélet tiene 12 capítulos
  "Shir HaShirim Rabá 9:1",                             // tiene 8 capítulos
  "Tanjumá, Terumá 15",                                 // Terumá tiene 11 simanim
  "Tanjumá, Shoftim 25",                                // Shoftim tiene 19
  "Tanjumá, Lej Lejá 21",                               // Lej Lejá tiene 20
  "Tanjumá, Jayé Sará 9",                               // Jayé Sará tiene 8
  "Pirkei de Rabí Eliezer 60:1",                        // tiene 54 capítulos
  "Pesikta de Rav Kahaná 35:2",                         // tiene 28 piskaot
  "Sifrí Devarim 400:1",                                // tiene 357 piskaot
  "Sifrí Bamidbar 200:1",                               // tiene 161 piskaot
  "Midrash Mishlei 35:1",                               // tiene 31 capítulos
  "Midrash Tehilim 151:1",                              // el salterio tiene 150
  "Mejiltá de Rabí Yishmael, Shirá 30",                 // Shirá tiene 10 parashiyot
  "Tanjumá Buber, Vaetjanán 40",                        // en Buber, Vaetjanán tiene 6
];

// ── Banco 3 y 4: el silencio. ─────────────────────────────────────────────
// Tres clases de silencio, y las tres son la mitad más importante del diseño:
//
//  1. CITAS QUE PUEDEN SER BUENAS y Sefaria no tiene. El Sofer las comprobó:
//     dan 404, pero el simán existe en la edición impresa. Marcarlas sería
//     tachar trabajo bueno — exactamente lo que este proyecto no hace.
//  2. OBRAS Y NOTACIONES AMBIGUAS. "Sifrí 50" son dos textos distintos;
//     "Midrash Rabá" son diez obras; "Pirkei" son seis. Sin nombre completo,
//     el verificador no tiene derecho a opinar.
//  3. LO QUE NO ES MIDRASH. Un salmo o un versículo que solo PARECE un
//     midrash no se juzga con la tabla del midrash.
// Banco 3 — El Sofer comprobó que estas dan 404 en Sefaria y que, aun así, la
// cita puede ser buena: el tramo existe en la edición impresa y es Sefaria
// quien está incompleto. Pueden quedar sin juzgar o darse por buenas; lo que
// NO pueden es marcarse, porque sería tachar trabajo bueno.
const NO_MARCABLES = [
  "Devarim Rabá 14:3",          // caps. 12-17 declarados pero vacíos
  "Rut Rabá 9:1",               // cap. 9 declarado, vacío
  "Midrash Tehilim 43:1",       // salmo ausente de Shojer Tov
  "Midrash Tehilim 96:2",       // ídem
  "Tanjumá, Ki Tavó 5",         // existe impreso, falta en Sefaria
  "Pesikta Rabati 21:5",        // la piska 21 impresa sí tiene párrafos
  "Midrash Tehilim 90:3",       // obra sin segmentación fiable: solo el salmo
  "Midrash Mishlei 10:1",       // ídem
];

// Banco 4 — obras y notaciones que NO se pueden identificar, y cosas que no
// son midrash. Aquí un "ok" es tan grave como un "falsa".
const AMBIGUAS = [
  "el Midrash Rabá 12:6 lo discute",   // diez obras se llaman así
  "Tanjumá 7",                         // sin parashá no identifica nada
  "Sifrí 50",                          // Bamidbar y Devarim numeran aparte
  "Pesiktá 12:3",                      // de Rav Kahaná o Rabati
  "Pirkei 3:2",                        // Avot, de R. Eliezer, Shirá…
  "Pirkei Avot 5:22",                  // otra obra: mishná, no midrash
  "Bereshit Rabatí 10:2",              // obra distinta (R. Moshé HaDarshán)
  "Mejiltá 12:4",                      // de R. Yishmael o de R. Shimón
  "Yalkut Shimoní, Bereshit 16",       // tres notaciones incompatibles: fuera
  "Sifrá, Kedoshim 4:12",              // Sefaria la parte con dos numeraciones
  "Avot de Rabí Natán 4:1",            // dos versiones con numeración distinta
  "Tehilim 23:4 dice que no temeré mal alguno",
  "Mishlei 3:5",
  "Bereshit 12:6",
  "el midrash de la hoja 12 no existe", // "hoja" no es "Eikhá"
];

function midrash(line) {
  return checkCitations(line).findings.filter((f) => f.kind === "midrash");
}

let errores = 0;

console.log("── CANÓNICOS (ninguno debe marcarse) ──");
for (const line of CANONICOS) {
  const all = midrash(line);
  const bad = all.filter((f) => f.verdict === "false");
  if (bad.length > 0) {
    errores++;
    console.log(`  ✗ FALSO POSITIVO: ${line}`);
    for (const f of bad) console.log(`      «${f.raw}» → ${f.detail}`);
  } else {
    const ok = all.filter((f) => f.verdict === "ok").length;
    const unk = all.filter((f) => f.verdict === "unknown").length;
    const nota = ok > 0 ? `(${ok} verificada${ok > 1 ? "s" : ""})` : unk > 0 ? "(sin juzgar)" : "(no detectada)";
    console.log(`  ✓ ${nota.padEnd(16)} ${line.slice(0, 62)}`);
  }
}

console.log("\n── FABRICACIONES (todas deben cazarse) ──");
for (const line of FABRICACIONES) {
  const bad = midrash(line).filter((f) => f.verdict === "false");
  if (bad.length === 0) {
    errores++;
    console.log(`  ✗ SE ESCAPÓ: ${line}`);
  } else {
    console.log(`  ✓ cazada: «${bad[0].raw}» → ${bad[0].detail}`);
  }
}

console.log("\n── LO QUE SEFARIA NO TIENE (ninguna debe marcarse) ──");
for (const line of NO_MARCABLES) {
  const bad = midrash(line).filter((f) => f.verdict === "false");
  if (bad.length > 0) {
    errores++;
    console.log(`  ✗ TACHÓ UNA CITA QUE PUEDE SER BUENA: ${line}`);
    for (const f of bad) console.log(`      «${f.raw}» → ${f.detail}`);
  } else {
    console.log(`  ✓ no la marcó: ${line}`);
  }
}

console.log("\n── AMBIGUAS (ninguna debe recibir veredicto) ──");
for (const line of AMBIGUAS) {
  const judged = midrash(line).filter((f) => f.verdict !== "unknown");
  if (judged.length > 0) {
    errores++;
    console.log(`  ✗ JUZGÓ LO QUE NO PUEDE IDENTIFICAR: ${line}`);
    for (const f of judged) console.log(`      «${f.raw}» → ${f.verdict}: ${f.detail}`);
  } else {
    console.log(`  ✓ calló: ${line.slice(0, 62)}`);
  }
}

if (errores > 0) {
  console.error(`\n✗ ${errores} fallo(s) en el verificador de Midrash.`);
  process.exit(1);
}
console.log(
  `\n✓ ${CANONICOS.length} canónicos limpios · ${FABRICACIONES.length} fabricaciones cazadas · ` +
    `${NO_MARCABLES.length} tramos ausentes respetados · ${AMBIGUAS.length} ambiguas sin juzgar.`
);
