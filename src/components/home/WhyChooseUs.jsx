import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Gem, Building2, Compass, HeartHandshake } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { brandData } from '../../data/brandData';

export const WhyChooseUs = () => {
  const iconMap = {
    ShieldCheck: ShieldCheck,
    Sparkles: Sparkles,
    Gem: Gem,
    Building2: Building2,
    Compass: Compass,
    HeartHandshake: HeartHandshake
  };

  return (
    <section className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="THE LE SOLEIL PROMISE"
          title="Why Choose Le Soleil Light"
          subtitle="A standard of excellence rooted in uncompromising material integrity, luminous beauty, and personalized concierge support."
          align="center"
        />

        {/* 6 Features Grid with Minimal Line Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {brandData.features.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon] || Sparkles;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group p-8 sm:p-10 bg-lux-bg/60 border border-lux-border hover:border-lux-gold transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle gold line accent on hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-lux-gold group-hover:w-full transition-all duration-500" />

                {/* Minimal line icon */}
                <div className="w-12 h-12 rounded-full bg-white border border-lux-border flex items-center justify-center text-lux-gold mb-6 group-hover:scale-110 group-hover:bg-lux-gold group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-5 h-5 stroke-[1.5]" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-lux-text mb-3 group-hover:text-lux-gold transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-lux-muted leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
