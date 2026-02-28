"use client";

import { ArrowRight, Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 px-6 md:px-12" id="contact">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">

                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <h3 className="text-3xl font-display font-bold uppercase tracking-tight mb-6">Blaze</h3>
                        <p className="text-white/60 text-lg max-w-sm text-balance">
                            Premium ceramics, natural stone, and visionary interior architecture.
                        </p>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h4 className="text-sm uppercase tracking-widest text-white/40 mb-2">Company</h4>
                        <Link href="#about" className="hover:text-[var(--color-accent)] transition-colors w-fit">About Us</Link>
                        <Link href="#collections" className="hover:text-[var(--color-accent)] transition-colors w-fit">Collections</Link>
                        <Link href="#services" className="hover:text-[var(--color-accent)] transition-colors w-fit">Services</Link>
                        <Link href="#projects" className="hover:text-[var(--color-accent)] transition-colors w-fit">Projects</Link>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h4 className="text-sm uppercase tracking-widest text-white/40 mb-2">Contact</h4>
                        <a href="mailto:hello@blazeoverseas.com" className="hover:text-[var(--color-accent)] transition-colors w-fit">hello@blazeoverseas.com</a>
                        <p className="text-white/80">+1 (800) 123-4567</p>
                        <p className="text-white/80 mt-4">1200 Architecture Blvd<br />New York, NY 10012</p>
                    </div>

                    <div className="lg:col-span-4">
                        <h4 className="text-sm uppercase tracking-widest text-white/40 mb-6">Newsletter</h4>
                        <div className="relative border-b border-white/20 pb-4 flex items-center group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/40 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
                            />
                            <button aria-label="Subscribe" className="text-white/40 group-hover:text-[var(--color-accent)] transition-colors">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-white/40 mt-4 uppercase tracking-widest">
                            Subscribe for exclusive collections and design insights.
                        </p>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
                    <p className="text-sm text-white/40 uppercase tracking-widest">
                        © {new Date().getFullYear()} Blaze Overseas LLP. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-white/40">
                        <a href="#" className="hover:text-white hover:scale-110 transition-all"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all"><Linkedin size={20} /></a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all"><Mail size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
