/** @type {import('tailwindcss').Config} */
const pxToRem = (px, base = 16) => `${px / base}rem`;
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
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
        error: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
      width: {
        "body-l": pxToRem(1440),
        "body-inner-l": pxToRem(1140),
      },
      fontSize: {
        "logo-l": pxToRem(64),
        "logo-s": pxToRem(20),
      },
      fontFamily: {
        logo: ["Black Ops One"],
        defaultEn: ["Bakbak One"],
      },
      spacing: {
        ...Array(5, 10, 20, 25, 50, 80, 100, 150, 200, 450, 750).reduce((acc, px) => {
          acc[`${px}pxr`] = pxToRem(px);
          return acc;
        }, {}),
        // "10pxr": pxToRem(10),
        // "200pxr": pxToRem(200),
        // ...Array.from({ length: 300 }, (_, i) => i + 1).reduce((acc, px) => {
        //   acc[`${px}pxr`] = pxToRem(px);
        //   return acc;
        // }, {}),
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
