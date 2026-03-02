import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
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
    <html lang="en" className={`${cormorant.variable} ${dmsans.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans bg-[var(--background)] text-[var(--foreground)] antialiased min-h-screen selection:bg-[var(--color-accent)] selection:text-white cursor-none">
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
