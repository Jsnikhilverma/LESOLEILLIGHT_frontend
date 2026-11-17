import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCollections } from '../components/home/FeaturedCollections';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { BrandStory } from '../components/home/BrandStory';
import { ShopByStyle } from '../components/home/ShopByStyle';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { InspirationGallery } from '../components/home/InspirationGallery';
import { ConsultationSection } from '../components/home/ConsultationSection';

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* 4. Cinematic Hero Section */}
      <HeroSection />

      {/* 5. Featured Collections */}
      <FeaturedCollections />

      {/* 6. Featured Products */}
      <FeaturedProducts />

      {/* 7. Luxury Brand Story */}
      <BrandStory />

      {/* 8. Shop by Lighting Style */}
      <ShopByStyle />

      {/* 9. Why Choose Le Soleil Light */}
      <WhyChooseUs />

      {/* 10. Inspiration & Lifestyle Gallery */}
      <InspirationGallery />

      {/* 11. Contact & Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
