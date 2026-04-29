import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/**
 * AppLogoSm
 *
 * Displays the app name in the sidebar.
 * Shows short name when collapsed, full name when expanded.
 */
const AppLogoSm = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  return (
    <li>
      <button onClick={() => navigate("/")}>
        <h1 className="is-drawer-open:hidden font-kristiania">
          {t("appNameShort")}
        </h1>
        <h1 className="is-drawer-close:hidden">{t("appNameLong")}</h1>
      </button>
    </li>
  );
};

export default AppLogoSm;
