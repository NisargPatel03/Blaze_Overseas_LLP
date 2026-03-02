"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
    {
        id: "01",
        title: "Golden Turmeric",
        img: "https://images.unsplash.com/photo-1615486511484-92e172fc34ea?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "02",
        title: "Kashmiri Red Chili",
        img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "03",
        title: "Malabar Pepper",
        img: "https://images.unsplash.com/photo-1509428588079-6b5eaef0bb59?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "04",
        title: "Green Cardamom",
        img: "https://images.unsplash.com/photo-1610452330784-07d2c34d8520?auto=format&fit=crop&q=80&w=800",
    }
];

export default function SpicesProducts() {
    return (
        <section className="w-full bg-cream py-[100px] px-6 md:px-[60px]">
            <div className="max-w-[1400px] mx-auto">

                {/* Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-saffron uppercase font-medium tracking-widest text-sm">Our Products</span>
                            <div className="w-12 h-[1px] bg-saffron" />
                        </div>
                        <h2 className="font-display text-4xl md:text-[52px] leading-[1.1] text-dark">
                            Explore Our Spice Collection
                        </h2>
                    </div>
                    <a href="#" className="group inline-flex items-center gap-3 text-dark font-medium uppercase tracking-widest text-[13px] border-b border-dark/20 pb-1 hover:border-saffron transition-colors">
                        View All Products
                        <ArrowRight size={16} className="text-dark/40 group-hover:text-saffron group-hover:translate-x-1 transition-all" />
                    </a>
                </div>

                {/* 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.map((prod, idx) => (
                        <motion.div
                            key={prod.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-none"
                        >
                            <img
                                src={prod.img}
                                alt={prod.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08]"
                            />
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* Content Block */}
                            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-6 transition-transform duration-500 ease-out group-hover:translate-y-0">
                                <span className="text-saffron font-medium text-sm tracking-widest mb-3">
                                    {prod.id}
                                </span>
                                <h3 className="font-display text-[26px] text-white leading-tight mb-4 group-hover:text-saffron transition-colors duration-300">
                                    {prod.title}
                                </h3>

                                {/* View Link (fades in slightly on hover with dashed line) */}
                                <div className="flex items-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    <span className="text-[12px] uppercase tracking-widest text-white/80 font-medium">View Product</span>
                                    <div className="flex-1 border-b border-dashed border-white/30" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
