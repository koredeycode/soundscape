import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';

function UploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audioFile: null,
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = e => {
    const audioFile = e.target.files[0];
    setFormData({ ...formData, audioFile });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Validate audio file format (MP3)
    if (formData.audioFile && formData.audioFile.type !== 'audio/mp3') {
      alert('Please upload an MP3 audio file.');
      return;
    }

    // Simulate sending data to an API endpoint (replace with actual API call)
    console.log('Uploading:', formData);
    // Reset form data
    setFormData({ title: '', description: '', audioFile: null });
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Upload Track
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Audio File (MP3)</FormLabel>
          <Input
            type="file"
            name="audioFile"
            accept="audio/mp3"
            onChange={handleFileChange}
            required
          />
          <FormHelperText>Upload an MP3 audio file.</FormHelperText>
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Upload
        </Button>
      </form>
    </Box>
  );
}

export default UploadForm;
