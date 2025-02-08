export default interface Course {
  id: number;
  title: string;
  price: number;
  discountedPrice?: number;
  educator: string;
  courseDetails?: string;
  timeLeft?: string;
  recommendedCourse?: string;
  videoUrl?: string;
}
export interface Profile {
  displayName: string;
  firstName: string;
  lastName: string;
  about: string;
  areaOfInterest: string;
  role: string;
  experience: string;
  expertise: string;
  profilePicture: string;
  manageRole: string;
}

export interface CourseCardProps {
  course: Course;
  addToCart: (course: Course) => void;
  addToWishlist?: (course: Course) => void;
  removeFromCart?: (course: Course) => void;
}
export interface DashboardProps {
  text: string;
}
export interface InputBoxProps {
  onSearch: (query: string) => void;
}
export interface PopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}
// export interface CourseCardProps {
//   course: Course;
//   addToCart: (course: Course) => void;
//   removeFromCart?: (course: Course) => void;
// }
