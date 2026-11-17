import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { brandData } from '../../data/brandData';

export const ConsultationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Architectural Lighting Consultation',
    message: '',
    projectType: 'Private Villa / Penthouse'
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="consultation" className="py-24 sm:py-36 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="BESPOKE DESIGN ATELIER"
          title="Let's Create Something Extraordinary."
          subtitle="Looking for the perfect lighting for your space? Connect with our team to explore lighting solutions that complement your vision."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-lux-bg p-8 sm:p-12 border border-lux-border shadow-card">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-lux-text font-normal mb-2">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-lux-muted font-light max-w-md mx-auto mb-6">
                  Thank you, <strong className="font-medium text-lux-text">{formData.name}</strong>. Our senior lighting director in Vasant Kunj will review your space requirements and reach out via phone/email shortly.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Architectural Lighting Consultation',
                      message: '',
                      projectType: 'Private Villa / Penthouse'
                    });
                  }}
                  variant="outline"
                  size="sm"
                >
                  Send Another Inquiry
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-white border border-lux-border px-4 py-3 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. priya@design.com"
                      className="w-full bg-white border border-lux-border px-4 py-3 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98100 00000"
                      className="w-full bg-white border border-lux-border px-4 py-3 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white border border-lux-border px-4 py-3 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                    >
                      <option value="Architectural Lighting Consultation">Architectural Lighting Consultation</option>
                      <option value="Custom Duplex Chandelier Design">Custom Duplex Chandelier Design</option>
                      <option value="Residential Lighting Overhaul">Residential Lighting Overhaul</option>
                      <option value="Commercial / Hospitality Inquiry">Commercial / Hospitality Inquiry</option>
                      <option value="Showroom Visit Appointment">Showroom Visit Appointment</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-lux-text font-medium mb-2">
                    Describe Your Space, Ceiling Height or Vision *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your room dimensions, ceiling height (e.g. 18ft duplex, 10ft apartment), preferred aesthetic (crystal, modern, brass), or specific products of interest..."
                    className="w-full bg-white border border-lux-border p-4 text-sm text-lux-text focus:outline-none focus:border-lux-gold transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-4 px-8 flex items-center justify-center gap-2 shadow-md transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Consultation Request...</span>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Verified Business Information & Showroom (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-lux-dark text-white p-8 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lux-gold/15 blur-2xl rounded-full pointer-events-none" />

              <span className="text-xs uppercase tracking-widest text-lux-gold font-medium mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Delhi Showroom & Studio
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mb-6">
                Experience Our Lighting in Person.
              </h3>

              <div className="space-y-5 text-xs text-lux-dark-muted font-light">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lux-gold shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white font-medium block text-sm mb-0.5">Physical Atelier Location</strong>
                    <address className="not-italic leading-relaxed">
                      {brandData.address.line1},<br />
                      {brandData.address.line2},<br />
                      {brandData.address.city} – {brandData.address.postalCode}, India
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lux-gold shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white font-medium block text-sm mb-0.5">Showroom Operating Hours</strong>
                    <span>{brandData.contact.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lux-gold shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white font-medium block text-sm mb-0.5">Official Inquiries</strong>
                    <a href={`mailto:${brandData.contact.email}`} className="text-white hover:text-lux-gold transition-colors">
                      {brandData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lux-gold shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white font-medium block text-sm mb-0.5">Direct Telephonic Helpline</strong>
                    <a href={`tel:${brandData.contact.phone.replace(/[^0-9+]/g, '')}`} className="text-white hover:text-lux-gold transition-colors">
                      {brandData.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${brandData.contact.whatsapp}?text=${encodeURIComponent("Hello Le Soleil Light, I would like to inquire about your luxury chandeliers and lighting collections.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-luxury font-medium py-3 px-4 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>

                <a
                  href={`tel:${brandData.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-luxury font-medium py-3 px-4 flex items-center justify-center gap-2 transition-colors border border-white/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
