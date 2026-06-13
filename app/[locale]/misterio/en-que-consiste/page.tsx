"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: EN QUÉ CONSISTE LA FE ────────────────────────────────
// Serie de la Fe · misterio 3 · אֱמוּנָה וּבִטָּחוֹן — la ANATOMÍA de la fe: de qué
// está hecha y cómo se vive. La emuná (creencia, "Dios existe y todo lo gobierna")
// que FLORECE en bitajón (confianza activa, apoyarse en Él de hecho). Distinto del
// #1 (el kesher / nudo) y del #2 (la esencia: Habakuk 2:4, la fe innata). Aquí: la
// COMPOSICIÓN y la PRÁCTICA.
//
// FUENTES VERIFICADAS POR EL SOFER (editor-erudito) contra la API de Sefaria:
//  · Proverbios 3:5 — «בְּטַח אֶל ה' בְּכָל לִבֶּךָ וְאֶל בִּינָתְךָ אַל תִּשָּׁעֵן». Verificado palabra
//    por palabra. El verso-ancla del bitajón: confía con TODO el corazón, no en tu propio
//    entendimiento. (3:6 «בְּכָל דְּרָכֶיךָ דָעֵהוּ» también verificado.)
//  · Jeremías 17:7 — «בָּרוּךְ הַגֶּבֶר אֲשֶׁר יִבְטַח בַּה' וְהָיָה ה' מִבְטַחוֹ». Verificado. Trae
//    מִבְטַחוֹ (su refugio), de la raíz בט״ח — regalo onomástico.
//  · Salmos 23:1 — «ה' רֹעִי לֹא אֶחְסָר». Verificado.
//  · Salmos 33:6 — «בִּדְבַר ה' שָׁמַיִם נַעֲשׂוּ». Verificado (base de la providencia continua).
//  · Deuteronomio 31:18 — «וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי». Verificado palabra por palabra
//    (el hester panim, la ocultación del Rostro).
//  · Jovot HaLevavot, Cuarto Tratado sobre la Confianza (Sha'ar HaBitajón), Bajya ibn
//    Pakuda, cap. 1 — definición verificada en Sefaria: «מַהוּת הַבִּטָּחוֹן הִיא מְנוּחַת נֶפֶשׁ
//    הַבּוֹטֵחַ וְשֶׁיִּהְיֶה לִבּוֹ סָמוּךְ עַל מִי שֶׁבָּטַח עָלָיו» — la esencia del bitajón es la
//    tranquilidad del alma del que confía, su corazón apoyado en Aquel en quien confía.
//  · Tania, Parte II (Sha'ar HaYijud veHaEmuná), cap. 1 — verificado: la palabra divina
//    (Sal 33:6 / Sal 119:89) sostiene cada criatura a CADA instante; si las letras se
//    apartaran "un instante", todo revertiría a la nada absoluta. Base sólida y verificada
//    de la hashgajá pratit (providencia particular).
//  · Likutei Moharan 33 — verificado en Sefaria: "siempre encuentra a Dios en ello",
//    tanto en lo bueno como en lo difícil, mediante Torá y tzadikim. Ancla honesta de la
//    voz de Breslov sobre la cercanía de Dios en todo lugar.
//
// GUARDARRAÍLES DE HONESTIDAD:
//  · La enseñanza del Baal Shem Tov de que "ni una hoja cae/gira sin providencia" se
//    presenta como enseñanza JASÍDICA CLÁSICA del Besht: NO localicé un folio exacto en
//    Keter Shem Tov, así que su base teológica se ancla en el Tania (Sha'ar HaYijud, cap. 1),
//    que SÍ está verificado. No se inventa folio.
//  · La frase emblemática de Breslov «אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל» (no hay desesperación en el
//    mundo en absoluto) se atribuye a Rebe Najmán con honestidad, SIN fijarla a un folio
//    (no se confirmó el locus en Sefaria). La voz de Breslov se ancla en Likutei Moharan 33,
//    que sí está verificado.
//  · El contraste emuná/bitajón del Jazón Ish (Emuná uVitajón) se menciona con sourcing
//    honesto: esa obra NO está en Sefaria; el contraste se sostiene sobre Bajya (verificado).
//  · Gematrías calculadas por el Sofer: בִּטָּחוֹן = 75, אֱמוּנָה = 102, מִבְטָח = 59, בט״ח = 19.
//    Se presentan como insinuación (remez), no como pshat.

// ── Página en FARSI (رندر شده وقتی locale === "fa") ──────────────────────────
function EnQueConsisteFarsi() {
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
            سری ایمان · بخش سوم · ساختار
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(30px, 9vw, 64px)", color: "#dbe7ff",
              textShadow: "0 0 26px #6f8fe888" }}>
            אֱמוּנָה וּבִטָּחוֹן
          </h1>
          <h2 className="text-xl font-bold text-parchment/90 sm:text-2xl">
            ایمان از چه ساخته شده؟
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold/55">
            از باور تا توکّل
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
            می‌دانیم ایمان چیست؛ اکنون می‌پرسیم از چه ساخته شده و چگونه زیسته می‌شود.
            <span className="text-gold/90"> اِمونا</span> (باور: «خدا هست و همه‌چیز را او می‌گرداند»)
            تنها آغاز است. این باورِ آرام در <span className="text-gold/90">بیطاخون</span> (توکّلِ
            فعّال: در عمل بر او تکیه‌کردن) شکوفا می‌شود. ساختمانِ ایمان سه ستون دارد: توکّل،
            مشیّتِ جزئی، و پنهان‌شدنِ چهره.
          </p>
        </div>

        {/* ── صادقانه ── */}
        <Sec>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/55">
              پیش از آغاز — یادداشت صادقانه
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir="rtl">
              تعریفِ بیطاخون از <span className="text-gold/90">حُووُت هَلِواووت، دروازه‌ی توکّل</span>
              (بَحیا اِبن پَکودا) واژه‌به‌واژه راستی‌آزمایی شده. آموزه‌ی بَعل شِم طوو درباره‌ی «افتادنِ یک
              برگ» را به‌عنوان <span className="italic">آموزه‌ی کلاسیکِ حَسیدی</span> می‌آوریم؛ بنیادِ
              الهیاتیِ آن در <span className="text-gold/90">تَنیا (شَعَر هَیِحود وهاِمونا، فصل ۱)</span> است
              که راستی‌آزمایی شده. جمله‌ی مشهورِ بِرِسلِو «هیچ ناامیدی در جهان نیست» را با صداقت به
              رَبّی نَحمان نسبت می‌دهیم، بی‌آنکه آن را به برگه‌ای معیّن ببندیم. گِماتریاها را محاسبه‌ی
              صوفِر می‌دانیم، نه متنِ پشاط.
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
              لنگرگاهِ بیطاخون این آیه است:{" "}
              <span className="hebrew text-gold/90" dir="rtl">בְּטַח אֶל ה' בְּכָל לִבֶּךָ וְאֶל בִּינָתְךָ אַל תִּשָּׁעֵן</span>{" "}
              — «با <span className="text-gold/90">همه‌ی</span> دلت بر خداوند توکّل کن، و بر فهمِ خود
              تکیه مکن» (مِشلی / امثال ۳:۵). آیه‌ی بعد می‌افزاید: «در همه‌ی راه‌هایت او را بشناس، و او
              راه‌هایت را راست خواهد کرد» (۳:۶).
            </p>
            <p>
              توجه کن آیه چه می‌گوید: نه فقط «باور کن که خدا هست»، بلکه «<span className="text-gold/90">تکیه
              کن</span>» — فعلی عملی. و «بر فهمِ خود تکیه مکن»: بیطاخون آنجا آغاز می‌شود که عقلِ من
              ته می‌کشد. ایمان از باور ساخته شده، اما در عمل، در تکیه‌کردن، خود را نشان می‌دهد.
            </p>
          </div>
        </Sec>

        <PQ
          he="בְּטַח אֶל ה' בְּכָל לִבֶּךָ וְאֶל בִּינָתְךָ אַל תִּשָּׁעֵן"
          fa="با همه‌ی دلت بر خداوند توکّل کن، و بر فهمِ خود تکیه مکن."
          source="مِشلی / امثال ۳:۵"
        />

        {/* ── سه ستون ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-center text-sm uppercase tracking-[0.3em] text-gold/60">
            سه ستونِ ساختمانِ ایمان
          </h3>
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
              style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(34px,9vw,52px)", color: "#eaf1ff", textShadow: "0 0 18px #6f8fe8" }}>בִּטָּחוֹן</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>بیطاخون · توکّل · ۷۵</span>
            </div>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
              style={{ borderColor: "#6f8fe866", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 18px #6f8fe822" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(26px,7vw,40px)", color: "#dbe7ff", textShadow: "0 0 14px #6f8fe8" }}>הַשְׁגָּחָה פְּרָטִית</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>مشیّتِ جزئی</span>
            </div>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
              style={{ borderColor: "#c9a43e66", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 18px #c9a43e22" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(26px,7vw,40px)", color: "#fff6e0", textShadow: "0 0 14px #c9a43e" }}>הֶסְתֵּר פָּנִים</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>پنهان‌شدنِ چهره</span>
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
              <span className="text-[11px] uppercase tracking-widest text-gold/50">بَحیا اِبن پَکودا (دروازه‌ی توکّل):</span>{" "}
              بزرگ‌ترین کالبدشناسیِ بیطاخون این است. او تعریف می‌کند:{" "}
              <span className="hebrew text-gold/90" dir="rtl">מַהוּת הַבִּטָּחוֹן הִיא מְנוּחַת נֶפֶשׁ הַבּוֹטֵחַ</span>{" "}
              — «گوهرِ توکّل <span className="text-gold/90">آرامشِ جانِ</span> توکّل‌کننده است»، آن‌گاه که
              دلش بر آنکه بر او توکّل کرده تکیه دارد. پس بیطاخون احساس نیست؛ یک <span className="italic">حالتِ
              آرامش</span> است که از اعتماد می‌جوشد.
            </p>
            <p>
              <span className="text-[11px] uppercase tracking-widest text-gold/50">حَزون اِیش (ایمان و توکّل):</span>{" "}
              تمایزِ کلاسیک را او روشن کرد: <span className="text-gold/90">اِمونا</span> پذیرشِ خِردمندانه است
              که خدا جهان را می‌گرداند؛ اما <span className="text-gold/90">بیطاخون</span> این نیست که «حتماً
              خوب پیش می‌رود»، بلکه آرامشِ این دانستن است که همه‌چیز در دستِ اوست. (این اثر در سِفاریا نیست؛
              با صداقت بی‌برگه می‌آوریم، و بنیادش بر بَحیا که راستی‌آزمایی شده استوار است.)
            </p>
          </div>
        </Sec>

        <PQ
          he="מַהוּת הַבִּטָּחוֹן הִיא מְנוּחַת נֶפֶשׁ הַבּוֹטֵחַ וְשֶׁיִּהְיֶה לִבּוֹ סָמוּךְ עַל מִי שֶׁבָּטַח עָלָיו"
          fa="گوهرِ توکّل آرامشِ جانِ توکّل‌کننده است، آن‌گاه که دلش بر آنکه بر او توکّل کرده تکیه دارد."
          source="حُووُت هَلِواووت، دروازه‌ی توکّل، فصل ۱ (بَحیا اِبن پَکودا)"
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
                txt: "«با همه‌ی دلت بر خداوند توکّل کن» (امثال ۳:۵). در سطحِ ساده، فرمان است: تکیه کن، عمل کن، بر فهمِ محدودِ خود تکیه مکن. بیطاخون فعل است، نه احساس.",
              },
              {
                he: "רֶמֶז", name: "رِمِز",
                txt: "בִּטָּחוֹן (توکّل) = ۷۵. ریشه‌ی בט״ח پناهگاه و امنیت است؛ ارمیا ۱۷:۷ همان ریشه را دوبار می‌آورد: «خوشا که بر خدا توکّل کند (יִבְטַח) و خدا پناهِ او (מִבְטַחוֹ) باشد.» (گِماتریا محاسبه‌ی صوفِر است.)",
              },
              {
                he: "דְּרָשׁ", name: "دِراش",
                txt: "بَعل شِم طوو: مشیّتِ جزئی (هَشگاحا پراطیت) یعنی خدا در هر جزء حاضر است؛ آموزه‌ی کلاسیک می‌گوید حتی یک برگ بی مشیّتِ او نمی‌افتد. تَنیا (شَعَر هَیِحود، فصل ۱) بنیادش را می‌دهد: کلامِ الهی هر آفریده را در هر لحظه نگاه می‌دارد.",
              },
              {
                he: "סוֹד", name: "سود",
                txt: "بالاترین ایمان آن است که در پنهان‌شدنِ چهره (هِستِر پانیم، تثنیه ۳۱:۱۸) برپا می‌ماند. بِرِسلِو: انسان «همیشه خدا را در آن می‌یابد» (لیکوطی موهَران ۳۳)، چه در خوشی چه در سختی. توکّل آنجا می‌درخشد که چیزی دیده نمی‌شود.",
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
          he="כִּי לְעוֹלָם ה' דְּבָרְךָ נִצָּב בַּשָּׁמָיִם"
          fa="ای خداوند، کلامِ تو تا ابد در آسمان‌ها برپاست — کلامی که هر لحظه آفرینش را نگاه می‌دارد."
          source="تَنیا، شَعَر هَیِحود وهاِمونا، فصل ۱ (بر مزمور ۱۱۹:۸۹)"
        />

        {/* ── שֵׁמוֹת ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            שֵׁמוֹת · وزنِ نام: בט״ח
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              ریشه‌ی <span className="hebrew text-gold/90" dir="rtl">בִּטָּחוֹן</span> همان{" "}
              <span className="hebrew text-gold/90" dir="rtl">בט״ח</span> است: <span className="text-gold/90">امنیت،
              اطمینان، پناه‌جُستن</span>. این واژه فقط «باور» نیست؛ <span className="italic">پناه گرفتن</span> است —
              تنِ خود را به جایی امن سپردن. ارمیا ۱۷:۷ همین ریشه را دو بار می‌تابانَد: کسی که{" "}
              <span className="hebrew text-gold/90" dir="rtl">יִבְטַח</span> (توکّل کند)، خدا{" "}
              <span className="hebrew text-gold/90" dir="rtl">מִבְטַחוֹ</span> (پناهِ او) می‌شود.
            </p>
            <p>
              و ریشه‌ی <span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span> همان{" "}
              <span className="hebrew text-gold/90" dir="rtl">אמ״ן</span> است: استواری و وفاداری. دو ریشه،
              دو گام: <span className="text-gold/90">אמ״ן</span> استوار می‌ایستد؛ <span className="text-gold/90">בט״ח</span>
              بر آن استواری <span className="italic">تکیه می‌کند</span>. باور می‌گوید «او پابرجاست»؛ توکّل
              می‌گوید «پس بر او می‌افتم».
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
              ایمان از باور آغاز می‌شود اما در آن نمی‌مانَد. باور <span className="italic">پذیراست</span>:
              می‌دانم خدا هست و همه‌چیز را می‌گرداند. توکّل <span className="text-gold/90">فعّال</span> است:
              پس در عمل بر او می‌افتم. میانِ این دو، فاصله‌ای است که زندگی پر می‌کند.
            </p>
            <p>
              کجا باورم را گفته‌ام اما هنوز بر آن تکیه نکرده‌ام؟ بَحیا می‌گوید نشانه‌ی توکّل{" "}
              <span className="text-gold/90">آرامشِ جان</span> است. اگر دلم آرام نیست، شاید هنوز بر فهمِ
              خود تکیه دارم، نه بر او. و آنجا که چهره پنهان است — هِستِر پانیم — آیا باز هم می‌توانم بگویم
              «او پناهِ من است»؟
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
              <span className="text-gold/90">امروز یک نگرانی را به او بسپار.</span> یک دلواپسیِ مشخص
              برگزین — چیزی که فهمت دیگر کاری از آن برنمی‌آید. بگو: «این را در دستِ تو می‌گذارم؛ بر
              <span className="italic"> فهمِ خود تکیه نمی‌کنم</span>» (امثال ۳:۵). سپس به نشانه‌ی توکّل،
              <span className="text-gold/90"> آرامشِ جان</span> را بجوی: نفسی عمیق، و رهاکردنِ آن دغدغه برای
              امروز.
            </p>
            <p>
              و یک تمرینِ مشیّتِ جزئی: امروز یک رویدادِ کوچک و به‌ظاهر تصادفی را بردار و بپرس «شاید این
              برگ بی مشیّت نیفتاد». این نگاه، باورِ خاموش را به توکّلِ زنده بدل می‌کند.
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
              از باور تا توکّل
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              ایمان از سه چیز ساخته شده: <span className="text-parchment/80">باور</span> که خدا هست،{" "}
              <span className="text-parchment/80">توکّل</span> که در عمل بر او تکیه می‌کنیم، و توانِ ایستادن
              در <span className="text-parchment/80">پنهان‌شدنِ چهره</span>. بَحیا گوهرِ توکّل را «آرامشِ جان»
              می‌خوانَد؛ تَنیا می‌گوید کلامِ او هر لحظه ما را نگاه می‌دارد؛ بِرِسلِو می‌گوید او را همیشه
              می‌توان یافت. باور می‌گوید «او هست»؛ توکّل می‌افزاید «پس بر او می‌افتم».
            </p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
                style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(30px,8vw,46px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>אֱמוּנָה</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>باور · ۱۰۲</span>
              </div>
              <span className="font-cinzel text-2xl text-gold/40">←</span>
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
                style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(30px,8vw,46px)", color: "#eaf1ff", textShadow: "0 0 16px #6f8fe8" }}>בִּטָּחוֹן</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>توکّل · ۷۵</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Proverbs 3:5")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              ← مطالعه‌ی این راز در خَشمَل
            </button>

            {/* הֶמְשֵׁךְ — ادامه‌ی مسیر */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/nudo-de-la-fe" className="hover:text-gold">← گِرِهِ ایمان</Link>
              <Link href="/misterio/emunah" className="hover:text-gold">← ایمان چیست</Link>
              <button onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 22:1")}&context=kabbalah`)}
                className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50 hover:text-gold">
                ← ایمانِ ابراهیم
              </button>
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

function HebrewTile({ he, sub, color, big = true }: { he: string; sub: string; color: string; big?: boolean }) {
  return (
    <div
      className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}
    >
      <span
        className="hebrew font-bold leading-none"
        style={{ fontSize: big ? "clamp(40px, 11vw, 60px)" : "clamp(24px, 6vw, 38px)", color: "#fff6e0", textShadow: `0 0 22px ${color}, 0 0 8px ${color}` }}
      >
        {he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function EnQueConsistePage() {
  const locale = useLocale();
  const router = useRouter();
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);

  if (locale === "fa") return <EnQueConsisteFarsi />;
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
            Serie de la Fe · Misterio 3 · Anatomía
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(30px, 9vw, 64px)", color: dark ? "#dbe7ff" : "#28406e",
              textShadow: dark ? "0 0 26px #6f8fe888" : "none" }}>
            אֱמוּנָה וּבִטָּחוֹן
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            En qué consiste la fe
          </h2>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/55">
            De la creencia a la confianza
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Ya sabemos <span className="italic">qué</span> es la fe; ahora preguntamos de{" "}
            <span className="italic">qué está hecha</span> y cómo se vive. La{" "}
            <span className="text-gold/90">emuná</span> (creencia: «Dios existe y todo lo gobierna») es
            solo el comienzo. Esa creencia tranquila florece en{" "}
            <span className="text-gold/90">bitajón</span> (confianza activa: apoyarse en Él de hecho).
            El edificio de la fe tiene tres columnas: la confianza, la providencia particular y el
            ocultamiento del Rostro.
          </p>
        </div>

        {/* ── Nota del Sofer (gancho honesto) ── */}
        <Section>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Antes de empezar — nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              La definición de bitajón de las <span className="text-gold/90">Jovot HaLevavot, Puerta de
              la Confianza</span> (Bajya ibn Pakuda) está verificada palabra por palabra en Sefaria. La
              enseñanza del Baal Shem Tov sobre que «ni una hoja cae sin providencia» la presentamos como{" "}
              <span className="italic">enseñanza jasídica clásica</span>; su base teológica está en el{" "}
              <span className="text-gold/90">Tania (Sha'ar HaYijud veHaEmuná, cap. 1)</span>, que sí está
              verificado. La frase emblemática de Breslov «no hay desesperación» se atribuye a Rebe Najmán
              con honestidad, sin fijarla a un folio. Las gematrías son cálculo del Sofer, no pshat.
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
              El verso-ancla del bitajón es este:{" "}
              <span className="hebrew text-gold/90" dir="rtl">בְּטַח אֶל ה' בְּכָל לִבֶּךָ וְאֶל בִּינָתְךָ אַל תִּשָּׁעֵן</span>{" "}
              —«Confía en Dios con <span className="text-gold/90">todo</span> tu corazón, y no te apoyes en
              tu propio entendimiento»— (Proverbios 3:5). El verso siguiente lo completa: «en todos tus
              caminos conócelo, y Él enderezará tus senderos» (3:6).
            </p>
            <p>
              Mira lo que el verso pide: no solo «cree que Dios existe», sino «<span className="text-gold/90">apóyate</span>»
              —un verbo de acción—. Y «no te apoyes en tu propio entendimiento»: el bitajón empieza
              justo donde mi razón se agota. La fe está hecha de creencia, pero se manifiesta en el acto
              de apoyarse. Por eso este estudio va a la <span className="italic">anatomía</span>: de qué
              está hecha la fe y cómo opera de verdad.
            </p>
          </div>
        </Section>

        <PullQuote
          he="בְּטַח אֶל ה' בְּכָל לִבֶּךָ וְאֶל בִּינָתְךָ אַל תִּשָּׁעֵן"
          es="Confía en Dios con todo tu corazón, y no te apoyes en tu propio entendimiento."
          source="Proverbios 3:5"
        />

        {/* ── Las tres columnas ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Las tres columnas del edificio de la fe
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            La <span className="text-gold/80">emuná</span> (creencia) es la planta baja. Sobre ella se
            levantan tres columnas que sostienen la fe vivida: el <span className="text-gold/80">bitajón</span>
            (la confianza activa), la <span className="text-gold/80">hashgajá pratit</span> (la providencia
            en cada detalle) y la fuerza de sostener cuando hay <span className="text-gold/80">hester
            panim</span> (el Rostro oculto).
          </p>
          <div className="mb-8 flex flex-wrap items-stretch justify-center gap-3">
            <HebrewTile he="בִּטָּחוֹן" sub="Bitajón · confianza · 75" color="#6f8fe8" />
            <HebrewTile he="הַשְׁגָּחָה" sub="Hashgajá · providencia" color="#6f8fe8" big={false} />
            <HebrewTile he="הֶסְתֵּר פָּנִים" sub="Hester panim · Rostro oculto" color="#c9a43e" big={false} />
          </div>
        </Section>

        {/* ── Mefarshim ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            מְפָרְשִׁים · Comentaristas
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Bajya ibn Pakuda (Puerta de la Confianza):</span>{" "}
              la gran anatomía del bitajón es suya. Define:{" "}
              <span className="hebrew text-gold/90" dir="rtl">מַהוּת הַבִּטָּחוֹן הִיא מְנוּחַת נֶפֶשׁ הַבּוֹטֵחַ</span>{" "}
              —«la esencia del bitajón es la <span className="text-gold/90">tranquilidad del alma</span> del
              que confía»—, cuando su corazón se apoya en Aquel en quien confía. El bitajón, entonces, no es
              un sentimiento ni una apuesta: es un <span className="italic">estado de reposo</span> que brota
              de la confianza. Se reconoce por su fruto: la calma del alma.
            </p>
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Jazón Ish (Emuná uVitajón):</span>{" "}
              él afinó el contraste clásico: la <span className="text-gold/90">emuná</span> es el
              reconocimiento intelectual de que Dios gobierna el mundo; el <span className="text-gold/90">bitajón</span>{" "}
              no es la certeza de que «todo saldrá bien», sino la serenidad de saber que todo está en Sus
              manos. <span className="text-parchment/55">(Esta obra no está en Sefaria; lo presentamos con
              sourcing honesto, y su raíz se sostiene en Bajya, que sí verificamos.)</span>
            </p>
          </div>
        </Section>

        <PullQuote
          he="מַהוּת הַבִּטָּחוֹן הִיא מְנוּחַת נֶפֶשׁ הַבּוֹטֵחַ וְשֶׁיִּהְיֶה לִבּוֹ סָמוּךְ עַל מִי שֶׁבָּטַח עָלָיו"
          es="La esencia del bitajón es la tranquilidad del alma del que confía, cuando su corazón se apoya en Aquel en quien confía."
          source="Jovot HaLevavot, Cuarto Tratado sobre la Confianza, cap. 1 (Bajya ibn Pakuda)"
        />

        {/* ── Remez: la gematría ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            רֶמֶז · La insinuación de los números
          </h3>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="בִּטָּחוֹן" sub="Bitajón · 75" color="#6f8fe8" big={false} />
            <span className="font-cinzel text-2xl text-gold/40">·</span>
            <HebrewTile he="מִבְטָח" sub="Mivtaj · refugio · 59" color="#c9a43e" big={false} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="hebrew text-gold/90" dir="rtl">בִּטָּחוֹן</span> (bitajón, confianza) ={" "}
              <span className="text-gold/90">75</span>. La raíz <span className="hebrew text-gold/90" dir="rtl">בט״ח</span>{" "}
              no significa solo «creer»: significa <span className="text-gold/90">refugiarse, buscar
              amparo, sentirse seguro</span>. Por eso Jeremías 17:7 hace brillar la misma raíz dos veces en un
              solo verso: «bendito el hombre que <span className="hebrew text-gold/90" dir="rtl">יִבְטַח</span>{" "}
              (confía) en Dios, y Dios es su <span className="hebrew text-gold/90" dir="rtl">מִבְטַחוֹ</span>{" "}
              (mivtajó, su refugio)».
            </p>
            <p>
              La fe que confía no es un cálculo: es <span className="italic">entrar en un refugio</span>. El
              que confía no se asegura el resultado; se asegura el <span className="text-gold/90">amparo</span>.{" "}
              <span className="text-parchment/55">(Gematrías calculadas por el Sofer: בִּטָּחוֹן = 75,{" "}
              מִבְטָח = 59, אֱמוּנָה = 102. Se presentan como insinuación, no como pshat.)</span>
            </p>
          </div>
        </Section>

        {/* ── Drash: la providencia particular ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            דְּרָשׁ · La providencia en cada hoja
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Aquí entra la <span className="text-gold/90">hashgajá pratit</span>, la providencia particular:
              la convicción de que Dios está involucrado en cada detalle, no solo en lo grande. La voz del{" "}
              <span className="text-gold/90">Baal Shem Tov</span> es célebre por esto: ni una hoja cae o gira
              del árbol sin la providencia del Cielo. <span className="text-parchment/55">(Lo damos como
              enseñanza jasídica clásica del Besht.)</span>
            </p>
            <p>
              Su base teológica firme está en el <span className="text-gold/90">Tania</span> (Sha'ar HaYijud
              veHaEmuná, cap. 1, citando al propio Baal Shem Tov sobre Salmos 33:6 y 119:89): la{" "}
              <span className="italic">palabra divina</span> que creó cada cosa permanece dentro de ella y la
              sostiene <span className="text-gold/90">a cada instante</span>. Si esas «letras» se apartaran
              «un solo instante», toda la creación revertiría a la nada absoluta, como antes de los Seis Días.
              Por eso el bitajón tiene piso: no confío en un Dios lejano que dio cuerda al mundo, sino en uno
              que <span className="italic">ahora mismo</span> me está sosteniendo en el ser.
            </p>
          </div>
        </Section>

        <PullQuote
          he="כִּי לְעוֹלָם ה' דְּבָרְךָ נִצָּב בַּשָּׁמָיִם"
          es="Para siempre, oh Dios, Tu palabra está firme en los cielos —la palabra que en cada instante sostiene la creación."
          source="Tania, Sha'ar HaYijud veHaEmuná, cap. 1 (sobre Salmos 119:89)"
        />

        {/* ── Sod: el Rostro oculto ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · La fe más alta: cuando el Rostro se oculta
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La fe más alta no es la del que ve, sino la del que sostiene cuando <span className="italic">no</span>{" "}
              ve. La Torá lo nombra: <span className="hebrew text-gold/90" dir="rtl">וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי</span>{" "}
              —«y Yo ciertamente ocultaré Mi Rostro»— (Deuteronomio 31:18). El{" "}
              <span className="text-gold/90">hester panim</span>, la ocultación del Rostro, es la prueba donde
              la creencia tranquila se convierte en bitajón verdadero: confiar precisamente donde no se siente
              la Presencia.
            </p>
            <p>
              La voz de <span className="text-gold/90">Breslov</span> (Rebe Najmán) ilumina ese lugar oscuro:
              en Likutei Moharan 33 enseña que el hombre «<span className="text-gold/90">siempre encuentra a
              Dios en ello</span>» —tanto en lo bueno como en lo difícil— mediante la Torá y los tzadikim. De
              esa raíz brota la enseñanza emblemática de Breslov, atribuida a Rebe Najmán:{" "}
              <span className="hebrew text-gold/90" dir="rtl">אֵין שׁוּם יֵאוּשׁ בָּעוֹלָם כְּלָל</span> —«no hay
              desesperación alguna en el mundo»—. <span className="text-parchment/55">(La frase se atribuye a
              Rebe Najmán; no fijamos un folio porque no confirmamos el locus exacto.)</span> Dios está incluso
              en el lugar más bajo; por eso, incluso bajo el hester panim, el hilo sigue atado.
            </p>
          </div>
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
                txt: "«Confía en Dios con todo tu corazón» (Proverbios 3:5). En lo llano, es un mandato: apóyate, actúa, no te apoyes en tu entendimiento limitado. El bitajón es un verbo, no un sentimiento.",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "בִּטָּחוֹן (confianza) = 75. La raíz בט״ח es refugio, amparo, seguridad. Jeremías 17:7 la hace brillar dos veces: «el que confía (יִבְטַח) en Dios, y Dios es su refugio (מִבְטַחוֹ)». Confiar es entrar en un amparo, no asegurar un resultado. (Gematría calculada por el Sofer.)",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "Baal Shem Tov: la providencia particular (hashgajá pratit) significa que Dios está en cada detalle; ni una hoja cae sin providencia (enseñanza jasídica clásica). El Tania (Sha'ar HaYijud, cap. 1) le da piso: la palabra divina sostiene cada criatura a cada instante.",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "La fe más alta sostiene en el hester panim, la ocultación del Rostro (Deut 31:18). Breslov: «siempre encuentra a Dios en ello» (Likutei Moharan 33), en lo bueno y en lo difícil. El bitajón resplandece justo donde nada se ve.",
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
            שֵׁמוֹת · El peso del nombre: בט״ח
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La raíz de <span className="hebrew text-gold/90" dir="rtl">בִּטָּחוֹן</span> es{" "}
              <span className="hebrew text-gold/90" dir="rtl">בט״ח</span> —<span className="text-gold/90">seguridad,
              confianza, buscar refugio</span>—. No es solo «creer»: es <span className="italic">ampararse</span>,
              poner el propio cuerpo en un lugar seguro. Jeremías 17:7 hace brillar la misma raíz dos veces: el
              que <span className="hebrew text-gold/90" dir="rtl">יִבְטַח</span> (confía), Dios se vuelve su{" "}
              <span className="hebrew text-gold/90" dir="rtl">מִבְטַחוֹ</span> (mivtajó, su refugio). El verbo de
              confiar y el sustantivo de refugio son la misma palabra: confiar <span className="italic">es</span>{" "}
              refugiarse.
            </p>
            <p>
              Y la raíz de <span className="hebrew text-gold/90" dir="rtl">אֱמוּנָה</span> es{" "}
              <span className="hebrew text-gold/90" dir="rtl">אמ״ן</span> —firmeza, fidelidad—. Dos raíces, dos
              pasos: <span className="text-gold/90">אמ״ן</span> se mantiene firme; <span className="text-gold/90">בט״ח</span>{" "}
              <span className="italic">se apoya</span> en esa firmeza. La creencia dice «Él es firme»; la confianza
              añade «por eso me dejo caer en Él». En eso consiste la fe: el nombre de la creencia y el nombre del
              refugio, encadenados.
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
              La fe empieza en la creencia, pero no se queda ahí. La creencia es{" "}
              <span className="italic">pasiva</span>: sé que Dios existe y todo lo gobierna. La confianza es{" "}
              <span className="text-gold/90">activa</span>: entonces, de hecho, me apoyo en Él. Entre las dos
              hay una distancia que solo la vida llena —el momento en que dejo de calcular y me dejo caer.
            </p>
            <p>
              ¿Dónde he <span className="italic">dicho</span> que confío, pero todavía no me he apoyado? Bajya
              da una señal honesta: el fruto del bitajón es la <span className="text-gold/90">tranquilidad del
              alma</span>. Si mi alma no está en reposo, quizá sigo apoyado en mi propio entendimiento, no en
              Él. Y donde el Rostro se oculta —el hester panim— ¿puedo todavía decir «Él es mi refugio»? Esa es
              la prueba en la que la creencia tibia se vuelve confianza verdadera.
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
              <span className="text-gold/90">Hoy, entrégale una preocupación concreta.</span> Elige una
              inquietud específica —algo que tu entendimiento ya no puede resolver—. Di, en voz baja:
              «<span className="italic">esto lo pongo en Tus manos; no me apoyo en mi propio entendimiento</span>»
              (Proverbios 3:5). Y luego busca la señal del bitajón según Bajya: la{" "}
              <span className="text-gold/90">tranquilidad del alma</span> —una respiración honda y soltar esa
              carga por hoy—.
            </p>
            <p>
              Y un ejercicio de <span className="italic">hashgajá pratit</span>: toma hoy un suceso pequeño,
              en apariencia casual —un encuentro, un retraso, una palabra— y pregúntate «quizá esta hoja no cayó
              sin providencia». Esa mirada convierte la creencia callada en confianza viva. La fe no consiste en
              entenderlo todo; consiste en <span className="text-gold/90">apoyarse</span> en Aquel que ahora
              mismo te sostiene en el ser.
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
              De la creencia a la confianza
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              La fe consiste en tres cosas: la <span className="text-parchment/80">creencia</span> de que Dios
              existe, la <span className="text-parchment/80">confianza</span> de apoyarse en Él de hecho, y la
              fuerza de sostener bajo el <span className="text-parchment/80">Rostro oculto</span>. Bajya llama
              al bitajón «tranquilidad del alma»; el Tania dice que Su palabra nos sostiene a cada instante;
              Breslov dice que a Él siempre se le puede encontrar. La creencia dice «Él existe»; la confianza
              añade «por eso me apoyo en Él».
            </p>

            {/* Sello: emuná → bitajón */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(34px,9vw,50px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>אֱמוּנָה</span>
                <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>creencia · 102</span>
              </div>
              <span className="font-cinzel text-2xl text-gold/40">→</span>
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(34px,9vw,50px)", color: "#eaf1ff", textShadow: "0 0 16px #6f8fe8" }}>בִּטָּחוֹן</span>
                <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>confianza · 75</span>
              </div>
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              Creer es saber que Él es firme; confiar es dejarse caer en esa firmeza.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Confía con todo tu corazón · Proverbios 3:5", ref: "Proverbs 3:5" },
                { label: "Su refugio · Jeremías 17:7", ref: "Jeremiah 17:7" },
                { label: "La tranquilidad del alma · Jovot HaLevavot", ref: "Chovot HaLevavot, Fourth Treatise on Trust 1" },
                { label: "Ocultaré Mi Rostro · Deut 31:18", ref: "Deuteronomy 31:18" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Proverbs 3:5")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            {/* Hemshej — umbral «Sigue el hilo» */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/nudo-de-la-fe" className="hover:text-gold">El nudo de la fe →</Link>
              <Link href="/misterio/emunah" className="hover:text-gold">¿Qué es la fe? →</Link>
              <button onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 22:1")}&context=kabbalah`)}
                className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50 hover:text-gold">
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
