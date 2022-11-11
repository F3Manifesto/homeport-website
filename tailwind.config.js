/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lBlue: "#3C84F0",
        blueTheme: "#81A8F8",
        purpleTheme: "#CFB0FA",
        orangeTheme: "#FA6400",
        yellowTheme: "#FBDB86",
        lGray: "#E7F2FB"
      },
      fontFamily: {
        animosaEB: "Animosa Extra Bold",
        animosaR: "Animosa Regular",
        animosaL: "Animosa Light",
        animosaEL: "Animosa Extra Light",
        awkward: "Awkward",
        economica: "Economica Regular",
        economicaB: "Economica Bold",
        libR: "Liberation Mono Regular",
        libB: "Liberation Mono Bold"
      },
    },
  },
  plugins: [],
};
