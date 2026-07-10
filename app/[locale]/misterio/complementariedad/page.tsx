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

export default function PageComplementariedad() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#4fb0c6";       // cian — la onda de luz
  const PART = "#e8b45a";    // ámbar — la partícula, el punto

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

        {/* HERO — no empezó en el Uno, empezó en el Dos */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۲" : "Rav Ginsburgh · 137, cap. 2"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="א" sub={fa ? "یک · ۱" : "Uno · 1"} color="#6b6b78" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>✗</span>
            <Tile he="ב" sub={fa ? "دو · ۲" : "Dos · 2"} color={C} size={40} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            2
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "مکملیت — نوری که یکجا دیده نمی‌شود" : "Complementariedad — la luz que no se deja ver entera"}
          </h2>
        </div>

        {/* SECCIÓN 1 — La física: onda y partícula, nunca a la vez */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "فیزیک: موج و ذرّه" : "La física: onda y partícula"}
          </h3>
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="◠◡" sub={fa ? "موج" : "Onda"} color={C} size={34} />
            <span className="font-cinzel text-2xl text-gold/40">/</span>
            <Tile he="•" sub={fa ? "ذرّه" : "Partícula"} color={PART} size={34} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در سالِ ۱۹۲۷ فیزیک به دیواری برخورد که هنوز کسی از آن گذر نکرده است. نور گاه چون موج رفتار می‌کند —پخش می‌شود، در هم می‌آمیزد— و گاه چون ذرّه، نقطه‌ای یگانه. نیلز بور این را «مکملیت» نامید: هر دو توصیف راست‌اند، اما هرگز در یک نگاه با هم پدیدار نمی‌شوند. در آزمایشِ دو-شکاف، همین که نگاه کنی از کدام شکاف گذشت (ذرّه)، الگوی موجی ناپدید می‌شود. واقعیت نمی‌گذارد هر دو چهره را یکجا ببینی."
                : "En 1927 la física chocó con un muro que nadie ha atravesado todavía. La luz a veces se comporta como onda —se dispersa, interfiere consigo misma— y a veces como partícula, un punto único. Niels Bohr lo llamó «complementariedad»: las dos descripciones son verdaderas, pero jamás se muestran juntas en la misma mirada. En el experimento de la doble rendija, apenas observas por cuál rendija pasó (partícula), el patrón de onda desaparece. La realidad no te deja ver las dos caras a la vez."}
            </p>
            <p>
              {fa
                ? "همان سال، وِرنر هایزنبرگ «اصلِ عدمِ قطعیت» را نوشت: هرچه جای یک ذرّه را دقیق‌تر بدانی، سرعتش را مبهم‌تر می‌دانی — و برعکس. این نقصِ ابزار نیست؛ حدّی است تنیده در بافتِ هستی. جهان مرزی برای دانستن در خود دارد. نمی‌توانی همه‌چیز را یکجا بدانی."
                : "Ese mismo año, Werner Heisenberg formuló el «principio de incertidumbre»: cuanto más exacta conoces la posición de una partícula, más borrosa se vuelve su velocidad — y al revés. No es un defecto de los instrumentos; es un límite tejido en la trama de lo real. El universo lleva dentro una frontera al conocer. No puedes saberlo todo de una sola vez."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="Lo contrario de una verdad ordinaria es una falsedad; pero lo contrario de una verdad profunda puede ser otra verdad profunda."
          fa="ضدِّ یک حقیقتِ معمولی، دروغ است؛ اما ضدِّ یک حقیقتِ ژرف، می‌تواند حقیقتی ژرفِ دیگر باشد."
          source={fa ? "نیلز بور" : "Niels Bohr"}
          fa_active={fa} />

        {/* SECCIÓN 2 — La bet sellada */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "نخستین حرف: بِت که از سه سو بسته است" : "La primera letra: la bet sellada"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="בְּ" sub={fa ? "حرفِ بزرگِ تورات" : "La letra grande"} color={C} size={52} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="2" sub={fa ? "دو · مکملیت" : "Dos · dualidad"} color={PART} size={44} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "تورات با حرفِ «الف» (א) که یک است آغاز نمی‌شود. با «بِت» (ב) که دو است آغاز می‌شود: בְּרֵאשִׁית (بِرِشیت، «در آغاز»). و در طومارِ تورات، این نخستین بِت بزرگ‌تر از همهٔ حروف نوشته می‌شود — یکی از «حروفِ بزرگِ» سنتِ ماسورا. آفرینش نه از یگانگی، بلکه از دوگانگی زاده می‌شود. عددِ دو، همان اصلِ مکملیت است: جهانی که همیشه دو رو دارد."
                : "La Torá no empieza con la letra «álef» (א), que es Uno. Empieza con la «bet» (ב), que es Dos: בְּרֵאשִׁית (Bereshit, «en el principio»). Y en el rollo de la Torá, esa primera bet se escribe más grande que las demás letras — una de las «letras grandes» de la tradición masorética. La creación no nace de la unidad, sino de la dualidad. El número dos es el principio de complementariedad hecho letra: un mundo que siempre tiene dos caras."}
            </p>
            <p>
              {fa
                ? "و چرا بِت؟ میدراش (بِرِشیت رَبّا ۱:۱۰) پاسخ می‌دهد: چون بِت از سه سو بسته است —از پشت، از بالا، از پایین— و تنها رو به جلو گشوده. یعنی: «رخصت نداری بپرسی بالا چیست، پایین چیست، پیش چیست، پس چیست» (میشنا، حگیگا ۲:۱). درست همان‌جا که هایزنبرگ سه هزار سال بعد ایستاد: مرزی برای دانستن، نوشته در شکلِ نخستین حرفِ آفرینش."
                : "¿Y por qué bet? El Midrash (Bereshit Rabbá 1:10) responde: porque la bet está cerrada por tres lados —por detrás, por arriba, por abajo— y abierta solo hacia adelante. Es decir: «no te está permitido preguntar qué hay arriba, qué hay abajo, qué hay antes, qué hay después» (Mishná, Jaguigá 2:1). Exactamente donde se detuvo Heisenberg tres mil años más tarde: un límite al conocer, escrito en la forma de la primera letra de la creación."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — Jojmá y Biná: punto y onda */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "خِرَد و فهم: نقطه و موج" : "Jojmá y Biná: el punto y la onda"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="חָכְמָה" sub={fa ? "نقطه · ۷۳" : "Punto · 73"} color={PART} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">⊗</span>
            <Tile he="בִּינָה" sub={fa ? "موج · ۶۷" : "Onda · 67"} color={C} size={40} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "مکملیت تنها در نور نیست؛ در ذهنِ توست. کابالا دو نیرویِ نخستینِ آگاهی را می‌شناسد. חָכְמָה (خُخما، «خِرَد» = ۷۳) جرقه‌ای آنی است — نقطه‌ای که یکباره می‌درخشد، مانندِ ذرّه. בִּינָה (بینا، «فهم» = ۶۷) گستره‌ای است که آن نقطه را در خود می‌پروراند و پهن می‌کند، مانندِ موج. اندیشهٔ ناب و فهمِ گسترده: دو راهِ دانستن که هرگز در یک آن با هم نیستند."
                : "La complementariedad no está solo en la luz; está en tu mente. La Cabalá reconoce dos fuerzas primordiales de la conciencia. חָכְמָה (Jojmá, «sabiduría» = 73) es un destello instantáneo — un punto que fulgura de golpe, como la partícula. בִּינָה (Biná, «entendimiento» = 67) es la extensión que incuba ese punto y lo despliega, como la onda. La intuición pura y la comprensión desplegada: dos modos de conocer que nunca coinciden en el mismo instante."}
            </p>
            <p>
              {fa
                ? "پس دو گونه ندانستن هست. یکی مقدس است: بِتِ بسته، فروتنیِ کسی که می‌داند بی‌کرانه را با یک نگاه نمی‌توان گرفت. دیگری دشمن است: סָפֵק (سافِک، «شک») که فلج می‌کند — و عددش، ۲۴۰، دقیقاً برابرِ עֲמָלֵק (عَمالِک) است، نیرویی که کابالا آن را ریشهٔ تردید می‌نامد. عدمِ قطعیتِ فیزیک عیب نیست؛ فروتنی است. آنچه باید شکست داد، ندانستن نیست — سافِک است، شکی که تو را از عمل بازمی‌دارد."
                : "Hay entonces dos maneras de no saber. Una es santa: la bet cerrada, la humildad de quien sabe que lo Infinito no se atrapa de una mirada. La otra es enemiga: סָפֵק (safek, «duda»), la que paraliza — y su número, 240, es exactamente el de עֲמָלֵק (Amalek), la fuerza que la Cabalá llama raíz de la vacilación. La incertidumbre de la física no es un defecto; es humildad. Lo que hay que vencer no es el no-saber — es el safek, la duda que te congela ante la acción."}
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
                  ? "لحظه‌ای با این بنشین. برترین قانونِ فیزیکِ نو نمی‌گوید «همه‌چیز را خواهی دانست». می‌گوید: چیزی هست که هرگز یکجا دیده نمی‌شود. و نخستین حرفِ تورات، پیش از هر واژه، همین را می‌گوید — بِتی که فقط رو به جلو گشوده است. آفرینش با یک اعترافِ فروتنانه آغاز می‌شود: تو رو به جلو خواهی رفت، نه رو به عقب."
                  : "Siéntate un momento con esto. La ley más profunda de la física moderna no dice «lo conocerás todo». Dice: hay algo que nunca se ve entero de una vez. Y la primera letra de la Torá, antes de cualquier palabra, dice lo mismo — una bet abierta solo hacia adelante. La creación comienza con una confesión humilde: irás hacia adelante, no hacia atrás."}
              </p>
              <p>
                {fa
                  ? "پس آنگاه که چیزی را کامل نمی‌فهمی، نپرس «چرا نمی‌توانم همه‌چیز را ببینم؟». بپرس: از کدام رو نگاه می‌کنم — نقطه یا موج، خِرَد یا فهم؟ شاید حقیقت آن نیست که تو داری، و نه آن که دیگری دارد، بلکه همان است که هیچ‌کدام یکجا نمی‌توانید نگاه دارید."
                  : "Así que cuando algo no te cierra del todo, no preguntes «¿por qué no puedo verlo todo?». Pregunta: ¿desde qué cara estoy mirando — punto u onda, sabiduría o entendimiento? Quizá la verdad no es la que tú tienes, ni la que tiene el otro, sino la que ninguno de los dos puede sostener a la vez."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              בֵּית · בְּרֵאשִׁית
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "عدمِ قطعیت در نخستین حرف" : "La incertidumbre en la primera letra"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "نور موج است و ذرّه، اما نه در یک نگاه (بور)؛ و هستی مرزی برای دانستن دارد (هایزنبرگ). تورات هزاران سال پیش‌تر با «دو» آغاز شد، نه «یک» — بِتی که از سه سو بسته است و فقط رو به جلو گشوده. مکملیت، پیش از آنکه قانونِ فیزیک باشد، شکلِ نخستین حرفِ آفرینش بود."
                : "La luz es onda y partícula, pero no en la misma mirada (Bohr); y lo real lleva un límite al conocer (Heisenberg). La Torá empezó con «Dos» y no con «Uno» miles de años antes — una bet cerrada por tres lados y abierta solo hacia adelante. La complementariedad, antes de ser una ley de la física, fue la forma de la primera letra de la creación."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بِرِشیت ۱:۱" : "Bereshit 1:1", ref: "Genesis 1:1" },
                { label: fa ? "بِرِشیت رَبّا ۱:۱۰" : "Bereshit Rabbá 1:10", ref: "Bereshit Rabbah 1:10" },
                { label: fa ? "حگیگا ۱۱ب" : "Jaguigá 11b", ref: "Chagigah 11b" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 1:1")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ بِرِشیت در جاشمال ←" : "Estudiar Bereshit en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۲" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 2"}
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
                ? "شاید بزرگ‌ترین دانش این نباشد که همه‌چیز را یکجا ببینی، بلکه این باشد که بدانی چرا نمی‌توانی. جهان با حرفی آغاز شد که فقط رو به جلو گشوده است — و همین، دعوتی است به رفتن."
                : "Quizá el mayor saber no sea verlo todo de una vez, sino entender por qué no puedes. El mundo comenzó con una letra abierta solo hacia adelante — y eso mismo es una invitación a caminar."}
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
