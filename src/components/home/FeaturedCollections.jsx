import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { categoriesData } from '../../data/categoriesData';

export const FeaturedCollections = () => {
  // Select the 6 featured collections requested in prompt
  const targetSlugs = [
    'chandeliers',
    'ceiling-lights',
    'architectural-lights',
    'wall-lamps',
    'floor-table-lamps',
    'landscape-lights'
  ];

  const featured = targetSlugs.map(slug => categoriesData.find(c => c.slug === slug)).filter(Boolean);

  // Asymmetrical layout styling per index
  const layoutConfigs = [
    { gridClass: "col-span-12 lg:col-span-8", aspect: "aspect-[16/10] sm:aspect-[16/9]" },
    { gridClass: "col-span-12 lg:col-span-4", aspect: "aspect-[4/5]" },
    { gridClass: "col-span-12 sm:col-span-6 lg:col-span-4", aspect: "aspect-[4/5]" },
    { gridClass: "col-span-12 sm:col-span-6 lg:col-span-4", aspect: "aspect-[4/5]" },
    { gridClass: "col-span-12 lg:col-span-4", aspect: "aspect-[4/5]" },
    { gridClass: "col-span-12", aspect: "aspect-[21/9] sm:aspect-[24/9]" }
  ];

  return (
    <section id="featured-collections" className="py-24 sm:py-32 bg-lux-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="CURATED CURATION"
          title="A World of Exceptional Lighting"
          subtitle="Explore thoughtfully curated lighting collections designed to elevate every corner of your space with architectural distinction."
          align="center"
        />

        {/* Editorial Asymmetrical Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {featured.map((cat, idx) => {
            const config = layoutConfigs[idx] || { gridClass: "col-span-12 lg:col-span-4", aspect: "aspect-[4/5]" };

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`${config.gridClass} group relative overflow-hidden bg-lux-dark border border-lux-border/80 shadow-card hover:shadow-luxury-hover transition-all duration-500`}
              >
                <Link to={`/category/${cat.slug}`} className="block w-full h-full">
                  <div className={`relative ${config.aspect} w-full overflow-hidden`}>
                    {/* Background Image with Zoom */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108 opacity-85 group-hover:opacity-95"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:via-black/25 transition-all duration-500" />

                    {/* Top Right Pill: Item Count */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[11px] uppercase tracking-wider font-medium text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
                        {cat.itemCount}+ Models
                      </span>
                    </div>

                    {/* Content Card Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 flex flex-col justify-end text-white">
                      <span className="text-xs uppercase tracking-widest text-lux-gold font-medium mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Collection 0{idx + 1}
                      </span>

                      <div className="flex items-end justify-between gap-4">
                        <div className="max-w-xl">
                          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light leading-tight group-hover:text-lux-gold transition-colors duration-300">
                            {cat.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-white/80 font-light mt-2 line-clamp-2 leading-relaxed">
                            {cat.description}
                          </p>
                        </div>

                        <div className="w-11 h-11 rounded-full border border-lux-gold/60 bg-lux-gold/10 flex items-center justify-center text-lux-gold group-hover:bg-lux-gold group-hover:text-white transition-all duration-300 shrink-0">
                          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>

                      {/* Explore Link Text with Hover Animation */}
                      <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 text-xs uppercase tracking-luxury font-medium text-lux-gold">
                        <span>Explore Collection</span>
                        <span className="w-6 h-[1px] bg-lux-gold group-hover:w-12 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
