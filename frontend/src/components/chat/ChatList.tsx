// src/components/chat/ChatList.tsx
import { useTranslation } from "react-i18next";
import { useSidebar } from "../../contexts/SidebarContext";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { useChatContext } from "../../contexts/ChatContext";
import ChatListSkeleton from "./skeletons/ChatListSkeleton";

/**
 * ChatList
 *
 * Displays the list of user's chats in the sidebar.
 * Consumes ChatContext for chat state - no direct API calls.
 *
 * @collapsed Shows only a chat icon that expands the sidebar on click
 * @expanded Shows a header and the full list of chats
 */
const ChatList = () => {
  const { chats, loading, error } = useChatContext();
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
    <div className="w-full">
      {/* Header - not clickable when expanded */}
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-base-content/60 font-medium">
        <ChatBubbleOvalLeftEllipsisIcon className="size-4 shrink-0" />
        <span>{t("chatListHeader")}</span>
      </div>

      {/* Chat list */}
      {loading ? (
        <ChatListSkeleton />
      ) : error ? (
        <p className="text-sm text-error px-4">{error}</p>
      ) : chats.length === 0 ? (
        <p className="text-sm text-base-content/50 px-4">{t("noChats")}</p>
      ) : (
        <ul className="menu w-full">
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link
                to={`/chat/${chat.id}`}
                className={chatId === chat.id ? "active" : ""}
              >
                <span className="truncate">{chat.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;