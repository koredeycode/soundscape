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
  const { sendAuthorizedRequest, showToast } = useAuth();

  const handleDelete = async () => {
    try {
      await sendAuthorizedRequest(`/user_playlists/${playlist_id}`, 'delete', {
        track_id,
      });
      showToast('Success', 'Track removed from playlist', 'success');
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
    }
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
