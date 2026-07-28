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

// Las once condiciones del Salmo 15 (versículos 2 a 5), en el orden del texto.
const ONCE: { he: string; es: string; fa: string }[] = [
  { he: "הוֹלֵךְ תָּמִים", es: "camina íntegro", fa: "درست‌کردار راه می‌رود" },
  { he: "וּפֹעֵל צֶדֶק", es: "obra con justicia", fa: "به عدل عمل می‌کند" },
  { he: "וְדֹבֵר אֱמֶת בִּלְבָבוֹ", es: "dice la verdad en su corazón", fa: "در دلش راست می‌گوید" },
  { he: "לֹא רָגַל עַל לְשֹׁנוֹ", es: "no calumnia con su lengua", fa: "با زبانش سخن‌چینی نمی‌کند" },
  { he: "לֹא עָשָׂה לְרֵעֵהוּ רָעָה", es: "no hace mal a su prójimo", fa: "به همسایه‌اش بدی نمی‌کند" },
  { he: "וְחֶרְפָּה לֹא נָשָׂא עַל קְרֹבוֹ", es: "no carga afrenta contra su allegado", fa: "بر نزدیکش ننگ روا نمی‌دارد" },
  { he: "נִבְזֶה בְּעֵינָיו נִמְאָס", es: "a sus ojos el indigno es despreciable", fa: "در چشمش فرومایه خوار است" },
  { he: "וְאֶת יִרְאֵי ה׳ יְכַבֵּד", es: "honra a los que temen a Hashem", fa: "خداترسان را گرامی می‌دارد" },
  { he: "נִשְׁבַּע לְהָרַע וְלֹא יָמִר", es: "jura aunque le perjudique y no se retracta", fa: "به زیانِ خود سوگند می‌خورَد و پس نمی‌گیرد" },
  { he: "כַּסְפּוֹ לֹא נָתַן בְּנֶשֶׁךְ", es: "no presta su dinero con usura", fa: "پولش را به ربا نمی‌دهد" },
  { he: "וְשֹׁחַד עַל נָקִי לֹא לָקָח", es: "no acepta soborno contra el inocente", fa: "بر بی‌گناه رشوه نمی‌ستانَد" },
];

export default function PageSalmo15() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#d96f8f";      // rosa-vino — la tienda, el umbral, el corazón
  const Q = "#8fb4e8";      // azul — la pregunta
  const S = "#e8c05a";      // dorado — el sello

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterios" className="font-cinzel text-sm text-gold/70 hover:text-gold">← {fa ? "اسرار" : "Misterios"}</Link>
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

        {/* HERO — 37 · 137 · 17 */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۳" : "Rav Ginsburgh · 137, cap. 3"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="37" sub={fa ? "پرسش" : "La pregunta"} color={Q} size={34} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>·</span>
            <Tile he="137" sub={fa ? "یازده شرط" : "Las once"} color={C} size={34} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>·</span>
            <Tile he="17" sub={fa ? "مُهر" : "El sello"} color={S} size={34} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(88px, 26vw, 168px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            11
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "یازده دروازهٔ مزمور ۱۵" : "Las once puertas del Salmo 15"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "مزموری که تمامِ تورات را در یازده شرط فشرده می‌کند — و حروفش دقیقاً شمرده شده‌اند."
              : "El salmo que condensa toda la Torá en once condiciones — y cuyas letras están contadas."}
          </p>
        </div>

        {/* SECCIÓN 1 — La pregunta del rey */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "پرسشِ پادشاه" : "La pregunta del rey"}
          </h3>
          <p className="hebrew mb-4 text-center text-xl leading-relaxed" style={{ color: "#c9a43e", textShadow: dark ? "0 0 10px #c9a43e66" : "none" }}>
            מִזְמוֹר לְדָוִד ה׳ מִי יָגוּר בְּאָהֳלֶךָ מִי יִשְׁכֹּן בְּהַר קָדְשֶׁךָ
          </p>
        </Section>

        <PullQuoteLite
          es="«Salmo de David: Hashem, ¿quién podrá residir en Tu tienda? ¿Quién habitará en Tu monte santo?»"
          fa="«مزمورِ داوود: ای خداوند، چه کسی می‌تواند در خیمهٔ تو مأوا گیرد؟ چه کسی بر کوهِ مقدسِ تو ساکن شود؟»"
          source={fa ? "تهیلیم (مزامیر) ۱۵:۱" : "Tehilim (Salmos) 15:1"}
          fa_active={fa} />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "این کوتاه‌ترین و در عینِ حال جسورانه‌ترین پرسشِ کتابِ مزامیر است. داوودِ پادشاه نمی‌پرسد چگونه به بهشت می‌روند؛ می‌پرسد چه کسی همین حالا می‌تواند در نزدیکیِ خدا زندگی کند — در «خیمه»، در «کوهِ مقدس». و بی‌درنگ پاسخ می‌دهد. اما پاسخ نه اندیشه‌ای انتزاعی است و نه یک راز: فهرستی است از رفتار. یازده شرطِ ساده، سنجش‌پذیر، انسانی."
                : "Es la pregunta más corta y más audaz del libro de los Salmos. El rey David no pregunta cómo se llega al Cielo; pregunta quién puede vivir cerca de Dios ahora mismo — en «Tu tienda», en «Tu monte santo». Y responde de inmediato. Pero la respuesta no es una idea abstracta ni un secreto: es una lista de conducta. Once condiciones simples, medibles, humanas."}
            </p>
            <p>
              {fa
                ? "پیش از آنکه حتی یک شرط را بخوانیم، یک نکتهٔ عددی: در همین آیه دو واژهٔ کلیدی هست — «خیمهٔ تو» (אָהֳלֶךָ = ۵۶) و «کوهِ مقدسِ تو» (הַר קָדְשֶׁךָ = ۶۲۹). جمعشان ۶۸۵ است، که دقیقاً ۵ × ۱۳۷ می‌شود. مقصدِ پرسش، پیش از پاسخ، عددِ کابالا را در خود دارد."
                : "Antes de leer una sola condición, un dato numérico: en ese mismo versículo hay dos palabras clave — «Tu tienda» (אָהֳלֶךָ = 56) y «Tu monte santo» (הַר קָדְשֶׁךָ = 629). Su suma es 685, que es exactamente 5 × 137. El destino de la pregunta ya lleva dentro, antes de la respuesta, el número de la Cabalá."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 2 — Las once */}
        <Section>
          <h3 className="mb-2 mt-14 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "یازده شرط" : "Las once condiciones"}
          </h3>
          <p className="mb-6 text-center font-cinzel text-[11px] uppercase tracking-widest text-muted/60">
            {fa ? "تهیلیم ۱۵:۲–۵" : "Tehilim 15:2–5"}
          </p>
          <ol className="space-y-2.5">
            {ONCE.map((p, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-gold/12 bg-white/[0.02] px-4 py-3">
                <span className="mt-0.5 font-cinzel text-sm font-black" style={{ color: C, minWidth: 22 }}>{i + 1}</span>
                <div className="flex-1">
                  <p className="hebrew text-lg leading-snug" style={{ color: "#fdf4dd" }} dir="rtl">{p.he}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>{fa ? p.fa : p.es}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "حکیمان (تلمود، مَکّوت ۲۳ب–۲۴آ) می‌آموزند که تمامِ ۶۱۳ فرمانِ تورات مرحله‌به‌مرحله فشرده شده‌اند: داوود آن‌ها را به یازده رساند، اشعیا به شش، میخا به سه، اشعیا دوباره به دو، عاموس به یک، و در نهایت حَبَقّوق به یک اصلِ واحد. این یازده، نخستین حلقهٔ آن زنجیره است — نخستین باری که کلِ تورات در کفِ یک دست جا می‌گیرد."
                : "Los sabios (Talmud, Makot 23b–24a) enseñan que los 613 mandamientos de la Torá fueron condensándose por etapas: David los redujo a once, Yeshayahu (Isaías) a seis, Mijá (Miqueas) a tres, Yeshayahu otra vez a dos, Amós a uno, y finalmente Habakuk a un solo principio. Estas once son el primer eslabón de esa cadena — la primera vez que toda la Torá cabe en la palma de una mano."}
            </p>
            <p>
              {fa
                ? "و اکنون بشمار. یازده شرط — از «درست‌کردار راه می‌رود» تا «بر بی‌گناه رشوه نمی‌ستانَد» — روی‌هم دقیقاً ۱۳۷ حرف دارند. نه تقریباً: دقیقاً. ۱۳۷ همان عددِ קַבָּלָה (کابالا) است و همان عددی که در فیزیک برهم‌کنشِ نور و ماده را اندازه می‌گیرد."
                : "Y ahora cuenta. Las once condiciones —desde «camina íntegro» hasta «no acepta soborno contra el inocente»— suman exactamente 137 letras. No aproximadamente: exactamente. 137 es el valor de קַבָּלָה (Cabalá), y es el número que en física mide el acoplamiento entre la luz y la materia."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — El sello y la cuenta total */}
        <Section>
          <h3 className="mb-5 mt-14 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "حسابِ کاملِ مزمور" : "La cuenta completa del salmo"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="37" sub={fa ? "پرسش" : "Pregunta"} color={Q} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="137" sub={fa ? "یازده" : "Las once"} color={C} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="17" sub={fa ? "مُهر" : "Sello"} color={S} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="191" sub={fa ? "کلِ مزمور" : "Salmo entero"} color="#9fb0c8" size={40} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "مزمور ۱۵ سه بخش دارد و هر سه شمرده شده‌اند. پرسشِ آغازین (آیهٔ ۱) ۳۷ حرف دارد. یازده شرط ۱۳۷ حرف. و مُهرِ پایانی — עֹשֵׂה אֵלֶּה לֹא יִמּוֹט לְעוֹלָם، «آن‌که این‌ها را به جا آورَد هرگز نخواهد لغزید» — ۱۷ حرف. کلِ مزمور: ۱۹۱ حرف."
                : "El Salmo 15 tiene tres bloques, y los tres están contados. La pregunta inicial (versículo 1) tiene 37 letras. Las once condiciones, 137. Y el sello final — עֹשֵׂה אֵלֶּה לֹא יִמּוֹט לְעוֹלָם, «el que hace estas cosas jamás vacilará» — tiene 17 letras. El salmo entero: 191 letras."}
            </p>
            <p className="text-xs text-muted/80">
              {fa
                ? "توجه: این‌ها شمارشِ حروفِ متنِ مسورایی است (بدون علائمِ آوایی و نقطه‌گذاری)، نه گیماتریا. هر سه رقم را می‌توانید خودتان بشمارید."
                : "Nota: se trata del conteo de letras del texto masorético (sin vocales ni cantilación), no de gematría. Las tres cifras se pueden contar a mano."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 4 — Tres números, tres vidas */}
        <Section>
          <h3 className="mb-5 mt-14 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "سه عدد، سه زندگی" : "Tres números, tres vidas"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "۱۷، ۳۷، ۱۳۷. این سه عدد فقط ساختارِ یک مزمور نیستند؛ سنِ نیاکان در لحظاتِ تعیین‌کنندهٔ زندگی‌شان‌اند."
                : "17, 37, 137. Esos tres números no son solo la arquitectura de un salmo; son las edades de los patriarcas en los momentos que decidieron sus vidas."}
            </p>
            <ul className="space-y-3">
              <li className="rounded-xl border border-gold/12 bg-white/[0.02] px-4 py-3">
                <span className="font-cinzel text-lg font-black" style={{ color: S }}>17</span>
                <p className="mt-1">
                  {fa
                    ? "یوسف هفده‌ساله بود آنگاه که برادرانش او را فروختند (پیدایش ۳۷:۲) — و یعقوب هفده سالِ پایانیِ عمرش را در مصر، در کنارِ همان یوسف، زیست (پیدایش ۴۷:۲۸). عددِ آغازِ هبوط و عددِ آرامشِ پایانی، یکی است."
                    : "Yosef tenía diecisiete años cuando sus hermanos lo vendieron (Génesis 37:2) — y Yaakov vivió sus diecisiete últimos años en Egipto, junto a ese mismo Yosef (Génesis 47:28). El número donde empieza el descenso y el número de la paz final son el mismo."}
                </p>
              </li>
              <li className="rounded-xl border border-gold/12 bg-white/[0.02] px-4 py-3">
                <span className="font-cinzel text-lg font-black" style={{ color: Q }}>37</span>
                <p className="mt-1">
                  {fa
                    ? "اسحاق هنگامِ مرگِ سارا سی‌وهفت ساله بود: سارا در نود سالگی او را زاد (پیدایش ۱۷:۱۷) و در ۱۲۷ سالگی درگذشت (پیدایش ۲۳:۱)."
                    : "Itzjak tenía treinta y siete años cuando murió Sará: ella lo dio a luz a los noventa (Génesis 17:17) y murió a los 127 (Génesis 23:1)."}
                </p>
              </li>
              <li className="rounded-xl border border-gold/12 bg-white/[0.02] px-4 py-3">
                <span className="font-cinzel text-lg font-black" style={{ color: C }}>137</span>
                <p className="mt-1">
                  {fa
                    ? "و ابراهیم در همان روز ۱۳۷ ساله بود: در صد سالگی صاحبِ اسحاق شد (پیدایش ۲۱:۵)، و اسحاق آنگاه ۳۷ ساله بود. ۱۰۰ + ۳۷ = ۱۳۷."
                    : "Y Abraham tenía ese mismo día 137 años: fue padre de Itzjak a los cien (Génesis 21:5), e Itzjak tenía entonces 37. 100 + 37 = 137."}
                </p>
              </li>
            </ul>
            <p className="text-xs text-muted/80">
              {fa
                ? "امانت‌داری: این سه عدد مستقیماً از آیاتِ صریح به دست می‌آیند. سنتِ حکیمان (راشی بر پیدایش ۲۳:۲، سِدِر عولام) عَقِیدا — بستنِ اسحاق — را نیز در همان سال می‌نهد، یعنی ابراهیمِ ۱۳۷ ساله و اسحاقِ ۳۷ ساله؛ اما این گاه‌شماریِ ربانی است، نه سنی که آیه آشکارا بگوید."
                : "Honestidad: los tres números salen directamente de versículos explícitos. La tradición de los sabios (Rashi a Génesis 23:2, Séder Olam) sitúa también la Akedá —el sacrificio de Itzjak— en ese mismo año, con Abraham de 137 e Itzjak de 37; pero eso es cronología rabínica, no una edad que el versículo declare."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 5 — De dónde salen los números: el Nombre */}
        <Section>
          <h3 className="mb-5 mt-14 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "از کجا می‌آیند: نامِ خدا" : "De dónde salen: el Nombre"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["17", "37", "137", "317", "577"].map((n, i) => (
              <span key={i}>
                <Tile he={n} sub={["", "", "קַבָּלָה", "אַבְרָהָם אָבִינוּ", "יִשְׂרָאֵל + לֵאָה"][i] || "·"} color={i === 2 ? C : "#9fb0c8"} size={30} />
              </span>
            ))}
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "راو گینزبورگ نشان می‌دهد که این اعداد تصادفی نیستند: از یک سریِ ریاضی برمی‌آیند که از چهار حرفِ نامِ ذاتیِ خدا (יהוה) ساخته شده است — ۶، ۱۱، ۲۶، ۵۱، ۸۶، ۱۳۱، ۱۸۶، ۲۵۱، ۳۲۶، ۴۱۱… (که در آن ۲۶ خودِ نام است، ۸۶ نامِ אֱלֹהִים و ۴۱۱ همان תֹהוּ). جمعِ جفت‌های متوالی این سری، رشتهٔ تازه‌ای می‌سازد: ۱۷ · ۳۷ · ۱۳۷ · ۳۱۷ · ۵۷۷."
                : "Rav Ginsburgh muestra que estos números no son azar: brotan de una serie matemática construida sobre las cuatro letras del Nombre esencial de Dios (יהוה) — 6, 11, 26, 51, 86, 131, 186, 251, 326, 411… (donde 26 es el Nombre mismo, 86 es el Nombre אֱלֹהִים y 411 es תֹהוּ, el vacío primordial). Al sumar sus pares consecutivos aparece una serie nueva: 17 · 37 · 137 · 317 · 577."}
            </p>
            <p>
              {fa
                ? "و هر عدد نامی دارد. ۱۳۷ = קַבָּלָה. ۳۱۷ — همان ارقامِ ۱۳۷، جابه‌جا شده — برابرِ אַבְרָהָם אָבִינוּ («ابراهیمِ پدرِ ما») است: ۲۴۸ + ۶۹. و ۵۷۷ برابرِ יִשְׂרָאֵל (۵۴۱) + לֵאָה (۳۶) است."
                : "Y cada número tiene nombre. 137 = קַבָּלָה. 317 —los mismos dígitos de 137, permutados— es el valor de אַבְרָהָם אָבִינוּ («Abraham, nuestro padre»): 248 + 69. Y 577 es יִשְׂרָאֵל (541) + לֵאָה (36)."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 6 — La ciencia: e, gamma y la calidad de la conjetura */}
        <Section>
          <h3 className="mb-5 mt-14 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "و علم کجاست؟" : "¿Y dónde está la ciencia?"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "ریچارد فاینمن، فیزیکدانِ کوانتومی، روشِ علم را بی‌پرده چنین توصیف کرد: نخست حدس می‌زنیم؛ سپس پیامدهای حدس را حساب می‌کنیم؛ سپس با آزمایش می‌سنجیم. اگر با تجربه نخوانَد، حدس غلط است — هرچقدر هم زیبا باشد و هر که آن را زده باشد. یعنی تمامِ بنایِ علم بر کیفیتِ یک حدس استوار است."
                : "Richard Feynman, físico cuántico, describió el método de la ciencia sin adornos: primero adivinamos; después calculamos las consecuencias de la conjetura; después la comparamos con el experimento. Si no concuerda con la experiencia, la conjetura es falsa — por bella que sea y sin importar quién la formuló. Es decir: todo el edificio de la ciencia se apoya en la calidad de una conjetura."}
            </p>
            <p>
              {fa
                ? "و اینجاست که مزمور ۱۵ وارد می‌شود. کیفیتِ حدسِ ما به کیفیتِ تخیلِ ما بستگی دارد، و تخیلِ ما به باورها و امیالِ ما. راو گینزبورگ نتیجه می‌گیرد: برای پالودنِ اندیشه، نخست باید رفتار را پالود. یازده شرطِ داوود دقیقاً همان فهرستِ پالایش است — بهایِ ورود به «خیمه». عنوانِ فصل در کتاب همین را می‌گوید: بیشترین حاصل، کمترین سرمایه‌گذاری، و پاکیِ اخلاقی."
                : "Y aquí entra el Salmo 15. La calidad de nuestra conjetura depende de la calidad de nuestra imaginación, y esta de nuestras creencias y deseos. Rav Ginsburgh concluye: para afinar el pensamiento hay que afinar primero la conducta. Las once condiciones de David son exactamente esa lista de afinación — el precio de entrada a «la tienda». El título del capítulo lo dice así: producto máximo, inversión mínima y pureza moral."}
            </p>
            <p>
              {fa
                ? "و در همان فصل، دو ثابتِ اویلر نیز نامِ عبری می‌یابند: عدد e (۲٫۷۱۸…)، عددی که بیشترین حاصل را می‌سازد، دقیقاً برابرِ گیماتریایِ کاملِ برکتِ کاهنان است (اعداد ۶:۲۴–۲۶) — ۲۷۱۸؛ و بدونِ واژهٔ نخستِ آن، ۲۴۶۶ = ۱۸ × ۱۳۷. آن برکت، سه آیه با ۳ · ۵ · ۷ واژه و ۱۵ · ۲۰ · ۲۵ حرف، خودْ الگویِ «فراوانیِ بیشینه» است."
                : "Y en ese mismo capítulo las dos constantes de Euler reciben nombre hebreo: el número e (2,718…), el número que produce el producto máximo, coincide exactamente con la gematría completa de la Bendición Sacerdotal (Bamidbar/Números 6:24-26) — 2718; y sin su primera palabra, 2466 = 18 × 137. Esa bendición, tres versículos de 3 · 5 · 7 palabras y 15 · 20 · 25 letras, es ella misma el patrón de la «abundancia máxima»."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 7 — Hitbonenut */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.05] to-transparent p-8">
            <p className="hebrew mb-4 text-center text-xl text-gold/70" style={{ textShadow: dark ? "0 0 10px #c9a43e44" : "none" }}>
              הִתְבּוֹנְנוּת
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              <p>
                {fa
                  ? "لحظه‌ای با این بنشین. داوود می‌توانست با یک رازِ آسمانی پاسخ دهد. با یک مکاشفه. با یک نام. اما پاسخِ او یازده جملهٔ کاملاً زمینی است: زبانت، پولت، سوگندت، همسایه‌ات. راهِ ورود به کوهِ مقدس از میانِ همان چیزهایی می‌گذرد که هیچ‌کس نمی‌بیند."
                  : "Siéntate un momento con esto. David pudo haber respondido con un secreto celestial. Con una revelación. Con un Nombre. Pero su respuesta son once frases completamente terrenales: tu lengua, tu dinero, tu juramento, tu vecino. El camino de entrada al monte santo pasa por aquello que nadie ve."}
              </p>
              <p>
                {fa
                  ? "و اکنون بپرس: اگر یازده شرط را یکی‌یکی بر خودت بخوانی، کدام‌یک هنوز باز است؟ لازم نیست همهٔ یازده را امروز داشته باشی. یکی را بردار. همان یکی که خواندنش کمی می‌سوزانَد. آن، دروازهٔ توست."
                  : "Y ahora pregunta: si lees las once condiciones una por una sobre ti mismo, ¿cuál sigue abierta? No hace falta tener las once hoy. Toma una. La que arde un poco al leerla. Esa es tu puerta."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 8 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              מִי יָגוּר בְּאָהֳלֶךָ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "پاسخ، شمرده شده است" : "La respuesta está contada"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "۳۷ حرف برایِ پرسش، ۱۳۷ برایِ یازده شرط، ۱۷ برایِ مُهر: ۱۹۱ حرف در کلِ مزمور. همان سه عددی که از نامِ خدا برمی‌آیند و همان سه عددی که سنِ ابراهیم، اسحاق و یعقوب در سخت‌ترین لحظاتشان بود. و ۱۳۷ — عددِ کابالا و عددِ پیوندِ نور و ماده — دقیقاً در بخشی نشسته است که از رفتار سخن می‌گوید. راهِ رسیدن به نور، اخلاق است."
                : "37 letras para la pregunta, 137 para las once condiciones, 17 para el sello: 191 letras en todo el salmo. Los mismos tres números que brotan del Nombre de Dios y los mismos tres números que marcaron a Abraham, Itzjak y Yaakov en sus horas más duras. Y el 137 —el número de la Cabalá y del enlace entre la luz y la materia— cae justo en el bloque que habla de conducta. El camino hacia la luz es ético."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "تهیلیم ۱۵" : "Tehilim 15", ref: "Psalms 15" },
                { label: fa ? "اعداد ۶:۲۴–۲۶" : "Bamidbar 6:24-26", ref: "Numbers 6:24-26" },
                { label: fa ? "پیدایش ۲۳:۱" : "Bereshit 23:1", ref: "Genesis 23:1" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Psalms 15")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ مزمور ۱۵ در جاشمال ←" : "Estudiar el Salmo 15 en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۳" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 3"}
            </div>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterios" className="hover:text-gold">{fa ? "همهٔ اسرار ←" : "Todos los misterios →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "پرسش آسمانی بود: چه کسی می‌تواند نزدِ تو ساکن شود؟ پاسخ زمینی بود: آن‌که زبانش را نگاه می‌دارد. و میانِ آن پرسش و این پاسخ، دقیقاً ۱۳۷ حرف ایستاده است — همان عددی که نور را به مادّه می‌بندد."
                : "La pregunta era celestial: ¿quién puede habitar contigo? La respuesta fue terrenal: el que cuida su lengua. Y entre esa pregunta y esta respuesta hay exactamente 137 letras — el mismo número que ata la luz a la materia."}
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
