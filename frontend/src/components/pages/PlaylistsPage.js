import React, { useState, useEffect } from 'react';
import { Box, Stack, Text, Button, Skeleton, useToast } from '@chakra-ui/react';

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Simulate an API request to fetch playlists (replace with actual API call)
    setIsLoading(true);

    setTimeout(() => {
      const mockPlaylists = [
        { id: 1, name: 'Playlist 1' },
        { id: 2, name: 'Playlist 2' },
        { id: 3, name: 'Playlist 3' },
      ];

      setPlaylists(mockPlaylists);
      setIsLoading(false);
    }, 2000); // Simulated delay

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
        <Stack spacing={4}>
          {playlists.map(playlist => (
            <Box
              key={playlist.id}
              borderWidth="1px"
              borderColor="gray.200"
              p={3}
              borderRadius="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>{playlist.name}</Text>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => handleDeletePlaylist(playlist.id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default PlaylistsPage;
