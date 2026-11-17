# LE SOLEIL LIGHT — LUXURY ARCHITECTURAL LIGHTING WEBSITE

A redesign and frontend implementation for **Le Soleil Light** (https://lesoleillight.com/), crafted with international luxury brand aesthetics, high-end architectural imagery, refined typography, and responsive modern interactions.

---

## 🌟 Brand & Visual Identity

- **Main Background**: `#F8F6F1`
- **Secondary Background**: `#FFFFFF`
- **Primary Text**: `#171717`
- **Secondary Text**: `#77736C`
- **Luxury Gold**: `#B69A66`
- **Border**: `#E8E2D8`
- **Dark Architectural Sections**: `#151515`
- **Typography**: 
  - Headings: *Cormorant Garamond* (Italian luxury serif)
  - Body & Microcopy: *DM Sans* (Clean, contemporary architectural sans-serif)

---

## 🏛️ Authentic Verified Business Grounding

All store information and core products are grounded in the authentic business reference (**lesoleillight.com**):

- **Store & Atelier Address**: D – 520, Green Avenue Street, Green Avenue, Church Road, Vasant Kunj, New Delhi – 110070, India
- **Official Inquiries**: `lesoleillight@gmail.com`
- **Operating Hours**: 09:30 – 21:30 IST (All 7 Days)
- **Verified Product Inclusions**:
  - *Opulent Column Wall Light*
  - *Glass Leaf Chandelier Fan With Remote* (₹22,999 / ₹39,999)
  - *Woodland Crystal Chandelier Ceiling Fan* (₹23,999 / ₹39,999)
  - *Abniel LED Smart Chandelier Ceiling Fan* (₹13,500 / ₹19,999)
  - *King Wall Light*
  - *Old Town Elegance Wall Light*
  - *Arbor Wall Light*
  - *Carmona Wall Light*
  - *Asgard Triple Ring Crystal Chandelier*
  - *Soleil Grand Duplex Cascading Chandelier*
  - *Aura Linear Dining Chandelier*
  - *Matrix 48V Magnetic Architectural Track System*
  - *Batman IP65 Exterior Facade Light*
  - *Versailles K9 Crystal Flush Mount*
  - *L'Arc Travertine Floor Lamp*
  - *Wicker World Artisan Natural Pendant*

---

## 🛠️ Tech Stack

- **React.js 18** (JavaScript / JSX)
- **Tailwind CSS 3** with custom luxury design tokens
- **Framer Motion** for smooth staggered transitions, modal zooms & layout animations
- **React Router DOM 6** for multi-page routing
- **Lucide React** for minimalist luxury iconography
- **Swiper.js** for high-performance sliders
- **Vite 5** for blazing-fast builds

---

## 🚀 Running the Project

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📁 Architecture & File Structure

```
leso/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── CartDrawer.jsx          # Slide-over shopping bag with promo codes & checkout
│   │   │   ├── ProductCard.jsx         # Card with secondary image hover, wishlist & quick view
│   │   │   ├── QuickViewModal.jsx      # Lightbox with finish selector & technical specs
│   │   │   ├── ScrollToTop.jsx         # Instant top scroll on route changes
│   │   │   ├── SearchModal.jsx         # Real-time search with trending queries
│   │   │   ├── Toast.jsx               # Luxury floating notification
│   │   │   └── WishlistDrawer.jsx      # Saved fixtures drawer
│   │   ├── home/
│   │   │   ├── BrandStory.jsx          # Section 7: "More Than Light. An Expression of Living."
│   │   │   ├── ConsultationSection.jsx # Section 11: Validated inquiry form & Delhi showroom info
│   │   │   ├── FeaturedCollections.jsx # Section 5: Asymmetrical editorial collection grid
│   │   │   ├── FeaturedProducts.jsx    # Section 6: Tabbed actual catalog with verified INR prices
│   │   │   ├── HeroSection.jsx         # Section 4: Cinematic full-width luxury slider
│   │   │   ├── InspirationGallery.jsx  # Section 10: Editorial lifestyle magazine masonry
│   │   │   ├── ShopByStyle.jsx         # Section 8: 6 major aesthetic archetypes
│   │   │   └── WhyChooseUs.jsx         # Section 9: 6 trust pillars with minimal line icons
│   │   ├── layout/
│   │   │   ├── AnnouncementBar.jsx     # Top luxury announcement banner
│   │   │   ├── Footer.jsx              # Section 12: Multi-column luxury footer
│   │   │   ├── Header.jsx              # Section 3: Transparent-to-solid header with mega menu
│   │   │   ├── MegaMenu.jsx            # Category dropdown with visual previews
│   │   │   └── MobileNav.jsx           # Responsive drawer with accordion subcategories
│   │   └── ui/
│   │       ├── Button.jsx              # Polished button variants (primary, outline, dark)
│   │       └── SectionHeading.jsx      # Editorial typography wrapper with gold accents
│   ├── context/
│   │   ├── CartContext.jsx             # Shopping bag state & persistence
│   │   └── WishlistContext.jsx         # Wishlist state & persistence
│   ├── data/
│   │   ├── brandData.js                # Verified Delhi showroom address, email, hours & pillars
│   │   ├── categoriesData.js           # 10 core lighting categories & subcategories
│   │   ├── galleryData.js              # High-end residential & commercial interiors
│   │   ├── productsData.js             # Verified products from lesoleillight.com with specs
│   │   └── stylesData.js               # Modern, Crystal, Vintage, Profile, Architectural, Decorative
│   ├── pages/
│   │   ├── AboutPage.jsx               # Heritage, craftsmanship, K9 optical crystal & high-CRI LEDs
│   │   ├── CartPage.jsx                # Full shopping bag, promo validation & order placement
│   │   ├── CategoryPage.jsx            # Dynamic category listing with subcategory pills & sorting
│   │   ├── ContactPage.jsx             # Dedicated consultation booking & showroom details
│   │   ├── HomePage.jsx                # Full 11-section redesigned flagship experience
│   │   ├── NotFoundPage.jsx            # Custom 404 page
│   │   ├── PolicyPages.jsx             # Privacy Policy, Shipping & Transit, Terms of Service
│   │   ├── ProductDetailPage.jsx       # Multi-angle gallery, specs table & WhatsApp concierge
│   │   └── WishlistPage.jsx            # Curated moodboard of saved fixtures
│   ├── App.jsx                         # Main routes & global layout wrapper
│   ├── index.css                       # Luxury scrollbars, gold gradients, glassmorphism
│   └── main.jsx                        # React root entrypoint
├── index.html                          # Cormorant Garamond & DM Sans Google fonts
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
