import i18n from "i18next";

const getLocale = () => (i18n.language === "no" ? "nb-NO" : "en-GB");

/**
 * Formats a duration in seconds to mm:ss string.
 * @example formatTime(125) // "2:05"
 */
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

/**
 * Formats an ISO 8601 datetime string to a localized time string (HH:mm).
 * Used for chat message timestamps.
 * @example formatMessageTime("2026-02-12T14:21:44") // "14:21"
 */
export const formatMessageTime = (localDateTime: string): string => {
  return new Date(localDateTime).toLocaleTimeString(getLocale(), {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formats the timestamp of the last message in a chat.
 * Returns empty string if no messages exist.
 * @example formatLastMessageTime(chat) // "12. mar 14:21"
 */
export const formatLastMessageTime = (
  messageDtoList: { localDateTime: string }[],
): string => {
  if (!messageDtoList || messageDtoList.length === 0) return "";
  const last = messageDtoList[messageDtoList.length - 1];
  return new Date(last.localDateTime).toLocaleString(getLocale(), {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};
