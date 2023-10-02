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
import { useAuth } from '../../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

function DeleteTrack({ isOpen, onClose, album }) {
  const { sendAuthorizedRequest, showToast } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await sendAuthorizedRequest(`/albums/${album.id}`, 'delete', {});
      onClose();
      navigate('/artist-profile');

      showToast('Success', 'Album Deleted!', 'success');
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Track</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete this album: <b>{album?.title}</b>
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

export default DeleteTrack;
