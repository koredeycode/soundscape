import { Link } from 'react-router-dom';
import {
  Box,
  Stack,
  Text,
  Link as ChakraLink,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import CreateAlbum from '../modals/Artist/CreateAlbum';

export default function AlbumList({ albums }) {
  const { sendAuthorizedRequest } = useAuth();
  const [genres, setGenres] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest('/genres', 'get', {});
      console.log(data);
      setGenres(data);
    })();
  }, []);

  return (
    <>
      <Button colorScheme="teal" onClick={onClose}>
        Create New Album
      </Button>
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
            <ChakraLink
              as={Link}
              to={`/artist-albums/${album.id}`}
              color="black"
              // display="inline-block"
              // p="3"
            >
              {album.title}
            </ChakraLink>
          </Box>
        ))}
      </Stack>
      <CreateAlbum isOpen={isOpen} onClose={onClose} genres={genres} />
    </>
  );
}
