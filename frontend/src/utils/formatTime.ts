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

/**
 * Formats a Date object as DD.MM.YYYY.
 * @param date - The date to format
 */
export const formatCalendarDate = (date: Date): string => {
  return date.toLocaleDateString("nb-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Formats a Date object as HH:MM.
 * @param date - The date to extract time from
 */
export const formatCalendarTime = (date: Date): string => {
  return date.toLocaleTimeString("nb-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Calculates the number of days until a given date.
 * @param date - The target date
 * @returns Number of days until the date (negative if in the past)
 */
export const getDaysUntil = (date: Date): number => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

/**
 * Returns a human-readable string describing how far away an event is.
 * Intended for use with i18n - requires a translation function.
 *
 * @param daysUntil - Number of days until the event (negative if past)
 * @param t - i18next translation function
 *
 * @deprecated Used only in EventsListCard which uses mock data.
 * Will need Canvas API integration to be useful.
 */
export const formatDaysUntil = (
  daysUntil: number,
  t: (key: string, options?: object) => string,
): string => {
  if (daysUntil < 0) return t("dashboard:eventPast");
  if (daysUntil === 0) return t("dashboard:eventToday");
  if (daysUntil === 1) return t("dashboard:eventTomorrow");
  return t("dashboard:eventInDays", { count: daysUntil });
};
