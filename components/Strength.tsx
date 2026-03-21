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
            className="py-24 md:pt-16 md:pb-16 px-6 md:px-12 bg-rustic-section-1 text-gray-800 relative overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
                {/* Left Side: Text and Grid */}
                <div className="w-full lg:w-1/2 relative z-10">
                    <div className="mb-12">
                        <span className="strength-header flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest text-lg font-display uppercase mb-4">
                            <span className="w-8 h-0.5 bg-amber-600 inline-block"></span> Our Strength <span className="w-8 h-0.5 bg-amber-600 inline-block"></span>
                        </span>
                        <h2 className="strength-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance mb-6 text-gray-900">
                            Why Blazze
                        </h2>
                        <p className="strength-header text-gray-600 max-w-xl text-lg leading-relaxed mb-6">
                            Our core strength is our ability to supply high-quality rice and spices with precision and reliability. With efficient logistics and strong supplier partnerships, we meet global demand seamlessly. We focus on maintaining international standards and customer satisfaction at every step.
                        </p>
                    </div>

                    <div className="strength-grid grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-8">
                        {strengths.map((item, idx) => (
                            <div
                                key={idx}
                                className="strength-item group flex items-center gap-4 p-5 md:p-6 rounded-sm bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-md hover:border-[var(--color-accent)] transition-all duration-300"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-full bg-gray-200/50 flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-white shadow-sm transition-all duration-500">
                                    <CheckCircle2 size={24} strokeWidth={2} />
                                </div>
                                <span className="font-display font-medium text-lg tracking-wide text-gray-800 group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                            </div>
                        ))}
                    </div>
                    
                    <h3 className="strength-header text-3xl font-serif font-semibold text-[#B8860B] tracking-wide border-b border-[#B8860B]/30 pb-2 inline-block">Blazze – Taste of Purity</h3>
                </div>

                {/* Right Side: 3D Globe */}
                <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative z-0">
                    {/* Background removed to match wrapper */}

                    <ExportGlobe3D height="100%" />
                </div>
            </div>
        </section>
    );
}
