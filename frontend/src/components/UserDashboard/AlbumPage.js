import React, { useEffect, useState } from 'react';
import { Box, Heading, Image, Text, Flex } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import TrackList from '../lists/TrackList';
import { useParams } from 'react-router-dom';

function AlbumPage() {
  const { sendAuthorizedRequest, showToast } = useAuth();
  const [albumData, setAlbumData] = useState(null);
  const { album_id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await sendAuthorizedRequest(
          `/albums/${album_id}`,
          'get',
          {}
        );
        setAlbumData(data);
      } catch (error) {
        showToast('Error', error.response.data?.error, 'error');
      }
    })();
  }, []);
  return (
    albumData && (
      <>
        <Flex p={4} gap={4}>
          <Image
            src={albumData.cover_image}
            alt="Album Cover"
            mb={4}
            w="150px"
            h="150px"
            objectFit="cover"
          />
          <Box>
            <Heading size="lg" mb={4}>
              {albumData.title}
            </Heading>
            <Text>{albumData.description}</Text>
          </Box>
        </Flex>
        <TrackList tracks={albumData.tracks} />
      </>
    )
  );
}

export default AlbumPage;
