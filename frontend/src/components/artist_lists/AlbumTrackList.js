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
import DeleteAlbumTrack from '../modals/Artist/DeleteAlbumTrack';
import UpdateAlbumTrack from '../modals/Artist/UpdateAlbumTrack';
import CreateAlbumTrack from '../modals/Artist/CreateAlbumTrack';

const deleteIcon = <Icon as={MdOutlineDelete} w="1.5em" h="1.5em" />;
const editIcon = <Icon as={FaEdit} w="1.5em" h="1.5em" />;

export default function AlbumTrackList({ tracks }) {
  const [selectedTrack, setSelectedTrack] = useState();

  const {
    isOpen: isDeleteAlbumTrackOpen,
    onOpen: onDeleteAlbumTrackOpen,
    onClose: onDeleteAlbumTrackClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateAlbumTrackOpen,
    onOpen: onUpdateAlbumTrackOpen,
    onClose: onUpdateAlbumTrackClose,
  } = useDisclosure();
  const {
    isOpen: isCreateAlbumTrackOpen,
    onOpen: onCreateAlbumTrackOpen,
    onClose: onCreateAlbumTrackClose,
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
        <Button colorScheme="teal" onClick={onCreateAlbumTrackOpen}>
          Create New Track
        </Button>
        {tracks.map((track, idx) => (
          <>
            <TrackItem
              key={idx}
              track={track}
              index={idx}
              tracks={tracks}
              onDeleteAlbumTrackOpen={onDeleteAlbumTrackOpen}
              onUpdateAlbumTrackOpen={onUpdateAlbumTrackOpen}
              setSelectedTrack={setSelectedTrack}
            />
          </>
        ))}
      </VStack>
      <CreateAlbumTrack
        isOpen={isCreateAlbumTrackOpen}
        onClose={onCreateAlbumTrackClose}
        genres={genres}
      />
      <DeleteAlbumTrack
        isOpen={isDeleteAlbumTrackOpen}
        onClose={onDeleteAlbumTrackClose}
        track={selectedTrack}
      />
      <UpdateAlbumTrack
        isOpen={isUpdateAlbumTrackOpen}
        onClose={onUpdateAlbumTrackClose}
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
  onDeleteAlbumTrackOpen,
  onUpdateAlbumTrackOpen,
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
            onUpdateAlbumTrackOpen();
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
            onDeleteAlbumTrackOpen();
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
