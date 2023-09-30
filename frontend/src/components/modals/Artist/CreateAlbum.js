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
  Textarea,
} from '@chakra-ui/react';
import { useAuth } from '../../../hooks/AuthContext';

function CreateAlbum({ isOpen, onClose, genres }) {
  const [formData, setFormData] = useState({
    title: '',
    genre_id: '',
    // audio_file: '',
    description: '',
    // cover_image: '',
  });
  const { sendAuthorizedRequest } = useAuth();

  const handleInputChange = e => {
    const { name, value, type } = e.target;
    // Handle file inputs separately
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCreate = async e => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Send a POST request to the selected playlist endpoint with the track_id
    const subformData = new FormData();

    console.log(formData);
    // Append form fields to the FormData object
    subformData.append('title', formData.title);
    subformData.append('genre_id', formData.genre_id);
    subformData.append('description', formData.description);

    // Append files to the FormData object
    if (formData.cover_image) {
      subformData.append('cover_image', formData.cover_image);
    }
    console.log(subformData);
    await sendAuthorizedRequest('/albums', 'post', subformData, {
      'Content-Type': 'multipart/form-data',
    });
    onClose();
    // window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form id="createform" onSubmit={handleCreate}>
          <ModalHeader>Create Album</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="title" isRequired>
                <FormLabel>Album Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  type="text"
                  required
                />
              </FormControl>
              <FormControl id="genre_id" isRequired>
                <FormLabel>Select a Genre</FormLabel>
                <Select
                  placeholder="Select a genre"
                  name="genre_id"
                  value={formData.genre_id}
                  onChange={handleInputChange}
                >
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="cover_image">
                <FormLabel>Album Cover Image</FormLabel>
                <Input
                  name="cover_image"
                  onChange={handleInputChange}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Album Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></Textarea>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="teal">
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreateAlbum;
