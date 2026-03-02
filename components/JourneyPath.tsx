"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FlowingPath() {
    const { camera } = useThree();
    const particlesRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.PointsMaterial>(null);

    // Create a highly dramatic, winding 3D curve spanning deep into Y-space
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 10, -2),     // Home
            new THREE.Vector3(-8, 0, -6),     // About
            new THREE.Vector3(8, -10, -4),    // Products
            new THREE.Vector3(-6, -20, -8),   // Strength
            new THREE.Vector3(6, -30, -3),    // Mission
            new THREE.Vector3(-5, -40, -6),   // Certifications
            new THREE.Vector3(0, -50, -2),    // Contact / Footer
        ], false, 'catmullrom', 0.5);
    }, []);

    // Create a beautiful ribbon-like tube
    const tubeGeometry = useMemo(() => {
        return new THREE.TubeGeometry(curve, 200, 0.05, 8, false);
    }, [curve]);

    // Create thousands of sparkling gold particles clustered around the curve
    const particlesCount = 4000;
    const { positions, sizes, opacities } = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);
        const opacities = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i++) {
            const t = Math.random();
            const pt = curve.getPointAt(t);

            // Scatter the particles with noise
            const radius = Math.random() * 1.5;
            const theta = Math.random() * Math.PI * 2;

            positions[i * 3] = pt.x + radius * Math.cos(theta);
            positions[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 2;
            positions[i * 3 + 2] = pt.z + radius * Math.sin(theta);

            sizes[i] = Math.random() * 2;
            opacities[i] = Math.random() * 0.8 + 0.2;
        }
        return { positions, sizes, opacities };
    }, [curve]);

    // Animate camera and particles on frame
    useFrame((state) => {
        if (!document) return;

        // Calculate scroll progress (0 to 1)
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = window.scrollY / (maxScroll || 1);

        // Move camera precisely down the Y axis to follow the curve's depth
        // Start height: y=5, End height: y=-45
        const targetY = 5 - (scrollProgress * 50);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);

        // Add a gentle pan to the camera for cinematic effect
        const targetX = Math.sin(scrollProgress * Math.PI * 2) * 2;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);

        // Slowly twist the particle stream
        if (particlesRef.current) {
            particlesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }

        // Pulse the material size slightly
        if (materialRef.current) {
            materialRef.current.size = 0.05 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <points ref={particlesRef}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" count={particlesCount} args={[positions, 3]} />
                        <bufferAttribute attach="attributes-size" count={particlesCount} args={[sizes, 1]} />
                    </bufferGeometry>
                    <pointsMaterial
                        ref={materialRef}
                        color="#D49A36" // Gold
                        size={0.05}
                        transparent
                        opacity={0.8}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                        sizeAttenuation
                    />
                </points>
            </Float>

            <mesh geometry={tubeGeometry}>
                <meshBasicMaterial
                    color="#C17A4E"
                    transparent
                    opacity={0.15}
                    wireframe
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

export default function JourneyPath() {
    const [mounted, setMounted] = useState(false);

    // Ensure we only render the Canvas on the client to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-40 pointer-events-none mix-blend-screen overflow-hidden">
            <Canvas camera={{ position: [0, 5, 5], fov: 60 }} gl={{ alpha: true, antialias: true }}>
                <FlowingPath />
            </Canvas>
        </div>
    );
}
