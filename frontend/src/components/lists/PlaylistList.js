import { useState } from 'react';
import PlaylistPage from '../pages/PlaylistPage';
import { useUserContent } from '../../hooks/UserContentContext';
import {
  Box,
  Stack,
  HStack,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import DeletePlaylist from '../modals/DeletePlaylist';
import UpdatePlaylist from '../modals/UpdatePlaylist';

export default function PlaylistList({ playlists }) {
  const { setUserContent } = useUserContent();
  // const { isOpen, onOpen, onClose } = useDisclosure();
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
      {playlists.map(playlist => (
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
          <HStack
            onClick={() =>
              setUserContent(<PlaylistPage playlist_id={playlist.id} />)
            }
          >
            <Text>{playlist.title}</Text>
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
    </Stack>
  );
}
