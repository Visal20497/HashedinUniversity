import { useState, useEffect } from 'react';
import Course from '../Utils/interface';
import { LOCAL_STORAGE_cartItemskey } from '../Utils/Contant';

const useCart = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_cartItemskey) || '[]',
    );
    setCartItems(storedCartItems);
  }, []);

  const addToCart = (course: Course) => {
    const updatedCartItems = [...cartItems, course];
    setCartItems(updatedCartItems);
    localStorage.setItem(
      LOCAL_STORAGE_cartItemskey,
      JSON.stringify(updatedCartItems),
    );
  };

  const removeFromCart = (courseId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== courseId);
    setCartItems(updatedCartItems);
    localStorage.setItem(
      LOCAL_STORAGE_cartItemskey,
      JSON.stringify(updatedCartItems),
    );
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
  };
};

export default useCart;
