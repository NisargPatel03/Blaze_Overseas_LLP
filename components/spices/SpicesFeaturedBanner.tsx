"use client";

import { motion } from "framer-motion";

export default function SpicesFeaturedBanner() {
    return (
        <section className="w-full bg-cream py-[40px] px-6 md:px-[60px]">
            <div className="max-w-[1400px] mx-auto relative h-[480px] overflow-hidden rounded-sm group">
                {/* Background Image */}
                <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 8, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1600"
                        alt="Featured Spices"
                        className="w-full h-full object-cover brightness-[0.45] saturate-[1.3]"
                    />
                </motion.div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-center max-w-[600px] p-8 md:p-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-turmeric uppercase tracking-[0.2em] text-xs font-medium mb-4 block"
                    >
                        Featured Collection
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-display text-[40px] md:text-[56px] text-white leading-[1.05] mb-6"
                    >
                        The <span className="italic text-turmeric font-normal">Heritage</span> Range
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/80 text-[15px] leading-relaxed mb-10"
                    >
                        Experience the pinnacle of flavor with our signature heritage collection. Hand-harvested from ancient terroirs and processed using techniques passed down through generations.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button className="bg-saffron text-white px-8 py-4 uppercase tracking-widest text-xs font-medium hover:bg-crimson transition-colors duration-300">
                            Shop Saffron Range
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
