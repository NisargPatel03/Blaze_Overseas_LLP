"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MapPin, Phone, Mail, MoveRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", category: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to send');
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ firstName: "", lastName: "", email: "", category: "", message: "" });
            }, 5000);
        } catch (error) {
            console.error(error);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[1400px] mx-auto"
            >
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
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                                <MapPin className="text-amber-700" size={24} />
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
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                                <Phone className="text-amber-700" size={24} />
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
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                                <Mail className="text-amber-700" size={24} />
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
                    <div className="bg-white p-10 rounded-xl border border-gray-100 shadow-2xl shadow-gray-200/50">
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center h-[450px] text-center gap-4 animate-in fade-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h3 className="text-3xl font-display font-bold text-gray-900">Message Sent!</h3>
                                <p className="text-gray-500 max-w-xs">Thank you for reaching out. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-gray-400">First Name</label>
                                        <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} suppressHydrationWarning type="text" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-amber-600 transition-colors text-gray-900 placeholder:text-gray-300" placeholder="John" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                                        <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} suppressHydrationWarning type="text" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-amber-600 transition-colors text-gray-900 placeholder:text-gray-300" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                                    <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} suppressHydrationWarning type="email" className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-amber-600 transition-colors text-gray-900 placeholder:text-gray-300" placeholder="john@example.com" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Product Interest</label>
                                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} suppressHydrationWarning className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-amber-600 transition-colors cursor-pointer text-gray-900">
                                        <option value="" disabled className="bg-white text-gray-400">Select a category</option>
                                        <option value="whole-spices" className="bg-white text-gray-900">Whole Spices</option>
                                        <option value="blended-masala" className="bg-white text-gray-900">Blended Masala</option>
                                        <option value="grains" className="bg-white text-gray-900">Grains</option>
                                        <option value="pulses" className="bg-white text-gray-900">Pulses</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Message</label>
                                    <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="w-full bg-transparent border-b border-gray-200 py-3 focus:outline-none focus:border-amber-600 transition-colors resize-none text-gray-900 placeholder:text-gray-300" placeholder="How can we help you?"></textarea>
                                </div>
                                <button disabled={isLoading} suppressHydrationWarning className="flex items-center justify-center gap-3 w-full py-5 mt-4 bg-amber-600 text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-amber-700 transition-all duration-300 shadow-xl shadow-amber-900/10 hover:shadow-amber-600/40 active:scale-[0.98] rounded-xl disabled:opacity-70">
                                    {isLoading ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : <>Send Message <MoveRight size={20} /></>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
