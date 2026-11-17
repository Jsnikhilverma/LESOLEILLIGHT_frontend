import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { SectionHeading } from '../components/ui/SectionHeading';

export const WishlistPage = () => {
  const { wishlistItems, toggleWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleMoveAllToBag = () => {
    wishlistItems.forEach(item => {
      addToCart(item, 1);
    });
  };

  return (
    <div className="w-full pt-28 pb-24 bg-lux-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SAVED LUXURY PIECES"
          title="Your Curated Wishlist"
          subtitle="A personalized repository of fixtures shortlisted for your architectural residence."
          align="center"
        />

        {wishlistItems.length > 0 ? (
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-lux-border mb-8">
              <span className="text-xs uppercase tracking-wider text-lux-muted">
                {wishlistCount} Saved Luminaire{wishlistCount > 1 ? 's' : ''}
              </span>
              <button
                onClick={handleMoveAllToBag}
                className="text-xs uppercase tracking-luxury text-lux-gold hover:text-lux-gold-dark font-medium flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Shopping Bag</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white border border-lux-border flex flex-col shadow-card group">
                  <div className="relative aspect-[4/5] bg-[#F2EFE9] overflow-hidden">
                    <Link to={`/product/${item.slug || item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-red-500 hover:bg-white flex items-center justify-center shadow-sm"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-lux-gold font-medium block mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-lux-text line-clamp-1 group-hover:text-lux-gold transition-colors">
                        <Link to={`/product/${item.slug || item.id}`}>
                          {item.name}
                        </Link>
                      </h3>
                      <span className="font-serif text-lg font-medium text-lux-text block mt-2">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(item, 1);
                        toggleWishlist(item);
                      }}
                      className="mt-4 w-full bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-2.5 px-4 flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-lux-border p-12 max-w-xl mx-auto shadow-card">
            <Heart className="w-12 h-12 text-lux-border mx-auto mb-4 stroke-[1]" />
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-lux-text mb-2">
              No Fixtures Saved Yet
            </h2>
            <p className="text-xs text-lux-muted font-light mb-6">
              Bookmark statement chandeliers, fan lights, or wall lamps while browsing to compare them here.
            </p>
            <Link
              to="/category/chandeliers"
              className="inline-block bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-3.5 px-8 transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
