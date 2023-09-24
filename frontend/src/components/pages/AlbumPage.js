import React, { useEffect, useState } from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import TrackList from '../lists/TrackList';

function AlbumPage({ album_id }) {
  const { sendAuthorizedRequest } = useAuth();
  const [albumData, setAlbumData] = useState(null);
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
        <Image src={albumData.cover_image} alt="Album Cover" mb={4} />
        <TrackList tracks={albumData.tracks} />
      </Box>
    )
  );
}

export default AlbumPage;