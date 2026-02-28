"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

function BackgroundBlob() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
        }
    });

    return (
        <mesh ref={meshRef} scale={2}>
            <Icosahedron args={[1, 15]}>
                <MeshDistortMaterial
                    color="#111"
                    envMapIntensity={0.5}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    metalness={0.8}
                    roughness={0.2}
                    distort={0.4}
                    speed={1.5}
                />
            </Icosahedron>
        </mesh>
    );
}

export default function CtaBanner() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".cta-content > *", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full py-32 md:py-48 overflow-hidden bg-[var(--color-accent)] text-white"
        >
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 5, 5]} intensity={2} />
                    <BackgroundBlob />
                </Canvas>
            </div>

            <div className="cta-content relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium max-w-4xl leading-tight text-balance mb-8">
                    Ready to elevate your next project?
                </h2>
                <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-12">
                    Contact our design consultants to explore possibilities for your residential or commercial space.
                </p>

                <button className="group relative px-10 py-5 bg-white text-black overflow-hidden rounded-sm hover:-translate-y-1 transition-transform duration-300">
                    <span className="relative z-10 font-bold uppercase tracking-widest text-sm text-[var(--color-accent)] group-hover:text-black transition-colors duration-300">
                        Start a Conversation
                    </span>
                    <div className="absolute inset-0 bg-neutral-200 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </button>
            </div>
        </section>
    );
}
