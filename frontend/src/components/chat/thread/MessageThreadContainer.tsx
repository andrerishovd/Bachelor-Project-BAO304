import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { IChatMessage } from "../../../interfaces/chat/IChatMessage";
import ChatMessageAssistant from "../messages/ChatMessageAssistant";
import ChatMessageUser from "../messages/ChatMessageUser";
import MessageListSkeleton from "../skeletons/MessageContainerSkeleton";
import useDelayedBoolean from "../../../hooks/useDelayedBoolean";

interface MessageThreadContainerProps {
  isNewChat?: boolean;
  messages?: IChatMessage[];
  isLoadingMessages?: boolean;
  isWaitingForResponse?: boolean;
}

const MessageThreadContainer = ({
  isNewChat,
  messages = [],
  isLoadingMessages = false,
  isWaitingForResponse = false,
}: MessageThreadContainerProps) => {
  const { t } = useTranslation("chat");
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const showSkeleton = useDelayedBoolean(isWaitingForResponse, 500);

  // Scroll to bottom when new message is sent
  useEffect(() => {
    if (!containerRef.current || messages.length === 0) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [isLoadingMessages, messages, showSkeleton]);

  return (
    <div
      ref={containerRef}
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
              <ChatMessageAssistant key={message.id} message={message} />
            ) : (
              <ChatMessageUser key={message.id} message={message} />
            ),
          )}
          {showSkeleton && <ChatMessageAssistant isLoading />}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
};

export default MessageThreadContainer;
