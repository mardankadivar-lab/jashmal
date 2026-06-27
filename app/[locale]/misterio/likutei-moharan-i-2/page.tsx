"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="transition-all duration-1000"
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Tile({ he, sub, color, size = 52 }: { he: string; sub: string; color: string; size?: number }) {
  return (
    <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}>
      <span className="hebrew font-bold leading-none"
        style={{ fontSize: `${size}px`, color: "#fff6e0", textShadow: `0 0 20px ${color}, 0 0 7px ${color}` }}>
        {he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

function SectionHeader({ he, es, fa, fa_active, color }: { he: string; es: string; fa: string; fa_active: boolean; color: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="hebrew text-2xl font-bold" style={{ color, textShadow: `0 0 10px ${color}66` }}>{he}</span>
      <div className="h-px flex-1 opacity-20" style={{ background: color }} />
      <span className="font-cinzel text-xs uppercase tracking-[0.3em]" style={{ color: `${color}99` }}>
        {fa_active ? fa : es}
      </span>
    </div>
  );
}

function PullQuote({ es, fa_text, fa_active, color }: { es: string; fa_text: string; fa_active: boolean; color: string }) {
  return (
    <Section>
      <div className="my-9 rounded-2xl border p-6 text-center"
        style={{ borderColor: `${color}40`, background: `${color}08` }}>
        <p className="text-lg italic leading-relaxed text-parchment/90" dir={fa_active ? "rtl" : "ltr"}>
          {fa_active ? `«${fa_text}»` : `«${es}»`}
        </p>
      </div>
    </Section>
  );
}

export default function PageLikuteiMoharanI2() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const C = "#e8945a"; // ámbar de vela de Shabbat

  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const bg = "#05050a";
  const navBg = "rgba(5,5,10,0.9)";

  return (
    <div className="always-dark min-h-screen" style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterios" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            {fa ? "← همهٔ مطالعات شَبات" : "← Todos los estudios"}
          </Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button
              onClick={() => router.push("/estudio?ref=Likutey_Moharan.2")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
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
              {fa ? "شَبات · لیکوتِی موهاران ۱:۲" : "Shabbat · Likutei Moharan I:2"}
            </p>
            <p className="hebrew mb-3 font-bold leading-tight"
              style={{ fontSize: "clamp(32px, 8vw, 52px)", color: C, textShadow: `0 0 32px ${C}, 0 0 12px ${C}88` }}>
              וּתְהִלָּתִי אֶחֱטָם לָךְ
            </p>
            <h2 className="mb-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
              {fa ? "سلاحِ پنهانِ ماشیَح" : "El arma secreta del Mashíaj"}
            </h2>
            <p className="font-cinzel text-xs uppercase tracking-widest text-parchment/50">
              {fa ? "ربه نجمن از برسلوو — درباره وَیِکرا ۲۱:۱" : "Rebbe Najman de Breslov — sobre Vayikrá 21:1"}
            </p>

            {/* Tiles חֹטֶם → רוּחַ → תְּפִלָּה */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Tile he="חֹטֶם" sub={fa ? "خوتِم · بینی" : "Jótem · Nariz"} color={C} size={48} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>→</span>
              <Tile he="רוּחַ" sub={fa ? "نَفَسِ حیات" : "Aliento de vida"} color="#c9a43e" size={48} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>→</span>
              <Tile he="תְּפִלָּה" sub={fa ? "دعا · سلاح" : "Tefilá · Arma"} color={C} size={48} />
            </div>
          </div>
        </Section>

        {/* ── TEMA CENTRAL ── */}
        <PullQuote
          es="El Mashíaj no conquista el mundo con la espada. Lo conquista con el aliento hecho plegaria."
          fa_text="ماشیَح جهان را با شمشیر فتح نمی‌کند. آن را با نَفَسی که دعا می‌شود فتح می‌کند."
          fa_active={fa}
          color={C}
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "ربه نجمن «بینی» (חֹטֶם، خوتِم) را همان مجرایی می‌خواند که «نَفَسِ حیاتِ» ماشیَح از آن بیرون کشیده می‌شود — و این نَفَس، در انسان، به کلمه و به دعا بدل می‌شود. سلاحِ اصلیِ ماشیَح و هر یهودی، تِفیلا (دعا) است: نه شمشیر، نه زور، بلکه نَفَسی که کلمه می‌شود. اما این سلاح را تنها کسی نگه می‌دارد که بِریتِ خود را پاس بدارد — جنبهٔ یوسفِ صدیق."
                : "Rebbe Najman lee la «nariz» (חֹטֶם, jótem) como el canal por donde se extrae el «aliento de vida» del Mashíaj — y ese aliento, en el ser humano, se vuelve palabra y plegaria. El arma esencial del Mashíaj y de cada judío es la tefilá (la oración): no la espada, no la fuerza, sino el aliento que se vuelve palabra. Pero esa arma solo la sostiene quien guarda su brit (la integridad personal) — el aspecto de Yosef HaTzadik."}
            </p>
          </div>
        </Section>

        {/* ── SECCIÓN: TRADUCCIÓN ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="תַּרְגּוּם" es="Traducción" fa="ترجمه" fa_active={fa} color={C} />

            <div className="rounded-2xl border p-6 text-center"
              style={{ borderColor: `${C}30`, background: `${C}06` }}>
              <p className="hebrew mb-3 text-xl font-bold leading-relaxed" style={{ color: C }}>
                אֱמֹר אֶל הַכֹּהֲנִים בְּנֵי אַהֲרֹן
              </p>
              <p className="font-cormorant text-base italic text-parchment/80">
                {fa
                  ? "«به کاهنان، پسرانِ اهرون، بگو…»"
                  : "«Habla (emor) a los kohanim, hijos de Aharón, y diles…»"}
              </p>
              <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                — {fa ? "وَیِکرا ۲۱:۱" : "Vayikrá 21:1"}
              </p>
            </div>

            {/* Maamar raíz del Zóhar */}
            <div className="mt-4 rounded-2xl border p-6 text-center"
              style={{ borderColor: `${C}30`, background: `${C}06` }}>
              <p className="hebrew mb-3 text-lg font-bold leading-relaxed" style={{ color: C }}>
                מִנּוּקְבָא דְּפַרְדַּשְׂקָא מָשַׁךְ רוּחָא דְּחַיֵּי לִמְשִׁיחָא
              </p>
              <p className="font-cormorant text-base italic text-parchment/80">
                {fa
                  ? "«از سوراخ‌های بینی، نَفَسِ حیات به‌سویِ ماشیَح کشیده می‌شود.»"
                  : "«Desde la nukva de-pardashka (las fosas nasales) se extrae el aliento de vida hacia el Mashíaj.»"}
              </p>
              <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                — {fa ? "زوهر ۲، تروما، ۱۷۷الف (سفرا دِتسنیعوتا)" : "Zóhar II, Trumá, 177a (Sifrá diTzni'utá)"}
              </p>
            </div>

            <div className="mt-6 space-y-3" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  he: "וַהֲרִיחוֹ בְּיִרְאַת ה׳",
                  ref: "Yeshayá 11:3",
                  es: "«Y su olfato (rúaj/aliento) será en el temor de Hashem» — la vitalidad del Mashíaj reside en el jótem, el aliento",
                  fa: "«و بویاییِ او (نَفَس) در ترسِ خداوند خواهد بود» — حیاتِ ماشیَح در خوتِم، در نَفَس است",
                },
                {
                  he: "וּתְהִלָּתִי אֶחֱטָם־לָךְ",
                  ref: "Yeshayá 48:9",
                  es: "«Y por Mi alabanza contendré (eJtam) de ti» — misma raíz ח-ט-ם que jótem: la alabanza es el «arma de la nariz»",
                  fa: "«و به‌خاطرِ ستایشم [خشمم را] از تو بازمی‌دارم (اِجتام)» — همان ریشهٔ ח-ט-ם خوتِم: ستایش، سلاحِ بینی است",
                },
                {
                  he: "בְּחַרְבִּי וּבְקַשְׁתִּי",
                  ref: "Bereshit 48:22",
                  es: "«Con mi espada y con mi arco» (Yaakov), que Onkelos traduce «con mi oración y con mi súplica»",
                  fa: "«با شمشیرم و با کمانم» (یعقوب)، که اونکِلوس آن را «با دعایم و با تضرعم» ترجمه می‌کند",
                },
                {
                  he: "כִּי לֹא בְקַשְׁתִּי אֶבְטָח וְחַרְבִּי לֹא תוֹשִׁיעֵנִי",
                  ref: "Tehilim 44:7",
                  es: "«Pues no confío en mi arco, ni mi espada me salvará»",
                  fa: "«زیرا به کمانم اعتماد نمی‌کنم، و شمشیرم نجاتم نمی‌دهد»",
                },
                {
                  he: "רוֹמְמוֹת אֵל בִּגְרוֹנָם וְחֶרֶב פִּיפִיּוֹת בְּיָדָם",
                  ref: "Tehilim 149:6",
                  es: "«Loores de Dios en su garganta, y espada de doble filo (pifiyot) en su mano» — la oración doble",
                  fa: "«ستایشِ خدا در گلویشان، و شمشیرِ دو دم در دستشان» — دعایِ دوگانه",
                },
                {
                  he: "חֲגוֹר חַרְבְּךָ עַל יָרֵךְ גִּבּוֹר",
                  ref: "Tehilim 45:4",
                  es: "«Ciñe tu espada sobre el muslo (yarej), oh héroe» — el yarej alude a la guarda del brit",
                  fa: "«شمشیرت را بر ران (یارِخ) ببند، ای پهلوان» — یارِخ به نگاهبانیِ بِریت اشاره دارد",
                },
              ].map((v, i) => (
                <div key={i} className="rounded-xl border border-gold/10 p-4"
                  style={{ background: "rgba(14,12,22,0.7)" }}>
                  <p className="hebrew mb-1 text-base font-bold" style={{ color: `${C}cc` }}>{v.he}</p>
                  <p className="text-xs text-parchment/70">{fa ? v.fa : v.es}</p>
                  <p className="mt-1 font-cinzel text-[10px] uppercase tracking-widest text-parchment/35">— {v.ref}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: MEFARSHIM ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="מְפָרְשִׁים" es="Comentaristas" fa="مفسران" fa_active={fa} color={C} />

            <p className="mb-5 text-sm italic leading-relaxed text-parchment/60" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "آنچه قرائتِ ربه نجمن را پشتیبانی می‌کند، اینجا می‌تپد. تمامِ آریزال / کابالایِ لوریانی در این بخش زندگی می‌کند."
                : "Aquí late lo que sostiene la lectura de Rebbe Najman. Todo el Arizal / Cabalá luriana vive en esta sección."}
            </p>

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  who: fa ? "אֻנְקְלוֹס — اونکِلوس" : "אֻנְקְלוֹס — Onkelos",
                  ref: "Bereshit 48:22",
                  es: "El targum arameo no deja lugar a dudas: lo que Yaakov llama «con mi espada y con mi arco» (בְּחַרְבִּי וּבְקַשְׁתִּי) lo vierte como בִּצְלוֹתִי וּבְבָעוּתִי — «con mi oración y con mi súplica». Esta es la fuente exacta que cita el propio Rebbe Najman. La «conquista» de la tierra por Yaakov nunca fue militar: fue plegaria.",
                  fa: "تَرگومِ آرامی جایِ تردید نمی‌گذارد: آنچه یعقوب «با شمشیرم و با کمانم» (בְּחַרְבִּי וּבְקַשְׁתִּי) می‌نامد، آن را בִּצְלוֹתִי וּבְבָעוּתִי — «با دعایم و با تضرعم» برمی‌گرداند. این همان منبعی است که خودِ ربه نجمن نقل می‌کند. «فتحِ» سرزمین به‌دستِ یعقوب هرگز نظامی نبود: دعا بود.",
                },
                {
                  who: fa ? "רַשִׁ\"י — راشی" : "רַשִׁ\"י — Rashi",
                  ref: "Bereshit 48:22",
                  es: "Rashi ofrece dos lecturas. La literal: cuando Shimón y Leví mataron a los hombres de Shejem, los pueblos vecinos se reunieron y «Yaakov ciñó armas de guerra». Y la espiritual: «es su sabiduría y su oración» (הִיא חָכְמָתוֹ וּתְפִלָּתוֹ), apoyándose en los Targumim y en Bavá Batrá 123a. Rebbe Najman se apoya en esta segunda voz.",
                  fa: "راشی دو قرائت ارائه می‌دهد. تحت‌اللفظی: وقتی شیمعون و لِوی مردانِ شِخِم را کشتند، اقوامِ همسایه گرد آمدند و «یعقوب جنگ‌افزار بست». و روحانی: «این خِردِ او و دعایِ اوست» (הִיא חָכְמָתוֹ וּתְפִלָּתוֹ)، با تکیه بر تَرگوم‌ها و باوا بَترا ۱۲۳الف. ربه نجمن بر همین صدایِ دوم تکیه می‌کند.",
                },
                {
                  who: fa ? "הַזֹּהַר — زوهر (سفرا دِتسنیعوتا)" : "הַזֹּהַר — Sifrá diTzni'utá",
                  ref: "Zóhar II 177a",
                  es: "El «Libro de lo Oculto» enseña que el aliento de vida del Mashíaj se extrae por la nukva de-pardashka — término arameo para las fosas nasales, la abertura por donde fluye el aliento. Toda la enseñanza de la Torá 2 cuelga de este versículo: el aliento es vida, y la vida del redentor entra por la «nariz».",
                  fa: "«کتابِ پنهان» می‌آموزد که نَفَسِ حیاتِ ماشیَح از نوکوا دِپَردَشکا کشیده می‌شود — اصطلاحی آرامی برای سوراخ‌های بینی، دهانه‌ای که نَفَس از آن جاری می‌شود. تمامِ آموزشِ تورا ۲ به همین آیه آویزان است: نَفَس حیات است، و حیاتِ رهاننده از «بینی» وارد می‌شود.",
                },
                {
                  who: fa ? "הָאֲרִיזַ\"ל — آریزال (بُعدِ لوریانیِ خوتِم)" : "הָאֲרִיזַ\"ל — la dimensión luriana del jótem",
                  ref: "Idra / partzuf Arij Anpín",
                  es: "En la Cabalá del Arizal, el partzuf de Arij Anpín (el «Rostro Largo», la dimensión interior de Kéter, la voluntad infinita) tiene su configuración de «rostro»: de las fosas nasales de Arij brota el rúaj jayim, el soplo de vida que desciende por todos los mundos. El jótem no es anatomía: es el canal de la voluntad divina más alta que se hace aliento. Por eso la oración —aliento humano elevado en palabra— es el arma del Mashíaj: al rezar, el hombre conecta su propio aliento con ese rúaj jayim de Arij Anpín.",
                  fa: "در کابالایِ آریزال، پَرتسوفِ آریخ اَنپین («چهرهٔ بلند»، بُعدِ درونیِ کِتِر، ارادهٔ بی‌نهایت) پیکربندیِ «چهره» دارد: از سوراخ‌های بینیِ آریخ، روئَخ جَییم می‌جوشد، نَفَسِ حیاتی که در همهٔ عالم‌ها فرومی‌ریزد. خوتِم آناتومی نیست: مجرایِ والاترین ارادهٔ الهی است که نَفَس می‌شود. ازین‌رو دعا — نَفَسِ انسانیِ برکشیده در کلمه — سلاحِ ماشیَح است: انسان با دعا، نَفَسِ خود را به آن روئَخ جَییمِ آریخ اَنپین پیوند می‌زند.",
                },
                {
                  who: fa ? "יוֹסֵף וְהַבְּרִית — یوسف، مجرایِ سلاح" : "יוֹסֵף וְהַבְּרִית — Yosef como canal del arma",
                  ref: "Yesod / Bereshit 49:4",
                  es: "En la lectura cabalística, Yosef HaTzadik corresponde a la sefirá de Yesod — el «fundamento», el brit, el canal por donde toda la luz superior se transmite a la Maljut. Por eso el arma de la tefilá se «recibe» por el aspecto de Yosef: solo un canal íntegro (un yesod guardado, una shmirat habrit) puede transmitir el aliento de Arriba sin que se derrame ni se contamine. Reuvén, que «profanó el lecho» (Bereshit 49:4), perdió la primogenitura porque el canal se rompió.",
                  fa: "در قرائتِ کابالی، یوسفِ صدیق با سفیرایِ یِسود متناظر است — «بنیان»، بِریت، مجرایی که تمامِ نورِ علوی از آن به مَلخوت منتقل می‌شود. ازین‌رو سلاحِ تِفیلا از جنبهٔ یوسف «دریافت» می‌شود: تنها مجرایی یکپارچه (یِسودی پاس‌داشته، شمیرات هَبریت) می‌تواند نَفَسِ بالا را بی‌آنکه بریزد یا آلوده شود انتقال دهد. رِئووِن که «بسترِ پدر را آلوده کرد» (برِشیت ۴۹:۴)، نخست‌زادگی را از دست داد، زیرا مجرا شکست.",
                },
              ].map((m, i) => (
                <div key={i} className="rounded-xl border p-5"
                  style={{ borderColor: `${C}25`, background: "rgba(14,12,22,0.7)" }}>
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <span className="font-cinzel text-sm font-bold" style={{ color: `${C}dd` }}>{m.who}</span>
                    <span className="font-cinzel text-[10px] uppercase tracking-widest text-parchment/35 shrink-0">{m.ref}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-parchment/80">{fa ? m.fa : m.es}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: PaRDeS ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="פרד״ס" es="PaRDeS" fa="پَردِس" fa_active={fa} color={C} />

            {/* Pshat */}
            <div className="mb-8">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>פְּשָׁט</span>
                {fa ? "پشاط — معنایِ آشکار" : "Pshat — lectura literal"}
              </h4>
              <div className="space-y-3 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                <p>
                  {fa
                    ? "ربه نجمن در سطحِ آشکار یک تز با شرطش می‌آموزد: سلاحِ ماشیَح دعاست، نه زورِ بدنی. تمامِ حیاتش — و در نتیجه پیروزی‌هایش — از خوتِم می‌آید، از نَفَسی که پیشِ خدا کلمه می‌شود."
                    : "Rebbe Najman enseña, en lo llano, una sola tesis con su condición: el arma del Mashíaj es la oración, no la fuerza física. Su vitalidad entera —y por tanto sus victorias— vienen del jótem, del aliento que se vuelve palabra ante Dios."}
                </p>
                <p>
                  {fa
                    ? "متن مقدس پیش‌تر گفته بود: وقتی پدرسالار یا پادشاهی از «شمشیر و کمان» می‌گوید، سنت آن را «دعا و تضرع» می‌خواند (اونکِلوس و راشی بر برِشیت ۴۸:۲۲؛ تهیلیم ۴۴:۷،۹). قدرتِ حقیقیِ اسرائیل هرگز نظامی نبود."
                    : "La Escritura ya lo había dicho: cuando un patriarca o un rey habla de «espada y arco», la tradición lo lee como oración y súplica (Onkelos y Rashi a Bereshit 48:22; Tehilim 44:7,9). El verdadero poder de Israel nunca fue militar."}
                </p>
                <p>
                  {fa
                    ? "اما سلاح یک شرط دارد: از جنبهٔ یوسف دریافت می‌شود، یعنی با نگاهبانیِ بِریت — یکپارچگی و قداستِ شخصی. دعا تنها از ظرفی پاک با قدرت می‌جوشد. و دعا دوگانه است (ستایش + درخواست)، چون شمشیرِ دو دم: ازین‌رو «سهمِ دوگانهٔ» نخست‌زاده است."
                    : "Pero el arma tiene una condición: se recibe por el aspecto de Yosef, es decir, guardando el brit — la integridad y la santidad personal. Una oración brota con fuerza solo desde un vaso puro. Y la oración es doble (alabanza + petición), como una espada de dos filos: por eso es la «porción doble» del primogénito."}
                </p>
                <p className="rounded-xl border border-gold/10 p-4 text-center italic" style={{ background: `${C}08` }}>
                  {fa
                    ? "قدرتِ حقیقی شمشیر نیست، بلکه نَفَسی است که دعا می‌شود — و آن را تنها کسی به دست می‌گیرد که پاکی‌اش را پاس می‌دارد."
                    : "El verdadero poder no es la espada, sino el aliento hecho plegaria — y solo lo empuña quien guarda su pureza."}
                </p>
              </div>
            </div>

            {/* Remez */}
            <div className="mb-8">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>רֶמֶז</span>
                {fa ? "رِمِز — رمز و نمادها" : "Remez — alusiones y correspondencias"}
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                {fa
                  ? "قلبِ رِمِزِ این تورا گماتریا نیست: یک بازیِ ریشه و معماریِ تصاویر است. ربه نجمن حروف را به هم می‌بافد، نه اعداد را:"
                  : "El corazón remez de esta Torá no es gematría: es un juego de raíz y una arquitectura de imágenes. Rebbe Najman teje letras, no suma valores:"}
              </p>
              {/* Tabla de correspondencias */}
              <div className="overflow-hidden rounded-xl border border-gold/15" style={{ background: "rgba(14,12,22,0.8)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: `${C}18` }}>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "کلمه / تصویر" : "Palabra / imagen"}</th>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "معادل" : "Corresponde a"}</th>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "تأیید" : "Verificación"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { l: "חֹטֶם", name: fa ? "خوتِم · بینی/نَفَس" : "Jótem · nariz/aliento", corr: fa ? "سلاحِ ماشیَح (تِفیلا)" : "El arma del Mashíaj (tefilá)", val: fa ? "ریشهٔ ח-ט-ם ✔" : "raíz ח-ט-ם ✔" },
                      { l: "אֶחֱטָם", name: fa ? "اِجتام «بازمی‌دارم»" : "eJtam «contendré»", corr: fa ? "ستایش به‌مثابهٔ سلاح" : "La alabanza como arma", val: fa ? "همان ریشه ✔ (یشعیا ۴۸:۹)" : "misma raíz ✔ (Yeshayá 48:9)" },
                      { l: "חֶרֶב פִּיפִיּוֹת", name: fa ? "شمشیرِ دو دهان" : "Espada de dos bocas", corr: fa ? "دعایِ دوگانه (ستایش + درخواست)" : "Oración doble (alabanza + petición)", val: fa ? "تهیلیم ۱۴۹:۶ ✔" : "Tehilim 149:6 ✔" },
                      { l: "בְּחַרְבִּי וּבְקַשְׁתִּי", name: fa ? "شمشیر و کمان" : "Espada y arco", corr: fa ? "«دعا و تضرع»" : "«Oración y súplica»", val: fa ? "اونکِلوس بر برِشیت ۴۸:۲۲ ✔" : "Onkelos a Bereshit 48:22 ✔" },
                      { l: "יָרֵךְ", name: fa ? "یارِخ · ران" : "Yarej · muslo", corr: fa ? "نگاهبانیِ بِریت (یوسف/یِسود)" : "Guarda del brit (Yosef/Yesod)", val: fa ? "تهیلیم ۴۵:۴ ✔" : "Tehilim 45:4 ✔" },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gold/10">
                        <td className="p-3">
                          <span className="hebrew text-base font-bold" style={{ color: C }}>{row.l}</span>
                          <span className="ml-2 font-cinzel text-[10px] text-parchment/40">{row.name}</span>
                        </td>
                        <td className="p-3 text-xs text-parchment/70">{row.corr}</td>
                        <td className="p-3 font-cinzel text-[11px] font-bold" style={{ color: `${C}cc` }}>{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs italic text-parchment/50" dir={fa ? "rtl" : "ltr"}>
                {fa
                  ? "نکتهٔ سوفِر: محورِ زیبا و قابلِ تأیید اینجا ریشهٔ مشترکِ ח-ט-ם است: خوتِم (بینی) و اِجتام (کلمهٔ یشعیا ۴۸:۹ که ربه آن را «ستایشی که بازمی‌دارد/پیروز می‌شود» می‌خواند) از همان سه حرف می‌زایند. ربه نجمن این آموزش را بر ارزشِ عددی استوار نمی‌کند."
                  : "Nota del Sofer: el eje verificable y bello aquí es la raíz compartida ח-ט-ם: jótem (nariz) y eJtam (la palabra de Yeshayá 48:9 que el Rebbe lee como «alabanza que frena/vence») nacen de las mismas tres letras. Rebbe Najman no apoya esta enseñanza en valores numéricos."}
              </p>
            </div>

            {/* Drash */}
            <div className="mb-8">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>דְּרָשׁ</span>
                {fa ? "دراش — آموزشِ عملی" : "Drash — enseñanza práctica y voz Breslov"}
              </h4>
              <div className="space-y-4 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                <p>
                  {fa
                    ? "اینجا جانِ برسلوو می‌تپد، و گستاخیِ شگرفی دارد: ربه نجمن دعا را بر هر زورِ انسانی برتری می‌دهد. ماشیَح — نمادِ قدرتِ مطلق، آن که «پیروز می‌شود» و «فتح می‌کند» — با ارتش نمی‌برد: با دعا کردن می‌برد. برای نجمن که میراثِ زنده‌اش هیتبودِدوت (گفت‌وگویِ خلوتِ صمیمانه با خدا) است، این قلبِ همه‌چیز است: دعایِ شخصیِ تو، به‌معنای واقعی، همان سلاحی است که جهان را می‌رهاند."
                    : "Aquí late el alma de Breslov, y es de una audacia tremenda: Rebbe Najman pone la oración por encima de toda fuerza humana. El Mashíaj —la figura del poder absoluto, el que «vence» y «conquista»— no triunfa con ejércitos: triunfa rezando. Para Najman, cuyo legado más vivo es el hitbodedut (la conversación íntima y solitaria con Dios), esto es el corazón de todo: tu plegaria personal es, literalmente, el arma con la que se redime el mundo."}
                </p>
                <p>
                  {fa
                    ? "و ظرافتی هست هم وحشی هم لطیف. سلاح با فنّ یا شورِ پُرسروصدا «ساخته» نمی‌شود: دریافت می‌شود، و از یوسف، از شمیرات هَبریت — نگاهبانیِ پاکی، چشم‌ها، پیمان. نجمن جای دیگر اصرار دارد که قدرتِ دعای انسان مستقیماً به پاکی‌اش بسته است: ظرفِ شکسته نَفَسِ حیات را نگه نمی‌دارد."
                    : "Y hay un matiz feroz y tierno a la vez. El arma no se «fabrica» con técnica ni con fervor ruidoso: se recibe, y se recibe por Yosef, por la shmirat habrit — la guarda de la pureza, de los ojos, del pacto. Najman insiste en que la fuerza de la oración está ligada a la pureza: un vaso roto no retiene el aliento de vida."}
                </p>
                <div className="rounded-xl border p-4" style={{ borderColor: `${C}30`, background: `${C}06` }}>
                  <p className="text-sm font-semibold text-parchment/90" dir={fa ? "rtl" : "ltr"}>
                    {fa
                      ? "صدایِ بعل‌شم‌طوو طبیعتاً وارد می‌شود: برای بِشت، تِفیلا تلاوتِ فرمول‌ها نیست، دِوِکوت است — چسبیدن به خدا با هر نَفَس. بِشت می‌آموخت که انسان باید «به درونِ حروفِ» دعا وارد شود، که هر کلمه یک اتاقِ تمام است. آن نَفَس که در حروف وارد می‌شود، همان روئَخ جَییمی است که زوهر می‌گوید ماشیَح را نگه می‌دارد. دعا کردن، تنفّسِ حیاتِ رهاننده است."
                      : "La voz del Baal Shem Tov entra con naturalidad: para el Besht, la tefilá no es recitar fórmulas, es devekut — adherirse a Dios con cada aliento. El Besht enseñaba que el hombre debe «entrar dentro de las letras» de la oración, que cada palabra es una cámara entera. Ese aliento que entra en las letras es el mismo rúaj jayim que el Zóhar dice que sostiene al Mashíaj. Rezar es respirar la vida del redentor."}
                  </p>
                </div>
                <p>
                  {fa
                    ? "و ظریف‌ترین نکته، نابْ نجمن: اگر بزرگ‌ترین «جنگِ» تو درونی است — علیهِ دلسردی، علیهِ یِتسِر، علیهِ ناامیدی — به یاد آور که تنها سلاحِ مشروعِ تو، کلمهٔ روبه‌سویِ خداست. نه زورِ خامِ اراده. دهان. نَفَس. تضرع. این شمشیری است که هرگز نمی‌شکند."
                    : "Y el toque más sutil, puro Najman: si tu mayor «guerra» es interior —contra el desánimo, contra el yétzer, contra la desesperación—, recuerda que tu única arma legítima es la palabra dirigida a Dios. No la fuerza de voluntad bruta. La boca. El aliento. La súplica. Esa es la espada que nunca se quiebra."}
                </p>
              </div>
            </div>

            {/* Sod */}
            <div className="mb-2">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>סוֹד</span>
                {fa ? "سود — بُعدِ باطنی" : "Sod — dimensión esotérica"}
              </h4>
              <div className="space-y-4 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                <p>
                  {fa
                    ? "رازِ تمامِ این تورا، فرودِ روئَخ جَییم از خوتِمِ آریخ اَنپین تا دهانِ دعاکننده است:"
                    : "El secreto de toda esta Torá es el descenso del rúaj jayim desde el jótem de Arij Anpín hasta la boca del que reza:"}
                </p>
                <div className="rounded-xl border border-gold/15 p-5 space-y-3" style={{ background: "rgba(14,12,22,0.8)" }}>
                  <div dir="rtl" className="text-center">
                    <p className="hebrew text-base font-bold text-gold mb-1">מִנּוּקְבָא דְּפַרְדַּשְׂקָא מָשַׁךְ רוּחָא דְּחַיֵּי</p>
                    <p className="font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                      {fa ? "زوهر ۲:۱۷۷الف (سفرا دِتسنیعوتا)" : "Zóhar II:177a (Sifrá diTzni'utá)"}
                    </p>
                    <p className="mt-2 text-sm italic text-parchment/70" dir={fa ? "rtl" : "ltr"}>
                      {fa
                        ? "«از سوراخ‌های بینی، نَفَسِ حیات کشیده می‌شود» — از خوتِمِ آریخ اَنپین، بُعدِ درونیِ کِتِر، روئَخ جَییم می‌جوشد و به همهٔ عالم‌ها هستی می‌بخشد؛ و این نَفَس، در نهایت، به‌سویِ ماشیَح فرومی‌ریزد."
                        : "«Desde las fosas nasales se extrae el aliento de vida» — del jótem de Arij Anpín, la dimensión interior de Kéter, brota el rúaj jayim que da existencia a todos los mundos; ese aliento desciende, en última instancia, hacia el Mashíaj."}
                    </p>
                  </div>
                </div>
                <p>
                  {fa
                    ? "تِفیلا راهِ بازگشت است: نَفَسِ انسانی، برکشیده در کلمهٔ ستایش و درخواست، بالا می‌رود و به آن نَفَسِ بالا پیوند می‌خورد. ازین‌رو دعا «سلاح است»: تنها کنشِ انسانیِ ساخته‌شده از روئَخ، از نَفَس، که می‌تواند روئَخ جَییمِ الهی را لمس کند."
                    : "La tefilá es el camino de vuelta: el aliento humano, elevado en palabra de alabanza y petición, sube y se enlaza con ese aliento de Arriba. Por eso la oración «es el arma»: es el único acto humano hecho de rúaj, de aliento, capaz de tocar el rúaj jayim divino."}
                </p>
                <p>
                  {fa
                    ? "مجرایِ فرود و فراز، یوسف = یِسود = بِریت است. یِسود سفیرایی است که همهٔ بالا را گرد می‌آورد و به مَلخوت می‌سپارد (که خود جنبهٔ ماشیَح، «پسرِ داوود» است). بِریتِ پاس‌داشته = مجرایِ باز؛ بِریتِ آلوده (رِئووِن) = مجرایِ شکسته، و سلاح از دست می‌افتد."
                    : "El canal de bajada y de subida es Yosef = Yesod = el brit. Yesod es la sefirá que junta todo lo de arriba y lo entrega a la Maljut (que es también el aspecto del Mashíaj, «hijo de David»). Un brit guardado = un canal abierto; un brit profanado (Reuvén) = el canal roto, y el arma se cae de la mano."}
                </p>
                <p>
                  {fa
                    ? "بعل‌هَسولام (رَو یِهودا اَشلاگ) در همین کلید می‌آموزد که دعایِ حقیقی، کارِ تبدیلِ «میلِ دریافت برای خود» به «دریافت برای بخشیدن» است. تِفیلایِ «دوگانهٔ» نجمن این را تجسم می‌کند: درخواست، میلِ دریافت است؛ ستایش، آن را برمی‌کشد و به‌سویِ دهنده می‌گرداند. دعایی که فقط می‌خواهد، نیمْ‌شمشیر است؛ آن که می‌خواهد و می‌ستاید، شمشیرِ دو دم است."
                    : "Baal HaSulam (Rav Yehudá Ashlag), en su misma clave, enseña que la oración verdadera es el trabajo de convertir el «deseo de recibir para sí» en «recibir para dar». La tefilá «doble» de Najman lo encarna: la petición es el deseo de recibir; la alabanza lo eleva y lo dirige hacia el Dador. Una oración que solo pide es media espada; la que pide y alaba es la espada de doble filo — el vaso que recibe para dar, y por eso es aceptada."}
                </p>
                <p>
                  {fa
                    ? "ماشیَح و نَفَس: اینکه رهایی به نَفَس بسته است (نه به شمشیر) رازِ نهایی است. نخستین حیاتِ انسان نَفَسی بود که خدا دمید (برِشیت ۲:۷)؛ رهاییِ نهایی همان نَفَس است که در دعا بازگردانده می‌شود. ماشیَح جهان را فتح نمی‌کند: آن را دوباره می‌دمد."
                    : "El Mashíaj y el aliento: que la redención dependa del aliento (y no de la espada) es el secreto último. La primera vida del hombre fue un aliento soplado por Dios (Bereshit 2:7); la redención final es ese mismo aliento devuelto en oración. El Mashíaj no conquista el mundo: lo re-inspira."}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: HITBONENUT ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="הִתְבּוֹנְנוּת" es="Hitbonenut — Contemplación" fa="هیتبونِنوت — تأمل" fa_active={fa} color={C} />

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  n: "01",
                  es: "Mi arma más fuerte es la que menos parece un arma. Najman invierte todo mi instinto de poder: lo que cambia el mundo no es la fuerza, ni el control, ni «imponerme» — es el aliento hecho plegaria. La pregunta no es «¿cómo gano por la fuerza?» sino «¿qué necesito convertir en oración?».",
                  fa: "قوی‌ترین سلاحم آن است که کمتر از همه شبیهِ سلاح است. نجمن تمامِ غریزهٔ قدرتم را وارونه می‌کند: آنچه جهان را تغییر می‌دهد زور یا کنترل یا «تحمیلِ خود» نیست — نَفَسی است که دعا می‌شود. سؤال این نیست «چگونه با زور ببرم؟» بلکه «چه چیزی را باید به دعا بدل کنم؟»",
                },
                {
                  n: "02",
                  es: "Mi respiración ya es sagrada. El aliento que entra y sale de mi nariz ahora mismo es del mismo tejido que el rúaj jayim que sostiene al Mashíaj. No tengo que «conseguir» un arma espiritual: ya respiro. Solo debo volver ese aliento hacia Dios en palabra.",
                  fa: "نفسم همین حالا مقدس است. نَفَسی که اکنون از بینی‌ام درمی‌آید و فرومی‌رود، از همان تاروپودِ روئَخ جَییمی است که ماشیَح را نگه می‌دارد. لازم نیست سلاحی روحانی «به دست آورم»: همین حالا نفس می‌کشم. تنها باید آن نَفَس را در کلمه به‌سویِ خدا بازگردانم.",
                },
                {
                  n: "03",
                  es: "La oración es doble, como yo. Tengo dos voces: la que pide (mis necesidades, mi falta) y la que alaba (mi gratitud, mi asombro). Najman me enseña que la oración con filo las tiene a las dos. Una plegaria que solo se queja, o que solo alaba, es media espada.",
                  fa: "دعا دوگانه است، مثلِ من. دو صدا دارم: آن که می‌خواهد (نیازهایم، کمبودم) و آن که می‌ستاید (سپاسم، حیرتم). نجمن می‌آموزد که دعایِ تیز هر دو را دارد. دعایی که فقط شکوه می‌کند، یا فقط می‌ستاید، نیمْ‌شمشیر است.",
                },
                {
                  n: "04",
                  es: "El filo depende de la pureza. El arma «se recibe por Yosef» — por la guarda del brit. Mi oración no es más fuerte por gritar más: es más fuerte cuando mi vida es más íntegra. La santidad personal no es un añadido a la oración; es lo que le da filo.",
                  fa: "تیزی به پاکی بسته است. سلاح «از یوسف دریافت می‌شود» — با نگاهبانیِ بِریت. دعایم با فریادِ بلندتر قوی‌تر نمی‌شود: وقتی زندگی‌ام یکپارچه‌تر است قوی‌تر می‌شود. قداستِ شخصی افزوده‌ای بر دعا نیست؛ همان است که به آن تیزی می‌دهد.",
                },
                {
                  n: "05",
                  es: "El Mashíaj reza. La figura del poder absoluto, en esta enseñanza, no empuña una espada: abre la boca ante Dios. Si así es el redentor del mundo, ¿cuánto más yo, en mi pequeña guerra de cada día?",
                  fa: "ماشیَح دعا می‌کند. نمادِ قدرتِ مطلق، در این آموزش، شمشیر به دست نمی‌گیرد: پیشِ خدا دهان می‌گشاید. اگر رهانندهٔ جهان چنین است، من در جنگِ کوچکِ هرروزه‌ام چقدر بیشتر؟",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-gold/10 p-5"
                  style={{ background: "rgba(14,12,22,0.7)" }}>
                  <span className="font-cinzel text-xs font-bold shrink-0 pt-0.5" style={{ color: `${C}60` }}>{item.n}</span>
                  <p className="text-sm leading-relaxed text-parchment/80">{fa ? item.fa : item.es}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: MAASÉ ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="מַעֲשֶׂה" es="Maasé — Acción para este Shabbat" fa="مَعَسه — عملِ این شَبات" fa_active={fa} color={C} />

            <div className="mb-5 rounded-2xl border p-5 text-center"
              style={{ borderColor: `${C}40`, background: `${C}08` }}>
              <p className="font-cinzel text-sm font-bold" style={{ color: C }}>
                {fa ? "شَباتِ نَفَس و شمشیرِ دعا" : "«El Shabbat del aliento y la espada de la oración»"}
              </p>
            </div>

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  n: "1",
                  label: fa ? "یک نبرد را به دعا بدل کن" : "Convierte una lucha en plegaria",
                  es: "Identifica la batalla más pesada de tu semana —un miedo, un conflicto, una falta— y, en vez de pelearla con fuerza de voluntad, llévala a la boca: una frase de petición («Hashem, ayúdame con esto») y una frase de alabanza («y gracias porque Tú puedes»). Esa es la espada de doble filo. Empieza pequeño; empieza este Shabbat.",
                  fa: "سنگین‌ترین نبردِ هفته‌ات را بیاب —ترسی، کشمکشی، کمبودی— و به‌جایِ جنگیدن با زورِ اراده، آن را به دهان بسپار: یک جملهٔ درخواست («هاشِم، در این یاری‌ام کن») و یک جملهٔ ستایش («و سپاس که تو می‌توانی»). این شمشیرِ دو دم است. کوچک آغاز کن؛ همین شَبات آغاز کن.",
                },
                {
                  n: "2",
                  label: fa ? "با نَفَس دعا کن، نه فقط با ذهن" : "Reza con el aliento, no solo con la mente",
                  es: "En una sola berajá o un solo versículo de los rezos de Shabbat, respira hondo antes de pronunciarlo y escucha tu propio aliento convertirse en palabra. Recuerda: ese aliento es el rúaj jayim. Reza una línea como si fuera la más poderosa que has dicho.",
                  fa: "در یک بِراخا یا یک آیه از نمازهای شَبات، پیش از ادایش نفسی عمیق بکش و بشنو که نَفَسِ خودت کلمه می‌شود. به یاد آور: آن نَفَس روئَخ جَییم است. یک سطر را چنان بخوان که گویی قدرتمندترین چیزی است که گفته‌ای.",
                },
                {
                  n: "3",
                  label: fa ? "مجرا را پاس بدار (شمیرات عینایم/هَبریت)" : "Guarda el canal (shmirat einaim / habrit)",
                  es: "El arma se recibe por Yosef, por la pureza. Elige un acto concreto de guarda este Shabbat: cuidar la mirada, cuidar el habla, cuidar la santidad del día. Que tu vaso esté limpio para que el aliento de la oración tenga filo.",
                  fa: "سلاح از یوسف، از پاکی، دریافت می‌شود. این شَبات یک کنشِ مشخصِ نگاهبانی برگزین: مراقبتِ نگاه، مراقبتِ گفتار، مراقبتِ قداستِ روز. بگذار ظرفت پاک باشد تا نَفَسِ دعا تیزی داشته باشد.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border p-5" style={{ borderColor: `${C}25`, background: "rgba(14,12,22,0.7)" }}>
                  <div className="flex items-start gap-3">
                    <span className="font-cinzel text-2xl font-bold shrink-0" style={{ color: C }}>{item.n}</span>
                    <div>
                      <p className="mb-1 font-cinzel text-xs font-bold uppercase tracking-widest" style={{ color: `${C}bb` }}>{item.label}</p>
                      <p className="text-sm leading-relaxed text-parchment/80">{fa ? item.fa : item.es}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-gold/10 p-4 text-center text-sm text-parchment/60" dir={fa ? "rtl" : "ltr"}>
              <span className="font-cinzel text-xs uppercase tracking-widest" style={{ color: `${C}80` }}>
                {fa ? "میدا برای کار کردن:" : "Midá a trabajar:"}
              </span>
              <span className="ml-2">{fa ? "تبدیلِ زور (تحمیلِ خود، حلِ همه‌چیز به‌تنهایی) به تِفیلا — فروتنیِ بردنِ آن به دهان، پیشِ خدا" : "cambiar la fuerza (el querer imponerme, resolver todo por mi cuenta) por la tefilá — la humildad de llevarlo a la boca, ante Dios"}</span>
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: JATIMÁ ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="חֲתִימָה" es="El Sello — Síntesis de cierre" fa="حَتیما — مُهرِ ختم" fa_active={fa} color={C} />

            <div className="rounded-2xl border-2 p-7" style={{ borderColor: `${C}50`, background: `${C}07` }}>
              <div className="space-y-5" dir={fa ? "rtl" : "ltr"}>
                {[
                  {
                    icon: "◈",
                    label: fa ? "ایدهٔ اصلی" : "Idea principal",
                    es: "El arma esencial del Mashíaj —y de cada judío— es la tefilá, el aliento (jótem) que se vuelve palabra; no la espada ni la fuerza. «Espada y arco» en la Torá significan, según Onkelos y Rashi, oración y súplica.",
                    fa: "سلاحِ اصلیِ ماشیَح — و هر یهودی — تِفیلا است، نَفَسی (خوتِم) که کلمه می‌شود؛ نه شمشیر و نه زور. «شمشیر و کمان» در تورا، به‌گفتهٔ اونکِلوس و راشی، یعنی دعا و تضرع.",
                  },
                  {
                    icon: "◇",
                    label: fa ? "بینشِ کلیدی" : "Insight clave",
                    es: "La oración verdadera es doble — alabanza y petición — como una «espada de dos filos»; y solo la empuña quien guarda su brit (la integridad personal), el aspecto de Yosef.",
                    fa: "دعایِ حقیقی دوگانه است — ستایش و درخواست — چون «شمشیرِ دو دم»؛ و آن را تنها کسی به دست می‌گیرد که بِریتِ خود (یکپارچگیِ شخصی) را پاس می‌دارد، جنبهٔ یوسف.",
                  },
                  {
                    icon: "○",
                    label: fa ? "بینشِ روحانی" : "Insight espiritual",
                    es: "El aliento que respiro es del mismo tejido que el rúaj jayim que sostiene al redentor; rezar es respirar la vida del Mashíaj y devolverla a su Fuente.",
                    fa: "نَفَسی که می‌کشم از همان تاروپودِ روئَخ جَییمی است که رهاننده را نگه می‌دارد؛ دعا کردن، تنفّسِ حیاتِ ماشیَح و بازگرداندنِ آن به سرچشمه است.",
                  },
                  {
                    icon: "✦",
                    label: fa ? "کاربرد" : "Aplicación",
                    es: "Toma una lucha y conviértela en una frase de petición y una de alabanza; reza con el aliento, no solo con la mente; y guarda la pureza que le da filo a la oración.",
                    fa: "یک نبرد را بگیر و آن را به یک جملهٔ درخواست و یک جملهٔ ستایش بدل کن؛ با نَفَس دعا کن، نه فقط با ذهن؛ و پاکی‌ای را پاس بدار که به دعا تیزی می‌دهد.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="shrink-0 text-lg" style={{ color: C }}>{item.icon}</span>
                    <div>
                      <span className="font-cinzel text-xs font-bold uppercase tracking-widest" style={{ color: `${C}99` }}>{item.label}</span>
                      <p className="mt-1 text-sm leading-relaxed text-parchment/85">{fa ? item.fa : item.es}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Frase final */}
              <div className="mt-7 border-t border-gold/15 pt-6 text-center">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Tile he="חֹטֶם" sub={fa ? "بینی · نَفَس" : "Jótem · Aliento"} color={C} size={36} />
                  <span className="font-cinzel text-2xl" style={{ color: `${C}50` }}>→</span>
                  <Tile he="תְּפִלָּה" sub={fa ? "دعا" : "Tefilá"} color="#c9a43e" size={36} />
                  <span className="font-cinzel text-2xl" style={{ color: `${C}50` }}>→</span>
                  <Tile he="מָשִׁיחַ" sub={fa ? "ماشیَح" : "Mashíaj"} color={C} size={36} />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── UMBRAL הֶמְשֵׁךְ — "Sigue el hilo" ── */}
        <Section delay={150}>
          <div className="mt-16">
            {/* Separador + micro-rótulo */}
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
                  es: "¿Y si la gracia es lo que hace que la oración entre? → el jen que abre el corazón (LM I:1)",
                  fa: "و اگر فیض همان باشد که دعا را وارد می‌کند؟ ← حَنی که قلب را می‌گشاید (LM I:1)",
                  href: "/misterio/likutei-moharan-i-1",
                },
                {
                  es: "¿Qué es realmente el Mashíaj — persona, conciencia o estado? → el enigma del redentor",
                  fa: "ماشیَح واقعاً چیست — شخص، آگاهی یا حالت؟ ← معمایِ رهاننده",
                  href: "/misterio/enigma-mashiaj",
                },
                {
                  es: "¿Cómo se respira una oración? → el aliento hecho palabra (Tehilim 149:6)",
                  fa: "چگونه یک دعا تنفّس می‌شود؟ ← نَفَسی که کلمه می‌شود (تهیلیم ۱۴۹:۶)",
                  href: "/estudio?ref=Psalms.149.6",
                },
              ].map((chip, i) => (
                <button key={i}
                  onClick={() => router.push(chip.href)}
                  className="rounded-2xl border px-5 py-3.5 text-start font-cinzel text-sm transition-all hover:scale-[1.02]"
                  style={{ borderColor: `${C}40`, color: `${C}dd`, background: `${C}08` }}>
                  {fa ? chip.fa : chip.es}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* ── CIERRE DE SHABBAT ── */}
        <Section delay={200}>
          <div className="mt-16 text-center">
            {/* Separador */}
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px flex-1 opacity-20" style={{ background: C }} />
              <span className="hebrew text-sm" style={{ color: `${C}60` }}>שַׁבָּת</span>
              <div className="h-px flex-1 opacity-20" style={{ background: C }} />
            </div>

            {/* Menorá */}
            <div className="mb-6">
              <Image
                src="/images/menora-shabat.png"
                alt={fa ? "مِنورایِ شَبات" : "Menorá de Shabbat"}
                width={280}
                height={280}
                className="mx-auto opacity-90"
                style={{ filter: `drop-shadow(0 0 24px ${C}66)` }}
              />
            </div>

            <p className="hebrew font-bold"
              style={{ fontSize: "clamp(36px, 10vw, 56px)", color: C, textShadow: `0 0 30px ${C}, 0 0 10px ${C}99` }}>
              שַׁבָּת שָׁלוֹם
            </p>
            <p className="mt-2 font-cinzel text-base uppercase tracking-[0.35em] text-parchment/60">
              {fa ? "شَبات شالوم" : "Shabbat Shalom"}
            </p>
          </div>
        </Section>

        {/* ── BOTONES DE NAVEGACIÓN ── */}
        <Section delay={100}>
          <div className="mt-14 text-center">
            <button
              onClick={() => router.push("/estudio?ref=Likutey_Moharan.2")}
              className="mb-6 rounded-full border-2 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
              style={{
                borderColor: C, color: C, background: `${C}12`,
                boxShadow: `0 0 20px ${C}33`,
              }}>
              {fa ? "مطالعهٔ این متن در جاشمال ←" : "Estudiar este texto en Jashmal →"}
            </button>

            {/* Chips de temas */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { es: "Oración — tefilá", fa: "دعا — تِفیلا", ref: "Psalms 44:7" },
                { es: "Mashíaj — el redentor", fa: "ماشیَح — رهاننده", ref: "Isaiah 11:3" },
                { es: "El brit — Yosef HaTzadik", fa: "بِریت — یوسفِ صدیق", ref: "Genesis 49:4" },
              ].map((chip, i) => (
                <button key={i}
                  onClick={() => router.push(`/estudio?ref=${encodeURIComponent(chip.ref)}`)}
                  className="rounded-full border px-4 py-1.5 font-cinzel text-xs transition-all hover:scale-105"
                  style={{ borderColor: `${C}40`, color: `${C}cc`, background: `${C}08` }}>
                  {fa ? chip.fa : chip.es}
                </button>
              ))}
            </div>

            <Link href="/misterios"
              className="font-cinzel text-sm hover:text-gold/80"
              style={{ color: "rgba(201,164,62,0.5)" }}>
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
