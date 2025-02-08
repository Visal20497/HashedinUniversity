import React, { useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '../../assests';
import { useWishlistContext } from '../../context/WishlistContext';
import { useCartContext } from '../../context/CartContext';
import CourseCard from '../CourseCard/CourseCard';
import mockData from '../../Utils/MockData';
import Course from '../../Utils/interface';
import Popup from '../Popup/Popup';
import {
  Cart_Empty_Message,
  Cart_Length_Details,
  CART_MESSAGE,
  payment,
} from '../../Utils/Contant';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlistItem } = useWishlistContext();
  const { cartItems, addToCart, removeFromCart } = useCartContext();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleAddToCart = (course: Course) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === course.id);
    if (isAlreadyInCart) {
      setPopupMessage(CART_MESSAGE(false));
    } else {
      addToCart(course);
      setPopupMessage(CART_MESSAGE(true));
    }
    setShowPopup(true);
  };

  const handleMoveToWishlist = (course: Course) => {
    const isAlreadyInWishlist = wishlistItems.some(
      (item) => item.id === course.id,
    );
    if (!isAlreadyInWishlist) {
      toggleWishlistItem(course);
    }
    removeFromCart(course.id);
  };

  const navigatetoCheckout = () => {
    navigate(payment);
  };

  const totalPrice = cartItems?.reduce(
    (total, item) => total + (item?.discountedPrice || item?.price),
    0,
  );
  const savePrice = cartItems?.reduce(
    (total, item) =>
      total + (item?.price - (item?.discountedPrice || item?.price)),
    0,
  );
  const getRecommendedCourses = (course: Course) => {
    return mockData.filter((item) => item.title === course.recommendedCourse);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      className={`cart-container ${cartItems.length === 0 ? 'cart-weight' : ''}`}
    >
      <div className="cart">
        <p
          className={`cart-details  ${cartItems.length === 0 ? 'cart-height' : ''}`}
        >
          {cartItems.length === 0
            ? Cart_Empty_Message
            : Cart_Length_Details(cartItems.length)}
        </p>
        {cartItems?.map((course: Course) => (
          <div className="course-card" key={course.id}>
            <div className="course-title-logo-div">
              <div className="logo-div"></div>
              <div className="course-title">
                <h2>{course.title}</h2>
                <p className="Educator">{course.educator}</p>
              </div>
            </div>
            <div>
              <div className="course-info-box">
                <button
                  className="add-to-wishlist"
                  onClick={() => handleMoveToWishlist(course)}
                >
                  Move to Wishlist
                </button>
                <div>
                  {course.discountedPrice ? (
                    <div className="price">
                      <strong>Rs {course.discountedPrice}/-</strong>
                    </div>
                  ) : (
                    <div className="price">Rs {course.price}/-</div>
                  )}
                </div>
                <button
                  className="removeFromCart"
                  onClick={() => removeFromCart(course.id)}
                >
                  <img src={DeleteIcon} alt="removeFromCart" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className="recommended-course">
            <p>Recommended Courses</p>
            {cartItems
              ?.slice(0, 2)
              ?.map((course: Course) => (
                <div key={course.id}>
                  {getRecommendedCourses(course)?.map((recommendedCourse) => (
                    <CourseCard
                      key={recommendedCourse.id}
                      course={recommendedCourse}
                      addToCart={handleAddToCart}
                      addToWishlist={handleMoveToWishlist}
                    />
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="total-box">
          <p className="total-amount">Total Amount</p>
          <h3 className="total-price">Rs {totalPrice}/-</h3>
          <p className="total-saved">You have saved Rs {savePrice}/-</p>
          <button
            className="total-checkout-button"
            onClick={navigatetoCheckout}
            data-testid="checkout-button"
          >
            CHECKOUT
          </button>
        </div>
      )}
      <Popup
        message={popupMessage}
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default Cart;
