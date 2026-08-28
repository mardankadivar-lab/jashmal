import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — פּוּרִים · וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי
//  Serie «Tiempos Sagrados» (moadim) · Estudio 8 — Purim.
//
//  Hero en modo "par": הַטֶּבַע = אֱלֹהִים = 86 (verificado letra por letra;
//  la igualdad la enuncia Toldot Yaakov Yosef, Vayeshev 95 — R. Yaakov Yosef
//  de Polnoye, discípulo directo del Baal Shem Tov: "כי הטבע בגימטריא אלדים").
//
//  FUENTES VERIFICADAS CONTRA LA API DE SEFARIA (2026-08-27, 14 de Elul 5786).
//  Todo el hebreo citado abajo se trajo de la API, no de memoria.
//
//  EL DATO CENTRAL — CONTADO POR MÍ, NO CITADO DE OÍDAS
//   · Se descargaron los 10 capítulos de Ester desde la API (versión hebrea
//     "Miqra according to the Masorah"), se les quitaron nekudot y te'amim y se
//     contaron: 167 versículos; 3090 palabras si cada unidad separada cuenta
//     como palabra, 2641 si las parejas unidas por maqaf cuentan como una sola
//     (el estudio da los dos números y dice el criterio). Búsqueda de יהוה,
//     אלהים, אדני, שדי, צבאות, אל como Nombre: CERO apariciones. La única
//     secuencia "אל" del libro (3:12) es la preposición "a/hacia", no el Nombre.
//     Tampoco aparecen "cielo" como epíteto divino, "el Lugar" (המקום),
//     "bendito", "oración" ni "santo". El libro habla 182 veces de "el rey"
//     (המלך) y 25 de "Ajashverosh".
//   · ACRÓSTICOS: se recorrieron TODAS las ventanas de cuatro palabras
//     consecutivas de los 167 versículos buscando יהוה / אהיה en iniciales o
//     finales, hacia adelante y hacia atrás. Resultado: exactamente SEIS, que
//     son justo los que señala la tradición —
//       1:20 "הִיא וְכָל הַנָּשִׁים יִתְּנוּ"  → iniciales, al revés = יהוה
//       5:4  "יָבוֹא הַמֶּלֶךְ וְהָמָן הַיּוֹם" → iniciales, hacia adelante = יהוה
//       5:13 "זֶה אֵינֶנּוּ שֹׁוֶה לִי"        → finales, al revés = יהוה
//       7:7  "כִּי כָלְתָה אֵלָיו הָרָעָה"      → finales, hacia adelante = יהוה
//       7:5  "הוּא זֶה וְאֵי זֶה הוּא"          → finales = אהיה (en ambos sentidos)
//     Son NOTARIKÓN (lectura por letras), NO apariciones del Nombre. Así se
//     presentan en el estudio, con el aviso de apertura.
//
//  TANAJ
//   · Ester 4:13 · 4:14 · 4:16 · 6:1 · 9:1 · 9:22 · 9:26 · 9:27-28 · 2:7 ·
//     2:20 · 3:1 · 3:7 · 5:4 · 8:16 — texto puntuado cotejado.
//   · Devarim 31:18 — "וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי". Cotejado.
//   · Devarim 25:17-19 y Shemot 17:14-16 — Amalek. Cotejados.
//   · Shmuel I 15:8 — Agag rey de Amalek (de donde "הָאֲגָגִי" de Ester 3:1).
//
//  TALMUD
//   · Julín 139b — cotejado PALABRA POR PALABRA. La serie completa es:
//     "מֹשֶׁה מִן הַתּוֹרָה מִנַּיִן? בְּשַׁגַּם הוּא בָשָׂר. הָמָן מִן הַתּוֹרָה
//     מִנַּיִן? הֲמִן הָעֵץ. אֶסְתֵּר מִן הַתּוֹרָה מִנַּיִן? וְאָנֹכִי הַסְתֵּר
//     אַסְתִּיר. מָרְדֳּכַי מִן הַתּוֹרָה מִנַּיִן? מָר דְּרוֹר, וּמְתַרְגְּמִינַן
//     מֵירָא דַכְיָא". El "המן העץ" es Bereshit 3:11, cotejado.
//   · Meguilá 7a — Ester pide "קִבְעוּנִי לְדוֹרוֹת" / "כִּתְבוּנִי לְדוֹרוֹת";
//     el debate sobre ruaj hakodesh (R. Eliezer desde "וַיֹּאמֶר הָמָן בְּלִבּוֹ",
//     R. Akivá, R. Meir, R. Yosé ben Dormaskit); Shmuel: "קִיְּמוּ וְקִבְּלוּ —
//     קִיְּמוּ לְמַעְלָה מַה שֶּׁקִּיבְּלוּ לְמַטָּה"; Ravá: todas tienen refutación
//     salvo la de Shmuel. Y Rav Yosef: dos porciones a UNA persona, dos regalos
//     a DOS pobres. Todo cotejado.
//   · Meguilá 7b — "אָמַר רָבָא: מִיחַיַּיב אִינִישׁ לְבַסּוֹמֵי בְּפוּרַיָּא עַד
//     דְּלָא יָדַע בֵּין אָרוּר הָמָן לְבָרוּךְ מָרְדֳּכַי", cotejado; e inmediatamente
//     después, en la misma página, el relato de Rabá y Rabí Zeira que termina en
//     "לָא בְּכָל שַׁעְתָּא וְשַׁעְתָּא מִתְרְחִישׁ נִיסָּא". Se citan juntos, que es
//     como el propio Talmud los puso.
//   · Meguilá 12a — R. Shimon bar Yojái: "הֵם לֹא עָשׂוּ אֶלָּא לִפְנִים — אַף
//     הַקָּדוֹשׁ בָּרוּךְ הוּא לֹא עָשָׂה עִמָּהֶן אֶלָּא לִפְנִים", con "כִּי לֹא
//     עִנָּה מִלִּבּוֹ" (Eijá 3:33). Cotejado.
//   · Meguilá 13a — R. Yehudá: "הֲדַסָּה שְׁמָהּ, וְלָמָּה נִקְרֵאת שְׁמָהּ
//     אֶסְתֵּר? עַל שֵׁם שֶׁהָיְתָה מַסְתֶּרֶת דְּבָרֶיהָ". Cotejado.
//   · Meguilá 13b — Rajel y Shaul, la צניעות que engendra a Ester; "הִפִּיל פּוּר
//     הוּא הַגּוֹרָל… נָפַל לִי פּוּר בְּיֶרַח שֶׁמֵּת בּוֹ מֹשֶׁה, וְלֹא הָיָה
//     יוֹדֵעַ שֶׁבְּשִׁבְעָה בַּאֲדָר מֵת וּבְשִׁבְעָה בַּאֲדָר נוֹלָד"; y Reish
//     Lakish: "אֵין הַקָּדוֹשׁ בָּרוּךְ הוּא מַכֶּה אֶת יִשְׂרָאֵל אֶלָּא אִם כֵּן
//     בּוֹרֵא לָהֶם רְפוּאָה תְּחִילָּה". Cotejados.
//   · Meguilá 15b — R. Leví: al entrar en el patio interior "נִסְתַּלְּקָה
//     הֵימֶנָּה שְׁכִינָה, אָמְרָה: אֵלִי אֵלִי לָמָה עֲזַבְתָּנִי"; y R. Tanjum
//     sobre 6:1: "נָדְדָה שְׁנַת מַלְכּוֹ שֶׁל עוֹלָם", con la lectura literal de
//     Ravá al lado. Cotejados.
//   · Yomá 29a — R. Assi: "מָה שַׁחַר סוֹף כָּל הַלַּיְלָה, אַף אֶסְתֵּר סוֹף כָּל
//     הַנִּסִּים", y la aclaración "נִיתְּנָה לִכְתּוֹב קָא אָמְרִינַן". Cotejado.
//   · Shabat 88a — Ravá: "אַף עַל פִּי כֵן הֲדוּר קַבְּלוּהָ בִּימֵי אֲחַשְׁוֵרוֹשׁ,
//     דִּכְתִיב קִיְּמוּ וְקִבְּלוּ הַיְּהוּדִים — קִיְּימוּ מַה שֶּׁקִּיבְּלוּ כְּבָר",
//     tras la baraíta del monte sostenido como una tinaja. Cotejado.
//   · Eruvín 65a — R. Jiyá: "יַיִן נִיתַּן בְּשִׁבְעִים אוֹתִיּוֹת וְסוֹד נִיתַּן
//     בְּשִׁבְעִים אוֹתִיּוֹת. נִכְנַס יַיִן — יָצָא סוֹד". Cotejado.
//
//  COMENTARISTAS Y CÓDIGOS
//   · Ibn Ezra, introducción a Ester (Sefaria: "Ibn Ezra on Esther 1:1") —
//     cotejada entera: "וְהִנֵּה אֵין בַּמְּגִלָּה הַזֹּאת זֵכֶר הַשֵּׁם וְהִיא
//     מִסִּפְרֵי הַקֹּדֶשׁ, וְרַבִּים הֵשִׁיבוּ כִּי הוּא מִמָּקוֹם אַחֵר, וְזֶה
//     אֵינֶנּוּ נָכוֹן, כִּי לֹא נִקְרָא הַשֵּׁם מָקוֹם בְּכָל סִפְרֵי הַקֹּדֶשׁ…
//     וְעוֹד, מַה טַּעַם לְמִלַּת אַחֵר?" y su propia respuesta (los persas
//     copiaban la crónica y sustituían el Nombre por el de su abominación).
//   · Rashi a Ester 6:1 — "נֵס הָיָה". Cotejado.
//     HONESTIDAD: Rashi a Ester 4:14 comenta SOLO "וּמִי יוֹדֵעַ", "לְעֵת כָּזֹאת"
//     y "הִגַּעַתְּ לַמַּלְכוּת" — NO comenta "מִמָּקוֹם אַחֵר". Y a Ester 9:1 la
//     consulta devuelve texto vacío. Se dice explícitamente en el estudio.
//   · Rashi a Devarim 25:18 — "אֲשֶׁר קָרְךָ בַּדֶּרֶךְ: לְשׁוֹן מִקְרֶה" (más las
//     otras dos lecturas). Cotejado.
//   · Ramban a Devarim 25:17 — la zejirá "בַּפֶּה", y su observación
//     "וְיִהְיֶה סֶמֶךְ לְמִקְרָא מְגִלָּה מִן הַתּוֹרָה". Cotejado.
//     HONESTIDAD: el Ramban NO escribió comentario a Ester; se le cita donde sí
//     habla, que es Amalek. Así se dice.
//   · Abarbanel a Devarim 25:17 ("Abarbanel on Torah") — su método (repasa a
//     Rashi y al Ralbag y luego "נִרְאֶה לִי בְּפֵירוּשׁ הַפְּסוּקִים דֶּרֶךְ אַחֵר")
//     y su tesis: "אַל תֹּאמַר בִּלְבָבְךָ מִלְחָמָה לַה' וְיִשְׂרָאֵל יִשְׁכּוֹן
//     לָבֶטַח, אֵין לִי בָּזֶה דָּבָר… וְלָכֵן לָכֶם תָּאוּת הַנְּקִימָה". Cotejado.
//     HONESTIDAD: Sefaria no aloja Abarbanel a Ester; se le cita en Devarim.
//   · Malbim a Ester 4:14 · 6:1 · 9:1 — cotejados los tres. En 4:14: si Ester
//     se demora, "בְּהֶכְרֵחַ יָקוּמוּ וְיַגִּיעוּ הַסִּבּוֹת הָאֲחֵרוֹת לַתְּשׁוּעָה".
//     En 9:1: los dos milagros, "וְנַהֲפוֹךְ הוּא שֶׁנִּתְהַפֵּךְ הַדָּבָר מֵהֵפֶךְ
//     אֶל הֵפֶךְ" y que vencieron "הֵמָּה בְּעַצְמָם בְּלִי שׁוּם עֵזֶר וְסִיּוּעַ".
//   · Rambam, Hiljot Meguilá 2:15 · 2:16 · 2:17 · 2:18 — cotejados. 2:17:
//     "מוּטָב לָאָדָם לְהַרְבּוֹת בְּמַתְּנוֹת אֶבְיוֹנִים מִלְּהַרְבּוֹת
//     בִּסְעֻדָּתוֹ… שֶׁהַמְשַׂמֵּחַ לֵב הָאֻמְלָלִים הָאֵלּוּ דּוֹמֶה לַשְּׁכִינָה".
//     2:18: "כָּל סִפְרֵי הַנְּבִיאִים וְכָל הַכְּתוּבִים עֲתִידִין לִבָּטֵל לִימוֹת
//     הַמָּשִׁיחַ חוּץ מִמְּגִלַּת אֶסְתֵּר".
//   · Arizal — Sha'ar HaKavanot, "Sermons on the Festival of Purim", drush 1
//     (8 segmentos, leídos enteros en Sefaria). De ahí sale, literalmente:
//     la dormitá de Zeir Anpin en el exilio; "וְנוֹדַע כִּי הָמָן הָרָשָׁע הָיָה
//     אַסְטְרוֹלוֹגוּס גָּדוֹל… וְיָדַע בְּחָכְמָתוֹ עִנְיַן מִיעוּט הַשְׁגָּחָתוֹ
//     יִתְבָּרַךְ עַל יִשְׂרָאֵל בַּיָּמִים הָהֵם לִהְיוֹתוֹ בִּבְחִינַת הַשֵּׁינָה";
//     la razón de por qué solo la meguilá no se anula; el mapa de las tres
//     mitzvot; "אַסְתֵּר בְּגִימַטְרִיָּא תרס"א… שֵׁם אדנ"י בְּמִילּוּאוֹ הוּא תרע"א,
//     וְהִנֵּה שֵׁם אֶסְתֵּר חֲסֵרָה י', וּבְתוֹכָהּ מִסְתַּתֶּרֶת הַנְּקוּדָּה
//     הַפְּנִימִית… הַנִּקְרֵאת אֶסְתֵּר עַל שֵׁם שֶׁמִּסְתַּתֶּרֶת"; la explicación
//     del "ad delo yadá" (la chispa dentro de la klipá, y que por eso debe
//     decirse SIN kavaná); y por qué en Purim se da a todo el que extiende la
//     mano. Todo cotejado.
//   · Baal HaSulam — Talmud Eser HaSefirot, Introducción §166-§180. Cotejado.
//     Las cuatro percepciones de la Providencia; la parábola del rostro y la
//     espalda; y la definición del "hester dentro del hester": "תּוֹלִים חַס
//     וְשָׁלוֹם זֹאת בְּמִקְרֶה וּבַטֶּבַע" — lo atribuyen al azar y a la
//     naturaleza. Construido sobre Devarim 31:18, el mismo verso de Julín 139b.
//   · Toldot Yaakov Yosef, Vayeshev 95 — "כִּי הַטֶּבַע בְּגִימַטְרִיָּא אֱלֹדִים".
//     Cotejado. Es la fuente jasídica de la gematría del hero.
//   · Shem MiShmuel, Purim 7:11 — Amalek como "הֶסְתֵּר כָּפוּל". Cotejado.
//
//  LO QUE SE DESCARTÓ, Y POR QUÉ
//   · "יוֹם הַכִּפּוּרִים = יוֹם כְּ־פּוּרִים" ("un día como Purim"). Se buscó en
//     Sefaria dentro de Tikunei Zohar y NO se encontró el pasaje. Lo que SÍ se
//     encontró es que Rabí Tzadok HaCohen de Lublin la cita dos veces como algo
//     que está "בַּתִּיקּוּנִים" (Resisei Layla 58:6 y Peri Tzadik, Vayelej y
//     Shabat Shuvá 21:4). Por eso el estudio la presenta como lectura
//     tradicional difundida y atribuida a los Tikunim por R. Tzadok, SIN
//     inventar folio. Se dice en el aviso.
//   · אֶסְתֵּר = 661 y הַסְתֵּר = 665: NO son iguales. El vínculo entre "Ester" y
//     "ocultar" es de RAÍZ (ס־ת־ר) y lo hace el Talmud en Julín 139b, no de
//     gematría. Se dice explícitamente para que nadie lo repita mal.
//   · הָמָן = הַמֶּלֶךְ = 95. Es cierto (verificado), pero no aporta nada
//     doctrinal y se presta a confusión con la lectura de "el rey" como el Rey
//     del mundo. DESCARTADA; no se usa.
//   · פּוּר = 286 · פּוּרִים = 336 · הַפּוּר = 291 · גּוֹרָל = 239 · וְנַהֲפוֹךְ הוּא
//     = 179 · מְגִילָּה = 88. Ninguna cierra con nada que valga la pena.
//     DESCARTADAS.
//   · Ramban y Abarbanel a Ester: no existen / no están alojados en Sefaria. No
//     se les pone ni una palabra en la boca sobre la meguilá.
//
//  GEMATRÍAS CALCULADAS LETRA POR LETRA (script propio, no de memoria):
//    הַטֶּבַע = ה5+ט9+ב2+ע70 = 86 · אֱלֹהִים = א1+ל30+ה5+י10+ם40 = 86
//    עֲמָלֵק = ע70+מ40+ל30+ק100 = 240 · סָפֵק = ס60+פ80+ק100 = 240
//    יַיִן = י10+י10+ן50 = 70 · סוֹד = ס60+ו6+ד4 = 70
//    אָרוּר הָמָן = 407+95 = 502 · בָּרוּךְ מָרְדֳּכַי = 228+274 = 502
//    אֶסְתֵּר = א1+ס60+ת400+ר200 = 661 · שׁוֹשַׁנָּה = 661
//    אדנ"י en miluí (אלף דלת נון יוד) = 111+434+106+20 = 671 · 671 − 661 = 10 = י
//
//  FECHA (verificada con el conversor de hebcal, no de memoria):
//    5787 es año embolismal (me'uberet): tiene Adar I y Adar II. Purim cae el
//    14 de ADAR II = martes 23 de marzo de 2027. (El 14 de Adar I es Purim
//    Katán.) Taanit Ester: 13 de Adar II = lunes 22 de marzo de 2027.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "purim",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 8 — Purim · el milagro que se disfraza de casualidad",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۸ — پوریم · معجزه‌ای که در جامهٔ تصادف پنهان است",
    he: "וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי",
    titulo: "Purim — el Nombre que no aparece",
    tituloFa: "پوریم — نامی که هرگز نمی‌آید",
    ganchoEs:
      "Diez capítulos, ciento sesenta y siete versículos, más de tres mil palabras — y ni una sola vez el Nombre de Dios. Es el único libro del Tanaj donde eso ocurre, y no es un descuido del copista: es la tesis del libro. Purim es la fiesta del Dios que actúa sin dejarse ver. Por eso se celebra con máscaras.",
    ganchoFa:
      "ده باب، صد و شصت و هفت آیه، بیش از سه هزار واژه — و حتی یک بار نامِ خدا نیامده است. تنها کتابِ تنَخ که چنین است، و این سهوِ کاتب نیست: تزِ خودِ کتاب است. پوریم جشنِ خدایی است که عمل می‌کند بی‌آنکه دیده شود. برای همین با نقاب برگزار می‌شود.",
    par: {
      a: { he: "הַטֶּבַע", rom: "hateva (la naturaleza)" },
      b: { he: "אֱלֹהִים", rom: "Elokim (el Nombre del juicio)" },
      valor: "86",
    },
    fecha: "Purim 5787 · 14 de Adar II · 23 mar 2027",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — qué es dato, qué es lectura y qué no se pudo confirmar",
    rotulo:
      "Se dice de entrada, antes de entrar en materia, porque en este estudio la diferencia entre las tres cosas ES el tema.",
    parrafos: [
      "Primero, el dato duro, y lo conté yo mismo antes de escribir una sola línea. Se descargaron los diez capítulos de Ester del texto hebreo masorético, se les quitaron los puntos vocálicos y los acentos, y se contaron: 167 versículos y unas tres mil palabras (3090 si se cuenta como palabra cada unidad separada, 2641 si las parejas unidas por maqaf se cuentan como una sola). Búsqueda exhaustiva de יהוה, אֱלֹהִים, אֲדֹנָי, שַׁדַּי, צְבָאוֹת y אֵל como Nombre: cero apariciones. (La única secuencia \"אל\" del libro está en 3:12 y es la preposición \"a, hacia\", no el Nombre.) Tampoco aparecen \"el Cielo\" como epíteto divino, \"el Lugar\", \"bendito\", \"oración\" ni \"santo\". Lo que sí aparece, 182 veces, es \"el rey\". Eso no es interpretación: es aritmética, y cualquiera puede repetirla.",
      "Segundo, los acrósticos. La tradición señala en Ester unas pocas frases donde las iniciales o las finales de cuatro palabras seguidas forman el Nombre. Se verificaron recorriendo TODAS las ventanas de cuatro palabras consecutivas del libro entero, hacia adelante y hacia atrás. El resultado es exacto y es corto: cinco frases, en 1:20, 5:4, 5:13 y 7:7 (para יהוה) y en 7:5 (para אֶהְיֶה, que ahí se lee igual en los dos sentidos). No hay ninguna más en todo el libro, y son justamente las que la tradición señala. Eso es un נוֹטָרִיקוֹן (notarikón): una lectura por letras iniciales o finales. No es una aparición del Nombre en el texto, y este estudio nunca lo llama así. El Nombre sigue ausente; lo que hay es una firma escondida en la costura.",
      "Tercero, una lectura famosa que NO se pudo documentar. Se repite mucho que el Tikunei Zohar lee \"יוֹם הַכִּפּוּרִים\" como \"יוֹם כְּ־פּוּרִים\", \"un día COMO Purim\". Se buscó el pasaje dentro del Tikunei Zohar y no se encontró. Lo que sí se encontró es que Rabí Tzadok HaCohen de Lublin la cita dos veces como algo que está \"en los Tikunim\" (Resisei Layla 58:6; Peri Tzadik, Vayelej y Shabat Shuvá 21:4). Por eso aquí se presenta como lo que es: una lectura tradicional muy difundida, atribuida a los Tikunim por R. Tzadok, sin inventarle folio.",
      "Cuarto, \"מִמָּקוֹם אַחֵר\" (4:14). Muchos la leen como una alusión velada a Dios: el alivio vendrá \"de Otro Lugar\". Es una lectura hermosa y antigua — pero no es unánime, y el que la rechaza no es un moderno: es Ibn Ezra, en su propia introducción a la meguilá. Sus dos argumentos se citan más abajo, con sus palabras. Este estudio no zanja la discusión; la muestra.",
      "Y quinto, sobre el vino. Meguilá 7b trae una frase de Ravá que se cita a menudo fuera de contexto. Aquí se cita entera y con lo que el Talmud puso inmediatamente después, en la misma página, que es una historia que termina mal. La tradición nunca hizo apología de la embriaguez, y este estudio tampoco. Quien tenga un problema con el alcohol, o esté en tratamiento, o simplemente no quiera beber, cumple el día entero sin una gota: la mitzvá del día es la alegría, no el alcohol.",
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — seis textos y una sola ausencia",
    intro: [
      "Antes de recorrerlo, el esqueleto. El estudio se sostiene sobre seis textos verificados. Los cuatro primeros construyen el problema desde dentro del libro; el quinto le da su nombre técnico; el sexto muestra qué se gana cuando el rostro se esconde.",
    ],
    filas: [
      {
        ref: "Ester 4:14",
        he: "רֶוַח וְהַצָּלָה יַעֲמוֹד לַיְּהוּדִים מִמָּקוֹם אַחֵר",
        es: "Alivio y salvación vendrán a los judíos de otro lugar",
        funcion: "Lo más cerca que el libro está de nombrar a Dios — y no lo nombra.",
      },
      {
        ref: "Ester 4:16",
        he: "וְכַאֲשֶׁר אָבַדְתִּי אָבָדְתִּי",
        es: "Y si he de perderme, me perderé",
        funcion: "Sin promesa ni garantía: la decisión se toma a ciegas.",
      },
      {
        ref: "Ester 6:1",
        he: "בַּלַּיְלָה הַהוּא נָדְדָה שְׁנַת הַמֶּלֶךְ",
        es: "Aquella noche se le espantó el sueño al rey",
        funcion: "La bisagra del libro entero. Y no la mueve nadie visible.",
      },
      {
        ref: "Ester 9:1",
        he: "וְנַהֲפוֹךְ הוּא",
        es: "Y fue al revés",
        funcion: "El resultado: el mundo dado vuelta, sin que nadie viera la mano.",
      },
      {
        ref: "Devarim 31:18 · Julín 139b",
        he: "וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי",
        es: "Y Yo esconder esconderé Mi rostro",
        funcion: "El nombre técnico de lo que pasa en el libro — y el de su heroína.",
      },
      {
        ref: "Shabat 88a",
        he: "הֲדוּר קַבְּלוּהָ בִּימֵי אֲחַשְׁוֵרוֹשׁ",
        es: "Volvieron a aceptarla en los días de Ajashverosh",
        funcion: "Lo que solo se puede dar donde no se ve nada: el sí libre.",
      },
    ],
    cierre: [
      "Un libro que no nombra a Dios, una mujer cuyo nombre significa \"escondida\", una noche de insomnio sin causa y un mundo que se invierte. Y al final, un pueblo que acepta libremente lo que en el Sinaí había aceptado bajo un monte suspendido. Ese es Purim.",
    ],
  },

  targum: {
    citas: [
      {
        label: "Versículo-ancla — Ester 4:14",
        he: "כִּ֣י אִם־הַחֲרֵ֣שׁ תַּחֲרִ֘ישִׁי֮ בָּעֵ֣ת הַזֹּאת֒ רֶ֣וַח וְהַצָּלָ֞ה יַעֲמ֤וֹד לַיְּהוּדִים֙ מִמָּק֣וֹם אַחֵ֔ר וְאַ֥תְּ וּבֵית־אָבִ֖יךְ תֹּאבֵ֑דוּ וּמִ֣י יוֹדֵ֔עַ אִם־לְעֵ֣ת כָּזֹ֔את הִגַּ֖עַתְּ לַמַּלְכֽוּת׃",
        es: "Porque si callando callas en este tiempo, alivio y salvación se levantarán para los judíos DE OTRO LUGAR — y tú y la casa de tu padre pereceréis. ¿Y quién sabe si para un tiempo como este llegaste a la realeza?",
        source: "Ester 4:14 (palabras de Mordejai a Ester)",
      },
      {
        label: "La decisión que se toma sin garantía — Ester 4:16",
        he: "לֵךְ֩ כְּנ֨וֹס אֶת־כׇּל־הַיְּהוּדִ֜ים הַֽנִּמְצְאִ֣ים בְּשׁוּשָׁ֗ן וְצ֣וּמוּ עָ֠לַ֠י … וּבְכֵ֞ן אָב֤וֹא אֶל־הַמֶּ֙לֶךְ֙ אֲשֶׁ֣ר לֹֽא־כַדָּ֔ת וְכַאֲשֶׁ֥ר אָבַ֖דְתִּי אָבָֽדְתִּי׃",
        es: "Ve, reúne a todos los judíos que se hallan en Shushán, y ayunad por mí… y así entraré ante el rey, aunque sea contra la ley; y si he de perderme, me perderé.",
        source: "Ester 4:16",
      },
      {
        label: "La bisagra de todo el libro — Ester 6:1",
        he: "בַּלַּ֣יְלָה הַה֔וּא נָדְדָ֖ה שְׁנַ֣ת הַמֶּ֑לֶךְ וַיֹּ֗אמֶר לְהָבִ֞יא אֶת־סֵ֤פֶר הַזִּכְרֹנוֹת֙ דִּבְרֵ֣י הַיָּמִ֔ים וַיִּהְי֥וּ נִקְרָאִ֖ים לִפְנֵ֥י הַמֶּֽלֶךְ׃",
        es: "Aquella noche se le espantó el sueño al rey, y ordenó traer el libro de las memorias, las crónicas — y fueron leídas delante del rey.",
        source: "Ester 6:1",
      },
      {
        label: "El resultado — Ester 9:1",
        he: "בַּיּ֗וֹם אֲשֶׁ֨ר שִׂבְּר֜וּ אֹיְבֵ֤י הַיְּהוּדִים֙ לִשְׁל֣וֹט בָּהֶ֔ם וְנַהֲפ֣וֹךְ ה֔וּא אֲשֶׁ֨ר יִשְׁלְט֧וּ הַיְּהוּדִ֛ים הֵ֖מָּה בְּשֹׂנְאֵיהֶֽם׃",
        es: "En el día en que los enemigos de los judíos esperaban dominarlos — y fue al revés: fueron los judíos quienes dominaron a los que los odiaban.",
        source: "Ester 9:1",
      },
      {
        label: "El verso del que sale el nombre de Ester — Devarim 31:18 (con Julín 139b)",
        he: "וְאָנֹכִ֗י הַסְתֵּ֨ר אַסְתִּ֤יר פָּנַי֙ בַּיּ֣וֹם הַה֔וּא עַ֥ל כׇּל־הָרָעָ֖ה אֲשֶׁ֣ר עָשָׂ֑ה כִּ֣י פָנָ֔ה אֶל־אֱלֹהִ֖ים אֲחֵרִֽים׃",
        es: "Y Yo esconder esconderé Mi rostro en aquel día, por todo el mal que hizo, porque se volvió a otros dioses.",
        source: "Devarim 31:18 · citado en Julín 139b: «¿De dónde se alude a Ester en la Torá? De: וְאָנֹכִי הַסְתֵּר אַסְתִּיר»",
      },
    ],
    parrafos: [
      "Empieza por lo que se puede contar con los dedos, porque aquí lo contable es lo asombroso. La Meguilat Ester tiene diez capítulos, ciento sesenta y siete versículos y más de tres mil palabras. En ninguna de ellas aparece el Nombre de Dios. Ni el Tetragrámaton, ni Elokim, ni Shadai, ni Adonai, ni Tzevaot. Tampoco aparecen los rodeos con que la Escritura tardía suele nombrarlo sin nombrarlo: ni \"el Cielo\", ni \"el Lugar\", ni \"bendito\", ni \"santo\". En todo el libro no se reza una sola vez con palabras. Es el único libro del Tanaj del que se puede decir esto, y no es una curiosidad de trivia: es una decisión de autor sostenida a lo largo de diez capítulos, en un texto que trata de un exterminio evitado. Lo que sí aparece —ciento ochenta y dos veces— es \"el rey\".",
      "Y sin embargo el libro está lleno de coincidencias que ningún lector se traga como coincidencias. Una huérfana judía llega al harén del imperio y resulta reina. Su tío escucha por casualidad, en un idioma extranjero, un complot contra el trono, y el favor queda anotado en una crónica y olvidado. Un ministro echa suertes —פּוּר, \"pur\", que en persa es simplemente \"lote\", y el propio libro lo traduce al hebreo: הוּא הַגּוֹרָל, \"que es la suerte\" (3:7)— y le sale un mes que queda once meses adelante, es decir, le sale el retraso que permitirá salvarlo todo. Y en el momento exacto en que la trama está perdida, al rey del imperio se le espanta el sueño, pide que le lean la contabilidad, y le leen justo la página olvidada. El libro no dice quién le quitó el sueño. No lo dice nunca. Esa es la técnica.",
      "Mira ahora el versículo-ancla, porque ahí la ausencia se vuelve deliberada. Mordejai le manda decir a Ester que no se haga ilusiones de sobrevivir en el palacio (4:13), y añade: \"si callando callas en este tiempo, alivio y salvación se levantarán para los judíos מִמָּקוֹם אַחֵר — de otro lugar\". Es el punto del libro donde el autor está más cerca de decir \"Dios\", y no lo dice. Dice \"de otro lugar\". La frase se puede leer de dos maneras y las dos son antiguas: como una alusión velada al Único que puede levantar una salvación de la nada, o como lo que literalmente dice — que si tú no actúas, la historia encontrará otro camino y tú te habrás quedado fuera de él. La segunda lectura, la seca, es la de Ibn Ezra, y él la argumenta. La primera es la del sentimiento judío de veinticinco siglos. El libro deja las dos abiertas, y ahí está su genio: el que quiere ver la mano, la ve; el que quiere ver una cadena de casualidades, también.",
      "Y entonces Ester responde con la frase más desnuda de todo el Tanaj sobre lo que es actuar sin garantías: וְכַאֲשֶׁר אָבַדְתִּי אָבָדְתִּי — \"y si he de perderme, me perderé\" (4:16). Fíjate en lo que NO hay ahí. No hay una promesa divina previa, como la tuvo Moshé en la zarza. No hay un profeta que le diga \"ve, que Yo estaré contigo\". No hay una señal. Hay tres días de ayuno, una mujer que se pone la ropa de reina y entra a un patio donde entrar sin ser llamada se paga con la vida. La decisión más importante del libro se toma en la oscuridad total. Y por eso vale lo que vale.",
      "El nombre técnico de esa oscuridad está en la Torá, y el Talmud lo dice con una brevedad que corta. En Julín 139b los Sabios juegan a encontrar personajes escondidos en el texto de la Torá, y la serie es esta: \"¿De dónde se alude a Moshé en la Torá? De 'בְּשַׁגַּם הוּא בָשָׂר'. ¿De dónde a Hamán? De 'הֲמִן הָעֵץ' —'¿acaso del árbol… comiste?' (Bereshit 3:11)—. ¿De dónde a Ester? De 'וְאָנֹכִי הַסְתֵּר אַסְתִּיר' —'y Yo esconder esconderé Mi rostro' (Devarim 31:18)—. ¿De dónde a Mordejai? De 'מָר דְּרוֹר', que el Targum traduce 'מֵירָא דַכְיָא'\". Léelo despacio, porque cada pieza está colocada: Hamán está aludido en la pregunta del árbol —y Hamán termina colgado de un árbol—; y Ester está aludida en el verso del ocultamiento del rostro divino. No es una etimología: es un notarikón, un juego de sonido y de raíz. Pero el juego dice exactamente lo que el libro hace. אֶסְתֵּר y אַסְתִּיר comparten la raíz ס־ת־ר: esconder. (No comparten el número: אֶסְתֵּר vale 661 y הַסְתֵּר vale 665. El vínculo es de raíz, no de gematría, y conviene decirlo porque muchos lo repiten mal.)",
      "Todo esto desemboca en dos palabras del capítulo nueve: וְנַהֲפוֹךְ הוּא, \"y fue al revés\" (9:1). El día que el enemigo había elegido por sorteo se convierte en el día de su caída; la horca que construyó para Mordejai se usa con él; el decreto que no se podía anular se neutraliza con otro decreto. El mundo entero se da vuelta. Y en la narración, nadie aparece dándolo vuelta. Por eso el mes se celebra con disfraces: no porque sea un carnaval importado, sino porque el disfraz es la enseñanza. En Purim uno se pone una máscara para recordar que ese año entero, mientras parecía que no pasaba nada, alguien la llevaba puesta.",
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא) — el que hace la pregunta de frente.",
        texto:
          "Antes de comentar un solo versículo, Ibn Ezra abre su comentario a la meguilá planteando exactamente nuestro problema, y no lo suaviza: \"וְהִנֵּה אֵין בַּמְּגִלָּה הַזֹּאת זֵכֶר הַשֵּׁם, וְהִיא מִסִּפְרֵי הַקֹּדֶשׁ\" — \"y he aquí que en esta meguilá no hay mención del Nombre, y sin embargo es de los libros sagrados\". Después reporta la respuesta popular y la desarma: \"וְרַבִּים הֵשִׁיבוּ כִּי הוּא מִמָּקוֹם אַחֵר, וְזֶה אֵינֶנּוּ נָכוֹן\" — \"y muchos respondieron que Él es 'de otro lugar' [es decir, que 'makom acher' alude a Dios], y eso no es correcto\". Da dos razones. Una filológica: \"כִּי לֹא נִקְרָא הַשֵּׁם 'מָקוֹם' בְּכָל סִפְרֵי הַקֹּדֶשׁ\" — en ningún libro de la Escritura se llama a Dios \"Makom\"; ese uso es de los Sabios, posterior. Y otra de sentido común: \"וְעוֹד, מַה טַּעַם לְמִלַּת 'אַחֵר'?\" — y además, ¿qué significaría entonces la palabra \"otro\"? Su propia respuesta al enigma es histórica y sobria: Mordejai escribió la meguilá, los persas la copiaron en las crónicas de sus reyes, y ellos eran idólatras que sustituían el Nombre por el de su abominación —como hicieron los kutim, que donde decía \"בְּרֵאשִׁית בָּרָא אֱלֹהִים\" escribieron \"בָּרָא אֲשִׁימָא\"—; \"וְהִנֵּה כְּבוֹד הַשֵּׁם שֶׁלֹּא יַזְכִּירֶנּוּ מָרְדֳּכַי בַּמְּגִלָּה\": fue por honor del Nombre que Mordejai no lo mencionó. Nótese lo que Ibn Ezra logra: aunque su explicación sea \"externa\", el resultado es el mismo. El Nombre se omitió a propósito.",
      },
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto:
          "Honestidad primero, porque aquí el silencio de Rashi es informativo. Sobre 4:14 Rashi comenta tres cosas —\"¿y quién sabe?\", \"para un tiempo como este\" y \"llegaste a la realeza\"— y sobre \"מִמָּקוֹם אַחֵר\" no dice absolutamente nada. Sobre 9:1 la consulta no devuelve comentario alguno. Pero sobre el versículo bisagra, 6:1, Rashi dice dos palabras y son las decisivas: \"נָדְדָה שְׁנַת הַמֶּלֶךְ — נֵס הָיָה\". \"Se le espantó el sueño al rey: fue un milagro\". Y a renglón seguido ofrece también la lectura natural: \"יֵשׁ אוֹמְרִים, שָׂם אֶת לִבּוֹ עַל שֶׁזִּמְּנָה אֶסְתֵּר אֶת הָמָן, שֶׁמָּא נָתְנָה עֵינֶיהָ בּוֹ וְיַהַרְגֵהוּ\" — \"hay quienes dicen que se puso a pensar en que Ester había invitado a Hamán: quizá se había fijado en él y planeaban matarlo\". Las dos, juntas, en la misma línea. Rashi te está enseñando cómo se lee este libro: el mismo hecho es un milagro y es un insomnio de un rey celoso, y no hay que elegir. En eso consiste la providencia oculta.",
      },
      {
        etiqueta: "Ramban (רַמְבַּ\"ן) — dónde sí habla, y qué dice.",
        texto:
          "El Ramban no escribió comentario a Ester, y no se le va a poner una palabra en la boca. Pero sí comentó el mandamiento del que Purim es la ejecución: \"זָכוֹר אֵת אֲשֶׁר עָשָׂה לְךָ עֲמָלֵק\" (Devarim 25:17). Ahí discute el midrash del Sifrá —\"zajor\" con la boca, \"lo tishkaj\" con el corazón— y hace una observación que apunta directamente a nuestra fiesta: \"וְלֹא יָדַעְתִּי מַה הִיא הַזְּכִירָה הַזּוֹ בַּפֶּה, אִם לֵאמֹר שֶׁנִּקְרָא פָּרָשַׁת עֲמָלֵק בְּצִבּוּר… וְיִהְיֶה סֶמֶךְ לְמִקְרָא מְגִלָּה מִן הַתּוֹרָה\" — \"y no sé qué es este recordar con la boca; si es decir que se lee la sección de Amalek en público… entonces habría un apoyo desde la Torá para la LECTURA DE LA MEGUILÁ\". Es decir: el Ramban ve que leer la historia de Amalek en voz alta ante el pueblo es lo que la Torá pide, y que la lectura pública de la meguilá cae dentro de ese mandato. Y luego da su propia lectura, que es la que uno se lleva a casa: no olvidar lo que nos hizo Amalek \"וּנְסַפֵּר זֶה לְבָנֵינוּ וּלְדוֹרוֹתֵינוּ\" — contarlo a nuestros hijos y a nuestras generaciones. La memoria hablada como mitzvá. Purim es eso: una noche al año en que un pueblo entero se sienta a escuchar leer un libro.",
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבַּנְאֵל) — la responsabilidad es tuya.",
        texto:
          "Tampoco Abarbanel sobre Ester está a nuestro alcance verificado, pero sobre el mismo pasaje de Amalek escribe algo que es, en el fondo, la ética entera de Purim. Después de repasar a Rashi y al Ralbag con su método habitual —plantear las dificultades, exponer a los predecesores, y solo entonces \"נִרְאֶה לִי בְּפֵירוּשׁ הַפְּסוּקִים דֶּרֶךְ אַחֵר\", \"me parece a mí otro camino en la explicación de los versículos\"— dice esto: uno podría pensar que la guerra contra Amalek no es asunto nuestro, porque el propio texto dice \"מִלְחָמָה לַה' בַּעֲמָלֵק\", \"guerra de YHVH contra Amalek\" (Shemot 17:16), y porque Dios mismo prometió \"מָחֹה אֶמְחֶה\", \"Yo borraré\". Contra eso, Abarbanel: \"אַל תֹּאמַר בִּלְבָבְךָ 'מִלְחָמָה לַה'' וְיִשְׂרָאֵל יִשְׁכּוֹן לָבֶטַח, אֵין לִי בָּזֶה דָּבָר; כִּי הִנֵּה עֲמָלֵק לֹא הָיְתָה כַּוָּנָתוֹ כִּי אִם לִמְחוֹק זַרְעֲכֶם וְשִׁמְכֶם מִן הָעוֹלָם, וְעִמָּכֶם נִלְחַם, לֹא עִם הָאֵל; וְלָכֵן לָכֶם תָּאוּת הַנְּקִימָה\" — \"no digas en tu corazón: 'es guerra de Dios, Israel morará seguro, yo no tengo nada que ver'; porque la intención de Amalek no fue otra que borrar tu descendencia y tu nombre del mundo, y contigo peleó, no con Dios; por eso a ti te corresponde\". Ese es el reverso exacto de la ausencia del Nombre: donde Dios no se muestra, la acción cae sobre ti. Es lo mismo que Mordejai le dice a Ester en 4:14.",
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם) — la providencia tiene más de una puerta.",
        texto:
          "Malbim es quien explica con precisión quirúrgica qué significa \"de otro lugar\", y su lectura no necesita que la frase aluda a Dios para ser devastadora. Sobre 4:14 escribe: puesto que la existencia de Ester en el palacio no tiene otro propósito que ser CAUSA de la salvación de Israel, forzosamente la salvación entera no depende solo de ella; \"רַק אִם תִּתְרַשֵּׁל, בְּהֶכְרֵחַ יָקוּמוּ וְיַגִּיעוּ הַסִּבּוֹת הָאֲחֵרוֹת לַתְּשׁוּעָה\" — \"solo que si ella se demora, necesariamente se levantarán y llegarán las OTRAS causas para la salvación\". Y entonces el remate: \"וּמִמֵּילָא, אַתְּ וּבֵית אָבִיךְ תֹּאבֵדוּ, אַחַר שֶׁמְּצִיאוּתֵךְ בְּמַעֲלָה הַזֹּאת יִהְיֶה אָז לְבַטָּלָה\" — y en consecuencia tú y la casa de tu padre pereceréis, porque tu existencia en esa posición habrá quedado sin objeto. Malbim usa una parábola exacta: es como la casa de invierno, que en verano ya no hace falta, porque para entonces se prepararon otras causas para el crecimiento. La salvación va a llegar; lo que está en juego es si tú vas a ser la puerta por donde entra. Y sobre 9:1, Malbim cuenta los dos milagros del día: primero, que el asunto \"נֶהְפַּךְ מֵהֵפֶךְ אֶל הֵפֶךְ\", se invirtió de extremo a extremo, y los perseguidores cayeron desde la cumbre al fondo del pozo mientras Israel subía desde el abismo; y segundo, que vencieron \"הֵמָּה בְּעַצְמָם, בְּלִי שׁוּם עֵזֶר וְסִיּוּעַ\" — ellos mismos, sin ninguna ayuda ni asistencia. Palabras suyas: \"וְעַתָּה הֶרְאָה ה' מַה יַּד הַהַשְׁגָּחָה עוֹשָׂה\" — ahora mostró Dios lo que hace la mano de la providencia. Fíjate en la paradoja que Malbim está armando: la prueba de que fue la providencia es, precisamente, que aparentemente lo hicieron ellos solos.",
      },
      {
        etiqueta: "El Rambam (הָרַמְבַּ\"ם) — la halajá del día, y una frase enorme.",
        texto:
          "El Rambam fija las cuatro mitzvot del día en Hiljot Meguilá: leer la meguilá, la comida festiva, מִשְׁלוֹחַ מָנוֹת (dos porciones de comida a UNA persona) y מַתָּנוֹת לָאֶבְיוֹנִים (dos regalos a DOS pobres) — la división es del propio Talmud, en boca de Rav Yosef (Meguilá 7a). Pero después escribe una halajá que vale por un tratado entero de espiritualidad: \"מוּטָב לָאָדָם לְהַרְבּוֹת בְּמַתְּנוֹת אֶבְיוֹנִים מִלְּהַרְבּוֹת בִּסְעֻדָּתוֹ וּבְשִׁלּוּחַ מָנוֹת לְרֵעָיו, שֶׁאֵין שָׁם שִׂמְחָה גְּדוֹלָה וּמְפֹאָרָה אֶלָּא לְשַׂמֵּחַ לֵב עֲנִיִּים וִיתוֹמִים וְאַלְמָנוֹת וְגֵרִים; שֶׁהַמְשַׂמֵּחַ לֵב הָאֻמְלָלִים הָאֵלּוּ דּוֹמֶה לַשְּׁכִינָה\" — \"es mejor multiplicar en regalos a los pobres que en la propia comida y en porciones a los amigos, porque no hay alegría más grande y más gloriosa que alegrar el corazón de pobres, huérfanos, viudas y extranjeros; pues quien alegra el corazón de estos desdichados SE PARECE A LA SHEJINÁ\" (2:17). Y en 2:16 fija la regla que hace de Purim un día sin auditoría: \"וְאֵין מְדַקְדְּקִין בִּמְעוֹת פּוּרִים, אֶלָּא כָּל הַפּוֹשֵׁט יָדוֹ לִיטּוֹל נוֹתְנִין לוֹ\" — hoy no se investiga a nadie: a todo el que extienda la mano, se le da. Y finalmente 2:18, que es la frase enorme: \"כָּל סִפְרֵי הַנְּבִיאִים וְכָל הַכְּתוּבִים עֲתִידִין לִבָּטֵל לִימוֹת הַמָּשִׁיחַ, חוּץ מִמְּגִלַּת אֶסְתֵּר\" — todos los libros de los Profetas y los Escritos están destinados a anularse en los días del Mashíaj, excepto la Meguilat Ester, \"וַהֲרֵי הִיא קַיֶּמֶת כַּחֲמִשָּׁה חֻמְּשֵׁי תּוֹרָה\": ella permanece como los cinco libros de la Torá. El único libro que no nombra a Dios es el único que no caduca cuando Dios se revele.",
      },
      {
        etiqueta: "El Arizal (הָאֲרִ\"י) — Cabalá luriana: el sueño del Rey.",
        texto:
          "Aquí la Cabalá luriana da la estructura de todo lo anterior, y lo hace con una imagen que hiela. En Shaar HaKavanot (Derushei Purim, drush 1) el Arizal explica que durante el exilio Zeir Anpin y su Nukvá están אָחוֹר בְּאָחוֹר, espalda contra espalda; para volver a פָּנִים בְּפָנִים, cara a cara, tiene que caer primero sobre Zeir Anpin una דּוֹרְמִיטָא — un sueño, un adormecimiento — que permita la נְסִירָה, la separación que hace posible el reencuentro. Y como Mordejai y Ester vivieron al final de los setenta años del exilio babilónico, dice el Arizal, ya en sus días empezó ese proceso. Entonces viene la frase: \"וְנוֹדָע כִּי הָמָן הָרָשָׁע הָיָה אַסְטְרוֹלוֹגוּס גָּדוֹל… וְיָדַע בְּחָכְמָתוֹ עִנְיַן מִיעוּט הַשְׁגָּחָתוֹ יִתְבָּרַךְ עַל יִשְׂרָאֵל בַּיָּמִים הָהֵם, לִהְיוֹתוֹ בִּבְחִינַת הַשֵּׁינָה, וְלָכֵן חָשַׁב וְעָלָה בְּלִבּוֹ כִּי הַזְּמַן מוּכָן לְאַבֵּד\" — \"y se sabe que Hamán el malvado era un gran astrólogo… y supo con su sabiduría el asunto de la DISMINUCIÓN de Su providencia sobre Israel en aquellos días, por estar en el aspecto del sueño, y por eso pensó y le subió al corazón que el tiempo estaba maduro para destruir\". Hamán no fue un antisemita cualquiera: fue un lector del cielo que detectó una ventana de ocultamiento y apostó a ella. Por eso echó suertes. Y ahora vuelve a leer Ester 6:1 — בַּלַּיְלָה הַהוּא נָדְדָה שְׁנַת הַמֶּלֶךְ, \"aquella noche se le espantó el sueño AL REY\". Del Rey del mundo, dice el Talmud (Meguilá 15b, R. Tanjum). El sueño que Hamán había calculado se terminó exactamente esa noche. El Arizal explica también por qué solo este libro no se anula: porque no hubo jamás otro milagro en el que la iluminación quedara grabada aun después de retirarse los mojín — ni en Shabat ni en las fiestas. Y da la lectura luriana del célebre relato de Meguilá 15b: cuando Ester entró al patio de los ídolos, \"הוּסַר הֶאָרַת אֲרִיךְ וְלֹא נִשְׁאַר בָּהּ רַק הֶאָרַת ז\"א\" — se le retiró la luz de Arij Anpín y le quedó solo la de Zeir Anpín; por eso gritó \"אֵלִי אֵלִי לָמָה עֲזַבְתָּנִי\" (Tehilim 22:2): uno de los dos \"Elí\" se había ido. Y sobre el nombre mismo: \"אֶסְתֵּר בְּגִימַטְרִיָּא תרס\"א\" — 661 — mientras que el Nombre אדנ\"י en su forma expandida (אלף דלת נון יוד) da תרע\"א, 671; a \"Ester\" le falta exactamente una י, un diez, \"וּבְתוֹכָהּ מִסְתַּתֶּרֶת הַנְּקוּדָּה הַפְּנִימִית עַצְמָהּ… הַנִּקְרֵאת אֶסְתֵּר עַל שֵׁם שֶׁמִּסְתַּתֶּרֶת\" — y dentro de ella se esconde el punto interior mismo, y por eso se llama Ester: porque se esconde. La {{letter:yod|yud}} — la letra más pequeña del alfabeto, un punto — es lo que falta a la vista y lo que está dentro. (Verificado letra por letra: 661, 671, y la diferencia es 10.)",
      },
    ],
    glosa:
      "Glosa para el lector: Notarikón = lectura por las letras iniciales o finales de una frase; es una llave interpretativa, no una etimología. Hester panim (הֶסְתֵּר פָּנִים) = \"ocultamiento del rostro\", el término bíblico para los tiempos en que Dios no se manifiesta. Meguilá viene de la raíz ג־ל־ה, \"revelar\"; Ester, de ס־ת־ר, \"esconder\": el nombre completo del libro significa, literalmente, \"la revelación de lo escondido\". Pur (פּוּר) = palabra persa para \"suerte, lote\"; el propio libro la traduce al hebreo como גּוֹרָל (3:7). Agagí = descendiente de Agag, rey de Amalek (Shmuel I 15:8): por eso Hamán es el enemigo hereditario. Mishloaj manot = envío de porciones de comida; matanot laevyonim = regalos a los pobres. Zeir Anpín / Nukvá / Arij Anpín = en el lenguaje del Arizal, configuraciones (partzufim) de las fuerzas divinas; dormitá = el \"adormecimiento\" que precede a una reparación. Mojín = las \"luces de la conciencia\" que entran en un partzuf. Klipá = \"cáscara\", la envoltura que oculta una chispa de santidad.",
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          "A ras de letra, los hechos son cinco y ninguno necesita interpretación. Primero: en los 167 versículos del libro no aparece el Nombre de Dios, ni ningún sustituto suyo, ni una oración con palabras. Segundo: el nombre de la fiesta viene de פּוּר, \"suerte\", y el libro lo dice explícitamente: \"עַל כֵּן קָרְאוּ לַיָּמִים הָאֵלֶּה פּוּרִים עַל שֵׁם הַפּוּר\" (9:26). La fiesta se llama, literalmente, \"Azares\". Tercero: el enemigo es \"הָאֲגָגִי\" (3:1), descendiente de Agag rey de Amalek, de modo que el conflicto del libro es la continuación del de Shemot 17 y Devarim 25. Cuarto: la palabra que resume el desenlace es וְנַהֲפוֹךְ הוּא, \"y fue al revés\" (9:1). Y quinto: las mitzvot que el propio libro instituye (9:22) son cuatro y todas son horizontales — leer, comer juntos, mandar comida al prójimo y dar a los pobres. No hay ni un sacrificio, ni una ofrenda, ni un rito en el Templo.",
          "De esos cinco hechos se sigue el pshat de la fiesta, y es más incómodo de lo que parece: Purim es la fiesta que celebra una salvación sin ninguna prueba de que fue una salvación. Cualquier historiador persa habría escrito el mismo relato sin cambiar un dato y sin mencionar a Dios — porque el relato ya está escrito así. Lo que el judaísmo hace en Purim no es recordar un milagro visible; es afirmar, una vez al año y en voz alta, que aquello no fue casualidad.",
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números, las letras y las firmas escondidas)",
        parrafos: [
          "Primera alusión, y es la del hero. הַטֶּבַע = ה5 + ט9 + ב2 + ע70 = 86. אֱלֹהִים = א1 + ל30 + ה5 + י10 + ם40 = 86. \"La naturaleza\" vale exactamente lo mismo que el Nombre אֱלֹהִים. No es una ocurrencia moderna: lo escribe Rabí Yaakov Yosef de Polnoye, el discípulo más cercano del Baal Shem Tov, con estas palabras: \"כִּי הַטֶּבַע בְּגִימַטְרִיָּא אֱלֹדִים\" (Toldot Yaakov Yosef, Vayeshev 95). Y ahora piensa qué significa eso aquí. De los dos Nombres principales, יהוה es el de la misericordia revelada, el que rompe la naturaleza — es el Nombre de la salida de Egipto, del mar abierto, de las plagas. אֱלֹהִים es el Nombre del juicio y del orden natural: es el que aparece en el relato de la creación, donde todo sucede por sus leyes. El libro de Ester no menciona ninguno de los dos. Pero el Nombre que está operando de principio a fin, y que vale exactamente lo mismo que \"la naturaleza\", es el segundo. Purim no es el milagro que rompe la naturaleza: es el milagro escrito CON la naturaleza, letra por letra.",
          "Segunda alusión, y esta la verifiqué recorriendo el libro entero. La tradición señala unas frases de Ester donde las iniciales o las finales de cuatro palabras seguidas forman el Nombre. Se buscaron TODAS las ventanas de cuatro palabras consecutivas de los 167 versículos, en ambos sentidos. En todo el libro hay exactamente cinco, y son estas. En 1:20, \"הִיא וְכָל הַנָּשִׁים יִתְּנוּ\" — iniciales leídas al revés: יהוה. En 5:4, \"יָבוֹא הַמֶּלֶךְ וְהָמָן הַיּוֹם\" —\"venga el rey y Hamán hoy\"— iniciales hacia adelante: יהוה. En 5:13, \"זֶה אֵינֶנּוּ שֹׁוֶה לִי\" —la queja de Hamán, \"esto no me vale de nada\"— finales al revés: יהוה. En 7:7, \"כִּי כָלְתָה אֵלָיו הָרָעָה\" —\"porque el mal contra él estaba decidido\"— finales hacia adelante: יהוה. Y en 7:5, \"הוּא זֶה וְאֵי זֶה\" —dentro de la pregunta del rey \"¿quién es este y dónde está el que se atrevió a hacer tal cosa?\"— las finales dan אֶהְיֶה, el Nombre de la zarza, y ahí se lee igual hacia adelante y hacia atrás. Repito lo del aviso, porque importa: esto es notarikón, no aparición del Nombre. Pero mira dónde caen las cuatro: en el decreto que humilla a las mujeres, en la invitación de Ester, en la queja de Hamán y en su condena. Es decir, en los cuatro goznes de la trama. Y mira la dirección: en los versos donde la redención avanza, el Nombre se lee hacia adelante; en los de la angustia, al revés. La firma está en la costura, y está puesta boca abajo cuando el mundo lo está.",
          "Tercera alusión, y es la que da el nombre al enemigo. עֲמָלֵק = ע70 + מ40 + ל30 + ק100 = 240. סָפֵק = ס60 + פ80 + ק100 = 240. \"Amalek\" y \"duda\" valen lo mismo. (La equivalencia es una lectura muy difundida en la literatura jasídica; el cálculo es mío y cierra.) Y no queda en el número, porque la Torá misma lo dice con un verbo: \"אֲשֶׁר קָרְךָ בַּדֶּרֶךְ\" (Devarim 25:18), y Rashi glosa la primera acepción sin rodeos: \"לְשׁוֹן מִקְרֶה\" — es lenguaje de CASUALIDAD. Amalek es el que te sale al camino \"por casualidad\". Su descendiente Hamán echa suertes, פּוּר, que es la casualidad institucionalizada. Y la fiesta que celebra su caída se llama, por decisión expresa del texto, \"Azares\". Todo el eje del libro es una sola pregunta: ¿esto fue casualidad o no?",
          "Cuarta alusión, la del vino, y hay que decirla con cuidado. יַיִן = י10 + י10 + ן50 = 70. סוֹד = ס60 + ו6 + ד4 = 70. La igualdad no es una ocurrencia: es del Talmud, que la enuncia y la explica. \"אָמַר רַבִּי חִיָּיא: כָּל הַמִּתְיַישֵּׁב בְּיֵינוֹ יֵשׁ בּוֹ דַּעַת שִׁבְעִים זְקֵנִים. יַיִן נִיתַּן בְּשִׁבְעִים אוֹתִיּוֹת וְסוֹד נִיתַּן בְּשִׁבְעִים אוֹתִיּוֹת. נִכְנַס יַיִן — יָצָא סוֹד\" (Eruvín 65a): entra vino, sale secreto. El vino no revela una verdad nueva; retira la vigilancia que la tapaba. Por eso es el símbolo del día: en Purim se celebra que lo escondido salga. Pero nótese que el Talmud dice exactamente eso — que sale lo que ya estaba dentro — y no dice que salga algo bueno.",
          "Y una última, sobre el nombre entero del libro. מְגִלָּה viene de ג־ל־ה, revelar. אֶסְתֵּר, de ס־ת־ר, esconder. \"Meguilat Ester\" significa, palabra por palabra, \"la revelación de lo escondido\". El título del libro es su tesis.",
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          "Empieza por la pregunta que el Talmud se hace y que nadie hace: si el libro no nombra a Dios, ¿cómo se sabe que es sagrado? La respuesta está en Meguilá 7a y es una discusión preciosa. Rabí Eliezer dice que Ester fue dicha con ruaj hakodesh porque está escrito \"וַיֹּאמֶר הָמָן בְּלִבּוֹ\" — \"y dijo Hamán EN SU CORAZÓN\" (6:6). ¿Quién estuvo dentro del corazón de Hamán para reportarlo? Otros traen otras pruebas. Y entonces Shmuel dice la que Ravá declara irrefutable: \"קִיְּמוּ וְקִבְּלוּ — קִיְּמוּ לְמַעְלָה מַה שֶּׁקִּיבְּלוּ לְמַטָּה\": \"confirmaron y aceptaron\" (9:27) quiere decir que CONFIRMARON ARRIBA lo que ellos aceptaron ABAJO. Es decir: la prueba de que hay Cielo en este libro no es ninguna aparición dentro del relato — es que algo se movió arriba cuando ellos se movieron abajo. En un libro sin Dios visible, la única prueba admisible es el efecto.",
          "Ahora la lectura más brutal de todas, y es del Talmud, no de un moralista. Meguilá 12a: los discípulos le preguntan a Rabí Shimon bar Yojái por qué la generación de aquel tiempo mereció el exterminio. Ellos proponen: porque disfrutaron del banquete de aquel malvado. Él responde: porque se postraron ante la imagen. Y le objetan: entonces, ¿hay favoritismo en el asunto? — porque si de verdad fueron idólatras, ¿por qué se salvaron? Y él contesta: \"הֵם לֹא עָשׂוּ אֶלָּא לִפְנִים, אַף הַקָּדוֹשׁ בָּרוּךְ הוּא לֹא עָשָׂה עִמָּהֶן אֶלָּא לִפְנִים\" — \"ellos no lo hicieron más que de fachada, así que también el Santo, bendito sea, no obró con ellos más que de fachada\". Y trae el versículo: \"כִּי לֹא עִנָּה מִלִּבּוֹ\" (Eijá 3:33) — \"porque no aflige desde Su corazón\". Detente aquí. El decreto de exterminio fue, según Rashbi, una máscara — la respuesta exacta a la máscara que ellos se habían puesto. Se disfrazaron de idólatras; Él se disfrazó de enemigo. Purim es la fiesta de las máscaras porque toda la historia es un intercambio de máscaras, y porque la de Él era la más falsa de las dos.",
          "La voz jasídica entra aquí, y entra por la gematría del hero. Si הַטֶּבַע vale lo mismo que אֱלֹהִים, entonces la naturaleza no es lo contrario del milagro: es el milagro con la cara tapada. El Baal Shem Tov enseñó que no hay lugar vacío de Él, y sus discípulos sacaron de ahí la consecuencia práctica: que la distancia entre el alma y su Dios nunca es de kilómetros, es de atención. Léelo así y el libro de Ester deja de ser el libro raro del Tanaj y pasa a ser el más parecido a tu vida. Tú tampoco tienes zarzas ardiendo. Tienes coincidencias. Tienes al jefe que te despidió el mes exacto en que apareció el otro trabajo; tienes la llamada que no ibas a contestar; tienes el retraso que te salvó del accidente. Ninguna de esas cosas prueba nada, y todas juntas tampoco. Y esa es precisamente la condición en la que se vive la fe: no en el mar abierto, sino en el insomnio de un rey persa.",
          "Y hay un detalle de genealogía que redondea la enseñanza. En Meguilá 13b los Sabios preguntan de dónde le viene a Ester su capacidad de callar, y contestan con dos generaciones de silencio: \"בִּשְׂכַר צְנִיעוּת שֶׁהָיְתָה בָּהּ בְּרָחֵל זָכְתָה וְיָצָא מִמֶּנָּה שָׁאוּל, וּבִשְׂכַר צְנִיעוּת שֶׁהָיָה בּוֹ בְּשָׁאוּל זָכָה וְיָצְאָה מִמֶּנּוּ אֶסְתֵּר\" — por la discreción de Rajel, que le entregó a Leá las señas convenidas para que su hermana no fuera humillada y se calló toda la noche, mereció que de ella saliera Shaul; y por la discreción de Shaul, que no le contó a nadie que Shmuel lo había ungido rey, mereció que de él saliera Ester. Ester no es una mujer que aprendió a esconderse: es el fruto de un linaje de gente que supo callar. Y de ella se dice, en el propio texto, \"אֵין אֶסְתֵּר מַגֶּדֶת מוֹלַדְתָּהּ וְאֶת עַמָּהּ\" (2:20). Por eso Rabí Yehudá enseña que su nombre real era Hadasá, \"וְלָמָּה נִקְרֵאת שְׁמָהּ אֶסְתֵּר? עַל שֵׁם שֶׁהָיְתָה מַסְתֶּרֶת דְּבָרֶיהָ\" — porque escondía sus palabras (Meguilá 13a). La heroína del libro del rostro escondido es una mujer que hereda el arte de esconder. Y en el momento exacto en que se descubre —\"אִישׁ צַר וְאוֹיֵב, הָמָן הָרָע הַזֶּה\" (7:6)— todo se da vuelta.",
          "Aquí se ve por qué Purim es el reverso exacto de {{study:yom-kipur|Yom Kipur}}, y por qué la tradición se atrevió a emparejarlos. En Yom Kipur Dios está máximamente presente: el día perdona por su propia esencia, se viste de blanco, se ayuna, se está de pie ante un tribunal abierto y todo el mundo sabe delante de Quién está. En Purim no hay tribunal, no hay Templo, no hay Nombre, no hay ayuno —al revés, se come y se bebe— y se anda por la calle disfrazado. Y sin embargo la tradición leyó \"יוֹם הַכִּפּוּרִים\" como \"יוֹם כְּ־פּוּרִים\": un día COMO Purim. La lectura es famosa, R. Tzadok de Lublin la cita como algo que está \"en los Tikunim\", y —seamos honestos— no se pudo localizar el pasaje. Pero el sentido que R. Tzadok le da sí está a la vista: se compara lo pequeño con lo grande, no al revés. Ese es el filo. En el día más solemne del año Él se revela y tú te postras. En Purim Él no se ve por ninguna parte y tú tienes que actuar igual. Adivina cuál de las dos cosas cuesta más.",
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          "El secreto de Purim tiene un nombre técnico, y Rav Yehudá Ashlag (Baal HaSulam) lo desarrolla sobre el MISMO versículo del que el Talmud saca el nombre de Ester. En su Introducción al Talmud Eser HaSefirot (§166-§180) distingue cuatro modos de percibir la Providencia, que en el fondo son dos: הֶסְתֵּר פָּנִים, ocultamiento del rostro, y גִּילּוּי פָּנִים, revelación del rostro. Y el ocultamiento se subdivide en dos, exactamente como el versículo: \"וְהִסְתַּרְתִּי פָנַי מֵהֶם\" es un ocultamiento; \"וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי\" es el doble (Devarim 31:17-18). Su parábola es de una simplicidad desarmante: \"בְּדוֹמֶה לְאָדָם, בְּשָׁעָה שֶׁרוֹאֶה הַפָּנִים שֶׁל חֲבֵרוֹ מַכִּירוֹ תֵּיכֶף; מַה שֶּׁאֵין כֵּן בְּרוֹאֵהוּ דֶּרֶךְ אֲחוֹרָיו, כִּי אָז אֵינוֹ בָּטוּחַ בְּהַכָּרָתוֹ וְעָלוּל לִהְיוֹת בְּסָפֵק: אוּלַי אַחֵר הוּא, וְאֵינוֹ חֲבֵרוֹ?\" — cuando ves la cara de tu amigo lo reconoces al instante; cuando lo ves de espaldas puedes dudar: quizá sea otro.",
          "Ahora la definición del segundo grado, y es la que hace de Purim lo que es. \"Hester dentro de hester\" quiere decir, escribe Baal HaSulam, que ni siquiera se ve Su espalda: la persona ya no cree que sea Él quien la está tratando así, \"אֶלָּא תּוֹלִים חַס וְשָׁלוֹם זֹאת בְּמִקְרֶה וּבַטֶּבַע\" — \"sino que lo atribuyen, Dios nos libre, al AZAR y a la NATURALEZA\". Lee esa frase otra vez con el libro de Ester en la mano. El azar se dice en hebreo מִקְרֶה — la palabra de \"אֲשֶׁר קָרְךָ\", lo que hace Amalek. Y la naturaleza es הַטֶּבַע, que vale 86, que es אֱלֹהִים. Baal HaSulam, sin hablar de Purim, acaba de describir la fiesta entera: la fiesta que lleva por nombre \"Azares\", contra el enemigo cuyo verbo es \"acaeció\", en el libro donde el Nombre no aparece. Purim es la fiesta que toma el nombre del ocultamiento más profundo y lo convierte en celebración.",
          "¿Y para qué serviría semejante oscuridad? Baal HaSulam lo dice en §180 y es la clave de bóveda: \"כָּל עִנְיַן הָעֲבוֹדָה הַנּוֹהֶגֶת בְּקִיּוּם הַתּוֹרָה וְהַמִּצְווֹת בְּדֶרֶךְ הַבְּחִירָה נוֹהֶגֶת בְּעִיקָּר בִּשְׁתֵּי הַבְּחִינוֹת שֶׁל הַהַשְׁגָּחָה הַמּוּסְתֶּרֶת\" — todo el trabajo que se hace por LIBRE ELECCIÓN pertenece principalmente a los dos grados del ocultamiento. Donde el rostro está revelado no hay elección: hay evidencia, y ante la evidencia nadie es libre. La libertad solo existe dentro del ocultamiento. El velo no es un castigo: es el espacio que Él dejó para que tu sí sea tuyo. Es la misma lógica del צִמְצוּם, la contracción con la que la Cabalá describe el primer acto de la creación: para que exista un otro, la Luz tiene que retirarse. La máscara de Purim y el tzimtzum son el mismo gesto a distinta escala.",
          "Y ahí cierra el círculo, con el Talmud. Shabat 88a: en el Sinaí, \"כָּפָה הַקָּדוֹשׁ בָּרוּךְ הוּא עֲלֵיהֶם אֶת הָהָר כְּגִיגִית\" — Dios sostuvo el monte sobre ellos como una tinaja y dijo: si aceptáis la Torá, bien; si no, ahí será vuestra sepultura. Rav Aja bar Yaakov saca la consecuencia jurídica sin pestañear: \"מִכָּאן מוֹדָעָא רַבָּה לְאוֹרַיְיתָא\" — de aquí hay una impugnación enorme contra la Torá, porque un contrato firmado bajo coacción no obliga. Y entonces Ravá: \"אַף עַל פִּי כֵן, הֲדוּר קַבְּלוּהָ בִּימֵי אֲחַשְׁוֵרוֹשׁ, דִּכְתִיב 'קִיְּמוּ וְקִבְּלוּ הַיְּהוּדִים' — קִיְּימוּ מַה שֶּׁקִּיבְּלוּ כְּבָר\" — \"aun así, volvieron a aceptarla en los días de Ajashverosh: confirmaron lo que ya habían aceptado\". Piensa en la enormidad de eso. El Sinaí, con truenos, fuego y montaña, produjo un sí impugnable. Purim, sin un solo milagro visible, sin Nombre, sin Templo y en el exilio más profundo, produjo el sí que valía. Porque solo se puede aceptar libremente cuando no hay nada obligándote a creer. La ausencia del Nombre en el libro no es un defecto que la tradición tuvo que explicar: es la condición de posibilidad del acto más libre de toda la historia judía.",
        ],
      },
    ],
    caja: {
      titulo: "הַטֶּבַע = אֱלֹהִים = 86 — y el Nombre no aparece ni una vez en 167 versículos.",
      cuerpo:
        "\"La naturaleza\" vale exactamente lo mismo que el Nombre del juicio y del orden creado. Por eso el libro que cuenta la salvación más completa del Tanaj puede contarla entera sin nombrar a Dios: está escrita con la naturaleza, no contra ella. Baal HaSulam llama a ese grado \"hester dentro de hester\" — cuando todo se atribuye \"al azar y a la naturaleza\" — y enseña que es justamente ahí, y solo ahí, donde existe la libre elección. Por eso en los días de Ajashverosh se aceptó la Torá de verdad (Shabat 88a), y por eso la Meguilat Ester es el único libro que no se anula cuando llegue el Mashíaj (Rambam, Hiljot Meguilá 2:18).",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto:
          "Que la ausencia de señales no es la ausencia de Dios, y que confundir las dos cosas es exactamente lo que la tradición llama \"ocultamiento dentro del ocultamiento\". Yo estoy acostumbrado a medir mi vida espiritual por lo que siento y por lo que veo: si algo se resuelve de manera espectacular, hubo mano; si se resolvió sola, fue suerte. Purim me dice que ese termómetro está roto. El libro más providencial del Tanaj es también el más natural de todos: no hay un solo hecho en él que un ateo no pueda explicar. Y sin embargo se lee de pie, en voz alta, una vez al año, durante veinticinco siglos.",
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto:
          "Veo el patrón de la máscara, y va en las dos direcciones: ellos se postraron \"de fachada\" y el decreto fue \"de fachada\" (Meguilá 12a); Ester esconde su pueblo y termina siendo el pueblo lo que la salva; Hamán calcula el sueño del Rey y es el sueño del rey lo que lo destruye. Veo el patrón de la inversión — וְנַהֲפוֹךְ הוּא — donde cada cosa que se preparó como trampa funciona como salvación. Y veo el patrón de la responsabilidad: en un libro donde nadie baja del cielo, todo lo que se hace lo hacen personas. Malbim lo dice sin adornos: la salvación llegará igual; lo que está en juego es si voy a ser yo la puerta por donde entre.",
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto:
          "Me devuelve una palabra para lo que suelo llamar sequedad. Cuando no siento nada, cuando rezo y parece que hablo con el techo, cuando la vida se me vuelve una cadena de casualidades sin autor, mi reflejo es concluir que algo falla en mí o que no hay nadie. La enseñanza de Purim es que esa es la condición normal del exilio y que tiene nombre — hester panim — y que dentro de ella, y no fuera, es donde mi elección pesa. Ester entró al patio sin promesa, sin profecía y sin señal, y dijo \"y si he de perderme, me perderé\". Ese es el tamaño real de un acto de fe: no el que se hace con evidencia, sino el que se hace sin ella.",
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto:
          "Que \"la naturaleza\" y el Nombre אֱלֹהִים valgan lo mismo dice algo sobre el mundo entero, no solo sobre una fiesta. La creación está construida de manera que se pueda leer sin su Autor: las leyes bastan para explicarlo todo, y ese \"bastan\" no es un fallo del diseño sino el diseño mismo. Si el mundo demostrara a Dios, nadie podría elegirlo; sería como elegir que dos más dos sean cuatro. El ocultamiento es la contracción que deja sitio para que exista alguien distinto de Él capaz de decir que sí. Y por eso el sí que se dio en Shushán, sin un solo milagro a la vista, valió más que el que se dio bajo el monte.",
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, haz UN bien que nadie pueda atribuirte: da o ayuda de forma anónima, sin firma y sin que el otro sepa que fuiste tú.",
    texto:
      "Purim es la fiesta del bien que se hace sin que se vea quién lo hizo, así que la práctica tiene que ser exactamente eso, y hoy, no en marzo. Elige a UNA persona que necesite algo concreto y resuélvelo sin dejar rastro: paga la cuenta y vete, deja el sobre sin nota, encarga que le llegue lo que le hace falta a nombre de nadie, transfiere sin mensaje. La regla es una sola y es dura: que el otro no pueda agradecértelo. Si tienes que resistir el impulso de que se sepa, estás haciendo el ejercicio correcto — porque eso, esa incomodidad exacta, es una fracción minúscula de lo que significa actuar y no aparecer.\n\nLa halajá te da la medida y te quita las excusas. El Rambam fija que en Purim \"אֵין מְדַקְדְּקִין בִּמְעוֹת פּוּרִים, אֶלָּא כָּל הַפּוֹשֵׁט יָדוֹ לִיטּוֹל נוֹתְנִין לוֹ\": hoy no se investiga a nadie, a todo el que extiende la mano se le da (Hiljot Meguilá 2:16). Nada de \"a ver si de verdad lo necesita\", nada de \"seguro se lo gasta mal\". Y añade que es mejor multiplicar en regalos a los pobres que en la propia comida y en las porciones a los amigos, \"porque no hay alegría más grande y más gloriosa que alegrar el corazón de pobres, huérfanos, viudas y extranjeros; pues quien alegra el corazón de estos desdichados SE PARECE A LA SHEJINÁ\" (2:17). Fíjate en el verbo que eligió el Rambam: se PARECE. Hoy no vas a ver a Dios; vas a hacer lo que Él hace, que es dar sin firmar. Y no es casual que este mismo versículo —\"וּמִשְׁלוֹחַ מָנוֹת אִישׁ לְרֵעֵהוּ וּמַתָּנוֹת לָאֶבְיוֹנִים\" (Ester 9:22)— sea también uno de los cuatro acrósticos del mes de {{study:elul|Elul}}: las iniciales de \"אִישׁ לְרֵעֵהוּ וּמַתָּנוֹת לָאֶבְיוֹנִים\" dan א-ל-ו-ל. El mismo verso sostiene el mes del retorno y la fiesta de la máscara, y sostiene los dos con lo mismo: dar.\n\nY una segunda capa, de un minuto, esta noche antes de dormir. Escribe tres cosas de este año que hayas archivado como \"casualidad\". No las interpretes, no les busques mensaje, no te fuerces a creer nada — solo escríbelas y quédate mirándolas. Purim no te pide que veas milagros; te pide que dejes de estar tan seguro de que no los hubo.",
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto:
          "En los 167 versículos y las más de tres mil palabras de la Meguilat Ester no aparece ni una sola vez el Nombre de Dios — verificado contando el texto hebreo entero, no citado de oídas. Es el único libro del Tanaj del que puede decirse esto, y no es un descuido: es la tesis. El Talmud lo sella en Julín 139b al preguntar de dónde se alude a Ester en la Torá y contestar con Devarim 31:18: \"וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי\", \"y Yo esconder esconderé Mi rostro\". El nombre de la heroína ES el nombre del ocultamiento divino.",
      },
      {
        etiqueta: "Insight clave:",
        texto:
          "La fiesta se llama por el sorteo — פּוּר, \"suerte\" (Ester 9:26) — y el enemigo es el que \"te salió al camino\", אֲשֶׁר קָרְךָ, que Rashi glosa \"לְשׁוֹן מִקְרֶה\": lenguaje de casualidad (Devarim 25:18); עֲמָלֵק = סָפֵק = 240, Amalek y duda valen lo mismo. Baal HaSulam define el grado más profundo de ocultamiento como aquel en que todo se atribuye \"בְּמִקְרֶה וּבַטֶּבַע\", al azar y a la naturaleza (Talmud Eser HaSefirot, Introducción §175). Purim toma el nombre de ese ocultamiento y hace de él una fiesta.",
      },
      {
        etiqueta: "Insight espiritual:",
        texto:
          "הַטֶּבַע = אֱלֹהִים = 86 (Toldot Yaakov Yosef, Vayeshev 95; verificado letra por letra). La naturaleza no es lo contrario del milagro: es el milagro con la cara tapada. Y ese velo tiene una función — \"todo el trabajo que se hace por libre elección pertenece a los grados del ocultamiento\" (Baal HaSulam, §180). Por eso el sí del Sinaí fue impugnable, dado bajo un monte suspendido, y el sí de Shushán no lo fue: \"הֲדוּר קַבְּלוּהָ בִּימֵי אֲחַשְׁוֵרוֹשׁ\" (Shabat 88a). Purim es el reverso exacto de {{study:yom-kipur|Yom Kipur}}: allí Él se revela en el día más solemne; aquí actúa sin dejarse ver, y hay que actuar igual.",
      },
      {
        etiqueta: "Aplicación práctica:",
        texto:
          "Hacer hoy un bien que nadie pueda atribuirte, y dar sin auditar a quien extienda la mano — \"אֵין מְדַקְדְּקִין בִּמְעוֹת פּוּרִים\" (Rambam, Hiljot Meguilá 2:16) —, sabiendo que quien alegra el corazón de los desdichados \"דּוֹמֶה לַשְּׁכִינָה\", se parece a la Shejiná (2:17). Y anotar tres \"casualidades\" del año sin interpretarlas. El libro sin Nombre es el único que no se anula en los días del Mashíaj (2:18): lo que se sostuvo en la oscuridad es lo único que no necesita de la luz para seguir en pie.",
      },
    ],
  },

  hemshej: [
    "{{study:yom-kipur|En Yom Kipur el día perdona por su propia esencia y todos saben ante Quién están. En Purim no hay Nombre, ni Templo, ni ayuno. El mismo Dios, las dos caras del año.}}",
    "{{study:elul|El versículo de las mitzvot de Purim —«cada uno a su prójimo, y regalos a los pobres» (Ester 9:22)— es también uno de los cuatro acrósticos de אֱלוּל. El mes en que yo doy el primer paso.}}",
    "{{letter:yod|El Arizal: a אֶסְתֵּר (661) le falta exactamente una yud para llegar al Nombre expandido (671), y esa yud está escondida DENTRO de ella. ¿Por qué la letra más pequeña es la que se esconde?}}",
    "{{study:exilio-redencion|Entre גּוֹלָה (exilio, 44) y גְּאוּלָּה (redención, 45) hay una sola letra: el Álef. La misma lógica de Purim, en clave de historia larga.}}",
  ],

  ctaRef: "Esther 4:14",
};
