import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send, Paperclip } from "tabler-icons-react";
import { useFileUpload } from "../../hooks/useFileUpload";
import FilePreview from "./FilePreview";
import type { IChatInputFieldProps } from "../../interfaces/chat/IChatInputFieldProps";
import { ChatService } from "../../services/ChatService";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../contexts/ChatContext";
import { useAlertContext } from "../../contexts/AlertContext";

interface ExtendedChatInputFieldProps extends IChatInputFieldProps {
  isNewChat?: boolean;
  onWaitingForResponse?: (isWaiting: boolean) => void;
}

/**
 * ChatInputField
 *
 * Handles message input and sending for both new and existing chats.
 * Supports file uploads via drag-and-drop or file picker.
 * Performs optimistic updates to show user messages immediately.
 *
 * @property chatId - ID of the existing chat, undefined for new chats
 * @property isNewChat - Whether this is a new chat
 * @property onWaitingForResponse - Callback to notify parent of AI response loading state
 */
const ChatInputField = ({
  chatId,
  isNewChat,
  onWaitingForResponse,
}: ExtendedChatInputFieldProps) => {
  const { refetch, getChatById, updateChat } = useChatContext();
  const { showError } = useAlertContext();
  const [isLoading, setIsLoading] = useState(false);
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

    const trimmedMessage = message.trim();
    setMessage("");
    clearFiles();

    // New chat flow
    if (isNewChat) {
      setIsLoading(true);
      try {
        const newChat = await ChatService.createChat(trimmedMessage);
        await refetch();
        navigate(`/chat/${newChat.chatId}`);
      } catch {
        showError(t("sendError"));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (!chatId) return;

    // Optimistic update - show user message immediately
    const currentChat = getChatById(chatId);
    if (currentChat) {
      updateChat({
        ...currentChat,
        messageDtoList: [
          ...currentChat.messageDtoList,
          {
            id: `temp-${Date.now()}`,
            body: trimmedMessage,
            localDateTime: new Date().toISOString(),
            senderType: "USER" as const,
          },
        ],
      });
    }

    // Wait for AI response
    onWaitingForResponse?.(true);
    try {
      await ChatService.sendMessage(chatId, trimmedMessage);
      // Replace optimistic message with real data from backend
      const updatedChat = await ChatService.getChatById(chatId);
      updateChat(updatedChat);
    } catch {
      showError(t("sendError"));
    } finally {
      onWaitingForResponse?.(false);
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
      {/* File preview */}
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
          placeholder={isDragActive ? t("dropFilesHere") : t("inputFieldHelpText")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
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
          <span className="loading loading-spinner loading-xs" />
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