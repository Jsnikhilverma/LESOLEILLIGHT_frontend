import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categoriesData } from '../../data/categoriesData';

export const MegaMenu = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onMouseLeave={onClose}
          className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-lux-border shadow-2xl py-8 px-6 z-30"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-8">
              {/* Featured Category Visual Cards (Left) */}
              <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
                {categoriesData.slice(0, 2).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="group relative aspect-[3/4] overflow-hidden bg-lux-dark block border border-lux-border"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-[10px] tracking-widest uppercase text-lux-gold font-medium mb-1 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Featured Collection
                      </span>
                      <h4 className="font-serif text-lg font-light leading-tight group-hover:text-lux-gold transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-white/70 font-light mt-1 line-clamp-1">
                        {cat.tagline}
                      </p>
                      <div className="mt-2 text-[10px] uppercase tracking-wider text-lux-gold flex items-center gap-1 font-medium">
                        <span>Explore</span>
                        <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Main Categories & Subcategories Grid (Right) */}
              <div className="col-span-12 lg:col-span-7 grid grid-cols-3 gap-6">
                {categoriesData.slice(0, 6).map((cat) => (
                  <div key={cat.id} className="space-y-2">
                    <Link
                      to={`/category/${cat.slug}`}
                      onClick={onClose}
                      className="font-serif text-base font-medium text-lux-text hover:text-lux-gold transition-colors block pb-1 border-b border-lux-border/60"
                    >
                      {cat.name}
                    </Link>
                    <ul className="space-y-1.5 pt-1">
                      {cat.subcategories.slice(0, 4).map((sub, idx) => (
                        <li key={idx}>
                          <Link
                            to={`/category/${cat.slug}?sub=${encodeURIComponent(sub)}`}
                            onClick={onClose}
                            className="text-xs text-lux-muted hover:text-lux-gold font-light transition-colors block"
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar in Mega Menu */}
            <div className="mt-8 pt-4 border-t border-lux-border/60 flex items-center justify-between text-xs text-lux-muted">
              <div className="flex items-center gap-6">
                <Link to="/category/chandeliers" onClick={onClose} className="hover:text-lux-gold">
                  Explore All 120+ Chandeliers
                </Link>
                <span>•</span>
                <Link to="/category/architectural-lights" onClick={onClose} className="hover:text-lux-gold">
                  48V Magnetic Architectural Systems
                </Link>
                <span>•</span>
                <Link to="/category/wicker-world" onClick={onClose} className="hover:text-lux-gold">
                  Wicker World Collection
                </Link>
              </div>

              <Link
                to="/contact"
                onClick={onClose}
                className="text-lux-gold hover:text-lux-gold-dark font-medium uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Book Luxury Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
