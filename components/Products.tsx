"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MoveRight, Sprout, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
    {
        id: "spices",
        title: "Premium Spices",
        subtitle: "Global Export Quality",
        desc: "We source and process the finest spices, delivering authentic flavors and aromas to markets worldwide. Our rigorous quality control ensures purity, potent aroma, and consistency in every batch.",
        features: ["Cumin Seeds", "Coriander Seeds", "Turmeric Finger & Powder", "Cardamom", "Black Pepper", "Chilli Powder"],
        icon: Sprout,
        img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: "tiles",
        title: "Ceramic & Porcelain Tiles",
        subtitle: "Architectural Excellence",
        desc: "State-of-the-art manufacturing brings you premium tiles designed for modern architectural needs. From sprawling commercial spaces to intimate residential interiors, we provide unparalleled aesthetic and durability.",
        features: ["Vitrified Tiles", "Wall Tiles", "Floor Tiles", "Outdoor Paving", "Large Format Slabs", "Mosaic Patterns"],
        icon: Layers,
        img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200",
    }
];

export default function Products() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeProduct, setActiveProduct] = useState(products[0].id);

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

            gsap.from(".product-feature-item", {
                scrollTrigger: {
                    trigger: ".products-grid",
                    start: "top 75%",
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="products"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-neutral-50 dark:bg-[#0a0a0a]"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="max-w-2xl">
                        <span className="products-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                            Our Portfolio
                        </span>
                        <h2 className="products-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance">
                            Dual expertise in authentic flavours and premium surfaces.
                        </h2>
                    </div>
                </div>

                <div className="products-grid flex flex-col gap-16 lg:gap-24">
                    {products.map((product, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div key={product.id} className={cn("flex flex-col gap-10 items-center", isEven ? "lg:flex-row" : "lg:flex-row-reverse")}>
                                {/* Image side */}
                                <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-sm h-[400px] md:h-[600px]">
                                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
                                    <img
                                        src={product.img}
                                        alt={product.title}
                                        className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    {/* Icon Badge */}
                                    <div className="absolute top-6 left-6 z-20 w-16 h-16 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-accent)] shadow-xl">
                                        <product.icon size={28} />
                                    </div>
                                </div>

                                {/* Content side */}
                                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                    <div className="mb-6">
                                        <span className="text-sm font-medium uppercase tracking-widest text-foreground/50 block mb-2">
                                            {product.subtitle}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-display font-medium text-balance">
                                            {product.title}
                                        </h3>
                                    </div>
                                    <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-lg">
                                        {product.desc}
                                    </p>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10">
                                        {product.features.map((feature, i) => (
                                            <div key={i} className="product-feature-item flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                                                <span className="text-foreground/80 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="flex items-center gap-3 w-max px-6 py-3 border border-foreground/20 rounded-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 group">
                                        <span className="text-sm font-bold uppercase tracking-widest">Explore {product.title.split(' ')[1]}</span>
                                        <MoveRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
