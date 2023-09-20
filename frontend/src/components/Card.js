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
} from '@chakra-ui/react';

const data = {
  name: 'The Beatles',
  imageURL:
    'http://localhost:8000/media/images/tracks/52184598-2f6f-4b52-b7f1-fbfb95a585bd',
  isNew: true,
};

function Card() {
  return (
    <Flex p="4" w="full" gap="1" flexWrap="wrap">
      <Box bg={useColorModeValue('white', 'gray.800')} maxW="sm" p="2">
        <Square>
          <Image
            src={data.imageURL}
            alt={`Picture of ${data.name}`}
            w="200"
            h="200"
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
      </Box>
    </Flex>
  );
}

export default Card;
