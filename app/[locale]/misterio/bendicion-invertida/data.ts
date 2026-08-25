
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — Ki Tavó / La bendición que se invierte · שִׂמְחָה
//  Serie «Parashá». Contenido verificado por el Sofer:
//  scratchpad/estudio-ki-tavo-simja.md
//
//  GUARDARRAÍLES OBLIGATORIOS (cabecera de verificación del Sofer). Si alguien
//  edita esta página, tiene que seguir respetándolos:
//   1. El dicho del Arizal sobre la alegría es CITA TRANSMITIDA: la fuente
//      primaria (Jaim Vital) NO fue localizada en Sefaria. Se cita SIEMPRE
//      "Mishná Berurá 669:11" como testimonio transmitido por el Jafetz Jaim,
//      NUNCA como cita directa de Sháar HaKavanot ni de Jaim Vital.
//   2. La historia del Alter Rebe leyendo la Tojajá es TRADICIÓN ORAL jasídica
//      registrada en colecciones de Jabad del siglo XX (Likutei Diburim). Se
//      cuenta como relato, marcado como tal — NUNCA como fuente documentada
//      de época.
//   3. Ramban NO tiene comentario a Devarim 28:47 (Sefaria: "no text").
//      No citarlo ahí.
//   4. Gematrías permitidas SOLO (calculadas y verificadas por el Sofer):
//      שמחה = 353 = חמשה (anagrama exacto, mismas cuatro letras) ·
//      בשמחה = 355 = שנה (remez homilético, sin fuente primaria clásica
//      localizada — se da como remez, no como cita) · 49 → 98 (Kli Yakar a
//      Devarim 28:15; Rashi a Bamidbar 29:18). La gematría 358 está EXCLUIDA
//      por directriz de la casa.
//   5. El puente a las Cinco Luces (353 = jamishá → cinco luces) es lectura
//      de Jashmal: la aritmética es verificada, la unión conceptual es
//      nuestra y va rotulada así.
//   6. El bloque "PARA REDES" del markdown del Sofer NO va en esta página.
//   7. Fuente del número 98: Rashi a Bamidbar 29:18 ("las 98 maldiciones de
//      Mishné Torá") y Kli Yakar a Devarim 28:15 (49 × 2, portones de Biná,
//      citando Nedarim 38a). No inventar otras fuentes para el conteo.
//
//  Hero (modo "numero"): שמחה = 353 = חמשה — la gematría-ancla verificada.
//
//  IDIOMA: el análisis está en español. Los campos *Fa replican el español a
//  propósito (fallback), porque el Sofer aún no tradujo este estudio al farsi
//  y este departamento no genera farsi por su cuenta. Cuando llegue la
//  traducción verificada, se reemplazan aquí y en lib/content/misterios.ts.
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "bendicion-invertida",
  hero: {
    serielabel: "Serie «Parashá» · Ki Tavó — Devarim 28:47",
    serielabelFa: "Serie «Parashá» · Ki Tavó — Devarim 28:47",
    he: "שִׂמְחָה",
    titulo: "La bendición que se invierte",
    tituloFa: "La bendición que se invierte",
    ganchoEs:
      "Las 98 maldiciones de la Tojajá no caen sobre quien dejó de servir: caen sobre quien siguió sirviendo — sin alegría. Y el versículo dice dónde nacen: מֵרֹב כֹּל, «por la abundancia de todo» (Devarim 28:47). La maldición no es un castigo que reemplaza a la bendición: es la misma abundancia, invertida por la vasija que la recibe.",
    ganchoFa:
      "Las 98 maldiciones de la Tojajá no caen sobre quien dejó de servir: caen sobre quien siguió sirviendo — sin alegría. Y el versículo dice dónde nacen: מֵרֹב כֹּל, «por la abundancia de todo» (Devarim 28:47). La maldición no es un castigo que reemplaza a la bendición: es la misma abundancia, invertida por la vasija que la recibe.",
    numero: { valor: "353", rom: "Simjá = Jamishá (anagrama)" },
    fecha: "Shabat · 16 Elul 5786 · 29 ago 2026",
    // Estudio de la serie «Parashá»: el "volver" apunta al índice de misterios,
    // no a la puerta de la serie del Mashíaj (default de la plantilla).
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── 1. תַּרְגּוּם ────────────────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "Versículo-ancla — Devarim (Deuteronomio) 28:47, la parashá Ki Tavó",
        he: "תַּ֗חַת אֲשֶׁ֤ר לֹא־עָבַ֙דְתָּ֙ אֶת־יְהוָ֣ה אֱלֹהֶ֔יךָ בְּשִׂמְחָ֖ה וּבְט֣וּב לֵבָ֑ב מֵרֹ֖ב כֹּֽל׃",
        es: "Por cuanto no serviste a Hashem tu Dios con alegría y con bondad de corazón, por la abundancia de todo.",
        source: "Devarim 28:47",
      },
      {
        label: "El espejo exacto — Devarim 28:48",
        he: "וְעָבַדְתָּ֣ אֶת־אֹיְבֶ֗יךָ... בְּרָעָ֧ב וּבְצָמָ֛א וּבְעֵירֹ֖ם וּבְחֹ֣סֶר כֹּ֑ל...",
        es: "Servirás a tus enemigos… con hambre, con sed, con desnudez y con carencia de todo…",
        source: "Devarim 28:48",
      },
    ],
    parrafos: [
      `Lee despacio. El versículo no dice «porque no serviste». Dice: serviste — pero sin alegría. Y no dice que la tristeza vino de la escasez: dice מֵרֹב כֹּל, «por la abundancia de todo». La maldición nace dentro de la abundancia. El versículo 48 es el espejo exacto: de «abundancia de todo» (רֹב כֹּל) a «carencia de todo» (חֹסֶר כֹּל). No aparece un mundo nuevo: el mismo mundo, volteado.`,
      `Y este versículo no está al comienzo de la Tojajá (la sección de advertencias, 28:15–68): está en su centro, como bisagra. Todo lo anterior desemboca aquí; todo lo que sigue sale de aquí. La Torá misma señala el diagnóstico: no el abandono — la desgana.`,
      `Glosa — Tojajá (תּוֹכָחָה): «admonición». Así se llama la larga sección de maldiciones condicionales de Devarim 28, que la tradición cuenta como 98 (fuente abajo, en los Mefarshim).`,
    ],
  },

  // ── 2. מְפָרְשִׁים ───────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י), a Devarim 28:47 — el diagnóstico en cuatro palabras.",
        texto: `מֵרֹב כֹּל — «mientras aún tenías todo bien» (בְּעוֹד שֶׁהָיָה לְךָ כָּל טוּב). Cuatro palabras, y el diagnóstico entero: el reproche no es que faltó servicio en la pobreza, sino que sobró tibieza en la riqueza. Tenías todo — y serviste como quien paga una deuda.`,
      },
      {
        etiqueta: "Ibn Ezra, a Devarim 28:47 — el alcance de la abundancia.",
        texto: `מֵרֹב כֹּל — «todo lo que desees, o toda necesidad». El gramático de Toledo precisa el alcance de כֹּל: no era abundancia parcial. Nada faltaba. La tristeza no tenía excusa material — era una elección de la vasija, no un dato del mundo.`,
      },
      {
        etiqueta: "Or HaJaim, a Devarim 28:47 — el castigo como espejo.",
        texto: `El castigo mide exactamente la falta: «tú te quitaste de encima el yugo de la mitzvá — tu enemigo pondrá yugo de hierro sobre tu cuello». Y define la falta con precisión quirúrgica: no dejaste de hacer las mitzvot; dejaste de hacerlas con alegría (לַעֲשׂוֹת... בְּשִׂמְחָה). El Or HaJaim lee toda esta sección como correspondencia: cada maldición es la forma invertida de un servicio que se hizo a desgana. Nada llega de afuera; todo es espejo.`,
      },
      {
        etiqueta: "Kli Yakar, a Devarim 28:15 — el secreto del número 98.",
        texto: `Las maldiciones de Bejukotai (Vayikrá 26) son 49; las de aquí son 98 — el doble exacto. ¿Por qué? Cincuenta portones de Biná (entendimiento) fueron creados en el mundo, y todos menos uno fueron entregados a Moshé (Nedarim 38a). Ante quien tiene 49 portones de entendimiento abiertos y no entra por ninguno, la medida es 49. Y aquí, tras la garantía mutua (arvut) sellada en el monte Guerizim y el monte Eival — cada uno carga su falta y la de su compañero: 49 × 2 = 98. El número de las maldiciones es el número de los portones desperdiciados. La maldición es, literalmente, entendimiento no usado.`,
      },
      {
        etiqueta: "Rashi, a Bamidbar 29:18 — la fuente del 98.",
        texto: `Los corderos de Sucot son 98, «para agotar de Israel las 98 maldiciones de Mishné Torá». Rashi da por contado el número — y nota dónde lo dice: en Sucot, זְמַן שִׂמְחָתֵנוּ, «el tiempo de nuestra alegría». Lo que anula las 98 maldiciones nacidas de la falta de alegría se ofrece precisamente en la fiesta de la alegría. La Torá cierra el círculo sola.`,
      },
      {
        etiqueta: "El Arizal — el testimonio de la alegría (cita transmitida).",
        texto: `El Jafetz Jaim registra (Mishná Berurá 669:11, sobre bailar en Simjat Torá): «atestiguaron sobre el Arí z"l que dijo que el nivel superior que alcanzó le vino por alegrarse con toda su fuerza en la alegría de la mitzvá». El hombre que abrió los mundos superiores — Partzufim, reencarnaciones, kavanot — declaró que su llave no fue un secreto: fue la alegría. En la arquitectura luriánica esto es exacto: la mitzvá hecha con alegría eleva las chispas (nitzotzot) que la mitzvá a desgana deja donde estaban. El acto es el mismo; la alegría es lo que sube. (Nota de verificación: es cita transmitida — la atestación primaria de Jaim Vital no fue localizada; citamos al Jafetz Jaim, que la trae como testimonio.)`,
      },
      {
        etiqueta: "Nota — el silencio del Ramban.",
        texto: `Ramban no comenta 28:47 — su silencio también enseña: el versículo casi no necesita comentario.`,
      },
    ],
    glosa: `Glosa para el lector: simjá (שִׂמְחָה) = alegría. Tojajá = la sección de admonición de Devarim 28:15–68, contada por la tradición como 98 maldiciones. Biná = «entendimiento», la tercera sefirá; sus cincuenta portones aparecen en Nedarim 38a. arvut = la garantía mutua entre los miembros de Israel, sellada en Guerizim y Eival. bikurim = los primeros frutos que el agricultor sube al Templo con una declaración (Devarim 26:1–11). hashkafá = «mirada desde lo alto». Mishná Berurá = el comentario del Jafetz Jaim (Rabí Israel Meir Kagan, 1838–1933) al Shulján Aruj. Arizal = Rabí Itzjak Luria (1534–1572). Alter Rebe = Rabí Shneur Zalman de Liadí (1745–1812), fundador de Jabad. Baal HaSulam = Rabí Yehudá Ashlag (1885–1954), autor del comentario Sulam al Zohar.`,
  },

  // ── 3. פרד״ס ─────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `En su sentido llano, 28:47–48 es la cláusula causal de la Tojajá: el «por cuanto» que explica todo lo anterior. La estructura es de inversión término a término: serviste a Dios sin alegría → servirás a tus enemigos; en la abundancia de todo → en la carencia de todo. El pshat ya contiene la tesis: no hay dos sustancias, bendición y maldición; hay una sustancia — el servicio, la abundancia — en dos estados. Y el pshat es duro: este es el filo oscuro del versículo, y no hay que suavizarlo antes de tiempo. Primero hay que oírlo como suena.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión), con la gematría",
        parrafos: [
          `שִׂמְחָה = 353 = חֲמִשָּׁה. «Alegría» y «cinco» se escriben con las mismas cuatro letras (שמחה / חמשה): anagrama exacto, gematría idéntica, calculada y verificada. La alegría es un «cinco» reordenado — el mismo material, otra configuración. Quien estudió las {{study:cinco-luces-mashiaj|cinco luces del primer día}} reconocerá el patrón: la luz una que se despliega en cinco. La alegría no es una emoción añadida al servicio: es el servicio con sus letras bien ordenadas. (La aritmética es verificada; la lectura que la une a las cinco luces es de Jashmal.)`,
          `בְּשִׂמְחָה = 355 = שָׁנָה (año). «Con alegría» suma lo mismo que «año»: un año entero cabe dentro de «con alegría» — o no cabe. (Aritmética verificada; el remez homilético circula en la literatura jasídica sin fuente primaria clásica localizada — lo damos como remez, no como cita.)`,
          `49 → 98 (Kli Yakar): el doble no es retórica: es la aritmética de la garantía mutua. Y su reverso luminoso: si la maldición se duplica por cargar la falta del compañero, la alegría compartida también se duplica — וְשָׂמַחְתָּ... אַתָּה וְהַלֵּוִי וְהַגֵּר (Devarim 26:11): el mandato de alegría incluye al levita y al extranjero.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `Moed Katán 9a–9b — las maldiciones que eran bendiciones. Rabí Shimon bar Yojai envía a su hijo a dos sabios para que lo bendigan. Ellos le dicen: «que siembres y no coseches, que metas y no saques, que saques y no metas, que tu casa quede destruida y tu posada habitada, que tu mesa se confunda, y que no veas año nuevo». El hijo vuelve deshecho: «no solo no me bendijeron — me hirieron». Y el padre descifra, una por una: que siembres y no coseches — que engendres hijos y no los entierres; que tu mesa se confunda — de hijos y nietos; que no veas año nuevo — que tu esposa no muera y no debas casarte de nuevo (Devarim 24:5). Las palabras eran las mismas. Lo que cambió no fue el texto — fue el receptor. El hijo oyó maldiciones; el padre, que sabía leer, oyó bendiciones. La Guemará está enseñando exactamente lo que la Tojajá cifra: bendición y maldición no son dos mensajes, son dos lecturas.`,
          `De aquí la tradición jasídica cuenta que el Alter Rebe (Rabí Shneur Zalman de Liadí) leía la Tojajá de tal modo que un niño que la oyó dijo: «cuando papá lee, no se oyen maldiciones — se oyen bendiciones». (Relato jasídico transmitido oralmente y registrado en colecciones de Jabad del siglo XX; lo contamos como relato, no como fuente.)`,
          `Shabat 30b: «La Shejiná no reposa desde la tristeza, ni desde la pereza, ni desde la risa liviana… sino desde la palabra de alegría de mitzvá». La tristeza no es neutra: es el clima en que la Presencia no puede posarse. El Baal Shem Tov hizo de esta línea talmúdica un camino entero: «que se aleje de la tristeza, y su corazón se alegre en Dios» (Tzavaat HaRivash 15). En su lectura, la tristeza en el servicio no es humildad — es el ego disfrazado de piedad: el yo que se mira a sí mismo en lugar de mirar el regalo.`,
          `Y el antídoto ya está en la parashá — bikurim. Antes de la Tojajá, la Torá prescribe la medicina: el agricultor sube con sus primeros frutos y declara en primera persona la historia entera — אֲרַמִּי אֹבֵד אָבִי, «mi padre fue un arameo errante» (Devarim 26:5, la declaración que la Hagadá de Pésaj expone cada año) — hasta llegar a: «he aquí que traje las primicias del fruto de la tierra que Tú me diste» (26:10). Todo el rito es una sola operación: convertir «lo mío» en «lo dado». Y en el versículo siguiente, el mandato explícito que es el espejo exacto de 28:47: וְשָׂמַחְתָּ בְכָל־הַטּוֹב — «y te alegrarás en todo el bien que Hashem tu Dios te dio» (26:11). La alegría no se ordena como emoción forzada: brota sola cuando la abundancia se reconoce como regalo. El ego dice «mi fuerza»; la declaración dice «que Tú me diste»; y de esa frase nace la simjá.`,
          `Hashkifá (26:15): tras dar los diezmos al pobre, el agricultor dice: הַשְׁקִיפָה מִמְּעוֹן קָדְשְׁךָ — «observa desde Tu santa morada y bendice». Rashi (a Bereshit 18:16) enseña: toda hashkafá (mirada desde lo alto) en la Escritura es para mal — excepto esta, «porque grande es el poder de los regalos a los pobres, que voltea la medida del enojo en misericordia». La palabra más severa de la Torá, volteada por dar. Es el mismo mecanismo de inversión que la Tojajá — pero en dirección contraria: si la abundancia guardada para sí voltea bendición en maldición, la abundancia compartida voltea juicio en misericordia.`,
          `Hayom hazé (27:9): «Este día has llegado a ser pueblo». Rashi: «cada día sean a tus ojos como si hoy entraras al pacto» (Berajot 63b). La carga es la percepción de lo repetido; la alegría, la percepción de lo nuevo. El mismo pacto, cada día: deuda vieja o regalo recién dado — según los ojos.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto)",
        parrafos: [
          `Baal HaSulam (Hakdamá al Sefer HaZohar §10–11) da la raíz de todo el mecanismo. La vasija de las almas es el deseo de recibir (ratzón lekabel) — así fueron creadas, para recibir toda la plenitud del Pensamiento de la Creación. Pero el deseo de recibir para sí (לְקַבֵּל לְעַצְמוֹ) es, por diferencia de forma, separación del Dador — «y no hay oposición mayor que esta»: Él es puro otorgar; la vasija cerrada en sí es puro tomar. Por eso, enseña, los sistemas de santidad e impureza son paralelos — זֶה לְעֻמַּת זֶה, «uno frente al otro hizo Dios» (Kohelet 7:14): no dos luces distintas, sino la misma abundancia en dos vasijas. Y por eso las klipot se llaman «muertos», y «los malvados en vida se llaman muertos» (Berajot 18b): reciben la misma vitalidad que todo lo creado — pero recibida para sí, la vida misma se experimenta como muerte. Y la salida (§11): ocuparse de las mitzvot para dar satisfacción al Creador — con eso «purifica poco a poco su deseo de recibir para sí y lo voltea (מְהַפְּכוֹ) en recibir para otorgar», hasta la equivalencia de forma con su Hacedor.`,
          `Aquí la Tojajá se abre entera. מֵרֹב כֹּל: la abundancia era luz real, de la buena. Recibida como regalo — con alegría, con la declaración de bikurim en los labios — mantiene a la vasija pegada al Dador, y es bendición. Recibida para sí — como logro propio, como derecho, como carga administrada — la misma luz separa, y separada de su Fuente se experimenta como su opuesto: רֹב כֹּל se vuelve חֹסֶר כֹּל sin que nada cambie afuera. Las 98 maldiciones no son un envío nuevo: son la lectura que hace la vasija invertida de la misma abundancia. Moed Katán 9b lo dijo en arameo de mercado: las palabras eran bendiciones; el oído las recibió como maldiciones. Y la tristeza en el servicio, a esta luz, no es un pecado añadido: es el síntoma de que la vasija ya se cerró — el sabor que tiene la luz cuando se recibe sin Dador. Por eso el Arizal alcanzó lo que alcanzó por la alegría: la simjá no era el premio de su ascenso, era el instrumento — la vasija abierta en la que la luz puede quedarse siendo luz.`,
        ],
      },
    ],
    caja: {
      titulo: "Una luz, dos vasijas.",
      cuerpo:
        "La maldición no reemplaza a la bendición: es la misma abundancia, invertida por la vasija que la recibe. Recibida como regalo — «esto Tú me lo diste» (Devarim 26:10) — la luz une con el Dador y es bendición; recibida para sí, la misma luz separa, y רֹב כֹּל se vuelve חֹסֶר כֹּל sin que nada cambie afuera (Baal HaSulam, Hakdamá al Zohar §10–11).",
    },
  },

  // ── 4. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        texto: `Quédate con el versículo en la mano: «por cuanto no serviste con alegría… por la abundancia de todo».`,
      },
      {
        etiqueta: "¿Qué me enseña de mí?",
        texto: `Que mi peligro no está donde lo vigilo. Vigilo la carencia, la crisis, la falta — y el versículo señala la abundancia: el lugar donde todo va bien y algo, sin embargo, se va agriando en silencio. Puedo revisar mi día: las cosas que hago y son buenas — el trabajo, la casa, el estudio, hasta la oración — ¿las hago como quien recibe o como quien carga? ¿Cuándo fue la última vez que algo mío me alegró como regalo y no me pesó como inventario?`,
      },
      {
        etiqueta: "¿Qué patrón veo?",
        texto: `El mismo en todas las escalas: una luz, dos vasijas. La lluvia que bendice el campo y pudre el grano almacenado de más. La mesa llena que une a una familia o la envenena de comparaciones. El talento que sirve o que exige ser servido. Nunca es la abundancia la que decide; siempre es la dirección de la vasija.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `La tristeza que a veces se viste de seriedad espiritual — «sirvo, pero pesa» — no es humildad: es la primera noticia de que empecé a recibir para mí. Y la alegría no es un temperamento que otros tienen: es lo que siente la vasija cuando recuerda de dónde viene lo que hay en ella.`,
      },
      {
        etiqueta: "¿Y con la creación?",
        texto: `El mundo entero está recibido. Cada cosa existente recibe su vitalidad ahora mismo. La creación entera es מֵרֹב כֹּל — abundancia sobre abundancia — esperando en cada punto la pequeña declaración que la mantiene siendo bendición: esto me fue dado.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה ───────────────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Hoy, la declaración de bikurim en miniatura.",
    texto: `Elige UNA cosa buena que ya tienes — tan cotidiana que ya no la ves: la salud de un hijo, el pan de la mesa, el trabajo que tienes. Y hazle su מקרא ביכורים: dilo en voz alta, en primera persona, con las dos partes del versículo 26:10 — de dónde vino («no estaba garantizado; hubo un camino») y de Quién es («esto Tú me lo diste»). Treinta segundos. La midá a trabajar esta semana es הַכָּרַת הַטּוֹב, hakarat hatov — reconocer el bien recibido — que es el nombre práctico de la simjá: no fabricar emoción, sino quitarle a una bendición concreta el disfraz de «mío por derecho». Y si quieres el grado completo del versículo: compártela — que tu abundancia pase por la mano de alguien más (26:11–12: el levita, el extranjero, el huérfano), porque lo dado que se vuelve a dar ya no puede agriarse. Una bendición al día, nombrada y compartida: ese es el servicio בְּשִׂמְחָה al alcance de hoy.`,
  },

  // ── 6. חֲתִימָה ───────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Las 98 maldiciones de la Tojajá no castigan la ausencia de servicio sino su desgana: «por cuanto no serviste con alegría… por la abundancia de todo» (Devarim 28:47). La maldición no reemplaza a la bendición — es la misma abundancia invertida por la vasija que la recibe.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Bendición y maldición no son dos sustancias sino dos lecturas de una sola luz: las mismas palabras que el hijo de Rabí Shimon oyó como maldiciones eran bendiciones (Moed Katán 9b); la misma mirada divina que en toda la Escritura es juicio, volteada por los regalos a los pobres, es misericordia (Rashi, a Bereshit 18:16).`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `La raíz está en la vasija (Baal HaSulam, Hakdamá al Zohar §10–11): la abundancia recibida como regalo une con el Dador y es bendición; recibida para sí — ego, derecho, carga — la misma luz separa, y separada se experimenta como su opuesto. La tristeza en el servicio no es humildad: es el síntoma de la vasija que se cerró. Por eso el Arizal atribuyó todo su alcance a la alegría de la mitzvá (testimonio transmitido en Mishná Berurá 669:11).`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `La medicina está una página antes que la enfermedad: la declaración de bikurim — «esto Tú me lo diste» (26:10) — seguida del mandato «y te alegrarás en todo el bien» (26:11). Nombrar una bendición concreta como recibida, cada día, y compartirla: así la abundancia se queda siendo bendición.`,
      },
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  hemshej: [
    "{{study:cinco-luces-mashiaj|שִׂמְחָה y חֲמִשָּׁה son la misma palabra reordenada (353). ¿Qué son las cinco luces del primer día — y por qué la alegría las tiene por letras?}}",
    "{{study:eikev-talon|La Tojajá castiga lo pisoteado por el talón: lo pequeño hecho sin alegría. ¿Qué esconde el talón de Eikev?}}",
    "{{study:buey-y-burro|Dos fuerzas dentro de una misma serpiente: la lógica de los dos filos que aquí volteó la abundancia. ¿Cómo funciona en Ki Tetzé?}}",
    "{{letter:tet|La ט guarda el טוֹב adentro, como vasija cerrada sobre su luz. ¿Bondad escondida o bien retenido? La letra decide.}}",
  ],
  ctaRef: "Deuteronomy 28:47",
};
