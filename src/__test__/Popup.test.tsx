import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Popup from '../components/Popup/Popup';
import { Profile_Popup_Message } from '../Utils/Contant';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockOnClose = jest.fn();
describe('Popup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders the popup with the success message', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' });
    render(
      <Router>
        <Popup
          message="Course  successfully added to the cart"
          isVisible={true}
          onClose={mockOnClose}
        />
      </Router>,
    );
    expect(
      screen.getByText('Course successfully added to the cart'),
    ).toBeInTheDocument();
    expect(screen.getByAltText('sucess')).toBeInTheDocument();
  });
  it('renders the popup with the already exist message', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' });
    render(
      <Router>
        <Popup
          message="Course is already in the cart"
          isVisible={true}
          onClose={mockOnClose}
        />
      </Router>,
    );
    expect(screen.getByAltText('sucess')).toBeInTheDocument();
  });
  it('renders the popup with the payment message and navigate button', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/payment' });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(
      <Router>
        <Popup
          message="You have successfully placed your order"
          isVisible={true}
          onClose={mockOnClose}
        />
      </Router>,
    );
    expect(
      screen.getByText('You have successfully placed your order'),
    ).toBeInTheDocument();
    const okButton = screen.getByText('OK');
    expect(okButton).toBeInTheDocument();
    fireEvent.click(okButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  it('calls onClose when the close button is clicked', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' });
    render(
      <Router>
        <Popup
          message="Course successfully added to the cart"
          isVisible={true}
          onClose={mockOnClose}
        />
      </Router>,
    );
    const closeButton = screen.getByText('X');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
  it('does not render the popup when isVisible is false', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/some-path' });
    render(
      <Router>
        <Popup
          message="Course successfully added to the cart"
          isVisible={false}
          onClose={mockOnClose}
        />
      </Router>,
    );
    expect(
      screen.queryByText('Course successfully added to the cart'),
    ).not.toBeInTheDocument();
  });
  it('renders the popup with the profile save message', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/profile' });
    render(
      <Router>
        <Popup
          message={Profile_Popup_Message}
          isVisible={true}
          onClose={mockOnClose}
        />
      </Router>,
    );
    expect(screen.getByText(Profile_Popup_Message)).toBeInTheDocument();
    expect(screen.getByTestId('navigate-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('navigate-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(screen.getByAltText('sucess')).toBeInTheDocument();
  });
});
