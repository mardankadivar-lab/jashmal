
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — El Arca que no ocupaba lugar · מְקוֹם אָרוֹן אֵינוֹ מִן הַמִּדָּה
//  Serie «Gematría». Contenido verificado por el Sofer.
//
//  Notas de montaje (respetadas al pie de la letra):
//   · El comentario base de este tramo de Bavá Batrá es del RASHBAM, no de Rashi.
//   · El milagro del Arca es TALMÚDICO (Bavá Batrá 99a; Meguilá 10b), no del Zohar.
//   · Se muestran las sumas de las gematrías letra por letra (דְּבִיר / גְּבוּרָה = 216).
//  Hero (modo "par"): דְּבִיר = 216 = גְּבוּרָה.
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "arca-no-ocupa-lugar",
  hero: {
    serielabel: "Serie «Gematría» · El lugar que no entra en la medida",
    serielabelFa: "سری «گیماتریا» · مکانی که در اندازه نمی‌گنجد",
    he: "אָרוֹן",
    titulo: "El Arca que no ocupaba lugar",
    tituloFa: "تابوتِ عهد که مکان نمی‌گرفت",
    ganchoEs:
      "El Talmud lo dice sin rodeos: el Arca estaba plenamente presente en el Lugar Santísimo… y no ocupaba lugar medible. 10 + 2,5 + 10 = 22,5 codos en un cuarto de 20 — la cuenta no cierra a propósito. Y el mismo debir (דְּבִיר = 216) es Guevurá (גְּבוּרָה = 216): el lugar de máxima contracción es donde la Luz infinita mora sin medida.",
    ganchoFa:
      "تلمود بی‌پرده می‌گوید: تابوت به‌تمامی در قدس‌الاقداس حاضر بود… و مکانی اندازه‌پذیر اشغال نمی‌کرد. ۱۰ + ۲٫۵ + ۱۰ = ۲۲٫۵ ذراع در اتاقی بیست‌ذراعی — حساب، به‌عمد جور درنمی‌آید. و همان دِویر (דְּבִיר = ۲۱۶) همان گِوورا (גְּבוּרָה = ۲۱۶) است: جای بیشترین تنگنا، همان‌جاست که نورِ بی‌کران بی‌اندازه ساکن می‌شود.",
    par: {
      a: { he: "דְּבִיר", rom: "Debir · 216" },
      b: { he: "גְּבוּרָה", rom: "Guevurá · 216" },
      valor: "216",
    },
    // Estudio de la serie «Gematría»: el "volver" apunta al índice de misterios,
    // no a la puerta de la serie del Mashíaj (default de la plantilla).
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },
  // ── 1. תַּרְגּוּם ────────────────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "Texto base — Talmud Bavlí, Bavá Batrá 99a",
        he: "מְקוֹם אָרוֹן וּכְרוּבִים אֵינוֹ מִן הַמִּדָּה. תַּנְיָא נַמֵּי הָכִי: אָרוֹן שֶׁעָשָׂה מֹשֶׁה, יֵשׁ לוֹ רֶוַח עֶשֶׂר אַמּוֹת לְכׇל רוּחַ וְרוּחַ.",
        es: "El lugar del Arca y de los querubines no entra en la medida. Así se enseñó también en una baraíta: el Arca que hizo Moisés tenía diez codos de espacio libre hacia cada una de las direcciones.",
        source: "Talmud Bavlí, Bavá Batrá 99a",
      },
      {
        label: "Paralelo — Talmud Bavlí, Meguilá 10b",
        he: "מְקוֹם אָרוֹן אֵינוֹ מִן הַמִּדָּה … בְּנֵס הָיוּ עוֹמְדִין.",
        es: "El lugar del Arca no entra en la medida… estaban de pie por milagro.",
        source: "Talmud Bavlí, Meguilá 10b",
      },
    ],
    parrafos: [
      `El dato que hay que ver con los ojos. Las cifras están verificadas: el Kodesh HaKodashim —el debir, el Lugar Santísimo— medía 20 codos de ancho (1 Reyes 6:20; 2 Crónicas 3:8). El Arca medía 2,5 codos de largo (Éxodo 25:10). Y desde el Arca hasta cada pared había 10 codos.`,
      `Ahora sume: 10 + 2,5 + 10 = 22,5 codos. Pero la pared solo mide 20. Sobran exactamente 2,5 — el ancho del Arca. El Arca estaba ahí, plenamente presente, y aun así no ocupaba lugar medible. El milagro no es que cupiera, sino que no hiciera falta que cupiera.`,
    ],
  },
  // ── 2. מְפָרְשִׁים ───────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashbam y Rabbeinu Gershom (רַשְׁבָּ\"ם), sobre Bavá Batrá 99a.",
        texto: `Un detalle que hay que decir con precisión: en este tramo de Bavá Batrá el comentario base NO es de Rashi —cuyo comentario aquí ya terminó— sino de su nieto, el Rashbam. Su lectura no suaviza la paradoja: los diez codos a cada lado eran reales; por lo tanto בְּנֵס הָיָה עוֹמֵד, «[el Arca] estaba de pie por milagro». La imposibilidad geométrica no es un error de cuentas: es el contenido mismo de la enseñanza. Rabbeinu Gershom lo remata: desde los querubines hacia abajo «no ocupaba nada» — la Presencia estaba, pero no «usaba» espacio.`,
      },
      {
        etiqueta: "Rambán / Najmánides (רַמְבַּ\"ן), introducción a Terumá.",
        texto: `En su introducción a la parashá de Terumá (Éxodo 25), el Rambán enseña que el Mishkán es la continuación permanente del Sinaí: la Gloria que se posó sobre el monte ahora «habita» (שָׁכַן) entre los querubines. El Arca no es el recipiente, es el trono. Y donde la Presencia se posa, la lógica del «cabe / no cabe» deja simplemente de aplicar: no se mide el lugar de un trono divino como se mide un mueble.`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `Aquí la contradicción del Arca se revela como la misma pregunta de la creación: ¿cómo coexiste lo Infinito con lo finito sin aplastarlo? El Arizal (Etz Jaim, Sha'ar HaHakdamot, Drush Igulim v'Yosher) enseña que «antes» de la creación la Luz Infinita (אוֹר אֵין סוֹף) lo llenaba todo. Para que existiera un mundo se produjo el צִמְצוּם (Tzimtzum): una contracción de la Luz desde un punto central, que dejó un חָלָל / מָקוֹם פָּנוּי (un vacío). En ese hueco entró un קַו (rayo) del cual se despliegan los mundos. Dios «hace lugar» retirándose. Y aquí está el contraste exacto con el Arca: en el Tzimtzum la Luz se retira para hacer lugar; en el Arca la Presencia no se retira y aun así no ocupa lugar. Son dos caras de una sola verdad: lo Infinito no desplaza nada, porque no es «una cosa más» dentro del espacio. Por eso el Midrash llama a Dios הַמָּקוֹם, «el Lugar»: «Él es el lugar del mundo, y el mundo no es Su lugar» (Bereshit Rabá 68:9).`,
      },
    ],
    glosa: `Glosa para el lector: debir (דְּבִיר) = el Lugar Santísimo, la cámara interior del Templo. Kodesh HaKodashim = «Santo de los Santos». codo (amá) = medida antigua, ~48 cm. Or Ein Sof (אוֹר אֵין סוֹף) = la Luz Infinita. Tzimtzum (צִמְצוּם) = contracción/retiro de la Luz para hacer lugar al mundo. jalal / makom panui = el «vacío» que deja el Tzimtzum. kav (קַו) = el rayo de luz que entra en ese vacío. HaMakom (הַמָּקוֹם) = «el Lugar», uno de los Nombres de Dios. Guevurá = la sefirá del rigor y de la contracción.`,
  },
  // ── 3. פרד״ס ─────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `Las medidas no cuadran, y la Torá-Oral no lo esconde: lo declara milagro abiertamente. Veinte codos de pared; el Arca de 2,5 codos con diez codos libres a cada lado. La cuenta da 22,5 en un espacio de 20. El Templo tenía inscrita en su propia arquitectura una imposibilidad geométrica deliberada — no un descuido del constructor, sino una señal.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión), con la gematría",
        parrafos: [
          `La cámara se llama דְּבִיר (debir). Sume sus letras: ד4 + ב2 + י10 + ר200 = 216. Y ese mismo 216 es el valor de גְּבוּרָה (Guevurá, la contracción, el rigor): ג3 + ב2 + ו6 + ר200 + ה5 = 216. Y 216 son también las letras del Nombre de setenta y dos (Shem AB). La alusión es exacta: el lugar de máxima contracción (Guevurá) es precisamente donde la Luz infinita mora sin medida. La contracción no expulsa la Luz; la contiene.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `El Arca tiene un hermano gemelo entre los diez milagros del Templo (Yomá 21a): עוֹמְדִים צְפוּפִים וּמִשְׁתַּחֲוִים רְווֹחִים — «[el pueblo] estaba apretado de pie, pero al postrarse tenía holgura». En el patio no cabía un alma más… y sin embargo, al inclinarse todos juntos ante Dios, sobraba sitio para cada uno. En espíritu del Baal Shem Tov: lo sagrado no se rige por la aritmética de la escasez. En lo material, si tú tienes más, a mí me toca menos; en lo espiritual cabe todo sin que a nadie le falte. El amor, la Presencia, la bendición no se reparten como un pan que se acaba.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El Zohar lo dice en su fórmula más célebre (Tikunei Zohar, Tikún 57, 91b; Tikún 70, 122b): לֵית אֲתַר פָּנוּי מִנֵּיהּ — «no hay lugar vacío de Él». Pero entonces, ¿qué fue el Tzimtzum, si la Luz se retiró para hacer lugar? Baal HaSulam (Rav Yehuda Ashlag) resuelve la contradicción: el Tzimtzum no fue un retiro real de la Esencia, sino una ocultación desde la perspectiva del receptor. La Luz sigue plena, sin cambio; lo que cambió fue la capacidad de la criatura de percibirla. El «vacío» no es ausencia de Dios: es la posibilidad de que exista un «yo» capaz de elegir acercarse. Y por eso el Kodesh HaKodashim es único: es el solo lugar donde el Tzimtzum se vuelve transparente — la Presencia está y no se oculta, y justamente por eso no ocupa lugar.`,
        ],
      },
    ],
    caja: {
      titulo: "דְּבִיר = גְּבוּרָה = 216 — el lugar de máxima contracción es donde la Luz infinita mora sin medida.",
      cuerpo:
        "En el Tzimtzum la Luz se retira para hacer lugar; en el Arca la Presencia no se retira y aun así no ocupa lugar. Dos caras de una verdad: lo Infinito no desplaza nada, porque no es «una cosa más» en el espacio. Por eso Dios es HaMakom, el Lugar del mundo — y el mundo no es Su lugar.",
    },
  },
  // ── 4. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        texto: `Detente. Tu vida es como aquel cuarto de veinte codos: llevas una cuenta que no cierra —las horas no alcanzan, el corazón no da para todos—. Y sin embargo, lo más sagrado en ti no ocupa lugar en esa cuenta: el amor a un hijo no le resta al otro; el tiempo dedicado a lo eterno no se descuenta de lo urgente en la economía del Cielo. Hay una dimensión tuya —donde tu alma toca a su Fuente— que no entra en la medida, y por eso nunca se agota.`,
      },
      {
        etiqueta: "¿Dónde has confundido lo espiritual con la aritmética de la escasez?",
        texto: `El mismo Dios del que «no hay lugar vacío» se dejó encontrar «de entre los dos querubines» (Éxodo 25:22): infinito y, a la vez, localizable por quien lo busca.`,
      },
    ],
  },
  // ── 5. מַעֲשֶׂה ───────────────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Practica una «medida que no cuenta».",
    texto: `Elige algo que hoy racionas por escasez —tiempo, paciencia, atención— y dalo sin llevar la cuenta: dedica quince minutos de presencia total a alguien, sin reloj y sin teléfono, decidiendo que ese tiempo no se descuenta de tu día. La midá que se trabaja es נְדִיבוּת / הִתְפַּשְּׁטוּת: la generosidad que se expande sin miedo a quedarse sin sitio. Y una segunda acción, antes de dormir: párate en el centro de una habitación y di en voz baja «לֵית אֲתַר פָּנוּי מִנֵּיהּ — no hay lugar vacío de Él». Convierte tu cuarto en un pequeño Kodesh HaKodashim: no cambia la habitación, cambia tu manera de medirla.`,
  },
  // ── 6. חֲתִימָה ───────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El Talmud (Bavá Batrá 99a; Meguilá 10b) enseña que el Arca no entraba en la medida: presente por completo, no ocupaba espacio medible. La cuenta —10 + 2,5 + 10 = 22,5 en un cuarto de 20— no cierra a propósito.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Es la misma paradoja del Tzimtzum, al revés. En la creación lo Infinito hace lugar retirándose; en el Arca la Presencia no ocupa lugar sin retirarse. Por eso Dios se llama HaMakom, «el Lugar del mundo» que no necesita lugar (Bereshit Rabá 68:9).`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `לֵית אֲתַר פָּנוּי מִנֵּיהּ — «no hay lugar vacío de Él» (Tikunei Zohar 57). Según Baal HaSulam, el «vacío» nunca fue ausencia de Dios, sino ocultación amorosa para que exista un «yo» capaz de elegir acercarse.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Lo sagrado no obedece a la aritmética de la escasez. Dar amor, tiempo o Presencia no vacía tu medida. Vive hoy una entrega que no lleves la cuenta.`,
      },
    ],
  },
  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  hemshej: [
    "{{study:tzimtzum|¿Qué es realmente el Tzimtzum: Dios se fue o solo se ocultó?}}",
    "{{study:leit atar panui minei|La Presencia que llena todo sin ocupar nada}}",
    "{{study:hamakom|Por qué Dios se llama «el Lugar del mundo»}}",
    "{{letter:guimel|Guimel, Dalet y el secreto del dar que no se agota}}",
  ],
  ctaRef: "Bava Batra 99a",
};
