"use client";
import { useState, useEffect, RefObject } from "react";

export function useMousePosition(ref: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPosition({ x, y });
    };

    const element = ref.current;
    if (element) {
      // Use fallback properties for mobile logic later
      if (!window.matchMedia("(hover: none)").matches) {
          element.addEventListener("mousemove", handleMouseMove);
      }
    }
    
    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [ref]);

  return position;
}
