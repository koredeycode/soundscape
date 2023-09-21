import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import MusicPlayer from './MusicPlayer';

const tracks = [
  {
    cover_image:
      'http://localhost:8000/media/images/tracks/52184598-2f6f-4b52-b7f1-fbfb95a585bd',
    audio_file:
      'http://localhost:8000/media/tracks/52184598-2f6f-4b52-b7f1-fbfb95a585bd',
    title: 'Love Nwantiti',
    artist: 'Ckay',
  },
  {
    cover_image:
      'http://localhost:8000/media/images/tracks/6781f12f-99f0-4e15-8a1e-241013a091f8',
    audio_file:
      'http://localhost:8000/media/tracks/6781f12f-99f0-4e15-8a1e-241013a091f8',
    title: 'Last Last',
    artist: 'Burna Boy',
  },
  {
    cover_image:
      'http://localhost:8000/media/images/tracks/5a3adf9f-fc51-4bd1-bb10-85ef4193671e',
    audio_file:
      'http://localhost:8000/media/tracks/5a3adf9f-fc51-4bd1-bb10-85ef4193671e',
    title: 'Dangote',
    artist: 'Burna Boy',
  },
  {
    cover_image:
      'http://localhost:8000/media/images/tracks/ac230a50-d63a-49dd-b7a0-1a8252547a0e',
    audio_file:
      'http://localhost:8000/media/tracks/ac230a50-d63a-49dd-b7a0-1a8252547a0e',
    title: 'Trabaye',
    artist: 'Asake',
  },
  {
    cover_image:
      'http://localhost:8000/media/images/tracks/1d6ed333-290c-425b-8d48-ba1e97d5224e',
    audio_file:
      'http://localhost:8000/media/tracks/1d6ed333-290c-425b-8d48-ba1e97d5224e',
    title: 'My Woman',
    artist: 'Dotman',
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
      p="5"
      w="100%"
    >
      <MusicPlayer tracks={tracks} />
    </Box>
  );
}
