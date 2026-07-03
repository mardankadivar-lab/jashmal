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

export default function PageCasamentero() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#c77dd0"; // orquídea — la unión del azul (luz masculina) y el rojo (materia femenina)

  // Los tres versículos del Tanaj que dicen que la pareja se decide en el Cielo.
  const filas: {
    ref: string; refFa: string; libro: string; libroFa: string;
    frase: string; fraseFa: string; gem: string; color: string;
  }[] = [
    {
      ref: "Torá · Bereshit (Génesis) 24:50", refFa: "تورات · بِرِشیت (پیدایش) ۲۴:۵۰",
      libro: "Torá", libroFa: "تورات",
      frase: "«De Hashem salió el asunto» — la familia de Rivká, al entregarla a Itzjak.",
      fraseFa: "«این امر از خداوند برآمد» — خانوادهٔ ریوقا، هنگامِ سپردنِ او به اسحاق.",
      gem: "מֵיְהוָה יָצָא הַדָּבָר = 378 = חַשְׁמַל", color: "#5b8fd6",
    },
    {
      ref: "Profetas · Shoftim (Jueces) 14:4", refFa: "پیامبران · شوفطیم (داوران) ۱۴:۴",
      libro: "Profetas", libroFa: "پیامبران",
      frase: "«De Hashem era ella» — sobre la esposa de Shimshón (Sansón); «ello» (הִיא) significa literalmente «ella».",
      fraseFa: "«از خداوند بود او» — دربارهٔ همسرِ شیمشون (سامسون)؛ «آن» (הִיא) در لغت یعنی «او (زن)».",
      gem: "מֵיְהוָה הִיא", color: "#c77dd0",
    },
    {
      ref: "Escritos · Mishlé (Proverbios) 19:14", refFa: "نوشته‌ها · میشلِی (امثال) ۱۹:۱۴",
      libro: "Escritos", libroFa: "نوشته‌ها",
      frase: "«…mas de Hashem, una mujer sabia» — la mujer entendida no es herencia de padres, sino don del Cielo.",
      fraseFa: "«…اما از خداوند، زنی خردمند» — زنِ فهیم میراثِ پدران نیست، بلکه بخششِ آسمان است.",
      gem: "אִשָּׁה מַשְׂכָּלֶת = 1096 = 8 × 137", color: "#48b8f0",
    },
  ];

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

        {/* HERO — el que halla = 137 */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۱۱" : "Rav Ginsburgh · 137, cap. 11"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="מוֹצֵא" sub={fa ? "آن‌که می‌یابد · ۱۳۷" : "El que halla · 137"} color={C} size={38} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>=</span>
            <Tile he="קַבָּלָה" sub="137" color="#9a6a8e" size={38} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            137
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "خدا، واسطهٔ آسمانی" : "Dios, el Casamentero"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "همان عددی که نور را به ماده جفت می‌کند، دو جان را نیز به هم می‌پیوندد."
              : "El mismo número que acopla la luz con la materia enlaza también a dos almas."}
          </p>
        </div>

        {/* SECCIÓN 1 — 137, la constante de acoplamiento */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "۱۳۷ — ثابتِ جفت‌شدن" : "137 — la constante que acopla"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در فیزیک، عددِ ۱۳۷ «ثابتِ ساختارِ ریز» نامیده می‌شود: عددی بی‌بُعد که تعیین می‌کند نور تا چه شدّتی به مادّه می‌چسبد. آن را «ثابتِ جفت‌شدگی» (coupling constant) می‌خوانند — یعنی همان عددی که می‌گوید یک فوتون (ذرّهٔ نور) و یک الکترون (ذرّهٔ مادّه) با چه نیرویی یکدیگر را در آغوش می‌گیرند. بدونِ آن، اتم‌ها شکل نمی‌گرفتند و جهانِ مادّی وجود نداشت."
                : "En física, el número 137 se llama «constante de estructura fina»: un número sin dimensiones que fija con qué intensidad la luz se adhiere a la materia. Se le llama «constante de acoplamiento» (coupling constant) — es decir, el número que dice con cuánta fuerza un fotón (partícula de luz) y un electrón (partícula de materia) se abrazan. Sin él, los átomos no se formarían y no existiría el universo material."}
            </p>
            <p>
              {fa
                ? "گینزبورگ در اینجا تصویری زناشویی می‌بیند. فوتون بی‌جرم است و در خلأ همیشه با سرعتِ نور می‌رود؛ الکترون، ذرّهٔ مادّه، سنگین‌تر و کندتر است. وقتی الکترون یک فوتون را در خود می‌گیرد، برانگیخته می‌شود و به ترازی بالاتر می‌جهد — درست مانندِ پیوندی که دو نفر را دگرگون می‌کند. و در مدلِ بور، الکترونِ اتمِ هیدروژن با سرعتی نزدیک به یک‌صدوسی‌وهفتمِ سرعتِ نور می‌چرخد. پس ۱۳۷ همان آستانه‌ای است که در آن انرژی، مادّه می‌شود؛ جایی که نورِ «مذکّر» و مادّهٔ «مؤنّث» به هم می‌رسند."
                : "Ginsburgh ve aquí una imagen nupcial. El fotón no tiene masa y en el vacío viaja siempre a la velocidad de la luz; el electrón, partícula de materia, es más pesado y más lento. Cuando el electrón absorbe un fotón, se energiza y salta a un nivel superior — igual que una unión que transforma a dos personas. Y en el modelo de Bohr, el electrón del átomo de hidrógeno orbita a cerca de 1/137 de la velocidad de la luz. Así, 137 es el umbral donde la energía se vuelve materia: donde la luz «masculina» y la materia «femenina» se encuentran."}
            </p>
            <p>
              {fa
                ? "و ۱۳۷، همان‌طور که در سراسرِ این سری دیده‌ایم، ارزشِ عددیِ واژهٔ קַבָּלָה (کابالا) است. عددی که در فیزیک نور و مادّه را جفت می‌کند، در عبری نامِ خودِ حکمتی است که پیوندها را می‌آموزد."
                : "Y 137, como hemos visto a lo largo de esta serie, es el valor numérico de la palabra קַבָּלָה (Cabalá). El número que en la física acopla luz y materia es, en hebreo, el nombre mismo de la sabiduría que enseña las uniones."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 2 — El que halla vale 137 */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "«آن‌که می‌یابد» برابرِ ۱۳۷ است" : "«El que halla» vale 137"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="מ" sub="40" color="#9a6a8e" size={34} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="ו" sub="6" color="#9a6a8e" size={34} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="צ" sub="90" color="#9a6a8e" size={34} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="א" sub="1" color="#9a6a8e" size={34} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="137" sub="מוֹצֵא" color={C} size={40} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "تلمود (بِراخوت ۸الف) نقل می‌کند که در سرزمینِ اسرائیل، وقتی مردی زن می‌گرفت، از او می‌پرسیدند: מָצָא یا מוֹצֵא؟ — «یافتی» یا «می‌یابی»؟ این پرسش دو آیه را رو در رو می‌گذارد. یکی از میشلِی (امثال ۱۸:۲۲): «مָצָא אִשָּׁה מָצָא טוֹב — آن‌که همسری یافت، نیکی یافت.» و دیگری از قوهلِت (جامعه ۷:۲۶): «וּמוֹצֶא אֲנִי מַר מִמָּוֶת — و من زن را تلخ‌تر از مرگ می‌یابم.» سرنوشتِ یک ازدواج به این بستگی دارد که تو در همسرت «نیکی» را می‌یابی یا «تلخی» را."
                : "El Talmud (Berajot 8a) cuenta que en la Tierra de Israel, cuando un hombre se casaba, le preguntaban: מָצָא o מוֹצֵא — «¿hallaste» o «hallas»? La pregunta enfrenta dos versículos. Uno, de Mishlé (Proverbios 18:22): «מָצָא אִשָּׁה מָצָא טוֹב — el que halló esposa halló bien». El otro, de Kohelet (Eclesiastés 7:26): «וּמוֹצֶא אֲנִי מַר מִמָּוֶת — y hallo a la mujer más amarga que la muerte». El destino de un matrimonio depende de si tú hallas en tu pareja «el bien» o «la amargura»."}
            </p>
            <p>
              {fa
                ? "و درست همین واژهٔ کلیدی — מוֹצֵא، «آن‌که می‌یابد» — برابرِ ۱۳۷ است: م (۴۰) + و (۶) + צ (۹۰) + א (۱) = ۱۳۷. همان עدد کابالا، همان عددِ جفت‌شدنِ نور و مادّه. یافتنِ همسر، در زبانِ عبری، همان عددی را دارد که در آسمان دو ذرّه را به هم می‌بندد."
                : "Y esa misma palabra clave — מוֹצֵא, «el que halla» — vale 137: מ (40) + ו (6) + צ (90) + א (1) = 137. El número de Cabalá, el número que acopla la luz con la materia. Hallar esposa, en hebreo, lleva el mismo número que en el cosmos ata dos partículas."}
            </p>
            <p>
              {fa
                ? "מוֹצֵא معنایِ دیگری هم دارد: «سرچشمه، خاستگاه». در بَمیدبار (اعداد ۳۳:۲) موسی «خاستگاه‌هایِ» (מוֹצָאֵיהֶם) سفرهایِ بنی‌اسرائیل را می‌نویسد. اَلتِر رِبه (بنیان‌گذارِ خاباد) می‌آموزد که غایتِ سفرِ جان در این جهان، بازگشت به سرچشمهٔ خویش است. ازدواج، در ژرف‌ترین لایه، یافتنِ آن سرچشمه است: دو نیمهٔ یک جان که یکدیگر را بازمی‌یابند."
                : "מוֹצֵא tiene otro sentido: «origen, fuente». En Bamidbar (Números 33:2) Moshé escribe los «orígenes» (מוֹצָאֵיהֶם) de los viajes de Israel. El Alter Rebe (fundador de Jabad) enseña que la meta del viaje del alma por este mundo es volver a su origen. El matrimonio, en su capa más honda, es hallar ese origen: dos mitades de una misma alma que se reencuentran."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — Las parejas se hacen en el Cielo */}
        <Section>
          <h3 className="mb-2 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "هر جفت در آسمان بسته می‌شود" : "Cada pareja se decide en el Cielo"}
          </h3>
          <p className="mx-auto mb-6 max-w-md text-center text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "حکیمان (مועد قطان ۱۸ب) می‌آموزند که در هر یک از سه بخشِ کتابِ مقدس، آیه‌ای هست که آشکارا می‌گوید همسر از آسمان می‌آید:"
              : "Los sabios (Moed Katán 18b) enseñan que en cada una de las tres partes de la Biblia hay un versículo que dice, explícito, que la pareja viene del Cielo:"}
          </p>

          <div className="space-y-2.5">
            {filas.map((f, i) => (
              <div key={i} className="rounded-xl border px-4 py-3"
                style={{ borderColor: `${f.color}55`, background: "rgba(14,12,22,0.6)" }}>
                <p className="font-cinzel text-xs font-bold uppercase tracking-widest" style={{ color: f.color }}>
                  {fa ? f.refFa : f.ref}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-parchment/80">{fa ? f.fraseFa : f.frase}</p>
                <p className="hebrew mt-2 text-sm" style={{ color: "#fff6e0", textShadow: `0 0 10px ${f.color}66` }} dir="rtl">{f.gem}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "و در هر سه، عدد پنهان است. در تورات، عبارتِ «این امر از خداوند برآمد» (מֵיְהוָה יָצָא הַדָּבָר) برابرِ ۳۷۸ است — همان חַשְׁמַל، رازآمیزترین واژهٔ کتابِ مقدس. در نوشته‌ها، «زنی خردمند» (אִשָּׁה מַשְׂכָּלֶת) برابرِ ۱۰۹۶ است، یعنی هشت‌بار ۱۳۷؛ و چون هشت حرف دارد، میانگینِ هر حرف دقیقاً ۱۳۷ است."
                : "Y en las tres, el número está escondido. En la Torá, la frase «de Hashem salió el asunto» (מֵיְהוָה יָצָא הַדָּבָר) vale 378 — el mismo חַשְׁמַל, la palabra más misteriosa de la Biblia. En los Escritos, «una mujer sabia» (אִשָּׁה מַשְׂכָּלֶת) vale 1096, es decir ocho veces 137; y como tiene ocho letras, el valor promedio de cada letra es exactamente 137."}
            </p>
            <p>
              {fa
                ? "رو (روت) و بوعز نیز از همین قماش‌اند: مجموعِ نام‌هایشان (בֹּעַז + רוּת) برابرِ ۶۸۵ = پنج‌بار ۱۳۷ است. زوهر می‌گوید که جان‌هایِ بوعز و روت از جمله جان‌هایی بودند که خدا پیش از آفرینشِ جهان با آنان مشورت کرد. و اسحاق و ریوقا، نخستین زوجِ یک‌همسرِ تورات، نمونهٔ کاملِ «جفتی که در آسمان بسته شد» هستند. تلمود (سوطا ۲الف) می‌گوید جفت‌کردنِ دو نفر برایِ خدا به دشواریِ شکافتنِ دریایِ سرخ است."
                : "Rut y Bóaz son de la misma estirpe: la suma de sus nombres (בֹּעַז + רוּת) vale 685 = cinco veces 137. El Zóhar dice que las almas de Bóaz y Rut estuvieron entre aquellas con las que Dios consultó antes de crear el mundo. E Itzjak y Rivká, la primera pareja monógama de la Torá, son el ejemplo perfecto de «un match hecho en el Cielo». El Talmud (Sotá 2a) dice que emparejar a dos personas es, para Dios, tan difícil como partir el Mar Rojo."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="«Casa y hacienda son herencia de los padres; mas de Hashem, una mujer sabia.»"
          fa="«خانه و مال میراثِ پدران است؛ اما زنی خردمند از خداوند.»"
          source={fa ? "میشلِی (امثال) ۱۹:۱۴" : "Mishlé (Proverbios) 19:14"}
          fa_active={fa} />

        {/* SECCIÓN 4 — Hitbonenut */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.05] to-transparent p-8">
            <p className="hebrew mb-4 text-center text-xl text-gold/70" style={{ textShadow: dark ? "0 0 10px #c9a43e44" : "none" }}>
              הִתְבּוֹנְנוּת
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              <p>
                {fa
                  ? "لحظه‌ای با این بنشین. همان عددی که در قلبِ هر اتم، نور را به مادّه می‌بندد — ۱۳۷ — همان عددِ «آن‌که می‌یابد» همسری است، و همان عددِ کابالا. فیزیک می‌گوید بدونِ این ثابت، هیچ چیزی به هم نمی‌چسبید و جهانی نبود. کابالا می‌گوید بدونِ پیوند، هیچ جانی کامل نمی‌شد. یک عدد، دو زبان، یک حقیقت: هستی از جفت‌شدن ساخته شده است."
                  : "Siéntate un momento con esto. El mismo número que en el corazón de cada átomo ata la luz a la materia — 137 — es el número de «el que halla» esposa, y el número de la Cabalá. La física dice que sin esa constante nada se adheriría y no habría universo. La Cabalá dice que sin la unión ningún alma se completaría. Un número, dos lenguas, una verdad: la existencia está hecha de acoplamiento."}
              </p>
              <p>
                {fa
                  ? "و اگر ازدواج در آسمان بسته می‌شود، آنگاه یافتنِ همسر کاری نیست که تو به‌تنهایی انجام دهی؛ بازیافتنِ چیزی است که از پیش برایت آماده شده بود. پرسشِ حکیمان هنوز پابرجاست: تو در آن‌که با توست، «نیکی» را می‌یابی یا «تلخی» را؟ زیرا همان جفت، بسته به نگاهِ تو، می‌تواند מָצָא טוֹב باشد یا מַר מִמָּוֶת."
                  : "Y si el match se hace en el Cielo, entonces hallar esposa no es algo que tú logres solo; es reencontrar lo que ya estaba preparado para ti. La pregunta de los sabios sigue en pie: en quien está contigo, ¿hallas «el bien» o «la amargura»? Porque una misma pareja, según cómo la mires, puede ser מָצָא טוֹב (hallar el bien) o מַר מִמָּוֶת (más amarga que la muerte)."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              מוֹצֵא אִשָּׁה מָצָא טוֹב
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "عددِ ازدواجِ کیهانی" : "El número del matrimonio cósmico"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "۱۳۷ در فیزیک نور را به مادّه جفت می‌کند؛ در عبری، «آن‌که می‌یابد» (מוֹצֵא) همسری برابرِ ۱۳۷ = קַבָּלָה است. فوتونِ مذکّر و الکترونِ مؤنّث، دو نیمهٔ یک جان، دو ذرّه که یکی می‌شوند — همه با یک عدد. و حکیمان می‌گویند این پیوند در آسمان بسته می‌شود، به دشواریِ شکافتنِ دریا. جهان از جفت‌شدن ساخته شده است."
                : "137 en la física acopla la luz con la materia; en hebreo, «el que halla» (מוֹצֵא) esposa vale 137 = קַבָּלָה. El fotón masculino y el electrón femenino, dos mitades de una misma alma, dos partículas que se vuelven una — todo con un solo número. Y los sabios dicen que esa unión se decide en el Cielo, tan difícil como partir el mar. El universo está hecho de acoplamiento."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بِرِشیت ۲۴:۵۰" : "Bereshit 24:50", ref: "Genesis 24:50" },
                { label: fa ? "میشلِی ۱۸:۲۲" : "Mishlé 18:22", ref: "Proverbs 18:22" },
                { label: fa ? "بِرِشیت ۲:۲۴" : "Bereshit 2:24", ref: "Genesis 2:24" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 2:24")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ رازِ پیوند در جاشمال ←" : "Estudiar el secreto de la unión en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۱۱" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 11"}
            </div>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterios" className="hover:text-gold">{fa ? "همهٔ اسرار ←" : "Todos los Misterios →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "نور بی‌جرم است و آزادانه می‌رود؛ مادّه سنگین است و در جای می‌ماند. تنها یک عدد آن‌ها را به هم می‌بندد و از انرژی، جهان می‌سازد. و همان عدد، دو جان را نیز به هم می‌رساند. شاید یافتنِ دیگری، در ژرفا، همان یافتنِ سرچشمهٔ خویش باشد."
                : "La luz no tiene masa y va libre; la materia es pesada y se queda. Un solo número las ata y hace, de la energía, un mundo. Y ese mismo número acerca también a dos almas. Quizá hallar al otro sea, en el fondo, hallar el propio origen."}
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
