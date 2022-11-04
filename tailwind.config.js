/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradienthero:
          "linear-gradient(180deg, rgb(30,215,96) 0%, rgba(17,24,39,1) 0%, rgba(17,24,39,1) 30%, rgb(30,215,96) 200%);",
        gradientpage:
          "linear-gradient(200deg, rgba(17,24,39,1) 20%, rgb(30,215,96) 200%);",
      },
    },
  },
  plugins: [],
};
