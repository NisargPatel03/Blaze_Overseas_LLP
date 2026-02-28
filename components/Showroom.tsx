"use client";

import { useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, PresentationControls, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

// Using a basic box mesh for the virtual showroom proxy, 
// since we don't have a real GLTF model URL.
function RoomModel({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            // Rotate the room based on scroll scrub
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                scrollProgress.current * Math.PI,
                0.1
            );

            // Zoom effect
            const targetScale = 1 + scrollProgress.current * 0.5;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Abstract architectural elements representing a room */}
            <mesh position={[0, -2, -2]} receiveShadow>
                <boxGeometry args={[10, 0.5, 10]} />
                <meshStandardMaterial color="#e5e5e5" />
            </mesh>
            <mesh position={[-4, 1, -4]} castShadow>
                <boxGeometry args={[1, 6, 8]} />
                <meshStandardMaterial color="#C17A4E" />
            </mesh>
            <mesh position={[0, 1, -5]} castShadow>
                <boxGeometry args={[8, 4, 1]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            {/* Floating accent elements */}
            <mesh position={[2, 2, -2]} castShadow>
                <torusGeometry args={[1, 0.4, 32, 64]} />
                <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
}

export default function Showroom() {
    const containerRef = useRef<HTMLElement>(null);
    const scrollProgress = useRef(0);

    useGSAP(
        () => {
            // Text reveals
            gsap.from(".showroom-text", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                },
                duration: 1.5,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: "power4.out",
            });

            // Scrub animation progress for the 3D canvas
            gsap.to(scrollProgress, {
                current: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="showroom"
            ref={containerRef}
            className="relative w-full h-[150vh] bg-neutral-900 text-white overflow-hidden"
        >
            <div className="sticky top-0 w-full h-screen">
                <div className="absolute inset-0 z-0">
                    <Canvas shadows>
                        <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
                        <Environment preset="studio" />
                        <PresentationControls
                            global

                            snap={true}
                            rotation={[0, 0, 0]}
                            polar={[-Math.PI / 3, Math.PI / 3]}
                            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                        >
                            <RoomModel scrollProgress={scrollProgress} />
                        </PresentationControls>
                    </Canvas>
                </div>

                {/* UI Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center text-center px-4 bg-gradient-to-t from-[#111]/80 via-transparent to-[#111]/40">
                    <span className="showroom-text text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm mb-4">
                        Virtual Experience
                    </span>
                    <h2 className="showroom-text text-5xl md:text-7xl lg:text-8xl font-display font-medium max-w-4xl text-balance">
                        Immerse yourself in our architectural showroom.
                    </h2>
                    <p className="showroom-text mt-6 text-xl text-white/70 max-w-2xl">
                        Interact with the scene to pan, and scroll to explore the space and discover premium materials.
                    </p>
                </div>
            </div>
        </section>
    );
}
