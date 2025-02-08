import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import useCart from '../Hooks/UserCart';
import { CartProvider, useCartContext } from '../context/CartContext';
import Course from '../Utils/interface';
import { LOCAL_STORAGE_cartItemskey } from '../Utils/Contant';

const mockCourse: Course = {
  id: 1,
  title: 'React Basics',
  price: 100,
  discountedPrice: 80,
  educator: 'John Doe',
  courseDetails:
    'Learn the basics of React, including components, state, and props. This course will help you build a strong foundation in React.',
  timeLeft: '10 days',
  recommendedCourse: 'Advanced React',
  videoUrl: 'https://www.youtube.com/embed/Y6aYx_KKM7A?si=fqrzCNib0G3YFow8',
};
describe('useCart Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should initialize with items from local storage', () => {
    localStorage.setItem(
      LOCAL_STORAGE_cartItemskey,
      JSON.stringify([mockCourse]),
    );

    const { result } = renderHook(() => useCart());

    expect(result.current.cartItems).toEqual([mockCourse]);
  });
  it('should add a course to the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockCourse);
    });

    expect(result.current.cartItems).toEqual([mockCourse]);
    expect(localStorage.getItem(LOCAL_STORAGE_cartItemskey)).toEqual(
      JSON.stringify([mockCourse]),
    );
  });
  it('should remove a course from the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockCourse);
    });

    expect(result.current.cartItems).toEqual([mockCourse]);

    act(() => {
      result.current.removeFromCart(mockCourse.id);
    });

    expect(result.current.cartItems).toEqual([]);
    expect(localStorage.getItem(LOCAL_STORAGE_cartItemskey)).toEqual(
      JSON.stringify([]),
    );
  });
});
describe('CartContext', () => {
  const TestComponent = () => {
    const { cartItems, addToCart, removeFromCart } = useCartContext();

    return (
      <div>
        <button onClick={() => addToCart(mockCourse)}>Add to Cart</button>
        <button onClick={() => removeFromCart(mockCourse.id)}>
          Remove from Cart
        </button>
        <div data-testid="cart-items">{JSON.stringify(cartItems)}</div>
      </div>
    );
  };
  it('should provide cart context values', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    const addToCartButton = screen.getByText('Add to Cart');
    const removeFromCartButton = screen.getByText('Remove from Cart');
    const cartItemsDiv = screen.getByTestId('cart-items');

    expect(cartItemsDiv).toHaveTextContent('[]');
    fireEvent.click(addToCartButton);
    expect(cartItemsDiv).toHaveTextContent(JSON.stringify([mockCourse]));
    fireEvent.click(removeFromCartButton);
    expect(cartItemsDiv).toHaveTextContent('[]');
  });
});
