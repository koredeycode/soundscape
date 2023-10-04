import {
  Box,
  useColorModeValue,
  Text,
  VStack,
  HStack,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthContext';

function Card({ title }) {
  return (
    <VStack
      bg={useColorModeValue('blue.00', 'gray.800')}
      color="white"
      p="3"
      w="175px"
      alignItems="flex-start"
      minH="250px"
    >
      <Stack
        h="150px"
        w="150px"
        justifyContent="center"
        alignItems="center"
        bg="blue.400"
      >
        <Text>{title}</Text>
      </Stack>

      <Heading as="h3" fontSize="sm">
        {title}
      </Heading>

      <Text fontSize="sm">Explore {title} tracks</Text>
    </VStack>
  );
}

function Home() {
  const [genres, setGenres] = useState([]);
  const { sendAuthorizedRequest, showToast } = useAuth();

  useEffect(() => {
    try {
      (async () => {
        const data = await sendAuthorizedRequest('/genres', 'get', {});
        setGenres(data);
      })();
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
    }
  }, []);

  return (
    <VStack alignItems="flex-start" gap="4">
      <Box>
        <Heading fontSize="xl" pb="2">
          Recently Played
        </Heading>
        <HStack>
          <Link to="/recent-play">
            <Card title="Recently Played" />
          </Link>
        </HStack>
      </Box>
      <Box>
        <Heading fontSize="xl" pb="2">
          Explore Genres
        </Heading>
        <HStack flexWrap="wrap" pb="2" gap="4" alignItems="flex-start">
          {genres.map(genre => {
            return (
              <Link to={`/genres/${genre.id}`}>
                <Card key={genre.name} title={genre.name} />
              </Link>
            );
          })}
        </HStack>
      </Box>
    </VStack>
  );
}
export default Home;
