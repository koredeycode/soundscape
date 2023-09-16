// authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
  });
  const url = 'http://127.0.0.1:8000';

  // You can use useEffect to check the user's authentication status
  useEffect(() => {
    storeUser();
  }, []);

  const storeUser = async () => {
    const token = Cookies.get('token');
    if (token) {
      const data = await sendAuthorizedRequest('/isuser', 'get', {});
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      setAuth({
        isAuthenticated: true,
        user: data,
      });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
      });
    }
  };
  const login = async (userData) => {
    try {
      const response = await axios.post(`${url}/login/`, userData);
      console.log(response.data);
      Cookies.set('token', response.data.token);
      storeUser();
      return '/dashboard';
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post(`${url}/register/`, userData);
      console.log(response.data);
      return '/login';
    } catch (error) {
      console.log(error);
      return '/';
    }
  };

  const logout = () => {
    sendAuthorizedRequest('/logout', 'post', {});
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    Cookies.remove('token');
    localStorage.clear();
    // navigate('/login');
  };
  const sendAuthorizedRequest = async (endpoint, method, data) => {
    const axiosInstance = axios.create(); // Create a new Axios instance
    const token = Cookies.get('token');

    try {
      const response = await axiosInstance({
        method: method,
        url: `${url}${endpoint}/`,
        data: data,
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it in calling code
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, register, sendAuthorizedRequest }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
