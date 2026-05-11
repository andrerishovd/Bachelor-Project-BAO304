import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../contexts/ThemeContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { THEMES, FOLLOW_SYSTEM_KEY } from "../../config/themes";

const ThemeDropdown = () => {
  const { theme, themeLabelKey, setCustomTheme, followSystem } =
    useThemeContext();
  const { t } = useTranslation("settings");

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1"
        aria-label={t("selectTheme")}
        aria-haspopup="listbox"
      >
        {t(themeLabelKey)}
        <ChevronDownIcon
          className="my-1.5 inline-block size-2 shrink-0"
          aria-hidden="true"
        />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
        role="listbox"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
            aria-label={t("themeFollowSystem")}
            checked={theme === null}
            onChange={followSystem}
          />
        </li>

        {THEMES.map(({ value, labelKey }) => (
          <li key={value}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label={t(labelKey)}
              value={value}
              checked={theme === value}
              onChange={() => setCustomTheme(value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeDropdown;
