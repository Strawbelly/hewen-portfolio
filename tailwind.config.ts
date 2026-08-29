import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#fffdf7",
        ink: "#151515",
        cobalt: "#1534a3",
        "cobalt-soft": "#dfe8ff",
        chrome: "#c9ced6",
        "screen-blue": "#b9d1ff",
        washi: "#f8d84a",
        melon: "#ff8da1",
        mint: "#9fe3c1"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"]
      },
      boxShadow: {
        hard: "5px 5px 0 #151515",
        soft: "0 20px 60px rgba(21, 21, 21, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
