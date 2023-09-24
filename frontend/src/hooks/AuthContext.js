import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const url = 'http://127.0.0.1:8000';
  const toast = useToast();

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
    });
  };
  // You can use useEffect to check the user's authentication status
  useEffect(() => {
    (async () => {
      await storeUser();
      setIsLoading(false);
    })();
  }, []);

  const storeUser = async () => {
    try {
      const data = await sendAuthorizedRequest('/isuser', 'get', {});
      localStorage.setItem('user', JSON.stringify(data));
      setIsAuthenticated(true);
      setCurrentUser(data);
    } catch (error) {
      // showToast('Error', error.response.data?.error, 'error');
    }
  };
  const login = async userData => {
    try {
      const response = await axios.post(`${url}/login/`, userData);
      Cookies.set('token', response.data.token);
      storeUser();
      showToast('Success', 'Logged in successfully', 'success');
      return '/dashboard';
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
      return '/login';
    }
  };

  const register = async userData => {
    try {
      await axios.post(`${url}/register/`, userData);
      showToast('Success', 'Registered successfully', 'success');
      return '/login';
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
      return '/register';
    }
  };

  const logout = () => {
    try {
      sendAuthorizedRequest('/logout', 'post', {});
      setIsAuthenticated(false);
      setCurrentUser(null);
      Cookies.remove('token');
      localStorage.removeItem('user');
      showToast('Success', 'Logged out successfully', 'success');
    } catch (error) {
      // showToast('Error', error.response.data?.error, 'error');
    }
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
      showToast('Error', error.response.data?.error, 'error');
      throw error; // Rethrow the error to handle it in calling code
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        sendAuthorizedRequest,
        storeUser,
        isAuthenticated,
        currentUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
