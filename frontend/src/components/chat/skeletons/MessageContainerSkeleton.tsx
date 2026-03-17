/**
 * MessageListSkeleton
 *
 * Displayed while fetching messages for a chat.
 * Alternates between left (AI) and right (user) to mimic a real conversation.
 *
 * @example
 * {loading ? <MessageListSkeleton /> : <MessageList messages={messages} />}
 *
 * Alternates AI (left) and user (right) bubbles
 */
const MessageListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-neutral">
          <div className="flex flex-col gap-2">
            <div className="skeleton h-3 w-64"></div>
            <div className="skeleton h-3 w-48"></div>
          </div>
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">
          <div className="skeleton h-3 w-32"></div>
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-neutral">
          <div className="flex flex-col gap-2">
            <div className="skeleton h-3 w-56"></div>
            <div className="skeleton h-3 w-40"></div>
            <div className="skeleton h-3 w-48"></div>
          </div>
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">
          <div className="skeleton h-3 w-44"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageListSkeleton;
