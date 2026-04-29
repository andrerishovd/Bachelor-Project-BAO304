import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useSidebar } from "../../../contexts/SidebarContext";

const HomeButton = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const { isExtended } = useSidebar();
  const handleHomeClick = () => {
    navigate("/");
  };

  if (!isExtended) {
    return (
      <button
        className="is-drawer-close:tooltip-right"
        data-tip={t("homepage")}
        onClick={handleHomeClick}
      >
        {/* Home icon */}

        <HomeIcon className="size-4 shrink-0" aria-hidden="true" />
        <span className="is-drawer-close:hidden">{t("homepage")}</span>
      </button>
    );
  }
  return (
    <button
      onClick={handleHomeClick}
      className="w-full justify-start gap-2 is-drawer-close:tooltip"
    >
      <HomeIcon className="size-4 shrink-0" aria-hidden="true" />
      <span>{t("homepage")}</span>
    </button>
  );
};

export default HomeButton;
