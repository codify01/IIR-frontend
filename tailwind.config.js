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
        'pry' : '#2F5318',
        'sec' : '#ffffff',
        'tet' : '#000000',
      }
    },
  },
  plugins: [],
}