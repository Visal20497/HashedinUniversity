import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';
import { ArrowLogo, Clock, wishlist } from '../../assests';
import mockData from '../../Utils/MockData';
import { useCartContext } from '../../context/CartContext';
import Popup from '../Popup/Popup';
import { useWishlistContext } from '../../context/WishlistContext';
import Course from '../../Utils/interface';
import {
  CART_MESSAGE,
  Show_course_Details,
  Show_course_Title,
  WISHLIST_MESSAGE,
} from '../../Utils/Contant';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showData, setShowData] = useState<any>(null);
  const CourseId = Number(id);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const { addToCart, cartItems } = useCartContext();
  const { addToWishlist, wishlistItems } = useWishlistContext();
  const handleAddToWishlist = (course: Course) => {
    const isAlreadyInWishlist = wishlistItems?.some(
      (item) => item.id === course.id,
    );
    if (isAlreadyInWishlist) {
      setPopupMessage(WISHLIST_MESSAGE(false));
    } else {
      addToWishlist(course);
      setPopupMessage(WISHLIST_MESSAGE(true));
    }
    setShowPopup(true);
  };

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

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const findData = mockData.find((item) => item.id === CourseId);
    setShowData(findData);
  }, [CourseId, wishlistItems]);

  useEffect(() => {
    if (showData && showData?.timeLeft) {
      const calculateTimeLeft = () => {
        const endTime = new Date();
        endTime.setHours(24, 0, 0, 0);
        const now = new Date();
        const timeDifference = endTime.getTime() - now.getTime();

        if (timeDifference > 0) {
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
          const seconds = Math.floor((timeDifference / 1000) % 60);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(null);
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }
  }, [showData]);

  return (
    <div>
      {showData && (
        <div>
          <div className="course-name">
            <p className="all-course">All Course</p>
            <img src={ArrowLogo} alt="ArrowLogo" />
            <p>{showData?.title}</p>
          </div>

          <div className="course-details">
            <p className="course-details-name">
              {showData?.title || Show_course_Title}
            </p>
            <p className="course-details-name-2">
              {showData?.title || Show_course_Title}
            </p>
            <p className="course-details-educator">
              {showData?.educator || 'Joseph Marie'}
            </p>
            <div className="course-details-button">
              <button>React</button>
              <button>React</button>
              <button>React</button>
            </div>
          </div>

          <div className="course-additional-information">
            <div className="course-additional-details">
              <p className="heading">Course Details</p>
              <p>
                {showData?.courseDetails.slice(0, 25) || Show_course_Details}
              </p>
              <p>
                {showData?.courseDetails.slice(0, 25) || Show_course_Details}
              </p>
              <p>
                {showData?.courseDetails.slice(0, 25) || Show_course_Details}
              </p>
              <p>
                {showData?.courseDetails.slice(0, 25) || Show_course_Details}
              </p>
              <p>
                {showData?.courseDetails.slice(0, 25) || Show_course_Details}
              </p>
            </div>

            <div className="add-to-cart-box">
              <p className="price">
                Rs
                {timeLeft
                  ? showData?.discountedPrice
                    ? showData?.discountedPrice
                    : showData?.price
                  : showData?.price}
                /-
              </p>
              {showData?.discountedPrice && timeLeft && (
                <s className="strike-price">Rs {showData?.price}/-</s>
              )}
              {timeLeft && (
                <p className="time-left">
                  <img src={Clock} alt="clock" />
                  <span style={{ color: '#D13030' }}>{timeLeft}</span> left for
                  this price
                </p>
              )}
              <div className="add-to-cart-button">
                <button
                  className="add-to-cart-button-1"
                  data-testid="addCartbutton"
                  onClick={() => handleAddToCart(showData)}
                ></button>
                <button
                  className="add-to-wishlist-button-2"
                  data-testid="addToWishlistButton"
                  onClick={() => handleAddToWishlist(showData)}
                >
                  ADD TO WISHLIST
                  <img src={wishlist} alt="wishlist" />
                </button>
              </div>
            </div>
          </div>

          <div className="video-frame">
            <iframe
              width="100%"
              height="90%"
              src={`${showData?.videoUrl}?autoplay=1&mute=1`}
              allow="autoplay"
              frameBorder="0"
              title="Course Video"
            ></iframe>
          </div>
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

export default CourseDetails;
