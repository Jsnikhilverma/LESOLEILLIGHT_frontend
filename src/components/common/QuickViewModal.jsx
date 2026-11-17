import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Check, Shield, Truck, Award, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes && product.finishes.length > 0 ? product.finishes[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const images = product.gallery || [product.image, product.secondaryImage].filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFinish);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-lux-dark/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-lux-bg border border-lux-border shadow-2xl z-10 flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-lux-dark hover:text-white flex items-center justify-center text-lux-text transition-colors shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Gallery Column */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-lux-border/80">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EFE9] mb-4">
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase font-medium bg-lux-dark text-lux-gold px-3 py-1 border border-lux-gold/30">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 shrink-0 border overflow-hidden transition-all ${
                        activeImage === img ? 'border-lux-gold ring-1 ring-lux-gold' : 'border-lux-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-lux-gold font-medium">
                    {product.category}
                  </span>
                  {product.rating && (
                    <div className="flex items-center gap-1.5 text-xs text-lux-text font-medium">
                      <div className="flex text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span>{product.rating}</span>
                      <span className="text-lux-muted">({product.reviewsCount || 24} reviews)</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-lux-text leading-tight mb-3">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-lux-text">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-lux-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 font-medium">
                    In Stock • Ready to Dispatch
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-sm text-lux-muted leading-relaxed font-light mb-6">
                  {product.shortDescription || product.description}
                </p>

                {/* Finishes */}
                {product.finishes && product.finishes.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2.5">
                      Finish Selection: <span className="text-lux-gold">{selectedFinish}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.finishes.map((finish) => (
                        <button
                          key={finish}
                          type="button"
                          onClick={() => setSelectedFinish(finish)}
                          className={`text-xs px-3.5 py-2 border transition-all ${
                            selectedFinish === finish
                              ? 'border-lux-gold bg-lux-gold/10 text-lux-text font-medium'
                              : 'border-lux-border bg-white text-lux-muted hover:border-lux-gold/50'
                          }`}
                        >
                          {finish}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Actions */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center border border-lux-border bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lux-text hover:bg-lux-bg transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-lux-text hover:bg-lux-bg transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-3 px-6 flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className={`w-10 h-10 border border-lux-border flex items-center justify-center transition-colors ${
                      isFavorited ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-lux-text hover:text-lux-gold'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Assurances */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-lux-border text-xs text-lux-muted">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-lux-gold shrink-0" />
                    <span>{product.warranty || "3 Year Guarantee"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-lux-gold shrink-0" />
                    <span>Insured Pan-India Transit</span>
                  </div>
                </div>
              </div>

              {/* View Full Product Link */}
              <div className="pt-6 mt-6 border-t border-lux-border flex justify-end">
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-lux-gold font-medium hover:text-lux-gold-dark"
                >
                  <span>Explore Full Specifications & 3D Render</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
