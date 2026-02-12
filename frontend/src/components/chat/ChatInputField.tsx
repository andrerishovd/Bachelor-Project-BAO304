// src/components/chat/ChatInputField.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send, Paperclip } from "tabler-icons-react";
import { useFileUpload } from "../../hooks/useFileUpload";
import FilePreview from "./FilePreview";
import type { IChatInputFieldProps } from "../../interfaces/chat/IChatInputFieldProps";

const ChatInputField = ({ chatId }: IChatInputFieldProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const { t } = useTranslation("chat");

  // ✅ Alle file upload logikk i custom hook
  const {
    uploadedFiles,
    removeFile,
    clearFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    openFilePicker,
  } = useFileUpload();

  const handleSend = () => {
    if (!message.trim() && uploadedFiles.length === 0) return;

    console.log("Sending message to chat:", chatId);
    console.log("Message:", message);
    console.log("Files:", uploadedFiles);

    // TODO: Send til backend

    // Reset
    setMessage("");
    clearFiles();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* ✅ Separat file preview komponent */}
      <FilePreview files={uploadedFiles} onRemove={removeFile} />

      {/* Input container */}
      <div
        {...getRootProps()}
        className={`
          input input-bordered flex items-center gap-2 w-full h-auto min-h-12 py-2
          ${isDragActive ? "border-primary border-2 bg-primary/10" : ""}
        `}
      >
        <input {...getInputProps()} />

        <input
          type="text"
          className="grow bg-transparent outline-none py-1"
          placeholder={
            isDragActive ? t("dropFilesHere") : t("inputFieldHelpText")
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Attach button */}
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-circle"
          onClick={openFilePicker}
          aria-label={t("attachFile")}
        >
          <Paperclip className="size-5" aria-hidden="true" />
        </button>

        {/* Send button */}
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle"
            onClick={handleSend}
            disabled={!message.trim() && uploadedFiles.length === 0}
            aria-label={t("sendMessage")}
          >
            <Send className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInputField;
