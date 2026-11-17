import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=2200&q=90",
      eyebrow: "LIGHT THAT DEFINES LUXURY",
      title: "Illuminate Your World.\nDefine Your Elegance.",
      description: "Discover exceptional lighting collections that transform interiors into timeless expressions of luxury, beauty, and sophistication.",
      highlight: "Double-Height Grand Chandeliers & Pendants",
      ctaCategory: "/category/chandeliers"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90",
      eyebrow: "ARCHITECTURAL MASTERY",
      title: "Sculpted Radiance.\nSeamless Precision.",
      description: "From 48V low-voltage magnetic tracks to whisper-quiet designer chandelier fans, curate light that respects the purity of architectural design.",
      highlight: "Architectural Lighting & Magnetic Systems",
      ctaCategory: "/category/architectural-lights"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2200&q=90",
      eyebrow: "ARTISAN ILLUMINATION",
      title: "Intimate Evenings.\nTimeless Splendor.",
      description: "Linear dining masterworks and handcrafted fluted glass sconces designed to frame memorable celebrations and everyday luxury living.",
      highlight: "Dining Table Chandeliers & Ambient Sconces",
      ctaCategory: "/category/dining-table-chandeliers"
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToContent = () => {
    const el = document.getElementById('featured-collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[680px] max-h-[1080px] overflow-hidden bg-lux-dark">
      {/* Background Slides with Zoom / Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle multi-layer gradient overlay for legibility & cinematic depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Golden Accent Lines */}
      <div className="absolute top-24 left-8 hidden lg:block w-[1px] h-32 bg-gradient-to-b from-lux-gold/60 to-transparent" />
      <div className="absolute bottom-24 right-8 hidden lg:block w-[1px] h-32 bg-gradient-to-t from-lux-gold/60 to-transparent" />

      {/* Main Content Area */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-24 sm:pt-28 pb-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            key={`eyebrow-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-8 h-[1px] bg-lux-gold inline-block" />
            <span className="text-xs sm:text-sm uppercase font-medium tracking-widest-plus text-lux-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {slides[currentSlide].eyebrow}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            key={`heading-${currentSlide}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.08] mb-6 whitespace-pre-line"
          >
            {slides[currentSlide].title}
          </motion.h1>

          {/* Description */}
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-base sm:text-lg text-white/85 font-light leading-relaxed mb-8 max-w-2xl"
          >
            {slides[currentSlide].description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            key={`buttons-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Button
              to={slides[currentSlide].ctaCategory}
              variant="primary"
              size="lg"
              icon={ArrowRight}
            >
              EXPLORE COLLECTION
            </Button>

            <Button
              to="/about"
              variant="outlineDark"
              size="lg"
            >
              DISCOVER OUR STORY
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators & Counter (Bottom Right) */}
      <div className="absolute bottom-10 right-6 sm:right-12 z-20 flex items-center gap-4 text-white">
        <div className="text-xs tracking-widest font-serif font-light">
          <span className="text-lux-gold font-medium">0{currentSlide + 1}</span>
          <span className="text-white/40 mx-1.5">/</span>
          <span className="text-white/60">0{slides.length}</span>
        </div>

        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 transition-all duration-500 rounded-full ${
                currentSlide === idx ? 'w-8 bg-lux-gold' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Elegant Scroll Indicator (Bottom Center) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center">
        <button
          onClick={scrollToContent}
          className="group flex flex-col items-center gap-2 text-white/70 hover:text-lux-gold transition-colors"
          aria-label="Scroll to discover collections"
        >
          <span className="text-[10px] uppercase tracking-widest-plus font-light">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-lux-gold" />
          </motion.div>
        </button>
      </div>
    </section>
  );
};
