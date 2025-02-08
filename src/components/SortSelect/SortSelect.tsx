import React from 'react';

interface SortSelectProps {
  sortOption: string;
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({
  sortOption,
  onSortChange,
}) => {
  return (
    <select
      name="CoursePrice"
      className="course-select-box"
      value={sortOption}
      onChange={onSortChange}
    >
      <option value="">Course Price</option>
      <option value="low_to_high">Low to High</option>
      <option value="high_to_low">High to Low</option>
    </select>
  );
};

export default SortSelect;
