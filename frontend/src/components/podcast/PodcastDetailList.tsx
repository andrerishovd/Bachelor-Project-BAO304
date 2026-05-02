import { useTranslation } from "react-i18next";
import { PlayIcon } from "@heroicons/react/24/solid";
import type { IPodcast } from "../../interfaces/podcast/IPodcast";
import { useMediaContext } from "../../contexts/MediaContext";
import { formatTime, formatLastMessageTime } from "../../utils/formatTime";

interface PodcastDetailListProps {
  podcasts: IPodcast[];
}

/**
 * PodcastDetailList
 *
 * Displays a list of podcast episodes using the DaisyUI list-row component.
 * Each episode shows a cover image, title, creation date, duration,
 * and a play button that starts playback via MediaContext.
 *
 * @property podcasts - List of podcast episodes to display
 *
 * @example
 * <PodcastDetailList podcasts={podcasts} />
 */
const PodcastDetailList = ({ podcasts }: PodcastDetailListProps) => {
  const { t } = useTranslation("podcast");
  const { play } = useMediaContext();

  const handlePlay = (podcast: IPodcast) => {
    play({
      id: podcast.id,
      title: podcast.title,
      podcastName: "Study Buddy",
      audioUrl: podcast.audioUrl,
      imageUrl: podcast.imageUrl,
      duration: podcast.duration,
    });
  };

  if (podcasts.length === 0) {
    return (
      <p className="text-sm text-base-content/50 px-4">{t("emptyLibrary")}</p>
    );
  }

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        {t("library")}
      </li>

      {podcasts.map((podcast) => (
        <li key={podcast.id} className="list-row">
          {/* Cover image */}
          <div>
            {podcast.imageUrl ? (
              <img
                className="size-10 rounded-box object-cover"
                src={podcast.imageUrl}
                alt={podcast.title}
              />
            ) : (
              <div className="size-10 rounded-box bg-base-300" />
            )}
          </div>

          {/* Title and metadata */}
          <div className="min-w-0">
            <p className="font-medium truncate">{podcast.title}</p>
            <p className="text-xs uppercase font-semibold opacity-60">
              {formatTime(podcast.duration)} ·{" "}
              {formatLastMessageTime([{ localDateTime: podcast.createdAt }])}
            </p>
          </div>

          {/* Play button */}
          <button
            onClick={() => handlePlay(podcast)}
            className="btn btn-square btn-ghost"
            aria-label={`Play ${podcast.title}`}
          >
            <PlayIcon className="size-5" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PodcastDetailList;
