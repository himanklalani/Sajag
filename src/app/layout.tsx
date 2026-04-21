import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

// Load fonts via next/font — zero render-block, automatic self-hosting
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sajag Infrastructure | Real Estate Advisor",
  description:
    "Advisor for Real Estate Buyers. Helping buyers to grow better together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${cormorantGaramond.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
