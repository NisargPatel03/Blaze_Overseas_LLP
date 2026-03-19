"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface SplitRevealProps {
    text: string;
    tag?: React.ElementType;
    className?: string;
    delay?: number;
    type?: "chars" | "words" | "lines";
}

export function SplitReveal({ text, tag: Tag = "h2", className = "", delay = 0, type = "words" }: SplitRevealProps) {
    const textRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Uses a slight timeout to ensure fonts are loaded before splitting
        const timeoutId = setTimeout(() => {
            if (!textRef.current) return;
            const split = new SplitType(textRef.current, { types: type });
            
            const targetElements = split[type as 'chars' | 'words' | 'lines'];
            
            if (targetElements) {
                gsap.fromTo(targetElements, 
                    { opacity: 0, y: 30, rotateX: -20 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 0.8,
                        stagger: 0.03,
                        ease: "power3.out",
                        delay: delay,
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [text, delay, type]);

    return (
        // @ts-ignore
        <Tag ref={textRef} className={className} style={{ perspective: "1000px" }}>
            {text}
        </Tag>
    );
}
