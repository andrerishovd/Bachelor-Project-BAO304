import { useTranslation } from "react-i18next";
import type { IChatMessage } from "../../../interfaces/chat/IChatMessage";
import Markdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import { formatMessageTime } from "../../../utils/formatTime";
import BookReference from "./reference/BookReference";
import { extractISBNs, italicizeISBNs } from "../../../utils/isbn";
import { extractUrls } from "../../../utils/url";
import ExternalLinkReference from "./reference/ExternalLinkReference";
import MermaidBlock from "./MermaidBlock";

interface ChatMessageAssistantContentProps {
  message: IChatMessage;
}

/**
 * ChatMessageAssistantContent
 *
 * Renders the content of a single assistant message as a paper-like card.
 * Supports full Markdown rendering with syntax-highlighted code blocks.
 *
 * @property message - The assistant message to display
 */
const ChatMessageAssistantContent = ({
  message,
}: ChatMessageAssistantContentProps) => {
  const { t } = useTranslation("chat");
  const { copied, copyToClipboard } = useCopyToClipboard();

  const isbns = extractISBNs(message.body);
  const urls = extractUrls(message.body);
  /* console.log(message.body); */

  return (
    <div className="px-6 py-5">
      <div className="prose max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:rounded-none">
        <Markdown
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match?.[1];

              if (language === "mermaid") {
                return <MermaidBlock chart={String(children).trim()} />;
              }

              return language ? (
                <CodeBlock language={language}>
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
          {italicizeISBNs(message.body)}
        </Markdown>
      </div>

      {/* Shows information regarding litterature if the AI response contains an ISBN */}
      {isbns.length > 0 && (
        <div className="mt-4 pt-3 border-t border-base-300 flex flex-col gap-2">
          <p className="text-xs text-base-content/40 font-medium">
            {t("referencedBooks")}
          </p>
          {isbns.map((isbn) => (
            <BookReference key={isbn} isbn={isbn} />
          ))}
        </div>
      )}

      {/* Shows information regarding litterature if the AI response contains an url */}
      {urls.length > 0 && (
        <div className="mt-4 pt-3 border-t border-base-300 flex flex-col gap-2">
          <p className="text-xs text-base-content/40 font-medium">
            {t("referencedLinks")}
          </p>
          {urls.map((url) => (
            <ExternalLinkReference key={url} url={url} />
          ))}
        </div>
      )}

      {/* Footer: timestamp left, copy button right */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-base-300 text-xs text-base-content/50">
        <span>{formatMessageTime(message.localDateTime)}</span>
        <div
          className={`tooltip tooltip-top ${copied ? "tooltip-success" : ""}`}
          data-tip={copied ? t("copied") : t("copyResponse")}
        >
          <button
            onClick={() => copyToClipboard(message.body)}
            className="btn btn-xs btn-ghost opacity-80 hover:opacity-100"
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

export default ChatMessageAssistantContent;
