"use client";

import { useRef, useState } from "react";
import { MoveUpRight, Palette, Layout, Droplet, Box } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

const services = [
    {
        id: 1,
        title: "Premium Ceramics",
        desc: "Curated collections of high-end ceramic tiles for bespoke interiors.",
        icon: Droplet,
    },
    {
        id: 2,
        title: "Interior Architecture",
        desc: "Complete spatial planning and architectural design solutions.",
        icon: Layout,
    },
    {
        id: 3,
        title: "Bespoke Surfaces",
        desc: "Custom marble and stone surfaces tailored to your project.",
        icon: Palette,
    },
    {
        id: 4,
        title: "3D Visualisation",
        desc: "Cinematic, high-dimensional rendering for your spaces.",
        icon: Box,
    },
];

export default function Services() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".service-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
            });

            gsap.from(".service-card", {
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 75%",
                },
                y: 50,
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
            id="services"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-neutral-100 dark:bg-[#111] overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="max-w-xl">
                        <span className="service-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                            Our Expertise
                        </span>
                        <h2 className="service-header text-4xl md:text-5xl font-display font-medium text-balance">
                            Elevating spaces with comprehensive design solutions.
                        </h2>
                    </div>
                    <button className="service-header flex items-center gap-2 uppercase tracking-widest font-medium text-sm pb-1 border-b border-foreground hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors">
                        View All Services <MoveUpRight size={16} />
                    </button>
                </div>

                <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, idx) => (
                        <ServiceCard key={service.id} service={service} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        setHovered(false);
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power2.out",
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="service-card relative bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-sm border border-black/5 dark:border-white/5 transition-colors overflow-hidden group perspective-1000"
            style={{ transformStyle: "preserve-3d" }}
        >
            <div className="relative z-10 pointer-events-none translate-z-[50px]">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-8 text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-500">
                    <service.icon size={28} />
                </div>
                <h3 className="text-2xl font-display font-medium mb-4">{service.title}</h3>
                <p className="text-foreground/60 text-lg leading-relaxed max-w-sm">
                    {service.desc}
                </p>

                <motion.div
                    animate={{ scale: hovered ? 1 : 0.8, opacity: hovered ? 1 : 0 }}
                    className="absolute right-0 bottom-0 text-[var(--color-accent)]"
                >
                    <MoveUpRight size={32} strokeWidth={1} />
                </motion.div>
            </div>

            {/* Decorative gradient blob that moves on hover */}
            <div
                className={`absolute -inset-10 bg-gradient-to-tr from-transparent via-[var(--color-accent)]/5 to-transparent blur-3xl transition-opacity duration-700 pointer-events-none ${hovered ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
}
