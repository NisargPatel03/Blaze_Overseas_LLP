"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/data";
import { motion } from "framer-motion";

export default function Products() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".products-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
            });

            gsap.from(".product-card", {
                scrollTrigger: {
                    trigger: ".products-grid",
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                clearProps: "all"
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="products"
            ref={containerRef}
            className="py-24 md:pt-16 md:pb-16 px-6 md:px-12 bg-rustic-section-2"
        >
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[1400px] mx-auto"
            >
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <span className="products-header flex items-center justify-center md:justify-start gap-3 text-amber-700 font-bold tracking-widest text-lg font-display uppercase mb-4">
                            <span className="w-8 h-0.5 bg-amber-600 inline-block"></span> Our Products <span className="w-8 h-0.5 bg-amber-600 inline-block"></span>
                        </span>
                        <h2 className="products-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance text-gray-900">
                            Premium agricultural exports sourced directly from origin.
                        </h2>
                    </div>
                </div>

                <div className="products-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {categories.map((category) => (
                        <Link 
                            href={`/products/${category.slug}`} 
                            key={category.slug}
                            className="product-card group relative overflow-hidden rounded-sm min-h-[320px] md:min-h-[380px] h-[420px] md:h-[520px] block border border-gray-100 bg-white"
                        >
                            <img
                                src={category.img}
                                alt={category.name}
                                className="w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-110"
                                style={{ filter: 'brightness(1.1) saturate(1.15)' }}
                            />
                            
                            {/* Gradient overlay — clear at top, dark at bottom for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent group-hover:from-black/55 group-hover:via-black/10 transition-all duration-500 z-10" />
                            
                            {/* Content overlay */}
                            <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
                                <span className="text-amber-400 font-bold uppercase tracking-[0.2em] text-xs mb-3 animate-in fade-in slide-in-from-bottom duration-500">
                                    {category.tagline}
                                </span>
                                <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white leading-tight">
                                    {category.name}
                                </h3>
                                <p className="text-gray-200 line-clamp-2 max-w-md mb-8 text-[15px] leading-relaxed group-hover:text-white transition-colors">
                                    {category.desc}
                                </p>

                                <div className="flex items-center gap-3 uppercase tracking-widest text-[12px] font-bold text-amber-400 group-hover:gap-5 transition-all duration-300">
                                    Explore Collection <MoveRight size={20} className="group-hover:scale-110" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
