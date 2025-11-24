/** @type {import('tailwindcss').Config} */
const BLACK = "#000"
const WHITE = "#ffffff"
const BORDERCOLOR = "#D5DDE0"
const YELLOW = "#FFE000"
const GREY = "#636363"
const BLACKGREY = "#323C46"
const LIGHTGREY  = "#f5f5f5"
const GREYWHITE = "#F5F5F5"
const RED  = "#FF5252"
const MAINCOLOR = "#003ae9"
const GREEN = "#15CF74"
const DARKGREEN = "#177256"
const DARKBLUE = "#082a4d"
const ORANGE = "#323C46"
const PURPLE = "#9C27B0"
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss,sass}",
    "./styles/*.{css,scss,sass}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

