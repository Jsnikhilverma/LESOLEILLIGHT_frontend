import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ShieldCheck, Truck, Star, ArrowRight, ChevronRight, Check, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { productsData } from '../data/productsData';
import { brandData } from '../data/brandData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();

  const product = productsData.find(p => p.slug === productSlug || p.id === productSlug) || productsData[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes && product.finishes.length > 0 ? product.finishes[0] : 'Standard Brass'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(product.image);
    if (product.finishes && product.finishes.length > 0) {
      setSelectedFinish(product.finishes[0]);
    }
  }, [productSlug, product]);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const images = product.gallery || [product.image, product.secondaryImage].filter(Boolean);

  const relatedProducts = productsData
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const discountPercent = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="w-full pt-28 pb-24 bg-lux-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-lux-muted mb-8 uppercase tracking-wider font-light">
          <Link to="/" className="hover:text-lux-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-lux-gold" />
          <Link to={`/category/${product.categorySlug}`} className="hover:text-lux-gold transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-lux-gold" />
          <span className="text-lux-text truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-[4/5] bg-white border border-lux-border overflow-hidden shadow-card">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-700"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase font-medium bg-lux-dark/90 text-lux-gold px-3.5 py-1.5 backdrop-blur-sm border border-lux-gold/30">
                  {product.badge}
                </span>
              )}

              {discountPercent && (
                <span className="absolute top-4 right-4 text-[10px] tracking-widest uppercase font-medium bg-lux-gold text-white px-3 py-1">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnails row */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square border overflow-hidden transition-all bg-white ${
                      activeImage === img
                        ? 'border-lux-gold ring-2 ring-lux-gold/30'
                        : 'border-lux-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-lux-gold font-medium">
                {product.category} • SKU: {product.sku}
              </span>
              {product.rating && (
                <div className="flex items-center gap-1.5 text-xs text-lux-text font-medium">
                  <Star className="w-3.5 h-3.5 text-lux-gold fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-lux-muted">({product.reviewsCount} reviews)</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-lux-text leading-tight">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 py-2 border-y border-lux-border">
              <span className="font-serif text-3xl sm:text-4xl font-medium text-lux-text">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-lux-muted line-through font-light">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 font-medium ml-auto">
                Inclusive of all Taxes (GST)
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-lux-muted leading-relaxed font-light">
              {product.description}
            </p>

            {/* Finish Selector */}
            {product.finishes && product.finishes.length > 0 && (
              <div className="pt-2">
                <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2.5">
                  Artisanal Finish: <strong className="text-lux-gold font-medium">{selectedFinish}</strong>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.finishes.map((finish) => (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`text-xs px-4 py-2.5 border transition-all ${
                        selectedFinish === finish
                          ? 'border-lux-gold bg-lux-gold/10 text-lux-text font-medium shadow-sm'
                          : 'border-lux-border bg-white text-lux-muted hover:border-lux-gold/60'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-lux-border bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-lux-text hover:bg-lux-bg transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-lux-text hover:bg-lux-bg transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  type="button"
                  onClick={() => addToCart(product, quantity, selectedFinish)}
                  className="flex-1 bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium h-12 px-6 flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`w-12 h-12 border border-lux-border flex items-center justify-center transition-colors ${
                    isFavorited ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-lux-text hover:text-lux-gold'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Direct Concierge WhatsApp */}
              <a
                href={`https://wa.me/${brandData.contact.whatsapp}?text=${encodeURIComponent(`Hello Le Soleil Light, I am interested in inquiring about the "${product.name}" (SKU: ${product.sku}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-luxury font-medium py-3.5 px-6 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire with Showroom Concierge via WhatsApp</span>
              </a>
            </div>

            {/* Assurances Checklist */}
            <div className="p-5 bg-white border border-lux-border space-y-2.5 text-xs text-lux-muted">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-lux-gold shrink-0" />
                <span>{product.warranty || "3-Year Atelier Guarantee"} • 100% Genuine Lighting</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-lux-gold shrink-0" />
                <span>Complimentary Pan-India Transit Insurance & Wooden Crate Packaging</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-lux-gold shrink-0" />
                <span>Bespoke Drop Lengthening & 3D Photometric Simulation Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications & Details Section */}
        <div className="bg-white border border-lux-border p-8 sm:p-12 mb-20 shadow-card">
          <div className="flex items-center gap-8 border-b border-lux-border pb-4 mb-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`font-serif text-xl sm:text-2xl transition-colors pb-2 -mb-4 border-b-2 ${
                activeTab === 'specs'
                  ? 'border-lux-gold text-lux-text font-medium'
                  : 'border-transparent text-lux-muted hover:text-lux-text'
              }`}
            >
              Architectural Specifications
            </button>
            <button
              onClick={() => setActiveTab('dimensions')}
              className={`font-serif text-xl sm:text-2xl transition-colors pb-2 -mb-4 border-b-2 ${
                activeTab === 'dimensions'
                  ? 'border-lux-gold text-lux-text font-medium'
                  : 'border-transparent text-lux-muted hover:text-lux-text'
              }`}
            >
              Dimensions & Installation
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs sm:text-sm">
              <div className="py-2.5 border-b border-lux-border/60 flex justify-between">
                <span className="text-lux-muted">Material Composition</span>
                <span className="text-lux-text font-medium text-right">{product.material}</span>
              </div>
              <div className="py-2.5 border-b border-lux-border/60 flex justify-between">
                <span className="text-lux-muted">Luminous Source</span>
                <span className="text-lux-text font-medium text-right">{product.lightSource}</span>
              </div>
              <div className="py-2.5 border-b border-lux-border/60 flex justify-between">
                <span className="text-lux-muted">Operating Voltage</span>
                <span className="text-lux-text font-medium text-right">{product.voltage}</span>
              </div>
              <div className="py-2.5 border-b border-lux-border/60 flex justify-between">
                <span className="text-lux-muted">Manufacturer Guarantee</span>
                <span className="text-lux-text font-medium text-right">{product.warranty}</span>
              </div>
              {product.specs && Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="py-2.5 border-b border-lux-border/60 flex justify-between">
                  <span className="text-lux-muted">{key}</span>
                  <span className="text-lux-text font-medium text-right">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'dimensions' && (
            <div className="space-y-4 text-sm text-lux-muted font-light leading-relaxed">
              <p>
                <strong className="text-lux-text font-medium">Physical Dimensions:</strong> {product.dimensions}
              </p>
              <p>
                <strong className="text-lux-text font-medium">Installation Protocol:</strong> Surface junction mounting with concealed anchor points. We recommend installation by a qualified architectural electrician. Our team provides detailed wiring schematics and structural reinforcement calculations upon dispatch.
              </p>
              <p>
                <strong className="text-lux-text font-medium">Custom Dropline Lengths:</strong> Double-height ceilings and vaulted voids can be accommodated with bespoke cable lengths up to 6,000mm upon request.
              </p>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-lux-text font-light">
                Complementary Collections
              </h2>
              <Link
                to={`/category/${product.categorySlug}`}
                className="text-xs uppercase tracking-wider text-lux-gold hover:text-lux-gold-dark font-medium flex items-center gap-1"
              >
                <span>View All {product.category}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
