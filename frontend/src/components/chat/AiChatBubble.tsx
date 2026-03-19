import { useTranslation } from "react-i18next";
import type { IChatMessage } from "../../interfaces/chat/IChatMessage";
import Markdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { formatMessageTime } from "../../utils/formatTime";

interface AiChatBubbleProps {
  message: IChatMessage;
}

/**
 * AiChatBubble
 *
 * Renders a single AI message as a paper-like card.
 * Supports full Markdown rendering with syntax-highlighted code blocks.
 *
 * @property message - The AI message to display, including body and timestamp
 */
const AiChatBubble = ({ message }: AiChatBubbleProps) => {
  const { t } = useTranslation("chat");
  const { copied, copyToClipboard } = useCopyToClipboard();

  return (
    <div className="w-full mb-4">
      <div className="bg-base-100 rounded-lg shadow-sm border border-base-200 px-6 py-5 w-full">
        <div className="prose max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:rounded-none">
          <Markdown
            components={{
              // Render fenced code blocks with CodeBlock, inline code as-is
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <CodeBlock language={match[1]}>
                    {String(children).replace(/\n$/, "")}
                  </CodeBlock>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.body}
          </Markdown>
        </div>

        {/* Footer: timestamp left, copy button right */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-base-200 text-xs text-base-content/40">
          <span>
            {formatMessageTime(message.localDateTime)}
          </span>
          <div
            className={`tooltip tooltip-top ${copied ? "tooltip-success" : ""}`}
            data-tip={copied ? t("copied") : t("copyResponse")}
          >
            <button
              onClick={() => copyToClipboard(message.body)}
              className="btn btn-xs btn-ghost opacity-60 hover:opacity-100"
            >
              {copied ? (
                <ClipboardDocumentCheckIcon className="w-4 h-4" />
              ) : (
                <ClipboardIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatBubble;
