import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMediaContext } from "../../contexts/MediaContext";
import type { IPodcast } from "../../interfaces/podcast/IPodcast";
import { PlayIcon, PlusIcon } from "@heroicons/react/24/solid";
import { formatTime, formatLastMessageTime } from "../../utils/formatTime";
import PageHeader from "../../components/shared/PageHeader";
import PageContainer from "../../components/shared/PageContainer";

// TODO: Replace with real data from PodcastService when API is ready
const MOCK_PODCASTS: IPodcast[] = [];

/**
 * PodcastLibraryPage
 *
 * Displays all generated podcasts in a scrollable list.
 * Allows the user to play any episode directly from the list.
 * Shows an empty state with a call-to-action when no podcasts exist.
 *
 * @route /podcast/library
 */
const PodcastLibraryPage = () => {
  const { t } = useTranslation("podcast");
  const navigate = useNavigate();
  const { play } = useMediaContext();

  /**
   * Starts playback of the selected podcast episode via MediaContext.
   * @param podcast - The podcast episode to play
   */
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

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title={t("library")}
        actions={
          <button
            onClick={() => navigate("/podcast/generate")}
            className="btn btn-primary btn-sm gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            {t("generatePodcast")}
          </button>
        }
      />

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {MOCK_PODCASTS.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full gap-4 text-base-content/50">
            <p>{t("emptyLibrary")}</p>
            <button
              onClick={() => navigate("/podcast/generate")}
              className="btn btn-outline btn-sm"
            >
              {t("generateFirst")}
            </button>
          </div>
        ) : (
          // Podcast list
          <ul className="flex flex-col gap-1 p-4">
            {MOCK_PODCASTS.map((podcast) => (
              <li
                key={podcast.id}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-base-200 transition-colors"
              >
                {podcast.imageUrl ? (
                  <img
                    src={podcast.imageUrl}
                    alt={podcast.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-base-300 shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{podcast.title}</p>
                  <p className="text-xs text-base-content/50">
                    {formatTime(podcast.duration)} ·{" "}
                    {formatLastMessageTime([
                      { localDateTime: podcast.createdAt },
                    ])}
                  </p>
                </div>

                <button
                  onClick={() => handlePlay(podcast)}
                  className="btn btn-circle btn-sm btn-ghost"
                  aria-label={`Play ${podcast.title}`}
                >
                  <PlayIcon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageContainer>
  );
};

export default PodcastLibraryPage;
