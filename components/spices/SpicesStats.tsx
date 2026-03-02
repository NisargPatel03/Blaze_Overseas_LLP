"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!inView || !nodeRef.current) return;

        const node = nodeRef.current;
        let startTime: number;
        let animationFrame: number;

        const cubicEaseOut = (t: number) => 1 - Math.pow(1 - t, 3);

        const updateCounter = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                const currentVal = Math.floor(from + (to - from) * cubicEaseOut(progress));
                node.textContent = currentVal.toString();
                animationFrame = requestAnimationFrame(updateCounter);
            } else {
                node.textContent = to.toString();
            }
        };

        animationFrame = requestAnimationFrame(updateCounter);

        return () => cancelAnimationFrame(animationFrame);
    }, [from, to, duration, inView]);

    return <span ref={nodeRef}>{from}</span>;
}

export default function SpicesStats() {
    const stats = [
        { label: "Export Countries", value: 45, plus: true },
        { label: "Spice Varieties", value: 200, plus: true },
        { label: "Years of Excellence", value: 36, plus: false },
        { label: "Global Clients", value: 1200, plus: true },
        { label: "Organic", value: 100, plus: true, suffix: "%" }
    ];

    return (
        <section className="w-full bg-dark relative overflow-hidden border-y border-white/10">
            {/* Subtle center glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <div className="w-[800px] h-[300px] bg-saffron/20 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-5 relative z-10">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className="group flex flex-col items-center justify-center py-16 px-6 border-r border-b md:border-b-0 border-white/5 last:border-r-0 hover:bg-saffron/5 transition-colors duration-500"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                        <div className="text-[48px] md:text-[58px] font-display text-saffron leading-none mb-4 group-hover:scale-110 transition-transform duration-500">
                            <Counter from={0} to={stat.value} duration={2} />
                            {stat.plus && <span>+</span>}
                            {stat.suffix && <span>{stat.suffix}</span>}
                        </div>
                        <span className="text-[11px] uppercase tracking-widest text-cream/45 text-center font-medium">
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
