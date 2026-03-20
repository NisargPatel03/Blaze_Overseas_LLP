"use client";

import { motion } from "framer-motion";

const SPICES = [
    "Turmeric", "Saffron", "Cardamom", "Black Pepper",
    "Cinnamon", "Red Chili", "Cumin", "Garam Masala"
];

export default function SpicesMarquee() {
    return (
        <section className="w-full bg-gray-50 py-12 border-y border-gray-100 overflow-hidden">
            <div className="relative flex whitespace-nowrap">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // slow crawl
                    }}
                    className="flex items-center"
                >
                    {[...SPICES, ...SPICES, ...SPICES, ...SPICES].map((spice, idx) => (
                        <div key={idx} className="flex items-center">
                            <span className="font-display italic text-[36px] font-light text-gray-900/10 mx-8">
                                {spice}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-saffron/40 mx-4" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
