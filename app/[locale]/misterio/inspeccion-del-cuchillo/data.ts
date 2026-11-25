import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — בְּדִיקַת הַסַּכִּין · El filo que se prueba contra la carne
//  El tratado Julín: la melladura del cuchillo de un carnicero medida con la
//  vara del altar, y la pregunta que el Talmud hace dos veces sin cerrarla.
//
//  CONTENIDO ESCRITO Y VERIFICADO POR EL SOFER (editor-erudito).
//  Fuente de montaje: ~/jashmal-produccion/julin/JULIN.md (líneas 1–1164).
//
//  FRONTERA DURA RESPETADA: todo lo que en ese archivo va DESPUÉS de la línea
//  1165 —«SECCIÓN DE TRABAJO — NO PUBLICAR»— NO se montó: no aparece en esta
//  página, ni en nota al pie, ni en <details>, ni en comentario de código.
//
//  Infraestructura SOLO montó. No se añadió ni una cita, ni un folio, ni una
//  fuente, ni una frase de análisis que no estuviera ya en el markdown
//  verificado. Lo único que es montaje y no contenido: los rótulos de la
//  plantilla (el «Una acción concreta, hoy…» que abre מַעֲשֶׂה, idéntico al de
//  /misterio/katonti y /misterio/porcion-de-esav) y el reparto del texto en
//  bloques {p}/{head}/{cita}/{nota}.
//
//  NO ES TANAJ: es un tratado del Talmud. Por eso NO lleva la sección
//  מִלִּים חוֹזְרוֹת (palabras repetidas), que solo se pinta en textos del
//  Tanaj. El flujo es el lineal de seis secciones de CLAUDE.md.
//
//  VOZ (regla del 24-nov-2026): el nombre de Mardan no aparece; la lectura
//  propia se firma «lectura de Jashmal» / «meditación de Jashmal» tal como el
//  Sofer la escribió; no hay rótulos de grado A/B; todo el hebreo del cuerpo
//  lleva su traducción pegada.
//
//  Hero en modo "numero": 12, las revisiones que la halajá cuenta sobre un
//  solo filo (Shulján Aruj, Yoré Deá 18:19).
//
//  Farsi: PENDIENTE por regla de Mardan (no se produce farsi salvo que lo
//  pida). Los campos …Fa del hero llevan el español como respaldo —mismo
//  precedente que /misterio/katonti y /misterio/porcion-de-esav—; en el
//  catálogo (lib/content/misterios.ts) van VACÍOS para que tri() marque la
//  traducción pendiente. Inglés: omitido a propósito.
// ════════════════════════════════════════════════════════════════════════════

const TITULO = "El filo que se prueba contra la carne";
const SERIE = "Serie «Dos Filos» · lo ordinario medido por el altar";
const GANCHO =
  "Hay un tratado entero del Talmud —doce capítulos, del folio 2 al 142— dedicado a la carne que nunca va a subir a ningún altar. Se llama חוּלִּין (julín), que significa «lo común», lo no consagrado, y los sabios lo archivaron, con todas sus páginas, dentro del orden de las cosas sagradas. En su primer capítulo la ley dice que la melladura que invalida el cuchillo de un carnicero se mide exactamente igual que la melladura que invalida el altar del Templo: por lo que alcance a engancharse una uña. Y entonces hace la pregunta que nadie espera de un libro sobre comida, la hace dos veces y las dos veces se queda sin respuesta: ¿quién revisa a quien revisa?";

export const data: EstudioData = {
  slug: "inspeccion-del-cuchillo",

  hero: {
    serielabel: SERIE,
    serielabelFa: SERIE,
    he: "בְּדִיקַת הַסַּכִּין",
    titulo: TITULO,
    tituloFa: TITULO,
    ganchoEs: GANCHO,
    ganchoFa: GANCHO,
    numero: {
      valor: "12",
      rom: "las revisiones que la halajá cuenta sobre un solo filo · Shulján Aruj, Yoré Deá 18:19",
    },
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── Preludio — la apertura del estudio (no es sección) ──────────────────────
  preludio: [
    { head: "El tratado de lo que no va al Templo" },
    {
      p: `Conviene detenerse en el nombre antes que en la ley, porque el nombre ya es la tesis.`,
    },
    {
      p: `חוּלִּין (julín) es el plural de חֹל (jol), y חֹל es la palabra que la Torá usa para lo que no está consagrado. No significa sucio ni despreciable: significa común, disponible, de todos los días. Es el término exacto de un versículo del Levítico que define el oficio sacerdotal entero: וּלְהַבְדִּיל בֵּין הַקֹּדֶשׁ וּבֵין הַחֹל, «y para separar entre lo sagrado y lo común» (Levítico 10:10). Ahí está la palabra que da nombre al tratado, y ahí está también el verbo que va a gobernar todo lo que sigue: לְהַבְדִּיל (lehavdil), separar, distinguir, hacer una diferencia.`,
    },
    {
      p: `De modo que un tratado llamado «Lo común» es, por su propio título, el tratado de la mitad menos vistosa de esa frase. No se ocupa de lo que entra al Santuario. Se ocupa de lo que se queda afuera y aun así tiene que estar bien hecho. Y los sabios lo pusieron, sin disimulo, en סֵדֶר קָדָשִׁים (séder kodashim), el orden de las cosas sagradas, junto a los sacrificios y las ofrendas. Lo ordinario, clasificado entre lo santo. El estante ya está diciendo algo.`,
    },
    {
      p: `Lo que el estante insinúa, la jasidut lo dice con todas las letras, y lo dice hablando de carne. El Tania toma el caso más carnal que se le ocurre —un hombre que se come un buen trozo de carne y se bebe un vino perfumado— y dictamina:`,
    },
    {
      cita: {
        he: "הָאוֹכֵל בִּשְׂרָא שְׁמֵינָא דְּתוֹרָא וְשׁוֹתֶה יַיִן מְבוּשָּׂם לְהַרְחִיב דַּעְתּוֹ לַה׳ וּלְתוֹרָתוֹ […] אֲזַי נִתְבָּרֵר חִיּוּת הַבָּשָׂר וְהַיַּיִן שֶׁהָיָה נִשְׁפָּע מִקְּלִיפַּת נֹגַהּ, וְעוֹלֶה לַה׳ כְּעוֹלָה וּכְקָרְבָּן.",
        es: "El que come carne grasa de buey y bebe vino perfumado para ensanchar su mente hacia HaShem y hacia su Torá […] entonces la vitalidad de la carne y del vino, que fluía de la kelipat nogá, queda refinada y asciende a HaShem como una ofrenda de elevación y como un sacrificio.",
        source: "Tania, Likuté Amarim, cap. 7",
      },
    },
    {
      p: `Nótese lo que acaba de pasar. La carne de una cena cualquiera —ni consagrada, ni llevada a ningún sitio, comida en una mesa de casa— sube como un קָרְבָּן (korbán), un sacrificio. No porque se la ofrezca: porque se la come bien. La קְלִיפַּת נֹגַהּ (kelipat nogá), la «cáscara brillante», es el nombre que la jasidut le da a esa zona intermedia: todo lo permitido que todavía no se ha hecho por el Cielo. Lo que la define no es que sea mala, sino que es elevable.`,
    },
    {
      p: `Y el mismo libro, en el capítulo siguiente, pone la frontera, con el caso más favorable que podría construirse:`,
    },
    {
      cita: {
        he: "אַף מִי שֶׁאָכַל מַאֲכָל אִיסּוּר בְּלֹא הוֹדַע – לְשֵׁם שָׁמַיִם, לַעֲבוֹד ה׳ בְּכֹחַ אֲכִילָה הַהִיא, וְגַם פָּעַל וְעָשָׂה כֵן, וְקָרָא וְהִתְפַּלֵּל בְּכֹחַ אֲכִילָה הַהִיא – אֵין הַחִיּוּת שֶׁבָּהּ עוֹלָה.",
        es: "Incluso quien comió un alimento prohibido sin saberlo, por el Cielo, para servir a HaShem con la fuerza de esa comida, y de hecho lo hizo, y leyó y rezó con la fuerza de esa comida — la vitalidad que hay en ella no asciende.",
        source: "Tania, Likuté Amarim, cap. 8",
      },
    },
    {
      p: `Ese es el mapa entero en dos capítulos consecutivos. Hay cosas que se elevan usándolas bien, y hay cosas que no se elevan de ninguna manera, y la intención más limpia del mundo no mueve esa frontera ni un milímetro. No todo se rectifica consumiéndolo. A veces el servicio consiste exactamente en no incorporar.`,
    },
    {
      p: `Y ese mapa es el tratado. Julín no es un libro de cocina: es la cartografía de cómo se santifica lo común — qué se eleva comiéndolo, qué se eleva dejándolo, y cómo se distingue lo uno de lo otro. Para eso hace falta un instrumento que separe, y hace falta saber en qué estado está ese instrumento.`,
    },
    {
      p: `Por eso la primera línea del tratado no habla del animal ni del cuchillo: habla de quién tiene derecho a sostenerlo.`,
    },
    {
      cita: {
        he: "הַכֹּל שׁוֹחֲטִין וּשְׁחִיטָתָן כְּשֵׁרָה, חוּץ מֵחֵרֵשׁ שׁוֹטֶה וְקָטָן, שֶׁמָּא יְקַלְקְלוּ אֶת שְׁחִיטָתָן. וְכוּלָּן שֶׁשָּׁחֲטוּ וַאֲחֵרִים רוֹאִין אוֹתָן — שְׁחִיטָתָן כְּשֵׁרָה.",
        es: "Todos degüellan y su degüello es válido, excepto el sordomudo, el desequilibrado y el menor, por si arruinan su degüello. Y todos ellos, si degollaron mientras otros los miraban — su degüello es válido.",
        source: "Mishná, Julín 2a",
      },
    },
    {
      p: `Lo que la mishná acaba de decir merece leerse dos veces. Los tres a quienes la ley aparta no quedan apartados para siempre. Lo único que les faltaba era una mirada. Puesto un ojo competente encima, el acto que era inválido se vuelve válido, y nada ha cambiado en el animal, en el cuchillo ni en la mano: ha cambiado que alguien estaba viendo.`,
    },
    {
      p: `Quince folios después, ese mismo principio llega a su forma más dura, y ya no sobre los que tienen una limitación reconocida, sino sobre el profesional competente. Y setenta folios más allá, cuando el tratado llega a lo que hay que quitar de la pieza, vuelve a preguntar lo mismo. La pregunta que nadie quiere oír está en los dos extremos de Julín: si usted es el que sabe, ¿quién lo revisa a usted?`,
    },
  ],

  // ── 1. תַּרְגּוּם — Traducción ────────────────────────────────────────────────
  targum: {
    citas: [],
    parrafos: [],
    bloques: [
      { head: "La ley del filo" },
      {
        cita: {
          he: "סַכִּין שֶׁיֵּשׁ בָּהּ פְּגִימוֹת הַרְבֵּה — תִּידּוֹן כִּמְגֵירָה, וְשֶׁאֵין בָּהּ אֶלָּא פְּגִימָה אַחַת: אוֹגֶרֶת — פְּסוּלָה, מְסוּכְסֶכֶת — כְּשֵׁרָה. […] אָמַר רַבִּי אֱלִיעֶזֶר: אוֹגֶרֶת — מִשְּׁתֵּי רוּחוֹת, מְסוּכְסֶכֶת — מֵרוּחַ אַחַת.",
          es: "Un cuchillo que tiene muchas melladuras — se juzga como una sierra. Y el que no tiene más que una sola melladura: si es oguéret — inválido; si es mesuksejet — válido. […] Dijo Rabí Eliezer: oguéret es la mellada por dos lados; mesuksejet, por un lado solo.",
          source: "Julín 17b",
        },
      },
      {
        p: `Dos palabras hay que quedarse de ahí. פְּגִימָה (pegimá) es la melladura, la muesca, la mordida que le falta al filo. Y אוֹגֶרֶת (oguéret) es el nombre de la melladura que invalida: la que tiene punta por los dos lados, de manera que la carne no se desliza sobre ella sino que queda atrapada dentro. מְסוּכְסֶכֶת (mesuksejet) es la otra, la que solo tiene punta por un lado, y esa —dice la ley— puede pasar.`,
      },
      {
        p: `Es decir: la ley no descalifica la irregularidad. Descalifica el enganche. Un filo puede estar desigual y seguir sirviendo; lo que no puede es agarrar.`,
      },
      {
        p: `Y Rava lo ordena en tres grados, que son tres estados posibles de un mismo instrumento:`,
      },
      {
        cita: {
          he: "אָמַר רָבָא: שָׁלֹשׁ מִדּוֹת בְּסַכִּין — אוֹגֶרֶת — לֹא יִשְׁחוֹט, וְאִם שָׁחַט — שְׁחִיטָתוֹ פְּסוּלָה. מְסוּכְסֶכֶת — לֹא יִשְׁחוֹט בָּהּ לְכִתְחִלָּה, וְאִם שָׁחַט — שְׁחִיטָתוֹ כְּשֵׁרָה. עוֹלֶה וְיוֹרֵד בְּסַכִּין — שׁוֹחֵט בָּהּ לְכַתְּחִלָּה.",
          es: "Dijo Rava: tres medidas hay en el cuchillo. Oguéret — que no degüelle, y si degolló, su degüello es inválido. Mesuksejet — que no degüelle con él de entrada, pero si degolló, su degüello es válido. Sube y baja en el cuchillo — degüella con él de entrada.",
          source: "Julín 17b",
        },
      },
      {
        p: `El tercer grado, עוֹלֶה וְיוֹרֵד (olé veyoréd, «sube y baja»), es el que sorprende. No describe un filo que nunca se melló. Rashi lo explica sin rodeos: es un cuchillo que tuvo una melladura grande y al que le alisaron las puntas con la piedra de afilar, de modo que ahí el filo quedó más bajo que el resto. Un filo con una hondonada suave donde antes había un diente. Y con ese se puede degollar desde el principio, sin reserva alguna.`,
      },
      {
        p: `Hay que decirlo despacio: el instrumento mejor calificado de los tres no es el que nunca falló. Es el que falló y fue trabajado.`,
      },

      { head: "De dónde sale la obligación de revisar" },
      {
        cita: {
          he: "אָמַר רַב חִסְדָּא: מִנַּיִן לִבְדִיקַת סַכִּין מִן הַתּוֹרָה? שֶׁנֶּאֱמַר: וּשְׁחַטְתֶּם בָּזֶה וַאֲכַלְתֶּם.",
          es: "Dijo Rav Jisdá: ¿de dónde la inspección del cuchillo, desde la Torá? De lo que está dicho: y degollaréis con esto y comeréis.",
          source: "Julín 17b",
        },
      },
      {
        p: `El versículo vale la pena en su sitio, porque casi nunca se cuenta. No es una ley del Levítico dictada en el desierto: es una escena de guerra. El ejército de Shaúl acaba de pelear todo el día en ayunas, y al caer la tarde la tropa se echa sobre el botín: וַיִּשְׁחֲטוּ־אָרְצָה וַיֹּאכַל הָעָם עַל־הַדָּם, «y degollaron en el suelo, y el pueblo comió sobre la sangre». Le avisan a Shaúl que el pueblo está pecando, y Shaúl manda traer una piedra grande y ordena:`,
      },
      {
        cita: {
          he: "הַגִּישׁוּ אֵלַי אִישׁ שׁוֹרוֹ וְאִישׁ שְׂיֵהוּ וּשְׁחַטְתֶּם בָּזֶה וַאֲכַלְתֶּם וְלֹא־תֶחֶטְאוּ לַיהוה",
          es: "Acercadme cada uno su buey y cada uno su cordero, y degollad con esto y comed, y no pequéis contra HaShem.",
          source: "Shmuel I 14:34",
        },
      },
      {
        p: `De ahí, de un «con esto» dicho de noche a hombres con hambre que ya estaban degollando mal en la tierra, deducen los sabios que hay un filo que se muestra y se aprueba antes de usarlo. Rashi lo lee en esa palabra exacta: «está escrito de Shaúl, y de que dice con esto se aprende que les revisó un cuchillo». Y el versículo siguiente, el que cierra la escena, dice que Shaúl edificó allí un altar.`,
      },
      {
        p: `La guemará, sin embargo, no se queda con la derivación tal cual. Primero objeta que la cosa es obvia —si el filo mellado perfora, el degüello queda inválido de todos modos—, de modo que lo que Rav Jisdá tiene que estar diciendo es algo más: que la revisión se hace ante un sabio. Y entonces aparece la voz que complica todo el asunto:`,
      },
      {
        cita: {
          he: "וְהָאָמַר רַבִּי יוֹחָנָן: לֹא אָמְרוּ לְהַרְאוֹת סַכִּין לְחָכָם אֶלָּא מִפְּנֵי כְּבוֹדוֹ שֶׁל חָכָם! מִדְּרַבָּנַן, וּקְרָא אַסְמַכְתָּא בְּעָלְמָא הוּא.",
          es: "¡Pero Rabí Yojanán dijo: no dijeron que se muestre el cuchillo al sabio sino por el honor del sabio! — Es de los rabinos, y el versículo no es más que un apoyo.",
          source: "Julín 17b",
        },
      },
      {
        p: `Dos cosas quedan dichas, y ninguna conviene inflar. La obligación de mostrar el filo a otro no viene de la Torá: es un decreto rabínico, y el versículo de Shaúl es una אַסְמַכְתָּא (asmajtá), un apoyo, un clavo donde colgarlo. Y según Rabí Yojanán, lo que sostiene esa costumbre no es que el degollador sea incapaz de revisar su propio cuchillo —puede—, sino la honra del sabio.`,
      },

      { head: "Cómo se revisa" },
      {
        p: `Lo que sigue en el folio es un pequeño inventario de oficios, y es de las páginas más humanas del Talmud. En Occidente revisaban el filo al sol. En Nehardeá, en el agua. Rav Sheshet lo revisaba con la punta de la lengua. Rav Ajá bar Yaakov, con un hilo de cabello. Y en Surá decían una frase que lo resuelve todo: בִּישְׂרָא אָכְלָה, בִּישְׂרָא לִבְדְּקַהּ, «carne come, carne la revise».`,
      },
      { p: `De ahí sale el procedimiento que quedó:` },
      {
        cita: {
          he: "אַיְיתוֹ סַכִּין לְקַמֵּיהּ דְּרַב אָשֵׁי לִבְדְּקַהּ. אֲמַר לֵיהּ לְרַב אַחָא בְּרֵיהּ דְּרָבָא: בִּידְקַהּ. בַּדְקַהּ אַטּוּפְרָא וְאַבִּישְׂרָא וְאַתְּלָתָא רוּחָתָא. אֲמַר לֵיהּ: יִישַׁר.",
          es: "Trajeron un cuchillo ante Rav Ashi para que lo revisara. Le dijo a Rav Ajá hijo de Rava: revísalo. Y lo revisó contra la uña, contra la carne y por sus tres lados. Le dijo: yishar — bien hecho.",
          source: "Julín 17b",
        },
      },
      {
        p: `אַטּוּפְרָא (atufrá), contra la uña. אַבִּישְׂרָא (abisrá), contra la carne del dedo. וְאַתְּלָתָא רוּחָתָא (ve'atlatá rujatá), por los tres lados: el filo y sus dos caras. Rav Yeimar discute el tercero —uña y carne hacen falta, los tres lados no—, y esa discusión queda abierta en el folio. Pero los dos primeros no se discuten.`,
      },
      {
        p: `Que el filo se pruebe contra la uña y además contra la carne viva del dedo es el corazón físico de esta ley. La uña no siente. La carne sí. Quien revisa un filo de verdad lo pasa por algo que puede sangrar, y lo pasa por sí mismo antes de pasarlo por otro.`,
      },

      { head: "La medida" },
      {
        cita: {
          he: "וְכוּלָּן, פְּגִימָתָן כְּדֵי פְּגִימַת הַמִּזְבֵּחַ. וְכַמָּה פְּגִימַת הַמִּזְבֵּחַ? כְּדֵי שֶׁתַּחְגּוֹר בָּהּ צִפּוֹרֶן.",
          es: "Y todas ellas, su melladura es según la medida de la melladura del altar. ¿Y cuánto es la melladura del altar? Lo que alcance a engancharse en ella una uña.",
          source: "Julín 17b–18a",
        },
      },
      {
        p: `Aquí está el centro del tratado, y está dicho de pasada, como se dicen en el Talmud las cosas enormes. Rabí Shimón ben Lakish había enumerado tres melladuras con consecuencia legal: la del hueso en el cordero de Pésaj, la de la oreja en el primogénito, la del defecto en los animales consagrados. Las tres, cosas del Templo. Y Rav Jisdá añade una cuarta: אַף פְּגִימַת סַכִּין, «también la melladura del cuchillo». La guemará explica por qué el primero no la había mencionado: בְּחוּלִּין לָא קָא מַיְירֵי, «no estaba hablando de lo común».`,
      },
      {
        p: `De modo que el único motivo por el que la melladura del cuchillo de la cocina no figuraba en la lista del altar era temático. Cuando se la pone en la lista, entra con la misma medida que las otras tres. La vara de medir el filo de un carnicero es la vara de medir el altar: una uña que se engancha.`,
      },

      { head: "La sanción, y una conversación entre maestros" },
      {
        cita: {
          he: "אָמַר רַב הוּנָא: הַאי טַבָּחָא דְּלָא סָר סַכִּינָא קַמֵּי חָכָם — מְשַׁמְּתִינַן לֵיהּ. וְרָבָא אֲמַר: מְעַבְּרִינַן לֵיהּ, וּמַכְרְזִינַן אַבִּשְׂרֵיהּ דִּטְרֵפָה הִיא.",
          es: "Dijo Rav Huná: a ese matarife que no somete su cuchillo ante el sabio — lo excomulgamos. Y Rava dijo: lo destituimos, y proclamamos que su carne es tereifá.",
          source: "Julín 18a",
        },
      },
      {
        p: `Y aquí hay que ir despacio, porque lo que tenemos delante no es una ley: es una conversación entre maestros que no terminó.`,
      },
      {
        p: `Rabí Yojanán, un folio antes, había dicho que mostrar el cuchillo al sabio es una cuestión de honra. Si eso es así, el degollador competente que revisa bien su propio filo no está haciendo nada malo: está siendo descortés. Rav Huná no lo ve de ese modo en absoluto. Para él, el que no somete su cuchillo se queda fuera de la comunidad, que es la pena más grave de la que dispone un tribunal judío. Y Rava sube todavía un escalón: no solo lo saca del oficio —Rashi precisa: «destituido de su profesión, que no venda carne más»—, sino que manda pregonar por el mercado que su carne no se puede comer. Nótese lo que eso significa: la carne no se declaró inválida porque el cuchillo estuviera mellado. Se declaró inválida porque nadie lo revisó.`,
      },
      {
        p: `La guemará intenta armonizar —un caso es cuando el cuchillo apareció bien, el otro cuando apareció mal—, y conviene no fingir que con eso el asunto quedó cerrado. Una voz dice que la revisión ajena es cortesía y otra la convierte en condición del oficio, con la sanción más dura que hay. Esa tensión es el estudio. No se resuelve: se habita.`,
      },

      { head: "El hombre que tenía hijos" },
      {
        p: `Lo que viene inmediatamente después es el pasaje que salva la ley de volverse cruel.`,
      },
      {
        cita: {
          he: "הָהוּא טַבָּחָא דְּלָא סָר סַכִּינָא קַמֵּיהּ דְּרָבָא בַּר חִינָּנָא, שַׁמְּתֵיהּ וְעַבְּרֵיהּ, וְאַכְרֵיז אַבִּשְׂרֵיהּ דִּטְרֵפָה הִיא. […] אֲמַר לְהוּ: לִיעַיְּינוּ רַבָּנַן בְּמִלְּתֵיהּ, דִּתְלוּ בֵּיהּ טַפְלֵי. בַּדְקֵהּ רַב אָשֵׁי לְסַכִּינֵיהּ, וְנִמְצֵאת יָפָה, וְאַכְשְׁרֵיהּ. אֲמַר לֵיהּ מָר זוּטְרָא: וְלָא לֵיחוּשׁ מָר לְסָבָא? אֲמַר לֵיהּ: שְׁלִיחוּתֵיהּ קָא עָבְדִינַן.",
          es: "Aquel matarife que no sometió su cuchillo ante Rava bar Jinaná: lo excomulgó, lo destituyó y proclamó que su carne era tereifá. […] Les dijo: que examinen los maestros su caso, que de él dependen niños. Rav Ashi le revisó el cuchillo, y se encontró hermoso, y lo rehabilitó. Le dijo Mar Zutrá: ¿y no ha de preocuparse el maestro por el anciano? Le dijo: estamos haciendo su encargo.",
          source: "Julín 18a",
        },
      },
      {
        p: `דִּתְלוּ בֵּיהּ טַפְלֵי: «de él dependen niños». Es el argumento que el hombre presenta, y es el único que presenta. No alega que su filo estuviera bien —eso lo averiguan otros—, ni discute la autoridad del que lo sancionó. Dice que hay criaturas colgando de su oficio.`,
      },
      {
        p: `Y Rav Ashi revisa el cuchillo. Lo encuentra יָפָה (yafá), «hermoso» —así llama el Talmud a un filo sin melladura— y lo devuelve al trabajo. Cuando Mar Zutrá le señala que está pasando por encima del maestro que dictó la sanción, la respuesta es una sola frase: שְׁלִיחוּתֵיהּ קָא עָבְדִינַן, «estamos haciendo su encargo». No lo estamos contradiciendo: estamos haciendo lo que él habría querido hacer. La revisión que lo había dejado afuera es la misma revisión que lo devuelve adentro.`,
      },

      { head: "El instrumento que se repara" },
      {
        cita: {
          he: "הַשּׁוֹחֵט בְּמַגַּל קָצִיר, בַּדֶּרֶךְ הֲלִיכָתָהּ — בֵּית שַׁמַּאי פּוֹסְלִין, וּבֵית הִלֵּל מַכְשִׁירִין. וְאִם הֶחְלִיקוּ שִׁינֶּיהָ — הֲרֵי הִיא כְּסַכִּין.",
          es: "El que degüella con una hoz de cosechar, en la dirección de su marcha: la casa de Shamái invalida, y la casa de Hilel declara válido. Y si le alisaron los dientes — he aquí que es como un cuchillo.",
          source: "Mishná, Julín 18a (y Mishná Julín 1:2)",
        },
      },
      {
        p: `La hoz de cosechar estaba en la lista negra desde la primera mishná del tratado, junto a la sierra, los dientes y la uña, y por un motivo que la mishná dice en una sola palabra: מִפְּנֵי שֶׁהֵן חוֹנְקִין, «porque estrangulan». No cortan: ahogan.`,
      },
      {
        p: `Y aun así la mishná no la condena para siempre. וְאִם הֶחְלִיקוּ שִׁינֶּיהָ —si le alisaron los dientes— הֲרֵי הִיא כְּסַכִּין, he aquí que es como un cuchillo. El instrumento que estrangula se convierte en instrumento que corta. No se cambia por otro, no se funde, no se tira: se le alisan los dientes. Es la misma operación que convirtió la melladura grande en el filo que «sube y baja», el mejor de los tres.`,
      },

      { head: "Y en el otro extremo del tratado: el nervio" },
      {
        p: `Setenta folios más adelante, el capítulo séptimo de Julín se ocupa de la única prohibición alimentaria que no nació de una lista, sino de una noche. Viene del final de la lucha de Yaakov en el vado del Yabok:`,
      },
      {
        cita: {
          he: "עַל־כֵּן לֹא־יֹאכְלוּ בְנֵי־יִשְׂרָאֵל אֶת־גִּיד הַנָּשֶׁה אֲשֶׁר עַל־כַּף הַיָּרֵךְ עַד הַיּוֹם הַזֶּה, כִּי נָגַע בְּכַף־יֶרֶךְ יַעֲקֹב בְּגִיד הַנָּשֶׁה.",
          es: "Por eso no comen los hijos de Israel el guid hanashé —el nervio del muslo— que está sobre la cuenca del muslo, hasta el día de hoy, porque tocó la cuenca del muslo de Yaakov en el nervio del muslo.",
          source: "Bereshit 32:33",
        },
      },
      {
        p: `עַד הַיּוֹם הַזֶּה, «hasta el día de hoy». La Torá no escribe la abstención en pasado. La escribe como algo que sigue ocurriendo mientras alguien lee el versículo. No es el recuerdo de una herida: es la herida todavía abierta, y el lugar donde sigue abierta es la mesa.`,
      },
      {
        p: `Y la mishná que abre ese capítulo dice algo que, puesto junto al nombre del tratado, deja sin aire:`,
      },
      {
        cita: {
          he: "גִּיד הַנָּשֶׁה נוֹהֵג בָּאָרֶץ וּבְחוּצָה לָאָרֶץ, בִּפְנֵי הַבַּיִת וְשֶׁלֹּא בִּפְנֵי הַבַּיִת, בְּחֻלִּין וּבְמֻקְדָּשִׁים. וְנוֹהֵג בִּבְהֵמָה וּבְחַיָּה, בְּיָרֵךְ שֶׁל יָמִין וּבְיָרֵךְ שֶׁל שְׂמֹאל. וְאֵינוֹ נוֹהֵג בְּעוֹף, מִפְּנֵי שֶׁאֵין לוֹ כָף.",
          es: "El guid hanashé se aplica en la Tierra y fuera de la Tierra, con Templo y sin Templo, en lo común y en lo consagrado. Y se aplica en el animal doméstico y en el salvaje, en el muslo derecho y en el muslo izquierdo. Y no se aplica en el ave, porque no tiene cuenca.",
          source: "Mishná, Julín 7:1 (folio 89b)",
        },
      },
      {
        p: `בְּחֻלִּין וּבְמֻקְדָּשִׁים: en lo julín y en lo consagrado. La única ley que nació de aquella noche es precisamente la que no distingue entre lo sagrado y lo común, y lleva el nombre del tratado dentro de su propia formulación. Todo el edificio de Julín está construido sobre esa frontera; esta prohibición la atraviesa como si no existiera. Dentro y fuera de la Tierra. Con Templo y sin Templo. Derecha e izquierda. No hay zona donde no se aplique.`,
      },
      {
        p: `Salvo una. מִפְּנֵי שֶׁאֵין לוֹ כָף, «porque no tiene cuenca»: en el ave no se aplica, porque el ave no tiene esa articulación. Solo puede ser herido ahí quien tiene esa anatomía. La herida de Yaakov no es un accidente que le podría haber pasado a cualquier cosa viva: requiere un cuerpo capaz de recibirla.`,
      },
      {
        p: `Y dos líneas más abajo, la misma mishná hace la pregunta del primer capítulo otra vez:`,
      },
      {
        cita: {
          he: "וְאֵין הַטַּבָּחִין נֶאֱמָנִין עַל גִּיד הַנָּשֶׁה, דִּבְרֵי רַבִּי מֵאִיר. וַחֲכָמִים אוֹמְרִים: נֶאֱמָנִין עָלָיו וְעַל הַחֵלֶב.",
          es: "Y los matarifes no son de fiar respecto del guid hanashé — palabras de Rabí Meir. Y los Sabios dicen: sí son de fiar, respecto de él y respecto de la grasa.",
          source: "Mishná, Julín 7:1",
        },
      },
      {
        p: `Es la misma discusión del cuchillo, al otro extremo del tratado. En el primer capítulo se discute si el degollador puede dar fe de su propio filo. En el séptimo se discute si el matarife es de fiar cuando le toca quitar lo que no se come. Y las dos veces el Talmud se queda dividido.`,
      },
    ],
  },

  // ── 2. מְפָרְשִׁים — Los comentaristas ──────────────────────────────────────────
  mefarshim: {
    parrafos: [],
    bloques: [
      { head: "Rashi: la melladura no corta, rasga" },
      {
        p: `La pregunta física de por qué una muesca minúscula arruina un degüello que un filo sin brillo no arruina tiene respuesta, y está en Rashi, sobre el mecanismo que la propia guemará describe. La guemará dice que en la melladura de dos puntas מוּרְשָׁא קַמָּא מַחְלֵישׁ וּמוּרְשָׁא בָּתְרָא בָּזַע, «la primera punta debilita y la segunda rompe». Rashi lo desarma: «la primera punta debilita el cuero y la carne delante de la segunda, y la segunda llega al órgano y lo rasga». Y unas líneas más abajo lo dice como regla general, en seis palabras que son el hallazgo de toda esta sección:`,
      },
      {
        cita: {
          he: "וְכָל עוֹקְצֵי הַפְּגָם קוֹרְעִין הֵן וְאֵין חוֹתְכִין",
          es: "Y todas las puntas de la melladura rasgan, y no cortan.",
          source: "Rashi a Julín 17b",
        },
      },
      {
        p: `Ahí está la diferencia, y no es de grado sino de naturaleza. Un filo gastado corta mal. Una melladura no corta en absoluto: hace otra cosa. Dos acciones distintas con el mismo gesto de la mano, y la ley solo reconoce una de ellas como degüello.`,
      },

      { head: "Rashi: los nombres de las dos melladuras" },
      {
        p: `Los nombres que el Talmud le da a las dos melladuras no son técnicos. Rashi va a buscarles el parentesco a la Biblia, y lo que encuentra es desconcertante.`,
      },
      {
        p: `אוֹגֶרֶת (oguéret), la melladura que invalida, viene —dice Rashi— del verbo de Proverbios 6:8, אָגְרָה בַקָּצִיר מַאֲכָלָהּ, «recoge en la cosecha su alimento», dicho de la hormiga. Es lenguaje de recolección. Y Rashi explica en qué consiste la recolección del filo: שֶׁאוֹגֶרֶת הַצִּיפּוֹרֶן לְתוֹכָהּ בֵּין ב׳ עוֹקְצֶיהָ, «que recoge la uña hacia dentro de sí, entre sus dos puntas». La melladura que descalifica es la que mete hacia adentro lo que debía pasar de largo. Un filo que acapara.`,
      },
      {
        p: `מְסוּכְסֶכֶת (mesuksejet), la que sí pasa, viene de otro sitio, y aquí hay que respirar. Rashi la deriva de Isaías 19:2: וְסִכְסַכְתִּי מִצְרַיִם בְּמִצְרַיִם, «y enfrentaré a Egipto contra Egipto», y el versículo sigue: וְנִלְחֲמוּ אִישׁ־בְּאָחִיו וְאִישׁ בְּרֵעֵהוּ, «y pelearán cada hombre contra su hermano y cada hombre contra su prójimo». La raíz que nombra a la melladura menor es la raíz del enfrentamiento entre hermanos. En hebreo vivo todavía lo es: סִכְסוּךְ (sijsuj) es un conflicto, una discordia sembrada.`,
      },

      { head: "Rashi: con qué se revisa, y por qué no vale cualquier cosa" },
      {
        p: `La frase de Surá —«carne come, carne la revise»— recibe de Rashi una justificación que es, probablemente, lo más fino de todo el folio:`,
      },
      {
        etiqueta: "Rashi a Julín 17b.",
        p: `«Viene a cortar carne, por lo tanto su revisión esencial es en carne, o en la punta de la lengua, o en la carne de su dedo: si esta carne se engancha en la melladura, así se enganchará en ella la carne del órgano. Pero con otra cosa no es revisión: quizá algo demasiado duro pasa por encima de una melladura pequeña y no se engancha, o algo demasiado blando entra dentro de una melladura pequeña aunque no haya melladura capaz de arruinar el órgano.»`,
      },
      {
        p: `Hay que leer las dos mitades, porque son dos errores opuestos y los dos invalidan la revisión. Un instrumento de prueba demasiado duro pasa por encima del defecto y no lo detecta: eso deja pasar lo que estaba mal. Un instrumento demasiado blando se hunde en cualquier irregularidad y denuncia un defecto que no existe: eso condena lo que estaba bien. Solo una prueba hecha de la misma sustancia que la cosa a cortar dice la verdad sobre el filo.`,
      },

      { head: "El capítulo entero que la halajá le dedicó" },
      {
        p: `La codificación posterior no trató esto como una curiosidad. El Shulján Aruj le dedica a la inspección del cuchillo un capítulo propio, Yoré Deá 18, cuyo encabezado dice sin adornos: דִּין בְּדִיקַת הַסַּכִּין וּפְגִימוֹתָיו, «la ley de la inspección del cuchillo y sus melladuras», en veinte párrafos. Y lo que hay dentro endurece el Talmud en vez de ablandarlo.`,
      },
      {
        p: `La medida, primero. Donde la guemará decía «lo que engancha una uña», la halajá dice: שִׁיעוּר הַפְּגִימָה כָּל שֶׁהוּא, וּבִלְבַד שֶׁתֶּאֱגוֹר בָּהּ כָּל שֶׁהוּא אֲפִילוּ חוּט הַשַּׂעֲרָה, «la medida de la melladura es cualquier cosa, siempre que se enganche en ella cualquier cosa, aunque sea un hilo de cabello» (18:2). El criterio dejó de ser el tamaño del defecto. Pasó a ser si algo se engancha, por fino que sea.`,
      },
      {
        p: `Luego, cuándo. Antes de degollar, obligatoriamente (18:3). Y otra vez después, aunque ya se haya revisado antes (18:12). Y entre un animal y el siguiente, porque si degolló muchos y revisó solo al final y encontró el cuchillo mellado, quedan todos en duda, incluso el primero (18:11). Un filo no se certifica de una vez: se certifica tantas veces como actos realice.`,
      },
      {
        p: `Y después, cómo. Aquí el Shulján Aruj dice dos cosas que a cualquiera que haya tenido que juzgar algo le van a doler:`,
      },
      {
        cita: {
          he: "וְיִבְדּוֹק לְאַט וּבְכַוָּנַת הַלֵּב שֶׁלֹּא יִפְנֶה לִבּוֹ לִדְבָרִים אֲחֵרִים. וְצָרִיךְ לְשַׁנּוֹת הַצִּפּוֹרֶן אַחַר קְצָת בְּדִיקָתָהּ, שֶׁמָּא נִפְגַּם הַצִּפּוֹרֶן בְּחוּדָּהּ שֶׁל סַכִּין, וְאוּלַי יֵשׁ פְּגִימָה בַּצְּדָדִין שֶׁלֹּא יַרְגִּישׁ בָּהּ לְפִי שֶׁעוֹבֶרֶת בְּתוֹךְ פְּגִימַת הַצִּפּוֹרֶן.",
          es: "Y revise despacio, y con intención del corazón, que no vuelva su corazón a otras cosas. Y necesita cambiar la uña después de un poco de revisión, no sea que la uña se haya mellado con el filo del cuchillo, y entonces quizá haya una melladura en los costados que no sienta, porque pasa por dentro de la melladura de la uña.",
          source: "Shulján Aruj, Yoré Deá 18:9",
        },
      },
      {
        p: `Léase otra vez la segunda mitad. El instrumento con el que se revisa se gasta revisando. La uña que pasa muchas veces por el filo acaba mellada por el filo, y una uña mellada deja de sentir las melladuras: el defecto del cuchillo entra justo en el hueco del defecto de la uña y no se nota. De manera que la halajá ordena cambiar de uña a mitad de la revisión. El que examina tiene que examinar también aquello con lo que examina, porque el acto de juzgar desgasta el instrumento de juzgar.`,
      },
      {
        p: `Y sobre la honra del sabio, la halajá cuenta cómo terminó la conversación de los folios 17b y 18a:`,
      },
      {
        cita: {
          he: "טַבָּח שֶׁלֹּא הֶרְאָה סַכִּינוֹ לְחָכָם […] הָיוּ מְנַדִּין אוֹתוֹ. […] וְהָאִידָּנָא נָהֲגוּ לְמַנּוֹת אֲנָשִׁים יְדוּעִים עַל הַשְּׁחִיטָה וְהַבְּדִיקָה, וְלָהֶם מָחֲלוּ חֲכָמִים כְּבוֹדָם, כִּי הֵם זְהִירִים וּזְרִיזִים.",
          es: "Al matarife que no mostró su cuchillo a un sabio […] lo excomulgaban. […] Y hoy en día la costumbre es nombrar hombres conocidos sobre el degüello y la inspección, y a ellos los sabios les perdonaron su honra, porque son cuidadosos y diligentes.",
          source: "Shulján Aruj, Yoré Deá 18:17",
        },
      },
      {
        p: `La honra se perdonó; la verificación no. Lo que cambió es la forma: donde antes había que llevarle el cuchillo a un sabio en persona, ahora hay hombres nombrados y conocidos, con una competencia pública y reconocida. La exigencia no se relajó, se institucionalizó. Nunca quedó en manos del propio degollador declararse apto.`,
      },
      {
        p: `Y en el mismo párrafo, citando a Rabenu Yoná en su Shaaré Teshuvá, viene la frase que probablemente convenga leer dos veces al día:`,
      },
      {
        cita: {
          he: "וְהַרְבֵּה צָרִיךְ יִשּׁוּב הַדַּעַת וְיִרְאַת שָׁמַיִם לִבְדִיקַת הַסַּכִּין. הֲלֹא תִרְאֶה כִּי יִבְדּוֹק אָדָם פַּעֲמַיִם שָׁלֹשׁ וְלֹא יַרְגִּישׁ בִּפְגִימָה דַּקָּה, וְאַחַר כָּךְ יִמְצָאֶנָּה, כִּי הֵכִין לִבּוֹ בָּאַחֲרוֹנָה. וּבְחִינַת חוּשׁ הַמִּישׁוּשׁ כְּפִי כַּוָּנַת הַלֵּב.",
          es: "Y mucha serenidad de mente y temor del Cielo hace falta para la inspección del cuchillo. ¿No ves que un hombre revisa dos y tres veces y no siente una melladura fina, y después la encuentra, porque la última vez preparó su corazón? Y la prueba del sentido del tacto es conforme a la intención del corazón.",
          source: "Rabenu Yoná, Shaaré Teshuvá, citado en Shulján Aruj, Yoré Deá 18:17",
        },
      },
      {
        p: `El mismo hombre, el mismo cuchillo, el mismo dedo. Tres revisiones. En las dos primeras el defecto estaba ahí y no se sintió. Lo que cambió en la tercera fue el corazón del que revisaba. El tacto, dice, mide tanto como la atención con que se usa.`,
      },

      { head: "Dos casos que cierran el asunto" },
      {
        p: `El capítulo trae además dos casos de aplicación que valen por una enseñanza entera.`,
      },
      {
        p: `El primero: a un hombre le encargaron revisar un cuchillo, hizo dos de las doce revisiones que hacían falta, lo devolvió, y otro lo encontró mellado. El veredicto no se apoya en lo que el hombre dijo —él alegó que todavía pensaba revisarlo bien—, sino en lo que hizo: מַעֲשָׂיו מוֹכִיחִים עָלָיו שֶׁהָיָה דַּי לוֹ בְּאוֹתָהּ בְּדִיקָה, «sus actos prueban sobre él que con aquella revisión le bastaba», y por eso lo destituyen. Aunque —añade— si parece que fue un descuido y es un hombre honrado, lo reponen, con la condición de que acepte no volver a hacerlo (18:19).`,
      },
      {
        p: `El segundo es más incómodo, y es el verdadero final del capítulo. Un matarife tiene una melladura en la punta del cuchillo y da su explicación: la melladura está ahí porque con esa punta cubre la sangre de las aves, y cuando degüella tiene cuidado de no tocar la parte mellada. La respuesta de la halajá es inmediata: מַעֲבִירִין אוֹתוֹ, lo destituyen (18:20).`,
      },
      {
        p: `Fíjese en lo que alega, porque es lo que vuelve el caso insoportable: la melladura le vino de cumplir una mitzvá —cubrir la sangre es un mandamiento— y dice que jamás degüella con esa parte. Nadie va a comprobarle ni una cosa ni la otra, y la ley no lo necesita: el mismo párrafo añade que está cerca de decirse que sus utensilios quedan prohibidos. Un filo mellado es un filo mellado, por honroso que sea el modo en que se melló y por diestro que sea el hombre que lo esquiva. Queda fuera del oficio, porque quien sabe dónde tiene su defecto y ha aprendido a trabajar rodeándolo no es un hombre con el instrumento en buen estado: es un hombre que ha hecho las paces con su melladura.`,
      },

      { head: "Los maestros sobre aquella noche" },
      {
        p: `De la lucha del Yabok, el Midrash no sale con un vencedor. Sale con tres voces que no se ponen de acuerdo, y conviene oírlas en ese desorden.`,
      },
      {
        p: `Rabí Jamá hijo de Rabí Janiná dice quién era el adversario: שָׂרוֹ שֶׁל עֵשָׂו הָיָה, «era el ángel guardián de Esav» (Bereshit Rabá 77:3). El profeta, por su parte, no lo llama hombre sino ángel: וַיָּשַׂר אֶל־מַלְאָךְ וַיֻּכָל, «y luchó con un ángel y venció» (Hoshea 12:5), y añade algo que nadie ha conseguido asignar del todo: בָּכָה וַיִּתְחַנֶּן־לוֹ, «lloró y le suplicó». Y Rabí Berejiá, en el mismo midrash, dice lo que uno menos esperaría de un comentario:`,
      },
      {
        cita: {
          he: "אֵין אָנוּ יוֹדְעִים מִי נָצַח, אִם מַלְאָךְ אִם יַעֲקֹב.",
          es: "No sabemos quién venció, si el ángel o Yaakov.",
          source: "Bereshit Rabá 77:3",
        },
      },
      {
        p: `Y hay una cuarta voz, Rabí Janiná bar Yitzjak, que pone en boca del Cielo una instrucción dirigida al adversario antes del combate: «viene hacia ti con cinco amuletos en la mano —su mérito, el de su padre, el de su madre, el de su abuelo y el de su abuela— מְדֹד עַצְמְךָ, mídete a ti mismo, a ver si puedes sostenerte aunque sea contra su mérito solo». Y de inmediato el versículo: וַיַּרְא כִּי לֹא יָכֹל לוֹ, «y vio que no podía con él».`,
      },
      {
        p: `Mídete a ti mismo. Es la orden que se le da al que va a pelear, y es exactamente la que no se le da a nadie en los dos extremos de nuestro tratado, donde la medición la hace siempre otro.`,
      },
      {
        p: `Del golpe mismo, el midrash lee algo que agranda la herida más allá de la pierna: נָגַע בַּצַּדִּיקִים וּבַצַּדִּיקוֹת, בַּנְּבִיאִים וּבַנְּבִיאוֹת שֶׁהֵן עֲתִידִין לַעֲמוֹד מִמֶּנּוּ, «tocó a los justos y a las justas, a los profetas y a las profetas que habrían de surgir de él». El muslo no es un muslo: es la descendencia. Y si se pregunta qué es un muslo en el lenguaje de los cabalistas, la respuesta está en la pieza más repetida de esa literatura, el Pataj Eliyahu: נֶצַח וְהוֹד תְּרֵין שׁוֹקִין, «Nétzaj y Hod son los dos muslos» (Tikuné Zóhar 17a). Nétzaj, la persistencia; Hod, la entrega que resiste. Las dos cualidades con las que un hombre se mantiene de pie a lo largo del tiempo. Ahí fue el golpe.`,
      },

      { head: "El mapa, dicho por los jasidim" },
      {
        p: `Vuélvase ahora al mapa del preludio, porque es el que explica por qué ese nervio se quita.`,
      },
      {
        p: `El Tania ordena el mundo de lo permitido en dos movimientos, y les da nombre:`,
      },
      {
        cita: {
          he: "שְׁנֵי מִינֵי נַחַת רוּחַ לְפָנָיו יִתְבָּרֵךְ לְמַעְלָה: אֶחָד — מִבִּיטּוּל הַסִּטְרָא אַחֲרָא לְגַמְרֵי, וְאִתְהַפְּכָא מִמְּרִירוּ לְמִתְקָא וּמֵחֲשׁוֹכָא לִנְהוֹרָא, עַל יְדֵי הַצַּדִּיקִים. וְהַשֵּׁנִית — כַּד אִתְכַּפְיָא הַסִּטְרָא אַחֲרָא בְּעוֹדָהּ בְּתָקְפָּהּ וּגְבוּרָתָהּ.",
          es: "Dos clases de satisfacción hay ante Él, bendito sea, en lo alto: una, de la anulación completa del sitrá ajará y su transformación de lo amargo a lo dulce y de la oscuridad a la luz, por medio de los justos. Y la segunda, cuando el sitrá ajará queda contenido mientras todavía está en su fuerza y su poder.",
          source: "Tania, Likuté Amarim, cap. 27",
        },
      },
      {
        p: `אִתְהַפְּכָא (it'hapjá) es transformar: lo amargo se vuelve dulce, y eso —dice— es obra de los justos. אִתְכַּפְיָא (itkafiá) es contener: el impulso sigue ahí, intacto, en plena fuerza, y no se le concede la salida. Y eso no es un premio de consolación: es la segunda clase de satisfacción del Cielo, la del hombre común, el בֵּינוֹנִי (beinoní) del que ese libro dice que nunca es un malvado, ni una sola hora, porque en el instante en que el mal pensamiento sube lo empuja con las dos manos.`,
      },
      {
        p: `Y el mismo capítulo pone un ejemplo que parece una tontería y no lo es: alguien tiene hambre, podría comer —comida permitida, sin sombra de problema— y retrasa la comida una hora, y estudia en esa hora. Nada de lo que hizo era prohibido. Precisamente por eso cuenta.`,
      },
      {
        p: `Hay entonces tres operaciones sobre lo común, y el tratado las practica todas: elevar lo permitido usándolo bien, contenerse en lo permitido, y apartarse de lo que no se eleva. El nervio del muslo es el caso límite de la tercera. Y la mishná que lo gobierna, como se vio, es la única que no distingue entre lo común y lo consagrado — porque lo que uno no incorpora no depende de en qué zona esté parado.`,
      },
    ],
  },

  // ── 3. פרד״ס — PaRDeS ────────────────────────────────────────────────────────
  pardes: {
    subbloques: [],
    bloques: [
      { head: "פְּשָׁט — Pshat" },
      {
        p: `En el nivel llano no hay ninguna metáfora: hay un cuchillo de metal, un filo que puede tener una muesca y una ley que dice qué hacer. El degüello ritual exige un filo íntegro; una melladura que engancha lo invalida y el animal queda נְבֵלָה (nevelá), carne no apta. El filo se revisa antes y después, contra la uña y contra la carne del dedo, y la costumbre rabínica exigió además someterlo al examen de alguien competente. Y en la misma pieza, en la cuenca del muslo, hay un nervio que se extrae y no se come, y hay una discusión sobre si el matarife merece crédito cuando dice que lo extrajo. Es todo. El resto de este estudio se sostiene solo si esto queda primero.`,
      },

      { head: "רֶמֶז — Rémez" },
      { p: `La alusión está en que dos listas distintas comparten una sola medida.` },
      {
        p: `La melladura del hueso en el cordero de Pésaj, la de la oreja del primogénito, la del defecto en los animales consagrados: tres cosas del Templo. Y la melladura del cuchillo de un carnicero, que entra en esa lista con la misma vara. La guemará dice que el primer maestro no la había incluido solo porque «no estaba hablando de lo común». O sea: la medida siempre había sido la misma; lo que faltaba era que alguien dijera en voz alta que también se aplica afuera. Y la vara es la del altar. Mide una uña.`,
      },
      {
        p: `Hay una palabra que atraviesa todo esto por debajo, y es תָּם / שָׁלֵם (tam / shalem), íntegro, completo, sin mella. El altar mellado queda inválido, y Rashi lo funda en el principio de que se ofrece sobre él בִּזְמַן שֶׁהוּא שָׁלֵם וְלֹא בִּזְמַן שֶׁהוּא חָסֵר, «cuando está íntegro y no cuando está deficiente». Las piedras del altar tenían que ser אֲבָנִים שְׁלֵמוֹת, piedras íntegras (Mishná Midot 3:4). Y cuando el Talmud quiere nombrar la Torá como medicina del impulso, juega con el mismo sonido: וְשַׂמְתֶּם — סַם תָּם, «y las pondréis — un remedio íntegro» (Kidushín 30b). Lo que cura tiene que estar entero. Un remedio mellado es otra cosa.`,
      },
      {
        p: `Y hay una segunda alusión, en el reparto de las dos leyes. La que gobierna el filo distingue con precisión de orfebre entre lo consagrado y lo común, y hay que recordarle que la medida es la misma. La que gobierna el nervio no distingue nada: בְּחֻלִּין וּבְמֻקְדָּשִׁים, en lo común y en lo consagrado, dentro y fuera de la Tierra, con Templo y sin Templo. Lo que se corta pide discernimiento de qué categoría es cada cosa. Lo que se aparta no admite categorías: se aparta en todas partes.`,
      },

      { head: "דְּרָשׁ — Drash" },
      {
        p: `Aquí la lectura es nuestra y conviene decirlo antes de empezar: lo que sigue es una lectura de Jashmal sobre el material anterior, no una enseñanza del Talmud sobre sí mismo.`,
      },
      {
        p: `El cuchillo de la shejitá es la imagen más exacta que tiene la tradición para la palabra que separa. Separar es su oficio: el degüello es un acto de הַבְדָּלָה (havdalá), de distinción, el mismo verbo del versículo que le da nombre al tratado. Es también un acto de בֵּירוּר (birur), de refinamiento: decide qué de este animal puede entrar en una mesa y qué no. Y cuando está bien hecho es un acto de הַעֲלָאָה (haalaá), de elevación: lo que era un animal pasa a sostener a una persona que estudia, bendice y hace el bien — eso es lo que dice el Tania de la carne comida como se debe, que sube כְּעוֹלָה וּכְקָרְבָּן, como una ofrenda. El cuchillo no crea nada. Solo distingue lo que puede subir de lo que hay que dejar.`,
      },
      {
        p: `Y ahora la melladura. Si el filo es la capacidad de distinguir, la פְּגִימָה (pegimá) es lo que se le mete al juicio de una persona y lo deforma: el orgullo, el resentimiento, el interés propio, la herida vieja que todavía duele. Hasta aquí la analogía es previsible. Lo que no es previsible —y es lo que hace que valga la pena— es la precisión con la que el Talmud describe el daño.`,
      },
      {
        p: `Primero: lo que invalida no es la aspereza, es el enganche. Un filo irregular sigue siendo kosher; el que agarra, no. Traducido: nadie tiene un juicio liso. La pregunta no es si uno tiene asperezas —las tiene—, sino si su manera de hablar se engancha en la persona que tiene delante. Hay quien dice cosas duras y la verdad pasa limpia y sigue de largo. Hay quien dice lo mismo y queda algo prendido, y lo que quedó prendido se infecta durante años.`,
      },
      {
        p: `Segundo, y es la palabra de Rashi: las puntas de la melladura קוֹרְעִין הֵן וְאֵין חוֹתְכִין, rasgan y no cortan. Eso desarma la excusa más común de toda la vida religiosa, que es «lo que dije era verdad». Cortar y rasgar no son la misma acción con distinta fuerza: son dos acciones distintas. Una palabra verdadera dicha desde una melladura no es una corrección fuerte. Es un desgarro con contenido correcto. Y la ley no reconoce el desgarro como degüello, por exacto que sea el contenido.`,
      },
      {
        p: `Tercero, los nombres. La melladura que descalifica se llama אוֹגֶרֶת, la que «recoge hacia dentro de sí». Es el filo que, en vez de dejar pasar, acapara. Y eso describe con una exactitud incómoda lo que le pasa a una corrección cuando el que corrige saca algo de corregir: razón, estatura, público, alivio. En el instante en que el acto de separar empieza a recoger algo para el que lo hace, la ley ya tiene un nombre para ese filo, y es el nombre del filo que no sirve.`,
      },
      {
        p: `Y la otra melladura se llama מְסוּכְסֶכֶת, con la raíz de «enfrentaré a Egipto contra Egipto, y pelearán cada hombre contra su hermano». Es la melladura menor, la que la ley tolera. También eso es honesto: la discordia entre hermanos no invalida todo lo que uno haga —la vida real está llena de eso y sigue siendo válida—, pero el propio Talmud dice de ella לֹא יִשְׁחוֹט בָּהּ לְכִתְחִלָּה, que con eso no se empieza. Válido después del hecho no es lo mismo que apto desde el principio.`,
      },
      {
        p: `Esta es la frontera que el estudio no puede cruzar sin decirlo: la palabra sagrada usada para explotar, humillar o dominar se convierte en instrumento de violencia, y la verdad de una afirmación no legitima cualquier forma de decirla. Eso no es una ocurrencia moderna. Rabí Tzadok lo dijo así: אַל תַּעֲשֵׂם עֲטָרָה לְהִתְגַּדֵּל בָּהֶם, וְלֹא קַרְדֹּם לַחְפּוֹר בָּהֶם, «no las hagas una corona para engrandecerte con ellas, ni un hacha para cavar con ellas» (Pirkei Avot 4:5, numerado 4:7 en otras ediciones). Y el instrumento que nombra no es una corona nada más: es un קַרְדֹּם, un hacha, una herramienta de corte. La tradición ya sabía que el peligro de la Torá en manos de un hombre tiene forma de filo.`,
      },
      {
        p: `Y el mapa de la jasidut lo clasifica donde duele. Las palabras prohibidas —la burla, la lengua mala— no están en la zona elevable: el Tania las pone, con todas sus letras, entre las que vienen מִשָּׁלֹשׁ קְלִיפּוֹת הַטְּמֵאוֹת לְגַמְרֵי, «de las tres cáscaras completamente impuras» (cap. 8). Con la carne y el vino, una buena intención eleva; con la burla, no. La misma regla que vale para el alimento prohibido vale para la palabra que hiere: no asciende, aunque el que la dijo estuviera sirviendo al Cielo con ella, aunque haya rezado después con la fuerza que le dio decirla.`,
      },
      {
        p: `Pero la tradición no deja el instrumento condenado. En el mismo cuerpo de literatura, la Torá es exactamente lo contrario de un arma: בָּרָאתִי יֵצֶר הָרָע וּבָרָאתִי לוֹ תּוֹרָה תַּבְלִין, «creé el impulso del mal y creé para él la Torá como condimento» (Kidushín 30b), y el impulso no se destruye —se le pone remedio—; y el consejo práctico que da ese mismo folio es אִם פָּגַע בְּךָ מְנֻוָּול זֶה, מָשְׁכֵהוּ לְבֵית הַמִּדְרָשׁ, «si te asalta ese miserable, arrástralo a la casa de estudio». No dice «mátalo». Dice llévalo donde se estudia. El mismo instrumento que puede rasgar es el único que cura, y lo que decide cuál de las dos cosas hace es el estado de su filo.`,
      },
      {
        p: `Y queda el nervio, que es la otra mitad del oficio. Hay una parte del animal que no se eleva comiéndola. No se purifica, no se refina, no se transforma en energía para estudiar: se extrae y se deja. Un servicio hecho solo de incorporaciones no es un servicio: es un apetito con vocabulario religioso. Y el día en que uno aprende a distinguir lo que debe asumir de lo que debe soltar, descubre que la ley de lo que se aparta no reconoce zonas cómodas — se aplica dentro y fuera, con Templo y sin Templo, en la derecha y en la izquierda. De lo que no se incorpora, uno no se toma vacaciones.`,
      },

      { head: "סוֹד — Sod" },
      {
        p: `En el nivel oculto, lo primero es que la imagen no es nuestra. Baal HaSulam, explicando cómo se separa una cosa de otra en lo espiritual, va a buscar precisamente un instrumento de corte:`,
      },
      {
        cita: {
          he: "וְהִנְּךָ מוֹצֵא שֶׁבְּרוּחָנִיּוּת פּוֹעֵל שִׁינּוּי הַצּוּרָה כְּמוֹ הַגַּרְזֶן הַמַּפְרִיד בֵּין הַגַּשְׁמִיִּים […] כִּדְמִיוֹן הַגַּרְזֶן הַחוֹצֵב הָאֶבֶן מִן הָהָר.",
          es: "Y hallas que en lo espiritual el cambio de forma actúa como el hacha que separa entre las cosas materiales […] a semejanza del hacha que talla la piedra del monte.",
          source: "Baal HaSulam, Introducción al Zóhar §9",
        },
      },
      {
        p: `Lo que separa en lo alto, dice, no es una cuchilla: es un שִׁינּוּי הַצּוּרָה (shinuí hatzurá), un cambio de forma. Dos cosas se distancian en la medida en que sus formas se oponen, y lo que aleja al alma de su Origen es una sola diferencia de forma: que el Creador solo da, y la criatura quiere recibir para sí. רָצוֹן לְקַבֵּל (ratzón lekabel), la voluntad de recibir para uno mismo, es el nombre de esa forma opuesta.`,
      },
      {
        p: `Y ahora vuélvase a mirar el nombre de la melladura que invalida. אוֹגֶרֶת es, según Rashi, la que «recoge hacia dentro de sí». El defecto del filo tiene la forma exacta de la voluntad de recibir. Un instrumento de separación que empieza a recoger para sí ha cambiado de forma, y con eso ha cambiado de bando: ya no separa, retiene. Eso es una lectura de Jashmal, pero está construida con las dos piezas de arriba y no con otras.`,
      },
      {
        p: `El trabajo, en Baal HaSulam, consiste en volver esa forma al revés: הוּא מַתְחִיל לְטַהֵר הָרָצוֹן לְקַבֵּל לְעַצְמוֹ הַמּוּטְבָּע בּוֹ וּמְהַפְּכוֹ לְאַט לְאַט עַל מְנָת לְהַשְׁפִּיעַ, «comienza a purificar la voluntad de recibir para sí mismo que está grabada en él, y la vuelve poco a poco a la condición de dar» (Introducción al Zóhar §11). לְאַט לְאַט: poco a poco. Y el Shulján Aruj, en otro registro completamente distinto, manda revisar el filo con esa misma palabra: וְיִבְדּוֹק לְאַט, «y revise despacio». Ninguno de los dos está citando al otro. Pero el que quiera saber a qué velocidad se corrige un instrumento tiene la respuesta dos veces: despacio, con el corazón puesto, y volviendo a empezar.`,
      },
      {
        p: `Queda el último nivel, y es el que convierte todo esto en algo más que una moral sobre el habla. La medida de la melladura del cuchillo es la medida de la melladura del altar. Pero el altar tiene con el hierro una relación que no tiene con nada más:`,
      },
      {
        cita: {
          he: "מְבִיאִים מִשָּׁם אֲבָנִים שְׁלֵמוֹת, שֶׁלֹּא הוּנַף עֲלֵיהֶן בַּרְזֶל, שֶׁהַבַּרְזֶל פּוֹסֵל בִּנְגִיעָה, וּבִפְגִימָה לְכָל דָּבָר. […] שֶׁהַבַּרְזֶל נִבְרָא לְקַצֵּר יָמָיו שֶׁל אָדָם, וְהַמִּזְבֵּחַ נִבְרָא לְהַאֲרִיךְ יָמָיו שֶׁל אָדָם, אֵינוֹ בַּדִּין שֶׁיּוּנַף הַמְקַצֵּר עַל הַמַּאֲרִיךְ.",
          es: "Traen de allí piedras íntegras, sobre las que no se alzó hierro, porque el hierro descalifica con el solo contacto, y la melladura, por cualquier cosa. […] Porque el hierro fue creado para acortar los días del hombre, y el altar fue creado para alargar los días del hombre: no es justo que se alce el que acorta sobre el que alarga.",
          source: "Mishná Midot 3:4",
        },
      },
      {
        nota: `Y Deuteronomio 27:5: מִזְבַּח אֲבָנִים לֹא־תָנִיף עֲלֵיהֶם בַּרְזֶל, «altar de piedras: no alzarás sobre ellas hierro».`,
      },
      {
        p: `Júntese eso con la medida de Julín y aparece la paradoja entera. El instrumento cuyo defecto se mide con la vara del altar es, al mismo tiempo, el único instrumento que jamás puede tocar el altar. El hierro está hecho para acortar días; el altar, para alargarlos. Y por eso exactamente el filo se mide tan alto: no porque pueda llegar a ser altar, sino porque nunca va a poder serlo. A la herramienta que acorta se le exige la integridad de lo que alarga, precisamente porque no se le va a conceder nunca el otro papel.`,
      },
      {
        p: `Y el nervio, en este nivel, dice lo mismo desde el otro lado. El golpe de aquella noche cayó en la cuenca del muslo, y los muslos son נֶצַח וְהוֹד, Nétzaj y Hod, la persistencia y la entrega que resiste: lo que sostiene a un hombre a lo largo del tiempo. Que la prohibición no se aplique en el ave מִפְּנֵי שֶׁאֵין לוֹ כָף, «porque no tiene cuenca», dice entonces algo preciso: solo es herible ahí quien tiene esa articulación. El que no se sostiene sobre nada no tiene dónde ser golpeado. Y el que la Torá escriba la abstención עַד הַיּוֹם הַזֶּה, hasta el día de hoy, significa que hay un tikún que todavía no se cerró, y que la señal de que no se cerró es un gesto que se repite en la cocina cada vez que se prepara una pierna. Esa lectura es nuestra — meditación de Jashmal, no cita.`,
      },
      {
        p: `Y hay algo que la noche misma enseña sobre el enganche. Yaakov sale de allí con un nombre nuevo y con una cojera, y el Midrash, que podría haber proclamado un vencedor, se niega: «no sabemos quién venció». Hay una manera de salir de un combate que no consiste en quedarse con toda la fuerza del otro. El Midrash deja abierta la posibilidad de que el adversario también haya salido distinto de ahí —el profeta dice que lloró y suplicó—, y lo que uno hace con esa posibilidad ya es cosa suya. Tomarla como un programa —que el refinamiento de lo oscuro no exija apropiarse de todo, sino abrirle su propia rectificación— es una lectura de Jashmal y no una enseñanza del Arizal. Lo que sí es del Midrash es la orden que se le dio al que iba a pelear, y que vale igual para el que va a corregir: מְדֹד עַצְמְךָ, mídete a ti mismo primero.`,
      },
    ],
  },

  // ── 4. הִתְבּוֹנְנוּת — Contemplación ─────────────────────────────────────────
  hitbonenut: {
    intro:
      "Lo que queda por hacer ahora no es añadir nada, sino quedarse quieto delante de lo que ya se dijo.",
    parrafos: [],
    bloques: [
      {
        p: `Empiece por el estante. Un tratado llamado «Lo común», archivado entre las cosas sagradas, que dedica su primer capítulo a quién puede sostener un cuchillo y en qué estado tiene que estar el filo. Lo ordinario no es la zona donde las exigencias bajan. Es la zona donde las exigencias siguen siendo las mismas y nadie está mirando. Y por eso hace falta una ley: porque en el Templo hay testigos y en una cocina no hay ninguno.`,
      },
      {
        p: `Pase después a la medida, y deje que incomode. La vara con la que se mide el defecto del filo de un carnicero es la vara del altar: lo que engancha una uña. Nadie habría elegido esa severidad para la carne de la cena. La elección fue exactamente al revés de lo que uno espera: en vez de rebajar el estándar para lo cotidiano, se subió lo cotidiano al estándar. Y entonces la pregunta se vuelve personal: ¿qué cosas de su día está usted midiendo con una vara más corta solo porque ese rato no le parece sagrado? La conversación con su hijo a las siete de la tarde. El comentario sobre alguien que no está presente. El tono que usa cuando está cansado. Nada de eso va a subir a ningún altar, y se mide igual.`,
      },
      {
        p: `Siga por la distinción de Rashi, que es la que más cuesta aceptar. Rasgar no es cortar mal: es otra cosa. Lo que significa es que la pregunta «¿tenía yo razón?» no sirve para saber si uno hizo bien, porque uno puede tener toda la razón y haber rasgado. Y la ley, que es bastante más dura que nuestra conciencia, no cuenta el desgarro como un degüello imperfecto: no lo cuenta como degüello. Repase una conversación de esta semana en la que usted tenía razón y la otra persona se quedó mal. Pregúntese, sin defenderse, si aquello cortó o rasgó.`,
      },
      {
        p: `Después vaya al nombre. אוֹגֶרֶת, la melladura que recoge hacia dentro de sí. Es la más difícil de encontrar en uno mismo, porque no se siente como un defecto: se siente como tener razón. ¿Qué recogió usted la última vez que corrigió a alguien? Si la respuesta honesta incluye «quedé por encima», «me quité un peso», «por fin lo dije», ya sabe qué forma tenía ese filo.`,
      },
      {
        p: `Y detenga la mirada en la uña que se mella. El instrumento con el que usted revisa se gasta de tanto revisar, y cuando se gasta deja de detectar: el defecto entra justo en el hueco de su propio defecto y no se nota. Es la descripción más exacta que existe de lo que le pasa a una persona que lleva años juzgando —situaciones, personas, textos, a sí misma— con el mismo criterio sin cambiarlo nunca. No es que se vuelva más severa. Es que se vuelve ciega exactamente en la forma de su propia falla.`,
      },
      {
        p: `Quédese también con las tres revisiones. El defecto estaba las tres veces. Las dos primeras no se sintió. Lo único que cambió fue que la tercera vez el hombre preparó su corazón. Hay cosas en su vida que usted ya ha mirado dos y tres veces y no ha encontrado nada, y no porque no estén.`,
      },
      {
        p: `Y ahora mire el otro extremo, el nervio, porque ahí hay una pregunta que el filo no hace. Todo este estudio trata de hacer bien un corte; el nervio trata de no comerse algo. Hay cosas en su vida que no se arreglan cortando mejor: se arreglan no incorporándolas. Un trato que le conviene y le ensucia. Una información sobre alguien que usted podría usar. Una discusión que ganaría. Nada de eso se eleva por mucha intención que uno le ponga, y la ley del nervio no admite excepciones de lugar: dentro y fuera, con Templo y sin Templo, derecha e izquierda. Lo que uno deja, lo deja en todas partes o no lo deja.`,
      },
      {
        p: `Y contemple que ese nervio viene de una herida. La única prohibición que nació de una noche de lucha es la que se recuerda en la mesa, y la Torá la escribió «hasta el día de hoy», de modo que el gesto de apartarla es a la vez una memoria y una señal de que la cosa no terminó. Hay heridas que no se cierran y aun así organizan una vida entera alrededor de un acto de delicadeza. Y hay una cosa más, para quien la quiera: en el ave no se aplica, porque el ave no tiene esa cuenca. A usted le dolió ahí porque usted se apoyaba ahí.`,
      },
      {
        p: `Y por último, contemple lo que no se cerró. En el primer capítulo, una voz dice que mostrar el cuchillo a otro es una cuestión de honra y que el competente puede revisar su propio filo; otra excomulga al que no lo somete. En el séptimo, Rabí Meir dice que los matarifes no son de fiar en lo que hay que quitar, y los Sabios dicen que sí. Dos extremos del tratado, la misma pregunta, y las dos veces el Talmud dividido. Hay una razón para que no se cerrara: las dos posiciones dicen algo verdadero. Quien insiste en que lo revisen todo, siempre, construye una comunidad que no se fía de nadie; quien insiste en que ya sabe, construye un hombre al que nadie le puede decir nada. El hueco se dejó abierto a propósito, y la única manera de vivir dentro de él es inclinarse, cada vez, en contra del propio interés.`,
      },
      {
        p: `Y mientras usted contempla todo esto, acuérdese del final de la historia: el hombre sancionado no alegó su inocencia. Dijo que de él dependían niños. Y el sabio que fue a revisar su cuchillo encontró un filo hermoso y lo devolvió al trabajo diciendo que estaba haciendo el encargo del que lo había sancionado. La revisión no está ahí para dejar gente afuera. Está ahí para que se pueda volver a entrar.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה — Acción ──────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta, hoy, y sale directamente del texto.",
    etiqueta: "Alise un diente. Hoy. Uno solo.",
    texto: `Es lo que dice la mishná y es lo que se puede hacer esta tarde: la hoz que estrangulaba se convierte en cuchillo cuando le alisan los dientes. No cuando se cambia de herramienta. Cuando se le quita una punta.`,
    bloques: [
      {
        p: `Concretamente. Tome la última conversación en la que usted tenía razón y la persona se quedó herida —la tiene presente, apareció sola mientras leía—, y busque en lo que dijo una sola frase que fuera la punta. No el tema, no la posición: la frase. Suele ser corta y suele ser la que uno recuerda con cierto orgullo. Escríbala tal como la dijo y escriba al lado cómo se diría lo mismo sin la punta. Lo mismo, no algo más suave: lo mismo. Si al quitarle la punta el contenido desaparece, entonces el contenido era la punta, y ahí tiene un dato sobre usted.`,
      },
      {
        p: `Y luego, hoy, haga una de estas tres cosas, la que le resulte más difícil, que será la que haga falta.`,
      },
      {
        etiqueta: "Someta el filo.",
        p: `Si tiene algo que decirle a alguien —una corrección, una verdad pendiente, un mensaje que lleva días redactando en la cabeza—, antes de decirlo pásele el texto a una persona que tenga permiso para decirle que no. Que no sea la que siempre le da la razón. Pregúntele una sola cosa: «¿esto corta o rasga?». Y si dice que rasga, no lo discuta: alíselo. Nadie certifica su propio filo, y no porque sea incapaz de verlo, sino porque el instrumento con el que se revisa es el mismo que está en duda.`,
      },
      {
        etiqueta: "O cambie la uña.",
        p: `Tome un juicio que usted lleva años sosteniendo sobre alguien cercano —«es un desordenado», «no cambia», «siempre hace lo mismo»— y revíselo con otra uña: pregúntele a alguien que quiera a esa persona y no comparta su diagnóstico. No para que lo convenza. Para comprobar si su criterio todavía detecta algo o si el defecto de la otra persona ya entra justo en el hueco del suyo.`,
      },
      {
        etiqueta: "O extraiga el nervio.",
        p: `Elija una sola cosa que usted podría tomar hoy, que está a su alcance y que nadie le reprocharía, y no la tome. El último comentario en una discusión que ya ganó. El dato sobre alguien que le daría ventaja. La respuesta que tiene preparada. No porque esté prohibida: porque hay cosas que no se elevan incorporándolas. Y si quiere la versión más pequeña y más difícil, la que propone la jasidut con lo permitido: tenga hambre una hora más y estudie en esa hora.`,
      },
      {
        etiqueta: "Y la midá para trabajar esta semana:",
        p: `בְּדִיקָה (bedicá), revisión. No sospecha, que es revisar sin intención de encontrar nada nuevo; revisión, que es mirar despacio, con el corazón puesto, y aceptar de antemano que puede aparecer algo. לְאַט, despacio. Dos veces: antes de hablar y después de hablar, como el cuchillo, que se revisa antes del acto y otra vez cuando el acto ya está hecho.`,
      },
    ],
  },

  // ── 6. חֲתִימָה — El sello ────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "La idea principal.",
        texto: `Un tratado entero del Talmud se ocupa de la carne que nunca va a subir a ningún altar, se llama «Lo común» y está archivado en el orden de las cosas sagradas. En su primer capítulo establece que la melladura que invalida el cuchillo de un carnicero se mide con la misma vara que la melladura que invalida el altar: lo que alcance a engancharse una uña. El motivo por el que esa melladura no figuraba en la lista original de melladuras del Templo era puramente temático —«no estaba hablando de lo común»—, de modo que la medida siempre fue la misma. Lo ordinario no tiene un estándar propio más indulgente. Tiene el mismo estándar y menos testigos.`,
      },
      {
        etiqueta: "El insight clave.",
        texto: `Lo que descalifica un filo no es la aspereza: es el enganche. La ley distingue dos melladuras con una sola diferencia física —si tiene punta por los dos lados o por uno— y de ahí salen dos destinos opuestos: la que agarra invalida el acto, la que no agarra lo deja pasar. Y Rashi explica por qué, en seis palabras que cambian la pregunta moral entera: las puntas de la melladura «rasgan y no cortan». Rasgar no es cortar con menos arte; es otra acción, y la ley no la reconoce como degüello aunque el resultado se parezca. De ahí que «lo que dije era verdad» no sea una defensa. Y el nombre de la melladura que invalida lo dice todo: אוֹגֶרֶת, la que recoge hacia dentro de sí. El filo se arruina en el instante en que el que separa empieza a sacar algo de separar.`,
      },
      {
        etiqueta: "El insight espiritual.",
        texto: `El mejor de los tres grados de cuchillo no es el que nunca se melló. Rava enumera tres estados y el único apto desde el principio es עוֹלֶה וְיוֹרֵד, «sube y baja», que —según Rashi— es un filo que tuvo una melladura grande y al que se le alisaron las puntas con la piedra hasta dejar una hondonada suave. Y la mishná dice lo mismo del instrumento peor de todos: la hoz que estrangula, si le alisan los dientes, «he aquí que es como un cuchillo». No se premia al que no tiene historia: se premia al que fue trabajado. El hierro, además, nunca podrá tocar el altar —fue creado para acortar los días del hombre, y el altar para alargarlos—, y es exactamente por eso que se le exige la integridad del altar: a la herramienta que acorta se le pide la medida de lo que alarga, precisamente porque nunca va a ocupar su lugar.`,
      },
      {
        etiqueta: "El insight del oficio entero.",
        texto: `El tratado tiene dos manos. Con una corta: el filo íntegro que separa lo que puede subir de lo que hay que dejar, y la carne comida como se debe asciende «como una ofrenda de elevación y como un sacrificio». Con la otra aparta: en la cuenca del muslo hay un nervio que no se eleva de ninguna manera, y se extrae. Lo que no se eleva no cambia de categoría por una buena intención — el mismo libro que hace subir la carne grasa dictamina que el alimento prohibido no asciende ni cuando se comió sin saberlo y por el Cielo, y pone la burla y la lengua mala en esa misma lista. Un servicio hecho solo de incorporaciones es un apetito con vocabulario religioso. Y la ley de lo que se aparta es, significativamente, la única del tratado que no distingue entre lo común y lo consagrado: se aplica dentro y fuera de la Tierra, con Templo y sin Templo, en el muslo derecho y en el izquierdo. De lo que uno no incorpora, no se toma vacaciones.`,
      },
      {
        etiqueta: "La aplicación práctica.",
        texto: `Nadie certifica su propio filo, y la halajá explica por qué con una precisión brutal: la uña con la que se revisa se mella de tanto revisar, y una uña mellada deja de sentir, porque el defecto del cuchillo entra justo en el hueco del defecto de la uña. Por eso hay que cambiar de uña a mitad de la revisión. Y por eso un hombre puede revisar dos y tres veces sin encontrar una melladura fina y encontrarla a la tercera, porque la última vez «preparó su corazón»: el tacto mide tanto como la atención con que se usa. La revisión, además, no está hecha para expulsar. El matarife sancionado del folio 18a no alegó inocencia —dijo que de él dependían niños—, y el sabio que revisó su cuchillo lo encontró hermoso, lo devolvió al oficio y explicó que al hacerlo estaba cumpliendo el encargo del maestro que lo había sancionado. Se revisa para poder volver a entrar.`,
      },
      {
        etiqueta: "El hueco que queda.",
        texto: `La pregunta aparece dos veces en Julín y las dos veces sin resolver. En el primer capítulo, Rabí Yojanán dice que mostrarle el cuchillo al sabio se instituyó únicamente por la honra del sabio —el degollador competente puede revisar su propio filo—, y Rav Huná excomulga al que no lo somete, y Rava lo destituye y hace pregonar que su carne no se come. En el séptimo, sobre lo que hay que quitar: «y los matarifes no son de fiar respecto del nervio del muslo, palabras de Rabí Meir; y los Sabios dicen: sí son de fiar». La halajá posterior tampoco cerró la pregunta: dice que los sabios acabaron perdonando su honra y nombrando hombres conocidos para el oficio. La honra se perdonó; la verificación, nunca.`,
      },
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  //  Los cuatro puentes del markdown verificado. Las cuatro páginas existen:
  //  /misterio/machlokot-koraj, /misterio/porcion-de-esav, /misterio/katonti y
  //  /misterio/arca-no-ocupa-lugar. Comprobado antes de dejarlos puestos.
  hemshej: [
    "¿Y cuando la verdad misma es el arma, y el que la usa tiene razón? → {{study:machlokot-koraj|Koraj, cuando la verdad se vuelve un arma}}",
    "La misma noche en que le tocaron el muslo, Yaakov devolvió lo que había tomado ocho veces. ¿Qué expediente se cerró en esa orilla? → {{study:porcion-de-esav|El hermano que tomó ocho veces}}",
    "Antes de la lucha rezó, y se midió a sí mismo con una palabra que la Biblia conjuga cuatro veces. → {{study:katonti|Me he vuelto pequeño}}",
    "Si la medida del filo es la medida del altar, ¿qué medía exactamente aquel lugar? → {{study:arca-no-ocupa-lugar|El Arca que no ocupaba lugar}}",
  ],

  ctaRef: "Chullin 17b",
};
