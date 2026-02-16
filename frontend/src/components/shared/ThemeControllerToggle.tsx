import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../contexts/ThemeContext";
import { Moon, Sun } from "tabler-icons-react";

const ThemeControllerToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
  const { t } = useTranslation("accessibility");

  const isDark =
    theme !== null
      ? theme === "kristiania-dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <label className="flex items-center cursor-pointer gap-2">
      <Sun className="my-1.5 inline-block size-4 shrink-0" />
      <input
        type="checkbox"
        className="toggle theme-controller"
        checked={isDark}
        onChange={toggleTheme}
        aria-label={t("toggleDarkMode")}
      />

      <Moon className="my-1.5 inline-block size-4 shrink-0" />
    </label>
  );
};

export default ThemeControllerToggle;
