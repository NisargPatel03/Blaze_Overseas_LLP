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
            className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-[#0a0a0a] text-foreground"
        >
            <div className="max-w-[1400px] mx-auto about-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Text Content */}
                <div className="flex flex-col gap-6">
                    <span className="about-text text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm">
                        Our Story
                    </span>
                    <h2 className="about-text text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight text-balance">
                        A legacy of crafting timeless, high-dimensional spaces.
                    </h2>
                    <p className="about-text text-lg text-foreground/70 text-balance leading-relaxed">
                        For over two decades, Blaze Overseas LLP has redefined interior
                        architecture. We merge premium materials with avant-garde design
                        philosophies to create spaces that evoke emotion, prestige, and
                        unparalleled luxury.
                    </p>

                    <div className="about-stats mt-8 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 border-t border-foreground/10">
                        <div>
                            <p className="text-4xl md:text-5xl font-display text-[var(--color-accent)]">
                                <span className="counter-val" data-target="25">
                                    0
                                </span>
                                +
                            </p>
                            <p className="text-sm uppercase tracking-widest text-foreground/60 mt-2">
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
                            <p className="text-sm uppercase tracking-widest text-foreground/60 mt-2">
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
                            <p className="text-sm uppercase tracking-widest text-foreground/60 mt-2">
                                Design Awards
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Image/Parallax */}
                <div className="relative h-[600px] rounded-sm overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    <img
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
                        alt="Interior design showcasing premium tiles"
                        className="about-image absolute top-[-10%] w-full h-[120%] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                </div>
            </div>
        </section>
    );
}
