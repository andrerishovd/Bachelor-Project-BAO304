import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send, Paperclip } from "tabler-icons-react";
import { useFileUpload } from "../../hooks/useFileUpload";
import FilePreview from "./FilePreview";
import type { IChatInputFieldProps } from "../../interfaces/chat/IChatInputFieldProps";
import { ChatService } from "../../services/ChatService";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../contexts/ChatContext";

interface ExtendedChatInputFieldProps extends IChatInputFieldProps {
  isNewChat?: boolean;
}

const ChatInputField = ({
  chatId,
  onSend,
  isNewChat,
  onMessageSent,
}: ExtendedChatInputFieldProps) => {
  const { refetch } = useChatContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const { t } = useTranslation("chat");
  const navigate = useNavigate();

  const {
    uploadedFiles,
    removeFile,
    clearFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    openFilePicker,
  } = useFileUpload();

  const handleSend = async () => {
    if (!message.trim() && uploadedFiles.length === 0) return;

    setIsLoading(true);
    try {
      if (isNewChat) {
        const newChat = await ChatService.createChat(message);
        await refetch();
        navigate(`/chat/${newChat.chatId}`);
      } else {
        if (!chatId) {
          throw new Error("chatId is undefined - cannot send message");
        }
        await ChatService.sendMessage(chatId, message);
        await onMessageSent?.();
      }

      setMessage("");
      clearFiles();
    } catch (error) {
      alert("Could not send message. Check that the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* preview component */}
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
