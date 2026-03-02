"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TilesPreloader } from "@/components/tiles/TilesPreloader";
import TilesHero from "@/components/tiles/TilesHero";
import TilesInfo from "@/components/tiles/TilesInfo";
import TilesCollections from "@/components/tiles/TilesCollections";
import TilesParallaxLayout from "@/components/tiles/TilesParallaxLayout";
import TilesContact from "@/components/tiles/TilesContact";

export default function TilesPage() {

    useEffect(() => {
        // Enforce the specific color suite overriding on this route for Tiles palette
        document.documentElement.style.setProperty('--background', 'var(--color-obsidian)');
        document.documentElement.style.setProperty('--foreground', 'var(--color-ivory)');
        document.documentElement.style.setProperty('--color-accent', 'var(--color-stone)');

        return () => {
            // Cleanup on unmount
            document.documentElement.style.removeProperty('--background');
            document.documentElement.style.removeProperty('--foreground');
            document.documentElement.style.removeProperty('--color-accent');
        };
    }, []);

    return (
        <main className="w-full relative min-h-screen bg-obsidian text-ivory selection:bg-stone selection:text-obsidian pb-32">
            <TilesPreloader />
            <Navbar />

            <TilesHero />
            <TilesInfo />
            <TilesCollections />
            <TilesParallaxLayout />
            <TilesContact />

            <Footer />
        </main>
    );
}
