"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const VolumetricShaderMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0),
    uHover: 0,
    uTime: 0,
  },
  // vertex shader
  `
    varying vec2 vUv;
    uniform vec2 uMouse;
    uniform float uHover;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Calculate fake depth: parallax effect based on distance from center
      float dist = distance(uv, vec2(0.5));
      
      // Tilt the image based on mouse movement
      float tiltX = uMouse.x * uHover * 0.15;
      float tiltY = uMouse.y * uHover * 0.15;
      
      pos.z += (uv.x - 0.5) * tiltX + (uv.y - 0.5) * tiltY;
      
      // subtle bulge in the center when hovered
      pos.z += (1.0 - dist * 2.0) * 0.05 * uHover;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment shader
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uTime;

    void main() {
      vec2 uv = vUv;
      
      // RGB Shift based on mouse velocity/hover — kept very subtle
      float shift = 0.004 * uHover;
      
      // Distortion wave
      float wave = sin(uv.y * 20.0 + uTime * 5.0) * 0.005 * uHover;
      uv.x += wave;

      vec4 texColorR = texture2D(uTexture, uv + vec2(shift, 0.0));
      vec4 texColorG = texture2D(uTexture, uv);
      vec4 texColorB = texture2D(uTexture, uv - vec2(shift, 0.0));

      vec3 finalColor = vec3(texColorR.r, texColorG.g, texColorB.b);
      
      // Add subtle lighting based on mouse - lightened for light theme
      vec2 mouseNorm = uMouse * 0.5 + 0.5;
      float light = smoothstep(0.0, 1.0, 1.0 - distance(uv, mouseNorm) * 2.0) * 0.15 * uHover;
      finalColor += light;

      gl_FragColor = vec4(finalColor, texColorG.a);
    }
  `
);

extend({ VolumetricShaderMaterial });

declare module "@react-three/fiber" {
  interface IntrinsicElements {
    volumetricShaderMaterial: any;
  }
}

function PhotoMesh({ url, isHovered }: { url: string; isHovered: boolean }) {
  const texture = useMemo(() => {
     const loader = new THREE.TextureLoader();
     if (url.startsWith('http')) {
       loader.setCrossOrigin("anonymous");
     }
     return loader.load(url);
  }, [url]);

  const materialRef = useRef<any>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      
      // Mouse ranges from -1 to +1 natively in state.pointer
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, state.pointer.x, 0.1);
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, state.pointer.y, 0.1);
      
      materialRef.current.uHover = THREE.MathUtils.lerp(
          materialRef.current.uHover,
          isHovered ? 1 : 0, // 0 = no effect when not hovered — removes the permanent rainbow glitch
          0.08
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
      {/* @ts-ignore */}
      <volumetricShaderMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
}

export function VolumetricPhoto({ src, className = "" }: { src: string; className?: string }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Fallback image */}
      <img 
        src={src} 
        crossOrigin={src.startsWith('http') ? "anonymous" : undefined} 
        className="absolute inset-0 w-full h-full object-cover opacity-100" 
        alt="Product View" 
      />
      
      <div className="absolute inset-0 z-10 w-full h-full">
        <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
           <PhotoMesh url={src} isHovered={hovered} />
        </Canvas>
      </div>
    </div>
  );
}
