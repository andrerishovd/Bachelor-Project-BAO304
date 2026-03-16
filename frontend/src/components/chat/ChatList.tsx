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
    return null;
  }

  return (
    <div className="w-full">
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
