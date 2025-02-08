import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import useWishlistItem from '../Hooks/useWishlistItem';
import Course from '../Utils/interface';
import { LOCAL_STORAGE_wishlistItemskey } from '../Utils/Contant';

const mockCourse: Course = {
  id: 1,
  title: 'React Basics',
  price: 100,
  discountedPrice: 80,
  educator: 'John Doe',
  courseDetails:
    'Learn the basics of React, including components, state, and props. This course will help you build a strong foundation in React.',
  timeLeft: '10 days',
  recommendedCourse: 'Advanced React',
  videoUrl: 'https://www.youtube.com/embed/Y6aYx_KKM7A?si=fqrzCNib0G3YFow8',
};
describe('useWishlistItem Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should initialize with items from local storage', () => {
    localStorage.setItem(
      LOCAL_STORAGE_wishlistItemskey,
      JSON.stringify([mockCourse]),
    );

    const { result } = renderHook(() => useWishlistItem());

    expect(result.current.wishlistItems).toEqual([mockCourse]);
  });
  it('should add a course to the wishlist', () => {
    const { result } = renderHook(() => useWishlistItem());

    act(() => {
      result.current.addToWishlist(mockCourse);
    });

    expect(result.current.wishlistItems).toEqual([mockCourse]);
    expect(localStorage.getItem(LOCAL_STORAGE_wishlistItemskey)).toEqual(
      JSON.stringify([mockCourse]),
    );
  });
  it('should remove a course from the wishlist', () => {
    const { result } = renderHook(() => useWishlistItem());

    act(() => {
      result.current.addToWishlist(mockCourse);
    });

    expect(result.current.wishlistItems).toEqual([mockCourse]);

    act(() => {
      result.current.removeFromWishlist(mockCourse.id);
    });

    expect(result.current.wishlistItems).toEqual([]);
    expect(localStorage.getItem(LOCAL_STORAGE_wishlistItemskey)).toEqual(
      JSON.stringify([]),
    );
  });
  it('should toggle a course in the wishlist', () => {
    const { result } = renderHook(() => useWishlistItem());

    act(() => {
      result.current.toggleWishlistItem(mockCourse);
    });

    expect(result.current.wishlistItems).toEqual([mockCourse]);

    act(() => {
      result.current.toggleWishlistItem(mockCourse);
    });
    expect(result.current.wishlistItems).toEqual([]);
  });
});
