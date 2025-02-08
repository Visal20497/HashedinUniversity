import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ErrorBoundary from './components/ErrorBoundry/ErrorBoundry';
import Dashboard from './components/Dashboard/Dashboard';
import HomePages from './pages/HomePages';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPags';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer/Footer';
import CourseDetailPage from './pages/CourseDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import { WishlistProvider } from './context/WishlistContext';
import { ProfileProvider } from './context/ProfileContext';
import Payment from './pages/Payment';

const DynamicTitle: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const routeTitles: { [key: string]: string } = {
      '/': '-discover Latest Courses on React - HashedIn University',
      '/wishlist': '-my Wishlist - HashedIn University',
      '/cart': '-shopping Cart - HashedIn University',
      '/profile': '-My Profile - HashedIn University',
      '/course-details/:id': '-Course Detail - HashedIn University',
      '/checkout': '-checkout - HashedIn University',
      '*': 'error - HashedIn University',
    };
    const path = location.pathname;
    const dynamicTitle = routeTitles[path] || '-HashedIn University';
    document.title = dynamicTitle;
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <ProfileProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="app-container">
                <DynamicTitle />
                <Navbar />
                <div className="content">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <Dashboard text="Discover Latest Courses on React" />
                          <HomePages />
                        </>
                      }
                    />
                    <Route
                      path="/wishlist"
                      element={
                        <>
                          <Dashboard text="Discover Latest Courses on React" />
                          <WishlistPage />
                        </>
                      }
                    />
                    <Route
                      path="/cart"
                      element={
                        <>
                          <Dashboard text="Shopping Cart" />
                          <CartPage />
                        </>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <>
                          <Dashboard text="My Profile" />
                          <ProfilePage />
                        </>
                      }
                    />
                    <Route
                      path="/course-details/:id"
                      element={
                        <>
                          <Dashboard text="Course Detail" />
                          <CourseDetailPage />
                        </>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <>
                          <Dashboard text="Checkout" />
                          <CheckoutPage />
                        </>
                      }
                    />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </div>
              </div>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </ProfileProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
