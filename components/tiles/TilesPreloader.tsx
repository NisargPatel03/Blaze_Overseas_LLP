"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

export function TilesPreloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    // Stagger block variants for the architectural load wipe
    const containerVariants: Variants = {
        exit: {
            transition: {
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        }
    };

    const blockVariants: Variants = {
        exit: {
            scaleY: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    exit="exit"
                    className="fixed inset-0 z-[100] flex w-full h-full text-gray-900"
                >
                    {/* Architectural Wiping Blocks - White for light theme */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                            key={i}
                            variants={blockVariants}
                            className="h-full flex-1 bg-white origin-top shadow-sm"
                        />
                    ))}

                    {/* Logo/Text Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <span className="font-sans text-[12px] uppercase tracking-[0.3em] text-gray-400 mb-4">
                                Blazze Overseas
                            </span>
                            <h1 className="font-display text-4xl md:text-6xl tracking-widest uppercase text-gray-900">
                                Spaces redefined
                            </h1>
                            <div className="w-[1px] h-16 bg-gradient-to-b from-gray-300 to-transparent mt-8" />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
