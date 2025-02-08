import React, { useEffect, useRef, useState } from 'react';
import './Payment.css';
import { useCartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup/Popup';

const Payment: React.FC = () => {
  const { cartItems, setCartItems } = useCartContext();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  function navigateToBackPage() {
    navigate('/cart');
  }

  const paypal = useRef<HTMLDivElement>(null);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const setTestState = (showPopup: boolean, popupMessage: string) => {
    setShowPopup(showPopup);
    setPopupMessage(popupMessage);
  };
  useEffect(() => {
    const amount = cartItems
      ?.reduce((total, item) => total + item.price, 0)
      .toFixed(2);
    console.log(amount);
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 55,
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Looking for new course',
                amount: {
                  value: amount,
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          actions.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              setCartItems([]);
              localStorage.setItem('cartItems', JSON.stringify(cartItems));
              console.log('Successfull order', details);
              setShowPopup(true);
              setPopupMessage(`You have successfully placed your order`);
            }
          });
        },
        onError: (error: any) => {
          console.log(error);
          setPopupMessage('Your transaction has failed');
          navigate('/cart');
        },
      })
      .render(paypal.current);
  }, [cartItems]);
  return (
    <div className="container-payment">
      <div ref={paypal}></div>
      <Popup
        message={popupMessage}
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
      <button
        onClick={() => {
          navigateToBackPage();
        }}
        className="Back-button"
      >
        RETURN BACK
      </button>
    </div>
  );
};

export default Payment;
