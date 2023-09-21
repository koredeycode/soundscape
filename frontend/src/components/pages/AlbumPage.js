import React from 'react';
import {
  Box,
  Heading,
  Image,
  VStack,
  HStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FaPlay, FaEllipsisV } from 'react-icons/fa';

// Mock data for the album and its tracks
const albumData = {
  title: 'Album Title',
  coverImage:
    'http://localhost:8000/media/images/tracks/ac230a50-d6a-49dd-b7a0-1a8252547a0e', // Replace with the actual image URL
  tracks: [
    {
      number: 1,
      title: 'Track 1',
      length: '3:45',
    },
    {
      number: 2,
      title: 'Track 2',
      length: '4:20',
    },
    // Add more tracks as needed
  ],
};

function AlbumPage() {
  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        {albumData.title}
      </Heading>
      <Image src={albumData.coverImage} alt="Album Cover" mb={4} />
      <VStack align="start" spacing={4}>
        {albumData.tracks.map(track => (
          <TrackItem key={track.number} track={track} />
        ))}
      </VStack>
    </Box>
  );
}

function TrackItem({ track }) {
  return (
    <HStack w="100%" justify="space-between">
      <Text>{`${track.number}. ${track.title}`}</Text>
      <Text>{track.length}</Text>
      <HStack spacing={2}>
        <IconButton
          icon={<FaPlay />}
          aria-label={`Play ${track.title}`}
          size="sm"
          variant="ghost"
          onClick={() => {
            // Add play functionality
          }}
        />
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisV />}
            aria-label="Options"
            size="sm"
            variant="ghost"
          />
          <MenuList>
            <MenuItem>Add To A Playlist</MenuItem>
            {/* Add more menu items as needed */}
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}

export default AlbumPage;
