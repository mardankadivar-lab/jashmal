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

// Las tres letras "madre de la vocal" y su nombre deletreado (milui).
const TRES: { he: string; nombre: string; es: string; fa: string; valor: number }[] = [
  { he: "א", nombre: "אָלֶף", es: "álef", fa: "آلِف", valor: 111 },
  { he: "ה", nombre: "הֵא", es: "hei", fa: "هِی", valor: 6 },
  { he: "י", nombre: "יוֹד", es: "yod", fa: "یود", valor: 20 },
];

export default function PageNumeroFemenino() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#cf6fa8";   // rosa-magenta — el principio femenino, el vaso
  const Q = "#8fb4e8";   // azul — la pregunta
  const S = "#e8c05a";   // dorado — la respuesta

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

        {/* HERO — la pregunta y la respuesta */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۸" : "Rav Ginsburgh · 137, cap. 8"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="אַיֵּה" sub={fa ? "کجا؟" : "¿Dónde?"} color={Q} size={34} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>{fa ? "←" : "→"}</span>
            <Tile he="הִיא" sub={fa ? "او (زن)" : "Ella"} color={S} size={34} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(88px, 26vw, 168px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            137
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "۱۳۷ — عددِ مؤنث" : "137 — el número femenino"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "سه حرف، یک پرسش و پاسخی که وارونهٔ همان پرسش است."
              : "Tres letras, una pregunta, y una respuesta que es esa misma pregunta al revés."}
          </p>
        </div>

        {/* SECCIÓN 1 — Tres letras, un número */}
        <Section>
          <h3 className="mb-5 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "سه حرف، یک عدد" : "Tres letras, un número"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در الفبای عبری سه حرف هست که با بقیه فرق دارند: آلِف (א)، هِی (ה) و یود (י). این‌ها تنها صامت نیستند؛ می‌توانند حاملِ صدا هم باشند — همان کاری که «ا»، «و» و «ی» در فارسی می‌کنند. کابالا آن‌ها را «حروفِ نَفَس» می‌نامد: حروفی که خود دیده نمی‌شوند، اما به دیگران اجازهٔ شنیده‌شدن می‌دهند."
                : "En el alefato hebreo hay tres letras distintas de todas las demás: álef (א), hei (ה) y yod (י). No son solo consonantes: pueden también llevar el sonido de una vocal. La Cabalá las llama «letras de aliento»: letras que casi no se ven, pero que permiten que las otras suenen."}
            </p>
            <p>
              {fa
                ? "در کابالا هر حرف را می‌توان «کامل نوشت» (میلوی): به‌جای خودِ حرف، نامش را می‌نویسند و ارزشِ عددیِ نام را می‌شمارند. برایِ این سه حرف نتیجه چنین است:"
                : "En Cabalá cada letra puede «escribirse completa» (milui): en vez de la letra sola, se escribe su nombre y se suma el valor de ese nombre. Para estas tres, el resultado es este:"}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {TRES.map((t, i) => (
              <div key={t.he} className="flex items-center gap-2.5">
                <Tile he={t.nombre} sub={`${fa ? t.fa : t.es} · ${t.valor}`} color={Q} size={30} />
                {i < TRES.length - 1 && <span className="font-cinzel text-2xl text-gold/40">+</span>}
              </div>
            ))}
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="137" sub="קַבָּלָה" color={C} size={40} />
          </div>

          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "אָלֶף (۱۱۱) + הֵא (۶) + יוֹד (۲۰) = ۱۳۷. همان ۱۳۷ که ارزشِ عددیِ واژهٔ קַבָּלָה («کابالا») است، و همان عددی که فیزیک آن را معمّاگونه‌ترین ثابتِ طبیعت می‌داند."
                : "אָלֶף (111) + הֵא (6) + יוֹד (20) = 137. El mismo 137 que vale la palabra קַבָּלָה («Cabalá»), y el mismo número que la física considera la constante más enigmática de la naturaleza."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 2 — La pregunta escondida en la primera frase */}
        <Section>
          <h3 className="mb-5 mt-14 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "پرسشِ پنهان در نخستین جمله" : "La pregunta escondida en la primera frase"}
          </h3>
          <p className="hebrew mb-6 text-center text-2xl leading-relaxed" style={{ color: "#c9a43e", textShadow: dark ? "0 0 10px #c9a43e66" : "none" }}>
            בְּרֵאשִׁית בָּרָא אֱלֹהִים
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "«در آغاز خدا آفرید» — سه واژهٔ نخستِ تورات. حال حروف را از اول بشمار. نخستین آلِف (א) سومین حرفِ تورات است. نخستین یود (י) پنجمین. و نخستین هِی (ה) دوازدهمین. یعنی این سه حرف، به ترتیبِ نخستین پیدایش، چنین می‌آیند: א · י · ה."
                : "«En el principio creó Dios» — las tres primeras palabras de la Torá. Ahora cuenta las letras desde el inicio. El primer álef (א) es la 3.ª letra de la Torá. El primer yod (י) es la 5.ª. Y el primer hei (ה) es la 12.ª. Es decir: estas tres letras aparecen, por orden de primera aparición, así: א · י · ה."}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="א" sub={fa ? "حرفِ ۳" : "letra 3.ª"} color={Q} size={40} />
            <Tile he="י" sub={fa ? "حرفِ ۵" : "letra 5.ª"} color={Q} size={40} />
            <Tile he="ה" sub={fa ? "حرفِ ۱۲" : "letra 12.ª"} color={Q} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="אַיֵּה" sub={fa ? "«کجا؟»" : "«¿dónde?»"} color={S} size={36} />
          </div>

          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "אַיֵּה (اَیِّه) در عبری یعنی «کجا؟». و این پرسش در نیایشِ یهودی نشانی روشن دارد: در کِدوشای موساف، فرشتگان از یکدیگر می‌پرسند אַיֵּה מְקוֹם כְּבוֹדוֹ — «جایگاهِ شکوهِ او کجاست؟». تورات با آفرینش آغاز نمی‌شود؛ با پرسش آغاز می‌شود."
                : "אַיֵּה (ayé) significa en hebreo «¿dónde?». Y esa pregunta tiene una dirección concreta en la liturgia judía: en la Kedushá de Musaf los ángeles se preguntan unos a otros אַיֵּה מְקוֹם כְּבוֹדוֹ — «¿dónde está el lugar de Su gloria?». La Torá no empieza con una afirmación: empieza con una pregunta escondida."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="¿Dónde está el lugar de Su gloria?"
          fa="جایگاهِ شکوهِ او کجاست؟"
          source={fa ? "کِدوشای موساف" : "Kedushá de Musaf"}
          fa_active={fa} />

        {/* SECCIÓN 3 — Y la respuesta fue: Ella */}
        <Section>
          <h3 className="mb-5 mt-14 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "و پاسخ این بود: او" : "Y la respuesta fue: Ella"}
          </h3>
          <p className="hebrew mb-6 text-center text-2xl leading-relaxed" style={{ color: "#c9a43e", textShadow: dark ? "0 0 10px #c9a43e66" : "none" }}>
            יְהִי אוֹר וַיְהִי־אוֹר
          </p>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "«نور باشد، و نور شد» (پیدایش ۱:۳) — نخستین آفرینشِ گفته‌شده. اینجا همان سه حرف دوباره کنارِ هم می‌نشینند، بی‌آنکه حرفِ دیگری میانشان بیاید: در יְהִי אוֹר و باز در וַיְהִי אוֹר. و این بار خوانده می‌شوند הִיא — «او»، ضمیرِ مؤنث."
                : "«Haya luz, y hubo luz» (Génesis 1:3) — el primer acto de creación dicho en voz alta. Aquí las mismas tres letras vuelven a quedar juntas, sin ninguna otra letra entre ellas: dentro de יְהִי אוֹר, y otra vez dentro de וַיְהִי אוֹר. Y esta vez se leen הִיא — «ella», el pronombre femenino."}
            </p>
            <p>
              {fa
                ? "הִיא دقیقاً وارونهٔ אַיֵּה است: ه-ی-ا به‌جای ا-ی-ه. پرسش، وارونه، پاسخ می‌شود. «جایگاهِ شکوهِ او کجاست؟» — در او. و میلویِ همین הִיא (הא יוד אלף) باز هم ۱۳۷ است: همان سه حرف، همان عدد."
                : "הִיא es exactamente אַיֵּה al revés: h-i-a en lugar de a-i-h. La pregunta, invertida, se vuelve respuesta. «¿Dónde está el lugar de Su gloria?» — en Ella. Y el milui de ese mismo הִיא (הא יוד אלף) vuelve a dar 137: las mismas tres letras, el mismo número."}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="אַיֵּה" sub={fa ? "پرسش" : "La pregunta"} color={Q} size={36} />
            <span className="font-cinzel text-2xl text-gold/40">↔</span>
            <Tile he="הִיא" sub={fa ? "پاسخ · ۱۳۷" : "La respuesta · 137"} color={S} size={36} />
          </div>
        </Section>

        {/* SECCIÓN 4 — Recibir es femenino */}
        <Section>
          <h3 className="mb-5 mt-14 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "پذیرفتن، مؤنث است" : "Recibir es femenino"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "واژهٔ קַבָּלָה («کابالا») از ریشهٔ ק־ב־ל می‌آید، که دو معنا دارد: «پذیرفتن» و «رو‌به‌رو / موازیِ چیزی بودن». برایِ پذیرفتن باید رو‌به‌رویِ بخشنده ایستاد. در تمامِ تورات این ریشه تنها دو بار می‌آید — و هر دو بار در جمعِ مؤنث: מַקְבִּילֹת הַלֻּלָאֹת، «حلقه‌ها رو‌به‌رویِ یکدیگر بودند»، در وصفِ پرده‌هایِ خیمهٔ مقدس (شِموت/خروج ۲۶:۵ و ۳۶:۱۲)."
                : "La palabra קַבָּלָה («Cabalá») viene de la raíz ק־ב־ל, que significa dos cosas: «recibir» y «estar paralelo, frente a». Para recibir hay que estar frente al que da. En toda la Torá esa raíz aparece solo dos veces — y las dos en femenino plural: מַקְבִּילֹת הַלֻּלָאֹת, «paralelos estaban los lazos, uno frente al otro», describiendo las cortinas del Santuario (Shemot/Éxodo 26:5 y 36:12)."}
            </p>
            <p>
              {fa
                ? "و نکتهٔ شگفت این است: نخستین باری که چهار حرفِ קבלה در تورات همه با هم در یک واژه می‌آیند — با ترتیبی دیگر — آنجاست که خدا به ابراهیم می‌گوید: «هر آنچه سارا به تو می‌گوید، به صدایِ او گوش کن» — שְׁמַע בְּקֹלָהּ (پیدایش ۲۱:۱۲). واژهٔ בְּקֹלָהּ («به صدایِ او») همان چهار حرفِ קַבָּלָה است، و ارزشش نیز همان: ۱۳۷."
                : "Y aquí ocurre algo notable: la primera vez que las cuatro letras de קבלה aparecen juntas en una sola palabra de la Torá —en otro orden— es cuando Dios le dice a Abraham: «todo lo que Sará te diga, escucha su voz» — שְׁמַע בְּקֹלָהּ (Génesis 21:12). La palabra בְּקֹלָהּ («su voz») tiene las mismas cuatro letras de קַבָּלָה, y también el mismo valor: 137."}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="בְּקֹלָהּ" sub={fa ? "«صدایِ او» · ۱۳۷" : "«su voz» · 137"} color={C} size={34} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="קַבָּלָה" sub="137" color={C} size={34} />
          </div>

          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "راشی (بزرگ‌ترین مفسّرِ سنتیِ تورات) بر همین آیه می‌نویسد که ابراهیم در نبوّت فروتر از سارا بود. مردی که نخستین پیامبرِ این راه است، فرمان می‌گیرد که گوش بسپارد. نخستین کابالا، شنیدن است."
                : "Rashi (el comentarista clásico por excelencia) escribe sobre este mismo versículo que Abraham era inferior a Sará en profecía. El hombre que inaugura todo el camino recibe la orden de escuchar. La primera Cabalá es oír."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 5 — La luz que da, el vaso que recibe */}
        <Section>
          <h3 className="mb-5 mt-14 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "نوری که می‌بخشد، ظرفی که می‌پذیرد" : "La luz que da, el vaso que recibe"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "در فیزیک، ۱۳۷ عددی تصادفی نیست. وارونهٔ ثابتِ ساختارِ ریز (α) است: عددی که تعیین می‌کند نور با چه شدّتی به مادّه چنگ می‌زند. هر رنگی که می‌بینی، هر پیوندِ شیمیایی، هر تماسِ دستت با یک میز — همه با این عدد سنجیده می‌شوند. و هیچ فیزیکدانی تا امروز نتوانسته آن را از اصولِ نخستین بیرون بکشد."
                : "En física, 137 no es un número cualquiera. Es el inverso de la constante de estructura fina (α): el número que decide con qué fuerza la luz se agarra a la materia. Cada color que ves, cada enlace químico, cada vez que tu mano toca una mesa: todo eso se mide con ese número. Y ningún físico ha logrado todavía derivarlo desde primeros principios."}
            </p>
            <p>
              {fa
                ? "و همین است ساختارِ اصلیِ کابالا: نور (אוֹר) که می‌بخشد، و ظرف (כְּלִי) که می‌پذیرد. بخشنده اصلِ مذکّر است؛ پذیرنده، اصلِ مؤنث. ۱۳۷ عددِ خودِ نور نیست و عددِ خودِ مادّه هم نیست — عددِ پیوندِ آن دو است. عددِ نسبت."
                : "Y esa es exactamente la estructura básica de la Cabalá: la luz (אוֹר) que da, y el vaso (כְּלִי) que recibe. Lo que da es el principio masculino; lo que recibe, el femenino. 137 no es el número de la luz ni el número de la materia: es el número del vínculo entre las dos. El número de la relación."}
            </p>
            <p>
              {fa
                ? "این پیوند در چند جایِ دیگر هم امضا شده است. در مِشلِی (امثال ۱۹:۱۴) عبارتِ אִשָּׁה מַשְׂכָּלֶת — «زنی خردمند» — برابرِ ۱۰۹۶ است؛ و چون دقیقاً هشت حرف دارد، سهمِ هر حرف می‌شود ۱۳۷. راحل (רָחֵל، ۲۳۸) و لِئا (לֵאָה، ۳۶)، دو همسرِ یعقوب، رویِ هم ۲۷۴ می‌شوند: میانگینشان باز ۱۳۷. و در زُهَر، فرشتهٔ زیبایی و خردِ کابالایی یוֹפִיאֵל نام دارد — که آن هم ۱۳۷ است."
                : "Ese vínculo está firmado en varios lugares más. En Mishlé (Proverbios 19:14) la expresión אִשָּׁה מַשְׂכָּלֶת — «una mujer perspicaz»— vale 1.096; y como tiene exactamente ocho letras, a cada letra le tocan 137. Rajel (רָחֵל, 238) y Leá (לֵאָה, 36), las dos esposas de Yaakov, suman 274: su promedio es otra vez 137. Y en el Zóhar, el ángel de la belleza y de la sabiduría cabalística se llama יוֹפִיאֵל — que también vale 137."}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="אִשָּׁה מַשְׂכָּלֶת" sub={fa ? "۱۰۹۶ = ۸ × ۱۳۷" : "1.096 = 8 × 137"} color={C} size={24} />
            <Tile he="רָחֵל · לֵאָה" sub={fa ? "میانگین ۱۳۷" : "promedio 137"} color={C} size={24} />
            <Tile he="יוֹפִיאֵל" sub="137" color={C} size={24} />
          </div>
        </Section>

        {/* HITBONENUT */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.05] to-transparent p-8">
            <p className="hebrew mb-4 text-center text-xl text-gold/70" style={{ textShadow: dark ? "0 0 10px #c9a43e44" : "none" }}>
              הִתְבּוֹנְנוּת
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              <p>
                {fa
                  ? "لحظه‌ای با این بنشین. در این متن، «مؤنث» نقشِ اجتماعی نیست؛ یکی از دو حرکتِ بنیادینِ هستی است: بخشیدن و پذیرفتن. هر دو در هر انسانی هست. پرسشِ אַיֵּה — «کجایی؟» — تنها وقتی پاسخ می‌گیرد که کسی ظرف شود."
                  : "Siéntate un momento con esto. Aquí «femenino» no es un papel social: es uno de los dos movimientos básicos de la existencia — dar y recibir. Los dos están en toda persona. La pregunta אַיֵּה —«¿dónde estás?»— solo obtiene respuesta cuando alguien se vuelve vaso."}
              </p>
              <p>
                {fa
                  ? "امروز در کدام حرکت ایستاده‌ای؟ در بخشیدن — سخن گفتن، ساختن، تابیدن؟ یا در پذیرفتن — خاموش‌ماندن، شنیدن، جا باز کردن؟ ابراهیم، پیامبر، فرمان گرفت که به صدایِ سارا گوش کند. گاهی بزرگ‌ترین کارِ روحانی همین است: ساکت شدن تا نوری که آمده، جایی برای نشستن پیدا کند."
                  : "¿En cuál de los dos movimientos estás hoy? ¿En el de dar — hablar, construir, irradiar? ¿O en el de recibir — callar, escuchar, hacer espacio? A Abraham, que era profeta, se le ordenó escuchar la voz de Sará. A veces la mayor obra espiritual es esa: callarse, para que la luz que ya llegó encuentre dónde posarse."}
              </p>
            </div>
          </div>
        </Section>

        {/* SÍNTESIS */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              אַיֵּה · הִיא
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "پرسش، وارونه، پاسخ است" : "La pregunta, invertida, es la respuesta"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "آلِف، هِی و یود — سه حرفِ نَفَس — با نامِ کاملشان ۱۳۷ می‌شوند، همچون קַבָּלָה. در نخستین جملهٔ تورات به ترتیبِ پیدایش אַיֵּה («کجا؟») می‌سازند؛ در آفرینشِ نور، وارونه، הִיא («او»). و ۱۳۷ در فیزیک همان ثابتی است که نور را به مادّه گره می‌زند. پاسخِ آن پرسش جایی بیرون نیست: در ظرف است، در آنکه می‌پذیرد."
                : "Álef, hei y yod —las tres letras de aliento— escritas por su nombre suman 137, igual que קַבָּלָה. En la primera frase de la Torá, por orden de aparición, forman אַיֵּה («¿dónde?»); en la creación de la luz, al revés, הִיא («Ella»). Y 137 es en física la constante que ata la luz a la materia. La respuesta a esa pregunta no está afuera: está en el vaso, en lo que recibe."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بِرِشیت ۱:۱" : "Bereshit 1:1", ref: "Genesis 1:1" },
                { label: fa ? "بِرِشیت ۱:۳" : "Bereshit 1:3", ref: "Genesis 1:3" },
                { label: fa ? "بِرِشیت ۲۱:۱۲" : "Bereshit 21:12", ref: "Genesis 21:12" },
                { label: fa ? "مِشلِی ۱۹:۱۴" : "Mishlé 19:14", ref: "Proverbs 19:14" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 21:12")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ «صدایِ سارا» ←" : "Estudiar «la voz de Sará» →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۸" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 8"}
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
                ? "تورات با پرسشی آغاز می‌شود که در حروفش پنهان است: کجا؟ و نخستین باری که نور سخن می‌گوید، همان حروف وارونه می‌شوند و پاسخ می‌دهند: او. میانِ پرسش و پاسخ فقط یک چیز تغییر کرده است — جهتِ خواندن. گاهی برایِ یافتنِ پاسخ، کافی است از سویِ دیگر نگاه کنی."
                : "La Torá empieza con una pregunta escondida en sus letras: ¿dónde? Y la primera vez que la luz habla, esas mismas letras se dan vuelta y responden: Ella. Entre la pregunta y la respuesta cambió una sola cosa — la dirección de la lectura. A veces, para encontrar la respuesta, basta con mirar desde el otro lado."}
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
