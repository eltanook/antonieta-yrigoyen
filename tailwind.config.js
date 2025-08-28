/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom floral colors
        sage: {
          50: "oklch(0.95 0.02 145)",
          100: "oklch(0.9 0.04 145)",
          200: "oklch(0.8 0.08 145)",
          300: "oklch(0.7 0.1 145)",
          400: "oklch(0.6 0.12 145)",
          500: "oklch(0.55 0.12 145)", // Primary sage
          600: "oklch(0.45 0.15 145)",
          700: "oklch(0.35 0.18 145)",
          800: "oklch(0.25 0.2 145)",
          900: "oklch(0.15 0.22 145)",
        },
        rose: {
          50: "oklch(0.95 0.02 25)",
          100: "oklch(0.9 0.04 25)",
          200: "oklch(0.85 0.06 25)",
          300: "oklch(0.8 0.08 25)", // Secondary dusty rose
          400: "oklch(0.7 0.1 25)", // Accent dusty rose
          500: "oklch(0.6 0.12 25)",
          600: "oklch(0.5 0.15 25)",
          700: "oklch(0.4 0.18 25)",
          800: "oklch(0.3 0.2 25)",
          900: "oklch(0.2 0.22 25)",
        },
        cream: {
          50: "oklch(0.99 0.002 85)",
          100: "oklch(0.97 0.005 85)",
          200: "oklch(0.95 0.008 85)",
          300: "oklch(0.92 0.01 85)",
          400: "oklch(0.88 0.015 85)",
          500: "oklch(0.85 0.02 85)",
          600: "oklch(0.75 0.03 85)",
          700: "oklch(0.65 0.04 85)",
          800: "oklch(0.55 0.05 85)",
          900: "oklch(0.45 0.06 85)",
        },
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
}
