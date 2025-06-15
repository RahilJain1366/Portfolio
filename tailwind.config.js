// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./rahiljain.github.io/**/*.{js,jsx,ts,tsx}",
    "./test.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',     // Indigo-600
        accent: '#10B981',      // Emerald-500
        dark: '#1E293B',        // Slate-800
      },
    },
  },
  plugins: [],
};