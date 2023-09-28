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
  Select,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';

function CreateTrack({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    audio_file: null,
    description: '',
    cover_image: null,
  });
  const { sendAuthorizedRequest } = useAuth();
  const genres = [];

  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest('/genres', 'get', {});
      genres = data;
    })();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    // Send a POST request to the selected playlist endpoint with the track_id
    await sendAuthorizedRequest('/tracks', 'post', formData);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Track</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl id="title" isRequired>
              <FormLabel>Track Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                required
              />
            </FormControl>
            <FormControl id="genre" isRequired>
              <FormLabel>Select a Genre</FormLabel>
              <Select
                placeholder="Select a genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.title}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="audio_file" isRequired>
              <FormLabel>Upload Track</FormLabel>
              <Input
                name="audio_file"
                value={formData.audio_file}
                onChange={handleInputChange}
                type="file"
                required
              />
            </FormControl>
            <FormControl id="cover_image" isRequired>
              <FormLabel>Track Cover Image</FormLabel>
              <Input
                name="cover_image"
                value={formData.cover_image}
                onChange={handleInputChange}
                type="file"
                required
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Track Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                type="file"
                required
              ></Textarea>
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

export default CreateTrack;
