// src/components/media/MiniPlayer.tsx
import { useTranslation } from "react-i18next";
import { useMediaContext } from "../../contexts/MediaContext";
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { formatTime } from "../../utils/formatTime";

/**
 * MiniPlayer
 *
 * Compact media player shown in the sidebar.
 * Only renders when an episode is loaded.
 *
 * @example
 * <MiniPlayer />
 */
const MiniPlayer = () => {
  const { t } = useTranslation("media");
  const {
    episode,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    skipForward,
    skipBackward,
    toggleExpanded,
    seek,
  } = useMediaContext();

  if (!episode) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full p-2 bg-base-300 rounded-lg">
      {/* Episode info */}
      <div className="flex items-center gap-2 mb-2">
        {episode.imageUrl && (
          <img
            src={episode.imageUrl}
            alt={episode.title}
            className="w-8 h-8 rounded object-cover shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{episode.title}</p>
          <p className="text-xs text-base-content/50 truncate">
            {episode.podcastName}
          </p>
        </div>
        {/* Expand button */}
        <div className="tooltip tooltip-left" data-tip={t("expand")}>
          <button onClick={toggleExpanded} className="btn btn-xs btn-ghost">
            <ChevronUpIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        className="range range-xs w-full mb-1"
      />
      <div className="flex justify-between text-xs text-base-content/50 mb-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-2">
        <div className="tooltip tooltip-top" data-tip={t("skip15Back")}>
          <button onClick={skipBackward} className="btn btn-xs btn-ghost">
            <BackwardIcon className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={togglePlayPause}
          className="btn btn-sm btn-circle btn-primary"
        >
          {isPlaying ? (
            <PauseIcon className="w-4 h-4" />
          ) : (
            <PlayIcon className="w-4 h-4" />
          )}
        </button>
        <div className="tooltip tooltip-top" data-tip={t("skip15Forward")}>
          <button onClick={skipForward} className="btn btn-xs btn-ghost">
            <ForwardIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
