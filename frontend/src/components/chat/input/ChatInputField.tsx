// src/components/chat/input/ChatInputField.tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Send, Paperclip } from "tabler-icons-react";
import { useFileUpload } from "../../../hooks/useFileUpload";
import FilePreview from "./FilePreview";
import type { IChatInputFieldProps } from "../../../interfaces/chat/IChatInputFieldProps";
import { ChatService } from "../../../services/ChatService";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../../../contexts/ChatContext";
import { useAlertContext } from "../../../contexts/AlertContext";
import MessageLengthIndicator from "./MessageLengthIndicator";
import { MAX_MESSAGE_LENGTH } from "../../../config/messageLimits";

interface ExtendedChatInputFieldProps extends IChatInputFieldProps {
  isNewChat?: boolean;
  onWaitingForResponse?: (isWaiting: boolean) => void;
}

/**
 * ChatInputField
 *
 * Handles message input and sending for both new and existing chats.
 * Supports file uploads via drag-and-drop or file picker.
 *
 * File upload flow:
 * 1. User selects or drops files onto the input field
 * 2. Files are uploaded to /api/chat/upload (multipart/form-data)
 * 3. Files are stored in the vector database on the backend
 * 4. User sends a message referencing the uploaded content
 *
 * Note: Images are accepted but only their text content is processed.
 * PDFs with images will only have their text content extracted.
 *
 * Message flow:
 * 1. User types a message and presses Enter or clicks Send
 * 2. An optimistic update immediately shows the message in the thread
 * 3. The message is sent to the backend via ChatService
 * 4. The chat is refreshed with the real AI response
 *
 * @property chatId - ID of the existing chat, undefined for new chats
 * @property isNewChat - Whether this is a new chat session
 * @property onWaitingForResponse - Callback to notify parent of AI response loading state
 */
const ChatInputField = ({
  chatId,
  isNewChat,
  onWaitingForResponse,
}: ExtendedChatInputFieldProps) => {
  const { refetch, getChatById, updateChat } = useChatContext();
  const { showError, showSuccess } = useAlertContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const { t } = useTranslation("chat");
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    uploadedFiles,
    removeFile,
    clearFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    openFilePicker,
  } = useFileUpload();

  /**
   * Uploads all pending files to the backend vector database.
   * Files are uploaded sequentially.
   * Shows a success or error alert for each file.
   */
  const handleUploadFiles = async () => {
    if (uploadedFiles.length === 0) return;
    setIsUploading(true);
    try {
      for (const file of uploadedFiles) {
        await ChatService.uploadFile(file);
        showSuccess(t("fileUploaded", { name: file.name }));
      }
      clearFiles();
    } catch {
      showError(t("fileUploadError"));
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handles sending a message.
   * Uploads any pending files before sending the message.
   * For new chats, creates the chat first then navigates to it.
   * For existing chats, performs an optimistic update then awaits AI response.
   */
  const handleSend = async () => {
    if (!message.trim() && uploadedFiles.length === 0) return;
    if (message.length > MAX_MESSAGE_LENGTH) return;

    const trimmedMessage = message.trim();
    setMessage("");

    // Upload files first if any are pending
    await handleUploadFiles();

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

    // Optimistic update – show user message immediately before AI responds
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

    // Send message and wait for AI response
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /**
   * Auto-resizes the textarea to fit its content, up to max-h-48.
   */
  const handleTextareaResize = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  /**
   * Handles message input changes.
   * Enforces the MAX_MESSAGE_LENGTH character limit.
   */
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_MESSAGE_LENGTH) {
      showError(t("messageTooLong", { max: MAX_MESSAGE_LENGTH }));
      return;
    }
    setMessage(e.target.value);
    handleTextareaResize();
  };

  const isBusy = isLoading || isUploading;

  return (
    <div className="flex flex-col gap-2">
      {/* Attached file previews */}
      <FilePreview files={uploadedFiles} onRemove={removeFile} />

      {/* Input container – also acts as drag-and-drop zone */}
      <div
        {...getRootProps()}
        className={`
          input input-bordered flex items-center gap-2 w-full h-auto min-h-12 py-2
          ${isDragActive ? "border-primary border-2 bg-primary/10" : ""}
        `}
      >
        <input {...getInputProps()} />

        <textarea
          ref={textareaRef}
          className="grow bg-transparent outline-none py-1 resize-none overflow-y-auto min-h-[1.5rem] max-h-48"
          placeholder={
            isDragActive ? t("dropFilesHere") : t("inputFieldHelpText")
          }
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          disabled={isBusy}
          rows={1}
        />

        {/* File picker button */}
        <div className="tooltip" data-tip={t("accessibility:attachFile")}>
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle"
            onClick={openFilePicker}
            aria-label={t("attachFile")}
            disabled={isBusy}
          >
            <Paperclip className="size-5" aria-hidden="true" />
          </button>
        </div>

        <MessageLengthIndicator length={message.length} />

        {/* Send / loading indicator */}
        {isBusy ? (
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
