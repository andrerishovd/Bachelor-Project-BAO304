import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../../../contexts/SidebarContext";
import { useTranslation } from "react-i18next";

const CreateChatButton = () => {
  const { isExtended } = useSidebar();
  const { t } = useTranslation("chat");
  const navigate = useNavigate();
  /* 
  if (!isExtended) {
    return (
      <Link to="/chat/new" className="btn btn-square" aria-label={t("newChat")}>
        <PlusIcon className="size-4 shrink-0" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link to="/chat/new" className="btn w-full justify-start gap-2">
      <PlusIcon className="size-4 shrink-0" aria-hidden="true" />
      <span>{t("newChat")}</span>
    </Link>
  );
 */
  if (!isExtended) {
    return (
      <button
        onClick={() => navigate("/chat/new")}
        className="is-drawer-close:tooltip-right"
        aria-label={t("newChat")}
      >
        <PlusIcon className="size-4 shrink-0" aria-hidden="true" />
      </button>
    );
  }
  return (
    <button
      onClick={() => navigate("/chat/new")}
      className="w-full justify-start gap-2 is-drawer-close:tooltip"
      aria-label={t("newChat")}
    >
      <PlusIcon className="size-4 shrink-0" aria-hidden="true" />
      <span aria-hidden="true">{t("newChat")}</span>
    </button>
  );
};

export default CreateChatButton;
