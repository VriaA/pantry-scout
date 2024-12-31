import AppContextProvider from "@/contexts/AppContext";
import PantryContextProvider from "@/contexts/PantryContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { themeOverride } from "@/libs/theme";
import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Pantry Scout",
  description:
    "A pantry tracker that allows users to efficiently manage their pantry items. With this application, you can add items to your pantry, edit the quantity of existing items, and remove items from your pantry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <AppContextProvider>
          <PantryContextProvider>
            <ThemeProvider theme={themeOverride}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </PantryContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
