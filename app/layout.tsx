import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { Preloader } from "@/components/Preloader";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import InteractiveBackground from "@/components/InteractiveBackground";

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
  title: "Blazze Overseas LLP | Premium Spices, Grains & Pulses",
  description: "Experience the pinnacle of quality with Blazze Overseas LLP. We export a curated collection of premium spices, grains, and pulses globally.",
  keywords: ["spices", "grains", "pulses", "exporter", "Blazze Overseas LLP", "premium spices"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmsans.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans bg-[var(--background)] text-[var(--foreground)] antialiased min-h-screen selection:bg-[var(--color-accent)] selection:text-white">
        <Preloader />
        <WhatsAppButton />
        <InteractiveBackground />
        <CustomCursor />
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
