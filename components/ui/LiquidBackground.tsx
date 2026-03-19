"use client";
import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const LiquidShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColorBase: new THREE.Color("#050300"), // Very dark brown/black
    uColorAccent: new THREE.Color("#F5A623"), // Gold
    uAspect: 1.0,
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColorBase;
    uniform vec3 uColorAccent;
    uniform float uAspect;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Fix aspect ratio for isotropic ripples
      vec2 uv = vUv;
      uv.x *= uAspect;
      vec2 mouse = uMouse;
      mouse.x *= uAspect;
      
      // Calculate distance to mouse
      float dist = distance(uv, mouse);
      
      // Create a ripple based on mouse distance and time
      float ripple = sin(dist * 20.0 - uTime * 4.0) * exp(-dist * 4.0);
      
      // Add general slow liquid noise
      float noise = snoise(uv * 4.0 + uTime * 0.15);
      
      // Combine effects
      float distortion = noise * 0.15 + ripple * 0.1;
      
      // Create a metallic/liquid specular highlight effect
      float highlight = smoothstep(0.4, 0.8, snoise(uv * 8.0 + distortion * 10.0 + uTime * 0.3));
      
      // Intense gold highlight where the noise peaks
      vec3 finalColor = mix(uColorBase, uColorAccent, highlight * 0.5 + ripple * 0.6);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ LiquidShaderMaterial });

declare module "@react-three/fiber" {
  interface IntrinsicElements {
    liquidShaderMaterial: any;
  }
}

function LiquidPlane() {
  const materialRef = useRef<any>(null);
  const { size, viewport } = useThree();
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Convert normalized screen coords (-1 to 1) to UV map (0 to 1)
      const targetX = state.pointer.x * 0.5 + 0.5;
      const targetY = state.pointer.y * 0.5 + 0.5;
      
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, targetX, 0.1);
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, targetY, 0.1);
      
      materialRef.current.uAspect = size.width / size.height;
    }
  });

  return (
    <mesh>
      {/* Cover the entire view by matching viewport size */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      {/* @ts-ignore */}
      <liquidShaderMaterial ref={materialRef} />
    </mesh>
  );
}

export function LiquidBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 1.5]}>
        <LiquidPlane />
      </Canvas>
    </div>
  );
}
