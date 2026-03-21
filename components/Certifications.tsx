"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const certifications = [
    "ISO 9001:2015 Quality Management",
    "FSSAI Certified Products",
    "APEDA Registered Exporter",
    "Spice Board of India Certified"
];

export default function Certifications() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".cert-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
            });

            gsap.from(".cert-item", {
                scrollTrigger: {
                    trigger: ".cert-list",
                    start: "top 75%",
                },
                x: -30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
                clearProps: "all"
            });
        },
        { scope: containerRef }
    );

    return (
        <section id="certifications" ref={containerRef} className="py-24 md:pt-16 md:pb-16 px-6 md:px-12 bg-white text-gray-900">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[1400px] mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12 items-center">
                    <div>
                        <span className="cert-header flex items-center justify-center lg:justify-start gap-3 text-amber-700 font-bold tracking-widest text-lg font-display uppercase mb-4">
                            <span className="w-8 h-0.5 bg-amber-600 inline-block"></span> Quality Assurance <span className="w-8 h-0.5 bg-amber-600 inline-block"></span>
                        </span>
                        <h2 className="cert-header text-4xl md:text-5xl lg:text-5xl font-display font-medium leading-tight mb-8">
                            Certified Excellence You Can Depend On.
                        </h2>
                        
                        <div className="cert-list flex flex-col gap-5">
                            {certifications.map((cert, i) => (
                                <div key={i} className="cert-item flex items-center gap-4 p-4 rounded-xl bg-[#3D2B1F] border border-[#5C3D2A] hover:bg-[#4A3728] transition-all duration-300 transition shadow-sm group">
                                    <CheckCircle className="text-amber-400 group-hover:scale-110 transition-transform duration-300" size={24} />
                                    <span className="font-medium text-lg text-[#F5E6D3] group-hover:text-white transition-colors">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cert-badge relative flex justify-center lg:justify-end">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center border-4 border-amber-50 rounded-full animate-[spin_20s_linear_infinite]">
                            <div className="absolute inset-0 bg-amber-50/20 rounded-full"></div>
                        </div>
                        <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center text-center p-8 bg-white rounded-full border border-amber-100 shadow-2xl scale-95 md:scale-100">
                            <ShieldCheck className="text-amber-600 w-16 h-16 md:w-20 md:h-20 mb-4" />
                            <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 uppercase tracking-tighter">
                                World Class Quality
                            </h3>
                            <div className="w-12 h-1 bg-amber-600 my-4"></div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                                Global Standards
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
