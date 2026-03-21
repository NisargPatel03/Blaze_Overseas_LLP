"use client";

import { ArrowRight, Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#111827] text-white pt-24 pb-12 px-6 md:px-12" id="contact">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">

                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <Link href="/" className="inline-block">
                            <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mb-6">Blazze Overseas</h3>
                        </Link>
                        <p className="text-white/60 text-lg max-w-sm text-balance">
                            Premium exporter of spices, rice, and pulses with world-class quality and global reach.
                        </p>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h4 className="text-sm uppercase tracking-widest text-white/40 mb-2">Company</h4>
                        <Link href="#about" className="hover:text-[var(--color-accent)] transition-colors w-fit">About Us</Link>
                        <Link href="#products" className="hover:text-[var(--color-accent)] transition-colors w-fit">Products</Link>
                        <Link href="#certifications" className="hover:text-[var(--color-accent)] transition-colors w-fit">Quality Assurance</Link>
                        <Link href="#contact" className="hover:text-[var(--color-accent)] transition-colors w-fit">Contact Us</Link>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h4 className="text-sm uppercase tracking-widest text-white/40 mb-2">Contact</h4>
                        <a href="mailto:blazzeoverseasllp@gmail.com" className="hover:text-[var(--color-accent)] transition-colors w-fit">blazzeoverseasllp@gmail.com</a>
                        <p className="text-white/80">+91 77779 84018<br/>+91 77779 83019</p>
                        <p className="text-white/80 mt-4">Gujarat, India</p>
                    </div>

                    <div className="lg:col-span-4">
                        <h4 className="text-sm uppercase tracking-widest text-white/40 mb-6">Newsletter</h4>
                        <div className="relative border-b border-white/20 pb-4 flex items-center group">
                            <input
                                suppressHydrationWarning
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/40 placeholder:uppercase placeholder:tracking-widest placeholder:text-sm"
                            />
                            <button suppressHydrationWarning aria-label="Subscribe" className="text-white/40 group-hover:text-[var(--color-accent)] transition-colors">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-white/40 mt-4 uppercase tracking-widest">
                            Subscribe for exclusive collections and design insights.
                        </p>
                    </div>

                </div>

                <div className="border-t border-white/5 pt-8 mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm opacity-60">
                        Blazze – Taste of Purity | © {new Date().getFullYear()} Blazze Overseas LLP
                    </p>

                    <div className="flex items-center gap-6 text-white/40">
                        <a href="https://wa.me/917777984018" target="_blank" className="hover:text-[#25D366] hover:scale-110 transition-all text-sm font-medium">WHATSAPP</a>
                        <a href="#" className="hover:text-white hover:scale-110 transition-all"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-[#0077b5] hover:scale-110 transition-all"><Linkedin size={20} /></a>
                        <a href="mailto:blazzeoverseasllp@gmail.com" className="hover:text-white hover:scale-110 transition-all"><Mail size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
