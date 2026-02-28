"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import useMeasure from "react-use-measure";
import { Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        text: "Blaze Overseas completely transformed our hotel lobby. The ceramic slabs are breathtaking and incredibly durable.",
        author: "Elena Rossi",
        role: "Architect, Milan",
    },
    {
        id: 2,
        text: "Their attention to detail and premium material selection elevated our flagship store beyond our wildest expectations.",
        author: "James Chen",
        role: "Creative Director, NYC",
    },
    {
        id: 3,
        text: "A seamless synthesis of art and architecture. Working with their bespoke surfaces team was a designer's dream.",
        author: "Sarah Al-Fayed",
        role: "Interior Designer, Dubai",
    },
    {
        id: 4,
        text: "Unparalleled quality. The textures and finishes provided by Blaze set a new standard in high-end residential projects.",
        author: "Marcus Thorne",
        role: "Developer, London",
    },
];

export default function Testimonials() {
    const [ref, { width }] = useMeasure();
    const xTranslation = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let controls: any;
        const finalPosition = -width / 2 - 16; // Account for gap

        if (!isHovered && width > 0) {
            controls = animate(xTranslation, [0, finalPosition], {
                ease: "linear",
                duration: 25,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
            });
        }

        return () => {
            if (controls) controls.stop();
        };
    }, [xTranslation, width, isHovered]);

    return (
        <section className="py-24 md:py-32 bg-neutral-100 dark:bg-[#111] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
                <span className="text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                    Client Voices
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-medium text-balance">
                    Trusted by visionaries worldwide.
                </h2>
            </div>

            <div className="relative">
                {/* Gradients for fade effect on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-100 dark:from-[#111] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-100 dark:from-[#111] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-8 px-8 cursor-grab active:cursor-grabbing"
                    ref={ref}
                    style={{ x: xTranslation }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    drag="x"
                    dragConstraints={{ left: -width / 2, right: 0 }}
                >
                    {/* Double the array for infinite loop effect */}
                    {[...testimonials, ...testimonials].map((item, idx) => (
                        <div
                            key={`${item.id}-${idx}`}
                            className="flex-shrink-0 w-[85vw] md:w-[500px] bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-sm border border-black/5 dark:border-white/5"
                        >
                            <Quote className="text-[var(--color-accent)]/20 mb-6" size={48} />
                            <p className="text-xl md:text-2xl font-display font-medium leading-relaxed mb-10 text-balance">
                                "{item.text}"
                            </p>
                            <div>
                                <p className="font-medium uppercase tracking-widest text-sm">
                                    {item.author}
                                </p>
                                <p className="text-foreground/50 text-sm mt-1">{item.role}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
