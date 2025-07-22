import React from 'react';
import '../styles/NavigationBar.css';

const NavigationBar = ({ isAuthenticated = false, onLoginClick, onSignupClick, onCartClick, onProfileClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">Handmade</a>
        
        {isAuthenticated ? (
          <div className="navbar-buttons">
            <button className="navbar-btn icon-btn" onClick={onCartClick}>
              🛒 Cart
            </button>
            <button className="navbar-btn icon-btn" onClick={onProfileClick}>
              👤 Profile
            </button>
          </div>
        ) : (
          <div className="navbar-buttons">
            <button className="navbar-btn" onClick={onLoginClick}>
              Login
            </button>
            <button className="navbar-btn primary" onClick={onSignupClick}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;