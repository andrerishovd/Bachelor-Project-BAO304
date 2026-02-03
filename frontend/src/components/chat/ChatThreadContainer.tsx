import AiChatBubble from "./AiChatBubble";
import UserChatBubble from "./UserChatBubble";

const ChatThreadContainer = () => {
  return (
    <div className="flex-1 overflow-y-auto overscroll-contain p-8">
      <AiChatBubble />
      <UserChatBubble />
      <AiChatBubble />
      <AiChatBubble />
    </div>
  );
};
export default ChatThreadContainer;
