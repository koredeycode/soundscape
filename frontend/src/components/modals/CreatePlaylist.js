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

function CreatePlaylist({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
  });
  const { sendAuthorizedRequest } = useAuth();
  const toast = useToast();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    // Send a POST request to the selected playlist endpoint with the track_id
    await sendAuthorizedRequest('/user_playlists', 'post', formData);
    onClose();
    console.log('Setted user content to playlists page');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Playlist</ModalHeader>
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
          <Button colorScheme="teal" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreatePlaylist;
