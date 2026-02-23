import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { IChatMessage } from "../../interfaces/chat/IChatMessage";
import Markdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

interface AiChatBubbleProps {
  message: IChatMessage;
}

/**
 * AiChatBubble
 *
 * Renders a single AI message in the chat interface.
 * Supports full Markdown rendering with syntax-highlighted code blocks.
 *
 * @property message - The AI message to display, including body and timestamp
 *
 * @example
 * <AiChatBubble message={message} />
 */

const AiChatBubble = ({ message }: AiChatBubbleProps) => {
  const { t } = useTranslation("chat");
  const { copied, copyToClipboard } = useCopyToClipboard();

  const handleCopyAll = () => copyToClipboard(message.body);

  return (
    <div className="chat chat-start">
      <div className="chat-bubble text-neutral-content">
        <div className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:rounded-none">
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
      </div>

      {/* Footer: timestamp left, copy button right */}
      <div className="chat-footer opacity-50 text-xs flex items-center justify-between w-full">
        <span>
          {new Date(message.localDateTime).toLocaleTimeString("nb-NO", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <div
          className={`tooltip tooltip-top ${copied ? "tooltip-success" : ""}`}
          data-tip={copied ? t("copied") : t("copyResponse")}
        >
          <button
            onClick={handleCopyAll}
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
  );
};

export default AiChatBubble;
