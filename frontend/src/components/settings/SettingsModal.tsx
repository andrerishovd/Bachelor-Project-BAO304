import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useKeyboard } from "../../hooks/useKeyboard";
import ThemeDropdown from "./ThemeDropdown";
import FontSizeSlider from "./FontSizeSlider";
import ChangeLangBtn from "../shared/buttons/ChangeLangBtn";
import { useAuth } from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
import { useFontSizeContext } from "../../contexts/FontSizeContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useTranslation as useI18n } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { t } = useTranslation(["common", "settings"]);
  const { saveSettings, resetSettings } = useSettings();
  const { logout, user } = useAuth();
  const { fontSize, setFontSize } = useFontSizeContext();
  const { theme, setCustomTheme, followSystem } = useThemeContext();
  const { i18n } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isSavingRef = useRef(false);

  const [snapshot, setSnapshot] = useState({
    fontSize,
    theme,
    language: i18n.language,
  });

  const hasChanges =
    fontSize !== snapshot.fontSize ||
    theme !== snapshot.theme ||
    i18n.language !== snapshot.language;

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      setSnapshot({ fontSize, theme, language: i18n.language });
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const { handleKeyDown } = useKeyboard({
    onEscape: onClose,
  });

  const handleClose = () => {
    if (isSavingRef.current) {
      isSavingRef.current = false;
      return;
    }

    setFontSize(snapshot.fontSize);
    if (snapshot.theme) {
      setCustomTheme(snapshot.theme);
    } else {
      followSystem();
    }
    i18n.changeLanguage(snapshot.language);
    onClose();
  };

  const handleSave = async () => {
    isSavingRef.current = true;
    await saveSettings();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      id="settings_modal"
      className="modal"
      onKeyDown={handleKeyDown}
    >
      <div className="modal-box flex flex-col gap-6 overflow-x-hidden">
        <h3 className="font-bold text-lg">{t("common:settings")}</h3>

        {/* Account */}
        <section className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold text-base-content/40 uppercase tracking-wider">
            {t("settings:account")}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-base-content/70">
              {user?.username}
            </span>
            <button onClick={logout} className="btn btn-sm btn-error btn-soft">
              {t("settings:logout")}
            </button>
          </div>
        </section>

        <div className="divider my-0" />

        {/* Accessibility */}
        <section className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold text-base-content/40 uppercase tracking-wider">
            {t("settings:helpText")}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-sm">{t("settings:theme")}</span>
            <ThemeDropdown />
          </div>
          <FontSizeSlider />
          <div className="flex items-center justify-between">
            <span className="text-sm">{t("settings:language")}</span>
            <LanguageDropdown />
          </div>
        </section>

        <div className="modal-action mt-0 flex justify-between">
          {/* Reset changes btn */}
          <button className="btn btn-ghost btn-sm" onClick={resetSettings}>
            {t("settings:reset")}
          </button>

          <div className="flex gap-2">
            {/* save only visible if there are changes */}
            {hasChanges && (
              <button className="btn btn-primary" onClick={handleSave}>
                {t("settings:save")}
              </button>
            )}
            {/* close without saving */}
            <button className="btn" onClick={handleClose}>
              {t("settings:close")}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default SettingsModal;
