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
import {
  MdQueueMusic,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdVolumeOff,
  MdVolumeUp,
} from 'react-icons/md';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
// Icons for play modes
const playModeIcons = {
  single: FaSquare,
  loop: FaRedo,
  shuffle: FaRandom,
};

function MusicPlayer({ tracks }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playMode, setPlayMode] = useState('loop'); // 'single', 'loop', 'shuffle'
  const [showQueue, setShowQueue] = useState(false);
  const [volume, setVolume] = useState(1); // Initial volume is 1 (max)

  const audioRef = useRef(new Audio(tracks[currentAudioIndex].audio_file));

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Space') {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);

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
        setPlayMode('shuffle');
        break;
      case 'shuffle':
        setPlayMode('single');
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    let nextIndex;

    if (playMode === 'shuffle') {
      // Shuffle once mode: Pick a random track different from the current one
      do {
        nextIndex = Math.floor(Math.random() * tracks.length);
      } while (nextIndex === currentAudioIndex);
    } else {
      // Default behavior: Increment or loop the track index
      if (currentAudioIndex < tracks.length - 1) {
        nextIndex = currentAudioIndex + 1;
      } else if (playMode === 'loop') {
        nextIndex = 0; // Loop back to the first track in loop mode
      } else {
        nextIndex = currentAudioIndex; // Stay on the current track in single mode
      }
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentAudioIndex(nextIndex);
  };

  const handlePreviousClick = () => {
    let prevIndex;

    if (playMode === 'shuffle') {
      // Shuffle once mode: Pick a random track different from the current one
      do {
        prevIndex = Math.floor(Math.random() * tracks.length);
      } while (prevIndex === currentAudioIndex);
    } else {
      // Default behavior: Decrement or loop the track index
      if (currentAudioIndex > 0) {
        prevIndex = currentAudioIndex - 1;
      } else if (playMode === 'loop') {
        prevIndex = tracks.length - 1; // Loop to the last track in loop mode
      } else {
        prevIndex = currentAudioIndex; // Stay on the current track in single mode
      }
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentAudioIndex(prevIndex);
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
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <HStack justifyContent="space-between" gap="3rem">
      <HStack flexGrow="1" gap="1rem">
        <Square>
          <img
            src={tracks[currentAudioIndex].cover_image}
            alt="Music Cover"
            style={{ width: '50px', height: '50px' }}
          />
        </Square>
        <VStack alignItems="flex-start" gap="0rem">
          <Text fontSize="sm" fontWeight="bold">
            {tracks[currentAudioIndex].title}
          </Text>
          <Text fontSize="sm" fontWeight="thin">
            Artist name
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
          />
          {/* Previous Button */}
          <Icon
            as={FaStepBackward}
            aria-label="Previous"
            onClick={handlePreviousClick}
          />
          {/* Play and Pause Buttons */}
          <Icon
            as={isPlaying ? MdPauseCircleFilled : MdPlayCircleFilled}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={handlePlayPauseClick}
          />
          {/* Next Button */}
          <Icon
            as={FaStepForward}
            aria-label="Next"
            onClick={handleNextClick}
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
          as={MdQueueMusic}
          aria-label="Queue"
          onClick={() => setShowQueue(!showQueue)}
        />
        <Icon
          as={isMuted ? MdVolumeOff : MdVolumeUp}
          aria-label="Mute"
          onClick={() => {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
          }}
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
