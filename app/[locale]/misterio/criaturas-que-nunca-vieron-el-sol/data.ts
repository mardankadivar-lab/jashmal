import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — Las criaturas que nunca vieron el sol
//  Serie «Los dos filos». Hermano de /misterio/lot (las dos hijas sin nombre):
//  aquel estudio cuenta la cueva y el linaje; este estudio lee la ESTRUCTURA
//  (Abraham rostro / Lot reverso, las klipot del Tania, la chispa que camina).
//
//  Nace de un jidush de Mardan: leer a Lot y su familia con la clave de las
//  klipot. Contenido verificado y escrito por el Sofer (editor-erudito),
//  2026-10-28. No agregar fuentes ni retocar el texto erudito.
//
//  Notas de montaje (respetar al pie de la letra):
//   · La LUCIÉRNAGA quedó DESCARTADA: no existe en ninguna fuente. El Talmud
//     (Moed Katán 6b) define אישות como «criatura que no tiene ojos» y Rashi
//     (Tehilim 58:9) la identifica con el TOPO. Nunca reintroducir la
//     luciérnaga — ni en el texto, ni en portadas, ni en guiones de video.
//   · Bereshit Rabá 51:1 aplica el versículo a LOS SODOMITAS, no a Lot: el
//     midrash pone a Lot del lado del sol (Ber. 19:23). El mapa criatura ↔
//     personaje es lectura SOBRE el midrash, no DEL midrash, y va marcado.
//   · Lot NO es el benoní del Tania (cap. 12: «nunca pecó ni un momento»).
//     Es rashá ve-tov lo (cap. 11) y, mejor, la DINÁMICA de klipat nogá (7).
//   · La «torcedura que no se endereza» (Tania 7) es un caso HALÁJICO judío;
//     las hijas de Lot son pre-Sinaí. La aplicación es conceptual y se dice.
//   · El hebreo va con niqqud donde la fuente lo trae y sin niqqud en las
//     citas arameas del Arizal/Zohar, tal cual Sefaria.
//   · Farsi: pendiente por regla de Mardan (no se produce farsi salvo que lo
//     pida). Los campos …Fa del hero llevan el español como respaldo; en el
//     catálogo van vacíos para que tri() marque la traducción pendiente.
// ════════════════════════════════════════════════════════════════════════════

const TITULO = "Las criaturas que nunca vieron el sol";
const SERIE = "Serie «Los dos filos» · Lot y las cáscaras";
const GANCHO =
  "El midrash abre la destrucción de Sodoma con un versículo de criaturas que no alcanzan a ver el sol: el caracol que se deshace al avanzar, el topo sin ojos, el feto arrojado de noche. Y en la misma frase deja a Lot ya a salvo, del lado del sol. Lot no es luz pura ni cáscara pura: es la mezcla. Y de su mezcla, por la cueva más oscura del libro, sale el Rey Mashíaj.";

export const data: EstudioData = {
  slug: "criaturas-que-nunca-vieron-el-sol",
  hero: {
    serielabel: SERIE,
    serielabelFa: SERIE,
    he: "בַּל חָזוּ שָׁמֶשׁ",
    titulo: TITULO,
    tituloFa: TITULO,
    ganchoEs: GANCHO,
    ganchoFa: GANCHO,
    par: {
      a: { he: "נֹעַם", rom: "Nóam · deleite · 166", color: "gold" },
      b: { he: "עַמּוֹן", rom: "Amón · la nación de la cueva · 166", color: "red" },
      valor: "166",
    },
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── Advertencia de integridad (abre el estudio, no es sección) ──────────────
  aviso: {
    titulo: "Advertencia del Sofer — lo que este estudio NO afirma",
    rotulo:
      "Este estudio nace de una intuición propia y, al verificar las fuentes, tres piezas del mapa original tuvieron que corregirse. Se dicen de entrada, antes de entrar en materia.",
    parrafos: [
      `Primero: en Bereshit Rabá 51:1 el versículo de las criaturas se aplica a LOS SODOMITAS, no a Lot ni a su familia. El midrash remata con «el sol salió sobre la tierra, y Lot llegó a Tzóar» (Bereshit 19:23), es decir: los de Sodoma son los que no vieron el sol, y Lot sí lo vio, ya a salvo. Por su propia estructura, el midrash pone a Lot del lado del sol. Leer a los personajes de su familia como esas criaturas es una lectura SOBRE el midrash, no DEL midrash, y así va marcada aquí.`,
      `Segundo: el midrash despliega CUATRO imágenes, no tres — el caracol, el gusano que se deshace en la inmundicia, la criatura que vuelve al polvo antes de ver el sol, y el feto que la adúltera arroja de noche.`,
      `Tercero: la LUCIÉRNAGA no existe en ninguna fuente. Leer אֵשֶׁת ligado a אֵשׁ (fuego) es una imagen hermosa, pero la tradición dice exactamente lo contrario: el Talmud define esa palabra como «una criatura que no tiene ojos» (Moed Katán 6b) y Rashi la identifica con el topo. La luciérnaga queda descartada en este estudio, y el reemplazo —el topo— enseña más.`,
      `Y cuarto: Lot NO es el benoní del Tania. El benoní del Tania (cap. 12) «nunca ha cometido ni jamás cometerá una transgresión… ni un momento en toda su vida». Lot prestaba con usura y ofreció a sus hijas a la turba. Está en otro capítulo, y lo veremos. Lo que sí se sostiene —y con una fuerza que no esperábamos— es Lot como cáscara: no por parecido, sino porque el Arizal lo escribió así, con nombre y guematría.`,
    ],
  },

  // ── Mapa del argumento (prólogo de orientación) ────────────────────────────
  mapa: {
    titulo: "Antes de entrar: las dos coordenadas y las cuatro criaturas",
    intro: [
      `Todo el estudio se mueve entre dos puntos del mismo capítulo. Arriba, el sol que sale sobre la tierra (Bereshit 19:23). Abajo, la cueva del monte (Bereshit 19:30). Entre esos dos puntos cabe un hombre entero, y de la cueva sale una dinastía.`,
      `Y en medio está el versículo que el midrash elige para abrir la destrucción: Tehilim 58:9, con sus criaturas que no alcanzan a ver el sol. Esta es la lista exacta, con su función en el argumento.`,
    ],
    filas: [
      {
        ref: "Tehilim 58:9",
        he: "כְּמוֹ שַׁבְּלוּל תֶּמֶס יַהֲלֹךְ נֵפֶל אֵשֶׁת בַּל־חָזוּ שָׁמֶשׁ",
        es: "Como el caracol que se deshace mientras avanza; la cría malograda del topo ciego, que nunca vieron el sol",
        funcion: "El versículo madre. Un solo «como», no dos: de ahí la discusión sobre cuántas criaturas hay.",
      },
      {
        ref: "Bereshit Rabá 51:1 · imagen 1",
        he: "כְּהָדֵין כִּילֵי סִילֵי לִימָצָא",
        es: "Como este kilei silei, limatza (el francés antiguo limace: caracol, babosa)",
        funcion: "Lo que se deshace mientras camina: avanza dejándose a sí mismo en el camino.",
      },
      {
        ref: "Bereshit Rabá 51:1 · imagen 2",
        he: "כַּשִּׁלְשׁוּל הַזֶּה שֶׁהוּא נִמְחֶה בְּצוֹאָה",
        es: "Como este gusano que se deshace en la inmundicia",
        funcion: "No lo disuelve el camino: lo disuelve el medio en que vive.",
      },
      {
        ref: "Bereshit Rabá 51:1 · imagen 3",
        he: "כְּאִישִׁית זוֹ שֶׁאֵינָהּ מַסְפֶּקֶת לִרְאוֹת שֶׁמֶשׁ עַד שֶׁהִיא חוֹזֶרֶת לֶעָפָר",
        es: "Como esta ishit, que no alcanza a ver el sol antes de volver al polvo",
        funcion: "La criatura sin ojos. El sol está ahí; el órgano no.",
      },
      {
        ref: "Bereshit Rabá 51:1 · imagen 4",
        he: "כְּאֵשֶׁת אִישׁ שֶׁזִּנְתָה",
        es: "Como la mujer casada que adulteró y arroja su feto de noche",
        funcion: "Lo que se esconde del sol a propósito, por vergüenza.",
      },
      {
        ref: "Bereshit 19:23",
        he: "הַשֶּׁמֶשׁ יָצָא עַל־הָאָרֶץ וְלוֹט בָּא צֹעֲרָה",
        es: "El sol salió sobre la tierra, y Lot llegó a Tzóar",
        funcion: "El remate del midrash: el mismo rayo que aniquila la ciudad encuentra a Lot a salvo.",
      },
      {
        ref: "Bereshit 19:30",
        he: "וַיֵּשֶׁב בַּמְּעָרָה הוּא וּשְׁתֵּי בְנֹתָיו",
        es: "Y habitó en la cueva, él y sus dos hijas",
        funcion: "El punto más bajo del relato — y el lugar del que el midrash saca al Mashíaj.",
      },
    ],
    cierre: [
      `Guardemos el orden: el versículo describe lo que no ve el sol, el midrash lo pone sobre Sodoma, y la frase siguiente deja a Lot afuera, caminando hacia Tzóar con la luz en la cara. Lo que viene después —la cueva— lo escribe él solo.`,
    ],
  },

  // ── 1. תַּרְגּוּם ────────────────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "El versículo madre · Tehilim (Salmos) 58:9",
        he: `כְּמוֹ שַׁבְּלוּל תֶּמֶס יַהֲלֹךְ נֵפֶל אֵשֶׁת בַּל־חָזוּ שָׁמֶשׁ`,
        es: "«Como el caracol que se deshace mientras avanza; la cría malograda del topo ciego, que nunca vieron el sol.» (Kemó shablul témes yahalój, néfel éshet bal jazú shámesh.)",
        source: "Tehilim 58:9",
      },
      {
        label: "El remate del midrash · Bereshit (Génesis) 19:23",
        he: `הַשֶּׁמֶשׁ יָצָא עַל־הָאָרֶץ וְלוֹט בָּא צֹעֲרָה`,
        es: "«El sol salió sobre la tierra, y Lot llegó a Tzóar.»",
        source: "Bereshit 19:23",
      },
      {
        label: "El juicio · Bereshit 19:24",
        he: `וַיהוה הִמְטִיר עַל־סְדֹם וְעַל־עֲמֹרָה גָּפְרִית וָאֵשׁ מֵאֵת יהוה מִן־הַשָּׁמָיִם`,
        es: "«Y Hashem hizo llover sobre Sodoma y sobre Amorá azufre y fuego, de parte de Hashem, desde los cielos.»",
        source: "Bereshit 19:24",
      },
      {
        label: "La mujer de Lot · Bereshit 19:26",
        he: `וַתַּבֵּט אִשְׁתּוֹ מֵאַחֲרָיו וַתְּהִי נְצִיב מֶלַח`,
        es: "«Y su mujer miró desde detrás de él, y quedó convertida en columna de sal.»",
        source: "Bereshit 19:26",
      },
      {
        label: "La cueva · Bereshit 19:30",
        he: `וַיַּעַל לוֹט מִצּוֹעַר וַיֵּשֶׁב בָּהָר … וַיֵּשֶׁב בַּמְּעָרָה הוּא וּשְׁתֵּי בְנֹתָיו`,
        es: "«Y subió Lot de Tzóar y se asentó en el monte… y habitó en la cueva, él y sus dos hijas.»",
        source: "Bereshit 19:30",
      },
    ],
    parrafos: [
      `Una corrección de texto antes de seguir, porque de ella sale todo lo demás. El versículo de los Salmos tiene UN SOLO «como» (kemó), no dos: dice «como el caracol que se deshace mientras avanza» y después, a secas, «néfel éshet». En el texto masorético no hay un segundo kemó delante de néfel.`,
      `El detalle no es cosmético. Precisamente porque el versículo NO separa las imágenes con un «como», los comentaristas llevan siglos discutiendo cuántas criaturas hay aquí: ¿dos, tres, o una sola descrita dos veces? Y de esa discusión sale la identificación de la criatura central, que es el corazón de este estudio.`,
      `Guardemos las dos coordenadas del relato, porque son los dos polos de todo lo que sigue: arriba, el sol que sale (19:23); abajo, la cueva (19:30). Entre esos dos puntos cabe un hombre entero.`,
    ],
  },

  // ── 2. מְפָרְשִׁים ───────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Bereshit Rabá 51:1 — ¿a quién le habla el versículo?",
        texto: `El midrash comenta «Y Hashem hizo llover sobre Sodoma y sobre Amorá azufre y fuego» (Bereshit 19:24) y de inmediato trae Tehilim 58:9. Luego despliega cuatro imágenes: el caracol (limatza), el gusano «que se deshace en la inmundicia», la ishit «que no alcanza a ver el sol antes de volver al polvo», y la mujer casada que adulteró y «se avergüenza de mostrar su feto y lo arroja de noche, antes de que vea el sol». Y entonces remata: «Esto es lo que está escrito: el sol salió sobre la tierra, y Lot llegó a Tzóar» (19:23). El sujeto de las cuatro imágenes son los sodomitas, aniquilados al amanecer. Y la prueba que da el midrash es que el mismo sol, la misma frase, encuentra a Lot ya a salvo. El midrash pone a Lot del lado del sol.`,
      },
      {
        etiqueta: "Bereshit Rabá 50:4 — el retrato más fino de Lot.",
        texto: `Antes de todo eso, el midrash ya lo había dibujado entero en dos líneas. Sobre «Desviaos, por favor» (Bereshit 19:2) dice Rabí Huná que Lot les pedía: «Dad una vuelta al camino para venir a mí, para que no os vean entrar en mi casa». Y sobre «pasad la noche y lavad»: Abraham pone el lavado antes de la pernoctada y Lot al revés, «porque Abraham se cuidaba de la suciedad de la idolatría, y Lot no se cuidaba de la suciedad de la idolatría». Lot practica la hospitalidad de Abraham, y la esconde: pide que entren por un camino torcido para que los vecinos no lo vean siendo bueno. Y recibe huéspedes sin pedirles que se laven, porque el polvo de la idolatría no le molesta. Hace el bien con vergüenza y convive con el mal sin asco. Las dos mitades a la vez, en la misma persona, en la misma noche.`,
      },
      {
        etiqueta: "Bereshit Rabá 51:6 — ¿y por qué lo salvaron?",
        texto: `El midrash pregunta qué mérito se le recordó a favor, y responde: el silencio que guardó cuando Abraham dijo de Sará «ella es mi hermana» (ver Bereshit 12:18) — «él sabía, y se calló». El único mérito que el midrash le encuentra a Lot es una boca cerrada: no una mitzvá, una omisión. Y en la misma sección, sin transición, los Rabanim dicen que les prestaba dinero con usura en las cinco ciudades. Las fuentes no hacen de Lot un santo ni un monstruo. Lo dejan ser las dos cosas.`,
      },
      {
        etiqueta: "Bereshit Rabá 51:5 — el pecado de la sal.",
        texto: `Sobre «y su mujer miró desde detrás de él, y quedó columna de sal» (19:26), dijo Rabí Itzjak: fue porque pecó con la sal aquella noche en que vinieron los ángeles. ¿Qué hizo? Fue a todas sus vecinas y les dijo: «Dadme sal, que tenemos huéspedes» — y su intención era que los habitantes de la ciudad se enteraran de ellos. Por eso quedó columna de sal. No la castigó la curiosidad: la castigó la delación. Usó un pedido doméstico y trivial —sal— como señal para denunciar a los invitados de su marido. Medida por medida: quedó hecha de lo que usó.`,
      },
      {
        etiqueta: "Zohar, Pekudei 12:73 — «desde detrás» de quién.",
        texto: `Sobre el mismo versículo, el Zohar pregunta: «¿Qué es "desde detrás de él"? Desde detrás de la Shejiná» (מאי מאחריו? מאחורי שכינתא). No lee «miró hacia atrás», sino «miró desde el lado de atrás»: desde los ajoraim, desde el reverso. No es que mirara el lugar prohibido; es que miró desde la posición equivocada, desde la espalda de la Presencia y no desde su rostro. Y es la misma palabra que el Arizal usa para Lot: ajoraim. Marido y mujer, los dos del lado de la espalda.`,
      },
      {
        etiqueta: "Bereshit Rabá 51:9 y Mishná, Yevamot 76b — la puerta angosta.",
        texto: `Sobre las hijas el midrash es deliberadamente ambiguo: «No sabemos si Lot deseó a sus hijas o sus hijas lo desearon a él. De lo que está escrito "el apartado busca su deseo" (Mishlei 18:1) se aprende que Lot deseó a sus hijas, y sus hijas no lo desearon a él». Y cierra con una frase que es halajá exacta: «Los hombres fueron alejados y las mujeres fueron acercadas» (הָאֲנָשִׁים נִתְרַחֲקוּ, וְהַנָּשִׁים נִתְקָרְבוּ). La Torá prohíbe para siempre al amonita y al moabita (Devarim 23:4), pero la Mishná lo limita: «amoní y no amonit, moaví y no moavit» — las mujeres son permitidas de inmediato, incluso la conversa misma (Yevamot 76b). Por esa puerta, y solo por esa, entra {{study:linaje|Rut}}. La casa de David entra en Israel por una rendija de la halajá del ancho de una palabra.`,
      },
      {
        etiqueta: "El Arizal · Sháar HaPesukim, Lej Lejá — Lot no se parece a una cáscara: lo es.",
        texto: `Aquí la lectura recibe el respaldo más fuerte posible, y no hubo que inventarla: {{study:el-ari|el Arizal}} ya la había escrito. Rabí Jaim Vital trae en su nombre: «ולוט הוא עומד כנגד אחוריים דז"א, והוא הקליפה היונקת מן אחוריים שלו, ולכן גם הוא בגימטריא מ"ה, כמנין לו"ט. ולוט תרגום דארור, שהיא הקליפה. ולכן היה קרובו של אברהם, ויונק ממנו, ותמיד הולכים יחד» — «Y Lot está parado frente a los ajoraim (el reverso, la espalda) de Zeir Anpin, y él es la klipá que mama del reverso de él; y por eso él también es en guematría 45, como la cuenta de לו"ט. Y Lot es el Targum de arur (maldito), que es la klipá. Y por eso era pariente de Abraham, y mamaba de él, y siempre andaban juntos».`,
      },
      {
        etiqueta: "Las tres afirmaciones del Arizal, verificadas una por una.",
        texto: `Primera: לוט = ל(30) + ו(6) + ט(9) = 45. Segunda: Abraham es la luz de los jasadim de Zeir Anpin, el Nombre יהוה en su desdoblamiento con álefs (HaVaYaH de-alafin), que suma יוד(20) + הא(6) + ואו(13) + הא(6) = 45 — el mismo número que אדם (Adam, el ser humano: 1+4+40 = 45) y que מה («¿qué?», la palabra de la anulación de Moshé). Tercera: Lot es el arameo de «maldito» — el Targum Onkelos traduce אָרוּר (arur) por לִיט (lit) tanto en Bereshit 3:14 (la serpiente) como en 9:25 (Kenaán): las mismas tres letras del nombre de Lot. Lot y el Nombre tienen el mismo peso. No porque Lot sea santo, sino porque la cáscara es exactamente del tamaño de la luz de la que mama. Una cáscara no es más pequeña que su fruta: es su molde al revés.`,
      },
      {
        etiqueta: "El Arizal · Sháar HaPesukim, Vayerá — lo que Lot se llevó.",
        texto: `Comentando «Y dijo la mayor a la menor» (Bereshit 19:31): «וכשנפרד לוט מעל אברהם, הוציא עמו שתי נשמות קדושות, שנתערבו בחטאו של אדם הראשון. והנה הם, רות המואביה, ונעמה העמונית… אבל רות היא מן מלכות… וכל הנשמות הקדושות של מלכות בית דוד, עד המשיח, כלם היו כלולות בה… ולא נתבררו משם, עד שנתגיירה רות» — «Cuando Lot se separó de Abraham, sacó consigo dos almas santas que se habían mezclado en el pecado de Adam HaRishón. Y estas son: Rut la moabita y Naamá la amonita… Pero Rut es de Maljut, el mundo revelado, y por eso las klipot se aferraron a ella muchísimo, y todas las almas santas del reino de la casa de David, hasta el Mashíaj, estaban todas incluidas en ella… y no se refinaron de allí hasta que Rut se convirtió». Léase despacio, porque invierte el relato entero: Lot no se fue de Abraham con las manos vacías. Se fue cargando dos almas santas —caídas desde el pecado del primer hombre— y las metió en la cáscara. Y la mayor de las dos traía dentro toda la casa de David, hasta el Mashíaj.`,
      },
      {
        etiqueta: "La guematría de Rut, paso por paso.",
        texto: `El Nombre אדני (Adnut, la sefirá de Maljut) desdoblado —אלף דלת נון יוד— suma 111 + 434 + 106 + 20 = 671 (תרע"א). Menos sus propias letras simples א־ד־נ־י (1 + 4 + 50 + 10 = 65, ס"ה), queda el relleno puro (miluim): 671 − 65 = 606. Y רות (Rut) = 200 + 6 + 400 = 606. Verificado paso por paso. Rut es, literalmente, lo que le sobra al Nombre de Maljut cuando le quitas sus propias letras: el relleno escondido dentro del Nombre. Lo que no se ve cuando lees el Nombre, y que sin embargo lo llena por dentro.`,
      },
      {
        etiqueta: "El Arizal — y la vuelta más impresionante: de Nóam a Amón.",
        texto: `«כי עמון הם אותיות נועם… והקליפה הנאחזת בה, מתהפכת מנועם לעמון» — «Porque עַמּוֹן (Amón) son las letras de נֹעַם (Nóam, "deleite")… y la klipá que se aferra allí se da vuelta, de Nóam a Amón». Verificado letra por letra y número por número: נֹעַם y עַמּוֹן tienen exactamente las mismas cuatro letras (nun, vav, ayin, mem) en otro orden; נועם = 50+6+70+40 = 166 y עמון = 70+40+6+50 = 166, el mismo valor. Nóam es la palabra de Tehilim 90:17: «וִיהִי נֹעַם אֲדֹנָי אֱלֹהֵינוּ עָלֵינוּ», «Y sea el deleite de mi Señor, nuestro Dios, sobre nosotros». Y נַעֲמָה (Naamá) = 165; con el kolel (+1) = 166. La klipá no es otra cosa que el Nombre con las letras desordenadas. No le falta nada: no tiene una sola letra menos. Tiene las mismas, en el orden equivocado. Por eso pesa igual. Y por eso se puede arreglar: lo que está desordenado se reordena; lo que falta, no.`,
      },
      {
        etiqueta: "Y las dos cuevas desembocan en el mismo trono.",
        texto: `No una hija, las dos. La mayor engendra a Moav, de donde viene Rut y de Rut el Rey David (Rut 4:17–22). La menor engendra a Amón, de donde viene Naamá la amonita, que fue mujer de Shlomó y madre de Rejavam, el rey que lo sucedió: «y el nombre de su madre, Naamá la amonita» (Melajim I / Reyes I 14:21). Verificado.`,
      },
      {
        etiqueta: "Tania, Likutei Amarim cap. 6 — las tres cáscaras, y de dónde salen sus nombres.",
        texto: `«La categoría inferior consiste en las tres klipot que son completamente impuras y malas, sin bien alguno. En la carroza de Yejezkel se llaman "viento tempestuoso" (ruaj seará), "nube grande" (anán gadol") y "fuego flameante" (esh mitlakájat)». Es decir: el Tania toma los nombres de las tres cáscaras de las tres primeras expresiones de la visión de Yejezkel 1:4.`,
      },
      {
        etiqueta: "Tania cap. 7 — klipat nogá, la cuarta: la que puede ir para los dos lados.",
        texto: `«Esta es una categoría intermedia entre las tres klipot completamente impuras y la categoría y el orden de la santidad. Por eso a veces es absorbida dentro de las tres klipot impuras (Etz Jaim, Sháar 49, inicio del cap. 4, en nombre del Zohar), y a veces es absorbida y elevada a la categoría y el nivel de la santidad, cuando el bien que está mezclado en ella se separa del mal (keshe-ha-tov ha-meurav ba mitbarer me-ha-ra), y prevalece y asciende hasta ser absorbida en la santidad». Y antes: «en este mundo, llamado Mundo de Asiyá, la mayor parte —casi toda— es mala, y solo un poco de bien se ha mezclado en ella». Nótese la palabra exacta: mitbarer. El bien se separa, se refina, se decanta del mal, y asciende. El Tania no dice que la parte oscura se disuelva; dice que el bien se saca de ella. La diferencia importa: el mal se queda donde estaba. Lo que cambia de lugar es el bien. Y alguien tiene que colar la mezcla.`,
      },
      {
        etiqueta: "Tania cap. 12 — y aquí hay que corregir el mapa: Lot no es el benoní.",
        texto: `El Tania define al benoní con una severidad que sorprende a casi todo el mundo: es aquel «en quien el mal nunca alcanza fuerza suficiente para capturar la "ciudad pequeña", hasta vestirse en el cuerpo y hacerlo pecar… Nunca ha cometido ni jamás cometerá una transgresión; y tampoco se le puede aplicar el nombre de "malvado" ni temporalmente, ni por un momento, en toda su vida». Ese no es Lot. Lot prestó con usura (BR 51:6), «deseó a sus hijas» (BR 51:9) y ofreció a sus hijas a la turba (Bereshit 19:8). El benoní del Tania es un rango casi santo: un hombre que nunca pecó y que sin embargo todavía no es tzadik porque su naturaleza no está transformada.`,
      },
      {
        etiqueta: "Tania cap. 11 — el capítulo donde Lot sí entra.",
        texto: `El רשע וטוב לו (rashá ve-tov lo, «el malvado que tiene bien»): «El bien que está en su alma divina… está subordinado a, y anulado por, el mal de la klipá… Hay quien en quien esa subordinación es muy menor, y ni siquiera permanente… sino que en raras ocasiones el mal prevalece sobre el bien y conquista la "ciudad pequeña", es decir el cuerpo — y no todo él, sino una parte… Pero entonces el bien que hay en su alma divina se reafirma, y se llena de remordimiento, y busca el perdón de Hashem». Ese sí es Lot. Y nótese que el Tania no lo abandona: incluso de ese hombre dice que el bien se reafirma y busca perdón. El acierto de la intuición original se salva cambiando el nivel de la comparación: Lot no es una categoría de persona, Lot es la DINÁMICA de klipat nogá — no «Lot es un benoní», sino «Lot es la mezcla que puede ir hacia arriba o hacia abajo». Y así leído es más fuerte, porque es exactamente lo que el cap. 7 describe: la sustancia que unas veces es tragada por las tres cáscaras y otras veces es elevada a la santidad, según lo que se haga con ella.`,
      },
      {
        etiqueta: "Tania cap. 7, el final — la frase que cae sobre la cueva.",
        texto: `«[La vitalidad caída en las tres klipot] no se libera hasta el Tiempo del Fin, cuando la muerte sea tragada para siempre (Yeshayahu 25:8)… salvo que haga teshuvá desde un amor tan grande que sus transgresiones deliberadas se le vuelvan como méritos. Y con esto se entiende el dicho de nuestros maestros: "¿Cuál es la torcedura que no se puede enderezar? Aquel que vino sobre una ervá (relación prohibida) y engendró un hijo" — porque entonces, aun si hiciera una teshuvá grandísima, le es imposible elevar esa vitalidad a la santidad, ya que descendió a este mundo y se vistió en un cuerpo de carne y sangre». Hay que ser preciso para no abusar de esto: el Tania habla de un caso HALÁJICO judío. Las hijas de Lot son anteriores a Sinaí y no están bajo esa categoría legal; Moav no es un mamzer halájico. La conexión es conceptual, no halájica, y hay que decirlo. Pero conceptualmente la frase cae encima de la cueva con una precisión brutal: la unión prohibida que produce un hijo es, para el Tania, la única torcedura que no se puede desandar, porque la chispa ya se vistió en un cuerpo y no se puede hacer subir de vuelta. Y entonces la Torá y el Arizal responden: no subió. Caminó.`,
      },
      {
        etiqueta: "Baal Shem Tov, Bo 1:1 (Ben Porat Yosef 18) — y es sobre las hijas de Lot.",
        texto: `«העיקר אם יכוון מחשבת לבו לשמים, גם כי המעשה זר כמו בנות לוט… וצריך לומר שבאמת צריך ישוב רב וגורל אם הוא לה' או לעזאזל… כחצות הלילה שהספק הוא בחצות לכאן ולכאן, אז אני יוצא בתוך מצרים במצר שלו, להאיר עיניו» — «Lo principal es que dirija el pensamiento de su corazón al Cielo, aun cuando el acto sea extraño, como en el caso de las hijas de Lot… Pero hay que decir que en verdad hace falta mucha deliberación y discernimiento, si es para Hashem o para Azazel… [Y por eso] "a eso de la medianoche" (Shemot 11:4): la duda está en el punto medio, hacia aquí y hacia allá — y entonces "Yo salgo en medio de Egipto", en medio de su estrechez (be-métzar shelo), para iluminarle los ojos». El Baal Shem Tov pone a las hijas de Lot como el caso límite de la intención pura en un acto impuro, y acto seguido se contesta a sí mismo con Baal Peor, donde también intentaron para el Cielo y fueron castigados. Su conclusión no es «sigue tu corazón»: es que hace falta deliberación larga y luz de Torá para saber «si es para Hashem o para Azazel». La zona intermedia no es una licencia: es un lugar donde hay que pensar más, no menos. Y su lectura de kajatzot ha-laila es exactamente nuestro tema: la duda está en el punto medio — y es ahí, en la estrechez, donde Él entra a iluminar los ojos. El medio no es el lugar donde Dios no está. Es el lugar al que Dios sale.`,
      },
    ],
    glosa: `Klipá (קְלִיפָּה, plural klipot) significa «cáscara» o «corteza»: en la Cabalá, lo que oculta la luz divina como la cáscara esconde la fruta. Klipat nogá («cáscara que brilla») es la cuarta, la intermedia, la única que tiene bien mezclado. Ajoraim (אֲחוֹרַיִים) es «el reverso», el lado de la espalda, frente a panim, el rostro. Zeir Anpin («el rostro pequeño») es la configuración de las seis sefirot centrales. Tzadik es el justo; benoní, el intermedio; rashá ve-tov lo, «el malvado que tiene bien». Y tikún (תִּיקּוּן) es la reparación de algo roto o incompleto.`,
  },

  // ── 2b. הַבְחָנָה — ¿qué criatura es אֵשֶׁת? ─────────────────────────────────
  habchana: {
    intro:
      "La pieza más delicada de este estudio es la criatura del medio. La identificación cambia la enseñanza entera, así que conviene apartarla y mirarla sola.",
    parrafos: [
      `La tentación es leer אֵשֶׁת (éshet) ligado a אֵשׁ (esh, fuego), y sacar de ahí una criatura de luz: una luciérnaga que solo brilla por contraste con la oscuridad y se apaga cuando sale de ella. Es una imagen hermosa, consoladora y falsa. Ningún comentarista verificado lee אשת como fuego, y la tradición dice exactamente lo contrario.`,
      `El Talmud Bavlí, Moed Katán 6b, define la palabra directamente: «מאי אישות? אמר רב יהודה: בריה שאין לה עיניים» — «¿Qué es la ishut? Dijo Rav Yehudá: una criatura que no tiene ojos». Y el propio Talmud trae como prueba nuestro versículo: nunca vio el sol porque no tiene ojos.`,
      `Rashi, sobre Tehilim 58:9, lo traduce al francés antiguo de su tiempo: «נֵפֶל אֵשֶׁת — טלפ"א בלע"ז, שאין לה עיניים, והיא תנשמת דמתרגמינן אשותא, כך פירשוהו רבותינו» — «néfel éshet: talpe en lengua vulgar [el topo], que no tiene ojos; es la tinshémet (Vayikrá 11:30), que el Targum traduce ashutá. Así lo explicaron nuestros maestros (Moed Katán 6b)». Rashi añade que otros leen «néfel de ishá», el aborto de una mujer. Ibn Ezra discute solo la gramática de אשת (la he femenina que se vuelve tav). Radak lee «néfel ha-ishá» y nota que caracol y feto comparten algo: ambos están cubiertos —el caracol por su concha «que le es como un vestido», el feto por el vientre. Metzudat David cierra: «así estos malvados no verán el sol, es decir, la luz de la salvación».`,
    ],
    tituloNo: "Lo que NO es",
    listaNo: [
      "No es una luciérnaga: ninguna fuente verificada lee אשת como fuego ni como criatura luminosa.",
      "No es «luz que solo brilla en la oscuridad». Esa lectura convierte el problema en circunstancia —«no es que yo esté mal, es que me sacaron de mi ambiente»— y las fuentes no dicen eso.",
      "No es una criatura a la que le falte el sol.",
    ],
    tituloSi: "Lo que SÍ dicen las fuentes",
    listaSi: [
      "Un topo ciego: «una criatura que no tiene ojos» (Talmud, Moed Katán 6b; Rashi a Tehilim 58:9, que lo identifica con la tinshémet de Vayikrá 11:30).",
      "O un feto malogrado, arrojado antes de ver la luz (Radak, Metzudat David, y «otros» en Rashi).",
      "Y lo que une al caracol con el feto, según Radak: los dos están cubiertos — uno por su concha «que le es como un vestido», el otro por el vientre.",
    ],
    cierre: [
      `Y el reemplazo enseña más que la imagen que perdimos. Porque «luz que brilla por contraste» todavía es luz. El topo es otra cosa: es un animal con ojos inútiles, que vive a la vuelta de la mano del sol y nunca gira la cabeza. El sol está ahí, a tres dedos de tierra sobre su cabeza, todos los días de su vida. No le falta luz afuera. Le falta el órgano.`,
    ],
  },

  // ── 3. פרד״ס ───────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat: el sentido llano",
        parrafos: [
          `Sodoma fue destruida al amanecer. La frase «el sol salió sobre la tierra y Lot llegó a Tzóar» (Bereshit 19:23) marca el instante: el mismo rayo que alcanza a Lot a salvo es el que encuentra a la ciudad en el polvo. El salmista (Tehilim 58:9) describe a los malvados con imágenes de criaturas que no llegan a ver el sol: el caracol que se deshace al avanzar, el topo ciego, el feto arrojado de noche. Bereshit Rabá 51:1 aplica esas imágenes a los sodomitas.`,
          `La mujer de Lot mira mal y queda petrificada (19:26). Lot termina en una cueva con sus dos hijas (19:30) y de ahí salen Moav y Amón (19:37–38). En el pshat esto es una historia de castigo. Y hay que dejar que el pshat sea negativo, sin apurarse a redimirlo: si lo elevamos demasiado rápido, le quitamos el filo a lo que viene.`,
        ],
      },
      {
        head: "רֶמֶז — Remez: la insinuación",
        parrafos: [
          `Primera insinuación. Las mismas cuatro letras hacen נֹעַם (nóam, deleite — Tehilim 90:17) y עַמּוֹן (Amón, la nación nacida en la cueva). El mismo valor: 166 = 166. Lo dice el Arizal (Sháar HaPesukim, Vayerá) y el cálculo está verificado. La cáscara es el Nombre con las letras barajadas.`,
          `Segunda insinuación. לוט = 45: el mismo número que el Nombre יהוה en su desdoblamiento con álefs, que es Abraham; el mismo número que אדם, el ser humano; el mismo número que מה, «¿qué?». Arizal (Sháar HaPesukim, Lej Lejá), verificado. El reverso pesa igual que el rostro.`,
          `Las dos insinuaciones dicen lo mismo desde dos lados: en la cáscara no hay carencia de material. Hay desorden de material. Y el desorden tiene arreglo.`,
        ],
      },
      {
        head: "דְּרָשׁ — Drash: lo que la historia exige de nosotros",
        parrafos: [
          `El drash del midrash es implacable con Lot, y por eso es confiable cuando lo salva. Bereshit Rabá 50:4 nos entrega al hombre que pide que lo visiten por el camino torcido para que nadie lo vea siendo bueno. Esa frase describe a mucha gente, y no describe a malvados: describe a los que tienen el bien y le tienen vergüenza. Lot no dudaba de lo que era correcto; dudaba de ser visto haciéndolo. Su cáscara no era la maldad: era el qué dirán de Sodoma.`,
          `Y su único mérito registrado (BR 51:6) es un silencio: se calló cuando Abraham dijo que Sará era su hermana. El hombre que escondía su bondad por cobardía usó la misma discreción, una sola vez, para salvar a otro — y Hashem guardó ese silencio y lo cobró años después. La misma facultad, callarse, que en Sodoma era cobardía, en Egipto fue lealtad. Las fuerzas del alma no son buenas ni malas: son direccionables.`,
          `Y aquí entra el Baal Shem Tov (Bo 1:1) con la advertencia que impide que esto se convierta en permiso. Él sí trae a las hijas de Lot como prueba de que la intención puede santificar un acto extraño — y acto seguido se refuta con Baal Peor, donde también intentaron para el Cielo y fueron castigados. Su conclusión no es «sigue tu corazón»: es que hace falta «mucha deliberación y discernimiento, si es para Hashem o para Azazel». La zona intermedia no es una licencia. Es un lugar donde hay que pensar más, no menos.`,
        ],
      },
      {
        head: "סוֹד — Sod: el secreto",
        parrafos: [
          `En el nivel del secreto los personajes dejan de ser personas y se vuelven estructura. {{study:el-ari|El Arizal}} traza el esquema: Abraham es la luz de los jasadim de Zeir Anpin, el rostro; Lot es la cáscara que mama de los ajoraim, de la espalda. Mientras Abraham estaba fuera de la Tierra, la cáscara estaba pegada a la santidad y mamaba de ella sin conflicto. Solo cuando Abraham entró a la Tierra y «entraron los mojín de gadlut» —la consciencia madura— se separó Lot de Abraham: «hipared na me-alai» (Bereshit 13:9).`,
          `Esto reordena todo. La separación no fue un fracaso: fue el síntoma de que la consciencia había crecido. Mientras el alma es pequeña, su cáscara le parece parte de ella y van «siempre juntos». Cuando madura, la cáscara se despega y se va a vivir a Sodoma. La separación es la factura del crecimiento. Y lo que se va, se va con algo nuestro adentro.`,
          `Porque —y esto es lo que el Arizal pone en el centro— Lot se llevó dos almas santas caídas desde el pecado de Adam: Rut y Naamá. Y en Rut estaba toda la casa de David hasta el Mashíaj, y no se refinaron de allí hasta que Rut se convirtió. Y la guematría cierra el círculo: רות = 606 = el desdoblamiento del Nombre אדני (671) menos sus propias letras (65). Rut es el relleno del Nombre de Maljut: lo invisible que lo llena por dentro. Lo que no se lee cuando lees. Las {{study:chispas-en-las-naciones|chispas}} no cayeron solas: alguien las bajó.`,
          `Y aquí el estudio llega a su filo doble, que es un filo real y no retórico. Un filo: el Tania (cap. 7) dice que la vitalidad de una unión prohibida que engendra un hijo es «la torcedura que no se puede enderezar», porque ya descendió a un cuerpo y no se puede hacer subir (caso halájico judío; la aplicación aquí es conceptual). El otro filo: el midrash dice que de esa misma cueva sale el Rey Mashíaj — Bereshit Rabá 51:8: «"y daremos vida de nuestro padre a zera (simiente)" — no dice "un hijo", sino zera: aquella simiente que viene de otro lugar. ¿Y cuál es? El Rey Mashíaj».`,
          `Las dos cosas son verdad, y no se contradicen. El Tania dice que esa chispa no puede volver a subir. El midrash dice que no vuelve: avanza. El tikún de la cueva no es vertical sino horizontal en el tiempo: la chispa no se eleva por teshuvá, viaja por generaciones — Moav, Rut, Oved, Yishai, David (Rut 4:17–22). Lo que no puede regresar, puede engendrar. Y por eso la Torá tuvo que abrir una puerta legal angosta para que esa luz entrara: «el hombre fue alejado y la mujer fue acercada» (Bereshit Rabá 51:9), que la Mishná formula como «moaví y no moavit» (Yevamot 76b).`,
          `Y un último detalle, de una ternura desconcertante. Bereshit Rabá 51:8 pregunta de dónde sacaron vino en la cueva, y Rabí Yehudá bar Simón responde: «נַעֲשָׂה לָהֶם מֵעֵין דּוּגְמָא שֶׁל עוֹלָם הַבָּא» — «se les hizo una muestra, un anticipo del Mundo Venidero», como está dicho: «y sucederá en aquel día que los montes destilarán vino dulce» (Yoel 4:18). En el fondo de la cueva, en la noche más degradada del libro, el midrash ve un goteo del Mundo Venidero. No como premio: como señal de dónde estaba realmente parada esa escena.`,
        ],
      },
    ],
    caja: {
      titulo: "Lo irreversible no se repara retrocediendo. Se repara engendrando.",
      cuerpo:
        "El Tania dice que esa chispa no vuelve a subir. El midrash dice que de esa cueva viene «la simiente que viene de otro lugar: el Rey Mashíaj». Las dos son verdad. La chispa no subió — caminó: Moav, Rut, Oved, Yishai, David. Y el Arizal dice que no se refinó hasta que Rut se convirtió: generaciones después, en una decisión que tomó otra persona.",
    },
  },

  // ── 4. הִתְבּוֹנְנוּת ────────────────────────────────────────────────────────
  hitbonenut: {
    intro:
      "Detente aquí. Ya no hay nada nuevo que aprender en este estudio; ahora hay algo que reconocer. Cinco preguntas, y ninguna es retórica.",
    parrafos: [
      {
        etiqueta: "¿Dónde tengo los ojos atrofiados?",
        texto: `No te falta luz: te falta girar la cabeza. La imagen de la luciérnaga era consoladora porque convertía el problema en circunstancia: no es que yo esté mal, es que me sacaron de mi ambiente. Las fuentes dicen algo más duro y más útil: «una criatura que no tiene ojos» (Moed Katán 6b); el topo (Rashi). El topo no vive en la oscuridad porque no haya sol. El sol está ahí, a tres dedos de tierra sobre su cabeza, todos los días de su vida. No lo ve porque no mira, y no mira porque el órgano se le atrofió por no usarlo. Pregúntate con precisión y sin culpa: no «¿dónde me falta luz?», que es la pregunta cómoda y siempre tiene respuesta externa, sino ¿sobre qué asunto de mi vida llevo años pasando por debajo sin levantar la vista? ¿Qué sé perfectamente y no miro porque mirar me obligaría?`,
      },
      {
        etiqueta: "¿Y si mi sombra es del tamaño de mi luz?",
        texto: `לוט = 45. El Nombre desdoblado con álefs, que es Abraham = 45. אדם = 45. La cáscara no es más chica que la fruta. Esto explica algo que casi todos vivimos y casi nadie se explica: las personas más luminosas tienen las sombras más grandes, y no por hipocresía — porque la cáscara se forma contra la luz y toma su medida. Si tu yetzer es desproporcionadamente fuerte en algún terreno, eso no es prueba de que estés podrido: es un dato sobre el tamaño de lo que tienes ahí guardado. Lot «siempre andaba junto» a Abraham, dice el Arizal, porque mamaba de él. Lo que te persigue, te persigue porque hay algo grande de qué mamar.`,
      },
      {
        etiqueta: "¿Qué tengo torcido que en realidad solo está desordenado?",
        texto: `נֹעַם (deleite) y עַמּוֹן (la nación de la cueva): las mismas cuatro letras, el mismo valor, 166 y 166. «La klipá se da vuelta, de Nóam a Amón», dice el Arizal. Mira tu peor rasgo. No el que te da vergüenza admitir — el otro, el que ya admitiste y diste por perdido. Y pregúntate si no serán las letras correctas en el orden equivocado. La ira que no sabes dónde poner, ¿es ira o es un celo por la justicia sin destinatario? La obstinación que te cuesta amigos, ¿es terquedad o es fidelidad apuntada hacia el objeto equivocado? La avidez, ¿es avidez o es un hambre de verdad que se conformó con menos? Si te faltara una letra, no habría nada que hacer. Pero no te falta ninguna: pesan igual. Y lo que está desordenado se reordena.`,
      },
      {
        etiqueta: "¿Y si Lot no es un malvado, sino yo un martes?",
        texto: `El Tania, leído con cuidado, nos quitó una comodidad: su benoní (cap. 12) nunca pecó en su vida, ni un momento. Casi ninguno de nosotros es eso. Lot —que hacía el bien a escondidas (BR 50:4), que no se asqueaba del polvo de la idolatría, que prestaba con usura (BR 51:6)— está en el capítulo 11: el que tiene bien y se le anula, y en el que después «el bien se reafirma y se llena de remordimiento y busca el perdón». Lo importante no es el rango: es lo que el Baal Shem Tov vio en la palabra jatzot — «la duda está en el punto medio, hacia aquí y hacia allá» — y es exactamente ahí, dice él, donde «Yo salgo en medio de Egipto, en medio de su estrechez, para iluminarle los ojos». El punto medio no es el lugar donde Dios no está. Es el lugar al que Dios sale.`,
      },
      {
        etiqueta: "¿Qué estoy cargando sin saberlo?",
        texto: `Esta es la piedra del estudio, y hay que sostenerla con las dos manos. El Tania (cap. 7) dice que hay una torcedura que no se endereza: la chispa que descendió a un cuerpo no vuelve a subir, ni con la teshuvá más grande. Cualquiera que haya vivido lo suficiente sabe que es verdad: hay cosas que no se deshacen, noches que no se devuelven, consecuencias que ya tienen cuerpo y nombre y caminan por ahí. Y el midrash (BR 51:8), sobre esa misma cueva, dice: «no está escrito "un hijo", sino "zera", simiente: aquella simiente que viene de otro lugar. ¿Y cuál es? El Rey Mashíaj». Las dos son verdad — eso es el filo doble. No «todo se arregla»; no «nada se arregla»; sino: la reparación de lo irreversible no es retroceder, es seguir. Esa chispa no subió de vuelta: caminó. Y el Arizal dice que no se refinó hasta que Rut se convirtió, generaciones después, en una decisión que tomó otra persona. Si hay algo en tu historia que no tiene vuelta atrás, el consuelo que te ofrece esta Torá no es que no haya pasado: es que la salida no está detrás. El Arizal dice que Lot salió de Abraham cargando dos almas santas sin saberlo. Tú no sabes qué estás cargando. Y no vas a verlo subir: va a caminar, y probablemente lo recoja alguien que todavía no nació.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה ──────────────────────────────────────────────────────────────
  maase: {
    intro:
      "Maasé (ma-a-SÉ) es «acción». El estudio que no baja a los pies no terminó. Tres cosas concretas, para hoy.",
    etiqueta: "Levanta la vista sobre un solo asunto, saca a la luz un bien que escondes, y siembra una cosa que no vas a ver crecer.",
    texto: `Primero, hoy mismo, dos minutos: el topo no es ciego por falta de sol. Elige UN tema de tu vida sobre el cual llevas tiempo pasando por debajo —una conversación que no tienes, una cuenta que no abres, un hábito que ya sabes qué es—. No lo resuelvas hoy. Solo mírale el nombre de frente y dilo en voz alta, a solas, una vez. El topo tiene ojos; lo que no tiene es la costumbre. Segundo, hoy: reordena una letra. La midá —la cualidad de carácter— que este estudio trabaja es exactamente la de Bereshit Rabá 50:4, donde Lot pedía que los ángeles entraran por el camino torcido para que no lo vieran siendo bueno. Identifica una bondad tuya que escondes por vergüenza o por qué dirán —generosidad, oración, cuidar a alguien, estudiar— y hoy hazla sin esconderla. No para presumir: para dejar de pedirle a tu bien que entre por la puerta de atrás. Y tercero, esta semana: siembra una sola cosa hacia adelante, sin verla crecer. Es el maasé propio de este estudio, el que sale de la cueva y de Rut. Elige algo irreversible de tu vida —un error con consecuencias, una pérdida, una puerta cerrada— y en lugar de intentar desandarlo, haz un acto que solo tenga sentido si lo recoge alguien después: escribe la carta que tu hijo leerá en diez años, enseña lo que aprendiste en el peor tramo, deja escrito el consejo que nadie te dio. El Arizal dice que las almas de la casa de David no se refinaron hasta Rut, generaciones después. No te toca verlo. Te toca cargarlo.`,
  },

  // ── 6. חֲתִימָה ──────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Bereshit Rabá 51:1 aplica a los sodomitas las imágenes de criaturas que nunca ven el sol —el caracol que se deshace al avanzar, el topo sin ojos, el feto arrojado de noche (Tehilim 58:9)— y pone a Lot del lado del sol (Bereshit 19:23). Pero Lot no es luz pura: es la mezcla. Y de su mezcla, por la cueva más oscura del libro, sale el Rey Mashíaj.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El Arizal (Sháar HaPesukim, Lej Lejá y Vayerá) enseña que Lot es la cáscara que mama del reverso de Zeir Anpin, y que por eso pesa 45, igual que el Nombre desdoblado con álefs e igual que אדם — porque la cáscara toma la medida exacta de la luz contra la que se forma. Y que cuando Lot se separó de Abraham se llevó dos almas santas caídas desde el pecado de Adam: Rut y Naamá — y en Rut estaba toda la casa de David hasta el Mashíaj. La luz no cayó en la cáscara por accidente: fue cargada hacia allá, y de allá hubo que sacarla.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `נֹעַם (deleite, Tehilim 90:17) y עַמּוֹן (Amón) son las mismas cuatro letras y el mismo valor, 166. La cáscara no es el Nombre con algo de menos: es el Nombre con las letras barajadas. Por eso pesa igual, y por eso se puede arreglar — porque lo que está desordenado se reordena, y a ti no te falta ninguna letra.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `El Tania (cap. 7) dice que la chispa que descendió a un cuerpo no vuelve a subir; el midrash (51:8) dice que de esa misma cueva viene «aquella simiente que viene de otro lugar: el Rey Mashíaj». Las dos son verdad, y juntas forman el filo: lo irreversible no se repara retrocediendo, se repara engendrando. Lo que no puede volver, camina —Moav, Rut, Oved, Yishai, David (Rut 4:17–22)— y lo recoge alguien que todavía no nació. Hoy: levanta la vista sobre un solo asunto, saca a la luz un bien que escondes, y siembra una cosa que no vas a ver crecer.`,
      },
    ],
  },

  // ── Nota de autor: el jidush y lo que no tiene fuente ──────────────────────
  jidush: {
    titulo: "Lectura propia — el jidush de Mardan, y dos cosas sin fuente",
    rotulo:
      "No es una cita ni una fuente clásica. El estudio quedó sellado arriba, en la חֲתִימָה. Lo que sigue es lectura propia, marcada como tal: lo primero sobrevivió a la verificación con un cambio de nivel, y los otros dos se ofrecen como sugerencia, no como enseñanza recibida.",
    parrafos: [
      `El estudio nació de una intuición: leer a Lot y a su familia con la clave de las klipot del Tania — Abraham el tzadik, Lot el medio mezclado, y los demás como grados de ocultamiento. Al verificarlo encontramos que el midrash aplica el versículo a Sodoma y no a esta familia, que no hay luciérnaga en ninguna parte, y que el benoní del Tania es un rango casi santo que no le calza a Lot. Pero el corazón de la intuición no solo se sostuvo: el Arizal lo había escrito antes y con más fuerza. Lo que cambia es el nivel de la comparación. No «Lot es un benoní», sino: Lot es la DINÁMICA de klipat nogá — la mezcla que un día es tragada por las cáscaras y otro día es elevada, según lo que se haga con ella. Leído así, el jidush dice algo que el mapa fijo no decía: que los personajes de esta historia no son categorías de personas, son estados por los que una misma persona pasa.`,
      `Segunda, y esta toca el nombre de este proyecto. El Tania (cap. 6) nombra las tres cáscaras completamente impuras con las tres primeras expresiones de la visión de Yejezkel: ruaj seará, anán gadol, esh mitlakájat. Y la CUARTA palabra de ese versículo —la que viene inmediatamente después de las tres— es הַחַשְׁמַל, el jashmal (Yejezkel 1:4). El Tania no lo dice así; la conexión es nuestra. Pero las palabras son las mismas y el orden del versículo es el orden del versículo: las tres cáscaras son, literalmente, lo que hay que atravesar para llegar al jashmal.`,
      `Tercera, y aquí hay que ser más prudente todavía, porque no encontré ningún comentarista clásico que lo diga. El nombre לוֹט se escribe exactamente igual —las mismas consonantes— que la palabra הַלּוֹט de Yeshayahu 25:7: «וּבִלַּע בָּהָר הַזֶּה פְּנֵי־הַלּוֹט הַלּוֹט עַל־כָּל־הָעַמִּים», «y en este monte tragará el velo que envuelve a todos los pueblos». La raíz לוט significa envolver, cubrir (en Shmuel I 21:10 la espada de Goliat está lutá ba-simlá, «envuelta en un paño» — y es David quien la toma). Y el versículo siguiente, Yeshayahu 25:8, «tragará la muerte para siempre», es el versículo exacto que el Tania cap. 7 cita como el momento en que las tres cáscaras finalmente se liberan. De modo que: Lot es el envoltorio; el envoltorio es lo que será tragado; y al tragarlo, se traga la muerte. Está verificado que las letras son idénticas, que la raíz significa envolver y que el Tania cita 25:8. La conexión entre las tres cosas es lectura nuestra, y la ofrezco así.`,
    ],
  },

  // ── Umbral הֶמְשֵׁךְ ─────────────────────────────────────────────────────────
  hemshej: [
    `Las dos hijas de esta cueva no tienen nombre en la Torá, y de ellas sale la corona: {{study:lot|Lot y las dos hijas sin nombre}}.`,
    `Si Rut es el relleno escondido del Nombre de Maljut, ¿qué significa que una conversa extranjera sea lo que llena el Nombre por dentro? {{study:linaje|El linaje prohibido del Mashíaj}}.`,
    `El Arizal dice que Lot se separó de Abraham porque entraron los mojín de gadlut. ¿Qué se nos despega cada vez que la consciencia crece? {{study:el-ari|El Ari}} · {{study:shaar-hagilgulim|Sháar HaGilgulim}}.`,
    `La luz que queda atrapada abajo y hay que ir a buscar: {{study:chispas-en-las-naciones|las chispas en las naciones}}. Y la letra que abre el nombre de Lot y el del velo: {{letter:lamed|la lamed}}.`,
  ],

  ctaRef: "Psalms 58:9",
};
