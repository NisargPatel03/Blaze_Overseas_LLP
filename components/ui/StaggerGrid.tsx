"use client";
import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function StaggerGrid({
  children,
  className = "",
  staggerDelay = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          style: {
            ...((child.props as any).style || {}),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
            transition: `opacity 0.5s ease, transform 0.5s cubic-bezier(.22,1,.36,1)`,
            transitionDelay: `${index * staggerDelay}s`,
          },
        } as React.HTMLAttributes<HTMLElement>);
      })}
    </div>
  );
}
