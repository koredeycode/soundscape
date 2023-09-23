import React, { useState, useEffect, useRef } from 'react';
import {
  HStack,
  VStack,
  Text,
  Slider,
  Icon,
  Square,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
} from '@chakra-ui/react';
import {
  MdQueueMusic,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdVolumeOff,
  MdVolumeUp,
  MdSkipPrevious,
  MdSkipNext,
  MdShuffle,
  MdRepeat,
  MdReplay,
} from 'react-icons/md';
import { useAudioPlayerContext } from '../hooks/AudioPlayerContext';
// Icons for play modes
const playModeIcons = {
  single: MdReplay,
  loop: MdRepeat,
  shuffle: MdShuffle,
};

function MusicPlayer() {
  const {
    queue,
    setQueue,
    isPlaying,
    playMode,
    // playModeIcons,
    togglePlayMode,
    handlePreviousClick,
    handlePlayPauseClick,
    handleNextClick,
    setShowQueue,
    audioRef,
    audioProgress,
    isMuted,
    volume,
    setVolume,
    currentIndex,
    showQueue,
    formatTime,
    setIsMuted,
    handleSliderChange,
  } = useAudioPlayerContext();
  return (
    queue.length > 0 && (
      <HStack justifyContent="space-between" gap="3rem">
        <HStack flexGrow="1" gap="1rem">
          <Square>
            <img
              src={queue[currentIndex].cover_image}
              alt="Music Cover"
              style={{ width: '50px', height: '50px' }}
            />
          </Square>
          <VStack alignItems="flex-start" gap="0rem">
            <Text fontSize="sm" fontWeight="bold">
              {queue[currentIndex].title}
            </Text>
            <Text fontSize="sm" fontWeight="thin">
              {queue[currentIndex].artist}
            </Text>
            <Text fontSize="sm" fontWeight="thin">
              Ft other artists name
            </Text>
          </VStack>
        </HStack>
        <VStack flexGrow="7">
          <HStack>
            <Icon
              as={playModeIcons[playMode]}
              aria-label="Toggle Play Mode"
              onClick={togglePlayMode}
              w="1.5em"
              h="1.5em"
            />
            {/* Previous Button */}
            <Icon
              as={MdSkipPrevious}
              aria-label="Previous"
              onClick={handlePreviousClick}
              w="1.5em"
              h="1.5em"
            />
            {/* Play and Pause Buttons */}
            <Icon
              as={isPlaying ? MdPauseCircleFilled : MdPlayCircleFilled}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={handlePlayPauseClick}
              w="2.5em"
              h="2.5em"
            />
            {/* Next Button */}
            <Icon
              as={MdSkipNext}
              aria-label="Next"
              onClick={handleNextClick}
              w="1.5em"
              h="1.5em"
            />
            <Icon
              as={MdQueueMusic}
              aria-label="Queue"
              onClick={() => setShowQueue(!showQueue)}
              w="1.5em"
              h="1.5em"
            />
          </HStack>
          <HStack w="100%">
            <Text>{formatTime(audioRef.current.currentTime)}</Text>
            <Slider
              aria-label="slider-ex-1"
              value={audioProgress ? audioProgress : 0}
              colorScheme="gray"
              onChange={handleSliderChange}
              focusThumbOnChange={false}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>{formatTime(audioRef.current.duration)}</Text>
          </HStack>
        </VStack>
        <HStack flexGrow="2">
          {/* Volume Icons */}

          <Icon
            as={isMuted ? MdVolumeOff : MdVolumeUp}
            aria-label="Mute"
            onClick={() => {
              audioRef.current.muted = !isMuted;
              if (isMuted) {
                setVolume(0.5);
              } else {
                setVolume(0);
              }
              setIsMuted(!isMuted);
            }}
            w="1.5em"
            h="1.5em"
          />
          <Slider
            aria-label="volume-slider"
            value={volume}
            min={0}
            max={1}
            step={0.1}
            colorScheme="gray"
            onChange={value => {
              audioRef.current.volume = value;
              setVolume(value);
              if (value <= 0) {
                setIsMuted(true);
              } else if (value > 0 && isMuted) {
                setIsMuted(false);
              }
            }}
            focusThumbOnChange={false}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Drawer
            placement="right"
            isOpen={showQueue}
            onClose={() => setShowQueue(false)}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Queue</DrawerHeader>
              <DrawerBody>
                <List>
                  {queue.map((track, index) => (
                    <ListItem key={index}>{track.title}</ListItem>
                  ))}
                </List>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </HStack>
      </HStack>
    )
  );
}

export default MusicPlayer;
