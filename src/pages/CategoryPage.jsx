import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ArrowUpDown, ChevronRight, Sparkles } from 'lucide-react';
import { categoriesData } from '../data/categoriesData';
import { productsData } from '../data/productsData';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { SectionHeading } from '../components/ui/SectionHeading';

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const subcategoryParam = searchParams.get('sub');
  const styleParam = searchParams.get('style');
  const [sortBy, setSortBy] = useState('featured');
  const [activeSub, setActiveSub] = useState(subcategoryParam || 'all');

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSub(subcategoryParam || 'all');
  }, [categorySlug, subcategoryParam]);

  // Find category metadata
  const currentCategory = useMemo(() => {
    return categoriesData.find(c => c.slug === categorySlug) || {
      id: 'all',
      name: categorySlug ? categorySlug.replace(/-/g, ' ').toUpperCase() : 'All Collections',
      tagline: 'Curated Architectural & Decorative Illumination',
      description: 'Explore our complete spectrum of luxury luminaires, chandeliers, wall sconces, and architectural systems.',
      image: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=1800&q=85',
      subcategories: []
    };
  }, [categorySlug]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    if (categorySlug && categorySlug !== 'all') {
      list = list.filter(p => p.categorySlug === categorySlug);
    }

    if (styleParam) {
      list = list.filter(p => p.style.toLowerCase() === styleParam.toLowerCase());
    }

    if (activeSub && activeSub !== 'all') {
      list = list.filter(p =>
        p.name.toLowerCase().includes(activeSub.toLowerCase()) ||
        p.shortDescription?.toLowerCase().includes(activeSub.toLowerCase()) ||
        p.category.toLowerCase().includes(activeSub.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [categorySlug, styleParam, activeSub, sortBy]);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="w-full pt-28 pb-24 bg-lux-bg min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-lux-dark overflow-hidden mb-12">
        <img
          src={currentCategory.image}
          alt={currentCategory.name}
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 text-white">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/60 mb-3 uppercase tracking-wider font-light">
            <Link to="/" className="hover:text-lux-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-lux-gold" />
            <span className="text-lux-gold">{currentCategory.name}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
            {currentCategory.name}
          </h1>

          <p className="text-xs sm:text-sm text-white/80 font-light max-w-2xl mt-2 leading-relaxed">
            {currentCategory.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Bar: Subcategories & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-lux-border mb-8">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveSub('all')}
              className={`text-xs uppercase tracking-wider px-3.5 py-1.5 transition-colors whitespace-nowrap ${
                activeSub === 'all'
                  ? 'bg-lux-dark text-white font-medium'
                  : 'bg-white text-lux-muted border border-lux-border hover:border-lux-gold'
              }`}
            >
              All Models ({filteredProducts.length})
            </button>

            {currentCategory.subcategories?.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSub(sub)}
                className={`text-xs uppercase tracking-wider px-3.5 py-1.5 transition-colors whitespace-nowrap ${
                  activeSub === sub
                    ? 'bg-lux-dark text-white font-medium'
                    : 'bg-white text-lux-muted border border-lux-border hover:border-lux-gold'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs text-lux-muted uppercase tracking-wider">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-lux-border text-xs text-lux-text px-3 py-1.5 focus:outline-none focus:border-lux-gold"
            >
              <option value="featured">Signature Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-lux-border p-12">
            <Sparkles className="w-10 h-10 text-lux-gold mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-lux-text font-normal mb-2">
              No Fixtures Matching Selected Filter
            </h3>
            <p className="text-xs text-lux-muted font-light max-w-md mx-auto mb-6">
              Try switching back to all subcategories or explore our custom bespoke chandelier fabrication service.
            </p>
            <button
              onClick={() => setActiveSub('all')}
              className="bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-3 px-6 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};
