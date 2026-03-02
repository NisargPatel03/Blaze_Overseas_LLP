"use client";

import { motion } from "framer-motion";
import TilesScene from "./TilesScene";

export default function TilesHero() {
    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-obsidian flex items-center">
            {/* 3D Canvas Background */}
            <TilesScene />

            {/* Overlay Grid lines for architectural feel */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(var(--color-stone) 1px, transparent 1px), linear-gradient(90deg, var(--color-stone) 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />

            {/* Content overlay */}
            <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-[60px] flex justify-between items-end pb-24 h-full pointer-events-none">

                {/* Left Title */}
                <div className="max-w-[600px] pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-8 h-[1px] bg-gold" />
                        <span className="text-gold uppercase tracking-[0.2em] text-xs font-medium">Vol. 01 / Spatial Design</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-[60px] md:text-[80px] lg:text-[100px] leading-[0.9] text-ivory uppercase tracking-widest"
                    >
                        Define <br />
                        <span className="text-stone">Your Space</span>
                    </motion.h1>
                </div>

                {/* Right Descriptor */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
                    className="hidden md:flex flex-col items-end text-right max-w-[300px] pointer-events-auto"
                >
                    <p className="text-stone text-sm leading-relaxed mb-6">
                        Architectural ceramics and monumental slabs engineered for modern environments. Drag to explore surfaces.
                    </p>
                    <button className="text-xs uppercase tracking-widest text-gold border border-gold/30 px-6 py-3 hover:bg-gold hover:text-obsidian transition-colors duration-300">
                        View Collections
                    </button>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-12 left-6 md:left-[60px] z-20 flex flex-col gap-2 items-center"
            >
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gold"
                    />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone vertical-text" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
            </motion.div>
        </section>
    );
}
