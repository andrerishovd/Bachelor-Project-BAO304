/**
 * AiThinkingSkeleton
 *
 * Displayed while waiting for an AI response.
 * Matches the layout of AiChatBubble.
 */
const AiThinkingSkeleton = () => {
  return (
    <div className="w-full mb-4">
      <div className="bg-base-100 rounded-lg shadow-sm border border-base-200 px-6 py-5 w-full">
        {/* Mimics prose content */}
        <div className="flex flex-col gap-3">
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-5/6" />
          <div className="skeleton h-3 w-4/6" />
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-3/6" />
        </div>

        {/* Mimics footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-base-200">
          <div className="skeleton h-3 w-8" />
          <div className="skeleton h-6 w-6 rounded" />
        </div>
      </div>
    </div>
  );
};

export default AiThinkingSkeleton;
