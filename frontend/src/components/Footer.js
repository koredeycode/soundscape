import React from 'react';
import { Box, Container, Stack, useColorModeValue } from '@chakra-ui/react';
import MusicPlayer from './MusicPlayer';

const tracks = [
  {
    cover_image:
      'http://localhost:8000/media/images/tracks/52184598-2f6f-4b52-b7f1-fbfb95a585bd',
    audio_file:
      'http://localhost:8000/media/tracks/52184598-2f6f-4b52-b7f1-fbfb95a585bd',
    title: 'Track 1',
  },
  {
    cover_image:
      'http://localhost:8000/media/images/tracks/6781f12f-99f0-4e15-8a1e-241013a091f8',
    audio_file:
      'http://localhost:8000/media/tracks/6781f12f-99f0-4e15-8a1e-241013a091f8',
    title: 'Track 2',
  },
  // {
  //   cover_image: 'https://via.placeholder.com/100',
  //   audio_file:
  //     'https://cdn.trendybeatz.com/audio/Olamide-Life-Goes-On-(TrendyBeatz.com).mp3',
  // },
  // {
  //   cover_image: 'https://via.placeholder.com/100',
  //   audio_file:
  //     'https://cdn.trendybeatz.com/audio/Olamide-Another-Level-(TrendyBeatz.com).mp3',
  // },
];
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
        <MusicPlayer tracks={tracks} />
      </Container>
    </Box>
  );
}
