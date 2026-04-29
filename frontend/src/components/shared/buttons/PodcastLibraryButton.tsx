import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { NumberedListIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../../../contexts/SidebarContext";

/**
 * PodcastLibraryButton
 *
 * Sidebar button that navigates to the podcast library page.
 *
 * @collapsed Shows only the icon with a tooltip
 * @expanded Shows icon and label
 */
const PodcastLibraryButton = () => {
  const { t } = useTranslation("podcast");
  const { isExtended } = useSidebar();
  const navigate = useNavigate();

  /*   return (
    <button
      className={`${!isExtended ? "is-drawer-close:tooltip is-drawer-close:tooltip-right" : ""}`}
      data-tip={t("library")}
      onClick={() => navigate("/podcast/library")}
    >
      <NumberedListIcon className="my-1.5 inline-block size-4 shrink-0" />
      <span className="is-drawer-close:hidden">{t("library")}</span>
    </button>
 */
  if (!isExtended) {
    return (
      <button
        onClick={() => navigate("/podcast/library")}
        className="is-drawer-close:tooltip-right "
        aria-label={t("library")}
      >
        <NumberedListIcon className="size-4 shrink-0" aria-hidden="true" />
      </button>
    );
  }
  return (
    <button
      onClick={() => navigate("/podcast/library")}
      className="w-full justify-start gap-2 is-drawer-close:tooltip"
    >
      <NumberedListIcon className="size-4 shrink-0" aria-hidden="true" />
      <span>{t("library")}</span>
    </button>
  );
};

export default PodcastLibraryButton;
