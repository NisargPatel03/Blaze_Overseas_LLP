"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const SPICE_ITEMS = [
    { name: "Turmeric" },
    { name: "Kashmir Saffron" },
    { name: "Black Pepper" },
    { name: "Cardamom" },
    { name: "Red Chili" },
    { name: "Cumin" },
    { name: "Coriander" },
    { name: "Cinnamon" },
    { name: "Fenugreek" },
    { name: "Garam Masala" }
];

export default function SpiceTicker() {
    // Duplicate the array to ensure a seamless infinite loop
    const duplicatedItems = [...SPICE_ITEMS, ...SPICE_ITEMS];

    return (
        <section className="w-full bg-dark py-3 overflow-hidden border-y border-white/5">
            <div className="flex whitespace-nowrap overflow-hidden">
                <motion.div
                    className="flex items-center gap-8 min-w-max pr-8"
                    animate={{ x: [0, "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 35, // Adjust speed
                        ease: "linear",
                    }}
                >
                    {duplicatedItems.map((item, idx) => {
                        const isAlternate = idx % 2 === 0;
                        return (
                            <div key={idx} className="flex items-center gap-8">
                                <div className="w-1.5 h-1.5 rounded-full bg-saffron flex-shrink-0" />
                                <span className={`text-[13px] md:text-[15px] uppercase tracking-widest font-medium ${isAlternate ? 'text-saffron' : 'text-cream/50'}`}>
                                    {item.name}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
