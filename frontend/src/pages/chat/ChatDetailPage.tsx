import { useParams } from "react-router-dom";
import ChatInputField from "../../components/chat/input/ChatInputField";
import MessageThreadContainer from "../../components/chat/thread/MessageThreadContainer";
import { useTranslation } from "react-i18next";
import { useChatContext } from "../../contexts/ChatContext";
import ChatOptionsDropdown from "../../components/chat/sidebar/ChatOptionsDropdown";
import useOpenDropdown from "../../hooks/useOpenDropdown";
import { useEffect, useState } from "react";
import type { IChatMessage } from "../../interfaces/chat/IChatMessage";
import PageHeader from "../../components/shared/PageHeader";
import PageContainer from "../../components/shared/PageContainer";

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
  const [localMessages, setLocalMessages] = useState<IChatMessage[]>([]);
  const isNewChat = isNew;
  const chat = chatId ? getChatById(chatId) : null;
  const { isOpen, toggle, containerRef } = useOpenDropdown();
  const { t } = useTranslation("chat");

  useEffect(() => {
    if (chat?.messageDtoList && chat.messageDtoList.length > 0) {
      setLocalMessages(chat.messageDtoList);
    }
  }, [chat?.messageDtoList]);

  return (
    <PageContainer maxWidth="4xl">
      {/* Chat header */}
      <PageHeader
        title={
          isNewChat
            ? t("newChat")
            : (chat?.title ?? (
                <span className="loading loading-dots loading-md" />
              ))
        }
        actions={
          !isNewChat && chatId && chat ? (
            <ChatOptionsDropdown
              chatId={chatId}
              currentTitle={chat.title}
              isOpen={isOpen(chatId)}
              onToggle={() => toggle(chatId)}
            />
          ) : undefined
        }
      />

      {/* Chat thread */}
      <MessageThreadContainer
        isNewChat={isNewChat}
        messages={localMessages}
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
    </PageContainer>
  );
};

export default ChatDetailPage;
