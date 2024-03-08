/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "8rem",
        lg: "10rem",
      },
    },
  },
  plugins: [],
};
