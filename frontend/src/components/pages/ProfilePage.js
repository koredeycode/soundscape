import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Textarea,
  Alert,
  AlertIcon,
  CloseButton,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';

function ProfilePage() {
  const { currentUser, sendAuthorizedRequest } = useAuth();
  // Mock user profile data (replace with actual user data from your API)
  const initialProfile = {
    first_name: currentUser?.first_name,
    last_name: currentUser?.last_name,
    username: currentUser?.username,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset the form fields to the current profile data
    setProfile(initialProfile);
  };

  const handleSaveClick = async () => {
    await sendAuthorizedRequest('/profile', 'put', profile);
    setUpdateSuccess(true);
    setIsEditing(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        User Profile
      </Heading>
      {updateSuccess && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Profile updated successfully.
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setUpdateSuccess(false)}
          />
        </Alert>
      )}
      <VStack align="start" spacing={4}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        {/* <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl> */}
        {isEditing ? (
          <Button colorScheme="teal" onClick={handleSaveClick}>
            Save
          </Button>
        ) : (
          <Button colorScheme="teal" onClick={handleEditClick}>
            Edit Profile
          </Button>
        )}
        {isEditing && (
          <Button variant="outline" onClick={handleCancelClick}>
            Cancel
          </Button>
        )}
      </VStack>
    </Box>
  );
}

export default ProfilePage;
