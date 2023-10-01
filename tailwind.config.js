/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#118c4f",
        bgColor: "#ffffff",
        bgContrast:"#f9f9f9",
        text1: "#000",
        text2: "#fff",
      },
    },

    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },

    screens: {
      xxs: "320px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}