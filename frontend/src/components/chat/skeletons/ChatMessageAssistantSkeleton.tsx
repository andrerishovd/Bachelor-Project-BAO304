/**
 * ChatMessageAssistantSkeleton
 *
 * Displayed while waiting for an AI response.
 * Matches the layout of AiChatBubble.
 */
const ChatMessageAssistantSkeleton = () => {
  return (
    <div className="px-6 py-5">
      {/* Mimics prose content */}
      <div className="flex flex-col gap-3">
        <div className="skeleton h-3 w-full bg-base-content/20" />
        <div className="skeleton h-3 w-5/6 bg-base-content/20" />
        <div className="skeleton h-3 w-4/6 bg-base-content/20" />
        <div className="skeleton h-3 w-full bg-base-content/20" />
        <div className="skeleton h-3 w-3/6 bg-base-content/20" />
      </div>

      {/* Mimics footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-base-200">
        <div className="skeleton h-3 w-8 bg-base-content/20" />
        <div className="skeleton h-6 w-6 rounded bg-base-content/20" />
      </div>
    </div>
  );
};

export default ChatMessageAssistantSkeleton;
