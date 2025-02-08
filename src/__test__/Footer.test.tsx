import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
describe('Footer Component', () => {
  const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(
      <Router>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </Router>,
    );
  };
  it('renders footer correctly on non-payment page', () => {
    renderWithRouter(<Footer />, { route: '/' });
    expect(
      screen.getByText(/@ Hashedln By Deloitte. \d{4}/),
    ).toBeInTheDocument();
  });
  it('does not render footer on payment page', () => {
    renderWithRouter(<Footer />, { route: '/payment' });
    expect(
      screen.queryByText(/@ Hashedln By Deloitte. \d{4}/),
    ).not.toBeInTheDocument();
  });
});
