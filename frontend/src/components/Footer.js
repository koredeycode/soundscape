import React from 'react';
import { Box, Container, Stack, useColorModeValue } from '@chakra-ui/react';
import MusicPlayer from './MusicPlayer';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      pos="fixed"
      bottom="0"
      p="3"
      w="100%"
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <MusicPlayer />
      </Container>
    </Box>
  );
}
