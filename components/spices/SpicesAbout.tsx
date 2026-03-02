"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SpicesAbout() {
    return (
        <section className="w-full min-h-[560px] grid grid-cols-1 md:grid-cols-2 bg-cream overflow-hidden">
            {/* LEFT: Visual */}
            <div className="relative h-[400px] md:h-auto overflow-hidden group">
                <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full h-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200"
                        alt="Spice farm harvesting"
                        className="w-full h-full object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-105"
                    />
                </motion.div>
                {/* Gradient fade to cream */}
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream to-transparent md:block hidden" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent md:hidden block" />
            </div>

            {/* RIGHT: Content */}
            <div className="flex flex-col justify-center px-8 py-16 md:p-[80px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 mb-6"
                >
                    <div className="w-12 h-[1px] bg-saffron" />
                    <span className="text-saffron uppercase font-medium tracking-widest text-sm">Who We Are</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-display text-4xl md:text-[52px] leading-[1.1] text-dark mb-8"
                >
                    Rooted in <span className="italic text-saffron font-normal">Tradition</span>,<br />
                    Driven by Purity
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-6 text-mid text-[15px] leading-relaxed max-w-[480px]"
                >
                    <p>
                        For over three decades, Zafran Spice Co. has forged direct relationships with independent farmers across the Indian subcontinent. By removing intermediaries, we ensure that the very best of each harvest reaches you in its purest form.
                    </p>
                    <p>
                        From the golden turmeric fields of Erode to the elevated saffron valleys of Kashmir, our sourcing philosophy relies on sustainability, fair trade, and an unyielding commitment to volatile oil retention.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12"
                >
                    <a href="#" className="group inline-flex items-center gap-3 text-dark font-medium uppercase tracking-widest text-[13px] border-b border-dark/20 pb-1 hover:border-saffron transition-colors">
                        Discover Our Story
                        <ArrowRight size={16} className="text-dark/40 group-hover:text-saffron group-hover:translate-x-1 transition-all" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
