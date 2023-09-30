import React, { useEffect, useState } from 'react';
import { Box, Heading, Image, useDisclosure, Button } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import AlbumTrackList from '../artist_lists/AlbumTrackList';
import { useParams } from 'react-router-dom';
import UpdateAlbum from '../modals/Artist/UpdateAlbum';
import DeleteAlbum from '../modals/Artist/DeleteAlbum';

export default function ArtistAlbum() {
  const { album_id } = useParams();
  const { sendAuthorizedRequest } = useAuth();
  const [albumData, setAlbumData] = useState(null);
  const {
    isOpen: isUpdateAlbumOpen,
    onOpen: onUpdateAlbumOpen,
    onClose: onUpdateAlbumClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteAlbumOpen,
    onOpen: onDeleteAlbumOpen,
    onClose: onDeleteAlbumClose,
  } = useDisclosure();

  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest(
        `/albums/${album_id}`,
        'get',
        {}
      );
      console.log(data);
      setAlbumData(data);
    })();
  }, []);

  return (
    albumData && (
      <Box p={4}>
        <Heading size="lg" mb={4}>
          {albumData.title}
        </Heading>
        <Image
          src={albumData.cover_image}
          alt="Album Cover"
          mb={4}
          w="200px"
          h="200px"
          objectFit="cover"
        />
        <Button colorScheme="teal" onClick={onUpdateAlbumOpen}>
          Update Album
        </Button>
        <Button colorScheme="teal" onClick={onDeleteAlbumOpen}>
          Delete Album
        </Button>
        <AlbumTrackList tracks={albumData.tracks} />
        <UpdateAlbum
          isOpen={isUpdateAlbumOpen}
          onClose={onUpdateAlbumClose}
          album={albumData}
        />
        <DeleteAlbum
          isOpen={isDeleteAlbumOpen}
          onClose={onDeleteAlbumClose}
          album={albumData}
        />
      </Box>
    )
  );
}
