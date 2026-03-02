"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TilesParallaxLayout() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms for the images
    const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
    const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <section
            ref={containerRef}
            className="w-full bg-obsidian py-[120px] px-6 md:px-[60px] overflow-hidden border-t border-white/5"
        >
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">

                {/* Visual Set Area */}
                <div className="md:col-span-7 flex flex-col md:flex-row gap-6 h-[600px] md:h-[800px] relative">

                    {/* Primary Image (Left, Tall) */}
                    <div className="w-full md:w-2/3 h-full overflow-hidden rounded-sm relative group bg-charcoal">
                        <motion.img
                            style={{ y: y1, scale: scale1 }}
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                            alt="Luxury modern interior"
                            className="absolute inset-[-10%] w-[120%] h-[120%] object-cover opacity-80"
                        />
                        {/* Overlay vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 text-ivory/50 uppercase tracking-[0.2em] text-xs font-display italic">
                            Spatial Volume
                        </div>
                    </div>

                    {/* Secondary Image (Right, Floating Parallax) */}
                    <motion.div
                        style={{ y: y2 }}
                        className="hidden md:block absolute right-0 top-1/4 w-[280px] h-[400px] overflow-hidden rounded-sm shadow-2xl bg-charcoal z-10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1558000143-a60d26850bb6?auto=format&fit=crop&q=80&w=800"
                            alt="Marble texture close up"
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 border border-white/10" />
                    </motion.div>

                </div>

                {/* Content Area */}
                <div className="md:col-span-4 md:col-start-9 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-gold uppercase tracking-[0.2em] font-medium text-xs mb-4 block">
                            Beyond Dimensions
                        </span>

                        <h3 className="font-display text-[32px] md:text-[44px] text-ivory leading-[1.1] mb-8">
                            Continuity<br />
                            <span className="italic text-stone font-normal">& Boundaries</span>
                        </h3>

                        <div className="space-y-6 text-stone text-[14px] leading-relaxed mb-12">
                            <p>
                                The true luxury of modern architecture lies in the perception of unrestricted volume. Our monumental slab collections are engineered to blur the lines between interior living areas and exterior landscapes.
                            </p>
                            <p>
                                By minimizing visual interruptions and grout lines, we create unified horizontal and vertical planes that expand the spatial experience, offering a canvas where light and shadow can interact freely.
                            </p>
                        </div>

                        <div className="border border-white/10 p-6 bg-charcoal/20">
                            <div className="text-[10px] uppercase tracking-widest text-gold mb-2">Technical Specification</div>
                            <div className="flex justify-between items-center text-ivory text-sm">
                                <span>Max Format</span>
                                <span className="font-display italic">160x320 cm</span>
                            </div>
                            <div className="w-full h-[1px] bg-white/5 my-3" />
                            <div className="flex justify-between items-center text-ivory text-sm">
                                <span>Thickness profiles</span>
                                <span className="font-display italic">6mm, 12mm, 20mm</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
