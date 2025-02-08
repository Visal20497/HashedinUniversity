import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartContext, CartProvider } from '../context/CartContext';
import { WishlistContext, WishlistProvider } from '../context/WishlistContext';
import CourseList from '../components/CourseList/CourseList';
import Course from '../Utils/interface';
import mockData from '../Utils/MockData';

jest.mock('../Utils/MockData', () => [
  { id: 1, title: 'React Basics', price: 100, educator: 'John Doe' },
  { id: 2, title: 'Advanced React', price: 150, educator: 'Jane Doe' },
  { id: 3, title: 'React and Redux', price: 200, educator: 'Jim Doe' },
  { id: 4, title: 'Vue.js Fundamentals', price: 120, educator: 'Jack Doe' },
]);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/' }),
  useNavigate: jest.fn(),
}));

const mockWishlistContextValue = {
  wishlistItems: [...mockData] as Course[],
  toggleWishlistItem: jest.fn(),
  addToWishlist: jest.fn(),
  removeFromWishlist: jest.fn(),
};

const mockCartContextValue = {
  cartItems: [] as Course[],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  setCartItems: jest.fn(),
};

const CourseListWrapper = () => (
  <Router>
    <WishlistContext.Provider value={mockWishlistContextValue}>
      <CartContext.Provider value={mockCartContextValue}>
        <CourseList />
      </CartContext.Provider>
    </WishlistContext.Provider>
  </Router>
);
describe('CourseList Component', () => {
  it('renders all courses', () => {
    render(
      <Router>
        <WishlistProvider>
          <CartProvider>
            <CourseList />
          </CartProvider>
        </WishlistProvider>
      </Router>,
    );

    const courseTitles = [
      'React Basics',
      'Advanced React',
      'React and Redux',
      'Vue.js Fundamentals',
    ];
    courseTitles.forEach((title) => {
      const courseTitleElement = screen.getByText((content, element) =>
        content.includes(title),
      );
      expect(courseTitleElement).toBeInTheDocument();
    });
  });
  it('renders the sort dropdown', () => {
    render(<CourseListWrapper />);

    const sortDropdown = screen.getByRole('combobox');
    expect(sortDropdown).toBeInTheDocument();
  });
  it('renders pagination buttons', () => {
    render(<CourseListWrapper />);

    const paginationButtons = screen.getAllByRole('button');
    expect(paginationButtons.length).toBeGreaterThan(0);
  });
  it('shows popup message when a course is added to the cart', async () => {
    render(<CourseListWrapper />);

    const addToCartButtons = screen.getAllByTestId('AddCart');
    fireEvent.click(addToCartButtons[0]);
    await waitFor(() => {
      expect(screen.getByTestId('popup-data')).toBeInTheDocument();
    });
    expect(
      screen.getByText(/Course\s+successfully added to the cart/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('popup-close')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('popup-close'));
  });
  it('shows popup message when a course is already in the cart', async () => {
    mockCartContextValue.cartItems = [...mockData];
    render(<CourseListWrapper />);
    const addToCartButtons = screen.getAllByTestId('AddCart');
    fireEvent.click(addToCartButtons[0]);

    await waitFor(() => {
      expect(screen.getByTestId('popup-data')).toBeInTheDocument();
    });
    expect(
      await screen.findByText((content) =>
        content.includes('Course is already in the cart'),
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('popup-close')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('popup-close'));
  });
  it('filters courses based on search term', async () => {
    render(<CourseListWrapper />);
    const searchInput = screen.getByPlaceholderText('Search here');
    fireEvent.change(searchInput, { target: { value: 'React' } });

    await waitFor(() => {
      const reactBasicsTitle = screen
        .getAllByText('React Basics')
        .find((element) => element.tagName.toLowerCase() === 'h5');
      const advancedReactTitle = screen
        .getAllByText('Advanced React')
        .find((element) => element.tagName.toLowerCase() === 'h5');
      const reactAndReduxTitle = screen
        .getAllByText('React and Redux')
        .find((element) => element.tagName.toLowerCase() === 'h5');

      expect(reactBasicsTitle).toBeInTheDocument();
      expect(advancedReactTitle).toBeInTheDocument();
      expect(reactAndReduxTitle).toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: 'Vue' } });

    await waitFor(() => {
      const vueTitle = screen
        .getAllByText('Vue.js Fundamentals')
        .find((element) => element.tagName.toLowerCase() === 'h5');
      expect(vueTitle).toBeInTheDocument();
    });
  });
});
