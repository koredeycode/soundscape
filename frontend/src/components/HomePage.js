import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react';

function HomePage() {
  return (
    <Box bg="white" w="100%" minH="100vh">
      <Box mx={{ base: '0', md: '32' }}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          bg="gray.200"
          py="4"
          px="4"
        >
          <Box>
            <Text fontSize="18px" fontWeight="extrabold">
              SoundScape
            </Text>
          </Box>
          <Stack flexDirection="row">
            <ChakraLink as={Link} to="/login" color="blue.500" fontSize="lg">
              Login
            </ChakraLink>
            <ChakraLink as={Link} to="/register" color="blue.500" fontSize="lg">
              Register
            </ChakraLink>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default HomePage;
