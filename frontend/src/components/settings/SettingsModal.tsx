import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useKeyboard } from "../../hooks/useKeyboard";
import ThemeDropdown from "./ThemeDropdown";
import FontSizeSlider from "./FontSizeSlider";
import ChangeLangBtn from "../shared/ChangeLangBtn";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { t } = useTranslation(["common", "settings"]);
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
          <h3 className="font-bold text-lg">{t("common:settings")}</h3>
          <p className="py-4">{t("settings:helpText")}</p>
          <ThemeDropdown />
          <FontSizeSlider />
          <p>{t("settings:language")}</p>
          <ChangeLangBtn />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">{t("settings:close")}</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SettingsModal;
