"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshReflectorMaterial, Float, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

function TilePlatform() {
    return (
        <group position={[0, -2, 0]}>
            {/* Base reflection floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={80}
                    roughness={0.1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.5}
                    mirror={0.5}
                />
            </mesh>

            {/* Subtle light grid on floor */}
            <gridHelper args={[50, 50, '#1c1917', '#0a0a0a']} position={[0, 0, 0]} />
        </group>
    );
}

function FloatingTiles() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        // Slow architectural rotation
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    });

    return (
        <group ref={group}>
            {/* Center Massive Slab */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
                    <boxGeometry args={[3, 4, 0.2]} />
                    <meshStandardMaterial
                        color="#C8C0B4"
                        roughness={0.2}
                        metalness={0.1}
                        envMapIntensity={1}
                    />
                </mesh>
            </Float>

            {/* Left Accents */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[-2.5, 1, -1]} rotation={[0, 0, 0]} castShadow>
                    <boxGeometry args={[1.5, 2, 0.15]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
                </mesh>
            </Float>

            {/* Right Gold Accent */}
            <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
                <mesh position={[2, -0.5, 1]} rotation={[0, -Math.PI / 6, 0]} castShadow>
                    <boxGeometry args={[2, 1.5, 0.1]} />
                    <meshStandardMaterial color="#C9922A" roughness={0.3} metalness={1} />
                </mesh>
            </Float>
        </group>
    );
}

export default function TilesScene() {
    return (
        <div className="absolute inset-0 z-0 bg-obsidian pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={['#0a0a0a']} />
                <fog attach="fog" args={['#0a0a0a', 5, 20]} />

                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FAF8F3" castShadow />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#C9922A" />

                <PresentationControls
                    global
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 6, Math.PI / 6]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                    <FloatingTiles />
                </PresentationControls>

                <TilePlatform />
            </Canvas>
        </div>
    );
}
