import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CourseCard.css';
import {
  ArrowLogo,
  DeleteIcon,
  WishListLogo,
  WishListLogoActive,
} from '../../assests';
import { useWishlistContext } from '../../context/WishlistContext';
import { CourseCardProps } from '../../Utils/interface';
import { cart, course_details, wishlist } from '../../Utils/Contant';

const CourseCard: React.FC<CourseCardProps> = ({ course, addToCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlistItems, toggleWishlistItem } = useWishlistContext();

  const navigateToCourseDetails = (id: number) => {
    navigate(`${course_details}/${id}`);
  };

  const isCourseInWishlist = wishlistItems.some(
    (item) => item.id === course.id,
  );
  const [showAddToWishlist, setShowAddToWishlist] = useState(true);

  useEffect(() => {
    if (location.pathname === wishlist || location.pathname === cart) {
      setShowAddToWishlist(false);
    } else {
      setShowAddToWishlist(true);
    }
  }, [location.pathname, wishlistItems, toggleWishlistItem]);

  return (
    <>
      <div
        className={`course-card  ${location.pathname === cart ? 'cartWidth' : ''}`}
      >
        <div className="course-info">
          <div className="logo-div"></div>
          <div className="course-title">
            <div className="course-title-information">
              <h5>{course.title}</h5>
              <div className="course-title-button">
                <button>React</button>
                <button>React</button>
              </div>
            </div>
          </div>
          <p className="educator">{course.educator}</p>
          <button
            className={`add-to-wishlist ${showAddToWishlist ? '' : 'Visible'}`}
            onClick={() => {
              toggleWishlistItem(course);
            }}
          >
            {isCourseInWishlist ? (
              <img src={WishListLogoActive} alt="added to wishlist" />
            ) : (
              <img src={WishListLogo} alt="add to wishlist" />
            )}
          </button>
          <div>
            {course.discountedPrice ? (
              <p className="price">
                <strong>Rs{course.discountedPrice}/-</strong>
                <s>Rs{course.price}/-</s>
              </p>
            ) : (
              <p className="price">
                Rs {course.price}/-<s>{'-'}</s>
              </p>
            )}
          </div>
        </div>
        <div className="actions add-to-cart">
          <button onClick={() => addToCart(course)} data-testid="AddCart">
            ADD TO CART
          </button>
        </div>
        {location.pathname !== cart && !showAddToWishlist && (
          <button
            className="removeWishlist"
            onClick={() => toggleWishlistItem(course)}
            data-testid="toggleWishlist"
          >
            <img src={DeleteIcon} alt="remove-wishlist" />
          </button>
        )}
        <button
          className="navigate-arrow"
          onClick={() => navigateToCourseDetails(course.id)}
        >
          <img src={ArrowLogo} alt="navigate" />
        </button>
      </div>
    </>
  );
};

export default CourseCard;
