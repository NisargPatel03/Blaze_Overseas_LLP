"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SpicesBlog() {
    const articles = [
        {
            date: "OCTOBER 12, 2025",
            title: "The Art of Blending Garam Masala: Regional Variations",
            desc: "Discover how the foundational spice mix changes entirely from the mountains of Kashmir to the backwaters of Kerala.",
            img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
        },
        {
            date: "SEPTEMBER 28, 2025",
            title: "Why Kashmir Saffron Commands a Premium Price",
            desc: "An inside look at the labor-intensive hand-harvesting process that makes this delicate flower stigmata more valuable than gold.",
            img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
        },
        {
            date: "SEPTEMBER 10, 2025",
            title: "Organic Certification: What It Really Means for Your Spices",
            desc: "Navigating the complex world of agricultural certifications and understanding why pesticide-free farming is crucial for essential oils.",
            img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <section className="w-full bg-white py-[100px] px-6 md:px-[60px]">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-saffron uppercase font-medium tracking-widest text-xs mb-4 block">Insights</span>
                        <h2 className="font-display text-4xl md:text-[52px] leading-tight text-gray-900">
                            From Our Journal
                        </h2>
                    </motion.div>

                    <motion.a
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        href="#"
                        className="group flex items-center gap-2 text-gray-900 font-medium uppercase tracking-widest text-xs hover:text-saffron transition-colors"
                    >
                        <span>All Articles</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: idx * 0.15 }}
                            className="group cursor-default"
                        >
                            {/* Image Container */}
                            <div className="w-full aspect-[3/2] overflow-hidden rounded-sm mb-6 bg-gray-100">
                                <img
                                    src={article.img}
                                    alt={article.title}
                                    className="w-full h-full object-cover saturate-50 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                />
                            </div>

                            <span className="text-saffron font-medium uppercase tracking-[0.2em] text-[10px] block mb-3">
                                {article.date}
                            </span>

                            <h3 className="font-display text-2xl text-gray-900 leading-tight mb-4 group-hover:text-saffron transition-colors">
                                {article.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                {article.desc}
                            </p>

                            <a href="#" className="inline-flex items-center gap-2 font-medium uppercase tracking-widest text-[11px] text-gray-900 border-b border-gray-200 pb-1 group-hover:border-saffron group-hover:text-saffron transition-colors">
                                Read Article
                                <ArrowRight size={12} className="-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </motion.article>
                    ))}
                </div>

            </div>
        </section>
    );
}
