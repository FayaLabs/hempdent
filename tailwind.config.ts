import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    // Scan the published Fayz plugin components (their src ships in the npm
    // tarball) so Tailwind generates the classes they use — blog list/detail,
    // reviews list, booking widget, auth modal. Without this those plugin-
    // rendered surfaces get no CSS.
    "./node_modules/@fayz-ai/plugin-blog/src/**/*.{js,ts,tsx}",
    "./node_modules/@fayz-ai/plugin-reputation/src/**/*.{js,ts,tsx}",
    "./node_modules/@fayz-ai/plugin-agenda/src/public/**/*.{js,ts,tsx}",
    "./node_modules/@fayz-ai/plugin-auth/src/website/**/*.{js,ts,tsx}",
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
        heading: "var(--font-heading)",
        body: "var(--font-body)",
        serif: "var(--font-serif)",
      },
      colors: {
        // Brand ramps (raw hex via CSS vars — expressive utilities for the
        // Hemp Dent surfaces: bg-pine-900, text-resin-500, bg-hemp-50, etc.)
        hemp: {
          50: "var(--hemp-50)",
          100: "var(--hemp-100)",
          200: "var(--hemp-200)",
          300: "var(--hemp-300)",
          400: "var(--hemp-400)",
        },
        ink: {
          300: "var(--ink-300)",
          400: "var(--ink-400)",
          500: "var(--ink-500)",
          700: "var(--ink-700)",
          800: "var(--ink-800)",
          900: "var(--ink-900)",
        },
        pine: {
          100: "var(--pine-100)",
          200: "var(--pine-200)",
          300: "var(--pine-300)",
          400: "var(--pine-400)",
          500: "var(--pine-500)",
          600: "var(--pine-600)",
          700: "var(--pine-700)",
          800: "var(--pine-800)",
          900: "var(--pine-900)",
        },
        resin: {
          100: "var(--resin-100)",
          300: "var(--resin-300)",
          400: "var(--resin-400)",
          500: "var(--resin-500)",
          600: "var(--resin-600)",
          700: "var(--resin-700)",
        },
        clay: {
          100: "var(--clay-100)",
          300: "var(--clay-300)",
          500: "var(--clay-500)",
          600: "var(--clay-600)",
          700: "var(--clay-700)",
        },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.625rem",
        "3xl": "2.25rem",
      },
      boxShadow: {
        lift: "var(--shadow-lift)",
        warm: "0 18px 40px -12px rgba(13, 36, 25, 0.28), 0 4px 12px -6px rgba(15, 30, 23, 0.12)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
