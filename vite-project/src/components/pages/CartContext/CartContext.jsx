import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      const savedCart = localStorage.getItem('cart');
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error('Failed to parse localStorage data', error);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
      localStorage.setItem('cart', JSON.stringify(cart));
    }, 300);

    return () => clearTimeout(timeout);
  }, [favorites, cart]);

  const value = {
    favorites,
    cart,
    toggleFavorite: (item) => {
      setFavorites(prev => {
        const exists = prev.some(fav => fav.uniqueId === item.uniqueId);
        return exists
          ? prev.filter(fav => fav.uniqueId !== item.uniqueId)
          : [...prev, item];
      });
    },
    removeFavorite: (uniqueId) => {
      setFavorites(prev => prev.filter(item => item.uniqueId !== uniqueId));
    },
    addToCart: (item) => {
      setCart(prev => {
        const exists = prev.some(cartItem => cartItem.uniqueId === item.uniqueId);
        return exists ? prev : [...prev, item];
      });
    },
    removeFromCart: (uniqueId) => {
      setCart(prev => prev.filter(item => item.uniqueId !== uniqueId));
    },
    clearCart: () => setCart([]),
    isInCart: (uniqueId) => cart.some(item => item.uniqueId === uniqueId),
    isFavorite: (uniqueId) => favorites.some(item => item.uniqueId === uniqueId)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};