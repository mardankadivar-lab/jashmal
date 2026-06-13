import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Nitzotzot from "@/components/Nitzotzot";
import SiteHeader from "@/components/SiteHeader";
import MotivationBanner from "@/components/MotivationBanner";

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <SiteHeader />
      <main className="relative">
        {/* Hero con partículas Nitzotzot — siempre oscuro (el negro es dramático aquí).
            Capas (de abajo hacia arriba): Nitzotzot → glow → contenido. */}
        <section className="always-dark relative flex min-h-[88vh] items-center justify-center overflow-hidden px-5">
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
            <h1 className="electrum animate-fade-up mt-6 pt-3 pb-1 font-cinzel text-6xl leading-[1.35] sm:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="hebrew electrum-he animate-fade-up mt-4 text-5xl font-bold sm:text-6xl">
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
            {/* Puerta cálida para quien nunca ha estudiado: lo lleva a la Academia
                (El Umbral). Va debajo del botón de estudio, con tono de invitación. */}
            <div className="animate-fade-up mt-5">
              <Link
                href="/academia"
                className="group inline-flex items-center gap-2 rounded-full bg-gold/10 px-7 py-3 font-cinzel text-sm tracking-wide text-gold-soft ring-1 ring-gold/30 transition-all hover:bg-gold/20 hover:text-gold hover:ring-gold/60"
              >
                <span aria-hidden="true" className="text-gold/70 transition group-hover:text-gold">✦</span>
                {t("hero.guided")}
              </Link>
              <p className="mt-3 text-xs text-muted">{t("hero.guidedHint")}</p>
            </div>
            <div className="animate-fade-up mt-12 border-t border-gold/15 pt-8">
              <MotivationBanner />
            </div>
          </div>
        </section>

        <footer className="border-t border-gold/15 px-5 py-8 text-center text-sm text-muted">
          {t("footer.principle")}
        </footer>
      </main>
    </>
  );
}
