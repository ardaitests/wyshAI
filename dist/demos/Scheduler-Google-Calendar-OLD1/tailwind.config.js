/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0ff',
          100: '#ede4ff',
          200: '#dccdff',
          300: '#c5a6ff',
          400: '#a974ff',
          500: '#8b3dff',
          600: '#7d16ff',
          700: '#6e00ff',
          800: '#5f00d6',
          900: '#4d00b0',
        },
        secondary: {
          50: '#f8f5ff',
          100: '#f0ebff',
          200: '#e0d6ff',
          300: '#c9b1ff',
          400: '#ad82ff',
          500: '#8b3dff',
          600: '#7d16ff',
          700: '#6e00ff',
          800: '#5f00d6',
          900: '#4d00b0',
        },
      }
    },
  },
  plugins: [],
}
