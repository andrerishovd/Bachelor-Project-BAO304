import { useTranslation } from "react-i18next";

// https://react.i18next.com/guides/quick-start
// https://github.com/i18next/react-i18next/blob/master/example/react/src/App.js

const ChangeLangBtn = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <button type="button" onClick={() => i18n.changeLanguage("no")}>
        🇳🇴
      </button>
      <button type="button" onClick={() => i18n.changeLanguage("en")}>
        🇬🇧
      </button>
    </div>
  );
};

export default ChangeLangBtn;
