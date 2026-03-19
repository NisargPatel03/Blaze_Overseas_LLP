"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ExportGlobe3D({ className = "", height = "360px" }: { className?: string, height?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020202");

    const mount = mountRef.current;
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);
    
    const mainLight = new THREE.PointLight(0xF5A623, 2.5, 20);
    mainLight.position.set(3, 3, 3);
    scene.add(mainLight);
    
    const fillLight = new THREE.PointLight(0xc47a10, 1.0, 15);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const isMobile = window.innerWidth < 768;
    const innerSegs = isMobile ? 16 : 28;
    const wireSegs = isMobile ? 12 : 20;

    const innerGeo = new THREE.SphereGeometry(1.5, innerSegs, innerSegs);
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x0a0600, roughness: 0.9, metalness: 0.05, transparent: true, opacity: 0.95 });
    const innerGlobe = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerGlobe);

    const wireGeo = new THREE.SphereGeometry(1.52, wireSegs, wireSegs);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xF5A623, wireframe: true, transparent: true, opacity: 0.08 });
    const wireGlobe = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireGlobe);

    const atmosGeo = new THREE.SphereGeometry(1.62, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({ color: 0xF5A623, transparent: true, opacity: 0.015, side: THREE.BackSide });
    const atmosGlobe = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosGlobe);

    const getPos = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(r * Math.sin(phi) * Math.cos(theta)),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const routes = [
      { lat: 25, lon: 55 }, // UAE
      { lat: 24, lon: 45 }, // Saudi
      { lat: 51, lon: -0.1 }, // UK
      { lat: 38, lon: -97 }, // USA
      { lat: 56, lon: -106 }, // Canada
      { lat: -25, lon: 134 }, // Australia
      { lat: 51, lon: 10 }, // Germany
      { lat: 36, lon: 138 }, // Japan
      { lat: -29, lon: 25 }, // SA
      { lat: 1, lon: 103 }, // Singapore
    ];

    const indiaPos = getPos(20, 78, 1.54);
    
    const rootGeo = new THREE.SphereGeometry(0.055, 8, 8);
    const rootMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const rootDot = new THREE.Mesh(rootGeo, rootMat);
    rootDot.position.copy(indiaPos);
    globeGroup.add(rootDot);

    const destGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const destMat = new THREE.MeshBasicMaterial({ color: 0xF5A623, transparent: true });
    
    const dots: { mesh: THREE.Mesh; idx: number }[] = [];
    const tubes: { mesh: THREE.Mesh; geo: THREE.TubeGeometry }[] = [];

    routes.forEach((route, i) => {
      const pos = getPos(route.lat, route.lon, 1.54);
      const dot = new THREE.Mesh(destGeo, destMat.clone());
      dot.position.copy(pos);
      globeGroup.add(dot);
      dots.push({ mesh: dot, idx: i });

      const mid = indiaPos.clone().lerp(pos, 0.5).normalize().multiplyScalar(1.54 + 0.4);
      const curve = new THREE.CatmullRomCurve3([indiaPos, mid, pos]);
      
      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.004, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0xF5A623, transparent: true, opacity: 0.2 });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      
      // Setup progressive draw
      tubeGeo.setDrawRange(0, 0); 
      
      globeGroup.add(tube);
      tubes.push({ mesh: tube, geo: tubeGeo });
    });

    let rafId: number;
    let isDragging = false;
    let prevX = 0;

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      prevX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - prevX;
      globeGroup.rotation.y += deltaX * 0.008;
      prevX = clientX;
    };
    const handleUp = () => { isDragging = false; };

    mount.addEventListener('mousedown', handleDown);
    mount.addEventListener('mousemove', handleMove);
    mount.addEventListener('mouseup', handleUp);
    mount.addEventListener('mouseleave', handleUp);
    mount.addEventListener('touchstart', handleDown, { passive: true });
    mount.addEventListener('touchmove', handleMove, { passive: true });
    mount.addEventListener('touchend', handleUp, { passive: true });

    let startTimestamp: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = (timestamp - startTimestamp) / 1000;

      if (!isDragging) {
        globeGroup.rotation.y += 0.003;
      }

      dots.forEach(d => {
        (d.mesh.material as THREE.Material).opacity = 0.3 + 0.7 * Math.abs(Math.sin(elapsed * 2 + d.idx * 0.8));
      });

      // Simple dash offset map via draw range progression
      const maxDraw = 40 * 6 * 2.5; // vertex roughly mapping to length
      tubes.forEach(t => {
        const ease = Math.min(elapsed / 2.5, 1);
        t.geo.setDrawRange(0, Math.floor(ease * maxDraw));
      });

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
    
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      mount.removeEventListener('mousedown', handleDown);
      mount.removeEventListener('mousemove', handleMove);
      mount.removeEventListener('mouseup', handleUp);
      mount.removeEventListener('mouseleave', handleUp);
      mount.removeEventListener('touchstart', handleDown);
      mount.removeEventListener('touchmove', handleMove);
      mount.removeEventListener('touchend', handleUp);
      
      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      rootGeo.dispose();
      rootMat.dispose();
      destGeo.dispose();
      destMat.dispose();
      tubes.forEach(t => {
        t.geo.dispose();
        (t.mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`w-full relative cursor-grab active:cursor-grabbing ${className}`} style={{ height }} />;
}
