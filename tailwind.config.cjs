/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Lato: ["Lato", "sans-serif"]
      },
      colors: {
        primary: '#0A3964',
        secondary: '#E1F1FF',
        gray: '#F2F2F2'
      }
    },
  },
  plugins: [],
}
