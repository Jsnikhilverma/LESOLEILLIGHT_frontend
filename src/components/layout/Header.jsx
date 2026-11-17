import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { AnnouncementBar } from "./AnnouncementBar";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { SearchModal } from "../common/SearchModal";
import { CartDrawer } from "../common/CartDrawer";
import { WishlistDrawer } from "../common/WishlistDrawer";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  const navCategories = [
    { name: "Home", to: "/" },
    { name: "Chandeliers", to: "/category/chandeliers", hasMega: true },
    { name: "Ceiling Lights", to: "/category/ceiling-lights" },
    { name: "Dining Chandeliers", to: "/category/dining-table-chandeliers" },
    { name: "Duplex Chandeliers", to: "/category/duplex-chandeliers" },
    { name: "Ceiling Fans", to: "/category/ceiling-fans" },
    { name: "Wall Lamps", to: "/category/wall-lamps" },
    { name: "Architectural", to: "/category/architectural-lights" },
    { name: "Lamps", to: "/category/floor-table-lamps" },
    { name: "Contact", to: "/contact" },
  ];

  // Header background logic:
  // On home, transparent when at top; when scrolled or on inner pages, elegant solid / glass background
  const headerBgClass =
    isHome && !isScrolled
      ? "bg-gradient-to-b from-black/75 via-black/35 to-transparent text-white"
      : "glass-header text-lux-text border-b border-lux-border shadow-sm";

  const logoColorClass = isHome && !isScrolled ? "text-white" : "text-lux-text";
  const iconColorClass =
    isHome && !isScrolled
      ? "text-white hover:text-lux-gold"
      : "text-lux-text hover:text-lux-gold";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
        <AnnouncementBar />

        <div className={`transition-all duration-300 ${headerBgClass}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Mobile menu trigger */}
              <div className="flex items-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(true)}
                  className={`p-2 transition-colors ${iconColorClass}`}
                  aria-label="Open mobile navigation"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-2 ml-1 transition-colors ${iconColorClass}`}
                  aria-label="Open search dialog"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Brand Logo */}
              <div className="flex-1 lg:flex-initial text-center lg:text-left mr-10">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center lg:justify-start group"
                >
                  <img
                    src="/lesologo.jpeg"
                    alt="Le Soleil Light"
                    className="
        h-16
        sm:h-16
        md:h-16
        lg:h-20
        xl:h-20
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

              {/* Desktop Main Navigation */}
              <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
                {navCategories.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative py-2"
                    onMouseEnter={() => item.hasMega && setIsMegaMenuOpen(true)}
                  >
                    <Link
                      to={item.to}
                      className={`text-xs uppercase tracking-luxury font-medium transition-colors flex items-center gap-1 relative ${
                        location.pathname === item.to
                          ? "text-lux-gold"
                          : isHome && !isScrolled
                            ? "text-white/90 hover:text-lux-gold"
                            : "text-lux-text hover:text-lux-gold"
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.hasMega && (
                        <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                      {location.pathname === item.to && (
                        <span className="absolute -bottom-1.5 left-0 w-full h-[1.5px] bg-lux-gold" />
                      )}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Action Icons (Search, Wishlist, Cart, Account) */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                {/* Search */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className={`hidden lg:flex p-2.5 transition-colors ${iconColorClass}`}
                  aria-label="Search lighting collections"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Account / Concierge */}
                <Link
                  to="/contact"
                  className={`hidden sm:flex p-2.5 transition-colors ${iconColorClass}`}
                  aria-label="Concierge & Consultations"
                  title="Lighting Concierge"
                >
                  <User className="w-5 h-5" />
                </Link>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen(true)}
                  className={`p-2.5 relative transition-colors ${iconColorClass}`}
                  aria-label="Open wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-lux-gold text-white text-[10px] font-bold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Shopping Bag / Cart */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className={`p-2.5 relative transition-colors ${iconColorClass}`}
                  aria-label="Open shopping bag"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-lux-dark text-white border border-lux-gold text-[10px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mega Menu Dropdown */}
          <MegaMenu
            isOpen={isMegaMenuOpen}
            onClose={() => setIsMegaMenuOpen(false)}
          />
        </div>
      </header>

      {/* Global Modals & Drawers */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
};
