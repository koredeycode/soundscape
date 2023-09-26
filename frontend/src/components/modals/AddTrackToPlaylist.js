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
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';

function AddTrackToPlaylist({ isOpen, onClose, track_id }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const { sendAuthorizedRequest } = useAuth();
  const toast = useToast();

  useEffect(() => {
    // Fetch user's playlists from your API and update the playlists state
    // Replace this with an actual API call
    const fetchPlaylists = async () => {
      const data = await sendAuthorizedRequest('/user_playlists', 'get', {});
      setPlaylists(data);
    };

    fetchPlaylists();
  }, []);

  const handleSubmit = async () => {
    if (!selectedPlaylist) {
      toast({
        title: 'Please select a playlist',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Send a POST request to the selected playlist endpoint with the track_id
    await sendAuthorizedRequest(`/user_playlists/${selectedPlaylist}`, 'post', {
      track_id,
    });
    onClose()
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add to Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text>Select a playlist:</Text>
            <Select
              placeholder="Select a playlist"
              value={selectedPlaylist}
              onChange={e => setSelectedPlaylist(e.target.value)}
            >
              {playlists.map(playlist => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.title}
                </option>
              ))}
            </Select>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Add
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddTrackToPlaylist;
