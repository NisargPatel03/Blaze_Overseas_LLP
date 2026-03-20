"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const COLLECTIONS = [
    {
        id: "01",
        title: "Statuario Marble",
        category: "Polished Slabs",
        img: "https://images.unsplash.com/photo-1600607688960-e095b21021dd?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "02",
        title: "Obsidian Slate",
        category: "Matte Finishes",
        img: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "03",
        title: "Travertine Raw",
        category: "Textured Stone",
        img: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "04",
        title: "Onyx Verde",
        category: "Exotic Veins",
        img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800",
    }
];

export default function TilesCollections() {
    return (
        <section className="w-full bg-white py-[100px] px-6 md:px-[60px]">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-gray-500 uppercase text-xs tracking-widest font-medium mb-4">Select Offerings</span>
                    <h2 className="font-display text-4xl md:text-[52px] leading-[1.1] text-gray-900">
                        Signature <span className="text-gold italic">Collections</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
                    {COLLECTIONS.map((col, idx) => (
                        <TileCard key={col.id} collection={col} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Separate component for the 3D mouse tilt tracking
function TileCard({ collection, index }: { collection: any, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation based on cursor position (-15 to 15 degrees)
        const rY = ((mouseX / width) - 0.5) * 30;
        const rX = ((mouseY / height) - 0.5) * -30;

        setRotateX(rX);
        setRotateY(rY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
            style={{ perspective: 1000 }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX, rotateY }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-default bg-gray-100"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Image layer */}
                <img
                    src={collection.img}
                    alt={collection.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.05]"
                    style={{ transform: "translateZ(-50px)" }} // Push back slightly
                />

                {/* Improved Gradient Overlay for light theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content Block (Pops out in 3D) */}
                <div
                    className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end"
                    style={{ transform: "translateZ(80px)" }} // Pop out strongly
                >
                    <span className="text-gold font-medium text-xs tracking-[0.2em] mb-3">
                        {collection.id} — {collection.category}
                    </span>
                    <h3 className="font-display text-[28px] text-white leading-tight mb-4">
                        {collection.title}
                    </h3>

                    {/* Faux Button Line */}
                    <div className="w-12 h-[1px] bg-gray-400 group-hover:bg-gold group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </div>
            </motion.div>
        </motion.div>
    );
}
