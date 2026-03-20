"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export default function SpicesHero() {
    const [particles, setParticles] = useState<Array<{ id: number, x: number, size: number, color: string, duration: number, delay: number }>>([]);

    useEffect(() => {
        // Generate 30 random floating particles
        const colors = ['bg-saffron', 'bg-turmeric', 'bg-crimson'];
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage vw
            size: Math.random() * 6 + 2, // 2px to 8px
            color: colors[Math.floor(Math.random() * colors.length)],
            duration: Math.random() * 15 + 10, // 10s to 25s
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    // Scroll reveal variants
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: (customDelay: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: customDelay, duration: 0.8, ease: "easeOut" }
        })
    };

    return (
        <section className="relative w-full min-h-[700px] h-screen overflow-hidden bg-white">
            {/* Background Gradients - Lightened for light theme */}
            <div className="absolute inset-0 bg-[#FDFBF9]" />
            <div className="absolute inset-0 opacity-10 mix-blend-multiply"
                style={{ background: 'radial-gradient(circle at 80% 50%, var(--color-saffron) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 opacity-10 mix-blend-multiply"
                style={{ background: 'radial-gradient(circle at 20% 90%, var(--color-crimson) 0%, transparent 50%)' }} />

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className={`absolute bottom-[-10%] rounded-full opacity-40 ${p.color}`}
                        style={{ left: `${p.x}%`, width: p.size, height: p.size }}
                        animate={{
                            y: ['0vh', '-120vh'], // float up
                            opacity: [0, 0.4, 0.4, 0] // fade in and out
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* LEFT CONTENT */}
            <div className="relative z-20 h-full max-w-[700px] px-6 md:px-[60px] flex flex-col justify-center">
                <motion.h1
                    custom={0.5}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="font-display text-[70px] md:text-[90px] lg:text-[110px] leading-[0.95] font-light text-gray-900 tracking-tight mb-8"
                >
                    Nature's <br />
                    <span className="text-saffron italic font-normal">Finest</span> <br />
                    Spices
                </motion.h1>

                <motion.p
                    custom={0.7}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="text-gray-600 text-base font-light max-w-[420px] leading-relaxed mb-12"
                >
                    Harvested from the most fertile organic farms across India. We bring centuries of authentic flavor and uncompromised purity to modern culinary experiences.
                </motion.p>

                <motion.div
                    custom={0.9}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button className="group relative overflow-hidden bg-saffron text-white px-8 py-4 text-sm uppercase tracking-widest font-bold transition-all shadow-lg shadow-saffron/20 active:scale-[0.98]">
                        <span className="relative z-10">Explore Products</span>
                        <div className="absolute inset-0 bg-[#7c2d12] -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </button>
                    <button className="px-8 py-4 border border-saffron text-saffron text-sm uppercase tracking-widest font-bold hover:bg-saffron hover:text-white transition-all duration-300 shadow-sm">
                        Our Story
                    </button>
                </motion.div>
            </div>

            {/* RIGHT VISUAL */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block pointer-events-none"
                style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
            >
                <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200"
                    alt="Spices"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
            </motion.div>

            {/* SCROLL INDICATOR */}
            <div className="absolute bottom-12 left-6 md:left-[60px] flex items-center gap-4 z-20">
                <div className="w-[60px] h-[1px] bg-gray-200 relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-saffron"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                </div>
                <span className="text-[11px] uppercase tracking-[0.15em] text-gray-400">Scroll to explore</span>
            </div>

            {/* ROTATING BADGE */}
            <div className="absolute bottom-12 right-12 z-30 hidden md:flex items-center justify-center w-[120px] h-[120px] rounded-full bg-saffron text-white shadow-2xl shadow-saffron/30 border border-white/20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute inset-2 border border-white/30 rounded-full border-dashed"
                />
                <div className="text-center">
                    <span className="block font-display text-3xl italic leading-none font-bold">100%</span>
                    <span className="block text-[8px] uppercase tracking-widest mt-1 font-bold opacity-100">Organic<br />Certified</span>
                </div>
            </div>
        </section>
    );
}
