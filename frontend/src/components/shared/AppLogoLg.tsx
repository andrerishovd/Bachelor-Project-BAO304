import { useTranslation } from "react-i18next";

interface AppLogoProps {
  useKristianiaFont?: boolean;
  stacked?: boolean; // om ordene skal stå over hverandre
}

/**
 * AuthLogoLg
 *
 * Displays the stacked app name on the authentication page.
 * Uses the Kristiania Transform font with tight line height.
 * Note this does not use i18n for the stacked name.
 *
 * @property useKristianiaFont - Whether to use the Kristiania Transform font (default: true)
 * @property stacked - Whether to stack the words vertically with tight line height (default: false)
 *
 */

const AuthLogoLg = ({
  useKristianiaFont = true,
  stacked = false,
}: AppLogoProps) => {
  const { t } = useTranslation("common");
  const fontClass = useKristianiaFont ? "font-kristiania" : "";

  /* appNameStacked = t("description.header").split(" ").map((word, i) */

  return (
    <>
      {stacked ? (
        <h1
          className={`is-drawer-close:hidden text-5xl font-bold ${fontClass} flex flex-col`}
        >
          <span>Study</span>
          <span className="-mt-3.5">Buddy</span>
        </h1>
      ) : (
        <h1 className={`is-drawer-close:hidden ${fontClass}`}>
          {t("appNameLong")}
        </h1>
      )}
    </>
  );
};

export default AuthLogoLg;
