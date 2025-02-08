import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import mockData from '../Utils/MockData';
import { CartContext } from '../context/CartContext';
import { Cart_Empty_Message } from '../Utils/Contant';
import CartSideBar from '../components/CartSideBar/SideBarCart';

const mockCartContextValue = {
  cartItems: [mockData[0], mockData[1]],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  setCartItems: jest.fn(),
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
const CartSideBarWrapper = () => (
  <CartContext.Provider value={mockCartContextValue}>
    <Router>
      <CartSideBar />
    </Router>
  </CartContext.Provider>
);
describe('CartSideBar Component', () => {
  it('renders cart items and total price correctly', () => {
    render(<CartSideBarWrapper />);
    expect(screen.getByText('YOUR CART DETAILS')).toBeInTheDocument();
    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('Advanced React')).toBeInTheDocument();

    const totalPrice = mockCartContextValue?.cartItems?.reduce(
      (total, item) => total + (item.discountedPrice || item.price),
      0,
    );
    expect(screen.getByText(`Rs ${totalPrice}/-`)).toBeInTheDocument();
    expect(screen.getByAltText('Go-to-Checkout')).toBeVisible();
    expect(screen.getByTestId(`checkout`)).toBeInTheDocument();
  });
  it('renders placeholder text when cart is empty', () => {
    render(
      <CartContext.Provider value={{ ...mockCartContextValue, cartItems: [] }}>
        <Router>
          <CartSideBar />
        </Router>
      </CartContext.Provider>,
    );
    expect(screen.getByText(Cart_Empty_Message)).toBeInTheDocument();
    expect(screen.queryByAltText('Go-to-Checkout')).not.toBeVisible();
  });
  it('navigates to checkout page when the checkout button is clicked', () => {
    render(<CartSideBarWrapper />);
    fireEvent.click(screen.getByTestId('checkout'));
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });
});
