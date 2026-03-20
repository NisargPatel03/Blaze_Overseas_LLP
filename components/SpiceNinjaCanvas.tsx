"use client";

import React, { useEffect, useRef } from "react";

const ITEMS = [
  // Whole Spices
  { char: "🌶️", color: "#ff3300" }, // Red Chilli
  { char: "🫚", color: "#ffcc00" }, // Turmeric Root / Ginger
  { char: "🧄", color: "#f0e6d2" }, // Garlic
  { char: "🌿", color: "#2E8B57" }, // Herbs / Coriander Leaves
  
  // Blended Spices
  { char: "🍛", color: "#cd853f" }, // Curry / Masala Mix
  { char: "🥣", color: "#ff8c00" }, // Bowl of Turmeric/Spices
  
  // Grains
  { char: "🌾", color: "#ffd700" }, // Wheat / Rice Stalk
  { char: "🍚", color: "#ffffff" }, // Basmati Rice
  { char: "🥖", color: "#deb887" }, // Wheat / Bakery
  
  // Pulses
  { char: "🫘", color: "#5c4033" }, // Dal / Rajma / Chana
  { char: "🫛", color: "#7cb342" }, // Moong Dal / Green Peas
  { char: "🥜", color: "#d2b48c" }  // Groundnuts / Pulses
];

export default function SpiceNinjaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    let items: any[] = [];
    let particles: any[] = [];
    let popups: any[] = [];
    let trail: any[] = [];
    
    let score = 0;
    let comboDisplay = { text: "", scale: 0, opacity: 0, age: 0 };
    let sliceHistory: number[] = [];

    let lastTime = performance.now();
    let spawnTimer = 0;
    let nextSpawnDelay = Math.random() * 700 + 800; // 800 to 1500ms
    
    let mouse = { x: -1000, y: -1000 };
    let lastMouse = { x: -1000, y: -1000 };
    let isMouseDown = false;
    let lastMouseTime = performance.now();

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    // Spawner
    const spawnItem = () => {
      if (items.filter(i => !i.sliced).length >= 15) return; // reduced max to 15
      
      const itemDef = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      
      // Responsive sizing: smaller sizes
      const isMobile = window.innerWidth < 768;
      const minSize = isMobile ? 25 : 45;
      const maxSize = isMobile ? 40 : 65;
      const size = Math.random() * (maxSize - minSize) + minSize;
      
      // Edge: 0=top, 1=right, 2=bottom, 3=left
      const edge = Math.floor(Math.random() * 4);
      let x, y, vx, vy;

      if (edge === 0) { // top
        x = Math.random() * width;
        y = -size;
        vx = (Math.random() - 0.5) * 4;
        vy = Math.random() * 2 + 3; // fall down
      } else if (edge === 1) { // right
        x = width + size;
        y = Math.random() * (height * 0.8) + height * 0.2;
        vx = -(Math.random() * 4 + 3);
        vy = -(Math.random() * 6 + 6); // toss up a bit
      } else if (edge === 2) { // bottom
        x = Math.random() * (width * 0.8) + width * 0.1;
        y = height + size;
        vx = (Math.random() - 0.5) * 6;
        vy = -(Math.random() * 5 + 10); // toss heavily up
      } else { // left
        x = -size;
        y = Math.random() * (height * 0.8) + height * 0.2;
        vx = Math.random() * 4 + 3;
        vy = -(Math.random() * 6 + 6); // toss up a bit
      }

      items.push({
        char: itemDef.char,
        color: itemDef.color,
        size,
        x, y, vx, vy,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        sliced: false,
        age: 0, // used for fadeout after slice
        splitOffset: 0
      });
    };

    const triggerCombo = (text: string) => {
      comboDisplay = { text, scale: 0.5, opacity: 1, age: 0 };
    };

    const distPointToLine = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
      const A = px - x1;
      const B = py - y1;
      const C = x2 - x1;
      const D = y2 - y1;

      const dot = A * C + B * D;
      const len_sq = C * C + D * D;
      let param = -1;
      if (len_sq !== 0) param = dot / len_sq;

      let xx, yy;

      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      const dx = px - xx;
      const dy = py - yy;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const sliceItem = (item: any) => {
      item.sliced = true;
      item.age = 0; // reset for sliced fadeout animation
      item.splitOffset = 0;
      
      score++;
      
      // Reduced memory powder particles burst
      for(let i=0; i<15; i++) {
        particles.push({
          x: item.x,
          y: item.y,
          vx: (Math.random() - 0.5) * 16 + item.vx * 0.5,
          vy: (Math.random() - 0.5) * 16 + item.vy * 0.5,
          size: Math.random() * 5 + 2,
          color: item.color,
          age: 0,
          maxAge: Math.random() * 600 + 400 // ms
        });
      }

      // Popups
      popups.push({
        text: "+1",
        x: item.x,
        y: item.y,
        age: 0,
        maxAge: 500
      });

      // Combo System
      const now = performance.now();
      sliceHistory.push(now);
      sliceHistory = sliceHistory.filter(t => now - t < 1500);
      
      if (sliceHistory.length === 3) triggerCombo("COMBO x3!");
      if (sliceHistory.length === 5) triggerCombo("BLAZZE COMBO x5!");
    };

    const handlePointerAction = (currentX: number, currentY: number) => {
      const now = performance.now();
      const dt = now - lastMouseTime;
      
      const dx = currentX - lastMouse.x;
      const dy = currentY - lastMouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const velocity = dt > 0 ? dist / dt : 0; // px per ms

      // If moving sufficiently fast or mouse is down, generate trail
      if (velocity > 0.05 || isMouseDown) {
        trail.push({ x: currentX, y: currentY, age: 0 });
        if (trail.length > 12) trail.shift();
      }

      // Detect slices
      if (trail.length > 1 && (velocity > 0.3 || isMouseDown)) {
        const x1 = lastMouse.x;
        const y1 = lastMouse.y;
        const x2 = currentX;
        const y2 = currentY;

        items.forEach(item => {
          if (!item.sliced) {
            const hitDist = distPointToLine(item.x, item.y, x1, y1, x2, y2);
            if (hitDist < item.size * 0.7) {
              sliceItem(item);
            }
          }
        });
      }

      lastMouse = { x: currentX, y: currentY };
      lastMouseTime = now;
    };

    const mouseMove = (e: MouseEvent) => handlePointerAction(e.clientX, e.clientY);
    const touchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerAction(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const clickDown = (e: Event) => { isMouseDown = true; };
    const clickUp = (e: Event) => { isMouseDown = false; };

    // Need to use window so we get events everywhere in hero
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("mousedown", clickDown);
    window.addEventListener("mouseup", clickUp);
    window.addEventListener("touchstart", clickDown, { passive: true });
    window.addEventListener("touchend", clickUp);

    let af: number;
    const loop = (timestamp: number) => {
      const dt = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      // Spawn in bursts
      spawnTimer += dt;
      if (spawnTimer > nextSpawnDelay) {
        const burstCount = Math.floor(Math.random() * 2) + 1; // Spawn 1 to 2
        for(let i=0; i<burstCount; i++) {
          spawnItem();
        }
        spawnTimer = 0;
        nextSpawnDelay = Math.random() * 600 + 400; // Wait 400-1000ms
      }

      // Update & Draw Trail
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for(let i=1; i<trail.length; i++) {
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // Gradient stroke
        const grad = ctx.createLinearGradient(trail[0].x, trail[0].y, trail[trail.length-1].x, trail[trail.length-1].y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(1, "rgba(255, 215, 0, 0.8)"); // golden
        ctx.strokeStyle = grad;
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += dt;
        if (trail[i].age > 150) {
          trail.splice(i, 1);
        }
      }

      // Update & Draw Items
      for (let i = items.length - 1; i >= 0; i--) {
        const p = items[i];
        
        if (!p.sliced) {
          p.vy += 0.15; // gravity
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotSpeed;

          // Wobble
          const wobble = Math.sin(timestamp * 0.01 + p.x) * 0.1;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation + wobble);
          ctx.font = `${p.size}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Shadow removed to massively improve Canvas 2D performance and fix lag!
          ctx.fillText(p.char, 0, 0);
          ctx.restore();

          if (p.y > height + 100 || p.x < -100 || p.x > width + 100) {
            items.splice(i, 1);
          }
        } else {
          // Sliced animation (Chop into 4 pieces)
          p.age += dt;
          p.vy += 0.2; // heavier gravity on halves
          p.x += p.vx;
          p.y += p.vy;

          p.splitOffset += dt * 0.15; // Pieces dynamically drift apart

          const alpha = Math.max(0, 1 - p.age / 600);

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.font = `${p.size}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const pieces = [
            { rx: -p.size, ry: -p.size, rw: p.size, rh: p.size, dx: -p.splitOffset, dy: -p.splitOffset, ro: -1 }, // TL
            { rx: 0, ry: -p.size, rw: p.size, rh: p.size, dx: p.splitOffset, dy: -p.splitOffset, ro: 1 },         // TR
            { rx: -p.size, ry: 0, rw: p.size, rh: p.size, dx: -p.splitOffset, dy: p.splitOffset, ro: -1 },         // BL
            { rx: 0, ry: 0, rw: p.size, rh: p.size, dx: p.splitOffset, dy: p.splitOffset, ro: 1 },                 // BR
          ];

          pieces.forEach(piece => {
            ctx.save();
            ctx.translate(p.x + piece.dx, p.y + piece.dy);
            ctx.rotate(p.rotation + p.age * 0.006 * piece.ro);
            // Shrink the pieces as they fall apart to simulate turning into powder
            ctx.scale(alpha, alpha); 
            ctx.beginPath();
            ctx.rect(piece.rx, piece.ry, piece.rw, piece.rh);
            ctx.clip();
            ctx.fillText(p.char, 0, 0);
            ctx.restore();
          });

          ctx.restore();

          if (p.age > 600) items.splice(i, 1);
        }
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        p.vy += 0.2; // gravity
        p.x += p.vx;
        p.y += p.vy;

        const alpha = Math.max(0, 1 - p.age / p.maxAge);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.age > p.maxAge) particles.splice(i, 1);
      }

      // Popups
      for (let i = popups.length - 1; i >= 0; i--) {
        const p = popups[i];
        p.age += dt;
        p.y -= 1; // float up

        const alpha = Math.max(0, 1 - p.age / p.maxAge);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 24px var(--font-display), sans-serif";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 4;
        ctx.fillText(p.text, p.x, p.y);
        ctx.restore();

        if (p.age > p.maxAge) popups.splice(i, 1);
      }

      // Combo Display
      if (comboDisplay.opacity > 0) {
        comboDisplay.age += dt;
        if (comboDisplay.scale < 1.2) comboDisplay.scale += 0.1;
        if (comboDisplay.age > 1000) {
          comboDisplay.opacity -= 0.05;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, comboDisplay.opacity);
        ctx.translate(width / 2, height / 2 - 100);
        ctx.scale(comboDisplay.scale, comboDisplay.scale);
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 48px var(--font-display), sans-serif";
        ctx.textAlign = "center";
        ctx.shadowColor = "#ff3300";
        ctx.shadowBlur = 15;
        ctx.fillText(comboDisplay.text, 0, 0);
        ctx.restore();
      }

      // Score UI
      ctx.save();
      ctx.fillStyle = "#E8E1D9";
      ctx.font = "600 20px var(--font-display), sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 4;
      ctx.fillText(`SCORE: ${score}`, width - 30, 30);
      ctx.restore();

      af = requestAnimationFrame(loop);
    };

    af = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("mousedown", clickDown);
      window.removeEventListener("mouseup", clickUp);
      window.removeEventListener("touchstart", clickDown);
      window.removeEventListener("touchend", clickUp);
      cancelAnimationFrame(af);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[1] select-none"
      style={{ touchAction: "none" }} // prevent scrolling when swiping on canvas
    />
  );
}
