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
} from '@chakra-ui/react';

const data = {
  name: 'The Beatles',
  imageURL:
    'http://localhost:8000/media/images/tracks/52184598-2f6f-4b52-b7f1-fbfb95a585bd',
  isNew: true,
};

function Card() {
  return (
    <VStack bg={useColorModeValue('white', 'gray.800')} p="2">
      <Square>
        <Image
          src={data.imageURL}
          alt={`Picture of ${data.name}`}
          w="150"
          h="150"
        />
      </Square>
      <Box>
        <Text fontSize="sm" fontWeight="bold">
          Welcome to SoundScape
        </Text>
        <Text fontSize="sm" fontWeight="thin">
          Welcome to SoundScape
        </Text>
      </Box>
    </VStack>
  );
}

function Home() {
  return (
    <div>
      <Card />
    </div>
  );
}
export default Home;
