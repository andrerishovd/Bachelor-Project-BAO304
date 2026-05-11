import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../../../contexts/SidebarContext";

/**
 * GeneratePodcastButton
 *
 * Sidebar button that navigates to the podcast generator page.
 *
 * @collapsed Shows only the microphone icon with a tooltip
 * @expanded Shows icon and label
 */
const GeneratePodcastButton = () => {
  const { t } = useTranslation("common");
  const { isExtended } = useSidebar();
  const navigate = useNavigate();

  if (!isExtended) {
    return (
      <button
        onClick={() => navigate("/podcast/generate")}
        className="is-drawer-close:tooltip-right "
        aria-label={t("generatePodcast")}
      >
        <MicrophoneIcon className="size-4 shrink-0" aria-hidden="true" />
      </button>
    );
  }
  return (
    <button
      onClick={() => navigate("/podcast/generate")}
      className="w-full justify-start gap-2 is-drawer-close:tooltip"
      aria-label={t("generatePodcast")}
    >
      <MicrophoneIcon className="size-4 shrink-0" aria-hidden="true" />
      <span aria-hidden="true">{t("generatePodcast")}</span>
    </button>
  );
};

export default GeneratePodcastButton;
