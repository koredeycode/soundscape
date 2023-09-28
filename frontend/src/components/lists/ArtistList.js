import { Link } from 'react-router-dom';
import { Box, Stack, Text, Link as ChakraLink } from '@chakra-ui/react';

export default function ArtistList({ artists }) {
  return (
    <Stack spacing={4}>
      {artists.map(artist => (
        <Box
          key={artist.id}
          borderWidth="1px"
          borderColor="gray.200"
          p={3}
          borderRadius="md"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <ChakraLink
            as={Link}
            to={`/artists/${artist.id}`}
            color="black"
            // display="inline-block"
            // p="3"
          >
            {artist.name}
          </ChakraLink>
        </Box>
      ))}
    </Stack>
  );
}
