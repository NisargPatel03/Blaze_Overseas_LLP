"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Award, CheckCircle } from "lucide-react";

const certifications = [
    "ISO 9001:2015 Quality Management",
    "FSSAI Certified Products",
    "APEDA Registered Exporter",
    "Spice Board of India Certified"
];

export default function Certifications() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".cert-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
            });

            gsap.from(".cert-item", {
                scrollTrigger: {
                    trigger: ".cert-list",
                    start: "top 75%",
                },
                x: -30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="certifications"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-rustic-section-1"
        >
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
                <div className="w-full lg:w-1/2">
                    <span className="cert-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                        Quality Assurance
                    </span>
                    <h2 className="cert-header text-4xl md:text-5xl font-display font-medium mb-6 text-balance text-[#F0E8DE]">
                        Accreditations that speak for our standard.
                    </h2>
                    <p className="cert-header text-lg text-[#E8DDD4]/70 mb-10 text-balance leading-relaxed">
                        At Blazze, quality is our top priority. We follow strict international standards at every stage, from sourcing to final packaging. Our products undergo rigorous quality checks to ensure purity, hygiene, and consistency. We are committed to delivering only the finest quality that meets global expectations.
                    </p>

                    <div className="cert-list flex flex-col gap-5">
                        {certifications.map((cert, i) => (
                            <div key={i} className="cert-item flex items-center gap-4 p-4 rounded-sm bg-rustic-card border border-[#382415] shadow-sm">
                                <CheckCircle className="text-[var(--color-accent)]" size={24} />
                                <span className="font-medium text-lg text-[#F0E8DE]">{cert}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="w-full lg:w-1/2 relative h-[500px] rounded-sm overflow-hidden flex items-center justify-center bg-rustic-card border border-[#382415] perspective-1000"
                    style={{ transformStyle: "preserve-3d" }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;

                        gsap.to(e.currentTarget.querySelector('.cert-badge-inner'), {
                            rotateX: ((y - centerY) / centerY) * -10,
                            rotateY: ((x - centerX) / centerX) * 10,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(e.currentTarget.querySelector('.cert-badge-inner'), {
                            rotateX: 0,
                            rotateY: 0,
                            duration: 1,
                            ease: "power3.out"
                        });
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/10 to-transparent pointer-events-none" />
                    <Award size={200} strokeWidth={0.5} className="text-[var(--color-accent)]/20 absolute" />

                    <div
                        className="cert-badge-inner relative z-10 text-center bg-rustic-card p-12 rounded-full shadow-2xl border border-[#382415]"
                        style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
                    >
                        <Award size={80} className="text-[var(--color-accent)] mx-auto mb-6 drop-shadow-lg" />
                        <h3 className="text-3xl font-display font-bold text-[#F0E8DE]">100% Certified</h3>
                        <p className="text-[#E8DDD4]/60 uppercase tracking-widest text-sm mt-2">Export Quality</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
