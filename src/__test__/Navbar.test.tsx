import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

jest.mock('../context/CartContext', () => ({
  useCartContext: () => ({
    cartItems: [],
  }),
}));

jest.mock('../context/ProfileContext', () => ({
  useProfile: () => ({
    profileSave: { profilePicture: '' },
  }),
}));
describe('Navbar Component', () => {
  it('renders Hashedln logo', () => {
    render(
      <Router>
        <Navbar />
      </Router>,
    );
    const logo = screen.getByAltText('Hashedln-logo');
    expect(logo).toBeInTheDocument();
  });
  it('renders Courses link', () => {
    render(
      <Router>
        <Navbar />
      </Router>,
    );
    const coursesLink = screen.getByText('Courses');
    expect(coursesLink).toBeInTheDocument();
  });
  it('renders My Wishlist link', () => {
    render(
      <Router>
        <Navbar />
      </Router>,
    );
    const wishlistLink = screen.getByText('My Wishlist');
    expect(wishlistLink).toBeInTheDocument();
  });
  it('renders Cart icon', () => {
    render(
      <Router>
        <Navbar />
      </Router>,
    );
    const cartIcon = screen.getByAltText('shopingCart');
    expect(cartIcon).toBeInTheDocument();
  });
  it('renders Profile icon', () => {
    render(
      <Router>
        <Navbar />
      </Router>,
    );
    const profileIcon = screen.getByAltText('ProfileLogo');
    expect(profileIcon).toBeInTheDocument();
  });
});
