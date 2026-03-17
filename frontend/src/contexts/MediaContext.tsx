import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  type FC,
  type ReactNode,
} from "react";

export interface IPodcastEpisode {
  id: string;
  title: string;
  podcastName: string;
  audioUrl: string;
  imageUrl?: string;
  duration: number;
}

type SleepTimerOption = 5 | 10 | 15 | 25 | "custom" | null;

/**
 * IMediaContext
 *
 * Provides global podcast playback state and controls.
 *
 * @property episode - Currently loaded episode, null if none
 * @property isPlaying - Whether audio is currently playing
 * @property currentTime - Current playback position in seconds
 * @property duration - Total duration of current episode in seconds
 * @property isExpanded - Whether the full-size player is shown
 * @property autoPlay - Whether the next episode plays automatically
 * @property sleepTimer - Active sleep timer option
 * @property sleepTimerRemaining - Seconds remaining on sleep timer
 * @property queue - List of upcoming episodes
 */
interface IMediaContext {
  episode: IPodcastEpisode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isExpanded: boolean;
  autoPlay: boolean;
  sleepTimer: SleepTimerOption;
  sleepTimerRemaining: number | null;
  queue: IPodcastEpisode[];
  play: (episode: IPodcastEpisode) => void;
  togglePlayPause: () => void;
  seek: (seconds: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
  toggleExpanded: () => void;
  toggleAutoPlay: () => void;
  setSleepTimer: (option: SleepTimerOption, customMinutes?: number) => void;
  clearSleepTimer: () => void;
  addToQueue: (episode: IPodcastEpisode) => void;
  removeFromQueue: (id: string) => void;
}

interface IProps {
  children: ReactNode;
}

export const MediaContext = createContext<IMediaContext | null>(null);

/**
 * MediaProvider
 *
 * Manages a single HTMLAudioElement for global podcast playback.
 * Persists autoPlay preference in localStorage.
 *
 * @param children - Child components that need access to media state
 */
export const MediaProvider: FC<IProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const sleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sleepIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [episode, setEpisode] = useState<IPodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoPlay, setAutoPlay] = useState(() => {
    return localStorage.getItem("mediaAutoPlay") === "true";
  });
  const [sleepTimer, setSleepTimerState] = useState<SleepTimerOption>(null);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(
    null,
  );
  const [queue, setQueue] = useState<IPodcastEpisode[]>([]);

  // Sync audio element events to state
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      if (autoPlay && queue.length > 0) {
        const [next, ...rest] = queue;
        setQueue(rest);
        play(next);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [autoPlay, queue]);

  // Persist autoPlay preference
  useEffect(() => {
    localStorage.setItem("mediaAutoPlay", String(autoPlay));
  }, [autoPlay]);

  const play = useCallback((ep: IPodcastEpisode) => {
    const audio = audioRef.current;
    if (audio.src !== ep.audioUrl) {
      audio.src = ep.audioUrl;
      audio.load();
    }
    audio.play();
    setEpisode(ep);
    setIsPlaying(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const seek = useCallback((seconds: number) => {
    audioRef.current.currentTime = seconds;
  }, []);

  const skipForward = useCallback(() => {
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 15,
      audioRef.current.duration,
    );
  }, []);

  const skipBackward = useCallback(() => {
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 15,
      0,
    );
  }, []);

  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), []);
  const toggleAutoPlay = useCallback(() => setAutoPlay((prev) => !prev), []);

  const clearSleepTimer = useCallback(() => {
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
    if (sleepIntervalRef.current) clearInterval(sleepIntervalRef.current);
    setSleepTimerState(null);
    setSleepTimerRemaining(null);
  }, []);

  const setSleepTimer = useCallback(
    (option: SleepTimerOption, customMinutes?: number) => {
      clearSleepTimer();
      if (!option) return;

      const minutes = option === "custom" ? (customMinutes ?? 15) : option;
      const ms = minutes * 60 * 1000;

      setSleepTimerState(option);
      setSleepTimerRemaining(minutes * 60);

      // Countdown interval
      sleepIntervalRef.current = setInterval(() => {
        setSleepTimerRemaining((prev) => {
          if (prev === null || prev <= 1) return null;
          return prev - 1;
        });
      }, 1000);

      // Stop playback when timer expires
      sleepTimerRef.current = setTimeout(() => {
        audioRef.current.pause();
        setIsPlaying(false);
        clearSleepTimer();
      }, ms);
    },
    [clearSleepTimer],
  );

  const addToQueue = useCallback((ep: IPodcastEpisode) => {
    setQueue((prev) => [...prev, ep]);
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    setQueue((prev) => prev.filter((ep) => ep.id !== id));
  }, []);

  return (
    <MediaContext.Provider
      value={{
        episode,
        isPlaying,
        currentTime,
        duration,
        isExpanded,
        autoPlay,
        sleepTimer,
        sleepTimerRemaining,
        queue,
        play,
        togglePlayPause,
        seek,
        skipForward,
        skipBackward,
        toggleExpanded,
        toggleAutoPlay,
        setSleepTimer,
        clearSleepTimer,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

/**
 * useMediaContext
 *
 * Custom hook for consuming MediaContext.
 * Must be used within a MediaProvider.
 *
 * @throws Error if used outside of MediaProvider
 *
 * @example
 * const { play, togglePlayPause, isPlaying } = useMediaContext();
 */
export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context)
    throw new Error("useMediaContext must be used within MediaProvider");
  return context;
};
