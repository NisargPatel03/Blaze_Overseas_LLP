"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ExportGlobe3D({ className = "", height = "360px" }: { className?: string, height?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [labels, setLabels] = useState<{ name: string; x: number; y: number; visible: boolean }[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;
    
    const scene = new THREE.Scene();
    // Background removed to be transparent

    const mount = mountRef.current;
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Texture Loading
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
    );

    // Earth Mesh
    const earthGeo = new THREE.SphereGeometry(1.5, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({ 
      map: earthTexture,
      shininess: 5,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Atmosphere Glow
    const atmosGeo = new THREE.SphereGeometry(1.53, 64, 64);
    const atmosMat = new THREE.MeshPhongMaterial({ 
      color: 0x4488ff, 
      transparent: true, 
      opacity: 0.1, 
      side: THREE.FrontSide 
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

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
      { name: "UAE", lat: 25, lon: 55 },
      { name: "Saudi Arabia", lat: 24, lon: 45 },
      { name: "United Kingdom", lat: 51, lon: -0.1 },
      { name: "USA", lat: 38, lon: -97 },
      { name: "Canada", lat: 56, lon: -106 },
      { name: "Australia", lat: -25, lon: 134 },
      { name: "Germany", lat: 51, lon: 10 },
      { name: "Japan", lat: 36, lon: 138 },
      { name: "South Africa", lat: -29, lon: 25 },
      { name: "Singapore", lat: 1, lon: 103 },
    ];

    const indiaRoute = { name: "India", lat: 20, lon: 78 };

    const indiaPos = getPos(20, 78, 1.52);
    
    const rootGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const rootMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const rootDot = new THREE.Mesh(rootGeo, rootMat);
    rootDot.position.copy(indiaPos);
    globeGroup.add(rootDot);

    const destGeo = new THREE.SphereGeometry(0.03, 12, 12);
    const destMat = new THREE.MeshBasicMaterial({ color: 0xF5A623, transparent: true });
    
    const dots: { mesh: THREE.Mesh; idx: number }[] = [];
    const tubes: { mesh: THREE.Mesh; geo: THREE.TubeGeometry }[] = [];

    routes.forEach((route, i) => {
      const pos = getPos(route.lat, route.lon, 1.52);
      const dot = new THREE.Mesh(destGeo, destMat.clone());
      dot.position.copy(pos);
      globeGroup.add(dot);
      dots.push({ mesh: dot, idx: i });

      const mid = indiaPos.clone().lerp(pos, 0.5).normalize().multiplyScalar(1.52 + 0.35);
      const curve = new THREE.CatmullRomCurve3([indiaPos, mid, pos]);
      
      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.0035, 6, false);
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0xF5A623, transparent: true, opacity: 0.5 });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      
      tubeGeo.setDrawRange(0, 0); 
      globeGroup.add(tube);
      tubes.push({ mesh: tube, geo: tubeGeo });
    });

    let rafId: number;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      if ('touches' in e) {
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      } else {
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;
      
      globeGroup.rotation.y += deltaX * 0.008;
      globeGroup.rotation.x += deltaY * 0.005;
      
      prevX = clientX;
      prevY = clientY;
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
        globeGroup.rotation.y += 0.0015;
        globeGroup.rotation.x += 0.0004;
      }

      dots.forEach(d => {
        (d.mesh.material as THREE.Material).opacity = 0.4 + 0.6 * Math.abs(Math.sin(elapsed * 2 + d.idx * 0.8));
      });

      const maxDraw = 40 * 6 * 2.5; 
      tubes.forEach(t => {
        const ease = Math.min(elapsed / 2.5, 1);
        t.geo.setDrawRange(0, Math.floor(ease * maxDraw));
      });

      // Update Labels
      const newLabels: any[] = [];
      const worldPos = new THREE.Vector3();
      
      // Project India
      rootDot.getWorldPosition(worldPos);
      const indiaVector = worldPos.clone().project(camera);
      const isIndiaVisible = worldPos.applyMatrix4(camera.matrixWorldInverse).z < 0;
      newLabels.push({
        name: indiaRoute.name,
        x: (indiaVector.x * 0.5 + 0.5) * mount.clientWidth,
        y: (-(indiaVector.y * 0.5) + 0.5) * mount.clientHeight,
        visible: isIndiaVisible && indiaVector.z < 1
      });

      // Project others
      dots.forEach(d => {
        d.mesh.getWorldPosition(worldPos);
        const vector = worldPos.clone().project(camera);
        const isVisible = worldPos.applyMatrix4(camera.matrixWorldInverse).z < 0;
        
        newLabels.push({
          name: routes[d.idx].name,
          x: (vector.x * 0.5 + 0.5) * mount.clientWidth,
          y: (-(vector.y * 0.5) + 0.5) * mount.clientHeight,
          visible: isVisible && vector.z < 1
        });
      });
      setLabels(newLabels);

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
      
      earthGeo.dispose();
      earthMat.dispose();
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

  return (
    <div ref={mountRef} className={`w-full relative cursor-grab active:cursor-grabbing ${className}`} style={{ height }}>
      {/* Country Labels Overlay */}
      {labels.map((label, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${label.x}px`,
            top: `${label.y}px`,
            transform: "translate(12px, -50%)",
            opacity: label.visible ? 1 : 0,
            pointerEvents: "none",
            transition: "opacity 0.2s ease-out",
          }}
          className="z-20 bg-[#F9F5EE]/85 backdrop-blur-[2px] border border-[#E8D5B0] px-2 py-0.5 rounded-full shadow-sm"
        >
          <span className="text-[11px] font-bold text-[#B45309] whitespace-nowrap uppercase tracking-wider">
            {label.name}
          </span>
        </div>
      ))}
    </div>
  );
}
