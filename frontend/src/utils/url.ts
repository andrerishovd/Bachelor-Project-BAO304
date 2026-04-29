import ExternalLinkReference from "../components/chat/messages/reference/ExternalLinkReference";

/**
 * Extracts all unique URLs from a text string.
 * Supports http and https URLs.
 */
export const extractUrls = (text: string): string[] => {
  const pattern = /https?:\/\/[^\s)>\]"]+/g;
  return [...new Set(text.match(pattern) ?? [])];
};
