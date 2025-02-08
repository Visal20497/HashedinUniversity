import React, { JSX } from 'react';
import { PaginationArrow, PaginationArrow2 } from '../../assests/index.js';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPaginationButtons = () => {
    const buttons: JSX.Element[] = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 1);

    if (currentPage > 1) {
      buttons.push(
        <button key="prev" onClick={() => onPageChange(currentPage - 1)}>
          <img src={PaginationArrow2} alt="previous" />
        </button>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>,
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => onPageChange(currentPage + 1)}>
          <img src={PaginationArrow} alt="next" />
        </button>,
      );
    }

    return buttons;
  };

  return <div className="pagination">{renderPaginationButtons()}</div>;
};

export default Pagination;
