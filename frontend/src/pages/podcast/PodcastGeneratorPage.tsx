import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFileUpload } from "../../hooks/useFileUpload";
import PodcastContentStep from "../../components/podcast/generate/PodcastContentStep";
import PodcastSettingsStep, {
  type PodcastSettings,
} from "../../components/podcast/generate/PodcastSettingsStep";
import { useMediaContext } from "../../contexts/MediaContext";
import { useAlertContext } from "../../contexts/AlertContext";

const DEFAULT_SETTINGS: PodcastSettings = {
  length: "medium",
  tone: "casual",
  speakers: 1,
  language: "no",
};

/**
 * PodcastGeneratorPage
 *
 * Two-panel layout for podcast generation.
 * Left panel: content selection (notes, file uploads, chat selection).
 * Right panel: podcast settings (length, tone, speakers, language).
 *
 * Plays a mock episode on generation until the backend API is ready.
 *
 * @route /podcast/generate
 */
const PodcastGeneratorPage = () => {
  const { t } = useTranslation("podcast");
  const [notes, setNotes] = useState("");
  const { play, toggleExpanded } = useMediaContext();
  const { showError } = useAlertContext();
  const [selectedChatIds, setSelectedChatIds] = useState<Set<string>>(
    new Set(),
  );
  const [settings, setSettings] = useState<PodcastSettings>(DEFAULT_SETTINGS);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileUpload = useFileUpload();

  const hasContent =
    notes.trim().length > 0 ||
    fileUpload.uploadedFiles.length > 0 ||
    selectedChatIds.size > 0;

  const toggleChat = (id: string) => {
    setSelectedChatIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /**
   * Handles podcast generation.
   * TODO: Replace mock episode with actual PodcastService API call when ready.
   */
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const mockEpisode = {
        id: `podcast-${Date.now()}`,
        title: notes.trim() || "My podcast",
        podcastName: "Study Buddy",
        audioUrl:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: 0,
      };

      play(mockEpisode);
      toggleExpanded();
    } catch {
      showError(t("generateError"));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden items-center">
      <div className="flex flex-col h-full overflow-hidden w-full max-w-5xl">
        {/* Header */}
        <div className="border-b border-base-300 p-4 shrink-0">
          <h1 className="text-2xl font-bold">{t("generatePodcast")}</h1>
          <p className="text-sm text-base-content/60 mt-1">
            {t("generateDescription")}
          </p>
        </div>

        {/* Side by side panels */}
        <div className="flex-1 min-h-0">
          <div className="grid grid-cols-2 divide-x divide-base-300 h-full">
            <PodcastContentStep
              notes={notes}
              onNotesChange={setNotes}
              selectedChatIds={selectedChatIds}
              onToggleChat={toggleChat}
              fileUpload={fileUpload}
            />
            <PodcastSettingsStep settings={settings} onChange={setSettings} />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-base-300 p-4 shrink-0 flex justify-end">
          <button
            className="btn btn-primary"
            disabled={!hasContent || isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                {t("generating")}
              </>
            ) : (
              t("generate")
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PodcastGeneratorPage;
