import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "vxs": "380px",
        "xs": "480px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1200px",
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          navy: "#0a1e3f",
          navyDark: "#061329",
          navyLight: "#162d59",
          sky: "#0284c7",
          skyLight: "#38bdf8",
          skyTint: "#0ea5e9",
          ice: "#f0f7ff",
          sand: "#e2e8f0",
          ash: "#64748b",
          ink: "#0a1e3f",
          paper: "#ffffff",
          carbon: "#000000",
          linen: "#f0f7ff",
          citrus: "#e0f2fe",
          mint: "#dcfce7",
          coral: "#ef4444",
          cobalt: "#0284c7",
          emerald: "#10b981",
          orange: "#0284c7",
          orangeTint: "#0ea5e9",
        },
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
        success: {
          DEFAULT: "#34c771",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f59e0b",
          foreground: "#360802",
        },
        info: {
          DEFAULT: "#477ee9",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        'nav': '84px',
        'cards': '16px',
        'links': '8px',
        'pills': '9999px',
        'inputs': '16px',
        'buttons': '12px',
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      boxShadow: {
        'lift': 'rgba(0, 0, 0, 0.05) 0px -4px 16px 0px',
        'brand': 'rgba(247, 59, 32, 0.15) 0px 8px 24px 0px, rgba(247, 59, 32, 0.08) 0px 2px 8px 0px',
        'soft': '0 4px 20px -2px rgba(54, 8, 2, 0.05)',
        '3d': '0 12px 30px -6px rgba(54, 8, 2, 0.14), 0 4px 12px rgba(54, 8, 2, 0.06), 0 1px 3px rgba(54, 8, 2, 0.04)',
        '3d-lift': '0 20px 40px -10px rgba(54, 8, 2, 0.18), 0 8px 16px -4px rgba(54, 8, 2, 0.1)',
        '3d-orange': '0 14px 34px -4px rgba(247, 59, 32, 0.35), 0 4px 14px rgba(247, 59, 32, 0.2)',
        'glass-3d': '0 12px 40px 0 rgba(0, 0, 0, 0.22), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)',
        'emboss': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.08)',
      },
      letterSpacing: {
        'display': '0.01em',
        'nav': '0.03em',
        'ui': '0.03em',
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
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(8px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.88", transform: "scale(1.02)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(247, 59, 32, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(247, 59, 32, 0.45)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "float-reverse": "float-reverse 6s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
