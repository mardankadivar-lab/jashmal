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

export default function PageAbrazoCosmico() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#6d7bf0"; // azul-violeta cósmico: el espacio profundo que se expande

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

        {/* HERO — el número que abraza */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۱۰" : "Rav Ginsburgh · 137, cap. 10"}
          </p>
          <span className="mt-2 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            496
          </span>
          <h1 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "آغوشِ کیهانی" : "El abrazo cósmico"}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "جهان از هم می‌گسلد — و چیزی نادیدنی آن را در آغوش نگاه می‌دارد. مَلخوت (مَلكوت) = ۴۹۶."
              : "El universo se separa — y algo invisible lo sostiene en un abrazo. Maljut (Reino) = 496."}
          </p>
          <div className="mt-7 flex flex-wrap items-end justify-center gap-3">
            <Tile he="248" sub={fa ? "אברהם · E8" : "Abraham · E8"} color="#c9a43e" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>+</span>
            <Tile he="248" sub={fa ? "E8" : "E8"} color="#c9a43e" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>=</span>
            <Tile he="מַלְכוּת" sub="496" color={C} size={34} />
          </div>
        </div>

        {/* SECCIÓN 1 — El universo que huye */}
        <Section>
          <h2 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "جهانی که می‌گریزد" : "El universo que huye"}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در ۱۹۲۹ ادوین هابل کشف کرد که کهکشان‌ها از ما دور می‌شوند: هرچه دورتر، تندتر. جهان ساکن نیست — در حالِ گسترش است. و در ۱۹۹۸ کشفی تکان‌دهنده‌تر آمد (جایزهٔ نوبلِ ۲۰۱۱): این گسترش کُند نمی‌شود، بلکه شتاب می‌گیرد. هر دم، فضا میانِ کهکشان‌ها بیشتر و تندتر کشیده می‌شود."
                : "En 1929 Edwin Hubble descubrió que las galaxias se alejan de nosotros: cuanto más lejos, más rápido. El universo no está quieto — se expande. Y en 1998 llegó un hallazgo aún más perturbador (Premio Nobel 2011): esa expansión no se frena, sino que se acelera. A cada instante, el espacio entre las galaxias se estira más y más rápido."}
            </p>
            <p>
              {fa
                ? "اینجا معمایی است که فیزیک هنوز نگشوده است. آنچه شتابِ گسترش را می‌راند «انرژیِ تاریک» نام دارد؛ آنچه کهکشان‌ها را به‌رغمِ آن کنار هم نگاه می‌دارد «مادهٔ تاریک». هیچ‌کس نمی‌داند این دو چیستند. روی هم، حدودِ ۹۵٪ از کلِ جهان را می‌سازند. یعنی هر چیزی که می‌بینیم — ستارگان، سیاره‌ها، ما — تنها ۵٪ است. ۹۵٪ تاریک و ناشناخته است."
                : "Aquí hay un enigma que la física aún no resuelve. A lo que impulsa la aceleración se le llama «energía oscura»; a lo que mantiene unidas a las galaxias pese a ella, «materia oscura». Nadie sabe qué son. Juntas forman cerca del 95 % de todo el universo. Es decir: todo lo que vemos —estrellas, planetas, nosotros— es apenas el 5 %. El 95 % es oscuro y desconocido."}
            </p>
            <p>
              {fa
                ? "اگر گسترش پیروز شود، جهان روزی از هم دریده می‌شود («گسستِ بزرگ»). اگر گرانش پیروز شود، در خود فرومی‌ریزد («رُمبشِ بزرگ»). جهان میانِ دو نیرو آویخته است: یکی که می‌گستراند، دیگری که نگاه می‌دارد."
                : "Si vence la expansión, el universo algún día se desgarra (el «Gran Desgarro»). Si vence la gravedad, colapsa sobre sí mismo (el «Gran Colapso»). El universo pende entre dos fuerzas: una que expande, otra que retiene."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="«¿Quién extiende los cielos como una cortina, y los despliega como una tienda para habitar?»"
          fa="«آن‌که آسمان‌ها را چون پرده می‌گستراند، و آن‌ها را چون خیمه‌ای برای سکونت می‌گشاید.»"
          source={fa ? "اشعیا ۴۰:۲۲" : "Yeshayahu (Isaías) 40:22"}
          fa_active={fa} />

        {/* SECCIÓN 2 — El abrazo y la creación continua */}
        <Section>
          <h2 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "آغوش و آفرینشِ پیوسته" : "El abrazo y la creación continua"}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "کابالا دو نیرو را از دیرباز می‌شناسد. نیرویی که می‌گستراند، بیرون می‌ریزد و می‌بخشد — مردانه، چون خورشید در روز. و نیرویی که می‌پذیرد، حد می‌نهد و در آغوش می‌گیرد — زنانه، چون ماه در شب. راو گینزبورگ این را «آغوشِ کیهانی» می‌نامد: حلقه‌هایِ گسترندهٔ جهان را نیرویی مخالف از بیرون «در آغوش» می‌گیرد تا منفجر نشود."
                : "La Cabalá conoce esas dos fuerzas desde hace mucho. Una que expande, vuelca y da — masculina, como el sol de día. Y otra que recibe, pone límite y abraza — femenina, como la luna de noche. Rav Ginsburgh lo llama «el abrazo cósmico»: los anillos en expansión del universo son «abrazados» desde afuera por una fuerza opuesta que le impide estallar."}
            </p>
            <p>
              {fa
                ? "و چیزی ژرف‌تر: آفرینش رویدادی در آغاز نبود که تمام شده باشد. به آموزهٔ بَعَل شِم طوב (بنیان‌گذارِ حَسیدوت، در تانیا)، خدا جهان را هر لحظه از نو می‌آفریند. هر دم مِهبانگی تازه است؛ هر آن نوری تازه به نقطهٔ آغازین دمیده می‌شود و حلقه‌ای نو بیرون می‌جهد. ما این را هر بامداد می‌گوییم: «او که در نیکیِ خود هر روز، پیوسته، کارِ آفرینش را نو می‌کند»."
                : "Y algo más hondo: la creación no fue un evento del comienzo que ya terminó. Según la enseñanza del Baal Shem Tov (fundador del jasidismo, recogida en el Tania), Dios re-crea el mundo a cada instante. Cada momento es un nuevo Big Bang; en cada instante se insufla nueva luz al punto inicial y brota un nuevo anillo hacia afuera. Lo decimos cada mañana: «el que en Su bondad renueva cada día, de continuo, la obra de la creación»."}
            </p>
            <p className="hebrew text-center text-lg leading-relaxed" style={{ color: "#c9a43e", textShadow: dark ? "0 0 10px #c9a43e66" : "none" }}>
              הַמְחַדֵּשׁ בְּטוּבוֹ בְּכָל יוֹם תָּמִיד מַעֲשֵׂה בְרֵאשִׁית
            </p>
            <p className="text-center text-xs text-muted">
              {fa
                ? "«او که در نیکیِ خود هر روز پیوسته کارِ آفرینش را نو می‌کند» — دعای بامدادی (یوצֵר אور)"
                : "«…renueva cada día, de continuo, la obra de la creación» — oración matutina (Yotzer Or)"}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — 496: el número que sostiene */}
        <Section>
          <h2 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "۴۹۶ — عددی که نگاه می‌دارد" : "496 — el número que sostiene"}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="מַלְכוּת" sub={fa ? "ملكوت · ۴۹۶" : "Reino · 496"} color={C} size={36} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="248" sub={fa ? "אברהם" : "Abraham"} color="#c9a43e" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">×2</span>
            <Tile he="E8×E8" sub={fa ? "نظریهٔ ریسمان" : "Cuerdas"} color="#5b8fd6" size={26} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "آن نیرویِ پذیرنده و در‌بر‌گیرنده در کابالا نامی دارد: מַלְכוּת (مَلخوت)، «مَلكوت» — واپسین و زنانه‌ترین سفیرا، نیرویی که حد می‌نهد و فرمان می‌راند. ارزشِ عددیِ آن دقیقاً ۴۹۶ است."
                : "Esa fuerza receptiva que contiene tiene un nombre en la Cabalá: מַלְכוּת (Maljut), «Reino» — la última y más femenina de las sefirot, la fuerza que pone límite y rige. Su valor numérico es exactamente 496."}
            </p>
            <p>
              {fa
                ? "اکنون شگفتی: در نظریهٔ ریسمان، برای آن‌که معادلاتِ جهان سازگار باشند (حذفِ ناهنجاری‌ها، گرین–شوارتس ۱۹۸۴)، گروهِ تقارنِ جهان باید دقیقاً ۴۹۶ بُعد داشته باشد — یا SO(۳۲) یا E8×E8. همان عددِ مَلخوت. به‌علاوه ۴۹۶ = ۲ × ۲۴۸، و ۲۴۸ هم ارزشِ «אברהם» (ابراهیم) است و هم بُعدِ گروهِ E8. و ۴۹۶ یک «عددِ کامل» است (برابرِ جمعِ مقسوم‌علیه‌هایش) و مثلثِ عددِ ۳۱ = אל (نامِ خدا، «اِل»)."
                : "Ahora el asombro: en la teoría de cuerdas, para que las ecuaciones del universo sean consistentes (la cancelación de anomalías, Green–Schwarz 1984), el grupo de simetría del universo debe tener exactamente 496 dimensiones — sea SO(32) o E8×E8. El mismo número de Maljut. Además, 496 = 2 × 248, y 248 es a la vez el valor de «אברהם» (Abraham) y la dimensión del grupo E8. Y 496 es un «número perfecto» (igual a la suma de sus divisores) y el triángulo del número 31 = אל (un Nombre de Dios, «Kel»)."}
            </p>
            <p>
              {fa
                ? "و البته، ۱۳۷ نیز اینجا حاضر است: ۱/۱۳۷ ثابتِ برهم‌کنشِ نور و ماده است — «ازدواجِ» الکترون و فوتون. ۱۳۷ پیوندِ نور و ماده را تعریف می‌کند؛ ۴۹۶ ساختاری را که جهان برای نپاشیدن نیاز دارد."
                : "Y, por supuesto, 137 también está aquí: 1/137 es la constante del intercambio entre la luz y la materia — el «matrimonio» del electrón y el fotón. El 137 define la unión de luz y materia; el 496, la estructura que el universo necesita para no deshacerse."}
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
                  ? "لحظه‌ای با این بنشین. تو در جهانی زندگی می‌کنی که هر دم سریع‌تر از هم می‌گسلد — و با این همه نمی‌پاشد. چیزی آن را در آغوش نگاه می‌دارد؛ چیزی آن را هر آن از نو می‌آفریند. تو از هیچ به این لحظه پرتاب نشده‌ای و سپس رها؛ همین اکنون داری از نو آفریده می‌شوی."
                  : "Siéntate un momento con esto. Vives en un universo que a cada instante se separa más rápido — y aun así no se deshace. Algo lo sostiene en un abrazo; algo lo re-crea a cada momento. No fuiste lanzado de la nada a este instante y luego abandonado: estás siendo creado de nuevo ahora mismo."}
              </p>
              <p>
                {fa
                  ? "و آن دو نیرو در تو نیز هستند: نیرویی که بیرون می‌ریزد، می‌بخشد، گسترش می‌یابد؛ و نیرویی که حد می‌نهد، می‌پذیرد، در آغوش می‌گیرد. زندگیِ راست‌آیین نه گسستِ بزرگ است و نه رُمبشِ بزرگ، بلکه پیمانِ میانِ این دو — همان توازنی که جهان را برپا نگاه می‌دارد."
                  : "Y esas dos fuerzas también están en ti: una que vuelca, da, se expande; y otra que limita, recibe, abraza. Una vida rectificada no es ni Gran Desgarro ni Gran Colapso, sino el pacto entre ambas — el mismo equilibrio que mantiene en pie al universo."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              מַלְכוּת · בְּרִית יוֹמָם וָלָיְלָה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "پیمانِ روز و شب" : "El pacto del día y la noche"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "جهان میانِ دو نیرو آویخته است: گسترش (روز، خورشید، مردانه) و آغوش (شب، ماه، زنانه). ارمیا می‌گوید قوانینِ طبیعت بر «پیمانِ روز و شب» استوارند. عددِ آن نیرویِ در‌بر‌گیرنده — מַלְכוּת — برابرِ ۴۹۶ است: همان بُعدی که نظریهٔ ریسمان برای ممکن‌شدنِ جهان نیاز دارد. آنچه علم «تاریک» می‌نامد، کابالا آغوش می‌نامد."
                : "El universo pende entre dos fuerzas: la expansión (día, sol, masculino) y el abrazo (noche, luna, femenino). Jeremías dice que las leyes de la naturaleza descansan sobre «el pacto del día y la noche». El número de esa fuerza que contiene —מַלְכוּת, Maljut— es 496: la misma dimensión que la teoría de cuerdas necesita para que haya universo. A lo que la ciencia llama «oscuro», la Cabalá lo llama abrazo."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "ارمیا ۳۳:۲۵" : "Jeremías 33:25", ref: "Jeremiah 33:25" },
                { label: fa ? "اشعیا ۴۰:۲۲" : "Isaías 40:22", ref: "Isaiah 40:22" },
                { label: fa ? "بِرِشیت ۱:۱" : "Bereshit 1:1", ref: "Genesis 1:1" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Jeremiah 33:25")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ پیمانِ آفرینش در جاشمال ←" : "Estudiar el pacto de la creación en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۱۰" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 10"}
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
                ? "جهان از هم می‌گریزد، و چیزی نگاهش می‌دارد. هر دم پایان می‌یابد، و هر دم از نو زاده می‌شود. در فاصلهٔ میانِ این دو — در همان آغوشی که علم تاریک می‌خواندش — جهان زنده می‌ماند."
                : "El universo huye de sí mismo, y algo lo retiene. A cada instante termina, y a cada instante vuelve a nacer. En la distancia entre los dos — en ese abrazo que la ciencia llama oscuro — el mundo sigue vivo."}
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
