import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { IChatMessage } from "../../../interfaces/chat/IChatMessage";
import AiChatBubble from "../messages/ChatMessageAssistant";
import UserChatBubble from "../messages/ChatMessageUser";
import AiThinkingSkeleton from "../skeletons/ChatMessageAssistantSkeleton";
import MessageListSkeleton from "../skeletons/MessageContainerSkeleton";
import useDelayedBoolean from "../../../hooks/useDelayedBoolean";
import { AnimatePresence, motion } from "motion/react";
import ChatMessageAssistant from "../messages/ChatMessageAssistant";

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
 * Auto-scrolls to the bottom when new messages arrive or AI is responding.
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
  const bottomRef = useRef<HTMLDivElement>(null);
  const showSkeleton = useDelayedBoolean(isWaitingForResponse, 500);

  // Auto-scroll to bottom when messages change or AI starts/stops responding
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaitingForResponse, showSkeleton]);

  return (
    <motion.div
      layoutScroll
      className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-8"
    >
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
          {showSkeleton && <ChatMessageAssistant isLoading />}

          {/* Invisible anchor at the bottom */}
          <div ref={bottomRef} />
        </>
      )}
    </motion.div>
  );
};

export default MessageThreadContainer;
