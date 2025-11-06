/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary color: rgb(255, 0, 166) = #FF00A6
        primary: '#FF00A6',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'IRANSansX', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

