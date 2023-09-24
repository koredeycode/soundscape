import React, { useState, useEffect } from 'react';
import { Box, Stack, Text, Button, Skeleton, useToast } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import { useUserContent } from '../../hooks/UserContentContext';
import PlaylistList from '../lists/PlaylistList';

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendAuthorizedRequest } = useAuth();
  const { setUserContent } = useUserContent();
  const toast = useToast();

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

  const handleDeletePlaylist = playlistId => {
    // Simulate deletion (replace with actual API call)
    const updatedPlaylists = playlists.filter(
      playlist => playlist.id !== playlistId
    );

    setPlaylists(updatedPlaylists);

    toast({
      title: 'Playlist Deleted',
      description: 'The playlist has been deleted.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        My Playlists
      </Text>
      {isLoading ? (
        <Stack spacing={4}>
          <Skeleton height="20px" width="50%" />
          <Skeleton height="20px" width="70%" />
          <Skeleton height="20px" width="60%" />
        </Stack>
      ) : (
        <PlaylistList playlists={playlists} />
      )}
    </Box>
  );
}

export default PlaylistsPage;
