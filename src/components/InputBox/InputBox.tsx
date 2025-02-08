import React, { useState, useEffect } from 'react';
import './InputBox.css';
import { SearchIcon } from '../../assests';
import { useLocation } from 'react-router-dom';
import { InputBoxProps } from '../../Utils/interface';
import { wishlist } from '../../Utils/Contant';

const InputBox: React.FC<InputBoxProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const location = useLocation();
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchValue);
    }, 400);
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, onSearch]);

  return (
    <div
      className="custom-input-box"
      style={{
        visibility: location.pathname === `/${wishlist}` ? 'hidden' : 'visible',
      }}
    >
      <input
        type="text"
        className="custom-input-box-input"
        placeholder="Search here"
        data-testid="inputValue"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="custom-input-button">
        <img src={SearchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default InputBox;
