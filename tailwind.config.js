/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        pryClr: "var(--pryClr)",
        secClr: "var(--secClr)",
        compClr: "var(--compClr)",
        tetClr: "var(--tetClr)",
      }
    },
  },
  plugins: [],
}