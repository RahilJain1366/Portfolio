// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./rahiljain.github.io/**/*.{js,jsx,ts,tsx}",
    "./test.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a', // dark blue
        secondary: '#f97316', // orange
        accent: '#fb923c',    // lighter orange
      },
      fontSize: {
        base: '18px', // default body text
        lg: '20px',
        xl: '24px',
        '2xl': '30px',
        '3xl': '36px',
      },
    },
  },
  plugins: [],
};