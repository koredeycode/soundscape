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
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';

function DeletePlaylist({ isOpen, onClose, playlist }) {
  console.log(playlist);
  const { sendAuthorizedRequest } = useAuth();
  const toast = useToast();

  const handleDelete = async () => {
    // Send a POST request to the selected playlist endpoint with the track_id
    await sendAuthorizedRequest(`/user_playlists/${playlist.id}`, 'delete', {});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete this playlist:{' '}
            <b>{playlist?.title}</b>
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

export default DeletePlaylist;
