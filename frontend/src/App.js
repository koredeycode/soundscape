import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Cookies from 'js-cookie';

function App() {
  // const [user, setUser] = useState(null);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  const handleLogout = () => {
    // Implement logout logic, e.g., clear user state
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    });
    Cookies.remove('token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setAuth={setAuth} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            auth.isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
          }
        />
        <Route
          path="/dashboard"
          element={
            auth.isAuthenticated ? (
              <Dashboard user={auth.user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
