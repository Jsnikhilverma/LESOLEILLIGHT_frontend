import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ProductCard } from '../common/ProductCard';
import { QuickViewModal } from '../common/QuickViewModal';
import { Button } from '../ui/Button';
import { productsData } from '../../data/productsData';

export const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const tabs = [
    'All',
    'Wall Lamps',
    'Ceiling Fans',
    'Chandeliers',
    'Dining Table Chandeliers',
    'Architectural Lights'
  ];

  const filteredProducts = activeTab === 'All'
    ? productsData.filter(p => p.isFeatured || p.isBestSeller)
    : productsData.filter(p => p.category === activeTab);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <section className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="EXEMPLARY CRAFTSMANSHIP"
            title="The Art of Illumination"
            subtitle="Showcasing authentic statement luminaires sculpted with optical crystal, solid brass, and museum-grade lighting science."
            align="left"
            className="mb-6 md:mb-0"
          />

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-xs uppercase tracking-luxury px-4 py-2.5 whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-lux-dark text-white border border-lux-dark font-medium shadow-sm'
                    : 'bg-lux-bg text-lux-muted border border-lux-border hover:border-lux-gold hover:text-lux-gold'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.slice(0, 8).map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard
                  product={product}
                  onQuickView={handleQuickView}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Button
            to="/category/chandeliers"
            variant="outline"
            size="lg"
            icon={ArrowRight}
          >
            DISCOVER ALL 120+ SIGNATURE FIXTURES
          </Button>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </section>
  );
};
