"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: ABRAHAM — EL PADRE DE LA FE ──────────────────────────
// Serie de la Fe · misterio 4 · PRIMERO de la sub-serie «Personajes de la Fe».
// Del concepto a la persona: la fe (emuná) ENCARNADA en una vida. El #2 definió
// QUÉ es la fe; el #3, EN QUÉ consiste; aquí la fe se hace BIOGRAFÍA — una vida
// que cree «en lo no visto», pasa diez pruebas, y deja la fe como herencia a Israel.
//
// FUENTES VERIFICADAS POR EL SOFER (editor-erudito) contra la API de Sefaria (v3):
//  · Génesis 15:6 — «וְהֶאֱמִן בַּה' וַיַּחְשְׁבֶהָ לּוֹ צְדָקָה». Verificado palabra por palabra.
//    EL verso fundacional de la fe: creyó, y se lo contó por justicia (tzedaká).
//  · Génesis 12:1 — «וַיֹּאמֶר ה' אֶל אַבְרָם לֶךְ לְךָ מֵאַרְצְךָ... אֶל הָאָרֶץ אֲשֶׁר אַרְאֶךָּ».
//    Verificado. La primera prueba: ir «a la tierra que te mostraré» (aún no vista).
//  · Génesis 17:5 — «וְלֹא יִקָּרֵא עוֹד אֶת שִׁמְךָ אַבְרָם וְהָיָה שִׁמְךָ אַבְרָהָם כִּי אַב הֲמוֹן
//    גּוֹיִם נְתַתִּיךָ». Verificado. El cambio de nombre y su etimología en la propia Torá.
//  · Génesis 22:1 — «וְהָאֱלֹהִים נִסָּה אֶת אַבְרָהָם... וַיֹּאמֶר הִנֵּנִי». Verificado.
//  · Génesis 22:2 — «קַח נָא אֶת בִּנְךָ אֶת יְחִידְךָ אֲשֶׁר אָהַבְתָּ... וְלֶךְ לְךָ». Verificado
//    (el segundo «לֶךְ לְךָ», que cierra el arco con 12:1).
//  · Génesis 22:8 — «אֱלֹהִים יִרְאֶה לּוֹ הַשֶּׂה לְעֹלָה בְּנִי». Verificado.
//  · Génesis 22:12 — «כִּי עַתָּה יָדַעְתִּי כִּי יְרֵא אֱלֹהִים אַתָּה... וְלֹא חָשַׂכְתָּ אֶת בִּנְךָ».
//    Verificado.
//  · Génesis 22:14 — «וַיִּקְרָא אַבְרָהָם שֵׁם הַמָּקוֹם הַהוּא ה' יִרְאֶה... בְּהַר ה' יֵרָאֶה».
//    Verificado.
//  · Pirkei Avot 5:3 — «עֲשָׂרָה נִסְיוֹנוֹת נִתְנַסָּה אַבְרָהָם אָבִינוּ... וְעָמַד בְּכֻלָּם, לְהוֹדִיעַ
//    כַּמָּה חִבָּתוֹ שֶׁל אַבְרָהָם אָבִינוּ». Verificado palabra por palabra (las diez pruebas).
//  · Éxodo 14:31 — «וַיַּאֲמִינוּ בַּה' וּבְמֹשֶׁה עַבְדּוֹ». Verificado. El mérito de la emuná de
//    Abraham se proyecta al pueblo en el Mar (la fe heredada).
//  · Miqueas 7:20 — «תִּתֵּן אֱמֶת לְיַעֲקֹב חֶסֶד לְאַבְרָהָם». Verificado: «jésed para Abraham» —
//    ancla bíblica del vínculo Abraham = jésed (bondad amorosa), sin necesidad de Zohar.
//  · Rashi sobre Génesis 15:6 — verificado: «הקב"ה חֲשָׁבָהּ לְאַבְרָם לִזְכוּת וְלִצְדָקָה עַל
//    הַאֲמָנָה שֶׁהֶאֱמִין בּוֹ» (se lo contó por mérito y justicia por la fe con que creyó).
//  · Rashi sobre Génesis 22:1 — verificado: sobre «הִנֵּנִי», «כָּךְ הִיא עֲנִיָּתָם שֶׁל חֲסִידִים,
//    לְשׁוֹן עֲנָוָה הוּא וּלְשׁוֹן זִמּוּן» (así responden los piadosos: humildad y disponibilidad).
//  · Ramban sobre Génesis 15:6 — verificado: objeta a Rashi («¿qué mérito es ese, si ya había
//    creído para degollar a su hijo único y amado?») y propone: Abraham creyó que por la
//    JUSTICIA de Dios (בְּצִדְקוֹ שֶׁל הקב"ה) recibiría descendencia. (Dos Filos sobre el verso.)
//  · Mishná Ohalot 1:8 — «מָאתַיִם וְאַרְבָּעִים וּשְׁמֹנָה אֵבָרִים בָּאָדָם». Verificado: los 248
//    miembros del cuerpo humano (ancla del 248).
//
// GEMATRÍAS CALCULADAS POR EL SOFER (cálculo propio, verificado):
//  · אַבְרָם = 243 (א1+ב2+ר200+ם40).
//  · אַבְרָהָם = 248 (la ה añadida = 5; 243+5 = 248).
//  · 248 = los רמ"ח (RaMaJ) miembros del cuerpo humano (Ohalot 1:8, verificado) y, por la
//    drasha clásica de R. Simlai (Makot 23b), el número de las mitzvot aseh (mandamientos
//    positivos). El 248=miembros está VERIFICADO en Ohalot; el 248=mitzvot aseh se presenta
//    como enseñanza clásica (remez), sin pretender el segmento exacto del daf.
//  · חֶסֶד = 72. אֱמוּנָה = 102.
//
// GUARDARRAÍLES DE HONESTIDAD:
//  · La IDENTIDAD de las diez pruebas varía entre los Rishonim: Rambam (Comentario a Avot 5:3),
//    Rashi y Pirkei deRabbi Eliezer (caps. 26–31) NO coinciden en la lista exacta. Se dice con
//    honestidad: la Mishná fija el NÚMERO (diez) y que «resistió todas»; la enumeración concreta
//    es materia de midrash y difiere entre las fuentes. No se inventa una lista «oficial».
//  · La etimología אַבְרָהָם ← אַב הֲמוֹן («padre de multitud») es la lectura DERASH que la propia
//    Torá ofrece (Gén 17:5), un juego de sonido, no filología científica estricta (faltaría una
//    ר para אב-המון literal); se presenta como «la lectura que la Torá misma da».
//  · El vínculo Akedá = amor + temor (gematría 137) ya tiene su propio estudio en
//    /misterio/entrelazamiento; aquí solo se ENLAZA, no se repite.

// ── Página en FARSI (renderizada cuando locale === "fa") ─────────────────────
function AbrahamFarsi() {
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
            سری ایمان · بخش چهارم · چهره‌های ایمان
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(34px, 10vw, 72px)", color: "#dbe7ff",
              textShadow: "0 0 26px #6f8fe888" }}>
            אַבְרָהָם
          </h1>
          <h2 className="text-xl font-bold text-parchment/90 sm:text-2xl">
            ابراهیم — پدرِ ایمان
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold/55">
            از مفهوم تا انسان
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
            دانستیم ایمان <span className="text-gold/90">چیست</span> و از چه <span className="text-gold/90">ساخته
            شده</span>. اکنون ایمان <span className="italic">تن می‌گیرد</span>: در یک زندگی. ابراهیم نخستین کسی است
            که کتاب درباره‌اش می‌گوید «<span className="text-gold/90">ایمان آورد</span>» (پیدایش ۱۵:۶). او همه‌چیز را
            به‌خاطرِ وعده‌ای ندیده رها کرد، ده آزمون را پشت سر گذاشت، و ایمان را همچون میراث به اسرائیل سپرد.
            این، ایمانِ هستی‌یافته است.
          </p>
        </div>

        {/* ── صادقانه ── */}
        <Sec>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/55">
              پیش از آغاز — یادداشت صادقانه
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir="rtl">
              همه‌ی آیات واژه‌به‌واژه با سِفاریا راستی‌آزمایی شده‌اند. <span className="text-gold/90">شمارِ</span> ده
              آزمون در مِشنا (پیرکی آووت ۵:۳) قطعی است، اما <span className="italic">فهرستِ دقیقِ</span> آن‌ها میانِ
              بزرگان یکی نیست: رَمبام، راشی و پیرکی دِرَبّی اِلیعزر فهرست‌های متفاوت دارند؛ این را با صداقت می‌گوییم.
              ریشه‌یابیِ אַבְרָהָם ← אַב הֲמוֹן («پدرِ انبوهِ») قرائتی است که خودِ تورات می‌دهد (۱۷:۵)، بازیِ آوا
              نه زبان‌شناسیِ سخت‌گیر. گِماتریاها محاسبه‌ی صوفِر است: <span className="text-gold/90">אַבְרָם = ۲۴۳</span>،{" "}
              <span className="text-gold/90">אַבְרָהָם = ۲۴۸</span>.
            </p>
          </div>
        </Sec>

        {/* ── תַּרְגּוּם ── */}
        <Sec>
          <h3 className="mb-2 text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · آیه‌ی بنیادین و ترجمه
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              نخستین باری که کتابِ مقدّس فعلِ «ایمان آوردن» را درباره‌ی انسانی به‌کار می‌برد، اینجاست:{" "}
              <span className="hebrew text-gold/90" dir="rtl">וְהֶאֱמִן בַּה' וַיַּחְשְׁבֶהָ לּוֹ צְדָקָה</span>{" "}
              — «و او به خداوند ایمان آورد، و او [خدا] آن را برایش <span className="text-gold/90">عدالت/پارسایی</span>
              (צְדָקָה) شمرد» (پیدایش ۱۵:۶). خدا به ابراهیم وعده می‌دهد فرزندانی چون ستارگانِ آسمان — و ابراهیم،
              پیر و بی‌فرزند، باور می‌کند.
            </p>
            <p>
              توجه کن: ایمانِ ابراهیم <span className="italic">تماشای دلیل</span> نبود؛ <span className="text-gold/90">تکیه
              بر ناپیدا</span> بود. او ستاره‌ای ندید که فرزندش باشد؛ او بر <span className="text-gold/90">گوینده‌ی</span>
              وعده تکیه کرد. و همین، در سراسرِ زندگی‌اش تکرار می‌شود — از «بیرون شو» (לֶךְ לְךָ) تا کوهِ موریا.
            </p>
          </div>
        </Sec>

        <PQ
          he="וְהֶאֱמִן בַּה' וַיַּחְשְׁבֶהָ לּוֹ צְדָקָה"
          fa="و او به خداوند ایمان آورد، و [خدا] آن را برایش عدالت شمرد."
          source="پیدایش ۱۵:۶"
        />

        {/* ── ده آزمون (visual) ── */}
        <Sec>
          <h3 className="mb-3 mt-16 text-center text-sm uppercase tracking-[0.3em] text-gold/60">
            עֲשָׂרָה נִסְיוֹנוֹת · ده آزمون
          </h3>
          <p className="mx-auto mb-6 max-w-md text-center text-sm leading-relaxed text-muted" dir="rtl">
            «ابراهیمِ پدرِ ما به ده آزمون آزموده شد و در همه پایدار ماند» (پیرکی آووت ۵:۳). دو آزمون،
            دو سرِ کمان‌اند: نخستین «<span className="text-gold/90">بیرون شو</span>» و واپسین «<span className="text-gold/90">قربانی
            کن</span>» — و هر دو با همان فرمان آغاز می‌شوند: לֶךְ לְךָ.
          </p>
          <div className="mb-6 flex flex-wrap items-stretch justify-center gap-3">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
              style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
              <span className="text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>آزمونِ نخست</span>
              <span className="hebrew mt-1 font-bold leading-none" style={{ fontSize: "clamp(26px,7vw,40px)", color: "#eaf1ff", textShadow: "0 0 14px #6f8fe8" }}>לֶךְ לְךָ</span>
              <span className="mt-1 text-xs text-parchment/70">بیرون شو · پیدایش ۱۲:۱</span>
            </div>
            <div className="flex items-center font-cinzel text-2xl text-gold/40">···</div>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
              style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
              <span className="text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>آزمونِ دهم</span>
              <span className="hebrew mt-1 font-bold leading-none" style={{ fontSize: "clamp(26px,7vw,40px)", color: "#fff6e0", textShadow: "0 0 14px #c9a43e" }}>הָעֲקֵדָה</span>
              <span className="mt-1 text-xs text-parchment/70">به‌بندکشیدن · پیدایش ۲۲</span>
            </div>
          </div>
          <p className="mx-auto max-w-md text-center text-[11px] leading-relaxed text-parchment/55" dir="rtl">
            مِشنا <span className="italic">شمار</span> را قطعی می‌کند (ده)، اما فهرستِ دقیق میانِ رَمبام، راشی و
            پیرکی دِرَبّی اِلیعزر یکی نیست. ما شمار و دو سرِ کمان را می‌آوریم، نه فهرستی «رسمی».
          </p>
        </Sec>

        {/* ── מְפָרְשִׁים ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            מְפָרְשִׁים · مفسران
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              <span className="text-[11px] uppercase tracking-widest text-gold/50">راشی (بر پیدایش ۱۵:۶):</span>{" "}
              «<span className="hebrew text-gold/90" dir="rtl">הקב"ה חֲשָׁבָהּ לְאַבְרָם לִזְכוּת וְלִצְדָקָה עַל
              הַאֲמָנָה שֶׁהֶאֱמִין בּוֹ</span>» — خدا این را برای ابراهیم شایستگی و عدالت شمرد، به‌خاطرِ ایمانی که
              به او آورد. ایمان، خود، <span className="italic">عملِ پارسایی</span> است.
            </p>
            <p>
              <span className="text-[11px] uppercase tracking-widest text-gold/50">رَمبان (دو لبه بر همان آیه):</span>{" "}
              رَمبان به راشی خرده می‌گیرد: «این چه شایستگی است؟ کسی که ایمان آورد تا پسرِ یگانه و محبوبش را قربانی
              کند، چگونه به <span className="italic">بشارتی خوش</span> ایمان نیاورد؟» و قرائتِ خود را می‌آورد:
              ابراهیم باور کرد که به <span className="text-gold/90">عدالتِ خداوند</span> (בְּצִדְקוֹ שֶׁל הקב"ה)
              فرزند خواهد یافت — نه چون پاداشِ خود. دو لبه‌ی یک آیه.
            </p>
            <p>
              <span className="text-[11px] uppercase tracking-widest text-gold/50">راشی (بر پیدایش ۲۲:۱ — «הִנֵּנִי»):</span>{" "}
              بر پاسخِ ابراهیم «<span className="hebrew text-gold/90" dir="rtl">הִנֵּנִי</span>» (اینک منم): «<span className="hebrew text-gold/90" dir="rtl">כָּךְ
              הִיא עֲנִיָּתָם שֶׁל חֲסִידִים, לְשׁוֹן עֲנָוָה הוּא וּלְשׁוֹן זִמּוּן</span>» — چنین است پاسخِ پارسایان:
              زبانِ فروتنی و زبانِ آمادگی. «هیننی» یعنی «همه‌ی من، اینجا، برای تو».
            </p>
            <p>
              <span className="text-[11px] uppercase tracking-widest text-gold/50">آریزال و کابالا:</span>{" "}
              ابراهیم ریشه‌ی <span className="text-gold/90">חֶסֶד</span> (مهرِ بخشنده) است، ستونِ راستِ درختِ سفیروت.
              کتاب صریح است: «<span className="hebrew text-gold/90" dir="rtl">חֶסֶד לְאַבְרָהָם</span>» (مهر برای
              ابراهیم — میخا ۷:۲۰). و آزمونِ واپسین، عَقِدا، مهر را با <span className="text-gold/90">یِراه</span>
              (ترس/خشیت) درمی‌آمیزد؛ این درآمیختن، رازِ خود را دارد.
            </p>
          </div>
        </Sec>

        <PQ
          he="כָּךְ הִיא עֲנִיָּתָם שֶׁל חֲסִידִים, לְשׁוֹן עֲנָוָה הוּא וּלְשׁוֹן זִמּוּן"
          fa="چنین است پاسخِ پارسایان: زبانِ فروتنی است و زبانِ آمادگی — «هیننی»."
          source="راشی بر پیدایش ۲۲:۱"
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
                txt: "«و او به خداوند ایمان آورد» (پیدایش ۱۵:۶). در سطحِ ساده: ابراهیم بر وعده‌ای ندیده تکیه کرد. ایمانِ او یک رویداد نبود؛ شکلِ یک زندگی بود — از «بیرون شو» تا «قربانی کن».",
              },
              {
                he: "רֶמֶז", name: "رِمِز",
                txt: "אַבְרָם = ۲۴۳؛ אַבְרָהָם = ۲۴۸. הِ افزوده پنج می‌افزاید، و ۲۴۸ شمارِ اندام‌های تنِ آدمی است (اوهالوت ۱:۸) و، در دِراشِ کلاسیک، شمارِ فرمان‌های مثبت. نام، تمامِ تن را در خدمت می‌گذارد. (گِماتریا محاسبه‌ی صوفِر است.)",
              },
              {
                he: "דְּרָשׁ", name: "دِراش",
                txt: "دو بار «לֶךְ לְךָ» (پیدایش ۱۲:۱ و ۲۲:۲): همان فرمان، دو سرِ کمان. بَعل شِم طوو می‌آموزد که هر «بیرون شدن» بازگشتی به ریشه است؛ ابراهیم با هر آزمون از خود بیرون می‌آید تا به او نزدیک‌تر شود. «לֶךְ לְךָ» یعنی «به‌سوی خویشِ راستینت برو».",
              },
              {
                he: "סוֹד", name: "سود",
                txt: "ابراهیم = חֶסֶד، مهرِ بی‌مرز. اما مهرِ بی‌مرز باید با یِراه (خشیت) مهار شود تا فرو نریزد؛ ازین‌روست عَقِدا. در عَقِدا، مهر و ترس یکی می‌شوند (← رازِ درهم‌تنیدگی). بَعل هَسولام: ایمانِ ابراهیم، آن «دل‌سپردنِ بالاتر از خرد» است که بنیادِ پیوند است.",
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
          he="וְהָאֱלֹהִים נִסָּה אֶת אַבְרָהָם... וַיֹּאמֶר אֵלָיו אַבְרָהָם וַיֹּאמֶר הִנֵּנִי"
          fa="و خدا ابراهیم را آزمود... و به او گفت «ابراهیم»، و او گفت «اینک منم»."
          source="پیدایش ۲۲:۱"
        />

        {/* ── שֵׁמוֹת ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            שֵׁמוֹת · وزنِ نام: אַבְרָם ← אַבְרָהָם
          </h3>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
              style={{ borderColor: "#6f8fe866", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 18px #6f8fe822" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(28px,7vw,42px)", color: "#dbe7ff", textShadow: "0 0 14px #6f8fe8" }}>אַבְרָם</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>اَورام · ۲۴۳</span>
            </div>
            <span className="font-cinzel text-3xl text-gold" style={{ textShadow: "0 0 16px #c9a43e" }}>+ ה →</span>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
              style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(28px,7vw,42px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>אַבְרָהָם</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>اَورهام · ۲۴۸</span>
            </div>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              خدا نامش را دگرگون می‌کند: «<span className="hebrew text-gold/90" dir="rtl">וְהָיָה שִׁמְךָ אַבְרָהָם
              כִּי אַב הֲמוֹן גּוֹיִם נְתַתִּיךָ</span>» — «نامت ابراهیم خواهد بود، زیرا تو را پدرِ <span className="text-gold/90">انبوهِ
              قوم‌ها</span> ساختم» (پیدایش ۱۷:۵). تورات خود ریشه را می‌دهد: אַבְרָהָם همچون אַב הֲמוֹן (پدرِ انبوه)
              خوانده می‌شود — بازیِ آوا که خودِ متن پیشنهاد می‌کند.
            </p>
            <p>
              یک حرف افزوده می‌شود: <span className="hebrew text-gold/90" dir="rtl">ה</span>. در گِماتریا پنج
              می‌افزاید: ۲۴۳ ← <span className="text-gold/90">۲۴۸</span>. و ۲۴۸ شمارِ <span className="text-gold/90">اندام‌های
              تنِ آدمی</span> است (مِشنا اوهالوت ۱:۸، راستی‌آزمایی شده) و، در دِراشِ کلاسیک، شمارِ فرمان‌های مثبت.
              معنایش این است: تا «اَورام» بود، تنی محدود داشت؛ چون «اَورهام» شد، <span className="italic">تمامِ
              وجودش</span> در خدمتِ وعده ایستاد.
            </p>
            <p>
              و آن حرفِ <span className="hebrew text-gold/90" dir="rtl">ה</span>؟ همان حرفی است که در نامِ خدا دو بار
              هست (י-ה-ו-ה). نَفَسی از نامِ الهی در نامِ انسان دمیده می‌شود — نشانه‌ی پیمان. نام در تورات برچسب
              نیست؛ <span className="text-gold/90">آشکارسازی</span> است: «כִּשְׁמוֹ כֶּן הוּא».
            </p>
          </div>
        </Sec>

        <PQ
          he="וְלֹא יִקָּרֵא עוֹד אֶת שִׁמְךָ אַבְרָם וְהָיָה שִׁמְךָ אַבְרָהָם כִּי אַב הֲמוֹן גּוֹיִם נְתַתִּיךָ"
          fa="دیگر نامت اَورام خوانده نخواهد شد؛ نامت ابراهیم خواهد بود، زیرا تو را پدرِ انبوهِ قوم‌ها ساختم."
          source="پیدایش ۱۷:۵"
        />

        {/* ── הִתְבּוֹנְנוּת ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            הִתְבּוֹנְנוּת · تأمل
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              ایمانِ ابراهیم مفهوم نبود؛ <span className="text-gold/90">قدم</span> بود. هر بار که خدا گفت «برو»،
              او رفت — بی‌آنکه مقصد را ببیند. «به سرزمینی که به تو <span className="italic">نشان خواهم داد</span>»
              (۱۲:۱): نه «که نشانت داده‌ام». ایمان یعنی حرکت به‌سوی آنچه هنوز پیدا نیست.
            </p>
            <p>
              کجا منتظرم اول ببینم، بعد قدم بردارم؟ ابراهیم برعکس کرد: اول قدم، بعد دیدن. و در کوهِ موریا گفت
              «<span className="text-gold/90">אֱלֹהִים יִרְאֶה</span>» (خدا خواهد دید/فراهم خواهد کرد — ۲۲:۸)، و
              همان‌جا نام نهاد «<span className="text-gold/90">ה' יִרְאֶה</span>» (۲۲:۱۴). آنجا که او <span className="italic">دید</span>
              که نمی‌بیند و باز رفت، خدا <span className="italic">دیده شد</span>.
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
              <span className="text-gold/90">امروز یک «לֶךְ לְךָ»ی کوچک بردار.</span> یک قدمِ درست را برگزین که
              به‌تأخیر انداخته‌ای چون پایانش را نمی‌بینی — گفت‌وگویی، بخششی، آغازی. آن را <span className="italic">پیش
              از</span> دیدنِ نتیجه بردار، همان‌گونه که ابراهیم پیش از دیدنِ سرزمین رفت. این، ایمان را از باور به
              <span className="text-gold/90"> قدم</span> بدل می‌کند.
            </p>
            <p>
              و یک تمرینِ «הִנֵּנִי»: امروز وقتی کسی یا وظیفه‌ای تو را می‌خوانَد، با تمامِ حضور پاسخ ده — نه
              نیم‌بند. راشی می‌گوید «هیننی» زبانِ فروتنی و آمادگی است. یک‌بار، کامل، حاضر باش: «اینک منم».
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
              ایمان، تن‌یافته در یک زندگی
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              ابراهیم نخستین کسی است که «<span className="text-parchment/80">ایمان آورد</span>» (۱۵:۶) — و آن ایمان
              یک رویداد نبود، بلکه شکلِ یک زندگی شد: ده آزمون، از «بیرون شو» تا عَقِدا، و در همه پایدار ماند (آووت ۵:۳).
              نامش از اَورام به اَورهام دگرگون شد و הِ افزوده ۲۴۳ را ۲۴۸ کرد — تمامِ تن در خدمتِ وعده. او ریشه‌ی
              <span className="text-parchment/80"> مهر</span> است (חֶסֶד לְאַבְרָהָם)، و این ایمان را همچون میراث به
              اسرائیل سپرد: در دریا «<span className="text-parchment/80">ایمان آوردند</span>» (خروج ۱۴:۳۱).
            </p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
                style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(30px,8vw,46px)", color: "#eaf1ff", textShadow: "0 0 16px #6f8fe8" }}>אַבְרָם</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>۲۴۳</span>
              </div>
              <span className="font-cinzel text-2xl text-gold/40">+ ה →</span>
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
                style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(30px,8vw,46px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>אַבְרָהָם</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>۲۴۸ · تمامِ تن</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 15:6")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              ← مطالعه‌ی این راز در خَشمَل
            </button>

            {/* הֶמְשֵׁךְ — ادامه‌ی مسیر */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/en-que-consiste" className="hover:text-gold">← ایمان از چه ساخته شده</Link>
              <Link href="/misterio/emunah" className="hover:text-gold">← ایمان چیست</Link>
              <Link href="/misterio/entrelazamiento" className="hover:text-gold">← عَقِدا: مهر و ترس</Link>
              <button onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Exodus 3:4")}&context=kabbalah`)}
                className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50 hover:text-gold">
                ← ایمانِ موسی
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

// ── Componentes (idénticos en estilo a /misterio/en-que-consiste) ─────────────
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
export default function AbrahamPage() {
  const locale = useLocale();
  const router = useRouter();
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);

  if (locale === "fa") return <AbrahamFarsi />;
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
            Serie de la Fe · Misterio 4 · Personajes de la Fe
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(34px, 10vw, 72px)", color: dark ? "#dbe7ff" : "#28406e",
              textShadow: dark ? "0 0 26px #6f8fe888" : "none" }}>
            אַבְרָהָם
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            Abraham — el padre de la fe
          </h2>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/55">
            Del concepto a la persona
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Ya sabemos <span className="italic">qué</span> es la fe y de <span className="italic">qué está
            hecha</span>. Ahora la fe <span className="italic">toma cuerpo</span>: en una vida. Abraham es el
            primero de quien la Escritura dice «<span className="text-gold/90">creyó</span>» (Génesis 15:6). Lo
            dejó todo por una promesa no vista, pasó diez pruebas, y dejó la fe como herencia a Israel. Esto es
            la fe hecha biografía.
          </p>
        </div>

        {/* ── Nota del Sofer (gancho honesto) ── */}
        <Section>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Antes de empezar — nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              Todos los versos están verificados palabra por palabra contra Sefaria. El{" "}
              <span className="text-gold/90">número</span> de las diez pruebas es firme en la Mishná (Pirkei
              Avot 5:3), pero su <span className="italic">lista exacta</span> varía entre los grandes: Rambam,
              Rashi y Pirkei deRabbi Eliezer no coinciden; lo decimos con honestidad. La etimología{" "}
              אַבְרָהָם ← אַב הֲמוֹן («padre de multitud») es la lectura que la propia Torá ofrece (17:5): un
              juego de sonido, no filología estricta. Las gematrías son cálculo del Sofer:{" "}
              <span className="text-gold/90">אַבְרָם = 243</span>, <span className="text-gold/90">אַבְרָהָם = 248</span>.
            </p>
          </div>
        </Section>

        {/* ── Targum: el verso fundacional ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · El verso fundacional y su traducción
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La primera vez que la Escritura usa el verbo «creer» sobre un ser humano es aquí:{" "}
              <span className="hebrew text-gold/90" dir="rtl">וְהֶאֱמִן בַּה' וַיַּחְשְׁבֶהָ לּוֹ צְדָקָה</span>{" "}
              —«Y creyó en Dios, y Él se lo contó por <span className="text-gold/90">justicia</span>
              (tzedaká)»— (Génesis 15:6). Dios le promete descendencia como las estrellas del cielo; y Abraham,
              anciano y sin hijos, le cree. Es el verso fundacional de toda la fe bíblica.
            </p>
            <p>
              Mira la naturaleza de esa fe: no fue <span className="italic">contemplar una prueba</span>, sino{" "}
              <span className="text-gold/90">apoyarse en lo no visto</span>. Abraham no vio una estrella que
              fuera su hijo; se apoyó en <span className="text-gold/90">Quien</span> hizo la promesa. Y ese mismo
              gesto se repite a lo largo de toda su vida —desde el «vete» (lej lejá) hasta el monte Moriá—. Por
              eso este estudio va del concepto a la persona: la fe que en los misterios anteriores definimos,
              aquí la vemos <span className="italic">vivida</span>.
            </p>
          </div>
        </Section>

        <PullQuote
          he="וְהֶאֱמִן בַּה' וַיַּחְשְׁבֶהָ לּוֹ צְדָקָה"
          es="Y creyó en Dios, y Él se lo contó por justicia."
          source="Génesis 15:6"
        />

        {/* ── Las diez pruebas (visual) ── */}
        <Section>
          <h3 className="mb-3 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            עֲשָׂרָה נִסְיוֹנוֹת · Las diez pruebas
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            «Con diez pruebas fue probado Abraham, nuestro padre, y resistió todas» (Pirkei Avot 5:3). Dos de
            ellas son los dos extremos del arco: la primera, «<span className="text-gold/80">vete</span>», y la
            última, «<span className="text-gold/80">ofrécelo</span>». Y ambas empiezan con la misma orden:{" "}
            <span className="hebrew text-gold/80" dir="rtl">לֶךְ לְךָ</span>.
          </p>
          <div className="mb-6 flex flex-wrap items-stretch justify-center gap-3">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
              style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
              <span className="font-cinzel text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>Prueba 1ª</span>
              <span className="hebrew mt-1 font-bold leading-none" style={{ fontSize: "clamp(26px,7vw,40px)", color: "#eaf1ff", textShadow: "0 0 14px #6f8fe8" }}>לֶךְ לְךָ</span>
              <span className="mt-1 text-xs text-parchment/70">Vete · Génesis 12:1</span>
            </div>
            <div className="flex items-center font-cinzel text-2xl text-gold/40">···</div>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
              style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
              <span className="font-cinzel text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>Prueba 10ª</span>
              <span className="hebrew mt-1 font-bold leading-none" style={{ fontSize: "clamp(26px,7vw,40px)", color: "#fff6e0", textShadow: "0 0 14px #c9a43e" }}>הָעֲקֵדָה</span>
              <span className="mt-1 text-xs text-parchment/70">La Akedá · Génesis 22</span>
            </div>
          </div>
          <p className="mx-auto max-w-md text-center text-[11px] leading-relaxed text-parchment/55">
            La Mishná fija el <span className="italic">número</span> (diez) y que «resistió todas», pero la lista
            exacta difiere entre Rambam (Comentario a Avot), Rashi y Pirkei deRabbi Eliezer. Presentamos el
            número y los dos extremos del arco, no una lista «oficial».
          </p>
        </Section>

        {/* ── Mefarshim ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            מְפָרְשִׁים · Comentaristas
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Rashi (sobre Génesis 15:6):</span>{" "}
              «<span className="hebrew text-gold/90" dir="rtl">הקב"ה חֲשָׁבָהּ לְאַבְרָם לִזְכוּת וְלִצְדָקָה עַל
              הַאֲמָנָה שֶׁהֶאֱמִין בּוֹ</span>» —Dios se lo contó a Abraham por mérito y justicia, por la fe con
              que creyó en Él—. Para Rashi, la fe misma es ya un <span className="italic">acto de justicia</span>:
              creer cuando no hay nada visible que sostenga la creencia.
            </p>
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Ramban (dos filos sobre el mismo verso):</span>{" "}
              Ramban objeta a Rashi con honestidad: «¿qué mérito es ese? Quien ya creyó hasta el punto de{" "}
              <span className="italic">degollar a su hijo único y amado</span> y pasó las demás pruebas, ¿cómo no
              iba a creer una buena nueva?». Y ofrece su lectura: Abraham creyó que sería por la{" "}
              <span className="text-gold/90">justicia de Dios</span> (be-tzidkó shel HaKadosh Baruj Hu) que
              recibiría descendencia —no como pago a su propio mérito—. Dos filos sobre un solo verso.
            </p>
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Rashi (sobre Génesis 22:1 — «הִנֵּנִי»):</span>{" "}
              sobre la respuesta de Abraham <span className="hebrew text-gold/90" dir="rtl">הִנֵּנִי</span>{" "}
              (heme aquí): «<span className="hebrew text-gold/90" dir="rtl">כָּךְ הִיא עֲנִיָּתָם שֶׁל חֲסִידִים,
              לְשׁוֹן עֲנָוָה הוּא וּלְשׁוֹן זִמּוּן</span>» —así responden los piadosos: es lenguaje de humildad
              y de disponibilidad—. «Hineni» significa «todo yo, aquí, para Ti».
            </p>
            <p>
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Arizal y Cabalá:</span>{" "}
              Abraham es la raíz de <span className="text-gold/90">jésed</span> (bondad amorosa), el pilar derecho
              del árbol de las sefirot. La Escritura lo dice sin rodeos: «<span className="hebrew text-gold/90" dir="rtl">חֶסֶד
              לְאַבְרָהָם</span>» —jésed para Abraham— (Miqueas 7:20). Y la prueba final, la Akedá, templa ese
              amor con <span className="text-gold/90">yirá</span> (temor reverente): el amor sin límite tiene que
              ser contenido para no desbordarse. Esa fusión de amor y temor tiene su propio secreto.
            </p>
          </div>
        </Section>

        <PullQuote
          he="כָּךְ הִיא עֲנִיָּתָם שֶׁל חֲסִידִים, לְשׁוֹן עֲנָוָה הוּא וּלְשׁוֹן זִמּוּן"
          es="Así responden los piadosos: es lenguaje de humildad y de disponibilidad —«heme aquí»."
          source="Rashi sobre Génesis 22:1"
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
                txt: "«Y creyó en Dios» (Génesis 15:6). En lo llano: Abraham se apoyó en una promesa no vista. Su fe no fue un evento aislado, sino la forma de toda una vida —desde «vete» hasta «ofrécelo»—.",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "אַבְרָם = 243; אַבְרָהָם = 248. La ה añadida suma 5, y 248 es el número de los miembros del cuerpo humano (Ohalot 1:8) y, en la drasha clásica, el de las mitzvot aseh. El nombre pone el cuerpo entero al servicio. (Gematría calculada por el Sofer.)",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "Dos veces «לֶךְ לְךָ» (Génesis 12:1 y 22:2): la misma orden, los dos extremos del arco. El Baal Shem Tov enseña que todo «salir» es un retorno a la raíz; Abraham sale de sí en cada prueba para acercarse más a Él. «Lej lejá»: ve hacia tu yo verdadero.",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "Abraham = jésed, amor sin límite. Pero el amor sin límite debe ser templado con yirá (temor) para no derramarse; por eso la Akedá. Allí amor y temor se hacen uno (→ el secreto del entrelazamiento). Baal HaSulam: la fe de Abraham es esa entrega «por encima de la razón» que es la base del vínculo.",
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
          he="וְהָאֱלֹהִים נִסָּה אֶת אַבְרָהָם... וַיֹּאמֶר אֵלָיו אַבְרָהָם וַיֹּאמֶר הִנֵּנִי"
          es="Y Dios probó a Abraham... y le dijo «Abraham», y él respondió «heme aquí»."
          source="Génesis 22:1"
        />

        {/* ── Shemot: el peso del nombre ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            שֵׁמוֹת · El peso del nombre: אַבְרָם → אַבְרָהָם
          </h3>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="אַבְרָם" sub="Avram · 243" color="#6f8fe8" big={false} />
            <span className="font-cinzel text-3xl text-gold" style={{ textShadow: "0 0 16px #c9a43e" }}>+ ה →</span>
            <HebrewTile he="אַבְרָהָם" sub="Avraham · 248" color="#c9a43e" big={false} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Dios cambia su nombre: «<span className="hebrew text-gold/90" dir="rtl">וְהָיָה שִׁמְךָ אַבְרָהָם כִּי
              אַב הֲמוֹן גּוֹיִם נְתַתִּיךָ</span>» —«tu nombre será Abraham, porque te he hecho{" "}
              <span className="text-gold/90">padre de multitud de naciones</span>»— (Génesis 17:5). La propia
              Torá da la etimología: אַבְרָהָם se lee como אַב הֲמוֹן (av hamón, «padre de multitud») —un juego de
              sonido que el texto mismo ofrece, no filología estricta—.
            </p>
            <p>
              Se añade una sola letra: la <span className="hebrew text-gold/90" dir="rtl">ה</span>. En gematría
              suma cinco: 243 → <span className="text-gold/90">248</span>. Y 248 es el número de los{" "}
              <span className="text-gold/90">miembros del cuerpo humano</span> (Mishná Ohalot 1:8, verificado) y,
              en la drasha clásica, el de las mitzvot aseh (los mandamientos positivos). El sentido es preciso:
              mientras fue «Avram», tenía un cuerpo limitado; cuando se hizo «Avraham», su{" "}
              <span className="italic">ser entero</span> —los 248 miembros— quedó al servicio de la promesa.
            </p>
            <p>
              ¿Y esa <span className="hebrew text-gold/90" dir="rtl">ה</span>? Es la misma letra que aparece dos
              veces en el Nombre de Dios (י-ה-ו-ה). Un aliento del Nombre divino se sopla dentro del nombre del
              hombre —señal del pacto—. En la Torá el nombre no es etiqueta sino{" "}
              <span className="text-gold/90">revelación</span>: «כִּשְׁמוֹ כֶּן הוּא», como su nombre, así es él.
            </p>
          </div>
        </Section>

        <PullQuote
          he="וְלֹא יִקָּרֵא עוֹד אֶת שִׁמְךָ אַבְרָם וְהָיָה שִׁמְךָ אַבְרָהָם כִּי אַב הֲמוֹן גּוֹיִם נְתַתִּיךָ"
          es="Ya no se llamará tu nombre Avram; tu nombre será Abraham, porque te he hecho padre de multitud de naciones."
          source="Génesis 17:5"
        />

        {/* ── Hitbonenut ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            הִתְבּוֹנְנוּת · Contemplación
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La fe de Abraham no fue un concepto: fue un <span className="text-gold/90">paso</span>. Cada vez
              que Dios dijo «ve», él fue —sin ver el destino—. «A la tierra que te{" "}
              <span className="italic">mostraré</span>» (12:1): no «que te he mostrado». Creer es moverse hacia
              lo que todavía no está a la vista.
            </p>
            <p>
              ¿Dónde espero yo ver primero y dar el paso después? Abraham hizo lo contrario: primero el paso,
              después la visión. Y en el monte Moriá dijo «<span className="text-gold/90">אֱלֹהִים יִרְאֶה</span>»
              (Dios verá, proveerá —22:8), y allí mismo puso por nombre «<span className="text-gold/90">ה' יִרְאֶה</span>»
              (22:14). Justo donde él <span className="italic">vio</span> que no veía y aun así avanzó, Dios{" "}
              <span className="italic">se dejó ver</span>. La fe no exige entender el final; exige dar el paso
              hacia él.
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
              <span className="text-gold/90">Hoy, da un pequeño «לֶךְ לְךָ».</span> Elige un paso correcto que has
              estado posponiendo porque no ves su final —una conversación, un perdón, un comienzo—. Dalo{" "}
              <span className="italic">antes</span> de ver el resultado, igual que Abraham partió antes de ver la
              tierra. Eso convierte la fe de creencia en <span className="text-gold/90">paso</span>.
            </p>
            <p>
              Y un ejercicio de «<span className="italic">hineni</span>»: hoy, cuando alguien o una tarea te
              llame, responde con presencia entera —no a medias—. Rashi dice que «heme aquí» es lenguaje de
              humildad y disponibilidad. Una sola vez, completo, presente: «todo yo, aquí». La fe del padre se
              hereda practicándola, no admirándola.
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
              La fe hecha biografía
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              Abraham es el primero de quien la Escritura dice «<span className="text-parchment/80">creyó</span>»
              (15:6) —y esa fe no fue un evento, sino la forma de una vida—: diez pruebas, de «vete» a la Akedá, y
              resistió todas (Avot 5:3). Su nombre pasó de Avram a Avraham, y la ה añadida llevó 243 a 248 —el
              cuerpo entero al servicio de la promesa—. Es la raíz del <span className="text-parchment/80">amor</span>{" "}
              (jésed le-Avraham, Miqueas 7:20), y dejó esta fe como herencia a Israel: en el Mar «<span className="text-parchment/80">creyeron</span>
              en Dios» (Éxodo 14:31). Creer es dar el paso hacia lo que aún no se ve.
            </p>

            {/* Sello: Avram → Avraham */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#6f8fe899", background: "rgba(12,14,22,0.96)", boxShadow: "0 0 24px #6f8fe833" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(34px,9vw,50px)", color: "#eaf1ff", textShadow: "0 0 16px #6f8fe8" }}>אַבְרָם</span>
                <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color: "#9fb4ee" }}>243</span>
              </div>
              <span className="font-cinzel text-2xl text-gold/40">+ ה →</span>
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(34px,9vw,50px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>אַבְרָהָם</span>
                <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>248 · cuerpo entero</span>
              </div>
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              La fe no consiste en ver primero; consiste en dar el paso hacia lo que aún no se ve.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Creyó en Dios · Génesis 15:6", ref: "Genesis 15:6" },
                { label: "Vete · Génesis 12:1", ref: "Genesis 12:1" },
                { label: "Diez pruebas · Pirkei Avot 5:3", ref: "Pirkei Avot 5:3" },
                { label: "Heme aquí · Génesis 22:1", ref: "Genesis 22:1" },
                { label: "Jésed para Abraham · Miqueas 7:20", ref: "Micah 7:20" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 15:6")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            {/* Hemshej — umbral «Sigue el hilo» */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/en-que-consiste" className="hover:text-gold">En qué consiste la fe →</Link>
              <Link href="/misterio/emunah" className="hover:text-gold">¿Qué es la fe? →</Link>
              <Link href="/misterio/entrelazamiento" className="hover:text-gold">La Akedá: amor y temor →</Link>
              <button onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Exodus 3:4")}&context=kabbalah`)}
                className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50 hover:text-gold">
                La fe de Moshé →
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
