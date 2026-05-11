import { Paperclip, X } from "tabler-icons-react";
import type { IFilePreviewProps } from "../../../interfaces/chat/IFilePreviewProps";
import { useTranslation } from "react-i18next";

/**
 * FilePreview
 *
 * Displays a list of selected files as removable badges.
 * Shown above the chat input field when files are attached.
 * Returns null if no files are selected.
 *
 * @property files - List of files to display
 * @property onRemove - Callback with the index of the file to remove
 *
 * @example
 * <FilePreview files={uploadedFiles} onRemove={removeFile} />
 */

const FilePreview = ({ files, onRemove }: IFilePreviewProps) => {
  const { t } = useTranslation("accessibility");
  if (files.length === 0) return null;
  return (
    <div
      className="flex flex-wrap gap-2"
      role="list"
      aria-label={t("attachedFiles")}
    >
      {files.map((file, index) => (
        <div
          key={index}
          className="badge badge-primary gap-2 p-3"
          role="listitem"
        >
          <Paperclip className="size-4" aria-hidden="true" />
          <span className="text-xs truncate max-w-[150px]">{file.name}</span>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="hover:text-error transition-colors"
            aria-label={t("removeFile", { name: file.name })}
          >
            <X aria-hidden="true" className="size-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilePreview;
