"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MapPin, Phone, Mail, MoveRight } from "lucide-react";

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".contact-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
            });

            gsap.from(".contact-content > div", {
                scrollTrigger: {
                    trigger: ".contact-content",
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="contact"
            ref={containerRef}
            className="py-24 md:py-32 px-6 md:px-12 bg-rustic-section-1"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <span className="contact-header text-[var(--color-accent)] font-medium uppercase tracking-widest text-sm block mb-4">
                        Get In Touch
                    </span>
                    <h2 className="contact-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance text-[#F0E8DE]">
                        Let's build something exceptional.
                    </h2>
                </div>

                <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info */}
                    <div className="flex flex-col gap-10">
                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-[#2B170C] rounded-full flex items-center justify-center shrink-0">
                                <MapPin className="text-[var(--color-accent)]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-medium mb-2 text-[#F0E8DE]">Corporate Office</h4>
                                <p className="text-[#E8DDD4]/70 leading-relaxed max-w-sm">
                                    123 Global Business Hub,<br />
                                    Export Avenue, District 9,<br />
                                    Gujarat, India
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-[#2B170C] rounded-full flex items-center justify-center shrink-0">
                                <Phone className="text-[var(--color-accent)]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-medium mb-2 text-[#F0E8DE]">Contact Numbers</h4>
                                <p className="text-[#E8DDD4]/70 leading-relaxed">
                                    +91 77779 84018
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-[#2B170C] rounded-full flex items-center justify-center shrink-0">
                                <Mail className="text-[var(--color-accent)]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-medium mb-2 text-[#F0E8DE]">Email Address</h4>
                                <p className="text-[#E8DDD4]/70 leading-relaxed">
                                    blazzeoverseasllp@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-rustic-card p-10 rounded-sm border border-[#382415]">
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">First Name</label>
                                    <input suppressHydrationWarning type="text" className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="John" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">Last Name</label>
                                    <input suppressHydrationWarning type="text" className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">Email Address</label>
                                <input suppressHydrationWarning type="email" className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="john@example.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">Product Interest</label>
                                <select suppressHydrationWarning defaultValue="" className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none cursor-pointer">
                                    <option value="" disabled className="bg-background text-[#E8DDD4]">Select a category</option>
                                    <option value="whole-spices" className="bg-background text-[#E8DDD4]">Whole Spices</option>
                                    <option value="blended-masala" className="bg-background text-[#E8DDD4]">Blended Masala</option>
                                    <option value="grains" className="bg-background text-[#E8DDD4]">Grains</option>
                                    <option value="pulses" className="bg-background text-[#E8DDD4]">Pulses</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium uppercase tracking-widest text-[#E8DDD4]/70">Message</label>
                                <textarea rows={4} className="w-full bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button suppressHydrationWarning className="flex items-center justify-center gap-3 w-full py-4 mt-4 bg-[#E8A33A] text-[#1A0A02] font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-300">
                                Send Message <MoveRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
