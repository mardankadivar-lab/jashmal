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

export default function PageSalmo137() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#6fa8d6"; // azul de río — las aguas de Babilonia

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterios" className="font-cinzel text-sm text-gold/70 hover:text-gold">← {fa ? "رازها" : "Misterios"}</Link>
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
            {fa ? "راو گینزبورگ · ۱۳۷، پیوستِ الف" : "Rav Ginsburgh · 137, Apéndice A"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="84" sub={fa ? "واژه" : "Palabras"} color="#8fb8cc" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>÷</span>
            <Tile he="2" sub={fa ? "زبانِ من" : "«mi lengua»"} color="#8fb8cc" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>=</span>
            <Tile he="42" sub={fa ? "کوچ‌ها" : "Viajes"} color={C} size={40} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(64px, 19vw, 128px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            13.700
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "بر کناره‌های رودهای بابل" : "Junto a los ríos de Babilonia"}
          </h2>
          <p className="mt-3 text-sm text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "مزمورِ ۱۳۷ — مزمورِ تبعید، حرف به حرف اندازه‌گرفته"
              : "El Salmo 137 — el salmo del destierro, medido letra por letra"}
          </p>
        </div>

        {/* SECCIÓN 1 — Dos salmos antes de bendecir */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "دو مزمور پیش از برکت" : "Dos salmos antes de bendecir"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "رسم است که پیش از برکتِ پس از نان (بیرکَت هَمازون) یکی از دو مزمور خوانده شود. در روزهای عادی مزمورِ ۱۳۷، و در شبات و اعیاد مزمورِ ۱۲۶. این دو با هم یک سفر را می‌سازند: مزمورِ ۱۳۷ رفتن از صیون به تبعیدِ بابل است؛ مزمورِ ۱۲۶ بازگشت از تبعید و شادیِ رهایی."
                : "Es costumbre recitar, antes de la bendición que sigue al pan (Birkat HaMazón), uno de dos salmos: en día ordinario el Salmo 137, y en Shabat y días de fiesta el Salmo 126. Los dos juntos forman un solo viaje: el 137 es la ida de Tzión al destierro de Babilonia; el 126 es el regreso del destierro y la alegría de la redención."}
            </p>
            <p>
              {fa
                ? "و هر دو بر یک واژه استوارند. در بَمیدبار (اعداد) ۳۳:۲ نوشته است: «و موسی مبدأهایِ (מוֹצָאֵיהֶם) کوچ‌هایشان را نوشت… و این‌هاست کوچ‌هایشان به سویِ مبدأهایشان». واژهٔ «مبدأ» یا «سرچشمه» — מוֹצָא — برابرِ ۱۳۷ است. رفتن و بازگشتن، هر دو، حرکت به سویِ سرچشمه‌اند."
                : "Y los dos se sostienen sobre una sola palabra. En Bamidbar (Números) 33:2 está escrito: «Y Moisés escribió los orígenes (מוֹצָאֵיהֶם) de sus viajes… y estos son sus viajes según sus orígenes». La palabra «origen», «punto de salida» —מוֹצָא, motzá— vale 137. Irse y volver son, las dos, un movimiento hacia el origen."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="Junto a los ríos de Babilonia, allí nos sentamos y también lloramos, al recordarnos de Tzión."
          fa="بر کناره‌های رودهای بابل، آنجا نشستیم و نیز گریستیم، آنگاه که صیون را به یاد آوردیم."
          source={fa ? "مزامیر ۱۳۷:۱" : "Tehilim (Salmos) 137:1"}
          fa_active={fa} />

        {/* SECCIÓN 2 — 84 palabras y la lengua en medio */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "هشتاد‌و‌چهار واژه، و زبان درست در میانه" : "Ochenta y cuatro palabras, y la lengua justo en medio"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="לְשׁוֹנִי" sub={fa ? "واژهٔ ۴۲" : "Palabra 42"} color="#8fb8cc" size={30} />
            <span className="font-cinzel text-2xl text-gold/40">|</span>
            <Tile he="לְחִכִּי" sub={fa ? "واژهٔ ۴۳" : "Palabra 43"} color="#8fb8cc" size={30} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "مزمورِ ۱۳۷ دقیقاً ۸۴ واژه دارد. نیمهٔ ۸۴ برابرِ ۴۲ است — همان شمارِ منزل‌هایی که قومِ اسرائیل در بیابان پیمود (بَمیدبار ۳۳؛ راشی همان‌جا). و واژهٔ چهل‌و‌دوم دقیقاً کجاست؟ لְשׁוֹנִי، «زبانِ من». واژهٔ چهل‌و‌سوم لְחִכִּי است، «به کامِ من»."
                : "El Salmo 137 tiene exactamente 84 palabras. La mitad de 84 es 42 — el mismo número de campamentos que Israel recorrió en el desierto (Bamidbar 33; Rashi ad loc.). ¿Y dónde cae exactamente la palabra número 42? En לְשׁוֹנִי, leshoní, «mi lengua». La número 43 es לְחִכִּי, lejikí, «a mi paladar»."}
            </p>
            <p>
              {fa
                ? "این دو واژه از آیهٔ مشهورِ سوگند می‌آیند: «اگر تو را فراموش کنم، ای اورشلیم… زبانم به کامم بچسبد». مزمور دقیقاً همان‌جا دو نیم می‌شود که زبان به کام می‌چسبد: در مرزِ میانِ سخن و خاموشی. و در سنّت، زبان و کام دو مبدأِ متفاوتِ صدا در دهان‌اند — دو «سرچشمه»."
                : "Las dos palabras vienen del juramento más famoso del salmo: «Si te olvido, Jerusalén… que mi lengua se pegue a mi paladar». El salmo se parte exactamente donde la lengua se pega al paladar: en la frontera entre el habla y el enmudecer. Y en la tradición, la lengua y el paladar son dos puntos de origen distintos del sonido en la boca — dos «manantiales» de la voz."}
            </p>
            <p>
              {fa
                ? "حال ارزشِ عددیِ آن ۴۲ واژهٔ نخست را جمع کن — از עַל نخستین تا לְשׁוֹנִי. حاصل ۱۳٬۷۰۰ است. دقیقاً صد برابرِ ۱۳۷: عددِ קַבָּלָה و همان عددی که در فیزیک پیوندِ نور و ماده را می‌سنجد."
                : "Ahora suma el valor numérico de esas 42 primeras palabras — desde el עַל inicial hasta לְשׁוֹנִי. El resultado es 13.700. Exactamente cien veces 137: el número de קַבָּלָה (Cabalá) y el mismo número que en física mide el acoplamiento entre la luz y la materia."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — 317 */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "۳۱۷ — مزموری که خود را امضا می‌کند" : "317 — el salmo que se firma a sí mismo"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="עַל" sub="100" color="#8fb8cc" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="הַסָּֽלַע" sub="165" color="#8fb8cc" size={30} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="יהוה×2" sub="52" color="#c9a43e" size={26} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="317" sub={fa ? "حروفِ مزمور" : "Letras del salmo"} color={C} size={40} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "مزمور دقیقاً ۳۱۷ حرف دارد — و ۳۱۷ جابه‌جاییِ رقم‌هایِ ۱۳۷ است. اما امضا ژرف‌تر می‌رود: نخستین واژهٔ مزمور עַל («بر») برابرِ ۱۰۰ است، آخرین واژه‌اش הַסָּלַע («صخره») برابرِ ۱۶۵، و نامِ خدا (יהוה = ۲۶) دو بار در آن می‌آید. ۱۰۰ + ۱۶۵ + ۵۲ = ۳۱۷. مزمور شمارِ حروفِ خود را در آغاز، پایان و نامِ الهی‌اش نوشته است."
                : "El salmo tiene exactamente 317 letras — y 317 es una permutación de los dígitos de 137. Pero la firma va más hondo: su primera palabra, עַל («junto a»), vale 100; su última palabra, הַסָּלַע («la roca»), vale 165; y el Nombre de Dios (יהוה = 26) aparece dos veces. 100 + 165 + 52 = 317. El salmo escribió el número de sus propias letras en su comienzo, su final y su Nombre divino."}
            </p>
            <p>
              {fa
                ? "و ارزشِ عددیِ تمامِ مزمور ۲۴٬۲۵۵ است = ۵۵ × ۴۴۱. ۵۵ برابرِ הַכֹּל («همه‌چیز») است و ۴۴۱ برابرِ אֱמֶת («حقیقت»، که ۲۱ به توانِ دو است). و جمعِ همان دو عدد، ۵۵ + ۴۴۱، برابرِ ۴۹۶ می‌شود: מַלְכוּת، مَلخوت، «پادشاهی» — واپسین سفیرا، همان که تبعید را در خود می‌کشد."
                : "Y el valor numérico del salmo entero es 24.255 = 55 × 441. 55 es הַכֹּל («todo») y 441 es אֱמֶת («verdad», que además es 21 al cuadrado). Y la suma de esos dos números, 55 + 441, da 496: מַלְכוּת, Maljut, «Reinado» — la última sefirá, la que carga el exilio."}
            </p>
            <p>
              {fa
                ? "و یک جزئیاتِ کوچک که همه‌چیز را می‌گشاید: مزمور با حرفِ עַיִן آغاز می‌شود (עַל) و با همان حرف پایان می‌یابد (הַסָּלַע). עַיִן یعنی «چشم». تبعید با چشمی گریان آغاز می‌شود و با چشمی می‌بندد که هنوز می‌نگرد — همان‌گونه که یِشَعیاهو (اشعیا) ۵۲:۸ وعده می‌دهد: «زیرا چشم در چشم خواهند دید، آنگاه که خداوند به صیون بازگردد»."
                : "Y un detalle pequeño que lo abre todo: el salmo empieza con la letra עַיִן (en עַל) y termina con esa misma letra (en הַסָּלַע). עַיִן significa «ojo». El destierro se abre con un ojo que llora y se cierra con un ojo que sigue mirando — tal como promete Yeshayahu (Isaías) 52:8: «porque ojo a ojo verán, cuando el Eterno regrese a Tzión»."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 4 — 1820 */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "۱۸۲۰ — مُهرِ آخرین آیه" : "1.820 — el sello del último versículo"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="ע" sub={fa ? "چشم · ۷۰" : "Ojo · 70"} color="#8fb8cc" size={44} />
            <span className="font-cinzel text-2xl text-gold/40">×</span>
            <Tile he="יהוה" sub="26" color="#c9a43e" size={34} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="1820" sub={fa ? "آیهٔ پایانی" : "Versículo final"} color={C} size={34} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "مزمور با سخت‌ترین آیه‌اش پایان می‌یابد — فریادِ قومی ویران‌شده بر ضدِّ امپراتوری‌ای که آن را ویران کرد. مفسّرانِ کلاسیک آن را نه دستور، بلکه دادخواهی می‌خوانند؛ و در خوانشِ کابالایی «کودکانِ بابل» زاده‌هایِ خودِ شرّند و «صخره» (הַסֶּלַע) نامی است برایِ خدا، همان صخره‌ای که همه‌چیز بر آن فرومی‌ریزد."
                : "El salmo termina con su versículo más duro — el grito de un pueblo arrasado contra el imperio que lo arrasó. Los comentaristas clásicos lo leen no como una orden sino como una demanda de justicia; y en la lectura cabalística, «los pequeños de Babel» son las crías del mal mismo, y «la roca» (הַסֶּלַע) es un nombre de Dios: la roca contra la cual todo eso acaba deshaciéndose."}
            </p>
            <p>
              {fa
                ? "و درست همان آیه یک مُهر بر خود دارد. ارزشِ عددیِ کاملِ آن ۱۸۲۰ است: یعنی ۷۰ × ۲۶ — عددِ حرفِ עַיִן («چشم») ضربدرِ نامِ خدا. و ۱۸۲۰ دقیقاً همان تعداد بارهایی است که نامِ יהוה در سراسرِ تورات می‌آید (شمارش‌شده و راست‌آزمایی‌شده در متنِ مسورایی، شاملِ صورت‌هایِ پیشوندی چون לַיהוה و וַיהוה)."
                : "Y ese mismo versículo lleva un sello encima. Su valor numérico completo es 1.820: es decir, 70 × 26 — el número de la letra עַיִן («ojo») multiplicado por el Nombre de Dios. Y 1.820 es exactamente la cantidad de veces que el Nombre יהוה aparece en toda la Torá (contado y verificado sobre el texto masorético, incluyendo las formas con prefijo como לַיהוה y וַיהוה)."}
            </p>
            <p>
              {fa
                ? "پس آخرین سخنِ مزمورِ تبعید — تلخ‌ترین سطرش — دقیقاً به اندازهٔ همهٔ بارهایی می‌ارزد که خدا نامِ خود را در تورات نوشته است. در ژرف‌ترین نقطهٔ تبعید، امضایِ کاملِ خدا آنجا حاضر است."
                : "De modo que la última palabra del salmo del destierro —su línea más amarga— vale exactamente tanto como todas las veces que Dios escribió Su Nombre en la Torá. En el punto más hondo del exilio está presente, entera, la firma de Dios."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 5 — El regreso: Salmo 126 */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "بازگشت — ۱۳۷ همچون جمعِ دو مربع" : "El regreso — 137 como suma de dos cuadrados"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="הָלוֹךְ יֵלֵךְ" sub="121 = 11²" color="#8fb8cc" size={22} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="בֹּא יָבֹא" sub="16 = 4²" color="#8fb8cc" size={22} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="137" sub="קַבָּלָה" color={C} size={40} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "و اکنون مزمورِ همتا، مزمورِ ۱۲۶ — مزمورِ بازگشت. آیهٔ پایانی‌اش دو حرکتِ مکمل را کنارِ هم می‌گذارد: «رفتن می‌رود و می‌گرید، آن‌که بذر می‌بَرَد؛ آمدن می‌آید با شادی، آن‌که بافه‌هایش را می‌آورد». عبری هر فعل را دو بار می‌گوید: הָלוֹךְ יֵלֵךְ («رفتن می‌رود») و בֹּא יָבֹא («آمدن می‌آید»)."
                : "Y ahora el salmo gemelo, el 126 — el salmo del regreso. Su versículo final pone lado a lado dos movimientos complementarios: «Andando anda y llora el que lleva la bolsa de semilla; viniendo viene con canto de alegría el que trae sus gavillas». El hebreo dice cada verbo dos veces: הָלוֹךְ יֵלֵךְ («andando anda») y בֹּא יָבֹא («viniendo viene»)."}
            </p>
            <p>
              {fa
                ? "הָלוֹךְ יֵלֵךְ برابرِ ۱۲۱ است — که ۱۱ به توانِ دو است. בֹּא יָבֹא برابرِ ۱۶ است — که ۴ به توانِ دو است. و ۱۲۱ + ۱۶ = ۱۳۷. رفتن و آمدن، اندوه و شادی، دو مربعِ کامل که با هم عددِ کابالا را می‌سازند."
                : "הָלוֹךְ יֵלֵךְ vale 121 — que es 11 al cuadrado. בֹּא יָבֹא vale 16 — que es 4 al cuadrado. Y 121 + 16 = 137. La ida y la venida, el llanto y la alegría: dos cuadrados perfectos que juntos hacen el número de la Cabalá."}
            </p>
            <p>
              {fa
                ? "هر عددی را می‌توان با حداکثر چهار مربع نوشت؛ اما عددی که با تنها دو مربع نوشته شود کمیاب است. اختلافِ دو ریشهٔ ۱۳۷ (۱۱ و ۴) برابرِ ۷ است. سری f(n) = n² + (n+۷)² را بساز و از n = −۳ آغاز کن: ۲۵، ۲۹، ۳۷، ۴۹، ۶۵، ۸۵، ۱۰۹، ۱۳۷… ۱۳۷ هشتمین جمله است، درست در میانهٔ سیزده جملهٔ نخست — و جمعِ آن سیزده جمله برابرِ ۱٬۷۸۱ است، یعنی ۱۳ × ۱۳۷."
                : "Todo número puede escribirse con cuatro cuadrados como máximo; pero un número que se escriba con solo dos es raro. La diferencia entre las dos raíces de 137 (11 y 4) es 7. Construye la serie f(n) = n² + (n+7)² empezando en n = −3: 25, 29, 37, 49, 65, 85, 109, 137… 137 es el octavo término, justo en el centro de los trece primeros — y la suma de esos trece términos es 1.781, o sea 13 × 137."}
            </p>
            <p>
              {fa
                ? "و یک واپسین تاب: در مزمورِ ۱۲۶ واژه‌ای هست که به یک صورت نوشته می‌شود (שְׁבוּתֵנוּ) و به صورتی دیگر خوانده (שְׁבִיתֵנוּ). اگر ارزشِ کلِ مزمور را با نوشته و با خوانده جمع کنی، ۲۴٬۶۶۰ به دست می‌آید = ۱۸۰ × ۱۳۷. و این دو عدد، عمرِ انسان‌اند: ۱۸۰ سالِ ییتسحاق (پیدایش ۳۵:۲۸)، درازترین عمرِ پدرانِ قوم؛ و ۱۳۷، عمری که در تورات بیش از همه تکرار می‌شود — اسماعیل، لاوی و عَمرام."
                : "Y un último giro: en el Salmo 126 hay una palabra que se escribe de un modo (שְׁבוּתֵנוּ) y se lee de otro (שְׁבִיתֵנוּ). Si sumas el valor total del salmo leído tal como está escrito más el valor leído tal como se pronuncia, obtienes 24.660 = 180 × 137. Y esos dos números son vidas humanas: los 180 años de Itzjak (Génesis 35:28), la vida más larga de los patriarcas; y 137, la edad que más se repite en la Torá — Ismael, Leví y Amram."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 6 — Hitbonenut */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.05] to-transparent p-8">
            <p className="hebrew mb-4 text-center text-xl text-gold/70" style={{ textShadow: dark ? "0 0 10px #c9a43e44" : "none" }}>
              הִתְבּוֹנְנוּת
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              <p>
                {fa
                  ? "لحظه‌ای با این بنشین. مزموری که ویران‌ترین لحظهٔ تاریخِ یهود را می‌سراید — نشستن بر خاکِ بیگانه و ناتوانی از خواندن — نازک‌ترین ساختارِ عددیِ کتابِ مزامیر را در خود دارد. دقیقاً ۸۴ واژه. دقیقاً ۳۱۷ حرف. برشی دقیق بر واژهٔ «زبانِ من». چیزی که به نظر فروپاشیِ محض می‌آید، از درون تا آخرین حرف اندازه‌گرفته شده است."
                  : "Siéntate un momento con esto. El salmo que canta el momento más devastado de la historia judía —sentarse en tierra extraña y no poder cantar— es el que lleva dentro la arquitectura numérica más fina del libro de los Salmos. Exactamente 84 palabras. Exactamente 317 letras. Un corte exacto en la palabra «mi lengua». Lo que parece derrumbe puro está medido por dentro hasta la última letra."}
              </p>
              <p>
                {fa
                  ? "و پرسشِ شخصی همین است: تبعیدِ تو کجاست؟ کدام بخش از زندگی‌ات آن‌قدر آشفته به نظر می‌رسد که نمی‌توانی در آن آواز بخوانی؟ مزمور نمی‌گوید درد واقعی نیست. می‌گوید درد شمرده شده است. زبانی که به کام می‌چسبد دقیقاً نقطهٔ میانی است — نه پایان."
                  : "Y la pregunta personal es esta: ¿dónde está tu destierro? ¿Qué parte de tu vida se ve tan rota que no puedes cantar dentro de ella? El salmo no dice que el dolor no sea real. Dice que el dolor está contado. La lengua que se pega al paladar es exactamente el punto medio — no el final."}
              </p>
              <p>
                {fa
                  ? "پس از آن نقطه، مزمور به یاد آوردن ادامه می‌دهد؛ و مزمورِ همراهش به گریه‌کنانی می‌رسد که با بافه بازمی‌گردند. رفتن ۱۲۱ است، بازگشتن ۱۶، و با هم ۱۳۷ می‌شوند. هیچ‌کدام بی‌دیگری کامل نیست."
                  : "Después de ese punto el salmo sigue recordando; y su salmo compañero llega a los que salieron llorando y vuelven con las gavillas. La ida vale 121, el regreso 16, y juntos hacen 137. Ninguno de los dos está completo sin el otro."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 7 — Síntesis */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              עַל נַהֲרוֹת בָּבֶל
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "مزموری که در تبعید اندازه گرفته شد" : "El salmo medido en el destierro"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "۸۴ واژه، برش‌خورده بر «زبانِ من»: چهل‌و‌دو واژهٔ نخست = ۱۳٬۷۰۰ = ۱۰۰ × ۱۳۷. ۳۱۷ حرف = نخستین واژه (۱۰۰) + آخرین واژه (۱۶۵) + دو بار نامِ خدا (۵۲). کلِ مزمور = ۲۴٬۲۵۵ = הַכֹּל (۵۵) × אֱמֶת (۴۴۱)، و ۵۵ + ۴۴۱ = ۴۹۶ = מַלְכוּת. و آخرین آیه = ۱۸۲۰ = ۷۰ × ۲۶: به‌اندازهٔ تمامِ بارهایی که نامِ خدا در تورات نوشته شده است."
                : "84 palabras, cortadas en «mi lengua»: las 42 primeras = 13.700 = 100 × 137. 317 letras = primera palabra (100) + última palabra (165) + dos veces el Nombre (52). El salmo entero = 24.255 = הַכֹּל (55) × אֱמֶת (441), y 55 + 441 = 496 = מַלְכוּת. Y el último versículo = 1.820 = 70 × 26: tanto como todas las veces que el Nombre de Dios está escrito en la Torá."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "مزامیر ۱۳۷" : "Tehilim 137", ref: "Psalms 137" },
                { label: fa ? "مزامیر ۱۲۶" : "Tehilim 126", ref: "Psalms 126" },
                { label: fa ? "بمیدبار ۳۳:۲" : "Bamidbar 33:2", ref: "Numbers 33:2" },
                { label: fa ? "یشعیاهو ۵۲:۸" : "Yeshayahu 52:8", ref: "Isaiah 52:8" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Psalms 137")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ مزمورِ ۱۳۷ در جاشمال ←" : "Estudiar el Salmo 137 en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، پیوستِ الف" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, Apéndice A"}
            </div>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterios" className="hover:text-gold">{fa ? "همهٔ رازها ←" : "Todos los misterios →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "آن‌ها چنگ‌هایشان را بر بیدها آویختند و از خواندن سر باز زدند. اما مزمور را نوشتند. و آن مزمور — نوشته‌شده در ژرف‌ترین نقطهٔ تبعید — از آغاز تا پایان با چشم مُهر شده و با نامی که هرگز نرفت شمرده شده است."
                : "Colgaron las arpas de los sauces y se negaron a cantar. Pero escribieron el salmo. Y ese salmo — escrito en el punto más hondo del destierro — está sellado de principio a fin con un ojo, y contado con un Nombre que nunca se fue."}
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
