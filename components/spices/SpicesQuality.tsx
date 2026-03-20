"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const ACCORDION_ITEMS = [
    {
        title: "Cold Grinding Technology",
        content: "Traditional grinding methods generate heat that destroys up to 40% of volatile essential oils. Our proprietary cold-grinding process operates at sub-zero temperatures, locking in the natural aroma, vibrant color, and therapeutic properties of every spice.",
    },
    {
        title: "100% Traceable Sourcing",
        content: "Every batch of Zafran Spice comes with a blockchain-verified origin stamp. We bypass the complex broker networks to source directly from family-owned organic farms in specific geographical indications (GIs), ensuring fair wages and unparalleled freshness.",
    },
    {
        title: "Zero Adulteration Guarantee",
        content: "Each harvest undergoes rigorous 360-degree lab testing for pesticides, heavy metals, artificial colors, and bulking agents. If it isn't 100% pure spice, it doesn't get packaged. We provide transparency certificates upon request for all wholesale orders.",
    },
    {
        title: "Aroma-Lock Packaging",
        content: "Spices degrade when exposed to oxygen and UV light. Our packaging utilizes multi-layered, nitrogen-flushed pouches encased in light-proof tins to preserve the harvest-day freshness for up to 24 months, preventing oxidation of the delicate oils.",
    }
];

export default function SpicesQuality() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section className="w-full bg-white py-[100px] px-6 md:px-[60px]">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

                {/* Left: Sticky Image Col */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-32 w-full aspect-[4/5] rounded-sm overflow-hidden bg-gray-100">
                        <img
                            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
                            alt="Quality testing of spices"
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-saffron/5 mix-blend-multiply" />

                        {/* Overlay Badge */}
                        <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm p-6 border border-saffron/20 max-w-[200px] shadow-xl">
                            <h4 className="font-display text-2xl text-gray-900 leading-tight mb-2">
                                Uncompromised Standard
                            </h4>
                            <p className="text-[11px] uppercase tracking-widest text-saffron font-medium">
                                Beyond Organic
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Accordion Col */}
                <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
                    <div className="mb-12">
                        <span className="text-saffron uppercase font-medium tracking-widest text-sm inline-block mb-4">
                            The Zafran Difference
                        </span>
                        <h2 className="font-display text-4xl md:text-[52px] leading-[1.1] text-gray-900">
                            Why Top Chefs <br />
                            <span className="italic font-normal text-saffron">Choose Us</span>
                        </h2>
                    </div>

                    <div className="border-t border-gray-100">
                        {ACCORDION_ITEMS.map((item, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div key={idx} className="border-b border-gray-100">
                                    <button
                                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between py-6 group text-left"
                                    >
                                        <h3 className={`font-display text-2xl md:text-[28px] transition-colors duration-300 ${isOpen ? 'text-saffron' : 'text-gray-900 group-hover:text-saffron'}`}>
                                            {item.title}
                                        </h3>
                                        <span className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors duration-300 ${isOpen ? 'bg-saffron text-white border-saffron shadow-lg shadow-amber-100' : 'border-gray-200 text-gray-400 group-hover:border-saffron group-hover:text-saffron'}`}>
                                            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                        </span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <p className="pb-8 pr-12 text-gray-600 leading-relaxed text-[15px]">
                                                    {item.content}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
