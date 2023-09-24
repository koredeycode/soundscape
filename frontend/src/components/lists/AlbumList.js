import AlbumPage from '../pages/AlbumPage';
import { useUserContent } from '../../hooks/UserContentContext';
import { Box, Stack, Text } from '@chakra-ui/react';
export default function AlbumList({ albums }) {
  const { setUserContent } = useUserContent();

  return (
    <Stack spacing={4}>
      {albums.map(album => (
        <Box
          key={album.id}
          borderWidth="1px"
          borderColor="gray.200"
          p={3}
          borderRadius="md"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => setUserContent(<AlbumPage album_id={album.id} />)}
        >
          <Text>{album.title}</Text>
        </Box>
      ))}
    </Stack>
  );
}
