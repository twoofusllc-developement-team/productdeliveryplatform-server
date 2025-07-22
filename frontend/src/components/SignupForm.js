import React, { useState } from 'react';
import '../styles/AuthModal.css';
import axios from 'axios';

const SignupForm = ({ onClose, switchToLogin }) => {
  const [roles, setRoles] = useState([]);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const tenantId = "64f1234567890abcde123456"; // 📝 Static tenantId for testing

  const handleRoleChange = (e) => {
    const value = e.target.value;
    if (roles.includes(value)) {
      setRoles(roles.filter(role => role !== value));
    } else {
      setRoles([...roles, value]);
    }
  };

  
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/persons/create', {
        fullName: username, // assuming username input is user's full name
        phone: phone,
        email: email,
        password: password,
        roles: roles,
        tenantId: tenantId,
        // Provide empty profiles if needed to pass backend validation
        buyerProfile: roles.includes("buyer") ? {} : undefined,
        sellerProfile: roles.includes("seller") ? {} : undefined,
        expertProfile: roles.includes("expert") ? {} : undefined
      });

      console.log("Signup success:", response.data);
      alert("Signup successful!");

      onClose(); // Close modal after signup

    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>x</button>
        <h3>Sign Up</h3>

        <form onSubmit={handleSignup}>
          <label>Select Roles:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="buyer"
                checked={roles.includes('buyer')}
                onChange={handleRoleChange}
              />
              Buyer
            </label>
            <label>
              <input
                type="checkbox"
                value="seller"
                checked={roles.includes('seller')}
                onChange={handleRoleChange}
              />
              Seller
            </label>
            <label>
              <input
                type="checkbox"
                value="expert"
                checked={roles.includes('expert')}
                onChange={handleRoleChange}
              />
              Expert
            </label>
          </div>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="tenanId"
            value={tenantId}
            readOnly
          />


          <button type="submit">Sign Up</button>
        </form>

        <p style={{ marginTop: '10px' }}>
          Already have an account?{' '}
          <span
            style={{ color: '#6B4F3B', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => {
              onClose();
              switchToLogin();
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;