import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { updateNetStock } from '../logic/NetStockUpdateLogic';

const Navbar = () => {
  // State to toggle dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to toggle dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUpdateNetStock = async () => {
    try {
      const response = await updateNetStock();
      if (response.ok) {
        console.log('Net Stock updated successfully.');
        // Add any additional logic or UI updates here
      } else {
        console.error('Failed to update Net Stock:', response.statusText);
        // Handle the error or display an error message
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error or display an error message
    }
  };

  return (
    <nav className="navbar">
      {/* Left section of the navbar */}
      <div className="navbar__left">
        {/* Brand/logo */}
        <Link to="/Homepage" className="navbar__brand" onClick={handleUpdateNetStock}>
          <span className="navbar__brand-text">NTS Decision Support System</span>
        </Link>
      </div>

      {/* Right section of the navbar */}
      <div className="navbar__right">
        {/* Menu */}
        <ul className="navbar__menu">
          {/* Logout link */}
          <li className="navbar__item">
            <Link to="/Homepage" className="navbar__link" onClick={handleUpdateNetStock}>Dashboard</Link>
          </li>
          {/* Dropdown menu */}
          <li className="navbar__item navbar__item--dropdown">
            <button className="navbar__link navbar__link--dropdown" onClick={toggleDropdown}>
              Inventory Management <span className="navbar__icon">{showDropdown ? '▲' : '▼'}</span>
            </button>
          

            {/* Submenu */}
            {showDropdown && (
              <div className="navbar__dropdown">
                <ul className="navbar__submenu">
                  <li className="navbar__submenu-item">
                    <Link to="/Stock_In" className="navbar__submenu-link">Stock In</Link>
                  </li>
                  <li className="navbar__submenu-item">
                    <Link to="/Stock_Sell" className="navbar__submenu-link">Stock Out</Link>
                  </li>
                  <li className="navbar__submenu-item">
                    <Link to="/NetStock" className="navbar__submenu-link">Net Stock</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">Logout</Link>
          </li>

          {/* Dashboard link */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
