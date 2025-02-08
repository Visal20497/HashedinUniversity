import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination/Pagination';
describe('Pagination Component', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders pagination buttons correctly', () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
    expect(screen.getByAltText('next')).toBeInTheDocument();
  });
  it('handles click events for page number buttons', () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
  it('handles click events for the previous button', () => {
    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByAltText('previous'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
  it('handles click events for the next button', () => {
    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />,
    );
    fireEvent.click(screen.getByAltText('next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
  it('renders only the necessary buttons based on the current page and total pages (first page)', () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />,
    );
    expect(screen.queryByAltText('previous')).not.toBeInTheDocument();
    expect(screen.getByAltText('next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });
  it('renders only the necessary buttons based on the current page and total pages (last page)', () => {
    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={onPageChange} />,
    );
    expect(screen.getByAltText('previous')).toBeInTheDocument();
    expect(screen.queryByAltText('next')).not.toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
  it('renders only the necessary buttons based on the current page and total pages (middle page)', () => {
    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />,
    );
    expect(screen.getByAltText('previous')).toBeInTheDocument();
    expect(screen.getByAltText('next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
