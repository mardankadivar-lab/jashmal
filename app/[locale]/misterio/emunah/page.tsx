"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: LA FE — אֱמוּנָה (Emuná) ──────────────────────────────
// Serie de la Fe · misterio 2 · QUÉ ES la fe en su esencia, y por qué es el
// fundamento de todo. Distinto del #1 («El nudo de la fe» = la imagen estructural
// zóharica del kesher). Aquí: la definición misma de la emuná.
//
// FUENTES VERIFICADAS POR EL SOFER (editor-erudito) contra la API de Sefaria:
//  · Habakuk 2:4 — «וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה» (el justo por su fe vivirá).
//    Texto masorético verificado palabra por palabra. (La nota JPS advierte que el
//    hebreo es de sentido discutido; lo señalamos con honestidad.)
//  · Makot 24a — la cadena de reducciones: David→11 (Sal. 15), Yeshayahu→6, Mijá→3,
//    Yeshayahu→2, Amós→1 («דרשוני וחיו»), OBJETADO por Rav Najmán bar Itzjak, y por
//    eso (אֶלָּא) «בָּא חֲבַקּוּק וְהֶעֱמִידָן עַל אַחַת, שֶׁנֶּאֱמַר וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה».
//    Verificado verbatim. Esta es la fuente de «la fe como fundamento de todo».
//  · Shabat 97a — «הֵן מַאֲמִינִים בְּנֵי מַאֲמִינִים» (creyentes hijos de creyentes).
//    Verificado. Matiz honesto: es lo que Dios dice de Israel, en un contexto donde
//    Moshé sospechó de inocentes («ואתה אין סופך להאמין»). Lo presentamos con su contexto.
//  · Éxodo 14:31 — «וַיַּאֲמִינוּ בַּה׳ וּבְמֹשֶׁה עַבְדּוֹ» (la fe en el Mar). Verificado.
//  · Tania, Likutei Amarim 18 — FUENTE PRIMARIA verificada: «כָּל יִשְׂרָאֵל... הֵם
//    מַאֲמִינִים בַּה׳, שֶׁהָאֱמוּנָה הִיא לְמַעְלָה מִן הַדַּעַת וְהַהַשָּׂגָה» (la fe está por
//    encima del intelecto), y la «אהבה מסותרת» que es «ירושה לנו מאבותינו». Tania 19:
//    «נר ה׳ נשמת אדם», el alma como llama que tiende a su raíz «למעלה מהדעת».
//  · Génesis 15:6 — «וְהֶאֱמִן בַּה׳» (Abraham creyó). Verificado, citado SOLO como
//    puente hacia el #4 (los personajes de la fe), no desarrollado aquí.
//
// GEMATRÍAS CALCULADAS Y VERIFICADAS:
//  · אֱמוּנָה = 102 = 1+40+6+50+5 = 6×17, y 17 = טוֹב («bueno»): la fe es la bondad
//    sostenida por los seis extremos. (Ya verificado en #1.)
//  · אָמֵן = 91 = יהוה(26)+אדני(65): mencionado al pasar y enlazado al #1, sin repetir.
//
// GUARDARRAÍLES DE HONESTIDAD:
//  · Habakuk «redujo a uno» es lectura del DRASH talmúdico (Makot 24a), no pshat de
//    Habakuk; el pshat del verso es un contraste profeta/orgulloso. Se distingue.
//  · «Emuná = fidelidad/firmeza» (raíz אמ״ן) es filología real del shóresh, sólida.
//  · Shabat 97a se cita con su contexto, no como elogio aislado.

// ── Página en FARSI (رندر شده وقتی locale === "fa") ──────────────────────────
function EmunahFarsi() {
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
            حَبَقوق ۲:۴ · ماکوت ۲۴الف · سری ایمان
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(52px, 15vw, 96px)", color: "#dbe7ff",
              textShadow: "0 0 26px #6f8fe888" }}>
            אֱמוּנָה
          </h1>
          <h2 className="text-xl font-bold text-parchment/90 sm:text-2xl">
            ایمان
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold/55">
            ستونی که همه‌چیز بر آن ایستاده است
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
            ششصد و سیزده فرمان — و حَبَقوق همه را بر <span className="text-gold/80">یک</span> پایه نهاد:
            «<span className="hebrew text-gold/85" dir="rtl">וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה</span>»،
            «و عادل به ایمانش زنده است» (ماکوت ۲۴الف). اما ایمان چیست؟ نه یک گمان، نه یک احساسِ
            گذرا. ریشه‌اش אמ״ן است — همان که <span className="text-gold/80">אֱמֶת</span> (حقیقت) و
            <span className="text-gold/80"> אָמֵן</span> (آمین) را می‌سازد: <span className="text-gold/90">استواری</span>.
          </p>
        </div>

        {/* ── صادقانه ── */}
        <Sec>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/55">
              پیش از آغاز — یادداشت صادقانه
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir="rtl">
              این مطالعه به این پرسش پاسخ می‌دهد: <span className="text-gold/90">ایمان در ذاتش چیست،
              و چرا بنیادِ همه‌چیز است.</span> اینکه «حَبَقوق ۶۱۳ فرمان را بر یک پایه نهاد» خواندنِ
              تِلمود (ماکوت ۲۴الف) است — دِراش —، نه معنای سطحیِ خودِ آیه‌ی حَبَقوق. این تفاوت را
              نگه می‌داریم. <span className="italic">آناتومیِ</span> ایمان (بیطاحون، عنایت، ایمان در
              تاریکی) و <span className="italic">شخصیت‌های</span> ایمان (ابراهیم) را برای بخش‌های بعدیِ
              این سری می‌گذاریم؛ اینجا فقط به <span className="text-gold/90">ذات</span> می‌پردازیم.
            </p>
          </div>
        </Sec>

        {/* ── תַּרְגּוּם ── */}
        <Sec>
          <h3 className="mb-2 text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · آیه‌ی لنگرگاه و ترجمه
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              نبی حَبَقوق در برابر بی‌عدالتیِ جهان فریاد می‌زند، و پاسخ خدا چنین جمع می‌شود:{" "}
              <span className="hebrew text-gold/90" dir="rtl">וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה</span>{" "}
              — «و عادل به ایمانش زنده است» (حَبَقوق ۲:۴). در سطح ساده، این آیه مغرور را
              (که «جانش در او راست نیست») با عادل می‌سنجد: آن که زنده می‌ماند، با{" "}
              <span className="text-gold/90">אֱמוּנָה</span> — وفاداری، استواری — زنده می‌ماند.
            </p>
            <p>
              تِلمود این آیه را به اوج می‌رساند. ششصد و سیزده فرمانِ تورات، گام‌به‌گام، به
              اصول کمتری فروکاسته شد: داوود به یازده، یَشَعیاهو به شش، میخا به سه، یَشَعیاهو به دو،
              عاموس به یک («مرا بجویید و زنده بمانید»). اما رَب نَحمان بَر ییتسحاق این را رد کرد
              (شاید «مرا بجویید» یعنی در سراسرِ تورات). <span className="text-gold/90">پس</span> —{" "}
              <span className="hebrew text-gold/90" dir="rtl">אֶלָּא</span> —{" "}
              «<span className="hebrew text-gold/90" dir="rtl">בָּא חֲבַקּוּק וְהֶעֱמִידָן עַל אַחַת</span>»:
              حَبَقوق آمد و همه را بر یک پایه نهاد (ماکوت ۲۴الف). آن یک پایه: ایمان.
            </p>
          </div>
        </Sec>

        <PQ
          he="בָּא חֲבַקּוּק וְהֶעֱמִידָן עַל אַחַת, שֶׁנֶּאֱמַר וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה"
          fa="حَبَقوق آمد و همه‌ی فرمان‌ها را بر یک پایه نهاد، چنان‌که گفته شده: «و عادل به ایمانش زنده است.»"
          source="تلمود بابلی، ماکوت ۲۴الف"
        />

        {/* ── دو واژه ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-center text-sm uppercase tracking-[0.3em] text-gold/60">
            یک ریشه، یک معنا
          </h3>
          <div className="mb-8 flex flex-wrap justify-center gap-6">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(48px,12vw,68px)", color: "#eaf1ff", textShadow: "0 0 22px #6f8fe8, 0 0 8px #6f8fe8" }}>אֱמוּנָה</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>اِمونا · ایمان · ۱۰۲</span>
            </div>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(48px,12vw,68px)", color: "#fff6e0", textShadow: "0 0 22px #c9a43e, 0 0 8px #c9a43e" }}>אֱמֶת</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>اِمِت · حقیقت</span>
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
              راشی אֱמוּנָה را در حَبَقوق همچون <span className="text-gold/90">پایداری در صداقت</span> می‌خواند:
              عادل در راستیِ خود ثابت می‌ماند و به همین زنده است. ایمان نزد راشی نه یک حالتِ ذهنی،
              بلکه <span className="italic">پایمردی</span> است — همان که در خروج ۱۷:۱۲ دستانِ موسی
              «<span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span>» (استوار) ماند تا غروب.
            </p>
            <p>
              <span className="text-[11px] uppercase tracking-widest text-gold/50">تانیا (لیکوتی اَمَریم ۱۸):</span>{" "}
              اَلتِر رَبّی به صریح‌ترین شکل می‌گوید:{" "}
              <span className="hebrew text-gold/90" dir="rtl">כָּל יִשְׂרָאֵל... הֵם מַאֲמִינִים בַּה׳, שֶׁהָאֱמוּנָה הִיא לְמַעְלָה מִן הַדַּעַת</span>{" "}
              — «همه‌ی اسرائیل... باورمندند، زیرا ایمان <span className="text-gold/90">برتر از خِرَد و
              ادراک</span> است». این ایمان <span className="italic">میراث</span> ماست از پدران
              (אהבה מסותרת — عشقِ نهان)؛ حتی در «پایین‌ترینِ پایین‌ها» نیز هست.
            </p>
          </div>
        </Sec>

        <PQ
          he="כָּל יִשְׂרָאֵל, אֲפִילוּ הַנָּשִׁים וְעַמֵּי הָאָרֶץ, הֵם מַאֲמִינִים בַּה׳, שֶׁהָאֱמוּנָה הִיא לְמַעְלָה מִן הַדַּעַת וְהַהַשָּׂגָה"
          fa="همه‌ی اسرائیل، حتی زنان و ناآگاهان، به خدا باورمندند، زیرا ایمان برتر از خِرَد و ادراک است."
          source="تانیا، لیکوتی اَمَریم ۱۸"
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
                txt: "آیه‌ی حَبَقوق ۲:۴ مغرور را با عادل می‌سنجد: عادل به אֱמוּנָה‌ی خود — وفاداری، پایمردی در راه — زنده می‌ماند. در سطح ساده، ایمان یعنی ثابت ماندن، نه فروریختن وقتی جهان کج به نظر می‌رسد.",
              },
              {
                he: "רֶמֶז", name: "رِمِز",
                txt: "אֱמוּנָה (ایمان) = ۱۰۲ = ۶×۱۷، و ۱۷ ارزشِ טוֹב (خوب) است: ایمان همان خوبیِ پایدار است، شش‌بار — به شش جهتِ جهان بسته. و אָמֵן (آمین) = ۹۱ از همین ریشه، که در «گِرِهِ ایمان» باز کردیم.",
              },
              {
                he: "דְּרָשׁ", name: "دِراش",
                txt: "ماکوت ۲۴الف: تمام ۶۱۳ فرمان به یک اصل فرومی‌کاهد — «عادل به ایمانش زنده است». ایمان آخرین چیزی است که باقی می‌ماند، چون به چیز دیگری فرونمی‌کاهد. بَعل شِم طوو: همین یک پایه، همه‌چیز را نگه می‌دارد.",
              },
              {
                he: "סוֹד", name: "سود",
                txt: "تانیا (لیکوتی اَمَریم ۱۸–۱۹): ایمان «برتر از خِرَد» است، از سرچشمه‌ی روح می‌جوشد — همچون شعله که در طبیعتش به ریشه‌اش بالا می‌رود. بَعل هَسولام: ایمان آن دروازه‌ی برتر از عقل است که نورِ بی‌نهایت از آن وارد می‌شود.",
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
          he="הֵן מַאֲמִינִים בְּנֵי מַאֲמִינִים"
          fa="ایشان باورمندانند، فرزندانِ باورمندان."
          source="تلمود بابلی، شَبات ۹۷الف"
        />

        {/* ── שֵׁמוֹת ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            שֵׁמוֹת · وزنِ نام: ریشه‌ی אמ״ן
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              کلیدِ تمامِ این مطالعه در یک ریشه‌ی سه‌حرفی است:{" "}
              <span className="hebrew text-gold/90" dir="rtl">אמ״ן</span>. از این یک ریشه چهار واژه
              می‌روید که با هم معنای ایمان را آشکار می‌کنند:{" "}
              <span className="text-gold/90">אֱמוּנָה</span> (ایمان)،{" "}
              <span className="text-gold/90">אֱמֶת</span> (حقیقت)،{" "}
              <span className="text-gold/90">אָמֵן</span> (آمین) و{" "}
              <span className="text-gold/90">אוֹמָן</span> (صنعتگرِ استاد، آن که دستی مطمئن دارد).
            </p>
            <p>
              این خوشه‌ی معنایی همه‌چیز را زیر و رو می‌کند. ایمان در عبری{" "}
              <span className="text-gold/90">گمان یا احساس نیست</span> — هم‌ریشه‌ی{" "}
              <span className="italic">حقیقت</span> و <span className="italic">استواری</span> است.
              همان ریشه‌ای که در خروج ۱۷:۱۲ دستانِ موسی را «<span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span>»
              (ثابت) نگه می‌دارد. باور داشتن یعنی <span className="text-gold/90">پابرجا ماندن، وفادار
              بودن، استوار شدن</span> — مثلِ אוֹמָן که با دستی مطمئن کار می‌سازد. ایمان، عملِ ایستادگی است.
            </p>
            <p className="text-parchment/70">
              <span className="text-[11px] uppercase tracking-widest text-gold/50">پیوند:</span>{" "}
              برابریِ <span className="hebrew text-gold/85" dir="rtl">אָמֵן</span> = ۹۱ = יהוה(۲۶)+אדני(۶۵)
              را در مطالعه‌ی «گِرِهِ ایمان» باز کردیم. آمین، خودِ مُهرِ استواری است: «حقیقت است، باور دارم».
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
              همه‌ی فرمان‌ها به یک چیز فرومی‌کاهند، اما ایمان به هیچ‌چیزِ دیگر فرونمی‌کاهد —{" "}
              <span className="text-gold/90">پایه‌ای است که زیرِ آن پایه‌ای نیست</span>. هر چیزی که در
              زندگی‌ام می‌سازم بر چیزی استوار است؛ اما ایمان آن سنگِ زیرین است که خود بر چیزی تکیه ندارد.
            </p>
            <p>
              تانیا می‌گوید این ایمان همین حالا در من هست — «برتر از خِرَد»، میراثِ پدران. پس ایمان را
              <span className="italic"> به دست نمی‌آورم</span>، بلکه آن را <span className="text-gold/90">آشکار
              می‌کنم</span>. کجای زندگی‌ام بر گمان و دلیل ایستاده، و کجا بر آن سنگِ زیرین که حتی وقتی همه‌چیز
              فرومی‌ریزد می‌ماند؟ عادل نه به این زنده است که همه‌چیز را می‌فهمد، بلکه به این که{" "}
              <span className="text-gold/90">استوار می‌ماند</span>.
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
              <span className="text-gold/90">امروز یک عملِ ایمان را به سنگِ زیرین برسان.</span> یک
              نگرانی یا تصمیمی را برگزین که زیرِ بارِ «نمی‌دانم چه می‌شود» خم شده است. به‌جای آنکه آن را
              با دلیلِ بیشتر حل کنی، یک لحظه آن را بر ایمان بنه: در دل بگو «<span className="italic">من
              استوار می‌مانم؛ رشته، حتی ناپیدا، در دستِ اوست</span>».
            </p>
            <p>
              و یک <span className="italic">میدا</span> برای این هفته: <span className="text-gold/90">آمینی
              آگاهانه</span>. وقتی برکتی یا سخنِ نیکی می‌شنوی، «آمین» را نه از روی عادت بلکه با تمامِ معنایش
              بگو — «<span className="hebrew text-gold/85" dir="rtl">אֱמֶת</span>، حقیقت است، و من باور دارم».
              یک‌بار در روز، ایمانِ نهان را با یک «آمین»ِ واقعی، استوار و آگاهانه، آشکار کن.
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
              یک پایه که همه‌چیز بر آن می‌ایستد
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              ایمان احساس نیست؛ <span className="text-parchment/80">استواری</span> است — هم‌ریشه با
              «حقیقت» و «آمین». حَبَقوق ششصد و سیزده فرمان را بر یک پایه نهاد: «عادل به ایمانش زنده است».
              و تانیا می‌گوید این ایمان همین حالا در هر جان هست، «برتر از خِرَد» — میراثِ پدران. ایمان
              را به دست نمی‌آوری؛ آشکارش می‌کنی.
            </p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,10vw,56px)", color: "#eaf1ff", textShadow: "0 0 16px #6f8fe8" }}>אֱמוּנָה</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>ایمان · ۱۰۲</span>
              </div>
              <span className="font-cinzel text-2xl text-gold/40">=</span>
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,10vw,56px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>۶ × טוֹב</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>۶ × ۱۷ = ۱۰۲</span>
              </div>
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              ایمان همان خوبیِ پایدار است، به شش جهتِ جهان بسته.
            </p>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Habakkuk 2:4")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              ← مطالعه‌ی این راز در خَشمَل
            </button>

            {/* הֶמְשֵׁךְ — ادامه‌ی مسیر */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/nudo-de-la-fe" className="hover:text-gold">← گِرِهِ ایمان</Link>
              <Link href="/misterio/habakuk" className="hover:text-gold">← آغوشِ دوگانه‌ی حَبَقوق</Link>
              <Link href="/misterio/entrelazamiento" className="hover:text-gold">← درهم‌تنیدگی</Link>
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

// ── Componentes (idénticos en estilo a /misterio/nudo-de-la-fe) ───────────────
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
export default function EmunahPage() {
  const locale = useLocale();
  const router = useRouter();
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);

  if (locale === "fa") return <EmunahFarsi />;
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
            Habakuk 2:4 · Makot 24a · Serie de la Fe
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(52px, 15vw, 96px)", color: dark ? "#dbe7ff" : "#28406e",
              textShadow: dark ? "0 0 26px #6f8fe888" : "none" }}>
            אֱמוּנָה
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            La Fe — el fundamento de todo
          </h2>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/55">
            La piedra de abajo sobre la que todo se sostiene
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            613 mandamientos — y Habakuk los redujo todos a <span className="text-gold/80">uno</span>:
            «<span className="hebrew text-gold/85" dir="rtl">וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה</span>»,
            «el justo por su fe vivirá» (Makot 24a). Pero, ¿qué es la fe? No una corazonada, no un
            sentimiento pasajero. Su raíz es <span className="hebrew text-gold/80" dir="rtl">אמ״ן</span>
            — la misma que da <span className="text-gold/80">אֱמֶת</span> (verdad) y{" "}
            <span className="text-gold/80">אָמֵן</span> (amén): <span className="text-gold/90">firmeza</span>.
          </p>
        </div>

        {/* ── Nota del Sofer ── */}
        <Section>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Antes de empezar — nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              Este estudio responde a una sola pregunta: <span className="text-gold/90">qué es la fe en
              su esencia, y por qué es el fundamento de todo.</span> Que «Habakuk redujo los 613
              mandamientos a uno» es la lectura del <span className="italic">drash</span> talmúdico
              (Makot 24a), no el pshat del propio verso de Habakuk —que contrasta al profeta firme con el
              orgulloso—; mantenemos esa distinción. La <span className="italic">anatomía</span> de la fe
              (bitajón, providencia, fe en la oscuridad) y los <span className="italic">personajes</span>{" "}
              de la fe (Abraham) quedan para las próximas entregas de esta serie. Aquí, solo la{" "}
              <span className="text-gold/90">esencia</span>.
            </p>
          </div>
        </Section>

        {/* ── Targum: el texto-ancla ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · El verso-ancla y su traducción
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El profeta Habakuk clama ante la injusticia del mundo, y la respuesta de Dios se condensa
              en estas palabras:{" "}
              <span className="hebrew text-gold/90" dir="rtl">וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה</span>{" "}
              —«y el justo por su fe vivirá» (Habakuk 2:4)—. En el pshat, el verso compara al orgulloso
              (cuya «alma no es recta en él») con el justo: el que permanece vivo, vive por su{" "}
              <span className="text-gold/90">emuná</span> —fidelidad, firmeza, constancia en el camino—.
              <span className="text-parchment/55"> (El hebreo del verso es de sentido discutido entre
              traductores; la lectura que la tradición eleva es «por su fe».)</span>
            </p>
            <p>
              El Talmud lleva este verso a su cumbre. Los 613 mandamientos de la Torá fueron, paso a
              paso, reducidos a menos principios: David a once (Salmo 15), Yeshayahu a seis, Mijá a tres,
              Yeshayahu a dos, Amós a uno («búsquenme y vivan»). Pero Rav Najmán bar Itzjak objetó esa
              última —quizá «búscame» significa «en toda la Torá»—. <span className="text-gold/90">Por
              eso</span> —<span className="hebrew text-gold/90" dir="rtl">אֶלָּא</span>—{" "}
              «<span className="hebrew text-gold/90" dir="rtl">בָּא חֲבַקּוּק וְהֶעֱמִידָן עַל אַחַת</span>»:
              vino Habakuk y los estableció sobre uno (Makot 24a). Ese uno irreductible: la fe.
            </p>
          </div>
        </Section>

        <PullQuote
          he="בָּא חֲבַקּוּק וְהֶעֱמִידָן עַל אַחַת, שֶׁנֶּאֱמַר וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה"
          es="Vino Habakuk y estableció todos los mandamientos sobre uno, como está dicho: «y el justo por su fe vivirá»."
          source="Talmud Bavlí, Makot 24a"
        />

        {/* ── Una raíz, un sentido ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Una raíz, un sentido
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            En hebreo, la <span className="text-gold/80">fe</span> (emuná) no es prima del «sentimiento».
            Es hermana de la <span className="text-gold/80">verdad</span> (emet) y del «amén». La misma
            raíz que dice «creer» dice «firme» y dice «lo que sostiene».
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="אֱמוּנָה" sub="Emuná · fe · 102" color="#6f8fe8" />
            <span className="font-cinzel text-2xl text-gold/40">·</span>
            <HebrewTile he="אֱמֶת" sub="Emet · verdad" color="#c9a43e" />
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
              Rashi lee la emuná de Habakuk como <span className="text-gold/90">perseverancia en la
              rectitud</span>: el justo se mantiene firme en su integridad, y por eso vive. La fe, para
              Rashi, no es un estado mental sino <span className="italic">constancia</span> — la misma
              palabra que en Éxodo 17:12 mantiene las manos de Moshé «<span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span>»
              (firmes, sostenidas) hasta el ocaso. Creer y estar firme son, en hebreo, la misma raíz.
            </p>
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Tania (Likutei Amarim 18):</span>{" "}
              el Alter Rebbe lo dice del modo más directo:{" "}
              <span className="hebrew text-gold/90" dir="rtl">כָּל יִשְׂרָאֵל... הֵם מַאֲמִינִים בַּה׳, שֶׁהָאֱמוּנָה הִיא לְמַעְלָה מִן הַדַּעַת</span>{" "}
              —«todo Israel... son creyentes, porque la fe está <span className="text-gold/90">por encima
              del intelecto y de la comprensión</span>»—. Esta fe es <span className="italic">herencia</span>{" "}
              de los patriarcas (un «amor oculto», <span className="hebrew" dir="rtl">אהבה מסותרת</span>);
              está presente «incluso en el más liviano de los livianos». No se razona: se hereda y se revela.
            </p>
          </div>
        </Section>

        <PullQuote
          he="כָּל יִשְׂרָאֵל, אֲפִילוּ הַנָּשִׁים וְעַמֵּי הָאָרֶץ, הֵם מַאֲמִינִים בַּה׳, שֶׁהָאֱמוּנָה הִיא לְמַעְלָה מִן הַדַּעַת וְהַהַשָּׂגָה"
          es="Todo Israel, incluso las mujeres y los simples, son creyentes en Dios, porque la fe está por encima del intelecto y de la comprensión."
          source="Tania, Likutei Amarim 18"
        />

        {/* ── Remez: la gematría ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            רֶמֶז · La insinuación de los números
          </h3>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="אֱמוּנָה" sub="Emuná · 102" color="#6f8fe8" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="6 × טוֹב" sub="6 × 17 = 102" color="#c9a43e" />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span> (emuná, fe) ={" "}
              <span className="text-gold/90">102</span> = 6 × 17, y 17 es el valor de{" "}
              <span className="hebrew text-gold/90" dir="rtl">טוֹב</span> (tov, «bueno»). La fe es la{" "}
              <span className="text-gold/90">bondad sostenida seis veces</span> — atada a los seis
              extremos del mundo (las seis direcciones del espacio, las seis sefirot de la construcción).
              La fe no flota en el aire: es el bien hecho firme en todas las direcciones de la vida.
            </p>
            <p>
              De la misma raíz <span className="hebrew text-gold/90" dir="rtl">אמ״ן</span> nace{" "}
              <span className="hebrew text-gold/90" dir="rtl">אָמֵן</span> (amén) ={" "}
              <span className="text-gold/90">91</span> = <span className="hebrew text-gold/90" dir="rtl">יהוה</span>(26)
              + <span className="hebrew text-gold/90" dir="rtl">אדני</span>(65), la unión de los dos
              Nombres — pero eso es el corazón del estudio hermano, «El nudo de la fe», y allí lo abrimos.{" "}
              <span className="text-parchment/55">(Gematrías calculadas y verificadas por el Sofer:
              א1+מ40+ו6+נ50+ה5 = 102.)</span>
            </p>
          </div>
        </Section>

        {/* ── Drash ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            דְּרָשׁ · La fe es lo irreductible
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              ¿Por qué Habakuk gana? Amós ya había dicho «búsquenme y vivan» — pero el Talmud objeta:
              «buscar» a Dios podría todavía significar «cumplir toda la Torá», así que no es realmente{" "}
              <span className="italic">uno</span>. La fe, en cambio, no se deja reducir a otra cosa. Es el{" "}
              <span className="text-gold/90">suelo bajo el cual no hay más suelo</span>: el principio que
              sostiene a todos los demás sin apoyarse en ninguno. Por eso Habakuk es la formulación que prevalece.
            </p>
            <p>
              La voz del <span className="text-gold/90">Baal Shem Tov</span> se integra aquí: si todos los
              613 descansan sobre la fe, entonces la mitzvá más pequeña, hecha con emuná, sostiene el mundo
              entero — y el gesto más grande, sin ella, se queda sin cimiento. El justo no «vive por su fe»
              como recompensa lejana: <span className="italic">vive</span> —ahora, respira, se sostiene— por
              esa única piedra de abajo.
            </p>
          </div>
        </Section>

        {/* ── Sod ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · La fe está por encima de la razón
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              En el nivel místico, el Tania es preciso sobre <span className="italic">de dónde</span> brota
              la fe. No nace del intelecto (<span className="hebrew text-gold/90" dir="rtl">דַּעַת</span>):
              brota de un lugar del alma <span className="text-gold/90">más alto que el intelecto</span>.
              Por eso «todo Israel cree, porque la fe está por encima de la comprensión» (Likutei Amarim 18):
              uno no llega a la fe razonando hacia arriba — la fe ya estaba ahí, en la raíz, antes del razonar.
            </p>
            <p>
              El capítulo siguiente (Tania 19) da la imagen:{" "}
              <span className="hebrew text-gold/90" dir="rtl">נֵר ה׳ נִשְׁמַת אָדָם</span> —«el alma del
              hombre es la lámpara de Dios»—. La llama, por su naturaleza, siempre tiende hacia arriba, hacia
              su raíz en el fuego, aunque al subir se extinga. Así el alma: su deseo de unirse a su Fuente está
              «<span className="italic">por encima del da'at</span>», es su naturaleza misma. Para{" "}
              <span className="text-gold/90">Baal HaSulam</span>, esta es la puerta supra-racional por la que
              entra la Luz del Ein Sof: la fe no es un intelecto débil — es el canal que está por <span className="italic">encima</span>{" "}
              del intelecto, el único capaz de recibir lo que el intelecto no puede contener.
            </p>
          </div>
        </Section>

        <PullQuote
          he="נֵר ה׳ נִשְׁמַת אָדָם... חֶפְצָהּ וְחֶשְׁקָהּ בְּטִבְעָהּ... לִידָּבֵק בְּשָׁרְשָׁהּ"
          es="«El alma del hombre es la lámpara de Dios»… su deseo y su anhelo, por su naturaleza, es adherirse a su raíz —un deseo que está por encima del intelecto."
          source="Tania, Likutei Amarim 19"
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
                txt: "Habakuk 2:4 compara al orgulloso con el justo: el justo vive por su אֱמוּנָה —fidelidad, perseverancia en el camino—. En lo llano, la fe es mantenerse firme, no derrumbarse cuando el mundo parece torcido.",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "אֱמוּנָה (fe) = 102 = 6×17, y 17 es טוֹב (bueno): la fe es la bondad sostenida seis veces, atada a las seis direcciones. Y אָמֵן (amén) = 91, de la misma raíz, abierto en «El nudo de la fe».",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "Makot 24a: los 613 se reducen a un solo principio —«el justo por su fe vivirá»—. La fe es lo último que queda porque no se reduce a otra cosa. Baal Shem Tov: esa única piedra sostiene todo lo que el hombre construye.",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "Tania (Likutei Amarim 18–19): la fe está «por encima del intelecto»; brota de la raíz del alma, como la llama que por naturaleza sube a su fuente. Baal HaSulam: es el canal supra-racional por el que entra la Luz infinita que la razón no puede contener.",
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

        <PullQuote
          he="הֵן מַאֲמִינִים בְּנֵי מַאֲמִינִים"
          es="Ellos son creyentes, hijos de creyentes."
          source="Talmud Bavlí, Shabat 97a"
        />

        {/* ── Shemot: el peso del nombre ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            שֵׁמוֹת · El peso del nombre: la raíz אמ״ן
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La clave de todo el estudio cabe en una raíz de tres letras:{" "}
              <span className="hebrew text-gold/90" dir="rtl">אמ״ן</span> (álef-mem-nun). De ese único
              shóresh brotan cuatro palabras que, juntas, revelan qué <span className="italic">es</span>{" "}
              la fe en hebreo:{" "}
              <span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span> (emuná, fe),{" "}
              <span className="hebrew text-gold/90" dir="rtl">אֱמֶת</span> (emet, verdad),{" "}
              <span className="hebrew text-gold/90" dir="rtl">אָמֵן</span> (amén) y{" "}
              <span className="hebrew text-gold/90" dir="rtl">אוֹמָן</span> (omán, el artesano experto,
              el de mano firme).
            </p>
            <p>
              Este racimo lo cambia todo. En hebreo, creer{" "}
              <span className="text-gold/90">no es una corazonada ni una emoción</span> — comparte raíz con
              la <span className="italic">verdad</span> y con la <span className="italic">firmeza</span>. La
              misma raíz que en Éxodo 17:12 sostiene las manos de Moshé «<span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span>»
              (estables) hasta la victoria. Creer es <span className="text-gold/90">mantenerse, ser fiel,
              estar firme</span> — como el <span className="hebrew" dir="rtl">אוֹמָן</span> que construye bien
              porque su mano no tiembla. La fe es el acto de sostenerse, no el de sentir.
            </p>
            <p className="text-parchment/70">
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Enlace:</span>{" "}
              la igualdad <span className="hebrew text-gold/85" dir="rtl">אָמֵן</span> = 91 = יהוה(26)+אדני(65)
              la desarrollamos en «El nudo de la fe». Decir amén es, en una sílaba, sellar esa firmeza:
              «es verdad, y yo creo».
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
              Todos los mandamientos se reducen a uno, pero la fe no se reduce a nada —{" "}
              <span className="text-gold/90">es la piedra bajo la cual ya no hay otra piedra</span>. Todo
              lo que construyo en mi vida se apoya en algo; pero la emuná es ese suelo de abajo que no se
              apoya en nada. Es lo que queda cuando todo lo demás —los argumentos, las pruebas, las
              razones— ya se gastó.
            </p>
            <p>
              El Tania dice que esa fe ya está en mí ahora —«por encima del intelecto», herencia de los
              padres—. Entonces la fe no se <span className="italic">consigue</span>: se{" "}
              <span className="text-gold/90">revela</span>. ¿Dónde, en mi vida, estoy de pie sobre
              argumentos, y dónde sobre esa piedra de abajo que permanece aun cuando todo se derrumba? El
              justo no vive porque lo entienda todo, sino porque <span className="text-gold/90">se mantiene
              firme</span>. La fe no es saber: es no soltarse.
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
              <span className="text-gold/90">Hoy, lleva un asunto hasta la piedra de abajo.</span> Elige
              una preocupación o una decisión que se haya doblado bajo el peso de «no sé cómo va a salir».
              En vez de resolverla con más razones, apóyala un instante en la fe: di en tu mente «<span className="italic">me
              mantengo firme; el hilo, aunque no lo vea, está en Su mano</span>». No es renunciar a pensar —es
              recordar el suelo sobre el que el pensar descansa.
            </p>
            <p>
              Y una <span className="italic">midá</span> para la semana:{" "}
              <span className="text-gold/90">un amén consciente</span>. Cuando oigas una bendición o una
              palabra buena, di «amén» no por costumbre sino con todo su peso —«<span className="hebrew text-gold/85" dir="rtl">אֱמֶת</span>,
              es verdad, y yo creo»—. Una vez al día, revela la fe escondida con un «amén» real: firme,
              despierto, sostenido. Convierte una sílaba automática en un acto de emuná.
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
              La piedra de abajo sobre la que todo se sostiene
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              La fe no es un sentimiento: es <span className="text-parchment/80">firmeza</span> —de la
              misma raíz que «verdad» y «amén»—. Habakuk redujo los 613 mandamientos a un solo principio:
              «el justo por su fe vivirá». Y el Tania dice que esa fe ya vive en cada alma, «por encima
              del intelecto» —herencia de los padres—. La fe no se consigue: se revela.
            </p>

            {/* Sello: emuná = 102 = 6 × tov */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <HebrewTile he="אֱמוּנָה" sub="Emuná · 102" color="#6f8fe8" />
              <span className="font-cinzel text-2xl text-gold/40">=</span>
              <HebrewTile he="6 × טוֹב" sub="6 × 17 = 102" color="#c9a43e" />
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              La fe es la bondad sostenida seis veces, atada a las seis direcciones del mundo.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "El justo por su fe vivirá · Habakuk 2:4", ref: "Habakkuk 2:4" },
                { label: "Habakuk redujo los 613 a uno · Makot 24a", ref: "Makkot 24a" },
                { label: "La fe sobre el intelecto · Tania 18", ref: "Tanya, Part I; Likkutei Amarim 18" },
                { label: "El alma como lámpara · Tania 19", ref: "Tanya, Part I; Likkutei Amarim 19" },
                { label: "Creyentes hijos de creyentes · Shabat 97a", ref: "Shabbat 97a" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Habakkuk 2:4")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            {/* Hemshej — umbral «Sigue el hilo» */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/nudo-de-la-fe" className="hover:text-gold">El nudo de la fe →</Link>
              <Link href="/misterio/habakuk" className="hover:text-gold">El doble abrazo de Habakuk →</Link>
              <button
                onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 15:6")}&context=kabbalah`)}
                className="font-cinzel uppercase tracking-widest text-gold/50 hover:text-gold">
                La fe de Abraham →
              </button>
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
