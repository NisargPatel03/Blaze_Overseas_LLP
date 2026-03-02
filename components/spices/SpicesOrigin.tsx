"use client";

import { motion } from "framer-motion";

export default function SpicesOrigin() {
    return (
        <section className="w-full bg-dark py-[100px] px-6 md:px-[60px] overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">

                {/* Left Text */}
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-saffron uppercase font-medium tracking-[0.2em] text-sm mb-4 block">
                            Farm to Table
                        </span>

                        <h2 className="font-display text-[44px] md:text-[52px] leading-[1.1] text-white mb-8">
                            Sourced from the <br />
                            <span className="italic font-normal text-saffron">Heart of India</span>
                        </h2>

                        <div className="text-cream/60 text-[15px] leading-relaxed space-y-6 max-w-[500px] mb-12">
                            <p>
                                True flavor cannot be manufactured; it must be cultivated. We bypass the complex commodity broker networks to source our spices directly from family-owned organic farms situated in specific geographical indications (GIs).
                            </p>
                            <p>
                                By establishing direct trade relationships, we ensure fair wages for our farmers while securing the most vibrant, aromatic, and therapeutic harvests available on the subcontinent.
                            </p>
                        </div>

                        {/* Mini Stats Grid */}
                        <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
                            <div>
                                <h4 className="font-display text-[32px] text-saffron leading-none mb-2">500+</h4>
                                <span className="uppercase text-[10px] tracking-widest text-cream/80">Partner Farms</span>
                            </div>
                            <div>
                                <h4 className="font-display text-[32px] text-saffron leading-none mb-2">12</h4>
                                <span className="uppercase text-[10px] tracking-widest text-cream/80">Indian States</span>
                            </div>
                            <div>
                                <h4 className="font-display text-[32px] text-saffron leading-none mb-2">45+</h4>
                                <span className="uppercase text-[10px] tracking-widest text-cream/80">Countries</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Visual */}
                <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full aspect-[4/5] overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
                            alt="Spices Harvesting"
                            className="w-full h-full object-cover rounded-sm brightness-90 saturate-110"
                        />
                    </motion.div>

                    {/* Overlapping Square Accent */}
                    <motion.div
                        initial={{ opacity: 0, x: -30, y: 30 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-[220px] h-[220px] border-[12px] border-dark overflow-hidden rounded-sm hidden sm:block"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400"
                            alt="Sifting Spices"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Saffron Quality Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.6 }}
                        className="absolute -top-6 -right-6 w-24 h-24 bg-saffron rounded-full flex flex-col items-center justify-center shadow-2xl z-10"
                    >
                        <span className="font-display text-white text-3xl leading-none">A+</span>
                        <span className="text-white/80 uppercase tracking-widest text-[9px] mt-1 text-center leading-tight">Quality<br />Grade</span>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
