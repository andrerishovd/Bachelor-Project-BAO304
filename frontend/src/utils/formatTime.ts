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
