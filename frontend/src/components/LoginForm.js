import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate(); // Add this hook
  const [role, setRole] = useState('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      console.log("Login success:", response.data);
      
      // Store the token (if your API returns one)
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userRole', role);
      }

      alert("Login successful!");
      
      // Navigate to dashboard after successful login
      navigate('/dashboard'); // Add this line

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label>Select Role:</label><br/>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div>
        <label>Email:</label><br/>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label><br/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;