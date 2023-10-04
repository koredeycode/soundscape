import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';

function UpdatePlaylist({ isOpen, onClose, playlist }) {
  const [formData, setFormData] = useState({
    title: '',
  });
  const { sendAuthorizedRequest, showToast } = useAuth();

  useEffect(() => {
    console.log('rec', playlist);
    setFormData({
      ...formData,
      title: playlist?.title,
    });
  }, [playlist]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      await sendAuthorizedRequest(
        `/user_playlists/${playlist.id}`,
        'put',
        formData
      );
      onClose();

      showToast('Success', 'Playlist Updated', 'success');
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update A Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl id="title" isRequired>
              <FormLabel>Playlist Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                required
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdatePlaylist;
