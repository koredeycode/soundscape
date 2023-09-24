import PlaylistPage from '../pages/PlaylistPage';
import { useUserContent } from '../../hooks/UserContentContext';
import { Box, Stack, Text } from '@chakra-ui/react';

export default function PlaylistList({ playlists }) {
  const { setUserContent } = useUserContent();

  return (
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
          onClick={() =>
            setUserContent(<PlaylistPage playlist_id={playlist.id} />)
          }
        >
          <Text>{playlist.title}</Text>
        </Box>
      ))}
    </Stack>
  );
}
