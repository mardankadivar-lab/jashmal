"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: DE ROPAS DE LUZ A PIEL DE SERPIENTE ───────────────────
// "La caída necesaria para el Tikún" — Génesis 3:21 (כָּתְנוֹת עוֹר / אוֹר) leído
// con Bereshit Rabbá 20:12 (la Torá de R. Meir), Bereshit Rabbá 9:7 (el yétzer
// hará "muy bueno"), Likkutei Torah Shir HaShirim 4:2 (yeridá tzórej aliyá),
// la Ruptura de los Recipientes (Sefer Etz Chaim 9:1) y el birur de las chispas
// (Tanya, Likutei Amarim 37). Contenido verificado por el Sofer (editor-erudito).
// Idioma principal: español (el video de TikTok es en español).
//
// GUARDARRAÍLES DE HONESTIDAD (del Sofer — respetados en el render):
//  · El gancho "Adán y Eva nunca pecaron" es PUERTA, no tesis. El estudio aterriza
//    en "sí hubo falta — pero la falta tenía un lugar en el plan". Nunca se presenta
//    "no pecaron" como conclusión.
//  · La lectura de Izhbitz (Mei HaShiloach) va SIEMPRE etiquetada como minoritaria
//    y controvertida; NO como halajá ni visión normativa.
//  · La variante "kotnot OR (luz)" es de la Torá personal de R. Meir (drash); el
//    texto masorético normativo dice עוֹר (piel).
//  · Cita "Tikunei Zohar 122b:5" (formato Sefaria), NO "Tikun 57".
// TODO(fa): el farsi de esta página está pendiente de traducción verificada.

// ── Las cuatro lecturas de la palabra עוֹר / אוֹר ─────────────────────────────
interface Lectura {
  he: string;
  name: string;
  sentido: string;
  color: string;
}

const LECTURAS: Lectura[] = [
  {
    he: "אוֹר",
    name: "Luz · 207 · con álef",
    sentido:
      "La «ropa de luz»: el cuerpo translúcido de Adam HaRishón antes de la falta, conservado en la Torá personal de Rabí Meir (Bereshit Rabbá 20:12). No es el texto normativo, sino la memoria de lo que se perdió.",
    color: "#f0d060",
  },
  {
    he: "עוֹר",
    name: "Piel · 276 · con áyin",
    sentido:
      "La «ropa de piel»: el cuerpo denso, mortal, opaco que el alma viste tras la caída (Génesis 3:21, texto masorético). La luz no se apagó — se vistió. Está debajo, esperando volverse transparente.",
    color: "#cf8c52",
  },
];

// ── Página en FARSI (رندر شده وقتی locale === "fa") ──────────────────────────
function RopasDeLuzFarsi() {
  const dark = true;
  const bg = "#05050a";
  const navBg = "rgba(5,5,10,0.9)";
  const router = useRouter();

  function Sec({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

  function PQ({ he, fa, source }: { he: string; fa: string; source: string }) {
    return (
      <Sec>
        <div className="my-10 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
          <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
          <p className="mb-1 text-sm italic leading-relaxed text-parchment/80" dir="rtl">«{fa}»</p>
          <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
        </div>
      </Sec>
    );
  }

  return (
    <div className="always-dark min-h-screen" style={{ background: bg, fontFamily: "Vazirmatn, sans-serif" }} dir="rtl">

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · خَشمَل</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 text-xs text-gold transition-all hover:border-gold hover:bg-gold/10">
              شروع مطالعه ←
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── هیرو / Hero ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            پیدایش ۳:۲۱ · میدراش · سود
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(40px, 12vw, 84px)", color: "#fdf4dd",
              textShadow: "0 0 24px #c9a43e88" }}>
            כָּתְנוֹת עוֹר
          </h1>
          <h2 className="text-xl font-bold text-parchment/90 sm:text-2xl">
            لباس‌های نور یا لباس‌های پوست
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold/55">
            فرودی که برای صعود بود
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
            تنها یک حرف میان «جامه‌های نور» (אוֹר) و «جامه‌های پوست» (עוֹר) فاصله است.
            سقوط، نور را با پوست پوشاند — اما آن را خاموش نکرد. کار انسان
            این است که پوست مار را دوباره به جامه‌ی نور تبدیل کند.
          </p>
        </div>

        {/* ── صادقانه ── */}
        <Sec>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/55">
              پیش از آغاز — یادداشت صادقانه
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir="rtl">
              «آیا می‌دانستی که آدم و حوا هرگز گناه نکردند؟» این جمله یک{" "}
              <span className="text-gold/85">در</span> است، نه نتیجه. حقیقت صادقانه‌ی این مطالعه
              چیزی عمیق‌تر است:{" "}
              <span className="text-gold/90">بله، یک خطا واقعی اتفاق افتاد — اما همان خطا جایگاهی در نقشه داشت.</span>{" "}
              سنت اکثریت از یک گناه سخن می‌گوید. آنچه ما نشان می‌دهیم این است که حتی آن گناه
              نیز در چیزی بزرگ‌تر جذب شد.
            </p>
          </div>
        </Sec>

        {/* ── תַּרְגּוּם ── */}
        <Sec>
          <h3 className="mb-2 text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · ترجمه و دو قرائت
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              پس از سقوط، تورا می‌گوید که خداوند برای آدم و همسرش{" "}
              <span className="hebrew text-gold/90" dir="rtl">כָּתְנוֹת עוֹר</span>{" "}
              —«کُتنوت عور»، جامه‌های پوست— ساخت و آن‌ها را پوشاند (پیدایش ۳:۲۱).
              متن مَسورِتی این کلمه را با{" "}
              <span className="text-gold/90">عَیِن (ע)</span> می‌نویسد: עוֹר = <span className="italic">پوست، چرم</span>.
            </p>
            <p>
              اما یک قرائت دوم در منبعی کلاسیک محفوظ مانده که همین کلمه با{" "}
              <span className="text-gold/90">آلِف (א)</span> نوشته می‌شود:{" "}
              <span className="hebrew text-gold/90" dir="rtl">אוֹר</span> = <span className="italic">نور</span>.
              <span className="hebrew text-gold/90" dir="rtl"> כָּתְנוֹת אוֹר</span> = جامه‌های نور.
              تنها یک حرف میان پوست و نور فاصله است. این محور کل راز است.
            </p>
          </div>
        </Sec>

        {/* ── دو جامه ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-center text-sm uppercase tracking-[0.3em] text-gold/60">
            دو جامه
          </h3>
          <div className="mb-8 flex flex-wrap justify-center gap-6">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#f0d06099", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #f0d06033" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(56px,14vw,78px)", color: "#fff6e0", textShadow: "0 0 22px #f0d060, 0 0 8px #f0d060" }}>אוֹר</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#f0d060" }}>نور · ۲۰۷ · آلِف</span>
            </div>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#cf8c5299", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #cf8c5233" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(56px,14vw,78px)", color: "#fff6e0", textShadow: "0 0 22px #cf8c52, 0 0 8px #cf8c52" }}>עוֹר</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#cf8c52" }}>پوست · ۲۷۶ · عَیِن</span>
            </div>
          </div>
        </Sec>

        {/* ── מְפָרְשִׁים ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            מְפָרְשִׁים · تورات ربی مئیر
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              منشأ بازی کلامی،{" "}
              <span className="text-gold/90">برِشیت رَبّا ۲۰:۱۲</span> است. میدراش می‌گوید که در تورات
              شخصی ربی مئیر — تنای قرن دوم — یافتند که نوشته شده{" "}
              <span className="hebrew text-gold/90" dir="rtl">כָּתְנוֹת אוֹר</span> — جامه‌های نور، با آلف — نه با عین.
              می‌افزاید که آن جامه‌های آدم ریشونی «هموار چون ناخن و زیبا چون مروارید» بودند.
            </p>
            <p className="text-parchment/70">
              <span className="text-[11px] uppercase tracking-widest text-gold/50">صداقت متنی:</span>{" "}
              متن مَسورِتی که در تمام کنیسه‌ها حاکم است، עוֹר (پوست) می‌گوید. قرائت אוֹר (نور)
              نسخه‌ی رسمی تورا نیست — بلکه متغیری است که سنت آن را گرامی داشته
              چون <span className="italic">اشاره می‌کند</span> به آنچه از دست رفت. این{" "}
              <span className="text-gold/85">دِراش</span> است، نه پَشاط.
            </p>
          </div>
        </Sec>

        <PQ
          he="בְּתוֹרָתוֹ שֶׁל רַבִּי מֵאִיר מָצְאוּ כָּתוּב כָּתְנוֹת אוֹר"
          fa="در تورات ربی مئیر یافتند که «کُتنوت اور» (جامه‌های نور) نوشته شده."
          source="میدراش، برِشیت رَبّا ۲۰:۱۲"
        />

        {/* ── רֶמֶז ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            רֶמֶז · اشاره‌ی حروف
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              تنها تفاوت میان نور و پوست، جایگزینی{" "}
              <span className="text-gold/90">آلِف (א = ۱)</span> با{" "}
              <span className="text-gold/90">عَیِن (ע = ۷۰)</span> است. آلِف، وحدت است، نَفَس خاموش،
              ریشه‌ی نور پنهان. عَیِن به معنای واقعی کلمه <span className="text-gold/90">«چشم»</span>
              است: ادراکی که سطوح را می‌بیند، «خوب و بد» را می‌نگرد، آگاه می‌شود که برهنه است.
            </p>
            <p>
              خوردن از درخت معرفت نیک و بد، به زبان رِمِز،{" "}
              <span className="hebrew text-gold/90">א</span> نور را با{" "}
              <span className="hebrew text-gold/90">ע</span> چشمِ قضاوت‌گر عوض کردن بود.
              سقوط لحظه‌ای است که انسان از <span className="italic">بودن</span> نور دست کشید
              و شروع کرد به <span className="italic">نگریستن</span> جهان.
            </p>
          </div>
        </Sec>

        {/* ── דְּרָשׁ ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            דְּרָשׁ · فرود جایگاه دارد
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              هِمیلیِتیک به ایده‌ای ناراحت‌کننده جرئت می‌کند:{" "}
              <span className="text-gold/90">تاریکی عملکردی دارد</span>. درباره‌ی آیه «و اینک بسیار خوب بود»
              (<span className="italic">طوو مِئود</span>، پیدایش ۱:۳۱)، میدراش برِشیت رَبّا ۹:۷ می‌گوید
              «بسیار خوب» همان <span className="text-gold/90">یِتسِر هَرَع</span> — تمایل به بدی — است،
              زیرا بدون آن نیرو «انسان خانه نمی‌سازد، ازدواج نمی‌کند، فرزند نمی‌آورد، تجارت نمی‌کند».
            </p>
            <p>
              نه به این خاطر که شر خوب است، بلکه چون{" "}
              <span className="text-gold/90">بدون نیروی فرود، میل، اصطکاک — ساخت، جهان و کار انسان وجود ندارد</span>.
              بَعل شِم طوو: هر پایینی یک بالایی پنهان در خود دارد.
            </p>
          </div>
        </Sec>

        {/* ── סוֹד ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · فرود برای صعود است
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              سطح عرفانی نامی فنی دارد:{" "}
              <span className="hebrew text-gold/90" dir="rtl">יְרִידָה צוֹרֶךְ עֲלִיָּה</span>{" "}
              — «یِریدا تسوِرِخ عَلیا»، «فرود برای صعود است» — . این جمله‌ای سرگردان نیست:
              در لیکوتی تورا، شیر هَشیریم ۴:۲ (از آلتِر رَبّی چابَد) نوشته شده.
            </p>
            <p>
              روح از تخت نورانی به جسمی از پوست فرود می‌آید{" "}
              <span className="text-gold/90">تا بالاتر از جایی که پیش از فرود بود برسد</span>.
              شمعی که در اتاق روشن افروخته می‌شود تقریباً دیده نمی‌شود؛ همان شمع در تاریکی کامل
              همه چیز است. روح دقیقاً به این دلیل به تاریکی فرود می‌آید
              که تنها از آنجاست که می‌تواند نوری بیفروزد که بالا ناممکن بود.
            </p>
          </div>
        </Sec>

        <PQ
          he="וזהו ירידה צורך עליה ע״י תשובה לעלות לעלוי זה... דייקא בגלות וירידה בגוף גשמי"
          fa="و این است: «فرود برای صعود است»، از طریق تِشووا، برای رسیدن به این رفعت… دقیقاً در تبعید و در فرود به جسم مادی."
          source="لیکوتی تورا، شیر هَشیریم ۴:۲"
        />

        {/* ── פרד״ס ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            פרד״ס · چهار قرائت
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "پَشاط",
                txt: "پیدایش ۳ یک تخلف واقعی را روایت می‌کند: خدا میوه را نهی می‌کند (پیدایش ۲:۱۷)، زن و مرد می‌خورند (پیدایش ۳:۶)، و پیامد هست: اخراج، مرگ، کار، و جامه‌های پوست به عنوان نشانه‌ی شرایط جدید. در پشاط گناه بود.",
              },
              {
                he: "רֶמֶז", name: "رِمِز",
                txt: "تنها یک حرف: אוֹר (نور، ۲۰۷، با آلف) در برابر עוֹר (پوست، ۲۷۶، با عین). جایگزین کردن آلفِ نور با عینِ «چشم» که ظاهرها را قضاوت می‌کند، یعنی دیگر نبودن نور بلکه دیدن جهان.",
              },
              {
                he: "דְּרָשׁ", name: "دِراش",
                txt: "تاریکی عملکردی دارد: یِتسِر هَرَع «بسیار خوب» است (برِشیت رَبّا ۹:۷)، چون بدون نیروی فرود انسان هیچ نمی‌سازد. بَعل شِم طوو: هر پایینی یک بالایی پنهان دارد.",
              },
              {
                he: "סוֹד", name: "سود",
                txt: "یِریدا تسوِرِخ عَلیا: فرود برای صعود است (لیکوتی تورا، شیر هَشیریم ۴:۲). روح به جسم پوست فرود می‌آید تا نوری بیفروزد که بالا ناممکن بود — بازتاب، در مقیاس کوچک، از شکستن ظرف‌ها و جمع‌آوری جرقه‌ها.",
              },
            ].map((r) => (
              <div key={r.name} className="flex items-start gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="hebrew shrink-0 text-2xl font-bold text-gold/80" dir="rtl"
                  style={{ textShadow: "0 0 12px #c9a43e66" }}>
                  {r.he}
                </span>
                <div className="flex-1 text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold/70">{r.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85" dir="rtl">{r.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ── הִתְבּוֹנְנוּת ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            הִתְבּוֹנְנוּת · تأمل
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              در یک تصویر مکث کن: روح زمانی <span className="text-gold/90">جامه‌ی نور</span> داشت
              و اکنون <span className="text-gold/90">جامه‌ی پوست</span> می‌پوشد. همان روح.
              نور از میان نرفت — پوشیده شد. زیر آن است، منتظر.
            </p>
            <p>
              چند بار سقوط‌های خودم — خطاها، فرودهایم — را فقط به عنوان{" "}
              <span className="italic">پوست</span> خوانده‌ام: شرم، شکست، مجازات؟
              اگر زیر آن پوست نوری منتظر بود که تنها از آن پایین می‌توانست افروخته شود؟
              میدراش می‌گوید نیروی تاریک «بسیار خوب» است چون بدون آن انسان هیچ نمی‌سازد.
              من دقیقاً <span className="italic">از طریق</span> مبارزه، فرود، خطا و بازگشت
              چه چیزی ساخته‌ام؟
            </p>
          </div>
        </Sec>

        {/* ── מַעֲשֶׂה ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            מַעֲשֶׂה · عمل
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              <span className="text-gold/90">امروز آگاهانه یک جرقه را بالا ببر.</span> یک عمل مادی از
              روزت را برگزین — خوردن، کار، هزینه، استراحت، مکالمه — و درست پیش از انجام آن
              در ذهنت بگو: <span className="italic">«این را برای بالا بردن جرقه‌ای که اینجاست انجام می‌دهم.»</span>
              یک عمل معمولی را به عمل <span className="italic">بیرور</span> تبدیل کن.
              این، در مقیاس کوچک، تمام عَوودای انسان است: نه فرار از ماده،
              بلکه <span className="text-gold/90">فرود در آن برای بالا بردنش</span>.
            </p>
          </div>
        </Sec>

        {/* ── חֲתִימָה ── */}
        <Sec>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: "0 0 12px #c9a43e88" }}>
              חֲתִימָה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              پوستی که به یاد می‌آورد نور بود
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              تنها یک حرف «جامه‌های نور» (אוֹר، آلف) را از «جامه‌های پوست» (עוֹר، عین) جدا می‌کند.
              سقوط نور را با پوست پوشاند — اما آن را خاموش نکرد. فرود شکست نقشه نیست:{" "}
              <span className="text-parchment/80">فرود خودِ نقشه است</span>. نمی‌گوییم آدم و حوا گناه نکردند.
              می‌گوییم خطایشان — واقعی، با پیامدهای واقعی — جایگاهی در چیزی بی‌نهایت بزرگ‌تر داشت.
              تبعید برای رستگاری است. فرود برای تیکون است.
            </p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#b06a3c99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #b06a3c33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,10vw,56px)", color: "#fff6e0", textShadow: "0 0 16px #b06a3c" }}>נָחָשׁ</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#b06a3c" }}>نَحاش · مار · ۳۵۸</span>
              </div>
              <span className="font-cinzel text-2xl text-gold/40">=</span>
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,10vw,56px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>מָשִׁיחַ</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>مَشیَح · مسیح · ۳۵۸</span>
              </div>
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              همان نیرویی که کنترل نشده مار عدن بود، وقتی تصحیح می‌شود، نیروی مَشیَح است.
              پوست مار، از طریق عَوودا، دوباره جامه‌ی نور می‌شود.
            </p>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 3:21")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              ← مطالعه‌ی این راز در خَشمَل
            </button>

            {/* הֶמְשֵׁךְ — ادامه‌ی مسیر */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/358" className="hover:text-gold">← نَحاش = مَشیَح = ۳۵۸</Link>
              <Link href="/misterio/serpiente-de-cobre" className="hover:text-gold">← مار مسی</Link>
              <Link href="/misterio/linaje" className="hover:text-gold">← نسَب مَشیَح</Link>
            </div>
          </div>
        </Sec>

        {/* Footer */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            کابالا و فلسفه‌ی یهودی
          </p>
        </div>

      </main>
    </div>
  );
}

// ── Componentes (idénticos en estilo a /misterio/lot y /misterio/betsabe) ─────
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

function PullQuote({ he, es, source }: { he: string; es: string; source: string }) {
  return (
    <Section>
      <div className="my-10 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
        <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
        <p className="mb-1 text-sm italic leading-relaxed text-parchment/80">«{es}»</p>
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
export default function RopasDeLuzPage() {
  const locale = useLocale();
  const router = useRouter();
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);

  if (locale === "fa") return <RopasDeLuzFarsi />;
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir="ltr">

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · Jashmal</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              Comenzar estudio →
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            Génesis 3:21 · Midrash · Sod
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(40px, 12vw, 84px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            כָּתְנוֹת עוֹר
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            De Ropas de Luz a Piel de Serpiente
          </h2>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/55">
            La caída necesaria para el Tikún
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Una sola letra separa la «ropa de luz» (אוֹר) de la «ropa de piel» (עוֹר).
            La caída vistió a la luz con piel — pero no la apagó. El trabajo del hombre
            es convertir, de nuevo, la piel de serpiente en ropa de luz.
          </p>
        </div>

        {/* ── Advertencia del Sofer (puerta, no tesis) ── */}
        <Section>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Antes de empezar — nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              «¿Sabías que Adán y Eva nunca pecaron?» es una{" "}
              <span className="text-gold/85">puerta</span>, no la conclusión. La verdad
              honesta de este estudio es la contraria y más profunda:{" "}
              <span className="text-gold/90">sí hubo una falta real — pero esa falta
              tenía un lugar en el plan.</span>{" "}
              La tradición mayoritaria habla de un pecado. Lo que mostramos es que
              incluso ese pecado fue absorbido por algo más grande.
            </p>
          </div>
        </Section>

        {/* ── El versículo y su doble lectura ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · El versículo y su doble lectura
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Tras la caída, la Torá dice que Dios hizo para Adam y su mujer{" "}
              <span className="hebrew text-gold/90" dir="rtl">כָּתְנוֹת עוֹר</span>{" "}
              —<span className="text-gold/90">kotnot ʿor</span>, «ropas de piel»— y los
              vistió (Génesis 3:21). El texto normativo escribe esa palabra con{" "}
              <span className="text-gold/90">áyin (ע)</span>: עוֹר = <span className="italic">piel,
              cuero</span>.
            </p>
            <p>
              Pero existe una segunda lectura, conservada en una fuente clásica, donde la
              misma palabra se escribe con <span className="text-gold/90">álef (א)</span>:{" "}
              <span className="hebrew text-gold/90" dir="rtl">אוֹר</span> = <span className="italic">luz</span>.
              <span className="hebrew text-gold/90" dir="rtl"> כָּתְנוֹת אוֹר</span> = «ropas de LUZ».
              Una sola letra separa la piel de la luz. Ese es el eje del misterio entero.
            </p>
          </div>
        </Section>

        {/* ── Las dos ropas ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Las dos ropas
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            La misma palabra, una letra de diferencia. El cuerpo de luz que el hombre
            tuvo antes de la falta, y el cuerpo de piel con que el alma quedó envuelta
            después. La luz no desapareció: quedó <span className="text-gold/80">vestida</span>.
          </p>
        </Section>

        <div className="space-y-4">
          {LECTURAS.map((p, i) => (
            <Section key={p.he} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(34px, 9vw, 50px)", color: dark ? "#fff6e0" : "#3a2a08",
                    textShadow: dark ? `0 0 16px ${p.color}` : "none" }}>
                  {p.he}
                </span>
                <div className="flex-1">
                  <p className="font-cinzel text-sm font-bold tracking-wide" style={{ color: p.color }}>
                    {p.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85">{p.sentido}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>

        {/* ── Mefarshim: la Torá de Rabí Meir ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            מְפָרְשִׁים · La Torá de Rabí Meir
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La fuente del juego de palabras es{" "}
              <span className="text-gold/90">Bereshit Rabbá 20:12</span>. El midrash dice
              que en la Torá personal de Rabí Meir, el tana del siglo II, hallaron escrito{" "}
              <span className="hebrew text-gold/90" dir="rtl">כָּתְנוֹת אוֹר</span> —«ropas de
              luz», con álef— y no con áyin. Añade que esas vestiduras de Adam HaRishón eran
              «lisas como una uña y bellas como perlas».
            </p>
            <p className="text-parchment/70">
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
                Honestidad textual:
              </span>{" "}
              el texto masorético que rige en toda sinagoga dice עוֹר (piel). La lectura
              אוֹר (luz) <span className="text-gold/85">no</span> es la versión canónica de la
              Torá: es una variante atesorada por la tradición justamente porque <span className="italic">insinúa</span>{" "}
              lo que se perdió. El midrash no corrige la Torá — lee, dentro de la letra, la
              memoria del cuerpo de luz. Esto es <span className="text-gold/85">drash</span>, no pshat.
            </p>
          </div>
        </Section>

        <PullQuote
          he="בְּתוֹרָתוֹ שֶׁל רַבִּי מֵאִיר מָצְאוּ כָּתוּב כָּתְנוֹת אוֹר"
          es="En la Torá de Rabí Meir hallaron escrito «kotnot or» (ropas de luz)."
          source="Midrash, Bereshit Rabbá 20:12"
        />

        {/* ── Rashi + la mutación luz → piel ── */}
        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Rashi (pshat):</span>{" "}
              fiel a la lectura llana, explica las «ropas de piel» como prendas físicas —
              protección para un cuerpo que ahora es vulnerable, mortal, expuesto al frío y a
              la vergüenza. La vestimenta de piel es <span className="text-gold/90">consecuencia</span>{" "}
              de la caída: antes el hombre no necesitaba cubrirse; ahora sí.
            </p>
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">El paso luz → piel (sod):</span>{" "}
              para la Cabalá, el versículo describe una mutación ontológica, no un cambio de
              guardarropa. Antes del <span className="italic">jet</span> (la falta) el ser humano
              tenía un <span className="text-gold/90">cuerpo de luz</span> (<span className="italic">guf
              shel or</span>); tras la falta, el alma quedó «envuelta» en un{" "}
              <span className="text-gold/90">cuerpo de piel</span> (<span className="italic">guf shel
              ʿor</span>): denso, mortal, opaco. La piel no es la negación de la luz — es su{" "}
              <span className="text-gold/90">ropa</span>. Y una ropa puede volverse transparente.
            </p>
          </div>
        </Section>

        {/* ── Remez: la gematría ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            רֶמֶז · La insinuación de las letras
          </h3>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="אוֹר" sub="Luz · 207 · álef" color="#f0d060" />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <HebrewTile he="עוֹר" sub="Piel · 276 · áyin" color="#cf8c52" />
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La única diferencia entre la luz y la piel es el cambio de{" "}
              <span className="text-gold/90">álef (א = 1)</span> por{" "}
              <span className="text-gold/90">áyin (ע = 70)</span>. El álef es la unidad, el
              aliento silencioso, la raíz de la luz oculta. El áyin significa, literalmente,{" "}
              <span className="text-gold/90">«ojo»</span>: la percepción que ve superficies, que
              mira «lo bueno y lo malo», que se vuelve consciente de estar desnuda.
            </p>
            <p>
              Comer del Árbol del Conocimiento del bien y del mal fue, en clave de remez,
              cambiar la <span className="hebrew text-gold/90">א</span> de la luz por el{" "}
              <span className="hebrew text-gold/90">ע</span> del ojo que juzga apariencias. La
              caída es el momento en que el hombre dejó de <span className="italic">ser</span> luz
              para empezar a <span className="italic">mirar</span> el mundo.{" "}
              <span className="text-parchment/55">(Gematrías calculadas y verificadas por el Sofer.)</span>
            </p>
          </div>
        </Section>

        {/* ── Drash + Sod: el descenso que tiene un lugar bueno ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            דְּרָשׁ · El descenso tiene un lugar
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El homilético se atreve a una idea incómoda: <span className="text-gold/90">lo oscuro
              tiene una función</span>. Sobre el verso «y he aquí, era muy bueno» (<span className="italic">tov
              meod</span>, Gén. 1:31), el midrash de Bereshit Rabbá 9:7 dice que «muy bueno» es el{" "}
              <span className="text-gold/90">yétzer hará</span> —la inclinación al mal— porque sin
              esa fuerza «el hombre no construiría casa, ni se casaría, ni engendraría, ni haría
              comercio».
            </p>
            <p>
              No porque el mal sea bueno, sino porque <span className="text-gold/90">sin una fuerza
              de descenso, de deseo, de fricción, no hay construcción, no hay mundo, no hay trabajo
              del hombre</span>. Aquí está, en fuente clásica y verificada, la semilla de toda la
              idea: el descenso no es solo castigo — es el motor del <span className="italic">avodá</span>.
              La voz del <span className="text-gold/90">Baal Shem Tov</span> se integra aquí: toda
              bajada lleva escondida una subida.
            </p>
          </div>
        </Section>

        {/* ── Sod: yeridá tzórej aliyá ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · El descenso es para el ascenso
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El nivel místico tiene un nombre técnico:{" "}
              <span className="hebrew text-gold/90" dir="rtl">יְרִידָה צוֹרֶךְ עֲלִיָּה</span>{" "}
              —<span className="text-gold/90">yeridá tzórej aliyá</span>, «el descenso es para el
              ascenso»—. No es una frase suelta: está escrita, literalmente, en Likkutei Torah,
              Shir HaShirim 4:2 (del Alter Rebbe de Chabad).
            </p>
            <p>
              El alma baja del trono luminoso a un cuerpo de piel{" "}
              <span className="text-gold/90">para subir más alto de lo que estaba antes de bajar</span>.
              Una vela encendida en una habitación ya iluminada casi no se nota; la misma vela en
              plena oscuridad lo es todo. El alma desciende a la oscuridad precisamente porque solo
              desde ahí puede encender una luz que arriba era imposible.
            </p>
          </div>
        </Section>

        <PullQuote
          he="וזהו ירידה צורך עליה ע״י תשובה לעלות לעלוי זה... דייקא בגלות וירידה בגוף גשמי"
          es="Y esto es: «el descenso es para el ascenso», mediante la teshuvá, para elevarse a esta elevación… precisamente en el exilio y en el descenso al cuerpo material."
          source="Likkutei Torah, Shir HaShirim 4:2"
        />

        {/* ── Jashmal · El doble filo ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            חַשְׁמַל · El doble filo
          </h3>

          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Dos lecturas — hay que distinguirlas para no mentir
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              El gancho «nunca pecaron» funciona como provocación de entrada. La respuesta honesta
              no es «no pecaron». La respuesta es: <span className="text-gold/85">«pecaron — y aun así,
              su falta tenía un sitio en algo más grande que ellos.»</span>
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/60">
                Lectura (a) · pshat / clásica:
              </span>{" "}
              la tradición mayoritaria es clara: <span className="text-gold/90">sí fue un jet</span>{" "}
              —una falta real—. El hombre desobedeció; hubo consecuencia. Pero esa misma caída{" "}
              <span className="text-gold/90">habilitó el Tikún</span>: el trabajo de reparación que es
              el propósito de toda la historia humana. Sin Edén perdido no hay regreso al Edén; sin
              exilio no hay redención; sin descenso no hay nada que elevar. La caída no anula el plan:{" "}
              <span className="text-gold/90">lo pone en marcha</span>. Esta es la verdad central del estudio.
            </p>
            <p className="text-parchment/70">
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
                Lectura (b) · radical de Izhbitz — minoritaria y controvertida:
              </span>{" "}
              el <span className="text-gold/85">Mei HaShiloach</span> (Rabí Mordejai Yosef Leiner de
              Izhbitz, s. XIX) lee, sobre Gén. 2:17, que «el pecado no fue sino según su propio
              entendimiento, como las cáscaras del ajo, y no más». Vista desde la Providencia última,
              la magnitud del «pecado» se reduce a una cáscara fina.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-gold/15 bg-black/20 px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Advertencia del Sofer, sin rodeos
            </p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-parchment/70">
              <li>
                · Izhbitz es una lectura <span className="text-gold/85">minoritaria, mística y
                controvertida</span>. Muchas autoridades la leyeron con cautela.
              </li>
              <li>
                · <span className="text-gold/85">NO es halajá. NO es la visión normativa del
                judaísmo.</span> El judaísmo mayoritario afirma con fuerza el libre albedrío y la
                responsabilidad por el pecado.
              </li>
              <li>
                · La presentamos como lo que es: una mirada <span className="italic">sod</span>{" "}
                extrema, que ilumina un ángulo del misterio sin cancelar la lectura clásica.
              </li>
            </ul>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-parchment/85">
            El doble filo: el pshat dice «pecaron»; Izhbitz dice «su falta era una cáscara dentro del
            plan de Dios». La verdad de Jashmal vive en la <span className="text-gold/90">tensión</span>{" "}
            entre los dos, no en negar ninguno.
          </p>
        </Section>

        {/* ── Sod luriano: las chispas y el Tikún ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · Las chispas y el Tikún luriano
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Para entender por qué la caída es necesaria, hay que bajar al nivel cósmico. Antes del
              hombre hubo un cataclismo: la luz infinita era demasiado intensa para los recipientes
              (<span className="italic">kelim</span>) que debían contenerla, y estos se{" "}
              <span className="text-gold/90">rompieron</span>. Es el{" "}
              <span className="hebrew text-gold/90" dir="rtl">שַׁעַר שְׁבִירַת הַכֵּלִים</span> —el
              Portal de la Ruptura de los Recipientes, el Portal 9 del Etz Chaim del Arizal (Sefer
              Etz Chaim 9:1), el mismo que el sitio ya mapea en{" "}
              <Link href="/mente-cosmica" className="text-gold underline-offset-2 hover:underline">/mente-cósmica</Link>.
            </p>
            <p>
              Al romperse los recipientes, <span className="text-gold/90">chispas de luz divina
              (nitzotzot) cayeron</span> y quedaron atrapadas en las{" "}
              <span className="italic">kelipot</span> —las cáscaras, lo material y lo oscuro—. La luz
              santa quedó dispersa, prisionera, escondida en lo más bajo de la existencia.
            </p>
            <p>
              El propósito de toda la historia es el <span className="text-gold/90">birur</span>:
              extraer esas chispas y devolverlas a su raíz. ¿Quién hace ese trabajo?{" "}
              <span className="text-gold/90">El hombre</span> — mediante las mitzvot, la intención
              (<span className="italic">kavaná</span>) y el acto de usar lo material para un fin
              santo. Cada vez que alguien toma algo de este mundo y lo dirige a lo sagrado,{" "}
              <span className="text-gold/90">eleva una chispa caída</span>. Eso es el Tikún.
            </p>
            <p>
              Aquí se cierra el círculo: las chispas cayeron en la Ruptura; el hombre las eleva con su
              trabajo en el exilio; y la caída de Adán —que lo arrastró al cuerpo de piel, a lo
              material— es precisamente lo que <span className="text-gold/90">pone al hombre en el sitio
              donde están las chispas</span>. No se pueden recoger chispas del suelo desde un trono en
              el cielo. Hay que bajar.
            </p>
          </div>
        </Section>

        <PullQuote
          he="...תְּלוּיָה בְּמַעֲשֵׂינוּ וַעֲבוֹדָתֵנוּ כָּל זְמַן מֶשֶׁךְ הַגָּלוּת"
          es="…la revelación de la Luz del Ein Sof en este mundo material depende de nuestras acciones y nuestro trabajo (avodá) durante todo el tiempo del exilio."
          source="Tania, Likutei Amarim 37"
        />

        {/* ── PaRDeS ── */}
        <Section>
          <h3 className="mb-6 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            פרד״ס · Las cuatro lecturas
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "Pshat",
                txt: "Génesis 3 narra una transgresión real: Dios prohíbe el fruto (Gén. 2:17), el hombre y la mujer comen (Gén. 3:6), y hay consecuencia: expulsión, mortalidad, trabajo, y las ropas de piel como signo de la nueva condición. En el pshat hubo pecado. No lo disimulamos.",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "Una sola letra: אוֹר (luz, 207, con álef) frente a עוֹר (piel, 276, con áyin). Cambiar la álef de la luz por el áyin del «ojo» que juzga apariencias es dejar de ser luz para empezar a mirar el mundo.",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "Lo oscuro tiene una función: el yétzer hará es «muy bueno» (Bereshit Rabbá 9:7), porque sin la fuerza de descenso el hombre no construye nada. El Baal Shem Tov: toda bajada lleva escondida una subida.",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "Yeridá tzórej aliyá: el descenso es para el ascenso (Likkutei Torah, Shir HaShirim 4:2). El alma baja al cuerpo de piel para encender una luz imposible arriba — reflejo, en pequeño, de la Ruptura de los Recipientes y del birur de las chispas.",
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
                    {r.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85">{r.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Hitbonenut ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            הִתְבּוֹנְנוּת · Contemplación
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Detente en una imagen: el alma tuvo una vez <span className="text-gold/90">ropa de
              luz</span>, y ahora lleva <span className="text-gold/90">ropa de piel</span>. La misma
              alma. La luz no se perdió — se vistió. Está debajo, esperando.
            </p>
            <p>
              ¿Cuántas veces he leído mi propia caída —mis errores, mis descensos— solo como{" "}
              <span className="italic">piel</span>: vergüenza, fracaso, castigo? ¿Y si debajo de esa
              piel hubiera una luz que solo desde ahí abajo se puede encender? El midrash dice que la
              fuerza oscura es «muy buena» porque sin ella el hombre no construye nada. ¿Qué he
              construido yo precisamente <span className="italic">por</span> haber tenido que luchar,
              bajar, equivocarme y volver a subir?
            </p>
            <p>
              El patrón se repite en todas las escalas: el cosmos cae (Ruptura), el alma cae (al
              cuerpo), el hombre cae (Edén). Y en las tres, la caída no es el final de la historia —
              es el <span className="text-gold/90">comienzo del trabajo</span>.
            </p>
          </div>
        </Section>

        {/* ── Maasé ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            מַעֲשֶׂה · Acción
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="text-gold/90">Eleva una chispa, hoy, conscientemente.</span> Toma una
              acción material de tu día —comer, trabajar, gastar dinero, descansar, una conversación—
              y, justo antes de hacerla, di en tu mente: <span className="italic">«Esto lo hago para
              elevar la chispa que hay aquí.»</span> Convierte un acto ordinario en un acto de{" "}
              <span className="italic">birur</span>. Esa es, en miniatura, toda la avodá del hombre:
              no huir de lo material, sino <span className="text-gold/90">bajar a ello para elevarlo</span>.
            </p>
            <p>
              Y una <span className="italic">midá</span> para esta semana:{" "}
              <span className="text-gold/90">reinterpretar un descenso propio</span>. Elige un error
              reciente y, en vez de quedarte en la piel (la culpa), busca deliberadamente la luz que ese
              descenso te permitió encender. No para justificar la falta —la falta es real— sino para
              ponerla a trabajar a favor de tu ascenso.
            </p>
          </div>
        </Section>

        {/* ── Jatimá · El sello ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              חֲתִימָה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              La piel que recuerda que fue luz
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              Una sola letra separa las «ropas de luz» (אוֹר, álef) de las «ropas de piel» (עוֹר,
              áyin). La caída vistió a la luz con piel — pero no la apagó. El descenso no es el fracaso
              del plan: <span className="text-parchment/80">es el plan</span>. No decimos que Adán y Eva
              no pecaron. Decimos que su falta —real, con consecuencias reales— tenía un lugar en algo
              infinitamente más grande. El exilio es para la redención. La caída es para el Tikún.
            </p>

            {/* Sello de la serie: נחש = 358 = משיח */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <HebrewTile he="נָחָשׁ" sub="Serpiente · 358" color="#b06a3c" />
              <span className="font-cinzel text-2xl text-gold/40">=</span>
              <HebrewTile he="מָשִׁיחַ" sub="Mashíaj · 358" color="#c9a43e" />
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              La misma fuerza que, descontrolada, fue la serpiente del Edén, es —rectificada, elevada
              por el trabajo del hombre— la fuerza del Mashíaj. La piel de serpiente, por el avodá,
              vuelve a ser ropa de luz.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Ropas de piel · Génesis 3:21", ref: "Genesis 3:21" },
                { label: "Ropas de luz · Bereshit Rabbá 20:12", ref: "Bereshit Rabbah 20:12" },
                { label: "El yétzer «muy bueno» · Bereshit Rabbá 9:7", ref: "Bereshit Rabbah 9:7" },
                { label: "Yeridá tzórej aliyá · Likkutei Torah", ref: "Likutei Torah, Shir HaShirim 4:2" },
                { label: "La avodá del exilio · Tania 37", ref: "Tanya, Part One; Likkutei Amarim 37" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 3:21")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            {/* Hemshej — umbral «Sigue el hilo» (puentes hacia otros estudios) */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/358" className="hover:text-gold">Najash = Mashíaj = 358 →</Link>
              <Link href="/misterio/serpiente-de-cobre" className="hover:text-gold">La serpiente de cobre →</Link>
              <Link href="/misterio/linaje" className="hover:text-gold">El linaje prohibido del Mashíaj →</Link>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            Cabalá &amp; Filosofía Judía
          </p>
        </div>

      </main>
    </div>
  );
}
