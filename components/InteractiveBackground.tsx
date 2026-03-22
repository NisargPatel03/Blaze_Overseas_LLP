"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        
        let mouse = {
            x: -1000,
            y: -1000,
            radius: 120
        };

        const colors = [
            '#F59E0B', // amber-500
            '#D97706', // amber-600
            '#FCD34D', // amber-300
            '#E2E8F0', // slate-200 (for contrast/silver)
            '#9A3412', // orange-800
        ];

        class Particle {
            x: number;
            y: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;
            color: string;
            angle: number;
            speed: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = Math.random() * 2 + 1;
                this.density = (Math.random() * 30) + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.5 + 0.1;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                // Draw as a small dash/line based on angle to mimic the user request
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.fillRect(-this.size, -this.size/2, this.size * 3, this.size);
                ctx.restore();
            }

            update() {
                // Natural slow float
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                // Screen wrap
                if (this.x > canvas!.width + 10) this.x = -10;
                if (this.x < -10) this.x = canvas!.width + 10;
                if (this.y > canvas!.height + 10) this.y = -10;
                if (this.y < -10) this.y = canvas!.height + 10;

                // Mouse Repulsion
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;
                    
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }

        const init = () => {
            particles = [];
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            let numberOfParticles = (canvas.width * canvas.height) / 15000;
            // Cap at 200 particles for performance
            if (numberOfParticles > 200) numberOfParticles = 200;

            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        init();
        animate();

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 z-[-1] pointer-events-none opacity-40 mix-blend-multiply" 
        />
    );
}
