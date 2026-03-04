"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        let isHovering = false;

        // Magnetic hover effect listeners
        const handleHoverIn = () => {
            if (isHovering) return;
            isHovering = true;
            gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
            gsap.to(follower, {
                scale: 2,
                backgroundColor: "rgba(193, 122, 78, 0.1)", // Color accent wash
                borderColor: "transparent",
                duration: 0.4,
                ease: "power2.out"
            });
        };

        const handleHoverOut = () => {
            if (!isHovering) return;
            isHovering = false;
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "rgba(193, 122, 78, 0.6)",
                duration: 0.4,
                ease: "power2.out"
            });
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Move the dot instantly
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0,
            });

            // Dynamic event delegation to fix links that appear after animations
            const target = e.target as HTMLElement;
            if (target && target.closest) {
                const isClickable = target.closest("a, button, input, textarea, .magnetic");
                if (isClickable) {
                    handleHoverIn();
                } else {
                    handleHoverOut();
                }
            }
        };

        // Smooth follow loop for the outer ring
        const loop = () => {
            followerX += (mouseX - followerX) * 0.15; // smoothness factor
            followerY += (mouseY - followerY) * 0.15;

            gsap.set(follower, {
                x: followerX - 20, // offset half size (40px)
                y: followerY - 20,
            });

            requestAnimationFrame(loop);
        };

        const onMouseDown = () => {
            gsap.to([cursor, follower], { scale: 0.8, duration: 0.2 });
        };

        const onMouseUp = () => {
            gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        // Start animation loop
        requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-accent)] pointer-events-none z-[9999] mix-blend-difference"
                style={{ transform: "translate(-50%, -50%)" }}
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[var(--color-accent)]/60 pointer-events-none z-[9998] transition-colors duration-300"
            />
        </>
    );
}
