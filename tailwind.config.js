/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-green": "#DAEAEA",
        "mid-green": "#C9E1E0",
        "dark-green": "#12706D",
        "white-wt": "#FFFFFF ",
      },
    },
  },
  plugins: [],
};
