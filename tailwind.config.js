/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "567px", //@emdia screen (min-width: 567px)
      },
    },
  },
  plugins: [],
};
