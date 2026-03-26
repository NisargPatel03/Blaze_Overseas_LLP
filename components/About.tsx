"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
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
            className="py-24 md:pt-32 md:pb-16 px-6 md:px-12 bg-rustic-section-1 text-gray-800"
        >
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[1400px] mx-auto about-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
                {/* Left Text Content */}
                <div className="flex flex-col gap-6">
                    <span className="about-text flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest text-lg font-display uppercase mb-4">
                        <span className="w-8 h-0.5 bg-amber-600 inline-block"></span> Our Story <span className="w-8 h-0.5 bg-amber-600 inline-block"></span>
                    </span>
                    <h2 className="about-text text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight text-balance text-gray-900">
                        A legacy of delivering authentic taste and world-class standards.
                    </h2>
                    <p className="about-text text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light mb-8 md:mb-12">
                        Blazze is an emerging global exporter of high-quality rice and spices, known for purity and consistency. We source directly from the best regions and ensure strict quality control at every step. Our goal is to deliver authentic taste with world-class standards. With Blazze, you experience quality you can trust.
                    </p>
                </div>

                {/* Right Image/Parallax with 3D Depth */}
                <div
                    className="about-image-wrapper relative h-[600px] rounded-sm overflow-hidden bg-gray-100 perspective-1000 shadow-2xl"
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
                            src="/Photos/HOMESCREEN IMAGE.webp"
                            alt="Blazze Overseas Legacy"
                            className="about-image absolute top-[-10%] w-full h-[120%] object-cover object-center translate-z-[50px] transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-white/5 mix-blend-overlay translate-z-[100px]"></div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
