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

export default function PageRefua() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  // Las páginas de misterio van SIEMPRE en oscuro: las letras hebreas doradas y
  // el texto pergamino solo se leen bien sobre fondo #05050a.
  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#7d9b8a"; // verde suave: la sanación, el reposo, la vuelta a casa

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

        {/* HERO — las dos sanaciones */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "می شِبِراخ · مزامیر ۱۰۳ و ۶" : "Mi Sheberaj · Salmos 103 y 6"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="הַנֶּפֶשׁ" sub={fa ? "جان · ۴۳۰" : "El alma · 430"} color={C} size={36} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>+</span>
            <Tile he="הַגּוּף" sub={fa ? "تن · ۸۹" : "El cuerpo · 89"} color="#c9a43e" size={36} />
          </div>
          <span className="mt-6 block hebrew font-black leading-none"
            style={{ fontSize: "clamp(64px, 18vw, 116px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            רְפוּאָה
          </span>
          <h2 className="mt-3 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "شفایِ جان و شفایِ تن" : "Sanación del alma y del cuerpo"}
          </h2>
        </div>

        {/* ── UNA ORACIÓN, NO UN VERSÍCULO ── */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "یک دعا، نه یک آیه" : "Una oración, no un versículo"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در کنیسه، وقتی کسی بیمار است، دعایی به نامِ מִי שֶׁבֵּרַךְ (می شِبِراخ، «او که برکت داد...») خوانده می‌شود — دعایی برایِ شفا. در آن از רְפוּאַת הַנֶּפֶשׁ וּרְפוּאַת הַגּוּף (رِفوئَت هَنِفِش اورِفوئَت هَگوف، «شفایِ جان و شفایِ تن») سخن می‌رود."
                : "En la sinagoga, cuando alguien está enfermo, se recita una oración llamada מִי שֶׁבֵּרַךְ (Mi Sheberaj, «El que bendijo...») — una plegaria por la sanación. En ella se pide רְפוּאַת הַנֶּפֶשׁ וּרְפוּאַת הַגּוּף (refuát hanéfesh urfuát haguf, «sanación del alma y sanación del cuerpo»)."}
            </p>
            <div className="rounded-xl border border-gold/15 bg-gold/[0.04] p-4">
              <p className="text-[13px] leading-relaxed text-parchment/75">
                {fa
                  ? "یک یادآوریِ امانت‌دارانه: «می شِبِراخ» آیه‌ای از تورات نیست. این یک دعایِ آیینیِ (لیتورژیک) سده‌هایِ میانه است که در سنّت پدید آمده — متنی محترم و عزیز، اما دعا، نه کلامِ نبوّت. ما آن را با همین کرامت می‌خوانیم: درخواست، نه وعده. هیچ دعایی شفایِ حتمیِ تن را تضمین نمی‌کند."
                  : "Una nota de honestidad: el «Mi Sheberaj» NO es un versículo de la Torá. Es una oración litúrgica medieval surgida en la tradición — un texto venerado y querido, pero plegaria, no palabra de profecía. La tratamos con esa misma dignidad: es una petición, no una promesa. Ninguna oración garantiza la cura segura del cuerpo."}
              </p>
            </div>
          </div>
        </Section>

        {/* ── LA RAÍZ BÍBLICA ── */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "ریشهٔ کتاب‌مقدّسی" : "La raíz bíblica"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "اگرچه خودِ دعا متأخّر است، ریشه‌اش در زبورِ داوود است. در مزامیر ۱۰۳:۳ دو کارِ خدا در یک نفَس کنارِ هم می‌آیند: הַסֹּלֵחַ לְכָל־עֲוֺנֵכִי הָרֹפֵא לְכָל־תַּחֲלוּאָיְכִי (هَسولِچ لِخُل عَوونِخی، هَرُفِه لِخُل تَچَلوآیِخی) — «او که همهٔ گناهانت را می‌آمرزد، او که همهٔ بیماری‌هایت را شفا می‌دهد.»"
                : "Aunque la oración en sí es tardía, su raíz está en los Salmos de David. En Salmos 103:3 dos obras de Dios vienen juntas en un mismo aliento: הַסֹּלֵחַ לְכָל־עֲוֺנֵכִי הָרֹפֵא לְכָל־תַּחֲלוּאָיְכִי (hasoléaj lejol avonéji, harofé lejol tajaluáyji) — «El que perdona todas tus iniquidades, el que sana todas tus dolencias.»"}
            </p>
            <p>
              {fa
                ? "ترتیب اتفاقی نیست: نخست بخشش، سپس شفا. و در مزامیر ۶:۳، داوود خودْ فریاد می‌زند: רְפָאֵנִי יְהוָה (رِفائِنی اَدونای) — «شفایم ده، ای خداوند، که استخوان‌هایم لرزانند.» این کوتاه‌ترین دعایِ شفا در کتابِ مقدّس است: دو واژه، و یک اعتماد."
                : "El orden no es casual: primero el perdón, luego la sanación. Y en Salmos 6:3, David mismo clama: רְפָאֵנִי יְהוָה (refaéni Adonai) — «Sáname, Hashem, porque mis huesos tiemblan.» Es la oración de sanación más breve de la Biblia: dos palabras, y una confianza."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="El que perdona todas tus iniquidades, el que sana todas tus dolencias."
          fa="او که همهٔ گناهانت را می‌آمرزد، او که همهٔ بیماری‌هایت را شفا می‌دهد."
          source={fa ? "مزامیر ۱۰۳:۳" : "Salmos 103:3"} fa_active={fa} />

        {/* ── EL ALMA VA PRIMERO ── */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "نخست جان: بازگشت همان شفاست" : "El alma primero: volver es sanar"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "هم در دعا و هم در آن آیه، جان پیش از تن می‌آید: نخست «شفایِ جان»، آنگاه «شفایِ تن». این ترتیب، آموزه است. در زبانِ عبری، תְּשׁוּבָה (تِشووا) هم «توبه» است و هم «بازگشت» — بازگشتنِ جان به خانه، به نزدِ خدا. و بازگشتن، خودْ نوعی شفاست: زخمِ جدایی، با برگشتن، التیام می‌یابد."
                : "Tanto en la oración como en el versículo, el alma viene antes que el cuerpo: primero «la sanación del alma», luego «la del cuerpo». Ese orden es enseñanza. En hebreo, תְּשׁוּבָה (teshuvá) es a la vez «arrepentimiento» y «retorno» — el regreso del alma a su casa, a Dios. Y volver es ya una forma de sanación: la herida de la separación, al regresar, se cura."}
            </p>
            <p>
              {fa
                ? "اینجاست تفاوتِ صادقانه و امیدبخش: شفایِ تن همیشه در دستِ ما نیست، و گاه فرانمی‌رسد آن‌گونه که می‌خواهیم. اما شفایِ جان همیشه در دسترس است. هیچ‌کس آن‌قدر دور نرفته که نتواند بازگردد. تن شاید نتواند برخیزد؛ جان همیشه می‌تواند به خانه برگردد."
                : "Aquí está la diferencia honesta y esperanzadora: la sanación del cuerpo no siempre está en nuestras manos, y a veces no llega como quisiéramos. Pero la sanación del alma siempre está disponible. Nadie se ha ido tan lejos que no pueda volver. El cuerpo quizás no pueda levantarse; el alma siempre puede volver a casa."}
            </p>
          </div>
        </Section>

        {/* ── EL PODER DE LA PALABRA: NOMBRAR ── */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "قدرتِ نام بردن" : "El poder de nombrar"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در «می شِبِراخ» بیمار را بی‌نام رها نمی‌کنند. او را با نامِ خودش و نامِ مادرش می‌خوانند: «فلان، پسر/دخترِ فلانه». در سنّت، در دعایِ شفا نام را به مادر می‌بندند، نه به پدر — گویی رحمتِ مادر، نزدیک‌ترین درگاه به رحمتِ خداست."
                : "En el «Mi Sheberaj» no se deja al enfermo sin nombre. Se lo nombra con su nombre y el nombre de su madre: «Fulano, hijo/hija de Fulana». En la tradición, en la oración por la sanación se vincula el nombre a la madre, no al padre — como si la misericordia de la madre fuera el umbral más cercano a la misericordia de Dios."}
            </p>
            <p>
              {fa
                ? "نام بردن، انتزاع را به یک چهره بدل می‌کند. دیگر «بیماری» در میان نیست؛ این شخص است، عزیز و یگانه، که در حضور آورده می‌شود. دعا با نام، اعلام می‌کند: تو فراموش نشده‌ای."
                : "Nombrar convierte la abstracción en un rostro. Ya no se trata de «la enfermedad»; es esta persona, amada y única, la que es traída a la Presencia. La oración con el nombre declara: no has sido olvidado."}
            </p>
          </div>
        </Section>

        {/* ── LAS GEMATRÍAS (peso teológico, sin forzar) ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "وزنِ واژه‌ها" : "El peso de las palabras"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="נֶפֶשׁ" sub={fa ? "جان · ۴۳۰" : "Alma · 430"} color={C} size={38} />
            <Tile he="גּוּף" sub={fa ? "تن · ۸۹" : "Cuerpo · 89"} color="#c9a43e" size={38} />
            <Tile he="רְפוּאָה" sub={fa ? "شفا · ۲۹۲" : "Sanación · 292"} color="#b89a4e" size={38} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "بیایید واژه‌ها را، صادقانه، حرف‌به‌حرف بشماریم. נֶפֶשׁ (نِفِش، «جان»): נ=۵۰، פ=۸۰، שׁ=۳۰۰ — یعنی ۵۰+۸۰+۳۰۰ = ۴۳۰. גּוּף (گوف، «تن»): ג=۳، ו=۶، ף=۸۰ — یعنی ۳+۶+۸۰ = ۸۹. רְפוּאָה (رِفوآ، «شفا»): ר=۲۰۰، פ=۸۰، ו=۶، א=۱، ה=۵ — یعنی ۲۰۰+۸۰+۶+۱+۵ = ۲۹۲."
                : "Contemos las palabras, con honestidad, letra por letra. נֶפֶשׁ (néfesh, «alma»): נ=50, פ=80, שׁ=300 — es decir 50+80+300 = 430. גּוּף (guf, «cuerpo»): ג=3, ו=6, ף=80 — es decir 3+6+80 = 89. רְפוּאָה (refuá, «sanación»): ר=200, פ=80, ו=6, א=1, ה=5 — es decir 200+80+6+1+5 = 292."}
            </p>
            <div className="rounded-xl border border-gold/15 bg-gold/[0.04] p-4">
              <p className="text-[13px] leading-relaxed text-parchment/75">
                {fa
                  ? "و اینجا، با امانت، چیزی را نمی‌سازیم که نیست: این عددها با هم یک تساویِ مشهور و تکان‌دهنده نمی‌سازند. زیباییِ این راز، عددی نیست؛ الهیاتی و شبانی است. عدد فقط نشانمان می‌دهد که جان (۴۳۰) از تن (۸۹) بسی بزرگ‌تر است — و همین، ترتیبِ دعا را بازمی‌تابانَد: نخست جان، آنگاه تن."
                  : "Y aquí, con honestidad, no fabricamos lo que no existe: estos números NO forman entre sí ninguna igualdad célebre ni espectacular. La belleza de este misterio no es numérica; es teológica y pastoral. El número solo nos muestra que el alma (430) es mucho mayor que el cuerpo (89) — y eso mismo refleja el orden de la oración: primero el alma, luego el cuerpo."}
              </p>
            </div>
          </div>
        </Section>

        {/* ── SÍNTESIS ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              רְפָאֵנִי יְהוָה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "جان همیشه می‌تواند به خانه برگردد" : "El alma siempre puede volver a casa"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "نخست جان، آنگاه تن. بازگشتن، خودْ شفاست. ما وعده نمی‌دهیم که تن همیشه شفا می‌یابد — این صادقانه نیست. اما این را با دل می‌گوییم: تا جانی هست که می‌تواند رو به خانه برگردد، امیدی هست که هرگز خاموش نمی‌شود. شفایِ جان، همیشه در دسترسِ توست."
                : "Primero el alma, luego el cuerpo. Volver es sanar. No prometemos que el cuerpo siempre se cure — eso no sería honesto. Pero esto sí lo decimos de corazón: mientras haya un alma que pueda volver el rostro hacia su casa, hay una esperanza que nunca se apaga. La sanación del alma siempre está al alcance de tu mano."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بخشش و شفا · مزامیر ۱۰۳" : "Perdón y cura · Salmos 103:3", ref: "Psalms 103:3" },
                { label: fa ? "شفایم ده · مزامیر ۶" : "Sáname · Salmos 6:3", ref: "Psalms 6:3" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Psalms 103:3")}&context=kabbalah`)}
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

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "برایِ هر کسی که امشب درد می‌کشد — در تن، یا در جان — این واژه‌ها هست: تو فراموش نشده‌ای. نامت در حضور آورده می‌شود. و راهِ خانه، هرچند دور بنماید، همیشه باز است."
                : "Para todo el que esta noche sufre — en el cuerpo, o en el alma — están estas palabras: no has sido olvidado. Tu nombre es traído a la Presencia. Y el camino a casa, por lejano que parezca, está siempre abierto."}
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
