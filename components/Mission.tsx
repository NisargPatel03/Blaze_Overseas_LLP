"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Target, Earth, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Mission() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".mission-title", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
            });

            gsap.from(".mission-card", {
                scrollTrigger: {
                    trigger: ".mission-grid",
                    start: "top 75%",
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all"
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="mission"
            ref={containerRef}
            className="py-24 md:pt-16 md:pb-16 bg-rustic-section-2"
        >
            <div className="max-w-[1400px] mx-auto text-center mb-8 px-6 md:px-12">
                <span className="mission-title flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest text-lg font-display uppercase mb-4">
                    <span className="w-8 h-0.5 bg-amber-600 inline-block"></span> Our Purpose <span className="w-8 h-0.5 bg-amber-600 inline-block"></span>
                </span>
                <h2 className="mission-title text-4xl md:text-5xl font-display font-medium max-w-3xl mx-auto text-balance text-gray-900">
                    Driven by quality, inspired by innovation, dedicated to excellence.
                </h2>
            </div>

            <div className="w-full bg-[#F9F5EE] border-t border-b border-amber-100 py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mission-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* CARD 1 — OUR MISSION */}
                        <div className="mission-card bg-white rounded-2xl p-8 shadow-md border-l-4 border-amber-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                            <div className="mb-6">
                                <Target className="text-amber-600 w-10 h-10" />
                            </div>
                            <span className="text-sm font-bold text-amber-400 tracking-widest">01</span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Our Mission</h3>
                            <div className="w-12 h-1 bg-amber-600 rounded mb-4"></div>
                            <p className="text-gray-600 leading-relaxed">
                                To deliver unparalleled quality in every product we export, consistently exceeding global standards and forging long-term partnerships built on trust and reliability.
                            </p>
                        </div>

                        {/* CARD 2 — OUR VISION */}
                        <div className="mission-card bg-white rounded-2xl p-8 shadow-md border-l-4 border-amber-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                            <div className="mb-6">
                                <Earth className="text-amber-600 w-10 h-10" />
                            </div>
                            <span className="text-sm font-bold text-amber-400 tracking-widest">02</span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Our Vision</h3>
                            <div className="w-12 h-1 bg-amber-600 rounded mb-4"></div>
                            <p className="text-gray-600 leading-relaxed">
                                To be the world's most trusted name in premium exports, setting industry benchmarks for sustainability, ethical sourcing, and uncompromising quality control.
                            </p>
                        </div>

                        {/* CARD 3 — OUR VALUES */}
                        <div className="mission-card bg-white rounded-2xl p-8 shadow-md border-l-4 border-amber-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                            <div className="mb-6">
                                <Star className="text-amber-600 w-10 h-10" />
                            </div>
                            <span className="text-sm font-bold text-amber-400 tracking-widest">03</span>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Our Values</h3>
                            <div className="w-12 h-1 bg-amber-600 rounded mb-4"></div>
                            <p className="text-gray-600 leading-relaxed">
                                Integrity in our dealings, transparency in our processes, passion for perfection, and a deep-rooted commitment to the communities and environments we operate within.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[1200px] mx-auto mt-12 px-6 md:px-12"
            >
                <div className="bg-gradient-to-r from-amber-700 to-amber-500 rounded-2xl py-16 px-8 text-center shadow-lg hover:shadow-amber-500/20 transition-shadow">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Trusted by Buyers Worldwide
                    </h3>
                    <p className="text-amber-50 text-lg md:text-xl mb-8 font-medium">
                        From farm to port — we handle everything with precision.
                    </p>
                    <a href="#contact" className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-10 py-5 rounded-xl hover:bg-amber-50 shadow-xl transition-all hover:scale-105 hover:shadow-white/20 duration-300 active:scale-[0.98]">
                        Start Exporting With Us <ArrowRight size={22} />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
