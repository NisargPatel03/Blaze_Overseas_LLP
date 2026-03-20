"use client";
import React from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const waNumber = "917777984018";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center group">
      {/* Tooltip */}
      <div className="mr-4 px-3 py-1.5 bg-white text-gray-600 text-[12px] font-medium rounded-full shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        Chat with us
      </div>

      {/* Button */}
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center justify-center w-[56px] h-[56px] bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:scale-105 transition-transform"
      >
        <MessageCircle size={28} className="text-white relative z-10" />
        
        {/* Pulse Ring */}
        <div className="absolute inset-0 w-full h-full bg-[#25D366] rounded-full opacity-60 animate-[waPulse_2s_ease-out_infinite] pointer-events-none z-0" />
      </a>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes waPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}} />
    </div>
  );
}
