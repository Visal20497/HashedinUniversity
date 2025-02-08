import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import Cart from '../components/Cart/Cart';
import { Cart_Empty_Message } from '../Utils/Contant';
import Course from '../Utils/interface';

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

const recommendedCourse: Course = {
  id: 2,
  title: 'Advanced React',
  price: 150,
  discountedPrice: 120,
  educator: 'Jane Smith',
  courseDetails:
    'Dive deeper into React with hooks, context, and advanced patterns. Enhance your React skills to build more complex applications.',
  timeLeft: '15 days',
  recommendedCourse: 'React and Redux',
  videoUrl: 'https://www.youtube.com/embed/qTDnwmMF5q8?si=j_O9UhJzLH72c5PH',
};

const mockWishlistContextValue = {
  wishlistItems: [] as Course[],
  toggleWishlistItem: jest.fn(),
  addToWishlist: jest.fn(),
  removeFromWishlist: jest.fn(),
};

const mockCartContextValue = {
  cartItems: [mockCourse] as Course[],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  setCartItems: jest.fn(),
};

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../Utils/MockData', () => [
  {
    id: 2,
    title: 'Advanced React',
    price: 150,
    discountedPrice: 120,
    educator: 'Jane Smith',
    courseDetails:
      'Dive deeper into React with hooks, context, and advanced patterns. Enhance your React skills to build more complex applications.',
    timeLeft: '15 days',
    recommendedCourse: 'React and Redux',
    videoUrl: 'https://www.youtube.com/embed/qTDnwmMF5q8?si=j_O9UhJzLH72c5PH',
  },
]);

const CartWrapper = () => (
  <WishlistContext.Provider value={mockWishlistContextValue}>
    <CartContext.Provider value={mockCartContextValue}>
      <Router>
        <Cart />
      </Router>
    </CartContext.Provider>
  </WishlistContext.Provider>
);
describe('Cart Component', () => {
  it('renders cart details correctly', () => {
    render(<CartWrapper />);
    expect(screen.getByText('1 Courses in Cart')).toBeInTheDocument();
    expect(screen.getAllByText('React Basics')[0]).toBeInTheDocument();
    expect(screen.getAllByText('John Doe')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Rs 80/-')[0]).toBeInTheDocument();
  });
  it('calls removeFromCart when the remove button is clicked', () => {
    render(<CartWrapper />);
    fireEvent.click(screen.getByAltText('removeFromCart'));
    expect(mockCartContextValue.removeFromCart).toHaveBeenCalledWith(
      mockCourse.id,
    );
  });
  it('should add recommended course to the cart when add to cart button is clicked', async () => {
    render(<CartWrapper />);
    fireEvent.click(screen.getByText('ADD TO CART'));
    expect(mockCartContextValue.addToCart).toHaveBeenCalledWith(
      recommendedCourse,
    );

    await waitFor(() => {
      expect(screen.getByTestId('popup-data')).toBeInTheDocument();
    });

    expect(
      await screen.findByText((content) =>
        content.includes('Course successfully added to the cart'),
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('popup-close')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('popup-close'));
  });
  it('calls handleMoveToWishlist when the "Move to Wishlist" button is clicked', () => {
    render(<CartWrapper />);
    expect(mockWishlistContextValue.wishlistItems).toEqual([]);
    fireEvent.click(screen.getByText('Move to Wishlist'));
    expect(mockWishlistContextValue.toggleWishlistItem).toHaveBeenCalledWith(
      mockCourse,
    );
    expect(mockCartContextValue.removeFromCart).toHaveBeenCalledWith(
      mockCourse.id,
    );
  });
  it('already in the wishlistItems  when the "Move to Wishlist" button is clicked', () => {
    mockWishlistContextValue.wishlistItems = [mockCourse];
    render(<CartWrapper />);
    expect(mockWishlistContextValue.wishlistItems).not.toEqual([]);
    expect(mockWishlistContextValue.wishlistItems).toContainEqual(mockCourse);
    fireEvent.click(screen.getByText('Move to Wishlist'));
    expect(mockCartContextValue.removeFromCart).toHaveBeenCalledWith(
      mockCourse.id,
    );
  });
  it('navigates to payment page when the checkout button is clicked', () => {
    render(<CartWrapper />);
    fireEvent.click(screen.getByTestId('checkout-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/payment');
  });
  it('displays total price and saved amount correctly', () => {
    render(<CartWrapper />);
    expect(screen.getByText('Total Amount')).toBeInTheDocument();
    expect(screen.getAllByText('Rs 80/-')[0]).toBeInTheDocument();
    expect(screen.getByText('You have saved Rs 20/-')).toBeInTheDocument();
  });
  it('should display Cart_Empty_Message when the cart is empty', () => {
    mockCartContextValue.cartItems = [];
    render(<CartWrapper />);
    expect(screen.getByText(Cart_Empty_Message)).toBeInTheDocument();
  });
  it('if item is already in the cart add to cart button is clicked', async () => {
    mockCartContextValue.cartItems = [recommendedCourse, mockCourse];
    render(<CartWrapper />);

    const addToCartButtons = screen.getAllByTestId('AddCart');
    const addToCartButton = addToCartButtons.find((button) =>
      button.closest('.course-card'),
    );
    if (!addToCartButton) {
      throw new Error('Add to Cart button not found');
    }
    fireEvent.click(addToCartButton);

    expect(mockCartContextValue.addToCart).toHaveBeenCalledWith(
      recommendedCourse,
    );

    await waitFor(() => {
      expect(screen.getByTestId('popup-data')).toBeInTheDocument();
    });
    expect(
      await screen.findByText((content) =>
        content.includes('Course is already in the cart'),
      ),
    ).toBeInTheDocument();
  });
});
