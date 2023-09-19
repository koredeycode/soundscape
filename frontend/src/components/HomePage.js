import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Link as ChakraLink } from '@chakra-ui/react';

function HomePage() {
  return (
    <Box textAlign="center" p="4">
      <Heading as="h1" size="xl" mb="4">
        Welcome to My App
      </Heading>
      <Box mb="4">
        <ChakraLink as={Link} to="/login" color="blue.500" fontSize="lg">
          Login
        </ChakraLink>
      </Box>
      <Box>
        <ChakraLink as={Link} to="/register" color="blue.500" fontSize="lg">
          Register
        </ChakraLink>
      </Box>
    </Box>
  );
}

export default HomePage;
