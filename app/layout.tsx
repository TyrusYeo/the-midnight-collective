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
  openGraph: {
    title: 'The Midnight Collective',
    description: 'A space for creatives and artists to explore their craft and play.',
    url: 'https://themidnightcollective.org', // use your actual website URL
    images: [
      {
        url: 'https://themidnightcollective.org/og-image.gif', // absolute URL to your image
        width: 1200,
        height: 630,
        alt: 'The Midnight Collective',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Midnight Collective',
    description: 'A space for creatives and artists to explore their craft and play.',
    images: ['https://themidnightcollective.org/og-image.gif'], // absolute URL to your Twitter image
  },
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
