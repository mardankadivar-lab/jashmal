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

export default function Page411() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#3fd0b0";       // verde-digital — el binario, el código
  const ZERO = "#5b8fd6";    // azul — la nada, el 0, el ayin
  const ONE = "#e8b45a";     // ámbar — el ser, el 1, el yesh

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

        {/* HERO — tohu = yesh me'ayin = 411 = 3 × 137 */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۵" : "Rav Ginsburgh · 137, cap. 5"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="תֹהוּ" sub={fa ? "تهی · ۴۱۱" : "Vacío · 411"} color={ZERO} size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>=</span>
            <Tile he="יֵשׁ מֵאַיִן" sub={fa ? "هست از هیچ · ۴۱۱" : "Algo de la nada · 411"} color={ONE} size={28} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            411
          </span>
          <p className="mt-1 font-cinzel text-lg tracking-widest text-gold/60">= 3 × 137</p>
          <h2 className="mt-3 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "صفر و یکِ آفرینش" : "El cero y el uno de la creación"}
          </h2>
        </div>

        {/* SECCIÓN 1 — La física y la matemática: todo es 0 y 1 */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "علم: تمامِ جهان، صفر و یک" : "La ciencia: todo el universo, en ceros y unos"}
          </h3>
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="0" sub={fa ? "خاموش · نیستی" : "Apagado · Nada"} color={ZERO} size={44} />
            <span className="font-cinzel text-2xl text-gold/40">·</span>
            <Tile he="1" sub={fa ? "روشن · هستی" : "Encendido · Ser"} color={ONE} size={44} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "هر عکس، هر آهنگ، هر واژه‌ای که بر این صفحه می‌خوانی، در ژرف‌ترین لایه‌اش تنها دو نشانه است: ۰ و ۱. خاموش و روشن. کلِ تمدنِ دیجیتال بر همین دو حالت استوار است. و فیزیک‌دانان مدت‌هاست می‌پرسند: آیا خودِ جهان نیز، در بنیادش، دوتایی است؟ جان ویلر، یکی از بزرگ‌ترین فیزیک‌دانانِ سدهٔ بیستم، این را در عبارتی مشهور فشرد: «it from bit» — «هستی از بیت»: هر ذرّه، هر میدان، در بنیاد پاسخِ یک پرسشِ آری/نه است. واقعیت، در ریشه، اطلاعاتِ دوتایی است."
                : "Cada foto, cada canción, cada palabra que lees en esta pantalla es, en su capa más profunda, solo dos símbolos: 0 y 1. Apagado y encendido. Toda la civilización digital descansa sobre esos dos estados. Y los físicos llevan tiempo preguntándose: ¿será el universo mismo, en su fondo, binario? John Wheeler, uno de los mayores físicos del siglo XX, lo condensó en una frase famosa: «it from bit» —«el ser a partir del bit»—: cada partícula, cada campo, es en el fondo la respuesta a una pregunta de sí/no. La realidad, en su raíz, es información binaria."}
            </p>
            <p>
              {fa
                ? "و شگفت این‌که نخستین کسی که نظامِ دوتایی را ساخت، خود آن را چون رازی الهی می‌دید. گاتفرید لایبنیتس، ریاضی‌دانی که در سدهٔ هفدهم حسابِ دوتایی را ابداع کرد، مبهوت بود که همه‌چیز را می‌توان تنها با ۰ و ۱ نوشت. او این را «تصویرِ آفرینش» (imago creationis) نامید: ۱ نشانهٔ هستی و خدا، ۰ نشانهٔ نیستی و خلأ. برای مدالی که طرح زد نوشت: «برای برآوردنِ همه‌چیز از هیچ، یک بسنده است.» آفرینش، برای او، همان گذر از ۰ به ۱ بود."
                : "Y lo asombroso es que el primero en construir el sistema binario ya lo veía como un secreto divino. Gottfried Leibniz, el matemático que inventó la aritmética binaria en el siglo XVII, quedó pasmado de que todo pudiera escribirse solo con 0 y 1. Lo llamó «imagen de la creación» (imago creationis): el 1 signo del ser y de Dios, el 0 signo de la nada y el vacío. Para una medalla que diseñó grabó: «para producir todo de la nada, uno basta». La creación, para él, era el paso del 0 al 1."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="Para producir todas las cosas de la nada, uno basta. (Omnibus ex nihilo ducendis sufficit unum.)"
          fa="برای برآوردنِ همه‌چیز از هیچ، یک بسنده است."
          source={fa ? "گاتفرید لایبنیتس، ۱۶۹۷ — بر مدالِ حسابِ دوتایی" : "Gottfried Leibniz, 1697 — sobre la medalla de la aritmética binaria"}
          fa_active={fa} />

        {/* SECCIÓN 2 — La Cabalá: crear es sacar algo de la nada */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "کابالا: آفریدن یعنی برآوردنِ هست از هیچ" : "La Cabalá: crear es sacar algo de la nada"}
          </h3>
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="אַיִן" sub={fa ? "هیچ · ۰" : "Nada · 0"} color={ZERO} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <Tile he="יֵשׁ" sub={fa ? "هست · ۱" : "Algo · 1"} color={ONE} size={40} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "قلبِ آموزهٔ آفرینش در سنّتِ یهودی همین است: יֵשׁ מֵאַיִן (یِش مِآیین) — «هست از هیچ». خدا جهان را از مادّه‌ای پیشین نساخت؛ آن را از نابودِ محض برآورد. رَمبان (نَحمانیدس) در تفسیرِ نخستین آیهٔ تورات می‌آموزد که واژهٔ בָּרָא (بارا، «آفرید») دقیقاً همین را می‌گوید: برآوردنِ هستی از نیستی. این بنیادی‌ترین دوتاییِ هستی است: אַיִן (هیچ، ۰) و יֵשׁ (هست، ۱). آفرینش، گذر از یکی به دیگری است — همان بیتِ نخستین."
                : "El corazón de la doctrina de la creación en la tradición judía es exactamente este: יֵשׁ מֵאַיִן (yesh me'ayin) —«algo desde la nada»—. Dios no formó el mundo a partir de una materia previa; lo sacó de la nada absoluta. El Rambán (Najmánides), comentando el primer versículo de la Torá, enseña que la palabra בָּרָא (bará, «creó») dice precisamente eso: hacer surgir el ser de la no-existencia. Es el binario más fundamental que existe: אַיִן (nada, 0) y יֵשׁ (algo, 1). Crear es el paso de uno al otro —el bit primordial."}
            </p>
            <p>
              {fa
                ? "و کابالا ژرف‌تر می‌رود: این «هیچ» (אַיִן) نبودِ خدا نیست، بلکه پنهان‌ترین حضورِ اوست — نوری چنان بی‌کران که در نگاهِ ما چون تاریکی می‌نماید. صفر، پُری است که هنوز آشکار نشده. یک، همان پُری است که به هستی درآمده. جهان، بی‌وقفه، از ۰ به ۱ کشیده می‌شود."
                : "Y la Cabalá va más hondo: esa «nada» (אַיִן) no es la ausencia de Dios, sino Su presencia más oculta —una luz tan infinita que a nuestros ojos parece oscuridad—. El cero es la plenitud aún no revelada. El uno es esa misma plenitud hecha existencia. El universo, sin cesar, es traído del 0 al 1."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — La ecuación: tohu = yesh me'ayin = 411 = 3 × 137 */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "عددی که در صفر و یک پنهان است" : "El número escondido en el cero y el uno"}
          </h3>
          <p className="hebrew mb-4 text-center text-xl leading-relaxed" style={{ color: "#c9a43e", textShadow: dark ? "0 0 10px #c9a43e66" : "none" }}>
            וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ
          </p>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="תֹהוּ" sub="411" color={ZERO} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="יֵשׁ מֵאַיִן" sub="411" color={ONE} size={26} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="3 × 137" sub={fa ? "کابالا" : "Kabbalah"} color={C} size={30} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "دومین آیهٔ تورات، جهان را در نخستین لحظه‌اش چنین وصف می‌کند: «و زمین تُهو و بُهو بود» (پیدایش ۱:۲) — تهی و آشفته، خلأِ آغازین پیش از آنکه صورت گیرد. واژهٔ תֹהוּ (تُهو) در گیماتریا برابرِ ۴۱۱ است. و همین است ارزشِ عددیِ عبارتِ יֵשׁ מֵאַיִן (یِش مِآیین، «هست از هیچ»): ۳۱۰ + ۱۰۱ = ۴۱۱. آن تهیِ آغازین، در عددِ خود، دقیقاً همان اصلِ آفرینش را می‌گوید: چیزی که از هیچ برمی‌آید."
                : "El segundo versículo de la Torá describe el mundo en su primer instante: «y la tierra era tohu va-vohu» (Génesis 1:2) —vacío y caos, el hueco primordial antes de tomar forma—. La palabra תֹהוּ (tohu) vale en gematría 411. Y ese es exactamente el valor numérico de la frase יֵשׁ מֵאַיִן (yesh me'ayin, «algo desde la nada»): 310 + 101 = 411. Ese vacío inicial, en su número, dice precisamente el principio de la creación: algo que surge de la nada."}
            </p>
            <p>
              {fa
                ? "و اکنون قلابِ نهایی: ۴۱۱ = ۳ × ۱۳۷. همان ۱۳۷ که ارزشِ קַבָּלָה (کابالا) است و ثابتِ ساختارِ ریز که برهم‌کنشِ نور و ماده را در سراسرِ جهان حکم می‌راند — سه بار در تهیِ آغازینِ آفرینش نوشته شده است. صفر و یکِ آفرینش، عددِ نور را در خود سه‌گانه دارند."
                : "Y ahora el gancho final: 411 = 3 × 137. El mismo 137 que es el valor de קַבָּלָה (Kabbalah) y la constante de estructura fina que gobierna la interacción entre la luz y la materia en todo el universo —está escrito tres veces en el vacío primordial de la creación. El cero y el uno de la creación llevan, triplicado, el número de la luz."}
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
                  ? "لحظه‌ای با این بنشین. ساده‌ترین دوتاییِ ممکن — ۰ و ۱، نیستی و هستی — بنیادِ هر رایانه، هر پیام و، به گفتهٔ برخی فیزیک‌دانان، خودِ واقعیت است. و همان دوتایی، در زبانِ تورات، اصلِ آفرینش است: هست از هیچ. تو نیز هر بامداد از نو آفریده می‌شوی — از خوابِ نیستی به بیداریِ هستی کشیده می‌شوی. زندگیِ تو، خود، گذری بی‌وقفه از ۰ به ۱ است."
                  : "Siéntate un momento con esto. El binario más simple posible —0 y 1, nada y ser— es el fundamento de toda computadora, de todo mensaje y, según algunos físicos, de la realidad misma. Y ese mismo binario, en el lenguaje de la Torá, es el principio de la creación: algo desde la nada. Tú también eres creado de nuevo cada mañana —traído del sueño de la nada a la vigilia del ser—. Tu vida misma es un paso incesante del 0 al 1."}
              </p>
              <p>
                {fa
                  ? "و اگر عددِ ۱۳۷ — عددِ نور و عددِ کابالا — سه بار در آن تهیِ آغازین نهفته است، شاید هیچِ تو نیز چنین باشد: نه خلأِ محض، بلکه پُری‌ای که هنوز آشکار نشده. آنجا که خود را «هیچ» می‌بینی، شاید درست همان‌جاست که آفرینشِ تازه‌ای در راه است."
                  : "Y si el número 137 —el número de la luz y el de la Kabbalah— está tres veces oculto en ese vacío inicial, quizá tu propia nada sea igual: no un hueco vacío, sino una plenitud aún no revelada. Ahí donde te ves «nada», quizá es justo el lugar donde una creación nueva está en camino."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              תֹהוּ · יֵשׁ מֵאַיִן
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "بیتِ نخستینِ آفرینش" : "El bit primordial de la creación"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "علم می‌گوید تمامِ واقعیت از ۰ و ۱ ساخته شده، و لایبنیتس آن را «تصویرِ آفرینش» نامید. کابالا پیش‌تر گفته بود: آفریدن یعنی یِش مِآیین — هست از هیچ. و تُهو، تهیِ آغازینِ پیدایش ۱:۲، برابرِ ۴۱۱ = ۳ × ۱۳۷ است: عددِ نور، سه بار، در صفر و یکِ آفرینش."
                : "La ciencia dice que toda la realidad está hecha de 0 y 1, y Leibniz la llamó «imagen de la creación». La Cabalá lo dijo antes: crear es yesh me'ayin —algo desde la nada—. Y tohu, el vacío primordial de Génesis 1:2, vale 411 = 3 × 137: el número de la luz, tres veces, en el cero y el uno de la creación."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بِرِشیت ۱:۱" : "Bereshit 1:1", ref: "Genesis 1:1" },
                { label: fa ? "بِرِشیت ۱:۲" : "Bereshit 1:2", ref: "Genesis 1:2" },
                { label: fa ? "بِرِشیت ۱:۳" : "Bereshit 1:3", ref: "Genesis 1:3" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 1:2")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ آفرینش در جاشمال ←" : "Estudiar la creación en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۵" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 5"}
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
                ? "پیش از هر صورت، پیش از هر نور، تنها دو حالت بود: هیچ و هست، ۰ و ۱. و در فاصلهٔ میانِ آن دو — در آستانه‌ای که نیستی به هستی می‌گراید — آفرینش رخ می‌دهد، دم‌به‌دم، اکنون."
                : "Antes de toda forma, antes de toda luz, solo había dos estados: la nada y el ser, el 0 y el 1. Y en el espacio entre los dos —en el umbral donde la nada se inclina hacia el ser— ocurre la creación, a cada instante, ahora."}
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
