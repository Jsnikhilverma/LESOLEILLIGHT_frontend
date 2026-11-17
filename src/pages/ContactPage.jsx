import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Sparkles, Navigation } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { brandData } from '../data/brandData';

export const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    subject: 'Architectural Lighting Consultation',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="w-full pt-28 pb-24 bg-lux-bg min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <SectionHeading
          eyebrow="CLIENT SERVICES & ATELIER"
          title="Connect with Our Design Directors"
          subtitle="Whether you are building a private villa or selecting a statement chandelier, our lighting specialists are at your service."
          align="center"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-lux-border shadow-card">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="font-serif text-3xl font-light text-lux-text mb-2">
                  Thank You for Reaching Out
                </h3>
                <p className="text-sm text-lux-muted font-light max-w-md mx-auto mb-6">
                  We have received your architectural inquiry. One of our senior lighting directors will review your project details and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-3 px-6 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-2xl font-light text-lux-text border-b border-lux-border pb-3">
                  Inquire For Project or Schedule Showroom Visit
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full bg-lux-bg border border-lux-border px-4 py-3 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. vikram@estate.com"
                      className="w-full bg-lux-bg border border-lux-border px-4 py-3 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98000 00000"
                      className="w-full bg-lux-bg border border-lux-border px-4 py-3 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                      City / Location
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Delhi NCR, Mumbai, Bangalore"
                      className="w-full bg-lux-bg border border-lux-border px-4 py-3 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                    Inquiry Scope
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-lux-bg border border-lux-border px-4 py-3 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                  >
                    <option value="Architectural Lighting Consultation">Architectural Lighting Consultation</option>
                    <option value="Duplex & High-Ceiling Chandelier Customization">Duplex & High-Ceiling Chandelier Customization</option>
                    <option value="Showroom Appointment in Vasant Kunj">Showroom Appointment in Vasant Kunj</option>
                    <option value="Bulk Architectural / B2B Commercial Project">Bulk Architectural / B2B Commercial Project</option>
                    <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                    Project Details & Questions *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your space, ceiling dimensions, lighting preferences, or specific models you are interested in..."
                    className="w-full bg-lux-bg border border-lux-border p-4 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-4 px-8 flex items-center justify-center gap-2 shadow-md transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <span>Transmit Message to Atelier</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Verified Details & Map Card (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-lux-dark text-white p-8 sm:p-10 border border-white/10 shadow-2xl space-y-6">
              <span className="text-xs uppercase tracking-widest text-lux-gold font-medium block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL SHOWROOM & ATELIER
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                Le Soleil Light Delhi
              </h3>

              <div className="space-y-4 text-xs text-lux-dark-muted font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-lux-gold shrink-0 mt-0.5" />
                  <address className="not-italic leading-relaxed text-white/90">
                    {brandData.address.line1},<br />
                    {brandData.address.line2},<br />
                    {brandData.address.city} – {brandData.address.postalCode}, India
                  </address>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-lux-gold shrink-0" />
                  <span className="text-white/90">{brandData.contact.hours}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-lux-gold shrink-0" />
                  <a href={`mailto:${brandData.contact.email}`} className="text-white hover:text-lux-gold transition-colors">
                    {brandData.contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-lux-gold shrink-0" />
                  <a href={`tel:${brandData.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-white hover:text-lux-gold transition-colors">
                    {brandData.contact.phone}
                  </a>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${brandData.contact.whatsapp}?text=${encodeURIComponent("Hello Le Soleil Light, I would like to schedule an architectural lighting consultation.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-luxury font-medium py-3 px-4 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Atelier</span>
                </a>

                <a
                  href="https://maps.google.com/?q=D-520+Green+Avenue+Church+Road+Vasant+Kunj+New+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-luxury font-medium py-3 px-4 flex items-center justify-center gap-2 transition-colors border border-white/20"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Architectural Service Box */}
            <div className="bg-white p-6 sm:p-8 border border-lux-border space-y-3">
              <h4 className="font-serif text-lg font-medium text-lux-text">
                Architectural & Designer Trade Accounts
              </h4>
              <p className="text-xs text-lux-muted leading-relaxed font-light">
                We extend dedicated trade privileges to architects, interior decorators, and developers, including trade pricing, CAD 2D/3D blocks, Dialux photometric calculation files, and personalized mock-up samples.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
