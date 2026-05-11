import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";

interface CodeBlockProps {
  language: string;
  children: string;
}

/**
 * CodeBlock
 *
 * Renders a syntax-highlighted code block with a topbar showing
 * the language name and a copy-to-clipboard button.
 *
 * Uses react-syntax-highlighter with the oneDark theme.
 * The topbar background matches the oneDark theme background (#282c34)
 * to appear as a unified block.
 *
 * @property language - The programming language for syntax highlighting (e.g. "python", "typescript")
 * @property children - The raw code string to display
 *
 * @example
 * <CodeBlock language="typescript">{codeString}</CodeBlock>
 */
const CodeBlock = ({ language, children }: CodeBlockProps) => {
  const { t } = useTranslation("chat");
  const { copied, copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => copyToClipboard(children);

  return (
    <div
      className="not-prose rounded-lg overflow-hidden my-2"
      role="region"
      aria-label={t("codeBlockLabel", { language })}
    >
      {/* Topbar: language label left, copy button right */}
      <div className="flex justify-between items-center px-4 py-1 bg-[#282c34] text-neutral-400 text-xs border-b border-neutral-600">
        <span>{language}</span>
        <div
          className={`tooltip tooltip-left ${copied ? "tooltip-success" : ""}`}
          data-tip={copied ? t("codeCopied") : t("copyCode")}
        >
          <button
            onClick={handleCopy}
            aria-label={copied ? t("codeCopied") : t("copyCode")}
            className="btn btn-xs btn-ghost opacity-60 hover:opacity-100"
          >
            {copied ? (
              <ClipboardDocumentCheckIcon
                className="w-4 h-4"
                aria-hidden="true"
              />
            ) : (
              <ClipboardIcon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <SyntaxHighlighter
        style={oneDark}
        language={language}
        customStyle={{ margin: 0, borderRadius: 0 }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
