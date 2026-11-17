import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const navigate = useNavigate();

  const freeShippingThreshold = 25000;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUXURY10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setDiscount(disc);
      setPromoMessage('10% Luxury Welcome Privilege applied!');
    } else if (promoCode.trim().toUpperCase() === 'SOLEIL') {
      const disc = 3000;
      setDiscount(disc);
      setPromoMessage('₹3,000 Signature Lighting Privilege applied!');
    } else {
      setPromoMessage('Invalid promo code. Try "LUXURY10" or "SOLEIL"');
    }
  };

  const total = Math.max(0, cartSubtotal - discount);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
                  <ShoppingBag className="w-5 h-5 text-lux-gold" />
                  <h3 className="font-serif text-xl font-normal text-lux-text">
                    Your Shopping Bag ({cartCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lux-muted hover:text-lux-text hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Tier Banner */}
              <div className="px-6 py-3.5 bg-lux-bg border-b border-lux-border text-xs">
                {remainingForFreeShipping > 0 ? (
                  <p className="text-lux-muted font-light mb-2">
                    Add <span className="font-medium text-lux-gold">{formatPrice(remainingForFreeShipping)}</span> more for <strong className="font-medium text-lux-text">Complimentary Insured Delivery</strong>
                  </p>
                ) : (
                  <p className="text-emerald-700 font-medium flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-lux-gold" />
                    You qualify for Complimentary White-Glove Insured Delivery!
                  </p>
                )}
                <div className="w-full bg-lux-border h-1.5 overflow-hidden rounded-full">
                  <div
                    className="bg-lux-gold h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-lux-border/60">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={`${item.id}-${item.finish}`} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-24 bg-[#F2EFE9] shrink-0 overflow-hidden border border-lux-border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-sm font-medium text-lux-text font-serif leading-snug line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id, item.finish)}
                              className="text-lux-muted hover:text-red-500 transition-colors p-0.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[11px] text-lux-gold uppercase tracking-wider block mt-0.5">
                            {item.category}
                          </span>
                          {item.finish && (
                            <span className="text-xs text-lux-muted font-light block mt-0.5">
                              Finish: {item.finish}
                            </span>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-lux-border bg-lux-bg/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.finish, -1)}
                              className="w-7 h-7 flex items-center justify-center text-lux-text hover:bg-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.finish, 1)}
                              className="w-7 h-7 flex items-center justify-center text-lux-text hover:bg-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-serif text-base font-medium text-lux-text">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <ShoppingBag className="w-12 h-12 text-lux-border mx-auto mb-4 stroke-[1]" />
                    <p className="font-serif text-xl text-lux-text mb-2">Your Bag is Empty</p>
                    <p className="text-xs text-lux-muted font-light mb-6">
                      Explore our handcrafted chandeliers and architectural fixtures.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block text-xs uppercase tracking-luxury text-lux-gold font-medium border-b border-lux-gold pb-1"
                    >
                      Start Exploring
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Calculations */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-lux-bg/60 border-t border-lux-border">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Privilege Code (LUXURY10)"
                      className="flex-1 bg-white border border-lux-border px-3 py-2 text-xs text-lux-text uppercase placeholder-lux-muted/60 focus:outline-none focus:border-lux-gold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-lux-dark text-white text-xs uppercase tracking-wider hover:bg-lux-gold transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {promoMessage && (
                    <p className={`text-xs mb-3 font-light ${discount > 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {promoMessage}
                    </p>
                  )}

                  {/* Calculations */}
                  <div className="space-y-2 text-xs text-lux-muted mb-4 font-light">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-lux-text font-medium">{formatPrice(cartSubtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Luxury Privilege Privilege</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Insured Freight & Handling</span>
                      <span className="text-emerald-700 font-medium">
                        {remainingForFreeShipping === 0 ? 'COMPLIMENTARY' : 'Calculated at Checkout'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-normal text-lux-text pt-2 border-t border-lux-border">
                      <span className="font-serif text-base">Estimated Total</span>
                      <span className="font-serif text-lg font-medium text-lux-text">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-lux-gold text-white hover:bg-lux-gold-dark text-xs uppercase tracking-luxury font-medium py-3.5 px-6 flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <span>Proceed to Secure Order & Concierge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-lux-muted tracking-wider uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-lux-gold" />
                    <span>Certified Safe SSL & GST Invoicing</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
