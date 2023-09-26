import React, { useEffect, useState } from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';
import { useAuth } from '../../hooks/AuthContext';
import TrackList from '../lists/TrackList';

function PlaylistPage({ playlist_id }) {
  const { sendAuthorizedRequest } = useAuth();
  const [playlistData, setPlayListData] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest(
        `/user_playlists/${playlist_id}`,
        'get',
        {}
      );
      console.log(data);
      setPlayListData(data);
    })();
  }, []);
  return (
    playlistData && (
      <Box p={4}>
        <Heading size="lg" mb={4}>
          {playlistData.title}
        </Heading>
        <Image src={playlistData.cover_image} alt="Album Cover" mb={4} />
        <TrackList tracks={playlistData.tracks} playlist_id={playlist_id} />
      </Box>
    )
  );
}

export default PlaylistPage;
