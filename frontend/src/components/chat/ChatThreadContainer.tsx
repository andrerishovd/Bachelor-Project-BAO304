import { useTranslation } from "react-i18next";
import type { IChatMessage } from "../../interfaces/chat/IChatMessage";
import AiChatBubble from "./AiChatBubble";
import UserChatBubble from "./UserChatBubble";

interface ChatThreadContainerProps {
  chatId?: string;
  isNewChat?: boolean;
  messages?: IChatMessage[];
}

const ChatThreadContainer = ({
  chatId,
  isNewChat,
  messages = [],
}: ChatThreadContainerProps) => {
  const { t } = useTranslation("chat");

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain p-8">
      {isNewChat ? (
        <div className="flex items-center justify-center h-full text-base-content/50">
          <p>{t("newChatDescription")}</p>
        </div>
      ) : (
        <>
          {messages.map((message) =>
            message.senderType === "AI" ? (
              <AiChatBubble key={message.id} message={message} />
            ) : (
              <UserChatBubble key={message.id} message={message} />
            ),
          )}
        </>
      )}
    </div>
  );
};
export default ChatThreadContainer;
