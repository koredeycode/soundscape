import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  IconButton,
  Button,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { FaPlay, FaEllipsisV, FaEdit, FaPowerOff } from 'react-icons/fa';
import { MdDelete, MdEdit, MdOutlineDelete } from 'react-icons/md';
import { useAudioPlayerContext } from '../../hooks/AudioPlayerContext';
import { useAuth } from '../../hooks/AuthContext';
import AddToTrackPlaylist from '../modals/AddTrackToPlaylist';
import RemoveTrackFromPlaylist from '../modals/RemoveTrackFromPlaylist';
import DeleteTrack from '../modals/Artist/DeleteTrack';
import UpdateTrack from '../modals/Artist/UpdateTrack';
import CreateTrack from '../modals/Artist/CreateTrack';

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
  const {
    isOpen: isCreateTrackOpen,
    onOpen: onCreateTrackOpen,
    onClose: onCreateTrackClose,
  } = useDisclosure();
  const { sendAuthorizedRequest } = useAuth();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await sendAuthorizedRequest('/genres', 'get', {});
      console.log(data);
      setGenres(data);
    })();
  }, []);

  return (
    <>
      <VStack align="start" spacing={4}>
        <Button colorScheme="teal" onClick={onCreateTrackOpen}>
          Create New Track
        </Button>
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
      <CreateTrack
        isOpen={isCreateTrackOpen}
        onClose={onCreateTrackClose}
        genres={genres}
      />
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
