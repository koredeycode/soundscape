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

function RemoveTrackFromPlaylist({ isOpen, onClose, track_id, playlist_id }) {
  //   const [playlists, setPlaylists] = useState([]);
  //   const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const { sendAuthorizedRequest } = useAuth();
  const toast = useToast();

  //   useEffect(() => {
  //     // Fetch user's playlists from your API and update the playlists state
  //     // Replace this with an actual API call
  //     const fetchPlaylists = async () => {
  //       const data = await sendAuthorizedRequest('/user_playlists', 'get', {});
  //       setPlaylists(data);
  //     };

  //     fetchPlaylists();
  //   }, []);

  const handleDelete = async () => {
    // Send a POST request to the selected playlist endpoint with the track_id
    await sendAuthorizedRequest(`/user_playlists/${playlist_id}`, 'delete', {
      track_id,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove Track from Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to remove track from current playlist:
          </Text>
          <Text>This action cannot be undone</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RemoveTrackFromPlaylist;
