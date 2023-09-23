import React, { useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import MusicPlayer from './MusicPlayer';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      pos="fixed"
      bottom="0"
      p="5"
      w="100%"
    >
      <MusicPlayer />
    </Box>
  );
}
