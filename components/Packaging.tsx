"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Package, Truck, Settings } from "lucide-react";
import RequestSampleModal from "./RequestSampleModal";
import { motion } from "framer-motion";

export default function Packaging() {
    const containerRef = useRef<HTMLElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useGSAP(
        () => {
            gsap.from(".pack-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
            });

            gsap.from(".pack-card, .pack-banner", {
                scrollTrigger: {
                    trigger: ".pack-grid",
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                clearProps: "all"
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="packaging"
            ref={containerRef}
            className="py-24 md:pt-16 md:pb-16 px-6 md:px-12 bg-[#F9F5EE]"
        >
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[1400px] mx-auto"
            >
                <div className="text-center mb-12 relative">
                    <span className="pack-header flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest text-lg font-display uppercase mb-4">
                        <span className="w-8 h-0.5 bg-amber-600 inline-block"></span> Reliability & Transit <span className="w-8 h-0.5 bg-amber-600 inline-block"></span>
                    </span>
                    <h2 className="pack-header text-4xl md:text-5xl lg:text-6xl font-display font-medium max-w-4xl mx-auto text-balance mb-8 text-gray-900">
                        Packaging & Delivery
                    </h2>
                    <p className="pack-header text-lg md:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
                        We offer durable and export-grade packaging designed to maintain freshness and quality during transit. Customized packaging solutions are available to meet specific client requirements. With our efficient logistics network, we ensure safe and timely delivery across global markets. At Blazze, reliability in delivery is as important as product quality.
                    </p>
                </div>

                <div className="pack-grid max-w-5xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* CARD 1 — Export Grade Packaging */}
                    <div className="pack-card bg-white rounded-2xl p-8 shadow-md border-t-4 border-amber-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left">
                        <div className="mb-6">
                            <Package className="text-[#B45309] w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Export Grade Packaging</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            Bulk and retail packaging designed to withstand long ocean transits and protect against moisture and contamination.
                        </p>
                    </div>

                    {/* CARD 2 — Timely Delivery */}
                    <div className="pack-card bg-white rounded-2xl p-8 shadow-md border-t-4 border-amber-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left">
                        <div className="mb-6">
                            <Truck className="text-[#B45309] w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Timely Delivery</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            Strong logistics partnerships ensure vessels are booked accurately and goods reach their destination on schedule.
                        </p>
                    </div>

                    {/* CARD 3 — Custom Solutions */}
                    <div className="pack-card bg-white rounded-2xl p-8 shadow-md border-t-4 border-amber-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left">
                        <div className="mb-6">
                            <Settings className="text-[#B45309] w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Solutions</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            Private labeling and specialized packing sizes supported to meet diverse buyer requirements globally.
                        </p>
                    </div>
                </div>

                {/* BOTTOM BANNER */}
                <div className="pack-banner max-w-5xl mx-auto mt-16 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-500 py-12 px-8 text-center shadow-lg hover:shadow-amber-500/20 transition-all">
                    <h3 className="text-white text-3xl font-bold mb-2">
                        Reliable Delivery Worldwide
                    </h3>
                    <p className="text-amber-100 text-base mb-6">
                        Every shipment packed with care, delivered on time.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#contact" className="w-full sm:w-auto inline-block bg-white text-amber-700 font-bold px-8 py-4 rounded-xl hover:bg-amber-50 transition shadow-lg active:scale-[0.98] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                            Request a Quote →
                        </a>
                        <button 
                            suppressHydrationWarning
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto inline-block bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition shadow-lg active:scale-[0.98] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            Request a Sample
                        </button>
                    </div>
                </div>
            </motion.div>
            
            <RequestSampleModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </section>
    );
}
