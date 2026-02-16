/**
 *  Simple preview of files
 *
 */

import { Paperclip, X } from "tabler-icons-react";
import type { IFilePreviewProps } from "../../interfaces/chat/IFilePreviewProps";

const FilePreview = ({ files, onRemove }: IFilePreviewProps) => {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file, index) => (
        <div key={index} className="badge badge-primary gap-2 p-3">
          <Paperclip className="size-4" aria-hidden="true" />
          <span className="text-xs truncate max-w-[150px]">{file.name}</span>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="hover:text-error transition-colors"
            aria-label={`Remove ${file.name}`}
          >
            <X className="size-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilePreview;
