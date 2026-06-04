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

export default function PageRefael() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#5b8fd6"; // azul-cielo: el ángel que desciende a sanar

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/gematrias" className="font-cinzel text-sm text-gold/70 hover:text-gold">← {fa ? "گیماتریا" : "Gematría"}</Link>
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

        {/* HERO */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "سلسلهٔ شفا · رفائل" : "Serie Sanidad · Refael"}
          </p>
          <Tile he="רְפָאֵל" sub={fa ? "خدا شفا می‌دهد" : "Dios sana"} color={C} size={56} />
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            311
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "رفائل — فرشتهٔ شفا" : "Refael — el ángel de la sanidad"}
          </h2>
        </div>

        {/* ── EL NOMBRE ── */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "نامی که جمله‌ای است" : "Un nombre que es una frase"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "רְפָאֵל (رفائل) از دو پاره ساخته شده: רָפָא (رافا، «شفا داد») و אֵל (ال، «خدا»). نام، خود یک جمله است: «خدا شفا داده است». فرشته نه منبعِ شفا، که اعلامِ آن است — هرجا که او پدیدار شود، می‌گوید: شفا از خداست."
                : "רְפָאֵל (Refael) está hecho de dos piezas: רָפָא (rafá, «sanó») y אֵל (El, «Dios»). El nombre es ya una frase entera: «Dios ha sanado». El ángel no es la fuente de la cura, sino su anuncio — donde él aparece, declara: la sanidad viene de Dios."}
            </p>
            <p>
              {fa
                ? "رفائل در خودِ متنِ تورات با نام نمی‌آید، اما سنّت او را یکی از سه فرشته‌ای می‌داند که بر ابراهام ظاهر شدند، و کارش را به‌روشنی بازمی‌شناسد."
                : "Refael no aparece nombrado en el texto explícito de la Torá, pero la tradición lo identifica como uno de los tres ángeles que se aparecieron a Abraham, y reconoce con claridad su oficio."}
            </p>
          </div>
        </Section>

        {/* ── GEMATRÍA 311 + KOLEL ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "حسابِ نام" : "La cuenta del nombre"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="רפא" sub="281" color="#e0a850" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="אל" sub="31" color="#9a6a8e" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="רְפָאֵל" sub="311" color={C} size={40} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "ارزشِ عددیِ کاملِ رفائل ۳۱۱ است: ر=۲۰۰، פ=۸۰، א=۱، ל=۳۰ → ۲۰۰+۸۰+۱+۳۰ = ۳۱۱."
                : "El valor numérico completo de Refael es 311: ר=200, פ=80, א=1, ל=30 → 200+80+1+30 = 311."}
            </p>
            <p>
              {fa
                ? "و اگر دو پارهٔ نام را جدا بشماریم: רפא (راهِ «شفا») = ۲۰۰+۸۰+۱ = ۲۸۱؛ و אל (خدا) = ۱+۳۰ = ۳۱. پس ۲۸۱ + ۳۱ = ۳۱۲ — یعنی ۳۱۱ + ۱."
                : "Y si contamos las dos piezas por separado: רפא (la raíz «sanar») = 200+80+1 = 281; y אל (Dios) = 1+30 = 31. Entonces 281 + 31 = 312 — es decir, 311 + 1."}
            </p>
            <div className="rounded-xl border border-gold/15 bg-gold/[0.04] p-4">
              <p className="text-[13px] leading-relaxed text-parchment/75">
                {fa
                  ? "آن «۱» اضافی همان כּוֹלֵל (کولِل) است: قاعده‌ای کهن در گیماتریا که اجازه می‌دهد خودِ کلمه، چون یک واحدِ یکپارچه، به شمار افزوده شود. وقتی «شفا» و «خدا» را جدا می‌نویسیم، آن یگانگیِ پنهان در نام، همان ۱، آشکار می‌شود. دو پاره، با مُهرِ وحدت، همان نامِ یکپارچه‌اند."
                  : "Ese «1» de más es el כּוֹלֵל (kolel): una regla clásica de la gematría que permite sumar la palabra misma, como unidad entera, al total. Cuando escribimos «sanar» y «Dios» por separado, esa unidad escondida en el nombre — el 1 — se hace visible. Las dos piezas, con el sello de la unidad, son el mismo nombre íntegro."}
              </p>
            </div>
          </div>
        </Section>

        <PullQuoteLite
          es="Y se le apareció Hashem en las encinas de Mamré, mientras él estaba sentado a la puerta de la tienda en el calor del día."
          fa="و خداوند در بلوط‌زارِ مَمرِه بر او ظاهر شد، حال آنکه او در گرمای روز بر درِ خیمه نشسته بود."
          source={fa ? "پیدایش ۱۸:۱" : "Génesis 18:1"} fa_active={fa} />

        {/* ── REFAEL CURA A ABRAHAM ── */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "فرشته‌ای که ابراهام را شفا داد" : "El ángel que curó a Abraham"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در پیدایش ۱۸، سه مرد بر ابراهام ظاهر می‌شوند — این درست روزِ سومِ پس از ختنهٔ اوست، دردناک‌ترین روز. راشی بر پیدایش ۱۸:۲ (به نقل از بِرِشیت رَبّا ۵۰:۲ و تلمود، بابا مِصیعا ۸۶ب) توضیح می‌دهد که هر فرشته یک مأموریت داشت: یکی آمد تا مژدهٔ تولدِ اسحاق را بدهد، یکی تا سُدوم را براندازد، و یکی — رفائل — تا ابراهام را شفا دهد."
                : "En Génesis 18, tres hombres se le aparecen a Abraham — y es justo el tercer día después de su circuncisión, el día más doloroso. Rashi sobre Génesis 18:2 (citando Bereshit Rabá 50:2 y el Talmud, Bava Metzia 86b) explica que cada ángel tenía una sola misión: uno vino a anunciar el nacimiento de Isaac, uno a destruir Sodoma, y uno — Refael — a sanar a Abraham."}
            </p>
            <p>
              {fa
                ? "و اینجا دو لبهٔ راز پیداست: همان فرشته که ابراهام را شفا داد، از آنجا برخاست و رفت تا لوط را از سُدوم برهاند. حکیمان می‌گویند یک فرشته نمی‌تواند دو مأموریت داشته باشد — مگر آنکه آن دو در ژرفا یکی باشند. و شفا و رهایی، یکی‌اند: شفا، رهاییِ تن است؛ رهایی، شفای سرنوشت. آن‌که جسم را التیام می‌بخشد، همان است که از مرگ می‌رهاند."
                : "Y aquí asoman los dos filos del misterio: el mismo ángel que sanó a Abraham se levantó de allí y fue a rescatar a Lot de Sodoma. Los sabios dicen que un ángel no puede tener dos misiones — salvo que las dos sean, en lo profundo, una. Y sanar y rescatar son una sola cosa: la sanidad es el rescate del cuerpo; el rescate es la sanidad del destino. Quien cura la carne es el mismo que salva de la muerte."}
            </p>
          </div>
        </Section>

        {/* ── SÍNTESIS ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              רְפָאֵל · רָפָא אֵל
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "همان دست که شفا می‌دهد، می‌رهاند" : "La misma mano que sana, rescata"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "نامِ رفائل می‌گوید «خدا شفا داده است» — در زمانِ گذشته، چنانکه گویی شفا پیش از بیماری آماده بوده. عددِ او، ۳۱۱، در دو پاره‌اش — شفا و خدا — با مُهرِ کولِل به وحدت بازمی‌گردد. و کارش بر کوهِ ابراهام درس را کامل می‌کند: آن‌که تن را شفا می‌دهد، همان است که جان را از هلاکت می‌رهاند. شفا هرگز تنها جسمانی نیست؛ همواره رهایی است."
                : "El nombre Refael dice «Dios ha sanado» — en pasado, como si la cura estuviera lista antes que la enfermedad. Su número, 311, en sus dos piezas — sanar y Dios — vuelve a la unidad con el sello del kolel. Y su obra junto a Abraham completa la lección: quien sana el cuerpo es el mismo que rescata el alma de la perdición. La sanidad nunca es solo del cuerpo; es siempre un rescate."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "پیدایش ۱۸:۱–۲" : "Génesis 18:1–2", ref: "Genesis 18:1-2" },
                { label: fa ? "بابا مِصیعا ۸۶ب" : "Bava Metzia 86b", ref: "Bava Metzia 86b" },
                { label: fa ? "نجاتِ لوط" : "El rescate de Lot", ref: "Genesis 19:1" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 18:1-2")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ عمیق در جاشمال ←" : "Estudiar este misterio en Jashmal →"}
            </button>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/gematrias" className="hover:text-gold">{fa ? "گالریِ گیماتریا ←" : "Galería de Gematría →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "شاید هر شفا، فرستادنِ همان فرشته باشد: نامی که از پیش می‌گوید «خدا شفا داده است» — حتی پیش از آنکه ما بدانیم بیماریم. و شاید بهبودِ هر کس، خود نشانی باشد که دستی نادیده، در گرمای روز، بر درِ خیمه‌اش نشسته است."
                : "Quizás toda sanidad sea el envío de ese mismo ángel: un nombre que dice de antemano «Dios ha sanado» — aún antes de que sepamos que estamos enfermos. Y quizás la mejoría de cada quien sea ya una señal de que una mano invisible, en el calor del día, se ha sentado a la puerta de su tienda."}
            </p>
          </div>
        </Section>

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
