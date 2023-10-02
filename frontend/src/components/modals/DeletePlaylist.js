import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';

function DeletePlaylist({ isOpen, onClose, playlist }) {
  const { sendAuthorizedRequest, showToast } = useAuth();

  const handleDelete = async () => {
    try {
      await sendAuthorizedRequest(
        `/user_playlists/${playlist.id}`,
        'delete',
        {}
      );
      onClose();
      showToast('Success', 'Playlist Deleted!', 'success');
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete this playlist:{' '}
            <b>{playlist?.title}</b>
          </Text>
          <Text>This action cannot be undone</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeletePlaylist;
