"use client";

import React, { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  emojis: string[];
  count?: number;
}

export default function FloatingParticles({ emojis, count = 15 }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || emojis.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      emoji: string;
    }[] = [];
    
    let animationFrameId: number;

    const resizeSettings = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", resizeSettings);
    resizeSettings();

    // Initialize particles
    for (let i = 0; i < count; i++) {
        // Random drift speed between -0.6 and 0.6
        const vx = Math.random() * 1.2 - 0.6;
        const vy = Math.random() * 1.2 - 0.6;
        // Ensure they are not completely static
        const finalVx = Math.abs(vx) < 0.1 ? (vx < 0 ? -0.2 : 0.2) : vx;
        const finalVy = Math.abs(vy) < 0.1 ? (vy < 0 ? -0.2 : 0.2) : vy;

        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 12 + 12, // 12px to 24px
            vx: finalVx,
            vy: finalVy,
            opacity: Math.random() * 0.4 + 0.3, // 0.3 to 0.7
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.05,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
        });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Wrap around edges
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        // Use standard font with no fill style, just the text which renders emoji
        ctx.font = `${p.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeSettings);
      cancelAnimationFrame(animationFrameId);
    };
  }, [emojis, count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
