import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../../../contexts/SidebarContext";

/**
 * ChatListButton
 *
 * Sidebar button that navigates to the full chat list page (/chats).
 *
 * @collapsed Shows only the chat icon with a tooltip
 * @expanded Shows icon and label
 */
const ChatListButton = () => {
  const { t } = useTranslation("chat");
  const { isExtended } = useSidebar();
  const navigate = useNavigate();

  if (!isExtended) {
    return (
      <button
        className="is-drawer-close:tooltip-right"
        data-tip={t("chatListHeader")}
        onClick={() => navigate("/chats")}
        aria-label={t("chatListHeader")}
      >
        <ChatBubbleOvalLeftEllipsisIcon
          className="size-4 shrink-0"
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate("/chats")}
      className="w-full justify-start gap-2 is-drawer-close:tooltip"
      data-tip={t("chatListHeader")}
      aria-label={t("chatListHeader")}
    >
      <ChatBubbleOvalLeftEllipsisIcon
        className="size-4 shrink-0"
        aria-hidden="true"
      />
      <span aria-hidden="true">{t("chatListHeader")}</span>
    </button>
  );
};

export default ChatListButton;
