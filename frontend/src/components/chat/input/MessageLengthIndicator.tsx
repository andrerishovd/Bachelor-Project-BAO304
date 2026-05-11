import { useTranslation } from "react-i18next";
import {
  MAX_MESSAGE_LENGTH,
  MESSAGE_LENGTH_WARNING,
} from "../../../config/messageLimits";

interface MessageLengthIndicatorProps {
  length: number;
}

/**
 * MessageLengthIndicator
 *
 * Shows a radial progress indicator for message length.
 * Changes color as the user approaches the limit.
 * Shows remaining characters when near the warning threshold.
 *
 * @property length - Current message length in characters
 */
const MessageLengthIndicator = ({ length }: MessageLengthIndicatorProps) => {
  const { t } = useTranslation("accessibility");
  const remaining = MAX_MESSAGE_LENGTH - length;
  const percentage = Math.min(
    Math.round((length / MAX_MESSAGE_LENGTH) * 100),
    100,
  );
  const isNearLimit = length >= MESSAGE_LENGTH_WARNING;
  const isAtLimit = length >= MAX_MESSAGE_LENGTH;

  const colorClass = isAtLimit
    ? "text-error"
    : isNearLimit
      ? "text-warning"
      : "text-base-content/20";

  return (
    <div
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t("charactersRemaining", { count: remaining })}
      className={`radial-progress ${colorClass} transition-colors duration-200 shrink-0`}
      style={
        {
          "--value": percentage,
          "--size": "1rem",
          "--thickness": "2px",
        } as React.CSSProperties
      }
    >
      {isNearLimit && (
        <span
          className={`text-[8px] font-medium ${isAtLimit ? "text-error" : "text-warning"}`}
        >
          {percentage}%
        </span>
      )}
    </div>
  );
};

export default MessageLengthIndicator;
