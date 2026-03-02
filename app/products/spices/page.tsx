"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpicesPreloader } from "@/components/spices/SpicesPreloader";
import SpicesHero from "@/components/spices/SpicesHero";
import SpiceTicker from "@/components/spices/SpiceTicker";
import SpicesAbout from "@/components/spices/SpicesAbout";
import SpicesStats from "@/components/spices/SpicesStats";
import SpicesProducts from "@/components/spices/SpicesProducts";
import SpicesQuality from "@/components/spices/SpicesQuality";
import SpicesFeaturedBanner from "@/components/spices/SpicesFeaturedBanner";
import SpicesMarquee from "@/components/spices/SpicesMarquee";
import SpicesOrigin from "@/components/spices/SpicesOrigin";
import SpicesBlog from "@/components/spices/SpicesBlog";

export default function SpicesPage() {

    useEffect(() => {
        // Enforce the specific color suite overriding on this route
        document.documentElement.style.setProperty('--background', 'var(--color-cream)');
        document.documentElement.style.setProperty('--foreground', 'var(--color-dark)');
        document.documentElement.style.setProperty('--color-accent', 'var(--color-saffron)');

        return () => {
            // Cleanup on unmount
            document.documentElement.style.removeProperty('--background');
            document.documentElement.style.removeProperty('--foreground');
            document.documentElement.style.removeProperty('--color-accent');
        };
    }, []);

    return (
        <main className="w-full relative min-h-screen bg-cream selection:bg-saffron selection:text-white pb-32">
            <SpicesPreloader />
            <Navbar />

            <SpicesHero />
            <SpiceTicker />
            <SpicesAbout />
            <SpicesStats />
            <SpicesProducts />
            <SpicesQuality />
            <SpicesFeaturedBanner />
            <SpicesMarquee />
            <SpicesOrigin />
            <SpicesBlog />

            <Footer />
        </main>
    );
}
