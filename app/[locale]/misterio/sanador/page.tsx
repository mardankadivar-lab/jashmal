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

export default function PageSanador() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#3fa68a"; // verde-jade: la sanidad como Nombre vivo

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
            {fa ? "سلسلهٔ شفا · خروج ۱۵:۲۶" : "Serie Sanidad · Éxodo 15:26"}
          </p>
          <span className="hebrew block font-bold leading-none"
            style={{ fontSize: "clamp(44px, 13vw, 86px)", color: "#fff6e0",
              textShadow: dark ? `0 0 36px ${C}, 0 0 12px ${C}` : "none" }}>
            יְהוָה רֹפְאֶךָ
          </span>
          <h2 className="mt-5 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "من خداوند، شفادهندهٔ تو" : "Yo soy Hashem tu sanador"}
          </h2>
        </div>

        {/* ── EL VERSÍCULO ── */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "آن آیه" : "El versículo"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "تازه از دریای سرخ گذشته‌اند. در مارا، آب تلخ بود و قوم لب به شکایت گشودند. خدا آبی شیرین به ایشان داد و آنگاه عهدی بست: «اگر آوازِ خداوند، خدایت را به‌راستی بشنوی... هیچ‌یک از بیماری‌هایی را که بر مصر نهادم، بر تو نخواهم نهاد؛ زیرا من خداوند، شفادهندهٔ توام» (خروج ۱۵:۲۶)."
                : "Acaban de cruzar el Mar Rojo. En Mará, el agua era amarga y el pueblo se quejó. Dios les endulzó el agua y entonces selló un pacto: «Si de veras escuchas la voz de Hashem tu Dios... ninguna de las enfermedades que puse sobre Egipto pondré sobre ti, porque Yo soy Hashem tu sanador» (Éxodo 15:26)."}
            </p>
            <p>
              {fa
                ? "واژهٔ پایانی، רֹפְאֶךָ (روفِئِخا)، یعنی «شفادهندهٔ تو». خدا نمی‌گوید «شفا را می‌فرستم» یا «شفا را می‌بخشم». می‌گوید: شفادهنده، خودِ من‌ام. شفا فعلِ او نیست — یکی از نام‌های اوست."
                : "La palabra final, רֹפְאֶךָ (rofejá), significa «tu sanador». Dios no dice «envío la cura» ni «doy la cura». Dice: el sanador soy Yo mismo. La sanidad no es una acción Suya — es uno de Sus Nombres."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="Porque Yo soy Hashem tu sanador."
          fa="زیرا من خداوند، شفادهندهٔ توام."
          source={fa ? "خروج ۱۵:۲۶" : "Éxodo 15:26"} fa_active={fa} />

        {/* ── RASHI ── */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "راشی: تورات همچون نسخهٔ پزشک" : "Rashi: la Torá como receta"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "راشی (فرانسه، سدهٔ یازدهم؛ بزرگ‌ترین مفسّرِ تورات) بر این آیه نکته‌ای ژرف می‌آورد. او می‌پرسد: اگر خدا بیماری را نمی‌فرستد، پس «شفادهنده» چه معنا دارد؟ و پاسخ می‌دهد — به نقل از مِخیلتا — که خودِ تورات شفاست. سخنانِ تورات، چون نسخهٔ پزشک، پیشگیری‌اند: آن‌که بدان‌ها زندگی کند، بیماری بر او راه نمی‌یابد."
                : "Rashi (Francia, siglo XI; el más grande de los comentaristas de la Torá) trae sobre este versículo una idea honda. Pregunta: si Dios no envía la enfermedad, ¿qué significa «sanador»? Y responde — citando la Mejilta — que la Torá misma es la medicina. Las palabras de la Torá, como la receta de un médico, son preventivas: quien vive según ellas, no deja entrar la enfermedad."}
            </p>
            <p>
              {fa
                ? "پس خدا دو شفا دارد: یکی، شفای آن‌که افتاده است؛ دیگری، تورات همچون پیشگیری — تا اصلاً نیفتی. پزشکِ راستین نه فقط درمان می‌کند، که نگه می‌دارد."
                : "Así Dios tiene dos sanidades: una, la cura del que ya cayó; otra, la Torá como prevención — para que no caigas siquiera. El médico verdadero no solo cura: sostiene."}
            </p>
          </div>
        </Section>

        {/* ── TEHILIM 103:3 ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "نخست آمرزش، آنگاه شفا" : "Primero el perdón, luego la cura"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="הַסֹּלֵחַ" sub={fa ? "آمرزنده" : "Perdona"} color="#e0a850" size={36} />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <Tile he="הָרֹפֵא" sub={fa ? "شفادهنده" : "Sana"} color={C} size={36} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "داوود در مزامیر ۱۰۳:۳ همان دو شفا را در یک آیه می‌گذارد، و ترتیبشان رازی است: «הַסֹּלֵחַ לְכָל עֲוֺנֵכִי، הָרֹפֵא לְכָל תַּחֲלֻאָיְכִי» — «او که همهٔ گناهانت را می‌آمرزد، که همهٔ بیماری‌هایت را شفا می‌دهد»."
                : "David, en Salmos 103:3, pone esas dos sanidades en un solo versículo, y su orden es un secreto: «הַסֹּלֵחַ לְכָל עֲוֺנֵכִי, הָרֹפֵא לְכָל תַּחֲלֻאָיְכִי» — «Él, que perdona todas tus culpas, que sana todas tus dolencias»."}
            </p>
            <p>
              {fa
                ? "نخست הַסֹּלֵחַ (هَسولِئَح، «آمرزنده»)، و سپس הָרֹפֵא (هاروفِئه، «شفادهنده»). آمرزش پیش از شفا می‌آید. حکیمان می‌آموزند که شفای راستین از درون آغاز می‌شود: نخست جان پاک می‌گردد، آنگاه تن می‌تواند بهبود یابد. آمرزش، خود نخستین دارو است."
                : "Primero הַסֹּלֵחַ (hasoléaj, «el que perdona»), luego הָרֹפֵא (harofé, «el que sana»). El perdón viene antes que la cura. Los sabios enseñan que la sanidad verdadera empieza por dentro: primero se limpia el alma, después el cuerpo puede recuperarse. El perdón es ya la primera medicina."}
            </p>
          </div>
        </Section>

        {/* ── SÍNTESIS ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              אֲנִי יְהוָה רֹפְאֶךָ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "شفا، نه چیزی که او می‌فرستد — بلکه آنچه او هست" : "La sanidad no es algo que Él envía — es lo que Él es"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "هنگامی که خدا خود را «شفادهندهٔ تو» می‌نامد، چیزی دربارهٔ ذاتِ خود می‌گوید. شفا یکی از کارهای او در میانِ بسیار نیست؛ نامِ اوست. و راهِ آن نام، از مزامیر ۱۰۳:۳ پیداست: نخست آمرزش، آنگاه شفا. آن‌که در پیِ بهبود است، ابتدا با جانِ خود آشتی کند. زیرا پزشکِ راستین، تن را پس از جان درمان می‌کند."
                : "Cuando Dios se nombra a Sí mismo «tu sanador», dice algo sobre Su esencia. La sanidad no es una de Sus muchas obras: es Su Nombre. Y el camino de ese Nombre lo muestra Salmos 103:3: primero el perdón, luego la cura. Quien busca sanar, que primero se reconcilie con su propia alma. Porque el médico verdadero cura el cuerpo después del alma."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "خروج ۱۵:۲۶" : "Éxodo 15:26", ref: "Exodus 15:26" },
                { label: fa ? "مزامیر ۱۰۳:۳" : "Salmos 103:3", ref: "Psalms 103:3" },
                { label: fa ? "مارا، آبِ تلخ" : "Mará, el agua amarga", ref: "Exodus 15:23" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Exodus 15:26")}&context=kabbalah`)}
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
                ? "شاید به همین سبب آبِ تلخِ مارا شیرین شد پیش از آنکه خدا خود را شفادهنده بخواند: نخست باید چیزی تلخ، شیرین شود — آنگاه نامِ شفا گفته می‌تواند شد. در هر تلخی، شیرینی‌ای پنهان است که در انتظارِ نامِ اوست."
                : "Quizás por eso el agua amarga de Mará se endulzó antes de que Dios se llamara sanador: primero algo amargo debe volverse dulce — y solo entonces puede pronunciarse el Nombre de la sanidad. En toda amargura hay una dulzura escondida que aguarda Su Nombre."}
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
