"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

function Arc({ start, end }: { start: THREE.Vector3, end: THREE.Vector3 }) {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    const distance = start.distanceTo(end);
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    midPoint.normalize().multiplyScalar(2 + distance * 0.4); // push out curve

    // Create a bezier curve
    const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
    return curve.getPoints(50);
  }, [start, end]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state) => {
    if (lineRef.current) {
      // Dash animation or subtle glowing by pulsing opacity
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2 + start.x) * 0.2;
    }
  });

  return (
    // @ts-ignore
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#F5A623" transparent opacity={0.4} linewidth={1} blending={THREE.AdditiveBlending} depthWrite={false} />
    </line>
  );
}

function GlobeWithArcs() {
  const groupRef = useRef<THREE.Group>(null);
  const globeRadius = 2;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  // Generate Abstract Export Nodes spread mostly around the sphere
  const nodes = useMemo(() => {
    const list = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      // add some random noise to break uniformity
      const x = globeRadius * Math.cos(theta) * Math.sin(phi) + (Math.random() - 0.5) * 0.2;
      const y = globeRadius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 0.2;
      const z = globeRadius * Math.cos(phi) + (Math.random() - 0.5) * 0.2;

      const v = new THREE.Vector3(x, y, z).normalize().multiplyScalar(globeRadius);
      list.push(v);
    }
    return list;
  }, []);

  const arcs = useMemo(() => {
    const list = [];
    // Let node 0 act as origin (India)
    const origin = nodes[0];
    for (let i = 1; i < nodes.length; i++) {
      // connect about 60% of the nodes to origin
      if (Math.random() > 0.4) {
        list.push({ start: origin, end: nodes[i] });
      }
      // randomly connect some nodes to each other
      if (Math.random() > 0.8 && i < nodes.length - 1) {
        list.push({ start: nodes[i], end: nodes[i + 1] });
      }
    }
    return list;
  }, [nodes]);

  // Particle Point Cloud Wrap for Atmosphere
  const particlesCount = 3000;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const colorAccent = new THREE.Color("#C17A4E");
    const colorBase = new THREE.Color("#1a1a1a");

    for (let i = 0; i < particlesCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize().multiplyScalar(globeRadius + Math.random() * 0.1);

      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;

      const mixed = colorBase.clone().lerp(colorAccent, Math.random() > 0.9 ? 1 : 0);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    return { positions, colors };
  }, []);

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      {/* Abstract Glowing Core */}
      <mesh>
        <sphereGeometry args={[globeRadius * 0.98, 64, 64]} />
        <meshStandardMaterial color="#020202" emissive="#0a0500" roughness={0.7} metalness={0.8} />
      </mesh>

      {/* Inner Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[globeRadius * 1.05, 32, 32]} />
        <meshBasicMaterial color="#F5A623" transparent opacity={0.03} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Surrounding Point Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particlesCount} args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" count={particlesCount} args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Node Points */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color={i === 0 ? "#ffffff" : "#F5A623"} />
          {/* Glow Halo around nodes */}
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color={i === 0 ? "#ffffff" : "#F5A623"} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </mesh>
      ))}

      {/* Connection Arcs */}
      {arcs.map((arc, i) => <Arc key={i} start={arc.start} end={arc.end} />)}
    </group>
  );
}

export function ExportGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full cursor-grab active:cursor-grabbing ${className}`}>
      <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#F5A623" />
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <GlobeWithArcs />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} autoRotate autoRotateSpeed={0.8} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
