import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useKeyboard } from "../../hooks/useKeyboard";
import ThemeDropdown from "./ThemeDropdown";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { t, i18n } = useTranslation("common");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const { handleKeyDown } = useKeyboard({
    onEscape: onClose,
  });

  return (
    <>
      <dialog
        ref={dialogRef}
        onClose={onClose}
        id="settings_modal"
        className="modal"
        onKeyDown={handleKeyDown}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{t("settings")}</h3>
          <p className="py-4">{t("settingsDescription.helpText")}</p>
          <ThemeDropdown />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">{t("close")}</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SettingsModal;
