import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Text,
  Button,
  Skeleton,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import PlaylistList from '../lists/PlaylistList';
import CreatePlaylist from '../modals/CreatePlaylist';

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendAuthorizedRequest } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Simulate an API request to fetch playlists (replace with actual API call)
    setIsLoading(true);
    (async () => {
      const data = await sendAuthorizedRequest('/user_playlists', 'get', {});
      setPlaylists(data);
      setIsLoading(false);
    })();

    // In a real application, you would make an actual API call to fetch user's playlists
  }, []);

  return (
    <Box p={4}>
      <HStack>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          My Playlists
        </Text>
        <Button colorScheme="teal" onClick={onOpen}>
          Create Playlist
        </Button>
      </HStack>
      {isLoading ? (
        <Stack spacing={4}>
          <Skeleton height="20px" width="50%" />
          <Skeleton height="20px" width="70%" />
          <Skeleton height="20px" width="60%" />
        </Stack>
      ) : (
        <PlaylistList playlists={playlists} />
      )}
      <CreatePlaylist isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default PlaylistsPage;
