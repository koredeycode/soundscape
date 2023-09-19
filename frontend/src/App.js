import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ChakraProvider, CSSReset, Box, extendTheme } from '@chakra-ui/react';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register'; // Updated import
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { useAuth } from './hooks/AuthContext';

// Define a custom Chakra UI theme if needed
const theme = extendTheme({
  // Add your custom theme configurations here
});

function App() {
  const { auth } = useAuth();

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router>
        <Box>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                auth.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={
                auth.isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/register"
              element={
                auth.isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Register />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
