// src/components/media/FullPlayer.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaContext } from "../../contexts/MediaContext";
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  ChevronDownIcon,
  QueueListIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { formatTime } from "../../utils/formatTime";

/**
 * FullPlayer
 *
 * Full-width media player shown at the bottom of the screen.
 * Includes sleep timer, queue, and autoplay controls.
 * Only renders when expanded and an episode is loaded.
 *
 * @example
 * <FullPlayer />
 */
const FullPlayer = () => {
  const { t } = useTranslation("media");
  const {
    episode,
    isPlaying,
    currentTime,
    duration,
    isExpanded,
    autoPlay,
    sleepTimer,
    sleepTimerRemaining,
    queue,
    togglePlayPause,
    skipForward,
    skipBackward,
    toggleExpanded,
    toggleAutoPlay,
    setSleepTimer,
    clearSleepTimer,
    removeFromQueue,
    seek,
  } = useMediaContext();

  const [showQueue, setShowQueue] = useState(false);
  const [showSleepTimer, setShowSleepTimer] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(20);

  if (!episode || !isExpanded) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-base-200 border-t border-base-300 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Episode info + collapse button */}
        <div className="flex items-center gap-4 mb-4">
          {episode.imageUrl && (
            <img
              src={episode.imageUrl}
              alt={episode.title}
              className="w-14 h-14 rounded-lg object-cover shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{episode.title}</p>
            <p className="text-sm text-base-content/50 truncate">
              {episode.podcastName}
            </p>
          </div>
          <div className="tooltip tooltip-left" data-tip={t("minimize")}>
            <button onClick={toggleExpanded} className="btn btn-sm btn-ghost">
              <ChevronDownIcon className="w-5 h-5" />
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
          className="range range-sm w-full mb-1"
        />
        <div className="flex justify-between text-xs text-base-content/50 mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Main controls */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="tooltip tooltip-top" data-tip={t("skip15Back")}>
            <button onClick={skipBackward} className="btn btn-sm btn-ghost">
              <BackwardIcon className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={togglePlayPause}
            className="btn btn-circle btn-primary"
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>
          <div className="tooltip tooltip-top" data-tip={t("skip15Forward")}>
            <button onClick={skipForward} className="btn btn-sm btn-ghost">
              <ForwardIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary controls */}
        <div className="flex justify-between items-center">
          {/* AutoPlay toggle */}
          <div className="tooltip tooltip-right" data-tip={t("autoPlay")}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-sm toggle-primary"
                checked={autoPlay}
                onChange={toggleAutoPlay}
              />
              <span className="text-xs text-base-content/60">
                {t("autoPlay")}
              </span>
            </label>
          </div>

          <div className="flex gap-2">
            {/* Sleep timer */}
            <div className="dropdown dropdown-top dropdown-end">
              <div
                className={`tooltip tooltip-top`}
                data-tip={
                  sleepTimerRemaining
                    ? `${t("sleepTimer")}: ${formatTime(sleepTimerRemaining)}`
                    : t("sleepTimer")
                }
              >
                <button
                  onClick={() => setShowSleepTimer((p) => !p)}
                  tabIndex={0}
                  className={`btn btn-sm btn-ghost ${sleepTimer ? "text-primary" : ""}`}
                >
                  <MoonIcon className="w-4 h-4" />
                  {sleepTimerRemaining && (
                    <span className="text-xs">
                      {formatTime(sleepTimerRemaining)}
                    </span>
                  )}
                </button>
              </div>
              {showSleepTimer && (
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box shadow z-10 p-2 w-48"
                >
                  {([5, 10, 15, 25] as const).map((min) => (
                    <li key={min}>
                      <button
                        className={sleepTimer === min ? "active" : ""}
                        onClick={() => {
                          setSleepTimer(min);
                          setShowSleepTimer(false);
                        }}
                      >
                        {min} {t("minutes")}
                      </button>
                    </li>
                  ))}
                  <li>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={120}
                        value={customMinutes}
                        onChange={(e) =>
                          setCustomMinutes(Number(e.target.value))
                        }
                        className="input input-xs w-16"
                      />
                      <button
                        onClick={() => {
                          setSleepTimer("custom", customMinutes);
                          setShowSleepTimer(false);
                        }}
                        className="btn btn-xs btn-primary"
                      >
                        {t("set")}
                      </button>
                    </div>
                  </li>
                  {sleepTimer && (
                    <li>
                      <button className="text-error" onClick={clearSleepTimer}>
                        {t("clearTimer")}
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Queue */}
            <div className="tooltip tooltip-top" data-tip={t("queue")}>
              <button
                onClick={() => setShowQueue((p) => !p)}
                className={`btn btn-sm btn-ghost ${showQueue ? "btn-active" : ""}`}
              >
                <QueueListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Queue list */}
        {showQueue && (
          <div className="mt-4 border-t border-base-300 pt-4">
            <p className="text-sm font-medium mb-2">{t("upNext")}</p>
            {queue.length === 0 ? (
              <p className="text-sm text-base-content/50">{t("emptyQueue")}</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {queue.map((ep) => (
                  <li key={ep.id} className="flex items-center gap-3">
                    {ep.imageUrl && (
                      <img
                        src={ep.imageUrl}
                        alt={ep.title}
                        className="w-8 h-8 rounded object-cover shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{ep.title}</p>
                      <p className="text-xs text-base-content/50 truncate">
                        {ep.podcastName}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromQueue(ep.id)}
                      className="btn btn-xs btn-ghost text-error"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPlayer;
