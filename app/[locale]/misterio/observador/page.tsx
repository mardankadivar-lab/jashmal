"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 });
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

function Tile({ he, sub, color, size = 56 }: { he: string; sub: string; color: string; size?: number }) {
  return (
    <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}>
      <span className="hebrew font-bold leading-none"
        style={{ fontSize: `${size}px`, color: "#fff6e0", textShadow: `0 0 20px ${color}, 0 0 7px ${color}` }}>{he}</span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

function PullQuoteLite({ es, fa, source, fa_active }: { es: string; fa: string; source: string; fa_active: boolean }) {
  return (
    <Section>
      <div className="my-9 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6 text-center">
        <p className="text-lg italic leading-relaxed text-parchment/90" dir={fa_active ? "rtl" : "ltr"}>
          {fa_active ? `«${fa}»` : `«${es}»`}
        </p>
        <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
      </div>
    </Section>
  );
}

export default function PageObservador() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#8a7bf0";       // índigo — la conciencia que observa
  const MENTE = "#5ad1a0";   // verde — la mente
  const CUERPO = "#e8b45a";  // ámbar — el cuerpo, la materia

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterios" className="font-cinzel text-sm text-gold/70 hover:text-gold">← {fa ? "اسرار" : "Misterios"}</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              {fa ? "شروع مطالعه" : "Comenzar estudio →"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* HERO — mente + cuerpo = 137 */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۶" : "Rav Ginsburgh · 137, cap. 6"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="מֹחַ" sub={fa ? "ذهن · ۴۸" : "Mente · 48"} color={MENTE} size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>+</span>
            <Tile he="גּוּף" sub={fa ? "تن · ۸۹" : "Cuerpo · 89"} color={CUERPO} size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>=</span>
            <Tile he="קַבָּלָה" sub="137" color={C} size={32} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            137
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "ناظر — آگاهی‌ای که واقعیت را روشن می‌کند" : "El observador — la conciencia que enciende la realidad"}
          </h2>
        </div>

        {/* SECCIÓN 1 — La física: la realidad no existe hasta que la observas */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "فیزیک: تا نگاه نکنی، هست نیست" : "La física: no existe hasta que la miras"}
          </h3>
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="?" sub={fa ? "برهم‌نهی" : "Superposición"} color={C} size={34} />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <Tile he="•" sub={fa ? "اندازه‌گیری" : "Medición"} color={CUERPO} size={34} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "مکانیکِ کوانتومی به کشفی رسید که هنوز فیزیکدانان را آرام نمی‌گذارد: پیش از آنکه کسی یک ذرّه را اندازه بگیرد، آن ذرّه در «هیچ» حالتِ معیّنی نیست — بلکه در همهٔ حالاتِ ممکن هم‌زمان است. به این می‌گویند «برهم‌نهی» (superposition). همین که ناظری آن را اندازه می‌گیرد، این ابرِ امکان‌ها «فرومی‌ریزد» و یک واقعیتِ یگانه پدیدار می‌شود. در آزمایشِ دو-شکاف، اگر بسنجی نور موج است، موج می‌بینی؛ اگر بسنجی ذرّه است، ذرّه می‌بینی. آنچه تصمیم می‌گیری بسنجی، تعیین می‌کند چه واقعیتی ظاهر شود."
                : "La mecánica cuántica llegó a un descubrimiento que aún no deja dormir a los físicos: antes de que alguien mida una partícula, esa partícula no está en ningún estado definido —sino en todos sus estados posibles a la vez. Lo llaman «superposición». En cuanto un observador la mide, esa nube de posibilidades «colapsa» y aparece una sola realidad. En el experimento de la doble rendija, si mides que la luz es onda, ves onda; si mides que es partícula, ves partícula. Lo que decides medir determina qué realidad se manifiesta."}
            </p>
            <p>
              {fa
                ? "این بخشِ آزاردهنده است: مکانیکِ کوانتومی نمی‌گوید ما فقط نمی‌دانیم واقعیت چیست تا بسنجیم. برخی از بزرگ‌ترین فیزیکدانان — از جمله یوهان فون نویمان و یوجین ویگنر — چنین برداشتی پیش نهادند که این خودِ آگاهیِ ناظر است که واقعیت را قطعی می‌کند. این یکی از چند تعبیرِ ممکن است، نه علمِ قطعی؛ اما همین که آگاهیِ انسان به‌عنوان یک متغیّر واردِ معادلاتِ فیزیک شد، پرسشی کهن را زنده کرد: آیا جهان بدونِ کسی که آن را ببیند، اصلاً هست؟"
                : "Y aquí viene lo perturbador: la mecánica cuántica no dice solo que no sabemos qué es la realidad hasta medirla. Algunos de los mayores físicos —entre ellos John von Neumann y Eugene Wigner— propusieron que es la conciencia misma del observador la que fija la realidad. Es una de varias interpretaciones posibles, no ciencia cerrada; pero el solo hecho de que la conciencia humana entrara como variable en las ecuaciones de la física resucitó una pregunta antiquísima: ¿existe el universo si no hay quien lo mire?"}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="Ningún fenómeno es un fenómeno real hasta que es un fenómeno observado."
          fa="هیچ پدیده‌ای پدیده‌ای واقعی نیست تا آنگاه که مشاهده شود."
          source={fa ? "جان ویلر، فیزیکدان" : "John A. Wheeler, físico"}
          fa_active={fa} />

        {/* SECCIÓN 2 — La Cabalá: nada existe sin conciencia */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "کابالا: هیچ‌چیز بی‌آگاهی وجود ندارد" : "La Cabalá: nada existe sin conciencia"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="עוֹלָם" sub={fa ? "فضا" : "Espacio"} color="#6b7bd0" size={34} />
            <Tile he="שָׁנָה" sub={fa ? "زمان" : "Tiempo"} color="#7b8cd0" size={34} />
            <Tile he="נֶפֶשׁ" sub={fa ? "آگاهی" : "Conciencia"} color={C} size={34} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "کهن‌ترین متنِ کابالا، سِفِر یِتسیرا (کتابِ آفرینش)، هزاران سال پیش نوشت که واقعیت بر سه بُعد استوار است: עוֹלָם (اولام، «جهان» — یعنی فضا)، שָׁנָה (شانا، «سال» — یعنی زمان)، و נֶפֶשׁ (نِفِش، «جان» — یعنی آگاهی). فضا و زمان تنها دو بُعد از سه‌اند. بُعدِ سوم، آگاهیِ ناظر است. فیزیک تازه در قرنِ بیستم به همان‌جا رسید که کابالا از آغاز ایستاده بود: بدونِ آگاهی، واقعیت کامل نیست."
                : "El texto más antiguo de la Cabalá, el Séfer Yetzirá (Libro de la Formación), escribió hace miles de años que la realidad se sostiene sobre tres dimensiones: עוֹלָם (olam, «mundo» —es decir, espacio), שָׁנָה (shaná, «año» —es decir, tiempo), y נֶפֶשׁ (néfesh, «alma» —es decir, conciencia). El espacio y el tiempo son solo dos de las tres. La tercera dimensión es la conciencia del observador. La física llegó apenas en el siglo XX adonde la Cabalá estaba parada desde el principio: sin conciencia, la realidad no está completa."}
            </p>
            <p>
              {fa
                ? "کابالا این را در پایین‌ترین «پرتصوف» (چهرهٔ الهی) می‌گنجاند: נוּקְבָא (نوکوا)، همان מַלְכוּת (مَلخوت، «مُلک»). گفته می‌شود که «هیچ از آنِ خود ندارد» — چون ماه که نورِ خود ندارد و تنها بازمی‌تاباند. اما همین سطح است که با «نام‌گذاری» بر واقعیت فرمان می‌راند: چیزی را اندازه‌گرفتن یعنی تعریفش، طبقه‌بندی‌اش، نام‌دادن به آن — و قدرتِ نام‌گذاری، قدرتِ حکمرانی است. درست همان کاری که ناظرِ کوانتومی می‌کند: با سنجش، به ابرِ امکان‌ها نام و مرز می‌دهد و آن را واقعی می‌کند."
                : "La Cabalá lo ubica en el «partzuf» (rostro divino) más bajo: נוּקְבָא (Nukva), que es מַלְכוּת (Maljut, «reino»). Se dice de él que «no tiene nada de lo suyo» —como la luna, que no tiene luz propia y solo refleja. Y sin embargo es este nivel el que gobierna la realidad al «nombrarla»: medir algo es definirlo, clasificarlo, darle un nombre —y el poder de nombrar es el poder de gobernar. Exactamente lo que hace el observador cuántico: al medir, le da nombre y borde a la nube de posibilidades y la vuelve real."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="El que forma la luz y crea la oscuridad."
          fa="آن‌که نور را می‌سازد و تاریکی را می‌آفریند."
          source={fa ? "یشعیاهو (اشعیا) ۴۵:۷" : "Yeshayahu (Isaías) 45:7"}
          fa_active={fa} />

        {/* SECCIÓN 3 — La ecuación: mente + cuerpo = 137 = Cabalá */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "معادله: ذهن + تن = ۱۳۷ = کابالا" : "La ecuación: mente + cuerpo = 137 = Cabalá"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="מֹחַ" sub={fa ? "ذهن · ۴۸" : "Mente · 48"} color={MENTE} size={44} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="גּוּף" sub={fa ? "تن · ۸۹" : "Cuerpo · 89"} color={CUERPO} size={44} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="137" sub="קַבָּלָה" color={C} size={44} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "و اینجا کشفِ خیره‌کننده است. در عبری، מֹחַ (موآخ، «مغز/ذهن») برابرِ ۴۸ است: מ (۴۰) + ח (۸). و גּוּף (گوف، «تن/بدن») برابرِ ۸۹ است: ג (۳) + ו (۶) + ף (۸۰). جمعشان: ۴۸ + ۸۹ = ۱۳۷. و ۱۳۷ همان ارزشِ عددیِ קַבָּלָה (کابالا) است: ק (۱۰۰) + ב (۲) + ל (۳۰) + ה (۵). عددی که ذهن را به مادّه می‌پیوندد، همان عددِ کابالاست."
                : "Y aquí está el descubrimiento que quita el aliento. En hebreo, מֹחַ (móaj, «cerebro/mente») vale 48: מ (40) + ח (8). Y גּוּף (guf, «cuerpo») vale 89: ג (3) + ו (6) + ף (80). Su suma: 48 + 89 = 137. Y 137 es exactamente el valor numérico de קַבָּלָה (Kabbalah): ק (100) + ב (2) + ל (30) + ה (5). El número que une la mente con la materia es el mismo número de la Cabalá."}
            </p>
            <p>
              {fa
                ? "و ۱۳۷ عددی آشنا است: همان ثابتِ ساختارِ ریز (α ≈ ۱/۱۳۷) که در فیزیک شدتِ برهم‌کنشِ میانِ نور و مادّه را تعیین می‌کند — همان که راز اصلیِ این کتاب است. پس یک عدد، سه پل می‌سازد: نور را به مادّه (فیزیک)، ذهن را به تن (روان‌شناسی)، و هر دو را به کابالا. اشاره‌ای دیگر هم هست: «سِه‌ای نور، و نور شد» (יְהִי אוֹר וַיְהִי אוֹר) برابرِ ۴۷۰ است — و «انسان را بسازیم» (נַעֲשֶׂה אָדָם) نیز برابرِ ۴۷۰. آفرینشِ نور و آفرینشِ آگاهیِ انسانی، یک عدد دارند."
                : "Y 137 es un número conocido: es la constante de estructura fina (α ≈ 1/137) que en física determina la intensidad del intercambio entre la luz y la materia —la misma que es el misterio central de este libro. Así que un solo número tiende tres puentes: la luz a la materia (física), la mente al cuerpo (psicología), y ambos a la Cabalá. Hay otra huella: «Sea la luz, y fue la luz» (יְהִי אוֹר וַיְהִי אוֹר) vale 470 —y «Hagamos al hombre» (נַעֲשֶׂה אָדָם) también vale 470. La creación de la luz y la creación de la conciencia humana comparten un número."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 4 — Hitbonenut */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.05] to-transparent p-8">
            <p className="hebrew mb-4 text-center text-xl text-gold/70" style={{ textShadow: dark ? "0 0 10px #c9a43e44" : "none" }}>
              הִתְבּוֹנְנוּת
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              <p>
                {fa
                  ? "لحظه‌ای با این بنشین. اگر آگاهیِ ناظر واقعیت را قطعی می‌کند، پس نگاهِ تو به جهان بی‌تفاوت نیست. کابالا و چسیدوت این را عملی می‌کنند: «مثبت بیندیش تا خوب شود» — رِبّی مِناحِم مِندلِ چسیدوت آموخت که آگاهی، واقعیت را دگرگون می‌کند. و تلمود می‌گوید تصمیمِ صدیق (تسدیق) واقعیت را می‌سازد: «تسدیق حکم می‌کند و خدا برآورده می‌کند». تو هم هر روز چیزی را «اندازه می‌گیری» — با قضاوت، با انتظار، با نامی که بر آنچه می‌بینی می‌گذاری."
                  : "Siéntate un momento con esto. Si la conciencia del observador fija la realidad, entonces tu mirada sobre el mundo no es indiferente. La Cabalá y la Jasidut lo hacen práctico: «piensa bien y saldrá bien» —el Rebe de Jabad enseñó que la conciencia transforma la realidad. Y el Talmud dice que la decisión del justo (tzadik) da forma a lo real: «el tzadik decreta y Dios cumple». Tú también «mides» algo cada día —con tu juicio, con tu expectativa, con el nombre que le pones a lo que ves."}
              </p>
              <p>
                {fa
                  ? "اما تلمود هشداری هم دارد: «برکت تنها بر آنچه از چشم پنهان است می‌نشیند» — همین که چیزی را می‌شماری و اندازه می‌گیری، آن را از قلمروِ بی‌کرانِ امکان بیرون می‌آوری و به مرزِ محدودِ واقعیت می‌رانی. گاه بهترین کار آن است که نسنجی، نشماری، همه‌چیز را قطعی نکنی — و بگذاری فضایی برای شگفتی و برکت باز بماند. ناظرِ آگاه هم می‌داند کِی بنگرد و کِی بگذارد پنهان بماند."
                  : "Pero el Talmud añade una advertencia: «la bendición solo reposa sobre lo que está oculto a la vista» —apenas cuentas y mides algo, lo sacas del reino infinito de lo posible y lo empujas al borde limitado de lo real. A veces lo mejor es no medir, no contar, no fijarlo todo —y dejar un espacio abierto para la sorpresa y la bendición. El observador consciente también sabe cuándo mirar y cuándo dejar que algo permanezca oculto."}
              </p>
            </div>
          </div>
        </Section>

        {/* Aside — Pauli en la habitación 137 */}
        <Section>
          <div className="my-9 rounded-2xl border border-gold/20 bg-white/[0.02] p-6">
            <p className="mb-2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/50">
              {fa ? "حاشیه‌ای واقعی" : "Una nota real"}
            </p>
            <p className="text-sm italic leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "ولفگانگ پاولی، فیزیکدانِ برندهٔ نوبل، سال‌ها با عددِ ۱۳۷ درگیر بود و با روان‌شناس کارل یونگ کتابی دربارهٔ پیوندِ فیزیک و روان نوشت. گفته می‌شود که چون در سالِ ۱۹۵۸ در یک کلینیکِ زوریخ بستری شد و شمارهٔ اتاقش را دید — ۱۳۷ — گفت که زنده از آنجا بیرون نخواهد آمد. در همان اتاق درگذشت."
                : "Wolfgang Pauli, físico premio Nobel, pasó años obsesionado con el número 137 y escribió con el psicólogo Carl Jung un libro sobre el vínculo entre la física y la psique. Se cuenta que, al ser internado en 1958 en una clínica de Zúrich y ver el número de su habitación —la 137—, dijo que no saldría vivo de allí. Murió en esa habitación."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              מֹחַ · גּוּף
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "عددی که ذهن را به مادّه می‌پیوندد" : "El número que une la mente con la materia"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "فیزیک دریافت که واقعیت تا اندازه‌گرفته نشود قطعی نیست، و آگاهیِ ناظر در آن سهیم است. کابالا هزاران سال پیش گفت که آگاهی سومین بُعدِ واقعیت است — و در عبری، ذهن (۴۸) + تن (۸۹) = ۱۳۷ = کابالا، همان عددی که بر نور حکم می‌راند. جهان با یک نگاه روشن می‌شود."
                : "La física descubrió que la realidad no está fijada hasta que se la mide, y que la conciencia del observador participa en ella. La Cabalá dijo hace miles de años que la conciencia es la tercera dimensión de lo real —y en hebreo, mente (48) + cuerpo (89) = 137 = Cabalá, el mismo número que gobierna la luz. El universo se enciende con una mirada."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بِرِشیت ۱:۲۶" : "Bereshit 1:26", ref: "Genesis 1:26" },
                { label: fa ? "یشعیاهو ۴۵:۷" : "Yeshayahu 45:7", ref: "Isaiah 45:7" },
                { label: fa ? "بابا مِتسیعا ۴۲a" : "Bava Metzia 42a", ref: "Bava Metzia 42a" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 1:26")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ «انسان را بسازیم» در جاشمال ←" : "Estudiar «Hagamos al hombre» en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۶" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 6"}
            </div>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterios" className="hover:text-gold">{fa ? "همهٔ اسرار ←" : "Todos los misterios →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "شاید جهان منتظرِ کسی است که نگاهش کند. و شاید آفرینش، پیش از هر چیز، دعوتی است به دیدن — تا آگاهی، نوری را که در همه‌چیز پنهان است، روشن کند."
                : "Quizá el universo espera a alguien que lo mire. Y quizá la creación es, antes que nada, una invitación a ver —para que la conciencia encienda la luz que está escondida en todas las cosas."}
            </p>
          </div>
        </Section>

        {/* FOOTER */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            {fa ? "کابالا و فلسفهٔ یهودی" : "Cabalá & Filosofía Judía"}
          </p>
        </div>

      </main>
    </div>
  );
}
