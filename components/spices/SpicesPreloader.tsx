"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function SpicesPreloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark text-cream"
                >
                    <h1 className="font-display text-4xl md:text-6xl text-saffron tracking-wide italic font-light mb-8">
                        Blaze Overseas
                    </h1>

                    <div className="w-48 md:w-64 h-[2px] bg-white/10 overflow-hidden relative">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                            className="absolute top-0 left-0 h-full bg-saffron"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
