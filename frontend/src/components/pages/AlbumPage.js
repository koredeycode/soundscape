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
// import useAudioPlayer from '../../hooks/AudioContext';
import { useAudioPlayerContext } from '../../hooks/AudioPlayerContext';

// Mock data for the album and its tracks
const albumData = {
  title: 'Album Title',
  coverImage:
    'http://localhost:8000/media/images/tracks/ac230a50-d6a-49dd-b7a0-1a8252547a0e', // Replace with the actual image URL
  tracks: [
    {
      cover_image:
        'http://localhost:8000/media/images/tracks/50a9b014-104a-4576-a7d9-b44ebccafc31',
      audio_file:
        'http://localhost:8000/media/tracks/50a9b014-104a-4576-a7d9-b44ebccafc31',
      title: 'Dangote',
      artist: 'Burna Boy',
    },
    {
      cover_image:
        'http://localhost:8000/media/images/tracks/975769f3-3b5a-4d26-abfa-06b16e3a1450',
      audio_file:
        'http://localhost:8000/media/tracks/975769f3-3b5a-4d26-abfa-06b16e3a1450',
      title: 'Trabaye',
      artist: 'Asake',
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
        {albumData.tracks.map((track, idx) => (
          <TrackItem
            key={idx}
            track={track}
            index={idx}
            tracks={albumData.tracks}
          />
        ))}
      </VStack>
    </Box>
  );
}

function TrackItem({ track, index, tracks }) {
  const { handleAddingNextTrack, handlePlayingATrack } =
    useAudioPlayerContext();
  return (
    <HStack w="100%" justify="space-between">
      <Text>{`${index}. ${track.title}`}</Text>
      <HStack spacing={2}>
        <IconButton
          icon={<FaPlay />}
          aria-label={`Play ${track.title}`}
          size="sm"
          variant="ghost"
          onClick={() => {
            console.log('is this playing');
            handlePlayingATrack(tracks, index);
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
            <MenuItem
              onClick={() => {
                handleAddingNextTrack(track);
              }}
            >
              PlayNext
            </MenuItem>
            <MenuItem>Add To A Playlist</MenuItem>
            {/* Add more menu items as needed */}
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}

export default AlbumPage;
