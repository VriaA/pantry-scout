"use client";

import { createTheme } from "@mui/material";
import MelodramaTtf from "../../public/Melodrama-Variable.ttf";
import MelodramaWoff2 from "../../public/Melodrama-Variable.woff2";
import MelodramaWoff from "../../public/Melodrama-Variable.woff";
import ManropeTtf500 from "../../public/manrope-v15-latin-500.ttf";
import ManropeWoff2500 from "../../public/manrope-v15-latin-500.woff2";
import ManropeTtf600 from "../../public/manrope-v15-latin-600.ttf";
import ManropeWoff2600 from "../../public/manrope-v15-latin-600.woff2";
import ManropeTtf700 from "../../public/manrope-v15-latin-700.ttf";
import ManropeWoff2700 from "../../public/manrope-v15-latin-700.woff2";
import ManropeTtf from "../../public/manrope-v15-latin-regular.ttf";
import ManropeWoff2 from "../../public/manrope-v15-latin-regular.woff2";

export const themeOverride = createTheme({
  typography: {
    fontFamily:
      "Manrope, system-ui, apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
      font-family: "Melodrama-Variable";
      src: url(${MelodramaWoff2}) format("woff2"),
        url(${MelodramaWoff}) format("woff"),
        url(${MelodramaTtf}) format("truetype");
      font-weight: 300 700;
      font-display: swap;
      font-style: normal;
      }
        @font-face {
          font-display: swap;
          font-family: "Manrope";
          font-style: normal;
          font-weight: 400;
          src: url(${ManropeWoff2}) format('woff2'),
               url(${ManropeTtf}) format("truetype");
        }
        
        @font-face {
          font-display: swap;
          font-family: "Manrope";
          font-style: normal;
          font-weight: 500;
          src: url(${ManropeWoff2500}) format('woff2'),
               url(${ManropeTtf500}) format("truetype");
        }
        
        @font-face {
          font-display: swap;
          font-family: "Manrope";
          font-style: normal;
          font-weight: 600;
          src: url(${ManropeWoff2600}) format('woff2'),
               url(${ManropeTtf600}) format("truetype");
        }
        
        @font-face {
          font-display: swap;
          font-family: "Manrope";
          font-style: normal;
          font-weight: 700;
          src: url(${ManropeWoff2700}) format('woff2'),
               url(${ManropeTtf700}) format("truetype");
        }
      `,
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  palette: {
    primary: {
      main: "#ff4207",
    },
    secondary: {
      main: "#f9cd55",
    },
    info: {
      main: "#18181b",
    },
  },
});
