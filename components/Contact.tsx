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
                clearProps: "all"
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="contact"
            ref={containerRef}
            className="py-24 md:pt-16 md:pb-32 px-6 md:px-12 bg-rustic-section-1"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-12">
                    <span className="contact-header flex items-center justify-center gap-3 text-amber-700 font-bold tracking-widest text-lg font-display uppercase mb-4">
                        <span className="w-8 h-0.5 bg-amber-600 inline-block"></span> Get In Touch <span className="w-8 h-0.5 bg-amber-600 inline-block"></span>
                    </span>
                    <h2 className="contact-header text-4xl md:text-5xl lg:text-6xl font-display font-medium text-balance text-gray-900">
                        Let's build something exceptional.
                    </h2>
                </div>

                <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Info */}
                    <div className="flex flex-col gap-10">
                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                <MapPin className="text-[var(--color-accent)]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-medium mb-2 text-gray-900">Corporate Office</h4>
                                <p className="text-gray-600 leading-relaxed max-w-sm">
                                    Shop No. 325, 3rd Floor, Empire Midway,<br />
                                    GIDC, Near New Bus Stand,<br />
                                    Sanala Road, Morbi, Gujarat, India
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                <Phone className="text-[var(--color-accent)]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-medium mb-2 text-gray-900">Contact Numbers</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    +91 77779 84018<br />
                                    +91 77779 83019
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                                <Mail className="text-[var(--color-accent)]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-display font-medium mb-2 text-gray-900">Email Address</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    blazzeoverseasllp@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-10 rounded-sm border border-gray-200 shadow-xl shadow-gray-100">
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium uppercase tracking-widest text-gray-500">First Name</label>
                                    <input suppressHydrationWarning type="text" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-gray-900 placeholder:text-gray-400" placeholder="John" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium uppercase tracking-widest text-gray-500">Last Name</label>
                                    <input suppressHydrationWarning type="text" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-gray-900 placeholder:text-gray-400" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium uppercase tracking-widest text-gray-500">Email Address</label>
                                <input suppressHydrationWarning type="email" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-gray-900 placeholder:text-gray-400" placeholder="john@example.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium uppercase tracking-widest text-gray-500">Product Interest</label>
                                <select suppressHydrationWarning defaultValue="" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none cursor-pointer text-gray-900">
                                    <option value="" disabled className="bg-white text-gray-400">Select a category</option>
                                    <option value="whole-spices" className="bg-white text-gray-900">Whole Spices</option>
                                    <option value="blended-masala" className="bg-white text-gray-900">Blended Masala</option>
                                    <option value="grains" className="bg-white text-gray-900">Grains</option>
                                    <option value="pulses" className="bg-white text-gray-900">Pulses</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium uppercase tracking-widest text-gray-500">Message</label>
                                <textarea rows={4} className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none text-gray-900 placeholder:text-gray-400" placeholder="How can we help you?"></textarea>
                            </div>
                            <button suppressHydrationWarning className="flex items-center justify-center gap-3 w-full py-4 mt-4 bg-[#E8A33A] text-white font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-accent)] transition-colors duration-300 shadow-md shadow-amber-100">
                                Send Message <MoveRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
