import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)",    "sans-serif"],
      },
      colors: {
        cream: "var(--cream)",
        ink:   "var(--ink)",
        red:   "var(--red)",
        muted: "var(--muted)",
        rule:  "var(--rule)",
      },
    },
  },
  plugins: [],
};

export default config;
