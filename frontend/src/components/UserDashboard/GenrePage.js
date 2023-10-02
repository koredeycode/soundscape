import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import TrackList from '../lists/TrackList';
import { Text } from '@chakra-ui/react';

const GenrePage = () => {
  const { genre_id } = useParams();
  const { sendAuthorizedRequest, showToast } = useAuth();
  const [genreData, setGenreData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await sendAuthorizedRequest(
          `/genres/${genre_id}/tracks`,
          'get',
          {}
        );
        setGenreData(data);
        console.log(data);
      } catch (error) {
        showToast('Error', error.response.data?.error, 'error');
      }
    })();
  }, []);

  return (
    <>
      <Text>{genreData.name}</Text>
      <TrackList tracks={genreData.tracks ?? []} />
    </>
  );
};

export default GenrePage;
