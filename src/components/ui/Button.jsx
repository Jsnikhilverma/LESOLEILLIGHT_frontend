import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium tracking-luxury uppercase transition-all duration-300 rounded-none disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden select-none";

  const sizeStyles = {
    sm: "text-xs px-4 py-2.5 space-x-2",
    md: "text-xs px-6 py-3.5 space-x-2.5",
    lg: "text-sm px-8 py-4 space-x-3",
    xl: "text-sm px-10 py-5 space-x-3.5",
  };

  const variants = {
    primary: "bg-lux-gold text-white hover:bg-lux-gold-dark shadow-sm hover:shadow-luxury-hover border border-lux-gold",
    secondary: "bg-lux-text text-lux-bg hover:bg-lux-gold hover:text-white border border-lux-text hover:border-lux-gold",
    outline: "bg-transparent text-lux-text border border-lux-border hover:border-lux-gold hover:text-lux-gold hover:bg-white/50",
    outlineGold: "bg-transparent text-lux-gold border border-lux-gold hover:bg-lux-gold hover:text-white",
    outlineDark: "bg-transparent text-white border border-white/30 hover:border-lux-gold hover:text-lux-gold hover:bg-white/5",
    ghost: "bg-transparent text-lux-text hover:text-lux-gold px-0 py-2 border-b border-transparent hover:border-lux-gold",
    dark: "bg-lux-dark text-white hover:bg-lux-gold hover:text-white border border-lux-dark hover:border-lux-gold"
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};
