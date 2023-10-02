import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Box,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateArtistProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    // profile_image: null
  });
  const { sendAuthorizedRequest, showToast } = useAuth();
  const navigate = useNavigate();

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
    subformData.append('name', formData.name);
    subformData.append('bio', formData.bio);

    if (formData.profile_image) {
      subformData.append('profile_image', formData.profile_image);
    }
    try {
      const response = await sendAuthorizedRequest(
        `/artists`,
        'post',
        subformData,
        {
          'Content-Type': 'multipart/form-data',
        }
      );
      showToast(
        'Success',
        'Artist profile created, refresh your browser',
        'success'
      );
      navigate('/artist-profile');
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <form id="editprofileform" onSubmit={handleCreate}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Artist name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              type="text"
            />
          </FormControl>
          <FormControl id="profile_image">
            <FormLabel>Artist Profile Image</FormLabel>
            <Input
              name="profile_image"
              onChange={handleInputChange}
              type="file"
              accept=".png, .jpg, .jpeg"
            />
          </FormControl>
          <FormControl id="bio">
            <FormLabel>Artist Bio</FormLabel>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            ></Textarea>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Create Artist Profile
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateArtistProfile;
