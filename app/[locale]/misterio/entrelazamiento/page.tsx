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

export default function PageEntrelazamiento() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  // Las páginas de misterio van SIEMPRE en oscuro: las letras hebreas doradas y
  // el texto pergamino solo se leen bien sobre fondo #05050a.
  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#b5557a"; // magenta-rosado: el acoplamiento amor/temor del alma

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/gematrias" className="font-cinzel text-sm text-gold/70 hover:text-gold">← {fa ? "گیماتریا" : "Gematría"}</Link>
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

        {/* HERO — la ecuación */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۱۲" : "Rav Ginsburgh · 137, cap. 12"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="אַהֲבָה" sub={fa ? "عشق · ۴۲" : "Amor · 42"} color="#e0a850" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>⊗</span>
            <Tile he="יִרְאָה" sub={fa ? "ترس · ۹۵" : "Temor · 95"} color="#6a8acc" size={40} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            137
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "درهم‌تنیدگیِ جان‌ها" : "El entrelazamiento de las almas"}
          </h2>
        </div>

        {/* ── LA FÍSICA: EL ENTRELAZAMIENTO ── */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "درهم‌تنیدگیِ کوانتومی" : "El entrelazamiento cuántico"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در فیزیکِ کوانتوم پدیده‌ای هست به نامِ «درهم‌تنیدگی» (entanglement): دو ذرّه چنان به هم پیوند می‌خورند که دیگر دو چیز نیستند، بلکه یک نظامِ واحدند. هرچه دور شوند — یکی اینجا، دیگری در آن‌سویِ کیهان — هنوز چون یک‌تن رفتار می‌کنند. آنچه بر یکی می‌رود، در همان دم در دیگری بازتاب می‌یابد."
                : "En la física cuántica hay un fenómeno llamado «entrelazamiento» (entanglement): dos partículas quedan tan unidas que ya no son dos cosas, sino un solo sistema. Por lejos que se separen — una aquí, la otra al otro extremo del cosmos — siguen actuando como un solo cuerpo. Lo que le ocurre a una se refleja al instante en la otra."}
            </p>
            <p>
              {fa
                ? "این تنها استعاره نیست. این دقیق‌ترین تصویری است که علمِ مدرن از پیوندِ دو هستیِ جدا دارد: دوگانگی که، در ژرفا، یگانگی است. کابالا همین را دربارهٔ جان می‌گوید."
                : "No es solo una metáfora. Es la imagen más exacta que la ciencia moderna tiene del vínculo entre dos seres separados: una dualidad que, en lo profundo, es unidad. La Cabalá dice exactamente esto sobre el alma."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="Dos partículas separadas por todo el universo siguen siendo una. La distancia no rompe el vínculo."
          fa="دو ذرّه که سراسرِ کیهان از هم جدایشان کرده، باز یکی‌اند. فاصله، پیوند را نمی‌گسلد."
          source={fa ? "فیزیکِ درهم‌تنیدگی" : "La física del entrelazamiento"} fa_active={fa} />

        {/* ── LA AKEIDÁ ── */}
        <Section>
          <h3 className="mb-4 mt-12 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "بستنِ اسحاق" : "La atadura de Isaac"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در پیدایش ۲۲، خدا ابراهام را می‌آزماید: پسرش اسحاق را بربند و بر کوهِ موریا تقدیم کن. این لحظه را در عبری עֲקֵדָה (عَکِدا)، یعنی «بستن»، می‌نامند — نه «قربانی». نکته در بستن است، نه در کشتن."
                : "En Génesis 22, Dios prueba a Abraham: ata a tu hijo Isaac y ofrécelo en el monte Moriá. A este momento la tradición lo llama עֲקֵדָה (Akeidá), «la atadura» — no «el sacrificio». La clave está en el atar, no en el matar."}
            </p>
            <p>
              {fa
                ? "و دو روح در آن کوه به هم بسته می‌شوند. ابراهام مظهرِ אַהֲבָה (اَهاوا، «عشق») است — صفتِ חֶסֶד (چِسِد، مهرِ بی‌کران، دستِ راستِ خدا). اسحاق مظهرِ יִרְאָה (یِراه، «ترس/هیبت») است — صفتِ גְּבוּרָה (گِوورا، تواناییِ بازدارنده، دستِ چپ). پدرِ عشق، فرزندِ هیبت را می‌بندد."
                : "Y en ese monte dos almas quedan atadas la una a la otra. Abraham encarna אַהֲבָה (ahavá, «amor») — el atributo de חֶסֶד (jésed, la bondad sin límite, la mano derecha de Dios). Isaac encarna יִרְאָה (yirá, «temor/reverencia») — el atributo de גְּבוּרָה (guevurá, el poder que contiene, la mano izquierda). El padre del amor ata al hijo del temor."}
            </p>
            <p>
              {fa
                ? "این درهم‌تنیدگیِ روحانیِ اسرائیل است: ابراهام و اسحاق پس از آن کوه، دو نیستند. عشق و ترس، بسته به هم، یک نظامِ واحد می‌شوند — درست چون دو ذرّهٔ درهم‌تنیده."
                : "Este es el entrelazamiento espiritual de Israel: Abraham e Isaac, después de aquel monte, ya no son dos. El amor y el temor, atados, se vuelven un solo sistema — igual que dos partículas entrelazadas."}
            </p>
          </div>
        </Section>

        {/* ── 42 + 95 = 137 ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "حسابِ پنهان" : "La cuenta oculta"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="אַהֲבָה" sub={fa ? "۴۲ بار" : "42 veces"} color="#e0a850" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="יִרְאָה" sub={fa ? "۹۵ بار" : "95 veces"} color="#6a8acc" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="137" sub={fa ? "קַבָּלָה" : "Kabalah"} color={C} size={44} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "گینزبورگ نکته‌ای ظریف را نشان می‌دهد. این بار راز در ارزشِ عددیِ واژه‌ها نیست — بلکه در شمارِ پیدایشِ آن‌ها در تورات است. به گفتهٔ او، واژهٔ אַהֲבָה (عشق) ۴۲ بار و واژهٔ יִרְאָה (ترس) ۹۵ بار در تورات می‌آید. و ۴۲ + ۹۵ = ۱۳۷."
                : "Ginsburgh señala algo sutil. Esta vez el secreto no está en el valor numérico de las palabras — sino en cuántas veces aparecen en la Torá. Según él, la palabra אַהֲבָה (amor) aparece 42 veces y la palabra יִרְאָה (temor) aparece 95 veces. Y 42 + 95 = 137."}
            </p>
            <p>
              {fa
                ? "و ۱۳۷ همان عددِ קַבָּלָה (قبالا) است (ק=۱۰۰، ב=۲، ל=۳۰، ה=۵). پس عشق و ترس، با هم، خودِ «دریافت» — کابالا — را می‌سازند."
                : "Y 137 es el número mismo de קַבָּלָה (Kabbalah): ק=100, ב=2, ל=30, ה=5. Entonces el amor y el temor, juntos, forman el «recibir» mismo — la Cabalá."}
            </p>
            <div className="rounded-xl border border-gold/15 bg-gold/[0.04] p-4">
              <p className="text-[13px] leading-relaxed text-parchment/75">
                {fa
                  ? "یک هشدارِ امانت‌دارانه: ارزشِ خودِ واژه‌ها این نیست. אַהֲבָה (عشق) = ۱۳، و יִרְאָה (ترس) = ۲۱۶. عددِ ۱۳۷ از شمارِ پیدایشِ واژه‌ها برمی‌آید (۴۲+۹۵)، نه از ارزشِ حروفشان. این دو را نباید درآمیخت."
                  : "Una nota de honestidad: el valor de las palabras en sí NO da esto. אַהֲבָה (amor) = 13, y יִרְאָה (temor) = 216. El 137 surge del número de apariciones (42+95), no del valor de sus letras. No deben confundirse las dos cosas."}
              </p>
            </div>
          </div>
        </Section>

        {/* ── LA ÁLEF ── */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "شکلِ אلف" : "La forma de la álef"}
          </h3>
          <div className="text-center"><Tile he="א" sub={fa ? "آلِف" : "Álef"} color="#c9a43e" size={72} /></div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "نخستین حرفِ الفبا، א (آلِف)، از سه جزء ساخته شده: یک יוד (یود) در بالا، یک יוד در پایین، و یک וו (واو) که اریب آن دو را به هم می‌پیوندد. یودِ بالا، آب‌هایِ علیا — الوهیّت، عشق که از فراز فرومی‌بارد. یودِ پایین، آب‌هایِ سُفلا — انسان، هیبت که از فرود رو به بالا دارد."
                : "La primera letra del alfabeto, א (álef), está hecha de tres partes: una יוד (yud) arriba, una יוד abajo, y una וו (vav) que en diagonal une a las dos. La yud de arriba: las aguas superiores — lo Divino, el amor que desciende desde lo alto. La yud de abajo: las aguas inferiores — el ser humano, el temor que se eleva desde abajo."}
            </p>
            <p>
              {fa
                ? "و واوِ میانی، پلِ آن دو است. آلِف خودْ تصویرِ درهم‌تنیدگی است: بالا و پایین، عشق و ترس، آسمان و زمین، در یک حرفِ واحد بسته شده‌اند. آلِف یعنی «یگانه» — همان درسِ کوهِ موریا."
                : "Y la vav del medio es el puente entre las dos. La álef misma es la imagen del entrelazamiento: lo alto y lo bajo, el amor y el temor, el cielo y la tierra, atados en una sola letra. Álef significa «el Uno» — la misma lección del monte Moriá."}
            </p>
          </div>
        </Section>

        {/* ── SÍNTESIS: la constante de acoplamiento ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              אַהֲבָה וְיִרְאָה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "ثابتِ پیوندِ جان با خدا" : "La constante que acopla el alma con Dios"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "در فیزیک، عددِ ۱۳۷ (ثابتِ ساختارِ ریز، α) «ثابتِ پیوند» است: نیرویی که نور و ماده را به هم می‌بندد. بی آن، فوتون و الکترون هرگز یکدیگر را لمس نمی‌کنند. کابالا (=۱۳۷) همان ثابتِ پیوند است — اما میانِ جهانِ جسمانی و جهانِ روحانی. و در جان، دو بالِ این پیوند، عشق و ترس‌اند: عشق ما را به خدا نزدیک می‌کند، هیبت ما را در حضورش نگاه می‌دارد. با هم، جان را به خدا درهم می‌تنند."
                : "En física, el número 137 (la constante de estructura fina, α) es la «constante de acoplamiento»: la fuerza que ata la luz a la materia. Sin ella, el fotón y el electrón nunca se tocarían. La Cabalá (=137) es esa misma constante de acoplamiento — pero entre el mundo físico y el mundo espiritual. Y en el alma, las dos alas de ese vínculo son el amor y el temor: el amor nos acerca a Dios, el temor nos sostiene en Su presencia. Juntos, entrelazan el alma con Dios."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بستنِ اسحاق" : "La Akeidá · Génesis 22", ref: "Genesis 22:1" },
                { label: fa ? "ابراهام، محبوبِ من" : "Abraham, mi amado", ref: "Isaiah 41:8" },
                { label: fa ? "هیبتِ اسحاق" : "El Temor de Isaac", ref: "Genesis 31:42" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 22:1")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ عمیق در جاشمال ←" : "Estudiar este misterio en Jashmal →"}
            </button>
            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمای آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۱۲" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 12"}
            </div>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/gematrias" className="hover:text-gold">{fa ? "گالریِ گیماتریا ←" : "Galería de Gematría →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "شاید به همین معنا باشد که هیچ روحی به‌راستی تنها نیست. آن‌که زمانی در عشق به دیگری بسته شده — چون ابراهام و اسحاق بر آن کوه — تا ابد با او یکی می‌ماند. فاصله، پیوند را نمی‌گسلد. این درهم‌تنیدگیِ جان‌هاست."
                : "Quizás esto es lo que significa que ningún alma esté verdaderamente sola. Quien una vez quedó atado a otro por el amor — como Abraham e Isaac en aquel monte — permanece uno con él para siempre. La distancia no rompe el vínculo. Eso es el entrelazamiento de las almas."}
            </p>
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
