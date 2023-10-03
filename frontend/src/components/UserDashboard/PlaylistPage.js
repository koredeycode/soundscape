import React, { useEffect, useState } from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import TrackList from '../lists/TrackList';
import { useParams } from 'react-router-dom';

function PlaylistPage() {
  const { sendAuthorizedRequest, showToast } = useAuth();
  const [playlistData, setPlayListData] = useState(null);
  const { playlist_id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await sendAuthorizedRequest(
          `/user_playlists/${playlist_id}`,
          'get',
          {}
        );

        setPlayListData(data);
      } catch (error) {
        showToast('Error', error.response.data?.error, 'error');
      }
    })();
  }, []);
  return (
    playlistData && (
      <Box p={4}>
        <Heading size="lg" mb={4}>
          {playlistData.title}
        </Heading>
        <TrackList tracks={playlistData.tracks} playlist_id={playlist_id} />
      </Box>
    )
  );
}

export default PlaylistPage;
