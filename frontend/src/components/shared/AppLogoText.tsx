import { LOGO_CONFIG } from "../../config/logo.config";

type LogoSize = "sm" | "lg";

interface AppLogoTextProps {
  size?: LogoSize;
  stacked?: boolean;
  short?: boolean;
}
/**
 * AppLogoText
 *
 * Shared base component for rendering the app name.
 * Font choice is controlled via logo.config.ts.
 *
 * @property size - Controls font size: "sm" for sidebar, "lg" for auth page (default: "sm")
 * @property stacked - Whether to stack the words vertically with tight line height (default: false)
 *
 * @example
 * <AppLogoText />                    // small, inline
 * <AppLogoText size="lg" stacked />  // large, stacked
 */
const AppLogoText = ({
  size = "sm",
  stacked = false,
  short = false,
}: AppLogoTextProps) => {
  const fontClass = LOGO_CONFIG.useKristianiaFont ? "font-kristiania" : "";
  const sizeClass = size === "lg" ? "text-5xl" : "text-lg";
  const trackingClass = short ? "tracking-[-0.4em]" : "tracking-[-0.15em]";
  const name = short ? LOGO_CONFIG.shortName : LOGO_CONFIG.longName;

  if (stacked) {
    return (
      <span className={`${sizeClass} font-bold ${fontClass} flex flex-col`}>
        <span className={trackingClass}>Study</span>
        <span className={`-mt-3.5 ${trackingClass}`}>Buddy</span>
      </span>
    );
  }

  return (
    <h1 className={`${sizeClass} font-bold ${fontClass} ${trackingClass}`}>
      {name}
    </h1>
  );
};

export default AppLogoText;
