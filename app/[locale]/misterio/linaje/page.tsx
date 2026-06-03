"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";

// ── Las cuatro madres de la sombra ────────────────────────────────────────────
interface Madre {
  he: string;
  name: string;
  nameFa: string;
  transgresion: string;
  transgresionFa: string;
  giro: string;     // el giro redentor
  giroFa: string;
  fuente: string;
  studyRef: string;
  color: string;
}

const MADRES: Madre[] = [
  {
    he: "תָּמָר",
    name: "Tamar — fornicación",
    nameFa: "تامار — زنا",
    transgresion: "Se disfraza de prostituta y concibe de su suegro Yehudá (Génesis 38).",
    transgresionFa: "خود را همچون روسپی درمی‌آورد و از پدرشوهرش یهودا باردار می‌شود (پیدایش ۳۸).",
    giro: "De ella nace Péretz (פֶּרֶץ) — «el que rompe las barreras», raíz de la casa de David. El Talmud la llama עֲבֵרָה לִשְׁמָהּ: transgresión por el Cielo.",
    giroFa: "از او پِرِص زاده می‌شود — «شکنندهٔ سدها»، ریشهٔ خاندان داود. تلمود او را «عَوِرا لیشمَه» می‌خواند: تجاوز برای آسمان.",
    fuente: "Nazir 23b · Génesis 38",
    studyRef: "Genesis 38",
    color: "#c9a43e",
  },
  {
    he: "רוּת",
    name: "Rut — incesto",
    nameFa: "روت — زنای با محارم",
    transgresion: "Moabita, descendiente del incesto de las hijas de Lot con su padre (Génesis 19).",
    transgresionFa: "موآبی، از نسلِ هم‌بستریِ دختران لوط با پدرشان (پیدایش ۱۹).",
    giro: "Rut (606) + las 7 mitzvot de Bnei Nóaj = 613. Su nombre invertido = תּוֹר, «tórtola». De ella: Obed → Yishai → David.",
    giroFa: "روت (۶۰۶) + هفت میتزوای بنی‌نوح = ۶۱۳. نام او وارونه = تּוֹر، «قُمری». از او: عوبد ← یسی ← داود.",
    fuente: "Bava Kama 38b · Rut 4:18",
    studyRef: "Ruth 4:18",
    color: "#e0a850",
  },
  {
    he: "בַּת־שֶׁבַע",
    name: "Betsabé — adulterio",
    nameFa: "بَت‌شِبَع — زنای محصنه",
    transgresion: "David la toma siendo esposa de Uriá el hitita (II Samuel 11).",
    transgresionFa: "داود او را در حالی که همسر اوریای حِتّی بود، می‌گیرد (دوم سموئیل ۱۱).",
    giro: "De esa unión, tras el juicio y la teshuvá, nace Shlomó (שְׁלֹמֹה) — el rey de la paz, constructor del Templo, eslabón hacia el Mashíaj.",
    giroFa: "از آن پیوند، پس از داوری و توبه، شِلومو زاده می‌شود — پادشاهِ صلح، سازندهٔ معبد، حلقه‌ای به‌سوی ماشیح.",
    fuente: "II Samuel 11–12",
    studyRef: "II Samuel 12",
    color: "#cc5555",
  },
  {
    he: "נַעֲמָה",
    name: "Naamá — la segunda tórtola",
    nameFa: "نَعَمَه — قُمریِ دوم",
    transgresion: "Amonita, descendiente del incesto de la hija menor de Lot (Génesis 19).",
    transgresionFa: "عَمّونی، از نسلِ هم‌بستریِ دختر کوچک‌ترِ لوط (پیدایش ۱۹).",
    giro: "Esposa de Shlomó, madre de Rejavam. El Talmud la nombra junto a Rut como «las dos tórtolas» (שְׁתֵּי תוֹרִים) que Dios apuró a salvar de Sodoma.",
    giroFa: "همسر شِلومو، مادر رِحَبعام. تلمود او را در کنار روت «دو قُمری» می‌نامد که خدا شتافت تا از سدوم برهاندشان.",
    fuente: "Bava Kama 38b · I Reyes 14:21",
    studyRef: "I Kings 14:21",
    color: "#b8943e",
  },
];

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
export default function LinajePage() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark, setDark] = useState(true);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("jashmal-theme", next ? "dark" : "light"); } catch { /* noop */ }
  }
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · Jashmal</Link>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label={dark ? "Modo claro" : "Modo oscuro"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10">
              {dark ? "☀" : "☾"}
            </button>
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
            {fa ? "زوهر · میدراش · تلمود" : "Zohar · Midrash · Talmud"}
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(44px, 11vw, 76px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            עֲבֵרָה לִשְׁמָהּ
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "تبارِ ممنوعِ ماشیح" : "El linaje prohibido del Mashíaj"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "ماشیح از پاک‌ترین جا نمی‌آید — از فروافتاده‌ترین جا برمی‌خیزد. تا جرقه‌هایی را گرد آورد که مدّعی نگهبانشان نیست."
              : "El Mashíaj no desciende del lugar más puro — se levanta del más caído. Para recoger las chispas que el acusador no vigila."}
          </p>
        </div>

        {/* ── Las cuatro madres ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "چهار مادرِ سایه" : "Las cuatro madres de la sombra"}
          </h3>
          <p className="mb-8 text-sm leading-relaxed text-muted">
            {fa
              ? "چهار اتحادِ «نامشروع» که تبار داود و ماشیح از آن‌ها می‌گذرد. هر کدام، تاریکی‌ای که به نور بدل شد."
              : "Cuatro uniones «irregulares» por las que pasa el linaje de David y del Mashíaj. Cada una, una oscuridad que se volvió luz."}
          </p>
        </Section>

        <div className="space-y-6">
          {MADRES.map((m, i) => (
            <Section key={m.he} delay={i * 60}>
              <div className="rounded-2xl border border-gold/15 p-5" style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <div className="flex items-start gap-4">
                  <span className="hebrew shrink-0 font-bold leading-none"
                    style={{ fontSize: "clamp(40px, 11vw, 56px)", color: dark ? "#fff6e0" : "#3a2a08",
                      textShadow: dark ? `0 0 16px ${m.color}` : "none" }}>
                    {m.he}
                  </span>
                  <div className="flex-1">
                    <p className="font-cinzel text-sm font-bold tracking-wide" style={{ color: m.color }}>
                      {fa ? m.nameFa : m.name}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted/90" dir={fa ? "rtl" : "ltr"}>
                      {fa ? m.transgresionFa : m.transgresion}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
                      {fa ? m.giroFa : m.giro}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-cinzel text-[10px] uppercase tracking-widest text-gold/45">{m.fuente}</span>
                      <button onClick={() => router.push(`/estudio?ref=${encodeURIComponent(m.studyRef)}`)}
                        className="font-cinzel text-[11px] text-gold/70 transition-colors hover:text-gold">
                        {fa ? "مطالعه ↗" : "estudiar ↗"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          ))}
        </div>

        {/* ── LA JOYA: Rut → Tor → Torá ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "گوهرِ سلسله" : "La joya de la serie"}
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="רוּת" sub={fa ? "روت ۶۰۶" : "Rut · 606"} color="#e0a850" />
            <span className="font-cinzel text-2xl text-gold/40">↔</span>
            <HebrewTile he="תּוֹר" sub={fa ? "قُمری" : "Tórtola"} color="#c9a43e" />
            <span className="font-cinzel text-2xl text-gold/40">+ ה</span>
            <HebrewTile he="תּוֹרָה" sub={fa ? "تورات" : "Torá"} color="#f0d060" />
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "نامِ روت وارونه، تּוֹر را هجی می‌کند — «قُمری». و این دقیقاً همان واژه‌ای است که تلمود او و نَعَمَه را با آن می‌نامد: «دو قُمری»."
                : "El nombre de Rut, invertido, deletrea תּוֹר — «tórtola». Y esa es exactamente la palabra con que el Talmud la nombra junto a Naamá: «las dos tórtolas»."}
            </p>
            <p>
              {fa
                ? "و تּוֹר، تورات است بدون הِ پایانی. آن הِ چیست؟ הِ مَلخوت — پادشاهی، شخیناه. درست همان چیزی که روت با زادنِ خاندان داود پدید می‌آورد."
                : "Y תּוֹר es תּוֹרָה sin la Hei final. ¿Qué es esa Hei? La Hei de Maljut — la realeza, la Shejiná. Justo lo que Rut engendra al dar a luz la casa de David."}
            </p>
            <p className="font-cinzel text-base text-gold/90">
              {fa
                ? "روت (افتاده) ← وارونه ← تּוֹر (قُمری) ← + הِ مَلخوت ← תּוֹרָה."
                : "Rut (caída) → invertida → תּוֹר (paloma) → + la Hei de Maljut → תּוֹרָה."}
            </p>
            <p className="text-muted">
              {fa
                ? "پایین‌ترین فروافتادگی، وارونه‌شده (که توبه است)، قُمری را آشکار می‌کند؛ و با زادنِ پادشاهی، تورات را کامل می‌سازد."
                : "La caída más baja, dada vuelta (que es la teshuvá), revela la paloma; y al engendrar el Reino, completa la Torá."}
            </p>
          </div>
        </Section>

        {/* ── Kol haTor ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "آوازِ قُمری" : "La voz de la tórtola"}
          </h3>
        </Section>

        <PullQuote
          he="הַנִּצָּנִים נִרְאוּ בָאָרֶץ עֵת הַזָּמִיר הִגִּיעַ וְקוֹל הַתּוֹר נִשְׁמַע בְּאַרְצֵנוּ"
          es="Las flores aparecen en la tierra, el tiempo del canto ha llegado, y la voz de la tórtola se oye en nuestra tierra."
          fa="شکوفه‌ها در زمین پدیدار شدند، هنگامِ سرود فرارسید، و آوازِ قُمری در سرزمینِ ما شنیده می‌شود."
          source="Shir HaShirim 2:12 · Zohar Vayerá 1:1 · Zohar Bereshit 58:31"
          locale={locale}
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "زوهر پاراشای وَیِرا را دقیقاً با همین آیه می‌گشاید: آوازِ قُمری، بیداریِ رهایی است — همچون قُمریِ نوح که شاخهٔ زیتون آورد و جهانی نو را خبر داد."
                : "El Zohar abre la parashá de Vayerá justo con este versículo: la voz de la tórtola es el despertar de la redención — como la paloma de Noaj que trajo la rama de olivo y anunció un mundo nuevo."}
            </p>
            <p>
              {fa
                ? "و «آواز» (קוֹל)، همان «آوازِ یعقوب» است (پیدایش ۲۷:۲۲) — که حکیمان آن را آوازِ تورات و تفیلا می‌خوانند. پس آوازِ قُمری، آوازِ یعقوب است که تورات می‌سراید."
                : "Y esa «voz» (קוֹל) es la misma «voz de Yaakov» (Génesis 27:22) — que los Sabios leen como la voz de la Torá y la tefilá. La voz de la tórtola es la voz de Yaakov cantando la Torá."}
            </p>
            <p className="text-muted">
              {fa
                ? "نکته: «کول هَتور» همچنین نامِ متنی از مکتبِ گائونِ ویلنا (ربی هیلل ریولین) دربارهٔ گام‌های ماشیح است — نه از زوهر، اما هم‌صدا با آن."
                : "Nota: «Kol HaTor» es también el nombre de un texto de la escuela del Gaón de Vilna (R. Hillel Rivlin) sobre las pisadas del Mashíaj — no es del Zohar, pero canta lo mismo."}
            </p>
          </div>
        </Section>

        {/* ── Síntesis ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              הַפּוֹרֵץ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "سایه، وارونه، نور است" : "La sombra, dada vuelta, es la luz"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "از تامار پِرِص زاده شد — «شکننده» (هَپورِص، میخا ۲:۱۳)، لقبِ خودِ ماشیح. رهاننده از شکافِ دیوار می‌آید، از همان جا که همه چیز فرو ریخت. دو لبه در یک حقیقت: آنچه باید ترمیم شود و آنکه ترمیم می‌کند، یک ریشه دارند."
                : "De Tamar nació Péretz — «el que irrumpe» (HaPoretz, Mijá 2:13), título del propio Mashíaj. El redentor entra por la brecha del muro, por donde todo se rompió. Dos filos en una sola verdad: lo que debe rectificarse y quien rectifica comparten la misma raíz."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "تامار · پیدایش ۳۸" : "Tamar · Génesis 38", ref: "Genesis 38" },
                { label: fa ? "روت" : "Rut", ref: "Ruth 4:18" },
                { label: fa ? "دو قُمری · باوا قما" : "Dos tórtolas · Bava Kama 38b", ref: "Bava Kamma 38b" },
                { label: fa ? "آوازِ قُمری · زوهر" : "Voz de la tórtola · Zohar", ref: "Zohar, Vayera 1" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Ruth 4:18")}&context=kabbalah`)}
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
