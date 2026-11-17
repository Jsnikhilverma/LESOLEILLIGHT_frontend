import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-3 justify-center"
          style={{ justifyContent: isCenter ? 'center' : 'flex-start' }}
        >
          <span className="w-6 h-[1px] bg-lux-gold/60 inline-block"></span>
          <span className="text-xs uppercase font-medium tracking-widest-plus text-lux-gold">
            {eyebrow}
          </span>
          <span className="w-6 h-[1px] bg-lux-gold/60 inline-block"></span>
        </motion.div>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.15] mb-4 ${
            dark ? 'text-white' : 'text-lux-text'
          }`}
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-sm sm:text-base font-light leading-relaxed ${
            dark ? 'text-lux-dark-muted' : 'text-lux-muted'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
