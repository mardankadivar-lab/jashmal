"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Componentes ───────────────────────────────────────────────────────────────
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
      <div className="my-9 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
        <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
        <p className="mb-1 text-sm italic leading-relaxed text-parchment/80" dir={locale === "fa" ? "rtl" : "ltr"}>
          {locale === "fa" ? `«${fa}»` : `«${es}»`}
        </p>
        <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
      </div>
    </Section>
  );
}

function Filo({ titulo, color, children }: { titulo: string; color: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 rounded-2xl border p-5" style={{ borderColor: `${color}55`, background: `${color}08` }}>
      <p className="mb-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{titulo}</p>
      <p className="text-sm leading-relaxed text-parchment/85">{children}</p>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function BilaamPage() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark, setDark] = useState(true);
  // Las páginas de misterio van SIEMPRE en oscuro: las letras hebreas doradas y
  // el texto pergamino solo se leen bien sobre fondo #05050a.
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* Nav */}
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

        {/* HERO */}
        <div className="mb-14 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "زوهر بالاک · سنهدرین ۱۰۵" : "Zohar Balak · Sanhedrín 105"}
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(54px, 14vw, 96px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 26px #c9a43e88" : "none" }}>
            בִּלְעָם
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "بیلعام — دهانِ مار" : "Bilaam — la boca de la serpiente"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "هیولایی که با روحِ سَمائل (مار) آمد تا اسرائیل را نفرین کند — و از دهانش، ژرف‌ترین پیشگوییِ مسیحاییِ کلِّ کتاب مقدس برآمد. از تاریک‌ترین جا، روشن‌ترین کلام."
              : "El hechicero que vino con el espíritu de Samael (la serpiente) a maldecir a Israel — y de su boca salió la profecía mesiánica más profunda de toda la Biblia. Del lugar más oscuro, la palabra más brillante."}
          </p>
        </div>

        {/* ── EL VERSÍCULO FUENTE — la profecía de la estrella ── */}
        <Section>
          <div className="mb-16 rounded-2xl border border-gold/30 bg-gold/[0.04] p-6 text-center">
            <p className="mb-4 font-cinzel text-[10px] uppercase tracking-[0.35em] text-gold/50">
              {fa ? "متنِ پایه — پیشگوییِ ستاره" : "El texto fuente — la profecía de la estrella"}
            </p>
            <p className="hebrew mb-4 leading-relaxed text-gold" dir="rtl"
              style={{ fontSize: "clamp(20px, 5vw, 28px)", textShadow: dark ? "0 0 14px #c9a43e55" : "none" }}>
              דָּרַךְ כּוֹכָב מִיַּעֲקֹב וְקָם שֵׁבֶט מִיִּשְׂרָאֵל
            </p>
            <p className="text-sm italic leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "«ستاره‌ای از یعقوب برمی‌آید، و عصای پادشاهی از اسرائیل برمی‌خیزد.»"
                : "«Una estrella surge de Jacob, y un cetro se levanta de Israel.»"}
            </p>
            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Numbers 24:17")}`)}
              className="mt-3 font-cinzel text-[11px] uppercase tracking-widest text-gold/60 transition-colors hover:text-gold"
            >
              בְּמִדְבַּר 24:17 · {fa ? "مطالعه ↗" : "estudiar ↗"}
            </button>
            <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-muted/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "این آیه پایهٔ پیشگوییِ ماشیح در تمام نسل‌هاست — رمبام آن را نقل می‌کند، و ربی عقیوا آن را بر بَر کوخبا («پسرِ ستاره») خواند. و از دهانِ بیلعام برآمد."
                : "Este versículo es la base de la profecía del Mashíaj en todas las generaciones — el Rambam lo cita, y Rabí Akiva lo aplicó a Bar Kojba («el hijo de la estrella»). Y salió de la boca de Bilaam."}
            </p>
          </div>
        </Section>

        {/* ── PARADOJA: LA FUENTE Y LA PALABRA ── */}
        <Section>
          <h3 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "دو لبه — سرچشمه و کلام" : "Dos filos — la fuente y la palabra"}
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Filo titulo={fa ? "سرچشمهٔ تاریک" : "La fuente oscura"} color="#cc5555">
              {fa
                ? "زوهر بیلعام را استادِ جادو می‌نامد که از «سطرا آحرا» — سوی ناپاکی، زهرِ مار، روحِ سَمائل — می‌کشید. او آمد تا اسرائیل را نفرین کند و نابود سازد. تلمود (سنهدرین) چشمِ بد، روحِ متکبّر و جانِ آزمند را به او نسبت می‌دهد."
                : "El Zohar llama a Bilaam el maestro de la hechicería, que extraía del «sitra ajra» — el lado de la impureza, el veneno de la serpiente, el espíritu de Samael. Vino a maldecir y destruir a Israel. El Talmud (Sanhedrín) le atribuye el ojo malo, el espíritu altivo y el alma codiciosa."}
            </Filo>
            <Filo titulo={fa ? "کلامِ روشن" : "La palabra brillante"} color="#c9a43e">
              {fa
                ? "اما خدا نفرین را به برکت بدل کرد (تثنیه ۲۳:۶). از همان دهان، پیشگوییِ ستاره برآمد — درخشان‌ترین وعدهٔ ماشیح. زبانی که برای نفرین آمده بود، ناچار شد ماشیح را بشارت دهد."
                : "Pero Dios volvió la maldición en bendición (Deut. 23:6). De esa misma boca salió la profecía de la estrella — la promesa más luminosa del Mashíaj. La lengua que vino a maldecir fue forzada a anunciar al Mesías."}
            </Filo>
          </div>
        </Section>

        <PullQuote
          he="וְלֹא־אָבָה יְהוָה אֱלֹהֶיךָ לִשְׁמֹעַ אֶל־בִּלְעָם וַיַּהֲפֹךְ ... אֶת־הַקְּלָלָה לִבְרָכָה"
          es="El Eterno tu Dios no quiso escuchar a Bilaam, y el Eterno tu Dios volvió para ti la maldición en bendición, porque el Eterno tu Dios te ama."
          fa="خداوندْ خدایت نخواست به بیلعام گوش دهد، و خداوندْ خدایت نفرین را برای تو به برکت بدل کرد، زیرا خداوندْ خدایت تو را دوست می‌دارد."
          source="Devarim 23:6 · Zohar Balak"
          locale={locale}
        />

        {/* ── EL CLÍMAX: MA TOVU ── */}
        <Section>
          <h3 className="mb-4 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "اوج — مَه طووو" : "El clímax — Ma Tovu"}
          </h3>
          <div className="mb-6 rounded-2xl border-2 border-gold/40 bg-gold/[0.05] p-6 text-center"
            style={{ boxShadow: dark ? "0 0 28px rgba(201,164,62,0.2)" : "none" }}>
            <p className="hebrew mb-3 leading-relaxed text-gold" dir="rtl"
              style={{ fontSize: "clamp(22px, 5.5vw, 32px)", textShadow: dark ? "0 0 16px #c9a43e66" : "none" }}>
              מַה־טֹּבוּ אֹהָלֶיךָ יַעֲקֹב מִשְׁכְּנֹתֶיךָ יִשְׂרָאֵל
            </p>
            <p className="text-sm italic text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              {fa ? "«چه نیکوست خیمه‌هایت ای یعقوب، مسکن‌هایت ای اسرائیل.»" : "«¡Qué hermosas son tus tiendas, Jacob; tus moradas, Israel!»"}
            </p>
            <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-gold/45">Bemidbar 24:5</p>
          </div>
          <p className="text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "و این اوجِ راز است: این کلماتِ آن جادوگرِ شرور که آمد تا نفرین کند، نخستین واژه‌هایی شدند که یک یهودی هر بامداد هنگامِ ورود به کنیسه بر زبان می‌آورد. تاریک‌ترین دهان، مقدّس‌ترین دعای روزانه را زایید. نفرین، به‌تمامی، به صمیمی‌ترین برکت بدل شد."
              : "Y aquí está la cima del misterio: estas palabras del hechicero malvado que vino a maldecir se volvieron las PRIMERAS que un judío pronuncia cada mañana al entrar a la sinagoga. La boca más oscura parió la oración diaria más santa. La maldición, por completo, se transformó en la bendición más íntima."}
          </p>
        </Section>

        {/* ── LA BURRA — el vidente ciego ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "الاغ که دید، و «بینا» که کور بود" : "La burra que vio, y el «vidente» ciego"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "بیلعام خود را «گشاده‌چشم» می‌خواند (بمیدبار ۲۴:۳). اما الاغِ مادهٔ او فرشتهٔ خدا را دید که او نمی‌دید (بمیدبار ۲۲). حیوان دید؛ نبی کور بود. باز هم دو لبه: پایین‌ترین موجود، حقیقتی را دید که «بیناترین» نمی‌دید."
                : "Bilaam se llamaba a sí mismo «el de ojos abiertos» (Números 24:3). Pero su burra vio al ángel de Dios que él no veía (Números 22). El animal vio; el profeta estaba ciego. De nuevo dos filos: la criatura más baja vio la verdad que el «más vidente» no podía ver."}
            </p>
            <p className="text-muted">
              {fa
                ? "و سنّت (و ترگوم) بیلعام را گِلگولِ لاوانِ ارامی می‌داند — همان فریب‌کاری که یعقوب را آزرد. فریب‌کار بازمی‌گردد، اکنون چون نبیِّ نفرین؛ و باز ناکام، چون نور از او می‌گریزد و به برکت بدل می‌شود."
                : "Y la tradición (y el Targum) identifica a Bilaam como el gilgul de Lavan el arameo — el mismo engañador que atormentó a Jacob. El embaucador regresa, ahora como profeta de maldición; y de nuevo fracasa, porque la luz se le escapa y se vuelve bendición."}
            </p>
          </div>
        </Section>

        {/* ── SÍNTESIS ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              שְׁנֵי פִּיּוֹת
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "از دهانِ مار، ستارهٔ ماشیح" : "De la boca de la serpiente, la estrella del Mashíaj"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "بیلعام، که سَمائل — مار — در روحش بود، ستارهٔ ماشیح را پیشگویی کرد. رهاننده دقیقاً از دهانِ آن نیرویی برمی‌آید که آمده بود نابودش کند. این واقعیت است: یک حقیقت، دو لبه. روشن‌ترین نور، در تاریک‌ترین جا پنهان است — تا کسی او را گرد آورد."
                : "Bilaam, que tenía a Samael —la serpiente— en su espíritu, profetizó la estrella del Mashíaj. El redentor emerge precisamente de la boca de la fuerza que vino a destruirlo. Así es la realidad: una sola verdad, dos filos. La luz más brillante está escondida en el lugar más oscuro — esperando a quien la recoja."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "پیشگوییِ ستاره · بمیدبار ۲۴" : "La estrella · Números 24", ref: "Numbers 24:17" },
                { label: fa ? "مَه طووو · بمیدبار ۲۴:۵" : "Ma Tovu · Números 24:5", ref: "Numbers 24:5" },
                { label: fa ? "الاغ · بمیدبار ۲۲" : "La burra · Números 22", ref: "Numbers 22:28" },
                { label: fa ? "زوهر بالاک" : "Zohar Balak", ref: "Zohar, Balak 1" },
                { label: fa ? "سنهدرین ۱۰۵" : "Sanhedrín 105", ref: "Sanhedrin 105a" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Numbers 24:17")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ عمیق در جاشمال ←" : "Estudiar este misterio en Jashmal →"}
            </button>

            <div className="mt-6 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterios" className="hover:text-gold">{fa ? "اسرارِ بیشتر ←" : "Más misterios →"}</Link>
            </div>
          </div>
        </Section>

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
