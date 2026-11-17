import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="w-full pt-40 pb-32 bg-lux-bg min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        <span className="text-xs uppercase tracking-widest text-lux-gold font-medium mb-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          404 ERROR • UNCHARTED SPACE
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-light text-lux-text mb-4">
          Light Not Found
        </h1>
        <p className="text-sm text-lux-muted font-light leading-relaxed mb-8">
          The architectural luminaire or category page you are looking for has been relocated or is currently in our design development phase.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-lux-dark text-white hover:bg-lux-gold text-xs uppercase tracking-luxury font-medium py-3.5 px-8 transition-colors"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
