"use client";

import { useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { MISTERIOS_ORDENADOS } from "@/lib/misterios";
import MisterioTutor from "@/components/MisterioTutor";
import MisterioLangToggle from "@/components/MisterioLangToggle";

export default function MisteriosPage() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  return (
    <div className="always-dark min-h-screen bg-ink" dir={fa ? "rtl" : "ltr"}>
      {/* Nav: regreso al inicio + acceso al estudio */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 bg-ink/90 px-5 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 font-cinzel text-sm text-gold/70 transition-colors hover:text-gold"
          >
            <span>{fa ? "→" : "←"}</span>
            <span className="hebrew">חַשְׁמַל</span>
            <span>· Jashmal</span>
          </Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button
              onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              {fa ? "شروع مطالعه" : "Comenzar estudio →"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-5 pb-24 pt-12">
      {/* Encabezado */}
      <div className="mb-12 text-center">
        <p className="hebrew mb-2 text-3xl text-gold/80" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.4))" }}>
          סוֹדוֹת
        </p>
        <h1 className="font-cinzel text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
          {fa ? "اسرار" : "Misterios"}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          {fa
            ? "مطالعه‌هایی که لایه‌های پنهانِ متن را می‌گشایند — گیماتریا، صرافِ حروف، و رازهای زوهر. هر مطالعه دری است به‌سوی موتورِ کاوش."
            : "Estudios que abren las capas ocultas del texto — gematría, permutación de letras y secretos del Zohar. Cada uno es una puerta al motor de estudio."}
        </p>
        {/* El hilo que los une: la paradoja — שְׁנֵי פִּיּוֹת */}
        <p className="mx-auto mt-3 max-w-md text-xs italic leading-relaxed text-gold/50">
          {fa
            ? "نخی که آن‌ها را پیوند می‌دهد: «دو لبه» (שְׁנֵי פִּיּוֹת) — همان چیز، بسته به زاویه، می‌تواند سقوط باشد یا رستگاری."
            : "El hilo que los une: «Dos Filos» (שְׁנֵי פִּיּוֹת) — lo mismo, según el ángulo, puede ser la caída o la redención."}
        </p>
      </div>

      {/* Misterios agrupados por categoría */}
      {[
        { serie: "dos-filos", es: "Dos Filos", fa: "دو لبه", he: "שְׁנֵי פִּיּוֹת" },
        { serie: "gematria", es: "Gematría", fa: "گیماتریا", he: "גִּימַטְרִיָּה" },
        { serie: "sanidad", es: "Sanidad", fa: "شفا", he: "רְפוּאָה" },
      ].map((cat) => {
        const items = MISTERIOS_ORDENADOS.filter((m) => m.serie === cat.serie);
        if (items.length === 0) return null;
        return (
          <section key={cat.serie} className="mb-14">
            {/* Encabezado de categoría */}
            <div className="mb-5 flex items-center gap-3">
              <span className="hebrew text-lg text-gold/70">{cat.he}</span>
              <h2 className="font-cinzel text-sm font-bold uppercase tracking-[0.3em] text-gold/80">
                {fa ? cat.fa : cat.es}
              </h2>
              <span className="h-px flex-1 bg-gold/15" />
            </div>

            {/* Rejilla de la categoría */}
            <div className="grid gap-5 sm:grid-cols-2">
              {items.map((m) => (
                <button
                  key={m.slug}
                  onClick={() => router.push(`/misterio/${m.slug}`)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-white/[0.02] p-6 text-start transition-all hover:border-gold/50 hover:bg-gold/[0.04]"
                  style={{ minHeight: 200 }}
                >
                  {/* Glow de fondo en hover */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${m.color}33 0%, transparent 70%)` }}
                  />

                  {/* Número/gematría destacado */}
                  {m.numero && (
                    <span
                      className="font-cinzel font-black leading-none"
                      style={{ fontSize: "44px", color: m.color, textShadow: `0 0 18px ${m.color}66` }}
                    >
                      {m.numero}
                    </span>
                  )}

                  {/* Hebreo central */}
                  <span
                    className="hebrew mt-2 text-2xl font-bold leading-tight"
                    style={{ color: "#fdf4dd", textShadow: `0 0 14px ${m.color}88` }}
                  >
                    {m.he}
                  </span>

                  {/* Título */}
                  <h3 className="mt-3 font-cinzel text-base font-bold tracking-wide" style={{ color: m.color }}>
                    {fa ? m.tituloFa : m.titulo}
                  </h3>

                  {/* Gancho */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted/90">
                    {fa ? m.ganchoFa : m.gancho}
                  </p>

                  {/* Pie */}
                  <div className="mt-4 flex items-center justify-end">
                    <span className="font-cinzel text-xs text-gold/60 transition-colors group-hover:text-gold">
                      {fa ? "خواندن ←" : "leer →"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      {/* Nota: más por venir */}
      <p className="mt-12 text-center font-cinzel text-xs uppercase tracking-widest text-muted/40">
        {fa ? "اسرارِ بیشتر در راه‌اند" : "Más misterios en camino"}
      </p>

      {/* Tutor flotante */}
      <MisterioTutor />
      </main>
    </div>
  );
}
