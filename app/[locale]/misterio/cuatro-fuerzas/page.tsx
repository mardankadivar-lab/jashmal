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

export default function PageCuatroFuerzas() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#48b8f0"; // azul eléctrico — la física, la luz que acopla materia

  // El corazón del estudio: las cuatro letras ↔ los cuatro Mundos ↔ las cuatro fuerzas.
  const filas: { letra: string; mundo: string; mundoFa: string; mundoEn: string; fuerza: string; fuerzaFa: string; fuerzaEn: string; color: string }[] = [
    { letra: "י", mundo: "Atzilut · Emanación", mundoFa: "آتسیلوت · گسیل", mundoEn: "Atzilut · Emanation", fuerza: "Fuerza nuclear fuerte", fuerzaFa: "نیرویِ هسته‌ایِ قوی", fuerzaEn: "Strong nuclear force", color: "#f0d060" },
    { letra: "ה", mundo: "Beriá · Creación", mundoFa: "بریئا · آفرینش", mundoEn: "Beriah · Creation", fuerza: "Fuerza nuclear débil", fuerzaFa: "نیرویِ هسته‌ایِ ضعیف", fuerzaEn: "Weak nuclear force", color: "#9a6a8e" },
    { letra: "ו", mundo: "Yetzirá · Formación", mundoFa: "یتسیرا · صورتگری", mundoEn: "Yetzirah · Formation", fuerza: "Electromagnetismo", fuerzaFa: "الکترومغناطیس", fuerzaEn: "Electromagnetism", color: "#48b8f0" },
    { letra: "ה", mundo: "Asiyá · Acción", mundoFa: "عسیا · کنش", mundoEn: "Asiyah · Action", fuerza: "Gravitación", fuerzaFa: "گرانش", fuerzaEn: "Gravitation", color: "#5b8fd6" },
  ];

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

        {/* HERO — cuatro a uno */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۴" : "Rav Ginsburgh · 137, cap. 4"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-2.5">
            <Tile he="י" sub={fa ? "قوی" : "Fuerte"} color="#f0d060" size={34} />
            <Tile he="ה" sub={fa ? "ضعیف" : "Débil"} color="#9a6a8e" size={34} />
            <Tile he="ו" sub={fa ? "ا.م." : "E.M."} color="#48b8f0" size={34} />
            <Tile he="ה" sub={fa ? "گرانش" : "Gravedad"} color="#5b8fd6" size={34} />
          </div>
          <span className="mt-7 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(80px, 24vw, 150px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            4 → 1
          </span>
          <h2 className="mt-3 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "چهار نیرو و نامِ خدا" : "Las cuatro fuerzas y el Nombre de Dios"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "فیزیک چهار نیرو یافت. تورات همیشه می‌دانست که آن‌ها یکی‌اند."
              : "La física encontró cuatro. La Torá siempre supo que eran Una."}
          </p>
        </div>

        {/* SECCIÓN 1 — Las cuatro fuerzas de la naturaleza */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "چهار نیرویِ طبیعت" : "Las cuatro fuerzas de la naturaleza"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "تمامِ آنچه در جهان روی می‌دهد — افتادنِ سنگ، درخششِ ستاره، تپشِ قلبِ تو — از چهار نیرویِ بنیادین برمی‌خیزد و بس. گرانش (نیرویی که اجسام را به سویِ هم می‌کشد). الکترومغناطیس (نیرویِ نور، برق و مغناطیس). نیرویِ هسته‌ایِ قوی (که هستهٔ اتم را به هم می‌بندد). و نیرویِ هسته‌ایِ ضعیف (که فروپاشیِ پرتوزا را پدید می‌آورد). فیزیک تا سدهٔ بیستم طول کشید تا مطمئن شود که جز این چهار، نیرویِ دیگری نیست."
                : "Todo lo que ocurre en el universo — la piedra que cae, la estrella que brilla, el latido de tu corazón — surge de solo cuatro fuerzas fundamentales. La gravedad (la fuerza que atrae los cuerpos entre sí). El electromagnetismo (la fuerza de la luz, la electricidad y el magnetismo). La fuerza nuclear fuerte (la que mantiene unido el núcleo del átomo). Y la fuerza nuclear débil (la que produce la desintegración radiactiva). La física tardó hasta el siglo XX en confirmar que no hay ninguna otra: solo estas cuatro."}
            </p>
            <p>
              {fa
                ? "و بزرگ‌ترین آرزویِ فیزیک این است که نشان دهد این چهار، در حقیقت یکی‌اند — یک «نظریهٔ همه‌چیز» که هر چهار را در یک نیرویِ یگانه بازمی‌پیوندد. تا کنون سه نیرو را توانسته‌اند بپیوندند؛ گرانش هنوز سرکش مانده است."
                : "Y el mayor anhelo de la física es demostrar que esas cuatro son, en realidad, una sola — una «teoría del todo» que reúna las cuatro en una única fuerza original. Hasta ahora han logrado unir tres; la gravedad sigue resistiéndose."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 2 — Cuatro fuerzas, cuatro letras, cuatro Mundos */}
        <Section>
          <h3 className="mb-2 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "چهار حرف، چهار جهان، چهار نیرو" : "Cuatro letras, cuatro Mundos, cuatro fuerzas"}
          </h3>
          <p className="mx-auto mb-6 max-w-md text-center text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "همان‌گونه که چهار نیرو هست، نامِ ذاتیِ خدا — هَوایا، יהוה — نیز چهار حرف دارد، و کابالا چهار جهانِ روحانی را می‌شمارد. گینزبورگ آن‌ها را چنین برابر می‌نهد:"
              : "Así como hay cuatro fuerzas, el Nombre esencial de Dios — Havayá, יהוה — tiene cuatro letras, y la Cabalá cuenta cuatro Mundos espirituales. Ginsburgh los hace corresponder así:"}
          </p>

          <div className="space-y-2.5">
            {filas.map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border px-4 py-3"
                style={{ borderColor: `${f.color}55`, background: "rgba(14,12,22,0.6)" }}>
                <span className="hebrew flex-shrink-0 font-bold leading-none"
                  style={{ fontSize: "40px", color: "#fff6e0", textShadow: `0 0 16px ${f.color}` }}>{f.letra}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-cinzel text-sm font-bold" style={{ color: f.color }}>
                    {fa ? f.fuerzaFa : f.fuerza}
                  </p>
                  <p className="text-xs text-muted/80">{fa ? f.mundoFa : f.mundo}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "این برابری دلبخواه نیست؛ هر جفت دلیلی دارد. دو نیرویِ هسته‌ای — قوی و ضعیف — پنهان‌اند: درونِ اتم جای دارند و هرگز دیده نمی‌شوند. آن‌ها با دو حرفِ نخستینِ نام، יה (یود-هه)، برابرند — همان حرف‌هایی که کابالا «نهان» می‌خواندشان. الکترومغناطیس با واو (ו) برابر است: حرفِ پیوند، «و»ی عبری، که نهان را به آشکار می‌بندد — درست چنان‌که الکترومغناطیس برق و مغناطیس را به هم می‌پیوندد. و هیِ پایانی، که در کابالا «مَلخوت» (پادشاهی) و زمینِ ماست، با گرانش برابر است: کششی که ما را به زمین می‌چسباند."
                : "La correspondencia no es arbitraria; cada par tiene su razón. Las dos fuerzas nucleares — la fuerte y la débil — son ocultas: viven dentro del átomo y nunca se ven. Corresponden a las dos primeras letras del Nombre, יה (yud-hei) — precisamente las que la Cabalá llama «ocultas». El electromagnetismo corresponde a la vav (ו): la letra del enlace, el «y» del hebreo, que ata lo oculto con lo revelado — igual que el electromagnetismo une la electricidad con el magnetismo. Y la hei final, que en la Cabalá es «Maljut» (el reino) y nuestra tierra, corresponde a la gravedad: la atracción que nos pega al suelo."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="«Todo lo que es llamado por Mi Nombre, para Mi honor lo creé (Beriá), lo formé (Yetzirá), y aun lo hice (Asiyá).»"
          fa="«هر آنچه به نامِ من خوانده می‌شود، برایِ جلالِ خود آفریدمش (بریئا)، صورتش دادم (یتسیرا)، و حتی ساختمش (عسیا).»"
          source={fa ? "یشعیا ۴۳:۷" : "Yeshayahu (Isaías) 43:7"}
          fa_active={fa} />

        {/* SECCIÓN 3 — Antes del Big Bang, todo era Uno */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "پیش از مِهبانگ، همه یکی بود" : "Antes del Big Bang, todo era Uno"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="יהוה" sub="26" color="#f0d060" size={30} />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <Tile he="יהו" sub="21" color="#9a6a8e" size={34} />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <Tile he="הו" sub="11" color="#48b8f0" size={34} />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <Tile he="ו" sub="6" color="#5b8fd6" size={34} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "نظریه‌هایِ امروزیِ فیزیک می‌گویند که در نخستین کسرِ ثانیه پس از مِهبانگ، گرما چنان بی‌اندازه بود که هر چهار نیرو در یک نیرویِ کاملاً متقارن یکی بودند. سپس، با سردشدنِ جهان، نیروها یک‌به‌یک از هم جدا شدند: نخست گرانش، آنگاه نیرویِ قوی، و سرانجام نیرویِ ضعیف از الکترومغناطیس. کابالا همین ترتیب را در نام می‌خواند. نقطهٔ آغازینِ یود (نوکِ حرف) «آدم قدمون» است — نیرویِ یگانه، پیش از هر جدایی. سپس نام، حرف‌به‌حرف، می‌شکند."
                : "Las teorías actuales de la física dicen que en la primera fracción de segundo tras el Big Bang el calor era tan inmenso que las cuatro fuerzas estaban unidas en una sola fuerza perfectamente simétrica. Luego, al enfriarse el universo, las fuerzas se separaron una a una: primero la gravedad, después la fuerte, y por último la débil del electromagnetismo. La Cabalá lee ese mismo orden en el Nombre. La punta inicial de la yud (el vértice de la letra) es «Adam Kadmón» — la fuerza unificada, antes de toda separación. Y luego el Nombre se va rompiendo, letra por letra."}
            </p>
            <p>
              {fa
                ? "این شکستن را می‌توان شمرد. نامِ کاملِ هَوایا (יהוה) برابرِ ۲۶ است. هیِ پایانی (گرانش) را بردار: می‌ماند יהו = ۲۱. یود (نیرویِ قوی) را بردار: می‌ماند הו = ۱۱. در پایان تنها واو می‌ماند: ۶. زنجیرهٔ ۲۶ → ۲۱ → ۱۱ → ۶. جمعِ این چهار عدد ۶۴ است — برابرِ אדם חוה (آدم و حوّا، ۴۵+۱۹)؛ و میانگینِ آن‌ها ۱۶ است — برابرِ سه حرفِ پایانیِ نام، הוה."
                : "Esa ruptura se puede contar. El Nombre completo Havayá (יהוה) vale 26. Quita la hei final (la gravedad): queda יהו = 21. Quita la yud (la fuerza fuerte): queda הו = 11. Al final solo queda la vav: 6. La cadena 26 → 21 → 11 → 6. La suma de los cuatro números es 64 — igual a אדם חוה (Adam y Eva, 45+19); y su promedio es 16 — igual a las tres últimas letras del Nombre, הוה."}
            </p>
            <p>
              {fa
                ? "و حتی گرانش — تنها نیرویی که فیزیک هنوز نتوانسته با عددِ ۱۳۷ پیوندش دهد — رازِ خود را در عبری دارد: «کشش» (משיכה) برابرِ ۳۷۵ است، و ۳۷۵ + ۱۳۷ (= קבלה، کابالا) = ۵۱۲ = ۲ به توانِ ۹. آنچه فیزیک هنوز نیافته، نام از پیش در خود نهفته دارد."
                : "Y hasta la gravedad — la única fuerza que la física aún no ha logrado vincular con el número 137 — guarda su secreto en hebreo: «atracción» (משיכה) vale 375, y 375 + 137 (= קבלה, Kabbalah) = 512 = 2⁹. Lo que la física todavía no encuentra, el Nombre ya lo lleva escondido dentro."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 4 — Hitbonenut */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.05] to-transparent p-8">
            <p className="hebrew mb-4 text-center text-xl text-gold/70" style={{ textShadow: dark ? "0 0 10px #c9a43e44" : "none" }}>
              הִתְבּוֹנְנוּת
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              <p>
                {fa
                  ? "لحظه‌ای با این بنشین. فیزیک، با هزاران آزمایش و بزرگ‌ترین ذهن‌هایِ تاریخ، به همان شماری از نیروها رسید که نامِ خدا حرف دارد: چهار. و همان داستانی را که کابالا دربارهٔ آفرینش می‌گوید — یگانگی‌ای که می‌شکند تا کثرت پدید آید — فیزیک نیز در مِهبانگ بازمی‌گوید."
                  : "Siéntate un momento con esto. La física, con miles de experimentos y las mentes más grandes de la historia, llegó al mismo número de fuerzas que letras tiene el Nombre de Dios: cuatro. Y la misma historia que la Cabalá cuenta sobre la creación — una unidad que se rompe para que surja la multiplicidad — la física la vuelve a contar en el Big Bang."}
              </p>
              <p>
                {fa
                  ? "تو هر روز در میانِ این چهار نیرو راه می‌روی، و در میانِ این چهار جهان نیز. آیا از مَلخوت سخن می‌گویی — از زمین، از کنش، از آنچه دست‌ها می‌سازند؟ یا از واو — از پیوند، از آنچه دو چیز را به هم می‌بندد؟ یود و هه نهان‌اند، چنان‌که نیرویِ هسته‌ای؛ اما همان نهان است که همه‌چیز را در کنارِ هم نگاه می‌دارد. کدام نیرو امروز در توست؟"
                  : "Tú caminas cada día entre esas cuatro fuerzas, y también entre esos cuatro Mundos. ¿Hablas desde Maljut — desde la tierra, la acción, lo que hacen las manos? ¿O desde la vav — desde el enlace, lo que une dos cosas? La yud y la hei son ocultas, como la fuerza nuclear; pero es justamente lo oculto lo que mantiene todo unido. ¿Cuál de las fuerzas está hoy en ti?"}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              יהוה · ד׳ כֹּחוֹת
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "چهار نیرو، یک نام" : "Cuatro fuerzas, un solo Nombre"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "چهار نیرویِ طبیعت، چهار حرفِ نامِ یهوه و چهار جهانِ کابالا یک ساختار را بازمی‌گویند. نیرویِ قوی → یود → آتسیلوت. نیرویِ ضعیف → هه → بریئا. الکترومغناطیس → واو → یتسیرا. گرانش → هیِ پایانی → عسیا. و نوکِ یود، آدم قدمون، نیرویِ یگانه‌ای است که همه از آن برآمده‌اند. آنچه فیزیک «نظریهٔ همه‌چیز» می‌خوانَد، نام از ازل بوده است."
                : "Las cuatro fuerzas de la naturaleza, las cuatro letras del Nombre יהוה y los cuatro Mundos de la Cabalá cuentan una sola estructura. Fuerza fuerte → yud → Atzilut. Fuerza débil → hei → Beriá. Electromagnetismo → vav → Yetzirá. Gravedad → hei final → Asiyá. Y la punta de la yud, Adam Kadmón, es la fuerza única de la que todas brotaron. Lo que la física llama «teoría del todo», el Nombre lo fue desde siempre."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "یشعیا ۴۳:۷" : "Isaías 43:7", ref: "Isaiah 43:7" },
                { label: fa ? "دواریم ۶:۴" : "Devarim 6:4", ref: "Deuteronomy 6:4" },
                { label: fa ? "بِرِشیت ۱:۱" : "Bereshit 1:1", ref: "Genesis 1:1" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Deuteronomy 6:4")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ یگانگیِ نام در جاشمال ←" : "Estudiar la unidad del Nombre en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۴" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 4"}
            </div>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterios" className="hover:text-gold">{fa ? "همهٔ اسرار ←" : "Todos los Misterios →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "جهان از یک نیرو آغاز شد و به چهار شکست، تا ما در میانِ آن‌ها زندگی کنیم. کارِ ما وارونهٔ مِهبانگ است: چهار را بازگرداندن به یک. هر بار که نهان و آشکار، آسمان و زمین را به هم می‌پیوندی، اندکی از آن یگانگیِ نخستین را بازمی‌آوری."
                : "El universo empezó en una sola fuerza y se rompió en cuatro, para que nosotros viviéramos entre ellas. Nuestra tarea es el Big Bang al revés: devolver las cuatro a la Una. Cada vez que unes lo oculto y lo revelado, el cielo y la tierra, restauras un poco de aquella unidad primera."}
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
