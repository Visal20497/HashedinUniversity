//Context Constant
const LOCAL_STORAGE_profilekey = 'profile';
const LOCAL_STORAGE_wishlistItemskey = 'wishlistItems';
const LOCAL_STORAGE_cartItemskey = 'cartItems';

// Popup component constant
const Success_Message = `Course  successfully added to the cart`;
const Already_Exsist_Message = `Course is already in the cart`;
const Cart_Empty_Message =
  'Your cart is empty right now. Please add courses to the cart from the list';
const Cart_Length_Details = (length: number) => `${length} Courses in Cart`;
const CART_MESSAGE = (flag: boolean) => {
  if (flag === true) {
    return Success_Message;
  } else {
    return Already_Exsist_Message;
  }
};

//CourseDetails component constant
const Wishlist_Success_Message = `Course successfully added to the wishlist`;
const Wishlist_AlreadyExsist_Message = `Course  is already in the Wishlist`;
const WISHLIST_MESSAGE = (flag: boolean) => {
  if (flag === true) {
    return Wishlist_Success_Message;
  } else {
    return Wishlist_AlreadyExsist_Message;
  }
};
const Show_course_Title =
  'Responsive Design Course XYZ How to design responsive templates';
const Show_course_Details =
  'Responsive Design Course XYZ How to design responsive templates';

//SideBarCart component constant
const SideBarCart_PlaceHolder =
  'Your cart is empty right now. Please add courses to the cart from the list';
const YOUR_CART_DETAILS = 'YOUR CART DETAILS';
const Total_Cart_Value = 'Total Cart Value';

// CourseList component constant
const low_to_high = 'low_to_high';
const high_to_low = 'high_to_low';
const All_Courses = 'All Courses';
const My_Wishlist = 'My Wishlist';

// navigation constant
const payment = '/payment';
const cart = '/cart';
const course_details = '/course-details';
const wishlist = '/wishlist';
const profile = '/profile';

//profile constatnt
const error = {
  displayName:
    'Must be 3-15 characters long and can only contain letters, numbers, and underscores.',
  firstName: 'Must be 2-30 characters long and can only contain letters.',
  lastName: 'Must be 2-30 characters long and can only contain letters.',
  about: 'About Yourself must be less than 200 characters long.',
  manageRole:
    'Must be 2-30 characters long and can only contain letters, numbers, and spaces.',
  experience: 'Experience is required for professionals.',
  expertise: 'Expertise is required for professionals.',
};
const Required = 'Required';
const Required_ = 'Required*';
const Profile_Popup_Message = 'Your profile is saved!';
const Profile_Filed_Required = 'All Fields are required';

export {
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
  LOCAL_STORAGE_wishlistItemskey,
  LOCAL_STORAGE_cartItemskey,
};
