import React from 'react';
import TrackList from '../lists/TrackList';
import { useAudioPlayerContext } from '../../hooks/AudioPlayerContext';
import { Text } from '@chakra-ui/react';

const RecentPlay = () => {
  const { queue } = useAudioPlayerContext();
  return (
    <>
      <Text>RecentPlay</Text>
      <TrackList tracks={queue} />
    </>
  );
};

export default RecentPlay;
