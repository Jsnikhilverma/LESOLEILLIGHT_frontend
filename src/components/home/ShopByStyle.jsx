import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { stylesData } from '../../data/stylesData';

export const ShopByStyle = () => {
  return (
    <section className="py-24 sm:py-32 bg-lux-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AESTHETIC ARCHETYPES"
          title="Shop by Lighting Style"
          subtitle="Discover lighting curated around your personal architectural identity, from European crystal grandeur to modern minimalism."
          align="center"
        />

        {/* 6 Large Style Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stylesData.map((style, idx) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden bg-lux-dark border border-lux-border shadow-card hover:shadow-luxury-hover transition-all duration-500"
            >
              <Link to={`/category/chandeliers?style=${style.slug}`} className="block w-full h-full">
                {/* Background Image with Scale Animation */}
                <img
                  src={style.image}
                  alt={style.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-95"
                />

                {/* Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:via-black/25" />

                {/* Floating Badge (Item Count) */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[10px] tracking-widest uppercase font-medium bg-white/10 text-white/90 backdrop-blur-md px-3 py-1 border border-white/20">
                    {style.itemCount}+ Models
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 text-white flex flex-col justify-end">
                  <span className="text-xs uppercase tracking-widest text-lux-gold font-medium mb-1.5 block">
                    {style.tagline}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-white group-hover:text-lux-gold transition-colors duration-300">
                    {style.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/75 font-light mt-2 line-clamp-2 leading-relaxed">
                    {style.description}
                  </p>

                  {/* Explore Link */}
                  <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-luxury font-medium text-lux-gold group-hover:text-white transition-colors">
                      Explore {style.name}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-lux-gold/60 flex items-center justify-center text-lux-gold group-hover:bg-lux-gold group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
