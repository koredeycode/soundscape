import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Square,
  Text,
  VStack,
  HStack,
  Heading,
} from '@chakra-ui/react';

const data = {
  name: 'The Beatles',
  imageURL:
    'http://localhost:8000/media/images/tracks/cd192cd9-078e-4916-b7df-59a950a41d09',
  isNew: true,
};

function Card() {
  return (
    <VStack
      bg={useColorModeValue('gray.100', 'gray.800')}
      p="3"
      minW="0"
      wordWrap="break-word"
      w="170px"
      alignItems="flex-start"
    >
      <Image
        src={data.imageURL}
        alt={`Picture of ${data.name}`}
        w="150px"
        h="150px"
        objectFit="cover"
      />
      <Heading as="h3" fontSize="sm">
        Recently Played
      </Heading>
      <Text fontSize="sm">These are your recently played tracks</Text>
    </VStack>
  );
}

function Home() {
  return (
    <VStack alignItems="flex-start" gap="4">
      <Box>
        <Heading fontSize="xl" pb="2">
          Recently Played
        </Heading>
        <HStack>
          <Card />
        </HStack>
      </Box>
      <Box>
        <Heading fontSize="xl" pb="2">
          Explore Playlists
        </Heading>
        <Text>Unwind with these selected playlists</Text>
        <HStack flexWrap="wrap" pb="2" gap="4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </HStack>
      </Box>
    </VStack>
  );
}
export default Home;
