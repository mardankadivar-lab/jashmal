import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Nitzotzot from "@/components/Nitzotzot";
import SiteHeader from "@/components/SiteHeader";

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <SiteHeader />
      <main className="relative">
        {/* Hero con partículas Nitzotzot */}
        <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-5">
          <Nitzotzot />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(201,164,62,0.07) 0%, rgba(5,5,10,0) 60%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <p className="animate-fade-up font-cinzel text-xs uppercase tracking-[0.35em] text-gold/70">
              {t("hero.kicker")}
            </p>
            <h1 className="animate-fade-up mt-6 font-cinzel text-6xl text-parchment sm:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="hebrew animate-fade-up mt-3 text-4xl text-gold">
              {t("site.hebrew")}
            </p>
            <p className="animate-fade-up mt-8 font-cinzel text-lg italic text-gold-soft">
              {t("hero.tagline")}
            </p>
            <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-parchment/85">
              {t("hero.description")}
            </p>
            <p className="animate-fade-up mt-4 text-sm text-muted">
              {t("hero.etymology")}
            </p>
            <Link
              href="/estudio"
              className="animate-fade-up mt-10 inline-block rounded-full border border-gold/60 px-8 py-3 font-cinzel text-sm uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              {t("hero.cta")}
            </Link>
          </div>
        </section>

        <footer className="border-t border-gold/15 px-5 py-8 text-center text-sm text-muted">
          {t("footer.principle")}
        </footer>
      </main>
    </>
  );
}
