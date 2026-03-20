"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";
import { usePathname } from "next/navigation";

export function Preloader() {
    const { progress, active } = useProgress();
    const [hidden, setHidden] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(0);

    // Smoothly interpolate the progress value
    useEffect(() => {
        const tween = gsap.to(
            { val: displayProgress },
            {
                val: progress,
                duration: 2.5,
                ease: "power2.out",
                onUpdate: function () {
                    setDisplayProgress(this.targets()[0].val);
                },
            }
        );
        return () => {
            tween.kill();
        };
    }, [progress]);

    useEffect(() => {
        // We wait until 3D assets are loaded
        if (!active && progress === 100 && displayProgress > 99) {
            const tl = gsap.timeline({
                onComplete: () => setHidden(true),
            });

            // The cinematic reveal
            tl.to(".preloader-brand", {
                scale: 1.15,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1.2,
                ease: "power3.inOut"
            })
                // Open the cinematic doors to reveal the 3D Hero scene
                .to(".preloader-half-top", {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "power4.inOut"
                }, "-=0.6")
                .to(".preloader-half-bottom", {
                    yPercent: 100,
                    duration: 1.2,
                    ease: "power4.inOut"
                }, "-=1.2");
        }
    }, [active, progress, displayProgress]);

    // Only run this specific 3D preloader on the home page
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    if (hidden || !isHomePage) return null;

    return (
        <div className="fixed inset-0 z-[999] pointer-events-none flex flex-col items-center justify-center overflow-hidden">
            {/* Top Door */}
            <div className="preloader-half-top absolute top-0 left-0 w-full h-[50vh] bg-[#050505] transform-gpu" />

            {/* Bottom Door */}
            <div className="preloader-half-bottom absolute bottom-0 left-0 w-full h-[50vh] bg-[#050505] transform-gpu" />

            {/* Center Content */}
            <div className="preloader-brand relative z-10 flex flex-col items-center justify-center">

                {/* Outline Text filling up visually */}
                <div className="relative flex justify-center items-center px-4 w-full">
                    <span
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl w-full text-center font-display font-light text-transparent uppercase tracking-widest leading-none"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
                    >
                        Blazze Overseas
                    </span>
                    <span
                        className="absolute left-0 top-0 w-full text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium text-[var(--color-accent)] uppercase tracking-widest whitespace-nowrap overflow-hidden transition-all duration-75 leading-none"
                        style={{ clipPath: `inset(0 ${100 - displayProgress}% 0 0)` }}
                    >
                        Blazze Overseas
                    </span>
                </div>

                <p className="mt-8 text-[10px] md:text-xs tracking-[0.5em] text-white/50 uppercase font-light">
                    Premium Spices & Grains
                </p>

                <div className="mt-6 flex flex-col items-center">
                    <span className="text-xs uppercase tracking-[0.4em] font-medium text-white/30">
                        {Math.round(displayProgress)}%
                    </span>
                </div>

            </div>
        </div>
    );
}
