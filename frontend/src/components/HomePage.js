import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Link as ChakraLink,
  Stack,
  Text,
  HStack,
  VStack,
  Heading,
  Button,
} from '@chakra-ui/react';

function HomePage() {
  return (
    <Box
      bg="gray.50"
      w="100%"
      minH="100vh"
      backgroundImage="/music.jpg"
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
    >
      <Box
        bg="rgba(0, 0, 0, 0.5)"
        mx={{ base: '0', md: '32' }}
        position="relative"
        overflow="hidden"
      >
        <Stack
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          py="4"
          px="4"
          h="80px"
        >
          <Text fontSize="3xl" fontWeight="extrabold">
            SoundScape
          </Text>
        </Stack>
        <HStack
          h="calc(100vh - 80px)"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={4} alignItems="center" px={4} textAlign="center">
            <Heading fontSize="4xl">Escape into the world of music</Heading>
            <Text fontSize="2xl">Listen to music and upload your music</Text>
            <HStack spacing={4}>
              <ChakraLink as={Link} to="/login">
                <Button colorScheme="blue" fontSize="lg">
                  Login
                </Button>
              </ChakraLink>
              <ChakraLink as={Link} to="/register">
                <Button colorScheme="blue" fontSize="lg">
                  Register
                </Button>
              </ChakraLink>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default HomePage;
