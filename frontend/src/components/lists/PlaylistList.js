import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Stack,
  HStack,
  Text,
  Button,
  useDisclosure,
  Link as ChakraLink,
} from '@chakra-ui/react';
import DeletePlaylist from '../modals/DeletePlaylist';
import UpdatePlaylist from '../modals/UpdatePlaylist';

export default function PlaylistList({ playlists }) {
  console.log(playlists);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  return (
    <Stack spacing={4}>
      {playlists.map((playlist, index) => (
        <Box
          key={playlist.id}
          borderWidth="1px"
          borderColor="gray.200"
          p={3}
          borderRadius="md"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack>
            <ChakraLink
              as={Link}
              to={`/playlists/${playlist.id}`}
              color="black"
            >
              {playlist.title}
            </ChakraLink>
          </HStack>
          <HStack>
            <Button
              colorScheme="teal"
              onClick={() => {
                setSelectedPlaylist(playlist);
                onOpenUpdateModal();
              }}
            >
              Update
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                setSelectedPlaylist(playlist);
                onOpenDeleteModal();
              }}
            >
              Delete
            </Button>
          </HStack>
        </Box>
      ))}
      <>
        <UpdatePlaylist
          isOpen={isUpdateModalOpen}
          onClose={onCloseUpdateModal}
          playlist={selectedPlaylist}
        />
        <DeletePlaylist
          isOpen={isDeleteModalOpen}
          onClose={onCloseDeleteModal}
          playlist={selectedPlaylist}
        />
      </>
    </Stack>
  );
}
