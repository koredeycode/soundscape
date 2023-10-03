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
    id: '1263e4dd-6003-4b96-870a-527c84eb67c1',
    title: 'Trabaye',
    slug: 'trabaye',
    description: '',
    artist: {
      id: '9896e7ff-1d19-4169-a165-052d86e7faf4',
      name: 'Lil tunny',
      bio: 'The best',
      profile_image:
        'http://localhost:8000/media/images/artists/9896e7ff-1d19-4169-a165-052d86e7faf4',
    },
    genre_id: '3b3f5771-f966-4eb3-a5cd-7e4494ca1650',
    streams: 0,
    release_date: '2023-10-03',
    cover_image:
      'http://localhost:8000/media/images/tracks/1263e4dd-6003-4b96-870a-527c84eb67c1',
    audio_file:
      'http://localhost:8000/media/tracks/1263e4dd-6003-4b96-870a-527c84eb67c1',
    featured_artists: [],
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
  const [previousIndex, setPreviousIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playMode, setPlayMode] = useState('loop'); // 'single', 'loop', 'shuffle'
  const [showQueue, setShowQueue] = useState(false);
  const [volume, setVolume] = useState(1); // Initial volume is 1 (max)
  // const [isQueueChanged, setIsQueueChanged] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(true);
  const audioRef = useRef(new Audio());

  // useEffect(() => {
  //   console.log('use effect 1');
  //   setKeepPlaying(true);
  // }, [isQueueChanged]);

  useEffect(() => {
    console.log('use effect 2');
    localStorage.setItem(localStorageKey, JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    console.log('use effect 3');
    console.log(keepPlaying);
    if (keepPlaying) {
      audioRef.current.src = queue[currentIndex].audio_file;
      const audio = audioRef.current;
      console.log(audio);
      const handleAudioEnd = () => {
        handleNextClick();
      };
      if (isPlaying) {
        audio.play();
      }
      audio.addEventListener('ended', handleAudioEnd);
      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
      };
    } else {
      setKeepPlaying(true);
    }
  }, [queue, currentIndex]);

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

  useEffect(() => {
    console.log('use effect 5');
    // Calculate previous and next indexes based on current index
    const [prevIndex, nxtIndex] = calculateIndexes(currentIndex);
    setPreviousIndex(prevIndex);
    setNextIndex(nxtIndex);
  }, [currentIndex, playMode]);

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
    setAudioProgress(0);
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
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentIndex(nextIndex);
  };

  const handlePreviousClick = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentIndex(previousIndex);
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
    // const [prevIndex, nxtIndex] = calculateIndexes(currentIndex + 1);
    setKeepPlaying(false);
    setQueue(newQueue);
    setNextIndex(currentIndex + 1);
    // setPreviousIndex(prevIndex);
  };

  const handlePlayingATrack = (tracks, index) => {
    setQueue(tracks);
    setCurrentIndex(index);
    setIsPlaying(true);
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
    setCurrentIndex,
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
