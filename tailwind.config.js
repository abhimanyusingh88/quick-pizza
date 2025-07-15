/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // here we are configuring the fonr of tailwind css
    fontFamily:{
    sans:"Roboto Mono,monospace",
    },
    extend: {},
  },
  plugins: [],
}

