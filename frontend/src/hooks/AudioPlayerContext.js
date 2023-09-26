import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const AudioPlayerContext = createContext();

export const useAudioPlayerContext = () => {
  return useContext(AudioPlayerContext);
};

const default_tracks = [
  {
    cover_image:
      'http://localhost:8000/media/images/tracks/975769f3-3b5a-4d26-abfa-06b16e3a1450',
    audio_file:
      'http://localhost:8000/media/tracks/975769f3-3b5a-4d26-abfa-06b16e3a1450',
    title: 'Trabaye',
    artist: 'Asake',
  },
];
const localStorageKey = 'audioPlayerQueue';
export const AudioPlayerProvider = ({ children }) => {
  console.log('mounting useAudioPlayer');
  let storedQueue = localStorage.getItem(localStorageKey);
  if (storedQueue) {
    storedQueue = JSON.parse(storedQueue);
  }
  const [queue, setQueue] = useState(storedQueue || default_tracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playMode, setPlayMode] = useState('loop'); // 'single', 'loop', 'shuffle'
  const [showQueue, setShowQueue] = useState(false);
  const [volume, setVolume] = useState(1); // Initial volume is 1 (max)

  // const audioRef = useRef(new Audio(queue[currentIndex].audio_file));
  const audioRef = useRef(new Audio());

  useEffect(() => {
    console.log('use effect 1');
    localStorage.setItem(localStorageKey, JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    console.log('use effect 2');
    audioRef.current.src = queue[currentIndex].audio_file;
    const audio = audioRef.current;
    console.log(audio);
    const handleAudioEnd = () => {
      if (currentIndex < queue.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
      } else {
        setCurrentIndex(0);
      }
    };
    audio.addEventListener('ended', handleAudioEnd);
    return () => {
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [currentIndex]);

  // useEffect(() => {
  //   console.log('use effect 3');
  //   const handleKeyDown = event => {
  //     if (event.code === 'Space') {
  //       if (isPlaying) {
  //         audioRef.current.pause();
  //       } else {
  //         audioRef.current.play();
  //       }
  //       setIsPlaying(!isPlaying);
  //     }
  //   };
  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [isPlaying]);

  useEffect(() => {
    console.log('use effect 4');
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

  const calculateIndexes = currentIndex => {
    let prevIndex, nxtIndex;

    if (playMode === 'shuffle') {
      // Shuffle once mode: Pick a random track different from the current one
      do {
        prevIndex = Math.floor(Math.random() * queue.length);
      } while (prevIndex === currentIndex);

      do {
        nxtIndex = Math.floor(Math.random() * queue.length);
      } while (nxtIndex === currentIndex || nxtIndex === prevIndex);
    } else {
      // Default behavior: Calculate previous and next indexes
      if (currentIndex > 0) {
        prevIndex = currentIndex - 1;
      } else if (playMode === 'loop') {
        prevIndex = queue.length - 1; // Loop to the last track in loop mode
      } else {
        prevIndex = currentIndex; // Stay on the current track in single mode
      }

      if (currentIndex < queue.length - 1) {
        nxtIndex = currentIndex + 1;
      } else if (playMode === 'loop') {
        nxtIndex = 0; // Loop back to the first track in loop mode
      } else {
        nxtIndex = currentIndex; // Stay on the current track in single mode
      }
    }
    return [prevIndex, nxtIndex];
  };

  useEffect(() => {
    console.log('use effect 5');
    // Calculate previous and next indexes based on current index
    const [prevIndex, nxtIndex] = calculateIndexes(currentIndex);
    setPreviousIndex(prevIndex);
    setNextIndex(nxtIndex);
  }, [currentIndex, playMode]);

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
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
    if (nextIndex !== null) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentIndex(nextIndex);
    }
  };

  const handlePreviousClick = () => {
    if (previousIndex !== null) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentIndex(previousIndex);
    }
  };

  const handleSliderChange = value => {
    const newTime = (value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setAudioProgress(value);
  };

  const formatTime = timeInSeconds => {
    const minutes = timeInSeconds ? Math.floor(timeInSeconds / 60) : 0;
    const seconds = timeInSeconds ? Math.floor(timeInSeconds % 60) : 0;
    const formattedMinutes = String(minutes);
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleAddingNextTrack = track => {
    console.log(track);
    const newQueue = [...queue];
    newQueue.splice(currentIndex + 1, 0, track);

    // Set the updated queue
    const [prevIndex, nxtIndex] = calculateIndexes(currentIndex + 1);
    setQueue(newQueue);
    setNextIndex(nxtIndex);
    setPreviousIndex(prevIndex);
  };

  const handlePlayingATrack = (tracks, index) => {
    setQueue(tracks);
    setCurrentIndex(index);
  };

  const contextValue = {
    queue,
    setQueue,
    isPlaying,
    playMode,
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
    handleAddingNextTrack,
    handlePlayingATrack,
    stopAudio,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
