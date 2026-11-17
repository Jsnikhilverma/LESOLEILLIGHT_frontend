import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast = () => {
  const { notification } = useCart();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 max-w-md bg-lux-dark text-white p-4 shadow-2xl border border-lux-gold/40 flex items-center gap-3.5 backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-full bg-lux-gold/20 flex items-center justify-center text-lux-gold shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-sm font-light leading-snug">
            {notification}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
