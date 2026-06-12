"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: YEHUDÁ — "tzadká mimeni" ──────────────────────────────
// "El rey que se declaró culpable" — Génesis 38 leído con Sotá 10b (el Nombre de
// Dios dentro de Yehudá; mejor el horno que avergonzar en público) y Bereshit
// Rabá 85:11 (haker-na medida por medida). Contenido verificado por el Sofer.
// Idioma principal: español. Farsi verificado por el Sofer (ver YehudaFarsi).
//
// VERIFICACIÓN DEL SOFER (fuentes y gematrías comprobadas contra Sefaria + cálculo):
//  · Génesis 38:1 (וַיֵּרֶד — «descendió»), 38:26 (וַיַּכֵּר... צָדְקָה מִמֶּנִּי),
//    37:32 (הַכֶּר־נָא) — texto hebreo confirmado en Sefaria.
//  · Sotá 10b — «mejor arrojarse al horno que avergonzar en público» (R. Shimón bar
//    Yojái) Y Yehudá santificó el Nombre y mereció que todo su nombre se llame por
//    el Nombre del Santo; medida por medida con Jananiá/Mishael/Azariá (Daniel 3).
//  · Bereshit Rabá 85:11 — haker-na medido. Berajot 7b — Leá «agradeció» (hoda'á).
//  · Nazir 23b — גְּדוֹלָה עֲבֵירָה לִשְׁמָהּ (Lot y Tamar/Yehudá en contexto).
//  · Gematrías: נחש = 358 = משיח. Letras: יהוה (26) + ד (4) = 30 = יהודה (composición
//    de letras, NO igualdad forzada con otra palabra). Todo recalculado por el Sofer.

// ── Página en FARSI (رندر شده وقتی locale === "fa") ──────────────────────────
function YehudaFarsi() {
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

  function Tile({ he, sub, color }: { he: string; sub: string; color: string }) {
    return (
      <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
        style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}>
        <span className="hebrew font-bold leading-none"
          style={{ fontSize: "clamp(56px, 14vw, 78px)", color: "#fff6e0", textShadow: `0 0 22px ${color}, 0 0 8px ${color}` }}>
          {he}
        </span>
        <span className="mt-2 text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
      </div>
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
            پیدایش ۳۸ · تلمود سوطا ۱۰ب · سود
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(44px, 13vw, 92px)", color: "#fdf4dd",
              textShadow: "0 0 24px #c9a43e88" }}>
            יְהוּדָה
          </h1>
          <h2 className="text-xl font-bold text-parchment/90 sm:text-2xl">
            پادشاهی که خود را گناهکار اعلام کرد
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
            مردی از رهبری خود فرو می‌افتد و ندانسته عروسِ خویش را به مرگ در آتش می‌سپارد.
            در واپسین لحظه، با سه شیءِ در دستش که او را رسوا می‌کند، می‌توانست خاموش بماند
            و بگذارد او بسوزد. اما به‌جای آن دو کلمه می‌گوید: «او از من درست‌کارتر است».
            همان لحظه‌ی حقیقتِ عریان، پادشاهیِ جاودان را برایش به ارمغان آورد، نامِ خدا را
            درون نامش نهاد، و مسیرِ پادشاه داوود… و مَشیَح را گشود.
          </p>
        </div>

        {/* ── داستان ── */}
        <Sec>
          <h3 className="mb-2 text-sm uppercase tracking-[0.3em] text-gold/60">
            داستان
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              یهودا، چهارمین پسرِ یعقوب، همان کسی بود که برادرانش را راضی کرد یوسف را
              به‌جای کشتن{" "}
              <span className="text-gold/90">بفروشند</span> (پیدایش ۳۷:۲۶-۲۷). چون سوگِ پدرشان را دیدند،
              او را مقصر دانستند و «از مقامش پایین آوردند» (راشی بر پیدایش ۳۸:۱). از همین رو
              این فصل با کلمه‌ای دقیق آغاز می‌شود:{" "}
              <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד יְהוּדָה</span> —
              «و یهودا از کنار برادرانش <span className="text-gold/90">فرود آمد</span>»
              (پیدایش ۳۸:۱). رهبر سقوط می‌کند: کناره می‌گیرد، با زنی کنعانی ازدواج می‌کند،
              و دو پسرش را — عِر و اونان، هر دو شوهرِ زنی به نامِ{" "}
              <span className="text-gold/90">تامار</span> — از دست می‌دهد (پیدایش ۳۸:۶-۱۰).
            </p>
            <p>
              یهودا به تامار قول می‌دهد که پسر سومش شِلا را به او بدهد، اما نمی‌دهد
              (پیدایش ۳۸:۱۱). بیوه و بی‌فرزند، تامار خود را با نقابی می‌پوشاند، و یهودا
              بی‌آنکه او را بشناسد، او را روسپی می‌پندارد؛ به‌عنوان گروِ پرداخت{" "}
              <span className="text-gold/90">مُهر، بند و عصای</span> خود را نزد او می‌گذارد
              (پیدایش ۳۸:۱۵-۱۸). ماه‌ها بعد به او خبر می‌دهند که تامار باردار شده، و یهودا —
              بی‌آنکه بداند خودِ او پدر است — حکم می‌کند: «او را بیرون آورید تا سوزانده شود!»
              (پیدایش ۳۸:۲۴). در حالی که او را به سوی آتش می‌برند، تامار پنهانی آن سه شیء را
              برایش می‌فرستد:{" "}
              <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> — «بشناس، خواهش می‌کنم:
              این‌ها از آنِ کیست؟» (پیدایش ۳۸:۲۵). و یهودا می‌شناسد.
            </p>
          </div>
        </Sec>

        {/* ── tzadká mimeni — محور مرکزی ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            צָדְקָה מִמֶּנִּי · دو کلمه‌ای که داستان را دگرگون می‌کند
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              قلبِ این راز اینجاست. یهودا راهِ آسانِ گریز را در دست دارد: گروها از آنِ
              اوست، اما هیچ‌کسِ دیگر این را نمی‌داند. کافی است خاموش بماند. زن می‌سوزد،
              راز با او می‌میرد، و آبروی او همچون نیای قوم دست‌نخورده می‌ماند.{" "}
              <span className="text-gold/90">به‌جای آن، در ملأ عام می‌گوید:</span>
            </p>
          </div>

          {/* آیه‌ی محوری */}
          <div className="my-8 rounded-2xl border border-gold/25 bg-gradient-to-b from-gold/[0.07] to-transparent p-7 text-center">
            <p className="hebrew mb-3 text-2xl leading-relaxed text-gold" dir="rtl"
              style={{ textShadow: "0 0 14px #c9a43e88" }}>
              וַיַּכֵּר יְהוּדָה וַיֹּאמֶר צָדְקָה מִמֶּנִּי
            </p>
            <p className="text-sm italic leading-relaxed text-parchment/85" dir="rtl">
              «و یهودا <span className="text-gold/90">شناخت</span> و گفت:{" "}
              <span className="text-gold/90">او از من درست‌کارتر است</span>.»
            </p>
            <p className="mt-1.5 font-cinzel text-[10px] uppercase tracking-widest text-gold/50">
              — پیدایش ۳۸:۲۶
            </p>
          </div>

          {/* جعبه‌ی اصطلاح — دو کلمه */}
          <div className="space-y-3">
            <div className="rounded-xl border border-gold/15 bg-white/[0.02] p-4">
              <p className="hebrew text-lg text-gold/90" dir="rtl">וַיַּכֵּר · <span className="text-parchment/70">وَیَّکِر</span></p>
              <p className="mt-1 text-sm leading-relaxed text-parchment/80" dir="rtl">
                «شناخت». همان ریشه‌ی (נ-כ-ר) که در{" "}
                <span className="hebrew" dir="rtl">הַכֶּר־נָא</span> هست — همان کلمه‌ای که تامار به او می‌فرستد.
                فعلی برای شناختن… و برای اعتراف.
              </p>
            </div>
            <div className="rounded-xl border border-gold/15 bg-white/[0.02] p-4">
              <p className="hebrew text-lg text-gold/90" dir="rtl">צָדְקָה מִמֶּנִּי · <span className="text-parchment/70">صَدقا مِمِنّی</span></p>
              <p className="mt-1 text-sm leading-relaxed text-parchment/80" dir="rtl">
                «او از من درست‌کارتر است». مشهورترین جمله‌ی تِشووا (توبه) در تورا: کسی که
                در آینده عصای پادشاهی را به دست خواهد گرفت، در برابر همگان خود را گناهکار
                اعلام می‌کند.
              </p>
            </div>
          </div>
        </Sec>

        {/* ── Pshat ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            פְּשָׁט · سنگینیِ آنچه رخ داد
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              قرص را شیرین نمی‌کنیم. در معنای ساده، یهودا سه کارِ سنگین می‌کند: فروشِ
              برادرش یوسف را رهبری می‌کند (پیدایش ۳۷:۲۶-۲۷)، حقِ یِبوم (ازدواج برادرشوهری)
              را که به تامار قول داده بود از او دریغ می‌کند (پیدایش ۳۸:۱۱)، و — بی‌آنکه
              تحقیق کند — عروسِ خود را به مرگ در آتش محکوم می‌کند (پیدایش ۳۸:۲۴). و همه با
              یک سقوط آغاز می‌شود:{" "}
              <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד</span> — «فرود آمد». تورا
              نیای خود را آرایش نمی‌کند؛ او را در حالِ سقوط نشان می‌دهد. خَشمَل نیز از آن
              نمی‌گریزد: یک مطالعه‌ی صادقانه، سنگینی را <span className="text-gold/90">پیش از</span>
              {" "}جست‌وجوی نور تحمل می‌کند.
            </p>
            <p>
              آنچه اکنون می‌آید سختیِ روایت را <span className="text-gold/90">باطل نمی‌کند</span>.
              آن را بالا می‌برد. زیرا همان مردی که سقوط می‌کند، تنها کسی است که در لحظه‌ی
              سرنوشت‌ساز، حقیقت را بر آبروی خود برمی‌گزیند.
            </p>
          </div>
        </Sec>

        {/* ── نور پنهان ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            نور پنهان
          </h3>

          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/55">
              یادداشت صادقانه
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir="rtl">
              آنچه در پی می‌آید قرائتِ تلمود و میدراش است، و همان‌گونه نشان داده شده. پَشاط
              سنگینی را به ما داد. حکیمان (چَزال) سقوطِ یهودا را پاک نمی‌کنند: آن را همچون
              صحنه‌ی رستگاریِ او می‌خوانند. بزرگی در نیفتادن نیست، بلکه در آن کاری است که
              می‌کند آنگاه که می‌توانست سقوط را{" "}
              <span className="text-gold/85">پنهان</span> کند.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              تلمود، از رفتارِ تامار، اصلی هولناک و زیبا می‌آموزد:{" "}
              <span className="text-gold/90">«برای انسان بهتر است خود را در کوره‌ی آتش
              بیفکند تا آنکه آبروی همنوع خود را در ملأ عام ببرد»</span> (سوطا ۱۰ب، به نامِ
              ربی شیمعون بَر یوخای). تامار ترجیح داد به آتش رود تا آنکه فریاد بزند «کارِ
              یهودا بود!»؛ تنها گروها را برایش فرستاد و تصمیم را به خودِ او واگذاشت. و یهودا
              شایسته‌ی این هدیه بود: اعتراف کرد.
            </p>
            <p>
              تلمود می‌گوید به‌خاطرِ این اعترافِ علنی، یهودا دو چیز به دست آورد. نخست،
              پاداشی به اندازه‌ی عمل (مِدا کِنِگِد مِدا): «چون تامار و دو فرزندش را از آتش
              نجات داد، قدوس متبارک سه تن از فرزندانش را از آتش نجات خواهد داد» — حَنَنیا،
              میشائل و عَزَریا در کوره‌ی نِبوکَدنِصَّر (سوطا ۱۰ب؛ دانیال ۳). دوم، و ژرف‌تر:
              چون نامِ آسمان را در ملأ عام تقدیس کرد، شایسته شد که{" "}
              <span className="text-gold/90">تمامِ نامش به نامِ قدوس خوانده شود</span>.
              چهار حرفِ نامِ مقدس (<span className="hebrew" dir="rtl">י־ה־ו־ה</span>)
              درونِ <span className="hebrew text-gold/90" dir="rtl">יהודה</span> جای دارند،
              تنها با یک دالِتِ افزوده.
            </p>
          </div>
        </Sec>

        <PQ
          he="יְהוּדָה שֶׁקִּדֵּשׁ שֵׁם שָׁמַיִם בַּפַּרְהֶסְיָא, זָכָה שֶׁנִּקְרָא כֻּלּוֹ עַל שְׁמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא"
          fa="یهودا که نامِ آسمان را در ملأ عام تقدیس کرد، شایسته شد که تمامِ نامش به نامِ قدوسِ متبارک خوانده شود."
          source="تلمود، سوطا ۱۰ب"
        />

        {/* ── آینه‌ی הַכֶּר־נָא ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            הַכֶּר־נָא · آینه‌ی اعتراف
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              میدراش به چیزی لرزاننده اشاره می‌کند. آنگاه که یهودا و برادرانش پدرشان یعقوب
              را فریب دادند، جامه‌ی خون‌آلودِ یوسف را به او نشان دادند و گفتند:{" "}
              <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> — «<span className="text-gold/90">بشناس،
              خواهش می‌کنم</span>: آیا این جامه‌ی پسرِ توست؟» (پیدایش ۳۷:۳۲). سال‌ها بعد،
              تامار دقیقاً همان دو کلمه را به یهودا می‌فرستد:{" "}
              <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> (پیدایش ۳۸:۲۵). قدوس
              آن را به اندازه به او بازمی‌گرداند: «تو گفتی هَکِر-نا؛ به جانِ تو، به تو خواهند
              گفت هَکِر-نا» (برِشیت رَبّا ۸۵:۱۱).
            </p>
            <p className="text-parchment/70">
              <span className="text-[11px] uppercase tracking-widest text-gold/50">
                قرائتِ خَشمَل (دِراش):
              </span>{" "}
              اما این آینه تنها مجازات نیست: <span className="text-gold/85">دعوتی است به
              ترمیم</span>. بارِ نخست، «شناختن» سلاحِ فریب بود. بارِ دوم، یهودا همان کلمه را
              برمی‌دارد و به اعتراف بدل می‌کند. فعلی که پدرش را زخمی کرد، فعلی می‌شود که او
              را رستگار می‌کند.{" "}
              <span className="italic">(این ترکیب، تأمل خطابیِ ماست بر پایه‌ی متنِ تأییدشده‌ی
              برِشیت رَبّا ۸۵:۱۱ — نقلِ لفظی نیست.)</span>
            </p>
          </div>
        </Sec>

        <PQ
          he="אַתָּה אָמַרְתָּ לְאָבִיךָ הַכֶּר נָא... חַיֶּיךָ שֶׁתָּמָר אוֹמֶרֶת לְךָ הַכֶּר נָא"
          fa="تو به پدرت گفتی «بشناس، خواهش می‌کنم»… به جانِ تو، تامار به تو خواهد گفت «بشناس، خواهش می‌کنم»."
          source="میدراش، برِشیت رَبّا ۸۵:۱۱"
        />

        {/* ── Sod ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · فرودی که خودِ راه بود
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              اینجا همان چرخشی است که تمامِ این مجموعه را تعریف می‌کند. کابالا قانونی از
              جهان را می‌خواند: بالاترین نور به پست‌ترین جا فرو می‌افتد و در انتظارِ نجات
              می‌ماند. این‌ها{" "}
              <span className="text-gold/90">نیتسوتسوت</span> هستند، جرقه‌های مقدسِ گرفتار در
              <span className="italic"> کلیپوت</span> (پوسته‌ها). عصای اسرائیل از آسمانِ پاک
              فرود نمی‌آید: از پایین <span className="text-gold/90">نجات داده می‌شود</span>. و
              زندگیِ یهودا این را با یک کلمه ترسیم می‌کند: فصل با{" "}
              <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד</span> — «از بزرگی‌اش
              فرود آمد» (راشی بر پیدایش ۳۸:۱) — آغاز می‌شود و با صعودِ او به پادشاهیِ جاودان
              بسته می‌شود.{" "}
              <span className="hebrew text-gold/90" dir="rtl">יְרִידָה צוֹרֶךְ עֲלִיָּה</span> —
              <span className="text-gold/90">یِریدا تسوِرِخ عَلیا</span>، فرود برای صعود است —
              (بَعل شِم طوو). سقوط، تصادف نبود: روش بود.
            </p>
            <p>
              و این رسواییِ منزوی‌ای نیست: تبارِ مَشیَح از{" "}
              <span className="text-gold/90">دو سقوطِ عمدی در همان صفحه‌ی تلمود</span>
              {" "}می‌گذرد — سقوطِ دخترانِ لوط (← موآب ← روت) و سقوطِ یهودا با تامار (← پِرِتس) —،
              هر دو در نازیر ۲۳ب ذیلِ <span className="hebrew" dir="rtl">גְּדוֹלָה עֲבֵרָה לִשְׁמָהּ</span>.
              اما یهودا چیزی یگانه می‌افزاید: نامش به <span className="text-gold/90">نامِ
              خدا</span> بدل می‌شود. <span className="hebrew" dir="rtl">יהוה</span> + <span className="hebrew" dir="rtl">ד</span> = <span className="hebrew text-gold/90" dir="rtl">יהודה</span>.
              دالِت — حرفِ <span className="italic">دَلوت</span>، فقر و فروتنیِ آن‌که چیزی از
              آنِ خود ندارد — درست همان است که پادشاه آنگاه که سر فرود می‌آورد و اعتراف
              می‌کند به نام می‌افزاید.
            </p>
            <p className="font-cinzel text-base text-gold/90" dir="ltr">
              יְהוּדָה → پِרِتس → بوعَز → عوبِد → یِشای → داوود → مَشیَح.
            </p>
            <p>
              مَشیَح بِن داوود، مَشیَحِ <span className="text-gold/90">خاندانِ یهودا</span> است:
              تبارِ رهانندہ، در خطی مستقیم، از مردی می‌گذرد که خود را گناهکار اعلام کرد
              (پیدایش ۳۸:۲۹؛ روت ۴:۱۸-۲۲).
            </p>
          </div>

          {/* مهرِ مجموعه: נחש = ۳۵۸ = משיח */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Tile he="נָחָשׁ" sub="نَحاش · مار · ۳۵۸" color="#b06a3c" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="מָשִׁיחַ" sub="مَشیَح · مسیح · ۳۵۸" color="#c9a43e" />
          </div>
          <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted" dir="rtl">
            همان نیرویی که گویی انسان را به پایین می‌کشد — سقوط، شرم، فرود —، چون با یک
            اعتراف بالا برده شود، نیرویی است که تاج می‌بخشد. از سقوطِ یک رهبر، عصایی جوشید
            که هرگز کنار نمی‌رود.
          </p>
        </Sec>

        {/* ── PaRDeS ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            פרד״ס · چهار قرائت
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "پَشاط",
                txt: "یهودا از رهبری‌اش فرود می‌آید، از برادرانش کناره می‌گیرد، و بی‌آنکه او را بشناسد از عروسش تامار صاحب فرزند می‌شود. هنگامی که او را به آتش می‌برند، یهودا اعتراف می‌کند: «او از من درست‌کارتر است» (پیدایش ۳۸:۱، ۲۶).",
              },
              {
                he: "רֶמֶז", name: "رِمِز",
                txt: "نام همه‌چیز را اشاره می‌کند: لِئا با «سپاسگزاری» (هودا، برَخوت ۷ب) او را یهودا نامید، و او با «شناختن/اعتراف» (وَیَّکِر) نجات می‌یابد. همان نام، هم سپاس معنا می‌دهد و هم اعتراف به گناه.",
              },
              {
                he: "דְּרָשׁ", name: "دِراش",
                txt: "«بهتر است خود را در کوره بیفکنی تا آبروی دیگری را در ملأ عام ببری» (سوطا ۱۰ب): تامار راهِ گریز را به او واگذاشت، و یهودا آن را برگزید. مِدا کِنِگِد مِدا (به اندازه‌ی عمل) از همان هَکِر-نایی که با پدرش به کار برد (برِشیت رَبّا ۸۵:۱۱)، با تبدیلِ «هَکِر-نا» به یک اعتراف، رستگار شد.",
              },
              {
                he: "סוֹד", name: "سود",
                txt: "نیتسوتسوتِ فروافتاده در کلیپا: پادشاهی از پایین نجات داده می‌شود. יהוה+ד = יהודה: دالِتِ فروتنی که آن‌که سر فرود می‌آورد، در نام جای می‌دهد. یِریدا تسوِرِخ عَلیا — همان «فرود آمدِ» آغاز، روشی است که عصای مَشیَحی با آن در زمین کاشته می‌شود.",
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

        {/* ── جمع‌بندی / Síntesis ── */}
        <Sec>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: "0 0 12px #c9a43e88" }}>
              יְרִידָה צוֹרֶךְ עֲלִיָּה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              پادشاهی که خود را گناهکار اعلام کرد
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              مردی که از بزرگی‌اش فرو افتاد، عروسِ خود را به خطا محکوم کرد، و می‌توانست با
              سکوت خود را نجات دهد. به‌جای آن، دو کلمه‌ی عریان را برگزید — «او از من
              درست‌کارتر است» — و با آن‌ها در ملأ عام فرو رفت تا جانی را نجات دهد. آسمان
              پاسخش را داد: نامِ خویش را درونِ نامِ او نهاد و او را ریشه‌ی تختی کرد که هرگز
              کنار نمی‌رود. سقوط… خودِ راه بود. اعتراف… خودِ تاج بود.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "یهودا و تامار · پیدایش ۳۸", ref: "Genesis 38" },
                { label: "«صَدقا مِمِنّی» · پیدایش ۳۸:۲۶", ref: "Genesis 38:26" },
                { label: "نامِ خدا در یهودا · سوطا ۱۰ب", ref: "Sotah 10b" },
                { label: "«این بار سپاس می‌گزارم» · برَخوت ۷ب", ref: "Berakhot 7b" },
                { label: "عصای یهودا · پیدایش ۴۹:۱۰", ref: "Genesis 49:10" },
                { label: "پِرِتس → داوود · روت ۴", ref: "Ruth 4" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 38")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              ← مطالعه‌ی این راز در خَشمَل
            </button>

            {/* הֶמְשֵׁךְ — ادامه‌ی مسیر */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/tamar" className="hover:text-gold">← تامار: نقابی که مسیح را پنهان کرد</Link>
              <Link href="/misterio/lot" className="hover:text-gold">← لوط: دو دختر بی‌نام</Link>
              <Link href="/misterio/linaje" className="hover:text-gold">← تبارِ ممنوعِ مَشیَح</Link>
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
export default function YehudaPage() {
  const locale = useLocale();
  const router = useRouter();
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);

  if (locale === "fa") return <YehudaFarsi />;
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
            Génesis 38 · Talmud Sotá 10b · Sod
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(44px, 13vw, 92px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            יְהוּדָה
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            El rey que se declaró culpable
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Un hombre cae de su liderazgo y entrega, sin saberlo, a su propia nuera para que
            la quemen. En el último instante, con tres objetos en la mano que lo delatan,
            podría callar y dejarla arder. En cambio dice dos palabras: «ella es más justa
            que yo». Ese instante de verdad desnuda le ganó la realeza eterna, puso el Nombre
            de Dios dentro de su nombre, y abrió el cauce del Rey David… y del Mashíaj.
          </p>
        </div>

        {/* ── La historia ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La historia
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Yehudá, el cuarto hijo de Yaakov, fue quien convenció a sus hermanos de{" "}
              <span className="text-gold/90">vender a Yosef</span> en vez de matarlo (Génesis
              37:26-27). Cuando vieron el duelo de su padre, lo culparon a él y «lo bajaron de
              su rango» (Rashi a Génesis 38:1). Por eso el capítulo abre con una palabra
              precisa: <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד יְהוּדָה</span> —
              «y <span className="text-gold/90">descendió</span> Yehudá de junto a sus hermanos»
              (Génesis 38:1). El líder cae: se aparta, se casa con una cananea, y pierde a dos
              hijos, Er y Onán, ambos esposos de una mujer llamada <span className="text-gold/90">Tamar</span>
              {" "}(Génesis 38:6-10).
            </p>
            <p>
              Yehudá le promete a Tamar su tercer hijo, Shelá, pero no se lo da (Génesis
              38:11). Viuda y sin descendencia, Tamar se cubre con un velo, y Yehudá la toma
              por una prostituta sin reconocerla; como prenda de pago le deja su{" "}
              <span className="text-gold/90">sello, su cordón y su bastón</span> (Génesis
              38:15-18). Meses después le avisan que Tamar quedó embarazada, y Yehudá —sin
              saber que él es el padre— sentencia: «¡Sáquenla y que sea quemada!» (Génesis
              38:24). Mientras la llevan al fuego, ella le envía discretamente las tres prendas:{" "}
              <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> — «reconoce, por
              favor: ¿de quién son?» (Génesis 38:25). Y Yehudá reconoce.
            </p>
          </div>
        </Section>

        {/* ── tzadká mimeni — el ángulo central ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            צָדְקָה מִמֶּנִּי · Dos palabras que cambian la historia
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Aquí está el corazón del misterio. Yehudá tiene en la mano la salida fácil: las
              prendas son suyas, pero nadie más lo sabe. Le bastaría con callar. La mujer arde,
              el secreto muere con ella, y su honor de patriarca queda intacto.{" "}
              <span className="text-gold/90">En vez de eso, dice en público:</span>
            </p>
          </div>

          {/* Verso central */}
          <div className="my-8 rounded-2xl border border-gold/25 bg-gradient-to-b from-gold/[0.07] to-transparent p-7 text-center">
            <p className="hebrew mb-3 text-2xl leading-relaxed text-gold" dir="rtl"
              style={{ textShadow: dark ? "0 0 14px #c9a43e88" : "none" }}>
              וַיַּכֵּר יְהוּדָה וַיֹּאמֶר צָדְקָה מִמֶּנִּי
            </p>
            <p className="text-sm italic leading-relaxed text-parchment/85">
              «Y Yehudá <span className="text-gold/90">reconoció</span> y dijo:{" "}
              <span className="text-gold/90">ella es más justa que yo</span>.»
            </p>
            <p className="mt-1.5 font-cinzel text-[10px] uppercase tracking-widest text-gold/50">
              — Génesis 38:26
            </p>
          </div>

          {/* Term box — las dos palabras */}
          <div className="space-y-3">
            <div className="rounded-xl border border-gold/15 bg-white/[0.02] p-4">
              <p className="hebrew text-lg text-gold/90" dir="rtl">וַיַּכֵּר · <span className="text-parchment/70">vayaker</span></p>
              <p className="mt-1 text-sm leading-relaxed text-parchment/80">
                «Reconoció». Misma raíz (נ-כ-ר) que el <span className="hebrew" dir="rtl">הַכֶּר־נָא</span> que
                Tamar le manda decir. Un verbo de reconocimiento… y de confesión.
              </p>
            </div>
            <div className="rounded-xl border border-gold/15 bg-white/[0.02] p-4">
              <p className="hebrew text-lg text-gold/90" dir="rtl">צָדְקָה מִמֶּנִּי · <span className="text-parchment/70">tzadká mimeni</span></p>
              <p className="mt-1 text-sm leading-relaxed text-parchment/80">
                «Ella es más justa que yo». La frase de teshuvá más célebre de la Torá: el
                futuro portador del cetro real se declara culpable delante de todos.
              </p>
            </div>
          </div>
        </Section>

        {/* ── Pshat ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            פְּשָׁט · El peso de lo que pasó
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              No doremos la píldora. En su sentido llano, Yehudá hace tres cosas graves: encabeza
              la venta de su hermano Yosef (Génesis 37:26-27), le niega a Tamar el levirato que
              le prometió (Génesis 38:11), y —sin investigar— condena a su nuera a morir quemada
              (Génesis 38:24). Y todo arranca con una caída:{" "}
              <span className="hebrew text-gold/90" dir="rtl">וַיֵּרֶד</span> —«descendió»—. La Torá
              no maquilla a su propio patriarca; lo muestra cayendo. Jashmal tampoco lo esquiva:
              un estudio honesto sostiene el peso <span className="text-gold/90">antes</span> de
              buscar la luz.
            </p>
            <p>
              Lo que viene ahora <span className="text-gold/90">no anula</span> la dureza del
              relato. La eleva. Porque el mismo hombre que cae es el único que, en el instante
              decisivo, elige la verdad por encima de su honor.
            </p>
          </div>
        </Section>

        {/* ── La luz escondida ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La luz escondida
          </h3>

          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              Lo que sigue es lectura del Talmud y el Midrash, marcada como tal. El Pshat ya nos
              dio el peso. Chazal no borra la caída de Yehudá: la lee como el escenario de su
              redención. La grandeza no está en no caer, sino en lo que hace cuando podría{" "}
              <span className="text-gold/85">esconder</span> la caída.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Talmud enseña, a partir de la conducta de Tamar, un principio terrible y hermoso:{" "}
              <span className="text-gold/90">«más le vale a una persona arrojarse a un horno de
              fuego que avergonzar a su prójimo en público»</span> (Sotá 10b, en nombre de Rabí
              Shimón bar Yojái). Tamar prefirió ir al fuego antes que gritar «¡fue Yehudá!»; solo
              le mandó las prendas, dejándole a él la decisión. Y Yehudá estuvo a la altura del
              regalo: confesó.
            </p>
            <p>
              Por esa confesión pública, dice el Talmud, Yehudá ganó dos cosas. Primero, una
              medida-por-medida de gracia: «porque salvó a Tamar y a sus dos hijos del fuego, el
              Santo salvará del fuego a tres de sus descendientes» —Jananiá, Mishael y Azariá en
              el horno de Nabucodonosor (Sotá 10b; Daniel 3). Segundo, y más profundo: por
              santificar el Nombre del Cielo en público, mereció que{" "}
              <span className="text-gold/90">todo su nombre se llame por el Nombre del Santo</span>.
              Las cuatro letras del Tetragrámaton (<span className="hebrew" dir="rtl">י־ה־ו־ה</span>)
              viven dentro de <span className="hebrew text-gold/90" dir="rtl">יהודה</span>, con una
              sola dálet añadida.
            </p>
          </div>
        </Section>

        <PullQuote
          he="יְהוּדָה שֶׁקִּדֵּשׁ שֵׁם שָׁמַיִם בַּפַּרְהֶסְיָא, זָכָה שֶׁנִּקְרָא כֻּלּוֹ עַל שְׁמוֹ שֶׁל הַקָּדוֹשׁ בָּרוּךְ הוּא"
          es="Yehudá, que santificó el Nombre del Cielo en público, mereció que todo su nombre se llame por el Nombre del Santo, bendito sea."
          source="Talmud, Sotá 10b"
        />

        {/* ── El espejo del haker-na ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            הַכֶּר־נָא · El espejo de la confesión
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Midrash nota algo escalofriante. Cuando Yehudá y sus hermanos engañaron a su
              padre Yaakov, le mostraron la túnica de Yosef ensangrentada y le dijeron:{" "}
              <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> —«<span className="text-gold/90">reconoce,
              por favor</span>: ¿es esta la túnica de tu hijo?»— (Génesis 37:32). Años después,
              Tamar le manda a Yehudá exactamente las mismas dos palabras:{" "}
              <span className="hebrew text-gold/90" dir="rtl">הַכֶּר־נָא</span> (Génesis 38:25). El
              Santo se lo devuelve medido: «tú dijiste haker-na; por tu vida, te dirán haker-na»
              (Bereshit Rabá 85:11).
            </p>
            <p className="text-parchment/70">
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
                Lectura de Jashmal (drash):
              </span>{" "}
              pero el espejo no es solo castigo: es <span className="text-gold/85">invitación a
              reparar</span>. La primera vez, «reconocer» fue el arma del engaño. La segunda,
              Yehudá toma esa misma palabra y la convierte en confesión. El verbo que hirió a su
              padre se vuelve el verbo que lo redime.{" "}
              <span className="italic">(Síntesis homilética nuestra, sobre la base verificada de
              Bereshit Rabá 85:11 — no es cita literal.)</span>
            </p>
          </div>
        </Section>

        <PullQuote
          he="אַתָּה אָמַרְתָּ לְאָבִיךָ הַכֶּר נָא... חַיֶּיךָ שֶׁתָּמָר אוֹמֶרֶת לְךָ הַכֶּר נָא"
          es="Tú le dijiste a tu padre «reconoce, por favor»… por tu vida, que Tamar te dirá a ti «reconoce, por favor»."
          source="Midrash, Bereshit Rabá 85:11"
        />

        {/* ── Sod ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · El descenso que era el camino
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
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
            </p>
            <p>
              Y no es un escándalo aislado: la línea del Mashíaj atraviesa{" "}
              <span className="text-gold/90">dos caídas a propósito en la misma página del Talmud</span>
              {" "}—la de las hijas de Lot (→ Moab → Rut) y la de Yehudá con Tamar (→ Péretz)—,
              ambas en Nazir 23b bajo <span className="hebrew" dir="rtl">גְּדוֹלָה עֲבֵרָה לִשְׁמָהּ</span>.
              Pero Yehudá añade algo único: su nombre se vuelve el <span className="text-gold/90">Nombre
              de Dios</span>. <span className="hebrew" dir="rtl">יהוה</span> + <span className="hebrew" dir="rtl">ד</span> = <span className="hebrew text-gold/90" dir="rtl">יהודה</span>.
              La dálet —letra de la <span className="italic">dalut</span>, la pobreza, la humildad
              del que no tiene nada propio— es justo lo que el rey añade al Nombre cuando se
              inclina y confiesa.
            </p>
            <p className="font-cinzel text-base text-gold/90">
              Yehudá → Péretz → Boaz → Oved → Yishai → David → el Mashíaj.
            </p>
            <p>
              El Mashíaj ben David es Mashíaj de la <span className="text-gold/90">casa de Yehudá</span>:
              el linaje del Redentor pasa, en línea recta, por el hombre que se declaró culpable
              (Génesis 38:29; Rut 4:18-22).
            </p>
          </div>

          {/* Sello de la serie: נחש = 358 = משיח */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="נָחָשׁ" sub="Serpiente · 358" color="#b06a3c" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="מָשִׁיחַ" sub="Mashíaj · 358" color="#c9a43e" />
          </div>
          <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted">
            La misma fuerza que parece arrastrar al hombre hacia abajo —la caída, la vergüenza,
            el descenso—, elevada por una confesión, es la fuerza que corona. De la caída de un
            líder brotó el cetro que no se aparta jamás.
          </p>
        </Section>

        {/* ── PaRDeS ── */}
        <Section>
          <h3 className="mb-6 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            פרד״ס · Las cuatro lecturas
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "Pshat",
                txt: "Yehudá desciende de su liderazgo, se aparta de sus hermanos, y sin reconocerla concibe de su nuera Tamar. Al ir ella al fuego, él confiesa: «ella es más justa que yo» (Génesis 38:1, 26).",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "El nombre lo insinúa todo: Leá lo llamó Yehudá al «agradecer» (odé, Berajot 7b), y él se salva al «reconocer/confesar» (vayaker). El mismo nombre significa agradecer y confesar la culpa.",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "«Más vale arrojarse al horno que avergonzar a otro en público» (Sotá 10b): Tamar le dejó la salida, y Yehudá la tomó. Medida por medida del haker-na que usó con su padre (Bereshit Rabá 85:11), redimido al volver «haker-na» una confesión.",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "Las nitzotzot caídas en la klipá: la realeza se rescata desde abajo. יהוה+ד = יהודה: la dálet de la humildad insertada en el Nombre por quien se inclina. Yeridá tzórej aliyá — el «descendió» del inicio es el método con que el cetro mesiánico se planta en la tierra.",
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

        {/* ── Síntesis ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              יְרִידָה צוֹרֶךְ עֲלִיָּה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              El rey que se declaró culpable
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              Un hombre que cayó de su grandeza, condenó por error a su propia nuera, y pudo
              salvarse callando. En vez de eso eligió dos palabras desnudas —«ella es más justa
              que yo»— y con ellas se hundió en público para salvar una vida. El Cielo le
              respondió poniendo Su propio Nombre dentro del suyo y haciéndolo raíz del trono que
              no se aparta. La caída… era el camino. La confesión… era la corona.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Yehudá y Tamar · Génesis 38", ref: "Genesis 38" },
                { label: "«Tzadká mimeni» · Génesis 38:26", ref: "Genesis 38:26" },
                { label: "El Nombre en Yehudá · Sotá 10b", ref: "Sotah 10b" },
                { label: "«Esta vez agradeceré» · Berajot 7b", ref: "Berakhot 7b" },
                { label: "El cetro de Yehudá · Génesis 49:10", ref: "Genesis 49:10" },
                { label: "Péretz → David · Rut 4", ref: "Ruth 4" },
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
              Estudiar este misterio en Jashmal →
            </button>

            {/* Hemshej — umbral «Sigue el hilo» */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/tamar" className="hover:text-gold">Tamar: el velo que escondía al Mesías →</Link>
              <Link href="/misterio/lot" className="hover:text-gold">Lot: las dos hijas sin nombre →</Link>
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
