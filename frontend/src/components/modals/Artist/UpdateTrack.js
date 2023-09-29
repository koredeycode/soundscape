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
  Textarea,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../../../hooks/AuthContext';

function UpdateTrack({ isOpen, onClose, track, genres }) {
  const [formData, setFormData] = useState({
    title: '',
    genre_id: '',
    // audio_file: '',
    description: '',
    // cover_image: '',
  });
  const { sendAuthorizedRequest } = useAuth();

  useEffect(() => {
    const prevData = {
      title: track?.title || '',
      description: track?.description || '',
      genre_id: track?.genre_id || '',
    };
    setFormData({
      ...formData,
      ...prevData,
    });
  }, [track]);

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
  const handleUpdate = async e => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Send a POST request to the selected playlist endpoint with the track_id
    const subformData = new FormData();

    // Append form fields to the FormData object
    // console.log(Boolean(formData.title));
    // if (formData.title) {
    subformData.append('title', formData.title);
    // }
    // if (formData.genre_id) {
    subformData.append('genre_id', formData.genre_id);
    // }
    // if (formData.description) {
    subformData.append('description', formData.description);
    // }

    // Append files to the FormData object
    if (formData.audio_file) {
      subformData.append('audio_file', formData.audio_file);
    }
    if (formData.cover_image) {
      subformData.append('cover_image', formData.cover_image);
    }
    console.log(subformData);
    // await sendAuthorizedRequest(`/tracks/${track.id}`, 'put', subformData, {
    //   'Content-Type': 'multipart/form-data',
    // });
    onClose();
    // window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleUpdate}>
          <ModalHeader>Update Track</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="title">
                <FormLabel>Update Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormControl>
              <FormControl id="genre_id">
                <FormLabel>Update the Genre</FormLabel>
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
              <FormControl id="audio_file">
                <FormLabel>Update Track</FormLabel>
                <Input
                  name="audio_file"
                  // value={formData.audio_file}
                  onChange={handleInputChange}
                  type="file"
                  accept=".mp3"
                />
              </FormControl>
              <FormControl id="cover_image">
                <FormLabel>Update Cover Image</FormLabel>
                <Input
                  name="cover_image"
                  // value={formData.cover_image}
                  onChange={handleInputChange}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Update Description</FormLabel>
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
              Update
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

export default UpdateTrack;
