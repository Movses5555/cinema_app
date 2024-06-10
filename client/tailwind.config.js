/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

 
module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx}",
    "./pages/**/*.{js,ts,jsx}",
    "./components/**/*.{js,ts,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        primary: "#ABE581",
        secondary: "#8CDAE5",
        gray: "#F2F2F5",
        "black-smoke": "#2B2B2B",
        "black-main": "#1f1f1f",
        "gray-light": "#464646",
        "gray-jo": "#D9D9D9",
        "gray-bold": "#6E767D",
        transparent: "transparent",
      },
      borderRadius: {
        "1/2": "50%",
      },
    },
    minWidth: {
      0: "0",
      full: "100%",
      34: "8.5rem",
      36: "9rem",
      39: "9.75rem",
      42: "10.5rem",
      46: "11.5rem",
      49: "12.25rem",
      51: "13.75rem",
      56: "14rem",
      64: "16rem",
      75: "18.75rem",
      84: "21rem",
      98: "24.5rem",
      fit: "fit-content",
    },
    minHeight: {
      0: "0",
      "4/5": "80%",
      full: "100%",
      screen: "100vh",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      26: "6.5rem",
      27: "7rem",
      48: "12rem",
      54: "14rem",
      76: "19rem",
      70: "18rem",
      100: "25rem",
      140: "35rem",
      178: "45rem",
    },
    maxWidth: {
      xsm: "13rem",
      xs: "20rem",
      xsl: "22.5rem",
      xmd: "25rem",
      sm: "30rem",
      lsm: "35rem",
      lmd: "37.5rem",
      md: "40rem",
      lg: "50rem",
      xlg: "59rem",
      xl: "60rem",
      "2xl": "70rem",
      "3xl": "80rem",
      "4xl": "90rem",
      "5xl": "100rem",
      "6xl": "120rem",
      "7xl": "140rem",
      full: "100%",
    },
    maxHeight: {
      0: "0px",
      full: "100%",
      screen: "100vh",
      content: 'calc(100vh - 64px)',
      14: "3.5rem",
      48: "12rem",
      64: "34rem",
    },
    fontFamily: {
      sans: ['"Open Sans"', "sans-serif"],
    },
  },
  plugins: [],
});