/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: "#a36de3"
        },
        secondary: {
          DEFAULT: "#C65BCF",
          100: "#F27BBD",
          200: "#874CCC",
        },
      },
    },
  },
  plugins: [],
}

