import type { IChatMessage } from "../../interfaces/chat/IChatMessage";

interface UserChatBubbleProps {
  message: IChatMessage;
}

const UserChatBubble = ({ message }: UserChatBubbleProps) => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble chat-bubble-info">{message.body}</div>
      <div className="chat-footer opacity-50 text-xs">
        {new Date(message.localDateTime).toLocaleTimeString("nb-NO", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default UserChatBubble;
