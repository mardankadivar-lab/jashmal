
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — חֲנוּכָּה · נַעֲשָׂה בּוֹ נֵס וְהִדְלִיקוּ מִמֶּנּוּ שְׁמוֹנָה יָמִים
//  Serie «Tiempos Sagrados» (moadim) · Estudio 6 — Janucá.
//
//  Hero en modo "par": חֲנוּכָּה = חָנוּ כ״ה = 89. NO es una coincidencia
//  numérica entre dos palabras distintas: es una PARTICIÓN de las mismas
//  letras (notarikón), y así se dice en el aviso. La lectura está en una
//  fuente: Bnei Yissajar, Kislev-Tevet 2:5 ("על כן קראו לימים האלה חנוכ"ה
//  חנ"ו כ"ה להורות שיתחילו הימים מן יום כ"ה"), cotejado en Sefaria.
//  Solo cierra con la grafía PLENA חֲנוּכָּה (89), que es la que trae el
//  texto vocalizado del Talmud en Shabat 21b; la defectiva חֲנֻכָּה da 83.
//
//  FUENTES VERIFICADAS CONTRA SEFARIA (2026-08-27, 14 de Elul 5786),
//  usando el hebreo que devuelve la API (/api/texts/{ref}?context=0):
//   · Shabat 21b — sugiá central, cotejada literal:
//       - "מַאי חֲנוּכָּה? … בָּדְקוּ וְלֹא מָצְאוּ אֶלָּא פַּךְ אֶחָד שֶׁל שֶׁמֶן
//         שֶׁהָיָה מוּנָּח בְּחוֹתָמוֹ שֶׁל כֹּהֵן גָּדוֹל, וְלֹא הָיָה בּוֹ אֶלָּא
//         לְהַדְלִיק יוֹם אֶחָד. נַעֲשָׂה בּוֹ נֵס וְהִדְלִיקוּ מִמֶּנּוּ שְׁמוֹנָה יָמִים."
//       - Bet Shamai / Bet Hilel: "פּוֹחֵת וְהוֹלֵךְ" / "מוֹסִיף וְהוֹלֵךְ", y las
//         dos razones de Ulá: "כְּנֶגֶד פָּרֵי הַחַג" y "דְּמַעֲלִין בַּקֹּדֶשׁ
//         וְאֵין מוֹרִידִין".
//       - "מִצְוַת חֲנוּכָּה, נֵר אִישׁ וּבֵיתוֹ" y los mehadrín.
//     NOTA de paginación: Sefaria coloca la sugiá en 21b; el Bet Yosef
//     impreso la cita como "שבת כא." (21a). Se dice, no se disimula.
//   · Rashi a Shabat 21b — "בחותמו – בהצנע וחתום בטבעתו והכיר שלא נגעו בו";
//     "מאי חנוכה – על איזה נס קבעוה". Cotejado.
//   · BET YOSEF, Oraj Jaim 670 — SÍ está alojado en Sefaria (ref exacta:
//     "Beit Yosef, Orach Chayim 670:1"). Cotejado literal, incluida la
//     pregunta: "ואיכא למידק למה קבעו ח' ימים דכיון דשמן שבפך היה בו כדי
//     להדליק לילה א' נמצא שלא נעשה הנס אלא בז' הלילות", y sus TRES respuestas
//     (dividir el aceite en ocho; la vasija que queda llena; las lámparas
//     llenas por la mañana). También su explicación de por qué hacían falta
//     ocho días de aceite (siete de purificación + uno de prensado) y la del
//     Ran (el aceite puro estaba a cuatro días de camino: ida y vuelta = 8).
//     Texto sin nikud en la edición de Sefaria; se cita tal cual.
//   · Shulján Aruj, Oraj Jaim 670:1 · 671:2 · 673:1 · 676:4 · 684:2 · 684:3 —
//     cotejados. 673:1: prohibido usar la luz, "ואפילו תשמיש של קדושה כגון
//     ללמוד לאורה אסור", de ahí el shamash. 684:2: la haftará del Shabat de
//     Janucá es "רני ושמחי" (= Zejaryá 2:14 y sigs.), y si caen DOS shabatot
//     el segundo lee "בנרות דשלמה" (Melajim I 7).
//   · Tratado Soferim 20:6 — AQUÍ está la fórmula, no en el Shulján Aruj:
//     "הנרות האלו קודש ואין לנו רשות להשתמש בהן אלא לראותן בלבד". El Shulján
//     Aruj (676:4) solo cita el incipit "הנרות הללו אנו מדליקין…". Cotejado.
//   · Rambam, Mishné Torá, Hiljot Meguilá veJanuká 3:1-3 y 4:12-14 — cotejado.
//     4:12: "מִצְוַת נֵר חֲנֻכָּה מִצְוָה חֲבִיבָה הִיא עַד מְאֹד".
//     CORRECCIÓN cotejada: en 4:13 la vela de Janucá precede al vino del
//     kidush por "זִכְרוֹן הַנֵּס", NO por shalom bait. Es en 4:14 donde la
//     lámpara de la CASA precede a ambos "מִשּׁוּם שְׁלוֹם בֵּיתוֹ".
//   · Shabat 22b — Rav Sheshet: "וְכִי לְאוֹרָהּ הוּא צָרִיךְ? … אֶלָּא עֵדוּת
//     הִיא לְבָאֵי עוֹלָם שֶׁהַשְּׁכִינָה שׁוֹרָה בְּיִשְׂרָאֵל". Cotejado.
//   · Menajot 86b — "אֵלֶיךָ – וְלֹא לִי, לֹא לְאוֹרָה אֲנִי צָרִיךְ" y "עֵדוּת
//     הוּא לְכָל בָּאֵי עוֹלָם שֶׁהַשְּׁכִינָה שׁוֹרָה בְּיִשְׂרָאֵל". Cotejado.
//   · Shabat 23b:4 — "הָרָגִיל בְּנֵר הָוְיִין לֵיהּ בָּנִים תַּלְמִידֵי חֲכָמִים".
//   · Zejaryá 4:1-6 — texto masorético cotejado ("לֹא בְחַיִל וְלֹא בְכֹחַ כִּי
//     אִם־בְּרוּחִי"). Rashi, Radak, Ibn Ezra, Malbim y Abarbanel ad loc.,
//     todos cotejados. Malbim: "אֵין הַנֵּס שׁוֹרֶה עַל דָּבָר רֵיקָן".
//   · Bereshit 1:2-4 — cotejado. Bereshit Rabá 2:4 — cotejado literal:
//     "וְחֹשֶׁךְ, זֶה גָּלוּת יָוָן, שֶׁהֶחֱשִׁיכָה עֵינֵיהֶם שֶׁל יִשְׂרָאֵל
//     בִּגְזֵרוֹתֵיהֶן", con la gzerá "כִּתְבוּ עַל קֶרֶן הַשּׁוֹר…".
//   · Jaguigá 12a — R. Elazar: la luz del primer día, "עָמַד וּגְנָזוֹ", y
//     "וּלְמִי גְּנָזוֹ — לַצַּדִּיקִים לֶעָתִיד לָבֹא". Cotejado, incluida la
//     disputa tanaítica que sigue (los Sabios: eran las luminarias del día 1,
//     colgadas el día 4).
//   · Talmud Yerushalmi, Berajot 8:5 (Sefaria: 8:5:8) — R. Leví en nombre de
//     Bar Nazirá: "שְׁלֹשִׁים וְשֵׁשׁ שָׁעוֹת שִׁימְּשָׁה אוֹתָהּ הָאוֹרָה
//     שֶׁנִּבְרָאת בַּיּוֹם הָרִאשׁוֹן" (12+12+12), y los dos pedernales que el
//     Santo le dio a Adam cuando la luz cesó. Cotejado.
//   · Sucá 45b y Sanedrín 97b — Abaie: "לָא פָּחֵית עָלְמָא מִתְּלָתִין וְשִׁיתָּא
//     צַדִּיקֵי", derivado de "אַשְׁרֵי כׇּל חוֹכֵי לוֹ" (Yeshayá 30:18), porque
//     "לוֹ" = 36. Cotejado en ambos folios.
//   · Ramban a Bamidbar 8:2 — cotejado ENTERO: cita la Meguilat Setarim de
//     Rabenu Nisim ("יֵשׁ חֲנֻכָּה אַחֶרֶת שֶׁיֵּשׁ בָּהּ הַדְלָקַת הַנֵּרוֹת")
//     y el Yelamdenu / Bamidbar Rabá 15:6 ("הַקָּרְבָּנוֹת כָּל זְמַן שֶׁבֵּית
//     הַמִּקְדָּשׁ קַיָּם הֵן נוֹהֲגִין, אֲבָל הַנֵּרוֹת לְעוֹלָם"), y concluye:
//     "אֲבָל לֹא רָמְזוּ אֶלָּא לְנֵרוֹת חֲנֻכַּת חַשְׁמוֹנַאי, שֶׁהִיא נוֹהֶגֶת
//     אַף לְאַחַר הַחֻרְבָּן בְּגָלוּתֵנוּ".
//   · Rashi a Bamidbar 8:2 — cotejado: "עַד שֶׁתְּהֵא שַׁלְהֶבֶת עוֹלָה מֵאֵלֶיהָ"
//     (remite a Shabat 21a) y "כְּדֵי שֶׁלֹּא יֹאמְרוּ לְאוֹרָהּ הוּא צָרִיךְ".
//   · Ibn Ezra a Bamidbar 8:2 — cotejado: "לְהוֹרוֹת כִּי הַדִּבּוּר יִהְיֶה גַּם
//     בַּלַּיְלָה, כִּי שָׁם יִהְיֶה הַנֵּר דָּלוּק וְלֹא יִכְבֶּה".
//   · Abarbanel a Zejaryá 4:6 y 4:10 — cotejado: su quinta duda (el ángel no
//     descifra la menorá, la reemplaza por una frase) y su propia lectura (la
//     menorá es la nación; "לא בחיל ולא בכח" es cómo gobierna el Mashíaj).
//   · Bnei Yissajar (R. Tzvi Elimelej de Dinov), Kislev-Tevet 2:5 y 2:8 —
//     cotejados. 2:8 cita al "רב הקדוש" que en 2:6 identifica como BAAL
//     HAROKEAJ (R. Elazar de Worms): "תקנו ל"ו נרות כנגד האור הראשון ששימש
//     לאדה"ר ל"ו שעות כמשארז"ל בפסיקתא", y "שהארת המצוה נר חנוכה הוא מהארת
//     אור הגנוז". 2:5 trae la respuesta del Rokeaj a la pregunta del Bet Yosef
//     (la Torá yuxtapone las lámparas a Sucot: ocho días como Sucot) y el
//     porqué de "לשנה אחרת קבעום".
//     NOTA: la remisión "בפסיקתא" del Bnei Yissajar NO se pudo localizar en el
//     Pesikta alojado en Sefaria; las 36 horas SÍ están, verbatim, en el
//     Yerushalmi Berajot 8:5. Se cita el Yerushalmi y se dice esto.
//   · Kedushat Leví (R. Levi Yitzjak de Berditchev), Bereshit, Drashot para
//     Janucá 8 — cotejado literal: "בחנוכה אנו מדליקין ל"ו נרות … ול"ו דלמעלה
//     עם ל"ו דלמטה הוא ע"ב … ועם השמש … הם מ"ד … הרי למעלה ולמטה פ"ח … ולכן
//     כתב האר"י ז"ל שראשי תיבות נפשנו חכתה לה' הוא פ"ח וכן להדליק נר חנוכה
//     ראשי תיבות פ"ח". Es la ÚNICA vía por la que este estudio cita al Arizal:
//     de segunda mano, a través del Kedushat Leví, y se dice así. Sefaria no
//     aloja el Pri Etz Jaim ni el Shaar HaKavanot (verificado: 400 Bad Request).
//   · Sefat Emet, Bereshit, para Janucá 18:3, 18:4 y 18:7 — cotejados.
//     18:3: "הלל הוא אור והשמחה, והודאה הוא יראה והכנעה … וזהו ענין מוסיף
//     והולך פוחת והולך שניהם אמת". 18:7: los 36 utensilios de los nesiím
//     (12+12+12), "אלה" gimatría 36, y los 36 tzadikim de "אשרי כל חוכי לו".
//   · Talmud Eser HaSefirot (Baal HaSulam), Jélek I, Histaklut Penimit 2:14 —
//     cotejado literal: "כי אין אור בלי כלי … שהאור תלוי ברצון, והרצון הוא
//     המקום של האור … כי אין כפיה ברוחניות".
//   · Shemot 15:11 — cotejado (para el notarikón popular מכב"י, que se
//     menciona SOLO para decir que no se le halló fuente clásica).
//
//  GEMATRÍAS CALCULADAS LETRA POR LETRA (Python), verificadas:
//    חֲנוּכָּה (plena) = ח8+נ50+ו6+כ20+ה5 = 89
//    חָנוּ = ח8+נ50+ו6 = 64 · כ״ה = כ20+ה5 = 25 → 64 + 25 = 89 ✔
//    חֲנֻכָּה (defectiva) = 83 — el notarikón NO cierra con esta grafía.
//    לוֹ = ל30+ו6 = 36 (la derivación de Abaie en Sucá 45b / Sanedrín 97b)
//    אֵלֶּה = א1+ל30+ה5 = 36 (la del Sefat Emet 18:7)
//    SUMA DE LAS VELAS: 1+2+3+4+5+6+7+8 = 36 ✔ (cálculo propio, comprobado)
//    con shamash cada noche: 36 + 8 = 44 = מ״ד ✔
//    36 + 36 = 72 = ע״ב ✔ · 44 + 44 = 88 = פ״ח ✔
//    ר״ת de לְהַדְלִיק נֵר חֲנוּכָּה = ל30+נ50+ח8 = 88 ✔
//    ר״ת de נַפְשֵׁנוּ חִכְּתָה לַה׳ = נ50+ח8+ל30 = 88 ✔ (Tehilim 33:20)
//    אוֹר = 207 · רָז = 207 · אֵין סוֹף = 207
//
//  DESCARTADAS SIN PIEDAD (y se dice en el cuerpo o en el aviso):
//    · יָוָן = 66 (grafía del Tanaj). La forma moderna יוון da 72, y מַכַּבִּי
//      también da 72, y 36+36 = 72. Tres cosas distintas en el mismo número:
//      es exactamente la clase de puente que este proyecto no construye. No
//      se usa.
//    · שֶׁמֶן = 390 = שָׁמַיִם. Aritmética correcta, pero no se halló ninguna
//      fuente clásica que ligue ambas palabras en clave de Janucá. Descartada.
//    · שְׁמוֹנָה = 401 = אֶת. Correcto y vacío. Descartada.
//    · מכב״י como notarikón de "מִי כָמֹכָה בָּאֵלִם יְהוָה" (Shemot 15:11): las
//      iniciales SÍ dan מכבי (verificado contra el texto), pero no se localizó
//      fuente clásica alojada que lo traiga. Se menciona como tradición
//      popular de origen no verificado, no como dato.
//
//  CALENDARIO — CORRECCIÓN al encargo (verificado con el conversor de fechas
//  hebreas y el listado de festividades): 25 de Kislev 5787 cae en SHABAT
//  5 de diciembre de 2026. Por tanto la PRIMERA vela se enciende la tarde del
//  VIERNES 4 de diciembre de 2026, antes de las velas de Shabat. La octava
//  vela se enciende el viernes 11 y el octavo día es el Shabat 12 de
//  diciembre. En 5787 caen DOS shabatot dentro de Janucá (Vayeshev el 5 y
//  Miketz el 12), lo que activa el Shulján Aruj 684:2. El encargo decía
//  "5 de diciembre"; se corrige a 4–12 de diciembre.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "januca",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 6 — Janucá · el milagro que se explica solo",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۶ — حنوکا · معجزه‌ای که خودش را توضیح می‌دهد",
    he: "נַעֲשָׂה בּוֹ נֵס וְהִדְלִיקוּ מִמֶּנּוּ שְׁמוֹנָה יָמִים",
    titulo: "Janucá — el milagro del primer día",
    tituloFa: "حنوکا — معجزهٔ روزِ نخست",
    ganchoEs:
      "Había aceite para un día y ardió ocho. Entonces el milagro duró siete, no ocho: el primer día el aceite ardió por razones perfectamente naturales. ¿Por qué la fiesta dura ocho? La mejor pregunta del calendario judío no busca un séptimo día perdido. Busca qué hacemos con lo que funciona sin necesitar explicación.",
    ganchoFa:
      "روغن برای یک روز بود و هشت روز سوخت. پس معجزه هفت روز بود، نه هشت: روزِ نخست روغن به دلیلی کاملاً طبیعی سوخت. پس چرا این جشن هشت روز است؟ بهترین پرسشِ گاه‌شمارِ یهودی در پیِ روزی گم‌شده نیست؛ در پیِ آن است که با آنچه بی‌نیاز از توضیح کار می‌کند چه می‌کنیم.",
    par: {
      a: { he: "חֲנוּכָּה", rom: "Janucá" },
      b: { he: "חָנוּ כ״ה", rom: "janú kaf-hei (acamparon el 25)" },
      valor: "89",
    },
    fecha: "Janucá 5787 · 4–12 dic 2026",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — cuatro cosas que hay que decir antes de empezar",
    rotulo:
      "Se dicen de entrada: una sobre el número del encabezado, una sobre el calendario, una que corrige un error muy repetido, y una sobre gematrías que aquí se rechazan.",
    parrafos: [
      `Primero, el número del encabezado. חֲנוּכָּה = 89 y חָנוּ כ״ה = 89, pero eso NO es una coincidencia numérica entre dos palabras distintas: son exactamente las mismas cinco letras, partidas en dos. El interés no está en el número —el número tiene que coincidir— sino en el corte: leer "Janucá" como janú kaf-hei, "acamparon el veinticinco". Es un notarikón, una lectura por partición, y no es invención de Jashmal: la trae el Bnei Yissajar (Kislev-Tevet 2:5), y la trae precisamente para responder a la pregunta de este estudio. Se dice para que nadie lo confunda con una equivalencia hallada. Y hay un detalle técnico que también hay que decir: solo cierra con la grafía plena חֲנוּכָּה (89), que es la que trae el texto vocalizado del Talmud; con la grafía defectiva חֲנֻכָּה, que es la que usa el Rambam, da 83 y no cierra.`,
      `Segundo, el calendario, que se corrigió al verificarlo. El 25 de Kislev de 5787 cae en SHABAT, el 5 de diciembre de 2026. Como el día hebreo empieza al anochecer, la primera vela no se enciende ese sábado sino la tarde anterior: el VIERNES 4 de diciembre, y además antes de las velas de Shabat. La octava vela se enciende el viernes 11 y el octavo día es el Shabat 12. Es un año en que caen dos shabatot dentro de Janucá, cosa que el Shulján Aruj contempla expresamente (Oraj Jaim 684:2): el primero lee la haftará de Zejaryá, "Canta y alégrate, hija de Tzión", y el segundo lee las lámparas de Shlomó en Melajim I 7.`,
      `Tercero, una corrección a algo que se repite mucho. Suele decirse que la vela de Janucá tiene prioridad sobre el vino del kidush "por la paz del hogar". No es así, y el Rambam lo distingue en dos leyes seguidas. En Hiljot Janucá 4:13 dice que si a uno le queda una sola moneda y tiene delante el kidush y la vela de Janucá, compra el aceite de la vela — y la razón que da es "porque en ella hay memoria del milagro". La paz del hogar aparece en la ley SIGUIENTE, 4:14, y es lo que hace que la lámpara doméstica —la luz con la que la familia come y no tropieza— tenga prioridad sobre las dos: "porque hasta el Nombre divino se borra para hacer paz entre un hombre y su mujer". Publicar el milagro vence al vino; que en tu casa haya luz vence a las dos.`,
      `Cuarto, tres gematrías que aquí se rechazan. יָוָן (Grecia), tal como se escribe en el Tanaj, vale 66; escrita a la moderna, יוון, vale 72 — y מַכַּבִּי también vale 72 — y las treinta y seis velas de abajo más las treinta y seis de arriba del Kedushat Leví también dan 72. Tres cosas sin relación en el mismo número: es exactamente el puente que este proyecto no construye, y no se construye. También se descarta שֶׁמֶן (aceite) = 390 = שָׁמַיִם (cielos): la aritmética es correcta y no se halló ni una fuente clásica que ligue ambas palabras en clave de Janucá. Y el conocido acróstico de "Macabí" en "¿Quién como Tú entre los dioses, YHVH?" (Shemot 15:11) sí funciona con las letras —se comprobó—, pero no se localizó fuente clásica que lo traiga: se nombra como tradición popular de origen no verificado, no como dato.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — la pregunta, y por dónde sale",
    intro: [
      `El estudio tiene una sola pregunta y seis textos verificados que la rodean. Conviene ver el esqueleto antes de entrar, porque la pregunta es tan buena que uno se queda atrapado en ella y no llega a lo que abre.`,
    ],
    filas: [
      {
        ref: "Shabat 21b",
        he: "וְלֹא הָיָה בּוֹ אֶלָּא לְהַדְלִיק יוֹם אֶחָד",
        es: "«y no había en ella sino para encender un día»",
        funcion: "El dato del que sale todo: aceite para uno, ardió ocho.",
      },
      {
        ref: "Bet Yosef, Oraj Jaim 670",
        he: "לֹא נַעֲשָׂה הַנֵּס אֶלָּא בְּז׳ הַלֵּילוֹת",
        es: "«el milagro no ocurrió sino en siete noches»",
        funcion: "La pregunta, hecha por el codificador del Shulján Aruj.",
      },
      {
        ref: "Malbim a Zejaryá 4:6",
        he: "אֵין הַנֵּס שׁוֹרֶה עַל דָּבָר רֵיקָן",
        es: "«el milagro no reposa sobre una cosa vacía»",
        funcion: "La respuesta estructural: el milagro necesita un recipiente.",
      },
      {
        ref: "Shabat 22b · Menajot 86b",
        he: "לֹא לְאוֹרָהּ אֲנִי צָרִיךְ … עֵדוּת הִיא",
        es: "«no necesito su luz… es un testimonio»",
        funcion: "La luz del candelabro nunca sirvió para alumbrar.",
      },
      {
        ref: "Yerushalmi Berajot 8:5",
        he: "ל״ו שָׁעוֹת שִׁימְּשָׁה אוֹתָהּ הָאוֹרָה",
        es: "«treinta y seis horas sirvió aquella luz»",
        funcion: "El número que se enciende en ocho noches: 1+2+…+8 = 36.",
      },
      {
        ref: "Bereshit Rabá 2:4",
        he: "וְחֹשֶׁךְ — זֶה גָּלוּת יָוָן",
        es: "«y tiniebla — este es el exilio de Grecia»",
        funcion: "Por qué esta fiesta cae en el mes más oscuro del año.",
      },
    ],
    cierre: [
      `Una vasija sellada, una pregunta de contabilidad, una regla sobre dónde puede posarse un milagro, una luz que no alumbra, un número que viene del primer día del mundo y una tiniebla que tiene nombre propio. Eso es Janucá.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "El texto-ancla — Talmud Bavlí, Shabat 21b (la sugiá «¿Qué es Janucá?»)",
        he: "מַאי חֲנוּכָּה? דְּתָנוּ רַבָּנַן: בְּכ״ה בְּכִסְלֵיו יוֹמֵי דַחֲנוּכָּה תְּמָנְיָא אִינּוּן … שֶׁכְּשֶׁנִּכְנְסוּ יְוָונִים לַהֵיכָל טִמְּאוּ כׇּל הַשְּׁמָנִים שֶׁבַּהֵיכָל. וּכְשֶׁגָּבְרָה מַלְכוּת בֵּית חַשְׁמוֹנַאי וְנִצְּחוּם, בָּדְקוּ וְלֹא מָצְאוּ אֶלָּא פַּךְ אֶחָד שֶׁל שֶׁמֶן שֶׁהָיָה מוּנָּח בְּחוֹתָמוֹ שֶׁל כֹּהֵן גָּדוֹל, וְלֹא הָיָה בּוֹ אֶלָּא לְהַדְלִיק יוֹם אֶחָד. נַעֲשָׂה בּוֹ נֵס וְהִדְלִיקוּ מִמֶּנּוּ שְׁמוֹנָה יָמִים.",
        es: "«¿Qué es Janucá? Pues enseñaron los Sabios: el veinticinco de Kislev son los ocho días de Janucá… Cuando entraron los griegos al Santuario contaminaron todos los aceites que había en él. Y cuando prevaleció el reino de la casa de los Jashmonaím y los venció, buscaron y no hallaron sino una sola vasija de aceite que estaba depositada con el sello del Sumo Sacerdote, y no había en ella sino para encender un día. Se hizo con ella un milagro y encendieron de ella ocho días.»",
        source: "Shabat 21b (baraitá de Meguilat Taanit)",
      },
      {
        label: "La disputa del encendido — Shabat 21b",
        he: "בֵּית שַׁמַּאי אוֹמְרִים: יוֹם רִאשׁוֹן מַדְלִיק שְׁמֹנָה, מִכָּאן וְאֵילָךְ פּוֹחֵת וְהוֹלֵךְ. וּבֵית הִלֵּל אוֹמְרִים: יוֹם רִאשׁוֹן מַדְלִיק אַחַת, מִכָּאן וְאֵילָךְ מוֹסִיף וְהוֹלֵךְ. … טַעְמָא דְּבֵית הִלֵּל דְּמַעֲלִין בַּקֹּדֶשׁ וְאֵין מוֹרִידִין.",
        es: "«La casa de Shamai dice: el primer día enciende ocho, y de ahí en adelante va restando. Y la casa de Hilel dice: el primer día enciende una, y de ahí en adelante va añadiendo… La razón de la casa de Hilel es que en materia de santidad se sube y no se baja.»",
        source: "Shabat 21b · las dos razones las trae Ulá en nombre de dos amoraím de Israel",
      },
      {
        label: "La pregunta — Bet Yosef, Oraj Jaim 670 (R. Yosef Caro, autor del Shulján Aruj)",
        he: "ואיכא למידק למה קבעו ח' ימים דכיון דשמן שבפך היה בו כדי להדליק לילה א' נמצא שלא נעשה הנס אלא בז' הלילות",
        es: "«Y cabe examinar: ¿por qué establecieron ocho días? Pues dado que el aceite de la vasija tenía lo suficiente para encender una noche, resulta que el milagro no ocurrió sino en siete noches.»",
        source:
          "Bet Yosef, Oraj Jaim 670 (el pasaje comenta la sugiá; el Bet Yosef impreso la cita como «Shabat 21a», Sefaria la pagina en 21b)",
      },
      {
        label: "La haftará del Shabat de Janucá — Zejaryá 4:2 y 4:6",
        he: "רָאִיתִי וְהִנֵּה מְנוֹרַת זָהָב כֻּלָּהּ וְגֻלָּהּ עַל־רֹאשָׁהּ וְשִׁבְעָה נֵרֹתֶיהָ עָלֶיהָ … זֶה דְּבַר־יְהֹוָה אֶל־זְרֻבָּבֶל לֵאמֹר לֹא בְחַיִל וְלֹא בְכֹחַ כִּי אִם־בְּרוּחִי אָמַר יְהֹוָה צְבָאוֹת׃",
        es: "«Vi, y he aquí un candelabro todo de oro, con su recipiente en la cabeza y sus siete lámparas sobre él… Esta es la palabra de YHVH a Zerubavel: no con ejército y no con fuerza, sino con Mi espíritu, dijo YHVH de los ejércitos.»",
        source: "Zejaryá 4:2 · 4:6 (haftará confirmada en Shulján Aruj, Oraj Jaim 684:2)",
      },
      {
        label: "La tiniebla que tiene nombre — Bereshit 1:2-3 leído por el Midrash",
        he: "וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם … וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר׃ ‖ וְחֹשֶׁךְ, זֶה גָּלוּת יָוָן, שֶׁהֶחֱשִׁיכָה עֵינֵיהֶם שֶׁל יִשְׂרָאֵל בִּגְזֵרוֹתֵיהֶן",
        es: "«Y la tierra era caos y vacío, y tiniebla sobre la faz del abismo… Y dijo Dios: sea luz. Y fue luz.» — «Y tiniebla: este es el exilio de Grecia, que oscureció los ojos de Israel con sus decretos.»",
        source: "Bereshit 1:2-3 · Bereshit Rabá 2:4 (Reish Lakish)",
      },
    ],
    parrafos: [
      `Empecemos por lo que dice el texto, porque casi todo el mundo cree recordarlo y casi nadie lo recuerda entero. La única fuente talmúdica que cuenta la historia del aceite es un solo pasaje, en el tratado Shabat, folio 21b. Y empieza con una pregunta, no con un relato: מַאי חֲנוּכָּה — "¿Qué es Janucá?". Rashi, comentando ahí mismo, explica de qué está preguntando la Guemará: "por cuál milagro la instituyeron". No pregunta qué se hace en Janucá; pregunta cuál es el hecho que justifica la fiesta. Y la respuesta que da es la conocida: entraron los griegos al Santuario, contaminaron todos los aceites; cuando los Jashmonaím vencieron, buscaron y hallaron una sola vasija de aceite todavía sellada con el sello del Sumo Sacerdote; alcanzaba para un día; ardió ocho.`,
      `Ahora la aritmética, que es lo que nadie hace. Si había aceite para UN día, y ardió OCHO, el excedente sobrenatural es de SIETE. El primer día no hubo milagro alguno: hubo aceite y hubo fuego, y el aceite se consumió como se consume el aceite. Entonces la fiesta debería durar siete días. Dura ocho. La objeción es tan simple que parece una travesura de alumno, y sin embargo la formula, con todas las letras, el hombre más serio de la halajá de los últimos cinco siglos: Rabí Yosef Caro, el autor del Shulján Aruj, en su obra mayor, el Bet Yosef, comentando este mismo capítulo (Oraj Jaim 670). Sus palabras: "cabe examinar por qué establecieron ocho días, pues dado que el aceite de la vasija tenía lo suficiente para encender una noche, resulta que el milagro no ocurrió sino en siete noches". No es una provocación de escéptico. Es el codificador de la ley judía señalando que la ley que él mismo va a codificar cuenta un día de más.`,
      `Y el Bet Yosef, que no deja preguntas abiertas, responde tres cosas, en orden creciente de audacia. Primera: dividieron el aceite de la vasija en ocho partes y cada noche pusieron una octava parte en el candelabro, y aun así ardió hasta la mañana — de modo que hubo milagro las ocho noches. Segunda: después de llenar el candelabro, la vasija quedó llena como al principio, y por eso el milagro se notó ya la primera noche. Tercera: la primera noche volcaron TODO el aceite en las lámparas y ardieron toda la noche, y a la mañana siguiente hallaron las lámparas todavía llenas — y así cada noche. Fíjate en lo que tienen en común las tres: ninguna acepta que el primer día fuera un día común. Las tres buscan, dentro del primer día, un milagro escondido. Es la respuesta honesta de un jurista: si celebramos ocho, tiene que haber ocho.`,
      `El mismo pasaje del Bet Yosef aclara además algo que suele pasarse por alto: por qué hacían falta ocho días de aceite, y no dos o tres. Porque todo Israel estaba en presunción de impureza por contacto con muertos —era una guerra—, y no se puede preparar aceite puro hasta que pasen siete días desde la contaminación, más un día para machacar las aceitunas y sacar el aceite. Siete más uno: ocho. El Ran, que él cita, da otra cuenta: el aceite puro más cercano estaba a cuatro días de camino, y entre ir y volver son ocho. Cualquiera de las dos cuentas dice lo mismo: el número ocho no es un adorno litúrgico. Es el tiempo real que tarda un ser humano en producir aceite puro. El milagro duró exactamente lo que duraba el trabajo.`,
      `Y hay una cuarta respuesta, más antigua y más extraña, que la tradición jasídica conservó. La trae el Bnei Yissajar en nombre del Baal HaRokeaj, R. Elazar de Worms: la Torá coloca el pasaje de las lámparas del Santuario junto al pasaje de la fiesta de Sucot, y de ahí aprendieron los Sabios que estos días también son ocho, como Sucot. Y entonces —dice— se entiende por qué el Talmud precisa "al año siguiente los establecieron": porque el primer año ya sabían por la Torá que serían ocho días, pero no sabían desde cuál empezar. ¿Y si el candelabro llegaba a arder nueve días, y los ocho milagrosos eran del segundo al noveno? Tuvieron que esperar un año entero para saber dónde poner el primer día. Por eso, sigue, al nombre de la fiesta le cabe leerse partido: חֲנוּכָּה, janú kaf-hei, "acamparon el veinticinco" — el nombre mismo fija que la cuenta arranca el veinticinco. Arranca, es decir, en el día que no fue milagroso.`,
      `Guarda ese detalle, porque es la puerta de todo lo que sigue. La pregunta del Bet Yosef supone que un día natural es un día vacío, un cero que se coló en la suma. Todo el resto del estudio consiste en mostrar que la tradición nunca creyó tal cosa — y que, si uno la sigue hasta el fondo, el primer día no es el día flojo de Janucá: es el único que hace posible a los otros siete.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Rashi no comenta la pregunta del Bet Yosef —vivió cuatro siglos antes—, pero deja dos notas que la rodean. La primera está en el folio mismo: sobre "con el sello" escribe "estaba oculta y sellada con su anillo, y se reconocía que no la habían tocado". Es decir: lo asombroso empieza antes del fuego. Que un ejército que profanó todo el Santuario dejara intacta y sin abrir una vasija sellada ya es un hecho difícil de explicar. La segunda nota está lejos, en la Torá, sobre el mandato de encender el candelabro del Santuario, y es la que decide la lógica de todo el estudio: Rashi explica que "encender" se dice en hebreo con un verbo de subir (בְּהַעֲלֹתְךָ) porque hay que encender עַד שֶׁתְּהֵא שַׁלְהֶבֶת עוֹלָה מֵאֵלֶיהָ, "hasta que la llama suba por sí misma" — y remite, precisamente, al tratado Shabat. Ahí tienes la ley del fuego en cinco palabras: el trabajo del que enciende termina exactamente donde empieza la vida propia de la llama. Si la llama no arde sola, no encendiste. Y en el mismo lugar Rashi explica por qué las mechas del candelabro apuntaban al centro: "para que no dijeran que Él necesita su luz".`,
      },
      {
        etiqueta: "El Rambán / Najmánides (הָרַמְבַּ\"ן).",
        texto: `El Rambán hace en Bamidbar 8:2 uno de sus movimientos más audaces, y hay que seguirlo entero. Rashi había traído el midrash de que Aharón se desanimó al ver la ofrenda de los príncipes de las tribus, y Dios lo consoló diciéndole: "la tuya es mayor que la de ellos, pues tú enciendes y preparas las lámparas". Al Rambán eso no le cierra: ¿por qué consolarlo con las lámparas y no con el incienso, o con el servicio de Yom Kipur, que solo él podía hacer? Y entonces propone que el midrash no habla de las lámparas del Santuario, sino de OTRA januká: "hallé así en la Meguilat Setarim de Rabenu Nisim: dijo el Santo a Moshé, dile a Aharón, hay otra januká en la que hay encendido de lámparas, y en ella haré por Israel, por medio de tus hijos, milagros y salvación, y una januká que se llamará con su nombre — y es la januká de los hijos de Jashmonai". Y remata con el pasaje del Yelamdenu y de Bamidbar Rabá: "los sacrificios, todo el tiempo que el Templo esté en pie, se practican; pero las lámparas son para siempre" — y aclara: eso solo puede referirse a las velas de los Jashmonaím, שֶׁהִיא נוֹהֶגֶת אַף לְאַחַר הַחֻרְבָּן בְּגָלוּתֵנוּ, "que se practica incluso después de la destrucción, en nuestro exilio". Lee bien lo que acaba de decir: de todo el servicio del Templo, lo único que sobrevivió a la destrucción del Templo es encender una lucecita. Y sobrevivió porque nunca dependió del Templo.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Ibn Ezra, fiel a su método, se niega a alegorizar y da un motivo funcional al candelabro que, sin proponérselo, aporta una pieza. ¿Por qué —pregunta— la Torá coloca el pasaje de las lámparas justo ahí? "Para enseñar que la palabra profética ocurriría también de noche, pues allí estaría la lámpara encendida y no se apagaría". Su respuesta es sobria: la luz está para que haya luz cuando no hay sol. El Rambán, que lo cita, discute con él. Pero para nuestro asunto la observación de Ibn Ezra sirve de contraste exacto: la única función que una lámpara puede tener, según el sentido llano, es alumbrar. Y eso es lo que el Talmud, dos páginas más adelante, va a negar de plano.`,
      },
      {
        etiqueta: "El Abarbanel (אַבַּרְבַּנְאֵל).",
        texto: `El Abarbanel llega a la visión de Zejaryá con diez objeciones formales, y la quinta es la que aquí importa. El profeta ve un candelabro de oro con siete lámparas y dos olivos, y pregunta al ángel: "¿qué son estas cosas, mi señor?". Y el ángel responde: "no con ejército y no con fuerza, sino con Mi espíritu". El Abarbanel se planta: eso no es una respuesta. "¿Qué relación tiene esta explicación con la visión, y cómo aceptó el profeta su respuesta? Debió preguntar cómo indica el candelabro a Zerubavel… y el ángel no le explicó nada de eso". Su propia lectura, que da más adelante, es histórica y amplia: el candelabro es la nación misma —"el pueblo que anda en tinieblas"— y todo de oro, y entera, porque en la redención futura volverán todas las tribus y no quedará ninguna en el exilio; y "no con ejército y no con fuerza" describe cómo gobernará el Mashíaj, que no adquirirá su dominio como los reyes de las naciones. Vale la pena quedarse con la objeción tanto como con la respuesta: el Abarbanel notó que, al preguntar por un mecanismo, recibió una frase sobre la fuente de la energía. Es la misma incomodidad que produce el primer día de Janucá.`,
      },
      {
        etiqueta: "El Malbim (מַלְבִּ\"ם).",
        texto: `Y aquí está, en una sola línea, la respuesta que este estudio necesitaba, escrita por un comentarista del siglo XIX sobre un versículo que ni siquiera trata de Janucá. Comentando "no con ejército y no con fuerza, sino con Mi espíritu", el Malbim distingue tres modos de conducción divina: por el orden natural, que requiere ejército; por medio de ángeles, que es milagro pero todavía requiere una fuerza interior; y por el espíritu de Dios directamente. Y al explicar el segundo escribe: "aunque entonces conduce con milagro y no con fuerza externa, aun así hace falta una fuerza interior, כִּי אֵין הַנֵּס שׁוֹרֶה עַל דָּבָר רֵיקָן — porque el milagro no reposa sobre una cosa vacía, como está dicho: 've con esta fuerza tuya y salva a Israel de mano de Midián'". El milagro no cae sobre la nada. Necesita algo sobre lo cual posarse. Ahora vuelve a la vasija: si el aceite del primer día no hubiera estado ahí, sobre qué se habría posado el milagro de los otros siete. El primer día no es el día sin milagro. Es el suelo del milagro.`,
      },
      {
        etiqueta: "El Rambam / Maimónides (הָרַמְבַּ\"ם).",
        texto: `El Rambam cuenta la historia sin la palabra "milagro". En Hiljot Meguilá veJanuká 3:2 escribe: entraron al Santuario y no hallaron aceite puro sino una sola vasija, y no había en ella para encender sino un solo día, "y encendieron de ella las lámparas de la disposición ocho días, hasta que machacaron aceitunas y sacaron aceite puro". Ni "se hizo un milagro" ni ninguna otra marca: los hechos, secos. Y sin embargo es el mismo Rambam quien escribe sobre esta mitzvá la frase más cálida de todo su código: מִצְוַת נֵר חֲנֻכָּה מִצְוָה חֲבִיבָה הִיא עַד מְאֹד — "el precepto de la vela de Janucá es un precepto queridísimo, y el hombre debe cuidarlo, para dar a conocer el milagro y aumentar la alabanza a Dios y la gratitud por los milagros que nos hizo. Incluso quien no tiene qué comer sino de la caridad, pide prestado o vende su ropa y compra aceite y velas y enciende" (4:12). El hombre que no dice "milagro" al narrar es el que manda vender la ropa para publicarlo. Y en las dos leyes siguientes ordena las prioridades: con una sola moneda, la vela de Janucá vence al vino del kidush "porque en ella hay memoria del milagro" (4:13); pero la lámpara de la casa vence a ambas "por la paz de su hogar, pues hasta el Nombre se borra para hacer paz entre un hombre y su mujer" (4:14). Publicar el milagro está por encima del rito; que en tu casa haya luz está por encima de publicar el milagro.`,
      },
      {
        etiqueta: "El Talmud sobre para qué sirve esa luz (שַׁבָּת כ\"ב · מְנָחוֹת פ\"ו).",
        texto: `Antes de subir al Arizal hay que poner una pieza que decide todo el estudio, y es una pregunta de Rav Sheshet. La Torá manda encender el candelabro "fuera de la cortina del testimonio". Y pregunta el Talmud: וְכִי לְאוֹרָהּ הוּא צָרִיךְ — "¿acaso Él necesita su luz? ¡Si los cuarenta años que anduvieron los hijos de Israel por el desierto no anduvieron sino por Su luz! Sino que es un TESTIMONIO para los que vienen al mundo de que la Presencia mora en Israel" (Shabat 22b, y con más detalle en Menajot 86b, donde se lee "para ti — y no para Mí: no necesito su luz"). Toma la medida de esto. La lámpara más famosa de la historia judía nunca tuvo por función alumbrar. Su función era ser vista. Y siglos después, la ley de Janucá dirá exactamente lo mismo de tu ventana: está prohibido usar la luz de esas velas, "y hasta un uso sagrado, como estudiar a su luz, está prohibido" (Shulján Aruj, Oraj Jaim 673:1) — por eso se agrega el shamash, para que si uno se sirve de la luz, se sirva de esa otra. Y la fórmula que lo dice se canta cada noche: "estas luces son sagradas, וְאֵין לָנוּ רְשׁוּת לְהִשְׁתַּמֵּשׁ בָּהֶן אֶלָּא לִרְאוֹתָן בִּלְבַד — y no tenemos permiso de servirnos de ellas sino solamente de mirarlas" (Tratado Soferim 20:6; el Shulján Aruj 676:4 solo cita el comienzo de la fórmula).`,
      },
      {
        etiqueta: "El Arizal, citado por el Kedushat Leví (הָאֲרִ\"י).",
        texto: `Aquí hay que ser exacto sobre la cadena de transmisión, porque Sefaria no aloja los escritos lurianos de Janucá y este estudio no cita lo que no puede ver. Lo que sí está alojado y se cotejó palabra por palabra es el Kedushat Leví de R. Levi Yitzjak de Berditchev, en sus homilías de Janucá, y él sí cita al Arizal. Su cuenta: "en Janucá encendemos treinta y seis velas, y por el acto de abajo se despierta lo de arriba, y frente a ellas se encienden arriba otras treinta y seis; y las treinta y seis de arriba con las treinta y seis de abajo son setenta y dos, frente al Nombre de setenta y dos. Y con el shamash de cada noche, las velas de Janucá son cuarenta y cuatro, y frente a ellas arriba cuarenta y cuatro: ochenta y ocho arriba y abajo". Y entonces la alusión: פ״ח, ochenta y ocho, es la palabra de "el LAZO se rompió y nosotros escapamos" (Tehilim 124:7). "Y por eso escribió el Arizal que las iniciales de 'nuestra alma esperó a YHVH' son ochenta y ocho, y también las iniciales de 'para encender la vela de Janucá' son ochenta y ocho". Las cuentas se verificaron todas y cierran; en el remez se muestran. Lo importante no es la aritmética sino la doctrina que la sostiene, y que es la del Arizal: וּבְעוֹבָדָא דִּלְתַתָּא אִיתְעַר לְעֵילָא, por un acto de abajo se despierta algo arriba. La mano humana que enciende una mecha es la mitad de abajo de un acto que tiene mitad de arriba. Esa es la clave luriana de la fiesta, y es también, si se mira bien, la solución al primer día: el ser humano hace lo natural, y lo natural es la mitad inferior de algo.`,
      },
    ],
    glosa: `Glosa para el lector: Bet Yosef = la obra mayor de R. Yosef Caro (1488-1575), comentario al código llamado Tur; el Shulján Aruj es su resumen práctico. Jashmonaím / Macabeos = la familia sacerdotal que encabezó la revuelta. Sugiá = una unidad de discusión del Talmud. Baraitá = enseñanza tanaítica no incluida en la Mishná. Notarikón = lectura por partición o por letras iniciales. Shamash = la vela "sirviente" con la que se encienden las demás y de cuya luz sí está permitido servirse. Or haganuz = "la luz guardada", la luz del primer día que fue escondida. Ner = lámpara, vela. Hejal = el Santuario. Mehadrín = los que embellecen el precepto más allá del mínimo. Kislev = el noveno mes contando desde Nisán, en pleno invierno del hemisferio norte.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra los hechos son cinco, y ninguno necesita interpretación. Uno: la única fuente talmúdica del aceite es Shabat 21b, y dice que había para un día y ardió ocho. Dos: la resta es de siete, y quien la hizo por escrito fue el propio autor del Shulján Aruj (Bet Yosef, Oraj Jaim 670), que dio tres respuestas, todas buscando un milagro escondido dentro del primer día. Tres: el mismo pasaje explica por qué el número ocho no es arbitrario — siete días de purificación más uno de prensado, o cuatro de ida y cuatro de vuelta según el Ran: es el tiempo humano de fabricar aceite puro. Cuatro: la ley establece que la luz de esas velas no puede usarse para nada, ni siquiera para estudiar (Shulján Aruj, Oraj Jaim 673:1), y por eso existe el shamash. Cinco: la casa de Hilel dictaminó que se añade una vela cada noche y no que se restan, "porque en materia de santidad se sube y no se baja" (Shabat 21b).`,
          `De esos cinco hechos se sigue el pshat de la fiesta, y es más raro de lo que parece: Janucá conmemora una luz que no sirve para alumbrar, durante un número de días que corresponde al tiempo de trabajo humano, empezando por un día en que no pasó nada extraordinario, y aumentando en vez de disminuir. Todo en esa descripción va contra el instinto. Y no hay una sola de esas cuatro rarezas que sea un accidente.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números y las letras)",
        parrafos: [
          `Primera alusión, y es la que sostiene el encabezado. חֲנוּכָּה, escrito pleno, vale ח8 + נ50 + ו6 + כ20 + ה5 = 89. Y si partes esas mismas cinco letras en dos, חָנוּ (8+50+6 = 64) y כ״ה (20+5 = 25), la suma es 64 + 25 = 89. Tenía que dar lo mismo: son las mismas letras. Lo que interesa es el corte: חָנוּ כ״ה, "acamparon el veinticinco". El Bnei Yissajar lo lee así (Kislev-Tevet 2:5) para responder a nuestra pregunta: el nombre de la fiesta lleva incrustado el punto de partida de la cuenta, y ese punto de partida es el día que no fue milagroso. El nombre no dice "el milagro". Dice la FECHA. Y conviene ser honesto también con lo que no funciona: la grafía defectiva חֲנֻכָּה, que es la del Rambam, vale 83 y no cierra. La lectura vive de la grafía plena, que es la que trae el texto vocalizado del Talmud.`,
          `Segunda alusión, y esta es aritmética pura, verificable por cualquiera con un lápiz. La primera noche se enciende una vela; la segunda, dos; la tercera, tres; y así hasta ocho. Suma: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36. Treinta y seis velas exactas a lo largo de la fiesta (sin contar los shamashim; con ellos son 36 + 8 = 44). Este cálculo lo hizo Jashmal y da 36; y la tradición no solo lo conocía, sino que lo cargó de sentido. El Bnei Yissajar, en nombre del Baal HaRokeaj, escribe: "instituyeron treinta y seis velas frente a la luz primera, que sirvió a Adam treinta y seis horas" (Kislev-Tevet 2:8). Y esas treinta y seis horas no son un dato inventado: están en el Talmud de Jerusalén, Berajot 8:5, donde R. Leví en nombre de Bar Nazirá enseña "treinta y seis horas sirvió aquella luz que fue creada en el primer día: doce el viernes, doce en la noche de Shabat y doce en el día de Shabat". Una advertencia de integridad: el Bnei Yissajar remite a "la Pesiktá" y esa remisión no se pudo confirmar en el Pesiktá alojado; el dato de las treinta y seis horas sí se confirmó, verbatim, en el Yerushalmi. Se cita el Yerushalmi.`,
          `Tercera alusión, y cierra el 36 por otro lado. En el Talmud, Abaie enseña: לָא פָּחֵית עָלְמָא מִתְּלָתִין וְשִׁיתָּא צַדִּיקֵי — "no se reduce el mundo de treinta y seis justos que reciben el rostro de la Presencia", y lo deriva de "dichosos todos los que esperan por Él" (Yeshayá 30:18), porque la palabra לוֹ, "por Él", vale ל30 + ו6 = 36 (Sucá 45b y Sanedrín 97b, cotejados en ambos folios). El Sefat Emet ata los tres cabos en un solo pasaje: los príncipes de las tribus ofrendaron doce fuentes, doce tazones y doce cucharas —treinta y seis utensilios—, la palabra אֵלֶּה vale también 36 (1+30+5), y "así también las treinta y seis velas de Janucá" corresponden a los treinta y seis justos sobre los que se sostiene el mundo (Bereshit, para Janucá 18:7). Treinta y seis horas de luz primordial, treinta y seis justos escondidos, treinta y seis velas en la ventana: el mismo número, tres veces, para lo mismo — la cantidad mínima de luz que hace falta para que el mundo no se caiga.`,
          `Cuarta alusión, la del Kedushat Leví, y aquí lo asombroso es que la cuenta funciona en dos direcciones. Treinta y seis velas abajo y treinta y seis arriba dan 72, que es el valor de ע״ב, el Nombre de setenta y dos. Con el shamash de cada noche son 44 abajo y 44 arriba: 88, que se escribe פ״ח — y פַּח significa "lazo, trampa", como en "el lazo se rompió y nosotros escapamos" (Tehilim 124:7). Y entonces el Kedushat Leví trae, en nombre del Arizal, dos acrósticos que valen exactamente 88: las iniciales de נַפְשֵׁנוּ חִכְּתָה לַה׳ ("nuestra alma esperó a YHVH", Tehilim 33:20) son נ50 + ח8 + ל30 = 88; y las iniciales de la bendición לְהַדְלִיק נֵר חֲנוּכָּה son ל30 + נ50 + ח8 = 88. Todas las cuentas se hicieron letra por letra y todas cierran. Y el sentido que les da el Kedushat Leví es este: al encender abajo se rompe arriba la trampa. El lazo no se corta con una espada; se corta con una mecha.`,
          `Y una alusión que aquí se rechaza, porque el trabajo del Sofer incluye decir que no. יָוָן, Grecia, tal como la escribe el Tanaj, vale 66. Escrita a la moderna con dos vavs, יוון, vale 72 — y מַכַּבִּי también da 72, y las 36 más 36 del Kedushat Leví también dan 72. Tres cosas sin ninguna relación entre sí cayendo en el mismo número: eso no es un hallazgo, es ruido, y se descarta. Lo mismo con שֶׁמֶן (aceite) = 390 = שָׁמַיִם (cielos): la aritmética es impecable y no se halló una sola fuente clásica que ligue ambas palabras en clave de Janucá, así que no se usa. Una gematría sin fuente y sin necesidad es solo un número que se parece a otro.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica integrada",
        parrafos: [
          `Vuelve a la pregunta con lo que ya tienes en la mano y mírala de frente. El Bet Yosef supone —y todos suponemos con él— que un día que se explica por causas naturales es un día que no cuenta. Aceite que arde porque hay aceite: eso no merece vela. Pero entonces llega el Malbim y dice, sobre otro versículo y sin pensar en esta pregunta, la frase que la disuelve: אֵין הַנֵּס שׁוֹרֶה עַל דָּבָר רֵיקָן, "el milagro no reposa sobre una cosa vacía". Un milagro no aparece en el vacío; necesita algo sobre lo cual posarse. Los siete días sobrenaturales necesitaban un primer día natural para tener dónde apoyarse. Quita el aceite del primer día y no te quedan siete milagros: no te queda ninguno. El primer día no es el día flojo de Janucá; es el suelo. Y la fiesta dura ocho porque la cuenta correcta de un milagro incluye aquello sobre lo que se posó.`,
          `Ahora dale la vuelta y aplícatelo, porque ahí está el filo. Todos llevamos una contabilidad como la del Bet Yosef, y la aplicamos a nuestra vida sin darnos cuenta. Lo que se explica solo, no cuenta. El cuerpo que hoy funcionó no cuenta, porque los cuerpos funcionan. La persona que sigue a tu lado no cuenta, porque lleva años ahí. El trabajo que salió no cuenta, porque para eso trabajaste. Reservamos la gratitud para el excedente inexplicable —para los siete días sobrenaturales— y damos por perdido el primero. Y así se vive una vida entera dentro de un milagro sin encender una sola vela por él, porque tiene explicación. Janucá enciende ocho a propósito.`,
          `La voz jasídica lo dice sin aspereza y con una precisión rara. El Sefat Emet observa que el Talmud instituyó estos días "con Halel y con acción de gracias", y que son dos gestos opuestos: "Halel es luz y alegría; hodaá es temor y humillación. Porque así es la medida: cuando el hombre se eleva, y desde la comprensión llega a humillarse más, es señal de que es un amor verdadero y duradero". Y por eso, dice, la disputa entre Bet Shamai y Bet Hilel —restar o añadir— no tiene un bando equivocado: שְׁנֵיהֶם אֱמֶת, "ambos son verdad", porque cada día de Janucá hay que elevarse más y también rebajarse más (Bereshit, para Janucá 18:3). Ahí está el equilibrio del mes: la luz sube, y el que la enciende baja. Si solo sube, es entusiasmo. Si solo baja, es tristeza. Janucá pide las dos cosas en la misma noche, ocho noches seguidas.`,
          `Y hay una escena antigua que resume todo esto mejor que cualquier explicación, y está en el mismo pasaje del Talmud de Jerusalén de las treinta y seis horas. Cuando la luz del primer día se terminó y salió el Shabat, cuenta R. Leví, Adam vio venir la oscuridad y tuvo miedo. ¿Y qué hizo el Santo? זִימֵּן לוֹ הַקָּדוֹשׁ בָּרוּךְ הוּא שְׁנֵי רַעֲפִין וְהֶקִּישָׁן זֶה לָזֶה וְיָצָא מֵהֶן הָאוֹר — le preparó dos pedernales, y Adam los golpeó uno contra otro, y salió de ellos la luz (Yerushalmi, Berajot 8:5). Léelo despacio. La luz regalada duró treinta y seis horas y se acabó. Lo que vino después no fue otra luz regalada: fue una piedra, otra piedra, y un ser humano golpeando. Ese es el fuego natural — y es también el primer día de Janucá. La tradición no lo trata como un descenso. Lo trata como el comienzo de la parte humana. Y por eso, si preguntas cuántas velas hay que encender, la respuesta es treinta y seis: exactamente las horas de aquella primera luz, ahora en manos de gente que golpea pedernales en la oscuridad de Kislev.`,
          `Falta decir por qué en Kislev, y el Midrash lo dice sin rodeos. Leyendo el segundo versículo de la Torá como un mapa de los exilios, Reish Lakish enseña: "'y tiniebla' — este es el exilio de Grecia, que oscureció los ojos de Israel con sus decretos, pues les decía: escriban sobre el cuerno del buey que no tienen parte en el Dios de Israel" (Bereshit Rabá 2:4). Nota qué clase de tiniebla es esa. Grecia no destruyó el Templo; el Templo estaba en pie. No prohibió pensar; regaló filosofía. Lo que hizo fue oscurecer los OJOS: dejar todo en su sitio y quitarle el sentido. Escriban en el cuerno del buey —en el instrumento de trabajo, en lo más cotidiano— que esto no tiene nada que ver con Dios. Ese decreto no necesita ejército para cumplirse. Se cumple solo, cada vez que alguien mira su día entero, ve que todo funciona, y concluye que no hay a quién agradecer.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de Janucá es una ley de la estructura de la realidad, y Rav Yehuda Ashlag, el Baal HaSulam, la formuló en cinco palabras: כִּי אֵין אוֹר בְּלִי כְּלִי, "porque no hay luz sin vaso". Y en el mismo pasaje explica por qué: "la luz depende de la voluntad, y la voluntad es el LUGAR de la luz… porque no hay coerción en lo espiritual" (Talmud Eser HaSefirot I, Histaklut Penimit 2:14). Léelo junto a la frase del Malbim y verás que son la misma ley dicha desde dos oficios distintos: el comentarista bíblico dice que el milagro no se posa sobre lo vacío; el cabalista dice que la luz no existe sin un recipiente que la contenga. Ninguno de los dos está haciendo poesía. Están describiendo una condición: lo de arriba necesita un lugar abajo, y ese lugar no lo pone lo de arriba.`,
          `Aplícalo a la vasija y la fiesta se ordena entera. El aceite del primer día es el vaso; los siete días siguientes son la luz. No es que el primer día "casi no cuenta": es que sin él no hay dónde. Y de golpe entiendes por qué la tradición insiste tanto en el trabajo humano alrededor de este milagro. El número ocho sale del tiempo que tarda una persona en purificarse y prensar aceitunas. La ley de encender es "hasta que la llama suba por sí misma" — o sea, el hombre trabaja hasta el punto exacto en que la cosa empieza a vivir sola. Y el Arizal, citado por el Kedushat Leví, lo dice como principio: בְּעוֹבָדָא דִּלְתַתָּא אִיתְעַר לְעֵילָא, por un acto de abajo se despierta lo de arriba. Nadie enciende por ti. La ley espiritual es la misma que la del pedernal de Adam: se te dan dos piedras, y el golpe es tuyo.`,
          `Y el secreto último, el que explica la ley más extraña de la fiesta. Está prohibido usar la luz de las velas de Janucá — para nada, ni siquiera para estudiar Torá; solo para mirarlas (Tratado Soferim 20:6; Shulján Aruj, Oraj Jaim 673:1). ¿Por qué una luz inútil? Porque no es luz para ver: es la luz que fue guardada. R. Elazar enseña que la luz del primer día permitía ver de un extremo del mundo al otro, y que Dios "se levantó y la guardó" al ver las generaciones que vendrían — וּלְמִי גְּנָזוֹ, לַצַּדִּיקִים לֶעָתִיד לָבֹא, "¿y para quién la guardó? Para los justos en el porvenir" (Jaguigá 12a). Y el Bnei Yissajar, en nombre del Rokeaj, dice sin rodeos que el resplandor del precepto de la vela de Janucá viene del resplandor de esa luz guardada. Esa es la razón de la prohibición: no se puede usar lo que todavía no ha llegado. Solo se puede mirar. Y esa misma lógica ya regía en el Templo, donde el candelabro nunca alumbró: "no necesito su luz… sino que es un testimonio para los que vienen al mundo de que la Presencia mora en Israel" (Shabat 22b; Menajot 86b). Una luz que no sirve para nada y que solo atestigua que Él está. Por eso el Rambán pudo decir lo que dijo: los sacrificios se acabaron con el Templo, pero las lámparas siguen — porque una luz que nunca fue útil tampoco puede volverse inútil.`,
        ],
      },
    ],
    caja: {
      titulo: "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36 — y el primer día es el suelo de los otros siete.",
      cuerpo:
        "Treinta y seis velas en ocho noches; treinta y seis horas sirvió la luz del primer día del mundo (Yerushalmi, Berajot 8:5); treinta y seis justos sostienen el mundo, porque לוֹ vale 36 (Sucá 45b). Y la razón por la que la fiesta dura ocho y no siete la dio el Malbim sin saberlo: אֵין הַנֵּס שׁוֹרֶה עַל דָּבָר רֵיקָן — el milagro no reposa sobre una cosa vacía. El día natural no es el día que sobra: es aquello sobre lo cual el milagro se pudo posar.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que llevo una contabilidad injusta y no me había dado cuenta. Reservo el asombro para lo que no tiene explicación y descuento automáticamente todo lo que la tiene, como si tener causa natural fuera lo mismo que no tener valor. La pregunta del Bet Yosef me la puso delante con números; la respuesta del Malbim me la desarmó con una frase. Lo que se explica solo no es lo que sobra en la suma: es aquello sin lo cual no hay suma. Si mañana quitara de mi vida todo lo que "se entiende", no me quedaría lo extraordinario. No me quedaría nada.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón del recipiente: no hay luz sin vaso, no hay milagro sobre lo vacío, no hay respuesta de arriba sin un acto abajo. Es la misma ley dicha por un comentarista bíblico, por un cabalista y por una halajá de encender. Veo el patrón del aumento: se añade una vela cada noche y no se resta, porque en santidad se sube y no se baja — y sin embargo el Sefat Emet dice que ambas escuelas tienen razón, porque cuanto más sube la luz, más se inclina el que la enciende. Y veo el patrón de la luz inútil: la única lámpara que sobrevivió al Templo es precisamente la que nunca sirvió para alumbrar. Lo que no tiene función no se puede perder cuando la función desaparece.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Me da un nombre para una tiniebla que conozco bien. La tiniebla de Grecia, dice el Midrash, no derribó nada: oscureció los ojos, y su decreto era escribir en el cuerno del buey —en la herramienta de todos los días— que esto no tiene nada que ver con Dios. Yo firmo ese decreto muchas veces por semana sin darme cuenta, cada vez que miro un día entero que salió bien y no se me ocurre agradecer nada porque, bien mirado, todo tenía su causa. Y me da también el consuelo: cuando la primera luz se acabó, a Adam no le devolvieron la luz. Le dieron dos piedras. Mi parte no es esperar el resplandor; es golpear.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `La luz del primer día fue creada antes del sol y guardada para después, y sirvió treinta y seis horas; treinta y seis justos escondidos sostienen el mundo; treinta y seis velas se encienden en ocho noches de invierno. El mismo número por debajo de la creación, de la humanidad y de una ventana cualquiera en diciembre — y la cantidad no es grande: es la mínima. El mundo no se sostiene por una inundación de luz. Se sostiene por lo justo, escondido, y siempre a punto de no alcanzar. Que la fiesta empiece en el mes más oscuro y aumente noche a noche dice cómo funciona la creación entera: no de golpe, y no desde la abundancia.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, haz la lista del primer día: escribe tres cosas que hoy salieron bien y que normalmente no agradeces porque «se explican solas» — y agradécele UNA de ellas a una persona, por su nombre, antes de dormir.",
    texto: `Esto se hace en dos capas, y la primera cuesta menos de diez minutos. Toma un papel y escribe tres cosas de HOY que funcionaron y que jamás se te ocurriría celebrar, precisamente porque tienen explicación: el cuerpo que te sostuvo, la comida que hubo, alguien que hizo lo que siempre hace, un problema que no ocurrió. No busques lo extraordinario; busca deliberadamente lo que tiene causa conocida. Ese es el ejercicio: contar el primer día. Y no lo dejes en el papel — de las tres, elige una que dependa de una persona concreta y díselo hoy mismo, con nombre y sin adornos: "esto que haces siempre, hoy me di cuenta, gracias". Que sea antes de dormir. Lo que se agradece tarde ya no es lo mismo.

Segunda capa, más larga y para el resto del año: elige UN terreno donde vengas descontando lo que funciona —tu salud, tu casa, tu oficio, una amistad de muchos años— y proponte durante ocho días seguidos anotar una sola línea sobre él, sin repetir. Ocho días, no siete: incluye el día que no tenía nada de especial, porque ese es el punto entero de este estudio. Y si quieres una preparación real para diciembre, apunta esto en la agenda ahora: la primera vela de Janucá 5787 se enciende la tarde del viernes 4 de diciembre de 2026, antes de las velas de Shabat. Consigue las velas con tiempo, ponlas donde se vean desde la calle, y esa primera noche —la del día en que no hubo milagro— enciende una sola, y quédate mirándola sin hacer otra cosa. La ley dice que no está permitido usar su luz, solo mirarla. Es la única ocasión del año en que se te ordena, expresamente, no sacarle provecho a algo.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El Bet Yosef preguntó lo que nadie se atreve: si había aceite para un día y ardió ocho, el milagro fue de siete, y la fiesta debería durar siete (Oraj Jaim 670, sobre Shabat 21b). Dio tres respuestas, todas buscando un milagro escondido dentro del primer día. Este estudio propone seguir la otra ruta, la que abre el Malbim sin proponérselo: אֵין הַנֵּס שׁוֹרֶה עַל דָּבָר רֵיקָן, el milagro no reposa sobre una cosa vacía. El primer día no es el día que sobra: es aquello sobre lo cual los otros siete pudieron posarse.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El número ocho es el tiempo humano: siete días de purificación más uno de prensar aceitunas, o cuatro de ida y cuatro de vuelta según el Ran (Bet Yosef, ibid.). Y la ley de encender es "hasta que la llama suba por sí misma" (Rashi a Bamidbar 8:2, remitiendo a Shabat 21a). El trabajo del ser humano llega exactamente hasta el punto en que la cosa empieza a vivir sola. Ni un centímetro menos, ni uno más.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `La luz de esas velas no se puede usar para nada, ni siquiera para estudiar; solo mirarlas (Tratado Soferim 20:6; Shulján Aruj, Oraj Jaim 673:1). Es la misma naturaleza que la del candelabro del Templo: "no necesito su luz… es un testimonio de que la Presencia mora en Israel" (Shabat 22b; Menajot 86b). Y por eso —dice el Rambán— los sacrificios se acabaron con el Templo pero las lámparas siguen (a Bamidbar 8:2): una luz que nunca fue útil tampoco puede volverse inútil. En ocho noches se encienden 36 velas, las mismas 36 horas que sirvió la luz del primer día del mundo (Yerushalmi, Berajot 8:5).`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Escribir hoy tres cosas que salieron bien y que normalmente no se agradecen "porque se explican solas", y agradecerle una de ellas a una persona por su nombre antes de dormir. Contar el primer día. Y anotar la fecha: la primera vela de Janucá 5787 se enciende la tarde del viernes 4 de diciembre de 2026, antes de las velas de Shabat.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal, marcada como tal. Las fuentes que usa sí están verificadas; el modo de unirlas es propio.",
    parrafos: [
      `Hay una figura de la que la tradición no hace doctrina y que aquí se ofrece solo como lectura. En el Talmud de Jerusalén, cuando se acaba la luz de las treinta y seis horas y Adam ve venir la oscuridad, Dios no le devuelve la luz: le prepara dos pedernales y Adam los golpea, y de ellos sale fuego (Berajot 8:5). En la vela de Janucá pasa algo parecido y nadie lo señala: la única llama de la que sí está permitido servirse es la del shamash — la vela que no cuenta, la que está para encender a las otras y para que, si necesitas ver, veas con ella. Las velas del precepto solo se miran. La vela de trabajo es la que ilumina.`,
      `Léelo como imagen y encaja entero: hay en tu vida una luz que solo se mira —lo que no rinde, lo que no sirve para nada, lo que está ahí para atestiguar que Alguien está— y hay una luz de trabajo, la del pedernal, con la que efectivamente cocinas, lees y encuentras la puerta. La tentación de Grecia no es apagar la primera. Es convencerte de que la segunda es la única que hay, y de que lo que no sirve para nada no existe. Nadie está obligado a leerlo así. Pero que la halajá haya inventado una vela suplementaria SOLO para proteger la inutilidad de las otras ocho es, por lo menos, una decisión bien colocada.`,
    ],
  },

  hemshej: [
    "{{study:sucot|En Sucot el techo se deja ralo para que entre la luz de afuera; en Janucá la luz se pone en la ventana para que salga. ¿Por qué la misma tradición manda las dos cosas?}}",
    "{{study:despertar-de-lo-alto|Aquí el primer golpe es del hombre: dos pedernales y una mecha. ¿Y la luz que nadie se gana? La otra mitad del asunto: el despertar desde Arriba.}}",
    "{{study:olam-haba|La luz del primer día fue guardada «para los justos en el porvenir» (Jaguigá 12a). ¿Dónde está guardada, y qué significa que un mundo entero sea, todavía, una promesa?}}",
    "{{study:tercer-templo|El Rambán dijo que los sacrificios se acabaron con el Templo pero las lámparas siguen. ¿Qué vuelve, entonces, cuando se habla de un Templo que vuelve?}}",
  ],

  ctaRef: "Zechariah 4:6",
};
