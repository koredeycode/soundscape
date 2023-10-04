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
import { Link } from 'react-router-dom';

function AddTrackToPlaylist({ isOpen, onClose, track_id }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const { sendAuthorizedRequest, showToast } = useAuth();
  const toast = useToast();

  useEffect(() => {
    // Fetch user's playlists from your API and update the playlists state
    // Replace this with an actual API call
    const fetchPlaylists = async () => {
      try {
        const data = await sendAuthorizedRequest('/user_playlists', 'get', {});
        setPlaylists(data);
      } catch (error) {
        showToast('Error', error.response.data?.error, 'error');
      }
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
    try {
      await sendAuthorizedRequest(
        `/user_playlists/${selectedPlaylist}`,
        'post',
        {
          track_id,
        }
      );
      showToast('Success', 'Track Added to playlist', 'success');
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
    }
    // Send a POST request to the selected playlist endpoint with the track_id
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add to Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {playlists.length > 0 ? (
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
          ) : (
            <VStack>
              <Text>No Playlist found </Text>
              <Link to="/playlists">
                <Button>Create One Here</Button>
              </Link>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          {playlists.length > 0 && (
            <>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Add
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddTrackToPlaylist;
