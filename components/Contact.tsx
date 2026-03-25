"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, MoveRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = ({ width = 24, height = 24, fill = "currentColor", className = "" }: { width?: number, height?: number, fill?: string, className?: string }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.333.158 11.892c0 2.098.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
  </svg>
);

const countries = [
  { flag: '🇮🇳', name: 'India', code: '+91' },
  { flag: '🇦🇪', name: 'UAE', code: '+971' },
  { flag: '🇸🇦', name: 'Saudi Arabia', code: '+966' },
  { flag: '🇬🇧', name: 'UK', code: '+44' },
  { flag: '🇺🇸', name: 'USA', code: '+1' },
  { flag: '🇨🇦', name: 'Canada', code: '+1' },
  { flag: '🇦🇺', name: 'Australia', code: '+61' },
  { flag: '🇩🇪', name: 'Germany', code: '+49' },
  { flag: '🇯🇵', name: 'Japan', code: '+81' },
  { flag: '🇸🇬', name: 'Singapore', code: '+65' },
  { flag: '🇿🇦', name: 'South Africa', code: '+27' },
  { flag: '🇳🇬', name: 'Nigeria', code: '+234' },
  { flag: '🇰🇪', name: 'Kenya', code: '+254' },
  { flag: '🇧🇩', name: 'Bangladesh', code: '+880' },
  { flag: '🇵🇰', name: 'Pakistan', code: '+92' }
];

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({ name: "", company: "", email: "", country: "+91", product: "", quantity: "", packaging: "", message: "" });
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [isValidPhone, setIsValidPhone] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const waNumber = "917777984018";
    const waLink = `https://wa.me/${waNumber}`;

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPhone(value);
        setIsValidPhone(value.length >= 6);
    };

    const handleSubmit = async (e: React.FormEvent, forceWhatsApp = false) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const userWaNumber = countryCode.replace('+', '') + phone;
            const enhancedFormData = {
                firstName: formData.name, 
                lastName: formData.company ? `(${formData.company})` : '',
                email: formData.email,
                category: formData.product,
                message: `WhatsApp: +${userWaNumber}\nQuantity: ${formData.quantity}\nPackaging: ${formData.packaging}\n\nMessage:\n${formData.message}`
            };

            // Non-blocking fetch dispatch
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enhancedFormData),
            }).catch(console.error);

            const waMessage = encodeURIComponent(
                `Hi Blazze Overseas,\n\nName: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nProduct Interest: ${formData.product || 'N/A'}\nQuantity: ${formData.quantity || 'N/A'}\nMessage: ${formData.message}`
            );

            if (forceWhatsApp) {
                window.open(`${waLink}?text=${waMessage}`, '_blank');
            } else {
                alert("Message sent securely to our team!");
            }
            
            setFormData({ name: "", company: "", email: "", country: "+91", product: "", quantity: "", packaging: "", message: "" });
            setPhone("");
            setIsValidPhone(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useGSAP(() => {
        gsap.from(".form-animated-element", {
            scrollTrigger: {
                trigger: formRef.current,
                start: "top 85%",
            },
            x: -30,
            opacity: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: "power2.out",
        });

        gsap.from(".contact-card", {
            scrollTrigger: {
                trigger: ".contact-cards-container",
                start: "top 80%",
            },
            x: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power2.out",
        });

        gsap.from(".qr-section", {
            scrollTrigger: {
                trigger: ".qr-section",
                start: "top 90%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
        });
    }, { scope: containerRef });

    return (
        <section
            id="contact"
            ref={containerRef}
            className="w-full bg-white text-gray-900 border-t border-gray-100 overflow-hidden py-16"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-16 py-8">
                
                {/* Header */}
                <div className="text-center md:text-left form-animated-element">
                    <span className="text-[#F5A623] font-bold tracking-widest text-sm uppercase mb-3 block">
                        Get In Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-gray-900 mb-4">
                        Let's build something exceptional.
                    </h2>
                    <p className="text-gray-500 text-base max-w-2xl">
                        Submit a bulk order inquiry or connect directly with our export team via WhatsApp for the fastest response times.
                    </p>
                </div>

                {/* 2-Column Split */}
                <div className="flex flex-col lg:flex-row gap-16 w-full relative">
                    
                    {/* LEFT (55%) -> Form */}
                    <div className="w-full lg:w-[55%]">
                        <form ref={formRef} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 form-animated-element">
                                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} suppressHydrationWarning type="text" placeholder="Full Name *" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 focus:outline-none focus:border-[#F5A623] transition-colors text-gray-900 placeholder:text-gray-400" />
                                <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} suppressHydrationWarning type="text" placeholder="Company Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 focus:outline-none focus:border-[#F5A623] transition-colors text-gray-900 placeholder:text-gray-400" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 form-animated-element">
                                <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} suppressHydrationWarning type="email" placeholder="Email Address *" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 focus:outline-none focus:border-[#F5A623] transition-colors text-gray-900 placeholder:text-gray-400" />
                                <select suppressHydrationWarning value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 focus:outline-none focus:border-[#F5A623] transition-colors text-gray-600 outline-none">
                                    {countries.map(c => <option key={c.name} value={c.code} className="bg-white">{c.flag} {c.name}</option>)}
                                </select>
                            </div>

                            {/* SMART PHONE / WHATSAPP FIELD */}
                            <div className="form-animated-element flex flex-col gap-2 relative z-20 mt-1">
                                <div 
                                    className="relative bg-white rounded-xl flex items-center gap-3 transition-colors duration-300"
                                    style={{ 
                                        padding: '14px 16px', 
                                        border: `1px solid ${isValidPhone ? 'rgba(37,211,102,0.5)' : isFocused ? 'rgba(245,166,35,0.7)' : 'rgba(0,0,0,0.1)'}`,
                                        boxShadow: isFocused ? '0 0 0 4px rgba(245,166,35,0.05)' : isValidPhone ? '0 0 0 4px rgba(37,211,102,0.05)' : 'none'
                                    }}
                                >
                                    <div className="flex-shrink-0 flex items-center bg-transparent border-none outline-none text-[#F5A623]">
                                        <select suppressHydrationWarning 
                                            value={countryCode} 
                                            onChange={e => setCountryCode(e.target.value)}
                                            className="bg-transparent appearance-none border-none outline-none text-[#A34E0D] font-medium pr-2 cursor-pointer"
                                        >
                                            {countries.map(c => (
                                                <option key={c.name} value={c.code} className="bg-white text-gray-900">{c.flag} {c.code}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <input suppressHydrationWarning
                                        type="tel" 
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="Enter your phone number"
                                        className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400 w-full"
                                        required
                                    />

                                    <div className="flex flex-col items-center justify-center min-w-[50px]">
                                        <WhatsAppIcon 
                                            width={18} height={18} 
                                            className={isValidPhone ? "transform hover:scale-110 transition-transform" : (phone.length > 0 && phone.length < 6) ? "animate-pulse" : ""}
                                            fill={isValidPhone ? "#25D366" : (phone.length > 0 && phone.length < 6) ? "rgba(37,211,102,0.4)" : "rgba(0,0,0,0.15)"} 
                                        />
                                        <span style={{ fontSize: '9px', marginTop: '2px', color: isValidPhone ? 'rgba(37,211,102,0.8)' : 'rgba(0,0,0,0.25)' }}>
                                            {isValidPhone ? 'wa ready' : 'WhatsApp'}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Status Pills & Text */}
                                <AnimatePresence>
                                    {isValidPhone && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-1 bg-[rgba(37,211,102,0.08)] border border-[rgba(37,211,102,0.25)] rounded-md px-3 py-1.5 w-fit"
                                        >
                                            <span style={{ fontSize: '11px', color: '#16a34a' }}>
                                                We'll reach you on WhatsApp: {countryCode} {phone}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex items-center gap-1.5 mt-1" style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)' }}>
                                    <WhatsAppIcon width={12} height={12} fill="#25D366" /> 
                                    <span>Your phone number will be used as WhatsApp contact</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 form-animated-element mt-1">
                                <select suppressHydrationWarning required value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 focus:outline-none focus:border-[#F5A623] transition-colors text-gray-600">
                                    <option value="" disabled className="bg-white">Product Interest *</option>
                                    <option value="whole-spices" className="bg-white text-gray-900">Whole Spices</option>
                                    <option value="blended-masala" className="bg-white text-gray-900">Blended Masala</option>
                                    <option value="grains" className="bg-white text-gray-900">Grains</option>
                                    <option value="pulses" className="bg-white text-gray-900">Pulses</option>
                                </select>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 form-animated-element mt-1">
                                <input value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} suppressHydrationWarning type="text" placeholder="Quantity Required" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 focus:outline-none focus:border-[#F5A623] transition-colors text-gray-900 placeholder:text-gray-400" />
                                <input value={formData.packaging} onChange={e => setFormData({...formData, packaging: e.target.value})} suppressHydrationWarning type="text" placeholder="Packaging Preference" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 focus:outline-none focus:border-[#F5A623] transition-colors text-gray-900 placeholder:text-gray-400" />
                            </div>

                            <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="form-animated-element w-full bg-gray-50 border border-gray-200 rounded-xl py-4 px-4 focus:outline-none focus:border-[#F5A623] transition-colors resize-none text-gray-900 placeholder:text-gray-400 mt-2" placeholder="Message or Details *"></textarea>

                            {/* Dual Button */}
                            <div className="form-animated-element mt-4 flex rounded-xl overflow-hidden shadow-lg h-[56px]">
                                <button suppressHydrationWarning type="button" onClick={(e) => handleSubmit(e, false)} disabled={isLoading} className="w-[60%] h-full bg-[#A34E0D] hover:bg-[#8B4513] active:scale-[0.99] transition-transform text-white text-[15px] font-semibold flex items-center justify-center gap-2">
                                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Send Inquiry"}
                                </button>
                                <button suppressHydrationWarning type="button" onClick={(e) => handleSubmit(e, true)} disabled={isLoading} className="w-[40%] h-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] transition-transform text-white text-[13px] font-medium flex items-center justify-center gap-2 border-l border-white/20">
                                    <WhatsAppIcon width={18} height={18} fill="#fff" />
                                    Open WhatsApp
                                </button>
                            </div>
                            <div className="form-animated-element text-center flex items-center justify-center gap-1 mt-2">
                                <WhatsAppIcon width={10} height={10} fill="#25D366" />
                                <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)' }}>We typically respond within 1 hour on WhatsApp</span>
                            </div>

                        </form>
                    </div>

                    {/* RIGHT (45%) -> Info Cards */}
                    <div className="w-full lg:w-[45%] contact-cards-container flex flex-col gap-4">
                        
                        {/* WhatsApp Direct */}
                        <div className="contact-card bg-green-50 border border-green-100 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <WhatsAppIcon width={28} height={28} fill="#25D366" />
                                <span className="text-gray-900 font-bold">Chat on WhatsApp</span>
                            </div>
                            <div className="text-gray-900 text-2xl font-black tracking-wider mb-1 relative z-10">+91 77779 84018</div>
                            <div className="text-gray-600 text-sm mb-6 relative z-10">Fastest response — usually within 1 hour</div>
                            <a href={waLink} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 h-12 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#1fae54] transition-colors relative z-10 shadow-lg shadow-[#25D366]/20 group">
                                Open WhatsApp Chat <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Phone Call */}
                        <div className="contact-card bg-amber-50 border border-amber-100/60 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Phone size={24} className="text-[#A34E0D]" fill="currentColor" />
                                <span className="text-gray-900 font-bold">Call Us</span>
                            </div>
                            <div className="text-gray-900 text-2xl font-black tracking-wider mb-1">+91 77779 83019</div>
                            <div className="text-gray-600 text-sm mb-4">Mon–Sat, 9am–6pm IST</div>
                            
                            <div className="bg-amber-100/50 border-l-2 border-[#A34E0D] px-3 py-2 mb-6 rounded-r-md">
                                <p className="text-[11px] text-[#A34E0D] font-medium leading-relaxed">International callers: WhatsApp is recommended for cross-country communication</p>
                            </div>

                            <a href="tel:+917777983019" className="w-full flex items-center justify-center gap-2 h-12 border border-amber-200 text-[#A34E0D] hover:bg-amber-100/50 rounded-xl font-medium transition-colors">
                                Call Now <MoveRight size={16} />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Email */}
                            <div className="contact-card bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <Mail size={18} className="text-amber-600" />
                                    <span className="text-gray-900 font-bold text-sm">Email Us</span>
                                </div>
                                <div className="text-[#A34E0D] font-medium text-[13px] break-all mb-2">blazzeoverseasllp@gmail.com</div>
                                <div className="text-gray-500 text-[11px] mb-4">For detailed documentation</div>
                                <a href="mailto:blazzeoverseasllp@gmail.com" className="hover:text-amber-700 text-gray-600 text-sm font-medium transition-colors decoration-amber-600 decoration-1 underline underline-offset-4 pointer-events-auto z-10 relative">Send Email →</a>
                            </div>

                            {/* Location */}
                            <div className="contact-card bg-gray-50 border border-gray-100 rounded-2xl p-5 relative overflow-hidden shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin size={18} className="text-[#A34E0D]" />
                                    <span className="text-gray-900 font-bold text-sm">Our Location</span>
                                </div>
                                <div className="text-gray-800 font-medium text-sm mb-1">Gujarat, India</div>
                                <div className="text-gray-500 text-[11px]">Exporting to 30+ countries</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* BAND: QR Code Section */}
            <div className="w-full bg-amber-50/40 border-y border-amber-100 py-20 mt-16 qr-section">
                <div className="max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12">
                    
                    <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-[0_10px_40px_rgba(245,166,35,0.08)] hover:-translate-y-1 transition-transform duration-500">
                        <QRCodeSVG value={waLink} size={150} fgColor="#A34E0D" bgColor="#FFFFFF" />
                    </div>

                    <div className="flex flex-col text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">Scan to WhatsApp</h3>
                        <p className="text-gray-600 text-[15px] max-w-sm mb-6 leading-relaxed">Point your phone camera at the QR code above to ignite a WhatsApp conversation straight with our export team effortlessly.</p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-sm text-gray-700"><span className="w-6 h-6 rounded-full bg-amber-100 text-[#A34E0D] font-bold flex flex-shrink-0 items-center justify-center text-[11px]">1</span> Open phone camera</div>
                            <div className="flex items-center gap-3 text-sm text-gray-700"><span className="w-6 h-6 rounded-full bg-amber-100 text-[#A34E0D] font-bold flex flex-shrink-0 items-center justify-center text-[11px]">2</span> Point at QR core details</div>
                            <div className="flex items-center gap-3 text-sm text-gray-700"><span className="w-6 h-6 rounded-full bg-amber-100 text-[#A34E0D] font-bold flex flex-shrink-0 items-center justify-center text-[11px]">3</span> Tap the link to chat instantly!</div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
