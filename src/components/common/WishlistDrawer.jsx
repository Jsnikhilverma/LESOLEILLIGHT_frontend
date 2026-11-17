import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export const WishlistDrawer = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlistItems, toggleWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    toggleWishlist(item);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-lux-dark/80 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="w-screen max-w-md bg-white border-l border-lux-border shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-lux-border flex items-center justify-between bg-lux-bg/60">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-lux-gold fill-lux-gold" />
                  <h3 className="font-serif text-xl font-normal text-lux-text">
                    Saved Fixtures ({wishlistCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lux-muted hover:text-lux-text hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-lux-border/60">
                {wishlistItems.length > 0 ? (
                  wishlistItems.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                      {/* Image */}
                      <Link
                        to={`/product/${item.slug || item.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="w-20 h-24 bg-[#F2EFE9] shrink-0 overflow-hidden border border-lux-border block"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-lux-text font-serif leading-snug line-clamp-1">
                              <Link
                                to={`/product/${item.slug || item.id}`}
                                onClick={() => setIsWishlistOpen(false)}
                                className="hover:text-lux-gold transition-colors"
                              >
                                {item.name}
                              </Link>
                            </h4>
                            <button
                              onClick={() => toggleWishlist(item)}
                              className="text-lux-muted hover:text-red-500 transition-colors p-0.5"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[11px] text-lux-gold uppercase tracking-wider block mt-0.5">
                            {item.category}
                          </span>
                          <span className="font-serif text-base font-medium text-lux-text block mt-1">
                            {formatPrice(item.price)}
                          </span>
                        </div>

                        {/* Move to bag button */}
                        <div className="mt-2 pt-2 flex items-center gap-2">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="flex-1 bg-lux-dark text-white hover:bg-lux-gold text-[11px] uppercase tracking-wider font-medium py-1.5 px-3 flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Move to Bag</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <Heart className="w-12 h-12 text-lux-border mx-auto mb-4 stroke-[1]" />
                    <p className="font-serif text-xl text-lux-text mb-2">No Saved Fixtures</p>
                    <p className="text-xs text-lux-muted font-light mb-6">
                      Click the heart icon on any chandelier or lighting piece to bookmark it.
                    </p>
                    <button
                      onClick={() => setIsWishlistOpen(false)}
                      className="inline-block text-xs uppercase tracking-luxury text-lux-gold font-medium border-b border-lux-gold pb-1"
                    >
                      Browse Collections
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              {wishlistItems.length > 0 && (
                <div className="p-6 bg-lux-bg/60 border-t border-lux-border">
                  <Link
                    to="/wishlist"
                    onClick={() => setIsWishlistOpen(false)}
                    className="w-full bg-lux-gold text-white hover:bg-lux-gold-dark text-xs uppercase tracking-luxury font-medium py-3.5 px-6 flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <span>View Curated Wishlist Board</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
