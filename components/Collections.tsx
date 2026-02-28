"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MoveRight } from "lucide-react";

const collections = [
    {
        id: 1,
        title: "The Onyx Series",
        category: "Ceramic Slabs",
        img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: 2,
        title: "Travertine Collection",
        category: "Natural Stone",
        img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: 3,
        title: "Terrazzo Noir",
        category: "Bespoke Tiles",
        img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: 4,
        title: "Calacatta Gold",
        category: "Premium Marble",
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200",
    },
];

export default function Collections() {
    const containerRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const sections = gsap.utils.toArray(".collection-item");

            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    start: "top top",
                    end: () => "+=" + scrollRef.current?.offsetWidth,
                },
            });

            // Simple fade in for headers
            gsap.from(".collection-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 20,
                opacity: 0,
                duration: 1,
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="collections"
            ref={containerRef}
            className="relative overflow-hidden bg-[var(--background)] py-20"
            style={{ height: "100vh" }} // Required for pinning
        >
            <div className="absolute top-10 md:top-20 left-6 md:left-12 z-10 w-full max-w-5xl">
                <span className="collection-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                    Featured
                </span>
                <h2 className="collection-header text-5xl md:text-7xl font-display font-medium max-w-2xl">
                    Discover our premier collections.
                </h2>
            </div>

            <div
                ref={scrollRef}
                className="flex w-[400vw] h-full items-center pl-6 md:pl-12 pt-32"
            >
                {collections.map((item, i) => (
                    <div
                        key={item.id}
                        className="collection-item w-screen h-[60vh] md:h-[70vh] flex-shrink-0 flex items-center pr-6 md:pr-12"
                    >
                        <div className="group relative w-full h-full md:w-[70vw] lg:w-[60vw] overflow-hidden rounded-sm cursor-none">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                            <div className="absolute bottom-10 left-10 text-white overflow-hidden">
                                <p className="text-sm uppercase tracking-widest mb-2 opacity-80 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    {item.category}
                                </p>
                                <h3 className="text-4xl md:text-5xl font-display font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {item.title}
                                </h3>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none">
                                <span className="text-xs uppercase tracking-widest mr-1">View</span>
                                <MoveRight size={16} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
