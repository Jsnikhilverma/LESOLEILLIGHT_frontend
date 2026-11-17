import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, ArrowUpRight, Eye } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { galleryData } from '../../data/galleryData';

export const InspirationGallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filters = [
    'All',
    'Luxury Living Rooms',
    'Modern Dining Rooms',
    'Designer Bedrooms',
    'Grand Staircases',
    'Luxury Villas',
    'Contemporary Commercial Spaces'
  ];

  const filteredItems = activeFilter === 'All'
    ? galleryData
    : galleryData.filter(item => item.space === activeFilter);

  return (
    <section className="py-24 sm:py-36 bg-lux-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="EDITORIAL ATELIER"
          title="Inspiration & Living Environments"
          subtitle="Explore the profound interplay of form and illumination across India's most prestigious residences, villas, and architectural spaces."
          align="center"
        />

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs uppercase tracking-luxury px-4 py-2 whitespace-nowrap transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-lux-dark text-white font-medium border border-lux-dark'
                  : 'bg-white text-lux-muted border border-lux-border hover:border-lux-gold hover:text-lux-gold'
              }`}
            >
              {filter === 'Contemporary Commercial Spaces' ? 'Commercial Spaces' : filter}
            </button>
          ))}
        </div>

        {/* Editorial Masonry / Layout Grid */}
        <motion.div
          layout
          className="grid grid-cols-12 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedImage(item)}
                className={`${item.span} group relative overflow-hidden bg-lux-dark border border-lux-border shadow-card cursor-pointer`}
              >
                <div className={`relative ${item.aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-[16/10]'} w-full overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108 opacity-85 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:via-black/20 transition-all duration-500" />

                  {/* Tag on top left */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] uppercase tracking-widest font-medium bg-black/60 text-lux-gold backdrop-blur-md px-3 py-1 border border-lux-gold/30">
                      {item.tag}
                    </span>
                  </div>

                  {/* Quick Expand Icon Top Right */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Editorial Text Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 text-white flex flex-col justify-end">
                    <span className="text-[11px] uppercase tracking-wider text-lux-gold font-medium mb-1">
                      {item.space}
                    </span>

                    <h3 className="font-serif text-xl sm:text-2xl font-light leading-snug group-hover:text-lux-gold transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-white/70 font-light mt-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-lux-gold shrink-0" />
                      <span>{item.location}</span>
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/15 text-[11px] text-lux-gold/90 font-light flex items-center justify-between">
                      <span className="truncate pr-2">Fixture: {item.fixture}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Light Inspection Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-lux-dark/90 backdrop-blur-lg"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full bg-lux-dark border border-lux-gold/30 shadow-2xl overflow-hidden z-10 text-white"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:text-lux-gold flex items-center justify-center backdrop-blur-md"
              >
                ✕
              </button>

              <div className="aspect-[16/10] max-h-[70vh] w-full overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 bg-lux-dark-card border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-lux-gold font-medium block">
                    {selectedImage.space} • {selectedImage.location}
                  </span>
                  <h3 className="font-serif text-2xl font-light text-white mt-1">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light mt-1">
                    Featured Fixture: <strong className="text-lux-gold font-medium">{selectedImage.fixture}</strong>
                  </p>
                </div>

                <a
                  href={`tel:${galleryData[0]?.phone || "+919811052000"}`}
                  className="bg-lux-gold text-white text-xs uppercase tracking-luxury font-medium px-6 py-3 hover:bg-lux-gold-dark transition-colors shrink-0"
                >
                  Inquire For Project
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
