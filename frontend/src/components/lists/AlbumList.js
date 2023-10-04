import { Link } from 'react-router-dom';
import { Box, Stack, Link as ChakraLink } from '@chakra-ui/react';

export default function AlbumList({ albums }) {
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
        >
          <ChakraLink as={Link} to={`/albums/${album.id}`} color="black">
            {album.title}
          </ChakraLink>
        </Box>
      ))}
    </Stack>
  );
}
