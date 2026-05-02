import { motion, AnimatePresence } from "motion/react";
import type { IChatMessage } from "../../../interfaces/chat/IChatMessage";
import ChatMessageAssistantContent from "./ChatMessageAssistantContent";
import ChatMessageAssistantSkeleton from "../skeletons/ChatMessageAssistantSkeleton";

interface ChatMessageAssistantProps {
  message?: IChatMessage;
  isLoading?: boolean;
}

/**
 * ChatMessageAssistant
 *
 * Animated wrapper for assistant messages.
 * Switches between skeleton and content with a smooth height + fade transition.
 *
 * @property message - The assistant message to display
 * @property isLoading - Whether to show the skeleton instead of content
 */
const ChatMessageAssistant = ({
  message,
  isLoading = false,
}: ChatMessageAssistantProps) => {
  return (
    <motion.div
      layout
      className="w-full mb-4 bg-base-200 rounded-lg shadow-sm border border-base-200 overflow-hidden"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ChatMessageAssistantSkeleton />
          </motion.div>
        ) : message ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            <ChatMessageAssistantContent message={message} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChatMessageAssistant;
