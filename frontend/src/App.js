import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import {
  ChakraProvider,
  CSSReset,
  Box,
  extendTheme,
  Spinner,
} from '@chakra-ui/react';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register'; // Updated import
import NotFound from './components/NotFound';
import { useAuth } from './hooks/AuthContext';
import UserDashboard from './components/UserDashboard/UserDashboard';
import ArtistDashboard from './components/ArtistDashboard/ArtistDashboard';
import { Logo } from './Logo';
// Define a custom Chakra UI theme if needed
const theme = extendTheme({
  // Add your custom theme configurations here
  // components: {
  //   Button: {
  //     baseStyle: {
  //       fontSize: '1rem',
  //       padding: '0.25rem 0.5rem',
  //     },
  //     sizes: {
  //       md: {
  //         fontSize: '24px',
  //         padding: '0.5rem 1rem',
  //       },
  //     },
  //   },
  // },
});

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  console.log(isAuthenticated);

  if (isLoading) {
    return (
      <Spinner
        w="200px"
        h="200px"
        my="auto"
        mx="auto"
        color="blue.500"
        position="absolute"
        top="50%"
        left="50%"
      />
    );
    // return <Logo />;
  }

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
                isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
              }
            />
            <Route
              path="/artist-dashboard"
              element={
                isAuthenticated ? <ArtistDashboard /> : <Navigate to="/login" />
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
