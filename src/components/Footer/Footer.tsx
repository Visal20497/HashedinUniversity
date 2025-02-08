import React from 'react';
import './Footer.css';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const Year: any = new Date();
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/payment' && (
        <div className="footer">
          <p>@ Hashedln By Deloitte. {Year.getFullYear()}</p>
        </div>
      )}
    </>
  );
};

export default Footer;
