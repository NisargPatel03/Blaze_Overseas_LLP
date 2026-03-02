"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Target, Lightbulb, Users } from "lucide-react";

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
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="mission"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-[#111]"
        >
            <div className="max-w-[1400px] mx-auto text-center mb-16">
                <span className="mission-title text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                    Our Purpose
                </span>
                <h2 className="mission-title text-4xl md:text-5xl font-display font-medium max-w-3xl mx-auto text-balance">
                    Driven by quality, inspired by innovation, dedicated to excellence.
                </h2>
            </div>

            <div className="mission-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                <div className="mission-card bg-neutral-50 dark:bg-[#1a1a1a] p-10 rounded-sm border border-black/5 dark:border-white/5 flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Target className="text-[var(--color-accent)]" size={30} />
                    </div>
                    <h3 className="text-2xl font-display font-medium mb-4">Our Mission</h3>
                    <p className="text-foreground/70 leading-relaxed">
                        To deliver unparalleled quality in every product we export, consistently exceeding global standards and forging long-term partnerships built on trust and reliability.
                    </p>
                </div>

                <div className="mission-card bg-neutral-50 dark:bg-[#1a1a1a] p-10 rounded-sm border border-black/5 dark:border-white/5 flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Lightbulb className="text-[var(--color-accent)]" size={30} />
                    </div>
                    <h3 className="text-2xl font-display font-medium mb-4">Our Vision</h3>
                    <p className="text-foreground/70 leading-relaxed">
                        To be the world's most trusted name in premium exports, setting industry benchmarks for sustainability, ethical sourcing, and uncompromising quality control.
                    </p>
                </div>

                <div className="mission-card bg-neutral-50 dark:bg-[#1a1a1a] p-10 rounded-sm border border-black/5 dark:border-white/5 flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Users className="text-[var(--color-accent)]" size={30} />
                    </div>
                    <h3 className="text-2xl font-display font-medium mb-4">Our Values</h3>
                    <p className="text-foreground/70 leading-relaxed">
                        Integrity in our dealings, transparency in our processes, passion for perfection, and a deep-rooted commitment to the communities and environments we operate within.
                    </p>
                </div>
            </div>
        </section>
    );
}
