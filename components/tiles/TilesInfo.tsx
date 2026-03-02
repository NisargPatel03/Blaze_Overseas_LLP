"use client";

import { motion } from "framer-motion";

export default function TilesInfo() {
    return (
        <section className="w-full bg-obsidian py-[120px] px-6 md:px-[60px] border-t border-white/5">
            <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 justify-center w-full mb-12"
                >
                    <div className="w-24 h-[1px] bg-stone/50" />
                    <span className="text-stone uppercase text-xs tracking-[0.2em]">Crafting Timelessness</span>
                    <div className="w-24 h-[1px] bg-stone/50" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-display text-[32px] md:text-[50px] leading-[1.2] text-ivory max-w-[900px] uppercase font-light tracking-wide mb-12"
                >
                    We engineer surfaces that transform raw space into <span className="text-gold italic">living architecture</span>. Our porcelain and ceramic collections bridge the gap between structural integrity and visionary design.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full mt-16 pt-16 border-t border-white/5"
                >
                    <div className="flex items-start gap-4">
                        <span className="text-gold font-display text-3xl shrink-0">01</span>
                        <div>
                            <h4 className="text-sm uppercase tracking-widest text-ivory mb-2 font-medium">Ultra-Compact Formulation</h4>
                            <p className="text-stone text-[13px] leading-relaxed">Sintered particles pressed at 24,000 tons create a completely non-porous structure resistant to scratching, freezing, and UV rays.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="text-gold font-display text-3xl shrink-0">02</span>
                        <div>
                            <h4 className="text-sm uppercase tracking-widest text-ivory mb-2 font-medium">Monumental Formats</h4>
                            <p className="text-stone text-[13px] leading-relaxed">Available in seamless slabs up to 160x320cm, minimizing grout lines and maximizing continuous visual impact for monolithic structures.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="text-gold font-display text-3xl shrink-0">03</span>
                        <div>
                            <h4 className="text-sm uppercase tracking-widest text-ivory mb-2 font-medium">Biophilic Textures</h4>
                            <p className="text-stone text-[13px] leading-relaxed">High-definition 3D glazing replicates the haptic feedback of natural stone, wood grain, and raw concrete with perfect precision.</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
