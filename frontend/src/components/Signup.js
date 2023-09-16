import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to your Django API for user registration
    try {
      const response = await axios.post(
        'http://localhost:8000/register/',
        formData,
      );

      if (response.ok) {
        // Handle successful registration, e.g., set user state
        navigate('/login');
      } else {
        // Handle registration failure
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
