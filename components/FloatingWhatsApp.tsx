"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingWhatsApp() {
    // Optional: Hide/Show on scroll
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const phoneNumber = "917777984018"; // Blazze WhatsApp

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
        >
            <div className="relative group">
                <Link
                    href={`https://wa.me/${phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1fae54] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle size={32} />
                </Link>
                {/* Tooltip */}
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs font-semibold uppercase tracking-wider rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
                    Chat with us on WhatsApp
                </span>
            </div>
        </div>
    );
}
