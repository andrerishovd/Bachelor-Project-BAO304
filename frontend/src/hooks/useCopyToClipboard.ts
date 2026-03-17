
import { useState } from "react";

/**
 * useCopyToClipboard
 *
 * Custom hook for copying text to the clipboard.
 * Provides a copied state that resets after a given duration.
 *
 * @param resetDelay - Duration in milliseconds before copied resets to false (default: 2000)
 * @returns copied - Whether the text was recently copied
 * @returns copyToClipboard - Function to copy a string to the clipboard
 *
 * @example
 * const { copied, copyToClipboard } = useCopyToClipboard();
 * copyToClipboard("Hello world");
 */
const useCopyToClipboard = (resetDelay = 2000) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), resetDelay);
  };

  return { copied, copyToClipboard };
};

export default useCopyToClipboard;
