"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ExportGlobe3D = dynamic(() => import("@/components/3d/ExportGlobe3D"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-[var(--color-accent)] animate-pulse">Loading Globe...</div>
});

const strengths = [
    "Premium Quality Products",
    "Competitive Pricing",
    "Timely Delivery",
    "Global Export Expertise",
    "Strong Supplier Network",
    "Customer Satisfaction Focus"
];

export default function Strength() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".strength-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
            });

            gsap.fromTo(".strength-item", 
                { opacity: 0, y: 30, x: 0 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    },
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    clearProps: "all"
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            id="strength"
            ref={containerRef}
            className="py-24 md:pt-16 md:pb-16 px-6 md:px-12 bg-rustic-section-1 text-gray-800 relative overflow-hidden"
        >
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[1400px] mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="flex flex-col gap-6">
                        <span className="strength-header flex items-center justify-center lg:justify-start gap-3 text-amber-700 font-bold tracking-widest text-lg font-display uppercase mb-4">
                            <span className="w-8 h-0.5 bg-amber-600 inline-block"></span> Why Blazze <span className="w-8 h-0.5 bg-amber-600 inline-block"></span>
                        </span>
                        <h2 className="strength-header text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight text-gray-900">
                            Our Strength lies in quality & trust.
                        </h2>
                        <p className="strength-header text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                            We take pride in our direct-from-source model, ensuring every batch meets international safety and purity standards. Our robust logistics network guarantees your products arrive fresh and on schedule.
                        </p>

                        <div className="strength-grid grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-8">
                            {strengths.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="strength-item group flex items-center gap-4 p-5 md:p-6 rounded-sm bg-[#3D2B1F] border border-[#5C3D2A] hover:bg-[#4A3728] transition-all duration-300"
                                >
                                    <div className="w-12 h-12 shrink-0 rounded-full bg-gray-200/10 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-amber-900 shadow-sm transition-all duration-500">
                                        <CheckCircle2 size={24} strokeWidth={2} />
                                    </div>
                                    <span className="font-display font-medium text-lg tracking-wide text-[#F5E6D3] group-hover:text-white transition-colors duration-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="strength-globe-container relative h-[500px] md:h-[600px] bg-gray-50 rounded-sm overflow-hidden border border-gray-100 shadow-inner">
                        <ExportGlobe3D height="100%" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
