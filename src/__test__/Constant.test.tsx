import {
  CART_MESSAGE,
  Success_Message,
  Already_Exsist_Message,
  payment,
  Cart_Empty_Message,
  Cart_Length_Details,
  cart,
  SideBarCart_PlaceHolder,
  YOUR_CART_DETAILS,
  Total_Cart_Value,
  course_details,
  wishlist,
  low_to_high,
  high_to_low,
  All_Courses,
  My_Wishlist,
  error,
  Required,
  Required_,
  Profile_Popup_Message,
  Profile_Filed_Required,
  profile,
  WISHLIST_MESSAGE,
  Wishlist_Success_Message,
  Wishlist_AlreadyExsist_Message,
  Show_course_Title,
  Show_course_Details,
  LOCAL_STORAGE_profilekey,
  LOCAL_STORAGE_cartItemskey,
  LOCAL_STORAGE_wishlistItemskey,
} from '../Utils/Contant';
describe('Constants', () => {
  it('should have the correct values for context constants', () => {
    expect(LOCAL_STORAGE_profilekey).toBe('profile');
    expect(LOCAL_STORAGE_wishlistItemskey).toBe('wishlistItems');
    expect(LOCAL_STORAGE_cartItemskey).toBe('cartItems');
  });
  it('should have the correct values for popup component constants', () => {
    expect(Success_Message).toBe('Course  successfully added to the cart');
    expect(Already_Exsist_Message).toBe('Course is already in the cart');
    expect(Cart_Empty_Message).toBe(
      'Your cart is empty right now. Please add courses to the cart from the list',
    );
  });
  it('should return the correct cart length details', () => {
    expect(Cart_Length_Details(5)).toBe('5 Courses in Cart');
  });
  it('should return the correct cart message based on flag', () => {
    expect(CART_MESSAGE(true)).toBe(Success_Message);
    expect(CART_MESSAGE(false)).toBe(Already_Exsist_Message);
  });
  it('should have the correct values for course details component constants', () => {
    expect(Wishlist_Success_Message).toBe(
      'Course successfully added to the wishlist',
    );
    expect(Wishlist_AlreadyExsist_Message).toBe(
      'Course  is already in the Wishlist',
    );
  });
  it('should return the correct wishlist message based on flag', () => {
    expect(WISHLIST_MESSAGE(true)).toBe(Wishlist_Success_Message);
    expect(WISHLIST_MESSAGE(false)).toBe(Wishlist_AlreadyExsist_Message);
  });
  it('should have the correct values for course title and details', () => {
    expect(Show_course_Title).toBe(
      'Responsive Design Course XYZ How to design responsive templates',
    );
    expect(Show_course_Details).toBe(
      'Responsive Design Course XYZ How to design responsive templates',
    );
  });
  it('should have the correct values for sidebar cart component constants', () => {
    expect(SideBarCart_PlaceHolder).toBe(
      'Your cart is empty right now. Please add courses to the cart from the list',
    );
    expect(YOUR_CART_DETAILS).toBe('YOUR CART DETAILS');
    expect(Total_Cart_Value).toBe('Total Cart Value');
  });
  it('should have the correct values for course list component constants', () => {
    expect(low_to_high).toBe('low_to_high');
    expect(high_to_low).toBe('high_to_low');
    expect(All_Courses).toBe('All Courses');
    expect(My_Wishlist).toBe('My Wishlist');
  });
  it('should have the correct values for navigation constants', () => {
    expect(payment).toBe('/payment');
    expect(cart).toBe('/cart');
    expect(course_details).toBe('/course-details');
    expect(wishlist).toBe('/wishlist');
    expect(profile).toBe('/profile');
  });
  it('should have the correct values for profile constants', () => {
    expect(error.displayName).toBe(
      'Must be 3-15 characters long and can only contain letters, numbers, and underscores.',
    );
    expect(error.firstName).toBe(
      'Must be 2-30 characters long and can only contain letters.',
    );
    expect(error.lastName).toBe(
      'Must be 2-30 characters long and can only contain letters.',
    );
    expect(error.about).toBe(
      'About Yourself must be less than 200 characters long.',
    );
    expect(error.manageRole).toBe(
      'Must be 2-30 characters long and can only contain letters, numbers, and spaces.',
    );
    expect(error.experience).toBe('Experience is required for professionals.');
    expect(error.expertise).toBe('Expertise is required for professionals.');
    expect(Required).toBe('Required');
    expect(Required_).toBe('Required*');
    expect(Profile_Popup_Message).toBe('Your profile is saved!');
    expect(Profile_Filed_Required).toBe('All Fields are required');
  });
});
