import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { atajosDeMisterioRewrites } from "./lib/content/misterio-atajos";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async rewrites() {
    // ATAJOS CORTOS DE LOS MISTERIOS — jashmal.org/{slug}
    //
    // Se generan SOLOS a partir del catálogo (lib/content/misterios.ts): cada
    // misterio nuevo recibe su atajo por existir, sin tocar este archivo.
    // Antes esta lista estaba escrita a mano y los misterios nuevos nacían
    // sin atajo (daban 404 en la raíz).
    //
    // Es un rewrite INTERNO, no un redirect: la URL en el navegador se queda
    // corta (/137). El middleware deja pasar estas rutas para que next-intl
    // no les ponga /es delante antes de llegar aquí.
    //
    // La validación de colisiones (que ningún slug tape una ruta real) vive en
    // lib/content/misterio-atajos.ts y revienta el build si algo choca.
    return atajosDeMisterioRewrites();
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

      // "/alef" era un scrollytelling experimental previo al motor de letras.
      // La página se eliminó (2026-07-23); todo enlace viejo cae en la
      // experiencia inmersiva canónica de Álef (/letra/alef).
      { source: "/alef", destination: "/letra/alef", permanent: true },
      { source: "/es/alef", destination: "/es/letra/alef", permanent: true },
      { source: "/fa/alef", destination: "/fa/letra/alef", permanent: true },
      { source: "/en/alef", destination: "/en/letra/alef", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
