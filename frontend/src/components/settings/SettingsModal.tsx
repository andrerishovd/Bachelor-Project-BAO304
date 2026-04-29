import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useKeyboard } from "../../hooks/useKeyboard";
import ThemeDropdown from "./ThemeDropdown";
import FontSizeSlider from "./FontSizeSlider";
import ChangeLangBtn from "../shared/buttons/ChangeLangBtn";
import { useAuth } from "../../hooks/useAuth";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { t } = useTranslation(["common", "settings"]);
  const { logout, user } = useAuth();
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
    <dialog
      ref={dialogRef}
      onClose={onClose}
      id="settings_modal"
      className="modal"
      onKeyDown={handleKeyDown}
    >
      <div className="modal-box flex flex-col gap-6">
        <h3 className="font-bold text-lg">{t("common:settings")}</h3>

        {/* Account */}
        <section className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold text-base-content/40 uppercase tracking-wider">
            {t("settings:account")}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-base-content/60">
              {user?.username}
            </span>
            <button onClick={logout} className="btn btn-sm btn-error btn-soft">
              {t("settings:logout")}
            </button>
          </div>
        </section>

        <div className="divider my-0" />

        {/* Accesibility */}
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
            <ChangeLangBtn />
          </div>
        </section>

        <div className="modal-action mt-0">
          <form method="dialog">
            <button className="btn">{t("settings:close")}</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SettingsModal;
