import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard/CourseCard.tsx';
import './CourseList.css';
import mockData from '../../Utils/MockData.ts';
import Popup from '../Popup/Popup.tsx';
import CartSideBar from '../CartSideBar/SideBarCart.tsx';
import { useCartContext } from '../../context/CartContext.tsx';
import { useLocation } from 'react-router-dom';
import { useWishlistContext } from '../../context/WishlistContext.tsx';
import InputBox from '../InputBox/InputBox.tsx';
import Course from '../../Utils/interface.ts';
import Pagination from '../Pagination/Pagination.tsx';
import SortSelect from '../SortSelect/SortSelect.tsx';
import {
  All_Courses,
  CART_MESSAGE,
  high_to_low,
  low_to_high,
  My_Wishlist,
  wishlist,
} from '../../Utils/Contant.ts';

const CourseList: React.FC = () => {
  const [mockCourses, setMockCourse] = useState<Course[]>(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { wishlistItems } = useWishlistContext();
  const { cartItems, addToCart } = useCartContext();

  useEffect(() => {
    if (location.pathname === wishlist) {
      setMockCourse(wishlistItems);
    } else {
      setMockCourse(mockData);
    }
    setCurrentPage(1);
  }, [location.pathname, wishlistItems]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    const filteredCourses = (
      location.pathname === wishlist ? wishlistItems : mockData
    )?.filter((course) =>
      course?.title.toLowerCase().includes(query.toLowerCase()),
    );
    setMockCourse(filteredCourses);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  const getEffectivePrice = (course: Course) => {
    return course?.discountedPrice && course?.discountedPrice < course?.price
      ? course?.discountedPrice
      : course?.price;
  };

  const sortedCourses = [...mockCourses]?.sort((a, b) => {
    const priceA = getEffectivePrice(a);
    const priceB = getEffectivePrice(b);

    if (sortOption === low_to_high) {
      return priceA - priceB;
    } else if (sortOption === high_to_low) {
      return priceB - priceA;
    }
    return 0;
  });

  const coursesPerPage = 6;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse,
  );

  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  const handleAddToCart = (course: Course) => {
    const isAlreadyInCart = cartItems.some((item) => item?.id === course?.id);
    if (isAlreadyInCart) {
      setPopupMessage(CART_MESSAGE(false));
    } else {
      addToCart(course);
      setPopupMessage(CART_MESSAGE(true));
    }
    setShowPopup(true);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="course-list-container">
      <div className="course-list-wrapper">
        <div className={`course-list ${showPopup ? 'blurred' : ''}`}>
          <div className="course-top-box">
            <h3 className="course-heading">
              {location.pathname !== wishlist ? All_Courses : My_Wishlist}
            </h3>
            <SortSelect
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </div>
          {location.pathname === wishlist && wishlistItems.length === 0 && (
            <p className="wishlist-item" data-testid="course-Details">
              No course in the wishlist.
            </p>
          )}
          {searchTerm && mockCourses.length === 0 && (
            <p className="wishlist-item" data-testid="course-Details">
              No course found.
            </p>
          )}
          {location.pathname !== wishlist && mockCourses.length === 0 && (
            <p className="wishlist-item">No course found.</p>
          )}
          {currentCourses.length > 0 &&
            currentCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                addToCart={handleAddToCart}
              />
            ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <Popup
          message={popupMessage}
          isVisible={showPopup}
          onClose={handleClosePopup}
        />
      </div>
      <div className="sidebar-container">
        <InputBox onSearch={handleSearch} />
        <CartSideBar />
      </div>
    </div>
  );
};

export default CourseList;
