"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ProductBox3DProps {
  productName: string;
  origin: string;
  grade: string;
  netWeight: string;
  className?: string;
}

export default function ProductBox3D({ productName, origin, grade, netWeight, className = "" }: ProductBox3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#060606");
    
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
    camera.position.z = 3.5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.domElement.style.opacity = "0"; // Entry animation
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xF5A623, 1.4);
    mainLight.position.set(3, 4, 3);
    scene.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0x441a00, 0.8);
    fillLight.position.set(-3, -2, -3);
    scene.add(fillLight);

    // Canvas Texture Label
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 640;
    const ctx = canvas.getContext("2d")!;
    
    ctx.fillStyle = "#120800";
    ctx.fillRect(0, 0, 512, 640);
    ctx.strokeStyle = "#F5A623";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, 512 - 32, 640 - 32);
    ctx.textAlign = "center";
    ctx.fillStyle = "#F5A623";
    ctx.font = "bold 68px serif";
    ctx.fillText("BLAZZE", 256, 160);
    ctx.fillStyle = "rgba(245,166,35,0.65)";
    ctx.font = "24px sans-serif";
    ctx.fillText("OVERSEAS LLP", 256, 210);
    
    ctx.beginPath();
    ctx.moveTo(120, 240);
    ctx.lineTo(392, 240);
    ctx.strokeStyle = "rgba(245,166,35,0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px sans-serif";
    ctx.fillText(productName, 256, 330, 440);

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "20px sans-serif";
    ctx.fillText(`${origin} · ${grade}`, 256, 380, 440);

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "18px sans-serif";
    ctx.fillText(`Net Weight: ${netWeight}`, 256, 460);

    ctx.fillStyle = "#F5A623";
    ctx.fillRect(350, 580, 140, 30);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("EXPORT GRADE", 420, 600);

    const texture = new THREE.CanvasTexture(canvas);
    
    const geometry = new THREE.BoxGeometry(1.6, 2.2, 1.6);
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0xc47a10, emissive: 0x6B3800, emissiveIntensity: 0.15, roughness: 0.3, metalness: 0.7 }),
      new THREE.MeshStandardMaterial({ color: 0xc47a10, emissive: 0x6B3800, emissiveIntensity: 0.15, roughness: 0.3, metalness: 0.7 }),
      new THREE.MeshStandardMaterial({ color: 0xe8941a, roughness: 0.2, metalness: 0.8 }),
      new THREE.MeshStandardMaterial({ color: 0x8B5E1A, roughness: 0.4, metalness: 0.6 }),
      new THREE.MeshStandardMaterial({ 
        map: texture,
        color: 0xF5A623, emissive: 0x8B4500, emissiveIntensity: 0.2, roughness: 0.25, metalness: 0.75 
      }),
      new THREE.MeshStandardMaterial({ color: 0xF5A623, emissive: 0x8B4500, emissiveIntensity: 0.2, roughness: 0.25, metalness: 0.75 })
    ];
    
    const box = new THREE.Mesh(geometry, materials);
    scene.add(box);

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xF5A623, transparent: true, opacity: 0.3 });
    const line = new THREE.LineSegments(edges, lineMaterial);
    box.add(line);

    box.scale.set(0.3, 0.3, 0.3);

    let isDragging = false;
    let previousPoint = { x: 0, y: 0 };
    let rafId: number;

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPoint = { x: clientX, y: clientY };
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousPoint.x;
      const deltaY = clientY - previousPoint.y;
      box.rotation.y += deltaX * 0.008;
      box.rotation.x += deltaY * 0.004;
      previousPoint = { x: clientX, y: clientY };
    };

    const handleUp = () => { isDragging = false; };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(2, Math.min(6, camera.position.z + e.deltaY * 0.005));
    };

    const mount = mountRef.current;
    mount.addEventListener('mousedown', handleDown);
    mount.addEventListener('mousemove', handleMove);
    mount.addEventListener('mouseup', handleUp);
    mount.addEventListener('mouseleave', handleUp);
    mount.addEventListener('touchstart', handleDown, { passive: true });
    mount.addEventListener('touchmove', handleMove, { passive: true });
    mount.addEventListener('touchend', handleUp, { passive: true });
    mount.addEventListener('wheel', handleWheel, { passive: false });

    let startTimestamp: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = (timestamp - startTimestamp) / 1000;
      
      if (progress < 1.2) {
        const p = Math.min(progress / 1.2, 1);
        const ease = 1 - Math.pow(1 - p, 4); 
        box.scale.setScalar(0.3 + 0.7 * ease);
      }
      if (progress < 0.8) {
        renderer.domElement.style.opacity = String(progress / 0.8);
      } else {
        renderer.domElement.style.opacity = "1";
      }

      if (!isDragging) {
        box.rotation.y += 0.006;
      }
      
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    });
    resizeObserver.observe(mount);
    
    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(animate);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      mount.removeEventListener('mousedown', handleDown);
      mount.removeEventListener('mousemove', handleMove);
      mount.removeEventListener('mouseup', handleUp);
      mount.removeEventListener('mouseleave', handleUp);
      mount.removeEventListener('touchstart', handleDown);
      mount.removeEventListener('touchmove', handleMove);
      mount.removeEventListener('touchend', handleUp);
      mount.removeEventListener('wheel', handleWheel);
      
      geometry.dispose();
      materials.forEach(m => m.dispose());
      texture.dispose();
      edges.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [productName, origin, grade, netWeight]);

  return <div ref={mountRef} className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`} />;
}
