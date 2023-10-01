import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Image } from '@chakra-ui/react';
import TrackList from '../lists/TrackList';
import { useAuth } from '../../hooks/AuthContext';

function TrackPage() {
  const { sendAuthorizedRequest } = useAuth();
  const [trackData, setTrackData] = useState(null);
  const { track_id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest(
        `/tracks/${track_id}`,
        'get',
        {}
      );
      console.log(data);
      setTrackData(data);
    })();
  }, []);
  return (
    trackData && (
      <Box p={4}>
        <Heading size="lg" mb={4}>
          {trackData.title}
        </Heading>
        <Image
          src={trackData.cover_image}
          alt="trackCover Cover"
          mb={4}
          w="200px"
          h="200px"
          objectFit="cover"
        />
        <TrackList tracks={[trackData]} />
      </Box>
    )
  );
}
export default TrackPage;
