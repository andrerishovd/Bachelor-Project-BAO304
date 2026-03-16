// src/components/chat/ChatListButton.tsx
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../../contexts/SidebarContext";

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

  return (
    <button
      onClick={() => navigate("/chats")}
      className={`${!isExtended ? "is-drawer-close:tooltip is-drawer-close:tooltip-right" : ""}`}
      data-tip={t("chatListHeader")}
    >
      <ChatBubbleOvalLeftEllipsisIcon className="my-1.5 inline-block size-4 shrink-0" />
      <span className="is-drawer-close:hidden">{t("chatListHeader")}</span>
    </button>
  );
};

export default ChatListButton;