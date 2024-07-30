import AppContextProvider from "@/contexts/AppContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry Scout",
  description: "A pantry tracker that allows users to efficiently manage their pantry items. With this application, you can add items to your pantry, edit the quantity of existing items, and remove items from your pantry.",
  viewport: "initial-scale=1, width=device-width"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
