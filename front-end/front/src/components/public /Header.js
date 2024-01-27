import React from 'react';
import logo from './logo.png';
import './employer.css';

const Header = () => {
  return (
    <header>
      <div className="HeaderContent">
        <img src={logo} alt="Logo" className="Logo" />
        <h1 className="JobTitle">J<span>O</span>BiT</h1>
      </div>
  
    </header>
  );
};

export default Header;