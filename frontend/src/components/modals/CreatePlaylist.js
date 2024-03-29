import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

function CreatePlaylist({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
  });
  const { sendAuthorizedRequest, showToast } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    // Send a POST request to the selected playlist endpoint with the track_id
    try {
      const response = await sendAuthorizedRequest(
        '/user_playlists',
        'post',
        formData
      );
      showToast('Success', 'Playlist Created', 'success');
      onClose();
      navigate(`/playlists/${response.id}`);
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
    }
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
          <Button colorScheme="blue" onClick={handleCreate}>
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
