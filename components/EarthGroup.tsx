"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function EarthGroup() {
    const groupRef = useRef<THREE.Group>(null);
    const globeRadius = 2;

    // Create a particle system for the globe to look like a high-tech point cloud
    const particlesCount = 2000;
    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        const colorAccent = new THREE.Color("#C17A4E");
        const colorBase = new THREE.Color("#ffffff");

        for (let i = 0; i < particlesCount; i++) {
            // Distribute points on a sphere
            const phi = Math.acos(-1 + (2 * i) / particlesCount);
            const theta = Math.sqrt(particlesCount * Math.PI) * phi;

            const x = globeRadius * Math.cos(theta) * Math.sin(phi);
            const y = globeRadius * Math.sin(theta) * Math.sin(phi);
            const z = globeRadius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Mix colors
            const mixRatio = Math.random();
            const mixedColor = colorBase.clone().lerp(colorAccent, mixRatio > 0.8 ? 1 : 0.2);

            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        return { positions, colors };
    }, [globeRadius]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Base Sphere (Dark inner core) */}
            <mesh>
                <sphereGeometry args={[globeRadius * 0.95, 64, 64]} />
                <meshStandardMaterial
                    color="#050505"
                    transparent
                    opacity={0.8}
                    roughness={0.8}
                />
            </mesh>

            {/* Point Cloud Outline */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particlesCount}
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particlesCount}
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.03}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>

            {/* Glow / Atmosphere */}
            <mesh>
                <sphereGeometry args={[globeRadius * 1.1, 32, 32]} />
                <meshBasicMaterial
                    color="#C17A4E"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}
