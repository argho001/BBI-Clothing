import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppWidget = () => {
  return (
    <a
      href="https://wa.me/8801765568317"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-emerald-500/50"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute -inset-2 animate-pulse rounded-full bg-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <MessageCircle className="relative z-10 h-7 w-7" />
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none transform translate-x-4 group-hover:translate-x-0">
        আমাদের সাথে চ্যাট করুন
      </span>
    </a>
  );
};

export default WhatsAppWidget;
