"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function About() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Fade up text on scroll
            gsap.from(".about-text", {
                scrollTrigger: {
                    trigger: ".about-container",
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            });

            // Number counter animation
            const counters = document.querySelectorAll(".counter-val");
            counters.forEach((counter) => {
                const target = parseInt(counter.getAttribute("data-target") || "0", 10);
                gsap.to(counter, {
                    scrollTrigger: {
                        trigger: ".about-stats",
                        start: "top 80%",
                    },
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out",
                });
            });

            // Parallax image
            gsap.to(".about-image", {
                scrollTrigger: {
                    trigger: ".about-container",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
                y: 50,
                ease: "none",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="about"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-rustic-section-1 text-gray-800"
        >
            <div className="max-w-[1400px] mx-auto about-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Text Content */}
                <div className="flex flex-col gap-6">
                    <span className="about-text text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm">
                        Our Story
                    </span>
                    <h2 className="about-text text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight text-balance text-gray-900">
                        A legacy of delivering authentic taste and world-class standards.
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light mb-8 md:mb-12">
                        Blazze is an emerging global exporter of high-quality rice and spices, known for purity and consistency. We source directly from the best regions and ensure strict quality control at every step. Our goal is to deliver authentic taste with world-class standards. With Blazze, you experience quality you can trust.
                    </p>

                    <div className="about-stats mt-8 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                        <div>
                            <p className="text-4xl md:text-5xl font-display text-[var(--color-accent)]">
                                <span className="counter-val" data-target="25">
                                    0
                                </span>
                                +
                            </p>
                            <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
                                Years Experience
                            </p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-display text-[var(--color-accent)]">
                                <span className="counter-val" data-target="150">
                                    0
                                </span>
                                +
                            </p>
                            <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
                                Global Projects
                            </p>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-display text-[var(--color-accent)]">
                                <span className="counter-val" data-target="40">
                                    0
                                </span>
                                +
                            </p>
                            <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
                                Design Awards
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Image/Parallax with 3D Depth */}
                <div
                    className="about-image-wrapper relative h-[600px] rounded-sm overflow-hidden bg-gray-100 perspective-1000"
                    style={{ transformStyle: "preserve-3d" }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = ((y - centerY) / centerY) * -5;
                        const rotateY = ((x - centerX) / centerX) * 5;

                        gsap.to(e.currentTarget.querySelector('.about-image-inner'), {
                            rotateX,
                            rotateY,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(e.currentTarget.querySelector('.about-image-inner'), {
                            rotateX: 0,
                            rotateY: 0,
                            duration: 1,
                            ease: "power3.out"
                        });
                    }}
                >
                    <div className="about-image-inner w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                        <img
                            src="/Photos/HOMESCREEN IMAGE.png"
                            alt="Blazze Overseas Legacy"
                            className="about-image absolute top-[-10%] w-full h-[120%] object-cover object-center translate-z-[50px]"
                        />
                        <div className="absolute inset-0 bg-white/5 mix-blend-overlay translate-z-[100px]"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
