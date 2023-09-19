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
} from '@chakra-ui/react';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaStepBackward,
  FaStepForward,
} from 'react-icons/fa';

const audioUrls = [
  'https://cdn.trendybeatz.com/audio/Olamide-Life-Goes-On-(TrendyBeatz.com).mp3',
  'https://cdn.trendybeatz.com/audio/Olamide-Ft-Bnxn-Come-Alive-(TrendyBeatz.com).mp3',
  // Add more audio URLs as needed
];

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);

  const audioRef = useRef(new Audio(audioUrls[currentAudioIndex]));

  useEffect(() => {
    audioRef.current.src = audioUrls[currentAudioIndex];
  }, [currentAudioIndex]);

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextClick = () => {
    if (currentAudioIndex < audioUrls.length - 1) {
      setCurrentAudioIndex(currentAudioIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex(currentAudioIndex - 1);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      setAudioProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const handleSliderChange = value => {
    const newTime = (value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <HStack gap="6" m="1" justifyContent="space-evenly">
      <VStack>
        {/* Music Title */}
        <Text fontSize="sm" fontWeight="bold">
          Song Title
        </Text>
        {/* Music Cover Image */}
        <Square>
          <img
            src="https://via.placeholder.com/100"
            alt="Music Cover"
            style={{ width: '50px', height: '50px' }}
          />
        </Square>
      </VStack>
      <VStack gap="4">
        <Slider
          aria-label="slider-ex-1"
          defaultValue={audioProgress}
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
          <IconButton icon={<FaVolumeMute />} size="sm" aria-label="Mute" />
          <IconButton icon={<FaVolumeUp />} size="sm" aria-label="Unmute" />
          {/* Other Icons (e.g., repeat, shuffle) */}
        </HStack>
      </VStack>
    </HStack>
  );
}

export default MusicPlayer;
