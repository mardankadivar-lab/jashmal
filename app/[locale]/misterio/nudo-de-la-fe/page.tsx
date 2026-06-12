"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: EL NUDO DE LA FE ─────────────────────────────────────
// Serie de la Fe · misterio 1 · קִטְרָא דִּמְהֵימְנוּתָא (kitrá / kishrá dimhemnutá),
// "el nudo de la fe". El acto de atar Maljut (la Shejiná, la fe, lo que no se ve)
// a las sefirot superiores — el yijud, la unificación del Nombre.
//
// FUENTES VERIFICADAS POR EL SOFER (editor-erudito) contra la API de Sefaria:
//  · Berajot 7a — «מְלַמֵּד שֶׁהֶרְאָה הקב״ה לְמֹשֶׁה קֶשֶׁר שֶׁל תְּפִילִּין» (sobre Éxodo 33:23
//    «וְרָאִיתָ אֶת אֲחֹרָי»). Segmento verificado palabra por palabra.
//  · Zohar, Achrei Mot 50:305 — «...לְקַשְּׁרָא קִשְׁרָא דִּמְהֵימְנוּתָא דָּא בְּדָא כַּדְקָא חֲזֵי»
//    («atar el nudo de la fe uno con otro, como corresponde»). Verificado.
//  · Zohar, Vayeilech 6:35 — «...לְיַחֲדָא שְׁמָא קַדִּישָׁא וּלְקַשְּׁרָא קִשְׁרָא דִּמְהֵימְנוּתָא»
//    («unificar el Nombre santo y atar el nudo de la fe»). Verificado: el nudo = yijud.
//  · Tikunei Zohar 17a (Petaj Eliyahu) — «מַלְכוּת פֶּה, תּוֹרָה שֶׁבְּעַל פֶּה קָרִינָן לֵיהּ»:
//    Maljut es la "boca", la sefirá más baja, la que recibe. Verificado.
//  · רָזָא דִּמְהֵימְנוּתָא («el secreto de la fe») aparece ~295× en el Zohar: es idioma central.
//
// GUARDARRAÍLES DE HONESTIDAD:
//  · La grafía con TET (קִטְרָא) y con KUF-SHIN-RESH-ALEF (קִשְׁרָא) coexisten en arameo;
//    en el Zohar verificado en Sefaria la forma literal es קִשְׁרָא דִּמְהֵימְנוּתָא. Mostramos
//    ambas, sin afirmar que solo una es "correcta".
//  · amén = 91 = יהוה(26)+אדני(65): es una tradición clásica (Recanati; Menorat HaMaor sobre
//    la Amidá), NO un dato bíblico — se etiqueta como gematría clásica, no como pshat.
//  · "Maljut = emuná" es lectura del SOD (zóharico/luriano), no pshat. Va siempre en su nivel.

// ── Página en FARSI (رندر شده وقتی locale === "fa") ──────────────────────────
function NudoFarsi() {
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
            زوهر · سری ایمان · سود
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(34px, 10vw, 72px)", color: "#dbe7ff",
              textShadow: "0 0 26px #6f8fe888" }}>
            קִשְׁרָא דִּמְהֵימְנוּתָא
          </h1>
          <h2 className="text-xl font-bold text-parchment/90 sm:text-2xl">
            گِرِهِ ایمان
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold/55">
            هر صبح، ایمان را از نو گره می‌زنیم
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
            زوهر از «گِرِهِ ایمان» سخن می‌گوید — کِشرا دیمهیمنوتا. این گره چیزی را به چیزی
            دیگر می‌بندد: مَلخوت (شِخینا، آنچه دیده نمی‌شود) را به سِفیروت بالا. همان گره که
            خداوند از پشتِ سر به موسی نشان داد — «گِرِهِ تِفیلین» (بِراخوت ۷الف). هر بامداد که
            بازوبند را گره می‌زنیم، همان گرهِ ایمان را از نو می‌بندیم.
          </p>
        </div>

        {/* ── صادقانه ── */}
        <Sec>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/55">
              پیش از آغاز — یادداشت صادقانه
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir="rtl">
              «گِرِهِ ایمان» یک عبارتِ آرامیِ زوهری واقعی است: در زوهر (آحَری موت ۵۰:۳۰۵ و
              وَیِلِخ ۶:۳۵) به‌صورت{" "}
              <span className="hebrew text-gold/85" dir="rtl">קִשְׁרָא דִּמְהֵימְנוּתָא</span>{" "}
              آمده. این مطالعه ایمان را احساسِ مبهم نمی‌بیند، بلکه یک{" "}
              <span className="text-gold/90">گره</span> می‌داند: عملی که بالا و پایین را به هم می‌بندد.
              برابریِ «آمین = ۹۱» را به‌عنوان <span className="italic">سنتِ کلاسیک گِماتریا</span> می‌آوریم،
              نه به‌عنوان متنِ پشاط.
            </p>
          </div>
        </Sec>

        {/* ── תַּרְגּוּם ── */}
        <Sec>
          <h3 className="mb-2 text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · متن لنگرگاه و ترجمه
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              تِلمود می‌گوید وقتی موسی خواست جلالِ خدا را ببیند، خدا فرمود «پشتِ مرا خواهی دید»
              (خروج ۳۳:۲۳). رَبّی شیمعون حَسیدا می‌گوید:{" "}
              <span className="hebrew text-gold/90" dir="rtl">מְלַמֵּד שֶׁהֶרְאָה הקב״ה לְמֹשֶׁה קֶשֶׁר שֶׁל תְּפִילִּין</span>{" "}
              — «این می‌آموزد که خدا به موسی <span className="text-gold/90">گِرِهِ تِفیلین</span> را نشان داد»
              (بِراخوت ۷الف).
            </p>
            <p>
              زوهر این گره را نام‌گذاری می‌کند:{" "}
              <span className="hebrew text-gold/90" dir="rtl">קִשְׁרָא דִּמְהֵימְנוּתָא</span> —
              «گِرِهِ ایمان». و توضیح می‌دهد این گره چه می‌کند: کسی که نمی‌داند چگونه{" "}
              <span className="text-gold/90">نامِ مقدس را یگانه کند و گِرِهِ ایمان را ببندد</span>،
              برکت را به جهان نمی‌کشاند (زوهر، وَیِلِخ ۶:۳۵). پس گره = یگانه‌سازی (یِحود).
            </p>
          </div>
        </Sec>

        <PQ
          he="מַאן דְּלָא יָדַע לְיַחֲדָא שְׁמָא קַדִּישָׁא וּלְקַשְּׁרָא קִשְׁרָא דִּמְהֵימְנוּתָא"
          fa="کسی که نمی‌داند نامِ مقدس را یگانه کند و گِرِهِ ایمان را ببندد…"
          source="زوهر، وَیِلِخ ۶:۳۵"
        />

        {/* ── דו گره ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-center text-sm uppercase tracking-[0.3em] text-gold/60">
            دو واژه‌ی گره
          </h3>
          <div className="mb-8 flex flex-wrap justify-center gap-6">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(48px,12vw,68px)", color: "#eaf1ff", textShadow: "0 0 22px #6f8fe8, 0 0 8px #6f8fe8" }}>קֶשֶׁר</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>کِشِر · گره · ۶۰۰</span>
            </div>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(48px,12vw,68px)", color: "#fff6e0", textShadow: "0 0 22px #c9a43e, 0 0 8px #c9a43e" }}>אֱמוּנָה</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>اِمونا · ایمان · ۱۰۲</span>
            </div>
          </div>
        </Sec>

        {/* ── מְפָרְשִׁים ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            מְפָרְשִׁים · مفسران
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              <span className="text-[11px] uppercase tracking-widest text-gold/50">راشی (پشاط):</span>{" "}
              راشی بر بِراخوت ۷الف، «پشتِ من» را به <span className="text-gold/90">گِرِهِ تِفیلینِ سَر</span>
              می‌گیرد، که در پسِ سر بسته می‌شود — آنچه از پشت دیده می‌شود. حتی موسی فقط گره را دید،
              نه چهره را. ایمان همیشه از <span className="italic">پشت</span> دیده می‌شود.
            </p>
            <p>
              <span className="text-[11px] uppercase tracking-widest text-gold/50">پِتَح اِلیّاهو (تیکونی زوهر ۱۷الف):</span>{" "}
              مَلخوت را <span className="hebrew text-gold/90" dir="rtl">פֶּה</span> — «دهان، تورات شفاهی»
              می‌نامد: پایین‌ترین سِفیرا، آن که <span className="text-gold/90">نوری از خود ندارد</span> و فقط
              می‌پذیرد. دقیقاً آنجا که نوری دیده نمی‌شود، <span className="italic">باور</span> کار می‌کند.
              پس مَلخوت = شِخینا = ایمان: گره می‌بایست این سِفیرا را به بالا ببندد.
            </p>
          </div>
        </Sec>

        <PQ
          he="מַלְכוּת פֶּה. תּוֹרָה שֶׁבְּעַל פֶּה קָרִינָן לֵיהּ"
          fa="مَلخوت دهان است؛ آن را «تورات شفاهی» می‌خوانیم."
          source="تیکونی زوهر ۱۷الف (پِتَح اِلیّاهو)"
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
                txt: "خدا به موسی «گِرِهِ تِفیلین» را از پشت نشان داد (بِراخوت ۷الف، بر خروج ۳۳:۲۳). در سطح ساده، این گرهِ واقعیِ بندِ تِفیلینِ سَر است که هر روز در پسِ گردن بسته می‌شود.",
              },
              {
                he: "רֶמֶז", name: "رِمِز",
                txt: "אֱמוּנָה (ایمان) = ۱۰۲ = ۶×۱۷، و ۱۷ ارزشِ טוֹב (خوب) است: ایمان، شش‌بار خوبی. و آמֵן (آمین) = ۹۱ = יהוה(۲۶)+אדני(۶۵): واژه‌ای که ایمان را مُهر می‌کند، خود عددِ یگانگیِ دو نام است (سنتِ کلاسیک گِماتریا).",
              },
              {
                he: "דְּרָשׁ", name: "دِراش",
                txt: "بَعل شِم طوو: ایمان زمانی آزموده می‌شود که نور پنهان است. مَلخوت «نوری از خود ندارد»؛ پس هرجا تاریک‌تر است، گرهِ ایمان لازم‌تر. باور یعنی بستنِ پایینِ تاریک به بالای روشن، حتی وقتی پیوند دیده نمی‌شود.",
              },
              {
                he: "סוֹד", name: "سود",
                txt: "زوهر (آحَری موت ۵۰:۳۰۵): تورات «گِرِهِ ایمان را یکی‌با‌دیگر می‌بندد، آن‌چنان که شایسته است.» بَعل هَسولام: کارِ آدمی همین گره‌زدنِ مَلخوت به سِفیروت بالاست — یِحود، یگانه‌سازیِ نام، کشاندنِ برکت به جهان.",
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

        <PQ
          he="אוֹרַיְיתָא קִיוּמָא דְּכֹלָּא וּמְהֵימְנוּתָא דְּכֹלָּא לְקַשְּׁרָא קִשְׁרָא דִּמְהֵימְנוּתָא דָּא בְּדָא"
          fa="تورات قوامِ همه و ایمانِ همه است، تا گِرِهِ ایمان را یکی‌با‌دیگر ببندد."
          source="زوهر، آحَری موت ۵۰:۳۰۵"
        />

        {/* ── שֵׁמוֹת ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            שֵׁמוֹת · وزنِ نام: אמן / אמונה
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              ریشه‌ی <span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span> (ایمان) همان{" "}
              <span className="hebrew text-gold/90" dir="rtl">אמ״ן</span> است که{" "}
              <span className="text-gold/90">אָמֵן</span> (آمین)، <span className="text-gold/90">אֱמֶת</span> (حقیقت)
              و <span className="text-gold/90">אוֹמָן</span> (صنعتگرِ ماهر) را می‌سازد. یک ریشه، یک خوشه از معنا:
              ایمان همان <span className="italic">استواری</span> و <span className="italic">وفاداری</span> است،
              نه گمان. شولحان عاروخ (اورح حییم ۱۲۴:۶) آمین را چنین معنا می‌کند: «این برکت حقیقت است و من
              <span className="text-gold/90"> باور دارم</span>.» گفتنِ آمین، خودِ بستنِ گره است.
            </p>
          </div>
        </Sec>

        {/* ── הִתְבּוֹנְנוּת ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            הִתְבּוֹנְנוּת · تأمل
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              گره چیزی را نمی‌سازد — دو سرِ موجود را به هم می‌بندد. ایمان هم چیزی نمی‌آفریند؛
              <span className="text-gold/90"> آنچه را که جداافتاده می‌نمود، به‌هم می‌پیوندد</span>:
              زندگیِ روزمره‌ی من (مَلخوت، پایین) با سرچشمه‌ی پنهان (بالا).
            </p>
            <p>
              کجای زندگی‌ام «نوری از خود ندارد» و فقط ایمان می‌تواند آن را به بالا ببندد؟
              موسی تنها <span className="italic">گره</span> را دید، نه چهره را. شاید ایمان همین است:
              نه دیدنِ همه‌چیز، بلکه دیدنِ <span className="text-gold/90">گره</span> — این اطمینان که
              رشته، حتی ناپیدا، بسته است.
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
              <span className="text-gold/90">امروز یک گره را آگاهانه ببند.</span> اگر تِفیلین می‌بندی،
              لحظه‌ی بستنِ بازوبند را نقطه‌ی کاوانا کن: «این گره را می‌بندم تا{" "}
              <span className="italic">گِرِهِ ایمان</span> را از نو ببندم — پایینِ خود را به بالا.»
              اگر تِفیلین نمی‌بندی، یک عملِ <span className="text-gold/90">آمین</span> برگزین: یک برکت یا
              سخنِ نیکِ کسی را با گفتنِ «آمین» مُهر کن، با این آگاهی که آمین یعنی «<span className="italic">باور دارم</span>».
              امروز یک رشته‌ی گسسته را — اعتمادی، پیوندی، تعهدی — دوباره گره بزن.
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
              گره‌ای که بالا و پایین را یکی می‌کند
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              ایمان احساس نیست؛ یک <span className="text-parchment/80">گره</span> است — کِشرا دیمهیمنوتا.
              مَلخوت که «نوری از خود ندارد» به سِفیروت بالا بسته می‌شود؛ همان گره که خدا از پشت به موسی
              نشان داد. و آמֵן (آمین) = ۹۱ = יהוה+אדני: واژه‌ای که ایمان را مُهر می‌کند، خودْ عددِ
              یگانگیِ دو نام است.
            </p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
                style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(34px,9vw,50px)", color: "#eaf1ff", textShadow: "0 0 16px #6f8fe8" }}>אָמֵן</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>آمین · ۹۱</span>
              </div>
              <span className="font-cinzel text-2xl text-gold/40">=</span>
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
                style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(34px,9vw,50px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>יהוה · אדני</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>۲۶ + ۶۵ = ۹۱</span>
              </div>
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              هر بامداد، گره از نو بسته می‌شود.
            </p>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Berakhot 7a")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              ← مطالعه‌ی این راز در خَشمَل
            </button>

            {/* הֶמְשֵׁךְ — ادامه‌ی مسیر */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/habakuk" className="hover:text-gold">← «عادل به ایمانش زنده است»</Link>
              <Link href="/misterio/entrelazamiento" className="hover:text-gold">← درهم‌تنیدگی</Link>
              <Link href="/misterio/137" className="hover:text-gold">← راز ۱۳۷</Link>
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

// ── Componentes (idénticos en estilo a /misterio/ropas-de-luz) ────────────────
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
        style={{ fontSize: "clamp(48px, 12vw, 68px)", color: "#fff6e0", textShadow: `0 0 22px ${color}, 0 0 8px ${color}` }}
      >
        {he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function NudoDeLaFePage() {
  const locale = useLocale();
  const router = useRouter();
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);

  if (locale === "fa") return <NudoFarsi />;
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
            Zohar · Serie de la Fe · Sod
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(34px, 10vw, 72px)", color: dark ? "#dbe7ff" : "#28406e",
              textShadow: dark ? "0 0 26px #6f8fe888" : "none" }}>
            קִשְׁרָא דִּמְהֵימְנוּתָא
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            El Nudo de la Fe
          </h2>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/55">
            Cada mañana, volvemos a anudar la fe
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            El Zohar habla del «nudo de la fe» —<span className="italic">kishrá dimhemnutá</span>—.
            Ese nudo ata una cosa a otra: Maljut (la Shejiná, lo que no se ve) a las sefirot de
            arriba. Es el mismo nudo que Dios mostró a Moshé por detrás: «el nudo de los tefilín»
            (Berajot 7a). Cada amanecer, al anudarnos la correa, re-atamos ese mismo nudo de la fe.
          </p>
        </div>

        {/* ── Nota del Sofer (gancho honesto) ── */}
        <Section>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Antes de empezar — nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              «El nudo de la fe» es una expresión aramea zóharica <span className="text-gold/85">real</span>:
              aparece como <span className="hebrew text-gold/85" dir="rtl">קִשְׁרָא דִּמְהֵימְנוּתָא</span>{" "}
              en el Zohar (Achrei Mot 50:305 y Vayeilech 6:35), verificada palabra por palabra. Este
              estudio no trata la fe como un sentimiento vago, sino como un{" "}
              <span className="text-gold/90">nudo</span>: un acto que ata lo de arriba con lo de abajo.
              La igualdad «amén = 91» la presentamos como <span className="italic">tradición clásica de
              gematría</span>, no como texto del pshat.
            </p>
          </div>
        </Section>

        {/* ── Targum: el texto-ancla ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · El texto-ancla y su traducción
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Talmud cuenta que cuando Moshé pidió ver la gloria de Dios, Dios respondió:
              «verás <span className="italic">mi espalda</span>» (<span className="hebrew text-gold/90" dir="rtl">וְרָאִיתָ אֶת אֲחֹרָי</span>,
              Éxodo 33:23). Rabí Shimón Jasidá enseña:{" "}
              <span className="hebrew text-gold/90" dir="rtl">מְלַמֵּד שֶׁהֶרְאָה הקב״ה לְמֹשֶׁה קֶשֶׁר שֶׁל תְּפִילִּין</span>{" "}
              —«esto enseña que el Santo, bendito sea, le mostró a Moshé el{" "}
              <span className="text-gold/90">nudo de los tefilín</span>»— (Berajot 7a). Ni al
              profeta más grande se le muestra el rostro: se le muestra el <span className="italic">nudo</span>.
            </p>
            <p>
              El Zohar le pone nombre a ese nudo:{" "}
              <span className="hebrew text-gold/90" dir="rtl">קִשְׁרָא דִּמְהֵימְנוּתָא</span> —«el
              nudo de la fe»— y dice qué hace: quien no sabe{" "}
              <span className="text-gold/90">«unificar el Nombre santo y atar el nudo de la fe»</span> no
              atrae bendición al mundo (Zohar, Vayeilech 6:35). El nudo, entonces, <span className="italic">es</span>{" "}
              el yijud: la unificación.
            </p>
          </div>
        </Section>

        <PullQuote
          he="מְלַמֵּד שֶׁהֶרְאָה הַקָּדוֹשׁ בָּרוּךְ הוּא לְמֹשֶׁה קֶשֶׁר שֶׁל תְּפִילִּין"
          es="Esto enseña que el Santo, bendito sea, le mostró a Moshé el nudo de los tefilín."
          source="Talmud Bavlí, Berajot 7a (sobre Éxodo 33:23)"
        />

        {/* ── Las dos palabras ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Las dos palabras del nudo
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            Un <span className="text-gold/80">nudo</span> (kesher) no crea nada: junta dos extremos
            que ya existían. La <span className="text-gold/80">fe</span> (emuná) tampoco crea nada:
            ata lo de abajo, que parecía suelto, a lo de arriba.
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="קֶשֶׁר" sub="Kesher · nudo · 600" color="#6f8fe8" />
            <span className="font-cinzel text-2xl text-gold/40">·</span>
            <HebrewTile he="אֱמוּנָה" sub="Emuná · fe · 102" color="#c9a43e" />
          </div>
        </Section>

        {/* ── Mefarshim ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            מְפָרְשִׁים · Comentaristas
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Rashi (pshat):</span>{" "}
              sobre Berajot 7a, Rashi lee «mi espalda» como el{" "}
              <span className="text-gold/90">nudo del tefilín de la cabeza</span>, que se ata en la nuca —
              lo que se ve por detrás. Incluso a Moshé solo se le muestra el nudo, no el rostro. La fe
              siempre se mira <span className="italic">de espaldas</span>: desde dentro de la historia,
              no desde fuera.
            </p>
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Petaj Eliyahu (Tikunei Zohar 17a):</span>{" "}
              el «Petaj Eliyahu» nombra cada sefirá en el cuerpo divino y dice:{" "}
              <span className="hebrew text-gold/90" dir="rtl">מַלְכוּת פֶּה</span> —«Maljut es la boca, la
              Torá oral»—: la sefirá más baja, la que{" "}
              <span className="text-gold/90">no tiene luz propia</span> y solo recibe. Precisamente ahí,
              donde no se ve luz, opera el <span className="italic">creer</span>. Por eso la tradición zóharica
              llama a Maljut/Shejiná <span className="text-gold/90">mehemnutá</span>: la fe. El nudo debe
              atar esta sefirá de abajo a las de arriba.
            </p>
          </div>
        </Section>

        <PullQuote
          he="מַלְכוּת פֶּה. תּוֹרָה שֶׁבְּעַל פֶּה קָרִינָן לֵיהּ"
          es="Maljut es la boca; la llamamos «Torá oral»."
          source="Tikunei Zohar 17a (Petaj Eliyahu)"
        />

        {/* ── Remez: la gematría ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            רֶמֶז · La insinuación de los números
          </h3>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="אָמֵן" sub="Amén · 91" color="#6f8fe8" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="יהוה · אדני" sub="26 + 65 = 91" color="#c9a43e" />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span> (emuná, fe) ={" "}
              <span className="text-gold/90">102</span> = 6 × 17, y 17 es el valor de{" "}
              <span className="hebrew text-gold/90" dir="rtl">טוֹב</span> (tov, «bueno»): la fe es la
              bondad sostenida seis veces, los seis extremos del mundo atados.
            </p>
            <p>
              Y aquí está la joya: <span className="hebrew text-gold/90" dir="rtl">אָמֵן</span> (amén) ={" "}
              <span className="text-gold/90">91</span> = <span className="hebrew text-gold/90" dir="rtl">יהוה</span>{" "}
              (26) + <span className="hebrew text-gold/90" dir="rtl">אדני</span> (65). La palabra que{" "}
              <span className="italic">sella</span> la fe —amén, de la misma raíz <span className="hebrew" dir="rtl">אמ״ן</span> que
              emuná— es <span className="text-gold/90">exactamente el número de la unión de los dos Nombres</span>:
              el Nombre oculto (YHVH, de arriba) y el Nombre revelado (Adonai = Maljut, de abajo). Decir
              «amén» <span className="italic">es</span> anudar el nudo de la fe.{" "}
              <span className="text-parchment/55">(Gematrías calculadas por el Sofer; la igualdad amén=91 es
              tradición clásica — Recanati, Menorat HaMaor sobre la Amidá.)</span>
            </p>
          </div>
        </Section>

        {/* ── Drash ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            דְּרָשׁ · La fe se prueba donde no hay luz
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Petaj Eliyahu dijo que Maljut «no tiene luz propia». De ahí, el homilético: la fe no se
              necesita donde todo brilla, sino donde está oscuro.{" "}
              <span className="text-gold/90">Cuanto más baja la sefirá, más necesario el nudo.</span> Creer
              es atar el extremo oscuro de abajo al extremo luminoso de arriba — incluso cuando el hilo
              que los une no se ve.
            </p>
            <p>
              La voz del <span className="text-gold/90">Baal Shem Tov</span> se integra aquí: la fe se
              templa precisamente en el ocultamiento (<span className="italic">hester panim</span>). El
              creyente no es quien ve el rostro; es quien, viendo solo el nudo por detrás —como Moshé—,
              confía en que el hilo sigue atado del otro lado.
            </p>
          </div>
        </Section>

        {/* ── Sod ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · Atar Maljut a lo de arriba
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              En el nivel místico, el Zohar es explícito sobre la <span className="italic">función</span> del
              nudo: «la Torá es la permanencia de todo y la fe de todo,{" "}
              <span className="text-gold/90">para atar el nudo de la fe uno con otro, como corresponde</span>»
              (Zohar, Achrei Mot 50:305). El «uno con otro» (<span className="hebrew text-gold/90" dir="rtl">דָּא בְּדָא</span>)
              son las sefirot: el nudo une la inferior (Maljut) con las superiores.
            </p>
            <p>
              Para <span className="text-gold/90">Baal HaSulam</span> (el Sulam sobre el Zohar), este es el
              corazón del avodá humano. Maljut/Shejiná está en el «exilio»: cortada, abajo, sin luz propia.
              El trabajo del hombre —mediante la kavaná, la mitzvá y la palabra— es{" "}
              <span className="text-gold/90">re-atar</span> el nudo: el <span className="italic">yijud</span>,
              la unificación del Nombre, que vuelve a hacer fluir la bendición de arriba abajo. Por eso el
              Zohar advierte (Vayeilech 6:35) que quien no sabe anudar el nudo de la fe «no atrae bendición».
              No es magia: es <span className="italic">conexión restaurada</span>.
            </p>
          </div>
        </Section>

        <PullQuote
          he="אוֹרַיְיתָא קִיוּמָא דְּכֹלָּא וּמְהֵימְנוּתָא דְּכֹלָּא לְקַשְּׁרָא קִשְׁרָא דִּמְהֵימְנוּתָא דָּא בְּדָא כַּדְקָא חֲזֵי"
          es="La Torá es la permanencia de todo y la fe de todo, para atar el nudo de la fe uno con otro, como corresponde."
          source="Zohar, Achrei Mot 50:305"
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
                txt: "Dios mostró a Moshé «el nudo de los tefilín» por detrás (Berajot 7a, sobre Éxodo 33:23). En lo llano, es el nudo real de la correa del tefilín de la cabeza, que se ata cada día en la nuca.",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "אֱמוּנָה (fe) = 102 = 6×17, y 17 es טוֹב (bueno): la fe es la bondad sostenida seis veces. Y אָמֵן (amén) = 91 = יהוה(26)+אדני(65): la palabra que sella la fe es el número de la unión de los dos Nombres (tradición clásica de gematría).",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "Baal Shem Tov: la fe se prueba donde la luz está oculta. Maljut «no tiene luz propia»; por eso, cuanto más oscuro el lugar, más necesario el nudo. Creer es atar el extremo oscuro de abajo al luminoso de arriba aunque no se vea el hilo.",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "Zohar (Achrei Mot 50:305): la Torá «ata el nudo de la fe uno con otro, como corresponde». Baal HaSulam: el avodá del hombre es re-atar Maljut/Shejiná a las sefirot superiores —el yijud, la unificación del Nombre— para que vuelva a fluir la bendición.",
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

        {/* ── Shemot: el peso del nombre ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            שֵׁמוֹת · El peso del nombre: אמ״ן
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La raíz de <span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span> (emuná, fe) es{" "}
              <span className="hebrew text-gold/90" dir="rtl">אמ״ן</span> — la misma que da{" "}
              <span className="hebrew text-gold/90" dir="rtl">אָמֵן</span> (amén),{" "}
              <span className="hebrew text-gold/90" dir="rtl">אֱמֶת</span> (emet, «verdad») y{" "}
              <span className="hebrew text-gold/90" dir="rtl">אוֹמָן</span> (omán, «artesano experto»). Un
              solo shóresh, un racimo de sentido: <span className="text-gold/90">la fe es firmeza,
              fidelidad, lo que sostiene</span> — no una corazonada. La misma raíz que dice «creer» dice
              «verdad» y dice «manos firmes que construyen bien».
            </p>
            <p>
              La propia tradición lo cierra en la palabra litúrgica: el Shulján Aruj (Oraj Jaim 124:6)
              explica que al responder <span className="text-gold/90">«amén»</span> uno tiene en mente
              «<span className="italic">es verdad esta bendición… y yo creo (ani maamín) en ello</span>».
              Decir amén no es un trámite: es, en una sílaba, <span className="text-gold/90">atar el nudo de
              la fe</span> — confirmar que el hilo de arriba y el de abajo siguen unidos. Por eso la palabra
              que más anuda la fe, amén, vale 91: la unión de YHVH (arriba) y Adonai (abajo).
            </p>
          </div>
        </Section>

        {/* ── Hitbonenut ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            הִתְבּוֹנְנוּת · Contemplación
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Un nudo no fabrica nada: junta dos extremos que ya estaban. La fe tampoco fabrica nada;{" "}
              <span className="text-gold/90">une lo que parecía suelto</span>: mi vida de cada día (Maljut,
              lo de abajo) con su fuente oculta (lo de arriba). Cuando la fe flaquea, no es que el hilo
              se haya cortado — es que el <span className="italic">nudo</span> se aflojó.
            </p>
            <p>
              ¿Dónde, en mi vida, «no hay luz propia», y solo la fe puede atar eso a lo de arriba? A
              Moshé solo se le mostró el <span className="italic">nudo</span>, no el rostro. Quizá la fe
              sea eso: no ver el todo, sino ver el <span className="text-gold/90">nudo</span> — la certeza
              de que el hilo, aunque invisible, está atado del otro lado.
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
              <span className="text-gold/90">Hoy, ata un nudo conscientemente.</span> Si pones tefilín,
              convierte el instante de anudar la correa en un punto de kavaná: «<span className="italic">ato
              este nudo para re-atar el nudo de la fe — mi abajo a lo de arriba</span>». Si no pones
              tefilín, elige un acto de <span className="text-gold/90">amén</span>: sella una bendición o
              una palabra buena de alguien diciendo «amén», con plena conciencia de que amén significa
              «<span className="italic">creo, es verdad</span>».
            </p>
            <p>
              Y una <span className="italic">midá</span> para la semana: <span className="text-gold/90">re-anuda
              un hilo suelto</span>. Una confianza enfriada, un vínculo descuidado, una promesa a medias.
              No fabriques uno nuevo: <span className="italic">vuelve a atar</span> el que ya estaba. Eso es,
              en miniatura, el trabajo de toda fe — sostener el nudo cuando no se ve la luz del otro lado.
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
              El nudo que une lo alto con lo bajo
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              La fe no es un sentimiento: es un <span className="text-parchment/80">nudo</span> —kishrá
              dimhemnutá—. Maljut, que «no tiene luz propia», queda atada a las sefirot de arriba; el mismo
              nudo que Dios mostró a Moshé por detrás. Y amén = 91 = יהוה + אדני: la palabra que sella la
              fe es el número exacto de la unión de los dos Nombres. Anudar la fe es unir el Nombre.
            </p>

            {/* Sello: amén = 91 = YHVH + Adonai */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,10vw,56px)", color: "#eaf1ff", textShadow: "0 0 16px #6f8fe8" }}>אָמֵן</span>
                <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>Amén · 91</span>
              </div>
              <span className="font-cinzel text-2xl text-gold/40">=</span>
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,10vw,56px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>יהוה · אדני</span>
                <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>26 + 65 = 91</span>
              </div>
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              Cada mañana, el nudo se vuelve a atar.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "El nudo de los tefilín · Berajot 7a", ref: "Berakhot 7a" },
                { label: "Atar el nudo de la fe · Zohar Achrei Mot", ref: "Zohar, Achrei Mot 50:305" },
                { label: "Unificar el Nombre · Zohar Vayeilech", ref: "Zohar, Vayeilech 6:35" },
                { label: "Maljut es la boca · Tikunei Zohar 17a", ref: "Tikkunei Zohar 17a" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Berakhot 7a")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            {/* Hemshej — umbral «Sigue el hilo» */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/habakuk" className="hover:text-gold">«El justo por su fe vivirá» →</Link>
              <Link href="/misterio/entrelazamiento" className="hover:text-gold">El entrelazamiento →</Link>
              <Link href="/misterio/137" className="hover:text-gold">El misterio del 137 →</Link>
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
