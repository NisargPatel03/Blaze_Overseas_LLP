"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import * as THREE from "three";

function AbstractShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} scale={1.5}>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshDistortMaterial
                    color="#C17A4E"
                    envMapIntensity={1.5}
                    clearcoat={0.8}
                    clearcoatRoughness={0.1}
                    metalness={0.2}
                    roughness={0.3}
                    distort={0.2}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

export default function Hero() {
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".hero-title-word", {
            y: 100,
            opacity: 0,
            rotate: 5,
            stagger: 0.1,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.5,
        })
            .from(
                ".hero-desc",
                {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.8"
            )
            .from(
                ".hero-cta",
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                },
                "-=0.6"
            )
            .from(
                ".scroll-indicator",
                {
                    y: -20,
                    opacity: 0,
                    duration: 1,
                    ease: "bounce.out",
                },
                "-=0.4"
            );

        // Scroll indicator looping animation
        gsap.to(".scroll-arrow", {
            y: 10,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1.5,
        });
    }, []);

    const titleText = "Crafting Timeless Spaces";

    return (
        <section id="home" className="relative w-full h-screen overflow-hidden bg-[var(--background)]">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-80">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} />
                    <Environment preset="city" />
                    <AbstractShape />
                </Canvas>
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 pt-20">
                <div className="overflow-hidden pb-4 max-w-5xl">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-tight flex flex-wrap justify-center gap-x-4">
                        {titleText.split(" ").map((word, i) => (
                            <span key={i} className="hero-title-word inline-block origin-bottom-left">
                                {word}
                            </span>
                        ))}
                    </h1>
                </div>

                <p className="hero-desc mt-6 text-lg md:text-xl text-foreground/70 max-w-2xl text-balance">
                    Premium ceramics, multi-purpose tiles, and interior solutions designed
                    to elevate your modern lifestyle.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-6">
                    <button className="hero-cta group relative px-8 py-4 bg-foreground text-background overflow-hidden rounded-sm transition-transform hover:scale-105 duration-300">
                        <span className="relative z-10 font-medium uppercase tracking-widest text-sm">
                            Explore Collections
                        </span>
                        <div className="absolute inset-0 bg-[var(--color-accent)] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                    </button>

                    <button className="hero-cta group px-8 py-4 border border-foreground/20 hover:border-foreground transition-all duration-300 rounded-sm">
                        <span className="font-medium uppercase tracking-widest text-sm">
                            Our Services
                        </span>
                    </button>
                </div>
            </div>

            <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 z-10">
                <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
                <ArrowDown className="scroll-arrow opacity-80" size={20} />
            </div>
        </section>
    );
}
