import type { IChatMessage } from "../../interfaces/chat/IChatMessage";

interface UserChatBubbleProps {
  message: IChatMessage;
}

/**
 * UserChatBubble
 *
 * Renders a single user message aligned to the right.
 * Uses DaisyUI's primary color for the bubble.
 *
 * @property message - The user message to display
 */
const UserChatBubble = ({ message }: UserChatBubbleProps) => {
  return (
    <div className="flex flex-col items-end mb-4">
      <div className="bg-primary text-primary-content rounded-2xl rounded-tr-sm px-4 py-3 max-w-prose">
        <p className="text-sm">{message.body}</p>
      </div>
      <span className="text-xs text-base-content/40 mt-1">
        {new Date(message.localDateTime).toLocaleTimeString("nb-NO", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default UserChatBubble;
