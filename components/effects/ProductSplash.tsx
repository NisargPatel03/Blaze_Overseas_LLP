'use client';
import React, { useEffect, useRef, useState } from 'react';

export interface SplashConfig {
  bgColor: string;
  titleColor: string;
  glowColor: string;
  particles: number;
  colors: string[];
  shapes: ('circle' | 'elongated' | 'disc' | 'oval' | 'dust' | 'flat-circle')[];
  origin: 'center' | 'bottom' | 'top' | 'top-center' | 'center-high';
  spread: number;
  gravity: number;
  drag: number;
  speed: number;
  sizeRange: [number, number];
  opacityRange: [number, number];
  burst: boolean;
  burstRings?: number;
  trail: boolean;
  rotate: boolean;
  bounce: boolean;
  decayRange: [number, number];
  dustCloud?: boolean;
  cascade?: boolean;
  cascadeDuration?: number;
  dualOrigin?: boolean;
  dualColor?: boolean;
  flutter?: boolean;
  elongation?: number;
}

const SPLASH_CONFIGS: Record<string, SplashConfig> = {
  // BLENDED MASALA
  'red-chilli-powder': {
    bgColor: '#0d0100', titleColor: '#E53935', glowColor: 'rgba(229,57,53,0.28)', particles: 280,
    colors: ['#E53935','#c62828','#ff5252','#b71c1c','#ff8a80','#D32F2F'],
    shapes: ['circle','oval'], origin: 'center', spread: 1.8, gravity: 0.18, drag: 0.984,
    speed: 14, sizeRange: [2,9], opacityRange: [0.6,1.0], burst: true, burstRings: 3,
    trail: true, rotate: false, bounce: false, decayRange: [0.008, 0.018]
  },
  'turmeric-powder': {
    bgColor: '#080500', titleColor: '#FFB300', glowColor: 'rgba(255,179,0,0.22)', particles: 300,
    colors: ['#FFB300','#FFA000','#FFCA28','#FF8F00','#FFD54F','#F9A825','#FFD740'],
    shapes: ['circle','dust'], origin: 'bottom', spread: 2.0, gravity: 0.06, drag: 0.988,
    speed: 12, sizeRange: [1,6], opacityRange: [0.45,0.9], burst: false, trail: true, rotate: false, bounce: false,
    dustCloud: true, decayRange: [0.005, 0.012]
  },
  'kashmiri-red-chilli': { // Note: slug mapped from products.ts
    bgColor: '#0a0000', titleColor: '#B71C1C', glowColor: 'rgba(183,28,28,0.3)', particles: 260,
    colors: ['#B71C1C','#C62828','#D32F2F','#8B0000','#EF9A9A','#E53935'],
    shapes: ['circle','oval'], origin: 'center', spread: 1.6, gravity: 0.16, drag: 0.985,
    speed: 13, sizeRange: [2,8], opacityRange: [0.6,1.0], burst: true, burstRings: 2,
    trail: true, rotate: false, bounce: false, decayRange: [0.009, 0.016]
  },
  'cumin-powder': {
    bgColor: '#060300', titleColor: '#795548', glowColor: 'rgba(121,85,72,0.2)', particles: 240,
    colors: ['#795548','#6D4C41','#8D6E63','#5D4037','#A1887F','#4E342E','#BCAAA4'],
    shapes: ['circle','disc'], origin: 'center', spread: 1.5, gravity: 0.15, drag: 0.986,
    speed: 11, sizeRange: [2,7], opacityRange: [0.55,0.95], burst: true, burstRings: 2,
    trail: false, rotate: false, bounce: false, decayRange: [0.009, 0.016]
  },
  'garam-masala': {
    bgColor: '#060200', titleColor: '#8D4F2B', glowColor: 'rgba(141,79,43,0.2)', particles: 250,
    colors: ['#8D4F2B','#5D4037','#A1887F','#6D4C41','#4E342E','#D7CCC8','#BF360C'],
    shapes: ['circle','oval','disc'], origin: 'center', spread: 1.6, gravity: 0.14, drag: 0.985,
    speed: 11, sizeRange: [2,8], opacityRange: [0.55,1.0], burst: true, burstRings: 2,
    trail: false, rotate: true, bounce: false, decayRange: [0.009, 0.017]
  },
  'coriander-powder': {
    bgColor: '#060502', titleColor: '#A5892A', glowColor: 'rgba(165,137,42,0.18)', particles: 260,
    colors: ['#C8A832','#A5892A','#DAC050','#BFA030','#F0D878','#8B7020','#D4B840'],
    shapes: ['circle','dust'], origin: 'bottom', spread: 1.8, gravity: 0.08, drag: 0.987,
    speed: 10, sizeRange: [1,6], opacityRange: [0.5,0.9], burst: false, trail: true, rotate: false, bounce: false,
    dustCloud: true, decayRange: [0.007, 0.013]
  },
  'cumin-coriander-powder': {
    bgColor: '#060400', titleColor: '#9E8020', glowColor: 'rgba(158,128,32,0.2)', particles: 280,
    colors: ['#795548','#C8A832','#6D4C41','#D4B840','#8D6E63','#BFA030'],
    shapes: ['circle','disc'], origin: 'center', spread: 2.0, gravity: 0.12, drag: 0.986,
    speed: 12, sizeRange: [2,7], opacityRange: [0.55,0.95], burst: false, trail: true, rotate: false, bounce: false,
    dualOrigin: true, decayRange: [0.008, 0.015]
  },
  'garlic-powder': {
    bgColor: '#040404', titleColor: '#E8E0C8', glowColor: 'rgba(232,224,200,0.12)', particles: 260,
    colors: ['#E8E0C8','#D4CCB0','#F5F0E0','#C8C0A8','#EDE8D8','#B8B098','#F0ECD8'],
    shapes: ['circle','dust'], origin: 'center', spread: 1.7, gravity: 0.09, drag: 0.988,
    speed: 10, sizeRange: [1,6], opacityRange: [0.4,0.85], burst: false, trail: true, rotate: false, bounce: false,
    dustCloud: true, decayRange: [0.006, 0.013]
  },
  'ginger-powder': {
    bgColor: '#060402', titleColor: '#D4A020', glowColor: 'rgba(212,160,32,0.2)', particles: 250,
    colors: ['#D4A020','#C49010','#E8B830','#B48000','#F0C840','#A07010','#DDB828'],
    shapes: ['circle','dust'], origin: 'bottom', spread: 1.7, gravity: 0.07, drag: 0.988,
    speed: 10, sizeRange: [1,6], opacityRange: [0.5,0.9], burst: false, trail: true, rotate: false, bounce: false,
    dustCloud: true, decayRange: [0.007, 0.013]
  },
  'onion-powder': {
    bgColor: '#050404', titleColor: '#C8A878', glowColor: 'rgba(200,168,120,0.15)', particles: 240,
    colors: ['#C8A878','#A88858','#D8B888','#B89868','#E8C898','#987848','#DDB878'],
    shapes: ['circle','dust'], origin: 'center', spread: 1.6, gravity: 0.11, drag: 0.987,
    speed: 10, sizeRange: [1,6], opacityRange: [0.5,0.9], burst: false, trail: true, rotate: false, bounce: false,
    decayRange: [0.007, 0.014]
  },
  'onion-flakes': {
    bgColor: '#050404', titleColor: '#D4B88A', glowColor: 'rgba(212,184,138,0.15)', particles: 200,
    colors: ['rgba(245,230,200,0.8)','rgba(220,200,168,0.7)','rgba(255,245,220,0.75)','rgba(200,180,148,0.6)'],
    shapes: ['disc','oval'], origin: 'top', spread: 1.4, gravity: 0.04, drag: 0.992,
    speed: 5, sizeRange: [4,14], opacityRange: [0.3,0.75], burst: false, trail: false, rotate: true, bounce: false,
    flutter: true, decayRange: [0.004, 0.010]
  },
  // WHOLE SPICES
  'red-chilli-whole': {
    bgColor: '#0d0000', titleColor: '#FF1744', glowColor: 'rgba(255,23,68,0.35)', particles: 180,
    colors: ['#E53935','#c62828','#ff5252','#b71c1c','#FF1744','#D32F2F'],
    shapes: ['elongated'], elongation: 3.5, origin: 'top', spread: 1.4, gravity: 0.22, drag: 0.983,
    speed: 9, sizeRange: [4,14], opacityRange: [0.7,1.0], burst: false, trail: true, rotate: true, bounce: false,
    decayRange: [0.007, 0.013]
  },
  'kashmiri-chilli-whole': {
    bgColor: '#0a0000', titleColor: '#C62828', glowColor: 'rgba(198,40,40,0.3)', particles: 160,
    colors: ['#C62828','#B71C1C','#E53935','#8B0000','#D32F2F'],
    shapes: ['elongated','oval'], elongation: 2.8, origin: 'top', spread: 1.3, gravity: 0.20, drag: 0.984,
    speed: 8, sizeRange: [5,15], opacityRange: [0.7,1.0], burst: false, trail: true, rotate: true, bounce: false,
    decayRange: [0.006, 0.012]
  },
  'turmeric-whole': {
    bgColor: '#080500', titleColor: '#FF8F00', glowColor: 'rgba(255,143,0,0.25)', particles: 140,
    colors: ['#FF8F00','#F57F17','#FFA000','#E65100','#FF6F00','#FFAB40'],
    shapes: ['oval','disc'], origin: 'center', spread: 1.4, gravity: 0.2, drag: 0.985,
    speed: 9, sizeRange: [5,16], opacityRange: [0.75,1.0], burst: true, burstRings: 1,
    trail: false, rotate: true, bounce: true, decayRange: [0.006, 0.012]
  },
  // GRAINS
  'basmati-rice': {
    bgColor: '#040404', titleColor: '#F5F5DC', glowColor: 'rgba(245,245,220,0.1)', particles: 350,
    colors: ['rgba(245,245,220,0.9)','rgba(255,255,240,0.85)','rgba(230,220,190,0.8)','rgba(255,250,230,0.9)'],
    shapes: ['elongated'], elongation: 4.5, origin: 'top-center', spread: 1.2, gravity: 0.28, drag: 0.982,
    speed: 8, sizeRange: [2,9], opacityRange: [0.55,0.9], burst: false, trail: false, rotate: true, bounce: false,
    cascade: true, cascadeDuration: 1.5, decayRange: [0.006, 0.011]
  },
  'wheat': {
    bgColor: '#050400', titleColor: '#DAA520', glowColor: 'rgba(218,165,32,0.18)', particles: 280,
    colors: ['#DAA520','#CD853F','#D2691E','#B8860B','#DEB887','#C8A240','#F0C040'],
    shapes: ['oval','elongated'], elongation: 2.2, origin: 'top', spread: 1.5, gravity: 0.22, drag: 0.984,
    speed: 10, sizeRange: [3,10], opacityRange: [0.65,1.0], burst: false, trail: false, rotate: true, bounce: false,
    decayRange: [0.007, 0.013]
  },
  // PULSES
  'chana-dal': {
    bgColor: '#080500', titleColor: '#FDD835', glowColor: 'rgba(253,216,53,0.2)', particles: 220,
    colors: ['#FDD835','#F9A825','#FBC02D','#F57F17','#FFEE58','#FFD600','#FFF176'],
    shapes: ['circle','oval'], origin: 'center', spread: 1.6, gravity: 0.22, drag: 0.984,
    speed: 10, sizeRange: [4,10], opacityRange: [0.75,1.0], burst: true, burstRings: 2,
    trail: false, rotate: false, bounce: true, decayRange: [0.007, 0.013]
  },
  'mung-dal': {
    bgColor: '#040604', titleColor: '#CDDC39', glowColor: 'rgba(205,220,57,0.18)', particles: 240,
    colors: ['#CDDC39','#C6D836','#AFB42B','#F4FF81','#9E9D24','#E6EE9C','#F9FBE7'],
    shapes: ['circle','oval'], origin: 'center', spread: 1.7, gravity: 0.20, drag: 0.984,
    speed: 11, sizeRange: [3,9], opacityRange: [0.7,1.0], burst: true, burstRings: 2,
    trail: false, rotate: false, bounce: true, decayRange: [0.007, 0.013]
  },
  'kabuli-chana': {
    bgColor: '#050403', titleColor: '#F5DEB3', glowColor: 'rgba(245,222,179,0.18)', particles: 200,
    colors: ['#F5DEB3','#DEB887','#D2B48C','#C8A882','#FAEBD7','#F0E68C'],
    shapes: ['circle','oval'], origin: 'center-high', spread: 1.5, gravity: 0.25, drag: 0.983,
    speed: 11, sizeRange: [6,14], opacityRange: [0.8,1.0], burst: true, burstRings: 2,
    trail: false, rotate: false, bounce: true, decayRange: [0.006, 0.011]
  },
  'urad-dal': {
    bgColor: '#060606', titleColor: '#EEEEEE', glowColor: 'rgba(200,200,200,0.1)', particles: 240,
    colors: ['#1a1a1a','#2d2d2d','#F5F5F5','#E0E0E0','#111111','#FAFAFA'],
    shapes: ['circle','oval'], origin: 'center', spread: 1.6, gravity: 0.18, drag: 0.985,
    speed: 10, sizeRange: [3,9], opacityRange: [0.75,1.0], burst: true, burstRings: 2,
    trail: false, rotate: false, bounce: false, dualColor: true, decayRange: [0.007, 0.013]
  },
  'rajma': {
    bgColor: '#080304', titleColor: '#EF5350', glowColor: 'rgba(239,83,80,0.2)', particles: 200,
    colors: ['#C62828','#B71C1C','#E53935','#F5DEB3','#DEB887','#D2B48C'],
    shapes: ['oval'], origin: 'center', spread: 1.5, gravity: 0.24, drag: 0.983,
    speed: 10, sizeRange: [5,13], opacityRange: [0.8,1.0], burst: true, burstRings: 2,
    trail: false, rotate: false, bounce: true, decayRange: [0.006, 0.012]
  },
  'masoor-dal': {
    bgColor: '#060200', titleColor: '#FF7043', glowColor: 'rgba(255,112,67,0.28)', particles: 320,
    colors: ['#FF7043','#FF5722','#FF8A65','#E64A19','#FFAB91','#FF3D00','#BF360C'],
    shapes: ['disc','flat-circle'], origin: 'center', spread: 1.9, gravity: 0.12, drag: 0.986,
    speed: 12, sizeRange: [3,8], opacityRange: [0.6,1.0], burst: true, burstRings: 3,
    trail: true, rotate: false, bounce: false, decayRange: [0.008, 0.015]
  },
  'soyabean': {
    bgColor: '#050504', titleColor: '#D4D880', glowColor: 'rgba(212,216,128,0.15)', particles: 200,
    colors: ['#D4D880','#C8CC70','#B8BC60','#E0E490','#A8AC50','#ECEE98','#C0C468'],
    shapes: ['circle','oval'], origin: 'center', spread: 1.4, gravity: 0.22, drag: 0.984,
    speed: 9, sizeRange: [4,10], opacityRange: [0.7,1.0], burst: true, burstRings: 1,
    trail: false, rotate: false, bounce: true, decayRange: [0.007, 0.013]
  },
  'toor-dal': {
    bgColor: '#070500', titleColor: '#E8A020', glowColor: 'rgba(232,160,32,0.2)', particles: 240,
    colors: ['#E8A020','#D49018','#F0B030','#C48010','#DAA020','#B87010','#F5C040'],
    shapes: ['circle','oval','disc'], origin: 'center', spread: 1.6, gravity: 0.20, drag: 0.985,
    speed: 10, sizeRange: [4,10], opacityRange: [0.72,1.0], burst: true, burstRings: 2,
    trail: false, rotate: false, bounce: true, decayRange: [0.007, 0.013]
  },
};

const DEFAULT_CONFIG = SPLASH_CONFIGS['toor-dal'];

interface Particle {
  x: number; y: number; vx: number; vy: number; ay: number;
  size: number; color: string;
  shape: 'circle' | 'elongated' | 'disc' | 'oval' | 'dust' | 'flat-circle';
  opacity: number; baseOpacity: number;
  life: number; decay: number;
  rotation: number; rotSpeed: number;
  trail: { x: number; y: number }[] | null;
  delay: number; elongation: number; bounceCount: number; seed: number;
}

export default function ProductSplash({ productSlug, autoPlay = true, replay = 0 }: { productSlug: string, autoPlay?: boolean, replay?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dustClouds, setDustClouds] = useState<{ id: number; color: string; x: number; y: number }[]>([]);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cfg = SPLASH_CONFIGS[productSlug] || DEFAULT_CONFIG;
    let animationFrameId: number;
    let particles: Particle[] = [];
    let isRunning = false;
    let time = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const w = () => canvas.width / Math.min(window.devicePixelRatio || 1, 2);
    const h = () => canvas.height / Math.min(window.devicePixelRatio || 1, 2);

    const initParticles = () => {
      particles = [];
      const W = w();
      const H = h();
      
      // Mobile density clamping
      const pCount = W < 768 ? Math.floor(cfg.particles * 0.6) : cfg.particles;

      const getOrigin = (idx: number, isDualOrigin: boolean) => {
        let baseX = W / 2;
        let baseY = H / 2;
        
        switch (cfg.origin) {
          case 'bottom': baseY = H * 0.82; break;
          case 'top': baseY = H * 0.14; break;
          case 'top-center': baseY = H * 0.08; break;
          case 'center-high': baseY = H * 0.32; break;
          case 'center': baseY = H / 2; break;
        }

        if (isDualOrigin) {
          baseX = idx % 2 === 0 ? W * 0.28 : W * 0.72;
        }

        return { x: baseX, y: baseY };
      };

      for (let i = 0; i < pCount; i++) {
        const o = getOrigin(i, !!cfg.dualOrigin);
        let px = o.x;
        let py = o.y;
        
        // Cascade effect logic
        let delay = 0;
        if (cfg.cascade && cfg.cascadeDuration) {
          delay = (i / pCount) * (cfg.cascadeDuration * 60); // frame delays
          px = W / 2 + (Math.random() - 0.5) * (W * 0.3);
        }

        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.8 + 0.2) * cfg.speed;
        
        let vx = Math.cos(angle) * speed * cfg.spread;
        let vy = Math.sin(angle) * speed * cfg.spread;

        if (cfg.dualOrigin) {
          // If firing from left, shoot right. If right, shoot left
          vx = i % 2 === 0 ? Math.abs(vx) : -Math.abs(vx);
          vy *= 0.6; // less vertical scatter for combined blasts
        }

        if (cfg.origin === 'top' || cfg.origin === 'top-center') {
          vy = Math.abs(vy) * 0.5; // push down mostly
        }

        // burst rings overrides
        if (cfg.burst && cfg.burstRings && i < cfg.burstRings * 20) {
          const ringIndex = Math.floor(i / 20) + 1;
          const ringAngle = ((i % 20) / 20) * Math.PI * 2;
          vx = Math.cos(ringAngle) * speed * ringIndex * 0.6;
          vy = Math.sin(ringAngle) * speed * ringIndex * 0.6;
          delay = ringIndex * 4;
        }

        // color picking
        let color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
        if (cfg.dualColor) {
          const half1 = cfg.colors.slice(0, Math.floor(cfg.colors.length/2));
          const half2 = cfg.colors.slice(Math.floor(cfg.colors.length/2));
          color = i % 2 === 0 
            ? half1[Math.floor(Math.random() * half1.length)]
            : half2[Math.floor(Math.random() * half2.length)];
        }

        particles.push({
          x: px, y: py,
          vx, vy, ay: cfg.gravity,
          size: Math.random() * (cfg.sizeRange[1] - cfg.sizeRange[0]) + cfg.sizeRange[0],
          color,
          shape: cfg.shapes[Math.floor(Math.random() * cfg.shapes.length)],
          opacity: 0,
          baseOpacity: Math.random() * (cfg.opacityRange[1] - cfg.opacityRange[0]) + cfg.opacityRange[0],
          life: 1.0,
          decay: Math.random() * (cfg.decayRange[1] - cfg.decayRange[0]) + cfg.decayRange[0],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: cfg.rotate ? (Math.random() - 0.5) * 0.2 : 0,
          trail: cfg.trail ? [] : null,
          delay,
          elongation: cfg.elongation || 1,
          bounceCount: 0,
          seed: Math.random() * 100
        });
      }

      // DOM Dust clouds
      if (cfg.dustCloud) {
        setDustClouds([
          { id: Math.random(), color: cfg.glowColor, x: getOrigin(0, false).x, y: getOrigin(0, false).y },
          { id: Math.random(), color: cfg.glowColor, x: getOrigin(0, false).x - 40, y: getOrigin(0, false).y + 20 },
          { id: Math.random(), color: cfg.glowColor, x: getOrigin(0, false).x + 40, y: getOrigin(0, false).y - 10 }
        ]);
        setTimeout(() => setDustClouds([]), 1500);
      }
    };

    const drawLoop = () => {
      const W = w();
      const H = h();

      // Clear to transparent — never paint an opaque bg over the image
      ctx.clearRect(0, 0, W, H);

      let aliveCount = 0;
      let peakLife = 0;

      // Draw Glow
      particles.forEach(p => { if (p.life > peakLife) peakLife = p.life; });
      if (peakLife > 0.05) {
        const grad = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.min(W,H)*0.45);
        // safely replace glow opacity using a trick string replace if it contains an alpha
        // But since cfg.glowColor already contains alpha from the config we just use globalAlpha
        ctx.globalAlpha = peakLife * 0.6;
        grad.addColorStop(0, cfg.glowColor);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0,0,W,H);
        ctx.globalAlpha = 1.0;
      }

      particles.forEach(p => {
        if (p.delay > 0) {
          p.delay--;
          return;
        }
        if (p.life <= 0) return;
        aliveCount++;

        if (cfg.flutter) {
          p.vx += Math.sin(time * 0.05 + p.seed) * 0.25;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= cfg.drag;
        p.vy += p.ay;
        p.rotation += p.rotSpeed;
        p.life -= p.decay;

        // Intro fade in
        if (1 - p.life < 0.1) p.opacity = ((1 - p.life) / 0.1) * p.baseOpacity;
        else p.opacity = p.life * p.baseOpacity;

        if (cfg.bounce && p.y > H * 0.86 && p.bounceCount < 2) {
          p.y = H * 0.86;
          p.vy *= -0.4;
          p.vx *= 0.7;
          p.bounceCount++;
          if (p.bounceCount >= 2) p.decay *= 3;
        }

        if (p.trail) {
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 8) p.trail.shift();
          
          p.trail.forEach((t, i) => {
            if (!p.trail) return;
            ctx.globalAlpha = (i / p.trail.length) * p.opacity * 0.25;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(t.x, t.y, p.size * (i / p.trail.length) * 0.5, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.beginPath();
        switch(p.shape) {
          case 'circle': ctx.arc(0,0, p.size, 0, Math.PI*2); break;
          case 'elongated': ctx.ellipse(0,0, p.size*0.4, p.size*p.elongation*0.5, 0,0, Math.PI*2); break;
          case 'disc': ctx.ellipse(0,0, p.size, p.size*0.45, 0,0, Math.PI*2); break;
          case 'oval': ctx.ellipse(0,0, p.size*0.65, p.size*0.42, 0,0, Math.PI*2); break;
          case 'flat-circle': ctx.ellipse(0,0, p.size*0.8, p.size*0.3, 0,0, Math.PI*2); break;
          case 'dust': 
            ctx.arc(-p.size*0.5, -p.size*0.2, p.size*0.6, 0, Math.PI*2);
            ctx.arc(p.size*0.4, p.size*0.3, p.size*0.5, 0, Math.PI*2);
            break;
          default: ctx.arc(0,0, p.size, 0, Math.PI*2);
        }
        ctx.fill();
        ctx.restore();
      });

      ctx.globalAlpha = 1.0;
      time++;

      if (aliveCount > 0) {
        animationFrameId = requestAnimationFrame(drawLoop);
      } else {
        isRunning = false;
        // Clear canvas and fade it out cleanly — don't paint an opaque block
        ctx.clearRect(0, 0, W, H);
        if (canvas) {
          canvas.style.transition = 'opacity 2500ms ease-in-out';
          canvas.style.opacity = '0';
        }
      }
    };

    const start = () => {
      if (canvas) {
        canvas.style.transition = 'none';
        canvas.style.opacity = '1';
        void canvas.offsetWidth; // Force reflow to guarantee opacity drops instantly
      }
      handleResize();
      initParticles();
      if (!isRunning) {
        isRunning = true;
        drawLoop();
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Visibility pause
    const handleVisibility = () => {
      if (document.hidden && isRunning) cancelAnimationFrame(animationFrameId);
      else if (!document.hidden && isRunning) drawLoop();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    if (autoPlay) start();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [productSlug, replay, autoPlay]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        style={{ opacity: 1, zIndex: 10 }}
      />
      {dustClouds.map(c => (
        <div 
          key={c.id} 
          className="absolute rounded-full pointer-events-none origin-center"
          style={{
            left: c.x, top: c.y, width: 200, height: 200, marginTop: -100, marginLeft: -100,
            backgroundColor: c.color,
            animation: 'dustExpand 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes dustExpand {
          0% { transform: scale(0); opacity: 0.8; }
          100% { transform: scale(3.5); opacity: 0; }
        }
      `}}/>
    </>
  );
}
