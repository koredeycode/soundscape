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

function ProfilePage() {
  // Mock user profile data (replace with actual user data from your API)
  const initialProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    bio: 'This is my bio.',
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

  const handleSaveClick = () => {
    // Perform an API request to update the user's profile with the new data (not implemented in this example)
    // After a successful update, you can set `updateSuccess` to true
    // and optionally fetch and update the user's profile data from the API
    // For this example, we'll just set `updateSuccess` to true immediately.
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
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
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
