import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';

function NotFound() {
  return (
    <Box textAlign="center" p="4">
      <Heading as="h2" size="xl" mb="4">
        404 - Not Found
      </Heading>
      <Text mb="4">The page you are looking for does not exist.</Text>
      <ChakraLink as={Link} to="/" color="blue.500" fontSize="lg">
        Go Home
      </ChakraLink>
    </Box>
  );
}

export default NotFound;
