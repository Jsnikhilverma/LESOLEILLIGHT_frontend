import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lesoleil_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'prod-1',
          name: 'Opulent Column Wall Light',
          category: 'Wall Lamps',
          price: 7499,
          originalPrice: 12999,
          quantity: 1,
          finish: 'Electroplated Brushed Gold',
          image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80',
          sku: 'LS-WL-0104'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('lesoleil_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const addToCart = (product, quantity = 1, finish = 'Standard Brass') => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.finish === finish);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          quantity: quantity,
          finish: finish,
          sku: product.sku || `LS-${product.id.toUpperCase()}`
        }];
      }
    });
    showNotification(`Added "${product.name}" to your shopping bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (id, finish, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id && item.finish === finish) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id, finish) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.finish === finish)));
    showNotification('Item removed from shopping bag');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartSubtotal,
      notification
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
