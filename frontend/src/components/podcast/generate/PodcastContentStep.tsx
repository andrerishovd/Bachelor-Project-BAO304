import { useTranslation } from "react-i18next";
import { useChatContext } from "../../../contexts/ChatContext";
import FilePreview from "../../chat/input/FilePreview";
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
import type { UseFileUploadReturn } from "../../../hooks/useFileUpload";

interface PodcastContentStepProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  selectedChatIds: Set<string>;
  onToggleChat: (id: string) => void;
  fileUpload: UseFileUploadReturn;
}

/**
 * PodcastContentStep
 *
 * Left panel of the podcast generator.
 * Handles content input: notes, file uploads, and chat selection.
 */
const PodcastContentStep = ({
  notes,
  onNotesChange,
  selectedChatIds,
  onToggleChat,
  fileUpload,
}: PodcastContentStepProps) => {
  const { t } = useTranslation("podcast");
  const { chats } = useChatContext();
  const {
    uploadedFiles,
    removeFile,
    getRootProps,
    getInputProps,
    isDragActive,
  } = fileUpload;

  return (
    <div className="p-6 flex flex-col gap-6 overflow-y-auto">
      <h2 className="font-semibold">{t("stepContent")}</h2>

      {/* Notes */}
      <section className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-medium text-sm">
          <DocumentTextIcon className="w-4 h-4" />
          {t("notes")}
        </label>
        <textarea
          className="textarea textarea-bordered w-full h-36 resize-none"
          placeholder={t("notesPlaceholder")}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </section>

      <div className="divider my-0">{t("or")}</div>

      {/* File upload */}
      <section className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-medium text-sm">
          <DocumentArrowUpIcon className="w-4 h-4" />
          {t("uploadFiles")}
        </label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-base-300 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-base-content/60">
            {isDragActive ? t("dropFilesHere") : t("dragOrClick")}
          </p>
        </div>
        {uploadedFiles.length > 0 && (
          <FilePreview files={uploadedFiles} onRemove={removeFile} />
        )}
      </section>

      <div className="divider my-0">{t("or")}</div>

      {/* Chat selection */}
      <section className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-medium text-sm">
          <ChatBubbleLeftRightIcon className="w-4 h-4" />
          {t("selectChats")}
        </label>
        {chats.length === 0 ? (
          <p className="text-sm text-base-content/50">{t("noChats")}</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {chats.map((chat) => (
              <li key={chat.id}>
                <label className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-base-200 transition-colors">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                    checked={selectedChatIds.has(chat.id)}
                    onChange={() => onToggleChat(chat.id)}
                  />
                  <span className="text-sm truncate">{chat.title}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PodcastContentStep;
