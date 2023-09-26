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
  Select,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import { useUserContent } from '../../hooks/UserContentContext';
import PlaylistsPage from '../pages/PlaylistsPage';

function UpdatePlaylist({ isOpen, onClose, playlist }) {
  const title = playlist?.title || '';
  console.log('update', title);
  const [formData, setFormData] = useState({
    title: '',
  });
  const { sendAuthorizedRequest } = useAuth();
  const { setUserContent } = useUserContent();
  const toast = useToast();

  useEffect(() => {
    setFormData({
      ...formData,
      title: title,
    });
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    // Send a POST request to the selected playlist endpoint with the track_id
    await sendAuthorizedRequest(
      `/user_playlists/${playlist.id}`,
      'put',
      formData
    );
    onClose();
    setUserContent(<PlaylistsPage />);
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
          <Button colorScheme="teal" onClick={handleUpdate}>
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
