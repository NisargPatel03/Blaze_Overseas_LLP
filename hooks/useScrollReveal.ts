"use client";
import { useInView } from "react-intersection-observer";

export function useScrollReveal(options = { threshold: 0.15, triggerOnce: true }) {
  const { ref, inView } = useInView({
    threshold: options.threshold,
    triggerOnce: options.triggerOnce,
    rootMargin: "0px 0px -40px 0px" // Slight pre-trigger as requested
  });
  return { ref, isVisible: inView };
}
