import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async rewrites() {
    // Atajos TikTok: la URL en el navegador QUEDA como /26 o /358
    // (rewrite interno, no redirect). El middleware los ignora para que
    // next-intl no añada /es antes de que lleguen aquí.
    return [
      { source: "/358", destination: "/es/misterio/358" },
      { source: "/26",  destination: "/es/misterio/26"  },
      { source: "/linaje", destination: "/es/misterio/linaje" },
      { source: "/tamar", destination: "/es/misterio/tamar" },
      { source: "/betsabe", destination: "/es/misterio/betsabe" },
      { source: "/habakuk", destination: "/es/misterio/habakuk" },
      { source: "/bilaam", destination: "/es/misterio/bilaam" },
      { source: "/137", destination: "/es/misterio/137" },
      { source: "/entrelazamiento", destination: "/es/misterio/entrelazamiento" },
      { source: "/sanador", destination: "/es/misterio/sanador" },
      { source: "/refael", destination: "/es/misterio/refael" },
      { source: "/serpiente-de-cobre", destination: "/es/misterio/serpiente-de-cobre" },
      { source: "/refua", destination: "/es/misterio/refua" },
      { source: "/21-pactos", destination: "/es/misterio/21-pactos" },
      { source: "/enoch", destination: "/es/misterio/enoch" },
      { source: "/lot", destination: "/es/misterio/lot" },
      { source: "/yehuda", destination: "/es/misterio/yehuda" },
    ];
  },
  async redirects() {
    // Rutas viejas de la "Mente Cósmica": "/grafo" y "/cerebro" fueron nombres
    // previos, y "/universo" fue la ruta anterior. TODAS redirigen de forma
    // permanente a la URL actual para no romper enlaces compartidos, marcadores
    // ni el SEO. redirects() corre ANTES del middleware de next-intl, así que
    // cada locale salta directo a su URL canónica (en/fa → /cosmic-mind,
    // es → /mente-cosmica), sin doble salto. La URL pública cambia por idioma:
    //   es → /mente-cosmica   ·   en → /cosmic-mind   ·   fa → /cosmic-mind
    return [
      // Antiguo nombre interno → URL canónica localizada (que NADA dé 404).
      // El middleware de next-intl también redirige /en/mente-cosmica, pero lo
      // dejamos explícito como 308 permanente para SEO y para ir directo.
      { source: "/en/mente-cosmica", destination: "/en/cosmic-mind", permanent: true },
      { source: "/fa/mente-cosmica", destination: "/fa/cosmic-mind", permanent: true },

      // Link corto para el CTA del video en inglés (TikTok/Instagram).
      // jashmal.org/cosmic → la Mente Cósmica en inglés. Va en redirects()
      // para disparar ANTES del middleware de next-intl (si no, /cosmic se
      // convierte en /es/cosmic y da 404).
      { source: "/cosmic", destination: "/en/cosmic-mind", permanent: true },

      // "cosmic-mind" es el slug INGLÉS. Sin prefijo de idioma, el middleware
      // de next-intl lo trataría como ruta en español y caería en /es/mente-cosmica.
      // Lo fijamos aquí (antes del middleware) para que SIEMPRE vaya al inglés.
      { source: "/cosmic-mind", destination: "/en/cosmic-mind", permanent: true },

      { source: "/universo", destination: "/mente-cosmica", permanent: true },
      { source: "/es/universo", destination: "/es/mente-cosmica", permanent: true },
      { source: "/fa/universo", destination: "/fa/cosmic-mind", permanent: true },
      { source: "/en/universo", destination: "/en/cosmic-mind", permanent: true },
      { source: "/grafo", destination: "/mente-cosmica", permanent: true },
      { source: "/es/grafo", destination: "/es/mente-cosmica", permanent: true },
      { source: "/fa/grafo", destination: "/fa/cosmic-mind", permanent: true },
      { source: "/en/grafo", destination: "/en/cosmic-mind", permanent: true },
      { source: "/cerebro", destination: "/mente-cosmica", permanent: true },
      { source: "/es/cerebro", destination: "/es/mente-cosmica", permanent: true },
      { source: "/fa/cerebro", destination: "/fa/cosmic-mind", permanent: true },
      { source: "/en/cerebro", destination: "/en/cosmic-mind", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
