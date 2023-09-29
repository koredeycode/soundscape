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
  Box,
  Stack,
  useColorModeValue,
  Image,
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
  MdLoop,
} from 'react-icons/md';
import { useAudioPlayerContext } from '../../hooks/AudioPlayerContext';
// Icons for play modes
const playModeIcons = {
  single: MdRepeat,
  loop: MdLoop,
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
    handlePlayingATrack,
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
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      pos="fixed"
      bottom={{ base: '65px', md: '0px' }}
      p="5"
      w="100%"
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        gap={{ base: '0.5rem', md: '3rem' }}
      >
        <Stack
          direction="row"
          flexGrow="1"
          gap="1rem"
          display={{ base: 'none', md: 'flex' }}
        >
          <Square>
            <Image
              src={queue[currentIndex].cover_image}
              alt="Music Cover"
              style={{ width: '50px', height: '50px' }}
              objectFit="cover"
            />
          </Square>
          <VStack alignItems="flex-start" gap="0rem">
            <Text fontSize="sm" fontWeight="bold">
              {queue[currentIndex].title}
            </Text>
            <Text fontSize="sm" fontWeight="thin">
              {queue[currentIndex].artist.name}
            </Text>
            <Text fontSize="sm" fontWeight="thin">
              Ft other artists name
            </Text>
          </VStack>
        </Stack>
        <VStack flexGrow="7">
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
          <HStack>
            <Icon
              as={playModeIcons[playMode]}
              aria-label="Toggle Play Mode"
              onClick={togglePlayMode}
              w="1.5em"
              h="1.5em"
              cursor="pointer"
            />
            {/* Previous Button */}
            <Icon
              as={MdSkipPrevious}
              aria-label="Previous"
              onClick={handlePreviousClick}
              w="1.5em"
              h="1.5em"
              cursor="pointer"
            />
            {/* Play and Pause Buttons */}
            <Icon
              as={isPlaying ? MdPauseCircleFilled : MdPlayCircleFilled}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={handlePlayPauseClick}
              w="2.5em"
              h="2.5em"
              cursor="pointer"
            />
            {/* Next Button */}
            <Icon
              as={MdSkipNext}
              aria-label="Next"
              onClick={handleNextClick}
              w="1.5em"
              h="1.5em"
              cursor="pointer"
            />
            <Icon
              as={MdQueueMusic}
              aria-label="Queue"
              onClick={() => setShowQueue(!showQueue)}
              w="1.5em"
              h="1.5em"
              cursor="pointer"
            />
          </HStack>
        </VStack>
        <HStack flexGrow="2" display={{ base: 'none', md: 'flex' }}>
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
            cursor="pointer"
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
        </HStack>
      </Stack>
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
              {queue.map((track, index, tracks) => (
                <ListItem
                  key={index}
                  bg={currentIndex === index ? 'gray.100' : 'white'}
                  mb="2"
                  p="2"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>{track.title}</Text>
                  <Icon
                    as={MdPlayCircleFilled}
                    aria-label={'Play'}
                    w="1.5em"
                    h="1.5em"
                    cursor="pointer"
                    onClick={() => {
                      handlePlayingATrack(tracks, index);
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default MusicPlayer;
