// src/components/chat/MessageThreadContainer.tsx
import { useTranslation } from "react-i18next";
import type { IChatMessage } from "../../interfaces/chat/IChatMessage";
import AiChatBubble from "./AiChatBubble";
import UserChatBubble from "./UserChatBubble";
import MessageListSkeleton from "./skeletons/MessageContainerSkeleton";
import AiThinkingSkeleton from "./skeletons/AiLoadingSkeleton";

interface MessageThreadContainerProps {
  isNewChat?: boolean;
  messages?: IChatMessage[];
  isLoadingMessages?: boolean;
  isWaitingForResponse?: boolean;
}

/**
 * MessageThreadContainer
 *
 * Renders the full message thread for a chat session.
 * Handles three states: new chat, loading messages, and active conversation.
 *
 * @property isNewChat - Shows empty state if true
 * @property messages - List of messages to render
 * @property isLoadingMessages - Shows MessageListSkeleton while fetching messages
 * @property isWaitingForResponse - Shows AiThinkingSkeleton while waiting for AI reply
 */
const MessageThreadContainer = ({
  isNewChat,
  messages = [],
  isLoadingMessages = false,
  isWaitingForResponse = false,
}: MessageThreadContainerProps) => {
  const { t } = useTranslation("chat");

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain p-8">
      {isNewChat ? (
        <div className="flex items-center justify-center h-full text-base-content/50">
          <p>{t("newChatDescription")}</p>
        </div>
      ) : isLoadingMessages ? (
        <MessageListSkeleton />
      ) : (
        <>
          {messages.map((message) =>
            message.senderType === "AI" ? (
              <AiChatBubble key={message.id} message={message} />
            ) : (
              <UserChatBubble key={message.id} message={message} />
            ),
          )}
          {/* Shown at the bottom of the thread while waiting for AI response */}
          {isWaitingForResponse && <AiThinkingSkeleton />}
        </>
      )}
    </div>
  );
};

export default MessageThreadContainer;
