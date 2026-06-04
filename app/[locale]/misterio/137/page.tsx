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

function Tile({ he, sub, color, size = 56, parts }: { he?: string; sub: string; color: string; size?: number; parts?: { t: string; hi?: boolean }[] }) {
  const HI = "#c9a43e"; // dorado: resalta las letras iniciales que forman el acrónimo
  return (
    <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}>
      <span className="hebrew font-bold leading-none"
        style={{ fontSize: `${size}px`, color: "#fff6e0", textShadow: `0 0 20px ${color}, 0 0 7px ${color}` }}>
        {parts
          ? parts.map((p, i) => (
              <span key={i} style={p.hi ? { color: HI, textShadow: `0 0 18px ${HI}` } : undefined}>{p.t}</span>
            ))
          : he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

export default function Page137() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark, setDark] = useState(true);
  // Las páginas de misterio van SIEMPRE en oscuro: las letras hebreas doradas y
  // el texto pergamino solo se leen bien sobre fondo #05050a.
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#9a6a8e"; // morado místico para el 137

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

        {/* HERO — el número gigante */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · معمای آفرینش" : "Rav Ginsburgh · El acertijo de la creación"}
          </p>
          <span className="font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(110px, 32vw, 200px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            137
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "جایی که کابالا به فیزیک می‌رسد" : "Donde la Cabalá toca la física"}
          </h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Tile he="קַבָּלָה" sub={fa ? "قبالا · ۱۳۷" : "Kabalah · 137"} color={C} size={46} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="α ≈ 1/137" sub={fa ? "فیزیک" : "Física"} color="#6a8acc" size={30} />
          </div>
        </div>

        {/* ── LA FÍSICA ── */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "رازِ فیزیک" : "El misterio de la física"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "ثابتِ ساختارِ ریز (α، آلفا) نیرویِ پیوندِ نور و ماده را تعیین می‌کند — اینکه فوتون و الکترون چگونه به هم می‌رسند. مقدارش تقریباً ۱/۱۳۷ است؛ عددی صحیح، بی‌هیچ دلیلِ شناخته‌شده."
                : "La constante de estructura fina (α, alfa) determina la fuerza con que la luz y la materia se acoplan — cómo el fotón y el electrón se encuentran. Su valor es casi exactamente 1/137; un número entero, sin razón conocida."}
            </p>
            <p>
              {fa
                ? "ماکس بورن مقاله‌ای نوشت با عنوان «عددِ رازآمیز، ۱۳۷». فاینمن گفت: «همهٔ فیزیکدانانِ خوب این عدد را به دیوارشان می‌زنند و نگرانش‌اند. این عدد از کجا می‌آید؟ کاش سرنخی داشتیم که او [خدا] چگونه می‌اندیشد تا چنین عددی بسازد.»"
                : "Max Born escribió un artículo titulado «El número misterioso, 137». Feynman dijo: «todos los buenos físicos ponen este número en su pared y se preocupan por él. ¿De dónde viene? Quisiéramos una pista de cómo piensa Él [Dios] para hacer un número así.»"}
            </p>
          </div>
        </Section>

        <PullQuoteLite dark={dark}
          es="Nadie sabe por qué Dios eligió 137 para crear la luz."
          fa="هیچ‌کس نمی‌داند چرا خدا ۱۳۷ را برای آفرینشِ نور برگزید."
          source="Richard Feynman" fa_active={fa} />

        {/* ── LA CABALÁ ── */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "پاسخِ کابالا" : "La respuesta de la Cabalá"}
          </h3>
          <p className="text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "قبالا («دریافت») = ۱۳۷. خودِ نامِ سنّتِ نهانیِ تورات، عددِ نور است. و این تصادف نیست: گینزبورگ نشان می‌دهد که ۱۳۷ نخِ پنهانِ میانِ آفرینشِ روحانی و قوانینِ ماده است."
              : "Kabalah («recibir») = 137. El nombre mismo de la tradición mística de la Torá es el número de la luz. Y no es coincidencia: Ginsburgh muestra que el 137 es el hilo oculto entre la creación espiritual y las leyes de la materia."}
          </p>
        </Section>

        {/* ── אמר — luz, agua, firmamento ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "אמר — نور، آب، فلک" : "אמר — luz, agua, firmamento"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5" dir={fa ? "rtl" : "ltr"}>
            <Tile parts={[{ t: "א", hi: true }, { t: "וֹר" }]} sub={fa ? "نور" : "Luz"} color="#f0d060" size={40} />
            <Tile parts={[{ t: "מַ", hi: true }, { t: "יִם" }]} sub={fa ? "آب" : "Agua"} color="#6a9acc" size={40} />
            <Tile parts={[{ t: "רָ", hi: true }, { t: "קִיעַ" }]} sub={fa ? "فلک" : "Firmamento"} color="#9a6a8e" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">{fa ? "←" : "→"}</span>
            <Tile parts={[{ t: "אָ", hi: true }, { t: "מַ", hi: true }, { t: "ר", hi: true }]} sub={fa ? "«گفت»" : "«dijo»"} color="#c9a43e" size={44} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "آری (راو ییتسحاق لوریا) آموخت: ریشهٔ אמر («گفتن») از حروفِ نخستِ אור (نور)، מים (آب) و רקיע (فلک) ساخته شده. هر سه، در دو روزِ نخستِ آفرینش پنج بار می‌آیند. «جهان با ده گفتار (אמר) آفریده شد» (آووت ۵:۱)."
                : "El Arí (Rabí Isaac Luria) enseñó: la raíz אמר («decir») está formada por las iniciales de אוֹר (luz), מַיִם (agua) y רָקִיעַ (firmamento). Las tres aparecen cinco veces cada una en los dos primeros días. «El mundo fue creado con diez dichos (amar)» (Avot 5:1)."}
            </p>
            <p>
              {fa
                ? "و این دقیقاً سه حالتِ نظریهٔ کوانتومی است: نور همچون موج (انرژی) ← همچون ذرّه (فوتون، قطره‌های آب) ← جذب‌شده در فلک (ماده). «شب و روز» (לילה ויום) = ۱۳۷."
                : "Y son exactamente los tres estados de la teoría cuántica: la luz como onda (energía) → como partícula (fotón, gotas de agua) → absorbida en el firmamento (materia). «Noche y día» (לַיְלָה וָיוֹם) = 137."}
            </p>
          </div>
        </Section>

        {/* ── אופן — el electrón ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "אופן — الکترون" : "אוֹפָן — el electrón"}
          </h3>
          <div className="text-center"><Tile he="אוֹפָן" sub="137" color="#6a8acc" size={48} /></div>
          <p className="mt-6 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "یحزقیل در رؤیای ارابهٔ الهی «چرخی درونِ چرخ» را دید (يحزقیل ۱). الکترون نیز در پوسته‌هایی گردِ هسته می‌چرخد — «چرخی درونِ چرخ». אוֹפָن («چرخ») = ۱۳۷. گینزبورگ پیشنهاد می‌کند که «اوفان» واژهٔ عبریِ «الکترون» باشد. ماده، از دلِ رؤیای مرکاوا."
              : "Ezekiel vio en su visión de la Carroza divina «una rueda dentro de una rueda» (Yejezkel 1). El electrón también orbita el núcleo en capas — «una rueda dentro de una rueda». אוֹפָן («rueda») = 137. Ginsburgh propone «ofan» como la palabra hebrea para «electrón». La materia, desde el corazón de la visión del Carro."}
          </p>
        </Section>

        {/* ── Abraham + el Nombre ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "ابراهام و نامِ خدا" : "Abraham y el Nombre"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="אַבְרָהָם" sub="248" color="#e0a850" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="הוי״ה" sub="26" color="#c9a43e" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="274" sub={fa ? "۲ × ۱۳۷" : "2 × 137"} color={C} size={40} />
          </div>
          <p className="mt-7 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "زوهر نورِ روزِ نخست را به ابراهام می‌پیوندد — «ابراهامِ محبوبِ من»، روحِ عشق. ابراهام (۲۴۸) + نامِ یهوה (۲۶) = ۲۷۴، که میانگینش ۱۳۷ است. عشق و نام، با هم، ۱۳۷ را می‌زایند — همان نورِ روزِ اول."
              : "El Zohar liga la luz del primer día a Abraham — «Abraham mi amado», el alma del amor. Abraham (248) + el Nombre YHVH (26) = 274, cuyo promedio es 137. El amor y el Nombre, juntos, dan a luz el 137 — la luz misma del día uno."}
          </p>
        </Section>

        {/* ── SÍNTESIS ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              יֵשׁ מֵאַיִן
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "هستی از نیستی" : "Algo de la nada"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "فوتون انرژیِ بی‌صورت است (אַיִן، «نیستی» = ۶۱). الکترون نخستین ذرّهٔ ماده است (יֵשׁ، «هستی» = ۳۱۰). «هستی از نیستی» = ۴۱۱ = ۳ × ۱۳۷. و ۱۳۷، سی‌وسومین عددِ اول است — تقسیم‌ناپذیر، چون خودِ کوانتوم. ۱۳۷ پلی است: میانِ کابالا و علم، انرژی و ماده، روح و جسم. معمای آفرینش."
                : "El fotón es energía sin forma (אַיִן, «nada» = 61). El electrón es la primera partícula de materia (יֵשׁ, «algo» = 310). «Algo de la nada» = 411 = 3 × 137. Y 137 es el 33er número primo — indivisible, como el cuanto mismo. El 137 es un puente: entre la Cabalá y la ciencia, la energía y la materia, el espíritu y el cuerpo. El acertijo de la creación."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "قبالا · אמר" : "Kabalah · אמר", ref: "Genesis 1:3" },
                { label: fa ? "ارابهٔ یحزقیل" : "La Carroza · Yejezkel 1", ref: "Ezekiel 1:16" },
                { label: fa ? "نورِ ابراهام · زوهر" : "Luz de Abraham · Zohar", ref: "Zohar, Bereshit 1" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 1:3")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ عمیق در جاشمال ←" : "Estudiar este misterio en Jashmal →"}
            </button>
            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمای آفرینش» راو ییتسحاق گینزبورگ" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh"}
            </div>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/gematrias" className="hover:text-gold">{fa ? "گالریِ گیماتریا ←" : "Galería de Gematría →"}</Link>
            </div>
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

function PullQuoteLite({ es, fa, source, fa_active, dark }: { es: string; fa: string; source: string; fa_active: boolean; dark: boolean }) {
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
