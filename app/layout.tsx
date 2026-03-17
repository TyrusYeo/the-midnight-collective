import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Midnight Collective",
  description: "A third-space creative community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
