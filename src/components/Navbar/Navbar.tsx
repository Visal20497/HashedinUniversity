import React from 'react';
import { HashedlnLogo, ProfileLogo, shopingCart } from '../../assests';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useCartContext } from '../../context/CartContext';
import { useProfile } from '../../context/ProfileContext';
import { payment } from '../../Utils/Contant';
const Navbar: React.FC = () => {
  const location = useLocation();
  const { cartItems } = useCartContext();
  const { profileSave } = useProfile();
  return (
    <>
      {location.pathname !== `/${payment}` && (
        <nav className="navbar">
          <div className="navbar-logo">
            <NavLink to="/">
              <img src={HashedlnLogo} alt="Hashedln-logo" />
            </NavLink>
          </div>
          <ul className="navbar-links">
            <li>
              <NavLink to="/">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/wishlist">My Wishlist</NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="cart-link">
                <img src={shopingCart} alt="shopingCart" />
                {cartItems.length > 0 && <sup>{cartItems?.length}</sup>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                {profileSave.profilePicture ? (
                  <div className="ProfilePicture">
                    <img
                      src={profileSave.profilePicture}
                      alt="ProfilePicture"
                    />
                  </div>
                ) : (
                  <img src={ProfileLogo} alt="ProfileLogo" />
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
