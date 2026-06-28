"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Componentes ───────────────────────────────────────────────────────────────

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="transition-all duration-1000"
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  he, es, fa: faLabel, fa_active, color,
}: {
  he: string; es: string; fa: string; fa_active: boolean; color: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="hebrew text-2xl font-bold" style={{ color, textShadow: `0 0 10px ${color}66` }}>
        {he}
      </span>
      <div className="h-px flex-1 opacity-20" style={{ background: color }} />
      <span className="font-cinzel text-xs uppercase tracking-[0.3em]" style={{ color: `${color}99` }}>
        {fa_active ? faLabel : es}
      </span>
    </div>
  );
}

function PullQuote({
  he, es, fa: faText, source, fa_active, color,
}: {
  he: string; es: string; fa: string; source: string; fa_active: boolean; color: string;
}) {
  return (
    <Section>
      <div className="my-9 rounded-2xl border p-6" style={{ borderColor: `${color}35`, background: `${color}07` }}>
        <p className="hebrew mb-3 text-right text-lg leading-relaxed" style={{ color: `${color}cc` }} dir="rtl">
          {he}
        </p>
        <p className="mb-1 text-sm italic leading-relaxed text-parchment/80" dir={fa_active ? "rtl" : "ltr"}>
          {fa_active ? `«${faText}»` : `«${es}»`}
        </p>
        <p className="font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
          — {source}
        </p>
      </div>
    </Section>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────

export default function PinjasPage() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const C = "#c94a2e";
  const bg = "#05050a";
  const navBg = "rgba(5,5,10,0.9)";

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="always-dark min-h-screen" style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md"
        style={{ background: navBg }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterios" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            {fa ? "← همهٔ مطالعات" : "← Todos los estudios"}
          </Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button
              onClick={() => router.push("/estudio?ref=Numbers.25.1")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              {fa ? "شروع مطالعه ←" : "Comenzar estudio →"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO ── */}
        <Section>
          <div className="mb-12 text-center">
            <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em]" style={{ color: `${C}88` }}>
              {fa ? "بامیدبار ۲۵:۱–۱۳ · پاراشات پینحاس" : "Bamidbar 25:1–13 · Parashat Pinjás"}
            </p>
            <p
              className="hebrew mb-3 font-bold leading-tight"
              style={{ fontSize: "clamp(40px, 10vw, 64px)", color: C, textShadow: `0 0 36px ${C}, 0 0 14px ${C}88` }}
            >
              פִּינְחָס
            </p>
            <h2 className="mb-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
              {fa ? "رازِ آتش" : "El Misterio del Fuego"}
            </h2>
            <p className="font-cinzel text-xs uppercase tracking-widest text-parchment/50">
              {fa ? "پینحاس · تیکونِ مار · بریت‌شالوم" : "Pinjás · Tikún de la Serpiente · Brit Shalom"}
            </p>
          </div>
        </Section>

        {/* ── GANCHO CENTRAL ── */}
        <PullQuote
          he="וַיִּקַּח פִּינְחָס בֶּן אֶלְעָזָר … אֶת הָרֹמַח בְּיָדוֹ"
          es="«Y tomó Pinjás hijo de Eleazar … la lanza en su mano» — pero la lanza fue una oración."
          fa="«و پینحاس پسرِ الِعازار … نیزه را در دستش گرفت» — اما نیزه یک دعا بود."
          source={fa ? "بامیدبار ۲۵:۷" : "Bamidbar 25:7"}
          fa_active={fa}
          color={C}
        />

        {/* ── DESCRIPCIÓN BREVE ── */}
        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "آنچه در پاراشات پینحاس رخ داد، بیش از یک کنشِ آنی بود. آتشِ پینحاس با آتشِ نداو و اَویهو پیوند دارد، با مارِ عدن، و با صلحی که سرانجام جهان را خواهد پوشاند — بریت‌شالوم."
                : "Lo que ocurrió en Parashat Pinjás fue más que un acto instantáneo. El fuego de Pinjás se conecta con el fuego de Nadav y Avihu, con la serpiente del Edén, y con la paz que cubrirá finalmente al mundo — el brit shalom."}
            </p>
          </div>
        </Section>

        {/* ── SECCIÓN: תַּרְגּוּם ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="תַּרְגּוּם" es="Traducción" fa="ترجمه" fa_active={fa} color={C} />
            <div className="space-y-6 text-sm leading-relaxed text-parchment/80">

              <div className="rounded-xl border p-5" style={{ borderColor: `${C}25`, background: `${C}05` }}>
                <p className="hebrew mb-2 text-right text-base leading-relaxed" style={{ color: `${C}cc` }} dir="rtl">
                  וַיַּרְא פִּינְחָס בֶּן-אֶלְעָזָר בֶּן-אַהֲרֹן הַכֹּהֵן וַיָּקָם מִתּוֹךְ הָעֵדָה וַיִּקַּח רֹמַח בְּיָדוֹ׃ וַיָּבֹא אַחַר אִישׁ-יִשְׂרָאֵל אֶל-הַקֻּבָּה וַיִּדְקֹר אֶת-שְׁנֵיהֶם אֵת אִישׁ יִשְׂרָאֵל וְאֶת-הָאִשָּׁה אֶל-קֳבָתָהּ וַתֵּעָצַר הַמַּגֵּפָה מֵעַל בְּנֵי יִשְׂרָאֵל׃
                </p>
                <p className="text-xs text-parchment/50 italic mb-2">Bamidbar 25:7-8</p>
                <p className="text-parchment/75 italic">
                  «Y vio Pinjás, hijo de Elazar, hijo de Aharon el Kohen, y se levantó de en medio de la congregación y tomó una lanza en su mano. Y entró detrás del hombre israelita a la cámara y los atravesó a ambos, al hombre israelita y a la mujer por su vientre, y la plaga se detuvo sobre los hijos de Israel.»
                </p>
              </div>

              <div className="rounded-xl border p-5" style={{ borderColor: `${C}25`, background: `${C}05` }}>
                <p className="hebrew mb-2 text-right text-base leading-relaxed" style={{ color: `${C}cc` }} dir="rtl">
                  לָכֵן אֱמֹר הִנְנִי נֹתֵן לוֹ אֶת-בְּרִיתִי שָׁלוֹם׃ וְהָיְתָה לּוֹ וּלְזַרְעוֹ אַחֲרָיו בְּרִית כְּהֻנַּת עוֹלָם תַּחַת אֲשֶׁר קִנֵּא לֵאלֹהָיו וַיְכַפֵּר עַל-בְּנֵי יִשְׂרָאֵל׃
                </p>
                <p className="text-xs text-parchment/50 italic mb-2">Bamidbar 25:12-13</p>
                <p className="text-parchment/75 italic">
                  «Por tanto, di: He aquí que yo le doy mi alianza de paz. Y será para él y para su descendencia después de él una alianza de sacerdocio eterno, por cuanto tuvo celo por su Dios y expió por los hijos de Israel.»
                </p>
              </div>

              <div className="rounded-xl border p-4" style={{ borderColor: `${C}15`, background: `${C}03` }}>
                <p className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: `${C}88` }}>
                  El contexto
                </p>
                <p>
                  El acto de Pinjás no surge en el vacío. Los versículos que lo preceden narran la caída de Israel en Baal Peor: el pueblo comenzó a fornicar con las hijas de Moav, a inclinarse ante sus ídolos, a comer de sus sacrificios. Veinticuatro mil israelitas murieron en esa plaga. En ese momento de crisis máxima —Moshe y los jefes llorando a la puerta del Mishkán— Zimrí ben Salú, príncipe de la tribu de Shimón, tomó a Cozbi bat Tzur, princesa midianita, y los introdujo descaradamente ante toda la congregación. Fue entonces que Pinjás actuó.
                </p>
              </div>

            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: מְפָרְשִׁים ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="מְפָרְשִׁים" es="Comentaristas" fa="مفسران" fa_active={fa} color={C} />
            <div className="space-y-8 text-sm leading-relaxed text-parchment/80">

              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-3" style={{ color: `${C}cc` }}>
                  Rashi — Rabbi Shlomó Yitzhakí (1040–1105)
                </h4>
                <p className="mb-3">
                  Rashi subraya el estado de parálisis colectiva: «Se levantó de en medio de la congregación» — porque todos estaban llorando y no sabían qué hacer. La halajá que se olvidó en ese instante era:{" "}
                  <span className="hebrew" dir="rtl">הַבּוֹעֵל אֲרַמִּית קַנָּאִים פּוֹגְעִין בּוֹ</span>{" "}
                  — «El que yace con una mujer aramea, los celosos pueden matarlo.»
                </p>
                <p>
                  El olvido fue providencial: si Moshe hubiera recordado la halajá, habría sido él quien actuara, y Pinjás no habría recibido su recompensa. El acto fue legal, puntual, sin precedente ni repetición posible. Es una categoría de santidad única, no un modelo de violencia.
                </p>
              </div>

              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-3" style={{ color: `${C}cc` }}>
                  Ramban — Najmánides (1194–1270)
                </h4>
                <p className="mb-3">
                  El Ramban pone el acento en{" "}
                  <span className="hebrew" dir="rtl">בְּקַנְאוֹ אֶת-קִנְאָתִי</span>{" "}
                  — «al celar mi celo.» La repetición no es un accidente gramatical: Pinjás no actuó con su propio celo sino que captó el celo de Dios y lo hizo suyo. El Ramban entiende el acto como un <em>kiddush Hashem</em> activo: en la misma medida en que el pecado fue una profanación pública, la corrección tuvo que ser pública.
                </p>
                <p>
                  El brit shalom no fue el pago por un servicio ya prestado — fue la consecuencia natural de un alma que alcanzó ese nivel. El texto dice «le doy mi alianza» en futuro (<em>noten</em>), no en pasado. El brit shalom no es un premio externo; es la descripción de lo que Pinjás ya era en ese instante.
                </p>
              </div>

              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-3" style={{ color: `${C}cc` }}>
                  Ibn Ezra (1089–1167)
                </h4>
                <p className="mb-3">
                  Ibn Ezra observa que la alianza de paz es inusual porque normalmente se firma <em>entre</em> dos partes, y aquí la firma unilateralmente el Eterno. Esta asimetría expresa que el brit shalom no es un contrato sino una <em>incorporación</em> de Pinjás al nivel de la perpetuidad divina. Pinjás entra en el tiempo de Dios.
                </p>
                <p>
                  Ibn Ezra también señala la rareza de «brit kehunat olam»: Pinjás ya era descendiente de Aharon. ¿Por qué necesita una alianza nueva para el sacerdocio? Esta pregunta abre una puerta que el Talmud y el Arizal responderán.
                </p>
              </div>

              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-3" style={{ color: `${C}cc` }}>
                  Abarbanel — Don Yitzhak Abarbanel (1437–1508)
                </h4>
                <p className="mb-3">
                  El Abarbanel desarrolla la paradoja moral: ¿cómo puede un acto de violencia generar una alianza de <em>paz</em>? Responde: porque la paz no es la ausencia de conflicto sino la presencia de orden. Pinjás no añadió violencia al sistema; interrumpió la espiral de autodestrucción que ya estaba en marcha. La lanza fue el escalpelo, no la herida.
                </p>
                <p>
                  El Abarbanel ve a Zimrí como el prototipo del nihilismo seductor: su nombre tiene la raíz <em>zamer</em> (זמר), «melodía» — era un hombre de seducción verbal e ideológica. Cozbi no era una concubina: era una herramienta de guerra espiritual.
                </p>
              </div>

              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-3" style={{ color: `${C}cc` }}>
                  Malbim — Rabbi Meir Leibush ben Yechiel Michel (1809–1879)
                </h4>
                <p className="mb-3">
                  El Malbim lee{" "}
                  <span className="hebrew" dir="rtl">וַיָּקָם מִתּוֹךְ הָעֵדָה</span>{" "}
                  como una declaración ontológica: Pinjás se separó no físicamente sino en nivel de conciencia. Mientras todos estaban atrapados en la reacción emocional —el llanto, la perplejidad, la impotencia— Pinjás se elevó a una percepción más clara. No actuó desde la ira; actuó desde la comprensión.
                </p>
                <p>
                  La especificación «en su mano» (
                  <span className="hebrew" dir="rtl">בְּיָדוֹ</span>
                  ) es redundante a menos que quiera decir algo. En la Cabalá, la mano es el instrumento que transforma la intención en manifestación. La lanza en la mano de Pinjás fue la intención divina haciéndose concreta.
                </p>
              </div>

              {/* Arizal */}
              <div className="rounded-xl border p-5" style={{ borderColor: `${C}30`, background: `${C}05` }}>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-1" style={{ color: C }}>
                  Arizal — Sha&apos;ar HaGilgulim (Hakdamot 32–33)
                </h4>
                <p className="text-xs text-parchment/50 italic mb-5">
                  Rav Yitzhak Luria Ashkenazi (1534–1572). Transmitido por Rav Jaim Vital.
                </p>

                <p className="mb-3 font-medium" style={{ color: `${C}cc` }}>
                  Las cuatro componentes del alma de Pinjás
                </p>
                <p className="mb-4">
                  El Arizal revela la arquitectura invisible del acto: no fue solo un hombre quien actuó aquella noche. Fueron cuatro componentes de alma, dos de las cuales pertenecían a almas que llevaban décadas esperando esta oportunidad.
                </p>

                <ol className="list-decimal list-inside space-y-3 mb-6 text-parchment/75 ml-1">
                  <li>
                    <strong className="text-parchment/90">Su propio Nefesh</strong> — formado por chispas del alma de Yosef (quien resistió la seducción sexual) y de Jetró (maestro del juicio justo). Esta combinación «resistencia a la seducción» + «juicio justo» es la base natural del alma de Pinjás.
                  </li>
                  <li className="mt-2">
                    <strong className="text-parchment/90">El Nefesh de Nadav y Avihu</strong> — no como gilgul sino como <em>ibur</em> (impregnación temporal). Sha&apos;ar HaGilgulim, Hakdamá 33, folio 2b: «Nadav y Avihu vinieron a él en ibur en el incidente con Zimri.» Sus almas no habitaban permanentemente el cuerpo de Pinjás — entraron como huéspedes en el alma de un vivo, en el momento exacto en que podían rectificarse.
                  </li>
                  <li className="mt-2">
                    <strong className="text-parchment/90">Una chispa del alma de Eliyahu de la tribu de Gad</strong> — chispa «puente» necesaria técnicamente para que las almas pudieran coexistir armónicamente en un solo ser.
                  </li>
                  <li className="mt-2">
                    <strong className="text-parchment/90">Una chispa del alma de Eliyahu de la tribu de Binyamín</strong> — segundo conector, en una dimensión diferente del alma.
                  </li>
                </ol>

                <p className="text-xs text-parchment/55 italic mb-6">
                  Es esta arquitectura cuádruple la que hace que el nombre פינחס en gematría sea 208 = 4 × 52, donde 52 = אליהו (Eliyahu). Las cuatro dimensiones del alma que Pinjás porta son las cuatro dimensiones del Eliyahu que llegará a ser.
                </p>

                <p className="mb-3 font-medium" style={{ color: `${C}cc` }}>
                  ¿Qué es el ibur? La diferencia crucial con el gilgul
                </p>
                <p className="mb-5">
                  El gilgul (גִּלְגּוּל) es la reencarnación clásica. El <em>ibur</em> (עִבּוּר) es diferente: el alma de un difunto entra temporalmente en el alma de un vivo para completar una misión específica. El alma del vivo no es reemplazada ni suprimida — es complementada. Es como si una llama encendiera otra sin apagarse.
                </p>

                <p className="mb-3 font-medium" style={{ color: `${C}cc` }}>
                  ¿Por qué Nadav y Avihu necesitaban este tikún?
                </p>
                <p className="mb-3">
                  El Arizal y el Zohar (Acharei Mot) convergen: sus almas provenían «del lado bueno de Kayin» — heredaban la energía ardiente de Gevurá, el fuego de la línea izquierda. Pero Kayin cargaba la <em>zuhama</em> (טֻמְאָה, impureza) de la serpiente primordial.
                </p>
                <p className="mb-3">
                  El error fue el{" "}
                  <span className="hebrew" dir="rtl">אֵשׁ זָרָה</span>{" "}
                  (<em>eish zarah</em>) — el «fuego ajeno» introducido en el Mishkán (Vayikra 10:1-2). Estaban tan convencidos de la pureza de su intención que pensaron que su fuego interior era equivalente al mandato divino. Rompieron el canal de <em>Yesod</em>: el fuego salió por donde debía entrar; la dirección se invirtió.
                </p>
                <p className="mb-5">
                  Murieron también{" "}
                  <span className="hebrew" dir="rtl">בְּלוֹ בָנִים</span>{" "}
                  (<em>belo vanim</em>, sin hijos). El Yesod no transmitió. El ciclo no se cerró — quedó suspendido, esperando.
                </p>

                <p className="mb-3 font-medium" style={{ color: `${C}cc` }}>
                  Pinjás no era Kohen cuando actuó — Talmud Babilónico, Zevajim 101b
                </p>
                <p className="mb-3">
                  El Talmud registra: «Pinjás no se convirtió en Kohen hasta que mató a Zimrí.» Pinjás nació antes de la consagración oficial del sacerdocio; sus abuelos y tíos fueron consagrados, pero él quedó fuera. El versículo 25:13 dice que la brit kehuna olam <em>le será</em> — en ese momento comenzaba, no antes.
                </p>
                <p className="mb-5">
                  Pinjás actuó desde afuera del sacerdocio y fue incorporado al sacerdocio por el acto mismo. La ironía es perfecta: el que no era Kohen consuma lo que los Kohanim no pudieron terminar.
                </p>

                <p className="mb-3 font-medium" style={{ color: `${C}cc` }}>
                  El destino posterior del ibur: Shmuel HaNavi
                </p>
                <p>
                  Cuando Pinjás cometió un error severo en el asunto de la hija de Jefté (Shoftim 11) — no liberó a Jefté del voto por orgullo — el ibur de Nadav y Avihu fue removido de él. Sus almas pasaron entonces a Shmuel HaNavi. En Shmuel encontraron el sacerdote que sí completó su misión con total entrega, y fue a través de Shmuel que ese aspecto del alma de Nadav y Avihu pudo finalmente descansar.
                </p>
              </div>

            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: פרד״ס ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="פרד״ס" es="PaRDeS" fa="پَردِس" fa_active={fa} color={C} />
            <div className="space-y-10 text-sm leading-relaxed text-parchment/80">

              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-3" style={{ color: `${C}cc` }}>
                  פְּשָׁט — Pshat: La Lectura Directa
                </h4>
                <p className="mb-3">
                  La plaga no se detuvo por la plegaria de Moshe. No se detuvo por el llanto de los ancianos. Se detuvo por un acto físico, concreto, de consecuencias inmediatas. Hay momentos en la historia en que el Cielo espera una acción terrena específica para abrir la puerta de la misericordia. Dios no interviene porque Pinjás le suplica; interviene porque Pinjás actúa.
                </p>
                <p>
                  La respuesta divina es también concreta: una alianza. No solo un perdón — una relación permanente y estructurada que define el futuro de Pinjás y su linaje para siempre. El texto establece que hay categorías de acción cuyas consecuencias trascienden la vida del individuo.
                </p>
              </div>

              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-3" style={{ color: `${C}cc` }}>
                  רֶמֶז — Remez: La Lectura Alegórica
                </h4>
                <p className="mb-3">
                  La vav de פינחס está escrita con una <em>vav ketia</em> (וָ״ו קְטִיעָה) — una vav «cortada» en los rollos de la Torá más precisos. Esta irregularidad no es un error; es una señal deliberada. La vav (ו) es la letra del <em>Yesod</em> — el canal de continuidad y transmisión. Una vav cortada señala que el Yesod estaba incompleto, quebrado.
                </p>
                <p className="mb-3">
                  El nombre mismo dice la paradoja: פינחס es el portador de la continuidad (vav), pero esa continuidad tiene una fractura. La fractura no es un defecto; es la marca del trabajo que vino a hacer. La vav cortada es el diagnóstico, y el brit que recibe es el sello de la reparación.
                </p>
                <p>
                  La alianza se llama <em>brit shalom</em> — «alianza de paz» — en el mismo pasaje donde acaba de matar. El Zohar (Pinjás 217a): la paz verdadera no es la ausencia de conflicto sino la integración de las fuerzas opuestas bajo el reinado de lo sagrado. Pinjás no trae paz <em>a pesar</em> del acto sino <em>a través</em> del acto.
                </p>
              </div>

              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-3" style={{ color: `${C}cc` }}>
                  דְּרָשׁ — Drash: La Lectura Homilética
                </h4>
                <p className="mb-3">
                  El <strong>Baal Shem Tov</strong> enseñó que la transformación de la energía del mal no ocurre por la fuerza sino por la elevación interior. La fuerza puede suprimir; solo la santidad puede transformar. El Besht enseñó que Pinjás no «venció» a la serpiente — la convirtió. Su <em>kinah</em> (קִנְאָה) no fue ira personal sino el amor al brit llevado a su temperatura máxima.
                </p>
                <p className="mb-3">
                  El Drash observa Tehillim 106:30:{" "}
                  <span className="hebrew" dir="rtl">וַיַּעֲמֹד פִּינְחָס וַיְפַלֵּל וַתֵּעָצַר הַמַּגֵּפָה</span>{" "}
                  — «Y se levantó Pinjás y rogó (<em>vayefalel</em>), y la plaga se detuvo.» La raíz פלל significa interceder, orar. El Talmud (Sanhedrín 82b): <em>assá pelilot im kono</em> — «pledeó un caso ante su Creador.» La lanza de Pinjás fue una oración.
                </p>
                <p>
                  Cuando el cuerpo actúa desde el alma, y el alma actúa desde el Creador, no hay separación entre la plegaria y la acción. Pinjás no oró y luego actuó, ni actuó y luego oró. Oró con el cuerpo; actuó con el alma.
                </p>
              </div>

              <div>
                <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] mb-4" style={{ color: `${C}cc` }}>
                  סוֹד — Sod: La Lectura Mística
                </h4>

                <p className="mb-3 font-medium text-parchment/70">La gematría del nombre: 208</p>
                <div className="rounded-xl border p-4 mb-5 text-center" style={{ borderColor: `${C}20`, background: `${C}06` }}>
                  <p className="hebrew text-xl mb-1" style={{ color: C }} dir="rtl">
                    פ(80) + י(10) + נ(50) + ח(8) + ס(60) = 208
                  </p>
                  <p className="text-xs text-parchment/50">פינחס</p>
                </div>

                <p className="mb-3">
                  <strong style={{ color: `${C}cc` }}>208 = יצחק (Yitzhak):</strong> El Ramá de Fano (<em>Gilgulei Neshamot</em>) enseña que Yitzhak se reencarnó en Pinjás. Yitzhak es el arquetipo de <em>Gevurá</em> — el rigor preciso, el juicio que no cede. El rigor de Yitzhak en el Akeda y el rigor de Pinjás en Baal Peor son el mismo Gevurá en contextos distintos.
                </p>
                <p className="mb-3">
                  <strong style={{ color: `${C}cc` }}>208 = 4 × 52, y 52 = אליהו (Eliyahu):</strong> El Zohar (Pinjás 219b):{" "}
                  <span className="hebrew" dir="rtl">פינחס הוא אליהו</span>{" "}
                  — «Pinjás es Eliyahu.» La identidad Pinjás-Eliyahu no es metafórica; es la misma chispa de alma en distintos momentos del tiempo.
                </p>
                <p className="mb-6">
                  <strong style={{ color: `${C}cc` }}>208 = 8 × 26, y 26 = יהוה:</strong> El nombre de Pinjás contiene ocho veces el valor del Nombre sagrado. El número ocho trasciende el ciclo de siete días de la naturaleza — es el <em>olam haba</em> entrando en el <em>olam hazé</em>.
                </p>

                <p className="mb-3 font-medium text-parchment/70">El nombre como tikún: פי + נחס/נחש</p>
                <p className="mb-3">
                  El nombre פינחס se lee en dos partes: <strong>פי</strong> (Pi) = «boca de» + <strong>נחס</strong>, casi idéntico a נחש (<em>najash</em>, serpiente). La única diferencia: el nombre usa <strong>ס</strong> (Samej = 60) donde la palabra «serpiente» usa <strong>ש</strong> (Shin = 300).
                </p>
                <p className="mb-3">
                  La <strong>Shin</strong> (ש): tres llamas que salen sin contención, el fuego que se derrama — el <em>eish zarah</em> de Nadav y Avihu. El <strong>Samej</strong> (ס): el círculo perfecto, el recipiente cerrado. Contiene la energía sin suprimirla; la encierra dentro de la brit, dentro de un borde que permite que el fuego se exprese sin destruir.
                </p>
                <p className="mb-6">
                  El nombre de Pinjás dice, en su nivel más profundo: <strong>«la boca de la serpiente sellada»</strong> — la energía del <em>najash</em>, el fuego de Kayin, encerrada dentro del círculo de la alianza, transformada en recipiente.
                </p>

                <div className="rounded-xl border p-4 mb-6" style={{ borderColor: `${C}25`, background: `${C}05` }}>
                  <p className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: `${C}88` }}>
                    La gematría central
                  </p>
                  <p className="hebrew text-center text-xl mb-2" style={{ color: C }} dir="rtl">
                    נחש = 358 = משיח
                  </p>
                  <p className="text-xs text-center italic text-parchment/60">
                    La misma energía que en la serpiente del Edén introdujo la muerte — cuando se rectifica completamente — se convierte en la energía del Mashíaj. Pinjás, cuyo nombre dice «boca de la serpiente sellada», es el primer portador visible de este principio en la historia de la Torá.
                  </p>
                </div>

                <p className="mb-3 font-medium text-parchment/70">El patrón del acto como inversión de la serpiente</p>
                <p className="mb-3">
                  La serpiente del Edén usó la boca para seducir: «¿Acaso dijo Dios?» — la pregunta que introduce la duda. Zimrí (<em>zemer</em> = melodía) y Cozbi (<em>kozev</em> = mentira) reproducen exactamente el patrón: seducción por sonidos bellos + engaño que disfraza el error de virtud. Son la serpiente en su segunda generación.
                </p>
                <p className="mb-5">
                  Pinjás invierte el patrón. Su boca no sedujo; intercedió. Su lanza fue la palabra exacta dicha en el momento exacto ante el Creador. Y <em>vateatzar hamagefá</em> — la plaga se detuvo. La boca de la serpiente rectificada tiene el poder de detener lo que la boca de la serpiente despertó.
                </p>

                <p className="mb-3 font-medium text-parchment/70">Baal HaSulam: el kelí que recibe el Or</p>
                <p>
                  El Baal HaSulam (<em>Panim Meirot uMasbirot</em>) enseña que la rectificación de Kayin no ocurre por la eliminación de la línea izquierda sino por la creación del <em>kelí</em> adecuado — el recipiente que puede recibir el <em>Or Makif</em> (la Luz Circundante) sin romperse. Nadav y Avihu tenían el Or pero el kelí era insuficiente. La brit — la alianza, el círculo del Samej — es precisamente ese borde. La brit kehunat olam es la formalización de ese kelí: un recipiente eterno para una llama eterna.
                </p>
              </div>

            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: הִתְבּוֹנְנוּת ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader
              he="הִתְבּוֹנְנוּת"
              es="Hitbonenut — Contemplación"
              fa="هیتبونِنوت — تأمل"
              fa_active={fa}
              color={C}
            />
            <div
              className="rounded-2xl border p-7 space-y-5 text-sm leading-relaxed text-parchment/80 italic"
              style={{ borderColor: `${C}20`, background: `${C}04` }}
            >
              <p className="font-cinzel text-xs uppercase tracking-widest not-italic mb-1" style={{ color: `${C}70` }}>
                Detente aquí.
              </p>
              <p>
                Hay una chispa de alma en este mundo que lleva décadas esperando una oportunidad específica para rectificarse. No lo sabe. No lo puede saber con la mente. Pero en algún momento, cuando la situación exacta se presenta, esa chispa actúa — y lo que parecía ser un acto del individuo resulta ser el cumplimiento de una deuda cósmica que se arrastraba desde antes de su nacimiento.
              </p>
              <p className="not-italic font-medium" style={{ color: `${C}88` }}>
                ¿Puedes sostener esa posibilidad sobre tu propia vida?
              </p>
              <p>
                Piensa en un momento en que actuaste con una claridad que no sabías que tenías. Un momento en que el cuerpo se movió antes de que el pensamiento terminara de formarse. Un momento en que algo más antiguo que tú tomó la decisión. ¿Qué buscaba rectificar?
              </p>
              <p>
                El Arizal nos dice que las almas se prestan entre sí. Que el ibur existe. Que no estamos solos en nuestros actos, especialmente en aquellos que parecen imposibles para quien somos. La generosidad, el valor, la claridad en el momento exacto — a veces son un don que alguien más necesitaba dar, y nosotros somos el canal.
              </p>
              <p>
                El Samej es el círculo. La serpiente rectificada se muerde la cola — no para destruirse sino para cerrarse, para volverse recipiente. ¿Dónde en tu vida necesitas cerrar el círculo? ¿Qué fuego tuyo ha estado saliendo sin dirección, quemando en lugar de iluminar?
              </p>
              <p>
                La vav cortada en el nombre de Pinjás es la fractura que todo ser humano carga. No hay persona completa. Hay personas que se levantan de en medio de la congregación y actúan con la fractura visible, sin esperar a estar completos. La alianza de paz no es el resultado de estar completo; es el resultado de actuar con integridad desde la fractura.
              </p>
              <p className="not-italic font-medium" style={{ color: `${C}88` }}>
                ¿Qué acto tuyo espera que lo hagas desde dentro de tu fractura?
              </p>
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: מַעֲשֶׂה ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader
              he="מַעֲשֶׂה"
              es="Maasé — Acción"
              fa="مَعَسه — عمل"
              fa_active={fa}
              color={C}
            />
            <div className="space-y-5 text-sm leading-relaxed text-parchment/80">
              <p className="italic text-parchment/55">
                El estudio no termina con la comprensión. La Torá misma lo dice: <em>lajén</em> — «por tanto» — la alianza es consecuencia del acto, no de la intención.
              </p>

              {[
                {
                  n: "1",
                  title: "Identifica tu eish zarah personal",
                  body: "El eish zarah de Nadav y Avihu no era maldad — era sinceridad sin autorización. Era hacer algo bueno de la manera equivocada. Hoy, antes de dormir, identifica una energía en tu vida que tiene la forma correcta pero la dirección equivocada: una dedicación real pero dirigida a lo que tú quieres que sea sagrado en lugar de lo que Dios indica que es sagrado. No tienes que resolverlo hoy. Solo nómbralo.",
                },
                {
                  n: "2",
                  title: "El brit personal — cierra un círculo abierto",
                  body: "La vav cortada del nombre de Pinjás señala un Yesod incompleto: algo que comenzaste y no terminaste, algo que comprometiste y no cumpliste, una transmisión que quedó pendiente. Elige hoy una sola cosa — una sola — y da el primer paso concreto para cerrarla. No el paso final; el primero. La alianza de paz comienza con un movimiento.",
                },
                {
                  n: "3",
                  title: "Actúa sin esperar estar completo",
                  body: "Pinjás no esperó convertirse en Kohen para actuar como Kohen. El sacerdocio le llegó a través del acto, no antes. ¿Hay algo que has estado postergando porque sientes que no estás preparado, que no tienes el título, que no eres «suficiente»? Hoy: da un paso en esa dirección. No anuncies que lo haces. Hazlo.",
                },
                {
                  n: "4",
                  title: "Devuelve el fuego a su fuente",
                  body: "La kinah de Pinjás no era por su propia reputación ni por su propia visión. Era kinati, el celo de Dios. Cuando sientas el fuego del celo, la indignación, la urgencia de actuar — pregúntate antes: ¿esto es mi fuego o el fuego de algo más grande? ¿Estoy actuando para que mi visión triunfe, o para que el Honor Divino sea restaurado? La diferencia entre Zimrí y Pinjás no fue la intensidad del fuego; fue a quién pertenecía ese fuego.",
                },
              ].map((a) => (
                <div key={a.n} className="rounded-xl border p-4" style={{ borderColor: `${C}25`, background: `${C}05` }}>
                  <p className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: C }}>
                    Acción {a.n} — {a.title}
                  </p>
                  <p>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: חֲתִימָה ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader
              he="חֲתִימָה"
              es="El Sello — Síntesis de cierre"
              fa="حَتیما — مُهرِ ختم"
              fa_active={fa}
              color={C}
            />
            <div
              className="rounded-2xl border-2 p-7 space-y-6 text-sm leading-relaxed"
              style={{ borderColor: `${C}40`, background: `${C}07` }}
            >
              <div>
                <p className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: `${C}88` }}>
                  Idea principal
                </p>
                <p className="text-parchment/85">
                  Pinjás no es el héroe de un acto de violencia. Es el punto de convergencia de cuatro líneas de alma — la suya, la de Nadav y Avihu, y dos chispas de Eliyahu — que esperaban durante décadas el momento exacto en que la energía de Kayin, el fuego de la serpiente, pudiera ser finalmente sellada dentro del círculo de la alianza.
                </p>
              </div>
              <div>
                <p className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: `${C}88` }}>
                  Insight clave
                </p>
                <p className="text-parchment/85">
                  La diferencia entre el fuego que destruye y el fuego que salva no está en la energía sino en el recipiente. Eish zarah es fuego real; kinah es el mismo fuego dentro de la brit. El Samej reemplaza a la Shin: el círculo cierra lo que las tres llamas dispersaban.
                </p>
              </div>
              <div>
                <p className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: `${C}88` }}>
                  Insight espiritual
                </p>
                <p className="text-parchment/85">
                  Las almas se prestan. El ibur existe. Cuando actúas con una claridad que te sorprende a ti mismo, es posible que no estés solo en ese acto. Las chispas que esperaban en ti su oportunidad de rectificación son parte de tu misión — y cuando las sirves, ellas te sirven a ti.
                </p>
              </div>
              <div>
                <p className="font-cinzel text-xs uppercase tracking-widest mb-2" style={{ color: `${C}88` }}>
                  Aplicación práctica
                </p>
                <p className="text-parchment/85">
                  La vav cortada es tu punto de trabajo. No la fractura como vergüenza sino la fractura como mapa. Identifica el Yesod incompleto más urgente de tu vida — la transmisión que no has hecho, el círculo que no has cerrado — y da hoy el primer paso. El brit shalom no es el destino de los perfectos. Es la recompensa de los que actúan desde su fractura con celo por algo más grande que ellos mismos.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── UMBRAL הֶמְשֵׁךְ ── */}
        <Section delay={150}>
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1 opacity-20" style={{ background: C }} />
              <span className="hebrew text-sm font-bold" style={{ color: `${C}aa` }}>הֶמְשֵׁךְ</span>
              <div className="h-px flex-1 opacity-20" style={{ background: C }} />
            </div>
            <p className="mb-6 text-center font-cinzel text-xs uppercase tracking-[0.3em] text-parchment/40">
              {fa ? "نخ را دنبال کن" : "Sigue el hilo"}
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  es: "¿Qué pasó con el alma de Eliyahu después de Pinjás? ¿Por qué fue llevado al Cielo en vida, y qué tiene que ver con el brit kehunat olam? → La ascensión de Eliyahu y el misterio del profeta que nunca murió",
                  fa: "بعد از پینحاس با روحِ الیاهو چه اتفاقی افتاد؟ چرا زنده به آسمان برده شد؟ ← صعودِ الیاهو",
                  href: "/misterio/eliyahu-hanavi",
                },
                {
                  es: "El número 358 conecta al najash con el Mashíaj. ¿Cómo opera esta transformación? ¿Qué enseñan el Zohar y el Baal HaSulam sobre la rectificación de la serpiente como condición del fin de los tiempos? → Najash igual a Mashíaj: el misterio de los 358",
                  fa: "عدد ۳۵۸ ناحاش را به ماشیاح وصل می‌کند. این تبدیل چگونه کار می‌کند؟ ← رازِ ۳۵۸",
                  href: "/misterio/358",
                },
                {
                  es: "La letra Samej (ס) es el círculo perfecto — el brit que sella la energía sin apagarla. ¿Qué enseña el estudio de la Samej sobre los receptáculos del alma y la diferencia entre contención y represión? → La Samej: el círculo que todo lo contiene",
                  fa: "حرف سامِج (ס) دایرهٔ کامل است — بریتی که انرژی را مُهر می‌زند بدون اینکه خاموشش کند.",
                  href: "/misterio/samej",
                },
                {
                  es: "Nadav y Avihu ofrecieron eish zarah y fueron consumidos. Aaron continuó. ¿Cuál es la diferencia entre el error de los hijos y la rectificación del padre? ¿Qué enseña el Arizal sobre la teshuvá de Aaron en Yom Kipur? → Acharei Mot: el secreto de Yom Kipur",
                  fa: "نداو و اَویهو آتشِ ناآشنا تقدیم کردند و سوختند. هارون ادامه داد. تفاوت چیست؟ ← رازِ یوم‌کیپور",
                  href: "/misterio/acharei-mot",
                },
              ].map((chip, i) => (
                <button
                  key={i}
                  onClick={() => router.push(chip.href)}
                  className="rounded-2xl border px-5 py-3.5 text-start font-cinzel text-sm transition-all hover:scale-[1.02]"
                  style={{ borderColor: `${C}40`, color: `${C}dd`, background: `${C}08` }}
                >
                  {fa ? chip.fa : chip.es}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* ── BOTONES DE NAVEGACIÓN ── */}
        <Section delay={100}>
          <div className="mt-14 text-center">
            <button
              onClick={() => router.push("/estudio?ref=Numbers.25.1")}
              className="mb-6 rounded-full border-2 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
              style={{ borderColor: C, color: C, background: `${C}12`, boxShadow: `0 0 20px ${C}33` }}
            >
              {fa ? "مطالعهٔ این متن در جاشمال ←" : "Estudiar este texto en Jashmal →"}
            </button>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { es: "Pinjás — Bamidbar 25", fa: "پینحاس — بامیدبار ۲۵", ref: "Numbers.25.1" },
                { es: "Brit Shalom — el pacto de paz", fa: "بریت‌شالوم — پیمانِ صلح", ref: "Numbers.25.12" },
                { es: "Serpiente y redención — Moshé y Pinjás", fa: "مار و رستگاری", ref: "Numbers.21.9" },
              ].map((chip, i) => (
                <button
                  key={i}
                  onClick={() => router.push(`/estudio?ref=${encodeURIComponent(chip.ref)}`)}
                  className="rounded-full border px-4 py-1.5 font-cinzel text-xs transition-all hover:scale-105"
                  style={{ borderColor: `${C}40`, color: `${C}cc`, background: `${C}08` }}
                >
                  {fa ? chip.fa : chip.es}
                </button>
              ))}
            </div>

            <Link
              href="/misterios"
              className="font-cinzel text-sm hover:text-gold/80"
              style={{ color: "rgba(201,164,62,0.5)" }}
            >
              {fa ? "← همهٔ مطالعات" : "← Todos los estudios"}
            </Link>
          </div>
        </Section>

        {/* ── FOOTER ── */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl" style={{ color: `${C}70` }}>חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            {fa ? "کابالا و فلسفهٔ یهودی" : "Cabalá & Filosofía Judía"}
          </p>
        </div>

      </main>
    </div>
  );
}
