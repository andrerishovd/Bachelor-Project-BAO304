import { useTranslation } from "react-i18next";
import { useSidebar } from "../../contexts/SidebarContext";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { useChatContext } from "../../contexts/ChatContext";

/**
 * ChatList Component
 *
 * Displays list of user's chats in the sidebar.
 * Consumes ChatContext for chat state - no direct API calls.
 *
 * @collapsed Shows only chat icon
 * @expanded Shows chat icon, header, and list of chats
 */
const ChatList = () => {
  const { chats, loading, error } = useChatContext(); // ✅ Fra context
  const { isExtended, expandSidebar } = useSidebar();
  const { t } = useTranslation("chat");
  const { chatId } = useParams();

  if (!isExtended) {
    return (
      <button
        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
        onClick={expandSidebar}
        aria-label={t("chatListHeader")}
      >
        <ChatBubbleOvalLeftEllipsisIcon
          className="my-1.5 inline-block size-4 shrink-0"
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <>
      {/* Header */}
      <label className="flex items-center gap-2 w-full">
        <ChatBubbleOvalLeftEllipsisIcon
          className="my-1.5 inline-block size-4 shrink-0"
          aria-hidden="true"
        />
        <span className="is-drawer-close:hidden">{t("chatListHeader")}</span>
      </label>

      {/* Chat list */}
      <ul>
        {loading ? (
          <li className="text-sm text-base-content/50 p-2">{t("loading")}</li>
        ) : error ? (
          <li className="text-sm text-error p-2">{error}</li>
        ) : chats.length === 0 ? (
          <li className="text-sm text-base-content/50 p-2">{t("noChats")}</li>
        ) : (
          chats.map((chat) => (
            <li key={chat.id}>
              <Link
                to={`/chat/${chat.id}`}
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  chatId === chat.id ? "active" : ""
                }`}
              >
                <span className="is-drawer-close:hidden truncate">
                  {chat.title}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default ChatList;
