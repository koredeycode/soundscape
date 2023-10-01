import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaPlay, FaEllipsisV } from 'react-icons/fa';
import { useAudioPlayerContext } from '../../hooks/AudioPlayerContext';
import AddToTrackPlaylist from '../modals/AddTrackToPlaylist';
import RemoveTrackFromPlaylist from '../modals/RemoveTrackFromPlaylist';
import { Link } from 'react-router-dom';

export default function TrackList({ tracks, playlist_id }) {
  const [playlistItemId, setPlaylistItemId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack align="start" spacing={4}>
        {tracks.map((track, idx) => (
          <TrackItem
            key={idx}
            track={track}
            index={idx}
            tracks={tracks}
            onOpen={onOpen}
            setPlaylistItemId={setPlaylistItemId}
            playlist_id={playlist_id}
          />
        ))}
      </VStack>
      {playlist_id ? (
        <RemoveTrackFromPlaylist
          isOpen={isOpen}
          onClose={onClose}
          track_id={playlistItemId}
          playlist_id={playlist_id}
        />
      ) : (
        <AddToTrackPlaylist
          isOpen={isOpen}
          onClose={onClose}
          track_id={playlistItemId}
        />
      )}
    </>
  );
}

function TrackItem({
  track,
  index,
  tracks,
  onOpen,
  setPlaylistItemId,
  playlist_id,
}) {
  const { handleAddingNextTrack, handlePlayingATrack } =
    useAudioPlayerContext();
  return (
    <HStack w="100%" justify="space-between">
      <Text>{`${index + 1}.`}</Text>
      <ChakraLink
        as={Link}
        to={`/tracks/${track.id}`}
        color="black"
      >
        {track.title}
      </ChakraLink>
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
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisV />}
            aria-label="Options"
            size="sm"
            variant="ghost"
          />
          <MenuList>
            <MenuItem
              onClick={() => {
                handleAddingNextTrack(track);
              }}
            >
              Play Next
            </MenuItem>
            {playlist_id ? (
              <MenuItem
                onClick={() => {
                  setPlaylistItemId(track.id);
                  onOpen();
                }}
              >
                Remove Track From Playlist
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  setPlaylistItemId(track.id);
                  onOpen();
                }}
              >
                Add To A Playlist
              </MenuItem>
            )}

            {/* Add more menu items as needed */}
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}
