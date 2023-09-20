import React, { useState, useEffect, useRef } from 'react';
import {
  HStack,
  VStack,
  Text,
  Slider,
  IconButton,
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
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaStepBackward,
  FaStepForward,
  FaRedo,
  FaSquare,
  FaRandom,
  FaListUl,
} from 'react-icons/fa';
// Icons for play modes
const playModeIcons = {
  single: <FaSquare />,
  loop: <FaRedo />,
  shuffleOnce: <FaRandom />,
};

// Icon for queue
const queueIcon = <FaListUl />;

function MusicPlayer({ tracks }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playMode, setPlayMode] = useState('single'); // 'single', 'loop', 'shuffleOnce'
  const [showQueue, setShowQueue] = useState(false);
  const [volume, setVolume] = useState(1); // Initial volume is 1 (max)

  const audioRef = useRef(new Audio(tracks[currentAudioIndex].audio_file));

  useEffect(() => {
    audioRef.current.src = tracks[currentAudioIndex].audio_file;
    const audio = audioRef.current;
    const handleAudioEnd = () => {
      if (currentAudioIndex < tracks.length - 1) {
        const nextIndex = currentAudioIndex + 1;
        setCurrentAudioIndex(nextIndex);
      } else {
        setCurrentAudioIndex(0);
      }
    };
    audio.addEventListener('ended', handleAudioEnd);
    return () => {
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [currentAudioIndex, tracks]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setAudioProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleCanPlayThrough = () => {
      if (isPlaying) {
        audio.play();
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [isPlaying]);

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const togglePlayMode = () => {
    switch (playMode) {
      case 'single':
        setPlayMode('loop');
        break;
      case 'loop':
        setPlayMode('shuffleOnce');
        break;
      case 'shuffleOnce':
        setPlayMode('single');
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    if (currentAudioIndex < tracks.length - 1) {
      const nextIndex = currentAudioIndex + 1;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentAudioIndex(nextIndex);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentAudioIndex(0);
    }
  };

  const handlePreviousClick = () => {
    if (currentAudioIndex > 0) {
      const prevIndex = currentAudioIndex - 1;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentAudioIndex(prevIndex);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentAudioIndex(tracks.length - 1);
    }
  };

  const handleSliderChange = value => {
    const newTime = (value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setAudioProgress(value);
  };
  function formatTime(timeInSeconds) {
    const minutes = timeInSeconds ? Math.floor(timeInSeconds / 60) : 0;
    const seconds = timeInSeconds ? Math.floor(timeInSeconds % 60) : 0;
    const formattedMinutes = String(minutes);
    const formattedSeconds = String(seconds);
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <HStack gap="6" m="1" justifyContent="space-evenly">
      <VStack>
        {/* Music Title */}
        <Text fontSize="sm" fontWeight="bold">
          {tracks[currentAudioIndex].title}
        </Text>
        {/* Music Cover Image */}
        <Square>
          <img
            src={tracks[currentAudioIndex].cover_image}
            alt="Music Cover"
            style={{ width: '50px', height: '50px' }}
          />
        </Square>
      </VStack>
      <VStack gap="4">
        <HStack>
          <Text>{formatTime(audioRef.current.currentTime)}</Text>
          <Text>{formatTime(audioRef.current.duration)}</Text>
        </HStack>
        <Slider
          aria-label="slider-ex-1"
          value={audioProgress ? audioProgress : 0}
          colorScheme="gray"
          onChange={handleSliderChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <HStack>
          {/* Previous Button */}
          <IconButton
            icon={<FaStepBackward />}
            size="sm"
            aria-label="Previous"
            onClick={handlePreviousClick}
          />
          {/* Play and Pause Buttons */}
          <IconButton
            icon={isPlaying ? <FaPause /> : <FaPlay />}
            size="sm"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={handlePlayPauseClick}
          />
          {/* Next Button */}
          <IconButton
            icon={<FaStepForward />}
            size="sm"
            aria-label="Next"
            onClick={handleNextClick}
          />
          {/* Volume Icons */}
          <IconButton
            icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            size="sm"
            aria-label="Mute"
            onClick={() => {
              audioRef.current.muted = !isMuted;
              setIsMuted(!isMuted);
            }}
          />
          <IconButton
            icon={queueIcon}
            size="sm"
            aria-label="Queue"
            onClick={() => setShowQueue(!showQueue)}
          />
          <IconButton
            icon={playModeIcons[playMode]}
            size="sm"
            aria-label="Toggle Play Mode"
            onClick={togglePlayMode}
          />
        </HStack>
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
          }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </VStack>
      <HStack>
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
                {tracks.map((track, index) => (
                  <ListItem key={index}>{track.title}</ListItem>
                ))}
              </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>
    </HStack>
  );
}

export default MusicPlayer;
