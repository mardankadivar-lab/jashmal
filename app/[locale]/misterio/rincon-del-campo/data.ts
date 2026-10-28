
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — פְּאַת שָׂדְךָ · el rincón del campo
//  Serie «Tiempos Sagrados» (moadim) · Estudio 1·bis — la ley del pobre
//  incrustada en medio del calendario de las fiestas (Vayikrá 23:22).
//
//  Hero en modo "frase": SIN gematría (por instrucción expresa).
//
//  FUENTES VERIFICADAS CONTRA SEFARIA (2026-09-23).
//  Expediente completo: ~/jashmal-produccion/pea/FUENTES-VERIFICADAS.md
//
//   POSICIÓN (contada sobre el texto hebreo de los 44 versículos):
//    · 23:15-21 Shavuot · 23:22 la peá · 23:23-25 Rosh Hashaná. Exacto.
//    · 23:22 lleva פ (petujá) al final: forma bloque propio entre los dos.
//    · Anillo מועד: 6 ocurrencias en 4 versículos — 23:2 (×2), 23:4 (×2),
//      23:37, 23:44. Abre y cierra con מוֹעֲדֵי יְהוָה. La última (23:44) es
//      defectiva (מֹעֲדֵי, sin vav): se anota como dato, sin doctrina encima.
//    · "אֲשֶׁר־תִּקְרְאוּ אֹתָם" 3 veces: 23:2, 23:4, 23:37 — las mismas tres del
//      midrash de Rosh Hashaná 25a. Contadas una por una.
//
//   COMENTARISTAS (todos cotejados literal):
//    · Rashi 23:22 — R' Avdimí bar R' Yosef; "כְּאִלּוּ בָּנָה בֵּית הַמִּקְדָּשׁ".
//    · Sifra, Emor, Cap. 13:11 — su fuente. Y DICE OTRA COSA: "כאילו בית
//      המקדש קיים" (que el Templo ESTÉ EN PIE), no que tú lo edificaras.
//      Rashi sube la apuesta. Además la Sifra lista 4 dones (incluye maaser
//      aní) y trae la mitad negativa que Rashi omite.
//    · Ibn Ezra 23:22 — "בעבור כי חג שבועות בכורי קציר חטים": razón de pshat.
//    · Ramban 23:22 — "שלא תדחה המצוה ההיא את הלאוין האלה".
//    · Or HaJaim 23:22 — el campo del ómer sigue obligado.
//    · Kli Yakar 23:22 — OBJETA a Rashi: "מה ענין קרבנות למתנות עניים?".
//      (Su cita a Bamidbar Rabá 17:5 se verificó: el midrash existe, pero
//       trae Devarim 24:19 para la siega, no Vayikrá 23:22. Kli Yakar adapta.)
//    · Sforno 23:22 — "מלח ממון חסר, ואמרי לה חסד" (Ketubot 66b).
//
//   MIDRASH Y JASIDUT:
//    · Vayikrá Rabá 29:5 — el midrash de ROSH HASHANÁ abre mirando hacia
//      arriba: "מה כתיב למעלה מן הענין: לא תכלה פאת שדך".
//    · Maor VaShemesh, Emor 3 — abre con la misma pregunta de Mardan:
//      "הדקדוק הוא מה ענין פאה לבין מועדות".
//
//   TALMUD Y HALAJÁ:
//    · Rosh Hashaná 25a — "אתם אפילו שוגגין… מזידין… מוטעין"; y R' Yehoshúa:
//      "עקיבא נחמתני, נחמתני".
//    · Ketubot 66b — la hija de Nakdimón ben Gurión "מלקטת" (misma raíz que
//      "ולקט קצירך לא תלקט") cebada de entre el estiércol.
//    · Mishná Peá 1:1 — la peá encabeza las "cosas sin medida", junto a los
//      bikurim y el reayón (ofrendas de peregrinación).
//    · Mishná Peá 1:2 / Rambam Matnot Aniyim 1:15 — 1/60. Variante textual:
//      "רוב הענוה" (impresa) vs "ברכת הזרע" (Rambam). Se anota.
//    · Rambam, Matnot Aniyim 1:1, 1:2, 1:15 — incluida la peá del pan ya
//      horneado (1:2), que es la base del maasé.
//    · Tosefta Peá 2:13 — "אין בהן משום טובה".
//    · Rashi 23:22 (2ª glosa) — "הנח לפניהם והם ילקטו": no eliges a quién.
//
//   FUERA POR NO VERIFICADO: Baal Shem Tov (tristeza=klipá; "en todas
//   vuestras moradas") — no localizado. Arizal del ómer/Partzufim — sin
//   folio y fuera de eje. Baal HaSulam — no cotejado.
//   FUERA POR FALSO: "Rashi a 23:15 polemiza con saduceos/caraítas" (es
//   Menajot 65a-b y, elípticamente, Ibn Ezra). "Ramban a 23:2 sostiene lo
//   del tribunal humano" (lo cita de רבותינו y NO lo adopta).
//
//   LECTURA NUESTRA, ROTULADA: "la peá es tzimtzum hecho por manos humanas".
//   No localicé fuente. Va en `jidush`, fuera del cuerpo sellado.
//
//   SOLAPE DECLARADO: /misterio/shavuot ya trae 23:22 + la pregunta de Rashi
//   + el Sifrá, como puente hacia Rut. Aquí NO se repite ese movimiento y se
//   enlaza a aquel estudio desde el umbral.
//
//   GEMATRÍAS: ninguna. Por instrucción.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "rincon-del-campo",

  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 1·bis — el rincón del campo · la ley que interrumpe el calendario",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۱·مکرر — گوشهٔ کشتزار · قانونی که تقویم را قطع می‌کند",
    he: "לֹא תְכַלֶּה פְּאַת שָׂדְךָ",
    titulo: "El rincón del campo",
    tituloFa: "گوشهٔ کشتزار",
    ganchoEs:
      "La Torá está enumerando las fiestas del año, una tras otra, en orden. Y de golpe, sin aviso, entre Shavuot y Rosh Hashaná, se detiene para hablar de un hombre con hambre. Después sigue como si nada. Ese corte es el estudio.",
    ganchoFa:
      "تورات جشن‌های سال را یکی پس از دیگری و به ترتیب برمی‌شمارد. و ناگهان، بی‌هیچ هشداری، میان شاووعوت و روش هشانا می‌ایستد تا از مردی گرسنه سخن بگوید. سپس چنان ادامه می‌دهد که گویی هیچ نشده. همین گسست، موضوع این مطالعه است.",
    fecha: "Vayikrá 23:22 · parashá Emor",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — dos cosas antes de empezar",
    rotulo: "Se dicen de entrada, para que nadie tenga que adivinarlas después.",
    parrafos: [
      `Primera: este estudio NO dice que la caridad sustituya a la fiesta, ni que el rito sea secundario, ni que dar al pobre sea "la verdadera fiesta" y lo demás decoración. Ninguna fuente de las que se citan aquí dice eso, y varias dicen exactamente lo contrario. Lo que el capítulo hace es más fino y más incómodo: no reemplaza una cosa por otra, las cose. La peá no está en lugar de las fiestas — está DENTRO de ellas.`,
      `Segunda, por honestidad con quien ya nos lee: un párrafo de este asunto ya vive en el {{study:shavuot|estudio de Shavuot}}, donde la posición de este versículo sirve de puente hacia el libro de Rut. Aquí no se repite aquel camino. Aquí se pregunta lo que allá no se preguntó: qué pasa cuando cuatro comentaristas clásicos miran el mismo corte y dan cuatro respuestas distintas — y uno de ellos le dice a Rashi, en su cara, que su respuesta no cierra.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "El versículo — Vayikrá 23:22",
        he: "וּֽבְקֻצְרְכֶם אֶת־קְצִיר אַרְצְכֶם לֹֽא־תְכַלֶּה פְּאַת שָֽׂדְךָ בְּקֻצְרֶךָ וְלֶקֶט קְצִירְךָ לֹא תְלַקֵּט לֶעָנִי וְלַגֵּר תַּעֲזֹב אֹתָם אֲנִי יְהוָה אֱלֹהֵיכֶם",
        es: "Y cuando sieguen la siega de su tierra, no acabarás el rincón de tu campo al segar, y la espiga caída de tu siega no recogerás; para el pobre y para el forastero los dejarás. Yo, Adonai, su Dios.",
        source: "Vayikrá 23:22",
      },
    ],
    parrafos: [
      `Hay que ver primero dónde cae, porque el sitio es el argumento. El capítulo 23 de Vayikrá es el calendario: el Santo le dicta a Moshé las מוֹעֲדֵי יְהוָה, los tiempos fijados, uno por uno y en orden. Pésaj. La ofrenda del ómer. Los cuarenta y nueve días contados. Shavuot, que cierra en el versículo 21 con la fórmula de siempre: "y proclamarán en este mismo día una convocación santa". Hasta ahí, un texto administrativo, casi litúrgico.`,
      `Entonces viene el 22. Y el 22 no habla de fiestas. Habla de un hombre segando un campo al que se le ordena parar antes de llegar al borde. Y en el 23 la Torá retoma el hilo exactamente donde lo dejó, sin explicar nada: "en el séptimo mes, el primero del mes… memorial de terúa" — Rosh Hashaná. Los rangos son exactos y se contaron sobre el texto hebreo: Shavuot ocupa del 15 al 21, la peá es el 22, Rosh Hashaná empieza en el 23.`,
      `Y hay un detalle que no se ve en ninguna traducción, porque no es una palabra: es una marca. El versículo 22 lleva una פ al final — una petujá, corte de párrafo abierto en el texto masorético. No es que la ley del pobre se haya deslizado entre dos bloques como quien se cuela en una fila. Está tipográficamente aislada, formando bloque propio, con espacio en blanco a los dos lados. La Torá no la escondió entre las fiestas. La puso ahí, sola, en medio, donde nadie pueda saltársela.`,
      `Glosa de las tres palabras que hacen falta. פֵּאָה (peá) es "rincón, borde, extremo": lo que queda sin segar en la esquina del campo. לֶקֶט (léket) es "espigueo": lo que se le cae de la mano al segador y tiene prohibido volver a recoger. Y תַּעֲזֹב (taazov), el verbo con el que se entregan, no significa "dar" — significa "dejar, abandonar, soltar". Tres palabras, y ninguna describe un acto de generosidad. Describen un acto de retirada.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: 'Rashi (רַשִׁ"י).',
        texto: `Rashi ve el problema y lo dice sin rodeos, citando a un sabio del midrash: "אָמַר ר' אַבְדִּימֵי בְּרַבִּי יוֹסֵף: מָה רָאָה הַכָּתוּב לִתְּנָהּ בְּאֶמְצַע הָרְגָלִים — פֶּסַח וַעֲצֶרֶת מִכָּאן, וְרֹאשׁ הַשָּׁנָה וְיוֹם הַכִּפּוּרִים וְחַג מִכָּאן?" — "¿qué vio la Escritura para ponerla EN MEDIO de las festividades: Pésaj y Atzéret de un lado, y Rosh Hashaná, Yom Kipur y la Fiesta del otro?". Es decir: Rashi no suaviza la extrañeza, la subraya. Y responde: "לְלַמֶּדְךָ שֶׁכָּל הַנּוֹתֵן לֶקֶט שִׁכְחָה וּפֵאָה לֶעָנִי כָּרָאוּי, מַעֲלִין עָלָיו כְּאִלּוּ בָּנָה בֵּית הַמִּקְדָּשׁ וְהִקְרִיב קָרְבְּנוֹתָיו בְּתוֹכוֹ" — para enseñarte que todo el que da al pobre el espigueo, lo olvidado y el rincón del campo como es debido, se le cuenta como si hubiera edificado el Templo y ofrecido dentro sus sacrificios.`,
      },
      {
        etiqueta: "Lo que Rashi le hizo a su fuente.",
        texto: `Aquí hay algo que solo aparece si uno va a buscar la fuente y la pone al lado. Rashi cita la Sifra (Emor, capítulo 13:11), el midrash halájico de Vayikrá. Y la Sifra NO dice lo que Rashi escribe. La Sifra dice: "מַעֲלִים עָלָיו כְּאִלּוּ בֵּית הַמִּקְדָּשׁ קַיָּם וְהוּא מַקְרִיב קָרְבְּנוֹתָיו לְתוֹכוֹ" — se le cuenta como si el Templo ESTUVIERA EN PIE y él ofreciera dentro sus sacrificios. La Sifra le devuelve al hombre un Templo que ya no existe. Rashi cambia una palabra: "כְּאִלּוּ בָּנָה" — como si lo hubiera EDIFICADO. La Sifra dice que el Templo está de pie; Rashi dice que tú lo levantaste. Y hay dos diferencias más, que también se comprueban abriendo los dos textos: la Sifra lista cuatro dones (añade el diezmo del pobre) y trae además la mitad que Rashi corta — "y todo el que NO los saca, se le cuenta como si el Templo estuviera en pie y él no ofreciera dentro". La amenaza estaba en el original.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Ibn Ezra contesta la misma pregunta sin una gota de homilía, y por eso vale doble: "וְטַעַם לְהַזְכִּיר 'וּבְקֻצְרְכֶם אֶת קְצִיר אַרְצְכֶם' פַּעַם שֵׁנִית, בַּעֲבוּר כִּי חַג שָׁבוּעוֹת בִּכּוּרֵי קְצִיר חִטִּים, הִזְהִיר שֶׁלֹּא תִּשְׁכַּח מַה שֶּׁצִּוִּיתִיךָ לַעֲשׂוֹת בַּיָּמִים הָהֵם" — la razón de repetirlo aquí es que Shavuot son las primicias de la siega del trigo; te advierte que no olvides lo que te mandé hacer en esos días. Traducción: el versículo no está ahí por simbolismo. Está ahí porque en Shavuot tienes la hoz en la mano. La ley del pobre aparece en el momento del año en que hay algo que segar.`,
      },
      {
        etiqueta: 'Ramban (רַמְבַּ"ן) y Or HaJaim (אוֹר הַחַיִּים).',
        texto: `Ramban repasa a los dos anteriores y luego dice "וְהַנָּכוֹן בְּעֵינַי" — lo correcto a mis ojos — y propone algo más filoso: "ובקצרכם" remite a la siega del ómer mencionada arriba, en el versículo 10. Es decir, el campo del que sale la ofrenda del altar. Y entonces: "לֹא תְּכַלֶּה פְּאַת הַשָּׂדֶה הַהוּא לְצֹרֶךְ הָעֹמֶר… לוֹמַר שֶׁלֹּא תִּדְחֶה הַמִּצְוָה הַהִיא אֶת הַלָּאוִין הָאֵלֶּה" — no acabarás el rincón de aquel campo ni siquiera para el ómer, para decirte que esa mitzvá no desplaza estas prohibiciones. Or HaJaim llega por su cuenta al mismo sitio: no vaya a ser que razones "como su primicia se segó para un sacrificio, el campo queda exento". Los dos están respondiendo a la misma tentación, y es una tentación religiosa, no económica: creer que lo que le diste a Dios te descuenta de lo que le debes al hombre.`,
      },
      {
        etiqueta: "Kli Yakar (כְּלִי יָקָר) — la objeción.",
        texto: `Y aquí un comentarista clásico dice en voz alta lo que el lector honesto está pensando desde hace tres párrafos. Kli Yakar, después de exponer la respuesta de Rashi, escribe: "אֲבָל לְפֵרוּשׁ רַשִׁ"י קָשֶׁה: מָה עִנְיַן קָרְבָּנוֹת לְמַתְּנוֹת עֲנִיִּים?" — pero según la explicación de Rashi hay una dificultad: ¿qué tienen que ver los sacrificios con los dones a los pobres? Son dos mundos. Uno es altar, fuego, sacerdocio; el otro es un saco de cebada en el borde de un terreno. La analogía suena bonita y no explica nada. Kli Yakar mismo ofrece la salida, y es modesta a propósito: "יֵשׁ קְצָת דִּמְיוֹן בֵּינֵיהֶם" — hay ALGO de semejanza entre ellos, porque la mayor parte de los sacrificios se los comen los kohanim דֶּרֶךְ צְדָקָה, a modo de caridad. O sea: el parecido no está en la solemnidad. Está en que, al final, en los dos casos alguien come.`,
      },
      {
        etiqueta: "Maor VaShemesh — un jasid hace la misma pregunta.",
        texto: `Vale la pena saber que la extrañeza de este versículo no es un descubrimiento moderno ni una ocurrencia nuestra. Rabí Kalonymus Kalman Epstein de Cracovia abre su comentario a este pasaje exactamente así: "הַדִּקְדּוּק הוּא מַה עִנְיַן פֵּאָה לְבֵין מוֹעֲדוֹת" — la cuestión precisa es qué tiene que ver la peá en medio de las moadot. Y añade una segunda pregunta que casi nadie hace: "לָמָּה כָּתַב הַכָּתוּב לְשׁוֹן פֵּאָה דַּוְקָא" — ¿por qué la Escritura usó justamente la palabra "peá" y no otra de las varias que significan "extremo"? La misma palabra, פֵּאָה, es la que aparece en "לֹא תַקִּיפוּ פְּאַת רֹאשְׁכֶם", el borde de la cabeza. El borde del campo y el borde del hombre se llaman igual.`,
      },
    ],
    glosa:
      'Tres nombres que conviene tener claros. La SIFRA (también llamada Torat Kohanim) es el midrash halájico de Vayikrá: del siglo III, mucho más antiguo que Rashi, y es de donde Rashi saca casi todo lo que dice sobre este libro. El KLI YAKAR es Rabí Shlomo Efraim de Luntschitz (Praga, s. XVI-XVII), famoso precisamente por no dejar pasar las respuestas que no cierran. Y MAOR VASHEMESH es Rabí Kalonymus Kalman Epstein (Cracovia, s. XVIII-XIX), de la segunda generación jasídica. Tres épocas, tres estilos, y los tres frenaron en el mismo versículo.',
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat · el corte es real y está medido",
        parrafos: [
          `En el sentido llano no hay misterio que resolver, hay un hecho que constatar: el capítulo se interrumpe. Y se interrumpe con marcas. La cuenta se hizo sobre el texto hebreo, versículo por versículo: la raíz מוֹעֵד — "tiempo fijado", "fiesta" — aparece seis veces en todo el capítulo, y solo en cuatro versículos: dos veces en el 2, dos veces en el 4, una en el 37 y una en el 44. El capítulo abre en el 2 con "מוֹעֲדֵי יְהוָה" y cierra en el 44 con "וַיְדַבֵּר מֹשֶׁה אֶת־מֹעֲדֵי יְהוָה אֶל־בְּנֵי יִשְׂרָאֵל". Es un anillo: se entra y se sale por la misma puerta.`,
          `Dentro de ese anillo cerrado, todo es calendario — menos un versículo. Y ese versículo, además, está separado por una petujá a cada lado. El pshat, entonces, dice esto y nada más: alguien puso deliberadamente una ley agrícola sobre los pobres dentro de un anillo literario dedicado a las fiestas, y la aisló para que se notara. Todo lo que sigue es un intento de explicar por qué.`,
        ],
      },
      {
        head: "רֶמֶז — Rémez · el calendario ya estaba en manos humanas",
        parrafos: [
          `Hay una alusión que solo se ve contando. La fórmula "אֲשֶׁר־תִּקְרְאוּ אֹתָם" — "que ustedes proclamarán" — aparece tres veces en el capítulo: en el 2, en el 4 y en el 37. Contadas una por una. Y el Talmud hace con esas tres exactamente lo que hay que hacer con ellas.`,
          `En Rosh Hashaná 25a, Rabán Gamliel obliga a Rabí Yehoshúa a presentarse con su bastón y su dinero en el día que, según los cálculos de Rabí Yehoshúa, era Yom Kipur — para forzarlo a aceptar el veredicto del tribunal. Rabí Yehoshúa queda destrozado. Y entonces Rabí Akivá le dice: "הֲרֵי הוּא אוֹמֵר 'אֹתָם' 'אֹתָם' 'אֹתָם' שָׁלֹשׁ פְּעָמִים" — mira que dice "otam", "otam", "otam", tres veces. Y lee אֹתָם (a ellas) como אַתֶּם (ustedes): "אַתֶּם אֲפִילּוּ שׁוֹגְגִין, אַתֶּם אֲפִילּוּ מְזִידִין, אַתֶּם אֲפִילּוּ מוּטְעִין" — ustedes, aun equivocándose sin querer; ustedes, aun a sabiendas; ustedes, aun inducidos a error. Rabí Yehoshúa le responde con una de las frases más humanas del Talmud: "עֲקִיבָא, נִחַמְתַּנִי, נִחַמְתַּנִי" — Akivá, me has consolado, me has consolado.`,
          `El rémez está en que ese capítulo es el mismo. Las tres veces que la Torá pone el calendario en manos de hombres falibles son los tres versículos que forman el anillo alrededor de la peá. La fiesta depende de que alguien la proclame; y en el centro de ese anillo hay un hombre esperando a que alguien le deje algo.`,
        ],
      },
      {
        head: "דְּרָשׁ — Drash · el midrash de Rosh Hashaná mira hacia atrás",
        parrafos: [
          `Aquí está el dato que cierra el argumento de Mardan desde el otro lado, y no es lectura nuestra: es el midrash haciéndolo explícitamente. Vayikrá Rabá capítulo 29 es la sección de Rosh Hashaná — es donde se enseña que el mundo fue creado el 25 de Elul, donde se juzga a Adam, donde está todo lo que se predica cada año sobre el día del juicio. Y una de sus piezas, 29:5, abre así: Rabí Berejiá en nombre de Rabí Yirmiá cita "senda de vida hacia arriba para el que entiende" (Mishlé 15:24), lo aplica "לְמִי שֶׁמִּסְתַּכֵּל לְמִצְוֹתֶיהָ שֶׁל תּוֹרָה", a quien mira las mitzvot de la Torá, y pregunta: "מַה כְּתִיב לְמַעְלָה מִן הָעִנְיָן? (ויקרא כג, כב): לֹא תְכַלֶּה פְּאַת שָׂדְךָ" — ¿qué está escrito ARRIBA del asunto? "No acabarás el rincón de tu campo".`,
          `Léelo despacio. El midrash que va a hablar del juicio del mundo empieza levantando la vista al versículo de más arriba, y lo que encuentra es la peá. No pregunta qué viene después del juicio: pregunta qué viene antes. Y lo que viene antes, en el texto, es un campo con una esquina sin segar. Rashi dijo que quien deja la peá es como si edificara el Templo; el midrash de Rosh Hashaná dice algo más práctico y más duro: la peá es el escalón inmediatamente anterior al día en que te van a juzgar.`,
        ],
      },
      {
        head: "סוֹד — Sod · una ley que manda no-terminar",
        parrafos: [
          `El secreto no está en lo que el versículo manda dar. Está en cómo lo formula. La Torá tenía mil maneras de ordenar la caridad —"darás", "apartarás", "entregarás"— y eligió una construcción negativa: לֹא תְכַלֶּה, de la raíz כ־ל־ה, que significa acabar, consumir, agotar, llevar algo hasta su fin. No dice "da al pobre". Dice: no termines. Deja el trabajo incompleto a propósito.`,
          `Y el verbo con que se entrega es תַּעֲזֹב, que tampoco significa dar: significa soltar, dejar, abandonar. Rashi lo explica en la glosa siguiente del mismo versículo, citando la Mishná: "הַנַּח לִפְנֵיהֶם וְהֵם יִלְקְטוּ, וְאֵין לְךָ לְסַיֵּעַ לְאֶחָד מֵהֶם" — déjalo delante de ellos y que ellos recojan; y no te corresponde ayudar a ninguno en particular. El dueño no reparte, no elige, no reconoce caras, no recibe gracias. Se retira y se va. La Tosefta lo dice sin poesía: "אֵין בָּהֶן מִשּׁוּם טוֹבָה" — en estos dones no hay favor. No le estás haciendo un favor a nadie. Ese rincón dejó de ser tuyo en el momento en que el campo fue tuyo.`,
          `Y la halajá confirma que esto no es una figura retórica. La Mishná abre el tratado Peá con la lista de "cosas que no tienen medida", y la primera de todas es la peá — junto a los bikurim y al רֵאָיוֹן, la ofrenda de presentarse en el Templo en las fiestas. Es decir: cuando los Sabios clasificaron la peá, la pusieron en la misma familia que las ofrendas de peregrinación. El parentesco que Rashi afirma por homilía, la Mishná ya lo tenía por categoría.`,
        ],
      },
    ],
    caja: {
      titulo:
        "Cuatro respuestas a una sola pregunta — y ninguna anula a las otras",
      cuerpo:
        "Rashi: está ahí porque dejar la peá equivale a edificar el Templo. Ibn Ezra: está ahí porque en Shavuot tienes la hoz en la mano. Ramban y Or HaJaim: está ahí porque ni la ofrenda del altar te exime del rincón. Kli Yakar: está ahí, pero la respuesta de Rashi no cierra — y lo único que de verdad emparenta el sacrificio con la peá es que en ambos casos alguien come. Cuatro filos del mismo corte. El estudio no elige uno: los deja sonar juntos, que es como suenan en la página.",
    },
  },

  hitbonenut: {
    intro:
      "Hasta aquí el texto y quienes lo leyeron. Ahora lo que hace este corte cuando uno lo deja caer sobre la propia vida. Nada nuevo se introduce: solo se mira lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña esta interrupción?",
        texto: `Que mi calendario tiene el mismo problema que el capítulo. Yo también tengo mis tiempos fijados y ordenados: el trabajo, las fechas, lo que celebro, lo que preparo con semanas de anticipación. Y la Torá no me pide que abandone esa lista — la escribió Ella. Me pide que dentro de esa lista, en el sitio más inconveniente, quede un espacio que no administro yo. La peá no se pone al final del año, cuando sobra. Se pone en medio, entre dos cosas importantes, interrumpiendo. Si solo doy cuando ya terminé todo lo mío, no estoy dejando peá: estoy repartiendo sobras, que es exactamente lo que el verbo לֹא תְכַלֶּה prohíbe, porque para que haya sobras primero hubo que acabar.`,
      },
      {
        etiqueta: "¿Qué patrón veo?",
        texto: `El patrón es que todo aquí es incompletud deliberada. El campo se siega mal a propósito. El segador tiene prohibido agacharse a recoger lo que se le cayó. Y el dueño ni siquiera puede quedarse a ver quién viene: "déjalo delante de ellos y que ellos recojan". Tres formas distintas de lo mismo — una mano que se detiene antes de cerrarse. Y hay un eco en la palabra: la peá del campo y la פְּאַת רֹאשְׁכֶם, el borde de la cabeza que tampoco se rapa del todo, llevan el mismo nombre, como señala Maor VaShemesh. El hombre tampoco se termina a sí mismo.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `En que descoloca mi idea de lo que me hace bueno. Lo más difícil de este versículo no es dar — dar es fácil cuando uno decide a quién, cuánto y con qué cara. Lo difícil es no enterarme. No saber quién vino, no elegirlo, no recibir el gracias, no tener un rostro agradecido que guardar como prueba de mi propia bondad. Kli Yakar preguntó qué tienen que ver los sacrificios con los dones a los pobres. Quizá esto: que en el altar tampoco decidía el que traía. Entregaba, soltaba y se iba.`,
      },
    ],
  },

  maase: {
    intro:
      "Una acción, hoy, medida y concreta. La halajá de este versículo es insólitamente práctica y no deja escapatoria, así que la acción sale de ahí.",
    etiqueta: "Aparta hoy una peá física, antes de repartir nada.",
    texto: `Hazlo con las manos, no con la intención. Elige UNA cosa que hoy entró a tu casa y que se come: la compra del supermercado, la cena que estás preparando, lo que trajiste del trabajo. Antes de guardarla, antes de servirla, antes de sentarte, separa una porción y ponla aparte, en otro sitio: otra bolsa, otro recipiente, otro estante. Que quede físicamente separada y que tú la veas separada. Esa porción ya no es tuya. No decidiste regalarla: dejó de pertenecerte cuando la apartaste, que es la diferencia entre la peá y un gesto de buena voluntad.

La medida, porque la tradición la da: de la Torá la peá no tiene medida fija — el Rambam escribe que "אֲפִלּוּ הִנִּיחַ שִׁבֹּלֶת אַחַת יָצָא יְדֵי חוֹבָתוֹ", aunque haya dejado una sola espiga, cumplió — y de los Sabios el piso es uno de cada sesenta, que se aumenta según el tamaño del campo y según cuántos necesitados haya (Mishná Peá 1:2; Rambam, Matnot Aniyim 1:15). Uno de cada sesenta es poco: de sesenta pesos, uno. Empieza ahí hoy, exactamente ahí, y súbelo mañana. Un piso que se cumple vale más que un techo que se admira.

Y si hoy ya cerraste la compra, ya cocinaste, ya comiste y te parece que se pasó la hora, la halajá te quita la coartada con una precisión casi cómica. Rambam, Matnot Aniyim 1:2: si ya segó todo el campo, toma un poco de lo segado y se lo da a los pobres — "וַאֲפִלּוּ טָחַן הַקָּמָה וְלָשׁוֹ וַאֲפָאוֹ פַּת, הֲרֵי זֶה נוֹתֵן מִמֶּנּוּ פֵּאָה לָעֲנִיִּים": aunque ya lo haya molido, amasado y horneado en pan, da de ESE pan la peá a los pobres. No existe "ya es tarde". Existe pan del que todavía se puede cortar.

Lo último, y es la parte que cuesta: entrégalo sin elegir cara. Llévalo al comedor del barrio, al portero, a la vecina que sabes que la está pasando mal, al que pide en la esquina — y vete. No expliques, no esperes, no cuentes después a quién se lo diste. "הַנַּח לִפְנֵיהֶם וְהֵם יִלְקְטוּ": déjalo delante y que ellos recojan. El que deja la peá no se queda a mirar quién llega.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `La Torá interrumpe el calendario de las fiestas para hablar del pobre. Los rangos son exactos y se contaron sobre el texto hebreo: Shavuot en 23:15-21, la peá en 23:22, Rosh Hashaná en 23:23-25 — y el versículo va aislado por una petujá, formando bloque propio. Rashi vio el corte y preguntó por él hace novecientos años: "¿qué vio la Escritura para ponerla en medio de las festividades?". No hay festejo completo sin el necesitado dentro de él, y esa no es una moraleja añadida al capítulo: es la arquitectura del capítulo.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `La respuesta célebre es de Rashi — dejar la peá equivale a edificar el Templo y ofrecer dentro. Pero al abrir su fuente aparece algo mejor: la Sifra (Emor 13:11) dice "כְּאִלּוּ בֵּית הַמִּקְדָּשׁ קַיָּם", como si el Templo ESTUVIERA EN PIE, y Rashi lo cambia a "כְּאִלּוּ בָּנָה", como si lo hubieras EDIFICADO. Rashi sube la apuesta. Y Kli Yakar, siglos después, le objeta de frente: "¿qué tienen que ver los sacrificios con los dones a los pobres?". La tradición no escondió la pregunta incómoda: la dejó impresa al lado de la respuesta.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El versículo no ordena dar: ordena NO TERMINAR — לֹא תְכַלֶּה, de la raíz que significa agotar. Y no ordena entregar: ordena SOLTAR — תַּעֲזֹב, dejar, abandonar. El dueño ni siquiera elige destinatario: "déjalo delante de ellos y que ellos recojan" (Rashi, citando Mishná Peá 5:6); "en estos dones no hay favor" (Tosefta Peá 2:13). Por eso Ramban y Or HaJaim insisten en que ni la ofrenda del ómer exime del rincón: lo que le diste a Dios no te descuenta de lo que le debes al hombre.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Apartar hoy, físicamente, una porción de algo que se come — separada de verdad, en otro sitio, antes de repartir nada — y entregarla sin elegir cara ni quedarse a ver quién la toma. El piso de los Sabios es uno de cada sesenta; de la Torá basta una espiga. Y si hoy ya cocinaste y comiste, el Rambam cierra la escapatoria: aunque ya lo molieras, amasaras y hornearas, das la peá de ese pan (Matnot Aniyim 1:2).`,
      },
      {
        etiqueta: "El sello:",
        texto: `Un último texto, que no es teoría. Rabán Yojanán ben Zakai sale de Jerusalén montado en su asno y ve a una joven מְלַקֶּטֶת —espigando, la misma raíz exacta de "וְלֶקֶט קְצִירְךָ לֹא תְלַקֵּט" — cebada de entre el estiércol del ganado de unos árabes. Le pregunta quién es. "בַּת נַקְדִּימוֹן בֶּן גּוּרְיוֹן אֲנִי": soy la hija de Nakdimón ben Gurión — uno de los hombres más ricos de Jerusalén. Y ella le recuerda el proverbio de la ciudad, el mismo que Sforno cita sobre nuestro versículo: "מֶלַח מָמוֹן חֶסֶר, וַאֲמָרֵי לַהּ חֶסֶד" — la sal que conserva el dinero es la merma; y algunos dicen: el jésed (Ketubot 66b). El rincón del campo no se deja para los pobres. Se deja porque nadie sabe de qué lado del campo va a estar mañana.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "Esto NO es una fuente, NO es una cita y NO es tradición judía. Es una lectura de Jashmal, marcada como tal. Se buscó y no se localizó a nadie que lo dijera antes; si existe, no lo encontramos. Va aquí abajo, fuera del cuerpo del estudio, a propósito: todo lo de arriba se sostiene sin esto.",
    parrafos: [
      `La lectura es esta: dejar la peá es un tzimtzum hecho por manos humanas. En la Cabalá luriana, el tzimtzum es el primer movimiento de la creación — la Luz Infinita se contrae y deja un espacio vacío, un חָלָל, para que pueda existir algo que no sea Él. No crea llenando: crea retirándose. Sin ese retiro no hay mundo, porque donde todo está ocupado no cabe nadie.`,
      `Y el versículo, leído así, describe la misma operación en miniatura y con un hombre como sujeto. El dueño del campo tiene la capacidad y el derecho de llegar hasta el borde. Y se detiene. No llena el mundo con su propia cosecha. Deja un חָלָל en la esquina — un lugar donde su propiedad no llega — y en ese hueco cabe otra vida. Por eso el verbo es negativo: לֹא תְכַלֶּה, no acabes. No se le pide que produzca algo, se le pide que deje de producir un metro antes. Esa parte sí es textual, y es lo único de este párrafo que lo es: la Torá formula la caridad como una contracción, no como una expansión.`,
      `Qué se puede hacer con esto, dicho con sobriedad. La analogía con el tzimtzum es nuestra y no reemplaza ni una línea de lo que está arriba — Rashi, Ibn Ezra, Ramban, Kli Yakar, la Sifra y Vayikrá Rabá sostienen el estudio entero sin necesitarla. Lo que la lectura aporta es una imagen, y la imagen es esta: que el gesto más pequeño de la agricultura antigua —una mano que se detiene antes del borde— tiene la misma forma que el gesto más grande que se le atribuye a Dios. Tómalo como una imagen. Es todo lo que pretende ser.`,
    ],
  },

  hemshej: [
    "{{study:shavuot|Este mismo versículo, visto desde el otro lado: por qué en Shavuot se lee la historia de una extranjera pobre que espiga en las esquinas de un campo.}}",
    "{{study:rosh-hashana|El midrash que mira «hacia arriba» a la peá es el midrash del juicio. ¿Qué se juzga exactamente el 1 de Tishrei, y por qué el precedente del día es un culpable que salió caminando?}}",
    "{{study:elul|Si la peá es el escalón anterior a Rosh Hashaná, el mes anterior es Elul. Cuarenta días de plazo — y un verso donde el primer paso lo da uno.}}",
  ],

  ctaRef: "Leviticus 23:22",
};
