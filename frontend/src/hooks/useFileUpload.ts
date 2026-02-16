/**
 * hook for uploading files
 * uses react-dropzone in order to give the user:
 * - drag and drop files to "dropzone"
 * - click to open file explorer
 * - preview of uploaded files
 * - delete files
 *
 * sets the accepted files
 *
 **/

import { useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const dropzoneConfig: DropzoneOptions = {
    onDrop: (acceptedFiles: File[]) => {
      setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
    },
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "application/pdf": [".pdf"],
      "text/*": [".txt", ".md"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  };

  const { getRootProps, getInputProps, isDragActive, open } =
    useDropzone(dropzoneConfig);

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setUploadedFiles([]);
  };

  return {
    uploadedFiles,
    removeFile,
    clearFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    openFilePicker: open,
  };
};
