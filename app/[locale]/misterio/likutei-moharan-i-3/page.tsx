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

export default function PageLikuteiMoharanI3() {
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
              onClick={() => router.push("/estudio?ref=Likutey_Moharan.3")}
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
              {fa ? "شَبات · لیکوتِی موهاران ۱:۳" : "Shabbat · Likutei Moharan I:3"}
            </p>
            <p className="hebrew mb-3 font-bold leading-tight"
              style={{ fontSize: "clamp(32px, 8vw, 52px)", color: C, textShadow: `0 0 32px ${C}, 0 0 12px ${C}88` }}>
              קוֹל הַנְּגִינָה
            </p>
            <h2 className="mb-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
              {fa ? "آوازِ نغمه: چرا یک ملودی نجاتت می‌دهد یا به دام می‌اندازد" : "La voz del canto: por qué una melodía te salva o te enreda"}
            </h2>
            <p className="font-cinzel text-xs uppercase tracking-widest text-parchment/50">
              {fa ? "ربه نجمن از برسلوو — بر باوا بَترا ۷۳ب" : "Rebbe Najman de Breslov — sobre Bavá Batrá 73b"}
            </p>

            {/* Tiles נְגִינָה → צִפֳּרִים → מַלְכוּת */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Tile he="נְגִינָה" sub={fa ? "نِگینا · نغمه" : "Neginá · Melodía"} color={C} size={44} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>→</span>
              <Tile he="צִפֳּרִים" sub={fa ? "پرندگان · سرچشمه" : "Aves · La fuente"} color="#c9a43e" size={44} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>→</span>
              <Tile he="מַלְכוּת" sub={fa ? "مَلخوت · مُلک" : "Maljut · Reino"} color={C} size={44} />
            </div>
          </div>
        </Section>

        {/* ── TEMA CENTRAL ── */}
        <PullQuote
          es="No hay música inocente: cada melodía que oyes mama de una fuente — y te ata a ella."
          fa_text="هیچ موسیقیِ بی‌گناهی نیست: هر نغمه‌ای که می‌شنوی از سرچشمه‌ای شیر می‌خورد — و تو را به آن می‌بندد."
          fa_active={fa}
          color={C}
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "ربه نجمن چیزی را جدی می‌گیرد که مدرنیته پیشِ‌پاافتاده‌اش می‌کند: نغمه بی‌طرف نیست. «صدایِ نغمه» (קוֹל הַנְּגִינָה) از پرندگان کشیده می‌شود؛ و اینکه آن پرندگان از کجا شیر می‌خورند، همه‌چیز را تعیین می‌کند. دو پرندهٔ پاکِ زندهٔ متسورا از «همان‌جا که پیامبران شیر می‌خورند» شیر می‌خورند (زوهر ۳:۵۳ب) — ازین‌رو نوازنده را חַזָּן (خزّان) می‌نامند، از חָזוֹן (خازون، رؤیتِ نبوی). اما پرندگانِ کلیپا از «پستان‌های مَلخوت» شیر می‌خورند (زوهر ۱:۲۱۷ب): کسی که با نغمهٔ رَشاع (شریر) کشیده می‌شود، در همان دام گرفتار می‌شود."
                : "Rebbe Najman toma en serio algo que la modernidad trivializa: la melodía no es neutra. La «voz del canto» (קוֹל הַנְּגִינָה) se extrae de los pájaros — y de dónde maman esos pájaros lo decide todo. Las dos aves puras vivas del metzorá maman «del lugar donde maman los profetas» (Zohar III:53b) — por eso al cantor se le llama חַזָּן (jazán), de חָזוֹן (jazón, visión profética). Pero los pájaros de la klipá maman «de los pechos de Maljut» (Zohar I:217b): quien se deja arrastrar por el canto de un rashá (malvado) queda atrapado en esa misma red."}
            </p>
          </div>
        </Section>

        {/* ── SECCIÓN: TRADUCCIÓN ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="תַּרְגּוּם" es="Traducción" fa="ترجمه" fa_active={fa} color={C} />

            {/* Agadá portal */}
            <div className="rounded-2xl border p-6 text-center"
              style={{ borderColor: `${C}30`, background: `${C}06` }}>
              <p className="hebrew mb-3 text-lg font-bold leading-relaxed" style={{ color: C }}>
                אָתָא תַּנִּינָא בָּלְעָהּ… וּסְלִיק יָתִיב בְּאִילָנָא. תָּא חֲזִי כַּמָּה נָפִישׁ חֵילֵיהּ דְּאִילָנָא
              </p>
              <p className="font-cormorant text-base italic text-parchment/80">
                {fa
                  ? "«اژدها آمد و آن را بلعید… [کلاغ] بالا رفت و بر درختی نشست. بیا و ببین قدرتِ آن درخت چه اندازه است!»"
                  : "«Vino la serpiente y se la tragó… [el cuervo] subió y se posó en un árbol. ¡Ven y ve cuán grande es la fuerza de ese árbol!»"}
              </p>
              <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                — {fa ? "باوا بَترا ۷۳ب (اگادایِ رَبّا بَر بَر خانا)" : "Bavá Batrá 73b (agadá de Rabá bar bar Janá)"}
              </p>
            </div>

            {/* Frase-corazón */}
            <div className="mt-4 rounded-2xl border p-6 text-center"
              style={{ borderColor: `${C}30`, background: `${C}06` }}>
              <p className="hebrew mb-3 text-lg font-bold leading-relaxed" style={{ color: C }}>
                מִי שֶׁשּׁוֹמֵעַ נְגִינָה מִמְּנַגֵּן רָשָׁע, קָשֶׁה לוֹ לַעֲבוֹדַת הַבּוֹרֵא
              </p>
              <p className="font-cormorant text-base italic text-parchment/80">
                {fa
                  ? "«کسی که نغمه را از نوازنده‌ای شریر می‌شنود، خدمتِ آفریدگار بر او دشوار می‌شود؛ و چون از نوازنده‌ای شایسته بشنود، برایش نیکوست.»"
                  : "«Quien escucha la melodía de un músico malvado, se le dificulta el servicio al Creador; y cuando la escucha de uno digno, entonces le hace bien.»"}
              </p>
              <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                — {fa ? "لیکوتِی موهاران ۱:۳ §۱" : "Likutei Moharan I:3 §1"}
              </p>
            </div>

            <div className="mt-6 space-y-3" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  he: "קוּמִי רֹנִי בַלַּיְלָה",
                  ref: "Eijá 2:19",
                  es: "«Levántate, canta en la noche» — el canto se levanta por medio de «la noche»: los seis órdenes de la Torá oral",
                  fa: "«برخیز، در شب بسرا» — نغمه به‌واسطهٔ «شب» برمی‌خیزد: شش سِدِرِ تورایِ شفاهی",
                },
                {
                  he: "בְּמַחֲשַׁכִּים הוֹשִׁיבַנִי — זֶה תַּלְמוּד בַּבְלִי",
                  ref: "Sanhedrín 24a / Eijá 3:6",
                  es: "«En tinieblas me asentó» — esto es el Talmud Bavlí: la Torá oral es «aspecto de noche»",
                  fa: "«در تاریکی‌ها نشاندم» — این تلمودِ بابلی است: تورایِ شفاهی «جنبهٔ شب» است",
                },
                {
                  he: "מִדַּדֵּי הַמַּלְכוּת",
                  ref: "Zohar I:217b",
                  es: "Los pájaros de la klipá maman «de los pechos de Maljut»; a medianoche sale el pregón «como pájaros atrapados en la trampa» (Kohélet 9:12)",
                  fa: "پرندگانِ کلیپا «از پستان‌های مَلخوت» شیر می‌خورند؛ نیمه‌شب ندا می‌آید «چون پرندگانِ گرفتار در دام» (کوهِلِت ۹:۱۲)",
                },
                {
                  he: "יוֹדֵעַ נַגֵּן",
                  ref: "Shmuel I 16:18",
                  es: "«[David] sabe tocar» — la melodía es la edificación de Maljut; por eso fue digno de reinado",
                  fa: "«[داوود] نواختن می‌داند» — نغمه بنایِ مَلخوت است؛ ازین‌رو شایستهٔ پادشاهی شد",
                },
                {
                  he: "מֵאַחַר עָלוֹת הֱבִיאוֹ",
                  ref: "Tehilim 78:71",
                  es: "«De detrás de las que amamantan lo trajo» — de detrás de las nodrizas: Nétzaj y Hod, que amamantan a los profetas",
                  fa: "«از پسِ شیردهندگان او را آورد» — از پسِ دایگان: نِتساح و هود، که به پیامبران شیر می‌دهند",
                },
                {
                  he: "וַיִּטַּע אֵשֶׁל",
                  ref: "Bereshit 21:33",
                  es: "«Y plantó un árbol (éshel)» — el árbol de la agadá es el jésed de Avraham, que eleva incluso a la serpiente",
                  fa: "«و درختی (اِشِل) کاشت» — درختِ اگادا، خِسِدِ ابراهیم است که حتی اژدها را نیز برمی‌کشد",
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
                ? "آنچه قرائتِ ربه نجمن را پشتیبانی می‌کند، اینجا می‌تپد. تمامِ زوهر و آریزال در این بخش زندگی می‌کند."
                : "Aquí late lo que sostiene la lectura de Rebbe Najman. Todo el Zohar y el Arizal viven en esta sección."}
            </p>

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  who: fa ? "הַזֹּהַר — زوهر (دو سرچشمه)" : "הַזֹּהַר — Zohar (las dos fuentes)",
                  ref: "Zohar III:53b · I:217b",
                  es: "El Zohar traza la anatomía de toda voz: las dos aves puras «maman del lugar donde maman los profetas» (III:53b), mientras los pájaros de la klipá «maman de los pechos de Maljut» (I:217b) y a medianoche se pregona «como pájaros atrapados en la trampa» (Kohélet 9:12). Toda melodía mama de algún pecho; la única pregunta es de cuál.",
                  fa: "زوهر آناتومیِ هر صدا را ترسیم می‌کند: دو پرندهٔ پاک «از همان‌جا که پیامبران شیر می‌خورند» شیر می‌خورند (۳:۵۳ب)، حال آنکه پرندگانِ کلیپا «از پستان‌های مَلخوت» شیر می‌خورند (۱:۲۱۷ب) و نیمه‌شب ندا می‌آید «چون پرندگانِ گرفتار در دام» (کوهِلِت ۹:۱۲). هر نغمه از پستانی شیر می‌خورد؛ تنها پرسش این است: از کدام.",
                },
                {
                  who: fa ? "הָאֲרִיזַ\"ל — آریزال (کیتوی هَاَری)" : "הָאֲרִיזַ\"ל — Arizal (Kitvei ha-Arí)",
                  ref: fa ? "به نقلِ ربه، §۲" : "citado por el Rebbe, §2",
                  es: "En los escritos del Arizal: los pájaros de la klipá son «los mojín (intelectos) de la Maljut de la cáscara», y las dos aves puras son «la edificación de la Maljut de santidad». El canto o levanta a Maljut hacia su fuente en los mojín de kedushá, o la nutre desde su cara de atrás (ajoraim) hacia la klipá. Por eso «hoy los jazanim son necios sin deá»: con la Maljut en exilio, la fuente profética del canto está tapada.",
                  fa: "در نوشته‌های آریزال: پرندگانِ کلیپا «موخینِ (خِردهایِ) مَلخوتِ کلیپا» هستند، و دو پرندهٔ پاک «بنایِ مَلخوتِ قدسی». نغمه یا مَلخوت را به‌سویِ سرچشمه‌اش در موخینِ قداست برمی‌کشد، یا آن را از پشتش (اَخورَییم) به‌سویِ کلیپا تغذیه می‌کند. ازین‌رو «امروز خزّان‌ها نادان و بی‌دِعا هستند»: با مَلخوتِ در تبعید، سرچشمهٔ نبویِ نغمه پوشیده است.",
                },
                {
                  who: fa ? "רַשְׁבָּ\"ם — رَشبام (بر اگادا)" : "רַשְׁבָּ\"ם — Rashbam (sobre la agadá)",
                  ref: "Bavá Batrá 73b",
                  es: "El Rashbam glosa la agadá: la akrukta es la rana (tzefardea), y la pushkantza es el cuervo (orev). Rebbe Najman lee sobre esta base: צְפַרְדֵּעַ como צִפּוֹר דֵּעָה, «ave del conocimiento» (el intelecto de Maljut del lado impuro), y en el cuervo (עוֹרֵב) oye עַרְבִית, la oración de la noche — estudiar de noche es lo que traga a la serpiente.",
                  fa: "رَشبام اگادا را شرح می‌دهد: اَکروکتا همان قورباغه (تسِفَردِعا) است، و پوشکَنتسا کلاغ (عورِو) است. ربه نجمن بر همین پایه می‌خواند: צְפַרְדֵּעַ را همچون צִפּוֹר דֵּעָה، «پرندهٔ دانش» (خِردِ مَلخوت از سویِ ناپاک)، و در کلاغ (עוֹרֵב) صدایِ עַרְבִית، نمازِ شب را می‌شنود — مطالعهٔ شبانه همان است که اژدها را می‌بلعد.",
                },
                {
                  who: fa ? "מַהֲרְשָׁ\"א — مَهَرشا (درختِ ابراهیم)" : "מַהֲרְשָׁ\"א — Maharshá (el árbol de Avraham)",
                  ref: "Bavá Batrá 73b",
                  es: "El Maharshá identifica el árbol de la agadá con el «éshel» que plantó Avraham (Bereshit 21:33), aspecto de jésed. «¡Cuán grande la fuerza de ese árbol!» es el asombro de Rabá ante el poder del jésed divino, que nos protege incluso de la serpiente que sube por él — más aún, la eleva.",
                  fa: "مَهَرشا درختِ اگادا را با «اِشِل»ی که ابراهیم کاشت (برِشیت ۲۱:۳۳) یکی می‌داند، جنبهٔ خِسِد. «قدرتِ آن درخت چه اندازه است!» شگفتیِ رَبّا از قدرتِ خِسِدِ الهی است، که حتی از اژدهایی که از آن بالا می‌رود ما را نگه می‌دارد — بلکه آن را برمی‌کشد.",
                },
                {
                  who: fa ? "דָּוִד הַמֶּלֶךְ — داوود پادشاه (نغمه و مُلک)" : "דָּוִד הַמֶּלֶךְ — El rey David (canto y reino)",
                  ref: "Shmuel I 16:18 · Tehilim 78:71",
                  es: "De David se dijo «yodéa naguén», sabe tocar — y por eso fue digno de reinar, «porque la melodía es la edificación de Maljut» (§7). Y «me-ajar alot hevió» (Tehilim 78:71): David sabía elevar incluso el canto que viene de las «espaldas» de la santidad, redimir la chispa cautiva en la melodía impura y devolverla a su fuente.",
                  fa: "دربارهٔ داوود گفته شد «نواختن می‌داند» — و ازین‌رو شایستهٔ پادشاهی شد، «زیرا نغمه بنایِ مَلخوت است» (§۷). و «مِاَخَر عَلوت هِویو» (تهیلیم ۷۸:۷۱): داوود می‌توانست حتی نغمه‌ای را که از «پشتِ» قداست می‌آید برکشد، جرقهٔ اسیر در ملودیِ ناپاک را برهاند و به سرچشمه‌اش بازگرداند.",
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
                    ? "درسِ ساده یک اخلاقِ گوش است. ربه نجمن چیزی را جدی می‌گیرد که امروز پیشِ‌پاافتاده‌اش می‌کنیم: با چه‌کسی و با چه‌چیزی گوش‌هایت را تغذیه می‌کنی، تو را می‌سازد. خرافه نیست؛ همان شهودِ کهن است که موسیقی روح را پیش از ذهن به حرکت درمی‌آورد. نوازنده‌ای می‌تواند صدایی زرین و قلبی کج داشته باشد، و ملودی‌اش همان کجی را منتقل می‌کند."
                    : "La lección literal es una ética del oído. Rebbe Najman toma en serio algo que hoy trivializamos: con quién y con qué te alimentas los oídos te forma. No es superstición; es la vieja intuición de que la música mueve el alma antes que la mente. Un cantor puede tener voz de oro y corazón torcido, y su melodía transmite ese torcimiento."}
                </p>
                <p>
                  {fa
                    ? "درمانِ آشکار نیز به همان اندازه ملموس است: در مطالعهٔ منظم و شبانهٔ تورایِ شفاهی (گِمارا) فرو شو، و از درون مصون می‌شوی — می‌توانی هرکسی را «بی‌آسیب» بشنوی. از جهانِ پرهیاهو نگریز؛ از درون خود را زره‌پوش کن."
                    : "El remedio del pshat es igualmente concreto: sumérgete en el estudio disciplinado y nocturno de la Torá oral (la Guemará), y quedarás inmunizado — podrás oír a cualquiera «sin daño». No huyas del mundo ruidoso; blíndate por dentro."}
                </p>
                <p className="rounded-xl border border-gold/10 p-4 text-center italic" style={{ background: `${C}08` }}>
                  {fa
                    ? "شنیدنِ بی‌گناهی وجود ندارد. یا نغمه تو را برمی‌کشد، یا در دامِ همان سرچشمه‌ای که از آن آمده گرفتارت می‌کند."
                    : "No hay audición inocente. O la melodía te eleva, o te enreda en la red de la misma fuente de la que vino."}
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
                  ? "نغمه، بنایِ مَلخوت است — «مُلک» را نه همراهی، بلکه بنا می‌کند. ازین‌رو داوود که «نواختن می‌داند» شایستهٔ پادشاهی شد. اینجا نقشهٔ کابالی گشوده می‌شود:"
                  : "La neginá es la edificación de Maljut — no acompaña al Reino, lo construye. Por eso David, que «sabe tocar», fue digno de reinar. Aquí se despliega el mapa cabalístico:"}
              </p>
              {/* Tabla de correspondencias */}
              <div className="overflow-x-auto rounded-xl border border-gold/15" style={{ background: "rgba(14,12,22,0.8)" }}>
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
                      { l: "נְגִינָה", name: fa ? "نِگینا · نغمه" : "Neginá · melodía", corr: fa ? "بنایِ مَلخوت (مُلک)" : "Binián ha-Maljut (edifica el Reino)", val: fa ? "زوهر/آریزال §۲،§۷ ✔" : "Zohar/Arizal §2,§7 ✔" },
                      { l: "חַזָּן ↔ חָזוֹן", name: fa ? "خزّان ↔ خازون" : "jazán ↔ jazón", corr: fa ? "نوازنده ↔ رؤیتِ نبوی" : "Cantor ↔ visión profética", val: fa ? "ریشهٔ ח-ז-ה (دیدن) — نه عددی (۶۵≠۷۱)" : "raíz ח-ז-ה (ver) — NO numérico (65≠71)" },
                      { l: "נֶצַח + הוֹד", name: fa ? "نِتساح + هود" : "Nétzaj + Hod", corr: fa ? "دایگانِ پیامبران" : "Las nodrizas de los profetas", val: fa ? "۱۴۸+۱۵=۱۶۳ (محاسبهٔ سوفِر)" : "148+15=163 (cálculo del Sofer)" },
                      { l: "קָנֶה", name: fa ? "قانه · نای/حلق" : "Kané · tráquea", corr: fa ? "קְנֵה: «رفیقی برای خود بگیر» (آووت ۱:۶)" : "קְנֵה: «adquiere un compañero» (Avot 1:6)", val: fa ? "۱۵۵ ✔" : "155 ✔" },
                      { l: "שִׁתִּין בָּתֵּי", name: fa ? "شصت خانه" : "Sesenta casas", corr: fa ? "شصت مَسِخِتِ تلمود" : "Las sesenta masejtot del Talmud", val: fa ? "معادلِ نمادین — نه گماتریا" : "equivalencia simbólica — NO gematría" },
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
                  ? "نکتهٔ سوفِر: پیوندِ خزّان/خازون اِتیمولوژیک است، نه عددی (۶۵ و ۷۱ برابر نیستند) — قدرتش در ریشهٔ مشترکِ «دیدن/رؤیت» است. و «شصت خانه = شصت مَسِخِت» یک برابریِ نمادینِ کمیت است که خودِ ربه صریحاً می‌گوید، نه گماتریا. صداقت حکم می‌کند این‌ها را در لباسِ عدد جا نزنیم."
                  : "Nota del Sofer: el vínculo jazán/jazón es etimológico, no numérico (65 y 71 no son iguales) — su fuerza está en la raíz compartida «ver/visión». Y «sesenta casas = sesenta masejtot» es una equivalencia simbólica de cantidad que el propio Rebbe declara, no una gematría. La honestidad manda no disfrazarlas de número."}
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
                    ? "این یکی از ریشه‌های متنیِ عشقِ برسلوو به موسیقی است. برای ربه نجمن، نیگون آرایشِ خدمت نیست: یک فنّاوریِ روح است. نغمه، «مُلکِ درونی» را می‌سازد — توانِ تو در فرمان‌راندن بر خویش و راندنِ زندگی‌ات به‌سویِ آفریدگار. ملودیِ خود را چنان برگزین که رفیقِ خود را: «رفیقی برای خود بگیر» (آووت ۱:۶) را ربه می‌خواند «نای (قانه) را اصلاح کن» — گلو، سازِ آواز را."
                    : "Esta es una de las raíces textuales del culto breslover a la música. Para Rebbe Najman el niggun no es adorno del servicio: es una tecnología del alma. La melodía edifica tu «reino interior» — tu capacidad de gobernarte y dirigir tu vida hacia el Creador. Elige tu música como eliges tu compañía: «adquiere un compañero» (Avot 1:6) el Rebbe lo lee como «rectifica el kané» — la garganta, el instrumento del canto."}
                </p>
                <div className="rounded-xl border p-4" style={{ borderColor: `${C}30`, background: `${C}06` }}>
                  <p className="text-sm font-semibold text-parchment/90" dir={fa ? "rtl" : "ltr"}>
                    {fa
                      ? "نیگون همچون درمان: کسی که در نغمه‌ای شادمانه غرق می‌شود، در خدا شاد می‌گردد؛ کسی که نغمهٔ بیداری می‌شنود، بیدار می‌شود و به تِشووا می‌اندیشد. حالِ روح از راهِ ملودی سرایت می‌کند — و برسلووی برمی‌گزیند که از آنچه برمی‌کشد سرایت بگیرد. این منطقِ نیگونِ پیش از دعاست: نخست ساز (روح) را کوک می‌کنی، سپس می‌نوازی (دعا می‌کنی)."
                      : "El niggun como terapia: quien se sumerge en un canto gozoso se alegra en Dios; quien oye un canto de despertar se despierta y contempla el teshuvá. El estado del alma se contagia por la melodía — y el breslover elige contagiarse de lo que eleva. Esta es la lógica del niggun antes de rezar: primero afinas el instrumento (el alma), después tocas (rezas)."}
                  </p>
                </div>
                <p>
                  {fa
                    ? "و لبه‌ای هست: وقتی به‌راستی مَلخوتت را اصلاح می‌کنی، «می‌توانی بر هرچه بخواهی فرمان برانی» — و جهان می‌تواند ویران شود. ازین‌رو میشنا مُهر می‌زند: «هر انسان را به کفهٔ زَخوت (نیکی) داوری کن.» قدرتِ نغمهٔ بنا‌شده، فروتنیِ نیک‌داوری را می‌طلبد؛ زیرا خدا ویرانیِ جهان را نمی‌خواهد — آن را نه برای آشوب، بلکه برای آبادانی آفرید (یشعیا ۴۵:۱۸)."
                    : "Y hay un filo: cuando de veras rectificas tu Maljut, «puedes gobernar sobre lo que quieras» — y el mundo podría arruinarse. Por eso la Mishná sella: «juzga a todo hombre para bien». El poder del canto edificado exige la humildad de juzgar favorablemente; porque Dios no desea la ruina del mundo: no lo creó para el caos, sino para ser habitado (Yeshaiá 45:18)."}
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
                    ? "رازِ تمامِ این تورا، یک آناتومیِ شیرخوارگیِ روحانی است: هر صدا از پستانی شیر می‌خورد؛ تنها پرسش این است که از کدام."
                    : "El secreto de toda esta Torá es una anatomía de la lactancia espiritual: toda voz mama de algún pecho; la única pregunta es de cuál."}
                </p>
                <div className="rounded-xl border border-gold/15 p-5 space-y-3" style={{ background: "rgba(14,12,22,0.8)" }}>
                  <div dir="rtl" className="text-center">
                    <p className="hebrew text-base font-bold text-gold mb-1">מֵאֲתַר דִּנְבִיאִים יָנְקִין</p>
                    <p className="font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                      {fa ? "زوهر ۳:۵۳ب" : "Zohar III:53b"}
                    </p>
                    <p className="mt-2 text-sm italic text-parchment/70" dir={fa ? "rtl" : "ltr"}>
                      {fa
                        ? "«از جایگاهی که پیامبران شیر می‌خورند شیر می‌خورند» — دو پرندهٔ پاک به نِتساح و هود، دایگانِ پیامبران و بنایِ مَلخوت، پیوند می‌خورند. نغمهٔ پاک، مَلخوت را به سرچشمهٔ نبوی‌اش برمی‌کشد."
                        : "«Maman del lugar de donde maman los profetas» — las dos aves puras se enlazan con Nétzaj y Hod, las nodrizas de los profetas y la edificación de Maljut. El canto puro eleva a Maljut hacia su fuente profética."}
                    </p>
                  </div>
                </div>
                <p>
                  {fa
                    ? "و رازِ اصلاحِ والاتر: نه‌تنها در برابرِ موسیقیِ کج زره‌پوش‌شدن، بلکه رهاندنِ آن — بیرون‌کشیدنِ جرقهٔ اسیر و بازگرداندنش به سرچشمه. داوود می‌دانست حتی نغمه‌ای را که از «پشتِ» قداست می‌آید برکشد. تنها le-atid (در آینده)، آن‌گاه که «خداوند بر تمامِ زمین پادشاه خواهد بود» (زخریا ۱۴:۹)، خزّان‌ها دِعا و سِخِل خواهند داشت: «زَمّرو مَسکیل» (تهیلیم ۴۷:۸)."
                    : "Y el secreto del tikún más alto: no solo blindarse contra la música torcida, sino redimirla — extraer la chispa cautiva y devolverla a la fuente. David sabía elevar incluso la melodía que viene de las «espaldas» de la santidad. Solo le-atid (en el futuro), cuando «Hashem será Rey sobre toda la tierra» (Zejariá 14:9), los jazanim tendrán deá y sejel: «zamru maskil» (Tehilim 47:8)."}
                </p>
                <p>
                  {fa
                    ? "و اژدها و درخت (سودِ اگادا): اژدهایی که می‌بلعد، مطالعهٔ she-lo lishmá (نه برای خود) است؛ درختی که همه‌چیز را در می‌نوردد، خِسِدِ ابراهیم است (וַיִּטַּע אֵשֶׁל). خِسِدِ شبانه از اژدها نیرومندتر است. سوفِر با احتیاطِ مفهومی می‌افزاید: נָחָשׁ (اژدها) = ۳۵۸ = מָשִׁיחַ گماتریایی کلاسیک است، اما ربه نجمن اینجا آن را به‌کار نمی‌برد؛ تنها به‌مثابهٔ طنین می‌آوریم، نه در دهانِ او — رهبری با ذات، نه با عدد."
                    : "Y la serpiente y el árbol (sod de la agadá): el taniná que traga es el estudio she-lo lishmá (no por su propio bien); el árbol que todo lo trasciende es el jésed de Avraham (וַיִּטַּע אֵשֶׁל). El jésed nocturno es más fuerte que la serpiente. El Sofer añade con cautela conceptual: נָחָשׁ (serpiente) = 358 = מָשִׁיחַ es una gematría clásica, pero Rebbe Najman NO la invoca aquí; la ofrecemos solo como resonancia, no en su boca — se lidera con la esencia, no con el número."}
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
                  es: "Soy un instrumento de cuerda, y alguien está tocando en mí todo el día. Cada canción que dejo entrar pulsa mis seis anillos internos; cada voz que sigo me ata a la fuente de la que esa voz mamó. No hay audición inocente.",
                  fa: "من سازی زهی‌ام، و کسی تمامِ روز در من می‌نوازد. هر آهنگی که به درون راه می‌دهم شش حلقهٔ درونی‌ام را می‌نوازد؛ هر صدایی که دنبال می‌کنم مرا به سرچشمه‌ای که از آن شیر خورده می‌بندد. شنیدنِ بی‌گناهی نیست.",
                },
                {
                  n: "02",
                  es: "Mi servicio a Dios sube o baja con lo que suena en mis oídos. No es consejo estético: es que mi capacidad de gobernar mi reino interior, de rezar, de servir, depende de la música que elijo. Elijo mi playlist como elijo mi compañía.",
                  fa: "خدمتم به خدا با آنچه در گوش‌هایم می‌نوازد بالا و پایین می‌رود. توصیه‌ای زیبایی‌شناختی نیست: توانِ من در فرمان‌راندن بر مُلکِ درونی‌ام، در دعا، در خدمت، به موسیقی‌ای که برمی‌گزینم بسته است. فهرستِ آهنگم را چنان برمی‌گزینم که رفیقم را.",
                },
                {
                  n: "03",
                  es: "No tengo que huir del mundo ruidoso. El remedio no es taparme los oídos, es fortalecerme por dentro con el estudio de la noche, para caminar entre toda voz «sin daño». El tzadik no evita el mundo: es el árbol tan enraizado en jésed que la serpiente que sube por él no lo tumba — lo eleva.",
                  fa: "لازم نیست از جهانِ پرهیاهو بگریزم. درمان، بستنِ گوش‌ها نیست، بلکه نیرومندشدن از درون با مطالعهٔ شب است، تا میانِ هر صدا «بی‌آسیب» گام بردارم. تسدیق از جهان نمی‌گریزد: درختی است چنان در خِسِد ریشه‌دار که اژدهایی که از آن بالا می‌رود سرنگونش نمی‌کند — برش می‌کشد.",
                },
                {
                  n: "04",
                  es: "Aun mi estudio imperfecto atrae un hilo de jésed. Si estudio «por las razones equivocadas», pero lo hago de noche, un hilo de bondad se extiende sobre mí y me protege. Dios lo teje incluso sobre el que aún no lo hace del todo bien. «¡Cuán grande la fuerza del árbol!»",
                  fa: "حتی مطالعهٔ ناقصم رشته‌ای از خِسِد را جلب می‌کند. اگر «به دلایلِ نادرست» مطالعه کنم، اما شب انجامش دهم، رشته‌ای از نیکی بر من گسترده می‌شود و نگاهم می‌دارد. خدا آن را حتی بر کسی که هنوز کامل نمی‌کند می‌بافد. «قدرتِ آن درخت چه اندازه است!»",
                },
                {
                  n: "05",
                  es: "El poder que el canto me edifica exige que ame el mundo que gobierna. Cuando mi Maljut está afinada, «puedo dar muerte y vida» — por eso el sello es juzgar a todo hombre para bien. El poder sin compasión destruye; la melodía verdadera desemboca en juzgar bien al prójimo.",
                  fa: "قدرتی که نغمه در من بنا می‌کند، عشق‌ورزیدن به جهانی را که بر آن فرمان می‌رانم می‌طلبد. چون مَلخوتم کوک است، «می‌توانم مرگ و زندگی ببخشم» — ازین‌رو مُهر، نیک‌داوریِ هر انسان است. قدرتِ بی‌رحمت ویران می‌کند؛ نغمهٔ حقیقی به نیک‌داوریِ همسایه می‌انجامد.",
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
                {fa ? "شَباتِ نغمه: گوش‌هایت را شفا بده" : "«El Shabbat del niggun: cura tus oídos»"}
              </p>
            </div>

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  n: "1",
                  label: fa ? "گوش‌هایت را شفا بده، شبِ جمعه" : "Cura tus oídos, viernes de noche",
                  es: "Antes o durante la cena de Shabbat, pon o canta conscientemente un niggun kasher — un niggun breslover, o cualquier melodía nacida de la kedushá. Escúchalo no de fondo, sino con intención: deja que «edifique tu Maljut», que afine tu semana. Un solo niggun elegido a propósito vale más que horas de sonido ambiental.",
                  fa: "پیش از شامِ شَبات یا در حینِ آن، آگاهانه یک نیگونِ کاشِر بگذار یا بخوان — نیگونی برسلووی، یا هر ملودی‌ای که از قداست زاده شده. آن را نه در پس‌زمینه، بلکه با نیّت بشنو: بگذار «مَلخوتت را بنا کند»، هفته‌ات را کوک کند. یک نیگونِ آگاهانه از ساعت‌ها صدای محیطی ارزشمندتر است.",
                },
                {
                  n: "2",
                  label: fa ? "نای (قانه) را با صدایی سپاسگزار اصلاح کن" : "Rectifica el kané con una voz agradecida",
                  es: "En algún momento del Shabbat, usa tu propia garganta para bien: canta en la mesa (zemirot), o simplemente di en voz alta una bendición o un agradecimiento con kavaná. Estás afinando los seis anillos por los que sale tu voz.",
                  fa: "در جایی از شَبات، گلویِ خود را برای نیکی به‌کار بر: بر سرِ سفره بسرا (زِمیروت)، یا تنها یک بِراخا یا سپاسی را با کَوانا بلند بگو. تو داری شش حلقه‌ای را که صدایت از آن‌ها بیرون می‌آید کوک می‌کنی.",
                },
                {
                  n: "3",
                  label: fa ? "«به کفهٔ نیکی داوری کن» — بهایِ قدرت" : "«Dan lejaf zejut» — el peaje del poder",
                  es: "Elige una persona sobre la que tengas un juicio negativo, y este Shabbat júzgala para bien: inventa la explicación favorable, la que la disculpa. Ese es el uso correcto del «reino» que el canto te edifica: gobernar hacia la vida, no hacia la ruina.",
                  fa: "کسی را که دربارهٔ او داوریِ منفی داری برگزین، و این شَبات او را به نیکی داوری کن: توضیحِ مساعد را بیندیش، همان که معذورش می‌دارد. این کاربردِ درستِ آن «مُلکی» است که نغمه در تو بنا می‌کند: فرمان‌راندن به‌سویِ زندگی، نه ویرانی.",
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
                {fa ? "نکتهٔ عملی:" : "Nota práctica:"}
              </span>
              <span className="ml-2">{fa ? "چون شَبات است، «مطالعهٔ شبانهٔ گِمارا»یِ درمان با مطالعهٔ مجاز در شَبات (مرور، آموختن از کتاب، شنیدنِ تورا) برآورده می‌شود. انضباطِ شبانهٔ شَس را برای شب‌های هفتهٔ آینده نگه دار." : "Como es Shabbat, «estudiar la Guemará de noche» del remedio se cumple con el estudio permitido en Shabbat (repasar, aprender de un libro, oír Torá). Guarda la disciplina nocturna del Shas para las noches de la semana entrante."}</span>
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
                    es: "La melodía (niggun) edifica el reino interior del alma. Su fuente —profética o de la klipá— decide si te eleva o te enreda; y toda voz mama de algún pecho, la única pregunta es de cuál.",
                    fa: "نغمه (نیگون) مُلکِ درونیِ روح را بنا می‌کند. سرچشمه‌اش — نبوی یا از کلیپا — تعیین می‌کند که تو را برمی‌کشد یا به دام می‌اندازد؛ و هر صدا از پستانی شیر می‌خورد، تنها پرسش این است: از کدام.",
                  },
                  {
                    icon: "◇",
                    label: fa ? "بینشِ کلیدی" : "Insight clave",
                    es: "El remedio no es taparte los oídos, sino blindarte por dentro: el estudio nocturno de la Torá oral rectifica los seis anillos de la garganta y te deja oír a cualquiera «sin daño».",
                    fa: "درمان بستنِ گوش‌ها نیست، بلکه زره‌پوش‌شدن از درون است: مطالعهٔ شبانهٔ تورایِ شفاهی شش حلقهٔ گلو را اصلاح می‌کند و می‌گذارد هرکسی را «بی‌آسیب» بشنوی.",
                  },
                  {
                    icon: "○",
                    label: fa ? "بینشِ روحانی" : "Insight espiritual",
                    es: "Enraízate de noche en la Torá y serás como el árbol de Avraham: la serpiente que sube por ti no te tumba, te eleva. Aun tu estudio imperfecto atrae un hilo de jésed que te protege.",
                    fa: "شب در تورا ریشه بدوان تا چون درختِ ابراهیم شوی: اژدهایی که از تو بالا می‌رود سرنگونت نمی‌کند، برت می‌کشد. حتی مطالعهٔ ناقصت رشته‌ای از خِسِد را جلب می‌کند که نگاهت می‌دارد.",
                  },
                  {
                    icon: "✦",
                    label: fa ? "کاربرد" : "Aplicación",
                    es: "Elige un niggun kasher este Shabbat, canta con kavaná para afinar tu garganta, y juzga a una persona para bien — el peaje del reino que el canto te edifica.",
                    fa: "این شَبات یک نیگونِ کاشِر برگزین، با کَوانا بسرا تا گلویت کوک شود، و کسی را به نیکی داوری کن — بهایِ آن مُلکی که نغمه در تو بنا می‌کند.",
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
                  <Tile he="נְגִינָה" sub={fa ? "نغمه" : "Niggun"} color={C} size={34} />
                  <span className="font-cinzel text-2xl" style={{ color: `${C}50` }}>→</span>
                  <Tile he="לַיְלָה" sub={fa ? "شب · تورا" : "Noche · Torá"} color="#c9a43e" size={34} />
                  <span className="font-cinzel text-2xl" style={{ color: `${C}50` }}>→</span>
                  <Tile he="אִילָנָא" sub={fa ? "درخت · خِسِد" : "El árbol · Jésed"} color={C} size={34} />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── UMBRAL הֶמְשֵׁךְ — "Sigue el hilo" ── */}
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
                  es: "¿Y si la oración misma es un arma de aliento? → el arma secreta del Mashíaj (LM I:2)",
                  fa: "و اگر خودِ دعا سلاحی از نَفَس باشد؟ ← سلاحِ پنهانِ ماشیَح (LM I:2)",
                  href: "/misterio/likutei-moharan-i-2",
                },
                {
                  es: "¿Y la gracia que hace que tu voz entre en el corazón? → el jen (LM I:1)",
                  fa: "و آن فیضی که صدایت را به دل وارد می‌کند؟ ← حَنِ (LM I:1)",
                  href: "/misterio/likutei-moharan-i-1",
                },
                {
                  es: "¿Cómo se levanta un canto en la noche? → «Kumi roni valaila» (Eijá 2:19)",
                  fa: "چگونه نغمه‌ای در شب برمی‌خیزد؟ ← «قومی رونی وَلَیلا» (اِیخا ۲:۱۹)",
                  href: "/estudio?ref=Lamentations.2.19",
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
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px flex-1 opacity-20" style={{ background: C }} />
              <span className="hebrew text-sm" style={{ color: `${C}60` }}>שַׁבָּת</span>
              <div className="h-px flex-1 opacity-20" style={{ background: C }} />
            </div>

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
              onClick={() => router.push("/estudio?ref=Likutey_Moharan.3")}
              className="mb-6 rounded-full border-2 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
              style={{
                borderColor: C, color: C, background: `${C}12`,
                boxShadow: `0 0 20px ${C}33`,
              }}>
              {fa ? "مطالعهٔ این متن در جاشمال ←" : "Estudiar este texto en Jashmal →"}
            </button>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { es: "El canto — niggun", fa: "نغمه — نیگون", ref: "I Samuel 16:18" },
                { es: "La noche — Torá oral", fa: "شب — تورایِ شفاهی", ref: "Lamentations 2:19" },
                { es: "El árbol — jésed de Avraham", fa: "درخت — خِسِدِ ابراهیم", ref: "Genesis 21:33" },
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
