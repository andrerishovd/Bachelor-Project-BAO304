import { useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { FILE_UPLOAD_CONFIG } from "../config/fileUpload.config";
export type UseFileUploadReturn = ReturnType<typeof useFileUpload>;

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

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const dropzoneConfig: DropzoneOptions = {
    onDrop: (acceptedFiles: File[]) => {
      setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
    },
    noClick: true,
    noKeyboard: true,
    accept: FILE_UPLOAD_CONFIG.acceptedTypes,
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
