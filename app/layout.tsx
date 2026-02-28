import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blaze Overseas LLP | Premium Tiles & Interiors",
  description: "Crafting Timeless Spaces. Multi-purpose premium ceramic, tiles, and interior solutions.",
  keywords: ["tiles", "interior", "ceramics", "Blaze Overseas LLP", "premium tiles"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans bg-[var(--background)] text-[var(--foreground)] antialiased min-h-screen selection:bg-[var(--color-accent)] selection:text-white">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
