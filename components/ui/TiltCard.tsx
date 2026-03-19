"use client";
import React, { useRef, useState, useEffect } from "react";

export function TiltCard({
  children,
  className = "",
  intensity = 12,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setGlowPos({ x, y });
    
    const rotX = (x / rect.width - 0.5) * intensity;
    const rotY = (y / rect.height - 0.5) * intensity;
    setRotation({ x: rotX, y: -rotY });
  };

  const handleMouseEnter = () => !isMobile && setIsHovered(true);
  
  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className} ${isHovered ? 'z-10' : 'z-0'}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isMobile 
          ? "none" 
          : `perspective(700px) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: isHovered ? "none" : "transform 0.6s cubic-bezier(.34,1.56,.64,1)",
        willChange: isHovered ? "transform" : "auto",
        transformStyle: "preserve-3d"
      }}
    >
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-50 mix-blend-screen"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glowPos.x}px ${glowPos.y}px, rgba(245,166,35,0.15), transparent 60%)`,
            borderRadius: "inherit"
          }}
        />
      )}
      {children}
    </div>
  );
}
