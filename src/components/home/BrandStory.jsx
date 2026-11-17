import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Gem, Shield, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import { brandData } from '../../data/brandData';

export const BrandStory = () => {
  return (
    <section className="py-24 sm:py-36 bg-lux-dark text-white relative overflow-hidden">
      {/* Ambient background bloom */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-lux-gold/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Storytelling Montage */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
                alt="Luxury architectural living room with statement chandelier"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </motion.div>

            {/* Overlapping Floating Inset Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-8 -right-4 sm:-right-8 w-64 sm:w-72 bg-lux-dark-card/95 backdrop-blur-xl p-6 border border-lux-gold/40 shadow-2xl hidden sm:block"
            >
              <span className="text-[10px] uppercase tracking-widest text-lux-gold font-medium flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3 h-3" />
                Atelier Heritage
              </span>
              <p className="font-serif text-xl text-white font-light leading-snug">
                "Light is the silent architecture of emotional warmth."
              </p>
              <span className="text-[11px] text-lux-dark-muted font-light mt-2 block">
                — Le Soleil Light Design Atelier
              </span>
            </motion.div>
          </div>

          {/* Right Column: Brand Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-[1px] bg-lux-gold inline-block" />
              <span className="text-xs uppercase font-medium tracking-widest-plus text-lux-gold">
                OUR PHILOSOPHY
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.12]"
            >
              More Than Light.<br />
              <span className="text-lux-gold italic">An Expression of Living.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 text-sm sm:text-base text-lux-dark-muted font-light leading-relaxed"
            >
              <p>
                At Le Soleil Light, we believe lighting is more than illumination. It is an essential element of architectural beauty, personal expression, and exceptional living.
              </p>
              <p>
                Our curated lighting collections combine contemporary aesthetics, refined craftsmanship, and functional design to create extraordinary environments.
              </p>
              <p className="text-white/80">
                From our showroom in Vasant Kunj, New Delhi, our team collaborates with architects, interior masters, and discerning homeowners across India to conceive bespoke lighting solutions tailored to the soul of each room.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10"
            >
              {brandData.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl text-lux-gold font-normal block">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-white/60 font-light uppercase tracking-wider block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-4"
            >
              <Button
                to="/about"
                variant="outlineGold"
                size="lg"
                icon={ArrowRight}
              >
                DISCOVER OUR STORY
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
