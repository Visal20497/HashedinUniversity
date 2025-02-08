import React, { createContext, useContext, ReactNode } from 'react';
import useCart from '../Hooks/UserCart.ts';
import Course from '../Utils/interface.ts';

interface CartContextType {
  cartItems: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<Course[]>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { cartItems, addToCart, removeFromCart, setCartItems } = useCart();

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
