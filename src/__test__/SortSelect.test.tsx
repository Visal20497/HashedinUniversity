import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortSelect from '../components/SortSelect/SortSelect';
describe('SortSelect Component', () => {
  const onSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders the SortSelect component', () => {
    render(<SortSelect sortOption="" onSortChange={onSortChange} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });
  it('displays the correct options', () => {
    render(<SortSelect sortOption="" onSortChange={onSortChange} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Course Price');
    expect(options[1]).toHaveTextContent('Low to High');
    expect(options[2]).toHaveTextContent('High to Low');
  });
  it('reflects the selected sort option', () => {
    render(<SortSelect sortOption="high_to_low" onSortChange={onSortChange} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('high_to_low');
  });
});
