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

export default function PageChashmalVav() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#7855bb"; // violeta eléctrico que evoca el relámpago de Yejezkel

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* NAV */}
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
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۹" : "Rav Ginsburgh · 137, cap. 9"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="חַשׁ" sub={fa ? "سکوت · ۳۰۸" : "Silencio · 308"} color="#9966aa" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>+</span>
            <Tile he="מַל" sub={fa ? "سخن · ۷۰" : "Habla · 70"} color="#5577cc" size={40} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>=</span>
            <Tile he="חַשְׁמַל" sub="378" color={C} size={36} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            378
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "چَشمَل — سکوتی که سخن می‌گوید" : "El Chashmal — el silencio que habla"}
          </h2>
        </div>

        {/* SECCIÓN 1 — La visión de Yejezkel */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "رؤیایِ ارابهٔ الهی" : "La visión del carro divino"}
          </h3>
          <p className="hebrew mb-4 text-center text-xl leading-relaxed" style={{ color: "#c9a43e", textShadow: dark ? "0 0 10px #c9a43e66" : "none" }}>
            וּמִתּוֹכָהּ כְּעֵין הַחַשְׁמַל מִתּוֹךְ הָאֵֽשׁ
          </p>
        </Section>

        <PullQuoteLite
          es="«...y en su interior, en el centro del fuego, algo semejante al chashmal.»"
          fa="«...و در درونِ آن، در میانِ آتش، چیزی همانندِ چَشمَل.»"
          source={fa ? "یحزقئل ۱:۴" : "Yejezkel 1:4"}
          fa_active={fa} />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "چَشمَل رازآمیزترین واژهٔ کتابِ مقدسِ عبری است. تنها سه بار در کتابِ یحزقئل (حزقیال) می‌آید، همیشه به عنوانِ توصیفِ پدیدهٔ مرکزیِ رؤیایِ ارابهٔ الهی (مِرکاوا). نه کهرُبا، نه الکتروم، نه نور: هیچ ترجمه‌ای آنچه یحزقئل دید را در بر نمی‌گیرد. تلمود (حگیگا ۱۳ب) آشکار می‌کند که חַשְׁמַל مخففِ חַיּוֹת אֵשׁ מְמַלְּלוֹת است — موجوداتِ آتشینی که سخن می‌گویند. و می‌آموزد که این موجودات در تناوب کار می‌کنند: هنگامی که خدا سخن می‌گوید، خاموشند؛ هنگامی که خدا خاموش است، آن‌ها سخن می‌گویند."
                : "El chashmal es la palabra más misteriosa de la Biblia. Aparece solo tres veces en el libro de Yejezkel (Ezequiel), siempre como descripción del fenómeno central de la visión del carro divino (Merkavá). Ni el ámbar, ni el electro, ni la luz: ninguna traducción captura lo que Yejezkel vio. El Talmud (Chagigah 13b) revela que חַשְׁמַל es un acrónimo de חַיּוֹת אֵשׁ מְמַלְּלוֹת — criaturas de fuego que hablan. Y enseña que esos seres funcionan en alternancia: callan cuando Dios habla, hablan cuando Dios guarda silencio."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 2 — La ecuación interna */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "عددی که نامش را در بر دارد" : "El número que lleva su nombre"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="חַשׁ" sub={fa ? "سکوت · ۳۰۸" : "Silencio · 308"} color="#9966aa" size={48} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="מַל" sub={fa ? "سخن · ۷۰" : "Habla · 70"} color="#5577cc" size={48} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="378" sub="חַשְׁמַל" color={C} size={48} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "این همان کشفی است که چَشمَل را منحصر به فرد می‌کند: واژه‌ای که مرکزیِ رازآمیزترین رؤیایِ پیامبرانه را توصیف می‌کند — رؤیایِ ارابهٔ الهی — در ارزشِ عددیِ خود، دقیقاً برابرِ جمعِ دو نیرویی است که آن را می‌سازند. חש (سکوت) = ۳۰۸. מל (سخن) = ۷۰. ۳۰۸ + ۷۰ = ۳۷۸ = חשמל. واژه خود را توضیح می‌دهد. نام معادله را در بر دارد. راز، راهِ حل را در درون دارد."
                : "Este es el descubrimiento que hace el Chashmal único: la palabra que describe el misterio central de la visión más importante de la profecía bíblica —la visión del Carro Divino— es, en su valor numérico, exactamente la suma de las dos fuerzas que la constituyen. חש (silencio) = 308. מל (habla) = 70. 308 + 70 = 378 = חשמל. La palabra se explica a sí misma. El nombre contiene la ecuación. El misterio lleva la solución dentro."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — La vav en tres estadios */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "حرفِ «و» که ۱۳۷ را آشکار می‌کند" : "La letra del «y» que revela 137"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="ו" sub={fa ? "نقطه · ۶" : "Punto · 6"} color="#c9a43e" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <Tile he="וָאו" sub={fa ? "خط · ۱۳" : "Línea · 13"} color="#c9a43e" size={40} />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <Tile he="137" sub="קַבָּלָה" color={C} size={44} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "حرفِ واو (ו) «و»ی عبری است. رایج‌ترین حرفِ این زبان. رابطِ ساده. اما کابالا می‌آموزد که هر حرف می‌تواند در سه مرحلهٔ بلوغ گشوده شود. در نخست، حرف به صورتِ نقطه وجود دارد: تنها واو، ارزش ۶. در دوم، نام هجی می‌شود: ואו (واو-آلِف-واو)، ارزش ۶+۱+۶ = ۱۳. در سوم، میلوییِ میلویی — نامِ هجی‌شده هجی می‌شود: ואו אלף ואו = (۶+۱+۶) + (۱+۳۰+۸۰) + (۶+۱+۶) = ۱۳ + ۱۱۱ + ۱۳ = ۱۳۷."
                : "La letra vav (ו) es el «y» del hebreo. La letra más común del idioma. El simple conector. Pero la Cabalá enseña que toda letra puede desplegarse en tres estadios de madurez. En el primero, la letra existe como punto: solo la vav, valor 6. En el segundo, el nombre se deletrea: ואו (vav-álef-vav), valor 6+1+6 = 13. En el tercero, el milui del milui — se deletrea el nombre deletreado: ואו אלף ואו = (6+1+6) + (1+30+80) + (6+1+6) = 13 + 111 + 13 = 137."}
            </p>
            <p>
              {fa
                ? "۱۳۷. همان ثابتِ ساختارِ ریزی که شدتِ تبادل میانِ نور و ماده را در سراسرِ جهان تعیین می‌کند. حرفی که یعنی «و» — ساده‌ترین رابطِ زبان — هنگامی که به بُعدِ سومِ خود گشوده می‌شود، عددی را آشکار می‌کند که درخشان‌ترین فیزیکدانانِ تاریخ نتوانستند آن را از اصولِ اولیه استخراج کنند. جهان بر یک قلاب استوار است، و آن قلاب در کمالِ خود برابرِ ۱۳۷ است."
                : "137. La misma constante de estructura fina que determina la intensidad del intercambio entre la luz y la materia en todo el universo. La letra que significa «y» —el conector más modesto del lenguaje— cuando se despliega a su tercera dimensión, revela el número que los físicos más brillantes de la historia no han podido derivar desde primeros principios. El universo está sostenido por un gancho, y ese gancho en su plenitud vale 137."}
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
                  ? "لحظه‌ای با این بنشین. رازآمیزترین ثابتِ فیزیک — همان ۱۳۷ که تمامِ برهم‌کنشِ الکترومغناطیسیِ جهان را نگاه می‌دارد — ارزشِ واو در کاملِ گسترشِ خود است. همان حرفی که در عبری یعنی «و». رابط. قلاب. تمامِ آنچه در جهانِ مادی وجود دارد بر قلابی استوار است که در ژرف‌ترین بُعدِ خود، عددِ کابالا را آشکار می‌کند."
                  : "Siéntate un momento con esto. La constante más enigmática de la física — ese 137 que sostiene toda interacción electromagnética del universo — es el valor de la vav en su plena expansión. La misma letra que en hebreo significa «y». El conector. El gancho. Todo lo que existe en el universo material se sostiene gracias a un conector que, en su dimensión más profunda, revela el número de la Kabbalah."}
              </p>
              <p>
                {fa
                  ? "تو از کدام مرحله سخن می‌گویی؟ از نقطه — انگیزهٔ نپرورده، واو به عنوانِ ۶؟ از خط — نخستین اندیشه‌ای که بیرون می‌آید، واو به عنوانِ ۱۳؟ یا از سطح — جایی که سکوت و سخن یکپارچه شده‌اند، واو به عنوانِ ۱۳۷؟ عملِ چَشمَل، گذر از هر سه است."
                  : "¿Desde qué estadio hablas tú? ¿Desde el punto — el impulso sin elaborar, la vav como 6? ¿Desde la línea — el primer pensamiento que sale, la vav como 13? ¿O desde el área — la superficie donde el silencio y el habla se integraron, la vav como 137? La práctica del chashmal consiste en atravesar los tres."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              חַשְׁמַל · וָאו
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "عددی که آفرینش را نگاه می‌دارد" : "El número que sostiene la creación"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "חש (۳۰۸) + מל (۷۰) = ۳۷۸ = חשמל. رازآمیزترین واژهٔ کتاب مقدس معادلهٔ آنچه هست را در خود دارد: ترکیبِ سکوت و سخن. و حرفِ واو — سادهٔ‌ترین «و»ی زبان — در کاملِ گسترشِ خود دقیقاً برابرِ ۱۳۷ است: عددی که نیرویِ برهم‌کنش میانِ نور و ماده را تعریف می‌کند. تمامِ جهان بر قلابی استوار است. آن قلاب، در بُعدِ سومِ خود، کابالا است."
                : "חש (308) + מל (70) = 378 = חשמל. La palabra más misteriosa de la Biblia lleva en sí misma la ecuación de lo que es: la síntesis del silencio y el habla. Y la letra vav — el «y» más simple del lenguaje — en su plena expansión vale exactamente 137: el número que define la fuerza de interacción entre la luz y la materia. El universo entero está sostenido por un gancho. Ese gancho, en su tercera dimensión, es la Kabbalah."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "یحزقئل ۱:۴" : "Yejezkel 1:4", ref: "Ezekiel 1:4" },
                { label: fa ? "قوهلِت ۳:۷" : "Kohelet 3:7", ref: "Kohelet 3:7" },
                { label: fa ? "بِرِشیت ۱:۳" : "Bereshit 1:3", ref: "Genesis 1:3" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Ezekiel 1:4")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ چَشمَل در جاشمال ←" : "Estudiar el chashmal en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۹" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 9"}
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
                ? "واژه‌ای که شکوهِ الهی را توصیف می‌کند، در عددِ خود دقیقاً برابرِ جمعِ آن چیزی است که توصیف می‌کند: سکوت و سخن، به هم بسته. جهان با یک کلمه آفریده شد. آن کلمه از سکوت برخاست. و در فضایِ میانِ دو — در آستانه‌ای که سکوت به سخن تبدیل می‌شود — چَشمَل است."
                : "La palabra que describe el resplandor divino es, en su número, la suma exacta de lo que describe: el silencio y el habla, atados. El mundo fue creado con una palabra. Esa palabra emergió del silencio. Y en el espacio entre los dos — en el umbral donde el silencio se convierte en habla — está el chashmal."}
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
