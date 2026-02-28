"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "The Vertex Penthouse",
        location: "New York",
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
        size: "large",
    },
    {
        id: 2,
        title: "Lumina Retreat",
        location: "Maldives",
        img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200",
        size: "medium",
    },
    {
        id: 3,
        title: "Aura Flagship",
        location: "London",
        img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
        size: "medium",
    },
    {
        id: 4,
        title: "Zenith Villa",
        location: "Dubai",
        img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
        size: "large",
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".project-card", {
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".projects-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="projects"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-white dark:bg-[#0a0a0a]"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16 text-center flex flex-col items-center">
                    <span className="projects-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                        Selected Work
                    </span>
                    <h2 className="projects-header text-4xl md:text-6xl font-display font-medium max-w-2xl text-balance">
                        Spaces that transcend the ordinary.
                    </h2>
                </div>

                <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {projects.map((project, idx) => (
                        <div
                            key={project.id}
                            className={`project-card group relative overflow-hidden rounded-sm cursor-none bg-neutral-100 dark:bg-neutral-800 ${project.size === "large" ? "aspect-[4/5] md:aspect-[4/5]" : "aspect-square"
                                } ${idx === 1 ? "md:mt-24" : ""} ${idx === 3 ? "md:-mt-24" : ""}`}
                        >
                            <img
                                src={project.img}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <p className="text-[var(--color-accent)] text-sm uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    {project.location}
                                </p>
                                <h3 className="text-white text-3xl font-display font-medium translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Custom cursor follower proxy */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 pointer-events-none z-20">
                                <Plus size={24} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center projects-header">
                    <button className="group relative px-8 py-4 bg-transparent border border-foreground text-foreground overflow-hidden rounded-sm hover:-translate-y-1 transition-transform duration-300">
                        <span className="relative z-10 font-medium uppercase tracking-widest text-sm">
                            View All Projects
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
