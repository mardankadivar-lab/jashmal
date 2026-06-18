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

export default function Page137YLaEdad() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#34c5d6"; // cian luminoso: el umbral entre la luz y la materia, la vida y la muerte

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterios" className="font-cinzel text-sm text-gold/70 hover:text-gold">← {fa ? "رازها" : "Misterios"}</Link>
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

        {/* HERO — el número de la vida */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۷" : "Rav Ginsburgh · 137, cap. 7"}
          </p>
          <span className="mt-2 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            137
          </span>
          <h1 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "۱۳۷ — عددِ میانِ زندگی و مرگ" : "137 — el número entre la vida y la muerte"}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "همان عددی که نور را حکم می‌راند، طولِ عمرِ انسان را اندازه می‌گیرد — و میانِ بودن و نبودن می‌ایستد."
              : "El mismo número que gobierna la luz mide la duración de la vida humana — y se planta en el umbral entre el ser y el no-ser."}
          </p>
          <div className="mt-7 flex flex-wrap items-end justify-center gap-3">
            <Tile he="137" sub={fa ? "اسماعیل" : "Ismael"} color="#c9a43e" size={40} />
            <Tile he="137" sub={fa ? "لاوی" : "Leví"} color="#c9a43e" size={40} />
            <Tile he="137" sub={fa ? "عَمرام" : "Amram"} color="#c9a43e" size={40} />
          </div>
        </div>

        {/* SECCIÓN 1 — 137 es el número de la vida en la Torá */}
        <Section>
          <h2 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "عددِ زندگی در تورات" : "El número de la vida en la Torá"}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "تورات سن‌های اندکی را آشکارا ذکر می‌کند. اما یک عدد، بیش از هر عددِ دیگر، به‌صراحت به عنوانِ طولِ عمر می‌آید: ۱۳۷. اسماعیل، پسرِ ابراهیم، «۱۳۷ سال» زیست (بِرِشیت/پیدایش ۲۵:۱۷). لاوی، پسرِ یعقوب، «۱۳۷ سال» زیست (شِموت/خروج ۶:۱۶). و عَمرام، پدرِ موسی، «۱۳۷ سال» زیست (شِموت/خروج ۶:۲۰). یک عدد، سه بار، آشکارا نوشته — رایج‌ترین طولِ عمرِ صریح در تورات."
                : "La Torá menciona pocas edades de forma explícita. Pero un número, más que ningún otro, aparece declarado abiertamente como duración de una vida: 137. Ismael, hijo de Abraham, vivió «137 años» (Bereshit/Génesis 25:17). Leví, hijo de Jacob, vivió «137 años» (Shemot/Éxodo 6:16). Y Amram, el padre de Moisés, vivió «137 años» (Shemot/Éxodo 6:20). Un mismo número, tres veces, escrito a la vista — la edad explícita más frecuente de toda la Torá."}
            </p>
            <p>
              {fa
                ? "و این همان ۱۳۷ است که در سری‌ای دیگر دیدیم نورِ جهان را حکم می‌راند: قبالا = ۱۳۷، و ثابتِ ساختارِ ریز α ≈ ۱/۱۳۷ که برهم‌کنشِ نور و ماده را تعیین می‌کند. عددی که فیزیک را به کابالا می‌پیوندد، در تورات عددِ عمرِ آدمی است."
                : "Y es el mismo 137 que en otro misterio gobierna la luz del universo: Kabbalah = 137, y la constante de estructura fina α ≈ 1/137 que rige la interacción entre la luz y la materia. El número que une la física con la Cabalá es, en la Torá, el número de la vida del hombre."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 2 — Abraham tenía 137 cuando murió Sará */}
        <Section>
          <h2 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "ابراهیم در مرگِ سارا" : "Abraham, al morir Sará"}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="100" sub={fa ? "تولدِ اسحاق" : "nace Isaac"} color="#c9a43e" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="37" sub={fa ? "סارا מתה" : "muere Sará"} color="#c9a43e" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="137" sub={fa ? "אברהם" : "Abraham"} color={C} size={44} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "سارا «۱۲۷ سال» زیست (بِرِشیت/پیدایش ۲۳:۱) — تنها زنی در تورات که عمرش صریح ذکر شده است. حالا حساب کنیم: ابراهیم هنگامِ تولدِ اسحاق ۱۰۰ ساله بود (پیدایش ۲۱:۵) و سارا ۹۰ ساله (پیدایش ۱۷:۱۷). پس وقتی سارا در ۱۲۷ سالگی درگذشت، اسحاق ۳۷ ساله بود — و ابراهیم دقیقاً ۱۳۷."
                : "Sará vivió «127 años» (Bereshit/Génesis 23:1) — la única mujer de la Torá cuya edad se declara explícitamente. Ahora hagamos la cuenta: Abraham tenía 100 años cuando nació Isaac (Génesis 21:5) y Sará tenía 90 (Génesis 17:17). De modo que cuando Sará murió a los 127, Isaac tenía 37 — y Abraham tenía exactamente 137."}
            </p>
            <p>
              {fa
                ? "زوهر (زوهر بِرِشیت ۱۲۳الف) به جزئیاتِ متن اشاره می‌کند: آیه‌ای که عمرِ سارا را روایت می‌کند با واژهٔ וַיִּהְיוּ («و بودند») آغاز می‌شود، که ارزشِ عددی‌اش ۳۷ است — سنِ اسحاق در آن لحظه. تورات ابراهیم را در اوجِ زندگی‌اش نگاه می‌دارد: درست پس از آخرین آزمون، در ۱۳۷ سالگی، در برابرِ بزرگ‌ترین فقدان."
                : "El Zóhar (Zóhar Bereshit 123a) señala un detalle del texto: el versículo que relata la vida de Sará comienza con la palabra וַיִּהְיוּ («y fueron»), cuyo valor numérico es 37 — la edad de Isaac en ese instante. La Torá congela a Abraham en la cumbre de su vida: justo después de la última prueba, a los 137 años, frente a la mayor de las pérdidas."}
            </p>
            <p>
              {fa
                ? "و اینجا گرهِ راز است. در پیرکِی آووت (اخلاقِ پدران ۵:۲۱) آمده: «در صد سالگی، گویی مرده و گذشته و از این جهان محو شده است.» با این همه ابراهیم در ۱۳۷ به اوج رسید و زنده ماند. ۱۳۷ نه سنِ مرگ، که سنِ آستانه است: جایی که زندگی و مرگ هم‌زمان حاضرند."
                : "Y aquí está el nudo del misterio. En Pirkei Avot (Ética de los Padres 5:21) se enseña: «A los cien años, es como si ya hubiera muerto, hubiera pasado y se hubiera anulado de este mundo». Y sin embargo Abraham llegó a su cumbre a los 137 y siguió vivo. 137 no es la edad de la muerte, sino la edad del umbral: el punto donde la vida y la muerte están presentes a la vez."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — El gato de Schrödinger */}
        <Section>
          <h2 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "گربهٔ شرودینگر و ۱۳۷" : "El gato de Schrödinger y 137"}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="מַה־טּוֹב" sub={fa ? "מה־טוב לאדם" : "«qué es bueno»"} color="#c9a43e" size={34} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="137" sub={fa ? "قوهلِت ۶:۱۲" : "Kohelet 6:12"} color={C} size={44} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در فیزیکِ کوانتومی، عمرِ یک ذرّهٔ باردار به احتمالِ واپاشیِ آن بستگی دارد — و آن احتمال متناسب با همان ثابتِ ساختارِ ریز، ≈ ۱/۱۳۷، است. به بیانِ دیگر، ۱۳۷ تعیین می‌کند یک ذرّه چه‌مدت «زنده» می‌مانَد."
                : "En la física cuántica, la vida de una partícula cargada depende de la probabilidad de que se desintegre — y esa probabilidad es proporcional a la misma constante de estructura fina, ≈ 1/137. Dicho de otro modo: 137 determina cuánto tiempo «vive» una partícula."}
            </p>
            <p>
              {fa
                ? "شرودینگر این را به یک آزمونِ فکریِ مشهور بدل کرد: گربه‌ای در جعبه‌ای دربسته همراهِ ذرّه‌ای که اگر واپاشد، زهری آزاد می‌کند. تا ناظر در را نگشاید، ذرّه در «برهم‌نهی» است — و گربه هم‌زمان زنده و مرده. اینشتین این جهانِ شبح‌وار را «کنشِ ترسناک از دور» نامید. پس همان ۱۳۷ که نور را می‌راند، سرنوشتِ گربهٔ شرودینگر را نیز در دست دارد."
                : "Schrödinger lo convirtió en un experimento mental famoso: un gato encerrado en una caja junto a una partícula que, si se desintegra, libera un veneno. Mientras el observador no abra la caja, la partícula está en «superposición» — y el gato está vivo y muerto a la vez. Einstein llamó a este mundo fantasmal «acción espeluznante a distancia». Así, el mismo 137 que rige la luz tiene también en sus manos el destino del gato de Schrödinger."}
            </p>
            <p>
              {fa
                ? "و تورات همین گره را می‌شناسد. کوهلِت (جامعه/اِکلِسیاستِس ۶:۱۲) می‌پرسد: «מַה־טּוֹב לָאָדָם» — «چه چیز برای انسان نیکوست؟» ارزشِ عددیِ این عبارت دقیقاً ۱۳۷ است. کیست که بداند کدام انتخابش نیک است؟ و دِواریم (تثنیه ۳۰:۱۹) پاسخ می‌دهد: «زندگی و مرگ را پیشِ تو نهادم… پس زندگی را برگزین.» انتخابِ آگاهانه — درست مانندِ گشودنِ جعبه — سرنوشت را تعیین می‌کند."
                : "Y la Torá conoce ese mismo nudo. Kohelet (Eclesiastés 6:12) pregunta: «מַה־טּוֹב לָאָדָם» — «¿qué es bueno para el hombre?». El valor numérico de esa frase es exactamente 137. ¿Quién sabe cuál de sus elecciones es buena? Y Devarim (Deuteronomio 30:19) responde: «La vida y la muerte he puesto delante de ti… elige, pues, la vida». La elección consciente — igual que abrir la caja — es lo que determina el destino."}
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
                  ? "لحظه‌ای با این بنشین. همان عددی که در مرزِ نور و ماده می‌ایستد — ۱۳۷ — در مرزِ زندگی و مرگ نیز می‌ایستد. کوهلِت زندگی را «سایه» می‌خوانَد؛ و «سایه» (צֵל) برابرِ ۱۲۰ است، طولِ عمرِ موسی، نمادِ عمرِ کامل. ما در سایهٔ زندگی راه می‌رویم، میانِ آنچه هست و آنچه می‌تواند نباشد."
                  : "Siéntate un momento con esto. El mismo número que se planta en la frontera de la luz y la materia — 137 — se planta también en la frontera de la vida y la muerte. Kohelet llama a la vida «una sombra»; y «sombra» (צֵל) vale 120, la edad de Moisés, símbolo de la vida plena. Caminamos en la sombra de la vida, entre lo que es y lo que podría no ser."}
              </p>
              <p>
                {fa
                  ? "ابراهیم در ۱۳۷ سالگی، در برابرِ مرگِ همسرش، نمرد — برگزید که زنده بماند. شاید معنایش این باشد: زندگی، تا واپسین دم، یک «برهم‌نهی» است. هر روز جعبه‌ای دربسته است، و انتخابِ ما — به سویِ نیکی، به سویِ زندگی — همان است که آن را می‌گشاید. تو امروز کدام را برمی‌گزینی؟"
                  : "Abraham, a los 137, frente a la muerte de su esposa, no murió — eligió seguir vivo. Quizá ese sea el sentido: la vida, hasta el último instante, es una «superposición». Cada día es una caja cerrada, y nuestra elección — hacia el bien, hacia la vida — es lo que la abre. ¿Cuál eliges tú hoy?"}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              מַה־טּוֹב לָאָדָם
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "عددِ آستانه" : "El número del umbral"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "اسماعیل، لاوی و عَمرام: هر یک ۱۳۷ سال. ابراهیم در مرگِ سارا: ۱۳۷. «چه نیکوست برای انسان» (קوهلِت ۶:۱۲) = ۱۳۷. و در فیزیک، ۱۳۷ عمرِ ذرّه را — و سرنوشتِ گربهٔ شرودینگر را — می‌راند. همان عددی که نور را نگاه می‌دارد، بر آستانهٔ میانِ بودن و نبودن ایستاده است."
                : "Ismael, Leví y Amram: cada uno 137 años. Abraham al morir Sará: 137. «Qué es bueno para el hombre» (Kohelet 6:12) = 137. Y en física, 137 rige la vida de la partícula — y el destino del gato de Schrödinger. El mismo número que sostiene la luz se planta en el umbral entre el ser y el no-ser."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بِرِشیت ۲۳:۱" : "Bereshit 23:1", ref: "Genesis 23:1" },
                { label: fa ? "شِموت ۶:۲۰" : "Shemot 6:20", ref: "Exodus 6:20" },
                { label: fa ? "قوهلِت ۶:۱۲" : "Kohelet 6:12", ref: "Ecclesiastes 6:12" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 23:1")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ ۱۳۷ در جاشمال ←" : "Estudiar el 137 en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۷" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 7"}
            </div>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterios" className="hover:text-gold">{fa ? "همهٔ رازها ←" : "Todos los misterios →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "همان عددی که در دلِ اتم می‌درخشد، در شمارِ سال‌های انسان نوشته شده است. ۱۳۷ پایان نیست؛ آستانه است. و تا زمانی که هنوز برمی‌گزینیم، هنوز زنده‌ایم."
                : "El mismo número que brilla en el corazón del átomo está escrito en la cuenta de los años del hombre. 137 no es el final; es el umbral. Y mientras todavía elegimos, todavía estamos vivos."}
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
