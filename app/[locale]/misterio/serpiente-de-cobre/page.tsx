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

// La serpiente sobre el asta de Números 21 = la Vara de Asclepio,
// símbolo de la medicina hasta hoy (una sola serpiente en un bastón).
function AsclepiusRod({ color, size = 150 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 120 200" fill="none"
      role="img" aria-label="Vara de Asclepio"
      style={{ filter: `drop-shadow(0 0 18px ${color}aa)`, display: "inline-block" }}>
      {/* el asta */}
      <line x1="60" y1="12" x2="60" y2="192" stroke={color} strokeWidth="6" strokeLinecap="round" />
      {/* la serpiente enroscada */}
      <path
        d="M58 184 C 36 172, 36 150, 60 142 C 84 134, 84 112, 60 104 C 36 96, 36 74, 60 66 C 82 58, 82 42, 64 36"
        stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* la cabeza */}
      <path d="M64 36 C 52 30, 42 34, 42 44 C 42 53, 52 55, 60 50 C 66 46, 67 40, 64 36 Z" fill={color} />
      {/* el ojo */}
      <circle cx="50" cy="42" r="1.8" fill="#05050a" />
      {/* la lengua bífida */}
      <path d="M42 46 l -7 3 M 42 47 l -7 -1" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function PageSerpienteDeCobre() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  // Las páginas de misterio van SIEMPRE en oscuro: las letras hebreas doradas y
  // el texto pergamino solo se leen bien sobre fondo #05050a.
  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#b06a3c"; // cobre: el metal de la serpiente sanadora

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

        {/* HERO — la igualdad nájash = mashíaj */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "اعداد ۲۱ · رُش هَشانا ۳:۸" : "Números 21 · Rosh Hashaná 3:8"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="נָחָשׁ" sub={fa ? "مار · ۳۵۸" : "Serpiente · 358"} color={C} size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>=</span>
            <Tile he="מָשִׁיחַ" sub={fa ? "ماشیح · ۳۵۸" : "Mesías · 358"} color="#c9a43e" size={40} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            358
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "مارِ مفرغین" : "La serpiente de cobre"}
          </h2>

          {/* La Vara de Asclepio — la serpiente sobre el asta, símbolo de la medicina */}
          <div className="mt-8 flex justify-center">
            <AsclepiusRod color={C} size={130} />
          </div>
          <p className="mx-auto mt-3 max-w-sm text-xs italic leading-relaxed text-muted/70" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "همان مار بر چوب‌دست — «عصای آسکلپیوس»، نمادِ پزشکی تا به امروز."
              : "La misma serpiente sobre el asta — la «Vara de Asclepio», símbolo de la medicina hasta hoy."}
          </p>
        </div>

        {/* ── EL VENENO Y EL REMEDIO ── */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "زهر و درمان" : "El veneno y el remedio"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در اعداد ۲۱، قومِ اسرائیل در بیابان شِکوه می‌کند، و مارهایِ گزنده میانِ مردم می‌آیند و بسیاری می‌میرند. مردم نزدِ موشه (موسی) توبه می‌آورند، و خدا فرمانی شگفت می‌دهد: «بِرایِ خود یک שָׂרָף (ساراف، «مارِ آتشین») بساز و آن را بر نِسی (تیرک/پرچم) برافراز؛ هر گزیده‌ای که بدان بنگرد، زنده می‌مانَد.» (اعداد ۲۱:۸)"
                : "En Números 21, el pueblo de Israel se queja en el desierto, y vienen serpientes venenosas entre la gente, y muchos mueren. El pueblo se arrepiente ante Moshé (Moisés), y Dios da una orden asombrosa: «Hazte un שָׂרָף (saraf, «serpiente ardiente») y ponlo sobre un nes (asta/estandarte); todo el que sea mordido y lo mire, vivirá.» (Números 21:8)"}
            </p>
            <p>
              {fa
                ? "و موشه چنین می‌کند: «و موشه یک נְחַשׁ נְחֹשֶׁת (نِحَش نِحُشِت، «مارِ مفرغین/مسین») ساخت و آن را بر تیرک نهاد؛ و چنین شد که اگر ماری کسی را می‌گزید و او به مارِ مسین می‌نگریست، زنده می‌مانْد.» (اعداد ۲۱:۹)"
                : "Y Moshé así lo hace: «Y Moshé hizo una נְחַשׁ נְחֹשֶׁת (nájash nejóshet, «serpiente de cobre/bronce») y la puso sobre el asta; y sucedía que si una serpiente mordía a alguien, y este miraba a la serpiente de cobre, vivía.» (Números 21:9)"}
            </p>
            <p>
              {fa
                ? "اینجا رازی هست که از چشم نمی‌گریزد: درمان، دقیقاً به شکلِ بیماری ساخته شد. آنچه می‌کُشت، مار بود؛ و آنچه شفا می‌داد نیز، تصویرِ همان مار. زهر، برافراشته، درمان شد."
                : "Aquí hay un secreto que no escapa al ojo: la medicina tenía la forma exacta de la enfermedad. Lo que mataba era la serpiente; y lo que sanaba era también la imagen de la serpiente. El veneno, elevado, se volvió cura."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="La medicina tenía la forma exacta de la enfermedad. Lo que envenena, elevado hacia lo Alto, se vuelve lo que cura."
          fa="درمان، درست به شکلِ بیماری بود. آنچه زهر می‌ریزد، چون به‌سویِ بالا برافراشته شود، خودْ شفا می‌گردد."
          source={fa ? "اعداد ۲۱:۸–۹" : "Números 21:8–9"} fa_active={fa} />

        {/* ── LA CLAVE: NO ES LA SERPIENTE ── */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "نه مار، بلکه نگاه به بالا" : "No la serpiente, sino la mirada"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "حکیمانِ مِشنا از همان آغاز پرسشِ خطرناک را پیش می‌کشند: مگر یک تکّه فلز شفا می‌دهد؟ پاسخشان روشن و قاطع است: «مگر مار می‌کُشد یا مار زنده می‌دارد؟ بلکه، هر زمان که اسرائیل چشم به بالا می‌دوختند و دلِ خود را به پدرِ خویش که در آسمان است می‌سپردند، شفا می‌یافتند؛ و اگر نه، می‌پوسیدند.» (مِشنا رُش هَشانا ۳:۸)"
                : "Los sabios de la Mishná plantean desde el inicio la pregunta peligrosa: ¿acaso un trozo de metal sana? Su respuesta es clara y tajante: «¿Acaso la serpiente mata, o la serpiente da vida? Más bien, cada vez que Israel dirigía sus ojos hacia lo Alto y sometía su corazón a su Padre en los Cielos, sanaban; y si no, se pudrían.» (Mishná Rosh Hashaná 3:8)"}
            </p>
            <p>
              {fa
                ? "و همین مِشنا، بی‌درنگ، آن را با دستانِ موشه در نبرد با عَمالِق می‌سنجد (خروج ۱۷:۱۱): «مگر دستانِ موشه جنگ می‌کردند یا جنگ را می‌شکستند؟ بلکه، هر زمان که اسرائیل به بالا می‌نگریستند و دل به پدرِ آسمانی می‌سپردند، چیره می‌شدند؛ و اگر نه، فرومی‌افتادند.»"
                : "Y la misma Mishná, sin demora, lo compara con las manos de Moshé en la guerra contra Amalek (Éxodo 17:11): «¿Acaso las manos de Moshé hacían la guerra o quebraban la guerra? Más bien, cada vez que Israel miraba hacia lo Alto y sometía su corazón a su Padre en los Cielos, vencían; y si no, caían.»"}
            </p>
            <p>
              {fa
                ? "پس راز در فلز نیست؛ راز در سَمت است. نگاهِ گزیده، از پایین به بالا می‌رود. درد را انکار نمی‌کند — آن را برمی‌افرازد. نگاه کردن به بالا، رنج را نفی نمی‌کند؛ آن را به جایی برمی‌کشد که شفا از آن فرود می‌آید."
                : "El secreto no está en el metal; está en la dirección. La mirada del mordido sube de abajo hacia arriba. No niega el dolor — lo eleva. Mirar hacia lo Alto no niega el sufrimiento; lo levanta al lugar de donde desciende la cura."}
            </p>
          </div>
        </Section>

        {/* ── DOS FILOS: JIZKIYAHU DESTRUYE LA SERPIENTE ── */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "دو لبه: چِزِقیّاهو مار را می‌شکند" : "Dos filos: Jizkiyahu la destruye"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "همان شیء که جان می‌بخشید، قرن‌ها بعد به دامِ مرگ بدل شد. مردم دیگر «از خلالِ» مار به بالا نگاه نمی‌کردند؛ آن را خودش می‌پرستیدند و برایش بخور می‌سوزاندند. آنگاه پادشاهِ نیکوکار چِزِقیّاهو (حِزقیا) آن را در هم شکست."
                : "El mismo objeto que daba vida, siglos después se volvió trampa de muerte. El pueblo ya no miraba «a través de» la serpiente hacia lo alto; la adoraban a ella misma y le quemaban incienso. Entonces el rey justo Jizkiyahu (Ezequías) la hizo pedazos."}
            </p>
            <p>
              {fa
                ? "«و او مارِ مسینی را که موشه ساخته بود، خُرد کرد؛ زیرا تا آن روزها بنی‌اسرائیل برایش بخور می‌سوزاندند؛ و آن را נְחֻשְׁתָּן (نِحُشتان، یعنی «فقط یک تکّه مفرغ») نامید.» (دومِ پادشاهان ۱۸:۴)"
                : "«Y él hizo pedazos la serpiente de cobre que Moshé había hecho, porque hasta aquellos días los hijos de Israel le quemaban incienso; y la llamó נְחֻשְׁתָּן (Nejushtán, es decir, «solo un trozo de bronce»).» (2 Reyes 18:4)"}
            </p>
            <p>
              {fa
                ? "این است دو لبهٔ مار: همان نگاه که نجات می‌دهد، می‌تواند هلاک کند. اگر چشم از خلالِ مار به بالا می‌رود، شفاست. اگر چشم بر خودِ مار می‌مانَد، بُت‌پرستی است. نام نیز همین را می‌گوید: روزی «شفا»، روزی «فقط مفرغ». همه‌چیز بسته به آن است که نگاه کجا می‌ایستد."
                : "Este es el doble filo de la serpiente: la misma mirada que salva puede destruir. Si el ojo sube a través de la serpiente hacia lo alto, es sanación. Si el ojo se queda en la serpiente misma, es idolatría. El nombre lo dice todo: un día «la que sana», otro día «solo bronce». Todo depende de dónde se detiene la mirada."}
            </p>
          </div>
        </Section>

        {/* ── EL CORAZÓN: GEMATRÍA 358 ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "قلبِ راز: ۳۵۸" : "El corazón: 358"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="נָחָשׁ" sub={fa ? "مار · ۳۵۸" : "Serpiente · 358"} color={C} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="מָשִׁיחַ" sub={fa ? "ماشیح · ۳۵۸" : "Mesías · 358"} color="#c9a43e" size={40} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "و اکنون عمیق‌ترین لایه. واژهٔ נָחָשׁ (نَحَش، «مار») حرف‌به‌حرف چنین جمع می‌شود: נ=۵۰، ח=۸، שׁ=۳۰۰ — یعنی ۵۰+۸+۳۰۰ = ۳۵۸. و واژهٔ מָשִׁיחַ (ماشیح، «مسیح/رهاننده»): מ=۴۰، שׁ=۳۰۰، י=۱۰، ח=۸ — یعنی ۴۰+۳۰۰+۱۰+۸ = ۳۵۸. هر دو، یک عدد: ۳۵۸."
                : "Y ahora la capa más profunda. La palabra נָחָשׁ (nájash, «serpiente») se suma letra por letra así: נ=50, ח=8, שׁ=300 — es decir 50+8+300 = 358. Y la palabra מָשִׁיחַ (mashíaj, «Mesías/redentor»): מ=40, שׁ=300, י=10, ח=8 — es decir 40+300+10+8 = 358. Ambas, un mismo número: 358."}
            </p>
            <p>
              {fa
                ? "این تصادف نیست؛ این کلِ آموزه است. نیرویِ زهرآگین — همان ماری که در عدن انسان را به سقوط کشاند — وقتی برافراشته و به سویِ بالا چرخانده شود، خودْ شفا می‌گردد. کارِ ماشیح همین است: نه نابودیِ مار، بلکه تیکونِ آن (تَعمیر/بازآوریِ آن). آن نیرویی که افکنده بود، همان نیروست که برمی‌خیزاند — وقتی به‌سویِ خدا برگردانده شود."
                : "Esto no es casualidad; es la enseñanza entera. La fuerza venenosa — la misma serpiente que en el Edén llevó al hombre a la caída — cuando se eleva y se gira hacia lo Alto, se vuelve cura. La obra del Mashíaj es exactamente esta: no destruir la serpiente, sino su tikún (reparación). La misma fuerza que derribó es la fuerza que levanta — cuando se la vuelve hacia Dios."}
            </p>
            <p>
              {fa
                ? "از همین رو، مارِ برافراشتهٔ موشه در بیابان، پیش‌نشانهٔ ماشیح است: درمانی به شکلِ همان درد، نجاتی برآمده از همان نیرویی که زخم زده بود."
                : "Por eso, la serpiente elevada de Moshé en el desierto es una prefiguración del Mashíaj: una cura con la forma del mismo dolor, una salvación que brota de la misma fuerza que había herido."}
            </p>
          </div>
        </Section>

        {/* ── ¿POR QUÉ BRONCE? LOS TRES METALES = LAS TRES COLUMNAS ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "چرا مفرغ؟ سه فلز، سه ستون" : "¿Por qué bronce? Los tres metales"}
          </h3>

          <div className="flex flex-wrap items-end justify-center gap-2.5">
            <Tile he="כֶּסֶף" sub={fa ? "نقره · حِسِد" : "Plata · Jésed"} color="#7fb0e0" size={36} />
            <Tile he="זָהָב" sub={fa ? "طلا · گِبورا" : "Oro · Guevurá"} color="#c9a43e" size={36} />
            <Tile he="נְחֹשֶׁת" sub={fa ? "مفرغ · تیفئرت" : "Bronce · Tiféret"} color={C} size={36} />
          </div>

          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "تورات سه فلز را برایِ ساختِ مِشکان (خیمهٔ مقدس) کنارِ هم می‌نهد: «זָהָב וָכֶסֶף וּנְחֹשֶׁת» (زاهاو وَخِسِف اوُنِحُشِت، «طلا و نقره و مفرغ») (خروج ۲۵:۳). در کابالا این سه، سه ستونِ עֵץ הַחַיִּים (عِتْص هَحَیّیم، «درختِ زندگی») هستند: راست، چپ و میانه."
                : "La Torá pone los tres metales juntos para construir el Mishkán (el Tabernáculo): «זָהָב וָכֶסֶף וּנְחֹשֶׁת» (zahav va-kesef u-nejóshet, «oro y plata y bronce») (Éxodo 25:3). En la Cabalá, estos tres son las tres columnas del עֵץ הַחַיִּים (etz ha-jaím, «Árbol de la Vida»): derecha, izquierda y medio."}
            </p>
            <p>
              {fa
                ? "כֶּסֶף (خِسِف، «نقره») سفید است، و در کابالا نشانِ חֶסֶד (حِسِد، «مهر و بخشش») است — ستونِ راست. זָהָב (زاهاو، «طلا») سرخ‌فام است، و نشانِ גְּבוּרָה (گِبورا، «صلابت و داوری») است — ستونِ چپ. این دو، دو بازویِ آفرینش‌اند: یکی نزدیک می‌آورد، دیگری حد می‌نهد."
                : "כֶּסֶף (kesef, «plata») es blanca, y en la Cabalá es el signo de חֶסֶד (jésed, «bondad y amor») — la columna derecha. זָהָב (zahav, «oro») es rojizo, y es el signo de גְּבוּרָה (guevurá, «rigor y juicio») — la columna izquierda. Son los dos brazos de la creación: uno acerca, el otro pone límite."}
            </p>
            <p>
              {fa
                ? "و میان این دو، ستونِ سوم: תִּפְאֶרֶת (تیفئرت، «هماهنگی و زیبایی»)، خطِّ میانه که حِسِد و گِبورا را آشتی می‌دهد. تیفئرت همان رَحَمیم (مِهرِ متعادل) است — نه مهرِ بی‌مرز، نه داوریِ بی‌رحم، بلکه آمیزهٔ درست."
                : "Y entre los dos, la tercera columna: תִּפְאֶרֶת (tiféret, «armonía y belleza»), la línea media que reconcilia a Jésed y Guevurá. Tiféret es rajamim (la misericordia equilibrada) — ni bondad sin límite, ni juicio sin piedad, sino la mezcla justa."}
            </p>
            <p>
              {fa
                ? "اکنون رازِ خودِ فلز آشکار می‌شود. واژهٔ נְחֹשֶׁת (نِحُشِت، «مفرغ/مس») از همان ریشهٔ נָחָשׁ (نَحَش، «مار») است. و در آموزهٔ کابالا، נָחָשׁ — همان واژه‌ای که در آیهٔ ۲۱:۹ به‌کار رفته — به תִּפְאֶרֶת، ستونِ میانه، می‌پیوندد؛ حال‌آنکه שָׂרָף (ساراف، «مارِ آتشین») — واژهٔ آیهٔ ۲۱:۸ — به גְּבוּרָה، ستونِ داوری، تعلق دارد."
                : "Ahora se revela el secreto del metal mismo. La palabra נְחֹשֶׁת (nejóshet, «bronce/cobre») viene de la misma raíz que נָחָשׁ (nájash, «serpiente»). Y en la enseñanza cabalística, el נָחָשׁ — la misma palabra usada en el versículo 21:9 — se vincula a תִּפְאֶרֶת, la columna media; mientras que el שָׂרָף (saraf, «serpiente ardiente») — la palabra del versículo 21:8 — pertenece a גְּבוּרָה, la columna del juicio."}
            </p>
            <p>
              {fa
                ? "و درست همین جابه‌جایی، در خودِ متن رخ می‌دهد: خدا فرمان می‌دهد یک שָׂרָף (ساراف · گِبورا · زهر) ساخته شود — اما موشه یک נָחָשׁ نِحُشِت (نَحَش · تیفئرت · شفا) می‌سازد. زهرِ گِبورا، چون برافراشته شود، به هماهنگیِ تیفئرت بازآفریده می‌شود. شفا یعنی بازگشتِ تعادل: نیرویِ داوری، نه نابود، بلکه به خطِّ میانه برکشیده و درمان‌شده."
                : "Y exactamente ese cambio ocurre en el texto mismo: Dios ordena hacer un שָׂרָף (saraf · Guevurá · veneno) — pero Moshé hace un נָחָשׁ de nejóshet (nájash · Tiféret · cura). El veneno de Guevurá, al ser elevado, se recrea en la armonía de Tiféret. Sanar es el retorno del equilibrio: la fuerza del juicio, no destruida, sino levantada a la línea media y curada."}
            </p>
            <p>
              {fa
                ? "از این روست که مارِ شفابخش از مفرغ است، نه از طلا و نه از نقره: نه مهرِ محض، نه داوریِ محض، بلکه ستونِ میانه — همان‌جا که تضاد آشتی می‌یابد و درمان فرود می‌آید."
                : "Por eso la serpiente sanadora es de bronce, y no de oro ni de plata: ni bondad pura, ni juicio puro, sino la columna del medio — el lugar donde el conflicto se reconcilia y desciende la cura."}
            </p>
          </div>
        </Section>

        {/* ── SÍNTESIS ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              נָחָשׁ · מָשִׁיחַ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "زهری که، برافراشته، شفا می‌شود" : "El veneno que, elevado, se vuelve cura"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "مار شفا نمی‌دهد؛ نگاه به بالا شفا می‌دهد. همان نیرویی که در عدن افکند، چون به‌سویِ خدا برگردد، برمی‌خیزانَد. این تیکونِ مارِ نخستین است — کارِ ماشیح. و نگاه کردن به بالا، درد را انکار نمی‌کند؛ آن را برمی‌افرازد."
                : "La serpiente no sana; sana la mirada hacia lo Alto. La misma fuerza que en el Edén derribó, vuelta hacia Dios, levanta. Este es el tikún de la serpiente primera — la obra del Mashíaj. Y mirar hacia arriba no niega el dolor: lo eleva."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "مارِ مسین · اعداد ۲۱" : "La serpiente · Números 21:8", ref: "Numbers 21:8" },
                { label: fa ? "رُش هَشانا ۳:۸" : "Rosh Hashaná 3:8", ref: "Mishnah Rosh Hashanah 3:8" },
                { label: fa ? "نِحُشتان · ۲ پادشاهان" : "Nejushtán · 2 Reyes 18:4", ref: "II Kings 18:4" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Numbers 21:8")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ عمیق در جاشمال ←" : "Estudiar este misterio en Jashmal →"}
            </button>

            <div className="mt-5 flex justify-center gap-5 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/358" className="hover:text-gold">{fa ? "← راز ۳۵۸: ماشیح و مار" : "← Misterio 358: el Mesías y la serpiente"}</Link>
            </div>
            <div className="mt-3 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/gematrias" className="hover:text-gold">{fa ? "گالریِ گیماتریا ←" : "Galería de Gematría →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "شاید درمانِ هر درد، شکلِ خودِ آن درد را داشته باشد. آنچه ما را زخم زده، اگر به‌سویِ بالا برافرازیمش، می‌تواند همان چیزی شود که ما را شفا می‌دهد. نگاه را تنها باید از خودِ زخم بگذرانیم، رو به آن‌که در آسمان است."
                : "Quizás la cura de todo dolor tiene la forma del dolor mismo. Aquello que nos hirió, si lo elevamos hacia lo Alto, puede volverse lo que nos sana. Solo hay que hacer pasar la mirada a través de la herida, hacia Aquel que está en los Cielos."}
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
