"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: BAT-SHEVA (Betsabé) ───────────────────────────────────
// "El viajero que se quedó a vivir" — la caída de David leída en clave de Suká 52b
// (helej → oréaj → ish) y Shabat 56a, con el Sod de las nitzotzot.
// Idioma principal: español (el video de TikTok es en español).
//
// FARSI: traducción verificada por el Sofer (editor-erudito). locale === "fa"
//   renderiza <BetsabeFarsi/>. Fuentes y gematrías comprobadas contra Sefaria:
//   · Suká 52b — בַּתְּחִלָּה קְרָאוֹ הֵלֶךְ … אוֹרֵחַ … אִישׁ (Rava) y Reish Lakish
//     (יִצְרוֹ שֶׁל אָדָם מִתְגַּבֵּר עָלָיו בְּכׇל יוֹם). Verificado palabra por palabra.
//   · Shabat 56a — כׇּל הָאוֹמֵר דָּוִד חָטָא אֵינוֹ אֶלָּא טוֹעֶה; גֵּט כְּרִיתוּת; מוֹרֵד
//     בַּמַּלְכוּת; שֶׁבִּיקֵּשׁ לַעֲשׂוֹת וְלֹא עָשָׂה. Verificado contra Sefaria.
//   · נָחָשׁ = 50+8+300 = 358 = מָשִׁיחַ = 40+300+10+8. Calculado y verificado.
//   · 2 Samuel 11–12 (12:4 הֵלֶךְ, 12:7 אַתָּה הָאִישׁ, 12:13 חָטָאתִי, 12:24-25 יְדִידְיָהּ);
//     1 Reyes 15:5 (salvedad de Uriá); Salmo 51:12 לֵב טָהוֹר. Todo verificado.
// GUARDARRAÍL: el "filo legal" (Shabat 56a) NO borra el plano moral del Pshat;
//   se etiqueta como lectura halájica de plano distinto, igual que en español.

// ── Las tres caras del viajero (Suká 52b) ─────────────────────────────────────
interface Etapa {
  he: string;
  name: string;
  sentido: string;
  color: string;
}

const ETAPAS: Etapa[] = [
  {
    he: "הֵלֶךְ",
    name: "Helej · «Viajero de paso»",
    sentido: "Entra como un caminante que solo pasa. No te pide nada. Un pensamiento que cruza, ligero, sin peso.",
    color: "#c9a43e",
  },
  {
    he: "אוֹרֵחַ",
    name: "Oréaj · «Huésped»",
    sentido: "Ya se sentó a tu mesa. Lo alojas, lo atiendes. La idea volvió, y esta vez le hiciste lugar.",
    color: "#e0a850",
  },
  {
    he: "אִישׁ",
    name: "Ish · «El hombre / el amo»",
    sentido: "Ya es el dueño de la casa. Lo que entró de paso ahora manda. El huésped se volvió señor.",
    color: "#f0d060",
  },
];

// ── Página en FARSI (رندر شده وقتی locale === "fa") ──────────────────────────
function BetsabeFarsi() {
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

  // ── سه چهره‌ی مسافر (سوکا ۵۲ب) ──
  const ETAPAS_FA = [
    {
      he: "הֵלֶךְ",
      name: "هِلِخ · «مسافرِ گذری»",
      sentido: "همچون رهگذری وارد می‌شود که فقط می‌گذرد. از تو چیزی نمی‌خواهد. فکری که سبک‌بار عبور می‌کند، بی‌وزن.",
      color: "#c9a43e",
    },
    {
      he: "אוֹרֵחַ",
      name: "اورِئَح · «مهمان»",
      sentido: "دیگر بر سفره‌ات نشسته است. جایش می‌دهی، پذیرایی‌اش می‌کنی. آن فکر بازگشت، و این بار برایش جا باز کردی.",
      color: "#e0a850",
    },
    {
      he: "אִישׁ",
      name: "ایش · «مرد / صاحب‌خانه»",
      sentido: "اکنون صاحب خانه است. آنچه گذری وارد شد، حالا فرمان می‌راند. مهمان، آقا شد.",
      color: "#f0d060",
    },
  ];

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
            دوم سموئیل ۱۱–۱۲ · تلمود · سود
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(44px, 13vw, 92px)", color: "#fdf4dd",
              textShadow: "0 0 24px #c9a43e88" }}>
            בַּת־שֶׁבַע
          </h1>
          <h2 className="text-xl font-bold text-parchment/90 sm:text-2xl">
            مسافری که ماندگار شد
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
            چه کسی با بَت‌شِبَع هم‌بستر شد: داوودِ پادشاه… یا بیگانه‌ای که چون رهگذری
            گذری وارد شد؟ تلمود مشهورترین سقوط کتاب مقدس را با یک تصویر می‌خواند
            —مهمانی که سرانجام صاحب‌خانه می‌شود— و در ریشه‌اش، سرچشمه‌ی نور مَشیَح
            را پنهان کرده است.
          </p>
        </div>

        {/* ── داستان ── */}
        <Sec>
          <h3 className="mb-2 text-sm uppercase tracking-[0.3em] text-gold/60">
            داستان
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              داوود در اورشلیم می‌ماند، حال آنکه سپاهش در جنگ است. از پشت‌بام زنی را می‌بیند،{" "}
              <span className="text-gold/90">بَت‌شِبَع</span>، همسر اوریای حِتّی که در میدان نبرد است.
              او را احضار می‌کند. زن باردار می‌شود. داوود می‌کوشد آن را بپوشاند و اوریا را از اردوگاه
              بازمی‌گرداند، اما سرباز نمی‌پذیرد که در خانه‌اش بخوابد در حالی که صندوق عهد و همرزمانش
              در خیمه‌ها هستند. آنگاه داوود فرمان می‌دهد او را به خطِ مقدم نبرد بفرستند، جایی که کشته
              می‌شود. (دوم سموئیل ۱۱)
            </p>
            <p>
              سپس خداوند نبی <span className="text-gold/90">ناتان</span> را می‌فرستد.
              رو در رو متهم نمی‌کند: حکایتی می‌گوید. ثروتمندی بود با گله‌های فراوان و فقیری با تنها
              یک برّه‌ی کوچک که چون دختری پرورده بود. «و مسافری نزد مردِ ثروتمند آمد، و او دریغ کرد
              که از گله‌ی خود برای آن مهمانی که نزدش رسیده بود بگیرد، پس برّه‌ی آن فقیر را گرفت»
              (دوم سموئیل ۱۲:۴). داوود از خشم برمی‌افروزد: «آن مرد سزاوار مرگ است!». و ناتان پاسخ می‌دهد:{" "}
              <span className="hebrew text-gold/90" dir="rtl">אַתָּה הָאִישׁ</span> — «تو آن مرد هستی»
              (دوم سموئیل ۱۲:۷).
            </p>
          </div>
        </Sec>

        {/* ── مسافر (هلخ → اورئح → ایش) ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-center text-sm uppercase tracking-[0.3em] text-gold/60">
            مسافر
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted" dir="rtl">
            حکایت ناتان را از نزدیک بنگر. برای نام بردن از آن مزاحم، آیه{" "}
            <span className="text-gold/80">سه واژه‌ی متفاوت، در همین ترتیب</span> به کار می‌برد.
            این اتفاقی نیست: تلمود (سوکا ۵۲ب) در آن سه واژه، تصویری دقیق می‌بیند از آنکه
            شر چگونه درون انسان عمل می‌کند.
          </p>
        </Sec>

        <div className="space-y-4">
          {ETAPAS_FA.map((p, i) => (
            <Sec key={p.he} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(40px, 11vw, 54px)", color: "#fff6e0",
                    textShadow: `0 0 16px ${p.color}` }}>
                  {p.he}
                </span>
                <div className="flex-1 text-right">
                  <p className="text-sm font-bold tracking-wide" style={{ color: p.color }}>
                    {p.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85" dir="rtl">{p.sentido}</p>
                </div>
              </div>
            </Sec>
          ))}
        </div>

        <PQ
          he="בַּתְּחִלָּה קְרָאוֹ הֵלֶךְ, וּלְבַסּוֹף קְרָאוֹ אוֹרֵחַ, וּלְבַסּוֹף קְרָאוֹ אִישׁ"
          fa="نخست او را «مسافر» خواند؛ سپس او را «مهمان» خواند؛ و سرانجام او را «مرد [صاحب‌خانه]» خواند."
          source="راوا — تلمود، سوکا ۵۲ب"
        />

        <Sec>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              از همین رو پرسشِ این مطالعه فریب نیست: <span className="italic">چه کسی به خانه‌ی داوود
              وارد شد؟</span> در سطح روح،{" "}
              <span className="text-gold/90">مسافری وارد شد</span> —تنها یک اندیشه از پشت‌بام— و،
              بی‌آنکه کسی بیرونش کند، مهمان شد، و مهمان صاحب‌خانه شد. همان مَثَلی که ناتان با آن
              متهمش می‌کند، <span className="text-gold/90">خودِ</span> نقشه‌ی سقوط اوست.
            </p>
            <p>
              و پیش‌تر، در همان صفحه، رِیش لاکیش هشدار داده بود: «یِتسِرِ انسان هر روز بر او چیره
              می‌شود و در پی کشتن اوست؛ و اگر آن قدوسِ متبارک یاری‌اش نکند، از پسِ آن برنمی‌آید»
              (سوکا ۵۲ب).
            </p>
          </div>
        </Sec>

        {/* ── پَشاط: سنگینی ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            פְּשָׁט · سنگینیِ آنچه رخ داد
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              بیایید کار را با شیرین‌کردنِ تلخی آغاز نکنیم. در معنای ظاهری، متن بسیار سخت است و خودِ
              تَنَخ نیز چنین با آن رفتار می‌کند. نبی کوچک نمی‌شمارد: «چرا کلام خداوند را خوار شمردی
              تا بدی کنی؟» (دوم سموئیل ۱۲:۹). پیامد هولناک است —«شمشیر از خانه‌ی تو دور نخواهد شد»
              (۱۲:۱۰)— و فرزند نخست می‌میرد. کتاب مقدس که خطاهای تقریباً همه‌ی قهرمانانش را می‌پوشاند،
              اینجا استثنایی می‌گذارد که هرگز پاک نمی‌کند: داوود آنچه را راست بود به‌جا آورد{" "}
              <span className="text-gold/90">«جز در ماجرای اوریای حِتّی»</span>{" "}
              (اول پادشاهان ۱۵:۵).
            </p>
            <p>
              خَشمَل از این نمی‌گریزد. مطالعه‌ای صادقانه پیش از جستنِ نور، این سنگینی را تاب می‌آورد.
              آنچه اکنون می‌آید <span className="text-gold/90">آنچه را در بالا گفته شد باطل نمی‌کند</span>:
              آن را ژرف‌تر می‌خواند.
            </p>
          </div>
        </Sec>

        {/* ── نامه‌ای که پرونده را دگرگون کرد ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            نامه‌ای که پرونده را دگرگون کرد
          </h3>

          {/* یادداشت صداقت — قرائت هلاخایی، سطوح متفاوت */}
          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/55">
              یادداشت صادقانه
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir="rtl">
              آنچه در پی می‌آید قرائت هلاخاییِ تلمود (شَبات ۵۶الف) است. این، سطح اخلاقیِ پَشاط را
              پاک نمی‌کند؛ سطح <span className="text-gold/85">حقوقی</span> را دقیق می‌کند.
              حُکَما هر دو را هم‌زمان انجام می‌دهند: داوود را در برابر دادگاه انسانی دفاع می‌کنند{" "}
              <span className="text-gold/85">و</span> سقوط او را در برابر آسمان نگاه می‌دارند.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              تلمود (شَبات ۵۶الف) نکته‌ای از حقوق جنگِ آن روزگار می‌آورد:
              «هر که از خاندان داوود به جنگ می‌رفت، برای همسرش طلاق‌نامه‌ای مشروط می‌نوشت»
              (<span className="hebrew" dir="rtl">גֵּט כְּרִיתוּת</span>)
              —تا اگر سرباز بازنمی‌گشت و شاهدی بر مرگش نبود، همسر «در بند» (عَگونا) نماند.
              چون اوریا کشته شد، بنا بر این قرائت بَت‌شِبَع{" "}
              <span className="text-gold/90">به‌طور بازگشتی مطلقه</span>{" "}
              شمرده می‌شد، از همان دمی که اوریا رهسپار شد. در سطح فنی، این زنای مستوجبِ مرگ نبود.
            </p>
            <p>
              و درباره‌ی مرگ اوریا: تلمود آن را{" "}
              <span className="text-gold/90">مورِد بِمَلخوت</span> —شورشگر در برابر تخت پادشاهی— می‌خواند،
              زیرا فرمان پادشاه را در حضور خودِ پادشاه به چالش کشید (دوم سموئیل ۱۱:۱۱). در آن سطح،
              او گناهکارِ قتل در برابر دادگاه نبود.
            </p>
          </div>
        </Sec>

        <PQ
          he="כָּל הָאוֹמֵר דָּוִד חָטָא אֵינוֹ אֶלָּא טוֹעֶה"
          fa="هر که بگوید داوود گناه کرد، جز در اشتباه نیست."
          source="ربی شموئل بَر نَحمان به نام ربی یوناتان — شَبات ۵۶الف"
        />

        {/* ── دو لبه ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            שְׁנֵי פִיּוֹת · دو لبه
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              راز اینجاست، و خَشمَل آن را به‌زور حل نمی‌کند:{" "}
              <span className="text-gold/90">هر دو قرائت حقیقت‌اند، در سطوح متفاوت.</span>
            </p>
            <p>
              <span className="text-gold/90">لبه‌ی حقوقی:</span> در برابر دادگاه انسانی
              —طلاق‌نامه‌ی مشروط، اوریای شورشگر— داوود محکوم‌شدنی نیست. «خواست بدی کند و نکرد»
              (<span className="hebrew" dir="rtl">שֶׁבִּיקֵּשׁ לַעֲשׂוֹת וְלֹא עָשָׂה</span>، شَبات ۵۶الف):
              <span className="italic">نیّت</span> ناشایست بود، اما{" "}
              <span className="italic">فعل</span> از نظر فنی آن جنایتی نبود که می‌نماید.
            </p>
            <p>
              <span className="text-gold/90">لبه‌ی صَدّیق:</span> و با این همه، همان داوود،
              همدمِ شِخینا، با معیاری بس بلند سنجیده می‌شود. از این‌رو بی‌درنگ اعتراف می‌کند:{" "}
              <span className="hebrew text-gold/90" dir="rtl">חָטָאתִי לַיהוָה</span>{" "}
              — «نزد خداوند گناه کردم» (دوم سموئیل ۱۲:۱۳). از این‌رو تَنَخ استثنای اوریا را نگاه می‌دارد
              (اول پادشاهان ۱۵:۵). و از این‌رو از این داستان{" "}
              <span className="text-gold/90">مزمور ۵۱</span> زاده می‌شود، برهنه‌ترین تِشووای
              تمام کتاب مقدس.
            </p>
            <p>
              آن که «گناه نکرد» همان است که می‌نویسد «گناهم را به‌تمامی بشوی… دلی پاک در من بیافرین،
              ای خدا» (مزمور ۵۱). این تناقض نیست: این تفاوتِ میان آن چیزی است که دادگاه می‌تواند داوری
              کند و آن چیزی که روحی بزرگ از خود می‌طلبد.{" "}
              <span className="text-gold/90">مسافر را با هلاخاها بیرون نمی‌کنند؛ او را با تِشووا
              بیرون می‌کنند.</span>
            </p>
          </div>
        </Sec>

        <PQ
          he="לֵב טָהוֹר בְּרָא־לִי אֱלֹהִים"
          fa="خدایا، دلی پاک در من بیافرین، و روحی استوار در درونم تازه گردان."
          source="مزمور ۵۱:۱۲"
        />

        {/* ── سود ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · جرقه در پست‌ترین جایگاه
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              و اکنون آن چرخشی که سراسر این سلسله را تعریف می‌کند. چرا مشیّت اجازه می‌دهد که پادشاهیِ
              ابدی درست همین‌جا، در تاریک‌ترین رویداد، گره بخورد؟
            </p>
            <p>
              کابالا قانونی از جهان را می‌خواند: والاترین نور به پست‌ترین جایگاه فرومی‌افتد و چشم‌به‌راهِ
              رهایی می‌ماند. این‌ها <span className="text-gold/90">نیتسوتسوت</span> هستند، جرقه‌های
              مقدسِ گرفتار در <span className="italic">کلیپوت</span> (پوسته‌ها، آنچه ناپاک می‌نماید).
              نسبِ رهاننده از آسمانِ پاک فرود نمی‌آید: از پایین{" "}
              <span className="text-gold/90">بازرهانده</span> می‌شود، تار به تار،
              از همان جاهایی که جهان دلش می‌خواهد بپوشاند.
            </p>
            <p>
              از همین رو از همین پیوند، پس از سوگواری و تِشووا،{" "}
              <span className="text-gold/90">شِلومو</span> زاده می‌شود —و نبی ناتان، همان که متهم کرد،
              بازمی‌گردد تا نامی دوم از آسمان بر او بنهد:{" "}
              <span className="hebrew text-gold/90" dir="rtl">יְדִידְיָהּ</span>، یِدیدیا،
              «محبوبِ خداوند» (دوم سموئیل ۱۲:۲۴–۲۵). از شِلومو، خاندان داوود؛ از خاندان داوود،{" "}
              <span className="text-gold/90">مَشیَح</span>. ناممکن‌ترین جرقه، خود سرچشمه از آب درآمد.
            </p>
            <p className="text-base text-gold/90">
              بَت‌شِبَع ← شِلومو ← خاندان داوود ← مَشیَح.
            </p>
            <p>
              و در کنار تامار (که داوود از او می‌آید) و روت (موآبی)، بَت‌شِبَع یکی دیگر از{" "}
              <span className="text-gold/90">مادران مَشیَح از ریشه‌ای ناممکن</span> است.
            </p>
          </div>

          {/* مهر سلسله: נחש = ۳۵۸ = משיח */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#b06a3c99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #b06a3c33" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(56px,14vw,78px)", color: "#fff6e0", textShadow: "0 0 22px #b06a3c, 0 0 8px #b06a3c" }}>נָחָשׁ</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#b06a3c" }}>نَحاش · مار · ۳۵۸</span>
            </div>
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(56px,14vw,78px)", color: "#fff6e0", textShadow: "0 0 22px #c9a43e, 0 0 8px #c9a43e" }}>מָשִׁיחַ</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>مَشیَح · مسیح · ۳۵۸</span>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted" dir="rtl">
            همان نیرویی که انسان را به‌سوی پایین می‌کشد، چون برافراشته و تصحیح شود، همان نیرویی است
            که می‌رهاند. مسافری که نزدیک بود خانه‌ی داوود را ویران کند، رهانده‌شده، همان است که
            آن را تا مَشیَح هدایت می‌کند.
          </p>
        </Sec>

        {/* ── פרד״ס ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            פרד״ס · چهار قرائت
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "پَشاط",
                txt: "پادشاهی سقوط می‌کند: می‌خواهد، می‌گیرد، می‌پوشاند و می‌کشد. نبی او را رویارو می‌کند، پادشاه اعتراف می‌کند، فرزند می‌میرد. کتاب مقدس آن را پنهان نمی‌کند (دوم سموئیل ۱۱–۱۲؛ اول پادشاهان ۱۵:۵).",
              },
              {
                he: "רֶמֶז", name: "رِمِز",
                txt: "سه واژه‌ی حکایت ناتان —هِلِخ، اورِئَح، ایش— به سه مرحله‌ی هر وسوسه اشاره می‌کنند: اندیشه‌ی گذری ← عادتِ جای‌گرفته ← خویِ صاحب‌خانه (سوکا ۵۲ب).",
              },
              {
                he: "דְּרָשׁ", name: "دِراش",
                txt: "«هر که بگوید داوود گناه کرد در اشتباه است» و «خواست کند و نکرد» (شَبات ۵۶الف): حُکَما در سطح حقوقی از پادشاه دفاع می‌کنند بی‌آنکه تِشووای او را انکار کنند. (آوای حسیدی: بَعل شِم طوو — یِریدا تسوریخ عَلیا، فرود برای صعود است؛ از شکاف، نور بالا می‌آید.)",
              },
              {
                he: "סוֹד", name: "سود",
                txt: "نیتسوتسوتِ فروافتاده در کلیپا. نور مَشیَح از پست‌ترین جایگاه بازرهانده می‌شود (بَت‌شِبَع ← شِلومو ← داوود ← مَشیَح). به زبان بَعل هَسولام: تمام «فرود» همان روشی است که نور بی‌کرانِ ایْن سوف با آن در پایین مسکن‌پذیر می‌شود.",
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

        {/* ── חֲתִימָה ── */}
        <Sec>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: "0 0 12px #c9a43e88" }}>
              אַתָּה הָאִישׁ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              نگذار مسافر ماندگار شود
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              بیگانه‌ای که به خانه‌ی داوود وارد شد، چون رهگذری گذری وارد شد. کسی در را ناگهان به رویش
              نگشود: کم‌کم برایش جا باز شد، تا صاحب‌خانه شد. این تنها راهی است که شر، زندگی‌ای را تسخیر
              می‌کند —و تنها دفاع، نام بردنِ به‌هنگامِ آن است، چنان‌که داوود کرد: «گناه کردم». و حتی از
              همان سقوط، که با تِشووا تصحیح شد، خداوند توانست نور مَشیَح را برافروزد. آنچه جهان آن را
              پایان یک پادشاه می‌نامید، آسمان آن را سرچشمه‌ی رهاننده ساخت.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "مسافر · سوکا ۵۲ب", ref: "Sukkah 52b" },
                { label: "«داوود گناه نکرد» · شَبات ۵۶الف", ref: "Shabbat 56a" },
                { label: "مَثَلِ ناتان · دوم سموئیل ۱۲", ref: "II Samuel 12" },
                { label: "تِشووا · مزمور ۵۱", ref: "Psalms 51" },
                { label: "شِلومو / یِدیدیا · دوم سموئیل ۱۲:۲۴", ref: "II Samuel 12:24" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("II Samuel 12")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              ← مطالعه‌ی این راز در خَشمَل
            </button>

            {/* הֶמְשֵׁךְ — ادامه‌ی مسیر */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/linaje" className="hover:text-gold">← چهار مادر مَشیَح</Link>
              <Link href="/misterio/tamar" className="hover:text-gold">← تامار: نقابی که مسیح را پنهان کرد</Link>
              <Link href="/misterios" className="hover:text-gold">← رازهای بیشتر</Link>
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

// ── Componentes (idénticos en estilo a /misterio/tamar) ───────────────────────
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

// Tile oscuro con letra hebrea grande (legible en cualquier tema).
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
export default function BetsabePage() {
  const locale = useLocale();
  const router = useRouter();

  const [dark, setDark] = useState(true);
  // Las páginas de misterio van SIEMPRE en oscuro: las letras hebreas doradas y
  // el texto pergamino solo se leen bien sobre fondo #05050a.
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);

  // Farsi: estudio verificado por el Sofer → render dedicado en RTL/Vazirmatn.
  if (locale === "fa") return <BetsabeFarsi />;

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
            2 Samuel 11–12 · Talmud · Sod
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(44px, 13vw, 92px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            בַּת־שֶׁבַע
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            El viajero que se quedó a vivir
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            ¿Quién se acostó con Betsabé: el rey David… o un extraño que entró como
            caminante de paso? El Talmud lee la caída más célebre de la Biblia con una
            sola imagen —el huésped que termina siendo el amo— y, en su raíz, esconde
            el manantial de la luz del Mashíaj.
          </p>
        </div>

        {/* ── La historia ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La historia
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              David se queda en Jerusalén mientras su ejército está en la guerra. Desde
              la azotea ve a una mujer, <span className="text-gold/90">Bat-Sheva</span>,
              esposa de Uriá el hitita, que está en el frente. La manda llamar. Ella queda
              encinta. David intenta encubrirlo haciendo volver a Uriá del campamento, pero
              el soldado se niega a dormir en su casa mientras el Arca y sus compañeros
              están en tiendas. Entonces David ordena ponerlo en la primera línea del
              combate, donde muere. (2 Samuel 11)
            </p>
            <p>
              Después Dios envía al profeta <span className="text-gold/90">Natán</span>.
              No acusa de frente: cuenta un cuento. Había un rico con muchos rebaños y un
              pobre con una sola ovejita, criada como una hija. «Y vino un viajero al hombre
              rico, y este, por no tomar de su propio ganado para el huésped que le había
              llegado, tomó la ovejita del pobre» (2 Samuel 12:4). David se enciende de
              ira: «¡Ese hombre merece la muerte!». Y Natán responde:{" "}
              <span className="hebrew text-gold/90" dir="rtl">אַתָּה הָאִישׁ</span> — «Tú
              eres ese hombre» (2 Samuel 12:7).
            </p>
          </div>
        </Section>

        {/* ── El viajero (helej → oréaj → ish) ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            El viajero
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            Mira de cerca el cuento de Natán. Para nombrar al intruso, el verso usa{" "}
            <span className="text-gold/80">tres palabras distintas, en este orden</span>.
            No es casualidad: el Talmud (Suká 52b) ve en esas tres palabras el retrato
            exacto de cómo trabaja el mal dentro del ser humano.
          </p>
        </Section>

        <div className="space-y-4">
          {ETAPAS.map((p, i) => (
            <Section key={p.he} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(40px, 11vw, 54px)", color: dark ? "#fff6e0" : "#3a2a08",
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

        <PullQuote
          he="בַּתְּחִלָּה קְרָאוֹ הֵלֶךְ, וּלְבַסּוֹף קְרָאוֹ אוֹרֵחַ, וּלְבַסּוֹף קְרָאוֹ אִישׁ"
          es="Al principio lo llamó viajero; después lo llamó huésped; y al final lo llamó hombre [el amo]."
          source="Rava — Talmud, Suká 52b"
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Por eso la pregunta del reel no es un truco: <span className="italic">¿quién
              entró en la casa de David?</span> En el plano del alma,{" "}
              <span className="text-gold/90">entró un viajero</span> —un solo pensamiento
              desde la azotea— y, sin que nadie lo echara, se volvió huésped, y el huésped
              se volvió amo. La misma parábola con que Natán lo acusa <span className="text-gold/90">es</span>{" "}
              el mapa de su propia caída.
            </p>
            <p>
              Y antes, en esa misma página, Reish Lakish ya lo había advertido: «El yétzer
              del hombre se fortalece contra él cada día y busca matarlo; y si el Santo,
              bendito sea, no lo ayudara, no podría con él» (Suká 52b).
            </p>
          </div>
        </Section>

        {/* ── Pshat: el peso ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            פְּשָׁט · El peso de lo que pasó
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              No empecemos por dorar la píldora. En su sentido llano, el texto es durísimo
              y el propio Tanaj lo trata así. El profeta no minimiza: «¿Por qué despreciaste
              la palabra de Dios para hacer el mal?» (2 Samuel 12:9). La consecuencia es
              terrible —«no se apartará la espada de tu casa» (12:10)— y el primer hijo
              muere. La Escritura, que oculta las faltas de casi todos sus héroes, aquí deja
              una salvedad que jamás borra: David hizo lo recto{" "}
              <span className="text-gold/90">«salvo en el asunto de Uriá el hitita»</span>{" "}
              (1 Reyes 15:5).
            </p>
            <p>
              Jashmal no esquiva esto. Un estudio honesto sostiene el peso antes de buscar
              la luz. Lo que viene ahora <span className="text-gold/90">no anula</span> lo
              de arriba: lo lee más hondo.
            </p>
          </div>
        </Section>

        {/* ── La carta que cambió el caso ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La carta que cambió el caso
          </h3>

          {/* Sello de honestidad — lectura halájica, planos distintos */}
          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              Lo que sigue es la lectura halájica del Talmud (Shabat 56a). No borra el plano
              moral del Pshat; precisa el plano <span className="text-gold/85">legal</span>.
              Chazal hace las dos cosas a la vez: defiende a David ante el tribunal humano{" "}
              <span className="text-gold/85">y</span> conserva su caída ante el Cielo.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Talmud (Shabat 56a) trae un dato del derecho de guerra de aquel tiempo:
              «Todo el que salía a la guerra de la casa de David escribía a su mujer una
              carta de divorcio condicional» (<span className="hebrew" dir="rtl">גֵּט כְּרִיתוּת</span>)
              —para que, si el soldado no volvía y no había testigos de su muerte, la esposa
              no quedara «anclada» (aguná). Como Uriá murió, según esta lectura Bat-Sheva
              resultaba <span className="text-gold/90">retroactivamente divorciada</span>{" "}
              desde que él partió. En el plano técnico, no era adulterio capital.
            </p>
            <p>
              Y sobre la muerte de Uriá: el Talmud lo lee como{" "}
              <span className="text-gold/90">mored bemaljut</span> —rebelde contra el trono—
              porque desafió la orden del rey en presencia del rey (2 Samuel 11:11). En ese
              plano, no era reo de homicidio ante un tribunal.
            </p>
          </div>
        </Section>

        <PullQuote
          he="כָּל הָאוֹמֵר דָּוִד חָטָא אֵינוֹ אֶלָּא טוֹעֶה"
          es="Todo el que dice que David pecó, no es sino un equivocado."
          source="R. Shmuel bar Najmán en nombre de R. Yonatán — Shabat 56a"
        />

        {/* ── Los dos filos ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            שְׁנֵי פִיּוֹת · Los dos filos
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Aquí está el misterio, y Jashmal no lo resuelve a la fuerza:{" "}
              <span className="text-gold/90">las dos lecturas son verdad, en planos
              distintos.</span>
            </p>
            <p>
              <span className="text-gold/90">Filo legal:</span> ante un tribunal humano
              —carta de divorcio, Uriá rebelde— David no es condenable. «Buscó hacer el mal
              y no lo hizo» (<span className="hebrew" dir="rtl">ביקש לעשות ולא עשה</span>,
              Shabat 56a): la <span className="italic">intención</span> fue impropia, el{" "}
              <span className="italic">acto</span>, técnicamente, no fue el crimen que parece.
            </p>
            <p>
              <span className="text-gold/90">Filo del tzadik:</span> y sin embargo el mismo
              David, íntimo de la Shejiná, se mide por una vara altísima. Por eso confiesa
              de inmediato: <span className="hebrew text-gold/90" dir="rtl">חָטָאתִי לַיהוָה</span>{" "}
              — «He pecado contra Dios» (2 Samuel 12:13). Por eso el Tanaj guarda la salvedad
              de Uriá (1 Reyes 15:5). Y por eso de esta historia nace{" "}
              <span className="text-gold/90">el Salmo 51</span>, la teshuvá más desnuda de
              toda la Escritura.
            </p>
            <p>
              El que «no pecó» es el mismo que escribe «lava del todo mi culpa… un corazón
              puro créame, oh Dios» (Salmo 51). No es contradicción: es la diferencia entre
              lo que un tribunal puede juzgar y lo que un alma grande exige de sí.{" "}
              <span className="text-gold/90">El viajero no se echa con halajot; se echa con
              teshuvá.</span>
            </p>
          </div>
        </Section>

        <PullQuote
          he="לֵב טָהוֹר בְּרָא־לִי אֱלֹהִים"
          es="Un corazón puro créame Dios, y un espíritu firme renueva en mí."
          source="Salmo 51:12"
        />

        {/* ── Sod ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · La chispa en el lugar más bajo
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Y ahora el vuelco que define a toda esta serie. ¿Por qué la Providencia
              permite que la realeza eterna se trence justo aquí, en el episodio más oscuro?
            </p>
            <p>
              La Cabalá lee una ley del mundo: la luz más alta cae al lugar más bajo y espera
              ser rescatada. Son las <span className="text-gold/90">nitzotzot</span>, las
              chispas santas atrapadas dentro de las <span className="italic">klipot</span>{" "}
              (las «cáscaras», lo que parece impuro). El linaje del Redentor no baja del cielo
              limpio: se <span className="text-gold/90">rescata</span> desde abajo, hilo por
              hilo, desde los lugares que el mundo querría tapar.
            </p>
            <p>
              Por eso de esta misma unión, después del duelo y la teshuvá, nace{" "}
              <span className="text-gold/90">Shlomó</span> —y el profeta Natán, el mismo que
              acusó, vuelve para ponerle un segundo nombre del Cielo:{" "}
              <span className="hebrew text-gold/90" dir="rtl">יְדִידְיָהּ</span>, Yedidiá,
              «amado de Dios» (2 Samuel 12:24-25). De Shlomó, la casa de David; de la casa de
              David, el <span className="text-gold/90">Mashíaj</span>. La chispa más improbable
              resultó ser el manantial.
            </p>
            <p className="font-cinzel text-base text-gold/90">
              Bat-Sheva → Shlomó → Casa de David → el Mashíaj.
            </p>
            <p>
              Y junto a Tamar (de quien viene David) y Rut (la moabita), Bat-Sheva es otra de
              las <span className="text-gold/90">madres del Mashíaj desde una raíz imposible</span>.
            </p>
          </div>

          {/* Sello de la serie: נחש = 358 = משיח */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="נָחָשׁ" sub="Serpiente · 358" color="#b06a3c" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="מָשִׁיחַ" sub="Mashíaj · 358" color="#c9a43e" />
          </div>
          <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted">
            La misma fuerza que arrastra al hombre hacia abajo, elevada y reparada, es la
            fuerza que redime. El viajero que casi destruye la casa de David es, redimido,
            el que la conduce hasta el Mashíaj.
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
                txt: "Un rey cae: desea, toma, encubre y mata. El profeta lo confronta, el rey confiesa, el hijo muere. La Escritura no lo oculta (2 Samuel 11–12; 1 Reyes 15:5).",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "Las tres palabras del cuento de Natán —helej, oréaj, ish— insinúan las tres etapas de toda tentación: pensamiento de paso → hábito alojado → carácter dueño (Suká 52b).",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "«El que dice que David pecó se equivoca» y «buscó hacer y no hizo» (Shabat 56a): los Sabios defienden al rey en el plano legal sin negar su teshuvá. (Voz jasídica: el Baal Shem Tov — yerida tzórej aliá, el descenso es para el ascenso; desde la grieta sube la luz.)",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "Las nitzotzot caídas en la klipá. La luz del Mashíaj se rescata desde el lugar más bajo (Bat-Sheva → Shlomó → David → Mashíaj). En clave de Baal HaSulam: todo el «descenso» es el método con que el Or Ein Sof se hace habitable abajo.",
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
              אַתָּה הָאִישׁ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              No dejes que el viajero se quede a vivir
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              El extraño que entró en la casa de David entró como un caminante de paso. Nadie
              le abrió la puerta de golpe: se le hizo sitio de a poco, hasta volverse amo. Esa
              es la única forma en que el mal toma una vida —y la única defensa es nombrarlo a
              tiempo, como hizo David: «he pecado». Y aun de esa caída, reparada con teshuvá,
              Dios supo encender la luz del Mashíaj. Lo que el mundo señalaría como el final de
              un rey, el Cielo lo convirtió en el manantial del Redentor.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "El viajero · Sucá 52b", ref: "Sukkah 52b" },
                { label: "«David no pecó» · Shabat 56a", ref: "Shabbat 56a" },
                { label: "La parábola de Natán · 2 Sam 12", ref: "II Samuel 12" },
                { label: "La teshuvá · Salmo 51", ref: "Psalms 51" },
                { label: "Shlomó / Yedidiá · 2 Sam 12:24", ref: "II Samuel 12:24" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("II Samuel 12")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            {/* Hemshej — umbral «Sigue el hilo» */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/linaje" className="hover:text-gold">Ver a las cuatro madres del Mashíaj →</Link>
              <Link href="/misterio/tamar" className="hover:text-gold">Tamar: el velo que escondía al Mesías →</Link>
              <Link href="/misterios" className="hover:text-gold">Más misterios →</Link>
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
