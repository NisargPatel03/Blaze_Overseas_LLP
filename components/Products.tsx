"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/data";

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
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="products"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-rustic-section-2"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="max-w-2xl">
                        <span className="products-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                            Our Products
                        </span>
                        <h2 className="products-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance text-[#F0E8DE]">
                            Premium agricultural exports sourced directly from origin.
                        </h2>
                    </div>
                </div>

                <div className="products-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {categories.map((category) => (
                        <Link 
                            href={`/products/${category.slug}`} 
                            key={category.slug}
                            className="product-card group relative overflow-hidden rounded-sm h-[400px] md:h-[500px] block"
                        >
                            <div className="absolute inset-0 bg-black/40 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:bg-black/60" />
                            <img
                                src={category.img}
                                alt={category.name}
                                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                            />
                            
                            {/* Content overlay */}
                            <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end text-white">
                                <span className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm mb-2">
                                    {category.tagline}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-display font-medium mb-3">
                                    {category.name}
                               </h3>
                                <p className="text-white/80 line-clamp-2 max-w-md mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {category.desc}
                                </p>

                                <div className="flex items-center gap-2 uppercase tracking-widest text-sm font-bold text-[var(--color-accent)] group-hover:text-white transition-colors">
                                    Explore <MoveRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
