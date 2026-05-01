// src/config/fileUpload.config.ts

/**
 * File upload configuration.
 * Enable or disable file types here as backend support is added.
 *
 * Note: Images are currently accepted by the backend but only their
 * text content is processed. They are therefore disabled here.
 */
export const FILE_UPLOAD_CONFIG = {
  acceptedTypes: {
    "application/pdf": [".pdf"],
    "text/plain": [".txt"],
    "text/markdown": [".md"],
    "application/vnd.ms-powerpoint": [".ppt"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      [".pptx"],
    // "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"], // not yet supported
    // "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"], // images only return "image 18" etc.
  },
} as const;
