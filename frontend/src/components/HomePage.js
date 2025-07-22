import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import AuthModal from '../components/AuthModal';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import slide1 from '../assets/h1.jpg';
import slide2 from '../assets/h4.jpg';
import slide3 from '../assets/h3.jpg';
import '../styles/HomePage.css';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <NavigationBar 
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      <header className="hero-header">
        <div className="hero-container">
          {/* Left side - Content and buttons */}
          <div className="hero-content">
            <h1>Welcome to Handmade Platform</h1>
            <p>Discover and support authentic local artisans who create beautiful, unique handcrafted items with passion and skill.</p>
            <div className="hero-buttons">
              <button className="hero-btn" onClick={() => setShowLogin(true)}>Login</button>
              <button className="hero-btn secondary" onClick={() => setShowSignup(true)}>Sign Up</button>
            </div>
          </div>

          {/* Right side - Visual elements */}
          <div className="hero-visual">
            <div className="image-stack">
              <div className="hero-image" style={{backgroundImage: `url(${slide1})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="image-overlay">Artisan Gallery</div>
              </div>
              <div className="hero-image" style={{backgroundImage: `url(${slide2})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="image-overlay">Handcrafted Items</div>
              </div>
              <div className="hero-image" style={{backgroundImage: `url(${slide3})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="image-overlay">Local Creators</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Login Modal */}
      <AuthModal show={showLogin} onClose={() => setShowLogin(false)}>
        <LoginForm />
      </AuthModal>

      {/* ✅ Signup Modal */}
      <AuthModal show={showSignup} onClose={() => setShowSignup(false)}>
        <SignupForm
          onClose={() => setShowSignup(false)}
          switchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      </AuthModal>
    </div>
  );
};

export default HomePage;