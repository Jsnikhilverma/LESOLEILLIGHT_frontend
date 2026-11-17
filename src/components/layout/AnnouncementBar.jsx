import React, { useState } from 'react';
import { Sparkles, Phone, MapPin, X } from 'lucide-react';
import { brandData } from '../../data/brandData';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="bg-lux-dark text-white text-[11px] font-light tracking-luxury py-2 px-4 border-b border-white/10 relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Location & Hours (Hidden on small mobile) */}
        <div className="hidden lg:flex items-center gap-4 text-lux-dark-muted">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3 h-3 text-lux-gold" />
            <span>Vasant Kunj, New Delhi</span>
          </span>
          <span className="text-white/20">•</span>
          <span>{brandData.contact.hours}</span>
        </div>

        {/* Center: Main announcement */}
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-lux-gold shrink-0 animate-pulse" />
          <span className="tracking-widest uppercase font-medium text-lux-gold text-[10px] sm:text-[11px]">
            {brandData.announcement.title}
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline text-white/90">
            {brandData.announcement.highlight}
          </span>
        </div>

        {/* Right: Phone & Concierge */}
        <div className="hidden md:flex items-center gap-3 text-lux-dark-muted">
          <a
            href={`tel:${brandData.contact.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-1.5 hover:text-lux-gold transition-colors"
          >
            <Phone className="w-3 h-3 text-lux-gold" />
            <span>{brandData.contact.phone}</span>
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/40 hover:text-white p-0.5 ml-2"
            aria-label="Dismiss banner"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
};
