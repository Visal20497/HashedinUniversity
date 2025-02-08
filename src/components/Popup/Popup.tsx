import React from 'react';
import './Popup.css';
import { alreadyExist, PopupCircle } from '../../assests';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PopupProps } from '../../Utils/interface';
import {
  Already_Exsist_Message,
  course_details,
  payment,
  profile,
  Success_Message,
  Wishlist_AlreadyExsist_Message,
  Wishlist_Success_Message,
} from '../../Utils/Contant';

const Popup: React.FC<PopupProps> = ({ message, isVisible, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  function navigateToHome() {
    navigate('/');
  }
  return isVisible ? (
    <div className="popup-overlay">
      <div className="popup">
        {location.pathname !== payment &&
          location.pathname !== profile &&
          location.pathname !== `${course_details}/${id}` && (
            <>
              <div className="popup-header">
                <button
                  className="close-button"
                  onClick={onClose}
                  data-testid="popup-close"
                >
                  X
                </button>
              </div>
              <div className="popup-message" data-testid="popup-data">
                <img
                  src={message === Success_Message ? PopupCircle : alreadyExist}
                  alt="sucess"
                />
                {message === Success_Message ? message : Already_Exsist_Message}
              </div>
            </>
          )}
        {location.pathname === payment && (
          <>
            <div className="popup-header">
              <button className="close-button" onClick={onClose}>
                X
              </button>
            </div>
            <div className="popup-message">
              <img src={PopupCircle} alt="sucess" />
              {message}
            </div>
            <button
              className="navigate-button"
              onClick={() => {
                navigateToHome();
              }}
            >
              OK
            </button>
          </>
        )}
        {location.pathname === profile && (
          <>
            <div className="popup-header">
              <button className="close-button" onClick={onClose}>
                X
              </button>
            </div>
            <div className="popup-message">
              <img src={PopupCircle} alt="sucess" />
              {message}
            </div>
            <button
              className="navigate-button"
              data-testid="navigate-button"
              onClick={() => {
                navigateToHome();
              }}
            >
              OK
            </button>
          </>
        )}
        {location.pathname === `${course_details}/${id}` &&
          (message === Wishlist_Success_Message ||
            message === Wishlist_AlreadyExsist_Message) && (
            <>
              <div className="popup-header">
                <button
                  className="close-button"
                  onClick={onClose}
                  data-testid="popup-close"
                >
                  X
                </button>
              </div>
              <div className="popup-message" data-testid="popup-data">
                <img
                  src={
                    message === Wishlist_Success_Message
                      ? PopupCircle
                      : alreadyExist
                  }
                  alt="sucess"
                />
                {message}
              </div>
            </>
          )}
        {location.pathname === `${course_details}/${id}` &&
          (message === Success_Message ||
            message === Already_Exsist_Message) && (
            <>
              <div className="popup-header">
                <button
                  className="close-button"
                  onClick={onClose}
                  data-testid="popup-close"
                >
                  X
                </button>
              </div>
              <div className="popup-message">
                <img
                  src={message === Success_Message ? PopupCircle : alreadyExist}
                  alt="sucess"
                />
                {message}
              </div>
            </>
          )}
      </div>
    </div>
  ) : null;
};

export default Popup;
