import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../../contexts/SidebarContext";
import { useTranslation } from "react-i18next";

const CreateChatButton = () => {
  const { isExtended } = useSidebar();
  const { t } = useTranslation("chat");

  if (!isExtended) {
    return (
      <Link
        to="/chat/new"
        className="btn btn-square btn-primary"
        aria-label={t("newChat")}
      >
        <PlusIcon className="size-4 shrink-0" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link to="/chat/new" className="btn btn-primary w-full justify-start gap-2">
      <PlusIcon className="size-4 shrink-0" aria-hidden="true" />
      <span>{t("newChat")}</span>
    </Link>
  );
};

export default CreateChatButton;
