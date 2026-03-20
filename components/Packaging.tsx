"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PackageOpen, Truck, ShieldCheck } from "lucide-react";

export default function Packaging() {
    const containerRef = useRef<HTMLElement>(null);

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

            gsap.from(".pack-card", {
                scrollTrigger: {
                    trigger: ".pack-grid",
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="packaging"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-rustic-section-2"
        >
            <div className="max-w-[1400px] mx-auto text-center mb-16 relative">
                <span className="pack-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                    Reliability & Transit
                </span>
                <h2 className="pack-header text-4xl md:text-5xl lg:text-6xl font-display font-medium max-w-4xl mx-auto text-balance mb-8 text-gray-900">
                    Packaging & Delivery
                </h2>
                <p className="pack-header text-lg md:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
                    We offer durable and export-grade packaging designed to maintain freshness and quality during transit. Customized packaging solutions are available to meet specific client requirements. With our efficient logistics network, we ensure safe and timely delivery across global markets. At Blazze, reliability in delivery is as important as product quality.
                </p>
            </div>

            <div className="pack-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                 <div className="pack-card bg-white p-10 rounded-sm border border-gray-200 flex flex-col items-center text-center group transition-all hover:border-[var(--color-accent)] hover:shadow-lg">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <PackageOpen className="text-[var(--color-accent)]" size={30} />
                    </div>
                    <h3 className="text-2xl font-display font-medium mb-4 text-gray-900">Export Grade Packaging</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Bulk and retail packaging designed to withstand long ocean transits and protect against moisture and contamination.
                    </p>
                </div>

                <div className="pack-card bg-white p-10 rounded-sm border border-gray-200 flex flex-col items-center text-center group transition-all hover:border-[var(--color-accent)] hover:shadow-lg">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Truck className="text-[var(--color-accent)]" size={30} />
                    </div>
                    <h3 className="text-2xl font-display font-medium mb-4 text-gray-900">Timely Delivery</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Strong logistics partnerships ensure vessels are booked accurately and goods reach their destination on schedule.
                    </p>
                </div>

                <div className="pack-card bg-white p-10 rounded-sm border border-gray-200 flex flex-col items-center text-center group transition-all hover:border-[var(--color-accent)] hover:shadow-lg">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <ShieldCheck className="text-[var(--color-accent)]" size={30} />
                    </div>
                    <h3 className="text-2xl font-display font-medium mb-4 text-gray-900">Custom Solutions</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Private labeling and specialized packing sizes supported to meet diverse buyer requirements globally.
                    </p>
                </div>
            </div>
        </section>
    );
}
