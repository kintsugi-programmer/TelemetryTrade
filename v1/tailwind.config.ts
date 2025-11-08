import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
        fontFamily: {
    sans: ["var(--font-satoshi)", "system-ui", "sans-serif"], // default UI font
    rubik: ["var(--font-rubik-80s)", "cursive"],              // optional for headings
  },
    },
  },
  plugins: [],
};
export default config;
