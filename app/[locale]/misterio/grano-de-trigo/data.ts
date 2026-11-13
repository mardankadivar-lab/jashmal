import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — גַּם־בָּרוּךְ יִהְיֶה · La bendición que tuvo que enterrarse
//  Serie «Parashá» · entre Toldot (Gn 25:19–28:9) y Vayetzé (Gn 28:10–32:3).
//
//  CONTENIDO ESCRITO Y VERIFICADO POR EL SOFER (editor-erudito).
//  Fuente de montaje: content/estudio-grano-de-trigo.md (líneas 1–743).
//  Todo lo que en ese archivo va DESPUÉS de la línea 745 —la «SECCIÓN DE
//  TRABAJO — NO PUBLICAR»: el anexo de verificación con sus 44 filas, la
//  bitácora de correcciones del borrador, lo que quedó sin base y las notas
//  para redes— NO se montó y NO aparece en esta página.
//
//  Infraestructura solo montó: no se añadió ni una gematría, ni una cita, ni
//  un folio, ni una fuente que no estuviera ya en el markdown verificado. Los
//  marcadores de markdown (**negrita**, *itálica*, tablas) se convirtieron a
//  las convenciones de la plantilla —etiqueta dorada y comillas angulares—
//  sin cambiar una palabra, un número ni una referencia.
//
//  Hero en modo "numero": 58 = חֵן (jen, gracia) = jet 8 + nun 50. Es la única
//  gematría del estudio, por decisión del Sofer.
//
//  El jidush del grano de trigo es de MARDAN KADIVAR y va marcado como suyo.
//
//  Farsi: PENDIENTE por regla de Mardan (no se produce farsi salvo que lo
//  pida). Los campos …Fa del hero llevan el español como respaldo —mismo
//  precedente que /misterio/toldot-palabra—; en el catálogo
//  (lib/content/misterios.ts) van VACÍOS para que tri() marque la traducción
//  pendiente con TranslationBadge. Inglés: omitido a propósito.
// ════════════════════════════════════════════════════════════════════════════

const TITULO = "La bendición que tuvo que enterrarse";
const SERIE = "Serie «Parashá» · entre Toldot y Vayetzé";
const GANCHO =
  "Yaakov recibió la bendición más grande de la Torá. Esa misma noche salió huyendo de su casa, y no volvió en veintidós años.";

export const data: EstudioData = {
  slug: "grano-de-trigo",

  hero: {
    serielabel: SERIE,
    serielabelFa: SERIE,
    he: "גַּם־בָּרוּךְ יִהְיֶה",
    titulo: TITULO,
    tituloFa: TITULO,
    ganchoEs: GANCHO,
    ganchoFa: GANCHO,
    numero: { valor: "58", rom: "חֵן (jen, gracia) = jet 8 + nun 50" },
    fecha:
      "Entre parashat Toldot (Génesis 25:19–28:9) y Vayetzé (Génesis 28:10–32:3)",
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── Nota de autoría (prólogo, NO es sección de estudio) ─────────────────────
  aviso: {
    titulo: "Nota de autoría — qué es nuestro y qué no",
    rotulo:
      "Se dice de entrada, antes de entrar en materia, para que la frontera quede limpia.",
    parrafos: [
      `El corazón de este estudio es un jidush original de Mardan Kadivar: leer la bendición de Yaakov como un grano de trigo que debe enterrarse, perder su cáscara y transformarse en la oscuridad antes de dar fruto. Esa lectura es suya y va marcada como suya en todo el texto.`,
      `Lo que no es suyo lleva nombre y folio: la cadena de letras jet → nun → tav es de Rabí Najman de Breslov (Likutei Moharán, Torá 1), el grano enterrado desnudo es de Rabí Meir (Sanedrín 90b), la cáscara que precede al fruto viene de Meir ibn Gabbai y de la escuela de Izhbitz, y el cómputo de los años es del Talmud (Megilá 17a). Esa frontera limpia es lo que hace publicable el texto: cuando decimos «esto lo dice Rabí Najman», se puede abrir y leer; cuando decimos «esta es nuestra lectura», se sabe que es nuestra.`,
    ],
  },

  // ── 1. תַּרְגּוּם — Traducción ────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label:
          "Tres versículos. Dos de ellos abren el misterio; el tercero —que casi nadie trae a esta conversación— lo resuelve. · 1. La bendición que no se puede devolver — Bereshit (Génesis) 27:33",
        he: "וַיֶּחֱרַד יִצְחָק חֲרָדָה גְּדֹלָה עַד־מְאֹד וַיֹּאמֶר מִי־אֵפוֹא הוּא הַצָּד־צַיִד וַיָּבֵא לִי וָאֹכַל מִכֹּל בְּטֶרֶם תָּבוֹא וָאֲבָרְכֵהוּ גַּם־בָּרוּךְ יִהְיֶה",
        es: "Vayejerad Itzjak jaradá guedolá ad meod… va-avarjéhu, gam baruj yihyé. · Y se estremeció Itzjak con un estremecimiento grandísimo, y dijo: ¿Quién es entonces el que cazó caza y me la trajo, y comí de todo antes de que tú vinieras, y lo bendije? ¡Además, bendito quedará!",
        source: "Bereshit (Génesis) 27:33",
      },
      {
        label: "2. La acusación del hermano — Bereshit 27:36",
        he: "וַיֹּאמֶר הֲכִי קָרָא שְׁמוֹ יַעֲקֹב וַיַּעְקְבֵנִי זֶה פַעֲמַיִם אֶת־בְּכֹרָתִי לָקָח וְהִנֵּה עַתָּה לָקַח בִּרְכָתִי",
        es: "…hají kará shemó Yaakov vayaakveni ze faamáim… · Y dijo: ¿Acaso por eso llamaron su nombre Yaakov, para que me suplantara estas dos veces? Mi primogenitura tomó, y he aquí que ahora tomó mi bendición.",
        source: "Bereshit 27:36",
      },
      {
        label:
          "3. El versículo que nadie trae — y que es del mismo Itzjak — Bereshit 26:12",
        he: "וַיִּזְרַע יִצְחָק בָּאָרֶץ הַהִוא וַיִּמְצָא בַּשָּׁנָה הַהִוא מֵאָה שְׁעָרִים וַיְבָרְכֵהוּ יְהֹוָה",
        es: "Vayizrá Itzjak ba-áretz ha-hí vayimtzá ba-shaná ha-hí meá shearim, vayvarjéhu HaShem. · Y sembró Itzjak en aquella tierra, y halló aquel año cien medidas, y HaShem lo bendijo.",
        source: "Bereshit 26:12",
      },
    ],
    parrafos: [
      `Honestidad de traducción. La frase que corre en boca de todos —«a quien yo bendije, bendito será»— es una paráfrasis fiel en sentido, pero no es el versículo. El hebreo no dice «a quien yo bendije». Dice literalmente gam baruj yihyé: «también —o además— bendito será». Itzjak no está explicando una regla; está cediendo ante un hecho consumado. Ya bendijo, y lo bendecido no se desbendice.`,
      `El Targum de Onkelos lo traduce al arameo con la misma sequedad (verificado, Onkelos Genesis 27:33): אַף בְּרִיךְ יְהֵי — af berij yehé, «también bendito será». Guardamos la paráfrasis como título de puerta, pero en el estudio citamos el versículo.`,
      `Y sobre el tercer versículo, el que casi nadie trae: un capítulo antes de dar la bendición, el hombre que la da siembra. Y la Torá cierra la escena con el mismo verbo que usará en el capítulo siguiente: vayvarjéhu — «y lo bendijo». La bendición de Itzjak ya se había mostrado una vez, y se mostró en forma de cosecha. Ese es el puente del estudio, y está en el texto, no en nuestra imaginación.`,
    ],
  },

  // ── 2. מְפָרְשִׁים — Comentaristas ────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi: por qué temblaba Itzjak.",
        texto: `Rashi explica el estremecimiento de 27:33 (verificado, Rashi on Genesis 27:36): «¿Por qué tembló Itzjak? Dijo: quizá hay en mí una falta, por haber bendecido al menor antes del mayor y haber invertido el orden del linaje. Cuando Esav empezó a gritar vayaakveni ze faamáim, su padre le preguntó: ¿qué te hizo? Le dijo: mi primogenitura tomó. Dijo Itzjak: por eso estaba angustiado y temblando, no fuera que hubiera pasado por encima de la línea del juicio. Ahora resulta que al primogénito bendije» — gam baruj yihyé.`,
      },
      {
        etiqueta: "Lo que eso reordena.",
        texto: `Itzjak no tiembla porque lo engañaron. Tiembla porque creyó haber cometido una injusticia, y se calma al descubrir que no: el derecho de primogenitura ya había cambiado de manos antes de que él abriera la boca. La bendición cayó donde correspondía.`,
      },
      {
        etiqueta: "Onkelos y las dos lecturas de vayaakveni.",
        texto: `Aquí hay un punto fino que vale la pena hacer bien, porque de él cuelga el resto. El texto de Onkelos que hoy se imprime —y el que trae Sefaria— traduce vayaakveni como וְחַכְּמַנִי (verificado, Onkelos Genesis 27:36): vejakmani, de la raíz ח־כ־ם (jojmá, sabiduría). «Me superó en sabiduría», «se me pasó de listo». Rashi, en cambio, prefiere la otra lectura manuscrita del Targum y la explica (verificado, Rashi on Genesis 27:36): «Vayaakveni — como traduce el Targum, וּכְמַנִי (ujmani): me acechó… Y hay quienes traducen וְחַכְּמַנִי (vejakmani): se hizo el sabio conmigo». Entonces hay dos Targumim en circulación, y Rashi conoce los dos. El que hoy se imprime es el de la sabiduría.`,
      },
      {
        etiqueta: "La precisión que hay que hacer.",
        texto: `En boca de Esav, vejakmani es un insulto. No significa «usó sabiduría santa». Significa «me engañó porque fue más listo que yo». Lo que los maestros hacen después es darle la vuelta a la acusación: tomar el insulto de Esav como testimonio involuntario de que lo que Yaakov tomó, lo tomó por jojmá. Eso es drash, y es de los más hermosos que existen — pero hay que decir que es drash.`,
      },
      {
        etiqueta: "Y el nombre.",
        texto: `El nombre «Yaakov» no viene de «suplantación». Viene del talón (verificado, Genesis 25:26): וְיָדוֹ אֹחֶזֶת בַּעֲקֵב עֵשָׂו וַיִּקְרָא שְׁמוֹ יַעֲקֹב — «y su mano agarraba el talón (akev) de Esav, y llamaron su nombre Yaakov». El nombre es neutro: describe una mano agarrada a un talón. Es Esav, treinta y siete años después, quien lo relee como akvá —astucia, engaño— para construir su acusación. El nombre no acusa a Yaakov; Esav lo convierte en acusación. Esto es mejor para nosotros que la versión que circula.`,
      },
      {
        etiqueta: "Rabí Najman de Breslov: la cadena de letras.",
        texto: `Hay que decirlo abierto, porque esconderlo debilitaría el estudio en vez de protegerlo: la lectura de las letras {{letter:jet|jet}}, {{letter:nun|nun}} y {{letter:tav|tav}} que sostiene este estudio es de Rabí Najman de Breslov, y está entera en la primera Torá de su Likutei Moharán (verificado, Likutei Moharan 1:2 a 1:4). Y la Torá 1 trata —por su cuenta, sin que nadie se lo pidiera— exactamente de Yaakov, de Esav y de la bendición. Que Mardan haya llegado al mismo pasaje por su propio camino no es una deuda. Es la prueba de que leyó bien.`,
      },
      {
        etiqueta: "(a) Yaakov es la jojmá, y la prueba es el Targum.",
        texto: `«Y esta es la dimensión de Yaakov, porque Yaakov mereció la primogenitura, que es reshit (principio), que es la dimensión de la jojmá… Y esta es la dimensión de vayaakveni ze faamáim — y el Targum de Onkelos: וְחַכְּמַנִי» (Likutei Moharán 1:2:2). El mismo Onkelos. La misma lectura. Rabí Najman ya había hecho ese movimiento.`,
      },
      {
        etiqueta: "(b) Esav es el que desprecia la inteligencia de las cosas.",
        texto: `«Pero quien no se conecta con el intelecto y la sabiduría y la vitalidad que hay en cada cosa, esa es la dimensión de Esav, que despreció la primogenitura, como está escrito vayivez Esav et ha-bejorá (Bereshit 25:34) — es decir, despreció el intelecto» (Likutei Moharán 1:2:7).`,
      },
      {
        etiqueta: "(c) La jet es la vida.",
        texto: `«Y esta es la dimensión de la jet, del lenguaje de jiut (vitalidad), porque la sabiduría y el intelecto son la vitalidad de cada cosa, como está escrito (Kohelet 7:12): la sabiduría da vida [a su poseedor]» (Likutei Moharán 1:2:4). El versículo está verificado (Ecclesiastes 7:12): הַחׇכְמָה תְּחַיֶּה בְעָלֶיהָ — ha-jojmá tejayé vealeha, «la sabiduría da vida a su poseedor». Jet (ח) y jiut (חִיּוּת, vitalidad) y jojmá (חׇכְמָה) comparten la misma letra inicial, y Rabí Najman lee en esa letra el canal de la vida.`,
      },
      {
        etiqueta: "(d) La nun es el reinado — y aquí hay que corregir algo.",
        texto: `«Pero porque la luz del intelecto es grandísima, es imposible merecerla sino por medio de la dimensión de nun, que es la dimensión de maljut (reinado), como está escrito (Tehilim 72:17): lifnei shémesh yinón shemó, y explicó Rashi: lenguaje de reinado» (Likutei Moharán 1:2:5). Y entonces viene la imagen que decide todo: «Y esta es la dimensión de la luna, porque la luna no tiene luz de sí misma sino lo que recibe del sol. Y esa es la dimensión de maljut, que de lo suyo no tiene nada, sino lo que recibe de la jet, que es la dimensión de la jojmá, la dimensión del sol — y la luz de la luna se hace como la luz del sol» (Likutei Moharán 1:2:6; y de nuevo en 1:2:10). «Y entonces recibe el maljut, que es la dimensión de la nun, vitalidad de la jojmá, que es la dimensión de la jet; y se juntan y se enlazan la jet y la nun» (Likutei Moharán 1:2:10).`,
      },
      {
        etiqueta: "El error que hay que dejar enterrado.",
        texto: `Se dice a veces que «la jet tiene que morir en la nun». No. En Likutei Moharán la corriente va al revés y es mucho más hermosa: la jet no muere en la nun; le da vida. La nun es la luna, que de lo suyo no tiene nada; la jet es el sol. La nun no mata a la jet: la recibe. Y el resultado no es una muerte, es un amanecer — «y la luz de la luna se hace como la luz del sol».`,
      },
      {
        etiqueta: "(e) De la unión nace jen: la gracia.",
        texto: `«Pero por medio de la Torá, que por ella se juntan y se enlazan la nun y la jet, y se hace jen (gracia). Y por eso la Torá se llama yaalat jen (Mishlé 5:19)… y entonces merece que sus palabras sean palabras de gracia, y entonces son aceptadas sus palabras y sus pedidos» (Likutei Moharán 1:3:2). חֵן = jet (8) + nun (50) = 58 (calculado y verificado por el Sofer). La gracia, en su escritura, es literalmente la vida unida al reinado: lo que no tiene nada propio recibiendo de lo que es todo luz.`,
      },
      {
        etiqueta: "(f) Y de jen nace la tav, que es un grabado.",
        texto: `«Y esta es la dimensión de la ת — es decir, por haberse juntado y enlazado la jet y la nun y haberse hecho la dimensión de jen, por medio de eso se hace la dimensión de tav, que es lenguaje de jakiká (grabado) y reshimá (inscripción), como está escrito (Yejezkel 9:4): vehitvita tav — porque por medio del jen se graba y se inscribe un lugar en el corazón de aquel a quien se le pide» (Likutei Moharán 1:3:3). Aquí hay otra precisión que cambia el sentido. Se dice que «la gracia marca a una persona, y esa marca es la tav». No es así, y lo que dice Rabí Najman es más fino: la tav no es una marca que tú llevas encima. Es el hueco que tu gracia abre en el corazón del otro para que tus palabras puedan entrar. El jen no te decora; te hace entrable. Graba un lugar donde antes no había sitio.`,
      },
      {
        etiqueta: "(g) Y el nombre de todo eso es najat.",
        texto: `«Y esto es (Kohelet 9:17): divrei jajamim benájat nishmaím — las palabras de los sabios en najat son escuchadas. Najat, precisamente: es decir, la dimensión del jen mencionado y la tav mencionada, y por medio de eso se hacen las letras najat, y entonces son escuchadas sus palabras y es aceptado su pedido» (Likutei Moharán 1:3:4). El versículo está verificado (Ecclesiastes 9:17): דִּבְרֵי חֲכָמִים בְּנַחַת נִשְׁמָעִים — «las palabras de los sabios en sosiego son escuchadas». Y בְּנַחַת se escribe, letra por letra, nun — jet — tav. La cadena entera del estudio está dentro de una sola palabra: najat, sosiego.`,
      },
      {
        etiqueta: "Atribución obligatoria.",
        texto: `Este juego de letras no es jidush nuestro. Es Likutei Moharán 1:3:4, textual. Quien lo publique como hallazgo propio pierde en un segundo toda la autoridad que el resto del estudio construye.`,
      },
      {
        etiqueta: "(h) Y Yaakov fue el que mereció jen.",
        texto: `«Y por eso Yaakov, que es la dimensión del intelecto, por eso mereció jen, como está escrito (Bereshit 33:11): ki janáni Elokim — porque Dios me agració. Y por eso bendijo a las tribus con jen, como está escrito: ha-yeladim asher janán — los hijos que Dios agració. Y Binyamín no estaba, y por eso lo bendijo Yosef con jen, como está escrito (Bereshit 43:29): Elokim yojnejá bení — Dios te agracie, hijo mío» (Likutei Moharán 1:4:1). Los tres versículos verificados (Genesis 33:11, Genesis 33:5, Genesis 43:29). La gracia que Yaakov ganó en el exilio la reparte después entre sus hijos, uno por uno. Eso es la cosecha, y está en el texto.`,
      },
      {
        etiqueta: "El Talmud sobre las letras: lo que sí se sostiene.",
        texto: `Como la cadena jet–nun–tav es de letras, vale traer lo que el Talmud mismo dice de ellas (verificado, Shabbat 104a). Allí unos niños interpretan el alfabeto delante de los sabios, y entre otras cosas dicen: זי"ן ח"ת — zan otjá ve-ján otjá: «te alimenta (zan) y te da gracia (ján)» —la jet ligada al jen, en el Talmud mismo—; la nun doblada y la nun estirada, נֶאֱמָן כָּפוּף, נֶאֱמָן פָּשׁוּט: «el fiel que ahora está encorvado y es modesto, al final será el fiel desplegado y conocido»; y la pata de la {{letter:kof|kuf}}: «¿Y por qué la pata de la kuf está suspendida y no unida al techo de la letra? Porque si el malvado se arrepiente, puede entrar por esa abertura».`,
      },
      {
        etiqueta: "Nota del Sofer, para que nadie la repita mal.",
        texto: `Circula la idea de que «la jet baja por debajo de la línea de la escritura, al mundo físico». No encontramos fuente para eso, ni en Likutei Moharán ni en ninguna otra parte, aplicado a la jet. Las letras cuya pata baja o se suelta son otras, y el Talmud las lee de maravilla: la nun encorvada que se endereza, y la kuf con la pata suelta para que entre el que vuelve. Si queremos la imagen de «lo que baja y se desprende», esas son las letras, y vienen con folio.`,
      },
      {
        etiqueta: "Y una más, para no mezclar lecturas.",
        texto: `La nun también se lee como 50, y hay cincuenta puertas de entendimiento (verificado, Rosh Hashanah 21b): «cincuenta puertas de biná fueron creadas en el mundo, y todas fueron dadas a Moshé menos una». Pero eso es biná, no maljut. Son dos lecturas distintas de la misma letra. Decir en una sola frase que la nun es «reinado y eternidad y las cincuenta puertas» es apilar cosas que no vienen del mismo lugar. En este estudio la nun es maljut, porque así la lee Likutei Moharán.`,
      },
      {
        etiqueta: "La tav de Yejezkel: qué marca de verdad.",
        texto: `Rabí Najman cita Yejezkel 9:4 para la tav, así que hay que decir qué hace esa tav en su contexto original, porque no es una marca de gracia. Yejezkel 9:4 (verificado, Ezekiel 9:4): וְהִתְוִיתָ תָּו עַל־מִצְחוֹת הָאֲנָשִׁים הַנֶּאֱנָחִים וְהַנֶּאֱנָקִים — «Y marcarás una tav sobre las frentes de los hombres que gimen y se lamentan por todas las abominaciones que se hacen en medio de ella».`,
      },
      {
        etiqueta: "Y el Talmud lo trabaja.",
        texto: `(Verificado, Shabbat 55a.) El Santo le dice a Gabriel que grabe una tav de tinta en las frentes de los justos, para que los ángeles destructores no los dominen, y una tav de sangre en las frentes de los malvados, para que sí los dominen. Y los sabios discuten qué palabra abrevia esa letra: para Rav, la tav de tijyé (vivirás) y la tav de tamut (morirás); para Shmuel, la tav de tamá —el mérito de los patriarcas se agotó—; para Rabí Yojanán, la tav de tajón — por el mérito de los patriarcas Él tendrá misericordia.`,
      },
      {
        etiqueta: "Veredicto honesto.",
        texto: `La tav de Yejezkel es una marca de discernimiento. Separa. Salva a unos y condena a otros, y el mismo folio la llama la única vez que una palabra buena salió de la boca del Santo y fue retirada para mal. Quien quiera predicar la tav como «sello de la gracia» sin más, está leyendo la mitad del folio. La única de las tres voces que la lee como misericordia es Rabí Yojanán — y esa sí se puede citar, con su nombre.`,
      },
      {
        etiqueta: "El Arizal, la klipá y la cáscara que precede al fruto.",
        texto: `Toda la Cabalá luriana de este estudio vive aquí, y no vuelve a aparecer después. Hay un principio clásico que dice קְלִיפָּה קוֹדֶמֶת לַפְּרִי — kelipá kodémet la-pri, «la cáscara precede al fruto». Lo buscamos, y estos son los lugares donde está, leídos. Meir ibn Gabbai, Avodat HaKodesh 4:14:2 (verificado): «Y en la obra de la creación la oscuridad precedió a la luz, y por naturaleza la cáscara precede al fruto, y por eso precedió Caín entre los hijos del primer hombre». Beit Yaakov (escuela de Izhbitz), Jayei Sará 39:1 (verificado): «Porque la cáscara siempre precede al fruto… y eso es para bien del fruto». Esa última frase —ve-hu le-tovat ha-pri, «y es para bien del fruto»— es exactamente lo que Mardan escribió por su cuenta: que la función de la cáscara es guardar al grano por un tiempo.`,
      },
      {
        etiqueta: "Y el más bello de los tres.",
        texto: `Sod Yesharim (Radzyn), Sucot 46:1 (verificado): «Porque el Santo estableció en este mundo, en todas las cosas, que la cáscara preceda al fruto, como se explica en el Zohar: todas las obras que hace el Santo, primero adelanta lo de afuera y después el cerebro de adentro». Y el contexto en el que lo dice es la sucá: por qué se techa con pesólet goren ve-yákev, «el desecho de la era y del lagar». Es decir: la cáscara del grano se convierte en el techo de la sucá, y sentarse debajo de ella es una mitzvá. Lo que se desechó arriba sostiene desde arriba.`,
      },
      {
        etiqueta: "Primera advertencia del Sofer.",
        texto: `Sod Yesharim atribuye la frase medular al Zohar, pero nosotros no pudimos abrir ese folio del Zohar y leerlo con nuestros ojos. Por eso este estudio no imprime un daf del Zohar para kelipá kodémet la-pri. Citamos los tres lugares que sí leímos: Avodat HaKodesh 4:14:2, Beit Yaakov Jayei Sará 39:1 y Sod Yesharim Sucot 46:1. Tampoco lo encontramos en el Etz Jaim, así que no se lo atribuimos al Etz Jaim.`,
      },
      {
        etiqueta: "Segunda advertencia, y es teológica.",
        texto: `En la Cabalá luriana corriente, lo que se eleva de la klipá son las chispas (nitzotzot) atrapadas dentro, y la klipá misma no se santifica: se aniquila. Ese es el sentido de bilá ha-mávet la-netzaj — «destruirá a la muerte para siempre» (verificado, Isaiah 25:8). La idea de que la cáscara misma acabe siendo parte del fruto no es la posición central del Arizal; pertenece a una corriente más estrecha —Izhbitz y Radzyn, y en Jabad lo que se llama it'hapjá, la transformación de la oscuridad en luz. Por eso, cuando este estudio diga que la cáscara se integra, lo dirá con la fórmula «según esta lectura», y no como doctrina lisa.`,
      },
      {
        etiqueta: "Obadiá: la cáscara que dio fruto.",
        texto: `Sanedrín 39b (verificado): «Dijo Efraim Mikshaá, discípulo de Rabí Meir, en nombre de Rabí Meir: Obadiá era un converso edomita (ger Edomí). Y es lo que dice la gente: de él y en él —del bosque mismo sale el mango del hacha». Obadiá, el único profeta cuyo libro entero es una profecía contra Edom, era según esta opinión descendiente de Esav. Edom se destruye con un hacha cuyo mango salió de Edom.`,
      },
      {
        etiqueta: "Y en el mismo folio, Rabí Yitzjak da la vuelta completa.",
        texto: `(Verificado, Sanhedrin 39b.) «Dijo el Santo: venga Obadiá, que vivió entre dos malvados —Ajav e Izevel— y no aprendió de sus obras, y profetice contra Esav el malvado, que vivió entre dos justos —Itzjak y Rivká— y no aprendió de sus obras». Dos hombres, dos ambientes, dos resultados invertidos. El que estaba rodeado de cáscara dio fruto; el que estaba rodeado de fruto se hizo cáscara. Matiz obligatorio: que Obadiá fuera edomita es una opinión —la de Rabí Meir, transmitida por su discípulo—, no un dato indiscutido. Se cita con su nombre, no como hecho.`,
      },
      {
        etiqueta: "El cómputo de los años: ni 21, ni uno solo.",
        texto: `Esto hay que decirlo con los números exactos, porque es el punto donde cualquier lector puede abrir el libro y comprobarnos. Lo que dice la Torá (verificado, Genesis 31:38 y Genesis 31:41). Yaakov le dice a Labán: זֶה עֶשְׂרִים שָׁנָה אָנֹכִי עִמָּךְ — «Estos veinte años he estado contigo». Y también: זֶה־לִּי עֶשְׂרִים שָׁנָה בְּבֵיתֶךָ עֲבַדְתִּיךָ אַרְבַּע־עֶשְׂרֵה שָׁנָה בִּשְׁתֵּי בְנֹתֶיךָ וְשֵׁשׁ שָׁנִים בְּצֹאנֶךָ — «Estos veinte años en tu casa: te serví catorce años por tus dos hijas y seis años por tu ganado». Catorce más seis: veinte años con Labán, dicho dos veces y desglosado. No hay veintiuno en ninguna parte.`,
      },
      {
        etiqueta: "Lo que dice el Talmud.",
        texto: `(Verificado, Megillah 17a, y en paralelo Seder Olam Rabbah 2.) El cómputo completo es este: Yaakov tenía 63 años cuando lo bendijo su padre; estuvo 14 años escondido estudiando en la casa de Ever; llegó al pozo de Aram Naharáim a los 77; estuvo 20 años en casa de Labán; y después se demoró dos años más en el camino de vuelta —dieciocho meses en Sucot y seis meses en Bet El. Y la baraitá concluye: נִמְצָא יוֹסֵף שֶׁפֵּירַשׁ מֵאָבִיו עֶשְׂרִים וּשְׁתַּיִם שָׁנָה, כְּשֵׁם שֶׁפֵּירַשׁ יַעֲקֹב אָבִינוּ מֵאָבִיו — דְּיַעֲקֹב תְּלָתִין וְשִׁיתָּא הָוְיָין! אֶלָּא: אַרְבֵּיסַר דַּהֲוָה בְּבֵית עֵבֶר לָא חָשֵׁיב לְהוּ — «Resulta que Yosef estuvo separado de su padre veintidós años, igual que Yaakov nuestro padre estuvo separado del suyo — ¡pero los de Yaakov serían treinta y seis! Más bien: los catorce que estuvo en la casa de Ever no se le cuentan».`,
      },
      {
        etiqueta: "Así que hay tres números legítimos, y ninguno es 21.",
        texto: `20 — los años literales con Labán (Bereshit 31:38 y 31:41). 22 — la ausencia del padre, la que el Talmud equipara (Megilá 17a). 36 — el arco entero fuera de casa, Ever incluido (Megilá 17a). En este estudio usamos 22, y por una razón que no es estética: es el número que el Talmud eligió para equiparar al padre con el hijo. Yaakov estuvo veintidós años lejos de Itzjak; Yosef estuvo veintidós años lejos de Yaakov. El mismo plazo, cobrado dos veces, una generación más abajo. Eso no es una curiosidad numérica: es la estructura del exilio repitiéndose, y es exactamente el tema de este estudio.`,
      },
      {
        etiqueta: "El exilio, folio por folio.",
        texto: `Lo que le pasó a Yaakov en esos años está en el texto, no en la leyenda. Fue engañado (verificado, Genesis 29:25): וַיְהִי בַבֹּקֶר וְהִנֵּה־הִוא לֵאָה… וְלָמָּה רִמִּיתָנִי — «Y por la mañana, ¡y era Leá!… ¿y por qué me engañaste?». Fue mal pagado (verificado, Genesis 31:41): וַתַּחֲלֵף אֶת־מַשְׂכֻּרְתִּי עֲשֶׂרֶת מֹנִים — «y cambiaste mi salario diez veces»; Rashi ahí lo detalla (verificado, Rashi on Genesis 31:41): «cambiabas la condición entre nosotros, de pintado a manchado, y de rayado a abigarrado».`,
      },
      {
        etiqueta: "Luchó, y no con un hombre.",
        texto: `(Verificado, Genesis 32:25.) וַיֵּאָבֵק אִישׁ עִמּוֹ — «y luchó un hombre con él». El texto dice ish, en singular. Quién era ese ish lo dice el midrash (verificado, Bereshit Rabbah 77:3): «Rabí Jamá bar Janiná dijo: era el ángel de Esav (saró shel Esav)». Y en el mismo midrash, Rabí Berejiá añade una frase para temblar: «no sabemos quién venció, si el ángel o Yaakov». El profeta lo resume (verificado, Hosea 12:5): וַיָּשַׂר אֶל־מַלְאָךְ וַיֻּכָל — «luchó con un ángel y venció».`,
      },
      {
        etiqueta: "Y lo que le quedó en el cuerpo.",
        texto: `Su manera de caminar cambió (verificado, Genesis 32:26 y 32:32): וַתֵּקַע כַּף־יֶרֶךְ יַעֲקֹב — se le dislocó la cadera; y al salir el sol, וְהוּא צֹלֵעַ עַל־יְרֵכוֹ — «y él venía cojeando de su cadera». Su nombre cambió (verificado, Genesis 32:29): לֹא יַעֲקֹב יֵאָמֵר עוֹד שִׁמְךָ כִּי אִם־יִשְׂרָאֵל — «ya no se dirá tu nombre Yaakov, sino Israel». Precisión: el nombre se añadió, no se sustituyó. La Torá sigue llamándolo Yaakov después, y eso importa: el grano que brota no borra al grano que se enterró. Y quedó una ley en el cuerpo del pueblo (verificado, Genesis 32:33): el guid hanashé, el nervio que Israel no come hasta hoy, por el lugar donde su padre fue tocado.`,
      },
    ],
  },

  // ── 3. פרד״ס — Las cuatro lecturas ──────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat · la lectura llana",
        parrafos: [
          `Un padre ciego bendice al hijo equivocado, o al que creía equivocado. El hermano mayor llega tarde y grita. El padre tiembla, entiende y confirma: gam baruj yihyé, además bendito quedará. El bendecido sale huyendo esa misma noche y no vuelve en veintidós años. En el camino lo engañan con una mujer, le cambian el salario diez veces, pelea de noche con algo que no es un hombre, se queda cojo, y le cambian el nombre. El hermano, mientras tanto, no cambia en nada.`,
          `Eso es lo que pasó. Lo demás es cómo se lee.`,
        ],
      },
      {
        head: "רֶמֶז — Remez · la insinuación de las letras",
        parrafos: [
          `Toda la secuencia está en Likutei Moharán, Torá 1, y está citada arriba con sus números. Resumida como insinuación:`,
          `{{letter:jet|Jet}} (ח, 8) — la vida, jiut, la sabiduría que da vida a su poseedor. {{letter:nun|Nun}} (נ, 50) — el reinado, maljut, la luna que de lo suyo no tiene nada. Jet + nun = jen (חֵן, 58) — la gracia: la vida entregada a lo que no tenía nada propio, y la luz de la luna haciéndose como la luz del sol. {{letter:tav|Tav}} (ת, 400) — el grabado, la inscripción: el hueco que la gracia abre en el corazón del otro. Nun + jet + tav = najat (נַחַת) — el sosiego con que las palabras del sabio son escuchadas.`,
          `Cinco pasos y la palabra se cierra sobre sí misma. La gracia no empieza en la gracia: empieza en una vida que se entrega a lo que está vacío, y termina en un sosiego que abre puertas sin tocarlas.`,
        ],
      },
      {
        head: "דְּרָשׁ — Drash · el grano desnudo y el grano con cáscara",
        parrafos: [
          `Aquí está el corazón del estudio, y aquí está su filo doble.`,
          `La lectura de Mardan, en sus propias palabras, es esta: la bendición recibida es una semilla. No germina de inmediato. Cae a la tierra, se rompe su cáscara, echa raíces hacia abajo mientras su cuerpo se deshace, deja de parecerse a lo que era, sufre una transformación total y dolorosa en la oscuridad completa, y solo después asoma a la superficie — donde la esperan el sol que quema, las lluvias, el frío, los animales y, sobre todo, las hierbas que se parecen al trigo y no lo son. Pero lo que lleva dentro hace su trabajo sin importar las condiciones de afuera. Las condiciones solo moldean: quitan lo que no es intrínseco al trigo. Y al final la espiga trae muchos granos donde había uno.`,
          `Esa lectura es jidush original de Mardan Kadivar. No la presentamos como pshat ni como cita de nadie.`,
          `Ahora, el filo. Porque los Sabios también hablaron del grano enterrado — y lo dijeron al revés. Sanedrín 90b (verificado, texto exacto): שָׁאֲלָה קְלֵיאוֹפַּטְרָא מַלְכְּתָא אֶת רַבִּי מֵאִיר… אֶלָּא כְּשֶׁהֵן עוֹמְדִין, עוֹמְדִין עֲרוּמִין אוֹ בִּלְבוּשֵׁיהֶן עוֹמְדִין? אֲמַר לַהּ: קַל וָחוֹמֶר מֵחִיטָּה. וּמָה חִיטָּה שֶׁנִּקְבְּרָה עֲרוּמָּה יוֹצְאָה בְּכַמָּה לְבוּשִׁין, צַדִּיקִים שֶׁנִּקְבָּרִים בִּלְבוּשֵׁיהֶן — עַל אַחַת כַּמָּה וְכַמָּה — «Preguntó la reina Cleopatra a Rabí Meir… ¿cuando se levanten, se levantarán desnudos o se levantarán con sus ropas? Le dijo: a fortiori del trigo. Si el trigo, que se entierra desnudo, sale con varias vestiduras, los justos, que se entierran con sus ropas, cuánto más».`,
          `Y lo mismo, en boca de otro maestro (verificado, Ketubot 111b): Rabí Jiyá bar Yosef enseñó que en el futuro los justos se levantarán de sus tumbas con sus ropas, y lo dedujo del mismo kal vajómer — el trigo se entierra desnudo y sale con varias capas de vestidura.`,
          `El doble filo, dicho sin suavizarlo. Mardan dice: el grano se entierra con su cáscara, y la cáscara se rompe. Rabí Meir dice: el grano se entierra desnudo, y sale vestido. Van en direcciones opuestas. Una lectura pierde la cáscara abajo; la otra la gana arriba.`,
          `Y la resolución no la trajimos nosotros: la escribió Mardan de paso, sin notar que ahí estaba el centro de todo. Su texto dice: «aunque más adelante otra vez aparece sobre cada grano de trigo otra vez».`,
          `Ahí está. Las dos cosas son verdad, y son el mismo movimiento visto en dos momentos. El grano que se siembra viene con cáscara, y la cáscara se pierde en la tierra: eso es el descenso. El grano que la espiga devuelve viene otra vez con cáscara, una nueva, que él no tenía cuando era semilla y que ahora es suya: eso es la resurrección de Rabí Meir, el que se enterró desnudo y salió vestido. La cáscara no es un enemigo que se derrota una vez. Es un envoltorio que se pierde abajo y vuelve arriba, y las dos veces sirve al grano: abajo lo protegió hasta su hora, arriba lo contiene para que pueda volver a sembrarse.`,
          `Y por eso Esav reaparece en cada generación de los hijos de Yaakov, y por eso cada hijo tuvo su cáscara y su tikún. No porque nada se haya logrado. Porque cada grano nuevo necesita la suya.`,
          `Y aquí entra el versículo que casi nadie trae. Si queremos el número de la cosecha, no hace falta inventarlo: lo dio el mismo Itzjak que bendice. «Y sembró Itzjak en aquella tierra, y halló aquel año cien medidas, y HaShem lo bendijo» (Bereshit 26:12). El hombre que un capítulo después pone las manos sobre la cabeza de su hijo ya había visto lo que hace una semilla enterrada en tierra ajena, en año de hambre. Cien por una. Y la Torá lo sella con vayvarjéhu — «y lo bendijo»: la misma palabra.`,
          `Nota del Sofer: los números «entre treinta y cincuenta granos» que circulaban en el borrador salieron del estudio. No tienen fuente, y la secuencia «treinta… cincuenta…» se acerca demasiado a la parábola del sembrador cristiana, que no es nuestro marco. El número de la Torá es cien, y viene de Itzjak.`,
        ],
      },
      {
        head: "סוֹד — Sod · la cáscara que sirve",
        parrafos: [
          `La lectura mística de todo esto, con las fuentes de arriba en la mano: la klipá precede al fruto y existe para bien del fruto (Beit Yaakov, Jayei Sará 39:1). No es un accidente del mundo: es el orden del mundo — primero lo de afuera, después el cerebro de adentro (Sod Yesharim, Sucot 46:1). Y lo de afuera, cuando cumple su turno, no se tira: se vuelve el techo bajo el cual se cumple una mitzvá. Pesólet goren ve-yákev. El desecho de la era sostiene la sucá.`,
          `Según esta lectura —y lo decimos así, porque no es la posición central del Arizal— lo que empezó siendo cáscara puede terminar sirviendo al grano hasta volverse suyo. La Cabalá luriana corriente dice que de la klipá se extraen las chispas y la klipá se aniquila (bilá ha-mávet la-netzaj, Yeshayahu 25:8). Izhbitz y Radzyn, y lo que en Jabad se llama it'hapjá, van más lejos: la oscuridad misma se vuelve luz. Este estudio camina por el segundo sendero y lo nombra.`,
          `Y el Talmud puso el ejemplo antes que nosotros: Obadiá (Sanedrín 39b). La cáscara dio fruto y el fruto se hizo cáscara, y el hacha que corta a Edom tiene mango edomita.`,
          `Una última cosa, y es de letras otra vez. Rabí Najman dijo que Yaakov mereció jen y que bendijo a sus hijos con jen, uno por uno (Likutei Moharán 1:4:1). Si la gracia es jet más nun —vida entregada a lo que no tiene nada propio— entonces lo que Yaakov trajo del exilio no fue la bendición que se llevó. Fue lo que la bendición se volvió después de enterrarse veintidós años. Salió de su casa con una bendición robada en la boca y volvió con gracia en las manos, suficiente para repartirla entre doce hijos y que le sobrara para el que faltaba.`,
        ],
      },
    ],
  },

  // ── 4. הִתְבּוֹנְנוּת — Contemplación ─────────────────────────────────────────
  hitbonenut: {
    intro:
      "Cerremos los libros. Lo que sigue no trae ninguna fuente nueva: solo mira lo que ya quedó dicho.",
    parrafos: [
      {
        texto: `Lo primero que hay que aceptar es el silencio. Entre la mano del padre sobre la cabeza y el primer fruto hay veintidós años, y en ninguno de ellos se ve nada. Si te bendijeron y no pasó nada, no estás ante el fracaso de la bendición. Estás en el tramo normal.`,
      },
      {
        texto: `Y el tramo es a oscuras. No hay un solo testigo bajo la tierra. Nadie que mire desde arriba puede distinguir un grano que se está deshaciendo para brotar de un grano que simplemente se podrió. Tú tampoco puedes, desde adentro. Esa es la parte que de verdad cuesta: no la dificultad, sino la imposibilidad de saber, mientras ocurre, de qué lado está lo que te ocurre.`,
      },
      {
        texto: `Mira la lista de lo que le pasó. Lo engañaron con la mujer que amaba. Le cambiaron el salario diez veces. Peleó de noche con algo que no era un hombre y amaneció cojo. Le cambiaron el nombre. Ninguna de esas cosas se parece a una bendición, y todas estaban dentro de ella.`,
      },
      {
        texto: `Y después está el hermano, que es la parte incómoda. Esav no cambió. En veintidós años no le pasó nada: ni exilio, ni engaño, ni lucha, ni cojera, ni nombre nuevo. El que se quedó quieto siguió intacto. Si alguna vez miraste a alguien que no fue tocado por nada mientras a ti te deshacían, esa comparación es vieja y está en el texto. Lo que no se transforma no es lo que fue bendecido. Es lo que estuvo alrededor.`,
      },
      {
        texto: `Hay un pensamiento más duro todavía, y hay que sostenerlo sin arreglarlo. Algunas de las cosas que te apretaron te protegían, y otras solo te apretaban. La cáscara que te guardó y la maleza que te imitaba se sienten igual por dentro. Desde el grano, el abrazo que lo contuvo hasta su hora y la presión que lo quería ahogar son la misma presión. Nadie puede decirte, estando tú abajo, cuál de las dos tienes encima. Eso no es una falla de tu discernimiento: es la condición de estar enterrado.`,
      },
      {
        texto: `Y sin embargo lo que decidió el asunto no fue nada de lo de afuera. Fue lo que iba dentro. Las condiciones no hicieron el trigo; solo le quitaron lo que no era trigo. Eso es lo único que hay que creer en la oscuridad, y es poco y es suficiente: que lo que te pusieron adentro aquel día sigue adentro, trabajando, sin pedirle permiso al clima.`,
      },
      {
        texto: `Lo último es lo que casi no se nota. El hombre que salió cojeando no dejó de cojear. La cadera no se arregló. Y su pueblo, hasta hoy, no come ese nervio. Lo que te pasó en la oscuridad no se borra cuando sales: se queda como señal, y la señal es la prueba. El grano que brota no borra al grano que se enterró — la Torá siguió llamándolo Yaakov después de llamarlo Israel. Los dos nombres, el mismo hombre. La cojera y la bendición, la misma cosa.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה — Acción ─────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta, para hoy, que sale de lo anterior y no de otra parte.",
    etiqueta: "1. Nombra la bendición que no ha germinado.",
    texto: `Hoy, en una frase, escribe o di en voz alta una cosa buena que recibiste —una palabra, una oportunidad, una enseñanza, una oración de alguien por ti— que todavía no ha dado ningún fruto visible. Una sola. Nómbrala y dile en tus palabras: todavía estás bajo tierra. No es resignación: es dejar de medir la semilla con la vara de la espiga. La mitad del sufrimiento de un hombre bendecido es exigir la cosecha en el mes de la siembra. 2. Distingue tu cáscara de tu maleza. Haz una lista de dos columnas. A la izquierda, lo que te está apretando ahora mismo y te está sosteniendo: una disciplina que odias, una limitación que te cuida, una persona que te corrige. A la derecha, lo que te aprieta y solo te aprieta: una costumbre, una compañía, un gasto, una pelea. No vas a acertar del todo, y está bien — hacer la lista ya es el trabajo. Y después haz una sola cosa: quítale a la columna derecha un elemento esta semana. Uno. 3. La midá de la semana: najat. «Las palabras de los sabios en najat son escuchadas» (Kohelet 9:17). Durante siete días, en la conversación donde más te cueste —esa que ya sabes cuál es—, baja la voz en vez de subirla. No se trata de callarse ni de tragar. Se trata de pedir sin gritar. Según Rabí Najman, lo que abre un lugar en el corazón del otro no es el volumen: es la gracia, y la gracia se oye en el sosiego. Prueba una vez y observa si entra. 4. Y la conducta a cambiar: deja de mirar al hermano que no cambió. Esta semana, cada vez que te sorprendas midiendo tu proceso contra alguien a quien no le ha pasado nada, corta el pensamiento y vuelve a la columna izquierda de tu lista. El que no está siendo transformado no te lleva ventaja. Solo no está siendo sembrado.`,
  },

  // ── 6. חֲתִימָה — El sello ───────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "La idea principal.",
        texto: `La bendición no actúa como un regalo: actúa como una semilla. Itzjak dijo gam baruj yihyé —«además, bendito quedará» (Bereshit 27:33)— y lo primero que hizo el bendecido fue salir huyendo de su casa por veintidós años (Megilá 17a; veinte de ellos con Labán, Bereshit 31:41). Entre la bendición y el fruto hay una tierra, una oscuridad y una cáscara que se rompe. Esa lectura del grano es el jidush de Mardan Kadivar.`,
      },
      {
        etiqueta: "El insight clave.",
        texto: `Los Sabios y nuestra lectura van, aparentemente, en direcciones opuestas: Rabí Meir dice que el grano se entierra desnudo y sale vestido (Sanedrín 90b; y Rabí Jiyá bar Yosef en Ketubot 111b), y nosotros decimos que se entierra con su cáscara y la cáscara se rompe. Las dos son verdad, porque son el mismo movimiento en dos momentos: la cáscara se pierde abajo y vuelve arriba sobre cada grano nuevo. Por eso la klipá «precede al fruto» y existe «para bien del fruto» (Beit Yaakov, Jayei Sará 39:1), y por eso el desecho de la era termina siendo el techo de la sucá (Sod Yesharim, Sucot 46:1). Y por eso cada hijo de Yaakov tuvo la suya.`,
      },
      {
        etiqueta: "El insight espiritual.",
        texto: `El nombre de lo que Yaakov trajo de vuelta tiene dos letras. Rabí Najman enseñó que la {{letter:jet|jet}} es jiut, la vida —«la sabiduría da vida a su poseedor» (Kohelet 7:12)—, que la {{letter:nun|nun}} es maljut, la luna que de lo suyo no tiene nada (Tehilim 72:17 con Rashi), y que cuando se enlazan se hace חֵן, jen: gracia — jet 8 más nun 50, 58 (Likutei Moharán 1:2–1:3). La jet no muere en la nun: le da vida, «y la luz de la luna se hace como la luz del sol». De ahí nace la {{letter:tav|tav}}, que es grabado, el hueco que la gracia abre en el corazón del otro (Yejezkel 9:4 según Likutei Moharán 1:3:3) — y las tres letras juntas escriben najat, el sosiego con que las palabras del sabio son escuchadas (Kohelet 9:17, en Likutei Moharán 1:3:4). Yaakov salió de casa con una bendición en la boca y volvió con jen en las manos, suficiente para repartirlo entre sus doce hijos (Likutei Moharán 1:4:1, sobre Bereshit 33:11 y 43:29).`,
      },
      {
        etiqueta: "La aplicación práctica.",
        texto: `Si te bendijeron y no ves nada, estás en el tramo normal, y el tramo es a oscuras. Deja de exigir la cosecha en el mes de la siembra. Esta semana haz tres cosas: nombra la bendición que todavía no germinó; separa lo que te aprieta sosteniéndote de lo que te aprieta y nada más, y quítate un elemento de la segunda columna; y en la conversación más difícil, baja la voz. El número de la cosecha no lo inventamos: lo dio el mismo Itzjak que bendice — sembró en tierra ajena y halló cien medidas, y HaShem lo bendijo (Bereshit 26:12).`,
      },
      {
        etiqueta: "La honestidad del sello.",
        texto: `No decimos que el sufrimiento sea bueno, ni que todo lo que te aplasta sea una cáscara que te cuida. Decimos algo más estrecho y más verdadero: que hay dolores que forman parte de una bendición que está trabajando, que desde abajo no se distinguen de los otros, y que lo único que decide el resultado es lo que te pusieron adentro. El trigo no se hizo trigo por el clima. El clima solo le quitó lo que no era trigo.`,
      },
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  //  No es una séptima sección: el cuerpo de estudio quedó sellado en la
  //  חֲתִימָה. Aquí solo se tienden puentes clicables hacia otros estudios.
  hemshej: [
    "La letra que es la vida misma, jiut → {{letter:jet|La jet — el canal de la vida}}",
    "La letra que de lo suyo no tiene nada, y por eso lo recibe todo → {{letter:nun|La nun — el reinado y la luna}}",
    "La letra del grabado, la marca de tinta y la marca de sangre → {{letter:tav|La tav — el sello}}",
    "La letra con la pata suelta, para que entre el que vuelve → {{letter:kof|La kof — la puerta del retorno}}",
    "¿Y por qué el versículo de las toldot de Itzjak empieza mirando al padre? → {{study:toldot-palabra|La vav que se perdió}}",
    "El rostro del hombre que sembró y halló cien medidas → {{study:rostro-isaac|El rostro que la burla no pudo borrar}}",
  ],

  ctaRef: "Genesis 27:33",
};
