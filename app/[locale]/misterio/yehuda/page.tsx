"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: YEHUDÁ — "tzadká mimeni" ──────────────────────────────
// "El rey que se declaró culpable" — Génesis 38 leído con Sotá 10b (el Nombre de
// Dios dentro de Yehudá; mejor el horno que avergonzar en público) y Bereshit
// Rabá 85:11 (haker-na medida por medida). Contenido verificado por el Sofer.
// Bilingüe es/fa. Farsi verificado por el Sofer (rutina i18n).

// ── Componentes (idénticos en estilo a /misterio/linaje y /misterio/betsabe) ──
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

function PullQuote({ he, es, fa, source, locale }: { he: string; es: string; fa: string; source: string; locale: string }) {
  return (
    <Section>
      <div className="my-10 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
        <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
        <p className="mb-1 text-sm italic leading-relaxed text-parchment/80" dir={locale === "fa" ? "rtl" : "ltr"}>
          {locale === "fa" ? `«${fa}»` : `«${es}»`}
        </p>
        <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
      </div>
    </Section>
  );
}

function HebrewTile({ he, sub, color }: { he: string; sub: string; color: string }) {
  return (
    <div
      className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}
    >
      <span
        className="hebrew font-bold leading-none"
        style={{ fontSize: "clamp(56px, 14vw, 78px)", color: "#fff6e0", textShadow: `0 0 22px ${color}, 0 0 8px ${color}` }}
      >
        {he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function YehudaPage() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · Jashmal</Link>
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

        {/* ── HERO ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "پیدایش ۳۸ · تلمود سوتا ۱۰b · سود" : "Génesis 38 · Talmud Sotá 10b · Sod"}
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(44px, 13vw, 92px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            יְהוּדָה
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "پادشاهی که خود را گناهکار خواند" : "El rey que se declaró culpable"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "مردی از رهبری‌اش فرو می‌افتد و ندانسته عروسِ خود را به کامِ آتش می‌سپارد. در واپسین لحظه، با سه شیء در دست که او را رسوا می‌کند، می‌تواند خاموش بماند و بگذارد او بسوزد. اما به‌جای آن دو واژه می‌گوید: «او از من پارساتر است». آن لحظهٔ حقیقتِ عریان، پادشاهیِ ابدی را برایش به ارمغان آورد، نامِ خدا را درونِ نامِ او نهاد، و راهِ پادشاه داود… و ماشیح را گشود."
              : "Un hombre cae de su liderazgo y entrega, sin saberlo, a su propia nuera para que la quemen. En el último instante, con tres objetos en la mano que lo delatan, podría callar y dejarla arder. En cambio dice dos palabras: «ella es más justa que yo». Ese instante de verdad desnuda le ganó la realeza eterna, puso el Nombre de Dios dentro de su nombre, y abrió el cauce del Rey David… y del Mashíaj."}
          </p>
        </div>

        {/* ── La historia ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "داستان" : "La historia"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa ? (
                <>
                  یهودا، چهارمین پسرِ یعقوب، همان کسی بود که برادرانش را قانع کرد تا{" "}
                  <span className="text-gold/90">یوسف را بفروشند</span> به‌جای آنکه او را بکشند (پیدایش
                  ۳۷:۲۶-۲۷). چون سوگِ پدرشان را دیدند، او را سرزنش کردند و «از مقامش فروکشیدند» (راشی بر
                  پیدایش ۳۸:۱). از همین رو فصل با واژه‌ای دقیق آغاز می‌شود:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד יְהוּדָה</span> —
                  «و یهودا از نزدِ برادرانش <span className="text-gold/90">فرود آمد</span>» (پیدایش ۳۸:۱). رهبر
                  می‌افتد: کناره می‌گیرد، با زنی کنعانی ازدواج می‌کند، و دو پسرش، عیر و اونان، را از دست
                  می‌دهد — هر دو شوهرِ زنی به نامِ <span className="text-gold/90">تامار</span> (پیدایش ۳۸:۶-۱۰).
                </>
              ) : (
                <>
                  Yehudá, el cuarto hijo de Yaakov, fue quien convenció a sus hermanos de{" "}
                  <span className="text-gold/90">vender a Yosef</span> en vez de matarlo (Génesis
                  37:26-27). Cuando vieron el duelo de su padre, lo culparon a él y «lo bajaron de
                  su rango» (Rashi a Génesis 38:1). Por eso el capítulo abre con una palabra
                  precisa: <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד יְהוּדָה</span> —
                  «y <span className="text-gold/90">descendió</span> Yehudá de junto a sus hermanos»
                  (Génesis 38:1). El líder cae: se aparta, se casa con una cananea, y pierde a dos
                  hijos, Er y Onán, ambos esposos de una mujer llamada <span className="text-gold/90">Tamar</span>
                  {" "}(Génesis 38:6-10).
                </>
              )}
            </p>
            <p>
              {fa ? (
                <>
                  یهودا پسرِ سومش، شِلا، را به تامار وعده می‌دهد اما او را نمی‌دهد (پیدایش ۳۸:۱۱). تامارِ
                  بیوه و بی‌فرزند خود را با روبندی می‌پوشاند، و یهودا بی‌آنکه او را بشناسد وی را روسپی
                  می‌پندارد؛ همچون گرویِ پرداخت،{" "}
                  <span className="text-gold/90">مُهر، بندِ مُهر و عصایش</span> را نزدِ او می‌گذارد (پیدایش
                  ۳۸:۱۵-۱۸). ماه‌ها بعد به او خبر می‌دهند که تامار باردار شده است، و یهودا — بی‌آنکه بداند
                  خودْ پدر است — حکم می‌کند: «او را بیرون آورید تا سوزانده شود!» (پیدایش ۳۸:۲۴). در همان حال
                  که او را به‌سوی آتش می‌برند، تامار پنهانی آن سه گرو را برایش می‌فرستد:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> — «بشناس، لطفاً:
                  این‌ها از آنِ کیست؟» (پیدایش ۳۸:۲۵). و یهودا می‌شناسد.
                </>
              ) : (
                <>
                  Yehudá le promete a Tamar su tercer hijo, Shelá, pero no se lo da (Génesis
                  38:11). Viuda y sin descendencia, Tamar se cubre con un velo, y Yehudá la toma
                  por una prostituta sin reconocerla; como prenda de pago le deja su{" "}
                  <span className="text-gold/90">sello, su cordón y su bastón</span> (Génesis
                  38:15-18). Meses después le avisan que Tamar quedó embarazada, y Yehudá —sin
                  saber que él es el padre— sentencia: «¡Sáquenla y que sea quemada!» (Génesis
                  38:24). Mientras la llevan al fuego, ella le envía discretamente las tres prendas:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> — «reconoce, por
                  favor: ¿de quién son?» (Génesis 38:25). Y Yehudá reconoce.
                </>
              )}
            </p>
          </div>
        </Section>

        {/* ── tzadká mimeni — el ángulo central ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            צָדְקָה מִמֶּנִּי · {fa ? "دو واژه که داستان را دگرگون می‌کنند" : "Dos palabras que cambian la historia"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa ? (
                <>
                  اینجا قلبِ این راز است. راهِ آسان در دستِ یهوداست: گروها از آنِ اوست، اما هیچ‌کسِ دیگری
                  نمی‌داند. تنها کافی است خاموش بماند. آن زن می‌سوزد، راز با او می‌میرد، و آبروی
                  پدرسالاری‌اش دست‌نخورده می‌ماند.{" "}
                  <span className="text-gold/90">اما به‌جای آن، در ملأِ عام می‌گوید:</span>
                </>
              ) : (
                <>
                  Aquí está el corazón del misterio. Yehudá tiene en la mano la salida fácil: las
                  prendas son suyas, pero nadie más lo sabe. Le bastaría con callar. La mujer arde,
                  el secreto muere con ella, y su honor de patriarca queda intacto.{" "}
                  <span className="text-gold/90">En vez de eso, dice en público:</span>
                </>
              )}
            </p>
          </div>

          {/* Verso central */}
          <div className="my-8 rounded-2xl border border-gold/25 bg-gradient-to-b from-gold/[0.07] to-transparent p-7 text-center">
            <p className="hebrew mb-3 text-2xl leading-relaxed text-gold" dir="rtl"
              style={{ textShadow: dark ? "0 0 14px #c9a43e88" : "none" }}>
              וַיַּכֵּר יְהוּדָה וַיֹּאמֶר צָדְקָה מִמֶּנִּי
            </p>
            <p className="text-sm italic leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              {fa ? (
                <>
                  «و یهودا <span className="text-gold/90">شناخت</span> و گفت:{" "}
                  <span className="text-gold/90">او از من پارساتر است</span>.»
                </>
              ) : (
                <>
                  «Y Yehudá <span className="text-gold/90">reconoció</span> y dijo:{" "}
                  <span className="text-gold/90">ella es más justa que yo</span>.»
                </>
              )}
            </p>
            <p className="mt-1.5 font-cinzel text-[10px] uppercase tracking-widest text-gold/50">
              — {fa ? "پیدایش ۳۸:۲۶" : "Génesis 38:26"}
            </p>
          </div>

          {/* Term box — las dos palabras */}
          <div className="space-y-3">
            <div className="rounded-xl border border-gold/15 bg-white/[0.02] p-4">
              <p className="hebrew text-lg text-gold/90" dir="rtl">וַיַּכֵּר · <span className="text-parchment/70">{fa ? "وَیَکِر" : "vayaker"}</span></p>
              <p className="mt-1 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                {fa ? (
                  <>
                    «شناخت». همان ریشه (נ-כ-ר) که در <span className="hebrew" dir="rtl">הַכֶּר־נָא</span>یی
                    است که تامار می‌فرستد تا او بگوید. فعلی از شناختن… و از اعتراف.
                  </>
                ) : (
                  <>
                    «Reconoció». Misma raíz (נ-כ-ר) que el <span className="hebrew" dir="rtl">הַכֶּר־נָא</span> que
                    Tamar le manda decir. Un verbo de reconocimiento… y de confesión.
                  </>
                )}
              </p>
            </div>
            <div className="rounded-xl border border-gold/15 bg-white/[0.02] p-4">
              <p className="hebrew text-lg text-gold/90" dir="rtl">צָדְקָה מִמֶּנִּי · <span className="text-parchment/70">{fa ? "تسَدکا مِمِنّی" : "tzadká mimeni"}</span></p>
              <p className="mt-1 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                {fa
                  ? "«او از من پارساتر است». پرآوازه‌ترین جملهٔ توبه در تورات: حاملِ آیندهٔ عصای پادشاهی، در برابرِ همه خود را گناهکار می‌خواند."
                  : "«Ella es más justa que yo». La frase de teshuvá más célebre de la Torá: el futuro portador del cetro real se declara culpable delante de todos."}
              </p>
            </div>
          </div>
        </Section>

        {/* ── Pshat ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            פְּשָׁט · {fa ? "بارِ آنچه رخ داد" : "El peso de lo que pasó"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa ? (
                <>
                  حقیقت را شیرین نمی‌کنیم. در معنای ساده، یهودا سه کارِ گران انجام می‌دهد: فروشِ برادرش
                  یوسف را رهبری می‌کند (پیدایش ۳۷:۲۶-۲۷)، یِبوم (ازدواجِ برادرشوهری) را که به تامار وعده داده
                  بود از او دریغ می‌دارد (پیدایش ۳۸:۱۱)، و — بی‌هیچ تحقیقی — عروسش را به مرگ در آتش محکوم
                  می‌کند (پیدایش ۳۸:۲۴). و همه چیز با یک فروافتادن آغاز می‌شود:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד</span> — «فرود آمد». تورات
                  پدرسالارِ خود را آرایش نمی‌کند؛ او را در حالِ افتادن نشان می‌دهد. جاشمال نیز از آن
                  نمی‌گریزد: مطالعه‌ای صادق، بار را <span className="text-gold/90">پیش</span> از جستنِ نور بر
                  دوش می‌کشد.
                </>
              ) : (
                <>
                  No doremos la píldora. En su sentido llano, Yehudá hace tres cosas graves: encabeza
                  la venta de su hermano Yosef (Génesis 37:26-27), le niega a Tamar el levirato que
                  le prometió (Génesis 38:11), y —sin investigar— condena a su nuera a morir quemada
                  (Génesis 38:24). Y todo arranca con una caída:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד</span> —«descendió»—. La Torá
                  no maquilla a su propio patriarca; lo muestra cayendo. Jashmal tampoco lo esquiva:
                  un estudio honesto sostiene el peso <span className="text-gold/90">antes</span> de
                  buscar la luz.
                </>
              )}
            </p>
            <p>
              {fa ? (
                <>
                  آنچه اکنون می‌آید سختیِ روایت را <span className="text-gold/90">باطل نمی‌کند</span>. آن را
                  برمی‌کشد. زیرا همان مردی که می‌افتد، تنها کسی است که در لحظهٔ سرنوشت‌ساز، حقیقت را بر
                  آبروی خود برمی‌گزیند.
                </>
              ) : (
                <>
                  Lo que viene ahora <span className="text-gold/90">no anula</span> la dureza del
                  relato. La eleva. Porque el mismo hombre que cae es el único que, en el instante
                  decisivo, elige la verdad por encima de su honor.
                </>
              )}
            </p>
          </div>
        </Section>

        {/* ── La luz escondida ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "نورِ پنهان" : "La luz escondida"}
          </h3>

          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              {fa ? "یادداشتِ صداقت" : "Nota de honestidad"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir={fa ? "rtl" : "ltr"}>
              {fa ? (
                <>
                  آنچه در پی می‌آید خوانشِ تلمود و میدراش است، و چنین نشان‌دار شده. پشاط بار را به ما داد.
                  حکیمان (چَزَ"ل) افتادنِ یهودا را پاک نمی‌کنند: آن را همچون صحنهٔ رستگاری‌اش می‌خوانند.
                  بزرگی در نیفتادن نیست، بلکه در کاری است که آدمی می‌کند آنگاه که می‌تواند افتادنش را{" "}
                  <span className="text-gold/85">پنهان</span> کند.
                </>
              ) : (
                <>
                  Lo que sigue es lectura del Talmud y el Midrash, marcada como tal. El Pshat ya nos
                  dio el peso. Chazal no borra la caída de Yehudá: la lee como el escenario de su
                  redención. La grandeza no está en no caer, sino en lo que hace cuando podría{" "}
                  <span className="text-gold/85">esconder</span> la caída.
                </>
              )}
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa ? (
                <>
                  تلمود، از رفتارِ تامار، اصلی هولناک و زیبا می‌آموزد:{" "}
                  <span className="text-gold/90">«آدمی را بهتر آن است که خود را در کورهٔ آتش افکند تا
                  آنکه همسایه‌اش را در ملأِ عام شرمنده سازد»</span> (سوتا ۱۰b، به نامِ ربی شیمعون بَر
                  یوחای). تامار رفتن به آتش را بر فریادِ «این کارِ یهودا بود!» ترجیح داد؛ تنها گروها را برایش
                  فرستاد و تصمیم را به خودِ او واگذاشت. و یهودا شایستهٔ این هدیه بود: اعتراف کرد.
                </>
              ) : (
                <>
                  El Talmud enseña, a partir de la conducta de Tamar, un principio terrible y hermoso:{" "}
                  <span className="text-gold/90">«más le vale a una persona arrojarse a un horno de
                  fuego que avergonzar a su prójimo en público»</span> (Sotá 10b, en nombre de Rabí
                  Shimón bar Yojái). Tamar prefirió ir al fuego antes que gritar «¡fue Yehudá!»; solo
                  le mandó las prendas, dejándole a él la decisión. Y Yehudá estuvo a la altura del
                  regalo: confesó.
                </>
              )}
            </p>
            <p>
              {fa ? (
                <>
                  تلمود می‌گوید که یهودا با آن اعترافِ آشکار دو چیز به دست آورد. نخست، لطفی «اندازه به
                  اندازه»: «چون تامار و دو پسرش را از آتش رهانید، قدّوسِ متبارک سه تن از نوادگانش را از آتش
                  خواهد رهانید» — حَنَنیا، میشائیل و عَزَریا در کورهٔ نِبوکَدنِصَّر (سوتا ۱۰b؛ دانیال ۳). دوم،
                  و ژرف‌تر: چون نامِ آسمان را در ملأِ عام تقدیس کرد، شایسته شد که{" "}
                  <span className="text-gold/90">تمامِ نامش به نامِ قدّوس خوانده شود</span>. چهار حرفِ
                  نامِ چهارحرفی (<span className="hebrew" dir="rtl">י־ה־ו־ה</span>) درونِ{" "}
                  <span className="hebrew text-gold/90" dir="rtl">יהודה</span> جای دارند، تنها با یک دالِتِ
                  افزوده.
                </>
              ) : (
                <>
                  Por esa confesión pública, dice el Talmud, Yehudá ganó dos cosas. Primero, una
                  medida-por-medida de gracia: «porque salvó a Tamar y a sus dos hijos del fuego, el
                  Santo salvará del fuego a tres de sus descendientes» —Jananiá, Mishael y Azariá en
                  el horno de Nabucodonosor (Sotá 10b; Daniel 3). Segundo, y más profundo: por
                  santificar el Nombre del Cielo en público, mereció que{" "}
                  <span className="text-gold/90">todo su nombre se llame por el Nombre del Santo</span>.
                  Las cuatro letras del Tetragrámaton (<span className="hebrew" dir="rtl">י־ה־ו־ה</span>)
                  viven dentro de <span className="hebrew text-gold/90" dir="rtl">יהודה</span>, con una
                  sola dálet añadida.
                </>
              )}
            </p>
          </div>
        </Section>

        <PullQuote
          he="יְהוּדָה שֶׁקִּדֵּשׁ שֵׁם שָׁמַיִם בַּפַּרְהֶסְיָא, זָכָה שֶׁנִּקְרָא כֻּלּוֹ עַל שְׁמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא"
          es="Yehudá, que santificó el Nombre del Cielo en público, mereció que todo su nombre se llame por el Nombre del Santo, bendito sea."
          fa="یهودا که نامِ آسمان را در ملأِ عام تقدیس کرد، شایسته شد که تمامِ نامش به نامِ قدّوسِ متبارک خوانده شود."
          source="Talmud, Sotá 10b"
          locale={locale}
        />

        {/* ── El espejo del haker-na ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            הַכֶּר־נָא · {fa ? "آینهٔ اعتراف" : "El espejo de la confesión"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa ? (
                <>
                  میدراش به چیزی لرزاننده اشاره می‌کند. آنگاه که یهودا و برادرانش پدرشان یعقوب را فریب
                  دادند، جامهٔ خون‌آلودِ یوسف را به او نشان دادند و گفتند:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> — «<span className="text-gold/90">بشناس،
                  لطفاً</span>: آیا این جامهٔ پسرِ توست؟» — (پیدایش ۳۷:۳۲). سال‌ها بعد، تامار دقیقاً همان دو
                  واژه را برای یهودا می‌فرستد:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> (پیدایش ۳۸:۲۵). قدّوس
                  آن را اندازه‌وار بازمی‌گرداند: «تو گفتی هَکِر-نا؛ به جانِ تو، به تو خواهند گفت هَکِر-نا»
                  (بِرِشیت رَבّا ۸۵:۱۱).
                </>
              ) : (
                <>
                  El Midrash nota algo escalofriante. Cuando Yehudá y sus hermanos engañaron a su
                  padre Yaakov, le mostraron la túnica de Yosef ensangrentada y le dijeron:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> —«<span className="text-gold/90">reconoce,
                  por favor</span>: ¿es esta la túnica de tu hijo?»— (Génesis 37:32). Años después,
                  Tamar le manda a Yehudá exactamente las mismas dos palabras:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> (Génesis 38:25). El
                  Santo se lo devuelve medido: «tú dijiste haker-na; por tu vida, te dirán haker-na»
                  (Bereshit Rabá 85:11).
                </>
              )}
            </p>
            <p className="text-parchment/70">
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
                {fa ? "خوانشِ جاشمال (دِراش):" : "Lectura de Jashmal (drash):"}
              </span>{" "}
              {fa ? (
                <>
                  اما این آینه تنها کیفر نیست: <span className="text-gold/85">دعوتی به ترمیم</span> است. بارِ
                  نخست، «شناختن» سلاحِ فریب بود. بارِ دوم، یهودا همان واژه را برمی‌گیرد و آن را به اعتراف بدل
                  می‌کند. فعلی که پدرش را زخمی کرد، فعلی می‌شود که او را رستگار می‌کند.{" "}
                  <span className="italic">(جمع‌بندیِ خطابیِ ماست، بر پایهٔ تأییدشدهٔ بِرِشیت رَבّا ۸۵:۱۱ —
                  نقلِ عینی نیست.)</span>
                </>
              ) : (
                <>
                  pero el espejo no es solo castigo: es <span className="text-gold/85">invitación a
                  reparar</span>. La primera vez, «reconocer» fue el arma del engaño. La segunda,
                  Yehudá toma esa misma palabra y la convierte en confesión. El verbo que hirió a su
                  padre se vuelve el verbo que lo redime.{" "}
                  <span className="italic">(Síntesis homilética nuestra, sobre la base verificada de
                  Bereshit Rabá 85:11 — no es cita literal.)</span>
                </>
              )}
            </p>
          </div>
        </Section>

        <PullQuote
          he="אַתָּה אָמַרְתָּ לְאָבִיךָ הַכֶּר נָא... חַיֶּיךָ שֶׁתָּמָר אוֹמֶרֶת לְךָ הַכֶּר נָא"
          es="Tú le dijiste a tu padre «reconoce, por favor»… por tu vida, que Tamar te dirá a ti «reconoce, por favor»."
          fa="تو به پدرت گفتی «بشناس، لطفاً»… به جانِ تو، تامار به تو خواهد گفت «بشناس، لطفاً»."
          source="Midrash, Bereshit Rabá 85:11"
          locale={locale}
        />

        {/* ── Sod ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · {fa ? "نزولی که خودِ راه بود" : "El descenso que era el camino"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa ? (
                <>
                  اینجا همان چرخشی است که سراسرِ این مجموعه را تعریف می‌کند. کابالا قانونی از جهان را
                  می‌خواند: بلندترین نور به پست‌ترین جا می‌افتد و چشم‌به‌راهِ رهایی می‌ماند. این‌ها{" "}
                  <span className="text-gold/90">نیتسوتسوت</span>‌اند، جرقه‌های مقدسی که درونِ{" "}
                  <span className="italic">کلیپوت</span> (پوسته‌ها) به دام افتاده‌اند. عصای اسرائیل از
                  آسمانِ پاک فرود نمی‌آید: از پایین <span className="text-gold/90">رهانیده</span> می‌شود. و
                  زندگیِ یهودا این را با یک واژه ترسیم می‌کند: فصل با{" "}
                  <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד</span> آغاز می‌شود — «از بزرگی‌اش
                  فرود آمد» (راشی بر پیدایش ۳۸:۱) — و با صعودش به پادشاهیِ ابدی بسته می‌شود.{" "}
                  <span className="hebrew text-gold/90" dir="rtl">יְרִידָה צוֹרֶךְ עֲלִיָּה</span> —
                  <span className="text-gold/90"> یریدا تسوره‌خ علیا</span>، نزول برای صعود است — (بعل شم
                  טوב). افتادن، تصادف نبود: روش بود.
                </>
              ) : (
                <>
                  Aquí el vuelco que define a toda esta serie. La Cabalá lee una ley del mundo: la luz
                  más alta cae al lugar más bajo y espera ser rescatada. Son las{" "}
                  <span className="text-gold/90">nitzotzot</span>, las chispas santas atrapadas dentro
                  de las <span className="italic">klipot</span>. El cetro de Israel no baja del cielo
                  limpio: se <span className="text-gold/90">rescata</span> desde abajo. Y la vida de
                  Yehudá lo dibuja con una palabra: el capítulo abre con{" "}
                  <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד</span> —«descendió» de su
                  grandeza (Rashi a Génesis 38:1)— y se cierra con su ascenso a la realeza eterna.{" "}
                  <span className="hebrew text-gold/90" dir="rtl">יְרִידָה צוֹרֶךְ עֲלִיָּה</span> —
                  <span className="text-gold/90">yeridá tzórej aliyá</span>, el descenso es para el
                  ascenso— (Baal Shem Tov). La caída no fue el accidente: fue el método.
                </>
              )}
            </p>
            <p>
              {fa ? (
                <>
                  و این رسوایی‌ای جدا‌افتاده نیست: خطِ ماشیح از{" "}
                  <span className="text-gold/90">دو افتادنِ عمدی در همان صفحهٔ تلمود</span> می‌گذرد —
                  افتادنِ دخترانِ لوط (← موآب ← روت) و افتادنِ یهودا با تامار (← پِرِص) — هر دو در نازیر ۲۳b
                  زیرِ <span className="hebrew" dir="rtl">גְּדוֹלָה עֲבֵרָה לִשְׁמָהּ</span>. اما یهودا چیزی
                  یگانه می‌افزاید: نامش به <span className="text-gold/90">نامِ خدا</span> بدل می‌شود.{" "}
                  <span className="hebrew" dir="rtl">יהוה</span> + <span className="hebrew" dir="rtl">ד</span> = <span className="hebrew text-gold/90" dir="rtl">יהודה</span>.
                  دالِت — حرفِ <span className="italic">دَلوت</span>، تهیدستی، فروتنیِ آن‌که هیچ از خود
                  ندارد — درست همان است که پادشاه آنگاه که سر فرود می‌آورد و اعتراف می‌کند به نام می‌افزاید.
                </>
              ) : (
                <>
                  Y no es un escándalo aislado: la línea del Mashíaj atraviesa{" "}
                  <span className="text-gold/90">dos caídas a propósito en la misma página del Talmud</span>
                  {" "}—la de las hijas de Lot (→ Moab → Rut) y la de Yehudá con Tamar (→ Péretz)—,
                  ambas en Nazir 23b bajo <span className="hebrew" dir="rtl">גְּדוֹלָה עֲבֵרָה לִשְׁמָהּ</span>.
                  Pero Yehudá añade algo único: su nombre se vuelve el <span className="text-gold/90">Nombre
                  de Dios</span>. <span className="hebrew" dir="rtl">יהוה</span> + <span className="hebrew" dir="rtl">ד</span> = <span className="hebrew text-gold/90" dir="rtl">יהודה</span>.
                  La dálet —letra de la <span className="italic">dalut</span>, la pobreza, la humildad
                  del que no tiene nada propio— es justo lo que el rey añade al Nombre cuando se
                  inclina y confiesa.
                </>
              )}
            </p>
            <p className="font-cinzel text-base text-gold/90">
              {fa
                ? "یهودا ← پِرِص ← بوعَز ← عوبد ← یسی ← داود ← ماشیح."
                : "Yehudá → Péretz → Boaz → Oved → Yishai → David → el Mashíaj."}
            </p>
            <p>
              {fa ? (
                <>
                  ماشیح بِن داود، ماشیحِ <span className="text-gold/90">خاندانِ یهودا</span> است: تبارِ
                  رهاننده، در خطی مستقیم، از مردی می‌گذرد که خود را گناهکار خواند (پیدایش ۳۸:۲۹؛ روت
                  ۴:۱۸-۲۲).
                </>
              ) : (
                <>
                  El Mashíaj ben David es Mashíaj de la <span className="text-gold/90">casa de Yehudá</span>:
                  el linaje del Redentor pasa, en línea recta, por el hombre que se declaró culpable
                  (Génesis 38:29; Rut 4:18-22).
                </>
              )}
            </p>
          </div>

          {/* Sello de la serie: נחש = 358 = משיח */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="נָחָשׁ" sub={fa ? "مار · ۳۵۸" : "Serpiente · 358"} color="#b06a3c" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="מָשִׁיחַ" sub={fa ? "ماشیح · ۳۵۸" : "Mashíaj · 358"} color="#c9a43e" />
          </div>
          <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "همان نیرویی که گویی آدمی را به پایین می‌کشد — افتادن، شرم، نزول — چون با اعترافی برکشیده شود، همان نیرویی است که تاج می‌نهد. از افتادنِ یک رهبر، عصایی جوشید که هرگز کنار نمی‌رود."
              : "La misma fuerza que parece arrastrar al hombre hacia abajo —la caída, la vergüenza, el descenso—, elevada por una confesión, es la fuerza que corona. De la caída de un líder brotó el cetro que no se aparta jamás."}
          </p>
        </Section>

        {/* ── PaRDeS ── */}
        <Section>
          <h3 className="mb-6 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            פרד״ס · {fa ? "چهار خوانش" : "Las cuatro lecturas"}
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "Pshat", nameFa: "پشاط",
                txt: "Yehudá desciende de su liderazgo, se aparta de sus hermanos, y sin reconocerla concibe de su nuera Tamar. Al ir ella al fuego, él confiesa: «ella es más justa que yo» (Génesis 38:1, 26).",
                txtFa: "یهودا از رهبری‌اش فرود می‌آید، از برادرانش کناره می‌گیرد، و بی‌آنکه او را بشناسد از عروسش تامار باردارش می‌کند. چون او را به‌سوی آتش می‌برند، اعتراف می‌کند: «او از من پارساتر است» (پیدایش ۳۸:۱، ۲۶).",
              },
              {
                he: "רֶמֶז", name: "Remez", nameFa: "رِمِز",
                txt: "El nombre lo insinúa todo: Leá lo llamó Yehudá al «agradecer» (odé, Berajot 7b), y él se salva al «reconocer/confesar» (vayaker). El mismo nombre significa agradecer y confesar la culpa.",
                txtFa: "نام همه‌چیز را اشاره می‌کند: لِئا او را هنگامِ «سپاس» (اودِه، بِراخوت ۷b) یهودا نامید، و او با «شناختن/اعتراف» (وَیَکِر) رهایی می‌یابد. یک نام، هم به‌معنای سپاس‌گزاری است و هم اعتراف به گناه.",
              },
              {
                he: "דְּרָשׁ", name: "Drash", nameFa: "دِراش",
                txt: "«Más vale arrojarse al horno que avergonzar a otro en público» (Sotá 10b): Tamar le dejó la salida, y Yehudá la tomó. Medida por medida del haker-na que usó con su padre (Bereshit Rabá 85:11), redimido al volver «haker-na» una confesión.",
                txtFa: "«افکندنِ خود به کوره بهتر از شرمنده‌کردنِ دیگری در ملأِ عام است» (سوتا ۱۰b): تامار راهِ گریز را برایش گذاشت، و یهودا آن را برگرفت. اندازه به اندازهٔ همان هَکِر-نا که با پدرش به کار برد (بِرِشیت رَבّا ۸۵:۱۱)، و با بدل‌کردنِ «هَکِر-نا» به اعتراف رستگار شد.",
              },
              {
                he: "סוֹד", name: "Sod", nameFa: "سود",
                txt: "Las nitzotzot caídas en la klipá: la realeza se rescata desde abajo. יהוה+ד = יהודה: la dálet de la humildad insertada en el Nombre por quien se inclina. Yeridá tzórej aliyá — el «descendió» del inicio es el método con que el cetro mesiánico se planta en la tierra.",
                txtFa: "نیتسوتسوتِ افتاده در کلیپا: پادشاهی از پایین رهانیده می‌شود. יהוה+ד = יהודה: دالِتِ فروتنی که کسی با سرفرودآوردن در نام جای می‌دهد. یریدا تسوره‌خ علیا — «فرود آمد»ِ آغاز، همان روشی است که عصای مسیحایی با آن در زمین کاشته می‌شود.",
              },
            ].map((r) => (
              <div key={r.name} className="flex items-start gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <span className="hebrew shrink-0 text-2xl font-bold text-gold/80" dir="rtl"
                  style={{ textShadow: "0 0 12px #c9a43e66" }}>
                  {r.he}
                </span>
                <div className="flex-1">
                  <p className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold/70">
                    {fa ? r.nameFa : r.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>{fa ? r.txtFa : r.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Síntesis ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              יְרִידָה צוֹרֶךְ עֲלִיָּה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "پادشاهی که خود را گناهکار خواند" : "El rey que se declaró culpable"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "مردی که از بزرگی‌اش افتاد، عروسِ خود را به خطا محکوم کرد، و می‌توانست با خاموشی نجات یابد. اما به‌جای آن دو واژهٔ عریان را برگزید — «او از من پارساتر است» — و با آن‌ها در ملأِ عام فروشکست تا جانی را برهاند. آسمان پاسخش را داد: نامِ خویش را درونِ نامِ او نهاد و او را ریشهٔ تختی ساخت که کنار نمی‌رود. افتادن… همان راه بود. اعتراف… همان تاج."
                : "Un hombre que cayó de su grandeza, condenó por error a su propia nuera, y pudo salvarse callando. En vez de eso eligió dos palabras desnudas —«ella es más justa que yo»— y con ellas se hundió en público para salvar una vida. El Cielo le respondió poniendo Su propio Nombre dentro del suyo y haciéndolo raíz del trono que no se aparta. La caída… era el camino. La confesión… era la corona."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "یهودا و تامار · پیدایش ۳۸" : "Yehudá y Tamar · Génesis 38", ref: "Genesis 38" },
                { label: fa ? "«تسَدکا مِمِنّی» · پیدایش ۳۸:۲۶" : "«Tzadká mimeni» · Génesis 38:26", ref: "Genesis 38:26" },
                { label: fa ? "نام در یهودا · سوتا ۱۰b" : "El Nombre en Yehudá · Sotá 10b", ref: "Sotah 10b" },
                { label: fa ? "«این‌بار سپاس می‌گویم» · بِراخوت ۷b" : "«Esta vez agradeceré» · Berajot 7b", ref: "Berakhot 7b" },
                { label: fa ? "عصای یهودا · پیدایش ۴۹:۱۰" : "El cetro de Yehudá · Génesis 49:10", ref: "Genesis 49:10" },
                { label: fa ? "پِرِص ← داود · روت ۴" : "Péretz → David · Rut 4", ref: "Ruth 4" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 38")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ این راز در جاشمال ←" : "Estudiar este misterio en Jashmal →"}
            </button>

            {/* Hemshej — umbral «Sigue el hilo» */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/tamar" className="hover:text-gold">{fa ? "تامار: روبندی که ماشیح را پنهان داشت ←" : "Tamar: el velo que escondía al Mesías →"}</Link>
              <Link href="/misterio/lot" className="hover:text-gold">{fa ? "لوط: دو دخترِ بی‌نام ←" : "Lot: las dos hijas sin nombre →"}</Link>
              <Link href="/misterio/linaje" className="hover:text-gold">{fa ? "تبارِ ممنوعِ ماشیح ←" : "El linaje prohibido del Mashíaj →"}</Link>
            </div>
          </div>
        </Section>

        {/* Footer */}
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
