import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05050a",
        gold: "#c9a43e",
        "gold-soft": "#e0c873",
        parchment: "#e8e4d8",
        muted: "#9a958a",
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
