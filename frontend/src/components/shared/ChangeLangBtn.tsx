import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";
// https://react.i18next.com/guides/quick-start
// https://github.com/i18next/react-i18next/blob/master/example/react/src/App.js

const ChangeLangBtn = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <button
        className="btn"
        type="button"
        onClick={() => i18n.changeLanguage("no")}
        aria-label={t("accessibility:changeLangAriaNO")}
      >
        <span className="fi fi-no"></span>
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => i18n.changeLanguage("en")}
        aria-label={t("accessibility:changeLangAriaEN")}
      >
        <span className="fi fi-gb"></span>
      </button>
    </div>
  );
};

export default ChangeLangBtn;
