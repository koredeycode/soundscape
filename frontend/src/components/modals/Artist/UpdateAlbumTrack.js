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
import { useParams } from 'react-router-dom';

function UpdateAlbumTrack({ isOpen, onClose, track, genres }) {
  const [updateFormData, setUpdateFormData] = useState({
    title: '',
    genre_id: '',
    // audio_file: '',
    description: '',
    // cover_image: '',
  });
  const { sendAuthorizedRequest } = useAuth();
  const { album_id } = useParams();

  useEffect(() => {
    const prevData = {
      title: track?.title || '',
      description: track?.description || '',
      genre_id: track?.genre_id || '',
    };
    setUpdateFormData({
      ...updateFormData,
      ...prevData,
    });
  }, [track]);

  const handleInputChange = e => {
    const { name, value, type } = e.target;
    // Handle file inputs separately
    if (type === 'file') {
      setUpdateFormData({
        ...updateFormData,
        [name]: e.target.files[0],
      });
    } else {
      setUpdateFormData({
        ...updateFormData,
        [name]: value,
      });
    }
  };
  const handleUpdate = async e => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Send a POST request to the selected playlist endpoint with the track_id
    const subformData = new FormData();

    console.log(updateFormData);
    // Append form fields to the FormData object
    // console.log(Boolean(formData.title));
    // if (formData.title) {
    subformData.append('title', updateFormData.title);
    console.log(subformData);
    // }
    // if (formData.genre_id) {
    subformData.append('genre_id', updateFormData.genre_id);
    // }
    // if (formData.description) {
    subformData.append('description', updateFormData.description);
    // }

    // Append files to the FormData object
    if (updateFormData.audio_file) {
      subformData.append('audio_file', updateFormData.audio_file);
    }

    console.log(subformData);
    await sendAuthorizedRequest(
      `/albums/${album_id}/tracks/${track.id}`,
      'post',
      subformData,
      {
        'Content-Type': 'multipart/form-data',
      }
    );
    onClose();
    // window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form id="updateform" onSubmit={handleUpdate}>
          <ModalHeader>Update Track</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="update_title">
                <FormLabel>Update Title</FormLabel>
                <Input
                  name="title"
                  value={updateFormData.title}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormControl>
              <FormControl id="update_genre_id">
                <FormLabel>Update the Genre</FormLabel>
                <Select
                  placeholder="Select a genre"
                  name="genre_id"
                  value={updateFormData.genre_id}
                  onChange={handleInputChange}
                >
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="update_audio_file">
                <FormLabel>Update Track</FormLabel>
                <Input
                  name="audio_file"
                  onChange={handleInputChange}
                  type="file"
                  accept=".mp3"
                />
              </FormControl>
              <FormControl id="update_description">
                <FormLabel>Update Description</FormLabel>
                <Textarea
                  name="description"
                  value={updateFormData.description}
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

export default UpdateAlbumTrack;
