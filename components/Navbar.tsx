"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About Us", href: "/#about" },
    {
        name: "Products",
        href: "/products",
        subLinks: [
            {
                title: "Categories",
                items: [
                    { name: "Whole Spices", href: "/products/whole-spices" },
                    { name: "Blended Masala", href: "/products/blended-masala" },
                    { name: "Grains", href: "/products/grains" },
                    { name: "Pulses", href: "/products/pulses" }
                ]
            }
        ]
    },
    { name: "Strength", href: "/#strength" },
    { name: "Mission", href: "/#mission" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Contact Us", href: "/#contact" },
    { name: "Enquiry", href: "/#enquiry" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#') && pathname === '/') {
            e.preventDefault();
            const targetId = href.replace('/#', '');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMenuOpen(false);
        setActiveMobileSubmenu(null);
    };

    const toggleMobileSubmenu = (menuName: string) => {
        setActiveMobileSubmenu(prev => prev === menuName ? null : menuName);
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
            <div className="w-full bg-amber-700 text-white text-center py-2 px-4 text-[10px] md:text-xs font-semibold tracking-widest uppercase sticky top-0 left-0 z-[60] h-10 flex items-center justify-center">
                <span className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse"></span>
                    Direct Manufacturer &amp; Exporter from India
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse"></span>
                </span>
            </div>
            <header
                className={cn(
                    "sticky top-10 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 md:px-12",
                    isScrolled
                        ? "py-3 bg-white shadow-md border-b border-amber-100 text-gray-900"
                        : "py-4 bg-white/95 backdrop-blur-md border-b border-gray-100 text-gray-900"
                )}
            >
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <Link href="/" className="group relative z-50 flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 relative overflow-hidden bg-white rounded-md p-1 shadow-sm shrink-0 border border-gray-100">
                            <Image src="/logo.jpg" alt="Blazze Logo" fill className="object-contain" sizes="48px" priority />
                        </div>
                        <span className="font-display text-xl md:text-2xl font-bold tracking-tight uppercase group-hover:text-[var(--color-accent)] transition-colors duration-300 hidden sm:block whitespace-nowrap text-gray-900">
                            Blazze Overseas
                        </span>
                    </Link>
 
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            link.subLinks ? (
                                <div key={link.name} className="relative group py-2">
                                    <span className="text-[13px] font-medium uppercase tracking-widest cursor-pointer flex items-center gap-1 transition-colors duration-300 group-hover:text-[var(--color-accent)] text-gray-800">
                                        {link.name}
                                        <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 text-gray-900">
                                        <div className="bg-white p-3 rounded-sm shadow-xl border border-gray-200 flex flex-col min-w-[160px]">
                                            {link.subLinks.map((subGroup: any) => (
                                                <div key={subGroup.title} className="mb-2 last:mb-0">
                                                    <span className="text-[10px] uppercase tracking-widest text-[#A34E0D] font-bold px-3 block mb-1">
                                                        {subGroup.title}
                                                    </span>
                                                    {subGroup.items.map((subItem: any) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            onClick={(e) => handleMenuClick(e, subItem.href)}
                                                            className="block px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-sm transition-colors whitespace-nowrap text-gray-700 hover:text-[var(--color-accent)]"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleMenuClick(e, link.href)}
                                    className="text-sm font-medium uppercase tracking-widest py-2 transition-colors duration-300 hover:text-[var(--color-accent)]"
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 z-50 text-gray-900">
                        <button
                            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} className="text-gray-900" /> : <Menu size={24} className="text-gray-900" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className="mobile-menu fixed inset-0 z-[55] bg-white text-gray-900 flex flex-col justify-center translate-x-full px-8 pt-20 shadow-2xl">
                <nav className="flex flex-col gap-6 overflow-y-auto pb-8">
                    {navLinks.map((link) => (
                        link.subLinks ? (
                            <div key={link.name} className="flex flex-col gap-4">
                                <div
                                    className="flex items-center justify-between cursor-pointer mobile-link text-4xl font-display uppercase font-light"
                                    onClick={() => toggleMobileSubmenu(link.name)}
                                >
                                    <span>{link.name}</span>
                                    <ChevronDown size={32} className={cn("transition-transform duration-300", activeMobileSubmenu === link.name && "rotate-180")} />
                                </div>
                                <div className={cn(
                                    "flex-col gap-4 pl-4 overflow-hidden transition-all duration-300",
                                    activeMobileSubmenu === link.name ? "flex max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                                )}>
                                    {link.subLinks.map((subGroup: any) => (
                                        <div key={subGroup.title} className="flex flex-col gap-3">
                                            <span className="text-sm uppercase tracking-widest text-[#A34E0D] font-bold">
                                                {subGroup.title}
                                            </span>
                                            {subGroup.items.map((subItem: any) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    onClick={(e) => handleMenuClick(e, subItem.href)}
                                                    className="text-2xl font-display uppercase font-light text-[var(--foreground)]/70 hover:text-[var(--color-accent)] transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleMenuClick(e, link.href)}
                                className="mobile-link text-4xl font-display uppercase font-light"
                            >
                                {link.name}
                            </Link>
                        )
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
