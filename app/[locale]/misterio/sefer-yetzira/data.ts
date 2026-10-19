import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — Sefer Yetzirá · סֵפֶר יְצִירָה — el libro que cuenta tus diez dedos
//  Serie «Gematría» (números y letras). Puerta de entrada al libro, destino del
//  reel «Mira tus diez dedos». Contenido escrito y verificado por el Sofer
//  (editor-erudito), 2026-10-19. No agregar fuentes ni retocar el texto erudito.
//
//  Notas de montaje (respetadas al pie de la letra):
//   · Toda cita del Sefer Yetzirá lleva la versión al lado (corta = Sefaria,
//     Varsovia 1884; Gra = Gaón de Vilna). En el cap. 6 divergen: 6:4 / 6:7.
//   · El hebreo de las citas va SIN niqqud, tal cual Sefaria (decisión del Sofer).
//   · La elipsis de 6:4 (omite Bereshit 15:6) es intencional: no completarla.
//   · Hero modo «dimensiones» (tres sfarim), sin gematría.
//   · Farsi: pendiente por regla de Mardan (no se produce farsi salvo que lo
//     pida). Los campos …Fa del hero llevan el español como respaldo, igual que
//     el cuerpo de todos los misterios (análisis en español). En el catálogo
//     (lib/content/misterios.ts) los …Fa van vacíos para que tri() muestre el
//     español MARCADO con TranslationBadge, sin mezcla silenciosa.
// ════════════════════════════════════════════════════════════════════════════

const TITULO = "Sefer Yetzirá: el libro que cuenta tus diez dedos";
const SERIE = "Sefer Yetzirá · Puerta de entrada";
const GANCHO =
  "Diez, y no nueve. Diez, y no once. El libro más antiguo que conservamos de la mística hebrea dice que el mundo se formó por treinta y dos caminos, diez sefirot y veintidós letras, y empieza a contarlos en tus manos. Aquí lo leemos despacio, con el texto delante y la versión al lado, diciendo con honestidad lo que el libro dice y lo que no dice.";

export const data: EstudioData = {
  slug: "sefer-yetzira",
  hero: {
    serielabel: SERIE,
    serielabelFa: SERIE,
    he: "סֵפֶר יְצִירָה",
    titulo: TITULO,
    tituloFa: TITULO,
    ganchoEs: GANCHO,
    ganchoFa: GANCHO,
    dimensiones: [
      { es: "Grabado · séfer (lo escrito)", fa: "Grabado · séfer (lo escrito)" },
      { es: "Contado · sfar (el número)", fa: "Contado · sfar (el número)" },
      { es: "Hablado · sipur (el relato)", fa: "Hablado · sipur (el relato)" },
    ],
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },
  // ── Prólogo: mapa (no es sección de estudio) ─────────────────────────────────
  mapa: {
    titulo: "Antes de abrir el libro: cómo lo citamos",
    intro: [
      `El Sefer Yetzirá nunca tuvo una sola forma. Nos llegó en varias versiones con el mismo contenido y distinto orden, distinto largo y, sobre todo, distinta numeración. En Sefaria se pueden abrir dos. En Jashmal llamamos «versión corta» al texto base que presenta Sefaria (edición de Varsovia, 1884: seis capítulos y 48 mishnayot, es decir, 48 párrafos breves) y «versión del Gra» al texto que fijó el Gaón de Vilna en el siglo XVIII (seis capítulos y 62 mishnayot), que recoge la cadena del Ramak (Cordovero), el Arizal y el propio Gaón.`,
      `Por eso cada cita del Sefer Yetzirá en esta página lleva la versión al lado. En el capítulo 1 las dos versiones coinciden (1:1 a 1:14), así que «Sefer Yetzirá 1:4» vale en cualquiera de las dos. Pero en el capítulo 6 divergen: la escena de Abraham es 6:4 en la versión corta y 6:7 en la del Gra. Si citáramos «6:4» a secas, quien abra la otra versión encontraría otra cosa y pensaría que inventamos la cita. Una sola cita que no cuadra basta para perder la confianza del lector, y casi nunca se entera uno de que la perdió.`,
    ],
    filas: [
      {
        ref: "Sefer Yetzirá 1:1 (ambas versiones)",
        he: "בשלשים ושתים נתיבות פליאות חכמה",
        es: "Con treinta y dos caminos maravillosos de sabiduría",
        funcion: "Abre el libro: el número total y los tres sfarim.",
      },
      {
        ref: "Sefer Yetzirá 1:2 (ambas)",
        he: "עשר ספירות בלי מה ועשרים ושתים אותיות יסוד",
        es: "Diez sefirot belimá y veintidós letras de fundamento",
        funcion: "Divide el 32 en sus dos materiales: 10 + 22.",
      },
      {
        ref: "Sefer Yetzirá 1:3 (ambas)",
        he: "עשר אצבעות חמש כנגד חמש",
        es: "Diez dedos, cinco contra cinco",
        funcion: "La cuenta se hace con el cuerpo.",
      },
      {
        ref: "Sefer Yetzirá 1:4 (ambas)",
        he: "עשר ולא תשע, עשר ולא אחת עשרה",
        es: "Diez y no nueve, diez y no once",
        funcion: "Fija el número sin margen.",
      },
      {
        ref: "Sefer Yetzirá 1:14 (ambas)",
        he: "אלו עשר ספירות בלימה",
        es: "Estas son las diez sefirot belimá",
        funcion: "El libro mismo dice cuáles son las diez.",
      },
      {
        ref: "Sefer Yetzirá 6:4 (corta) / 6:7 (Gra)",
        he: "ועלתה בידו",
        es: "Y le salió en la mano",
        funcion: "Abraham practica la obra; el libro se cierra en los doce mazalot.",
      },
    ],
    cierre: [
      `Un dato que da la medida del libro: entero, en la versión corta, tiene unas 1.700 palabras hebreas. Cabe en dos páginas y lleva más de mil años de comentarios.`,
    ],
  },
  // ── 1. תַּרְגּוּם ────────────────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "Texto base · Sefer Yetzirá 1:1 (igual en la versión corta y en la del Gra)",
        he: `בשלשים ושתים נתיבות פליאות חכמה חקק יה יהוה צבאות אלהי ישראל אלהים חיים ומלך עולם אל שדי רחום וחנון רם ונשא שוכן עד מרום וקדוש שמו וברא את עולמו בשלשה ספרים בספר וספר וספור`,
        es: "Con treinta y dos caminos maravillosos de sabiduría grabó Yah, el Eterno de los ejércitos, Dios de Israel, Dios vivo y Rey del mundo, El Shadai, compasivo y clemente, alto y elevado, que habita la eternidad, y santo es Su nombre; y creó Su mundo con tres sfarim: con séfer, con sfar y con sipur.",
        source: "Sefer Yetzirá 1:1 (versión corta = versión del Gra)",
      },
      {
        label: "Sefer Yetzirá 1:2 (ambas versiones)",
        he: `עשר ספירות בלי מה ועשרים ושתים אותיות יסוד שלש אמות ושבע כפולות ושתים עשרה פשוטות`,
        es: "Diez sefirot belimá y veintidós letras de fundamento: tres madres, siete dobles y doce simples.",
        source: "Sefer Yetzirá 1:2",
      },
      {
        label: "Sefer Yetzirá 1:3–1:4 (ambas versiones)",
        he: `עשר ספירות בלימה מספר עשר אצבעות חמש כנגד חמש וברית יחיד מכוונת באמצע … עשר ולא תשע, עשר ולא אחת עשרה, הבן בחכמה וחכם בבינה`,
        es: "Diez sefirot belimá: la cuenta de diez dedos, cinco contra cinco, y el pacto del Único colocado justo en el medio… Diez y no nueve, diez y no once. Entiende con sabiduría y sé sabio con entendimiento.",
        source: "Sefer Yetzirá 1:3–1:4 (texto de la versión corta; el Gra dice «במספר», «en el número de», con el mismo sentido)",
      },
      {
        label: "Sefer Yetzirá 1:14 (ambas versiones): el libro dice cuáles son las diez",
        he: `אלו עשר ספירות בלימה אחת רוח אלהים חיים ורוח מרוח ומים מרוח ואש ממים ורום מעלה ותחת מזרח ומערב וצפון ודרום`,
        es: "Estas son las diez sefirot belimá: una, el aliento del Dios vivo; y aliento del aliento; y agua del aliento; y fuego del agua; y arriba y abajo, este y oeste, norte y sur.",
        source: "Sefer Yetzirá 1:14",
      },
      {
        label: "La última página · Sefer Yetzirá 6:4 (versión corta)",
        he: `וכיון שצפה אברהם אבינו ע"ה והביט וראה וחקר והבין וחקק וחצב וצרף וצר ועלתה בידו אז נגלה עליו אדון הכל ב"ה … וכרת לו ברית בין עשר אצבעות רגליו והיא ברית המילה, ועשר אצבעות ידיו והוא הלשון. וקשר לו עשרים ושתים אותיות בלשונו וגלה לו את יסודן. משכן במים דלקם באש רעשן ברוח בערן בשבעה נהגם בשנים עשר מזלות`,
        es: "Y cuando Abraham, nuestro padre, contempló, y miró, y vio, e investigó, y entendió, y grabó, y talló, y combinó, y formó, y le salió en la mano, entonces se le reveló el Señor de todo, bendito sea… Y cortó con él un pacto entre los diez dedos de sus pies, que es el pacto de la circuncisión, y los diez dedos de sus manos, que es la lengua. Y le ató las veintidós letras en su lengua [o: con Su lengua] y le reveló su fundamento. Las arrastró en el agua, las encendió en el fuego, las agitó en el viento, las hizo arder en los siete y las condujo por los doce mazalot.",
        source: "Sefer Yetzirá 6:4 (versión corta) · en la versión del Gra es 6:7",
      },
    ],
    parrafos: [
      `Qué es este libro. El Sefer Yetzirá («el Libro de la Formación») es el libro más antiguo que conservamos de la mística hebrea, y uno de los más enigmáticos. Es brevísimo, casi telegráfico. No narra historias ni da leyes: describe los instrumentos con que el mundo fue formado. Su fecha es disputada. La mayoría de los estudiosos lo sitúa, por el hebreo en que está escrito, entre los siglos III y VI de la era común, y las propuestas extremas van bastante más allá por los dos lados. Lo que sí es seguro: en el siglo X ya circulaba y pesaba tanto que Saadia Gaón, en Babilonia, le dedicó un comentario completo. Lo de «Libro de la Formación» no es un capricho de traductor. La raíz י־צ־ר significa «dar forma», como el alfarero, y el libro habla todo el tiempo con verbos de artesano: grabar, tallar, pesar, combinar, formar.`,
      `1:1, los treinta y dos caminos y los tres sfarim. La primera línea da el número total: treinta y dos caminos (netivot) «maravillosos» (pli'ot, de la raíz que en el Tanaj designa lo que excede la comprensión humana). Y en seguida dice que el mundo fue creado «con tres sfarim»: con séfer, con sfar y con sipur. Son tres palabras de la misma raíz ס־פ־ר, que en hebreo significa a la vez escribir, contar números y contar un relato. Por eso en Jashmal lo decimos así: el mundo fue grabado, contado y hablado. La imagen habitual, la de un mundo solamente «hablado», viene del primer capítulo de Bereshit («y dijo Dios»). El Sefer Yetzirá la conserva, pero la pone al lado de otras dos. Y en todo su primer capítulo no apoya nada en Bereshit 1 (solo le toma prestada la expresión «tohu y bohu»): los versículos que cita como prueba son Yejezkel 1:14 y Tehilim 104:4.`,
      `1:2, diez más veintidós. La segunda línea descompone el treinta y dos en sus dos materiales: diez sefirot belimá y veintidós letras de fundamento, que a su vez se reparten en tres madres, siete dobles y doce simples. Ese reparto 3 / 7 / 12 no es un adorno: es la arquitectura del libro. El capítulo 3 trata las madres, el 4 las dobles y el 5 las simples. Fíjate en la expresión completa, porque el libro nunca dice «sefirot» a secas. Siempre dice sefirot belimá. Según la nota del traductor en Sefaria, es la primera vez que la palabra sefirot aparece en toda la literatura hebrea.`,
      `1:3 y 1:4, la cuenta de los diez dedos. Aquí está la frase del reel. El libro no compara las sefirot con las manos: las cuenta como se cuentan los dedos. Mispar eser etzba'ot, «la cuenta de diez dedos, cinco contra cinco», y en medio, justo en el centro, el «pacto del Único», que el texto sitúa en la lengua y en la circuncisión (la última página precisará: dedos de las manos y dedos de los pies). La mishná siguiente cierra el número sin dejar margen: diez y no nueve, diez y no once. Y añade una orden al lector: «entiende con sabiduría y sé sabio con entendimiento; examina con ellas e investiga a partir de ellas». En este versículo, jojmá (sabiduría) y biná (entendimiento) son todavía facultades de quien estudia, no nombres de sefirot.`,
      `1:14, qué son las diez en el libro mismo. Si uno se pregunta «¿y cuáles son esas diez?», el libro responde él mismo, al cerrar su primer capítulo: el aliento del Dios vivo; el aliento del aliento (el aire); el agua que sale del aliento; el fuego que sale del agua; y las seis direcciones: arriba, abajo, este, oeste, norte y sur. Las mishnayot 1:9 a 1:13 las van desplegando una a una. Con la segunda, el aliento, se graban las veintidós letras. Con la tercera, el agua, el caos y el barro. Con la cuarta, el fuego, el Trono de Gloria y las huestes celestes. Las seis direcciones quedan selladas con las combinaciones de tres letras del Nombre, י־ה־ו. (Qué combinación sella cada dirección cambia entre las dos versiones, así que aquí no las emparejamos.) Son diez medidas en las que el mundo se despliega: un origen, tres elementos y un espacio de seis caras.`,
      `6:4 (versión corta) / 6:7 (versión del Gra), la última página. El libro se cierra con una escena. Abraham «contempló, miró, vio, investigó, entendió, grabó, talló, combinó y formó», es decir, hizo con sus manos lo que el libro describe, y le salió en la mano (ve-altá be-yadó, «subió en su mano», el modismo hebreo para «lo logró»). La versión del Gra lo dice todavía más claro: «y le salió en la mano la creación», y lo apoya en Bereshit 12:5, «las almas que hicieron en Jarán». Entonces el Señor de todo se le revela, lo sienta en Su regazo, lo besa en la cabeza, lo llama «mi amado» y corta con él un pacto entre los diez dedos de sus manos, que es la lengua, y los diez dedos de sus pies, que es la circuncisión. La cuenta de los dedos, que apareció en la primera página, vuelve en la última. Después le ata las veintidós letras a la lengua y le revela su fundamento (en el Gra, «su secreto», y las letras son «de la Torá»).`,
      `Su lengua o Su lengua. El hebreo dice bi-leshonó. Puede leerse «en su lengua», la de Abraham, o «con Su lengua», la de Dios. La traducción inglesa de Sefaria elige la segunda. En el reel elegimos la primera, y es defendible por el contexto inmediato: la frase anterior acaba de llamar «lengua» al pacto entre los dedos de Abraham, y «le ató» (kashar lo) es «le ató a él». Pero son dos lecturas legítimas y el texto no decide. Tampoco decide quién es el sujeto de los últimos verbos («las arrastró en el agua, las encendió en el fuego…»): el traductor de Sefaria señala que no está claro si quien mueve las letras por el cosmos es Dios o Abraham.`,
      `El final, en las estrellas. Las últimas palabras del libro, idénticas en las dos versiones, son be-shnéim asar mazalot: «por los doce mazalot», las doce constelaciones del cielo. El libro que empezó contando dedos termina en el cielo. Entre una cosa y otra pasa por la boca, por el año y por el cuerpo entero.`,
    ],
  },
  // ── 2. מְפָרְשִׁים ───────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rav Saadia Gaón (רס״ג), Babilonia, 882–942.",
        texto: `El primer comentario completo que conservamos es el suyo, escrito en el siglo X. Esto importa por una razón muy concreta: es la prueba más firme de que el libro ya existía, circulaba y tenía autoridad mucho antes de la Cabalá medieval. Su comentario está en Sefaria enganchado a la versión corta. Para la fecha del libro, Saadia es el ancla segura. Todo lo que se diga antes de él es conjetura de los estudiosos.`,
      },
      {
        etiqueta: "Rabí Yehudá HaLeví, el Kuzari (הַכּוּזָרִי) 4:25, España, siglo XII.",
        texto: `En el Kuzari el sabio llama al libro Sefer Yetzirá «de Abraham nuestro padre» y explica sus tres palabras de la raíz ספר (סְפָר, סִפּוּר, סֵפֶר). Sfar es el número: la medida, el peso y la proporción con que un cuerpo queda ordenado y apto para su función. Lo ilustra con el arquitecto, que no levanta un edificio sin haberlo tenido antes trazado en el alma. Sipur es el lenguaje divino, el «sea la luz», que apenas dicho ya existe. Y séfer es la escritura, y la escritura de Dios son Sus criaturas. Luego viene lo más hondo: en Dios las tres son una sola cosa, y solo en el ser humano son tres, porque quiere con el pensamiento, habla con la boca y escribe con la mano. Es una lectura temprana, anterior al Zóhar, que ya entiende el libro como una teoría de la medida y de la palabra. Y nos muestra que en el siglo XII la atribución a Abraham es moneda corriente.`,
      },
      {
        etiqueta: "El Ramak, Rabí Moshé Cordovero (רמ״ק), Pardés Rimonim, Safed, 1548.",
        texto: `La gran suma de la Cabalá de Safed abre con un portal titulado, literalmente, «Diez y no nueve» (Sha'ar Éser ve-lo Tesha), es decir, con nuestra mishná 1:4. El gesto dice mucho: para Cordovero, la Cabalá entera empieza por establecer que las sefirot son diez, ni una más ni una menos, y lo establece con la frase del Sefer Yetzirá. Fue además Cordovero quien eligió, entre los manuscritos que circulaban, el texto preferido que luego refinaría el Arizal.`,
      },
      {
        etiqueta: "El Arizal, Rabí Itzjak Luria (הָאֲרִ״י), en Etz Jaim (redactado por R. Jaim Vital).",
        texto: `En la Cabalá luriana las diez del Sefer Yetzirá son las diez sefirot de nombre conocido, y el Arizal usa el «diez y no once» para resolver un problema técnico. Si se cuentan a la vez Kéter (la Corona) y Dáat (el Conocimiento), salen once, y el Sefer Yetzirá dijo «diez y no once». La respuesta: Dáat es el aspecto de neshamá, el alma, de Zeir Anpín (el rostro menor), y solo se cuenta lo que tiene vasija (kli), así que Dáat no entra en la cuenta de las diez (Etz Jaim, Sha'ar Mojín de-Tzélem, cap. 5; en Sefaria, Sefer Etz Chaim 23:5). Es la lectura que Jashmal sigue en todos sus estudios del árbol.`,
      },
      {
        etiqueta: "El Gaón de Vilna (הַגְּרָ״א), comentario a su propia versión del texto, siglo XVIII.",
        texto: `El Gra lee el libro, de punta a punta, con el mapa luriano en la mano. Cuando 1:1 dice pli'ot, «maravillosos», comenta que el texto habla ahí de Kéter, «que se llama pele, maravilla». Las tres madres (Álef, Mem, Shin) son para él Kéter, Jojmá y Biná, y las siete dobles son las siete sefirot inferiores. Hasta lee el pacto «del Único», yajid, como un número: יחיד = 10 + 8 + 10 + 4 = 32, los treinta y dos caminos concentrados en el centro de los diez dedos (comentario del Gra a 1:1, 1:2 y 1:3). Es una lectura de enorme profundidad, y es la que Jashmal sigue cuando habla de sefirot.`,
      },
      {
        etiqueta: "Y la honestidad que nos debemos.",
        texto: `Esa lectura del Ramak, del Arizal y del Gra identifica las diez del Sefer Yetzirá con Kéter, Jojmá, Biná… hasta Maljut, y la seguimos. Lo que no podemos hacer es decir que esa identificación ya está escrita en el libro. En sus seis capítulos, en las dos versiones, las sefirot no tienen nombre. No aparece jésed, ni maljut, ni la sefirá Kéter. La palabra kéter sí aparece, pero siempre en la fórmula «hizo reinar la letra… y le ató una corona»: es la corona de una letra, nunca la sefirá. La nota del traductor de Sefaria lo dice con prudencia: no está claro que el libro dé a sus diez el mismo significado que les darán los textos cabalísticos posteriores. Las dos cosas son verdad a la vez. El libro las cuenta, y la tradición posterior les puso nombre. Decir las dos no le quita nada a ninguna: el Arizal y el Gra no «corrigieron» el Sefer Yetzirá, lo leyeron. Y para medir la profundidad de una lectura hace falta saber primero qué dice el texto que se lee.`,
      },
    ],
    glosa: `Glosa para el lector: Sefer Yetzirá = «Libro de la Formación». Mishná (pl. mishnayot) = cada párrafo breve del libro. Netivot = caminos, senderos. Sefirot belimá = la expresión fija del libro para sus diez; sefirot viene de «contar»; belimá tiene dos lecturas posibles (ver PaRDeS). Otiyot yesod = letras de fundamento. Imot = madres; kfulot = dobles; pshutot = simples. Mazalot = las doce constelaciones del cielo. Kéter, Jojmá, Biná, Jésed, Guevurá, Tiféret, Nétzaj, Hod, Yesod, Maljut = los diez nombres que la Cabalá posterior da a las sefirot. Dáat = el Conocimiento, que a veces ocupa el lugar de Kéter. Kli = vasija. Zeir Anpín = «rostro menor», uno de los rostros (partzufim) de la Cabalá luriana. Ramak = Rabí Moshé Cordovero. Gra = el Gaón de Vilna.`,
  },
  // ── 2b. הַבְחָנָה — Lo que decimos y lo que no ───────────────────────────────
  habchana: {
    intro:
      "Esta sección no polemiza con nadie. Es una cuenta abierta: lo que esta página afirma, lo que no afirma, y por qué. Así sabes exactamente sobre qué suelo estás.",
    parrafos: [
      `Alrededor del Sefer Yetzirá circulan muchas frases que suenan bien y no se pueden sostener. No las repetimos. Algunas son falsas. Otras pueden ser ciertas, pero nadie las puede demostrar, y en ese caso preferimos decir «no lo sabemos» antes que vestirlas de certeza.`,
    ],
    tituloNo: "Lo que NO decimos, y por qué",
    listaNo: [
      `Que Abraham escribió el libro. El libro no lo dice. Su última página pone a Abraham practicando la obra («y le salió en la mano», 6:4 corta / 6:7 Gra), no escribiéndola. La atribución nace de esa escena y es antigua (el Kuzari 4:25 ya llama al libro «de Abraham nuestro padre»), pero es tradición, no dato. La decimos como tradición.`,
      `Que es «el libro de Cabalá más antiguo». Decimos «el libro más antiguo que conservamos de la mística hebrea». El nombre Cabalá para esta corriente es medieval. La propia Sefaria sitúa el Sefer HaBahir, de comienzos del siglo XIII, como el debut literario de la Cabalá, según los estudiosos que recoge. Llamar «cabalístico» al Sefer Yetzirá es leerlo desde lo que vino después.`,
      `Que es «la obra mística más antigua», sin más. Hay otra literatura mística hebrea, la de los palacios celestiales (Hejalot) y la del Carro (Merkavá), que se fecha en un arco que se solapa con este libro. Pero es un corpus anónimo y fluido, no un libro. Por eso decimos «el libro más antiguo que conservamos», y así no le quitamos su lugar a nadie.`,
      `Una fecha cerrada. No decimos «siglo II» ni «antes de la era común». Decimos «fecha disputada; la mayoría, entre los siglos III y VI». Incluso la ficha de Sefaria da dos fechas distintas en dos sitios, así que no la usamos como autoridad para la fecha.`,
      `Que el Talmud cita este libro. El Talmud menciona un «Sefer Yetzirá» (Sanhedrín 65b) y, contando la misma historia, unas «Hiljot Yetzirá», las leyes de la formación (Sanhedrín 67b). Pero no cita ni una línea de su contenido, y usa dos nombres distintos para el mismo relato. Que sea nuestro libro es tradición. No se puede demostrar.`,
      `Que en este libro las sefirot ya son Kéter…Maljut, «atributos divinos», «canales» o «vasijas». Así las lee la Cabalá posterior, y así las lee Jashmal cuando estudia el árbol. Pero el libro las cuenta y no las nombra. Cuando hablamos de lo que dice el libro, lo decimos con su vocabulario.`,
      `Que «el corazón (לֵב) = 32» es del Sefer Yetzirá. La cuenta es correcta: ל = 30 y ב = 2. Pero la asociación de los treinta y dos caminos con el corazón viene del Sefer HaBahir (§63 en la numeración de Sefaria), siglos después. La citamos con su fuente.`,
      `Que el libro es un manual para «fabricar» cosas. El Talmud cuenta historias asombrosas en torno a la «formación» (Sanhedrín 65b). Las respetamos como lo que son, relatos de los sabios, y no las usamos para atribuirle al libro poderes ni recetas.`,
      `Qué mes, sentido o planeta corresponde a cada letra «según el Sefer Yetzirá», sin decir la versión. Las listas de los capítulos 4 y 5 cambian de orden entre la versión corta y la del Gra, y con el orden cambia la letra que le toca a cada cosa. Si alguna vez lo decimos, lo decimos con la versión al lado.`,
    ],
    tituloSi: "Lo que SÍ decimos",
    listaSi: [
      `Que es el libro más antiguo que conservamos de la mística hebrea, de fecha disputada (la mayoría, siglos III–VI), y que en el siglo X ya tenía comentario completo (Saadia Gaón).`,
      `Que dice que el mundo fue creado por treinta y dos caminos: diez sefirot belimá y veintidós letras (1:1–1:2).`,
      `Que cuenta las diez como los diez dedos, cinco contra cinco (1:3), y fija el número: diez y no nueve, diez y no once (1:4).`,
      `Que el libro mismo enumera las diez: aliento, aire, agua, fuego y seis direcciones (1:14).`,
      `Que su última página pone a Abraham practicando la obra, cortando el pacto entre los diez dedos y recibiendo las veintidós letras en (o con) la lengua, y que el libro termina en los doce mazalot (6:4 corta / 6:7 Gra).`,
      `Que el Ramak, el Arizal y el Gra identifican esas diez con las sefirot de nombre conocido, y que Jashmal sigue esa lectura, diciendo siempre que es una lectura.`,
    ],
    cierre: [
      `Nada de esto le quita misterio al libro. Al contrario: sin el ruido de lo que no dice, lo que sí dice se oye mejor.`,
    ],
  },
  // ── 3. פרד״ס ─────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `En su sentido llano, el Sefer Yetzirá describe un taller. Hay un Artesano. Hay un material de veintidós piezas, las letras, y una cuenta de diez, las sefirot. Y hay unos verbos que se repiten como golpes de cincel: grabó, talló, pesó, permutó, combinó, formó (2:2: «veintidós letras: las grabó, las talló, las pesó, las permutó, las combinó, y formó con ellas el alma de toda criatura y el alma de todo lo que ha de ser formado», 2:2 en la versión corta). Al verbo abstracto «crear» del primer versículo de la Torá, el libro prefiere los verbos de las manos.`,
          `Las diez son, en sentido llano, lo que 1:14 dice: un origen (el aliento del Dios vivo, que 1:9 llama «voz, aliento y palabra, y esto es el rúaj ha-kódesh», el espíritu de santidad), tres elementos que salen uno de otro (aire, agua y fuego) y las seis direcciones del espacio. Es una cosmología completa en una línea. De un aliento sale el aire, del aire el agua, del agua el fuego, y todo queda encerrado en un espacio de seis caras sellado con el Nombre.`,
          `Las veintidós letras se ordenan en tres familias, y cada familia vive a la vez en tres planos que el libro llama mundo, año y persona (olam, shaná, néfesh): el espacio, el tiempo y el cuerpo.`,
          `Las tres madres: {{letter:alef|Álef}}, {{letter:mem|Mem}} y {{letter:shin|Shin}}. Su fundamento es una balanza: «el platillo del mérito y el platillo de la culpa, y la lengua de la ley decide entre ellos» (2:1). En el mundo son el aire, el agua y el fuego. En el año, lo templado, lo frío y lo caliente. En el cuerpo, el tronco, el vientre y la cabeza (3:6–3:8 corta / 3:7–3:9 Gra). Y el libro las oye: «la Mem calla, la Shin silba, y la Álef decide entre ellas» (6:1 corta / 6:2 Gra).`,
          `Las siete dobles: {{letter:bet|Bet}}, {{letter:guimel|Guimel}}, {{letter:dalet|Dalet}}, {{letter:kaf|Kaf}}, {{letter:pe|Pe}}, {{letter:resh|Resh}} y {{letter:tav|Tav}}. Se llaman dobles porque se pronuncian de dos maneras, suave y dura, y porque cada una lleva su contrario. Su fundamento son siete bienes: vida, paz, sabiduría, riqueza, encanto, descendencia y dominio. Sus reversos son muerte, mal, necedad, pobreza, fealdad, desolación y servidumbre (cap. 4).`,
          `Las doce simples: {{letter:he|He}}, {{letter:vav|Vav}}, {{letter:zayin|Zayin}}, {{letter:jet|Jet}}, {{letter:tet|Tet}}, {{letter:yod|Yod}}, {{letter:lamed|Lamed}}, {{letter:nun|Nun}}, {{letter:samej|Samej}}, {{letter:ayin|Ayin}}, {{letter:tzadi|Tzadi}} y {{letter:kof|Kof}}. Su fundamento son doce actividades humanas: ver, oír, oler, hablar, comer, la unión de la pareja, actuar, andar, enojarse, reír, pensar y dormir. Son también las doce aristas diagonales del espacio, los doce meses y los doce mazalot (cap. 5).`,
          `Cada una de esas veintidós tiene en Jashmal su propio estudio, en la serie «Canales creativos de la conciencia». Este libro es, literalmente, el primer mapa en que aparecen todas juntas.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión): números y raíces",
        parrafos: [
          `Una sola raíz para todo. Séfer (libro), sfar (número), sipur (relato) y sefirot salen de la misma raíz ס־פ־ר. La nota del traductor de Sefaria lo dice con sencillez: sefirot es el sustantivo de acción del verbo «contar», es decir, literalmente «cuentas» o «conteos». La alusión está a la vista. Las sefirot de este libro son, antes que nada, actos de contar. Y el reel lo pone en tu mano: diez dedos, diez cuentas.`,
          `Belimá, dos lecturas. La palabra que acompaña siempre a las sefirot admite dos lecturas, y las dos están en los manuscritos. Leída en dos palabras, beli-má es «sin qué», sin esencia nombrable. Su único precedente bíblico es Iyov (Job) 26:7: «suspende la tierra sobre la nada», al bli-má. Leída en una palabra, viene de la raíz ב־ל־ם, «frenar, contener», la misma que usa el libro en 1:8: blom pija mi-ledaber, «frena tu boca de hablar y tu corazón de pensar». Las diez son entonces cuentas «sin qué» o cuentas «contenidas». El libro no elige, y quizá no quiere elegir.`,
          `El pacto del Único = 32. El Gra señala que yajid, «Único», el pacto que 1:3 coloca en medio de los diez dedos, vale: י (10) + ח (8) + י (10) + ד (4) = 32, el número de los caminos. La cuenta es exacta. El centro vacío entre las dos manos contiene el todo.`,
          `El corazón = 32. Siglos después, el Sefer HaBahir (§63, numeración de Sefaria) dirá: «el corazón (לֵב) es treinta y dos… con ellos fue creado el mundo». ל (30) + ב (2) = 32. La gematría es correcta. La asociación es del Bahir, no del Sefer Yetzirá: el Bahir la recibe y la desarrolla.`,
          `231 puertas, y el deleite y la plaga. Las veintidós letras, dice 2:4 (en las dos versiones), están fijadas en una rueda «en doscientas treinta y una puertas», y la rueda gira hacia delante y hacia atrás. El número no es mágico, es aritmética: 22 letras tomadas de dos en dos dan 22 × 21 ÷ 2 = 231 parejas. Y el libro da la señal: «no hay en el bien nada más alto que el deleite (ענג, óneg), ni en el mal nada más bajo que la plaga (נגע, néga)». Son las mismas tres letras, ע־נ־ג, en otro orden. Una vuelta de la rueda separa el placer más alto de la herida más honda.`,
          `Las manos, el Arca y el centro vacío. El traductor de Sefaria sugiere, con un «quizás», que la imagen del pacto en el espacio vacío entre dos manos recuerda Shemot 25:22, la voz que habla «de entre los dos querubines» del Arca. Es solo una sugerencia del traductor, pero el eco existe, y lo estudiamos en {{study:arca-no-ocupa-lugar|El Arca que no ocupaba lugar}}.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          `Abraham no lo escribió: lo hizo. El drash más fuerte del libro está en su final. El libro no termina con una doctrina sino con una persona que practica: contempla, investiga, entiende y después graba, talla, combina, forma. Solo entonces «le salió en la mano», y solo entonces llegan la revelación y el pacto. El orden es la enseñanza: primero mirar y entender, después trabajar con las manos, y la revelación al final, como respuesta, no como punto de partida.`,
          `La lengua entre los diez dedos. El pacto se corta en dos lugares, y los dos son lugares de creación: la lengua, en medio de los diez dedos de las manos, y la circuncisión, en medio de los diez dedos de los pies. El juego de palabras ya está en 1:3: milá es a la vez «palabra» y «circuncisión». Con la palabra se crea hacia fuera y con el cuerpo se engendra. Y es en esa lengua donde se atan las veintidós letras. Pero el mismo libro advierte, en su último capítulo, que la lengua está entre los «tres enemigos» del cuerpo, junto con el hígado y la vesícula (6:3 corta / 6:5 Gra). El órgano que recibe las letras puede ser el instrumento del pacto o su enemigo. Depende de lo que haga con ellas.`,
          `La voz del Baal Shem Tov: las letras no se van. El Baal Shem Tov leyó Tehilim 119:89, «Para siempre, oh Eterno, Tu palabra está firme en los cielos», así: las palabras y letras de «haya un firmamento» siguen de pie dentro del firmamento, y lo mantienen vivo en cada instante. Si se retiraran un solo momento, el cielo volvería a la nada. El Alter Rebe, que recoge esta enseñanza en el Tania (Sha'ar HaYijud VehaEmuná, cap. 1), la lleva hasta el Sefer Yetzirá: una piedra no aparece nombrada en los diez dichos de la creación, pero su nombre hebreo, éven, desciende de ellos «por combinaciones y sustituciones de letras que giran en las doscientas treinta y una puertas, como está escrito en el Sefer Yetzirá», y ese nombre es su vida. La rueda de 2:4 no giró una vez al principio y se detuvo: sigue girando, y tú estás dentro de ella.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El Arizal: la cuenta exacta. En el nivel del secreto, «diez y no nueve, diez y no once» deja de ser una regla de aritmética y se vuelve una ley del alma del mundo. El Arizal (Etz Jaim, Sha'ar Mojín de-Tzélem, cap. 5) lo usa para decidir qué se cuenta: Kéter o Dáat, nunca los dos, porque Dáat es alma sin vasija, y en la cuenta de las diez solo entra lo que tiene vasija.`,
          `Baal HaSulam: por qué no nueve. Rav Yehudá Ashlag, Baal HaSulam, lleva la frase todavía más adentro (Talmud Éser HaSefirot, parte 2, Or Pnimí; en Sefaria, Ohr Penimi on Talmud Eser HaSefirot 2:1:22). Pregunta por qué el libro tiene que insistir en «no nueve». Porque la última, Maljut, después del tzimtzum (la contracción) no recibe luz directa, y uno podría pensar que entonces no es una sefirá, ya que la palabra sefirá, explica él, significa luminosidad, como el zafiro (sapir). Pero Maljut cuenta, y cuenta plenamente, porque es ella la que devuelve la luz hacia arriba (or jozer, la luz que regresa). Y por qué «no once»: porque no hay que imaginar una Maljut doble, una que recibe y otra que devuelve. Es una sola (Talmud Éser HaSefirot, parte 2, respuesta 121).`,
          `Dos filos. Aquí la palabra sefirá corta en dos direcciones. En el Sefer Yetzirá, según su raíz y su contexto, la sefirá es una cuenta, y se cuenta con los dedos. En Baal HaSulam es una luminosidad, como un zafiro. No se contradicen: son el mismo diamante visto desde dos caras. La que no recibe nada y aun así cuenta es la que devuelve la luz. El dedo número diez, el que cierra la cuenta, es el más pobre y el más necesario.`,
        ],
      },
    ],
    caja: {
      titulo: "Diez, y no nueve. Diez, y no once.",
      cuerpo:
        "El libro las cuenta con los dedos y no les pone nombre. La tradición que vino después las nombró, de Kéter a Maljut, y les encontró un alma. Jashmal sigue esa tradición sin borrar lo que el libro dice: primero se cuenta, después se nombra.",
    },
  },
  // ── 4. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas. Solo nos detenemos a interiorizar lo estudiado.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña?",
        texto: `Que el mundo tiene medida, y que la medida no es fría. Diez, y no nueve: nada de lo que existe sobra ni falta. Diez, y no once: no hace falta inventar nada más para que el mundo esté completo. Mi vida tiene también su cuenta exacta, y no está esperando a que le añada otra cosa para estar entera.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `El libro empieza en los dedos y termina en las estrellas, y en medio pasa por la boca. Lo más cercano y lo más lejano están hechos de las mismas veintidós piezas. El mismo orden que gira en los doce mazalot gira en mis doce actividades de cada día: ver, oír, hablar, comer, andar, pensar, dormir.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Abraham no recibió las letras antes de trabajar, sino después. Miró, entendió, grabó, combinó, y le salió en la mano. Muchas veces espero la claridad antes de empezar. El libro enseña el orden contrario: la claridad llega como respuesta al trabajo hecho con atención.`,
      },
      {
        etiqueta: "¿Y con la creación?",
        texto: `Si las letras no se retiran nunca de lo que nombran, entonces nada a mi alrededor está abandonado: ni la piedra, ni el agua, ni la persona con la que hablo hoy. Todo está siendo dicho, ahora, por una palabra que no se ha callado.`,
      },
    ],
  },
  // ── 5. מַעֲשֶׂה ───────────────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Cuenta tus diez dedos antes de hablar.",
    texto: `Hoy, la próxima vez que estés a punto de decir algo con enojo, o algo de alguien que no está presente, junta las manos y cuenta en silencio tus diez dedos, cinco contra cinco. Es la pausa de 1:8, «frena tu boca de hablar». Con eso basta: diez segundos, y la lengua que está en medio de las dos manos decide si habla como pacto o como enemigo. La midá (el rasgo de carácter) que se trabaja es shmirat ha-lashón, el cuidado de la palabra. Y una segunda acción, más lenta: elige esta semana una de las veintidós letras, la que te llame, y estúdiala completa en su página. Empieza por la {{letter:alef|Álef}}, la madre que «decide entre» el agua y el fuego.`,
  },
  // ── 6. חֲתִימָה ───────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El Sefer Yetzirá, el libro más antiguo que conservamos de la mística hebrea (fecha disputada; la mayoría, siglos III–VI), dice que el mundo fue formado por treinta y dos caminos: diez sefirot belimá y veintidós letras, y que fue grabado, contado y hablado (1:1–1:2).`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `En este libro las diez todavía no tienen nombre: son una cuenta, «diez y no nueve, diez y no once», contada en los dedos (1:3–1:4), y el libro mismo dice cuáles son: aliento, aire, agua, fuego y seis direcciones (1:14). La Cabalá posterior, del Ramak al Arizal y al Gra, las nombró de Kéter a Maljut, y Jashmal sigue esa lectura diciendo que es una lectura.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `La última página pone a Abraham trabajando la obra hasta que «le salió en la mano». El pacto se corta entre los diez dedos, en la lengua y en el cuerpo, y las letras se atan a la lengua (6:4 corta / 6:7 Gra). Para el Baal Shem Tov, esas letras nunca se retiran de lo que nombran.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Llevas encima la cuenta y la palabra. Cuenta antes de hablar, y habla como quien sabe que con la palabra también se forma un mundo.`,
      },
    ],
  },
  // ── Lectura nuestra (nota de autor, fuera del cuerpo sellado) ────────────────
  jidush: {
    titulo: "Lectura nuestra: las llevas encima",
    rotulo:
      "Esto es una lectura de Jashmal, no una cita ni una fuente. El libro dice estas cosas de Abraham. El «tú» es nuestro.",
    parrafos: [
      `El reel lo dijo en una línea: las diez cuentas y las veintidós letras, tú las llevas encima. Dedos para contar, una lengua para hablar.`,
      `Lo que es nuestro es la compresión y, sobre todo, el «tú». En su última página el libro habla de Abraham: sus diez dedos, su lengua, su pacto. Nosotros lo extendemos a quien lee.`,
      `Pero conviene decir también que la lectura no se aleja tanto del texto. El mismo libro coloca las veintidós letras en la boca de toda persona: «grabadas en la voz, talladas en el aliento, fijadas en la boca en cinco lugares», la garganta, el paladar, la lengua, los dientes y los labios (2:3; los nombres de los cinco lugares figuran en la versión del Gra). Coloca las tres madres en la cabeza, el vientre y el tronco, y las doce simples en los órganos y en las actividades del cuerpo («doce guías en la persona», cap. 5). Y cuenta las diez en los dedos desde la primera página. El libro ya había puesto el mapa del mundo dentro del cuerpo humano. Nosotros solo te señalamos que ese cuerpo es el tuyo.`,
      `Por eso el reel terminaba así, y aquí lo repetimos: el libro termina en las estrellas, pero antes cuenta tus diez dedos.`,
    ],
  },
  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  hemshej: [
    "{{letter:alef|Álef: la madre que decide entre el agua y el fuego}}",
    "{{letter:shin|Shin: la letra que silba, la madre del fuego}}",
    "{{letter:mem|Mem: la letra que calla, la madre del agua}}",
    "{{study:arca-no-ocupa-lugar|El centro vacío entre dos manos: el Arca que no ocupaba lugar}}",
  ],
  ctaRef: "Sefer Yetzirah 1:1",
};
