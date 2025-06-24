/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
      typography: {
        DEFAULT: {
          css: {
            h1: {
              lineHeight: '1.625', /* equivalent to leading-relaxed */
            },
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'swiss-coffee-lightest': "hsl(var(--swiss-coffee-lightest))",
        'swiss-coffee-lighter': "hsl(var(--swiss-coffee-lighter))",
        'swiss-coffee-light': "hsl(var(--swiss-coffee-light))",
        'swiss-coffee-medium': "hsl(var(--swiss-coffee-medium))",
        'swiss-coffee-dark': "hsl(var(--swiss-coffee-dark))",
        'swiss-coffee-darker': "hsl(var(--swiss-coffee-darker))",
        'muted-foreground-darker': "hsl(var(--muted-foreground-darker))",
        'foreground-darker': "hsl(var(--foreground-darker))",
        'white': "hsl(var(--swiss-coffee-lightest))",  /* Override white with Swiss Coffee Lightest */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          lightest: "hsl(var(--primary-lightest))",
          lighter: "hsl(var(--primary-lighter))",
          light: "hsl(var(--primary-light))",
          medium: "hsl(var(--primary-medium))",
          dark: "hsl(var(--primary-dark))",
          darker: "hsl(var(--primary-darker))",
          darkest: "hsl(var(--primary-darkest))",
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
        footer: {
          background: "hsl(var(--footer-background))",
          foreground: "hsl(var(--footer-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "gradient": {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient": "gradient 15s ease infinite",
      },
      backgroundSize: {
        '200%': '200%',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* For Firefox */
          'scrollbar-width': 'none',
          /* For IE and Edge */
          '-ms-overflow-style': 'none',
          /* For WebKit (Chrome, Safari) */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
}