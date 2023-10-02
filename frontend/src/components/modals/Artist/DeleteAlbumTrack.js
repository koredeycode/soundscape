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
} from '@chakra-ui/react';
import { useAuth } from '../../../hooks/AuthContext';
import { useParams } from 'react-router-dom';

function DeleteAlbumTrack({ isOpen, onClose, track }) {
  const { sendAuthorizedRequest, showToast } = useAuth();
  const { album_id } = useParams();

  const handleDelete = async () => {
    try {
      await sendAuthorizedRequest(
        `/albums/${album_id}/tracks/${track.id}`,
        'delete',
        {}
      );
      showToast('Success', 'Track deleted from album', 'success');
    } catch (error) {
      showToast('Error', error.response.data?.error, 'error');
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Track</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete this track: <b>{track?.title}</b>
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

export default DeleteAlbumTrack;
