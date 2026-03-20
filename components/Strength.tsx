"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckCircle2 } from "lucide-react";
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
            className="py-24 md:py-32 px-6 md:px-12 bg-rustic-section-1 text-white relative overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
                {/* Left Side: Text and Grid */}
                <div className="w-full lg:w-1/2 relative z-10">
                    <div className="mb-12">
                        <span className="strength-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                            Our Strength
                        </span>
                        <h2 className="strength-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance mb-6 text-[#F0E8DE]">
                            Why Blazze
                        </h2>
                        <p className="strength-header text-white/70 max-w-xl text-lg leading-relaxed mb-6">
                            Our core strength is our ability to supply high-quality rice and spices with precision and reliability. With efficient logistics and strong supplier partnerships, we meet global demand seamlessly. We focus on maintaining international standards and customer satisfaction at every step.
                        </p>
                    </div>

                    <div className="strength-grid grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-8">
                        {strengths.map((item, idx) => (
                            <div
                                key={idx}
                                className="strength-item group flex items-center gap-4 p-5 md:p-6 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--color-accent)] transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-full bg-black/20 flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-white shadow-sm transition-all duration-500">
                                    <CheckCircle2 size={24} strokeWidth={2} />
                                </div>
                                <span className="font-display font-medium text-lg tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">{item}</span>
                            </div>
                        ))}
                    </div>
                    
                    <h3 className="strength-header text-2xl font-display font-medium text-[var(--color-accent)]">Blazze – Taste of Purity</h3>
                </div>

                {/* Right Side: 3D Globe */}
                <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative z-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/20 to-transparent blur-3xl opacity-50 rounded-full mix-blend-screen pointer-events-none" />

                    <ExportGlobe3D height="100%" />
                </div>
            </div>
        </section>
    );
}
