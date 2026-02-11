import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../contexts/ThemeContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ThemeDropdown = () => {
  const { theme, setCustomTheme, followSystem } = useThemeContext();
  const { t } = useTranslation("accessibility");
  const themes = [
    { value: "kristiania", label: "Kristiania" },
    { value: "kristiania-dark", label: "Kristiania Mørk" },
    /*     { value: "light", label: "Lys default" },
    { value: "dark", label: "Mørk default" },
    { value: "retro", label: "Retro" },
    { value: "cyberpunk", label: "Cyberpunk" },
    { value: "synthwave", label: "Synthwave" },
    { value: "valentine", label: "Valentine" },
    { value: "aqua", label: "Aqua" }, */
  ];

  return (
    <div className="dropdown mb-72">
      <div tabIndex={0} role="button" className="btn m-1">
        {t("theme")}
        <ChevronDownIcon className="my-1.5 inline-block size-2 shrink-0" />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Følg system"
            checked={theme === null} // ✅ Aktiv når ingen tema er valgt
            onChange={followSystem}
          />
        </li>

        {themes.map(({ value, label }) => (
          <li key={value}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
              aria-label={label}
              value={value}
              checked={theme === value} // ✅ Marker valgt tema
              onChange={() => setCustomTheme(value)} // ✅ Oppdater tema
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeDropdown;
