"use client";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function AnimatedCounter({ 
  target, 
  suffix = "", 
  duration = 1800, 
  prefix = "" 
}: { 
  target: number; 
  suffix?: string; 
  duration?: number;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easedProgress * target));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isVisible, target, duration]);

  return (
    <div ref={ref} className="text-[var(--color-accent)] font-display font-medium text-4xl md:text-5xl">
      {prefix}{count}{suffix}
    </div>
  );
}
