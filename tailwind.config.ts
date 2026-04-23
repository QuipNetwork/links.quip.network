import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zinc scale
        zinc: {
          50:  "#fafafa",
          100: "#f4f4f5",
          150: "#e4e4e7",
          200: "#dbdbde",
          250: "#d4d4d8",
          300: "#c9c9cb",
          400: "#9f9fa9",
          500: "#71717b",
          550: "#56565c",
          600: "#52525c",
          700: "#3f3f46",
          750: "#343436",
          800: "#27272a",
          850: "#212124",
          900: "#18181b",
          950: "#09090b",
        },
        coral: "#ff6467",

        // Semantic aliases (resolve to zinc stops)
        bg: "#fafafa",
        "surface-1": "#f4f4f5",
        "surface-2": "#e4e4e7",
        "surface-3": "#dbdbde",
        "surface-dark": "#18181b",
        "surface-darker": "#27272a",
        "fg-strong": "#09090b",
        "fg-body": "#27272a",
        "fg-subtle": "#52525c",
        "fg-muted": "#71717b",
        "fg-on-dark": "#fafafa",
        "fg-on-dark-muted": "#9f9fa9",
        "border-default": "#d4d4d8",
        accent: "#ff6467",
      },
      fontFamily: {
        sans: ["ABC Favorit", "system-ui", "sans-serif"],
        heading: ["ABC Gaisyr", "Georgia", "serif"],
        mono: ["ABC Favorit Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to right, #FEF278 0%, #FFDE53 32.69%, #EEFF64 59.9%, #CAFDFB 75.42%, #BCF4FF 86.91%, #E6D7FF 100%)",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(.2,.7,.2,1)",
      },
    },
  },
  plugins: [],
};
export default config;
