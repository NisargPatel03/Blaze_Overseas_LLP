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

        const xTo = gsap.quickTo(cursor, "x", { duration: 0, ease: "none" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0, ease: "none" });

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Move the dot instantly using optimized quickTo
            xTo(mouseX);
            yTo(mouseY);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target && target.closest) {
                const isClickable = target.closest("a, button, input, textarea, .magnetic, [role='button']");
                if (isClickable) {
                    handleHoverIn();
                } else {
                    handleHoverOut();
                }
            }
        };

        let animationFrameId: number;
        // Smooth follow loop for the outer ring
        const loop = () => {
            followerX += (mouseX - followerX) * 0.15; // smoothness factor
            followerY += (mouseY - followerY) * 0.15;

            gsap.set(follower, {
                x: followerX - 20, // offset half size (40px)
                y: followerY - 20,
            });

            animationFrameId = requestAnimationFrame(loop);
        };

        const onMouseDown = () => {
            gsap.to([cursor, follower], { scale: 0.8, duration: 0.2 });
        };

        const onMouseUp = () => {
            gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        window.addEventListener("mousedown", onMouseDown, { passive: true });
        window.addEventListener("mouseup", onMouseUp, { passive: true });

        // Start animation loop
        animationFrameId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            cancelAnimationFrame(animationFrameId);
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
