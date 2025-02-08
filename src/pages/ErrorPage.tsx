import React from 'react';
import './ErrorPage.css';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="error-page-container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default ErrorPage;
