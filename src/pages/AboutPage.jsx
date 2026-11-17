import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Award, Gem, Compass, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { brandData } from '../data/brandData';

export const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const craftPillars = [
    {
      title: "Optical Purity & K9 Crystal",
      desc: "We exclusively select top-tier K9 optical crystal prisms, free from internal bubbles and inclusions, maximizing spectral dispersion and crystalline fire.",
      image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Solid Brass & Multi-Layer Plating",
      desc: "Our metals undergo multi-stage electroplating and manual satin brushing, sealed with aerospace-grade passivation against corrosion and oxidation.",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Museum-Grade High-CRI Radiance",
      desc: "With Color Rendering Indexes (CRI) exceeding Ra 95, our luminaires illuminate Italian marbles, wood veneers, and art with authentic chromatic fidelity.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="w-full pt-28 pb-24 bg-lux-bg min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] sm:h-[500px] bg-lux-dark overflow-hidden mb-20">
        <img
          src="https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=2000&q=90"
          alt="Artisanal lighting craftsmanship"
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 text-white">
          <span className="text-xs uppercase tracking-widest-plus text-lux-gold font-medium mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            THE LE SOLEIL LIGHT ATELIER
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight max-w-3xl">
            Where Precision Architecture Meets Sculptural Artistry.
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-lux-gold font-medium block">
              OUR JOURNEY & ORIGIN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-lux-text leading-tight">
              Crafting Luminary Legacies in New Delhi and Beyond.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-lux-muted font-light leading-relaxed">
              <p>
                Founded on the premise that lighting is the fundamental soul of high architecture, <strong>Le Soleil Light</strong> operates from our flagship studio and showroom in Vasant Kunj, New Delhi.
              </p>
              <p>
                We bridge the gap between traditional decorative grandeur and high-performance contemporary lighting engineering. Every fixture in our catalog — from soaring 30-foot duplex cascading crystal chandeliers to minimal 48V magnetic architectural tracks — is curated to serve discerning architects, interior designers, and discerning homeowners.
              </p>
              <p>
                We do not produce mass-market commoditized fixtures. Instead, we treat each luminaire as a permanent sculptural installation engineered to withstand decades of graceful living.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden border border-lux-border shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=85"
                alt="Interior design studio consultation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Pillars of Craft */}
        <div>
          <SectionHeading
            eyebrow="MATERIAL INTEGRITY"
            title="The Pillars of Our Craft"
            subtitle="Engineered with uncompromising dedication to authentic materials and optical perfection."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {craftPillars.map((pillar, idx) => (
              <div key={idx} className="bg-white border border-lux-border p-6 sm:p-8 flex flex-col justify-between shadow-card">
                <div>
                  <div className="aspect-[16/10] overflow-hidden mb-6 bg-lux-dark">
                    <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-lux-text mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-lux-muted font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Showroom Visit CTA */}
        <div className="bg-lux-dark text-white p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-lux-gold font-medium block">
              PRIVATE SHOWROOM APPOINTMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Visit Our Vasant Kunj Atelier.
            </h2>
            <p className="text-sm text-lux-dark-muted font-light leading-relaxed">
              Experience our chandeliers, luxury fan lights, and architectural track lighting in an actual architectural setting. We welcome you every day from 09:30 to 21:30.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Button to="/contact" variant="primary" size="md">
                SCHEDULE PRIVATE VISIT
              </Button>
              <Button to="/category/chandeliers" variant="outlineDark" size="md">
                EXPLORE ALL COLLECTIONS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
