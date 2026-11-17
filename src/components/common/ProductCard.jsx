import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, ArrowUpRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product, onQuickView, dark = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isFavorited = isInWishlist(product.id);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const discountPercent = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className={`group relative flex flex-col transition-all duration-500 ${
        dark ? 'bg-lux-dark-card border-lux-dark-border' : 'bg-white border-lux-border/70'
      } border`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
        {product.badge && (
          <span className="text-[10px] tracking-widest uppercase font-medium bg-lux-dark/85 text-lux-gold px-2.5 py-1 backdrop-blur-sm border border-lux-gold/30">
            {product.badge}
          </span>
        )}
        {discountPercent && discountPercent > 0 && (
          <span className="text-[10px] tracking-widest uppercase font-medium bg-lux-gold text-white px-2 py-0.5 self-start">
            Save {discountPercent}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label="Add to wishlist"
        className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
          isFavorited
            ? 'bg-red-500 text-white shadow-md'
            : 'bg-white/80 text-lux-text hover:text-lux-gold hover:bg-white shadow-sm backdrop-blur-sm'
        }`}
      >
        <Heart className={`w-4 h-4 transition-transform duration-300 ${isFavorited ? 'fill-current scale-110' : ''}`} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EFE9]">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered && product.secondaryImage
                ? 'opacity-0 scale-105'
                : 'opacity-100 scale-100 group-hover:scale-105'
            }`}
          />

          {/* Secondary Image on Hover */}
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Hover Action Bar */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onQuickView) onQuickView(product);
            }}
            className="flex-1 bg-white/95 text-lux-text hover:text-lux-gold text-[11px] font-medium tracking-luxury uppercase py-2.5 px-3 flex items-center justify-center gap-1.5 backdrop-blur-md shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="flex-1 bg-lux-dark text-white hover:bg-lux-gold text-[11px] font-medium tracking-luxury uppercase py-2.5 px-3 flex items-center justify-center gap-1.5 shadow-md transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-lux-muted text-[11px] uppercase tracking-wider font-light">
            {product.category}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1 text-lux-gold">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[11px] font-medium text-lux-text/80">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-normal leading-snug mb-2 line-clamp-1 group-hover:text-lux-gold transition-colors">
          <Link to={`/product/${product.slug}`} className="hover:underline decoration-lux-gold/40 underline-offset-4">
            {product.name}
          </Link>
        </h3>

        {/* Short specs / finish */}
        {product.material && (
          <p className="text-[11px] text-lux-muted line-clamp-1 mb-3 font-light">
            {product.material}
          </p>
        )}

        {/* Price & Link */}
        <div className="mt-auto pt-3 border-t border-lux-border/50 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg sm:text-xl font-medium text-lux-text">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-lux-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="text-xs tracking-wider uppercase font-medium text-lux-gold hover:text-lux-gold-dark flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
          >
            <span>View</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
