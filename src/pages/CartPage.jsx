import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SectionHeading } from '../components/ui/SectionHeading';
import { brandData } from '../data/brandData';

export const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartSubtotal, cartCount } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  });

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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `LS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="w-full pt-32 pb-24 bg-lux-bg min-h-screen">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 sm:p-14 border border-lux-border shadow-2xl space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-700" />
            </div>

            <span className="text-xs uppercase tracking-widest text-lux-gold font-medium block">
              ORDER CONFIRMED & CONCIERGE ASSIGNED
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-lux-text font-light">
              Your Lighting Order is Reserved
            </h1>

            <div className="p-4 bg-lux-bg border border-lux-border inline-block text-xs text-lux-muted">
              Order Reference: <strong className="text-lux-text font-serif text-base">{orderId}</strong>
            </div>

            <p className="text-sm text-lux-muted font-light leading-relaxed">
              Thank you, <strong className="text-lux-text font-medium">{checkoutData.fullName}</strong>. A confirmation has been transmitted to <span className="text-lux-text">{checkoutData.email}</span>. Our white-glove logistics team will contact you to coordinate insured wooden-crate delivery.
            </p>

            <div className="pt-4 flex justify-center gap-4">
              <Link
                to="/"
                className="bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-3.5 px-8 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-28 pb-24 bg-lux-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="YOUR ATELIER SELECTION"
          title="Shopping Bag & Checkout"
          subtitle="Review your handcrafted luminaires and proceed with secure ordering and insured pan-India transit."
          align="center"
        />

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Cart Items & Checkout Form (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Items Card */}
              <div className="bg-white border border-lux-border p-6 sm:p-8 shadow-card divide-y divide-lux-border/70">
                <h3 className="font-serif text-xl font-medium text-lux-text pb-4">
                  Bag Items ({cartCount})
                </h3>

                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.finish}`} className="py-5 flex gap-4 sm:gap-6 items-center">
                    <div className="w-20 sm:w-24 aspect-[4/5] bg-[#F2EFE9] shrink-0 overflow-hidden border border-lux-border">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-lux-gold font-medium block">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg text-lux-text font-medium truncate">
                        {item.name}
                      </h4>
                      {item.finish && (
                        <span className="text-xs text-lux-muted block mt-0.5">
                          Finish: {item.finish}
                        </span>
                      )}

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-lux-border bg-lux-bg/50">
                          <button
                            onClick={() => updateQuantity(item.id, item.finish, -1)}
                            className="w-7 h-7 flex items-center justify-center text-lux-text hover:bg-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.finish, 1)}
                            className="w-7 h-7 flex items-center justify-center text-lux-text hover:bg-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.finish)}
                          className="text-lux-muted hover:text-red-500 text-xs flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-serif text-lg font-medium text-lux-text block">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs text-lux-muted block font-light">
                          {formatPrice(item.price)} each
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="bg-white border border-lux-border p-6 sm:p-8 shadow-card">
                <h3 className="font-serif text-xl font-medium text-lux-text border-b border-lux-border pb-3 mb-6">
                  Insured Delivery & Contact Information
                </h3>

                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.fullName}
                        onChange={(e) => setCheckoutData({ ...checkoutData, fullName: e.target.value })}
                        placeholder="Recipient full name"
                        className="w-full bg-lux-bg border border-lux-border px-3.5 py-2.5 text-xs text-lux-text focus:outline-none focus:border-lux-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-1.5">
                        Phone Number (For Transit Updates) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                        placeholder="+91 98000 00000"
                        className="w-full bg-lux-bg border border-lux-border px-3.5 py-2.5 text-xs text-lux-text focus:outline-none focus:border-lux-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={checkoutData.email}
                        onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                        placeholder="Order receipt & GST invoice destination"
                        className="w-full bg-lux-bg border border-lux-border px-3.5 py-2.5 text-xs text-lux-text focus:outline-none focus:border-lux-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-1.5">
                        City & State *
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutData.city}
                        onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        placeholder="e.g. New Delhi, Delhi"
                        className="w-full bg-lux-bg border border-lux-border px-3.5 py-2.5 text-xs text-lux-text focus:outline-none focus:border-lux-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-1.5">
                      Delivery Address & Landmark *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={checkoutData.address}
                      onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                      placeholder="Building, Street, Area, Landmark"
                      className="w-full bg-lux-bg border border-lux-border p-3 text-xs text-lux-text focus:outline-none focus:border-lux-gold"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Summary & Order Confirmation (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-lux-border p-6 sm:p-8 shadow-card">
                <h3 className="font-serif text-xl font-medium text-lux-text pb-4 border-b border-lux-border mb-4">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Privilege Code (LUXURY10)"
                    className="flex-1 bg-lux-bg border border-lux-border px-3.5 py-2 text-xs uppercase text-lux-text focus:outline-none focus:border-lux-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-lux-dark text-white text-xs uppercase tracking-wider hover:bg-lux-gold transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p className={`text-xs mb-4 ${discount > 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {promoMessage}
                  </p>
                )}

                {/* Line Items */}
                <div className="space-y-3 text-xs text-lux-muted border-b border-lux-border pb-4 mb-4 font-light">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-lux-text font-medium">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Privilege Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insured Transit & Wooden Crate</span>
                    <span className="text-emerald-700 font-medium">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18% Included)</span>
                    <span className="text-lux-text">{formatPrice(Math.round(total * 0.18))}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-serif text-lg text-lux-text">Estimated Total</span>
                  <span className="font-serif text-2xl font-medium text-lux-text">
                    {formatPrice(total)}
                  </span>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-lux-gold text-white hover:bg-lux-gold-dark text-xs uppercase tracking-luxury font-medium py-4 px-6 flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <span>Place Order & Confirm with Concierge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-4 pt-4 border-t border-lux-border text-center text-[10px] text-lux-muted space-y-1">
                  <p className="flex items-center justify-center gap-1.5 text-lux-gold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Pan-India Transit Insured • 3-Year Atelier Warranty</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-lux-border p-12 max-w-xl mx-auto shadow-card">
            <ShoppingBag className="w-12 h-12 text-lux-border mx-auto mb-4 stroke-[1]" />
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-lux-text mb-2">
              Your Bag is Empty
            </h2>
            <p className="text-xs text-lux-muted font-light mb-6">
              Explore our curated chandeliers, wall sconces, and architectural lights to curate your space.
            </p>
            <Link
              to="/category/chandeliers"
              className="inline-block bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-3.5 px-8 transition-colors"
            >
              Browse Chandeliers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
