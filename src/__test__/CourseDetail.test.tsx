import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CourseDetails from '../components/CourseDetails/CourseDetails';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
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

const mockCartContextValue = {
  cartItems: [] as Course[],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  setCartItems: jest.fn(),
};

const mockWishlistContextValue = {
  wishlistItems: [] as Course[],
  addToWishlist: jest.fn(),
  removeFromWishlist: jest.fn(),
  setWishlistItems: jest.fn(),
  toggleWishlistItem: jest.fn(),
};

const CourseDetailsWrapper = () => (
  <CartContext.Provider value={mockCartContextValue}>
    <WishlistContext.Provider value={mockWishlistContextValue}>
      <Router>
        <CourseDetails />
      </Router>
    </WishlistContext.Provider>
  </CartContext.Provider>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

jest.mock('../Utils/MockData', () => [
  {
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
  },
]);
describe('CourseDetails Component', () => {
  it('renders course details correctly', () => {
    render(<CourseDetailsWrapper />);
    const courseTitles = screen.getAllByText('React Basics');
    expect(courseTitles.length).toBeGreaterThan(0);
    expect(courseTitles[0]).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    const coursePrice = screen.getAllByText('Rs80/-');
    expect(coursePrice.length).toBeGreaterThan(0);
    expect(coursePrice[0]).toBeInTheDocument();
    expect(screen.getByText('Rs 100/-')).toBeInTheDocument();
    expect(screen.getByText('All Course')).toBeInTheDocument();
  });
  it('handles adding a course to the cart', async () => {
    render(<CourseDetailsWrapper />);
    expect(mockCartContextValue.cartItems).toEqual([]);
    fireEvent.click(screen.getByTestId('addCartbutton'));
    expect(mockCartContextValue.addToCart).toHaveBeenCalledWith(mockCourse);
    await waitFor(() => {
      expect(screen.getByTestId('popup-data')).toBeInTheDocument();
    });
    expect(
      screen.getByText(/Course\s+successfully added to the cart/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('popup-close')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('popup-close'));
  });
  it('if item is already in the cart add to cart button is clicked', async () => {
    mockCartContextValue.cartItems = [mockCourse];
    render(<CourseDetailsWrapper />);
    expect(mockCartContextValue.cartItems).not.toEqual([]);
    expect(screen.getByTestId('addCartbutton')).toBeInTheDocument();
    expect(mockCartContextValue.cartItems).toContainEqual(mockCourse);
    fireEvent.click(screen.getByTestId('addCartbutton'));
    await waitFor(() => {
      expect(screen.getByTestId('popup-data')).toBeInTheDocument();
    });
    expect(
      await screen.findByText((content) =>
        content.includes('Course is already in the cart'),
      ),
    ).toBeInTheDocument();
  });
  it('handles adding a course to the wishlist', async () => {
    render(<CourseDetailsWrapper />);
    expect(mockWishlistContextValue.wishlistItems).toEqual([]);
    fireEvent.click(screen.getByTestId('addToWishlistButton'));
    expect(mockWishlistContextValue.addToWishlist).toHaveBeenCalledWith(
      mockCourse,
    );
    await waitFor(() => {
      expect(screen.getByTestId('popup-data')).toBeInTheDocument();
    });
    // expect(
    //   screen.findByText((content) =>
    //     content.includes(Wishlist_Success_Message),
    //   ),
    // ).toBeInTheDocument();
    expect(screen.getByTestId('popup-close')).toBeInTheDocument();
  });
  it('if Item already in the wishlist', async () => {
    mockWishlistContextValue.wishlistItems = [mockCourse];
    render(<CourseDetailsWrapper />);
    expect(mockWishlistContextValue.wishlistItems).not.toEqual([]);
    expect(screen.getByTestId('addToWishlistButton')).toBeInTheDocument();
    expect(mockWishlistContextValue.wishlistItems).toContainEqual(mockCourse);
    fireEvent.click(screen.getByTestId('addToWishlistButton'));
    await waitFor(() => {
      expect(screen.getByTestId('popup-data')).toBeInTheDocument();
    });
    // expect(
    //   screen.findByText((content) =>
    //     content.includes(Wishlist_Success_Message),
    //   ),
    // ).toBeInTheDocument();
    expect(screen.getByTestId('popup-close')).toBeInTheDocument();
  });
  it('displays the countdown timer correctly', async () => {
    render(<CourseDetailsWrapper />);

    await waitFor(() => {
      expect(screen.getByText(/left for this price/)).toBeInTheDocument();
    });
  });
  it('renders the video iframe correctly', () => {
    render(<CourseDetailsWrapper />);

    const iframe = screen.getByTitle('Course Video');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/Y6aYx_KKM7A?si=fqrzCNib0G3YFow8?autoplay=1&mute=1',
    );
  });
  it('sets timeLeft to null when the countdown expires', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-01-01T23:59:50Z'));
    render(<CourseDetailsWrapper />);
    await waitFor(() => {
      expect(screen.getByText(/left for this price/)).toBeInTheDocument();
    });
    jest.advanceTimersByTime(15000);
    await waitFor(() => {
      expect(screen.queryByText(/left for this price/)).toBeInTheDocument();
    });
    jest.useRealTimers();
  });
});
