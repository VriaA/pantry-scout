const { keyframes } = require("@emotion/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.tsx", "./src/app/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "orange-primary": "#ff4207",
        "yellow-primary": "#f9cd55",
      },
      fontFamily: {
        melodrama: "Melodrama-Variable",
        manrope: [
          "Manrope",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "cta-primary":
          "linear-gradient( 100deg, #ff4207 0%, #fda315 60%, #f9cd55, #f9cd55)",
      },
      animation: {
        "cta-gradient": ".1s gradient-animation ease forwards",
      },
      keyframes: {
        "gradient-animation": {
          "0%": {
            backgroundImage:
              "linear-gradient( 100deg, #ff4207 0%, #fda315 60%, #f9cd55, #f9cd55)",
          },
          "50%": {
            backgroundImage:
              "linear-gradient( 100deg, #f9cd55 0, #fda315 60%, #ff4207, #f9cd55)",
          },
          "100%": {
            backgroundImage:
              "linear-gradient( 100deg, #f9cd55 0%, #f9cd55 60%, #fda315, #ff4207)",
          },
        },
      },
    },
  },
  plugins: [],
};
