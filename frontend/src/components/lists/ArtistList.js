import ArtistPage from '../pages/ArtistPage';
import { useUserContent } from '../../hooks/UserContentContext';
import { Box, Stack, Text } from '@chakra-ui/react';

export default function ArtistList({ artists }) {
  const { setUserContent } = useUserContent();

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
          onClick={() => setUserContent(<ArtistPage artist_id={artist.id} />)}
        >
          <Text>{artist.name}</Text>
        </Box>
      ))}
    </Stack>
  );
}
