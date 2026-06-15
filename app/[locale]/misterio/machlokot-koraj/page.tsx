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

export default function PageMachlokotKoraj() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  // Las páginas de misterio van SIEMPRE en oscuro: las letras hebreas doradas y
  // el texto pergamino solo se leen bien sobre fondo #05050a.
  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#b0413e"; // rojo carmesí: el fuego que consume, la verdad sin humildad que quema

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* NAV */}
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

        {/* HERO — la ecuación */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "پاراشاتِ قورَح · بمیدبار (اعداد) ۱۶" : "Parashat Koraj · Bamidbar (Números) 16"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="שָׁלוֹם" sub={fa ? "صلح · ۳۷۶" : "Paz · 376"} color="#c9a43e" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>+</span>
            <Tile he="רַב" sub={fa ? "بزرگی · ۲۰۲" : "Grandeza · 202"} color="#cf8c52" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>=</span>
            <Tile he="מַחֲלֹקֶת" sub="578" color={C} size={32} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            578
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "وقتی حقیقت به سلاح بدل می‌شود" : "Cuando la verdad se vuelve un arma"}
          </h2>
        </div>

        {/* SECCIÓN 1 — La acusación que era verdad */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "قورَح حق داشت" : "Koraj tenía razón"}
          </h3>
          <p className="hebrew mb-4 text-center text-xl leading-relaxed" style={{ color: "#c9a43e", textShadow: dark ? "0 0 10px #c9a43e66" : "none" }}>
            כֻּלָּם קְדֹשִׁים וּבְתוֹכָם יְהוָה
          </p>
        </Section>

        <PullQuoteLite
          es="Toda la congregación, todos ellos son santos, y el Eterno está en su medio. ¿Por qué se elevan sobre la asamblea?"
          fa="تمامِ جماعت، همه مقدسند و خداوند در میانِ آنهاست. چرا خود را بر جماعت برمی‌افرازید؟"
          source={fa ? "بمیدبار ۱۶:۳" : "Bamidbar (Números) 16:3"}
          fa_active={fa} />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "قورَح دروغ نگفت. مقدمهٔ او راست بود: در سینای، تمامِ قوم صدایِ الهی را شنیدند (چنان‌که راشی، مفسرِ بزرگِ فرانسویِ سدهٔ یازدهم، توضیح می‌دهد). همه مقدسند. اما او والاترین حقیقتِ مکاشفه را گرفت و آن را به سلاحی سیاسی بدل کرد تا موشه را براندازد. زوهر (اثرِ محوریِ کابالا) می‌آموزد: «آن‌که با صلح به نزاع برمی‌خیزد، با نامِ خدا به نزاع برمی‌خیزد، زیرا نامِ او صلح است.»"
                : "Koraj no mintió. Su premisa era verdadera: en el Sinaí, todo el pueblo escuchó la voz divina (así lo explica Rashi, el gran comentarista francés del s. XI). Todos son santos. Pero tomó la verdad más elevada de la Revelación y la convirtió en un arma política para derribar a Moshé. El Zohar (la obra central de la Cabalá) enseña: «quien disputa con la paz, disputa con el Nombre de Dios, porque Su Nombre es Paz»."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 2 — La ecuación oculta */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "حسابِ مَحلوقت" : "La cuenta del Machlóket"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="שָׁלוֹם" sub={fa ? "صلح · ۳۷۶" : "Paz · 376"} color="#c9a43e" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="רַב" sub={fa ? "بزرگی · ۲۰۲" : "Grandeza · 202"} color="#cf8c52" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="מַחֲלֹקֶת" sub="578" color={C} size={40} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "מַחֲלֹקֶת (مَحلوقت، «نزاع») برابر ۵۷۸ است. שָׁלוֹם (شالوم، «صلح») برابر ۳۷۶ است. רַב (رَو، «بزرگی، بسیار») برابر ۲۰۲ است. و ۳۷۶ + ۲۰۲ = ۵۷۸. نزاع آن‌گاه زاده می‌شود که کسی صلح را — چیزها را آن‌گونه که هستند — برمی‌گیرد و نیازِ خود به بزرگ‌بودن را بدان می‌افزاید. قورَح دقیقاً همین واژه را علیه موشه به کار برد: «רַב לָכֶם» — «برایتان بسیار است» (بمیدبار ۱۶:۳). عدد همان را تأیید می‌کند که واژه اعتراف می‌کند."
                : "מַחֲלֹקֶת (majlóket, «disputa») suma 578. שָׁלוֹם (shalom, «paz») suma 376. רַב (rav, «grandeza, demasiado») suma 202. Y 376 + 202 = 578. La disputa nace cuando alguien toma la paz —las cosas como están— y le suma su necesidad de ser el grande. Koraj usó exactamente esa palabra contra Moshé: «רַב לָכֶם» — «demasiado para ustedes» (Bamidbar 16:3). El número confirma lo que la palabra confiesa."}
            </p>
            <div className="rounded-xl border border-gold/15 bg-gold/[0.04] p-4">
              <p className="text-[13px] leading-relaxed text-parchment/75">
                {fa
                  ? "و باز هم هست: ۵۷۸ = ۲ × ۱۷². عددِ ۱۷ ارزشِ טוֹב (طُو، «خوب») است. مَحلوقت همان نیکیِ دوچندان‌شده بر خویش است — نیکی‌ای که در آینه به خود می‌نگرد و خودبزرگی می‌شود. قورَح بدکار نبود؛ او نیکیِ خودشیفته بود."
                  : "Y hay más: 578 = 2 × 17². El 17 es el valor de טוֹב (tov, «bueno»). El machlóket es el bien duplicado sobre sí mismo — la bondad que se mira al espejo y se vuelve ego. Koraj no era malvado; era el bien ensimismado."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 3 — La respuesta de Moshé */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "بحث نکرد. افتاد." : "No discutió. Cayó."}
          </h3>
          <p className="hebrew mb-4 text-center text-xl leading-relaxed" style={{ color: "#c9a43e", textShadow: dark ? "0 0 10px #c9a43e66" : "none" }}>
            וַיִּשְׁמַע מֹשֶׁה וַיִּפֹּל עַל פָּנָיו
          </p>
        </Section>

        <PullQuoteLite
          es="Y escuchó Moshé, y cayó sobre su rostro."
          fa="و موسی شنید و بر روی خود افتاد."
          source={fa ? "بمیدبار ۱۶:۴" : "Bamidbar (Números) 16:4"}
          fa_active={fa} />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "حیرت‌انگیزترین پاسخِ تورات. موشه استدلال نکرد، از خود دفاع نکرد، ضربه را بازنگرداند. بر روی خود افتاد. پیرکی آووت (سخنانِ حکیمان) دو گونه نزاع را از هم جدا می‌کند: نزاعِ هیلِل و شَمّای —«برای آسمان»، که می‌پاید— و نزاعِ قورَح —برای منفعتِ خویش، که خود را نابود می‌کند. تفاوت در این نیست که چه کسی حق دارد. در این است که آیا حقِ تو به صحنه‌ای، شاهدی، پیروزیِ همگانی نیاز دارد. آن «نیاز به بُردن» امضایِ قورَحِ درون است."
                : "La respuesta más desconcertante de la Torá. Moshé no argumentó, no se defendió, no devolvió el golpe. Cayó sobre su rostro. Pirkei Avot (los dichos de los sabios) distingue dos tipos de disputa: la de Hillel y Shamai —«por el cielo», que perdura— y la de Koraj —por interés propio, que se destruye sola. La diferencia no está en quién tiene razón. Está en si tu razón necesita un escenario, un testigo, una victoria pública. Ese «necesitar ganar» es la firma del Koraj interior."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 4 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              מַחֲלֹקֶת
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "حقیقتِ بی‌فروتنی می‌سوزاند" : "La verdad sin humildad quema"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "قورَح شهودی راستین داشت و آن را به زهر بدل کرد، زیرا ظرفِ فروتنی را نداشت تا آن را در خود نگاه دارد. حقیقتِ بی‌اَناوا (فروتنی) روشن نمی‌کند: می‌سوزاند. موشه خودبزرگی‌اش را آن‌قدر به تأخیر انداخت که حقیقت خود به خود سخن گفت. این تنها پاسخِ مقدس است آن‌گاه که کسی ما را متهم می‌کند: بر روی خود افتادن."
                : "Koraj tuvo una intuición verdadera y la convirtió en veneno porque no tenía el recipiente de la humildad para contenerla. La verdad sin anavá (humildad) no ilumina: quema. Moshé demoró su ego lo suficiente para que la verdad hablara sola. Esa es la única respuesta sagrada cuando alguien nos acusa: caer sobre el rostro."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بمیدبار ۱۶" : "Bamidbar 16", ref: "Numbers 16:1" },
                { label: fa ? "پیرکی آووت ۵:۱۷" : "Pirkei Avot 5:17", ref: "Pirkei Avot 5:17" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Numbers 16:1")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ عمیقِ قورَح ←" : "Estudiar Koraj en profundidad →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "پاراشاتِ قورَح · بمیدبار (اعداد) ۱۶-۱۸" : "Parashat Koraj · Bamidbar (Números) 16-18"}
            </div>

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
                ? "«همه مقدسند» —قورَح گفت— و زمین او را بلعید. نه به‌خاطرِ دروغ، بلکه به‌خاطرِ به‌کار بردنِ حقیقتی برای زخم‌زدن. قداست اعلام نمی‌شود: تجسم می‌یابد. و در همان حرکتی تجسم می‌یابد که خودبزرگی بیش از همه از آن بیزار است: بر روی خود افتادن آن‌گاه که ما را متهم می‌کنند."
                : "Todos son santos —dijo Koraj— y la tierra lo tragó. No por mentir, sino por usar una verdad para herir. La santidad no se declara: se encarna. Y se encarna en el gesto que el ego más odia: caer sobre el rostro cuando nos acusan."}
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
