// src/components/chat/ChatList.tsx
import { useTranslation } from "react-i18next";
import { useSidebar } from "../../contexts/SidebarContext";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { useChatContext } from "../../contexts/ChatContext";
import ChatListSkeleton from "./skeletons/ChatListSkeleton";
import ChatOptionsDropdown from "./ChatOptionsDropdown";
import useOpenDropdown from "../../hooks/useOpenDropdown";

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
  const { isOpen, toggle, close, containerRef } = useOpenDropdown();

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
        <p className="text-sm text-base-content/50 px-4">{t("noChat")}</p>
      ) : (
        <ul
          ref={containerRef as React.RefObject<HTMLUListElement>}
          className="menu w-full"
        >
          {chats.map((chat) => (
            <li key={chat.id}>
              <div className="group flex items-center w-full pr-1">
                <Link
                  to={`/chat/${chat.id}`}
                  className={`flex-1 truncate ${chatId === chat.id ? "active" : ""}`}
                >
                  <span className="truncate">{chat.title}</span>
                </Link>
                <div
                  className={`transition-opacity shrink-0 ${
                    isOpen(chat.id)
                      ? "visible opacity-100"
                      : "invisible opacity-0 group-hover:visible group-hover:opacity-100"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChatOptionsDropdown
                    chatId={chat.id}
                    currentTitle={chat.title}
                    isOpen={isOpen(chat.id)}
                    onToggle={() => toggle(chat.id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
