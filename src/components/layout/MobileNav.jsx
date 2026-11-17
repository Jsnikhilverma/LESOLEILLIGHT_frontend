import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, Phone, Mail, MapPin, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { categoriesData } from '../../data/categoriesData';
import { brandData } from '../../data/brandData';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileNav = ({ isOpen, onClose }) => {
  const [expandedCat, setExpandedCat] = useState(null);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  const toggleCategory = (id) => {
    setExpandedCat(expandedCat === id ? null : id);
  };

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Chandeliers", to: "/category/chandeliers", id: "chandeliers" },
    { name: "Ceiling Lights", to: "/category/ceiling-lights", id: "ceiling-lights" },
    { name: "Dining Table Chandeliers", to: "/category/dining-table-chandeliers", id: "dining-table-chandeliers" },
    { name: "Duplex Chandeliers", to: "/category/duplex-chandeliers", id: "duplex-chandeliers" },
    { name: "Ceiling Fans", to: "/category/ceiling-fans", id: "ceiling-fans" },
    { name: "Wall Lamps", to: "/category/wall-lamps", id: "wall-lamps" },
    { name: "Architectural Lights", to: "/category/architectural-lights", id: "architectural-lights" },
    { name: "Floor & Table Lamps", to: "/category/floor-table-lamps", id: "floor-table-lamps" },
    { name: "Landscape Lights", to: "/category/landscape-lights", id: "landscape-lights" },
    { name: "Wicker World", to: "/category/wicker-world", id: "wicker-world" },
    { name: "Brand Story", to: "/about" },
    { name: "Contact & Concierge", to: "/contact" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-lux-dark/85 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-lux-bg border-r border-lux-border shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-lux-border flex items-center justify-between bg-white">
              <Link to="/" onClick={onClose} className="flex flex-col">
                <span className="font-serif text-xl tracking-[0.2em] font-medium text-lux-text">
                  LE SOLEIL
                </span>
                <span className="text-[9px] tracking-[0.35em] text-lux-gold font-light uppercase">
                  LIGHT • NEW DELHI
                </span>
              </Link>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-lux-text hover:bg-lux-bg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions (Bag & Wishlist) */}
            <div className="px-6 py-3 bg-white/70 border-b border-lux-border flex items-center justify-around text-xs">
              <button
                onClick={() => {
                  onClose();
                  setIsWishlistOpen(true);
                }}
                className="flex items-center gap-2 text-lux-text hover:text-lux-gold py-1"
              >
                <Heart className="w-4 h-4 text-lux-gold" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
              <span className="text-lux-border">|</span>
              <button
                onClick={() => {
                  onClose();
                  setIsCartOpen(true);
                }}
                className="flex items-center gap-2 text-lux-text hover:text-lux-gold py-1"
              >
                <ShoppingBag className="w-4 h-4 text-lux-gold" />
                <span>Shopping Bag ({cartCount})</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-lux-border/50">
              {navLinks.map((item, idx) => {
                const categoryObj = categoriesData.find(c => c.id === item.id);
                const isExpanded = expandedCat === item.id;

                return (
                  <div key={idx} className="py-2.5">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className="font-serif text-base text-lux-text hover:text-lux-gold transition-colors block flex-1"
                      >
                        {item.name}
                      </Link>

                      {categoryObj && categoryObj.subcategories.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleCategory(item.id)}
                          className="p-1.5 text-lux-muted hover:text-lux-gold"
                          aria-label={`Toggle ${item.name} subcategories`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-lux-gold' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Subcategories accordion */}
                    {categoryObj && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pl-3 space-y-1.5 border-l-2 border-lux-gold/30"
                      >
                        {categoryObj.subcategories.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={`/category/${categoryObj.slug}?sub=${encodeURIComponent(sub)}`}
                            onClick={onClose}
                            className="block text-xs text-lux-muted hover:text-lux-gold py-1 font-light"
                          >
                            {sub}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Contact / Location Card */}
            <div className="p-6 bg-white border-t border-lux-border space-y-2.5 text-xs text-lux-muted">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-lux-gold shrink-0 mt-0.5" />
                <span className="font-light">
                  {brandData.address.line1}, {brandData.address.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-lux-gold shrink-0" />
                <a href={`tel:${brandData.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-lux-gold">
                  {brandData.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-lux-gold shrink-0" />
                <a href={`mailto:${brandData.contact.email}`} className="hover:text-lux-gold">
                  {brandData.contact.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
