import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Tonos monocromáticos suaves tipo lavanda-azul pastel
        primary: {
          50:  "#f5f7ff",
          100: "#e4e8ff",
          200: "#c7ceff",
          300: "#a4aaff",
          400: "#7f7fff",
          500: "#5f5fff",  // color base
          600: "#4b4bcc",
          700: "#383899",
          800: "#272766",
          900: "#1a1a44",
          950: "#0d0d22",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          50:  "#f8f8fa",
          100: "#e5e5eb",
          200: "#c7c7d6",
          300: "#a5a5ba",
          400: "#818199",
          500: "#66667f",
          600: "#4f4f61",
          700: "#3b3b49",
          800: "#292a34",
          900: "#1a1a23",
          950: "#0e0e15",
        },
        muted: {
          DEFAULT: "#a8a8b3",
          foreground: "#595969",
        },
        border: "#d0d0df",
        input: "#e0e0f0",
        ring: "#7f7fff",  // mismo que primary 400
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
