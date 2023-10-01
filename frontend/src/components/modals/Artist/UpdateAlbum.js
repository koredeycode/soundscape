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
  Textarea,
} from '@chakra-ui/react';
import { useAuth } from '../../../hooks/AuthContext';

function UpdateAlbum({ isOpen, onClose, album }) {
  const [updateFormData, setUpdateFormData] = useState({
    title: '',
    // audio_file: '',
    description: '',
    // cover_image: '',
  });

  const { sendAuthorizedRequest } = useAuth();

  useEffect(() => {
    const prevData = {
      title: album?.title || '',
      description: album?.description || '',
    };
    setUpdateFormData({
      ...updateFormData,
      ...prevData,
    });
  }, [album]);

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
    // }
    // if (formData.description) {
    subformData.append('description', updateFormData.description);
    // }

    // Append files to the FormData object

    if (updateFormData.cover_image) {
      subformData.append('cover_image', updateFormData.cover_image);
    }
    console.log(subformData);
    await sendAuthorizedRequest(`/albums/${album.id}`, 'post', subformData, {
      'Content-Type': 'multipart/form-data',
    });
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
                <FormLabel>Update Album Title</FormLabel>
                <Input
                  name="title"
                  value={updateFormData.title}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormControl>
              <FormControl id="update_cover_image">
                <FormLabel>Update Album Cover Image</FormLabel>
                <Input
                  name="cover_image"
                  onChange={handleInputChange}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                />
              </FormControl>
              <FormControl id="update_description">
                <FormLabel>Update Album Description</FormLabel>
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

export default UpdateAlbum;
