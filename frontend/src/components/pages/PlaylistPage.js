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
  title: 'Playlist Title',
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

function PlaylistPage() {
  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        {albumData.title}
      </Heading>
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
            <MenuItem>Remove From Playlist</MenuItem>
            {/* Add more menu items as needed */}
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}

export default PlaylistPage;
