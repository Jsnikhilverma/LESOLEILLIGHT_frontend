import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { brandData } from "../../data/brandData";
import { categoriesData } from "../../data/categoriesData";

export const Footer = () => {
  return (
    <footer className="bg-lux-dark text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative ambient light bloom */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-lux-gold/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter / Concierge Teaser */}
        <div className="pb-16 border-b border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest-plus text-lux-gold font-medium mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Private Atelier & Design Concierge
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight">
              Curate Exceptional Light for Your Architectural Masterpiece.
            </h3>
            <p className="text-lux-dark-muted text-sm font-light mt-2 max-w-xl">
              Receive private previews of new chandelier collections, bespoke
              project showcases, and private design invitations.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Thank you for subscribing to Le Soleil Light VIP dispatch.",
                );
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-white/20 text-white placeholder-white/40 text-xs px-4 py-3.5 focus:outline-none focus:border-lux-gold transition-colors"
              />
              <button
                type="submit"
                className="bg-lux-gold text-white hover:bg-lux-gold-dark text-xs uppercase tracking-luxury font-medium px-6 py-3.5 transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <span className="text-[10px] text-white/40 mt-2 block font-light">
              Respecting your privacy. You can withdraw your subscription at any
              time.
            </span>
          </div>
        </div>

        {/* Main Multi-Column Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info (Col 1 - 4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link
                to="/"
                className="inline-flex items-center justify-center lg:justify-start group"
              >
                <img
                  src="/lesologo.jpeg"
                  alt="Le Soleil Light"
                  className="
        h-16
        sm:h-20
        md:h-24
        lg:h-28
        xl:h-32
        w-auto
        max-w-none
        object-contain
        transition-transform
        duration-300
        group-hover:scale-105
      "
                />
              </Link>
            </div>

            <p className="text-lux-dark-muted text-xs leading-relaxed font-light pr-4">
              {brandData.description}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-lux-gold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-white/80 font-light">
                Authentic Architectural & Luxury Luminaire Certification
              </span>
            </div>
          </div>

          {/* Shop Categories (Col 2 - 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base text-white font-medium uppercase tracking-wider border-b border-white/10 pb-2 inline-block">
              Lighting Collections
            </h4>
            <ul className="space-y-2 text-xs font-light text-lux-dark-muted">
              {categoriesData.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-lux-gold transition-colors block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation (Col 3 - 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base text-white font-medium uppercase tracking-wider border-b border-white/10 pb-2 inline-block">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-light text-lux-dark-muted">
              <li>
                <Link
                  to="/"
                  className="hover:text-lux-gold transition-colors block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-lux-gold transition-colors block"
                >
                  Our Story & Craft
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-lux-gold transition-colors block"
                >
                  Design Consultation
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-lux-gold transition-colors block"
                >
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-lux-gold transition-colors block"
                >
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link
                  to="/category/wicker-world"
                  className="hover:text-lux-gold transition-colors block"
                >
                  Wicker World
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Verified Contact (Col 4 - 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base text-white font-medium uppercase tracking-wider border-b border-white/10 pb-2 inline-block">
              Delhi Atelier & Showroom
            </h4>

            <div className="space-y-3 text-xs text-lux-dark-muted font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lux-gold shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {brandData.address.line1},<br />
                  {brandData.address.line2},<br />
                  {brandData.address.city} – {brandData.address.postalCode},
                  India
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-lux-gold shrink-0" />
                <span>{brandData.contact.hours}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lux-gold shrink-0" />
                <a
                  href={`tel:${brandData.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-lux-gold transition-colors"
                >
                  {brandData.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-lux-gold shrink-0" />
                <a
                  href={`mailto:${brandData.contact.email}`}
                  className="hover:text-lux-gold transition-colors"
                >
                  {brandData.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Area */}
        <div className="pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-lux-dark-muted font-light gap-4">
          <div>
            © {new Date().getFullYear()} {brandData.name}. All Rights Reserved.
            Luxury Architectural Lighting.
          </div>

          <div className="flex items-center gap-5">
            <Link
              to="/privacy-policy"
              className="hover:text-lux-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              to="/shipping-details"
              className="hover:text-lux-gold transition-colors"
            >
              Shipping & Transit Insurance
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-lux-gold transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
