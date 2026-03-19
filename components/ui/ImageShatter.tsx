"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ShatterMesh({ url, isHovered }: { url: string; isHovered: boolean }) {
  // Hardcode a basic texture loader to ensure crossOrigin is safe
  const texture = useMemo(() => {
     const loader = new THREE.TextureLoader();
     loader.setCrossOrigin("anonymous");
     return loader.load(url);
  }, [url]);

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const gridX = 35;
  const gridY = 35;
  const count = gridX * gridY;

  const { positions, uvs, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const uv = new Float32Array(count * 2);
    const rand = new Float32Array(count * 3);

    let i = 0;
    for (let y = 0; y < gridY; y++) {
      for (let x = 0; x < gridX; x++) {
        pos[i * 3] = (x / gridX) - 0.5 + (0.5 / gridX);
        pos[i * 3 + 1] = (y / gridY) - 0.5 + (0.5 / gridY);
        pos[i * 3 + 2] = 0;

        uv[i * 2] = x / gridX;
        uv[i * 2 + 1] = y / gridY;

        rand[i * 3] = (Math.random() - 0.5) * 4;
        rand[i * 3 + 1] = (Math.random() - 0.5) * 4;
        rand[i * 3 + 2] = (Math.random() - 0.5) * 4;

        i++;
      }
    }
    return { positions: pos, uvs: uv, randoms: rand };
  }, []);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uProgress: { value: 0 },
  }), [texture]);

  useFrame((state) => {
    if (uniforms.uProgress) {
        uniforms.uProgress.value = THREE.MathUtils.lerp(
            uniforms.uProgress.value,
            isHovered ? 1 : 0,
            0.08
        );
    }
  });

  const { viewport } = useThree();

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1 / gridX, 1 / gridY]}>
          <instancedBufferAttribute attach="attributes-aOffset" args={[positions, 3]} />
          <instancedBufferAttribute attach="attributes-aUv" args={[uvs, 2]} />
          <instancedBufferAttribute attach="attributes-aRandom" args={[randoms, 3]} />
      </planeGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          uniform float uProgress;
          attribute vec3 aOffset;
          attribute vec2 aUv;
          attribute vec3 aRandom;
          varying vec2 vUv;
          
          void main() {
            vUv = aUv;
            // Disperse based on progress
            vec3 pos = position + aOffset;
            
            // Push outwards in Z
            pos.z += uProgress * aRandom.z * 0.5;
            // Push outwards in XY
            pos.xy += aRandom.xy * uProgress * (abs(aRandom.z) + 0.1) * 0.5;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform float uProgress;
          varying vec2 vUv;
          
          void main() {
            vec4 color = texture2D(uTexture, vUv);
            // fade out slightly as it scatters
            color.a *= (1.0 - uProgress * 0.6);
            gl_FragColor = color;
          }
        `}
        transparent
      />
    </instancedMesh>
  );
}

export function ImageShatter({ src, className = "" }: { src: string; className?: string }) {
  const [hovered, setHovered] = React.useState(false);

  // use a wrapper div to ensure the canvas fits the parent
  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Fallback image that sits behind just in case WebGL takes a moment to load */}
      <img src={src} className="absolute inset-0 w-full h-full object-cover blur-md opacity-20" alt="bg" />
      <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 1], fov: 50 }}>
             <ShatterMesh url={src} isHovered={hovered} />
          </Canvas>
      </div>
    </div>
  );
}
