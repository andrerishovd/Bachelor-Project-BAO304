import AiChatBubble from "./AiChatBubble";
import UserChatBubble from "./UserChatBubble";

interface ChatThreadContainerProps {
  chatId?: string;
}

const ChatThreadContainer = ({ chatId }: ChatThreadContainerProps) => {
  return (
    <div className="flex-1 overflow-y-auto overscroll-contain p-8">
      <p className="text-sm text-base-content/50 mb-4">Chat ID: {chatId}</p>
      <AiChatBubble />
      <UserChatBubble />
      <AiChatBubble />
    </div>
  );
};
export default ChatThreadContainer;
