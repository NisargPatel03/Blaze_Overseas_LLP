"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TilesContact() {
    return (
        <section className="w-full bg-white text-gray-900 py-[120px] px-6 md:px-[60px] relative overflow-hidden">
            {/* Background geometric accents - lightened */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-100/50 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center relative z-10">

                {/* Left Typography */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-gray-900 uppercase tracking-[0.2em] text-xs font-medium mb-6 block">
                            Advisory & Consultation
                        </span>

                        <h2 className="font-display text-[44px] md:text-[60px] leading-[1.05] uppercase tracking-wide mb-8">
                            Envision<br />
                            <span className="italic text-[#B8860B] font-normal lowercase">The</span> Infinite
                        </h2>

                        <p className="text-gray-600 text-[15px] leading-relaxed max-w-[480px] mb-12">
                            Our architectural specifications team is prepared to assist with your next monumental project. From technical data on porcelain slabs to customized cutting and shipping logistics across the globe.
                        </p>
                    </motion.div>
                </div>

                {/* Right Action Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-gray-900 text-white p-10 md:p-16 rounded-sm shadow-2xl relative group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <h3 className="font-display text-3xl mb-4 relative z-10">Request a Spec Book</h3>
                    <p className="text-gray-300 text-[13px] mb-8 relative z-10">
                        Receive physical surface samples and comprehensive technical binders for your design library.
                    </p>

                    <form className="flex flex-col gap-4 relative z-10">
                        <input
                            type="email"
                            placeholder="Enter your work email..."
                            className="bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-[#B8860B] transition-colors placeholder:text-gray-500"
                        />
                        <button
                            type="button"
                            className="group/btn flex items-center justify-between bg-[#B8860B] text-gray-900 uppercase tracking-widest text-xs font-bold py-4 px-6 mt-4 hover:bg-white transition-colors duration-300"
                        >
                            Submit Request
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
