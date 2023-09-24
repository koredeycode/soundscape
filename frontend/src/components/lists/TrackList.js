import React, { useEffect, useState } from 'react';
import {
  VStack,
  HStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FaPlay, FaEllipsisV } from 'react-icons/fa';
import { useAudioPlayerContext } from '../../hooks/AudioPlayerContext';

export default function TrackList({ tracks }) {
  return (
    <VStack align="start" spacing={4}>
      {tracks.map((track, idx) => (
        <TrackItem key={idx} track={track} index={idx} tracks={tracks} />
      ))}
    </VStack>
  );
}

function TrackItem({ track, index, tracks }) {
  const { handleAddingNextTrack, handlePlayingATrack } =
    useAudioPlayerContext();
  return (
    <HStack w="100%" justify="space-between">
      <Text>{`${index}. ${track.title}`}</Text>
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
              PlayNext
            </MenuItem>
            <MenuItem>Add To A Playlist</MenuItem>
            {/* Add more menu items as needed */}
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}
