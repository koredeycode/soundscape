import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function LoginForm({ setAuth }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/login/',
        formData,
      );
      console.log('Login successful:', response.data);
      Cookies.set('token', response.data.token);
      const userData = await axios.get('http://localhost:8000/isuser/', {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      setAuth({
        isAuthenticated: true,
        user: userData.data,
        token: Cookies.get('token'),
      });
      // Handle successful login here (e.g., redirect or set user state)
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure here (e.g., display an error message)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
