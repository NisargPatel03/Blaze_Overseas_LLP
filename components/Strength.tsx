"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Globe, Factory } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { EarthGroup } from "./EarthGroup";

const strengths = [
    {
        id: 1,
        title: "Global Reach",
        desc: "A sprawling network of international partners and clients across 30+ countries, delivering excellence worldwide.",
        icon: Globe,
    },
    {
        id: 2,
        title: "Manufacturing Excellence",
        desc: "State-of-the-art facilities equipped with advanced technology ensuring precision, scalability, and premium output.",
        icon: Factory,
    },
    {
        id: 3,
        title: "Uncompromising Quality",
        desc: "Rigorous multi-stage quality control guaranteeing the highest standard of purity for spices and durability for tiles.",
        icon: ShieldCheck,
    },
];

export default function Strength() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".strength-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
            });

            gsap.from(".strength-item", {
                scrollTrigger: {
                    trigger: ".strength-grid",
                    start: "top 75%",
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="strength"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-neutral-900 text-white relative overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
                {/* Left Side: Text and Grid */}
                <div className="w-full lg:w-1/2 relative z-10">
                    <div className="mb-12">
                        <span className="strength-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                            Why Choose Us
                        </span>
                        <h2 className="strength-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance">
                            Our Core Strengths
                        </h2>
                    </div>

                    <div className="strength-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                        {strengths.map((item) => (
                            <div
                                key={item.id}
                                className="strength-item group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
                            >
                                <div className="w-16 h-16 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-500">
                                    <item.icon size={28} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-display font-medium mb-2">{item.title}</h3>
                                    <p className="text-white/60 leading-relaxed text-sm md:text-base">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: 3D Globe */}
                <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative z-0">
                    {/* Fallback glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/20 to-transparent blur-3xl opacity-50 rounded-full mix-blend-screen pointer-events-none" />

                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <pointLight position={[-10, -10, -10]} color="#C17A4E" intensity={2} />
                        <EarthGroup />
                    </Canvas>
                </div>
            </div>
        </section>
    );
}
