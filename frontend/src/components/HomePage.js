import React, { useState } from 'react';
import ImageSlider from './ImageSlider';
import AuthModal from '../components/AuthModal';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import '../styles/HomePage.css';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="homepage">
      <header className="hero-header">
        <h1>Welcome to Handmade Platform</h1>
        <p>Discover and support authentic local artisans</p>
        <div className="hero-buttons">
          <button className="hero-btn" onClick={() => setShowLogin(true)}>Login</button>
          <button className="hero-btn" onClick={() => setShowSignup(true)}>Sign Up</button>
        </div>
      </header>

      <ImageSlider />

      {/* ✅ Login Modal */}
      <AuthModal show={showLogin} onClose={() => setShowLogin(false)}>
        <LoginForm />
      </AuthModal>

      {/* ✅ Signup Modal */}
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
