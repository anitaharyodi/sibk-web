const {nextui} = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: "Roboto",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1140px",
    },
    extend: {
      colors: {
        primary: "#2F2D51",
        secondary: "#96B615"
      },
    },
  },
  plugins: [nextui()],
}