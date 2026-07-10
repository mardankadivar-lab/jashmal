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

export default function PageSimetriaCPT() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#5ad1a0";       // verde-menta: el espejo, la simetría
  const P = "#48b8f0";       // azul: el espacio / paridad
  const T = "#c77dd0";       // magenta: el tiempo / la carga

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

        {/* HERO — 7 + 30 + 100 = 137 en las letras de los tres meses */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۱۴" : "Rav Ginsburgh · 137, cap. 14"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-2.5">
            <Tile he="ז" sub={fa ? "سیوان · ۷" : "Siván · 7"} color={C} size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>+</span>
            <Tile he="ל" sub={fa ? "تیشری · ۳۰" : "Tishrei · 30"} color={C} size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>+</span>
            <Tile he="ק" sub={fa ? "آدار · ۱۰۰" : "Adar · 100"} color={C} size={40} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            137
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "تقارنِ CPT — آنگاه که زمان به عقب می‌رود" : "Simetría CPT — cuando el tiempo corre hacia atrás"}
          </h2>
        </div>

        {/* SECCIÓN 1 — La ley que el universo nunca rompe */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "قانونی که کیهان هرگز نمی‌شکند" : "La ley que el cosmos jamás viola"}
          </h3>
          <div className="mb-6 flex flex-wrap items-stretch justify-center gap-2.5">
            <Tile he="C" sub={fa ? "بار" : "Carga"} color={T} size={40} />
            <Tile he="P" sub={fa ? "فضا" : "Espacio"} color={P} size={40} />
            <Tile he="T" sub={fa ? "زمان" : "Tiempo"} color={T} size={40} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در فیزیکِ ذرات سه «آینه» وجود دارد. C: وارونه‌کردنِ بار (هر ذره را با پادذرهٔ خود عوض کن). P: وارونه‌کردنِ فضا (چپ و راست را جابه‌جا کن، مانندِ تصویر در آینه). T: وارونه‌کردنِ زمان (فیلم را برعکس پخش کن). هیچ‌کدام به‌تنهایی همیشه برقرار نیست — برایِ نمونه، نیرویِ هسته‌ایِ ضعیف تقارنِ P را می‌شکند. اما شگفتیِ ژرف این است: اگر هر سه را همزمان وارونه کنی — C و P و T با هم — جهانِ حاصل دقیقاً همانندِ جهانِ ماست. تا امروز، هرگز نقضِ تقارنِ CPT در آزمایشگاه دیده نشده است."
                : "En la física de partículas hay tres «espejos». C: invertir la carga (cambia cada partícula por su antipartícula). P: invertir el espacio (intercambia izquierda y derecha, como una imagen en el espejo). T: invertir el tiempo (pasa la película al revés). Ninguno por separado se conserva siempre — por ejemplo, la fuerza nuclear débil rompe la simetría P. Pero aquí está el asombro profundo: si inviertes los tres a la vez —C y P y T juntos— el universo que resulta es exactamente idéntico al nuestro. Hasta hoy, jamás se ha observado en el laboratorio una violación de la simetría CPT."}
            </p>
            <p>
              {fa
                ? "این یکی از ژرف‌ترین اصولِ فیزیکِ نو است: نظریهٔ نسبیت، اسپینِ ذرات و اصلِ طردِ پاؤلی را به هم می‌پیوندد. و خودِ عددِ ۱۳۷ — ثابتِ ساختارِ ریز که شدتِ برهم‌کنشِ نور و ماده را تعیین می‌کند — با معادله‌ای تعریف می‌شود که بارِ الکتریکی (e) و سرعتِ نور (c) را در بر دارد؛ یعنی بار، فضا و زمان را. پس رازِ ۱۳۷ به زبانِ همین سه تقارن نوشته شده است."
                : "Es uno de los principios más profundos de la física moderna: enlaza la teoría de la relatividad, el espín de las partículas y el principio de exclusión de Pauli. Y el propio número 137 —la constante de estructura fina que fija la intensidad del intercambio entre la luz y la materia— se define con una ecuación que incluye la carga eléctrica (e) y la velocidad de la luz (c); es decir, carga, espacio y tiempo. El misterio del 137 está escrito en el lenguaje de esas tres simetrías."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="«Las leyes de la ciencia no distinguen entre la dirección hacia adelante y hacia atrás del tiempo.»"
          fa="«قوانینِ علم میانِ جهتِ روبه‌جلو و روبه‌عقبِ زمان فرقی نمی‌گذارند.»"
          source={fa ? "استیون هاوکینگ، تاریخچهٔ زمان" : "Stephen Hawking, Breve historia del tiempo"}
          fa_active={fa} />

        {/* SECCIÓN 2 — Cabalá lo escribió primero: mundo, año, alma */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "جهان، سال و جان" : "Mundo, año y alma"}
          </h3>
          <div className="flex flex-wrap items-end justify-center gap-2.5">
            <Tile he="עוֹלָם" sub={fa ? "جهان · فضا · P" : "Mundo · espacio · P"} color={P} size={30} />
            <Tile he="שָׁנָה" sub={fa ? "سال · زمان · T" : "Año · tiempo · T"} color={C} size={30} />
            <Tile he="נֶפֶשׁ" sub={fa ? "جان · بار · C" : "Alma · carga · C"} color={T} size={30} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "کهن‌ترین متنِ کابالا، سِفِر یِتسیرا («کتابِ آفرینش»، منسوب به ابراهیم)، بیست‌ودو حرفِ عبری را به سه گروه بخش می‌کند. هر گروه سه بُعدِ واقعیت را در بر دارد: بُعدی فضایی (עוֹלָם، «جهان»)، بُعدی زمانی (שָׁנָה، «سال») و بُعدی روحانی (נֶפֶשׁ، «جان»). قرن‌ها پیش از آنکه فیزیک CPT را کشف کند، کابالا آفرینش را بر همین سه ستون بنا کرده بود."
                : "El texto más antiguo de la Cabalá, el Séfer Yetzirá («Libro de la Formación», atribuido a Abraham), divide las veintidós letras hebreas en tres grupos. Cada grupo lleva tres dimensiones de la realidad: una dimensión espacial (עוֹלָם, olam, «mundo»), una temporal (שָׁנָה, shaná, «año») y una anímica (נֶפֶשׁ, néfesh, «alma»). Siglos antes de que la física descubriera el CPT, la Cabalá ya había levantado la creación sobre esas tres columnas."}
            </p>
            <p>
              {fa
                ? "و انطباق کامل است. فضا (עולם) همان P است — پاریتی، چپ و راست. زمان (שנה) همان T است. و بار (C) همان جان (נפש) است: در فیزیک، بار همان نیرویِ انرژیِ یک ذره است؛ در موجودِ زنده، همان نیرویِ حیات، همان جان. سه آینهٔ فیزیک، همان سه بُعدِ آفرینشِ کابالایی‌اند."
                : "Y la correspondencia es exacta. El espacio (olam) es la P — paridad, izquierda y derecha. El tiempo (shaná) es la T. Y la carga (C) es el alma (néfesh): en física, la carga es la fuerza de energía de una partícula; en el ser vivo, esa misma fuerza es la vida, el alma. Los tres espejos de la física son las tres dimensiones de la creación cabalística."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — 137 escondido en el calendario */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "۱۳۷ پنهان در چرخِ سال" : "137 escondido en la rueda del año"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="ז" sub={fa ? "سیوان · ۷" : "Siván · 7"} color={C} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="ל" sub={fa ? "تیشری · ۳۰" : "Tishrei · 30"} color={C} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="ק" sub={fa ? "آدار · ۱۰۰" : "Adar · 100"} color={C} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="137" sub="קַבָּלָה" color={C} size={44} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "از دوازده نشانهٔ منطقة‌البروج، تنها سه نشانه «جفت» هستند — نامشان جمع است: توأمان (تאومים، جوزا)، ترازو (מאזنים، میزان) و ماهیان (דגים، حوت). این سه نشانهٔ دوگانه دقیقاً با پاریتی، زمان و بار متناظرند. و ماه‌هایشان سیوان، تیشری و آدار است. سِفِر یِتسیرا به هر ماه یک حرف می‌دهد: سیوان → زاین (ז) = ۷؛ تیشری → لامِد (ל) = ۳۰؛ آدار → کوف (ק) = ۱۰۰. جمعشان: ۷ + ۳۰ + ۱۰۰ = ۱۳۷. عددِ فیزیک، پنهان در چرخِ سالِ عبری."
                : "De los doce signos del zodíaco, solo tres son «pares» —su nombre está en plural—: los Gemelos (תאומים, Géminis), la Balanza (מאזנים, Libra) y los Peces (דגים, Piscis). Esos tres signos dobles corresponden justamente a paridad, tiempo y carga. Y sus meses son Siván, Tishrei y Adar. El Séfer Yetzirá asigna a cada mes una letra: Siván → zayin (ז) = 7; Tishrei → lámed (ל) = 30; Adar → kuf (ק) = 100. Suma: 7 + 30 + 100 = 137. El número de la física, escondido en la rueda del año hebreo."}
            </p>
            <p>
              {fa
                ? "و دو حرف از این سه — کوف (ק) و لامِد (ל) — از حروفِ خودِ واژهٔ «קַבָּלָה» (کابالا) هستند، که آن نیز برابرِ ۱۳۷ است. حتی نمِ ژرف‌تر: دهمین واژهٔ تورات תֹהוּ («توهو»، آشوب) است؛ سه حرفش ۴۱۱ است و میانگینشان دقیقاً ۱۳۷. عدد، همه‌جا در بافتِ آفرینش دوخته شده است."
                : "Y dos de esas tres letras —kuf (ק) y lámed (ל)— son letras de la propia palabra «קַבָּלָה» (Kabbalah), que también vale 137. Aún más hondo: la décima palabra de la Torá es תֹהוּ (tohu, «caos»); sus tres letras suman 411 y su promedio es exactamente 137. El número está cosido por todas partes en el tejido de la creación."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 4 — Teshuvá: viajar hacia atrás en el tiempo */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.05] to-transparent p-8">
            <p className="hebrew mb-4 text-center text-xl text-gold/70" style={{ textShadow: dark ? "0 0 10px #c9a43e44" : "none" }}>
              תְּשׁוּבָה
            </p>
            <h3 className="mb-5 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
              {fa ? "تشووا — بازگشت به گذشته" : "Teshuvá — volver atrás en el tiempo"}
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              <p>
                {fa
                  ? "این خیره‌کننده‌ترین بخش است. در سطحِ زیراتمی، قوانینِ فیزیک میانِ گذشته و آینده فرقی نمی‌گذارند (تقارنِ T). یک پوزیترون — پادِ الکترون — را می‌توان الکترونی دانست که در زمان به عقب حرکت می‌کند. زمان، در بنیادِ خود، دو طرفه است."
                  : "Aquí está lo más deslumbrante. Al nivel subatómico, las leyes de la física no distinguen entre el pasado y el futuro (simetría T). Un positrón —el anti-electrón— puede leerse como un electrón que se mueve hacia atrás en el tiempo. El tiempo, en su raíz, va en los dos sentidos."}
              </p>
              <p>
                {fa
                  ? "و تشووا (بازگشت، توبه) همان تقارنِ T ِ جان است. ماهِ تیشری — که نامش تִּשְׁرֵי با سه حرفِ آخرِ الفبا (ر-ش-ت) اما به‌ترتیبِ وارونه آغاز می‌شود — ماهِ بازگشت است. حکیمان می‌آموزند که تشووا از سرِ عشق، گناهانِ عمدی را به شایستگی بدل می‌کند: نه فقط پاک‌کردنِ گذشته، بلکه بازنویسیِ آن. تلمود می‌گوید: «در تورات پیش و پس نیست.» گذشته مُهر و موم نشده است."
                  : "Y la teshuvá (retorno, arrepentimiento) es la simetría T del alma. El mes de Tishrei —cuyo nombre תִּשְׁרֵי empieza con las tres últimas letras del alfabeto (resh-shin-tav) pero en orden invertido— es el mes del regreso. Los sabios enseñan que la teshuvá hecha por amor convierte las faltas intencionales en méritos: no solo borra el pasado, lo reescribe. El Talmud dice: «en la Torá no hay antes ni después». El pasado no está sellado."}
              </p>
              <p>
                {fa
                  ? "این است پیامِ عملی برایِ امروز: آنچه اکنون می‌کنی می‌تواند به عقب برسد و آنچه را که پیش‌تر رخ داده شفا دهد. یک عملِ بازگشت، از سرِ عشق، در زمان به عقب سفر می‌کند."
                  : "Este es el mensaje práctico para hoy: lo que haces ahora puede alcanzar hacia atrás y sanar lo que ya ocurrió. Un acto de retorno, hecho por amor, viaja hacia atrás en el tiempo."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              עוֹלָם · שָׁנָה · נֶפֶשׁ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "سه آینه‌ای که یکی می‌شوند" : "Los tres espejos que son uno"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "بار، فضا و زمان (CPT) — جان، جهان و سال. فیزیک می‌گوید جهان تنها زمانی کامل و متقارن است که هر سه با هم وارونه شوند؛ کابالا می‌گوید آفرینش از یک نقطه برمی‌آید که در آن چپ و راست، گذشته و آینده، نر و ماده هنوز از هم جدا نشده‌اند. و در حروفِ سه ماه — ۷ + ۳۰ + ۱۰۰ — همان ۱۳۷ نهفته است: عددِ کابالا و عددِ نور."
                : "Carga, espacio y tiempo (CPT) — alma, mundo y año. La física dice que el universo solo es completo y simétrico cuando los tres se invierten juntos; la Cabalá dice que la creación brota de un punto donde izquierda y derecha, pasado y futuro, masculino y femenino aún no se han separado. Y en las letras de los tres meses —7 + 30 + 100— late ese mismo 137: el número de la Kabbalah y el número de la luz."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بِرِشیت ۱:۲ · توهو" : "Bereshit 1:2 · tohu", ref: "Genesis 1:2" },
                { label: fa ? "دواریم ۳۰:۲ · تشووا" : "Devarim 30:2 · teshuvá", ref: "Deuteronomy 30:2" },
                { label: fa ? "ویکرا ۲۳:۲۷ · یوم کیپور" : "Vayikrá 23:27 · Yom Kipur", ref: "Leviticus 23:27" },
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
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۱۴" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 14"}
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
                ? "جهان تنها زمانی خود را کامل نشان می‌دهد که در برابرِ هر سه آینه بایستد: بار، فضا و زمان با هم. و شگفت آنکه سومین آینه — زمان — می‌تواند به عقب بازگردد. یعنی هیچ‌چیز به‌راستی گم نشده است. آنچه امروز از سرِ عشق می‌کنی، هنوز می‌تواند دیروز را برهاند."
                : "El universo solo se muestra entero cuando se para ante los tres espejos a la vez: carga, espacio y tiempo. Y lo asombroso es que el tercer espejo —el tiempo— puede correr hacia atrás. Es decir: nada está verdaderamente perdido. Lo que hoy haces por amor todavía puede redimir el ayer."}
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
