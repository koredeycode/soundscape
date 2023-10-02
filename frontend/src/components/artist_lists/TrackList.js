import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { FaPlay, FaEdit } from 'react-icons/fa';
import { MdDelete, MdEdit, MdOutlineDelete } from 'react-icons/md';
import { useAudioPlayerContext } from '../../hooks/AudioPlayerContext';
import { useAuth } from '../../hooks/AuthContext';
import DeleteTrack from '../modals/Artist/DeleteTrack';
import UpdateTrack from '../modals/Artist/UpdateTrack';

const deleteIcon = <Icon as={MdOutlineDelete} w="1.5em" h="1.5em" />;
const editIcon = <Icon as={FaEdit} w="1.5em" h="1.5em" />;

export default function TrackList({ tracks }) {
  const [selectedTrack, setSelectedTrack] = useState();

  const {
    isOpen: isDeleteTrackOpen,
    onOpen: onDeleteTrackOpen,
    onClose: onDeleteTrackClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateTrackOpen,
    onOpen: onUpdateTrackOpen,
    onClose: onUpdateTrackClose,
  } = useDisclosure();
  const { sendAuthorizedRequest, showToast } = useAuth();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await sendAuthorizedRequest('/genres', 'get', {});
        setGenres(data);
      } catch (error) {
        showToast('Error', error.response.data?.error, 'error');
      }
    })();
  }, []);

  return (
    <>
      <VStack align="start" spacing={4}>
        {tracks.map((track, idx) => (
          <>
            <TrackItem
              key={idx}
              track={track}
              index={idx}
              tracks={tracks}
              onDeleteTrackOpen={onDeleteTrackOpen}
              onUpdateTrackOpen={onUpdateTrackOpen}
              setSelectedTrack={setSelectedTrack}
            />
          </>
        ))}
      </VStack>
      <DeleteTrack
        isOpen={isDeleteTrackOpen}
        onClose={onDeleteTrackClose}
        track={selectedTrack}
      />
      <UpdateTrack
        isOpen={isUpdateTrackOpen}
        onClose={onUpdateTrackClose}
        track={selectedTrack}
        genres={genres}
      />
    </>
  );
}

function TrackItem({
  track,
  index,
  tracks,
  onDeleteTrackOpen,
  onUpdateTrackOpen,
  setSelectedTrack,
  playlist_id,
}) {
  const { handleAddingNextTrack, handlePlayingATrack } =
    useAudioPlayerContext();
  return (
    <HStack w="100%" justify="space-between">
      <Text>{`${index + 1}. ${track.title}`}</Text>
      <HStack spacing={2}>
        <IconButton
          icon={editIcon}
          aria-label={`Update ${track.title}`}
          size="sm"
          variant="ghost"
          onClick={() => {
            setSelectedTrack(track);
            onUpdateTrackOpen();
          }}
        />
        <IconButton
          icon={deleteIcon}
          aria-label={`Delete ${track.title}`}
          size="sm"
          variant="ghost"
          color="red"
          onClick={() => {
            setSelectedTrack(track);
            onDeleteTrackOpen();
          }}
        />
      </HStack>
      <HStack spacing={2}>
        <IconButton
          icon={<FaPlay />}
          aria-label={`Play ${track.title}`}
          size="sm"
          variant="ghost"
          onClick={() => {
            handlePlayingATrack(tracks, index);
          }}
        />
      </HStack>
    </HStack>
  );
}
