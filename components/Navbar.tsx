"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Collections", href: "#collections" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check initial dark mode from OS or localStorage (simplified for now)
        if (document.documentElement.classList.contains("dark")) {
            setIsDarkMode(true);
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return newMode;
        });
    };

    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(".mobile-menu", {
                x: 0,
                duration: 0.8,
                ease: "power4.inOut",
            });
            gsap.fromTo(
                ".mobile-link",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    delay: 0.2,
                    ease: "power3.out",
                }
            );
        } else {
            gsap.to(".mobile-menu", {
                x: "100%",
                duration: 0.8,
                ease: "power4.inOut",
            });
        }
    }, [isMenuOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12",
                    isScrolled
                        ? "py-4 bg-white/70 dark:bg-[#111]/70 backdrop-blur-md shadow-sm"
                        : "py-6 bg-transparent"
                )}
            >
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <Link href="/" className="group relative z-50 flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 relative overflow-hidden bg-white rounded-md p-1 shadow-sm shrink-0">
                            <Image src="/logo.jpg" alt="Blaze Logo" fill className="object-contain" sizes="48px" />
                        </div>
                        <span className="font-display text-xl md:text-2xl font-bold tracking-tight uppercase group-hover:text-[var(--color-accent)] transition-colors duration-300 hidden sm:block whitespace-nowrap">
                            Blaze Overseas
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium uppercase tracking-widest relative overflow-hidden group py-2"
                            >
                                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                                    {link.name}
                                </span>
                                <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full text-[var(--color-accent)] group-hover:translate-y-0">
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 z-50">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className="mobile-menu fixed inset-0 z-40 bg-[var(--background)] flex flex-col justify-center translate-x-full px-8 pt-20">
                <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="mobile-link text-4xl font-display uppercase font-light"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <div className="mt-12 mobile-link">
                    <p className="text-sm opacity-50 mb-2 uppercase tracking-widest">Connect</p>
                    <div className="flex gap-4">
                        <a href="#" className="font-medium hover:text-[var(--color-accent)]">Instagram</a>
                        <a href="#" className="font-medium hover:text-[var(--color-accent)]">LinkedIn</a>
                    </div>
                </div>
            </div>
        </>
    );
}
