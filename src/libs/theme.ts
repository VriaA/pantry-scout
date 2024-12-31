"use client";

import { createTheme } from "@mui/material";
import MelodramaTtf from "../../public/Melodrama-Variable.ttf";
import MelodramaWoff2 from "../../public/Melodrama-Variable.woff2";
import MelodramaWoff from "../../public/Melodrama-Variable.woff";
import { Manrope } from "next/font/google";
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const themeOverride = createTheme({
  typography: {
    fontFamily: `${manrope.style.fontFamily}, system-ui, apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif`,
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
      }`,
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
