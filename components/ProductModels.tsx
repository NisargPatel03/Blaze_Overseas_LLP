"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function TileModel() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.05 + 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef} castShadow receiveShadow>
                {/* Ceramic Slab geometry */}
                <boxGeometry args={[3, 4, 0.1]} />
                <MeshTransmissionMaterial
                    color="#ffffff"
                    roughness={0.1}
                    thickness={0.5}
                    ior={1.5}
                    transmission={0.8} // glass-like look
                    background={new THREE.Color("#111")}
                />
            </mesh>
            {/* Inner Core (solid marble look) */}
            <mesh ref={meshRef} position={[0, 0, -0.05]}>
                <boxGeometry args={[2.95, 3.95, 0.08]} />
                <meshStandardMaterial
                    color="#e0e0e0"
                    roughness={0.4}
                    metalness={0.1}
                />
            </mesh>
        </Float>
    );
}

export function SpiceCloud() {
    const groupRef = useRef<THREE.Group>(null);
    const count = 300;

    const { positions, scales, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const color1 = new THREE.Color("#C17A4E"); // Terracotta / Cumin
        const color2 = new THREE.Color("#D49A36"); // Turmeric
        const color3 = new THREE.Color("#7C3F2B"); // Clove / Dark pepper

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

            scales[i] = Math.random() * 0.1 + 0.02;

            const mix = Math.random();
            const color = mix > 0.6 ? color1 : mix > 0.3 ? color2 : color3;

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return { positions, scales, colors };
    }, [count]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Core glowing sphere */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#C17A4E" emissive="#5c2b11" emissiveIntensity={0.5} roughness={1} />
            </mesh>

            {/* Orbiting Spice Particles */}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} />
                    <bufferAttribute attach="attributes-color" count={count} args={[colors, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.1}
                    vertexColors
                    transparent
                    opacity={0.9}
                    sizeAttenuation
                />
            </points>
        </group>
    );
}
