"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Instance, Instances } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLES_COUNT = 80;

function Particles() {
  const ref = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLES_COUNT; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 15 * Math.cbrt(Math.random()); 
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        const scale = Math.random() * 0.4 + 0.1;
        const speed = Math.random() * 0.15 + 0.05;
        
        temp.push({ 
            position: [x, y, z] as [number, number, number], 
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number], 
            scale, 
            speed 
        });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.03;
    ref.current.rotation.x = time * 0.01;
  });

  return (
    <Instances ref={ref} limit={PARTICLES_COUNT} range={PARTICLES_COUNT}>
      <dodecahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial color="#F5A623" roughness={0.7} metalness={0.4} transparent opacity={0.2} envMapIntensity={0.5} />
      {particles.map((data, i) => (
        <Float key={i} speed={data.speed} rotationIntensity={1.5} floatIntensity={1.5}>
          <Instance position={data.position} scale={data.scale} rotation={data.rotation} />
        </Float>
      ))}
    </Instances>
  );
}

export function SpiceParticles({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} penumbra={1} intensity={0.5} color="#F5A623" />
        <Particles />
      </Canvas>
    </div>
  );
}
