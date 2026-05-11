import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { LANGUAGES } from "../../config/languages";
import "flag-icons/css/flag-icons.min.css";

/**
 * LanguageDropdown
 *
 * Dropdown for selecting the application language.
 * Shows the current language as the button label with flag icon.
 */
const LanguageDropdown = () => {
  const { t, i18n } = useTranslation("settings");

  const currentLanguage =
    LANGUAGES.find((l) => l.value === i18n.language) ?? LANGUAGES[0];

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1"
        aria-label={t("selectLanguage")}
        aria-haspopup="listbox"
      >
        <span
          className={`fi fi-${currentLanguage.flagCode}`}
          aria-hidden="true"
        />
        {t(currentLanguage.labelKey)}
        <ChevronDownIcon
          className="my-1.5 inline-block size-2 shrink-0"
          aria-hidden="true"
        />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
      >
        {LANGUAGES.map(({ value, labelKey }) => (
          <li key={value}>
            <input
              type="radio"
              name="language-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label={`${t(labelKey)}`}
              value={value}
              checked={i18n.language === value}
              onChange={() => i18n.changeLanguage(value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
