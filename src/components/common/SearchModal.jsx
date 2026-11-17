import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { productsData } from '../../data/productsData';
import { categoriesData } from '../../data/categoriesData';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const trendingSearches = [
    "Opulent Column",
    "Duplex Chandelier",
    "Chandelier Fan",
    "Magnetic Track",
    "Dining Chandelier",
    "Wicker World",
    "Crystal Wall Lamp",
    "Vintage"
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matchedProducts = productsData.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
    );

    setResults(matchedProducts);
  }, [query]);

  const handleSelectTrending = (term) => {
    setQuery(term);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-lux-dark/85 backdrop-blur-md"
          />

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl bg-white shadow-2xl border border-lux-border overflow-hidden z-10"
          >
            {/* Input Header */}
            <div className="flex items-center px-6 py-5 border-b border-lux-border">
              <Search className="w-5 h-5 text-lux-gold shrink-0 mr-3.5" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chandeliers, wall sconces, fans, architectural lights..."
                className="w-full text-base sm:text-lg font-light text-lux-text placeholder-lux-muted/60 bg-transparent focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-lux-muted hover:text-lux-text mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs uppercase tracking-widest text-lux-muted hover:text-lux-gold font-medium px-2 py-1"
              >
                ESC
              </button>
            </div>

            {/* Quick Trending Searches */}
            {!query && (
              <div className="p-6 bg-lux-bg/50">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-lux-gold font-medium mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectTrending(term)}
                      className="text-xs px-3 py-1.5 bg-white border border-lux-border hover:border-lux-gold text-lux-text/80 hover:text-lux-gold transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-lux-border/70">
                  <span className="text-xs uppercase tracking-widest text-lux-muted font-medium block mb-3">
                    Explore By Category
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categoriesData.slice(0, 6).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="text-xs text-lux-text/90 hover:text-lux-gold py-1 flex items-center justify-between group"
                      >
                        <span>{cat.name}</span>
                        <ArrowRight className="w-3 h-3 text-lux-border group-hover:text-lux-gold transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results List */}
            {query && (
              <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-lux-border/60">
                {results.length > 0 ? (
                  <>
                    <div className="text-xs text-lux-muted uppercase tracking-wider mb-3">
                      Found {results.length} result{results.length > 1 ? 's' : ''} for "{query}"
                    </div>
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 py-3 group hover:bg-lux-bg/40 px-2 transition-colors"
                      >
                        <div className="w-14 h-16 bg-[#F2EFE9] shrink-0 overflow-hidden border border-lux-border/50">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] tracking-wider uppercase text-lux-gold font-medium block">
                            {product.category}
                          </span>
                          <h4 className="text-sm font-medium text-lux-text group-hover:text-lux-gold transition-colors truncate">
                            {product.name}
                          </h4>
                          <span className="text-xs text-lux-muted font-light truncate block">
                            {product.material}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-serif text-sm sm:text-base font-medium text-lux-text block">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-lux-muted line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-sm text-lux-muted mb-2 font-light">
                      No exact lighting models found matching "{query}"
                    </p>
                    <p className="text-xs text-lux-gold">
                      Try searching for "chandelier", "wall light", "ceiling fan", or "track".
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
