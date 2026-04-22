/**
 * MessageListSkeleton
 *
 * Displayed while fetching messages for a chat.
 * Matches the layout of AiChatBubble (paper card) and UserChatBubble.
 *
 * @example
 * {loading ? <MessageListSkeleton /> : <MessageList messages={messages} />}
 */
const MessageListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* AI message - paper card */}
      <div className="w-full mb-4">
        <div className="bg-base-100 rounded-lg shadow-sm border border-base-200 px-6 py-5 w-full">
          <div className="flex flex-col gap-3">
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-5/6" />
            <div className="skeleton h-3 w-4/6" />
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-base-200">
            <div className="skeleton h-3 w-8" />
            <div className="skeleton h-6 w-6 rounded" />
          </div>
        </div>
      </div>

      {/* User message - aligned right */}
      <div className="flex flex-col items-end mb-4">
        <div className="skeleton h-10 w-48 rounded-2xl rounded-tr-sm" />
        <div className="skeleton h-3 w-8 mt-1" />
      </div>

      {/* AI message */}
      <div className="w-full mb-4">
        <div className="bg-base-100 rounded-lg shadow-sm border border-base-200 px-6 py-5 w-full">
          <div className="flex flex-col gap-3">
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-3/4" />
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-2/4" />
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-base-200">
            <div className="skeleton h-3 w-8" />
            <div className="skeleton h-6 w-6 rounded" />
          </div>
        </div>
      </div>

      {/* User message */}
      <div className="flex flex-col items-end mb-4">
        <div className="skeleton h-10 w-64 rounded-2xl rounded-tr-sm" />
        <div className="skeleton h-3 w-8 mt-1" />
      </div>
    </div>
  );
};

export default MessageListSkeleton;
