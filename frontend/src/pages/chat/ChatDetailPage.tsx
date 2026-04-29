import { useParams } from "react-router-dom";
import ChatInputField from "../../components/chat/input/ChatInputField";
import MessageThreadContainer from "../../components/chat/thread/MessageThreadContainer";
import { useTranslation } from "react-i18next";
import { useChatContext } from "../../contexts/ChatContext";
import ChatOptionsDropdown from "../../components/chat/sidebar/ChatOptionsDropdown";
import useOpenDropdown from "../../hooks/useOpenDropdown";
import { useState } from "react";

/**
 * ChatDetailPage
 *
 * Displays a single chat conversation.
 * Supports both existing chats (/chat/:chatId) and new chats (/chat/new).
 *
 * @route /chat/:chatId - Existing chat
 * @route /chat/new - New empty chat (creates on first message send)
 */

interface ChatDetailPageProps {
  isNew?: boolean;
}

const ChatDetailPage = ({ isNew = false }: ChatDetailPageProps) => {
  const { chatId } = useParams<{ chatId: string }>();
  const { getChatById, refetch } = useChatContext();
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const isNewChat = isNew;
  const chat = chatId ? getChatById(chatId) : null;
  const { isOpen, toggle, containerRef } = useOpenDropdown();
  const { t } = useTranslation("chat");

  return (
    <div className="flex flex-col h-full overflow-hidden items-center">
      <div className="flex flex-col h-full overflow-hidden w-full max-w-4xl">
        {/* Chat header */}
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="border-b border-base-300 p-4 flex items-center gap-2"
        >
          <h1 className="text-2xl font-bold flex-1">
            {isNewChat ? (
              t("newChat")
            ) : chat?.title ? (
              chat.title
            ) : (
              <span className="loading loading-dots loading-md"></span>
            )}
          </h1>

          {!isNewChat && chatId && chat && (
            <ChatOptionsDropdown
              chatId={chatId}
              currentTitle={chat.title}
              isOpen={isOpen(chatId)}
              onToggle={() => toggle(chatId)}
            />
          )}
        </div>

        {/* Chat thread */}
        <MessageThreadContainer
          isNewChat={isNewChat}
          messages={chat?.messageDtoList || []}
          isWaitingForResponse={isWaitingForResponse}
        />

        {/* Input field */}
        <div className="border-t border-base-300 p-4">
          <ChatInputField
            chatId={isNewChat ? undefined : chatId}
            isNewChat={isNewChat}
            onWaitingForResponse={setIsWaitingForResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDetailPage;
