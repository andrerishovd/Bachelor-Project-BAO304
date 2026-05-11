import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";
// https://react.i18next.com/guides/quick-start
// https://github.com/i18next/react-i18next/blob/master/example/react/src/App.js

const ChangeLangBtn = () => {
  const { t, i18n } = useTranslation();

  return (
    <div role="group" aria-label={t("accessibility:selectLanguage")}>
      <div
        className="tooltip tooltip-bottom"
        data-tip={t("accessibility:changeLangAriaNO")}
      >
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => i18n.changeLanguage("no")}
          aria-label={t("accessibility:changeLangAriaNO")}
        >
          <span aria-hidden="true" className="fi fi-no"></span>
        </button>
      </div>
      <div
        className="tooltip tooltip-bottom"
        data-tip={t("accessibility:changeLangAriaEN")}
      >
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => i18n.changeLanguage("en")}
          aria-label={t("accessibility:changeLangAriaEN")}
        >
          <span aria-hidden="true" className="fi fi-gb"></span>
        </button>
      </div>
    </div>
  );
};

export default ChangeLangBtn;
