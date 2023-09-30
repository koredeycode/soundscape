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
} from '@chakra-ui/react';
import { useAuth } from '../../../hooks/AuthContext';

const EditArtistProfile = ({ artist, isOpen, onClose }) => {
  console.log('artist in modal', artist);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    // profile_image: null,
  });
  const { sendAuthorizedRequest } = useAuth();

  useEffect(() => {
    const prevData = {
      name: artist?.name || '',
      bio: artist?.bio || '',
    };
    setFormData({
      ...formData,
      ...prevData,
    });
  }, [artist]);

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

  const handleEdit = async e => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Send a POST request to the selected playlist endpoint with the track_id
    const subformData = new FormData();

    console.log(formData);
    // Append form fields to the FormData object
    subformData.append('name', formData.name);
    subformData.append('bio', formData.bio);

    if (formData.profile_image) {
      subformData.append('profile_image', formData.profile_image);
    }
    console.log(subformData);
    await sendAuthorizedRequest(`/artists/${artist.id}`, 'post', subformData, {
      'Content-Type': 'multipart/form-data',
    });
    onClose();
    // window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form id="editprofileform" onSubmit={handleEdit}>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Edit name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormControl>
              <FormControl id="profile_image">
                <FormLabel>Edit Profile Image</FormLabel>
                <Input
                  name="profile_image"
                  onChange={handleInputChange}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                />
              </FormControl>
              <FormControl id="bio">
                <FormLabel>Edit Bio</FormLabel>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                ></Textarea>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="teal">
              Edit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditArtistProfile;
