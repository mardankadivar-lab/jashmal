import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tokens semánticos basados en variables CSS (cambian con el tema).
        // Formato canal RGB para que sigan funcionando los modificadores /opacidad.
        ink: "rgb(var(--c-bg) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
        "gold-soft": "rgb(var(--c-gold-soft) / <alpha-value>)",
        parchment: "rgb(var(--c-text) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        vazir: ["var(--font-vazir)", "sans-serif"],
        hebrew: ["var(--font-hebrew)", "Frank Ruhl Libre", "David Libre", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
