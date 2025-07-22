import React from 'react';
import '../styles/NavigationBar.css';

const NavigationBar = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="Homepage.js" className="navbar-logo">handmade project</a>
        <div className="navbar-buttons">
          <button className="navbar-btn" onClick={onLoginClick}>
            Login
          </button>
          <button className="navbar-btn primary" onClick={onSignupClick}>
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;