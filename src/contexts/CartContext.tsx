import React, { createContext, useContext, useState, useEffect } from "react";
import { getItemPrice } from "@/data/products";

interface CartContextType {
  cart: Record<string, number>;
  updateQty: (id: string, delta: number, openCart?: boolean) => void;
  removeFromCart: (id: string) => void;
  subtotal: number;
  cartCount: number;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQty = (id: string, delta: number, openCart = false) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      
      if (newQty === 0 && currentQty > 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      
      if (newQty > 0) {
        return { ...prev, [id]: newQty };
      }
      return prev;
    });
    if (openCart && delta > 0) {
      setCartOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
  };

  const clearCart = () => setCart({});

  const subtotal = Object.entries(cart).reduce(
    (sum, [id, qty]) => sum + getItemPrice(id) * qty,
    0
  );
  
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <CartContext.Provider value={{ cart, updateQty, removeFromCart, subtotal, cartCount, clearCart, isCartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
