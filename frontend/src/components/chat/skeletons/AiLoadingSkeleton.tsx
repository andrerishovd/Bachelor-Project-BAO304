import { useTranslation } from "react-i18next";

/**
 * AiThinkingSkeleton
 *
 * Displayed in the chat while waiting for an AI response.
 *
 * @example
 * {isWaitingForResponse && <AiThinkingSkeleton />}
 */
const AiThinkingSkeleton = () => {
  const { t } = useTranslation("chat");

  return (
    <div className="chat chat-start">
      <div className="chat-bubble chat-bubble-neutral">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-48"></div>
          <div className="skeleton h-3 w-36"></div>
          <div className="skeleton h-3 w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default AiThinkingSkeleton;
